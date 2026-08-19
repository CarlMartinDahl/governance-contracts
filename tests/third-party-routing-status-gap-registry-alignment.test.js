"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const tpr = require("../packages/governance/src/third-party-routing-status-gap-registry.js");
const rmr = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const rde = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const aal = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const rbac = require("../packages/governance/src/rbac-role-permission-deny-by-default-scaffold.js");

const repoRoot = path.resolve(__dirname, "..");
const statusGapDoc = fs.readFileSync(
  path.join(
    repoRoot,
    "docs/DOMAIN_CONTRACTS_THIRD_PARTY_ROUTING_RUNTIME_READINESS_STATUS_GAP_SUMMARY_AFTER_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  ),
  "utf8",
);
const blockerDoc = fs.readFileSync(
  path.join(
    repoRoot,
    "docs/DOMAIN_CONTRACTS_THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  ),
  "utf8",
);
const rawMaterialRoutingDoc = fs.readFileSync(
  path.join(
    repoRoot,
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  ),
  "utf8",
);

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
  "metadata_acquired",
  "source_package_inspected",
  "pdf_image_screenshot_metadata_inspected",
  "provider_retention_deletion_posture_implemented",
  "provider_auditability_implemented",
  "provider_auditability_evidenced",
  "provider_deletion_verified",
  "recipient_purge_verified",
  "provider_integration_implemented",
  "provider_registry_implemented",
  "audit_access_log_implemented",
  "retention_deletion_implemented",
  "rbac_access_control_implemented",
  "release_approved",
  "external_use_authorized",
  "product_candidate_authorized",
  "runtime_certification_created",
  "technical_signoff_created",
];

function shortGapId(id) {
  return id.match(/^TPR-STATUS-GAP-\d{3}/)[0];
}

function docSurface(surface) {
  return surface.replace("workflow/agent/tool", "workflow agent/tool");
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
    if (positiveClaimKeys.includes(key)) {
      assert.equal(item, false, `${key} must remain false`);
    }
    assertNoPositiveClaims(item, seen);
  }
}

function assertDocContainsAll(doc, phrases) {
  for (const phrase of phrases) {
    assert.match(doc, new RegExp(escapeRegExp(phrase), "i"), phrase);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("TPR status/gap registry rows align with tracked status/gap docs", () => {
  const gaps = tpr.listThirdPartyRoutingStatusGaps();

  assert.deepEqual(
    gaps.map((gap) => gap.id),
    expectedGapIds,
  );
  assert.deepEqual(Object.keys(tpr.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY), expectedGapIds);

  for (const gap of gaps) {
    const docId = shortGapId(gap.id);

    assert.match(statusGapDoc, new RegExp(`\\\`${docId}\\\``));
    assert.match(
      statusGapDoc,
      new RegExp(escapeRegExp(docSurface(gap.surface)), "i"),
    );

    for (const field of requiredFields) {
      assert.ok(field in gap, `${gap.id} missing ${field}`);
    }
  }
});

test("TPR rows reference only known tracked registry constants", () => {
  const materialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const storageLocationIds = new Set(Object.keys(storage.DATA_LOCATION_REGISTRY));
  const rawMaterialRoutingControlIds = new Set(
    Object.values(rmr.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY).map(
      (entry) => entry.control_id,
    ),
  );
  const aalEventIds = new Set(Object.keys(aal.AUDIT_ACCESS_LOG_EVENT_CANDIDATES));
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
      assert.equal(aalEventIds.has(eventId), true, eventId);
    }
    for (const family of gap.related_lifecycle_families) {
      assert.equal(lifecycleFamilies.has(family), true, family);
    }
  }
});

