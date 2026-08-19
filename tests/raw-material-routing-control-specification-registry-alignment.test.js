"use strict";

const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const {
  DATA_LOCATION_REGISTRY,
  EVIDENCE_POSTURE,
  HIGH_RISK_MATERIAL_CLASSES_DENIED,
  MATERIAL_CLASSES,
} = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const {
  AUDIT_ACCESS_LOG_EVENT_CANDIDATES,
} = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const {
  LIFECYCLE_CONTROL_FAMILIES,
} = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const {
  deriveRbacDenyByDefaultAccessDecision,
} = require("../packages/governance/src/rbac-role-permission-deny-by-default-scaffold.js");
const {
  RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
  classifyRawMaterialRoutingControl,
  getRawMaterialRoutingNonAuthorizationStatus,
  getRawMaterialRoutingRequiredPrerequisites,
  isRawMaterialRouteAuthorized,
  isRawMaterialRoutingImplemented,
  listRawMaterialRoutingControls,
  listRawMaterialRoutingNonOverclaimRules,
} = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");

const repoRoot = path.resolve(__dirname, "..");
const controlSpecDoc = readFileSync(
  path.join(
    repoRoot,
    "docs",
    "DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  ),
  "utf8",
);
const feasibilityMatrixDoc = readFileSync(
  path.join(
    repoRoot,
    "docs",
    "DOMAIN_CONTRACTS_SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY_v1.md",
  ),
  "utf8",
);
const thirdPartyBlockerDoc = readFileSync(
  path.join(
    repoRoot,
    "docs",
    "DOMAIN_CONTRACTS_THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  ),
  "utf8",
);

const docsCorpus = [
  controlSpecDoc,
  feasibilityMatrixDoc,
  thirdPartyBlockerDoc,
].join("\n");

const expectedControls = Object.freeze([
  ["RMR-CS-001", "SANITIZED_TEXT_PRIMARY_MATERIAL"],
  ["RMR-CS-002", "REDACTED_REVIEW_SIGNAL_MATERIAL"],
  ["RMR-CS-003", "NO_RAW_METADATA_MANIFEST_MATERIAL"],
  ["RMR-CS-004", "GENERATED_ARTIFACT_OR_EXPORT_MATERIAL"],
  ["RMR-CS-005", "LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL"],
  ["RMR-CS-006", "RAW_PRIVATE_SOURCE_MATERIAL"],
  ["RMR-CS-007", "SOURCE_PACKAGE_MATERIAL"],
  ["RMR-CS-008", "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL"],
  ["RMR-CS-009", "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL"],
  ["RMR-CS-010", "HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL"],
]);

const requiredControlFields = Object.freeze([
  "control_id",
  "material_class",
  "allowed_ingress",
  "prohibited_ingress",
  "allowed_processing_layer",
  "prohibited_processing_layer",
  "allowed_egress",
  "prohibited_egress",
  "required_redaction_sanitization_point",
  "required_audit_access_log_event",
  "retention_deletion_dependency",
  "rbac_access_control_dependency",
  "third_party_model_api_constraint",
  "current_evidence_level",
  "intended_enforcement_layer",
  "implementation_gap",
  "required_implementation_evidence",
  "required_test_evidence",
  "blocker_status",
  "closure_criteria",
  "non_authorized_until_closure",
]);

const positiveClaimKeys = Object.freeze([
  "authorized",
  "route_authorized",
  "routed",
  "inspected",
  "metadata_acquired",
  "raw_material_processing_authorized",
  "source_package_inspection_authorized",
  "metadata_acquisition_authorized",
  "third_party_model_api_authorized",
  "provider_routing_authorized",
  "raw_material_routing_implemented",
  "source_package_inspected",
  "pdf_image_screenshot_metadata_inspected",
  "audit_access_log_implemented",
  "rbac_access_control_implemented",
  "retention_deletion_implemented",
  "release_approved",
  "external_use_authorized",
  "product_candidate_authorized",
  "runtime_certification_created",
  "technical_signoff_created",
  "legal_clinical_evidentiary_conclusion_created",
  "security_finding_created",
  "emitted",
  "stored",
  "runtime_gate_created",
  "system_approval_created",
]);

function controlIdFor(shortId, materialClass) {
  return `${shortId}_${materialClass}`;
}

function collectObjects(value, output = []) {
  if (!value || typeof value !== "object") {
    return output;
  }

  output.push(value);

  for (const item of Object.values(value)) {
    collectObjects(item, output);
  }

  return output;
}

function assertNoPositiveClaims(value) {
  for (const object of collectObjects(value)) {
    for (const key of positiveClaimKeys) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        assert.equal(object[key], false, `${key} must remain false`);
      }
    }
  }
}

