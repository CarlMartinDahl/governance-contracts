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

const THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES = Object.freeze({
  THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS:
    "THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS",
  PROVIDER_IDENTITY_STATUS_GAP: "PROVIDER_IDENTITY_STATUS_GAP",
  PROVIDER_DATA_ROUTING_MAP_GAP: "PROVIDER_DATA_ROUTING_MAP_GAP",
  PROVIDER_RETENTION_DELETION_POSTURE_GAP:
    "PROVIDER_RETENTION_DELETION_POSTURE_GAP",
  PROVIDER_AUDITABILITY_LOGGING_GAP: "PROVIDER_AUDITABILITY_LOGGING_GAP",
  PROVIDER_TOKEN_URL_SECRET_HANDLING_GAP:
    "PROVIDER_TOKEN_URL_SECRET_HANDLING_GAP",
  RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP:
    "RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP",
  PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP:
    "PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP",
  GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP:
    "GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP",
  ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP:
    "ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP",
  WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_GAP:
    "WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_GAP",
  RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_GAP:
    "RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_GAP",
  HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_GAP:
    "HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_GAP",
});

const THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS = Object.freeze({
  NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION:
    "NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
  NOT_THIRD_PARTY_MODEL_API_ROUTING_AUTHORIZATION:
    "NOT_THIRD_PARTY_MODEL_API_ROUTING_AUTHORIZATION",
  NOT_PROVIDER_ROUTING_AUTHORIZATION: "NOT_PROVIDER_ROUTING_AUTHORIZATION",
  NOT_PROVIDER_INTEGRATION: "NOT_PROVIDER_INTEGRATION",
  NOT_PROVIDER_REGISTRY: "NOT_PROVIDER_REGISTRY",
  NOT_PROVIDER_STATUS_IMPLEMENTATION: "NOT_PROVIDER_STATUS_IMPLEMENTATION",
  NOT_DATA_ROUTING_MAP: "NOT_DATA_ROUTING_MAP",
  NOT_PROVIDER_RETENTION_DELETION_POSTURE:
    "NOT_PROVIDER_RETENTION_DELETION_POSTURE",
  NOT_PROVIDER_AUDITABILITY: "NOT_PROVIDER_AUDITABILITY",
  NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING:
    "NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING",
  NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION:
    "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
  NOT_RETENTION_DELETION_IMPLEMENTATION:
    "NOT_RETENTION_DELETION_IMPLEMENTATION",
  NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION:
    "NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
  NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION:
    "NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
  NOT_RUNTIME_ROUTE_ENFORCEMENT: "NOT_RUNTIME_ROUTE_ENFORCEMENT",
  NOT_EXTERNAL_USE: "NOT_EXTERNAL_USE",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const THIRD_PARTY_ROUTING_DECISION_STATUS = Object.freeze({
  DOCS_ONLY_STATUS_GAP: "DOCS_ONLY_STATUS_GAP",
  REGISTRY_SCAFFOLD_ONLY: "REGISTRY_SCAFFOLD_ONLY",
  DENY_BY_DEFAULT: "DENY_BY_DEFAULT",
  STATUS_GAP_ONLY: "STATUS_GAP_ONLY",
  ROUTE_CANDIDATE_ONLY: "ROUTE_CANDIDATE_ONLY",
  NOT_ROUTED: "NOT_ROUTED",
  NOT_AUTHORIZED: "NOT_AUTHORIZED",
  BLOCKED_BY_PROVIDER_STATUS: "BLOCKED_BY_PROVIDER_STATUS",
  BLOCKED_BY_DATA_ROUTING_MAP: "BLOCKED_BY_DATA_ROUTING_MAP",
  BLOCKED_BY_PROVIDER_RETENTION_DELETION:
    "BLOCKED_BY_PROVIDER_RETENTION_DELETION",
  BLOCKED_BY_PROVIDER_AUDITABILITY: "BLOCKED_BY_PROVIDER_AUDITABILITY",
  BLOCKED_BY_TOKEN_URL_SECRET_HANDLING:
    "BLOCKED_BY_TOKEN_URL_SECRET_HANDLING",
  BLOCKED_BY_RBAC_ACCESS_CONTROL: "BLOCKED_BY_RBAC_ACCESS_CONTROL",
  BLOCKED_BY_AUDIT_ACCESS_LOG: "BLOCKED_BY_AUDIT_ACCESS_LOG",
  BLOCKED_BY_RETENTION_DELETION: "BLOCKED_BY_RETENTION_DELETION",
  BLOCKED_BY_RAW_MATERIAL_ROUTING: "BLOCKED_BY_RAW_MATERIAL_ROUTING",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const THIRD_PARTY_ROUTING_EVIDENCE_POSTURE = Object.freeze({
  DOCS_ONLY_STATUS_GAP: "DOCS_ONLY_STATUS_GAP",
  REGISTRY_SCAFFOLD_EVIDENCE: "REGISTRY_SCAFFOLD_EVIDENCE",
  TESTED_ALIGNMENT_EVIDENCE: "TESTED_ALIGNMENT_EVIDENCE",
  CI_TESTED_SCENARIO_EVIDENCE: "CI_TESTED_SCENARIO_EVIDENCE",
  FUTURE_CANDIDATE_ONLY: "FUTURE_CANDIDATE_ONLY",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const BASE_IMPLEMENTATION_STATUSES = Object.freeze([
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
    .NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
    .NOT_THIRD_PARTY_MODEL_API_ROUTING_AUTHORIZATION,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_PROVIDER_ROUTING_AUTHORIZATION,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_PROVIDER_INTEGRATION,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_PROVIDER_REGISTRY,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_PROVIDER_STATUS_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_DATA_ROUTING_MAP,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
    .NOT_PROVIDER_RETENTION_DELETION_POSTURE,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_PROVIDER_AUDITABILITY,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
    .NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
    .NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
    .NOT_RETENTION_DELETION_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
    .NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
    .NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_RUNTIME_ROUTE_ENFORCEMENT,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_EXTERNAL_USE,
]);

const BASE_NON_AUTHORIZATIONS = Object.freeze({
  authorized: false,
  route_authorized: false,
  routed: false,
  third_party_routing_authorized: false,
  provider_routing_authorized: false,
  provider_integration_created: false,
  provider_registry_created: false,
  provider_status_implemented: false,
  data_routing_map_created: false,
  token_url_secret_handling_implemented: false,
  raw_material_routing_implemented: false,
  metadata_acquisition_authorized: false,
  audit_access_log_implemented: false,
  retention_deletion_implemented: false,
  rbac_access_control_implemented: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_authorized: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
});

const THIRD_PARTY_ROUTING_NON_OVERCLAIM_RULES = Object.freeze([
  "THIRD_PARTY_ROUTING_STATUS_GAP does not mean THIRD_PARTY_ROUTING_IMPLEMENTATION",
  "STATUS_GAP_ROW does not mean ROUTE_AUTHORIZATION",
  "PROVIDER_IDENTITY_STATUS_GAP does not mean PROVIDER_REGISTRY_CREATED",
  "PROVIDER_STATUS_GAP does not mean PROVIDER_STATUS_IMPLEMENTATION",
  "DATA_ROUTING_MAP_GAP does not mean DATA_ROUTING_MAP_CREATED",
  "PROVIDER_RETENTION_DELETION_GAP does not mean PROVIDER_RETENTION_DELETION_IMPLEMENTED",
  "PROVIDER_AUDITABILITY_GAP does not mean AUDIT_ACCESS_LOG_IMPLEMENTATION",
  "TOKEN_URL_SECRET_HANDLING_GAP does not mean TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
  "RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP does not mean RAW_PRIVATE_SOURCE_ROUTE_AUTHORIZED",
  "PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP does not mean METADATA_ACQUISITION_AUTHORIZED",
  "GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP does not mean EXTERNAL_USE_AUTHORIZATION",
  "ADMIN_SUPPORT_ROUTE_APPROVAL_GAP does not mean ADMIN_SUPPORT_ROUTE_APPROVAL_AUTHORIZED",
  "HUMAN_REVIEW_PROVIDER_DEPENDENCY does not mean SYSTEM_APPROVAL",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
]);

const THIRD_PARTY_ROUTING_REQUIRED_PREREQUISITES = Object.freeze([
  "provider identity/status registry",
  "provider status semantics",
  "provider data-routing map",
  "provider retention/deletion posture",
  "provider auditability posture",
  "provider token/URL/secret handling policy",
  "material-class routing policy",
  "raw-material routing denial policy",
  "no-raw/no-private/no-source-locator/no-token/no-URL policy",
  "RBAC/access-control model",
  "admin/support no-bypass model",
  "audit/access-log model",
  "no-content route event policy",
  "retention/deletion/purge/erasure policy",
  "encryption/key-management policy",
  "CI test plan",
  "provider route denial tests",
  "external-use non-authorization wording",
  "non-proof/non-route-readiness wording",
]);

const requiredFieldNames = Object.freeze([
  "id",
  "family",
  "surface",
  "source_blocker_or_dependency",
  "current_statuses",
  "primary_absent_capability",
  "required_prerequisites",
  "overclaim_risk",
  "current_authorization_status",
  "future_boundary_posture",
  "non_authorized_until_closure",
  "related_material_classes",
  "related_storage_location_ids",
  "related_raw_material_routing_control_ids",
  "related_aal_event_candidate_ids",
  "related_lifecycle_families",
  "related_rbac_boundary_status",
  "evidence_posture",
  "non_authorizations",
  "notes",
]);

const allPrerequisites = THIRD_PARTY_ROUTING_REQUIRED_PREREQUISITES;
const highRiskMaterials = Object.freeze(
  Object.values(HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
    (entry) => entry.material_class,
  ),
);

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }

  Object.freeze(value);
  for (const key of Object.keys(value)) {
    deepFreeze(value[key]);
  }

  return value;
}

function cloneAndFreeze(value) {
  if (Array.isArray(value)) {
    return deepFreeze(value.map((item) => cloneAndFreeze(item)));
  }

  if (value && typeof value === "object") {
    return deepFreeze(
      Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, cloneAndFreeze(item)]),
      ),
    );
  }

  return value;
}

function makeStatusGap({
  id,
  family,
  surface,
  sourceBlockerOrDependency,
  currentStatuses,
  primaryAbsentCapability,
  requiredPrerequisites = allPrerequisites,
  overclaimRisk,
  currentAuthorizationStatus,
  futureBoundaryPosture,
  relatedMaterialClasses,
  relatedStorageLocationIds,
  relatedRawMaterialRoutingControlIds,
  relatedAalEventCandidateIds,
  relatedLifecycleFamilies,
  relatedRbacBoundaryStatus,
  evidencePosture = THIRD_PARTY_ROUTING_EVIDENCE_POSTURE
    .REGISTRY_SCAFFOLD_EVIDENCE,
  notes,
}) {
  return Object.freeze({
    id,
    family,
    surface,
    source_blocker_or_dependency: sourceBlockerOrDependency,
    current_statuses: Object.freeze([...currentStatuses]),
    primary_absent_capability: primaryAbsentCapability,
    required_prerequisites: Object.freeze([...requiredPrerequisites]),
    overclaim_risk: overclaimRisk,
    current_authorization_status: currentAuthorizationStatus,
    future_boundary_posture: futureBoundaryPosture,
    non_authorized_until_closure: true,
    related_material_classes: Object.freeze([...relatedMaterialClasses]),
    related_storage_location_ids: Object.freeze([...relatedStorageLocationIds]),
    related_raw_material_routing_control_ids: Object.freeze([
      ...relatedRawMaterialRoutingControlIds,
    ]),
    related_aal_event_candidate_ids: Object.freeze([
      ...relatedAalEventCandidateIds,
    ]),
    related_lifecycle_families: Object.freeze([...relatedLifecycleFamilies]),
    related_rbac_boundary_status: relatedRbacBoundaryStatus,
    evidence_posture: evidencePosture,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    notes,
  });
}

const providerStorageIds = Object.freeze([
  "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
]);
const recipientStorageIds = Object.freeze(["L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE"]);
const repoScaffoldStorageIds = Object.freeze([
  "L01_REPO_TRACKED_SOURCE_FILES",
  "L02_REPO_TRACKED_TEST_FILES",
  "L03_REPO_TRACKED_DOCS",
]);
const thirdPartyEventIds = Object.freeze([
  "AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL",
]);
const runtimeGateEventIds = Object.freeze([
  "AAL-EVENT-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE",
]);
const humanReviewEventIds = Object.freeze([
  "AAL-EVENT-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS",
]);

const THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY = deepFreeze({
  "TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS":
    makeStatusGap({
      id: "TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS",
      family:
        THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES
          .THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS,
      surface: "third-party model/API route request status",
      sourceBlockerOrDependency: "provider route request has no authorization",
      currentStatuses: [
        THIRD_PARTY_ROUTING_DECISION_STATUS.DENY_BY_DEFAULT,
        THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_PROVIDER_STATUS,
        THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_DATA_ROUTING_MAP,
      ],
      primaryAbsentCapability:
        THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
          .NOT_THIRD_PARTY_MODEL_API_ROUTING_AUTHORIZATION,
      overclaimRisk: "status row could be mistaken for route authorization",
      currentAuthorizationStatus: "NOT_AUTHORIZED",
      futureBoundaryPosture: "future candidate only after all blockers close",
      relatedMaterialClasses: [
        MATERIAL_CLASSES.THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
        MATERIAL_CLASSES.PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL,
      ],
      relatedStorageLocationIds: providerStorageIds,
      relatedRawMaterialRoutingControlIds: [
        "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
      ],
      relatedAalEventCandidateIds: thirdPartyEventIds,
      relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.PROVIDER_DELETION],
      relatedRbacBoundaryStatus: "NO_PROVIDER_ROUTE_PERMISSION",
      notes: "Third-party model/API routing remains denied by default.",
    }),
  "TPR-STATUS-GAP-002_PROVIDER_IDENTITY_STATUS_GAP": makeStatusGap({
    id: "TPR-STATUS-GAP-002_PROVIDER_IDENTITY_STATUS_GAP",
    family:
      THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES.PROVIDER_IDENTITY_STATUS_GAP,
    surface: "provider identity/status gap",
    sourceBlockerOrDependency: "provider identity/status registry absent",
    currentStatuses: [
      THIRD_PARTY_ROUTING_DECISION_STATUS.STATUS_GAP_ONLY,
      THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_PROVIDER_STATUS,
    ],
    primaryAbsentCapability:
      THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_PROVIDER_REGISTRY,
    overclaimRisk: "provider status gap could be mistaken for verification",
    currentAuthorizationStatus: "NOT_AUTHORIZED",
    futureBoundaryPosture: "provider status registry remains future work",
    relatedMaterialClasses: [
      MATERIAL_CLASSES.THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
      MATERIAL_CLASSES.PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL,
    ],
    relatedStorageLocationIds: providerStorageIds,
    relatedRawMaterialRoutingControlIds: [
      "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    ],
    relatedAalEventCandidateIds: thirdPartyEventIds,
    relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.PROVIDER_DELETION],
    relatedRbacBoundaryStatus: "NO_PROVIDER_STATUS_PERMISSION",
    notes: "Provider identity/status is not implemented or verified.",
  }),
  "TPR-STATUS-GAP-003_PROVIDER_DATA_ROUTING_MAP_GAP": makeStatusGap({
    id: "TPR-STATUS-GAP-003_PROVIDER_DATA_ROUTING_MAP_GAP",
    family:
      THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES.PROVIDER_DATA_ROUTING_MAP_GAP,
    surface: "provider data-routing map gap",
    sourceBlockerOrDependency: "provider data-routing map absent",
    currentStatuses: [
      THIRD_PARTY_ROUTING_DECISION_STATUS.STATUS_GAP_ONLY,
      THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_DATA_ROUTING_MAP,
    ],
    primaryAbsentCapability:
      THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_DATA_ROUTING_MAP,
    overclaimRisk: "route map gap could be mistaken for created route map",
    currentAuthorizationStatus: "NOT_AUTHORIZED",
    futureBoundaryPosture: "data-routing map remains future and not authorized",
    relatedMaterialClasses: [
      MATERIAL_CLASSES.THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
      MATERIAL_CLASSES.TOKEN_URL_SECRET_MATERIAL,
    ],
    relatedStorageLocationIds: providerStorageIds,
    relatedRawMaterialRoutingControlIds: [
      "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    ],
    relatedAalEventCandidateIds: thirdPartyEventIds,
    relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.PROVIDER_DELETION],
    relatedRbacBoundaryStatus: "NO_DATA_ROUTING_PERMISSION",
    notes: "No data-routing map is created by this scaffold.",
  }),
  "TPR-STATUS-GAP-004_PROVIDER_RETENTION_DELETION_POSTURE_GAP":
    makeStatusGap({
      id: "TPR-STATUS-GAP-004_PROVIDER_RETENTION_DELETION_POSTURE_GAP",
      family:
        THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES
          .PROVIDER_RETENTION_DELETION_POSTURE_GAP,
      surface: "provider retention/deletion posture gap",
      sourceBlockerOrDependency:
        "provider retention/deletion posture absent and unverified",
      currentStatuses: [
        THIRD_PARTY_ROUTING_DECISION_STATUS.STATUS_GAP_ONLY,
        THIRD_PARTY_ROUTING_DECISION_STATUS
          .BLOCKED_BY_PROVIDER_RETENTION_DELETION,
        THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_RETENTION_DELETION,
      ],
      primaryAbsentCapability:
        THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
          .NOT_PROVIDER_RETENTION_DELETION_POSTURE,
      overclaimRisk:
        "provider posture could be mistaken for provider deletion verification",
      currentAuthorizationStatus: "NOT_AUTHORIZED",
      futureBoundaryPosture: "provider lifecycle posture is future/not verified",
      relatedMaterialClasses: [
        MATERIAL_CLASSES.THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
        MATERIAL_CLASSES.PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL,
      ],
      relatedStorageLocationIds: providerStorageIds,
      relatedRawMaterialRoutingControlIds: [
        "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
      ],
      relatedAalEventCandidateIds: thirdPartyEventIds,
      relatedLifecycleFamilies: [
        LIFECYCLE_CONTROL_FAMILIES.PROVIDER_DELETION,
        LIFECYCLE_CONTROL_FAMILIES.RECIPIENT_PURGE,
      ],
      relatedRbacBoundaryStatus: "NO_PROVIDER_LIFECYCLE_PERMISSION",
      notes: "Provider posture is not provider deletion verification.",
    }),
  "TPR-STATUS-GAP-005_PROVIDER_AUDITABILITY_LOGGING_GAP": makeStatusGap({
    id: "TPR-STATUS-GAP-005_PROVIDER_AUDITABILITY_LOGGING_GAP",
    family:
      THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES
        .PROVIDER_AUDITABILITY_LOGGING_GAP,
    surface: "provider auditability/logging gap",
    sourceBlockerOrDependency: "provider auditability posture absent",
    currentStatuses: [
      THIRD_PARTY_ROUTING_DECISION_STATUS.STATUS_GAP_ONLY,
      THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_PROVIDER_AUDITABILITY,
      THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_AUDIT_ACCESS_LOG,
    ],
    primaryAbsentCapability:
      THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_PROVIDER_AUDITABILITY,
    overclaimRisk: "provider auditability could be mistaken for audit logging",
    currentAuthorizationStatus: "NOT_AUTHORIZED",
    futureBoundaryPosture: "auditability remains future and not log storage",
    relatedMaterialClasses: [
      MATERIAL_CLASSES.THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
      MATERIAL_CLASSES.AUDIT_ACCESS_EVENT_RECORD,
    ],
    relatedStorageLocationIds: [
      "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
      ...providerStorageIds,
    ],
    relatedRawMaterialRoutingControlIds: [
      "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    ],
    relatedAalEventCandidateIds: [
      "AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL",
      "AAL-EVENT-016_AUDIT_LOG_VIEWER_ACCESS",
    ],
    relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
    relatedRbacBoundaryStatus: "NO_AUDIT_LOG_VIEWER_RBAC",
    notes: "Auditability gap is not audit/access-log implementation.",
  }),
  "TPR-STATUS-GAP-006_PROVIDER_TOKEN_URL_SECRET_HANDLING_GAP":
    makeStatusGap({
      id: "TPR-STATUS-GAP-006_PROVIDER_TOKEN_URL_SECRET_HANDLING_GAP",
      family:
        THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES
          .PROVIDER_TOKEN_URL_SECRET_HANDLING_GAP,
      surface: "provider token/URL/secret handling gap",
      sourceBlockerOrDependency: "token/URL/secret handling policy absent",
      currentStatuses: [
        THIRD_PARTY_ROUTING_DECISION_STATUS.STATUS_GAP_ONLY,
        THIRD_PARTY_ROUTING_DECISION_STATUS
          .BLOCKED_BY_TOKEN_URL_SECRET_HANDLING,
      ],
      primaryAbsentCapability:
        THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
          .NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING,
      overclaimRisk:
        "token/URL/secret handling gap could be mistaken for handling implementation",
      currentAuthorizationStatus: "NOT_AUTHORIZED",
      futureBoundaryPosture:
        "token/URL/secret handling remains future and not implemented",
      relatedMaterialClasses: [MATERIAL_CLASSES.TOKEN_URL_SECRET_MATERIAL],
      relatedStorageLocationIds: providerStorageIds,
      relatedRawMaterialRoutingControlIds: [
        "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
      ],
      relatedAalEventCandidateIds: thirdPartyEventIds,
      relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.KEY_MANAGEMENT],
      relatedRbacBoundaryStatus: "NO_TOKEN_SECRET_ACCESS_PERMISSION",
      notes: "No token, URL, or secret handling implementation is created.",
    }),
  "TPR-STATUS-GAP-007_RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP": makeStatusGap({
    id: "TPR-STATUS-GAP-007_RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP",
    family:
      THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES
        .RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP,
    surface: "raw/private/source route attempt gap",
    sourceBlockerOrDependency: "raw/private/source material route denied",
    currentStatuses: [
      THIRD_PARTY_ROUTING_DECISION_STATUS.DENY_BY_DEFAULT,
      THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_RAW_MATERIAL_ROUTING,
    ],
    primaryAbsentCapability:
      THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
        .NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION,
    overclaimRisk: "route attempt could be mistaken for raw/source routing",
    currentAuthorizationStatus: "NOT_AUTHORIZED",
    futureBoundaryPosture: "raw/private/source routing remains denied",
    relatedMaterialClasses: [
      MATERIAL_CLASSES.RAW_PRIVATE_SOURCE_MATERIAL,
      MATERIAL_CLASSES.SOURCE_PACKAGE_MATERIAL,
    ],
    relatedStorageLocationIds: ["L11_LOCAL_UNTRACKED_FILES"],
    relatedRawMaterialRoutingControlIds: [
      "RMR-CS-006_RAW_PRIVATE_SOURCE_MATERIAL",
      "RMR-CS-007_SOURCE_PACKAGE_MATERIAL",
    ],
    relatedAalEventCandidateIds: [
      "AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS",
      "AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL",
    ],
    relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.ERASURE],
    relatedRbacBoundaryStatus: "NO_RAW_SOURCE_ROUTE_PERMISSION",
    notes: "Raw/private/source material is not inspected, routed, or external use.",
  }),
  "TPR-STATUS-GAP-008_PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP":
    makeStatusGap({
      id: "TPR-STATUS-GAP-008_PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP",
      family:
        THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES
          .PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP,
      surface: "PDF/image/screenshot/metadata route attempt gap",
      sourceBlockerOrDependency:
        "PDF/image/screenshot/metadata inspection and acquisition denied",
      currentStatuses: [
        THIRD_PARTY_ROUTING_DECISION_STATUS.DENY_BY_DEFAULT,
        THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_RAW_MATERIAL_ROUTING,
      ],
      primaryAbsentCapability:
        THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
          .NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION,
      overclaimRisk:
        "metadata route attempt could be mistaken for metadata acquisition",
      currentAuthorizationStatus: "NOT_AUTHORIZED",
      futureBoundaryPosture: "media/metadata route remains denied",
      relatedMaterialClasses: [
        MATERIAL_CLASSES.PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL,
      ],
      relatedStorageLocationIds: ["L11_LOCAL_UNTRACKED_FILES"],
      relatedRawMaterialRoutingControlIds: [
        "RMR-CS-008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
      ],
      relatedAalEventCandidateIds: [
        "AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS",
        "AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL",
      ],
      relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.ERASURE],
      relatedRbacBoundaryStatus: "NO_MEDIA_METADATA_ROUTE_PERMISSION",
      notes: "PDF/image/screenshot/metadata remains not inspected or acquired.",
    }),
  "TPR-STATUS-GAP-009_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP":
    makeStatusGap({
      id: "TPR-STATUS-GAP-009_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP",
      family:
        THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES
          .GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP,
      surface: "generated/export artifact route attempt gap",
      sourceBlockerOrDependency: "generated/export route is not external use",
      currentStatuses: [
        THIRD_PARTY_ROUTING_DECISION_STATUS.ROUTE_CANDIDATE_ONLY,
        THIRD_PARTY_ROUTING_DECISION_STATUS.NOT_AUTHORIZED,
      ],
      primaryAbsentCapability:
        THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_EXTERNAL_USE,
      overclaimRisk:
        "generated/export artifact could be mistaken for external-use authorization",
      currentAuthorizationStatus: "NOT_AUTHORIZED",
      futureBoundaryPosture: "external-use remains separately unauthorized",
      relatedMaterialClasses: [
        MATERIAL_CLASSES.GENERATED_ARTIFACT_OR_EXPORT_MATERIAL,
      ],
      relatedStorageLocationIds: [
        "L12_LOCAL_GENERATED_ARTIFACTS",
        "L13_LOCAL_EXPORT_PACKAGES",
      ],
      relatedRawMaterialRoutingControlIds: [
        "RMR-CS-004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL",
      ],
      relatedAalEventCandidateIds: [
        "AAL-EVENT-008_EXPORT_DOWNLOAD_ACCESS",
        "AAL-EVENT-009_PACKET_DELIVERY_PROMOTION_ATTEMPT",
      ],
      relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
      relatedRbacBoundaryStatus: "NO_EXTERNAL_USE_PERMISSION",
      notes: "Generated/export artifact routing does not authorize delivery.",
    }),
  "TPR-STATUS-GAP-010_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP":
    makeStatusGap({
      id: "TPR-STATUS-GAP-010_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP",
      family:
        THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES
          .ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP,
      surface: "admin/support third-party route approval gap",
      sourceBlockerOrDependency:
        "admin/support route approval authority is absent",
      currentStatuses: [
        THIRD_PARTY_ROUTING_DECISION_STATUS.NOT_AUTHORIZED,
        THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_RBAC_ACCESS_CONTROL,
      ],
      primaryAbsentCapability:
        THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
          .NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION,
      overclaimRisk:
        "admin/support category could be mistaken for route approval authority",
      currentAuthorizationStatus: "NOT_AUTHORIZED",
      futureBoundaryPosture: "admin/support cannot approve provider routing",
      relatedMaterialClasses: [
        MATERIAL_CLASSES.THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
      ],
      relatedStorageLocationIds: providerStorageIds,
      relatedRawMaterialRoutingControlIds: [
        "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
      ],
      relatedAalEventCandidateIds: [
        "AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT",
        "AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL",
      ],
      relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
      relatedRbacBoundaryStatus: "ADMIN_SUPPORT_CANNOT_APPROVE_PROVIDER_ROUTE",
      notes: "Admin/support has no route approval bypass.",
    }),
  "TPR-STATUS-GAP-011_WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_GAP":
    makeStatusGap({
      id: "TPR-STATUS-GAP-011_WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_GAP",
      family:
        THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES
          .WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_GAP,
      surface: "workflow/agent/tool provider route gap",
      sourceBlockerOrDependency: "workflow/tool provider route gate absent",
      currentStatuses: [
        THIRD_PARTY_ROUTING_DECISION_STATUS.STATUS_GAP_ONLY,
        THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_PROVIDER_STATUS,
        THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_RBAC_ACCESS_CONTROL,
      ],
      primaryAbsentCapability:
        THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_RUNTIME_ROUTE_ENFORCEMENT,
      overclaimRisk:
        "workflow/tool capability could be mistaken for provider routing",
      currentAuthorizationStatus: "NOT_AUTHORIZED",
      futureBoundaryPosture: "workflow/tool provider route gate not implemented",
      relatedMaterialClasses: [
        MATERIAL_CLASSES.THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
        MATERIAL_CLASSES.PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL,
      ],
      relatedStorageLocationIds: providerStorageIds,
      relatedRawMaterialRoutingControlIds: [
        "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
      ],
      relatedAalEventCandidateIds: runtimeGateEventIds,
      relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
      relatedRbacBoundaryStatus: "NO_WORKFLOW_TOOL_PROVIDER_ROUTE_PERMISSION",
      notes: "Workflow/tool provider routing remains not implemented.",
    }),
  "TPR-STATUS-GAP-012_RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_GAP":
    makeStatusGap({
      id: "TPR-STATUS-GAP-012_RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_GAP",
      family:
        THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES
          .RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_GAP,
      surface: "runtime/schema/workflow gate provider route gap",
      sourceBlockerOrDependency: "runtime route enforcement gate absent",
      currentStatuses: [
        THIRD_PARTY_ROUTING_DECISION_STATUS.STATUS_GAP_ONLY,
        THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_RAW_MATERIAL_ROUTING,
        THIRD_PARTY_ROUTING_DECISION_STATUS.BLOCKED_BY_AUDIT_ACCESS_LOG,
      ],
      primaryAbsentCapability:
        THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.NOT_RUNTIME_ROUTE_ENFORCEMENT,
      overclaimRisk:
        "schema/workflow gate candidate could be mistaken for enforcement",
      currentAuthorizationStatus: "NOT_AUTHORIZED",
      futureBoundaryPosture: "runtime provider route gate remains future",
      relatedMaterialClasses: [
        MATERIAL_CLASSES.SYNTHETIC_NO_RAW_MATERIAL,
        MATERIAL_CLASSES.THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
      ],
      relatedStorageLocationIds: repoScaffoldStorageIds,
      relatedRawMaterialRoutingControlIds: [
        "RMR-CS-001_SANITIZED_TEXT_PRIMARY_MATERIAL",
        "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
      ],
      relatedAalEventCandidateIds: runtimeGateEventIds,
      relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
      relatedRbacBoundaryStatus: "NO_RUNTIME_ROUTE_GATE_PERMISSION",
      notes: "Runtime/schema/workflow gate candidate is not route enforcement.",
    }),
  "TPR-STATUS-GAP-013_HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_GAP":
    makeStatusGap({
      id: "TPR-STATUS-GAP-013_HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_GAP",
      family:
        THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES
          .HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_GAP,
      surface: "human/professional review provider route dependency gap",
      sourceBlockerOrDependency:
        "human/professional review is required but is not system approval",
      currentStatuses: [
        THIRD_PARTY_ROUTING_DECISION_STATUS.STATUS_GAP_ONLY,
        THIRD_PARTY_ROUTING_DECISION_STATUS.NOT_AUTHORIZED,
      ],
      primaryAbsentCapability:
        THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS
          .NOT_PROVIDER_ROUTING_AUTHORIZATION,
      overclaimRisk: "human review dependency could be mistaken for approval",
      currentAuthorizationStatus: "NOT_AUTHORIZED",
      futureBoundaryPosture: "human review remains separate release gate",
      relatedMaterialClasses: [
        MATERIAL_CLASSES.HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL,
      ],
      relatedStorageLocationIds: [
        "L24_PR_COMMENTS_ISSUES_REVIEW_METADATA",
        ...recipientStorageIds,
      ],
      relatedRawMaterialRoutingControlIds: [
        "RMR-CS-010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
      ],
      relatedAalEventCandidateIds: humanReviewEventIds,
      relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RECIPIENT_PURGE],
      relatedRbacBoundaryStatus: "HUMAN_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL",
      notes: "Human/professional review does not authorize provider routing.",
    }),
});

