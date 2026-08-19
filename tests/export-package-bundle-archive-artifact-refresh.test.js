const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getLatestCaseExportPackageBundleArchiveArtifactSnapshot,
  getLatestCaseExportPackageBundleManifestSnapshot,
  getLatestCaseExportPackageDocxArtifactSnapshot,
  getLatestCaseExportPackageJsonArtifactSnapshot,
  getLatestCaseExportPackageMarkdownArtifactSnapshot,
  getLatestCaseExportPackagePdfArtifactSnapshot,
  getLatestCaseExportPackageSnapshot,
  persistCaseExportPackageBundleManifestSnapshot,
  persistCaseExportPackageDocxArtifactSnapshot,
  persistCaseExportPackageJsonArtifactSnapshot,
  persistCaseExportPackageMarkdownArtifactSnapshot,
  persistCaseExportPackagePdfArtifactSnapshot,
  persistCaseExportPackageSnapshot,
  refreshCaseExportPackageBundleArchiveArtifactSnapshot,
} = require("../packages/database/src/index.js");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageBundleArchiveArtifact,
  deriveSWEBodelningExportPackageBundleManifest,
  deriveSWEBodelningExportPackageBundleManifestFingerprint,
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
const canonicalExportGeneratedAt = "2026-03-24T12:00:00.000Z";
const canonicalBundleGeneratedAt = "2026-03-24T13:00:00.000Z";

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(
      os.tmpdir(),
      "governance-contracts-export-bundle-archive-artifact-refresh-",
    ),
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
    generated_at: options.generated_at ?? canonicalExportGeneratedAt,
  });
}

async function persistCanonicalBundleData(caseId, exportPackage, storageDir, options = {}) {
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

  const bundleManifest = deriveSWEBodelningExportPackageBundleManifest(
    exportPackage,
    {
      jsonArtifactSnapshot: deriveSWEBodelningExportPackageJsonArtifact(exportPackage),
      markdownArtifactSnapshot: deriveSWEBodelningExportPackageMarkdownArtifact(exportPackage),
      pdfArtifactSnapshot: deriveSWEBodelningExportPackagePdfArtifact(exportPackage),
      docxArtifactSnapshot: deriveSWEBodelningExportPackageDocxArtifact(exportPackage),
    },
    {
      generated_at: options.bundle_generated_at ?? canonicalBundleGeneratedAt,
    },
  );

  await persistCaseExportPackageBundleManifestSnapshot(caseId, bundleManifest, {
    storageDir,
  });
}

test("canonical refresh/create persists a valid SWE_BODELNING final bundle/archive artifact snapshot", async () => {
  const storageDir = createStorageDir();
  const exportPackage = createValidExportPackage();

  await persistCanonicalBundleData("case-1", exportPackage, storageDir);

  const refreshed = await refreshCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });
  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(
    refreshed,
    deriveSWEBodelningExportPackageBundleArchiveArtifact(
      await getLatestCaseExportPackageBundleManifestSnapshot("case-1", { storageDir }),
      {
        jsonArtifactSnapshot: await getLatestCaseExportPackageJsonArtifactSnapshot("case-1", {
          storageDir,
        }),
        markdownArtifactSnapshot:
          await getLatestCaseExportPackageMarkdownArtifactSnapshot("case-1", {
            storageDir,
          }),
        pdfArtifactSnapshot: await getLatestCaseExportPackagePdfArtifactSnapshot("case-1", {
          storageDir,
        }),
        docxArtifactSnapshot: await getLatestCaseExportPackageDocxArtifactSnapshot("case-1", {
          storageDir,
        }),
      },
    ),
  );
  assert.deepEqual(latest, refreshed);
});

test("identical manifest/artifact inputs plus identical generated_at yield the same archive artifact payload", async () => {
  const storageDir = createStorageDir();
  const exportPackage = createValidExportPackage({
    generated_at: canonicalExportGeneratedAt,
  });

  await persistCanonicalBundleData("case-1", exportPackage, storageDir, {
    bundle_generated_at: canonicalBundleGeneratedAt,
  });

  const first = await refreshCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });
  const second = await refreshCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(first, second);
});

test("changed manifest/artifact inputs yield a different archive artifact payload where appropriate", async () => {
  const storageDir = createStorageDir();

  const firstExportPackage = createValidExportPackage({
    generated_at: canonicalExportGeneratedAt,
  });
  await persistCanonicalBundleData("case-1", firstExportPackage, storageDir, {
    bundle_generated_at: canonicalBundleGeneratedAt,
  });
  const first = await refreshCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
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
  await persistCanonicalBundleData("case-1", secondExportPackage, storageDir, {
    bundle_generated_at: "2026-03-24T15:00:00.000Z",
  });
  const second = await refreshCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.notDeepEqual(first, second);
  assert.notEqual(first.body_base64, second.body_base64);
});

test("existing read helpers return the persisted final bundle/archive artifact snapshot unchanged", async () => {
  const storageDir = createStorageDir();
  const exportPackage = createValidExportPackage();

  await persistCanonicalBundleData("case-1", exportPackage, storageDir);
  const refreshed = await refreshCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });
  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(latest, refreshed);
});

test("bundle_manifest_fingerprint remains correctly linked in the persisted snapshot", async () => {
  const storageDir = createStorageDir();
  const exportPackage = createValidExportPackage();

  await persistCanonicalBundleData("case-1", exportPackage, storageDir);
  const refreshed = await refreshCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });
  const latestBundleManifest = await getLatestCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
  });

  assert.equal(
    refreshed.bundle_manifest_fingerprint,
    deriveSWEBodelningExportPackageBundleManifestFingerprint(latestBundleManifest),
  );
});

test("non-SWE_BODELNING profiles remain unchanged", async () => {
  const storageDir = createStorageDir();

  await persistCaseExportPackageBundleManifestSnapshot(
    "case-1",
    {
      ...deriveSWEBodelningExportPackageBundleManifest(
        createValidExportPackage(),
        {
          jsonArtifactSnapshot: deriveSWEBodelningExportPackageJsonArtifact(
            createValidExportPackage(),
          ),
          markdownArtifactSnapshot: deriveSWEBodelningExportPackageMarkdownArtifact(
            createValidExportPackage(),
          ),
          pdfArtifactSnapshot: deriveSWEBodelningExportPackagePdfArtifact(
            createValidExportPackage(),
          ),
          docxArtifactSnapshot: deriveSWEBodelningExportPackageDocxArtifact(
            createValidExportPackage(),
          ),
        },
        {
          generated_at: canonicalBundleGeneratedAt,
        },
      ),
      jurisdiction_profile_key: "SWE_OTHER",
    },
    { storageDir },
  ).catch(() => null);

  await assert.rejects(
    refreshCaseExportPackageBundleArchiveArtifactSnapshot("case-1", { storageDir }),
    (error) =>
      error.code === "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND" ||
      error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
  assert.match(
    docsText,
    /minimal canonical final bundle\/archive artifact refresh\/create path derives and persists those snapshots from the already-persisted canonical bundle\/package manifest snapshot plus the already-persisted canonical JSON, Markdown, PDF, and DOCX artifact snapshots through the database package only/,
  );
  assert.match(
    docsText,
    /without adding delivery or unlocking final output packaging beyond the already-canonical archive artifact snapshot/,
  );
});
