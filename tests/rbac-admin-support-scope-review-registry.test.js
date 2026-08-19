"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const registry = require("../packages/governance/src/rbac-admin-support-scope-review-registry.js");
const indexExports = require("../packages/governance/src/index.js");

const expectedStatusLabels = [
  "PROVE_ONLY",
  "GOVERNANCE_SCOPE_ONLY",
  "REVIEW_SUPPORT_ONLY",
  "SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "PRODUCT_CANDIDATE_NONE",
  "RUNTIME_CERTIFICATION_NOT_CREATED",
  "TECHNICAL_SIGN_OFF_NOT_CREATED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
];

const expectedCategories = [
  "ACTOR_TYPES",
  "ROLE_CATEGORIES",
  "PERMISSION_CATEGORIES",
  "MATERIAL_CLASS_BOUNDARIES",
  "ADMIN_SUPPORT_ACCESS_RULES",
  "HUMAN_PROFESSIONAL_REVIEW_DEPENDENCIES",
  "AUDIT_LOG_DEPENDENCIES",
  "RETENTION_DELETION_DEPENDENCIES",
  "THIRD_PARTY_ROUTING_CONSTRAINTS",
  "FUTURE_RUNTIME_GATE_DEPENDENCIES",
];

const expectedRowIds = [
  "RBAC-AS-SCOPE-001_ACTOR_TYPES",
  "RBAC-AS-SCOPE-002_ROLE_CATEGORIES",
  "RBAC-AS-SCOPE-003_PERMISSION_CATEGORIES",
  "RBAC-AS-SCOPE-004_MATERIAL_CLASS_BOUNDARIES",
  "RBAC-AS-SCOPE-005_ADMIN_SUPPORT_ACCESS_RULES",
  "RBAC-AS-SCOPE-006_HUMAN_PROFESSIONAL_REVIEW_DEPENDENCIES",
  "RBAC-AS-SCOPE-007_AUDIT_LOG_DEPENDENCIES",
  "RBAC-AS-SCOPE-008_RETENTION_DELETION_DEPENDENCIES",
  "RBAC-AS-SCOPE-009_THIRD_PARTY_ROUTING_CONSTRAINTS",
  "RBAC-AS-SCOPE-010_FUTURE_RUNTIME_GATE_DEPENDENCIES",
];

const requiredFields = [
  "id",
  "category",
  "actor_types",
  "role_categories",
  "permission_categories",
  "allowed_material_classes",
  "prohibited_material_classes",
  "material_boundary",
  "admin_support_access_rule",
  "human_professional_review_dependency",
  "audit_log_dependency",
  "retention_deletion_dependency",
  "third_party_routing_constraint",
  "future_runtime_gate_dependency",
  "review_conclusion",
  "status_labels",
  "blocker_status",
  "closure_status",
  "implementation_scope",
  "non_authorizations",
  "review_note",
];

