const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/export-package-pdf-artifact-traceability-alignment.json");
const traceabilityModel = require("../schemas/traceability-model.json");
const sweBodelningExportPackagePdfArtifact = require("../schemas/swe-bodelning-export-package-pdf-artifact.json");
const sweBodelningExportPackagePdfArtifactProjection = require("../schemas/swe-bodelning-export-package-pdf-artifact-projection.json");
const cmdExportPackagePdfArtifact = require("../schemas/cmd-export-package-pdf-artifact.json");
const cmdExportPackagePdfArtifactProjection = require("../schemas/cmd-export-package-pdf-artifact-projection.json");
const {
  exportPackagePdfArtifactTraceabilityAlignment,
  validateExportPackagePdfArtifactTraceabilityAlignment,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createAlignmentPayload() {
  return {
    SWE_BODELNING_INPUT_INCOMPLETE: {
      jurisdiction_profile_key: "SWE_BODELNING",
      artifact_type: "export-package-pdf",
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
          "schemas/swe-bodelning-export-package-pdf-artifact.json",
          "schemas/swe-bodelning-export-package-pdf-artifact-projection.json",
        ],
        change_causes: ["changed_input"],
      },
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      jurisdiction_profile_key: "SWE_BODELNING",
      artifact_type: "export-package-pdf",
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
          "schemas/swe-bodelning-export-package-pdf-artifact.json",
          "schemas/swe-bodelning-export-package-pdf-artifact-projection.json",
        ],
        change_causes: ["changed_support"],
      },
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      jurisdiction_profile_key: "CMD_PROFILE",
      artifact_type: "export-package-pdf",
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
          "schemas/cmd-export-package-pdf-artifact.json",
          "schemas/cmd-export-package-pdf-artifact-projection.json",
        ],
        change_causes: ["changed_input"],
      },
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      jurisdiction_profile_key: "CMD_PROFILE",
      artifact_type: "export-package-pdf",
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
          "schemas/cmd-export-package-pdf-artifact.json",
          "schemas/cmd-export-package-pdf-artifact-projection.json",
        ],
        change_causes: ["changed_input", "changed_rule"],
      },
    },
  };
}

test("the current documented export_package_pdf_artifact input-incomplete baseline has canonical traceability alignment for SWE_BODELNING where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackagePdfArtifactTraceabilityAlignment(payload), payload);
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
      "schemas/swe-bodelning-export-package-pdf-artifact.json",
      "schemas/swe-bodelning-export-package-pdf-artifact-projection.json",
    ],
    change_causes: ["changed_input"],
  });
  assert.equal(
    sweBodelningExportPackagePdfArtifact.properties.artifact_type.const,
    "export-package-pdf",
  );
  assert.ok(sweBodelningExportPackagePdfArtifact.required.includes("body_base64"));
  assert.ok(
    sweBodelningExportPackagePdfArtifactProjection.required.includes(
      "snapshot_status",
    ),
  );
});

test("the current documented export_package_pdf_artifact input-incomplete baseline has canonical traceability alignment for CMD_PROFILE where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackagePdfArtifactTraceabilityAlignment(payload), payload);
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
      "schemas/cmd-export-package-pdf-artifact.json",
      "schemas/cmd-export-package-pdf-artifact-projection.json",
    ],
    change_causes: ["changed_input"],
  });
  assert.equal(
    cmdExportPackagePdfArtifact.properties.artifact_type.const,
    "export-package-pdf",
  );
  assert.ok(cmdExportPackagePdfArtifact.required.includes("body_base64"));
  assert.ok(
    cmdExportPackagePdfArtifactProjection.required.includes("snapshot_status"),
  );
});

test("the current documented export_package_pdf_artifact support-incomplete baseline has canonical traceability alignment for SWE_BODELNING where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackagePdfArtifactTraceabilityAlignment(payload), payload);
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
      "schemas/swe-bodelning-export-package-pdf-artifact.json",
      "schemas/swe-bodelning-export-package-pdf-artifact-projection.json",
    ],
    change_causes: ["changed_support"],
  });
  assert.equal(
    sweBodelningExportPackagePdfArtifact.properties.artifact_type.const,
    "export-package-pdf",
  );
  assert.ok(sweBodelningExportPackagePdfArtifact.required.includes("body_base64"));
  assert.ok(
    sweBodelningExportPackagePdfArtifactProjection.required.includes(
      "snapshot_status",
    ),
  );
});

test("the current documented first CMD_PROFILE rule as reflected through export_package_pdf_artifact has canonical traceability alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackagePdfArtifactTraceabilityAlignment(payload), payload);
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
        "schemas/cmd-export-package-pdf-artifact.json",
        "schemas/cmd-export-package-pdf-artifact-projection.json",
      ],
      change_causes: ["changed_input", "changed_rule"],
    },
  );
});

test("packages/schemas exports the export_package_pdf_artifact traceability alignment surface if applicable", () => {
  assert.deepEqual(exportPackagePdfArtifactTraceabilityAlignment, schema);
  assert.equal(typeof validateExportPackagePdfArtifactTraceabilityAlignment, "function");
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

test("docs describe the same export_package_pdf_artifact-to-traceability alignment", () => {
  assert.match(
    docsText,
    /shared `export_package_pdf_artifact` seam is also explicitly aligned to the neutral traceability contract through `schemas\/export-package-pdf-artifact-traceability-alignment\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(
    docsText,
    /persisted canonical export package snapshot from which the PDF artifact is deterministically derived/i,
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
    /PDF artifact `snapshot_status` currentness reporting remains intentionally outside this PDF artifact traceability alignment surface/i,
  );
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
