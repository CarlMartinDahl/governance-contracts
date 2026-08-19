"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const registry =
  require("../packages/governance/src/raw-material-routing-implementation-readiness-scope-review-registry.js");
const indexExports = require("../packages/governance/src/index.js");
const rbacRegistry =
  require("../packages/governance/src/rbac-role-permission-admin-support-scope-review-registry.js");

const repoRoot = path.resolve(__dirname, "..");

const trackedEvidencePaths = Object.freeze({
  pr45Registry:
    "packages/governance/src/raw-material-routing-implementation-readiness-scope-review-registry.js",
  pr45RegistryProof:
    "tests/raw-material-routing-implementation-readiness-scope-review-registry.test.js",
  index: "packages/governance/src/index.js",
  pr43ScopeReview:
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR42_v1.md",
  pr43ScopeReviewProof:
    "tests/domain-raw-material-routing-implementation-readiness-scope-review-after-pr42.test.js",
  pr44AlignmentProof:
    "tests/domain-raw-material-routing-implementation-readiness-scope-review-after-pr42-alignment.test.js",
  rbacRegistry:
    "packages/governance/src/rbac-role-permission-admin-support-scope-review-registry.js",
  rbacRegistryProof:
    "tests/rbac-role-permission-admin-support-scope-review-registry.test.js",
  rbacRegistryAlignmentProof:
    "tests/rbac-role-permission-admin-support-scope-review-registry-alignment.test.js",
  rbacScopeReview:
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38_v1.md",
  rbacScopeReviewProof:
    "tests/domain-rbac-role-permission-admin-support-scope-review-after-pr38.test.js",
  rbacScopeReviewAlignmentProof:
    "tests/domain-rbac-role-permission-admin-support-scope-review-after-pr38-alignment.test.js",
  auditDependencyMap:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36_v1.md",
  auditGapInventory:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37_v1.md",
  auditDependencyMapProof:
    "tests/domain-audit-access-log-admin-support-dependency-mapping-after-pr36.test.js",
  auditGapInventoryProof:
    "tests/domain-audit-access-log-implementation-gap-inventory-after-pr37.test.js",
  courtRbacCrosswalk:
    "tests/court-adjacent-rbac-admin-support-dependency-crosswalk.test.js",
});

const trackedEvidence = Object.fromEntries(
  Object.entries(trackedEvidencePaths).map(([key, evidencePath]) => [
    key,
    fs.readFileSync(path.join(repoRoot, evidencePath), "utf8"),
  ]),
);

const rows =
  registry.listRawMaterialRoutingImplementationReadinessScopeReviewRows();
const summary =
  registry.summarizeRawMaterialRoutingImplementationReadinessScopeReviewRegistry();

const expectedRowIds = Object.freeze(
  Array.from({ length: 12 }, (_, index) =>
    `RMR-IR-SR-${String(index + 1).padStart(3, "0")}`,
  ),
);

