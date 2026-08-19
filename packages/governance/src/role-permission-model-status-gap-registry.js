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
const {
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
} = require("./global-access-control-threat-model-inventory-status-registry.js");
const {
  RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
} = require("./runtime-gate-candidate-status-inventory-registry.js");

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
const gacRowId = (key) =>
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY[key].id;
const runtimeGateId = (key) =>
  RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY[key].id;

const ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES = deepFreeze({
  ACTOR_SUBJECT_MODEL_GAP: "ACTOR_SUBJECT_MODEL_GAP",
  ROLE_CATEGORY_MODEL_GAP: "ROLE_CATEGORY_MODEL_GAP",
  PERMISSION_CATEGORY_MODEL_GAP: "PERMISSION_CATEGORY_MODEL_GAP",
  ROLE_FIELDS_GAP: "ROLE_FIELDS_GAP",
  PERMISSION_FIELDS_GAP: "PERMISSION_FIELDS_GAP",
  ROLE_SCHEMA_GAP: "ROLE_SCHEMA_GAP",
  PERMISSION_SCHEMA_GAP: "PERMISSION_SCHEMA_GAP",
  TENANT_CASE_SCOPING_GAP: "TENANT_CASE_SCOPING_GAP",
  OBJECT_LEVEL_AUTHORIZATION_GAP: "OBJECT_LEVEL_AUTHORIZATION_GAP",
  FUNCTION_LEVEL_AUTHORIZATION_GAP: "FUNCTION_LEVEL_AUTHORIZATION_GAP",
  PROPERTY_LEVEL_AUTHORIZATION_OVEREXPOSURE_GAP:
    "PROPERTY_LEVEL_AUTHORIZATION_OVEREXPOSURE_GAP",
  ADMIN_SUPPORT_ROLE_PERMISSION_GAP: "ADMIN_SUPPORT_ROLE_PERMISSION_GAP",
  LOG_VIEWER_RBAC_GAP: "LOG_VIEWER_RBAC_GAP",
  AUDIT_ACCESS_LOG_DEPENDENCY_GAP: "AUDIT_ACCESS_LOG_DEPENDENCY_GAP",
  RETENTION_DELETION_PERMISSION_GAP: "RETENTION_DELETION_PERMISSION_GAP",
  THIRD_PARTY_ROUTING_PERMISSION_GAP: "THIRD_PARTY_ROUTING_PERMISSION_GAP",
  RAW_MATERIAL_ROUTING_PERMISSION_GAP: "RAW_MATERIAL_ROUTING_PERMISSION_GAP",
  RUNTIME_GATE_DEPENDENCY_GAP: "RUNTIME_GATE_DEPENDENCY_GAP",
  GLOBAL_AUTHORIZATION_MODEL_DEPENDENCY_GAP:
    "GLOBAL_AUTHORIZATION_MODEL_DEPENDENCY_GAP",
});

const ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS = deepFreeze({
  NOT_RBAC_IMPLEMENTATION: "NOT_RBAC_IMPLEMENTATION",
  NOT_ACCESS_CONTROL_IMPLEMENTATION: "NOT_ACCESS_CONTROL_IMPLEMENTATION",
  NOT_ROLE_PERMISSION_MODEL: "NOT_ROLE_PERMISSION_MODEL",
  NOT_ROLE_FIELDS: "NOT_ROLE_FIELDS",
  NOT_PERMISSION_FIELDS: "NOT_PERMISSION_FIELDS",
  NOT_ROLE_SCHEMA: "NOT_ROLE_SCHEMA",
  NOT_PERMISSION_SCHEMA: "NOT_PERMISSION_SCHEMA",
  NOT_ADMIN_SUPPORT_MODEL: "NOT_ADMIN_SUPPORT_MODEL",
  NOT_ADMIN_SUPPORT_RUNTIME_ACCESS: "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS",
  NOT_LOG_VIEWER_RBAC: "NOT_LOG_VIEWER_RBAC",
  NOT_GLOBAL_AUTHORIZATION_MODEL: "NOT_GLOBAL_AUTHORIZATION_MODEL",
  NOT_RUNTIME_ENFORCEMENT: "NOT_RUNTIME_ENFORCEMENT",
  NOT_VALIDATOR_DISPATCH: "NOT_VALIDATOR_DISPATCH",
  NOT_RUNTIME_REGISTRY_LOOKUP: "NOT_RUNTIME_REGISTRY_LOOKUP",
  NOT_SECURITY_FINDING: "NOT_SECURITY_FINDING",
  NO_SEVERITY_ASSIGNED: "NO_SEVERITY_ASSIGNED",
  NO_REMEDIATION_RECOMMENDED: "NO_REMEDIATION_RECOMMENDED",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const ROLE_PERMISSION_MODEL_DECISION_STATUS = deepFreeze({
  DOCS_ONLY_STATUS_GAP: "DOCS_ONLY_STATUS_GAP",
  REGISTRY_SCAFFOLD_ONLY: "REGISTRY_SCAFFOLD_ONLY",
  FUTURE_MODEL_CANDIDATE_ONLY: "FUTURE_MODEL_CANDIDATE_ONLY",
  DENY_BY_DEFAULT: "DENY_BY_DEFAULT",
  NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT:
    "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  BLOCKED_BY_ROLE_PERMISSION_MODEL: "BLOCKED_BY_ROLE_PERMISSION_MODEL",
  BLOCKED_BY_ADMIN_SUPPORT_MODEL: "BLOCKED_BY_ADMIN_SUPPORT_MODEL",
  BLOCKED_BY_AUDIT_ACCESS_LOG: "BLOCKED_BY_AUDIT_ACCESS_LOG",
  BLOCKED_BY_RETENTION_DELETION: "BLOCKED_BY_RETENTION_DELETION",
  BLOCKED_BY_THIRD_PARTY_ROUTING: "BLOCKED_BY_THIRD_PARTY_ROUTING",
  BLOCKED_BY_RAW_MATERIAL_ROUTING: "BLOCKED_BY_RAW_MATERIAL_ROUTING",
  BLOCKED_BY_RUNTIME_GATE_CANDIDATES:
    "BLOCKED_BY_RUNTIME_GATE_CANDIDATES",
  BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL:
    "BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const ROLE_PERMISSION_MODEL_EVIDENCE_POSTURE = deepFreeze({
  DOCS_ONLY_STATUS_GAP: "DOCS_ONLY_STATUS_GAP",
  REGISTRY_SCAFFOLD_EVIDENCE: "REGISTRY_SCAFFOLD_EVIDENCE",
  TESTED_ALIGNMENT_EVIDENCE: "TESTED_ALIGNMENT_EVIDENCE",
  CI_TESTED_SCENARIO_EVIDENCE: "CI_TESTED_SCENARIO_EVIDENCE",
  PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE:
    "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
  FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED:
    "FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const BASE_IMPLEMENTATION_STATUSES = deepFreeze([
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_RBAC_IMPLEMENTATION,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS
    .NOT_ACCESS_CONTROL_IMPLEMENTATION,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_ROLE_PERMISSION_MODEL,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_ROLE_FIELDS,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_PERMISSION_FIELDS,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_ROLE_SCHEMA,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_PERMISSION_SCHEMA,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_ADMIN_SUPPORT_MODEL,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS
    .NOT_ADMIN_SUPPORT_RUNTIME_ACCESS,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_LOG_VIEWER_RBAC,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS
    .NOT_GLOBAL_AUTHORIZATION_MODEL,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_RUNTIME_ENFORCEMENT,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_VALIDATOR_DISPATCH,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_RUNTIME_REGISTRY_LOOKUP,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NOT_SECURITY_FINDING,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NO_SEVERITY_ASSIGNED,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.NO_REMEDIATION_RECOMMENDED,
]);

const BASE_CURRENT_STATUSES = deepFreeze([
  ROLE_PERMISSION_MODEL_DECISION_STATUS.DOCS_ONLY_STATUS_GAP,
  ROLE_PERMISSION_MODEL_DECISION_STATUS.REGISTRY_SCAFFOLD_ONLY,
  ROLE_PERMISSION_MODEL_DECISION_STATUS.FUTURE_MODEL_CANDIDATE_ONLY,
  ROLE_PERMISSION_MODEL_DECISION_STATUS.DENY_BY_DEFAULT,
  ROLE_PERMISSION_MODEL_DECISION_STATUS
    .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
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
  admin_support_access_authorized: false,
  admin_support_runtime_access_authorized: false,
  admin_support_model_created: false,
  log_viewer_rbac_created: false,
  runtime_gate_implemented: false,
  runtime_gate_enforced: false,
  validator_dispatch_created: false,
  runtime_registry_lookup_created: false,
  global_authorization_model_created: false,
  security_finding_created: false,
  vulnerability_finding_created: false,
  severity_assigned: false,
  remediation_recommended: false,
  remediation_implemented: false,
  audit_access_log_implemented: false,
  log_schema_created: false,
  log_storage_created: false,
  retention_deletion_implemented: false,
  retention_deletion_executed: false,
  third_party_routing_authorized: false,
  raw_material_routing_implemented: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_authorized: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
  system_approval_created: false,
});

const ROLE_PERMISSION_MODEL_NON_OVERCLAIM_RULES = deepFreeze([
  "ROLE_PERMISSION_STATUS_GAP_REGISTRY does not mean ROLE_PERMISSION_MODEL",
  "ROLE_PERMISSION_ROW does not mean RBAC_IMPLEMENTATION",
  "ROLE_PERMISSION_ROW does not mean ACCESS_CONTROL_IMPLEMENTATION",
  "ACTOR_SUBJECT_MODEL_GAP does not mean SUBJECT_MODEL_CREATED",
  "ROLE_CATEGORY_MODEL_GAP does not mean ROLE_CREATED",
  "PERMISSION_CATEGORY_MODEL_GAP does not mean PERMISSION_CREATED",
  "ROLE_FIELDS_GAP does not mean ROLE_FIELDS_CREATED",
  "PERMISSION_FIELDS_GAP does not mean PERMISSION_FIELDS_CREATED",
  "ROLE_SCHEMA_GAP does not mean ROLE_SCHEMA_CREATED",
  "PERMISSION_SCHEMA_GAP does not mean PERMISSION_SCHEMA_CREATED",
  "ADMIN_SUPPORT_ROLE_PERMISSION_GAP does not mean ADMIN_SUPPORT_ACCESS_AUTHORIZED",
  "LOG_VIEWER_RBAC_GAP does not mean LOG_VIEWER_RBAC_CREATED",
  "RUNTIME_GATE_DEPENDENCY_GAP does not mean RUNTIME_GATE_IMPLEMENTATION",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean RBAC",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean FULL_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean ADMIN_SUPPORT_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean GLOBAL_AUTHORIZATION_MODEL",
  "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
  "HUMAN_REVIEW_GATE does not mean SYSTEM_APPROVAL",
  "STATUS_GAP_ROW does not mean SECURITY_FINDING",
  "STATUS_GAP_ROW does not mean SEVERITY_ASSIGNED",
  "STATUS_GAP_ROW does not mean REMEDIATION_RECOMMENDED",
]);

const ROLE_PERMISSION_MODEL_REQUIRED_PREREQUISITES = deepFreeze([
  "complete role/permission model",
  "actor/subject model",
  "role taxonomy",
  "permission taxonomy",
  "role fields",
  "permission fields",
  "role schema",
  "permission schema",
  "admin/support model",
  "admin/support access-control model",
  "log viewer RBAC model",
  "audit/access-log model",
  "no-content access-control event policy",
  "log schema/storage policy",
  "retention/deletion/purge/erasure policy",
  "encryption/key-management policy",
  "third-party provider status registry",
  "third-party provider route denial tests",
  "raw-material routing denial policy",
  "runtime gate implementation plan",
  "schema/validator gate implementation plan",
  "workflow/prompt gate implementation plan",
  "validator dispatch plan",
  "registry/lookup plan",
  "global access-control model",
  "global authorization model",
  "object/function/property authorization review",
  "tenant isolation tests",
  "wrong-tenant tests",
  "wrong-case tests",
  "wrong-object tests",
  "wrong-function tests",
  "wrong-property tests",
  "allow/deny tests",
  "no-raw/no-private/no-source-locator policy",
  "CI test plan",
  "external-use non-authorization wording",
  "non-proof/non-route-readiness wording",
  "human/professional review gate",
]);

const row = ({
  id,
  family,
  surface,
  source_boundary_or_dependency,
  primary_absent_capability,
  implementation_gap,
  required_prerequisites,
  required_test_evidence,
  overclaim_risk,
  future_boundary_posture,
  related_material_classes = [],
  related_storage_location_ids = [],
  related_admin_support_gap_ids = [],
  related_third_party_status_gap_ids = [],
  related_raw_material_routing_control_ids = [],
  related_aal_event_candidate_ids = [],
  related_lifecycle_families = [],
  related_global_access_control_row_ids = [],
  related_runtime_gate_candidate_ids = [],
  notes,
}) => ({
  id,
  family,
  surface,
  source_boundary_or_dependency,
  current_statuses: [
    ...BASE_CURRENT_STATUSES,
    ROLE_PERMISSION_MODEL_DECISION_STATUS.BLOCKED_BY_ROLE_PERMISSION_MODEL,
  ],
  primary_absent_capability,
  implementation_gap,
  required_prerequisites,
  required_test_evidence,
  overclaim_risk,
  current_authorization_status:
    ROLE_PERMISSION_MODEL_DECISION_STATUS
      .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
  future_boundary_posture,
  non_authorized_until_closure: true,
  related_material_classes,
  related_storage_location_ids,
  related_admin_support_gap_ids,
  related_third_party_status_gap_ids,
  related_raw_material_routing_control_ids,
  related_aal_event_candidate_ids,
  related_lifecycle_families,
  related_global_access_control_row_ids,
  related_runtime_gate_candidate_ids,
  related_rbac_boundary_status: "RBAC_DENY_BY_DEFAULT_SCAFFOLD_ONLY",
  evidence_posture:
    ROLE_PERMISSION_MODEL_EVIDENCE_POSTURE.REGISTRY_SCAFFOLD_EVIDENCE,
  non_authorizations: BASE_NON_AUTHORIZATIONS,
  notes,
});

const ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY = deepFreeze({
  RP_SG_001_ACTOR_SUBJECT_MODEL_GAP: row({
    id: "RP-SG-001_ACTOR_SUBJECT_MODEL_GAP",
    family: ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.ACTOR_SUBJECT_MODEL_GAP,
    surface: "actor subject identity and subject-scope model",
    source_boundary_or_dependency: "RBAC role-permission scope review",
    primary_absent_capability: "actor/subject model",
    implementation_gap: "actor subject model remains future-only",
    required_prerequisites: ["actor/subject model", "tenant isolation tests"],
    required_test_evidence: ["wrong-tenant tests", "allow/deny tests"],
    overclaim_risk: "actor evidence could be mistaken for subject model creation",
    future_boundary_posture: "FUTURE_MODEL_CANDIDATE_ONLY",
    related_material_classes: [materialClass("SANITIZED_TEXT_PRIMARY_MATERIAL")],
    related_storage_location_ids: [locationId("L01_REPO_TRACKED_SOURCE_FILES")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-001_AUTH_REQUEST_CONTEXT_PARTIAL"),
      gacRowId("GAC-TM-002_TENANT_ISOLATION_PARTIAL"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_001_MATERIAL_INTAKE_AUTHORIZATION_GATE_CANDIDATE"),
    ],
    notes: "Actor/subject evidence is partial and not RBAC implementation.",
  }),
  RP_SG_002_ROLE_CATEGORY_MODEL_GAP: row({
    id: "RP-SG-002_ROLE_CATEGORY_MODEL_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.ROLE_CATEGORY_MODEL_GAP,
    surface: "role taxonomy and role category model",
    source_boundary_or_dependency: "RBAC role-permission control specification",
    primary_absent_capability: "role taxonomy",
    implementation_gap: "role categories remain descriptive scaffold evidence",
    required_prerequisites: ["role taxonomy", "role fields", "role schema"],
    required_test_evidence: ["allow/deny tests", "wrong-function tests"],
    overclaim_risk: "role category labels could be mistaken for created roles",
    future_boundary_posture: "FUTURE_MODEL_CANDIDATE_ONLY",
    related_material_classes: [materialClass("SANITIZED_TEXT_PRIMARY_MATERIAL")],
    related_storage_location_ids: [locationId("L04_REPO_TRACKED_SCHEMAS")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-009_ROLE_PERMISSION_MODEL_GAP"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE"),
    ],
    notes: "No role model, role fields, or role schema are created.",
  }),
  RP_SG_003_PERMISSION_CATEGORY_MODEL_GAP: row({
    id: "RP-SG-003_PERMISSION_CATEGORY_MODEL_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.PERMISSION_CATEGORY_MODEL_GAP,
    surface: "permission taxonomy and permission category model",
    source_boundary_or_dependency: "RBAC role-permission control specification",
    primary_absent_capability: "permission taxonomy",
    implementation_gap: "permission categories remain descriptive scaffold evidence",
    required_prerequisites: [
      "permission taxonomy",
      "permission fields",
      "permission schema",
    ],
    required_test_evidence: ["allow/deny tests", "wrong-property tests"],
    overclaim_risk:
      "permission category labels could be mistaken for permission creation",
    future_boundary_posture: "FUTURE_MODEL_CANDIDATE_ONLY",
    related_material_classes: [materialClass("SANITIZED_TEXT_PRIMARY_MATERIAL")],
    related_storage_location_ids: [locationId("L04_REPO_TRACKED_SCHEMAS")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-009_ROLE_PERMISSION_MODEL_GAP"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE"),
    ],
    notes: "No permission model, permission fields, or permission schema are created.",
  }),
  RP_SG_004_ROLE_FIELDS_GAP: row({
    id: "RP-SG-004_ROLE_FIELDS_GAP",
    family: ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.ROLE_FIELDS_GAP,
    surface: "persisted or request-level role fields",
    source_boundary_or_dependency: "role fields prerequisite boundary",
    primary_absent_capability: "role fields",
    implementation_gap: "role fields remain absent",
    required_prerequisites: ["role fields", "role schema"],
    required_test_evidence: ["wrong-role tests", "allow/deny tests"],
    overclaim_risk: "field inventory could be mistaken for role fields",
    future_boundary_posture: "ROLE_FIELDS_NOT_CREATED",
    related_material_classes: [materialClass("PACKAGE_LOCK_OR_BUILD_METADATA")],
    related_storage_location_ids: [locationId("L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-009_ROLE_PERMISSION_MODEL_GAP"),
      gacRowId("GAC-TM-012_DATABASE_QUERY_SCOPING_PARTIAL"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_014_ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE"),
    ],
    notes: "No persisted role fields or database fields are created.",
  }),
  RP_SG_005_PERMISSION_FIELDS_GAP: row({
    id: "RP-SG-005_PERMISSION_FIELDS_GAP",
    family: ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.PERMISSION_FIELDS_GAP,
    surface: "persisted or request-level permission fields",
    source_boundary_or_dependency: "permission fields prerequisite boundary",
    primary_absent_capability: "permission fields",
    implementation_gap: "permission fields remain absent",
    required_prerequisites: ["permission fields", "permission schema"],
    required_test_evidence: ["wrong-permission tests", "allow/deny tests"],
    overclaim_risk: "permission inventory could be mistaken for permission fields",
    future_boundary_posture: "PERMISSION_FIELDS_NOT_CREATED",
    related_material_classes: [materialClass("PACKAGE_LOCK_OR_BUILD_METADATA")],
    related_storage_location_ids: [locationId("L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-009_ROLE_PERMISSION_MODEL_GAP"),
      gacRowId("GAC-TM-012_DATABASE_QUERY_SCOPING_PARTIAL"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_014_ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE"),
    ],
    notes: "No persisted permission fields or database fields are created.",
  }),
  RP_SG_006_ROLE_SCHEMA_GAP: row({
    id: "RP-SG-006_ROLE_SCHEMA_GAP",
    family: ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.ROLE_SCHEMA_GAP,
    surface: "role schema and validation contract",
    source_boundary_or_dependency: "schema validator access-control contribution",
    primary_absent_capability: "role schema",
    implementation_gap: "role schema remains absent",
    required_prerequisites: ["role schema", "schema/validator gate implementation plan"],
    required_test_evidence: ["schema gate tests", "wrong-role tests"],
    overclaim_risk: "schema gate candidate could be mistaken for role schema",
    future_boundary_posture: "ROLE_SCHEMA_NOT_CREATED",
    related_material_classes: [materialClass("SANITIZED_TEXT_PRIMARY_MATERIAL")],
    related_storage_location_ids: [locationId("L04_REPO_TRACKED_SCHEMAS")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-013_SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE"),
    ],
    notes: "No role schema or schema enforcement is created.",
  }),
  RP_SG_007_PERMISSION_SCHEMA_GAP: row({
    id: "RP-SG-007_PERMISSION_SCHEMA_GAP",
    family: ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.PERMISSION_SCHEMA_GAP,
    surface: "permission schema and validation contract",
    source_boundary_or_dependency: "schema validator access-control contribution",
    primary_absent_capability: "permission schema",
    implementation_gap: "permission schema remains absent",
    required_prerequisites: [
      "permission schema",
      "schema/validator gate implementation plan",
    ],
    required_test_evidence: ["schema gate tests", "wrong-permission tests"],
    overclaim_risk: "schema gate candidate could be mistaken for permission schema",
    future_boundary_posture: "PERMISSION_SCHEMA_NOT_CREATED",
    related_material_classes: [materialClass("SANITIZED_TEXT_PRIMARY_MATERIAL")],
    related_storage_location_ids: [locationId("L04_REPO_TRACKED_SCHEMAS")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-013_SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE"),
    ],
    notes: "No permission schema or schema enforcement is created.",
  }),
  RP_SG_008_TENANT_CASE_SCOPING_GAP: row({
    id: "RP-SG-008_TENANT_CASE_SCOPING_GAP",
    family: ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.TENANT_CASE_SCOPING_GAP,
    surface: "tenant and case-scoped access-control boundary",
    source_boundary_or_dependency: "global access-control threat model inventory",
    primary_absent_capability: "complete tenant/case authorization model",
    implementation_gap: "tenant/case checks remain partial evidence",
    required_prerequisites: ["tenant isolation tests", "wrong-case tests"],
    required_test_evidence: ["wrong-tenant tests", "wrong-case tests"],
    overclaim_risk:
      "route/case evidence could be mistaken for full tenant/case RBAC",
    future_boundary_posture: "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE_ONLY",
    related_material_classes: [materialClass("REDACTED_REVIEW_SIGNAL_MATERIAL")],
    related_storage_location_ids: [locationId("L03_REPO_TRACKED_DOCS")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-002_TENANT_ISOLATION_PARTIAL"),
      gacRowId("GAC-TM-003_CASE_CONTEXT_ACCESS_CONTROL_PARTIAL"),
      gacRowId("GAC-TM-015_CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_015_CROSS_TENANT_WRONG_CASE_DENIAL_GATE_CANDIDATE"),
    ],
    notes: "Tenant/case evidence remains partial and not full access-control.",
  }),
  RP_SG_009_OBJECT_LEVEL_AUTHORIZATION_GAP: row({
    id: "RP-SG-009_OBJECT_LEVEL_AUTHORIZATION_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.OBJECT_LEVEL_AUTHORIZATION_GAP,
    surface: "object-level authorization and BOLA/IDOR review",
    source_boundary_or_dependency: "global access-control threat model inventory",
    primary_absent_capability: "object-level authorization model",
    implementation_gap: "object-level global analysis remains not evidenced",
    required_prerequisites: ["object/function/property authorization review"],
    required_test_evidence: ["wrong-object tests", "allow/deny tests"],
    overclaim_risk: "object evidence could be mistaken for BOLA/IDOR closure",
    future_boundary_posture: "FUTURE_MODEL_CANDIDATE_ONLY",
    related_material_classes: [materialClass("REDACTED_REVIEW_SIGNAL_MATERIAL")],
    related_storage_location_ids: [locationId("L03_REPO_TRACKED_DOCS")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE"),
    ],
    notes: "Object-level analysis remains a gap, not a finding.",
  }),
  RP_SG_010_FUNCTION_LEVEL_AUTHORIZATION_GAP: row({
    id: "RP-SG-010_FUNCTION_LEVEL_AUTHORIZATION_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.FUNCTION_LEVEL_AUTHORIZATION_GAP,
    surface: "function-level authorization review",
    source_boundary_or_dependency: "global access-control threat model inventory",
    primary_absent_capability: "complete function-level authorization model",
    implementation_gap: "function-level authorization remains partial",
    required_prerequisites: ["object/function/property authorization review"],
    required_test_evidence: ["wrong-function tests", "allow/deny tests"],
    overclaim_risk: "function-level partial evidence could be overclaimed",
    future_boundary_posture: "FUTURE_MODEL_CANDIDATE_ONLY",
    related_material_classes: [materialClass("REDACTED_REVIEW_SIGNAL_MATERIAL")],
    related_storage_location_ids: [locationId("L03_REPO_TRACKED_DOCS")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-007_FUNCTION_LEVEL_AUTHORIZATION_PARTIAL"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE"),
    ],
    notes: "Function-level evidence remains partial and not access-control implementation.",
  }),
  RP_SG_011_PROPERTY_LEVEL_AUTHORIZATION_OVEREXPOSURE_GAP: row({
    id: "RP-SG-011_PROPERTY_LEVEL_AUTHORIZATION_OVEREXPOSURE_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES
        .PROPERTY_LEVEL_AUTHORIZATION_OVEREXPOSURE_GAP,
    surface: "property-level authorization and data-overexposure review",
    source_boundary_or_dependency: "global access-control threat model inventory",
    primary_absent_capability: "property-level data exposure model",
    implementation_gap: "property-level global analysis remains not evidenced",
    required_prerequisites: ["object/function/property authorization review"],
    required_test_evidence: ["wrong-property tests", "allow/deny tests"],
    overclaim_risk:
      "property-level gap could be mistaken for data-overexposure closure",
    future_boundary_posture: "FUTURE_MODEL_CANDIDATE_ONLY",
    related_material_classes: [materialClass("REDACTED_REVIEW_SIGNAL_MATERIAL")],
    related_storage_location_ids: [locationId("L03_REPO_TRACKED_DOCS")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-008_PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE"),
    ],
    notes: "No security finding, severity, or remediation is created.",
  }),
  RP_SG_012_ADMIN_SUPPORT_ROLE_PERMISSION_GAP: row({
    id: "RP-SG-012_ADMIN_SUPPORT_ROLE_PERMISSION_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES
        .ADMIN_SUPPORT_ROLE_PERMISSION_GAP,
    surface: "admin/support role-permission and access-control dependency",
    source_boundary_or_dependency: "admin/support runtime-readiness gaps",
    primary_absent_capability: "admin/support access-control model",
    implementation_gap: "admin/support role-permission surfaces unresolved",
    required_prerequisites: ["admin/support model", "admin/support access-control model"],
    required_test_evidence: ["admin/support allow/deny tests"],
    overclaim_risk: "admin/support readiness could be mistaken for access authorization",
    future_boundary_posture: "ADMIN_SUPPORT_ACCESS_NOT_AUTHORIZED",
    related_material_classes: [
      materialClass("RAW_PRIVATE_SOURCE_MATERIAL"),
      materialClass("SOURCE_PACKAGE_MATERIAL"),
      materialClass("PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL"),
    ],
    related_storage_location_ids: [
      locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"),
      locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"),
      locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE"),
    ],
    related_admin_support_gap_ids: [
      adminGapId("ADMIN-SUPPORT-GAP-001_ADMIN_SUPPORT_MODEL_ABSENT"),
      adminGapId("ADMIN-SUPPORT-GAP-007_ADMIN_SUPPORT_LOG_VIEWER_RBAC_ABSENT"),
      adminGapId("ADMIN-SUPPORT-GAP-010_ADMIN_SUPPORT_CROSS_TENANT_CASE_OVERRIDE_DENIED"),
    ],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_014_ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE"),
    ],
    notes: "Admin/support runtime access remains not implemented and not authorized.",
  }),
  RP_SG_013_LOG_VIEWER_RBAC_GAP: row({
    id: "RP-SG-013_LOG_VIEWER_RBAC_GAP",
    family: ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.LOG_VIEWER_RBAC_GAP,
    surface: "audit/access-log viewer RBAC dependency",
    source_boundary_or_dependency: "audit/access-log storage dependency registry",
    primary_absent_capability: "log viewer RBAC",
    implementation_gap: "log viewer RBAC remains absent",
    required_prerequisites: ["log viewer RBAC model", "audit/access-log model"],
    required_test_evidence: ["log viewer allow/deny tests"],
    overclaim_risk: "audit/access-log candidate could be mistaken for log access",
    future_boundary_posture: "LOG_VIEWER_RBAC_NOT_CREATED",
    related_material_classes: [materialClass("AUDIT_ACCESS_EVENT_RECORD")],
    related_storage_location_ids: [locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE")],
    related_admin_support_gap_ids: [
      adminGapId("ADMIN-SUPPORT-GAP-007_ADMIN_SUPPORT_LOG_VIEWER_RBAC_ABSENT"),
    ],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-016_AUDIT_LOG_VIEWER_ACCESS"),
      aalEventId("AAL-EVENT-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS"),
    ],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_012_AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE"),
    ],
    notes: "Audit/access-log viewing remains candidate-only.",
  }),
  RP_SG_014_AUDIT_ACCESS_LOG_DEPENDENCY_GAP: row({
    id: "RP-SG-014_AUDIT_ACCESS_LOG_DEPENDENCY_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES
        .AUDIT_ACCESS_LOG_DEPENDENCY_GAP,
    surface: "audit/access-log implementation dependency",
    source_boundary_or_dependency: "audit/access-log dependency registry",
    primary_absent_capability: "audit/access-log implementation",
    implementation_gap: "audit/access-log implementation remains absent",
    required_prerequisites: [
      "audit/access-log model",
      "no-content access-control event policy",
      "log schema/storage policy",
    ],
    required_test_evidence: ["audit/access-log allow/deny tests"],
    overclaim_risk: "event candidates could be mistaken for emitted/stored logs",
    future_boundary_posture: "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    related_material_classes: [materialClass("AUDIT_ACCESS_EVENT_RECORD")],
    related_storage_location_ids: [locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE")],
    related_aal_event_candidate_ids: [
      aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT"),
      aalEventId("AAL-EVENT-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE"),
    ],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_012_AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE"),
    ],
    notes: "Local logs remain not CI evidence; CI logs remain not release evidence.",
  }),
  RP_SG_015_RETENTION_DELETION_PERMISSION_GAP: row({
    id: "RP-SG-015_RETENTION_DELETION_PERMISSION_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES
        .RETENTION_DELETION_PERMISSION_GAP,
    surface: "retention/deletion operation permission dependency",
    source_boundary_or_dependency: "RDE storage dependency registry",
    primary_absent_capability: "retention/deletion permission model",
    implementation_gap: "retention/deletion implementation remains absent",
    required_prerequisites: [
      "retention/deletion/purge/erasure policy",
      "encryption/key-management policy",
    ],
    required_test_evidence: ["lifecycle operation allow/deny tests"],
    overclaim_risk: "lifecycle dependency could be mistaken for executable permission",
    future_boundary_posture: "RETENTION_DELETION_NOT_IMPLEMENTED",
    related_material_classes: [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
    related_storage_location_ids: [locationId("L21_BACKUP_SNAPSHOT_STORAGE_FUTURE")],
    related_lifecycle_families: [
      lifecycleFamily("RETENTION"),
      lifecycleFamily("DELETION"),
      lifecycleFamily("PURGE"),
      lifecycleFamily("ERASURE"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_013_RETENTION_DELETION_OPERATION_AUTHORIZATION_GATE_CANDIDATE"),
    ],
    notes: "Lifecycle operation authorization remains future-only.",
  }),
  RP_SG_016_THIRD_PARTY_ROUTING_PERMISSION_GAP: row({
    id: "RP-SG-016_THIRD_PARTY_ROUTING_PERMISSION_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES
        .THIRD_PARTY_ROUTING_PERMISSION_GAP,
    surface: "third-party model/API route permission dependency",
    source_boundary_or_dependency: "third-party routing status/gap registry",
    primary_absent_capability: "third-party routing permission model",
    implementation_gap: "third-party routing remains not authorized",
    required_prerequisites: [
      "third-party provider status registry",
      "third-party provider route denial tests",
    ],
    required_test_evidence: ["provider route denial tests"],
    overclaim_risk: "route approval candidate could be mistaken for provider routing",
    future_boundary_posture: "THIRD_PARTY_ROUTING_NOT_AUTHORIZED",
    related_material_classes: [
      materialClass("THIRD_PARTY_MODEL_API_ROUTED_MATERIAL"),
      materialClass("PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL"),
      materialClass("TOKEN_URL_SECRET_MATERIAL"),
    ],
    related_storage_location_ids: [
      locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"),
      locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE"),
    ],
    related_third_party_status_gap_ids: [
      tprGapId("TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS"),
      tprGapId("TPR-STATUS-GAP-002_PROVIDER_IDENTITY_STATUS_GAP"),
      tprGapId("TPR-STATUS-GAP-006_PROVIDER_TOKEN_URL_SECRET_HANDLING_GAP"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_011_THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE"),
    ],
    notes: "Provider storage and recipient downstream storage remain future/not authorized.",
  }),
  RP_SG_017_RAW_MATERIAL_ROUTING_PERMISSION_GAP: row({
    id: "RP-SG-017_RAW_MATERIAL_ROUTING_PERMISSION_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES
        .RAW_MATERIAL_ROUTING_PERMISSION_GAP,
    surface: "raw/private/source material routing permission dependency",
    source_boundary_or_dependency: "raw-material routing control registry",
    primary_absent_capability: "raw-material routing permission model",
    implementation_gap: "raw-material routing remains not implemented",
    required_prerequisites: [
      "raw-material routing denial policy",
      "no-raw/no-private/no-source-locator policy",
    ],
    required_test_evidence: ["raw-material routing denial tests"],
    overclaim_risk: "routing control row could be mistaken for route permission",
    future_boundary_posture: "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    related_material_classes: [
      materialClass("RAW_PRIVATE_SOURCE_MATERIAL"),
      materialClass("SOURCE_PACKAGE_MATERIAL"),
      materialClass("PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL"),
    ],
    related_storage_location_ids: [
      locationId("L11_LOCAL_UNTRACKED_FILES"),
      locationId("L12_LOCAL_GENERATED_ARTIFACTS"),
    ],
    related_raw_material_routing_control_ids: [
      rmrControlId("RMR_CS_006_RAW_PRIVATE_SOURCE_MATERIAL"),
      rmrControlId("RMR_CS_007_SOURCE_PACKAGE_MATERIAL"),
      rmrControlId("RMR_CS_008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_005_RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE"),
      runtimeGateId("RBAC_GC_006_SOURCE_PACKAGE_DENY_QUARANTINE_GATE_CANDIDATE"),
      runtimeGateId("RBAC_GC_007_PDF_IMAGE_SCREENSHOT_METADATA_DENY_ACQUISITION_GATE_CANDIDATE"),
    ],
    notes: "No raw/private/source material is inspected or routed.",
  }),
  RP_SG_018_RUNTIME_GATE_DEPENDENCY_GAP: row({
    id: "RP-SG-018_RUNTIME_GATE_DEPENDENCY_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES.RUNTIME_GATE_DEPENDENCY_GAP,
    surface: "runtime/schema/workflow gate dependency on role-permission model",
    source_boundary_or_dependency: "runtime gate-candidate status inventory",
    primary_absent_capability: "runtime gate implementation",
    implementation_gap: "runtime gates remain deferred candidates",
    required_prerequisites: [
      "runtime gate implementation plan",
      "schema/validator gate implementation plan",
      "workflow/prompt gate implementation plan",
      "validator dispatch plan",
      "registry/lookup plan",
    ],
    required_test_evidence: ["runtime gate allow/deny tests", "CI test plan"],
    overclaim_risk: "runtime gate candidate could be mistaken for enforcement",
    future_boundary_posture: "RUNTIME_GATE_INVENTORY_DEFERRED",
    related_material_classes: [materialClass("CI_LOG_OR_WORKFLOW_ARTIFACT")],
    related_storage_location_ids: [locationId("L08_GITHUB_ACTIONS_CI_LOGS")],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_001_MATERIAL_INTAKE_AUTHORIZATION_GATE_CANDIDATE"),
      runtimeGateId("RBAC_GC_008_REVIEW_ACCESS_GATE_CANDIDATE"),
      runtimeGateId("RBAC_GC_009_EXPORT_DOWNLOAD_ACCESS_GATE_CANDIDATE"),
      runtimeGateId("RBAC_GC_010_PACKET_DELIVERY_PROMOTION_GATE_CANDIDATE"),
    ],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-013_SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL"),
      gacRowId("GAC-TM-014_ALLOWED_DENIED_TEST_COVERAGE_PARTIAL"),
    ],
    notes: "Runtime/schema/workflow candidates do not create enforcement.",
  }),
  RP_SG_019_GLOBAL_AUTHORIZATION_MODEL_DEPENDENCY_GAP: row({
    id: "RP-SG-019_GLOBAL_AUTHORIZATION_MODEL_DEPENDENCY_GAP",
    family:
      ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES
        .GLOBAL_AUTHORIZATION_MODEL_DEPENDENCY_GAP,
    surface: "global authorization model dependency",
    source_boundary_or_dependency: "global access-control threat model inventory",
    primary_absent_capability: "global authorization model",
    implementation_gap: "global authorization model remains not created",
    required_prerequisites: [
      "global access-control model",
      "global authorization model",
      "object/function/property authorization review",
    ],
    required_test_evidence: ["tenant isolation tests", "allow/deny tests"],
    overclaim_risk:
      "partial route/case/capability evidence could be mistaken for global authorization",
    future_boundary_posture: "GLOBAL_AUTHORIZATION_MODEL_NOT_CREATED",
    related_material_classes: [materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL")],
    related_storage_location_ids: [locationId("L24_PR_COMMENTS_ISSUES_REVIEW_METADATA")],
    related_global_access_control_row_ids: [
      gacRowId("GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP"),
      gacRowId("GAC-TM-004_CAPABILITY_GATES_PARTIAL"),
      gacRowId("GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL"),
    ],
    related_runtime_gate_candidate_ids: [
      runtimeGateId("RBAC_GC_017_HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE"),
    ],
    notes: "Human/professional review remains required and is not system approval.",
  }),
});

const UNKNOWN_ROW = deepFreeze({
  id: "UNKNOWN_NOT_EVIDENCED",
  family: ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
  surface: "unknown role/permission model status gap",
  source_boundary_or_dependency: "UNKNOWN_NOT_EVIDENCED",
  current_statuses: [
    ROLE_PERMISSION_MODEL_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
  ],
  primary_absent_capability: "UNKNOWN_NOT_EVIDENCED",
  implementation_gap: "UNKNOWN_NOT_EVIDENCED",
  required_prerequisites: [],
  required_test_evidence: [],
  overclaim_risk: "UNKNOWN_NOT_EVIDENCED",
  current_authorization_status:
    ROLE_PERMISSION_MODEL_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
  future_boundary_posture: "UNKNOWN_NOT_EVIDENCED",
  non_authorized_until_closure: true,
  related_material_classes: [],
  related_storage_location_ids: [],
  related_admin_support_gap_ids: [],
  related_third_party_status_gap_ids: [],
  related_raw_material_routing_control_ids: [],
  related_aal_event_candidate_ids: [],
  related_lifecycle_families: [],
  related_global_access_control_row_ids: [],
  related_runtime_gate_candidate_ids: [],
  related_rbac_boundary_status: "UNKNOWN_NOT_EVIDENCED",
  evidence_posture:
    ROLE_PERMISSION_MODEL_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
  non_authorizations: BASE_NON_AUTHORIZATIONS,
  notes: "Unknown role/permission model status gap; fail closed.",
});

function listRolePermissionModelStatusGapFamilies() {
  return cloneAndFreeze(Object.values(ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES));
}

function listRolePermissionModelStatusGapRows() {
  return cloneAndFreeze(Object.values(ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY));
}

function getRolePermissionModelStatusGapRow(id) {
  const found = Object.values(ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY).find(
    (entry) => entry.id === id,
  );
  return cloneAndFreeze(found || UNKNOWN_ROW);
}

function hasRolePermissionModelStatusGapRow(id) {
  return Object.values(ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY).some(
    (entry) => entry.id === id,
  );
}

function classifyRolePermissionModelStatusGapRow(id) {
  const entry = getRolePermissionModelStatusGapRow(id);
  const known = entry.id !== UNKNOWN_ROW.id;
  return cloneAndFreeze({
    id: entry.id,
    known,
    classification: known
      ? "ROLE_PERMISSION_MODEL_STATUS_GAP"
      : "UNKNOWN_NOT_EVIDENCED",
    family: entry.family,
    current_authorization_status: entry.current_authorization_status,
    evidence_posture: entry.evidence_posture,
    authorized: false,
    access_granted: false,
    rbac_implemented: false,
    access_control_implemented: false,
    role_permission_model_created: false,
    role_schema_created: false,
    permission_schema_created: false,
    admin_support_access_authorized: false,
    log_viewer_rbac_created: false,
    runtime_gate_implemented: false,
    validator_dispatch_created: false,
    runtime_registry_lookup_created: false,
    security_finding_created: false,
    severity_assigned: false,
    remediation_recommended: false,
  });
}

function listRolePermissionModelNonOverclaimRules() {
  return cloneAndFreeze(ROLE_PERMISSION_MODEL_NON_OVERCLAIM_RULES);
}

function getRolePermissionModelRequiredPrerequisites() {
  return cloneAndFreeze(ROLE_PERMISSION_MODEL_REQUIRED_PREREQUISITES);
}

function getRolePermissionModelNonAuthorizationStatus() {
  return cloneAndFreeze({
    implementation_statuses: BASE_IMPLEMENTATION_STATUSES,
    decision_statuses: Object.values(ROLE_PERMISSION_MODEL_DECISION_STATUS),
    evidence_postures: Object.values(ROLE_PERMISSION_MODEL_EVIDENCE_POSTURE),
    non_overclaim_rules: ROLE_PERMISSION_MODEL_NON_OVERCLAIM_RULES,
    required_prerequisites: ROLE_PERMISSION_MODEL_REQUIRED_PREREQUISITES,
    local_logs_are_ci_evidence: false,
    ci_logs_are_release_evidence: false,
    human_review_gate_is_system_approval: false,
    route_case_capability_evidence_is_rbac: false,
    route_case_capability_evidence_is_full_access_control: false,
    route_case_capability_evidence_is_admin_support_access_control: false,
    route_case_capability_evidence_is_global_authorization_model: false,
    role_permission_model_created: false,
    rbac_implemented: false,
    access_control_implemented: false,
    security_finding_created: false,
    severity_assigned: false,
    remediation_recommended: false,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
  });
}

function isRolePermissionModelImplemented() {
  return false;
}

function isRbacImplemented() {
  return false;
}

function isAccessControlImplemented() {
  return false;
}

function isRoleSchemaCreated() {
  return false;
}

function isPermissionSchemaCreated() {
  return false;
}

function isAdminSupportAccessAuthorized() {
  return false;
}

function isLogViewerRbacCreated() {
  return false;
}

function isSecurityFindingCreated() {
  return false;
}

module.exports = {
  ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES,
  ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS,
  ROLE_PERMISSION_MODEL_DECISION_STATUS,
  ROLE_PERMISSION_MODEL_EVIDENCE_POSTURE,
  ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY,
  ROLE_PERMISSION_MODEL_NON_OVERCLAIM_RULES,
  ROLE_PERMISSION_MODEL_REQUIRED_PREREQUISITES,
  listRolePermissionModelStatusGapFamilies,
  listRolePermissionModelStatusGapRows,
  getRolePermissionModelStatusGapRow,
  classifyRolePermissionModelStatusGapRow,
  hasRolePermissionModelStatusGapRow,
  listRolePermissionModelNonOverclaimRules,
  getRolePermissionModelRequiredPrerequisites,
  getRolePermissionModelNonAuthorizationStatus,
  isRolePermissionModelImplemented,
  isRbacImplemented,
  isAccessControlImplemented,
  isRoleSchemaCreated,
  isPermissionSchemaCreated,
  isAdminSupportAccessAuthorized,
  isLogViewerRbacCreated,
  isSecurityFindingCreated,
  storageDataLocationRegistry: DATA_LOCATION_REGISTRY,
  storageMaterialClasses: MATERIAL_CLASSES,
  storageHighRiskMaterialClassesDenied: HIGH_RISK_MATERIAL_CLASSES_DENIED,
  lifecycleControlFamilies: LIFECYCLE_CONTROL_FAMILIES,
  auditAccessLogEventCandidates: AUDIT_ACCESS_LOG_EVENT_CANDIDATES,
  rawMaterialRoutingControlRegistry: RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
  thirdPartyRoutingStatusGapRegistry:
    THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
  adminSupportRuntimeReadinessStatusGapRegistry:
    ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
  globalAccessControlThreatModelInventoryRegistry:
    GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
  runtimeGateCandidateStatusInventoryRegistry:
    RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
};
