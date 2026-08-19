const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const {
  encryptionKeyManagementBlockerRegistry,
  getEncryptionKeyManagementBlockerEntry,
  getLifecycleGapStatusEntry,
  getProviderLifecycleGapEntry,
  getRetentionDeletionPurgeErasureBlockerEntry,
  lifecycleGapStatusRegistry,
  noDeletionProof,
  noEncryptionImplementation,
  noProviderDeletionVerification,
  noPurgeProof,
  noRetentionCurrentness,
  providerLifecycleGapRegistry,
  retentionDeletionEncryptionGapReviewInvariant,
  retentionDeletionPurgeErasureBlockerRegistry,
} = require("../packages/governance/src/retention-deletion-encryption-gap-review.js");

const {
  dataHandlingBlockerRegistry,
  dataHandlingNonAuthorizationInvariant,
  decideMaterialRoute,
  getGlobalNonAuthorizationInvariant,
  getRouteDecisionEntry,
  routeDecisionRegistry,
} = require("../packages/governance/src/data-handling-control-plane.js");

const {
  getRetentionDeletionEncryptionRuntimeReadinessBlockerRow,
  isDeletionImplemented,
  isEncryptionImplemented,
  isKeyManagementImplemented,
  isProviderRetentionDeletionImplemented,
  isPurgeErasureImplemented,
  isRetentionImplemented,
  isSecurityFindingCreated,
  listRetentionDeletionEncryptionRuntimeReadinessBlockerRows,
} = require("../packages/governance/src/retention-deletion-encryption-runtime-readiness-blocker-status-registry.js");

const {
  getLifecycleActionCandidate,
  getRdeStorageDependency,
  hasLifecycleActionCandidate,
  hasRdeStorageDependency,
  isLifecycleActionAuthorized,
  isLifecycleImplementationCreated,
  listLifecycleActionCandidates,
  listRdeStorageDependencies,
} = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");

const {
  AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ROWS,
  getAuditAccessLogImplementationReadinessScopeReviewRegistrySummary,
} = require("../packages/governance/src/audit-access-log-implementation-readiness-scope-review-registry.js");

const repoRoot = path.resolve(__dirname, "..");

const authorizedPaths = Object.freeze({
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
  review:
    "docs/DOMAIN_CONTRACTS_RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR63_v1.md",
  focusedProof:
    "tests/domain-retention-deletion-encryption-implementation-readiness-scope-review-after-pr63.test.js",
  lifecycleGap:
    "packages/governance/src/retention-deletion-encryption-gap-review.js",
  controlPlane: "packages/governance/src/data-handling-control-plane.js",
  runtimeBlockerRegistry:
    "packages/governance/src/retention-deletion-encryption-runtime-readiness-blocker-status-registry.js",
  storageDependencyRegistry:
    "packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js",
  aalScopeReview:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59_v1.md",
  aalRegistry:
    "packages/governance/src/audit-access-log-implementation-readiness-scope-review-registry.js",
  aalRegistryAlignment:
    "tests/audit-access-log-implementation-readiness-scope-review-registry-alignment.test.js",
});

const ownPosture = Object.freeze([
  "TEST_ONLY",
  "PROVE_ONLY",
  "ALIGNMENT_PROOF_ONLY",
]);

const pr64Posture = Object.freeze([
  "DOCS_ONLY",
  "PROVE_ONLY",
  "SCOPE_REVIEW_ONLY",
]);

