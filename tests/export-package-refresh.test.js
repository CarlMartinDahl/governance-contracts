const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getLatestCaseExportPackageSnapshot,
  persistCaseReleaseEvalRun,
  refreshCaseExportPackageSnapshot,
} = require("../packages/database/src/index.js");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const databaseIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "database",
  "src",
  "index.js",
);
const databaseIndexText = fs.readFileSync(databaseIndexPath, "utf8");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-23T10:00:00.000Z";

function createStorageDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "governance-contracts-export-refresh-"));
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

test("docs freeze the case-level persisted export_package snapshot seam as a distinct canonical persistence seam", () => {
  assert.match(
    docsText,
    /Case-Level Persisted Export Package Snapshot Seam Freeze/i,
  );
  assert.match(
    docsText,
    /case-level persisted `export_package` snapshot seam is now frozen as the canonical persistence boundary for this exact stored surface/i,
  );
  assert.match(
    docsText,
    /only currently evidenced persistence surfaces in this freeze are `getLatestCaseExportPackageSnapshot`, `persistCaseExportPackageSnapshot`, and `refreshCaseExportPackageSnapshot`/i,
  );
  assert.match(
    docsText,
    /persisted case-level canonical export_package snapshot latest-read behavior/i,
  );
  assert.match(
    docsText,
    /persisted latest-read via the existing `getLatestCaseExportPackageSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /persisted write via the existing `persistCaseExportPackageSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /persisted refresh via the existing `refreshCaseExportPackageSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /existing canonical export_package validation on write and refresh-time derivation from the latest persisted profile_dossier_snapshot already evidenced inside that persistence path/i,
  );
  assert.match(
    docsText,
    /separate from the thin authenticated `GET \/cases\/:caseId\/export-package\/latest` latest-read seam and the thin authenticated `POST \/cases\/:caseId\/export-package\/refresh` refresh seam/i,
  );
  assert.match(
    docsText,
    /does not itself define route-edge authentication or API error-envelope behavior/i,
  );
  assert.match(
    docsText,
    /does not itself define `release_eval_run` persistence semantics, `profile_inputs` persistence semantics, bundle\/package manifest persistence semantics, final bundle\/archive persistence semantics, or broader governance derivation\/rebuild ownership beyond the exact stored `export_package` boundary already evidenced here/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this persistence seam into route behavior, `release_eval_run`\/`profile_inputs`\/manifest\/archive persistence, or broader derivation\/rebuild work should be introduced/i,
  );
  assert.match(
    docsText,
    /seam should remain a thin case-level persisted canonical `export_package` boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(databaseIndexText, /async function getLatestCaseExportPackageSnapshot\(/);
  assert.match(databaseIndexText, /async function persistCaseExportPackageSnapshot\(/);
  assert.match(databaseIndexText, /async function refreshCaseExportPackageSnapshot\(/);
  assert.match(
    databaseIndexText,
    /return caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_payload;/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalExportPackage = validateExportPackage\(exportPackageSnapshot\);/,
  );
  assert.match(
    databaseIndexText,
    /normalizeExportPackageRecord\(caseId, canonicalExportPackage\)/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalExportPackage = deriveExportPackageFromProfileDossierSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /return persistCaseExportPackageSnapshot\(caseId, canonicalExportPackage, options\);/,
  );
  assert.match(databaseIndexText, /async function persistCaseReleaseEvalRun\(/);
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageBundleManifestSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageBundleArchiveArtifactSnapshot\(/,
  );
});

test("canonical refresh/create persists a valid SWE_BODELNING export package snapshot", async () => {
  const storageDir = createStorageDir();
  const releaseEvalRun = createValidReleaseEvalRun();

  await persistCaseReleaseEvalRun("case-1", releaseEvalRun, { storageDir });

  const refreshed = await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-23T12:00:00.000Z",
  });
  const latest = await getLatestCaseExportPackageSnapshot("case-1", { storageDir });

  assert.deepEqual(
    refreshed,
    deriveSWEBodelningExportPackage(releaseEvalRun, {
      generated_at: "2026-03-23T12:00:00.000Z",
    }),
  );
  assert.deepEqual(latest, refreshed);
});

test("identical dossier snapshot inputs plus identical generated_at yield the same export package payload", async () => {
  const storageDir = createStorageDir();
  const releaseEvalRun = createValidReleaseEvalRun();

  await persistCaseReleaseEvalRun("case-1", releaseEvalRun, { storageDir });

  const first = await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-23T12:00:00.000Z",
  });
  const second = await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-23T12:00:00.000Z",
  });

  assert.deepEqual(first, second);
});

test("changed dossier snapshot inputs yield a different export package payload where appropriate", async () => {
  const storageDir = createStorageDir();

  await persistCaseReleaseEvalRun("case-1", createValidReleaseEvalRun(), {
    storageDir,
  });
  const first = await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-23T12:00:00.000Z",
  });

  await persistCaseReleaseEvalRun(
    "case-1",
    createValidReleaseEvalRun({
      release_eval_run_id: "release-eval-run-2",
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
    }),
    { storageDir },
  );
  const second = await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-23T12:00:00.000Z",
  });

  assert.notEqual(first.dossier_fingerprint, second.dossier_fingerprint);
  assert.notDeepEqual(first.profile_dossier_snapshot, second.profile_dossier_snapshot);
  assert.deepEqual(first.manifest, second.manifest);
});

test("existing read helpers return the persisted export package snapshot unchanged", async () => {
  const storageDir = createStorageDir();
  const releaseEvalRun = createValidReleaseEvalRun();

  await persistCaseReleaseEvalRun("case-1", releaseEvalRun, { storageDir });
  const refreshed = await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-23T12:00:00.000Z",
  });
  const latest = await getLatestCaseExportPackageSnapshot("case-1", { storageDir });

  assert.deepEqual(latest, refreshed);
});

test("non-SWE_BODELNING profiles remain unchanged", async () => {
  const storageDir = createStorageDir();

  await persistCaseReleaseEvalRun(
    "case-1",
    {
      ...createValidReleaseEvalRun(),
      jurisdiction_profile_key: "SWE_OTHER",
      profile_dossier_snapshot: {
        ...createValidReleaseEvalRun().profile_dossier_snapshot,
        jurisdiction_profile_key: "SWE_OTHER",
      },
    },
    { storageDir },
  ).catch(() => null);

  await assert.rejects(
    refreshCaseExportPackageSnapshot("case-1", {
      storageDir,
      generated_at: "2026-03-23T12:00:00.000Z",
    }),
    (error) =>
      error.code === "ERR_RELEASE_EVAL_RUN_NOT_FOUND" ||
      error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
  assert.match(
    docsText,
    /No zip\/pdf\/docx\/file generation or final output packaging is introduced in these export package slices/,
  );
});
