"use strict";

const {
  dataHandlingBlockerRegistry,
  dataHandlingNonAuthorizationInvariant,
  evaluateNoOverclaim,
} = require("./data-handling-control-plane.js");
const {
  classifyProhibitedEventContent,
  deriveNoContentAuditAccessEventDescriptor,
  noContentAuditAccessImplementationBoundary,
  noContentAuditAccessMarkers,
} = require("./no-content-audit-access-event-taxonomy.js");
const {
  rawMaterialRoutingThirdPartyNonAuthorizationInvariant,
} = require("./raw-material-routing-third-party-deny-by-default-hardening.js");

const lifecycleGapStatusRegistry = Object.freeze({
  RETENTION_POLICY_TEXT_NOT_IMPLEMENTATION: Object.freeze({
    lifecycle_gap_status: "RETENTION_POLICY_TEXT_NOT_IMPLEMENTATION",
    implemented: false,
    description: "Retention policy text cannot become retention implementation.",
  }),
  RETENTION_REVALIDATION_NOT_CURRENTNESS: Object.freeze({
    lifecycle_gap_status: "RETENTION_REVALIDATION_NOT_CURRENTNESS",
    implemented: false,
    description: "Retention revalidation cannot become retention currentness.",
  }),
  DELETION_CANDIDATE_NOT_EXECUTED: Object.freeze({
    lifecycle_gap_status: "DELETION_CANDIDATE_NOT_EXECUTED",
    implemented: false,
    description: "Deletion candidate status cannot become deletion executed.",
  }),
  DELETION_REQUEST_NOT_VERIFIED: Object.freeze({
    lifecycle_gap_status: "DELETION_REQUEST_NOT_VERIFIED",
    implemented: false,
    description: "Deletion request status cannot become deletion verified.",
  }),
  PURGE_CANDIDATE_NOT_EXECUTED: Object.freeze({
    lifecycle_gap_status: "PURGE_CANDIDATE_NOT_EXECUTED",
    implemented: false,
    description: "Purge candidate status cannot become purge executed.",
  }),
  PURGE_REQUEST_NOT_VERIFIED: Object.freeze({
    lifecycle_gap_status: "PURGE_REQUEST_NOT_VERIFIED",
    implemented: false,
    description: "Purge request status cannot become purge verified.",
  }),
  ERASURE_CANDIDATE_NOT_EXECUTED_OR_VERIFIED: Object.freeze({
    lifecycle_gap_status: "ERASURE_CANDIDATE_NOT_EXECUTED_OR_VERIFIED",
    implemented: false,
    description: "Erasure candidate status cannot become erasure executed or verified.",
  }),
  LOCAL_LOG_NOT_DELETION_PURGE_AUDIT_PROOF: Object.freeze({
    lifecycle_gap_status: "LOCAL_LOG_NOT_DELETION_PURGE_AUDIT_PROOF",
    implemented: false,
    description: "Local logs cannot become deletion, purge, or audit proof.",
  }),
  HASH_MANIFEST_NOT_DELETION_PURGE_TRUTH_PROOF: Object.freeze({
    lifecycle_gap_status: "HASH_MANIFEST_NOT_DELETION_PURGE_TRUTH_PROOF",
    implemented: false,
    description: "Hash or manifest output cannot become deletion, purge, or truth proof.",
  }),
});

const retentionDeletionPurgeErasureBlockerRegistry = Object.freeze({
  RETENTION_IMPLEMENTATION_NOT_CREATED: Object.freeze({
    blocker: "RETENTION_IMPLEMENTATION_NOT_CREATED",
    blocks_lifecycle_execution: true,
    description: "Real retention implementation is not created.",
  }),
  DELETION_IMPLEMENTATION_NOT_CREATED: Object.freeze({
    blocker: "DELETION_IMPLEMENTATION_NOT_CREATED",
    blocks_lifecycle_execution: true,
    description: "Real deletion implementation is not created.",
  }),
  PURGE_IMPLEMENTATION_NOT_CREATED: Object.freeze({
    blocker: "PURGE_IMPLEMENTATION_NOT_CREATED",
    blocks_lifecycle_execution: true,
    description: "Real purge implementation is not created.",
  }),
  ERASURE_IMPLEMENTATION_NOT_CREATED: Object.freeze({
    blocker: "ERASURE_IMPLEMENTATION_NOT_CREATED",
    blocks_lifecycle_execution: true,
    description: "Real erasure implementation is not created.",
  }),
  LEGAL_HOLD_NOT_CREATED: Object.freeze({
    blocker: "LEGAL_HOLD_NOT_CREATED",
    blocks_lifecycle_execution: true,
    description: "Legal hold is not created.",
  }),
  EVIDENTIARY_RECORD_NOT_CREATED: Object.freeze({
    blocker: "EVIDENTIARY_RECORD_NOT_CREATED",
    blocks_lifecycle_execution: true,
    description: "Evidentiary record is not created.",
  }),
  CHAIN_OF_CUSTODY_NOT_CREATED: Object.freeze({
    blocker: "CHAIN_OF_CUSTODY_NOT_CREATED",
    blocks_lifecycle_execution: true,
    description: "Chain of custody is not created.",
  }),
});

