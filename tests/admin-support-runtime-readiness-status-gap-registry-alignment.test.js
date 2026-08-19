"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const adminSupport = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const tpr = require("../packages/governance/src/third-party-routing-status-gap-registry.js");
const rmr = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const rde = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const aal = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const rbac = require("../packages/governance/src/rbac-role-permission-deny-by-default-scaffold.js");

const repoRoot = path.resolve(__dirname, "..");
const trackedDocPaths = Object.freeze([
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_THIRD_PARTY_ROUTING_RUNTIME_READINESS_STATUS_GAP_SUMMARY_AFTER_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
]);

const docs = Object.fromEntries(
  trackedDocPaths.map((docPath) => [
    docPath,
    fs.readFileSync(path.join(repoRoot, docPath), "utf8"),
  ]),
);

const adminSupportDoc =
  docs[
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_v1.md"
  ];
const allTrackedDocs = Object.values(docs).join("\n");

const expectedGapIds = [
  "ADMIN-SUPPORT-GAP-001_ADMIN_SUPPORT_MODEL_ABSENT",
  "ADMIN-SUPPORT-GAP-002_ADMIN_SUPPORT_RUNTIME_ROUTES_ABSENT",
  "ADMIN-SUPPORT-GAP-003_ADMIN_SUPPORT_AUTH_FIELDS_ABSENT",
  "ADMIN-SUPPORT-GAP-004_ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_DENIED",
  "ADMIN-SUPPORT-GAP-005_ADMIN_SUPPORT_SOURCE_PACKAGE_ACCESS_DENIED",
  "ADMIN-SUPPORT-GAP-006_ADMIN_SUPPORT_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS_DENIED",
  "ADMIN-SUPPORT-GAP-007_ADMIN_SUPPORT_LOG_VIEWER_RBAC_ABSENT",
  "ADMIN-SUPPORT-GAP-008_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_DENIED",
  "ADMIN-SUPPORT-GAP-009_ADMIN_SUPPORT_LIFECYCLE_EXECUTION_DENIED",
  "ADMIN-SUPPORT-GAP-010_ADMIN_SUPPORT_CROSS_TENANT_CASE_OVERRIDE_DENIED",
  "ADMIN-SUPPORT-GAP-011_ADMIN_SUPPORT_EXPORT_PACKET_DELIVERY_DENIED",
  "ADMIN-SUPPORT-GAP-012_ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_DENIED",
];

const requiredFields = [
  "id",
  "family",
  "surface",
  "source_blocker_or_dependency",
  "current_statuses",
  "primary_absent_capability",
  "required_prerequisites",
  "overclaim_risk",
  "current_authorization_status",
  "access_decision_status",
  "future_boundary_posture",
  "non_authorized_until_closure",
  "related_material_classes",
  "related_storage_location_ids",
  "related_raw_material_routing_control_ids",
  "related_tpr_status_gap_ids",
  "related_aal_event_candidate_ids",
  "related_lifecycle_families",
  "related_rbac_boundary_status",
  "evidence_posture",
  "non_authorizations",
  "notes",
];

const docSurfacePhrases = [
  "admin raw/private/source access",
  "admin source-package access",
  "admin PDF/image/screenshot/metadata access",
  "admin/support log access",
  "admin/support export/download",
  "admin/support packet/delivery promotion",
  "admin/support third-party routing approval",
  "admin/support retention/deletion operation",
  "admin/support bypass-prevention",
  "admin/support audit-event gate",
  "support tenant/case override",
  "support wrong-case/wrong-tenant access",
  "admin/support model",
  "admin/support routes",
  "request auth admin/support fields",
  "admin/support DB fields",
  "log access policy",
];

const positiveClaimKeys = new Set([
  "authorized",
  "access_granted",
  "admin_support_runtime_access_authorized",
  "admin_support_model_created",
  "admin_support_routes_created",
  "admin_support_auth_fields_created",
  "admin_support_db_fields_created",
  "log_viewer_rbac_created",
  "provider_routing_authorized",
  "retention_deletion_executed",
  "release_approved",
  "external_use_authorized",
  "product_candidate_authorized",
  "runtime_certification_created",
  "technical_signoff_created",
  "raw_material_routing_implemented",
  "third_party_routing_implemented",
  "provider_integration_created",
  "audit_access_log_implemented",
  "access_log_implemented",
  "log_storage_created",
  "storage_implementation_created",
  "rbac_access_control_implemented",
  "admin_support_runtime_access_implemented",
  "source_package_inspected",
  "pdf_image_screenshot_metadata_inspected",
  "metadata_acquired",
  "raw_private_source_inspected",
  "system_approval_created",
  "rbac_implemented",
  "access_control_enforced",
  "admin_support_access_created",
  "admin_support_bypass_allowed",
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
]);

