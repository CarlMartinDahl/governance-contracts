const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getLatestCaseReleaseEvalRun,
  persistCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  deriveCMDReleaseEvalBaseline,
  deriveCMDReleaseEvalEvaluatorVersion,
  deriveReleaseEvalRun,
  hasJurisdictionProfileCapability,
} = require("../packages/governance/src/index.js");
const {
  getReleaseEvalValidator,
  releaseEvalValidatorRegistry,
  validateCMDProfileDossierSnapshot,
  validateCMDReleaseEvalRun,
  validateReleaseEvalRun,
  validateSWEBodelningReleaseEvalRun,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const cmdCanonicalBaseline = deriveCMDReleaseEvalBaseline();
const cmdCanonicalEvaluatorVersion = deriveCMDReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const cmdRuntimeNotImplementedReasonCode = "cmd-runtime-not-implemented";

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-release-eval-validator-"),
  );
}

function createProfileInputs(overrides = {}) {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_intent"],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
      },
    },
    ...overrides,
  };
}

function createReleaseEvalSeed(overrides = {}) {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    release_eval_run_id: "release-eval-run-1",
    evaluator_version: "SHOULD_NOT_BE_PASSED_THROUGH",
    release_gate: "SHOULD_NOT_BE_PASSED_THROUGH",
    release_eval_freshness: "SHOULD_NOT_BE_PASSED_THROUGH",
    ...overrides,
  };
}

function createCMDReleaseEvalRun(overrides = {}) {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    release_eval_run_id: "cmd-release-eval-run-1",
    evaluator_version: cmdCanonicalEvaluatorVersion,
    release_gate: cmdCanonicalBaseline.release_gate,
    release_gate_reason_code: cmdRuntimeNotImplementedReasonCode,
    release_eval_freshness: cmdCanonicalBaseline.release_eval_freshness,
    release_eval_freshness_reason_code: currentFreshnessReasonCode,
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
        evidence_object_ids: ["evidence-cmd-1"],
        has_support: true,
      },
    },
    ...overrides,
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
        evidence_object_ids: ["evidence-cmd-1"],
      },
    },
    ...overrides,
  };
}

test("the generic validator dispatch exposes the explicit CMD_PROFILE release_eval validator entry", () => {
  const sweValidator = getReleaseEvalValidator("SWE_BODELNING");
  const cmdValidator = getReleaseEvalValidator("CMD_PROFILE");

  assert.equal(releaseEvalValidatorRegistry.SWE_BODELNING, sweValidator);
  assert.equal(releaseEvalValidatorRegistry["CMD_PROFILE"], cmdValidator);
  assert.deepEqual(Object.keys(releaseEvalValidatorRegistry), ["SWE_BODELNING", "CMD_PROFILE"]);
  assert.equal(sweValidator.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdValidator.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdValidator.validateReleaseEvalRun, "function");
});

test("packages/database persisted release_eval validation uses the dispatch path while preserving current SWE_BODELNING behavior", async () => {
  const storageDir = createStorageDir();
  const profileInputs = createProfileInputs();
  const persistedAt = "2026-03-24T12:00:00.000Z";

  await upsertCaseProfileInputs("case-1", profileInputs, { storageDir });

  const canonicalReleaseEvalRun = deriveReleaseEvalRun(
    createReleaseEvalSeed(),
    profileInputs,
    { persisted_at: persistedAt },
  );
  const persisted = await persistCaseReleaseEvalRun("case-1", canonicalReleaseEvalRun, {
    storageDir,
    persisted_at: persistedAt,
  });
  const latest = await getLatestCaseReleaseEvalRun("case-1", { storageDir });
  const expectedViaDispatch = validateReleaseEvalRun(persisted);
  const expectedDirect = validateSWEBodelningReleaseEvalRun(persisted);

  assert.deepEqual(persisted, latest);
  assert.deepEqual(persisted, expectedViaDispatch);
  assert.deepEqual(expectedViaDispatch, expectedDirect);
});

test("the CMD_PROFILE entry validates the documented schema shape through the shared dispatch path", () => {
  const cmdReleaseEvalRun = createCMDReleaseEvalRun();

  assert.deepEqual(
    validateReleaseEvalRun(cmdReleaseEvalRun),
    validateCMDReleaseEvalRun(cmdReleaseEvalRun),
  );
  assert.deepEqual(validateCMDReleaseEvalRun(cmdReleaseEvalRun), cmdReleaseEvalRun);
});