const encryptionKeyManagementBlockerRegistry = Object.freeze({
  ENCRYPTION_IMPLEMENTATION_NOT_CREATED: Object.freeze({
    blocker: "ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
    implemented: false,
    description: "Encryption implementation is not created.",
  }),
  KEY_MANAGEMENT_IMPLEMENTATION_NOT_CREATED: Object.freeze({
    blocker: "KEY_MANAGEMENT_IMPLEMENTATION_NOT_CREATED",
    implemented: false,
    description: "Key-management implementation is not created.",
  }),
  ENCRYPTION_BLOCKER_REVIEW_NOT_IMPLEMENTATION: Object.freeze({
    blocker: "ENCRYPTION_BLOCKER_REVIEW_NOT_IMPLEMENTATION",
    implemented: false,
    description: "Encryption blocker review cannot become encryption implemented.",
  }),
  KEY_MANAGEMENT_GAP_NOT_IMPLEMENTATION: Object.freeze({
    blocker: "KEY_MANAGEMENT_GAP_NOT_IMPLEMENTATION",
    implemented: false,
    description: "Key-management gap status cannot become key-management implemented.",
  }),
});

const providerLifecycleGapRegistry = Object.freeze({
  PROVIDER_RETENTION_DELETION_POSTURE_NOT_DELETION_VERIFICATION: Object.freeze({
    provider_lifecycle_gap:
      "PROVIDER_RETENTION_DELETION_POSTURE_NOT_DELETION_VERIFICATION",
    verified: false,
    description:
      "Provider retention/deletion posture cannot become provider deletion verification.",
  }),
  PROVIDER_DELETION_VERIFICATION_NOT_CREATED: Object.freeze({
    provider_lifecycle_gap: "PROVIDER_DELETION_VERIFICATION_NOT_CREATED",
    verified: false,
    description: "Provider deletion verification is not created.",
  }),
  RECIPIENT_RESPONSE_NOT_PURGE_VERIFICATION: Object.freeze({
    provider_lifecycle_gap: "RECIPIENT_RESPONSE_NOT_PURGE_VERIFICATION",
    verified: false,
    description: "Recipient response cannot become recipient purge verification.",
  }),
  RECIPIENT_PURGE_VERIFICATION_NOT_CREATED: Object.freeze({
    provider_lifecycle_gap: "RECIPIENT_PURGE_VERIFICATION_NOT_CREATED",
    verified: false,
    description: "Recipient purge verification is not created.",
  }),
});

const lifecycleNonAuthorizationRegistry = Object.freeze({
  SOURCE_TRUTH_NOT_CREATED: Object.freeze({
    non_authorization: "SOURCE_TRUTH_NOT_CREATED",
    created: false,
    description: "Source truth is not created.",
  }),
  TECHNICAL_SIGNOFF_NOT_CREATED: Object.freeze({
    non_authorization: "TECHNICAL_SIGNOFF_NOT_CREATED",
    created: false,
    description: "Technical sign-off is not created.",
  }),
  RUNTIME_CERTIFICATION_NOT_CREATED: Object.freeze({
    non_authorization: "RUNTIME_CERTIFICATION_NOT_CREATED",
    created: false,
    description: "Runtime certification is not created.",
  }),
  LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_NOT_CREATED: Object.freeze({
    non_authorization: "LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_NOT_CREATED",
    created: false,
    description: "Legal, clinical, evidentiary, and case-truth conclusions are not created.",
  }),
  SECURITY_FINDING_SEVERITY_REMEDIATION_NOT_CREATED: Object.freeze({
    non_authorization: "SECURITY_FINDING_SEVERITY_REMEDIATION_NOT_CREATED",
    created: false,
    description: "Security findings, severity, and remediation are not created.",
  }),
});

function unique(values) {
  return [...new Set(values)];
}

function hasRegistryEntry(registry, key) {
  return Object.prototype.hasOwnProperty.call(registry, key);
}

function filterRegistered(registry, values) {
  return Array.isArray(values)
    ? values.filter((value) => hasRegistryEntry(registry, value))
    : [];
}

