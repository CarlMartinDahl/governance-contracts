const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/export-package-json-artifact-stop-matrix-alignment.json");
const stopMatrixModel = require("../schemas/stop-matrix-model.json");
const sweBodelningExportPackageJsonArtifact = require("../schemas/swe-bodelning-export-package-json-artifact.json");
const sweBodelningExportPackageJsonArtifactProjection = require("../schemas/swe-bodelning-export-package-json-artifact-projection.json");
const cmdExportPackageJsonArtifact = require("../schemas/cmd-export-package-json-artifact.json");
const cmdExportPackageJsonArtifactProjection = require("../schemas/cmd-export-package-json-artifact-projection.json");
const {
  exportPackageJsonArtifactStopMatrixAlignment,
  validateExportPackageJsonArtifactStopMatrixAlignment,
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
      artifact_type: "export-package-json",
      source_export_package_profile_dossier_release_gate: "blocked",
      source_export_package_profile_dossier_release_eval_freshness: "current",
      source_export_package_profile_dossier_release_gate_reason_code:
        "swe-bodelning-input-incomplete",
      stop_matrix_entry: missingRequiredInputEntry,
    },
    CMD_PROFILE: {
      artifact_type: "export-package-json",
      source_export_package_profile_dossier_release_gate: "blocked",
      source_export_package_profile_dossier_release_eval_freshness: "current",
      source_export_package_profile_dossier_release_gate_reason_code:
        "cmd-input-incomplete",
      stop_matrix_entry: missingRequiredInputEntry,
    },
  };
}

test("the current documented export_package_json_artifact fail-closed baseline aligns to the stop-matrix model for SWE_BODELNING where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackageJsonArtifactStopMatrixAlignment(payload), payload);
  assert.equal(
    payload.SWE_BODELNING.source_export_package_profile_dossier_release_gate_reason_code,
    "swe-bodelning-input-incomplete",
  );
  assert.deepEqual(payload.SWE_BODELNING.stop_matrix_entry, {
    condition_key: "missing_required_input",
    canonical_stop_outcomes: [
      { stop_outcome: "blocked" },
      { stop_outcome: "insufficient_input" },
    ],
  });
  assert.equal(
    sweBodelningExportPackageJsonArtifact.properties.artifact_type.const,
    "export-package-json",
  );
  assert.ok(
    sweBodelningExportPackageJsonArtifactProjection.required.includes("snapshot_status"),
  );
});

test("the current documented export_package_json_artifact fail-closed baseline aligns to the stop-matrix model for CMD_PROFILE where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackageJsonArtifactStopMatrixAlignment(payload), payload);
  assert.equal(
    payload.CMD_PROFILE.source_export_package_profile_dossier_release_gate_reason_code,
    "cmd-input-incomplete",
  );
  assert.deepEqual(payload.CMD_PROFILE.stop_matrix_entry, {
    condition_key: "missing_required_input",
    canonical_stop_outcomes: [
      { stop_outcome: "blocked" },
      { stop_outcome: "insufficient_input" },
    ],
  });
  assert.equal(
    cmdExportPackageJsonArtifact.properties.artifact_type.const,
    "export-package-json",
  );
  assert.ok(cmdExportPackageJsonArtifactProjection.required.includes("snapshot_status"));
});

test("the documented export_package_json_artifact reason codes outside missing-required-input remain intentionally outside the stop-matrix alignment surface", () => {
  assert.equal(
    schema.properties.CMD_PROFILE.properties
      .source_export_package_profile_dossier_release_gate_reason_code.const,
    "cmd-input-incomplete",
  );
  assert.notEqual(
    schema.properties.CMD_PROFILE.properties
      .source_export_package_profile_dossier_release_gate_reason_code.const,
    "cmd-runtime-not-implemented",
  );
  assert.match(
    docsText,
    /source export package reason codes `cmd-runtime-not-implemented`, `swe-bodelning-support-incomplete`, and `governance_baseline_fail_closed_pending_completeness_support_policy` remain intentionally outside this JSON export artifact stop-matrix alignment surface/i,
  );
  assert.match(
    docsText,
    /JSON artifact `snapshot_status` currentness reporting remains outside this mapping surface/i,
  );
});

test("packages/schemas exports the export_package_json_artifact stop-matrix alignment surface if applicable", () => {
  assert.deepEqual(exportPackageJsonArtifactStopMatrixAlignment, schema);
  assert.equal(typeof validateExportPackageJsonArtifactStopMatrixAlignment, "function");
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

test("docs describe the same alignment", () => {
  assert.match(
    docsText,
    /shared `export_package_json_artifact` seam is also explicitly aligned to the neutral stop-matrix contract through `schemas\/export-package-json-artifact-stop-matrix-alignment\.json`/i,
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
