"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const registry =
  require("../packages/governance/src/rbac-role-permission-model-scope-review-registry.js");
const index = require("../packages/governance/src/index.js");

const repoRoot = path.resolve(__dirname, "..");
const readFixed = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const evidencePaths = Object.freeze({
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
  pr52Doc:
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_v1.md",
  pr52Test:
    "tests/domain-rbac-role-permission-model-scope-review-after-pr51.test.js",
  pr53Alignment:
    "tests/domain-rbac-role-permission-model-scope-review-after-pr51-alignment.test.js",
  pr54RegistryTest:
    "tests/rbac-role-permission-model-scope-review-registry.test.js",
});

const evidence = Object.fromEntries(
  Object.entries(evidencePaths).map(([key, value]) => [key, readFixed(value)]),
);

const rows =
  registry.listRbacRolePermissionModelScopeReviewRegistryRows();
const summary =
  registry.getRbacRolePermissionModelScopeReviewRegistrySummary();

const expectedIds = Object.freeze(
  Array.from({ length: 10 }, (_, index) =>
    `RBAC-RPSR-${String(index + 1).padStart(3, "0")}`,
  ),
);

const expectedFields = Object.freeze([
  "id",
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
  "remainsNonAuthorizedUntilClosure",
]);

const expectedRowGroups = Object.freeze([
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

const expectedActorTypes = Object.freeze([
  "human professional reviewer",
  "repo/operator maintainer",
  "support/admin actor",
  "workflow automation agent",
  "system/service actor",
  "external reviewer or auditor",
  "affected-person or subject-facing actor",
  "third-party/provider actor",
]);

const expectedRoleCategories = Object.freeze([
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

const expectedPermissionCategories = Object.freeze([
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

const postureMarkers = Object.freeze([
  "PROVE_ONLY",
  "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
  "NOT_IMPLEMENTATION",
  "NOT_RUNTIME_ENFORCEMENT",
  "NOT_RBAC_IMPLEMENTATION",
  "NOT_ACCESS_CONTROL_IMPLEMENTATION",
  "NOT_ADMIN_SUPPORT_AUTHORIZATION",
  "NOT_ROLE_SCHEMA",
  "NOT_PERMISSION_SCHEMA",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "PRODUCT_CANDIDATE_NONE",
]);

const safeEvidenceLabels = Object.freeze([
  "DOCS_ONLY",
  "TEST_ONLY",
  "PROVE_ONLY",
  "SCOPE_REVIEW_ONLY",
  "ALIGNMENT_PROOF_ONLY",
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

const falseClaimKeys = Object.freeze([
  "authorized",
  "access_granted",
  "rbac_implemented",
  "access_control_implemented",
  "access_control_enforced",
  "admin_support_implementation_created",
  "admin_support_access_authorized",
  "role_fields_created",
  "permission_fields_created",
  "role_schema_created",
  "permission_schema_created",
  "audit_access_log_implemented",
  "retention_deletion_encryption_implemented",
  "raw_material_routing_implemented",
  "third_party_provider_routing_authorized",
  "runtime_gate_created",
  "runtime_gate_implemented",
  "validator_dispatch_created",
  "executable_registry_lookup_created",
  "runtime_registry_lookup_created",
  "model_facts_approval_created",
  "governance_proof_created",
  "security_finding_created",
  "severity_assigned",
  "remediation_recommended",
  "blocker_closure_created",
  "release_approved",
  "external_use_authorized",
  "product_candidate_selected",
  "technical_signoff_created",
  "runtime_certification_created",
  "legal_clinical_evidentiary_case_truth_conclusion_created",
  "court_ready_created",
  "ai_act_compliance_created",
  "high_risk_approval_created",
  "runtime_api_schema_package_behavior_changed",
]);

const assertIncludesAll = (actual, expected) => {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
};

const flatten = (values) =>
  values.flatMap((value) => (Array.isArray(value) ? value : [value]));

test("wiki process anchors remain advisory and source-of-truth bounded", () => {
  assertIncludesAll(evidence.wikiIndex, [
    "This wiki is a tracked repo orientation and coordination layer.",
    "It is not the primary source of truth",
    "Live git state, tracked",
    "GitHub PR metadata, and verified CI metadata win over wiki text.",
    ["Chat, pasted summaries, private notes, uploaded ", "conversation material, and"].join(
      "",
    ),
    "non-repo files are advisory only.",
    "Future wiki updates must re-read both files before editing them.",
    "Missing or stale wiki content must not be treated as completion, approval, or",
    "blocker closure.",
  ]);

  assertIncludesAll(evidence.wikiLog, [
    "Project Wiki Scaffold",
    "Project Wiki Scaffold Merged",
    "Chat is advisory only and is not a source of truth.",
    "does not create governance proof, implementation, readiness, approval",
  ]);
});

test("exports registry surface through module and package index", () => {
  for (const exportName of [
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_ALLOWED_EVIDENCE_LEVELS",
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS",
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_POSTURE",
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ROWS",
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_ROW_GROUPS_BY_ID",
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_SOURCE_EVIDENCE",
    "getRbacRolePermissionModelScopeReviewRegistrySummary",
    "listRbacRolePermissionModelScopeReviewRegistryRows",
  ]) {
    assert.equal(Object.hasOwn(registry, exportName), true, exportName);
    assert.equal(Object.hasOwn(index, exportName), true, exportName);
  }

  for (const forbiddenSurface of [
    "lookup",
    "resolve",
    "dispatch",
    "enforce",
    "authorize",
    "route",
  ]) {
    assert.equal(
      Object.keys(registry).some((key) =>
        key.toLowerCase().includes(forbiddenSurface),
      ),
      false,
      forbiddenSurface,
    );
  }
});

test("represents PR52, PR53, and PR54 tracked evidence", () => {
  assertIncludesAll(evidence.pr52Doc, [
    "RBAC Role-Permission Model Scope Review After PR51",
    "DOCS_ONLY",
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
    "admin/support access explicitly included",
    "Closure cannot be created by this document or its focused proof test.",
  ]);
  assertIncludesAll(evidence.pr52Test, [
    evidencePaths.pr52Doc,
    "requiredIdentityMarkers",
    "forbiddenPositiveLabels",
  ]);
  assertIncludesAll(evidence.pr53Alignment, [
    evidencePaths.wikiIndex,
    evidencePaths.wikiLog,
    evidencePaths.pr52Doc,
    evidencePaths.pr52Test,
    "alignment conclusion remains prove-only and blocker-open",
  ]);
  assertIncludesAll(evidence.pr54RegistryTest, [
    "exports static registry surface through module and index",
    "contains exact IDs, row count, row groups, and 21-field structure",
    "summary helper authorizes nothing and creates no approval claims",
  ]);

  assert.deepEqual(summary.sourceEvidence, {
    pr52ScopeReviewDoc: evidencePaths.pr52Doc,
    pr52FocusedTest: evidencePaths.pr52Test,
    pr53AlignmentProof: evidencePaths.pr53Alignment,
    pr52MergeMarker:
      "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51",
    pr53MergeMarker:
      "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
  });
});

test("contains exact IDs, row count, row groups, and 21-field structure", () => {
  assert.deepEqual(
    rows.map((row) => row.id),
    expectedIds,
  );
  assert.equal(rows.length, 10);
  assert.deepEqual(Object.values(summary.rowGroupsById), expectedRowGroups);

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), expectedFields, row.id);
    assert.equal(row.blockerStatus, "NOT_AUTHORIZED", row.id);
    assert.match(row.closureCriteria, /future tracked/i, row.id);
    assert.match(row.closureCriteria, /cannot be satisfied/i, row.id);
  }
});

test("covers actor, role, and permission categories", () => {
  assertIncludesAll(
    [...new Set(rows.map((row) => row.actorType))],
    expectedActorTypes,
  );
  assertIncludesAll(
    [...new Set(rows.map((row) => row.roleCategory))],
    expectedRoleCategories,
  );
  assertIncludesAll(
    [...new Set(flatten(rows.map((row) => row.permissionCategory)))],
    expectedPermissionCategories,
  );
});

test("keeps posture markers and evidence labels safe", () => {
  assert.deepEqual(summary.posture, postureMarkers);
  assert.deepEqual(summary.allowedEvidenceLevels, safeEvidenceLabels);
  assert.deepEqual(summary.forbiddenPositiveLabels, forbiddenPositiveLabels);

  for (const row of rows) {
    assert.equal(
      safeEvidenceLabels.includes(row.currentEvidenceLevel),
      true,
      row.currentEvidenceLevel,
    );
    assert.equal(
      forbiddenPositiveLabels.includes(row.currentEvidenceLevel),
      false,
      row.currentEvidenceLevel,
    );
  }
});

test("preserves future-only dependency posture", () => {
  assertIncludesAll(Object.values(summary.dependencyPosture).join("\n"), [
    "raw-material routing depends on role/permission model before runtime enforcement",
    "audit/access-log depends on actor/permission taxonomy before runtime implementation",
    "retention/deletion depends on actor/permission taxonomy for request/execute/verify flows",
    "third-party/provider routing depends on explicit authorization and is deny-by-default",
    "global access-control threat model depends on preliminary RBAC/admin-support scope",
    "runtime gates remain deferred",
    "validator dispatch remains not created",
    "executable/runtime registry lookup remains not created",
  ]);

  assert.equal(summary.nonAuthorizationFlags.runtime_gate_created, false);
  assert.equal(summary.nonAuthorizationFlags.runtime_gate_implemented, false);
  assert.equal(summary.nonAuthorizationFlags.validator_dispatch_created, false);
  assert.equal(
    summary.nonAuthorizationFlags.executable_registry_lookup_created,
    false,
  );
  assert.equal(
    summary.nonAuthorizationFlags.runtime_registry_lookup_created,
    false,
  );
});

test("summary helper authorizes nothing and leaves blockers future-only", () => {
  for (const key of falseClaimKeys) {
    assert.equal(summary.nonAuthorizationFlags[key], false, key);
  }

  assert.equal(summary.closurePosture.includes("future-only"), true);
  assert.equal(summary.closurePosture.includes("cannot be satisfied"), true);
});

test("alignment proof copies no private material and creates no positive claims", () => {
  assert.equal(evidence.pr52Doc.includes("Chat, pasted summaries"), true);
  assert.equal(evidence.pr52Doc.includes("advisory only"), true);
  assert.equal(evidence.pr52Doc.includes("not copied here as repo"), true);

  const newFileText = readFixed(
    "tests/rbac-role-permission-model-scope-review-registry-alignment.test.js",
  );
  const privateMaterialPattern = new RegExp(
    [
      ["named private", " recipient"].join(""),
      ["private recipient", " identity"].join(""),
      ["confi", "dential"].join(""),
      ["private ", "prompt"].join(""),
      ["uploaded ", "conversation"].join(""),
    ].join("|"),
  );
  const chatTruthPattern = new RegExp(
    ["source of ", "truth from ", "chat"].join(""),
  );

  assert.equal(privateMaterialPattern.test(newFileText), false);
  assert.equal(chatTruthPattern.test(newFileText), false);
});
