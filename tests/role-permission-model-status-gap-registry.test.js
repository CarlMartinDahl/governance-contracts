"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const registry = require("../packages/governance/src/role-permission-model-status-gap-registry.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const rde = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const aal = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const rmr = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const tpr = require("../packages/governance/src/third-party-routing-status-gap-registry.js");
const admin = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const gac = require("../packages/governance/src/global-access-control-threat-model-inventory-status-registry.js");
const runtimeGate = require("../packages/governance/src/runtime-gate-candidate-status-inventory-registry.js");
const index = require("../packages/governance/src/index.js");

const expectedFamilies = [
  "ACTOR_SUBJECT_MODEL_GAP",
  "ROLE_CATEGORY_MODEL_GAP",
  "PERMISSION_CATEGORY_MODEL_GAP",
  "ROLE_FIELDS_GAP",
  "PERMISSION_FIELDS_GAP",
  "ROLE_SCHEMA_GAP",
  "PERMISSION_SCHEMA_GAP",
  "TENANT_CASE_SCOPING_GAP",
  "OBJECT_LEVEL_AUTHORIZATION_GAP",
  "FUNCTION_LEVEL_AUTHORIZATION_GAP",
  "PROPERTY_LEVEL_AUTHORIZATION_OVEREXPOSURE_GAP",
  "ADMIN_SUPPORT_ROLE_PERMISSION_GAP",
  "LOG_VIEWER_RBAC_GAP",
  "AUDIT_ACCESS_LOG_DEPENDENCY_GAP",
  "RETENTION_DELETION_PERMISSION_GAP",
  "THIRD_PARTY_ROUTING_PERMISSION_GAP",
  "RAW_MATERIAL_ROUTING_PERMISSION_GAP",
  "RUNTIME_GATE_DEPENDENCY_GAP",
  "GLOBAL_AUTHORIZATION_MODEL_DEPENDENCY_GAP",
];

