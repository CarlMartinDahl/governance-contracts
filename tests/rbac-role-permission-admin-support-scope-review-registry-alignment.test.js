"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const pr41Registry =
  require("../packages/governance/src/rbac-role-permission-admin-support-scope-review-registry.js");
const indexExports = require("../packages/governance/src/index.js");
const priorRbacScope =
  require("../packages/governance/src/rbac-admin-support-scope-review-registry.js");
const adminSupport =
  require("../packages/governance/src/admin-support-sub-scope-clarification-selection-registry.js");

const repoRoot = path.resolve(__dirname, "..");

const trackedEvidencePaths = Object.freeze({
  pr41Registry:
    "packages/governance/src/rbac-role-permission-admin-support-scope-review-registry.js",
  pr41RegistryProof:
    "tests/rbac-role-permission-admin-support-scope-review-registry.test.js",
  index: "packages/governance/src/index.js",
  pr39ScopeReview:
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38_v1.md",
  pr39ScopeReviewProof:
    "tests/domain-rbac-role-permission-admin-support-scope-review-after-pr38.test.js",
  pr40AlignmentProof:
    "tests/domain-rbac-role-permission-admin-support-scope-review-after-pr38-alignment.test.js",
  priorRbacRegistry:
    "packages/governance/src/rbac-admin-support-scope-review-registry.js",
  priorRbacRegistryAlignmentProof:
    "tests/rbac-admin-support-scope-review-registry-alignment.test.js",
  adminSupportRegistry:
    "packages/governance/src/admin-support-sub-scope-clarification-selection-registry.js",
  adminSupportRegistryAlignmentProof:
    "tests/admin-support-sub-scope-clarification-selection-registry-alignment.test.js",
  auditDependencyMap:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36_v1.md",
  auditGapInventory:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37_v1.md",
  auditDependencyMapProof:
    "tests/domain-audit-access-log-admin-support-dependency-mapping-after-pr36.test.js",
  auditGapInventoryProof:
    "tests/domain-audit-access-log-implementation-gap-inventory-after-pr37.test.js",
  courtRbacCrosswalk:
    "tests/court-adjacent-rbac-admin-support-dependency-crosswalk.test.js",
});

const trackedEvidence = Object.fromEntries(
  Object.entries(trackedEvidencePaths).map(([key, evidencePath]) => [
    key,
    fs.readFileSync(path.join(repoRoot, evidencePath), "utf8"),
  ]),
);

const rows =
  pr41Registry.listRbacRolePermissionAdminSupportScopeReviewRegistryRows();
const summary =
  pr41Registry.getRbacRolePermissionAdminSupportScopeReviewRegistrySummary();

const expectedRowIds = Object.freeze(
  Array.from({ length: 12 }, (_, index) =>
    `RBAC-RP-AS-SR-${String(index + 1).padStart(3, "0")}`,
  ),
);

const expectedActors = Object.freeze([
  "human/professional reviewer",
  "repo/governance maintainer",
  "admin/support reviewer",
  "service/system actor",
  "CI/evidence actor",
  "audit/access reviewer",
  "retention/deletion reviewer",
  "third-party/provider route reviewer",
  "raw-material routing reviewer",
  "justice/public-sector reviewer",
  "external-use/product reviewer",
  "unknown/unclassified actor",
]);

const expectedFields = Object.freeze([
  "scope_id",
  "actor_type",
  "role_category",
  "permission_category",
  "allowed_material_classes",
  "prohibited_material_classes",
  "allowed_actions",
  "prohibited_actions",
  "admin_support_access_rule",
  "human_professional_review_dependency",
  "audit_log_dependency",
  "retention_deletion_dependency",
  "third_party_routing_constraint",
  "future_runtime_gate_dependency",
  "current_evidence_level",
  "implementation_gap",
  "required_implementation_evidence",
  "required_test_evidence",
  "blocker_status",
  "closure_criteria",
  "remains_non_authorized_until_closure",
  "source_evidence_references",
  "lineage",
  "status_labels",
  "non_authorization_flags",
]);

const expectedLineage = Object.freeze([
  "PR_29_COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_SCAFFOLD",
  "PR_30_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_SCAFFOLD",
  "PR_31_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF",
  "PR_32_COURT_ADJACENT_RBAC_ADMIN_SUPPORT_DEPENDENCY_CROSSWALK_PROOF",
  "PR_33_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_BOUNDARY",
  "PR_34_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_ALIGNMENT_PROOF",
  "PR_35_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY_SCAFFOLD",
  "PR_36_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY_ALIGNMENT_PROOF",
  "PR_37_AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING",
  "PR_38_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY",
  "PR_39_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW",
  "PR_40_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_ALIGNMENT_PROOF",
]);

