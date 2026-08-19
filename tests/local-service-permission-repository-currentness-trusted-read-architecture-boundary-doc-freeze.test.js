import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");
const documentPath = path.join(
  repoRoot,
  "docs",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_TRUSTED_READ_ARCHITECTURE_BOUNDARY_v1.md",
);
const sourcePath = new URL(import.meta.url);
const documentText = fs.readFileSync(documentPath, "utf8");
const sourceText = fs.readFileSync(sourcePath, "utf8");

const expectedHeadings = [
  "## Status and classification",
  "## Purpose",
  "## Scope",
  "## Accepted tracked baseline",
  "## Architecture-source posture",
  "## Exact permission relation",
  "## Structural evidence versus repository truth",
  "## Compound repository currentness",
  "## Repository identity",
  "## Source and writer provenance",
  "## Version, freshness, and ordering posture",
  "## Current-state and lifecycle-history separation",
  "## Transition outcome and reconciliation",
  "## Current-history consistency",
  "## Trusted-reader role",
  "## Reader authentication",
  "## Reader authorization",
  "## Read-only repository access",
  "## Sanitized trusted-read result",
  "## Resolver separation",
  "## Evaluator and current-request separation",
  "## Cache, retry, restart, restore, and backup",
  "## Fail-closed conditions",
  "## No wildcard, inheritance, fallback, or portability",
  "## Privacy and no-raw boundary",
  "## Audit and provenance boundary",
  "## Architecture matrix",
  "## Synthetic proof obligations",
  "## Deferred decisions and open blockers",
  "## Explicit non-authorizations and closure model",
];

const expectedMatrixRows = [
  "Current-state evidence contract",
  "Writer-transition evidence contract",
  "Lifecycle-history-entry evidence contract",
  "Authoritative source",
  "Authoritative writer",
  "Repository identity",
  "Repository currentness",
  "Repository version and freshness",
  "Current-history consistency",
  "Transition outcome and reconciliation",
  "Trusted-reader identity",
  "Reader authentication",
  "Reader authorization",
  "Read-only trusted read",
  "Sanitized trusted-read result",
  "Resolver",
  "Evaluator and current-request decision",
  "Runtime enforcement",
  "Audit and provenance evidence",
];

const allowedEvidenceValues = new Set([
  "DOCS_ONLY",
  "SCHEMA_VALIDATOR_ENFORCED_FOR_EXPORTED_TRACKED_SCHEMA_VALIDATORS_ONLY",
  "UNKNOWN_NOT_EVIDENCED",
  "NOT_AUTHORIZED",
]);

const finalMarker =
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_TRUSTED_READ_ARCHITECTURE_BOUNDARY_V1_DOCS_ONLY_NO_IMPLEMENTATION";

