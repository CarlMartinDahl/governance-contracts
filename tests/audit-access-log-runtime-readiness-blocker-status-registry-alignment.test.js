"use strict";

const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
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
const rbac = require("../packages/governance/src/rbac-role-permission-deny-by-default-scaffold.js");

const repoRoot = path.resolve(__dirname, "..");

function readTrackedDoc(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

const docs = Object.freeze({
  runtimeBlocker: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  ),
  aalControl: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  ),
  aalFeasibility: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
  ),
  rbacScope: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_v1.md",
  ),
  rbacControl: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  ),
  rbacGate: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
  ),
  runtimeGate: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
  ),
  adminSupport: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_v1.md",
  ),
  globalAccess: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
  ),
  rawRouting: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  ),
  thirdPartySummary: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_THIRD_PARTY_ROUTING_RUNTIME_READINESS_STATUS_GAP_SUMMARY_AFTER_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  ),
  thirdPartyBlocker: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  ),
});

const allDocs = Object.values(docs).join("\n");

const expectedRows = Object.freeze([
  ["AAL-RUNTIME-BLOCKER-001_MATERIAL_INTAKE_EVENT", "material intake event"],
  [
    "AAL-RUNTIME-BLOCKER-002_BLOCKED_PROHIBITED_INGRESS_EVENT",
    "blocked/prohibited ingress event",
  ],
  [
    "AAL-RUNTIME-BLOCKER-003_QUARANTINE_BLOCK_DECISION_EVENT",
    "quarantine/block decision event",
  ],
  [
    "AAL-RUNTIME-BLOCKER-004_REDACTION_SANITIZATION_EVENT",
    "redaction/sanitization event",
  ],
  ["AAL-RUNTIME-BLOCKER-005_MATERIAL_ROUTING_EVENT", "material routing event"],
  ["AAL-RUNTIME-BLOCKER-006_REVIEW_ACCESS_EVENT", "review access event"],
  [
    "AAL-RUNTIME-BLOCKER-007_MANIFEST_VALIDATION_EVENT",
    "manifest validation event",
  ],
  ["AAL-RUNTIME-BLOCKER-008_EXPORT_DOWNLOAD_EVENT", "export/download event"],
  [
    "AAL-RUNTIME-BLOCKER-009_PACKET_DELIVERY_PROMOTION_EVENT",
    "packet/delivery promotion event",
  ],
  [
    "AAL-RUNTIME-BLOCKER-010_LOCAL_LOG_TEST_TRANSCRIPT_HANDLING_EVENT",
    "local log/test transcript handling event",
  ],
  [
    "AAL-RUNTIME-BLOCKER-011_ADMIN_SUPPORT_ACCESS_ATTEMPT_EVENT",
    "admin/support access attempt event",
  ],
  [
    "AAL-RUNTIME-BLOCKER-012_RETENTION_DELETION_OPERATION_EVENT",
    "retention/deletion operation event",
  ],
  [
    "AAL-RUNTIME-BLOCKER-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT",
    "third-party route denial/approval event",
  ],
  [
    "AAL-RUNTIME-BLOCKER-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE_EVENT",
    "runtime/schema/workflow gate candidate event",
  ],
  [
    "AAL-RUNTIME-BLOCKER-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT",
    "human/professional review access event",
  ],
  [
    "AAL-RUNTIME-BLOCKER-016_AUDIT_LOG_VIEWER_ACCESS_EVENT",
    "audit/log viewer access event",
  ],
  [
    "AAL-RUNTIME-BLOCKER-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS_EVENT",
    "admin/support privileged log access event",
  ],
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
]);

function registryIds(registry, key = "id") {
  return new Set(Object.values(registry).map((row) => row[key]));
}

function assertTextIncludes(text, tokens, label) {
  for (const token of tokens) {
    assert.ok(text.includes(token), `${label} must include ${token}`);
  }
}

