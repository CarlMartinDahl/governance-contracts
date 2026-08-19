"use strict";

const {
  HIGH_RISK_MATERIAL_CLASSES_DENIED,
  MATERIAL_CLASSES,
} = require("./storage-data-location-inventory-registry.js");

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

const RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS =
  deepFreeze({
    GOVERNANCE_REGISTRY_SCAFFOLD_ONLY:
      "GOVERNANCE_REGISTRY_SCAFFOLD_ONLY",
    PROVE_ONLY: "PROVE_ONLY",
    DOCS_ONLY_SCOPE_REVIEW_ONLY: "DOCS_ONLY_SCOPE_REVIEW_ONLY",
    TEST_ONLY_ALIGNMENT_PROOF_ONLY: "TEST_ONLY_ALIGNMENT_PROOF_ONLY",
    REVIEW_SUPPORT_ONLY: "REVIEW_SUPPORT_ONLY",
    RBAC_MODEL_NOT_IMPLEMENTED: "RBAC_MODEL_NOT_IMPLEMENTED",
    ACCESS_CONTROL_NOT_IMPLEMENTED: "ACCESS_CONTROL_NOT_IMPLEMENTED",
    ROLE_PERMISSION_MODEL_NOT_CREATED:
      "ROLE_PERMISSION_MODEL_NOT_CREATED",
    ROLE_FIELDS_NOT_CREATED: "ROLE_FIELDS_NOT_CREATED",
    PERMISSION_FIELDS_NOT_CREATED: "PERMISSION_FIELDS_NOT_CREATED",
    ROLE_SCHEMA_NOT_CREATED: "ROLE_SCHEMA_NOT_CREATED",
    PERMISSION_SCHEMA_NOT_CREATED: "PERMISSION_SCHEMA_NOT_CREATED",
    ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED:
      "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
    ADMIN_SUPPORT_ACCESS_UNRESOLVED:
      "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED:
      "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    HUMAN_PROFESSIONAL_REVIEW_REQUIRED:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    RUNTIME_GATE_INVENTORY_DEFERRED:
      "RUNTIME_GATE_INVENTORY_DEFERRED",
    VALIDATOR_DISPATCH_NOT_CREATED: "VALIDATOR_DISPATCH_NOT_CREATED",
    REGISTRY_LOOKUP_NOT_CREATED: "REGISTRY_LOOKUP_NOT_CREATED",
    EXTERNAL_USE_NOT_AUTHORIZED: "EXTERNAL_USE_NOT_AUTHORIZED",
    PRODUCT_CANDIDATE_NONE: "PRODUCT_CANDIDATE_NONE",
    RUNTIME_CERTIFICATION_NOT_CREATED:
      "RUNTIME_CERTIFICATION_NOT_CREATED",
    TECHNICAL_SIGN_OFF_NOT_CREATED: "TECHNICAL_SIGN_OFF_NOT_CREATED",
    COURT_READY_NOT_CREATED: "COURT_READY_NOT_CREATED",
    AI_ACT_COMPLIANCE_NOT_CREATED: "AI_ACT_COMPLIANCE_NOT_CREATED",
    HIGH_RISK_APPROVAL_NOT_CREATED: "HIGH_RISK_APPROVAL_NOT_CREATED",
    UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
  });

const RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_CATEGORIES =
  deepFreeze({
    HUMAN_PROFESSIONAL_REVIEWER:
      "HUMAN_PROFESSIONAL_REVIEWER",
    REPO_GOVERNANCE_MAINTAINER:
      "REPO_GOVERNANCE_MAINTAINER",
    ADMIN_SUPPORT_REVIEWER: "ADMIN_SUPPORT_REVIEWER",
    SERVICE_SYSTEM_ACTOR: "SERVICE_SYSTEM_ACTOR",
    CI_EVIDENCE_ACTOR: "CI_EVIDENCE_ACTOR",
    AUDIT_ACCESS_REVIEWER: "AUDIT_ACCESS_REVIEWER",
    RETENTION_DELETION_REVIEWER: "RETENTION_DELETION_REVIEWER",
    THIRD_PARTY_PROVIDER_ROUTE_REVIEWER:
      "THIRD_PARTY_PROVIDER_ROUTE_REVIEWER",
    RAW_MATERIAL_ROUTING_REVIEWER:
      "RAW_MATERIAL_ROUTING_REVIEWER",
    JUSTICE_PUBLIC_SECTOR_REVIEWER:
      "JUSTICE_PUBLIC_SECTOR_REVIEWER",
    EXTERNAL_USE_PRODUCT_REVIEWER:
      "EXTERNAL_USE_PRODUCT_REVIEWER",
    UNKNOWN_UNCLASSIFIED_ACTOR: "UNKNOWN_UNCLASSIFIED_ACTOR",
  });

