"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36_v1.md",
);

const doc = fs.readFileSync(docPath, "utf8");

const requiredFields = Object.freeze([
  "dependency ID",
  "dependency area",
  "related admin/support actor or role category",
  "related permission category",
  "related material class",
  "audit/access-log question",
  "no-content requirement",
  "prohibited content in logs",
  "related RBAC/admin-support dependency",
  "related raw-material routing dependency",
  "related retention/deletion dependency",
  "related third-party routing constraint",
  "related human/professional review dependency",
  "current evidence level",
  "required implementation evidence",
  "required test evidence",
  "blocker status",
  "closure criteria",
  "what remains non-authorized until closure",
]);

const dependencyIds = Object.freeze([
  "AAL-AS-DM-001",
  "AAL-AS-DM-002",
  "AAL-AS-DM-003",
  "AAL-AS-DM-004",
  "AAL-AS-DM-005",
  "AAL-AS-DM-006",
  "AAL-AS-DM-007",
  "AAL-AS-DM-008",
  "AAL-AS-DM-009",
  "AAL-AS-DM-010",
  "AAL-AS-DM-011",
  "AAL-AS-DM-012",
  "AAL-AS-DM-013",
  "AAL-AS-DM-014",
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

test("freezes doc identity and docs-only dependency-map posture", () => {
  assert.equal(fs.existsSync(docPath), true);
  assertIncludesAll(doc, [
    "AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36",
    "Mode: `DOCS_ONLY`",
    "Posture: `PROVE_ONLY`",
    "Scope: `DEPENDENCY_MAP_ONLY`",
    "GOVERNANCE_DEPENDENCY_MAP_ONLY",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "NO_CONTENT_AUDIT_ACCESS_TAXONOMY_REMAINS_DEPENDENCY_ONLY",
  ]);
});

test("preserves PR 29 through PR 36 lineage without blocker closure", () => {
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
    "does not close PR #29, PR #30,",
  ]);
});

test("includes required dependency-map fields and core dependency areas", () => {
  const fields = getSection("Required Dependency Map Fields");
  const map = getSection("Dependency Map");

  assertIncludesAll(fields, requiredFields);
  assertIncludesAll(map, dependencyIds);
  assertIncludesAll(map, [
    "RBAC/admin-support actor scope",
    "role and permission categories",
    "admin/support access attempt",
    "material-risk classes",
    "raw/private/source routing boundary",
    "no-content audit/access taxonomy",
    "local logs and test transcripts",
    "retention/deletion dependency",
    "third-party/provider routing constraint",
    "export/download and generated artifact boundary",
    "cross-tenant/case/object/function/property risk",
    "runtime-gate future dependency",
    "CI evidence and release boundary",
    "human/professional review boundary",
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
    "event taxonomy runtime code",
    "event emitter",
    "log schema",
    "log storage",
  ]);
});

test("preserves no-content and local-log evidence boundaries", () => {
  const noContent = getSection("No-Content Boundary");
  const evidence = getSection("Evidence Boundaries");

  assertIncludesAll(noContent, [
    "Allowed future event content remains category-only",
    "event family",
    "decision status",
    "material class",
    "actor category",
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
  const map = getSection("Dependency Map");

  assertIncludesAll(map, [
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ROLE_PERMISSION_MODEL_NOT_CREATED",
    "LOG_VIEWER_RBAC_NOT_CREATED",
    "ADMIN_SUPPORT_MODEL_NOT_IMPLEMENTED",
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    "RETENTION_DELETION_NOT_IMPLEMENTED",
    "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
    "RUNTIME_GATE_INVENTORY_DEFERRED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
});

test("preserves release, readiness, finding, and conclusion non-authorizations", () => {
  assertIncludesAll(doc, [
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
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

test("static overclaim wording remains negated in the dependency map", () => {
  const forbiddenPositivePhrases = [
    "audit log implemented",
    "access log implemented",
    "log storage created",
    "event emitter created",
    "chain of custody",
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
    "chain-of-custody claim",
    "not release approval",
    "not runtime certification",
    "not technical sign-off",
    "not security finding creation",
    "not severity assignment",
    "not remediation recommendation or implementation",
    "not blocker closure",
  ]);
});