test("high-risk material classes and unknown TPR gaps remain fail closed", () => {
  const deniedMaterialClasses = new Set(
    Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (entry) => entry.material_class,
    ),
  );
  const highRiskGaps = tpr
    .listThirdPartyRoutingStatusGaps()
    .filter((gap) =>
      gap.related_material_classes.some((materialClass) =>
        deniedMaterialClasses.has(materialClass),
      ),
    );

  assert.ok(highRiskGaps.length >= 8);

  for (const gap of highRiskGaps) {
    assert.equal(gap.current_authorization_status, "NOT_AUTHORIZED");
    assert.equal(gap.non_authorized_until_closure, true);
    assert.equal(tpr.isThirdPartyRouteAuthorized(gap.id), false);
    assertNoPositiveClaims(gap);
    assertNoPositiveClaims(tpr.classifyThirdPartyRoutingStatusGap(gap.id));
  }

  const unknown = tpr.getThirdPartyRoutingStatusGap("TPR-STATUS-GAP-999_UNKNOWN");
  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.current_authorization_status, "UNKNOWN_NOT_EVIDENCED");
  assert.deepEqual(unknown.current_statuses, ["UNKNOWN_NOT_EVIDENCED"]);
  assert.equal(
    tpr.classifyThirdPartyRoutingStatusGap("TPR-STATUS-GAP-999_UNKNOWN")
      .decision_status,
    "UNKNOWN_NOT_EVIDENCED",
  );
  assert.equal(tpr.isThirdPartyRouteAuthorized("TPR-STATUS-GAP-999_UNKNOWN"), false);
  assertNoPositiveClaims(unknown);
});

test("TPR helper status remains globally non-implementing and non-authorizing", () => {
  const status = tpr.getThirdPartyRoutingNonAuthorizationStatus();

  assert.equal(tpr.isThirdPartyRoutingImplemented(), false);
  assert.equal(tpr.isThirdPartyRouteAuthorized(expectedGapIds[0]), false);
  assert.equal(status.third_party_routing_implemented, false);
  assert.ok(status.implementation_statuses.includes("NOT_PROVIDER_INTEGRATION"));
  assert.ok(status.implementation_statuses.includes("NOT_PROVIDER_REGISTRY"));
  assert.ok(
    status.implementation_statuses.includes(
      "NOT_PROVIDER_STATUS_IMPLEMENTATION",
    ),
  );
  assert.ok(status.implementation_statuses.includes("NOT_DATA_ROUTING_MAP"));
  assert.ok(
    status.implementation_statuses.includes(
      "NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING",
    ),
  );
  assert.ok(
    status.implementation_statuses.includes(
      "NOT_PROVIDER_RETENTION_DELETION_POSTURE",
    ),
  );
  assert.ok(status.implementation_statuses.includes("NOT_PROVIDER_AUDITABILITY"));
  assertNoPositiveClaims(status);
});

test("material-specific TPR gaps preserve route and review non-authorizations", () => {
  const rawPrivateGap = tpr.getThirdPartyRoutingStatusGap(
    "TPR-STATUS-GAP-007_RAW_PRIVATE_SOURCE_ROUTE_ATTEMPT_GAP",
  );
  const metadataGap = tpr.getThirdPartyRoutingStatusGap(
    "TPR-STATUS-GAP-008_PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_ATTEMPT_GAP",
  );
  const exportGap = tpr.getThirdPartyRoutingStatusGap(
    "TPR-STATUS-GAP-009_GENERATED_EXPORT_ARTIFACT_ROUTE_ATTEMPT_GAP",
  );
  const adminSupportGap = tpr.getThirdPartyRoutingStatusGap(
    "TPR-STATUS-GAP-010_ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_GAP",
  );
  const humanReviewGap = tpr.getThirdPartyRoutingStatusGap(
    "TPR-STATUS-GAP-013_HUMAN_PROFESSIONAL_REVIEW_PROVIDER_ROUTE_DEPENDENCY_GAP",
  );

  assert.equal(rawPrivateGap.non_authorizations.authorized, false);
  assert.equal(rawPrivateGap.non_authorizations.routed, false);
  assert.match(rawPrivateGap.notes, /not inspected, routed, or external use/i);

  assert.equal(metadataGap.non_authorizations.metadata_acquisition_authorized, false);
  assert.equal(metadataGap.non_authorizations.routed, false);
  assert.match(metadataGap.surface, /PDF\/image\/screenshot\/metadata/);

  assert.equal(exportGap.non_authorizations.external_use_authorized, false);
  assert.match(exportGap.overclaim_risk, /external-use/i);

  assert.equal(adminSupportGap.non_authorizations.provider_routing_authorized, false);
  assert.equal(
    adminSupportGap.related_rbac_boundary_status,
    "ADMIN_SUPPORT_CANNOT_APPROVE_PROVIDER_ROUTE",
  );

  assert.equal(humanReviewGap.non_authorizations.authorized, false);
  assert.equal(
    humanReviewGap.related_rbac_boundary_status,
    "HUMAN_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL",
  );
});

