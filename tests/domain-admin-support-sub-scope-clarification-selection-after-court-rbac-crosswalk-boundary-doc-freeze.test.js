"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_AFTER_COURT_RBAC_CROSSWALK_BOUNDARY_v1.md",
);

const doc = fs.readFileSync(docPath, "utf8");

function assertIncludesAll(haystack, values) {
  for (const value of values) {
    assert.equal(haystack.includes(value), true, value);
  }
}

function getSection(heading) {
  const start = doc.indexOf(`## ${heading}`);
  assert.notEqual(start, -1, heading);
  const next = doc.indexOf("\n## ", start + 1);
  return doc.slice(start, next === -1 ? doc.length : next);
}

test("admin/support sub-scope selection boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
  assertIncludesAll(doc, [
    "ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_AFTER_COURT_RBAC_CROSSWALK_BOUNDARY",
    "DOCS_ONLY_SELECTION_BOUNDARY",
    "DOCS_ONLY",
    "PROVE_ONLY",
    "SELECTION_ONLY",
  ]);
});

test("lineage from PR 29 through PR 32 is preserved", () => {
  assertIncludesAll(doc, [
    "PR #29 locked the court-adjacent high-risk AI readiness gap posture",
    "PR #30 made the RBAC/admin-support scope review machine-readable",
    "PR #31 added the alignment proof for the PR #30 registry",
    "PR #32 added a test-only governance dependency crosswalk proof",
    "does not close PR #29, PR #30, PR #31, or PR #32 blockers",
  ]);
});

test("future review candidate and unresolved posture are frozen", () => {
  assertIncludesAll(doc, [
    "FUTURE_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_REVIEW_CANDIDATE_SELECTED",
    "ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_ONLY",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "Admin/support sub-scope remains unresolved",
    "selects future clarification only",
    "preserves unresolved posture",
  ]);
});

test("human review and non-authorizations are preserved", () => {
  assertIncludesAll(doc, [
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "RELEASE_APPROVAL_NOT_CREATED",
    "TECHNICAL_SIGN_OFF_NOT_CREATED",
    "RUNTIME_CERTIFICATION_NOT_CREATED",
    "COURT_READY_NOT_CREATED",
    "AI_ACT_COMPLIANCE_NOT_CREATED",
    "HIGH_RISK_APPROVAL_NOT_CREATED",
    "Human/professional review remains required",
  ]);
});

test("runtime and implementation boundaries remain closed", () => {
  assertIncludesAll(doc, [
    "no implementation",
    "no enforcement",
    "RUNTIME_GATE_INVENTORY_DEFERRED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "NO_BLOCKER_CLOSURE_CREATED",
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "RETENTION_DELETION_NOT_IMPLEMENTED",
    "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  ]);
});

test("future review question is exact and narrow", () => {
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
    "boundaries without creating",
    "implementation, enforcement, runtime gates, validator dispatch, runtime",
    "registry lookup, blocker closure, release approval, external-use, court",
    "readiness, AI Act compliance, or high-risk approval",
  ]);

  const thirdPartyRoutingConstraintMatches = normalizedQuestion.match(
    /third-party routing constraints/g,
  );
  assert.equal(thirdPartyRoutingConstraintMatches?.length, 1);
});

test("positive overclaim wording is absent", () => {
  const forbidden = [
    ["admin", " access approved"].join(""),
    ["support", " access approved"].join(""),
    "access granted",
    "route authorized",
    "runtime enforced",
    ["blocker", " closed"].join(""),
    "certified",
    ["court", " ready"].join(""),
    ["AI Act", " compliant"].join(""),
    ["high-risk", " approved"].join(""),
  ];

  for (const phrase of forbidden) {
    assert.equal(doc.includes(phrase), false, phrase);
  }
});
