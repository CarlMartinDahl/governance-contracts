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
const {
  ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
} = require("./admin-support-runtime-readiness-status-gap-registry.js");

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
const adminGapId = (key) =>
  ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY[key].id;

const GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES = deepFreeze({
  AUTH_REQUEST_CONTEXT_PARTIAL: "AUTH_REQUEST_CONTEXT_PARTIAL",
  TENANT_ISOLATION_PARTIAL: "TENANT_ISOLATION_PARTIAL",
  CASE_CONTEXT_ACCESS_CONTROL_PARTIAL: "CASE_CONTEXT_ACCESS_CONTROL_PARTIAL",
  CAPABILITY_GATES_PARTIAL: "CAPABILITY_GATES_PARTIAL",
  ROUTE_LEVEL_AUTHORIZATION_PARTIAL: "ROUTE_LEVEL_AUTHORIZATION_PARTIAL",
  OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP:
    "OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP",
  FUNCTION_LEVEL_AUTHORIZATION_PARTIAL: "FUNCTION_LEVEL_AUTHORIZATION_PARTIAL",
  PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP:
    "PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP",
  ROLE_PERMISSION_MODEL_GAP: "ROLE_PERMISSION_MODEL_GAP",
  ADMIN_SUPPORT_ACCESS_PATHS_GAP: "ADMIN_SUPPORT_ACCESS_PATHS_GAP",
  EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL:
    "EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL",
  DATABASE_QUERY_SCOPING_PARTIAL: "DATABASE_QUERY_SCOPING_PARTIAL",
  SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL:
    "SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL",
  ALLOWED_DENIED_TEST_COVERAGE_PARTIAL:
    "ALLOWED_DENIED_TEST_COVERAGE_PARTIAL",
  CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL:
    "CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL",
  GLOBAL_AUTHORIZATION_MODEL_GAP: "GLOBAL_AUTHORIZATION_MODEL_GAP",
});

const GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS = deepFreeze({
  NOT_ACCESS_CONTROL_IMPLEMENTATION: "NOT_ACCESS_CONTROL_IMPLEMENTATION",
  NOT_RBAC_IMPLEMENTATION: "NOT_RBAC_IMPLEMENTATION",
  NOT_ADMIN_SUPPORT_ACCESS_CONTROL: "NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
  NOT_GLOBAL_AUTHORIZATION_MODEL: "NOT_GLOBAL_AUTHORIZATION_MODEL",
  NOT_RUNTIME_ENFORCEMENT: "NOT_RUNTIME_ENFORCEMENT",
  NOT_ROLE_PERMISSION_MODEL: "NOT_ROLE_PERMISSION_MODEL",
  NOT_ROLE_FIELDS: "NOT_ROLE_FIELDS",
  NOT_PERMISSION_FIELDS: "NOT_PERMISSION_FIELDS",
  NOT_ROLE_SCHEMA: "NOT_ROLE_SCHEMA",
  NOT_PERMISSION_SCHEMA: "NOT_PERMISSION_SCHEMA",
  NOT_ADMIN_SUPPORT_MODEL: "NOT_ADMIN_SUPPORT_MODEL",
  NOT_SECURITY_FINDING: "NOT_SECURITY_FINDING",
  NOT_VULNERABILITY_FINDING: "NOT_VULNERABILITY_FINDING",
  NO_SEVERITY_ASSIGNED: "NO_SEVERITY_ASSIGNED",
  NO_REMEDIATION_RECOMMENDED: "NO_REMEDIATION_RECOMMENDED",
  NO_REMEDIATION_IMPLEMENTED: "NO_REMEDIATION_IMPLEMENTED",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS = deepFreeze({
  DOCS_ONLY_INVENTORY_STATUS: "DOCS_ONLY_INVENTORY_STATUS",
  REGISTRY_SCAFFOLD_ONLY: "REGISTRY_SCAFFOLD_ONLY",
  PARTIAL_EVIDENCE_ONLY: "PARTIAL_EVIDENCE_ONLY",
  THREAT_MODEL_INVENTORY_ONLY: "THREAT_MODEL_INVENTORY_ONLY",
  NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT:
    "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  BLOCKED_BY_ROLE_PERMISSION_MODEL: "BLOCKED_BY_ROLE_PERMISSION_MODEL",
  BLOCKED_BY_ADMIN_SUPPORT_MODEL: "BLOCKED_BY_ADMIN_SUPPORT_MODEL",
  BLOCKED_BY_AUDIT_ACCESS_LOG: "BLOCKED_BY_AUDIT_ACCESS_LOG",
  BLOCKED_BY_RETENTION_DELETION: "BLOCKED_BY_RETENTION_DELETION",
  BLOCKED_BY_THIRD_PARTY_ROUTING: "BLOCKED_BY_THIRD_PARTY_ROUTING",
  BLOCKED_BY_RAW_MATERIAL_ROUTING: "BLOCKED_BY_RAW_MATERIAL_ROUTING",
  BLOCKED_BY_GLOBAL_AUTHORIZATION_MODEL:
    "BLOCKED_BY_GLOBAL_AUTHORIZATION_MODEL",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE = deepFreeze({
  DOCS_ONLY_STATUS_GAP: "DOCS_ONLY_STATUS_GAP",
  REGISTRY_SCAFFOLD_EVIDENCE: "REGISTRY_SCAFFOLD_EVIDENCE",
  TESTED_ALIGNMENT_EVIDENCE: "TESTED_ALIGNMENT_EVIDENCE",
  CI_TESTED_SCENARIO_EVIDENCE: "CI_TESTED_SCENARIO_EVIDENCE",
  PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE:
    "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const BASE_IMPLEMENTATION_STATUSES = deepFreeze([
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS
    .NOT_ACCESS_CONTROL_IMPLEMENTATION,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS.NOT_RBAC_IMPLEMENTATION,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS
    .NOT_ADMIN_SUPPORT_ACCESS_CONTROL,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS
    .NOT_GLOBAL_AUTHORIZATION_MODEL,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS.NOT_RUNTIME_ENFORCEMENT,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS
    .NOT_ROLE_PERMISSION_MODEL,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS.NOT_ROLE_FIELDS,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS.NOT_PERMISSION_FIELDS,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS.NOT_ROLE_SCHEMA,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS.NOT_PERMISSION_SCHEMA,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS.NOT_ADMIN_SUPPORT_MODEL,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS.NOT_SECURITY_FINDING,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS
    .NOT_VULNERABILITY_FINDING,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS.NO_SEVERITY_ASSIGNED,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS
    .NO_REMEDIATION_RECOMMENDED,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS
    .NO_REMEDIATION_IMPLEMENTED,
]);

const BASE_NON_AUTHORIZATIONS = deepFreeze({
  authorized: false,
  access_granted: false,
  access_control_enforced: false,
  rbac_implemented: false,
  global_authorization_model_created: false,
  security_finding_created: false,
  vulnerability_finding_created: false,
  severity_assigned: false,
  remediation_recommended: false,
  remediation_implemented: false,
  admin_support_runtime_access_authorized: false,
  admin_support_model_created: false,
  admin_support_routes_created: false,
  admin_support_auth_fields_created: false,
  admin_support_db_fields_created: false,
  log_viewer_rbac_created: false,
  audit_access_log_implemented: false,
  log_storage_created: false,
  retention_deletion_executed: false,
  provider_routing_authorized: false,
  raw_material_routing_implemented: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_authorized: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
  system_approval_created: false,
});

const GLOBAL_ACCESS_CONTROL_THREAT_MODEL_NON_OVERCLAIM_RULES = deepFreeze([
  "ACCESS_CONTROL_THREAT_MODEL_INVENTORY does not mean ACCESS_CONTROL_IMPLEMENTATION",
  "THREAT_MODEL_ROW does not mean SECURITY_FINDING",
  "THREAT_MODEL_ROW does not mean VULNERABILITY_FINDING",
  "THREAT_MODEL_ROW does not mean SEVERITY_ASSIGNED",
  "THREAT_MODEL_ROW does not mean REMEDIATION_RECOMMENDED",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean RBAC",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean FULL_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean ADMIN_SUPPORT_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean GLOBAL_AUTHORIZATION_MODEL",
  "TENANT_CASE_CAPABILITY_CHECKS do not mean ROLE_PERMISSION_MODEL",
  "PARTIAL_ROUTE_AUTHORIZATION does not mean GLOBAL_AUTHORIZATION",
  "OBJECT_LEVEL_GAP does not mean BOLA_IDOR_ANALYSIS_COMPLETE",
  "FUNCTION_LEVEL_PARTIAL does not mean FUNCTION_LEVEL_AUTHORIZATION_COMPLETE",
  "PROPERTY_LEVEL_GAP does not mean DATA_OVEREXPOSURE_ANALYSIS_COMPLETE",
  "ROLE_PERMISSION_MODEL_GAP does not mean ROLE_PERMISSION_MODEL_CREATED",
  "ADMIN_SUPPORT_ACCESS_PATHS_GAP does not mean ADMIN_SUPPORT_ACCESS_AUTHORIZED",
  "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
  "HUMAN_REVIEW_GATE does not mean SYSTEM_APPROVAL",
]);

const GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_PREREQUISITES = deepFreeze([
  "complete global access-control model",
  "role/permission model",
  "role fields",
  "permission fields",
  "role schema",
  "permission schema",
  "admin/support model",
  "admin/support access-control model",
  "admin/support bypass-prevention tests",
  "object-level authorization review",
  "function-level authorization review",
  "property-level data-overexposure review",
  "tenant isolation tests",
  "wrong-tenant tests",
  "wrong-case tests",
  "wrong-object tests",
  "wrong-function tests",
  "wrong-property tests",
  "allow/deny tests",
  "RBAC/access-control implementation plan",
  "audit/access-log model",
  "no-content access-control event policy",
  "log schema/storage policy",
  "retention/deletion/purge/erasure policy",
  "encryption/key-management policy",
  "third-party provider status registry",
  "third-party provider route denial tests",
  "raw-material routing denial policy",
  "no-raw/no-private/no-source-locator policy",
  "CI test plan",
  "external-use non-authorization wording",
  "non-proof/non-route-readiness wording",
  "human/professional review gate",
]);

const requiredFieldNames = deepFreeze([
  "id",
  "family",
  "surface",
  "source_boundary_or_dependency",
  "current_statuses",
  "partial_evidence_level",
  "primary_absent_capability",
  "implementation_gap",
  "required_prerequisites",
  "overclaim_risk",
  "current_authorization_status",
  "future_boundary_posture",
  "non_authorized_until_closure",
  "related_material_classes",
  "related_storage_location_ids",
  "related_admin_support_gap_ids",
  "related_third_party_status_gap_ids",
  "related_raw_material_routing_control_ids",
  "related_aal_event_candidate_ids",
  "related_lifecycle_families",
  "related_rbac_boundary_status",
  "evidence_posture",
  "non_authorizations",
  "notes",
]);

const allPrerequisites = GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_PREREQUISITES;
const highRiskMaterials = deepFreeze(
  Object.values(HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
    (entry) => entry.material_class,
  ),
);

function makeInventoryRow({
  id,
  family,
  surface,
  sourceBoundaryOrDependency,
  currentStatuses,
  partialEvidenceLevel,
  primaryAbsentCapability,
  implementationGap,
  overclaimRisk,
  currentAuthorizationStatus = "NOT_AUTHORIZED",
  futureBoundaryPosture,
  relatedMaterialClasses,
  relatedStorageLocationIds,
  relatedAdminSupportGapIds = [],
  relatedThirdPartyStatusGapIds = [],
  relatedRawMaterialRoutingControlIds = [],
  relatedAalEventCandidateIds = [],
  relatedLifecycleFamilies = [],
  relatedRbacBoundaryStatus,
  evidencePosture =
    GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE
      .REGISTRY_SCAFFOLD_EVIDENCE,
  requiredPrerequisites = allPrerequisites,
  notes,
}) {
  return deepFreeze({
    id,
    family,
    surface,
    source_boundary_or_dependency: sourceBoundaryOrDependency,
    current_statuses: currentStatuses,
    partial_evidence_level: partialEvidenceLevel,
    primary_absent_capability: primaryAbsentCapability,
    implementation_gap: implementationGap,
    implementation_statuses: BASE_IMPLEMENTATION_STATUSES,
    required_prerequisites: requiredPrerequisites,
    overclaim_risk: overclaimRisk,
    current_authorization_status: currentAuthorizationStatus,
    future_boundary_posture: futureBoundaryPosture,
    non_authorized_until_closure: true,
    related_material_classes: relatedMaterialClasses,
    related_storage_location_ids: relatedStorageLocationIds,
    related_admin_support_gap_ids: relatedAdminSupportGapIds,
    related_third_party_status_gap_ids: relatedThirdPartyStatusGapIds,
    related_raw_material_routing_control_ids: relatedRawMaterialRoutingControlIds,
    related_aal_event_candidate_ids: relatedAalEventCandidateIds,
    related_lifecycle_families: relatedLifecycleFamilies,
    related_rbac_boundary_status: relatedRbacBoundaryStatus,
    evidence_posture: evidencePosture,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    notes,
  });
}

const GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY = deepFreeze({
  "GAC-TM-001_AUTH_REQUEST_CONTEXT_PARTIAL": makeInventoryRow({
    id: "GAC-TM-001_AUTH_REQUEST_CONTEXT_PARTIAL",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .AUTH_REQUEST_CONTEXT_PARTIAL,
    surface: "auth request context",
    sourceBoundaryOrDependency: "DOCS_ONLY access-control inventory boundary",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.DOCS_ONLY_INVENTORY_STATUS,
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.PARTIAL_EVIDENCE_ONLY,
    ],
    partialEvidenceLevel: "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
    primaryAbsentCapability: "complete global access-control model",
    implementationGap: "request context evidence is not runtime enforcement",
    overclaimRisk: "partial auth context could be mistaken for global authorization",
    futureBoundaryPosture: "requires global model and allow/deny tests",
    relatedMaterialClasses: [materialClass("SYNTHETIC_NO_RAW_MATERIAL")],
    relatedStorageLocationIds: [
      locationId("L01_REPO_TRACKED_SOURCE_FILES"),
      locationId("L02_REPO_TRACKED_TEST_FILES"),
    ],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-006_REVIEW_ACCESS")],
    relatedRbacBoundaryStatus: "ACCESS_DENIED_BY_DEFAULT",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE
        .PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE,
    notes: "Auth request context is inventory evidence only.",
  }),
  "GAC-TM-002_TENANT_ISOLATION_PARTIAL": makeInventoryRow({
    id: "GAC-TM-002_TENANT_ISOLATION_PARTIAL",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .TENANT_ISOLATION_PARTIAL,
    surface: "tenant isolation",
    sourceBoundaryOrDependency: "tenant and wrong-tenant test boundary",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.PARTIAL_EVIDENCE_ONLY,
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS
        .BLOCKED_BY_GLOBAL_AUTHORIZATION_MODEL,
    ],
    partialEvidenceLevel: "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
    primaryAbsentCapability: "complete tenant isolation test matrix",
    implementationGap: "tenant checks do not create role or permission model",
    overclaimRisk: "tenant checks could be overclaimed as full access control",
    futureBoundaryPosture: "requires wrong-tenant and wrong-case tests",
    relatedMaterialClasses: [materialClass("SYNTHETIC_NO_RAW_MATERIAL")],
    relatedStorageLocationIds: [
      locationId("L02_REPO_TRACKED_TEST_FILES"),
      locationId("L03_REPO_TRACKED_DOCS"),
    ],
    relatedAdminSupportGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-010_ADMIN_SUPPORT_CROSS_TENANT_CASE_OVERRIDE_DENIED"),
    ],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-006_REVIEW_ACCESS")],
    relatedRbacBoundaryStatus: "ROUTE_CASE_CAPABILITY_OVERCLAIM_DENIED",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE
        .PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE,
    notes: "Tenant isolation remains partial and non-authorizing.",
  }),
  "GAC-TM-003_CASE_CONTEXT_ACCESS_CONTROL_PARTIAL": makeInventoryRow({
    id: "GAC-TM-003_CASE_CONTEXT_ACCESS_CONTROL_PARTIAL",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .CASE_CONTEXT_ACCESS_CONTROL_PARTIAL,
    surface: "case context access control",
    sourceBoundaryOrDependency: "case-context route and helper evidence",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.PARTIAL_EVIDENCE_ONLY,
    ],
    partialEvidenceLevel: "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
    primaryAbsentCapability: "object-level authorization review",
    implementationGap: "case context checks do not complete BOLA/IDOR review",
    overclaimRisk: "case checks could be overclaimed as object authorization",
    futureBoundaryPosture: "requires wrong-object and object-level tests",
    relatedMaterialClasses: [materialClass("SYNTHETIC_NO_RAW_MATERIAL")],
    relatedStorageLocationIds: [locationId("L02_REPO_TRACKED_TEST_FILES")],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-006_REVIEW_ACCESS")],
    relatedRbacBoundaryStatus: "ACCESS_DENIED_BY_DEFAULT",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE
        .PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE,
    notes: "Case context access-control evidence is partial only.",
  }),
  "GAC-TM-004_CAPABILITY_GATES_PARTIAL": makeInventoryRow({
    id: "GAC-TM-004_CAPABILITY_GATES_PARTIAL",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .CAPABILITY_GATES_PARTIAL,
    surface: "capability gates",
    sourceBoundaryOrDependency: "capability route gating evidence",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.PARTIAL_EVIDENCE_ONLY,
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS
        .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
    ],
    partialEvidenceLevel: "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
    primaryAbsentCapability: "role/permission model",
    implementationGap: "capability gates do not create RBAC",
    overclaimRisk: "capability evidence could be overclaimed as role grants",
    futureBoundaryPosture: "requires role fields and permission fields",
    relatedMaterialClasses: [materialClass("SYNTHETIC_NO_RAW_MATERIAL")],
    relatedStorageLocationIds: [locationId("L01_REPO_TRACKED_SOURCE_FILES")],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE")],
    relatedRbacBoundaryStatus: "ROUTE_CASE_CAPABILITY_OVERCLAIM_DENIED",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE
        .PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE,
    notes: "Capability gates remain partial and non-RBAC.",
  }),
  "GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL": makeInventoryRow({
    id: "GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .ROUTE_LEVEL_AUTHORIZATION_PARTIAL,
    surface: "route-level authorization",
    sourceBoundaryOrDependency: "route-level evidence and deny-by-default gaps",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.PARTIAL_EVIDENCE_ONLY,
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.BLOCKED_BY_RAW_MATERIAL_ROUTING,
    ],
    partialEvidenceLevel: "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
    primaryAbsentCapability: "global authorization model",
    implementationGap: "route authorization is not global authorization",
    overclaimRisk: "route checks could be overclaimed as global authorization",
    futureBoundaryPosture: "requires complete global access-control model",
    relatedMaterialClasses: [materialClass("SYNTHETIC_NO_RAW_MATERIAL")],
    relatedStorageLocationIds: [locationId("L01_REPO_TRACKED_SOURCE_FILES")],
    relatedRawMaterialRoutingControlIds: [
      rmrControlId("RMR_CS_006_RAW_PRIVATE_SOURCE_MATERIAL"),
    ],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-005_MATERIAL_ROUTING_DECISION")],
    relatedRbacBoundaryStatus: "ROUTE_CASE_CAPABILITY_OVERCLAIM_DENIED",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE
        .PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE,
    notes: "Route-level evidence remains non-global.",
  }),
  "GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP": makeInventoryRow({
    id: "GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP,
    surface: "object-level BOLA/IDOR analysis",
    sourceBoundaryOrDependency: "global object authorization analysis gap",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.THREAT_MODEL_INVENTORY_ONLY,
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS
        .BLOCKED_BY_GLOBAL_AUTHORIZATION_MODEL,
    ],
    partialEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
    primaryAbsentCapability: "object-level authorization review",
    implementationGap: "object-level BOLA/IDOR analysis is not evidenced",
    overclaimRisk: "inventory row could be mistaken for vulnerability finding",
    futureBoundaryPosture: "requires object-level review and wrong-object tests",
    relatedMaterialClasses: [
      materialClass("SYNTHETIC_NO_RAW_MATERIAL"),
      materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL"),
    ],
    relatedStorageLocationIds: [locationId("L03_REPO_TRACKED_DOCS")],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-006_REVIEW_ACCESS")],
    relatedRbacBoundaryStatus: "UNKNOWN_NOT_EVIDENCED",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
    notes: "No security finding or BOLA/IDOR completion is created.",
  }),
  "GAC-TM-007_FUNCTION_LEVEL_AUTHORIZATION_PARTIAL": makeInventoryRow({
    id: "GAC-TM-007_FUNCTION_LEVEL_AUTHORIZATION_PARTIAL",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .FUNCTION_LEVEL_AUTHORIZATION_PARTIAL,
    surface: "function-level authorization",
    sourceBoundaryOrDependency: "function route and capability evidence",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.PARTIAL_EVIDENCE_ONLY,
    ],
    partialEvidenceLevel: "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
    primaryAbsentCapability: "function-level authorization review",
    implementationGap: "function-level authorization remains incomplete",
    overclaimRisk: "partial function evidence could be overclaimed as complete",
    futureBoundaryPosture: "requires wrong-function tests",
    relatedMaterialClasses: [materialClass("SYNTHETIC_NO_RAW_MATERIAL")],
    relatedStorageLocationIds: [locationId("L01_REPO_TRACKED_SOURCE_FILES")],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE")],
    relatedRbacBoundaryStatus: "ROUTE_CASE_CAPABILITY_OVERCLAIM_DENIED",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE
        .PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE,
    notes: "Function-level authorization remains partial.",
  }),
  "GAC-TM-008_PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP": makeInventoryRow({
    id: "GAC-TM-008_PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP,
    surface: "property-level data overexposure",
    sourceBoundaryOrDependency: "global property-level analysis gap",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.THREAT_MODEL_INVENTORY_ONLY,
    ],
    partialEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
    primaryAbsentCapability: "property-level data-overexposure review",
    implementationGap: "property-level analysis is not complete",
    overclaimRisk: "property gap could be overclaimed as security finding",
    futureBoundaryPosture: "requires wrong-property tests",
    relatedMaterialClasses: [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
    relatedStorageLocationIds: [locationId("L04_REPO_TRACKED_SCHEMAS")],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-007_MANIFEST_VALIDATION")],
    relatedRbacBoundaryStatus: "UNKNOWN_NOT_EVIDENCED",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
    notes: "Data-overexposure analysis remains not evidenced.",
  }),
  "GAC-TM-009_ROLE_PERMISSION_MODEL_GAP": makeInventoryRow({
    id: "GAC-TM-009_ROLE_PERMISSION_MODEL_GAP",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .ROLE_PERMISSION_MODEL_GAP,
    surface: "role-permission model",
    sourceBoundaryOrDependency: "RBAC deny-by-default scaffold",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.BLOCKED_BY_ROLE_PERMISSION_MODEL,
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.REGISTRY_SCAFFOLD_ONLY,
    ],
    partialEvidenceLevel: "REGISTRY_SCAFFOLD_EVIDENCE",
    primaryAbsentCapability: "role/permission model",
    implementationGap: "role fields, permission fields, and schemas absent",
    overclaimRisk: "deny-by-default scaffold could be overclaimed as RBAC",
    futureBoundaryPosture: "requires role/permission model and schemas",
    relatedMaterialClasses: [materialClass("SYNTHETIC_NO_RAW_MATERIAL")],
    relatedStorageLocationIds: [locationId("L01_REPO_TRACKED_SOURCE_FILES")],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-006_REVIEW_ACCESS")],
    relatedRbacBoundaryStatus: "ACCESS_DENIED_BY_DEFAULT",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE
        .REGISTRY_SCAFFOLD_EVIDENCE,
    notes: "RBAC remains a deny-by-default scaffold only.",
  }),
  "GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP": makeInventoryRow({
    id: "GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .ADMIN_SUPPORT_ACCESS_PATHS_GAP,
    surface: "admin/support access paths",
    sourceBoundaryOrDependency: "admin/support runtime-readiness gaps",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.BLOCKED_BY_ADMIN_SUPPORT_MODEL,
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.REGISTRY_SCAFFOLD_ONLY,
    ],
    partialEvidenceLevel: "REGISTRY_SCAFFOLD_EVIDENCE",
    primaryAbsentCapability: "admin/support model",
    implementationGap: "admin/support model, routes, auth fields, and DB fields absent",
    overclaimRisk: "admin/support readiness could be overclaimed as access",
    futureBoundaryPosture: "requires admin/support access-control model",
    relatedMaterialClasses: [
      materialClass("RAW_PRIVATE_SOURCE_MATERIAL"),
      materialClass("SOURCE_PACKAGE_MATERIAL"),
      materialClass("PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL"),
    ],
    relatedStorageLocationIds: [
      locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"),
    ],
    relatedAdminSupportGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-001_ADMIN_SUPPORT_MODEL_ABSENT"),
      adminGapId("ADMIN-SUPPORT-GAP-007_ADMIN_SUPPORT_LOG_VIEWER_RBAC_ABSENT"),
    ],
    relatedAalEventCandidateIds: [
      aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT"),
      aalEventId("AAL-EVENT-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS"),
    ],
    relatedRbacBoundaryStatus: "ADMIN_SUPPORT_BYPASS_DENIED",
    notes: "Admin/support paths remain unresolved and not authorized.",
  }),
  "GAC-TM-011_EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL": makeInventoryRow({
    id: "GAC-TM-011_EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL,
    surface: "export artifact download",
    sourceBoundaryOrDependency: "export/download boundary and event candidates",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.PARTIAL_EVIDENCE_ONLY,
    ],
    partialEvidenceLevel: "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
    primaryAbsentCapability: "external-use authorization policy",
    implementationGap: "export/download boundary is not external-use approval",
    overclaimRisk: "generated/export artifact could be overclaimed as external-use",
    futureBoundaryPosture: "requires release/external-use/product authorization policy",
    relatedMaterialClasses: [
      materialClass("GENERATED_ARTIFACT_OR_EXPORT_MATERIAL"),
    ],
    relatedStorageLocationIds: [
      locationId("L12_LOCAL_GENERATED_ARTIFACTS"),
      locationId("L13_LOCAL_EXPORT_PACKAGES"),
    ],
    relatedAdminSupportGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-011_ADMIN_SUPPORT_EXPORT_PACKET_DELIVERY_DENIED"),
    ],
    relatedThirdPartyStatusGapIds: [
      tprGapId("TPR-STATUS-GAP-009_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP"),
    ],
    relatedRawMaterialRoutingControlIds: [
      rmrControlId("RMR_CS_004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL"),
    ],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-008_EXPORT_DOWNLOAD_ACCESS")],
    relatedRbacBoundaryStatus: "ACCESS_DENIED_BY_DEFAULT",
    notes: "Export/download evidence is not release or external-use approval.",
  }),
  "GAC-TM-012_DATABASE_QUERY_SCOPING_PARTIAL": makeInventoryRow({
    id: "GAC-TM-012_DATABASE_QUERY_SCOPING_PARTIAL",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .DATABASE_QUERY_SCOPING_PARTIAL,
    surface: "database query scoping",
    sourceBoundaryOrDependency: "future database/persisted storage boundary",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.PARTIAL_EVIDENCE_ONLY,
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS
        .BLOCKED_BY_GLOBAL_AUTHORIZATION_MODEL,
    ],
    partialEvidenceLevel: "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
    primaryAbsentCapability: "database access-control implementation",
    implementationGap: "database storage remains future and not implemented",
    overclaimRisk: "query scoping docs could be overclaimed as storage enforcement",
    futureBoundaryPosture: "requires database/storage implementation boundary",
    relatedMaterialClasses: [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
    relatedStorageLocationIds: [locationId("L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE")],
    relatedLifecycleFamilies: [lifecycleFamily("RETENTION"), lifecycleFamily("DELETION")],
    relatedRbacBoundaryStatus: "ACCESS_DENIED_BY_DEFAULT",
    notes: "Database query scoping remains partial and future-only.",
  }),
  "GAC-TM-013_SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL": makeInventoryRow({
    id: "GAC-TM-013_SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL,
    surface: "schema validator access-control contribution",
    sourceBoundaryOrDependency: "schema validator contract evidence",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.PARTIAL_EVIDENCE_ONLY,
    ],
    partialEvidenceLevel: "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
    primaryAbsentCapability: "runtime access-control enforcement",
    implementationGap: "schema validation is not access-control enforcement",
    overclaimRisk: "validator evidence could be overclaimed as authorization",
    futureBoundaryPosture: "requires runtime authorization model",
    relatedMaterialClasses: [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
    relatedStorageLocationIds: [locationId("L04_REPO_TRACKED_SCHEMAS")],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-007_MANIFEST_VALIDATION")],
    relatedRbacBoundaryStatus: "ROUTE_CASE_CAPABILITY_OVERCLAIM_DENIED",
    notes: "Schema validator contribution remains partial only.",
  }),
  "GAC-TM-014_ALLOWED_DENIED_TEST_COVERAGE_PARTIAL": makeInventoryRow({
    id: "GAC-TM-014_ALLOWED_DENIED_TEST_COVERAGE_PARTIAL",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .ALLOWED_DENIED_TEST_COVERAGE_PARTIAL,
    surface: "allowed/denied test coverage",
    sourceBoundaryOrDependency: "tracked tests and CI scenario evidence",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.PARTIAL_EVIDENCE_ONLY,
    ],
    partialEvidenceLevel: "CI_TESTED_SCENARIO_EVIDENCE",
    primaryAbsentCapability: "complete allow/deny matrix",
    implementationGap: "tested scenarios are not runtime certainty",
    overclaimRisk: "test evidence could be overclaimed as release evidence",
    futureBoundaryPosture: "requires CI test plan and complete allow/deny tests",
    relatedMaterialClasses: [
      materialClass("SYNTHETIC_NO_RAW_MATERIAL"),
      materialClass("CI_LOG_OR_WORKFLOW_ARTIFACT"),
      materialClass("LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL"),
    ],
    relatedStorageLocationIds: [
      locationId("L02_REPO_TRACKED_TEST_FILES"),
      locationId("L08_GITHUB_ACTIONS_CI_LOGS"),
      locationId("L10_LOCAL_TEST_LOGS"),
    ],
    relatedAalEventCandidateIds: [
      aalEventId("AAL-EVENT-010_LOCAL_LOG_TEST_TRANSCRIPT_HANDLING"),
    ],
    relatedRbacBoundaryStatus: "ACCESS_DENIED_BY_DEFAULT",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE
        .CI_TESTED_SCENARIO_EVIDENCE,
    notes: "Local logs are not CI evidence; CI logs are not release evidence.",
  }),
  "GAC-TM-015_CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL": makeInventoryRow({
    id: "GAC-TM-015_CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL,
    surface: "cross-tenant and wrong-case test coverage",
    sourceBoundaryOrDependency: "wrong-tenant and wrong-case tests",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.PARTIAL_EVIDENCE_ONLY,
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.BLOCKED_BY_ADMIN_SUPPORT_MODEL,
    ],
    partialEvidenceLevel: "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
    primaryAbsentCapability: "complete wrong-tenant/wrong-case matrix",
    implementationGap: "wrong-case tests do not create global authorization",
    overclaimRisk: "negative tests could be overclaimed as full non-bypassability",
    futureBoundaryPosture: "requires wrong-tenant, wrong-case, and wrong-object tests",
    relatedMaterialClasses: [materialClass("SYNTHETIC_NO_RAW_MATERIAL")],
    relatedStorageLocationIds: [locationId("L02_REPO_TRACKED_TEST_FILES")],
    relatedAdminSupportGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-010_ADMIN_SUPPORT_CROSS_TENANT_CASE_OVERRIDE_DENIED"),
    ],
    relatedAalEventCandidateIds: [aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT")],
    relatedRbacBoundaryStatus: "ADMIN_SUPPORT_BYPASS_DENIED",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE
        .PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE,
    notes: "Cross-tenant/wrong-case coverage remains partial.",
  }),
  "GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP": makeInventoryRow({
    id: "GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP",
    family:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES
        .GLOBAL_AUTHORIZATION_MODEL_GAP,
    surface: "global authorization model",
    sourceBoundaryOrDependency: "global access-control model absence",
    currentStatuses: [
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS
        .BLOCKED_BY_GLOBAL_AUTHORIZATION_MODEL,
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.THREAT_MODEL_INVENTORY_ONLY,
    ],
    partialEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
    primaryAbsentCapability: "complete global access-control model",
    implementationGap: "global authorization model is not created",
    overclaimRisk: "inventory scaffold could be mistaken for authorization model",
    futureBoundaryPosture: "requires complete model, implementation plan, and review",
    relatedMaterialClasses: [
      materialClass("RAW_PRIVATE_SOURCE_MATERIAL"),
      materialClass("THIRD_PARTY_MODEL_API_ROUTED_MATERIAL"),
      materialClass("PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL"),
      materialClass("TOKEN_URL_SECRET_MATERIAL"),
    ],
    relatedStorageLocationIds: [
      locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"),
      locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE"),
    ],
    relatedAdminSupportGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-012_ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_DENIED"),
    ],
    relatedThirdPartyStatusGapIds: [
      tprGapId("TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS"),
      tprGapId("TPR-STATUS-GAP-002_PROVIDER_IDENTITY_STATUS_GAP"),
    ],
    relatedRawMaterialRoutingControlIds: [
      rmrControlId("RMR_CS_009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL"),
    ],
    relatedAalEventCandidateIds: [
      aalEventId("AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL"),
    ],
    relatedLifecycleFamilies: [
      lifecycleFamily("PROVIDER_DELETION"),
      lifecycleFamily("RECIPIENT_PURGE"),
    ],
    relatedRbacBoundaryStatus: "UNKNOWN_NOT_EVIDENCED",
    evidencePosture:
      GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
    notes: "Global authorization model remains absent and non-authorizing.",
  }),
});