function assertIncludesAll(values) {
  for (const value of values) {
    assert.match(documentText, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
}

function sectionText(heading) {
  const start = documentText.indexOf(`${heading}\n`);
  assert.notEqual(start, -1, `${heading} exists`);
  const next = documentText.indexOf("\n## ", start + heading.length);
  return next === -1 ? documentText.slice(start) : documentText.slice(start, next);
}

function matrixRows() {
  const rows = sectionText("## Architecture matrix")
    .split("\n")
    .filter((line) => line.startsWith("| "));
  return rows.slice(2);
}

test("uses the exact document title and fixed file path", () => {
  assert.equal(
    path.relative(repoRoot, documentPath),
    "docs/LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_TRUSTED_READ_ARCHITECTURE_BOUNDARY_v1.md",
  );
  assert.equal(
    documentText.split("\n")[0],
    "# Local Service Permission Repository Currentness and Trusted Read Architecture Boundary v1",
  );
});

test("freezes exact status, classification, implementation, runtime, schema, authority, and review posture strings", () => {
  assertIncludesAll([
    "DOCS_ONLY_ARCHITECTURE_BOUNDARY",
    "DOCS_ONLY",
    "PROVE_ONLY",
    "NOT_IMPLEMENTED",
    "NOT_RUNTIME_ENFORCEMENT",
    "NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "NO_REPOSITORY_CURRENTNESS_OR_TRUSTED_READ_AUTHORITY_CREATED",
    "NO_REPOSITORY_IMPLEMENTATION",
    "NO_TRUSTED_READER_IMPLEMENTATION",
    "NO_RESOLVER_OR_EVALUATOR_IMPLEMENTATION",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
});

test("freezes exact 30 second-level headings, order, uniqueness, and absence of extras", () => {
  const headings = documentText.match(/^## .+$/gm);
  assert.deepEqual(headings, expectedHeadings);
  assert.equal(headings.length, 30);
  assert.equal(new Set(headings).size, headings.length);
});

test("preserves accepted PR 76 through PR 80 baseline and exact evidence-classification vocabulary", () => {
  const baseline = sectionText("## Accepted tracked baseline");
  for (const pr of ["PR #76", "PR #77", "PR #78", "PR #79", "PR #80"]) {
    assert.match(baseline, new RegExp(pr.replace("#", "\\#")));
  }
  assertIncludesAll([
    "DOCS_ONLY",
    "SCHEMA_VALIDATOR_ENFORCED_FOR_EXPORTED_TRACKED_SCHEMA_VALIDATORS_ONLY",
  ]);
});

test("freezes exact five-part permission relation and deny-by-default binding", () => {
  const relation = sectionText("## Exact permission relation");
  assertIncludesAll([
    "caller process",
    "service recipient",
    "service operation",
    "request purpose",
    "permission declaration",
    "deny by default",
  ]);
  assert.match(relation, /All five parts must bind to the same exact relation/);
});

test("preserves structural evidence versus repository-truth separation", () => {
  assertIncludesAll([
    "Current-state evidence is not repository truth",
    "Transition evidence is not execution",
    "Lifecycle-history evidence is not authoritative history",
    "Schema validity is not currentness",
    "Package export is not runtime integration",
  ]);
});

test("preserves compound-currentness semantics and timestamp/version overread prohibitions", () => {
  const currentness = sectionText("## Compound repository currentness");
  for (const phrase of [
    "exact repository identity",
    "authoritative source path",
    "authoritative writer path",
    "current/history consistency",
    "restoration/cache trust re-establishment",
    "request-sufficient freshness",
    "verifies none of these",
  ]) {
    assert.match(currentness, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(documentText, /A timestamp or opaque version reference alone does not establish currentness, freshness, ordering, or authority/);
});

test("preserves repository identity, source, writer, version, freshness, and ordering boundaries", () => {
  assertIncludesAll([
    "Repository identity remains conceptual",
    "path, URL, database locator, configuration value, caller assertion, route, handler, or generic capability",
    "Source provenance and writer provenance remain separate",
    "Opaque references do not verify provenance",
    "Writer identity does not imply writer authorization",
    "A version reference is opaque",
    "Reference equality or inequality does not prove order",
  ]);
});

test("preserves current-state/history separation, transition uncertainty, reconciliation, and mismatch fail-closed posture", () => {
  assertIncludesAll([
    "Current state and lifecycle history are distinct artifacts",
    "History cannot substitute for current state",
    "Accepted for execution is not applied",
    "A committed declaration is not commit proof",
    "reconciliation-required transition outcomes fail closed",
    "Current/history mismatch fails closed",
    "This document performs no consistency check",
  ]);
});

test("preserves trusted-reader role separation from writer, administration, caller, resolver, evaluator, audit, and human administration", () => {
  const trustedReader = sectionText("## Trusted-reader role");
  for (const separatedRole of [
    "writer",
    "repository administrator",
    "process caller",
    "identity-service recipient",
    "resolver",
    "evaluator",
    "audit",
    "human administrator",
  ]) {
    assert.match(trustedReader, new RegExp(separatedRole));
  }
  assert.match(trustedReader, /A trusted reader is not created/);
});

test("preserves reader authentication, reader authorization, service permission, service authorization, and domain-authorization separation", () => {
  assertIncludesAll([
    "Reader authentication is required conceptually",
    "No credential or trust mechanism is selected",
    "does not imply reader authorization",
    "Reader authorization is explicit and narrow",
    "Authentication is not authorization",
    "Reader authorization is not service authorization",
    "domain authorization",
  ]);
});

test("preserves read-only trusted-read and sanitized no-raw result boundary", () => {
  assertIncludesAll([
    "one exact target and one exact relation query",
    "no mutation",
    "It would allow no mutation, self-grant, fallback repository",
    "exact relation association",
    "bounded lifecycle/currentness posture",
    "bounded provenance posture",
    "current/history-consistency posture",
    "raw records",
    "full history",
    "allow",
    "access grant",
  ]);
});

test("preserves resolver/evaluator separation and request-bound authority decay", () => {
  assertIncludesAll([
    "Trusted read is not resolver output",
    "Resolver remains downstream",
    "No resolver, resolver result, registry lookup, dynamic lookup, dispatch, or policy engine is created",
    "Evaluator remains downstream from authenticated caller and trusted resolver",
    "decays at request completion",
    "No allow decision, deny decision, authorization decision, access grant, route enforcement, middleware integration, or runtime enforcement is created",
  ]);
});

test("preserves cache, retry, restart, restore, backup, replica, and serialization fail-closed posture", () => {
  assertIncludesAll([
    "Serialization does not preserve authority",
    "Cache survival does not preserve authority",
    "Retry does not preserve authority",
    "Restart does not preserve authority",
    "Restore does not automatically preserve authority",
    "Backup age does not establish freshness",
    "Stale replica",
    "partial replication",
    "fail closed",
  ]);
});

test("preserves wildcard, inheritance, fallback, route/capability authority, human/domain derivation, and portable-grant prohibitions", () => {
  assertIncludesAll([
    "wildcard caller",
    "wildcard recipient",
    "wildcard operation",
    "wildcard purpose",
    "inheritance",
    "broad service-admin role",
    "fallback permission",
    "portable grant",
    "route-derived authority",
    "capability-derived authority",
    "human-role derivation",
    "domain derivation",
  ]);
});

test("preserves privacy, audit, provenance, deferred-decision, and open-blocker posture", () => {
  assertIncludesAll([
    "must not expose raw permission records",
    "credentials, secrets, tokens, certificates, signatures, trust roots, or provider payloads",
    "Audit is not authority",
    "Audit is not currentness",
    "Audit is not repository truth",
    "Deferred decisions and open blockers include",
    "security review",
    "external use",
  ]);
});

test("freezes exact architecture-matrix header, 19 rows, row order, allowed evidence values, and exact No final cells", () => {
  const rows = matrixRows();
  assert.equal(rows.length, 19);
  assert.equal(
    sectionText("## Architecture matrix").split("\n").filter((line) => line.startsWith("| Boundary element |")).length,
    1,
  );
  const labels = rows.map((row) => row.split("|").map((cell) => cell.trim())[1]);
  assert.deepEqual(labels, expectedMatrixRows);
  assert.equal(new Set(labels).size, labels.length);
  for (const row of rows) {
    const cells = row.split("|").map((cell) => cell.trim()).slice(1, -1);
    assert.equal(cells.length, 5);
    assert.ok(allowedEvidenceValues.has(cells[1]), `${cells[1]} is allowed`);
    assert.equal(cells[3], "No");
    assert.equal(cells[4], "No");
  }
});

test("preserves synthetic proof categories, explicit non-authorizations, human review, exact final marker, marker uniqueness, and source shape", () => {
  assertIncludesAll([
    "exact five-part permission relation",
    "compound-currentness declaration",
    "reader/writer separation",
    "wildcard relation",
    "unauthenticated reader",
    "unauthorized reader",
    "current/history mismatch",
    "allow/access result",
    "This document does not authorize implementation",
    "No blocker is closed",
    "Human/professional review remains required",
  ]);
  const trimmed = documentText.trimEnd();
  assert.equal(trimmed.endsWith(finalMarker), true);
  assert.equal(trimmed.split(finalMarker).length - 1, 1);
  assert.equal(trimmed.slice(trimmed.lastIndexOf(finalMarker)), finalMarker);
  const topLevelTests = sourceText.match(/^test\("/gm) ?? [];
  assert.equal(topLevelTests.length, 18);
  assert.doesNotMatch(sourceText, /test\.(?:skip|todo|only)\(/);
  const forbiddenSourcePatterns = [
    new RegExp(`\\b${["fe", "tch"].join("")}\\b`),
    new RegExp(`\\b${["ax", "ios"].join("")}\\b`),
    new RegExp(`\\b${["child_", "process"].join("")}\\b`),
    new RegExp(`\\b${["sp", "awn"].join("")}\\b`),
    new RegExp(`\\b${["ex", "ec"].join("")}\\b`),
    new RegExp(`\\b${["process", "\\.", "env"].join("")}\\b`),
    new RegExp(`\\b${["write", "File"].join("")}\\b`),
    new RegExp(`\\b${["append", "File"].join("")}\\b`),
  ];

  for (const forbiddenSourcePattern of forbiddenSourcePatterns) {
    assert.doesNotMatch(sourceText, forbiddenSourcePattern);
  }
});
