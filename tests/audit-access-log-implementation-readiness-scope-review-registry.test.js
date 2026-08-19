"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const registry =
  require("../packages/governance/src/audit-access-log-implementation-readiness-scope-review-registry.js");
const index = require("../packages/governance/src/index.js");

const repoRoot = path.join(__dirname, "..");
const readFixed = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const evidencePaths = Object.freeze({
  module:
    "packages/governance/src/audit-access-log-implementation-readiness-scope-review-registry.js",
  index: "packages/governance/src/index.js",
  pr60Review:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59_v1.md",
  pr60FocusedTest:
    "tests/domain-audit-access-log-implementation-readiness-scope-review-after-pr59.test.js",
  pr61Alignment:
    "tests/domain-audit-access-log-implementation-readiness-scope-review-after-pr59-alignment.test.js",
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
  blockerAnalysis:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  noContentTaxonomy:
    "packages/governance/src/no-content-audit-access-event-taxonomy.js",
  noContentTaxonomyTest:
    "tests/no-content-audit-access-event-taxonomy.test.js",
  rbacRegistry:
    "packages/governance/src/rbac-role-permission-model-scope-review-registry.js",
  adminSupportRegistry:
    "packages/governance/src/admin-support-access-model-scope-review-registry.js",
});

const evidence = Object.fromEntries(
  Object.entries(evidencePaths).map(([key, value]) => [key, readFixed(value)]),
);

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const parseJsonBlock = (markdown, blockName) => {
  const pattern = new RegExp(
    "`" +
      escapeRegExp(blockName) +
      "`\\n\\n```json\\n([\\s\\S]*?)\\n```",
  );
  const match = markdown.match(pattern);
  assert.ok(match, `${blockName} JSON block exists`);
  return JSON.parse(match[1]);
};

const sourceMetadata = parseJsonBlock(
  evidence.pr60Review,
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA",
);
const sourceRelationships = parseJsonBlock(
  evidence.pr60Review,
  "AUDIT_ACCESS_LOG_EXISTING_EVIDENCE_RELATIONSHIPS",
);
const sourceProvenance = parseJsonBlock(
  evidence.pr60Review,
  "AUDIT_ACCESS_LOG_SOURCE_PROVENANCE_FIXTURES",
);
const sourceNoContentProfile = parseJsonBlock(
  evidence.pr60Review,
  "AUDIT_ACCESS_LOG_CANONICAL_NO_CONTENT_PROFILE",
);
const sourceRows = parseJsonBlock(
  evidence.pr60Review,
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATRIX",
);

const rows =
  registry.listAuditAccessLogImplementationReadinessScopeReviewRows();
const summary =
  registry.getAuditAccessLogImplementationReadinessScopeReviewRegistrySummary();

const expectedReadinessIds = Array.from({ length: 17 }, (_, index) =>
  `AAL-IRSR-${String(index + 1).padStart(3, "0")}`,
);
const expectedBlockerIds = Array.from({ length: 17 }, (_, index) =>
  `AAL-RUNTIME-BLOCKER-${String(index + 1).padStart(3, "0")}`,
);
const expectedSurfaces = Object.freeze([
  "material intake event",
  "blocked/prohibited ingress event",
  "quarantine/block decision event",
  "redaction/sanitization event",
  "material routing event",
  "review access event",
  "manifest validation event",
  "export/download event",
  "packet/delivery promotion event",
  "local log/test transcript handling event",
  "admin/support access attempt event",
  "retention/deletion operation event",
  "third-party route denial/approval event",
  "runtime/schema/workflow gate candidate event",
  "human/professional review access event",
  "audit/log viewer access event",
  "admin/support privileged log access event",
]);
const expectedFields = Object.freeze([
  "readiness_id",
  "source_blocker_id",
  "surface",
  "actor_context_dependency",
  "role_permission_dependency",
  "scope_correlation_dependency",
  "decision_status_requirement",
  "allowed_event_content_profile",
  "prohibited_event_content_profile",
  "required_emitter_evidence",
  "required_schema_evidence",
  "required_storage_evidence",
  "required_log_viewer_access_control_evidence",
  "retention_deletion_dependency",
  "raw_material_routing_dependency",
  "third_party_provider_constraint",
  "current_evidence_level",
  "implementation_gap",
  "required_test_evidence",
  "blocker_status",
  "closure_criteria",
  "remains_non_authorized_until_closure",
]);
const requiredOpenLabels = Object.freeze([
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "AUDIT_LOGGING_NOT_IMPLEMENTED",
  "ACCESS_LOGGING_NOT_IMPLEMENTED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "EVENT_EMITTER_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
]);
const exactExports = Object.freeze([
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ALLOWED_EVIDENCE_LABELS",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_CANONICAL_NO_CONTENT_PROFILE",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_EXISTING_EVIDENCE_RELATIONSHIPS",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_NON_AUTHORIZATION_FLAGS",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_NAME",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_POSTURE",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_VERSION",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ROWS",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE",
  "getAuditAccessLogImplementationReadinessScopeReviewRegistrySummary",
  "listAuditAccessLogImplementationReadinessScopeReviewRows",
]);

