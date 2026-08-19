"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const gac = require("../packages/governance/src/global-access-control-threat-model-inventory-status-registry.js");
const adminSupport = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const tpr = require("../packages/governance/src/third-party-routing-status-gap-registry.js");
const rmr = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const rde = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const aal = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const rbac = require("../packages/governance/src/rbac-role-permission-deny-by-default-scaffold.js");

const repoRoot = path.resolve(__dirname, "..");
const accessControlThreatModelDoc = fs.readFileSync(
  path.join(
    repoRoot,
    "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
  ),
  "utf8",
);

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

const docAlignmentTokens = [
  "DOCS_ONLY",
  "ACCESS_CONTROL_THREAT_MODEL_STATUS_ONLY",
  "AUTH_REQUEST_CONTEXT_PARTIAL_ONLY",
  "TENANT_ISOLATION_PARTIAL_ONLY",
  "CASE_CONTEXT_ACCESS_CONTROL_PARTIAL_ONLY",
  "CAPABILITY_GATES_PARTIAL_ONLY",
  "ROUTE_LEVEL_AUTHORIZATION_PARTIAL_ONLY",
  "OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_NOT_EVIDENCED",
  "FUNCTION_LEVEL_AUTHORIZATION_PARTIAL_ONLY",
  "PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_NOT_EVIDENCED",
  "ROLE_PERMISSIONS_UNRESOLVED",
  "ADMIN_SUPPORT_ACCESS_PATHS_NOT_EVIDENCED",
  "EXPORT_ARTIFACT_DOWNLOAD_BOUNDARIES_PARTIAL_ONLY",
  "DATABASE_QUERY_SCOPING_PARTIAL_ONLY",
  "SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL_ONLY",
  "ALLOWED_ACCESS_TEST_COVERAGE_PARTIAL_ONLY",
  "DENIED_ACCESS_TEST_COVERAGE_PARTIAL_ONLY",
  "CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL_ONLY",
  "COMPLETE_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_NOT_EVIDENCED",
  "NO_SECURITY_FINDING_CREATED",
  "NO_VULNERABILITY_FINDING_CREATED",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "NO_REMEDIATION_IMPLEMENTED",
  "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
  "PRODUCT_CANDIDATE_NONE",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
];

const docSurfacePhrases = [
  "Authentication / request auth context",
  "Tenant isolation",
  "Case-context access control",
  "Capability gates",
  "Route-level authorization coverage",
  "Object-level / BOLA / IDOR",
  "Function-level authorization",
  "Property-level / data overexposure",
  "Role permissions",
  "Admin/support access paths",
  "Export/artifact/download boundaries",
  "Database query scoping",
  "Schema/validator contribution",
  "Allowed-access tests",
  "Denied-access tests",
  "Cross-tenant/wrong-case tests",
  "Missing global access-control threat model",
];