function shortGapId(id) {
  return id.match(/^ADMIN-SUPPORT-GAP-\d{3}/)[0];
}

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

test("tracked admin/support docs preserve DOCS_ONLY non-implementation boundaries", () => {
  assertDocContainsAll(adminSupportDoc, [
    "Mode: `DOCS_ONLY`",
    "Status: `ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_ONLY`",
    "ADMIN_SUPPORT_RUNTIME_READINESS_NOT_IMPLEMENTATION",
    "ADMIN_SUPPORT_RUNTIME_READINESS_NOT_RUNTIME_ENFORCEMENT",
    "ADMIN_SUPPORT_MODEL_NOT_CREATED",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "ADMIN_SUPPORT_AUTH_FIELDS_NOT_CREATED",
    "ADMIN_SUPPORT_ROUTES_NOT_CREATED",
    "ADMIN_SUPPORT_DB_FIELDS_NOT_CREATED",
    "ADMIN_SUPPORT_ALLOWED_DENIED_TESTS_NOT_CREATED",
    "ADMIN_SUPPORT_BYPASS_PREVENTION_TESTS_NOT_CREATED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
    "LOG_SCHEMA_NOT_CREATED",
    "LOG_STORAGE_NOT_CREATED",
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    "RETENTION_DELETION_NOT_IMPLEMENTED",
    "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
  ]);

  assertDocContainsAll(adminSupportDoc, docSurfacePhrases);
  for (const id of expectedGapIds) {
    assert.match(adminSupportDoc, new RegExp(`\\\`${shortGapId(id)}\\\``));
  }

  assertDocContainsAll(allTrackedDocs, [
    "Route/case/capability evidence remains not RBAC",
    "admin/support access remained in scope, but unresolved",
    "local logs not CI evidence",
    "Third-party model/API routing remains not authorized",
  ]);
});

test("admin/support registry rows expose exact gap IDs and required fields", () => {
  const gaps = adminSupport.listAdminSupportRuntimeReadinessStatusGaps();

  assert.deepEqual(
    gaps.map((gap) => gap.id),
    expectedGapIds,
  );
  assert.deepEqual(
    Object.keys(adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY),
    expectedGapIds,
  );

  for (const gap of gaps) {
    for (const field of requiredFields) {
      assert.ok(field in gap, `${gap.id} missing ${field}`);
    }
    assert.equal(gap.current_authorization_status, "NOT_AUTHORIZED", gap.id);
    assert.equal(gap.access_decision_status, "NOT_ACCESS_GRANTED", gap.id);
    assert.equal(gap.non_authorized_until_closure, true, gap.id);
    assert.equal(gap.non_authorizations.authorized, false, gap.id);
    assert.equal(gap.non_authorizations.access_granted, false, gap.id);
    assertNoPositiveClaims(gap);
  }
});

test("admin/support registry references only known tracked registry IDs", () => {
  const materialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const storageLocationIds = new Set(Object.keys(storage.DATA_LOCATION_REGISTRY));
  const rawMaterialRoutingControlIds = new Set(
    Object.values(rmr.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY).map(
      (entry) => entry.control_id,
    ),
  );
  const tprStatusGapIds = new Set(
    tpr.listThirdPartyRoutingStatusGaps().map((gap) => gap.id),
  );
  const aalEventIds = new Set(Object.keys(aal.AUDIT_ACCESS_LOG_EVENT_CANDIDATES));
  const lifecycleFamilies = new Set(Object.values(rde.LIFECYCLE_CONTROL_FAMILIES));

  for (const gap of adminSupport.listAdminSupportRuntimeReadinessStatusGaps()) {
    for (const materialClass of gap.related_material_classes) {
      assert.equal(materialClasses.has(materialClass), true, materialClass);
    }
    for (const locationId of gap.related_storage_location_ids) {
      assert.equal(storageLocationIds.has(locationId), true, locationId);
    }
    for (const controlId of gap.related_raw_material_routing_control_ids) {
      assert.equal(rawMaterialRoutingControlIds.has(controlId), true, controlId);
    }
    for (const statusGapId of gap.related_tpr_status_gap_ids) {
      assert.equal(tprStatusGapIds.has(statusGapId), true, statusGapId);
    }
    for (const eventId of gap.related_aal_event_candidate_ids) {
      assert.equal(aalEventIds.has(eventId), true, eventId);
    }
    for (const family of gap.related_lifecycle_families) {
      assert.equal(lifecycleFamilies.has(family), true, family);
    }
  }
});

