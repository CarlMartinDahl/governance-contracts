"use strict";

const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const tprRuntime = require("../packages/governance/src/third-party-routing-runtime-readiness-blocker-status-registry.js");
const tpr = require("../packages/governance/src/third-party-routing-status-gap-registry.js");
const aalRuntime = require("../packages/governance/src/audit-access-log-runtime-readiness-blocker-status-registry.js");
const aal = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const rolePermission = require("../packages/governance/src/role-permission-model-status-gap-registry.js");
const runtimeGate = require("../packages/governance/src/runtime-gate-candidate-status-inventory-registry.js");
const globalAccess = require("../packages/governance/src/global-access-control-threat-model-inventory-status-registry.js");
const adminSupport = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const rawRouting = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const lifecycle = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");

const repoRoot = path.resolve(__dirname, "..");

function readTrackedDoc(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

const docs = Object.freeze({
  blocker: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  ),
  statusGapSummary: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_THIRD_PARTY_ROUTING_RUNTIME_READINESS_STATUS_GAP_SUMMARY_AFTER_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  ),
  aalRuntimeBlocker: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  ),
  aalControl: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  ),
  adminSupport: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_v1.md",
  ),
  rbacGate: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
  ),
  rbacControl: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  ),
  runtimeGate: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
  ),
  globalAccess: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
  ),
  rawRouting: readTrackedDoc(
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  ),
});

const allDocs = Object.values(docs).join("\n");

