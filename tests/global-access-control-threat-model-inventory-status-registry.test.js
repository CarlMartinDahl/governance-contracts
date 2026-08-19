"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const registry = require("../packages/governance/src/global-access-control-threat-model-inventory-status-registry.js");
const indexExports = require("../packages/governance/src/index.js");
const {
  DATA_LOCATION_REGISTRY,
  HIGH_RISK_MATERIAL_CLASSES_DENIED,
  MATERIAL_CLASSES,
} = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const {
  LIFECYCLE_CONTROL_FAMILIES,
} = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const {
  AUDIT_ACCESS_LOG_EVENT_CANDIDATES,
} = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const {
  RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
} = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const {
  THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
} = require("../packages/governance/src/third-party-routing-status-gap-registry.js");
const {
  ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
} = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");

const expectedFamilies = [
  "AUTH_REQUEST_CONTEXT_PARTIAL",
  "TENANT_ISOLATION_PARTIAL",
  "CASE_CONTEXT_ACCESS_CONTROL_PARTIAL",
  "CAPABILITY_GATES_PARTIAL",
  "ROUTE_LEVEL_AUTHORIZATION_PARTIAL",
  "OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP",
  "FUNCTION_LEVEL_AUTHORIZATION_PARTIAL",
  "PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP",
  "ROLE_PERMISSION_MODEL_GAP",
  "ADMIN_SUPPORT_ACCESS_PATHS_GAP",
  "EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL",
  "DATABASE_QUERY_SCOPING_PARTIAL",
  "SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL",
  "ALLOWED_DENIED_TEST_COVERAGE_PARTIAL",
  "CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL",
  "GLOBAL_AUTHORIZATION_MODEL_GAP",
];

