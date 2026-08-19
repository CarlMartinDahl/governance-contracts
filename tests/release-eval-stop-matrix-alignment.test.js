const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/release-eval-stop-matrix-alignment.json");
const stopMatrixModel = require("../schemas/stop-matrix-model.json");
const {
  releaseEvalStopMatrixAlignment,
  validateReleaseEvalStopMatrixAlignment,
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
  const missingRequiredInputEntry = {
    condition_key: "missing_required_input",
    canonical_stop_outcomes: [
      { stop_outcome: "blocked" },
      { stop_outcome: "insufficient_input" },
    ],
  };

  return {
    SWE_BODELNING: {
      release_gate: sweBaseline.release_gate,
      release_eval_freshness: sweBaseline.release_eval_freshness,
      release_gate_reason_code: "swe-bodelning-input-incomplete",
      stop_matrix_entry: missingRequiredInputEntry,
    },
    CMD_PROFILE: {
      release_gate: cmdBaseline.release_gate,
      release_eval_freshness: cmdBaseline.release_eval_freshness,
      release_gate_reason_code: "cmd-input-incomplete",
      stop_matrix_entry: missingRequiredInputEntry,
    },
  };
}

test("the current documented release_eval input-incomplete baseline aligns to the missing_required_input stop-matrix case for SWE_BODELNING", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateReleaseEvalStopMatrixAlignment(payload), payload);
  assert.equal(
    payload.SWE_BODELNING.release_gate_reason_code,
    "swe-bodelning-input-incomplete",
  );
  assert.deepEqual(payload.SWE_BODELNING.stop_matrix_entry, {
    condition_key: "missing_required_input",
    canonical_stop_outcomes: [
      { stop_outcome: "blocked" },
      { stop_outcome: "insufficient_input" },
    ],
  });
});

test("the current documented release_eval input-incomplete baseline aligns to the missing_required_input stop-matrix case for CMD_PROFILE", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateReleaseEvalStopMatrixAlignment(payload), payload);
  assert.equal(payload.CMD_PROFILE.release_gate_reason_code, "cmd-input-incomplete");
  assert.deepEqual(payload.CMD_PROFILE.stop_matrix_entry, {
    condition_key: "missing_required_input",
    canonical_stop_outcomes: [
      { stop_outcome: "blocked" },
      { stop_outcome: "insufficient_input" },
    ],
  });
});

test("the current documented runtime-not-implemented blocked baseline remains intentionally outside the stop-matrix alignment surface because no documented neutral stop-matrix case applies yet", () => {
  assert.equal(
    schema.properties.CMD_PROFILE.properties.release_gate_reason_code.const,
    "cmd-input-incomplete",
  );
  assert.notEqual(
    schema.properties.CMD_PROFILE.properties.release_gate_reason_code.const,
    "cmd-runtime-not-implemented",
  );
  assert.match(
    docsText,
    /`cmd-runtime-not-implemented`, `swe-bodelning-support-incomplete`, and `governance_baseline_fail_closed_pending_completeness_support_policy` release-eval reason codes remain intentionally outside this stop-matrix alignment surface/i,
  );
});

test("packages/schemas exports the release_eval stop-matrix alignment surface", () => {
  assert.deepEqual(releaseEvalStopMatrixAlignment, schema);
  assert.equal(typeof validateReleaseEvalStopMatrixAlignment, "function");
  assert.equal(
    schema.properties.SWE_BODELNING.properties.stop_matrix_entry.allOf[0].$ref,
    "./stop-matrix-model.json#/$defs/stopMatrixEntry",
  );
  assert.equal(
    schema.properties.CMD_PROFILE.properties.stop_matrix_entry.allOf[0].$ref,
    "./stop-matrix-model.json#/$defs/stopMatrixEntry",
  );
  assert.deepEqual(stopMatrixModel.required, ["matrix_entries"]);
});

test("docs describe the same release_eval-to-stop-matrix alignment", () => {
  assert.match(
    docsText,
    /shared `release_eval` seam is also explicitly aligned to the neutral stop-matrix contract through `schemas\/release-eval-stop-matrix-alignment\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(docsText, /`missing_required_input`/);
  assert.match(docsText, /`swe-bodelning-input-incomplete`/);
  assert.match(docsText, /`cmd-input-incomplete`/);
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
