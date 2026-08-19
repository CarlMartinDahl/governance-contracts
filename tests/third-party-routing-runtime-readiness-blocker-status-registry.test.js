"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const registry = require("../packages/governance/src/third-party-routing-runtime-readiness-blocker-status-registry.js");
const index = require("../packages/governance/src/index.js");
const {
  DATA_LOCATION_REGISTRY,
  MATERIAL_CLASSES,
  HIGH_RISK_MATERIAL_CLASSES_DENIED,
} = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const {
  THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
} = require("../packages/governance/src/third-party-routing-status-gap-registry.js");
const {
  AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
} = require("../packages/governance/src/audit-access-log-runtime-readiness-blocker-status-registry.js");
const {
  ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY,
} = require("../packages/governance/src/role-permission-model-status-gap-registry.js");
const {
  ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
} = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const {
  RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
} = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const {
  AUDIT_ACCESS_LOG_EVENT_CANDIDATES,
} = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const {
  LIFECYCLE_CONTROL_FAMILIES,
} = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const {
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
} = require("../packages/governance/src/global-access-control-threat-model-inventory-status-registry.js");
const {
  RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
} = require("../packages/governance/src/runtime-gate-candidate-status-inventory-registry.js");

const expectedFamilies = Object.freeze([
  "THIRD_PARTY_MODEL_API_ROUTE_REQUEST_BLOCKER",
  "THIRD_PARTY_ROUTE_DENIAL_EVENT_BLOCKER",
  "THIRD_PARTY_ROUTE_APPROVAL_CANDIDATE_BLOCKER",
  "PROVIDER_IDENTITY_STATUS_RECORD_BLOCKER",
  "PROVIDER_DATA_ROUTING_MAP_BLOCKER",
  "PROVIDER_RETENTION_DELETION_POSTURE_BLOCKER",
  "PROVIDER_AUDITABILITY_LOGGING_POSTURE_BLOCKER",
  "PROVIDER_TOKEN_URL_SECRET_HANDLING_BLOCKER",
  "RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_ATTEMPT_BLOCKER",
  "PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_BLOCKER",
  "GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_BLOCKER",
  "ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_ATTEMPT_BLOCKER",
  "WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_ATTEMPT_BLOCKER",
  "RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_EVENT_BLOCKER",
  "HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_BLOCKER",
]);

const expectedImplementationStatuses = Object.freeze([
  "NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
  "NOT_THIRD_PARTY_MODEL_API_ROUTING_AUTHORIZATION",
  "NOT_PROVIDER_INTEGRATION",
  "NOT_PROVIDER_REGISTRY",
  "NOT_PROVIDER_STATUS_IMPLEMENTATION",
  "NOT_DATA_ROUTING_MAP",
  "NOT_PROVIDER_RETENTION_DELETION_POSTURE",
  "NOT_PROVIDER_AUDITABILITY",
  "NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING",
  "NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
  "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
  "NOT_EVENT_TAXONOMY_RUNTIME_CODE",
  "NOT_LOG_SCHEMA",
  "NOT_LOG_STORAGE",
  "NOT_RETENTION_DELETION_IMPLEMENTATION",
  "NOT_RBAC_IMPLEMENTATION",
  "NOT_ACCESS_CONTROL_IMPLEMENTATION",
  "NOT_ADMIN_SUPPORT_MODEL",
  "NOT_RUNTIME_GATE_IMPLEMENTATION",
  "NOT_RUNTIME_ENFORCEMENT",
  "NOT_VALIDATOR_DISPATCH",
  "NOT_RUNTIME_REGISTRY_LOOKUP",
  "NOT_SECURITY_FINDING",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "UNKNOWN_NOT_EVIDENCED",
]);

const expectedDecisionStatuses = Object.freeze([
  "DOCS_ONLY_BLOCKER_STATUS",
  "REGISTRY_SCAFFOLD_ONLY",
  "FUTURE_ROUTE_CANDIDATE_ONLY",
  "NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_NO_TOKEN_NO_URL_ONLY",
  "RUNTIME_READINESS_BLOCKED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  "BLOCKED_BY_PROVIDER_STATUS",
  "BLOCKED_BY_DATA_ROUTING_MAP",
  "BLOCKED_BY_PROVIDER_RETENTION_DELETION",
  "BLOCKED_BY_PROVIDER_AUDITABILITY",
  "BLOCKED_BY_TOKEN_URL_SECRET_HANDLING",
  "BLOCKED_BY_AUDIT_ACCESS_LOG",
  "BLOCKED_BY_RETENTION_DELETION",
  "BLOCKED_BY_RBAC_MODEL",
  "BLOCKED_BY_ADMIN_SUPPORT_MODEL",
  "BLOCKED_BY_RAW_MATERIAL_ROUTING",
  "BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL",
  "UNKNOWN_NOT_EVIDENCED",
]);