const expectedImplementationStatuses = [
  "NOT_RBAC_IMPLEMENTATION",
  "NOT_ACCESS_CONTROL_IMPLEMENTATION",
  "NOT_ROLE_PERMISSION_MODEL",
  "NOT_ROLE_FIELDS",
  "NOT_PERMISSION_FIELDS",
  "NOT_ROLE_SCHEMA",
  "NOT_PERMISSION_SCHEMA",
  "NOT_ADMIN_SUPPORT_MODEL",
  "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS",
  "NOT_LOG_VIEWER_RBAC",
  "NOT_GLOBAL_AUTHORIZATION_MODEL",
  "NOT_RUNTIME_ENFORCEMENT",
  "NOT_VALIDATOR_DISPATCH",
  "NOT_RUNTIME_REGISTRY_LOOKUP",
  "NOT_SECURITY_FINDING",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedDecisionStatuses = [
  "DOCS_ONLY_STATUS_GAP",
  "REGISTRY_SCAFFOLD_ONLY",
  "FUTURE_MODEL_CANDIDATE_ONLY",
  "DENY_BY_DEFAULT",
  "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  "BLOCKED_BY_ROLE_PERMISSION_MODEL",
  "BLOCKED_BY_ADMIN_SUPPORT_MODEL",
  "BLOCKED_BY_AUDIT_ACCESS_LOG",
  "BLOCKED_BY_RETENTION_DELETION",
  "BLOCKED_BY_THIRD_PARTY_ROUTING",
  "BLOCKED_BY_RAW_MATERIAL_ROUTING",
  "BLOCKED_BY_RUNTIME_GATE_CANDIDATES",
  "BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedRowIds = [
  "RP-SG-001_ACTOR_SUBJECT_MODEL_GAP",
  "RP-SG-002_ROLE_CATEGORY_MODEL_GAP",
  "RP-SG-003_PERMISSION_CATEGORY_MODEL_GAP",
  "RP-SG-004_ROLE_FIELDS_GAP",
  "RP-SG-005_PERMISSION_FIELDS_GAP",
  "RP-SG-006_ROLE_SCHEMA_GAP",
  "RP-SG-007_PERMISSION_SCHEMA_GAP",
  "RP-SG-008_TENANT_CASE_SCOPING_GAP",
  "RP-SG-009_OBJECT_LEVEL_AUTHORIZATION_GAP",
  "RP-SG-010_FUNCTION_LEVEL_AUTHORIZATION_GAP",
  "RP-SG-011_PROPERTY_LEVEL_AUTHORIZATION_OVEREXPOSURE_GAP",
  "RP-SG-012_ADMIN_SUPPORT_ROLE_PERMISSION_GAP",
  "RP-SG-013_LOG_VIEWER_RBAC_GAP",
  "RP-SG-014_AUDIT_ACCESS_LOG_DEPENDENCY_GAP",
  "RP-SG-015_RETENTION_DELETION_PERMISSION_GAP",
  "RP-SG-016_THIRD_PARTY_ROUTING_PERMISSION_GAP",
  "RP-SG-017_RAW_MATERIAL_ROUTING_PERMISSION_GAP",
  "RP-SG-018_RUNTIME_GATE_DEPENDENCY_GAP",
  "RP-SG-019_GLOBAL_AUTHORIZATION_MODEL_DEPENDENCY_GAP",
];

const requiredFields = [
  "id",
  "family",
  "surface",
  "source_boundary_or_dependency",
  "current_statuses",
  "primary_absent_capability",
  "implementation_gap",
  "required_prerequisites",
  "required_test_evidence",
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
  "related_global_access_control_row_ids",
  "related_runtime_gate_candidate_ids",
  "related_rbac_boundary_status",
  "evidence_posture",
  "non_authorizations",
  "notes",
];

const expectedNonOverclaimRules = [
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
];

const expectedPrerequisites = [
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
];

const positiveClaimKeys = new Set([
  "authorized",
  "access_granted",
  "rbac_implemented",
  "access_control_implemented",
  "access_control_enforced",
  "role_permission_model_created",
  "role_fields_created",
  "permission_fields_created",
  "role_schema_created",
  "permission_schema_created",
  "admin_support_access_authorized",
  "log_viewer_rbac_created",
  "runtime_gate_implemented",
  "validator_dispatch_created",
  "runtime_registry_lookup_created",
  "security_finding_created",
  "vulnerability_finding_created",
  "severity_assigned",
  "remediation_recommended",
  "remediation_implemented",
  "release_approved",
  "external_use_authorized",
  "product_candidate_authorized",
  "runtime_certification_created",
  "technical_signoff_created",
]);

function assertIncludesAll(actual, expected) {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
}

function collectObjects(value, collected = [], seen = new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return collected;
  }

  seen.add(value);
  collected.push(value);
  for (const nested of Object.values(value)) {
    collectObjects(nested, collected, seen);
  }

  return collected;
}

function assertNoPositiveClaims(value) {
  for (const object of collectObjects(value)) {
    for (const [key, item] of Object.entries(object)) {
      if (positiveClaimKeys.has(key)) {
        assert.notEqual(item, true, key);
      }
    }
  }
}

const rows = registry.listRolePermissionModelStatusGapRows();

test("role/permission status-gap families statuses and exact rows exist", () => {
  assert.deepEqual(
    registry.listRolePermissionModelStatusGapFamilies(),
    expectedFamilies,
  );
  assert.deepEqual(
    Object.values(registry.ROLE_PERMISSION_MODEL_IMPLEMENTATION_STATUS),
    expectedImplementationStatuses,
  );
  assert.deepEqual(
    Object.values(registry.ROLE_PERMISSION_MODEL_DECISION_STATUS),
    expectedDecisionStatuses,
  );
  assert.deepEqual(rows.map((row) => row.id), expectedRowIds);
});

