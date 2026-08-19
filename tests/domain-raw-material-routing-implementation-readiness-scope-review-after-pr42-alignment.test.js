"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

const trackedEvidencePaths = Object.freeze({
  pr43ScopeReview:
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR42_v1.md",
  pr43ScopeReviewProof:
    "tests/domain-raw-material-routing-implementation-readiness-scope-review-after-pr42.test.js",
  pr41Registry:
    "packages/governance/src/rbac-role-permission-admin-support-scope-review-registry.js",
  pr42RegistryAlignmentProof:
    "tests/rbac-role-permission-admin-support-scope-review-registry-alignment.test.js",
  pr39ScopeReview:
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38_v1.md",
  pr39ScopeReviewProof:
    "tests/domain-rbac-role-permission-admin-support-scope-review-after-pr38.test.js",
  pr40ScopeReviewAlignmentProof:
    "tests/domain-rbac-role-permission-admin-support-scope-review-after-pr38-alignment.test.js",
  pr37AuditDependencyMap:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36_v1.md",
  pr38AuditGapInventory:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37_v1.md",
  pr37AuditDependencyMapProof:
    "tests/domain-audit-access-log-admin-support-dependency-mapping-after-pr36.test.js",
  pr38AuditGapInventoryProof:
    "tests/domain-audit-access-log-implementation-gap-inventory-after-pr37.test.js",
  pr32CourtRbacCrosswalk:
    "tests/court-adjacent-rbac-admin-support-dependency-crosswalk.test.js",
});

const readTracked = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const trackedEvidence = Object.fromEntries(
  Object.entries(trackedEvidencePaths).map(([key, repoRelativePath]) => [
    key,
    readTracked(repoRelativePath),
  ]),
);

const scopeReview = trackedEvidence.pr43ScopeReview;
const scopeReviewProof = trackedEvidence.pr43ScopeReviewProof;

const requiredLineage = Object.freeze(
  Array.from({ length: 14 }, (_, index) => `PR #${index + 29}`),
);

const requiredRowIds = Object.freeze(
  Array.from({ length: 12 }, (_, index) =>
    `RMR-IR-SR-${String(index + 1).padStart(3, "0")}`,
  ),
);

const requiredFields = Object.freeze([
  "row ID",
  "material class",
  "allowed ingress",
  "prohibited ingress",
  "allowed processing layer",
  "prohibited processing layer",
  "allowed egress",
  "prohibited egress",
  "required redaction/sanitization point",
  "required audit/access-log event",
  "retention/deletion dependency",
  "RBAC/access-control dependency",
  "admin/support dependency",
  "third-party model/API constraint",
  "current evidence level",
  "intended enforcement layer",
  "implementation gap",
  "required implementation evidence",
  "required test evidence",
  "blocker status",
  "closure criteria",
  "remains non-authorized until closure",
]);

const requiredMaterialClasses = Object.freeze([
  "sanitized/no-raw review material",
  "redacted review signals",
  "no-raw metadata manifest material",
  "generated/export artifacts",
  "local logs/test transcripts",
  "raw private source material",
  "source packages",
  "PDF/image/screenshot/metadata material",
  "third-party model/API routed material",
  "human/professional review-only material",
  "unknown/unclassified material",
  "mixed or ambiguous material bundles",
]);

const requiredScopeSections = Object.freeze([
  "## Routing Readiness Assumptions",
  "## Scope Boundaries",
  "## Dependency Map",
  "## Closure Criteria Are Future-Only",
  "## Positive-Overclaim Guard",
  "## Non-Authorizations",
]);

const requiredDependencyPhrases = Object.freeze([
  "PR #39 through PR #42",
  "RBAC model, access-control implementation, role-permission model, role fields, permission fields, role schema, permission schema, admin/support implementation, and admin/support access authorization remain not created",
  "PR #37 and PR #38 audit/access-log evidence remains dependency context only",
  "Retention/deletion/encryption remains future-only",
  "Third-party/provider routing remains not authorized",
  "Runtime gates, validator dispatch, registry lookup, runtime registry lookup, material-class registry implementation, and scope model implementation remain not created",
]);

