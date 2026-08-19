"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

const paths = Object.freeze({
  review:
    "docs/DOMAIN_CONTRACTS_RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR63_v1.md",
  rdeGap:
    "packages/governance/src/retention-deletion-encryption-gap-review.js",
  rdeGapTest: "tests/retention-deletion-encryption-gap-review.test.js",
  rdeStorage:
    "packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js",
  rdeStorageTest:
    "tests/retention-deletion-encryption-storage-dependency-registry.test.js",
  rdeRuntime:
    "packages/governance/src/retention-deletion-encryption-runtime-readiness-blocker-status-registry.js",
  rdeRuntimeTest:
    "tests/retention-deletion-encryption-runtime-readiness-blocker-status-registry.test.js",
  dataHandling: "packages/governance/src/data-handling-control-plane.js",
  auditReview:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59_v1.md",
  auditReviewTest:
    "tests/domain-audit-access-log-implementation-readiness-scope-review-after-pr59.test.js",
  auditReviewAlignment:
    "tests/domain-audit-access-log-implementation-readiness-scope-review-after-pr59-alignment.test.js",
  auditRegistry:
    "packages/governance/src/audit-access-log-implementation-readiness-scope-review-registry.js",
  auditRegistryTest:
    "tests/audit-access-log-implementation-readiness-scope-review-registry.test.js",
  auditRegistryAlignment:
    "tests/audit-access-log-implementation-readiness-scope-review-registry-alignment.test.js",
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
});

const readFixed = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const evidence = Object.freeze(
  Object.fromEntries(
    Object.entries(paths).map(([key, value]) => [key, readFixed(value)]),
  ),
);

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const jsonBlock = (blockName) => {
  const pattern = new RegExp(
    "`" +
      escapeRegExp(blockName) +
      "`\\s*\\n\\s*```json\\s*([\\s\\S]*?)\\s*```",
  );
  const match = evidence.review.match(pattern);
  assert.ok(match, `${blockName} JSON block exists`);
  return JSON.parse(match[1]);
};

const metadata = jsonBlock(
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA",
);
const sourceEvidence = jsonBlock(
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE",
);
const provenance = jsonBlock(
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_PROVENANCE",
);
const relationships = jsonBlock(
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_EXISTING_EVIDENCE_RELATIONSHIPS",
);
const rowSchema = jsonBlock(
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_ROW_SCHEMA",
);
const rows = jsonBlock(
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_REVIEW_MATRIX",
);
const gapSummary = jsonBlock(
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_GAP_SUMMARY",
);
const nonAuthorizations = jsonBlock(
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_EXPLICIT_NON_AUTHORIZATIONS",
);

const expectedPosture = Object.freeze([
  "DOCS_ONLY",
  "PROVE_ONLY",
  "SCOPE_REVIEW_ONLY",
]);

const expectedReviewAreas = Object.freeze([
  "retention policy",
  "retention implementation",
  "deletion policy",
  "deletion implementation",
  "purge and erasure",
  "deletion verification",
  "storage lifecycle",
  "encryption at rest",
  "encryption in transit",
  "key generation and custody",
  "key rotation and revocation",
  "actor/role/permission dependency",
  "admin/support dependency",
  "audit/access-log dependency",
  "raw-material-routing dependency",
  "third-party/provider dependency",
  "human/professional review",
]);

const expectedRowFields = Object.freeze([
  "readinessId",
  "reviewArea",
  "sourceEvidenceRefs",
  "sourceOrder",
  "currentEvidenceLevel",
  "currentEvidenceSummary",
  "implementationGap",
  "requiredFutureImplementationEvidence",
  "requiredFutureTestEvidence",
  "openBlockers",
  "closureCriteria",
  "remainsNonAuthorizedUntilClosure",
]);

