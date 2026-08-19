const assert = require("node:assert/strict");
const test = require("node:test");

const rdeRuntime = require("../packages/governance/src/retention-deletion-encryption-runtime-readiness-blocker-status-registry.js");
const rdeStorage = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const aalRuntime = require("../packages/governance/src/audit-access-log-runtime-readiness-blocker-status-registry.js");
const tprRuntime = require("../packages/governance/src/third-party-routing-runtime-readiness-blocker-status-registry.js");
const rolePermission = require("../packages/governance/src/role-permission-model-status-gap-registry.js");
const runtimeGate = require("../packages/governance/src/runtime-gate-candidate-status-inventory-registry.js");
const globalAccess = require("../packages/governance/src/global-access-control-threat-model-inventory-status-registry.js");
const adminSupport = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const rawMaterialRouting = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const auditAccessLog = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const rbacScaffold = require("../packages/governance/src/rbac-role-permission-deny-by-default-scaffold.js");

const EXPECTED_SOURCE_IDS = Object.freeze([
  "RDE-RUNTIME-BLOCKER-001",
  "RDE-RUNTIME-BLOCKER-002",
  "RDE-RUNTIME-BLOCKER-003",
  "RDE-RUNTIME-BLOCKER-004",
  "RDE-RUNTIME-BLOCKER-005",
  "RDE-RUNTIME-BLOCKER-006",
  "RDE-RUNTIME-BLOCKER-007",
  "RDE-RUNTIME-BLOCKER-008",
  "RDE-RUNTIME-BLOCKER-009",
  "RDE-RUNTIME-BLOCKER-010",
  "RDE-RUNTIME-BLOCKER-011",
  "RDE-RUNTIME-BLOCKER-012",
  "RDE-RUNTIME-BLOCKER-013",
  "RDE-RUNTIME-BLOCKER-014",
]);

const EXPECTED_FAMILIES = Object.freeze([
  "RETENTION_POLICY_BLOCKER",
  "DELETION_POLICY_BLOCKER",
  "PURGE_ERASURE_POLICY_BLOCKER",
  "ENCRYPTION_POLICY_BLOCKER",
  "KEY_MANAGEMENT_POLICY_BLOCKER",
  "MATERIAL_CLASS_LIFECYCLE_BLOCKER",
  "LOCAL_LOG_RETENTION_BLOCKER",
  "AUDIT_ACCESS_LOG_RETENTION_BLOCKER",
  "EXPORT_ARTIFACT_RETENTION_BLOCKER",
  "PROVIDER_RETENTION_DELETION_POSTURE_BLOCKER",
  "RECIPIENT_DOWNSTREAM_PURGE_BLOCKER",
  "ADMIN_SUPPORT_LIFECYCLE_OPERATION_BLOCKER",
  "RUNTIME_GATE_LIFECYCLE_OPERATION_BLOCKER",
  "HUMAN_PROFESSIONAL_REVIEW_LIFECYCLE_DEPENDENCY_BLOCKER",
]);

const REQUIRED_ROW_FIELDS = Object.freeze([
  "id",
  "source_blocker_id",
  "family",
  "lifecycle_surface",
  "lifecycle_families",
  "primary_blocker",
  "implementation_gap",
  "required_prerequisites",
  "required_implementation_evidence",
  "required_test_evidence",
  "overclaim_risk",
  "current_runtime_readiness_status",
  "current_authorization_status",
  "future_boundary_posture",
  "non_authorized_until_closure",
  "related_storage_location_ids",
  "related_material_classes",
  "related_rde_storage_dependency_ids",
  "related_audit_access_log_runtime_blocker_ids",
  "related_third_party_runtime_blocker_ids",
  "related_role_permission_gap_ids",
  "related_runtime_gate_candidate_ids",
  "related_global_access_control_row_ids",
  "related_admin_support_gap_ids",
  "related_raw_material_routing_control_ids",
  "related_aal_event_candidate_ids",
  "evidence_posture",
  "non_authorizations",
  "notes",
]);