const registryById = deepFreeze(
  Object.fromEntries(
    Object.values(THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY).map((entry) => [
      entry.id,
      entry,
    ]),
  ),
);

const UNKNOWN_THIRD_PARTY_ROUTING_STATUS_GAP = deepFreeze({
  id: "UNKNOWN_NOT_EVIDENCED",
  family: THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
  surface: "unknown third-party routing status/gap",
  source_blocker_or_dependency: "UNKNOWN_NOT_EVIDENCED",
  current_statuses: Object.freeze([
    THIRD_PARTY_ROUTING_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
  ]),
  primary_absent_capability:
    THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
  required_prerequisites: allPrerequisites,
  overclaim_risk: "unknown status/gap is not route evidence",
  current_authorization_status: "UNKNOWN_NOT_EVIDENCED",
  future_boundary_posture: "not evidenced",
  non_authorized_until_closure: true,
  related_material_classes: Object.freeze([]),
  related_storage_location_ids: Object.freeze([]),
  related_raw_material_routing_control_ids: Object.freeze([]),
  related_aal_event_candidate_ids: Object.freeze([]),
  related_lifecycle_families: Object.freeze([]),
  related_rbac_boundary_status: "UNKNOWN_NOT_EVIDENCED",
  evidence_posture: THIRD_PARTY_ROUTING_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
  non_authorizations: BASE_NON_AUTHORIZATIONS,
  notes: "Unknown third-party routing status/gap is not evidenced and not authorized.",
});