const assertIncludesAll = (actual, expected) => {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
};

const assertDeepFrozen = (value) => {
  assert.equal(Object.isFrozen(value), true);
  if (!value || typeof value !== "object") {
    return;
  }
  for (const nested of Object.values(value)) {
    assertDeepFrozen(nested);
  }
};

test("exports exact static registry surface through module and package index", () => {
  assert.deepEqual(Object.keys(registry).sort(), [...exactExports].sort());
  for (const exportName of exactExports) {
    assert.equal(Object.hasOwn(index, exportName), true, exportName);
    assert.equal(index[exportName], registry[exportName], exportName);
  }
  assert.match(
    evidence.index,
    /require\("\.\/audit-access-log-implementation-readiness-scope-review-registry\.js"\)/,
  );
  assert.equal(Object.hasOwn(index, "eventFamilyRegistry"), true);
});

test("registry identity, posture, and descriptive metadata are exact", () => {
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_NAME,
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY",
  );
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_VERSION,
    "v1",
  );
  assertIncludesAll(summary.posture, [
    "PROVE_ONLY",
    "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
    "NOT_IMPLEMENTATION",
    "NOT_RUNTIME_ENFORCEMENT",
    "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA,
    sourceMetadata,
  );
  assert.equal(summary.sourceProvenanceSeparated, true);
  assert.equal(summary.legacyEvidenceRewritten, false);
  assert.equal(summary.descriptiveMetadata.implementationCreated, false);
  assert.equal(summary.descriptiveMetadata.auditLoggingImplemented, false);
  assert.equal(summary.descriptiveMetadata.accessLoggingImplemented, false);
  assert.equal(summary.descriptiveMetadata.eventEmitterCreated, false);
  assert.equal(summary.descriptiveMetadata.eventTaxonomyRuntimeCodeCreated, false);
  assert.equal(summary.descriptiveMetadata.logSchemaCreated, false);
  assert.equal(summary.descriptiveMetadata.logStorageCreated, false);
  assert.equal(summary.descriptiveMetadata.logViewerCreated, false);
  assert.equal(summary.descriptiveMetadata.runtimeEnforcementAuthorized, false);
  assert.equal(summary.descriptiveMetadata.blockerClosureCreated, false);
  assert.equal(summary.descriptiveMetadata.externalUseAuthorized, false);
  assert.equal(summary.descriptiveMetadata.humanProfessionalReviewRequired, true);
});

test("source evidence and accepted merge provenance stay structurally separate", () => {
  assert.notEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE,
  );
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE.pr53LiteralSourceEvidence,
    sourceProvenance.pr53_literal_source_evidence,
  );
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE.pr53LiteralSourceEvidence.literal_markers,
    ["PROVE_ONLY", "SCOPE_REVIEW_ONLY"],
  );
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE.pr53LiteralSourceEvidence.absent_literal_markers,
    ["TEST_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE.pr53LiteralSourceEvidence.literal_boundaries,
    ["no implementation", "no enforcement", "no blocker closure"],
  );
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE.pr60ScopeReview.sourceAnchor,
    "governance/main @ 350960b4350f9bb27317e21c5fc159bada80803e",
  );
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE.pr60ScopeReview.preMergeSourceMarker,
    "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR58",
  );
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE.pr60ScopeReview.mergeMarker,
    "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59",
  );
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE.pr61AlignmentProof.mergeMarker,
    "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59_ALIGNMENT_PROOF",
  );
  assert.equal(
    evidence.pr60Review.includes(
      "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59",
    ),
    false,
  );
  assert.equal(
    evidence.pr60FocusedTest.includes(
      "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59",
    ),
    false,
  );
});