const positiveClaimKeys = [
  "authorized",
  "access_granted",
  "rbac_implemented",
  "access_control_implemented",
  "access_control_enforced",
  "role_permission_model_created",
  "admin_support_model_created",
  "admin_support_access_resolved",
  "admin_support_access_authorized",
  "raw_private_source_material_reviewed",
  "raw_private_source_access_authorized",
  "source_package_access_authorized",
  "pdf_image_screenshot_metadata_access_authorized",
  "third_party_api_routing_authorized",
  "provider_routing_authorized",
  "runtime_gate_created",
  "runtime_gate_implemented",
  "validator_dispatch_created",
  "runtime_registry_lookup_created",
  "audit_access_log_implemented",
  "log_schema_created",
  "log_storage_created",
  "retention_deletion_implemented",
  "blocker_closure_created",
  "release_approved",
  "external_use_authorized",
  "product_candidate_selected",
  "product_candidate_authorized",
  "runtime_certification_created",
  "technical_signoff_created",
  "security_finding_created",
  "vulnerability_finding_created",
  "severity_assigned",
  "remediation_recommended",
  "remediation_implemented",
  "legal_clinical_evidentiary_case_truth_conclusion_created",
  "runtime_api_schema_package_behavior_changed",
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

test("RBAC/admin-support scope review status labels are exported", () => {
  assert.deepEqual(
    registry.listRbacAdminSupportScopeReviewStatusLabels(),
    expectedStatusLabels,
  );
  assert.deepEqual(
    registry.getRbacAdminSupportScopeReviewStatus().status_labels,
    expectedStatusLabels,
  );
  assert.equal(
    registry.getRbacAdminSupportScopeReviewStatus().review_conclusion,
    "SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG",
  );
});

test("scope review rows cover the selected categories", () => {
  assert.deepEqual(
    registry.listRbacAdminSupportScopeReviewCategories(),
    expectedCategories,
  );

  const rows = registry.listRbacAdminSupportScopeReviewRows();
  assert.deepEqual(
    rows.map((row) => row.id),
    expectedRowIds,
  );
  assert.deepEqual(
    rows.map((row) => row.category),
    expectedCategories,
  );

  for (const row of rows) {
    for (const field of requiredFields) {
      assert.ok(Object.hasOwn(row, field), `${row.id} missing ${field}`);
    }
    assert.equal(row.review_conclusion, "SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG");
    assert.equal(row.blocker_status, "OPEN_NOT_CLOSED");
    assert.equal(row.closure_status, "NO_BLOCKER_CLOSURE_CREATED");
    assert.equal(row.implementation_scope, "NO_IMPLEMENTATION_CREATED");
  }
});

test("admin/support and material access boundaries remain unresolved or blocked", () => {
  const status = registry.getRbacAdminSupportScopeReviewStatus();
  const materialRow = registry.getRbacAdminSupportScopeReviewRow(
    "RBAC-AS-SCOPE-004_MATERIAL_CLASS_BOUNDARIES",
  );
  const adminRow = registry.getRbacAdminSupportScopeReviewRow(
    "RBAC-AS-SCOPE-005_ADMIN_SUPPORT_ACCESS_RULES",
  );

  assert.equal(status.raw_private_source_case_material_reviewed, false);
  assert.equal(status.source_packages_reviewed, false);
  assert.equal(status.local_logs_read, false);
  assert.equal(status.ci_logs_read, false);
  assert.match(materialRow.material_boundary, /not authorized/);
  assert.equal(
    materialRow.admin_support_access_rule,
    "ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_BLOCKED",
  );
  assert.equal(
    adminRow.admin_support_access_rule,
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED_AND_BLOCKED",
  );
  assert.ok(
    materialRow.prohibited_material_classes.includes(
      "RAW_PRIVATE_SOURCE_MATERIAL",
    ),
  );
  assert.ok(
    materialRow.prohibited_material_classes.includes(
      "SOURCE_PACKAGE_MATERIAL",
    ),
  );
  assert.ok(
    materialRow.prohibited_material_classes.includes(
      "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
    ),
  );
});

test("third-party routing and runtime gates are future-only and not created", () => {
  const thirdPartyRow = registry.getRbacAdminSupportScopeReviewRow(
    "RBAC-AS-SCOPE-009_THIRD_PARTY_ROUTING_CONSTRAINTS",
  );
  const runtimeRow = registry.getRbacAdminSupportScopeReviewRow(
    "RBAC-AS-SCOPE-010_FUTURE_RUNTIME_GATE_DEPENDENCIES",
  );

  assert.equal(
    thirdPartyRow.third_party_routing_constraint,
    "THIRD_PARTY_API_ROUTING_NOT_AUTHORIZED",
  );
  assert.match(
    thirdPartyRow.material_boundary,
    /no provider payload\/prompt\/response\/token\/URL/,
  );
  assert.equal(
    runtimeRow.future_runtime_gate_dependency,
    "RUNTIME_GATE_VALIDATOR_DISPATCH_REGISTRY_LOOKUP_NOT_CREATED",
  );
  assert.equal(runtimeRow.non_authorizations.runtime_gate_created, false);
  assert.equal(runtimeRow.non_authorizations.validator_dispatch_created, false);
  assert.equal(runtimeRow.non_authorizations.runtime_registry_lookup_created, false);
});

test("unknown scope review rows fail closed", () => {
  const unknown = registry.getRbacAdminSupportScopeReviewRow("missing");

  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.deepEqual(unknown.actor_types, []);
  assert.equal(unknown.review_conclusion, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.non_authorizations.authorized, false);
  assert.equal(unknown.non_authorizations.access_granted, false);
});

test("helpers do not return positive implementation, access, approval, or closure claims", () => {
  const inspected = [
    registry.getRbacAdminSupportScopeReviewRegistry(),
    registry.getRbacAdminSupportScopeReviewStatus(),
    registry.listRbacAdminSupportScopeReviewRows(),
    registry.getRbacAdminSupportScopeReviewRow("missing"),
  ];

  for (const object of inspected.flatMap((value) => collectObjects(value))) {
    for (const key of positiveClaimKeys) {
      if (Object.hasOwn(object, key)) {
        assert.equal(object[key], false, `${key} must not be true`);
      }
    }
  }
});

test("index exports the RBAC/admin-support scope review registry module", () => {
  assert.equal(
    indexExports.RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_STATUS.PROVE_ONLY,
    "PROVE_ONLY",
  );
  assert.equal(
    typeof indexExports.getRbacAdminSupportScopeReviewRegistry,
    "function",
  );
  assert.deepEqual(
    indexExports.listRbacAdminSupportScopeReviewRows().map((row) => row.id),
    expectedRowIds,
  );
});