function listGlobalAccessControlThreatModelFamilies() {
  return cloneAndFreeze(Object.values(GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES));
}

function listGlobalAccessControlThreatModelInventoryRows() {
  return cloneAndFreeze(
    Object.values(GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY),
  );
}

function getGlobalAccessControlThreatModelInventoryRow(id) {
  const row = GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY[id];
  if (!row) {
    return cloneAndFreeze({
      id,
      family: GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS
        .UNKNOWN_NOT_EVIDENCED,
      current_statuses: [
        GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS
          .UNKNOWN_NOT_EVIDENCED,
      ],
      current_authorization_status:
        GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
      evidence_posture:
        GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
      non_authorizations: BASE_NON_AUTHORIZATIONS,
    });
  }

  return cloneAndFreeze(row);
}

function classifyGlobalAccessControlThreatModelInventoryRow(id) {
  const row = GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY[id];
  if (!row) {
    return cloneAndFreeze({
      id,
      known: false,
      classification:
        GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
      authorized: false,
      access_control_enforced: false,
      security_finding_created: false,
      evidence_posture:
        GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
    });
  }

  return cloneAndFreeze({
    id: row.id,
    known: true,
    classification: row.family,
    current_statuses: row.current_statuses,
    current_authorization_status: row.current_authorization_status,
    evidence_posture: row.evidence_posture,
    authorized: false,
    access_control_enforced: false,
    security_finding_created: false,
  });
}

