"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

const docPath =
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_v1.md";
const wikiIndexPath = "docs/wiki/index.md";
const wikiLogPath = "docs/wiki/log.md";

const readFixed = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const doc = readFixed(docPath);
const wikiIndex = readFixed(wikiIndexPath);
const wikiLog = readFixed(wikiLogPath);

const requiredIdentityMarkers = Object.freeze([
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

const requiredActorTypes = Object.freeze([
  "human professional reviewer",
  "repo/operator maintainer",
  "support/admin actor",
  "workflow automation agent",
  "system/service actor",
  "external reviewer or auditor",
  "affected-person or subject-facing actor",
  "third-party/provider actor",
]);

const requiredRoleCategories = Object.freeze([
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

const requiredPermissionCategories = Object.freeze([
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

const requiredMatrixFields = Object.freeze([
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

const requiredRowGroups = Object.freeze([
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

const requiredDependencyStatements = Object.freeze([
  "Raw-material routing depends on a role/permission model before runtime enforcement.",
  "Audit/access-log work depends on an actor/permission taxonomy before runtime implementation.",
  "Retention/deletion work depends on an actor/permission taxonomy for request, execute, and verify flows.",
  "Third-party/provider routing depends on explicit authorization and is deny-by-default.",
  "Global access-control threat-model work depends on preliminary RBAC/admin-support scope.",
  "Runtime gates remain deferred.",
  "Validator dispatch remains not created.",
  "Registry lookup remains not created.",
]);

const requiredNonAuthorizations = Object.freeze([
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
  "event emitter",
  "log schema",
  "log storage",
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

const allowedEvidenceLevels = Object.freeze([
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

function assertIncludesAll(actual, expected) {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
}

function parseRows(markdown) {
  const match = markdown.match(
    /`RBAC_SCOPE_REVIEW_ROWS_JSON_BEGIN`\s*```json\s*([\s\S]*?)\s*```\s*`RBAC_SCOPE_REVIEW_ROWS_JSON_END`/,
  );
  assert.ok(match, "scope review row JSON block exists");
  return JSON.parse(match[1]);
}

const rows = parseRows(doc);

test("PR52 RBAC role-permission scope review has docs-only prove-only identity", () => {
  assert.match(doc, /^# RBAC Role-Permission Model Scope Review After PR51/m);
  assertIncludesAll(doc, requiredIdentityMarkers);
  assertIncludesAll(doc, [
    "This document defines scope for a future RBAC / role-permission model with",
    "admin/support access explicitly included.",
    "This is review-support and governance evidence only.",
    "implementation, runtime enforcement, RBAC enforcement, access-control",
  ]);
});

test("PR52 scope review covers required actors, roles, permissions, and row groups", () => {
  assertIncludesAll(doc, requiredActorTypes);
  assertIncludesAll(doc, requiredRoleCategories);
  assertIncludesAll(doc, requiredPermissionCategories);
  assert.deepEqual(
    rows.map((row) => row.rowGroup),
    requiredRowGroups,
  );

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), requiredMatrixFields);
    assert.ok(requiredActorTypes.includes(row.actorType), row.actorType);
    assert.ok(requiredRoleCategories.includes(row.roleCategory), row.roleCategory);
    assert.ok(
      requiredPermissionCategories.includes(row.permissionCategory),
      row.permissionCategory,
    );
  }
});

test("PR52 dependencies and closure criteria remain future-only", () => {
  assertIncludesAll(doc, requiredDependencyStatements);
  assertIncludesAll(doc, [
    "Closure requires future tracked implementation evidence",
    "future tracked test",
    "future review of admin/support bypass paths",
    "future audit/access-log",
    "future retention/deletion authorization flow",
    "future third-party routing authorization evidence",
    "Closure cannot be created by this document or its focused proof test.",
  ]);

  for (const row of rows) {
    assert.match(row.requiredImplementationEvidence, /future/i, row.rowGroup);
    assert.match(row.requiredTestEvidence, /future/i, row.rowGroup);
    assert.match(row.closureCriteria, /future|cannot be created/i, row.rowGroup);
  }
});

test("PR52 non-authorizations and safe evidence levels are explicit", () => {
  assertIncludesAll(doc, requiredNonAuthorizations);
  assertIncludesAll(doc, allowedEvidenceLevels);

  for (const row of rows) {
    assert.ok(
      allowedEvidenceLevels.includes(row.currentEvidenceLevel),
      row.currentEvidenceLevel,
    );
    assert.equal(row.blockerStatus, "NOT_AUTHORIZED", row.rowGroup);
  }

  for (const forbidden of forbiddenPositiveLabels) {
    assert.equal(doc.includes(forbidden), false, forbidden);
  }
});

test("PR52 wiki anchors are readable and advisory material is not copied as repo truth", () => {
  assert.match(wikiIndex, /This wiki is a tracked repo orientation/);
  assert.match(wikiIndex, /Chat, pasted summaries, private notes/);
  assert.match(wikiLog, /MERGED_AS_PROJECT_WIKI_LOG_AFTER_PR50|Project Wiki Scaffold/);

  assertIncludesAll(doc, [
    "Tracked repo files and live git/GitHub state are the evidence base",
    "Chat, pasted summaries, private notes, uploaded conversation",
    "advisory only",
    "not copied here as repo",
  ]);
});
