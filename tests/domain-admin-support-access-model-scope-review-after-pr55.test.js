"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

const paths = Object.freeze({
  review:
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55_v1.md",
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
  pr52Doc:
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_v1.md",
  pr52Test:
    "tests/domain-rbac-role-permission-model-scope-review-after-pr51.test.js",
  pr53Alignment:
    "tests/domain-rbac-role-permission-model-scope-review-after-pr51-alignment.test.js",
  pr54Registry:
    "packages/governance/src/rbac-role-permission-model-scope-review-registry.js",
  pr54RegistryTest:
    "tests/rbac-role-permission-model-scope-review-registry.test.js",
  pr55RegistryAlignment:
    "tests/rbac-role-permission-model-scope-review-registry-alignment.test.js",
});

const readFixed = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const evidence = Object.fromEntries(
  Object.entries(paths).map(([key, value]) => [key, readFixed(value)]),
);

const assertIncludesAll = (actual, expected) => {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
};

const parseJsonBlock = (markdown, blockName) => {
  const pattern = new RegExp(
    `\`${blockName}_JSON_BEGIN\`\\s*\`\`\`json\\s*([\\s\\S]*?)\\s*\`\`\`\\s*\`${blockName}_JSON_END\``,
  );
  const match = markdown.match(pattern);
  assert.ok(match, `${blockName} block exists`);
  return JSON.parse(match[1]);
};

const accessPaths = parseJsonBlock(
  evidence.review,
  "ADMIN_SUPPORT_ACCESS_PATH_SCOPE",
);
const bypassRisks = parseJsonBlock(
  evidence.review,
  "ADMIN_SUPPORT_BYPASS_RISK_REGISTER",
);

const identityMarkers = Object.freeze([
  "DOCS_ONLY",
  "PROVE_ONLY",
  "SCOPE_REVIEW_ONLY",
  "NOT_IMPLEMENTATION",
  "NOT_RUNTIME_ENFORCEMENT",
  "NOT_RBAC_IMPLEMENTATION",
  "NOT_ACCESS_CONTROL_IMPLEMENTATION",
  "NOT_ADMIN_SUPPORT_AUTHORIZATION",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "PRODUCT_CANDIDATE_NONE",
]);

const sourceEvidenceTerms = Object.freeze([
  paths.pr52Doc,
  paths.pr52Test,
  "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51",
  paths.pr53Alignment,
  "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
  paths.pr54Registry,
  paths.pr54RegistryTest,
  "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_SCAFFOLD_AFTER_PR53",
  paths.pr55RegistryAlignment,
  "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR54",
]);

const requiredAccessPathCategories = Object.freeze([
  "Sanitized/no-raw review-support access",
  "Redacted review-signal access",
  "No-raw metadata/manifest access",
  "Generated/export artifact access",
  "Local log or test-transcript summary access",
  "Raw/private/source material access",
  "Source-package access",
  "PDF/image/screenshot/metadata access",
  "Cross-tenant access",
  "Cross-case access",
  "Cross-object/function/property access",
  "Retention/deletion request access",
  "Retention/deletion execution access",
  "Retention/deletion verification access",
  "Audit/access-log viewing access",
  "Third-party/provider routing authorization",
  "Role or permission administration",
  "Impersonation or session-assumption access",
  "Break-glass or emergency access",
  "External-use/product/release approval",
]);

const allowedAccessPathPostures = Object.freeze([
  "narrow future review-support candidate",
  "separately gated future dependency",
  "deny-by-default",
  "not authorized",
  "unknown/not evidenced",
]);

const requiredBypassRisks = Object.freeze([
  "implicit superuser interpretation",
  "support-to-reviewer role confusion",
  "owner/maintainer privilege confusion",
  "self-granted permission",
  "self-approval",
  "workflow-agent approval",
  "system/service self-authorization",
  "tenant/case switching",
  "object/function/property scope bypass",
  "direct database/storage/object-store bypass",
  "export/download bypass",
  "audit-log access bypass",
  "deletion execution without independent verification",
  "provider-route approval through support privilege",
  "external-use approval through support privilege",
  "human-review bypass",
  "impersonation/session takeover",
  "emergency or break-glass misuse",
]);

const bypassFields = Object.freeze([
  "risk",
  "currentEvidenceLevel",
  "currentNonAuthorization",
  "dependency",
  "requiredFutureImplementationEvidence",
  "requiredFutureTestEvidence",
  "blockerStatus",
  "futureOnlyClosureCriterion",
]);