test("relationships and no-content profile mirror source evidence", () => {
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_EXISTING_EVIDENCE_RELATIONSHIPS,
    sourceRelationships,
  );
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_CANONICAL_NO_CONTENT_PROFILE,
    sourceNoContentProfile,
  );
  for (const relationship of Object.values(summary.existingEvidenceRelationships)) {
    assert.equal(relationship.implementation, false);
    assert.equal(relationship.enforcement, false);
    assert.equal(relationship.approval, false);
    assert.equal(relationship.closure, false);
  }
  assert.equal(
    summary.existingEvidenceRelationships.runtime_readiness_blocker_analysis.relationship,
    "source surface mapping only",
  );
  assert.equal(summary.canonicalNoContentProfile.future_specification_material_only, true);
  assert.equal(summary.canonicalNoContentProfile.current_runtime_event_schema, false);
  assertIncludesAll(summary.canonicalNoContentProfile.prohibited_event_log_content, [
    "raw source text",
    "private facts",
    "source locators",
    "URLs",
    "tokens",
    "secrets",
    "PDF/image/metadata content",
    "legal conclusions",
    "clinical conclusions",
    "evidentiary conclusions",
    "case-truth conclusions",
  ]);
});

test("readiness rows exactly mirror PR60 matrix with IDs, blockers, surfaces, and fields", () => {
  assert.equal(rows.length, 17);
  assert.deepEqual(rows, sourceRows);
  assert.deepEqual(rows.map((row) => row.readiness_id), expectedReadinessIds);
  assert.deepEqual(rows.map((row) => row.source_blocker_id), expectedBlockerIds);
  assert.deepEqual(rows.map((row) => row.surface), [...expectedSurfaces]);
  assert.equal(new Set(rows.map((row) => row.readiness_id)).size, 17);
  assert.equal(new Set(rows.map((row) => row.source_blocker_id)).size, 17);

  for (const [index, row] of rows.entries()) {
    assert.equal(row.source_blocker_id, expectedBlockerIds[index]);
    assert.deepEqual(Object.keys(row), [...expectedFields]);
    assert.equal(Object.keys(row).length, 22);
    assert.equal(row.current_evidence_level, "SCOPE_REVIEW_ONLY");
    assert.match(row.closure_criteria, /^future independently verified/);
    assert.match(
      row.remains_non_authorized_until_closure,
      /implementation|authorization|logging|external-use|approval|closure|runtime|registry|dispatch|routing|candidate|sign-off|conclusions|viewer|schema|storage|gate|packet|evidence/i,
    );
  }
});

test("runtime blocker analysis anchors and historical surface wording are preserved", () => {
  for (const row of rows) {
    assert.match(evidence.blockerAnalysis, new RegExp(escapeRegExp(row.source_blocker_id)));
    assert.match(evidence.blockerAnalysis, new RegExp(escapeRegExp(row.surface)));
  }
  const providerRow = rows.filter(
    (row) => row.surface === "third-party route denial/approval event",
  )[0];
  assert.ok(providerRow);
  assert.match(
    providerRow.third_party_provider_constraint,
    /historical approval label is a surface name only/,
  );
  assert.match(
    providerRow.third_party_provider_constraint,
    /current provider routing remains not authorized/,
  );
});

test("all blockers remain open and non-authorized until future closure", () => {
  for (const row of rows) {
    for (const label of requiredOpenLabels) {
      assert.match(row.blocker_status, new RegExp(escapeRegExp(label)), row.readiness_id);
    }
    assert.doesNotMatch(
      row.blocker_status,
      /\b(BLOCKER_CLOSED|AUTHORIZED_FOR_RUNTIME_ENFORCEMENT|IMPLEMENTED_CURRENTLY)\b/,
    );
    assert.match(row.required_emitter_evidence, /^future /);
    assert.match(row.required_schema_evidence, /^future /);
    assert.match(row.required_storage_evidence, /^future /);
    assert.match(row.required_log_viewer_access_control_evidence, /^future /);
    assert.match(row.closure_criteria, /^future /);
  }
  for (const [key, value] of Object.entries(summary.nonAuthorizationFlags)) {
    assert.equal(value, false, key);
  }
});

