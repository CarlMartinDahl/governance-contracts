"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const registry =
  require("../packages/governance/src/rbac-role-permission-admin-support-scope-review-registry.js");
const index = require("../packages/governance/src/index.js");

const repoRoot = path.resolve(__dirname, "..");
const trackedEvidencePaths = Object.freeze([
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38_v1.md",
  "tests/domain-rbac-role-permission-admin-support-scope-review-after-pr38.test.js",
  "tests/domain-rbac-role-permission-admin-support-scope-review-after-pr38-alignment.test.js",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING_AFTER_PR36_v1.md",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37_v1.md",
  "tests/domain-audit-access-log-admin-support-dependency-mapping-after-pr36.test.js",
  "tests/domain-audit-access-log-implementation-gap-inventory-after-pr37.test.js",
  "tests/court-adjacent-rbac-admin-support-dependency-crosswalk.test.js",
]);

const evidenceCorpus = trackedEvidencePaths
  .map((evidencePath) =>
    fs.readFileSync(path.join(repoRoot, evidencePath), "utf8"),
  )
  .join("\n");

const rows =
  registry.listRbacRolePermissionAdminSupportScopeReviewRegistryRows();
const summary =
  registry.getRbacRolePermissionAdminSupportScopeReviewRegistrySummary();

const expectedRowIds = Object.freeze(
  Array.from({ length: 12 }, (_, index) =>
    `RBAC-RP-AS-SR-${String(index + 1).padStart(3, "0")}`,
  ),
);

const expectedActors = Object.freeze([
  "human/professional reviewer",
  "repo/governance maintainer",
  "admin/support reviewer",
  "service/system actor",
  "CI/evidence actor",
  "audit/access reviewer",
  "retention/deletion reviewer",
  "third-party/provider route reviewer",
  "raw-material routing reviewer",
  "justice/public-sector reviewer",
  "external-use/product reviewer",
  "unknown/unclassified actor",
]);

const expectedFields = Object.freeze([
  "scope_id",
  "actor_type",
  "role_category",
  "permission_category",
  "allowed_material_classes",
  "prohibited_material_classes",
  "allowed_actions",
  "prohibited_actions",
  "admin_support_access_rule",
  "human_professional_review_dependency",
  "audit_log_dependency",
  "retention_deletion_dependency",
  "third_party_routing_constraint",
  "future_runtime_gate_dependency",
  "current_evidence_level",
  "implementation_gap",
  "required_implementation_evidence",
  "required_test_evidence",
  "blocker_status",
  "closure_criteria",
  "remains_non_authorized_until_closure",
  "source_evidence_references",
  "lineage",
  "status_labels",
  "non_authorization_flags",
]);

const falseClaimKeys = Object.freeze([
  "authorized",
  "access_granted",
  "rbac_implemented",
  "access_control_implemented",
  "access_control_enforced",
  "role_permission_model_created",
  "role_fields_created",
  "permission_fields_created",
  "role_schema_created",
  "permission_schema_created",
  "admin_support_implementation_created",
  "admin_support_access_authorized",
  "runtime_gate_created",
  "runtime_gate_implemented",
  "validator_dispatch_created",
  "runtime_registry_lookup_created",
  "audit_access_log_implemented",
  "audit_logging_implemented",
  "access_logging_implemented",
  "event_emitter_created",
  "log_schema_created",
  "log_storage_created",
  "log_viewer_created",
  "log_access_control_implemented",
  "raw_material_routing_implemented",
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
  "legal_clinical_evidentiary_case_truth_conclusion_created",
  "court_ready_created",
  "ai_act_compliance_created",
  "high_risk_approval_created",
  "runtime_api_schema_package_behavior_changed",
]);

const positiveOverclaimGuardPaths = Object.freeze([
  "packages/governance/src/rbac-role-permission-admin-support-scope-review-registry.js",
  "packages/governance/src/index.js",
  "tests/rbac-role-permission-admin-support-scope-review-registry.test.js",
]);

const positiveOverclaimForbiddenFragments = Object.freeze([
  ["RBAC ", "imple", "mented"],
  ["access-control ", "imple", "mented"],
  ["access control ", "imple", "mented"],
  ["role-permission model ", "cre", "ated"],
  ["role fields ", "cre", "ated"],
  ["permission fields ", "cre", "ated"],
  ["role schema ", "cre", "ated"],
  ["permission schema ", "cre", "ated"],
  ["admin/support access ", "auth", "orized"],
  ["permission ", "gra", "nted"],
  ["role ", "gra", "nted"],
  ["runtime gate ", "cre", "ated"],
  ["validator dispatch ", "cre", "ated"],
  ["registry lookup ", "cre", "ated"],
  ["technical ", "sign-", "off"],
  ["runtime ", "certi", "fication"],
  ["external-use ", "appro", "ved"],
  ["product candidate ", "sel", "ected"],
  ["court-", "ready"],
  ["AI Act ", "comp", "liant"],
  ["justice-", "ready"],
  ["high-risk ", "appro", "ved"],
  ["security ", "find", "ing"],
  ["seve", "rity ", "assigned"],
  ["reme", "diation ", "recommended"],
  ["reme", "diation ", "imple", "mented"],
  ["blocker ", "clo", "sed"],
  ["imple", "mentation ", "complete"],
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
    "RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_CATEGORIES",
    "RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ROWS",
    "RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_STATUS",
    "getRbacRolePermissionAdminSupportScopeReviewRegistryRow",
    "getRbacRolePermissionAdminSupportScopeReviewRegistrySummary",
    "listRbacRolePermissionAdminSupportScopeReviewRegistryRows",
  ]) {
    assert.equal(Object.hasOwn(registry, exportName), true, exportName);
    assert.equal(Object.hasOwn(index, exportName), true, exportName);
  }

  assert.equal(
    Object.isFrozen(
      registry.RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ROWS,
    ),
    true,
  );
});

