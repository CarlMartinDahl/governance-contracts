"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const courtAdjacent =
  require("../packages/governance/src/court-adjacent-high-risk-ai-readiness-gap-matrix-registry.js");
const rbacScope =
  require("../packages/governance/src/rbac-admin-support-scope-review-registry.js");

const repoRoot = path.resolve(__dirname, "..");
const trackedEvidencePaths = Object.freeze([
  "tests/rbac-admin-support-scope-review-registry.test.js",
  "tests/rbac-admin-support-scope-review-registry-alignment.test.js",
]);

const trackedEvidence = Object.fromEntries(
  trackedEvidencePaths.map((evidencePath) => [
    evidencePath,
    fs.readFileSync(path.join(repoRoot, evidencePath), "utf8"),
  ]),
);
const trackedEvidenceCorpus = Object.values(trackedEvidence).join("\n");

const courtRows =
  courtAdjacent.listCourtAdjacentHighRiskAiReadinessGapRows();
const rbacRows = rbacScope.listRbacAdminSupportScopeReviewRows();

const courtRowsById = new Map(courtRows.map((row) => [row.id, row]));
const rbacRowsByCategory = new Map(
  rbacRows.map((row) => [row.category, row]),
);

const expectedCourtAdjacentRowIds = [
  "CAHR-AI-GAP-001_RBAC_ACCESS_CONTROL",
  "CAHR-AI-GAP-002_AUDIT_ACCESS_LOG",
  "CAHR-AI-GAP-003_DATA_LIFECYCLE_RDE",
  "CAHR-AI-GAP-004_PROVIDER_THIRD_PARTY_ROUTING",
  "CAHR-AI-GAP-005_RAW_MATERIAL_SOURCE_HANDLING",
  "CAHR-AI-GAP-006_PILOT_RUNTIME_PRIVATE_CASE_PROCESSING",
  "CAHR-AI-GAP-007_SECURITY_REVIEW_METHOD_SCOPE",
  "CAHR-AI-GAP-008_PRIVACY_GDPR_DPIA",
  "CAHR-AI-GAP-009_EU_AI_ACT_HIGH_RISK_READINESS",
  "CAHR-AI-GAP-010_HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW",
  "CAHR-AI-GAP-011_SWE_JURISDICTION_MODULE",
  "CAHR-AI-GAP-012_DK_JURISDICTION_MODULE",
  "CAHR-AI-GAP-013_EXTERNAL_EXPERT_REVIEW",
  "CAHR-AI-GAP-014_NO_RAW_NO_CONCLUSION_COUNTER_CONTEXT",
  "CAHR-AI-GAP-015_EXTERNAL_USE_PRODUCT_READINESS",
  "CAHR-AI-GAP-016_COURT_ADJACENT_PILOT_CLOSURE_CRITERIA",
];

