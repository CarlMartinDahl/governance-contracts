const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageBundleManifest,
  deriveSWEBodelningExportPackageBundleManifestVersion,
  deriveSWEBodelningExportPackageDocxArtifact,
  deriveSWEBodelningExportPackageJsonArtifact,
  deriveSWEBodelningExportPackageMarkdownArtifact,
  deriveSWEBodelningExportPackagePdfArtifact,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");
const {
  getLatestCaseExportPackageDocxArtifactSnapshot,
  getLatestCaseExportPackageJsonArtifactSnapshot,
  getLatestCaseExportPackageMarkdownArtifactSnapshot,
  getLatestCaseExportPackagePdfArtifactSnapshot,
  getLatestCaseExportPackageSnapshot,
  persistCaseExportPackageDocxArtifactSnapshot,
  persistCaseExportPackageJsonArtifactSnapshot,
  persistCaseExportPackageMarkdownArtifactSnapshot,
  persistCaseExportPackagePdfArtifactSnapshot,
  persistCaseExportPackageSnapshot,
} = require("../packages/database/src/index.js");
const {
  validateSWEBodelningExportPackageBundleManifest,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-24T10:00:00.000Z";
const canonicalGeneratedAt = "2026-03-24T12:00:00.000Z";
const canonicalBundleGeneratedAt = "2026-03-24T13:00:00.000Z";

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-package-bundle-manifest-helper-"),
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

async function createPersistedCanonicalExportData(releaseEvalRun, options = {}) {
  const storageDir = options.storageDir ?? createStorageDir();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: options.export_generated_at ?? canonicalGeneratedAt,
  });

  await persistCaseExportPackageSnapshot("case-1", exportPackage, {
    storageDir,
  });
  await persistCaseExportPackageJsonArtifactSnapshot(
    "case-1",
    deriveSWEBodelningExportPackageJsonArtifact(exportPackage),
    { storageDir },
  );
  await persistCaseExportPackageMarkdownArtifactSnapshot(
    "case-1",
    deriveSWEBodelningExportPackageMarkdownArtifact(exportPackage),
    { storageDir },
  );
  await persistCaseExportPackagePdfArtifactSnapshot(
    "case-1",
    deriveSWEBodelningExportPackagePdfArtifact(exportPackage),
    { storageDir },
  );
  await persistCaseExportPackageDocxArtifactSnapshot(
    "case-1",
    deriveSWEBodelningExportPackageDocxArtifact(exportPackage),
    { storageDir },
  );

  return {
    exportPackageSnapshot: await getLatestCaseExportPackageSnapshot("case-1", { storageDir }),
    jsonArtifactSnapshot: await getLatestCaseExportPackageJsonArtifactSnapshot("case-1", {
      storageDir,
    }),
    markdownArtifactSnapshot: await getLatestCaseExportPackageMarkdownArtifactSnapshot("case-1", {
      storageDir,
    }),
    pdfArtifactSnapshot: await getLatestCaseExportPackagePdfArtifactSnapshot("case-1", {
      storageDir,
    }),
    docxArtifactSnapshot: await getLatestCaseExportPackageDocxArtifactSnapshot("case-1", {
      storageDir,
    }),
  };
}

test("the governance helper derives a valid SWE_BODELNING bundle/package manifest from persisted canonical export data", async () => {
  const persisted = await createPersistedCanonicalExportData(createValidReleaseEvalRun());
  const manifest = deriveSWEBodelningExportPackageBundleManifest(
    persisted.exportPackageSnapshot,
    {
      jsonArtifactSnapshot: persisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: persisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: persisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: persisted.docxArtifactSnapshot,
    },
    {
      generated_at: canonicalBundleGeneratedAt,
    },
  );

  assert.deepEqual(manifest, {
    jurisdiction_profile_key: "SWE_BODELNING",
    package_version: deriveSWEBodelningExportPackageBundleManifestVersion(),
    export_version: persisted.exportPackageSnapshot.export_version,
    dossier_fingerprint: persisted.exportPackageSnapshot.dossier_fingerprint,
    canonical_source: persisted.exportPackageSnapshot.canonical_source,
    generated_at: canonicalBundleGeneratedAt,
    artifacts: [
      {
        artifact_type: persisted.jsonArtifactSnapshot.artifact_type,
        filename: persisted.jsonArtifactSnapshot.filename,
        content_type: persisted.jsonArtifactSnapshot.content_type,
        encoding: persisted.jsonArtifactSnapshot.encoding,
      },
      {
        artifact_type: persisted.markdownArtifactSnapshot.artifact_type,
        filename: persisted.markdownArtifactSnapshot.filename,
        content_type: persisted.markdownArtifactSnapshot.content_type,
        encoding: persisted.markdownArtifactSnapshot.encoding,
      },
      {
        artifact_type: persisted.pdfArtifactSnapshot.artifact_type,
        filename: persisted.pdfArtifactSnapshot.filename,
        content_type: persisted.pdfArtifactSnapshot.content_type,
        encoding: persisted.pdfArtifactSnapshot.encoding,
      },
      {
        artifact_type: persisted.docxArtifactSnapshot.artifact_type,
        filename: persisted.docxArtifactSnapshot.filename,
        content_type: persisted.docxArtifactSnapshot.content_type,
        encoding: persisted.docxArtifactSnapshot.encoding,
      },
    ],
  });
  assert.deepEqual(validateSWEBodelningExportPackageBundleManifest(manifest), manifest);
});

