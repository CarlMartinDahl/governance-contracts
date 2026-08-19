const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
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
const databaseIndexPath = path.join(__dirname, "..", "packages", "database", "src", "index.js");
const databaseIndexText = fs.readFileSync(databaseIndexPath, "utf8");
const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-24T10:00:00.000Z";
const canonicalExportGeneratedAt = "2026-03-24T12:00:00.000Z";
const canonicalBundleGeneratedAt = "2026-03-24T13:00:00.000Z";

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-package-bundle-manifest-"),
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

async function createPersistedCanonicalExportData(caseId, storageDir, options = {}) {
  const exportPackage = deriveSWEBodelningExportPackage(
    createValidReleaseEvalRun(options.releaseEvalOverrides),
    {
      generated_at: options.export_generated_at ?? canonicalExportGeneratedAt,
    },
  );

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

  return {
    exportPackageSnapshot: await getLatestCaseExportPackageSnapshot(caseId, { storageDir }),
    jsonArtifactSnapshot: await getLatestCaseExportPackageJsonArtifactSnapshot(caseId, {
      storageDir,
    }),
    markdownArtifactSnapshot: await getLatestCaseExportPackageMarkdownArtifactSnapshot(caseId, {
      storageDir,
    }),
    pdfArtifactSnapshot: await getLatestCaseExportPackagePdfArtifactSnapshot(caseId, {
      storageDir,
    }),
    docxArtifactSnapshot: await getLatestCaseExportPackageDocxArtifactSnapshot(caseId, {
      storageDir,
    }),
  };
}

async function createValidBundleManifest(caseId, storageDir, options = {}) {
  const persisted = await createPersistedCanonicalExportData(caseId, storageDir, options);

  return deriveSWEBodelningExportPackageBundleManifest(
    persisted.exportPackageSnapshot,
    {
      jsonArtifactSnapshot: persisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: persisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: persisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: persisted.docxArtifactSnapshot,
    },
    {
      generated_at: options.bundle_generated_at ?? canonicalBundleGeneratedAt,
    },
  );
}

