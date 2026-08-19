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
  hasJurisdictionProfileCapability,
} = require("../packages/governance/src/index.js");
const {
  exportPackageBundleManifestValidatorRegistry,
  getExportPackageBundleManifestValidator,
  validateCMDExportPackageBundleManifest,
  validateExportPackageBundleManifest,
  validateSWEBodelningExportPackageBundleManifest,
} = require("../packages/schemas/src/index.js");

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
    path.join(os.tmpdir(), "governance-contracts-bundle-manifest-validator-"),
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

function createCMDBundleManifest() {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    package_version: "cmd-package-v1",
    export_version: "cmd-export-package-v1",
    dossier_fingerprint: "cmd-dossier-fingerprint-1",
    canonical_source: {
      release_eval_run_id: "cmd-release-eval-run-1",
      evaluator_version: "cmd-release-eval-contract-v1",
      jurisdiction_profile_key: "CMD_PROFILE",
      persisted_at: "2026-03-25T12:00:00.000Z",
    },
    generated_at: "2026-03-25T12:30:00.000Z",
    artifacts: [
      {
        artifact_type: "export-package-json",
        filename: "cmd-export-package-v1-cmd-dossier-fingerprint-1.json",
        content_type: "application/json",
        encoding: "utf-8",
      },
      {
        artifact_type: "export-package-markdown",
        filename: "cmd-export-package-v1-cmd-dossier-fingerprint-1.md",
        content_type: "text/markdown",
        encoding: "utf-8",
      },
      {
        artifact_type: "export-package-pdf",
        filename: "cmd-export-package-v1-cmd-dossier-fingerprint-1.pdf",
        content_type: "application/pdf",
        encoding: "base64",
      },
      {
        artifact_type: "export-package-docx",
        filename: "cmd-export-package-v1-cmd-dossier-fingerprint-1.docx",
        content_type:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        encoding: "base64",
      },
    ],
  };
}

test("the generic validator dispatch exposes the explicit CMD_PROFILE bundle/package manifest validator entry", () => {
  const sweValidator = getExportPackageBundleManifestValidator("SWE_BODELNING");
  const cmdValidator = getExportPackageBundleManifestValidator("CMD_PROFILE");

  assert.equal(exportPackageBundleManifestValidatorRegistry.SWE_BODELNING, sweValidator);
  assert.equal(exportPackageBundleManifestValidatorRegistry["CMD_PROFILE"], cmdValidator);
  assert.deepEqual(Object.keys(exportPackageBundleManifestValidatorRegistry), [
    "SWE_BODELNING",
    "CMD_PROFILE",
  ]);
  assert.equal(sweValidator.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdValidator.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdValidator.validateExportPackageBundleManifest, "function");
});

test("packages/database persisted bundle/package manifest validation uses the dispatch path while preserving current SWE_BODELNING behavior", async () => {
  const storageDir = createStorageDir();
  const payload = await createValidBundleManifest("case-1", storageDir);

  const persisted = await persistCaseExportPackageBundleManifestSnapshot("case-1", payload, {
    storageDir,
  });
  const latest = await getLatestCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
  });
  const expectedViaDispatch = validateExportPackageBundleManifest(persisted);
  const expectedDirect = validateSWEBodelningExportPackageBundleManifest(persisted);

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
  assert.deepEqual(persisted, expectedViaDispatch);
  assert.deepEqual(expectedViaDispatch, expectedDirect);
});

test("the CMD_PROFILE entry validates the documented schema shape through the shared dispatch path", () => {
  const payload = createCMDBundleManifest();

  assert.deepEqual(
    validateExportPackageBundleManifest(payload),
    validateCMDExportPackageBundleManifest(payload),
  );
  assert.deepEqual(validateCMDExportPackageBundleManifest(payload), payload);
});

test("runtime support for CMD_PROFILE uses the shared validation path", async () => {
  const storageDir = createStorageDir();
  const payload = createCMDBundleManifest();

  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_bundle_manifest"),
    true,
  );
  assert.deepEqual(validateExportPackageBundleManifest(payload), payload);

  const persisted = await persistCaseExportPackageBundleManifestSnapshot(
    "case-cmd",
    payload,
    {
      storageDir,
    },
  );

  assert.deepEqual(persisted, payload);
});

test("unsupported/non-SWE machine-readable behavior remains unchanged", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = await createValidBundleManifest("case-1", storageDir);
  invalidPayload.jurisdiction_profile_key = "SWE_OTHER";

  assert.throws(
    () => validateExportPackageBundleManifest(invalidPayload),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );

  await assert.rejects(
    persistCaseExportPackageBundleManifestSnapshot("case-1", invalidPayload, {
      storageDir,
    }),
    (error) => {
      assert.equal(error.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE");
      assert.equal(error.details.jurisdiction_profile_key, "SWE_OTHER");
      return true;
    },
  );
});

test("no current SWE_BODELNING schema/output changes are introduced", async () => {
  const storageDir = createStorageDir();
  const payload = await createValidBundleManifest("case-1", storageDir);

  assert.deepEqual(validateExportPackageBundleManifest(payload), payload);
  assert.deepEqual(validateSWEBodelningExportPackageBundleManifest(payload), payload);
  assert.match(docsText, /bundle\/package manifest validator dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` validator entry plus the explicit `"CMD_PROFILE"` validator entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
