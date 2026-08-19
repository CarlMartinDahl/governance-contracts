"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const rolePermission = require("../packages/governance/src/role-permission-model-status-gap-registry.js");
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
const trackedDocPaths = [
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_THIRD_PARTY_ROUTING_RUNTIME_READINESS_STATUS_GAP_SUMMARY_AFTER_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
];

const trackedDocs = trackedDocPaths.map((docPath) =>
  fs.readFileSync(path.join(repoRoot, docPath), "utf8"),
);
const docsCorpus = trackedDocs.join("\n\n");

const expectedRowIds = [
  "RP-SG-001_ACTOR_SUBJECT_MODEL_GAP",
  "RP-SG-002_ROLE_CATEGORY_MODEL_GAP",
  "RP-SG-003_PERMISSION_CATEGORY_MODEL_GAP",
  "RP-SG-004_ROLE_FIELDS_GAP",
  "RP-SG-005_PERMISSION_FIELDS_GAP",
  "RP-SG-006_ROLE_SCHEMA_GAP",
  "RP-SG-007_PERMISSION_SCHEMA_GAP",
  "RP-SG-008_TENANT_CASE_SCOPING_GAP",
  "RP-SG-009_OBJECT_LEVEL_AUTHORIZATION_GAP",
  "RP-SG-010_FUNCTION_LEVEL_AUTHORIZATION_GAP",
  "RP-SG-011_PROPERTY_LEVEL_AUTHORIZATION_OVEREXPOSURE_GAP",
  "RP-SG-012_ADMIN_SUPPORT_ROLE_PERMISSION_GAP",
  "RP-SG-013_LOG_VIEWER_RBAC_GAP",
  "RP-SG-014_AUDIT_ACCESS_LOG_DEPENDENCY_GAP",
  "RP-SG-015_RETENTION_DELETION_PERMISSION_GAP",
  "RP-SG-016_THIRD_PARTY_ROUTING_PERMISSION_GAP",
  "RP-SG-017_RAW_MATERIAL_ROUTING_PERMISSION_GAP",
  "RP-SG-018_RUNTIME_GATE_DEPENDENCY_GAP",
  "RP-SG-019_GLOBAL_AUTHORIZATION_MODEL_DEPENDENCY_GAP",
];

const expectedSurfaces = [
  "actor subject identity and subject-scope model",
  "role taxonomy and role category model",
  "permission taxonomy and permission category model",
  "persisted or request-level role fields",
  "persisted or request-level permission fields",
  "role schema and validation contract",
  "permission schema and validation contract",
  "tenant and case-scoped access-control boundary",
  "object-level authorization and BOLA/IDOR review",
  "function-level authorization review",
  "property-level authorization and data-overexposure review",
  "admin/support role-permission and access-control dependency",
  "audit/access-log viewer RBAC dependency",
  "audit/access-log implementation dependency",
  "retention/deletion operation permission dependency",
  "third-party model/API route permission dependency",
  "raw/private/source material routing permission dependency",
  "runtime/schema/workflow gate dependency on role-permission model",
  "global authorization model dependency",
];

const requiredFields = [
  "id",
  "family",
  "surface",
  "source_boundary_or_dependency",
  "current_statuses",
  "primary_absent_capability",
  "implementation_gap",
  "required_prerequisites",
  "required_test_evidence",
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
  "related_global_access_control_row_ids",
  "related_runtime_gate_candidate_ids",
  "related_rbac_boundary_status",
  "evidence_posture",
  "non_authorizations",
  "notes",
];

const docStatusTokens = [
  "DOCS_ONLY",
  "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_ONLY",
  "RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_ONLY",
  "RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_ONLY",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
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
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
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
  "This boundary creates no RBAC implementation, no access-control implementation, no role fields, no permission fields, no role schema, no permission schema",
  "This boundary resolves no blocker, creates no implementation evidence",
  "Human/professional review remains release gate.",
  "Route/case/capability evidence remains not RBAC, not full access control, not admin/support access control, and not global authorization model.",
  "Runtime gate inventory remains deferred",
  "Runtime gate dependency does not mean runtime gate implementation exists.",
  "Admin/support access remains explicitly included",
  "admin/support cannot substitute for human/professional review",
  "local logs are not CI evidence",
  "Product candidate remains none.",
  "External-use remains unauthorized.",
  "security/vulnerability findings",
  "assigns no severity",
  "recommends no remediation",
];