const expectedAllowedEvidenceLabels = Object.freeze([
  "RUNTIME_ENFORCED_FOR_DOCUMENTED_AND_TESTED_SURFACES_ONLY",
  "SCHEMA_VALIDATOR_ENFORCED_FOR_EXPORTED_TRACKED_SCHEMA_VALIDATORS_ONLY",
  "PROMPT_WORKFLOW_ENFORCED_OR_CONTROLLED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "DOCS_ONLY",
  "TEST_ONLY",
  "PROVE_ONLY",
  "SCOPE_REVIEW_ONLY",
  "ALIGNMENT_PROOF_ONLY",
  "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
  "UNKNOWN_NOT_EVIDENCED",
  "NOT_AUTHORIZED",
]);

const expectedProvenance = Object.freeze({
  rbac_role_permission_alignment_pr53: Object.freeze({
    marker:
      "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
    commit: "03516fa6deeea91a7dccbcb35c17907e3e113da8",
  }),
  audit_access_log_scope_pr60: Object.freeze({
    marker:
      "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59",
    commit: "a1cd1c6ab7aebc5eae7034f71e58053ab9e41bda",
  }),
  audit_access_log_scope_alignment_pr61: Object.freeze({
    marker:
      "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59_ALIGNMENT_PROOF",
    commit: "f25196c14cff4b3d7005713a71fb62b991caab96",
  }),
  audit_access_log_registry_pr62: Object.freeze({
    marker:
      "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_SCAFFOLD_AFTER_PR61",
    commit: "e7c4fb2917d188b7d49d9ea1f1bbff70c115dea6",
  }),
  audit_access_log_registry_alignment_pr63: Object.freeze({
    marker:
      "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR62",
    commit: "3c8ac7c74614ca17e6f101efa564a8ca317b077f",
  }),
  lifecycle_gap_review_scaffold: Object.freeze({
    subject: "feat(governance): add retention deletion encryption gap review",
    commit: "2b64fe483e62ee6709491d505ca7387a3433da83",
  }),
  lifecycle_storage_dependency_registry_scaffold: Object.freeze({
    subject: "feat(governance): add lifecycle storage dependency registry",
    commit: "340c069a282495e1246ee5357bc8daa904afa709",
  }),
  lifecycle_runtime_readiness_blocker_registry_scaffold: Object.freeze({
    subject:
      "feat(governance): add retention deletion encryption runtime readiness blocker registry",
    commit: "e30b2df1545f26487e4426cf446f706bb9a7e139",
  }),
});

const pathEvidenceByRepoPath = Object.freeze({
  [paths.rdeGap]: evidence.rdeGap,
  [paths.rdeStorage]: evidence.rdeStorage,
  [paths.rdeRuntime]: evidence.rdeRuntime,
  [paths.dataHandling]: evidence.dataHandling,
  [paths.auditReview]: evidence.auditReview,
  [paths.auditRegistry]: evidence.auditRegistry,
});

const assertIncludesAll = (source, values, label) => {
  for (const value of values) {
    assert.match(source, new RegExp(escapeRegExp(value)), `${label}: ${value}`);
  }
};

const assertAllFalse = (value, label) => {
  if (!value || typeof value !== "object") {
    return;
  }
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === "boolean" && item !== false) {
      assert.fail(`${label}.${key} must remain false`);
    }
    assertAllFalse(item, `${label}.${key}`);
  }
};

test("review identity, source anchor, latest marker, and posture are exact", () => {
  assert.match(
    evidence.review,
    /^# Retention \/ Deletion \/ Encryption Implementation-Readiness Scope Review After PR #63/m,
  );
  assert.equal(
    metadata.reviewName,
    "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR63",
  );
  assert.equal(metadata.version, "v1");
  assert.equal(
    metadata.sourceAnchor,
    "governance/main @ 3c8ac7c74614ca17e6f101efa564a8ca317b077f",
  );
  assert.equal(
    metadata.sourceLatestMarker,
    "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR62",
  );
  assert.deepEqual(metadata.posture, [...expectedPosture]);
  assertIncludesAll(evidence.review, [
    "This is a retention/deletion/encryption implementation-readiness scope review.",
    "It is governance evidence only.",
    "Metadata is descriptive only.",
    "sourceProvenanceSeparated: true",
    "humanProfessionalReviewRequired: true",
  ], "review introduction");
});

