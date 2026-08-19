"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const aalRuntime = require("../packages/governance/src/audit-access-log-runtime-readiness-blocker-status-registry.js");
const aalStorage = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const rolePermission = require("../packages/governance/src/role-permission-model-status-gap-registry.js");
const runtimeGate = require("../packages/governance/src/runtime-gate-candidate-status-inventory-registry.js");
const globalAccess = require("../packages/governance/src/global-access-control-threat-model-inventory-status-registry.js");
const adminSupport = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const thirdParty = require("../packages/governance/src/third-party-routing-status-gap-registry.js");
const rawRouting = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const lifecycle = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const index = require("../packages/governance/src/index.js");

const expectedIds = Object.freeze([
  "AAL-RUNTIME-BLOCKER-001_MATERIAL_INTAKE_EVENT",
  "AAL-RUNTIME-BLOCKER-002_BLOCKED_PROHIBITED_INGRESS_EVENT",
  "AAL-RUNTIME-BLOCKER-003_QUARANTINE_BLOCK_DECISION_EVENT",
  "AAL-RUNTIME-BLOCKER-004_REDACTION_SANITIZATION_EVENT",
  "AAL-RUNTIME-BLOCKER-005_MATERIAL_ROUTING_EVENT",
  "AAL-RUNTIME-BLOCKER-006_REVIEW_ACCESS_EVENT",
  "AAL-RUNTIME-BLOCKER-007_MANIFEST_VALIDATION_EVENT",
  "AAL-RUNTIME-BLOCKER-008_EXPORT_DOWNLOAD_EVENT",
  "AAL-RUNTIME-BLOCKER-009_PACKET_DELIVERY_PROMOTION_EVENT",
  "AAL-RUNTIME-BLOCKER-010_LOCAL_LOG_TEST_TRANSCRIPT_HANDLING_EVENT",
  "AAL-RUNTIME-BLOCKER-011_ADMIN_SUPPORT_ACCESS_ATTEMPT_EVENT",
  "AAL-RUNTIME-BLOCKER-012_RETENTION_DELETION_OPERATION_EVENT",
  "AAL-RUNTIME-BLOCKER-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT",
  "AAL-RUNTIME-BLOCKER-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE_EVENT",
  "AAL-RUNTIME-BLOCKER-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT",
  "AAL-RUNTIME-BLOCKER-016_AUDIT_LOG_VIEWER_ACCESS_EVENT",
  "AAL-RUNTIME-BLOCKER-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS_EVENT",
]);

const expectedFields = Object.freeze([
  "id",
  "source_blocker_id",
  "family",
  "audit_access_log_surface",
  "event_family_candidate",
  "event_type_candidate",
  "allowed_future_event_content",
  "prohibited_event_log_content",
  "no_raw_no_private_no_source_locator_requirement",
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
  "related_material_classes",
  "related_storage_location_ids",
  "related_role_permission_gap_ids",
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
]);