const expectedBlockers = Object.freeze([
  ["TPR-RUNTIME-BLOCKER-001", "third-party model/API route request"],
  ["TPR-RUNTIME-BLOCKER-002", "third-party route denial event"],
  ["TPR-RUNTIME-BLOCKER-003", "third-party route approval candidate"],
  ["TPR-RUNTIME-BLOCKER-004", "provider identity/status record"],
  ["TPR-RUNTIME-BLOCKER-005", "provider data-routing map"],
  ["TPR-RUNTIME-BLOCKER-006", "provider retention/deletion posture"],
  ["TPR-RUNTIME-BLOCKER-007", "provider auditability/logging posture"],
  ["TPR-RUNTIME-BLOCKER-008", "provider token/URL/secret handling"],
  ["TPR-RUNTIME-BLOCKER-009", "raw/private/source material route attempt"],
  ["TPR-RUNTIME-BLOCKER-010", "PDF/image/screenshot/metadata route attempt"],
  ["TPR-RUNTIME-BLOCKER-011", "generated/export artifact route attempt"],
  [
    "TPR-RUNTIME-BLOCKER-012",
    "admin/support third-party route approval attempt",
  ],
  ["TPR-RUNTIME-BLOCKER-013", "workflow agent/tool provider route attempt"],
  [
    "TPR-RUNTIME-BLOCKER-014",
    "runtime/schema/workflow gate provider route event",
  ],
  [
    "TPR-RUNTIME-BLOCKER-015",
    "human/professional review provider route dependency",
  ],
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

const allowedContent = Object.freeze([
  "subject reference",
  "role/permission concept",
  "tenant/case scope",
  "material class",
  "route/surface",
  "decision status",
  "timestamp category",
  "reason code",
  "provider category reference",
  "blocker/gap reference",
  "explicit no-raw/no-private/no-source-locator/no-token/no-URL marker",
]);

const prohibitedContent = Object.freeze([
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
]);

const expectedPrerequisites = Object.freeze([
  "third-party provider status registry",
  "provider identity/status contract",
  "provider data-routing map",
  "provider retention/deletion posture",
  "provider auditability posture",
  "provider token/URL/secret handling policy",
  "no-token/no-URL/no-secret route policy",
  "audit/access-log implementation plan",
  "event taxonomy runtime code",
  "no-content route/audit event policy",
  "log schema",
  "log storage policy",
  "role/permission model",
  "RBAC/access-control implementation plan",
  "admin/support model",
  "admin/support access-control model",
  "retention/deletion/purge/erasure policy",
  "encryption/key-management policy",
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
  "no-raw/no-private/no-source-locator/no-token/no-URL policy",
  "local-log non-CI wording",
  "CI-log non-release wording",
  "external-use non-authorization wording",
  "non-proof/non-route-readiness wording",
  "human/professional review gate",
]);

const expectedNonOverclaimRules = Object.freeze([
  "THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_REGISTRY does not mean THIRD_PARTY_ROUTING_IMPLEMENTATION",
  "THIRD_PARTY_ROUTING_BLOCKER_ROW does not mean ROUTE_AUTHORIZATION",
  "ROUTE_FAMILY_CANDIDATE does not mean PROVIDER_INTEGRATION",
  "PROVIDER_IDENTITY_STATUS_ROW does not mean PROVIDER_REGISTRY",
  "PROVIDER_IDENTITY_STATUS_ROW does not mean PROVIDER_STATUS_IMPLEMENTATION",
  "DATA_ROUTING_MAP_ROW does not mean DATA_ROUTING_MAP_EXISTS",
  "PROVIDER_AUDITABILITY_ROW does not mean AUDIT_ACCESS_LOG_IMPLEMENTATION",
  "TOKEN_URL_SECRET_ROW does not mean TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
  "RAW_PRIVATE_ROUTE_ATTEMPT_ROW does not mean RAW_PRIVATE_SOURCE_INSPECTION",
  "PDF_IMAGE_METADATA_ROUTE_ATTEMPT_ROW does not mean METADATA_ACQUISITION",
  "GENERATED_EXPORT_ROUTE_ATTEMPT_ROW does not mean EXTERNAL_USE_AUTHORIZATION",
  "ADMIN_SUPPORT_ROUTE_APPROVAL_ROW does not mean ADMIN_SUPPORT_ACCESS_AUTHORIZED",
  "RUNTIME_GATE_PROVIDER_ROUTE_EVENT does not mean RUNTIME_GATE_IMPLEMENTATION",
  "FUTURE_IMPLEMENTATION_EVIDENCE does not mean CURRENT_IMPLEMENTATION_EVIDENCE",
  "REQUIRED_TEST_EVIDENCE does not mean CURRENT_CLOSURE",
  "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
  "BLOCKER_ROW does not mean SECURITY_FINDING",
  "BLOCKER_ROW does not mean SEVERITY_ASSIGNED",
  "BLOCKER_ROW does not mean REMEDIATION_RECOMMENDED",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
  "HUMAN_REVIEW_GATE does not mean SYSTEM_APPROVAL",
]);

const expectedDocNonOverclaimPhrases = Object.freeze([
  "third-party routing runtime-readiness blocker boundary does not mean third-party routing implementation",
  "third-party routing blocker row does not mean route authorization",
  "route family candidate does not mean provider integration exists",
  "provider identity/status row does not mean provider registry/status implementation exists",
  "data-routing map row does not mean data-routing map exists",
  "provider auditability row does not mean audit/access-log implementation exists",
  "token/URL/secret row does not mean token/URL/secret handling implementation exists",
  "future prerequisite does not mean current evidence",
  "future boundary suitability does not mean blocker closure",
  "Deny-by-default posture does not mean approved routing",
  "Product candidate remains none",
  "External-use remains unauthorized",
  "Human/professional review remains release gate",
  "DOCS_ONLY` boundaries are not runtime enforcement",
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
  "routed",
  "inspected",
  "metadata_acquired",
  "provider_routing_authorized",
  "access_granted",
]);

function valuesBy(registry, key = "id") {
  return new Set(Object.values(registry).map((entry) => entry[key]));
}

function assertSetContainsAll(actual, expected, label) {
  for (const value of expected) {
    assert.equal(actual.has(value), true, `${label} missing ${value}`);
  }
}

function assertTextIncludes(text, phrases, label) {
  for (const phrase of phrases) {
    assert.match(text, new RegExp(escapeRegExp(phrase), "i"), label + ": " + phrase);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertNoPositiveClaims(value, trail = "root", seen = new Set()) {
  if (!value || typeof value !== "object") {
    return;
  }

  if (seen.has(value)) {
    return;
  }
  seen.add(value);

  for (const [key, nested] of Object.entries(value)) {
    if (positiveClaimKeys.includes(key)) {
      assert.equal(nested, false, `${trail}.${key} must remain false`);
    }
    assertNoPositiveClaims(nested, `${trail}.${key}`, seen);
  }
}

test("tracked docs preserve literal TPR runtime blocker anchors and surfaces", () => {
  assert.ok(
    docs.blocker.includes("TPR-RUNTIME-BLOCKER-001"),
    "literal TPR-RUNTIME-BLOCKER anchors must exist in the blocker doc",
  );

  for (const [sourceId, surface] of expectedBlockers) {
    assert.match(docs.blocker, new RegExp("`" + sourceId + "`"));
    assertTextIncludes(allDocs, [surface], sourceId);
  }

  assertTextIncludes(
    allDocs,
    [
      "DOCS_ONLY",
      "blocker-status",
      "future-only",
      "no third-party model/API routing authorization",
      "no provider integration",
      "no provider registry",
      "no data-routing map implementation",
      "no token/URL/secret handling implementation",
      "no audit/access-log implementation",
      "no log schema",
      "no log storage",
      "no RBAC implementation",
      "no access-control implementation",
      "no runtime enforcement",
      "no validator dispatch",
      "no registry/lookup",
      "no security/vulnerability findings",
      "assigns no severity",
      "recommends no remediation",
      "no release approval",
      "authorizes no external-use",
      "selects no product candidate",
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    ],
    "docs preserve non-runtime posture",
  );
});

test("TPR runtime blocker registry contains exact source IDs and required fields", () => {
  const rows = tprRuntime.listThirdPartyRoutingRuntimeReadinessBlockerRows();

  assert.deepEqual(
    rows.map((row) => row.source_blocker_id),
    expectedBlockers.map(([sourceId]) => sourceId),
  );

  for (const row of rows) {
    for (const field of requiredFields) {
      assert.ok(field in row, `${row.id} missing ${field}`);
    }

    assert.deepEqual(row.allowed_future_route_event_content, allowedContent);
    assert.deepEqual(row.prohibited_route_event_log_content, prohibitedContent);
    assert.equal(
      row.no_raw_no_private_no_source_locator_no_token_no_url_requirement,
      "NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_NO_TOKEN_NO_URL_ONLY",
    );
    assert.ok(
      row.current_runtime_readiness_status.includes(
        "RUNTIME_GATE_INVENTORY_DEFERRED",
      ),
      `${row.id} remains runtime-gate inventory deferred`,
    );
    assert.equal(
      row.current_authorization_status,
      "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
    );
    assert.equal(row.future_boundary_posture, "FUTURE_ROUTE_CANDIDATE_ONLY");
    assert.match(row.non_authorized_until_closure, /Not authorized until/);
    assertNoPositiveClaims(row, row.id);
  }
});

test("TPR runtime blocker rows reference only known tracked registry IDs", () => {
  const materialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const storageLocationIds = valuesBy(storage.DATA_LOCATION_REGISTRY);
  const tprGapIds = valuesBy(tpr.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY);
  const aalRuntimeIds = valuesBy(
    aalRuntime.AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_STATUS_REGISTRY,
  );
  const rolePermissionGapIds = valuesBy(
    rolePermission.ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY,
  );
  const adminSupportGapIds = valuesBy(
    adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
  );
  const rmrControlIds = valuesBy(
    rawRouting.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
    "control_id",
  );
  const aalEventIds = valuesBy(aal.AUDIT_ACCESS_LOG_EVENT_CANDIDATES);
  const lifecycleFamilies = new Set(
    Object.values(lifecycle.LIFECYCLE_CONTROL_FAMILIES),
  );
  const globalAccessIds = valuesBy(
    globalAccess.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
  );
  const runtimeGateIds = valuesBy(
    runtimeGate.RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
  );

  for (const row of tprRuntime.listThirdPartyRoutingRuntimeReadinessBlockerRows()) {
    assertSetContainsAll(materialClasses, row.related_material_classes, row.id);
    assertSetContainsAll(storageLocationIds, row.related_storage_location_ids, row.id);
    assertSetContainsAll(
      tprGapIds,
      row.related_third_party_status_gap_ids,
      row.id,
    );
    assertSetContainsAll(
      aalRuntimeIds,
      row.related_audit_access_log_runtime_blocker_ids,
      row.id,
    );
    assertSetContainsAll(
      rolePermissionGapIds,
      row.related_role_permission_gap_ids,
      row.id,
    );
    assertSetContainsAll(
      adminSupportGapIds,
      row.related_admin_support_gap_ids,
      row.id,
    );
    assertSetContainsAll(
      rmrControlIds,
      row.related_raw_material_routing_control_ids,
      row.id,
    );
    assertSetContainsAll(
      aalEventIds,
      row.related_aal_event_candidate_ids,
      row.id,
    );
    assertSetContainsAll(
      lifecycleFamilies,
      row.related_lifecycle_families,
      row.id,
    );
    assertSetContainsAll(
      globalAccessIds,
      row.related_global_access_control_row_ids,
      row.id,
    );
    assertSetContainsAll(
      runtimeGateIds,
      row.related_runtime_gate_candidate_ids,
      row.id,
    );
  }
});

test("high-risk material classes and unknown blocker lookup remain fail closed", () => {
  const deniedMaterials = new Set(
    Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (entry) => entry.material_class,
    ),
  );
  const rowsWithDeniedMaterials =
    tprRuntime.listThirdPartyRoutingRuntimeReadinessBlockerRows().filter((row) =>
      row.related_material_classes.some((materialClass) =>
        deniedMaterials.has(materialClass),
      ),
    );

  assert.ok(rowsWithDeniedMaterials.length >= 4);

  for (const row of rowsWithDeniedMaterials) {
    assert.equal(row.non_authorizations.authorized, false);
    assert.equal(row.non_authorizations.route_authorized, false);
    assert.equal(
      row.current_authorization_status,
      "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
    );
  }

  const unknown = tprRuntime.classifyThirdPartyRoutingRuntimeReadinessBlockerRow(
    "TPR-RUNTIME-BLOCKER-999_UNKNOWN",
  );
  assert.equal(unknown.status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.evidence_posture, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.authorized, false);
  assert.equal(unknown.route_authorized, false);
  assert.equal(
    tprRuntime.getThirdPartyRoutingRuntimeReadinessBlockerRow(
      "TPR-RUNTIME-BLOCKER-999_UNKNOWN",
    ),
    undefined,
  );
  assert.equal(
    tprRuntime.hasThirdPartyRoutingRuntimeReadinessBlockerRow(
      "TPR-RUNTIME-BLOCKER-999_UNKNOWN",
    ),
    false,
  );
  assertNoPositiveClaims(unknown, "unknown");
});

test("global helper posture remains non-implementing and non-authorizing", () => {
  assert.deepEqual(
    tprRuntime.getThirdPartyRoutingRuntimeReadinessRequiredPrerequisites(),
    expectedPrerequisites,
  );
  assertSetContainsAll(
    new Set(tprRuntime.listThirdPartyRoutingRuntimeReadinessNonOverclaimRules()),
    expectedNonOverclaimRules,
    "non-overclaim rules",
  );

  assert.equal(tprRuntime.isThirdPartyRoutingImplemented(), false);
  assert.equal(tprRuntime.isThirdPartyRouteAuthorized(), false);
  assert.equal(tprRuntime.isProviderIntegrationCreated(), false);
  assert.equal(tprRuntime.isProviderRegistryCreated(), false);
  assert.equal(tprRuntime.isProviderStatusImplemented(), false);
  assert.equal(tprRuntime.isDataRoutingMapCreated(), false);
  assert.equal(tprRuntime.isProviderAuditabilityImplemented(), false);
  assert.equal(tprRuntime.isTokenUrlSecretHandlingImplemented(), false);
  assert.equal(tprRuntime.isSecurityFindingCreated(), false);

  assert.equal(aalRuntime.isAuditAccessLogImplemented(), false);
  assert.equal(aalRuntime.isEventTaxonomyRuntimeCodeCreated(), false);
  assert.equal(aalRuntime.isLogSchemaCreated(), false);
  assert.equal(aalRuntime.isLogStorageCreated(), false);
  assert.equal(aalRuntime.isLogViewerRbacCreated(), false);
  assert.equal(rolePermission.isRolePermissionModelImplemented(), false);
  assert.equal(rolePermission.isRbacImplemented(), false);
  assert.equal(rolePermission.isAccessControlImplemented(), false);
  assert.equal(rolePermission.isAdminSupportAccessAuthorized(), false);
  assert.equal(runtimeGate.isRuntimeGateImplemented(), false);
  assert.equal(runtimeGate.isRuntimeGateEnforced(), false);
  assert.equal(runtimeGate.isValidatorDispatchCreated(), false);
  assert.equal(runtimeGate.isRuntimeRegistryLookupCreated(), false);
  assert.equal(rawRouting.isRawMaterialRoutingImplemented(), false);
  assert.equal(rawRouting.isRawMaterialRouteAuthorized(), false);

  assertNoPositiveClaims(
    tprRuntime.getThirdPartyRoutingRuntimeReadinessNonAuthorizationStatus(),
    "tprRuntime.nonAuthorization",
  );
  assertNoPositiveClaims(
    tprRuntime.classifyThirdPartyRoutingRuntimeReadinessBlockerRow(
      "TPR-RUNTIME-BLOCKER-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST",
    ),
    "tprRuntime.classifyKnown",
  );
});

test("storage and evidence boundaries remain future-only and non-release", () => {
  const l20 = storage.DATA_LOCATION_REGISTRY.L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE;
  const l22 =
    storage.DATA_LOCATION_REGISTRY.L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE;
  const l23 =
    storage.DATA_LOCATION_REGISTRY.L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE;

  assert.equal(l20.status, "FUTURE_RUNTIME_CANDIDATE");
  assert.equal(l22.status, "FUTURE_PROVIDER_OR_RECIPIENT_CANDIDATE");
  assert.equal(l23.status, "FUTURE_PROVIDER_OR_RECIPIENT_CANDIDATE");
  assert.ok(l20.implementation_statuses.includes("NOT_AUDIT_LOG_STORAGE"));
  assert.equal(l20.non_authorizations.authorized, false);
  assert.equal(l22.non_authorizations.provider_routing_authorized, false);
  assert.equal(l23.non_authorizations.provider_routing_authorized, false);

  assertTextIncludes(
    allDocs,
    [
      "local logs are not CI evidence",
      "release approval",
      "Human/professional review remains release gate",
    ],
    "evidence boundary docs",
  );
});

test("tracked docs preserve prohibited content and non-overclaim wording", () => {
  assertTextIncludes(allDocs, allowedContent, "allowed future route content");
  assertTextIncludes(allDocs, prohibitedContent, "prohibited route content");
  assertTextIncludes(
    allDocs,
    expectedDocNonOverclaimPhrases,
    "non-overclaim docs",
  );
  assertTextIncludes(
    allDocs,
    [
      "provider registry/status boundary",
      "provider identity/status semantics",
      "provider data-routing map",
      "provider retention/deletion posture",
      "provider auditability posture",
      "token/URL/secret handling contract",
      "raw-material routing implementation",
      "runtime gate inventory deferred",
      "validator dispatch",
      "registry/lookup",
      "complete global access-control threat model",
      "no-content/no-raw/no-private/no-source-locator/no-token/no-URL route",
      "human/professional review gate",
    ],
    "prerequisite docs",
  );
});