test("every row exposes required fields and references known tracked registries", () => {
  const knownMaterialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const knownStorageIds = new Set(Object.keys(storage.DATA_LOCATION_REGISTRY));
  const knownAdminGapIds = new Set(
    Object.values(admin.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY).map(
      (row) => row.id,
    ),
  );
  const knownTprGapIds = new Set(
    Object.values(tpr.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY).map(
      (row) => row.id,
    ),
  );
  const knownRmrControlIds = new Set(
    Object.values(rmr.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY).map(
      (row) => row.control_id,
    ),
  );
  const knownAalEventIds = new Set(
    Object.values(aal.AUDIT_ACCESS_LOG_EVENT_CANDIDATES).map((row) => row.id),
  );
  const knownLifecycleFamilies = new Set(
    Object.values(rde.LIFECYCLE_CONTROL_FAMILIES),
  );
  const knownGacRowIds = new Set(
    Object.values(gac.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY).map(
      (row) => row.id,
    ),
  );
  const knownRuntimeGateIds = new Set(
    Object.values(runtimeGate.RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY).map(
      (row) => row.id,
    ),
  );

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), requiredFields, row.id);
    assert.equal(row.non_authorized_until_closure, true, row.id);
    assert.equal(
      row.current_authorization_status,
      "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
      row.id,
    );
    assert.equal(row.related_rbac_boundary_status, "RBAC_DENY_BY_DEFAULT_SCAFFOLD_ONLY");

    for (const materialClass of row.related_material_classes) {
      assert.equal(knownMaterialClasses.has(materialClass), true, materialClass);
    }
    for (const locationId of row.related_storage_location_ids) {
      assert.equal(knownStorageIds.has(locationId), true, locationId);
    }
    for (const gapId of row.related_admin_support_gap_ids) {
      assert.equal(knownAdminGapIds.has(gapId), true, gapId);
    }
    for (const gapId of row.related_third_party_status_gap_ids) {
      assert.equal(knownTprGapIds.has(gapId), true, gapId);
    }
    for (const controlId of row.related_raw_material_routing_control_ids) {
      assert.equal(knownRmrControlIds.has(controlId), true, controlId);
    }
    for (const eventId of row.related_aal_event_candidate_ids) {
      assert.equal(knownAalEventIds.has(eventId), true, eventId);
    }
    for (const family of row.related_lifecycle_families) {
      assert.equal(knownLifecycleFamilies.has(family), true, family);
    }
    for (const rowId of row.related_global_access_control_row_ids) {
      assert.equal(knownGacRowIds.has(rowId), true, rowId);
    }
    for (const rowId of row.related_runtime_gate_candidate_ids) {
      assert.equal(knownRuntimeGateIds.has(rowId), true, rowId);
    }
  }
});

test("high-risk materials and future storage boundaries remain non-authorizing", () => {
  for (const denial of Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED)) {
    assert.equal(denial.denied, true, denial.material_class);
    assert.equal(denial.authorized, false, denial.material_class);
    assert.equal(denial.external_use_authorized, false, denial.material_class);
    assert.equal(denial.product_candidate_authorized, false, denial.material_class);
  }

  for (const id of [
    "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
    "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
    "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
  ]) {
    assert.equal(
      rows.some((row) => row.related_storage_location_ids.includes(id)),
      true,
      id,
    );
    const location = storage.getDataLocation(id);
    assert.equal(location.non_authorizations.authorized, false, id);
    assert.equal(location.non_authorizations.release_approved, false, id);
    assert.equal(location.non_authorizations.external_use_authorized, false, id);
  }
});

