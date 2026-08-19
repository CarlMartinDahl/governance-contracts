"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const runtimeGate = require("../packages/governance/src/runtime-gate-candidate-status-inventory-registry.js");
const gac = require("../packages/governance/src/global-access-control-threat-model-inventory-status-registry.js");
const adminSupport = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const tpr = require("../packages/governance/src/third-party-routing-status-gap-registry.js");
const rmr = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const rde = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const aal = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const rbac = require("../packages/governance/src/rbac-role-permission-deny-by-default-scaffold.js");

const repoRoot = path.resolve(__dirname, "..");
const runtimeGateDoc = fs.readFileSync(
  path.join(
    repoRoot,
    "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
  ),
  "utf8",
);

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

const docStatusTokens = [
  "DOCS_ONLY",
  "RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_ONLY",
  "RUNTIME_GATE_CANDIDATES_FUTURE_ONLY",
  "RUNTIME_GATE_CANDIDATES_NOT_IMPLEMENTED",
  "RUNTIME_GATE_CANDIDATES_NOT_RUNTIME_ENFORCEMENT",
  "SCHEMA_VALIDATOR_GATE_CANDIDATES_NOT_SCHEMA_ENFORCEMENT",
  "WORKFLOW_PROMPT_GATE_CANDIDATES_NOT_WORKFLOW_ENFORCEMENT",
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
  "RBAC_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "GLOBAL_ACCESS_CONTROL_MODEL_NOT_CREATED",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_RBAC",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_FULL_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_GLOBAL_AUTHORIZATION_MODEL",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "NO_SECURITY_FINDING_CREATED",
  "NO_VULNERABILITY_FINDING_CREATED",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "NO_REMEDIATION_IMPLEMENTED",
  "PRODUCT_CANDIDATE_NONE",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
];

const docBoundaryPhrases = [
  "runtime/schema/workflow/human-review gate-candidate status inventory only",
  "It creates no runtime gate implementation.",
  "It creates no runtime enforcement.",
  "It creates no schema enforcement.",
  "It creates no workflow enforcement.",
  "It creates no validator dispatch.",
  "It creates no registry/lookup.",
  "It creates no RBAC implementation.",
  "It creates no access-control implementation.",
  "It creates no security/vulnerability findings.",
  "It assigns no severity.",
  "It recommends no remediation.",
  "Human/professional review remains release gate.",
  "DOCS_ONLY boundaries are not runtime enforcement.",
  "Route/case/capability evidence remains not RBAC, not full access control, not admin/support access control, and not global authorization model.",
  "Required implementation evidence is future evidence, not current implementation evidence.",
  "Required test evidence is future evidence, not current closure.",
  "Local logs are not CI evidence.",
  "Product candidate remains none.",
  "External-use remains unauthorized.",
];

const docCandidateLabels = [
  "material intake authorization gate candidate",
  "material view/access gate candidate",
  "material redaction/sanitization gate candidate",
  "material routing decision gate candidate",
  "raw/private/source material deny/quarantine gate candidate",
  "source package deny/quarantine gate candidate",
  "PDF/image/screenshot/metadata deny/acquisition gate candidate",
  "review access gate candidate",
  "export/download access gate candidate",
  "packet/delivery promotion gate candidate",
  "third-party model/API route approval/denial gate candidate",
  "audit/access-log view/access gate candidate",
  "retention/deletion operation authorization gate candidate",
  "admin/support access gate candidate",
  "cross-tenant / wrong-case denial gate candidate",
  "object/function/property authorization gate candidate",
  "human/professional review-only gate candidate",
];

const expectedNonOverclaimRules = [
  "RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY does not mean RUNTIME_GATE_IMPLEMENTATION",
  "RUNTIME_GATE_CANDIDATE does not mean RUNTIME_ENFORCEMENT",
  "SCHEMA_VALIDATOR_GATE_CANDIDATE does not mean SCHEMA_ENFORCEMENT",
  "WORKFLOW_PROMPT_GATE_CANDIDATE does not mean WORKFLOW_ENFORCEMENT",
  "HUMAN_REVIEW_GATE_CANDIDATE does not mean SYSTEM_APPROVAL",
  "GATE_CATEGORY does not mean VALIDATOR_DISPATCH",
  "GATE_CATEGORY does not mean REGISTRY_LOOKUP",
  "RUNTIME_GATE_INVENTORY does not mean IMPLEMENTATION",
  "FUTURE_IMPLEMENTATION_EVIDENCE does not mean CURRENT_IMPLEMENTATION_EVIDENCE",
  "REQUIRED_TEST_EVIDENCE does not mean CURRENT_CLOSURE",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean RBAC",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean FULL_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean ADMIN_SUPPORT_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean GLOBAL_AUTHORIZATION_MODEL",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
  "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
  "GATE_CANDIDATE_ROW does not mean SECURITY_FINDING",
  "GATE_CANDIDATE_ROW does not mean SEVERITY_ASSIGNED",
  "GATE_CANDIDATE_ROW does not mean REMEDIATION_RECOMMENDED",
];