function hasGlobalAccessControlThreatModelInventoryRow(id) {
  return Object.prototype.hasOwnProperty.call(
    GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
    id,
  );
}

function listGlobalAccessControlThreatModelNonOverclaimRules() {
  return cloneAndFreeze(GLOBAL_ACCESS_CONTROL_THREAT_MODEL_NON_OVERCLAIM_RULES);
}

function getGlobalAccessControlThreatModelRequiredPrerequisites() {
  return cloneAndFreeze(GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_PREREQUISITES);
}

function getGlobalAccessControlThreatModelNonAuthorizationStatus() {
  return cloneAndFreeze({
    ...BASE_NON_AUTHORIZATIONS,
    high_risk_material_classes_denied: highRiskMaterials,
    local_logs_are_ci_evidence: false,
    ci_logs_are_release_evidence: false,
    human_review_gate_is_system_approval: false,
  });
}

function isGlobalAccessControlModelImplemented() {
  return false;
}

function isGlobalAuthorizationModelCreated() {
  return false;
}

function isAccessControlRuntimeEnforced() {
  return false;
}

function isSecurityFindingCreated() {
  return false;
}

module.exports = {
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_EVIDENCE_POSTURE,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_NON_OVERCLAIM_RULES,
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_PREREQUISITES,
  classifyGlobalAccessControlThreatModelInventoryRow,
  getGlobalAccessControlThreatModelInventoryRow,
  getGlobalAccessControlThreatModelNonAuthorizationStatus,
  getGlobalAccessControlThreatModelRequiredPrerequisites,
  hasGlobalAccessControlThreatModelInventoryRow,
  isAccessControlRuntimeEnforced,
  isGlobalAccessControlModelImplemented,
  isGlobalAuthorizationModelCreated,
  isSecurityFindingCreated,
  listGlobalAccessControlThreatModelFamilies,
  listGlobalAccessControlThreatModelInventoryRows,
  listGlobalAccessControlThreatModelNonOverclaimRules,
};