const expectedMaterialClasses = Object.freeze([
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

const expectedRequiredFields = Object.freeze([
  "rowId",
  "materialClass",
  "allowedIngress",
  "prohibitedIngress",
  "allowedProcessingLayer",
  "prohibitedProcessingLayer",
  "allowedEgress",
  "prohibitedEgress",
  "requiredRedactionSanitizationPoint",
  "requiredAuditAccessLogEvent",
  "retentionDeletionDependency",
  "rbacAccessControlDependency",
  "adminSupportDependency",
  "thirdPartyModelApiConstraint",
  "currentEvidenceLevel",
  "intendedEnforcementLayer",
  "implementationGap",
  "requiredImplementationEvidence",
  "requiredTestEvidence",
  "blockerStatus",
  "closureCriteria",
  "remainsNonAuthorizedUntilClosure",
  "lineage",
  "nonAuthorization",
]);

const expectedLineage = Object.freeze(
  Array.from({ length: 16 }, (_, index) => `PR_${index + 29}`),
);

const requiredStatusLabels = Object.freeze([
  "GOVERNANCE_REGISTRY_SCAFFOLD_ONLY",
  "PROVE_ONLY",
  "DOCS_ONLY_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ONLY",
  "TEST_ONLY_ALIGNMENT_PROOF_ONLY",
  "REVIEW_SUPPORT_ONLY",
  "DEPENDENCY_ONLY",
  "FUTURE_ONLY_CLOSURE_CRITERIA",
  "RAW_MATERIAL_ROUTING_IMPLEMENTATION_NOT_CREATED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "ROUTE_POLICY_NOT_IMPLEMENTED",
  "ROUTE_DECISION_ENGINE_NOT_CREATED",
  "QUARANTINE_OR_BLOCK_PATH_REQUIRED",
  "RUNTIME_GATES_NOT_CREATED",
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
  "RUNTIME_REGISTRY_LOOKUP_NOT_CREATED",
  "MATERIAL_CLASS_REGISTRY_NOT_IMPLEMENTED",
  "SCOPE_MODEL_NOT_IMPLEMENTED",
  "RBAC_ACCESS_CONTROL_ENFORCEMENT_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "THIRD_PARTY_ROUTING_NOT_AUTHORIZED",
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
  "CHAIN_OF_CUSTODY_NOT_CREATED",
  "SECURITY_FINDING_NOT_CREATED",
  "SEVERITY_NOT_ASSIGNED",
  "REMEDIATION_NOT_RECOMMENDED",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "PRODUCT_CANDIDATE_NONE",
  "RUNTIME_CERTIFICATION_NOT_CREATED",
  "TECHNICAL_SIGN_OFF_NOT_CREATED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
]);

const falseClaimKeys = Object.freeze([
  "authorized",
  "route_authorized",
  "raw_material_routing_implemented",
  "route_policy_implemented",
  "route_decision_engine_created",
  "quarantine_implemented",
  "block_path_implemented",
  "runtime_gate_created",
  "runtime_gate_implemented",
  "validator_dispatch_created",
  "registry_lookup_created",
  "runtime_registry_lookup_created",
  "material_class_registry_implemented",
  "scope_model_implemented",
  "rbac_implemented",
  "access_control_implemented",
  "access_control_enforced",
  "admin_support_access_authorized",
  "audit_access_log_implemented",
  "audit_logging_implemented",
  "access_logging_implemented",
  "event_emitter_created",
  "log_schema_created",
  "log_storage_created",
  "log_viewer_created",
  "log_access_control_implemented",
  "third_party_routing_authorized",
  "provider_routing_authorized",
  "retention_deletion_encryption_implemented",
  "chain_of_custody_created",
  "blocker_closure_created",
  "security_finding_created",
  "vulnerability_finding_created",
  "severity_assigned",
  "remediation_recommended",
  "remediation_implemented",
  "release_approved",
  "external_use_authorized",
  "product_candidate_selected",
  "product_candidate_authorized",
  "technical_signoff_created",
  "runtime_certification_created",
  "court_ready_created",
  "ai_act_compliance_created",
  "high_risk_approval_created",
  "legal_clinical_evidentiary_case_truth_conclusion_created",
  "runtime_api_schema_package_behavior_changed",
]);

const positiveOverclaimGuardPaths = Object.freeze([
  "tests/raw-material-routing-implementation-readiness-scope-review-registry-alignment.test.js",
  "packages/governance/src/raw-material-routing-implementation-readiness-scope-review-registry.js",
  "packages/governance/src/index.js",
  "tests/raw-material-routing-implementation-readiness-scope-review-registry.test.js",
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

function collectObjects(value, collected = [], seen = new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return collected;
  }

  seen.add(value);
  collected.push(value);
  for (const nested of Object.values(value)) {
    collectObjects(nested, collected, seen);
  }

  return collected;
}

function assertFalseClaimsStayFalse(value) {
  for (const object of collectObjects(value)) {
    for (const key of falseClaimKeys) {
      if (Object.hasOwn(object, key)) {
        assert.equal(object[key], false, key);
      }
    }
  }
}

test("PR45 registry scaffold surface remains exported and frozen", () => {
  for (const exportName of [
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES",
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ROWS",
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS",
    "getRawMaterialRoutingImplementationReadinessScopeReviewRow",
    "listRawMaterialRoutingImplementationReadinessScopeReviewRows",
    "summarizeRawMaterialRoutingImplementationReadinessScopeReviewRegistry",
  ]) {
    assert.equal(Object.hasOwn(registry, exportName), true, exportName);
    assert.equal(Object.hasOwn(indexExports, exportName), true, exportName);
  }

  assert.equal(
    Object.isFrozen(
      registry
        .RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ROWS,
    ),
    true,
  );
  assert.match(
    trackedEvidence.index,
    /raw-material-routing-implementation-readiness-scope-review-registry\.js/,
  );
});

test("PR45 rows align with exact IDs, material classes, and field surface", () => {
  assert.deepEqual(
    rows.map((row) => row.rowId),
    expectedRowIds,
  );
  assert.deepEqual(
    rows.map((row) => row.materialClass),
    expectedMaterialClasses,
  );
  assert.equal(summary.rowCount, 12);
  assert.deepEqual(summary.materialClasses, expectedMaterialClasses);

  for (const row of rows) {
    assertIncludesAll(Object.keys(row), expectedRequiredFields);
    assert.equal(row.remainsNonAuthorizedUntilClosure, true, row.rowId);
    assertIncludesAll(row.statusLabels, requiredStatusLabels);
  }
});

test("PR45 preserves PR29 through PR44 lineage and PR43 PR44 posture", () => {
  for (const token of expectedLineage) {
    assert.equal(summary.lineage.some((entry) => entry.includes(token)), true);
  }

  assert.equal(
    summary.pr43ScopeReviewPosture,
    "DOCS_ONLY_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ONLY",
  );
  assert.equal(
    summary.pr44AlignmentProofPosture,
    "TEST_ONLY_ALIGNMENT_PROOF_ONLY",
  );
  assert.equal(summary.dependencyOnly, true);
  assert.equal(summary.futureOnlyClosureCriteria, true);

  assertIncludesAll(trackedEvidence.pr43ScopeReview, [
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR42",
    "DOCS_ONLY",
    "PROVE_ONLY",
    "IMPLEMENTATION_READINESS_SCOPE_REVIEW_ONLY",
    "PR_29_THROUGH_PR_42_LINEAGE_PRESERVED",
  ]);
  assertIncludesAll(trackedEvidence.pr44AlignmentProof, [
    "PR43 scope review keeps docs-only prove-only identity and full matrix coverage",
    "raw-material routing implementation remains absent",
    "Runtime gates, validator dispatch, registry lookup, runtime registry lookup, material-class registry implementation, and scope model implementation remain not created",
  ]);
  assertIncludesAll(trackedEvidence.pr45RegistryProof, [
    "preserves PR43 and PR44 tracked evidence boundaries",
    "contains exact rows, material classes, and required field structure",
    "keeps dependency-only surfaces and unresolved routing posture",
    "unknown row lookup fails closed",
    "recursive non-authorization flags remain false",
  ]);
});

test("PR45 aligns with RBAC admin-support audit and court dependency evidence", () => {
  const rbacSummary =
    rbacRegistry.getRbacRolePermissionAdminSupportScopeReviewRegistrySummary();

  assert.equal(rbacSummary.implementation_created, false);
  assert.equal(
    rbacSummary.runtime_api_schema_package_behavior_changed,
    false,
  );
  assertIncludesAll(rbacSummary.status_labels, [
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
  ]);

  assertIncludesAll(trackedEvidence.rbacRegistryAlignmentProof, [
    "contains exact actor scope rows and required field structure",
    "keeps dependency-only surfaces and admin/support unresolved",
    "unknown row lookup fails closed",
  ]);
  assertIncludesAll(trackedEvidence.rbacScopeReview, [
    "RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38",
    "Mode: `DOCS_ONLY`",
    "Posture: `PROVE_ONLY`",
    "Scope: `SCOPE_REVIEW_ONLY`",
  ]);
  assertIncludesAll(trackedEvidence.rbacScopeReviewAlignmentProof, [
    "admin/support boundary stays unresolved and non-bypassing",
    "audit/access-log dependency map and gap inventory remain dependency-only",
  ]);
  assertIncludesAll(trackedEvidence.auditDependencyMap, [
    "AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "LOCAL_LOGS_NOT_CI_EVIDENCE",
    "CI_EVIDENCE_NOT_RELEASE_APPROVAL",
  ]);
  assertIncludesAll(trackedEvidence.auditGapInventory, [
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37",
    "AAL-IGI-001",
    "AAL-IGI-019",
    "LOG_VIEWER_NOT_CREATED",
    "LOG_ACCESS_CONTROL_IMPLEMENTATION_NOT_CREATED",
    "CHAIN_OF_CUSTODY_NOT_CREATED",
  ]);
  assertIncludesAll(trackedEvidence.courtRbacCrosswalk, [
    "CAHR-AI-GAP-001_RBAC_ACCESS_CONTROL",
    "CAHR-AI-GAP-002_AUDIT_ACCESS_LOG",
    "CAHR-AI-GAP-010_HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW",
  ]);
});

test("PR45 dependency and unresolved route posture remain represented", () => {
  const byId = new Map(rows.map((row) => [row.rowId, row]));

  assert.match(byId.get("RMR-IR-SR-001").implementationGap, /no route policy/);
  assert.match(
    byId.get("RMR-IR-SR-006").implementationGap,
    /no deny\/quarantine runtime path/,
  );
  assert.match(
    byId.get("RMR-IR-SR-009").implementationGap,
    /no provider registry\/status/,
  );
  assert.match(
    byId.get("RMR-IR-SR-012").implementationGap,
    /no mixed-bundle route path/,
  );

  for (const row of rows) {
    assert.notEqual(row.requiredAuditAccessLogEvent, "", row.rowId);
    assert.notEqual(row.retentionDeletionDependency, "", row.rowId);
    assert.notEqual(row.rbacAccessControlDependency, "", row.rowId);
    assert.notEqual(row.adminSupportDependency, "", row.rowId);
    assert.notEqual(row.thirdPartyModelApiConstraint, "", row.rowId);
    assertIncludesAll(row.lineage, summary.lineage);
  }
});

test("PR45 unknown lookup and recursive non-authorization stay fail-closed", () => {
  const unknown =
    registry.getRawMaterialRoutingImplementationReadinessScopeReviewRow(
      "UNKNOWN",
    );

  assert.equal(unknown.rowId, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.materialClass, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.implementationGap, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.nonAuthorization.authorized, false);
  assert.equal(unknown.nonAuthorization.route_authorized, false);
  assertIncludesAll(unknown.statusLabels, ["UNKNOWN_NOT_EVIDENCED"]);

  assert.equal(summary.localValidationIsCiEvidence, false);
  assert.equal(summary.ciEvidenceIsReleaseApproval, false);
  assert.equal(summary.ciEvidenceIsTechnicalSignoff, false);
  assert.equal(summary.ciEvidenceIsRuntimeCertification, false);
  assert.equal(summary.implementationCreated, false);
  assert.equal(summary.runtimeApiSchemaPackageBehaviorChanged, false);
  assert.equal(summary.humanProfessionalReviewRequired, true);

  assertFalseClaimsStayFalse([rows, summary, unknown, rbacSummaryFixture()]);
});

test("PR45 inspection exclusions and evidence boundaries stay explicit", () => {
  assertIncludesAll(trackedEvidence.pr43ScopeReview, [
    "No raw/private/source material was inspected.",
    "No source package, PDF/image/screenshot/metadata, provider payload, URL, token, secret, local log, or CI log material is inspected or authorized by this review.",
    "This review does not inspect, route, transform, classify at runtime, quarantine, block, persist, emit, log, delete, purge, erase, encrypt, send, or deliver material.",
  ]);
  assertIncludesAll(trackedEvidence.pr45RegistryProof, [
    "Local logs are not CI evidence.",
    "CI evidence is not release approval",
    "Human/professional review remains required.",
  ]);
});

test("PR46 scoped files do not contain positive overclaim fragments", () => {
  const scopedCorpus = positiveOverclaimGuardPaths
    .map((scopedPath) => fs.readFileSync(path.join(repoRoot, scopedPath), "utf8"))
    .join("\n")
    .toLowerCase();

  for (const fragments of forbiddenPositiveFragments) {
    const positiveClaim = fragments.join("").toLowerCase();
    let index = scopedCorpus.indexOf(positiveClaim);
    while (index !== -1) {
      const context = scopedCorpus.slice(
        Math.max(0, index - 96),
        index + positiveClaim.length + 96,
      );
      assert.match(
        context,
        /\b(no|not|does not|without|forbidden|future|future-only|non-authorization|excluded|remain|remains|false)\b|_not_|not_|_created|_assigned|_recommended|_implemented/,
        positiveClaim,
      );
      index = scopedCorpus.indexOf(positiveClaim, index + positiveClaim.length);
    }
  }
});

function rbacSummaryFixture() {
  return rbacRegistry.getRbacRolePermissionAdminSupportScopeReviewRegistrySummary();
}