const positiveClaimKeys = new Set([
  "authorized",
  "access_granted",
  "access_control_enforced",
  "rbac_implemented",
  "rbac_access_control_implemented",
  "global_authorization_model_created",
  "global_authorization_created",
  "security_finding_created",
  "vulnerability_finding_created",
  "severity_assigned",
  "remediation_recommended",
  "remediation_implemented",
  "admin_support_runtime_access_authorized",
  "admin_support_runtime_access_implemented",
  "admin_support_access_control_created",
  "admin_support_model_created",
  "admin_support_routes_created",
  "admin_support_auth_fields_created",
  "admin_support_db_fields_created",
  "log_viewer_rbac_created",
  "audit_access_log_implemented",
  "access_log_implemented",
  "log_storage_created",
  "retention_deletion_executed",
  "provider_routing_authorized",
  "raw_material_routing_implemented",
  "third_party_routing_authorized",
  "third_party_routing_implemented",
  "provider_integration_created",
  "provider_registry_created",
  "provider_status_implemented",
  "data_routing_map_created",
  "token_url_secret_handling_implemented",
  "route_authorized",
  "routed",
  "inspected",
  "metadata_acquired",
  "emitted",
  "stored",
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
  "release_approved",
  "external_use_authorized",
  "product_candidate_authorized",
  "product_candidate_selected",
  "runtime_certification_created",
  "technical_signoff_created",
  "system_approval_created",
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertDocContainsAll(doc, phrases) {
  for (const phrase of phrases) {
    assert.match(doc, new RegExp(escapeRegExp(phrase), "i"), phrase);
  }
}

function assertNoPositiveClaims(value, seen = new Set()) {
  if (!value || typeof value !== "object") {
    return;
  }

  if (seen.has(value)) {
    return;
  }
  seen.add(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      assertNoPositiveClaims(item, seen);
    }
    return;
  }

  for (const [key, item] of Object.entries(value)) {
    if (positiveClaimKeys.has(key)) {
      assert.equal(item, false, `${key} must remain false`);
    }
    assertNoPositiveClaims(item, seen);
  }
}

function assertIncludesAll(actual, expected) {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
}

const rows = gac.listGlobalAccessControlThreatModelInventoryRows();

test("tracked access-control threat-model doc preserves inventory-status boundaries", () => {
  assertDocContainsAll(accessControlThreatModelDoc, expectedRowIds);
  assertDocContainsAll(accessControlThreatModelDoc, docAlignmentTokens);
  assertDocContainsAll(accessControlThreatModelDoc, docSurfacePhrases);
  assertDocContainsAll(accessControlThreatModelDoc, [
    "Registry Alignment Row IDs",
    "DOCS_ONLY registry alignment anchors",
    "They do not create access-control implementation",
    "RBAC implementation",
    "a global authorization model",
    "a role/permission model",
    "admin/support runtime access",
    "security findings",
    "vulnerability findings",
    "severity",
    "remediation recommendation",
    "remediation implementation",
    "runtime enforcement",
    "release approval",
    "external-use authorization",
    "product-candidate selection",
    "runtime certification",
    "technical sign-off",
    "This boundary freezes access-control threat-model inventory status only.",
    "It does not create a security finding.",
    "It does not create a vulnerability finding.",
    "It does not assign severity.",
    "It does not recommend remediation.",
    "It does not implement remediation.",
    "It does not create implementation evidence.",
    "It does not change runtime/API/schema/package behavior.",
    "Partial route/case/capability evidence is not a complete global access-control model.",
    "partial route/case/capability evidence is not global access-control assurance",
    "case-id checks are not full BOLA/IDOR analysis",
    "schema validators are not access-control policy",
    "local logs as CI evidence",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
    "runtime certification",
    "technical sign-off",
    "security findings",
    "vulnerability findings",
    "severity",
    "remediation",
  ]);
});

test("GAC registry exposes exact rows and required field shape", () => {
  assert.deepEqual(rows.map((row) => row.id), expectedRowIds);
  assert.deepEqual(
    Object.keys(gac.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY),
    expectedRowIds,
  );

  for (const row of rows) {
    for (const field of requiredFields) {
      assert.ok(field in row, `${row.id} missing ${field}`);
    }

    assert.equal(row.current_authorization_status, "NOT_AUTHORIZED", row.id);
    assert.equal(row.non_authorized_until_closure, true, row.id);
    assert.equal(row.non_authorizations.authorized, false, row.id);
    assert.equal(row.non_authorizations.access_control_enforced, false, row.id);
    assert.equal(row.non_authorizations.rbac_implemented, false, row.id);
    assert.equal(
      row.non_authorizations.global_authorization_model_created,
      false,
      row.id,
    );
    assertNoPositiveClaims(row);
  }
});

test("GAC rows reference only known tracked registry constants", () => {
  const materialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const storageLocationIds = new Set(Object.keys(storage.DATA_LOCATION_REGISTRY));
  const adminSupportGapIds = new Set(
    Object.keys(adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY),
  );
  const tprStatusGapIds = new Set(
    Object.keys(tpr.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY),
  );
  const rawMaterialRoutingControlIds = new Set(
    Object.values(rmr.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY).map(
      (entry) => entry.control_id,
    ),
  );
  const aalEventCandidateIds = new Set(
    Object.values(aal.AUDIT_ACCESS_LOG_EVENT_CANDIDATES).map(
      (entry) => entry.id,
    ),
  );
  const lifecycleFamilies = new Set(Object.values(rde.LIFECYCLE_CONTROL_FAMILIES));

  for (const row of rows) {
    for (const materialClass of row.related_material_classes) {
      assert.equal(materialClasses.has(materialClass), true, materialClass);
    }
    for (const locationId of row.related_storage_location_ids) {
      assert.equal(storageLocationIds.has(locationId), true, locationId);
    }
    for (const gapId of row.related_admin_support_gap_ids) {
      assert.equal(adminSupportGapIds.has(gapId), true, gapId);
    }
    for (const gapId of row.related_third_party_status_gap_ids) {
      assert.equal(tprStatusGapIds.has(gapId), true, gapId);
    }
    for (const controlId of row.related_raw_material_routing_control_ids) {
      assert.equal(rawMaterialRoutingControlIds.has(controlId), true, controlId);
    }
    for (const eventId of row.related_aal_event_candidate_ids) {
      assert.equal(aalEventCandidateIds.has(eventId), true, eventId);
    }
    for (const family of row.related_lifecycle_families) {
      assert.equal(lifecycleFamilies.has(family), true, family);
    }
  }
});

test("high-risk material rows and unknown GAC rows remain fail closed", () => {
  const highRiskMaterialClasses = new Set(
    Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (entry) => entry.material_class,
    ),
  );
  const highRiskRows = rows.filter((row) =>
    row.related_material_classes.some((materialClass) =>
      highRiskMaterialClasses.has(materialClass),
    ),
  );

  assert.ok(highRiskRows.length >= 2);

  for (const row of highRiskRows) {
    assert.equal(row.current_authorization_status, "NOT_AUTHORIZED", row.id);
    assert.equal(row.non_authorizations.authorized, false, row.id);
    assert.equal(row.non_authorizations.provider_routing_authorized, false, row.id);
    assertNoPositiveClaims(row);
  }

  for (const materialClass of highRiskMaterialClasses) {
    const denial = storage.getHighRiskMaterialClassDenial(materialClass);
    assert.equal(denial.denied, true, materialClass);
    assert.equal(denial.authorized, false, materialClass);
  }

  const unknown = gac.getGlobalAccessControlThreatModelInventoryRow(
    "GAC-TM-999_UNKNOWN",
  );
  assert.equal(unknown.current_authorization_status, "UNKNOWN_NOT_EVIDENCED");
  assert.deepEqual(unknown.current_statuses, ["UNKNOWN_NOT_EVIDENCED"]);
  assertNoPositiveClaims(unknown);

  const classification = gac.classifyGlobalAccessControlThreatModelInventoryRow(
    "GAC-TM-999_UNKNOWN",
  );
  assert.equal(classification.known, false);
  assert.equal(classification.classification, "UNKNOWN_NOT_EVIDENCED");
  assertNoPositiveClaims(classification);
});