const expectedRows = Object.freeze([
  "TPR-RUNTIME-BLOCKER-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST",
  "TPR-RUNTIME-BLOCKER-002_THIRD_PARTY_ROUTE_DENIAL_EVENT",
  "TPR-RUNTIME-BLOCKER-003_THIRD_PARTY_ROUTE_APPROVAL_CANDIDATE",
  "TPR-RUNTIME-BLOCKER-004_PROVIDER_IDENTITY_STATUS_RECORD",
  "TPR-RUNTIME-BLOCKER-005_PROVIDER_DATA_ROUTING_MAP",
  "TPR-RUNTIME-BLOCKER-006_PROVIDER_RETENTION_DELETION_POSTURE",
  "TPR-RUNTIME-BLOCKER-007_PROVIDER_AUDITABILITY_LOGGING_POSTURE",
  "TPR-RUNTIME-BLOCKER-008_PROVIDER_TOKEN_URL_SECRET_HANDLING",
  "TPR-RUNTIME-BLOCKER-009_RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_ATTEMPT",
  "TPR-RUNTIME-BLOCKER-010_PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT",
  "TPR-RUNTIME-BLOCKER-011_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT",
  "TPR-RUNTIME-BLOCKER-012_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_ATTEMPT",
  "TPR-RUNTIME-BLOCKER-013_WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_ATTEMPT",
  "TPR-RUNTIME-BLOCKER-014_RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_EVENT",
  "TPR-RUNTIME-BLOCKER-015_HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY",
]);

const requiredFields = Object.freeze([
  "id",
  "source_blocker_id",
  "family",
  "third_party_routing_surface",
  "route_family_candidate",
  "provider_surface_candidate",
  "allowed_future_route_event_content",
  "prohibited_route_event_log_content",
  "no_raw_no_private_no_source_locator_no_token_no_url_requirement",
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
  "related_third_party_status_gap_ids",
  "related_audit_access_log_runtime_blocker_ids",
  "related_role_permission_gap_ids",
  "related_admin_support_gap_ids",
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
  "route_authorized",
  "third_party_routing_implemented",
  "provider_integration_created",
  "provider_registry_created",
  "provider_status_implemented",
  "data_routing_map_created",
  "provider_auditability_implemented",
  "token_url_secret_handling_implemented",
  "audit_access_log_implemented",
  "log_schema_created",
  "log_storage_created",
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

const values = (object) => new Set(Object.values(object));
const materialValues = values(MATERIAL_CLASSES);
const locationIds = new Set(Object.values(DATA_LOCATION_REGISTRY).map((row) => row.id));
const tprGapIds = new Set(Object.values(THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY).map((row) => row.id));
const aalRuntimeBlockerIds = new Set(
  Object.values(AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY).map(
    (row) => row.id,
  ),
);
const rolePermissionGapIds = new Set(
  Object.values(ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY).map((row) => row.id),
);
const adminSupportGapIds = new Set(
  Object.values(ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY).map(
    (row) => row.id,
  ),
);
const rmrControlIds = new Set(
  Object.values(RAW_MATERIAL_ROUTING_CONTROL_REGISTRY).map((row) => row.control_id),
);
const aalEventIds = new Set(
  Object.values(AUDIT_ACCESS_LOG_EVENT_CANDIDATES).map((row) => row.id),
);
const lifecycleFamilies = values(LIFECYCLE_CONTROL_FAMILIES);
const gacRowIds = new Set(
  Object.values(GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY).map(
    (row) => row.id,
  ),
);
const runtimeGateIds = new Set(
  Object.values(RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY).map(
    (row) => row.id,
  ),
);

function assertKnownReferences(items, known, label, rowId) {
  for (const item of items) {
    assert.ok(known.has(item), `${rowId} references unknown ${label}: ${item}`);
  }
}

function assertNoPositiveClaims(value, path = "root") {
  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, nested] of Object.entries(value)) {
    const nextPath = `${path}.${key}`;
    if (positiveClaimKeys.includes(key)) {
      assert.notEqual(nested, true, `${nextPath} must not be true`);
    }
    assertNoPositiveClaims(nested, nextPath);
  }
}

test("families implementation statuses and decision statuses exist", () => {
  assert.deepEqual(
    Object.values(registry.THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_FAMILIES),
    expectedFamilies,
  );
  assert.deepEqual(
    Object.values(
      registry.THIRD_PARTY_ROUTING_RUNTIME_READINESS_IMPLEMENTATION_STATUS,
    ),
    expectedImplementationStatuses,
  );
  assert.deepEqual(
    Object.values(registry.THIRD_PARTY_ROUTING_RUNTIME_READINESS_DECISION_STATUS),
    expectedDecisionStatuses,
  );
});