const expectedPrerequisites = [
  "RBAC model",
  "role/permission model",
  "role fields",
  "permission fields",
  "role schema",
  "permission schema",
  "admin/support model",
  "admin/support access-control model",
  "audit/access-log model",
  "event taxonomy runtime code",
  "no-content audit/access-log event policy",
  "log schema/storage policy",
  "retention/deletion/purge/erasure policy",
  "encryption/key-management policy",
  "third-party provider status registry",
  "third-party provider route denial tests",
  "raw-material routing denial policy",
  "no-raw/no-private/no-source-locator policy",
  "object/function/property authorization review",
  "tenant isolation tests",
  "wrong-case tests",
  "wrong-object tests",
  "wrong-function tests",
  "wrong-property tests",
  "allow/deny tests",
  "runtime gate implementation plan",
  "schema/validator gate implementation plan",
  "workflow/prompt gate implementation plan",
  "validator dispatch plan",
  "registry/lookup plan",
  "CI test plan",
  "external-use non-authorization wording",
  "non-proof/non-route-readiness wording",
  "human/professional review gate",
];

const positiveClaimKeys = new Set([
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
  "product_candidate_selected",
  "runtime_certification_created",
  "technical_signoff_created",
  "system_approval_created",
  "admin_support_runtime_access_authorized",
  "admin_support_runtime_access_implemented",
  "admin_support_model_created",
  "admin_support_routes_created",
  "admin_support_auth_fields_created",
  "admin_support_db_fields_created",
  "log_viewer_rbac_created",
  "audit_access_log_implemented",
  "access_log_implemented",
  "event_taxonomy_runtime_code_created",
  "log_schema_created",
  "log_storage_created",
  "audit_proof_created",
  "chain_of_custody_created",
  "retention_deletion_implemented",
  "retention_deletion_executed",
  "deletion_executed",
  "deletion_verified",
  "purge_executed",
  "purge_verified",
  "erasure_executed",
  "encryption_implemented",
  "key_management_implemented",
  "provider_routing_authorized",
  "third_party_routing_authorized",
  "third_party_routing_implemented",
  "raw_material_routing_implemented",
  "provider_deletion_verified",
  "recipient_purge_verified",
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertDocContainsAll(doc, phrases) {
  for (const phrase of phrases) {
    assert.match(doc, new RegExp(escapeRegExp(phrase), "i"), phrase);
  }
}

function assertIncludesAll(actual, expected) {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
}

function collectObjects(value, collected = [], seen = new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return collected;
  }

  seen.add(value);
  collected.push(value);
  for (const nested of Object.values(value)) {
    collectObjects(nested, collected, seen);
  }

  return collected;
}

function assertNoPositiveClaims(value) {
  for (const object of collectObjects(value)) {
    for (const [key, item] of Object.entries(object)) {
      if (positiveClaimKeys.has(key)) {
        assert.notEqual(item, true, key);
      }
    }
  }
}

const rows = runtimeGate.listRuntimeGateCandidateStatusInventoryRows();

test("tracked runtime gate candidate boundary doc aligns to registry row ids and non-runtime posture", () => {
  assert.deepEqual(rows.map((row) => row.id), expectedRowIds);
  assertDocContainsAll(runtimeGateDoc, docStatusTokens);
  assertDocContainsAll(runtimeGateDoc, docBoundaryPhrases);
  assertDocContainsAll(runtimeGateDoc, docCandidateLabels);

  for (const row of rows) {
    assert.match(
      runtimeGateDoc,
      new RegExp(escapeRegExp(`\`${row.source_rbac_gate_candidate_id}\``)),
    );
  }
});

test("runtime gate rows expose required fields and only reference known tracked registries", () => {
  const knownMaterialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const knownLocationIds = new Set(Object.keys(storage.DATA_LOCATION_REGISTRY));
  const knownAdminGapIds = new Set(
    Object.values(adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY).map(
      (row) => row.id,
    ),
  );
  const knownThirdPartyGapIds = new Set(
    Object.values(tpr.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY).map((row) => row.id),
  );
  const knownRawRoutingControlIds = new Set(
    Object.values(rmr.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY).map(
      (row) => row.control_id,
    ),
  );
  const knownAalEventIds = new Set(
    Object.values(aal.AUDIT_ACCESS_LOG_EVENT_CANDIDATES).map((row) => row.id),
  );
  const knownLifecycleFamilies = new Set(Object.values(rde.LIFECYCLE_CONTROL_FAMILIES));
  const knownGlobalAccessControlRowIds = new Set(
    Object.values(gac.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY).map(
      (row) => row.id,
    ),
  );

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), requiredFields, row.id);
    assert.match(row.future_gate_category, /candidate/i, row.id);
    assert.equal(row.runtime_inventory_status, "RUNTIME_GATE_INVENTORY_DEFERRED");
    assert.equal(
      row.current_authorization_status,
      "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
    );
    assert.equal(row.current_evidence_level, "REGISTRY_SCAFFOLD_EVIDENCE");
    assert.equal(row.evidence_posture, "FUTURE_IMPLEMENTATION_EVIDENCE_REQUIRED");
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
      assert.equal(knownRawRoutingControlIds.has(controlId), true, `${row.id}:${controlId}`);
    }
    for (const eventId of row.related_aal_event_candidate_ids) {
      assert.equal(knownAalEventIds.has(eventId), true, `${row.id}:${eventId}`);
    }
    for (const family of row.related_lifecycle_families) {
      assert.equal(knownLifecycleFamilies.has(family), true, `${row.id}:${family}`);
    }
    for (const rowId of row.related_global_access_control_row_ids) {
      assert.equal(knownGlobalAccessControlRowIds.has(rowId), true, `${row.id}:${rowId}`);
    }
  }
});