test("provider and recipient storage references remain future and not authorized", () => {
  const providerGaps = tpr.listThirdPartyRoutingStatusGaps().filter((gap) =>
    gap.related_storage_location_ids.includes(
      "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
    ),
  );
  const recipientGaps = tpr.listThirdPartyRoutingStatusGaps().filter((gap) =>
    gap.related_storage_location_ids.includes(
      "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
    ),
  );

  assert.ok(providerGaps.length >= 7);
  assert.equal(recipientGaps.length, 1);
  assert.equal(
    storage.DATA_LOCATION_REGISTRY.L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE
      .non_authorizations.authorized,
    false,
  );
  assert.ok(
    storage.DATA_LOCATION_REGISTRY.L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE
      .implementation_statuses.includes("NOT_STORAGE_IMPLEMENTATION"),
  );
  assert.equal(
    storage.DATA_LOCATION_REGISTRY.L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE
      .non_authorizations.authorized,
    false,
  );
  assert.ok(
    storage.DATA_LOCATION_REGISTRY.L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE
      .implementation_statuses.includes("NOT_STORAGE_IMPLEMENTATION"),
  );
});

test("non-overclaim rules and prerequisites remain aligned with docs", () => {
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

test("tracked docs preserve DOCS_ONLY status-gap and no-runtime route posture", () => {
  assertDocContainsAll(statusGapDoc, [
    "DOCS_ONLY",
    "THIRD_PARTY_ROUTING_RUNTIME_READINESS_STATUS_GAP_SUMMARY_AFTER_BLOCKER_ANALYSIS_ONLY",
    "This boundary creates no third-party routing implementation",
    "no route authorization",
    "no third-party model/API routing authorization",
    "no provider integration",
    "no provider registry",
    "no provider status implementation",
    "no data-routing map implementation",
    "no token/URL/secret handling implementation",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "DOCS_ONLY boundaries are not runtime enforcement",
  ]);

  assertDocContainsAll(blockerDoc, [
    "DOCS_ONLY",
    "THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_ONLY",
    "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
    "PROVIDER_TOKEN_URL_SECRET_HANDLING_UNRESOLVED",
    "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
    "PDF_IMAGE_SCREENSHOT_METADATA_NOT_INSPECTED",
    "METADATA_NOT_ACQUIRED",
    "Local logs remain not CI evidence",
  ]);

  assertDocContainsAll(rawMaterialRoutingDoc, [
    "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    "PDF_IMAGE_SCREENSHOT_METADATA_NOT_INSPECTED",
    "METADATA_NOT_ACQUIRED",
    "local logs are not CI evidence",
    "external-use remains unauthorized",
  ]);
});

test("helper outputs across referenced registries preserve non-authorization claims", () => {
  const helperOutputs = [
    tpr.listThirdPartyRoutingStatusGaps(),
    tpr.getThirdPartyRoutingStatusGap(expectedGapIds[0]),
    tpr.classifyThirdPartyRoutingStatusGap(expectedGapIds[1]),
    tpr.getThirdPartyRoutingNonAuthorizationStatus(),
    tpr.listThirdPartyRoutingNonOverclaimRules(),
    tpr.getThirdPartyRoutingRequiredPrerequisites(),
    rmr.listRawMaterialRoutingControls(),
    rmr.getRawMaterialRoutingNonAuthorizationStatus(),
    storage.listDataLocations(),
    storage.getStorageRegistryNonAuthorizationStatus(),
    rde.listLifecycleActionCandidates(),
    rde.getRdeNonAuthorizationStatus(),
    aal.listAuditAccessLogEventCandidates(),
    aal.getAalNonAuthorizationStatus(),
    rbac.deriveRbacDenyByDefaultAccessDecision({}),
    rbac.deriveAdminSupportNonBypassDecision({}),
    rbac.evaluateRouteCaseCapabilityNonOverclaim({}),
  ];

  for (const output of helperOutputs) {
    assertNoPositiveClaims(output);
  }
});