const expectedNonOverclaimRules = [
  "ROLE_PERMISSION_STATUS_GAP_REGISTRY does not mean ROLE_PERMISSION_MODEL",
  "ROLE_PERMISSION_ROW does not mean RBAC_IMPLEMENTATION",
  "ROLE_PERMISSION_ROW does not mean ACCESS_CONTROL_IMPLEMENTATION",
  "ACTOR_SUBJECT_MODEL_GAP does not mean SUBJECT_MODEL_CREATED",
  "ROLE_CATEGORY_MODEL_GAP does not mean ROLE_CREATED",
  "PERMISSION_CATEGORY_MODEL_GAP does not mean PERMISSION_CREATED",
  "ROLE_FIELDS_GAP does not mean ROLE_FIELDS_CREATED",
  "PERMISSION_FIELDS_GAP does not mean PERMISSION_FIELDS_CREATED",
  "ROLE_SCHEMA_GAP does not mean ROLE_SCHEMA_CREATED",
  "PERMISSION_SCHEMA_GAP does not mean PERMISSION_SCHEMA_CREATED",
  "ADMIN_SUPPORT_ROLE_PERMISSION_GAP does not mean ADMIN_SUPPORT_ACCESS_AUTHORIZED",
  "LOG_VIEWER_RBAC_GAP does not mean LOG_VIEWER_RBAC_CREATED",
  "RUNTIME_GATE_DEPENDENCY_GAP does not mean RUNTIME_GATE_IMPLEMENTATION",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean RBAC",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean FULL_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean ADMIN_SUPPORT_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE does not mean GLOBAL_AUTHORIZATION_MODEL",
  "DOCS_ONLY does not mean RUNTIME_ENFORCEMENT",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
  "HUMAN_REVIEW_GATE does not mean SYSTEM_APPROVAL",
  "STATUS_GAP_ROW does not mean SECURITY_FINDING",
  "STATUS_GAP_ROW does not mean SEVERITY_ASSIGNED",
  "STATUS_GAP_ROW does not mean REMEDIATION_RECOMMENDED",
];

const expectedPrerequisites = [
  "complete role/permission model",
  "actor/subject model",
  "role taxonomy",
  "permission taxonomy",
  "role fields",
  "permission fields",
  "role schema",
  "permission schema",
  "admin/support model",
  "admin/support access-control model",
  "log viewer RBAC model",
  "audit/access-log model",
  "no-content access-control event policy",
  "log schema/storage policy",
  "retention/deletion/purge/erasure policy",
  "encryption/key-management policy",
  "third-party provider status registry",
  "third-party provider route denial tests",
  "raw-material routing denial policy",
  "runtime gate implementation plan",
  "schema/validator gate implementation plan",
  "workflow/prompt gate implementation plan",
  "validator dispatch plan",
  "registry/lookup plan",
  "global access-control model",
  "global authorization model",
  "object/function/property authorization review",
  "tenant isolation tests",
  "wrong-tenant tests",
  "wrong-case tests",
  "wrong-object tests",
  "wrong-function tests",
  "wrong-property tests",
  "allow/deny tests",
  "no-raw/no-private/no-source-locator policy",
  "CI test plan",
  "external-use non-authorization wording",
  "non-proof/non-route-readiness wording",
  "human/professional review gate",
];

const positiveClaimKeys = new Set([
  "authorized",
  "access_granted",
  "rbac_implemented",
  "access_control_implemented",
  "access_control_enforced",
  "role_permission_model_created",
  "role_fields_created",
  "permission_fields_created",
  "role_schema_created",
  "permission_schema_created",
  "admin_support_access_authorized",
  "admin_support_runtime_access_authorized",
  "admin_support_model_created",
  "log_viewer_rbac_created",
  "runtime_gate_implemented",
  "runtime_gate_enforced",
  "schema_gate_enforced",
  "workflow_gate_enforced",
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
]);

