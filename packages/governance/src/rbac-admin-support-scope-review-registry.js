"use strict";

const {
  MATERIAL_CLASSES,
  HIGH_RISK_MATERIAL_CLASSES_DENIED,
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

const RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS = deepFreeze({
  PROVE_ONLY: "PROVE_ONLY",
  GOVERNANCE_SCOPE_ONLY: "GOVERNANCE_SCOPE_ONLY",
  REVIEW_SUPPORT_ONLY: "REVIEW_SUPPORT_ONLY",
  SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG:
    "SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG",
  RBAC_MODEL_NOT_IMPLEMENTED: "RBAC_MODEL_NOT_IMPLEMENTED",
  ACCESS_CONTROL_NOT_IMPLEMENTED: "ACCESS_CONTROL_NOT_IMPLEMENTED",
  ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED:
    "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
  ADMIN_SUPPORT_ACCESS_UNRESOLVED: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  EXTERNAL_USE_NOT_AUTHORIZED: "EXTERNAL_USE_NOT_AUTHORIZED",
  PRODUCT_CANDIDATE_NONE: "PRODUCT_CANDIDATE_NONE",
  RUNTIME_CERTIFICATION_NOT_CREATED:
    "RUNTIME_CERTIFICATION_NOT_CREATED",
  TECHNICAL_SIGN_OFF_NOT_CREATED: "TECHNICAL_SIGN_OFF_NOT_CREATED",
  HUMAN_PROFESSIONAL_REVIEW_REQUIRED:
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES = deepFreeze({
  ACTOR_TYPES: "ACTOR_TYPES",
  ROLE_CATEGORIES: "ROLE_CATEGORIES",
  PERMISSION_CATEGORIES: "PERMISSION_CATEGORIES",
  MATERIAL_CLASS_BOUNDARIES: "MATERIAL_CLASS_BOUNDARIES",
  ADMIN_SUPPORT_ACCESS_RULES: "ADMIN_SUPPORT_ACCESS_RULES",
  HUMAN_PROFESSIONAL_REVIEW_DEPENDENCIES:
    "HUMAN_PROFESSIONAL_REVIEW_DEPENDENCIES",
  AUDIT_LOG_DEPENDENCIES: "AUDIT_LOG_DEPENDENCIES",
  RETENTION_DELETION_DEPENDENCIES: "RETENTION_DELETION_DEPENDENCIES",
  THIRD_PARTY_ROUTING_CONSTRAINTS:
    "THIRD_PARTY_ROUTING_CONSTRAINTS",
  FUTURE_RUNTIME_GATE_DEPENDENCIES:
    "FUTURE_RUNTIME_GATE_DEPENDENCIES",
});

const BASE_STATUS_LABELS = deepFreeze([
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS.PROVE_ONLY,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS.GOVERNANCE_SCOPE_ONLY,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS.REVIEW_SUPPORT_ONLY,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS
    .SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS.RBAC_MODEL_NOT_IMPLEMENTED,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS
    .ACCESS_CONTROL_NOT_IMPLEMENTED,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS
    .ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS
    .ADMIN_SUPPORT_ACCESS_UNRESOLVED,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS.EXTERNAL_USE_NOT_AUTHORIZED,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS.PRODUCT_CANDIDATE_NONE,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS
    .RUNTIME_CERTIFICATION_NOT_CREATED,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS.TECHNICAL_SIGN_OFF_NOT_CREATED,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS
    .HUMAN_PROFESSIONAL_REVIEW_REQUIRED,
]);

const BASE_NON_AUTHORIZATIONS = deepFreeze({
  authorized: false,
  access_granted: false,
  rbac_implemented: false,
  access_control_implemented: false,
  access_control_enforced: false,
  role_permission_model_created: false,
  admin_support_model_created: false,
  admin_support_access_resolved: false,
  admin_support_access_authorized: false,
  raw_private_source_material_reviewed: false,
  raw_private_source_access_authorized: false,
  source_package_access_authorized: false,
  pdf_image_screenshot_metadata_access_authorized: false,
  third_party_api_routing_authorized: false,
  provider_routing_authorized: false,
  runtime_gate_created: false,
  runtime_gate_implemented: false,
  validator_dispatch_created: false,
  runtime_registry_lookup_created: false,
  audit_access_log_implemented: false,
  log_schema_created: false,
  log_storage_created: false,
  retention_deletion_implemented: false,
  blocker_closure_created: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_selected: false,
  product_candidate_authorized: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
  security_finding_created: false,
  vulnerability_finding_created: false,
  severity_assigned: false,
  remediation_recommended: false,
  remediation_implemented: false,
  legal_clinical_evidentiary_case_truth_conclusion_created: false,
  runtime_api_schema_package_behavior_changed: false,
});

const safeMaterialClasses = deepFreeze([
  MATERIAL_CLASSES.SYNTHETIC_NO_RAW_MATERIAL,
  MATERIAL_CLASSES.SANITIZED_TEXT_PRIMARY_MATERIAL,
  MATERIAL_CLASSES.REDACTED_REVIEW_SIGNAL_MATERIAL,
  MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL,
  MATERIAL_CLASSES.HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL,
]);

const highRiskMaterialClasses = deepFreeze(
  Object.values(HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
    (entry) => entry.material_class,
  ),
);

const makeRow = ({
  id,
  category,
  actorTypes,
  roleCategories,
  permissionCategories,
  materialBoundary,
  adminSupportAccessRule,
  humanProfessionalReviewDependency,
  auditLogDependency,
  retentionDeletionDependency,
  thirdPartyRoutingConstraint,
  futureRuntimeGateDependency,
  reviewNote,
}) =>
  deepFreeze({
    id,
    category,
    actor_types: actorTypes,
    role_categories: roleCategories,
    permission_categories: permissionCategories,
    allowed_material_classes: safeMaterialClasses,
    prohibited_material_classes: highRiskMaterialClasses,
    material_boundary: materialBoundary,
    admin_support_access_rule: adminSupportAccessRule,
    human_professional_review_dependency:
      humanProfessionalReviewDependency,
    audit_log_dependency: auditLogDependency,
    retention_deletion_dependency: retentionDeletionDependency,
    third_party_routing_constraint: thirdPartyRoutingConstraint,
    future_runtime_gate_dependency: futureRuntimeGateDependency,
    review_conclusion:
      RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS
        .SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG,
    status_labels: BASE_STATUS_LABELS,
    blocker_status: "OPEN_NOT_CLOSED",
    closure_status: "NO_BLOCKER_CLOSURE_CREATED",
    implementation_scope: "NO_IMPLEMENTATION_CREATED",
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    review_note: reviewNote,
  });

const RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY = deepFreeze({
  "RBAC-AS-SCOPE-001_ACTOR_TYPES": makeRow({
    id: "RBAC-AS-SCOPE-001_ACTOR_TYPES",
    category: RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES.ACTOR_TYPES,
    actorTypes: [
      "CASE_OWNER",
      "HUMAN_REVIEWER",
      "PROFESSIONAL_REVIEWER",
      "ADMIN_SUPPORT_OPERATOR",
      "WORKFLOW_AGENT",
      "SERVICE_ACCOUNT",
    ],
    roleCategories: ["FUTURE_ROLE_CATEGORY_ONLY"],
    permissionCategories: ["FUTURE_PERMISSION_CATEGORY_ONLY"],
    materialBoundary: "actor scoping remains governance-only",
    adminSupportAccessRule: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    humanProfessionalReviewDependency:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    auditLogDependency: "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    retentionDeletionDependency:
      "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    thirdPartyRoutingConstraint:
      "THIRD_PARTY_API_ROUTING_NOT_AUTHORIZED",
    futureRuntimeGateDependency: "FUTURE_ONLY_NOT_CREATED",
    reviewNote: "Actor types are scope-selection labels only.",
  }),
  "RBAC-AS-SCOPE-002_ROLE_CATEGORIES": makeRow({
    id: "RBAC-AS-SCOPE-002_ROLE_CATEGORIES",
    category: RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES.ROLE_CATEGORIES,
    actorTypes: ["CASE_OWNER", "HUMAN_REVIEWER", "ADMIN_SUPPORT_OPERATOR"],
    roleCategories: [
      "CASE_SCOPED_OWNER_ROLE",
      "HUMAN_REVIEW_ROLE",
      "ADMIN_SUPPORT_REVIEW_SUPPORT_ROLE",
      "LOG_VIEWER_FUTURE_ROLE",
    ],
    permissionCategories: ["ROLE_CATEGORY_MAPPING_ONLY"],
    materialBoundary: "role taxonomy not created",
    adminSupportAccessRule: "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
    humanProfessionalReviewDependency:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    auditLogDependency: "LOG_VIEWER_RBAC_NOT_CREATED",
    retentionDeletionDependency:
      "RETENTION_DELETION_OPERATOR_ROLE_NOT_CREATED",
    thirdPartyRoutingConstraint:
      "PROVIDER_ROUTE_APPROVAL_NOT_AUTHORIZED",
    futureRuntimeGateDependency: "FUTURE_ONLY_NOT_CREATED",
    reviewNote: "Role categories do not create roles or grant access.",
  }),
  "RBAC-AS-SCOPE-003_PERMISSION_CATEGORIES": makeRow({
    id: "RBAC-AS-SCOPE-003_PERMISSION_CATEGORIES",
    category:
      RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES.PERMISSION_CATEGORIES,
    actorTypes: ["CASE_OWNER", "HUMAN_REVIEWER", "SERVICE_ACCOUNT"],
    roleCategories: ["FUTURE_ROLE_CATEGORY_ONLY"],
    permissionCategories: [
      "READ_SANITIZED_REVIEW_SIGNAL",
      "READ_GOVERNANCE_REGISTRY_STATUS",
      "REQUEST_HUMAN_REVIEW",
      "VIEW_NO_CONTENT_AUDIT_STATUS",
    ],
    materialBoundary: "permission taxonomy not created",
    adminSupportAccessRule: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    humanProfessionalReviewDependency:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    auditLogDependency: "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    retentionDeletionDependency:
      "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    thirdPartyRoutingConstraint:
      "THIRD_PARTY_API_ROUTING_NOT_AUTHORIZED",
    futureRuntimeGateDependency: "FUTURE_ONLY_NOT_CREATED",
    reviewNote:
      "Permission categories are future review terms, not enforcement.",
  }),
  "RBAC-AS-SCOPE-004_MATERIAL_CLASS_BOUNDARIES": makeRow({
    id: "RBAC-AS-SCOPE-004_MATERIAL_CLASS_BOUNDARIES",
    category:
      RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES
        .MATERIAL_CLASS_BOUNDARIES,
    actorTypes: ["ALL_ACTOR_TYPES"],
    roleCategories: ["ALL_FUTURE_ROLE_CATEGORIES"],
    permissionCategories: ["MATERIAL_BOUNDARY_REVIEW_ONLY"],
    materialBoundary:
      "raw/private/source/source-package/PDF/image/screenshot/metadata access not authorized",
    adminSupportAccessRule:
      "ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_BLOCKED",
    humanProfessionalReviewDependency:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    auditLogDependency: "NO_RAW_CONTENT_AUDIT_LOG_DEPENDENCY",
    retentionDeletionDependency:
      "HIGH_RISK_MATERIAL_LIFECYCLE_BOUNDARY_UNRESOLVED",
    thirdPartyRoutingConstraint:
      "NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_ROUTING",
    futureRuntimeGateDependency: "FUTURE_ONLY_NOT_CREATED",
    reviewNote:
      "Material boundaries keep high-risk classes denied/not authorized.",
  }),
  "RBAC-AS-SCOPE-005_ADMIN_SUPPORT_ACCESS_RULES": makeRow({
    id: "RBAC-AS-SCOPE-005_ADMIN_SUPPORT_ACCESS_RULES",
    category:
      RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES
        .ADMIN_SUPPORT_ACCESS_RULES,
    actorTypes: ["ADMIN_SUPPORT_OPERATOR"],
    roleCategories: ["ADMIN_SUPPORT_REVIEW_SUPPORT_ROLE"],
    permissionCategories: ["ADMIN_SUPPORT_SCOPE_REVIEW_ONLY"],
    materialBoundary: "admin/support access remains unresolved",
    adminSupportAccessRule:
      "ADMIN_SUPPORT_ACCESS_UNRESOLVED_AND_BLOCKED",
    humanProfessionalReviewDependency:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    auditLogDependency: "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    retentionDeletionDependency:
      "ADMIN_SUPPORT_LIFECYCLE_OPERATION_NOT_IMPLEMENTED",
    thirdPartyRoutingConstraint:
      "ADMIN_SUPPORT_PROVIDER_ROUTE_APPROVAL_NOT_AUTHORIZED",
    futureRuntimeGateDependency: "FUTURE_ONLY_NOT_CREATED",
    reviewNote:
      "Admin/support access rules are scope review candidates only.",
  }),
  "RBAC-AS-SCOPE-006_HUMAN_PROFESSIONAL_REVIEW_DEPENDENCIES": makeRow({
    id: "RBAC-AS-SCOPE-006_HUMAN_PROFESSIONAL_REVIEW_DEPENDENCIES",
    category:
      RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES
        .HUMAN_PROFESSIONAL_REVIEW_DEPENDENCIES,
    actorTypes: ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"],
    roleCategories: ["HUMAN_PROFESSIONAL_REVIEW_ROLE"],
    permissionCategories: ["REVIEW_SUPPORT_ONLY"],
    materialBoundary: "human review remains release gate",
    adminSupportAccessRule: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    humanProfessionalReviewDependency:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    auditLogDependency: "LOCAL_LOGS_ARE_NOT_CI_EVIDENCE",
    retentionDeletionDependency:
      "REVIEW_MATERIAL_LIFECYCLE_POLICY_NOT_IMPLEMENTED",
    thirdPartyRoutingConstraint:
      "HUMAN_REVIEW_DOES_NOT_AUTHORIZE_PROVIDER_ROUTING",
    futureRuntimeGateDependency: "FUTURE_ONLY_NOT_CREATED",
    reviewNote:
      "Human/professional review dependency is not system approval.",
  }),
  "RBAC-AS-SCOPE-007_AUDIT_LOG_DEPENDENCIES": makeRow({
    id: "RBAC-AS-SCOPE-007_AUDIT_LOG_DEPENDENCIES",
    category:
      RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES.AUDIT_LOG_DEPENDENCIES,
    actorTypes: ["LOG_VIEWER_FUTURE_ACTOR"],
    roleCategories: ["LOG_VIEWER_FUTURE_ROLE"],
    permissionCategories: ["NO_CONTENT_AUDIT_STATUS_REVIEW_ONLY"],
    materialBoundary: "audit/access-log implementation absent",
    adminSupportAccessRule: "LOG_VIEWER_RBAC_NOT_CREATED",
    humanProfessionalReviewDependency:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    auditLogDependency:
      "AUDIT_ACCESS_LOG_IMPLEMENTATION_REQUIRED_IN_FUTURE",
    retentionDeletionDependency:
      "AUDIT_LOG_RETENTION_POLICY_NOT_IMPLEMENTED",
    thirdPartyRoutingConstraint:
      "AUDIT_STATUS_DOES_NOT_AUTHORIZE_PROVIDER_ROUTING",
    futureRuntimeGateDependency: "FUTURE_ONLY_NOT_CREATED",
    reviewNote:
      "Audit-log dependency does not create audit logging or storage.",
  }),
  "RBAC-AS-SCOPE-008_RETENTION_DELETION_DEPENDENCIES": makeRow({
    id: "RBAC-AS-SCOPE-008_RETENTION_DELETION_DEPENDENCIES",
    category:
      RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES
        .RETENTION_DELETION_DEPENDENCIES,
    actorTypes: ["RETENTION_DELETION_FUTURE_OPERATOR"],
    roleCategories: ["RETENTION_DELETION_FUTURE_ROLE"],
    permissionCategories: ["LIFECYCLE_STATUS_REVIEW_ONLY"],
    materialBoundary: "lifecycle execution not implemented",
    adminSupportAccessRule:
      "ADMIN_SUPPORT_LIFECYCLE_OPERATION_BLOCKED",
    humanProfessionalReviewDependency:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    auditLogDependency: "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    retentionDeletionDependency:
      "RETENTION_DELETION_PURGE_ERASURE_ENCRYPTION_KEY_MANAGEMENT_NOT_IMPLEMENTED",
    thirdPartyRoutingConstraint:
      "PROVIDER_RETENTION_DELETION_POSTURE_NOT_IMPLEMENTED",
    futureRuntimeGateDependency: "FUTURE_ONLY_NOT_CREATED",
    reviewNote:
      "Lifecycle categories do not execute retention/deletion work.",
  }),
  "RBAC-AS-SCOPE-009_THIRD_PARTY_ROUTING_CONSTRAINTS": makeRow({
    id: "RBAC-AS-SCOPE-009_THIRD_PARTY_ROUTING_CONSTRAINTS",
    category:
      RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES
        .THIRD_PARTY_ROUTING_CONSTRAINTS,
    actorTypes: ["WORKFLOW_AGENT", "SERVICE_ACCOUNT"],
    roleCategories: ["THIRD_PARTY_ROUTING_FUTURE_ROLE"],
    permissionCategories: ["ROUTING_STATUS_REVIEW_ONLY"],
    materialBoundary: "no provider payload/prompt/response/token/URL",
    adminSupportAccessRule:
      "ADMIN_SUPPORT_PROVIDER_ROUTE_APPROVAL_NOT_AUTHORIZED",
    humanProfessionalReviewDependency:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    auditLogDependency: "NO_CONTENT_ROUTE_EVENT_DEPENDENCY",
    retentionDeletionDependency:
      "PROVIDER_RETENTION_DELETION_POSTURE_NOT_IMPLEMENTED",
    thirdPartyRoutingConstraint:
      "THIRD_PARTY_API_ROUTING_NOT_AUTHORIZED",
    futureRuntimeGateDependency: "FUTURE_ONLY_NOT_CREATED",
    reviewNote:
      "Third-party routing constraints do not create routing or provider integration.",
  }),
  "RBAC-AS-SCOPE-010_FUTURE_RUNTIME_GATE_DEPENDENCIES": makeRow({
    id: "RBAC-AS-SCOPE-010_FUTURE_RUNTIME_GATE_DEPENDENCIES",
    category:
      RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES
        .FUTURE_RUNTIME_GATE_DEPENDENCIES,
    actorTypes: ["WORKFLOW_AGENT", "SERVICE_ACCOUNT"],
    roleCategories: ["RUNTIME_GATE_FUTURE_ROLE"],
    permissionCategories: ["RUNTIME_GATE_STATUS_REVIEW_ONLY"],
    materialBoundary: "runtime gate inventory remains deferred",
    adminSupportAccessRule: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    humanProfessionalReviewDependency:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    auditLogDependency: "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    retentionDeletionDependency:
      "RUNTIME_LIFECYCLE_OPERATION_NOT_IMPLEMENTED",
    thirdPartyRoutingConstraint:
      "RUNTIME_GATE_DOES_NOT_AUTHORIZE_PROVIDER_ROUTING",
    futureRuntimeGateDependency:
      "RUNTIME_GATE_VALIDATOR_DISPATCH_REGISTRY_LOOKUP_NOT_CREATED",
    reviewNote:
      "Runtime-gate dependencies are future-only and not created here.",
  }),
});

const UNKNOWN_ROW = deepFreeze({
  id: "UNKNOWN_NOT_EVIDENCED",
  category: "UNKNOWN_NOT_EVIDENCED",
  actor_types: [],
  role_categories: [],
  permission_categories: [],
  allowed_material_classes: [],
  prohibited_material_classes: highRiskMaterialClasses,
  material_boundary: "UNKNOWN_NOT_EVIDENCED",
  admin_support_access_rule: "UNKNOWN_NOT_EVIDENCED",
  human_professional_review_dependency: "UNKNOWN_NOT_EVIDENCED",
  audit_log_dependency: "UNKNOWN_NOT_EVIDENCED",
  retention_deletion_dependency: "UNKNOWN_NOT_EVIDENCED",
  third_party_routing_constraint: "UNKNOWN_NOT_EVIDENCED",
  future_runtime_gate_dependency: "UNKNOWN_NOT_EVIDENCED",
  review_conclusion: "UNKNOWN_NOT_EVIDENCED",
  status_labels: [RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS.UNKNOWN_NOT_EVIDENCED],
  blocker_status: "UNKNOWN_NOT_EVIDENCED",
  closure_status: "UNKNOWN_NOT_EVIDENCED",
  implementation_scope: "NO_IMPLEMENTATION_CREATED",
  non_authorizations: BASE_NON_AUTHORIZATIONS,
  review_note: "Unknown RBAC/admin-support scope review rows fail closed.",
});

const listRbacAdminSupportScopeReviewRows = () =>
  cloneAndFreeze(Object.values(RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY));

const getRbacAdminSupportScopeReviewRegistry = () =>
  cloneAndFreeze(RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY);

const getRbacAdminSupportScopeReviewRow = (id) =>
  cloneAndFreeze(RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY[id] || UNKNOWN_ROW);

const getRbacAdminSupportScopeReviewStatus = () =>
  cloneAndFreeze({
    status_labels: BASE_STATUS_LABELS,
    review_conclusion:
      RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS
        .SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG,
    categories: Object.values(RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES),
    high_risk_material_classes_denied: highRiskMaterialClasses,
    raw_private_source_case_material_reviewed: false,
    source_packages_reviewed: false,
    local_logs_read: false,
    ci_logs_read: false,
    implementation_created: false,
    blocker_closure_created: false,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
  });

const listRbacAdminSupportScopeReviewStatusLabels = () =>
  cloneAndFreeze(BASE_STATUS_LABELS);

const listRbacAdminSupportScopeReviewCategories = () =>
  cloneAndFreeze(Object.values(RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES));

module.exports = {
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_CATEGORIES,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY,
  RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS,
  getRbacAdminSupportScopeReviewRegistry,
  getRbacAdminSupportScopeReviewRow,
  getRbacAdminSupportScopeReviewStatus,
  listRbacAdminSupportScopeReviewCategories,
  listRbacAdminSupportScopeReviewRows,
  listRbacAdminSupportScopeReviewStatusLabels,
};