const POSITIVE_CLAIM_KEYS = Object.freeze([
  "authorized",
  "access_granted",
  "retention_implemented",
  "deletion_implemented",
  "PURGE_implemented",
  "purge_implemented",
  "erasure_implemented",
  "encryption_implemented",
  "key_management_implemented",
  "provider_retention_deletion_implemented",
  "provider_deletion_verified",
  "recipient_purge_verified",
  "audit_access_log_implemented",
  "audit_log_implemented",
  "access_log_implemented",
  "current_logging_implemented",
  "event_emitter_implemented",
  "event_taxonomy_runtime_code_created",
  "log_schema_created",
  "log_storage_created",
  "rbac_implemented",
  "rbac_access_control_implemented",
  "access_control_implemented",
  "access_control_enforced",
  "global_authorization_model_created",
  "role_permission_model_created",
  "admin_support_access_authorized",
  "admin_support_runtime_access_authorized",
  "runtime_gate_implemented",
  "runtime_gate_enforced",
  "schema_gate_enforced",
  "workflow_gate_enforced",
  "validator_dispatch_created",
  "runtime_registry_lookup_created",
  "third_party_routing_implemented",
  "third_party_routing_authorized",
  "provider_routing_authorized",
  "raw_material_routing_implemented",
  "raw_material_processing_authorized",
  "metadata_acquisition_authorized",
  "source_package_inspection_authorized",
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
  "system_approval_created",
]);

function rows() {
  return rdeRuntime.listRetentionDeletionEncryptionRuntimeReadinessBlockerRows();
}

function assertNoPositiveClaims(value, path = "value") {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => assertNoPositiveClaims(entry, `${path}[${index}]`));
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, entry] of Object.entries(value)) {
    if (POSITIVE_CLAIM_KEYS.includes(key)) {
      assert.notEqual(entry, true, `${path}.${key} must not be positive`);
    }
    assertNoPositiveClaims(entry, `${path}.${key}`);
  }
}

function assertSetContainsEvery(actual, expected, label) {
  for (const value of expected) {
    assert.ok(actual.has(value), `${label} missing ${value}`);
  }
}

function collectText(row) {
  return JSON.stringify([
    row.implementation_gap,
    row.required_prerequisites,
    row.required_implementation_evidence,
    row.required_test_evidence,
    row.overclaim_risk,
    row.current_runtime_readiness_status,
    row.current_authorization_status,
    row.future_boundary_posture,
    row.non_authorized_until_closure,
    row.evidence_posture,
    row.notes,
  ]);
}

test("RDE runtime blocker registry exposes exact rows families and required fields", () => {
  const registryRows = rows();

  assert.deepEqual(
    registryRows.map((row) => row.source_blocker_id),
    EXPECTED_SOURCE_IDS,
  );
  assert.deepEqual(
    registryRows.map((row) => row.family),
    EXPECTED_FAMILIES,
  );

  const exportedFamilies = new Set(
    Object.values(rdeRuntime.listRetentionDeletionEncryptionRuntimeReadinessBlockerFamilies()),
  );
  assertSetContainsEvery(exportedFamilies, EXPECTED_FAMILIES, "exported family list");

  for (const row of registryRows) {
    for (const field of REQUIRED_ROW_FIELDS) {
      assert.ok(Object.hasOwn(row, field), `${row.id} missing ${field}`);
    }

    assert.ok(
      row.current_runtime_readiness_status.includes("DOCS_ONLY_BLOCKER_STATUS"),
      `${row.id} must remain docs-only`,
    );
    assert.ok(
      row.current_runtime_readiness_status.includes("REGISTRY_SCAFFOLD_ONLY"),
      `${row.id} must remain scaffold-only`,
    );
    assert.ok(
      row.current_runtime_readiness_status.includes("FUTURE_LIFECYCLE_CANDIDATE_ONLY"),
      `${row.id} must remain future/candidate only`,
    );
    assert.ok(
      row.current_runtime_readiness_status.includes("RUNTIME_GATE_INVENTORY_DEFERRED"),
      `${row.id} must remain runtime-gate deferred`,
    );
    assert.equal(
      row.current_authorization_status,
      "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
      `${row.id} must not authorize runtime enforcement`,
    );
    assertNoPositiveClaims(row, row.id);
  }
});