const requiredStatusLabels = Object.freeze([
  "GOVERNANCE_REGISTRY_SCAFFOLD_ONLY",
  "PROVE_ONLY",
  "DOCS_ONLY_SCOPE_REVIEW_ONLY",
  "TEST_ONLY_ALIGNMENT_PROOF_ONLY",
  "REVIEW_SUPPORT_ONLY",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "PRODUCT_CANDIDATE_NONE",
  "RUNTIME_CERTIFICATION_NOT_CREATED",
  "TECHNICAL_SIGN_OFF_NOT_CREATED",
  "COURT_READY_NOT_CREATED",
  "AI_ACT_COMPLIANCE_NOT_CREATED",
  "HIGH_RISK_APPROVAL_NOT_CREATED",
]);

const falseClaimKeys = Object.freeze([
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
  "admin_support_implementation_created",
  "admin_support_access_authorized",
  "runtime_gate_created",
  "runtime_gate_implemented",
  "validator_dispatch_created",
  "runtime_registry_lookup_created",
  "audit_access_log_implemented",
  "audit_logging_implemented",
  "access_logging_implemented",
  "event_emitter_created",
  "log_schema_created",
  "log_storage_created",
  "log_viewer_created",
  "log_access_control_implemented",
  "raw_material_routing_implemented",
  "third_party_routing_authorized",
  "provider_routing_authorized",
  "retention_deletion_encryption_implemented",
  "chain_of_custody_created",
  "blocker_closure_created",
  "security_finding_created",
  "vulnerability_finding_created",
  "severity_assigned",
  "remediation_recommended",
  "remediation_implemented",
  "release_approved",
  "external_use_authorized",
  "product_candidate_selected",
  "product_candidate_authorized",
  "technical_signoff_created",
  "runtime_certification_created",
  "legal_clinical_evidentiary_case_truth_conclusion_created",
  "court_ready_created",
  "ai_act_compliance_created",
  "high_risk_approval_created",
  "runtime_api_schema_package_behavior_changed",
]);

const forbiddenPositiveFragments = Object.freeze([
  ["RBAC ", "imple", "mented"],
  ["access-control ", "imple", "mented"],
  ["access control ", "imple", "mented"],
  ["role-permission model ", "cre", "ated"],
  ["role fields ", "cre", "ated"],
  ["permission fields ", "cre", "ated"],
  ["role schema ", "cre", "ated"],
  ["permission schema ", "cre", "ated"],
  ["admin/support access ", "auth", "orized"],
  ["permission ", "gra", "nted"],
  ["role ", "gra", "nted"],
  ["runtime gate ", "cre", "ated"],
  ["validator dispatch ", "cre", "ated"],
  ["registry lookup ", "cre", "ated"],
  ["technical ", "sign-", "off"],
  ["runtime ", "certi", "fication"],
  ["external-use ", "appro", "ved"],
  ["product candidate ", "sel", "ected"],
  ["court-", "ready"],
  ["AI Act ", "comp", "liant"],
  ["justice-", "ready"],
  ["high-risk ", "appro", "ved"],
  ["security ", "find", "ing"],
  ["seve", "rity ", "assigned"],
  ["reme", "diation ", "recommended"],
  ["reme", "diation ", "imple", "mented"],
  ["blocker ", "clo", "sed"],
  ["imple", "mentation ", "complete"],
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

test("PR41 registry surface remains exported and frozen", () => {
  for (const exportName of [
    "RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_CATEGORIES",
    "RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ROWS",
    "RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS",
    "getRbacRolePermissionAdminSupportScopeReviewRegistryRow",
    "getRbacRolePermissionAdminSupportScopeReviewRegistrySummary",
    "listRbacRolePermissionAdminSupportScopeReviewRegistryRows",
  ]) {
    assert.equal(Object.hasOwn(pr41Registry, exportName), true, exportName);
    assert.equal(Object.hasOwn(indexExports, exportName), true, exportName);
  }

  assert.equal(
    Object.isFrozen(
      pr41Registry.RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ROWS,
    ),
    true,
  );
  assert.match(
    trackedEvidence.index,
    /rbac-role-permission-admin-support-scope-review-registry\.js/,
  );
});

test("PR41 row set aligns with PR39 actor scope rows and fields", () => {
  assert.deepEqual(
    rows.map((row) => row.scope_id),
    expectedRowIds,
  );
  assert.deepEqual(
    rows.map((row) => row.actor_type),
    expectedActors,
  );

  assertIncludesAll(trackedEvidence.pr39ScopeReview, expectedRowIds);
  assertIncludesAll(trackedEvidence.pr39ScopeReview, expectedActors);

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), expectedFields, row.scope_id);
    assert.deepEqual(row.lineage, expectedLineage, row.scope_id);
    assert.deepEqual(row.status_labels, requiredStatusLabels, row.scope_id);
    assert.equal(row.blocker_status, "OPEN_NOT_CLOSED", row.scope_id);
    assert.equal(row.remains_non_authorized_until_closure, true, row.scope_id);
  }
});

