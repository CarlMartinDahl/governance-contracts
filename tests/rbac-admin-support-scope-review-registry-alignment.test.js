"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const registry = require("../packages/governance/src/rbac-admin-support-scope-review-registry.js");

const repoRoot = path.resolve(__dirname, "..");
const trackedDocPaths = Object.freeze([
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_P4_ADMIN_SUPPORT_BYPASS_PREVENTION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_D001_RBAC_ADMIN_SUPPORT_AFTER_DATA_HANDLING_CONTROL_PLAN_BOUNDARY_v1.md",
]);

const docs = Object.fromEntries(
  trackedDocPaths.map((docPath) => [
    docPath,
    fs.readFileSync(path.join(repoRoot, docPath), "utf8"),
  ]),
);

const docsCorpus = Object.values(docs).join("\n");
const rows = registry.listRbacAdminSupportScopeReviewRows();

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

const expectedDocTokens = [
  "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS",
  "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_FEASIBLE_AS_PROVE_ONLY",
  "ADMIN_SUPPORT_ACCESS_INCLUDED_IN_SCOPE",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
  "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
  "SOURCE_PACKAGE_NOT_INSPECTED",
  "PDF_IMAGE_SCREENSHOT_METADATA_NOT_INSPECTED",
  "METADATA_NOT_ACQUIRED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "NO_SECURITY_FINDING_CREATED",
  "NO_VULNERABILITY_FINDING_CREATED",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "NO_REMEDIATION_IMPLEMENTED",
  "NO_BLOCKER_RESOLVED",
  "PRODUCT_CANDIDATE_NONE",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
];

const expectedDocPhrases = [
  "RBAC scope review does not mean RBAC implementation",
  "Admin/support access analysis does not mean admin/support model exists",
  "Runtime gate dependency does not mean runtime gate implementation exists",
  "Validator/schema dependency does not mean validator dispatch exists",
  "Registry/lookup dependency does not mean registry/lookup exists",
  "Product candidate remains none",
  "External-use remains unauthorized",
  "Human/professional review remains release gate",
  "admin/support access is explicitly included in scope and remains unresolved",
  "Third-party model/API routing is deny-by-default",
  "Runtime gate inventory remains deferred",
  "local logs are not CI evidence",
];

const falseClaimKeys = [
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

function assertFalseClaimsStayFalse(value) {
  for (const object of collectObjects(value)) {
    for (const key of falseClaimKeys) {
      if (Object.hasOwn(object, key)) {
        assert.equal(object[key], false, key);
      }
    }
  }
}

test("tracked governance boundaries align with prove-only scope posture", () => {
  assertIncludesAll(docsCorpus, expectedDocTokens);
  assertIncludesAll(docsCorpus, expectedDocPhrases);

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

test("scope-underlag rows preserve selected categories and required fields", () => {
  assert.deepEqual(
    registry.listRbacAdminSupportScopeReviewCategories(),
    expectedCategories,
  );
  assert.deepEqual(
    rows.map((row) => row.id),
    expectedRowIds,
  );
  assert.deepEqual(
    rows.map((row) => row.category),
    expectedCategories,
  );

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), requiredFields, row.id);
    assert.equal(
      row.review_conclusion,
      "SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG",
      row.id,
    );
    assert.equal(row.blocker_status, "OPEN_NOT_CLOSED", row.id);
    assert.equal(row.closure_status, "NO_BLOCKER_CLOSURE_CREATED", row.id);
    assert.equal(row.implementation_scope, "NO_IMPLEMENTATION_CREATED", row.id);
  }
});

test("category rows preserve dependency surfaces without creating gates", () => {
  const byCategory = new Map(rows.map((row) => [row.category, row]));

  assert.deepEqual(
    byCategory.get("ACTOR_TYPES").actor_types,
    [
      "CASE_OWNER",
      "HUMAN_REVIEWER",
      "PROFESSIONAL_REVIEWER",
      "ADMIN_SUPPORT_OPERATOR",
      "WORKFLOW_AGENT",
      "SERVICE_ACCOUNT",
    ],
  );
  assert.deepEqual(byCategory.get("ROLE_CATEGORIES").role_categories, [
    "CASE_SCOPED_OWNER_ROLE",
    "HUMAN_REVIEW_ROLE",
    "ADMIN_SUPPORT_REVIEW_SUPPORT_ROLE",
    "LOG_VIEWER_FUTURE_ROLE",
  ]);
  assert.deepEqual(
    byCategory.get("PERMISSION_CATEGORIES").permission_categories,
    [
      "READ_SANITIZED_REVIEW_SIGNAL",
      "READ_GOVERNANCE_REGISTRY_STATUS",
      "REQUEST_HUMAN_REVIEW",
      "VIEW_NO_CONTENT_AUDIT_STATUS",
    ],
  );
  assert.equal(
    byCategory.get("ADMIN_SUPPORT_ACCESS_RULES").admin_support_access_rule,
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED_AND_BLOCKED",
  );
  assert.equal(
    byCategory.get("HUMAN_PROFESSIONAL_REVIEW_DEPENDENCIES")
      .human_professional_review_dependency,
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  );
  assert.equal(
    byCategory.get("AUDIT_LOG_DEPENDENCIES").audit_log_dependency,
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_REQUIRED_IN_FUTURE",
  );
  assert.equal(
    byCategory.get("RETENTION_DELETION_DEPENDENCIES")
      .retention_deletion_dependency,
    "RETENTION_DELETION_PURGE_ERASURE_ENCRYPTION_KEY_MANAGEMENT_NOT_IMPLEMENTED",
  );
  assert.equal(
    byCategory.get("THIRD_PARTY_ROUTING_CONSTRAINTS")
      .third_party_routing_constraint,
    "THIRD_PARTY_API_ROUTING_NOT_AUTHORIZED",
  );
  assert.equal(
    byCategory.get("FUTURE_RUNTIME_GATE_DEPENDENCIES")
      .future_runtime_gate_dependency,
    "RUNTIME_GATE_VALIDATOR_DISPATCH_REGISTRY_LOOKUP_NOT_CREATED",
  );
});

test("material and inspection boundaries remain denied or unresolved", () => {
  const status = registry.getRbacAdminSupportScopeReviewStatus();
  const materialRow = registry.getRbacAdminSupportScopeReviewRow(
    "RBAC-AS-SCOPE-004_MATERIAL_CLASS_BOUNDARIES",
  );

  assert.equal(status.raw_private_source_case_material_reviewed, false);
  assert.equal(status.source_packages_reviewed, false);
  assert.equal(status.local_logs_read, false);
  assert.equal(status.ci_logs_read, false);
  assert.equal(
    materialRow.material_boundary,
    "raw/private/source/source-package/PDF/image/screenshot/metadata access not authorized",
  );
  assert.equal(
    materialRow.admin_support_access_rule,
    "ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_BLOCKED",
  );
  assertIncludesAll(materialRow.prohibited_material_classes, [
    "RAW_PRIVATE_SOURCE_MATERIAL",
    "SOURCE_PACKAGE_MATERIAL",
    "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
    "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
  ]);
});

test("unknown scope rows fail closed and helper output stays non-authorizing", () => {
  const unknown = registry.getRbacAdminSupportScopeReviewRow("NOPE");

  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.review_conclusion, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.non_authorizations.authorized, false);
  assert.equal(unknown.non_authorizations.access_granted, false);

  assertFalseClaimsStayFalse([
    registry.getRbacAdminSupportScopeReviewRegistry(),
    registry.getRbacAdminSupportScopeReviewStatus(),
    registry.listRbacAdminSupportScopeReviewRows(),
    unknown,
  ]);
});
