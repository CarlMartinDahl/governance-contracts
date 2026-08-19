"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const rbacScope =
  require("../packages/governance/src/rbac-admin-support-scope-review-registry.js");
const adminSupport =
  require("../packages/governance/src/admin-support-sub-scope-clarification-selection-registry.js");

const repoRoot = path.resolve(__dirname, "..");

const trackedEvidencePaths = Object.freeze({
  pr39ScopeReview:
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38_v1.md",
  pr39Proof:
    "tests/domain-rbac-role-permission-admin-support-scope-review-after-pr38.test.js",
  rbacRegistryProof:
    "tests/rbac-admin-support-scope-review-registry-alignment.test.js",
  adminSupportRegistry:
    "packages/governance/src/admin-support-sub-scope-clarification-selection-registry.js",
  adminSupportRegistryProof:
    "tests/admin-support-sub-scope-clarification-selection-registry-alignment.test.js",
  adminSupportBoundary:
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_AFTER_COURT_RBAC_CROSSWALK_BOUNDARY_v1.md",
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

const scopeReview = trackedEvidence.pr39ScopeReview;
const rbacRows = rbacScope.listRbacAdminSupportScopeReviewRows();
const adminRows =
  adminSupport.listAdminSupportSubScopeClarificationSelectionRows();

const expectedPr39ScopeRowIds = Object.freeze([
  "RBAC-RP-AS-SR-001",
  "RBAC-RP-AS-SR-002",
  "RBAC-RP-AS-SR-003",
  "RBAC-RP-AS-SR-004",
  "RBAC-RP-AS-SR-005",
  "RBAC-RP-AS-SR-006",
  "RBAC-RP-AS-SR-007",
  "RBAC-RP-AS-SR-008",
  "RBAC-RP-AS-SR-009",
  "RBAC-RP-AS-SR-010",
  "RBAC-RP-AS-SR-011",
  "RBAC-RP-AS-SR-012",
]);

const expectedRbacRegistryRowIds = Object.freeze([
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
]);

const expectedScopeFields = Object.freeze([
  "scope ID",
  "actor type",
  "role category",
  "permission category",
  "allowed material classes",
  "prohibited material classes",
  "allowed actions",
  "prohibited actions",
  "admin/support access rule",
  "human/professional review dependency",
  "audit-log dependency",
  "retention/deletion dependency",
  "third-party routing constraint",
  "future runtime gate dependency",
  "current evidence level",
  "implementation gap",
  "required implementation evidence",
  "required test evidence",
  "blocker status",
  "closure criteria",
  "remains non-authorized until closure",
]);

const requiredNonAuthorizationTokens = Object.freeze([
  "RBAC_IMPLEMENTATION_NOT_CREATED",
  "ACCESS_CONTROL_IMPLEMENTATION_NOT_CREATED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
  "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "ADMIN_SUPPORT_ACCESS_CANNOT_BYPASS_RBAC_ACCESS_CONTROL_OR_HUMAN_PROFESSIONAL_REVIEW",
  "SERVICE_SYSTEM_ACTOR_SELF_APPROVAL_NOT_CREATED",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
  "THIRD_PARTY_PROVIDER_ROUTING_NOT_AUTHORIZED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
  "LOCAL_VALIDATION_NOT_CI_EVIDENCE",
  "CI_EVIDENCE_NOT_RELEASE_APPROVAL",
  "CI_EVIDENCE_NOT_RUNTIME_CERTIFICATION",
  "CI_EVIDENCE_NOT_TECHNICAL_SIGN_OFF",
  "CI_EVIDENCE_NOT_SECURITY_FINDING",
  "CI_EVIDENCE_NOT_SEVERITY",
  "CI_EVIDENCE_NOT_REMEDIATION",
  "CI_EVIDENCE_NOT_BLOCKER_CLOSURE",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "NO_SECURITY_FINDING_CREATED",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "NO_BLOCKER_CLOSURE_CREATED",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "PRODUCT_CANDIDATE_NONE",
  "COURT_READY_NOT_CREATED",
  "AI_ACT_COMPLIANCE_NOT_CREATED",
  "HIGH_RISK_APPROVAL_NOT_CREATED",
  "LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_CONCLUSION_NOT_CREATED",
  "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
]);

const falseClaimKeys = Object.freeze([
  "authorized",
  "access_granted",
  "rbac_implemented",
  "access_control_implemented",
  "access_control_enforced",
  "role_permission_model_created",
  "admin_support_model_created",
  "admin_support_access_resolved",
  "admin_support_access_authorized",
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
]);

function assertIncludesAll(actual, expected) {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
}

function section(source, heading) {
  const start = source.indexOf(`## ${heading}`);
  assert.notEqual(start, -1, heading);
  const next = source.indexOf("\n## ", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
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

test("PR39 scope review and proof remain fixed tracked evidence", () => {
  assert.equal(
    fs.existsSync(path.join(repoRoot, trackedEvidencePaths.pr39ScopeReview)),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(repoRoot, trackedEvidencePaths.pr39Proof)),
    true,
  );

  assertIncludesAll(scopeReview, [
    "RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38",
    "Mode: `DOCS_ONLY`",
    "Posture: `PROVE_ONLY`",
    "Scope: `SCOPE_REVIEW_ONLY`",
    "Status: `REVIEW_SUPPORT_ONLY`",
    "PR_29_THROUGH_PR_38_LINEAGE_PRESERVED",
  ]);
  assertIncludesAll(trackedEvidence.pr39Proof, [
    "DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38_v1.md",
    "declares docs-only prove-only scope boundary after PR38",
    "preserves RBAC, admin/support, audit, lifecycle, routing, and runtime non-authorizations",
  ]);
});

test("PR39 preserves lineage from court/RBAC through audit implementation gaps", () => {
  const lineage = section(scopeReview, "Lineage");

  for (let pr = 29; pr <= 38; pr += 1) {
    assert.match(lineage, new RegExp(`PR #${pr}`));
  }

  assertIncludesAll(trackedEvidence.courtRbacCrosswalk, [
    "CAHR-AI-GAP-001_RBAC_ACCESS_CONTROL",
    "CAHR-AI-GAP-002_AUDIT_ACCESS_LOG",
    "ACTOR_TYPES",
    "FUTURE_RUNTIME_GATE_DEPENDENCIES",
  ]);
  assertIncludesAll(trackedEvidence.adminSupportBoundary, [
    "ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_AFTER_COURT_RBAC_CROSSWALK_BOUNDARY",
    "PR #29 locked the court-adjacent high-risk AI readiness gap posture",
    "PR #32 added a test-only governance dependency crosswalk proof",
  ]);
  assertIncludesAll(trackedEvidence.auditDependencyMap, [
    "AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36",
    "PR_29_THROUGH_PR_36_LINEAGE_PRESERVED",
  ]);
  assertIncludesAll(trackedEvidence.auditGapInventory, [
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37",
    "PR_29_THROUGH_PR_37_LINEAGE_PRESERVED",
  ]);
});

test("PR39 scope rows align with RBAC/admin-support registry surfaces", () => {
  const matrix = section(scopeReview, "Scope Review Matrix");
  const fields = section(scopeReview, "Required Scope-Review Fields");

  assertIncludesAll(matrix, expectedPr39ScopeRowIds);
  assertIncludesAll(fields, expectedScopeFields);
  assert.deepEqual(
    rbacRows.map((row) => row.id),
    expectedRbacRegistryRowIds,
  );

  assertIncludesAll(
    rbacScope.listRbacAdminSupportScopeReviewStatusLabels(),
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
  assertIncludesAll(trackedEvidence.rbacRegistryProof, [
    "ADMIN_SUPPORT_ACCESS_INCLUDED_IN_SCOPE",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  ]);
});

test("admin/support boundary stays unresolved and non-bypassing", () => {
  const adminStatus =
    adminSupport.getAdminSupportSubScopeClarificationSelectionStatus();

  assert.equal(adminRows.length, 9);
  assertIncludesAll(adminStatus.status_labels, [
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
  assertIncludesAll(scopeReview, [
    "ADMIN_SUPPORT_ACCESS_CANNOT_BYPASS_RBAC_ACCESS_CONTROL_OR_HUMAN_PROFESSIONAL_REVIEW",
    "SERVICE_SYSTEM_ACTOR_SELF_APPROVAL_NOT_CREATED",
  ]);
  assertIncludesAll(trackedEvidence.adminSupportRegistryProof, [
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
  ]);
});

test("audit/access-log dependency map and gap inventory remain dependency-only", () => {
  assertIncludesAll(trackedEvidence.auditDependencyMap, [
    "Scope: `DEPENDENCY_MAP_ONLY`",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "AUDIT_LOGGING_NOT_IMPLEMENTED",
    "ACCESS_LOGGING_NOT_IMPLEMENTED",
    "EVENT_EMITTER_NOT_CREATED",
    "LOG_SCHEMA_NOT_CREATED",
    "LOG_STORAGE_NOT_CREATED",
    "LOCAL_LOGS_NOT_CI_EVIDENCE",
    "CI_EVIDENCE_NOT_RELEASE_APPROVAL",
  ]);
  assertIncludesAll(trackedEvidence.auditGapInventory, [
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
});

test("PR39 preserves dependency-only posture for downstream controls", () => {
  const dependencyBoundaries = section(scopeReview, "Dependency Boundaries");
  const nonAuthorizationRules = section(scopeReview, "Non-Authorization Rules");
  const combinedBoundary = `${dependencyBoundaries}\n${nonAuthorizationRules}`;

  assertIncludesAll(combinedBoundary, [
    "RBAC implementation",
    "Access-control implementation",
    "Role-permission model",
    "Admin/support runtime access",
    "Audit/access-log implementation",
    "Retention, deletion, purge, erasure, encryption, key-management, or lifecycle execution",
    "Raw-material routing",
    "Third-party/provider routing",
    "Runtime gate implementation",
    "validator dispatch",
    "runtime registry lookup",
    "source/runtime/package behavior changes",
    "security-finding record",
    "risk-level assignment",
    "fix recommendation",
    "legal, clinical, evidentiary, case-truth, court readiness, AI Act readiness, or high-risk readiness conclusion",
  ]);
});

test("non-authorization helpers and unknown lookup remain fail-closed", () => {
  const unknown = rbacScope.getRbacAdminSupportScopeReviewRow("UNKNOWN");

  assert.equal(unknown.id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.review_conclusion, "UNKNOWN_NOT_EVIDENCED");

  assertFalseClaimsStayFalse([
    rbacScope.getRbacAdminSupportScopeReviewRegistry(),
    rbacScope.getRbacAdminSupportScopeReviewStatus(),
    rbacScope.listRbacAdminSupportScopeReviewRows(),
    adminSupport.getAdminSupportSubScopeClarificationSelectionRegistry(),
    adminSupport.getAdminSupportSubScopeClarificationSelectionStatus(),
    adminSupport.listAdminSupportSubScopeClarificationSelectionRows(),
    unknown,
  ]);
});

test("PR39 retains evidence boundaries and explicit non-authorizations", () => {
  assertIncludesAll(scopeReview, requiredNonAuthorizationTokens);

  for (const phrase of [
    "Static wording checks and focused tests are proof support only",
    "not findings",
    "not risk-level assignment",
    "not fix recommendation",
    "not blocker resolution",
    "not release consent",
    "not certification output",
  ]) {
    assert.match(scopeReview, new RegExp(phrase.replace(/[/-]/g, "[/-]")));
  }
});
