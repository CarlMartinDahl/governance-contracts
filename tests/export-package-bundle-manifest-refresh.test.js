const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getLatestCaseExportPackageBundleManifestSnapshot,
  persistCaseExportPackageDocxArtifactSnapshot,
  persistCaseExportPackageJsonArtifactSnapshot,
  persistCaseExportPackageMarkdownArtifactSnapshot,
  persistCaseExportPackagePdfArtifactSnapshot,
  persistCaseExportPackageSnapshot,
  refreshCaseExportPackageBundleManifestSnapshot,
} = require("../packages/database/src/index.js");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageBundleManifest,
  deriveSWEBodelningExportPackageDocxArtifact,
  deriveSWEBodelningExportPackageJsonArtifact,
  deriveSWEBodelningExportPackageMarkdownArtifact,
  deriveSWEBodelningExportPackagePdfArtifact,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-24T10:00:00.000Z";

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-bundle-manifest-refresh-"),
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
    generated_at: options.generated_at ?? "2026-03-24T12:00:00.000Z",
  });
}

async function persistCanonicalExportData(caseId, exportPackage, storageDir) {
  await persistCaseExportPackageSnapshot(caseId, exportPackage, { storageDir });
  await persistCaseExportPackageJsonArtifactSnapshot(
    caseId,
    deriveSWEBodelningExportPackageJsonArtifact(exportPackage),
    { storageDir },
  );
  await persistCaseExportPackageMarkdownArtifactSnapshot(
    caseId,
    deriveSWEBodelningExportPackageMarkdownArtifact(exportPackage),
    { storageDir },
  );
  await persistCaseExportPackagePdfArtifactSnapshot(
    caseId,
    deriveSWEBodelningExportPackagePdfArtifact(exportPackage),
    { storageDir },
  );
  await persistCaseExportPackageDocxArtifactSnapshot(
    caseId,
    deriveSWEBodelningExportPackageDocxArtifact(exportPackage),
    { storageDir },
  );
}

test("canonical refresh/create persists a valid SWE_BODELNING bundle/package manifest snapshot", async () => {
  const storageDir = createStorageDir();
  const exportPackage = createValidExportPackage();

  await persistCanonicalExportData("case-1", exportPackage, storageDir);

  const refreshed = await refreshCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T13:00:00.000Z",
  });
  const latest = await getLatestCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(
    refreshed,
    deriveSWEBodelningExportPackageBundleManifest(
      exportPackage,
      {
        jsonArtifactSnapshot: deriveSWEBodelningExportPackageJsonArtifact(exportPackage),
        markdownArtifactSnapshot: deriveSWEBodelningExportPackageMarkdownArtifact(exportPackage),
        pdfArtifactSnapshot: deriveSWEBodelningExportPackagePdfArtifact(exportPackage),
        docxArtifactSnapshot: deriveSWEBodelningExportPackageDocxArtifact(exportPackage),
      },
      {
        generated_at: "2026-03-24T13:00:00.000Z",
      },
    ),
  );
  assert.deepEqual(latest, refreshed);
});

test("identical export/artifact inputs plus identical generated_at yield the same manifest payload", async () => {
  const storageDir = createStorageDir();
  const exportPackage = createValidExportPackage({
    generated_at: "2026-03-24T12:00:00.000Z",
  });

  await persistCanonicalExportData("case-1", exportPackage, storageDir);

  const first = await refreshCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T13:00:00.000Z",
  });
  const second = await refreshCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T13:00:00.000Z",
  });

  assert.deepEqual(first, second);
});

test("changed export/artifact inputs yield a different manifest payload where appropriate", async () => {
  const storageDir = createStorageDir();

  const firstExportPackage = createValidExportPackage({
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  await persistCanonicalExportData("case-1", firstExportPackage, storageDir);
  const first = await refreshCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T13:00:00.000Z",
  });

  const secondExportPackage = createValidExportPackage({
    generated_at: "2026-03-24T14:00:00.000Z",
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
  });
  await persistCanonicalExportData("case-1", secondExportPackage, storageDir);
  const second = await refreshCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T15:00:00.000Z",
  });

  assert.notDeepEqual(first, second);
  assert.notEqual(first.dossier_fingerprint, second.dossier_fingerprint);
});

test("existing read helpers return the persisted bundle/package manifest snapshot unchanged", async () => {
  const storageDir = createStorageDir();
  const exportPackage = createValidExportPackage();

  await persistCanonicalExportData("case-1", exportPackage, storageDir);
  const refreshed = await refreshCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T13:00:00.000Z",
  });
  const latest = await getLatestCaseExportPackageBundleManifestSnapshot("case-1", {
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
    refreshCaseExportPackageBundleManifestSnapshot("case-1", { storageDir }),
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
    /minimal canonical bundle\/package manifest refresh\/create path derives and persists those snapshots from the already-persisted canonical export package snapshot plus the already-persisted canonical JSON, Markdown, PDF, and DOCX artifact snapshots through the database package only/,
  );
  assert.match(
    docsText,
    /No zip\/pdf\/docx\/file generation or final output packaging is introduced in these export package slices/,
  );
});
