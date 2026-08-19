"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37_v1.md",
);

const doc = fs.readFileSync(docPath, "utf8");

const requiredFields = Object.freeze([
  "gap ID",
  "implementation gap area",
  "current evidence level",
  "intended enforcement layer",
  "implementation gap",
  "required implementation evidence",
  "required test evidence",
  "related RBAC/admin-support dependency",
  "related raw-material routing dependency",
  "related retention/deletion dependency",
  "related third-party/provider dependency",
  "blocker status",
  "closure criteria",
  "what remains non-authorized until closure",
]);

const gapIds = Object.freeze([
  "AAL-IGI-001",
  "AAL-IGI-002",
  "AAL-IGI-003",
  "AAL-IGI-004",
  "AAL-IGI-005",
  "AAL-IGI-006",
  "AAL-IGI-007",
  "AAL-IGI-008",
  "AAL-IGI-009",
  "AAL-IGI-010",
  "AAL-IGI-011",
  "AAL-IGI-012",
  "AAL-IGI-013",
  "AAL-IGI-014",
  "AAL-IGI-015",
  "AAL-IGI-016",
  "AAL-IGI-017",
  "AAL-IGI-018",
  "AAL-IGI-019",
]);

function assertIncludesAll(actual, expected) {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
}

function getSection(heading) {
  const start = doc.indexOf(`## ${heading}`);
  assert.notEqual(start, -1, heading);
  const next = doc.indexOf("\n## ", start + 1);
  return doc.slice(start, next === -1 ? doc.length : next);
}

test("freezes doc identity and docs-only implementation-gap posture", () => {
  assert.equal(fs.existsSync(docPath), true);
  assertIncludesAll(doc, [
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37",
    "Mode: `DOCS_ONLY`",
    "Posture: `PROVE_ONLY`",
    "Scope: `IMPLEMENTATION_GAP_INVENTORY_ONLY`",
    "GOVERNANCE_INVENTORY_ONLY",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "NO_CONTENT_AUDIT_ACCESS_TAXONOMY_REMAINS_FUTURE_IMPLEMENTATION_EVIDENCE_ONLY",
  ]);
});

test("preserves PR 29 through PR 37 lineage without blocker closure", () => {
  const lineage = getSection("Lineage");

  assertIncludesAll(lineage, [
    "PR #29 locked the court-adjacent high-risk AI readiness gap posture",
    "PR #30 made the RBAC/admin-support scope review machine-readable",
    "PR #31 added the alignment proof for the PR #30 registry",
    "PR #32 added a test-only governance dependency crosswalk proof",
    "PR #33 added a `DOCS_ONLY` / `PROVE_ONLY` admin/support sub-scope",
    "PR #34 added a test-only alignment proof for the PR #33 boundary",
    "PR #35 added a machine-readable `PROVE_ONLY` governance registry scaffold",
    "PR #36 added a test-only alignment proof for the PR #35 registry scaffold",
    "PR #37 mapped audit/access-log admin/support dependencies after PR #36",
    "does not close PR #29, PR #30,",
  ]);
});

test("includes required inventory fields and implementation gap areas", () => {
  const fields = getSection("Required Inventory Fields");
  const inventory = getSection("Implementation Gap Inventory");

  assertIncludesAll(fields, requiredFields);
  assertIncludesAll(inventory, gapIds);
  assertIncludesAll(inventory, [
    "event taxonomy runtime code",
    "event emitters",
    "no-content audit event schema",
    "no-content access event schema",
    "prohibited content filters",
    "log storage",
    "log retention/deletion",
    "log access-control",
    "log viewer authorization",
    "admin/support log access",
    "service/system actor logging",
    "cross-tenant/case/object/function/property event scope",
    "audit trail for raw-material routing decisions",
    "audit trail for third-party/provider routing decisions",
    "audit trail for retention/deletion actions",
    "audit trail for human/professional review actions",
    "local logs vs CI evidence separation",
    "security review method before findings/severity/remediation",
    "chain-of-custody non-claim boundary",
  ]);
});

