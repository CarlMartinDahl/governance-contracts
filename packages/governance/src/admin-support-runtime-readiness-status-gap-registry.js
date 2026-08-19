"use strict";

const {
  DATA_LOCATION_REGISTRY,
  MATERIAL_CLASSES,
  HIGH_RISK_MATERIAL_CLASSES_DENIED,
} = require("./storage-data-location-inventory-registry.js");
const {
  LIFECYCLE_CONTROL_FAMILIES,
} = require("./retention-deletion-encryption-storage-dependency-registry.js");
const {
  AUDIT_ACCESS_LOG_EVENT_CANDIDATES,
} = require("./audit-access-log-storage-dependency-registry.js");
const {
  RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
} = require("./raw-material-routing-control-specification-registry.js");
const {
  THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
} = require("./third-party-routing-status-gap-registry.js");

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

const materialClass = (key) => MATERIAL_CLASSES[key];
const locationId = (key) => DATA_LOCATION_REGISTRY[key].id;
const lifecycleFamily = (key) => LIFECYCLE_CONTROL_FAMILIES[key];
const aalEventId = (key) => AUDIT_ACCESS_LOG_EVENT_CANDIDATES[key].id;
const rmrControlId = (key) =>
  RAW_MATERIAL_ROUTING_CONTROL_REGISTRY[key].control_id;
const tprGapId = (key) => THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY[key].id;

const ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_FAMILIES = deepFreeze({
  ADMIN_SUPPORT_MODEL_GAP: "ADMIN_SUPPORT_MODEL_GAP",
  ADMIN_SUPPORT_ROUTE_GAP: "ADMIN_SUPPORT_ROUTE_GAP",
  ADMIN_SUPPORT_AUTH_FIELD_GAP: "ADMIN_SUPPORT_AUTH_FIELD_GAP",
  ADMIN_SUPPORT_DB_FIELD_GAP: "ADMIN_SUPPORT_DB_FIELD_GAP",
  ADMIN_SUPPORT_RBAC_GAP: "ADMIN_SUPPORT_RBAC_GAP",
  ADMIN_SUPPORT_LOG_VIEWER_GAP: "ADMIN_SUPPORT_LOG_VIEWER_GAP",
  ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_GAP:
    "ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_GAP",
  ADMIN_SUPPORT_SOURCE_PACKAGE_ACCESS_GAP:
    "ADMIN_SUPPORT_SOURCE_PACKAGE_ACCESS_GAP",
  ADMIN_SUPPORT_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS_GAP:
    "ADMIN_SUPPORT_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS_GAP",
  ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP:
    "ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP",
  ADMIN_SUPPORT_LIFECYCLE_EXECUTION_GAP:
    "ADMIN_SUPPORT_LIFECYCLE_EXECUTION_GAP",
  ADMIN_SUPPORT_CROSS_TENANT_CASE_OVERRIDE_GAP:
    "ADMIN_SUPPORT_CROSS_TENANT_CASE_OVERRIDE_GAP",
  ADMIN_SUPPORT_EXPORT_PACKET_DELIVERY_GAP:
    "ADMIN_SUPPORT_EXPORT_PACKET_DELIVERY_GAP",
  ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_GAP:
    "ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_GAP",
  ADMIN_SUPPORT_HUMAN_REVIEW_DEPENDENCY_GAP:
    "ADMIN_SUPPORT_HUMAN_REVIEW_DEPENDENCY_GAP",
});

