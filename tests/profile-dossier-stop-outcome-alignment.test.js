const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/profile-dossier-stop-outcome-alignment.json");
const stopOutcomeModel = require("../schemas/stop-outcome-model.json");
const sweBodelningProfileDossierSnapshot = require("../schemas/swe-bodelning-profile-dossier-snapshot.json");
const sweBodelningProfileDossierProjection = require("../schemas/swe-bodelning-profile-dossier-projection.json");
const cmdProfileDossierSnapshot = require("../schemas/cmd-profile-dossier-snapshot.json");
const cmdProfileDossierProjection = require("../schemas/cmd-profile-dossier-projection.json");
const {
  profileDossierStopOutcomeAlignment,
  validateProfileDossierStopOutcomeAlignment,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createAlignmentPayload() {
  return {
    SWE_BODELNING: {
      release_gate: "blocked",
      release_eval_freshness: "current",
      canonical_stop_outcome: {
        stop_outcome: "blocked",
      },
      release_gate_reason_codes: [
        "governance_baseline_fail_closed_pending_completeness_support_policy",
        "swe-bodelning-input-incomplete",
        "swe-bodelning-support-incomplete",
      ],
    },
    CMD_PROFILE: {
      release_gate: "blocked",
      release_eval_freshness: "current",
      canonical_stop_outcome: {
        stop_outcome: "blocked",
      },
      release_gate_reason_codes: [
        "cmd-input-incomplete",
        "cmd-runtime-not-implemented",
      ],
    },
  };
}

test("the current documented blocked/current dossier baseline aligns to the stop-outcome model for SWE_BODELNING where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateProfileDossierStopOutcomeAlignment(payload), payload);
  assert.equal(payload.SWE_BODELNING.release_gate, "blocked");
  assert.equal(payload.SWE_BODELNING.release_eval_freshness, "current");
  assert.deepEqual(payload.SWE_BODELNING.canonical_stop_outcome, {
    stop_outcome: "blocked",
  });
  assert.equal(sweBodelningProfileDossierSnapshot.properties.release_gate.type, "string");
  assert.equal(
    sweBodelningProfileDossierProjection.properties.release_gate.type,
    "string",
  );
});

test("the current documented blocked/current dossier baseline aligns to the stop-outcome model for CMD_PROFILE where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateProfileDossierStopOutcomeAlignment(payload), payload);
  assert.equal(payload.CMD_PROFILE.release_gate, "blocked");
  assert.equal(payload.CMD_PROFILE.release_eval_freshness, "current");
  assert.deepEqual(payload.CMD_PROFILE.canonical_stop_outcome, {
    stop_outcome: "blocked",
  });
  assert.equal(cmdProfileDossierSnapshot.properties.release_gate.type, "string");
  assert.equal(
    cmdProfileDossierProjection.properties.release_gate.$ref,
    "https://governance-contracts.invalid/schemas/cmd-profile-dossier-snapshot.json#/properties/release_gate",
  );
});

test("packages/schemas exports the profile_dossier stop-outcome alignment surface if applicable", () => {
  assert.deepEqual(profileDossierStopOutcomeAlignment, schema);
  assert.equal(typeof validateProfileDossierStopOutcomeAlignment, "function");
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

test("docs describe the same profile_dossier-to-stop-outcome alignment", () => {
  assert.match(
    docsText,
    /shared blocked\/current `profile_dossier` baseline is explicitly aligned to the neutral stop-outcome contract through `schemas\/profile-dossier-stop-outcome-alignment\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(docsText, /`release_gate = blocked`/);
  assert.match(docsText, /`release_eval_freshness = current`/);
  assert.match(docsText, /\{ "stop_outcome": "blocked" \}/);
  assert.match(
    docsText,
    /dossier `snapshot_status` currentness reporting remains intentionally outside this stop-outcome alignment surface/i,
  );
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
