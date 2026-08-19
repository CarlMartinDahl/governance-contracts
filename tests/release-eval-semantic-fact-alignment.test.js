const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/release-eval-semantic-fact-alignment.json");
const semanticFactModel = require("../schemas/semantic-fact-model.json");
const sweBodelningReleaseEvalRun = require("../schemas/swe-bodelning-release-eval-run.json");
const cmdReleaseEvalRun = require("../schemas/cmd-release-eval-run.json");
const {
  releaseEvalSemanticFactAlignment,
  validateReleaseEvalSemanticFactAlignment,
} = require("../packages/schemas/src/index.js");
const {
  deriveCMDReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalBaseline,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createAlignmentPayload() {
  const sweBaseline = deriveSWEBodelningReleaseEvalBaseline();
  const cmdBaseline = deriveCMDReleaseEvalBaseline();

  return {
    alignment_scope: "presence_status_and_source_status_safe_cases_only",
    supported_semantic_fact_dimensions: ["presence_status", "source_status"],
    unassigned_semantic_fact_dimensions: [
      "verification_status",
      "dispute_status",
      "consistency_status",
    ],
    SWE_BODELNING_INPUT_INCOMPLETE: {
      jurisdiction_profile_key: "SWE_BODELNING",
      case_key: "input_incomplete",
      release_gate: sweBaseline.release_gate,
      release_eval_freshness: sweBaseline.release_eval_freshness,
      release_gate_reason_code: "swe-bodelning-input-incomplete",
      input_contract_references: [
        "profile_input_lane_snapshot.*.has_value",
        "profile_input_summary.required_lane_count",
        "profile_input_summary.lanes_with_value_count",
        "profile_input_summary.missing_value_lane_keys",
      ],
      canonical_semantic_fact: {
        presence_status: "missing",
      },
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      jurisdiction_profile_key: "SWE_BODELNING",
      case_key: "support_incomplete",
      release_gate: sweBaseline.release_gate,
      release_eval_freshness: sweBaseline.release_eval_freshness,
      release_gate_reason_code: "swe-bodelning-support-incomplete",
      input_contract_references: [
        "profile_input_lane_snapshot.*.evidence_object_ids",
        "profile_input_lane_snapshot.*.has_support",
        "profile_input_lane_snapshot.*.has_value",
        "profile_input_summary.lanes_with_support_count",
        "profile_input_summary.lanes_with_value_count",
        "profile_input_summary.missing_support_lane_keys",
        "profile_input_summary.missing_value_lane_keys",
        "profile_input_summary.required_lane_count",
      ],
      canonical_semantic_fact: {
        presence_status: "present",
        source_status: "unsourced",
      },
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      jurisdiction_profile_key: "CMD_PROFILE",
      case_key: "input_incomplete",
      release_gate: cmdBaseline.release_gate,
      release_eval_freshness: cmdBaseline.release_eval_freshness,
      release_gate_reason_code: "cmd-input-incomplete",
      input_contract_references: [
        "profile_input_lane_snapshot.*.has_value",
        "profile_input_summary.required_lane_count",
        "profile_input_summary.lanes_with_value_count",
        "profile_input_summary.missing_value_lane_keys",
      ],
      canonical_semantic_fact: {
        presence_status: "missing",
      },
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      jurisdiction_profile_key: "CMD_PROFILE",
      case_key: "primary_signal_present_runtime_not_implemented",
      release_gate: cmdBaseline.release_gate,
      release_eval_freshness: cmdBaseline.release_eval_freshness,
      release_gate_reason_code: "cmd-runtime-not-implemented",
      input_contract_references: [
        "profile_input_lane_snapshot.*.has_value",
        "profile_input_summary.required_lane_count",
        "profile_input_summary.lanes_with_value_count",
        "profile_input_summary.missing_value_lane_keys",
      ],
      canonical_semantic_fact: {
        presence_status: "present",
      },
    },
  };
}

test("the current documented input-incomplete release_eval baseline has canonical presence_status = missing alignment for SWE_BODELNING where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateReleaseEvalSemanticFactAlignment(payload), payload);
  assert.equal(
    payload.SWE_BODELNING_INPUT_INCOMPLETE.release_gate_reason_code,
    "swe-bodelning-input-incomplete",
  );
  assert.deepEqual(
    payload.SWE_BODELNING_INPUT_INCOMPLETE.canonical_semantic_fact,
    {
      presence_status: "missing",
    },
  );
  assert.equal(
    sweBodelningReleaseEvalRun.properties.profile_input_summary.properties
      .required_lane_count.const,
    3,
  );
});

