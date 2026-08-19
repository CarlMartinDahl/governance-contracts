const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY_v1.md",
);

const doc = fs.readFileSync(docPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(haystack, values) {
  for (const value of values) {
    assert.match(haystack, new RegExp(escapeRegExp(value)), `missing required text: ${value}`);
  }
}

function assertDoesNotIncludeExactToken(haystack, token) {
  const tokenPattern = new RegExp(`(?<![A-Z0-9_])${escapeRegExp(token)}(?![A-Z0-9_])`);
  assert.doesNotMatch(haystack, tokenPattern, `forbidden exact token present: ${token}`);
}

function sectionBetween(heading, nextHeading) {
  const start = doc.indexOf(heading);
  assert.notEqual(start, -1, `missing section: ${heading}`);
  const afterStart = start + heading.length;
  const end = nextHeading ? doc.indexOf(nextHeading, afterStart) : doc.length;
  assert.notEqual(end, -1, `missing next section: ${nextHeading}`);
  return doc.slice(afterStart, end);
}

test("boundary doc exists and freezes only the requested status-family scope", () => {
  assert.ok(fs.existsSync(docPath), "boundary doc must exist");
  assertIncludesAll(doc, [
    "Status-Family Allowed/Prohibited Label-Set Scope After No-Overclaim Consistency Scope Boundary v1",
    "DOCS_ONLY boundary",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY_v1",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY_DOCS_ONLY",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY_NO_RUNTIME",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY_NO_SCHEMA",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY_NO_API",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY_NO_PACKAGE_EXPORT",
  ]);
});

test("allowed negative status-family identity vocabulary is present", () => {
  assertIncludesAll(doc, [
    "DOCS_ONLY",
    "LABEL_STATUS_ONLY",
    "REVIEW_ROUTE_NOTE_CATEGORY_ONLY",
    "NOT_AUTHORIZED",
    "BLOCKED",
    "FUTURE_ONLY",
    "TESTED_SCENARIO_NOT_RUNTIME_CERTAINTY",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_UNAUTHORIZED",
    "NO_ACTUAL_LABEL_APPLICATION",
    "NO_APPLIED_STATUS_LABELS",
    "NO_RUNTIME_STATUS_APPLICATION",
    "NO_PRODUCT_STATUS_APPLICATION",
    "NO_DELIVERY_STATUS_APPLICATION",
    "NO_ROUTE_EXECUTION",
    "NO_ACTUAL_REVIEW_ROUTE_CREATED",
    "NO_REVIEW_ROUTE_EXECUTED",
    "NO_CANDIDATE_SELECTION",
    "NO_EXAMPLE_CANDIDATE_TEXT",
    "NO_SYNTHETIC_TEST_MATERIAL_SELECTION",
    "NO_TECHNICAL_EVIDENCE",
    "NO_CI_EVIDENCE",
    "NO_RELEASE_APPROVAL",
    "NO_SIGNOFF",
    "NO_CERTIFICATION",
    "NO_EXTERNAL_USE_AUTHORIZATION",
    "NO_PRODUCT_CANDIDATE",
    "NO_FINDING",
    "NO_SEVERITY",
    "NO_REMEDIATION",
    "NO_BLOCKER_RESOLUTION",
    "NO_DEPENDENCY_CLOSURE",
    "NO_PRIVATE_RUN",
    "NO_RAW_PRIVATE_SOURCE_INSPECTION",
    "NO_METADATA_ACQUISITION",
    "NO_SOURCE_PACKAGE_INSPECTION",
  ]);
});

test("source hierarchy and current accepted state remain explicit", () => {
  assertIncludesAll(sectionBetween("## Source Hierarchy", "## Current Accepted State"), [
    "Docs/specs are the product and contract source of truth.",
    "Schemas are the machine-readable contract truth.",
    "Tests are living proof.",
    "Runtime code must not silently outrun docs/contracts/tests.",
    "AGENTS.md",
    "REDACTED_PRIVATE_CONTEXT_FILE",
    "DOMAIN_CONTRACTS_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_BOUNDARY_v1.md",
    "DOMAIN_CONTRACTS_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_BOUNDARY_v1.md",
  ]);

  assertIncludesAll(sectionBetween("## Current Accepted State", "## Prior Read-Only Review Result"), [
    "928b811",
    "NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_BOUNDARY_DOCS_ONLY_FROZEN_AND_COMMITTED",
    "did not create implementation",
    "runtime behavior",
    "schema behavior",
    "API behavior",
    "package exports",
  ]);
});

test("prior read-only review result remains non-authorizing", () => {
  assertIncludesAll(sectionBetween("## Prior Read-Only Review Result", "## SF-LABEL Matrix"), [
    "REVIEW_ONLY",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY",
    "freezes that partial/gap review result only",
    "descriptive and advisory",
    "not a finding",
    "remediation plan",
    "severity assignment",
    "approval",
    "sign-off",
    "certification",
    "blocker closure",
    "dependency closure",
    "product decision",
    "release decision",
    "external-use authorization",
    "D007 authorization",
    "pilot",
    "private run",
    "material selection",
  ]);
});

test("SF-LABEL matrix includes all required rows and columns", () => {
  const matrix = sectionBetween("## SF-LABEL Matrix", "## Required Row Content");
  assertIncludesAll(matrix, [
    "| Row | Source | Allowed status-family vocabulary | Prohibited label/status-family meaning | Scope note | Required future proof posture |",
    "SF-LABEL-001",
    "SF-LABEL-002",
    "SF-LABEL-003",
    "SF-LABEL-004",
    "SF-LABEL-005",
    "SF-LABEL-006",
    "SF-LABEL-007",
    "SF-LABEL-008",
    "SF-LABEL-009",
    "SF-LABEL-010",
    "SF-LABEL-011",
    "SF-LABEL-012",
    "SF-LABEL-013",
    "SF-LABEL-014",
    "SF-LABEL-015",
    "SF-LABEL-016",
    "SF-LABEL-017",
    "SF-LABEL-018",
    "SF-LABEL-019",
    "SF-LABEL-020",
    "SF-LABEL-021",
    "SF-LABEL-022",
    "SF-LABEL-023",
    "SF-LABEL-024",
    "SF-LABEL-025",
    "SF-LABEL-026",
    "SF-LABEL-027",
    "SF-LABEL-028",
    "SF-LABEL-029",
    "SF-LABEL-030",
  ]);
});

test("required row content freezes vocabulary without behavior", () => {
  assertIncludesAll(sectionBetween("## Required Row Content", "## Status-Family Allowed/Prohibited Label-Set Scope Summary After No-Overclaim Consistency Scope"), [
    "label-set boundary",
    "not as an implementation checklist",
    "negative",
    "blocked",
    "future-only",
    "docs-only",
    "note-category-only",
    "no-overclaim",
    "does not attach labels",
    "set statuses",
    "create routes",
    "execute routes",
    "produce evidence",
    "select candidates",
    "select examples",
    "select test materials",
    "run pilots",
    "run private material",
    "inspect raw/private/source/log/PDF/image/screenshot/metadata/source-package material",
    "create findings",
    "assign severity",
    "recommend remediation",
    "close blockers",
    "close dependencies",
    "approve release",
    "sign off",
    "certify",
    "create product candidates",
    "authorize delivery",
    "authorize D007",
    "authorize external use",
  ]);
});

test("summary and non-authorizations preserve no-overclaim posture", () => {
  assertIncludesAll(sectionBetween("## Status-Family Allowed/Prohibited Label-Set Scope Summary After No-Overclaim Consistency Scope", "## Required Non-Authorizations"), [
    "Allowed status-family label vocabulary is limited",
    "fail-closed categories",
    "docs-only",
    "label/status-only",
    "review-route-note-category-only",
    "not evidenced",
    "not CI-proven",
    "not released",
    "not signed off",
    "not certified",
    "not product-ready",
    "not externally usable",
    "not delivered",
    "not a finding",
    "not severity-scored",
    "not remediated",
    "not blocker-closed",
    "not dependency-closed",
  ]);

  assertIncludesAll(sectionBetween("## Required Non-Authorizations", "## Evidence Limits"), [
    "This boundary does not authorize:",
    "runtime behavior changes",
    "API behavior changes",
    "schema changes",
    "package export changes",
    "actual label application",
    "applied status labels",
    "runtime status application",
    "product status application",
    "delivery status application",
    "actual review-route creation",
    "review-route execution",
    "candidate selection",
    "example candidate text",
    "synthetic test material selection",
    "pilot execution",
    "private runs",
    "raw/private/source inspection",
    "metadata acquisition",
    "source package inspection",
    "technical evidence creation",
    "CI evidence creation",
    "findings",
    "severity",
    "remediation",
    "blocker resolution",
    "dependency closure",
    "sign-off",
    "certification",
    "release approval",
    "product candidate selection",
    "delivery",
    "D007 activity",
    "external use",
    "None are authorized by this boundary.",
  ]);
});

test("evidence, no-overclaim, External Reviewer, and next-posture sections stay bounded", () => {
  assertIncludesAll(sectionBetween("## Evidence Limits", "## No-Overclaim Rules"), [
    "focused proof test",
    "not CI evidence",
    "technical evidence packet",
    "external evidence",
    "human review",
    "professional review",
    "release approval",
    "product readiness proof",
    "runtime proof",
    "schema proof",
    "API proof",
    "package/export proof",
    "D007 proof",
    "private-run proof",
    "material-handling proof",
  ]);

  assertIncludesAll(sectionBetween("## No-Overclaim Rules", "## External Reviewer Posture"), [
    "Do not convert allowed negative label-family vocabulary into affirmative readiness claims.",
    "Do not treat documentation labels as actual labels.",
    "Do not treat review-route note categories as routes.",
    "Do not treat vocabulary rows as examples, candidates, or test material.",
    "Do not treat local proof-test output as CI evidence or technical evidence.",
    "Do not treat blocker or dependency references as closures.",
    "Do not treat green local validation as release approval",
  ]);

  assertIncludesAll(sectionBetween("## External Reviewer Posture", "## Recommended Next Posture"), [
    "External Reviewer-specific",
    "fail-closed",
    "no External Reviewer-specific conclusion",
    "score",
    "report",
    "pleading",
    "remediation",
    "finding",
    "severity",
    "product candidate",
    "external-use authorization",
    "delivery",
    "pilot",
    "private run",
    "raw/private/source inspection",
    "D007 activity",
  ]);

  assertIncludesAll(sectionBetween("## Recommended Next Posture", null), [
    "REVIEW_ONLY_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY",
    "continued pause",
    "No runtime",
    "API",
    "schema",
    "package/export",
    "evidence",
    "CI",
    "product",
    "delivery",
    "release",
    "external-use",
    "D007",
    "private-run",
    "pilot",
    "material-selection",
    "finding",
    "severity",
    "remediation",
    "blocker-closure",
    "dependency-closure",
    "None are authorized by this boundary.",
  ]);
});

test("forbidden exact overclaiming status tokens are absent", () => {
  [
    "ACTUAL_LABEL_APPLIED",
    "STATUS_APPLIED",
    "RUNTIME_STATUS_APPLIED",
    "PRODUCT_STATUS_APPLIED",
    "DELIVERY_STATUS_APPLIED",
    "ACTUAL_REVIEW_ROUTE_CREATED",
    "REVIEW_ROUTE_EXECUTED",
    "CANDIDATE_SELECTED",
    "EXAMPLE_CANDIDATE_TEXT_CREATED",
    "SYNTHETIC_TEST_MATERIAL_SELECTED",
    "TECHNICAL_EVIDENCE_CREATED",
    "CI_EVIDENCE_CREATED",
    "RELEASE_APPROVED",
    "SIGNOFF_CREATED",
    "CERTIFICATION_CREATED",
    "EXTERNAL_USE_AUTHORIZED",
    "PRODUCT_CANDIDATE_SELECTED",
    "FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "BLOCKER_RESOLVED",
    "DEPENDENCY_CLOSED",
    "PRIVATE_RUN_AUTHORIZED",
    "RAW_PRIVATE_SOURCE_INSPECTED",
    "METADATA_ACQUIRED",
    "SOURCE_PACKAGE_INSPECTED",
    "CONTRACT_ONLY",
  ].forEach((token) => assertDoesNotIncludeExactToken(doc, token));
});