function listThirdPartyRoutingStatusGapFamilies() {
  return cloneAndFreeze(Object.values(THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES));
}

function listThirdPartyRoutingStatusGaps() {
  return cloneAndFreeze(Object.values(THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY));
}

function getThirdPartyRoutingStatusGap(id) {
  return cloneAndFreeze(registryById[id] || UNKNOWN_THIRD_PARTY_ROUTING_STATUS_GAP);
}

function classifyThirdPartyRoutingStatusGap(id) {
  const entry = registryById[id];

  if (!entry) {
    return cloneAndFreeze({
      id: "UNKNOWN_NOT_EVIDENCED",
      decision_status: THIRD_PARTY_ROUTING_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
      implementation_statuses: [
        THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
      ],
      evidence_posture:
        THIRD_PARTY_ROUTING_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
      authorized: false,
      routed: false,
    });
  }

  return cloneAndFreeze({
    id: entry.id,
    family: entry.family,
    current_statuses: entry.current_statuses,
    primary_absent_capability: entry.primary_absent_capability,
    evidence_posture: entry.evidence_posture,
    non_authorized_until_closure: entry.non_authorized_until_closure,
    non_authorizations: entry.non_authorizations,
  });
}

function hasThirdPartyRoutingStatusGap(id) {
  return Object.prototype.hasOwnProperty.call(registryById, id);
}

