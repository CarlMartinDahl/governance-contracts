"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const registry =
  require("../packages/governance/src/raw-material-routing-control-specification-registry.js");
const indexExports = require("../packages/governance/src/index.js");

const repoRoot = path.resolve(__dirname, "..");

const trackedEvidencePaths = Object.freeze({
  pr47ControlSpecification:
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_AFTER_PR46_v1.md",
  pr47ControlSpecificationProof:
    "tests/domain-raw-material-routing-control-specification-after-pr46.test.js",
  pr48AlignmentProof:
    "tests/domain-raw-material-routing-control-specification-after-pr46-alignment.test.js",
  pr45Registry:
    "packages/governance/src/raw-material-routing-implementation-readiness-scope-review-registry.js",
  pr45RegistryProof:
    "tests/raw-material-routing-implementation-readiness-scope-review-registry.test.js",
  pr46RegistryAlignmentProof:
    "tests/raw-material-routing-implementation-readiness-scope-review-registry-alignment.test.js",
  rbacRegistry:
    "packages/governance/src/rbac-role-permission-admin-support-scope-review-registry.js",
  rbacRegistryProof:
    "tests/rbac-role-permission-admin-support-scope-review-registry.test.js",
  rbacRegistryAlignmentProof:
    "tests/rbac-role-permission-admin-support-scope-review-registry-alignment.test.js",
  index: "packages/governance/src/index.js",
  pr43ScopeReview:
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR42_v1.md",
  pr43ScopeReviewProof:
    "tests/domain-raw-material-routing-implementation-readiness-scope-review-after-pr42.test.js",
  pr44ScopeReviewAlignmentProof:
    "tests/domain-raw-material-routing-implementation-readiness-scope-review-after-pr42-alignment.test.js",
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
  pr49Registry:
    "packages/governance/src/raw-material-routing-control-specification-registry.js",
  pr49Proof: "tests/raw-material-routing-control-specification-registry.test.js",
});

const readTracked = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const trackedEvidence = Object.fromEntries(
  Object.entries(trackedEvidencePaths).map(([key, evidencePath]) => [
    key,
    readTracked(evidencePath),
  ]),
);

const rows = registry.listRawMaterialRoutingControlSpecificationRows();
const summary =
  registry.summarizeRawMaterialRoutingControlSpecificationRegistry();

const expectedControlIds = Object.freeze(
  Array.from({ length: 12 }, (_, index) =>
    `RMR-CS-${String(index + 1).padStart(3, "0")}`,
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
  "controlId",
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
  "thirdPartyModelApiConstraint",
  "currentEvidenceLevel",
  "intendedEnforcementLayer",
  "implementationGap",
  "requiredImplementationEvidence",
  "requiredTestEvidence",
  "blockerStatus",
  "closureCriteria",
  "remainsNonAuthorizedUntilClosure",
]);

const expectedExports = Object.freeze([
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES",
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_NON_AUTHORIZATIONS",
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_REQUIRED_FIELDS",
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROWS",
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROW_IDS",
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS",
  "getRawMaterialRoutingControlSpecificationRow",
  "listRawMaterialRoutingControlSpecificationRows",
  "summarizeRawMaterialRoutingControlSpecificationRegistry",
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
  "executable_registry_lookup_created",
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
  "packages/governance/src/raw-material-routing-control-specification-registry.js",
  "packages/governance/src/index.js",
  "tests/raw-material-routing-control-specification-registry.test.js",
]);

const forbiddenPositivePattern = /\b(raw material routing implemented|raw-material routing implemented|route policy implemented|route decision engine created|quarantine implemented|block path implemented|validator dispatch created|registry lookup created|runtime registry lookup created|material class registry implemented|scope model implemented|third-party routing authorized|third party routing authorized|provider routing authorized|raw material route authorized|raw\/private\/source inspected|source package inspected|PDF inspected|image inspected|screenshot inspected|metadata inspected|runtime gate created|RBAC implemented|access-control implemented|access control implemented|admin support access authorized|admin\/support access authorized|audit\/access-log implemented|audit logging implemented|access logging implemented|retention implemented|deletion implemented|encryption implemented|chain-of-custody created|security finding|severity|remediation|release approval|external-use authorized|external use authorized|product candidate selected|technical sign-off|runtime certification|court ready|court-ready|AI Act compliant|AI_ACT_COMPLIANT|high-risk approved|HIGH_RISK_APPROVED|legal conclusion|clinical conclusion|evidentiary conclusion|case-truth conclusion|implementation complete|blocker closed)\b/gi; // forbidden phrase fixture

