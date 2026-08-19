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
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
} = require("./audit-access-log-runtime-readiness-blocker-status-registry.js");
const {
  RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
} = require("./raw-material-routing-control-specification-registry.js");
const {
  THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
} = require("./third-party-routing-status-gap-registry.js");
const {
  ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
} = require("./admin-support-runtime-readiness-status-gap-registry.js");
const {
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
} = require("./global-access-control-threat-model-inventory-status-registry.js");
const {
  RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
} = require("./runtime-gate-candidate-status-inventory-registry.js");
const {
  ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY,
} = require("./role-permission-model-status-gap-registry.js");
const { routeCaseCapabilityOverclaimRegistry } = require(
  "./rbac-role-permission-deny-by-default-scaffold.js",
);

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
const aalRuntimeBlockerId = (key) =>
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY[key].id;
const rmrControlId = (key) =>
  RAW_MATERIAL_ROUTING_CONTROL_REGISTRY[key].control_id;
const tprGapId = (key) => THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY[key].id;
const adminGapId = (key) =>
  ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY[key].id;
const gacRowId = (key) =>
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY[key].id;
const runtimeGateId = (key) =>
  RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY[key].id;
const rolePermissionGapId = (key) =>
  ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY[key].id;

const THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES = deepFreeze({
  THIRD_PARTY_MODEL_API_ROUTE_REQUEST_BLOCKER:
    "THIRD_PARTY_MODEL_API_ROUTE_REQUEST_BLOCKER",
  THIRD_PARTY_ROUTE_DENIAL_EVENT_BLOCKER:
    "THIRD_PARTY_ROUTE_DENIAL_EVENT_BLOCKER",
  THIRD_PARTY_ROUTE_APPROVAL_CANDIDATE_BLOCKER:
    "THIRD_PARTY_ROUTE_APPROVAL_CANDIDATE_BLOCKER",
  PROVIDER_IDENTITY_STATUS_RECORD_BLOCKER:
    "PROVIDER_IDENTITY_STATUS_RECORD_BLOCKER",
  PROVIDER_DATA_ROUTING_MAP_BLOCKER: "PROVIDER_DATA_ROUTING_MAP_BLOCKER",
  PROVIDER_RETENTION_DELETION_POSTURE_BLOCKER:
    "PROVIDER_RETENTION_DELETION_POSTURE_BLOCKER",
  PROVIDER_AUDITABILITY_LOGGING_POSTURE_BLOCKER:
    "PROVIDER_AUDITABILITY_LOGGING_POSTURE_BLOCKER",
  PROVIDER_TOKEN_URL_SECRET_HANDLING_BLOCKER:
    "PROVIDER_TOKEN_URL_SECRET_HANDLING_BLOCKER",
  RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_ATTEMPT_BLOCKER:
    "RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_ATTEMPT_BLOCKER",
  PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_BLOCKER:
    "PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_BLOCKER",
  GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_BLOCKER:
    "GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_BLOCKER",
  ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_ATTEMPT_BLOCKER:
    "ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_ATTEMPT_BLOCKER",
  WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_ATTEMPT_BLOCKER:
    "WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_ATTEMPT_BLOCKER",
  RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_EVENT_BLOCKER:
    "RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_EVENT_BLOCKER",
  HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_BLOCKER:
    "HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_BLOCKER",
});

const THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS = deepFreeze({
  NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION:
    "NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
  NOT_THIRD_PARTY_MODEL_API_ROUTING_AUTHORIZATION:
    "NOT_THIRD_PARTY_MODEL_API_ROUTING_AUTHORIZATION",
  NOT_PROVIDER_INTEGRATION: "NOT_PROVIDER_INTEGRATION",
  NOT_PROVIDER_REGISTRY: "NOT_PROVIDER_REGISTRY",
  NOT_PROVIDER_STATUS_IMPLEMENTATION: "NOT_PROVIDER_STATUS_IMPLEMENTATION",
  NOT_DATA_ROUTING_MAP: "NOT_DATA_ROUTING_MAP",
  NOT_PROVIDER_RETENTION_DELETION_POSTURE:
    "NOT_PROVIDER_RETENTION_DELETION_POSTURE",
  NOT_PROVIDER_AUDITABILITY: "NOT_PROVIDER_AUDITABILITY",
  NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING:
    "NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING",
  NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION:
    "NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
  NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION:
    "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
  NOT_EVENT_TAXONOMY_RUNTIME_CODE: "NOT_EVENT_TAXONOMY_RUNTIME_CODE",
  NOT_LOG_SCHEMA: "NOT_LOG_SCHEMA",
  NOT_LOG_STORAGE: "NOT_LOG_STORAGE",
  NOT_RETENTION_DELETION_IMPLEMENTATION:
    "NOT_RETENTION_DELETION_IMPLEMENTATION",
  NOT_RBAC_IMPLEMENTATION: "NOT_RBAC_IMPLEMENTATION",
  NOT_ACCESS_CONTROL_IMPLEMENTATION: "NOT_ACCESS_CONTROL_IMPLEMENTATION",
  NOT_ADMIN_SUPPORT_MODEL: "NOT_ADMIN_SUPPORT_MODEL",
  NOT_RUNTIME_GATE_IMPLEMENTATION: "NOT_RUNTIME_GATE_IMPLEMENTATION",
  NOT_RUNTIME_ENFORCEMENT: "NOT_RUNTIME_ENFORCEMENT",
  NOT_VALIDATOR_DISPATCH: "NOT_VALIDATOR_DISPATCH",
  NOT_RUNTIME_REGISTRY_LOOKUP: "NOT_RUNTIME_REGISTRY_LOOKUP",
  NOT_SECURITY_FINDING: "NOT_SECURITY_FINDING",
  NO_SEVERITY_ASSIGNED: "NO_SEVERITY_ASSIGNED",
  NO_REMEDIATION_RECOMMENDED: "NO_REMEDIATION_RECOMMENDED",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS = deepFreeze({
  DOCS_ONLY_BLOCKER_STATUS: "DOCS_ONLY_BLOCKER_STATUS",
  REGISTRY_SCAFFOLD_ONLY: "REGISTRY_SCAFFOLD_ONLY",
  FUTURE_ROUTE_CANDIDATE_ONLY: "FUTURE_ROUTE_CANDIDATE_ONLY",
  NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_NO_TOKEN_NO_URL_ONLY:
    "NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_NO_TOKEN_NO_URL_ONLY",
  RUNTIME_READINESS_BLOCKED: "RUNTIME_READINESS_BLOCKED",
  RUNTIME_GATE_INVENTORY_DEFERRED: "RUNTIME_GATE_INVENTORY_DEFERRED",
  NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT:
    "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  BLOCKED_BY_PROVIDER_STATUS: "BLOCKED_BY_PROVIDER_STATUS",
  BLOCKED_BY_DATA_ROUTING_MAP: "BLOCKED_BY_DATA_ROUTING_MAP",
  BLOCKED_BY_PROVIDER_RETENTION_DELETION:
    "BLOCKED_BY_PROVIDER_RETENTION_DELETION",
  BLOCKED_BY_PROVIDER_AUDITABILITY: "BLOCKED_BY_PROVIDER_AUDITABILITY",
  BLOCKED_BY_TOKEN_URL_SECRET_HANDLING:
    "BLOCKED_BY_TOKEN_URL_SECRET_HANDLING",
  BLOCKED_BY_AUDIT_ACCESS_LOG: "BLOCKED_BY_AUDIT_ACCESS_LOG",
  BLOCKED_BY_RETENTION_DELETION: "BLOCKED_BY_RETENTION_DELETION",
  BLOCKED_BY_RBAC_MODEL: "BLOCKED_BY_RBAC_MODEL",
  BLOCKED_BY_ADMIN_SUPPORT_MODEL: "BLOCKED_BY_ADMIN_SUPPORT_MODEL",
  BLOCKED_BY_RAW_MATERIAL_ROUTING: "BLOCKED_BY_RAW_MATERIAL_ROUTING",
  BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL:
    "BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const THIRD_PARTY_ROUTING_RUNTIME_READINESS_EVIDENCE_POSTURE = deepFreeze({
  DOCS_ONLY_BLOCKER_STATUS: "DOCS_ONLY_BLOCKER_STATUS",
  REGISTRY_SCAFFOLD_EVIDENCE: "REGISTRY_SCAFFOLD_EVIDENCE",
  TESTED_ALIGNMENT_EVIDENCE: "TESTED_ALIGNMENT_EVIDENCE",
  CI_TESTED_SCENARIO_EVIDENCE: "CI_TESTED_SCENARIO_EVIDENCE",
  FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED:
    "FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const ALLOWED_FUTURE_ROUTE_EVENT_CONTENT = deepFreeze([
  "subject reference",
  "role/permission concept",
  "tenant/case scope",
  "material class",
  "route/surface",
  "decision status",
  "timestamp category",
  "reason code",
  "provider category reference",
  "blocker/gap reference",
  "explicit no-raw/no-private/no-source-locator/no-token/no-URL marker",
]);

const PROHIBITED_ROUTE_EVENT_LOG_CONTENT = deepFreeze([
  "raw source text",
  "private facts",
  "source locators",
  "filenames/private paths",
  "page references",
  "URLs",
  "tokens",
  "secrets",
  "provider payloads",
  "prompts",
  "responses",
  "PDF/image/metadata content",
  "sensitive personal details",
  "legal/clinical/evidentiary/case-truth conclusions",
  "product-candidate claims",
  "external-use claims",
]);

const BASE_IMPLEMENTATION_GAPS = deepFreeze([
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_THIRD_PARTY_MODEL_API_ROUTING_AUTHORIZATION,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_PROVIDER_INTEGRATION,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_PROVIDER_REGISTRY,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_PROVIDER_STATUS_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_DATA_ROUTING_MAP,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_PROVIDER_RETENTION_DELETION_POSTURE,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_PROVIDER_AUDITABILITY,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_EVENT_TAXONOMY_RUNTIME_CODE,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS.NOT_LOG_SCHEMA,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS.NOT_LOG_STORAGE,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_RETENTION_DELETION_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_RBAC_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_ACCESS_CONTROL_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_ADMIN_SUPPORT_MODEL,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_RUNTIME_GATE_IMPLEMENTATION,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_RUNTIME_ENFORCEMENT,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_VALIDATOR_DISPATCH,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_RUNTIME_REGISTRY_LOOKUP,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_SECURITY_FINDING,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NO_SEVERITY_ASSIGNED,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NO_REMEDIATION_RECOMMENDED,
]);

const BASE_DECISION_STATUSES = deepFreeze([
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS
    .DOCS_ONLY_BLOCKER_STATUS,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS
    .REGISTRY_SCAFFOLD_ONLY,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS
    .FUTURE_ROUTE_CANDIDATE_ONLY,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS
    .NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_NO_TOKEN_NO_URL_ONLY,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS
    .RUNTIME_READINESS_BLOCKED,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS
    .RUNTIME_GATE_INVENTORY_DEFERRED,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS
    .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
]);

const BASE_NON_AUTHORIZATIONS = deepFreeze({
  authorized: false,
  route_authorized: false,
  third_party_routing_implemented: false,
  provider_integration_created: false,
  provider_registry_created: false,
  provider_status_implemented: false,
  data_routing_map_created: false,
  provider_auditability_implemented: false,
  token_url_secret_handling_implemented: false,
  audit_access_log_implemented: false,
  log_schema_created: false,
  log_storage_created: false,
  rbac_implemented: false,
  access_control_implemented: false,
  role_permission_model_created: false,
  admin_support_access_authorized: false,
  runtime_gate_implemented: false,
  validator_dispatch_created: false,
  runtime_registry_lookup_created: false,
  security_finding_created: false,
  vulnerability_finding_created: false,
  severity_assigned: false,
  remediation_recommended: false,
  remediation_implemented: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_authorized: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
});

const THIRD_PARTY_ROUTING_RUNTIME_READINESS_NON_OVERCLAIM_RULES = deepFreeze([
  "THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_REGISTRY does not mean THIRD_PARTY_ROUTING_IMPLEMENTATION",
  "THIRD_PARTY_ROUTING_BLOCKER_ROW does not mean ROUTE_AUTHORIZATION",
  "ROUTE_FAMILY_CANDIDATE does not mean PROVIDER_INTEGRATION",
  "PROVIDER_IDENTITY_STATUS_ROW does not mean PROVIDER_REGISTRY",
  "PROVIDER_IDENTITY_STATUS_ROW does not mean PROVIDER_STATUS_IMPLEMENTATION",
  "DATA_ROUTING_MAP_ROW does not mean DATA_ROUTING_MAP_EXISTS",
  "PROVIDER_AUDITABILITY_ROW does not mean AUDIT_ACCESS_LOG_IMPLEMENTATION",
  "TOKEN_URL_SECRET_ROW does not mean TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
  "RAW_PRIVATE_ROUTE_ATTEMPT_ROW does not mean RAW_PRIVATE_SOURCE_INSPECTION",
  "PDF_IMAGE_METADATA_ROUTE_ATTEMPT_ROW does not mean METADATA_ACQUISITION",
  "GENERATED_EXPORT_ROUTE_ATTEMPT_ROW does not mean EXTERNAL_USE_AUTHORIZATION",
  "ADMIN_SUPPORT_ROUTE_APPROVAL_ROW does not mean ADMIN_SUPPORT_ACCESS_AUTHORIZED",
  "RUNTIME_GATE_PROVIDER_ROUTE_EVENT does not mean RUNTIME_GATE_IMPLEMENTATION",
  "FUTURE_IMPLEMENTATION_EVIDENCE does not mean CURRENT_IMPLEMENTATION_EVIDENCE",
  "REQUIRED_TEST_EVIDENCE does not mean CURRENT_CLOSURE",
  "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
  "BLOCKER_ROW does not mean SECURITY_FINDING",
  "BLOCKER_ROW does not mean SEVERITY_ASSIGNED",
  "BLOCKER_ROW does not mean REMEDIATION_RECOMMENDED",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
  "HUMAN_REVIEW_GATE does not mean SYSTEM_APPROVAL",
]);

const THIRD_PARTY_ROUTING_RUNTIME_READINESS_REQUIRED_PREREQUISITES =
  deepFreeze([
    "third-party provider status registry",
    "provider identity/status contract",
    "provider data-routing map",
    "provider retention/deletion posture",
    "provider auditability posture",
    "provider token/URL/secret handling policy",
    "no-token/no-URL/no-secret route policy",
    "audit/access-log implementation plan",
    "event taxonomy runtime code",
    "no-content route/audit event policy",
    "log schema",
    "log storage policy",
    "role/permission model",
    "RBAC/access-control implementation plan",
    "admin/support model",
    "admin/support access-control model",
    "retention/deletion/purge/erasure policy",
    "encryption/key-management policy",
    "raw-material routing denial policy",
    "runtime gate implementation plan",
    "validator dispatch plan",
    "registry/lookup plan",
    "global access-control model",
    "global authorization model",
    "object/function/property authorization review",
    "tenant isolation tests",
    "wrong-case tests",
    "wrong-object tests",
    "allow/deny tests",
    "no-raw/no-private/no-source-locator/no-token/no-URL policy",
    "local-log non-CI wording",
    "CI-log non-release wording",
    "external-use non-authorization wording",
    "non-proof/non-route-readiness wording",
    "human/professional review gate",
  ]);

const requiredTestEvidence = deepFreeze([
  "exact TPR-RUNTIME-BLOCKER row coverage",
  "cross-registry reference validation",
  "unknown row fail-closed behavior",
  "no positive authorization helper output",
  "local/CI/release evidence separation",
  "L20/L22/L23 future storage boundary checks",
]);

const requiredImplementationEvidence = deepFreeze([
  "future provider status registry implementation evidence",
  "future data-routing map implementation evidence",
  "future audit/access-log implementation evidence",
  "future RBAC/access-control implementation evidence",
  "future runtime gate implementation evidence",
  "future human/professional review gate evidence",
]);

const highRiskMaterials = deepFreeze(
  Object.values(HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
    (entry) => entry.material_class,
  ),
);

const commonMaterialClasses = deepFreeze([
  materialClass("SYNTHETIC_NO_RAW_MATERIAL"),
  materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL"),
  materialClass("AUDIT_ACCESS_EVENT_RECORD"),
]);

const commonStorageLocations = deepFreeze([
  locationId("L03_REPO_TRACKED_DOCS"),
  locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"),
  locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"),
  locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE"),
]);

const commonRolePermissionGaps = deepFreeze([
  rolePermissionGapId("RP_SG_016_THIRD_PARTY_ROUTING_PERMISSION_GAP"),
  rolePermissionGapId("RP_SG_018_RUNTIME_GATE_DEPENDENCY_GAP"),
  rolePermissionGapId("RP_SG_019_GLOBAL_AUTHORIZATION_MODEL_DEPENDENCY_GAP"),
]);

const commonAdminSupportGaps = deepFreeze([
  adminGapId("ADMIN-SUPPORT-GAP-008_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_DENIED"),
  adminGapId("ADMIN-SUPPORT-GAP-012_ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_DENIED"),
]);

const commonRmrControls = deepFreeze([
  rmrControlId("RMR_CS_006_RAW_PRIVATE_SOURCE_MATERIAL"),
  rmrControlId("RMR_CS_009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL"),
]);

const commonAalEvents = deepFreeze([
  aalEventId("AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL"),
  aalEventId("AAL-EVENT-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE"),
]);

const commonLifecycleFamilies = deepFreeze([
  lifecycleFamily("RETENTION"),
  lifecycleFamily("DELETION"),
  lifecycleFamily("PROVIDER_DELETION"),
  lifecycleFamily("RECIPIENT_PURGE"),
]);

const commonGacRows = deepFreeze([
  gacRowId("GAC-TM-009_ROLE_PERMISSION_MODEL_GAP"),
  gacRowId("GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP"),
]);

const commonRuntimeGates = deepFreeze([
  runtimeGateId("RBAC_GC_011_THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE"),
  runtimeGateId("RBAC_GC_016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE"),
]);

const commonAalRuntimeBlockers = deepFreeze([
  aalRuntimeBlockerId("AAL-RUNTIME-BLOCKER-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT"),
  aalRuntimeBlockerId("AAL-RUNTIME-BLOCKER-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE_EVENT"),
]);

function makeRow({
  id,
  sourceBlockerId,
  family,
  surface,
  routeFamily,
  providerSurface,
  primaryBlocker,
  secondaryBlockers,
  tprGapIds,
  materialClasses,
  storageLocationIds,
  aalRuntimeBlockerIds,
  rmrControlIds,
  aalEventIds,
  rolePermissionGapIds,
  adminSupportGapIds,
  lifecycleFamilies,
  gacRowIds,
  runtimeGateCandidateIds,
  notes,
}) {
  return {
    id,
    source_blocker_id: sourceBlockerId,
    family,
    third_party_routing_surface: surface,
    route_family_candidate: routeFamily,
    provider_surface_candidate: providerSurface,
    allowed_future_route_event_content: ALLOWED_FUTURE_ROUTE_EVENT_CONTENT,
    prohibited_route_event_log_content: PROHIBITED_ROUTE_EVENT_LOG_CONTENT,
    no_raw_no_private_no_source_locator_no_token_no_url_requirement:
      "NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_NO_TOKEN_NO_URL_ONLY",
    primary_blocker: primaryBlocker,
    secondary_blockers: secondaryBlockers,
    implementation_gap: BASE_IMPLEMENTATION_GAPS,
    required_prerequisites:
      THIRD_PARTY_ROUTING_RUNTIME_READINESS_REQUIRED_PREREQUISITES,
    required_implementation_evidence: requiredImplementationEvidence,
    required_test_evidence: requiredTestEvidence,
    overclaim_risk:
      "Blocker/status registry rows are proof scaffolds only and cannot be promoted to route authorization, provider integration, runtime readiness, finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off.",
    current_runtime_readiness_status: BASE_DECISION_STATUSES,
    current_authorization_status:
      THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS
        .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
    future_boundary_posture:
      THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS
        .FUTURE_ROUTE_CANDIDATE_ONLY,
    non_authorized_until_closure:
      "Not authorized until provider status, data-routing, audit/access-log, lifecycle, RBAC/access-control, admin/support, runtime gate, validator dispatch, registry lookup, tests, and human/professional review prerequisites are separately implemented and reviewed.",
    related_material_classes: materialClasses,
    related_storage_location_ids: storageLocationIds,
    related_third_party_status_gap_ids: tprGapIds,
    related_audit_access_log_runtime_blocker_ids: aalRuntimeBlockerIds,
    related_role_permission_gap_ids: rolePermissionGapIds,
    related_admin_support_gap_ids: adminSupportGapIds,
    related_raw_material_routing_control_ids: rmrControlIds,
    related_aal_event_candidate_ids: aalEventIds,
    related_lifecycle_families: lifecycleFamilies,
    related_global_access_control_row_ids: gacRowIds,
    related_runtime_gate_candidate_ids: runtimeGateCandidateIds,
    related_rbac_boundary_status: routeCaseCapabilityOverclaimRegistry,
    evidence_posture:
      THIRD_PARTY_ROUTING_RUNTIME_READINESS_EVIDENCE_POSTURE
        .REGISTRY_SCAFFOLD_EVIDENCE,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    notes,
  };
}

const THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY =
  deepFreeze({
    "TPR-RUNTIME-BLOCKER-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST": makeRow({
      id: "TPR-RUNTIME-BLOCKER-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-001",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .THIRD_PARTY_MODEL_API_ROUTE_REQUEST_BLOCKER,
      surface: "third-party model/API route request",
      routeFamily: "third-party model/API provider route candidate",
      providerSurface: "provider route request status",
      primaryBlocker: "provider route authorization absent",
      secondaryBlockers: [
        "provider status absent",
        "data-routing map absent",
        "runtime gate absent",
      ],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS")],
      materialClasses: [
        materialClass("THIRD_PARTY_MODEL_API_ROUTED_MATERIAL"),
        materialClass("PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL"),
        materialClass("TOKEN_URL_SECRET_MATERIAL"),
      ],
      storageLocationIds: commonStorageLocations,
      aalRuntimeBlockerIds: commonAalRuntimeBlockers,
      rmrControlIds: commonRmrControls,
      aalEventIds: commonAalEvents,
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Captures route-request readiness blockers only; it does not authorize third-party routing.",
    }),
    "TPR-RUNTIME-BLOCKER-002_THIRD_PARTY_ROUTE_DENIAL_EVENT": makeRow({
      id: "TPR-RUNTIME-BLOCKER-002_THIRD_PARTY_ROUTE_DENIAL_EVENT",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-002",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .THIRD_PARTY_ROUTE_DENIAL_EVENT_BLOCKER,
      surface: "third-party route denial event",
      routeFamily: "route denial candidate event",
      providerSurface: "provider-denied route status",
      primaryBlocker: "audit/access-log implementation absent",
      secondaryBlockers: ["event taxonomy runtime code absent", "log storage absent"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS")],
      materialClasses: commonMaterialClasses,
      storageLocationIds: [
        locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"),
        locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"),
      ],
      aalRuntimeBlockerIds: [
        aalRuntimeBlockerId("AAL-RUNTIME-BLOCKER-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT"),
      ],
      rmrControlIds: [rmrControlId("RMR_CS_009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL")],
      aalEventIds: [aalEventId("AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL")],
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Denial event candidate remains no-content and cannot create audit/access-log implementation.",
    }),
    "TPR-RUNTIME-BLOCKER-003_THIRD_PARTY_ROUTE_APPROVAL_CANDIDATE": makeRow({
      id: "TPR-RUNTIME-BLOCKER-003_THIRD_PARTY_ROUTE_APPROVAL_CANDIDATE",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-003",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .THIRD_PARTY_ROUTE_APPROVAL_CANDIDATE_BLOCKER,
      surface: "third-party route approval candidate",
      routeFamily: "approval candidate only",
      providerSurface: "provider approval candidate status",
      primaryBlocker: "route approval authorization absent",
      secondaryBlockers: ["RBAC model absent", "global authorization model absent"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS")],
      materialClasses: [materialClass("THIRD_PARTY_MODEL_API_ROUTED_MATERIAL")],
      storageLocationIds: commonStorageLocations,
      aalRuntimeBlockerIds: commonAalRuntimeBlockers,
      rmrControlIds: commonRmrControls,
      aalEventIds: commonAalEvents,
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Approval candidate row is explicitly not provider route approval.",
    }),
    "TPR-RUNTIME-BLOCKER-004_PROVIDER_IDENTITY_STATUS_RECORD": makeRow({
      id: "TPR-RUNTIME-BLOCKER-004_PROVIDER_IDENTITY_STATUS_RECORD",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-004",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .PROVIDER_IDENTITY_STATUS_RECORD_BLOCKER,
      surface: "provider identity/status record",
      routeFamily: "provider identity/status candidate",
      providerSurface: "provider identity and status",
      primaryBlocker: "provider registry absent",
      secondaryBlockers: ["provider status implementation absent"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-002_PROVIDER_IDENTITY_STATUS_GAP")],
      materialClasses: [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
      storageLocationIds: [locationId("L03_REPO_TRACKED_DOCS"), locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE")],
      aalRuntimeBlockerIds: commonAalRuntimeBlockers,
      rmrControlIds: [rmrControlId("RMR_CS_003_NO_RAW_METADATA_MANIFEST_MATERIAL")],
      aalEventIds: commonAalEvents,
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Provider identity/status row does not create a provider registry or status runtime.",
    }),
    "TPR-RUNTIME-BLOCKER-005_PROVIDER_DATA_ROUTING_MAP": makeRow({
      id: "TPR-RUNTIME-BLOCKER-005_PROVIDER_DATA_ROUTING_MAP",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-005",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .PROVIDER_DATA_ROUTING_MAP_BLOCKER,
      surface: "provider data-routing map",
      routeFamily: "data-routing map candidate",
      providerSurface: "provider data route inventory",
      primaryBlocker: "data-routing map absent",
      secondaryBlockers: ["provider status absent", "token/URL/secret handling absent"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-003_PROVIDER_DATA_ROUTING_MAP_GAP")],
      materialClasses: [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
      storageLocationIds: [locationId("L03_REPO_TRACKED_DOCS"), locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"), locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE")],
      aalRuntimeBlockerIds: commonAalRuntimeBlockers,
      rmrControlIds: [rmrControlId("RMR_CS_003_NO_RAW_METADATA_MANIFEST_MATERIAL")],
      aalEventIds: commonAalEvents,
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Data-routing map blocker row does not mean a data-routing map exists.",
    }),
    "TPR-RUNTIME-BLOCKER-006_PROVIDER_RETENTION_DELETION_POSTURE": makeRow({
      id: "TPR-RUNTIME-BLOCKER-006_PROVIDER_RETENTION_DELETION_POSTURE",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-006",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .PROVIDER_RETENTION_DELETION_POSTURE_BLOCKER,
      surface: "provider retention/deletion posture",
      routeFamily: "provider lifecycle posture candidate",
      providerSurface: "provider retention deletion posture",
      primaryBlocker: "provider retention/deletion posture absent",
      secondaryBlockers: ["provider deletion verification absent"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-004_PROVIDER_RETENTION_DELETION_POSTURE_GAP")],
      materialClasses: [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
      storageLocationIds: [locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"), locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE")],
      aalRuntimeBlockerIds: commonAalRuntimeBlockers,
      rmrControlIds: [rmrControlId("RMR_CS_003_NO_RAW_METADATA_MANIFEST_MATERIAL")],
      aalEventIds: commonAalEvents,
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: [lifecycleFamily("RETENTION"), lifecycleFamily("DELETION"), lifecycleFamily("PROVIDER_DELETION"), lifecycleFamily("RECIPIENT_PURGE")],
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Provider lifecycle posture row is not provider deletion verification.",
    }),
    "TPR-RUNTIME-BLOCKER-007_PROVIDER_AUDITABILITY_LOGGING_POSTURE": makeRow({
      id: "TPR-RUNTIME-BLOCKER-007_PROVIDER_AUDITABILITY_LOGGING_POSTURE",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-007",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .PROVIDER_AUDITABILITY_LOGGING_POSTURE_BLOCKER,
      surface: "provider auditability/logging posture",
      routeFamily: "provider auditability posture candidate",
      providerSurface: "provider auditability posture",
      primaryBlocker: "provider auditability posture absent",
      secondaryBlockers: ["audit/access-log implementation absent", "log storage absent"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-005_PROVIDER_AUDITABILITY_LOGGING_GAP")],
      materialClasses: [materialClass("AUDIT_ACCESS_EVENT_RECORD")],
      storageLocationIds: [locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"), locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE")],
      aalRuntimeBlockerIds: commonAalRuntimeBlockers,
      rmrControlIds: [rmrControlId("RMR_CS_003_NO_RAW_METADATA_MANIFEST_MATERIAL")],
      aalEventIds: commonAalEvents,
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Provider auditability posture row does not create audit/access-log implementation.",
    }),
    "TPR-RUNTIME-BLOCKER-008_PROVIDER_TOKEN_URL_SECRET_HANDLING": makeRow({
      id: "TPR-RUNTIME-BLOCKER-008_PROVIDER_TOKEN_URL_SECRET_HANDLING",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-008",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .PROVIDER_TOKEN_URL_SECRET_HANDLING_BLOCKER,
      surface: "provider token/URL/secret handling",
      routeFamily: "token URL secret policy candidate",
      providerSurface: "provider token URL secret handling",
      primaryBlocker: "token/URL/secret handling policy absent",
      secondaryBlockers: ["no-token/no-URL/no-secret route policy absent"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-006_PROVIDER_TOKEN_URL_SECRET_HANDLING_GAP")],
      materialClasses: [materialClass("TOKEN_URL_SECRET_MATERIAL")],
      storageLocationIds: [locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE")],
      aalRuntimeBlockerIds: commonAalRuntimeBlockers,
      rmrControlIds: [rmrControlId("RMR_CS_009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL")],
      aalEventIds: commonAalEvents,
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Token/URL/secret row is only a blocker status and never handles secrets.",
    }),
    "TPR-RUNTIME-BLOCKER-009_RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_ATTEMPT": makeRow({
      id: "TPR-RUNTIME-BLOCKER-009_RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_ATTEMPT",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-009",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_ATTEMPT_BLOCKER,
      surface: "raw/private/source material route attempt",
      routeFamily: "prohibited raw/private/source route attempt",
      providerSurface: "provider route denied",
      primaryBlocker: "raw/private/source route denied",
      secondaryBlockers: ["raw-material routing denial policy required"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-007_RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP")],
      materialClasses: [materialClass("RAW_PRIVATE_SOURCE_MATERIAL"), materialClass("SOURCE_PACKAGE_MATERIAL")],
      storageLocationIds: [locationId("L11_LOCAL_UNTRACKED_FILES"), locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE")],
      aalRuntimeBlockerIds: commonAalRuntimeBlockers,
      rmrControlIds: [rmrControlId("RMR_CS_006_RAW_PRIVATE_SOURCE_MATERIAL"), rmrControlId("RMR_CS_007_SOURCE_PACKAGE_MATERIAL")],
      aalEventIds: commonAalEvents,
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Raw/private/source route attempt remains denied and does not inspect source material.",
    }),
    "TPR-RUNTIME-BLOCKER-010_PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT": makeRow({
      id: "TPR-RUNTIME-BLOCKER-010_PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-010",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_BLOCKER,
      surface: "PDF/image/screenshot/metadata route attempt",
      routeFamily: "prohibited PDF image screenshot metadata route attempt",
      providerSurface: "provider route denied",
      primaryBlocker: "PDF/image/screenshot/metadata route denied",
      secondaryBlockers: ["metadata acquisition not authorized"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-008_PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP")],
      materialClasses: [materialClass("PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL")],
      storageLocationIds: [locationId("L11_LOCAL_UNTRACKED_FILES"), locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE")],
      aalRuntimeBlockerIds: commonAalRuntimeBlockers,
      rmrControlIds: [rmrControlId("RMR_CS_008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL")],
      aalEventIds: commonAalEvents,
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "PDF/image/screenshot/metadata route attempt remains denied and does not acquire metadata.",
    }),
    "TPR-RUNTIME-BLOCKER-011_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT": makeRow({
      id: "TPR-RUNTIME-BLOCKER-011_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-011",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_BLOCKER,
      surface: "generated/export artifact route attempt",
      routeFamily: "generated export artifact route candidate",
      providerSurface: "provider route candidate",
      primaryBlocker: "external-use authorization absent",
      secondaryBlockers: ["product-candidate selection absent", "release approval absent"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-009_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP")],
      materialClasses: [materialClass("GENERATED_ARTIFACT_OR_EXPORT_MATERIAL")],
      storageLocationIds: [locationId("L12_LOCAL_GENERATED_ARTIFACTS"), locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"), locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE")],
      aalRuntimeBlockerIds: commonAalRuntimeBlockers,
      rmrControlIds: [rmrControlId("RMR_CS_004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL")],
      aalEventIds: commonAalEvents,
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Generated/export artifact route attempt does not authorize external use.",
    }),
    "TPR-RUNTIME-BLOCKER-012_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_ATTEMPT": makeRow({
      id: "TPR-RUNTIME-BLOCKER-012_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_ATTEMPT",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-012",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_ATTEMPT_BLOCKER,
      surface: "admin/support third-party route approval attempt",
      routeFamily: "admin/support approval candidate",
      providerSurface: "provider route approval candidate",
      primaryBlocker: "admin/support access authorization absent",
      secondaryBlockers: ["admin/support model absent", "RBAC model absent"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-010_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP")],
      materialClasses: [materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL")],
      storageLocationIds: commonStorageLocations,
      aalRuntimeBlockerIds: [
        aalRuntimeBlockerId("AAL-RUNTIME-BLOCKER-011_ADMIN_SUPPORT_ACCESS_ATTEMPT_EVENT"),
        aalRuntimeBlockerId("AAL-RUNTIME-BLOCKER-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT"),
      ],
      rmrControlIds: commonRmrControls,
      aalEventIds: [aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT"), aalEventId("AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL")],
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: [adminGapId("ADMIN-SUPPORT-GAP-008_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_DENIED")],
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Admin/support route approval attempt does not authorize admin/support access or provider routing.",
    }),
    "TPR-RUNTIME-BLOCKER-013_WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_ATTEMPT": makeRow({
      id: "TPR-RUNTIME-BLOCKER-013_WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_ATTEMPT",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-013",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_ATTEMPT_BLOCKER,
      surface: "workflow/agent/tool provider route attempt",
      routeFamily: "workflow tool provider route candidate",
      providerSurface: "provider tool route candidate",
      primaryBlocker: "workflow gate and provider routing authorization absent",
      secondaryBlockers: ["validator dispatch absent", "runtime registry lookup absent"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-011_WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_GAP")],
      materialClasses: [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
      storageLocationIds: commonStorageLocations,
      aalRuntimeBlockerIds: commonAalRuntimeBlockers,
      rmrControlIds: commonRmrControls,
      aalEventIds: commonAalEvents,
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Workflow/agent/tool route attempt is blocked; no provider route is executed.",
    }),
    "TPR-RUNTIME-BLOCKER-014_RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_EVENT": makeRow({
      id: "TPR-RUNTIME-BLOCKER-014_RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_EVENT",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-014",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_EVENT_BLOCKER,
      surface: "runtime/schema/workflow gate provider route event",
      routeFamily: "runtime gate candidate event",
      providerSurface: "provider route gate event",
      primaryBlocker: "runtime gate implementation absent",
      secondaryBlockers: ["schema enforcement absent", "workflow enforcement absent"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-012_RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_GAP")],
      materialClasses: [materialClass("AUDIT_ACCESS_EVENT_RECORD")],
      storageLocationIds: [locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"), locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE")],
      aalRuntimeBlockerIds: [
        aalRuntimeBlockerId("AAL-RUNTIME-BLOCKER-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE_EVENT"),
      ],
      rmrControlIds: commonRmrControls,
      aalEventIds: [aalEventId("AAL-EVENT-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE")],
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: commonRuntimeGates,
      notes:
        "Runtime/schema/workflow gate route event is inventory only and not enforcement.",
    }),
    "TPR-RUNTIME-BLOCKER-015_HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY": makeRow({
      id: "TPR-RUNTIME-BLOCKER-015_HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY",
      sourceBlockerId: "TPR-RUNTIME-BLOCKER-015",
      family:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES
          .HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_BLOCKER,
      surface: "human/professional review provider route dependency",
      routeFamily: "human review dependency",
      providerSurface: "provider route review dependency",
      primaryBlocker: "human/professional review gate remains required",
      secondaryBlockers: ["human review is not system approval"],
      tprGapIds: [tprGapId("TPR-STATUS-GAP-013_HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_GAP")],
      materialClasses: [materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL")],
      storageLocationIds: [locationId("L03_REPO_TRACKED_DOCS"), locationId("L24_PR_COMMENTS_ISSUES_REVIEW_METADATA")],
      aalRuntimeBlockerIds: [
        aalRuntimeBlockerId("AAL-RUNTIME-BLOCKER-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT"),
      ],
      rmrControlIds: [rmrControlId("RMR_CS_010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL")],
      aalEventIds: [aalEventId("AAL-EVENT-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS")],
      rolePermissionGapIds: commonRolePermissionGaps,
      adminSupportGapIds: commonAdminSupportGaps,
      lifecycleFamilies: commonLifecycleFamilies,
      gacRowIds: commonGacRows,
      runtimeGateCandidateIds: [runtimeGateId("RBAC_GC_017_HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE")],
      notes:
        "Human/professional review remains a separate release gate and does not approve provider routing.",
    }),
  });

function listThirdPartyRoutingRuntimeReadinessBlockerFamilies() {
  return cloneAndFreeze(THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES);
}

function listThirdPartyRoutingRuntimeReadinessBlockerRows() {
  return cloneAndFreeze(
    Object.values(THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY),
  );
}

function getThirdPartyRoutingRuntimeReadinessBlockerRow(id) {
  const row = THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY[id];
  return row ? cloneAndFreeze(row) : undefined;
}

function hasThirdPartyRoutingRuntimeReadinessBlockerRow(id) {
  return Boolean(THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY[id]);
}

function classifyThirdPartyRoutingRuntimeReadinessBlockerRow(id) {
  const row = THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY[id];

  if (!row) {
    return cloneAndFreeze({
      id,
      status:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS
          .UNKNOWN_NOT_EVIDENCED,
      evidence_posture:
        THIRD_PARTY_ROUTING_RUNTIME_READINESS_EVIDENCE_POSTURE
          .UNKNOWN_NOT_EVIDENCED,
      authorized: false,
      route_authorized: false,
      third_party_routing_implemented: false,
      provider_integration_created: false,
      provider_registry_created: false,
      provider_status_implemented: false,
      data_routing_map_created: false,
      provider_auditability_implemented: false,
      token_url_secret_handling_implemented: false,
      security_finding_created: false,
    });
  }

  return cloneAndFreeze({
    id: row.id,
    family: row.family,
    status: row.current_runtime_readiness_status,
    authorization_status: row.current_authorization_status,
    evidence_posture: row.evidence_posture,
    ...BASE_NON_AUTHORIZATIONS,
  });
}

function listThirdPartyRoutingRuntimeReadinessNonOverclaimRules() {
  return cloneAndFreeze(THIRD_PARTY_ROUTING_RUNTIME_READINESS_NON_OVERCLAIM_RULES);
}

function getThirdPartyRoutingRuntimeReadinessRequiredPrerequisites() {
  return cloneAndFreeze(
    THIRD_PARTY_ROUTING_RUNTIME_READINESS_REQUIRED_PREREQUISITES,
  );
}

function getThirdPartyRoutingRuntimeReadinessNonAuthorizationStatus() {
  return cloneAndFreeze(BASE_NON_AUTHORIZATIONS);
}

function isThirdPartyRoutingImplemented() {
  return false;
}

function isThirdPartyRouteAuthorized() {
  return false;
}

function isProviderIntegrationCreated() {
  return false;
}

function isProviderRegistryCreated() {
  return false;
}

function isProviderStatusImplemented() {
  return false;
}

function isDataRoutingMapCreated() {
  return false;
}

function isProviderAuditabilityImplemented() {
  return false;
}

function isTokenUrlSecretHandlingImplemented() {
  return false;
}

function isSecurityFindingCreated() {
  return false;
}

module.exports = {
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_EVIDENCE_POSTURE,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_NON_OVERCLAIM_RULES,
  THIRD_PARTY_ROUTING_RUNTIME_READINESS_REQUIRED_PREREQUISITES,
  classifyThirdPartyRoutingRuntimeReadinessBlockerRow,
  getThirdPartyRoutingRuntimeReadinessBlockerRow,
  getThirdPartyRoutingRuntimeReadinessNonAuthorizationStatus,
  getThirdPartyRoutingRuntimeReadinessRequiredPrerequisites,
  hasThirdPartyRoutingRuntimeReadinessBlockerRow,
  isDataRoutingMapCreated,
  isProviderAuditabilityImplemented,
  isProviderIntegrationCreated,
  isProviderRegistryCreated,
  isProviderStatusImplemented,
  isSecurityFindingCreated,
  isThirdPartyRouteAuthorized,
  isThirdPartyRoutingImplemented,
  isTokenUrlSecretHandlingImplemented,
  listThirdPartyRoutingRuntimeReadinessBlockerFamilies,
  listThirdPartyRoutingRuntimeReadinessBlockerRows,
  listThirdPartyRoutingRuntimeReadinessNonOverclaimRules,
  storageDataLocationRegistry: DATA_LOCATION_REGISTRY,
  storageHighRiskMaterialClassesDenied: HIGH_RISK_MATERIAL_CLASSES_DENIED,
  storageMaterialClasses: MATERIAL_CLASSES,
};