test("exact blocker rows exist and every row has required fields", () => {
  assert.deepEqual(
    Object.keys(
      registry.THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
    ),
    expectedRows,
  );

  for (const row of registry.listThirdPartyRoutingRuntimeReadinessBlockerRows()) {
    for (const field of requiredFields) {
      assert.ok(Object.hasOwn(row, field), `${row.id} missing ${field}`);
    }
    assert.equal(row.id, registry.getThirdPartyRoutingRuntimeReadinessBlockerRow(row.id).id);
    assert.equal(registry.hasThirdPartyRoutingRuntimeReadinessBlockerRow(row.id), true);
  }
});

test("rows reference only known tracked registry values", () => {
  for (const row of registry.listThirdPartyRoutingRuntimeReadinessBlockerRows()) {
    assertKnownReferences(row.related_material_classes, materialValues, "material class", row.id);
    assertKnownReferences(row.related_storage_location_ids, locationIds, "storage location", row.id);
    assertKnownReferences(row.related_third_party_status_gap_ids, tprGapIds, "TPR status/gap", row.id);
    assertKnownReferences(
      row.related_audit_access_log_runtime_blocker_ids,
      aalRuntimeBlockerIds,
      "AAL runtime blocker",
      row.id,
    );
    assertKnownReferences(row.related_role_permission_gap_ids, rolePermissionGapIds, "role/permission gap", row.id);
    assertKnownReferences(row.related_admin_support_gap_ids, adminSupportGapIds, "admin/support gap", row.id);
    assertKnownReferences(row.related_raw_material_routing_control_ids, rmrControlIds, "RMR control", row.id);
    assertKnownReferences(row.related_aal_event_candidate_ids, aalEventIds, "AAL event", row.id);
    assertKnownReferences(row.related_lifecycle_families, lifecycleFamilies, "lifecycle family", row.id);
    assertKnownReferences(row.related_global_access_control_row_ids, gacRowIds, "GAC row", row.id);
    assertKnownReferences(row.related_runtime_gate_candidate_ids, runtimeGateIds, "runtime gate", row.id);
  }
});

test("high-risk material classes and L20/L22/L23 boundaries remain denied", () => {
  for (const denial of Object.values(HIGH_RISK_MATERIAL_CLASSES_DENIED)) {
    assert.equal(denial.denied, true);
    assert.equal(denial.authorized, false);
    assert.equal(denial.provider_routing_authorized, false);
  }

  const rows = registry.listThirdPartyRoutingRuntimeReadinessBlockerRows();
  assert.ok(rows.some((row) => row.related_storage_location_ids.includes("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE")));
  assert.ok(rows.some((row) => row.related_storage_location_ids.includes("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE")));
  assert.ok(rows.some((row) => row.related_storage_location_ids.includes("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE")));
});

test("allowed and prohibited content boundaries remain no-content and non-routing", () => {
  for (const row of registry.listThirdPartyRoutingRuntimeReadinessBlockerRows()) {
    const allowedText = row.allowed_future_route_event_content.join(" ");
    assert.match(allowedText, /no-raw/);
    assert.match(allowedText, /no-private/);
    assert.match(allowedText, /no-source-locator/);
    assert.match(allowedText, /no-token/);
    assert.match(allowedText, /no-URL/);

    const prohibitedText = row.prohibited_route_event_log_content.join(" ");
    for (const required of [
      "raw source text",
      "private facts",
      "source locators",
      "filenames/private paths",
      "page references",
      "URLs",
      "tokens",
      "secrets",
      "provider payloads",
      "prompts",
      "responses",
      "PDF/image/metadata content",
      "sensitive personal details",
      "legal/clinical/evidentiary/case-truth conclusions",
      "product-candidate claims",
      "external-use claims",
    ]) {
      assert.match(prohibitedText, new RegExp(required.replace(/[/-]/g, "[-/]?")));
    }
  }
});

