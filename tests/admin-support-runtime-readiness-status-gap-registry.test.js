"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const governance = require("../packages/governance/src/index.js");
const adminSupport = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const lifecycle = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const aal = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const rmr = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const tpr = require("../packages/governance/src/third-party-routing-status-gap-registry.js");

const expectedFamilies = [
  "ADMIN_SUPPORT_MODEL_GAP",
  "ADMIN_SUPPORT_ROUTE_GAP",
  "ADMIN_SUPPORT_AUTH_FIELD_GAP",
  "ADMIN_SUPPORT_DB_FIELD_GAP",
  "ADMIN_SUPPORT_RBAC_GAP",
  "ADMIN_SUPPORT_LOG_VIEWER_GAP",
  "ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_GAP",
  "ADMIN_SUPPORT_SOURCE_PACKAGE_ACCESS_GAP",
  "ADMIN_SUPPORT_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS_GAP",
  "ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP",
  "ADMIN_SUPPORT_LIFECYCLE_EXECUTION_GAP",
  "ADMIN_SUPPORT_CROSS_TENANT_CASE_OVERRIDE_GAP",
  "ADMIN_SUPPORT_EXPORT_PACKET_DELIVERY_GAP",
  "ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_GAP",
  "ADMIN_SUPPORT_HUMAN_REVIEW_DEPENDENCY_GAP",
];

const expectedImplementationStatuses = [
  "NOT_ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
  "NOT_ADMIN_SUPPORT_MODEL",
  "NOT_ADMIN_SUPPORT_ROUTES",
  "NOT_ADMIN_SUPPORT_AUTH_FIELDS",
  "NOT_ADMIN_SUPPORT_DB_FIELDS",
  "NOT_LOG_VIEWER_RBAC",
  "NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
  "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
  "NOT_RETENTION_DELETION_EXECUTION",
  "NOT_STORAGE_IMPLEMENTATION",
  "NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
  "NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
  "NOT_PROVIDER_ROUTING_AUTHORIZATION",
  "NOT_RELEASE_APPROVAL",
  "NOT_EXTERNAL_USE_AUTHORIZATION",
  "NOT_PRODUCT_CANDIDATE_SELECTION",
  "NOT_RUNTIME_CERTIFICATION",
  "NOT_TECHNICAL_SIGNOFF",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedDecisionStatuses = [
  "REGISTRY_SCAFFOLD_ONLY",
  "STATUS_GAP_ONLY",
  "DENY_BY_DEFAULT",
  "NOT_IMPLEMENTED",
  "NOT_AUTHORIZED",
  "NOT_ACCESS_GRANTED",
  "BLOCKED_BY_RBAC_ACCESS_CONTROL",
  "BLOCKED_BY_AUDIT_ACCESS_LOG",
  "BLOCKED_BY_STORAGE_BOUNDARY",
  "BLOCKED_BY_LIFECYCLE_NON_IMPLEMENTATION",
  "BLOCKED_BY_RAW_MATERIAL_ROUTING_DENIAL",
  "BLOCKED_BY_THIRD_PARTY_ROUTE_GAP",
  "BLOCKED_BY_HUMAN_REVIEW_GATE",
  "UNKNOWN_NOT_EVIDENCED",
];

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

const positiveClaimKeys = [
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
];

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
    if (positiveClaimKeys.includes(key)) {
      assert.equal(item, false, `${key} must remain false`);
    }
    assertNoPositiveClaims(item);
  }
}

test("admin/support runtime readiness families and statuses exist", () => {
  assert.deepEqual(
    adminSupport.listAdminSupportRuntimeReadinessFamilies(),
    expectedFamilies,
  );
  assert.deepEqual(
    Object.values(
      adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_IMPLEMENTATION_STATUS,
    ),
    expectedImplementationStatuses,
  );
  assert.deepEqual(
    Object.values(adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_DECISION_STATUS),
    expectedDecisionStatuses,
  );
  assert.deepEqual(
    Object.values(adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_EVIDENCE_POSTURE),
    [
      "DOCS_ONLY_STATUS_GAP",
      "REGISTRY_SCAFFOLD_EVIDENCE",
      "TESTED_ALIGNMENT_EVIDENCE",
      "CI_TESTED_SCENARIO_EVIDENCE",
      "FUTURE_CANDIDATE_ONLY",
      "HUMAN_REVIEW_REQUIRED",
      "UNKNOWN_NOT_EVIDENCED",
    ],
  );
});