test("helpers are zero-argument static clones and expose no operational helpers", () => {
  assert.equal(
    registry.listAuditAccessLogImplementationReadinessScopeReviewRows.length,
    0,
  );
  assert.equal(
    registry.getAuditAccessLogImplementationReadinessScopeReviewRegistrySummary.length,
    0,
  );
  assert.deepEqual(
    registry.listAuditAccessLogImplementationReadinessScopeReviewRows().map(
      (row) => row.readiness_id,
    ),
    expectedReadinessIds,
  );
  assert.equal(summary.readinessRowCount, 17);
  assert.equal(summary.sourceBlockerCount, 17);
  assert.equal(Object.hasOwn(summary, "decision"), false);
  assert.equal(Object.hasOwn(summary, "authorizationDecision"), false);
  assert.equal(Object.hasOwn(summary, "routingDecision"), false);
  assert.equal(Object.hasOwn(summary, "closureDecision"), false);

  for (const exportName of Object.keys(registry)) {
    assert.doesNotMatch(
      exportName,
      /lookup|getById|find|resolve|authorize|grant|permit|route|dispatch|enforce|approve|emit|write|persist|closeBlocker|calculateRisk|calculateSeverity/i,
      exportName,
    );
  }
});

test("registry constants and helper returns are deeply frozen and isolated", () => {
  for (const value of [
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_POSTURE,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_EXISTING_EVIDENCE_RELATIONSHIPS,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_CANONICAL_NO_CONTENT_PROFILE,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ALLOWED_EVIDENCE_LABELS,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ROWS,
    rows,
    summary,
  ]) {
    assertDeepFrozen(value);
  }

  assert.notEqual(
    rows,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ROWS,
  );
  assert.throws(() => {
    rows.push({});
  }, TypeError);
  assert.throws(() => {
    rows[0].surface = "changed";
  }, TypeError);
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ROWS[0].surface,
    "material intake event",
  );
});

test("source module uses only deterministic static construction", () => {
  for (const pattern of [
    /require\("node:fs"\)/,
    /fs\./,
    /readFile/,
    /writeFile/,
    /appendFile/,
    /readdir/,
    /glob\(/,
    /fetch\(/,
    /axios/,
    /child_process/,
    /exec\(/,
    /spawn\(/,
    /process\.env/,
    /crypto\./,
    /Date\./,
    /new Date\(/,
    /Math\.random/,
  ]) {
    assert.doesNotMatch(evidence.module, pattern);
  }
  assert.match(evidence.pr60FocusedTest, new RegExp(escapeRegExp(evidencePaths.pr60Review)));
  assert.match(evidence.pr61Alignment, new RegExp(escapeRegExp(evidencePaths.pr60FocusedTest)));
});

test("forbidden positive labels remain fixtures and current posture avoids overclaim", () => {
  assert.deepEqual(summary.forbiddenPositiveLabels, [
    "IMPLEMENTED",
    "AUTHORIZED",
    "ENABLED",
    "ENFORCED",
    "APPROVED",
    "BLOCKER_CLOSED",
    "RELEASE_READY",
    "EXTERNAL_USE_READY",
    "TECHNICAL_SIGNED_OFF",
    "RUNTIME_CERTIFIED",
    "COURT_READY",
    "AI_ACT_COMPLIANT",
    "HIGH_RISK_APPROVED",
  ]);
  for (const label of summary.posture) {
    assert.equal(summary.forbiddenPositiveLabels.includes(label), false, label);
  }
  for (const label of summary.allowedEvidenceLabels) {
    assert.equal(summary.forbiddenPositiveLabels.includes(label), false, label);
  }
});

test("fixed tracked evidence boundaries avoid private material and copied logs", () => {
  assertIncludesAll(evidence.wikiIndex, [
    "This wiki is a tracked repo orientation and coordination layer.",
    "Live git state, tracked",
    "non-repo files are advisory only",
  ]);
  assertIncludesAll(evidence.wikiLog, [
    "Chat is advisory only and is not a source of truth.",
    "does not create governance proof, implementation, readiness, approval",
  ]);
  assertIncludesAll(evidence.noContentTaxonomy, [
    "RAW_SOURCE_TEXT_CONTENT",
    "PRIVATE_FACT_CONTENT",
    "SOURCE_LOCATOR_CONTENT",
    "PDF_IMAGE_METADATA_CONTENT",
    "DOMAIN_TRUTH_CONCLUSION_CONTENT",
  ]);
  assertIncludesAll(evidence.noContentTaxonomyTest, [
    "taxonomy does not imply audit/access-log implementation or audit proof",
    "taxonomy does not create CI evidence, proof, certification, or sign-off",
  ]);

  for (const forbidden of [
    ["named private", " recipient"].join(""),
    ["private recipient", " identity"].join(""),
    "uploaded conversation material copied",
    "confidential material copied",
  ]) {
    assert.equal(evidence.module.includes(forbidden), false, forbidden);
  }
});