const expectedRbacCategories = [
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

const crosswalkPairs = [
  {
    courtRowId: "CAHR-AI-GAP-001_RBAC_ACCESS_CONTROL",
    rbacCategory: "ROLE_CATEGORIES",
    expectedCourtRefs: {
      role: "RP-SG-001_ACTOR_SUBJECT_MODEL_GAP",
      runtime: "RBAC-GC-016_OBJECT_FUNCTION_PROPERTY_AUTHORIZATION_GATE_CANDIDATE",
      admin: "ADMIN-SUPPORT-GAP-001_ADMIN_SUPPORT_MODEL_ABSENT",
    },
    expectedRbacStatus: {
      admin: "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
      runtime: "FUTURE_ONLY_NOT_CREATED",
    },
  },
  {
    courtRowId: "CAHR-AI-GAP-002_AUDIT_ACCESS_LOG",
    rbacCategory: "AUDIT_LOG_DEPENDENCIES",
    expectedCourtRefs: {
      role: "RP-SG-013_LOG_VIEWER_RBAC_GAP",
      runtime: "RBAC-GC-012_AUDIT_ACCESS_LOG_VIEW_ACCESS_GATE_CANDIDATE",
      aal: "AAL-RUNTIME-BLOCKER-016_AUDIT_LOG_VIEWER_ACCESS_EVENT",
    },
    expectedRbacStatus: {
      audit: "AUDIT_ACCESS_LOG_IMPLEMENTATION_REQUIRED_IN_FUTURE",
      admin: "LOG_VIEWER_RBAC_NOT_CREATED",
    },
  },
  {
    courtRowId: "CAHR-AI-GAP-003_DATA_LIFECYCLE_RDE",
    rbacCategory: "RETENTION_DELETION_DEPENDENCIES",
    expectedCourtRefs: {
      rde: "RDE-RUNTIME-BLOCKER-001_RETENTION_POLICY_RUNTIME_BOUNDARY",
      role: "RP-SG-015_RETENTION_DELETION_PERMISSION_GAP",
      runtime: "RBAC-GC-013_RETENTION_DELETION_OPERATION_AUTHORIZATION_GATE_CANDIDATE",
    },
    expectedRbacStatus: {
      retention:
        "RETENTION_DELETION_PURGE_ERASURE_ENCRYPTION_KEY_MANAGEMENT_NOT_IMPLEMENTED",
      admin: "ADMIN_SUPPORT_LIFECYCLE_OPERATION_BLOCKED",
    },
  },
  {
    courtRowId: "CAHR-AI-GAP-004_PROVIDER_THIRD_PARTY_ROUTING",
    rbacCategory: "THIRD_PARTY_ROUTING_CONSTRAINTS",
    expectedCourtRefs: {
      tpr: "TPR-RUNTIME-BLOCKER-001_THIRD_PARTY_MODEL_API_ROUTE_REQUEST",
      role: "RP-SG-016_THIRD_PARTY_ROUTING_PERMISSION_GAP",
      runtime: "RBAC-GC-011_THIRD_PARTY_MODEL_API_ROUTE_APPROVAL_DENIAL_GATE_CANDIDATE",
    },
    expectedRbacStatus: {
      route: "THIRD_PARTY_API_ROUTING_NOT_AUTHORIZED",
      admin: "ADMIN_SUPPORT_PROVIDER_ROUTE_APPROVAL_NOT_AUTHORIZED",
    },
  },
  {
    courtRowId: "CAHR-AI-GAP-005_RAW_MATERIAL_SOURCE_HANDLING",
    rbacCategory: "MATERIAL_CLASS_BOUNDARIES",
    expectedCourtRefs: {
      raw: "RMR-CS-006_RAW_PRIVATE_SOURCE_MATERIAL",
      role: "RP-SG-017_RAW_MATERIAL_ROUTING_PERMISSION_GAP",
      runtime: "RBAC-GC-005_RAW_PRIVATE_SOURCE_DENY_QUARANTINE_GATE_CANDIDATE",
    },
    expectedRbacStatus: {
      admin: "ADMIN_SUPPORT_RAW_PRIVATE_SOURCE_ACCESS_BLOCKED",
      route: "NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_ROUTING",
    },
  },
  {
    courtRowId: "CAHR-AI-GAP-010_HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW",
    rbacCategory: "HUMAN_PROFESSIONAL_REVIEW_DEPENDENCIES",
    expectedCourtRefs: {
      runtime: "RBAC-GC-017_HUMAN_PROFESSIONAL_REVIEW_ONLY_GATE_CANDIDATE",
      raw: "RMR-CS-010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
      aal: "AAL-RUNTIME-BLOCKER-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT",
    },
    expectedRbacStatus: {
      review: "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      admin: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    },
  },
  {
    courtRowId: "CAHR-AI-GAP-006_PILOT_RUNTIME_PRIVATE_CASE_PROCESSING",
    rbacCategory: "FUTURE_RUNTIME_GATE_DEPENDENCIES",
    expectedCourtRefs: {
      runtime: "RBAC-GC-014_ADMIN_SUPPORT_ACCESS_GATE_CANDIDATE",
      tpr: "TPR-RUNTIME-BLOCKER-014_RUNTIME_SCHEMA_WORKFLOW_GATE_PROVIDER_ROUTE_EVENT",
    },
    expectedRbacStatus: {
      runtime: "RUNTIME_GATE_VALIDATOR_DISPATCH_REGISTRY_LOOKUP_NOT_CREATED",
      admin: "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    },
  },
];

const falseClaimKeys = [
  "authorized",
  "court_ready",
  "approved_tool_ready",
  "external_use_authorized",
  "product_candidate_selected",
  "runtime_certification_created",
  "technical_signoff_created",
  "release_approved",
  "real_private_case_ready",
  "legal_decision_ready",
  "clinical_decision_ready",
  "evidentiary_proof_ready",
  "eu_ai_act_compliance_ready",
  "security_finding_created",
  "vulnerability_finding_created",
  "severity_assigned",
  "remediation_recommended",
  "remediation_implemented",
  "retention_implemented",
  "deletion_implemented",
  "purge_implemented",
  "erasure_implemented",
  "encryption_implemented",
  "key_management_implemented",
  "provider_retention_deletion_implemented",
  "audit_access_log_implemented",
  "rbac_implemented",
  "access_control_implemented",
  "runtime_gate_implemented",
  "validator_dispatch_created",
  "runtime_registry_lookup_created",
  "third_party_routing_implemented",
  "raw_material_routing_implemented",
  "source_package_inspected",
  "metadata_acquired",
  "access_granted",
  "rbac_implemented",
  "access_control_enforced",
  "role_permission_model_created",
  "admin_support_model_created",
  "admin_support_access_resolved",
  "admin_support_access_authorized",
  "runtime_gate_created",
  "blocker_closure_created",
  "product_candidate_authorized",
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

test("crosswalks court-adjacent rows to RBAC/admin-support scope-underlag", () => {
  assert.deepEqual(
    courtRows.map((row) => row.id),
    expectedCourtAdjacentRowIds,
  );
  assert.deepEqual(
    rbacScope.listRbacAdminSupportScopeReviewCategories(),
    expectedRbacCategories,
  );

  for (const pair of crosswalkPairs) {
    const courtRow = courtRowsById.get(pair.courtRowId);
    const rbacRow = rbacRowsByCategory.get(pair.rbacCategory);

    assert.ok(courtRow, pair.courtRowId);
    assert.ok(rbacRow, pair.rbacCategory);
    assert.equal(
      courtRow.current_evidence_level,
      "DOCS_ONLY_REGISTRY_SCAFFOLD_EVIDENCE",
    );
    assert.equal(
      rbacRow.review_conclusion,
      "SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG",
    );
    assert.equal(rbacRow.blocker_status, "OPEN_NOT_CLOSED");
    assert.equal(rbacRow.closure_status, "NO_BLOCKER_CLOSURE_CREATED");
    assert.equal(rbacRow.implementation_scope, "NO_IMPLEMENTATION_CREATED");
  }
});

test("crosswalked dependency references remain gap/readiness evidence only", () => {
  for (const pair of crosswalkPairs) {
    const courtRow = courtRowsById.get(pair.courtRowId);
    const rbacRow = rbacRowsByCategory.get(pair.rbacCategory);
    const courtRefBuckets = [
      courtRow.related_role_permission_gap_ids,
      courtRow.related_runtime_gate_candidate_ids,
      courtRow.related_admin_support_gap_ids,
      courtRow.related_aal_runtime_blocker_ids,
      courtRow.related_rde_runtime_blocker_ids,
      courtRow.related_tpr_runtime_blocker_ids,
      courtRow.related_raw_material_routing_control_ids,
    ];
    const courtRefs = new Set(courtRefBuckets.flat());
    const rbacStatusValues = new Set([
      rbacRow.admin_support_access_rule,
      rbacRow.audit_log_dependency,
      rbacRow.retention_deletion_dependency,
      rbacRow.third_party_routing_constraint,
      rbacRow.future_runtime_gate_dependency,
      rbacRow.human_professional_review_dependency,
    ]);

    for (const expectedRef of Object.values(pair.expectedCourtRefs)) {
      assert.equal(courtRefs.has(expectedRef), true, expectedRef);
    }
    for (const expectedStatus of Object.values(pair.expectedRbacStatus)) {
      assert.equal(rbacStatusValues.has(expectedStatus), true, expectedStatus);
    }

    assert.equal(courtRow.blocker_for_private_case_processing, true);
    assert.equal(courtRow.blocker_for_court_adjacent_pilot, true);
    assert.equal(courtRow.blocker_for_external_use, true);
    assert.equal(courtRow.external_expert_review_required, true);
    assert.match(courtRow.human_oversight_requirement, /human|professional/i);
  }
});

test("RBAC/admin-support tracked proof files preserve aligned scope-underlag tokens", () => {
  assertIncludesAll(trackedEvidenceCorpus, [
    "SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG",
    "ADMIN_SUPPORT_ACCESS_INCLUDED_IN_SCOPE",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "ADMIN_SUPPORT_MODEL_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
});

test("jurisdiction separation and readiness labels remain boundary-only", () => {
  const swe = courtRowsById.get("CAHR-AI-GAP-011_SWE_JURISDICTION_MODULE");
  const dk = courtRowsById.get("CAHR-AI-GAP-012_DK_JURISDICTION_MODULE");

  assert.equal(swe.jurisdiction_scope, "SWE");
  assert.equal(dk.jurisdiction_scope, "DK");
  assert.notEqual(swe.id, dk.id);

  for (const row of courtRows) {
    assert.ok(row.current_readiness_status.includes("DOCS_ONLY_GAP_MATRIX"));
    assert.ok(row.current_readiness_status.includes("REGISTRY_SCAFFOLD_ONLY"));
    assert.ok(
      row.current_readiness_status.includes("RUNTIME_GATE_INVENTORY_DEFERRED"),
    );
    assert.ok(row.current_readiness_status.includes("NOT_COURT_READY"));
    assert.ok(row.current_readiness_status.includes("NOT_EXTERNAL_USE_READY"));
  }
});

test("crosswalk helper outputs preserve non-authorization boundaries", () => {
  assertFalseClaimsStayFalse([
    courtAdjacent.listCourtAdjacentHighRiskAiReadinessGapRows(),
    courtAdjacent.getCourtAdjacentHighRiskAiReadinessNonAuthorizationStatus(),
    courtAdjacent.classifyCourtAdjacentHighRiskAiReadinessGapRow("missing"),
    rbacScope.getRbacAdminSupportScopeReviewRegistry(),
    rbacScope.getRbacAdminSupportScopeReviewStatus(),
    rbacScope.listRbacAdminSupportScopeReviewRows(),
    rbacScope.getRbacAdminSupportScopeReviewRow("missing"),
  ]);

  assert.equal(courtAdjacent.isCourtReady(), false);
  assert.equal(courtAdjacent.isExternalUseAuthorized(), false);
  assert.equal(courtAdjacent.isProductCandidateSelected(), false);
  assert.equal(courtAdjacent.isRuntimeCertified(), false);
  assert.equal(courtAdjacent.isTechnicalSignoffCreated(), false);
  assert.equal(courtAdjacent.isSecurityFindingCreated(), false);
  assert.equal(courtAdjacent.isSeverityAssigned(), false);
  assert.equal(courtAdjacent.isRemediationRecommended(), false);

  assert.equal(
    rbacScope.getRbacAdminSupportScopeReviewStatus()
      .implementation_created,
    false,
  );
  assert.equal(
    rbacScope.getRbacAdminSupportScopeReviewStatus()
      .blocker_closure_created,
    false,
  );
});
