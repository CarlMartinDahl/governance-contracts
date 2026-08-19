const test = require("node:test");
const assert = require("node:assert/strict");
const Buffer = require("node:buffer").Buffer;
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  refreshCaseExportPackageBundleArchiveArtifactSnapshot,
  refreshCaseExportPackageBundleManifestSnapshot,
  refreshCaseExportPackageDocxArtifactSnapshot,
  refreshCaseExportPackageJsonArtifactSnapshot,
  refreshCaseExportPackageMarkdownArtifactSnapshot,
  refreshCaseExportPackagePdfArtifactSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
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
  upsertCaseProfileInputs,
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
  hasJurisdictionProfileCapability,
} = require("../packages/governance/src/index.js");
const {
  exportPackageBundleArchiveArtifactValidatorRegistry,
  getExportPackageBundleArchiveArtifactValidator,
  validateCMDExportPackageBundleArchiveArtifact,
  validateExportPackageBundleArchiveArtifact,
  validateSWEBodelningExportPackageBundleArchiveArtifact,
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
    path.join(
      os.tmpdir(),
      "governance-contracts-export-package-bundle-archive-artifact-validator-",
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

function createCMDProfileInputs(overrides = {}) {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    profile_input_summary: {
      required_lane_count: 1,
      lanes_with_value_count: 1,
      missing_value_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      "cmd_primary_signal": {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["cmd-evidence-1"],
      },
    },
    ...overrides,
  };
}

function createCMDReleaseEvalSeed(overrides = {}) {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    release_eval_run_id: "cmd-release-eval-run-1",
    evaluator_version: "IGNORED_BY_GOVERNANCE",
    release_gate: "IGNORED_BY_GOVERNANCE",
    release_eval_freshness: "IGNORED_BY_GOVERNANCE",
    ...overrides,
  };
}

async function createValidBundleArchiveArtifact(caseId, storageDir, options = {}) {
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

  return deriveSWEBodelningExportPackageBundleArchiveArtifact(
    await getLatestCaseExportPackageBundleManifestSnapshot(caseId, { storageDir }),
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
  );
}

function createCMDBundleArchiveArtifact() {
  const archivePayload = [
    "PK",
    "cmd archive placeholder",
    '{"jurisdiction_profile_key":"CMD_PROFILE","package_version":"cmd-package-v1","bundle_manifest_fingerprint":"cmd-bundle-manifest-fingerprint-1"}',
  ].join("\n");

  return {
    artifact_type: "export-package-bundle-archive",
    filename: "cmd-package-v1-cmd-bundle-manifest-fingerprint-1.zip",
    content_type: "application/zip",
    encoding: "base64",
    body_base64: Buffer.from(archivePayload, "utf8").toString("base64"),
    package_version: "cmd-package-v1",
    bundle_manifest_fingerprint: "cmd-bundle-manifest-fingerprint-1",
  };
}

async function createValidCMDBundleArchiveArtifact(caseId, storageDir) {
  await upsertCaseProfileInputs(caseId, createCMDProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun(caseId, createCMDReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot(caseId, {
    storageDir,
    generated_at: "2026-03-25T12:00:00.000Z",
  });
  await refreshCaseExportPackageJsonArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageMarkdownArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackagePdfArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageDocxArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageBundleManifestSnapshot(caseId, {
    storageDir,
    generated_at: "2026-03-25T13:00:00.000Z",
  });

  return refreshCaseExportPackageBundleArchiveArtifactSnapshot(caseId, { storageDir });
}

test("the generic validator dispatch exposes the explicit CMD_PROFILE final bundle/archive artifact validator entry", () => {
  const sweValidator = getExportPackageBundleArchiveArtifactValidator("SWE_BODELNING");
  const cmdValidator = getExportPackageBundleArchiveArtifactValidator("CMD_PROFILE");

  assert.equal(
    exportPackageBundleArchiveArtifactValidatorRegistry.SWE_BODELNING,
    sweValidator,
  );
  assert.equal(
    exportPackageBundleArchiveArtifactValidatorRegistry["CMD_PROFILE"],
    cmdValidator,
  );
  assert.deepEqual(Object.keys(exportPackageBundleArchiveArtifactValidatorRegistry), [
    "SWE_BODELNING",
    "CMD_PROFILE",
  ]);
  assert.equal(sweValidator.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdValidator.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdValidator.validateExportPackageBundleArchiveArtifact, "function");
});

test("packages/database persisted final bundle/archive artifact validation uses the dispatch path while preserving current SWE_BODELNING behavior", async () => {
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
  const expectedViaDispatch = validateExportPackageBundleArchiveArtifact(persisted);
  const expectedDirect = validateSWEBodelningExportPackageBundleArchiveArtifact(persisted);

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
  assert.deepEqual(persisted, expectedViaDispatch);
  assert.deepEqual(expectedViaDispatch, expectedDirect);
});

test("the CMD_PROFILE entry validates the documented schema shape through the shared dispatch path", () => {
  const payload = createCMDBundleArchiveArtifact();

  assert.deepEqual(
    validateExportPackageBundleArchiveArtifact(payload),
    validateCMDExportPackageBundleArchiveArtifact(payload),
  );
  assert.deepEqual(validateCMDExportPackageBundleArchiveArtifact(payload), payload);
});

test("runtime support for CMD_PROFILE persists canonical final bundle/archive artifacts unchanged through the shared validation path", async () => {
  const storageDir = createStorageDir();
  const payload = await createValidCMDBundleArchiveArtifact("case-cmd-source", storageDir);

  assert.equal(
    hasJurisdictionProfileCapability(
      "CMD_PROFILE",
      "export_package_bundle_archive_artifact",
    ),
    true,
  );
  assert.deepEqual(validateExportPackageBundleArchiveArtifact(payload), payload);
  const persisted = await persistCaseExportPackageBundleArchiveArtifactSnapshot(
    "case-cmd",
    payload,
    {
      storageDir,
    },
  );
  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-cmd", {
    storageDir,
  });

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
});

test("unsupported/non-SWE machine-readable behavior remains unchanged", async () => {
  const storageDir = createStorageDir();
  const payload = await createValidBundleArchiveArtifact("case-1", storageDir);
  const modifiedPayload = {
    ...payload,
    body_base64: Buffer.from("SWE_OTHER archive payload", "utf8").toString("base64"),
  };

  const validatedViaDispatch = validateExportPackageBundleArchiveArtifact(modifiedPayload);
  const validatedDirect =
    validateSWEBodelningExportPackageBundleArchiveArtifact(modifiedPayload);
  const persisted = await persistCaseExportPackageBundleArchiveArtifactSnapshot(
    "case-1",
    modifiedPayload,
    {
      storageDir,
    },
  );
  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(validatedViaDispatch, modifiedPayload);
  assert.deepEqual(validatedViaDispatch, validatedDirect);
  assert.deepEqual(persisted, modifiedPayload);
  assert.deepEqual(latest, modifiedPayload);
});

test("no current SWE_BODELNING schema/output changes are introduced", async () => {
  const storageDir = createStorageDir();
  const payload = await createValidBundleArchiveArtifact("case-1", storageDir);

  assert.deepEqual(validateExportPackageBundleArchiveArtifact(payload), payload);
  assert.deepEqual(validateSWEBodelningExportPackageBundleArchiveArtifact(payload), payload);
  assert.match(docsText, /final bundle\/archive artifact validator dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` validator entry plus the explicit `"CMD_PROFILE"` validator entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