function assertCorpusIncludes(text, expected) {
  assert.equal(text.includes(expected), true, `missing ${expected}`);
}

test("raw-material routing control spec doc and registry expose exact RMR-CS-001 through RMR-CS-010 alignment", () => {
  const controls = listRawMaterialRoutingControls();

  assert.deepEqual(
    controls.map((control) => control.control_id),
    expectedControls.map(([shortId, materialClass]) =>
      controlIdFor(shortId, materialClass),
    ),
  );
  assert.equal(Object.keys(RAW_MATERIAL_ROUTING_CONTROL_REGISTRY).length, 10);

  for (const [shortId, materialClass] of expectedControls) {
    assertCorpusIncludes(controlSpecDoc, `| \`${shortId}\` | \`${materialClass}\``);

    const control = controls.find(
      (entry) => entry.control_id === controlIdFor(shortId, materialClass),
    );
    assert.ok(control, `${shortId} missing from registry`);
    assert.equal(control.material_class, MATERIAL_CLASSES[materialClass]);

    for (const field of requiredControlFields) {
      assert.equal(field in control, true, `${control.control_id} missing ${field}`);
    }

    assert.equal(control.non_authorized_until_closure, true);
    assertNoPositiveClaims(control);
  }
});

test("registry rows reference only known material, storage, audit-event, and lifecycle constants", () => {
  const knownMaterials = new Set(Object.values(MATERIAL_CLASSES));
  const knownStorageIds = new Set(Object.keys(DATA_LOCATION_REGISTRY));
  const knownAuditEventIds = new Set(Object.keys(AUDIT_ACCESS_LOG_EVENT_CANDIDATES));
  const knownLifecycleFamilies = new Set(Object.values(LIFECYCLE_CONTROL_FAMILIES));

  for (const control of listRawMaterialRoutingControls()) {
    assert.equal(knownMaterials.has(control.material_class), true);
    assert.equal(
      knownAuditEventIds.has(control.required_audit_access_log_event),
      true,
      control.required_audit_access_log_event,
    );
    assert.equal(knownLifecycleFamilies.has(control.retention_deletion_dependency), true);

    for (const locationId of control.related_storage_location_ids) {
      assert.equal(knownStorageIds.has(locationId), true, locationId);
    }

    for (const eventId of control.related_aal_event_candidate_ids) {
      assert.equal(knownAuditEventIds.has(eventId), true, eventId);
    }

    for (const family of control.related_lifecycle_families) {
      assert.equal(knownLifecycleFamilies.has(family), true, family);
    }
  }
});