test("high-risk material classes and unknown admin/support gaps remain fail closed", () => {
  const deniedMaterialClasses = new Set(
    Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (entry) => entry.material_class,
    ),
  );
  const highRiskGaps = adminSupport
    .listAdminSupportRuntimeReadinessStatusGaps()
    .filter((gap) =>
      gap.related_material_classes.some((materialClass) =>
        deniedMaterialClasses.has(materialClass),
      ),
    );

  assert.deepEqual(
    highRiskGaps.map((gap) => gap.id),
    [
      "ADMIN-SUPPORT-GAP-004_ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_DENIED",
      "ADMIN-SUPPORT-GAP-005_ADMIN_SUPPORT_SOURCE_PACKAGE_ACCESS_DENIED",
      "ADMIN-SUPPORT-GAP-006_ADMIN_SUPPORT_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS_DENIED",
      "ADMIN-SUPPORT-GAP-008_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_DENIED",
    ],
  );

  for (const gap of highRiskGaps) {
    assert.equal(gap.current_authorization_status, "NOT_AUTHORIZED", gap.id);
    assert.equal(gap.access_decision_status, "NOT_ACCESS_GRANTED", gap.id);
    assert.equal(gap.non_authorized_until_closure, true, gap.id);
    assert.equal(
      adminSupport.isAdminSupportRuntimeAccessAuthorized(gap.id),
      false,
      gap.id,
    );
    assertNoPositiveClaims(adminSupport.classifyAdminSupportRuntimeReadinessStatusGap(gap.id));
  }

  const unknown = adminSupport.getAdminSupportRuntimeReadinessStatusGap(
    "ADMIN-SUPPORT-GAP-999_UNKNOWN",
  );
  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.current_authorization_status, "UNKNOWN_NOT_EVIDENCED");
  assert.deepEqual(unknown.current_statuses, ["UNKNOWN_NOT_EVIDENCED"]);
  assert.equal(
    adminSupport.classifyAdminSupportRuntimeReadinessStatusGap(
      "ADMIN-SUPPORT-GAP-999_UNKNOWN",
    ).decision_status,
    "UNKNOWN_NOT_EVIDENCED",
  );
  assert.equal(
    adminSupport.isAdminSupportRuntimeAccessAuthorized(
      "ADMIN-SUPPORT-GAP-999_UNKNOWN",
    ),
    false,
  );
  assertNoPositiveClaims(unknown);
});