const BASE_LINEAGE = deepFreeze([
  "PR_29_COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_SCAFFOLD",
  "PR_30_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_SCAFFOLD",
  "PR_31_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF",
  "PR_32_COURT_ADJACENT_RBAC_ADMIN_SUPPORT_DEPENDENCY_CROSSWALK_PROOF",
  "PR_33_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_BOUNDARY",
  "PR_34_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_ALIGNMENT_PROOF",
  "PR_35_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY_SCAFFOLD",
  "PR_36_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY_ALIGNMENT_PROOF",
  "PR_37_AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING",
  "PR_38_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY",
  "PR_39_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW",
  "PR_40_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_ALIGNMENT_PROOF",
]);

const BASE_STATUS_LABELS = deepFreeze([
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .GOVERNANCE_REGISTRY_SCAFFOLD_ONLY,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .PROVE_ONLY,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .DOCS_ONLY_SCOPE_REVIEW_ONLY,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .TEST_ONLY_ALIGNMENT_PROOF_ONLY,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .REVIEW_SUPPORT_ONLY,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .RBAC_MODEL_NOT_IMPLEMENTED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .ACCESS_CONTROL_NOT_IMPLEMENTED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .ROLE_PERMISSION_MODEL_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .ROLE_FIELDS_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .PERMISSION_FIELDS_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .ROLE_SCHEMA_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .PERMISSION_SCHEMA_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .ADMIN_SUPPORT_ACCESS_UNRESOLVED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .HUMAN_PROFESSIONAL_REVIEW_REQUIRED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .RUNTIME_GATE_INVENTORY_DEFERRED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .VALIDATOR_DISPATCH_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .REGISTRY_LOOKUP_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .EXTERNAL_USE_NOT_AUTHORIZED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .PRODUCT_CANDIDATE_NONE,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .RUNTIME_CERTIFICATION_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .TECHNICAL_SIGN_OFF_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .COURT_READY_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .AI_ACT_COMPLIANCE_NOT_CREATED,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
    .HIGH_RISK_APPROVAL_NOT_CREATED,
]);

const BASE_NON_AUTHORIZATIONS = deepFreeze({
  authorized: false,
  access_granted: false,
  rbac_implemented: false,
  access_control_implemented: false,
  access_control_enforced: false,
  role_permission_model_created: false,
  role_fields_created: false,
  permission_fields_created: false,
  role_schema_created: false,
  permission_schema_created: false,
  admin_support_implementation_created: false,
  admin_support_access_authorized: false,
  runtime_gate_created: false,
  runtime_gate_implemented: false,
  validator_dispatch_created: false,
  runtime_registry_lookup_created: false,
  audit_access_log_implemented: false,
  audit_logging_implemented: false,
  access_logging_implemented: false,
  event_emitter_created: false,
  log_schema_created: false,
  log_storage_created: false,
  log_viewer_created: false,
  log_access_control_implemented: false,
  raw_material_routing_implemented: false,
  third_party_routing_authorized: false,
  provider_routing_authorized: false,
  retention_deletion_encryption_implemented: false,
  chain_of_custody_created: false,
  blocker_closure_created: false,
  security_finding_created: false,
  vulnerability_finding_created: false,
  severity_assigned: false,
  remediation_recommended: false,
  remediation_implemented: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_selected: false,
  product_candidate_authorized: false,
  technical_signoff_created: false,
  runtime_certification_created: false,
  legal_clinical_evidentiary_case_truth_conclusion_created: false,
  court_ready_created: false,
  ai_act_compliance_created: false,
  high_risk_approval_created: false,
  runtime_api_schema_package_behavior_changed: false,
});

const allowedMaterialClasses = deepFreeze([
  MATERIAL_CLASSES.SYNTHETIC_NO_RAW_MATERIAL,
  MATERIAL_CLASSES.SANITIZED_TEXT_PRIMARY_MATERIAL,
  MATERIAL_CLASSES.REDACTED_REVIEW_SIGNAL_MATERIAL,
  MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL,
  MATERIAL_CLASSES.HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL,
]);

const prohibitedMaterialClasses = deepFreeze(
  Object.values(HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
    (entry) => entry.material_class,
  ),
);