const safeEvidenceLabels = Object.freeze([
  "DOCS_ONLY",
  "TEST_ONLY",
  "PROVE_ONLY",
  "SCOPE_REVIEW_ONLY",
  "ALIGNMENT_PROOF_ONLY",
  "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
  "UNKNOWN_NOT_EVIDENCED",
  "NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
]);

const forbiddenPositiveLabels = Object.freeze([
  "RUNTIME_ENFORCED",
  "RBAC_ENFORCED",
  "ACCESS_CONTROL_ENFORCED",
  "ADMIN_SUPPORT_AUTHORIZED",
  "BREAK_GLASS_AUTHORIZED",
  "IMPERSONATION_AUTHORIZED",
  "ROLE_SCHEMA_CREATED",
  "PERMISSION_SCHEMA_CREATED",
  "TECHNICAL_SIGNED_OFF",
  "RELEASE_APPROVED",
  "EXTERNAL_USE_READY",
  "AI_ACT_COMPLIANT",
  "COURT_READY",
  "HIGH_RISK_APPROVED",
]);

const requiredDependencyTerms = Object.freeze([
  "RBAC role-permission taxonomy is a prerequisite",
  "admin/support remains separately gated from ordinary role categories",
  "audit/access-log events are required for future privileged actions",
  "audit/access-log implementation remains absent",
  "raw-material routing remains a prerequisite for material visibility",
  "raw/private/source remains deny-by-default",
  "retention/deletion requires request/execute/verify separation",
  "third-party/provider routing remains deny-by-default",
  "human/professional review cannot be replaced by admin/support",
  "global access-control threat modeling remains future work",
  "Runtime gates remain deferred",
  "Validator dispatch remains not created",
  "Executable/runtime registry lookup remains not created",
]);

const requiredNonAuthorizationTerms = Object.freeze([
  "implementation",
  "runtime/API/schema/package behavior",
  "executable registry lookup",
  "runtime registry lookup",
  "source/package edits",
  "package manifest/config edits",
  "docs/wiki edits",
  "role fields",
  "permission fields",
  "role schema",
  "permission schema",
  "RBAC implementation",
  "access-control implementation",
  "RBAC/access-control enforcement",
  "admin/support implementation",
  "admin/support access authorization",
  "implicit superuser authorization",
  "break-glass authorization",
  "impersonation authorization",
  "audit/access-log implementation",
  "retention/deletion/encryption implementation",
  "raw-material routing implementation",
  "third-party/provider routing authorization",
  "runtime gates",
  "validator dispatch",
  "model-facts approval",
  "governance proof creation",
  "security finding",
  "vulnerability finding",
  "severity",
  "remediation",
  "blocker closure",
  "release approval",
  "external-use",
  "product candidate",
  "technical sign-off",
  "runtime certification",
  "legal/clinical/evidentiary/case-truth conclusion",
  "court-ready claim",
  "AI Act compliance claim",
  "high-risk approval claim",
]);

test("admin/support scope review has exact identity and source anchor", () => {
  assert.match(
    evidence.review,
    /^# Admin\/Support Access Model Scope Review After PR55/m,
  );
  assertIncludesAll(evidence.review, [
    "Source anchor: `governance/main @ f8ccf0434659de424a3d460ed26998e0b3472484`",
    "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR54",
  ]);
  assertIncludesAll(evidence.review, identityMarkers);
});

test("wiki process anchors and PR52 through PR55 evidence references are fixed", () => {
  assertIncludesAll(evidence.wikiIndex, [
    "This wiki is a tracked repo orientation and coordination layer.",
    "Live git state, tracked",
    "non-repo files are advisory only.",
  ]);
  assertIncludesAll(evidence.wikiLog, [
    "Project Wiki Scaffold",
    "Project Wiki Scaffold Merged",
  ]);
  assertIncludesAll(evidence.review, sourceEvidenceTerms);

  assertIncludesAll(evidence.pr52Doc, [
    "admin/support access explicitly included",
    "Admin/support actor / blocked or separately gated access",
  ]);
  assertIncludesAll(evidence.pr52Test, ["requiredIdentityMarkers"]);
  assertIncludesAll(evidence.pr53Alignment, [
    "alignment conclusion remains prove-only and blocker-open",
  ]);
  assertIncludesAll(evidence.pr54Registry, [
    "RBAC-RPSR-003",
    "ADMIN_SUPPORT_ACCESS_MODEL_NOT_IMPLEMENTED",
  ]);
  assertIncludesAll(evidence.pr54RegistryTest, [
    "summary helper authorizes nothing",
  ]);
  assertIncludesAll(evidence.pr55RegistryAlignment, [
    "summary helper authorizes nothing and leaves blockers future-only",
  ]);
});

