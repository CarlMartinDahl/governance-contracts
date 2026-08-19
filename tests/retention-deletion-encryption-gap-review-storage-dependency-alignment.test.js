const assert = require("node:assert/strict");
const test = require("node:test");

const gapReview = require("../packages/governance/src/retention-deletion-encryption-gap-review.js");
const storageDependency = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const storageRegistry = require("../packages/governance/src/storage-data-location-inventory-registry.js");

const positiveClaimKeys = new Set([
  "allowed",
  "authorized",
  "deletion_authorized",
  "deletion_executed",
  "deletion_verified",
  "encryption_authorized",
  "encryption_implemented",
  "erasure_authorized",
  "erasure_executed",
  "external_use_authorized",
  "key_management_implemented",
  "legal_hold_authorized",
  "legal_hold_created",
  "product_candidate_authorized",
  "provider_deletion_authorized",
  "provider_deletion_verified",
  "purge_authorized",
  "purge_executed",
  "purge_verified",
  "recipient_purge_authorized",
  "recipient_purge_verified",
  "release_approved",
  "runtime_certification_created",
  "technical_signoff_created",
]);

function assertNoPositiveClaims(value) {
  if (Array.isArray(value)) {
    for (const item of value) {
      assertNoPositiveClaims(item);
    }
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, item] of Object.entries(value)) {
    if (positiveClaimKeys.has(key)) {
      assert.equal(item, false, `${key} must remain false`);
    }
    assertNoPositiveClaims(item);
  }
}

test("gap-review and storage-dependency scaffolds preserve lifecycle non-implementation", () => {
  const invariant = gapReview.retentionDeletionEncryptionGapReviewInvariant;
  const nonAuthorization = storageDependency.getRdeNonAuthorizationStatus();

  for (const [key, value] of Object.entries({
    retention_implemented: invariant.retention_implemented,
    deletion_implemented: invariant.deletion_implemented,
    purge_implemented: invariant.purge_implemented,
    erasure_implemented: invariant.erasure_implemented,
    encryption_implemented: invariant.encryption_implemented,
    key_management_implemented: invariant.key_management_implemented,
    legal_hold_created: invariant.legal_hold_created,
    evidentiary_record_created: invariant.evidentiary_record_created,
    chain_of_custody_created: invariant.chain_of_custody_created,
    provider_deletion_verification_created:
      invariant.provider_deletion_verification_created,
    recipient_purge_verification_created:
      invariant.recipient_purge_verification_created,
    runtime_lifecycle_execution_created:
      invariant.runtime_lifecycle_execution_created,
    storage_retention_created: nonAuthorization.retention_implementation_created,
    storage_deletion_created: nonAuthorization.deletion_implementation_created,
    storage_purge_created: nonAuthorization.purge_implementation_created,
    storage_erasure_created: nonAuthorization.erasure_implementation_created,
    storage_encryption_created:
      nonAuthorization.encryption_implementation_created,
    storage_key_management_created:
      nonAuthorization.key_management_implementation_created,
    storage_chain_of_custody_created: nonAuthorization.chain_of_custody_created,
    storage_evidentiary_record_created:
      nonAuthorization.evidentiary_record_created,
    storage_runtime_execution_created:
      nonAuthorization.runtime_lifecycle_execution_created,
  })) {
    assert.equal(value, false, `${key} must remain false`);
  }

  assert.equal(storageDependency.isLifecycleImplementationCreated(), false);
  assertNoPositiveClaims(invariant);
  assertNoPositiveClaims(nonAuthorization);
});

test("storage dependency actions align with gap-review blocker posture", () => {
  const actions = storageDependency.listLifecycleActionCandidates();

  assert.equal(actions.length, 20);
  for (const action of actions) {
    assert.equal(storageDependency.hasLifecycleActionCandidate(action.id), true);
    assert.equal(storageDependency.isLifecycleActionAuthorized(action.id), false);
    assert.ok(
      action.implementation_statuses.includes("NOT_RUNTIME_LIFECYCLE_EXECUTION"),
    );
    assertNoPositiveClaims(action);

    if (action.family === "DELETION") {
      assert.notEqual(
        gapReview.getRetentionDeletionPurgeErasureBlockerEntry(
          "DELETION_IMPLEMENTATION_NOT_CREATED",
        ),
        null,
      );
    }
    if (action.family === "PURGE") {
      assert.notEqual(
        gapReview.getRetentionDeletionPurgeErasureBlockerEntry(
          "PURGE_IMPLEMENTATION_NOT_CREATED",
        ),
        null,
      );
    }
    if (action.family === "ERASURE") {
      assert.notEqual(
        gapReview.getRetentionDeletionPurgeErasureBlockerEntry(
          "ERASURE_IMPLEMENTATION_NOT_CREATED",
        ),
        null,
      );
    }
    if (action.family === "ENCRYPTION" || action.family === "KEY_MANAGEMENT") {
      assert.notEqual(
        gapReview.getEncryptionKeyManagementBlockerEntry(
          "ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
        ),
        null,
      );
    }
  }
});