const rows = rolePermission.listRolePermissionModelStatusGapRows();

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

test("tracked docs use surface/status alignment because literal RP-SG anchors are absent", () => {
  assert.equal(
    /RP-SG-[0-9]{3}/.test(docsCorpus),
    false,
    "Literal RP-SG doc anchors are absent; this test uses surface/status alignment.",
  );

  assertIncludesAll(docsCorpus, docStatusTokens);
  assertIncludesAll(docsCorpus, docBoundaryPhrases);
});

test("role-permission status-gap registry exposes exact rows and surfaces", () => {
  assert.deepEqual(rows.map((row) => row.id), expectedRowIds);
  assert.deepEqual(rows.map((row) => row.surface), expectedSurfaces);

  assertIncludesAll(
    Object.values(rolePermission.ROLE_PERMISSION_MODEL_STATUS_GAP_FAMILIES),
    [
      "ACTOR_SUBJECT_MODEL_GAP",
      "ROLE_CATEGORY_MODEL_GAP",
      "PERMISSION_CATEGORY_MODEL_GAP",
      "ROLE_FIELDS_GAP",
      "PERMISSION_FIELDS_GAP",
      "ROLE_SCHEMA_GAP",
      "PERMISSION_SCHEMA_GAP",
      "TENANT_CASE_SCOPING_GAP",
      "OBJECT_LEVEL_AUTHORIZATION_GAP",
      "FUNCTION_LEVEL_AUTHORIZATION_GAP",
      "PROPERTY_LEVEL_AUTHORIZATION_OVEREXPOSURE_GAP",
      "ADMIN_SUPPORT_ROLE_PERMISSION_GAP",
      "LOG_VIEWER_RBAC_GAP",
      "AUDIT_ACCESS_LOG_DEPENDENCY_GAP",
      "RETENTION_DELETION_PERMISSION_GAP",
      "THIRD_PARTY_ROUTING_PERMISSION_GAP",
      "RAW_MATERIAL_ROUTING_PERMISSION_GAP",
      "RUNTIME_GATE_DEPENDENCY_GAP",
      "GLOBAL_AUTHORIZATION_MODEL_DEPENDENCY_GAP",
    ],
  );
});

test("every row has required fields and references only known tracked registries", () => {
  const knownMaterialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const knownStorageIds = new Set(Object.keys(storage.DATA_LOCATION_REGISTRY));
  const knownAdminGapIds = new Set(
    Object.values(
      adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
    ).map((row) => row.id),
  );
  const knownTprGapIds = new Set(
    Object.values(tpr.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY).map(
      (row) => row.id,
    ),
  );
  const knownRmrControlIds = new Set(
    Object.values(rmr.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY).map(
      (row) => row.control_id,
    ),
  );
  const knownAalEventIds = new Set(
    Object.values(aal.AUDIT_ACCESS_LOG_EVENT_CANDIDATES).map((row) => row.id),
  );
  const knownLifecycleFamilies = new Set(
    Object.values(rde.LIFECYCLE_CONTROL_FAMILIES),
  );
  const knownGacRowIds = new Set(
    Object.values(
      gac.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
    ).map((row) => row.id),
  );
  const knownRuntimeGateIds = new Set(
    Object.values(
      runtimeGate.RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
    ).map((row) => row.id),
  );

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), requiredFields, row.id);
    assert.equal(row.non_authorized_until_closure, true, row.id);
    assert.equal(
      row.current_authorization_status,
      "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
      row.id,
    );
    assert.equal(
      row.related_rbac_boundary_status,
      "RBAC_DENY_BY_DEFAULT_SCAFFOLD_ONLY",
      row.id,
    );

    for (const materialClass of row.related_material_classes) {
      assert.equal(knownMaterialClasses.has(materialClass), true, materialClass);
    }
    for (const locationId of row.related_storage_location_ids) {
      assert.equal(knownStorageIds.has(locationId), true, locationId);
    }
    for (const gapId of row.related_admin_support_gap_ids) {
      assert.equal(knownAdminGapIds.has(gapId), true, gapId);
    }
    for (const gapId of row.related_third_party_status_gap_ids) {
      assert.equal(knownTprGapIds.has(gapId), true, gapId);
    }
    for (const controlId of row.related_raw_material_routing_control_ids) {
      assert.equal(knownRmrControlIds.has(controlId), true, controlId);
    }
    for (const eventId of row.related_aal_event_candidate_ids) {
      assert.equal(knownAalEventIds.has(eventId), true, eventId);
    }
    for (const family of row.related_lifecycle_families) {
      assert.equal(knownLifecycleFamilies.has(family), true, family);
    }
    for (const rowId of row.related_global_access_control_row_ids) {
      assert.equal(knownGacRowIds.has(rowId), true, rowId);
    }
    for (const rowId of row.related_runtime_gate_candidate_ids) {
      assert.equal(knownRuntimeGateIds.has(rowId), true, rowId);
    }
  }
});