const ADMIN_SUPPORT_RUNTIME_READINESS_IMPLEMENTATION_STATUS = deepFreeze({
  NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION:
    "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
  NOT_ADMIN_SUPPORT_MODEL: "NOT_ADMIN_SUPPORT_MODEL",
  NOT_ADMIN_SUPPORT_ROUTES: "NOT_ADMIN_SUPPORT_ROUTES",
  NOT_ADMIN_SUPPORT_AUTH_FIELDS: "NOT_ADMIN_SUPPORT_AUTH_FIELDS",
  NOT_ADMIN_SUPPORT_DB_FIELDS: "NOT_ADMIN_SUPPORT_DB_FIELDS",
  NOT_LOG_VIEWER_RBAC: "NOT_LOG_VIEWER_RBAC",
  NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION:
    "NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
  NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION:
    "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
  NOT_RETENTION_DELETION_EXECUTION: "NOT_RETENTION_DELETION_EXECUTION",
  NOT_STORAGE_IMPLEMENTATION: "NOT_STORAGE_IMPLEMENTATION",
  NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION:
    "NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
  NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION:
    "NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
  NOT_PROVIDER_ROUTING_AUTHORIZATION: "NOT_PROVIDER_ROUTING_AUTHORIZATION",
  NOT_RELEASE_APPROVAL: "NOT_RELEASE_APPROVAL",
  NOT_EXTERNAL_USE_AUTHORIZATION: "NOT_EXTERNAL_USE_AUTHORIZATION",
  NOT_PRODUCT_CANDIDATE_SELECTION: "NOT_PRODUCT_CANDIDATE_SELECTION",
  NOT_RUNTIME_CERTIFICATION: "NOT_RUNTIME_CERTIFICATION",
  NOT_TECHNICAL_SIGNOFF: "NOT_TECHNICAL_SIGNOFF",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const ADMIN_SUPPORT_RUNTIME_READINESS_DECISION_STATUS = deepFreeze({
  REGISTRY_SCAFFOLD_ONLY: "REGISTRY_SCAFFOLD_ONLY",
  STATUS_GAP_ONLY: "STATUS_GAP_ONLY",
  DENY_BY_DEFAULT: "DENY_BY_DEFAULT",
  NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
  NOT_AUTHORIZED: "NOT_AUTHORIZED",
  NOT_ACCESS_GRANTED: "NOT_ACCESS_GRANTED",
  BLOCKED_BY_RBAC_ACCESS_CONTROL: "BLOCKED_BY_RBAC_ACCESS_CONTROL",
  BLOCKED_BY_AUDIT_ACCESS_LOG: "BLOCKED_BY_AUDIT_ACCESS_LOG",
  BLOCKED_BY_STORAGE_BOUNDARY: "BLOCKED_BY_STORAGE_BOUNDARY",
  BLOCKED_BY_LIFECYCLE_NON_IMPLEMENTATION:
    "BLOCKED_BY_LIFECYCLE_NON_IMPLEMENTATION",
  BLOCKED_BY_RAW_MATERIAL_ROUTING_DENIAL:
    "BLOCKED_BY_RAW_MATERIAL_ROUTING_DENIAL",
  BLOCKED_BY_THIRD_PARTY_ROUTE_GAP: "BLOCKED_BY_THIRD_PARTY_ROUTE_GAP",
  BLOCKED_BY_HUMAN_REVIEW_GATE: "BLOCKED_BY_HUMAN_REVIEW_GATE",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const ADMIN_SUPPORT_RUNTIME_READINESS_EVIDENCE_POSTURE = deepFreeze({
  DOCS_ONLY_STATUS_GAP: "DOCS_ONLY_STATUS_GAP",
  REGISTRY_SCAFFOLD_EVIDENCE: "REGISTRY_SCAFFOLD_EVIDENCE",
  TESTED_ALIGNMENT_EVIDENCE: "TESTED_ALIGNMENT_EVIDENCE",
  CI_TESTED_SCENARIO_EVIDENCE: "CI_TESTED_SCENARIO_EVIDENCE",
  FUTURE_CANDIDATE_ONLY: "FUTURE_CANDIDATE_ONLY",
  HUMAN_REVIEW_REQUIRED: "HUMAN_REVIEW_REQUIRED",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const BASE_IMPLEMENTATION_STATUSES = deepFreeze([
  "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
  "NOT_ADMIN_SUPPORT_MODEL",
  "NOT_ADMIN_SUPPORT_ROUTES",
  "NOT_ADMIN_SUPPORT_AUTH_FIELDS",
  "NOT_ADMIN_SUPPORT_DB_FIELDS",
  "NOT_LOG_VIEWER_RBAC",
  "NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
  "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
]);

const BASE_NON_AUTHORIZATIONS = deepFreeze({
  authorized: false,
  access_granted: false,
  admin_support_runtime_access_authorized: false,
  admin_support_model_created: false,
  admin_support_routes_created: false,
  admin_support_auth_fields_created: false,
  admin_support_db_fields_created: false,
  log_viewer_rbac_created: false,
  provider_routing_authorized: false,
  retention_deletion_executed: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_authorized: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
  raw_material_routing_implemented: false,
  third_party_routing_implemented: false,
  provider_integration_created: false,
  audit_access_log_implemented: false,
  access_log_implemented: false,
  log_storage_created: false,
  storage_implementation_created: false,
  rbac_access_control_implemented: false,
  admin_support_runtime_access_implemented: false,
  source_package_inspected: false,
  pdf_image_screenshot_metadata_inspected: false,
  metadata_acquired: false,
  raw_private_source_inspected: false,
  system_approval_created: false,
});

const ADMIN_SUPPORT_RUNTIME_READINESS_NON_OVERCLAIM_RULES = deepFreeze([
  "ADMIN_SUPPORT_STATUS_GAP does not mean ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
  "ADMIN_SUPPORT_MODEL_GAP does not mean ADMIN_SUPPORT_MODEL_CREATED",
  "ADMIN_SUPPORT_ROUTE_GAP does not mean ADMIN_SUPPORT_ROUTES_CREATED",
  "ADMIN_SUPPORT_AUTH_FIELD_GAP does not mean ADMIN_SUPPORT_AUTH_FIELDS_CREATED",
  "ADMIN_SUPPORT_DB_FIELD_GAP does not mean ADMIN_SUPPORT_DB_FIELDS_CREATED",
  "LOG_VIEWER_RBAC_GAP does not mean LOG_VIEWER_RBAC_CREATED",
  "STATUS_GAP_ROW does not mean RUNTIME_ENFORCEMENT",
  "BYPASS_PREVENTION_GAP does not mean ACCESS_CONTROL_ENFORCED",
  "SUPPORT_TENANT_CASE_OVERRIDE_GAP does not mean TENANT_OVERRIDE_AUTHORIZED",
  "SUPPORT_WRONG_CASE_WRONG_TENANT_ACCESS_GAP does not mean CROSS_CASE_ACCESS_AUTHORIZED",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean ACCESS_AUTHORIZATION",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean RAW_PRIVATE_SOURCE_ACCESS",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean SOURCE_PACKAGE_ACCESS",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean PDF_IMAGE_SCREENSHOT_METADATA_ACCESS",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean THIRD_PARTY_ROUTE_APPROVAL",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean LIFECYCLE_EXECUTION",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean PROVIDER_ROUTING_AUTHORIZATION",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean RELEASE_APPROVAL",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean EXTERNAL_USE_AUTHORIZATION",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean PRODUCT_CANDIDATE_SELECTION",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean RUNTIME_CERTIFICATION",
  "ADMIN_SUPPORT_RUNTIME_READINESS does not mean TECHNICAL_SIGNOFF",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED does not mean SYSTEM_APPROVAL",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
]);

const ADMIN_SUPPORT_RUNTIME_READINESS_REQUIRED_PREREQUISITES = deepFreeze([
  "admin/support actor model",
  "admin/support runtime route inventory",
  "admin/support authentication fields",
  "admin/support persisted authorization fields",
  "admin/support allowed/denied tests",
  "bypass-prevention tests",
  "RBAC/access-control implementation",
  "admin/support no-bypass model",
  "log viewer RBAC model",
  "audit/access-log implementation",
  "no-content audit/access event policy",
  "log schema/storage policy",
  "storage/data-location implementation boundary",
  "retention/deletion/purge/erasure execution policy",
  "encryption/key-management implementation policy",
  "raw-material routing denial policy",
  "third-party provider routing policy",
  "third-party provider route denial tests",
  "no-raw/no-private/no-source-locator policy",
  "provider identity/status registry",
  "provider data-routing map",
  "provider token/URL/secret handling policy",
  "tenant/case/capability evidence model",
  "human/professional review policy",
  "release/external-use/product authorization policy",
  "CI test plan",
  "external-use non-authorization wording",
  "non-proof/non-route-readiness wording",
  "global access-control threat model",
  "CI evidence boundary",
  "runtime certification boundary",
  "technical sign-off boundary",
]);

const makeStatusGap = ({
  id,
  family,
  surface,
  source_blocker_or_dependency,
  current_statuses = [],
  primary_absent_capability,
  required_prerequisites = [],
  overclaim_risk,
  future_boundary_posture,
  related_material_classes = [],
  related_storage_location_ids = [],
  related_raw_material_routing_control_ids = [],
  related_tpr_status_gap_ids = [],
  related_aal_event_candidate_ids = [],
  related_lifecycle_families = [],
  related_rbac_boundary_status,
  evidence_posture = "REGISTRY_SCAFFOLD_EVIDENCE",
  notes,
}) =>
  deepFreeze({
    id,
    family,
    surface,
    source_blocker_or_dependency,
    current_statuses,
    primary_absent_capability,
    required_prerequisites,
    overclaim_risk,
    current_authorization_status: "NOT_AUTHORIZED",
    access_decision_status: "NOT_ACCESS_GRANTED",
    future_boundary_posture,
    non_authorized_until_closure: true,
    related_material_classes,
    related_storage_location_ids,
    related_raw_material_routing_control_ids,
    related_tpr_status_gap_ids,
    related_aal_event_candidate_ids,
    related_lifecycle_families,
    related_rbac_boundary_status,
    evidence_posture,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    notes,
  });

const ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY = deepFreeze({
  "ADMIN-SUPPORT-GAP-001_ADMIN_SUPPORT_MODEL_ABSENT": makeStatusGap({
    id: "ADMIN-SUPPORT-GAP-001_ADMIN_SUPPORT_MODEL_ABSENT",
    family: "ADMIN_SUPPORT_MODEL_GAP",
    surface: "admin/support actor model",
    source_blocker_or_dependency: "no admin/support runtime actor model exists",
    current_statuses: [
      "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
      "NOT_ADMIN_SUPPORT_MODEL",
      "NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    ],
    primary_absent_capability: "admin/support runtime actor model",
    required_prerequisites: [
      "admin/support actor model",
      "admin/support no-bypass model",
      "RBAC/access-control implementation",
    ],
    overclaim_risk:
      "treating a scaffolded admin/support concept as runtime access approval",
    future_boundary_posture: "future candidate only, not authorized",
    related_material_classes: [
      materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL"),
    ],
    related_storage_location_ids: [
      locationId("L03_REPO_TRACKED_DOCS"),
      locationId("L24_PR_COMMENTS_ISSUES_REVIEW_METADATA"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT"),
    ],
    related_rbac_boundary_status: "ADMIN_SUPPORT_MODEL_ABSENT",
    notes:
      "No admin/support actor model is created and human review remains required.",
  }),
  "ADMIN-SUPPORT-GAP-002_ADMIN_SUPPORT_RUNTIME_ROUTES_ABSENT": makeStatusGap({
    id: "ADMIN-SUPPORT-GAP-002_ADMIN_SUPPORT_RUNTIME_ROUTES_ABSENT",
    family: "ADMIN_SUPPORT_ROUTE_GAP",
    surface: "admin/support runtime route inventory",
    source_blocker_or_dependency: "no admin/support runtime routes exist",
    current_statuses: [
      "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
      "NOT_ADMIN_SUPPORT_ROUTES",
      "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    ],
    primary_absent_capability: "admin/support route implementation",
    required_prerequisites: [
      "admin/support runtime route inventory",
      "RBAC/access-control implementation",
      "audit/access-log implementation",
    ],
    overclaim_risk:
      "treating route-readiness wording as an implemented runtime route",
    future_boundary_posture: "future candidate only, not implemented",
    related_material_classes: [
      materialClass("SANITIZED_TEXT_PRIMARY_MATERIAL"),
      materialClass("REDACTED_REVIEW_SIGNAL_MATERIAL"),
    ],
    related_storage_location_ids: [
      locationId("L01_REPO_TRACKED_SOURCE_FILES"),
      locationId("L07_GITHUB_ACTIONS_WORKFLOWS"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT"),
    ],
    related_rbac_boundary_status: "ADMIN_SUPPORT_ROUTE_ABSENT",
    notes:
      "Route inventory evidence does not create runtime route handling or access.",
  }),
  "ADMIN-SUPPORT-GAP-003_ADMIN_SUPPORT_AUTH_FIELDS_ABSENT": makeStatusGap({
    id: "ADMIN-SUPPORT-GAP-003_ADMIN_SUPPORT_AUTH_FIELDS_ABSENT",
    family: "ADMIN_SUPPORT_AUTH_FIELD_GAP",
    surface: "admin/support authentication and authorization fields",
    source_blocker_or_dependency:
      "no admin/support auth fields or authorization state exist",
    current_statuses: [
      "NOT_ADMIN_SUPPORT_AUTH_FIELDS",
      "NOT_ADMIN_SUPPORT_DB_FIELDS",
      "NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    ],
    primary_absent_capability: "admin/support auth field implementation",
    required_prerequisites: [
      "admin/support authentication fields",
      "admin/support persisted authorization fields",
      "RBAC/access-control implementation",
    ],
    overclaim_risk:
      "treating actor labels or roles as access-granting authorization fields",
    future_boundary_posture: "future candidate only, not access control",
    related_material_classes: [
      materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL"),
    ],
    related_storage_location_ids: [
      locationId("L04_REPO_TRACKED_SCHEMAS"),
      locationId("L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-006_REVIEW_ACCESS"),
      aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT"),
    ],
    related_rbac_boundary_status: "AUTH_FIELDS_ABSENT_NOT_ACCESS_GRANTED",
    notes:
      "No auth fields, DB fields, schemas, or validator dispatch are created.",
  }),
  "ADMIN-SUPPORT-GAP-004_ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_DENIED": makeStatusGap({
    id: "ADMIN-SUPPORT-GAP-004_ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_DENIED",
    family: "ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_GAP",
    surface: "admin/support raw/private/source material access",
    source_blocker_or_dependency:
      "raw/private/source material remains denied by default",
    current_statuses: [
      "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
      "NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
      "BLOCKED_BY_RAW_MATERIAL_ROUTING_DENIAL",
    ],
    primary_absent_capability: "raw/private/source access authorization",
    required_prerequisites: [
      "raw-material routing denial policy",
      "admin/support no-bypass model",
      "RBAC/access-control implementation",
    ],
    overclaim_risk:
      "treating admin/support status as permission to inspect raw/private/source material",
    future_boundary_posture: "denied until explicit separate authorization",
    related_material_classes: [
      materialClass("RAW_PRIVATE_SOURCE_MATERIAL"),
      materialClass("TOKEN_URL_SECRET_MATERIAL"),
    ],
    related_storage_location_ids: [
      locationId("L11_LOCAL_UNTRACKED_FILES"),
      locationId("L25_CONNECTOR_TOOL_OR_AGENT_STATE"),
    ],
    related_raw_material_routing_control_ids: [
      rmrControlId("RMR_CS_006_RAW_PRIVATE_SOURCE_MATERIAL"),
    ],
    related_tpr_status_gap_ids: [
      tprGapId("TPR-STATUS-GAP-007_RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS"),
      aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT"),
    ],
    related_rbac_boundary_status: "RAW_PRIVATE_SOURCE_ACCESS_DENIED",
    notes:
      "Admin/support cannot bypass no-raw, no-private, no-source-locator constraints.",
  }),
  "ADMIN-SUPPORT-GAP-005_ADMIN_SUPPORT_SOURCE_PACKAGE_ACCESS_DENIED": makeStatusGap({
    id: "ADMIN-SUPPORT-GAP-005_ADMIN_SUPPORT_SOURCE_PACKAGE_ACCESS_DENIED",
    family: "ADMIN_SUPPORT_SOURCE_PACKAGE_ACCESS_GAP",
    surface: "admin/support source package access",
    source_blocker_or_dependency: "source-package material remains denied",
    current_statuses: [
      "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
      "NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
      "BLOCKED_BY_RAW_MATERIAL_ROUTING_DENIAL",
    ],
    primary_absent_capability: "source package access authorization",
    required_prerequisites: [
      "raw-material routing denial policy",
      "admin/support no-bypass model",
      "RBAC/access-control implementation",
    ],
    overclaim_risk:
      "treating admin/support status as permission to inspect source packages",
    future_boundary_posture: "denied until explicit separate authorization",
    related_material_classes: [materialClass("SOURCE_PACKAGE_MATERIAL")],
    related_storage_location_ids: [
      locationId("L13_LOCAL_EXPORT_PACKAGES"),
      locationId("L14_LOCAL_ARCHIVES_OR_ZIPS"),
      locationId("L15_NODE_MODULES_OR_PACKAGE_CACHE"),
    ],
    related_raw_material_routing_control_ids: [
      rmrControlId("RMR_CS_007_SOURCE_PACKAGE_MATERIAL"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS"),
      aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT"),
    ],
    related_rbac_boundary_status: "SOURCE_PACKAGE_ACCESS_DENIED",
    notes:
      "No package inspection, dependency traversal, or source package handling is created.",
  }),
  "ADMIN-SUPPORT-GAP-006_ADMIN_SUPPORT_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS_DENIED":
    makeStatusGap({
      id: "ADMIN-SUPPORT-GAP-006_ADMIN_SUPPORT_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS_DENIED",
      family: "ADMIN_SUPPORT_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS_GAP",
      surface: "admin/support PDF image screenshot metadata access",
      source_blocker_or_dependency:
        "PDF/image/screenshot/metadata material remains denied",
      current_statuses: [
        "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
        "NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
        "BLOCKED_BY_RAW_MATERIAL_ROUTING_DENIAL",
      ],
      primary_absent_capability:
        "PDF/image/screenshot/metadata access authorization",
      required_prerequisites: [
        "raw-material routing denial policy",
        "admin/support no-bypass model",
        "RBAC/access-control implementation",
      ],
      overclaim_risk:
        "treating admin/support status as permission to acquire metadata or inspect media",
      future_boundary_posture: "denied until explicit separate authorization",
      related_material_classes: [
        materialClass("PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL"),
      ],
      related_storage_location_ids: [
        locationId("L11_LOCAL_UNTRACKED_FILES"),
        locationId("L12_LOCAL_GENERATED_ARTIFACTS"),
      ],
      related_raw_material_routing_control_ids: [
        rmrControlId("RMR_CS_008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL"),
      ],
      related_tpr_status_gap_ids: [
        tprGapId(
          "TPR-STATUS-GAP-008_PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP",
        ),
      ],
      related_aal_event_candidate_ids: [
        aalEventId("AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS"),
        aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT"),
      ],
      related_rbac_boundary_status: "MEDIA_METADATA_ACCESS_DENIED",
      notes:
        "No PDF, image, screenshot, or metadata acquisition behavior is created.",
    }),
  "ADMIN-SUPPORT-GAP-007_ADMIN_SUPPORT_LOG_VIEWER_RBAC_ABSENT": makeStatusGap({
    id: "ADMIN-SUPPORT-GAP-007_ADMIN_SUPPORT_LOG_VIEWER_RBAC_ABSENT",
    family: "ADMIN_SUPPORT_LOG_VIEWER_GAP",
    surface: "admin/support log viewer access",
    source_blocker_or_dependency:
      "audit/access-log storage and log viewer RBAC are absent",
    current_statuses: [
      "NOT_LOG_VIEWER_RBAC",
      "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
      "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
    ],
    primary_absent_capability: "log viewer RBAC",
    required_prerequisites: [
      "log viewer RBAC model",
      "audit/access-log implementation",
      "no-content audit/access event policy",
    ],
    overclaim_risk:
      "treating event candidates or log-storage placeholders as privileged log access",
    future_boundary_posture: "future candidate only, not log access",
    related_material_classes: [
      materialClass("AUDIT_ACCESS_EVENT_RECORD"),
      materialClass("LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL"),
      materialClass("CI_LOG_OR_WORKFLOW_ARTIFACT"),
    ],
    related_storage_location_ids: [
      locationId("L08_GITHUB_ACTIONS_CI_LOGS"),
      locationId("L10_LOCAL_TEST_LOGS"),
      locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-016_AUDIT_LOG_VIEWER_ACCESS"),
      aalEventId("AAL-EVENT-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS"),
    ],
    related_rbac_boundary_status: "LOG_VIEWER_RBAC_ABSENT",
    notes:
      "Local logs remain not CI evidence and CI logs remain not release evidence.",
  }),
  "ADMIN-SUPPORT-GAP-008_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_DENIED": makeStatusGap({
    id: "ADMIN-SUPPORT-GAP-008_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_DENIED",
    family: "ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP",
    surface: "admin/support third-party route approval",
    source_blocker_or_dependency:
      "third-party provider routing remains a status gap",
    current_statuses: [
      "NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
      "NOT_PROVIDER_ROUTING_AUTHORIZATION",
      "BLOCKED_BY_THIRD_PARTY_ROUTE_GAP",
    ],
    primary_absent_capability: "third-party provider routing authorization",
    required_prerequisites: [
      "third-party provider routing policy",
      "provider identity/status registry",
      "provider data-routing map",
      "provider token/URL/secret handling policy",
      "admin/support no-bypass model",
    ],
    overclaim_risk:
      "treating admin/support review as provider route authorization",
    future_boundary_posture: "denied until explicit separate authorization",
    related_material_classes: [
      materialClass("THIRD_PARTY_MODEL_API_ROUTED_MATERIAL"),
      materialClass("PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL"),
      materialClass("TOKEN_URL_SECRET_MATERIAL"),
    ],
    related_storage_location_ids: [
      locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"),
      locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE"),
    ],
    related_raw_material_routing_control_ids: [
      rmrControlId("RMR_CS_009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL"),
    ],
    related_tpr_status_gap_ids: [
      tprGapId(
        "TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS",
      ),
      tprGapId("TPR-STATUS-GAP-010_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL"),
    ],
    related_lifecycle_families: [
      lifecycleFamily("PROVIDER_DELETION"),
      lifecycleFamily("RECIPIENT_PURGE"),
    ],
    related_rbac_boundary_status: "PROVIDER_ROUTE_APPROVAL_DENIED",
    notes:
      "Admin/support cannot authorize third-party model/API routing or provider storage.",
  }),
  "ADMIN-SUPPORT-GAP-009_ADMIN_SUPPORT_LIFECYCLE_EXECUTION_DENIED": makeStatusGap({
    id: "ADMIN-SUPPORT-GAP-009_ADMIN_SUPPORT_LIFECYCLE_EXECUTION_DENIED",
    family: "ADMIN_SUPPORT_LIFECYCLE_EXECUTION_GAP",
    surface: "admin/support retention deletion purge erasure execution",
    source_blocker_or_dependency:
      "lifecycle execution remains not implemented and not verified",
    current_statuses: [
      "NOT_RETENTION_DELETION_EXECUTION",
      "NOT_STORAGE_IMPLEMENTATION",
      "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
    ],
    primary_absent_capability: "lifecycle execution authorization",
    required_prerequisites: [
      "retention/deletion/purge/erasure execution policy",
      "encryption/key-management implementation policy",
      "audit/access-log implementation",
      "admin/support no-bypass model",
    ],
    overclaim_risk:
      "treating lifecycle gap review as deletion, purge, erasure, or verification",
    future_boundary_posture: "future candidate only, not lifecycle execution",
    related_material_classes: [
      materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL"),
      materialClass("AUDIT_ACCESS_EVENT_RECORD"),
    ],
    related_storage_location_ids: [
      locationId("L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE"),
      locationId("L18_OBJECT_STORAGE_FUTURE"),
      locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-012_RETENTION_DELETION_OPERATION"),
    ],
    related_lifecycle_families: [
      lifecycleFamily("RETENTION"),
      lifecycleFamily("DELETION"),
      lifecycleFamily("PURGE"),
      lifecycleFamily("ERASURE"),
      lifecycleFamily("ENCRYPTION"),
      lifecycleFamily("KEY_MANAGEMENT"),
    ],
    related_rbac_boundary_status: "LIFECYCLE_EXECUTION_DENIED",
    notes:
      "No retention, deletion, purge, erasure, encryption, or key management behavior is created.",
  }),
  "ADMIN-SUPPORT-GAP-010_ADMIN_SUPPORT_CROSS_TENANT_CASE_OVERRIDE_DENIED": makeStatusGap({
    id: "ADMIN-SUPPORT-GAP-010_ADMIN_SUPPORT_CROSS_TENANT_CASE_OVERRIDE_DENIED",
    family: "ADMIN_SUPPORT_CROSS_TENANT_CASE_OVERRIDE_GAP",
    surface: "admin/support tenant case capability override",
    source_blocker_or_dependency:
      "route/case/capability evidence is not full access control",
    current_statuses: [
      "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
      "NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
      "BLOCKED_BY_RBAC_ACCESS_CONTROL",
    ],
    primary_absent_capability: "tenant/case/capability override authorization",
    required_prerequisites: [
      "tenant/case/capability evidence model",
      "RBAC/access-control implementation",
      "admin/support no-bypass model",
    ],
    overclaim_risk:
      "treating route/case/capability evidence as global authorization",
    future_boundary_posture: "denied until explicit access-control implementation",
    related_material_classes: [
      materialClass("REDACTED_REVIEW_SIGNAL_MATERIAL"),
      materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL"),
    ],
    related_storage_location_ids: [
      locationId("L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE"),
      locationId("L25_CONNECTOR_TOOL_OR_AGENT_STATE"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-006_REVIEW_ACCESS"),
      aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT"),
    ],
    related_rbac_boundary_status:
      "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_GLOBAL_AUTHORIZATION",
    notes:
      "Route, case, and capability evidence cannot become full RBAC or admin/support access control.",
  }),
  "ADMIN-SUPPORT-GAP-011_ADMIN_SUPPORT_EXPORT_PACKET_DELIVERY_DENIED": makeStatusGap({
    id: "ADMIN-SUPPORT-GAP-011_ADMIN_SUPPORT_EXPORT_PACKET_DELIVERY_DENIED",
    family: "ADMIN_SUPPORT_EXPORT_PACKET_DELIVERY_GAP",
    surface: "admin/support export and packet delivery promotion",
    source_blocker_or_dependency:
      "generated/export artifacts do not imply external use or packet delivery approval",
    current_statuses: [
      "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
      "NOT_EXTERNAL_USE_AUTHORIZATION",
      "NOT_PRODUCT_CANDIDATE_SELECTION",
    ],
    primary_absent_capability: "export packet delivery authorization",
    required_prerequisites: [
      "release/external-use/product authorization policy",
      "human/professional review policy",
      "audit/access-log implementation",
    ],
    overclaim_risk:
      "treating a generated/export artifact as external-use or product approval",
    future_boundary_posture: "future candidate only, not external use",
    related_material_classes: [
      materialClass("GENERATED_ARTIFACT_OR_EXPORT_MATERIAL"),
      materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL"),
    ],
    related_storage_location_ids: [
      locationId("L12_LOCAL_GENERATED_ARTIFACTS"),
      locationId("L13_LOCAL_EXPORT_PACKAGES"),
      locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE"),
    ],
    related_raw_material_routing_control_ids: [
      rmrControlId("RMR_CS_004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL"),
    ],
    related_tpr_status_gap_ids: [
      tprGapId("TPR-STATUS-GAP-009_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-008_EXPORT_DOWNLOAD_ACCESS"),
      aalEventId("AAL-EVENT-009_PACKET_DELIVERY_PROMOTION_ATTEMPT"),
    ],
    related_rbac_boundary_status: "EXPORT_PACKET_DELIVERY_NOT_AUTHORIZED",
    notes:
      "Export/download or packet promotion evidence cannot create external-use approval.",
  }),
  "ADMIN-SUPPORT-GAP-012_ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_DENIED": makeStatusGap({
    id: "ADMIN-SUPPORT-GAP-012_ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_DENIED",
    family: "ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_GAP",
    surface: "admin/support release external-use product decision",
    source_blocker_or_dependency:
      "release, external-use, and product decisions require separate explicit authorization",
    current_statuses: [
      "NOT_RELEASE_APPROVAL",
      "NOT_EXTERNAL_USE_AUTHORIZATION",
      "NOT_PRODUCT_CANDIDATE_SELECTION",
      "NOT_RUNTIME_CERTIFICATION",
      "NOT_TECHNICAL_SIGNOFF",
    ],
    primary_absent_capability:
      "release/external-use/product authorization authority",
    required_prerequisites: [
      "release/external-use/product authorization policy",
      "runtime certification boundary",
      "technical sign-off boundary",
      "human/professional review policy",
    ],
    overclaim_risk:
      "treating admin/support runtime readiness as release or product readiness",
    future_boundary_posture: "separate explicit authorization required",
    related_material_classes: [
      materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL"),
      materialClass("CI_LOG_OR_WORKFLOW_ARTIFACT"),
    ],
    related_storage_location_ids: [
      locationId("L08_GITHUB_ACTIONS_CI_LOGS"),
      locationId("L24_PR_COMMENTS_ISSUES_REVIEW_METADATA"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS"),
    ],
    related_rbac_boundary_status: "HUMAN_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL",
    notes:
      "Human/professional review remains required and is not system approval.",
  }),
});

const UNKNOWN_GAP = deepFreeze({
  id: "UNKNOWN_NOT_EVIDENCED",
  family: "UNKNOWN_NOT_EVIDENCED",
  surface: "unknown admin/support runtime readiness status gap",
  source_blocker_or_dependency: "unknown admin/support runtime readiness input",
  current_statuses: ["UNKNOWN_NOT_EVIDENCED"],
  primary_absent_capability: "UNKNOWN_NOT_EVIDENCED",
  required_prerequisites: [],
  overclaim_risk: "unknown input cannot create admin/support runtime access",
  current_authorization_status: "UNKNOWN_NOT_EVIDENCED",
  access_decision_status: "UNKNOWN_NOT_EVIDENCED",
  future_boundary_posture: "unknown input denied by default",
  non_authorized_until_closure: true,
  related_material_classes: [],
  related_storage_location_ids: [],
  related_raw_material_routing_control_ids: [],
  related_tpr_status_gap_ids: [],
  related_aal_event_candidate_ids: [],
  related_lifecycle_families: [],
  related_rbac_boundary_status: "UNKNOWN_NOT_EVIDENCED",
  evidence_posture: "UNKNOWN_NOT_EVIDENCED",
  non_authorizations: BASE_NON_AUTHORIZATIONS,
  notes: "Unknown admin/support runtime readiness status gaps fail closed.",
});

const listAdminSupportRuntimeReadinessFamilies = () =>
  cloneAndFreeze(Object.values(ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_FAMILIES));

const listAdminSupportRuntimeReadinessStatusGaps = () =>
  cloneAndFreeze(
    Object.values(ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY),
  );

const getAdminSupportRuntimeReadinessStatusGap = (id) =>
  cloneAndFreeze(
    ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY[id] || UNKNOWN_GAP,
  );

const classifyAdminSupportRuntimeReadinessStatusGap = (id) => {
  const gap = getAdminSupportRuntimeReadinessStatusGap(id);

  return cloneAndFreeze({
    id: gap.id,
    known:
      Object.hasOwn(ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY, id) &&
      gap.id !== "UNKNOWN_NOT_EVIDENCED",
    family: gap.family,
    decision_status: gap.access_decision_status,
    current_authorization_status: gap.current_authorization_status,
    implementation_statuses: gap.current_statuses,
    evidence_posture: gap.evidence_posture,
    authorized: false,
    access_granted: false,
    admin_support_runtime_access_authorized: false,
    admin_support_runtime_access_implemented: false,
  });
};

const hasAdminSupportRuntimeReadinessStatusGap = (id) =>
  Object.hasOwn(ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY, id);

const listAdminSupportRuntimeReadinessNonOverclaimRules = () =>
  cloneAndFreeze(ADMIN_SUPPORT_RUNTIME_READINESS_NON_OVERCLAIM_RULES);

const getAdminSupportRuntimeReadinessRequiredPrerequisites = () =>
  cloneAndFreeze(ADMIN_SUPPORT_RUNTIME_READINESS_REQUIRED_PREREQUISITES);

const getAdminSupportRuntimeReadinessNonAuthorizationStatus = () =>
  cloneAndFreeze({
    implementation_statuses: BASE_IMPLEMENTATION_STATUSES,
    decision_statuses: [
      "REGISTRY_SCAFFOLD_ONLY",
      "STATUS_GAP_ONLY",
      "DENY_BY_DEFAULT",
      "NOT_AUTHORIZED",
      "NOT_ACCESS_GRANTED",
    ],
    evidence_posture: "REGISTRY_SCAFFOLD_EVIDENCE",
    high_risk_material_classes_denied: Object.values(
      HIGH_RISK_MATERIAL_CLASSES_DENIED,
    ).map((entry) => entry.material_class),
    required_prerequisites: ADMIN_SUPPORT_RUNTIME_READINESS_REQUIRED_PREREQUISITES,
    non_overclaim_rules: ADMIN_SUPPORT_RUNTIME_READINESS_NON_OVERCLAIM_RULES,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
  });

const isAdminSupportRuntimeAccessImplemented = () => false;

const isAdminSupportRuntimeAccessAuthorized = () => false;

module.exports = {
  ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_FAMILIES,
  ADMIN_SUPPORT_RUNTIME_READINESS_IMPLEMENTATION_STATUS,
  ADMIN_SUPPORT_RUNTIME_READINESS_DECISION_STATUS,
  ADMIN_SUPPORT_RUNTIME_READINESS_EVIDENCE_POSTURE,
  ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
  ADMIN_SUPPORT_RUNTIME_READINESS_NON_OVERCLAIM_RULES,
  ADMIN_SUPPORT_RUNTIME_READINESS_REQUIRED_PREREQUISITES,
  listAdminSupportRuntimeReadinessFamilies,
  listAdminSupportRuntimeReadinessStatusGaps,
  getAdminSupportRuntimeReadinessStatusGap,
  classifyAdminSupportRuntimeReadinessStatusGap,
  hasAdminSupportRuntimeReadinessStatusGap,
  listAdminSupportRuntimeReadinessNonOverclaimRules,
  getAdminSupportRuntimeReadinessRequiredPrerequisites,
  getAdminSupportRuntimeReadinessNonAuthorizationStatus,
  isAdminSupportRuntimeAccessImplemented,
  isAdminSupportRuntimeAccessAuthorized,
};
