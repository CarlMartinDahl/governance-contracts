"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "LOCAL_SERVICE_AUTHORIZATION_ARCHITECTURE_BOUNDARY_v1.md",
);
const doc = fs.readFileSync(docPath, "utf8");

const requiredHeadings = [
  "## 1. Status and classification",
  "## 2. Purpose",
  "## 3. Scope",
  "## 4. Source and provenance",
  "## 5. Existing evidence posture",
  "## 6. Authority ownership",
  "## 7. Service-operation boundary",
  "## 8. Deny-by-default permission semantics",
  "## 9. Permission current state and lifecycle",
  "## 10. Authoritative writer boundary",
  "## 11. Permission repository boundary",
  "## 12. Trusted read-only resolver boundary",
  "## 13. Current-request evaluator boundary",
  "## 14. Process and request binding",
  "## 15. Authority survival and decay",
  "## 16. Failure and availability posture",
  "## 17. Privacy and minimization",
  "## 18. Audit dependency",
  "## 19. Threat and misuse boundaries",
  "## 20. Future implementation prerequisites",
  "## 21. Future proof obligations",
  "## 22. Closure evidence model",
  "## 23. Explicit non-authorizations",
  "## 24. Human/professional review",
  "## 25. Final marker",
];

function occurrences(haystack, needle) {
  return haystack.split(needle).length - 1;
}

test("exact title and final marker are frozen", () => {
  assert.equal(
    doc.split(/\r?\n/u)[0],
    "# Local Service Authorization Architecture Boundary v1",
  );
  assert.equal(
    doc.trimEnd().endsWith(
      "LOCAL_SERVICE_AUTHORIZATION_ARCHITECTURE_BOUNDARY_V1_DOCS_ONLY_NO_IMPLEMENTATION",
    ),
    true,
  );
});

