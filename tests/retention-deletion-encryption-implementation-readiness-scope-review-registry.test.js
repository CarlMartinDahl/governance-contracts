"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const directRegistry = require("../packages/governance/src/retention-deletion-encryption-implementation-readiness-scope-review-registry.js");
const packageIndex = require("../packages/governance/src/index.js");

const repoRoot = path.resolve(__dirname, "..");

const fixedPaths = Object.freeze({
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
  pr64Document:
    "docs/DOMAIN_CONTRACTS_RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR63_v1.md",
  pr64FocusedProof:
    "tests/domain-retention-deletion-encryption-implementation-readiness-scope-review-after-pr63.test.js",
  pr65AlignmentProof:
    "tests/domain-retention-deletion-encryption-implementation-readiness-scope-review-after-pr63-alignment.test.js",
  lifecycleGap:
    "packages/governance/src/retention-deletion-encryption-gap-review.js",
  dataHandling: "packages/governance/src/data-handling-control-plane.js",
  runtimeBlocker:
    "packages/governance/src/retention-deletion-encryption-runtime-readiness-blocker-status-registry.js",
  storageDependency:
    "packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js",
  auditRegistry:
    "packages/governance/src/audit-access-log-implementation-readiness-scope-review-registry.js",
  auditRegistryTest:
    "tests/audit-access-log-implementation-readiness-scope-review-registry.test.js",
  packageIndex: "packages/governance/src/index.js",
});

const readFixed = (repoPath) =>
  fs.readFileSync(path.join(repoRoot, repoPath), "utf8");

const evidence = Object.freeze(
  Object.fromEntries(
    Object.entries(fixedPaths).map(([key, repoPath]) => [key, readFixed(repoPath)]),
  ),
);

const parseJsonBlock = (source, blockName) => {
  const marker = "\x60" + blockName + "\x60";
  const markerIndex = source.indexOf(marker);
  assert.notEqual(markerIndex, -1, "missing marker " + blockName);
  const fenceStart = source.indexOf("\x60\x60\x60json", markerIndex);
  assert.notEqual(fenceStart, -1, "missing JSON fence " + blockName);
  const jsonStart = source.indexOf("\n", fenceStart) + 1;
  const fenceEnd = source.indexOf("\x60\x60\x60", jsonStart);
  assert.notEqual(fenceEnd, -1, "missing fence end " + blockName);
  return JSON.parse(source.slice(jsonStart, fenceEnd).trim());
};

const sourceMetadata = parseJsonBlock(
  evidence.pr64Document,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA",
);
const sourceEvidence = parseJsonBlock(
  evidence.pr64Document,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE",
);
const sourceAcceptedProvenance = parseJsonBlock(
  evidence.pr64Document,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_PROVENANCE",
);
const sourceRelationships = parseJsonBlock(
  evidence.pr64Document,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_EXISTING_EVIDENCE_RELATIONSHIPS",
);
const sourceRowSchema = parseJsonBlock(
  evidence.pr64Document,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_ROW_SCHEMA",
);
const sourceRows = parseJsonBlock(
  evidence.pr64Document,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_REVIEW_MATRIX",
);
const sourceGapSummary = parseJsonBlock(
  evidence.pr64Document,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_GAP_SUMMARY",
);
const sourceNonAuthorizations = parseJsonBlock(
  evidence.pr64Document,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_EXPLICIT_NON_AUTHORIZATIONS",
);

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
  "remainsNonAuthorizedUntilClosure"
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
  "human/professional review"
]);

const exportedHelperNames = Object.keys(directRegistry).filter(
  (name) => typeof directRegistry[name] === "function",
);

const assertDeepFrozen = (value, label) => {
  if (!value || typeof value !== "object") {
    return;
  }
  assert.equal(Object.isFrozen(value), true, label);
  for (const [key, nested] of Object.entries(value)) {
    assertDeepFrozen(nested, label + "." + key);
  }
};