const positiveClaimKeys = Object.freeze([
  "authorized",
  "access_granted",
  "audit_access_log_implemented",
  "current_logging_implemented",
  "audit_logging_implemented",
  "access_logging_implemented",
  "event_taxonomy_runtime_code_created",
  "event_emitter_implemented",
  "log_schema_created",
  "log_storage_created",
  "log_viewer_rbac_created",
  "rbac_implemented",
  "access_control_implemented",
  "role_permission_model_created",
  "admin_support_access_authorized",
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

test("registry exposes exact blocker rows and required field shape", () => {
  assert.deepEqual(
    Object.keys(
      aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
    ),
    expectedIds,
  );
  assert.equal(aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows().length, 17);
  assert.equal(
    aalRuntime.listAuditAccessLogRuntimeReadinessBlockerFamilies().length,
    17,
  );

  for (const row of aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows()) {
    assert.deepEqual(Object.keys(row), expectedFields);
    assert.equal(row.no_raw_no_private_no_source_locator_requirement, true);
    assert.equal(
      row.current_authorization_status,
      aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
        .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
    );
    assert.ok(
      row.current_runtime_readiness_status.includes(
        aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
          .RUNTIME_GATE_INVENTORY_DEFERRED,
      ),
    );
    assert.ok(
      row.current_runtime_readiness_status.includes(
        aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
          .NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT,
      ),
    );
  }
});

test("rows reference only tracked registry ids", () => {
  const knownMaterialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const knownStorageIds = values(storage.DATA_LOCATION_REGISTRY);
  const knownAalEventIds = values(aalStorage.AUDIT_ACCESS_LOG_EVENT_CANDIDATES);
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
  const knownThirdPartyIds = values(
    thirdParty.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
  );
  const knownRawRoutingIds = values(
    rawRouting.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
    "control_id",
  );
  const knownLifecycleFamilies = new Set(
    Object.values(lifecycle.LIFECYCLE_CONTROL_FAMILIES),
  );

  for (const row of aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows()) {
    for (const id of row.related_material_classes) {
      assert.ok(knownMaterialClasses.has(id), `${row.id} material ${id}`);
    }
    for (const id of row.related_storage_location_ids) {
      assert.ok(knownStorageIds.has(id), `${row.id} storage ${id}`);
    }
    for (const id of row.related_aal_event_candidate_ids) {
      assert.ok(knownAalEventIds.has(id), `${row.id} AAL event ${id}`);
    }
    for (const id of row.related_role_permission_gap_ids) {
      assert.ok(knownRolePermissionIds.has(id), `${row.id} RP gap ${id}`);
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
    for (const id of row.related_third_party_status_gap_ids) {
      assert.ok(knownThirdPartyIds.has(id), `${row.id} TPR gap ${id}`);
    }
    for (const id of row.related_raw_material_routing_control_ids) {
      assert.ok(knownRawRoutingIds.has(id), `${row.id} RMR control ${id}`);
    }
    for (const id of row.related_lifecycle_families) {
      assert.ok(knownLifecycleFamilies.has(id), `${row.id} lifecycle ${id}`);
    }
  }
});

test("blocker rows preserve no-content and evidence boundary wording", () => {
  for (const row of aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows()) {
    assert.ok(row.allowed_future_event_content.includes("no raw marker"));
    assert.ok(row.allowed_future_event_content.includes("no private marker"));
    assert.ok(
      row.allowed_future_event_content.includes("no source locator marker"),
    );
    assert.ok(row.prohibited_event_log_content.includes("raw text"));
    assert.ok(row.prohibited_event_log_content.includes("private facts"));
    assert.ok(row.prohibited_event_log_content.includes("source locators"));
    assert.ok(row.prohibited_event_log_content.includes("tokens"));
    assert.ok(row.prohibited_event_log_content.includes("external-use claims"));
    assert.ok(
      row.prohibited_event_log_content.includes("product-candidate claims"),
    );
    assert.ok(
      row.evidence_posture.includes(
        aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE
          .LOCAL_LOGS_NOT_CI_EVIDENCE,
      ),
    );
    assert.ok(
      row.evidence_posture.includes(
        aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE
          .LOCAL_LOGS_NOT_PACKET_COMPONENTS,
      ),
    );
    assert.ok(
      row.evidence_posture.includes(
        aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_EVIDENCE_POSTURE
          .CI_TESTED_SCENARIO_EVIDENCE,
      ),
    );
  }
});

test("high-risk material classes remain denied and not authorized", () => {
  for (const row of Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED)) {
    assert.equal(row.denied, true);
    assert.equal(row.authorized, false);
    assert.equal(row.external_use_authorized, false);
    assert.equal(row.product_candidate_authorized, false);
    assert.equal(row.release_approved, false);
    assert.equal(row.runtime_certification_created, false);
    assert.equal(row.technical_signoff_created, false);
  }
});

test("helpers fail closed and do not create implementation claims", () => {
  const unknown = aalRuntime.getAuditAccessLogRuntimeReadinessBlockerRow(
    "UNKNOWN_AAL_RUNTIME_BLOCKER",
  );
  assert.equal(
    unknown.current_authorization_status,
    aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
      .UNKNOWN_NOT_EVIDENCED,
  );
  assert.equal(
    aalRuntime.hasAuditAccessLogRuntimeReadinessBlockerRow(
      "UNKNOWN_AAL_RUNTIME_BLOCKER",
    ),
    false,
  );
  assert.equal(
    aalRuntime.classifyAuditAccessLogRuntimeReadinessBlockerRow(
      "UNKNOWN_AAL_RUNTIME_BLOCKER",
    ).known,
    false,
  );

  assert.equal(aalRuntime.isAuditAccessLogImplemented(), false);
  assert.equal(aalRuntime.isCurrentLoggingImplemented(), false);
  assert.equal(aalRuntime.isEventTaxonomyRuntimeCodeCreated(), false);
  assert.equal(aalRuntime.isEventEmitterImplemented(), false);
  assert.equal(aalRuntime.isLogSchemaCreated(), false);
  assert.equal(aalRuntime.isLogStorageCreated(), false);
  assert.equal(aalRuntime.isLogViewerRbacCreated(), false);
  assert.equal(aalRuntime.isSecurityFindingCreated(), false);

  assertNoPositiveClaims(aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows());
  assertNoPositiveClaims(
    aalRuntime.getAuditAccessLogRuntimeReadinessNonAuthorizationStatus(),
  );
});

test("non-overclaim rules and prerequisites preserve runtime boundary", () => {
  const rules = aalRuntime.listAuditAccessLogRuntimeReadinessNonOverclaimRules();
  assert.ok(
    rules.includes(
      "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_REGISTRY does not mean AUDIT_ACCESS_LOG_IMPLEMENTATION",
    ),
  );
  assert.ok(rules.includes("AUDIT_ACCESS_LOG_BLOCKER_ROW does not mean CURRENT_LOGGING"));
  assert.ok(rules.includes("EVENT_TYPE_CANDIDATE does not mean EVENT_EMITTER"));
  assert.ok(rules.includes("LOCAL_LOG does not mean CI_EVIDENCE"));
  assert.ok(rules.includes("LOCAL_LOG does not mean PACKET_COMPONENT"));
  assert.ok(rules.includes("CI_LOG does not mean RELEASE_EVIDENCE"));
  assert.ok(rules.includes("DOCS_ONLY does not mean RUNTIME_ENFORCEMENT"));
  assert.ok(rules.includes("BLOCKER_ROW does not mean SECURITY_FINDING"));
  assert.ok(rules.includes("BLOCKER_ROW does not mean SEVERITY_ASSIGNED"));
  assert.ok(rules.includes("BLOCKER_ROW does not mean REMEDIATION_RECOMMENDED"));

  const prerequisites =
    aalRuntime.getAuditAccessLogRuntimeReadinessRequiredPrerequisites();
  assert.ok(prerequisites.includes("audit/access-log implementation plan"));
  assert.ok(prerequisites.includes("event taxonomy runtime code"));
  assert.ok(prerequisites.includes("log schema"));
  assert.ok(prerequisites.includes("log storage policy"));
  assert.ok(prerequisites.includes("log viewer RBAC model"));
  assert.ok(prerequisites.includes("human/professional review gate"));
});

test("exports are copy-safe and available from package index", () => {
  const row = aalRuntime.getAuditAccessLogRuntimeReadinessBlockerRow(
    expectedIds[0],
  );
  assert.equal(Object.isFrozen(row), true);
  assert.equal(Object.isFrozen(row.related_material_classes), true);
  assert.throws(() => row.related_material_classes.push("MUTATION"));

  assert.equal(
    index.AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
    aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
  );
  assert.equal(
    index.isAuditAccessLogImplemented(),
    false,
  );
});
