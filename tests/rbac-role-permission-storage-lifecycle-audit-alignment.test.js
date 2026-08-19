"use strict";

const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const test = require("node:test");

const rbac = require("../packages/governance/src/rbac-role-permission-deny-by-default-scaffold.js");
const storageRegistry = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const lifecycleRegistry = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const auditAccessLog = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");

const RBAC_DOC_PATHS = Object.freeze([
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
]);

const rbacDocs = RBAC_DOC_PATHS.map((path) => readFileSync(path, "utf8")).join("\n");

const positiveClaimKeys = new Set([
  "authorized",
  "access_granted",
  "grants_access",
  "grants_material_access",
  "rbac_implemented",
  "access_control_enforced",
  "admin_support_access_created",
  "admin_support_bypass_allowed",
  "log_viewer_rbac_created",
  "admin_support_log_access_created",
  "emitted",
  "stored",
  "verified",
  "audit_log_implemented",
  "access_log_implemented",
  "event_taxonomy_runtime_code_created",
  "log_schema_created",
  "log_storage_created",
  "audit_proof_created",
  "chain_of_custody_created",
  "deletion_executed",
  "deletion_verified",
  "purge_executed",
  "purge_verified",
  "erasure_executed",
  "encryption_implemented",
  "key_management_implemented",
  "provider_deletion_verified",
  "recipient_purge_verified",
  "provider_routing_authorized",
  "release_approved",
  "external_use_authorized",
  "product_candidate_authorized",
  "runtime_certification_created",
  "technical_signoff_created",
  "system_approval_created",
]);

function assertNoPositiveClaims(value) {
  if (Array.isArray(value)) {
    for (const item of value) {
      assertNoPositiveClaims(item);
    }
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, item] of Object.entries(value)) {
    if (positiveClaimKeys.has(key)) {
      assert.equal(item, false, `${key} must remain false`);
    }
    assertNoPositiveClaims(item);
  }
}

function assertDocToken(token) {
  assert.match(rbacDocs, new RegExp(`\\b${token}\\b`), token);
}

test("RBAC docs preserve non-implementation and cross-registry non-authorization boundaries", () => {
  for (const token of [
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "ADMIN_SUPPORT_MODEL_NOT_CREATED",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "LOG_SCHEMA_NOT_CREATED",
    "LOG_STORAGE_NOT_CREATED",
    "RETENTION_DELETION_NOT_IMPLEMENTED",
    "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
    "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_RBAC",
    "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_FULL_ACCESS_CONTROL",
    "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
    "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_GLOBAL_AUTHORIZATION_MODEL",
  ]) {
    assertDocToken(token);
  }
});

test("RBAC scaffold remains deny-by-default and creates no access grants", () => {
  for (const role of Object.values(rbac.roleCategoryRegistry)) {
    assert.equal(role.grants_access, false, role.role_category);
  }

  for (const permission of Object.values(rbac.permissionCategoryRegistry)) {
    assert.equal(permission.grants_access, false, permission.permission_category);
  }

  for (const scope of Object.values(rbac.resourceMaterialScopeRegistry)) {
    assert.equal(scope.grants_material_access, false, scope.resource_material_scope);
  }

  const decision = rbac.deriveRbacDenyByDefaultAccessDecision({
    actor_type: "ADMIN_OPERATOR_ACTOR",
    role_category: "ADMIN_ROLE_CATEGORY",
    permission_category: "RAW_PRIVATE_SOURCE_MATERIAL_ACCESS",
    resource_material_scope: "RAW_PRIVATE_SOURCE_MATERIAL_SCOPE",
  });

  assert.equal(decision.access_decision, "ACCESS_DENIED_BY_DEFAULT");
  assert.equal(decision.authorized, false);
  assert.equal(decision.category_only, true);
  assert.equal(decision.human_professional_review_required, true);
  assert.equal(decision.human_professional_review_is_system_approval, false);
  assert.ok(decision.non_authorizations.includes("NO_FULL_RBAC"));
  assert.ok(decision.non_authorizations.includes("NO_FULL_ACCESS_CONTROL"));
  assertNoPositiveClaims([
    rbac.accessDecisionRegistry,
    rbac.roleCategoryRegistry,
    rbac.permissionCategoryRegistry,
    rbac.resourceMaterialScopeRegistry,
    decision,
  ]);
});

