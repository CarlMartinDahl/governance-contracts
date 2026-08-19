"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const rdeRuntime = require("../packages/governance/src/retention-deletion-encryption-runtime-readiness-blocker-status-registry.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const rdeStorage = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const aalRuntime = require("../packages/governance/src/audit-access-log-runtime-readiness-blocker-status-registry.js");
const tprRuntime = require("../packages/governance/src/third-party-routing-runtime-readiness-blocker-status-registry.js");
const rolePermission = require("../packages/governance/src/role-permission-model-status-gap-registry.js");
const runtimeGate = require("../packages/governance/src/runtime-gate-candidate-status-inventory-registry.js");
const globalAccess = require("../packages/governance/src/global-access-control-threat-model-inventory-status-registry.js");
const adminSupport = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const rawRouting = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const aalStorage = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const index = require("../packages/governance/src/index.js");

const expectedIds = Object.freeze([
  "RDE-RUNTIME-BLOCKER-001_RETENTION_POLICY_RUNTIME_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-002_DELETION_POLICY_RUNTIME_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-003_PURGE_ERASURE_POLICY_RUNTIME_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-004_ENCRYPTION_POLICY_RUNTIME_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-005_KEY_MANAGEMENT_POLICY_RUNTIME_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-006_MATERIAL_CLASS_LIFECYCLE_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-007_LOCAL_LOG_RETENTION_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-008_AUDIT_ACCESS_LOG_RETENTION_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-009_EXPORT_ARTIFACT_RETENTION_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-010_PROVIDER_RETENTION_DELETION_POSTURE_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-011_RECIPIENT_DOWNSTREAM_PURGE_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-012_ADMIN_SUPPORT_LIFECYCLE_OPERATION_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-013_RUNTIME_GATE_LIFECYCLE_OPERATION_BOUNDARY",
  "RDE-RUNTIME-BLOCKER-014_HUMAN_PROFESSIONAL_REVIEW_LIFECYCLE_DEPENDENCY",
]);

