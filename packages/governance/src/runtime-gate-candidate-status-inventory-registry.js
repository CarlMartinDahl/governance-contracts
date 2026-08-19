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

const RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES = deepFreeze({
  MATERIAL_INTAKE_AUTHORIZATION_GATE_CANDIDATE:
    "MATERIAL_INTAKE_AUTHORIZATION_GATE_CANDIDATE",
  MATERIAL_VIEW_ACCESS_GATE_CANDIDATE:
    "MATERIAL_VIEW_ACCESS_GATE_CANDIDATE",
  MATERIAL_REDACTION_SANITIZATION_GATE_CANDIDATE:
    "MATERIAL_REDACTION_SANITIZATION_GATE_CANDIDATE",
  MATERIAL_ROUTING_DECISION_GATE_CANDIDATE:
    "MATERIAL_ROUTING_DECISION_GATE_CANDIDATE",
  RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE:
    "RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE",
  SOURCE_PACKAGE_DENY_QUARANTINE_GATE_CANDIDATE:
    "SOURCE_PACKAGE_DENY_QUARANTINE_GATE_CANDIDATE",
  PDF_IMAGE_SCREENSHOT_METADATA_DENY_ACQUISITION_GATE_CANDIDATE:
    "PDF_IMAGE_SCREENSHOT_METADATA_DENY_ACQUISITION_GATE_CANDIDATE",
  REVIEW_ACCESS_GATE_CANDIDATE: "REVIEW_ACCESS_GATE_CANDIDATE",
  EXPORT_DOWNLOAD_ACCESS_GATE_CANDIDATE:
    "EXPORT_DOWNLOAD_ACCESS_GATE_CANDIDATE",
  PACKET_DELIVERY_PROMOTION_GATE_CANDIDATE:
    "PACKET_DELIVERY_PROMOTION_GATE_CANDIDATE",
  THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE:
    "THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE",
  AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE:
    "AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE",
  RETENTION_DELETION_OPERATION_AUTHORIZATION_GATE_CANDIDATE:
    "RETENTION_DELETION_OPERATION_AUTHORIZATION_GATE_CANDIDATE",
  ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE:
    "ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE",
  CROSS_TENANT_WRONG_CASE_DENIAL_GATE_CANDIDATE:
    "CROSS_TENANT_WRONG_CASE_DENIAL_GATE_CANDIDATE",
  OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE:
    "OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE",
  HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE:
    "HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE",
});

const RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS = deepFreeze({
  NOT_RUNTIME_GATE_IMPLEMENTATION: "NOT_RUNTIME_GATE_IMPLEMENTATION",
  NOT_RUNTIME_ENFORCEMENT: "NOT_RUNTIME_ENFORCEMENT",
  NOT_SCHEMA_ENFORCEMENT: "NOT_SCHEMA_ENFORCEMENT",
  NOT_WORKFLOW_ENFORCEMENT: "NOT_WORKFLOW_ENFORCEMENT",
  NOT_VALIDATOR_DISPATCH: "NOT_VALIDATOR_DISPATCH",
  NOT_RUNTIME_REGISTRY_LOOKUP: "NOT_RUNTIME_REGISTRY_LOOKUP",
  NOT_RBAC_IMPLEMENTATION: "NOT_RBAC_IMPLEMENTATION",
  NOT_ACCESS_CONTROL_IMPLEMENTATION: "NOT_ACCESS_CONTROL_IMPLEMENTATION",
  NOT_ROLE_PERMISSION_MODEL: "NOT_ROLE_PERMISSION_MODEL",
  NOT_ADMIN_SUPPORT_MODEL: "NOT_ADMIN_SUPPORT_MODEL",
  NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION:
    "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
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

const RUNTIME_GATE_CANDIDATE_DECISION_STATUS = deepFreeze({
  DOCS_ONLY_STATUS_INVENTORY: "DOCS_ONLY_STATUS_INVENTORY",
  REGISTRY_SCAFFOLD_ONLY: "REGISTRY_SCAFFOLD_ONLY",
  FUTURE_CANDIDATE_ONLY: "FUTURE_CANDIDATE_ONLY",
  RUNTIME_GATE_INVENTORY_DEFERRED: "RUNTIME_GATE_INVENTORY_DEFERRED",
  NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT:
    "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  NOT_AUTHORIZED_FOR_SCHEMA_ENFORCEMENT:
    "NOT_AUTHORIZED_FOR_SCHEMA_ENFORCEMENT",
  NOT_AUTHORIZED_FOR_WORKFLOW_ENFORCEMENT:
    "NOT_AUTHORIZED_FOR_WORKFLOW_ENFORCEMENT",
  BLOCKED_BY_RBAC_MODEL: "BLOCKED_BY_RBAC_MODEL",
  BLOCKED_BY_ADMIN_SUPPORT_MODEL: "BLOCKED_BY_ADMIN_SUPPORT_MODEL",
  BLOCKED_BY_AUDIT_ACCESS_LOG: "BLOCKED_BY_AUDIT_ACCESS_LOG",
  BLOCKED_BY_RETENTION_DELETION: "BLOCKED_BY_RETENTION_DELETION",
  BLOCKED_BY_THIRD_PARTY_ROUTING: "BLOCKED_BY_THIRD_PARTY_ROUTING",
  BLOCKED_BY_RAW_MATERIAL_ROUTING: "BLOCKED_BY_RAW_MATERIAL_ROUTING",
  BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL:
    "BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const RUNTIME_GATE_CANDIDATE_EVIDENCE_POSTURE = deepFreeze({
  DOCS_ONLY_STATUS_INVENTORY: "DOCS_ONLY_STATUS_INVENTORY",
  REGISTRY_SCAFFOLD_EVIDENCE: "REGISTRY_SCAFFOLD_EVIDENCE",
  TESTED_ALIGNMENT_EVIDENCE: "TESTED_ALIGNMENT_EVIDENCE",
  CI_TESTED_SCENARIO_EVIDENCE: "CI_TESTED_SCENARIO_EVIDENCE",
  FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED:
    "FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const BASE_IMPLEMENTATION_STATUSES = deepFreeze([
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_RUNTIME_GATE_IMPLEMENTATION,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_RUNTIME_ENFORCEMENT,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_SCHEMA_ENFORCEMENT,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_WORKFLOW_ENFORCEMENT,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_VALIDATOR_DISPATCH,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_RUNTIME_REGISTRY_LOOKUP,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_RBAC_IMPLEMENTATION,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_ACCESS_CONTROL_IMPLEMENTATION,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_ROLE_PERMISSION_MODEL,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_ADMIN_SUPPORT_MODEL,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS
    .NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS
    .NOT_RETENTION_DELETION_IMPLEMENTATION,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS
    .NOT_THIRD_PARTY_ROUTING_AUTHORIZATION,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS
    .NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_SECURITY_FINDING,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NO_SEVERITY_ASSIGNED,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NO_REMEDIATION_RECOMMENDED,
]);

const BASE_NON_AUTHORIZATIONS = deepFreeze({
  authorized: false,
  access_granted: false,
  runtime_gate_implemented: false,
  runtime_gate_enforced: false,
  schema_gate_enforced: false,
  workflow_gate_enforced: false,
  validator_dispatch_created: false,
  runtime_registry_lookup_created: false,
  rbac_implemented: false,
  access_control_enforced: false,
  global_authorization_model_created: false,
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
  admin_support_model_created: false,
  audit_access_log_implemented: false,
  retention_deletion_implemented: false,
  third_party_routing_authorized: false,
  raw_material_routing_implemented: false,
  system_approval_created: false,
});

const RUNTIME_GATE_CANDIDATE_NON_OVERCLAIM_RULES = deepFreeze([
  "RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY does not mean RUNTIME_GATE_IMPLEMENTATION",
  "RUNTIME_GATE_CANDIDATE does not mean RUNTIME_ENFORCEMENT",
  "SCHEMA_VALIDATOR_GATE_CANDIDATE does not mean SCHEMA_ENFORCEMENT",
  "WORKFLOW_PROMPT_GATE_CANDIDATE does not mean WORKFLOW_ENFORCEMENT",
  "HUMAN_REVIEW_GATE_CANDIDATE does not mean SYSTEM_APPROVAL",
  "GATE_CATEGORY does not mean VALIDATOR_DISPATCH",
  "GATE_CATEGORY does not mean REGISTRY_LOOKUP",
  "RUNTIME_GATE_INVENTORY does not mean IMPLEMENTATION",
  "FUTURE_IMPLEMENTATION_EVIDENCE does not mean CURRENT_IMPLEMENTATION_EVIDENCE",
  "REQUIRED_TEST_EVIDENCE does not mean CURRENT_CLOSURE",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean RBAC",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean FULL_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean ADMIN_SUPPORT_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean GLOBAL_AUTHORIZATION_MODEL",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
  "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
  "GATE_CANDIDATE_ROW does not mean SECURITY_FINDING",
  "GATE_CANDIDATE_ROW does not mean SEVERITY_ASSIGNED",
  "GATE_CANDIDATE_ROW does not mean REMEDIATION_RECOMMENDED",
]);

const RUNTIME_GATE_CANDIDATE_REQUIRED_PREREQUISITES = deepFreeze([
  "RBAC model",
  "role/permission model",
  "role fields",
  "permission fields",
  "role schema",
  "permission schema",
  "admin/support model",
  "admin/support access-control model",
  "audit/access-log model",
  "event taxonomy runtime code",
  "no-content audit/access-log event policy",
  "log schema/storage policy",
  "retention/deletion/purge/erasure policy",
  "encryption/key-management policy",
  "third-party provider status registry",
  "third-party provider route denial tests",
  "raw-material routing denial policy",
  "no-raw/no-private/no-source-locator policy",
  "object/function/property authorization review",
  "tenant isolation tests",
  "wrong-case tests",
  "wrong-object tests",
  "wrong-function tests",
  "wrong-property tests",
  "allow/deny tests",
  "runtime gate implementation plan",
  "schema/validator gate implementation plan",
  "workflow/prompt gate implementation plan",
  "validator dispatch plan",
  "registry/lookup plan",
  "CI test plan",
  "external-use non-authorization wording",
  "non-proof/non-route-readiness wording",
  "human/professional review gate",
]);

const requiredFieldNames = deepFreeze([
  "id",
  "source_rbac_gate_candidate_id",
  "family",
  "candidate_surface",
  "future_gate_category",
  "later_runtime_gate_candidate_status",
  "later_schema_validator_gate_candidate_status",
  "later_workflow_prompt_gate_candidate_status",
  "human_professional_review_gate_status",
  "material_resource_surface",
  "primary_blocker",
  "secondary_blockers",
  "implementation_prerequisite",
  "required_implementation_evidence",
  "required_test_evidence",
  "overclaim_risk",
  "current_evidence_level",
  "runtime_inventory_status",
  "current_authorization_status",
  "closure_criteria",
  "non_authorized_until_closure",
  "related_material_classes",
  "related_storage_location_ids",
  "related_admin_support_gap_ids",
  "related_third_party_status_gap_ids",
  "related_raw_material_routing_control_ids",
  "related_aal_event_candidate_ids",
  "related_lifecycle_families",
  "related_global_access_control_row_ids",
  "related_rbac_boundary_status",
  "evidence_posture",
  "non_authorizations",
  "notes",
]);

const highRiskMaterials = deepFreeze(
  Object.values(HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
    (entry) => entry.material_class,
  ),
);

const defaultSecondaryBlockers = deepFreeze([
  RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RBAC_MODEL,
  RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_ADMIN_SUPPORT_MODEL,
  RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_AUDIT_ACCESS_LOG,
  RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RETENTION_DELETION,
  RUNTIME_GATE_CANDIDATE_DECISION_STATUS
    .BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL,
]);

const defaultImplementationEvidence = deepFreeze([
  "separate runtime gate implementation PR",
  "separate schema gate implementation PR",
  "separate workflow gate implementation PR",
  "separate validator dispatch PR",
  "separate runtime registry/lookup PR",
]);

const defaultTestEvidence = deepFreeze([
  "focused allow/deny runtime gate tests",
  "wrong-tenant/wrong-case/wrong-object tests",
  "schema validator gate tests",
  "workflow prompt gate tests",
  "CI evidence hardening workflow",
]);

function makeRow({
  id,
  sourceId,
  family,
  surface,
  gateCategory,
  materialSurface,
  primaryBlocker,
  secondaryBlockers = defaultSecondaryBlockers,
  prerequisite,
  overclaimRisk,
  closureCriteria,
  materialClasses,
  storageLocationIds,
  adminGapIds = [],
  tprGapIds = [],
  rmrControlIds = [],
  aalEventIds = [],
  lifecycleFamilies = [],
  gacRowIds = [],
  rbacBoundaryStatus,
  notes,
}) {
  return deepFreeze({
    id,
    source_rbac_gate_candidate_id: sourceId,
    family,
    candidate_surface: surface,
    future_gate_category: gateCategory,
    later_runtime_gate_candidate_status:
      RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS
        .NOT_RUNTIME_GATE_IMPLEMENTATION,
    later_schema_validator_gate_candidate_status:
      RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_SCHEMA_ENFORCEMENT,
    later_workflow_prompt_gate_candidate_status:
      RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.NOT_WORKFLOW_ENFORCEMENT,
    human_professional_review_gate_status:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL",
    material_resource_surface: materialSurface,
    primary_blocker: primaryBlocker,
    secondary_blockers: secondaryBlockers,
    implementation_prerequisite: prerequisite,
    required_implementation_evidence: defaultImplementationEvidence,
    required_test_evidence: defaultTestEvidence,
    overclaim_risk: overclaimRisk,
    current_evidence_level:
      RUNTIME_GATE_CANDIDATE_EVIDENCE_POSTURE.REGISTRY_SCAFFOLD_EVIDENCE,
    runtime_inventory_status:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS.RUNTIME_GATE_INVENTORY_DEFERRED,
    current_authorization_status:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS
        .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
    closure_criteria: closureCriteria,
    non_authorized_until_closure: true,
    related_material_classes: materialClasses,
    related_storage_location_ids: storageLocationIds,
    related_admin_support_gap_ids: adminGapIds,
    related_third_party_status_gap_ids: tprGapIds,
    related_raw_material_routing_control_ids: rmrControlIds,
    related_aal_event_candidate_ids: aalEventIds,
    related_lifecycle_families: lifecycleFamilies,
    related_global_access_control_row_ids: gacRowIds,
    related_rbac_boundary_status: rbacBoundaryStatus,
    evidence_posture:
      RUNTIME_GATE_CANDIDATE_EVIDENCE_POSTURE
        .FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    notes,
  });
}

const RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY = deepFreeze({
  RBAC_GC_001_MATERIAL_INTAKE_AUTHORIZATION_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-001_MATERIAL_INTAKE_AUTHORIZATION_GATE_CANDIDATE",
    sourceId: "RBAC-GC-001",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .MATERIAL_INTAKE_AUTHORIZATION_GATE_CANDIDATE,
    surface: "material intake request boundary",
    gateCategory: "runtime/schema/workflow intake gate candidate",
    materialSurface: "sanitized or no-raw material intake descriptor",
    primaryBlocker: RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RBAC_MODEL,
    prerequisite: "RBAC model plus intake allow/deny tests",
    overclaimRisk: "intake gate candidate could be mistaken for intake authorization",
    closureCriteria: "separate runtime/schema/workflow gate implementation evidence",
    materialClasses: [
      materialClass("SANITIZED_TEXT_PRIMARY_MATERIAL"),
      materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL"),
    ],
    storageLocationIds: [locationId("L03_REPO_TRACKED_DOCS")],
    adminGapIds: [adminGapId("ADMIN-SUPPORT-GAP-001_ADMIN_SUPPORT_MODEL_ABSENT")],
    rmrControlIds: [
      rmrControlId("RMR_CS_001_SANITIZED_TEXT_PRIMARY_MATERIAL"),
      rmrControlId("RMR_CS_003_NO_RAW_METADATA_MANIFEST_MATERIAL"),
    ],
    aalEventIds: [aalEventId("AAL-EVENT-001_MATERIAL_INTAKE_ATTEMPT")],
    lifecycleFamilies: [lifecycleFamily("RETENTION")],
    gacRowIds: [gacRowId("GAC-TM-009_ROLE_PERMISSION_MODEL_GAP")],
    rbacBoundaryStatus: "INTAKE_AUTHORIZATION_MODEL_ABSENT",
    notes: "Material intake remains candidate-only and not runtime authorization.",
  }),
  RBAC_GC_002_MATERIAL_VIEW_ACCESS_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-002_MATERIAL_VIEW_ACCESS_GATE_CANDIDATE",
    sourceId: "RBAC-GC-002",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .MATERIAL_VIEW_ACCESS_GATE_CANDIDATE,
    surface: "material view access boundary",
    gateCategory: "runtime view gate candidate",
    materialSurface: "review-visible material descriptor",
    primaryBlocker: RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RBAC_MODEL,
    prerequisite: "role/permission model plus object-level authorization review",
    overclaimRisk: "view gate candidate could be mistaken for access granted",
    closureCriteria: "wrong-object and wrong-property tests plus role schema",
    materialClasses: [
      materialClass("REDACTED_REVIEW_SIGNAL_MATERIAL"),
      materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL"),
    ],
    storageLocationIds: [locationId("L24_PR_COMMENTS_ISSUES_REVIEW_METADATA")],
    adminGapIds: [adminGapId("ADMIN-SUPPORT-GAP-003_ADMIN_SUPPORT_AUTH_FIELDS_ABSENT")],
    aalEventIds: [aalEventId("AAL-EVENT-006_REVIEW_ACCESS")],
    lifecycleFamilies: [lifecycleFamily("RETENTION")],
    gacRowIds: [
      gacRowId("GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP"),
    ],
    rbacBoundaryStatus: "VIEW_ACCESS_MODEL_ABSENT",
    notes: "View access remains not implemented and not granted.",
  }),
  RBAC_GC_003_MATERIAL_REDACTION_SANITIZATION_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-003_MATERIAL_REDACTION_SANITIZATION_GATE_CANDIDATE",
    sourceId: "RBAC-GC-003",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .MATERIAL_REDACTION_SANITIZATION_GATE_CANDIDATE,
    surface: "redaction and sanitization boundary",
    gateCategory: "workflow redaction gate candidate",
    materialSurface: "redacted review signal descriptor",
    primaryBlocker:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RAW_MATERIAL_ROUTING,
    prerequisite: "raw-material routing denial policy plus redaction tests",
    overclaimRisk: "redaction gate candidate could be mistaken for redaction executed",
    closureCriteria: "separate redaction implementation and no-raw tests",
    materialClasses: [materialClass("REDACTED_REVIEW_SIGNAL_MATERIAL")],
    storageLocationIds: [locationId("L03_REPO_TRACKED_DOCS")],
    rmrControlIds: [
      rmrControlId("RMR_CS_002_REDACTED_REVIEW_SIGNAL_MATERIAL"),
    ],
    aalEventIds: [aalEventId("AAL-EVENT-004_REDACTION_SANITIZATION")],
    lifecycleFamilies: [lifecycleFamily("RETENTION")],
    gacRowIds: [gacRowId("GAC-TM-008_PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP")],
    rbacBoundaryStatus: "REDACTION_SANITIZATION_IMPLEMENTATION_ABSENT",
    notes: "Redaction/sanitization remains a candidate boundary only.",
  }),
  RBAC_GC_004_MATERIAL_ROUTING_DECISION_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-004_MATERIAL_ROUTING_DECISION_GATE_CANDIDATE",
    sourceId: "RBAC-GC-004",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .MATERIAL_ROUTING_DECISION_GATE_CANDIDATE,
    surface: "material route decision boundary",
    gateCategory: "runtime routing decision gate candidate",
    materialSurface: "generated/export artifact route descriptor",
    primaryBlocker:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RAW_MATERIAL_ROUTING,
    prerequisite: "raw-material routing denial policy and route denial tests",
    overclaimRisk: "route decision candidate could be mistaken for routing authorization",
    closureCriteria: "separate runtime route gate and provider denial evidence",
    materialClasses: [materialClass("GENERATED_ARTIFACT_OR_EXPORT_MATERIAL")],
    storageLocationIds: [locationId("L13_LOCAL_EXPORT_PACKAGES")],
    rmrControlIds: [
      rmrControlId("RMR_CS_004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL"),
    ],
    aalEventIds: [aalEventId("AAL-EVENT-005_MATERIAL_ROUTING_DECISION")],
    lifecycleFamilies: [lifecycleFamily("ARCHIVE")],
    gacRowIds: [gacRowId("GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL")],
    rbacBoundaryStatus: "ROUTING_DECISION_IMPLEMENTATION_ABSENT",
    notes: "Generated/export artifact route attempts do not authorize external use.",
  }),
  RBAC_GC_005_RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-005_RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE",
    sourceId: "RBAC-GC-005",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE,
    surface: "raw/private/source denial boundary",
    gateCategory: "deny/quarantine gate candidate",
    materialSurface: "raw/private/source material denied descriptor",
    primaryBlocker:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RAW_MATERIAL_ROUTING,
    prerequisite: "no-raw/no-private/no-source-locator policy",
    overclaimRisk: "deny/quarantine candidate could be mistaken for inspection",
    closureCriteria: "separate quarantine implementation and no-inspection tests",
    materialClasses: [materialClass("RAW_PRIVATE_SOURCE_MATERIAL")],
    storageLocationIds: [locationId("L11_LOCAL_UNTRACKED_FILES")],
    adminGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-004_ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_DENIED"),
    ],
    tprGapIds: [tprGapId("TPR-STATUS-GAP-007_RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP")],
    rmrControlIds: [rmrControlId("RMR_CS_006_RAW_PRIVATE_SOURCE_MATERIAL")],
    aalEventIds: [
      aalEventId("AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS"),
      aalEventId("AAL-EVENT-003_QUARANTINE_BLOCK_DECISION"),
    ],
    lifecycleFamilies: [lifecycleFamily("RETENTION")],
    gacRowIds: [gacRowId("GAC-TM-015_CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL")],
    rbacBoundaryStatus: "RAW_PRIVATE_SOURCE_ACCESS_DENIED",
    notes: "Raw/private/source material remains denied and not inspected.",
  }),
  RBAC_GC_006_SOURCE_PACKAGE_DENY_QUARANTINE_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-006_SOURCE_PACKAGE_DENY_QUARANTINE_GATE_CANDIDATE",
    sourceId: "RBAC-GC-006",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .SOURCE_PACKAGE_DENY_QUARANTINE_GATE_CANDIDATE,
    surface: "source package denial boundary",
    gateCategory: "source package deny gate candidate",
    materialSurface: "source package material denied descriptor",
    primaryBlocker:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RAW_MATERIAL_ROUTING,
    prerequisite: "source package denial policy and no-inspection tests",
    overclaimRisk: "source package gate candidate could be mistaken for source inspection",
    closureCriteria: "separate no-source-package runtime evidence",
    materialClasses: [materialClass("SOURCE_PACKAGE_MATERIAL")],
    storageLocationIds: [locationId("L14_LOCAL_ARCHIVES_OR_ZIPS")],
    adminGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-005_ADMIN_SUPPORT_SOURCE_PACKAGE_ACCESS_DENIED"),
    ],
    rmrControlIds: [rmrControlId("RMR_CS_007_SOURCE_PACKAGE_MATERIAL")],
    aalEventIds: [aalEventId("AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS")],
    lifecycleFamilies: [lifecycleFamily("ARCHIVE")],
    gacRowIds: [gacRowId("GAC-TM-014_ALLOWED_DENIED_TEST_COVERAGE_PARTIAL")],
    rbacBoundaryStatus: "SOURCE_PACKAGE_ACCESS_DENIED",
    notes: "Source package access remains denied.",
  }),
  RBAC_GC_007_PDF_IMAGE_SCREENSHOT_METADATA_DENY_ACQUISITION_GATE_CANDIDATE:
    makeRow({
      id: "RBAC-GC-007_PDF_IMAGE_SCREENSHOT_METADATA_DENY_ACQUISITION_GATE_CANDIDATE",
      sourceId: "RBAC-GC-007",
      family:
        RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
          .PDF_IMAGE_SCREENSHOT_METADATA_DENY_ACQUISITION_GATE_CANDIDATE,
      surface: "PDF/image/screenshot/metadata denial boundary",
      gateCategory: "metadata acquisition deny gate candidate",
      materialSurface: "PDF/image/screenshot/metadata denied descriptor",
      primaryBlocker:
        RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RAW_MATERIAL_ROUTING,
      prerequisite: "metadata acquisition denial policy",
      overclaimRisk: "metadata gate candidate could be mistaken for metadata acquisition",
      closureCriteria: "separate no-metadata-acquisition tests",
      materialClasses: [materialClass("PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL")],
      storageLocationIds: [locationId("L12_LOCAL_GENERATED_ARTIFACTS")],
      adminGapIds: [
        adminGapId(
          "ADMIN-SUPPORT-GAP-006_ADMIN_SUPPORT_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS_DENIED",
        ),
      ],
      tprGapIds: [
        tprGapId(
          "TPR-STATUS-GAP-008_PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP",
        ),
      ],
      rmrControlIds: [
        rmrControlId("RMR_CS_008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL"),
      ],
      aalEventIds: [aalEventId("AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS")],
      lifecycleFamilies: [lifecycleFamily("RETENTION")],
      gacRowIds: [
        gacRowId("GAC-TM-008_PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP"),
      ],
      rbacBoundaryStatus: "PDF_IMAGE_SCREENSHOT_METADATA_ACCESS_DENIED",
      notes: "PDF/image/screenshot/metadata acquisition remains denied.",
    }),
  RBAC_GC_008_REVIEW_ACCESS_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-008_REVIEW_ACCESS_GATE_CANDIDATE",
    sourceId: "RBAC-GC-008",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .REVIEW_ACCESS_GATE_CANDIDATE,
    surface: "human/professional review access boundary",
    gateCategory: "review access gate candidate",
    materialSurface: "human review material descriptor",
    primaryBlocker: RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RBAC_MODEL,
    prerequisite: "human/professional review gate and role model",
    overclaimRisk: "human review candidate could be mistaken for system approval",
    closureCriteria: "separate review access implementation evidence",
    materialClasses: [materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL")],
    storageLocationIds: [locationId("L24_PR_COMMENTS_ISSUES_REVIEW_METADATA")],
    aalEventIds: [aalEventId("AAL-EVENT-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS")],
    lifecycleFamilies: [lifecycleFamily("RETENTION")],
    gacRowIds: [gacRowId("GAC-TM-004_CAPABILITY_GATES_PARTIAL")],
    rbacBoundaryStatus: "HUMAN_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL",
    notes: "Human/professional review remains required but is not system approval.",
  }),
  RBAC_GC_009_EXPORT_DOWNLOAD_ACCESS_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-009_EXPORT_DOWNLOAD_ACCESS_GATE_CANDIDATE",
    sourceId: "RBAC-GC-009",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .EXPORT_DOWNLOAD_ACCESS_GATE_CANDIDATE,
    surface: "export/download access boundary",
    gateCategory: "export/download gate candidate",
    materialSurface: "generated/export artifact descriptor",
    primaryBlocker: RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RBAC_MODEL,
    prerequisite: "export/download role model plus external-use non-authorization wording",
    overclaimRisk: "download gate candidate could be mistaken for external-use authorization",
    closureCriteria: "separate export/download runtime gate implementation",
    materialClasses: [materialClass("GENERATED_ARTIFACT_OR_EXPORT_MATERIAL")],
    storageLocationIds: [locationId("L13_LOCAL_EXPORT_PACKAGES")],
    adminGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-011_ADMIN_SUPPORT_EXPORT_PACKET_DELIVERY_DENIED"),
    ],
    aalEventIds: [aalEventId("AAL-EVENT-008_EXPORT_DOWNLOAD_ACCESS")],
    lifecycleFamilies: [lifecycleFamily("ARCHIVE")],
    gacRowIds: [gacRowId("GAC-TM-011_EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL")],
    rbacBoundaryStatus: "EXPORT_DOWNLOAD_AUTHORIZATION_ABSENT",
    notes: "Export/download candidates do not authorize external use.",
  }),
  RBAC_GC_010_PACKET_DELIVERY_PROMOTION_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-010_PACKET_DELIVERY_PROMOTION_GATE_CANDIDATE",
    sourceId: "RBAC-GC-010",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .PACKET_DELIVERY_PROMOTION_GATE_CANDIDATE,
    surface: "packet delivery promotion boundary",
    gateCategory: "packet promotion gate candidate",
    materialSurface: "generated delivery artifact descriptor",
    primaryBlocker:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS
        .BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL,
    prerequisite: "release and delivery gate implementation plan",
    overclaimRisk: "packet promotion candidate could be mistaken for release approval",
    closureCriteria: "separate release/delivery approval process outside this scaffold",
    materialClasses: [materialClass("GENERATED_ARTIFACT_OR_EXPORT_MATERIAL")],
    storageLocationIds: [locationId("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE")],
    adminGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-011_ADMIN_SUPPORT_EXPORT_PACKET_DELIVERY_DENIED"),
    ],
    aalEventIds: [aalEventId("AAL-EVENT-009_PACKET_DELIVERY_PROMOTION_ATTEMPT")],
    lifecycleFamilies: [lifecycleFamily("RECIPIENT_PURGE")],
    gacRowIds: [gacRowId("GAC-TM-011_EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL")],
    rbacBoundaryStatus: "PACKET_DELIVERY_PROMOTION_NOT_AUTHORIZED",
    notes: "Recipient downstream storage is future/not authorized.",
  }),
  RBAC_GC_011_THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE:
    makeRow({
      id: "RBAC-GC-011_THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE",
      sourceId: "RBAC-GC-011",
      family:
        RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
          .THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE,
      surface: "third-party model/API route approval-denial boundary",
      gateCategory: "provider route denial gate candidate",
      materialSurface: "third-party route status descriptor",
      primaryBlocker:
        RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_THIRD_PARTY_ROUTING,
      prerequisite: "provider status registry plus route denial tests",
      overclaimRisk: "provider route gate candidate could be mistaken for routing authorization",
      closureCriteria: "separate provider routing implementation and denial tests",
      materialClasses: [
        materialClass("THIRD_PARTY_MODEL_API_ROUTED_MATERIAL"),
        materialClass("PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL"),
        materialClass("TOKEN_URL_SECRET_MATERIAL"),
      ],
      storageLocationIds: [locationId("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE")],
      adminGapIds: [
        adminGapId("ADMIN-SUPPORT-GAP-008_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_DENIED"),
      ],
      tprGapIds: [
        tprGapId("TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS"),
        tprGapId("TPR-STATUS-GAP-002_PROVIDER_IDENTITY_STATUS_GAP"),
        tprGapId("TPR-STATUS-GAP-006_PROVIDER_TOKEN_URL_SECRET_HANDLING_GAP"),
      ],
      rmrControlIds: [
        rmrControlId("RMR_CS_009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL"),
      ],
      aalEventIds: [aalEventId("AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL")],
      lifecycleFamilies: [lifecycleFamily("PROVIDER_DELETION")],
      gacRowIds: [gacRowId("GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP")],
      rbacBoundaryStatus: "THIRD_PARTY_ROUTING_NOT_AUTHORIZED",
      notes: "Provider storage is future/not authorized and routing remains denied.",
    }),
  RBAC_GC_012_AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-012_AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE",
    sourceId: "RBAC-GC-012",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE,
    surface: "audit/access-log view boundary",
    gateCategory: "audit/access-log viewer gate candidate",
    materialSurface: "audit/access event record descriptor",
    primaryBlocker:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_AUDIT_ACCESS_LOG,
    prerequisite: "audit/access-log model and log viewer RBAC",
    overclaimRisk: "log viewer candidate could be mistaken for audit proof or log storage",
    closureCriteria: "separate audit/access-log implementation and viewer RBAC",
    materialClasses: [materialClass("AUDIT_ACCESS_EVENT_RECORD")],
    storageLocationIds: [locationId("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE")],
    adminGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-007_ADMIN_SUPPORT_LOG_VIEWER_RBAC_ABSENT"),
    ],
    aalEventIds: [
      aalEventId("AAL-EVENT-016_AUDIT_LOG_VIEWER_ACCESS"),
      aalEventId("AAL-EVENT-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS"),
    ],
    lifecycleFamilies: [lifecycleFamily("RETENTION")],
    gacRowIds: [gacRowId("GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP")],
    rbacBoundaryStatus: "LOG_VIEWER_RBAC_ABSENT",
    notes: "Audit-log storage is future/not implemented and not audit proof.",
  }),
  RBAC_GC_013_RETENTION_DELETION_OPERATION_AUTHORIZATION_GATE_CANDIDATE:
    makeRow({
      id: "RBAC-GC-013_RETENTION_DELETION_OPERATION_AUTHORIZATION_GATE_CANDIDATE",
      sourceId: "RBAC-GC-013",
      family:
        RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
          .RETENTION_DELETION_OPERATION_AUTHORIZATION_GATE_CANDIDATE,
      surface: "retention/deletion operation authorization boundary",
      gateCategory: "lifecycle operation gate candidate",
      materialSurface: "lifecycle operation descriptor",
      primaryBlocker:
        RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_RETENTION_DELETION,
      prerequisite: "retention/deletion/purge/erasure policy and execution tests",
      overclaimRisk: "lifecycle gate candidate could be mistaken for deletion executed",
      closureCriteria: "separate lifecycle execution implementation evidence",
      materialClasses: [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
      storageLocationIds: [locationId("L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE")],
      adminGapIds: [
        adminGapId("ADMIN-SUPPORT-GAP-009_ADMIN_SUPPORT_LIFECYCLE_EXECUTION_DENIED"),
      ],
      aalEventIds: [aalEventId("AAL-EVENT-012_RETENTION_DELETION_OPERATION")],
      lifecycleFamilies: [
        lifecycleFamily("RETENTION"),
        lifecycleFamily("DELETION"),
        lifecycleFamily("PURGE"),
        lifecycleFamily("ERASURE"),
      ],
      gacRowIds: [gacRowId("GAC-TM-012_DATABASE_QUERY_SCOPING_PARTIAL")],
      rbacBoundaryStatus: "LIFECYCLE_EXECUTION_NOT_AUTHORIZED",
      notes: "Lifecycle operation authorization remains candidate-only.",
    }),
  RBAC_GC_014_ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-014_ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE",
    sourceId: "RBAC-GC-014",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE,
    surface: "admin/support access boundary",
    gateCategory: "admin/support runtime access gate candidate",
    materialSurface: "admin/support capability descriptor",
    primaryBlocker:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS.BLOCKED_BY_ADMIN_SUPPORT_MODEL,
    prerequisite: "admin/support model, routes, auth fields, and bypass tests",
    overclaimRisk: "admin/support gate candidate could be mistaken for privileged access",
    closureCriteria: "separate admin/support access-control implementation evidence",
    materialClasses: [materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL")],
    storageLocationIds: [locationId("L25_CONNECTOR_TOOL_OR_AGENT_STATE")],
    adminGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-001_ADMIN_SUPPORT_MODEL_ABSENT"),
      adminGapId("ADMIN-SUPPORT-GAP-002_ADMIN_SUPPORT_RUNTIME_ROUTES_ABSENT"),
      adminGapId("ADMIN-SUPPORT-GAP-003_ADMIN_SUPPORT_AUTH_FIELDS_ABSENT"),
    ],
    aalEventIds: [aalEventId("AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT")],
    lifecycleFamilies: [lifecycleFamily("RETENTION")],
    gacRowIds: [gacRowId("GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP")],
    rbacBoundaryStatus: "ADMIN_SUPPORT_RUNTIME_ACCESS_NOT_AUTHORIZED",
    notes: "Admin/support runtime access remains unresolved and not authorized.",
  }),
  RBAC_GC_015_CROSS_TENANT_WRONG_CASE_DENIAL_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-015_CROSS_TENANT_WRONG_CASE_DENIAL_GATE_CANDIDATE",
    sourceId: "RBAC-GC-015",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .CROSS_TENANT_WRONG_CASE_DENIAL_GATE_CANDIDATE,
    surface: "cross-tenant/wrong-case denial boundary",
    gateCategory: "tenant/case denial gate candidate",
    materialSurface: "tenant and case scope descriptor",
    primaryBlocker:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS
        .BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL,
    prerequisite: "tenant isolation and wrong-case tests",
    overclaimRisk: "wrong-case denial candidate could be mistaken for global authorization",
    closureCriteria: "separate tenant isolation runtime tests and implementation",
    materialClasses: [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
    storageLocationIds: [locationId("L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE")],
    adminGapIds: [
      adminGapId("ADMIN-SUPPORT-GAP-010_ADMIN_SUPPORT_CROSS_TENANT_CASE_OVERRIDE_DENIED"),
    ],
    aalEventIds: [aalEventId("AAL-EVENT-006_REVIEW_ACCESS")],
    lifecycleFamilies: [lifecycleFamily("RETENTION")],
    gacRowIds: [
      gacRowId("GAC-TM-002_TENANT_ISOLATION_PARTIAL"),
      gacRowId("GAC-TM-015_CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL"),
    ],
    rbacBoundaryStatus: "CROSS_TENANT_WRONG_CASE_DENIAL_NOT_IMPLEMENTED",
    notes: "Tenant/case evidence remains partial and not global authorization.",
  }),
  RBAC_GC_016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE",
    sourceId: "RBAC-GC-016",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE,
    surface: "object/function/property authorization boundary",
    gateCategory: "object-function-property gate candidate",
    materialSurface: "authorization surface descriptor",
    primaryBlocker:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS
        .BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL,
    prerequisite: "object/function/property authorization review and tests",
    overclaimRisk: "partial object/function/property evidence could be mistaken for full access control",
    closureCriteria: "separate BOLA/IDOR and function/property test evidence",
    materialClasses: [materialClass("NO_RAW_METADATA_MANIFEST_MATERIAL")],
    storageLocationIds: [locationId("L04_REPO_TRACKED_SCHEMAS")],
    aalEventIds: [aalEventId("AAL-EVENT-007_MANIFEST_VALIDATION")],
    lifecycleFamilies: [lifecycleFamily("RETENTION")],
    gacRowIds: [
      gacRowId("GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP"),
      gacRowId("GAC-TM-007_FUNCTION_LEVEL_AUTHORIZATION_PARTIAL"),
      gacRowId("GAC-TM-008_PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP"),
    ],
    rbacBoundaryStatus: "OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_PARTIAL",
    notes: "Object/function/property authorization remains partial and not enforced.",
  }),
  RBAC_GC_017_HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE: makeRow({
    id: "RBAC-GC-017_HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE",
    sourceId: "RBAC-GC-017",
    family:
      RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES
        .HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE,
    surface: "human/professional review-only boundary",
    gateCategory: "human review gate candidate",
    materialSurface: "human/professional review-only descriptor",
    primaryBlocker:
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS
        .BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL,
    prerequisite: "human/professional review gate and non-system-approval wording",
    overclaimRisk: "human review gate candidate could be mistaken for system approval",
    closureCriteria: "separate human/professional review process definition",
    materialClasses: [materialClass("HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL")],
    storageLocationIds: [locationId("L24_PR_COMMENTS_ISSUES_REVIEW_METADATA")],
    tprGapIds: [
      tprGapId("TPR-STATUS-GAP-013_HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_GAP"),
    ],
    rmrControlIds: [
      rmrControlId("RMR_CS_010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL"),
    ],
    aalEventIds: [aalEventId("AAL-EVENT-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS")],
    lifecycleFamilies: [lifecycleFamily("RETENTION")],
    gacRowIds: [gacRowId("GAC-TM-004_CAPABILITY_GATES_PARTIAL")],
    rbacBoundaryStatus: "HUMAN_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL",
    notes: "Human/professional review remains required and is never system approval.",
  }),
});

