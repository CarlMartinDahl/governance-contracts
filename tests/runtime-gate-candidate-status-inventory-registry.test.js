"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const registry = require("../packages/governance/src/runtime-gate-candidate-status-inventory-registry.js");
const indexExports = require("../packages/governance/src/index.js");
const {
  DATA_LOCATION_REGISTRY,
  HIGH_RISK_MATERIAL_CLASSES_DENIED,
  MATERIAL_CLASSES,
  getDataLocation,
} = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const {
  LIFECYCLE_CONTROL_FAMILIES,
} = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const {
  AUDIT_ACCESS_LOG_EVENT_CANDIDATES,
} = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const {
  RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
} = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const {
  THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
} = require("../packages/governance/src/third-party-routing-status-gap-registry.js");
const {
  ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
} = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const {
  GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
} = require("../packages/governance/src/global-access-control-threat-model-inventory-status-registry.js");

const expectedFamilies = [
  "MATERIAL_INTAKE_AUTHORIZATION_GATE_CANDIDATE",
  "MATERIAL_VIEW_ACCESS_GATE_CANDIDATE",
  "MATERIAL_REDACTION_SANITIZATION_GATE_CANDIDATE",
  "MATERIAL_ROUTING_DECISION_GATE_CANDIDATE",
  "RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE",
  "SOURCE_PACKAGE_DENY_QUARANTINE_GATE_CANDIDATE",
  "PDF_IMAGE_SCREENSHOT_METADATA_DENY_ACQUISITION_GATE_CANDIDATE",
  "REVIEW_ACCESS_GATE_CANDIDATE",
  "EXPORT_DOWNLOAD_ACCESS_GATE_CANDIDATE",
  "PACKET_DELIVERY_PROMOTION_GATE_CANDIDATE",
  "THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE",
  "AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE",
  "RETENTION_DELETION_OPERATION_AUTHORIZATION_GATE_CANDIDATE",
  "ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE",
  "CROSS_TENANT_WRONG_CASE_DENIAL_GATE_CANDIDATE",
  "OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE",
  "HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE",
];