function getLifecycleGapStatusEntry(status) {
  return lifecycleGapStatusRegistry[status] || null;
}

function getRetentionDeletionPurgeErasureBlockerEntry(blocker) {
  return retentionDeletionPurgeErasureBlockerRegistry[blocker] || null;
}

function getEncryptionKeyManagementBlockerEntry(blocker) {
  return encryptionKeyManagementBlockerRegistry[blocker] || null;
}

function getProviderLifecycleGapEntry(gap) {
  return providerLifecycleGapRegistry[gap] || null;
}

function getLifecycleNonAuthorizationEntry(nonAuthorization) {
  return lifecycleNonAuthorizationRegistry[nonAuthorization] || null;
}

function deriveLifecycleGapDescriptor(input = {}) {
  const lifecycleGapStatuses = unique(
    filterRegistered(lifecycleGapStatusRegistry, input.lifecycle_gap_statuses),
  );
  const lifecycleBlockers = unique(
    filterRegistered(
      retentionDeletionPurgeErasureBlockerRegistry,
      input.lifecycle_blockers,
    ),
  );
  const encryptionKeyManagementBlockers = unique(
    filterRegistered(
      encryptionKeyManagementBlockerRegistry,
      input.encryption_key_management_blockers,
    ),
  );
  const providerLifecycleGaps = unique(
    filterRegistered(providerLifecycleGapRegistry, input.provider_lifecycle_gaps),
  );
  const nonAuthorizations = unique([
    ...filterRegistered(
      lifecycleNonAuthorizationRegistry,
      input.lifecycle_non_authorizations,
    ),
    "SOURCE_TRUTH_NOT_CREATED",
    "TECHNICAL_SIGNOFF_NOT_CREATED",
    "RUNTIME_CERTIFICATION_NOT_CREATED",
    "LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_NOT_CREATED",
    "SECURITY_FINDING_SEVERITY_REMEDIATION_NOT_CREATED",
  ]);
  const prohibitedContentCategories = classifyProhibitedEventContent(input);

  return Object.freeze({
    descriptor_type: "CATEGORY_ONLY_LIFECYCLE_GAP_DESCRIPTOR",
    category_only: true,
    authorized: false,
    lifecycle_execution_created: false,
    lifecycle_gap_statuses: Object.freeze(lifecycleGapStatuses),
    lifecycle_blockers: Object.freeze(lifecycleBlockers),
    encryption_key_management_blockers: Object.freeze(
      encryptionKeyManagementBlockers,
    ),
    provider_lifecycle_gaps: Object.freeze(providerLifecycleGaps),
    prohibited_content_categories: Object.freeze(prohibitedContentCategories),
    non_authorizations: Object.freeze(nonAuthorizations),
    implementation_boundary: Object.freeze({
      retention_implemented: false,
      deletion_implemented: false,
      purge_implemented: false,
      erasure_implemented: false,
      encryption_implemented: false,
      key_management_implemented: false,
      legal_hold_created: false,
      evidentiary_record_created: false,
      chain_of_custody_created: false,
      provider_deletion_verification_created: false,
      recipient_purge_verification_created: false,
      runtime_lifecycle_execution_created: false,
      source_truth_created: false,
      technical_signoff_created: false,
      runtime_certification_created: false,
    }),
    no_content_markers: noContentAuditAccessMarkers,
    no_content_implementation_boundary: noContentAuditAccessImplementationBoundary,
    event_descriptor: deriveNoContentAuditAccessEventDescriptor(input),
    data_handling_non_authorizations: dataHandlingNonAuthorizationInvariant,
    routing_non_authorizations: rawMaterialRoutingThirdPartyNonAuthorizationInvariant,
  });
}

function noDeletionProof(input = {}) {
  return Object.freeze({
    helper: "NO_DELETION_PROOF",
    allowed: false,
    deletion_executed: false,
    deletion_verified: false,
    proof_created: false,
    descriptor: deriveLifecycleGapDescriptor({
      ...input,
      lifecycle_gap_statuses: [
        "DELETION_CANDIDATE_NOT_EXECUTED",
        "DELETION_REQUEST_NOT_VERIFIED",
        "LOCAL_LOG_NOT_DELETION_PURGE_AUDIT_PROOF",
        "HASH_MANIFEST_NOT_DELETION_PURGE_TRUTH_PROOF",
      ],
      lifecycle_blockers: ["DELETION_IMPLEMENTATION_NOT_CREATED"],
    }),
  });
}