test("unknown rows fail closed and global implementation helpers remain false", () => {
  const unknown = registry.classifyThirdPartyRoutingRuntimeReadinessBlockerRow(
    "TPR-RUNTIME-BLOCKER-999_UNKNOWN",
  );
  assert.equal(unknown.status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.authorized, false);
  assert.equal(unknown.route_authorized, false);
  assert.equal(unknown.third_party_routing_implemented, false);
  assert.equal(unknown.provider_integration_created, false);
  assert.equal(unknown.provider_registry_created, false);
  assert.equal(unknown.provider_status_implemented, false);
  assert.equal(unknown.data_routing_map_created, false);
  assert.equal(unknown.provider_auditability_implemented, false);
  assert.equal(unknown.token_url_secret_handling_implemented, false);
  assert.equal(unknown.security_finding_created, false);

  assert.equal(registry.isThirdPartyRoutingImplemented("anything"), false);
  assert.equal(registry.isThirdPartyRouteAuthorized("anything"), false);
  assert.equal(registry.isProviderIntegrationCreated("anything"), false);
  assert.equal(registry.isProviderRegistryCreated("anything"), false);
  assert.equal(registry.isProviderStatusImplemented("anything"), false);
  assert.equal(registry.isDataRoutingMapCreated("anything"), false);
  assert.equal(registry.isProviderAuditabilityImplemented("anything"), false);
  assert.equal(registry.isTokenUrlSecretHandlingImplemented("anything"), false);
  assert.equal(registry.isSecurityFindingCreated("anything"), false);
});

test("recursive helper outputs contain no positive authorization or implementation claims", () => {
  const helperOutputs = [
    registry.getThirdPartyRoutingRuntimeReadinessNonAuthorizationStatus(),
    registry.classifyThirdPartyRoutingRuntimeReadinessBlockerRow(expectedRows[0]),
    registry.listThirdPartyRoutingRuntimeReadinessBlockerRows(),
    registry.getThirdPartyRoutingRuntimeReadinessRequiredPrerequisites(),
    registry.listThirdPartyRoutingRuntimeReadinessNonOverclaimRules(),
  ];

  for (const output of helperOutputs) {
    assertNoPositiveClaims(output);
  }
});

test("non-overclaim rules and prerequisites preserve runtime and evidence boundaries", () => {
  const rules = registry.listThirdPartyRoutingRuntimeReadinessNonOverclaimRules().join("\n");
  for (const token of [
    "THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_REGISTRY does not mean THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "THIRD_PARTY_ROUTING_BLOCKER_ROW does not mean ROUTE_AUTHORIZATION",
    "ROUTE_FAMILY_CANDIDATE does not mean PROVIDER_INTEGRATION",
    "PROVIDER_IDENTITY_STATUS_ROW does not mean PROVIDER_REGISTRY",
    "PROVIDER_IDENTITY_STATUS_ROW does not mean PROVIDER_STATUS_IMPLEMENTATION",
    "DATA_ROUTING_MAP_ROW does not mean DATA_ROUTING_MAP_EXISTS",
    "PROVIDER_AUDITABILITY_ROW does not mean AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "TOKEN_URL_SECRET_ROW does not mean TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "CI_LOG does not mean RELEASE_EVIDENCE",
    "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
    "BLOCKER_ROW does not mean SECURITY_FINDING",
    "BLOCKER_ROW does not mean SEVERITY_ASSIGNED",
    "BLOCKER_ROW does not mean REMEDIATION_RECOMMENDED",
  ]) {
    assert.match(rules, new RegExp(token.replace(/[()]/g, "\\$&")));
  }

  const prerequisites =
    registry.getThirdPartyRoutingRuntimeReadinessRequiredPrerequisites().join("\n");
  for (const token of [
    "third-party provider status registry",
    "provider identity/status contract",
    "provider data-routing map",
    "provider retention/deletion posture",
    "provider auditability posture",
    "provider token/URL/secret handling policy",
    "no-token/no-URL/no-secret route policy",
    "audit/access-log implementation plan",
    "log schema",
    "log storage policy",
    "role/permission model",
    "RBAC/access-control implementation plan",
    "admin/support model",
    "retention/deletion/purge/erasure policy",
    "encryption/key-management policy",
    "runtime gate implementation plan",
    "validator dispatch plan",
    "registry/lookup plan",
    "global access-control model",
    "global authorization model",
    "tenant isolation tests",
    "wrong-case tests",
    "wrong-object tests",
    "allow/deny tests",
    "local-log non-CI wording",
    "CI-log non-release wording",
    "external-use non-authorization wording",
    "human/professional review gate",
  ]) {
    assert.match(prerequisites, new RegExp(token.replace(/[()]/g, "\\$&")));
  }
});

test("registry rows and helper results are frozen copy-safe and exported by index", () => {
  assert.equal(
    index.THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
    registry.THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
  );

  const row = registry.getThirdPartyRoutingRuntimeReadinessBlockerRow(expectedRows[0]);
  assert.equal(Object.isFrozen(row), true);
  assert.equal(Object.isFrozen(row.related_material_classes), true);
  assert.throws(() => {
    row.notes = "mutated";
  }, TypeError);

  const families = registry.listThirdPartyRoutingRuntimeReadinessBlockerFamilies();
  assert.equal(Object.isFrozen(families), true);
  assert.throws(() => {
    families.EXTRA = "mutated";
  }, TypeError);
});