test("global access-control model remains non-implemented and non-authorizing", () => {
  const status = gac.getGlobalAccessControlThreatModelNonAuthorizationStatus();

  assert.equal(gac.isGlobalAccessControlModelImplemented(), false);
  assert.equal(gac.isGlobalAuthorizationModelCreated(), false);
  assert.equal(gac.isAccessControlRuntimeEnforced(), false);
  assert.equal(gac.isSecurityFindingCreated(), false);
  assert.equal(status.authorized, false);
  assert.equal(status.access_granted, false);
  assert.equal(status.access_control_enforced, false);
  assert.equal(status.rbac_implemented, false);
  assert.equal(status.global_authorization_model_created, false);
  assert.equal(status.security_finding_created, false);
  assert.equal(status.vulnerability_finding_created, false);
  assert.equal(status.severity_assigned, false);
  assert.equal(status.remediation_recommended, false);
  assert.equal(status.remediation_implemented, false);
  assert.equal(status.local_logs_are_ci_evidence, false);
  assert.equal(status.ci_logs_are_release_evidence, false);
  assert.equal(status.human_review_gate_is_system_approval, false);
  assertNoPositiveClaims(status);
});

test("partial evidence and unresolved gaps stay explicit by row", () => {
  const byId = Object.fromEntries(rows.map((row) => [row.id, row]));

  assert.equal(
    byId["GAC-TM-001_AUTH_REQUEST_CONTEXT_PARTIAL"].partial_evidence_level,
    "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
  );
  assert.equal(
    byId["GAC-TM-004_CAPABILITY_GATES_PARTIAL"].implementation_gap,
    "capability gates do not create RBAC",
  );
  assert.equal(
    byId["GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL"].implementation_gap,
    "route authorization is not global authorization",
  );
  assert.equal(
    byId["GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP"]
      .partial_evidence_level,
    "UNKNOWN_NOT_EVIDENCED",
  );
  assert.equal(
    byId["GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP"]
      .implementation_gap,
    "object-level BOLA/IDOR analysis is not evidenced",
  );
  assert.equal(
    byId["GAC-TM-007_FUNCTION_LEVEL_AUTHORIZATION_PARTIAL"]
      .partial_evidence_level,
    "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE",
  );
  assert.equal(
    byId["GAC-TM-008_PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP"]
      .implementation_gap,
    "property-level analysis is not complete",
  );
  assert.equal(
    byId["GAC-TM-009_ROLE_PERMISSION_MODEL_GAP"].implementation_gap,
    "role fields, permission fields, and schemas absent",
  );
  assert.equal(
    byId["GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP"].implementation_gap,
    "admin/support model, routes, auth fields, and DB fields absent",
  );
  assert.equal(
    byId["GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP"].implementation_gap,
    "global authorization model is not created",
  );
});