function assertNoPositiveClaims(value, trail = "root") {
  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, nested] of Object.entries(value)) {
    if (positiveClaimKeys.includes(key)) {
      assert.equal(nested, false, `${trail}.${key} must remain false`);
    }
    assertNoPositiveClaims(nested, `${trail}.${key}`);
  }
}

function assertFalseHelperOutputs(label, helpers) {
  for (const [name, value] of Object.entries(helpers)) {
    assert.equal(value, false, `${label}.${name} must remain false`);
  }
}

test("tracked audit/access-log docs preserve literal blocker anchors and surfaces", () => {
  assert.ok(
    docs.runtimeBlocker.includes("AAL-RUNTIME-BLOCKER-001"),
    "literal AAL-RUNTIME-BLOCKER anchors are present in the blocker doc",
  );

  for (const [id, surface] of expectedRows) {
    const literalId = id.match(/^AAL-RUNTIME-BLOCKER-\d{3}/)[0];
    assert.ok(
      docs.runtimeBlocker.includes(literalId),
      `blocker doc must include ${literalId}`,
    );
    assert.ok(
      docs.runtimeBlocker.includes(surface) || allDocs.includes(surface),
      `tracked docs must include surface ${surface}`,
    );
  }

  assertTextIncludes(
    allDocs,
    [
      "DOCS_ONLY",
      "blocker-status",
      "future-only",
      "current logging",
      "not implementation",
      "event taxonomy runtime code",
      "event emitter",
      "log schema",
      "log storage",
      "log viewer RBAC",
      "no RBAC",
      "no access-control",
      "runtime enforcement",
      "validator dispatch",
      "registry/lookup",
      "security findings",
      "severity",
      "remediation",
      "release",
      "external-use",
      "product-candidate",
      "human review",
    ],
    "tracked docs",
  );
});