test("status/gap registry exposes exact deterministic rows and required fields", () => {
  assert.deepEqual(
    adminSupport
      .listAdminSupportRuntimeReadinessStatusGaps()
      .map((entry) => entry.id),
    expectedGapIds,
  );
  assert.deepEqual(
    Object.keys(
      adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
    ),
    expectedGapIds,
  );

  for (const gap of adminSupport.listAdminSupportRuntimeReadinessStatusGaps()) {
    for (const field of requiredFields) {
      assert.ok(field in gap, `${gap.id} missing ${field}`);
    }

    assert.equal(
      adminSupport.hasAdminSupportRuntimeReadinessStatusGap(gap.id),
      true,
    );
    assert.equal(gap.non_authorized_until_closure, true);
    assert.equal(gap.current_authorization_status, "NOT_AUTHORIZED");
    assert.equal(gap.access_decision_status, "NOT_ACCESS_GRANTED");
    assert.equal(
      adminSupport.isAdminSupportRuntimeAccessAuthorized(gap.id),
      false,
    );
    assertNoPositiveClaims(gap);
  }
});

test("status/gap rows reference only known tracked registries", () => {
  const materialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const storageLocationIds = new Set(Object.keys(storage.DATA_LOCATION_REGISTRY));
  const rawMaterialRoutingControlIds = new Set(
    Object.values(rmr.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY).map(
      (entry) => entry.control_id,
    ),
  );
  const tprGapIds = new Set(
    Object.values(tpr.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY).map(
      (entry) => entry.id,
    ),
  );
  const eventIds = new Set(Object.keys(aal.AUDIT_ACCESS_LOG_EVENT_CANDIDATES));
  const lifecycleFamilies = new Set(
    Object.values(lifecycle.LIFECYCLE_CONTROL_FAMILIES),
  );

  for (const gap of adminSupport.listAdminSupportRuntimeReadinessStatusGaps()) {
    for (const material of gap.related_material_classes) {
      assert.equal(materialClasses.has(material), true, material);
    }

    for (const location of gap.related_storage_location_ids) {
      assert.equal(storageLocationIds.has(location), true, location);
    }

    for (const control of gap.related_raw_material_routing_control_ids) {
      assert.equal(rawMaterialRoutingControlIds.has(control), true, control);
    }

    for (const relatedGap of gap.related_tpr_status_gap_ids) {
      assert.equal(tprGapIds.has(relatedGap), true, relatedGap);
    }

    for (const eventId of gap.related_aal_event_candidate_ids) {
      assert.equal(eventIds.has(eventId), true, eventId);
    }

    for (const family of gap.related_lifecycle_families) {
      assert.equal(lifecycleFamilies.has(family), true, family);
    }
  }
});

test("admin/support cannot authorize high-risk material or provider routes", () => {
  const deniedMaterialClasses = new Set(
    Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (entry) => entry.material_class,
    ),
  );
  const highRiskGaps = adminSupport
    .listAdminSupportRuntimeReadinessStatusGaps()
    .filter((gap) =>
      gap.related_material_classes.some((material) =>
        deniedMaterialClasses.has(material),
      ),
    );
  const coveredDeniedMaterialClasses = new Set(
    highRiskGaps.flatMap((gap) =>
      gap.related_material_classes.filter((material) =>
        deniedMaterialClasses.has(material),
      ),
    ),
  );

  assert.ok(highRiskGaps.length >= 4);
  assert.deepEqual(coveredDeniedMaterialClasses, deniedMaterialClasses);

  for (const gap of highRiskGaps) {
    assert.equal(gap.current_authorization_status, "NOT_AUTHORIZED");
    assert.equal(
      adminSupport.isAdminSupportRuntimeAccessAuthorized(gap.id),
      false,
    );
    assertNoPositiveClaims(
      adminSupport.classifyAdminSupportRuntimeReadinessStatusGap(gap.id),
    );
  }

  const thirdPartyGap =
    adminSupport.getAdminSupportRuntimeReadinessStatusGap(
      "ADMIN-SUPPORT-GAP-008_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_DENIED",
    );
  assert.equal(thirdPartyGap.non_authorizations.provider_routing_authorized, false);
  assert.equal(thirdPartyGap.non_authorizations.external_use_authorized, false);
});

