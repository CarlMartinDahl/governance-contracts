const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/export-package-bundle-manifest-traceability-alignment.json");
const traceabilityModel = require("../schemas/traceability-model.json");
const sweBodelningExportPackageBundleManifest = require("../schemas/swe-bodelning-export-package-bundle-manifest.json");
const sweBodelningExportPackageBundleManifestProjection = require("../schemas/swe-bodelning-export-package-bundle-manifest-projection.json");
const cmdExportPackageBundleManifest = require("../schemas/cmd-export-package-bundle-manifest.json");
const cmdExportPackageBundleManifestProjection = require("../schemas/cmd-export-package-bundle-manifest-projection.json");
const {
  exportPackageBundleManifestTraceabilityAlignment,
  validateExportPackageBundleManifestTraceabilityAlignment,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createAlignmentPayload() {
  return {
    SWE_BODELNING_INPUT_INCOMPLETE: {
      jurisdiction_profile_key: "SWE_BODELNING",
      source_export_package_profile_dossier_release_gate: "blocked",
      source_export_package_profile_dossier_release_eval_freshness: "current",
      source_export_package_profile_dossier_release_gate_reason_code:
        "swe-bodelning-input-incomplete",
      traceability: {
        input_references: ["profile_input_summary.missing_value_lane_keys"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-input-incomplete",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: [
          "schemas/swe-bodelning-export-package-bundle-manifest.json",
          "schemas/swe-bodelning-export-package-bundle-manifest-projection.json",
        ],
        change_causes: ["changed_input"],
      },
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      jurisdiction_profile_key: "SWE_BODELNING",
      source_export_package_profile_dossier_release_gate: "blocked",
      source_export_package_profile_dossier_release_eval_freshness: "current",
      source_export_package_profile_dossier_release_gate_reason_code:
        "swe-bodelning-support-incomplete",
      traceability: {
        input_references: ["profile_input_summary.missing_support_lane_keys"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-support-incomplete",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: [
          "schemas/swe-bodelning-export-package-bundle-manifest.json",
          "schemas/swe-bodelning-export-package-bundle-manifest-projection.json",
        ],
        change_causes: ["changed_support"],
      },
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      jurisdiction_profile_key: "CMD_PROFILE",
      source_export_package_profile_dossier_release_gate: "blocked",
      source_export_package_profile_dossier_release_eval_freshness: "current",
      source_export_package_profile_dossier_release_gate_reason_code:
        "cmd-input-incomplete",
      traceability: {
        input_references: ["profile_input_summary.missing_value_lane_keys"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::cmd-input-incomplete",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: [
          "schemas/cmd-export-package-bundle-manifest.json",
          "schemas/cmd-export-package-bundle-manifest-projection.json",
        ],
        change_causes: ["changed_input"],
      },
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      jurisdiction_profile_key: "CMD_PROFILE",
      source_export_package_profile_dossier_release_gate: "blocked",
      source_export_package_profile_dossier_release_eval_freshness: "current",
      source_export_package_profile_dossier_release_gate_reason_code:
        "cmd-runtime-not-implemented",
      traceability: {
        input_references: ["profile_input_lane_snapshot.cmd_primary_signal.value"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::cmd-primary-signal-present-but-runtime-not-implemented",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: [
          "schemas/cmd-export-package-bundle-manifest.json",
          "schemas/cmd-export-package-bundle-manifest-projection.json",
        ],
        change_causes: ["changed_input", "changed_rule"],
      },
    },
  };
}

test("the current documented export_package_bundle_manifest input-incomplete baseline has canonical traceability alignment for SWE_BODELNING where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(
    validateExportPackageBundleManifestTraceabilityAlignment(payload),
    payload,
  );
  assert.equal(
    payload.SWE_BODELNING_INPUT_INCOMPLETE
      .source_export_package_profile_dossier_release_gate_reason_code,
    "swe-bodelning-input-incomplete",
  );
  assert.deepEqual(payload.SWE_BODELNING_INPUT_INCOMPLETE.traceability, {
    input_references: ["profile_input_summary.missing_value_lane_keys"],
    documented_rule_references: [
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-input-incomplete",
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
    ],
    canonical_output_references: [
      "schemas/swe-bodelning-export-package-bundle-manifest.json",
      "schemas/swe-bodelning-export-package-bundle-manifest-projection.json",
    ],
    change_causes: ["changed_input"],
  });
  assert.ok(sweBodelningExportPackageBundleManifest.required.includes("artifacts"));
  assert.ok(
    sweBodelningExportPackageBundleManifestProjection.required.includes(
      "snapshot_status",
    ),
  );
});