test("high-risk material and future storage boundaries remain denied", () => {
  for (const denial of Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED)) {
    assert.equal(denial.denied, true, denial.material_class);
    assert.equal(denial.authorized, false, denial.material_class);
    assert.equal(denial.external_use_authorized, false, denial.material_class);
    assert.equal(denial.product_candidate_authorized, false, denial.material_class);
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

test("unknown lookups fail closed and implementation helpers remain false", () => {
  const unknown = rolePermission.getRolePermissionModelStatusGapRow("NOPE");
  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.current_authorization_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.non_authorizations.authorized, false);
  assert.equal(unknown.non_authorizations.rbac_implemented, false);
  assert.equal(unknown.non_authorizations.access_control_implemented, false);
  assert.equal(unknown.non_authorizations.security_finding_created, false);
  assert.equal(rolePermission.hasRolePermissionModelStatusGapRow("NOPE"), false);

  const classification =
    rolePermission.classifyRolePermissionModelStatusGapRow("NOPE");
  assert.equal(classification.known, false);
  assert.equal(classification.classification, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(classification.authorized, false);
  assert.equal(classification.rbac_implemented, false);
  assert.equal(classification.access_control_implemented, false);
  assert.equal(classification.security_finding_created, false);

  assert.equal(rolePermission.isRolePermissionModelImplemented("anything"), false);
  assert.equal(rolePermission.isRbacImplemented("anything"), false);
  assert.equal(rolePermission.isAccessControlImplemented("anything"), false);
  assert.equal(rolePermission.isRoleSchemaCreated("anything"), false);
  assert.equal(rolePermission.isPermissionSchemaCreated("anything"), false);
  assert.equal(rolePermission.isAdminSupportAccessAuthorized("anything"), false);
  assert.equal(rolePermission.isLogViewerRbacCreated("anything"), false);
  assert.equal(rolePermission.isSecurityFindingCreated("anything"), false);
});

test("non-overclaim rules prerequisites and evidence boundaries remain explicit", () => {
  assertIncludesAll(
    rolePermission.listRolePermissionModelNonOverclaimRules(),
    expectedNonOverclaimRules,
  );
  assertIncludesAll(
    rolePermission.getRolePermissionModelRequiredPrerequisites(),
    expectedPrerequisites,
  );

  const status = rolePermission.getRolePermissionModelNonAuthorizationStatus();
  assert.equal(status.local_logs_are_ci_evidence, false);
  assert.equal(status.ci_logs_are_release_evidence, false);
  assert.equal(status.human_review_gate_is_system_approval, false);
  assert.equal(status.route_case_capability_evidence_is_rbac, false);
  assert.equal(status.route_case_capability_evidence_is_full_access_control, false);
  assert.equal(
    status.route_case_capability_evidence_is_admin_support_access_control,
    false,
  );
  assert.equal(
    status.route_case_capability_evidence_is_global_authorization_model,
    false,
  );
  assert.equal(status.role_permission_model_created, false);
  assert.equal(status.rbac_implemented, false);
  assert.equal(status.access_control_implemented, false);
  assert.equal(status.security_finding_created, false);
  assert.equal(status.severity_assigned, false);
  assert.equal(status.remediation_recommended, false);
});

test("row and helper output keeps model gaps future-only and non-authorizing", () => {
  for (const row of rows) {
    assertIncludesAll(row.current_statuses, [
      "DOCS_ONLY_STATUS_GAP",
      "REGISTRY_SCAFFOLD_ONLY",
      "FUTURE_MODEL_CANDIDATE_ONLY",
      "DENY_BY_DEFAULT",
      "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
      "BLOCKED_BY_ROLE_PERMISSION_MODEL",
    ]);
    assert.equal(
      row.evidence_posture,
      "REGISTRY_SCAFFOLD_EVIDENCE",
      row.id,
    );
    assert.equal(row.non_authorizations.authorized, false, row.id);
    assert.equal(row.non_authorizations.access_granted, false, row.id);
    assert.equal(row.non_authorizations.rbac_implemented, false, row.id);
    assert.equal(
      row.non_authorizations.access_control_implemented,
      false,
      row.id,
    );
    assert.equal(
      row.non_authorizations.role_permission_model_created,
      false,
      row.id,
    );
    assert.equal(row.non_authorizations.role_fields_created, false, row.id);
    assert.equal(row.non_authorizations.permission_fields_created, false, row.id);
    assert.equal(row.non_authorizations.role_schema_created, false, row.id);
    assert.equal(row.non_authorizations.permission_schema_created, false, row.id);
    assert.equal(
      row.non_authorizations.admin_support_access_authorized,
      false,
      row.id,
    );
    assert.equal(row.non_authorizations.log_viewer_rbac_created, false, row.id);
    assert.equal(row.non_authorizations.runtime_gate_implemented, false, row.id);
    assert.equal(row.non_authorizations.validator_dispatch_created, false, row.id);
    assert.equal(
      row.non_authorizations.runtime_registry_lookup_created,
      false,
      row.id,
    );
    assert.equal(
      row.non_authorizations.global_authorization_model_created,
      false,
      row.id,
    );
    assert.equal(row.non_authorizations.security_finding_created, false, row.id);
    assert.equal(row.non_authorizations.vulnerability_finding_created, false, row.id);
    assert.equal(row.non_authorizations.severity_assigned, false, row.id);
    assert.equal(row.non_authorizations.remediation_recommended, false, row.id);
    assert.equal(row.non_authorizations.remediation_implemented, false, row.id);
    assert.equal(row.non_authorizations.release_approved, false, row.id);
    assert.equal(row.non_authorizations.external_use_authorized, false, row.id);
    assert.equal(row.non_authorizations.product_candidate_authorized, false, row.id);
    assert.equal(
      row.non_authorizations.runtime_certification_created,
      false,
      row.id,
    );
    assert.equal(row.non_authorizations.technical_signoff_created, false, row.id);
  }
});

test("recursive imported helper outputs contain no positive claims", () => {
  const helperOutputs = [
    rolePermission,
    rows,
    rolePermission.ROLE_PERMISSION_MODEL_STATUS_GAP_REGISTRY,
    rolePermission.getRolePermissionModelStatusGapRow(expectedRowIds[0]),
    rolePermission.classifyRolePermissionModelStatusGapRow(expectedRowIds[0]),
    rolePermission.getRolePermissionModelStatusGapRow("UNKNOWN"),
    rolePermission.classifyRolePermissionModelStatusGapRow("UNKNOWN"),
    rolePermission.getRolePermissionModelNonAuthorizationStatus(),
    runtimeGate.RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_REGISTRY,
    gac.GLOBAL_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_REGISTRY,
    adminSupport.ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_REGISTRY,
    tpr.THIRD_PARTY_ROUTING_STATUS_GAP_REGISTRY,
    rmr.RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
    storage.DATA_LOCATION_REGISTRY,
    storage.HIGH_RISK_MATERIAL_CLASSES_DENIED,
    rde.RETENTION_DELETION_ENCRYPTION_STORAGE_DEPENDENCY_REGISTRY,
    aal.AUDIT_ACCESS_LOG_STORAGE_DEPENDENCY_REGISTRY,
    rbac,
  ];

  for (const output of helperOutputs) {
    assertNoPositiveClaims(output);
  }
});
