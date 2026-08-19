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

const ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS = deepFreeze({
  DOCS_ONLY_SELECTION_BOUNDARY: "DOCS_ONLY_SELECTION_BOUNDARY",
  DOCS_ONLY: "DOCS_ONLY",
  PROVE_ONLY: "PROVE_ONLY",
  SELECTION_ONLY: "SELECTION_ONLY",
  FUTURE_REVIEW_CANDIDATE_SELECTED:
    "FUTURE_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_REVIEW_CANDIDATE_SELECTED",
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_ONLY:
    "ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_ONLY",
  ADMIN_SUPPORT_ACCESS_UNRESOLVED: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED:
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
  ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED:
    "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
  RBAC_MODEL_NOT_IMPLEMENTED: "RBAC_MODEL_NOT_IMPLEMENTED",
  ACCESS_CONTROL_NOT_IMPLEMENTED: "ACCESS_CONTROL_NOT_IMPLEMENTED",
  HUMAN_PROFESSIONAL_REVIEW_REQUIRED:
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
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

const ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES =
  deepFreeze({
    ACTOR_PATH_CATEGORIES: "ACTOR_PATH_CATEGORIES",
    PROHIBITED_MATERIAL_CLASSES: "PROHIBITED_MATERIAL_CLASSES",
    SANITIZED_NO_RAW_ACCESS: "SANITIZED_NO_RAW_ACCESS",
    AUDIT_ACCESS_LOG_DEPENDENCY: "AUDIT_ACCESS_LOG_DEPENDENCY",
    RETENTION_DELETION_DEPENDENCY: "RETENTION_DELETION_DEPENDENCY",
    THIRD_PARTY_ROUTING_DEPENDENCY: "THIRD_PARTY_ROUTING_DEPENDENCY",
    HUMAN_PROFESSIONAL_REVIEW_DEPENDENCY:
      "HUMAN_PROFESSIONAL_REVIEW_DEPENDENCY",
    FUTURE_EVIDENCE_AND_TEST_DEPENDENCY:
      "FUTURE_EVIDENCE_AND_TEST_DEPENDENCY",
    NON_AUTHORIZED_UNTIL_SEPARATE_CLOSURE:
      "NON_AUTHORIZED_UNTIL_SEPARATE_CLOSURE",
  });

const BASE_STATUS_LABELS = deepFreeze([
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .DOCS_ONLY_SELECTION_BOUNDARY,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS.DOCS_ONLY,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS.PROVE_ONLY,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS.SELECTION_ONLY,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .FUTURE_REVIEW_CANDIDATE_SELECTED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_ONLY,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .ADMIN_SUPPORT_ACCESS_UNRESOLVED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .RBAC_MODEL_NOT_IMPLEMENTED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .ACCESS_CONTROL_NOT_IMPLEMENTED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .HUMAN_PROFESSIONAL_REVIEW_REQUIRED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .EXTERNAL_USE_NOT_AUTHORIZED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .PRODUCT_CANDIDATE_NONE,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .RUNTIME_CERTIFICATION_NOT_CREATED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .TECHNICAL_SIGN_OFF_NOT_CREATED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .COURT_READY_NOT_CREATED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .AI_ACT_COMPLIANCE_NOT_CREATED,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
    .HIGH_RISK_APPROVAL_NOT_CREATED,
]);

const BASE_LINEAGE = deepFreeze([
  "PR_29_COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_POSTURE",
  "PR_30_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_SCAFFOLD",
  "PR_31_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_ALIGNMENT_PROOF",
  "PR_32_COURT_ADJACENT_RBAC_ADMIN_SUPPORT_DEPENDENCY_CROSSWALK_PROOF",
  "PR_33_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_BOUNDARY",
  "PR_34_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_ALIGNMENT_PROOF",
]);

const BASE_NON_AUTHORIZATIONS = deepFreeze({
  authorized: false,
  access_granted: false,
  admin_support_access_authorized: false,
  admin_support_access_resolved: false,
  admin_support_model_created: false,
  admin_support_implementation_created: false,
  rbac_implemented: false,
  access_control_implemented: false,
  access_control_enforced: false,
  role_permission_model_created: false,
  raw_private_source_material_reviewed: false,
  source_package_inspected: false,
  pdf_image_screenshot_metadata_inspected: false,
  metadata_acquired: false,
  audit_access_log_implemented: false,
  retention_deletion_implemented: false,
  third_party_routing_authorized: false,
  provider_routing_authorized: false,
  raw_material_routing_implemented: false,
  runtime_gate_created: false,
  runtime_gate_implemented: false,
  validator_dispatch_created: false,
  runtime_registry_lookup_created: false,
  blocker_closure_created: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_selected: false,
  product_candidate_authorized: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
  court_ready_created: false,
  ai_act_compliance_created: false,
  high_risk_approval_created: false,
  security_finding_created: false,
  vulnerability_finding_created: false,
  severity_assigned: false,
  remediation_recommended: false,
  remediation_implemented: false,
  legal_clinical_evidentiary_case_truth_conclusion_created: false,
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

const FUTURE_REVIEW_QUESTION =
  "What is the smallest PROVE_ONLY admin/support sub-scope clarification that can define admin/support actor paths, prohibited material classes, approval gates, audit dependencies, retention/deletion dependencies, third-party routing constraints, and human/professional review boundaries without creating implementation, enforcement, runtime gates, validator dispatch, runtime registry lookup, blocker closure, release approval, external-use, court readiness, AI Act compliance, or high-risk approval?";

const makeRow = ({
  id,
  category,
  subScope,
  materialRiskIntersection,
  dependencyOnly,
  currentPosture,
  futureReviewTarget,
}) =>
  deepFreeze({
    id,
    category,
    sub_scope: subScope,
    mode: "PROVE_ONLY",
    boundary_status: "DOCS_ONLY_SELECTION_BOUNDARY",
    selection_status: "FUTURE_REVIEW_CANDIDATE_ONLY",
    status_labels: BASE_STATUS_LABELS,
    lineage: BASE_LINEAGE,
    allowed_material_classes: allowedMaterialClasses,
    prohibited_material_classes: prohibitedMaterialClasses,
    material_risk_intersection: materialRiskIntersection,
    dependency_only: dependencyOnly,
    current_posture: currentPosture,
    future_review_target: futureReviewTarget,
    future_review_question: FUTURE_REVIEW_QUESTION,
    closure_status: "NO_BLOCKER_CLOSURE_CREATED",
    implementation_scope: "NO_IMPLEMENTATION_CREATED",
    non_authorizations: BASE_NON_AUTHORIZATIONS,
  });

const ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY = deepFreeze({
  "AS-SUBSCOPE-001_ACTOR_PATH_CATEGORIES": makeRow({
    id: "AS-SUBSCOPE-001_ACTOR_PATH_CATEGORIES",
    category:
      ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES
        .ACTOR_PATH_CATEGORIES,
    subScope:
      "admin/support, internal tooling, privileged review, export/download, packet/delivery, log viewing, lifecycle operation, provider route review, bypass/emergency path",
    materialRiskIntersection:
      "actor paths can intersect cross-tenant, wrong-case, wrong-object, wrong-function, and wrong-property risks",
    dependencyOnly:
      "actor/path clarification is future review evidence only",
    currentPosture: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    futureReviewTarget:
      "clarify actor paths without creating roles, access, or enforcement",
  }),
  "AS-SUBSCOPE-002_PROHIBITED_MATERIAL_CLASSES": makeRow({
    id: "AS-SUBSCOPE-002_PROHIBITED_MATERIAL_CLASSES",
    category:
      ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES
        .PROHIBITED_MATERIAL_CLASSES,
    subScope:
      "raw/private/source, source packages, PDF/image/screenshot/metadata, provider payloads, URLs, tokens, secrets, local logs as CI evidence, local logs as packet components",
    materialRiskIntersection:
      "raw/private/source and PDF/image/screenshot/metadata material remain prohibited unless separately evidenced later",
    dependencyOnly:
      "material class handling remains dependency and boundary review only",
    currentPosture:
      "RAW_PRIVATE_MATERIAL_NOT_INSPECTED_AND_METADATA_NOT_ACQUIRED",
    futureReviewTarget:
      "clarify prohibited material classes without inspection or acquisition",
  }),
  "AS-SUBSCOPE-003_SANITIZED_NO_RAW_ACCESS": makeRow({
    id: "AS-SUBSCOPE-003_SANITIZED_NO_RAW_ACCESS",
    category:
      ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES
        .SANITIZED_NO_RAW_ACCESS,
    subScope:
      "possible sanitized/no-raw access only if later evidenced by tracked policy and tests",
    materialRiskIntersection:
      "sanitized/no-raw posture must not reopen raw/private/source access",
    dependencyOnly:
      "sanitized/no-raw access is not current access authorization",
    currentPosture: "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    futureReviewTarget:
      "clarify no-raw boundary terms without granting access",
  }),
  "AS-SUBSCOPE-004_AUDIT_ACCESS_LOG_DEPENDENCY": makeRow({
    id: "AS-SUBSCOPE-004_AUDIT_ACCESS_LOG_DEPENDENCY",
    category:
      ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES
        .AUDIT_ACCESS_LOG_DEPENDENCY,
    subScope:
      "no-content event families, log-access boundaries, privileged attempt records, log retention posture",
    materialRiskIntersection:
      "audit/access-log viewing remains privileged and unresolved",
    dependencyOnly:
      "dependency only; no audit/access-log implementation",
    currentPosture: "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    futureReviewTarget:
      "clarify audit dependency without log schema, log storage, or log viewer RBAC",
  }),
  "AS-SUBSCOPE-005_RETENTION_DELETION_DEPENDENCY": makeRow({
    id: "AS-SUBSCOPE-005_RETENTION_DELETION_DEPENDENCY",
    category:
      ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES
        .RETENTION_DELETION_DEPENDENCY,
    subScope:
      "lifecycle policy for privileged actions, retention/deletion denial posture, purge/erasure/encryption/key-management boundaries",
    materialRiskIntersection:
      "admin/support lifecycle operations remain blocked until separately evidenced",
    dependencyOnly:
      "dependency only; no lifecycle execution",
    currentPosture: "RETENTION_DELETION_NOT_IMPLEMENTED",
    futureReviewTarget:
      "clarify lifecycle dependency without retention/deletion execution",
  }),
  "AS-SUBSCOPE-006_THIRD_PARTY_ROUTING_DEPENDENCY": makeRow({
    id: "AS-SUBSCOPE-006_THIRD_PARTY_ROUTING_DEPENDENCY",
    category:
      ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES
        .THIRD_PARTY_ROUTING_DEPENDENCY,
    subScope:
      "deny-by-default provider/API route posture, no raw/private route, no URL/token/secret handling",
    materialRiskIntersection:
      "admin/support provider route review must not permit provider/API routing",
    dependencyOnly:
      "dependency only; no route authorization",
    currentPosture: "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
    futureReviewTarget:
      "clarify provider/API routing constraints without routing implementation",
  }),
  "AS-SUBSCOPE-007_HUMAN_PROFESSIONAL_REVIEW_DEPENDENCY": makeRow({
    id: "AS-SUBSCOPE-007_HUMAN_PROFESSIONAL_REVIEW_DEPENDENCY",
    category:
      ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES
        .HUMAN_PROFESSIONAL_REVIEW_DEPENDENCY,
    subScope:
      "admin/support cannot replace human/professional review or create release-impacting decisions",
    materialRiskIntersection:
      "human/professional review remains required for high-risk posture",
    dependencyOnly:
      "human/professional review dependency is not system approval",
    currentPosture: "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    futureReviewTarget:
      "clarify review boundary without approval, readiness, certification, or sign-off",
  }),
  "AS-SUBSCOPE-008_FUTURE_EVIDENCE_AND_TEST_DEPENDENCY": makeRow({
    id: "AS-SUBSCOPE-008_FUTURE_EVIDENCE_AND_TEST_DEPENDENCY",
    category:
      ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES
        .FUTURE_EVIDENCE_AND_TEST_DEPENDENCY,
    subScope:
      "admin/support model, RBAC model, access-control model, scoped policies, no-content audit/access-log, lifecycle policy, provider posture, allowed/denied tests, wrong-tenant/wrong-case tests, bypass-prevention tests",
    materialRiskIntersection:
      "future evidence categories remain future-only and do not change runtime behavior",
    dependencyOnly:
      "future evidence only; no runtime gate, validator dispatch, or registry lookup",
    currentPosture:
      "RBAC_ACCESS_CONTROL_ADMIN_SUPPORT_RUNTIME_GATE_NOT_IMPLEMENTED",
    futureReviewTarget:
      "clarify future evidence categories without creating runtime behavior",
  }),
  "AS-SUBSCOPE-009_NON_AUTHORIZED_UNTIL_SEPARATE_CLOSURE": makeRow({
    id: "AS-SUBSCOPE-009_NON_AUTHORIZED_UNTIL_SEPARATE_CLOSURE",
    category:
      ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES
        .NON_AUTHORIZED_UNTIL_SEPARATE_CLOSURE,
    subScope:
      "implementation, enforcement, runtime gates, validator dispatch, runtime registry lookup, blocker closure, approval, readiness, certification, sign-off",
    materialRiskIntersection:
      "all material-risk intersections remain blocked or dependency-only",
    dependencyOnly:
      "non-authorization boundary only; no blocker closure",
    currentPosture: "NO_BLOCKER_CLOSURE_CREATED",
    futureReviewTarget:
      "preserve non-authorizations until separate tracked closure evidence exists",
  }),
});

const UNKNOWN_ROW = deepFreeze({
  id: "UNKNOWN_NOT_EVIDENCED",
  category: "UNKNOWN_NOT_EVIDENCED",
  sub_scope: "UNKNOWN_NOT_EVIDENCED",
  mode: "PROVE_ONLY",
  boundary_status: "UNKNOWN_NOT_EVIDENCED",
  selection_status: "UNKNOWN_NOT_EVIDENCED",
  status_labels: [
    ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
      .UNKNOWN_NOT_EVIDENCED,
  ],
  lineage: [],
  allowed_material_classes: [],
  prohibited_material_classes: prohibitedMaterialClasses,
  material_risk_intersection: "UNKNOWN_NOT_EVIDENCED",
  dependency_only: "UNKNOWN_NOT_EVIDENCED",
  current_posture: "UNKNOWN_NOT_EVIDENCED",
  future_review_target: "UNKNOWN_NOT_EVIDENCED",
  future_review_question: FUTURE_REVIEW_QUESTION,
  closure_status: "UNKNOWN_NOT_EVIDENCED",
  implementation_scope: "NO_IMPLEMENTATION_CREATED",
  non_authorizations: BASE_NON_AUTHORIZATIONS,
});

const listAdminSupportSubScopeClarificationSelectionRows = () =>
  cloneAndFreeze(
    Object.values(ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY),
  );

const getAdminSupportSubScopeClarificationSelectionRegistry = () =>
  cloneAndFreeze(ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY);

const getAdminSupportSubScopeClarificationSelectionRow = (id) =>
  cloneAndFreeze(
    ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY[id] ||
      UNKNOWN_ROW,
  );

const getAdminSupportSubScopeClarificationSelectionStatus = () =>
  cloneAndFreeze({
    status_labels: BASE_STATUS_LABELS,
    categories: Object.values(
      ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES,
    ),
    lineage: BASE_LINEAGE,
    future_review_question: FUTURE_REVIEW_QUESTION,
    high_risk_material_classes_denied: prohibitedMaterialClasses,
    raw_private_source_case_material_reviewed: false,
    source_packages_reviewed: false,
    pdf_image_screenshot_metadata_reviewed: false,
    metadata_acquired: false,
    local_logs_read: false,
    ci_logs_read: false,
    implementation_created: false,
    runtime_api_schema_package_behavior_changed: false,
    blocker_closure_created: false,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
  });

const listAdminSupportSubScopeClarificationSelectionStatusLabels = () =>
  cloneAndFreeze(BASE_STATUS_LABELS);

const listAdminSupportSubScopeClarificationSelectionCategories = () =>
  cloneAndFreeze(
    Object.values(ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES),
  );

module.exports = {
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_CATEGORIES,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY,
  ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS,
  getAdminSupportSubScopeClarificationSelectionRegistry,
  getAdminSupportSubScopeClarificationSelectionRow,
  getAdminSupportSubScopeClarificationSelectionStatus,
  listAdminSupportSubScopeClarificationSelectionCategories,
  listAdminSupportSubScopeClarificationSelectionRows,
  listAdminSupportSubScopeClarificationSelectionStatusLabels,
};