test("exact status and classification literals are frozen", () => {
  [
    "Status: DOCS_ONLY_ARCHITECTURE_BOUNDARY",
    "Version: v1",
    "Evidence classification: DOCS_ONLY",
    "Implementation posture: NOT_IMPLEMENTED",
    "Runtime posture: NOT_RUNTIME_ENFORCEMENT",
    "Schema posture: NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "Process authentication: NOT_CREATED",
    "Service authorization implementation: NOT_CREATED",
    "Authoritative permission source: NOT_CREATED",
    "Permission repository: NOT_CREATED",
    "Permission resolver: NOT_CREATED",
    "Current-request evaluator: NOT_CREATED",
    "Portable authorization grant: NOT_CREATED",
    "Domain authorization: NOT_CREATED",
    "External use: EXTERNAL_USE_NOT_AUTHORIZED",
    "Product candidate: PRODUCT_CANDIDATE_NONE",
    "Human review: HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ].forEach((literal) => assert.match(doc, new RegExp(literal, "u")));
});

test("required section headings appear exactly once and in order", () => {
  let previousIndex = -1;
  for (const heading of requiredHeadings) {
    assert.equal(occurrences(doc, heading), 1, heading);
    const currentIndex = doc.indexOf(heading);
    assert.ok(currentIndex > previousIndex, heading);
    previousIndex = currentIndex;
  }
});

test("architecture table has exact columns and required rows", () => {
  assert.match(
    doc,
    /\| Boundary \| Planned authority owner \| Current evidence \| Required invariant \| Explicit non-authorization \|/u,
  );
  [
    "process-trust administration",
    "service-operation definition",
    "service-permission current state",
    "lifecycle history",
    "authoritative writer",
    "permission repository",
    "trusted read-only resolver",
    "current-request evaluator",
    "API recipient rebinding",
    "domain authorization",
    "audit evidence",
  ].forEach((row) => assert.match(doc, new RegExp(`\\| ${row} \\|`, "u")));
});

test("deny-by-default, no-wildcard, no-inheritance, and unknown-operation fail-closed semantics are present", () => {
  assert.match(doc, /Authorization is deny-by-default/u);
  assert.match(doc, /Wildcards are prohibited/u);
  assert.match(doc, /inherited permissions are prohibited/u);
  assert.match(doc, /Unknown operations fail closed/u);
});

test("authority ownership and one-writer boundaries are present", () => {
  assert.match(doc, /Process-trust administration logically owns positive permission state/u);
  assert.match(doc, /Exactly one authoritative writer is required/u);
  assert.match(doc, /API runtime is not a permission writer/u);
  assert.match(doc, /Route handlers are not permission writers/u);
});

test("API no-direct-store access and identity-service no-positive-write boundaries are present", () => {
  assert.match(doc, /API has no direct permission-store or resolver access/u);
  assert.match(doc, /Direct cross-process store access is prohibited/u);
  assert.match(doc, /Identity-service runtime is not a positive permission writer/u);
});

test("resolver and current-request evaluator separation is present", () => {
  assert.match(doc, /Permission resolution and current-request evaluation are separate/u);
  assert.match(doc, /Resolver output is not a portable grant/u);
  assert.match(doc, /Identity service performs the later current-request evaluation/u);
  assert.match(doc, /Evaluator output is not reusable authority/u);
});

test("current request binding requirements are present", () => {
  [
    "process authentication",
    "trust roots",
    "process credentials",
    "exact permission",
    "recipient binding",
    "purpose binding",
    "operation binding",
    "freshness",
    "replay posture",
    "permission currentness",
  ].forEach((literal) => assert.match(doc, new RegExp(literal, "u")));
});

test("authority decay transitions and non-portability are present", () => {
  [
    "copying",
    "serialization",
    "caching",
    "persistence",
    "retry",
    "process restart",
    "host restart",
    "operation completion",
    "transfer",
    "permission change",
    "non-portable resolver result",
    "non-portable evaluator result",
  ].forEach((literal) => assert.match(doc, new RegExp(literal, "u")));
});

test("failure categories, implementation prerequisites, proof obligations, and closure non-claims are present", () => {
  [
    "process unauthenticated",
    "service permission absent",
    "permission suspended",
    "permission revoked",
    "permission expired",
    "permission retired",
    "permission disputed",
    "permission currentness unknown",
    "permission repository unavailable",
    "resolver unavailable",
    "evaluator unavailable",
    "trust root unavailable",
    "process credential unavailable",
    "recipient mismatch",
    "purpose mismatch",
    "operation mismatch",
    "replay detected",
    "stale request",
    "duplicate request",
    "current/history mismatch",
    "duplicate active permission",
    "partial transition",
    "stale restore",
    "restart without re-establishment",
    "authoritative writer implementation",
    "synthetic positive and negative proof",
    "No tests are created by the document",
    "Listed obligations are not passed proof",
    "None of these are closed by this DOCS_ONLY artifact",
  ].forEach((literal) => assert.match(doc, new RegExp(literal, "u")));
});

test("explicit non-authorizations are present and prohibited content is absent", () => {
  [
    "no runtime implementation",
    "no process authentication implementation",
    "no service authorization implementation",
    "no operation or permission creation",
    "no permission source",
    "no permission repository",
    "no writer",
    "no resolver",
    "no evaluator",
    "no lookup or registry",
    "no policy engine",
    "no wildcard",
    "no portable grant",
    "no API or endpoint",
    "no route or middleware change",
    "no `request.auth` migration",
    "no human RBAC implementation",
    "no domain authorization",
    "no tenant/case membership authority",
    "no audit implementation",
    "no provider routing",
    "no external use",
    "no product candidate",
    "no security finding",
    "no severity",
    "no remediation",
    "no technical sign-off",
    "no runtime certification",
    "no release approval",
    "no blocker closure",
    "no legal conclusion",
    "no clinical conclusion",
    "no evidentiary conclusion",
    "no case-truth conclusion",
  ].forEach((literal) => assert.match(doc, new RegExp(literal, "u")));
  assert.doesNotMatch(doc, /\bhttps?:\/\//u);
  assert.doesNotMatch(doc, /\/Users\//u);
  assert.doesNotMatch(doc, /module\.exports/u);
  assert.doesNotMatch(doc, /require\(/u);
  assert.doesNotMatch(doc, /\b(?:GET|POST|PUT|PATCH|DELETE) \//u);
  assert.doesNotMatch(doc, /\bport\s+\d{2,5}\b|:\d{2,5}/iu);
  assert.doesNotMatch(doc, /\b(?:AWS|Azure|GCP|Okta|Auth0|Postgres|Redis|Kafka|RabbitMQ)\b/u);
});
