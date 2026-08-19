const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getLatestCaseExportPackageJsonArtifactSnapshot,
  persistCaseExportPackageJsonArtifactSnapshot,
} = require("../packages/database/src/index.js");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageJsonArtifact,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");
const {
  exportPackageJsonArtifactValidatorRegistry,
  getExportPackageJsonArtifactValidator,
  validateCMDExportPackageJsonArtifact,
  validateExportPackageJsonArtifact,
  validateSWEBodelningExportPackageJsonArtifact,
} = require("../packages/schemas/src/index.js");
const {
  hasJurisdictionProfileCapability,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-23T10:00:00.000Z";

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-json-artifact-validator-"),
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

function createValidJsonArtifact(options = {}) {
  const exportPackage = deriveSWEBodelningExportPackage(
    createValidReleaseEvalRun(options.releaseEvalOverrides),
    {
      generated_at: options.generated_at ?? "2026-03-23T12:00:00.000Z",
    },
  );

  return deriveSWEBodelningExportPackageJsonArtifact(exportPackage);
}

function toCanonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => toCanonicalJson(item)).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${toCanonicalJson(value[key])}`);
    return `{${entries.join(",")}}`;
  }

  return JSON.stringify(value);
}

function createCMDExportPackage() {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    export_version: "cmd-export-package-v1",
    dossier_fingerprint: "cmd-dossier-fingerprint-1",
    canonical_source: {
      release_eval_run_id: "cmd-release-eval-run-1",
      evaluator_version: "cmd-release-eval-contract-v1",
      jurisdiction_profile_key: "CMD_PROFILE",
      persisted_at: "2026-03-25T12:00:00.000Z",
    },
    profile_dossier_snapshot: {
      jurisdiction_profile_key: "CMD_PROFILE",
      release_gate: "blocked",
      release_gate_reason_code: "contract-only-profile-runtime-unsupported",
      release_eval_freshness: "current",
      release_eval_freshness_reason_code: "contract-only-current-placeholder",
      evaluator_version: "cmd-release-eval-contract-v1",
      profile_input_summary: {
        required_lane_count: 1,
        lanes_with_value_count: 1,
        missing_value_lane_keys: [],
        lanes_with_support_count: 1,
        missing_support_lane_keys: [],
      },
      profile_input_lane_snapshot: {
        "cmd_primary_signal": {
          has_value: true,
          value: "documented",
          evidence_object_ids: ["cmd-evidence-1"],
          has_support: true,
        },
      },
    },
    generated_at: "2026-03-25T12:30:00.000Z",
    manifest: {
      included_top_level_artifacts: ["canonical_source", "profile_dossier_snapshot"],
    },
  };
}

function createCMDJsonArtifact() {
  const exportPackage = createCMDExportPackage();

  return {
    artifact_type: "export-package-json",
    filename: `${exportPackage.export_version}-${exportPackage.dossier_fingerprint}.json`,
    content_type: "application/json",
    encoding: "utf-8",
    body_utf8: toCanonicalJson(exportPackage),
  };
}

test("the generic validator dispatch exposes the explicit CMD_PROFILE JSON export artifact validator entry", () => {
  const sweValidator = getExportPackageJsonArtifactValidator("SWE_BODELNING");
  const cmdValidator = getExportPackageJsonArtifactValidator("CMD_PROFILE");

  assert.equal(exportPackageJsonArtifactValidatorRegistry.SWE_BODELNING, sweValidator);
  assert.equal(exportPackageJsonArtifactValidatorRegistry["CMD_PROFILE"], cmdValidator);
  assert.deepEqual(
    Object.keys(exportPackageJsonArtifactValidatorRegistry),
    ["SWE_BODELNING", "CMD_PROFILE"],
  );
  assert.equal(sweValidator.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdValidator.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdValidator.validateExportPackageJsonArtifact, "function");
});

test("packages/database persisted JSON export artifact validation uses the dispatch path while preserving current SWE_BODELNING behavior", async () => {
  const storageDir = createStorageDir();
  const payload = createValidJsonArtifact();

  const persisted = await persistCaseExportPackageJsonArtifactSnapshot("case-1", payload, {
    storageDir,
  });
  const latest = await getLatestCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });
  const expectedViaDispatch = validateExportPackageJsonArtifact(persisted);
  const expectedDirect = validateSWEBodelningExportPackageJsonArtifact(persisted);

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
  assert.deepEqual(persisted, expectedViaDispatch);
  assert.deepEqual(expectedViaDispatch, expectedDirect);
});

test("the CMD_PROFILE entry validates the documented schema shape through the shared dispatch path", () => {
  const payload = createCMDJsonArtifact();

  assert.deepEqual(
    validateExportPackageJsonArtifact(payload),
    validateCMDExportPackageJsonArtifact(payload),
  );
  assert.deepEqual(validateCMDExportPackageJsonArtifact(payload), payload);
});

test("runtime support for CMD_PROFILE uses the shared persistence seam without changing the validator dispatch", async () => {
  const storageDir = createStorageDir();
  const payload = createCMDJsonArtifact();

  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_json_artifact"),
    true,
  );
  assert.deepEqual(validateExportPackageJsonArtifact(payload), payload);

  const persisted = await persistCaseExportPackageJsonArtifactSnapshot(
    "case-cmd",
    payload,
    { storageDir },
  );
  const latest = await getLatestCaseExportPackageJsonArtifactSnapshot("case-cmd", {
    storageDir,
  });

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
});

test("unsupported/non-SWE machine-readable behavior remains unchanged", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = createValidJsonArtifact();
  const parsedArtifactBody = JSON.parse(invalidPayload.body_utf8);
  invalidPayload.body_utf8 = JSON.stringify({
    ...parsedArtifactBody,
    jurisdiction_profile_key: "SWE_OTHER",
  });

  assert.throws(
    () => validateExportPackageJsonArtifact(invalidPayload),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );

  await assert.rejects(
    persistCaseExportPackageJsonArtifactSnapshot("case-1", invalidPayload, { storageDir }),
    (error) => {
      assert.equal(error.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE");
      assert.equal(error.details.jurisdiction_profile_key, "SWE_OTHER");
      return true;
    },
  );
});

test("no current SWE_BODELNING schema/output changes are introduced", () => {
  const payload = createValidJsonArtifact();

  assert.deepEqual(validateExportPackageJsonArtifact(payload), payload);
  assert.deepEqual(validateSWEBodelningExportPackageJsonArtifact(payload), payload);
  assert.match(docsText, /JSON export artifact validator dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` validator entry plus the explicit `"CMD_PROFILE"` validator entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