test("admin/support global status remains non-implementing and non-authorizing", () => {
  const status = adminSupport.getAdminSupportRuntimeReadinessNonAuthorizationStatus();

  assert.equal(adminSupport.isAdminSupportRuntimeAccessImplemented(), false);
  assert.equal(
    adminSupport.isAdminSupportRuntimeAccessAuthorized(expectedGapIds[0]),
    false,
  );
  assert.deepEqual(status.decision_statuses, [
    "REGISTRY_SCAFFOLD_ONLY",
    "STATUS_GAP_ONLY",
    "DENY_BY_DEFAULT",
    "NOT_AUTHORIZED",
    "NOT_ACCESS_GRANTED",
  ]);
  assert.ok(
    status.implementation_statuses.includes(
      "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
    ),
  );
  assert.ok(status.implementation_statuses.includes("NOT_ADMIN_SUPPORT_MODEL"));
  assert.ok(status.implementation_statuses.includes("NOT_ADMIN_SUPPORT_ROUTES"));
  assert.ok(status.implementation_statuses.includes("NOT_ADMIN_SUPPORT_AUTH_FIELDS"));
  assert.ok(status.implementation_statuses.includes("NOT_ADMIN_SUPPORT_DB_FIELDS"));
  assert.ok(status.implementation_statuses.includes("NOT_LOG_VIEWER_RBAC"));
  assert.ok(
    status.implementation_statuses.includes(
      "NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    ),
  );
  assert.ok(
    status.implementation_statuses.includes("NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION"),
  );
  assertNoPositiveClaims(status);
});

test("admin/support prerequisites and non-overclaim rules align with tracked docs", () => {
  const prerequisites =
    adminSupport.getAdminSupportRuntimeReadinessRequiredPrerequisites();
  const rules = adminSupport.listAdminSupportRuntimeReadinessNonOverclaimRules();

  for (const prerequisite of [
    "admin/support actor model",
    "admin/support runtime route inventory",
    "admin/support authentication fields",
    "admin/support persisted authorization fields",
    "admin/support allowed/denied tests",
    "bypass-prevention tests",
    "RBAC/access-control implementation",
    "log viewer RBAC model",
    "audit/access-log implementation",
    "log schema/storage policy",
    "retention/deletion/purge/erasure execution policy",
    "third-party provider routing policy",
    "provider identity/status registry",
    "provider data-routing map",
    "provider token/URL/secret handling policy",
    "human/professional review policy",
    "release/external-use/product authorization policy",
    "CI evidence boundary",
    "runtime certification boundary",
    "technical sign-off boundary",
  ]) {
    assert.ok(prerequisites.includes(prerequisite), prerequisite);
  }

  for (const rule of [
    "ADMIN_SUPPORT_STATUS_GAP does not mean ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
    "ADMIN_SUPPORT_MODEL_GAP does not mean ADMIN_SUPPORT_MODEL_CREATED",
    "ADMIN_SUPPORT_ROUTE_GAP does not mean ADMIN_SUPPORT_ROUTES_CREATED",
    "ADMIN_SUPPORT_AUTH_FIELD_GAP does not mean ADMIN_SUPPORT_AUTH_FIELDS_CREATED",
    "ADMIN_SUPPORT_DB_FIELD_GAP does not mean ADMIN_SUPPORT_DB_FIELDS_CREATED",
    "LOG_VIEWER_RBAC_GAP does not mean LOG_VIEWER_RBAC_CREATED",
    "STATUS_GAP_ROW does not mean RUNTIME_ENFORCEMENT",
    "BYPASS_PREVENTION_GAP does not mean ACCESS_CONTROL_ENFORCED",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean ACCESS_AUTHORIZATION",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean THIRD_PARTY_ROUTE_APPROVAL",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean PROVIDER_ROUTING_AUTHORIZATION",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean RELEASE_APPROVAL",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean EXTERNAL_USE_AUTHORIZATION",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean PRODUCT_CANDIDATE_SELECTION",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED does not mean SYSTEM_APPROVAL",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "CI_LOG does not mean RELEASE_EVIDENCE",
  ]) {
    assert.ok(rules.includes(rule), rule);
  }

  assertDocContainsAll(adminSupportDoc, [
    "admin/support runtime-readiness status/gap boundary does not mean admin/support implementation",
    "admin/support surface does not mean route exists",
    "admin/support blocker row does not mean runtime enforcement exists",
    "admin/support blocker row does not mean RBAC/access-control implementation exists",
    "admin/support blocker row does not mean audit/access-log implementation exists",
    "admin/support blocker row does not mean retention/deletion implementation exists",
    "admin/support blocker row does not mean third-party routing authorization exists",
    "product candidate remains none",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
    "DOCS_ONLY boundaries are not runtime enforcement",
  ]);
});

test("related registry helpers preserve admin/support no-runtime boundaries", () => {
  assert.equal(
    rbac.deriveAdminSupportNonBypassDecision(
      "ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL",
    ).authorized,
    false,
  );
  assert.equal(tpr.isThirdPartyRouteAuthorized("TPR-STATUS-GAP-010_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP"), false);
  assert.equal(rmr.isRawMaterialRoutingImplemented(), false);
  assert.equal(rde.isLifecycleImplementationCreated(), false);
  assert.equal(aal.isAuditAccessLogImplementationCreated(), false);
  assert.equal(
    storage.getDataLocation("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE").status,
    "FUTURE_RUNTIME_CANDIDATE",
  );
  assert.equal(
    storage.getDataLocation("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE")
      .non_authorizations.authorized,
    false,
  );
  assert.equal(
    storage.getDataLocation("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE")
      .non_authorizations.authorized,
    false,
  );
  assert.equal(
    storage.getDataLocation("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE")
      .non_authorizations.authorized,
    false,
  );

  assertNoPositiveClaims([
    adminSupport.listAdminSupportRuntimeReadinessStatusGaps(),
    adminSupport.getAdminSupportRuntimeReadinessNonAuthorizationStatus(),
    tpr.getThirdPartyRoutingNonAuthorizationStatus(),
    rmr.getRawMaterialRoutingNonAuthorizationStatus(),
    rde.getRdeNonAuthorizationStatus(),
    aal.getAalNonAuthorizationStatus(),
    rbac.deriveAdminSupportNonBypassDecision(
      "ADMIN_SUPPORT_PACKET_DELIVERY_PROMOTION",
    ),
  ]);
});