test("RDE runtime blocker references align to tracked registries", () => {
  const storageLocationIds = new Set(storage.listDataLocations().map((row) => row.id));
  const materialClasses = new Set(storage.listMaterialClasses());
  const lifecycleFamilies = new Set(rdeStorage.listLifecycleControlFamilies());
  const rdeStorageDependencyIds = new Set(
    rdeStorage.listRdeStorageDependencies().map((row) => row.id),
  );
  const aalRuntimeIds = new Set(
    aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows().map((row) => row.id),
  );
  const tprRuntimeIds = new Set(
    tprRuntime.listThirdPartyRoutingRuntimeReadinessBlockerRows().map((row) => row.id),
  );
  const roleGapIds = new Set(
    rolePermission.listRolePermissionModelStatusGapRows().map((row) => row.id),
  );
  const runtimeGateIds = new Set(
    runtimeGate.listRuntimeGateCandidateStatusInventoryRows().map((row) => row.id),
  );
  const globalAccessIds = new Set(
    globalAccess.listGlobalAccessControlThreatModelInventoryRows().map((row) => row.id),
  );
  const adminSupportIds = new Set(
    adminSupport.listAdminSupportRuntimeReadinessStatusGaps().map((row) => row.id),
  );
  const rawRoutingIds = new Set(
    rawMaterialRouting.listRawMaterialRoutingControls().map((row) => row.control_id),
  );
  const aalEventIds = new Set(
    auditAccessLog.listAuditAccessLogEventCandidates().map((row) => row.id),
  );

  for (const row of rows()) {
    assertSetContainsEvery(storageLocationIds, row.related_storage_location_ids, row.id);
    assertSetContainsEvery(materialClasses, row.related_material_classes, row.id);
    assertSetContainsEvery(lifecycleFamilies, row.lifecycle_families, row.id);
    assertSetContainsEvery(rdeStorageDependencyIds, row.related_rde_storage_dependency_ids, row.id);
    assertSetContainsEvery(
      aalRuntimeIds,
      row.related_audit_access_log_runtime_blocker_ids,
      row.id,
    );
    assertSetContainsEvery(
      tprRuntimeIds,
      row.related_third_party_runtime_blocker_ids,
      row.id,
    );
    assertSetContainsEvery(roleGapIds, row.related_role_permission_gap_ids, row.id);
    assertSetContainsEvery(runtimeGateIds, row.related_runtime_gate_candidate_ids, row.id);
    assertSetContainsEvery(globalAccessIds, row.related_global_access_control_row_ids, row.id);
    assertSetContainsEvery(adminSupportIds, row.related_admin_support_gap_ids, row.id);
    assertSetContainsEvery(rawRoutingIds, row.related_raw_material_routing_control_ids, row.id);
    assertSetContainsEvery(aalEventIds, row.related_aal_event_candidate_ids, row.id);
  }
});

test("high-risk material classes and future storage boundaries remain denied", () => {
  for (const materialClass of Object.keys(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED)) {
    const denial = storage.getHighRiskMaterialClassDenial(materialClass);
    assert.equal(denial.denied, true, `${materialClass} must remain denied`);
    assert.equal(denial.authorized, false, `${materialClass} must not be authorized`);
    assert.equal(
      denial.external_use_authorized,
      false,
      `${materialClass} must not authorize external use`,
    );
    assert.equal(
      denial.product_candidate_authorized,
      false,
      `${materialClass} must not authorize product candidate`,
    );
  }

  for (const id of [
    "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
    "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
    "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
  ]) {
    const location = storage.getDataLocation(id);
    assert.match(location.status, /FUTURE/, `${id} must remain future-only`);
    assert.equal(location.non_authorizations.authorized, false, `${id} must be unauthorized`);
    assert.equal(
      location.non_authorizations.external_use_authorized,
      false,
      `${id} must not authorize external use`,
    );
    assert.ok(
      location.implementation_statuses.some((status) => status.includes("NOT_STORAGE")),
      `${id} must not create storage implementation`,
    );
  }

  const referencedFutureLocations = new Set(rows().flatMap((row) => row.related_storage_location_ids));
  assert.ok(referencedFutureLocations.has("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"));
  assert.ok(referencedFutureLocations.has("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"));
  assert.ok(referencedFutureLocations.has("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE"));
});

test("unknown RDE runtime blocker lookup fails closed", () => {
  const unknown = rdeRuntime.getRetentionDeletionEncryptionRuntimeReadinessBlockerRow(
    "RDE-RUNTIME-BLOCKER-999_UNKNOWN",
  );
  const classification = rdeRuntime.classifyRetentionDeletionEncryptionRuntimeReadinessBlockerRow(
    "RDE-RUNTIME-BLOCKER-999_UNKNOWN",
  );

  assert.equal(unknown.source_blocker_id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.family, "UNKNOWN_NOT_EVIDENCED");
  assert.deepEqual(unknown.current_runtime_readiness_status, ["UNKNOWN_NOT_EVIDENCED"]);
  assert.equal(unknown.current_authorization_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.non_authorizations.authorized, false);
  assert.equal(classification.known, false);
  assert.equal(classification.status, "UNKNOWN_NOT_EVIDENCED");
  assertNoPositiveClaims(unknown, "unknown");
  assertNoPositiveClaims(classification, "unknown classification");
});