test("the current documented input-incomplete release_eval baseline has canonical presence_status = missing alignment for CMD_PROFILE where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateReleaseEvalSemanticFactAlignment(payload), payload);
  assert.equal(
    payload.CMD_PROFILE_INPUT_INCOMPLETE.release_gate_reason_code,
    "cmd-input-incomplete",
  );
  assert.deepEqual(payload.CMD_PROFILE_INPUT_INCOMPLETE.canonical_semantic_fact, {
    presence_status: "missing",
  });
  assert.equal(
    cmdReleaseEvalRun.properties.profile_input_summary.properties.required_lane_count
      .const,
    1,
  );
});

test("the current documented first CMD_PROFILE rule as implemented in release_eval has canonical presence_status = present alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateReleaseEvalSemanticFactAlignment(payload), payload);
  assert.equal(
    payload.CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED
      .release_gate_reason_code,
    "cmd-runtime-not-implemented",
  );
  assert.deepEqual(
    payload.CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED
      .canonical_semantic_fact,
    {
      presence_status: "present",
    },
  );
  assert.deepEqual(cmdReleaseEvalRun.properties.profile_input_lane_snapshot.required, [
    "cmd_primary_signal",
  ]);
});

test("the current documented support-incomplete release_eval baseline has canonical source_status = unsourced alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateReleaseEvalSemanticFactAlignment(payload), payload);
  assert.equal(
    payload.SWE_BODELNING_SUPPORT_INCOMPLETE.release_gate_reason_code,
    "swe-bodelning-support-incomplete",
  );
  assert.deepEqual(payload.SWE_BODELNING_SUPPORT_INCOMPLETE.canonical_semantic_fact, {
    presence_status: "present",
    source_status: "unsourced",
  });
  assert.ok(
    sweBodelningReleaseEvalRun.properties.profile_input_summary.required.includes(
      "missing_support_lane_keys",
    ),
  );
  assert.ok(
    sweBodelningReleaseEvalRun.$defs.releaseEvalLaneSnapshotEntry.required.includes(
      "has_support",
    ),
  );
});

test("packages/schemas exports the release_eval semantic-fact alignment surface if applicable", () => {
  assert.deepEqual(releaseEvalSemanticFactAlignment, schema);
  assert.equal(typeof validateReleaseEvalSemanticFactAlignment, "function");
  assert.equal(
    schema.$defs.presenceOnlySemanticFact.properties.presence_status.$ref,
    "./semantic-fact-model.json#/properties/presence_status",
  );
  assert.equal(
    schema.$defs.presenceAndSourceSemanticFact.properties.source_status.$ref,
    "./semantic-fact-model.json#/properties/source_status",
  );
  assert.deepEqual(semanticFactModel.properties.presence_status.enum, [
    "present",
    "missing",
  ]);
  assert.deepEqual(semanticFactModel.properties.source_status.enum, [
    "sourced",
    "unsourced",
  ]);
});

test("docs describe the same partial alignment and explicitly keep verification_status, dispute_status, and consistency_status unassigned", () => {
  assert.match(
    docsText,
    /`schemas\/release-eval-semantic-fact-alignment\.json`, exported through `packages\/schemas`/i,
  );
  assert.match(
    docsText,
    /intentionally limited to\s+the currently safe dimensions, `presence_status` and `source_status`/i,
  );
  assert.match(
    docsText,
    /`swe-bodelning-input-incomplete` ->\s+`?\{ "presence_status": "missing" \}`?/i,
  );
  assert.match(
    docsText,
    /`cmd-input-incomplete` ->\s+`?\{ "presence_status": "missing" \}`?/i,
  );
  assert.match(
    docsText,
    /`cmd-primary-signal-present-but-runtime-not-implemented` ->\s+`?\{ "presence_status": "present" \}`?/i,
  );
  assert.match(
    docsText,
    /`swe-bodelning-support-incomplete` ->\s+`?\{ "presence_status": "present", "source_status": "unsourced" \}`?/i,
  );
  assert.match(
    docsText,
    /No `source_status = sourced` mapping is added yet\./i,
  );
  assert.match(docsText, /`verification_status`/);
  assert.match(docsText, /`dispute_status`/);
  assert.match(docsText, /`consistency_status`/);
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