const expectedFamilies = Object.freeze([
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

const expectedFields = Object.freeze([
  "id",
  "source_blocker_id",
  "family",
  "lifecycle_surface",
  "lifecycle_families",
  "primary_blocker",
  "secondary_blockers",
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

const positiveClaimKeys = Object.freeze([
  "authorized",
  "retention_implemented",
  "deletion_implemented",
  "PURGE_implemented",
  "erasure_implemented",
  "encryption_implemented",
  "key_management_implemented",
  "provider_retention_deletion_implemented",
  "audit_access_log_implemented",
  "rbac_implemented",
  "access_control_implemented",
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

function values(registry, key = "id") {
  return new Set(Object.values(registry).map((row) => row[key]));
}

function assertNoPositiveClaims(value, path = "root") {
  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, nested] of Object.entries(value)) {
    if (positiveClaimKeys.includes(key)) {
      assert.equal(nested, false, `${path}.${key} must remain false`);
    }
    assertNoPositiveClaims(nested, `${path}.${key}`);
  }
}

test("registry exposes exact RDE runtime blocker rows and required field shape", () => {
  assert.deepEqual(
    Object.keys(
      rdeRuntime.RETENTION_DELETION_ENCRYPTION_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
    ),
    expectedIds,
  );
  assert.deepEqual(
    rdeRuntime
      .listRetentionDeletionEncryptionRuntimeReadinessBlockerRows()
      .map((row) => row.id),
    expectedIds,
  );
  assert.deepEqual(
    Object.values(
      rdeRuntime.RETENTION_DELETION_ENCRYPTION_RUNTIME_READINESS_BLOCKER_FAMILIES,
    ),
    expectedFamilies,
  );

  for (const row of rdeRuntime.listRetentionDeletionEncryptionRuntimeReadinessBlockerRows()) {
    assert.deepEqual(Object.keys(row), expectedFields);
    assert.equal(
      row.current_authorization_status,
      rdeRuntime
        .RETENTION_DELETION_ENCRYPTION_RUNTIME_READINESS_DECISION_STATUS
        .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
    );
    assert.ok(
      row.current_runtime_readiness_status.includes(
        rdeRuntime
          .RETENTION_DELETION_ENCRYPTION_RUNTIME_READINESS_DECISION_STATUS
          .RUNTIME_GATE_INVENTORY_DEFERRED,
      ),
    );
    assert.ok(
      row.current_runtime_readiness_status.includes(
        rdeRuntime
          .RETENTION_DELETION_ENCRYPTION_RUNTIME_READINESS_DECISION_STATUS
          .RUNTIME_READINESS_BLOCKED,
      ),
    );
    assertNoPositiveClaims(row, row.id);
  }
});

test("rows reference only tracked registry IDs and material classes", () => {
  const knownStorageIds = values(storage.DATA_LOCATION_REGISTRY);
  const knownMaterialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const knownLifecycleFamilies = new Set(
    Object.values(rdeStorage.LIFECYCLE_CONTROL_FAMILIES),
  );
  const knownRdeDependencyIds = values(rdeStorage.RDE_STORAGE_DEPENDENCY_REGISTRY);
  const knownAalRuntimeIds = values(
    aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
  );
  const knownTprRuntimeIds = values(
    tprRuntime.THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
  );
  const knownRolePermissionIds = values(
    rolePermission.ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY,
  );
  const knownRuntimeGateIds = values(
    runtimeGate.RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
  );
  const knownGlobalAccessIds = values(
    globalAccess.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
  );
  const knownAdminGapIds = values(
    adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
  );
  const knownRawRoutingIds = values(
    rawRouting.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
    "control_id",
  );
  const knownAalEventIds = values(aalStorage.AUDIT_ACCESS_LOG_EVENT_CANDIDATES);

  for (const row of rdeRuntime.listRetentionDeletionEncryptionRuntimeReadinessBlockerRows()) {
    for (const id of row.related_storage_location_ids) {
      assert.ok(knownStorageIds.has(id), `${row.id} storage ${id}`);
    }
    for (const id of row.related_material_classes) {
      assert.ok(knownMaterialClasses.has(id), `${row.id} material ${id}`);
    }
    for (const id of row.lifecycle_families) {
      assert.ok(knownLifecycleFamilies.has(id), `${row.id} lifecycle ${id}`);
    }
    for (const id of row.related_rde_storage_dependency_ids) {
      assert.ok(knownRdeDependencyIds.has(id), `${row.id} RDE dependency ${id}`);
    }
    for (const id of row.related_audit_access_log_runtime_blocker_ids) {
      assert.ok(knownAalRuntimeIds.has(id), `${row.id} AAL blocker ${id}`);
    }
    for (const id of row.related_third_party_runtime_blocker_ids) {
      assert.ok(knownTprRuntimeIds.has(id), `${row.id} TPR blocker ${id}`);
    }
    for (const id of row.related_role_permission_gap_ids) {
      assert.ok(knownRolePermissionIds.has(id), `${row.id} role gap ${id}`);
    }
    for (const id of row.related_runtime_gate_candidate_ids) {
      assert.ok(knownRuntimeGateIds.has(id), `${row.id} runtime gate ${id}`);
    }
    for (const id of row.related_global_access_control_row_ids) {
      assert.ok(knownGlobalAccessIds.has(id), `${row.id} GAC row ${id}`);
    }
    for (const id of row.related_admin_support_gap_ids) {
      assert.ok(knownAdminGapIds.has(id), `${row.id} admin gap ${id}`);
    }
    for (const id of row.related_raw_material_routing_control_ids) {
      assert.ok(knownRawRoutingIds.has(id), `${row.id} RMR control ${id}`);
    }
    for (const id of row.related_aal_event_candidate_ids) {
      assert.ok(knownAalEventIds.has(id), `${row.id} AAL event ${id}`);
    }
  }
});

test("high-risk material and future storage boundaries remain denied", () => {
  const highRiskClasses = new Set(
    Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (row) => row.material_class,
    ),
  );
  const providerRow =
    rdeRuntime.getRetentionDeletionEncryptionRuntimeReadinessBlockerRow(
      "RDE-RUNTIME-BLOCKER-010_PROVIDER_RETENTION_DELETION_POSTURE_BOUNDARY",
    );
  const recipientRow =
    rdeRuntime.getRetentionDeletionEncryptionRuntimeReadinessBlockerRow(
      "RDE-RUNTIME-BLOCKER-011_RECIPIENT_DOWNSTREAM_PURGE_BOUNDARY",
    );

  assert.ok(providerRow.related_storage_location_ids.includes(
    "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
  ));
  assert.ok(recipientRow.related_storage_location_ids.includes(
    "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
  ));

  for (const row of [providerRow, recipientRow]) {
    for (const materialClass of row.related_material_classes) {
      if (highRiskClasses.has(materialClass)) {
        const denial = storage.getHighRiskMaterialClassDenial(materialClass);
        assert.equal(denial.denied, true);
        assertNoPositiveClaims(denial, materialClass);
      }
    }
    assertNoPositiveClaims(row, row.id);
  }
});

test("unknown row lookup fails closed and remains not evidenced", () => {
  const unknown =
    rdeRuntime.getRetentionDeletionEncryptionRuntimeReadinessBlockerRow(
      "RDE-RUNTIME-BLOCKER-999_UNKNOWN",
    );
  const classification =
    rdeRuntime.classifyRetentionDeletionEncryptionRuntimeReadinessBlockerRow(
      "RDE-RUNTIME-BLOCKER-999_UNKNOWN",
    );

  assert.equal(
    rdeRuntime.hasRetentionDeletionEncryptionRuntimeReadinessBlockerRow(
      "RDE-RUNTIME-BLOCKER-999_UNKNOWN",
    ),
    false,
  );
  assert.equal(unknown.family, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(classification.known, false);
  assert.equal(classification.status, "UNKNOWN_NOT_EVIDENCED");
  assertNoPositiveClaims(unknown, "unknown");
  assertNoPositiveClaims(classification, "unknown classification");
});

test("helpers remain scaffold only and never return positive claims", () => {
  assert.equal(rdeRuntime.isRetentionImplemented(), false);
  assert.equal(rdeRuntime.isDeletionImplemented(), false);
  assert.equal(rdeRuntime.isPurgeErasureImplemented(), false);
  assert.equal(rdeRuntime.isEncryptionImplemented(), false);
  assert.equal(rdeRuntime.isKeyManagementImplemented(), false);
  assert.equal(rdeRuntime.isProviderRetentionDeletionImplemented(), false);
  assert.equal(rdeRuntime.isSecurityFindingCreated(), false);

  assertNoPositiveClaims(
    rdeRuntime.getRetentionDeletionEncryptionRuntimeReadinessNonAuthorizationStatus(),
  );
  assertNoPositiveClaims(
    rdeRuntime.listRetentionDeletionEncryptionRuntimeReadinessBlockerRows(),
  );
  assertNoPositiveClaims(
    rdeRuntime.classifyRetentionDeletionEncryptionRuntimeReadinessBlockerRow(
      expectedIds[0],
    ),
  );
});

test("index export wiring exposes the scaffold without replacing module exports", () => {
  assert.equal(
    index.RETENTION_DELETION_ENCRYPTION_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
    rdeRuntime.RETENTION_DELETION_ENCRYPTION_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
  );
  assert.equal(
    index.listRetentionDeletionEncryptionRuntimeReadinessBlockerRows,
    rdeRuntime.listRetentionDeletionEncryptionRuntimeReadinessBlockerRows,
  );
});
