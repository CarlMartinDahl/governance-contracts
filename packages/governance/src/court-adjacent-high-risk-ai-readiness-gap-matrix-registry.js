"use strict";

const deepFreeze = (value) => {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }

  Object.freeze(value);
  for (const nested of Object.values(value)) {
    deepFreeze(nested);
  }

  return value;
};

const cloneAndFreeze = (value) => deepFreeze(structuredClone(value));

const COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES = deepFreeze({
  RBAC_ACCESS_CONTROL: "RBAC_ACCESS_CONTROL",
  AUDIT_ACCESS_LOG: "AUDIT_ACCESS_LOG",
  DATA_LIFECYCLE_RDE: "DATA_LIFECYCLE_RDE",
  PROVIDER_THIRD_PARTY_ROUTING: "PROVIDER_THIRD_PARTY_ROUTING",
  RAW_MATERIAL_SOURCE_HANDLING: "RAW_MATERIAL_SOURCE_HANDLING",
  PILOT_RUNTIME_PRIVATE_CASE_PROCESSING:
    "PILOT_RUNTIME_PRIVATE_CASE_PROCESSING",
  SECURITY_REVIEW_METHOD_SCOPE: "SECURITY_REVIEW_METHOD_SCOPE",
  PRIVACY_GDPR_DPIA: "PRIVACY_GDPR_DPIA",
  EU_AI_ACT_HIGH_RISK_READINESS: "EU_AI_ACT_HIGH_RISK_READINESS",
  HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW:
    "HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW",
  SWE_JURISDICTION_MODULE: "SWE_JURISDICTION_MODULE",
  DK_JURISDICTION_MODULE: "DK_JURISDICTION_MODULE",
  EXTERNAL_EXPERT_REVIEW: "EXTERNAL_EXPERT_REVIEW",
  NO_RAW_NO_CONCLUSION_COUNTER_CONTEXT:
    "NO_RAW_NO_CONCLUSION_COUNTER_CONTEXT",
  EXTERNAL_USE_PRODUCT_READINESS: "EXTERNAL_USE_PRODUCT_READINESS",
  COURT_ADJACENT_PILOT_CLOSURE_CRITERIA:
    "COURT_ADJACENT_PILOT_CLOSURE_CRITERIA",
});

const COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS = deepFreeze({
  DOCS_ONLY_GAP_MATRIX: "DOCS_ONLY_GAP_MATRIX",
  REGISTRY_SCAFFOLD_ONLY: "REGISTRY_SCAFFOLD_ONLY",
  FUTURE_ONLY_CANDIDATE_ONLY: "FUTURE_ONLY_CANDIDATE_ONLY",
  RUNTIME_GATE_INVENTORY_DEFERRED: "RUNTIME_GATE_INVENTORY_DEFERRED",
  NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT:
    "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  NOT_COURT_READY: "NOT_COURT_READY",
  NOT_APPROVED_TOOL_READY: "NOT_APPROVED_TOOL_READY",
  NOT_EXTERNAL_USE_READY: "NOT_EXTERNAL_USE_READY",
  NOT_REAL_PRIVATE_CASE_READY: "NOT_REAL_PRIVATE_CASE_READY",
  HUMAN_PROFESSIONAL_REVIEW_REQUIRED:
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const COURT_ADJACENT_HIGH_RISK_AI_READINESS_EVIDENCE_POSTURE = deepFreeze({
  DOCS_ONLY_GAP_MATRIX: "DOCS_ONLY_GAP_MATRIX",
  REGISTRY_SCAFFOLD_EVIDENCE: "REGISTRY_SCAFFOLD_EVIDENCE",
  TESTED_ALIGNMENT_EVIDENCE: "TESTED_ALIGNMENT_EVIDENCE",
  FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED:
    "FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED",
  EXTERNAL_EXPERT_REVIEW_REQUIRED: "EXTERNAL_EXPERT_REVIEW_REQUIRED",
  HUMAN_PROFESSIONAL_REVIEW_REQUIRED:
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const BASE_NON_AUTHORIZATIONS = deepFreeze({
  authorized: false,
  court_ready: false,
  approved_tool_ready: false,
  external_use_authorized: false,
  product_candidate_selected: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
  release_approved: false,
  real_private_case_ready: false,
  legal_decision_ready: false,
  clinical_decision_ready: false,
  evidentiary_proof_ready: false,
  eu_ai_act_compliance_ready: false,
  runtime_implemented: false,
  pilot_started: false,
  security_finding_created: false,
  vulnerability_finding_created: false,
  severity_assigned: false,
  remediation_recommended: false,
  remediation_implemented: false,
  retention_implemented: false,
  deletion_implemented: false,
  purge_implemented: false,
  erasure_implemented: false,
  encryption_implemented: false,
  key_management_implemented: false,
  provider_retention_deletion_implemented: false,
  audit_access_log_implemented: false,
  rbac_implemented: false,
  access_control_implemented: false,
  runtime_gate_implemented: false,
  validator_dispatch_created: false,
  runtime_registry_lookup_created: false,
  third_party_routing_implemented: false,
  raw_material_routing_implemented: false,
  source_package_inspected: false,
  metadata_acquired: false,
});

const COURT_ADJACENT_HIGH_RISK_AI_READINESS_NON_OVERCLAIM_RULES =
  deepFreeze([
    "GAP_MATRIX_ROW does not mean COURT_READY",
    "GAP_MATRIX_ROW does not mean APPROVED_TOOL_READY",
    "GAP_MATRIX_ROW does not mean EXTERNAL_USE_READY",
    "GAP_MATRIX_ROW does not mean REAL_PRIVATE_CASE_READY",
    "GAP_MATRIX_ROW does not mean LEGAL_DECISION_READY",
    "GAP_MATRIX_ROW does not mean CLINICAL_DECISION_READY",
    "GAP_MATRIX_ROW does not mean EVIDENTIARY_PROOF_READY",
    "EU_AI_ACT_READINESS_ROW does not mean EU_AI_ACT_COMPLIANCE_READY",
    "SECURITY_REVIEW_METHOD_SCOPE does not mean SECURITY_FINDING",
    "SECURITY_REVIEW_METHOD_SCOPE does not mean SEVERITY_ASSIGNED",
    "SECURITY_REVIEW_METHOD_SCOPE does not mean REMEDIATION_RECOMMENDED",
    "HUMAN_OVERSIGHT_REQUIREMENT does not mean SYSTEM_APPROVAL",
    "JURISDICTION_MODULE_ROW does not mean DOMAIN_CONCLUSION",
    "EXTERNAL_EXPERT_REVIEW_REQUIRED does not mean EXTERNAL_USE_AUTHORIZED",
    "CLOSURE_CRITERIA_ROW does not mean PILOT_CLOSURE",
    "CI_EVIDENCE does not mean RELEASE_EVIDENCE",
  ]);

const COURT_ADJACENT_HIGH_RISK_AI_READINESS_REQUIRED_PREREQUISITES =
  deepFreeze([
    "RBAC/access-control implementation evidence in a future authorized slice",
    "audit/access-log implementation evidence in a future authorized slice",
    "RDE lifecycle readiness evidence for retention/deletion/encryption in a future authorized slice",
    "third-party/provider routing posture evidence in a future authorized slice",
    "raw/private/source material handling boundary evidence",
    "pilot/runtime readiness remains blocked until separately evidenced",
    "security review method/scope review by authorized reviewers",
    "privacy/GDPR and DPIA review by authorized reviewers",
    "EU AI Act high-risk readiness review by authorized reviewers",
    "human oversight and professional review gate",
    "SWE jurisdiction module review by authorized reviewers",
    "DK jurisdiction module review by authorized reviewers",
    "external expert review gate before court-adjacent use",
    "no-raw/no-conclusion/counter-context boundary evidence",
    "external-use/product readiness closure remains separately blocked",
    "court-adjacent pilot closure criteria remain separately blocked",
  ]);

const commonStatuses = deepFreeze([
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS.DOCS_ONLY_GAP_MATRIX,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS
    .REGISTRY_SCAFFOLD_ONLY,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS
    .FUTURE_ONLY_CANDIDATE_ONLY,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS
    .RUNTIME_GATE_INVENTORY_DEFERRED,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS
    .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS.NOT_COURT_READY,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS
    .NOT_APPROVED_TOOL_READY,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS
    .NOT_EXTERNAL_USE_READY,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS
    .NOT_REAL_PRIVATE_CASE_READY,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS
    .HUMAN_PROFESSIONAL_REVIEW_REQUIRED,
]);

const makeRow = ({
  id,
  controlArea,
  jurisdictionScope = "CROSS_JURISDICTION",
  courtUseRelevance,
  implementationGap,
  testEvidenceGap,
  securityReviewGap,
  privacyGdprDependency,
  euAiActDependency,
  humanOversightRequirement,
  jurisdictionSpecificDependency = "jurisdiction review remains separate",
  externalExpertReviewRequired = true,
  blockerForInternalSanitizedPilot = true,
  closureCriteria,
  relatedRdeRuntimeBlockerIds = [],
  relatedTprRuntimeBlockerIds = [],
  relatedAalRuntimeBlockerIds = [],
  relatedRolePermissionGapIds = [],
  relatedRuntimeGateCandidateIds = [],
  relatedGlobalAccessControlRowIds = [],
  relatedAdminSupportGapIds = [],
  relatedRawMaterialRoutingControlIds = [],
  relatedStorageLocationIds = [],
  relatedMaterialClasses = [],
  notes,
}) =>
  deepFreeze({
    id,
    control_area: controlArea,
    jurisdiction_scope: jurisdictionScope,
    court_use_relevance: courtUseRelevance,
    current_evidence_level: "DOCS_ONLY_REGISTRY_SCAFFOLD_EVIDENCE",
    implementation_gap: implementationGap,
    test_evidence_gap: testEvidenceGap,
    security_review_gap: securityReviewGap,
    privacy_gdpr_dependency: privacyGdprDependency,
    eu_ai_act_dependency: euAiActDependency,
    human_oversight_requirement: humanOversightRequirement,
    jurisdiction_specific_dependency: jurisdictionSpecificDependency,
    external_expert_review_required: externalExpertReviewRequired,
    blocker_for_private_case_processing: true,
    blocker_for_internal_sanitized_pilot: blockerForInternalSanitizedPilot,
    blocker_for_court_adjacent_pilot: true,
    blocker_for_external_use: true,
    closure_criteria: closureCriteria,
    related_rde_runtime_blocker_ids: relatedRdeRuntimeBlockerIds,
    related_tpr_runtime_blocker_ids: relatedTprRuntimeBlockerIds,
    related_aal_runtime_blocker_ids: relatedAalRuntimeBlockerIds,
    related_role_permission_gap_ids: relatedRolePermissionGapIds,
    related_runtime_gate_candidate_ids: relatedRuntimeGateCandidateIds,
    related_global_access_control_row_ids: relatedGlobalAccessControlRowIds,
    related_admin_support_gap_ids: relatedAdminSupportGapIds,
    related_raw_material_routing_control_ids:
      relatedRawMaterialRoutingControlIds,
    related_storage_location_ids: relatedStorageLocationIds,
    related_material_classes: relatedMaterialClasses,
    evidence_posture: [
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_EVIDENCE_POSTURE
        .DOCS_ONLY_GAP_MATRIX,
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_EVIDENCE_POSTURE
        .REGISTRY_SCAFFOLD_EVIDENCE,
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_EVIDENCE_POSTURE
        .FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED,
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_EVIDENCE_POSTURE
        .EXTERNAL_EXPERT_REVIEW_REQUIRED,
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_EVIDENCE_POSTURE
        .HUMAN_PROFESSIONAL_REVIEW_REQUIRED,
    ],
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    notes,
    current_readiness_status: commonStatuses,
  });

const COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_REGISTRY = deepFreeze([
  makeRow({
    id: "CAHR-AI-GAP-001_RBAC_ACCESS_CONTROL",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .RBAC_ACCESS_CONTROL,
    courtUseRelevance:
      "court-adjacent use requires resolved RBAC/access-control evidence",
    implementationGap: "RBAC_ACCESS_CONTROL_NOT_IMPLEMENTED",
    testEvidenceGap: "role/permission and access-control tests remain gap-only",
    securityReviewGap: "authorization review remains incomplete",
    privacyGdprDependency: "case and tenant scoping must be reviewed",
    euAiActDependency: "access-control evidence is a high-risk readiness input",
    humanOversightRequirement:
      "human/professional review remains required for access boundaries",
    closureCriteria: [
      "role/permission model implemented in a future authorized slice",
      "access-control enforcement implemented in a future authorized slice",
      "human/professional review completed outside this scaffold",
    ],
    relatedRolePermissionGapIds: [
      "RP-SG-001_ACTOR_SUBJECT_MODEL_GAP",
      "RP-SG-009_OBJECT_LEVEL_AUTHORIZATION_GAP",
      "RP-SG-019_GLOBAL_AUTHORIZATION_MODEL_DEPENDENCY_GAP",
    ],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-002_MATERIAL_VIEW_ACCESS_GATE_CANDIDATE",
      "RBAC-GC-016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE",
    ],
    relatedGlobalAccessControlRowIds: [
      "GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP",
      "GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP",
    ],
    relatedAdminSupportGapIds: [
      "ADMIN-SUPPORT-GAP-001_ADMIN_SUPPORT_MODEL_ABSENT",
    ],
    relatedStorageLocationIds: [
      "L01_REPO_TRACKED_SOURCE_FILES",
      "L02_REPO_TRACKED_TEST_FILES",
    ],
    relatedMaterialClasses: ["SYNTHETIC_NO_RAW_MATERIAL"],
    notes: "RBAC/access-control readiness remains gap-only.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-002_AUDIT_ACCESS_LOG",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .AUDIT_ACCESS_LOG,
    courtUseRelevance:
      "court-adjacent use requires audit/access-log evidence boundaries",
    implementationGap: "AUDIT_ACCESS_LOG_NOT_IMPLEMENTED",
    testEvidenceGap: "audit/access-log proof remains registry-only",
    securityReviewGap: "log review and log viewer RBAC remain unresolved",
    privacyGdprDependency: "log content and retention need privacy review",
    euAiActDependency: "logging evidence is a high-risk readiness input",
    humanOversightRequirement:
      "human/professional review remains required for log evidence posture",
    closureCriteria: [
      "audit/access-log implementation authorized separately",
      "log schema/storage authorized separately",
      "log viewer RBAC authorized separately",
    ],
    relatedAalRuntimeBlockerIds: [
      "AAL-RUNTIME-BLOCKER-001_MATERIAL_INTAKE_EVENT",
      "AAL-RUNTIME-BLOCKER-016_AUDIT_LOG_VIEWER_ACCESS_EVENT",
    ],
    relatedRolePermissionGapIds: ["RP-SG-013_LOG_VIEWER_RBAC_GAP"],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-012_AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE",
    ],
    relatedStorageLocationIds: ["L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"],
    relatedMaterialClasses: ["AUDIT_ACCESS_EVENT_RECORD"],
    notes: "Audit/access-log evidence remains future-only.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-003_DATA_LIFECYCLE_RDE",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .DATA_LIFECYCLE_RDE,
    courtUseRelevance:
      "court-adjacent use requires retention/deletion/encryption readiness",
    implementationGap: "RDE_LIFECYCLE_NOT_IMPLEMENTED",
    testEvidenceGap: "RDE runtime blocker tests remain proof-only",
    securityReviewGap: "lifecycle security review remains incomplete",
    privacyGdprDependency: "retention/deletion posture needs privacy review",
    euAiActDependency: "data governance evidence is a high-risk readiness input",
    humanOversightRequirement:
      "human/professional review remains required for lifecycle closure",
    closureCriteria: [
      "retention/deletion/purge/erasure implementation authorized separately",
      "encryption/key-management implementation authorized separately",
      "provider/recipient lifecycle evidence authorized separately",
    ],
    relatedRdeRuntimeBlockerIds: [
      "RDE-RUNTIME-BLOCKER-001_RETENTION_POLICY_RUNTIME_BOUNDARY",
      "RDE-RUNTIME-BLOCKER-002_DELETION_POLICY_RUNTIME_BOUNDARY",
      "RDE-RUNTIME-BLOCKER-004_ENCRYPTION_POLICY_RUNTIME_BOUNDARY",
    ],
    relatedAalRuntimeBlockerIds: [
      "AAL-RUNTIME-BLOCKER-012_RETENTION_DELETION_OPERATION_EVENT",
    ],
    relatedRolePermissionGapIds: [
      "RP-SG-015_RETENTION_DELETION_PERMISSION_GAP",
    ],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-013_RETENTION_DELETION_OPERATION_AUTHORIZATION_GATE_CANDIDATE",
    ],
    relatedStorageLocationIds: [
      "L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE",
      "L18_OBJECT_STORAGE_FUTURE",
    ],
    relatedMaterialClasses: ["NO_RAW_METADATA_MANIFEST_MATERIAL"],
    notes: "Lifecycle readiness remains blocked.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-004_PROVIDER_THIRD_PARTY_ROUTING",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .PROVIDER_THIRD_PARTY_ROUTING,
    courtUseRelevance:
      "court-adjacent use cannot rely on unresolved provider routing",
    implementationGap: "THIRD_PARTY_ROUTING_NOT_IMPLEMENTED",
    testEvidenceGap: "provider routing evidence remains blocker-only",
    securityReviewGap: "provider security posture remains unresolved",
    privacyGdprDependency: "provider/data transfer review remains required",
    euAiActDependency: "third-party route posture is high-risk readiness input",
    humanOversightRequirement:
      "human/professional review remains required for provider routing",
    closureCriteria: [
      "provider registry/status authorized separately",
      "data-routing map authorized separately",
      "token/URL/secret handling authorized separately",
    ],
    relatedTprRuntimeBlockerIds: [
      "TPR-RUNTIME-BLOCKER-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST",
      "TPR-RUNTIME-BLOCKER-006_PROVIDER_RETENTION_DELETION_POSTURE",
      "TPR-RUNTIME-BLOCKER-008_PROVIDER_TOKEN_URL_SECRET_HANDLING",
    ],
    relatedAalRuntimeBlockerIds: [
      "AAL-RUNTIME-BLOCKER-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT",
    ],
    relatedRolePermissionGapIds: [
      "RP-SG-016_THIRD_PARTY_ROUTING_PERMISSION_GAP",
    ],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-011_THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE",
    ],
    relatedStorageLocationIds: [
      "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
    ],
    relatedMaterialClasses: [
      "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
      "TOKEN_URL_SECRET_MATERIAL",
    ],
    notes: "Provider routing remains not authorized.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-005_RAW_MATERIAL_SOURCE_HANDLING",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .RAW_MATERIAL_SOURCE_HANDLING,
    courtUseRelevance:
      "court-adjacent use cannot include raw/private/source material handling",
    implementationGap: "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    testEvidenceGap: "raw material denial remains descriptor-only",
    securityReviewGap: "source material handling review remains absent",
    privacyGdprDependency: "raw/private material handling needs privacy review",
    euAiActDependency: "input data governance is a high-risk readiness input",
    humanOversightRequirement:
      "human/professional review remains required before source handling",
    closureCriteria: [
      "raw/private/source inspection remains separately unauthorized",
      "source package inspection remains separately unauthorized",
      "PDF/image/screenshot/metadata acquisition remains separately unauthorized",
    ],
    relatedRmrControlIds: [],
    relatedRawMaterialRoutingControlIds: [
      "RMR-CS-006_RAW_PRIVATE_SOURCE_MATERIAL",
      "RMR-CS-007_SOURCE_PACKAGE_MATERIAL",
      "RMR-CS-008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
    ],
    relatedAalRuntimeBlockerIds: [
      "AAL-RUNTIME-BLOCKER-002_BLOCKED_PROHIBITED_INGRESS_EVENT",
      "AAL-RUNTIME-BLOCKER-003_QUARANTINE_BLOCK_DECISION_EVENT",
    ],
    relatedRolePermissionGapIds: [
      "RP-SG-017_RAW_MATERIAL_ROUTING_PERMISSION_GAP",
    ],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-005_RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE",
      "RBAC-GC-006_SOURCE_PACKAGE_DENY_QUARANTINE_GATE_CANDIDATE",
      "RBAC-GC-007_PDF_IMAGE_SCREENSHOT_METADATA_DENY_ACQUISITION_GATE_CANDIDATE",
    ],
    relatedStorageLocationIds: [
      "L11_LOCAL_UNTRACKED_FILES",
      "L14_LOCAL_ARCHIVES_OR_ZIPS",
    ],
    relatedMaterialClasses: [
      "RAW_PRIVATE_SOURCE_MATERIAL",
      "SOURCE_PACKAGE_MATERIAL",
      "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
    ],
    notes: "High-risk raw/source material remains denied.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-006_PILOT_RUNTIME_PRIVATE_CASE_PROCESSING",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .PILOT_RUNTIME_PRIVATE_CASE_PROCESSING,
    courtUseRelevance:
      "private case processing is blocked until all prerequisite gates close",
    implementationGap: "PRIVATE_CASE_RUNTIME_PROCESSING_NOT_AUTHORIZED",
    testEvidenceGap: "synthetic registry tests do not authorize private runs",
    securityReviewGap: "runtime security review remains incomplete",
    privacyGdprDependency: "DPIA and lawful basis review remain required",
    euAiActDependency: "high-risk readiness review remains required",
    humanOversightRequirement:
      "human/professional review remains required before private processing",
    closureCriteria: [
      "runtime gate evidence authorized separately",
      "privacy/GDPR review completed separately",
      "no raw/private/source processing remains outside this scaffold",
    ],
    relatedRdeRuntimeBlockerIds: [
      "RDE-RUNTIME-BLOCKER-013_RUNTIME_GATE_LIFECYCLE_OPERATION_BOUNDARY",
    ],
    relatedTprRuntimeBlockerIds: [
      "TPR-RUNTIME-BLOCKER-014_RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_EVENT",
    ],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-014_ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE",
      "RBAC-GC-017_HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE",
    ],
    relatedGlobalAccessControlRowIds: [
      "GAC-TM-014_ALLOWED_DENIED_TEST_COVERAGE_PARTIAL",
      "GAC-TM-015_CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL",
    ],
    relatedStorageLocationIds: ["L25_CONNECTOR_TOOL_OR_AGENT_STATE"],
    relatedMaterialClasses: ["HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL"],
    notes: "Private case processing remains blocked.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-007_SECURITY_REVIEW_METHOD_SCOPE",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .SECURITY_REVIEW_METHOD_SCOPE,
    courtUseRelevance:
      "court-adjacent use needs a separately authorized security method scope",
    implementationGap: "SECURITY_REVIEW_SCOPE_NOT_CREATED",
    testEvidenceGap: "tests prove registry posture only",
    securityReviewGap: "no finding, severity, or remediation is created",
    privacyGdprDependency: "security/privacy review coordination required",
    euAiActDependency: "security method review is a high-risk readiness input",
    humanOversightRequirement:
      "human/professional review remains required for method acceptance",
    closureCriteria: [
      "security review scope authorized separately",
      "findings and severities, if any, created separately",
      "remediation recommendations, if any, created separately",
    ],
    relatedGlobalAccessControlRowIds: [
      "GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP",
      "GAC-TM-008_PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP",
    ],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE",
    ],
    relatedStorageLocationIds: ["L03_REPO_TRACKED_DOCS"],
    relatedMaterialClasses: ["NO_RAW_METADATA_MANIFEST_MATERIAL"],
    notes: "Security review scope remains advisory and non-finding.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-008_PRIVACY_GDPR_DPIA",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .PRIVACY_GDPR_DPIA,
    courtUseRelevance: "court-adjacent use requires privacy/GDPR gating",
    implementationGap: "PRIVACY_GDPR_DPIA_NOT_COMPLETED",
    testEvidenceGap: "DPIA evidence is not created by tests",
    securityReviewGap: "privacy-security dependencies remain open",
    privacyGdprDependency: "DPIA and privacy review remain required",
    euAiActDependency: "privacy governance is a high-risk readiness input",
    humanOversightRequirement:
      "human/professional review remains required for privacy posture",
    closureCriteria: [
      "DPIA completed by authorized reviewers",
      "data minimization and retention controls evidenced separately",
      "no external-use authorization inferred",
    ],
    relatedRdeRuntimeBlockerIds: [
      "RDE-RUNTIME-BLOCKER-006_MATERIAL_CLASS_LIFECYCLE_BOUNDARY",
      "RDE-RUNTIME-BLOCKER-008_AUDIT_ACCESS_LOG_RETENTION_BOUNDARY",
    ],
    relatedGlobalAccessControlRowIds: [
      "GAC-TM-008_PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP",
    ],
    relatedStorageLocationIds: ["L03_REPO_TRACKED_DOCS"],
    relatedMaterialClasses: ["SANITIZED_TEXT_PRIMARY_MATERIAL"],
    notes: "Privacy/GDPR readiness remains not evidenced.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-009_EU_AI_ACT_HIGH_RISK_READINESS",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .EU_AI_ACT_HIGH_RISK_READINESS,
    jurisdictionScope: "EU",
    courtUseRelevance:
      "court-adjacent use needs separate EU AI Act high-risk review",
    implementationGap: "EU_AI_ACT_HIGH_RISK_READINESS_NOT_EVIDENCED",
    testEvidenceGap: "registry tests are not compliance evidence",
    securityReviewGap: "risk management review remains separate",
    privacyGdprDependency: "privacy/GDPR review remains prerequisite",
    euAiActDependency: "EU AI Act high-risk review remains required",
    humanOversightRequirement:
      "human oversight requirements remain separately unevidenced",
    closureCriteria: [
      "EU AI Act review completed by authorized reviewers",
      "risk management and human oversight evidenced separately",
      "technical documentation evidenced separately",
    ],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-017_HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE",
    ],
    relatedGlobalAccessControlRowIds: [
      "GAC-TM-013_SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL",
    ],
    relatedStorageLocationIds: ["L03_REPO_TRACKED_DOCS"],
    relatedMaterialClasses: ["NO_RAW_METADATA_MANIFEST_MATERIAL"],
    notes: "EU AI Act high-risk readiness is not created here.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-010_HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW,
    courtUseRelevance:
      "court-adjacent use requires human/professional review as release gate",
    implementationGap: "HUMAN_OVERSIGHT_MODEL_NOT_IMPLEMENTED",
    testEvidenceGap: "tests do not replace professional review",
    securityReviewGap: "review accountability remains separate",
    privacyGdprDependency: "review access privacy boundaries remain required",
    euAiActDependency: "human oversight is a high-risk readiness dependency",
    humanOversightRequirement:
      "professional review remains required before any court-adjacent pilot",
    closureCriteria: [
      "professional review protocol authorized separately",
      "reviewer qualification and responsibility evidenced separately",
      "system approval is not inferred from review requirement",
    ],
    relatedAalRuntimeBlockerIds: [
      "AAL-RUNTIME-BLOCKER-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT",
    ],
    relatedRdeRuntimeBlockerIds: [
      "RDE-RUNTIME-BLOCKER-014_HUMAN_PROFESSIONAL_REVIEW_LIFECYCLE_DEPENDENCY",
    ],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-017_HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE",
    ],
    relatedRawMaterialRoutingControlIds: [
      "RMR-CS-010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
    ],
    relatedStorageLocationIds: ["L24_PR_COMMENTS_ISSUES_REVIEW_METADATA"],
    relatedMaterialClasses: ["HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL"],
    notes: "Human/professional review remains a separate gate.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-011_SWE_JURISDICTION_MODULE",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .SWE_JURISDICTION_MODULE,
    jurisdictionScope: "SWE",
    courtUseRelevance:
      "Swedish court-adjacent use requires jurisdiction-specific review",
    implementationGap: "SWE_JURISDICTION_MODULE_NOT_AUTHORIZED",
    testEvidenceGap: "registry tests do not create Swedish legal conclusions",
    securityReviewGap: "jurisdiction-specific risk review remains separate",
    privacyGdprDependency: "Swedish privacy posture review remains required",
    euAiActDependency: "EU AI Act review remains cross-cutting",
    humanOversightRequirement:
      "Swedish professional review remains required",
    jurisdictionSpecificDependency:
      "SWE jurisdiction module requires separate authorized review",
    closureCriteria: [
      "SWE jurisdiction module reviewed by authorized professional",
      "no legal conclusion inferred from scaffold row",
      "court-adjacent pilot remains blocked until closure",
    ],
    relatedGlobalAccessControlRowIds: ["GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL"],
    relatedStorageLocationIds: ["L03_REPO_TRACKED_DOCS"],
    relatedMaterialClasses: ["SANITIZED_TEXT_PRIMARY_MATERIAL"],
    notes: "SWE jurisdiction readiness remains separate.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-012_DK_JURISDICTION_MODULE",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .DK_JURISDICTION_MODULE,
    jurisdictionScope: "DK",
    courtUseRelevance:
      "Danish court-adjacent use requires jurisdiction-specific review",
    implementationGap: "DK_JURISDICTION_MODULE_NOT_AUTHORIZED",
    testEvidenceGap: "registry tests do not create Danish legal conclusions",
    securityReviewGap: "jurisdiction-specific risk review remains separate",
    privacyGdprDependency: "Danish privacy posture review remains required",
    euAiActDependency: "EU AI Act review remains cross-cutting",
    humanOversightRequirement: "Danish professional review remains required",
    jurisdictionSpecificDependency:
      "DK jurisdiction module requires separate authorized review",
    closureCriteria: [
      "DK jurisdiction module reviewed by authorized professional",
      "no legal conclusion inferred from scaffold row",
      "court-adjacent pilot remains blocked until closure",
    ],
    relatedGlobalAccessControlRowIds: ["GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL"],
    relatedStorageLocationIds: ["L03_REPO_TRACKED_DOCS"],
    relatedMaterialClasses: ["SANITIZED_TEXT_PRIMARY_MATERIAL"],
    notes: "DK jurisdiction readiness remains separate.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-013_EXTERNAL_EXPERT_REVIEW",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .EXTERNAL_EXPERT_REVIEW,
    courtUseRelevance:
      "court-adjacent pilot closure requires external expert review",
    implementationGap: "EXTERNAL_EXPERT_REVIEW_NOT_COMPLETED",
    testEvidenceGap: "test evidence is not expert review",
    securityReviewGap: "external technical/security review remains required",
    privacyGdprDependency: "external review access boundaries remain required",
    euAiActDependency: "external expert review supports high-risk readiness",
    humanOversightRequirement:
      "human/professional review remains prerequisite to expert closure",
    closureCriteria: [
      "external expert review completed outside this scaffold",
      "expert review does not create release approval",
      "expert review does not authorize external use",
    ],
    relatedAalRuntimeBlockerIds: [
      "AAL-RUNTIME-BLOCKER-006_REVIEW_ACCESS_EVENT",
    ],
    relatedRolePermissionGapIds: ["RP-SG-008_TENANT_CASE_SCOPING_GAP"],
    relatedStorageLocationIds: ["L24_PR_COMMENTS_ISSUES_REVIEW_METADATA"],
    relatedMaterialClasses: ["HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL"],
    notes: "External expert review remains required and incomplete.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-014_NO_RAW_NO_CONCLUSION_COUNTER_CONTEXT",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .NO_RAW_NO_CONCLUSION_COUNTER_CONTEXT,
    courtUseRelevance:
      "court-adjacent use requires strict no-raw and no-conclusion posture",
    implementationGap: "COUNTER_CONTEXT_BOUNDARY_NOT_RUNTIME_ENFORCED",
    testEvidenceGap: "tests do not inspect or validate private source truth",
    securityReviewGap: "counter-context misuse review remains separate",
    privacyGdprDependency:
      "raw/private/source exclusion remains privacy prerequisite",
    euAiActDependency:
      "data quality and human oversight dependencies remain open",
    humanOversightRequirement:
      "professional review remains required for any counter-context use",
    closureCriteria: [
      "no raw/private/source inspection authorized separately if ever needed",
      "no legal, clinical, evidentiary, or case-truth conclusion inferred",
      "counter-context remains descriptor-only",
    ],
    relatedRmrControlIds: [],
    relatedRawMaterialRoutingControlIds: [
      "RMR-CS-003_NO_RAW_METADATA_MANIFEST_MATERIAL",
      "RMR-CS-006_RAW_PRIVATE_SOURCE_MATERIAL",
      "RMR-CS-007_SOURCE_PACKAGE_MATERIAL",
    ],
    relatedAalRuntimeBlockerIds: [
      "AAL-RUNTIME-BLOCKER-002_BLOCKED_PROHIBITED_INGRESS_EVENT",
    ],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-005_RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE",
    ],
    relatedStorageLocationIds: ["L11_LOCAL_UNTRACKED_FILES"],
    relatedMaterialClasses: [
      "RAW_PRIVATE_SOURCE_MATERIAL",
      "SOURCE_PACKAGE_MATERIAL",
    ],
    notes: "No raw material or conclusion authority is created.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-015_EXTERNAL_USE_PRODUCT_READINESS",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .EXTERNAL_USE_PRODUCT_READINESS,
    courtUseRelevance:
      "external use and product candidate selection remain blocked",
    implementationGap: "PRODUCT_EXTERNAL_USE_READINESS_NOT_AUTHORIZED",
    testEvidenceGap: "green tests are not release evidence",
    securityReviewGap: "product security review remains separate",
    privacyGdprDependency: "privacy/GDPR approval remains separate",
    euAiActDependency: "high-risk readiness remains separate",
    humanOversightRequirement:
      "human/professional review remains required before external use",
    closureCriteria: [
      "release approval authorized separately",
      "external-use authorization authorized separately",
      "product-candidate selection authorized separately",
    ],
    relatedTprRuntimeBlockerIds: [
      "TPR-RUNTIME-BLOCKER-011_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT",
    ],
    relatedAalRuntimeBlockerIds: [
      "AAL-RUNTIME-BLOCKER-008_EXPORT_DOWNLOAD_EVENT",
      "AAL-RUNTIME-BLOCKER-009_PACKET_DELIVERY_PROMOTION_EVENT",
    ],
    relatedAdminSupportGapIds: [
      "ADMIN-SUPPORT-GAP-012_ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_DENIED",
    ],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-009_EXPORT_DOWNLOAD_ACCESS_GATE_CANDIDATE",
      "RBAC-GC-010_PACKET_DELIVERY_PROMOTION_GATE_CANDIDATE",
    ],
    relatedStorageLocationIds: [
      "L12_LOCAL_GENERATED_ARTIFACTS",
      "L13_LOCAL_EXPORT_PACKAGES",
    ],
    relatedMaterialClasses: ["GENERATED_ARTIFACT_OR_EXPORT_MATERIAL"],
    notes: "External-use and product readiness remain non-authorized.",
  }),
  makeRow({
    id: "CAHR-AI-GAP-016_COURT_ADJACENT_PILOT_CLOSURE_CRITERIA",
    controlArea:
      COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES
        .COURT_ADJACENT_PILOT_CLOSURE_CRITERIA,
    courtUseRelevance:
      "court-adjacent pilot closure requires all prerequisite evidence",
    implementationGap: "PILOT_CLOSURE_CRITERIA_NOT_MET",
    testEvidenceGap: "test-only proof does not close pilot criteria",
    securityReviewGap: "security and expert review closure remains separate",
    privacyGdprDependency: "privacy/GDPR closure remains separate",
    euAiActDependency: "EU AI Act readiness closure remains separate",
    humanOversightRequirement:
      "human/professional review remains release gate",
    blockerForInternalSanitizedPilot: true,
    closureCriteria: [
      "all listed gap rows closed in future authorized slices",
      "human/professional review completed separately",
      "external expert review completed separately",
      "release/external-use/product decisions authorized separately",
    ],
    relatedRdeRuntimeBlockerIds: [
      "RDE-RUNTIME-BLOCKER-014_HUMAN_PROFESSIONAL_REVIEW_LIFECYCLE_DEPENDENCY",
    ],
    relatedTprRuntimeBlockerIds: [
      "TPR-RUNTIME-BLOCKER-015_HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY",
    ],
    relatedAalRuntimeBlockerIds: [
      "AAL-RUNTIME-BLOCKER-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT",
    ],
    relatedRolePermissionGapIds: [
      "RP-SG-018_RUNTIME_GATE_DEPENDENCY_GAP",
    ],
    relatedRuntimeGateCandidateIds: [
      "RBAC-GC-017_HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE",
    ],
    relatedGlobalAccessControlRowIds: [
      "GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP",
    ],
    relatedAdminSupportGapIds: [
      "ADMIN-SUPPORT-GAP-012_ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_DENIED",
    ],
    relatedStorageLocationIds: ["L03_REPO_TRACKED_DOCS"],
    relatedMaterialClasses: ["NO_RAW_METADATA_MANIFEST_MATERIAL"],
    notes: "Pilot closure remains blocked and future-only.",
  }),
]);