const expectedImplementationStatuses = [
  "NOT_ACCESS_CONTROL_IMPLEMENTATION",
  "NOT_RBAC_IMPLEMENTATION",
  "NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
  "NOT_GLOBAL_AUTHORIZATION_MODEL",
  "NOT_RUNTIME_ENFORCEMENT",
  "NOT_ROLE_PERMISSION_MODEL",
  "NOT_ROLE_FIELDS",
  "NOT_PERMISSION_FIELDS",
  "NOT_ROLE_SCHEMA",
  "NOT_PERMISSION_SCHEMA",
  "NOT_ADMIN_SUPPORT_MODEL",
  "NOT_SECURITY_FINDING",
  "NOT_VULNERABILITY_FINDING",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "NO_REMEDIATION_IMPLEMENTED",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedDecisionStatuses = [
  "DOCS_ONLY_INVENTORY_STATUS",
  "REGISTRY_SCAFFOLD_ONLY",
  "PARTIAL_EVIDENCE_ONLY",
  "THREAT_MODEL_INVENTORY_ONLY",
  "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  "BLOCKED_BY_ROLE_PERMISSION_MODEL",
  "BLOCKED_BY_ADMIN_SUPPORT_MODEL",
  "BLOCKED_BY_AUDIT_ACCESS_LOG",
  "BLOCKED_BY_RETENTION_DELETION",
  "BLOCKED_BY_THIRD_PARTY_ROUTING",
  "BLOCKED_BY_RAW_MATERIAL_ROUTING",
  "BLOCKED_BY_GLOBAL_AUTHORIZATION_MODEL",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedRowIds = [
  "GAC-TM-001_AUTH_REQUEST_CONTEXT_PARTIAL",
  "GAC-TM-002_TENANT_ISOLATION_PARTIAL",
  "GAC-TM-003_CASE_CONTEXT_ACCESS_CONTROL_PARTIAL",
  "GAC-TM-004_CAPABILITY_GATES_PARTIAL",
  "GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL",
  "GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP",
  "GAC-TM-007_FUNCTION_LEVEL_AUTHORIZATION_PARTIAL",
  "GAC-TM-008_PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP",
  "GAC-TM-009_ROLE_PERMISSION_MODEL_GAP",
  "GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP",
  "GAC-TM-011_EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL",
  "GAC-TM-012_DATABASE_QUERY_SCOPING_PARTIAL",
  "GAC-TM-013_SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL",
  "GAC-TM-014_ALLOWED_DENIED_TEST_COVERAGE_PARTIAL",
  "GAC-TM-015_CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL",
  "GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP",
];

const requiredFields = [
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
];

const positiveClaimKeys = [
  "authorized",
  "access_granted",
  "access_control_enforced",
  "rbac_implemented",
  "global_authorization_model_created",
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
  "admin_support_runtime_access_authorized",
  "log_viewer_rbac_created",
  "provider_routing_authorized",
  "raw_material_routing_implemented",
];

function collectObjects(value, collected = []) {
  if (!value || typeof value !== "object") {
    return collected;
  }

  collected.push(value);
  for (const nested of Object.values(value)) {
    collectObjects(nested, collected);
  }

  return collected;
}

test("families implementation statuses decision statuses and rows exist exactly", () => {
  assert.deepEqual(
    Object.keys(registry.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_FAMILIES),
    expectedFamilies,
  );
  assert.deepEqual(
    Object.keys(registry.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_IMPLEMENTATION_STATUS),
    expectedImplementationStatuses,
  );
  assert.deepEqual(
    Object.keys(registry.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_DECISION_STATUS),
    expectedDecisionStatuses,
  );
  assert.deepEqual(
    Object.keys(registry.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY),
    expectedRowIds,
  );
  assert.deepEqual(
    registry.listGlobalAccessControlThreatModelFamilies(),
    expectedFamilies,
  );
});

test("rows expose required fields and reference only known tracked registries", () => {
  const knownMaterialClasses = new Set(Object.values(MATERIAL_CLASSES));
  const knownLocationIds = new Set(Object.keys(DATA_LOCATION_REGISTRY));
  const knownAdminGapIds = new Set(
    Object.keys(ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY),
  );
  const knownThirdPartyGapIds = new Set(
    Object.keys(THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY),
  );
  const knownRawRoutingControlIds = new Set(
    Object.values(RAW_MATERIAL_ROUTING_CONTROL_REGISTRY).map(
      (row) => row.control_id,
    ),
  );
  const knownAalEventIds = new Set(Object.keys(AUDIT_ACCESS_LOG_EVENT_CANDIDATES));
  const knownLifecycleFamilies = new Set(Object.values(LIFECYCLE_CONTROL_FAMILIES));

  for (const row of registry.listGlobalAccessControlThreatModelInventoryRows()) {
    assert.deepEqual(Object.keys(row).filter((key) => requiredFields.includes(key)), requiredFields);
    assert.equal(row.id, registry.getGlobalAccessControlThreatModelInventoryRow(row.id).id);
    assert.equal(row.non_authorized_until_closure, true);

    for (const material of row.related_material_classes) {
      assert.equal(knownMaterialClasses.has(material), true, material);
    }
    for (const location of row.related_storage_location_ids) {
      assert.equal(knownLocationIds.has(location), true, location);
    }
    for (const adminGap of row.related_admin_support_gap_ids) {
      assert.equal(knownAdminGapIds.has(adminGap), true, adminGap);
    }
    for (const tprGap of row.related_third_party_status_gap_ids) {
      assert.equal(knownThirdPartyGapIds.has(tprGap), true, tprGap);
    }
    for (const rmrControl of row.related_raw_material_routing_control_ids) {
      assert.equal(knownRawRoutingControlIds.has(rmrControl), true, rmrControl);
    }
    for (const aalEvent of row.related_aal_event_candidate_ids) {
      assert.equal(knownAalEventIds.has(aalEvent), true, aalEvent);
    }
    for (const lifecycleFamily of row.related_lifecycle_families) {
      assert.equal(knownLifecycleFamilies.has(lifecycleFamily), true, lifecycleFamily);
    }
  }
});

test("high-risk material classes and unknown rows remain fail closed", () => {
  const highRiskMaterials = new Set(
    Object.values(HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (entry) => entry.material_class,
    ),
  );

  for (const row of registry.listGlobalAccessControlThreatModelInventoryRows()) {
    for (const material of row.related_material_classes) {
      if (highRiskMaterials.has(material)) {
        assert.equal(row.non_authorizations.authorized, false);
        assert.equal(row.non_authorizations.access_granted, false);
        assert.equal(row.non_authorizations.access_control_enforced, false);
      }
    }
  }

  const unknown = registry.getGlobalAccessControlThreatModelInventoryRow("NOPE");
  assert.equal(unknown.current_authorization_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.non_authorizations.authorized, false);

  const classified = registry.classifyGlobalAccessControlThreatModelInventoryRow("NOPE");
  assert.equal(classified.known, false);
  assert.equal(classified.classification, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(classified.authorized, false);
  assert.equal(classified.access_control_enforced, false);
  assert.equal(classified.security_finding_created, false);
  assert.equal(registry.hasGlobalAccessControlThreatModelInventoryRow("NOPE"), false);
});

test("global implementation and finding helpers remain false", () => {
  assert.equal(registry.isGlobalAccessControlModelImplemented(), false);
  assert.equal(registry.isGlobalAuthorizationModelCreated(), false);
  assert.equal(registry.isAccessControlRuntimeEnforced("GAC-TM-001_AUTH_REQUEST_CONTEXT_PARTIAL"), false);
  assert.equal(registry.isAccessControlRuntimeEnforced("NOPE"), false);
  assert.equal(registry.isSecurityFindingCreated("GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP"), false);
  assert.equal(registry.isSecurityFindingCreated("NOPE"), false);

  const status = registry.getGlobalAccessControlThreatModelNonAuthorizationStatus();
  assert.equal(status.authorized, false);
  assert.equal(status.access_control_enforced, false);
  assert.equal(status.rbac_implemented, false);
  assert.equal(status.global_authorization_model_created, false);
  assert.equal(status.security_finding_created, false);
  assert.equal(status.severity_assigned, false);
  assert.equal(status.remediation_recommended, false);
  assert.equal(status.local_logs_are_ci_evidence, false);
  assert.equal(status.ci_logs_are_release_evidence, false);
  assert.equal(status.human_review_gate_is_system_approval, false);
});

test("no helper output returns positive authorization access finding or approval claims", () => {
  const helperOutputs = [
    registry.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
    registry.listGlobalAccessControlThreatModelInventoryRows(),
    registry.getGlobalAccessControlThreatModelInventoryRow(
      "GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP",
    ),
    registry.getGlobalAccessControlThreatModelInventoryRow("UNKNOWN"),
    registry.classifyGlobalAccessControlThreatModelInventoryRow(
      "GAC-TM-009_ROLE_PERMISSION_MODEL_GAP",
    ),
    registry.classifyGlobalAccessControlThreatModelInventoryRow("UNKNOWN"),
    registry.getGlobalAccessControlThreatModelNonAuthorizationStatus(),
  ];

  for (const output of helperOutputs) {
    for (const object of collectObjects(output)) {
      for (const key of positiveClaimKeys) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          assert.equal(object[key], false, `${key} stayed false`);
        }
      }
    }
  }
});

test("registry data is frozen and helper returns are copy-safe", () => {
  assert.equal(
    Object.isFrozen(registry.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY),
    true,
  );

  const first = registry.getGlobalAccessControlThreatModelInventoryRow(
    "GAC-TM-001_AUTH_REQUEST_CONTEXT_PARTIAL",
  );
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.current_statuses), true);

  assert.throws(() => {
    first.current_statuses.push("MUTATED");
  }, TypeError);

  const second = registry.getGlobalAccessControlThreatModelInventoryRow(
    "GAC-TM-001_AUTH_REQUEST_CONTEXT_PARTIAL",
  );
  assert.equal(second.current_statuses.includes("MUTATED"), false);
});