const makeRow = ({
  id,
  actorType,
  roleCategory,
  permissionCategory,
  allowedActions,
  prohibitedActions,
  adminSupportAccessRule,
  humanProfessionalReviewDependency,
  auditLogDependency,
  retentionDeletionDependency,
  thirdPartyRoutingConstraint,
  futureRuntimeGateDependency,
  currentEvidenceLevel,
  implementationGap,
  requiredImplementationEvidence,
  requiredTestEvidence,
  closureCriteria,
  sourceEvidenceReferences,
}) =>
  deepFreeze({
    scope_id: id,
    actor_type: actorType,
    role_category: roleCategory,
    permission_category: permissionCategory,
    allowed_material_classes: allowedMaterialClasses,
    prohibited_material_classes: prohibitedMaterialClasses,
    allowed_actions: allowedActions,
    prohibited_actions: prohibitedActions,
    admin_support_access_rule: adminSupportAccessRule,
    human_professional_review_dependency:
      humanProfessionalReviewDependency,
    audit_log_dependency: auditLogDependency,
    retention_deletion_dependency: retentionDeletionDependency,
    third_party_routing_constraint: thirdPartyRoutingConstraint,
    future_runtime_gate_dependency: futureRuntimeGateDependency,
    current_evidence_level: currentEvidenceLevel,
    implementation_gap: implementationGap,
    required_implementation_evidence: requiredImplementationEvidence,
    required_test_evidence: requiredTestEvidence,
    blocker_status: "OPEN_NOT_CLOSED",
    closure_criteria: closureCriteria,
    remains_non_authorized_until_closure: true,
    source_evidence_references: sourceEvidenceReferences,
    lineage: BASE_LINEAGE,
    status_labels: BASE_STATUS_LABELS,
    non_authorization_flags: BASE_NON_AUTHORIZATIONS,
  });

const RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ROWS =
  deepFreeze({
    "RBAC-RP-AS-SR-001": makeRow({
      id: "RBAC-RP-AS-SR-001",
      actorType: "human/professional reviewer",
      roleCategory: "HUMAN_PROFESSIONAL_REVIEW_ROLE_CATEGORY_NOT_CREATED",
      permissionCategory: "REVIEW_SUPPORT_PERMISSION_CATEGORY_NOT_CREATED",
      allowedActions: ["READ_TRACKED_GOVERNANCE_SCOPE_REVIEW_EVIDENCE"],
      prohibitedActions: ["SELF_APPROVAL", "RELEASE_APPROVAL", "EXTERNAL_USE"],
      adminSupportAccessRule: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
      humanProfessionalReviewDependency:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      auditLogDependency: "AUDIT_ACCESS_LOG_DEPENDENCY_ONLY",
      retentionDeletionDependency: "RETENTION_DELETION_DEPENDENCY_ONLY",
      thirdPartyRoutingConstraint: "THIRD_PARTY_ROUTING_NOT_AUTHORIZED",
      futureRuntimeGateDependency: "RUNTIME_GATE_INVENTORY_DEFERRED",
      currentEvidenceLevel: "PR_39_DOCS_ONLY_SCOPE_REVIEW",
      implementationGap: "RBAC_ACCESS_CONTROL_NOT_IMPLEMENTED",
      requiredImplementationEvidence:
        "SEPARATE_FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED",
      requiredTestEvidence: "SEPARATE_FUTURE_RUNTIME_TEST_EVIDENCE_REQUIRED",
      closureCriteria: "SEPARATE_HUMAN_PROFESSIONAL_REVIEW_AND_RUNTIME_EVIDENCE",
      sourceEvidenceReferences: [
        "PR_39_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW",
        "PR_40_ALIGNMENT_PROOF",
      ],
    }),
    "RBAC-RP-AS-SR-002": makeRow({
      id: "RBAC-RP-AS-SR-002",
      actorType: "repo/governance maintainer",
      roleCategory: "GOVERNANCE_MAINTAINER_ROLE_CATEGORY_NOT_CREATED",
      permissionCategory: "GOVERNANCE_REVIEW_PERMISSION_CATEGORY_NOT_CREATED",
      allowedActions: ["MAINTAIN_TRACKED_GOVERNANCE_CONTRACTS"],
      prohibitedActions: ["BYPASS_HUMAN_REVIEW", "CREATE_RUNTIME_ENFORCEMENT"],
      adminSupportAccessRule: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
      humanProfessionalReviewDependency:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      auditLogDependency: "AUDIT_ACCESS_LOG_DEPENDENCY_ONLY",
      retentionDeletionDependency: "RETENTION_DELETION_DEPENDENCY_ONLY",
      thirdPartyRoutingConstraint: "PROVIDER_ROUTING_NOT_AUTHORIZED",
      futureRuntimeGateDependency: "RUNTIME_REGISTRY_LOOKUP_NOT_CREATED",
      currentEvidenceLevel: "PR_39_DOCS_ONLY_SCOPE_REVIEW",
      implementationGap: "ROLE_PERMISSION_MODEL_NOT_CREATED",
      requiredImplementationEvidence:
        "SEPARATE_ROLE_PERMISSION_MODEL_EVIDENCE_REQUIRED",
      requiredTestEvidence: "SEPARATE_ROLE_PERMISSION_TEST_EVIDENCE_REQUIRED",
      closureCriteria: "NO_CLOSURE_WITHOUT_SEPARATE_AUTHORIZATION",
      sourceEvidenceReferences: ["PR_39_SCOPE_REVIEW", "PR_40_TEST_ONLY_PROOF"],
    }),
    "RBAC-RP-AS-SR-003": makeRow({
      id: "RBAC-RP-AS-SR-003",
      actorType: "admin/support reviewer",
      roleCategory: "ADMIN_SUPPORT_REVIEW_ROLE_CATEGORY_NOT_CREATED",
      permissionCategory: "ADMIN_SUPPORT_PERMISSION_CATEGORY_NOT_CREATED",
      allowedActions: ["REVIEW_SCOPE_STATUS_ONLY"],
      prohibitedActions: ["ACCESS_RAW_PRIVATE_SOURCE", "APPROVE_ROUTE"],
      adminSupportAccessRule:
        "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
      humanProfessionalReviewDependency:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      auditLogDependency: "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
      retentionDeletionDependency: "ADMIN_SUPPORT_LIFECYCLE_DEPENDENCY_ONLY",
      thirdPartyRoutingConstraint:
        "ADMIN_SUPPORT_PROVIDER_ROUTE_APPROVAL_NOT_AUTHORIZED",
      futureRuntimeGateDependency: "RUNTIME_GATE_INVENTORY_DEFERRED",
      currentEvidenceLevel: "PR_39_DOCS_ONLY_SCOPE_REVIEW",
      implementationGap: "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
      requiredImplementationEvidence:
        "SEPARATE_ADMIN_SUPPORT_IMPLEMENTATION_EVIDENCE_REQUIRED",
      requiredTestEvidence:
        "SEPARATE_ADMIN_SUPPORT_ACCESS_TEST_EVIDENCE_REQUIRED",
      closureCriteria: "ADMIN_SUPPORT_CANNOT_BYPASS_RBAC_OR_HUMAN_REVIEW",
      sourceEvidenceReferences: ["PR_35_ADMIN_SUPPORT_REGISTRY", "PR_39"],
    }),
    "RBAC-RP-AS-SR-004": makeRow({
      id: "RBAC-RP-AS-SR-004",
      actorType: "service/system actor",
      roleCategory: "SERVICE_SYSTEM_ROLE_CATEGORY_NOT_CREATED",
      permissionCategory: "SERVICE_SYSTEM_PERMISSION_CATEGORY_NOT_CREATED",
      allowedActions: ["NO_RUNTIME_ACTION_CREATED"],
      prohibitedActions: ["SELF_APPROVAL", "VALIDATOR_DISPATCH", "REGISTRY_LOOKUP"],
      adminSupportAccessRule: "SERVICE_SYSTEM_ADMIN_SUPPORT_ACCESS_BLOCKED",
      humanProfessionalReviewDependency:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      auditLogDependency: "EVENT_EMITTER_NOT_CREATED",
      retentionDeletionDependency: "LIFECYCLE_EXECUTION_NOT_CREATED",
      thirdPartyRoutingConstraint: "THIRD_PARTY_ROUTING_NOT_AUTHORIZED",
      futureRuntimeGateDependency:
        "VALIDATOR_DISPATCH_AND_RUNTIME_REGISTRY_LOOKUP_NOT_CREATED",
      currentEvidenceLevel: "PR_39_DOCS_ONLY_SCOPE_REVIEW",
      implementationGap: "SERVICE_SYSTEM_SELF_APPROVAL_NOT_CREATED",
      requiredImplementationEvidence:
        "SEPARATE_RUNTIME_GATE_EVIDENCE_REQUIRED",
      requiredTestEvidence: "SEPARATE_RUNTIME_GATE_TEST_EVIDENCE_REQUIRED",
      closureCriteria: "NO_SELF_APPROVAL_OR_AUTOMATIC_CLOSURE",
      sourceEvidenceReferences: ["PR_39", "PR_40"],
    }),
    "RBAC-RP-AS-SR-005": makeRow({
      id: "RBAC-RP-AS-SR-005",
      actorType: "CI/evidence actor",
      roleCategory: "CI_EVIDENCE_ROLE_CATEGORY_NOT_CREATED",
      permissionCategory: "CI_EVIDENCE_PERMISSION_CATEGORY_NOT_CREATED",
      allowedActions: ["REPORT_CI_EVIDENCE_STATUS"],
      prohibitedActions: ["RELEASE_APPROVAL", "TECHNICAL_SIGN_OFF"],
      adminSupportAccessRule: "CI_DOES_NOT_AUTHORIZE_ADMIN_SUPPORT_ACCESS",
      humanProfessionalReviewDependency:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      auditLogDependency: "LOCAL_LOGS_ARE_NOT_CI_EVIDENCE",
      retentionDeletionDependency: "CI_LOGS_ARE_NOT_RELEASE_EVIDENCE",
      thirdPartyRoutingConstraint: "CI_DOES_NOT_AUTHORIZE_PROVIDER_ROUTING",
      futureRuntimeGateDependency: "CI_DOES_NOT_CREATE_RUNTIME_GATE",
      currentEvidenceLevel: "PR_40_TEST_ONLY_ALIGNMENT_PROOF",
      implementationGap: "CI_EVIDENCE_IS_NOT_IMPLEMENTATION_EVIDENCE",
      requiredImplementationEvidence:
        "SEPARATE_RUNTIME_AND_OPERATIONAL_EVIDENCE_REQUIRED",
      requiredTestEvidence: "CI_EVIDENCE_BOUNDARY_TESTS_REQUIRED",
      closureCriteria: "CI_SUCCESS_DOES_NOT_CLOSE_BLOCKERS",
      sourceEvidenceReferences: ["PR_40_ALIGNMENT_PROOF"],
    }),
    "RBAC-RP-AS-SR-006": makeRow({
      id: "RBAC-RP-AS-SR-006",
      actorType: "audit/access reviewer",
      roleCategory: "AUDIT_ACCESS_REVIEW_ROLE_CATEGORY_NOT_CREATED",
      permissionCategory: "AUDIT_ACCESS_PERMISSION_CATEGORY_NOT_CREATED",
      allowedActions: ["REVIEW_AUDIT_ACCESS_DEPENDENCY_STATUS"],
      prohibitedActions: ["VIEW_RAW_LOG_CONTENT", "CREATE_LOG_STORAGE"],
      adminSupportAccessRule: "LOG_VIEWER_RBAC_NOT_CREATED",
      humanProfessionalReviewDependency:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      auditLogDependency: "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
      retentionDeletionDependency: "AUDIT_LOG_RETENTION_POLICY_NOT_IMPLEMENTED",
      thirdPartyRoutingConstraint: "AUDIT_STATUS_DOES_NOT_AUTHORIZE_ROUTING",
      futureRuntimeGateDependency: "RUNTIME_GATE_INVENTORY_DEFERRED",
      currentEvidenceLevel: "PR_37_AND_PR_38_DEPENDENCY_EVIDENCE",
      implementationGap: "LOG_SCHEMA_STORAGE_VIEWER_NOT_CREATED",
      requiredImplementationEvidence:
        "SEPARATE_AUDIT_ACCESS_LOG_IMPLEMENTATION_EVIDENCE_REQUIRED",
      requiredTestEvidence: "SEPARATE_AUDIT_ACCESS_LOG_TEST_EVIDENCE_REQUIRED",
      closureCriteria: "NO_LOG_VIEWER_OR_ACCESS_CLOSURE_CREATED",
      sourceEvidenceReferences: ["PR_37", "PR_38", "PR_39"],
    }),
    "RBAC-RP-AS-SR-007": makeRow({
      id: "RBAC-RP-AS-SR-007",
      actorType: "retention/deletion reviewer",
      roleCategory: "RETENTION_DELETION_ROLE_CATEGORY_NOT_CREATED",
      permissionCategory: "LIFECYCLE_PERMISSION_CATEGORY_NOT_CREATED",
      allowedActions: ["REVIEW_LIFECYCLE_DEPENDENCY_STATUS"],
      prohibitedActions: ["DELETE", "PURGE", "ERASE", "ROTATE_KEYS"],
      adminSupportAccessRule: "ADMIN_SUPPORT_LIFECYCLE_ACCESS_NOT_AUTHORIZED",
      humanProfessionalReviewDependency:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      auditLogDependency: "AUDIT_ACCESS_LOG_DEPENDENCY_ONLY",
      retentionDeletionDependency:
        "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
      thirdPartyRoutingConstraint:
        "PROVIDER_RETENTION_DELETION_POSTURE_NOT_IMPLEMENTED",
      futureRuntimeGateDependency: "RUNTIME_GATE_INVENTORY_DEFERRED",
      currentEvidenceLevel: "DEPENDENCY_ONLY",
      implementationGap: "LIFECYCLE_EXECUTION_NOT_CREATED",
      requiredImplementationEvidence:
        "SEPARATE_RETENTION_DELETION_ENCRYPTION_EVIDENCE_REQUIRED",
      requiredTestEvidence:
        "SEPARATE_RETENTION_DELETION_ENCRYPTION_TEST_EVIDENCE_REQUIRED",
      closureCriteria: "NO_LIFECYCLE_BLOCKER_CLOSURE_CREATED",
      sourceEvidenceReferences: ["PR_39_SCOPE_REVIEW"],
    }),
    "RBAC-RP-AS-SR-008": makeRow({
      id: "RBAC-RP-AS-SR-008",
      actorType: "third-party/provider route reviewer",
      roleCategory: "PROVIDER_ROUTE_REVIEW_ROLE_CATEGORY_NOT_CREATED",
      permissionCategory: "PROVIDER_ROUTE_PERMISSION_CATEGORY_NOT_CREATED",
      allowedActions: ["REVIEW_PROVIDER_ROUTE_STATUS_ONLY"],
      prohibitedActions: ["SEND_TO_PROVIDER", "CREATE_DATA_ROUTING_MAP"],
      adminSupportAccessRule:
        "ADMIN_SUPPORT_PROVIDER_ROUTE_APPROVAL_NOT_AUTHORIZED",
      humanProfessionalReviewDependency:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      auditLogDependency: "ROUTE_EVENT_LOGGING_NOT_CREATED",
      retentionDeletionDependency:
        "PROVIDER_RETENTION_DELETION_POSTURE_NOT_IMPLEMENTED",
      thirdPartyRoutingConstraint: "THIRD_PARTY_PROVIDER_ROUTING_NOT_AUTHORIZED",
      futureRuntimeGateDependency: "RUNTIME_GATE_INVENTORY_DEFERRED",
      currentEvidenceLevel: "DEPENDENCY_ONLY",
      implementationGap: "PROVIDER_INTEGRATION_NOT_CREATED",
      requiredImplementationEvidence:
        "SEPARATE_PROVIDER_ROUTING_EVIDENCE_REQUIRED",
      requiredTestEvidence: "SEPARATE_PROVIDER_ROUTING_TEST_EVIDENCE_REQUIRED",
      closureCriteria: "NO_PROVIDER_ROUTE_CLOSURE_CREATED",
      sourceEvidenceReferences: ["PR_39_SCOPE_REVIEW"],
    }),
    "RBAC-RP-AS-SR-009": makeRow({
      id: "RBAC-RP-AS-SR-009",
      actorType: "raw-material routing reviewer",
      roleCategory: "RAW_MATERIAL_ROUTING_ROLE_CATEGORY_NOT_CREATED",
      permissionCategory: "RAW_MATERIAL_ROUTING_PERMISSION_CATEGORY_NOT_CREATED",
      allowedActions: ["REVIEW_RAW_MATERIAL_ROUTING_STATUS_ONLY"],
      prohibitedActions: ["INSPECT_RAW_SOURCE", "ROUTE_RAW_MATERIAL"],
      adminSupportAccessRule: "RAW_PRIVATE_SOURCE_ACCESS_BLOCKED",
      humanProfessionalReviewDependency:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      auditLogDependency: "NO_RAW_CONTENT_AUDIT_LOG_DEPENDENCY_ONLY",
      retentionDeletionDependency: "RAW_MATERIAL_LIFECYCLE_DEPENDENCY_ONLY",
      thirdPartyRoutingConstraint:
        "NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_ROUTING",
      futureRuntimeGateDependency: "RUNTIME_GATE_INVENTORY_DEFERRED",
      currentEvidenceLevel: "DEPENDENCY_ONLY",
      implementationGap: "RAW_MATERIAL_ROUTING_IMPLEMENTATION_NOT_CREATED",
      requiredImplementationEvidence:
        "SEPARATE_RAW_MATERIAL_ROUTING_EVIDENCE_REQUIRED",
      requiredTestEvidence: "SEPARATE_RAW_MATERIAL_ROUTING_TEST_EVIDENCE_REQUIRED",
      closureCriteria: "NO_RAW_MATERIAL_ROUTE_CLOSURE_CREATED",
      sourceEvidenceReferences: ["PR_39_SCOPE_REVIEW"],
    }),
    "RBAC-RP-AS-SR-010": makeRow({
      id: "RBAC-RP-AS-SR-010",
      actorType: "justice/public-sector reviewer",
      roleCategory: "JUSTICE_PUBLIC_SECTOR_ROLE_CATEGORY_NOT_CREATED",
      permissionCategory:
        "JUSTICE_PUBLIC_SECTOR_PERMISSION_CATEGORY_NOT_CREATED",
      allowedActions: ["REVIEW_HIGH_RISK_READINESS_GAPS_ONLY"],
      prohibitedActions: ["DECLARE_COURT_READY", "DECLARE_AI_ACT_COMPLIANCE"],
      adminSupportAccessRule: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
      humanProfessionalReviewDependency:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      auditLogDependency: "AUDIT_ACCESS_LOG_DEPENDENCY_ONLY",
      retentionDeletionDependency: "LIFECYCLE_DEPENDENCY_ONLY",
      thirdPartyRoutingConstraint: "THIRD_PARTY_ROUTING_NOT_AUTHORIZED",
      futureRuntimeGateDependency: "RUNTIME_GATE_INVENTORY_DEFERRED",
      currentEvidenceLevel: "PR_29_AND_PR_32_GOVERNANCE_EVIDENCE_ONLY",
      implementationGap: "COURT_READY_AI_ACT_HIGH_RISK_APPROVAL_NOT_CREATED",
      requiredImplementationEvidence:
        "SEPARATE_HIGH_RISK_READINESS_EVIDENCE_REQUIRED",
      requiredTestEvidence: "SEPARATE_HIGH_RISK_READINESS_TEST_EVIDENCE_REQUIRED",
      closureCriteria: "NO_COURT_READY_OR_AI_ACT_CLOSURE_CREATED",
      sourceEvidenceReferences: ["PR_29", "PR_32", "PR_39"],
    }),
    "RBAC-RP-AS-SR-011": makeRow({
      id: "RBAC-RP-AS-SR-011",
      actorType: "external-use/product reviewer",
      roleCategory: "EXTERNAL_USE_PRODUCT_ROLE_CATEGORY_NOT_CREATED",
      permissionCategory: "EXTERNAL_USE_PRODUCT_PERMISSION_CATEGORY_NOT_CREATED",
      allowedActions: ["REVIEW_NON_AUTHORIZATION_STATUS_ONLY"],
      prohibitedActions: ["SELECT_PRODUCT_CANDIDATE", "AUTHORIZE_EXTERNAL_USE"],
      adminSupportAccessRule: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
      humanProfessionalReviewDependency:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      auditLogDependency: "CI_EVIDENCE_NOT_RELEASE_APPROVAL",
      retentionDeletionDependency: "RELEASE_LIFECYCLE_DEPENDENCY_ONLY",
      thirdPartyRoutingConstraint: "THIRD_PARTY_ROUTING_NOT_AUTHORIZED",
      futureRuntimeGateDependency: "RUNTIME_GATE_INVENTORY_DEFERRED",
      currentEvidenceLevel: "REVIEW_SUPPORT_ONLY",
      implementationGap: "PRODUCT_CANDIDATE_NONE_EXTERNAL_USE_NOT_AUTHORIZED",
      requiredImplementationEvidence:
        "SEPARATE_RELEASE_AND_PRODUCT_EVIDENCE_REQUIRED",
      requiredTestEvidence: "SEPARATE_RELEASE_AND_PRODUCT_TEST_EVIDENCE_REQUIRED",
      closureCriteria: "NO_RELEASE_EXTERNAL_USE_OR_PRODUCT_CLOSURE_CREATED",
      sourceEvidenceReferences: ["PR_39", "PR_40"],
    }),
    "RBAC-RP-AS-SR-012": makeRow({
      id: "RBAC-RP-AS-SR-012",
      actorType: "unknown/unclassified actor",
      roleCategory: "UNKNOWN_NOT_EVIDENCED",
      permissionCategory: "UNKNOWN_NOT_EVIDENCED",
      allowedActions: [],
      prohibitedActions: ["ALL_RUNTIME_ACTIONS_BLOCKED"],
      adminSupportAccessRule: "UNKNOWN_NOT_EVIDENCED",
      humanProfessionalReviewDependency: "UNKNOWN_NOT_EVIDENCED",
      auditLogDependency: "UNKNOWN_NOT_EVIDENCED",
      retentionDeletionDependency: "UNKNOWN_NOT_EVIDENCED",
      thirdPartyRoutingConstraint: "UNKNOWN_NOT_EVIDENCED",
      futureRuntimeGateDependency: "UNKNOWN_NOT_EVIDENCED",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      implementationGap: "UNKNOWN_NOT_EVIDENCED",
      requiredImplementationEvidence: "UNKNOWN_NOT_EVIDENCED",
      requiredTestEvidence: "UNKNOWN_NOT_EVIDENCED",
      closureCriteria: "UNKNOWN_NOT_EVIDENCED",
      sourceEvidenceReferences: ["UNKNOWN_NOT_EVIDENCED"],
    }),
  });