function listThirdPartyRoutingNonOverclaimRules() {
  return cloneAndFreeze(THIRD_PARTY_ROUTING_NON_OVERCLAIM_RULES);
}

function getThirdPartyRoutingRequiredPrerequisites() {
  return cloneAndFreeze(THIRD_PARTY_ROUTING_REQUIRED_PREREQUISITES);
}

function getThirdPartyRoutingNonAuthorizationStatus() {
  return cloneAndFreeze({
    third_party_routing_implemented: false,
    high_risk_material_classes_denied: highRiskMaterials,
    required_field_names: requiredFieldNames,
    implementation_statuses: BASE_IMPLEMENTATION_STATUSES,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    non_overclaim_rules: THIRD_PARTY_ROUTING_NON_OVERCLAIM_RULES,
  });
}

function isThirdPartyRoutingImplemented() {
  return false;
}

function isThirdPartyRouteAuthorized() {
  return false;
}

module.exports = {
  THIRD_PARTY_ROUTING_STATUS_GAP_FAMILIES,
  THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS,
  THIRD_PARTY_ROUTING_DECISION_STATUS,
  THIRD_PARTY_ROUTING_EVIDENCE_POSTURE,
  THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
  THIRD_PARTY_ROUTING_NON_OVERCLAIM_RULES,
  THIRD_PARTY_ROUTING_REQUIRED_PREREQUISITES,
  classifyThirdPartyRoutingStatusGap,
  getThirdPartyRoutingNonAuthorizationStatus,
  getThirdPartyRoutingRequiredPrerequisites,
  getThirdPartyRoutingStatusGap,
  hasThirdPartyRoutingStatusGap,
  isThirdPartyRouteAuthorized,
  isThirdPartyRoutingImplemented,
  listThirdPartyRoutingNonOverclaimRules,
  listThirdPartyRoutingRequiredPrerequisites:
    getThirdPartyRoutingRequiredPrerequisites,
  listThirdPartyRoutingStatusGapFamilies,
  listThirdPartyRoutingStatusGaps,
  storageDataLocationRegistry: DATA_LOCATION_REGISTRY,
  storageMaterialClasses: MATERIAL_CLASSES,
  storageHighRiskMaterialClassesDenied: HIGH_RISK_MATERIAL_CLASSES_DENIED,
  rawMaterialRoutingControlRegistry: RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
  auditAccessLogEventCandidates: AUDIT_ACCESS_LOG_EVENT_CANDIDATES,
  lifecycleControlFamilies: LIFECYCLE_CONTROL_FAMILIES,
};