const allowedOverclaimContext =
  /(not|no|does not|non-authorized|not authorized|future|forbidden target|forbidden phrase fixture|blocked|prohibited|remains|without|denial|deny|excluded|only|false|none)/i;

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

function assertAllFalseClaimsStayFalse(value) {
  for (const object of collectObjects(value)) {
    for (const key of falseClaimKeys) {
      if (Object.hasOwn(object, key)) {
        assert.equal(object[key], false, key);
      }
    }
  }
}

function assertIncludesAll(content, expectedPhrases) {
  for (const phrase of expectedPhrases) {
    assert.equal(content.includes(phrase), true, phrase);
  }
}

test("exports static registry surface through module and index", () => {
  for (const exportName of expectedExports) {
    assert.equal(Object.hasOwn(registry, exportName), true, exportName);
    assert.equal(Object.hasOwn(indexExports, exportName), true, exportName);
  }

  assert.equal(
    Object.isFrozen(
      registry.RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROWS,
    ),
    true,
  );
  assert.equal(Object.isFrozen(rows), true);
  assert.equal(Object.isFrozen(summary), true);
});

test("preserves PR47, PR48, and PR43 through PR46 evidence posture", () => {
  assert.equal(
    summary.pr47ControlSpecificationPosture,
    "DOCS_ONLY_PROVE_ONLY_CONTROL_SPECIFICATION_ONLY",
  );
  assert.equal(
    summary.pr48AlignmentProofPosture,
    "TEST_ONLY_PROVE_ONLY_ALIGNMENT_PROOF_ONLY",
  );
  assert.equal(summary.dependencyOnly, true);
  assert.equal(summary.futureOnlyClosureCriteria, true);

  for (let pr = 29; pr <= 48; pr += 1) {
    assert.equal(summary.lineage.some((entry) => entry.includes(`PR_${pr}`)), true);
  }

  assert.deepEqual(summary.baseEvidence, {
    pr43: "DOCS_ONLY_PROVE_ONLY_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW",
    pr44: "TEST_ONLY_PROVE_ONLY_ALIGNMENT_PROOF",
    pr45: "PROVE_ONLY_STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
    pr46: "TEST_ONLY_PROVE_ONLY_REGISTRY_ALIGNMENT_PROOF",
    pr47: "DOCS_ONLY_PROVE_ONLY_CONTROL_SPECIFICATION_ONLY",
    pr48: "TEST_ONLY_PROVE_ONLY_ALIGNMENT_PROOF_ONLY",
  });

  assertIncludesAll(trackedEvidence.pr47ControlSpecification, [
    "Boundary name: `RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_AFTER_PR46`",
    "Mode: `DOCS_ONLY`",
    "Posture: `PROVE_ONLY`",
    "Scope: `CONTROL_SPECIFICATION_ONLY`",
    "PR_29_THROUGH_PR_46_LINEAGE_PRESERVED",
  ]);
  assertIncludesAll(trackedEvidence.pr48AlignmentProof, [
    "PR47 fixed tracked evidence exists",
    "PR48 positive-overclaim guard",
  ]);
});

test("contains exact RMR-CS rows, material classes, uniqueness, and required fields", () => {
  assert.deepEqual(registry.RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROW_IDS, expectedControlIds);
  assert.deepEqual(
    rows.map((row) => row.controlId),
    expectedControlIds,
  );
  assert.deepEqual(
    rows.map((row) => row.materialClass),
    expectedMaterialClasses,
  );
  assert.equal(summary.rowCount, 12);
  assert.equal(new Set(rows.map((row) => row.controlId)).size, 12);
  assert.equal(new Set(rows.map((row) => row.materialClass)).size, 12);
  assert.deepEqual(
    registry.RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_REQUIRED_FIELDS,
    expectedRequiredFields,
  );

  for (const row of rows) {
    for (const field of expectedRequiredFields) {
      assert.equal(Object.hasOwn(row, field), true, `${row.controlId}.${field}`);
    }
    assert.equal(
      row.remainsNonAuthorizedUntilClosure,
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
      row.controlId,
    );
    assert.match(row.blockerStatus, /NOT_CLOSED/, row.controlId);
    assert.equal(row.registryScaffoldOnly, true, row.controlId);
    assert.equal(row.staticRegistryHelperOnly, true, row.controlId);
  }
});