test("runtime support for CMD_PROFILE persists canonical release_eval unchanged through the shared validation path", async () => {
  const storageDir = createStorageDir();
  const cmdProfileInputs = createCMDProfileInputs();

  await upsertCaseProfileInputs("case-cmd", cmdProfileInputs, { storageDir });

  const cmdReleaseEvalRun = deriveReleaseEvalRun(
    {
      jurisdiction_profile_key: "CMD_PROFILE",
      release_eval_run_id: "cmd-release-eval-run-1",
      evaluator_version: "IGNORED_BY_GOVERNANCE",
    },
    cmdProfileInputs,
  );

  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "release_eval"), true);
  assert.deepEqual(validateReleaseEvalRun(cmdReleaseEvalRun), cmdReleaseEvalRun);
  assert.deepEqual(validateCMDReleaseEvalRun(cmdReleaseEvalRun), cmdReleaseEvalRun);

  const persisted = await persistCaseReleaseEvalRun("case-cmd", cmdReleaseEvalRun, {
    storageDir,
    persisted_at: "2026-03-24T12:00:00.000Z",
  });
  const latest = await getLatestCaseReleaseEvalRun("case-cmd", { storageDir });

  assert.deepEqual(
    validateCMDProfileDossierSnapshot(persisted.profile_dossier_snapshot),
    persisted.profile_dossier_snapshot,
  );
  assert.deepEqual(
    validateCMDProfileDossierSnapshot(latest.profile_dossier_snapshot),
    latest.profile_dossier_snapshot,
  );
  assert.deepEqual(
    {
      ...persisted,
      profile_dossier_snapshot: undefined,
    },
    {
      ...cmdReleaseEvalRun,
      profile_dossier_snapshot: undefined,
    },
  );
  assert.deepEqual(latest, persisted);
  assert.deepEqual(persisted.profile_dossier_snapshot, {
    jurisdiction_profile_key: "CMD_PROFILE",
    release_gate: cmdReleaseEvalRun.release_gate,
    release_gate_reason_code: cmdReleaseEvalRun.release_gate_reason_code,
    release_eval_freshness: cmdReleaseEvalRun.release_eval_freshness,
    release_eval_freshness_reason_code:
      cmdReleaseEvalRun.release_eval_freshness_reason_code,
    evaluator_version: cmdReleaseEvalRun.evaluator_version,
    profile_input_summary: cmdReleaseEvalRun.profile_input_summary,
    profile_input_lane_snapshot: cmdReleaseEvalRun.profile_input_lane_snapshot,
  });
});

test("unsupported/non-SWE machine-readable behavior remains unchanged", async () => {
  const storageDir = createStorageDir();
  const profileInputs = createProfileInputs();

  await upsertCaseProfileInputs("case-unsupported", profileInputs, { storageDir });

  const unsupportedReleaseEvalRun = {
    ...deriveReleaseEvalRun(
      createReleaseEvalSeed(),
      profileInputs,
      { persisted_at: "2026-03-24T12:00:00.000Z" },
    ),
    jurisdiction_profile_key: "SWE_OTHER",
  };

  assert.throws(
    () => validateReleaseEvalRun(unsupportedReleaseEvalRun),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );

  await assert.rejects(
    () =>
      persistCaseReleaseEvalRun("case-unsupported", unsupportedReleaseEvalRun, {
        storageDir,
        persisted_at: "2026-03-24T12:00:00.000Z",
      }),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("no current SWE_BODELNING schema/output changes are introduced", () => {
  const releaseEvalRun = deriveReleaseEvalRun(
    createReleaseEvalSeed(),
    createProfileInputs(),
    { persisted_at: "2026-03-24T12:00:00.000Z" },
  );

  assert.deepEqual(validateReleaseEvalRun(releaseEvalRun), releaseEvalRun);
  assert.deepEqual(validateSWEBodelningReleaseEvalRun(releaseEvalRun), releaseEvalRun);
  assert.match(docsText, /release-eval validator dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` validator entry plus the explicit `"CMD_PROFILE"` validator entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