test("unknown admin/support status-gap lookups fail closed", () => {
  const unknownId = "ADMIN-SUPPORT-GAP-999_UNKNOWN";

  assert.equal(
    adminSupport.hasAdminSupportRuntimeReadinessStatusGap(unknownId),
    false,
  );
  assert.doesNotThrow(() =>
    adminSupport.getAdminSupportRuntimeReadinessStatusGap(unknownId),
  );
  assert.doesNotThrow(() =>
    adminSupport.classifyAdminSupportRuntimeReadinessStatusGap(unknownId),
  );
  assert.equal(
    adminSupport.isAdminSupportRuntimeAccessAuthorized(unknownId),
    false,
  );

  const unknown =
    adminSupport.getAdminSupportRuntimeReadinessStatusGap(unknownId);
  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.current_authorization_status, "UNKNOWN_NOT_EVIDENCED");
  assert.deepEqual(unknown.current_statuses, ["UNKNOWN_NOT_EVIDENCED"]);
  assertNoPositiveClaims(unknown);
});

test("helpers preserve non-overclaim prerequisites and global non-authorization", () => {
  assert.equal(adminSupport.isAdminSupportRuntimeAccessImplemented(), false);
  assertNoPositiveClaims(
    adminSupport.getAdminSupportRuntimeReadinessNonAuthorizationStatus(),
  );
  assert.equal(
    adminSupport
      .getAdminSupportRuntimeReadinessNonAuthorizationStatus()
      .implementation_statuses.includes("NOT_ADMIN_SUPPORT_MODEL"),
    true,
  );

  for (const phrase of [
    "ADMIN_SUPPORT_STATUS_GAP does not mean ADMIN_SUPPORT_RUNTIME_ACCESS_IMPLEMENTATION",
    "ADMIN_SUPPORT_MODEL_GAP does not mean ADMIN_SUPPORT_MODEL_CREATED",
    "ADMIN_SUPPORT_ROUTE_GAP does not mean ADMIN_SUPPORT_ROUTES_CREATED",
    "ADMIN_SUPPORT_AUTH_FIELD_GAP does not mean ADMIN_SUPPORT_AUTH_FIELDS_CREATED",
    "ADMIN_SUPPORT_DB_FIELD_GAP does not mean ADMIN_SUPPORT_DB_FIELDS_CREATED",
    "LOG_VIEWER_RBAC_GAP does not mean LOG_VIEWER_RBAC_CREATED",
    "STATUS_GAP_ROW does not mean RUNTIME_ENFORCEMENT",
    "BYPASS_PREVENTION_GAP does not mean ACCESS_CONTROL_ENFORCED",
    "SUPPORT_TENANT_CASE_OVERRIDE_GAP does not mean TENANT_OVERRIDE_AUTHORIZED",
    "SUPPORT_WRONG_CASE_WRONG_TENANT_ACCESS_GAP does not mean CROSS_CASE_ACCESS_AUTHORIZED",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean ACCESS_AUTHORIZATION",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean RAW_PRIVATE_SOURCE_ACCESS",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean SOURCE_PACKAGE_ACCESS",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean PDF_IMAGE_SCREENSHOT_METADATA_ACCESS",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean THIRD_PARTY_ROUTE_APPROVAL",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean LIFECYCLE_EXECUTION",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean PROVIDER_ROUTING_AUTHORIZATION",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean RELEASE_APPROVAL",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean EXTERNAL_USE_AUTHORIZATION",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean PRODUCT_CANDIDATE_SELECTION",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean RUNTIME_CERTIFICATION",
    "ADMIN_SUPPORT_RUNTIME_READINESS does not mean TECHNICAL_SIGNOFF",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED does not mean SYSTEM_APPROVAL",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "CI_LOG does not mean RELEASE_EVIDENCE",
  ]) {
    assert.ok(
      adminSupport
        .listAdminSupportRuntimeReadinessNonOverclaimRules()
        .includes(phrase),
    );
  }

  for (const prerequisite of [
    "admin/support actor model",
    "admin/support runtime route inventory",
    "admin/support authentication fields",
    "admin/support persisted authorization fields",
    "admin/support allowed/denied tests",
    "bypass-prevention tests",
    "RBAC/access-control implementation",
    "admin/support no-bypass model",
    "log viewer RBAC model",
    "audit/access-log implementation",
    "log schema/storage policy",
    "storage/data-location implementation boundary",
    "retention/deletion/purge/erasure execution policy",
    "raw-material routing denial policy",
    "third-party provider routing policy",
    "third-party provider route denial tests",
    "no-raw/no-private/no-source-locator policy",
    "provider identity/status registry",
    "provider data-routing map",
    "tenant/case/capability evidence model",
    "human/professional review policy",
    "release/external-use/product authorization policy",
    "CI test plan",
    "external-use non-authorization wording",
    "non-proof/non-route-readiness wording",
    "global access-control threat model",
    "CI evidence boundary",
  ]) {
    assert.ok(
      adminSupport
        .getAdminSupportRuntimeReadinessRequiredPrerequisites()
        .includes(prerequisite),
    );
  }
});