const rowsById = new Map(
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_REGISTRY.map((row) => [
    row.id,
    row,
  ]),
);

const unknownClassification = deepFreeze({
  id: null,
  status:
    COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS
      .UNKNOWN_NOT_EVIDENCED,
  current_evidence_level:
    COURT_ADJACENT_HIGH_RISK_AI_READINESS_EVIDENCE_POSTURE
      .UNKNOWN_NOT_EVIDENCED,
  non_authorizations: BASE_NON_AUTHORIZATIONS,
});

function listCourtAdjacentHighRiskAiReadinessGapRows() {
  return COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_REGISTRY.map(
    cloneAndFreeze,
  );
}

function getCourtAdjacentHighRiskAiReadinessGapRow(id) {
  const row = rowsById.get(id);
  return row ? cloneAndFreeze(row) : null;
}

function classifyCourtAdjacentHighRiskAiReadinessGapRow(id) {
  const row = rowsById.get(id);
  if (!row) {
    return cloneAndFreeze(unknownClassification);
  }

  return cloneAndFreeze({
    id: row.id,
    status: row.current_readiness_status,
    current_evidence_level: row.current_evidence_level,
    non_authorizations: row.non_authorizations,
  });
}

function hasCourtAdjacentHighRiskAiReadinessGapRow(id) {
  return rowsById.has(id);
}