test("docs freeze the case-level persisted export_package_bundle_manifest seam as a distinct canonical persistence seam", () => {
  assert.match(
    docsText,
    /Case-Level Persisted Export Package Bundle\/Package Manifest Snapshot Seam Freeze/i,
  );
  assert.match(
    docsText,
    /case-level persisted `export_package_bundle_manifest` seam is now frozen as the canonical persistence boundary for this exact stored surface/i,
  );
  assert.match(
    docsText,
    /only currently evidenced persistence surfaces in this freeze are `getLatestCaseExportPackageBundleManifestSnapshot`, `persistCaseExportPackageBundleManifestSnapshot`, and `refreshCaseExportPackageBundleManifestSnapshot`/i,
  );
  assert.match(
    docsText,
    /persisted case-level canonical export_package_bundle_manifest latest-read behavior/i,
  );
  assert.match(
    docsText,
    /persisted latest-read via the existing `getLatestCaseExportPackageBundleManifestSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /persisted write via the existing `persistCaseExportPackageBundleManifestSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /persisted refresh via the existing `refreshCaseExportPackageBundleManifestSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /existing canonical bundle\/package manifest validation on write and refresh-time derivation from the latest persisted canonical export_package snapshot plus the required persisted canonical JSON, Markdown, PDF, and DOCX artifact snapshots already evidenced inside that persistence path/i,
  );
  assert.match(
    docsText,
    /separate from the thin authenticated `GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest` latest-read seam and the thin authenticated `POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh` refresh seam/i,
  );
  assert.match(
    docsText,
    /does not itself define route-edge authentication or API error-envelope behavior/i,
  );
  assert.match(
    docsText,
    /does not itself define parent `export_package` persistence semantics, json\/markdown\/pdf\/docx artifact persistence semantics, bundle\/archive artifact persistence semantics, or broader governance bundle\/package manifest derivation \/ projection \/ rebuild ownership beyond the exact stored `export_package_bundle_manifest` boundary already evidenced here/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this persistence seam into route behavior, parent `export_package` persistence, sibling artifact persistence, bundle\/archive persistence, or broader derivation\/rebuild work should be introduced/i,
  );
  assert.match(
    docsText,
    /seam should remain a thin case-level persisted canonical `export_package_bundle_manifest` boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    databaseIndexText,
    /async function getLatestCaseExportPackageBundleManifestSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageBundleManifestSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function refreshCaseExportPackageBundleManifestSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /return caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_bundle_manifest_payload;/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalExportPackageBundleManifest =\s+validateExportPackageBundleManifest\(exportPackageBundleManifestSnapshot\);/s,
  );
  assert.match(
    databaseIndexText,
    /normalizeExportPackageBundleManifestRecord\(\s+caseId,\s+canonicalExportPackageBundleManifest,\s+persistedAt,\s+\)/s,
  );
  assert.match(
    databaseIndexText,
    /const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot\(caseId, options\);/,
  );
  assert.match(
    databaseIndexText,
    /const jsonArtifactSnapshot = await getLatestCaseExportPackageJsonArtifactSnapshot\(\s+caseId,\s+options,\s+\);/s,
  );
  assert.match(
    databaseIndexText,
    /const markdownArtifactSnapshot =\s+await getLatestCaseExportPackageMarkdownArtifactSnapshot\(caseId, options\);/s,
  );
  assert.match(
    databaseIndexText,
    /const pdfArtifactSnapshot = await getLatestCaseExportPackagePdfArtifactSnapshot\(\s+caseId,\s+options,\s+\);/s,
  );
  assert.match(
    databaseIndexText,
    /const docxArtifactSnapshot = await getLatestCaseExportPackageDocxArtifactSnapshot\(\s+caseId,\s+options,\s+\);/s,
  );
  assert.match(
    databaseIndexText,
    /const canonicalExportPackageBundleManifest =\s+deriveExportPackageBundleManifest\(\s+exportPackageSnapshot,\s+\{\s+jsonArtifactSnapshot,\s+markdownArtifactSnapshot,\s+pdfArtifactSnapshot,\s+docxArtifactSnapshot,\s+\},/s,
  );
  assert.match(
    databaseIndexText,
    /return persistCaseExportPackageBundleManifestSnapshot\(\s+caseId,\s+canonicalExportPackageBundleManifest,\s+options,\s+\);/s,
  );
  assert.match(databaseIndexText, /async function persistCaseExportPackageSnapshot\(/);
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageJsonArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageMarkdownArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackagePdfArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageDocxArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageBundleArchiveArtifactSnapshot\(/,
  );
});

test("valid bundle/package manifest payload roundtrips through persistence", async () => {
  const storageDir = createStorageDir();
  const payload = await createValidBundleManifest("case-1", storageDir);

  const persisted = await persistCaseExportPackageBundleManifestSnapshot("case-1", payload, {
    storageDir,
  });
  const latest = await getLatestCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
});

test("latest bundle/package manifest retrieval works at case level", async () => {
  const storageDir = createStorageDir();
  const firstPayload = await createValidBundleManifest("case-1", storageDir, {
    bundle_generated_at: "2026-03-24T13:00:00.000Z",
  });
  const secondPayload = await createValidBundleManifest("case-1", storageDir, {
    export_generated_at: "2026-03-24T14:00:00.000Z",
    bundle_generated_at: "2026-03-24T15:00:00.000Z",
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
  const thirdPayload = await createValidBundleManifest("case-2", storageDir, {
    bundle_generated_at: "2026-03-24T16:00:00.000Z",
  });

  await persistCaseExportPackageBundleManifestSnapshot("case-1", firstPayload, {
    storageDir,
  });
  await persistCaseExportPackageBundleManifestSnapshot("case-1", secondPayload, {
    storageDir,
  });
  await persistCaseExportPackageBundleManifestSnapshot("case-2", thirdPayload, {
    storageDir,
  });

  const latestCaseOne = await getLatestCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
  });
  const latestCaseTwo = await getLatestCaseExportPackageBundleManifestSnapshot("case-2", {
    storageDir,
  });

  assert.deepEqual(latestCaseOne, secondPayload);
  assert.deepEqual(latestCaseTwo, thirdPayload);
});

test("invalid payload shape is rejected before persistence", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = await createValidBundleManifest("case-1", storageDir);
  invalidPayload.artifacts[0].encoding = "";

  await assert.rejects(
    persistCaseExportPackageBundleManifestSnapshot("case-1", invalidPayload, {
      storageDir,
    }),
    (error) => {
      assert.equal(error.code, "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID");
      assert.equal(error.details.field, "artifacts[0].encoding");
      return true;
    },
  );

  const latest = await getLatestCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
  });
  assert.equal(latest, null);
});

test("manifest artifact entries remain unchanged through roundtrip", async () => {
  const storageDir = createStorageDir();
  const payload = await createValidBundleManifest("case-1", storageDir);

  await persistCaseExportPackageBundleManifestSnapshot("case-1", payload, { storageDir });
  const latest = await getLatestCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(latest.artifacts, payload.artifacts);
});

test("non-SWE_BODELNING behavior remains unchanged", async () => {
  const storageDir = createStorageDir();
  const payload = await createValidBundleManifest("case-1", storageDir);

  await assert.rejects(
    persistCaseExportPackageBundleManifestSnapshot(
      "case-1",
      {
        ...payload,
        jurisdiction_profile_key: "SWE_OTHER",
      },
      { storageDir },
    ),
    (error) => {
      assert.equal(error.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE");
      return true;
    },
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
  assert.match(
    docsText,
    /minimal canonical bundle\/package manifest persistence foundation stores case-level latest bundle\/package manifest snapshots/,
  );
  assert.match(
    docsText,
    /without adding package assembly, delivery, zip generation, or final output packaging/,
  );
});