test("PR41 preserves PR39, PR40, and PR29 through PR38 lineage posture", () => {
  assert.deepEqual(summary.lineage, expectedLineage);
  assert.equal(summary.row_count, 12);
  assert.equal(summary.pr_39_scope_review_posture, "DOCS_ONLY_SCOPE_REVIEW_ONLY");
  assert.equal(
    summary.pr_40_alignment_proof_posture,
    "TEST_ONLY_ALIGNMENT_PROOF_ONLY",
  );

  assertIncludesAll(trackedEvidence.pr39ScopeReview, [
    "RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38",
    "Mode: `DOCS_ONLY`",
    "Posture: `PROVE_ONLY`",
    "Scope: `SCOPE_REVIEW_ONLY`",
    "PR_29_THROUGH_PR_38_LINEAGE_PRESERVED",
  ]);
  assertIncludesAll(trackedEvidence.pr40AlignmentProof, [
    "PR39 scope review and proof remain fixed tracked evidence",
    "PR39 preserves lineage from court/RBAC through audit implementation gaps",
    "PR39 scope rows align with RBAC/admin-support registry surfaces",
    "admin/support boundary stays unresolved and non-bypassing",
    "audit/access-log dependency map and gap inventory remain dependency-only",
  ]);
  assertIncludesAll(trackedEvidence.pr41RegistryProof, [
    "preserves PR39 and PR40 tracked evidence boundaries",
    "contains exact actor scope rows and required field structure",
    "keeps dependency-only surfaces and admin/support unresolved",
    "unknown row lookup fails closed",
    "recursive non-authorization flags remain false",
  ]);
});