test("implementation helpers and imported module postures remain globally false", () => {
  assert.equal(rdeRuntime.isRetentionImplemented(), false);
  assert.equal(rdeRuntime.isDeletionImplemented(), false);
  assert.equal(rdeRuntime.isPurgeErasureImplemented(), false);
  assert.equal(rdeRuntime.isEncryptionImplemented(), false);
  assert.equal(rdeRuntime.isKeyManagementImplemented(), false);
  assert.equal(rdeRuntime.isProviderRetentionDeletionImplemented(), false);
  assert.equal(rdeRuntime.isSecurityFindingCreated(), false);

  assert.equal(rdeStorage.isLifecycleImplementationCreated(), false);
  assert.equal(auditAccessLog.isAuditAccessLogImplementationCreated(), false);
  assert.equal(aalRuntime.isAuditAccessLogImplemented(), false);
  assert.equal(aalRuntime.isEventEmitterImplemented(), false);
  assert.equal(aalRuntime.isEventTaxonomyRuntimeCodeCreated(), false);
  assert.equal(aalRuntime.isLogSchemaCreated(), false);
  assert.equal(aalRuntime.isLogStorageCreated(), false);
  assert.equal(tprRuntime.isThirdPartyRoutingImplemented(), false);
  assert.equal(tprRuntime.isThirdPartyRouteAuthorized(), false);
  assert.equal(rolePermission.isRbacImplemented(), false);
  assert.equal(rolePermission.isAccessControlImplemented(), false);
  assert.equal(rolePermission.isRolePermissionModelImplemented(), false);
  assert.equal(runtimeGate.isRuntimeGateImplemented(), false);
  assert.equal(runtimeGate.isRuntimeGateEnforced(), false);
  assert.equal(runtimeGate.isValidatorDispatchCreated(), false);
  assert.equal(runtimeGate.isRuntimeRegistryLookupCreated(), false);
  assert.equal(globalAccess.isGlobalAuthorizationModelCreated(), false);
  assert.equal(globalAccess.isSecurityFindingCreated(), false);
  assert.equal(adminSupport.isAdminSupportRuntimeAccessAuthorized(), false);
  assert.equal(adminSupport.isAdminSupportRuntimeAccessImplemented(), false);
  assert.equal(rawMaterialRouting.isRawMaterialRoutingImplemented(), false);
  assert.equal(rawMaterialRouting.isRawMaterialRouteAuthorized(), false);

  const denyDecision = rbacScaffold.deriveRbacDenyByDefaultAccessDecision({
    actor_type: "UNKNOWN_ACTOR",
    permission_category: "UNKNOWN_PERMISSION",
    resource_material_scope: "UNKNOWN_SCOPE",
  });
  assert.equal(denyDecision.authorized, false);
});