test("storage evidence and admin/support approval boundaries remain non-authorizing", () => {
  const logViewerGap =
    adminSupport.getAdminSupportRuntimeReadinessStatusGap(
      "ADMIN-SUPPORT-GAP-007_ADMIN_SUPPORT_LOG_VIEWER_RBAC_ABSENT",
    );
  const thirdPartyGap =
    adminSupport.getAdminSupportRuntimeReadinessStatusGap(
      "ADMIN-SUPPORT-GAP-008_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_DENIED",
    );
  const exportGap =
    adminSupport.getAdminSupportRuntimeReadinessStatusGap(
      "ADMIN-SUPPORT-GAP-011_ADMIN_SUPPORT_EXPORT_PACKET_DELIVERY_DENIED",
    );
  const releaseGap =
    adminSupport.getAdminSupportRuntimeReadinessStatusGap(
      "ADMIN-SUPPORT-GAP-012_ADMIN_SUPPORT_RELEASE_EXTERNAL_USE_PRODUCT_DENIED",
    );

  assert.ok(
    logViewerGap.related_storage_location_ids.includes(
      "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
    ),
  );
  assert.ok(
    thirdPartyGap.related_storage_location_ids.includes(
      "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
    ),
  );
  assert.ok(
    thirdPartyGap.related_storage_location_ids.includes(
      "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
    ),
  );
  assert.ok(
    exportGap.related_storage_location_ids.includes(
      "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
    ),
  );

  assert.equal(
    storage.DATA_LOCATION_REGISTRY.L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE.status,
    "FUTURE_RUNTIME_CANDIDATE",
  );
  assert.equal(
    storage.DATA_LOCATION_REGISTRY.L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE
      .implementation_statuses.includes("NOT_AUDIT_LOG_STORAGE"),
    true,
  );
  assert.equal(
    storage.DATA_LOCATION_REGISTRY.L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE
      .non_authorizations.provider_routing_authorized,
    false,
  );
  assert.equal(
    storage.DATA_LOCATION_REGISTRY.L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE
      .non_authorizations.authorized,
    false,
  );

  assert.equal(
    logViewerGap.non_authorizations.log_viewer_rbac_created,
    false,
  );
  assert.equal(
    thirdPartyGap.non_authorizations.provider_routing_authorized,
    false,
  );
  assert.equal(exportGap.non_authorizations.release_approved, false);
  assert.equal(exportGap.non_authorizations.external_use_authorized, false);
  assert.equal(releaseGap.non_authorizations.release_approved, false);
  assert.equal(releaseGap.non_authorizations.product_candidate_authorized, false);
  assert.equal(releaseGap.non_authorizations.system_approval_created, false);
});

test("registry entries are frozen and returned as copy-safe data", () => {
  const id = expectedGapIds[0];
  const first = adminSupport.getAdminSupportRuntimeReadinessStatusGap(id);
  const second = adminSupport.getAdminSupportRuntimeReadinessStatusGap(id);

  assert.notEqual(first, second);
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.related_material_classes), true);
  assert.throws(() => {
    first.related_material_classes.push("MUTATION");
  }, TypeError);
  assert.deepEqual(second.related_material_classes, [
    "HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
  ]);
});

test("index export wiring exposes admin/support helpers without side effects", () => {
  assert.equal(
    governance.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
    adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
  );
  assert.deepEqual(
    governance
      .listAdminSupportRuntimeReadinessStatusGaps()
      .map((entry) => entry.id),
    expectedGapIds,
  );
  assert.equal(governance.isAdminSupportRuntimeAccessImplemented(), false);
  assert.equal(
    governance.isAdminSupportRuntimeAccessAuthorized(expectedGapIds[0]),
    false,
  );
});
