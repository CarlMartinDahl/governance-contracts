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
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
  pr60Review:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59_v1.md",
  pr60FocusedTest:
    "tests/domain-audit-access-log-implementation-readiness-scope-review-after-pr59.test.js",
  pr61Alignment:
    "tests/domain-audit-access-log-implementation-readiness-scope-review-after-pr59-alignment.test.js",
  pr62Module:
    "packages/governance/src/audit-access-log-implementation-readiness-scope-review-registry.js",
  pr62FocusedTest:
    "tests/audit-access-log-implementation-readiness-scope-review-registry.test.js",
  index: "packages/governance/src/index.js",
  blockerAnalysis:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  rbacAlignmentPrecedent:
    "tests/rbac-role-permission-model-scope-review-registry-alignment.test.js",
  adminSupportAlignmentPrecedent:
    "tests/admin-support-access-model-scope-review-registry-alignment.test.js",
});

const evidence = Object.freeze(
  Object.fromEntries(
    Object.entries(evidencePaths).map(([key, value]) => [
      key,
      readFixed(value),
    ]),
  ),
);

const ownPosture = Object.freeze([
  "TEST_ONLY",
  "PROVE_ONLY",
  "ALIGNMENT_PROOF_ONLY",
]);

const acceptedPr62Provenance = Object.freeze({
  marker:
    "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_SCAFFOLD_AFTER_PR61",
  commit: "e7c4fb2917d188b7d49d9ea1f1bbff70c115dea6",
  preMergeHead: "be1842b552fac7114318a1c28230898a514936be",
});

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

const functionExports = Object.freeze([
  "getAuditAccessLogImplementationReadinessScopeReviewRegistrySummary",
  "listAuditAccessLogImplementationReadinessScopeReviewRows",
]);

