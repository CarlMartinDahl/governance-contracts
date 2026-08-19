"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const registry = require("../packages/governance/src/admin-support-sub-scope-clarification-selection-registry.js");
const indexExports = require("../packages/governance/src/index.js");

const expectedStatusLabels = [
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
];

const expectedCategories = [
  "ACTOR_PATH_CATEGORIES",
  "PROHIBITED_MATERIAL_CLASSES",
  "SANITIZED_NO_RAW_ACCESS",
  "AUDIT_ACCESS_LOG_DEPENDENCY",
  "RETENTION_DELETION_DEPENDENCY",
  "THIRD_PARTY_ROUTING_DEPENDENCY",
  "HUMAN_PROFESSIONAL_REVIEW_DEPENDENCY",
  "FUTURE_EVIDENCE_AND_TEST_DEPENDENCY",
  "NON_AUTHORIZED_UNTIL_SEPARATE_CLOSURE",
];

const expectedRowIds = [
  "AS-SUBSCOPE-001_ACTOR_PATH_CATEGORIES",
  "AS-SUBSCOPE-002_PROHIBITED_MATERIAL_CLASSES",
  "AS-SUBSCOPE-003_SANITIZED_NO_RAW_ACCESS",
  "AS-SUBSCOPE-004_AUDIT_ACCESS_LOG_DEPENDENCY",
  "AS-SUBSCOPE-005_RETENTION_DELETION_DEPENDENCY",
  "AS-SUBSCOPE-006_THIRD_PARTY_ROUTING_DEPENDENCY",
  "AS-SUBSCOPE-007_HUMAN_PROFESSIONAL_REVIEW_DEPENDENCY",
  "AS-SUBSCOPE-008_FUTURE_EVIDENCE_AND_TEST_DEPENDENCY",
  "AS-SUBSCOPE-009_NON_AUTHORIZED_UNTIL_SEPARATE_CLOSURE",
];

const requiredFields = [
  "id",
  "category",
  "sub_scope",
  "mode",
  "boundary_status",
  "selection_status",
  "status_labels",
  "lineage",
  "allowed_material_classes",
  "prohibited_material_classes",
  "material_risk_intersection",
  "dependency_only",
  "current_posture",
  "future_review_target",
  "future_review_question",
  "closure_status",
  "implementation_scope",
  "non_authorizations",
];

const expectedLineage = [
  "PR_29_COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_POSTURE",
  "PR_30_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_SCAFFOLD",
  "PR_31_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_ALIGNMENT_PROOF",
  "PR_32_COURT_ADJACENT_RBAC_ADMIN_SUPPORT_DEPENDENCY_CROSSWALK_PROOF",
  "PR_33_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_BOUNDARY",
  "PR_34_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_ALIGNMENT_PROOF",
];

const falseClaimKeys = [
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
];

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
    for (const key of falseClaimKeys) {
      if (Object.hasOwn(object, key)) {
        assert.equal(object[key], false, key);
      }
    }
  }
}

test("admin/support sub-scope selection registry exports status labels", () => {
  assert.deepEqual(
    registry.listAdminSupportSubScopeClarificationSelectionStatusLabels(),
    expectedStatusLabels,
  );
  assert.deepEqual(
    registry.getAdminSupportSubScopeClarificationSelectionStatus()
      .status_labels,
    expectedStatusLabels,
  );
});

test("registry rows cover the selected sub-scope clarification categories", () => {
  assert.deepEqual(
    registry.listAdminSupportSubScopeClarificationSelectionCategories(),
    expectedCategories,
  );

  const rows =
    registry.listAdminSupportSubScopeClarificationSelectionRows();
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
    assert.equal(row.mode, "PROVE_ONLY", row.id);
    assert.equal(row.boundary_status, "DOCS_ONLY_SELECTION_BOUNDARY", row.id);
    assert.equal(row.selection_status, "FUTURE_REVIEW_CANDIDATE_ONLY", row.id);
    assert.equal(row.closure_status, "NO_BLOCKER_CLOSURE_CREATED", row.id);
    assert.equal(row.implementation_scope, "NO_IMPLEMENTATION_CREATED", row.id);
  }
});

