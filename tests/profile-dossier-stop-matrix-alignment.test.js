const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/profile-dossier-stop-matrix-alignment.json");
const stopMatrixModel = require("../schemas/stop-matrix-model.json");
const {
  profileDossierStopMatrixAlignment,
  validateProfileDossierStopMatrixAlignment,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createAlignmentPayload() {
  const missingRequiredInputEntry = {
    condition_key: "missing_required_input",
    canonical_stop_outcomes: [
      { stop_outcome: "blocked" },
      { stop_outcome: "insufficient_input" },
    ],
  };

  return {
    SWE_BODELNING: {
      release_gate: "blocked",
      release_eval_freshness: "current",
      release_gate_reason_code: "swe-bodelning-input-incomplete",
      stop_matrix_entry: missingRequiredInputEntry,
    },
    CMD_PROFILE: {
      release_gate: "blocked",
      release_eval_freshness: "current",
      release_gate_reason_code: "cmd-input-incomplete",
      stop_matrix_entry: missingRequiredInputEntry,
    },
  };
}

test("the current documented blocked/current dossier baseline aligns to the stop-matrix model for SWE_BODELNING where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateProfileDossierStopMatrixAlignment(payload), payload);
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

test("the current documented blocked/current dossier baseline aligns to the stop-matrix model for CMD_PROFILE where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateProfileDossierStopMatrixAlignment(payload), payload);
  assert.equal(payload.CMD_PROFILE.release_gate_reason_code, "cmd-input-incomplete");
  assert.deepEqual(payload.CMD_PROFILE.stop_matrix_entry, {
    condition_key: "missing_required_input",
    canonical_stop_outcomes: [
      { stop_outcome: "blocked" },
      { stop_outcome: "insufficient_input" },
    ],
  });
});

test("the documented dossier reason codes outside missing-required-input remain intentionally outside the stop-matrix alignment surface", () => {
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
    /`cmd-runtime-not-implemented`, `swe-bodelning-support-incomplete`, and `governance_baseline_fail_closed_pending_completeness_support_policy` remain intentionally outside this dossier stop-matrix alignment surface/i,
  );
  assert.match(
    docsText,
    /dossier `snapshot_status` currentness reporting remains outside this mapping surface/i,
  );
});

test("packages/schemas exports the profile_dossier stop-matrix alignment surface if applicable", () => {
  assert.deepEqual(profileDossierStopMatrixAlignment, schema);
  assert.equal(typeof validateProfileDossierStopMatrixAlignment, "function");
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

test("docs describe the same profile_dossier-to-stop-matrix alignment", () => {
  assert.match(
    docsText,
    /shared `profile_dossier` seam is also explicitly aligned to the neutral stop-matrix contract through `schemas\/profile-dossier-stop-matrix-alignment\.json`/i,
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
