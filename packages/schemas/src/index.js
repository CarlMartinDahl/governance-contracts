const jurisdictionProfileRegistry = require("../../../schemas/jurisdiction-profile-registry.json");
const exportPackageJsonArtifactStopMatrixAlignment = require("../../../schemas/export-package-json-artifact-stop-matrix-alignment.json");
const exportPackageJsonArtifactStopOutcomeAlignment = require("../../../schemas/export-package-json-artifact-stop-outcome-alignment.json");
const exportPackageJsonArtifactTraceabilityAlignment = require("../../../schemas/export-package-json-artifact-traceability-alignment.json");
const exportPackageDocxArtifactStopMatrixAlignment = require("../../../schemas/export-package-docx-artifact-stop-matrix-alignment.json");
const exportPackageDocxArtifactStopOutcomeAlignment = require("../../../schemas/export-package-docx-artifact-stop-outcome-alignment.json");
const exportPackageDocxArtifactTraceabilityAlignment = require("../../../schemas/export-package-docx-artifact-traceability-alignment.json");
const exportPackageMarkdownArtifactStopMatrixAlignment = require("../../../schemas/export-package-markdown-artifact-stop-matrix-alignment.json");
const exportPackageMarkdownArtifactStopOutcomeAlignment = require("../../../schemas/export-package-markdown-artifact-stop-outcome-alignment.json");
const exportPackageMarkdownArtifactTraceabilityAlignment = require("../../../schemas/export-package-markdown-artifact-traceability-alignment.json");
const exportPackagePdfArtifactStopMatrixAlignment = require("../../../schemas/export-package-pdf-artifact-stop-matrix-alignment.json");
const exportPackagePdfArtifactStopOutcomeAlignment = require("../../../schemas/export-package-pdf-artifact-stop-outcome-alignment.json");
const exportPackagePdfArtifactTraceabilityAlignment = require("../../../schemas/export-package-pdf-artifact-traceability-alignment.json");
const exportPackageBundleArchiveArtifactStopMatrixAlignment = require("../../../schemas/export-package-bundle-archive-artifact-stop-matrix-alignment.json");
const exportPackageBundleArchiveArtifactStopOutcomeAlignment = require("../../../schemas/export-package-bundle-archive-artifact-stop-outcome-alignment.json");
const exportPackageBundleArchiveArtifactTraceabilityAlignment = require("../../../schemas/export-package-bundle-archive-artifact-traceability-alignment.json");
const exportPackageBundleManifestStopMatrixAlignment = require("../../../schemas/export-package-bundle-manifest-stop-matrix-alignment.json");
const exportPackageBundleManifestStopOutcomeAlignment = require("../../../schemas/export-package-bundle-manifest-stop-outcome-alignment.json");
const exportPackageBundleManifestTraceabilityAlignment = require("../../../schemas/export-package-bundle-manifest-traceability-alignment.json");
const exportPackageStopMatrixAlignment = require("../../../schemas/export-package-stop-matrix-alignment.json");
const exportPackageStopOutcomeAlignment = require("../../../schemas/export-package-stop-outcome-alignment.json");
const exportPackageTraceabilityAlignment = require("../../../schemas/export-package-traceability-alignment.json");
const profileInputSemanticFactAlignment = require("../../../schemas/profile-input-semantic-fact-alignment.json");
const profileDossierStopMatrixAlignment = require("../../../schemas/profile-dossier-stop-matrix-alignment.json");
const profileDossierStopOutcomeAlignment = require("../../../schemas/profile-dossier-stop-outcome-alignment.json");
const profileDossierTraceabilityAlignment = require("../../../schemas/profile-dossier-traceability-alignment.json");
const releaseEvalSemanticFactAlignment = require("../../../schemas/release-eval-semantic-fact-alignment.json");
const releaseEvalStopMatrixAlignment = require("../../../schemas/release-eval-stop-matrix-alignment.json");
const releaseEvalStopOutcomeAlignment = require("../../../schemas/release-eval-stop-outcome-alignment.json");
const releaseEvalTraceabilityAlignment = require("../../../schemas/release-eval-traceability-alignment.json");
const snapshotStatusTraceabilityAlignment = require("../../../schemas/snapshot-status-traceability-alignment.json");
const semanticFactModel = require("../../../schemas/semantic-fact-model.json");
const stopMatrixModel = require("../../../schemas/stop-matrix-model.json");
const stopOutcomeModel = require("../../../schemas/stop-outcome-model.json");
const traceabilityModel = require("../../../schemas/traceability-model.json"), noRawMetadataManifest = require("../../../schemas/no-raw-metadata-manifest.json"), controlledSyntheticRedTeamResultEnvelope = require("../../../schemas/controlled-synthetic-red-team-result-envelope.json"), controlledSyntheticRedTeamResultEnvelopeValidatorResult = require("../../../schemas/controlled-synthetic-red-team-result-envelope-validator-result.json"), { validateControlledSyntheticRedTeamResultEnvelope } = require("./controlled-synthetic-red-team-result-envelope-validator.js");
const cmdExportPackage = require("../../../schemas/cmd-export-package.json");
const cmdExportPackageBundleArchiveArtifact = require("../../../schemas/cmd-export-package-bundle-archive-artifact.json");
const cmdExportPackageBundleArchiveArtifactProjection = require("../../../schemas/cmd-export-package-bundle-archive-artifact-projection.json");
const cmdExportPackageBundleManifest = require("../../../schemas/cmd-export-package-bundle-manifest.json");
const cmdExportPackageBundleManifestProjection = require("../../../schemas/cmd-export-package-bundle-manifest-projection.json");
const cmdExportPackageDocxArtifact = require("../../../schemas/cmd-export-package-docx-artifact.json");
const cmdExportPackageDocxArtifactProjection = require("../../../schemas/cmd-export-package-docx-artifact-projection.json");
const cmdExportPackagePdfArtifact = require("../../../schemas/cmd-export-package-pdf-artifact.json");
const cmdExportPackagePdfArtifactProjection = require("../../../schemas/cmd-export-package-pdf-artifact-projection.json");
const cmdExportPackageJsonArtifact = require("../../../schemas/cmd-export-package-json-artifact.json");
const cmdExportPackageJsonArtifactProjection = require("../../../schemas/cmd-export-package-json-artifact-projection.json");
const cmdExportPackageMarkdownArtifact = require("../../../schemas/cmd-export-package-markdown-artifact.json");
const cmdExportPackageMarkdownArtifactProjection = require("../../../schemas/cmd-export-package-markdown-artifact-projection.json");
const cmdExportPackageProjection = require("../../../schemas/cmd-export-package-projection.json");
const cmdProfileDossierProjection = require("../../../schemas/cmd-profile-dossier-projection.json");
const cmdProfileDossierSnapshot = require("../../../schemas/cmd-profile-dossier-snapshot.json");
const cmdProfileInput = require("../../../schemas/cmd-profile-input.json");
const cmdReleaseEvalRun = require("../../../schemas/cmd-release-eval-run.json");
const sweBodelningProfileInput = require("../../../schemas/swe-bodelning-profile-input.json");
const sweBodelningExportPackageBundleArchiveArtifact = require("../../../schemas/swe-bodelning-export-package-bundle-archive-artifact.json");
const sweBodelningExportPackageBundleArchiveArtifactProjection = require("../../../schemas/swe-bodelning-export-package-bundle-archive-artifact-projection.json");
const sweBodelningExportPackageBundleManifest = require("../../../schemas/swe-bodelning-export-package-bundle-manifest.json");
const sweBodelningExportPackageBundleManifestProjection = require("../../../schemas/swe-bodelning-export-package-bundle-manifest-projection.json");
const sweBodelningExportPackage = require("../../../schemas/swe-bodelning-export-package.json");
const sweBodelningExportPackageDocxArtifact = require("../../../schemas/swe-bodelning-export-package-docx-artifact.json");
const sweBodelningExportPackageDocxArtifactProjection = require("../../../schemas/swe-bodelning-export-package-docx-artifact-projection.json");
const sweBodelningExportPackagePdfArtifact = require("../../../schemas/swe-bodelning-export-package-pdf-artifact.json");
const sweBodelningExportPackageJsonArtifact = require("../../../schemas/swe-bodelning-export-package-json-artifact.json");
const sweBodelningExportPackageMarkdownArtifact = require("../../../schemas/swe-bodelning-export-package-markdown-artifact.json");
const sweBodelningExportPackagePdfArtifactProjection = require("../../../schemas/swe-bodelning-export-package-pdf-artifact-projection.json");
const sweBodelningExportPackageJsonArtifactProjection = require("../../../schemas/swe-bodelning-export-package-json-artifact-projection.json");
const sweBodelningExportPackageMarkdownArtifactProjection = require("../../../schemas/swe-bodelning-export-package-markdown-artifact-projection.json");
const sweBodelningExportPackageProjection = require("../../../schemas/swe-bodelning-export-package-projection.json");
const sweBodelningProfileDossierProjection = require("../../../schemas/swe-bodelning-profile-dossier-projection.json");
const sweBodelningProfileDossierSnapshot = require("../../../schemas/swe-bodelning-profile-dossier-snapshot.json");
const sweBodelningReleaseEvalRun = require("../../../schemas/swe-bodelning-release-eval-run.json");

const jurisdictionProfileRegistryRequiredKeys = jurisdictionProfileRegistry.required;
const exportPackageStopMatrixAlignmentRequiredKeys =
  exportPackageStopMatrixAlignment.required;
const exportPackageStopMatrixAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageStopMatrixAlignment.properties.SWE_BODELNING.required,
    CMD_PROFILE: exportPackageStopMatrixAlignment.properties.CMD_PROFILE.required,
  });
const exportPackageStopMatrixAlignmentReasonCodeByProfile = Object.freeze({
  SWE_BODELNING:
    exportPackageStopMatrixAlignment.properties.SWE_BODELNING.properties
      .profile_dossier_release_gate_reason_code.const,
  CMD_PROFILE:
    exportPackageStopMatrixAlignment.properties.CMD_PROFILE.properties
      .profile_dossier_release_gate_reason_code.const,
});
const exportPackageStopMatrixAlignmentReleaseGateValue =
  exportPackageStopMatrixAlignment.properties.SWE_BODELNING.properties
    .profile_dossier_release_gate.const;
const exportPackageStopMatrixAlignmentFreshnessValue =
  exportPackageStopMatrixAlignment.properties.SWE_BODELNING.properties
    .profile_dossier_release_eval_freshness.const;
const exportPackageStopMatrixAlignmentConditionKey = "missing_required_input";
const exportPackageStopOutcomeAlignmentRequiredKeys =
  exportPackageStopOutcomeAlignment.required;
const exportPackageStopOutcomeAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageStopOutcomeAlignment.properties.SWE_BODELNING.required,
    CMD_PROFILE: exportPackageStopOutcomeAlignment.properties.CMD_PROFILE.required,
  });
const exportPackageStopOutcomeAlignmentReasonCodesByProfile = Object.freeze({
  SWE_BODELNING:
    exportPackageStopOutcomeAlignment.properties.SWE_BODELNING.properties
      .profile_dossier_release_gate_reason_codes.items.enum,
  CMD_PROFILE:
    exportPackageStopOutcomeAlignment.properties.CMD_PROFILE.properties
      .profile_dossier_release_gate_reason_codes.items.enum,
});
const exportPackageStopOutcomeAlignmentReleaseGateValue =
  exportPackageStopOutcomeAlignment.properties.SWE_BODELNING.properties
    .profile_dossier_release_gate.const;
const exportPackageStopOutcomeAlignmentFreshnessValue =
  exportPackageStopOutcomeAlignment.properties.SWE_BODELNING.properties
    .profile_dossier_release_eval_freshness.const;
const exportPackageBundleArchiveArtifactStopOutcomeAlignmentRequiredKeys =
  exportPackageBundleArchiveArtifactStopOutcomeAlignment.required;
const exportPackageBundleArchiveArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageBundleArchiveArtifactStopOutcomeAlignment.properties
        .SWE_BODELNING.required,
    CMD_PROFILE:
      exportPackageBundleArchiveArtifactStopOutcomeAlignment.properties.CMD_PROFILE
        .required,
  });
const exportPackageBundleArchiveArtifactStopOutcomeAlignmentReasonCodesByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageBundleArchiveArtifactStopOutcomeAlignment.properties
        .SWE_BODELNING.properties
        .source_export_package_profile_dossier_release_gate_reason_codes.items.enum,
    CMD_PROFILE:
      exportPackageBundleArchiveArtifactStopOutcomeAlignment.properties.CMD_PROFILE
        .properties.source_export_package_profile_dossier_release_gate_reason_codes
        .items.enum,
  });
const exportPackageBundleArchiveArtifactStopOutcomeAlignmentArtifactTypeValue =
  exportPackageBundleArchiveArtifactStopOutcomeAlignment.properties.SWE_BODELNING
    .properties.artifact_type.const;
const exportPackageBundleArchiveArtifactStopOutcomeAlignmentReleaseGateValue =
  exportPackageBundleArchiveArtifactStopOutcomeAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_gate.const;
const exportPackageBundleArchiveArtifactStopOutcomeAlignmentFreshnessValue =
  exportPackageBundleArchiveArtifactStopOutcomeAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackageBundleArchiveArtifactStopMatrixAlignmentRequiredKeys =
  exportPackageBundleArchiveArtifactStopMatrixAlignment.required;
const exportPackageBundleArchiveArtifactStopMatrixAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageBundleArchiveArtifactStopMatrixAlignment.properties
        .SWE_BODELNING.required,
    CMD_PROFILE:
      exportPackageBundleArchiveArtifactStopMatrixAlignment.properties.CMD_PROFILE
        .required,
  });
const exportPackageBundleArchiveArtifactStopMatrixAlignmentArtifactTypeValue =
  exportPackageBundleArchiveArtifactStopMatrixAlignment.properties.SWE_BODELNING
    .properties.artifact_type.const;
const exportPackageBundleArchiveArtifactStopMatrixAlignmentReleaseGateValue =
  exportPackageBundleArchiveArtifactStopMatrixAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_gate.const;
const exportPackageBundleArchiveArtifactStopMatrixAlignmentFreshnessValue =
  exportPackageBundleArchiveArtifactStopMatrixAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackageBundleArchiveArtifactStopMatrixAlignmentReasonCodeByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageBundleArchiveArtifactStopMatrixAlignment.properties
        .SWE_BODELNING.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE:
      exportPackageBundleArchiveArtifactStopMatrixAlignment.properties.CMD_PROFILE
        .properties.source_export_package_profile_dossier_release_gate_reason_code
        .const,
  });
const exportPackageBundleArchiveArtifactStopMatrixAlignmentConditionKey =
  exportPackageBundleArchiveArtifactStopMatrixAlignment.properties.SWE_BODELNING
    .properties.stop_matrix_entry.allOf[1].properties.condition_key.const;
const exportPackageBundleArchiveArtifactTraceabilityAlignmentRequiredKeys =
  exportPackageBundleArchiveArtifactTraceabilityAlignment.required;
const exportPackageBundleArchiveArtifactTraceabilityAlignmentEntryRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.required,
  });
const exportPackageBundleArchiveArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .jurisdiction_profile_key.const,
  });
const exportPackageBundleArchiveArtifactTraceabilityAlignmentArtifactTypeByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.artifact_type.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.artifact_type.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.artifact_type.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .artifact_type.const,
  });
const exportPackageBundleArchiveArtifactTraceabilityAlignmentReleaseGateByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate.const,
  });
const exportPackageBundleArchiveArtifactTraceabilityAlignmentFreshnessByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
  });
const exportPackageBundleArchiveArtifactTraceabilityAlignmentReasonCodeByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
  });
const exportPackageBundleArchiveArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .traceability.allOf[1].required,
  });
const exportPackageBundleArchiveArtifactTraceabilityAlignmentCanonicalTraceabilityByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE: {
      input_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      input_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      input_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      input_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageBundleArchiveArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.change_causes.items.enum,
    },
  });
const exportPackageBundleManifestStopOutcomeAlignmentRequiredKeys =
  exportPackageBundleManifestStopOutcomeAlignment.required;
const exportPackageBundleManifestStopOutcomeAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageBundleManifestStopOutcomeAlignment.properties.SWE_BODELNING
        .required,
    CMD_PROFILE:
      exportPackageBundleManifestStopOutcomeAlignment.properties.CMD_PROFILE
        .required,
  });
const exportPackageBundleManifestStopOutcomeAlignmentReasonCodesByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageBundleManifestStopOutcomeAlignment.properties.SWE_BODELNING
        .properties.source_export_package_profile_dossier_release_gate_reason_codes
        .items.enum,
    CMD_PROFILE:
      exportPackageBundleManifestStopOutcomeAlignment.properties.CMD_PROFILE
        .properties.source_export_package_profile_dossier_release_gate_reason_codes
        .items.enum,
  });
const exportPackageBundleManifestStopOutcomeAlignmentReleaseGateValue =
  exportPackageBundleManifestStopOutcomeAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_gate.const;
const exportPackageBundleManifestStopOutcomeAlignmentFreshnessValue =
  exportPackageBundleManifestStopOutcomeAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackageBundleManifestStopMatrixAlignmentRequiredKeys =
  exportPackageBundleManifestStopMatrixAlignment.required;
const exportPackageBundleManifestStopMatrixAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageBundleManifestStopMatrixAlignment.properties.SWE_BODELNING
        .required,
    CMD_PROFILE:
      exportPackageBundleManifestStopMatrixAlignment.properties.CMD_PROFILE
        .required,
  });
const exportPackageBundleManifestStopMatrixAlignmentReleaseGateValue =
  exportPackageBundleManifestStopMatrixAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_gate.const;
const exportPackageBundleManifestStopMatrixAlignmentFreshnessValue =
  exportPackageBundleManifestStopMatrixAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackageBundleManifestStopMatrixAlignmentReasonCodeByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageBundleManifestStopMatrixAlignment.properties.SWE_BODELNING
        .properties.source_export_package_profile_dossier_release_gate_reason_code
        .const,
    CMD_PROFILE:
      exportPackageBundleManifestStopMatrixAlignment.properties.CMD_PROFILE
        .properties.source_export_package_profile_dossier_release_gate_reason_code
        .const,
  });
const exportPackageBundleManifestStopMatrixAlignmentConditionKey =
  exportPackageBundleManifestStopMatrixAlignment.properties.SWE_BODELNING
    .properties.stop_matrix_entry.allOf[1].properties.condition_key.const;
const exportPackageBundleManifestTraceabilityAlignmentRequiredKeys =
  exportPackageBundleManifestTraceabilityAlignment.required;
const exportPackageBundleManifestTraceabilityAlignmentEntryRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.required,
  });
const exportPackageBundleManifestTraceabilityAlignmentJurisdictionProfileKeyByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .jurisdiction_profile_key.const,
  });
const exportPackageBundleManifestTraceabilityAlignmentReleaseGateByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate.const,
  });
const exportPackageBundleManifestTraceabilityAlignmentFreshnessByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
  });
const exportPackageBundleManifestTraceabilityAlignmentReasonCodeByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
  });
const exportPackageBundleManifestTraceabilityAlignmentTraceabilityRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageBundleManifestTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .traceability.allOf[1].required,
  });
const exportPackageBundleManifestTraceabilityAlignmentCanonicalTraceabilityByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE: {
      input_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      input_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      input_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      input_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageBundleManifestTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.change_causes.items.enum,
    },
  });
const exportPackageJsonArtifactStopOutcomeAlignmentRequiredKeys =
  exportPackageJsonArtifactStopOutcomeAlignment.required;
const exportPackageJsonArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageJsonArtifactStopOutcomeAlignment.properties.SWE_BODELNING
        .required,
    CMD_PROFILE:
      exportPackageJsonArtifactStopOutcomeAlignment.properties.CMD_PROFILE.required,
  });
const exportPackageJsonArtifactStopOutcomeAlignmentReasonCodesByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageJsonArtifactStopOutcomeAlignment.properties.SWE_BODELNING
        .properties.source_export_package_profile_dossier_release_gate_reason_codes
        .items.enum,
    CMD_PROFILE:
      exportPackageJsonArtifactStopOutcomeAlignment.properties.CMD_PROFILE
        .properties.source_export_package_profile_dossier_release_gate_reason_codes
        .items.enum,
  });
const exportPackageJsonArtifactStopOutcomeAlignmentArtifactTypeValue =
  exportPackageJsonArtifactStopOutcomeAlignment.properties.SWE_BODELNING.properties
    .artifact_type.const;
const exportPackageJsonArtifactStopOutcomeAlignmentReleaseGateValue =
  exportPackageJsonArtifactStopOutcomeAlignment.properties.SWE_BODELNING.properties
    .source_export_package_profile_dossier_release_gate.const;
const exportPackageJsonArtifactStopOutcomeAlignmentFreshnessValue =
  exportPackageJsonArtifactStopOutcomeAlignment.properties.SWE_BODELNING.properties
    .source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackageMarkdownArtifactStopOutcomeAlignmentRequiredKeys =
  exportPackageMarkdownArtifactStopOutcomeAlignment.required;
const exportPackageMarkdownArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageMarkdownArtifactStopOutcomeAlignment.properties.SWE_BODELNING
        .required,
    CMD_PROFILE:
      exportPackageMarkdownArtifactStopOutcomeAlignment.properties.CMD_PROFILE
        .required,
  });
const exportPackageMarkdownArtifactStopOutcomeAlignmentReasonCodesByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageMarkdownArtifactStopOutcomeAlignment.properties.SWE_BODELNING
        .properties.source_export_package_profile_dossier_release_gate_reason_codes
        .items.enum,
    CMD_PROFILE:
      exportPackageMarkdownArtifactStopOutcomeAlignment.properties.CMD_PROFILE
        .properties.source_export_package_profile_dossier_release_gate_reason_codes
        .items.enum,
  });
const exportPackageMarkdownArtifactStopOutcomeAlignmentArtifactTypeValue =
  exportPackageMarkdownArtifactStopOutcomeAlignment.properties.SWE_BODELNING
    .properties.artifact_type.const;
const exportPackageMarkdownArtifactStopOutcomeAlignmentReleaseGateValue =
  exportPackageMarkdownArtifactStopOutcomeAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_gate.const;
const exportPackageMarkdownArtifactStopOutcomeAlignmentFreshnessValue =
  exportPackageMarkdownArtifactStopOutcomeAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackageDocxArtifactStopOutcomeAlignmentRequiredKeys =
  exportPackageDocxArtifactStopOutcomeAlignment.required;
const exportPackageDocxArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageDocxArtifactStopOutcomeAlignment.properties.SWE_BODELNING.required,
    CMD_PROFILE:
      exportPackageDocxArtifactStopOutcomeAlignment.properties.CMD_PROFILE.required,
  });
const exportPackageDocxArtifactStopOutcomeAlignmentReasonCodesByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageDocxArtifactStopOutcomeAlignment.properties.SWE_BODELNING
        .properties.source_export_package_profile_dossier_release_gate_reason_codes
        .items.enum,
    CMD_PROFILE:
      exportPackageDocxArtifactStopOutcomeAlignment.properties.CMD_PROFILE.properties
        .source_export_package_profile_dossier_release_gate_reason_codes.items.enum,
  });
const exportPackageDocxArtifactStopOutcomeAlignmentArtifactTypeValue =
  exportPackageDocxArtifactStopOutcomeAlignment.properties.SWE_BODELNING
    .properties.artifact_type.const;
const exportPackageDocxArtifactStopOutcomeAlignmentReleaseGateValue =
  exportPackageDocxArtifactStopOutcomeAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_gate.const;
const exportPackageDocxArtifactStopOutcomeAlignmentFreshnessValue =
  exportPackageDocxArtifactStopOutcomeAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackageDocxArtifactStopMatrixAlignmentRequiredKeys =
  exportPackageDocxArtifactStopMatrixAlignment.required;
const exportPackageDocxArtifactStopMatrixAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageDocxArtifactStopMatrixAlignment.properties.SWE_BODELNING.required,
    CMD_PROFILE:
      exportPackageDocxArtifactStopMatrixAlignment.properties.CMD_PROFILE.required,
  });
const exportPackageDocxArtifactStopMatrixAlignmentArtifactTypeValue =
  exportPackageDocxArtifactStopMatrixAlignment.properties.SWE_BODELNING.properties
    .artifact_type.const;
const exportPackageDocxArtifactStopMatrixAlignmentReleaseGateValue =
  exportPackageDocxArtifactStopMatrixAlignment.properties.SWE_BODELNING.properties
    .source_export_package_profile_dossier_release_gate.const;
const exportPackageDocxArtifactStopMatrixAlignmentFreshnessValue =
  exportPackageDocxArtifactStopMatrixAlignment.properties.SWE_BODELNING.properties
    .source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackageDocxArtifactStopMatrixAlignmentReasonCodeByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageDocxArtifactStopMatrixAlignment.properties.SWE_BODELNING
        .properties.source_export_package_profile_dossier_release_gate_reason_code
        .const,
    CMD_PROFILE:
      exportPackageDocxArtifactStopMatrixAlignment.properties.CMD_PROFILE
        .properties.source_export_package_profile_dossier_release_gate_reason_code
        .const,
  });
const exportPackageDocxArtifactStopMatrixAlignmentConditionKey =
  exportPackageDocxArtifactStopMatrixAlignment.properties.SWE_BODELNING
    .properties.stop_matrix_entry.allOf[1].properties.condition_key.const;
const exportPackageDocxArtifactTraceabilityAlignmentRequiredKeys =
  exportPackageDocxArtifactTraceabilityAlignment.required;
const exportPackageDocxArtifactTraceabilityAlignmentEntryRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.required,
  });
const exportPackageDocxArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .jurisdiction_profile_key.const,
  });
const exportPackageDocxArtifactTraceabilityAlignmentArtifactTypeByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.artifact_type.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.artifact_type.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.artifact_type.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .artifact_type.const,
  });
const exportPackageDocxArtifactTraceabilityAlignmentReleaseGateByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate.const,
  });
const exportPackageDocxArtifactTraceabilityAlignmentFreshnessByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
  });
const exportPackageDocxArtifactTraceabilityAlignmentReasonCodeByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
  });
const exportPackageDocxArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageDocxArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .traceability.allOf[1].required,
  });
const exportPackageDocxArtifactTraceabilityAlignmentCanonicalTraceabilityByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE: {
      input_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      input_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      input_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      input_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageDocxArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.change_causes.items.enum,
    },
  });
const exportPackagePdfArtifactStopOutcomeAlignmentRequiredKeys =
  exportPackagePdfArtifactStopOutcomeAlignment.required;
const exportPackagePdfArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackagePdfArtifactStopOutcomeAlignment.properties.SWE_BODELNING.required,
    CMD_PROFILE:
      exportPackagePdfArtifactStopOutcomeAlignment.properties.CMD_PROFILE.required,
  });
const exportPackagePdfArtifactStopOutcomeAlignmentReasonCodesByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackagePdfArtifactStopOutcomeAlignment.properties.SWE_BODELNING
        .properties.source_export_package_profile_dossier_release_gate_reason_codes
        .items.enum,
    CMD_PROFILE:
      exportPackagePdfArtifactStopOutcomeAlignment.properties.CMD_PROFILE.properties
        .source_export_package_profile_dossier_release_gate_reason_codes.items.enum,
  });
const exportPackagePdfArtifactStopOutcomeAlignmentArtifactTypeValue =
  exportPackagePdfArtifactStopOutcomeAlignment.properties.SWE_BODELNING.properties
    .artifact_type.const;
const exportPackagePdfArtifactStopOutcomeAlignmentReleaseGateValue =
  exportPackagePdfArtifactStopOutcomeAlignment.properties.SWE_BODELNING.properties
    .source_export_package_profile_dossier_release_gate.const;
const exportPackagePdfArtifactStopOutcomeAlignmentFreshnessValue =
  exportPackagePdfArtifactStopOutcomeAlignment.properties.SWE_BODELNING.properties
    .source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackagePdfArtifactStopMatrixAlignmentRequiredKeys =
  exportPackagePdfArtifactStopMatrixAlignment.required;
const exportPackagePdfArtifactStopMatrixAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackagePdfArtifactStopMatrixAlignment.properties.SWE_BODELNING.required,
    CMD_PROFILE:
      exportPackagePdfArtifactStopMatrixAlignment.properties.CMD_PROFILE.required,
  });
const exportPackagePdfArtifactStopMatrixAlignmentArtifactTypeValue =
  exportPackagePdfArtifactStopMatrixAlignment.properties.SWE_BODELNING.properties
    .artifact_type.const;
const exportPackagePdfArtifactStopMatrixAlignmentReleaseGateValue =
  exportPackagePdfArtifactStopMatrixAlignment.properties.SWE_BODELNING.properties
    .source_export_package_profile_dossier_release_gate.const;
const exportPackagePdfArtifactStopMatrixAlignmentFreshnessValue =
  exportPackagePdfArtifactStopMatrixAlignment.properties.SWE_BODELNING.properties
    .source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackagePdfArtifactStopMatrixAlignmentReasonCodeByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackagePdfArtifactStopMatrixAlignment.properties.SWE_BODELNING
        .properties.source_export_package_profile_dossier_release_gate_reason_code
        .const,
    CMD_PROFILE:
      exportPackagePdfArtifactStopMatrixAlignment.properties.CMD_PROFILE
        .properties.source_export_package_profile_dossier_release_gate_reason_code
        .const,
  });
const exportPackagePdfArtifactStopMatrixAlignmentConditionKey =
  exportPackagePdfArtifactStopMatrixAlignment.properties.SWE_BODELNING
    .properties.stop_matrix_entry.allOf[1].properties.condition_key.const;
const exportPackagePdfArtifactTraceabilityAlignmentRequiredKeys =
  exportPackagePdfArtifactTraceabilityAlignment.required;
const exportPackagePdfArtifactTraceabilityAlignmentEntryRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.required,
  });
const exportPackagePdfArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .jurisdiction_profile_key.const,
  });
const exportPackagePdfArtifactTraceabilityAlignmentArtifactTypeByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.artifact_type.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.artifact_type.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.artifact_type.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .artifact_type.const,
  });
const exportPackagePdfArtifactTraceabilityAlignmentReleaseGateByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate.const,
  });
const exportPackagePdfArtifactTraceabilityAlignmentFreshnessByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
  });
const exportPackagePdfArtifactTraceabilityAlignmentReasonCodeByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
  });
const exportPackagePdfArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackagePdfArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .traceability.allOf[1].required,
  });
const exportPackagePdfArtifactTraceabilityAlignmentCanonicalTraceabilityByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE: {
      input_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      input_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      input_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      input_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.canonical_output_references.items.enum,
      change_causes:
        exportPackagePdfArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.change_causes.items.enum,
    },
  });
const exportPackageMarkdownArtifactStopMatrixAlignmentRequiredKeys =
  exportPackageMarkdownArtifactStopMatrixAlignment.required;
const exportPackageMarkdownArtifactStopMatrixAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageMarkdownArtifactStopMatrixAlignment.properties.SWE_BODELNING
        .required,
    CMD_PROFILE:
      exportPackageMarkdownArtifactStopMatrixAlignment.properties.CMD_PROFILE
        .required,
  });
const exportPackageMarkdownArtifactStopMatrixAlignmentArtifactTypeValue =
  exportPackageMarkdownArtifactStopMatrixAlignment.properties.SWE_BODELNING
    .properties.artifact_type.const;
const exportPackageMarkdownArtifactStopMatrixAlignmentReleaseGateValue =
  exportPackageMarkdownArtifactStopMatrixAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_gate.const;
const exportPackageMarkdownArtifactStopMatrixAlignmentFreshnessValue =
  exportPackageMarkdownArtifactStopMatrixAlignment.properties.SWE_BODELNING
    .properties.source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackageMarkdownArtifactStopMatrixAlignmentReasonCodeByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageMarkdownArtifactStopMatrixAlignment.properties.SWE_BODELNING
        .properties.source_export_package_profile_dossier_release_gate_reason_code
        .const,
    CMD_PROFILE:
      exportPackageMarkdownArtifactStopMatrixAlignment.properties.CMD_PROFILE
        .properties.source_export_package_profile_dossier_release_gate_reason_code
        .const,
  });
const exportPackageMarkdownArtifactStopMatrixAlignmentConditionKey =
  exportPackageMarkdownArtifactStopMatrixAlignment.properties.SWE_BODELNING
    .properties.stop_matrix_entry.allOf[1].properties.condition_key.const;
const exportPackageMarkdownArtifactTraceabilityAlignmentRequiredKeys =
  exportPackageMarkdownArtifactTraceabilityAlignment.required;
const exportPackageMarkdownArtifactTraceabilityAlignmentEntryRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.required,
  });
const exportPackageMarkdownArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .jurisdiction_profile_key.const,
  });
const exportPackageMarkdownArtifactTraceabilityAlignmentArtifactTypeByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.artifact_type.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.artifact_type.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.artifact_type.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .artifact_type.const,
  });
const exportPackageMarkdownArtifactTraceabilityAlignmentReleaseGateByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate.const,
  });
const exportPackageMarkdownArtifactTraceabilityAlignmentFreshnessByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
  });
const exportPackageMarkdownArtifactTraceabilityAlignmentReasonCodeByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
  });
const exportPackageMarkdownArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageMarkdownArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .traceability.allOf[1].required,
  });
const exportPackageMarkdownArtifactTraceabilityAlignmentCanonicalTraceabilityByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE: {
      input_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      input_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      input_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      input_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageMarkdownArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.change_causes.items.enum,
    },
  });
const exportPackageJsonArtifactStopMatrixAlignmentRequiredKeys =
  exportPackageJsonArtifactStopMatrixAlignment.required;
const exportPackageJsonArtifactStopMatrixAlignmentProfileRequiredKeysByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageJsonArtifactStopMatrixAlignment.properties.SWE_BODELNING
        .required,
    CMD_PROFILE:
      exportPackageJsonArtifactStopMatrixAlignment.properties.CMD_PROFILE.required,
  });
const exportPackageJsonArtifactStopMatrixAlignmentReasonCodeByProfile =
  Object.freeze({
    SWE_BODELNING:
      exportPackageJsonArtifactStopMatrixAlignment.properties.SWE_BODELNING
        .properties.source_export_package_profile_dossier_release_gate_reason_code
        .const,
    CMD_PROFILE:
      exportPackageJsonArtifactStopMatrixAlignment.properties.CMD_PROFILE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
  });
const exportPackageJsonArtifactStopMatrixAlignmentArtifactTypeValue =
  exportPackageJsonArtifactStopMatrixAlignment.properties.SWE_BODELNING.properties
    .artifact_type.const;
const exportPackageJsonArtifactStopMatrixAlignmentReleaseGateValue =
  exportPackageJsonArtifactStopMatrixAlignment.properties.SWE_BODELNING.properties
    .source_export_package_profile_dossier_release_gate.const;
const exportPackageJsonArtifactStopMatrixAlignmentFreshnessValue =
  exportPackageJsonArtifactStopMatrixAlignment.properties.SWE_BODELNING.properties
    .source_export_package_profile_dossier_release_eval_freshness.const;
const exportPackageJsonArtifactStopMatrixAlignmentConditionKey =
  "missing_required_input";
const exportPackageJsonArtifactTraceabilityAlignmentRequiredKeys =
  exportPackageJsonArtifactTraceabilityAlignment.required;
const exportPackageJsonArtifactTraceabilityAlignmentEntryRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.required,
  });
const exportPackageJsonArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.jurisdiction_profile_key.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .jurisdiction_profile_key.const,
  });
const exportPackageJsonArtifactTraceabilityAlignmentArtifactTypeByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.artifact_type.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.artifact_type.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.artifact_type.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .artifact_type.const,
  });
const exportPackageJsonArtifactTraceabilityAlignmentReleaseGateByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate.const,
  });
const exportPackageJsonArtifactTraceabilityAlignmentFreshnessByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_eval_freshness.const,
  });
const exportPackageJsonArtifactTraceabilityAlignmentReasonCodeByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .source_export_package_profile_dossier_release_gate_reason_code.const,
  });
const exportPackageJsonArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1].required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageJsonArtifactTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .traceability.allOf[1].required,
  });
const exportPackageJsonArtifactTraceabilityAlignmentCanonicalTraceabilityByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE: {
      input_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      input_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      input_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      input_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageJsonArtifactTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.change_causes.items.enum,
    },
  });
const exportPackageTraceabilityAlignmentRequiredKeys =
  exportPackageTraceabilityAlignment.required;
const exportPackageTraceabilityAlignmentEntryRequiredKeysByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .required,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties
      .SWE_BODELNING_SUPPORT_INCOMPLETE.required,
  CMD_PROFILE_INPUT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .required,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    exportPackageTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.required,
});
const exportPackageTraceabilityAlignmentJurisdictionProfileKeyByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
        .properties.jurisdiction_profile_key.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.jurisdiction_profile_key
        .const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
        .properties.jurisdiction_profile_key.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .jurisdiction_profile_key.const,
  });
const exportPackageTraceabilityAlignmentReleaseGateByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .properties.profile_dossier_release_gate.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties
      .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.profile_dossier_release_gate
      .const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .properties.profile_dossier_release_gate.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    exportPackageTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
      .profile_dossier_release_gate.const,
});
const exportPackageTraceabilityAlignmentFreshnessByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .properties.profile_dossier_release_eval_freshness.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties
      .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
      .profile_dossier_release_eval_freshness.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .properties.profile_dossier_release_eval_freshness.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    exportPackageTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
      .profile_dossier_release_eval_freshness.const,
});
const exportPackageTraceabilityAlignmentReasonCodeByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .properties.profile_dossier_release_gate_reason_code.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties
      .SWE_BODELNING_SUPPORT_INCOMPLETE.properties
      .profile_dossier_release_gate_reason_code.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    exportPackageTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .properties.profile_dossier_release_gate_reason_code.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    exportPackageTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
      .profile_dossier_release_gate_reason_code.const,
});
const exportPackageTraceabilityAlignmentTraceabilityRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      exportPackageTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
        .properties.traceability.allOf[1].required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      exportPackageTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
        .required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      exportPackageTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
        .properties.traceability.allOf[1].required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      exportPackageTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .traceability.allOf[1].required,
  });
const exportPackageTraceabilityAlignmentCanonicalTraceabilityByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE: {
      input_references:
        exportPackageTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      input_references:
        exportPackageTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      input_references:
        exportPackageTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        exportPackageTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      input_references:
        exportPackageTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        exportPackageTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.documented_rule_references.items.enum,
      canonical_output_references:
        exportPackageTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.canonical_output_references.items.enum,
      change_causes:
        exportPackageTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.change_causes.items.enum,
    },
  });
const profileDossierStopMatrixAlignmentRequiredKeys =
  profileDossierStopMatrixAlignment.required;
const profileDossierStopMatrixAlignmentProfileRequiredKeysByProfile = Object.freeze({
  SWE_BODELNING:
    profileDossierStopMatrixAlignment.properties.SWE_BODELNING.required,
  CMD_PROFILE: profileDossierStopMatrixAlignment.properties.CMD_PROFILE.required,
});
const profileDossierStopMatrixAlignmentReasonCodeByProfile = Object.freeze({
  SWE_BODELNING:
    profileDossierStopMatrixAlignment.properties.SWE_BODELNING.properties
      .release_gate_reason_code.const,
  CMD_PROFILE:
    profileDossierStopMatrixAlignment.properties.CMD_PROFILE.properties
      .release_gate_reason_code.const,
});
const profileDossierStopMatrixAlignmentReleaseGateValue =
  profileDossierStopMatrixAlignment.properties.SWE_BODELNING.properties
    .release_gate.const;
const profileDossierStopMatrixAlignmentFreshnessValue =
  profileDossierStopMatrixAlignment.properties.SWE_BODELNING.properties
    .release_eval_freshness.const;
const profileDossierStopMatrixAlignmentConditionKey = "missing_required_input";
const profileDossierStopOutcomeAlignmentRequiredKeys =
  profileDossierStopOutcomeAlignment.required;
const profileDossierStopOutcomeAlignmentProfileRequiredKeysByProfile = Object.freeze({
  SWE_BODELNING:
    profileDossierStopOutcomeAlignment.properties.SWE_BODELNING.required,
  CMD_PROFILE: profileDossierStopOutcomeAlignment.properties.CMD_PROFILE.required,
});
const profileDossierStopOutcomeAlignmentReasonCodesByProfile = Object.freeze({
  SWE_BODELNING:
    profileDossierStopOutcomeAlignment.properties.SWE_BODELNING.properties
      .release_gate_reason_codes.items.enum,
  CMD_PROFILE:
    profileDossierStopOutcomeAlignment.properties.CMD_PROFILE.properties
      .release_gate_reason_codes.items.enum,
});
const profileDossierStopOutcomeAlignmentReleaseGateValue =
  profileDossierStopOutcomeAlignment.properties.SWE_BODELNING.properties
    .release_gate.const;
const profileDossierStopOutcomeAlignmentFreshnessValue =
  profileDossierStopOutcomeAlignment.properties.SWE_BODELNING.properties
    .release_eval_freshness.const;
const profileDossierTraceabilityAlignmentRequiredKeys =
  profileDossierTraceabilityAlignment.required;
const profileDossierTraceabilityAlignmentEntryRequiredKeysByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .required,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties
      .SWE_BODELNING_SUPPORT_INCOMPLETE.required,
  CMD_PROFILE_INPUT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .required,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    profileDossierTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.required,
});
const profileDossierTraceabilityAlignmentJurisdictionProfileKeyByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      profileDossierTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
        .properties.jurisdiction_profile_key.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      profileDossierTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.jurisdiction_profile_key
        .const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      profileDossierTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
        .properties.jurisdiction_profile_key.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      profileDossierTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .jurisdiction_profile_key.const,
  });
const profileDossierTraceabilityAlignmentReleaseGateByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .properties.release_gate.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties
      .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.release_gate.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .properties.release_gate.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    profileDossierTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
      .release_gate.const,
});
const profileDossierTraceabilityAlignmentFreshnessByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .properties.release_eval_freshness.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties
      .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.release_eval_freshness.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .properties.release_eval_freshness.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    profileDossierTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
      .release_eval_freshness.const,
});
const profileDossierTraceabilityAlignmentReasonCodeByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .properties.release_gate_reason_code.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties
      .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.release_gate_reason_code.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    profileDossierTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .properties.release_gate_reason_code.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    profileDossierTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
      .release_gate_reason_code.const,
});
const profileDossierTraceabilityAlignmentTraceabilityRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      profileDossierTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
        .properties.traceability.allOf[1].required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      profileDossierTraceabilityAlignment.properties
        .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
        .required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      profileDossierTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
        .properties.traceability.allOf[1].required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      profileDossierTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .traceability.allOf[1].required,
  });
const profileDossierTraceabilityAlignmentCanonicalTraceabilityByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE: {
      input_references:
        profileDossierTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        profileDossierTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        profileDossierTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        profileDossierTraceabilityAlignment.properties
          .SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      input_references:
        profileDossierTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        profileDossierTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        profileDossierTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        profileDossierTraceabilityAlignment.properties
          .SWE_BODELNING_SUPPORT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      input_references:
        profileDossierTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.input_references.items.enum,
      documented_rule_references:
        profileDossierTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.documented_rule_references.items.enum,
      canonical_output_references:
        profileDossierTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.canonical_output_references.items.enum,
      change_causes:
        profileDossierTraceabilityAlignment.properties
          .CMD_PROFILE_INPUT_INCOMPLETE.properties.traceability.allOf[1]
          .properties.change_causes.items.enum,
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      input_references:
        profileDossierTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        profileDossierTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.documented_rule_references.items.enum,
      canonical_output_references:
        profileDossierTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.canonical_output_references.items.enum,
      change_causes:
        profileDossierTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.change_causes.items.enum,
    },
  });
const releaseEvalStopMatrixAlignmentRequiredKeys =
  releaseEvalStopMatrixAlignment.required;
const releaseEvalStopMatrixAlignmentProfileRequiredKeysByProfile = Object.freeze({
  SWE_BODELNING:
    releaseEvalStopMatrixAlignment.properties.SWE_BODELNING.required,
  CMD_PROFILE: releaseEvalStopMatrixAlignment.properties.CMD_PROFILE.required,
});
const releaseEvalStopMatrixAlignmentReasonCodeByProfile = Object.freeze({
  SWE_BODELNING:
    releaseEvalStopMatrixAlignment.properties.SWE_BODELNING.properties
      .release_gate_reason_code.const,
  CMD_PROFILE:
    releaseEvalStopMatrixAlignment.properties.CMD_PROFILE.properties
      .release_gate_reason_code.const,
});
const releaseEvalStopMatrixAlignmentReleaseGateValue =
  releaseEvalStopMatrixAlignment.properties.SWE_BODELNING.properties.release_gate.const;
const releaseEvalStopMatrixAlignmentFreshnessValue =
  releaseEvalStopMatrixAlignment.properties.SWE_BODELNING.properties
    .release_eval_freshness.const;
const releaseEvalStopMatrixAlignmentConditionKey =
  "missing_required_input";
const releaseEvalStopOutcomeAlignmentRequiredKeys =
  releaseEvalStopOutcomeAlignment.required;
const releaseEvalStopOutcomeAlignmentProfileRequiredKeysByProfile = Object.freeze({
  SWE_BODELNING:
    releaseEvalStopOutcomeAlignment.properties.SWE_BODELNING.required,
  CMD_PROFILE: releaseEvalStopOutcomeAlignment.properties.CMD_PROFILE.required,
});
const releaseEvalStopOutcomeAlignmentReasonCodesByProfile = Object.freeze({
  SWE_BODELNING:
    releaseEvalStopOutcomeAlignment.properties.SWE_BODELNING.properties
      .release_gate_reason_codes.items.enum,
  CMD_PROFILE:
    releaseEvalStopOutcomeAlignment.properties.CMD_PROFILE.properties
      .release_gate_reason_codes.items.enum,
});
const releaseEvalStopOutcomeAlignmentReleaseGateValue =
  releaseEvalStopOutcomeAlignment.properties.SWE_BODELNING.properties.release_gate.const;
const releaseEvalStopOutcomeAlignmentFreshnessValue =
  releaseEvalStopOutcomeAlignment.properties.SWE_BODELNING.properties
    .release_eval_freshness.const;
const releaseEvalTraceabilityAlignmentRequiredKeys =
  releaseEvalTraceabilityAlignment.required;
const releaseEvalTraceabilityAlignmentEntryRequiredKeysByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .required,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
      .required,
  CMD_PROFILE_INPUT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE.required,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    releaseEvalTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.required,
});
const releaseEvalTraceabilityAlignmentJurisdictionProfileKeyByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
        .properties.jurisdiction_profile_key.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
        .properties.jurisdiction_profile_key.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      releaseEvalTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
        .properties.jurisdiction_profile_key.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      releaseEvalTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .jurisdiction_profile_key.const,
  });
const releaseEvalTraceabilityAlignmentReleaseGateByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .properties.release_gate.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
      .properties.release_gate.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .properties.release_gate.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    releaseEvalTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
      .release_gate.const,
});
const releaseEvalTraceabilityAlignmentFreshnessByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .properties.release_eval_freshness.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
      .properties.release_eval_freshness.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .properties.release_eval_freshness.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    releaseEvalTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
      .release_eval_freshness.const,
});
const releaseEvalTraceabilityAlignmentReasonCodeByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .properties.release_gate_reason_code.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
      .properties.release_gate_reason_code.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    releaseEvalTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .properties.release_gate_reason_code.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    releaseEvalTraceabilityAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
      .release_gate_reason_code.const,
});
const releaseEvalTraceabilityAlignmentTraceabilityRequiredKeysByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
        .properties.traceability.allOf[1].required,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
        .properties.traceability.allOf[1].required,
    CMD_PROFILE_INPUT_INCOMPLETE:
      releaseEvalTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
        .properties.traceability.allOf[1].required,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      releaseEvalTraceabilityAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
        .traceability.allOf[1].required,
  });
const releaseEvalTraceabilityAlignmentCanonicalTraceabilityByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE: {
      input_references:
        releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
          .properties.traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
          .properties.traceability.allOf[1].properties.documented_rule_references
          .items.enum,
      canonical_output_references:
        releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
          .properties.traceability.allOf[1].properties
          .canonical_output_references.items.enum,
      change_causes:
        releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
          .properties.traceability.allOf[1].properties.change_causes.items.enum,
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      input_references:
        releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
          .properties.traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
          .properties.traceability.allOf[1].properties.documented_rule_references
          .items.enum,
      canonical_output_references:
        releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
          .properties.traceability.allOf[1].properties
          .canonical_output_references.items.enum,
      change_causes:
        releaseEvalTraceabilityAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
          .properties.traceability.allOf[1].properties.change_causes.items.enum,
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      input_references:
        releaseEvalTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
          .properties.traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        releaseEvalTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
          .properties.traceability.allOf[1].properties.documented_rule_references
          .items.enum,
      canonical_output_references:
        releaseEvalTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
          .properties.traceability.allOf[1].properties
          .canonical_output_references.items.enum,
      change_causes:
        releaseEvalTraceabilityAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
          .properties.traceability.allOf[1].properties.change_causes.items.enum,
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      input_references:
        releaseEvalTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        releaseEvalTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.documented_rule_references.items.enum,
      canonical_output_references:
        releaseEvalTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.canonical_output_references.items.enum,
      change_causes:
        releaseEvalTraceabilityAlignment.properties
          .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.properties
          .traceability.allOf[1].properties.change_causes.items.enum,
    },
  });
const releaseEvalSemanticFactAlignmentRequiredKeys =
  releaseEvalSemanticFactAlignment.required;
const releaseEvalSemanticFactAlignmentEntryRequiredKeys =
  releaseEvalSemanticFactAlignment.$defs.semanticFactAlignmentEntry.required;
const releaseEvalSemanticFactAlignmentPresenceOnlyRequiredKeys =
  releaseEvalSemanticFactAlignment.$defs.presenceOnlySemanticFact.required;
const releaseEvalSemanticFactAlignmentPresenceAndSourceRequiredKeys =
  releaseEvalSemanticFactAlignment.$defs.presenceAndSourceSemanticFact.required;
const snapshotStatusTraceabilityAlignmentRequiredKeys =
  snapshotStatusTraceabilityAlignment.required;
const snapshotStatusTraceabilityAlignmentSupportedSourceValues =
  snapshotStatusTraceabilityAlignment.properties.supported_snapshot_status_sources.items.enum;
const snapshotStatusTraceabilityAlignmentUnalignedSourceValues =
  snapshotStatusTraceabilityAlignment.properties.unaligned_snapshot_status_sources.items.enum;
const snapshotStatusTraceabilityAlignmentScopeValue =
  snapshotStatusTraceabilityAlignment.properties.alignment_scope.const;
const snapshotStatusTraceabilityAlignmentCaseKeys = Object.freeze([
  "CURRENT_SHARED_SNAPSHOT_STATUS",
  "STALE_SHARED_SNAPSHOT_STATUS",
]);
const snapshotStatusTraceabilityAlignmentEntryRequiredKeysByCase = Object.freeze({
  CURRENT_SHARED_SNAPSHOT_STATUS:
    snapshotStatusTraceabilityAlignment.properties.CURRENT_SHARED_SNAPSHOT_STATUS.required,
  STALE_SHARED_SNAPSHOT_STATUS:
    snapshotStatusTraceabilityAlignment.properties.STALE_SHARED_SNAPSHOT_STATUS.required,
});
const snapshotStatusTraceabilityAlignmentSourceByCase = Object.freeze({
  CURRENT_SHARED_SNAPSHOT_STATUS:
    snapshotStatusTraceabilityAlignment.properties.CURRENT_SHARED_SNAPSHOT_STATUS.properties
      .snapshot_status_source.const,
  STALE_SHARED_SNAPSHOT_STATUS:
    snapshotStatusTraceabilityAlignment.properties.STALE_SHARED_SNAPSHOT_STATUS.properties
      .snapshot_status_source.const,
});
const snapshotStatusTraceabilityAlignmentIsCurrentByCase = Object.freeze({
  CURRENT_SHARED_SNAPSHOT_STATUS:
    snapshotStatusTraceabilityAlignment.properties.CURRENT_SHARED_SNAPSHOT_STATUS.properties
      .snapshot_is_current.const,
  STALE_SHARED_SNAPSHOT_STATUS:
    snapshotStatusTraceabilityAlignment.properties.STALE_SHARED_SNAPSHOT_STATUS.properties
      .snapshot_is_current.const,
});
const snapshotStatusTraceabilityAlignmentPersistedSnapshotReferencesByCase =
  Object.freeze({
    CURRENT_SHARED_SNAPSHOT_STATUS:
      snapshotStatusTraceabilityAlignment.properties.CURRENT_SHARED_SNAPSHOT_STATUS
        .properties.persisted_snapshot_references.items.enum,
    STALE_SHARED_SNAPSHOT_STATUS:
      snapshotStatusTraceabilityAlignment.properties.STALE_SHARED_SNAPSHOT_STATUS.properties
        .persisted_snapshot_references.items.enum,
  });
const snapshotStatusTraceabilityAlignmentCurrentSourceReferencesByCase =
  Object.freeze({
    CURRENT_SHARED_SNAPSHOT_STATUS:
      snapshotStatusTraceabilityAlignment.properties.CURRENT_SHARED_SNAPSHOT_STATUS
        .properties.current_source_references.items.enum,
    STALE_SHARED_SNAPSHOT_STATUS:
      snapshotStatusTraceabilityAlignment.properties.STALE_SHARED_SNAPSHOT_STATUS.properties
        .current_source_references.items.enum,
  });
const snapshotStatusTraceabilityAlignmentProjectionReferencesByCase = Object.freeze({
  CURRENT_SHARED_SNAPSHOT_STATUS:
    snapshotStatusTraceabilityAlignment.properties.CURRENT_SHARED_SNAPSHOT_STATUS
      .properties.projection_references.items.enum,
  STALE_SHARED_SNAPSHOT_STATUS:
    snapshotStatusTraceabilityAlignment.properties.STALE_SHARED_SNAPSHOT_STATUS.properties
      .projection_references.items.enum,
});
const snapshotStatusTraceabilityAlignmentTraceabilityRequiredKeysByCase =
  Object.freeze({
    CURRENT_SHARED_SNAPSHOT_STATUS:
      snapshotStatusTraceabilityAlignment.properties.CURRENT_SHARED_SNAPSHOT_STATUS
        .properties.traceability.allOf[1].required,
    STALE_SHARED_SNAPSHOT_STATUS:
      snapshotStatusTraceabilityAlignment.properties.STALE_SHARED_SNAPSHOT_STATUS
        .properties.traceability.allOf[1].required,
  });
const snapshotStatusTraceabilityAlignmentCanonicalTraceabilityByCase =
  Object.freeze({
    CURRENT_SHARED_SNAPSHOT_STATUS: {
      input_references:
        snapshotStatusTraceabilityAlignment.properties.CURRENT_SHARED_SNAPSHOT_STATUS
          .properties.traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        snapshotStatusTraceabilityAlignment.properties.CURRENT_SHARED_SNAPSHOT_STATUS
          .properties.traceability.allOf[1].properties.documented_rule_references.items
          .enum,
      canonical_output_references:
        snapshotStatusTraceabilityAlignment.properties.CURRENT_SHARED_SNAPSHOT_STATUS
          .properties.traceability.allOf[1].properties.canonical_output_references
          .items.enum,
    },
    STALE_SHARED_SNAPSHOT_STATUS: {
      input_references:
        snapshotStatusTraceabilityAlignment.properties.STALE_SHARED_SNAPSHOT_STATUS
          .properties.traceability.allOf[1].properties.input_references.items.enum,
      documented_rule_references:
        snapshotStatusTraceabilityAlignment.properties.STALE_SHARED_SNAPSHOT_STATUS
          .properties.traceability.allOf[1].properties.documented_rule_references.items
          .enum,
      canonical_output_references:
        snapshotStatusTraceabilityAlignment.properties.STALE_SHARED_SNAPSHOT_STATUS
          .properties.traceability.allOf[1].properties.canonical_output_references
          .items.enum,
    },
  });
const semanticFactModelRequiredKeys = semanticFactModel.required;
const profileInputSemanticFactAlignmentRequiredKeys =
  profileInputSemanticFactAlignment.required;
const profileInputSemanticFactAlignmentEntryRequiredKeys =
  profileInputSemanticFactAlignment.$defs.semanticFactPresenceAlignmentEntry.required;
const profileInputSemanticFactAlignmentPresenceRequiredKeys =
  profileInputSemanticFactAlignment.$defs.presenceOnlySemanticFact.required;
const stopMatrixModelRequiredKeys = stopMatrixModel.required;
const stopMatrixModelEntryRequiredKeys =
  stopMatrixModel.$defs.stopMatrixEntry.required;
const stopOutcomeModelRequiredKeys = stopOutcomeModel.required;
const traceabilityModelRequiredKeys = traceabilityModel.required;
const traceabilityModelAllowedKeys = Object.keys(traceabilityModel.properties);
const semanticFactModelPresenceStatusValues =
  semanticFactModel.properties.presence_status.enum;
const semanticFactModelSourceStatusValues =
  semanticFactModel.properties.source_status.enum;
const semanticFactModelVerificationStatusValues =
  semanticFactModel.properties.verification_status.enum;
const semanticFactModelDisputeStatusValues =
  semanticFactModel.properties.dispute_status.enum;
const semanticFactModelConsistencyStatusValues =
  semanticFactModel.properties.consistency_status.enum;
const releaseEvalSemanticFactAlignmentScopeValue =
  releaseEvalSemanticFactAlignment.properties.alignment_scope.const;
const releaseEvalSemanticFactAlignmentSupportedDimensionValues =
  releaseEvalSemanticFactAlignment.properties.supported_semantic_fact_dimensions
    .items.enum;
const releaseEvalSemanticFactAlignmentUnassignedDimensionValues =
  releaseEvalSemanticFactAlignment.properties.unassigned_semantic_fact_dimensions
    .items.enum;
const releaseEvalSemanticFactAlignmentCaseKeys =
  releaseEvalSemanticFactAlignmentRequiredKeys.filter(
    (key) =>
      key !== "alignment_scope" &&
      key !== "supported_semantic_fact_dimensions" &&
      key !== "unassigned_semantic_fact_dimensions",
  );
const releaseEvalSemanticFactAlignmentJurisdictionProfileKeyByCase =
  Object.freeze({
    SWE_BODELNING_INPUT_INCOMPLETE:
      releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
        .allOf[1].properties.jurisdiction_profile_key.const,
    SWE_BODELNING_SUPPORT_INCOMPLETE:
      releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
        .allOf[1].properties.jurisdiction_profile_key.const,
    CMD_PROFILE_INPUT_INCOMPLETE:
      releaseEvalSemanticFactAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
        .allOf[1].properties.jurisdiction_profile_key.const,
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
      releaseEvalSemanticFactAlignment.properties
        .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.allOf[1]
        .properties.jurisdiction_profile_key.const,
  });
const releaseEvalSemanticFactAlignmentCaseKeyByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .allOf[1].properties.case_key.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
      .allOf[1].properties.case_key.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .allOf[1].properties.case_key.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    releaseEvalSemanticFactAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.allOf[1]
      .properties.case_key.const,
});
const releaseEvalSemanticFactAlignmentReleaseGateByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .allOf[1].properties.release_gate.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
      .allOf[1].properties.release_gate.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .allOf[1].properties.release_gate.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    releaseEvalSemanticFactAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.allOf[1]
      .properties.release_gate.const,
});
const releaseEvalSemanticFactAlignmentFreshnessByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .allOf[1].properties.release_eval_freshness.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
      .allOf[1].properties.release_eval_freshness.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .allOf[1].properties.release_eval_freshness.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    releaseEvalSemanticFactAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.allOf[1]
      .properties.release_eval_freshness.const,
});
const releaseEvalSemanticFactAlignmentReasonCodeByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .allOf[1].properties.release_gate_reason_code.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
      .allOf[1].properties.release_gate_reason_code.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .allOf[1].properties.release_gate_reason_code.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    releaseEvalSemanticFactAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.allOf[1]
      .properties.release_gate_reason_code.const,
});
const releaseEvalSemanticFactAlignmentInputReferencesByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .allOf[1].properties.input_contract_references.items.enum,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
      .allOf[1].properties.input_contract_references.items.enum,
  CMD_PROFILE_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .allOf[1].properties.input_contract_references.items.enum,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    releaseEvalSemanticFactAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.allOf[1]
      .properties.input_contract_references.items.enum,
});
const releaseEvalSemanticFactAlignmentPresenceStatusByCase = Object.freeze({
  SWE_BODELNING_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_INPUT_INCOMPLETE
      .allOf[1].properties.canonical_semantic_fact.allOf[1].properties
      .presence_status.const,
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
      .allOf[1].properties.canonical_semantic_fact.allOf[1].properties
      .presence_status.const,
  CMD_PROFILE_INPUT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.CMD_PROFILE_INPUT_INCOMPLETE
      .allOf[1].properties.canonical_semantic_fact.allOf[1].properties
      .presence_status.const,
  CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:
    releaseEvalSemanticFactAlignment.properties
      .CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.allOf[1]
      .properties.canonical_semantic_fact.allOf[1].properties.presence_status
      .const,
});
const releaseEvalSemanticFactAlignmentSourceStatusByCase = Object.freeze({
  SWE_BODELNING_SUPPORT_INCOMPLETE:
    releaseEvalSemanticFactAlignment.properties.SWE_BODELNING_SUPPORT_INCOMPLETE
      .allOf[1].properties.canonical_semantic_fact.allOf[1].properties
      .source_status.const,
});
const releaseEvalSemanticFactAlignmentCasesWithSourceStatus = Object.freeze([
  "SWE_BODELNING_SUPPORT_INCOMPLETE",
]);
const profileInputSemanticFactAlignmentScopeValue =
  profileInputSemanticFactAlignment.properties.alignment_scope.const;
const profileInputSemanticFactAlignmentSupportedDimensionValues =
  profileInputSemanticFactAlignment.properties.supported_semantic_fact_dimensions
    .items.enum;
const profileInputSemanticFactAlignmentUnassignedDimensionValues =
  profileInputSemanticFactAlignment.properties.unassigned_semantic_fact_dimensions
    .items.enum;
const profileInputSemanticFactAlignmentCaseKeys =
  profileInputSemanticFactAlignmentRequiredKeys.filter(
    (key) =>
      key !== "alignment_scope" &&
      key !== "supported_semantic_fact_dimensions" &&
      key !== "unassigned_semantic_fact_dimensions",
  );
const profileInputSemanticFactAlignmentJurisdictionProfileKeyByCase =
  Object.freeze({
    SWE_BODELNING_REQUIRED_LANE_WITH_VALUE:
      profileInputSemanticFactAlignment.properties
        .SWE_BODELNING_REQUIRED_LANE_WITH_VALUE.allOf[1].properties
        .jurisdiction_profile_key.const,
    SWE_BODELNING_REQUIRED_LANE_MARKED_MISSING:
      profileInputSemanticFactAlignment.properties
        .SWE_BODELNING_REQUIRED_LANE_MARKED_MISSING.allOf[1].properties
        .jurisdiction_profile_key.const,
    CMD_PROFILE_REQUIRED_LANE_WITH_VALUE:
      profileInputSemanticFactAlignment.properties
        .CMD_PROFILE_REQUIRED_LANE_WITH_VALUE.allOf[1].properties
        .jurisdiction_profile_key.const,
    CMD_PROFILE_REQUIRED_LANE_MARKED_MISSING:
      profileInputSemanticFactAlignment.properties
        .CMD_PROFILE_REQUIRED_LANE_MARKED_MISSING.allOf[1].properties
        .jurisdiction_profile_key.const,
  });
const profileInputSemanticFactAlignmentCaseKeyByCase = Object.freeze({
  SWE_BODELNING_REQUIRED_LANE_WITH_VALUE:
    profileInputSemanticFactAlignment.properties
      .SWE_BODELNING_REQUIRED_LANE_WITH_VALUE.allOf[1].properties.case_key.const,
  SWE_BODELNING_REQUIRED_LANE_MARKED_MISSING:
    profileInputSemanticFactAlignment.properties
      .SWE_BODELNING_REQUIRED_LANE_MARKED_MISSING.allOf[1].properties.case_key.const,
  CMD_PROFILE_REQUIRED_LANE_WITH_VALUE:
    profileInputSemanticFactAlignment.properties
      .CMD_PROFILE_REQUIRED_LANE_WITH_VALUE.allOf[1].properties.case_key.const,
  CMD_PROFILE_REQUIRED_LANE_MARKED_MISSING:
    profileInputSemanticFactAlignment.properties
      .CMD_PROFILE_REQUIRED_LANE_MARKED_MISSING.allOf[1].properties.case_key.const,
});
const profileInputSemanticFactAlignmentPresenceStatusByCase = Object.freeze({
  SWE_BODELNING_REQUIRED_LANE_WITH_VALUE:
    profileInputSemanticFactAlignment.properties
      .SWE_BODELNING_REQUIRED_LANE_WITH_VALUE.allOf[1].properties
      .canonical_semantic_fact.allOf[1].properties.presence_status.const,
  SWE_BODELNING_REQUIRED_LANE_MARKED_MISSING:
    profileInputSemanticFactAlignment.properties
      .SWE_BODELNING_REQUIRED_LANE_MARKED_MISSING.allOf[1].properties
      .canonical_semantic_fact.allOf[1].properties.presence_status.const,
  CMD_PROFILE_REQUIRED_LANE_WITH_VALUE:
    profileInputSemanticFactAlignment.properties
      .CMD_PROFILE_REQUIRED_LANE_WITH_VALUE.allOf[1].properties
      .canonical_semantic_fact.allOf[1].properties.presence_status.const,
  CMD_PROFILE_REQUIRED_LANE_MARKED_MISSING:
    profileInputSemanticFactAlignment.properties
      .CMD_PROFILE_REQUIRED_LANE_MARKED_MISSING.allOf[1].properties
      .canonical_semantic_fact.allOf[1].properties.presence_status.const,
});
const profileInputSemanticFactAlignmentInputReferencesByCase = Object.freeze({
  SWE_BODELNING_REQUIRED_LANE_WITH_VALUE:
    profileInputSemanticFactAlignment.properties
      .SWE_BODELNING_REQUIRED_LANE_WITH_VALUE.allOf[1].properties
      .input_contract_references.items.enum,
  SWE_BODELNING_REQUIRED_LANE_MARKED_MISSING:
    profileInputSemanticFactAlignment.properties
      .SWE_BODELNING_REQUIRED_LANE_MARKED_MISSING.allOf[1].properties
      .input_contract_references.items.enum,
  CMD_PROFILE_REQUIRED_LANE_WITH_VALUE:
    profileInputSemanticFactAlignment.properties
      .CMD_PROFILE_REQUIRED_LANE_WITH_VALUE.allOf[1].properties
      .input_contract_references.items.enum,
  CMD_PROFILE_REQUIRED_LANE_MARKED_MISSING:
    profileInputSemanticFactAlignment.properties
      .CMD_PROFILE_REQUIRED_LANE_MARKED_MISSING.allOf[1].properties
      .input_contract_references.items.enum,
});
const stopMatrixModelConditionValues =
  stopMatrixModel.$defs.stopMatrixEntry.properties.condition_key.enum;
const stopOutcomeModelValues = stopOutcomeModel.properties.stop_outcome.enum;
const traceabilityModelChangeCauseValues =
  traceabilityModel.properties.change_causes.items.enum;
const stopMatrixCanonicalOutcomeValuesByCondition = {
  missing_required_input: ["blocked", "insufficient_input"],
  unsupported_profile_surface_or_capability: ["unsupported"],
  inconsistent_or_ambiguous_critical_information: [
    "blocked",
    "requires_human_review",
  ],
  unsourced_or_unverified_information_offered_as_settled: [
    "blocked",
    "requires_human_review",
  ],
};
const jurisdictionProfileRegistryKnownKeys = Object.keys(
  jurisdictionProfileRegistry.properties,
);
const jurisdictionProfileRegistryEntryRequiredKeys =
  jurisdictionProfileRegistry.$defs.jurisdictionProfileRegistryEntry.required;
const jurisdictionProfileRegistryCapabilityRequiredKeys =
  jurisdictionProfileRegistry.$defs.jurisdictionProfileCapabilityFlags.required;
const cmdLaneKeys = cmdProfileInput.properties.profile_input_lane_snapshot.required;
const cmdLaneEntryRequiredKeys = cmdProfileInput.$defs.laneSnapshotEntry.required;
const cmdLaneEntryAllowedKeys = Object.keys(
  cmdProfileInput.$defs.laneSnapshotEntry.properties,
);
const cmdReleaseEvalSummaryRequiredKeys =
  cmdReleaseEvalRun.properties.profile_input_summary.required;
const cmdReleaseEvalAllowedRootKeys = Object.keys(cmdReleaseEvalRun.properties);
const cmdReleaseEvalLaneKeys =
  cmdReleaseEvalRun.properties.profile_input_lane_snapshot.required;
const cmdReleaseEvalLaneEntryRequiredKeys =
  cmdReleaseEvalRun.$defs.releaseEvalLaneSnapshotEntry.required;
const cmdReleaseEvalLaneEntryAllowedKeys = Object.keys(
  cmdReleaseEvalRun.$defs.releaseEvalLaneSnapshotEntry.properties,
);
const cmdDossierSnapshotRequiredKeys = cmdProfileDossierSnapshot.required;
const cmdDossierProjectionRequiredKeys = cmdProfileDossierProjection.required;
const cmdDossierSummaryRequiredKeys =
  cmdProfileDossierSnapshot.properties.profile_input_summary.required;
const cmdDossierLaneKeys =
  cmdProfileDossierSnapshot.properties.profile_input_lane_snapshot.required;
const cmdDossierLaneEntryRequiredKeys =
  cmdProfileDossierSnapshot.$defs.dossierLaneSnapshotEntry.required;
const cmdDossierLaneEntryAllowedKeys = Object.keys(
  cmdProfileDossierSnapshot.$defs.dossierLaneSnapshotEntry.properties,
);
const cmdDossierProjectionSnapshotStatusRequiredKeys =
  cmdProfileDossierProjection.properties.snapshot_status.required;
const cmdDossierProjectionSnapshotStatusSourceValues =
  cmdProfileDossierProjection.properties.snapshot_status.properties.source.enum;
const cmdExportPackageRequiredKeys = cmdExportPackage.required;
const cmdExportPackageCanonicalSourceRequiredKeys =
  cmdExportPackage.$defs.exportPackageCanonicalSource.required;
const cmdExportPackageManifestRequiredKeys =
  cmdExportPackage.$defs.exportPackageManifest.required;
const cmdExportPackageManifestArtifactValues =
  cmdExportPackage.$defs.exportPackageManifest.properties.included_top_level_artifacts.items
    .enum;
const cmdExportPackageBundleManifestRequiredKeys =
  cmdExportPackageBundleManifest.required;
const cmdExportPackageBundleManifestArtifactRequiredKeys =
  cmdExportPackageBundleManifest.$defs.bundleManifestArtifact.required;
const cmdExportPackageBundleManifestProjectionRequiredKeys =
  cmdExportPackageBundleManifestProjection.required;
const cmdExportPackageBundleManifestProjectionSnapshotStatusRequiredKeys =
  cmdExportPackageBundleManifestProjection.properties.snapshot_status.required;
const cmdExportPackageBundleManifestProjectionSnapshotStatusSourceValues =
  cmdExportPackageBundleManifestProjection.properties.snapshot_status.properties.source
    .enum;
const cmdExportPackageBundleArchiveArtifactRequiredKeys =
  cmdExportPackageBundleArchiveArtifact.required;
const cmdExportPackageBundleArchiveArtifactProjectionRequiredKeys =
  cmdExportPackageBundleArchiveArtifactProjection.required;
const cmdExportPackageBundleArchiveArtifactProjectionSnapshotStatusRequiredKeys =
  cmdExportPackageBundleArchiveArtifactProjection.properties.snapshot_status.required;
const cmdExportPackageBundleArchiveArtifactProjectionSnapshotStatusSourceValues =
  cmdExportPackageBundleArchiveArtifactProjection.properties.snapshot_status.properties.source
    .enum;
const cmdExportPackageJsonArtifactProjectionRequiredKeys =
  cmdExportPackageJsonArtifactProjection.required;
const cmdExportPackageJsonArtifactProjectionSnapshotStatusRequiredKeys =
  cmdExportPackageJsonArtifactProjection.properties.snapshot_status.required;
const cmdExportPackageJsonArtifactProjectionSnapshotStatusSourceValues =
  cmdExportPackageJsonArtifactProjection.properties.snapshot_status.properties.source.enum;
const cmdExportPackageMarkdownArtifactProjectionRequiredKeys =
  cmdExportPackageMarkdownArtifactProjection.required;
const cmdExportPackageMarkdownArtifactProjectionSnapshotStatusRequiredKeys =
  cmdExportPackageMarkdownArtifactProjection.properties.snapshot_status.required;
const cmdExportPackageMarkdownArtifactProjectionSnapshotStatusSourceValues =
  cmdExportPackageMarkdownArtifactProjection.properties.snapshot_status.properties.source.enum;
const cmdExportPackageDocxArtifactProjectionRequiredKeys =
  cmdExportPackageDocxArtifactProjection.required;
const cmdExportPackageDocxArtifactProjectionSnapshotStatusRequiredKeys =
  cmdExportPackageDocxArtifactProjection.properties.snapshot_status.required;
const cmdExportPackageDocxArtifactProjectionSnapshotStatusSourceValues =
  cmdExportPackageDocxArtifactProjection.properties.snapshot_status.properties.source.enum;
const cmdExportPackagePdfArtifactProjectionRequiredKeys =
  cmdExportPackagePdfArtifactProjection.required;
const cmdExportPackagePdfArtifactProjectionSnapshotStatusRequiredKeys =
  cmdExportPackagePdfArtifactProjection.properties.snapshot_status.required;
const cmdExportPackagePdfArtifactProjectionSnapshotStatusSourceValues =
  cmdExportPackagePdfArtifactProjection.properties.snapshot_status.properties.source.enum;
const laneKeys = sweBodelningProfileInput.properties.profile_input_lane_snapshot.required;
const laneEntryRequiredKeys = sweBodelningProfileInput.$defs.laneSnapshotEntry.required;
const laneEntryAllowedKeys = Object.keys(
  sweBodelningProfileInput.$defs.laneSnapshotEntry.properties,
);
const releaseEvalSummaryRequiredKeys =
  sweBodelningReleaseEvalRun.properties.profile_input_summary.required;
const releaseEvalLaneEntryRequiredKeys =
  sweBodelningReleaseEvalRun.$defs.releaseEvalLaneSnapshotEntry.required;
const releaseEvalLaneEntryAllowedKeys = Object.keys(
  sweBodelningReleaseEvalRun.$defs.releaseEvalLaneSnapshotEntry.properties,
);
const dossierSnapshotRequiredKeys = sweBodelningProfileDossierSnapshot.required;
const dossierProjectionRequiredKeys = sweBodelningProfileDossierProjection.required;
const dossierCanonicalSourceRequiredKeys =
  sweBodelningProfileDossierSnapshot.$defs.canonicalSource.required;
const dossierCanonicalSourceProperties =
  sweBodelningProfileDossierSnapshot.$defs.canonicalSource.properties;
const dossierLaneEntryRequiredKeys =
  sweBodelningProfileDossierSnapshot.$defs.dossierLaneSnapshotEntry.required;
const dossierLaneEntryAllowedKeys = Object.keys(
  sweBodelningProfileDossierSnapshot.$defs.dossierLaneSnapshotEntry.properties,
);
const dossierIssueIndexEntryRequiredKeys =
  sweBodelningProfileDossierSnapshot.$defs.issueIndexEntry.required;
const dossierEvidenceReferenceIndexEntryRequiredKeys =
  sweBodelningProfileDossierSnapshot.$defs.evidenceReferenceIndexEntry.required;
const dossierEvidenceExhibitIndexEntryRequiredKeys =
  sweBodelningProfileDossierSnapshot.$defs.evidenceExhibitIndexEntry.required;
const dossierSectionIndexEntryRequiredKeys =
  sweBodelningProfileDossierSnapshot.$defs.sectionIndexEntry.required;
const exportPackageBundleArchiveArtifactRequiredKeys =
  sweBodelningExportPackageBundleArchiveArtifact.required;
const exportPackageBundleArchiveArtifactProjectionRequiredKeys =
  sweBodelningExportPackageBundleArchiveArtifactProjection.required;
const exportPackageBundleManifestRequiredKeys =
  sweBodelningExportPackageBundleManifest.required;
const exportPackageBundleManifestProjectionRequiredKeys =
  sweBodelningExportPackageBundleManifestProjection.required;
const exportPackageRequiredKeys = sweBodelningExportPackage.required;
const exportPackageBundleManifestArtifactRequiredKeys =
  sweBodelningExportPackageBundleManifest.$defs.bundleManifestArtifact.required;
const exportPackageBundleManifestProjectionSnapshotStatusRequiredKeys =
  sweBodelningExportPackageBundleManifestProjection.properties.snapshot_status.required;
const exportPackageBundleManifestProjectionSnapshotStatusSourceValues =
  sweBodelningExportPackageBundleManifestProjection.properties.snapshot_status.properties
    .source.enum;
const exportPackageBundleArchiveArtifactProjectionSnapshotStatusRequiredKeys =
  sweBodelningExportPackageBundleArchiveArtifactProjection.properties.snapshot_status.required;
const exportPackageBundleArchiveArtifactProjectionSnapshotStatusSourceValues =
  sweBodelningExportPackageBundleArchiveArtifactProjection.properties.snapshot_status
    .properties.source.enum;
const exportPackageDocxArtifactRequiredKeys =
  sweBodelningExportPackageDocxArtifact.required;
const exportPackageDocxArtifactProjectionRequiredKeys =
  sweBodelningExportPackageDocxArtifactProjection.required;
const exportPackagePdfArtifactRequiredKeys =
  sweBodelningExportPackagePdfArtifact.required;
const exportPackageJsonArtifactRequiredKeys =
  sweBodelningExportPackageJsonArtifact.required;
const exportPackageMarkdownArtifactRequiredKeys =
  sweBodelningExportPackageMarkdownArtifact.required;
const exportPackagePdfArtifactProjectionRequiredKeys =
  sweBodelningExportPackagePdfArtifactProjection.required;
const exportPackageJsonArtifactProjectionRequiredKeys =
  sweBodelningExportPackageJsonArtifactProjection.required;
const exportPackageMarkdownArtifactProjectionRequiredKeys =
  sweBodelningExportPackageMarkdownArtifactProjection.required;
const exportPackageProjectionRequiredKeys =
  sweBodelningExportPackageProjection.required;
const exportPackageManifestRequiredKeys =
  sweBodelningExportPackage.$defs.exportPackageManifest.required;
const exportPackageManifestArtifactValues =
  sweBodelningExportPackage.$defs.exportPackageManifest.properties
    .included_top_level_artifacts.items.enum;
const exportPackageProjectionSnapshotStatusRequiredKeys =
  sweBodelningExportPackageProjection.properties.snapshot_status.required;
const exportPackageProjectionSnapshotStatusSourceValues =
  sweBodelningExportPackageProjection.properties.snapshot_status.properties.source.enum;
const exportPackagePdfArtifactProjectionSnapshotStatusRequiredKeys =
  sweBodelningExportPackagePdfArtifactProjection.properties.snapshot_status.required;
const exportPackageDocxArtifactProjectionSnapshotStatusRequiredKeys =
  sweBodelningExportPackageDocxArtifactProjection.properties.snapshot_status.required;
const exportPackageDocxArtifactProjectionSnapshotStatusSourceValues =
  sweBodelningExportPackageDocxArtifactProjection.properties.snapshot_status.properties
    .source.enum;
const exportPackagePdfArtifactProjectionSnapshotStatusSourceValues =
  sweBodelningExportPackagePdfArtifactProjection.properties.snapshot_status.properties.source
    .enum;
const exportPackageJsonArtifactProjectionSnapshotStatusRequiredKeys =
  sweBodelningExportPackageJsonArtifactProjection.properties.snapshot_status.required;
const exportPackageJsonArtifactProjectionSnapshotStatusSourceValues =
  sweBodelningExportPackageJsonArtifactProjection.properties.snapshot_status.properties.source
    .enum;
const exportPackageMarkdownArtifactProjectionSnapshotStatusRequiredKeys =
  sweBodelningExportPackageMarkdownArtifactProjection.properties.snapshot_status.required;
const exportPackageMarkdownArtifactProjectionSnapshotStatusSourceValues =
  sweBodelningExportPackageMarkdownArtifactProjection.properties.snapshot_status.properties
    .source.enum;

function toCanonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => toCanonicalJson(item)).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${toCanonicalJson(value[key])}`);
    return `{${entries.join(",")}}`;
  }

  return JSON.stringify(value);
}

function buildSWEBodelningExportPackageMarkdownArtifactBody(exportPackage) {
  return [
    "# SWE_BODELNING Export Package",
    "",
    "## Metadata",
    "",
    `- \`jurisdiction_profile_key\`: \`${exportPackage.jurisdiction_profile_key}\``,
    `- \`export_version\`: \`${exportPackage.export_version}\``,
    `- \`dossier_fingerprint\`: \`${exportPackage.dossier_fingerprint}\``,
    `- \`generated_at\`: \`${exportPackage.generated_at}\``,
    "",
    "## Canonical Source",
    "",
    "```json",
    toCanonicalJson(exportPackage.canonical_source),
    "```",
    "",
    "## Manifest",
    "",
    "```json",
    toCanonicalJson(exportPackage.manifest),
    "```",
    "",
    "## Profile Dossier Snapshot",
    "",
    "```json",
    toCanonicalJson(exportPackage.profile_dossier_snapshot),
    "```",
    "",
  ].join("\n");
}

function createSchemaValidationError(code, message, details = {}) {
  const error = new Error(message);
  error.code = code;
  error.details = details;
  return error;
}

function unescapeXmlText(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function reconstructSWEBodelningExportPackageFromMarkdownArtifactBody(
  bodyUtf8,
  errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID",
) {
  if (typeof bodyUtf8 !== "string" || bodyUtf8.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must be a non-empty string",
      { field: "body_utf8" },
    );
  }

  const jurisdictionProfileKeyMatch = bodyUtf8.match(
    /^- `jurisdiction_profile_key`: `([^`]+)`$/m,
  );
  const exportVersionMatch = bodyUtf8.match(/^- `export_version`: `([^`]+)`$/m);
  const dossierFingerprintMatch = bodyUtf8.match(
    /^- `dossier_fingerprint`: `([^`]+)`$/m,
  );
  const generatedAtMatch = bodyUtf8.match(/^- `generated_at`: `([^`]+)`$/m);
  const canonicalSourceMatch = bodyUtf8.match(
    /^## Canonical Source\n\n```json\n([\s\S]*?)\n```$/m,
  );
  const manifestMatch = bodyUtf8.match(/^## Manifest\n\n```json\n([\s\S]*?)\n```$/m);
  const profileDossierSnapshotMatch = bodyUtf8.match(
    /^## Profile Dossier Snapshot\n\n```json\n([\s\S]*?)\n```$/m,
  );

  if (
    !jurisdictionProfileKeyMatch ||
    !exportVersionMatch ||
    !dossierFingerprintMatch ||
    !generatedAtMatch ||
    !canonicalSourceMatch ||
    !manifestMatch ||
    !profileDossierSnapshotMatch
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must match the canonical Markdown export artifact structure",
      { field: "body_utf8" },
    );
  }

  let canonicalSource;
  let manifest;
  let profileDossierSnapshot;

  try {
    canonicalSource = JSON.parse(canonicalSourceMatch[1]);
    manifest = JSON.parse(manifestMatch[1]);
    profileDossierSnapshot = JSON.parse(profileDossierSnapshotMatch[1]);
  } catch {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must contain valid JSON sections",
      { field: "body_utf8" },
    );
  }

  return validateSWEBodelningExportPackage(
    {
      jurisdiction_profile_key: jurisdictionProfileKeyMatch[1],
      export_version: exportVersionMatch[1],
      dossier_fingerprint: dossierFingerprintMatch[1],
      canonical_source: canonicalSource,
      profile_dossier_snapshot: profileDossierSnapshot,
      generated_at: generatedAtMatch[1],
      manifest,
    },
    errorCode,
  );
}

function unescapePdfText(value) {
  let result = "";

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];

    if (character !== "\\") {
      result += character;
      continue;
    }

    const escapedCharacter = value[index + 1];

    if (escapedCharacter === undefined) {
      result += "\\";
      continue;
    }

    index += 1;

    if (escapedCharacter === "n") {
      result += "\n";
      continue;
    }

    if (escapedCharacter === "r") {
      result += "\r";
      continue;
    }

    result += escapedCharacter;
  }

  return result;
}

function reconstructSWEBodelningExportPackageFromPdfArtifactBody(
  bodyBase64,
  errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_INVALID",
) {
  if (typeof bodyBase64 !== "string" || bodyBase64.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a non-empty string",
      { field: "body_base64" },
    );
  }

  const pdfPayload = Buffer.from(bodyBase64, "base64").toString("utf8");
  const pdfTextLineMatches = [...pdfPayload.matchAll(/\(((?:\\.|[^\\)])*)\) Tj/g)];
  const pdfTextLines = pdfTextLineMatches.map((match) => unescapePdfText(match[1]));

  if (pdfTextLines.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must decode to the canonical PDF artifact structure",
      { field: "body_base64" },
    );
  }

  const canonicalExportPackageJsonMarkerIndex = pdfTextLines.indexOf(
    "canonical_export_package_json:",
  );

  if (
    canonicalExportPackageJsonMarkerIndex === -1 ||
    canonicalExportPackageJsonMarkerIndex === pdfTextLines.length - 1
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must contain canonical_export_package_json lines",
      { field: "body_base64" },
    );
  }

  const canonicalExportPackageJson = pdfTextLines
    .slice(canonicalExportPackageJsonMarkerIndex + 1)
    .join("");

  let exportPackage;

  try {
    exportPackage = JSON.parse(canonicalExportPackageJson);
  } catch {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must contain valid canonical export package JSON",
      { field: "body_base64" },
    );
  }

  return validateSWEBodelningExportPackage(exportPackage, errorCode);
}

function reconstructCMDExportPackageFromPdfArtifactBody(
  bodyBase64,
  errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_INVALID",
) {
  if (typeof bodyBase64 !== "string" || bodyBase64.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a non-empty string",
      { field: "body_base64" },
    );
  }

  const pdfPayload = Buffer.from(bodyBase64, "base64").toString("utf8");
  const pdfTextLineMatches = [...pdfPayload.matchAll(/\(((?:\\.|[^\\)])*)\) Tj/g)];
  const pdfTextLines = pdfTextLineMatches.map((match) => unescapePdfText(match[1]));

  if (pdfTextLines.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must decode to the canonical PDF artifact structure",
      { field: "body_base64" },
    );
  }

  const canonicalExportPackageJsonMarkerIndex = pdfTextLines.indexOf(
    "canonical_export_package_json:",
  );

  if (
    canonicalExportPackageJsonMarkerIndex === -1 ||
    canonicalExportPackageJsonMarkerIndex === pdfTextLines.length - 1
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must contain canonical_export_package_json lines",
      { field: "body_base64" },
    );
  }

  const canonicalExportPackageJson = pdfTextLines
    .slice(canonicalExportPackageJsonMarkerIndex + 1)
    .join("");

  let exportPackage;

  try {
    exportPackage = JSON.parse(canonicalExportPackageJson);
  } catch {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must contain valid canonical export package JSON",
      { field: "body_base64" },
    );
  }

  return validateCMDExportPackage(exportPackage, errorCode);
}

function reconstructSWEBodelningExportPackageFromDocxArtifactBody(
  bodyBase64,
  errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID",
) {
  if (typeof bodyBase64 !== "string" || bodyBase64.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a non-empty string",
      { field: "body_base64" },
    );
  }

  const docxPayload = Buffer.from(bodyBase64, "base64").toString("utf8");
  const docxTextLineMatches = [...docxPayload.matchAll(/<w:t(?: [^>]*)?>([\s\S]*?)<\/w:t>/g)];
  const docxTextLines = docxTextLineMatches.map((match) => unescapeXmlText(match[1]));

  if (docxTextLines.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must decode to the canonical DOCX artifact structure",
      { field: "body_base64" },
    );
  }

  const canonicalExportPackageJsonMarkerIndex = docxTextLines.indexOf(
    "canonical_export_package_json:",
  );

  if (
    canonicalExportPackageJsonMarkerIndex === -1 ||
    canonicalExportPackageJsonMarkerIndex === docxTextLines.length - 1
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must contain canonical_export_package_json lines",
      { field: "body_base64" },
    );
  }

  const canonicalExportPackageJson = docxTextLines
    .slice(canonicalExportPackageJsonMarkerIndex + 1)
    .join("");

  let exportPackage;

  try {
    exportPackage = JSON.parse(canonicalExportPackageJson);
  } catch {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must contain valid canonical export package JSON",
      { field: "body_base64" },
    );
  }

  return validateSWEBodelningExportPackage(exportPackage, errorCode);
}

function reconstructCMDExportPackageFromDocxArtifactBody(
  bodyBase64,
  errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID",
) {
  if (typeof bodyBase64 !== "string" || bodyBase64.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a non-empty string",
      { field: "body_base64" },
    );
  }

  const docxPayload = Buffer.from(bodyBase64, "base64").toString("utf8");
  const docxTextLineMatches = [...docxPayload.matchAll(/<w:t(?: [^>]*)?>([\s\S]*?)<\/w:t>/g)];
  const docxTextLines = docxTextLineMatches.map((match) => unescapeXmlText(match[1]));

  if (docxTextLines.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must decode to the canonical DOCX artifact structure",
      { field: "body_base64" },
    );
  }

  const canonicalExportPackageJsonMarkerIndex = docxTextLines.indexOf(
    "canonical_export_package_json:",
  );

  if (
    canonicalExportPackageJsonMarkerIndex === -1 ||
    canonicalExportPackageJsonMarkerIndex === docxTextLines.length - 1
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must contain canonical_export_package_json lines",
      { field: "body_base64" },
    );
  }

  const canonicalExportPackageJson = docxTextLines
    .slice(canonicalExportPackageJsonMarkerIndex + 1)
    .join("");

  let exportPackage;

  try {
    exportPackage = JSON.parse(canonicalExportPackageJson);
  } catch {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must contain valid canonical export package JSON",
      { field: "body_base64" },
    );
  }

  return validateCMDExportPackage(exportPackage, errorCode);
}

function assertPlainObject(value, code, field) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw createSchemaValidationError(code, `${field} must be an object`, { field });
  }
}

function assertExactKeys(value, expectedKeys, code, field) {
  const actualKeys = Object.keys(value).sort();
  const sortedExpectedKeys = [...expectedKeys].sort();

  if (JSON.stringify(actualKeys) !== JSON.stringify(sortedExpectedKeys)) {
    throw createSchemaValidationError(code, `${field} has an invalid key set`, {
      field,
      expectedKeys: sortedExpectedKeys,
      actualKeys,
    });
  }
}

function assertAllowedKeys(value, allowedKeys, code, field) {
  const actualKeys = Object.keys(value);
  const unexpectedKeys = actualKeys.filter((key) => !allowedKeys.includes(key));

  if (unexpectedKeys.length > 0) {
    throw createSchemaValidationError(code, `${field} has unexpected keys`, {
      field,
      unexpectedKeys: unexpectedKeys.sort(),
      allowedKeys: [...allowedKeys].sort(),
    });
  }
}

function validateStringEnum(value, allowedValues, field, code) {
  if (typeof value !== "string" || !allowedValues.includes(value)) {
    throw createSchemaValidationError(code, `${field} must be one of: ${allowedValues.join(", ")}`, {
      field,
      allowedValues,
    });
  }
}

function validateNonEmptyUniqueStringArray(value, field, code) {
  if (!Array.isArray(value)) {
    throw createSchemaValidationError(code, `${field} must be an array`, {
      field,
    });
  }

  if (value.length === 0) {
    throw createSchemaValidationError(code, `${field} must not be empty`, {
      field,
    });
  }

  const seenValues = new Set();

  value.forEach((entry, index) => {
    if (typeof entry !== "string" || entry.length === 0) {
      throw createSchemaValidationError(
        code,
        `${field}[${index}] must be a non-empty string`,
        {
          field: `${field}[${index}]`,
        },
      );
    }

    if (seenValues.has(entry)) {
      throw createSchemaValidationError(
        code,
        `${field} must not contain duplicates`,
        {
          field,
          duplicateValue: entry,
        },
      );
    }

    seenValues.add(entry);
  });
}

function validateStringEnumArray(value, allowedValues, field, code) {
  validateNonEmptyUniqueStringArray(value, field, code);

  value.forEach((entry, index) => {
    validateStringEnum(entry, allowedValues, `${field}[${index}]`, code);
  });
}

function validateSemanticFactModel(input, errorCode = "ERR_SEMANTIC_FACT_INVALID") {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, semanticFactModelRequiredKeys, errorCode, "input");

  validateStringEnum(
    input.presence_status,
    semanticFactModelPresenceStatusValues,
    "presence_status",
    errorCode,
  );
  validateStringEnum(
    input.source_status,
    semanticFactModelSourceStatusValues,
    "source_status",
    errorCode,
  );
  validateStringEnum(
    input.verification_status,
    semanticFactModelVerificationStatusValues,
    "verification_status",
    errorCode,
  );
  validateStringEnum(
    input.dispute_status,
    semanticFactModelDisputeStatusValues,
    "dispute_status",
    errorCode,
  );
  validateStringEnum(
    input.consistency_status,
    semanticFactModelConsistencyStatusValues,
    "consistency_status",
    errorCode,
  );

  return input;
}

function validateProfileInputPresenceOnlySemanticFact(
  input,
  field,
  errorCode,
) {
  assertPlainObject(input, errorCode, field);
  assertExactKeys(
    input,
    profileInputSemanticFactAlignmentPresenceRequiredKeys,
    errorCode,
    field,
  );

  validateStringEnum(
    input.presence_status,
    semanticFactModelPresenceStatusValues,
    `${field}.presence_status`,
    errorCode,
  );
}

function validateProfileInputSemanticFactAlignment(
  input,
  errorCode = "ERR_PROFILE_INPUT_SEMANTIC_FACT_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    profileInputSemanticFactAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  validateStringEnum(
    input.alignment_scope,
    [profileInputSemanticFactAlignmentScopeValue],
    "input.alignment_scope",
    errorCode,
  );

  validateStringEnumArray(
    input.supported_semantic_fact_dimensions,
    profileInputSemanticFactAlignmentSupportedDimensionValues,
    "input.supported_semantic_fact_dimensions",
    errorCode,
  );

  const foundSupportedDimensions = [
    ...input.supported_semantic_fact_dimensions,
  ].sort();
  const expectedSupportedDimensions = [
    ...profileInputSemanticFactAlignmentSupportedDimensionValues,
  ].sort();

  if (
    foundSupportedDimensions.length !== expectedSupportedDimensions.length ||
    foundSupportedDimensions.join(",") !== expectedSupportedDimensions.join(",")
  ) {
    throw createSchemaValidationError(
      errorCode,
      "input.supported_semantic_fact_dimensions must match the documented safe dimensions",
      {
        field: "input.supported_semantic_fact_dimensions",
        expectedDimensions: expectedSupportedDimensions,
        foundDimensions: foundSupportedDimensions,
      },
    );
  }

  validateStringEnumArray(
    input.unassigned_semantic_fact_dimensions,
    profileInputSemanticFactAlignmentUnassignedDimensionValues,
    "input.unassigned_semantic_fact_dimensions",
    errorCode,
  );

  const foundUnassignedDimensions = [
    ...input.unassigned_semantic_fact_dimensions,
  ].sort();
  const expectedUnassignedDimensions = [
    ...profileInputSemanticFactAlignmentUnassignedDimensionValues,
  ].sort();

  if (
    foundUnassignedDimensions.length !== expectedUnassignedDimensions.length ||
    foundUnassignedDimensions.join(",") !== expectedUnassignedDimensions.join(",")
  ) {
    throw createSchemaValidationError(
      errorCode,
      "input.unassigned_semantic_fact_dimensions must match the documented frozen dimensions",
      {
        field: "input.unassigned_semantic_fact_dimensions",
        expectedDimensions: expectedUnassignedDimensions,
        foundDimensions: foundUnassignedDimensions,
      },
    );
  }

  for (const alignmentCaseKey of profileInputSemanticFactAlignmentCaseKeys) {
    const alignmentField = `input.${alignmentCaseKey}`;
    const alignmentEntry = input[alignmentCaseKey];
    const expectedProfileKey =
      profileInputSemanticFactAlignmentJurisdictionProfileKeyByCase[
        alignmentCaseKey
      ];
    const expectedCaseKey =
      profileInputSemanticFactAlignmentCaseKeyByCase[alignmentCaseKey];
    const expectedPresenceStatus =
      profileInputSemanticFactAlignmentPresenceStatusByCase[alignmentCaseKey];
    const expectedInputReferences = [
      ...profileInputSemanticFactAlignmentInputReferencesByCase[alignmentCaseKey],
    ].sort();

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      profileInputSemanticFactAlignmentEntryRequiredKeys,
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.jurisdiction_profile_key,
      [expectedProfileKey],
      `${alignmentField}.jurisdiction_profile_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.case_key,
      [expectedCaseKey],
      `${alignmentField}.case_key`,
      errorCode,
    );

    validateNonEmptyUniqueStringArray(
      alignmentEntry.input_contract_references,
      `${alignmentField}.input_contract_references`,
      errorCode,
    );

    const foundInputReferences = [...alignmentEntry.input_contract_references].sort();

    if (
      foundInputReferences.length !== expectedInputReferences.length ||
      foundInputReferences.join(",") !== expectedInputReferences.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.input_contract_references must match the canonical profile_input presence signal references`,
        {
          field: `${alignmentField}.input_contract_references`,
          expectedReferences: expectedInputReferences,
          foundReferences: foundInputReferences,
        },
      );
    }

    validateProfileInputPresenceOnlySemanticFact(
      alignmentEntry.canonical_semantic_fact,
      `${alignmentField}.canonical_semantic_fact`,
      errorCode,
    );

    if (
      alignmentEntry.canonical_semantic_fact.presence_status !==
      expectedPresenceStatus
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.canonical_semantic_fact.presence_status must match the canonical profile_input presence mapping`,
        {
          field: `${alignmentField}.canonical_semantic_fact.presence_status`,
          expectedPresenceStatus,
          foundPresenceStatus:
            alignmentEntry.canonical_semantic_fact.presence_status,
        },
      );
    }
  }

  return input;
}

function validateStopOutcomeModel(input, errorCode = "ERR_STOP_OUTCOME_INVALID") {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, stopOutcomeModelRequiredKeys, errorCode, "input");

  validateStringEnum(
    input.stop_outcome,
    stopOutcomeModelValues,
    "stop_outcome",
    errorCode,
  );

  return input;
}

function validateStopMatrixModel(input, errorCode = "ERR_STOP_MATRIX_INVALID") {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, stopMatrixModelRequiredKeys, errorCode, "input");

  if (!Array.isArray(input.matrix_entries)) {
    throw createSchemaValidationError(
      errorCode,
      "matrix_entries must be an array",
      {
        field: "matrix_entries",
      },
    );
  }

  if (input.matrix_entries.length !== stopMatrixModelConditionValues.length) {
    throw createSchemaValidationError(
      errorCode,
      "matrix_entries must contain the canonical stop-matrix entries",
      {
        field: "matrix_entries",
        expectedCount: stopMatrixModelConditionValues.length,
        foundCount: input.matrix_entries.length,
      },
    );
  }

  const seenConditionKeys = new Set();

  input.matrix_entries.forEach((entry, index) => {
    const entryField = `matrix_entries[${index}]`;
    assertPlainObject(entry, errorCode, entryField);
    assertExactKeys(entry, stopMatrixModelEntryRequiredKeys, errorCode, entryField);

    validateStringEnum(
      entry.condition_key,
      stopMatrixModelConditionValues,
      `${entryField}.condition_key`,
      errorCode,
    );

    if (seenConditionKeys.has(entry.condition_key)) {
      throw createSchemaValidationError(
        errorCode,
        `${entryField}.condition_key must be unique`,
        {
          field: `${entryField}.condition_key`,
          conditionKey: entry.condition_key,
        },
      );
    }

    seenConditionKeys.add(entry.condition_key);

    if (!Array.isArray(entry.canonical_stop_outcomes)) {
      throw createSchemaValidationError(
        errorCode,
        `${entryField}.canonical_stop_outcomes must be an array`,
        {
          field: `${entryField}.canonical_stop_outcomes`,
        },
      );
    }

    const expectedOutcomes =
      stopMatrixCanonicalOutcomeValuesByCondition[entry.condition_key];
    const foundOutcomes = [];

    entry.canonical_stop_outcomes.forEach((outcome, outcomeIndex) => {
      validateStopOutcomeModel(outcome, errorCode);
      const outcomeValue = outcome.stop_outcome;

      if (foundOutcomes.includes(outcomeValue)) {
        throw createSchemaValidationError(
          errorCode,
          `${entryField}.canonical_stop_outcomes must not contain duplicates`,
          {
            field: `${entryField}.canonical_stop_outcomes`,
            duplicateStopOutcome: outcomeValue,
          },
        );
      }

      foundOutcomes.push(outcomeValue);
    });

    if (
      foundOutcomes.length !== expectedOutcomes.length ||
      [...foundOutcomes].sort().join(",") !== [...expectedOutcomes].sort().join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${entryField}.canonical_stop_outcomes must match the canonical stop outcomes`,
        {
          field: `${entryField}.canonical_stop_outcomes`,
          expectedStopOutcomes: [...expectedOutcomes].sort(),
          foundStopOutcomes: [...foundOutcomes].sort(),
        },
      );
    }
  });

  const missingConditionKeys = stopMatrixModelConditionValues.filter(
    (conditionKey) => !seenConditionKeys.has(conditionKey),
  );

  if (missingConditionKeys.length > 0) {
    throw createSchemaValidationError(
      errorCode,
      "matrix_entries must include all canonical condition keys",
      {
        field: "matrix_entries",
        missingConditionKeys,
      },
    );
  }

  return input;
}

function validateReleaseEvalPresenceOnlySemanticFact(input, field, errorCode) {
  assertPlainObject(input, errorCode, field);
  assertExactKeys(
    input,
    releaseEvalSemanticFactAlignmentPresenceOnlyRequiredKeys,
    errorCode,
    field,
  );

  validateStringEnum(
    input.presence_status,
    semanticFactModelPresenceStatusValues,
    `${field}.presence_status`,
    errorCode,
  );
}

function validateReleaseEvalPresenceAndSourceSemanticFact(input, field, errorCode) {
  assertPlainObject(input, errorCode, field);
  assertExactKeys(
    input,
    releaseEvalSemanticFactAlignmentPresenceAndSourceRequiredKeys,
    errorCode,
    field,
  );

  validateStringEnum(
    input.presence_status,
    semanticFactModelPresenceStatusValues,
    `${field}.presence_status`,
    errorCode,
  );
  validateStringEnum(
    input.source_status,
    semanticFactModelSourceStatusValues,
    `${field}.source_status`,
    errorCode,
  );
}

function validateReleaseEvalSemanticFactAlignment(
  input,
  errorCode = "ERR_RELEASE_EVAL_SEMANTIC_FACT_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    releaseEvalSemanticFactAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  validateStringEnum(
    input.alignment_scope,
    [releaseEvalSemanticFactAlignmentScopeValue],
    "input.alignment_scope",
    errorCode,
  );

  validateStringEnumArray(
    input.supported_semantic_fact_dimensions,
    releaseEvalSemanticFactAlignmentSupportedDimensionValues,
    "input.supported_semantic_fact_dimensions",
    errorCode,
  );

  const foundSupportedDimensions = [...input.supported_semantic_fact_dimensions].sort();
  const expectedSupportedDimensions = [
    ...releaseEvalSemanticFactAlignmentSupportedDimensionValues,
  ].sort();

  if (
    foundSupportedDimensions.length !== expectedSupportedDimensions.length ||
    foundSupportedDimensions.join(",") !== expectedSupportedDimensions.join(",")
  ) {
    throw createSchemaValidationError(
      errorCode,
      "input.supported_semantic_fact_dimensions must match the documented safe dimensions",
      {
        field: "input.supported_semantic_fact_dimensions",
        expectedDimensions: expectedSupportedDimensions,
        foundDimensions: foundSupportedDimensions,
      },
    );
  }

  validateStringEnumArray(
    input.unassigned_semantic_fact_dimensions,
    releaseEvalSemanticFactAlignmentUnassignedDimensionValues,
    "input.unassigned_semantic_fact_dimensions",
    errorCode,
  );

  const foundUnassignedDimensions = [...input.unassigned_semantic_fact_dimensions].sort();
  const expectedUnassignedDimensions = [
    ...releaseEvalSemanticFactAlignmentUnassignedDimensionValues,
  ].sort();

  if (
    foundUnassignedDimensions.length !== expectedUnassignedDimensions.length ||
    foundUnassignedDimensions.join(",") !== expectedUnassignedDimensions.join(",")
  ) {
    throw createSchemaValidationError(
      errorCode,
      "input.unassigned_semantic_fact_dimensions must match the documented frozen dimensions",
      {
        field: "input.unassigned_semantic_fact_dimensions",
        expectedDimensions: expectedUnassignedDimensions,
        foundDimensions: foundUnassignedDimensions,
      },
    );
  }

  for (const alignmentCaseKey of releaseEvalSemanticFactAlignmentCaseKeys) {
    const alignmentField = `input.${alignmentCaseKey}`;
    const alignmentEntry = input[alignmentCaseKey];
    const expectedProfileKey =
      releaseEvalSemanticFactAlignmentJurisdictionProfileKeyByCase[alignmentCaseKey];
    const expectedCaseKey =
      releaseEvalSemanticFactAlignmentCaseKeyByCase[alignmentCaseKey];
    const expectedReleaseGate =
      releaseEvalSemanticFactAlignmentReleaseGateByCase[alignmentCaseKey];
    const expectedFreshness =
      releaseEvalSemanticFactAlignmentFreshnessByCase[alignmentCaseKey];
    const expectedReasonCode =
      releaseEvalSemanticFactAlignmentReasonCodeByCase[alignmentCaseKey];
    const expectedInputReferences = [
      ...releaseEvalSemanticFactAlignmentInputReferencesByCase[alignmentCaseKey],
    ].sort();
    const expectedPresenceStatus =
      releaseEvalSemanticFactAlignmentPresenceStatusByCase[alignmentCaseKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      releaseEvalSemanticFactAlignmentEntryRequiredKeys,
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.jurisdiction_profile_key,
      [expectedProfileKey],
      `${alignmentField}.jurisdiction_profile_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.case_key,
      [expectedCaseKey],
      `${alignmentField}.case_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_gate,
      [expectedReleaseGate],
      `${alignmentField}.release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_eval_freshness,
      [expectedFreshness],
      `${alignmentField}.release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_gate_reason_code,
      [expectedReasonCode],
      `${alignmentField}.release_gate_reason_code`,
      errorCode,
    );
    validateStringEnumArray(
      alignmentEntry.input_contract_references,
      expectedInputReferences,
      `${alignmentField}.input_contract_references`,
      errorCode,
    );

    const foundInputReferences = [...alignmentEntry.input_contract_references].sort();

    if (
      foundInputReferences.length !== expectedInputReferences.length ||
      foundInputReferences.join(",") !== expectedInputReferences.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.input_contract_references must match the canonical input references`,
        {
          field: `${alignmentField}.input_contract_references`,
          expectedInputReferences,
          foundInputReferences,
        },
      );
    }

    if (
      releaseEvalSemanticFactAlignmentCasesWithSourceStatus.includes(alignmentCaseKey)
    ) {
      const expectedSourceStatus =
        releaseEvalSemanticFactAlignmentSourceStatusByCase[alignmentCaseKey];

      validateReleaseEvalPresenceAndSourceSemanticFact(
        alignmentEntry.canonical_semantic_fact,
        `${alignmentField}.canonical_semantic_fact`,
        errorCode,
      );

      if (
        alignmentEntry.canonical_semantic_fact.presence_status !== expectedPresenceStatus
      ) {
        throw createSchemaValidationError(
          errorCode,
          `${alignmentField}.canonical_semantic_fact.presence_status must match the canonical presence status`,
          {
            field: `${alignmentField}.canonical_semantic_fact.presence_status`,
            expectedPresenceStatus,
            foundPresenceStatus:
              alignmentEntry.canonical_semantic_fact.presence_status,
          },
        );
      }

      if (alignmentEntry.canonical_semantic_fact.source_status !== expectedSourceStatus) {
        throw createSchemaValidationError(
          errorCode,
          `${alignmentField}.canonical_semantic_fact.source_status must match the canonical source status`,
          {
            field: `${alignmentField}.canonical_semantic_fact.source_status`,
            expectedSourceStatus,
            foundSourceStatus: alignmentEntry.canonical_semantic_fact.source_status,
          },
        );
      }

      continue;
    }

    validateReleaseEvalPresenceOnlySemanticFact(
      alignmentEntry.canonical_semantic_fact,
      `${alignmentField}.canonical_semantic_fact`,
      errorCode,
    );

    if (alignmentEntry.canonical_semantic_fact.presence_status !== expectedPresenceStatus) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.canonical_semantic_fact.presence_status must match the canonical presence status`,
        {
          field: `${alignmentField}.canonical_semantic_fact.presence_status`,
          expectedPresenceStatus,
          foundPresenceStatus: alignmentEntry.canonical_semantic_fact.presence_status,
        },
      );
    }
  }

  return input;
}

function validateReleaseEvalStopOutcomeAlignment(
  input,
  errorCode = "ERR_RELEASE_EVAL_STOP_OUTCOME_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    releaseEvalStopOutcomeAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of releaseEvalStopOutcomeAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];
    const expectedReasonCodes =
      releaseEvalStopOutcomeAlignmentReasonCodesByProfile[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      releaseEvalStopOutcomeAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.release_gate,
      [releaseEvalStopOutcomeAlignmentReleaseGateValue],
      `${alignmentField}.release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_eval_freshness,
      [releaseEvalStopOutcomeAlignmentFreshnessValue],
      `${alignmentField}.release_eval_freshness`,
      errorCode,
    );
    validateStopOutcomeModel(alignmentEntry.canonical_stop_outcome, errorCode);

    if (
      alignmentEntry.canonical_stop_outcome.stop_outcome !==
      alignmentEntry.release_gate
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.canonical_stop_outcome must match release_gate`,
        {
          field: `${alignmentField}.canonical_stop_outcome`,
          expectedStopOutcome: alignmentEntry.release_gate,
          foundStopOutcome: alignmentEntry.canonical_stop_outcome.stop_outcome,
        },
      );
    }

    validateStringEnumArray(
      alignmentEntry.release_gate_reason_codes,
      expectedReasonCodes,
      `${alignmentField}.release_gate_reason_codes`,
      errorCode,
    );

    const foundReasonCodes = [...alignmentEntry.release_gate_reason_codes].sort();
    const sortedExpectedReasonCodes = [...expectedReasonCodes].sort();

    if (
      foundReasonCodes.length !== sortedExpectedReasonCodes.length ||
      foundReasonCodes.join(",") !== sortedExpectedReasonCodes.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.release_gate_reason_codes must match the canonical reason codes`,
        {
          field: `${alignmentField}.release_gate_reason_codes`,
          expectedReasonCodes: sortedExpectedReasonCodes,
          foundReasonCodes,
        },
      );
    }
  }

  return input;
}

function validateProfileDossierStopOutcomeAlignment(
  input,
  errorCode = "ERR_PROFILE_DOSSIER_STOP_OUTCOME_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    profileDossierStopOutcomeAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of profileDossierStopOutcomeAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];
    const expectedReasonCodes =
      profileDossierStopOutcomeAlignmentReasonCodesByProfile[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      profileDossierStopOutcomeAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.release_gate,
      [profileDossierStopOutcomeAlignmentReleaseGateValue],
      `${alignmentField}.release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_eval_freshness,
      [profileDossierStopOutcomeAlignmentFreshnessValue],
      `${alignmentField}.release_eval_freshness`,
      errorCode,
    );
    validateStopOutcomeModel(alignmentEntry.canonical_stop_outcome, errorCode);

    if (
      alignmentEntry.canonical_stop_outcome.stop_outcome !==
      alignmentEntry.release_gate
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.canonical_stop_outcome must match release_gate`,
        {
          field: `${alignmentField}.canonical_stop_outcome`,
          expectedStopOutcome: alignmentEntry.release_gate,
          foundStopOutcome: alignmentEntry.canonical_stop_outcome.stop_outcome,
        },
      );
    }

    validateStringEnumArray(
      alignmentEntry.release_gate_reason_codes,
      expectedReasonCodes,
      `${alignmentField}.release_gate_reason_codes`,
      errorCode,
    );

    const foundReasonCodes = [...alignmentEntry.release_gate_reason_codes].sort();
    const sortedExpectedReasonCodes = [...expectedReasonCodes].sort();

    if (
      foundReasonCodes.length !== sortedExpectedReasonCodes.length ||
      foundReasonCodes.join(",") !== sortedExpectedReasonCodes.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.release_gate_reason_codes must match the canonical reason codes`,
        {
          field: `${alignmentField}.release_gate_reason_codes`,
          expectedReasonCodes: sortedExpectedReasonCodes,
          foundReasonCodes,
        },
      );
    }
  }

  return input;
}

function validateExportPackageStopOutcomeAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_STOP_OUTCOME_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageStopOutcomeAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageStopOutcomeAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];
    const expectedReasonCodes =
      exportPackageStopOutcomeAlignmentReasonCodesByProfile[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageStopOutcomeAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.profile_dossier_release_gate,
      [exportPackageStopOutcomeAlignmentReleaseGateValue],
      `${alignmentField}.profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.profile_dossier_release_eval_freshness,
      [exportPackageStopOutcomeAlignmentFreshnessValue],
      `${alignmentField}.profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStopOutcomeModel(alignmentEntry.canonical_stop_outcome, errorCode);

    if (
      alignmentEntry.canonical_stop_outcome.stop_outcome !==
      alignmentEntry.profile_dossier_release_gate
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.canonical_stop_outcome must match profile_dossier_release_gate`,
        {
          field: `${alignmentField}.canonical_stop_outcome`,
          expectedStopOutcome: alignmentEntry.profile_dossier_release_gate,
          foundStopOutcome: alignmentEntry.canonical_stop_outcome.stop_outcome,
        },
      );
    }

    validateStringEnumArray(
      alignmentEntry.profile_dossier_release_gate_reason_codes,
      expectedReasonCodes,
      `${alignmentField}.profile_dossier_release_gate_reason_codes`,
      errorCode,
    );

    const foundReasonCodes = [
      ...alignmentEntry.profile_dossier_release_gate_reason_codes,
    ].sort();
    const sortedExpectedReasonCodes = [...expectedReasonCodes].sort();

    if (
      foundReasonCodes.length !== sortedExpectedReasonCodes.length ||
      foundReasonCodes.join(",") !== sortedExpectedReasonCodes.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.profile_dossier_release_gate_reason_codes must match the canonical reason codes`,
        {
          field: `${alignmentField}.profile_dossier_release_gate_reason_codes`,
          expectedReasonCodes: sortedExpectedReasonCodes,
          foundReasonCodes,
        },
      );
    }
  }

  return input;
}

function validateExportPackageBundleArchiveArtifactStopOutcomeAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_STOP_OUTCOME_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageBundleArchiveArtifactStopOutcomeAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageBundleArchiveArtifactStopOutcomeAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];
    const expectedReasonCodes =
      exportPackageBundleArchiveArtifactStopOutcomeAlignmentReasonCodesByProfile[
        jurisdictionProfileKey
      ];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageBundleArchiveArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackageBundleArchiveArtifactStopOutcomeAlignmentArtifactTypeValue],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageBundleArchiveArtifactStopOutcomeAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageBundleArchiveArtifactStopOutcomeAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStopOutcomeModel(alignmentEntry.canonical_stop_outcome, errorCode);

    if (
      alignmentEntry.canonical_stop_outcome.stop_outcome !==
      alignmentEntry.source_export_package_profile_dossier_release_gate
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.canonical_stop_outcome must match source_export_package_profile_dossier_release_gate`,
        {
          field: `${alignmentField}.canonical_stop_outcome`,
          expectedStopOutcome:
            alignmentEntry.source_export_package_profile_dossier_release_gate,
          foundStopOutcome: alignmentEntry.canonical_stop_outcome.stop_outcome,
        },
      );
    }

    validateStringEnumArray(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
      expectedReasonCodes,
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
      errorCode,
    );

    const foundReasonCodes = [
      ...alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
    ].sort();
    const sortedExpectedReasonCodes = [...expectedReasonCodes].sort();

    if (
      foundReasonCodes.length !== sortedExpectedReasonCodes.length ||
      foundReasonCodes.join(",") !== sortedExpectedReasonCodes.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes must match the canonical reason codes`,
        {
          field: `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
          expectedReasonCodes: sortedExpectedReasonCodes,
          foundReasonCodes,
        },
      );
    }
  }

  return input;
}

function validateExportPackageBundleArchiveArtifactStopMatrixAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_STOP_MATRIX_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageBundleArchiveArtifactStopMatrixAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageBundleArchiveArtifactStopMatrixAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageBundleArchiveArtifactStopMatrixAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackageBundleArchiveArtifactStopMatrixAlignmentArtifactTypeValue],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageBundleArchiveArtifactStopMatrixAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageBundleArchiveArtifactStopMatrixAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [
        exportPackageBundleArchiveArtifactStopMatrixAlignmentReasonCodeByProfile[
          jurisdictionProfileKey
        ],
      ],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateStopMatrixEntryForAlignment(
      alignmentEntry.stop_matrix_entry,
      errorCode,
      `${alignmentField}.stop_matrix_entry`,
      exportPackageBundleArchiveArtifactStopMatrixAlignmentConditionKey,
      "export_package_bundle_archive_artifact",
    );
  }

  return input;
}

function validateExportPackageBundleManifestStopOutcomeAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_STOP_OUTCOME_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageBundleManifestStopOutcomeAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageBundleManifestStopOutcomeAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];
    const expectedReasonCodes =
      exportPackageBundleManifestStopOutcomeAlignmentReasonCodesByProfile[
        jurisdictionProfileKey
      ];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageBundleManifestStopOutcomeAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageBundleManifestStopOutcomeAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageBundleManifestStopOutcomeAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStopOutcomeModel(alignmentEntry.canonical_stop_outcome, errorCode);

    if (
      alignmentEntry.canonical_stop_outcome.stop_outcome !==
      alignmentEntry.source_export_package_profile_dossier_release_gate
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.canonical_stop_outcome must match source_export_package_profile_dossier_release_gate`,
        {
          field: `${alignmentField}.canonical_stop_outcome`,
          expectedStopOutcome:
            alignmentEntry.source_export_package_profile_dossier_release_gate,
          foundStopOutcome: alignmentEntry.canonical_stop_outcome.stop_outcome,
        },
      );
    }

    validateStringEnumArray(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
      expectedReasonCodes,
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
      errorCode,
    );

    const foundReasonCodes = [
      ...alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
    ].sort();
    const sortedExpectedReasonCodes = [...expectedReasonCodes].sort();

    if (
      foundReasonCodes.length !== sortedExpectedReasonCodes.length ||
      foundReasonCodes.join(",") !== sortedExpectedReasonCodes.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes must match the canonical reason codes`,
        {
          field: `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
          expectedReasonCodes: sortedExpectedReasonCodes,
          foundReasonCodes,
        },
      );
    }
  }

  return input;
}

function validateExportPackageBundleManifestStopMatrixAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_STOP_MATRIX_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageBundleManifestStopMatrixAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageBundleManifestStopMatrixAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageBundleManifestStopMatrixAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageBundleManifestStopMatrixAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageBundleManifestStopMatrixAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [
        exportPackageBundleManifestStopMatrixAlignmentReasonCodeByProfile[
          jurisdictionProfileKey
        ],
      ],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateStopMatrixEntryForAlignment(
      alignmentEntry.stop_matrix_entry,
      errorCode,
      `${alignmentField}.stop_matrix_entry`,
      exportPackageBundleManifestStopMatrixAlignmentConditionKey,
      "export_package_bundle_manifest",
    );
  }

  return input;
}

function validateExportPackageJsonArtifactStopOutcomeAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_STOP_OUTCOME_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageJsonArtifactStopOutcomeAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageJsonArtifactStopOutcomeAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];
    const expectedReasonCodes =
      exportPackageJsonArtifactStopOutcomeAlignmentReasonCodesByProfile[
        jurisdictionProfileKey
      ];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageJsonArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackageJsonArtifactStopOutcomeAlignmentArtifactTypeValue],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageJsonArtifactStopOutcomeAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageJsonArtifactStopOutcomeAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStopOutcomeModel(alignmentEntry.canonical_stop_outcome, errorCode);

    if (
      alignmentEntry.canonical_stop_outcome.stop_outcome !==
      alignmentEntry.source_export_package_profile_dossier_release_gate
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.canonical_stop_outcome must match source_export_package_profile_dossier_release_gate`,
        {
          field: `${alignmentField}.canonical_stop_outcome`,
          expectedStopOutcome:
            alignmentEntry.source_export_package_profile_dossier_release_gate,
          foundStopOutcome: alignmentEntry.canonical_stop_outcome.stop_outcome,
        },
      );
    }

    validateStringEnumArray(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
      expectedReasonCodes,
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
      errorCode,
    );

    const foundReasonCodes = [
      ...alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
    ].sort();
    const sortedExpectedReasonCodes = [...expectedReasonCodes].sort();

    if (
      foundReasonCodes.length !== sortedExpectedReasonCodes.length ||
      foundReasonCodes.join(",") !== sortedExpectedReasonCodes.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes must match the canonical reason codes`,
        {
          field: `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
          expectedReasonCodes: sortedExpectedReasonCodes,
          foundReasonCodes,
        },
      );
    }
  }

  return input;
}

function validateExportPackageMarkdownArtifactStopOutcomeAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_STOP_OUTCOME_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageMarkdownArtifactStopOutcomeAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageMarkdownArtifactStopOutcomeAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];
    const expectedReasonCodes =
      exportPackageMarkdownArtifactStopOutcomeAlignmentReasonCodesByProfile[
        jurisdictionProfileKey
      ];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageMarkdownArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackageMarkdownArtifactStopOutcomeAlignmentArtifactTypeValue],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageMarkdownArtifactStopOutcomeAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageMarkdownArtifactStopOutcomeAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStopOutcomeModel(alignmentEntry.canonical_stop_outcome, errorCode);

    if (
      alignmentEntry.canonical_stop_outcome.stop_outcome !==
      alignmentEntry.source_export_package_profile_dossier_release_gate
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.canonical_stop_outcome must match source_export_package_profile_dossier_release_gate`,
        {
          field: `${alignmentField}.canonical_stop_outcome`,
          expectedStopOutcome:
            alignmentEntry.source_export_package_profile_dossier_release_gate,
          foundStopOutcome: alignmentEntry.canonical_stop_outcome.stop_outcome,
        },
      );
    }

    validateStringEnumArray(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
      expectedReasonCodes,
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
      errorCode,
    );

    const foundReasonCodes = [
      ...alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
    ].sort();
    const sortedExpectedReasonCodes = [...expectedReasonCodes].sort();

    if (
      foundReasonCodes.length !== sortedExpectedReasonCodes.length ||
      foundReasonCodes.join(",") !== sortedExpectedReasonCodes.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes must match the canonical reason codes`,
        {
          field: `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
          expectedReasonCodes: sortedExpectedReasonCodes,
          foundReasonCodes,
        },
      );
    }
  }

  return input;
}

function validateExportPackagePdfArtifactStopOutcomeAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_STOP_OUTCOME_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackagePdfArtifactStopOutcomeAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackagePdfArtifactStopOutcomeAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];
    const expectedReasonCodes =
      exportPackagePdfArtifactStopOutcomeAlignmentReasonCodesByProfile[
        jurisdictionProfileKey
      ];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackagePdfArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackagePdfArtifactStopOutcomeAlignmentArtifactTypeValue],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackagePdfArtifactStopOutcomeAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackagePdfArtifactStopOutcomeAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStopOutcomeModel(alignmentEntry.canonical_stop_outcome, errorCode);

    if (
      alignmentEntry.canonical_stop_outcome.stop_outcome !==
      alignmentEntry.source_export_package_profile_dossier_release_gate
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.canonical_stop_outcome must match source_export_package_profile_dossier_release_gate`,
        {
          field: `${alignmentField}.canonical_stop_outcome`,
          expectedStopOutcome:
            alignmentEntry.source_export_package_profile_dossier_release_gate,
          foundStopOutcome: alignmentEntry.canonical_stop_outcome.stop_outcome,
        },
      );
    }

    validateStringEnumArray(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
      expectedReasonCodes,
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
      errorCode,
    );

    const foundReasonCodes = [
      ...alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
    ].sort();
    const sortedExpectedReasonCodes = [...expectedReasonCodes].sort();

    if (
      foundReasonCodes.length !== sortedExpectedReasonCodes.length ||
      foundReasonCodes.join(",") !== sortedExpectedReasonCodes.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes must match the canonical reason codes`,
        {
          field: `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
          expectedReasonCodes: sortedExpectedReasonCodes,
          foundReasonCodes,
        },
      );
    }
  }

  return input;
}

function validateExportPackageDocxArtifactStopOutcomeAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_STOP_OUTCOME_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageDocxArtifactStopOutcomeAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageDocxArtifactStopOutcomeAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];
    const expectedReasonCodes =
      exportPackageDocxArtifactStopOutcomeAlignmentReasonCodesByProfile[
        jurisdictionProfileKey
      ];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageDocxArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackageDocxArtifactStopOutcomeAlignmentArtifactTypeValue],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageDocxArtifactStopOutcomeAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageDocxArtifactStopOutcomeAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStopOutcomeModel(alignmentEntry.canonical_stop_outcome, errorCode);

    if (
      alignmentEntry.canonical_stop_outcome.stop_outcome !==
      alignmentEntry.source_export_package_profile_dossier_release_gate
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.canonical_stop_outcome must match source_export_package_profile_dossier_release_gate`,
        {
          field: `${alignmentField}.canonical_stop_outcome`,
          expectedStopOutcome:
            alignmentEntry.source_export_package_profile_dossier_release_gate,
          foundStopOutcome: alignmentEntry.canonical_stop_outcome.stop_outcome,
        },
      );
    }

    validateStringEnumArray(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
      expectedReasonCodes,
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
      errorCode,
    );

    const foundReasonCodes = [
      ...alignmentEntry.source_export_package_profile_dossier_release_gate_reason_codes,
    ].sort();
    const sortedExpectedReasonCodes = [...expectedReasonCodes].sort();

    if (
      foundReasonCodes.length !== sortedExpectedReasonCodes.length ||
      foundReasonCodes.join(",") !== sortedExpectedReasonCodes.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes must match the canonical reason codes`,
        {
          field: `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_codes`,
          expectedReasonCodes: sortedExpectedReasonCodes,
          foundReasonCodes,
        },
      );
    }
  }

  return input;
}

function validateExportPackageDocxArtifactStopMatrixAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_STOP_MATRIX_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageDocxArtifactStopMatrixAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageDocxArtifactStopMatrixAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageDocxArtifactStopMatrixAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackageDocxArtifactStopMatrixAlignmentArtifactTypeValue],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageDocxArtifactStopMatrixAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageDocxArtifactStopMatrixAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [
        exportPackageDocxArtifactStopMatrixAlignmentReasonCodeByProfile[
          jurisdictionProfileKey
        ],
      ],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateStopMatrixEntryForAlignment(
      alignmentEntry.stop_matrix_entry,
      errorCode,
      `${alignmentField}.stop_matrix_entry`,
      exportPackageDocxArtifactStopMatrixAlignmentConditionKey,
      "export_package_docx_artifact",
    );
  }

  return input;
}

function validateExportPackageDocxArtifactTraceabilityCase(
  traceability,
  expectedTraceability,
  errorCode,
  traceabilityField,
  caseKey,
) {
  assertPlainObject(traceability, errorCode, traceabilityField);
  assertExactKeys(
    traceability,
    exportPackageDocxArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase[
      caseKey
    ],
    errorCode,
    traceabilityField,
  );
  validateTraceabilityModel(traceability, errorCode);

  for (const arrayField of Object.keys(expectedTraceability)) {
    const expectedValues = [...expectedTraceability[arrayField]].sort();
    const foundValues = [...traceability[arrayField]].sort();

    if (
      foundValues.length !== expectedValues.length ||
      foundValues.join(",") !== expectedValues.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${traceabilityField}.${arrayField} must match the canonical traceability references`,
        {
          field: `${traceabilityField}.${arrayField}`,
          expectedValues,
          foundValues,
        },
      );
    }
  }
}

function validateExportPackageDocxArtifactTraceabilityAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_TRACEABILITY_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageDocxArtifactTraceabilityAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const caseKey of exportPackageDocxArtifactTraceabilityAlignmentRequiredKeys) {
    const alignmentField = `input.${caseKey}`;
    const alignmentEntry = input[caseKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageDocxArtifactTraceabilityAlignmentEntryRequiredKeysByCase[
        caseKey
      ],
      errorCode,
      alignmentField,
    );
    validateStringEnum(
      alignmentEntry.jurisdiction_profile_key,
      [
        exportPackageDocxArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase[
          caseKey
        ],
      ],
      `${alignmentField}.jurisdiction_profile_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackageDocxArtifactTraceabilityAlignmentArtifactTypeByCase[caseKey]],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageDocxArtifactTraceabilityAlignmentReleaseGateByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageDocxArtifactTraceabilityAlignmentFreshnessByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [exportPackageDocxArtifactTraceabilityAlignmentReasonCodeByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateExportPackageDocxArtifactTraceabilityCase(
      alignmentEntry.traceability,
      exportPackageDocxArtifactTraceabilityAlignmentCanonicalTraceabilityByCase[
        caseKey
      ],
      errorCode,
      `${alignmentField}.traceability`,
      caseKey,
    );
  }

  return input;
}

function validateExportPackagePdfArtifactStopMatrixAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_STOP_MATRIX_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackagePdfArtifactStopMatrixAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackagePdfArtifactStopMatrixAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackagePdfArtifactStopMatrixAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackagePdfArtifactStopMatrixAlignmentArtifactTypeValue],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackagePdfArtifactStopMatrixAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackagePdfArtifactStopMatrixAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [
        exportPackagePdfArtifactStopMatrixAlignmentReasonCodeByProfile[
          jurisdictionProfileKey
        ],
      ],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateStopMatrixEntryForAlignment(
      alignmentEntry.stop_matrix_entry,
      errorCode,
      `${alignmentField}.stop_matrix_entry`,
      exportPackagePdfArtifactStopMatrixAlignmentConditionKey,
      "export_package_pdf_artifact",
    );
  }

  return input;
}

function validateExportPackagePdfArtifactTraceabilityCase(
  traceability,
  expectedTraceability,
  errorCode,
  traceabilityField,
  caseKey,
) {
  assertPlainObject(traceability, errorCode, traceabilityField);
  assertExactKeys(
    traceability,
    exportPackagePdfArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase[
      caseKey
    ],
    errorCode,
    traceabilityField,
  );
  validateTraceabilityModel(traceability, errorCode);

  for (const arrayField of Object.keys(expectedTraceability)) {
    const expectedValues = [...expectedTraceability[arrayField]].sort();
    const foundValues = [...traceability[arrayField]].sort();

    if (
      foundValues.length !== expectedValues.length ||
      foundValues.join(",") !== expectedValues.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${traceabilityField}.${arrayField} must match the canonical traceability references`,
        {
          field: `${traceabilityField}.${arrayField}`,
          expectedValues,
          foundValues,
        },
      );
    }
  }
}

function validateExportPackageMarkdownArtifactStopMatrixAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_STOP_MATRIX_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageMarkdownArtifactStopMatrixAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageMarkdownArtifactStopMatrixAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageMarkdownArtifactStopMatrixAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackageMarkdownArtifactStopMatrixAlignmentArtifactTypeValue],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageMarkdownArtifactStopMatrixAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageMarkdownArtifactStopMatrixAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [
        exportPackageMarkdownArtifactStopMatrixAlignmentReasonCodeByProfile[
          jurisdictionProfileKey
        ],
      ],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateStopMatrixEntryForAlignment(
      alignmentEntry.stop_matrix_entry,
      errorCode,
      `${alignmentField}.stop_matrix_entry`,
      exportPackageMarkdownArtifactStopMatrixAlignmentConditionKey,
      "export_package_markdown_artifact",
    );
  }

  return input;
}

function validateExportPackageJsonArtifactStopMatrixAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_STOP_MATRIX_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageJsonArtifactStopMatrixAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageJsonArtifactStopMatrixAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageJsonArtifactStopMatrixAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackageJsonArtifactStopMatrixAlignmentArtifactTypeValue],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageJsonArtifactStopMatrixAlignmentReleaseGateValue],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageJsonArtifactStopMatrixAlignmentFreshnessValue],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [
        exportPackageJsonArtifactStopMatrixAlignmentReasonCodeByProfile[
          jurisdictionProfileKey
        ],
      ],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateStopMatrixEntryForAlignment(
      alignmentEntry.stop_matrix_entry,
      errorCode,
      `${alignmentField}.stop_matrix_entry`,
      exportPackageJsonArtifactStopMatrixAlignmentConditionKey,
      "export_package_json_artifact",
    );
  }

  return input;
}

function validateExportPackageStopMatrixAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_STOP_MATRIX_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageStopMatrixAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of exportPackageStopMatrixAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageStopMatrixAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.profile_dossier_release_gate,
      [exportPackageStopMatrixAlignmentReleaseGateValue],
      `${alignmentField}.profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.profile_dossier_release_eval_freshness,
      [exportPackageStopMatrixAlignmentFreshnessValue],
      `${alignmentField}.profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.profile_dossier_release_gate_reason_code,
      [exportPackageStopMatrixAlignmentReasonCodeByProfile[jurisdictionProfileKey]],
      `${alignmentField}.profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateStopMatrixEntryForAlignment(
      alignmentEntry.stop_matrix_entry,
      errorCode,
      `${alignmentField}.stop_matrix_entry`,
      exportPackageStopMatrixAlignmentConditionKey,
      "export_package",
    );
  }

  return input;
}

function validateStopMatrixEntryForAlignment(
  entry,
  errorCode,
  entryField,
  expectedConditionKey,
  surfaceLabel,
) {
  assertPlainObject(entry, errorCode, entryField);
  assertExactKeys(entry, stopMatrixModelEntryRequiredKeys, errorCode, entryField);

  validateStringEnum(
    entry.condition_key,
    stopMatrixModelConditionValues,
    `${entryField}.condition_key`,
    errorCode,
  );

  if (entry.condition_key !== expectedConditionKey) {
    throw createSchemaValidationError(
      errorCode,
      `${entryField}.condition_key must match the documented ${surfaceLabel} stop-matrix case`,
      {
        field: `${entryField}.condition_key`,
        expectedConditionKey,
        foundConditionKey: entry.condition_key,
      },
    );
  }

  if (!Array.isArray(entry.canonical_stop_outcomes)) {
    throw createSchemaValidationError(
      errorCode,
      `${entryField}.canonical_stop_outcomes must be an array`,
      {
        field: `${entryField}.canonical_stop_outcomes`,
      },
    );
  }

  const expectedOutcomes =
    stopMatrixCanonicalOutcomeValuesByCondition[entry.condition_key];
  const foundOutcomes = [];

  entry.canonical_stop_outcomes.forEach((outcome, outcomeIndex) => {
    validateStopOutcomeModel(outcome, errorCode);
    const outcomeValue = outcome.stop_outcome;

    if (foundOutcomes.includes(outcomeValue)) {
      throw createSchemaValidationError(
        errorCode,
        `${entryField}.canonical_stop_outcomes must not contain duplicates`,
        {
          field: `${entryField}.canonical_stop_outcomes`,
          duplicateStopOutcome: outcomeValue,
          outcomeIndex,
        },
      );
    }

    foundOutcomes.push(outcomeValue);
  });

  if (
    foundOutcomes.length !== expectedOutcomes.length ||
    [...foundOutcomes].sort().join(",") !== [...expectedOutcomes].sort().join(",")
  ) {
    throw createSchemaValidationError(
      errorCode,
      `${entryField}.canonical_stop_outcomes must match the canonical stop outcomes`,
      {
        field: `${entryField}.canonical_stop_outcomes`,
        expectedStopOutcomes: [...expectedOutcomes].sort(),
        foundStopOutcomes: [...foundOutcomes].sort(),
      },
    );
  }
}

function validateReleaseEvalStopMatrixAlignment(
  input,
  errorCode = "ERR_RELEASE_EVAL_STOP_MATRIX_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    releaseEvalStopMatrixAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of releaseEvalStopMatrixAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      releaseEvalStopMatrixAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.release_gate,
      [releaseEvalStopMatrixAlignmentReleaseGateValue],
      `${alignmentField}.release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_eval_freshness,
      [releaseEvalStopMatrixAlignmentFreshnessValue],
      `${alignmentField}.release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_gate_reason_code,
      [releaseEvalStopMatrixAlignmentReasonCodeByProfile[jurisdictionProfileKey]],
      `${alignmentField}.release_gate_reason_code`,
      errorCode,
    );
    validateStopMatrixEntryForAlignment(
      alignmentEntry.stop_matrix_entry,
      errorCode,
      `${alignmentField}.stop_matrix_entry`,
      releaseEvalStopMatrixAlignmentConditionKey,
      "release_eval",
    );
  }

  return input;
}

function validateProfileDossierStopMatrixAlignment(
  input,
  errorCode = "ERR_PROFILE_DOSSIER_STOP_MATRIX_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    profileDossierStopMatrixAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const jurisdictionProfileKey of profileDossierStopMatrixAlignmentRequiredKeys) {
    const alignmentField = `input.${jurisdictionProfileKey}`;
    const alignmentEntry = input[jurisdictionProfileKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      profileDossierStopMatrixAlignmentProfileRequiredKeysByProfile[
        jurisdictionProfileKey
      ],
      errorCode,
      alignmentField,
    );

    validateStringEnum(
      alignmentEntry.release_gate,
      [profileDossierStopMatrixAlignmentReleaseGateValue],
      `${alignmentField}.release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_eval_freshness,
      [profileDossierStopMatrixAlignmentFreshnessValue],
      `${alignmentField}.release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_gate_reason_code,
      [profileDossierStopMatrixAlignmentReasonCodeByProfile[jurisdictionProfileKey]],
      `${alignmentField}.release_gate_reason_code`,
      errorCode,
    );
    validateStopMatrixEntryForAlignment(
      alignmentEntry.stop_matrix_entry,
      errorCode,
      `${alignmentField}.stop_matrix_entry`,
      profileDossierStopMatrixAlignmentConditionKey,
      "profile_dossier",
    );
  }

  return input;
}

function validateReleaseEvalTraceabilityCase(
  traceability,
  expectedTraceability,
  errorCode,
  traceabilityField,
  caseKey,
) {
  assertPlainObject(traceability, errorCode, traceabilityField);
  assertExactKeys(
    traceability,
    releaseEvalTraceabilityAlignmentTraceabilityRequiredKeysByCase[caseKey],
    errorCode,
    traceabilityField,
  );
  validateTraceabilityModel(traceability, errorCode);

  for (const arrayField of Object.keys(expectedTraceability)) {
    const expectedValues = [...expectedTraceability[arrayField]].sort();
    const foundValues = [...traceability[arrayField]].sort();

    if (
      foundValues.length !== expectedValues.length ||
      foundValues.join(",") !== expectedValues.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${traceabilityField}.${arrayField} must match the canonical traceability references`,
        {
          field: `${traceabilityField}.${arrayField}`,
          expectedValues,
          foundValues,
        },
      );
    }
  }
}

function validateExportPackageTraceabilityCase(
  traceability,
  expectedTraceability,
  errorCode,
  traceabilityField,
  caseKey,
) {
  assertPlainObject(traceability, errorCode, traceabilityField);
  assertExactKeys(
    traceability,
    exportPackageTraceabilityAlignmentTraceabilityRequiredKeysByCase[caseKey],
    errorCode,
    traceabilityField,
  );
  validateTraceabilityModel(traceability, errorCode);

  for (const arrayField of Object.keys(expectedTraceability)) {
    const expectedValues = [...expectedTraceability[arrayField]].sort();
    const foundValues = [...traceability[arrayField]].sort();

    if (
      foundValues.length !== expectedValues.length ||
      foundValues.join(",") !== expectedValues.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${traceabilityField}.${arrayField} must match the canonical traceability references`,
        {
          field: `${traceabilityField}.${arrayField}`,
          expectedValues,
          foundValues,
        },
      );
    }
  }
}

function validateExportPackageBundleArchiveArtifactTraceabilityCase(
  traceability,
  expectedTraceability,
  errorCode,
  traceabilityField,
  caseKey,
) {
  assertPlainObject(traceability, errorCode, traceabilityField);
  assertExactKeys(
    traceability,
    exportPackageBundleArchiveArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase[
      caseKey
    ],
    errorCode,
    traceabilityField,
  );
  validateTraceabilityModel(traceability, errorCode);

  for (const arrayField of Object.keys(expectedTraceability)) {
    const expectedValues = [...expectedTraceability[arrayField]].sort();
    const foundValues = [...traceability[arrayField]].sort();

    if (
      foundValues.length !== expectedValues.length ||
      foundValues.join(",") !== expectedValues.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${traceabilityField}.${arrayField} must match the canonical traceability references`,
        {
          field: `${traceabilityField}.${arrayField}`,
          expectedValues,
          foundValues,
        },
      );
    }
  }
}

function validateExportPackageBundleManifestTraceabilityCase(
  traceability,
  expectedTraceability,
  errorCode,
  traceabilityField,
  caseKey,
) {
  assertPlainObject(traceability, errorCode, traceabilityField);
  assertExactKeys(
    traceability,
    exportPackageBundleManifestTraceabilityAlignmentTraceabilityRequiredKeysByCase[
      caseKey
    ],
    errorCode,
    traceabilityField,
  );
  validateTraceabilityModel(traceability, errorCode);

  for (const arrayField of Object.keys(expectedTraceability)) {
    const expectedValues = [...expectedTraceability[arrayField]].sort();
    const foundValues = [...traceability[arrayField]].sort();

    if (
      foundValues.length !== expectedValues.length ||
      foundValues.join(",") !== expectedValues.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${traceabilityField}.${arrayField} must match the canonical traceability references`,
        {
          field: `${traceabilityField}.${arrayField}`,
          expectedValues,
          foundValues,
        },
      );
    }
  }
}

function validateExportPackageJsonArtifactTraceabilityCase(
  traceability,
  expectedTraceability,
  errorCode,
  traceabilityField,
  caseKey,
) {
  assertPlainObject(traceability, errorCode, traceabilityField);
  assertExactKeys(
    traceability,
    exportPackageJsonArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase[
      caseKey
    ],
    errorCode,
    traceabilityField,
  );
  validateTraceabilityModel(traceability, errorCode);

  for (const arrayField of Object.keys(expectedTraceability)) {
    const expectedValues = [...expectedTraceability[arrayField]].sort();
    const foundValues = [...traceability[arrayField]].sort();

    if (
      foundValues.length !== expectedValues.length ||
      foundValues.join(",") !== expectedValues.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${traceabilityField}.${arrayField} must match the canonical traceability references`,
        {
          field: `${traceabilityField}.${arrayField}`,
          expectedValues,
          foundValues,
        },
      );
    }
  }
}

function validateExportPackageMarkdownArtifactTraceabilityCase(
  traceability,
  expectedTraceability,
  errorCode,
  traceabilityField,
  caseKey,
) {
  assertPlainObject(traceability, errorCode, traceabilityField);
  assertExactKeys(
    traceability,
    exportPackageMarkdownArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase[
      caseKey
    ],
    errorCode,
    traceabilityField,
  );
  validateTraceabilityModel(traceability, errorCode);

  for (const arrayField of Object.keys(expectedTraceability)) {
    const expectedValues = [...expectedTraceability[arrayField]].sort();
    const foundValues = [...traceability[arrayField]].sort();

    if (
      foundValues.length !== expectedValues.length ||
      foundValues.join(",") !== expectedValues.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${traceabilityField}.${arrayField} must match the canonical traceability references`,
        {
          field: `${traceabilityField}.${arrayField}`,
          expectedValues,
          foundValues,
        },
      );
    }
  }
}

function validateExportPackageJsonArtifactTraceabilityAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_TRACEABILITY_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageJsonArtifactTraceabilityAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const caseKey of exportPackageJsonArtifactTraceabilityAlignmentRequiredKeys) {
    const alignmentField = `input.${caseKey}`;
    const alignmentEntry = input[caseKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageJsonArtifactTraceabilityAlignmentEntryRequiredKeysByCase[
        caseKey
      ],
      errorCode,
      alignmentField,
    );
    validateStringEnum(
      alignmentEntry.jurisdiction_profile_key,
      [
        exportPackageJsonArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase[
          caseKey
        ],
      ],
      `${alignmentField}.jurisdiction_profile_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackageJsonArtifactTraceabilityAlignmentArtifactTypeByCase[caseKey]],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageJsonArtifactTraceabilityAlignmentReleaseGateByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageJsonArtifactTraceabilityAlignmentFreshnessByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [exportPackageJsonArtifactTraceabilityAlignmentReasonCodeByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateExportPackageJsonArtifactTraceabilityCase(
      alignmentEntry.traceability,
      exportPackageJsonArtifactTraceabilityAlignmentCanonicalTraceabilityByCase[
        caseKey
      ],
      errorCode,
      `${alignmentField}.traceability`,
      caseKey,
    );
  }

  return input;
}

function validateExportPackagePdfArtifactTraceabilityAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_TRACEABILITY_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackagePdfArtifactTraceabilityAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const caseKey of exportPackagePdfArtifactTraceabilityAlignmentRequiredKeys) {
    const alignmentField = `input.${caseKey}`;
    const alignmentEntry = input[caseKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackagePdfArtifactTraceabilityAlignmentEntryRequiredKeysByCase[
        caseKey
      ],
      errorCode,
      alignmentField,
    );
    validateStringEnum(
      alignmentEntry.jurisdiction_profile_key,
      [
        exportPackagePdfArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase[
          caseKey
        ],
      ],
      `${alignmentField}.jurisdiction_profile_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackagePdfArtifactTraceabilityAlignmentArtifactTypeByCase[caseKey]],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackagePdfArtifactTraceabilityAlignmentReleaseGateByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackagePdfArtifactTraceabilityAlignmentFreshnessByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [exportPackagePdfArtifactTraceabilityAlignmentReasonCodeByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateExportPackagePdfArtifactTraceabilityCase(
      alignmentEntry.traceability,
      exportPackagePdfArtifactTraceabilityAlignmentCanonicalTraceabilityByCase[
        caseKey
      ],
      errorCode,
      `${alignmentField}.traceability`,
      caseKey,
    );
  }

  return input;
}

function validateExportPackageMarkdownArtifactTraceabilityAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_TRACEABILITY_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageMarkdownArtifactTraceabilityAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const caseKey of exportPackageMarkdownArtifactTraceabilityAlignmentRequiredKeys) {
    const alignmentField = `input.${caseKey}`;
    const alignmentEntry = input[caseKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageMarkdownArtifactTraceabilityAlignmentEntryRequiredKeysByCase[
        caseKey
      ],
      errorCode,
      alignmentField,
    );
    validateStringEnum(
      alignmentEntry.jurisdiction_profile_key,
      [
        exportPackageMarkdownArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase[
          caseKey
        ],
      ],
      `${alignmentField}.jurisdiction_profile_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.artifact_type,
      [exportPackageMarkdownArtifactTraceabilityAlignmentArtifactTypeByCase[caseKey]],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageMarkdownArtifactTraceabilityAlignmentReleaseGateByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageMarkdownArtifactTraceabilityAlignmentFreshnessByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [exportPackageMarkdownArtifactTraceabilityAlignmentReasonCodeByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateExportPackageMarkdownArtifactTraceabilityCase(
      alignmentEntry.traceability,
      exportPackageMarkdownArtifactTraceabilityAlignmentCanonicalTraceabilityByCase[
        caseKey
      ],
      errorCode,
      `${alignmentField}.traceability`,
      caseKey,
    );
  }

  return input;
}

function validateExportPackageTraceabilityAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_TRACEABILITY_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageTraceabilityAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const caseKey of exportPackageTraceabilityAlignmentRequiredKeys) {
    const alignmentField = `input.${caseKey}`;
    const alignmentEntry = input[caseKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageTraceabilityAlignmentEntryRequiredKeysByCase[caseKey],
      errorCode,
      alignmentField,
    );
    validateStringEnum(
      alignmentEntry.jurisdiction_profile_key,
      [exportPackageTraceabilityAlignmentJurisdictionProfileKeyByCase[caseKey]],
      `${alignmentField}.jurisdiction_profile_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.profile_dossier_release_gate,
      [exportPackageTraceabilityAlignmentReleaseGateByCase[caseKey]],
      `${alignmentField}.profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.profile_dossier_release_eval_freshness,
      [exportPackageTraceabilityAlignmentFreshnessByCase[caseKey]],
      `${alignmentField}.profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.profile_dossier_release_gate_reason_code,
      [exportPackageTraceabilityAlignmentReasonCodeByCase[caseKey]],
      `${alignmentField}.profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateExportPackageTraceabilityCase(
      alignmentEntry.traceability,
      exportPackageTraceabilityAlignmentCanonicalTraceabilityByCase[caseKey],
      errorCode,
      `${alignmentField}.traceability`,
      caseKey,
    );
  }

  return input;
}

function validateExportPackageBundleArchiveArtifactTraceabilityAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_TRACEABILITY_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageBundleArchiveArtifactTraceabilityAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const caseKey of exportPackageBundleArchiveArtifactTraceabilityAlignmentRequiredKeys) {
    const alignmentField = `input.${caseKey}`;
    const alignmentEntry = input[caseKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageBundleArchiveArtifactTraceabilityAlignmentEntryRequiredKeysByCase[
        caseKey
      ],
      errorCode,
      alignmentField,
    );
    validateStringEnum(
      alignmentEntry.jurisdiction_profile_key,
      [
        exportPackageBundleArchiveArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase[
          caseKey
        ],
      ],
      `${alignmentField}.jurisdiction_profile_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.artifact_type,
      [
        exportPackageBundleArchiveArtifactTraceabilityAlignmentArtifactTypeByCase[
          caseKey
        ],
      ],
      `${alignmentField}.artifact_type`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageBundleArchiveArtifactTraceabilityAlignmentReleaseGateByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageBundleArchiveArtifactTraceabilityAlignmentFreshnessByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [exportPackageBundleArchiveArtifactTraceabilityAlignmentReasonCodeByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateExportPackageBundleArchiveArtifactTraceabilityCase(
      alignmentEntry.traceability,
      exportPackageBundleArchiveArtifactTraceabilityAlignmentCanonicalTraceabilityByCase[
        caseKey
      ],
      errorCode,
      `${alignmentField}.traceability`,
      caseKey,
    );
  }

  return input;
}

function validateExportPackageBundleManifestTraceabilityAlignment(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_TRACEABILITY_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageBundleManifestTraceabilityAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const caseKey of exportPackageBundleManifestTraceabilityAlignmentRequiredKeys) {
    const alignmentField = `input.${caseKey}`;
    const alignmentEntry = input[caseKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      exportPackageBundleManifestTraceabilityAlignmentEntryRequiredKeysByCase[
        caseKey
      ],
      errorCode,
      alignmentField,
    );
    validateStringEnum(
      alignmentEntry.jurisdiction_profile_key,
      [
        exportPackageBundleManifestTraceabilityAlignmentJurisdictionProfileKeyByCase[
          caseKey
        ],
      ],
      `${alignmentField}.jurisdiction_profile_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate,
      [exportPackageBundleManifestTraceabilityAlignmentReleaseGateByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_eval_freshness,
      [exportPackageBundleManifestTraceabilityAlignmentFreshnessByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.source_export_package_profile_dossier_release_gate_reason_code,
      [exportPackageBundleManifestTraceabilityAlignmentReasonCodeByCase[caseKey]],
      `${alignmentField}.source_export_package_profile_dossier_release_gate_reason_code`,
      errorCode,
    );
    validateExportPackageBundleManifestTraceabilityCase(
      alignmentEntry.traceability,
      exportPackageBundleManifestTraceabilityAlignmentCanonicalTraceabilityByCase[
        caseKey
      ],
      errorCode,
      `${alignmentField}.traceability`,
      caseKey,
    );
  }

  return input;
}

function validateReleaseEvalTraceabilityAlignment(
  input,
  errorCode = "ERR_RELEASE_EVAL_TRACEABILITY_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    releaseEvalTraceabilityAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const caseKey of releaseEvalTraceabilityAlignmentRequiredKeys) {
    const alignmentField = `input.${caseKey}`;
    const alignmentEntry = input[caseKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      releaseEvalTraceabilityAlignmentEntryRequiredKeysByCase[caseKey],
      errorCode,
      alignmentField,
    );
    validateStringEnum(
      alignmentEntry.jurisdiction_profile_key,
      [releaseEvalTraceabilityAlignmentJurisdictionProfileKeyByCase[caseKey]],
      `${alignmentField}.jurisdiction_profile_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_gate,
      [releaseEvalTraceabilityAlignmentReleaseGateByCase[caseKey]],
      `${alignmentField}.release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_eval_freshness,
      [releaseEvalTraceabilityAlignmentFreshnessByCase[caseKey]],
      `${alignmentField}.release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_gate_reason_code,
      [releaseEvalTraceabilityAlignmentReasonCodeByCase[caseKey]],
      `${alignmentField}.release_gate_reason_code`,
      errorCode,
    );
    validateReleaseEvalTraceabilityCase(
      alignmentEntry.traceability,
      releaseEvalTraceabilityAlignmentCanonicalTraceabilityByCase[caseKey],
      errorCode,
      `${alignmentField}.traceability`,
      caseKey,
    );
  }

  return input;
}

function validateProfileDossierTraceabilityCase(
  traceability,
  expectedTraceability,
  errorCode,
  traceabilityField,
  caseKey,
) {
  assertPlainObject(traceability, errorCode, traceabilityField);
  assertExactKeys(
    traceability,
    profileDossierTraceabilityAlignmentTraceabilityRequiredKeysByCase[caseKey],
    errorCode,
    traceabilityField,
  );
  validateTraceabilityModel(traceability, errorCode);

  for (const arrayField of Object.keys(expectedTraceability)) {
    const expectedValues = [...expectedTraceability[arrayField]].sort();
    const foundValues = [...traceability[arrayField]].sort();

    if (
      foundValues.length !== expectedValues.length ||
      foundValues.join(",") !== expectedValues.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${traceabilityField}.${arrayField} must match the canonical traceability references`,
        {
          field: `${traceabilityField}.${arrayField}`,
          expectedValues,
          foundValues,
        },
      );
    }
  }
}

function validateProfileDossierTraceabilityAlignment(
  input,
  errorCode = "ERR_PROFILE_DOSSIER_TRACEABILITY_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    profileDossierTraceabilityAlignmentRequiredKeys,
    errorCode,
    "input",
  );

  for (const caseKey of profileDossierTraceabilityAlignmentRequiredKeys) {
    const alignmentField = `input.${caseKey}`;
    const alignmentEntry = input[caseKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      profileDossierTraceabilityAlignmentEntryRequiredKeysByCase[caseKey],
      errorCode,
      alignmentField,
    );
    validateStringEnum(
      alignmentEntry.jurisdiction_profile_key,
      [profileDossierTraceabilityAlignmentJurisdictionProfileKeyByCase[caseKey]],
      `${alignmentField}.jurisdiction_profile_key`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_gate,
      [profileDossierTraceabilityAlignmentReleaseGateByCase[caseKey]],
      `${alignmentField}.release_gate`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_eval_freshness,
      [profileDossierTraceabilityAlignmentFreshnessByCase[caseKey]],
      `${alignmentField}.release_eval_freshness`,
      errorCode,
    );
    validateStringEnum(
      alignmentEntry.release_gate_reason_code,
      [profileDossierTraceabilityAlignmentReasonCodeByCase[caseKey]],
      `${alignmentField}.release_gate_reason_code`,
      errorCode,
    );
    validateProfileDossierTraceabilityCase(
      alignmentEntry.traceability,
      profileDossierTraceabilityAlignmentCanonicalTraceabilityByCase[caseKey],
      errorCode,
      `${alignmentField}.traceability`,
      caseKey,
    );
  }

  return input;
}

function validateSnapshotStatusTraceabilityCase(
  traceability,
  expectedTraceability,
  errorCode,
  traceabilityField,
  caseKey,
) {
  assertPlainObject(traceability, errorCode, traceabilityField);
  assertExactKeys(
    traceability,
    snapshotStatusTraceabilityAlignmentTraceabilityRequiredKeysByCase[caseKey],
    errorCode,
    traceabilityField,
  );
  validateTraceabilityModel(traceability, errorCode);

  for (const arrayField of Object.keys(expectedTraceability)) {
    const expectedValues = [...expectedTraceability[arrayField]].sort();
    const foundValues = [...traceability[arrayField]].sort();

    if (
      foundValues.length !== expectedValues.length ||
      foundValues.join(",") !== expectedValues.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${traceabilityField}.${arrayField} must match the canonical traceability references`,
        {
          field: `${traceabilityField}.${arrayField}`,
          expectedValues,
          foundValues,
        },
      );
    }
  }
}

function validateSnapshotStatusTraceabilityAlignment(
  input,
  errorCode = "ERR_SNAPSHOT_STATUS_TRACEABILITY_ALIGNMENT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    snapshotStatusTraceabilityAlignmentRequiredKeys,
    errorCode,
    "input",
  );
  validateStringEnum(
    input.alignment_scope,
    [snapshotStatusTraceabilityAlignmentScopeValue],
    "input.alignment_scope",
    errorCode,
  );
  validateStringEnumArray(
    input.supported_snapshot_status_sources,
    snapshotStatusTraceabilityAlignmentSupportedSourceValues,
    "input.supported_snapshot_status_sources",
    errorCode,
  );
  validateStringEnumArray(
    input.unaligned_snapshot_status_sources,
    snapshotStatusTraceabilityAlignmentUnalignedSourceValues,
    "input.unaligned_snapshot_status_sources",
    errorCode,
  );

  for (const [fieldName, expectedValues] of [
    [
      "supported_snapshot_status_sources",
      snapshotStatusTraceabilityAlignmentSupportedSourceValues,
    ],
    [
      "unaligned_snapshot_status_sources",
      snapshotStatusTraceabilityAlignmentUnalignedSourceValues,
    ],
  ]) {
    const foundValues = [...input[fieldName]].sort();
    const sortedExpectedValues = [...expectedValues].sort();

    if (
      foundValues.length !== sortedExpectedValues.length ||
      foundValues.join(",") !== sortedExpectedValues.join(",")
    ) {
      throw createSchemaValidationError(
        errorCode,
        `input.${fieldName} must match the canonical source values`,
        {
          field: `input.${fieldName}`,
          expectedValues: sortedExpectedValues,
          foundValues,
        },
      );
    }
  }

  for (const caseKey of snapshotStatusTraceabilityAlignmentCaseKeys) {
    const alignmentField = `input.${caseKey}`;
    const alignmentEntry = input[caseKey];

    assertPlainObject(alignmentEntry, errorCode, alignmentField);
    assertExactKeys(
      alignmentEntry,
      snapshotStatusTraceabilityAlignmentEntryRequiredKeysByCase[caseKey],
      errorCode,
      alignmentField,
    );
    validateStringEnum(
      alignmentEntry.snapshot_status_source,
      [snapshotStatusTraceabilityAlignmentSourceByCase[caseKey]],
      `${alignmentField}.snapshot_status_source`,
      errorCode,
    );

    if (
      alignmentEntry.snapshot_is_current !==
      snapshotStatusTraceabilityAlignmentIsCurrentByCase[caseKey]
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${alignmentField}.snapshot_is_current must match the canonical shared currentness value`,
        {
          field: `${alignmentField}.snapshot_is_current`,
          expectedValue: snapshotStatusTraceabilityAlignmentIsCurrentByCase[caseKey],
          foundValue: alignmentEntry.snapshot_is_current,
        },
      );
    }

    for (const [fieldName, expectedValues] of [
      [
        "persisted_snapshot_references",
        snapshotStatusTraceabilityAlignmentPersistedSnapshotReferencesByCase[caseKey],
      ],
      [
        "current_source_references",
        snapshotStatusTraceabilityAlignmentCurrentSourceReferencesByCase[caseKey],
      ],
      [
        "projection_references",
        snapshotStatusTraceabilityAlignmentProjectionReferencesByCase[caseKey],
      ],
    ]) {
      validateStringEnumArray(
        alignmentEntry[fieldName],
        expectedValues,
        `${alignmentField}.${fieldName}`,
        errorCode,
      );

      const foundValues = [...alignmentEntry[fieldName]].sort();
      const sortedExpectedValues = [...expectedValues].sort();

      if (
        foundValues.length !== sortedExpectedValues.length ||
        foundValues.join(",") !== sortedExpectedValues.join(",")
      ) {
        throw createSchemaValidationError(
          errorCode,
          `${alignmentField}.${fieldName} must match the canonical shared references`,
          {
            field: `${alignmentField}.${fieldName}`,
            expectedValues: sortedExpectedValues,
            foundValues,
          },
        );
      }
    }

    validateSnapshotStatusTraceabilityCase(
      alignmentEntry.traceability,
      snapshotStatusTraceabilityAlignmentCanonicalTraceabilityByCase[caseKey],
      errorCode,
      `${alignmentField}.traceability`,
      caseKey,
    );
  }

  return input;
}

function validateTraceabilityModel(
  input,
  errorCode = "ERR_TRACEABILITY_MODEL_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertAllowedKeys(input, traceabilityModelAllowedKeys, errorCode, "input");

  const missingRequiredKeys = traceabilityModelRequiredKeys.filter(
    (key) => !(key in input),
  );

  if (missingRequiredKeys.length > 0) {
    throw createSchemaValidationError(
      errorCode,
      "input is missing required keys",
      {
        field: "input",
        missingKeys: missingRequiredKeys.sort(),
      },
    );
  }

  validateNonEmptyUniqueStringArray(
    input.input_references,
    "input_references",
    errorCode,
  );
  validateNonEmptyUniqueStringArray(
    input.documented_rule_references,
    "documented_rule_references",
    errorCode,
  );
  validateNonEmptyUniqueStringArray(
    input.canonical_output_references,
    "canonical_output_references",
    errorCode,
  );

  if ("change_causes" in input) {
    validateStringEnumArray(
      input.change_causes,
      traceabilityModelChangeCauseValues,
      "change_causes",
      errorCode,
    );
  }

  return input;
}

function validateLaneKeyArray(value, field, code) {
  if (!Array.isArray(value)) {
    throw createSchemaValidationError(code, `${field} must be an array`, {
      field,
    });
  }

  const uniqueLaneKeys = new Set(value);
  if (uniqueLaneKeys.size !== value.length) {
    throw createSchemaValidationError(code, `${field} must not contain duplicates`, {
      field,
    });
  }

  for (const laneKey of value) {
    if (!laneKeys.includes(laneKey)) {
      throw createSchemaValidationError(code, `${field} contains an unknown lane`, {
        field,
        laneKey,
      });
    }
  }
}

function validateEvidenceObjectIds(value, field, code) {
  if (!Array.isArray(value)) {
    throw createSchemaValidationError(code, `${field} must be an array`, {
      field,
    });
  }

  const uniqueEvidenceObjectIds = new Set(value);
  if (uniqueEvidenceObjectIds.size !== value.length) {
    throw createSchemaValidationError(code, `${field} must not contain duplicates`, {
      field,
    });
  }

  for (const evidenceObjectId of value) {
    if (typeof evidenceObjectId !== "string" || evidenceObjectId.length === 0) {
      throw createSchemaValidationError(
        code,
        `${field} must contain non-empty strings`,
        { field },
      );
    }
  }
}

function validateExhibitRefs(value, field, code) {
  if (!Array.isArray(value)) {
    throw createSchemaValidationError(code, `${field} must be an array`, {
      field,
    });
  }

  const uniqueExhibitRefs = new Set(value);
  if (uniqueExhibitRefs.size !== value.length) {
    throw createSchemaValidationError(code, `${field} must not contain duplicates`, {
      field,
    });
  }

  for (const exhibitRef of value) {
    if (typeof exhibitRef !== "string" || !/^EX-[0-9]{3}$/.test(exhibitRef)) {
      throw createSchemaValidationError(
        code,
        `${field} must contain zero-padded exhibit refs`,
        { field },
      );
    }
  }
}

function validateReferenceRefs(value, field, code) {
  if (!Array.isArray(value)) {
    throw createSchemaValidationError(code, `${field} must be an array`, {
      field,
    });
  }

  const uniqueReferenceRefs = new Set(value);
  if (uniqueReferenceRefs.size !== value.length) {
    throw createSchemaValidationError(code, `${field} must not contain duplicates`, {
      field,
    });
  }

  for (const referenceRef of value) {
    if (typeof referenceRef !== "string" || !/^REF-[0-9]{3}$/.test(referenceRef)) {
      throw createSchemaValidationError(
        code,
        `${field} must contain zero-padded reference refs`,
        { field },
      );
    }
  }
}

function validateDossierIssueIndex(issueIndex, code) {
  if (!Array.isArray(issueIndex)) {
    throw createSchemaValidationError(code, "issue_index must be an array", {
      field: "issue_index",
    });
  }

  return issueIndex.map((entry, index) => {
    const field = `issue_index.${index}`;

    assertPlainObject(entry, code, field);
    assertExactKeys(entry, dossierIssueIndexEntryRequiredKeys, code, field);

    if (
      typeof entry.issue_ref !== "string" ||
      !/^ISS-[0-9]{3}$/.test(entry.issue_ref)
    ) {
      throw createSchemaValidationError(
        code,
        `${field}.issue_ref must match ISS-000 formatting`,
        { field: `${field}.issue_ref` },
      );
    }

    if (typeof entry.issue_code !== "string" || entry.issue_code.length === 0) {
      throw createSchemaValidationError(
        code,
        `${field}.issue_code must be a non-empty string`,
        { field: `${field}.issue_code` },
      );
    }

    if (typeof entry.blocking !== "boolean") {
      throw createSchemaValidationError(
        code,
        `${field}.blocking must be a boolean`,
        { field: `${field}.blocking` },
      );
    }

    validateLaneKeyArray(entry.related_lane_keys, `${field}.related_lane_keys`, code);

    validateReferenceRefs(
      entry.related_reference_refs,
      `${field}.related_reference_refs`,
      code,
    );

    if (!Array.isArray(entry.related_section_refs)) {
      throw createSchemaValidationError(
        code,
        `${field}.related_section_refs must be an array`,
        { field: `${field}.related_section_refs` },
      );
    }

    const uniqueSectionRefs = new Set(entry.related_section_refs);
    if (uniqueSectionRefs.size !== entry.related_section_refs.length) {
      throw createSchemaValidationError(
        code,
        `${field}.related_section_refs must not contain duplicates`,
        { field: `${field}.related_section_refs` },
      );
    }

    for (const sectionRef of entry.related_section_refs) {
      if (typeof sectionRef !== "string" || !/^SEC-[0-9]{3}$/.test(sectionRef)) {
        throw createSchemaValidationError(
          code,
          `${field}.related_section_refs must contain zero-padded section refs`,
          { field: `${field}.related_section_refs` },
        );
      }
    }

    validateExhibitRefs(
      entry.related_exhibit_refs,
      `${field}.related_exhibit_refs`,
      code,
    );

    return {
      issue_ref: entry.issue_ref,
      issue_code: entry.issue_code,
      blocking: entry.blocking,
      related_lane_keys: [...entry.related_lane_keys],
      related_reference_refs: [...entry.related_reference_refs],
      related_section_refs: [...entry.related_section_refs],
      related_exhibit_refs: [...entry.related_exhibit_refs],
    };
  });
}

function validateDossierSectionIndex(sectionIndex, code) {
  if (!Array.isArray(sectionIndex)) {
    throw createSchemaValidationError(code, "section_index must be an array", {
      field: "section_index",
    });
  }

  return sectionIndex.map((entry, index) => {
    const field = `section_index.${index}`;

    assertPlainObject(entry, code, field);
    assertExactKeys(entry, dossierSectionIndexEntryRequiredKeys, code, field);

    if (
      typeof entry.section_ref !== "string" ||
      /^SEC-[0-9]{3}$/.test(entry.section_ref) !== true
    ) {
      throw createSchemaValidationError(
        code,
        `${field}.section_ref must be a zero-padded section ref`,
        { field: `${field}.section_ref` },
      );
    }

    if (
      typeof entry.section_key !== "string" ||
      !["release_status", "profile_inputs", "issues"].includes(entry.section_key)
    ) {
      throw createSchemaValidationError(
        code,
        `${field}.section_key must be a supported section key`,
        { field: `${field}.section_key` },
      );
    }

    if (
      !Number.isInteger(entry.section_order) ||
      entry.section_order < 1
    ) {
      throw createSchemaValidationError(
        code,
        `${field}.section_order must be a positive integer`,
        { field: `${field}.section_order` },
      );
    }

    if (typeof entry.present !== "boolean") {
      throw createSchemaValidationError(
        code,
        `${field}.present must be a boolean`,
        { field: `${field}.present` },
      );
    }

    if (!Array.isArray(entry.related_issue_refs)) {
      throw createSchemaValidationError(
        code,
        `${field}.related_issue_refs must be an array`,
        { field: `${field}.related_issue_refs` },
      );
    }

    const uniqueIssueRefs = new Set(entry.related_issue_refs);
    if (uniqueIssueRefs.size !== entry.related_issue_refs.length) {
      throw createSchemaValidationError(
        code,
        `${field}.related_issue_refs must not contain duplicates`,
        { field: `${field}.related_issue_refs` },
      );
    }

    for (const issueRef of entry.related_issue_refs) {
      if (typeof issueRef !== "string" || !/^ISS-[0-9]{3}$/.test(issueRef)) {
        throw createSchemaValidationError(
          code,
          `${field}.related_issue_refs must contain zero-padded issue refs`,
          { field: `${field}.related_issue_refs` },
        );
      }
    }

    validateLaneKeyArray(entry.related_lane_keys, `${field}.related_lane_keys`, code);

    validateReferenceRefs(
      entry.related_reference_refs,
      `${field}.related_reference_refs`,
      code,
    );

    validateExhibitRefs(
      entry.related_exhibit_refs,
      `${field}.related_exhibit_refs`,
      code,
    );

    return {
      section_ref: entry.section_ref,
      section_key: entry.section_key,
      section_order: entry.section_order,
      present: entry.present,
      related_issue_refs: [...entry.related_issue_refs],
      related_lane_keys: [...entry.related_lane_keys],
      related_reference_refs: [...entry.related_reference_refs],
      related_exhibit_refs: [...entry.related_exhibit_refs],
    };
  });
}

function validateDossierEvidenceReferenceIndex(evidenceReferenceIndex, code) {
  if (!Array.isArray(evidenceReferenceIndex)) {
    throw createSchemaValidationError(
      code,
      "evidence_reference_index must be an array",
      {
        field: "evidence_reference_index",
      },
    );
  }

  const seenEvidenceObjectIds = new Set();
  const seenReferenceRefs = new Set();

  return evidenceReferenceIndex.map((entry, index) => {
    const field = `evidence_reference_index.${index}`;

    assertPlainObject(entry, code, field);
    assertExactKeys(
      entry,
      dossierEvidenceReferenceIndexEntryRequiredKeys,
      code,
      field,
    );

    if (
      typeof entry.reference_ref !== "string" ||
      !/^REF-[0-9]{3}$/.test(entry.reference_ref)
    ) {
      throw createSchemaValidationError(
        code,
        `${field}.reference_ref must be a zero-padded reference ref`,
        { field: `${field}.reference_ref` },
      );
    }

    if (seenReferenceRefs.has(entry.reference_ref)) {
      throw createSchemaValidationError(
        code,
        `${field}.reference_ref must be unique`,
        { field: `${field}.reference_ref` },
      );
    }
    seenReferenceRefs.add(entry.reference_ref);

    if (
      typeof entry.evidence_object_id !== "string" ||
      entry.evidence_object_id.length === 0
    ) {
      throw createSchemaValidationError(
        code,
        `${field}.evidence_object_id must be a non-empty string`,
        { field: `${field}.evidence_object_id` },
      );
    }

    if (seenEvidenceObjectIds.has(entry.evidence_object_id)) {
      throw createSchemaValidationError(
        code,
        `${field}.evidence_object_id must be unique`,
        { field: `${field}.evidence_object_id` },
      );
    }
    seenEvidenceObjectIds.add(entry.evidence_object_id);

    validateLaneKeyArray(
      entry.supporting_lane_keys,
      `${field}.supporting_lane_keys`,
      code,
    );

    if (!Array.isArray(entry.related_issue_refs)) {
      throw createSchemaValidationError(
        code,
        `${field}.related_issue_refs must be an array`,
        { field: `${field}.related_issue_refs` },
      );
    }

    const uniqueIssueRefs = new Set(entry.related_issue_refs);
    if (uniqueIssueRefs.size !== entry.related_issue_refs.length) {
      throw createSchemaValidationError(
        code,
        `${field}.related_issue_refs must not contain duplicates`,
        { field: `${field}.related_issue_refs` },
      );
    }

    for (const issueRef of entry.related_issue_refs) {
      if (typeof issueRef !== "string" || !/^ISS-[0-9]{3}$/.test(issueRef)) {
        throw createSchemaValidationError(
          code,
          `${field}.related_issue_refs must contain zero-padded issue refs`,
          { field: `${field}.related_issue_refs` },
        );
      }
    }

    if (!Array.isArray(entry.related_section_refs)) {
      throw createSchemaValidationError(
        code,
        `${field}.related_section_refs must be an array`,
        { field: `${field}.related_section_refs` },
      );
    }

    const uniqueSectionRefs = new Set(entry.related_section_refs);
    if (uniqueSectionRefs.size !== entry.related_section_refs.length) {
      throw createSchemaValidationError(
        code,
        `${field}.related_section_refs must not contain duplicates`,
        { field: `${field}.related_section_refs` },
      );
    }

    for (const sectionRef of entry.related_section_refs) {
      if (typeof sectionRef !== "string" || !/^SEC-[0-9]{3}$/.test(sectionRef)) {
        throw createSchemaValidationError(
          code,
          `${field}.related_section_refs must contain zero-padded section refs`,
          { field: `${field}.related_section_refs` },
        );
      }
    }

    validateExhibitRefs(
      entry.related_exhibit_refs,
      `${field}.related_exhibit_refs`,
      code,
    );

    return {
      reference_ref: entry.reference_ref,
      evidence_object_id: entry.evidence_object_id,
      supporting_lane_keys: [...entry.supporting_lane_keys],
      related_issue_refs: [...entry.related_issue_refs],
      related_section_refs: [...entry.related_section_refs],
      related_exhibit_refs: [...entry.related_exhibit_refs],
    };
  });
}

function validateDossierEvidenceExhibitIndex(evidenceExhibitIndex, code) {
  if (!Array.isArray(evidenceExhibitIndex)) {
    throw createSchemaValidationError(
      code,
      "evidence_exhibit_index must be an array",
      {
        field: "evidence_exhibit_index",
      },
    );
  }

  const seenExhibitRefs = new Set();
  const seenEvidenceObjectIds = new Set();

  return evidenceExhibitIndex.map((entry, index) => {
    const field = `evidence_exhibit_index.${index}`;

    assertPlainObject(entry, code, field);
    assertExactKeys(
      entry,
      dossierEvidenceExhibitIndexEntryRequiredKeys,
      code,
      field,
    );

    if (
      typeof entry.exhibit_ref !== "string" ||
      !/^EX-[0-9]{3}$/.test(entry.exhibit_ref)
    ) {
      throw createSchemaValidationError(
        code,
        `${field}.exhibit_ref must be a zero-padded exhibit ref`,
        { field: `${field}.exhibit_ref` },
      );
    }

    if (seenExhibitRefs.has(entry.exhibit_ref)) {
      throw createSchemaValidationError(
        code,
        `${field}.exhibit_ref must be unique`,
        { field: `${field}.exhibit_ref` },
      );
    }
    seenExhibitRefs.add(entry.exhibit_ref);

    if (
      typeof entry.evidence_object_id !== "string" ||
      entry.evidence_object_id.length === 0
    ) {
      throw createSchemaValidationError(
        code,
        `${field}.evidence_object_id must be a non-empty string`,
        { field: `${field}.evidence_object_id` },
      );
    }

    if (seenEvidenceObjectIds.has(entry.evidence_object_id)) {
      throw createSchemaValidationError(
        code,
        `${field}.evidence_object_id must be unique`,
        { field: `${field}.evidence_object_id` },
      );
    }
    seenEvidenceObjectIds.add(entry.evidence_object_id);

    validateLaneKeyArray(
      entry.supporting_lane_keys,
      `${field}.supporting_lane_keys`,
      code,
    );

    validateLaneKeyArray(
      entry.related_lane_keys,
      `${field}.related_lane_keys`,
      code,
    );

    validateReferenceRefs(
      entry.related_reference_refs,
      `${field}.related_reference_refs`,
      code,
    );

    if (!Array.isArray(entry.related_issue_refs)) {
      throw createSchemaValidationError(
        code,
        `${field}.related_issue_refs must be an array`,
        { field: `${field}.related_issue_refs` },
      );
    }

    const uniqueIssueRefs = new Set(entry.related_issue_refs);
    if (uniqueIssueRefs.size !== entry.related_issue_refs.length) {
      throw createSchemaValidationError(
        code,
        `${field}.related_issue_refs must not contain duplicates`,
        { field: `${field}.related_issue_refs` },
      );
    }

    for (const issueRef of entry.related_issue_refs) {
      if (typeof issueRef !== "string" || !/^ISS-[0-9]{3}$/.test(issueRef)) {
        throw createSchemaValidationError(
          code,
          `${field}.related_issue_refs must contain zero-padded issue refs`,
          { field: `${field}.related_issue_refs` },
        );
      }
    }

    if (!Array.isArray(entry.related_section_refs)) {
      throw createSchemaValidationError(
        code,
        `${field}.related_section_refs must be an array`,
        { field: `${field}.related_section_refs` },
      );
    }

    const uniqueSectionRefs = new Set(entry.related_section_refs);
    if (uniqueSectionRefs.size !== entry.related_section_refs.length) {
      throw createSchemaValidationError(
        code,
        `${field}.related_section_refs must not contain duplicates`,
        { field: `${field}.related_section_refs` },
      );
    }

    for (const sectionRef of entry.related_section_refs) {
      if (typeof sectionRef !== "string" || !/^SEC-[0-9]{3}$/.test(sectionRef)) {
        throw createSchemaValidationError(
          code,
          `${field}.related_section_refs must contain zero-padded section refs`,
          { field: `${field}.related_section_refs` },
        );
      }
    }

    return {
      exhibit_ref: entry.exhibit_ref,
      evidence_object_id: entry.evidence_object_id,
      supporting_lane_keys: [...entry.supporting_lane_keys],
      related_lane_keys: [...entry.related_lane_keys],
      related_reference_refs: [...entry.related_reference_refs],
      related_issue_refs: [...entry.related_issue_refs],
      related_section_refs: [...entry.related_section_refs],
    };
  });
}

function deriveExpectedDossierIssueRelatedSectionRefs(issueCode, sectionIndex) {
  const sectionRefsByKey = new Map(
    sectionIndex.map((entry) => [entry.section_key, entry.section_ref]),
  );
  let relatedSectionKeys = [];

  if (
    issueCode === "swe-bodelning-input-incomplete" ||
    issueCode === "swe-bodelning-support-incomplete"
  ) {
    relatedSectionKeys = ["release_status", "profile_inputs"];
  } else if (
    issueCode === "evaluator-version-mismatch" ||
    issueCode === "profile-input-context-mismatch"
  ) {
    relatedSectionKeys = ["release_status"];
  }

  return [
    ...new Set(
      relatedSectionKeys
        .map((sectionKey) => sectionRefsByKey.get(sectionKey))
        .filter(
          (sectionRef) => typeof sectionRef === "string" && sectionRef.length > 0,
        ),
    ),
  ];
}

function deriveBaseDossierSectionIndex(expectedIssueIndex) {
  return [
    {
      section_key: "release_status",
      section_order: 1,
      present: true,
    },
    {
      section_key: "profile_inputs",
      section_order: 2,
      present: true,
    },
    {
      section_key: "issues",
      section_order: 3,
      present: expectedIssueIndex.length > 0,
    },
  ].map((entry, index) => ({
    section_ref: `SEC-${String(index + 1).padStart(3, "0")}`,
    ...entry,
  }));
}

function deriveExpectedDossierIssueIndex(input, sectionIndex = null) {
  const expectedIssueIndex = [];
  const missingValueLaneKeys = [...input.profile_input_summary.missing_value_lane_keys].sort();
  const missingSupportLaneKeys =
    [...input.profile_input_summary.missing_support_lane_keys].sort();

  if (missingValueLaneKeys.length > 0) {
    expectedIssueIndex.push({
      issue_code: "swe-bodelning-input-incomplete",
      blocking: true,
      related_lane_keys: missingValueLaneKeys,
    });
  }

  if (missingSupportLaneKeys.length > 0) {
    expectedIssueIndex.push({
      issue_code: "swe-bodelning-support-incomplete",
      blocking: true,
      related_lane_keys: missingSupportLaneKeys,
    });
  }

  if (input.release_eval_freshness !== "current") {
    expectedIssueIndex.push({
      issue_code: input.release_eval_freshness_reason_code,
      blocking: true,
      related_lane_keys: [],
    });
  }

  const expectedIssueIndexWithRefs = expectedIssueIndex.map((entry, index) => ({
    issue_ref: `ISS-${String(index + 1).padStart(3, "0")}`,
    ...entry,
  }));
  const expectedSectionIndex =
    sectionIndex ?? deriveBaseDossierSectionIndex(expectedIssueIndexWithRefs);
  const expectedEvidenceReferenceIndex =
    deriveExpectedDossierEvidenceReferenceIndex(input.profile_input_lane_snapshot);
  const expectedSupportingReferenceRefsByLane =
    deriveExpectedDossierSupportingReferenceRefsByLane(
      input.profile_input_lane_snapshot,
      expectedEvidenceReferenceIndex,
    );
  const expectedEvidenceExhibitIndex =
    deriveExpectedDossierEvidenceExhibitIndex(expectedEvidenceReferenceIndex);
  const expectedSupportingExhibitRefsByLane =
    deriveExpectedDossierSupportingExhibitRefsByLane(
      input.profile_input_lane_snapshot,
      expectedEvidenceExhibitIndex,
    );

  return expectedIssueIndexWithRefs.map((entry) => ({
    ...entry,
    related_reference_refs: expectedEvidenceReferenceIndex
      .filter((referenceEntry) =>
        entry.related_lane_keys.some((laneKey) =>
          expectedSupportingReferenceRefsByLane[laneKey]?.includes(
            referenceEntry.reference_ref,
          ),
        ),
      )
      .map((referenceEntry) => referenceEntry.reference_ref),
    related_section_refs: deriveExpectedDossierIssueRelatedSectionRefs(
      entry.issue_code,
      expectedSectionIndex,
    ),
    related_exhibit_refs: expectedEvidenceExhibitIndex
      .filter((exhibitEntry) =>
        entry.related_lane_keys.some((laneKey) =>
          expectedSupportingExhibitRefsByLane[laneKey]?.includes(
            exhibitEntry.exhibit_ref,
          ),
        ),
      )
      .map((exhibitEntry) => exhibitEntry.exhibit_ref),
  }));
}

function deriveExpectedDossierSectionIndex(
  expectedIssueIndex,
  expectedEvidenceExhibitIndex = [],
  expectedEvidenceReferenceIndex = [],
) {
  const sectionIndex = deriveBaseDossierSectionIndex(expectedIssueIndex);
  const relatedLaneKeysByIssueRef = new Map(
    expectedIssueIndex.map((entry) => [
      entry.issue_ref,
      Array.isArray(entry.related_lane_keys) ? entry.related_lane_keys : [],
    ]),
  );
  const relatedReferenceRefsByExhibitRef = new Map(
    expectedEvidenceExhibitIndex.map((entry) => [
      entry.exhibit_ref,
      Array.isArray(entry.related_reference_refs) ? entry.related_reference_refs : [],
    ]),
  );

  return sectionIndex.map((entry) => {
    const relatedIssueRefs = expectedIssueIndex
      .filter(
        (issueEntry) =>
          Array.isArray(issueEntry.related_section_refs) &&
          issueEntry.related_section_refs.includes(entry.section_ref),
      )
      .map((issueEntry) => issueEntry.issue_ref);
    const relatedExhibitRefs = expectedEvidenceExhibitIndex
      .filter((exhibitEntry) =>
        expectedIssueIndex.some(
          (issueEntry) =>
            relatedIssueRefs.includes(issueEntry.issue_ref) &&
            Array.isArray(issueEntry.related_exhibit_refs) &&
            issueEntry.related_exhibit_refs.includes(exhibitEntry.exhibit_ref),
        ),
      )
      .map((exhibitEntry) => exhibitEntry.exhibit_ref);

    return {
      ...entry,
      related_issue_refs: relatedIssueRefs,
      related_lane_keys: laneKeys.filter((laneKey) =>
        relatedIssueRefs.some((issueRef) =>
          relatedLaneKeysByIssueRef.get(issueRef)?.includes(laneKey),
        ),
      ),
      related_reference_refs: expectedEvidenceReferenceIndex
        .filter((referenceEntry) =>
          relatedExhibitRefs.some((exhibitRef) =>
            relatedReferenceRefsByExhibitRef.get(exhibitRef)?.includes(
              referenceEntry.reference_ref,
            ),
          ),
        )
        .map((referenceEntry) => referenceEntry.reference_ref),
      related_exhibit_refs: relatedExhibitRefs,
    };
  });
}

function deriveExpectedDossierEvidenceReferenceIndex(
  profileInputLaneSnapshot,
  expectedIssueIndex = [],
) {
  const supportingLaneKeysByEvidenceObjectId = new Map();

  for (const laneKey of laneKeys) {
    const laneEntry = profileInputLaneSnapshot[laneKey];
    const evidenceObjectIds = Array.isArray(laneEntry?.evidence_object_ids)
      ? [...laneEntry.evidence_object_ids].sort()
      : [];

    for (const evidenceObjectId of evidenceObjectIds) {
      if (!supportingLaneKeysByEvidenceObjectId.has(evidenceObjectId)) {
        supportingLaneKeysByEvidenceObjectId.set(evidenceObjectId, []);
      }

      const supportingLaneKeys =
        supportingLaneKeysByEvidenceObjectId.get(evidenceObjectId);
      if (!supportingLaneKeys.includes(laneKey)) {
        supportingLaneKeys.push(laneKey);
      }
    }
  }

  return [...supportingLaneKeysByEvidenceObjectId.entries()]
    .sort(([leftEvidenceObjectId], [rightEvidenceObjectId]) =>
      leftEvidenceObjectId.localeCompare(rightEvidenceObjectId),
    )
    .map(([evidence_object_id, supporting_lane_keys], index) => ({
      reference_ref: `REF-${String(index + 1).padStart(3, "0")}`,
      evidence_object_id,
      supporting_lane_keys: [...supporting_lane_keys],
      related_issue_refs: [
        ...new Set(
          expectedIssueIndex
            .filter(
              (issueEntry) =>
                Array.isArray(issueEntry.related_lane_keys) &&
                issueEntry.related_lane_keys.some((laneKey) =>
                  supporting_lane_keys.includes(laneKey),
                ),
            )
            .map((issueEntry) => issueEntry.issue_ref),
        ),
      ],
    }));
}

function attachExpectedDossierEvidenceReferenceRelatedSectionRefs(
  expectedEvidenceReferenceIndex,
  expectedIssueIndex,
  expectedSectionIndex,
) {
  const relatedSectionRefsByIssueRef = new Map(
    expectedIssueIndex.map((entry) => [
      entry.issue_ref,
      Array.isArray(entry.related_section_refs) ? entry.related_section_refs : [],
    ]),
  );
  const canonicalSectionRefs = expectedSectionIndex
    .filter((entry) => entry && typeof entry.section_ref === "string")
    .map((entry) => entry.section_ref);

  return expectedEvidenceReferenceIndex.map((entry) => ({
    ...entry,
    related_section_refs: canonicalSectionRefs.filter((sectionRef) =>
      Array.isArray(entry.related_issue_refs) &&
      entry.related_issue_refs.some((issueRef) =>
        relatedSectionRefsByIssueRef.get(issueRef)?.includes(sectionRef),
      ),
    ),
  }));
}

function attachExpectedDossierEvidenceReferenceRelatedExhibitRefs(
  expectedEvidenceReferenceIndex,
  expectedEvidenceExhibitIndex,
) {
  const relatedExhibitRefsByEvidenceObjectId = new Map(
    expectedEvidenceReferenceIndex.map((entry) => [entry.evidence_object_id, []]),
  );

  for (const exhibitEntry of expectedEvidenceExhibitIndex) {
    if (
      typeof exhibitEntry?.exhibit_ref !== "string" ||
      typeof exhibitEntry.evidence_object_id !== "string" ||
      !relatedExhibitRefsByEvidenceObjectId.has(exhibitEntry.evidence_object_id)
    ) {
      continue;
    }

    const relatedExhibitRefs = relatedExhibitRefsByEvidenceObjectId.get(
      exhibitEntry.evidence_object_id,
    );
    if (!relatedExhibitRefs.includes(exhibitEntry.exhibit_ref)) {
      relatedExhibitRefs.push(exhibitEntry.exhibit_ref);
    }
  }

  return expectedEvidenceReferenceIndex.map((entry) => ({
    ...entry,
    related_exhibit_refs:
      relatedExhibitRefsByEvidenceObjectId.get(entry.evidence_object_id) ?? [],
  }));
}

function deriveExpectedDossierEvidenceExhibitIndex(
  expectedEvidenceReferenceIndex,
  expectedIssueIndex = [],
  expectedSectionIndex = [],
) {
  const expectedEvidenceExhibitIndex = expectedEvidenceReferenceIndex.map(
    (entry, index) => ({
      exhibit_ref: `EX-${String(index + 1).padStart(3, "0")}`,
      evidence_object_id: entry.evidence_object_id,
      supporting_lane_keys: [...entry.supporting_lane_keys],
    }),
  );

  return expectedEvidenceExhibitIndex.map((entry) => ({
    ...entry,
    related_lane_keys: laneKeys.filter((laneKey) =>
      entry.supporting_lane_keys.includes(laneKey),
    ),
    related_reference_refs: expectedEvidenceReferenceIndex
      .filter(
        (referenceEntry) =>
          referenceEntry.evidence_object_id === entry.evidence_object_id,
      )
      .map((referenceEntry) => referenceEntry.reference_ref),
    related_issue_refs: expectedIssueIndex
      .filter(
        (issueEntry) =>
          Array.isArray(issueEntry.related_exhibit_refs) &&
          issueEntry.related_exhibit_refs.includes(entry.exhibit_ref),
      )
      .map((issueEntry) => issueEntry.issue_ref),
    related_section_refs: expectedSectionIndex
      .filter(
        (sectionEntry) =>
          Array.isArray(sectionEntry.related_exhibit_refs) &&
          sectionEntry.related_exhibit_refs.includes(entry.exhibit_ref),
      )
      .map((sectionEntry) => sectionEntry.section_ref),
  }));
}

function deriveExpectedDossierSupportingExhibitRefsByLane(
  profileInputLaneSnapshot,
  expectedEvidenceExhibitIndex,
) {
  const supportingExhibitRefsByLane = {};

  for (const laneKey of laneKeys) {
    const evidenceObjectIds = new Set(
      Array.isArray(profileInputLaneSnapshot[laneKey]?.evidence_object_ids)
        ? profileInputLaneSnapshot[laneKey].evidence_object_ids
        : [],
    );

    supportingExhibitRefsByLane[laneKey] = expectedEvidenceExhibitIndex
      .filter((entry) => evidenceObjectIds.has(entry.evidence_object_id))
      .map((entry) => entry.exhibit_ref);
  }

  return supportingExhibitRefsByLane;
}

function deriveExpectedDossierSupportingReferenceRefsByLane(
  profileInputLaneSnapshot,
  expectedEvidenceReferenceIndex,
) {
  const supportingReferenceRefsByLane = {};

  for (const laneKey of laneKeys) {
    const evidenceObjectIds = new Set(
      Array.isArray(profileInputLaneSnapshot[laneKey]?.evidence_object_ids)
        ? profileInputLaneSnapshot[laneKey].evidence_object_ids
        : [],
    );

    supportingReferenceRefsByLane[laneKey] = expectedEvidenceReferenceIndex
      .filter((entry) => evidenceObjectIds.has(entry.evidence_object_id))
      .map((entry) => entry.reference_ref);
  }

  return supportingReferenceRefsByLane;
}

function validateJurisdictionProfileRegistry(
  input,
  errorCode = "ERR_JURISDICTION_PROFILE_REGISTRY_INVALID",
) {
  assertPlainObject(input, errorCode, "input");

  for (const requiredKey of jurisdictionProfileRegistryRequiredKeys) {
    if (!Object.hasOwn(input, requiredKey)) {
      throw createSchemaValidationError(
        errorCode,
        `input.${requiredKey} is required`,
        { field: `input.${requiredKey}` },
      );
    }
  }

  const registryKeys = Object.keys(input);

  if (registryKeys.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "input must include at least one registry entry",
      { field: "input" },
    );
  }

  for (const registryKey of registryKeys) {
    if (
      !jurisdictionProfileRegistryKnownKeys.includes(registryKey) &&
      !/^[A-Z0-9_]+$/.test(registryKey)
    ) {
      throw createSchemaValidationError(
        errorCode,
        "registry entry keys must use uppercase underscore format or match an explicit registry key",
        { field: `input.${registryKey}` },
      );
    }

    const entry = input[registryKey];
    const entryField = `input.${registryKey}`;

    assertPlainObject(entry, errorCode, entryField);
    assertExactKeys(
      entry,
      jurisdictionProfileRegistryEntryRequiredKeys,
      errorCode,
      entryField,
    );

    if (
      typeof entry.jurisdiction_profile_key !== "string" ||
      entry.jurisdiction_profile_key.length === 0
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${entryField}.jurisdiction_profile_key must be a non-empty string`,
        { field: `${entryField}.jurisdiction_profile_key` },
      );
    }

    if (
      jurisdictionProfileRegistryKnownKeys.includes(registryKey) &&
      entry.jurisdiction_profile_key !== registryKey
    ) {
      throw createSchemaValidationError(
        errorCode,
        `${entryField}.jurisdiction_profile_key must match ${registryKey}`,
        { field: `${entryField}.jurisdiction_profile_key` },
      );
    }

    assertPlainObject(entry.capabilities, errorCode, `${entryField}.capabilities`);
    assertExactKeys(
      entry.capabilities,
      jurisdictionProfileRegistryCapabilityRequiredKeys,
      errorCode,
      `${entryField}.capabilities`,
    );

    for (const capabilityKey of jurisdictionProfileRegistryCapabilityRequiredKeys) {
      if (typeof entry.capabilities[capabilityKey] !== "boolean") {
        throw createSchemaValidationError(
          errorCode,
          `${entryField}.capabilities.${capabilityKey} must be a boolean`,
          { field: `${entryField}.capabilities.${capabilityKey}` },
        );
      }
    }
  }

  return input;
}

function validateProfileInputSummary(summary) {
  assertPlainObject(
    summary,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_summary",
  );

  const summaryKeys =
    sweBodelningProfileInput.properties.profile_input_summary.required;

  assertExactKeys(
    summary,
    summaryKeys,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_summary",
  );

  if (
    !Number.isInteger(summary.required_lane_count) ||
    summary.required_lane_count !== laneKeys.length
  ) {
    throw createSchemaValidationError(
      "ERR_PROFILE_INPUT_INVALID",
      "required_lane_count must match the canonical lane count",
      {
        field: "profile_input_summary.required_lane_count",
      },
    );
  }

  if (
    !Number.isInteger(summary.lanes_with_value_count) ||
    summary.lanes_with_value_count < 0 ||
    summary.lanes_with_value_count > laneKeys.length
  ) {
    throw createSchemaValidationError(
      "ERR_PROFILE_INPUT_INVALID",
      "lanes_with_value_count must be an integer within the canonical lane range",
      {
        field: "profile_input_summary.lanes_with_value_count",
      },
    );
  }

  validateLaneKeyArray(
    summary.missing_value_lane_keys,
    "profile_input_summary.missing_value_lane_keys",
    "ERR_PROFILE_INPUT_INVALID",
  );
}

function validateProfileInputLaneSnapshot(snapshot) {
  assertPlainObject(
    snapshot,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_lane_snapshot",
  );

  assertExactKeys(
    snapshot,
    laneKeys,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_lane_snapshot",
  );

  for (const laneKey of laneKeys) {
    const entry = snapshot[laneKey];

    assertPlainObject(
      entry,
      "ERR_PROFILE_INPUT_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    assertAllowedKeys(
      entry,
      laneEntryAllowedKeys,
      "ERR_PROFILE_INPUT_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    for (const requiredKey of laneEntryRequiredKeys) {
      if (!(requiredKey in entry)) {
        throw createSchemaValidationError(
          "ERR_PROFILE_INPUT_INVALID",
          `${laneKey} is missing a required field`,
          {
            field: `profile_input_lane_snapshot.${laneKey}.${requiredKey}`,
          },
        );
      }
    }

    if (typeof entry.has_value !== "boolean") {
      throw createSchemaValidationError(
        "ERR_PROFILE_INPUT_INVALID",
        `${laneKey}.has_value must be a boolean`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_value`,
        },
      );
    }

    if ("evidence_object_ids" in entry) {
      validateEvidenceObjectIds(
        entry.evidence_object_ids,
        `profile_input_lane_snapshot.${laneKey}.evidence_object_ids`,
        "ERR_PROFILE_INPUT_INVALID",
      );
    }
  }
}

function validateCMDLaneKeyArray(value, field, code) {
  if (!Array.isArray(value)) {
    throw createSchemaValidationError(code, `${field} must be an array`, { field });
  }

  const seen = new Set();

  for (const laneKey of value) {
    if (typeof laneKey !== "string" || laneKey.length === 0) {
      throw createSchemaValidationError(code, `${field} entries must be strings`, {
        field,
      });
    }

    if (!cmdLaneKeys.includes(laneKey)) {
      throw createSchemaValidationError(
        code,
        `${field} contains an unknown lane key`,
        { field },
      );
    }

    if (seen.has(laneKey)) {
      throw createSchemaValidationError(
        code,
        `${field} entries must be unique`,
        { field },
      );
    }

    seen.add(laneKey);
  }
}

function validateCMDProfileInputSummary(summary) {
  assertPlainObject(
    summary,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_summary",
  );

  const summaryKeys = cmdProfileInput.properties.profile_input_summary.required;

  assertExactKeys(
    summary,
    summaryKeys,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_summary",
  );

  if (
    !Number.isInteger(summary.required_lane_count) ||
    summary.required_lane_count !== cmdLaneKeys.length
  ) {
    throw createSchemaValidationError(
      "ERR_PROFILE_INPUT_INVALID",
      "required_lane_count must match the canonical lane count",
      {
        field: "profile_input_summary.required_lane_count",
      },
    );
  }

  if (
    !Number.isInteger(summary.lanes_with_value_count) ||
    summary.lanes_with_value_count < 0 ||
    summary.lanes_with_value_count > cmdLaneKeys.length
  ) {
    throw createSchemaValidationError(
      "ERR_PROFILE_INPUT_INVALID",
      "lanes_with_value_count must be an integer within the canonical lane range",
      {
        field: "profile_input_summary.lanes_with_value_count",
      },
    );
  }

  validateCMDLaneKeyArray(
    summary.missing_value_lane_keys,
    "profile_input_summary.missing_value_lane_keys",
    "ERR_PROFILE_INPUT_INVALID",
  );
}

function validateCMDProfileInputLaneSnapshot(snapshot) {
  assertPlainObject(
    snapshot,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_lane_snapshot",
  );

  assertExactKeys(
    snapshot,
    cmdLaneKeys,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_lane_snapshot",
  );

  for (const laneKey of cmdLaneKeys) {
    const entry = snapshot[laneKey];

    assertPlainObject(
      entry,
      "ERR_PROFILE_INPUT_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    assertAllowedKeys(
      entry,
      cmdLaneEntryAllowedKeys,
      "ERR_PROFILE_INPUT_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    for (const requiredKey of cmdLaneEntryRequiredKeys) {
      if (!(requiredKey in entry)) {
        throw createSchemaValidationError(
          "ERR_PROFILE_INPUT_INVALID",
          `${laneKey} is missing a required field`,
          {
            field: `profile_input_lane_snapshot.${laneKey}.${requiredKey}`,
          },
        );
      }
    }

    if (typeof entry.has_value !== "boolean") {
      throw createSchemaValidationError(
        "ERR_PROFILE_INPUT_INVALID",
        `${laneKey}.has_value must be a boolean`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_value`,
        },
      );
    }

    if ("evidence_object_ids" in entry) {
      validateEvidenceObjectIds(
        entry.evidence_object_ids,
        `profile_input_lane_snapshot.${laneKey}.evidence_object_ids`,
        "ERR_PROFILE_INPUT_INVALID",
      );
    }
  }
}

function validateCMDProfileInputSnapshot(input) {
  assertPlainObject(input, "ERR_PROFILE_INPUT_INVALID", "input");

  const requiredRootKeys = cmdProfileInput.required;
  assertExactKeys(
    input,
    requiredRootKeys,
    "ERR_PROFILE_INPUT_INVALID",
    "input",
  );

  if (
    input.jurisdiction_profile_key !==
    cmdProfileInput.properties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.jurisdiction_profile_key,
      },
    );
  }

  validateCMDProfileInputSummary(input.profile_input_summary);
  validateCMDProfileInputLaneSnapshot(input.profile_input_lane_snapshot);

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    profile_input_summary: input.profile_input_summary,
    profile_input_lane_snapshot: input.profile_input_lane_snapshot,
  };
}

function validateSWEBodelningProfileInputSnapshot(input) {
  assertPlainObject(input, "ERR_PROFILE_INPUT_INVALID", "input");

  const requiredRootKeys = sweBodelningProfileInput.required;
  assertExactKeys(
    input,
    requiredRootKeys,
    "ERR_PROFILE_INPUT_INVALID",
    "input",
  );

  if (
    input.jurisdiction_profile_key !==
    sweBodelningProfileInput.properties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.jurisdiction_profile_key,
      },
    );
  }

  validateProfileInputSummary(input.profile_input_summary);
  validateProfileInputLaneSnapshot(input.profile_input_lane_snapshot);

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    profile_input_summary: input.profile_input_summary,
    profile_input_lane_snapshot: input.profile_input_lane_snapshot,
  };
}

function validateReleaseEvalProfileInputSummary(summary) {
  assertPlainObject(
    summary,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "profile_input_summary",
  );

  assertExactKeys(
    summary,
    releaseEvalSummaryRequiredKeys,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "profile_input_summary",
  );

  if (
    !Number.isInteger(summary.required_lane_count) ||
    summary.required_lane_count !== laneKeys.length
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "required_lane_count must match the canonical lane count",
      {
        field: "profile_input_summary.required_lane_count",
      },
    );
  }

  if (
    !Number.isInteger(summary.lanes_with_value_count) ||
    summary.lanes_with_value_count < 0 ||
    summary.lanes_with_value_count > laneKeys.length
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "lanes_with_value_count must be an integer within the canonical lane range",
      {
        field: "profile_input_summary.lanes_with_value_count",
      },
    );
  }

  if (
    !Number.isInteger(summary.lanes_with_support_count) ||
    summary.lanes_with_support_count < 0 ||
    summary.lanes_with_support_count > laneKeys.length
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "lanes_with_support_count must be an integer within the canonical lane range",
      {
        field: "profile_input_summary.lanes_with_support_count",
      },
    );
  }

  validateLaneKeyArray(
    summary.missing_value_lane_keys,
    "profile_input_summary.missing_value_lane_keys",
    "ERR_RELEASE_EVAL_RUN_INVALID",
  );
  validateLaneKeyArray(
    summary.missing_support_lane_keys,
    "profile_input_summary.missing_support_lane_keys",
    "ERR_RELEASE_EVAL_RUN_INVALID",
  );
}

function validateReleaseEvalProfileInputLaneSnapshot(snapshot) {
  assertPlainObject(
    snapshot,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "profile_input_lane_snapshot",
  );

  assertExactKeys(
    snapshot,
    laneKeys,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "profile_input_lane_snapshot",
  );

  const validatedSnapshot = {};

  for (const laneKey of laneKeys) {
    const entry = snapshot[laneKey];

    assertPlainObject(
      entry,
      "ERR_RELEASE_EVAL_RUN_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    assertAllowedKeys(
      entry,
      releaseEvalLaneEntryAllowedKeys,
      "ERR_RELEASE_EVAL_RUN_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    for (const requiredKey of releaseEvalLaneEntryRequiredKeys) {
      if (!(requiredKey in entry)) {
        throw createSchemaValidationError(
          "ERR_RELEASE_EVAL_RUN_INVALID",
          `${laneKey} is missing a required field`,
          {
            field: `profile_input_lane_snapshot.${laneKey}.${requiredKey}`,
          },
        );
      }
    }

    if (typeof entry.has_value !== "boolean") {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `${laneKey}.has_value must be a boolean`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_value`,
        },
      );
    }

    if (typeof entry.has_support !== "boolean") {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `${laneKey}.has_support must be a boolean`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_support`,
        },
      );
    }

    if ("evidence_object_ids" in entry) {
      validateEvidenceObjectIds(
        entry.evidence_object_ids,
        `profile_input_lane_snapshot.${laneKey}.evidence_object_ids`,
        "ERR_RELEASE_EVAL_RUN_INVALID",
      );
    }

    const evidenceCount = Array.isArray(entry.evidence_object_ids)
      ? entry.evidence_object_ids.length
      : 0;
    if (entry.has_support !== (evidenceCount > 0)) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `${laneKey}.has_support must match evidence_object_ids`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_support`,
        },
      );
    }

    validatedSnapshot[laneKey] = {
      has_value: entry.has_value,
      value: entry.value,
      has_support: entry.has_support,
    };

    if ("evidence_object_ids" in entry) {
      validatedSnapshot[laneKey].evidence_object_ids = [...entry.evidence_object_ids];
    }
  }

  return validatedSnapshot;
}

function validateDossierProfileInputLaneSnapshot(snapshot, code) {
  assertPlainObject(
    snapshot,
    code,
    "profile_input_lane_snapshot",
  );

  assertExactKeys(
    snapshot,
    laneKeys,
    code,
    "profile_input_lane_snapshot",
  );

  const validatedSnapshot = {};

  for (const laneKey of laneKeys) {
    const entry = snapshot[laneKey];

    assertPlainObject(
      entry,
      code,
      `profile_input_lane_snapshot.${laneKey}`,
    );

    assertAllowedKeys(
      entry,
      dossierLaneEntryAllowedKeys,
      code,
      `profile_input_lane_snapshot.${laneKey}`,
    );

    for (const requiredKey of dossierLaneEntryRequiredKeys) {
      if (!(requiredKey in entry)) {
        throw createSchemaValidationError(
          code,
          `${laneKey} is missing a required field`,
          {
            field: `profile_input_lane_snapshot.${laneKey}.${requiredKey}`,
          },
        );
      }
    }

    if (typeof entry.has_value !== "boolean") {
      throw createSchemaValidationError(
        code,
        `${laneKey}.has_value must be a boolean`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_value`,
        },
      );
    }

    if (typeof entry.has_support !== "boolean") {
      throw createSchemaValidationError(
        code,
        `${laneKey}.has_support must be a boolean`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_support`,
        },
      );
    }

    if ("evidence_object_ids" in entry) {
      validateEvidenceObjectIds(
        entry.evidence_object_ids,
        `profile_input_lane_snapshot.${laneKey}.evidence_object_ids`,
        code,
      );
    }

    const evidenceCount = Array.isArray(entry.evidence_object_ids)
      ? entry.evidence_object_ids.length
      : 0;
    if (entry.has_support !== (evidenceCount > 0)) {
      throw createSchemaValidationError(
        code,
        `${laneKey}.has_support must match evidence_object_ids`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_support`,
        },
      );
    }

    validateExhibitRefs(
      entry.supporting_exhibit_refs,
      `profile_input_lane_snapshot.${laneKey}.supporting_exhibit_refs`,
      code,
    );
    validateReferenceRefs(
      entry.supporting_reference_refs,
      `profile_input_lane_snapshot.${laneKey}.supporting_reference_refs`,
      code,
    );

    if (!Array.isArray(entry.related_issue_refs)) {
      throw createSchemaValidationError(
        code,
        `${laneKey}.related_issue_refs must be an array`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.related_issue_refs`,
        },
      );
    }

    const uniqueIssueRefs = new Set(entry.related_issue_refs);
    if (uniqueIssueRefs.size !== entry.related_issue_refs.length) {
      throw createSchemaValidationError(
        code,
        `${laneKey}.related_issue_refs must not contain duplicates`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.related_issue_refs`,
        },
      );
    }

    for (const issueRef of entry.related_issue_refs) {
      if (typeof issueRef !== "string" || !/^ISS-[0-9]{3}$/.test(issueRef)) {
        throw createSchemaValidationError(
          code,
          `${laneKey}.related_issue_refs must contain zero-padded issue refs`,
          {
            field: `profile_input_lane_snapshot.${laneKey}.related_issue_refs`,
          },
        );
      }
    }

    if (!Array.isArray(entry.related_section_refs)) {
      throw createSchemaValidationError(
        code,
        `${laneKey}.related_section_refs must be an array`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.related_section_refs`,
        },
      );
    }

    const uniqueSectionRefs = new Set(entry.related_section_refs);
    if (uniqueSectionRefs.size !== entry.related_section_refs.length) {
      throw createSchemaValidationError(
        code,
        `${laneKey}.related_section_refs must not contain duplicates`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.related_section_refs`,
        },
      );
    }

    for (const sectionRef of entry.related_section_refs) {
      if (typeof sectionRef !== "string" || !/^SEC-[0-9]{3}$/.test(sectionRef)) {
        throw createSchemaValidationError(
          code,
          `${laneKey}.related_section_refs must contain zero-padded section refs`,
          {
            field: `profile_input_lane_snapshot.${laneKey}.related_section_refs`,
          },
        );
      }
    }

    validatedSnapshot[laneKey] = {
      has_value: entry.has_value,
      value: entry.value,
      has_support: entry.has_support,
      supporting_exhibit_refs: [...entry.supporting_exhibit_refs],
      supporting_reference_refs: [...entry.supporting_reference_refs],
      related_issue_refs: [...entry.related_issue_refs],
      related_section_refs: [...entry.related_section_refs],
    };

    if ("evidence_object_ids" in entry) {
      validatedSnapshot[laneKey].evidence_object_ids = [...entry.evidence_object_ids];
    }
  }

  return validatedSnapshot;
}

function deriveExpectedDossierLaneIssueRefsByLane(expectedIssueIndex) {
  const relatedIssueRefsByLane = {};

  for (const laneKey of laneKeys) {
    relatedIssueRefsByLane[laneKey] = expectedIssueIndex
      .filter(
        (issueEntry) =>
          Array.isArray(issueEntry.related_lane_keys) &&
          issueEntry.related_lane_keys.includes(laneKey),
      )
      .map((issueEntry) => issueEntry.issue_ref);
  }

  return relatedIssueRefsByLane;
}

function deriveExpectedDossierLaneSectionRefsByLane(
  expectedLaneIssueRefsByLane,
  expectedIssueIndex,
  expectedSectionIndex,
) {
  const relatedSectionRefsByIssueRef = new Map(
    expectedIssueIndex.map((entry) => [
      entry.issue_ref,
      Array.isArray(entry.related_section_refs) ? entry.related_section_refs : [],
    ]),
  );
  const canonicalSectionRefs = expectedSectionIndex.map((entry) => entry.section_ref);
  const relatedSectionRefsByLane = {};

  for (const laneKey of laneKeys) {
    const relatedIssueRefs = Array.isArray(expectedLaneIssueRefsByLane[laneKey])
      ? expectedLaneIssueRefsByLane[laneKey]
      : [];

    relatedSectionRefsByLane[laneKey] = canonicalSectionRefs.filter((sectionRef) =>
      relatedIssueRefs.some((issueRef) =>
        relatedSectionRefsByIssueRef.get(issueRef)?.includes(sectionRef),
      ),
    );
  }

  return relatedSectionRefsByLane;
}

function validateSWEBodelningReleaseEvalRun(input) {
  assertPlainObject(input, "ERR_RELEASE_EVAL_RUN_INVALID", "input");

  const requiredRootKeys = sweBodelningReleaseEvalRun.required;
  assertExactKeys(
    input,
    requiredRootKeys,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "input",
  );

  if (
    input.jurisdiction_profile_key !==
    sweBodelningReleaseEvalRun.properties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.jurisdiction_profile_key,
      },
    );
  }

  for (const field of [
    "release_eval_run_id",
    "evaluator_version",
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
  ]) {
    if (typeof input[field] !== "string" || input[field].length === 0) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  validateReleaseEvalProfileInputSummary(input.profile_input_summary);
  const profileInputLaneSnapshot = validateReleaseEvalProfileInputLaneSnapshot(
    input.profile_input_lane_snapshot,
  );
  const profileDossierSnapshot = validateSWEBodelningProfileDossierSnapshot(
    input.profile_dossier_snapshot,
    "ERR_RELEASE_EVAL_RUN_INVALID",
  );
  const expectedIssueIndex = deriveExpectedDossierIssueIndex(input);
  const expectedEvidenceReferenceIndexWithoutSectionRefs =
    deriveExpectedDossierEvidenceReferenceIndex(
      profileInputLaneSnapshot,
      expectedIssueIndex,
    );
  const expectedEvidenceExhibitIndexWithoutSectionRefs =
    deriveExpectedDossierEvidenceExhibitIndex(
      expectedEvidenceReferenceIndexWithoutSectionRefs,
      expectedIssueIndex,
    );
  const expectedSectionIndex = deriveExpectedDossierSectionIndex(
    expectedIssueIndex,
    expectedEvidenceExhibitIndexWithoutSectionRefs,
    expectedEvidenceReferenceIndexWithoutSectionRefs,
  );
  const expectedEvidenceReferenceIndex =
    attachExpectedDossierEvidenceReferenceRelatedSectionRefs(
      expectedEvidenceReferenceIndexWithoutSectionRefs,
      expectedIssueIndex,
      expectedSectionIndex,
    );
  const expectedEvidenceExhibitIndex =
    deriveExpectedDossierEvidenceExhibitIndex(
      expectedEvidenceReferenceIndex,
      expectedIssueIndex,
      expectedSectionIndex,
    );
  const expectedEvidenceReferenceIndexWithExhibitRefs =
    attachExpectedDossierEvidenceReferenceRelatedExhibitRefs(
      expectedEvidenceReferenceIndex,
      expectedEvidenceExhibitIndex,
    );
  const expectedSupportingExhibitRefsByLane =
    deriveExpectedDossierSupportingExhibitRefsByLane(
      profileInputLaneSnapshot,
      expectedEvidenceExhibitIndex,
    );
  const expectedSupportingReferenceRefsByLane =
    deriveExpectedDossierSupportingReferenceRefsByLane(
      profileInputLaneSnapshot,
      expectedEvidenceReferenceIndexWithExhibitRefs,
    );
  const expectedLaneIssueRefsByLane =
    deriveExpectedDossierLaneIssueRefsByLane(expectedIssueIndex);
  const expectedLaneSectionRefsByLane =
    deriveExpectedDossierLaneSectionRefsByLane(
      expectedLaneIssueRefsByLane,
      expectedIssueIndex,
      expectedSectionIndex,
    );

  const missingSupportFromSnapshot = laneKeys.filter(
    (laneKey) => !profileInputLaneSnapshot[laneKey].has_support,
  );

  if (
    input.profile_input_summary.lanes_with_support_count !==
    laneKeys.length - missingSupportFromSnapshot.length
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "lanes_with_support_count must match the canonical lane support count",
      {
        field: "profile_input_summary.lanes_with_support_count",
      },
    );
  }

  if (
    JSON.stringify(input.profile_input_summary.missing_support_lane_keys) !==
    JSON.stringify(missingSupportFromSnapshot)
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "missing_support_lane_keys must match the canonical unsupported lanes",
      {
        field: "profile_input_summary.missing_support_lane_keys",
      },
    );
  }

  for (const field of [
    "jurisdiction_profile_key",
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
    "evaluator_version",
  ]) {
    if (input[field] !== profileDossierSnapshot[field]) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `profile_dossier_snapshot.${field} must match the canonical release eval field`,
        {
          field: `profile_dossier_snapshot.${field}`,
        },
      );
    }
  }

  for (const field of [
    "release_eval_run_id",
    "evaluator_version",
    "jurisdiction_profile_key",
  ]) {
    if (input[field] !== profileDossierSnapshot.canonical_source[field]) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `profile_dossier_snapshot.canonical_source.${field} must match the canonical release eval field`,
        {
          field: `profile_dossier_snapshot.canonical_source.${field}`,
        },
      );
    }
  }

  for (const field of [
    "required_lane_count",
    "lanes_with_value_count",
    "lanes_with_support_count",
  ]) {
    if (input.profile_input_summary[field] !== profileDossierSnapshot.profile_input_summary[field]) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        "profile_dossier_snapshot.profile_input_summary must match the canonical release eval summary",
        {
          field: "profile_dossier_snapshot.profile_input_summary",
        },
      );
    }
  }

  if (
    JSON.stringify(input.profile_input_summary.missing_value_lane_keys) !==
    JSON.stringify(profileDossierSnapshot.profile_input_summary.missing_value_lane_keys)
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "profile_dossier_snapshot.profile_input_summary must match the canonical release eval summary",
      {
        field: "profile_dossier_snapshot.profile_input_summary",
      },
    );
  }

  if (
    JSON.stringify(input.profile_input_summary.missing_support_lane_keys) !==
    JSON.stringify(profileDossierSnapshot.profile_input_summary.missing_support_lane_keys)
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "profile_dossier_snapshot.profile_input_summary must match the canonical release eval summary",
      {
        field: "profile_dossier_snapshot.profile_input_summary",
      },
    );
  }

  for (const laneKey of laneKeys) {
    const laneEntry = profileInputLaneSnapshot[laneKey];
    const dossierLaneEntry = profileDossierSnapshot.profile_input_lane_snapshot[laneKey];

    if (laneEntry.has_value !== dossierLaneEntry.has_value) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        "profile_dossier_snapshot.profile_input_lane_snapshot must match the canonical release eval lane snapshot",
        {
          field: `profile_dossier_snapshot.profile_input_lane_snapshot.${laneKey}.has_value`,
        },
      );
    }

    if (JSON.stringify(laneEntry.value) !== JSON.stringify(dossierLaneEntry.value)) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        "profile_dossier_snapshot.profile_input_lane_snapshot must match the canonical release eval lane snapshot",
        {
          field: `profile_dossier_snapshot.profile_input_lane_snapshot.${laneKey}.value`,
        },
      );
    }

    if (laneEntry.has_support !== dossierLaneEntry.has_support) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        "profile_dossier_snapshot.profile_input_lane_snapshot must match the canonical release eval lane snapshot",
        {
          field: `profile_dossier_snapshot.profile_input_lane_snapshot.${laneKey}.has_support`,
        },
      );
    }

    const laneEvidenceObjectIds = Array.isArray(laneEntry.evidence_object_ids)
      ? laneEntry.evidence_object_ids
      : [];
    const dossierEvidenceObjectIds = Array.isArray(dossierLaneEntry.evidence_object_ids)
      ? dossierLaneEntry.evidence_object_ids
      : [];

    if (JSON.stringify(laneEvidenceObjectIds) !== JSON.stringify(dossierEvidenceObjectIds)) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        "profile_dossier_snapshot.profile_input_lane_snapshot must match the canonical release eval lane snapshot",
        {
          field: `profile_dossier_snapshot.profile_input_lane_snapshot.${laneKey}.evidence_object_ids`,
        },
      );
    }

    if (
      JSON.stringify(dossierLaneEntry.supporting_exhibit_refs) !==
      JSON.stringify(expectedSupportingExhibitRefsByLane[laneKey])
    ) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        "profile_dossier_snapshot.profile_input_lane_snapshot must match the canonical dossier lane exhibit refs",
        {
          field: `profile_dossier_snapshot.profile_input_lane_snapshot.${laneKey}.supporting_exhibit_refs`,
        },
      );
    }

    if (
      JSON.stringify(dossierLaneEntry.supporting_reference_refs) !==
      JSON.stringify(expectedSupportingReferenceRefsByLane[laneKey])
    ) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        "profile_dossier_snapshot.profile_input_lane_snapshot must match the canonical dossier lane reference refs",
        {
          field: `profile_dossier_snapshot.profile_input_lane_snapshot.${laneKey}.supporting_reference_refs`,
        },
      );
    }

    if (
      JSON.stringify(dossierLaneEntry.related_issue_refs) !==
      JSON.stringify(expectedLaneIssueRefsByLane[laneKey])
    ) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        "profile_dossier_snapshot.profile_input_lane_snapshot must match the canonical dossier lane issue refs",
        {
          field: `profile_dossier_snapshot.profile_input_lane_snapshot.${laneKey}.related_issue_refs`,
        },
      );
    }

    if (
      JSON.stringify(dossierLaneEntry.related_section_refs) !==
      JSON.stringify(expectedLaneSectionRefsByLane[laneKey])
    ) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        "profile_dossier_snapshot.profile_input_lane_snapshot must match the canonical dossier lane section refs",
        {
          field: `profile_dossier_snapshot.profile_input_lane_snapshot.${laneKey}.related_section_refs`,
        },
      );
    }
  }

  if (
    JSON.stringify(profileDossierSnapshot.issue_index) !==
    JSON.stringify(expectedIssueIndex)
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "profile_dossier_snapshot.issue_index must match the canonical dossier issues",
      {
        field: "profile_dossier_snapshot.issue_index",
      },
    );
  }

  if (
    JSON.stringify(profileDossierSnapshot.section_index) !==
    JSON.stringify(expectedSectionIndex)
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "profile_dossier_snapshot.section_index must match the canonical dossier sections",
      {
        field: "profile_dossier_snapshot.section_index",
      },
    );
  }

  if (
    JSON.stringify(profileDossierSnapshot.evidence_reference_index) !==
    JSON.stringify(expectedEvidenceReferenceIndexWithExhibitRefs)
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "profile_dossier_snapshot.evidence_reference_index must match the canonical dossier evidence references",
      {
        field: "profile_dossier_snapshot.evidence_reference_index",
      },
    );
  }

  if (
    JSON.stringify(profileDossierSnapshot.evidence_exhibit_index) !==
    JSON.stringify(expectedEvidenceExhibitIndex)
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "profile_dossier_snapshot.evidence_exhibit_index must match the canonical dossier evidence exhibits",
      {
        field: "profile_dossier_snapshot.evidence_exhibit_index",
      },
    );
  }

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    release_eval_run_id: input.release_eval_run_id,
    evaluator_version: input.evaluator_version,
    release_gate: input.release_gate,
    release_gate_reason_code: input.release_gate_reason_code,
    release_eval_freshness: input.release_eval_freshness,
    release_eval_freshness_reason_code: input.release_eval_freshness_reason_code,
    profile_input_summary: input.profile_input_summary,
    profile_input_lane_snapshot: profileInputLaneSnapshot,
    profile_dossier_snapshot: profileDossierSnapshot,
  };
}

function validateCMDReleaseEvalProfileInputSummary(summary) {
  assertPlainObject(
    summary,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "profile_input_summary",
  );

  assertExactKeys(
    summary,
    cmdReleaseEvalSummaryRequiredKeys,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "profile_input_summary",
  );

  if (
    !Number.isInteger(summary.required_lane_count) ||
    summary.required_lane_count !== cmdReleaseEvalLaneKeys.length
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "required_lane_count must match the canonical lane count",
      {
        field: "profile_input_summary.required_lane_count",
      },
    );
  }

  if (
    !Number.isInteger(summary.lanes_with_value_count) ||
    summary.lanes_with_value_count < 0 ||
    summary.lanes_with_value_count > cmdReleaseEvalLaneKeys.length
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "lanes_with_value_count must be an integer within the canonical lane range",
      {
        field: "profile_input_summary.lanes_with_value_count",
      },
    );
  }

  if (
    !Number.isInteger(summary.lanes_with_support_count) ||
    summary.lanes_with_support_count < 0 ||
    summary.lanes_with_support_count > cmdReleaseEvalLaneKeys.length
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "lanes_with_support_count must be an integer within the canonical lane range",
      {
        field: "profile_input_summary.lanes_with_support_count",
      },
    );
  }

  validateCMDLaneKeyArray(
    summary.missing_value_lane_keys,
    "profile_input_summary.missing_value_lane_keys",
    "ERR_RELEASE_EVAL_RUN_INVALID",
  );
  validateCMDLaneKeyArray(
    summary.missing_support_lane_keys,
    "profile_input_summary.missing_support_lane_keys",
    "ERR_RELEASE_EVAL_RUN_INVALID",
  );
}

function validateCMDReleaseEvalProfileInputLaneSnapshot(snapshot) {
  assertPlainObject(
    snapshot,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "profile_input_lane_snapshot",
  );

  assertExactKeys(
    snapshot,
    cmdReleaseEvalLaneKeys,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "profile_input_lane_snapshot",
  );

  for (const laneKey of cmdReleaseEvalLaneKeys) {
    const entry = snapshot[laneKey];

    assertPlainObject(
      entry,
      "ERR_RELEASE_EVAL_RUN_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    assertAllowedKeys(
      entry,
      cmdReleaseEvalLaneEntryAllowedKeys,
      "ERR_RELEASE_EVAL_RUN_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    for (const requiredKey of cmdReleaseEvalLaneEntryRequiredKeys) {
      if (!(requiredKey in entry)) {
        throw createSchemaValidationError(
          "ERR_RELEASE_EVAL_RUN_INVALID",
          `${laneKey} is missing a required field`,
          {
            field: `profile_input_lane_snapshot.${laneKey}.${requiredKey}`,
          },
        );
      }
    }

    if (typeof entry.has_value !== "boolean") {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `${laneKey}.has_value must be a boolean`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_value`,
        },
      );
    }

    if (typeof entry.has_support !== "boolean") {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `${laneKey}.has_support must be a boolean`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_support`,
        },
      );
    }

    if ("evidence_object_ids" in entry) {
      validateEvidenceObjectIds(
        entry.evidence_object_ids,
        `profile_input_lane_snapshot.${laneKey}.evidence_object_ids`,
        "ERR_RELEASE_EVAL_RUN_INVALID",
      );
    }
  }

  return snapshot;
}

function validateCMDReleaseEvalRun(input) {
  assertPlainObject(input, "ERR_RELEASE_EVAL_RUN_INVALID", "input");

  const requiredRootKeys = cmdReleaseEvalRun.required;
  assertAllowedKeys(
    input,
    cmdReleaseEvalAllowedRootKeys,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "input",
  );

  for (const requiredRootKey of requiredRootKeys) {
    if (!Object.hasOwn(input, requiredRootKey)) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `input.${requiredRootKey} is required`,
        { field: `input.${requiredRootKey}` },
      );
    }
  }

  if (
    input.jurisdiction_profile_key !==
    cmdReleaseEvalRun.properties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.jurisdiction_profile_key,
      },
    );
  }

  for (const field of [
    "release_eval_run_id",
    "evaluator_version",
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
  ]) {
    if (typeof input[field] !== "string" || input[field].length === 0) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  validateCMDReleaseEvalProfileInputSummary(input.profile_input_summary);
  const profileInputSummary = {
    required_lane_count: input.profile_input_summary.required_lane_count,
    lanes_with_value_count: input.profile_input_summary.lanes_with_value_count,
    missing_value_lane_keys: [...input.profile_input_summary.missing_value_lane_keys],
    lanes_with_support_count: input.profile_input_summary.lanes_with_support_count,
    missing_support_lane_keys: [...input.profile_input_summary.missing_support_lane_keys],
  };
  const profileInputLaneSnapshot = validateCMDReleaseEvalProfileInputLaneSnapshot(
    input.profile_input_lane_snapshot,
  );
  const missingValueFromSnapshot = cmdReleaseEvalLaneKeys.filter(
    (laneKey) => !profileInputLaneSnapshot[laneKey].has_value,
  );
  const missingSupportFromSnapshot = cmdReleaseEvalLaneKeys.filter(
    (laneKey) => !profileInputLaneSnapshot[laneKey].has_support,
  );

  if (
    input.profile_input_summary.lanes_with_value_count !==
    cmdReleaseEvalLaneKeys.length - missingValueFromSnapshot.length
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "lanes_with_value_count must match the canonical lane value count",
      {
        field: "profile_input_summary.lanes_with_value_count",
      },
    );
  }

  if (
    JSON.stringify(input.profile_input_summary.missing_value_lane_keys) !==
    JSON.stringify(missingValueFromSnapshot)
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "missing_value_lane_keys must match the canonical missing-value lanes",
      {
        field: "profile_input_summary.missing_value_lane_keys",
      },
    );
  }

  if (
    input.profile_input_summary.lanes_with_support_count !==
    cmdReleaseEvalLaneKeys.length - missingSupportFromSnapshot.length
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "lanes_with_support_count must match the canonical lane support count",
      {
        field: "profile_input_summary.lanes_with_support_count",
      },
    );
  }

  if (
    JSON.stringify(input.profile_input_summary.missing_support_lane_keys) !==
    JSON.stringify(missingSupportFromSnapshot)
  ) {
    throw createSchemaValidationError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "missing_support_lane_keys must match the canonical unsupported lanes",
      {
        field: "profile_input_summary.missing_support_lane_keys",
      },
    );
  }

  const validatedRun = {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    release_eval_run_id: input.release_eval_run_id,
    evaluator_version: input.evaluator_version,
    release_gate: input.release_gate,
    release_gate_reason_code: input.release_gate_reason_code,
    release_eval_freshness: input.release_eval_freshness,
    release_eval_freshness_reason_code: input.release_eval_freshness_reason_code,
    profile_input_summary: profileInputSummary,
    profile_input_lane_snapshot: profileInputLaneSnapshot,
  };

  if (Object.hasOwn(input, "profile_dossier_snapshot")) {
    const profileDossierSnapshot = validateCMDProfileDossierSnapshot(
      input.profile_dossier_snapshot,
      "ERR_RELEASE_EVAL_RUN_INVALID",
    );

    for (const field of [
      "jurisdiction_profile_key",
      "release_gate",
      "release_gate_reason_code",
      "release_eval_freshness",
      "release_eval_freshness_reason_code",
      "evaluator_version",
    ]) {
      if (profileDossierSnapshot[field] !== validatedRun[field]) {
        throw createSchemaValidationError(
          "ERR_RELEASE_EVAL_RUN_INVALID",
          `profile_dossier_snapshot.${field} must match ${field}`,
          { field: `profile_dossier_snapshot.${field}` },
        );
      }
    }

    if (
      toCanonicalJson(profileDossierSnapshot.profile_input_summary) !==
      toCanonicalJson(validatedRun.profile_input_summary)
    ) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        "profile_dossier_snapshot.profile_input_summary must match profile_input_summary",
        { field: "profile_dossier_snapshot.profile_input_summary" },
      );
    }

    if (
      toCanonicalJson(profileDossierSnapshot.profile_input_lane_snapshot) !==
      toCanonicalJson(validatedRun.profile_input_lane_snapshot)
    ) {
      throw createSchemaValidationError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        "profile_dossier_snapshot.profile_input_lane_snapshot must match profile_input_lane_snapshot",
        { field: "profile_dossier_snapshot.profile_input_lane_snapshot" },
      );
    }

    validatedRun.profile_dossier_snapshot = profileDossierSnapshot;
  }

  return validatedRun;
}

const sweBodelningReleaseEvalValidator = Object.freeze({
  jurisdiction_profile_key:
    sweBodelningReleaseEvalRun.properties.jurisdiction_profile_key.const,
  validateReleaseEvalRun: validateSWEBodelningReleaseEvalRun,
});

const cmdReleaseEvalValidator = Object.freeze({
  jurisdiction_profile_key:
    cmdReleaseEvalRun.properties.jurisdiction_profile_key.const,
  validateReleaseEvalRun: validateCMDReleaseEvalRun,
});

const releaseEvalValidatorRegistry = Object.freeze({
  [sweBodelningReleaseEvalValidator.jurisdiction_profile_key]:
    sweBodelningReleaseEvalValidator,
  [cmdReleaseEvalValidator.jurisdiction_profile_key]: cmdReleaseEvalValidator,
});

function getReleaseEvalValidator(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return releaseEvalValidatorRegistry[jurisdictionProfileKey] ?? null;
}

function validateReleaseEvalRun(input) {
  if (
    input &&
    typeof input === "object" &&
    !Array.isArray(input) &&
    typeof input.jurisdiction_profile_key === "string" &&
    input.jurisdiction_profile_key.length > 0
  ) {
    const validator = getReleaseEvalValidator(input.jurisdiction_profile_key);

    if (validator) {
      return validator.validateReleaseEvalRun(input);
    }
  }

  const defaultValidator = Object.values(releaseEvalValidatorRegistry)[0];
  return defaultValidator.validateReleaseEvalRun(input);
}

function validateSWEBodelningProfileDossierSnapshot(
  input,
  errorCode = "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");

  assertExactKeys(
    input,
    dossierSnapshotRequiredKeys,
    errorCode,
    "input",
  );

  if (
    input.jurisdiction_profile_key !==
    sweBodelningProfileDossierSnapshot.properties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.jurisdiction_profile_key,
      },
    );
  }

  for (const field of [
    "projection_version",
    "dossier_fingerprint",
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
    "evaluator_version",
  ]) {
    if (typeof input[field] !== "string" || input[field].length === 0) {
      throw createSchemaValidationError(
        errorCode,
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  assertPlainObject(input.canonical_source, errorCode, "canonical_source");
  assertExactKeys(
    input.canonical_source,
    dossierCanonicalSourceRequiredKeys,
    errorCode,
    "canonical_source",
  );

  for (const field of ["release_eval_run_id", "evaluator_version", "persisted_at"]) {
    if (
      typeof input.canonical_source[field] !== "string" ||
      input.canonical_source[field].length === 0
    ) {
      throw createSchemaValidationError(
        errorCode,
        `canonical_source.${field} must be a non-empty string`,
        { field: `canonical_source.${field}` },
      );
    }
  }

  if (
    input.canonical_source.jurisdiction_profile_key !==
    dossierCanonicalSourceProperties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "canonical_source.jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.canonical_source.jurisdiction_profile_key,
      },
    );
  }

  validateReleaseEvalProfileInputSummary(input.profile_input_summary);
  const dossierProfileInputLaneSnapshot = validateDossierProfileInputLaneSnapshot(
    input.profile_input_lane_snapshot,
    errorCode,
  );
  const issueIndex = validateDossierIssueIndex(input.issue_index, errorCode);
  const evidenceReferenceIndex = validateDossierEvidenceReferenceIndex(
    input.evidence_reference_index,
    errorCode,
  );
  const evidenceExhibitIndex = validateDossierEvidenceExhibitIndex(
    input.evidence_exhibit_index,
    errorCode,
  );
  const sectionIndex = validateDossierSectionIndex(input.section_index, errorCode);

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    projection_version: input.projection_version,
    dossier_fingerprint: input.dossier_fingerprint,
    canonical_source: input.canonical_source,
    release_gate: input.release_gate,
    release_gate_reason_code: input.release_gate_reason_code,
    release_eval_freshness: input.release_eval_freshness,
    release_eval_freshness_reason_code: input.release_eval_freshness_reason_code,
    evaluator_version: input.evaluator_version,
    profile_input_summary: input.profile_input_summary,
    profile_input_lane_snapshot: dossierProfileInputLaneSnapshot,
    evidence_reference_index: evidenceReferenceIndex,
    evidence_exhibit_index: evidenceExhibitIndex,
    issue_index: issueIndex,
    section_index: sectionIndex,
  };
}

function validateSWEBodelningProfileDossierProjection(
  input,
  errorCode = "ERR_PROFILE_DOSSIER_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");

  assertExactKeys(
    input,
    dossierProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const snapshot = validateSWEBodelningProfileDossierSnapshot(
    {
      jurisdiction_profile_key: input.jurisdiction_profile_key,
      projection_version: input.projection_version,
      dossier_fingerprint: input.dossier_fingerprint,
      canonical_source: input.canonical_source,
      release_gate: input.release_gate,
      release_gate_reason_code: input.release_gate_reason_code,
      release_eval_freshness: input.release_eval_freshness,
      release_eval_freshness_reason_code: input.release_eval_freshness_reason_code,
      evaluator_version: input.evaluator_version,
      profile_input_summary: input.profile_input_summary,
      profile_input_lane_snapshot: input.profile_input_lane_snapshot,
      evidence_reference_index: input.evidence_reference_index,
      evidence_exhibit_index: input.evidence_exhibit_index,
      issue_index: input.issue_index,
      section_index: input.section_index,
    },
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    sweBodelningProfileDossierProjection.properties.snapshot_status.required,
    errorCode,
    "snapshot_status",
  );

  if (
    !["persisted-current", "fallback-reprojection"].includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    input.snapshot_status.snapshot_projection_version_found !== null &&
    (typeof input.snapshot_status.snapshot_projection_version_found !== "string" ||
      input.snapshot_status.snapshot_projection_version_found.length === 0)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_projection_version_found must be null or a non-empty string",
      { field: "snapshot_status.snapshot_projection_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_projection_version !== "string" ||
    input.snapshot_status.current_projection_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_projection_version must be a non-empty string",
      { field: "snapshot_status.current_projection_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...snapshot,
    snapshot_status: input.snapshot_status,
  };
}

function validateSWEBodelningExportPackage(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackageRequiredKeys, errorCode, "input");

  if (
    input.jurisdiction_profile_key !==
    sweBodelningExportPackage.properties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.jurisdiction_profile_key,
      },
    );
  }

  for (const field of ["export_version", "dossier_fingerprint", "generated_at"]) {
    if (typeof input[field] !== "string" || input[field].length === 0) {
      throw createSchemaValidationError(
        errorCode,
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  assertPlainObject(input.manifest, errorCode, "manifest");
  assertExactKeys(
    input.manifest,
    exportPackageManifestRequiredKeys,
    errorCode,
    "manifest",
  );

  if (!Array.isArray(input.manifest.included_top_level_artifacts)) {
    throw createSchemaValidationError(
      errorCode,
      "manifest.included_top_level_artifacts must be an array",
      { field: "manifest.included_top_level_artifacts" },
    );
  }

  if (input.manifest.included_top_level_artifacts.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "manifest.included_top_level_artifacts must not be empty",
      { field: "manifest.included_top_level_artifacts" },
    );
  }

  const uniqueArtifacts = new Set(input.manifest.included_top_level_artifacts);
  if (uniqueArtifacts.size !== input.manifest.included_top_level_artifacts.length) {
    throw createSchemaValidationError(
      errorCode,
      "manifest.included_top_level_artifacts must not contain duplicates",
      { field: "manifest.included_top_level_artifacts" },
    );
  }

  for (const artifact of input.manifest.included_top_level_artifacts) {
    if (!exportPackageManifestArtifactValues.includes(artifact)) {
      throw createSchemaValidationError(
        errorCode,
        "manifest.included_top_level_artifacts contains an unknown artifact",
        {
          field: "manifest.included_top_level_artifacts",
          artifact,
        },
      );
    }
  }

  const profileDossierSnapshot = validateSWEBodelningProfileDossierSnapshot(
    input.profile_dossier_snapshot,
    errorCode,
  );

  assertPlainObject(input.canonical_source, errorCode, "canonical_source");
  assertExactKeys(
    input.canonical_source,
    dossierCanonicalSourceRequiredKeys,
    errorCode,
    "canonical_source",
  );

  for (const field of dossierCanonicalSourceRequiredKeys) {
    if (input.canonical_source[field] !== profileDossierSnapshot.canonical_source[field]) {
      throw createSchemaValidationError(
        errorCode,
        `canonical_source.${field} must match profile_dossier_snapshot.canonical_source.${field}`,
        { field: `canonical_source.${field}` },
      );
    }
  }

  if (input.dossier_fingerprint !== profileDossierSnapshot.dossier_fingerprint) {
    throw createSchemaValidationError(
      errorCode,
      "dossier_fingerprint must match profile_dossier_snapshot.dossier_fingerprint",
      { field: "dossier_fingerprint" },
    );
  }

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    export_version: input.export_version,
    dossier_fingerprint: input.dossier_fingerprint,
    canonical_source: profileDossierSnapshot.canonical_source,
    profile_dossier_snapshot: profileDossierSnapshot,
    generated_at: input.generated_at,
    manifest: {
      included_top_level_artifacts: [
        ...input.manifest.included_top_level_artifacts,
      ],
    },
  };
}

function validateCMDDossierProfileInputSummary(summary, errorCode) {
  assertPlainObject(summary, errorCode, "profile_input_summary");
  assertExactKeys(
    summary,
    cmdDossierSummaryRequiredKeys,
    errorCode,
    "profile_input_summary",
  );

  if (
    !Number.isInteger(summary.required_lane_count) ||
    summary.required_lane_count !== cmdDossierLaneKeys.length
  ) {
    throw createSchemaValidationError(
      errorCode,
      "required_lane_count must match the canonical lane count",
      {
        field: "profile_input_summary.required_lane_count",
      },
    );
  }

  if (
    !Number.isInteger(summary.lanes_with_value_count) ||
    summary.lanes_with_value_count < 0 ||
    summary.lanes_with_value_count > cmdDossierLaneKeys.length
  ) {
    throw createSchemaValidationError(
      errorCode,
      "lanes_with_value_count must be an integer within the canonical lane range",
      {
        field: "profile_input_summary.lanes_with_value_count",
      },
    );
  }

  if (
    !Number.isInteger(summary.lanes_with_support_count) ||
    summary.lanes_with_support_count < 0 ||
    summary.lanes_with_support_count > cmdDossierLaneKeys.length
  ) {
    throw createSchemaValidationError(
      errorCode,
      "lanes_with_support_count must be an integer within the canonical lane range",
      {
        field: "profile_input_summary.lanes_with_support_count",
      },
    );
  }

  validateCMDLaneKeyArray(
    summary.missing_value_lane_keys,
    "profile_input_summary.missing_value_lane_keys",
    errorCode,
  );
  validateCMDLaneKeyArray(
    summary.missing_support_lane_keys,
    "profile_input_summary.missing_support_lane_keys",
    errorCode,
  );
}

function validateCMDDossierProfileInputLaneSnapshot(snapshot, errorCode) {
  assertPlainObject(snapshot, errorCode, "profile_input_lane_snapshot");
  assertExactKeys(
    snapshot,
    cmdDossierLaneKeys,
    errorCode,
    "profile_input_lane_snapshot",
  );

  const validatedSnapshot = {};

  for (const laneKey of cmdDossierLaneKeys) {
    const entry = snapshot[laneKey];

    assertPlainObject(entry, errorCode, `profile_input_lane_snapshot.${laneKey}`);
    assertAllowedKeys(
      entry,
      cmdDossierLaneEntryAllowedKeys,
      errorCode,
      `profile_input_lane_snapshot.${laneKey}`,
    );

    for (const requiredKey of cmdDossierLaneEntryRequiredKeys) {
      if (!(requiredKey in entry)) {
        throw createSchemaValidationError(
          errorCode,
          `${laneKey} is missing a required field`,
          {
            field: `profile_input_lane_snapshot.${laneKey}.${requiredKey}`,
          },
        );
      }
    }

    if (typeof entry.has_value !== "boolean") {
      throw createSchemaValidationError(
        errorCode,
        `${laneKey}.has_value must be a boolean`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_value`,
        },
      );
    }

    if (typeof entry.has_support !== "boolean") {
      throw createSchemaValidationError(
        errorCode,
        `${laneKey}.has_support must be a boolean`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_support`,
        },
      );
    }

    if ("evidence_object_ids" in entry) {
      validateEvidenceObjectIds(
        entry.evidence_object_ids,
        `profile_input_lane_snapshot.${laneKey}.evidence_object_ids`,
        errorCode,
      );
    }

    const evidenceCount = Array.isArray(entry.evidence_object_ids)
      ? entry.evidence_object_ids.length
      : 0;
    if (entry.has_support !== (evidenceCount > 0)) {
      throw createSchemaValidationError(
        errorCode,
        `${laneKey}.has_support must match evidence_object_ids`,
        {
          field: `profile_input_lane_snapshot.${laneKey}.has_support`,
        },
      );
    }

    validatedSnapshot[laneKey] = {
      has_value: entry.has_value,
      value: entry.value,
      has_support: entry.has_support,
    };

    if ("evidence_object_ids" in entry) {
      validatedSnapshot[laneKey].evidence_object_ids = [...entry.evidence_object_ids];
    }
  }

  return validatedSnapshot;
}

function validateCMDProfileDossierSnapshot(
  input,
  errorCode = "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    cmdDossierSnapshotRequiredKeys,
    errorCode,
    "input",
  );

  if (
    input.jurisdiction_profile_key !==
    cmdProfileDossierSnapshot.properties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.jurisdiction_profile_key,
      },
    );
  }

  for (const field of [
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
    "evaluator_version",
  ]) {
    if (typeof input[field] !== "string" || input[field].length === 0) {
      throw createSchemaValidationError(
        errorCode,
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  validateCMDDossierProfileInputSummary(input.profile_input_summary, errorCode);

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    release_gate: input.release_gate,
    release_gate_reason_code: input.release_gate_reason_code,
    release_eval_freshness: input.release_eval_freshness,
    release_eval_freshness_reason_code: input.release_eval_freshness_reason_code,
    evaluator_version: input.evaluator_version,
    profile_input_summary: input.profile_input_summary,
    profile_input_lane_snapshot: validateCMDDossierProfileInputLaneSnapshot(
      input.profile_input_lane_snapshot,
      errorCode,
    ),
  };
}

function validateCMDProfileDossierProjection(
  input,
  errorCode = "ERR_PROFILE_DOSSIER_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    cmdDossierProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const snapshot = validateCMDProfileDossierSnapshot(
    {
      jurisdiction_profile_key: input.jurisdiction_profile_key,
      release_gate: input.release_gate,
      release_gate_reason_code: input.release_gate_reason_code,
      release_eval_freshness: input.release_eval_freshness,
      release_eval_freshness_reason_code:
        input.release_eval_freshness_reason_code,
      evaluator_version: input.evaluator_version,
      profile_input_summary: input.profile_input_summary,
      profile_input_lane_snapshot: input.profile_input_lane_snapshot,
    },
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    cmdDossierProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !cmdDossierProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    input.snapshot_status.snapshot_projection_version_found !== null &&
    (typeof input.snapshot_status.snapshot_projection_version_found !== "string" ||
      input.snapshot_status.snapshot_projection_version_found.length === 0)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_projection_version_found must be null or a non-empty string",
      { field: "snapshot_status.snapshot_projection_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_projection_version !== "string" ||
    input.snapshot_status.current_projection_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_projection_version must be a non-empty string",
      { field: "snapshot_status.current_projection_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...snapshot,
    snapshot_status: input.snapshot_status,
  };
}

function validateCMDProfileDossierSnapshotForExportPackage(input, errorCode) {
  assertPlainObject(input, errorCode, "profile_dossier_snapshot");
  assertExactKeys(
    input,
    cmdDossierSnapshotRequiredKeys,
    errorCode,
    "profile_dossier_snapshot",
  );

  if (
    input.jurisdiction_profile_key !==
    cmdProfileDossierSnapshot.properties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.jurisdiction_profile_key,
      },
    );
  }

  for (const field of [
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
    "evaluator_version",
  ]) {
    if (typeof input[field] !== "string" || input[field].length === 0) {
      throw createSchemaValidationError(
        errorCode,
        `profile_dossier_snapshot.${field} must be a non-empty string`,
        { field: `profile_dossier_snapshot.${field}` },
      );
    }
  }

  validateCMDDossierProfileInputSummary(input.profile_input_summary, errorCode);
  const profileInputLaneSnapshot = validateCMDDossierProfileInputLaneSnapshot(
    input.profile_input_lane_snapshot,
    errorCode,
  );

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    release_gate: input.release_gate,
    release_gate_reason_code: input.release_gate_reason_code,
    release_eval_freshness: input.release_eval_freshness,
    release_eval_freshness_reason_code: input.release_eval_freshness_reason_code,
    evaluator_version: input.evaluator_version,
    profile_input_summary: input.profile_input_summary,
    profile_input_lane_snapshot: profileInputLaneSnapshot,
  };
}

function validateCMDExportPackage(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, cmdExportPackageRequiredKeys, errorCode, "input");

  if (
    input.jurisdiction_profile_key !==
    cmdExportPackage.properties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.jurisdiction_profile_key,
      },
    );
  }

  for (const field of ["export_version", "dossier_fingerprint", "generated_at"]) {
    if (typeof input[field] !== "string" || input[field].length === 0) {
      throw createSchemaValidationError(
        errorCode,
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  assertPlainObject(input.canonical_source, errorCode, "canonical_source");
  assertExactKeys(
    input.canonical_source,
    cmdExportPackageCanonicalSourceRequiredKeys,
    errorCode,
    "canonical_source",
  );

  for (const field of cmdExportPackageCanonicalSourceRequiredKeys) {
    if (
      typeof input.canonical_source[field] !== "string" ||
      input.canonical_source[field].length === 0
    ) {
      throw createSchemaValidationError(
        errorCode,
        `canonical_source.${field} must be a non-empty string`,
        { field: `canonical_source.${field}` },
      );
    }
  }

  if (
    input.canonical_source.jurisdiction_profile_key !==
    cmdExportPackage.$defs.exportPackageCanonicalSource.properties
      .jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.canonical_source.jurisdiction_profile_key,
      },
    );
  }

  assertPlainObject(input.manifest, errorCode, "manifest");
  assertExactKeys(
    input.manifest,
    cmdExportPackageManifestRequiredKeys,
    errorCode,
    "manifest",
  );

  if (!Array.isArray(input.manifest.included_top_level_artifacts)) {
    throw createSchemaValidationError(
      errorCode,
      "manifest.included_top_level_artifacts must be an array",
      { field: "manifest.included_top_level_artifacts" },
    );
  }

  if (input.manifest.included_top_level_artifacts.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "manifest.included_top_level_artifacts must not be empty",
      { field: "manifest.included_top_level_artifacts" },
    );
  }

  const uniqueArtifacts = new Set(input.manifest.included_top_level_artifacts);
  if (uniqueArtifacts.size !== input.manifest.included_top_level_artifacts.length) {
    throw createSchemaValidationError(
      errorCode,
      "manifest.included_top_level_artifacts must not contain duplicates",
      { field: "manifest.included_top_level_artifacts" },
    );
  }

  for (const artifact of input.manifest.included_top_level_artifacts) {
    if (!cmdExportPackageManifestArtifactValues.includes(artifact)) {
      throw createSchemaValidationError(
        errorCode,
        "manifest.included_top_level_artifacts contains an unknown artifact",
        {
          field: "manifest.included_top_level_artifacts",
          artifact,
        },
      );
    }
  }

  const profileDossierSnapshot = validateCMDProfileDossierSnapshotForExportPackage(
    input.profile_dossier_snapshot,
    errorCode,
  );

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    export_version: input.export_version,
    dossier_fingerprint: input.dossier_fingerprint,
    canonical_source: {
      release_eval_run_id: input.canonical_source.release_eval_run_id,
      evaluator_version: input.canonical_source.evaluator_version,
      jurisdiction_profile_key: input.canonical_source.jurisdiction_profile_key,
      persisted_at: input.canonical_source.persisted_at,
    },
    profile_dossier_snapshot: profileDossierSnapshot,
    generated_at: input.generated_at,
    manifest: {
      included_top_level_artifacts: [
        ...input.manifest.included_top_level_artifacts,
      ],
    },
  };
}

const sweBodelningExportPackageValidator = Object.freeze({
  jurisdiction_profile_key:
    sweBodelningExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackage: validateSWEBodelningExportPackage,
});

const cmdExportPackageValidator = Object.freeze({
  jurisdiction_profile_key: cmdExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackage: validateCMDExportPackage,
});

const exportPackageValidatorRegistry = Object.freeze({
  [sweBodelningExportPackageValidator.jurisdiction_profile_key]:
    sweBodelningExportPackageValidator,
  [cmdExportPackageValidator.jurisdiction_profile_key]: cmdExportPackageValidator,
});

function getExportPackageValidator(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackageValidatorRegistry[jurisdictionProfileKey] ?? null;
}

function validateExportPackage(input) {
  if (
    input &&
    typeof input === "object" &&
    !Array.isArray(input) &&
    typeof input.jurisdiction_profile_key === "string" &&
    input.jurisdiction_profile_key.length > 0
  ) {
    const validator = getExportPackageValidator(input.jurisdiction_profile_key);

    if (validator) {
      return validator.validateExportPackage(input);
    }
  }

  const defaultValidator = Object.values(exportPackageValidatorRegistry)[0];
  return defaultValidator.validateExportPackage(input);
}

function validateSWEBodelningExportPackageBundleManifest(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackageBundleManifestRequiredKeys, errorCode, "input");

  if (
    input.jurisdiction_profile_key !==
    sweBodelningExportPackageBundleManifest.properties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.jurisdiction_profile_key,
      },
    );
  }

  for (const field of [
    "package_version",
    "export_version",
    "dossier_fingerprint",
    "generated_at",
  ]) {
    if (typeof input[field] !== "string" || input[field].length === 0) {
      throw createSchemaValidationError(
        errorCode,
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  assertPlainObject(input.canonical_source, errorCode, "canonical_source");
  assertExactKeys(
    input.canonical_source,
    dossierCanonicalSourceRequiredKeys,
    errorCode,
    "canonical_source",
  );

  for (const field of dossierCanonicalSourceRequiredKeys) {
    if (
      typeof input.canonical_source[field] !== "string" ||
      input.canonical_source[field].length === 0
    ) {
      throw createSchemaValidationError(
        errorCode,
        `canonical_source.${field} must be a non-empty string`,
        { field: `canonical_source.${field}` },
      );
    }
  }

  if (!Array.isArray(input.artifacts)) {
    throw createSchemaValidationError(
      errorCode,
      "artifacts must be an array",
      { field: "artifacts" },
    );
  }

  if (input.artifacts.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "artifacts must not be empty",
      { field: "artifacts" },
    );
  }

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    package_version: input.package_version,
    export_version: input.export_version,
    dossier_fingerprint: input.dossier_fingerprint,
    canonical_source: { ...input.canonical_source },
    generated_at: input.generated_at,
    artifacts: input.artifacts.map((artifact, index) => {
      const artifactPath = `artifacts[${index}]`;

      assertPlainObject(artifact, errorCode, artifactPath);
      assertExactKeys(
        artifact,
        exportPackageBundleManifestArtifactRequiredKeys,
        errorCode,
        artifactPath,
      );

      for (const field of exportPackageBundleManifestArtifactRequiredKeys) {
        if (typeof artifact[field] !== "string" || artifact[field].length === 0) {
          throw createSchemaValidationError(
            errorCode,
            `${artifactPath}.${field} must be a non-empty string`,
            { field: `${artifactPath}.${field}` },
          );
        }
      }

      return {
        artifact_type: artifact.artifact_type,
        filename: artifact.filename,
        content_type: artifact.content_type,
        encoding: artifact.encoding,
      };
    }),
  };
}

function validateCMDExportPackageBundleManifest(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, cmdExportPackageBundleManifestRequiredKeys, errorCode, "input");

  if (
    input.jurisdiction_profile_key !==
    cmdExportPackageBundleManifest.properties.jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.jurisdiction_profile_key,
      },
    );
  }

  for (const field of [
    "package_version",
    "export_version",
    "dossier_fingerprint",
    "generated_at",
  ]) {
    if (typeof input[field] !== "string" || input[field].length === 0) {
      throw createSchemaValidationError(
        errorCode,
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  assertPlainObject(input.canonical_source, errorCode, "canonical_source");
  assertExactKeys(
    input.canonical_source,
    cmdExportPackageCanonicalSourceRequiredKeys,
    errorCode,
    "canonical_source",
  );

  for (const field of cmdExportPackageCanonicalSourceRequiredKeys) {
    if (
      typeof input.canonical_source[field] !== "string" ||
      input.canonical_source[field].length === 0
    ) {
      throw createSchemaValidationError(
        errorCode,
        `canonical_source.${field} must be a non-empty string`,
        { field: `canonical_source.${field}` },
      );
    }
  }

  if (
    input.canonical_source.jurisdiction_profile_key !==
    cmdExportPackage.$defs.exportPackageCanonicalSource.properties
      .jurisdiction_profile_key.const
  ) {
    throw createSchemaValidationError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: input.canonical_source.jurisdiction_profile_key,
      },
    );
  }

  if (!Array.isArray(input.artifacts)) {
    throw createSchemaValidationError(
      errorCode,
      "artifacts must be an array",
      { field: "artifacts" },
    );
  }

  if (input.artifacts.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "artifacts must not be empty",
      { field: "artifacts" },
    );
  }

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    package_version: input.package_version,
    export_version: input.export_version,
    dossier_fingerprint: input.dossier_fingerprint,
    canonical_source: { ...input.canonical_source },
    generated_at: input.generated_at,
    artifacts: input.artifacts.map((artifact, index) => {
      const artifactPath = `artifacts[${index}]`;

      assertPlainObject(artifact, errorCode, artifactPath);
      assertExactKeys(
        artifact,
        cmdExportPackageBundleManifestArtifactRequiredKeys,
        errorCode,
        artifactPath,
      );

      for (const field of cmdExportPackageBundleManifestArtifactRequiredKeys) {
        if (typeof artifact[field] !== "string" || artifact[field].length === 0) {
          throw createSchemaValidationError(
            errorCode,
            `${artifactPath}.${field} must be a non-empty string`,
            { field: `${artifactPath}.${field}` },
          );
        }
      }

      return {
        artifact_type: artifact.artifact_type,
        filename: artifact.filename,
        content_type: artifact.content_type,
        encoding: artifact.encoding,
      };
    }),
  };
}

const sweBodelningExportPackageBundleManifestValidator = Object.freeze({
  jurisdiction_profile_key:
    sweBodelningExportPackageBundleManifest.properties.jurisdiction_profile_key.const,
  validateExportPackageBundleManifest: validateSWEBodelningExportPackageBundleManifest,
});

const cmdExportPackageBundleManifestValidator = Object.freeze({
  jurisdiction_profile_key:
    cmdExportPackageBundleManifest.properties.jurisdiction_profile_key.const,
  validateExportPackageBundleManifest: validateCMDExportPackageBundleManifest,
});

const exportPackageBundleManifestValidatorRegistry = Object.freeze({
  [sweBodelningExportPackageBundleManifestValidator.jurisdiction_profile_key]:
    sweBodelningExportPackageBundleManifestValidator,
  [cmdExportPackageBundleManifestValidator.jurisdiction_profile_key]:
    cmdExportPackageBundleManifestValidator,
});

function getExportPackageBundleManifestValidator(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackageBundleManifestValidatorRegistry[jurisdictionProfileKey] ?? null;
}

function validateExportPackageBundleManifest(input) {
  if (
    input &&
    typeof input === "object" &&
    !Array.isArray(input) &&
    typeof input.jurisdiction_profile_key === "string" &&
    input.jurisdiction_profile_key.length > 0
  ) {
    const validator = getExportPackageBundleManifestValidator(
      input.jurisdiction_profile_key,
    );

    if (validator) {
      return validator.validateExportPackageBundleManifest(input);
    }
  }

  const defaultValidator = Object.values(
    exportPackageBundleManifestValidatorRegistry,
  )[0];
  return defaultValidator.validateExportPackageBundleManifest(input);
}

function validateSWEBodelningExportPackageBundleArchiveArtifact(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageBundleArchiveArtifactRequiredKeys,
    errorCode,
    "input",
  );

  if (
    input.artifact_type !==
    sweBodelningExportPackageBundleArchiveArtifact.properties.artifact_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "artifact_type is not supported",
      { field: "artifact_type" },
    );
  }

  if (typeof input.filename !== "string" || input.filename.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a non-empty string",
      { field: "filename" },
    );
  }

  if (!input.filename.endsWith(".zip")) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a ZIP archive filename",
      { field: "filename" },
    );
  }

  if (
    input.content_type !==
    sweBodelningExportPackageBundleArchiveArtifact.properties.content_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "content_type is not supported",
      { field: "content_type" },
    );
  }

  if (
    input.encoding !==
    sweBodelningExportPackageBundleArchiveArtifact.properties.encoding.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "encoding is not supported",
      { field: "encoding" },
    );
  }

  if (typeof input.body_base64 !== "string" || input.body_base64.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a non-empty string",
      { field: "body_base64" },
    );
  }

  if (
    input.body_base64.length % 4 !== 0 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(input.body_base64)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a base64-encoded string",
      { field: "body_base64" },
    );
  }

  if (typeof input.package_version !== "string" || input.package_version.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "package_version must be a non-empty string",
      { field: "package_version" },
    );
  }

  if (
    typeof input.bundle_manifest_fingerprint !== "string" ||
    input.bundle_manifest_fingerprint.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "bundle_manifest_fingerprint must be a non-empty string",
      { field: "bundle_manifest_fingerprint" },
    );
  }

  return {
    artifact_type: input.artifact_type,
    filename: input.filename,
    content_type: input.content_type,
    encoding: input.encoding,
    body_base64: input.body_base64,
    package_version: input.package_version,
    bundle_manifest_fingerprint: input.bundle_manifest_fingerprint,
  };
}

function validateCMDExportPackageBundleArchiveArtifact(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    cmdExportPackageBundleArchiveArtifactRequiredKeys,
    errorCode,
    "input",
  );

  if (
    input.artifact_type !==
    cmdExportPackageBundleArchiveArtifact.properties.artifact_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "artifact_type is not supported",
      { field: "artifact_type" },
    );
  }

  if (typeof input.filename !== "string" || input.filename.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a non-empty string",
      { field: "filename" },
    );
  }

  if (!input.filename.endsWith(".zip")) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a ZIP archive filename",
      { field: "filename" },
    );
  }

  if (
    input.content_type !==
    cmdExportPackageBundleArchiveArtifact.properties.content_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "content_type is not supported",
      { field: "content_type" },
    );
  }

  if (
    input.encoding !==
    cmdExportPackageBundleArchiveArtifact.properties.encoding.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "encoding is not supported",
      { field: "encoding" },
    );
  }

  if (typeof input.body_base64 !== "string" || input.body_base64.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a non-empty string",
      { field: "body_base64" },
    );
  }

  if (
    input.body_base64.length % 4 !== 0 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(input.body_base64)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a base64-encoded string",
      { field: "body_base64" },
    );
  }

  if (typeof input.package_version !== "string" || input.package_version.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "package_version must be a non-empty string",
      { field: "package_version" },
    );
  }

  if (
    typeof input.bundle_manifest_fingerprint !== "string" ||
    input.bundle_manifest_fingerprint.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "bundle_manifest_fingerprint must be a non-empty string",
      { field: "bundle_manifest_fingerprint" },
    );
  }

  return {
    artifact_type: input.artifact_type,
    filename: input.filename,
    content_type: input.content_type,
    encoding: input.encoding,
    body_base64: input.body_base64,
    package_version: input.package_version,
    bundle_manifest_fingerprint: input.bundle_manifest_fingerprint,
  };
}

const sweBodelningExportPackageBundleArchiveArtifactValidator = Object.freeze({
  jurisdiction_profile_key: sweBodelningExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackageBundleArchiveArtifact:
    validateSWEBodelningExportPackageBundleArchiveArtifact,
});

const cmdExportPackageBundleArchiveArtifactValidator = Object.freeze({
  jurisdiction_profile_key: cmdExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackageBundleArchiveArtifact:
    validateCMDExportPackageBundleArchiveArtifact,
});

const exportPackageBundleArchiveArtifactValidatorRegistry = Object.freeze({
  [sweBodelningExportPackageBundleArchiveArtifactValidator.jurisdiction_profile_key]:
    sweBodelningExportPackageBundleArchiveArtifactValidator,
  [cmdExportPackageBundleArchiveArtifactValidator.jurisdiction_profile_key]:
    cmdExportPackageBundleArchiveArtifactValidator,
});

function getExportPackageBundleArchiveArtifactValidator(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return (
    exportPackageBundleArchiveArtifactValidatorRegistry[jurisdictionProfileKey] ??
    null
  );
}

function validateExportPackageBundleArchiveArtifact(input) {
  if (
    input &&
    typeof input === "object" &&
    !Array.isArray(input) &&
    typeof input.jurisdiction_profile_key === "string" &&
    input.jurisdiction_profile_key.length > 0
  ) {
    const validator = getExportPackageBundleArchiveArtifactValidator(
      input.jurisdiction_profile_key,
    );

    if (validator) {
      return validator.validateExportPackageBundleArchiveArtifact(input);
    }
  }

  if (
    input &&
    typeof input === "object" &&
    !Array.isArray(input) &&
    typeof input.body_base64 === "string" &&
    input.body_base64.length > 0
  ) {
    try {
      const decodedBody = Buffer.from(input.body_base64, "base64").toString("utf8");
      const jurisdictionProfileKeyMatch =
        decodedBody.match(/"jurisdiction_profile_key":"([^"]+)"/) ??
        decodedBody.match(/jurisdiction_profile_key:\s+([A-Z_<>\.]+)/);

      if (typeof jurisdictionProfileKeyMatch?.[1] === "string") {
        const validator = getExportPackageBundleArchiveArtifactValidator(
          jurisdictionProfileKeyMatch[1],
        );

        if (validator) {
          return validator.validateExportPackageBundleArchiveArtifact(input);
        }
      }
    } catch {
      // Preserve the current fail-open-to-canonical-validator behavior when the
      // archive body cannot be decoded for profile inference.
    }
  }

  // Final archive artifact snapshots currently do not carry a top-level
  // jurisdiction_profile_key, so keep the existing SWE_BODELNING validation
  // semantics by falling back to the current canonical validator.
  const defaultValidator = Object.values(
    exportPackageBundleArchiveArtifactValidatorRegistry,
  )[0];
  return defaultValidator.validateExportPackageBundleArchiveArtifact(input);
}

function validateSWEBodelningExportPackageBundleArchiveArtifactProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageBundleArchiveArtifactProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackageBundleArchiveArtifact =
    validateSWEBodelningExportPackageBundleArchiveArtifact(
      {
        artifact_type: input.artifact_type,
        filename: input.filename,
        content_type: input.content_type,
        encoding: input.encoding,
        body_base64: input.body_base64,
        package_version: input.package_version,
        bundle_manifest_fingerprint: input.bundle_manifest_fingerprint,
      },
      errorCode,
    );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    exportPackageBundleArchiveArtifactProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !exportPackageBundleArchiveArtifactProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    input.snapshot_status.snapshot_package_version_found !== null &&
    (typeof input.snapshot_status.snapshot_package_version_found !== "string" ||
      input.snapshot_status.snapshot_package_version_found.length === 0)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_package_version_found must be null or a non-empty string",
      { field: "snapshot_status.snapshot_package_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_package_version_found !== null &&
    input.snapshot_status.snapshot_package_version_found !==
      exportPackageBundleArchiveArtifact.package_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_package_version_found must match package_version when present",
      { field: "snapshot_status.snapshot_package_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_package_version !== "string" ||
    input.snapshot_status.current_package_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_package_version must be a non-empty string",
      { field: "snapshot_status.current_package_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackageBundleArchiveArtifact,
    snapshot_status: input.snapshot_status,
  };
}

function validateCMDExportPackageBundleArchiveArtifactProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    cmdExportPackageBundleArchiveArtifactProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackageBundleArchiveArtifact =
    validateCMDExportPackageBundleArchiveArtifact(
      {
        artifact_type: input.artifact_type,
        filename: input.filename,
        content_type: input.content_type,
        encoding: input.encoding,
        body_base64: input.body_base64,
        package_version: input.package_version,
        bundle_manifest_fingerprint: input.bundle_manifest_fingerprint,
      },
      errorCode,
    );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    cmdExportPackageBundleArchiveArtifactProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !cmdExportPackageBundleArchiveArtifactProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    input.snapshot_status.snapshot_package_version_found !== null &&
    (typeof input.snapshot_status.snapshot_package_version_found !== "string" ||
      input.snapshot_status.snapshot_package_version_found.length === 0)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_package_version_found must be null or a non-empty string",
      { field: "snapshot_status.snapshot_package_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_package_version_found !== null &&
    input.snapshot_status.snapshot_package_version_found !==
      exportPackageBundleArchiveArtifact.package_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_package_version_found must match package_version when present",
      { field: "snapshot_status.snapshot_package_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_package_version !== "string" ||
    input.snapshot_status.current_package_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_package_version must be a non-empty string",
      { field: "snapshot_status.current_package_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackageBundleArchiveArtifact,
    snapshot_status: input.snapshot_status,
  };
}

function validateSWEBodelningExportPackageBundleManifestProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageBundleManifestProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackageBundleManifest = validateSWEBodelningExportPackageBundleManifest(
    {
      jurisdiction_profile_key: input.jurisdiction_profile_key,
      package_version: input.package_version,
      export_version: input.export_version,
      dossier_fingerprint: input.dossier_fingerprint,
      canonical_source: input.canonical_source,
      generated_at: input.generated_at,
      artifacts: input.artifacts,
    },
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    exportPackageBundleManifestProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !exportPackageBundleManifestProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    input.snapshot_status.snapshot_package_version_found !== null &&
    (typeof input.snapshot_status.snapshot_package_version_found !== "string" ||
      input.snapshot_status.snapshot_package_version_found.length === 0)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_package_version_found must be null or a non-empty string",
      { field: "snapshot_status.snapshot_package_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_package_version_found !== null &&
    input.snapshot_status.snapshot_package_version_found !==
      exportPackageBundleManifest.package_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_package_version_found must match package_version when present",
      { field: "snapshot_status.snapshot_package_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_package_version !== "string" ||
    input.snapshot_status.current_package_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_package_version must be a non-empty string",
      { field: "snapshot_status.current_package_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackageBundleManifest,
    snapshot_status: input.snapshot_status,
  };
}

function validateCMDExportPackageBundleManifestProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    cmdExportPackageBundleManifestProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackageBundleManifest = validateCMDExportPackageBundleManifest(
    {
      jurisdiction_profile_key: input.jurisdiction_profile_key,
      package_version: input.package_version,
      export_version: input.export_version,
      dossier_fingerprint: input.dossier_fingerprint,
      canonical_source: input.canonical_source,
      generated_at: input.generated_at,
      artifacts: input.artifacts,
    },
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    cmdExportPackageBundleManifestProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !cmdExportPackageBundleManifestProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    typeof input.snapshot_status.snapshot_package_version_found !== "string" ||
    input.snapshot_status.snapshot_package_version_found.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_package_version_found must be a non-empty string",
      { field: "snapshot_status.snapshot_package_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_package_version_found !==
    exportPackageBundleManifest.package_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_package_version_found must match package_version",
      { field: "snapshot_status.snapshot_package_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_package_version !== "string" ||
    input.snapshot_status.current_package_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_package_version must be a non-empty string",
      { field: "snapshot_status.current_package_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackageBundleManifest,
    snapshot_status: input.snapshot_status,
  };
}

function validateSWEBodelningExportPackageJsonArtifact(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackageJsonArtifactRequiredKeys, errorCode, "input");

  if (
    input.artifact_type !==
    sweBodelningExportPackageJsonArtifact.properties.artifact_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "artifact_type is not supported",
      { field: "artifact_type" },
    );
  }

  if (typeof input.filename !== "string" || input.filename.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a non-empty string",
      { field: "filename" },
    );
  }

  if (
    input.content_type !==
    sweBodelningExportPackageJsonArtifact.properties.content_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "content_type is not supported",
      { field: "content_type" },
    );
  }

  if (
    input.encoding !==
    sweBodelningExportPackageJsonArtifact.properties.encoding.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "encoding is not supported",
      { field: "encoding" },
    );
  }

  if (typeof input.body_utf8 !== "string" || input.body_utf8.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must be a non-empty string",
      { field: "body_utf8" },
    );
  }

  let parsedBody;
  try {
    parsedBody = JSON.parse(input.body_utf8);
  } catch {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must contain valid JSON",
      { field: "body_utf8" },
    );
  }

  const canonicalExportPackage = validateSWEBodelningExportPackage(
    parsedBody,
    errorCode,
  );
  const expectedFilename =
    `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.json`;

  if (input.filename !== expectedFilename) {
    throw createSchemaValidationError(
      errorCode,
      "filename must match the canonical export package identity",
      { field: "filename" },
    );
  }

  const canonicalBodyUtf8 = toCanonicalJson(canonicalExportPackage);
  if (input.body_utf8 !== canonicalBodyUtf8) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must match the canonical export package JSON encoding",
      { field: "body_utf8" },
    );
  }

  return {
    artifact_type: input.artifact_type,
    filename: input.filename,
    content_type: input.content_type,
    encoding: input.encoding,
    body_utf8: canonicalBodyUtf8,
  };
}

function validateCMDExportPackageJsonArtifact(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackageJsonArtifactRequiredKeys, errorCode, "input");

  if (
    input.artifact_type !==
    cmdExportPackageJsonArtifact.properties.artifact_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "artifact_type is not supported",
      { field: "artifact_type" },
    );
  }

  if (
    input.content_type !==
    cmdExportPackageJsonArtifact.properties.content_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "content_type is not supported",
      { field: "content_type" },
    );
  }

  if (
    input.encoding !==
    cmdExportPackageJsonArtifact.properties.encoding.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "encoding is not supported",
      { field: "encoding" },
    );
  }

  if (typeof input.body_utf8 !== "string" || input.body_utf8.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must be a non-empty string",
      { field: "body_utf8" },
    );
  }

  let parsedBody;
  try {
    parsedBody = JSON.parse(input.body_utf8);
  } catch {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must contain valid JSON",
      { field: "body_utf8" },
    );
  }

  const canonicalExportPackage = validateCMDExportPackage(parsedBody, errorCode);
  const expectedFilename =
    `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.json`;

  if (input.filename !== expectedFilename) {
    throw createSchemaValidationError(
      errorCode,
      "filename must match the canonical export package identity",
      { field: "filename" },
    );
  }

  const canonicalBodyUtf8 = toCanonicalJson(canonicalExportPackage);
  if (input.body_utf8 !== canonicalBodyUtf8) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must match the canonical export package JSON encoding",
      { field: "body_utf8" },
    );
  }

  return {
    artifact_type: input.artifact_type,
    filename: input.filename,
    content_type: input.content_type,
    encoding: input.encoding,
    body_utf8: canonicalBodyUtf8,
  };
}

const sweBodelningExportPackageJsonArtifactValidator = Object.freeze({
  jurisdiction_profile_key: sweBodelningExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackageJsonArtifact: validateSWEBodelningExportPackageJsonArtifact,
});

const cmdExportPackageJsonArtifactValidator = Object.freeze({
  jurisdiction_profile_key: cmdExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackageJsonArtifact: validateCMDExportPackageJsonArtifact,
});

const exportPackageJsonArtifactValidatorRegistry = Object.freeze({
  [sweBodelningExportPackageJsonArtifactValidator.jurisdiction_profile_key]:
    sweBodelningExportPackageJsonArtifactValidator,
  [cmdExportPackageJsonArtifactValidator.jurisdiction_profile_key]:
    cmdExportPackageJsonArtifactValidator,
});

function getExportPackageJsonArtifactValidator(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackageJsonArtifactValidatorRegistry[jurisdictionProfileKey] ?? null;
}

function validateExportPackageJsonArtifact(input) {
  if (
    input &&
    typeof input === "object" &&
    !Array.isArray(input) &&
    typeof input.body_utf8 === "string" &&
    input.body_utf8.length > 0
  ) {
    try {
      const parsedBody = JSON.parse(input.body_utf8);

      if (
        parsedBody &&
        typeof parsedBody === "object" &&
        !Array.isArray(parsedBody) &&
        typeof parsedBody.jurisdiction_profile_key === "string" &&
        parsedBody.jurisdiction_profile_key.length > 0
      ) {
        const validator = getExportPackageJsonArtifactValidator(
          parsedBody.jurisdiction_profile_key,
        );

        if (validator) {
          return validator.validateExportPackageJsonArtifact(input);
        }
      }
    } catch {
      // Fall back to the default validator so existing SWE_BODELNING validation
      // semantics and error codes remain unchanged for malformed JSON bodies.
    }
  }

  const defaultValidator = Object.values(exportPackageJsonArtifactValidatorRegistry)[0];
  return defaultValidator.validateExportPackageJsonArtifact(input);
}

function validateSWEBodelningExportPackageDocxArtifact(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackageDocxArtifactRequiredKeys, errorCode, "input");

  if (
    input.artifact_type !==
    sweBodelningExportPackageDocxArtifact.properties.artifact_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "artifact_type is not supported",
      { field: "artifact_type" },
    );
  }

  if (typeof input.filename !== "string" || input.filename.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a non-empty string",
      { field: "filename" },
    );
  }

  if (!input.filename.endsWith(".docx")) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a DOCX artifact filename",
      { field: "filename" },
    );
  }

  if (
    input.content_type !==
    sweBodelningExportPackageDocxArtifact.properties.content_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "content_type is not supported",
      { field: "content_type" },
    );
  }

  if (
    input.encoding !==
    sweBodelningExportPackageDocxArtifact.properties.encoding.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "encoding is not supported",
      { field: "encoding" },
    );
  }

  if (typeof input.body_base64 !== "string" || input.body_base64.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a non-empty string",
      { field: "body_base64" },
    );
  }

  if (
    input.body_base64.length % 4 !== 0 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(input.body_base64)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a base64-encoded string",
      { field: "body_base64" },
    );
  }

  return {
    artifact_type: input.artifact_type,
    filename: input.filename,
    content_type: input.content_type,
    encoding: input.encoding,
    body_base64: input.body_base64,
  };
}

function validateCMDExportPackageDocxArtifact(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackageDocxArtifactRequiredKeys, errorCode, "input");

  if (
    input.artifact_type !==
    cmdExportPackageDocxArtifact.properties.artifact_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "artifact_type is not supported",
      { field: "artifact_type" },
    );
  }

  if (typeof input.filename !== "string" || input.filename.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a non-empty string",
      { field: "filename" },
    );
  }

  if (!input.filename.endsWith(".docx")) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a DOCX artifact filename",
      { field: "filename" },
    );
  }

  if (
    input.content_type !==
    cmdExportPackageDocxArtifact.properties.content_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "content_type is not supported",
      { field: "content_type" },
    );
  }

  if (
    input.encoding !==
    cmdExportPackageDocxArtifact.properties.encoding.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "encoding is not supported",
      { field: "encoding" },
    );
  }

  if (typeof input.body_base64 !== "string" || input.body_base64.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a non-empty string",
      { field: "body_base64" },
    );
  }

  if (
    input.body_base64.length % 4 !== 0 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(input.body_base64)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a base64-encoded string",
      { field: "body_base64" },
    );
  }

  return {
    artifact_type: input.artifact_type,
    filename: input.filename,
    content_type: input.content_type,
    encoding: input.encoding,
    body_base64: input.body_base64,
  };
}

const sweBodelningExportPackageDocxArtifactValidator = Object.freeze({
  jurisdiction_profile_key: sweBodelningExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackageDocxArtifact: validateSWEBodelningExportPackageDocxArtifact,
});

const cmdExportPackageDocxArtifactValidator = Object.freeze({
  jurisdiction_profile_key: cmdExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackageDocxArtifact: validateCMDExportPackageDocxArtifact,
});

const exportPackageDocxArtifactValidatorRegistry = Object.freeze({
  [sweBodelningExportPackageDocxArtifactValidator.jurisdiction_profile_key]:
    sweBodelningExportPackageDocxArtifactValidator,
  [cmdExportPackageDocxArtifactValidator.jurisdiction_profile_key]:
    cmdExportPackageDocxArtifactValidator,
});

function getExportPackageDocxArtifactValidator(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackageDocxArtifactValidatorRegistry[jurisdictionProfileKey] ?? null;
}

function validateExportPackageDocxArtifact(input) {
  if (
    input &&
    typeof input === "object" &&
    !Array.isArray(input) &&
    typeof input.body_base64 === "string" &&
    input.body_base64.length > 0
  ) {
    try {
      const decodedBody = Buffer.from(input.body_base64, "base64").toString("utf8");
      const jurisdictionProfileKeyMatch =
        decodedBody.match(/jurisdiction_profile_key:\s+([A-Z_<>\.]+)/) ??
        decodedBody.match(/&quot;jurisdiction_profile_key&quot;:&quot;([^&]+)&quot;/) ??
        decodedBody.match(/"jurisdiction_profile_key":"([^"]+)"/);

      if (jurisdictionProfileKeyMatch) {
        const validator = getExportPackageDocxArtifactValidator(
          jurisdictionProfileKeyMatch[1],
        );

        if (validator) {
          return validator.validateExportPackageDocxArtifact(input);
        }
      }
    } catch {
      // Fall back to the default validator so existing SWE_BODELNING validation
      // semantics and error codes remain unchanged for malformed DOCX bodies.
    }
  }

  const defaultValidator = Object.values(exportPackageDocxArtifactValidatorRegistry)[0];
  return defaultValidator.validateExportPackageDocxArtifact(input);
}

function validateSWEBodelningExportPackageDocxArtifactProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageDocxArtifactProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackageDocxArtifact = validateSWEBodelningExportPackageDocxArtifact(
    {
      artifact_type: input.artifact_type,
      filename: input.filename,
      content_type: input.content_type,
      encoding: input.encoding,
      body_base64: input.body_base64,
    },
    errorCode,
  );
  const exportPackage = reconstructSWEBodelningExportPackageFromDocxArtifactBody(
    exportPackageDocxArtifact.body_base64,
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    exportPackageDocxArtifactProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !exportPackageDocxArtifactProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== null &&
    (typeof input.snapshot_status.snapshot_export_version_found !== "string" ||
      input.snapshot_status.snapshot_export_version_found.length === 0)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must be null or a non-empty string",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== null &&
    input.snapshot_status.snapshot_export_version_found !== exportPackage.export_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must match export_version when present",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_export_version !== "string" ||
    input.snapshot_status.current_export_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_export_version must be a non-empty string",
      { field: "snapshot_status.current_export_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackageDocxArtifact,
    snapshot_status: input.snapshot_status,
  };
}

function validateCMDExportPackageDocxArtifactProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    cmdExportPackageDocxArtifactProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackageDocxArtifact = validateCMDExportPackageDocxArtifact(
    {
      artifact_type: input.artifact_type,
      filename: input.filename,
      content_type: input.content_type,
      encoding: input.encoding,
      body_base64: input.body_base64,
    },
    errorCode,
  );
  const exportPackage = reconstructCMDExportPackageFromDocxArtifactBody(
    exportPackageDocxArtifact.body_base64,
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    cmdExportPackageDocxArtifactProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !cmdExportPackageDocxArtifactProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    typeof input.snapshot_status.snapshot_export_version_found !== "string" ||
    input.snapshot_status.snapshot_export_version_found.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must be a non-empty string",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== exportPackage.export_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must match export_version",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_export_version !== "string" ||
    input.snapshot_status.current_export_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_export_version must be a non-empty string",
      { field: "snapshot_status.current_export_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackageDocxArtifact,
    snapshot_status: input.snapshot_status,
  };
}

function validateSWEBodelningExportPackagePdfArtifact(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackagePdfArtifactRequiredKeys, errorCode, "input");

  if (
    input.artifact_type !==
    sweBodelningExportPackagePdfArtifact.properties.artifact_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "artifact_type is not supported",
      { field: "artifact_type" },
    );
  }

  if (typeof input.filename !== "string" || input.filename.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a non-empty string",
      { field: "filename" },
    );
  }

  if (!input.filename.endsWith(".pdf")) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a PDF artifact filename",
      { field: "filename" },
    );
  }

  if (
    input.content_type !==
    sweBodelningExportPackagePdfArtifact.properties.content_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "content_type is not supported",
      { field: "content_type" },
    );
  }

  if (
    input.encoding !==
    sweBodelningExportPackagePdfArtifact.properties.encoding.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "encoding is not supported",
      { field: "encoding" },
    );
  }

  if (typeof input.body_base64 !== "string" || input.body_base64.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a non-empty string",
      { field: "body_base64" },
    );
  }

  if (
    input.body_base64.length % 4 !== 0 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(input.body_base64)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a base64-encoded string",
      { field: "body_base64" },
    );
  }

  return {
    artifact_type: input.artifact_type,
    filename: input.filename,
    content_type: input.content_type,
    encoding: input.encoding,
    body_base64: input.body_base64,
  };
}

function validateCMDExportPackagePdfArtifact(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackagePdfArtifactRequiredKeys, errorCode, "input");

  if (
    input.artifact_type !==
    cmdExportPackagePdfArtifact.properties.artifact_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "artifact_type is not supported",
      { field: "artifact_type" },
    );
  }

  if (typeof input.filename !== "string" || input.filename.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a non-empty string",
      { field: "filename" },
    );
  }

  if (!input.filename.endsWith(".pdf")) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a PDF artifact filename",
      { field: "filename" },
    );
  }

  if (
    input.content_type !==
    cmdExportPackagePdfArtifact.properties.content_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "content_type is not supported",
      { field: "content_type" },
    );
  }

  if (
    input.encoding !==
    cmdExportPackagePdfArtifact.properties.encoding.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "encoding is not supported",
      { field: "encoding" },
    );
  }

  if (typeof input.body_base64 !== "string" || input.body_base64.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a non-empty string",
      { field: "body_base64" },
    );
  }

  if (
    input.body_base64.length % 4 !== 0 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(input.body_base64)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_base64 must be a base64-encoded string",
      { field: "body_base64" },
    );
  }

  return {
    artifact_type: input.artifact_type,
    filename: input.filename,
    content_type: input.content_type,
    encoding: input.encoding,
    body_base64: input.body_base64,
  };
}

const sweBodelningExportPackagePdfArtifactValidator = Object.freeze({
  jurisdiction_profile_key: sweBodelningExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackagePdfArtifact: validateSWEBodelningExportPackagePdfArtifact,
});

const cmdExportPackagePdfArtifactValidator = Object.freeze({
  jurisdiction_profile_key: cmdExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackagePdfArtifact: validateCMDExportPackagePdfArtifact,
});

const exportPackagePdfArtifactValidatorRegistry = Object.freeze({
  [sweBodelningExportPackagePdfArtifactValidator.jurisdiction_profile_key]:
    sweBodelningExportPackagePdfArtifactValidator,
  [cmdExportPackagePdfArtifactValidator.jurisdiction_profile_key]:
    cmdExportPackagePdfArtifactValidator,
});

function getExportPackagePdfArtifactValidator(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackagePdfArtifactValidatorRegistry[jurisdictionProfileKey] ?? null;
}

function validateExportPackagePdfArtifact(input) {
  if (
    input &&
    typeof input === "object" &&
    !Array.isArray(input) &&
    typeof input.body_base64 === "string" &&
    input.body_base64.length > 0
  ) {
    try {
      const decodedBody = Buffer.from(input.body_base64, "base64").toString("utf8");
      const jurisdictionProfileKeyMatch =
        decodedBody.match(/jurisdiction_profile_key:\s+([A-Z_<>\.]+)/) ??
        decodedBody.match(/"jurisdiction_profile_key":"([^"]+)"/);

      if (jurisdictionProfileKeyMatch) {
        const validator = getExportPackagePdfArtifactValidator(
          jurisdictionProfileKeyMatch[1],
        );

        if (validator) {
          return validator.validateExportPackagePdfArtifact(input);
        }
      }
    } catch {
      // Fall back to the default validator so existing SWE_BODELNING validation
      // semantics and error codes remain unchanged for malformed PDF bodies.
    }
  }

  const defaultValidator = Object.values(exportPackagePdfArtifactValidatorRegistry)[0];
  return defaultValidator.validateExportPackagePdfArtifact(input);
}

function validateSWEBodelningExportPackagePdfArtifactProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackagePdfArtifactProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackagePdfArtifact = validateSWEBodelningExportPackagePdfArtifact(
    {
      artifact_type: input.artifact_type,
      filename: input.filename,
      content_type: input.content_type,
      encoding: input.encoding,
      body_base64: input.body_base64,
    },
    errorCode,
  );
  const exportPackage = reconstructSWEBodelningExportPackageFromPdfArtifactBody(
    exportPackagePdfArtifact.body_base64,
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    exportPackagePdfArtifactProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !exportPackagePdfArtifactProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== null &&
    (typeof input.snapshot_status.snapshot_export_version_found !== "string" ||
      input.snapshot_status.snapshot_export_version_found.length === 0)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must be null or a non-empty string",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== null &&
    input.snapshot_status.snapshot_export_version_found !== exportPackage.export_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must match export_version when present",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_export_version !== "string" ||
    input.snapshot_status.current_export_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_export_version must be a non-empty string",
      { field: "snapshot_status.current_export_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackagePdfArtifact,
    snapshot_status: input.snapshot_status,
  };
}

function validateCMDExportPackagePdfArtifactProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    cmdExportPackagePdfArtifactProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackagePdfArtifact = validateCMDExportPackagePdfArtifact(
    {
      artifact_type: input.artifact_type,
      filename: input.filename,
      content_type: input.content_type,
      encoding: input.encoding,
      body_base64: input.body_base64,
    },
    errorCode,
  );
  const exportPackage = reconstructCMDExportPackageFromPdfArtifactBody(
    exportPackagePdfArtifact.body_base64,
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    cmdExportPackagePdfArtifactProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !cmdExportPackagePdfArtifactProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    typeof input.snapshot_status.snapshot_export_version_found !== "string" ||
    input.snapshot_status.snapshot_export_version_found.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must be a non-empty string",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== exportPackage.export_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must match export_version",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_export_version !== "string" ||
    input.snapshot_status.current_export_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_export_version must be a non-empty string",
      { field: "snapshot_status.current_export_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackagePdfArtifact,
    snapshot_status: input.snapshot_status,
  };
}

function validateSWEBodelningExportPackageMarkdownArtifact(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackageMarkdownArtifactRequiredKeys, errorCode, "input");

  if (
    input.artifact_type !==
    sweBodelningExportPackageMarkdownArtifact.properties.artifact_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "artifact_type is not supported",
      { field: "artifact_type" },
    );
  }

  if (typeof input.filename !== "string" || input.filename.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a non-empty string",
      { field: "filename" },
    );
  }

  if (
    input.content_type !==
    sweBodelningExportPackageMarkdownArtifact.properties.content_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "content_type is not supported",
      { field: "content_type" },
    );
  }

  if (
    input.encoding !==
    sweBodelningExportPackageMarkdownArtifact.properties.encoding.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "encoding is not supported",
      { field: "encoding" },
    );
  }

  if (typeof input.body_utf8 !== "string" || input.body_utf8.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must be a non-empty string",
      { field: "body_utf8" },
    );
  }

  if (!input.filename.endsWith(".md")) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a markdown artifact filename",
      { field: "filename" },
    );
  }

  const canonicalExportPackage =
    reconstructSWEBodelningExportPackageFromMarkdownArtifactBody(
      input.body_utf8,
      errorCode,
    );
  const expectedFilename =
    `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.md`;

  if (input.filename !== expectedFilename) {
    throw createSchemaValidationError(
      errorCode,
      "filename must match the canonical export package identity",
      { field: "filename" },
    );
  }

  const canonicalBodyUtf8 =
    buildSWEBodelningExportPackageMarkdownArtifactBody(canonicalExportPackage);
  if (input.body_utf8 !== canonicalBodyUtf8) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must match the canonical export package Markdown encoding",
      { field: "body_utf8" },
    );
  }

  return {
    artifact_type: input.artifact_type,
    filename: input.filename,
    content_type: input.content_type,
    encoding: input.encoding,
    body_utf8: canonicalBodyUtf8,
  };
}

function buildCMDExportPackageMarkdownArtifactBody(exportPackage) {
  return [
    "# CMD_PROFILE Export Package",
    "",
    "## Metadata",
    "",
    `- \`jurisdiction_profile_key\`: \`${exportPackage.jurisdiction_profile_key}\``,
    `- \`export_version\`: \`${exportPackage.export_version}\``,
    `- \`dossier_fingerprint\`: \`${exportPackage.dossier_fingerprint}\``,
    `- \`generated_at\`: \`${exportPackage.generated_at}\``,
    "",
    "## Canonical Source",
    "",
    "```json",
    toCanonicalJson(exportPackage.canonical_source),
    "```",
    "",
    "## Manifest",
    "",
    "```json",
    toCanonicalJson(exportPackage.manifest),
    "```",
    "",
    "## Profile Dossier Snapshot",
    "",
    "```json",
    toCanonicalJson(exportPackage.profile_dossier_snapshot),
    "```",
    "",
  ].join("\n");
}

function reconstructCMDExportPackageFromMarkdownArtifactBody(
  bodyUtf8,
  errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID",
) {
  if (typeof bodyUtf8 !== "string" || bodyUtf8.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must be a non-empty string",
      { field: "body_utf8" },
    );
  }

  const jurisdictionProfileKeyMatch = bodyUtf8.match(
    /^- `jurisdiction_profile_key`: `([^`]+)`$/m,
  );
  const exportVersionMatch = bodyUtf8.match(/^- `export_version`: `([^`]+)`$/m);
  const dossierFingerprintMatch = bodyUtf8.match(
    /^- `dossier_fingerprint`: `([^`]+)`$/m,
  );
  const generatedAtMatch = bodyUtf8.match(/^- `generated_at`: `([^`]+)`$/m);
  const canonicalSourceMatch = bodyUtf8.match(
    /^## Canonical Source\n\n```json\n([\s\S]*?)\n```$/m,
  );
  const manifestMatch = bodyUtf8.match(/^## Manifest\n\n```json\n([\s\S]*?)\n```$/m);
  const profileDossierSnapshotMatch = bodyUtf8.match(
    /^## Profile Dossier Snapshot\n\n```json\n([\s\S]*?)\n```$/m,
  );

  if (
    !jurisdictionProfileKeyMatch ||
    !exportVersionMatch ||
    !dossierFingerprintMatch ||
    !generatedAtMatch ||
    !canonicalSourceMatch ||
    !manifestMatch ||
    !profileDossierSnapshotMatch
  ) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must match the canonical Markdown export artifact structure",
      { field: "body_utf8" },
    );
  }

  let canonicalSource;
  let manifest;
  let profileDossierSnapshot;

  try {
    canonicalSource = JSON.parse(canonicalSourceMatch[1]);
    manifest = JSON.parse(manifestMatch[1]);
    profileDossierSnapshot = JSON.parse(profileDossierSnapshotMatch[1]);
  } catch {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must contain valid canonical JSON blocks",
      { field: "body_utf8" },
    );
  }

  return validateCMDExportPackage(
    {
      jurisdiction_profile_key: jurisdictionProfileKeyMatch[1],
      export_version: exportVersionMatch[1],
      dossier_fingerprint: dossierFingerprintMatch[1],
      canonical_source: canonicalSource,
      profile_dossier_snapshot: profileDossierSnapshot,
      generated_at: generatedAtMatch[1],
      manifest,
    },
    errorCode,
  );
}

function validateCMDExportPackageMarkdownArtifact(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackageMarkdownArtifactRequiredKeys, errorCode, "input");

  if (
    input.artifact_type !==
    cmdExportPackageMarkdownArtifact.properties.artifact_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "artifact_type is not supported",
      { field: "artifact_type" },
    );
  }

  if (typeof input.filename !== "string" || input.filename.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a non-empty string",
      { field: "filename" },
    );
  }

  if (
    input.content_type !==
    cmdExportPackageMarkdownArtifact.properties.content_type.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "content_type is not supported",
      { field: "content_type" },
    );
  }

  if (
    input.encoding !==
    cmdExportPackageMarkdownArtifact.properties.encoding.const
  ) {
    throw createSchemaValidationError(
      errorCode,
      "encoding is not supported",
      { field: "encoding" },
    );
  }

  if (typeof input.body_utf8 !== "string" || input.body_utf8.length === 0) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must be a non-empty string",
      { field: "body_utf8" },
    );
  }

  if (!input.filename.endsWith(".md")) {
    throw createSchemaValidationError(
      errorCode,
      "filename must be a markdown artifact filename",
      { field: "filename" },
    );
  }

  const canonicalExportPackage = reconstructCMDExportPackageFromMarkdownArtifactBody(
    input.body_utf8,
    errorCode,
  );
  const expectedFilename =
    `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.md`;

  if (input.filename !== expectedFilename) {
    throw createSchemaValidationError(
      errorCode,
      "filename must match the canonical export package identity",
      { field: "filename" },
    );
  }

  const canonicalBodyUtf8 =
    buildCMDExportPackageMarkdownArtifactBody(canonicalExportPackage);
  if (input.body_utf8 !== canonicalBodyUtf8) {
    throw createSchemaValidationError(
      errorCode,
      "body_utf8 must match the canonical export package Markdown encoding",
      { field: "body_utf8" },
    );
  }

  return {
    artifact_type: input.artifact_type,
    filename: input.filename,
    content_type: input.content_type,
    encoding: input.encoding,
    body_utf8: canonicalBodyUtf8,
  };
}

const sweBodelningExportPackageMarkdownArtifactValidator = Object.freeze({
  jurisdiction_profile_key: sweBodelningExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackageMarkdownArtifact: validateSWEBodelningExportPackageMarkdownArtifact,
});

const cmdExportPackageMarkdownArtifactValidator = Object.freeze({
  jurisdiction_profile_key: cmdExportPackage.properties.jurisdiction_profile_key.const,
  validateExportPackageMarkdownArtifact: validateCMDExportPackageMarkdownArtifact,
});

const exportPackageMarkdownArtifactValidatorRegistry = Object.freeze({
  [sweBodelningExportPackageMarkdownArtifactValidator.jurisdiction_profile_key]:
    sweBodelningExportPackageMarkdownArtifactValidator,
  [cmdExportPackageMarkdownArtifactValidator.jurisdiction_profile_key]:
    cmdExportPackageMarkdownArtifactValidator,
});

function getExportPackageMarkdownArtifactValidator(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackageMarkdownArtifactValidatorRegistry[jurisdictionProfileKey] ?? null;
}

function validateExportPackageMarkdownArtifact(input) {
  if (
    input &&
    typeof input === "object" &&
    !Array.isArray(input) &&
    typeof input.body_utf8 === "string" &&
    input.body_utf8.length > 0
  ) {
    const jurisdictionProfileKeyMatch = input.body_utf8.match(
      /^- `jurisdiction_profile_key`: `([^`]+)`$/m,
    );

    if (jurisdictionProfileKeyMatch) {
      const validator = getExportPackageMarkdownArtifactValidator(
        jurisdictionProfileKeyMatch[1],
      );

      if (validator) {
        return validator.validateExportPackageMarkdownArtifact(input);
      }
    }
  }

  const defaultValidator = Object.values(exportPackageMarkdownArtifactValidatorRegistry)[0];
  return defaultValidator.validateExportPackageMarkdownArtifact(input);
}

function validateCMDExportPackageJsonArtifactProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    cmdExportPackageJsonArtifactProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackageJsonArtifact = validateCMDExportPackageJsonArtifact(
    {
      artifact_type: input.artifact_type,
      filename: input.filename,
      content_type: input.content_type,
      encoding: input.encoding,
      body_utf8: input.body_utf8,
    },
    errorCode,
  );
  const exportPackage = validateCMDExportPackage(
    JSON.parse(exportPackageJsonArtifact.body_utf8),
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    cmdExportPackageJsonArtifactProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !cmdExportPackageJsonArtifactProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    typeof input.snapshot_status.snapshot_export_version_found !== "string" ||
    input.snapshot_status.snapshot_export_version_found.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must be a non-empty string",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== exportPackage.export_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must match export_version",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_export_version !== "string" ||
    input.snapshot_status.current_export_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_export_version must be a non-empty string",
      { field: "snapshot_status.current_export_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackageJsonArtifact,
    snapshot_status: input.snapshot_status,
  };
}

function validateSWEBodelningExportPackageJsonArtifactProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageJsonArtifactProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackageJsonArtifact = validateSWEBodelningExportPackageJsonArtifact(
    {
      artifact_type: input.artifact_type,
      filename: input.filename,
      content_type: input.content_type,
      encoding: input.encoding,
      body_utf8: input.body_utf8,
    },
    errorCode,
  );
  const exportPackage = validateSWEBodelningExportPackage(
    JSON.parse(exportPackageJsonArtifact.body_utf8),
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    exportPackageJsonArtifactProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !exportPackageJsonArtifactProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== null &&
    (typeof input.snapshot_status.snapshot_export_version_found !== "string" ||
      input.snapshot_status.snapshot_export_version_found.length === 0)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must be null or a non-empty string",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== null &&
    input.snapshot_status.snapshot_export_version_found !== exportPackage.export_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must match export_version when present",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_export_version !== "string" ||
    input.snapshot_status.current_export_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_export_version must be a non-empty string",
      { field: "snapshot_status.current_export_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackageJsonArtifact,
    snapshot_status: input.snapshot_status,
  };
}

function validateCMDExportPackageMarkdownArtifactProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    cmdExportPackageMarkdownArtifactProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackageMarkdownArtifact = validateCMDExportPackageMarkdownArtifact(
    {
      artifact_type: input.artifact_type,
      filename: input.filename,
      content_type: input.content_type,
      encoding: input.encoding,
      body_utf8: input.body_utf8,
    },
    errorCode,
  );
  const exportPackage = reconstructCMDExportPackageFromMarkdownArtifactBody(
    exportPackageMarkdownArtifact.body_utf8,
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    cmdExportPackageMarkdownArtifactProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !cmdExportPackageMarkdownArtifactProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    typeof input.snapshot_status.snapshot_export_version_found !== "string" ||
    input.snapshot_status.snapshot_export_version_found.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must be a non-empty string",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== exportPackage.export_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must match export_version",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_export_version !== "string" ||
    input.snapshot_status.current_export_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_export_version must be a non-empty string",
      { field: "snapshot_status.current_export_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackageMarkdownArtifact,
    snapshot_status: input.snapshot_status,
  };
}

function validateSWEBodelningExportPackageMarkdownArtifactProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(
    input,
    exportPackageMarkdownArtifactProjectionRequiredKeys,
    errorCode,
    "input",
  );

  const exportPackageMarkdownArtifact = validateSWEBodelningExportPackageMarkdownArtifact(
    {
      artifact_type: input.artifact_type,
      filename: input.filename,
      content_type: input.content_type,
      encoding: input.encoding,
      body_utf8: input.body_utf8,
    },
    errorCode,
  );
  const exportPackage = reconstructSWEBodelningExportPackageFromMarkdownArtifactBody(
    exportPackageMarkdownArtifact.body_utf8,
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    exportPackageMarkdownArtifactProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !exportPackageMarkdownArtifactProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== null &&
    (typeof input.snapshot_status.snapshot_export_version_found !== "string" ||
      input.snapshot_status.snapshot_export_version_found.length === 0)
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must be null or a non-empty string",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== null &&
    input.snapshot_status.snapshot_export_version_found !== exportPackage.export_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must match export_version when present",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_export_version !== "string" ||
    input.snapshot_status.current_export_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_export_version must be a non-empty string",
      { field: "snapshot_status.current_export_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackageMarkdownArtifact,
    snapshot_status: input.snapshot_status,
  };
}

function validateSWEBodelningExportPackageProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackageProjectionRequiredKeys, errorCode, "input");

  const exportPackage = validateSWEBodelningExportPackage(
    {
      jurisdiction_profile_key: input.jurisdiction_profile_key,
      export_version: input.export_version,
      dossier_fingerprint: input.dossier_fingerprint,
      canonical_source: input.canonical_source,
      profile_dossier_snapshot: input.profile_dossier_snapshot,
      generated_at: input.generated_at,
      manifest: input.manifest,
    },
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    exportPackageProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !exportPackageProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    typeof input.snapshot_status.snapshot_export_version_found !== "string" ||
    input.snapshot_status.snapshot_export_version_found.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must be a non-empty string",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== exportPackage.export_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must match export_version",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_export_version !== "string" ||
    input.snapshot_status.current_export_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_export_version must be a non-empty string",
      { field: "snapshot_status.current_export_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackage,
    snapshot_status: input.snapshot_status,
  };
}

function validateCMDExportPackageProjection(
  input,
  errorCode = "ERR_EXPORT_PACKAGE_PROJECTION_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, exportPackageProjectionRequiredKeys, errorCode, "input");

  const exportPackage = validateCMDExportPackage(
    {
      jurisdiction_profile_key: input.jurisdiction_profile_key,
      export_version: input.export_version,
      dossier_fingerprint: input.dossier_fingerprint,
      canonical_source: input.canonical_source,
      profile_dossier_snapshot: input.profile_dossier_snapshot,
      generated_at: input.generated_at,
      manifest: input.manifest,
    },
    errorCode,
  );

  assertPlainObject(input.snapshot_status, errorCode, "snapshot_status");
  assertExactKeys(
    input.snapshot_status,
    exportPackageProjectionSnapshotStatusRequiredKeys,
    errorCode,
    "snapshot_status",
  );

  if (
    !exportPackageProjectionSnapshotStatusSourceValues.includes(
      input.snapshot_status.source,
    )
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.source must be a supported source value",
      { field: "snapshot_status.source" },
    );
  }

  if (
    typeof input.snapshot_status.snapshot_export_version_found !== "string" ||
    input.snapshot_status.snapshot_export_version_found.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must be a non-empty string",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    input.snapshot_status.snapshot_export_version_found !== exportPackage.export_version
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_export_version_found must match export_version",
      { field: "snapshot_status.snapshot_export_version_found" },
    );
  }

  if (
    typeof input.snapshot_status.current_export_version !== "string" ||
    input.snapshot_status.current_export_version.length === 0
  ) {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.current_export_version must be a non-empty string",
      { field: "snapshot_status.current_export_version" },
    );
  }

  if (typeof input.snapshot_status.snapshot_is_current !== "boolean") {
    throw createSchemaValidationError(
      errorCode,
      "snapshot_status.snapshot_is_current must be a boolean",
      { field: "snapshot_status.snapshot_is_current" },
    );
  }

  return {
    ...exportPackage,
    snapshot_status: input.snapshot_status,
  };
}

module.exports = {
  exportPackageBundleArchiveArtifactValidatorRegistry,
  exportPackageBundleManifestValidatorRegistry,
  exportPackageDocxArtifactValidatorRegistry,
  exportPackageJsonArtifactValidatorRegistry,
  exportPackageMarkdownArtifactValidatorRegistry,
  exportPackagePdfArtifactValidatorRegistry,
  exportPackageValidatorRegistry,
  getExportPackageBundleArchiveArtifactValidator,
  getExportPackageBundleManifestValidator,
  getExportPackageDocxArtifactValidator,
  getExportPackageJsonArtifactValidator,
  getExportPackageMarkdownArtifactValidator,
  getExportPackagePdfArtifactValidator,
  getExportPackageValidator,
  getReleaseEvalValidator,
  cmdExportPackage,
  cmdExportPackageBundleArchiveArtifact,
  cmdExportPackageBundleArchiveArtifactProjection,
  cmdExportPackageBundleManifest,
  cmdExportPackageBundleManifestProjection,
  cmdExportPackageDocxArtifact,
  cmdExportPackageDocxArtifactProjection,
  cmdExportPackagePdfArtifact,
  cmdExportPackagePdfArtifactProjection,
  cmdExportPackageJsonArtifact,
  cmdExportPackageJsonArtifactProjection,
  cmdExportPackageMarkdownArtifact,
  cmdExportPackageMarkdownArtifactProjection,
  cmdExportPackageProjection,
  cmdProfileDossierProjection,
  cmdProfileDossierSnapshot,
  cmdProfileInput,
  cmdReleaseEvalRun,
  exportPackageBundleArchiveArtifactStopMatrixAlignment,
  exportPackageBundleArchiveArtifactStopOutcomeAlignment,
  exportPackageBundleArchiveArtifactTraceabilityAlignment,
  exportPackageBundleManifestStopMatrixAlignment,
  exportPackageBundleManifestStopOutcomeAlignment,
  exportPackageBundleManifestTraceabilityAlignment,
  exportPackageDocxArtifactStopMatrixAlignment,
  exportPackageDocxArtifactStopOutcomeAlignment,
  exportPackageDocxArtifactTraceabilityAlignment,
  exportPackageJsonArtifactStopMatrixAlignment,
  exportPackageJsonArtifactStopOutcomeAlignment,
  exportPackageJsonArtifactTraceabilityAlignment,
  exportPackageMarkdownArtifactStopMatrixAlignment,
  exportPackageMarkdownArtifactStopOutcomeAlignment,
  exportPackageMarkdownArtifactTraceabilityAlignment,
  exportPackagePdfArtifactStopMatrixAlignment,
  exportPackagePdfArtifactStopOutcomeAlignment,
  exportPackagePdfArtifactTraceabilityAlignment,
  exportPackageStopMatrixAlignment,
  exportPackageStopOutcomeAlignment,
  exportPackageTraceabilityAlignment,
  jurisdictionProfileRegistry, noRawMetadataManifest, controlledSyntheticRedTeamResultEnvelope, controlledSyntheticRedTeamResultEnvelopeValidatorResult, validateControlledSyntheticRedTeamResultEnvelope,
  profileInputSemanticFactAlignment,
  profileDossierStopMatrixAlignment,
  profileDossierStopOutcomeAlignment,
  profileDossierTraceabilityAlignment,
  releaseEvalSemanticFactAlignment,
  releaseEvalStopMatrixAlignment,
  releaseEvalStopOutcomeAlignment,
  releaseEvalTraceabilityAlignment,
  snapshotStatusTraceabilityAlignment,
  semanticFactModel,
  stopMatrixModel,
  stopOutcomeModel,
  traceabilityModel,
  releaseEvalValidatorRegistry,
  sweBodelningExportPackageBundleArchiveArtifact,
  sweBodelningExportPackageBundleArchiveArtifactProjection,
  sweBodelningExportPackageBundleManifest,
  sweBodelningExportPackageBundleManifestProjection,
  sweBodelningExportPackage,
  sweBodelningExportPackageDocxArtifact,
  sweBodelningExportPackageDocxArtifactProjection,
  sweBodelningExportPackagePdfArtifact,
  sweBodelningExportPackagePdfArtifactProjection,
  sweBodelningExportPackageJsonArtifact,
  sweBodelningExportPackageMarkdownArtifact,
  sweBodelningExportPackageJsonArtifactProjection,
  sweBodelningExportPackageMarkdownArtifactProjection,
  sweBodelningExportPackageProjection,
  sweBodelningProfileInput,
  sweBodelningProfileDossierProjection,
  sweBodelningProfileDossierSnapshot,
  sweBodelningReleaseEvalRun,
  reconstructSWEBodelningExportPackageFromDocxArtifactBody,
  reconstructCMDExportPackageFromDocxArtifactBody,
  reconstructCMDExportPackageFromPdfArtifactBody,
  reconstructSWEBodelningExportPackageFromPdfArtifactBody,
  reconstructCMDExportPackageFromMarkdownArtifactBody,
  reconstructSWEBodelningExportPackageFromMarkdownArtifactBody,
  validateExportPackageBundleArchiveArtifact,
  validateExportPackageBundleManifest,
  validateCMDExportPackageBundleArchiveArtifact,
  validateCMDExportPackageBundleArchiveArtifactProjection,
  validateCMDExportPackageBundleManifest,
  validateCMDExportPackageBundleManifestProjection,
  validateSWEBodelningExportPackageBundleArchiveArtifact,
  validateSWEBodelningExportPackageBundleArchiveArtifactProjection,
  validateSWEBodelningExportPackageBundleManifest,
  validateSWEBodelningExportPackageBundleManifestProjection,
  validateSWEBodelningExportPackage,
  validateExportPackageDocxArtifact,
  validateCMDExportPackageDocxArtifact,
  validateCMDExportPackageDocxArtifactProjection,
  validateCMDExportPackagePdfArtifactProjection,
  validateSWEBodelningExportPackageDocxArtifact,
  validateSWEBodelningExportPackageDocxArtifactProjection,
  validateCMDExportPackagePdfArtifact,
  validateExportPackagePdfArtifact,
  validateExportPackageJsonArtifact,
  validateSWEBodelningExportPackagePdfArtifact,
  validateSWEBodelningExportPackagePdfArtifactProjection,
  validateSWEBodelningExportPackageJsonArtifact,
  validateCMDExportPackageJsonArtifact,
  validateCMDExportPackageJsonArtifactProjection,
  validateCMDExportPackageMarkdownArtifact,
  validateCMDExportPackageMarkdownArtifactProjection,
  validateExportPackageMarkdownArtifact,
  validateSWEBodelningExportPackageMarkdownArtifact,
  validateSWEBodelningExportPackageJsonArtifactProjection,
  validateSWEBodelningExportPackageMarkdownArtifactProjection,
  validateSWEBodelningExportPackageProjection,
  validateCMDProfileDossierProjection,
  validateCMDProfileDossierSnapshot,
  validateSWEBodelningProfileDossierProjection,
  validateSWEBodelningProfileDossierSnapshot,
  validateCMDExportPackage,
  validateCMDExportPackageProjection,
  validateCMDProfileInputSnapshot,
  validateCMDReleaseEvalRun,
  validateReleaseEvalSemanticFactAlignment,
  validateExportPackageBundleArchiveArtifactStopMatrixAlignment,
  validateExportPackageBundleArchiveArtifactStopOutcomeAlignment,
  validateExportPackageBundleArchiveArtifactTraceabilityAlignment,
  validateExportPackageBundleManifestStopMatrixAlignment,
  validateExportPackageBundleManifestStopOutcomeAlignment,
  validateExportPackageBundleManifestTraceabilityAlignment,
  validateExportPackageDocxArtifactStopMatrixAlignment,
  validateExportPackageDocxArtifactStopOutcomeAlignment,
  validateExportPackageDocxArtifactTraceabilityAlignment,
  validateExportPackageJsonArtifactStopMatrixAlignment,
  validateExportPackageJsonArtifactStopOutcomeAlignment,
  validateExportPackageJsonArtifactTraceabilityAlignment,
  validateExportPackageMarkdownArtifactStopMatrixAlignment,
  validateExportPackageMarkdownArtifactStopOutcomeAlignment,
  validateExportPackageMarkdownArtifactTraceabilityAlignment,
  validateExportPackagePdfArtifactStopMatrixAlignment,
  validateExportPackagePdfArtifactStopOutcomeAlignment,
  validateExportPackagePdfArtifactTraceabilityAlignment,
  validateExportPackageStopMatrixAlignment,
  validateExportPackageStopOutcomeAlignment,
  validateExportPackageTraceabilityAlignment,
  validateProfileInputSemanticFactAlignment,
  validateProfileDossierStopMatrixAlignment,
  validateProfileDossierStopOutcomeAlignment,
  validateProfileDossierTraceabilityAlignment,
  validateSWEBodelningProfileInputSnapshot,
  validateSWEBodelningReleaseEvalRun,
  validateExportPackage,
  validateReleaseEvalStopMatrixAlignment,
  validateReleaseEvalStopOutcomeAlignment,
  validateReleaseEvalTraceabilityAlignment,
  validateReleaseEvalRun,
  validateJurisdictionProfileRegistry,
  validateSemanticFactModel,
  validateSnapshotStatusTraceabilityAlignment,
  validateStopMatrixModel,
  validateStopOutcomeModel,
  validateTraceabilityModel,
  validateNoRawMetadataManifest,
};

function validateNoRawMetadataManifest(
  input,
  errorCode = "ERR_NO_RAW_METADATA_MANIFEST_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertAllowedKeys(
    input,
    Object.keys(noRawMetadataManifest.properties),
    errorCode,
    "input",
  );
  assertExactKeys(input, noRawMetadataManifest.required, errorCode, "input");

  for (const field of noRawMetadataManifest.required) {
    const definition = noRawMetadataManifest.properties[field];
    const value = input[field];
    const fieldName = `input.${field}`;

    if (definition.type !== "string" || typeof value !== "string") {
      throw createSchemaValidationError(
        errorCode,
        `${fieldName} must be a string`,
        { field: fieldName },
      );
    }

    if (definition.minLength && value.length < definition.minLength) {
      throw createSchemaValidationError(
        errorCode,
        `${fieldName} must not be empty`,
        { field: fieldName },
      );
    }

    if (Object.hasOwn(definition, "const")) {
      validateStringEnum(value, [definition.const], fieldName, errorCode);
    }

    if (Array.isArray(definition.enum)) {
      validateStringEnum(value, definition.enum, fieldName, errorCode);
    }
  }

  return input;
}
const humanReviewChronology = require("../../../schemas/human-review-chronology.json"), humanReviewChronologyValidatorResult = require("../../../schemas/human-review-chronology-validator-result.json"), { validateHumanReviewChronology } = require("./human-review-chronology-validator.js"), humanReviewSourceRegister = require("../../../schemas/human-review-source-register.json"), humanReviewSourceRegisterValidatorResult = require("../../../schemas/human-review-source-register-validator-result.json"), { validateHumanReviewSourceRegister } = require("./human-review-source-register-validator.js"), humanReviewChronologySourceRegisterCrossReferenceResult = require("../../../schemas/human-review-chronology-source-register-cross-reference-result.json"), humanReviewAssertedClaimMatrix = require("../../../schemas/human-review-asserted-claim-matrix.json"), humanReviewAssertedClaimMatrixValidatorResult = require("../../../schemas/human-review-asserted-claim-matrix-validator-result.json"), humanReviewAssertedClaimMatrixCrossReferenceResult = require("../../../schemas/human-review-asserted-claim-matrix-cross-reference-result.json"), humanReviewDeclaredPacketReviewGaps = require("../../../schemas/human-review-declared-packet-review-gaps.json"), humanReviewDeclaredPacketReviewGapsValidatorResult = require("../../../schemas/human-review-declared-packet-review-gaps-validator-result.json"), humanReviewDeclaredPacketReviewGapsCrossReferenceResult = require("../../../schemas/human-review-declared-packet-review-gaps-cross-reference-result.json"), humanReviewQuestions = require("../../../schemas/human-review-questions.json"), humanReviewQuestionsValidatorResult = require("../../../schemas/human-review-questions-validator-result.json"), humanReviewQuestionsCrossReferenceResult = require("../../../schemas/human-review-questions-cross-reference-result.json"), humanReviewNoConclusionNotice = require("../../../schemas/human-review-no-conclusion-notice.json"), humanReviewNoConclusionNoticeValidatorResult = require("../../../schemas/human-review-no-conclusion-notice-validator-result.json"), humanReviewNoConclusionNoticeCrossReferenceResult = require("../../../schemas/human-review-no-conclusion-notice-cross-reference-result.json"), humanReviewControlledHandoffBrief = require("../../../schemas/human-review-controlled-handoff-brief.json"), humanReviewControlledHandoffBriefValidatorResult = require("../../../schemas/human-review-controlled-handoff-brief-validator-result.json"), humanReviewControlledHandoffBriefCrossReferenceResult = require("../../../schemas/human-review-controlled-handoff-brief-cross-reference-result.json"), humanReviewControlledHandoffHumanProfessionalApproval = require("../../../schemas/human-review-controlled-handoff-human-professional-approval.json"), humanReviewControlledHandoffHumanProfessionalApprovalValidatorResult = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json"), humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidence = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json"), humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidenceValidatorResult = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result.json"), humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json"), humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidatorResult = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-result.json"), { validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence } = require("./human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.js"), humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json"), humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidatorResult = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result.json"), { validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence } = require("./human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js"), humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json"), humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorResult = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result.json"), { validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence } = require("./human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.js"), humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json"), { validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence } = require("./human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js");
const humanReviewStateModel = require("../../../schemas/human-review-state-model.json"); const humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json");
const humanReviewStateModelRequiredKeys = humanReviewStateModel.required;
const humanReviewStateModelValues =
  humanReviewStateModel.properties.review_state.enum;
const humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidatorResult = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json"); const humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorResult = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json");
function validateHumanReviewStateModel(
  input,
  errorCode = "ERR_HUMAN_REVIEW_STATE_INVALID",
) {
  assertPlainObject(input, errorCode, "input");
  assertExactKeys(input, humanReviewStateModelRequiredKeys, errorCode, "input");

  validateStringEnum(
    input.review_state,
    humanReviewStateModelValues,
    "review_state",
    errorCode,
  );

  return input;
}
module.exports.humanReviewChronology = humanReviewChronology; module.exports.humanReviewChronologyValidatorResult = humanReviewChronologyValidatorResult; module.exports.validateHumanReviewChronology = validateHumanReviewChronology; module.exports.humanReviewSourceRegister = humanReviewSourceRegister; module.exports.humanReviewSourceRegisterValidatorResult = humanReviewSourceRegisterValidatorResult; module.exports.validateHumanReviewSourceRegister = validateHumanReviewSourceRegister; module.exports.humanReviewChronologySourceRegisterCrossReferenceResult = humanReviewChronologySourceRegisterCrossReferenceResult; module.exports.humanReviewAssertedClaimMatrix = humanReviewAssertedClaimMatrix; module.exports.humanReviewAssertedClaimMatrixValidatorResult = humanReviewAssertedClaimMatrixValidatorResult; module.exports.humanReviewAssertedClaimMatrixCrossReferenceResult = humanReviewAssertedClaimMatrixCrossReferenceResult; module.exports.humanReviewDeclaredPacketReviewGaps = humanReviewDeclaredPacketReviewGaps; module.exports.humanReviewDeclaredPacketReviewGapsValidatorResult = humanReviewDeclaredPacketReviewGapsValidatorResult; module.exports.humanReviewDeclaredPacketReviewGapsCrossReferenceResult = humanReviewDeclaredPacketReviewGapsCrossReferenceResult; module.exports.humanReviewQuestions = humanReviewQuestions; module.exports.humanReviewQuestionsValidatorResult = humanReviewQuestionsValidatorResult; module.exports.humanReviewQuestionsCrossReferenceResult = humanReviewQuestionsCrossReferenceResult; module.exports.humanReviewNoConclusionNotice = humanReviewNoConclusionNotice; module.exports.humanReviewNoConclusionNoticeValidatorResult = humanReviewNoConclusionNoticeValidatorResult; module.exports.humanReviewNoConclusionNoticeCrossReferenceResult = humanReviewNoConclusionNoticeCrossReferenceResult; module.exports.humanReviewControlledHandoffBrief = humanReviewControlledHandoffBrief; module.exports.humanReviewControlledHandoffBriefValidatorResult = humanReviewControlledHandoffBriefValidatorResult; module.exports.humanReviewControlledHandoffBriefCrossReferenceResult = humanReviewControlledHandoffBriefCrossReferenceResult; module.exports.humanReviewControlledHandoffHumanProfessionalApproval = humanReviewControlledHandoffHumanProfessionalApproval; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalValidatorResult = humanReviewControlledHandoffHumanProfessionalApprovalValidatorResult; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidence = humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidence; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidenceValidatorResult = humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidenceValidatorResult; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence = humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidatorResult = humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidatorResult; module.exports.validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence = validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence = humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidatorResult = humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidatorResult; module.exports.validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence = validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence = humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorResult = humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorResult; module.exports.validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence = validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence = humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence; module.exports.validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence = validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence;
module.exports.humanReviewStateModel = humanReviewStateModel; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidatorResult = humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidatorResult; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence = humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence;
module.exports.validateHumanReviewStateModel = validateHumanReviewStateModel; module.exports.humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorResult = humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorResult;