test("material-class postures preserve PR47 control specification boundaries", () => {
  const byId = Object.fromEntries(rows.map((row) => [row.controlId, row]));

  assert.match(byId["RMR-CS-001"].allowedIngress, /redaction and sanitization/);
  assert.match(byId["RMR-CS-001"].prohibitedEgress, /external-use/i);
  assert.match(byId["RMR-CS-002"].allowedProcessingLayer, /Review-support signal context only/);
  assert.match(byId["RMR-CS-002"].prohibitedProcessingLayer, /Automated conclusion generation/);
  assert.match(byId["RMR-CS-003"].prohibitedProcessingLayer, /Metadata acquisition/);
  assert.match(byId["RMR-CS-003"].prohibitedEgress, /chain-of-custody claim/);
  assert.match(byId["RMR-CS-004"].prohibitedEgress, /external-use/);
  assert.match(byId["RMR-CS-005"].currentEvidenceLevel, /NOT_CI_EVIDENCE/);
  assert.match(byId["RMR-CS-006"].allowedIngress, /^None\.$/);
  assert.match(byId["RMR-CS-006"].prohibitedProcessingLayer, /Automated processing/);
  assert.match(byId["RMR-CS-007"].prohibitedIngress, /Source package inspection/);
  assert.match(byId["RMR-CS-008"].prohibitedProcessingLayer, /OCR/);
  assert.match(byId["RMR-CS-008"].implementationGap, /No inspection\/acquisition path/);
  assert.match(byId["RMR-CS-009"].thirdPartyModelApiConstraint, /Provider registry\/status/);
  assert.match(byId["RMR-CS-010"].allowedProcessingLayer, /Human\/professional review support/);
  assert.match(byId["RMR-CS-010"].prohibitedProcessingLayer, /Automated approval/);
  assert.match(byId["RMR-CS-011"].currentEvidenceLevel, /UNKNOWN_NOT_EVIDENCED/);
  assert.match(byId["RMR-CS-011"].intendedEnforcementLayer, /DENY_BY_DEFAULT/);
  assert.match(byId["RMR-CS-012"].currentEvidenceLevel, /AMBIGUOUS_NOT_EVIDENCED/);
  assert.match(byId["RMR-CS-012"].implementationGap, /No mixed-bundle route path/);
});

test("unknown helper fails closed and summary remains posture-only", () => {
  const unknown = registry.getRawMaterialRoutingControlSpecificationRow(
    "RMR-CS-999",
  );
  assert.equal(unknown.controlId, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.currentEvidenceLevel, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknown.blockerStatus, "UNKNOWN_NOT_EVIDENCED");

  assert.equal(summary.localValidationIsCiEvidence, false);
  assert.equal(summary.ciEvidenceIsReleaseApproval, false);
  assert.equal(summary.ciEvidenceIsTechnicalSignoff, false);
  assert.equal(summary.ciEvidenceIsRuntimeCertification, false);
  assert.equal(summary.implementationCreated, false);
  assert.equal(summary.runtimeApiSchemaPackageBehaviorChanged, false);
  assert.equal(summary.registryScaffoldOnly, true);
  assert.equal(summary.runtimeRegistryLookupCreated, false);
  assert.equal(summary.executableRoutingCreated, false);
  assert.equal(summary.humanProfessionalReviewRequired, true);
});

test("non-authorizations remain false across rows and summary", () => {
  assertAllFalseClaimsStayFalse(rows);
  assertAllFalseClaimsStayFalse(summary);
  assertAllFalseClaimsStayFalse(
    registry.RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_NON_AUTHORIZATIONS,
  );

  assertIncludesAll(trackedEvidence.pr49Registry, [
    "GOVERNANCE_REGISTRY_SCAFFOLD_ONLY",
    "PROVE_ONLY",
    "DOCS_ONLY_CONTROL_SPECIFICATION_ONLY",
    "TEST_ONLY_ALIGNMENT_PROOF_ONLY",
    "CONTROL_SPECIFICATION_ONLY",
    "ALIGNMENT_PROOF_ONLY",
    "UNKNOWN_NOT_EVIDENCED",
  ]);
});

test("positive-overclaim guard scans exactly the PR49 scoped files", () => {
  const matches = [];
  for (const repoRelativePath of positiveOverclaimGuardPaths) {
    const content = readTracked(repoRelativePath);
    const lines = content.split("\n");
    for (const [lineIndex, line] of lines.entries()) {
      forbiddenPositivePattern.lastIndex = 0;
      if (forbiddenPositivePattern.test(line)) {
        matches.push({
          repoRelativePath,
          line: lineIndex + 1,
          text: line.trim(),
        });
      }
    }
  }

  assert.equal(
    matches.every((match) => allowedOverclaimContext.test(match.text)),
    true,
    JSON.stringify(matches, null, 2),
  );
});