const registryById = deepFreeze(
  Object.fromEntries(
    Object.values(RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY).map((row) => [
      row.id,
      row,
    ]),
  ),
);

const UNKNOWN_ROW = deepFreeze({
  id: "UNKNOWN_NOT_EVIDENCED",
  source_rbac_gate_candidate_id: "UNKNOWN_NOT_EVIDENCED",
  family: RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
  candidate_surface: "unknown runtime gate candidate",
  future_gate_category: "unknown",
  later_runtime_gate_candidate_status:
    RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
  later_schema_validator_gate_candidate_status:
    RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
  later_workflow_prompt_gate_candidate_status:
    RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
  human_professional_review_gate_status: "UNKNOWN_NOT_EVIDENCED",
  material_resource_surface: "unknown",
  primary_blocker: RUNTIME_GATE_CANDIDATE_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
  secondary_blockers: [],
  implementation_prerequisite: "unknown input is not evidenced",
  required_implementation_evidence: [],
  required_test_evidence: [],
  overclaim_risk: "unknown row cannot create runtime gate evidence",
  current_evidence_level:
    RUNTIME_GATE_CANDIDATE_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
  runtime_inventory_status:
    RUNTIME_GATE_CANDIDATE_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
  current_authorization_status:
    RUNTIME_GATE_CANDIDATE_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
  closure_criteria: "unknown input fails closed",
  non_authorized_until_closure: true,
  related_material_classes: [],
  related_storage_location_ids: [],
  related_admin_support_gap_ids: [],
  related_third_party_status_gap_ids: [],
  related_raw_material_routing_control_ids: [],
  related_aal_event_candidate_ids: [],
  related_lifecycle_families: [],
  related_global_access_control_row_ids: [],
  related_rbac_boundary_status: "UNKNOWN_NOT_EVIDENCED",
  evidence_posture:
    RUNTIME_GATE_CANDIDATE_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
  non_authorizations: BASE_NON_AUTHORIZATIONS,
  notes: "Unknown runtime gate candidate status inventory rows fail closed.",
});