test("metadata booleans preserve descriptive-only boundaries", () => {
  assert.equal(metadata.sourceProvenanceSeparated, true);
  assert.equal(metadata.humanProfessionalReviewRequired, true);

  for (const key of [
    "legacyEvidenceRewritten",
    "retentionExecutionCreated",
    "deletionExecutionCreated",
    "purgeErasureExecutionCreated",
    "deletionVerificationImplementationCreated",
    "encryptionAtRestImplementationCreated",
    "encryptionInTransitImplementationCreated",
    "keyManagementImplementationCreated",
    "keyRotationRevocationImplementationCreated",
    "storageLifecycleImplementationCreated",
    "lifecycleSchedulerCreated",
    "runtimeEnforcementAuthorized",
    "blockerClosureCreated",
    "externalUseAuthorized",
  ]) {
    assert.equal(metadata[key], false, key);
  }
});

test("source evidence uses only fixed tracked paths and remains non-operational", () => {
  const allPaths = Object.values(sourceEvidence)
    .flatMap((entry) => entry.paths || []);

  assert.equal(allPaths.length, 12);
  for (const repoPath of allPaths) {
    assert.equal(
      Object.values(paths).includes(repoPath),
      true,
      `unexpected source path ${repoPath}`,
    );
  }
  for (const entry of Object.values(sourceEvidence)) {
    assert.equal(entry.implementation, false);
    assert.equal(entry.enforcement, false);
    assert.equal(entry.approval, false);
    assert.equal(entry.closure, false);
  }
});

test("accepted provenance is exact and structurally separate from source evidence", () => {
  assert.deepEqual(provenance, expectedProvenance);
  assert.notDeepEqual(provenance, sourceEvidence);

  assertIncludesAll(evidence.auditRegistry, [
    "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59",
    "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59_ALIGNMENT_PROOF",
  ], "audit registry provenance");
  assertIncludesAll(evidence.rdeGap, [
    "RETENTION_IMPLEMENTATION_NOT_CREATED",
    "ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
    "KEY_MANAGEMENT_IMPLEMENTATION_NOT_CREATED",
  ], "lifecycle gap source");
});

test("existing evidence relationships stay context/scaffold only", () => {
  for (const [name, relationship] of Object.entries(relationships)) {
    assert.equal(relationship.implementation, false, name);
    assert.equal(relationship.enforcement, false, name);
    assert.equal(relationship.closure, false, name);
  }
  assert.equal(
    relationships.audit_access_log_implementation_readiness_scope_review.currentEvidenceLevel,
    "SCOPE_REVIEW_ONLY",
  );
  assert.equal(
    relationships.retention_deletion_encryption_storage_dependency_registry.currentEvidenceLevel,
    "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
  );
});

test("row schema and allowed labels are exact", () => {
  assert.deepEqual(rowSchema.requiredFields, [...expectedRowFields]);
  assert.deepEqual(rowSchema.allowedEvidenceLabels, [
    ...expectedAllowedEvidenceLabels,
  ]);
});

test("canonical matrix has exact 17 rows, review areas, order, and field shape", () => {
  assert.equal(rows.length, 17);
  assert.deepEqual(
    rows.map((row) => row.readinessId),
    Array.from({ length: 17 }, (_, index) =>
      `RDE-IRSR-${String(index + 1).padStart(3, "0")}`,
    ),
  );
  assert.deepEqual(rows.map((row) => row.reviewArea), [
    ...expectedReviewAreas,
  ]);
  assert.deepEqual(
    rows.map((row) => row.sourceOrder),
    Array.from({ length: 17 }, (_, index) => index + 1),
  );
  for (const row of rows) {
    assert.deepEqual(Object.keys(row), [...expectedRowFields], row.readinessId);
    assert.equal(Array.isArray(row.sourceEvidenceRefs), true);
    assert.equal(row.sourceEvidenceRefs.length >= 2, true, row.readinessId);
    assert.equal(Array.isArray(row.openBlockers), true, row.readinessId);
    assert.equal(
      Array.isArray(row.remainsNonAuthorizedUntilClosure),
      true,
      row.readinessId,
    );
    assert.match(row.closureCriteria, /^Future independently verified/);
  }
});

