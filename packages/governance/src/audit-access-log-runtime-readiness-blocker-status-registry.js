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
const {
  ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY,
} = require("./role-permission-model-status-gap-registry.js");

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
const rolePermissionGapId = (key) =>
  ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY[key].id;

const AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_FAMILIES = deepFreeze({
  MATERIAL_INTAKE_EVENT_BLOCKER: "MATERIAL_INTAKE_EVENT_BLOCKER",
  BLOCKED_PROHIBITED_INGRESS_EVENT_BLOCKER:
    "BLOCKED_PROHIBITED_INGRESS_EVENT_BLOCKER",
  QUARANTINE_BLOCK_DECISION_EVENT_BLOCKER:
    "QUARANTINE_BLOCK_DECISION_EVENT_BLOCKER",
  REDACTION_SANITIZATION_EVENT_BLOCKER:
    "REDACTION_SANITIZATION_EVENT_BLOCKER",
  MATERIAL_ROUTING_EVENT_BLOCKER: "MATERIAL_ROUTING_EVENT_BLOCKER",
  REVIEW_ACCESS_EVENT_BLOCKER: "REVIEW_ACCESS_EVENT_BLOCKER",
  MANIFEST_VALIDATION_EVENT_BLOCKER: "MANIFEST_VALIDATION_EVENT_BLOCKER",
  EXPORT_DOWNLOAD_EVENT_BLOCKER: "EXPORT_DOWNLOAD_EVENT_BLOCKER",
  PACKET_DELIVERY_PROMOTION_EVENT_BLOCKER:
    "PACKET_DELIVERY_PROMOTION_EVENT_BLOCKER",
  LOCAL_LOG_TEST_TRANSCRIPT_HANDLING_EVENT_BLOCKER:
    "LOCAL_LOG_TEST_TRANSCRIPT_HANDLING_EVENT_BLOCKER",
  ADMIN_SUPPORT_ACCESS_ATTEMPT_EVENT_BLOCKER:
    "ADMIN_SUPPORT_ACCESS_ATTEMPT_EVENT_BLOCKER",
  RETENTION_DELETION_OPERATION_EVENT_BLOCKER:
    "RETENTION_DELETION_OPERATION_EVENT_BLOCKER",
  THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT_BLOCKER:
    "THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT_BLOCKER",
  RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE_EVENT_BLOCKER:
    "RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE_EVENT_BLOCKER",
  HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT_BLOCKER:
    "HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT_BLOCKER",
  AUDIT_LOG_VIEWER_ACCESS_EVENT_BLOCKER:
    "AUDIT_LOG_VIEWER_ACCESS_EVENT_BLOCKER",
  ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS_EVENT_BLOCKER:
    "ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS_EVENT_BLOCKER",
});

const AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS = deepFreeze({
  NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION:
    "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
  NOT_AUDIT_LOGGING_IMPLEMENTATION: "NOT_AUDIT_LOGGING_IMPLEMENTATION",
  NOT_ACCESS_LOGGING_IMPLEMENTATION: "NOT_ACCESS_LOGGING_IMPLEMENTATION",
  NOT_EVENT_TAXONOMY_RUNTIME_CODE:
    "NOT_EVENT_TAXONOMY_RUNTIME_CODE",
  NOT_EVENT_EMITTER_IMPLEMENTATION: "NOT_EVENT_EMITTER_IMPLEMENTATION",
  NOT_LOG_SCHEMA: "NOT_LOG_SCHEMA",
  NOT_LOG_STORAGE: "NOT_LOG_STORAGE",
  NOT_LOG_VIEWER_RBAC: "NOT_LOG_VIEWER_RBAC",
  NOT_RBAC_IMPLEMENTATION: "NOT_RBAC_IMPLEMENTATION",
  NOT_ACCESS_CONTROL_IMPLEMENTATION: "NOT_ACCESS_CONTROL_IMPLEMENTATION",
  NOT_ROLE_PERMISSION_MODEL: "NOT_ROLE_PERMISSION_MODEL",
  NOT_ADMIN_SUPPORT_MODEL: "NOT_ADMIN_SUPPORT_MODEL",
  NOT_RUNTIME_GATE_IMPLEMENTATION: "NOT_RUNTIME_GATE_IMPLEMENTATION",
  NOT_RUNTIME_ENFORCEMENT: "NOT_RUNTIME_ENFORCEMENT",
  NOT_VALIDATOR_DISPATCH: "NOT_VALIDATOR_DISPATCH",
  NOT_RUNTIME_REGISTRY_LOOKUP: "NOT_RUNTIME_REGISTRY_LOOKUP",
  NOT_RETENTION_DELETION_IMPLEMENTATION:
    "NOT_RETENTION_DELETION_IMPLEMENTATION",
  NOT_THIRD_PARTY_ROUTING_AUTHORIZATION:
    "NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
  NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION:
    "NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
  NOT_SECURITY_FINDING: "NOT_SECURITY_FINDING",
  NO_SEVERITY_ASSIGNED: "NO_SEVERITY_ASSIGNED",
  NO_REMEDIATION_RECOMMENDED: "NO_REMEDIATION_RECOMMENDED",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS = deepFreeze({
  DOCS_ONLY_BLOCKER_STATUS: "DOCS_ONLY_BLOCKER_STATUS",
  REGISTRY_SCAFFOLD_ONLY: "REGISTRY_SCAFFOLD_ONLY",
  FUTURE_EVENT_CANDIDATE_ONLY: "FUTURE_EVENT_CANDIDATE_ONLY",
  NO_CONTENT_EVENT_SPECIFICATION_ONLY:
    "NO_CONTENT_EVENT_SPECIFICATION_ONLY",
  RUNTIME_READINESS_BLOCKED: "RUNTIME_READINESS_BLOCKED",
  RUNTIME_GATE_INVENTORY_DEFERRED: "RUNTIME_GATE_INVENTORY_DEFERRED",
  NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT:
    "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  BLOCKED_BY_EVENT_TAXONOMY_RUNTIME_CODE:
    "BLOCKED_BY_EVENT_TAXONOMY_RUNTIME_CODE",
  BLOCKED_BY_LOG_SCHEMA: "BLOCKED_BY_LOG_SCHEMA",
  BLOCKED_BY_LOG_STORAGE: "BLOCKED_BY_LOG_STORAGE",
  BLOCKED_BY_RBAC_MODEL: "BLOCKED_BY_RBAC_MODEL",
  BLOCKED_BY_ADMIN_SUPPORT_MODEL: "BLOCKED_BY_ADMIN_SUPPORT_MODEL",
  BLOCKED_BY_RETENTION_DELETION: "BLOCKED_BY_RETENTION_DELETION",
  BLOCKED_BY_THIRD_PARTY_ROUTING: "BLOCKED_BY_THIRD_PARTY_ROUTING",
  BLOCKED_BY_RAW_MATERIAL_ROUTING: "BLOCKED_BY_RAW_MATERIAL_ROUTING",
  BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL:
    "BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE = deepFreeze({
  DOCS_ONLY_BLOCKER_STATUS: "DOCS_ONLY_BLOCKER_STATUS",
  REGISTRY_SCAFFOLD_EVIDENCE: "REGISTRY_SCAFFOLD_EVIDENCE",
  TESTED_ALIGNMENT_EVIDENCE: "TESTED_ALIGNMENT_EVIDENCE",
  CI_TESTED_SCENARIO_EVIDENCE: "CI_TESTED_SCENARIO_EVIDENCE",
  FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED:
    "FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED",
  LOCAL_LOGS_NOT_CI_EVIDENCE: "LOCAL_LOGS_NOT_CI_EVIDENCE",
  LOCAL_LOGS_NOT_PACKET_COMPONENTS: "LOCAL_LOGS_NOT_PACKET_COMPONENTS",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const ALLOWED_FUTURE_EVENT_CONTENT = deepFreeze([
  "subject reference category",
  "role or permission concept",
  "tenant and case scope category",
  "material class",
  "route surface descriptor",
  "decision status",
  "timestamp category",
  "reason code",
  "no raw marker",
  "no private marker",
  "no source locator marker",
  "provider category reference",
  "blocker or gap reference",
]);

const PROHIBITED_EVENT_LOG_CONTENT = deepFreeze([
  "raw text",
  "private facts",
  "source locators",
  "filenames or private paths",
  "page references",
  "URLs",
  "tokens",
  "secrets",
  "provider payloads",
  "prompts",
  "responses",
  "PDF image screenshot metadata content",
  "sensitive personal details",
  "legal clinical evidentiary or case-truth conclusions",
  "product-candidate claims",
  "external-use claims",
  "release approval claims",
  "runtime certification claims",
  "technical sign-off claims",
]);

const BASE_IMPLEMENTATION_GAPS = deepFreeze([
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_AUDIT_LOGGING_IMPLEMENTATION,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_ACCESS_LOGGING_IMPLEMENTATION,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_EVENT_TAXONOMY_RUNTIME_CODE,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_EVENT_EMITTER_IMPLEMENTATION,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS.NOT_LOG_SCHEMA,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS.NOT_LOG_STORAGE,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS.NOT_LOG_VIEWER_RBAC,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS.NOT_RBAC_IMPLEMENTATION,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_ACCESS_CONTROL_IMPLEMENTATION,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_ROLE_PERMISSION_MODEL,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_ADMIN_SUPPORT_MODEL,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_RUNTIME_GATE_IMPLEMENTATION,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_RUNTIME_ENFORCEMENT,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_VALIDATOR_DISPATCH,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_RUNTIME_REGISTRY_LOOKUP,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_RETENTION_DELETION_IMPLEMENTATION,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_THIRD_PARTY_ROUTING_AUTHORIZATION,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS.NOT_SECURITY_FINDING,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS.NO_SEVERITY_ASSIGNED,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
    .NO_REMEDIATION_RECOMMENDED,
]);

const BASE_CURRENT_RUNTIME_READINESS_STATUS = deepFreeze([
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS.DOCS_ONLY_BLOCKER_STATUS,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS.REGISTRY_SCAFFOLD_ONLY,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
    .FUTURE_EVENT_CANDIDATE_ONLY,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
    .NO_CONTENT_EVENT_SPECIFICATION_ONLY,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
    .RUNTIME_READINESS_BLOCKED,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
    .RUNTIME_GATE_INVENTORY_DEFERRED,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
    .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
]);

const BASE_NON_AUTHORIZATIONS = deepFreeze({
  authorized: false,
  access_granted: false,
  audit_access_log_implemented: false,
  current_logging_implemented: false,
  audit_logging_implemented: false,
  access_logging_implemented: false,
  event_taxonomy_runtime_code_created: false,
  event_emitter_implemented: false,
  log_schema_created: false,
  log_storage_created: false,
  log_viewer_rbac_created: false,
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
  system_approval_created: false,
});

const AUDIT_ACCESS_LOG_RUNTIME_READINESS_NON_OVERCLAIM_RULES = deepFreeze([
  "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_REGISTRY does not mean AUDIT_ACCESS_LOG_IMPLEMENTATION",
  "AUDIT_ACCESS_LOG_BLOCKER_ROW does not mean CURRENT_LOGGING",
  "EVENT_FAMILY_CANDIDATE does not mean EVENT_TAXONOMY_RUNTIME_CODE",
  "EVENT_TYPE_CANDIDATE does not mean EVENT_EMITTER",
  "ACCESS_LOG_EVENT_CANDIDATE does not mean ACCESS_LOGGING_IMPLEMENTATION",
  "AUDIT_LOG_EVENT_CANDIDATE does not mean AUDIT_LOGGING_IMPLEMENTATION",
  "ALLOWED_EVENT_CONTENT does not mean LOG_BODY_STORAGE",
  "NO_CONTENT_EVENT_SPECIFICATION does not mean LOG_SCHEMA",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "LOCAL_LOG does not mean PACKET_COMPONENT",
  "CI_LOG does not mean RELEASE_EVIDENCE",
  "LOG_VIEWER_ACCESS_EVENT_BLOCKER does not mean LOG_VIEWER_RBAC",
  "ADMIN_SUPPORT_LOG_ACCESS_BLOCKER does not mean ADMIN_SUPPORT_ACCESS_AUTHORIZED",
  "RUNTIME_GATE_CANDIDATE_EVENT does not mean RUNTIME_GATE_IMPLEMENTATION",
  "FUTURE_IMPLEMENTATION_EVIDENCE does not mean CURRENT_IMPLEMENTATION_EVIDENCE",
  "REQUIRED_TEST_EVIDENCE does not mean CURRENT_CLOSURE",
  "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
  "BLOCKER_ROW does not mean SECURITY_FINDING",
  "BLOCKER_ROW does not mean SEVERITY_ASSIGNED",
  "BLOCKER_ROW does not mean REMEDIATION_RECOMMENDED",
]);

const AUDIT_ACCESS_LOG_RUNTIME_READINESS_REQUIRED_PREREQUISITES = deepFreeze([
  "audit/access-log implementation plan",
  "event taxonomy runtime code",
  "no-content event policy",
  "event emitter design",
  "log schema",
  "log storage policy",
  "log viewer RBAC model",
  "role/permission model",
  "actor/subject model",
  "RBAC/access-control implementation plan",
  "admin/support model",
  "admin/support access-control model",
  "retention/deletion/purge/erasure policy",
  "encryption/key-management policy",
  "third-party provider status registry",
  "third-party provider route denial tests",
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
  "no-raw/no-private/no-source-locator policy",
  "local-log non-CI wording",
  "CI-log non-release wording",
  "external-use non-authorization wording",
  "non-proof/non-route-readiness wording",
  "human/professional review gate",
]);

const BASE_REQUIRED_IMPLEMENTATION_EVIDENCE = deepFreeze([
  "event taxonomy runtime code evidence",
  "event emitter implementation evidence",
  "log schema evidence",
  "log storage evidence",
  "log viewer RBAC evidence",
  "RBAC/access-control implementation evidence",
  "runtime gate implementation evidence",
  "validator dispatch evidence",
  "runtime registry lookup evidence",
  "retention/deletion policy evidence",
]);

const BASE_REQUIRED_TEST_EVIDENCE = deepFreeze([
  "focused registry unit test",
  "AAL storage dependency alignment test",
  "role-permission model alignment test",
  "runtime gate candidate alignment test",
  "global access-control inventory alignment test",
  "admin/support readiness alignment test",
  "CI evidence hardening workflow",
]);

const BASE_EVIDENCE_POSTURE = deepFreeze([
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE
    .DOCS_ONLY_BLOCKER_STATUS,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE
    .REGISTRY_SCAFFOLD_EVIDENCE,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE
    .TESTED_ALIGNMENT_EVIDENCE,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE
    .CI_TESTED_SCENARIO_EVIDENCE,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE
    .FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE
    .LOCAL_LOGS_NOT_CI_EVIDENCE,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE
    .LOCAL_LOGS_NOT_PACKET_COMPONENTS,
]);

const baseMaterialClasses = deepFreeze([
  materialClass("AUDIT_ACCESS_EVENT_RECORD"),
  materialClass("LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL"),
  materialClass("CI_LOG_OR_WORKFLOW_ARTIFACT"),
  materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL"),
]);

const baseStorageLocationIds = deepFreeze([
  locationId("L02_REPO_TRACKED_TEST_FILES"),
  locationId("L08_GITHUB_ACTIONS_CI_LOGS"),
  locationId("L10_LOCAL_TEST_LOGS"),
  locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"),
]);

const defaultReferences = deepFreeze({
  rolePermissionGapIds: [
    rolePermissionGapId("RP_SG_013_LOG_VIEWER_RBAC_GAP"),
    rolePermissionGapId("RP_SG_014_AUDIT_ACCESS_LOG_DEPENDENCY_GAP"),
  ],
  adminSupportGapIds: [
    adminGapId("ADMIN-SUPPORT-GAP-007_ADMIN_SUPPORT_LOG_VIEWER_RBAC_ABSENT"),
  ],
  thirdPartyStatusGapIds: [
    tprGapId("TPR-STATUS-GAP-005_PROVIDER_AUDITABILITY_LOGGING_GAP"),
  ],
  rawMaterialRoutingControlIds: [
    rmrControlId("RMR_CS_005_LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL"),
  ],
  lifecycleFamilies: [
    lifecycleFamily("RETENTION"),
    lifecycleFamily("DELETION"),
    lifecycleFamily("ENCRYPTION"),
    lifecycleFamily("KEY_MANAGEMENT"),
  ],
  globalAccessControlRowIds: [
    gacRowId("GAC-TM-009_ROLE_PERMISSION_MODEL_GAP"),
    gacRowId("GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP"),
  ],
  runtimeGateCandidateIds: [
    runtimeGateId("RBAC_GC_012_AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE"),
  ],
});

const rowDefinitions = [
  [
    "AAL-RUNTIME-BLOCKER-001_MATERIAL_INTAKE_EVENT",
    "MATERIAL_INTAKE_EVENT",
    "MATERIAL_INTAKE_EVENT_BLOCKER",
    "material intake audit/access event candidate",
    "material_intake",
    "MATERIAL_INTAKE_ATTEMPT",
    "BLOCKED_BY_EVENT_TAXONOMY_RUNTIME_CODE",
    [aalEventId("AAL-EVENT-001_MATERIAL_INTAKE_ATTEMPT")],
    [runtimeGateId("RBAC_GC_001_MATERIAL_INTAKE_AUTHORIZATION_GATE_CANDIDATE")],
    [gacRowId("GAC-TM-001_AUTH_REQUEST_CONTEXT_PARTIAL")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-002_BLOCKED_PROHIBITED_INGRESS_EVENT",
    "BLOCKED_PROHIBITED_INGRESS_EVENT",
    "BLOCKED_PROHIBITED_INGRESS_EVENT_BLOCKER",
    "blocked prohibited ingress audit event candidate",
    "blocked_ingress",
    "BLOCKED_PROHIBITED_INGRESS",
    "BLOCKED_BY_RAW_MATERIAL_ROUTING",
    [aalEventId("AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS")],
    [
      runtimeGateId(
        "RBAC_GC_005_RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE",
      ),
    ],
    [gacRowId("GAC-TM-014_ALLOWED_DENIED_TEST_COVERAGE_PARTIAL")],
    [materialClass("RAW_PRIVATE_SOURCE_MATERIAL")],
    [rmrControlId("RMR_CS_006_RAW_PRIVATE_SOURCE_MATERIAL")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-003_QUARANTINE_BLOCK_DECISION_EVENT",
    "QUARANTINE_BLOCK_DECISION_EVENT",
    "QUARANTINE_BLOCK_DECISION_EVENT_BLOCKER",
    "quarantine block decision audit event candidate",
    "quarantine_decision",
    "QUARANTINE_BLOCK_DECISION",
    "BLOCKED_BY_RAW_MATERIAL_ROUTING",
    [aalEventId("AAL-EVENT-003_QUARANTINE_BLOCK_DECISION")],
    [
      runtimeGateId(
        "RBAC_GC_006_SOURCE_PACKAGE_DENY_QUARANTINE_GATE_CANDIDATE",
      ),
    ],
    [gacRowId("GAC-TM-015_CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL")],
    [materialClass("SOURCE_PACKAGE_MATERIAL")],
    [rmrControlId("RMR_CS_007_SOURCE_PACKAGE_MATERIAL")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-004_REDACTION_SANITIZATION_EVENT",
    "REDACTION_SANITIZATION_EVENT",
    "REDACTION_SANITIZATION_EVENT_BLOCKER",
    "redaction sanitization audit event candidate",
    "redaction_sanitization",
    "REDACTION_SANITIZATION",
    "BLOCKED_BY_EVENT_TAXONOMY_RUNTIME_CODE",
    [aalEventId("AAL-EVENT-004_REDACTION_SANITIZATION")],
    [
      runtimeGateId(
        "RBAC_GC_003_MATERIAL_REDACTION_SANITIZATION_GATE_CANDIDATE",
      ),
    ],
    [gacRowId("GAC-TM-004_CAPABILITY_GATES_PARTIAL")],
    [materialClass("REDACTED_REVIEW_SIGNAL_MATERIAL")],
    [rmrControlId("RMR_CS_002_REDACTED_REVIEW_SIGNAL_MATERIAL")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-005_MATERIAL_ROUTING_EVENT",
    "MATERIAL_ROUTING_EVENT",
    "MATERIAL_ROUTING_EVENT_BLOCKER",
    "material routing audit event candidate",
    "material_routing",
    "MATERIAL_ROUTING_DECISION",
    "BLOCKED_BY_RAW_MATERIAL_ROUTING",
    [aalEventId("AAL-EVENT-005_MATERIAL_ROUTING_DECISION")],
    [
      runtimeGateId("RBAC_GC_004_MATERIAL_ROUTING_DECISION_GATE_CANDIDATE"),
    ],
    [gacRowId("GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL")],
    [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
    [rmrControlId("RMR_CS_003_NO_RAW_METADATA_MANIFEST_MATERIAL")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-006_REVIEW_ACCESS_EVENT",
    "REVIEW_ACCESS_EVENT",
    "REVIEW_ACCESS_EVENT_BLOCKER",
    "review access event candidate",
    "review_access",
    "REVIEW_ACCESS",
    "BLOCKED_BY_RBAC_MODEL",
    [aalEventId("AAL-EVENT-006_REVIEW_ACCESS")],
    [runtimeGateId("RBAC_GC_008_REVIEW_ACCESS_GATE_CANDIDATE")],
    [gacRowId("GAC-TM-003_CASE_CONTEXT_ACCESS_CONTROL_PARTIAL")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-007_MANIFEST_VALIDATION_EVENT",
    "MANIFEST_VALIDATION_EVENT",
    "MANIFEST_VALIDATION_EVENT_BLOCKER",
    "manifest validation event candidate",
    "manifest_validation",
    "MANIFEST_VALIDATION",
    "BLOCKED_BY_EVENT_TAXONOMY_RUNTIME_CODE",
    [aalEventId("AAL-EVENT-007_MANIFEST_VALIDATION")],
    [runtimeGateId("RBAC_GC_016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE")],
    [gacRowId("GAC-TM-013_SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL")],
    [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
    [rmrControlId("RMR_CS_003_NO_RAW_METADATA_MANIFEST_MATERIAL")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-008_EXPORT_DOWNLOAD_EVENT",
    "EXPORT_DOWNLOAD_EVENT",
    "EXPORT_DOWNLOAD_EVENT_BLOCKER",
    "export download access event candidate",
    "export_download",
    "EXPORT_DOWNLOAD_ACCESS",
    "BLOCKED_BY_RBAC_MODEL",
    [aalEventId("AAL-EVENT-008_EXPORT_DOWNLOAD_ACCESS")],
    [runtimeGateId("RBAC_GC_009_EXPORT_DOWNLOAD_ACCESS_GATE_CANDIDATE")],
    [gacRowId("GAC-TM-011_EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL")],
    [materialClass("GENERATED_ARTIFACT_OR_EXPORT_MATERIAL")],
    [rmrControlId("RMR_CS_004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL")],
    [locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-009_PACKET_DELIVERY_PROMOTION_EVENT",
    "PACKET_DELIVERY_PROMOTION_EVENT",
    "PACKET_DELIVERY_PROMOTION_EVENT_BLOCKER",
    "packet delivery promotion event candidate",
    "packet_delivery_promotion",
    "PACKET_DELIVERY_PROMOTION_ATTEMPT",
    "BLOCKED_BY_RBAC_MODEL",
    [aalEventId("AAL-EVENT-009_PACKET_DELIVERY_PROMOTION_ATTEMPT")],
    [runtimeGateId("RBAC_GC_010_PACKET_DELIVERY_PROMOTION_GATE_CANDIDATE")],
    [gacRowId("GAC-TM-011_EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL")],
    [materialClass("GENERATED_ARTIFACT_OR_EXPORT_MATERIAL")],
    [rmrControlId("RMR_CS_004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL")],
    [locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-010_LOCAL_LOG_TEST_TRANSCRIPT_HANDLING_EVENT",
    "LOCAL_LOG_TEST_TRANSCRIPT_HANDLING_EVENT",
    "LOCAL_LOG_TEST_TRANSCRIPT_HANDLING_EVENT_BLOCKER",
    "local log and test transcript event candidate",
    "local_log_test_transcript_handling",
    "LOCAL_LOG_TEST_TRANSCRIPT_HANDLING",
    "BLOCKED_BY_LOG_STORAGE",
    [aalEventId("AAL-EVENT-010_LOCAL_LOG_TEST_TRANSCRIPT_HANDLING")],
    [runtimeGateId("RBAC_GC_012_AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE")],
    [gacRowId("GAC-TM-014_ALLOWED_DENIED_TEST_COVERAGE_PARTIAL")],
    [materialClass("LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL")],
    [rmrControlId("RMR_CS_005_LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL")],
    [locationId("L10_LOCAL_TEST_LOGS")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-011_ADMIN_SUPPORT_ACCESS_ATTEMPT_EVENT",
    "ADMIN_SUPPORT_ACCESS_ATTEMPT_EVENT",
    "ADMIN_SUPPORT_ACCESS_ATTEMPT_EVENT_BLOCKER",
    "admin support access attempt event candidate",
    "admin_support_access_attempt",
    "ADMIN_SUPPORT_ACCESS_ATTEMPT",
    "BLOCKED_BY_ADMIN_SUPPORT_MODEL",
    [aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT")],
    [runtimeGateId("RBAC_GC_014_ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE")],
    [gacRowId("GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP")],
    [materialClass("AUDIT_ACCESS_EVENT_RECORD")],
    [],
    [],
    [adminGapId("ADMIN-SUPPORT-GAP-001_ADMIN_SUPPORT_MODEL_ABSENT")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-012_RETENTION_DELETION_OPERATION_EVENT",
    "RETENTION_DELETION_OPERATION_EVENT",
    "RETENTION_DELETION_OPERATION_EVENT_BLOCKER",
    "retention deletion operation event candidate",
    "retention_deletion_operation",
    "RETENTION_DELETION_OPERATION",
    "BLOCKED_BY_RETENTION_DELETION",
    [aalEventId("AAL-EVENT-012_RETENTION_DELETION_OPERATION")],
    [
      runtimeGateId(
        "RBAC_GC_013_RETENTION_DELETION_OPERATION_AUTHORIZATION_GATE_CANDIDATE",
      ),
    ],
    [gacRowId("GAC-TM-004_CAPABILITY_GATES_PARTIAL")],
    [materialClass("AUDIT_ACCESS_EVENT_RECORD")],
    [],
    [],
    [adminGapId("ADMIN-SUPPORT-GAP-009_ADMIN_SUPPORT_LIFECYCLE_EXECUTION_DENIED")],
    [],
    [],
    [lifecycleFamily("RETENTION"), lifecycleFamily("DELETION"), lifecycleFamily("PURGE")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT",
    "THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT",
    "THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT_BLOCKER",
    "third-party route denial approval event candidate",
    "third_party_route_denial_approval",
    "THIRD_PARTY_ROUTE_DENIAL_APPROVAL",
    "BLOCKED_BY_THIRD_PARTY_ROUTING",
    [aalEventId("AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL")],
    [
      runtimeGateId(
        "RBAC_GC_011_THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE",
      ),
    ],
    [gacRowId("GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL")],
    [materialClass("THIRD_PARTY_MODEL_API_ROUTED_MATERIAL")],
    [rmrControlId("RMR_CS_009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL")],
    [locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE")],
    [adminGapId("ADMIN-SUPPORT-GAP-008_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_DENIED")],
    [
      tprGapId("TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS"),
      tprGapId("TPR-STATUS-GAP-010_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP"),
    ],
  ],
  [
    "AAL-RUNTIME-BLOCKER-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE_EVENT",
    "RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE_EVENT",
    "RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE_EVENT_BLOCKER",
    "runtime schema workflow gate candidate event",
    "runtime_schema_workflow_gate_candidate",
    "RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE",
    "BLOCKED_BY_EVENT_TAXONOMY_RUNTIME_CODE",
    [aalEventId("AAL-EVENT-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE")],
    [
      runtimeGateId(
        "RBAC_GC_016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE",
      ),
    ],
    [
      gacRowId(
        "GAC-TM-013_SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL",
      ),
    ],
  ],
  [
    "AAL-RUNTIME-BLOCKER-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT",
    "HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT",
    "HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT_BLOCKER",
    "human professional review access event candidate",
    "human_professional_review_access",
    "HUMAN_PROFESSIONAL_REVIEW_ACCESS",
    "BLOCKED_BY_RBAC_MODEL",
    [aalEventId("AAL-EVENT-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS")],
    [runtimeGateId("RBAC_GC_017_HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE")],
    [gacRowId("GAC-TM-001_AUTH_REQUEST_CONTEXT_PARTIAL")],
    [materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL")],
    [rmrControlId("RMR_CS_010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-016_AUDIT_LOG_VIEWER_ACCESS_EVENT",
    "AUDIT_LOG_VIEWER_ACCESS_EVENT",
    "AUDIT_LOG_VIEWER_ACCESS_EVENT_BLOCKER",
    "audit log viewer access event candidate",
    "audit_log_viewer_access",
    "AUDIT_LOG_VIEWER_ACCESS",
    "BLOCKED_BY_RBAC_MODEL",
    [aalEventId("AAL-EVENT-016_AUDIT_LOG_VIEWER_ACCESS")],
    [runtimeGateId("RBAC_GC_012_AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE")],
    [gacRowId("GAC-TM-009_ROLE_PERMISSION_MODEL_GAP")],
    [materialClass("AUDIT_ACCESS_EVENT_RECORD")],
    [],
    [locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE")],
    [adminGapId("ADMIN-SUPPORT-GAP-007_ADMIN_SUPPORT_LOG_VIEWER_RBAC_ABSENT")],
  ],
  [
    "AAL-RUNTIME-BLOCKER-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS_EVENT",
    "ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS_EVENT",
    "ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS_EVENT_BLOCKER",
    "admin support privileged log access event candidate",
    "admin_support_privileged_log_access",
    "ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS",
    "BLOCKED_BY_ADMIN_SUPPORT_MODEL",
    [aalEventId("AAL-EVENT-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS")],
    [runtimeGateId("RBAC_GC_014_ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE")],
    [gacRowId("GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP")],
    [materialClass("AUDIT_ACCESS_EVENT_RECORD")],
    [],
    [locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE")],
    [adminGapId("ADMIN-SUPPORT-GAP-007_ADMIN_SUPPORT_LOG_VIEWER_RBAC_ABSENT")],
  ],
];

function makeRow([
  id,
  sourceBlockerId,
  familyKey,
  surface,
  eventFamilyCandidate,
  eventTypeCandidate,
  primaryBlocker,
  aalEventIds,
  runtimeGateIds,
  gacRowIds,
  extraMaterialClasses = [],
  rawMaterialRoutingIds = [],
  extraStorageIds = [],
  adminGapIds = [],
  thirdPartyGapIds = [],
  lifecycleFamilies = [],
]) {
  return [
    id,
    deepFreeze({
      id,
      source_blocker_id: sourceBlockerId,
      family: AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_FAMILIES[familyKey],
      audit_access_log_surface: surface,
      event_family_candidate: eventFamilyCandidate,
      event_type_candidate: eventTypeCandidate,
      allowed_future_event_content: ALLOWED_FUTURE_EVENT_CONTENT,
      prohibited_event_log_content: PROHIBITED_EVENT_LOG_CONTENT,
      no_raw_no_private_no_source_locator_requirement: true,
      primary_blocker:
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS[primaryBlocker],
      secondary_blockers: [
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
          .BLOCKED_BY_LOG_SCHEMA,
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
          .BLOCKED_BY_LOG_STORAGE,
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
          .BLOCKED_BY_RBAC_MODEL,
      ],
      implementation_gap: BASE_IMPLEMENTATION_GAPS,
      required_prerequisites:
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_REQUIRED_PREREQUISITES,
      required_implementation_evidence: BASE_REQUIRED_IMPLEMENTATION_EVIDENCE,
      required_test_evidence: BASE_REQUIRED_TEST_EVIDENCE,
      overclaim_risk:
        "Treating a future no-content event candidate as current audit/access logging, proof, runtime enforcement, access authorization, release approval, external-use authorization, product readiness, security finding, severity, or remediation.",
      current_runtime_readiness_status: BASE_CURRENT_RUNTIME_READINESS_STATUS,
      current_authorization_status:
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
          .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
      future_boundary_posture:
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
          .FUTURE_EVENT_CANDIDATE_ONLY,
      non_authorized_until_closure: BASE_NON_AUTHORIZATIONS,
      related_material_classes: [
        ...new Set([...baseMaterialClasses, ...extraMaterialClasses]),
      ],
      related_storage_location_ids: [
        ...new Set([...baseStorageLocationIds, ...extraStorageIds]),
      ],
      related_role_permission_gap_ids:
        defaultReferences.rolePermissionGapIds,
      related_admin_support_gap_ids: [
        ...new Set([...defaultReferences.adminSupportGapIds, ...adminGapIds]),
      ],
      related_third_party_status_gap_ids: [
        ...new Set([
          ...defaultReferences.thirdPartyStatusGapIds,
          ...thirdPartyGapIds,
        ]),
      ],
      related_raw_material_routing_control_ids: [
        ...new Set([
          ...defaultReferences.rawMaterialRoutingControlIds,
          ...rawMaterialRoutingIds,
        ]),
      ],
      related_aal_event_candidate_ids: aalEventIds,
      related_lifecycle_families: [
        ...new Set([...defaultReferences.lifecycleFamilies, ...lifecycleFamilies]),
      ],
      related_global_access_control_row_ids: [
        ...new Set([...defaultReferences.globalAccessControlRowIds, ...gacRowIds]),
      ],
      related_runtime_gate_candidate_ids: [
        ...new Set([
          ...defaultReferences.runtimeGateCandidateIds,
          ...runtimeGateIds,
        ]),
      ],
      related_rbac_boundary_status: [
        rolePermissionGapId("RP_SG_001_ACTOR_SUBJECT_MODEL_GAP"),
        rolePermissionGapId("RP_SG_018_RUNTIME_GATE_DEPENDENCY_GAP"),
      ],
      evidence_posture: BASE_EVIDENCE_POSTURE,
      non_authorizations: BASE_NON_AUTHORIZATIONS,
      notes:
        "Scaffold row only; no runtime audit/access logging, event emission, log storage, RBAC, runtime gate, security finding, severity, remediation, release, external-use, product-candidate, certification, or sign-off is created.",
    }),
  ];
}

const AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY = deepFreeze(
  Object.fromEntries(rowDefinitions.map(makeRow)),
);

function listAuditAccessLogRuntimeReadinessBlockerFamilies() {
  return cloneAndFreeze(
    Object.values(AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_FAMILIES),
  );
}

function listAuditAccessLogRuntimeReadinessBlockerRows() {
  return cloneAndFreeze(
    Object.values(AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY),
  );
}

function getAuditAccessLogRuntimeReadinessBlockerRow(id) {
  const row = AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY[id];
  if (!row) {
    return cloneAndFreeze({
      id,
      source_blocker_id:
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
          .UNKNOWN_NOT_EVIDENCED,
      family:
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
          .UNKNOWN_NOT_EVIDENCED,
      current_runtime_readiness_status: [
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS
          .UNKNOWN_NOT_EVIDENCED,
      ],
      current_authorization_status:
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
      evidence_posture: [
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE
          .UNKNOWN_NOT_EVIDENCED,
      ],
      non_authorizations: BASE_NON_AUTHORIZATIONS,
    });
  }

  return cloneAndFreeze(row);
}

function classifyAuditAccessLogRuntimeReadinessBlockerRow(id) {
  const row = AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY[id];
  if (!row) {
    return cloneAndFreeze({
      id,
      known: false,
      classification:
        AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
      authorized: false,
      audit_access_log_implemented: false,
      current_logging_implemented: false,
      security_finding_created: false,
    });
  }

  return cloneAndFreeze({
    id: row.id,
    known: true,
    classification: row.family,
    current_runtime_readiness_status: row.current_runtime_readiness_status,
    current_authorization_status: row.current_authorization_status,
    evidence_posture: row.evidence_posture,
    authorized: false,
    audit_access_log_implemented: false,
    current_logging_implemented: false,
    security_finding_created: false,
  });
}

function hasAuditAccessLogRuntimeReadinessBlockerRow(id) {
  return Object.prototype.hasOwnProperty.call(
    AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
    id,
  );
}

function listAuditAccessLogRuntimeReadinessNonOverclaimRules() {
  return cloneAndFreeze(
    AUDIT_ACCESS_LOG_RUNTIME_READINESS_NON_OVERCLAIM_RULES,
  );
}

function getAuditAccessLogRuntimeReadinessRequiredPrerequisites() {
  return cloneAndFreeze(
    AUDIT_ACCESS_LOG_RUNTIME_READINESS_REQUIRED_PREREQUISITES,
  );
}

function getAuditAccessLogRuntimeReadinessNonAuthorizationStatus() {
  return cloneAndFreeze({
    ...BASE_NON_AUTHORIZATIONS,
    high_risk_material_classes_denied: Object.values(
      HIGH_RISK_MATERIAL_CLASSES_DENIED,
    ),
    local_logs_are_ci_evidence: false,
    local_logs_are_packet_components: false,
    ci_logs_are_release_evidence: false,
    human_review_gate_is_system_approval: false,
  });
}

function isAuditAccessLogImplemented() {
  return false;
}

function isCurrentLoggingImplemented() {
  return false;
}

function isEventTaxonomyRuntimeCodeCreated() {
  return false;
}

function isEventEmitterImplemented() {
  return false;
}

function isLogSchemaCreated() {
  return false;
}

function isLogStorageCreated() {
  return false;
}

function isLogViewerRbacCreated() {
  return false;
}

function isSecurityFindingCreated() {
  return false;
}

module.exports = {
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_FAMILIES,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_IMPLEMENTATION_STATUS,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_NON_OVERCLAIM_RULES,
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_REQUIRED_PREREQUISITES,
  classifyAuditAccessLogRuntimeReadinessBlockerRow,
  getAuditAccessLogRuntimeReadinessBlockerRow,
  getAuditAccessLogRuntimeReadinessNonAuthorizationStatus,
  getAuditAccessLogRuntimeReadinessRequiredPrerequisites,
  hasAuditAccessLogRuntimeReadinessBlockerRow,
  isAuditAccessLogImplemented,
  isCurrentLoggingImplemented,
  isEventEmitterImplemented,
  isEventTaxonomyRuntimeCodeCreated,
  isLogSchemaCreated,
  isLogStorageCreated,
  isLogViewerRbacCreated,
  isSecurityFindingCreated,
  listAuditAccessLogRuntimeReadinessBlockerFamilies,
  listAuditAccessLogRuntimeReadinessBlockerRows,
  listAuditAccessLogRuntimeReadinessNonOverclaimRules,
};
