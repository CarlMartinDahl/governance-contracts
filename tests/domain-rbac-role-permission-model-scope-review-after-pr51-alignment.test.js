"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

const paths = Object.freeze({
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
  review:
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_v1.md",
  focusedTest:
    "tests/domain-rbac-role-permission-model-scope-review-after-pr51.test.js",
});

const readFixed = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const wikiIndex = readFixed(paths.wikiIndex);
const wikiLog = readFixed(paths.wikiLog);
const review = readFixed(paths.review);
const focusedTest = readFixed(paths.focusedTest);

const assertIncludesAll = (actual, expected) => {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
};

const assertEachTextIncludesAll = (texts, expected) => {
  for (const text of texts) {
    assertIncludesAll(text, expected);
  }
};

const parseRows = (markdown) => {
  const match = markdown.match(
    /`RBAC_SCOPE_REVIEW_ROWS_JSON_BEGIN`\s*```json\s*([\s\S]*?)\s*```\s*`RBAC_SCOPE_REVIEW_ROWS_JSON_END`/,
  );
  assert.ok(match, "scope review row JSON block exists");
  return JSON.parse(match[1]);
};

const rows = parseRows(review);

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

const actorTypes = Object.freeze([
  "human professional reviewer",
  "repo/operator maintainer",
  "support/admin actor",
  "workflow automation agent",
  "system/service actor",
  "external reviewer or auditor",
  "affected-person or subject-facing actor",
  "third-party/provider actor",
]);