const listRuntimeGateCandidateStatusInventoryFamilies = () =>
  cloneAndFreeze(
    Object.values(RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES),
  );

const listRuntimeGateCandidateStatusInventoryRows = () =>
  cloneAndFreeze(Object.values(RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY));

const getRuntimeGateCandidateStatusInventoryRow = (id) =>
  cloneAndFreeze(registryById[id] || UNKNOWN_ROW);

const classifyRuntimeGateCandidateStatusInventoryRow = (id) => {
  const row = registryById[id];
  if (!row) {
    return cloneAndFreeze({
      id,
      known: false,
      classification:
        RUNTIME_GATE_CANDIDATE_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
      runtime_inventory_status:
        RUNTIME_GATE_CANDIDATE_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
      current_authorization_status:
        RUNTIME_GATE_CANDIDATE_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
      evidence_posture:
        RUNTIME_GATE_CANDIDATE_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
      authorized: false,
      access_granted: false,
      runtime_gate_enforced: false,
      security_finding_created: false,
    });
  }

  return cloneAndFreeze({
    id: row.id,
    known: true,
    classification: row.family,
    runtime_inventory_status: row.runtime_inventory_status,
    current_authorization_status: row.current_authorization_status,
    evidence_posture: row.evidence_posture,
    authorized: false,
    access_granted: false,
    runtime_gate_enforced: false,
    security_finding_created: false,
  });
};

