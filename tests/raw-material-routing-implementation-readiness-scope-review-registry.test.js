"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const registry =
  require("../packages/governance/src/raw-material-routing-implementation-readiness-scope-review-registry.js");
const index = require("../packages/governance/src/index.js");

const repoRoot = path.resolve(__dirname, "..");
const trackedEvidencePaths = Object.freeze([
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR42_v1.md",
  "tests/domain-raw-material-routing-implementation-readiness-scope-review-after-pr42.test.js",
  "tests/domain-raw-material-routing-implementation-readiness-scope-review-after-pr42-alignment.test.js",
  "packages/governance/src/rbac-role-permission-admin-support-scope-review-registry.js",
  "tests/rbac-role-permission-admin-support-scope-review-registry.test.js",
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

const readTracked = (evidencePath) =>
  fs.readFileSync(path.join(repoRoot, evidencePath), "utf8");

const evidenceCorpus = trackedEvidencePaths.map(readTracked).join("\n");
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

const expectedFields = Object.freeze([
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
  "statusLabels",
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
  "packages/governance/src/raw-material-routing-implementation-readiness-scope-review-registry.js",
  "packages/governance/src/index.js",
  "tests/raw-material-routing-implementation-readiness-scope-review-registry.test.js",
]);

const positiveOverclaimForbiddenFragments = Object.freeze([
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

test("exports static registry surface through module and index", () => {
  for (const exportName of [
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES",
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ROWS",
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS",
    "getRawMaterialRoutingImplementationReadinessScopeReviewRow",
    "listRawMaterialRoutingImplementationReadinessScopeReviewRows",
    "summarizeRawMaterialRoutingImplementationReadinessScopeReviewRegistry",
  ]) {
    assert.equal(Object.hasOwn(registry, exportName), true, exportName);
    assert.equal(Object.hasOwn(index, exportName), true, exportName);
  }

  assert.equal(
    Object.isFrozen(
      registry
        .RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ROWS,
    ),
    true,
  );
});

test("preserves PR43 and PR44 tracked evidence boundaries", () => {
  for (let pr = 29; pr <= 44; pr += 1) {
    assert.equal(summary.lineage.some((entry) => entry.includes(`PR_${pr}`)), true);
  }

  for (const token of [
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR42",
    "DOCS_ONLY",
    "PROVE_ONLY",
    "IMPLEMENTATION_READINESS_SCOPE_REVIEW_ONLY",
    "Raw-material routing remains not implemented.",
    "Route policy implementation remains not created.",
    "Route decision engine remains not created.",
    "Quarantine/block path remains not created.",
    "Validator dispatch remains not created.",
    "Registry lookup and runtime registry lookup remain not created.",
    "Runtime gates remain not created.",
    "Material-class registry implementation and scope model implementation remain not created.",
    "RBAC/access-control enforcement remains not created.",
    "Admin/support access authorization remains not created.",
    "Audit/access-log implementation remains not created.",
    "Third-party/provider routing remains not authorized.",
    "Retention/deletion/encryption implementation remains not created.",
    "Chain-of-custody remains not created.",
    "Closure criteria are future-only and do not close blockers.",
    "positive-overclaim guard remains non-authorizing",
  ]) {
    assert.equal(evidenceCorpus.includes(token), true, token);
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
});

test("contains exact rows, material classes, and required field structure", () => {
  assert.deepEqual(
    rows.map((row) => row.rowId),
    expectedRowIds,
  );
  assert.deepEqual(
    rows.map((row) => row.materialClass),
    expectedMaterialClasses,
  );
  assert.equal(summary.rowCount, 12);

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), expectedFields, row.rowId);
    assert.equal(row.remainsNonAuthorizedUntilClosure, true, row.rowId);
    assert.equal(
      row.statusLabels.includes("GOVERNANCE_REGISTRY_SCAFFOLD_ONLY"),
      true,
      row.rowId,
    );
    assert.equal(
      row.statusLabels.includes(
        "DOCS_ONLY_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ONLY",
      ),
      true,
      row.rowId,
    );
    assert.equal(
      row.statusLabels.includes("TEST_ONLY_ALIGNMENT_PROOF_ONLY"),
      true,
      row.rowId,
    );
  }
});

test("keeps dependency-only surfaces and unresolved routing posture", () => {
  const byId = new Map(rows.map((row) => [row.rowId, row]));

  assert.match(byId.get("RMR-IR-SR-001").implementationGap, /no route policy/);
  assert.match(
    byId.get("RMR-IR-SR-003").implementationGap,
    /no metadata acquisition/,
  );
  assert.match(
    byId.get("RMR-IR-SR-005").implementationGap,
    /no log classification path/,
  );
  assert.match(
    byId.get("RMR-IR-SR-006").implementationGap,
    /no deny\/quarantine runtime path/,
  );
  assert.match(
    byId.get("RMR-IR-SR-009").implementationGap,
    /no provider registry\/status/,
  );
  assert.match(
    byId.get("RMR-IR-SR-010").implementationGap,
    /no review workflow gate evidence/,
  );
  assert.match(
    byId.get("RMR-IR-SR-012").implementationGap,
    /no mixed-bundle route path/,
  );

  for (const row of rows) {
    assert.notEqual(row.retentionDeletionDependency, "", row.rowId);
    assert.notEqual(row.rbacAccessControlDependency, "", row.rowId);
    assert.notEqual(row.adminSupportDependency, "", row.rowId);
    assert.notEqual(row.thirdPartyModelApiConstraint, "", row.rowId);
  }
});

test("unknown row lookup fails closed", () => {
  const unknown =
    registry.getRawMaterialRoutingImplementationReadinessScopeReviewRow("NOPE");

  assert.equal(unknown.rowId, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.materialClass, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.implementationGap, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(
    unknown.statusLabels.includes("UNKNOWN_NOT_EVIDENCED"),
    true,
  );
  assert.equal(unknown.nonAuthorization.authorized, false);
  assert.equal(unknown.nonAuthorization.route_authorized, false);
});

test("recursive non-authorization flags remain false", () => {
  assert.equal(summary.localValidationIsCiEvidence, false);
  assert.equal(summary.ciEvidenceIsReleaseApproval, false);
  assert.equal(summary.ciEvidenceIsTechnicalSignoff, false);
  assert.equal(summary.ciEvidenceIsRuntimeCertification, false);
  assert.equal(summary.implementationCreated, false);
  assert.equal(summary.runtimeApiSchemaPackageBehaviorChanged, false);
  assert.equal(summary.humanProfessionalReviewRequired, true);

  assertFalseClaimsStayFalse([
    rows,
    summary,
    registry.getRawMaterialRoutingImplementationReadinessScopeReviewRow(
      "UNKNOWN",
    ),
  ]);
});

test("preserves explicit inspection exclusions and evidence boundaries", () => {
  for (const token of [
    "No raw/private/source material was inspected.",
    "No source package, PDF/image/screenshot/metadata, provider payload, URL, token, secret, local log, or CI log material is inspected or authorized by this review.",
    "This review does not inspect, route, transform, classify at runtime, quarantine, block, persist, emit, log, delete, purge, erase, encrypt, send, or deliver material.",
    "Local logs are not CI evidence.",
    "CI evidence is not release approval",
    "Human/professional review remains required.",
  ]) {
    assert.equal(evidenceCorpus.includes(token), true, token);
  }
});

test("preserves positive-overclaim guard for registry scaffold wording", () => {
  const scopedCorpus = positiveOverclaimGuardPaths
    .map((scopedPath) => fs.readFileSync(path.join(repoRoot, scopedPath), "utf8"))
    .join("\n")
    .toLowerCase();

  for (const fragments of positiveOverclaimForbiddenFragments) {
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