function noPurgeProof(input = {}) {
  return Object.freeze({
    helper: "NO_PURGE_PROOF",
    allowed: false,
    purge_executed: false,
    purge_verified: false,
    proof_created: false,
    descriptor: deriveLifecycleGapDescriptor({
      ...input,
      lifecycle_gap_statuses: [
        "PURGE_CANDIDATE_NOT_EXECUTED",
        "PURGE_REQUEST_NOT_VERIFIED",
        "LOCAL_LOG_NOT_DELETION_PURGE_AUDIT_PROOF",
        "HASH_MANIFEST_NOT_DELETION_PURGE_TRUTH_PROOF",
      ],
      lifecycle_blockers: ["PURGE_IMPLEMENTATION_NOT_CREATED"],
    }),
  });
}

function noRetentionCurrentness(input = {}) {
  return Object.freeze({
    helper: "NO_RETENTION_CURRENTNESS",
    allowed: false,
    retention_implemented: false,
    retention_current: false,
    descriptor: deriveLifecycleGapDescriptor({
      ...input,
      lifecycle_gap_statuses: [
        "RETENTION_POLICY_TEXT_NOT_IMPLEMENTATION",
        "RETENTION_REVALIDATION_NOT_CURRENTNESS",
      ],
      lifecycle_blockers: ["RETENTION_IMPLEMENTATION_NOT_CREATED"],
    }),
  });
}

function noEncryptionImplementation(input = {}) {
  return Object.freeze({
    helper: "NO_ENCRYPTION_IMPLEMENTATION",
    allowed: false,
    encryption_implemented: false,
    key_management_implemented: false,
    descriptor: deriveLifecycleGapDescriptor({
      ...input,
      encryption_key_management_blockers: [
        "ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
        "KEY_MANAGEMENT_IMPLEMENTATION_NOT_CREATED",
        "ENCRYPTION_BLOCKER_REVIEW_NOT_IMPLEMENTATION",
        "KEY_MANAGEMENT_GAP_NOT_IMPLEMENTATION",
      ],
    }),
  });
}

function noProviderDeletionVerification(input = {}) {
  return Object.freeze({
    helper: "NO_PROVIDER_DELETION_VERIFICATION",
    allowed: false,
    provider_deletion_verified: false,
    recipient_purge_verified: false,
    descriptor: deriveLifecycleGapDescriptor({
      ...input,
      provider_lifecycle_gaps: [
        "PROVIDER_RETENTION_DELETION_POSTURE_NOT_DELETION_VERIFICATION",
        "PROVIDER_DELETION_VERIFICATION_NOT_CREATED",
        "RECIPIENT_RESPONSE_NOT_PURGE_VERIFICATION",
        "RECIPIENT_PURGE_VERIFICATION_NOT_CREATED",
      ],
    }),
  });
}

const retentionDeletionEncryptionGapReviewInvariant = Object.freeze({
  retention_implemented: false,
  deletion_implemented: false,
  purge_implemented: false,
  erasure_implemented: false,
  encryption_implemented: false,
  key_management_implemented: false,
  legal_hold_created: false,
  evidentiary_record_created: false,
  chain_of_custody_created: false,
  provider_deletion_verification_created: false,
  recipient_purge_verification_created: false,
  runtime_lifecycle_execution_created: false,
  source_truth_created: false,
  technical_signoff_created: false,
  runtime_certification_created: false,
  local_logs_are_deletion_purge_audit_proof: false,
  hash_manifest_is_deletion_purge_truth_proof: false,
  lifecycle_blocker: dataHandlingBlockerRegistry
    .RETENTION_DELETION_PURGE_IMPLEMENTATION_NOT_CREATED.blocker,
  encryption_blocker:
    dataHandlingBlockerRegistry.ENCRYPTION_IMPLEMENTATION_NOT_CREATED.blocker,
  docs_only_non_enforcement: evaluateNoOverclaim("DOCS_ONLY_AS_RUNTIME_ENFORCEMENT"),
});

module.exports = {
  deriveLifecycleGapDescriptor,
  encryptionKeyManagementBlockerRegistry,
  getEncryptionKeyManagementBlockerEntry,
  getLifecycleGapStatusEntry,
  getLifecycleNonAuthorizationEntry,
  getProviderLifecycleGapEntry,
  getRetentionDeletionPurgeErasureBlockerEntry,
  lifecycleGapStatusRegistry,
  lifecycleNonAuthorizationRegistry,
  noDeletionProof,
  noEncryptionImplementation,
  noProviderDeletionVerification,
  noPurgeProof,
  noRetentionCurrentness,
  providerLifecycleGapRegistry,
  retentionDeletionEncryptionGapReviewInvariant,
  retentionDeletionPurgeErasureBlockerRegistry,
};
