"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const governance = require("../packages/governance/src/index.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const rde = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const aal = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const rmr = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const tpr = require("../packages/governance/src/third-party-routing-status-gap-registry.js");

const expectedFamilies = [
  "THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS",
  "PROVIDER_IDENTITY_STATUS_GAP",
  "PROVIDER_DATA_ROUTING_MAP_GAP",
  "PROVIDER_RETENTION_DELETION_POSTURE_GAP",
  "PROVIDER_AUDITABILITY_LOGGING_GAP",
  "PROVIDER_TOKEN_URL_SECRET_HANDLING_GAP",
  "RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP",
  "PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP",
  "GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP",
  "ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP",
  "WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_GAP",
  "RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_GAP",
  "HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_GAP",
];

const expectedImplementationStatuses = [
  "NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
  "NOT_THIRD_PARTY_MODEL_API_ROUTING_AUTHORIZATION",
  "NOT_PROVIDER_ROUTING_AUTHORIZATION",
  "NOT_PROVIDER_INTEGRATION",
  "NOT_PROVIDER_REGISTRY",
  "NOT_PROVIDER_STATUS_IMPLEMENTATION",
  "NOT_DATA_ROUTING_MAP",
  "NOT_PROVIDER_RETENTION_DELETION_POSTURE",
  "NOT_PROVIDER_AUDITABILITY",
  "NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING",
  "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
  "NOT_RETENTION_DELETION_IMPLEMENTATION",
  "NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
  "NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
  "NOT_RUNTIME_ROUTE_ENFORCEMENT",
  "NOT_EXTERNAL_USE",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedDecisionStatuses = [
  "DOCS_ONLY_STATUS_GAP",
  "REGISTRY_SCAFFOLD_ONLY",
  "DENY_BY_DEFAULT",
  "STATUS_GAP_ONLY",
  "ROUTE_CANDIDATE_ONLY",
  "NOT_ROUTED",
  "NOT_AUTHORIZED",
  "BLOCKED_BY_PROVIDER_STATUS",
  "BLOCKED_BY_DATA_ROUTING_MAP",
  "BLOCKED_BY_PROVIDER_RETENTION_DELETION",
  "BLOCKED_BY_PROVIDER_AUDITABILITY",
  "BLOCKED_BY_TOKEN_URL_SECRET_HANDLING",
  "BLOCKED_BY_RBAC_ACCESS_CONTROL",
  "BLOCKED_BY_AUDIT_ACCESS_LOG",
  "BLOCKED_BY_RETENTION_DELETION",
  "BLOCKED_BY_RAW_MATERIAL_ROUTING",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedGapIds = [
  "TPR-STATUS-GAP-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST_STATUS",
  "TPR-STATUS-GAP-002_PROVIDER_IDENTITY_STATUS_GAP",
  "TPR-STATUS-GAP-003_PROVIDER_DATA_ROUTING_MAP_GAP",
  "TPR-STATUS-GAP-004_PROVIDER_RETENTION_DELETION_POSTURE_GAP",
  "TPR-STATUS-GAP-005_PROVIDER_AUDITABILITY_LOGGING_GAP",
  "TPR-STATUS-GAP-006_PROVIDER_TOKEN_URL_SECRET_HANDLING_GAP",
  "TPR-STATUS-GAP-007_RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP",
  "TPR-STATUS-GAP-008_PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP",
  "TPR-STATUS-GAP-009_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP",
  "TPR-STATUS-GAP-010_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP",
  "TPR-STATUS-GAP-011_WORKFLOW_AGENT_TOOL_PROVIDER_ROUTE_GAP",
  "TPR-STATUS-GAP-012_RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_GAP",
  "TPR-STATUS-GAP-013_HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_GAP",
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
  "future_boundary_posture",
  "non_authorized_until_closure",
  "related_material_classes",
  "related_storage_location_ids",
  "related_raw_material_routing_control_ids",
  "related_aal_event_candidate_ids",
  "related_lifecycle_families",
  "related_rbac_boundary_status",
  "evidence_posture",
  "non_authorizations",
  "notes",
];

const positiveClaimKeys = [
  "authorized",
  "route_authorized",
  "routed",
  "third_party_routing_authorized",
  "provider_routing_authorized",
  "provider_integration_created",
  "provider_registry_created",
  "provider_status_implemented",
  "data_routing_map_created",
  "token_url_secret_handling_implemented",
  "raw_material_routing_implemented",
  "metadata_acquisition_authorized",
  "audit_access_log_implemented",
  "retention_deletion_implemented",
  "rbac_access_control_implemented",
  "release_approved",
  "external_use_authorized",
  "product_candidate_authorized",
  "runtime_certification_created",
  "technical_signoff_created",
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

test("third-party routing status/gap families and statuses exist", () => {
  assert.deepEqual(tpr.listThirdPartyRoutingStatusGapFamilies(), expectedFamilies);
  assert.deepEqual(
    Object.values(tpr.THIRD_PARTY_ROUTING_IMPLEMENTATION_STATUS),
    expectedImplementationStatuses,
  );
  assert.deepEqual(
    Object.values(tpr.THIRD_PARTY_ROUTING_DECISION_STATUS),
    expectedDecisionStatuses,
  );
  assert.deepEqual(Object.values(tpr.THIRD_PARTY_ROUTING_EVIDENCE_POSTURE), [
    "DOCS_ONLY_STATUS_GAP",
    "REGISTRY_SCAFFOLD_EVIDENCE",
    "TESTED_ALIGNMENT_EVIDENCE",
    "CI_TESTED_SCENARIO_EVIDENCE",
    "FUTURE_CANDIDATE_ONLY",
    "UNKNOWN_NOT_EVIDENCED",
  ]);
});

test("status/gap registry exposes exact deterministic rows and required fields", () => {
  assert.deepEqual(
    tpr.listThirdPartyRoutingStatusGaps().map((entry) => entry.id),
    expectedGapIds,
  );
  assert.deepEqual(
    Object.keys(tpr.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY),
    expectedGapIds,
  );

  for (const gap of tpr.listThirdPartyRoutingStatusGaps()) {
    for (const field of requiredFields) {
      assert.ok(field in gap, `${gap.id} missing ${field}`);
    }

    assert.equal(tpr.hasThirdPartyRoutingStatusGap(gap.id), true);
    assert.equal(gap.non_authorized_until_closure, true);
    assert.equal(gap.current_authorization_status, "NOT_AUTHORIZED");
    assert.equal(tpr.isThirdPartyRouteAuthorized(gap.id), false);
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
  const eventIds = new Set(Object.keys(aal.AUDIT_ACCESS_LOG_EVENT_CANDIDATES));
  const lifecycleFamilies = new Set(Object.values(rde.LIFECYCLE_CONTROL_FAMILIES));

  for (const gap of tpr.listThirdPartyRoutingStatusGaps()) {
    for (const materialClass of gap.related_material_classes) {
      assert.equal(materialClasses.has(materialClass), true, materialClass);
    }

    for (const locationId of gap.related_storage_location_ids) {
      assert.equal(storageLocationIds.has(locationId), true, locationId);
    }

    for (const controlId of gap.related_raw_material_routing_control_ids) {
      assert.equal(rawMaterialRoutingControlIds.has(controlId), true, controlId);
    }

    for (const eventId of gap.related_aal_event_candidate_ids) {
      assert.equal(eventIds.has(eventId), true, eventId);
    }

    for (const family of gap.related_lifecycle_families) {
      assert.equal(lifecycleFamilies.has(family), true, family);
    }
  }
});

test("high-risk material classes remain denied and not authorized", () => {
  const deniedMaterialClasses = new Set(
    Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (entry) => entry.material_class,
    ),
  );
  const gapsWithHighRiskMaterial = tpr
    .listThirdPartyRoutingStatusGaps()
    .filter((gap) =>
      gap.related_material_classes.some((materialClass) =>
        deniedMaterialClasses.has(materialClass),
      ),
    );

  assert.ok(gapsWithHighRiskMaterial.length >= 8);

  for (const gap of gapsWithHighRiskMaterial) {
    assert.equal(gap.current_authorization_status, "NOT_AUTHORIZED");
    assert.equal(tpr.isThirdPartyRouteAuthorized(gap.id), false);
    assertNoPositiveClaims(tpr.classifyThirdPartyRoutingStatusGap(gap.id));
  }
});

test("unknown status/gap lookups fail closed without throwing", () => {
  const unknownId = "TPR-STATUS-GAP-999_UNKNOWN";

  assert.equal(tpr.hasThirdPartyRoutingStatusGap(unknownId), false);
  assert.doesNotThrow(() => tpr.getThirdPartyRoutingStatusGap(unknownId));
  assert.doesNotThrow(() => tpr.classifyThirdPartyRoutingStatusGap(unknownId));
  assert.equal(tpr.isThirdPartyRouteAuthorized(unknownId), false);

  const unknown = tpr.getThirdPartyRoutingStatusGap(unknownId);
  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.current_authorization_status, "UNKNOWN_NOT_EVIDENCED");
  assert.deepEqual(unknown.current_statuses, ["UNKNOWN_NOT_EVIDENCED"]);
  assertNoPositiveClaims(unknown);
});

test("helpers preserve non-overclaim prerequisites and global non-authorization", () => {
  assert.equal(tpr.isThirdPartyRoutingImplemented(), false);
  assertNoPositiveClaims(tpr.getThirdPartyRoutingNonAuthorizationStatus());
  assert.equal(
    tpr
      .getThirdPartyRoutingNonAuthorizationStatus()
      .implementation_statuses.includes("NOT_PROVIDER_INTEGRATION"),
    true,
  );

  for (const phrase of [
    "THIRD_PARTY_ROUTING_STATUS_GAP does not mean THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "STATUS_GAP_ROW does not mean ROUTE_AUTHORIZATION",
    "PROVIDER_IDENTITY_STATUS_GAP does not mean PROVIDER_REGISTRY_CREATED",
    "PROVIDER_STATUS_GAP does not mean PROVIDER_STATUS_IMPLEMENTATION",
    "DATA_ROUTING_MAP_GAP does not mean DATA_ROUTING_MAP_CREATED",
    "PROVIDER_RETENTION_DELETION_GAP does not mean PROVIDER_RETENTION_DELETION_IMPLEMENTED",
    "PROVIDER_AUDITABILITY_GAP does not mean AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "TOKEN_URL_SECRET_HANDLING_GAP does not mean TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP does not mean RAW_PRIVATE_SOURCE_ROUTE_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP does not mean METADATA_ACQUISITION_AUTHORIZED",
    "GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP does not mean EXTERNAL_USE_AUTHORIZATION",
    "ADMIN_SUPPORT_ROUTE_APPROVAL_GAP does not mean ADMIN_SUPPORT_ROUTE_APPROVAL_AUTHORIZED",
    "HUMAN_REVIEW_PROVIDER_DEPENDENCY does not mean SYSTEM_APPROVAL",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "CI_LOG does not mean RELEASE_EVIDENCE",
  ]) {
    assert.ok(tpr.listThirdPartyRoutingNonOverclaimRules().includes(phrase));
  }

  for (const prerequisite of [
    "provider identity/status registry",
    "provider status semantics",
    "provider data-routing map",
    "provider retention/deletion posture",
    "provider auditability posture",
    "provider token/URL/secret handling policy",
    "material-class routing policy",
    "raw-material routing denial policy",
    "no-raw/no-private/no-source-locator/no-token/no-URL policy",
    "RBAC/access-control model",
    "admin/support no-bypass model",
    "audit/access-log model",
    "no-content route event policy",
    "retention/deletion/purge/erasure policy",
    "encryption/key-management policy",
    "CI test plan",
    "provider route denial tests",
    "external-use non-authorization wording",
    "non-proof/non-route-readiness wording",
  ]) {
    assert.ok(tpr.getThirdPartyRoutingRequiredPrerequisites().includes(prerequisite));
  }
});

test("storage and review boundaries remain future/not authorized where referenced", () => {
  const providerStorageGaps = tpr.listThirdPartyRoutingStatusGaps().filter((gap) =>
    gap.related_storage_location_ids.includes(
      "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
    ),
  );
  const recipientStorageGaps = tpr.listThirdPartyRoutingStatusGaps().filter((gap) =>
    gap.related_storage_location_ids.includes(
      "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
    ),
  );
  const exportGap = tpr.getThirdPartyRoutingStatusGap(
    "TPR-STATUS-GAP-009_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP",
  );
  const humanReviewGap = tpr.getThirdPartyRoutingStatusGap(
    "TPR-STATUS-GAP-013_HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_GAP",
  );

  assert.ok(providerStorageGaps.length >= 7);
  assert.equal(recipientStorageGaps.length, 1);
  assert.equal(exportGap.non_authorizations.external_use_authorized, false);
  assert.equal(humanReviewGap.non_authorizations.authorized, false);
  assert.equal(
    humanReviewGap.related_rbac_boundary_status,
    "HUMAN_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL",
  );
});

test("registry entries are frozen and returned as copy-safe data", () => {
  const id = expectedGapIds[0];
  const first = tpr.getThirdPartyRoutingStatusGap(id);
  const second = tpr.getThirdPartyRoutingStatusGap(id);

  assert.notEqual(first, second);
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.related_material_classes), true);
  assert.throws(() => {
    first.related_material_classes.push("MUTATION");
  }, TypeError);
  assert.deepEqual(second.related_material_classes, [
    "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    "PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL",
  ]);
});

test("index export wiring exposes TPR helpers without side effects", () => {
  assert.equal(
    governance.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
    tpr.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
  );
  assert.deepEqual(
    governance.listThirdPartyRoutingStatusGaps().map((entry) => entry.id),
    expectedGapIds,
  );
  assert.equal(governance.isThirdPartyRoutingImplemented(), false);
  assert.equal(governance.isThirdPartyRouteAuthorized(expectedGapIds[0]), false);
});
