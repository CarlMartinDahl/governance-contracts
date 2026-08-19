"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const registry =
  require("../packages/governance/src/admin-support-sub-scope-clarification-selection-registry.js");
const indexExports = require("../packages/governance/src/index.js");
const rbacScope =
  require("../packages/governance/src/rbac-admin-support-scope-review-registry.js");

const repoRoot = path.resolve(__dirname, "..");
const trackedEvidencePaths = Object.freeze({
  boundary:
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_AFTER_COURT_RBAC_CROSSWALK_BOUNDARY_v1.md",
  boundaryAlignment:
    "tests/domain-admin-support-sub-scope-clarification-selection-after-court-rbac-crosswalk-boundary-alignment.test.js",
  registryProof:
    "tests/admin-support-sub-scope-clarification-selection-registry.test.js",
  rbacAlignment:
    "tests/rbac-admin-support-scope-review-registry-alignment.test.js",
  courtRbacCrosswalk:
    "tests/court-adjacent-rbac-admin-support-dependency-crosswalk.test.js",
});

const trackedEvidence = Object.fromEntries(
  Object.entries(trackedEvidencePaths).map(([key, evidencePath]) => [
    key,
    fs.readFileSync(path.join(repoRoot, evidencePath), "utf8"),
  ]),
);

const expectedRowIds = Object.freeze([
  "AS-SUBSCOPE-001_ACTOR_PATH_CATEGORIES",
  "AS-SUBSCOPE-002_PROHIBITED_MATERIAL_CLASSES",
  "AS-SUBSCOPE-003_SANITIZED_NO_RAW_ACCESS",
  "AS-SUBSCOPE-004_AUDIT_ACCESS_LOG_DEPENDENCY",
  "AS-SUBSCOPE-005_RETENTION_DELETION_DEPENDENCY",
  "AS-SUBSCOPE-006_THIRD_PARTY_ROUTING_DEPENDENCY",
  "AS-SUBSCOPE-007_HUMAN_PROFESSIONAL_REVIEW_DEPENDENCY",
  "AS-SUBSCOPE-008_FUTURE_EVIDENCE_AND_TEST_DEPENDENCY",
  "AS-SUBSCOPE-009_NON_AUTHORIZED_UNTIL_SEPARATE_CLOSURE",
]);

const expectedStatusLabels = Object.freeze([
  "DOCS_ONLY_SELECTION_BOUNDARY",
  "DOCS_ONLY",
  "PROVE_ONLY",
  "SELECTION_ONLY",
  "FUTURE_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_REVIEW_CANDIDATE_SELECTED",
  "ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_ONLY",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "PRODUCT_CANDIDATE_NONE",
  "RUNTIME_CERTIFICATION_NOT_CREATED",
  "TECHNICAL_SIGN_OFF_NOT_CREATED",
  "COURT_READY_NOT_CREATED",
  "AI_ACT_COMPLIANCE_NOT_CREATED",
  "HIGH_RISK_APPROVAL_NOT_CREATED",
]);

const expectedLineage = Object.freeze([
  "PR_29_COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_POSTURE",
  "PR_30_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_SCAFFOLD",
  "PR_31_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_ALIGNMENT_PROOF",
  "PR_32_COURT_ADJACENT_RBAC_ADMIN_SUPPORT_DEPENDENCY_CROSSWALK_PROOF",
  "PR_33_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_BOUNDARY",
  "PR_34_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_ALIGNMENT_PROOF",
]);

const falseClaimKeys = Object.freeze([
  "authorized",
  "access_granted",
  "admin_support_access_authorized",
  "admin_support_access_resolved",
  "admin_support_model_created",
  "admin_support_implementation_created",
  "rbac_implemented",
  "access_control_implemented",
  "access_control_enforced",
  "role_permission_model_created",
  "raw_private_source_material_reviewed",
  "source_package_inspected",
  "pdf_image_screenshot_metadata_inspected",
  "metadata_acquired",
  "audit_access_log_implemented",
  "retention_deletion_implemented",
  "third_party_routing_authorized",
  "provider_routing_authorized",
  "raw_material_routing_implemented",
  "runtime_gate_created",
  "runtime_gate_implemented",
  "validator_dispatch_created",
  "runtime_registry_lookup_created",
  "blocker_closure_created",
  "release_approved",
  "external_use_authorized",
  "product_candidate_selected",
  "product_candidate_authorized",
  "runtime_certification_created",
  "technical_signoff_created",
  "court_ready_created",
  "ai_act_compliance_created",
  "high_risk_approval_created",
  "security_finding_created",
  "vulnerability_finding_created",
  "severity_assigned",
  "remediation_recommended",
  "remediation_implemented",
  "legal_clinical_evidentiary_case_truth_conclusion_created",
  "runtime_api_schema_package_behavior_changed",
]);

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

test("aligns registry scaffold with selected boundary tokens", () => {
  const status =
    registry.getAdminSupportSubScopeClarificationSelectionStatus();

  assertIncludesAll(trackedEvidence.boundary, [
    "ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_AFTER_COURT_RBAC_CROSSWALK_BOUNDARY",
    "DOCS_ONLY_SELECTION_BOUNDARY",
    "DOCS_ONLY",
    "PROVE_ONLY",
    "SELECTION_ONLY",
    "FUTURE_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_REVIEW_CANDIDATE_SELECTED",
    "ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_ONLY",
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
  ]);
  assert.deepEqual(status.status_labels, expectedStatusLabels);
  assert.deepEqual(status.lineage, expectedLineage);
  assert.equal(status.implementation_created, false);
  assert.equal(status.runtime_api_schema_package_behavior_changed, false);
});

