const test = require("node:test");
const assert = require("node:assert/strict");

const schema = require("../schemas/swe-bodelning-release-eval-run.json");
const {
  sweBodelningReleaseEvalRun,
  validateSWEBodelningReleaseEvalRun,
} = require("../packages/schemas/src/index.js");
const {
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";

function createValidReleaseEvalRun() {
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
  };

  return {
    ...releaseEvalRun,
    profile_dossier_snapshot: deriveSWEBodelningProfileDossierSnapshot(
      releaseEvalRun,
      {
        persisted_at: "2026-03-23T10:00:00.000Z",
      },
    ),
  };
}

test("release eval schema includes the canonical required fields", () => {
  assert.deepEqual(schema.required, [
    "jurisdiction_profile_key",
    "release_eval_run_id",
    "evaluator_version",
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
    "profile_input_summary",
    "profile_input_lane_snapshot",
    "profile_dossier_snapshot",
  ]);
  assert.equal(schema.properties.jurisdiction_profile_key.const, "SWE_BODELNING");
  assert.deepEqual(schema.properties.profile_input_summary.required, [
    "required_lane_count",
    "lanes_with_value_count",
    "missing_value_lane_keys",
    "lanes_with_support_count",
    "missing_support_lane_keys",
  ]);
  assert.deepEqual(
    schema.$defs.releaseEvalLaneSnapshotEntry.required,
    ["has_value", "value", "has_support"],
  );
});

test("packages/schemas exports the canonical release eval schema", () => {
  assert.deepEqual(sweBodelningReleaseEvalRun, schema);
});

test("shared schema validation accepts a valid release eval payload", () => {
  assert.deepEqual(
    validateSWEBodelningReleaseEvalRun(createValidReleaseEvalRun()),
    createValidReleaseEvalRun(),
  );
});

test("shared schema validation rejects an invalid release eval payload", () => {
  const invalidPayload = createValidReleaseEvalRun();
  delete invalidPayload.release_gate;

  assert.throws(
    () => validateSWEBodelningReleaseEvalRun(invalidPayload),
    (error) => {
      assert.equal(error.code, "ERR_RELEASE_EVAL_RUN_INVALID");
      return true;
    },
  );
});