const roleCategories = Object.freeze([
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

const permissionCategories = Object.freeze([
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

const matrixFields = Object.freeze([
  "rowGroup",
  "actorType",
  "roleCategory",
  "permissionCategory",
  "allowedMaterialClasses",
  "prohibitedMaterialClasses",
  "allowedActions",
  "prohibitedActions",
  "adminSupportAccessRule",
  "humanProfessionalReviewDependency",
  "auditLogDependency",
  "retentionDeletionDependency",
  "rawMaterialRoutingDependency",
  "thirdPartyRoutingConstraint",
  "currentEvidenceLevel",
  "implementationGap",
  "requiredImplementationEvidence",
  "requiredTestEvidence",
  "blockerStatus",
  "closureCriteria",
  "whatRemainsNonAuthorizedUntilClosure",
]);

const rowGroups = Object.freeze([
  "Human professional reviewer / review-support only",
  "Repo/operator maintainer / governance maintenance only",
  "Admin/support actor / blocked or separately gated access",
  "Workflow automation agent / no self-approval",
  "System/service actor / no self-authorization",
  "External reviewer/auditor / no raw/private/source by default",
  "Affected-person or subject-facing actor / explanation/contestability not implemented",
  "Third-party/provider actor / routing deny-by-default",
  "Raw/private/source material access / not authorized",
  "External-use/product/release actions / not authorized",
]);

const dependencyStatements = Object.freeze([
  "Raw-material routing depends on a role/permission model before runtime enforcement.",
  "Audit/access-log work depends on an actor/permission taxonomy before runtime implementation.",
  "Retention/deletion work depends on an actor/permission taxonomy for request, execute, and verify flows.",
  "Third-party/provider routing depends on explicit authorization and is deny-by-default.",
  "Global access-control threat-model work depends on preliminary RBAC/admin-support scope.",
  "Runtime gates remain deferred.",
  "Validator dispatch remains not created.",
  "Registry lookup remains not created.",
]);

const evidenceLabels = Object.freeze([
  "DOCS_ONLY",
  "PROVE_ONLY",
  "UNKNOWN_NOT_EVIDENCED",
  "NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
]);

const forbiddenPositiveLabels = Object.freeze([
  "RUNTIME_ENFORCED",
  "TECHNICAL_SIGNED_OFF",
  "RELEASE_APPROVED",
  "EXTERNAL_USE_READY",
  "AI_ACT_COMPLIANT",
  "COURT_READY",
  "HIGH_RISK_APPROVED",
]);

const nonAuthorizationTerms = Object.freeze([
  "implementation",
  "runtime/API/schema/package behavior",
  "source/package edits",
  "role fields",
  "permission fields",
  "role schema",
  "permission schema",
  "RBAC enforcement",
  "access-control enforcement",
  "admin/support implementation",
  "admin/support access authorization",
  "audit/access-log implementation",
  "retention/deletion/encryption implementation",
  "raw-material routing implementation",
  "third-party/provider routing authorization",
  "runtime gates",
  "validator dispatch",
  "registry lookup",
  "security finding",
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

test("wiki process anchors remain advisory and source-of-truth bounded", () => {
  assertIncludesAll(wikiIndex, [
    "This wiki is a tracked repo orientation and coordination layer.",
    "It is not the primary source of truth",
    "Live git state, tracked",
    "GitHub PR metadata, and verified CI metadata win over wiki text.",
    "Chat, pasted summaries, private notes, uploaded conversation material, and",
    "non-repo files are advisory only.",
    "Future wiki updates must re-read both files before editing them.",
    "Missing or stale wiki content must not be treated as completion, approval, or",
    "blocker closure.",
  ]);

  assertIncludesAll(wikiLog, [
    "Project Wiki Scaffold",
    "Project Wiki Scaffold Merged",
    "Chat is advisory only and is not a source of truth.",
    "does not create governance proof, implementation, readiness, approval",
  ]);
});

test("PR52 document identity aligns with the focused test identity", () => {
  assert.match(
    review,
    /^# RBAC Role-Permission Model Scope Review After PR51/m,
  );
  assertIncludesAll(review, identityMarkers);
  assertIncludesAll(focusedTest, identityMarkers);

  assertIncludesAll(focusedTest, [
    `const docPath =\n  "${paths.review}"`,
    `const wikiIndexPath = "${paths.wikiIndex}"`,
    `const wikiLogPath = "${paths.wikiLog}"`,
    "fs.readFileSync(path.join(repoRoot, repoRelativePath), \"utf8\")",
    "requiredIdentityMarkers",
    "forbiddenPositiveLabels",
  ]);

  assert.equal(/\breaddir\b|\bglob\b|opendir|withFileTypes/.test(focusedTest), false);
});

test("actor, role, and permission surfaces are represented in doc and proof test", () => {
  assertEachTextIncludesAll([review, focusedTest], actorTypes);
  assertEachTextIncludesAll([review, focusedTest], roleCategories);
  assertEachTextIncludesAll([review, focusedTest], permissionCategories);

  assert.equal(rows.length, rowGroups.length);
  assert.deepEqual(
    rows.map((row) => row.rowGroup),
    rowGroups,
  );
});

test("matrix fields and row groups align between the scope document and proof test", () => {
  assertEachTextIncludesAll([focusedTest], matrixFields);
  assertEachTextIncludesAll([review, focusedTest], rowGroups);

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), matrixFields);
    assert.ok(actorTypes.includes(row.actorType), row.actorType);
    assert.ok(roleCategories.includes(row.roleCategory), row.roleCategory);
    assert.ok(
      permissionCategories.includes(row.permissionCategory),
      row.permissionCategory,
    );
  }
});

test("dependency posture and evidence labels remain safe and future-only", () => {
  assertEachTextIncludesAll([review, focusedTest], dependencyStatements);
  assertEachTextIncludesAll([review, focusedTest], evidenceLabels);

  assertIncludesAll(review, [
    "Closure requires future tracked implementation evidence",
    "Closure cannot be created by this document or its focused proof test.",
  ]);
  assertIncludesAll(focusedTest, [
    "Closure requires future tracked implementation evidence",
    "future tracked test",
    "Closure cannot be created by this document or its focused proof test.",
  ]);

  for (const row of rows) {
    assert.match(row.requiredImplementationEvidence, /future/i, row.rowGroup);
    assert.match(row.requiredTestEvidence, /future/i, row.rowGroup);
    assert.match(row.closureCriteria, /future|cannot be created/i, row.rowGroup);
    assert.equal(row.blockerStatus, "NOT_AUTHORIZED", row.rowGroup);
  }

  for (const label of forbiddenPositiveLabels) {
    assert.equal(review.includes(label), false, label);
  }
  assertIncludesAll(focusedTest, forbiddenPositiveLabels);
});

test("non-authorizations align and do not create implementation evidence", () => {
  assertIncludesAll(review, nonAuthorizationTerms);
  assertIncludesAll(focusedTest, nonAuthorizationTerms);
  assertIncludesAll(review, [
    "NOT_RBAC_IMPLEMENTATION",
    "NOT_ACCESS_CONTROL_IMPLEMENTATION",
    "NOT_ADMIN_SUPPORT_AUTHORIZATION",
    "This is review-support and governance evidence only.",
    "no\nimplementation, runtime enforcement, RBAC enforcement, access-control",
    "admin/support authorization, runtime gate, validator dispatch, or",
    "registry lookup is created.",
  ]);
  assertIncludesAll(focusedTest, [
    "requiredNonAuthorizations",
    "assertIncludesAll(doc, requiredNonAuthorizations)",
    "allowedEvidenceLevels.includes(row.currentEvidenceLevel)",
    "assert.equal(row.blockerStatus, \"NOT_AUTHORIZED\", row.rowGroup)",
  ]);
});

test("private/advisory boundary is preserved without copying private material", () => {
  assertIncludesAll(review, [
    "Chat, pasted summaries, private notes, uploaded conversation",
    "advisory only",
    "not copied here as repo",
    "raw/private/source material",
    "source packages",
    "provider payload material",
  ]);
  assertIncludesAll(focusedTest, [
    "Chat, pasted summaries, private notes",
    "advisory only",
    "not copied here as repo",
  ]);

  assert.equal(/confidential|private prompt/.test(review), false);
  assert.equal(/confidential|private prompt/.test(focusedTest), false);
});

test("alignment conclusion remains prove-only and blocker-open", () => {
  assertIncludesAll(review, [
    "DOCS_ONLY",
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
    "admin/support access explicitly included",
    "future review of admin/support bypass paths",
    "future third-party routing authorization evidence",
    "Closure cannot be created by this document or its focused proof test.",
  ]);
  assertIncludesAll(focusedTest, [
    "PR52 RBAC role-permission scope review has docs-only prove-only identity",
    "PR52 scope review covers required actors, roles, permissions, and row groups",
    "PR52 dependencies and closure criteria remain future-only",
    "PR52 non-authorizations and safe evidence levels are explicit",
    "PR52 wiki anchors are readable and advisory material is not copied as repo truth",
  ]);
});