test("the current documented export_package_bundle_manifest support-incomplete baseline has canonical traceability alignment for SWE_BODELNING where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(
    validateExportPackageBundleManifestTraceabilityAlignment(payload),
    payload,
  );
  assert.equal(
    payload.SWE_BODELNING_SUPPORT_INCOMPLETE
      .source_export_package_profile_dossier_release_gate_reason_code,
    "swe-bodelning-support-incomplete",
  );
  assert.deepEqual(payload.SWE_BODELNING_SUPPORT_INCOMPLETE.traceability, {
    input_references: ["profile_input_summary.missing_support_lane_keys"],
    documented_rule_references: [
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-support-incomplete",
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
    ],
    canonical_output_references: [
      "schemas/swe-bodelning-export-package-bundle-manifest.json",
      "schemas/swe-bodelning-export-package-bundle-manifest-projection.json",
    ],
    change_causes: ["changed_support"],
  });
  assert.ok(sweBodelningExportPackageBundleManifest.required.includes("artifacts"));
  assert.ok(
    sweBodelningExportPackageBundleManifestProjection.required.includes(
      "snapshot_status",
    ),
  );
});

test("the current documented export_package_bundle_manifest input-incomplete baseline has canonical traceability alignment for CMD_PROFILE where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(
    validateExportPackageBundleManifestTraceabilityAlignment(payload),
    payload,
  );
  assert.equal(
    payload.CMD_PROFILE_INPUT_INCOMPLETE
      .source_export_package_profile_dossier_release_gate_reason_code,
    "cmd-input-incomplete",
  );
  assert.deepEqual(payload.CMD_PROFILE_INPUT_INCOMPLETE.traceability, {
    input_references: ["profile_input_summary.missing_value_lane_keys"],
    documented_rule_references: [
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::cmd-input-incomplete",
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
    ],
    canonical_output_references: [
      "schemas/cmd-export-package-bundle-manifest.json",
      "schemas/cmd-export-package-bundle-manifest-projection.json",
    ],
    change_causes: ["changed_input"],
  });
  assert.ok(cmdExportPackageBundleManifest.required.includes("artifacts"));
  assert.ok(
    cmdExportPackageBundleManifestProjection.required.includes("snapshot_status"),
  );
});

test("the current documented first CMD_PROFILE rule as reflected through export_package_bundle_manifest has canonical traceability alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(
    validateExportPackageBundleManifestTraceabilityAlignment(payload),
    payload,
  );
  assert.equal(
    payload.CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED
      .source_export_package_profile_dossier_release_gate_reason_code,
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
      canonical_output_references: [
        "schemas/cmd-export-package-bundle-manifest.json",
        "schemas/cmd-export-package-bundle-manifest-projection.json",
      ],
      change_causes: ["changed_input", "changed_rule"],
    },
  );
});

test("packages/schemas exports the export_package_bundle_manifest traceability alignment surface if applicable", () => {
  assert.deepEqual(exportPackageBundleManifestTraceabilityAlignment, schema);
  assert.equal(
    typeof validateExportPackageBundleManifestTraceabilityAlignment,
    "function",
  );
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

test("docs describe the same alignment", () => {
  assert.match(
    docsText,
    /shared `export_package_bundle_manifest` seam is also explicitly aligned to the neutral traceability contract through `schemas\/export-package-bundle-manifest-traceability-alignment\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(
    docsText,
    /persisted canonical export package snapshot plus the required persisted canonical JSON, Markdown, PDF, and DOCX artifact snapshots/i,
  );
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
  assert.match(
    docsText,
    /Bundle\/package manifest `snapshot_status` currentness reporting remains intentionally outside this bundle\/package manifest traceability alignment surface/i,
  );
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