test("non-overclaim rules and prerequisites preserve access-control closure gates", () => {
  const rules = gac.listGlobalAccessControlThreatModelNonOverclaimRules();
  const prerequisites =
    gac.getGlobalAccessControlThreatModelRequiredPrerequisites();

  assertIncludesAll(rules, [
    "ACCESS_CONTROL_THREAT_MODEL_INVENTORY does not mean ACCESS_CONTROL_IMPLEMENTATION",
    "THREAT_MODEL_ROW does not mean SECURITY_FINDING",
    "THREAT_MODEL_ROW does not mean VULNERABILITY_FINDING",
    "THREAT_MODEL_ROW does not mean SEVERITY_ASSIGNED",
    "THREAT_MODEL_ROW does not mean REMEDIATION_RECOMMENDED",
    "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean RBAC",
    "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean FULL_ACCESS_CONTROL",
    "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean ADMIN_SUPPORT_ACCESS_CONTROL",
    "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean GLOBAL_AUTHORIZATION_MODEL",
    "TENANT_CASE_CAPABILITY_CHECKS do not mean ROLE_PERMISSION_MODEL",
    "PARTIAL_ROUTE_AUTHORIZATION does not mean GLOBAL_AUTHORIZATION",
    "OBJECT_LEVEL_GAP does not mean BOLA_IDOR_ANALYSIS_COMPLETE",
    "FUNCTION_LEVEL_PARTIAL does not mean FUNCTION_LEVEL_AUTHORIZATION_COMPLETE",
    "PROPERTY_LEVEL_GAP does not mean DATA_OVEREXPOSURE_ANALYSIS_COMPLETE",
    "ROLE_PERMISSION_MODEL_GAP does not mean ROLE_PERMISSION_MODEL_CREATED",
    "ADMIN_SUPPORT_ACCESS_PATHS_GAP does not mean ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "CI_LOG does not mean RELEASE_EVIDENCE",
    "HUMAN_REVIEW_GATE does not mean SYSTEM_APPROVAL",
  ]);

  assertIncludesAll(prerequisites, [
    "complete global access-control model",
    "role/permission model",
    "role fields",
    "permission fields",
    "role schema",
    "permission schema",
    "admin/support model",
    "admin/support access-control model",
    "admin/support bypass-prevention tests",
    "object-level authorization review",
    "function-level authorization review",
    "property-level data-overexposure review",
    "tenant isolation tests",
    "wrong-tenant tests",
    "wrong-case tests",
    "wrong-object tests",
    "wrong-function tests",
    "wrong-property tests",
    "allow/deny tests",
    "RBAC/access-control implementation plan",
    "audit/access-log model",
    "no-content access-control event policy",
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
  ]);
});