test("unknown RBAC actor role permission resource and overclaim lookups fail closed", () => {
  const unknownAccess = rbac.deriveRbacDenyByDefaultAccessDecision({
    actor_type: "UNKNOWN_ACTOR",
    role_category: "UNKNOWN_ROLE",
    permission_category: "UNKNOWN_PERMISSION",
    resource_material_scope: "UNKNOWN_RESOURCE",
  });
  const unknownBypass = rbac.deriveAdminSupportNonBypassDecision(
    "UNKNOWN_ADMIN_ACTION",
  );
  const unknownOverclaim = rbac.evaluateRouteCaseCapabilityNonOverclaim(
    "UNKNOWN_ROUTE_CASE_CAPABILITY_CLAIM",
  );

  assert.equal(unknownAccess.access_decision, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknownAccess.authorized, false);
  assert.equal(unknownAccess.actor_type, "UNKNOWN_ACTOR_TYPE");
  assert.equal(unknownAccess.role_category, "UNKNOWN_ROLE_CATEGORY");
  assert.equal(unknownAccess.permission_category, "UNKNOWN_PERMISSION_CATEGORY");
  assert.equal(unknownAccess.resource_material_scope, "UNKNOWN_RESOURCE_MATERIAL_SCOPE");

  assert.equal(unknownBypass.access_decision, "ADMIN_SUPPORT_BYPASS_DENIED");
  assert.equal(unknownBypass.authorized, false);
  assert.equal(unknownBypass.admin_support_bypass_allowed, false);

  assert.equal(
    unknownOverclaim.access_decision,
    "ROUTE_CASE_CAPABILITY_OVERCLAIM_DENIED",
  );
  assert.equal(unknownOverclaim.allowed, false);
  assert.equal(unknownOverclaim.full_rbac_created, false);
  assert.equal(unknownOverclaim.full_access_control_created, false);
  assert.equal(unknownOverclaim.admin_support_access_control_created, false);
  assert.equal(unknownOverclaim.global_authorization_created, false);
  assertNoPositiveClaims([unknownAccess, unknownBypass, unknownOverclaim]);
});

test("storage high-risk material classes remain denied and not authorized", () => {
  for (const materialClass of Object.keys(
    storageRegistry.HIGH_RISK_MATERIAL_CLASSES_DENIED,
  )) {
    const denial = storageRegistry.getHighRiskMaterialClassDenial(materialClass);

    assert.equal(storageRegistry.isHighRiskMaterialClass(materialClass), true);
    assert.equal(denial.denied, true, materialClass);
    assert.equal(denial.authorized, false, materialClass);
    assertNoPositiveClaims(denial);
  }
});

test("RDE lifecycle candidates remain non-executable non-verified and RBAC-blocked", () => {
  const rbacOrAdminPrerequisiteActions = [];

  for (const action of lifecycleRegistry.listLifecycleActionCandidates()) {
    assert.equal(lifecycleRegistry.isLifecycleActionAuthorized(action.id), false);
    assert.equal(action.non_authorizations.authorized, false);
    assert.equal(action.lifecycle_flags.deletion_executed, false);
    assert.equal(action.lifecycle_flags.deletion_verified, false);
    assert.equal(action.lifecycle_flags.purge_executed, false);
    assert.equal(action.lifecycle_flags.purge_verified, false);
    assert.equal(action.lifecycle_flags.erasure_executed, false);
    assert.equal(action.lifecycle_flags.encryption_implemented, false);
    assert.equal(action.lifecycle_flags.key_management_implemented, false);
    assert.equal(action.lifecycle_flags.provider_deletion_verified, false);
    assert.equal(action.lifecycle_flags.recipient_purge_verified, false);
    if (
      action.required_prerequisites.includes("RBAC/access-control model") ||
      action.required_prerequisites.includes(
        "admin/support lifecycle no-bypass model",
      )
    ) {
      rbacOrAdminPrerequisiteActions.push(action);
      assert.ok(
        action.required_prerequisites.includes("RBAC/access-control model"),
        action.id,
      );
      assert.ok(
        action.required_prerequisites.includes(
          "admin/support lifecycle no-bypass model",
        ),
        action.id,
      );
    }
    assertNoPositiveClaims(action);
  }

  assert.ok(rbacOrAdminPrerequisiteActions.length > 0);
  assert.equal(lifecycleRegistry.isLifecycleImplementationCreated(), false);
  assert.equal(
    lifecycleRegistry.listRdeNonOverclaimRules().includes(
      "LOCAL_LOG does not mean CI_EVIDENCE",
    ),
    true,
  );
  assert.equal(
    lifecycleRegistry.listRdeNonOverclaimRules().includes(
      "CI_LOG does not mean RELEASE_EVIDENCE",
    ),
    true,
  );
});