test("unknown row lookups fail closed and implementation helpers remain false", () => {
  const unknown = registry.getRolePermissionModelStatusGapRow("NOPE");
  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.current_authorization_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.non_authorizations.authorized, false);
  assert.equal(unknown.non_authorizations.rbac_implemented, false);
  assert.equal(unknown.non_authorizations.security_finding_created, false);
  assert.equal(registry.hasRolePermissionModelStatusGapRow("NOPE"), false);

  const classification = registry.classifyRolePermissionModelStatusGapRow("NOPE");
  assert.equal(classification.known, false);
  assert.equal(classification.classification, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(classification.authorized, false);
  assert.equal(classification.rbac_implemented, false);
  assert.equal(classification.security_finding_created, false);

  assert.equal(registry.isRolePermissionModelImplemented("anything"), false);
  assert.equal(registry.isRbacImplemented("anything"), false);
  assert.equal(registry.isAccessControlImplemented("anything"), false);
  assert.equal(registry.isRoleSchemaCreated("anything"), false);
  assert.equal(registry.isPermissionSchemaCreated("anything"), false);
  assert.equal(registry.isAdminSupportAccessAuthorized("anything"), false);
  assert.equal(registry.isLogViewerRbacCreated("anything"), false);
  assert.equal(registry.isSecurityFindingCreated("anything"), false);
});

test("non-overclaim rules prerequisites and evidence boundaries are explicit", () => {
  assertIncludesAll(
    registry.listRolePermissionModelNonOverclaimRules(),
    expectedNonOverclaimRules,
  );
  assertIncludesAll(
    registry.getRolePermissionModelRequiredPrerequisites(),
    expectedPrerequisites,
  );

  const status = registry.getRolePermissionModelNonAuthorizationStatus();
  assertIncludesAll(status.non_overclaim_rules, expectedNonOverclaimRules);
  assertIncludesAll(status.required_prerequisites, expectedPrerequisites);
  assert.equal(status.local_logs_are_ci_evidence, false);
  assert.equal(status.ci_logs_are_release_evidence, false);
  assert.equal(status.human_review_gate_is_system_approval, false);
  assert.equal(status.route_case_capability_evidence_is_rbac, false);
  assert.equal(status.route_case_capability_evidence_is_full_access_control, false);
  assert.equal(
    status.route_case_capability_evidence_is_admin_support_access_control,
    false,
  );
  assert.equal(
    status.route_case_capability_evidence_is_global_authorization_model,
    false,
  );
});

test("helper outputs and rows contain no positive authorization implementation or finding claims", () => {
  const helperOutputs = [
    rows,
    registry.ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY,
    registry.getRolePermissionModelStatusGapRow(expectedRowIds[0]),
    registry.classifyRolePermissionModelStatusGapRow(expectedRowIds[0]),
    registry.getRolePermissionModelStatusGapRow("UNKNOWN"),
    registry.classifyRolePermissionModelStatusGapRow("UNKNOWN"),
    registry.getRolePermissionModelNonAuthorizationStatus(),
    registry.listRolePermissionModelNonOverclaimRules(),
    registry.getRolePermissionModelRequiredPrerequisites(),
  ];

  for (const output of helperOutputs) {
    assertNoPositiveClaims(output);
  }
});

test("registry entries and helper returns are frozen and copy-safe", () => {
  assert.equal(Object.isFrozen(registry.ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY), true);
  assert.equal(Object.isFrozen(rows), true);
  assert.equal(Object.isFrozen(rows[0]), true);
  assert.equal(Object.isFrozen(rows[0].non_authorizations), true);

  const first = registry.getRolePermissionModelStatusGapRow(expectedRowIds[0]);
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.related_material_classes), true);

  assert.throws(() => {
    first.related_material_classes.push("MUTATION_ATTEMPT");
  }, TypeError);

  const reread = registry.getRolePermissionModelStatusGapRow(expectedRowIds[0]);
  assert.equal(reread.related_material_classes.includes("MUTATION_ATTEMPT"), false);
});

test("index export wiring exposes role/permission status-gap helpers without side effects", () => {
  assert.equal(
    index.ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY
      .RP_SG_001_ACTOR_SUBJECT_MODEL_GAP.id,
    expectedRowIds[0],
  );
  assert.equal(
    typeof index.listRolePermissionModelStatusGapRows,
    "function",
  );
  assert.equal(index.isRolePermissionModelImplemented(), false);
});
