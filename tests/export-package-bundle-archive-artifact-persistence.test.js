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
  persistCaseExportPackageBundleArchiveArtifactSnapshot,
  persistCaseExportPackageBundleManifestSnapshot,
  persistCaseExportPackageDocxArtifactSnapshot,
  persistCaseExportPackageJsonArtifactSnapshot,
  persistCaseExportPackageMarkdownArtifactSnapshot,
  persistCaseExportPackagePdfArtifactSnapshot,
  persistCaseExportPackageSnapshot,
} = require("../packages/database/src/index.js");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageBundleArchiveArtifact,
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
    path.join(
      os.tmpdir(),
      "governance-contracts-export-package-bundle-archive-artifact-",
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

async function createPersistedCanonicalBundleData(caseId, storageDir, options = {}) {
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

  const bundleManifest = deriveSWEBodelningExportPackageBundleManifest(
    await getLatestCaseExportPackageSnapshot(caseId, { storageDir }),
    {
      jsonArtifactSnapshot: await getLatestCaseExportPackageJsonArtifactSnapshot(caseId, {
        storageDir,
      }),
      markdownArtifactSnapshot:
        await getLatestCaseExportPackageMarkdownArtifactSnapshot(caseId, {
          storageDir,
        }),
      pdfArtifactSnapshot: await getLatestCaseExportPackagePdfArtifactSnapshot(caseId, {
        storageDir,
      }),
      docxArtifactSnapshot: await getLatestCaseExportPackageDocxArtifactSnapshot(caseId, {
        storageDir,
      }),
    },
    {
      generated_at: options.bundle_generated_at ?? canonicalBundleGeneratedAt,
    },
  );

  await persistCaseExportPackageBundleManifestSnapshot(caseId, bundleManifest, {
    storageDir,
  });

  return {
    bundleManifestSnapshot: await getLatestCaseExportPackageBundleManifestSnapshot(caseId, {
      storageDir,
    }),
    jsonArtifactSnapshot: await getLatestCaseExportPackageJsonArtifactSnapshot(caseId, {
      storageDir,
    }),
    markdownArtifactSnapshot:
      await getLatestCaseExportPackageMarkdownArtifactSnapshot(caseId, {
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

async function createValidBundleArchiveArtifact(caseId, storageDir, options = {}) {
  const persisted = await createPersistedCanonicalBundleData(caseId, storageDir, options);

  return deriveSWEBodelningExportPackageBundleArchiveArtifact(
    persisted.bundleManifestSnapshot,
    {
      jsonArtifactSnapshot: persisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: persisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: persisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: persisted.docxArtifactSnapshot,
    },
  );
}

test("docs freeze the case-level persisted export_package_bundle_archive_artifact seam as a distinct canonical persistence seam", () => {
  assert.match(
    docsText,
    /Case-Level Persisted Export Package Bundle Archive Artifact Snapshot Seam Freeze/i,
  );
  assert.match(
    docsText,
    /case-level persisted `export_package_bundle_archive_artifact` seam is now frozen as the canonical persistence boundary for this exact stored surface/i,
  );
  assert.match(
    docsText,
    /only currently evidenced persistence surfaces in this freeze are `getLatestCaseExportPackageBundleArchiveArtifactSnapshot`, `persistCaseExportPackageBundleArchiveArtifactSnapshot`, and `refreshCaseExportPackageBundleArchiveArtifactSnapshot`/i,
  );
  assert.match(
    docsText,
    /persisted case-level canonical export_package_bundle_archive_artifact latest-read behavior/i,
  );
  assert.match(
    docsText,
    /persisted latest-read via the existing `getLatestCaseExportPackageBundleArchiveArtifactSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /persisted write via the existing `persistCaseExportPackageBundleArchiveArtifactSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /persisted refresh via the existing `refreshCaseExportPackageBundleArchiveArtifactSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /existing canonical final bundle\/archive artifact validation on write and refresh-time derivation from the latest persisted canonical bundle\/package manifest snapshot plus the required persisted canonical JSON, Markdown, PDF, and DOCX artifact snapshots already evidenced inside that persistence path/i,
  );
  assert.match(
    docsText,
    /separate from the thin authenticated `GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest` latest-read seam, the thin authenticated current-only `GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download` delivery seam, and the thin authenticated `POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh` refresh seam/i,
  );
  assert.match(
    docsText,
    /does not itself define route-edge authentication or API error-envelope behavior/i,
  );
  assert.match(
    docsText,
    /frozen governance final bundle\/archive artifact derivation and projection helper scaffold remains a distinct broader runtime\/helper seam/i,
  );
  assert.match(
    docsText,
    /does not itself define parent `export_package` persistence semantics, `export_package_bundle_manifest` persistence semantics, json\/markdown\/pdf\/docx artifact persistence semantics, or broader governance final bundle\/archive derivation \/ projection \/ rebuild ownership beyond the exact stored `export_package_bundle_archive_artifact` boundary already evidenced here/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this persistence seam into route behavior, parent `export_package` persistence, `export_package_bundle_manifest` persistence, sibling artifact persistence, or broader derivation\/rebuild work should be introduced/i,
  );
  assert.match(
    docsText,
    /seam should remain a thin case-level persisted canonical `export_package_bundle_archive_artifact` boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    databaseIndexText,
    /async function getLatestCaseExportPackageBundleArchiveArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageBundleArchiveArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function refreshCaseExportPackageBundleArchiveArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /return caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_bundle_archive_artifact_payload;/,
  );
  assert.match(
    databaseIndexText,
    /validateExportPackageBundleArchiveArtifact\(/,
  );
  assert.match(
    databaseIndexText,
    /normalizeExportPackageBundleArchiveArtifactRecord\(/,
  );
  assert.match(
    databaseIndexText,
    /await getLatestCaseExportPackageBundleManifestSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /await getLatestCaseExportPackageJsonArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /await getLatestCaseExportPackageMarkdownArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /await getLatestCaseExportPackagePdfArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /await getLatestCaseExportPackageDocxArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /deriveExportPackageBundleArchiveArtifact\(/,
  );
  assert.match(
    databaseIndexText,
    /return persistCaseExportPackageBundleArchiveArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageBundleManifestSnapshot\(/,
  );
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
});

test("valid final bundle/archive artifact payload roundtrips through persistence", async () => {
  const storageDir = createStorageDir();
  const payload = await createValidBundleArchiveArtifact("case-1", storageDir);

  const persisted = await persistCaseExportPackageBundleArchiveArtifactSnapshot(
    "case-1",
    payload,
    {
      storageDir,
    },
  );
  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
});

test("latest final bundle/archive artifact retrieval works at case level", async () => {
  const storageDir = createStorageDir();
  const firstPayload = await createValidBundleArchiveArtifact("case-1", storageDir, {
    bundle_generated_at: "2026-03-24T13:00:00.000Z",
  });
  const secondPayload = await createValidBundleArchiveArtifact("case-1", storageDir, {
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
  const thirdPayload = await createValidBundleArchiveArtifact("case-2", storageDir, {
    bundle_generated_at: "2026-03-24T16:00:00.000Z",
  });

  await persistCaseExportPackageBundleArchiveArtifactSnapshot("case-1", firstPayload, {
    storageDir,
  });
  await persistCaseExportPackageBundleArchiveArtifactSnapshot("case-1", secondPayload, {
    storageDir,
  });
  await persistCaseExportPackageBundleArchiveArtifactSnapshot("case-2", thirdPayload, {
    storageDir,
  });

  const latestCaseOne = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });
  const latestCaseTwo = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-2", {
    storageDir,
  });

  assert.deepEqual(latestCaseOne, secondPayload);
  assert.deepEqual(latestCaseTwo, thirdPayload);
});

test("invalid payload shape is rejected before persistence", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = await createValidBundleArchiveArtifact("case-1", storageDir);
  invalidPayload.bundle_manifest_fingerprint = "";

  await assert.rejects(
    persistCaseExportPackageBundleArchiveArtifactSnapshot("case-1", invalidPayload, {
      storageDir,
    }),
    (error) => {
      assert.equal(error.code, "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_INVALID");
      assert.equal(error.details.field, "bundle_manifest_fingerprint");
      return true;
    },
  );

  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });
  assert.equal(latest, null);
});

test("persisted body_base64 remains unchanged through roundtrip", async () => {
  const storageDir = createStorageDir();
  const payload = await createValidBundleArchiveArtifact("case-1", storageDir);

  await persistCaseExportPackageBundleArchiveArtifactSnapshot("case-1", payload, {
    storageDir,
  });
  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.equal(latest.body_base64, payload.body_base64);
});

test("bundle_manifest_fingerprint remains unchanged through roundtrip", async () => {
  const storageDir = createStorageDir();
  const payload = await createValidBundleArchiveArtifact("case-1", storageDir);

  await persistCaseExportPackageBundleArchiveArtifactSnapshot("case-1", payload, {
    storageDir,
  });
  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.equal(
    latest.bundle_manifest_fingerprint,
    payload.bundle_manifest_fingerprint,
  );
});

test("non-SWE_BODELNING behavior remains unchanged", async () => {
  const storageDir = createStorageDir();
  const persisted = await createPersistedCanonicalBundleData("case-1", storageDir);

  assert.throws(
    () =>
      deriveSWEBodelningExportPackageBundleArchiveArtifact(
        {
          ...persisted.bundleManifestSnapshot,
          jurisdiction_profile_key: "SWE_OTHER",
        },
        {
          jsonArtifactSnapshot: persisted.jsonArtifactSnapshot,
          markdownArtifactSnapshot: persisted.markdownArtifactSnapshot,
          pdfArtifactSnapshot: persisted.pdfArtifactSnapshot,
          docxArtifactSnapshot: persisted.docxArtifactSnapshot,
        },
      ),
    /jurisdiction_profile_key is not supported/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
  assert.match(
    docsText,
    /minimal canonical final bundle\/archive artifact persistence foundation stores case-level latest final bundle\/archive artifact snapshots/,
  );
  assert.match(
    docsText,
    /without adding delivery or final output packaging beyond canonical archive artifact payload storage/,
  );
});
