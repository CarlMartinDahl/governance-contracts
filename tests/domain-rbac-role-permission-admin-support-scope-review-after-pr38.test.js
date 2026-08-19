const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const reviewPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38_v1.md",
);

const review = fs.readFileSync(reviewPath, "utf8");

function section(title) {
  const marker = `## ${title}`;
  const start = review.indexOf(marker);
  assert.notEqual(start, -1, `missing section: ${title}`);
  const next = review.indexOf("\n## ", start + marker.length);
  return review.slice(start, next === -1 ? review.length : next);
}

test("declares docs-only prove-only scope boundary after PR38", () => {
  for (const token of [
    "RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38",
    "DOCS_ONLY",
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
    "REVIEW_SUPPORT_ONLY",
    "PR_29_THROUGH_PR_38_LINEAGE_PRESERVED",
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
  ]) {
    assert.match(review, new RegExp(token));
  }

  for (let pr = 29; pr <= 38; pr += 1) {
    assert.match(section("Lineage"), new RegExp(`PR #${pr}`));
  }
});

test("requires the complete scope-review field set", () => {
  const fields = section("Required Scope-Review Fields");
  for (const field of [
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
  ]) {
    assert.match(fields, new RegExp(field.replace(/[/-]/g, "[/-]")));
  }
});

test("covers exact RBAC/admin-support actor scope rows", () => {
  const matrix = section("Scope Review Matrix");

  for (let index = 1; index <= 12; index += 1) {
    const id = `RBAC-RP-AS-SR-${String(index).padStart(3, "0")}`;
    assert.match(matrix, new RegExp(id));
  }

  for (const actor of [
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
  ]) {
    assert.match(matrix, new RegExp(actor.replace(/[/-]/g, "[/-]")));
  }
});

test("preserves RBAC, admin/support, audit, lifecycle, routing, and runtime non-authorizations", () => {
  for (const token of [
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
  ]) {
    assert.match(review, new RegExp(token));
  }
});

test("preserves evidence boundaries and human/professional review gate", () => {
  for (const token of [
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
  ]) {
    assert.match(review, new RegExp(token));
  }
});

test("preserves release, external-use, product, court, AI Act, and domain conclusion non-authorizations", () => {
  for (const token of [
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "COURT_READY_NOT_CREATED",
    "AI_ACT_COMPLIANCE_NOT_CREATED",
    "HIGH_RISK_APPROVAL_NOT_CREATED",
    "LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_CONCLUSION_NOT_CREATED",
  ]) {
    assert.match(review, new RegExp(token));
  }
});

test("does not introduce runtime/API/schema/package behavior or hidden implementation claims", () => {
  const dependencyBoundaries = section("Dependency Boundaries");
  const nonAuthorizationRules = section("Non-Authorization Rules");

  for (const phrase of [
    "Runtime gate implementation",
    "runtime enforcement",
    "schema enforcement",
    "workflow enforcement",
    "validator dispatch",
    "runtime registry lookup",
    "source/runtime/package behavior changes",
    "blocker closure",
  ]) {
    assert.match(
      `${dependencyBoundaries}\n${nonAuthorizationRules}`,
      new RegExp(phrase.replace(/[/-]/g, "[/-]")),
    );
  }
});