const requiredBoundaryPhrases = Object.freeze([
  "Mode: `DOCS_ONLY`",
  "Posture: `PROVE_ONLY`",
  "Scope: `IMPLEMENTATION_READINESS_SCOPE_REVIEW_ONLY`",
  "dependency-only",
  "future-only",
  "closure criteria do not mean closure",
  "Closure criteria in this document are future criteria only.",
  "Local logs are not CI evidence.",
  "CI evidence is not release approval",
  "Human/professional review remains required.",
]);

const requiredNonAuthorizationFragments = Object.freeze([
  ["no raw-material routing ", "imple", "mentation"],
  ["no route policy ", "imple", "mentation"],
  ["no route decision engine"],
  ["no quarantine ", "imple", "mentation"],
  ["no block path ", "imple", "mentation"],
  ["no runtime gate work"],
  ["no validator dispatch"],
  ["no registry lookup"],
  ["no runtime registry lookup"],
  ["no material-class registry ", "imple", "mentation"],
  ["no scope model ", "imple", "mentation"],
  ["no RBAC ", "imple", "mentation"],
  ["no access-control ", "imple", "mentation"],
  ["no RBAC/access-control enforcement"],
  ["no admin/support access authorization"],
  ["no audit/access-log ", "imple", "mentation"],
  ["no audit logging ", "imple", "mentation"],
  ["no access logging ", "imple", "mentation"],
  ["no event emitter"],
  ["no log schema"],
  ["no log storage"],
  ["no log viewer"],
  ["no log access-control ", "imple", "mentation"],
  ["no third-party routing"],
  ["no retention/deletion/encryption ", "imple", "mentation"],
  ["no chain-of-custody claim"],
  ["no blocker closure"],
  ["no security ", "find", "ing"],
  ["no seve", "rity"],
  ["no reme", "diation"],
  ["no release approval"],
  ["no external-use"],
  ["no product candidate"],
  ["no technical sign-off"],
  ["no runtime certification"],
  ["no legal/clinical/evidentiary/case-truth conclusion"],
  ["no court-ready claim"],
  ["no AI Act compliance claim"],
  ["no high-risk approval claim"],
]);

const forbiddenPositiveFragments = Object.freeze([
  ["raw material routing ", "imple", "mented"],
  ["raw-material routing ", "imple", "mented"],
  ["route policy ", "imple", "mented"],
  ["route decision engine ", "cre", "ated"],
  ["quarantine ", "imple", "mented"],
  ["block path ", "imple", "mented"],
  ["validator dispatch ", "cre", "ated"],
  ["registry lookup ", "cre", "ated"],
  ["runtime registry lookup ", "cre", "ated"],
  ["material class registry ", "imple", "mented"],
  ["scope model ", "imple", "mented"],
  ["third-party routing ", "auth", "orized"],
  ["third party routing ", "auth", "orized"],
  ["provider routing ", "auth", "orized"],
  ["raw material route ", "auth", "orized"],
  ["raw/private/source ", "inspe", "cted"],
  ["source package ", "inspe", "cted"],
  ["PDF ", "inspe", "cted"],
  ["image ", "inspe", "cted"],
  ["screenshot ", "inspe", "cted"],
  ["metadata ", "inspe", "cted"],
  ["runtime gate ", "cre", "ated"],
  ["RBAC ", "imple", "mented"],
  ["access-control ", "imple", "mented"],
  ["access control ", "imple", "mented"],
  ["admin support access ", "auth", "orized"],
  ["admin/support access ", "auth", "orized"],
  ["audit/access-log ", "imple", "mented"],
  ["audit logging ", "imple", "mented"],
  ["access logging ", "imple", "mented"],
  ["retention ", "imple", "mented"],
  ["deletion ", "imple", "mented"],
  ["encryption ", "imple", "mented"],
  ["chain-of-custody ", "cre", "ated"],
  ["security ", "find", "ing"],
  ["seve", "rity"],
  ["reme", "diation"],
  ["release ", "approval"],
  ["external-use ", "auth", "orized"],
  ["external use ", "auth", "orized"],
  ["product candidate ", "sel", "ected"],
  ["technical ", "sign-", "off"],
  ["runtime ", "certi", "fication"],
  ["court ", "ready"],
  ["court-", "ready"],
  ["AI Act ", "comp", "liant"],
  ["high-risk ", "appro", "ved"],
  ["legal ", "conclusion"],
  ["clinical ", "conclusion"],
  ["evidentiary ", "conclusion"],
  ["case-truth ", "conclusion"],
  ["imple", "mentation complete"],
  ["blocker ", "clo", "sed"],
]);

