"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  deriveLifecycleGapDescriptor,
  encryptionKeyManagementBlockerRegistry,
  lifecycleGapStatusRegistry,
  noDeletionProof,
  noEncryptionImplementation,
  noProviderDeletionVerification,
  noPurgeProof,
  noRetentionCurrentness,
  providerLifecycleGapRegistry,
  retentionDeletionEncryptionGapReviewInvariant,
  retentionDeletionPurgeErasureBlockerRegistry,
} = require("../packages/governance/src/index.js");

test("lifecycle gap registries expose deny-only retention deletion purge and erasure statuses", () => {
  assert.equal(
    lifecycleGapStatusRegistry.RETENTION_POLICY_TEXT_NOT_IMPLEMENTATION.implemented,
    false,
  );
  assert.equal(
    lifecycleGapStatusRegistry.RETENTION_REVALIDATION_NOT_CURRENTNESS.implemented,
    false,
  );
  assert.equal(
    lifecycleGapStatusRegistry.DELETION_CANDIDATE_NOT_EXECUTED.implemented,
    false,
  );
  assert.equal(
    lifecycleGapStatusRegistry.DELETION_REQUEST_NOT_VERIFIED.implemented,
    false,
  );
  assert.equal(lifecycleGapStatusRegistry.PURGE_CANDIDATE_NOT_EXECUTED.implemented, false);
  assert.equal(lifecycleGapStatusRegistry.PURGE_REQUEST_NOT_VERIFIED.implemented, false);
  assert.equal(
    lifecycleGapStatusRegistry.ERASURE_CANDIDATE_NOT_EXECUTED_OR_VERIFIED.implemented,
    false,
  );
  assert.equal(
    retentionDeletionPurgeErasureBlockerRegistry.DELETION_IMPLEMENTATION_NOT_CREATED
      .blocks_lifecycle_execution,
    true,
  );
});

test("deletion and purge helpers cannot create execution, verification, or proof", () => {
  const deletion = noDeletionProof();
  const purge = noPurgeProof();

  assert.equal(deletion.allowed, false);
  assert.equal(deletion.deletion_executed, false);
  assert.equal(deletion.deletion_verified, false);
  assert.equal(deletion.proof_created, false);
  assert.ok(
    deletion.descriptor.lifecycle_gap_statuses.includes(
      "DELETION_CANDIDATE_NOT_EXECUTED",
    ),
  );
  assert.ok(
    deletion.descriptor.lifecycle_gap_statuses.includes(
      "DELETION_REQUEST_NOT_VERIFIED",
    ),
  );
  assert.equal(purge.allowed, false);
  assert.equal(purge.purge_executed, false);
  assert.equal(purge.purge_verified, false);
  assert.equal(purge.proof_created, false);
  assert.ok(purge.descriptor.lifecycle_gap_statuses.includes("PURGE_CANDIDATE_NOT_EXECUTED"));
  assert.ok(purge.descriptor.lifecycle_gap_statuses.includes("PURGE_REQUEST_NOT_VERIFIED"));
});

test("retention and encryption helpers preserve implementation gaps", () => {
  const retention = noRetentionCurrentness();
  const encryption = noEncryptionImplementation();

  assert.equal(retention.allowed, false);
  assert.equal(retention.retention_implemented, false);
  assert.equal(retention.retention_current, false);
  assert.ok(
    retention.descriptor.lifecycle_gap_statuses.includes(
      "RETENTION_POLICY_TEXT_NOT_IMPLEMENTATION",
    ),
  );
  assert.ok(
    retention.descriptor.lifecycle_gap_statuses.includes(
      "RETENTION_REVALIDATION_NOT_CURRENTNESS",
    ),
  );
  assert.equal(
    encryptionKeyManagementBlockerRegistry.ENCRYPTION_IMPLEMENTATION_NOT_CREATED
      .implemented,
    false,
  );
  assert.equal(encryption.allowed, false);
  assert.equal(encryption.encryption_implemented, false);
  assert.equal(encryption.key_management_implemented, false);
  assert.ok(
    encryption.descriptor.encryption_key_management_blockers.includes(
      "KEY_MANAGEMENT_GAP_NOT_IMPLEMENTATION",
    ),
  );
});

test("provider and recipient lifecycle signals cannot become verification", () => {
  const provider = noProviderDeletionVerification();

  assert.equal(
    providerLifecycleGapRegistry
      .PROVIDER_RETENTION_DELETION_POSTURE_NOT_DELETION_VERIFICATION.verified,
    false,
  );
  assert.equal(provider.allowed, false);
  assert.equal(provider.provider_deletion_verified, false);
  assert.equal(provider.recipient_purge_verified, false);
  assert.ok(
    provider.descriptor.provider_lifecycle_gaps.includes(
      "PROVIDER_RETENTION_DELETION_POSTURE_NOT_DELETION_VERIFICATION",
    ),
  );
  assert.ok(
    provider.descriptor.provider_lifecycle_gaps.includes(
      "RECIPIENT_RESPONSE_NOT_PURGE_VERIFICATION",
    ),
  );
});