test("storage dependency rows align with known locations and material classes", () => {
  const knownLocations = new Set(Object.keys(storageRegistry.DATA_LOCATION_REGISTRY));
  const knownMaterialClasses = new Set(Object.values(storageRegistry.MATERIAL_CLASSES));

  for (const dependency of storageDependency.listRdeStorageDependencies()) {
    for (const locationId of dependency.storage_location_ids) {
      assert.equal(knownLocations.has(locationId), true, locationId);
    }
    for (const materialClass of dependency.material_classes) {
      assert.equal(knownMaterialClasses.has(materialClass), true, materialClass);
      if (storageRegistry.isHighRiskMaterialClass(materialClass)) {
        const denial = storageRegistry.getHighRiskMaterialClassDenial(materialClass);
        assert.equal(denial.denied, true);
        assert.equal(denial.authorized, false);
      }
    }
    assertNoPositiveClaims(dependency);
  }
});

test("unknown lifecycle action and dependency remain fail-closed", () => {
  const action = storageDependency.getLifecycleActionCandidate("RDE-ACTION-999_UNKNOWN");
  const actionClass = storageDependency.classifyLifecycleAction(
    "RDE-ACTION-999_UNKNOWN",
  );
  const dependency = storageDependency.getRdeStorageDependency("RDE-DEP-999_UNKNOWN");
  const dependencyClass = storageDependency.classifyRdeStorageDependency(
    "RDE-DEP-999_UNKNOWN",
  );

  assert.equal(action.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(actionClass.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(dependency.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(dependencyClass.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(storageDependency.hasLifecycleActionCandidate(action.id), false);
  assert.equal(storageDependency.hasRdeStorageDependency(dependency.id), false);
  assertNoPositiveClaims([action, actionClass, dependency, dependencyClass]);
});

test("non-overclaim rules preserve gap-review and storage-dependency boundaries", () => {
  for (const rule of [
    "RETENTION_POLICY does not mean RETENTION_EXECUTION",
    "DELETION_REQUEST does not mean DELETION_EXECUTED",
    "DELETION_EXECUTED does not mean DELETION_VERIFIED",
    "PURGE_EVENT does not mean PURGE_PROOF",
    "ERASURE_REQUEST does not mean LEGAL_ERASURE_COMPLETION",
    "ENCRYPTION_REQUIREMENT does not mean ENCRYPTION_IMPLEMENTED",
    "PROVIDER_POSTURE does not mean PROVIDER_DELETION_VERIFICATION",
    "RECIPIENT_RESPONSE does not mean RECIPIENT_PURGE_VERIFICATION",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "CI_LOG does not mean RELEASE_EVIDENCE",
  ]) {
    assert.ok(storageDependency.listRdeNonOverclaimRules().includes(rule), rule);
  }

  assert.equal(
    gapReview.lifecycleGapStatusRegistry.LOCAL_LOG_NOT_DELETION_PURGE_AUDIT_PROOF
      .implemented,
    false,
  );
  assert.equal(
    gapReview.lifecycleGapStatusRegistry
      .HASH_MANIFEST_NOT_DELETION_PURGE_TRUTH_PROOF.implemented,
    false,
  );
});

test("helper outputs from both RDE modules do not create positive lifecycle claims", () => {
  const gapDescriptor = gapReview.deriveLifecycleGapDescriptor({
    lifecycle_gap_statuses: [
      "DELETION_CANDIDATE_NOT_EXECUTED",
      "PURGE_CANDIDATE_NOT_EXECUTED",
    ],
    lifecycle_blockers: [
      "DELETION_IMPLEMENTATION_NOT_CREATED",
      "PURGE_IMPLEMENTATION_NOT_CREATED",
      "ERASURE_IMPLEMENTATION_NOT_CREATED",
    ],
    encryption_key_management_blockers: [
      "ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
      "KEY_MANAGEMENT_IMPLEMENTATION_NOT_CREATED",
    ],
    provider_lifecycle_gaps: [
      "PROVIDER_DELETION_VERIFICATION_NOT_CREATED",
      "RECIPIENT_PURGE_VERIFICATION_NOT_CREATED",
    ],
  });

  const outputs = [
    gapDescriptor,
    gapReview.noDeletionProof(),
    gapReview.noPurgeProof(),
    gapReview.noRetentionCurrentness(),
    gapReview.noEncryptionImplementation(),
    gapReview.noProviderDeletionVerification(),
    storageDependency.getRdeNonAuthorizationStatus(),
    storageDependency.listLifecycleActionCandidates(),
    storageDependency.listRdeStorageDependencies(),
    storageDependency.getLifecycleActionCandidate("RDE-ACTION-006_DELETION_EXECUTE"),
    storageDependency.getRdeStorageDependency(
      "RDE-DEP-010_FUTURE_AUDIT_LOG_STORAGE_LIFECYCLE",
    ),
  ];

  assertNoPositiveClaims(outputs);
});