function listCourtAdjacentHighRiskAiReadinessNonOverclaimRules() {
  return COURT_ADJACENT_HIGH_RISK_AI_READINESS_NON_OVERCLAIM_RULES.map(
    cloneAndFreeze,
  );
}

function getCourtAdjacentHighRiskAiReadinessRequiredPrerequisites() {
  return cloneAndFreeze(
    COURT_ADJACENT_HIGH_RISK_AI_READINESS_REQUIRED_PREREQUISITES,
  );
}

function getCourtAdjacentHighRiskAiReadinessNonAuthorizationStatus() {
  return cloneAndFreeze(BASE_NON_AUTHORIZATIONS);
}

function isCourtReady() {
  return false;
}

function isExternalUseAuthorized() {
  return false;
}

function isProductCandidateSelected() {
  return false;
}

function isRuntimeCertified() {
  return false;
}

function isTechnicalSignoffCreated() {
  return false;
}

function isSecurityFindingCreated() {
  return false;
}

function isSeverityAssigned() {
  return false;
}

function isRemediationRecommended() {
  return false;
}

module.exports = {
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_DECISION_STATUS,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_EVIDENCE_POSTURE,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_REGISTRY,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_NON_OVERCLAIM_RULES,
  COURT_ADJACENT_HIGH_RISK_AI_READINESS_REQUIRED_PREREQUISITES,
  classifyCourtAdjacentHighRiskAiReadinessGapRow,
  getCourtAdjacentHighRiskAiReadinessGapRow,
  getCourtAdjacentHighRiskAiReadinessNonAuthorizationStatus,
  getCourtAdjacentHighRiskAiReadinessRequiredPrerequisites,
  hasCourtAdjacentHighRiskAiReadinessGapRow,
  isCourtReady,
  isExternalUseAuthorized,
  isProductCandidateSelected,
  isRemediationRecommended,
  isRuntimeCertified,
  isSecurityFindingCreated,
  isSeverityAssigned,
  isTechnicalSignoffCreated,
  listCourtAdjacentHighRiskAiReadinessGapRows,
  listCourtAdjacentHighRiskAiReadinessNonOverclaimRules,
};