test("runtime-readiness blocker registry exposes exact rows and required fields", () => {
  const rows =
    aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY;
  assert.deepEqual(Object.keys(rows), expectedRows.map(([id]) => id));
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
          .REGISTRY_SCAFFOLD_ONLY,
      ),
    );
    assert.ok(
      row.current_runtime_readiness_status.includes(
        aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
          .FUTURE_EVENT_CANDIDATE_ONLY,
      ),
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

test("rows reference only known tracked registry values", () => {
  const knownMaterialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const knownStorageIds = registryIds(storage.DATA_LOCATION_REGISTRY);
  const knownRolePermissionIds = registryIds(
    rolePermission.ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY,
  );
  const knownAdminSupportIds = registryIds(
    adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
  );
  const knownThirdPartyIds = registryIds(
    thirdParty.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
  );
  const knownRawRoutingIds = registryIds(
    rawRouting.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
    "control_id",
  );
  const knownAalEventIds = registryIds(
    aalStorage.AUDIT_ACCESS_LOG_EVENT_CANDIDATES,
  );
  const knownLifecycleFamilies = new Set(
    Object.values(lifecycle.LIFECYCLE_CONTROL_FAMILIES),
  );
  const knownGlobalAccessIds = registryIds(
    globalAccess.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
  );
  const knownRuntimeGateIds = registryIds(
    runtimeGate.RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
  );

  for (const row of aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows()) {
    for (const id of row.related_material_classes) {
      assert.ok(knownMaterialClasses.has(id), `${row.id} material ${id}`);
    }
    for (const id of row.related_storage_location_ids) {
      assert.ok(knownStorageIds.has(id), `${row.id} storage ${id}`);
    }
    for (const id of row.related_role_permission_gap_ids) {
      assert.ok(knownRolePermissionIds.has(id), `${row.id} role gap ${id}`);
    }
    for (const id of row.related_admin_support_gap_ids) {
      assert.ok(knownAdminSupportIds.has(id), `${row.id} admin gap ${id}`);
    }
    for (const id of row.related_third_party_status_gap_ids) {
      assert.ok(knownThirdPartyIds.has(id), `${row.id} TPR gap ${id}`);
    }
    for (const id of row.related_raw_material_routing_control_ids) {
      assert.ok(knownRawRoutingIds.has(id), `${row.id} RMR control ${id}`);
    }
    for (const id of row.related_aal_event_candidate_ids) {
      assert.ok(knownAalEventIds.has(id), `${row.id} AAL event ${id}`);
    }
    for (const id of row.related_lifecycle_families) {
      assert.ok(knownLifecycleFamilies.has(id), `${row.id} lifecycle ${id}`);
    }
    for (const id of row.related_global_access_control_row_ids) {
      assert.ok(knownGlobalAccessIds.has(id), `${row.id} GAC row ${id}`);
    }
    for (const id of row.related_runtime_gate_candidate_ids) {
      assert.ok(knownRuntimeGateIds.has(id), `${row.id} runtime gate ${id}`);
    }
  }
});

test("content boundaries remain no-raw no-private no-source-locator", () => {
  const allowedTokens = [
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
  ];
  const prohibitedTokens = [
    "raw text",
    "private facts",
    "source locators",
    "filenames or private paths",
    "page references",
    "URLs",
    "tokens",
    "PDF image screenshot metadata content",
    "sensitive personal details",
    "legal clinical evidentiary or case-truth conclusions",
    "product-candidate claims",
    "external-use claims",
  ];

  assertTextIncludes(
    docs.aalControl,
    [
      "raw source text",
      "private facts",
      "source locators",
      "filenames/private paths",
      "page references",
      "URLs/tokens",
      "PDF/image/metadata content",
      "sensitive personal details",
      "legal/clinical/evidentiary/case-truth conclusions",
      "product-candidate claims",
      "external-use claims",
    ],
    "audit/access-log control specification",
  );

  for (const row of aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows()) {
    assert.deepEqual(row.allowed_future_event_content, allowedTokens);
    assertTextIncludes(
      row.prohibited_event_log_content.join("\n"),
      prohibitedTokens,
      row.id,
    );
    assert.equal(row.no_raw_no_private_no_source_locator_requirement, true);
  }
});

test("unknown blocker rows fail closed and implementation helpers remain false", () => {
  const unknown = aalRuntime.getAuditAccessLogRuntimeReadinessBlockerRow(
    "AAL-RUNTIME-BLOCKER-999_UNKNOWN",
  );
  assert.equal(
    unknown.current_authorization_status,
    aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
      .UNKNOWN_NOT_EVIDENCED,
  );
  assert.equal(
    aalRuntime.hasAuditAccessLogRuntimeReadinessBlockerRow(
      "AAL-RUNTIME-BLOCKER-999_UNKNOWN",
    ),
    false,
  );
  assert.deepEqual(
    aalRuntime.classifyAuditAccessLogRuntimeReadinessBlockerRow(
      "AAL-RUNTIME-BLOCKER-999_UNKNOWN",
    ),
    {
      id: "AAL-RUNTIME-BLOCKER-999_UNKNOWN",
      known: false,
      classification:
        aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_DECISION_STATUS
          .UNKNOWN_NOT_EVIDENCED,
      authorized: false,
      audit_access_log_implemented: false,
      current_logging_implemented: false,
      security_finding_created: false,
    },
  );

  assertFalseHelperOutputs("aalRuntime", {
    isAuditAccessLogImplemented: aalRuntime.isAuditAccessLogImplemented(),
    isCurrentLoggingImplemented: aalRuntime.isCurrentLoggingImplemented(),
    isEventTaxonomyRuntimeCodeCreated:
      aalRuntime.isEventTaxonomyRuntimeCodeCreated(),
    isEventEmitterImplemented: aalRuntime.isEventEmitterImplemented(),
    isLogSchemaCreated: aalRuntime.isLogSchemaCreated(),
    isLogStorageCreated: aalRuntime.isLogStorageCreated(),
    isLogViewerRbacCreated: aalRuntime.isLogViewerRbacCreated(),
    isSecurityFindingCreated: aalRuntime.isSecurityFindingCreated(),
  });
});

test("cross-registry non-implementation helpers remain false", () => {
  assertFalseHelperOutputs("rolePermission", {
    isRbacImplemented: rolePermission.isRbacImplemented(),
    isAccessControlImplemented: rolePermission.isAccessControlImplemented(),
    isRolePermissionModelImplemented:
      rolePermission.isRolePermissionModelImplemented(),
    isAdminSupportAccessAuthorized:
      rolePermission.isAdminSupportAccessAuthorized(),
    isLogViewerRbacCreated: rolePermission.isLogViewerRbacCreated(),
    isSecurityFindingCreated: rolePermission.isSecurityFindingCreated(),
  });
  assertFalseHelperOutputs("runtimeGate", {
    isRuntimeGateAuthorizedForEnforcement:
      runtimeGate.isRuntimeGateAuthorizedForEnforcement(),
    isRuntimeGateEnforced: runtimeGate.isRuntimeGateEnforced(),
    isRuntimeGateImplemented: runtimeGate.isRuntimeGateImplemented(),
    isRuntimeRegistryLookupCreated:
      runtimeGate.isRuntimeRegistryLookupCreated(),
    isSchemaGateEnforced: runtimeGate.isSchemaGateEnforced(),
    isSecurityFindingCreated: runtimeGate.isSecurityFindingCreated(),
    isValidatorDispatchCreated: runtimeGate.isValidatorDispatchCreated(),
    isWorkflowGateEnforced: runtimeGate.isWorkflowGateEnforced(),
  });
  assertFalseHelperOutputs("adminSupport", {
    isAdminSupportRuntimeAccessAuthorized:
      adminSupport.isAdminSupportRuntimeAccessAuthorized(),
    isAdminSupportRuntimeAccessImplemented:
      adminSupport.isAdminSupportRuntimeAccessImplemented(),
  });
  assertFalseHelperOutputs("globalAccess", {
    isAccessControlRuntimeEnforced:
      globalAccess.isAccessControlRuntimeEnforced(),
    isGlobalAccessControlModelImplemented:
      globalAccess.isGlobalAccessControlModelImplemented(),
    isGlobalAuthorizationModelCreated:
      globalAccess.isGlobalAuthorizationModelCreated(),
    isSecurityFindingCreated: globalAccess.isSecurityFindingCreated(),
  });
  assertFalseHelperOutputs("thirdParty", {
    isThirdPartyRouteAuthorized: thirdParty.isThirdPartyRouteAuthorized(),
    isThirdPartyRoutingImplemented: thirdParty.isThirdPartyRoutingImplemented(),
  });
  assertFalseHelperOutputs("rawRouting", {
    isRawMaterialRouteAuthorized: rawRouting.isRawMaterialRouteAuthorized(),
    isRawMaterialRoutingImplemented: rawRouting.isRawMaterialRoutingImplemented(),
  });
  assertFalseHelperOutputs("lifecycle", {
    isLifecycleImplementationCreated:
      lifecycle.isLifecycleImplementationCreated(),
  });
  assertFalseHelperOutputs("aalStorage", {
    isAuditAccessLogImplementationCreated:
      aalStorage.isAuditAccessLogImplementationCreated(),
  });
});

test("high-risk materials and future storage boundaries remain denied", () => {
  for (const row of Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED)) {
    assert.equal(row.denied, true);
    assertNoPositiveClaims(row);
  }

  const nonAuth =
    aalRuntime.getAuditAccessLogRuntimeReadinessNonAuthorizationStatus();
  assert.equal(nonAuth.local_logs_are_ci_evidence, false);
  assert.equal(nonAuth.local_logs_are_packet_components, false);
  assert.equal(nonAuth.ci_logs_are_release_evidence, false);
  assert.equal(nonAuth.human_review_gate_is_system_approval, false);

  const locationById = new Map(
    Object.values(storage.DATA_LOCATION_REGISTRY).map((row) => [row.id, row]),
  );

  for (const row of aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows()) {
    for (const id of row.related_storage_location_ids) {
      const location = locationById.get(id);
      if (id === "L20") {
        assert.equal(location.storage_implemented, false);
        assert.equal(location.status, storage.DATA_LOCATION_STATUS.FUTURE_CANDIDATE);
      }
      if (id === "L22" || id === "L23") {
        assert.equal(location.authorized, false);
        assert.equal(location.external_use_authorized, false);
        assert.equal(location.provider_routing_authorized, false);
      }
    }
  }
});