const hasRuntimeGateCandidateStatusInventoryRow = (id) =>
  Object.hasOwn(registryById, id);

const listRuntimeGateCandidateNonOverclaimRules = () =>
  cloneAndFreeze(RUNTIME_GATE_CANDIDATE_NON_OVERCLAIM_RULES);

const getRuntimeGateCandidateRequiredPrerequisites = () =>
  cloneAndFreeze(RUNTIME_GATE_CANDIDATE_REQUIRED_PREREQUISITES);

const getRuntimeGateCandidateNonAuthorizationStatus = () =>
  cloneAndFreeze({
    implementation_statuses: BASE_IMPLEMENTATION_STATUSES,
    decision_statuses: [
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS.DOCS_ONLY_STATUS_INVENTORY,
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS.REGISTRY_SCAFFOLD_ONLY,
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS.FUTURE_CANDIDATE_ONLY,
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS.RUNTIME_GATE_INVENTORY_DEFERRED,
      RUNTIME_GATE_CANDIDATE_DECISION_STATUS
        .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
    ],
    high_risk_material_classes_denied: highRiskMaterials,
    local_logs_are_ci_evidence: false,
    ci_logs_are_release_evidence: false,
    human_review_gate_is_system_approval: false,
    non_overclaim_rules: RUNTIME_GATE_CANDIDATE_NON_OVERCLAIM_RULES,
    required_prerequisites: RUNTIME_GATE_CANDIDATE_REQUIRED_PREREQUISITES,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
  });

