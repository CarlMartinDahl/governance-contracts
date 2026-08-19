const test = require("node:test");
const assert = require("node:assert/strict");
const Buffer = require("node:buffer").Buffer;
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

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
  validateSWEBodelningExportPackageBundleArchiveArtifact,
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
    path.join(
      os.tmpdir(),
      "governance-contracts-export-package-bundle-archive-artifact-helper-",
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

function parseStoredZipEntries(zipBuffer) {
  const entries = [];
  let offset = 0;

  while (offset + 4 <= zipBuffer.length) {
    const signature = zipBuffer.readUInt32LE(offset);

    if (signature === 0x02014b50 || signature === 0x06054b50) {
      break;
    }

    assert.equal(signature, 0x04034b50);

    const compressedSize = zipBuffer.readUInt32LE(offset + 18);
    const fileNameLength = zipBuffer.readUInt16LE(offset + 26);
    const extraFieldLength = zipBuffer.readUInt16LE(offset + 28);
    const nameStart = offset + 30;
    const dataStart = nameStart + fileNameLength + extraFieldLength;
    const name = zipBuffer.toString("utf8", nameStart, nameStart + fileNameLength);
    const dataEnd = dataStart + compressedSize;

    entries.push({
      name,
      data: zipBuffer.subarray(dataStart, dataEnd),
    });

    offset = dataEnd;
  }

  return entries;
}

async function createPersistedCanonicalBundleData(releaseEvalRun) {
  const storageDir = createStorageDir();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
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

  const bundleManifest = deriveSWEBodelningExportPackageBundleManifest(
    await getLatestCaseExportPackageSnapshot("case-1", { storageDir }),
    {
      jsonArtifactSnapshot: await getLatestCaseExportPackageJsonArtifactSnapshot("case-1", {
        storageDir,
      }),
      markdownArtifactSnapshot: await getLatestCaseExportPackageMarkdownArtifactSnapshot(
        "case-1",
        { storageDir },
      ),
      pdfArtifactSnapshot: await getLatestCaseExportPackagePdfArtifactSnapshot("case-1", {
        storageDir,
      }),
      docxArtifactSnapshot: await getLatestCaseExportPackageDocxArtifactSnapshot("case-1", {
        storageDir,
      }),
    },
    {
      generated_at: canonicalBundleGeneratedAt,
    },
  );

  await persistCaseExportPackageBundleManifestSnapshot("case-1", bundleManifest, {
    storageDir,
  });

  return {
    bundleManifestSnapshot: await getLatestCaseExportPackageBundleManifestSnapshot("case-1", {
      storageDir,
    }),
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

test("the governance helper derives a valid final bundle/archive artifact descriptor from canonical persisted export data", async () => {
  const persisted = await createPersistedCanonicalBundleData(createValidReleaseEvalRun());
  const artifact = deriveSWEBodelningExportPackageBundleArchiveArtifact(
    persisted.bundleManifestSnapshot,
    {
      jsonArtifactSnapshot: persisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: persisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: persisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: persisted.docxArtifactSnapshot,
    },
  );

  assert.deepEqual(validateSWEBodelningExportPackageBundleArchiveArtifact(artifact), artifact);
  assert.equal(artifact.artifact_type, "export-package-bundle-archive");
  assert.equal(artifact.content_type, "application/zip");
  assert.equal(artifact.encoding, "base64");
  assert.equal(artifact.package_version, persisted.bundleManifestSnapshot.package_version);
  assert.match(artifact.filename, /\.zip$/);
});

test("the helper output validates against the shared final bundle/archive artifact schema", async () => {
  const persisted = await createPersistedCanonicalBundleData(createValidReleaseEvalRun());
  const artifact = deriveSWEBodelningExportPackageBundleArchiveArtifact(
    persisted.bundleManifestSnapshot,
    {
      jsonArtifactSnapshot: persisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: persisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: persisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: persisted.docxArtifactSnapshot,
    },
  );

  assert.deepEqual(validateSWEBodelningExportPackageBundleArchiveArtifact(artifact), artifact);
});

test("identical canonical inputs plus identical generated_at yield the same artifact filename and body_base64", async () => {
  const firstPersisted = await createPersistedCanonicalBundleData(createValidReleaseEvalRun());
  const secondPersisted = await createPersistedCanonicalBundleData(createValidReleaseEvalRun());

  const first = deriveSWEBodelningExportPackageBundleArchiveArtifact(
    firstPersisted.bundleManifestSnapshot,
    {
      jsonArtifactSnapshot: firstPersisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: firstPersisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: firstPersisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: firstPersisted.docxArtifactSnapshot,
    },
  );
  const second = deriveSWEBodelningExportPackageBundleArchiveArtifact(
    secondPersisted.bundleManifestSnapshot,
    {
      jsonArtifactSnapshot: secondPersisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: secondPersisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: secondPersisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: secondPersisted.docxArtifactSnapshot,
    },
  );

  assert.equal(first.filename, second.filename);
  assert.equal(first.body_base64, second.body_base64);
});

test("changed canonical inputs yield changed archive artifact body where appropriate", async () => {
  const firstPersisted = await createPersistedCanonicalBundleData(createValidReleaseEvalRun());
  const secondPersisted = await createPersistedCanonicalBundleData(
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

  const first = deriveSWEBodelningExportPackageBundleArchiveArtifact(
    firstPersisted.bundleManifestSnapshot,
    {
      jsonArtifactSnapshot: firstPersisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: firstPersisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: firstPersisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: firstPersisted.docxArtifactSnapshot,
    },
  );
  const second = deriveSWEBodelningExportPackageBundleArchiveArtifact(
    secondPersisted.bundleManifestSnapshot,
    {
      jsonArtifactSnapshot: secondPersisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: secondPersisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: secondPersisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: secondPersisted.docxArtifactSnapshot,
    },
  );

  assert.notEqual(first.body_base64, second.body_base64);
});

test("the produced body_base64 decodes to a plausible archive payload", async () => {
  const persisted = await createPersistedCanonicalBundleData(createValidReleaseEvalRun());
  const artifact = deriveSWEBodelningExportPackageBundleArchiveArtifact(
    persisted.bundleManifestSnapshot,
    {
      jsonArtifactSnapshot: persisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: persisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: persisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: persisted.docxArtifactSnapshot,
    },
  );
  const archiveBuffer = Buffer.from(artifact.body_base64, "base64");
  const entries = parseStoredZipEntries(archiveBuffer);

  assert.match(archiveBuffer.toString("utf8", 0, 2), /^PK$/);
  assert.deepEqual(
    entries.map((entry) => entry.name),
    [
      "bundle-manifest.json",
      persisted.jsonArtifactSnapshot.filename,
      persisted.markdownArtifactSnapshot.filename,
      persisted.pdfArtifactSnapshot.filename,
      persisted.docxArtifactSnapshot.filename,
    ],
  );
});

test("bundle_manifest_fingerprint matches the canonical manifest linkage", async () => {
  const persisted = await createPersistedCanonicalBundleData(createValidReleaseEvalRun());
  const artifact = deriveSWEBodelningExportPackageBundleArchiveArtifact(
    persisted.bundleManifestSnapshot,
    {
      jsonArtifactSnapshot: persisted.jsonArtifactSnapshot,
      markdownArtifactSnapshot: persisted.markdownArtifactSnapshot,
      pdfArtifactSnapshot: persisted.pdfArtifactSnapshot,
      docxArtifactSnapshot: persisted.docxArtifactSnapshot,
    },
  );
  const archiveBuffer = Buffer.from(artifact.body_base64, "base64");
  const manifestEntry = parseStoredZipEntries(archiveBuffer).find(
    (entry) => entry.name === "bundle-manifest.json",
  );

  assert.ok(manifestEntry);
  assert.equal(
    artifact.bundle_manifest_fingerprint,
    crypto.createHash("sha256").update(manifestEntry.data).digest("hex"),
  );
});

test("non-SWE_BODELNING profiles remain unchanged", async () => {
  const persisted = await createPersistedCanonicalBundleData(createValidReleaseEvalRun());

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

test("no persistence/API/delivery behavior changes are introduced", () => {
  assert.match(
    docsText,
    /already-persisted canonical bundle\/package manifest snapshot plus the already-persisted canonical JSON, Markdown, PDF, and DOCX artifact snapshots only/,
  );
  assert.match(
    docsText,
    /without introducing persistence, API routes, or delivery in this slice/,
  );
});
