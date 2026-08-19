"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

const scopeReviewPath =
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR42_v1.md";

const trackedEvidencePaths = Object.freeze([
  scopeReviewPath,
  "packages/governance/src/rbac-role-permission-admin-support-scope-review-registry.js",
  "tests/rbac-role-permission-admin-support-scope-review-registry-alignment.test.js",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38_v1.md",
  "tests/domain-rbac-role-permission-admin-support-scope-review-after-pr38.test.js",
  "tests/domain-rbac-role-permission-admin-support-scope-review-after-pr38-alignment.test.js",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36_v1.md",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37_v1.md",
  "tests/domain-audit-access-log-admin-support-dependency-mapping-after-pr36.test.js",
  "tests/domain-audit-access-log-implementation-gap-inventory-after-pr37.test.js",
  "tests/court-adjacent-rbac-admin-support-dependency-crosswalk.test.js",
]);

const readTracked = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const scopeReview = readTracked(scopeReviewPath);
const trackedEvidence = Object.fromEntries(
  trackedEvidencePaths.map((repoRelativePath) => [
    repoRelativePath,
    readTracked(repoRelativePath),
  ]),
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

const requiredLineage = Object.freeze(
  Array.from({ length: 14 }, (_, index) => `PR #${index + 29}`),
);

const requiredNegativePhrases = Object.freeze([
  "not raw-material routing implementation",
  "No raw/private/source material was inspected.",
  "No source package, PDF/image/screenshot/metadata, provider payload, URL, token, secret, local log, or CI log material is inspected or authorized",
  "no raw-material routing implementation",
  "no route policy implementation",
  "no route decision engine",
  "no quarantine implementation",
  "no block path implementation",
  "no validator dispatch",
  "no registry lookup",
  "no runtime registry lookup",
  "no material-class registry implementation",
  "no scope model implementation",
  "no runtime gate work",
  "no RBAC implementation",
  "no access-control implementation",
  "no RBAC/access-control enforcement",
  "no admin/support access authorization",
  "no audit/access-log implementation",
  "no third-party routing",
  "no retention/deletion/encryption implementation",
  "no chain-of-custody claim",
  "no security finding",
  "no severity",
  "no remediation",
  "no release approval",
  "no external-use",
  "no product candidate",
  "no technical sign-off",
  "no runtime certification",
  "no court-ready claim",
  "no AI Act compliance claim",
  "no high-risk approval claim",
  "no legal/clinical/evidentiary/case-truth conclusion",
  "dependency-only",
  "Closure criteria in this document are future criteria only.",
  "Local logs are not CI evidence.",
  "CI evidence is not release approval",
  "Human/professional review remains required.",
]);

const requiredDependencyPhrases = Object.freeze([
  "PR #39 through PR #42",
  "RBAC model, access-control implementation, role-permission model, role fields, permission fields, role schema, permission schema, admin/support implementation, and admin/support access authorization remain not created",
  "PR #37 and PR #38 audit/access-log evidence remains dependency context only",
  "Retention/deletion/encryption remains future-only",
  "Third-party/provider routing remains not authorized",
  "Runtime gates, validator dispatch, registry lookup, runtime registry lookup, material-class registry implementation, and scope model implementation remain not created",
]);

function assertIncludesAll(haystack, needles) {
  for (const needle of needles) {
    assert.equal(haystack.includes(needle), true, needle);
  }
}

test("raw-material routing scope review doc exists and is DOCS_ONLY PROVE_ONLY", () => {
  assert.equal(fs.existsSync(path.join(repoRoot, scopeReviewPath)), true);
  assertIncludesAll(scopeReview, [
    "Mode: `DOCS_ONLY`",
    "Posture: `PROVE_ONLY`",
    "Scope: `IMPLEMENTATION_READINESS_SCOPE_REVIEW_ONLY`",
    "docs-only, prove-only implementation-readiness scope review",
    "not implementation",
    "not runtime behavior",
  ]);
});

test("scope review preserves lineage, row coverage, fields, and material classes", () => {
  assertIncludesAll(scopeReview, requiredLineage);
  assertIncludesAll(scopeReview, requiredRowIds);
  assertIncludesAll(scopeReview, requiredFields);
  assertIncludesAll(scopeReview, requiredMaterialClasses);
  assert.match(scopeReview, /PR_29_THROUGH_PR_42_LINEAGE_PRESERVED/);
});

test("scope review preserves dependency-only posture and future-only closure", () => {
  assertIncludesAll(scopeReview, requiredDependencyPhrases);
  assertIncludesAll(scopeReview, [
    "dependency-only",
    "future-only",
    "closure criteria do not mean closure",
    "separate tracked implementation evidence",
    "separate tracked test evidence",
    "human/professional review",
  ]);
});

test("scope review excludes raw/private/source, logs, provider, and implementation behavior", () => {
  assertIncludesAll(scopeReview, requiredNegativePhrases);
  assertIncludesAll(scopeReview, [
    "No raw/private/source material was inspected.",
    "No source package, PDF/image/screenshot/metadata, provider payload, URL, token, secret, local log, or CI log material is inspected or authorized",
    "This review does not inspect, route, transform, classify at runtime, quarantine, block, persist, emit, log, delete, purge, erase, encrypt, send, or deliver material.",
  ]);
});

test("tracked evidence paths are fixed and support the intended chain only", () => {
  assert.equal(Object.keys(trackedEvidence).length, trackedEvidencePaths.length);
  for (const [repoRelativePath, content] of Object.entries(trackedEvidence)) {
    assert.equal(path.isAbsolute(repoRelativePath), false, repoRelativePath);
    assert.equal(content.length > 0, true, repoRelativePath);
  }

  assert.match(
    trackedEvidence[
      "packages/governance/src/rbac-role-permission-admin-support-scope-review-registry.js"
    ],
    /RAW_MATERIAL_ROUTING_REVIEWER/,
  );
  assert.match(
    trackedEvidence[
      "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36_v1.md"
    ],
    /RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED/,
  );
  assert.match(
    trackedEvidence[
      "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37_v1.md"
    ],
    /raw-material routing implementation remains absent/,
  );
});

test("positive-overclaim guard remains non-authorizing", () => {
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
    ["provider routing ", "auth", "orized"],
    ["raw/private/source ", "inspe", "cted"],
    ["source package ", "inspe", "cted"],
    ["PDF ", "inspe", "cted"],
    ["image ", "inspe", "cted"],
    ["screenshot ", "inspe", "cted"],
    ["metadata ", "inspe", "cted"],
    ["runtime gate ", "cre", "ated"],
    ["RBAC ", "imple", "mented"],
    ["access-control ", "imple", "mented"],
    ["admin support access ", "auth", "orized"],
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

  for (const fragmentParts of forbiddenPositiveFragments) {
    const phrase = fragmentParts.join("");
    let index = scopeReview.indexOf(phrase);
    while (index !== -1) {
      const context = scopeReview
        .slice(Math.max(0, index - 320), index + phrase.length + 320)
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