test("referenced high-risk materials and future storage locations remain non-authorizing", () => {
  const highRiskClasses = new Set(
    Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (entry) => entry.material_class,
    ),
  );
  const referencedHighRiskClasses = new Set(
    rows
      .flatMap((row) => row.related_material_classes)
      .filter((material) => highRiskClasses.has(material)),
  );

  assert.deepEqual(referencedHighRiskClasses, highRiskClasses);
  for (const material of referencedHighRiskClasses) {
    const denial = storage.HIGH_RISK_MATERIAL_CLASSES_DENIED[material];
    assert.equal(denial.denied, true, material);
    assert.equal(denial.authorized, false, material);
    assert.equal(denial.external_use_authorized, false, material);
    assert.equal(denial.product_candidate_authorized, false, material);
  }

  for (const id of [
    "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
    "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
    "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
  ]) {
    assert.equal(
      rows.some((row) => row.related_storage_location_ids.includes(id)),
      true,
      id,
    );
    const location = storage.getDataLocation(id);
    assert.equal(location.non_authorizations.authorized, false, id);
    assert.equal(location.non_authorizations.release_approved, false, id);
    assert.equal(location.non_authorizations.external_use_authorized, false, id);
  }
});

test("unknown runtime gate candidates fail closed and global implementation helpers remain false", () => {
  const unknown = runtimeGate.getRuntimeGateCandidateStatusInventoryRow("NOPE");
  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.current_authorization_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.non_authorizations.authorized, false);
  assert.equal(runtimeGate.hasRuntimeGateCandidateStatusInventoryRow("NOPE"), false);

  const classification =
    runtimeGate.classifyRuntimeGateCandidateStatusInventoryRow("NOPE");
  assert.equal(classification.known, false);
  assert.equal(classification.classification, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(classification.authorized, false);
  assert.equal(classification.runtime_gate_enforced, false);
  assert.equal(classification.security_finding_created, false);

  assert.equal(runtimeGate.isRuntimeGateImplemented("anything"), false);
  assert.equal(runtimeGate.isRuntimeGateEnforced("anything"), false);
  assert.equal(runtimeGate.isSchemaGateEnforced("anything"), false);
  assert.equal(runtimeGate.isWorkflowGateEnforced("anything"), false);
  assert.equal(runtimeGate.isValidatorDispatchCreated(), false);
  assert.equal(runtimeGate.isRuntimeRegistryLookupCreated(), false);
  assert.equal(runtimeGate.isRuntimeGateAuthorizedForEnforcement("anything"), false);
  assert.equal(runtimeGate.isSecurityFindingCreated("anything"), false);
  assert.equal(gac.isGlobalAccessControlModelImplemented(), false);
  assert.equal(gac.isAccessControlRuntimeEnforced(), false);
  assert.equal(gac.isGlobalAuthorizationModelCreated(), false);
  assert.equal(gac.isSecurityFindingCreated(), false);
  assert.equal(adminSupport.isAdminSupportRuntimeAccessImplemented(), false);
  assert.equal(adminSupport.isAdminSupportRuntimeAccessAuthorized(), false);
  assert.equal(tpr.isThirdPartyRoutingImplemented(), false);
  assert.equal(tpr.isThirdPartyRouteAuthorized(), false);
  assert.equal(rmr.isRawMaterialRoutingImplemented(), false);
  assert.equal(rmr.isRawMaterialRouteAuthorized(), false);
  assert.equal(aal.isAuditAccessLogImplementationCreated(), false);
  assert.equal(rde.isLifecycleImplementationCreated(), false);
});