const expectedRowFields = Object.freeze([
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

const expectedReadinessIds = Object.freeze(
  Array.from({ length: 17 }, (_, index) =>
    `AAL-IRSR-${String(index + 1).padStart(3, "0")}`,
  ),
);

const expectedBlockerIds = Object.freeze(
  Array.from({ length: 17 }, (_, index) =>
    `AAL-RUNTIME-BLOCKER-${String(index + 1).padStart(3, "0")}`,
  ),
);

const expectedAllowedCategories = Object.freeze([
  "subject reference",
  "role/permission concept",
  "tenant/case scope",
  "material class",
  "route/surface",
  "decision status",
  "timestamp category",
  "reason code",
  "explicit no-raw/no-private/no-source-locator marker",
]);

const expectedProhibitedCategories = Object.freeze([
  "raw source text",
  "private facts",
  "source locators",
  "filenames or private paths",
  "page references",
  "URLs",
  "tokens",
  "secrets",
  "PDF/image/metadata content",
  "sensitive personal details",
  "legal conclusions",
  "clinical conclusions",
  "evidentiary conclusions",
  "case-truth conclusions",
  "product-candidate claims",
  "external-use claims",
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

const forbiddenPositiveLabels = Object.freeze([
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

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseJsonBlock = (source, blockName) => {
  const pattern = new RegExp(
    "`" +
      escapeRegExp(blockName) +
      "`\\n\\n```json\\n([\\s\\S]*?)\\n```",
  );
  const match = source.match(pattern);
  assert.ok(match, `${blockName} JSON block exists`);
  return JSON.parse(match[1]);
};

const assertIncludesAll = (source, values, label) => {
  for (const value of values) {
    assert.match(source, new RegExp(escapeRegExp(value)), `${label}: ${value}`);
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

const assertNoForbiddenCurrentDecision = (source, label) => {
  assert.doesNotMatch(
    source,
    /\b(implemented|authorized|approved|enabled|enforcementActive|blockerClosed|accessGranted|routeAuthorized|releaseReady|externalUseReady)\s*:\s*true\b/,
    label,
  );
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

test("own alignment-proof posture is narrow and not projected backward", () => {
  assert.deepEqual(ownPosture, [
    "TEST_ONLY",
    "PROVE_ONLY",
    "ALIGNMENT_PROOF_ONLY",
  ]);
  assert.deepEqual(sourceMetadata.posture, [
    "DOCS_ONLY",
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
  ]);
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE
      .pr61AlignmentProof.literalMarkers,
    ["TEST_ONLY", "PROVE_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_POSTURE,
    {
      PROVE_ONLY: "PROVE_ONLY",
      STATIC_GOVERNANCE_REGISTRY_SCAFFOLD:
        "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
      NOT_IMPLEMENTATION: "NOT_IMPLEMENTATION",
      NOT_RUNTIME_ENFORCEMENT: "NOT_RUNTIME_ENFORCEMENT",
      NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION:
        "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
      NOT_AUDIT_LOGGING: "NOT_AUDIT_LOGGING",
      NOT_ACCESS_LOGGING: "NOT_ACCESS_LOGGING",
      NOT_EVENT_EMITTER: "NOT_EVENT_EMITTER",
      NOT_LOG_SCHEMA: "NOT_LOG_SCHEMA",
      NOT_LOG_STORAGE: "NOT_LOG_STORAGE",
      NOT_LOG_VIEWER: "NOT_LOG_VIEWER",
      NOT_REGISTRY_LOOKUP: "NOT_REGISTRY_LOOKUP",
      NOT_VALIDATOR_DISPATCH: "NOT_VALIDATOR_DISPATCH",
      HUMAN_PROFESSIONAL_REVIEW_REQUIRED:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
      EXTERNAL_USE_NOT_AUTHORIZED: "EXTERNAL_USE_NOT_AUTHORIZED",
      PRODUCT_CANDIDATE_NONE: "PRODUCT_CANDIDATE_NONE",
    },
  );
  assert.equal(sourceMetadata.posture.includes("TEST_ONLY"), false);
  assert.equal(sourceMetadata.posture.includes("ALIGNMENT_PROOF_ONLY"), false);
});

test("PR60, PR61, and PR62 source/provenance structures stay distinct", () => {
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE
      .pr53LiteralSourceEvidence,
    sourceProvenance.pr53_literal_source_evidence,
  );
  assert.deepEqual(
    sourceProvenance.pr53_literal_source_evidence.literal_markers,
    ["PROVE_ONLY", "SCOPE_REVIEW_ONLY"],
  );
  assert.deepEqual(
    sourceProvenance.pr53_literal_source_evidence.absent_literal_markers,
    ["TEST_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
  assert.deepEqual(
    sourceProvenance.pr53_literal_source_evidence.literal_boundaries,
    ["no implementation", "no enforcement", "no blocker closure"],
  );
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE
      .pr53AlignmentProof.mergeMarker,
    "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
  );
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE
      .pr53AlignmentProof.mergeCommit,
    "03516fa6deeea91a7dccbcb35c17907e3e113da8",
  );
  assert.equal(
    sourceMetadata.source_anchor,
    "governance/main @ 350960b4350f9bb27317e21c5fc159bada80803e",
  );
  assert.equal(
    sourceMetadata.latest_marker,
    "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR58",
  );
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE
      .pr60ScopeReview.mergeMarker,
    "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59",
  );
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE
      .pr61AlignmentProof.mergeMarker,
    "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59_ALIGNMENT_PROOF",
  );
  assert.equal(
    acceptedPr62Provenance.marker,
    "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_SCAFFOLD_AFTER_PR61",
  );
  assert.equal(
    acceptedPr62Provenance.commit,
    "e7c4fb2917d188b7d49d9ea1f1bbff70c115dea6",
  );
  assert.equal(evidence.pr62Module.includes(acceptedPr62Provenance.marker), false);
  assert.equal(
    evidence.pr62FocusedTest.includes(acceptedPr62Provenance.marker),
    false,
  );
  assert.notEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE,
  );
});

test("registry identity, package-index export wiring, and helper surface align", () => {
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_NAME,
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY",
  );
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_VERSION,
    "v1",
  );
  assert.deepEqual(Object.keys(registry).sort(), [...exactExports].sort());
  for (const exportName of exactExports) {
    assert.equal(Object.hasOwn(index, exportName), true, exportName);
    assert.equal(index[exportName], registry[exportName], exportName);
  }
  assert.deepEqual(
    Object.entries(registry)
      .filter((entry) => typeof entry[1] === "function")
      .map((entry) => entry[0])
      .sort(),
    [...functionExports].sort(),
  );
  assert.equal(
    registry.listAuditAccessLogImplementationReadinessScopeReviewRows.length,
    0,
  );
  assert.equal(
    registry.getAuditAccessLogImplementationReadinessScopeReviewRegistrySummary
      .length,
    0,
  );
  assert.match(
    evidence.index,
    /require\("\.\/audit-access-log-implementation-readiness-scope-review-registry\.js"\)/,
  );
  for (const exportName of Object.keys(registry)) {
    assert.doesNotMatch(
      exportName,
      /lookup|getById|find|resolve|authorize|grant|permit|route|dispatch|enforce|approve|emit|write|persist|closeBlocker|calculateReadiness|calculateRisk|calculateSeverity/i,
      exportName,
    );
  }
});

test("descriptive metadata and relationship categories preserve non-operational meaning", () => {
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA,
    sourceMetadata,
  );
  assert.equal(summary.sourceProvenanceSeparated, true);
  assert.equal(summary.legacyEvidenceRewritten, false);
  assert.equal(summary.descriptiveMetadata.sourceProvenanceSeparated, true);
  assert.equal(summary.descriptiveMetadata.legacyEvidenceRewritten, false);
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
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_EXISTING_EVIDENCE_RELATIONSHIPS,
    sourceRelationships,
  );
  assert.deepEqual(Object.keys(sourceRelationships), [
    "feasibility_review",
    "control_specification",
    "implementation_gap_inventory",
    "runtime_readiness_blocker_analysis",
    "no_content_event_taxonomy_scaffold",
    "pr52_to_pr55_rbac_evidence",
    "pr56_to_pr59_admin_support_evidence",
  ]);
  for (const relationship of Object.values(sourceRelationships)) {
    assert.equal(relationship.implementation, false);
    assert.equal(relationship.enforcement, false);
    assert.equal(relationship.approval, false);
    assert.equal(relationship.closure, false);
  }
});

test("canonical no-content profile matches PR60 and registry exports exactly", () => {
  assert.deepEqual(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_CANONICAL_NO_CONTENT_PROFILE,
    sourceNoContentProfile,
  );
  assert.equal(sourceNoContentProfile.future_specification_material_only, true);
  assert.equal(sourceNoContentProfile.current_runtime_event_schema, false);
  assert.deepEqual(
    sourceNoContentProfile.allowed_future_event_content_categories,
    [...expectedAllowedCategories],
  );
  assert.deepEqual(
    sourceNoContentProfile.prohibited_event_log_content,
    [...expectedProhibitedCategories],
  );
  assert.equal(
    sourceNoContentProfile.allowed_future_event_content_categories.length,
    9,
  );
  assert.equal(sourceNoContentProfile.prohibited_event_log_content.length, 16);
  assert.deepEqual(summary.canonicalNoContentProfile, sourceNoContentProfile);
});

test("readiness rows exactly mirror PR60 matrix and preserve source order", () => {
  assert.equal(sourceRows.length, 17);
  assert.equal(rows.length, 17);
  assert.deepEqual(rows, sourceRows);
  assert.deepEqual(rows.map((row) => row.readiness_id), [
    ...expectedReadinessIds,
  ]);
  assert.deepEqual(rows.map((row) => row.source_blocker_id), [
    ...expectedBlockerIds,
  ]);
  assert.deepEqual(rows.map((row) => row.surface), [...expectedSurfaces]);
  assert.equal(new Set(rows.map((row) => row.readiness_id)).size, 17);
  assert.equal(new Set(rows.map((row) => row.source_blocker_id)).size, 17);
  for (const [rowIndex, row] of rows.entries()) {
    assert.equal(row.source_blocker_id, expectedBlockerIds[rowIndex]);
    assert.deepEqual(Object.keys(row), [...expectedRowFields]);
    assert.equal(Object.keys(row).length, 22);
    assert.equal(row.current_evidence_level, "SCOPE_REVIEW_ONLY");
    assert.match(row.closure_criteria, /^future independently verified/);
    assert.match(row.remains_non_authorized_until_closure, /\S/);
  }
  const thirdPartyRows = rows.filter(
    (row) => row.surface === "third-party route denial/approval event",
  );
  assert.equal(thirdPartyRows.length, 1);
  assert.match(
    thirdPartyRows[0].third_party_provider_constraint,
    /historical approval label is a surface name only/,
  );
  assert.match(
    thirdPartyRows[0].third_party_provider_constraint,
    /current provider routing remains not authorized/,
  );
});

test("source rows remain anchored in tracked PR60 and PR61 evidence", () => {
  assertIncludesAll(
    evidence.pr60Review,
    [
      "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59",
      "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATRIX",
      "AAL-IRSR-001",
      "AAL-IRSR-017",
      "AAL-RUNTIME-BLOCKER-001",
      "AAL-RUNTIME-BLOCKER-017",
      "third-party route denial/approval event",
    ],
    "PR60 review",
  );
  assertIncludesAll(
    evidence.pr60FocusedTest,
    [
      evidencePaths.pr60Review,
      "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATRIX",
      "sourceProvenanceSeparated",
      "legacyEvidenceRewritten",
    ],
    "PR60 focused proof",
  );
  assertIncludesAll(
    evidence.pr61Alignment,
    [
      evidencePaths.pr60Review,
      evidencePaths.pr60FocusedTest,
      "TEST_ONLY",
      "ALIGNMENT_PROOF_ONLY",
      "sourceProvenanceSeparated",
    ],
    "PR61 alignment proof",
  );
  for (const row of rows) {
    assert.match(
      evidence.blockerAnalysis,
      new RegExp(escapeRegExp(row.source_blocker_id)),
      row.source_blocker_id,
    );
    assert.match(
      evidence.blockerAnalysis,
      new RegExp(escapeRegExp(row.surface)),
      row.surface,
    );
  }
});

test("helpers return complete frozen clones and preserve canonical-state isolation", () => {
  assert.equal(summary.readinessRowCount, 17);
  assert.equal(summary.sourceBlockerCount, 17);
  assert.deepEqual(summary.readinessIds, [...expectedReadinessIds]);
  assert.deepEqual(summary.sourceBlockerIds, [...expectedBlockerIds]);
  assert.deepEqual(
    registry.listAuditAccessLogImplementationReadinessScopeReviewRows(),
    sourceRows,
  );
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
  assert.notEqual(
    summary.descriptiveMetadata,
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA,
  );
  assert.throws(() => {
    rows.push({});
  }, TypeError);
  assert.throws(() => {
    rows[0].surface = "changed";
  }, TypeError);
  assert.throws(() => {
    summary.descriptiveMetadata.implementationCreated = true;
  }, TypeError);
  assert.equal(
    registry.AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ROWS[0]
      .surface,
    "material intake event",
  );
  assert.equal(
    registry.getAuditAccessLogImplementationReadinessScopeReviewRegistrySummary()
      .descriptiveMetadata.implementationCreated,
    false,
  );
});

test("open blockers and non-authorizations remain explicit", () => {
  for (const row of rows) {
    for (const label of requiredOpenLabels) {
      assert.match(row.blocker_status, new RegExp(escapeRegExp(label)));
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
    assert.match(row.remains_non_authorized_until_closure, /\S/);
  }
  for (const [flagName, flagValue] of Object.entries(
    summary.nonAuthorizationFlags,
  )) {
    assert.equal(flagValue, false, flagName);
  }
  assert.deepEqual(summary.forbiddenPositiveLabels, [...forbiddenPositiveLabels]);
  for (const label of summary.forbiddenPositiveLabels) {
    assert.equal(summary.posture.includes(label), false, label);
    assert.equal(summary.allowedEvidenceLabels.includes(label), false, label);
  }
  assertNoForbiddenCurrentDecision(evidence.pr62Module, "PR62 module");
});

test("wiki and sibling precedents remain process guidance only", () => {
  assertIncludesAll(
    evidence.wikiIndex,
    [
      "This wiki is a tracked repo orientation and coordination layer.",
      "Live git state, tracked",
      "non-repo files are advisory only",
    ],
    "wiki index",
  );
  assertIncludesAll(
    evidence.wikiLog,
    [
      "Chat is advisory only and is not a source of truth.",
      "does not create governance proof, implementation, readiness, approval",
    ],
    "wiki log",
  );
  assertIncludesAll(
    evidence.rbacAlignmentPrecedent,
    ["sourceEvidence", "ALIGNMENT_PROOF_ONLY", "package index"],
    "RBAC alignment precedent",
  );
  assertIncludesAll(
    evidence.adminSupportAlignmentPrecedent,
    ["sourceEvidence", "ALIGNMENT_PROOF_ONLY", "package index"],
    "admin/support alignment precedent",
  );
});

test("alignment proof introduces no operational or private-material surface", () => {
  assertNoForbiddenCurrentDecision(
    fs.readFileSync(__filename, "utf8"),
    "this alignment proof",
  );
  for (const exportName of Object.keys(registry)) {
    assert.doesNotMatch(
      exportName,
      /lookup|getById|find|resolve|authorize|grant|permit|route|dispatch|enforce|approve|emit|write|persist|closeBlocker|calculateReadiness|calculateRisk|calculateSeverity/i,
      exportName,
    );
  }
  assertIncludesAll(
    summary.helperBoundary,
    [
      "static descriptive summary only",
      "no access",
      "routing",
      "authorization",
      "enforcement",
      "approval",
      "blocker-closure decision",
    ],
    "helper boundary",
  );
  assert.equal(
    evidence.pr62Module.includes(["named private", " recipient"].join("")),
    false,
  );
  assert.equal(
    evidence.pr62Module.includes(["private recipient", " identity"].join("")),
    false,
  );
});
