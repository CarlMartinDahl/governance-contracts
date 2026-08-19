const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/export-package-bundle-manifest-stop-matrix-alignment.json");
const stopMatrixModel = require("../schemas/stop-matrix-model.json");
const sweBodelningExportPackageBundleManifest = require("../schemas/swe-bodelning-export-package-bundle-manifest.json");
const sweBodelningExportPackageBundleManifestProjection = require("../schemas/swe-bodelning-export-package-bundle-manifest-projection.json");
const cmdExportPackageBundleManifest = require("../schemas/cmd-export-package-bundle-manifest.json");
const cmdExportPackageBundleManifestProjection = require("../schemas/cmd-export-package-bundle-manifest-projection.json");
const {
  exportPackageBundleManifestStopMatrixAlignment,
  validateExportPackageBundleManifestStopMatrixAlignment,
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
      source_export_package_profile_dossier_release_gate: "blocked",
      source_export_package_profile_dossier_release_eval_freshness: "current",
      source_export_package_profile_dossier_release_gate_reason_code:
        "swe-bodelning-input-incomplete",
      stop_matrix_entry: missingRequiredInputEntry,
    },
    CMD_PROFILE: {
      source_export_package_profile_dossier_release_gate: "blocked",
      source_export_package_profile_dossier_release_eval_freshness: "current",
      source_export_package_profile_dossier_release_gate_reason_code:
        "cmd-input-incomplete",
      stop_matrix_entry: missingRequiredInputEntry,
    },
  };
}

test("the current documented export_package_bundle_manifest fail-closed baseline aligns to the stop-matrix model for SWE_BODELNING where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackageBundleManifestStopMatrixAlignment(payload), payload);
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
  assert.ok(sweBodelningExportPackageBundleManifest.required.includes("artifacts"));
  assert.ok(
    sweBodelningExportPackageBundleManifestProjection.required.includes(
      "snapshot_status",
    ),
  );
});

test("the current documented export_package_bundle_manifest fail-closed baseline aligns to the stop-matrix model for CMD_PROFILE where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackageBundleManifestStopMatrixAlignment(payload), payload);
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
  assert.ok(cmdExportPackageBundleManifest.required.includes("artifacts"));
  assert.ok(
    cmdExportPackageBundleManifestProjection.required.includes("snapshot_status"),
  );
});

test("packages/schemas exports the export_package_bundle_manifest stop-matrix alignment surface if applicable", () => {
  assert.deepEqual(exportPackageBundleManifestStopMatrixAlignment, schema);
  assert.equal(typeof validateExportPackageBundleManifestStopMatrixAlignment, "function");
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
    /shared `export_package_bundle_manifest` seam is also explicitly aligned to the neutral stop-matrix contract through `schemas\/export-package-bundle-manifest-stop-matrix-alignment\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(docsText, /`missing_required_input`/);
  assert.match(docsText, /`swe-bodelning-input-incomplete`/);
  assert.match(docsText, /`cmd-input-incomplete`/);
  assert.match(
    docsText,
    /source export package reason codes `cmd-runtime-not-implemented`, `swe-bodelning-support-incomplete`, and `governance_baseline_fail_closed_pending_completeness_support_policy` remain intentionally outside this bundle\/package manifest stop-matrix alignment surface/i,
  );
  assert.match(
    docsText,
    /bundle\/package manifest `snapshot_status` currentness reporting remains outside this mapping surface/i,
  );
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