test("non-overclaim rules and prerequisites preserve future-only candidate posture", () => {
  assertIncludesAll(
    runtimeGate.listRuntimeGateCandidateNonOverclaimRules(),
    expectedNonOverclaimRules,
  );
  assertIncludesAll(
    runtimeGate.getRuntimeGateCandidateRequiredPrerequisites(),
    expectedPrerequisites,
  );

  const status = runtimeGate.getRuntimeGateCandidateNonAuthorizationStatus();
  assertIncludesAll(status.non_overclaim_rules, expectedNonOverclaimRules);
  assertIncludesAll(status.required_prerequisites, expectedPrerequisites);
  assert.equal(status.local_logs_are_ci_evidence, false);
  assert.equal(status.ci_logs_are_release_evidence, false);
  assert.equal(status.human_review_gate_is_system_approval, false);
});

test("runtime gate rows keep implementation and closure evidence in the future", () => {
  for (const row of rows) {
    assert.equal(
      row.later_runtime_gate_candidate_status,
      "NOT_RUNTIME_GATE_IMPLEMENTATION",
    );
    assert.equal(
      row.later_schema_validator_gate_candidate_status,
      "NOT_SCHEMA_ENFORCEMENT",
    );
    assert.equal(
      row.later_workflow_prompt_gate_candidate_status,
      "NOT_WORKFLOW_ENFORCEMENT",
    );
    assert.equal(
      row.human_professional_review_gate_status,
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL",
    );
    assert.equal(row.non_authorizations.rbac_implemented, false, row.id);
    assert.equal(row.non_authorizations.access_control_enforced, false, row.id);
    assert.equal(
      row.non_authorizations.global_authorization_model_created,
      false,
      row.id,
    );
    assert.equal(row.non_authorizations.admin_support_model_created, false, row.id);
    assert.equal(row.non_authorizations.audit_access_log_implemented, false, row.id);
    assert.equal(row.non_authorizations.retention_deletion_implemented, false, row.id);
    assert.equal(row.non_authorizations.third_party_routing_authorized, false, row.id);
    assert.equal(row.non_authorizations.raw_material_routing_implemented, false, row.id);
    assert.match(
      row.required_implementation_evidence.join("\n"),
      /separate .* implementation PR|separate runtime registry\/lookup PR/,
      row.id,
    );
    assert.match(row.required_test_evidence.join("\n"), /tests|CI evidence/i, row.id);
  }
});

test("helper outputs across imported governance modules do not emit positive claims", () => {
  const helperOutputs = [
    rows,
    runtimeGate.getRuntimeGateCandidateStatusInventoryRow(expectedRowIds[0]),
    runtimeGate.classifyRuntimeGateCandidateStatusInventoryRow(expectedRowIds[0]),
    runtimeGate.getRuntimeGateCandidateStatusInventoryRow("UNKNOWN"),
    runtimeGate.classifyRuntimeGateCandidateStatusInventoryRow("UNKNOWN"),
    runtimeGate.getRuntimeGateCandidateNonAuthorizationStatus(),
    runtimeGate.getRuntimeGateCandidateRequiredPrerequisites(),
    runtimeGate.listRuntimeGateCandidateNonOverclaimRules(),
    gac.listGlobalAccessControlThreatModelInventoryRows(),
    gac.getGlobalAccessControlThreatModelNonAuthorizationStatus(),
    adminSupport.listAdminSupportRuntimeReadinessStatusGaps(),
    adminSupport.getAdminSupportRuntimeReadinessNonAuthorizationStatus(),
    tpr.listThirdPartyRoutingStatusGaps(),
    tpr.getThirdPartyRoutingNonAuthorizationStatus(),
    rmr.listRawMaterialRoutingControls(),
    rmr.getRawMaterialRoutingNonAuthorizationStatus(),
    storage.listDataLocations(),
    storage.getStorageRegistryNonAuthorizationStatus(),
    rde.listRdeStorageDependencies(),
    rde.getRdeNonAuthorizationStatus(),
    aal.listAalStorageDependencies(),
    aal.listAuditAccessLogEventCandidates(),
    aal.getAalNonAuthorizationStatus(),
    rbac.deriveRbacDenyByDefaultAccessDecision({
      actor_type: "unknown",
      role_category: "unknown",
      permission_category: "unknown",
      resource_material_scope: "unknown",
    }),
    rbac.evaluateRouteCaseCapabilityNonOverclaim({
      route_evidence: true,
      case_evidence: true,
      capability_evidence: true,
    }),
  ];

  for (const output of helperOutputs) {
    assertNoPositiveClaims(output);
  }
});