test("non-overclaim rules and prerequisites remain aligned", () => {
  assertTextIncludes(
    aalRuntime.listAuditAccessLogRuntimeReadinessNonOverclaimRules().join("\n"),
    [
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
    ],
    "AAL runtime non-overclaim rules",
  );

  assertTextIncludes(
    aalRuntime.getAuditAccessLogRuntimeReadinessRequiredPrerequisites().join("\n"),
    [
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
    ],
    "AAL runtime prerequisites",
  );
});

test("helper outputs across imported modules contain no positive claims", () => {
  const helperOutputs = [
    aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows(),
    aalRuntime.getAuditAccessLogRuntimeReadinessNonAuthorizationStatus(),
    aalRuntime.classifyAuditAccessLogRuntimeReadinessBlockerRow(
      "AAL-RUNTIME-BLOCKER-001_MATERIAL_INTAKE_EVENT",
    ),
    aalStorage.listAuditAccessLogEventCandidates(),
    aalStorage.listAalStorageDependencies(),
    aalStorage.getAalNonAuthorizationStatus(),
    rolePermission.listRolePermissionModelStatusGapRows(),
    rolePermission.getRolePermissionModelNonAuthorizationStatus(),
    runtimeGate.listRuntimeGateCandidateStatusInventoryRows(),
    runtimeGate.getRuntimeGateCandidateNonAuthorizationStatus(),
    globalAccess.listGlobalAccessControlThreatModelInventoryRows(),
    globalAccess.getGlobalAccessControlThreatModelNonAuthorizationStatus(),
    adminSupport.listAdminSupportRuntimeReadinessStatusGaps(),
    adminSupport.getAdminSupportRuntimeReadinessNonAuthorizationStatus(),
    thirdParty.listThirdPartyRoutingStatusGaps(),
    thirdParty.getThirdPartyRoutingNonAuthorizationStatus(),
    rawRouting.listRawMaterialRoutingControls(),
    rawRouting.getRawMaterialRoutingNonAuthorizationStatus(),
    storage.listDataLocations(),
    storage.getStorageRegistryNonAuthorizationStatus(),
    lifecycle.listLifecycleActionCandidates(),
    lifecycle.listRdeStorageDependencies(),
    lifecycle.getRdeNonAuthorizationStatus(),
    rbac.deriveRbacDenyByDefaultAccessDecision({
      actor_type: "UNKNOWN",
      role: "UNKNOWN",
      permission: "UNKNOWN",
      resource_material_scope: "UNKNOWN",
    }),
    rbac.evaluateRouteCaseCapabilityNonOverclaim({
      route: "UNKNOWN",
      case_scope: "UNKNOWN",
      capability: "UNKNOWN",
    }),
  ];

  for (const output of helperOutputs) {
    assertNoPositiveClaims(output);
  }
});

test("registry rows and helper results are frozen copy-safe proof data only", () => {
  const row = aalRuntime.getAuditAccessLogRuntimeReadinessBlockerRow(
    "AAL-RUNTIME-BLOCKER-001_MATERIAL_INTAKE_EVENT",
  );
  assert.equal(Object.isFrozen(row), true);
  assert.equal(Object.isFrozen(row.related_material_classes), true);
  assert.throws(() => row.related_material_classes.push("MUTATION"));

  const listed = aalRuntime.listAuditAccessLogRuntimeReadinessBlockerRows();
  assert.equal(Object.isFrozen(listed), true);
  assert.equal(Object.isFrozen(listed[0]), true);
  assert.throws(() => listed.push(row));
});
