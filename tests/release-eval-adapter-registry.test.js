const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  deriveCMDReleaseEvalBaseline,
  deriveCMDReleaseEvalEvaluatorVersion,
  deriveReleaseEvalRun,
  deriveSWEBodelningReleaseEvalRun,
  getReleaseEvalAdapter,
  hasJurisdictionProfileCapability,
  releaseEvalAdapterRegistry,
} = require("../packages/governance/src/index.js");
const {
  validateCMDProfileDossierProjection,
  validateCMDProfileDossierSnapshot,
  validateCMDReleaseEvalRun,
  validateSWEBodelningReleaseEvalRun,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const cmdCanonicalBaseline = deriveCMDReleaseEvalBaseline();
const cmdCanonicalEvaluatorVersion = deriveCMDReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const cmdRuntimeNotImplementedReasonCode = "cmd-runtime-not-implemented";

function createStorageDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "governance-contracts-release-eval-adapter-"));
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

test("the adapter/dispatch registry exposes the explicit CMD_PROFILE release_eval adapter entry", () => {
  const sweAdapter = getReleaseEvalAdapter("SWE_BODELNING");
  const cmdAdapter = getReleaseEvalAdapter("CMD_PROFILE");

  assert.equal(releaseEvalAdapterRegistry.SWE_BODELNING, sweAdapter);
  assert.equal(releaseEvalAdapterRegistry["CMD_PROFILE"], cmdAdapter);
  assert.deepEqual(Object.keys(releaseEvalAdapterRegistry), ["SWE_BODELNING", "CMD_PROFILE"]);
  assert.equal(sweAdapter.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdAdapter.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdAdapter.deriveReleaseEvalRun, "function");
  assert.equal(typeof cmdAdapter.reconcileReleaseEvalRun, "function");
  assert.equal(typeof cmdAdapter.attachProfileDossierSnapshot, "function");
  assert.equal(typeof cmdAdapter.resolveProfileDossierSnapshot, "function");
  assert.equal(typeof cmdAdapter.resolveProfileDossierProjection, "function");
});

test("governance release_eval refresh/create uses the registry path while preserving current SWE_BODELNING behavior", async () => {
  const storageDir = createStorageDir();
  const profileInputs = createProfileInputs();
  const releaseEvalSeed = createReleaseEvalSeed();

  await upsertCaseProfileInputs("case-1", profileInputs, { storageDir });

  const persisted = await refreshCaseReleaseEvalRun("case-1", releaseEvalSeed, {
    storageDir,
  });
  const persistedAt = persisted.profile_dossier_snapshot.canonical_source.persisted_at;
  const expectedViaRegistry = deriveReleaseEvalRun(releaseEvalSeed, profileInputs, {
    persisted_at: persistedAt,
  });
  const expectedDirect = deriveSWEBodelningReleaseEvalRun(
    releaseEvalSeed,
    profileInputs,
    {
      persisted_at: persistedAt,
    },
  );

  assert.deepEqual(persisted, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("unsupported/non-SWE behavior remains machine-readable and unchanged", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-unsupported", createProfileInputs(), {
    storageDir,
  });

  assert.throws(
    () =>
      deriveReleaseEvalRun(
        createReleaseEvalSeed({ jurisdiction_profile_key: "SWE_OTHER" }),
        createProfileInputs(),
      ),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );

  await assert.rejects(
    () =>
      refreshCaseReleaseEvalRun(
        "case-unsupported",
        createReleaseEvalSeed({ jurisdiction_profile_key: "SWE_OTHER" }),
        { storageDir },
      ),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("the CMD_PROFILE entry derives a blocked/current runtime baseline and resolves dossier payloads through the shared seam", () => {
  const adapter = getReleaseEvalAdapter("CMD_PROFILE");
  const releaseEvalRun = deriveReleaseEvalRun(
    {
      jurisdiction_profile_key: "CMD_PROFILE",
      release_eval_run_id: "cmd-release-eval-run-seed-1",
      evaluator_version: "IGNORED_BY_GOVERNANCE",
    },
    createCMDProfileInputs(),
  );

  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "release_eval"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "profile_dossier"), true);

  assert.deepEqual(validateCMDReleaseEvalRun(releaseEvalRun), releaseEvalRun);
  assert.equal(releaseEvalRun.evaluator_version, cmdCanonicalEvaluatorVersion);
  assert.equal(releaseEvalRun.release_gate, cmdCanonicalBaseline.release_gate);
  assert.equal(
    releaseEvalRun.release_gate_reason_code,
    cmdRuntimeNotImplementedReasonCode,
  );
  assert.equal(
    releaseEvalRun.release_eval_freshness,
    cmdCanonicalBaseline.release_eval_freshness,
  );
  assert.equal(
    releaseEvalRun.release_eval_freshness_reason_code,
    currentFreshnessReasonCode,
  );
  assert.deepEqual(
    releaseEvalRun.profile_input_summary.missing_value_lane_keys,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_input_summary.missing_support_lane_keys,
    [],
  );
  assert.deepEqual(
    adapter.reconcileReleaseEvalRun(releaseEvalRun, createCMDProfileInputs()),
    releaseEvalRun,
  );

  const releaseEvalWithSnapshot = adapter.attachProfileDossierSnapshot(releaseEvalRun);
  const resolvedSnapshot = adapter.resolveProfileDossierSnapshot(releaseEvalRun);
  const resolvedProjection = adapter.resolveProfileDossierProjection(releaseEvalRun);

  assert.deepEqual(
    validateCMDProfileDossierSnapshot(releaseEvalWithSnapshot.profile_dossier_snapshot),
    releaseEvalWithSnapshot.profile_dossier_snapshot,
  );
  assert.deepEqual(resolvedSnapshot, releaseEvalWithSnapshot.profile_dossier_snapshot);
  assert.deepEqual(validateCMDProfileDossierProjection(resolvedProjection), resolvedProjection);
  assert.deepEqual(resolvedProjection, {
    ...resolvedSnapshot,
    snapshot_status: {
      source: "fallback-reprojection",
      snapshot_projection_version_found: null,
      current_projection_version: "cmd-profile-dossier-v1",
      snapshot_is_current: false,
    },
  });
});

test("no current SWE_BODELNING schema/output changes are introduced", () => {
  const profileInputs = createProfileInputs();
  const releaseEvalRun = deriveReleaseEvalRun(
    createReleaseEvalSeed(),
    profileInputs,
    { persisted_at: "2026-03-24T12:00:00.000Z" },
  );

  assert.deepEqual(validateSWEBodelningReleaseEvalRun(releaseEvalRun), releaseEvalRun);
  assert.match(docsText, /release-eval adapter\/dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` adapter entry plus the explicit `"CMD_PROFILE"` adapter entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