test("category-only lifecycle descriptor rejects proof and runtime overclaims", () => {
  const descriptor = deriveLifecycleGapDescriptor({
    lifecycle_gap_statuses: [
      "LOCAL_LOG_NOT_DELETION_PURGE_AUDIT_PROOF",
      "HASH_MANIFEST_NOT_DELETION_PURGE_TRUTH_PROOF",
    ],
    lifecycle_blockers: [
      "LEGAL_HOLD_NOT_CREATED",
      "EVIDENTIARY_RECORD_NOT_CREATED",
      "CHAIN_OF_CUSTODY_NOT_CREATED",
    ],
    lifecycle_non_authorizations: [
      "SOURCE_TRUTH_NOT_CREATED",
      "TECHNICAL_SIGNOFF_NOT_CREATED",
      "RUNTIME_CERTIFICATION_NOT_CREATED",
    ],
  });

  assert.equal(descriptor.category_only, true);
  assert.equal(descriptor.authorized, false);
  assert.equal(descriptor.lifecycle_execution_created, false);
  assert.equal(descriptor.implementation_boundary.legal_hold_created, false);
  assert.equal(descriptor.implementation_boundary.evidentiary_record_created, false);
  assert.equal(descriptor.implementation_boundary.chain_of_custody_created, false);
  assert.equal(descriptor.implementation_boundary.source_truth_created, false);
  assert.equal(descriptor.implementation_boundary.technical_signoff_created, false);
  assert.equal(descriptor.implementation_boundary.runtime_certification_created, false);
  assert.ok(
    descriptor.lifecycle_gap_statuses.includes(
      "LOCAL_LOG_NOT_DELETION_PURGE_AUDIT_PROOF",
    ),
  );
  assert.ok(
    descriptor.lifecycle_gap_statuses.includes(
      "HASH_MANIFEST_NOT_DELETION_PURGE_TRUTH_PROOF",
    ),
  );
});

test("lifecycle descriptor output remains no-raw and does not reflect prohibited values", () => {
  const descriptor = deriveLifecycleGapDescriptor({
    lifecycle_gap_statuses: ["DELETION_CANDIDATE_NOT_EXECUTED"],
    raw_source_text: "synthetic raw text that must not be reflected",
    private_fact: "synthetic private fact",
    source_locator: "synthetic source locator",
    private_path: "/private/synthetic/path",
    url: "https://example.invalid/private",
    token: "synthetic-token",
    secret: "synthetic-secret",
    provider_payload: "synthetic provider payload",
    prompt: "synthetic prompt",
    response: "synthetic response",
    pdf_content: "synthetic pdf content",
    image_content: "synthetic image content",
    metadata_content: "synthetic metadata content",
    legal_conclusion: "synthetic legal conclusion",
  });
  const serialized = JSON.stringify(descriptor);

  assert.equal(descriptor.category_only, true);
  assert.equal(descriptor.prohibited_content_categories.includes("RAW_SOURCE_TEXT_CONTENT"), true);
  assert.doesNotMatch(serialized, /synthetic raw text|synthetic private fact/i);
  assert.doesNotMatch(serialized, /synthetic source locator|\/private\/synthetic/i);
  assert.doesNotMatch(serialized, /example\.invalid|synthetic-token|synthetic-secret/i);
  assert.doesNotMatch(
    serialized,
    /synthetic provider payload|synthetic prompt|synthetic response/i,
  );
  assert.doesNotMatch(
    serialized,
    /synthetic pdf content|synthetic image content|synthetic metadata content/i,
  );
  assert.doesNotMatch(serialized, /synthetic legal conclusion/i);
});

test("gap-review invariant preserves all non-implementation boundaries", () => {
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.retention_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.deletion_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.purge_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.erasure_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.encryption_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.key_management_implemented, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.legal_hold_created, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.evidentiary_record_created, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.chain_of_custody_created, false);
  assert.equal(
    retentionDeletionEncryptionGapReviewInvariant.provider_deletion_verification_created,
    false,
  );
  assert.equal(
    retentionDeletionEncryptionGapReviewInvariant.recipient_purge_verification_created,
    false,
  );
  assert.equal(
    retentionDeletionEncryptionGapReviewInvariant.runtime_lifecycle_execution_created,
    false,
  );
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.source_truth_created, false);
  assert.equal(retentionDeletionEncryptionGapReviewInvariant.technical_signoff_created, false);
  assert.equal(
    retentionDeletionEncryptionGapReviewInvariant.runtime_certification_created,
    false,
  );
});