const UNKNOWN_ROW = deepFreeze({
  scope_id: "UNKNOWN_NOT_EVIDENCED",
  actor_type: "UNKNOWN_NOT_EVIDENCED",
  role_category: "UNKNOWN_NOT_EVIDENCED",
  permission_category: "UNKNOWN_NOT_EVIDENCED",
  allowed_material_classes: [],
  prohibited_material_classes: prohibitedMaterialClasses,
  allowed_actions: [],
  prohibited_actions: ["ALL_RUNTIME_ACTIONS_BLOCKED"],
  admin_support_access_rule: "UNKNOWN_NOT_EVIDENCED",
  human_professional_review_dependency: "UNKNOWN_NOT_EVIDENCED",
  audit_log_dependency: "UNKNOWN_NOT_EVIDENCED",
  retention_deletion_dependency: "UNKNOWN_NOT_EVIDENCED",
  third_party_routing_constraint: "UNKNOWN_NOT_EVIDENCED",
  future_runtime_gate_dependency: "UNKNOWN_NOT_EVIDENCED",
  current_evidence_level: "UNKNOWN_NOT_EVIDENCED",
  implementation_gap: "UNKNOWN_NOT_EVIDENCED",
  required_implementation_evidence: "UNKNOWN_NOT_EVIDENCED",
  required_test_evidence: "UNKNOWN_NOT_EVIDENCED",
  blocker_status: "UNKNOWN_NOT_EVIDENCED",
  closure_criteria: "UNKNOWN_NOT_EVIDENCED",
  remains_non_authorized_until_closure: true,
  source_evidence_references: ["UNKNOWN_NOT_EVIDENCED"],
  lineage: BASE_LINEAGE,
  status_labels: [
    RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS
      .UNKNOWN_NOT_EVIDENCED,
  ],
  non_authorization_flags: BASE_NON_AUTHORIZATIONS,
});