test("keeps audit/access-log runtime surfaces unresolved", () => {
  assertIncludesAll(doc, [
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "AUDIT_LOGGING_NOT_IMPLEMENTED",
    "ACCESS_LOGGING_NOT_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
    "EVENT_EMITTER_NOT_CREATED",
    "LOG_SCHEMA_NOT_CREATED",
    "LOG_STORAGE_NOT_CREATED",
    "LOG_VIEWER_NOT_CREATED",
    "LOG_ACCESS_CONTROL_IMPLEMENTATION_NOT_CREATED",
    "CHAIN_OF_CUSTODY_NOT_CREATED",
  ]);
});

test("preserves no-content taxonomy and evidence boundaries", () => {
  const noContent = getSection("No-Content Taxonomy Boundary");
  const evidence = getSection("Evidence Boundaries");

  assertIncludesAll(noContent, [
    "No-content taxonomy remains future required implementation evidence only",
    "not runtime logging",
    "not event taxonomy runtime code",
    "not event emission",
    "not log schema",
    "not log storage",
    "not chain-of-custody",
    "Allowed future event content remains category-only",
    "no-raw marker",
    "no-private marker",
    "no-source-locator marker",
    "no-url marker",
    "no-token/secret marker",
    "Prohibited event/log content remains",
    "raw source text",
    "private facts",
    "source locators",
    "URLs",
    "tokens",
    "secrets",
    "provider payloads",
    "PDF/image/screenshot/metadata content",
    "legal conclusions",
    "security findings",
    "severity",
    "remediation",
  ]);

  assertIncludesAll(evidence, [
    "Local logs are not CI evidence",
    "Local logs are not packet components",
    "CI evidence is not release approval",
    "CI evidence is not runtime certification",
    "CI evidence is not technical sign-off",
    "CI evidence is not security finding creation",
    "CI evidence is not severity assignment",
    "CI evidence is not remediation recommendation or implementation",
    "CI evidence is not blocker closure",
  ]);
});

test("represents dependencies only across upstream and downstream controls", () => {
  const dependencies = getSection("Dependency Boundaries");

  assertIncludesAll(dependencies, [
    "RBAC/admin-support dependencies are represented as dependencies only",
    "Raw-material routing dependencies are represented as dependencies only",
    "Retention/deletion dependencies are represented as dependencies only",
    "Third-party/provider routing dependencies are represented as dependencies",
    "Future runtime gates are dependency-only and are not created",
    "Validator dispatch is not created",
    "Runtime registry lookup is not created",
    "Human/professional review remains required",
  ]);
});

test("preserves release, readiness, finding, and conclusion non-authorizations", () => {
  assertIncludesAll(doc, [
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
    "NO_BLOCKER_CLOSURE_CREATED",
    "NO_RELEASE_APPROVAL_CREATED",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "TECHNICAL_SIGN_OFF_NOT_CREATED",
    "RUNTIME_CERTIFICATION_NOT_CREATED",
    "COURT_READY_NOT_CREATED",
    "AI_ACT_COMPLIANCE_NOT_CREATED",
    "HIGH_RISK_APPROVAL_NOT_CREATED",
    "LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_CONCLUSION_NOT_CREATED",
  ]);
});

test("static overclaim wording remains negated or fixture-only", () => {
  const forbiddenPositivePhrases = [
    "audit log implemented",
    "access log implemented",
    "log storage created",
    "log viewer created",
    "event emitter created",
    "log schema created",
    "admin access approved",
    "support access approved",
    "court ready",
    "court-ready",
    "AI Act compliant",
    "justice ready",
    "high-risk approved",
    "implementation complete",
    "blocker closed",
  ];

  for (const phrase of forbiddenPositivePhrases) {
    assert.equal(doc.includes(phrase), false, phrase);
  }

  assertIncludesAll(doc, [
    "not implemented",
    "not created",
    "not chain-of-custody",
    "not release approval",
    "not runtime certification",
    "not technical sign-off",
    "not security finding creation",
    "not severity assignment",
    "not remediation recommendation or implementation",
    "not blocker closure",
  ]);
});