function assertIncludesAll(actual, expected) {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
}

function assertFragmentIncludesAll(actual, fragments) {
  for (const parts of fragments) {
    const phrase = parts.join("");
    assert.equal(actual.includes(phrase), true, phrase);
  }
}

test("PR43 tracked scope-review and proof files exist with fixed evidence paths", () => {
  for (const repoRelativePath of Object.values(trackedEvidencePaths)) {
    assert.equal(path.isAbsolute(repoRelativePath), false, repoRelativePath);
    assert.equal(
      fs.existsSync(path.join(repoRoot, repoRelativePath)),
      true,
      repoRelativePath,
    );
    assert.equal(readTracked(repoRelativePath).length > 0, true);
  }

  assertIncludesAll(scopeReviewProof, [
    trackedEvidencePaths.pr43ScopeReview,
    "raw-material routing scope review doc exists and is DOCS_ONLY PROVE_ONLY",
    "positive-overclaim guard remains non-authorizing",
  ]);
});

test("PR43 scope review keeps docs-only prove-only identity and full matrix coverage", () => {
  assertIncludesAll(scopeReview, requiredBoundaryPhrases);
  assertIncludesAll(scopeReview, requiredScopeSections);
  assertIncludesAll(scopeReview, requiredLineage);
  assertIncludesAll(scopeReview, requiredRowIds);
  assertIncludesAll(scopeReview, requiredFields);
  assertIncludesAll(scopeReview, requiredMaterialClasses);
  assert.match(scopeReview, /PR_29_THROUGH_PR_42_LINEAGE_PRESERVED/);
});