const listRbacRolePermissionAdminSupportScopeReviewRegistryRows = () =>
  cloneAndFreeze(
    Object.values(
      RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ROWS,
    ),
  );

const getRbacRolePermissionAdminSupportScopeReviewRegistryRow = (id) =>
  cloneAndFreeze(
    RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ROWS[id] ||
      UNKNOWN_ROW,
  );

const getRbacRolePermissionAdminSupportScopeReviewRegistrySummary = () =>
  cloneAndFreeze({
    status_labels: BASE_STATUS_LABELS,
    categories: Object.values(
      RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_CATEGORIES,
    ),
    lineage: BASE_LINEAGE,
    row_count: Object.keys(
      RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ROWS,
    ).length,
    pr_39_scope_review_posture: "DOCS_ONLY_SCOPE_REVIEW_ONLY",
    pr_40_alignment_proof_posture: "TEST_ONLY_ALIGNMENT_PROOF_ONLY",
    local_validation_is_ci_evidence: false,
    ci_evidence_is_release_approval: false,
    ci_evidence_is_technical_signoff: false,
    ci_evidence_is_runtime_certification: false,
    implementation_created: false,
    runtime_api_schema_package_behavior_changed: false,
    non_authorization_flags: BASE_NON_AUTHORIZATIONS,
  });

module.exports = {
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_CATEGORIES,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ROWS,
  RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS,
  getRbacRolePermissionAdminSupportScopeReviewRegistryRow,
  getRbacRolePermissionAdminSupportScopeReviewRegistrySummary,
  listRbacRolePermissionAdminSupportScopeReviewRegistryRows,
};