test("chat/private/advisory material is not source of truth and is not copied", () => {
  assertIncludesAll(evidence.review, [
    "Chat, pasted summaries, private notes",
    "advisory only",
    "are not copied here as repo truth",
  ]);

  const prohibitedCopiedMaterial = [
    ["named private", " recipient"].join(""),
    ["private recipient", " identity"].join(""),
  ];

  for (const item of prohibitedCopiedMaterial) {
    assert.equal(evidence.review.includes(item), false, item);
  }
});

test("actor separation and support non-superuser boundaries are explicit", () => {
  assertIncludesAll(evidence.review, [
    "admin/support is not an implicit superuser",
    "admin/support is not equivalent to owner/maintainer",
    "admin/support is not equivalent to professional reviewer",
    "support activity does not grant material access",
    "support identity does not grant route authorization",
    "support identity does not grant external-use authorization",
    "support identity does not grant product/release approval",
    "support identity does not permit self-approval",
    "support identity does not permit bypass of human/professional review",
  ]);
});

test("access-path categories are exact and do not create present authorization", () => {
  assert.deepEqual(
    accessPaths.map((entry) => entry.category),
    requiredAccessPathCategories,
  );

  for (const entry of accessPaths) {
    assert.equal(allowedAccessPathPostures.includes(entry.posture), true);
    assert.ok(
      ["NOT_AUTHORIZED", "UNKNOWN_NOT_EVIDENCED"].includes(
        entry.currentAuthorization,
      ),
      entry.category,
    );
  }
});

test("material-class denials and cross-boundary risks are represented", () => {
  assertIncludesAll(evidence.review, [
    "support access to raw/private/source material is not authorized",
    "support access to source packages is not authorized",
    "support access to PDF/image/screenshot/metadata material is not authorized",
    "support access across tenant/case/object/function/property boundaries is not authorized",
    "Cross-tenant access",
    "Cross-case access",
    "Cross-object/function/property access",
    "object-level BOLA/IDOR",
    "function-level authorization bypass",
    "property-level overexposure",
  ]);
});

test("bypass-risk register is exact and future-only", () => {
  assert.deepEqual(
    bypassRisks.map((entry) => entry.risk),
    requiredBypassRisks,
  );

  for (const entry of bypassRisks) {
    assert.deepEqual(Object.keys(entry), bypassFields);
    assert.equal(safeEvidenceLabels.includes(entry.currentEvidenceLevel), true);
    assert.equal(entry.blockerStatus, "NOT_AUTHORIZED");
    assert.match(entry.requiredFutureImplementationEvidence, /future/i);
    assert.match(entry.requiredFutureTestEvidence, /future/i);
    assert.match(entry.futureOnlyClosureCriterion, /future|cannot be closed/i);
  }
});

test("dependency posture remains explicit without implementation claims", () => {
  assertIncludesAll(evidence.review, requiredDependencyTerms);
  assertIncludesAll(evidence.review, [
    "This dependency is not audit/access-log implementation.",
    "This document creates no event emitter, log schema, log storage",
    "Raw-material routing remains a prerequisite for material visibility.",
    "Third-party/provider routing remains deny-by-default.",
  ]);
});

test("safe evidence labels are present and forbidden positive labels are guarded", () => {
  assertIncludesAll(evidence.review, safeEvidenceLabels);
  assertIncludesAll(evidence.review, [
    "Do not use as current positive evidence",
    "Future-Only Closure Criteria",
  ]);

  for (const label of forbiddenPositiveLabels) {
    assert.equal(evidence.review.includes(label), false, label);
  }
});

test("runtime gates, validator dispatch, and registry lookup remain absent", () => {
  assertIncludesAll(evidence.review, [
    "Runtime gates remain deferred",
    "Validator dispatch remains not created",
    "Executable/runtime registry lookup remains not created",
    "runtime gates",
    "validator dispatch",
    "executable registry lookup",
    "runtime registry lookup",
  ]);
});

test("closure criteria are future-only and no authorization or proof is created", () => {
  assertIncludesAll(evidence.review, [
    "Closure cannot be created by this document or its focused proof test.",
    "None of that evidence is created here.",
    "This document creates no:",
  ]);
  assertIncludesAll(evidence.review, requiredNonAuthorizationTerms);
});