test("PR43 aligns with RBAC role-permission admin-support dependency evidence", () => {
  assertIncludesAll(trackedEvidence.pr41Registry, [
    "RAW_MATERIAL_ROUTING_REVIEWER",
    "PR_39_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW",
    "PR_40_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_ALIGNMENT_PROOF",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
  assertIncludesAll(trackedEvidence.pr42RegistryAlignmentProof, [
    "raw-material routing reviewer",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
  ]);
  assertIncludesAll(trackedEvidence.pr39ScopeReview, [
    "PR_29_THROUGH_PR_38_LINEAGE_PRESERVED",
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
    "THIRD_PARTY_PROVIDER_ROUTING_NOT_AUTHORIZED",
    "LOCAL_VALIDATION_NOT_CI_EVIDENCE",
  ]);
  assertIncludesAll(trackedEvidence.pr39ScopeReviewProof, [
    "declares docs-only prove-only scope boundary after PR38",
    "preserves RBAC, admin/support, audit, lifecycle, routing, and runtime non-authorizations",
  ]);
  assertIncludesAll(trackedEvidence.pr40ScopeReviewAlignmentProof, [
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "CI_EVIDENCE_NOT_BLOCKER_CLOSURE",
  ]);
  assertIncludesAll(scopeReview, requiredDependencyPhrases);
});

test("PR43 aligns with audit access-log dependency and gap evidence", () => {
  assertIncludesAll(trackedEvidence.pr37AuditDependencyMap, [
    "AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36",
    "PR_29_THROUGH_PR_36_LINEAGE_PRESERVED",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    "LOCAL_LOGS_NOT_CI_EVIDENCE",
    "CI_EVIDENCE_NOT_RELEASE_APPROVAL",
  ]);
  assertIncludesAll(trackedEvidence.pr38AuditGapInventory, [
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37",
    "PR_29_THROUGH_PR_37_LINEAGE_PRESERVED",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "AAL-IGI-013",
    "audit trail for raw-material routing decisions",
    "raw-material routing implementation remains absent",
    "chain-of-custody non-claim boundary",
  ]);
  assertIncludesAll(trackedEvidence.pr37AuditDependencyMapProof, [
    "keeps audit/access-log runtime surfaces unresolved",
    "preserves no-content and local-log evidence boundaries",
  ]);
  assertIncludesAll(trackedEvidence.pr38AuditGapInventoryProof, [
    "keeps audit/access-log runtime surfaces unresolved",
    "preserves no-content taxonomy and evidence boundaries",
    "represents dependencies only across upstream and downstream controls",
  ]);
  assertIncludesAll(scopeReview, [
    "Audit/access-log implementation remains not created.",
    "future category-only sanitized route decision event; no payload",
    "future category-only attempted-ingress denial event; no content",
  ]);
});

test("PR43 aligns with court-adjacent RBAC dependency posture", () => {
  assertIncludesAll(trackedEvidence.pr32CourtRbacCrosswalk, [
    "CAHR-AI-GAP-001_RBAC_ACCESS_CONTROL",
    "CAHR-AI-GAP-002_AUDIT_ACCESS_LOG",
    "CAHR-AI-GAP-004_PROVIDER_THIRD_PARTY_ROUTING",
    "CAHR-AI-GAP-005_RAW_MATERIAL_SOURCE_HANDLING",
    "CAHR-AI-GAP-010_HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW",
    "RP-SG-017_RAW_MATERIAL_ROUTING_PERMISSION_GAP",
    "RMR-CS-010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
  assertIncludesAll(scopeReview, [
    "Human/professional review remains required.",
    "human/professional review-only material",
    "automated approval, product selection, court/AI Act readiness declaration",
    "separate human/professional review evidence and explicit release boundary",
  ]);
});

test("PR43 preserves inspection exclusions and dependency-only future closure boundaries", () => {
  assertIncludesAll(scopeReview, [
    "No raw/private/source material was inspected.",
    "No source package, PDF/image/screenshot/metadata, provider payload, URL, token, secret, local log, or CI log material is inspected or authorized",
    "This review does not inspect, route, transform, classify at runtime, quarantine, block, persist, emit, log, delete, purge, erase, encrypt, send, or deliver material.",
    "Retention/deletion/encryption remains future-only.",
    "Third-party/provider routing remains not authorized.",
    "Closure criteria in this document are future criteria only.",
    "They do not close blockers.",
    "They do not authorize raw/private/source inspection",
    "source package inspection",
    "PDF/image/screenshot/metadata inspection",
    "metadata acquisition",
    "third-party/provider routing",
  ]);
  assertFragmentIncludesAll(scopeReview, requiredNonAuthorizationFragments);
});

test("positive-overclaim guard remains negated, forbidden, or future-only", () => {
  for (const fragmentParts of forbiddenPositiveFragments) {
    const phrase = fragmentParts.join("");
    let index = scopeReview.indexOf(phrase);
    while (index !== -1) {
      const context = scopeReview
        .slice(Math.max(0, index - 360), index + phrase.length + 360)
        .toLowerCase();
      assert.match(
        context,
        /\b(no|not|does not|without|forbidden|convert|fail closed|future-only|future|non-authorization)\b/,
        `unexpected positive overclaim phrase without negating context: ${phrase}`,
      );
      index = scopeReview.indexOf(phrase, index + phrase.length);
    }
  }
});