test("AAL event candidates and dependencies remain candidate-only and RBAC-blocked where privileged", () => {
  for (const eventCandidate of auditAccessLog.listAuditAccessLogEventCandidates()) {
    assert.equal(
      auditAccessLog.isAuditAccessLogEventAuthorized(eventCandidate.id),
      false,
      eventCandidate.id,
    );
    assert.equal(eventCandidate.event_flags.emitted, false, eventCandidate.id);
    assert.equal(eventCandidate.event_flags.stored, false, eventCandidate.id);
    assert.equal(eventCandidate.event_flags.audit_proof_created, false, eventCandidate.id);
    assert.equal(
      eventCandidate.event_flags.chain_of_custody_created,
      false,
      eventCandidate.id,
    );
    assertNoPositiveClaims(eventCandidate);
  }

  for (const dependency of auditAccessLog.listAalStorageDependencies()) {
    assert.equal(dependency.non_authorizations.authorized, false, dependency.id);
    assert.equal(dependency.event_flags.log_storage_created, false, dependency.id);
    assert.equal(dependency.event_flags.audit_proof_created, false, dependency.id);
    assert.equal(dependency.event_flags.chain_of_custody_created, false, dependency.id);
    assertNoPositiveClaims(dependency);
  }

  for (const eventId of [
    "AAL-EVENT-016_AUDIT_LOG_VIEWER_ACCESS",
    "AAL-EVENT-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS",
  ]) {
    const eventCandidate = auditAccessLog.getAuditAccessLogEventCandidate(eventId);

    assert.equal(eventCandidate.decision_status, "BLOCKED_BY_RBAC_ACCESS_CONTROL");
    assert.ok(eventCandidate.related_storage_location_ids.includes(
      "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
    ));
    assertNoPositiveClaims(eventCandidate);
  }

  for (const dependencyId of [
    "AAL-DEP-006_ADMIN_SUPPORT_LOG_ACCESS_FUTURE",
    "AAL-DEP-015_AUDIT_LOG_VIEWER_ACCESS_FUTURE",
  ]) {
    const dependency = auditAccessLog.getAalStorageDependency(dependencyId);

    assert.equal(dependency.decision_status, "BLOCKED_BY_RBAC_ACCESS_CONTROL");
    assert.ok(dependency.required_prerequisites.includes("log viewer RBAC"));
    assert.ok(
      dependency.required_prerequisites.includes(
        "admin/support privileged log access policy",
      ),
    );
    assertNoPositiveClaims(dependency);
  }

  assert.equal(auditAccessLog.isAuditAccessLogImplementationCreated(), false);
});

test("storage L20 L22 and L23 remain future-only not implemented and not authorized", () => {
  const auditLogStorage = storageRegistry.getDataLocation(
    "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
  );
  const providerStorage = storageRegistry.getDataLocation(
    "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
  );
  const recipientStorage = storageRegistry.getDataLocation(
    "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
  );

  assert.equal(auditLogStorage.status, "FUTURE_RUNTIME_CANDIDATE");
  assert.equal(auditLogStorage.evidence_posture, "FUTURE_CANDIDATE_ONLY");
  assert.ok(auditLogStorage.implementation_statuses.includes("NOT_AUDIT_LOG_STORAGE"));
  assert.ok(
    auditLogStorage.implementation_statuses.includes(
      "NOT_STORAGE_IMPLEMENTATION",
    ),
  );

  for (const location of [providerStorage, recipientStorage]) {
    assert.equal(location.status, "FUTURE_PROVIDER_OR_RECIPIENT_CANDIDATE");
    assert.equal(location.evidence_posture, "FUTURE_CANDIDATE_ONLY");
    assert.equal(location.non_authorizations.authorized, false);
    assert.equal(location.non_authorizations.provider_routing_authorized, false);
    assert.equal(location.non_authorizations.external_use_authorized, false);
    assert.equal(location.non_authorizations.product_candidate_authorized, false);
    assert.equal(location.non_authorizations.runtime_certification_created, false);
    assert.equal(location.non_authorizations.technical_signoff_created, false);
  }

  assert.match(providerStorage.notes, /provider routing is not authorized/);
  assert.match(recipientStorage.notes, /recipient compliance is not verified/);
  assertNoPositiveClaims([auditLogStorage, providerStorage, recipientStorage]);
});

