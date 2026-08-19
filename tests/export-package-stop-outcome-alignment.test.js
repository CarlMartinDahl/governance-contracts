const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/export-package-stop-outcome-alignment.json");
const stopOutcomeModel = require("../schemas/stop-outcome-model.json");
const sweBodelningExportPackage = require("../schemas/swe-bodelning-export-package.json");
const sweBodelningExportPackageProjection = require("../schemas/swe-bodelning-export-package-projection.json");
const cmdExportPackage = require("../schemas/cmd-export-package.json");
const cmdExportPackageProjection = require("../schemas/cmd-export-package-projection.json");
const {
  exportPackageStopOutcomeAlignment,
  validateExportPackageStopOutcomeAlignment,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createAlignmentPayload() {
  return {
    SWE_BODELNING: {
      profile_dossier_release_gate: "blocked",
      profile_dossier_release_eval_freshness: "current",
      canonical_stop_outcome: {
        stop_outcome: "blocked",
      },
      profile_dossier_release_gate_reason_codes: [
        "governance_baseline_fail_closed_pending_completeness_support_policy",
        "swe-bodelning-input-incomplete",
        "swe-bodelning-support-incomplete",
      ],
    },
    CMD_PROFILE: {
      profile_dossier_release_gate: "blocked",
      profile_dossier_release_eval_freshness: "current",
      canonical_stop_outcome: {
        stop_outcome: "blocked",
      },
      profile_dossier_release_gate_reason_codes: [
        "cmd-input-incomplete",
        "cmd-runtime-not-implemented",
      ],
    },
  };
}

test("the current documented export_package fail-closed baseline aligns to the stop-outcome model for SWE_BODELNING where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackageStopOutcomeAlignment(payload), payload);
  assert.equal(payload.SWE_BODELNING.profile_dossier_release_gate, "blocked");
  assert.equal(
    payload.SWE_BODELNING.profile_dossier_release_eval_freshness,
    "current",
  );
  assert.deepEqual(payload.SWE_BODELNING.canonical_stop_outcome, {
    stop_outcome: "blocked",
  });
  assert.equal(
    sweBodelningExportPackage.properties.profile_dossier_snapshot.$ref,
    "https://governance-contracts.invalid/schemas/swe-bodelning-profile-dossier-snapshot.json",
  );
  assert.equal(
    sweBodelningExportPackageProjection.properties.profile_dossier_snapshot.$ref,
    "https://governance-contracts.invalid/schemas/swe-bodelning-profile-dossier-snapshot.json",
  );
});

test("the current documented export_package fail-closed baseline aligns to the stop-outcome model for CMD_PROFILE where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackageStopOutcomeAlignment(payload), payload);
  assert.equal(payload.CMD_PROFILE.profile_dossier_release_gate, "blocked");
  assert.equal(
    payload.CMD_PROFILE.profile_dossier_release_eval_freshness,
    "current",
  );
  assert.deepEqual(payload.CMD_PROFILE.canonical_stop_outcome, {
    stop_outcome: "blocked",
  });
  assert.equal(
    cmdExportPackage.properties.profile_dossier_snapshot.$ref,
    "https://governance-contracts.invalid/schemas/cmd-profile-dossier-snapshot.json",
  );
  assert.equal(
    cmdExportPackageProjection.properties.profile_dossier_snapshot.$ref,
    "https://governance-contracts.invalid/schemas/cmd-profile-dossier-snapshot.json",
  );
});

test("packages/schemas exports the export_package stop-outcome alignment surface if applicable", () => {
  assert.deepEqual(exportPackageStopOutcomeAlignment, schema);
  assert.equal(typeof validateExportPackageStopOutcomeAlignment, "function");
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

test("docs describe the same export_package-to-stop-outcome alignment", () => {
  assert.match(
    docsText,
    /shared blocked\/current `export_package` baseline is explicitly aligned to the neutral stop-outcome contract through `schemas\/export-package-stop-outcome-alignment\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(docsText, /`profile_dossier_snapshot\.release_gate = blocked`/);
  assert.match(
    docsText,
    /`profile_dossier_snapshot\.release_eval_freshness = current`/,
  );
  assert.match(docsText, /\{ "stop_outcome": "blocked" \}/);
  assert.match(
    docsText,
    /export package `snapshot_status` currentness reporting remains intentionally outside this stop-outcome alignment surface/i,
  );
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