test("each matrix row is anchored to literal tracked source evidence", () => {
  for (const row of rows) {
    for (const ref of row.sourceEvidenceRefs) {
      const sourceText = pathEvidenceByRepoPath[ref.path];
      assert.equal(typeof sourceText, "string", `${row.readinessId} ${ref.path}`);
      assert.match(
        sourceText,
        new RegExp(escapeRegExp(ref.id)),
        `${row.readinessId} missing ${ref.id}`,
      );
    }
  }
});

test("matrix covers RDE action, dependency, and runtime blocker source surfaces", () => {
  assertIncludesAll(evidence.rdeStorage, [
    "RDE-ACTION-001_RETENTION_CLASSIFY",
    "RDE-ACTION-002_RETENTION_APPLY",
    "RDE-ACTION-006_DELETION_EXECUTE",
    "RDE-ACTION-007_DELETION_VERIFY",
    "RDE-ACTION-013_ENCRYPTION_APPLY",
    "RDE-ACTION-014_KEY_ROTATE",
    "RDE-ACTION-015_KEY_REVOKE",
    "RDE-DEP-007_FUTURE_DATABASE_LIFECYCLE",
    "RDE-DEP-010_FUTURE_AUDIT_LOG_STORAGE_LIFECYCLE",
    "RDE-DEP-012_PROVIDER_STORAGE_LIFECYCLE",
    "RDE-DEP-015_RAW_PRIVATE_SOURCE_LIFECYCLE",
  ], "RDE storage source");
  assertIncludesAll(evidence.rdeRuntime, [
    "RDE-RUNTIME-BLOCKER-001",
    "RDE-RUNTIME-BLOCKER-014",
    "NOT_RUNTIME_GATE_IMPLEMENTATION",
    "NOT_VALIDATOR_DISPATCH",
    "NOT_RUNTIME_REGISTRY_LOOKUP",
    "AAL-RUNTIME-BLOCKER-012_RETENTION_DELETION_OPERATION_EVENT",
  ], "RDE runtime source");
});

test("review preserves audit/access-log and admin/support dependencies after PR63", () => {
  assertIncludesAll(evidence.auditReview, [
    "retention/deletion operation event",
    "admin/support access attempt event",
    "human/professional review access event",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "EVENT_EMITTER_NOT_CREATED",
    "LOG_SCHEMA_NOT_CREATED",
    "LOG_STORAGE_NOT_CREATED",
  ], "audit review source");
  assertIncludesAll(evidence.auditRegistry, [
    "AAL-IRSR-012",
    "retention/deletion operation event",
    "admin/support access attempt event",
    "human/professional review access event",
  ], "audit registry source");
  assertIncludesAll(evidence.auditRegistryAlignment, [
    "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_SCAFFOLD_AFTER_PR61",
    "ALIGNMENT_PROOF_ONLY",
  ], "audit registry alignment source");
});

test("gap summary is exact and remains not authorized", () => {
  assert.equal(gapSummary.rowCount, 17);
  assert.deepEqual(gapSummary.reviewAreas, [...expectedReviewAreas]);
  assert.equal(gapSummary.currentStatus, "NOT_AUTHORIZED");
  assertIncludesAll(gapSummary.openGapGroups.join("\n"), [
    "retention/deletion/purge/erasure execution",
    "deletion and provider/recipient verification",
    "encryption at rest and encryption in transit",
    "RBAC/access-control and admin/support lifecycle operation authorization",
    "audit/access-log event, schema, storage, viewer, and lifecycle policy",
    "raw/private/source material routing and high-risk material handling",
    "third-party/provider and recipient downstream lifecycle posture",
    "human/professional review and separate sign-off/certification gates",
  ], "gap summary");
});

