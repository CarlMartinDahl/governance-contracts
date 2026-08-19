const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getLatestCaseExportPackageJsonArtifactSnapshot,
  persistCaseExportPackageSnapshot,
  refreshCaseExportPackageJsonArtifactSnapshot,
} = require("../packages/database/src/index.js");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageJsonArtifact,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-23T10:00:00.000Z";

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-json-artifact-refresh-"),
  );
}

function createValidReleaseEvalRun(overrides = {}) {
  const releaseEvalRun = {
    jurisdiction_profile_key: "SWE_BODELNING",
    release_eval_run_id: "release-eval-run-1",
    evaluator_version: canonicalEvaluatorVersion,
    release_gate: canonicalBaseline.release_gate,
    release_gate_reason_code: canonicalBaseline.release_gate_reason_code,
    release_eval_freshness: canonicalBaseline.release_eval_freshness,
    release_eval_freshness_reason_code: currentFreshnessReasonCode,
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_intent"],
      lanes_with_support_count: 2,
      missing_support_lane_keys: ["shared_intent"],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
        has_support: true,
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
        has_support: true,
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
        has_support: false,
      },
    },
    ...overrides,
  };

  return {
    ...releaseEvalRun,
    profile_dossier_snapshot: deriveSWEBodelningProfileDossierSnapshot(releaseEvalRun, {
      persisted_at: canonicalPersistedAt,
    }),
  };
}

function createValidExportPackage(options = {}) {
  const releaseEvalRun = createValidReleaseEvalRun(options.releaseEvalOverrides);

  return deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: options.generated_at ?? "2026-03-23T12:00:00.000Z",
  });
}

test("canonical refresh/create persists a valid SWE_BODELNING JSON export artifact snapshot", async () => {
  const storageDir = createStorageDir();
  const exportPackage = createValidExportPackage();

  await persistCaseExportPackageSnapshot("case-1", exportPackage, { storageDir });

  const refreshed = await refreshCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });
  const latest = await getLatestCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(
    refreshed,
    deriveSWEBodelningExportPackageJsonArtifact(exportPackage),
  );
  assert.deepEqual(latest, refreshed);
});

test("identical export package inputs plus identical generated_at yield the same JSON artifact payload", async () => {
  const storageDir = createStorageDir();
  const exportPackage = createValidExportPackage({
    generated_at: "2026-03-23T12:00:00.000Z",
  });

  await persistCaseExportPackageSnapshot("case-1", exportPackage, { storageDir });

  const first = await refreshCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });
  const second = await refreshCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(first, second);
});

test("changed export package inputs yield a different JSON artifact payload where appropriate", async () => {
  const storageDir = createStorageDir();

  await persistCaseExportPackageSnapshot(
    "case-1",
    createValidExportPackage({
      generated_at: "2026-03-23T12:00:00.000Z",
    }),
    { storageDir },
  );
  const first = await refreshCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });

  await persistCaseExportPackageSnapshot(
    "case-1",
    createValidExportPackage({
      generated_at: "2026-03-23T13:00:00.000Z",
      releaseEvalOverrides: {
        profile_input_summary: {
          required_lane_count: 3,
          lanes_with_value_count: 3,
          missing_value_lane_keys: [],
          lanes_with_support_count: 3,
          missing_support_lane_keys: [],
        },
        profile_input_lane_snapshot: {
          economic_contribution: {
            has_value: true,
            value: "documented",
            evidence_object_ids: ["evidence-1"],
            has_support: true,
          },
          shared_use: {
            has_value: true,
            value: "residence",
            evidence_object_ids: ["evidence-2"],
            has_support: true,
          },
          shared_intent: {
            has_value: true,
            value: "co-acquisition",
            evidence_object_ids: ["evidence-3"],
            has_support: true,
          },
        },
      },
    }),
    { storageDir },
  );
  const second = await refreshCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.notEqual(first.filename, second.filename);
  assert.notEqual(first.body_utf8, second.body_utf8);
});

test("existing read helpers return the persisted JSON export artifact snapshot unchanged", async () => {
  const storageDir = createStorageDir();
  const exportPackage = createValidExportPackage();

  await persistCaseExportPackageSnapshot("case-1", exportPackage, { storageDir });
  const refreshed = await refreshCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });
  const latest = await getLatestCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(latest, refreshed);
});

test("non-SWE_BODELNING profiles remain unchanged", async () => {
  const storageDir = createStorageDir();

  await persistCaseExportPackageSnapshot(
    "case-1",
    {
      ...createValidExportPackage(),
      jurisdiction_profile_key: "SWE_OTHER",
    },
    { storageDir },
  ).catch(() => null);

  await assert.rejects(
    refreshCaseExportPackageJsonArtifactSnapshot("case-1", { storageDir }),
    (error) =>
      error.code === "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND" ||
      error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
  assert.match(
    docsText,
    /minimal canonical JSON export artifact refresh\/create path derives and persists those snapshots from the already-persisted canonical export package snapshot through the database package only/,
  );
  assert.match(
    docsText,
    /No delivery endpoints or final file packaging are introduced in this JSON artifact persistence slice/,
  );
});