test("future L20/L22/L23 storage references remain future and not authorized", () => {
  const rowsByStorage = (storageLocationId) =>
    rows.filter((row) =>
      row.related_storage_location_ids.includes(storageLocationId),
    );

  assert.ok(rowsByStorage("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE").length >= 1);
  assert.ok(rowsByStorage("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE").length >= 1);
  assert.ok(rowsByStorage("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE").length >= 1);

  const l20 = storage.getDataLocation("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE");
  const l22 = storage.getDataLocation("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE");
  const l23 = storage.getDataLocation("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE");

  assert.equal(l20.status, "FUTURE_RUNTIME_CANDIDATE");
  assert.equal(l20.non_authorizations.authorized, false);
  assert.equal(l22.status, "FUTURE_PROVIDER_OR_RECIPIENT_CANDIDATE");
  assert.equal(l22.non_authorizations.authorized, false);
  assert.equal(l22.non_authorizations.provider_routing_authorized, false);
  assert.equal(l23.status, "FUTURE_PROVIDER_OR_RECIPIENT_CANDIDATE");
  assert.equal(l23.non_authorizations.authorized, false);
  assert.equal(l23.non_authorizations.external_use_authorized, false);
});

test("related helper outputs keep positive access-control claims false", () => {
  const helperOutputs = [
    gac.getGlobalAccessControlThreatModelNonAuthorizationStatus(),
    gac.classifyGlobalAccessControlThreatModelInventoryRow(expectedRowIds[0]),
    adminSupport.getAdminSupportRuntimeReadinessNonAuthorizationStatus(),
    adminSupport.classifyAdminSupportRuntimeReadinessStatusGap(
      "ADMIN-SUPPORT-GAP-001_ADMIN_SUPPORT_MODEL_ABSENT",
    ),
    tpr.getThirdPartyRoutingNonAuthorizationStatus(),
    tpr.classifyThirdPartyRoutingStatusGap(
      "TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS",
    ),
    rmr.getRawMaterialRoutingNonAuthorizationStatus(),
    rmr.classifyRawMaterialRoutingControl(
      "RMR_CS_009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    ),
    storage.getStorageRegistryNonAuthorizationStatus(),
    rde.getRdeNonAuthorizationStatus(),
    rde.classifyRdeStorageDependency("RDE-DEP-015_PROVIDER_STORAGE_LIFECYCLE"),
    aal.getAalNonAuthorizationStatus(),
    aal.classifyAuditAccessLogEventCandidate(
      "AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL",
    ),
    rbac.deriveRbacDenyByDefaultAccessDecision({
      actor_type: "ADMIN_OPERATOR_ACTOR",
      role_category: "ADMIN_ROLE_CATEGORY",
      permission_category: "RAW_PRIVATE_SOURCE_MATERIAL_ACCESS",
      resource_material_scope: "RAW_PRIVATE_SOURCE_MATERIAL_SCOPE",
    }),
    rbac.evaluateRouteCaseCapabilityNonOverclaim(
      "ROUTE_CASE_CAPABILITY_NOT_FULL_RBAC",
    ),
  ];

  for (const output of helperOutputs) {
    assertNoPositiveClaims(output);
  }
});