test("explicit non-authorizations are all false", () => {
  assertAllFalse(nonAuthorizations, "nonAuthorizations");
  assert.deepEqual(Object.keys(nonAuthorizations), [
    "implementation",
    "retentionImplementation",
    "deletionImplementation",
    "purgeImplementation",
    "erasureImplementation",
    "deletionVerification",
    "encryptionAtRestImplementation",
    "encryptionInTransitImplementation",
    "keyManagementImplementation",
    "keyRotationRevocationImplementation",
    "storageDatabaseObjectStorageImplementation",
    "lifecycleExecution",
    "providerRetentionDeletionPostureImplementation",
    "providerLifecycleBehavior",
    "auditAccessLogImplementation",
    "auditLogging",
    "accessLogging",
    "eventEmitters",
    "eventTaxonomyRuntimeCode",
    "logSchema",
    "logStorage",
    "rbacAccessControl",
    "adminSupportRuntimeAccess",
    "runtimeGateImplementation",
    "runtimeEnforcement",
    "schemaEnforcement",
    "workflowEnforcement",
    "validatorDispatch",
    "runtimeRegistryLookup",
    "thirdPartyRouting",
    "providerRouting",
    "rawMaterialRouting",
    "sourcePackageInspection",
    "pdfImageScreenshotMetadataAcquisition",
    "releaseApproval",
    "externalUseAuthorization",
    "productCandidateSelection",
    "runtimeCertification",
    "technicalSignOff",
    "securityFindings",
    "vulnerabilityFindings",
    "severityAssignment",
    "remediationRecommendation",
    "remediationImplementation",
    "legalClinicalEvidentiaryCaseTruthConclusions",
    "blockerClosure",
  ]);
});

test("text avoids positive implementation, approval, and closure booleans", () => {
  assert.doesNotMatch(
    evidence.review,
    /\b(implemented|authorized|approved|enabled|enforcementActive|blockerClosed|accessGranted|routeAuthorized|retentionExecuted|deletionExecuted|purgeExecuted|erasureExecuted|encryptionActive|keyManagementActive|releaseReady|externalUseReady)\s*:\s*true\b/,
  );
  assert.doesNotMatch(
    evidence.review,
    new RegExp(
      [
        "can" + "Access",
        "permission" + "Granted",
        "runtime" + "Enforced",
        "technical" + "SignoffCreated\\s*:\\s*true",
        "runtime" + "CertificationCreated\\s*:\\s*true",
        "external" + "UseApproved",
        "product" + "CandidateSelected",
        "security" + "FindingCreated\\s*:\\s*true",
        "severity" + "Assigned\\s*:\\s*true",
        "remediation" + "Recommended\\s*:\\s*true",
      ].join("|"),
    ),
  );
});

test("review does not copy raw/private/source material or local logs", () => {
  assertIncludesAll(evidence.wikiIndex, [
    "Live git state, tracked",
    "non-repo files are advisory only",
  ], "wiki index");
  assertIncludesAll(evidence.wikiLog, [
    "Chat is advisory only and is not a source of truth.",
  ], "wiki log");
  assert.doesNotMatch(
    evidence.review,
    new RegExp(
      [
        "synthetic " + "raw text",
        "synthetic " + "private fact",
        "example" + "\\.invalid",
        "synthetic" + "-token",
        "synthetic" + "-secret",
      ].join("|"),
      "i",
    ),
  );
  assert.doesNotMatch(
    evidence.review,
    new RegExp(
      [
        "local log " + "body",
        "CI log " + "body",
        "provider payload " + "body",
        "PDF " + "body",
        "image " + "body",
        "screenshot " + "body",
        "metadata " + "body",
      ].join("|"),
      "i",
    ),
  );
});