test("non-overclaim rules and prerequisites preserve lifecycle runtime boundaries", () => {
  const rules = rdeRuntime.listRetentionDeletionEncryptionRuntimeReadinessNonOverclaimRules();
  for (const token of [
    "RETENTION_IMPLEMENTED",
    "DELETION_IMPLEMENTED",
    "PURGE_IMPLEMENTED",
    "ERASURE_IMPLEMENTED",
    "ENCRYPTION_IMPLEMENTED",
    "KEY_MANAGEMENT_IMPLEMENTED",
    "PROVIDER_VERIFICATION",
    "RECIPIENT_VERIFICATION",
    "AUDIT_LOG_IMPLEMENTED",
    "RBAC_IMPLEMENTED",
    "RUNTIME_ENFORCEMENT",
    "SYSTEM_APPROVAL",
    "CI_EVIDENCE",
    "RELEASE_EVIDENCE",
  ]) {
    assert.ok(rules.some((rule) => rule.includes(token)), `missing non-overclaim token ${token}`);
  }

  const combinedPrerequisiteText = JSON.stringify([
    rdeRuntime.getRetentionDeletionEncryptionRuntimeReadinessRequiredPrerequisites(),
    rows().flatMap((row) => row.required_prerequisites),
    rows().flatMap((row) => row.implementation_gap),
    rows().flatMap((row) => row.required_implementation_evidence),
    rows().flatMap((row) => row.required_test_evidence),
    rows().flatMap((row) => row.overclaim_risk),
    rolePermission.getRolePermissionModelRequiredPrerequisites(),
    runtimeGate.getRuntimeGateCandidateRequiredPrerequisites(),
    globalAccess.getGlobalAccessControlThreatModelRequiredPrerequisites(),
    adminSupport.getAdminSupportRuntimeReadinessRequiredPrerequisites(),
  ]).toLowerCase();

  for (const token of [
    "lifecycle",
    "retention",
    "deletion",
    "purge",
    "erasure",
    "encryption",
    "key",
    "provider",
    "audit",
    "rbac",
    "access",
    "runtime gate",
    "validator",
    "registry",
    "allow",
    "deny",
    "no-raw",
    "no-private",
    "no-source",
    "local",
    "ci",
    "release",
    "external",
    "non-proof",
    "human",
    "professional",
  ]) {
    assert.ok(combinedPrerequisiteText.includes(token), `missing prerequisite posture ${token}`);
  }

  for (const row of rows()) {
    const text = collectText(row);
    assert.match(text, /NOT_RETENTION_IMPLEMENTATION/);
    assert.match(text, /NOT_DELETION_IMPLEMENTATION/);
    assert.match(text, /NOT_PURGE_IMPLEMENTATION/);
    assert.match(text, /NOT_ERASURE_IMPLEMENTATION/);
    assert.match(text, /NOT_ENCRYPTION_IMPLEMENTATION/);
    assert.match(text, /NOT_KEY_MANAGEMENT_IMPLEMENTATION/);
    assert.match(text, /NOT_PROVIDER_RETENTION_DELETION_POSTURE/);
    assert.match(text, /NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION/);
    assert.match(text, /NOT_RBAC_IMPLEMENTATION/);
    assert.match(text, /NOT_ACCESS_CONTROL_IMPLEMENTATION/);
    assert.match(text, /NOT_RUNTIME_GATE_IMPLEMENTATION/);
    assert.match(text, /NOT_VALIDATOR_DISPATCH/);
    assert.match(text, /NOT_RUNTIME_REGISTRY_LOOKUP/);
    assert.match(text, /NOT_SECURITY_FINDING/);
    assert.match(text, /NO_SEVERITY_ASSIGNED/);
    assert.match(text, /NO_REMEDIATION_RECOMMENDED/);
    assert.match(text, /NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT/);
  }
});

test("helper outputs across imported modules do not return positive claims", () => {
  const helperOutputs = [
    rdeRuntime.getRetentionDeletionEncryptionRuntimeReadinessNonAuthorizationStatus(),
    rdeRuntime.getRetentionDeletionEncryptionRuntimeReadinessRequiredPrerequisites(),
    rdeRuntime.listRetentionDeletionEncryptionRuntimeReadinessNonOverclaimRules(),
    rdeRuntime.listRetentionDeletionEncryptionRuntimeReadinessBlockerRows(),
    rdeStorage.getRdeNonAuthorizationStatus(),
    rdeStorage.getRdeRequiredPrerequisites(),
    rdeStorage.listRdeStorageDependencies(),
    storage.getStorageRegistryNonAuthorizationStatus(),
    storage.getStorageDependencyMap(),
    aalRuntime.getAuditAccessLogRuntimeReadinessNonAuthorizationStatus(),
    aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows(),
    tprRuntime.getThirdPartyRoutingRuntimeReadinessNonAuthorizationStatus(),
    tprRuntime.listThirdPartyRoutingRuntimeReadinessBlockerRows(),
    rolePermission.getRolePermissionModelNonAuthorizationStatus(),
    rolePermission.listRolePermissionModelStatusGapRows(),
    runtimeGate.getRuntimeGateCandidateNonAuthorizationStatus(),
    runtimeGate.listRuntimeGateCandidateStatusInventoryRows(),
    globalAccess.getGlobalAccessControlThreatModelNonAuthorizationStatus(),
    globalAccess.listGlobalAccessControlThreatModelInventoryRows(),
    adminSupport.getAdminSupportRuntimeReadinessNonAuthorizationStatus(),
    adminSupport.listAdminSupportRuntimeReadinessStatusGaps(),
    rawMaterialRouting.getRawMaterialRoutingNonAuthorizationStatus(),
    rawMaterialRouting.listRawMaterialRoutingControls(),
    auditAccessLog.getAalNonAuthorizationStatus(),
    auditAccessLog.listAalStorageDependencies(),
    auditAccessLog.listAuditAccessLogEventCandidates(),
    rbacScaffold.accessDecisionRegistry,
    rbacScaffold.roleCategoryRegistry,
    rbacScaffold.permissionCategoryRegistry,
    rbacScaffold.resourceMaterialScopeRegistry,
  ];

  helperOutputs.forEach((output, index) => {
    assertNoPositiveClaims(output, `helperOutputs[${index}]`);
  });
});