const expectedImplementationStatuses = [
  "NOT_RUNTIME_GATE_IMPLEMENTATION",
  "NOT_RUNTIME_ENFORCEMENT",
  "NOT_SCHEMA_ENFORCEMENT",
  "NOT_WORKFLOW_ENFORCEMENT",
  "NOT_VALIDATOR_DISPATCH",
  "NOT_RUNTIME_REGISTRY_LOOKUP",
  "NOT_RBAC_IMPLEMENTATION",
  "NOT_ACCESS_CONTROL_IMPLEMENTATION",
  "NOT_ROLE_PERMISSION_MODEL",
  "NOT_ADMIN_SUPPORT_MODEL",
  "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
  "NOT_RETENTION_DELETION_IMPLEMENTATION",
  "NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
  "NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
  "NOT_SECURITY_FINDING",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedDecisionStatuses = [
  "DOCS_ONLY_STATUS_INVENTORY",
  "REGISTRY_SCAFFOLD_ONLY",
  "FUTURE_CANDIDATE_ONLY",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  "NOT_AUTHORIZED_FOR_SCHEMA_ENFORCEMENT",
  "NOT_AUTHORIZED_FOR_WORKFLOW_ENFORCEMENT",
  "BLOCKED_BY_RBAC_MODEL",
  "BLOCKED_BY_ADMIN_SUPPORT_MODEL",
  "BLOCKED_BY_AUDIT_ACCESS_LOG",
  "BLOCKED_BY_RETENTION_DELETION",
  "BLOCKED_BY_THIRD_PARTY_ROUTING",
  "BLOCKED_BY_RAW_MATERIAL_ROUTING",
  "BLOCKED_BY_GLOBAL_ACCESS_CONTROL_THREAT_MODEL",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedEvidencePostures = [
  "DOCS_ONLY_STATUS_INVENTORY",
  "REGISTRY_SCAFFOLD_EVIDENCE",
  "TESTED_ALIGNMENT_EVIDENCE",
  "CI_TESTED_SCENARIO_EVIDENCE",
  "FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedRowIds = [
  "RBAC-GC-001_MATERIAL_INTAKE_AUTHORIZATION_GATE_CANDIDATE",
  "RBAC-GC-002_MATERIAL_VIEW_ACCESS_GATE_CANDIDATE",
  "RBAC-GC-003_MATERIAL_REDACTION_SANITIZATION_GATE_CANDIDATE",
  "RBAC-GC-004_MATERIAL_ROUTING_DECISION_GATE_CANDIDATE",
  "RBAC-GC-005_RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE",
  "RBAC-GC-006_SOURCE_PACKAGE_DENY_QUARANTINE_GATE_CANDIDATE",
  "RBAC-GC-007_PDF_IMAGE_SCREENSHOT_METADATA_DENY_ACQUISITION_GATE_CANDIDATE",
  "RBAC-GC-008_REVIEW_ACCESS_GATE_CANDIDATE",
  "RBAC-GC-009_EXPORT_DOWNLOAD_ACCESS_GATE_CANDIDATE",
  "RBAC-GC-010_PACKET_DELIVERY_PROMOTION_GATE_CANDIDATE",
  "RBAC-GC-011_THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE",
  "RBAC-GC-012_AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE",
  "RBAC-GC-013_RETENTION_DELETION_OPERATION_AUTHORIZATION_GATE_CANDIDATE",
  "RBAC-GC-014_ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE",
  "RBAC-GC-015_CROSS_TENANT_WRONG_CASE_DENIAL_GATE_CANDIDATE",
  "RBAC-GC-016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE",
  "RBAC-GC-017_HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE",
];

const requiredFields = [
  "id",
  "source_rbac_gate_candidate_id",
  "family",
  "candidate_surface",
  "future_gate_category",
  "later_runtime_gate_candidate_status",
  "later_schema_validator_gate_candidate_status",
  "later_workflow_prompt_gate_candidate_status",
  "human_professional_review_gate_status",
  "material_resource_surface",
  "primary_blocker",
  "secondary_blockers",
  "implementation_prerequisite",
  "required_implementation_evidence",
  "required_test_evidence",
  "overclaim_risk",
  "current_evidence_level",
  "runtime_inventory_status",
  "current_authorization_status",
  "closure_criteria",
  "non_authorized_until_closure",
  "related_material_classes",
  "related_storage_location_ids",
  "related_admin_support_gap_ids",
  "related_third_party_status_gap_ids",
  "related_raw_material_routing_control_ids",
  "related_aal_event_candidate_ids",
  "related_lifecycle_families",
  "related_global_access_control_row_ids",
  "related_rbac_boundary_status",
  "evidence_posture",
  "non_authorizations",
  "notes",
];

const positiveClaimKeys = [
  "authorized",
  "access_granted",
  "runtime_gate_implemented",
  "runtime_gate_enforced",
  "schema_gate_enforced",
  "workflow_gate_enforced",
  "validator_dispatch_created",
  "runtime_registry_lookup_created",
  "rbac_implemented",
  "access_control_enforced",
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
];

function collectObjects(value, collected = []) {
  if (!value || typeof value !== "object") {
    return collected;
  }

  collected.push(value);
  for (const nested of Object.values(value)) {
    collectObjects(nested, collected);
  }

  return collected;
}

test("families implementation statuses decision statuses evidence postures and rows exist exactly", () => {
  assert.deepEqual(
    Object.keys(registry.RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FAMILIES),
    expectedFamilies,
  );
  assert.deepEqual(
    Object.keys(registry.RUNTIME_GATE_CANDIDATE_IMPLEMENTATION_STATUS),
    expectedImplementationStatuses,
  );
  assert.deepEqual(
    Object.keys(registry.RUNTIME_GATE_CANDIDATE_DECISION_STATUS),
    expectedDecisionStatuses,
  );
  assert.deepEqual(
    Object.keys(registry.RUNTIME_GATE_CANDIDATE_EVIDENCE_POSTURE),
    expectedEvidencePostures,
  );
  assert.deepEqual(
    registry
      .listRuntimeGateCandidateStatusInventoryRows()
      .map((row) => row.id),
    expectedRowIds,
  );
  assert.deepEqual(
    registry.listRuntimeGateCandidateStatusInventoryFamilies(),
    expectedFamilies,
  );
});

test("rows expose required fields and reference only known tracked registries", () => {
  const knownMaterialClasses = new Set(Object.values(MATERIAL_CLASSES));
  const knownLocationIds = new Set(Object.keys(DATA_LOCATION_REGISTRY));
  const knownAdminGapIds = new Set(
    Object.values(ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY).map(
      (row) => row.id,
    ),
  );
  const knownThirdPartyGapIds = new Set(
    Object.values(THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY).map((row) => row.id),
  );
  const knownRawRoutingControlIds = new Set(
    Object.values(RAW_MATERIAL_ROUTING_CONTROL_REGISTRY).map(
      (row) => row.control_id,
    ),
  );
  const knownAalEventIds = new Set(
    Object.values(AUDIT_ACCESS_LOG_EVENT_CANDIDATES).map((row) => row.id),
  );
  const knownLifecycleFamilies = new Set(Object.values(LIFECYCLE_CONTROL_FAMILIES));
  const knownGlobalAccessControlRowIds = new Set(
    Object.values(GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY).map(
      (row) => row.id,
    ),
  );

  for (const row of registry.listRuntimeGateCandidateStatusInventoryRows()) {
    assert.deepEqual(Object.keys(row), requiredFields, row.id);
    assert.equal(row.runtime_inventory_status, "RUNTIME_GATE_INVENTORY_DEFERRED");
    assert.equal(
      row.current_authorization_status,
      "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
    );
    assert.equal(row.non_authorized_until_closure, true);

    for (const material of row.related_material_classes) {
      assert.equal(knownMaterialClasses.has(material), true, `${row.id}:${material}`);
    }
    for (const location of row.related_storage_location_ids) {
      assert.equal(knownLocationIds.has(location), true, `${row.id}:${location}`);
    }
    for (const gapId of row.related_admin_support_gap_ids) {
      assert.equal(knownAdminGapIds.has(gapId), true, `${row.id}:${gapId}`);
    }
    for (const gapId of row.related_third_party_status_gap_ids) {
      assert.equal(knownThirdPartyGapIds.has(gapId), true, `${row.id}:${gapId}`);
    }
    for (const controlId of row.related_raw_material_routing_control_ids) {
      assert.equal(
        knownRawRoutingControlIds.has(controlId),
        true,
        `${row.id}:${controlId}`,
      );
    }
    for (const eventId of row.related_aal_event_candidate_ids) {
      assert.equal(knownAalEventIds.has(eventId), true, `${row.id}:${eventId}`);
    }
    for (const family of row.related_lifecycle_families) {
      assert.equal(knownLifecycleFamilies.has(family), true, `${row.id}:${family}`);
    }
    for (const gacId of row.related_global_access_control_row_ids) {
      assert.equal(
        knownGlobalAccessControlRowIds.has(gacId),
        true,
        `${row.id}:${gacId}`,
      );
    }
  }
});

test("high-risk material classes remain denied and not authorized", () => {
  const highRiskClasses = new Set(
    Object.values(HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (entry) => entry.material_class,
    ),
  );
  const referencedHighRiskClasses = new Set(
    registry
      .listRuntimeGateCandidateStatusInventoryRows()
      .flatMap((row) => row.related_material_classes)
      .filter((material) => highRiskClasses.has(material)),
  );

  assert.deepEqual(referencedHighRiskClasses, highRiskClasses);
  for (const material of referencedHighRiskClasses) {
    const denial = HIGH_RISK_MATERIAL_CLASSES_DENIED[material];
    assert.equal(denial.denied, true);
    assert.equal(denial.authorized, false);
    assert.equal(denial.external_use_authorized, false);
    assert.equal(denial.product_candidate_authorized, false);
  }
});

test("unknown row lookups fail closed and runtime gate implementation remains false", () => {
  const unknown = registry.getRuntimeGateCandidateStatusInventoryRow("NOPE");
  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.current_authorization_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.non_authorizations.authorized, false);

  const classification =
    registry.classifyRuntimeGateCandidateStatusInventoryRow("NOPE");
  assert.equal(classification.known, false);
  assert.equal(classification.classification, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(classification.authorized, false);
  assert.equal(classification.runtime_gate_enforced, false);
  assert.equal(classification.security_finding_created, false);
  assert.equal(registry.hasRuntimeGateCandidateStatusInventoryRow("NOPE"), false);

  assert.equal(registry.isRuntimeGateImplemented("anything"), false);
  assert.equal(registry.isRuntimeGateEnforced("anything"), false);
  assert.equal(registry.isSchemaGateEnforced("anything"), false);
  assert.equal(registry.isWorkflowGateEnforced("anything"), false);
  assert.equal(registry.isValidatorDispatchCreated(), false);
  assert.equal(registry.isRuntimeRegistryLookupCreated(), false);
  assert.equal(registry.isRuntimeGateAuthorizedForEnforcement("anything"), false);
  assert.equal(registry.isSecurityFindingCreated("anything"), false);
});

test("helpers never return positive authorization access implementation enforcement finding or release claims", () => {
  const helperOutputs = [
    registry.listRuntimeGateCandidateStatusInventoryRows(),
    registry.getRuntimeGateCandidateStatusInventoryRow(expectedRowIds[0]),
    registry.classifyRuntimeGateCandidateStatusInventoryRow(expectedRowIds[0]),
    registry.getRuntimeGateCandidateNonAuthorizationStatus(),
    registry.getRuntimeGateCandidateRequiredPrerequisites(),
    registry.listRuntimeGateCandidateNonOverclaimRules(),
    registry.getRuntimeGateCandidateStatusInventoryRow("UNKNOWN"),
    registry.classifyRuntimeGateCandidateStatusInventoryRow("UNKNOWN"),
  ];

  for (const object of helperOutputs.flatMap((output) => collectObjects(output))) {
    for (const key of positiveClaimKeys) {
      if (Object.hasOwn(object, key)) {
        assert.notEqual(object[key], true, key);
      }
    }
  }
});

test("registry entries and helper outputs are frozen and copy-safe", () => {
  const row = registry.getRuntimeGateCandidateStatusInventoryRow(expectedRowIds[0]);
  assert.equal(Object.isFrozen(row), true);
  assert.equal(Object.isFrozen(row.related_material_classes), true);

  assert.throws(() => {
    row.related_material_classes.push("MUTATION");
  }, TypeError);

  const rowAgain = registry.getRuntimeGateCandidateStatusInventoryRow(expectedRowIds[0]);
  assert.equal(rowAgain.related_material_classes.includes("MUTATION"), false);
});

test("non-overclaim rules and prerequisites preserve runtime gate boundaries", () => {
  const rules = registry.listRuntimeGateCandidateNonOverclaimRules();
  for (const expected of [
    "RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY does not mean RUNTIME_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_CANDIDATE does not mean RUNTIME_ENFORCEMENT",
    "SCHEMA_VALIDATOR_GATE_CANDIDATE does not mean SCHEMA_ENFORCEMENT",
    "WORKFLOW_PROMPT_GATE_CANDIDATE does not mean WORKFLOW_ENFORCEMENT",
    "HUMAN_REVIEW_GATE_CANDIDATE does not mean SYSTEM_APPROVAL",
    "GATE_CATEGORY does not mean VALIDATOR_DISPATCH",
    "GATE_CATEGORY does not mean REGISTRY_LOOKUP",
    "FUTURE_IMPLEMENTATION_EVIDENCE does not mean CURRENT_IMPLEMENTATION_EVIDENCE",
    "REQUIRED_TEST_EVIDENCE does not mean CURRENT_CLOSURE",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "CI_LOG does not mean RELEASE_EVIDENCE",
    "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
    "GATE_CANDIDATE_ROW does not mean SECURITY_FINDING",
    "GATE_CANDIDATE_ROW does not mean SEVERITY_ASSIGNED",
    "GATE_CANDIDATE_ROW does not mean REMEDIATION_RECOMMENDED",
  ]) {
    assert.equal(rules.includes(expected), true, expected);
  }

  const prerequisites = registry.getRuntimeGateCandidateRequiredPrerequisites();
  for (const expected of [
    "RBAC model",
    "role/permission model",
    "role schema",
    "permission schema",
    "admin/support model",
    "audit/access-log model",
    "retention/deletion/purge/erasure policy",
    "third-party provider status registry",
    "raw-material routing denial policy",
    "object/function/property authorization review",
    "runtime gate implementation plan",
    "schema/validator gate implementation plan",
    "workflow/prompt gate implementation plan",
    "validator dispatch plan",
    "registry/lookup plan",
    "CI test plan",
    "external-use non-authorization wording",
    "human/professional review gate",
  ]) {
    assert.equal(prerequisites.includes(expected), true, expected);
  }
});

test("storage evidence boundaries remain future or non-authorizing where referenced", () => {
  const rows = registry.listRuntimeGateCandidateStatusInventoryRows();
  assert.equal(
    rows.some((row) =>
      row.related_storage_location_ids.includes(
        "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
      ),
    ),
    true,
  );
  assert.equal(
    rows.some((row) =>
      row.related_storage_location_ids.includes(
        "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
      ),
    ),
    true,
  );
  assert.equal(
    rows.some((row) =>
      row.related_storage_location_ids.includes(
        "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
      ),
    ),
    true,
  );

  for (const id of [
    "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
    "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
    "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
  ]) {
    const location = getDataLocation(id);
    assert.equal(location.non_authorizations.authorized, false, id);
    assert.equal(location.non_authorizations.external_use_authorized, false, id);
    assert.equal(location.non_authorizations.release_approved, false, id);
  }

  const status = registry.getRuntimeGateCandidateNonAuthorizationStatus();
  assert.equal(status.local_logs_are_ci_evidence, false);
  assert.equal(status.ci_logs_are_release_evidence, false);
  assert.equal(status.human_review_gate_is_system_approval, false);
});

test("index export wiring exposes runtime gate registry helpers without side effects", () => {
  assert.equal(
    indexExports.RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
    registry.RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
  );
  assert.equal(
    indexExports.listRuntimeGateCandidateStatusInventoryRows,
    registry.listRuntimeGateCandidateStatusInventoryRows,
  );
  assert.equal(indexExports.isRuntimeGateImplemented(), false);
  assert.equal(indexExports.isSecurityFindingCreated(), false);
});