test("aligns registry rows with scaffold proof and PR lineage", () => {
  const rows =
    registry.listAdminSupportSubScopeClarificationSelectionRows();

  assert.deepEqual(
    rows.map((row) => row.id),
    expectedRowIds,
  );
  assertIncludesAll(trackedEvidence.registryProof, expectedRowIds);
  assertIncludesAll(trackedEvidence.boundaryAlignment, [
    "PR #29 locked the court-adjacent high-risk AI readiness gap posture",
    "PR #30 made the RBAC/admin-support scope review machine-readable",
    "PR #31 added the alignment proof for the PR #30 registry",
    "PR #32 added a test-only governance dependency crosswalk proof",
  ]);

  for (const row of rows) {
    assert.equal(row.mode, "PROVE_ONLY", row.id);
    assert.equal(row.boundary_status, "DOCS_ONLY_SELECTION_BOUNDARY", row.id);
    assert.equal(row.selection_status, "FUTURE_REVIEW_CANDIDATE_ONLY", row.id);
    assert.deepEqual(row.lineage, expectedLineage, row.id);
  }
});

test("preserves unresolved admin support and model posture", () => {
  const status =
    registry.getAdminSupportSubScopeClarificationSelectionStatus();
  const rbacStatus = rbacScope.getRbacAdminSupportScopeReviewStatus();

  assertIncludesAll(status.status_labels, [
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
  ]);
  assertIncludesAll(rbacStatus.status_labels, [
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
  ]);
  assertIncludesAll(trackedEvidence.rbacAlignment, [
    "ADMIN_SUPPORT_ACCESS_INCLUDED_IN_SCOPE",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
  ]);
});

test("preserves material-risk and dependency-only boundaries", () => {
  const byId = Object.fromEntries(
    registry
      .listAdminSupportSubScopeClarificationSelectionRows()
      .map((row) => [row.id, row]),
  );

  assert.match(
    byId["AS-SUBSCOPE-001_ACTOR_PATH_CATEGORIES"]
      .material_risk_intersection,
    /cross-tenant, wrong-case, wrong-object, wrong-function, and wrong-property/,
  );
  assert.match(
    byId["AS-SUBSCOPE-004_AUDIT_ACCESS_LOG_DEPENDENCY"].dependency_only,
    /no audit\/access-log implementation/,
  );
  assert.match(
    byId["AS-SUBSCOPE-005_RETENTION_DELETION_DEPENDENCY"].dependency_only,
    /no lifecycle execution/,
  );
  assert.match(
    byId["AS-SUBSCOPE-006_THIRD_PARTY_ROUTING_DEPENDENCY"].dependency_only,
    /no route authorization/,
  );
  assert.match(
    byId["AS-SUBSCOPE-008_FUTURE_EVIDENCE_AND_TEST_DEPENDENCY"]
      .dependency_only,
    /no runtime gate, validator dispatch, or registry lookup/,
  );
  assert.match(
    byId["AS-SUBSCOPE-009_NON_AUTHORIZED_UNTIL_SEPARATE_CLOSURE"]
      .dependency_only,
    /no blocker closure/,
  );
});

test("preserves review gate and readiness boundaries", () => {
  const status =
    registry.getAdminSupportSubScopeClarificationSelectionStatus();

  assertIncludesAll(status.status_labels, [
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "RUNTIME_CERTIFICATION_NOT_CREATED",
    "TECHNICAL_SIGN_OFF_NOT_CREATED",
    "COURT_READY_NOT_CREATED",
    "AI_ACT_COMPLIANCE_NOT_CREATED",
    "HIGH_RISK_APPROVAL_NOT_CREATED",
  ]);
  assertIncludesAll(trackedEvidence.courtRbacCrosswalk, [
    "CAHR-AI-GAP-001_RBAC_ACCESS_CONTROL",
    "CAHR-AI-GAP-010_HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
  ]);
});

test("keeps unknown row behavior fail-closed and helpers immutable", () => {
  const unknown =
    registry.getAdminSupportSubScopeClarificationSelectionRow("missing");
  const rows =
    registry.listAdminSupportSubScopeClarificationSelectionRows();
  const registryCopy =
    registry.getAdminSupportSubScopeClarificationSelectionRegistry();

  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.deepEqual(unknown.allowed_material_classes, []);
  assert.equal(unknown.non_authorizations.authorized, false);
  assert.equal(unknown.non_authorizations.access_granted, false);
  assert.equal(
    unknown.non_authorizations.admin_support_access_authorized,
    false,
  );
  assert.throws(
    () => {
      rows[0].mode = "MUTATED";
    },
    /read only|Cannot assign/,
  );
  assert.throws(
    () => {
      registryCopy["AS-SUBSCOPE-001_ACTOR_PATH_CATEGORIES"].mode = "MUTATED";
    },
    /read only|Cannot assign/,
  );
});

test("preserves non-authorization flags across registry and index export", () => {
  const registryCopy =
    registry.getAdminSupportSubScopeClarificationSelectionRegistry();
  const status =
    registry.getAdminSupportSubScopeClarificationSelectionStatus();
  const indexRows =
    indexExports.listAdminSupportSubScopeClarificationSelectionRows();

  assert.deepEqual(
    indexRows.map((row) => row.id),
    expectedRowIds,
  );
  assert.equal(
    indexExports.ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
      .PROVE_ONLY,
    "PROVE_ONLY",
  );
  assertFalseClaimsStayFalse(registryCopy);
  assertFalseClaimsStayFalse(status);
  assertFalseClaimsStayFalse(indexRows);
});