test("non-overclaim rules and prerequisites preserve access-control boundaries", () => {
  const rules = registry.listGlobalAccessControlThreatModelNonOverclaimRules();
  const prerequisites =
    registry.getGlobalAccessControlThreatModelRequiredPrerequisites();

  for (const expected of [
    "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean RBAC",
    "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean FULL_ACCESS_CONTROL",
    "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean ADMIN_SUPPORT_ACCESS_CONTROL",
    "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean GLOBAL_AUTHORIZATION_MODEL",
    "THREAT_MODEL_ROW does not mean SECURITY_FINDING",
    "THREAT_MODEL_ROW does not mean VULNERABILITY_FINDING",
    "THREAT_MODEL_ROW does not mean SEVERITY_ASSIGNED",
    "THREAT_MODEL_ROW does not mean REMEDIATION_RECOMMENDED",
    "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "CI_LOG does not mean RELEASE_EVIDENCE",
    "HUMAN_REVIEW_GATE does not mean SYSTEM_APPROVAL",
  ]) {
    assert.equal(rules.includes(expected), true, expected);
  }

  for (const expected of [
    "complete global access-control model",
    "role/permission model",
    "role fields",
    "permission fields",
    "role schema",
    "permission schema",
    "admin/support access-control model",
    "object-level authorization review",
    "function-level authorization review",
    "property-level data-overexposure review",
    "wrong-tenant tests",
    "wrong-case tests",
    "wrong-object tests",
    "wrong-function tests",
    "wrong-property tests",
    "allow/deny tests",
    "RBAC/access-control implementation plan",
    "audit/access-log model",
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
  ]) {
    assert.equal(prerequisites.includes(expected), true, expected);
  }
});

test("future storage and evidence boundaries remain non-authorizing", () => {
  const rows = registry.listGlobalAccessControlThreatModelInventoryRows();
  const rowsByStorage = (storageId) =>
    rows.filter((row) => row.related_storage_location_ids.includes(storageId));

  for (const row of rowsByStorage("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE")) {
    assert.equal(DATA_LOCATION_REGISTRY.L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE.non_authorizations.authorized, false);
    assert.equal(row.non_authorizations.log_storage_created, false);
  }
  for (const row of rowsByStorage("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE")) {
    assert.equal(DATA_LOCATION_REGISTRY.L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE.non_authorizations.authorized, false);
    assert.equal(row.non_authorizations.provider_routing_authorized, false);
  }
  for (const row of rowsByStorage("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE")) {
    assert.equal(DATA_LOCATION_REGISTRY.L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE.non_authorizations.authorized, false);
    assert.equal(row.non_authorizations.external_use_authorized, false);
  }
});

test("index export wiring exposes global threat-model registry without side effects", () => {
  assert.equal(
    indexExports.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY[
      "GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP"
    ].non_authorizations.global_authorization_model_created,
    false,
  );
  assert.equal(indexExports.isGlobalAccessControlModelImplemented(), false);
  assert.equal(indexExports.isSecurityFindingCreated("NOPE"), false);
});