test("lineage and future review question are preserved", () => {
  const status =
    registry.getAdminSupportSubScopeClarificationSelectionStatus();

  assert.deepEqual(status.lineage, expectedLineage);
  assert.match(
    status.future_review_question,
    /smallest PROVE_ONLY admin\/support sub-scope clarification/,
  );
  assert.match(status.future_review_question, /admin\/support actor paths/);
  assert.match(status.future_review_question, /prohibited material classes/);
  assert.match(status.future_review_question, /audit dependencies/);
  assert.match(status.future_review_question, /retention\/deletion dependencies/);
  assert.match(status.future_review_question, /third-party routing constraints/);
  assert.match(
    status.future_review_question,
    /human\/professional review boundaries/,
  );
  assert.match(status.future_review_question, /without creating implementation/);
});

test("admin/support unresolved posture and non-authorizations are preserved", () => {
  const rows =
    registry.listAdminSupportSubScopeClarificationSelectionRows();
  const adminRow = registry.getAdminSupportSubScopeClarificationSelectionRow(
    "AS-SUBSCOPE-003_SANITIZED_NO_RAW_ACCESS",
  );

  assert.equal(adminRow.current_posture, "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED");
  assert.match(adminRow.dependency_only, /not current access authorization/);

  for (const row of rows) {
    assert.deepEqual(row.status_labels, expectedStatusLabels, row.id);
    assert.deepEqual(row.lineage, expectedLineage, row.id);
    assertNoPositiveClaims(row);
  }
});

test("material-risk intersections are represented as risks and dependencies only", () => {
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
    byId["AS-SUBSCOPE-002_PROHIBITED_MATERIAL_CLASSES"].sub_scope,
    /raw\/private\/source, source packages, PDF\/image\/screenshot\/metadata/,
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
    byId["AS-SUBSCOPE-007_HUMAN_PROFESSIONAL_REVIEW_DEPENDENCY"]
      .dependency_only,
    /not system approval/,
  );
});

test("unknown sub-scope rows fail closed", () => {
  const unknown =
    registry.getAdminSupportSubScopeClarificationSelectionRow("missing");

  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.category, "UNKNOWN_NOT_EVIDENCED");
  assert.deepEqual(unknown.lineage, []);
  assert.deepEqual(unknown.allowed_material_classes, []);
  assert.equal(unknown.non_authorizations.authorized, false);
  assert.equal(unknown.non_authorizations.access_granted, false);
  assert.equal(unknown.non_authorizations.admin_support_access_authorized, false);
});

test("helpers are static copies and do not expose positive claims", () => {
  const registryCopy =
    registry.getAdminSupportSubScopeClarificationSelectionRegistry();
  const rowsCopy =
    registry.listAdminSupportSubScopeClarificationSelectionRows();
  const statusCopy =
    registry.getAdminSupportSubScopeClarificationSelectionStatus();

  assert.throws(
    () => {
      registryCopy["AS-SUBSCOPE-001_ACTOR_PATH_CATEGORIES"].mode = "MUTATED";
    },
    /read only|Cannot assign/,
  );
  assert.throws(
    () => {
      rowsCopy[0].mode = "MUTATED";
    },
    /read only|Cannot assign/,
  );
  assert.throws(
    () => {
      statusCopy.status_labels.push("MUTATED");
    },
    /object is not extensible|Cannot add property/,
  );

  assert.equal(
    registry.getAdminSupportSubScopeClarificationSelectionRow(
      "AS-SUBSCOPE-001_ACTOR_PATH_CATEGORIES",
    ).mode,
    "PROVE_ONLY",
  );
  assert.deepEqual(
    registry.getAdminSupportSubScopeClarificationSelectionStatus()
      .status_labels,
    expectedStatusLabels,
  );

  assertNoPositiveClaims(registryCopy);
  assertNoPositiveClaims(rowsCopy);
  assertNoPositiveClaims(statusCopy);
});

test("index exports the admin/support sub-scope selection registry module", () => {
  assert.equal(
    indexExports.ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_STATUS
      .PROVE_ONLY,
    "PROVE_ONLY",
  );
  assert.equal(
    typeof indexExports.getAdminSupportSubScopeClarificationSelectionRegistry,
    "function",
  );
  assert.deepEqual(
    indexExports
      .listAdminSupportSubScopeClarificationSelectionRows()
      .map((row) => row.id),
    expectedRowIds,
  );
});
