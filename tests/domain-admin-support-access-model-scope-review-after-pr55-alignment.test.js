"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

const paths = Object.freeze({
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
  pr56Review:
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55_v1.md",
  pr56FocusedTest:
    "tests/domain-admin-support-access-model-scope-review-after-pr55.test.js",
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
  evidence.pr56Review,
  "ADMIN_SUPPORT_ACCESS_PATH_SCOPE",
);
const bypassRisks = parseJsonBlock(
  evidence.pr56Review,
  "ADMIN_SUPPORT_BYPASS_RISK_REGISTER",
);

const testIdentity = Object.freeze([
  "TEST_ONLY",
  "PROVE_ONLY",
  "ALIGNMENT_PROOF_ONLY",
]);

const acceptedProvenance = Object.freeze({
  pr53Alignment: Object.freeze({
    mergeCommit: "03516fa6deeea91a7dccbcb35c17907e3e113da8",
    mergeMarker:
      "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
  }),
  pr56Review: Object.freeze({
    mergeCommit: "7c6917c8f43b0cf1febc5fc95c682203e18d01d3",
    mergeMarker: "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55",
  }),
});

const pr56Identity = Object.freeze([
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

const pr52ActorTypes = Object.freeze([
  "human professional reviewer",
  "repo/operator maintainer",
  "support/admin actor",
  "workflow automation agent",
  "system/service actor",
  "external reviewer or auditor",
  "affected-person or subject-facing actor",
  "third-party/provider actor",
]);

const pr52RoleCategories = Object.freeze([
  "owner/maintainer",
  "reviewer",
  "professional reviewer",
  "admin/support",
  "automation/service",
  "external auditor",
  "read-only observer",
  "affected-person/subject-facing",
  "third-party/provider",
]);

const pr52PermissionCategories = Object.freeze([
  "view sanitized/no-raw material",
  "view redacted review signals",
  "view metadata/manifest material",
  "view generated/export artifacts",
  "view local logs/test transcript summaries",
  "request human/professional review",
  "approve/reject review-support output",
  "request retention/deletion action",
  "verify retention/deletion action",
  "authorize third-party/provider routing",
  "access raw/private/source material",
  "access source packages",
  "access PDF/image/screenshot/metadata material",
  "access admin/support path",
  "create runtime gate",
  "create validator dispatch",
  "perform registry lookup",
  "approve external-use",
  "select product candidate",
]);

const expectedAccessPathCategories = Object.freeze([
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

const safeAccessPathPostures = Object.freeze([
  "narrow future review-support candidate",
  "separately gated future dependency",
  "deny-by-default",
  "not authorized",
  "unknown/not evidenced",
]);

const expectedBypassRisks = Object.freeze([
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
  "IMPLICIT_SUPERUSER_AUTHORIZED",
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

const dependencyTerms = Object.freeze([
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

const nonAuthorizationTerms = Object.freeze([
  "implementation",
  "runtime/API/schema/package behavior",
  "executable registry lookup",
  "runtime registry lookup",
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

test("alignment proof is test-only and wiki process remains source-of-truth bounded", () => {
  assertIncludesAll(testIdentity.join("\n"), [
    "TEST_ONLY",
    "PROVE_ONLY",
    "ALIGNMENT_PROOF_ONLY",
  ]);
  assertIncludesAll(evidence.wikiIndex, [
    "This wiki is a tracked repo orientation and coordination layer.",
    "Live git state, tracked",
    "GitHub PR metadata, and verified CI metadata win over wiki text.",
    "Chat, pasted summaries, private notes, uploaded conversation material, and",
    "non-repo files are advisory only.",
    "Future wiki updates must re-read both files before editing them.",
  ]);
  assertIncludesAll(evidence.wikiLog, [
    "Project Wiki Scaffold",
    "Chat is advisory only and is not a source of truth.",
    "does not create governance proof, implementation, readiness, approval",
  ]);
});

test("PR52 actor, role, permission, and dependency surfaces remain aligned", () => {
  assertIncludesAll(evidence.pr52Doc, pr52ActorTypes);
  assertIncludesAll(evidence.pr52Doc, pr52RoleCategories);
  assertIncludesAll(evidence.pr52Doc, pr52PermissionCategories);
  assertIncludesAll(evidence.pr52Doc, [
    "admin/support access explicitly included",
    "Admin/support actor / blocked or separately gated access",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "raw/private/source material",
    "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "Runtime gates remain deferred.",
  ]);
  assertIncludesAll(evidence.pr52Test, [
    "PR52 RBAC role-permission scope review has docs-only prove-only identity",
    "PR52 scope review covers required actors, roles, permissions, and row groups",
    "PR52 dependencies and closure criteria remain future-only",
  ]);
});

test("PR53, PR54, and PR55 remain prove-only alignment or static registry evidence", () => {
  assertIncludesAll(evidence.pr53Alignment, [
    "alignment conclusion remains prove-only and blocker-open",
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
    "Closure cannot be created by this document or its focused proof test.",
    "does not create governance proof, implementation, readiness, approval",
    "RBAC enforcement",
    "access-control enforcement",
  ]);
  assert.equal(
    evidence.pr53Alignment.includes("TEST_ONLY"),
    false,
    "PR53 source does not establish TEST_ONLY",
  );
  assert.equal(
    evidence.pr53Alignment.includes("ALIGNMENT_PROOF_ONLY"),
    false,
    "PR53 source does not establish ALIGNMENT_PROOF_ONLY",
  );
  assert.equal(
    acceptedProvenance.pr53Alignment.mergeMarker,
    "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
    "PR53 accepted merge provenance marker",
  );
  assert.equal(
    acceptedProvenance.pr53Alignment.mergeCommit,
    "03516fa6deeea91a7dccbcb35c17907e3e113da8",
    "PR53 accepted merge provenance commit",
  );
  assertIncludesAll(evidence.pr54Registry, [
    "RBAC-RPSR-003",
    "ADMIN_SUPPORT_ACCESS_MODEL_NOT_IMPLEMENTED",
    "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
    "NOT_ADMIN_SUPPORT_AUTHORIZATION",
    "executable/runtime registry lookup remains not created",
  ]);
  assertIncludesAll(evidence.pr54RegistryTest, [
    "exports static registry surface through module and index",
    "summary helper authorizes nothing and creates no approval claims",
  ]);
  assertIncludesAll(evidence.pr55RegistryAlignment, [
    "exports registry surface through module and package index",
    "summary helper authorizes nothing and leaves blockers future-only",
    "alignment proof copies no private material and creates no positive claims",
  ]);
  for (const marker of ["TEST_ONLY", "PROVE_ONLY", "ALIGNMENT_PROOF_ONLY"]) {
    assert.equal(
      evidence.pr55RegistryAlignment.includes(marker),
      true,
      `PR55 source missing ${marker}`,
    );
  }
});

test("PR56 identity, source anchor, and merged provenance are exact", () => {
  assert.match(
    evidence.pr56Review,
    /^# Admin\/Support Access Model Scope Review After PR55/m,
  );
  assertIncludesAll(evidence.pr56Review, [
    "Source anchor: `governance/main @ f8ccf0434659de424a3d460ed26998e0b3472484`",
    "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR54",
  ]);
  assertIncludesAll(evidence.pr56Review, pr56Identity);
  assertIncludesAll(evidence.pr56FocusedTest, [
    "admin/support scope review has exact identity and source anchor",
    "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR54",
  ]);
  assert.equal(
    acceptedProvenance.pr56Review.mergeMarker,
    "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55",
    "PR56 accepted post-merge provenance marker",
  );
  assert.equal(
    acceptedProvenance.pr56Review.mergeCommit,
    "7c6917c8f43b0cf1febc5fc95c682203e18d01d3",
    "PR56 accepted post-merge provenance commit",
  );
  assert.equal(
    evidence.pr56Review.includes(acceptedProvenance.pr56Review.mergeMarker),
    false,
    "PR56 post-merge marker is not pre-merge document source text",
  );
  assert.equal(
    evidence.pr56FocusedTest.includes(acceptedProvenance.pr56Review.mergeMarker),
    false,
    "PR56 post-merge marker is not pre-merge focused-test source text",
  );
});

test("admin/support actor separation is explicit and not present authorization", () => {
  assertIncludesAll(evidence.pr56Review, [
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

test("all PR56 access-path categories remain safe scope labels only", () => {
  assert.deepEqual(
    accessPaths.map((entry) => entry.category),
    expectedAccessPathCategories,
  );
  assert.equal(accessPaths.length, 20);

  for (const entry of accessPaths) {
    assert.equal(safeAccessPathPostures.includes(entry.posture), true);
    assert.ok(
      ["NOT_AUTHORIZED", "UNKNOWN_NOT_EVIDENCED"].includes(
        entry.currentAuthorization,
      ),
      entry.category,
    );
  }
});

test("all PR56 bypass risks and required future-only fields remain aligned", () => {
  assert.deepEqual(
    bypassRisks.map((entry) => entry.risk),
    expectedBypassRisks,
  );
  assert.equal(bypassRisks.length, 18);

  for (const entry of bypassRisks) {
    assert.deepEqual(Object.keys(entry), bypassFields);
    assert.equal(safeEvidenceLabels.includes(entry.currentEvidenceLevel), true);
    assert.match(entry.currentNonAuthorization, /not|cannot|absent/i);
    assert.match(entry.requiredFutureImplementationEvidence, /future/i);
    assert.match(entry.requiredFutureTestEvidence, /future/i);
    assert.equal(entry.blockerStatus, "NOT_AUTHORIZED");
    assert.match(entry.futureOnlyClosureCriterion, /future|cannot be closed/i);
  }
});

test("material, boundary, privilege, and emergency paths remain denied or absent", () => {
  assertIncludesAll(evidence.pr56Review, [
    "support access to raw/private/source material is not authorized",
    "support access to source packages is not authorized",
    "support access to PDF/image/screenshot/metadata material is not authorized",
    "support access across tenant/case/object/function/property boundaries is not authorized",
    "direct storage/database/object-store bypass is not authorized or implemented",
    "role escalation and self-grant are not authorized or implemented",
    "break-glass access is not authorized or implemented",
    "impersonation is not authorized or implemented",
    "workflow automation cannot approve support access",
    "system/service actor self-authorization is not created",
    "support identity does not grant route authorization",
    "support identity does not grant external-use authorization",
    "human/professional review cannot be replaced by admin/support",
  ]);
});

test("dependency posture remains future-only and creates no runtime surfaces", () => {
  assertIncludesAll(evidence.pr56Review, dependencyTerms);
  assertIncludesAll(evidence.pr56Review, [
    "This dependency is not audit/access-log implementation.",
    "This document creates no event emitter, log schema, log storage",
    "This document creates no retention, deletion, purge, erasure,",
    "Raw-material routing remains a prerequisite for material visibility.",
    "Third-party/provider routing remains deny-by-default.",
    "All closure criteria remain future-only.",
  ]);
});

test("safe evidence labels and forbidden positive labels remain guarded", () => {
  assertIncludesAll(evidence.pr56Review, safeEvidenceLabels);
  assertIncludesAll(evidence.pr56Review, [
    "Do not use as current positive evidence",
    "Future-Only Closure Criteria",
  ]);

  for (const label of forbiddenPositiveLabels) {
    assert.equal(evidence.pr56Review.includes(label), false, label);
  }
});

test("future-only closure and non-authorizations are preserved", () => {
  assertIncludesAll(evidence.pr56Review, [
    "Closure cannot be created by this document or its focused proof test.",
    "None of that evidence is created here.",
    "This document creates no:",
  ]);
  assertIncludesAll(evidence.pr56Review, nonAuthorizationTerms);

  assertIncludesAll(evidence.pr56FocusedTest, [
    "closure criteria are future-only and no authorization or proof is created",
    "assertIncludesAll(evidence.review, requiredNonAuthorizationTerms)",
  ]);
});

test("private and advisory material remains outside repo truth and copied content", () => {
  assertIncludesAll(evidence.pr56Review, [
    "Chat, pasted summaries, private notes",
    "advisory only",
    "are not copied here as repo truth",
  ]);
  assert.equal(
    evidence.pr56Review.includes(["named private", " recipient"].join("")),
    false,
  );
  assert.equal(
    evidence.pr56FocusedTest.includes(["private recipient", " identity"].join("")),
    false,
  );
  assert.equal(
    /source locator|raw source|private material copied/.test(
      evidence.pr56Review,
    ),
    false,
  );
});