test("high-risk material classes stay denied and not route authorized", () => {
  const deniedMaterialClasses = new Set(
    Object.values(HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (entry) => entry.material_class,
    ),
  );
  const highRiskControls = listRawMaterialRoutingControls().filter((control) =>
    deniedMaterialClasses.has(control.material_class),
  );

  assert.deepEqual(
    highRiskControls.map((control) => control.control_id),
    [
      "RMR-CS-006_RAW_PRIVATE_SOURCE_MATERIAL",
      "RMR-CS-007_SOURCE_PACKAGE_MATERIAL",
      "RMR-CS-008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
      "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    ],
  );

  for (const control of highRiskControls) {
    assert.equal(control.allowed_ingress, "DENIED_BY_DEFAULT");
    assert.equal(control.allowed_egress, "DENIED_BY_DEFAULT");
    assert.equal(isRawMaterialRouteAuthorized(control.control_id), false);
    assertNoPositiveClaims(classifyRawMaterialRoutingControl(control.control_id));
  }
});

test("unknown controls fail closed and raw-material routing implementation remains globally false", () => {
  const unknown = classifyRawMaterialRoutingControl("RMR-CS-999_UNKNOWN");

  assert.equal(unknown.control_id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.material_class, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.non_authorized_until_closure, true);
  assert.equal(isRawMaterialRouteAuthorized("RMR-CS-999_UNKNOWN"), false);
  assert.equal(isRawMaterialRoutingImplemented(), false);
  assert.equal(
    getRawMaterialRoutingNonAuthorizationStatus().raw_material_routing_implemented,
    false,
  );
  assertNoPositiveClaims(unknown);
  assertNoPositiveClaims(getRawMaterialRoutingNonAuthorizationStatus());
});

test("material-specific rows preserve evidence boundaries and non-authorizations", () => {
  const byId = new Map(
    listRawMaterialRoutingControls().map((control) => [control.control_id, control]),
  );

  assert.equal(
    byId.get("RMR-CS-005_LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL").allowed_egress,
    "LOCAL_EVIDENCE_ONLY_NOT_CI_OR_RELEASE_EVIDENCE",
  );
  assert.equal(
    byId
      .get("RMR-CS-004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL")
      .allowed_egress.includes("NOT_EXTERNAL_USE"),
    true,
  );
  assert.equal(
    byId
      .get("RMR-CS-010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL")
      .related_rbac_boundary_status,
    "HUMAN_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL",
  );
  assert.equal(
    byId
      .get("RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL")
      .third_party_model_api_constraint,
    "DENIED_BY_DEFAULT_NO_PROVIDER_INTEGRATION",
  );
  assert.equal(
    byId
      .get("RMR-CS-006_RAW_PRIVATE_SOURCE_MATERIAL")
      .prohibited_egress.includes("ANY_PROVIDER_ROUTE"),
    true,
  );
  assert.equal(
    byId
      .get("RMR-CS-007_SOURCE_PACKAGE_MATERIAL")
      .prohibited_egress.includes("SOURCE_PACKAGE_INSPECTION"),
    true,
  );
  assert.equal(
    byId
      .get("RMR-CS-008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL")
      .redactionSanitizationPoint,
    undefined,
  );
  assert.equal(
    byId
      .get("RMR-CS-008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL")
      .required_redaction_sanitization_point,
    "PDF_IMAGE_SCREENSHOT_METADATA_NOT_ACQUIRED",
  );
});

test("non-overclaim rules and prerequisites remain aligned to docs and dependent registries", () => {
  const rules = listRawMaterialRoutingNonOverclaimRules();
  const prerequisites = getRawMaterialRoutingRequiredPrerequisites();
  const registryRuleCorpus = rules.join("\n");
  const prerequisiteCorpus = prerequisites.join("\n");
  const combinedCorpus = [docsCorpus, registryRuleCorpus, prerequisiteCorpus].join("\n");

  for (const expected of [
    "RAW_MATERIAL_ROUTING_SPECIFICATION_NOT_IMPLEMENTATION",
    "CATEGORY_DESCRIPTOR_ALLOWED_ONLY does not mean route authorization",
    "ALLOWED_INGRESS_CANDIDATE does not mean CURRENT_INGRESS_IMPLEMENTATION",
    "ALLOWED_PROCESSING_LAYER does not mean RUNTIME_PROCESSING_AUTHORIZATION",
    "ALLOWED_EGRESS_CANDIDATE does not mean EXTERNAL_USE_AUTHORIZATION",
    "REDACTION_POINT does not mean REDACTION_EXECUTED",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "CI_LOG does not mean RELEASE_EVIDENCE",
    "HASH_OR_MANIFEST does not mean TRUTH_PROOF",
    "RETENTION_DELETION_DEPENDENCY does not mean lifecycle execution",
    "THIRD_PARTY_ROUTE_CONSTRAINT does not mean provider routing authorization",
  ]) {
    assertCorpusIncludes(combinedCorpus, expected);
  }

  for (const expected of [
    "storage/data-location inventory registry alignment",
    "RBAC role-permission deny-by-default scaffold alignment",
    "admin/support no-bypass model",
    "audit/access-log dependency registry alignment",
    "no-content audit/access event taxonomy alignment",
    "retention/deletion/encryption dependency registry alignment",
    "third-party provider status registry",
    "data-routing map",
    "token/URL/secret handling policy",
    "provider retention/deletion posture",
    "provider auditability posture",
    "CI test plan",
    "non-proof/non-external-use wording",
  ]) {
    assertCorpusIncludes(prerequisiteCorpus, expected);
  }
});

test("docs preserve DOCS_ONLY no-runtime and no-routing authorization boundaries", () => {
  for (const expected of [
    "Mode: `DOCS_ONLY`",
    "It is not implementation.",
    "It does not authorize raw/private/source material inspection.",
    "It does not authorize source package inspection.",
    "It does not authorize PDF/image/screenshot/metadata inspection.",
    "It does not authorize metadata acquisition.",
    "It does not authorize third-party model/API routing.",
    "It does not select product candidate.",
    "It does not authorize external-use.",
    "It preserves human/professional review as release gate.",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "product candidate remains none",
    "external-use remains unauthorized",
    "runtime gate inventory remains deferred",
  ]) {
    assertCorpusIncludes(controlSpecDoc, expected);
  }

  assertCorpusIncludes(
    thirdPartyBlockerDoc,
    "This boundary creates no third-party routing implementation",
  );
  assertCorpusIncludes(
    thirdPartyBlockerDoc,
    "no third-party model/API routing authorization",
  );
  assertCorpusIncludes(
    feasibilityMatrixDoc,
    "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean implementation approval",
  );
  assertCorpusIncludes(
    feasibilityMatrixDoc,
    "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean runtime enforcement",
  );
  assertCorpusIncludes(
    feasibilityMatrixDoc,
    "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean product readiness",
  );
  assertCorpusIncludes(
    feasibilityMatrixDoc,
    "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean external-use authorization",
  );
});

test("storage evidence boundaries for L20, L22, and L23 remain future and not implemented or authorized", () => {
  const auditStorage = DATA_LOCATION_REGISTRY.L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE;
  const providerStorage = DATA_LOCATION_REGISTRY.L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE;
  const recipientStorage = DATA_LOCATION_REGISTRY.L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE;

  assert.equal(auditStorage.evidence_posture, EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY);
  assert.equal(providerStorage.evidence_posture, EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY);
  assert.equal(recipientStorage.evidence_posture, EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY);
  assert.equal(auditStorage.notes.includes("audit-log storage is not implemented"), true);
  assert.equal(providerStorage.notes.includes("provider routing is not authorized"), true);
  assert.equal(recipientStorage.notes.includes("recipient compliance is not verified"), true);
  assertNoPositiveClaims(auditStorage);
  assertNoPositiveClaims(providerStorage);
  assertNoPositiveClaims(recipientStorage);
});

test("RBAC scaffold remains deny-by-default when referenced by routing controls", () => {
  const decision = deriveRbacDenyByDefaultAccessDecision({
    actor_type: "ADMIN_OPERATOR_ACTOR",
    role_category: "ADMIN_ROLE_CATEGORY",
    permission_category: "THIRD_PARTY_MODEL_API_ROUTING_PERMISSION",
    resource_material_scope: "THIRD_PARTY_MODEL_API_ROUTE_SCOPE",
  });

  assert.equal(decision.authorized, false);
  assert.equal(decision.access_decision, "ACCESS_DENIED_BY_DEFAULT");
  assert.equal(decision.human_professional_review_required, true);
  assert.equal(decision.human_professional_review_is_system_approval, false);
  assertNoPositiveClaims(decision);
});