const allowedEvidenceLabels = Object.freeze([
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

const forbiddenCurrentStateLabels = Object.freeze([
  "IMPLEMENTED",
  "FULLY_IMPLEMENTED",
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

const expectedFields = Object.freeze([
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

const acceptedMergeProvenance = Object.freeze({
  pr53: Object.freeze({
    marker:
      "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
    commit: "03516fa6deeea91a7dccbcb35c17907e3e113da8",
  }),
  pr60: Object.freeze({
    marker:
      "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59",
    commit: "a1cd1c6ab7aebc5eae7034f71e58053ab9e41bda",
  }),
  pr61: Object.freeze({
    marker:
      "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59_ALIGNMENT_PROOF",
    commit: "f25196c14cff4b3d7005713a71fb62b991caab96",
  }),
  pr62: Object.freeze({
    marker:
      "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_SCAFFOLD_AFTER_PR61",
    commit: "e7c4fb2917d188b7d49d9ea1f1bbff70c115dea6",
  }),
  pr63: Object.freeze({
    marker:
      "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR62",
    commit: "3c8ac7c74614ca17e6f101efa564a8ca317b077f",
  }),
  pr64: Object.freeze({
    marker:
      "MERGED_AS_RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR63",
    mergeCommit: "f20ebdbaac7ba11df8af1c3de25e59bbcbfdfd98",
    preMergeHead: "23db7a249d0f04e553f3164dbd09000ccbf86542",
    parents: Object.freeze([
      "3c8ac7c74614ca17e6f101efa564a8ca317b077f",
      "23db7a249d0f04e553f3164dbd09000ccbf86542",
    ]),
  }),
});

const readText = (repoPath) =>
  fs.readFileSync(path.join(repoRoot, repoPath), "utf8");

const sourceTexts = Object.freeze(
  Object.fromEntries(
    Object.entries(authorizedPaths).map(([key, repoPath]) => [
      key,
      readText(repoPath),
    ]),
  ),
);

const reviewText = sourceTexts.review;
const focusedProofText = sourceTexts.focusedProof;
const lifecycleSourceText = sourceTexts.lifecycleGap;
const runtimeBlockerSourceText = sourceTexts.runtimeBlockerRegistry;
const storageSourceText = sourceTexts.storageDependencyRegistry;
const controlPlaneSourceText = sourceTexts.controlPlane;
const aalScopeReviewText = sourceTexts.aalScopeReview;
const aalRegistrySourceText = sourceTexts.aalRegistry;

const escapeRegExp = (value) =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const assertIncludesAll = (source, values, label) => {
  for (const value of values) {
    assert.match(source, new RegExp(escapeRegExp(value)), `${label}: ${value}`);
  }
};

const parseJsonBlock = (source, blockName) => {
  const pattern = new RegExp(
    "`" + escapeRegExp(blockName) + "`\\n\\n```json\\n([\\s\\S]*?)\\n```",
  );
  const match = source.match(pattern);
  assert.ok(match, `missing JSON block ${blockName}`);
  return JSON.parse(match[1]);
};

const metadata = parseJsonBlock(
  reviewText,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA",
);

const sourceEvidence = parseJsonBlock(
  reviewText,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_SOURCE_EVIDENCE",
);

const acceptedProvenanceFromDocument = parseJsonBlock(
  reviewText,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ACCEPTED_PROVENANCE",
);

const existingRelationships = parseJsonBlock(
  reviewText,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_EXISTING_EVIDENCE_RELATIONSHIPS",
);

const rowSchema = parseJsonBlock(
  reviewText,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_ROW_SCHEMA",
);

const rows = parseJsonBlock(
  reviewText,
  "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_REVIEW_MATRIX",
);

const allowedSourcePaths = new Set([
  authorizedPaths.lifecycleGap,
  authorizedPaths.runtimeBlockerRegistry,
  authorizedPaths.storageDependencyRegistry,
  authorizedPaths.aalScopeReview,
  authorizedPaths.aalRegistry,
  authorizedPaths.controlPlane,
]);

const sourceTextByPath = Object.freeze({
  [authorizedPaths.lifecycleGap]: lifecycleSourceText,
  [authorizedPaths.runtimeBlockerRegistry]: runtimeBlockerSourceText,
  [authorizedPaths.storageDependencyRegistry]: storageSourceText,
  [authorizedPaths.aalScopeReview]: aalScopeReviewText,
  [authorizedPaths.aalRegistry]: aalRegistrySourceText,
  [authorizedPaths.controlPlane]: controlPlaneSourceText,
});

const expectedReviewIds = Object.freeze(
  Array.from({ length: 17 }, (_, index) =>
    `RDE-IRSR-${String(index + 1).padStart(3, "0")}`,
  ),
);

const fieldType = (value) => {
  if (Array.isArray(value)) {
    return "array";
  }
  return typeof value;
};

const textIncludes = (repoPath, value) =>
  sourceTextByPath[repoPath] && sourceTextByPath[repoPath].includes(value);

const flattenRuntimeRowValues = (row) =>
  [
    row.id,
    row.source_blocker_id,
    row.sourceBlockerId,
    row.family,
    row.primary_blocker,
    row.current_authorization_status,
    row.future_boundary_posture,
    ...(row.implementation_gap || []),
    ...(row.related_role_permission_gap_ids || []),
    ...(row.related_admin_support_gap_ids || []),
    ...(row.related_audit_access_log_runtime_blocker_ids || []),
    ...(row.related_third_party_runtime_blocker_ids || []),
    ...(row.related_rde_storage_dependency_ids || []),
    ...(row.related_raw_material_routing_control_ids || []),
    ...(row.related_runtime_gate_candidate_ids || []),
    ...(row.related_aal_event_candidate_ids || []),
    ...(row.non_authorized_until_closure || []),
    ...Object.keys(row.non_authorizations || {}),
  ].filter(Boolean);

const runtimeRows = listRetentionDeletionEncryptionRuntimeReadinessBlockerRows();
const storageRows = [
  ...listLifecycleActionCandidates(),
  ...listRdeStorageDependencies(),
];
const aalRows = AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ROWS;

const sourceRefIsVerified = (ref) => {
  assert.ok(allowedSourcePaths.has(ref.path), `unexpected source path ${ref.path}`);
  assert.equal(typeof sourceTextByPath[ref.path], "string", ref.path);
  assert.match(sourceTextByPath[ref.path], new RegExp(escapeRegExp(ref.id)));

  if (ref.path === authorizedPaths.lifecycleGap) {
    const directEntry =
      getLifecycleGapStatusEntry(ref.id) ||
      getRetentionDeletionPurgeErasureBlockerEntry(ref.id) ||
      getEncryptionKeyManagementBlockerEntry(ref.id) ||
      getProviderLifecycleGapEntry(ref.id);
    assert.ok(directEntry, `missing lifecycle gap entry ${ref.id}`);
    assert.ok(
      directEntry.description || directEntry.provider_lifecycle_gap,
      `missing lifecycle meaning ${ref.id}`,
    );
    return true;
  }

  if (ref.path === authorizedPaths.runtimeBlockerRegistry) {
    const matchingRuntimeRows = runtimeRows.filter((row) =>
      flattenRuntimeRowValues(row).includes(ref.id),
    );
    assert.ok(
      matchingRuntimeRows.length > 0 || textIncludes(ref.path, ref.id),
      `missing runtime blocker relationship ${ref.id}`,
    );
    for (const row of matchingRuntimeRows) {
      assert.equal(row.non_authorizations.authorized, false, row.id);
      assert.equal(row.current_authorization_status, "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT");
    }
    return true;
  }

  if (ref.path === authorizedPaths.storageDependencyRegistry) {
    const action = getLifecycleActionCandidate(ref.id);
    const dependency = getRdeStorageDependency(ref.id);
    const storageTextHit = textIncludes(ref.path, ref.id);
    assert.ok(action || dependency || storageTextHit, `missing storage source ${ref.id}`);
    if (action) {
      assert.equal(isLifecycleActionAuthorized(ref.id), false, ref.id);
      assert.equal(action.non_authorizations.authorized, false, ref.id);
    }
    if (dependency) {
      assert.equal(dependency.non_authorizations.authorized, false, ref.id);
    }
    return true;
  }

  if (ref.path === authorizedPaths.aalScopeReview) {
    assert.match(aalScopeReviewText, new RegExp(escapeRegExp(ref.id)), ref.id);
    assert.match(aalScopeReviewText, /future independently verified/);
    return true;
  }

  if (ref.path === authorizedPaths.aalRegistry) {
    assert.ok(
      aalRows.some((row) => row.readiness_id === ref.id),
      `missing AAL readiness row ${ref.id}`,
    );
    assert.equal(
      getAuditAccessLogImplementationReadinessScopeReviewRegistrySummary()
        .sourceProvenanceSeparated,
      true,
    );
    return true;
  }

  if (ref.path === authorizedPaths.controlPlane) {
    const route =
      getRouteDecisionEntry(ref.id) ||
      dataHandlingBlockerRegistry[ref.id] ||
      routeDecisionRegistry[ref.id];
    assert.ok(route || textIncludes(ref.path, ref.id), `missing control-plane source ${ref.id}`);
    if (route && "authorized" in route) {
      assert.equal(route.authorized, false, ref.id);
    }
    return true;
  }

  return false;
};

test("own alignment-proof posture is narrow and not projected backward", () => {
  assert.deepEqual(ownPosture, ["TEST_ONLY", "PROVE_ONLY", "ALIGNMENT_PROOF_ONLY"]);
  assert.deepEqual(metadata.posture, [...pr64Posture]);
  assert.equal(metadata.posture.includes("TEST_ONLY"), false);
  assert.equal(metadata.posture.includes("ALIGNMENT_PROOF_ONLY"), false);
  assert.match(focusedProofText, /DOCS_ONLY/);
  assert.match(focusedProofText, /SCOPE_REVIEW_ONLY/);
  assert.doesNotMatch(
    reviewText,
    /This PR is:\s+[\s\S]*?TEST_ONLY[\s\S]*?ALIGNMENT_PROOF_ONLY/,
  );
});

test("PR64 identity, title, source anchor, and posture are exact", () => {
  assert.match(
    reviewText,
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
  assert.deepEqual(metadata.posture, [...pr64Posture]);
  assertIncludesAll(
    reviewText,
    [
      "This is a retention/deletion/encryption implementation-readiness scope review.",
      "This document creates no retention, deletion, purge, erasure, encryption,",
      "human/professional-review evidence",
    ],
    "PR64 identity and boundary wording",
  );
});

test("descriptive metadata preserves non-operational boundaries", () => {
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

  assertIncludesAll(
    reviewText,
    [
      "Metadata is descriptive only.",
      "not a runtime, storage, deletion, crypto",
      "`humanProfessionalReviewRequired: true` means review remains required; it is not",
      "completed, granted, approved, certified, or replaced.",
    ],
    "descriptive metadata boundaries",
  );
});

test("row schema declaration is exact and every matrix row matches it", () => {
  assert.deepEqual(rowSchema.requiredFields, [...expectedFields]);
  assert.equal(rowSchema.requiredFields.length, 12);
  assert.deepEqual(rowSchema.allowedEvidenceLabels, [...allowedEvidenceLabels]);
  assert.equal(rows.length, 17);

  const expectedTypes = {
    readinessId: "string",
    reviewArea: "string",
    sourceEvidenceRefs: "array",
    sourceOrder: "number",
    currentEvidenceLevel: "string",
    currentEvidenceSummary: "string",
    implementationGap: "string",
    requiredFutureImplementationEvidence: "string",
    requiredFutureTestEvidence: "string",
    openBlockers: "array",
    closureCriteria: "string",
    remainsNonAuthorizedUntilClosure: "array",
  };

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), [...expectedFields], row.readinessId);
    for (const field of expectedFields) {
      assert.equal(fieldType(row[field]), expectedTypes[field], `${row.readinessId}.${field}`);
    }
  }
});

test("matrix identity, ordering, and review/source ID distinction are exact", () => {
  assert.deepEqual(rows.map((row) => row.readinessId), [...expectedReviewIds]);
  assert.equal(new Set(rows.map((row) => row.readinessId)).size, 17);
  assert.deepEqual(
    rows.map((row) => row.sourceOrder),
    Array.from({ length: 17 }, (_, index) => index + 1),
  );
  assert.deepEqual(rows.map((row) => row.reviewArea), [...expectedReviewAreas]);

  for (const row of rows) {
    assert.equal(row.sourceEvidenceRefs.length >= 2, true, row.readinessId);
    for (const ref of row.sourceEvidenceRefs) {
      assert.notEqual(ref.id, row.readinessId);
      assert.doesNotMatch(ref.id, /^RDE-IRSR-/);
    }
  }
});

test("every matrix source reference resolves to fixed tracked evidence", () => {
  const usedPaths = new Set();
  for (const row of rows) {
    for (const ref of row.sourceEvidenceRefs) {
      usedPaths.add(ref.path);
      assert.equal(sourceRefIsVerified(ref), true, `${row.readinessId} ${ref.id}`);
    }
  }

  assert.deepEqual(
    [...usedPaths].sort(),
    [
      authorizedPaths.aalRegistry,
      authorizedPaths.aalScopeReview,
      authorizedPaths.controlPlane,
      authorizedPaths.lifecycleGap,
      authorizedPaths.runtimeBlockerRegistry,
      authorizedPaths.storageDependencyRegistry,
    ].sort(),
  );
});

test("document source evidence and focused PR64 proof align with actual sources", () => {
  const declaredSourcePaths = Object.values(sourceEvidence).flatMap((entry) => entry.paths);
  for (const repoPath of declaredSourcePaths) {
    assert.equal(path.isAbsolute(repoPath), false, repoPath);
    assert.doesNotMatch(repoPath, /\.\./, repoPath);
  }
  for (const entry of Object.values(sourceEvidence)) {
    assert.equal(entry.implementation, false);
    assert.equal(entry.enforcement, false);
    assert.equal(entry.approval, false);
    assert.equal(entry.closure, false);
  }

  assertIncludesAll(
    focusedProofText,
    [
      "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR63",
      "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_ROW_SCHEMA",
      "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_READINESS_REVIEW_MATRIX",
      "expectedReviewAreas",
      "sourceProvenanceSeparated",
      "legacyEvidenceRewritten",
    ],
    "PR64 focused proof expectations",
  );
  assert.match(sourceTexts.wikiLog, /Chat is advisory only and is not a source of truth\./);
});

test("review areas preserve lifecycle and dependency distinctions", () => {
  const byArea = new Map(rows.map((row) => [row.reviewArea, row]));

  assert.match(byArea.get("retention policy").implementationGap, /not retention execution/i);
  assert.match(byArea.get("retention implementation").implementationGap, /No lifecycle scheduler/i);
  assert.match(byArea.get("deletion policy").implementationGap, /does not create deletion execution/i);
  assert.match(byArea.get("deletion implementation").implementationGap, /No deletion executor/i);
  assert.match(byArea.get("purge and erasure").implementationGap, /No purge, erasure/i);
  assert.match(byArea.get("deletion verification").implementationGap, /No deletion verification/i);
  assert.match(byArea.get("storage lifecycle").implementationGap, /No database\/object\/queue lifecycle executor/i);
  assert.match(byArea.get("encryption at rest").implementationGap, /No encryption-at-rest implementation/i);
  assert.match(byArea.get("encryption in transit").implementationGap, /Encryption-in-transit implementation is not evidenced/i);
  assert.match(byArea.get("key generation and custody").implementationGap, /No key generation/i);
  assert.match(byArea.get("key rotation and revocation").implementationGap, /No key rotation/i);
  assert.match(byArea.get("actor/role/permission dependency").implementationGap, /No actor, role, permission/i);
  assert.match(byArea.get("admin/support dependency").implementationGap, /No admin\/support lifecycle operation model/i);
  assert.match(byArea.get("audit/access-log dependency").implementationGap, /No event emitter, log schema/i);
  assert.match(byArea.get("raw-material-routing dependency").implementationGap, /No raw-material routing/i);
  assert.match(byArea.get("third-party/provider dependency").implementationGap, /No provider routing/i);
  assert.match(byArea.get("human/professional review").implementationGap, /No human\/professional review completion/i);

  assert.notDeepEqual(byArea.get("encryption at rest"), byArea.get("encryption in transit"));
  assert.notDeepEqual(
    byArea.get("key generation and custody"),
    byArea.get("key rotation and revocation"),
  );
  assert.notDeepEqual(byArea.get("deletion verification"), byArea.get("deletion implementation"));
  assert.notDeepEqual(byArea.get("storage lifecycle"), byArea.get("retention policy"));
});

test("lifecycle source modules keep implementation and verification gaps open", () => {
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.retention_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.deletion_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.purge_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.erasure_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.encryption_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.key_management_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.provider_deletion_verification_created, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.runtime_lifecycle_execution_created, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.technical_signoff_created, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.runtime_certification_created, false);

  assert.equal(noRetentionCurrentness().allowed, false);
  assert.equal(noDeletionProof().deletion_executed, false);
  assert.equal(noPurgeProof().purge_executed, false);
  assert.equal(noEncryptionImplementation().encryption_implemented, false);
  assert.equal(noEncryptionImplementation().key_management_implemented, false);
  assert.equal(noProviderDeletionVerification().provider_deletion_verified, false);

  assert.ok(lifecycleGapStatusRegistry.RETENTION_POLICY_TEXT_NOT_IMPLEMENTATION);
  assert.ok(retentionDeletionPurgeErasureBlockerRegistry.DELETION_IMPLEMENTATION_NOT_CREATED);
  assert.ok(encryptionKeyManagementBlockerRegistry.KEY_MANAGEMENT_IMPLEMENTATION_NOT_CREATED);
  assert.ok(providerLifecycleGapRegistry.PROVIDER_DELETION_VERIFICATION_NOT_CREATED);
});

test("runtime and storage dependency source modules preserve non-authorization", () => {
  assert.equal(isRetentionImplemented(), false);
  assert.equal(isDeletionImplemented(), false);
  assert.equal(isPurgeErasureImplemented(), false);
  assert.equal(isEncryptionImplemented(), false);
  assert.equal(isKeyManagementImplemented(), false);
  assert.equal(isProviderRetentionDeletionImplemented(), false);
  assert.equal(isSecurityFindingCreated(), false);
  assert.equal(isLifecycleImplementationCreated(), false);

  for (const row of runtimeRows) {
    assert.equal(row.non_authorizations.authorized, false, row.id);
    assert.match(row.current_authorization_status, /NOT_AUTHORIZED/);
    assert.match(row.future_boundary_posture, /future-only/);
  }

  for (const row of storageRows) {
    if (row.non_authorizations) {
      assert.equal(row.non_authorizations.authorized, false, row.id);
    }
    if (row.id.startsWith("RDE-ACTION-")) {
      assert.equal(isLifecycleActionAuthorized(row.id), false, row.id);
    }
  }

  assert.equal(hasLifecycleActionCandidate("RDE-ACTION-002_RETENTION_APPLY"), true);
  assert.equal(hasRdeStorageDependency("RDE-DEP-012_PROVIDER_STORAGE_LIFECYCLE"), true);
});

test("data-handling and audit/access-log dependencies remain context only", () => {
  const rawRoute = decideMaterialRoute({
    material_class: "RAW_PRIVATE_SOURCE_MATERIAL",
  });
  assert.equal(rawRoute.authorized, false);
  assert.equal(getRouteDecisionEntry("THIRD_PARTY_MODEL_API_ROUTE_DENIED").authorized, false);
  assert.equal(
    dataHandlingBlockerRegistry.RETENTION_DELETION_PURGE_IMPLEMENTATION_NOT_CREATED.blocker,
    "RETENTION_DELETION_PURGE_IMPLEMENTATION_NOT_CREATED",
  );
  assert.equal(
    dataHandlingBlockerRegistry.ENCRYPTION_IMPLEMENTATION_NOT_CREATED.blocker,
    "ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
  );
  assert.equal(dataHandlingNonAuthorizationInvariant.external_use_authorized, false);
  assert.equal(dataHandlingNonAuthorizationInvariant.court_use_authorized, false);
  assert.equal(getGlobalNonAuthorizationInvariant().external_use_authorized, false);
  assert.equal(getGlobalNonAuthorizationInvariant().court_use_authorized, false);

  const aalSummary =
    getAuditAccessLogImplementationReadinessScopeReviewRegistrySummary();
  assert.equal(aalSummary.readinessRowCount, 17);
  assert.equal(aalSummary.sourceProvenanceSeparated, true);
  for (const row of aalRows) {
    assert.match(row.required_emitter_evidence, /^future /);
    assert.match(row.required_schema_evidence, /^future /);
    assert.match(row.required_storage_evidence, /^future /);
    assert.match(row.blocker_status, /NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT/);
    assert.match(row.closure_criteria, /^future independently verified/);
  }
});

test("evidence labels stay within supported current labels", () => {
  for (const label of rowSchema.allowedEvidenceLabels) {
    assert.ok(allowedEvidenceLabels.includes(label), label);
  }
  const actualLabels = new Set([
    ...metadata.posture,
    ...rows.map((row) => row.currentEvidenceLevel),
    ...ownPosture,
  ]);
  for (const label of actualLabels) {
    assert.ok(allowedEvidenceLabels.includes(label), label);
  }
  for (const label of forbiddenCurrentStateLabels) {
    assert.equal(actualLabels.has(label), false, label);
  }
});

test("blocker, future-evidence, closure, and non-authorization posture stay open", () => {
  const vagueClosure = /\b(implement later|review complete|approved|sufficient evidence|ready|resolved)\b/i;

  for (const row of rows) {
    assert.equal(row.openBlockers.length > 0, true, row.readinessId);
    assert.match(row.requiredFutureImplementationEvidence, /^Future /);
    assert.match(row.requiredFutureTestEvidence, /^Future /);
    assert.match(row.closureCriteria, /^Future independently verified/);
    assert.doesNotMatch(row.closureCriteria, vagueClosure, row.readinessId);
    assert.equal(row.remainsNonAuthorizedUntilClosure.length > 0, true, row.readinessId);
    assert.match(
      row.remainsNonAuthorizedUntilClosure.join("\n"),
      /execution|authorization|closure|approval|certification|external-use|runtime|review|verification|access|logging|storage|routing|inspection|metadata|implementation|key|custody/i,
    );
    assert.doesNotMatch(row.implementationGap, /\bcompleted\b|\bclosed\b/i);
  }
});

test("accepted merge provenance is structurally separate from source evidence", () => {
  assert.equal(
    acceptedProvenanceFromDocument.rbac_role_permission_alignment_pr53.marker,
    acceptedMergeProvenance.pr53.marker,
  );
  assert.equal(
    acceptedProvenanceFromDocument.audit_access_log_scope_pr60.commit,
    acceptedMergeProvenance.pr60.commit,
  );
  assert.equal(
    acceptedProvenanceFromDocument.audit_access_log_scope_alignment_pr61.commit,
    acceptedMergeProvenance.pr61.commit,
  );
  assert.equal(
    acceptedProvenanceFromDocument.audit_access_log_registry_pr62.commit,
    acceptedMergeProvenance.pr62.commit,
  );
  assert.equal(
    acceptedProvenanceFromDocument.audit_access_log_registry_alignment_pr63.commit,
    acceptedMergeProvenance.pr63.commit,
  );
  assert.notDeepEqual(acceptedMergeProvenance.pr64, acceptedProvenanceFromDocument);
  assert.equal(
    reviewText.includes(acceptedMergeProvenance.pr64.marker),
    false,
    "PR64 merge marker must not be pre-merge document text",
  );
  assert.notDeepEqual(acceptedProvenanceFromDocument, sourceEvidence);
});

test("source/provenance separation rules preserve historical source meaning", () => {
  assertIncludesAll(
    sourceTexts.aalRegistryAlignment,
    [
      "PROVE_ONLY",
      "SCOPE_REVIEW_ONLY",
      "no implementation",
      "no enforcement",
      "no blocker closure",
      "TEST_ONLY",
      "ALIGNMENT_PROOF_ONLY",
    ],
    "PR53 source/provenance separation",
  );
  assert.match(reviewText, /This document creates no retention/);
  assert.equal(metadata.sourceProvenanceSeparated, true);
  assert.equal(metadata.legacyEvidenceRewritten, false);
  for (const relationship of Object.values(existingRelationships)) {
    assert.equal(relationship.implementation, false);
    assert.equal(relationship.enforcement, false);
    assert.equal(relationship.closure, false);
  }
});

test("wiki and process boundaries keep advisory material out of repo truth", () => {
  assertIncludesAll(
    sourceTexts.wikiIndex,
    [
      "This wiki is a tracked repo orientation and coordination layer.",
      "It is not the primary source of truth",
      "Chat, pasted summaries, private notes, uploaded conversation material",
      "Future wiki updates must re-read both files before editing them.",
      "Wiki updates must not create implementation, runtime behavior",
    ],
    "wiki index process",
  );
  assertIncludesAll(
    sourceTexts.wikiLog,
    [
      "Future wiki updates must verify tracked repo evidence",
      "Chat is advisory only and is not a source of truth.",
      "does not create governance proof, implementation, readiness, approval",
    ],
    "wiki log process",
  );
});

test("positive operational claims are absent from the alignment proof", () => {
  const serialized = JSON.stringify({ metadata, rows, ownPosture });
  assert.doesNotMatch(
    serialized,
    /\b(retention_implemented|deletion_implemented|purge_implemented|erasure_implemented|encryption_implemented|key_management_implemented|release_approved|external_use_authorized|runtime_certification_created|technical_signoff_created)\s*:\s*true\b/,
  );
  assert.doesNotMatch(reviewText, /\bblockerClosed\s*:\s*true\b/);
  assert.doesNotMatch(reviewText, /\baccessGranted\s*:\s*true\b/);
  assert.doesNotMatch(reviewText, /\brouteAuthorized\s*:\s*true\b/);
});