test("PR41 aligns with prior RBAC/admin-support and court crosswalk evidence", () => {
  assertIncludesAll(
    priorRbacScope.listRbacAdminSupportScopeReviewStatusLabels(),
    [
      "PROVE_ONLY",
      "GOVERNANCE_SCOPE_ONLY",
      "REVIEW_SUPPORT_ONLY",
      "SUITABLE_AS_PROVE_ONLY_SCOPE_UNDERLAG",
      "RBAC_MODEL_NOT_IMPLEMENTED",
      "ACCESS_CONTROL_NOT_IMPLEMENTED",
      "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    ],
  );
  assertIncludesAll(trackedEvidence.priorRbacRegistryAlignmentProof, [
    "ADMIN_SUPPORT_ACCESS_INCLUDED_IN_SCOPE",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  ]);
  assertIncludesAll(trackedEvidence.courtRbacCrosswalk, [
    "CAHR-AI-GAP-001_RBAC_ACCESS_CONTROL",
    "CAHR-AI-GAP-002_AUDIT_ACCESS_LOG",
    "CAHR-AI-GAP-010_HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW",
    "ACTOR_TYPES",
    "ROLE_CATEGORIES",
    "FUTURE_RUNTIME_GATE_DEPENDENCIES",
  ]);
  assertIncludesAll(trackedEvidence.pr41Registry, [
    "PR_29_COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_SCAFFOLD",
    "PR_30_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_SCAFFOLD",
    "PR_31_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF",
    "PR_32_COURT_ADJACENT_RBAC_ADMIN_SUPPORT_DEPENDENCY_CROSSWALK_PROOF",
  ]);
});

test("PR41 aligns with admin/support sub-scope evidence", () => {
  const adminStatus =
    adminSupport.getAdminSupportSubScopeClarificationSelectionStatus();

  assertIncludesAll(adminStatus.status_labels, [
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
  assertIncludesAll(trackedEvidence.adminSupportRegistryAlignmentProof, [
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
  ]);
  assertIncludesAll(trackedEvidence.pr41Registry, [
    "PR_33_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_BOUNDARY",
    "PR_34_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_ALIGNMENT_PROOF",
    "PR_35_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY_SCAFFOLD",
    "PR_36_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY_ALIGNMENT_PROOF",
    "ADMIN_SUPPORT_CANNOT_BYPASS_RBAC_OR_HUMAN_REVIEW",
    "SERVICE_SYSTEM_SELF_APPROVAL_NOT_CREATED",
  ]);
});

test("PR41 aligns with audit/access dependency and gap evidence", () => {
  assertIncludesAll(trackedEvidence.auditDependencyMap, [
    "AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36",
    "Scope: `DEPENDENCY_MAP_ONLY`",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "AUDIT_LOGGING_NOT_IMPLEMENTED",
    "ACCESS_LOGGING_NOT_IMPLEMENTED",
    "LOG_SCHEMA_NOT_CREATED",
    "LOG_STORAGE_NOT_CREATED",
    "LOCAL_LOGS_NOT_CI_EVIDENCE",
    "CI_EVIDENCE_NOT_RELEASE_APPROVAL",
  ]);
  assertIncludesAll(trackedEvidence.auditGapInventory, [
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37",
    "Scope: `IMPLEMENTATION_GAP_INVENTORY_ONLY`",
    "AAL-IGI-001",
    "AAL-IGI-019",
    "LOG_VIEWER_NOT_CREATED",
    "LOG_ACCESS_CONTROL_IMPLEMENTATION_NOT_CREATED",
    "CHAIN_OF_CUSTODY_NOT_CREATED",
  ]);
  assertIncludesAll(trackedEvidence.auditDependencyMapProof, [
    "AAL-AS-DM-001",
    "AAL-AS-DM-014",
    "Local logs are not CI evidence",
  ]);
  assertIncludesAll(trackedEvidence.auditGapInventoryProof, [
    "AAL-IGI-001",
    "AAL-IGI-019",
    "chain-of-custody non-claim boundary",
  ]);
  assertIncludesAll(trackedEvidence.pr41Registry, [
    "PR_37_AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING",
    "PR_38_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY",
    "AUDIT_ACCESS_LOG_DEPENDENCY_ONLY",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  ]);
});

test("PR41 preserves dependency-only and evidence-boundary posture", () => {
  const byId = new Map(rows.map((row) => [row.scope_id, row]));

  assert.equal(
    byId.get("RBAC-RP-AS-SR-003").admin_support_access_rule,
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-004").implementation_gap,
    "SERVICE_SYSTEM_SELF_APPROVAL_NOT_CREATED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-005").audit_log_dependency,
    "LOCAL_LOGS_ARE_NOT_CI_EVIDENCE",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-006").audit_log_dependency,
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-007").retention_deletion_dependency,
    "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-008").third_party_routing_constraint,
    "THIRD_PARTY_PROVIDER_ROUTING_NOT_AUTHORIZED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-009").implementation_gap,
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_NOT_CREATED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-010").future_runtime_gate_dependency,
    "RUNTIME_GATE_INVENTORY_DEFERRED",
  );

  assert.equal(summary.local_validation_is_ci_evidence, false);
  assert.equal(summary.ci_evidence_is_release_approval, false);
  assert.equal(summary.ci_evidence_is_technical_signoff, false);
  assert.equal(summary.ci_evidence_is_runtime_certification, false);
  assert.equal(summary.implementation_created, false);
  assert.equal(summary.runtime_api_schema_package_behavior_changed, false);
});

test("PR41 unknown lookup and recursive non-authorization flags stay fail-closed", () => {
  const unknown =
    pr41Registry.getRbacRolePermissionAdminSupportScopeReviewRegistryRow(
      "UNKNOWN",
    );

  assert.equal(unknown.scope_id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.actor_type, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.implementation_gap, "UNKNOWN_NOT_EVIDENCED");
  assert.deepEqual(unknown.allowed_actions, []);
  assertIncludesAll(unknown.status_labels, ["UNKNOWN_NOT_EVIDENCED"]);

  assertFalseClaimsStayFalse([
    rows,
    summary,
    unknown,
    priorRbacScope.getRbacAdminSupportScopeReviewRegistry(),
    adminSupport.getAdminSupportSubScopeClarificationSelectionRegistry(),
  ]);
});

test("PR41 scoped files do not contain positive overclaim fragments", () => {
  const scopedCorpus = [
    trackedEvidence.pr41Registry,
    trackedEvidence.pr41RegistryProof,
    trackedEvidence.index,
    fs.readFileSync(__filename, "utf8"),
  ]
    .join("\n")
    .toLowerCase();

  for (const fragments of forbiddenPositiveFragments) {
    const positiveClaim = fragments.join("").toLowerCase();
    assert.equal(scopedCorpus.includes(positiveClaim), false, positiveClaim);
  }
});