const assertAllFalse = (value, label) => {
  for (const [key, nested] of Object.entries(value)) {
    if (typeof nested === "boolean") {
      assert.equal(nested, false, label + "." + key);
    } else if (nested && typeof nested === "object") {
      assertAllFalse(nested, label + "." + key);
    }
  }
};

test("registry identity, version, posture, and package-index exports are exact", () => {
  assert.equal(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_NAME,
    "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY",
  );
  assert.equal(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_VERSION,
    "v1",
  );
  assert.equal(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_POSTURE.PROVE_ONLY,
    "PROVE_ONLY",
  );
  assert.equal(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_POSTURE.STATIC_GOVERNANCE_REGISTRY_SCAFFOLD,
    "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
  );
  assert.equal(
    packageIndex.listRetentionDeletionEncryptionImplementationReadinessScopeReviewRows,
    directRegistry.listRetentionDeletionEncryptionImplementationReadinessScopeReviewRows,
  );
  assert.equal(
    packageIndex.getRetentionDeletionEncryptionImplementationReadinessScopeReviewRegistrySummary,
    directRegistry.getRetentionDeletionEncryptionImplementationReadinessScopeReviewRegistrySummary,
  );
});

test("PR64, PR65, and PR53 postures remain structurally separate", () => {
  assert.deepEqual(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_POSTURE.pr64,
    ["DOCS_ONLY", "PROVE_ONLY", "SCOPE_REVIEW_ONLY"],
  );
  assert.deepEqual(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_POSTURE.pr65,
    ["TEST_ONLY", "PROVE_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
  assert.deepEqual(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_POSTURE.pr53LiteralMarkers,
    ["PROVE_ONLY", "SCOPE_REVIEW_ONLY"],
  );
  assert.deepEqual(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_POSTURE.pr53AbsentLiteralMarkers,
    ["TEST_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
  assert.match(evidence.pr65AlignmentProof, /ALIGNMENT_PROOF_ONLY/);
  assert.doesNotMatch(evidence.pr64Document, /This PR is:[sS]*?ALIGNMENT_PROOF_ONLY/);
});

test("metadata and provenance mirror tracked PR64 evidence without rewriting source anchors", () => {
  assert.deepEqual(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA,
    sourceMetadata,
  );
  assert.deepEqual(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE,
    sourceEvidence,
  );
  assert.deepEqual(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_PROVENANCE,
    sourceAcceptedProvenance,
  );
  assert.deepEqual(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_EXISTING_EVIDENCE_RELATIONSHIPS,
    sourceRelationships,
  );
  assert.equal(sourceMetadata.sourceProvenanceSeparated, true);
  assert.equal(sourceMetadata.legacyEvidenceRewritten, false);
  assert.equal(sourceMetadata.humanProfessionalReviewRequired, true);
  assert.equal(
    sourceMetadata.sourceAnchor,
    "governance/main @ 3c8ac7c74614ca17e6f101efa564a8ca317b077f",
  );
  assert.equal(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_PR64_PR65_PROVENANCE.pr66BranchBase,
    "governance/main @ b61e204cd87d419e64c905e9358a06b9f4eada55",
  );
});

test("only descriptive metadata booleans are true", () => {
  const metadata =
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA;
  const trueKeys = Object.entries(metadata)
    .filter(([, value]) => value === true)
    .map(([key]) => key)
    .sort();
  assert.deepEqual(trueKeys, [
    "humanProfessionalReviewRequired",
    "sourceProvenanceSeparated",
  ]);
  assertAllFalse(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_EXPLICIT_NON_AUTHORIZATIONS,
    "explicitNonAuthorizations",
  );
});

test("registry rows deep-equal the actual PR64 matrix rows", () => {
  const registryRows =
    directRegistry.listRetentionDeletionEncryptionImplementationReadinessScopeReviewRows();
  assert.deepEqual(registryRows, sourceRows);
  assert.equal(registryRows.length, 17);
  assert.deepEqual(
    registryRows.map((row) => row.readinessId),
    Array.from({ length: 17 }, (_, index) =>
      "RDE-IRSR-" + String(index + 1).padStart(3, "0"),
    ),
  );
  assert.equal(new Set(registryRows.map((row) => row.readinessId)).size, 17);
  assert.deepEqual(registryRows.map((row) => row.sourceOrder), [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ]);
});

test("row schema, field order, review areas, and source mappings remain exact", () => {
  const registryRows =
    directRegistry.listRetentionDeletionEncryptionImplementationReadinessScopeReviewRows();
  assert.deepEqual(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_ROW_SCHEMA,
    sourceRowSchema,
  );
  assert.deepEqual(sourceRowSchema.requiredFields, [...expectedRowFields]);
  assert.deepEqual(registryRows.map((row) => row.reviewArea), [
    ...expectedReviewAreas,
  ]);
  for (const [index, row] of registryRows.entries()) {
    assert.deepEqual(Object.keys(row), [...expectedRowFields], row.readinessId);
    assert.notEqual(row.readinessId, row.sourceEvidenceRefs[0].id);
    assert.equal(row.sourceOrder, index + 1);
    for (const ref of row.sourceEvidenceRefs) {
      assert.equal(typeof ref.path, "string");
      assert.equal(typeof ref.id, "string");
      assert.doesNotMatch(ref.id, /^RDE-IRSR-/);
    }
  }
});

test("blockers, future evidence, closure, and non-authorization remain open/future-only", () => {
  for (const row of directRegistry.listRetentionDeletionEncryptionImplementationReadinessScopeReviewRows()) {
    assert.equal(row.openBlockers.length > 0, true, row.readinessId);
    assert.match(row.requiredFutureImplementationEvidence, /^Future /);
    assert.match(row.requiredFutureTestEvidence, /^Future /);
    assert.match(row.closureCriteria, /^Future independently verified/);
    assert.equal(row.remainsNonAuthorizedUntilClosure.length > 0, true, row.readinessId);
    assert.doesNotMatch(row.implementationGap, /\bclosed\b|\bcompleted\b/i);
  }
});

test("summary is descriptive and mirrors counts, metadata, and source structures", () => {
  const summary =
    directRegistry.getRetentionDeletionEncryptionImplementationReadinessScopeReviewRegistrySummary();
  assert.equal(summary.registryVersion, "v1");
  assert.equal(summary.readinessRowCount, 17);
  assert.equal(summary.requiredFieldCount, 12);
  assert.equal(summary.sourceReferenceCount, 51);
  assert.equal(
    summary.openBlockerCount,
    sourceRows.reduce((total, row) => total + row.openBlockers.length, 0),
  );
  assert.deepEqual(summary.readinessIds, sourceRows.map((row) => row.readinessId));
  assert.deepEqual(summary.reviewAreas, [...expectedReviewAreas]);
  assert.deepEqual(summary.descriptiveMetadata, sourceMetadata);
  assert.deepEqual(summary.sourceEvidence, sourceEvidence);
  assert.deepEqual(summary.acceptedProvenance, sourceAcceptedProvenance);
  assert.deepEqual(summary.rowSchema, sourceRowSchema);
  assert.deepEqual(summary.gapSummary, sourceGapSummary);
  assert.deepEqual(summary.explicitNonAuthorizations, sourceNonAuthorizations);
  for (const key of [
    "implementationCreated",
    "runtimeBehaviorChanged",
    "lifecycleExecutionCreated",
    "retentionExecutionCreated",
    "deletionExecutionCreated",
    "purgeErasureExecutionCreated",
    "deletionVerificationImplementationCreated",
    "encryptionImplementationCreated",
    "keyManagementImplementationCreated",
    "storageImplementationCreated",
    "executableLookupCreated",
    "authorizationDecisionCreated",
    "blockerClosureCreated",
    "releaseExternalUseProductSignoffCertificationCreated",
  ]) {
    assert.equal(summary[key], false, key);
  }
});

test("public helper surface is exactly two zero-argument functions", () => {
  assert.deepEqual(exportedHelperNames.sort(), [
    "getRetentionDeletionEncryptionImplementationReadinessScopeReviewRegistrySummary",
    "listRetentionDeletionEncryptionImplementationReadinessScopeReviewRows",
  ]);
  assert.equal(
    directRegistry.listRetentionDeletionEncryptionImplementationReadinessScopeReviewRows.length,
    0,
  );
  assert.equal(
    directRegistry.getRetentionDeletionEncryptionImplementationReadinessScopeReviewRegistrySummary.length,
    0,
  );
  for (const forbidden of [
    "findById",
    "getById",
    "lookup",
    "resolve",
    "dispatch",
    "route",
    "authorize",
    "grant",
    "permit",
    "enforce",
    "approve",
    "emit",
    "writeLog",
    "persist",
    "closeBlocker",
  ]) {
    assert.equal(Object.prototype.hasOwnProperty.call(directRegistry, forbidden), false);
  }
});

test("canonical structures and helper outputs are deeply frozen and isolated", () => {
  assertDeepFrozen(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_REVIEW_MATRIX,
    "canonical rows",
  );
  assertDeepFrozen(
    directRegistry.RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA,
    "canonical metadata",
  );
  const firstRows =
    directRegistry.listRetentionDeletionEncryptionImplementationReadinessScopeReviewRows();
  const secondRows =
    directRegistry.listRetentionDeletionEncryptionImplementationReadinessScopeReviewRows();
  assert.notEqual(firstRows, secondRows);
  assert.notEqual(firstRows[0], secondRows[0]);
  assertDeepFrozen(firstRows, "list output");
  const firstSummary =
    directRegistry.getRetentionDeletionEncryptionImplementationReadinessScopeReviewRegistrySummary();
  const secondSummary =
    directRegistry.getRetentionDeletionEncryptionImplementationReadinessScopeReviewRegistrySummary();
  assert.notEqual(firstSummary, secondSummary);
  assert.notEqual(firstSummary.descriptiveMetadata, secondSummary.descriptiveMetadata);
  assertDeepFrozen(firstSummary, "summary output");
});

test("explicit non-authorizations and no-private-material boundaries are preserved", () => {
  assert.match(evidence.wikiIndex, /Live git state, tracked/);
  assert.match(evidence.wikiLog, /Chat is advisory only and is not a source of truth./);
  assert.doesNotMatch(evidence.pr64Document, /synthetic-token|synthetic-secret|example.invalid/i);
  const prohibitedBodyTerms = [
    ["local", "log"],
    ["CI", "log"],
    ["provider", "payload"],
  ].map((termParts) => new RegExp(`${termParts.join(" ")} body`, "i"));
  for (const prohibitedBodyTerm of prohibitedBodyTerms) {
    assert.doesNotMatch(evidence.pr64Document, prohibitedBodyTerm);
  }
  assert.match(evidence.pr64Document, /This document creates no retention, deletion, purge, erasure, encryption,/);
  assert.match(evidence.pr64Document, /sourcePackageInspection/);
  assert.match(evidence.pr64Document, /pdfImageScreenshotMetadataAcquisition/);
});

test("static registry files contain no positive operational claims", () => {
  const registrySource = readFixed(
    "packages/governance/src/retention-deletion-encryption-implementation-readiness-scope-review-registry.js",
  );
  assert.doesNotMatch(
    registrySource,
    new RegExp(
      "\\b(implemented|authorized|approved|enabled|enforcementActive|blockerClosed|accessGranted|routeAuthorized|retentionExecuted|deletionExecuted|purgeExecuted|erasureExecuted|encryptionActive|keyManagementActive|releaseReady|externalUseReady)\\s*:\\s*true\\b",
    ),
  );
  const forbiddenOperationalHelperName = new RegExp(
    "\\b(find.*ById|get.*ById|lookup|resolve|dispatch|route|authorize|grant|permit|enforce|approve|emit|writeLog|persist|executeRetention|executeDeletion|executePurge|executeErasure|encrypt|decrypt|rotateKey|revokeKey|closeBlocker|calculateReadiness|calculateRisk|calculateSeverity)\\b",
  );
  for (const exportedName of Object.keys(directRegistry)) {
    assert.doesNotMatch(exportedName, forbiddenOperationalHelperName);
  }
});
