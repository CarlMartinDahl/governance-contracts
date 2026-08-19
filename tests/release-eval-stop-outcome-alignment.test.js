const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/release-eval-stop-outcome-alignment.json");
const stopOutcomeModel = require("../schemas/stop-outcome-model.json");
const {
  releaseEvalStopOutcomeAlignment,
  validateReleaseEvalStopOutcomeAlignment,
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
    SWE_BODELNING: {
      release_gate: sweBaseline.release_gate,
      release_eval_freshness: sweBaseline.release_eval_freshness,
      canonical_stop_outcome: {
        stop_outcome: sweBaseline.release_gate,
      },
      release_gate_reason_codes: [
        "governance_baseline_fail_closed_pending_completeness_support_policy",
        "swe-bodelning-input-incomplete",
        "swe-bodelning-support-incomplete",
      ],
    },
    CMD_PROFILE: {
      release_gate: cmdBaseline.release_gate,
      release_eval_freshness: cmdBaseline.release_eval_freshness,
      canonical_stop_outcome: {
        stop_outcome: cmdBaseline.release_gate,
      },
      release_gate_reason_codes: [
        "cmd-input-incomplete",
        "cmd-runtime-not-implemented",
      ],
    },
  };
}

test("the shared release_eval blocked/current baseline aligns with the stop-outcome model for SWE_BODELNING", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateReleaseEvalStopOutcomeAlignment(payload), payload);
  assert.equal(payload.SWE_BODELNING.release_gate, "blocked");
  assert.equal(payload.SWE_BODELNING.release_eval_freshness, "current");
  assert.deepEqual(payload.SWE_BODELNING.canonical_stop_outcome, {
    stop_outcome: "blocked",
  });
});

test("the shared release_eval blocked/current baseline aligns with the stop-outcome model for CMD_PROFILE", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateReleaseEvalStopOutcomeAlignment(payload), payload);
  assert.equal(payload.CMD_PROFILE.release_gate, "blocked");
  assert.equal(payload.CMD_PROFILE.release_eval_freshness, "current");
  assert.deepEqual(payload.CMD_PROFILE.canonical_stop_outcome, {
    stop_outcome: "blocked",
  });
});

test("packages/schemas exports the release_eval stop-outcome alignment surface", () => {
  assert.deepEqual(releaseEvalStopOutcomeAlignment, schema);
  assert.equal(typeof validateReleaseEvalStopOutcomeAlignment, "function");
  assert.equal(
    schema.properties.SWE_BODELNING.properties.canonical_stop_outcome.$ref,
    "./stop-outcome-model.json",
  );
  assert.equal(
    schema.properties.CMD_PROFILE.properties.canonical_stop_outcome.$ref,
    "./stop-outcome-model.json",
  );
  assert.deepEqual(stopOutcomeModel.required, ["stop_outcome"]);
});

test("docs describe the same release_eval-to-stop-outcome alignment", () => {
  assert.match(
    docsText,
    /shared blocked\/current `release_eval` baseline is explicitly aligned to the neutral stop-outcome contract through `schemas\/release-eval-stop-outcome-alignment\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(docsText, /`release_gate = blocked`/);
  assert.match(docsText, /`release_eval_freshness = current`/);
  assert.match(docsText, /\{ "stop_outcome": "blocked" \}/);
  assert.match(docsText, /`SWE_BODELNING`/);
  assert.match(docsText, /`"CMD_PROFILE"`/);
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
