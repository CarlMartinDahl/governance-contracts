"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const boundaryDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_AFTER_COURT_RBAC_CROSSWALK_BOUNDARY_v1.md",
);

const contextPaths = Object.freeze([
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_P4_ADMIN_SUPPORT_BYPASS_PREVENTION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_v1.md",
  "tests/rbac-admin-support-scope-review-registry-alignment.test.js",
  "tests/court-adjacent-rbac-admin-support-dependency-crosswalk.test.js",
]);

const boundaryDoc = fs.readFileSync(boundaryDocPath, "utf8");
const contextCorpus = contextPaths
  .map((contextPath) => fs.readFileSync(path.join(repoRoot, contextPath), "utf8"))
  .join("\n");

function assertIncludesAll(actual, expected) {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
}

function getSection(heading) {
  const start = boundaryDoc.indexOf(`## ${heading}`);
  assert.notEqual(start, -1, heading);
  const next = boundaryDoc.indexOf("\n## ", start + 1);
  return boundaryDoc.slice(start, next === -1 ? boundaryDoc.length : next);
}

test("aligns selection boundary as docs-only prove-only evidence", () => {
  assert.equal(fs.existsSync(boundaryDocPath), true);
  assertIncludesAll(boundaryDoc, [
    "ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_AFTER_COURT_RBAC_CROSSWALK_BOUNDARY",
    "DOCS_ONLY_SELECTION_BOUNDARY",
    "Mode: `DOCS_ONLY`",
    "Posture: `PROVE_ONLY`",
    "SELECTION_ONLY",
    "FUTURE_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_REVIEW_CANDIDATE_SELECTED",
    "ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_ONLY",
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
  ]);
});

test("preserves PR 29 through PR 32 lineage without closure", () => {
  const lineageSection = getSection("Lineage Preserved");

  assertIncludesAll(lineageSection, [
    "PR #29 locked the court-adjacent high-risk AI readiness gap posture",
    "PR #30 made the RBAC/admin-support scope review machine-readable",
    "PR #31 added the alignment proof for the PR #30 registry",
    "PR #32 added a test-only governance dependency crosswalk proof",
    "This lineage does not close PR #29, PR #30, PR #31, or PR #32 blockers",
    "not create RBAC, access-control, role-permission models",
    "admin/support access",
    "runtime gates",
    "validator dispatch",
    "runtime registry lookup",
    "implementation",
  ]);
});

test("preserves unresolved admin support and model posture", () => {
  assertIncludesAll(boundaryDoc, [
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "Admin/support sub-scope remains unresolved",
    "Admin/support access remains unresolved",
    "RBAC model remains not implemented",
    "Access-control model remains not implemented",
    "Admin/support model remains not implemented",
  ]);
});

test("preserves review gate and readiness non-authorizations", () => {
  assertIncludesAll(boundaryDoc, [
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "RELEASE_APPROVAL_NOT_CREATED",
    "TECHNICAL_SIGN_OFF_NOT_CREATED",
    "RUNTIME_CERTIFICATION_NOT_CREATED",
    "COURT_READY_NOT_CREATED",
    "AI_ACT_COMPLIANCE_NOT_CREATED",
    "HIGH_RISK_APPROVAL_NOT_CREATED",
    "Human/professional review remains required",
  ]);
});

test("preserves runtime dependency boundaries as dependencies only", () => {
  const futureBoundarySection = getSection("Future Review Boundary Only");

  assertIncludesAll(boundaryDoc, [
    "RUNTIME_GATE_INVENTORY_DEFERRED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "RETENTION_DELETION_NOT_IMPLEMENTED",
    "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    "NO_BLOCKER_CLOSURE_CREATED",
  ]);

  assertIncludesAll(futureBoundarySection, [
    "dependency only; no audit/access-log implementation",
    "dependency only; no lifecycle execution",
    "dependency only; no route authorization",
    "implementation, enforcement, runtime gates, validator dispatch",
    "runtime registry lookup, blocker closure, approval, readiness",
    "preserved",
  ]);
});

test("preserves material-risk intersections for later clarification", () => {
  const unresolvedSection = getSection("Why Admin/Support Remains Unresolved");

  assertIncludesAll(unresolvedSection, [
    "raw/private/source material",
    "PDF/image/screenshot/metadata material",
    "audit/access-log viewing",
    "retention/deletion actions",
    "third-party/provider routing",
    "export/delivery/promotion",
    "cross-tenant, wrong-case, wrong-object",
    "wrong-function, and wrong-property risks",
    "cannot substitute for human/professional review",
    "cannot create release approval, external-use authorization",
  ]);
});

test("keeps selected future review question narrow", () => {
  const questionSection = getSection("Selected Future Review Question");
  const normalizedQuestion = questionSection.replace(/\s+/g, " ");

  assertIncludesAll(normalizedQuestion, [
    "What is the smallest `PROVE_ONLY` admin/support sub-scope clarification",
    "admin/support actor paths",
    "prohibited material classes",
    "approval gates",
    "audit dependencies",
    "retention/deletion dependencies",
    "third-party routing constraints",
    "human/professional review boundaries",
    "without creating implementation, enforcement, runtime gates",
    "validator dispatch, runtime registry lookup, blocker closure",
    "release approval, external-use, court readiness",
    "AI Act compliance, or high-risk approval",
  ]);
});

test("aligns with tracked admin support and crosswalk evidence", () => {
  assertIncludesAll(contextCorpus, [
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "RUNTIME_CERTIFICATION_NOT_CREATED",
    "TECHNICAL_SIGN_OFF_NOT_CREATED",
    "ADMIN_SUPPORT_ACCESS_INCLUDED_IN_SCOPE",
    "CAHR-AI-GAP-001_RBAC_ACCESS_CONTROL",
    "CAHR-AI-GAP-010_HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW",
    "ADMIN_SUPPORT_ACCESS_RULES",
    "FUTURE_RUNTIME_GATE_DEPENDENCIES",
  ]);
});

test("preserves findings and conclusion non-reopening posture", () => {
  assertIncludesAll(boundaryDoc, [
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
    "Security finding remains not created",
    "Vulnerability finding remains not created",
    "Severity remains not assigned",
    "Remediation remains not recommended or implemented",
    "Legal, clinical, evidentiary, and case-truth conclusions remain not created",
  ]);
});
