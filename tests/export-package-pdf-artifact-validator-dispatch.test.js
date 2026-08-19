const test = require("node:test");
const assert = require("node:assert/strict");
const Buffer = require("node:buffer").Buffer;
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getLatestCaseExportPackagePdfArtifactSnapshot,
  persistCaseExportPackagePdfArtifactSnapshot,
} = require("../packages/database/src/index.js");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackagePdfArtifact,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
  hasJurisdictionProfileCapability,
} = require("../packages/governance/src/index.js");
const {
  exportPackagePdfArtifactValidatorRegistry,
  getExportPackagePdfArtifactValidator,
  validateCMDExportPackagePdfArtifact,
  validateExportPackagePdfArtifact,
  validateSWEBodelningExportPackagePdfArtifact,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-24T10:00:00.000Z";

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-pdf-artifact-validator-"),
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

function createValidPdfArtifact(options = {}) {
  const exportPackage = deriveSWEBodelningExportPackage(
    createValidReleaseEvalRun(options.releaseEvalOverrides),
    {
      generated_at: options.generated_at ?? "2026-03-24T12:00:00.000Z",
    },
  );

  return deriveSWEBodelningExportPackagePdfArtifact(exportPackage);
}

function createCMDPdfArtifact() {
  const pdfPayload = [
    "%PDF-1.4",
    "cmd pdf placeholder",
    '{"jurisdiction_profile_key":"CMD_PROFILE","export_version":"cmd-export-package-v1","dossier_fingerprint":"cmd-dossier-fingerprint-1"}',
  ].join("\n");

  return {
    artifact_type: "export-package-pdf",
    filename: "cmd-export-package-v1-cmd-dossier-fingerprint-1.pdf",
    content_type: "application/pdf",
    encoding: "base64",
    body_base64: Buffer.from(pdfPayload, "utf8").toString("base64"),
  };
}

test("the generic validator dispatch exposes the explicit CMD_PROFILE PDF export artifact validator entry", () => {
  const sweValidator = getExportPackagePdfArtifactValidator("SWE_BODELNING");
  const cmdValidator = getExportPackagePdfArtifactValidator("CMD_PROFILE");

  assert.equal(exportPackagePdfArtifactValidatorRegistry.SWE_BODELNING, sweValidator);
  assert.equal(exportPackagePdfArtifactValidatorRegistry["CMD_PROFILE"], cmdValidator);
  assert.deepEqual(Object.keys(exportPackagePdfArtifactValidatorRegistry), [
    "SWE_BODELNING",
    "CMD_PROFILE",
  ]);
  assert.equal(sweValidator.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdValidator.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdValidator.validateExportPackagePdfArtifact, "function");
});

test("packages/database persisted PDF export artifact validation uses the dispatch path while preserving current SWE_BODELNING behavior", async () => {
  const storageDir = createStorageDir();
  const payload = createValidPdfArtifact();

  const persisted = await persistCaseExportPackagePdfArtifactSnapshot("case-1", payload, {
    storageDir,
  });
  const latest = await getLatestCaseExportPackagePdfArtifactSnapshot("case-1", {
    storageDir,
  });
  const expectedViaDispatch = validateExportPackagePdfArtifact(persisted);
  const expectedDirect = validateSWEBodelningExportPackagePdfArtifact(persisted);

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
  assert.deepEqual(persisted, expectedViaDispatch);
  assert.deepEqual(expectedViaDispatch, expectedDirect);
});

test("the CMD_PROFILE entry validates the documented schema shape through the shared dispatch path", () => {
  const payload = createCMDPdfArtifact();

  assert.deepEqual(
    validateExportPackagePdfArtifact(payload),
    validateCMDExportPackagePdfArtifact(payload),
  );
  assert.deepEqual(validateCMDExportPackagePdfArtifact(payload), payload);
});

test("runtime support for CMD_PROFILE uses the shared validation path", async () => {
  const storageDir = createStorageDir();
  const payload = createCMDPdfArtifact();

  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_pdf_artifact"),
    true,
  );
  assert.deepEqual(validateExportPackagePdfArtifact(payload), payload);

  const persisted = await persistCaseExportPackagePdfArtifactSnapshot("case-cmd", payload, {
    storageDir,
  });

  assert.deepEqual(persisted, payload);
});

test("unsupported/non-SWE machine-readable behavior remains unchanged", async () => {
  const storageDir = createStorageDir();
  const payload = createValidPdfArtifact();
  const modifiedPdfPayload = Buffer.from(payload.body_base64, "base64")
    .toString("utf8")
    .replaceAll("SWE_BODELNING", "SWE_OTHER");
  const modifiedPayload = {
    ...payload,
    body_base64: Buffer.from(modifiedPdfPayload, "utf8").toString("base64"),
  };

  const validatedViaDispatch = validateExportPackagePdfArtifact(modifiedPayload);
  const validatedDirect = validateSWEBodelningExportPackagePdfArtifact(modifiedPayload);
  const persisted = await persistCaseExportPackagePdfArtifactSnapshot("case-1", modifiedPayload, {
    storageDir,
  });
  const latest = await getLatestCaseExportPackagePdfArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(validatedViaDispatch, modifiedPayload);
  assert.deepEqual(validatedViaDispatch, validatedDirect);
  assert.deepEqual(persisted, modifiedPayload);
  assert.deepEqual(latest, modifiedPayload);
});

test("no current SWE_BODELNING schema/output changes are introduced", () => {
  const payload = createValidPdfArtifact();

  assert.deepEqual(validateExportPackagePdfArtifact(payload), payload);
  assert.deepEqual(validateSWEBodelningExportPackagePdfArtifact(payload), payload);
  assert.match(docsText, /PDF export artifact validator dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` validator entry plus the explicit `"CMD_PROFILE"` validator entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