test("preserves PR39 and PR40 tracked evidence boundaries", () => {
  for (let pr = 29; pr <= 40; pr += 1) {
    assert.equal(summary.lineage.some((entry) => entry.includes(`PR_${pr}`)), true);
  }

  for (const token of [
    "RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_AFTER_PR38",
    "DOCS_ONLY",
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
    "RBAC_IMPLEMENTATION_NOT_CREATED",
    "ACCESS_CONTROL_IMPLEMENTATION_NOT_CREATED",
    "ROLE_PERMISSION_MODEL_NOT_CREATED",
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "LOCAL_VALIDATION_NOT_CI_EVIDENCE",
    "CI_EVIDENCE_NOT_RELEASE_APPROVAL",
    "CI_EVIDENCE_NOT_TECHNICAL_SIGN_OFF",
    "CI_EVIDENCE_NOT_RUNTIME_CERTIFICATION",
    "CI_EVIDENCE_NOT_BLOCKER_CLOSURE",
  ]) {
    assert.equal(evidenceCorpus.includes(token), true, token);
  }

  assert.equal(summary.pr_39_scope_review_posture, "DOCS_ONLY_SCOPE_REVIEW_ONLY");
  assert.equal(
    summary.pr_40_alignment_proof_posture,
    "TEST_ONLY_ALIGNMENT_PROOF_ONLY",
  );
});

test("contains exact actor scope rows and required field structure", () => {
  assert.deepEqual(
    rows.map((row) => row.scope_id),
    expectedRowIds,
  );
  assert.deepEqual(
    rows.map((row) => row.actor_type),
    expectedActors,
  );

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), expectedFields, row.scope_id);
    assert.equal(row.blocker_status, "OPEN_NOT_CLOSED", row.scope_id);
    assert.equal(row.remains_non_authorized_until_closure, true, row.scope_id);
    assert.equal(
      row.status_labels.includes("GOVERNANCE_REGISTRY_SCAFFOLD_ONLY"),
      true,
      row.scope_id,
    );
    assert.equal(
      row.status_labels.includes("DOCS_ONLY_SCOPE_REVIEW_ONLY"),
      true,
      row.scope_id,
    );
    assert.equal(
      row.status_labels.includes("TEST_ONLY_ALIGNMENT_PROOF_ONLY"),
      true,
      row.scope_id,
    );
  }
});

test("keeps dependency-only surfaces and admin/support unresolved", () => {
  const byId = new Map(rows.map((row) => [row.scope_id, row]));

  assert.equal(
    byId.get("RBAC-RP-AS-SR-003").admin_support_access_rule,
    "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-004").implementation_gap,
    "SERVICE_SYSTEM_SELF_APPROVAL_NOT_CREATED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-006").audit_log_dependency,
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-007").retention_deletion_dependency,
    "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-008").third_party_routing_constraint,
    "THIRD_PARTY_PROVIDER_ROUTING_NOT_AUTHORIZED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-009").implementation_gap,
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_NOT_CREATED",
  );
  assert.equal(
    byId.get("RBAC-RP-AS-SR-010").implementation_gap,
    "COURT_READY_AI_ACT_HIGH_RISK_APPROVAL_NOT_CREATED",
  );
});

test("unknown row lookup fails closed", () => {
  const unknown =
    registry.getRbacRolePermissionAdminSupportScopeReviewRegistryRow("NOPE");

  assert.equal(unknown.scope_id, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.actor_type, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.implementation_gap, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(
    unknown.status_labels.includes("UNKNOWN_NOT_EVIDENCED"),
    true,
  );
  assert.equal(unknown.non_authorization_flags.authorized, false);
  assert.equal(unknown.non_authorization_flags.access_granted, false);
});

test("recursive non-authorization flags remain false", () => {
  assert.equal(summary.local_validation_is_ci_evidence, false);
  assert.equal(summary.ci_evidence_is_release_approval, false);
  assert.equal(summary.ci_evidence_is_technical_signoff, false);
  assert.equal(summary.ci_evidence_is_runtime_certification, false);
  assert.equal(summary.implementation_created, false);
  assert.equal(summary.runtime_api_schema_package_behavior_changed, false);

  assertFalseClaimsStayFalse([
    rows,
    summary,
    registry.getRbacRolePermissionAdminSupportScopeReviewRegistryRow(
      "UNKNOWN",
    ),
  ]);
});

test("preserves positive-overclaim guard for registry scaffold wording", () => {
  const scopedCorpus = positiveOverclaimGuardPaths
    .map((scopedPath) => fs.readFileSync(path.join(repoRoot, scopedPath), "utf8"))
    .join("\n")
    .toLowerCase();

  for (const fragments of positiveOverclaimForbiddenFragments) {
    const positiveClaim = fragments.join("").toLowerCase();
    assert.equal(scopedCorpus.includes(positiveClaim), false, positiveClaim);
  }
});