const isRuntimeGateImplemented = () => false;
const isRuntimeGateEnforced = () => false;
const isSchemaGateEnforced = () => false;
const isWorkflowGateEnforced = () => false;
const isValidatorDispatchCreated = () => false;
const isRuntimeRegistryLookupCreated = () => false;
const isRuntimeGateAuthorizedForEnforcement = () => false;
const isSecurityFindingCreated = () => false;

module.exports = {
  RUNTIME_GATE_CANDIDATE_DECISION_STATUS,
  RUNTIME_GATE_CANDIDATE_EVIDENCE_POSTURE,
  RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS,
  RUNTIME_GATE_CANDIDATE_NON_OVERCLAIM_RULES,
  RUNTIME_GATE_CANDIDATE_REQUIRED_PREREQUISITES,
  RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES,
  RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
  classifyRuntimeGateCandidateStatusInventoryRow,
  getRuntimeGateCandidateNonAuthorizationStatus,
  getRuntimeGateCandidateRequiredPrerequisites,
  getRuntimeGateCandidateStatusInventoryRow,
  hasRuntimeGateCandidateStatusInventoryRow,
  isRuntimeGateAuthorizedForEnforcement,
  isRuntimeGateEnforced,
  isRuntimeGateImplemented,
  isRuntimeRegistryLookupCreated,
  isSchemaGateEnforced,
  isSecurityFindingCreated,
  isValidatorDispatchCreated,
  isWorkflowGateEnforced,
  listRuntimeGateCandidateNonOverclaimRules,
  listRuntimeGateCandidateStatusInventoryFamilies,
  listRuntimeGateCandidateStatusInventoryRows,
};