test("identical canonical inputs plus identical generated_at yield the same manifest", async () => {
  const firstPersisted = await createPersistedCanonicalExportData(createValidReleaseEvalRun());
  const secondPersisted = await createPersistedCanonicalExportData(createValidReleaseEvalRun());

  const first = deriveSWEBodelningExportPackageBundleManifest(
    firstPersisted.exportPackageSnapshot,
    {
      jsonArtifactSnapshot: firstPersisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: firstPersisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: firstPersisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: firstPersisted.docxArtifactSnapshot,
    },
    {
      generated_at: canonicalBundleGeneratedAt,
    },
  );
  const second = deriveSWEBodelningExportPackageBundleManifest(
    secondPersisted.exportPackageSnapshot,
    {
      jsonArtifactSnapshot: secondPersisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: secondPersisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: secondPersisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: secondPersisted.docxArtifactSnapshot,
    },
    {
      generated_at: canonicalBundleGeneratedAt,
    },
  );

  assert.deepEqual(first, second);
});

test("changed canonical export/artifact inputs yield a changed manifest where appropriate", async () => {
  const firstPersisted = await createPersistedCanonicalExportData(createValidReleaseEvalRun());
  const secondPersisted = await createPersistedCanonicalExportData(
    createValidReleaseEvalRun({
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
  );

  const first = deriveSWEBodelningExportPackageBundleManifest(
    firstPersisted.exportPackageSnapshot,
    {
      jsonArtifactSnapshot: firstPersisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: firstPersisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: firstPersisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: firstPersisted.docxArtifactSnapshot,
    },
    {
      generated_at: canonicalBundleGeneratedAt,
    },
  );
  const second = deriveSWEBodelningExportPackageBundleManifest(
    secondPersisted.exportPackageSnapshot,
    {
      jsonArtifactSnapshot: secondPersisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: secondPersisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: secondPersisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: secondPersisted.docxArtifactSnapshot,
    },
    {
      generated_at: canonicalBundleGeneratedAt,
    },
  );

  assert.notDeepEqual(first, second);
  assert.notEqual(first.dossier_fingerprint, second.dossier_fingerprint);
});

test("artifact entries are machine-readable and stable", async () => {
  const persisted = await createPersistedCanonicalExportData(createValidReleaseEvalRun());
  const manifest = deriveSWEBodelningExportPackageBundleManifest(
    persisted.exportPackageSnapshot,
    {
      jsonArtifactSnapshot: persisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: persisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: persisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: persisted.docxArtifactSnapshot,
    },
    {
      generated_at: canonicalBundleGeneratedAt,
    },
  );

  assert.deepEqual(
    manifest.artifacts.map((artifact) => artifact.artifact_type),
    [
      "export-package-json",
      "export-package-markdown",
      "export-package-pdf",
      "export-package-docx",
    ],
  );
  assert.deepEqual(
    manifest.artifacts.map((artifact) => Object.keys(artifact).sort()),
    [
      ["artifact_type", "content_type", "encoding", "filename"],
      ["artifact_type", "content_type", "encoding", "filename"],
      ["artifact_type", "content_type", "encoding", "filename"],
      ["artifact_type", "content_type", "encoding", "filename"],
    ],
  );
});

test("non-SWE_BODELNING profiles remain unchanged", async () => {
  const persisted = await createPersistedCanonicalExportData(createValidReleaseEvalRun());

  assert.throws(
    () =>
      deriveSWEBodelningExportPackageBundleManifest(
        {
          ...persisted.exportPackageSnapshot,
          jurisdiction_profile_key: "SWE_OTHER",
        },
        {
          jsonArtifactSnapshot: persisted.jsonArtifactSnapshot,
          markdownArtifactSnapshot: persisted.markdownArtifactSnapshot,
          pdfArtifactSnapshot: persisted.pdfArtifactSnapshot,
          docxArtifactSnapshot: persisted.docxArtifactSnapshot,
        },
        {
          generated_at: canonicalBundleGeneratedAt,
        },
      ),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("no persistence/API/assembly behavior changes are introduced", () => {
  assert.match(
    docsText,
    /deterministic machine-readable `SWE_BODELNING` bundle\/package manifest from already-persisted canonical export package plus JSON, Markdown, PDF, and DOCX artifact snapshot data only/,
  );
  assert.match(
    docsText,
    /without introducing persistence, API routes, delivery, zip\/package assembly, or final archive generation in this slice/,
  );
});
