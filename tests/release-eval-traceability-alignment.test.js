const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/release-eval-traceability-alignment.json");
const traceabilityModel = require("../schemas/traceability-model.json");
const {
  releaseEvalTraceabilityAlignment,
  validateReleaseEvalTraceabilityAlignment,
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
    SWE_BODELNING_INPUT_INCOMPLETE: {
      jurisdiction_profile_key: "SWE_BODELNING",
      release_gate: sweBaseline.release_gate,
      release_eval_freshness: sweBaseline.release_eval_freshness,
      release_gate_reason_code: "swe-bodelning-input-incomplete",
      traceability: {
        input_references: ["profile_input_summary.missing_value_lane_keys"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-input-incomplete",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: [
          "schemas/swe-bodelning-release-eval-run.json",
        ],
        change_causes: ["changed_input"],
      },
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      jurisdiction_profile_key: "SWE_BODELNING",
      release_gate: sweBaseline.release_gate,
      release_eval_freshness: sweBaseline.release_eval_freshness,
      release_gate_reason_code: "swe-bodelning-support-incomplete",
      traceability: {
        input_references: ["profile_input_summary.missing_support_lane_keys"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-support-incomplete",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: [
          "schemas/swe-bodelning-release-eval-run.json",
        ],
        change_causes: ["changed_support"],
      },
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      jurisdiction_profile_key: "CMD_PROFILE",
      release_gate: cmdBaseline.release_gate,
      release_eval_freshness: cmdBaseline.release_eval_freshness,
      release_gate_reason_code: "cmd-input-incomplete",
      traceability: {
        input_references: ["profile_input_summary.missing_value_lane_keys"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::cmd-input-incomplete",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: ["schemas/cmd-release-eval-run.json"],
        change_causes: ["changed_input"],
      },
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      jurisdiction_profile_key: "CMD_PROFILE",
      release_gate: cmdBaseline.release_gate,
      release_eval_freshness: cmdBaseline.release_eval_freshness,
      release_gate_reason_code: "cmd-runtime-not-implemented",
      traceability: {
        input_references: ["profile_input_lane_snapshot.cmd_primary_signal.value"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::cmd-primary-signal-present-but-runtime-not-implemented",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: ["schemas/cmd-release-eval-run.json"],
        change_causes: ["changed_input", "changed_rule"],
      },
    },
  };
}

test("the current documented release_eval input-incomplete baseline has canonical traceability alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateReleaseEvalTraceabilityAlignment(payload), payload);
  assert.equal(
    payload.SWE_BODELNING_INPUT_INCOMPLETE.release_gate_reason_code,
    "swe-bodelning-input-incomplete",
  );
  assert.deepEqual(payload.SWE_BODELNING_INPUT_INCOMPLETE.traceability, {
    input_references: ["profile_input_summary.missing_value_lane_keys"],
    documented_rule_references: [
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-input-incomplete",
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
    ],
    canonical_output_references: ["schemas/swe-bodelning-release-eval-run.json"],
    change_causes: ["changed_input"],
  });
  assert.equal(
    payload.CMD_PROFILE_INPUT_INCOMPLETE.release_gate_reason_code,
    "cmd-input-incomplete",
  );
  assert.deepEqual(payload.CMD_PROFILE_INPUT_INCOMPLETE.traceability, {
    input_references: ["profile_input_summary.missing_value_lane_keys"],
    documented_rule_references: [
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::cmd-input-incomplete",
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
    ],
    canonical_output_references: ["schemas/cmd-release-eval-run.json"],
    change_causes: ["changed_input"],
  });
});

test("the current documented release_eval support-incomplete baseline has canonical traceability alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateReleaseEvalTraceabilityAlignment(payload), payload);
  assert.equal(
    payload.SWE_BODELNING_SUPPORT_INCOMPLETE.release_gate_reason_code,
    "swe-bodelning-support-incomplete",
  );
  assert.deepEqual(payload.SWE_BODELNING_SUPPORT_INCOMPLETE.traceability, {
    input_references: ["profile_input_summary.missing_support_lane_keys"],
    documented_rule_references: [
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-support-incomplete",
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
    ],
    canonical_output_references: ["schemas/swe-bodelning-release-eval-run.json"],
    change_causes: ["changed_support"],
  });
});

test("the current documented first CMD_PROFILE rule has canonical traceability alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateReleaseEvalTraceabilityAlignment(payload), payload);
  assert.equal(
    payload.CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED
      .release_gate_reason_code,
    "cmd-runtime-not-implemented",
  );
  assert.deepEqual(
    payload.CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.traceability,
    {
      input_references: ["profile_input_lane_snapshot.cmd_primary_signal.value"],
      documented_rule_references: [
        "docs/API_CONTRACTS_GOVERNANCE_v1.md::cmd-primary-signal-present-but-runtime-not-implemented",
        "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
      ],
      canonical_output_references: ["schemas/cmd-release-eval-run.json"],
      change_causes: ["changed_input", "changed_rule"],
    },
  );
});

test("packages/schemas exports the release_eval traceability alignment surface", () => {
  assert.deepEqual(releaseEvalTraceabilityAlignment, schema);
  assert.equal(typeof validateReleaseEvalTraceabilityAlignment, "function");
  assert.equal(
    schema.properties.SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[0]
      .$ref,
    "./traceability-model.json",
  );
  assert.equal(
    schema.properties.CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED
      .properties.traceability.allOf[0].$ref,
    "./traceability-model.json",
  );
  assert.deepEqual(traceabilityModel.required, [
    "input_references",
    "documented_rule_references",
    "canonical_output_references",
  ]);
});

test("docs describe the same release_eval-to-traceability alignment", () => {
  assert.match(
    docsText,
    /shared `release_eval` seam is also explicitly aligned to the neutral traceability contract through `schemas\/release-eval-traceability-alignment\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(docsText, /`swe-bodelning-input-incomplete`/);
  assert.match(docsText, /`swe-bodelning-support-incomplete`/);
  assert.match(docsText, /`cmd-input-incomplete`/);
  assert.match(
    docsText,
    /`cmd-primary-signal-present-but-runtime-not-implemented`/,
  );
  assert.match(docsText, /`changed_input`/);
  assert.match(docsText, /`changed_support`/);
  assert.match(docsText, /`changed_rule`/);
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