test("local CI release evidence boundaries remain separated across RDE AAL and storage", () => {
  assert.equal(
    storageRegistry.getStorageNonOverclaimRules().includes(
      "LOCAL_LOG does not mean CI_EVIDENCE",
    ),
    true,
  );
  assert.equal(
    storageRegistry.getStorageNonOverclaimRules().includes(
      "CI_LOG does not mean RELEASE_EVIDENCE",
    ),
    true,
  );
  assert.equal(
    lifecycleRegistry.listRdeNonOverclaimRules().includes(
      "LOCAL_LOG does not mean CI_EVIDENCE",
    ),
    true,
  );
  assert.equal(
    lifecycleRegistry.listRdeNonOverclaimRules().includes(
      "CI_LOG does not mean RELEASE_EVIDENCE",
    ),
    true,
  );
  assert.equal(
    auditAccessLog.listAalNonOverclaimRules().includes(
      "LOCAL_LOG does not mean CI_EVIDENCE",
    ),
    true,
  );
  assert.equal(
    auditAccessLog.listAalNonOverclaimRules().includes(
      "CI_LOG does not mean RELEASE_EVIDENCE",
    ),
    true,
  );
});

test("recursive helper output sweep preserves no positive authorization access proof or lifecycle claims", () => {
  const outputs = [
    rbac.deriveRbacDenyByDefaultAccessDecision({
      actor_type: "SUPPORT_OPERATOR_ACTOR",
      role_category: "SUPPORT_ROLE_CATEGORY",
      permission_category: "THIRD_PARTY_MODEL_API_ROUTING_PERMISSION",
      resource_material_scope: "THIRD_PARTY_MODEL_API_ROUTE_SCOPE",
    }),
    rbac.deriveAdminSupportNonBypassDecision("NO_RAW_CONSTRAINT_BYPASS"),
    rbac.deriveAdminSupportNonBypassDecision("RELEASE_APPROVAL"),
    rbac.evaluateRouteCaseCapabilityNonOverclaim(
      "ROUTE_CASE_CAPABILITY_NOT_FULL_RBAC",
    ),
    rbac.evaluateRouteCaseCapabilityNonOverclaim(
      "ROUTE_CASE_CAPABILITY_NOT_FULL_ACCESS_CONTROL",
    ),
    rbac.evaluateRouteCaseCapabilityNonOverclaim(
      "ROUTE_CASE_CAPABILITY_NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
    ),
    rbac.evaluateRouteCaseCapabilityNonOverclaim(
      "ROUTE_CASE_CAPABILITY_NOT_GLOBAL_AUTHORIZATION",
    ),
    storageRegistry.getStorageRegistryNonAuthorizationStatus(),
    lifecycleRegistry.getRdeNonAuthorizationStatus(),
    lifecycleRegistry.listLifecycleActionCandidates(),
    lifecycleRegistry.listRdeStorageDependencies(),
    lifecycleRegistry.getLifecycleActionCandidate("RDE-ACTION-017_PROVIDER_DELETION_VERIFY"),
    lifecycleRegistry.getLifecycleActionCandidate("RDE-ACTION-019_RECIPIENT_PURGE_VERIFY"),
    auditAccessLog.getAalNonAuthorizationStatus(),
    auditAccessLog.listAuditAccessLogEventCandidates(),
    auditAccessLog.listAalStorageDependencies(),
    auditAccessLog.getAuditAccessLogEventCandidate(
      "AAL-EVENT-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS",
    ),
    auditAccessLog.getAalStorageDependency(
      "AAL-DEP-006_ADMIN_SUPPORT_LOG_ACCESS_FUTURE",
    ),
    auditAccessLog.getAalStorageDependency(
      "AAL-DEP-015_AUDIT_LOG_VIEWER_ACCESS_FUTURE",
    ),
  ];

  assertNoPositiveClaims(outputs);
});
