"use strict";

const {
  DATA_LOCATION_REGISTRY,
  MATERIAL_CLASSES,
  HIGH_RISK_MATERIAL_CLASSES_DENIED,
} = require("./storage-data-location-inventory-registry.js");

const LIFECYCLE_CONTROL_FAMILIES = Object.freeze({
  RETENTION: "RETENTION",
  DELETION: "DELETION",
  PURGE: "PURGE",
  ERASURE: "ERASURE",
  ARCHIVE: "ARCHIVE",
  LEGAL_HOLD: "LEGAL_HOLD",
  EXCEPTION_HOLD: "EXCEPTION_HOLD",
  ENCRYPTION: "ENCRYPTION",
  KEY_MANAGEMENT: "KEY_MANAGEMENT",
  KEY_ROTATION: "KEY_ROTATION",
  KEY_REVOCATION: "KEY_REVOCATION",
  PROVIDER_DELETION: "PROVIDER_DELETION",
  RECIPIENT_PURGE: "RECIPIENT_PURGE",
});

const LIFECYCLE_IMPLEMENTATION_STATUS = Object.freeze({
  NOT_RETENTION_IMPLEMENTATION: "NOT_RETENTION_IMPLEMENTATION",
  NOT_DELETION_IMPLEMENTATION: "NOT_DELETION_IMPLEMENTATION",
  NOT_PURGE_IMPLEMENTATION: "NOT_PURGE_IMPLEMENTATION",
  NOT_ERASURE_IMPLEMENTATION: "NOT_ERASURE_IMPLEMENTATION",
  NOT_ENCRYPTION_IMPLEMENTATION: "NOT_ENCRYPTION_IMPLEMENTATION",
  NOT_KEY_MANAGEMENT_IMPLEMENTATION: "NOT_KEY_MANAGEMENT_IMPLEMENTATION",
  NOT_LEGAL_HOLD: "NOT_LEGAL_HOLD",
  NOT_CHAIN_OF_CUSTODY: "NOT_CHAIN_OF_CUSTODY",
  NOT_EVIDENTIARY_RECORD: "NOT_EVIDENTIARY_RECORD",
  NOT_SOURCE_TRUTH: "NOT_SOURCE_TRUTH",
  NOT_PROVIDER_DELETION_VERIFICATION: "NOT_PROVIDER_DELETION_VERIFICATION",
  NOT_RECIPIENT_PURGE_VERIFICATION: "NOT_RECIPIENT_PURGE_VERIFICATION",
  NOT_RUNTIME_LIFECYCLE_EXECUTION: "NOT_RUNTIME_LIFECYCLE_EXECUTION",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const LIFECYCLE_DECISION_STATUS = Object.freeze({
  POLICY_TEXT_ONLY: "POLICY_TEXT_ONLY",
  REQUEST_ONLY: "REQUEST_ONLY",
  CANDIDATE_ONLY: "CANDIDATE_ONLY",
  GAP_REVIEW_ONLY: "GAP_REVIEW_ONLY",
  NOT_EXECUTED: "NOT_EXECUTED",
  NOT_VERIFIED: "NOT_VERIFIED",
  NOT_AUTHORIZED: "NOT_AUTHORIZED",
  BLOCKED_BY_STORAGE_INVENTORY: "BLOCKED_BY_STORAGE_INVENTORY",
  BLOCKED_BY_RBAC_ACCESS_CONTROL: "BLOCKED_BY_RBAC_ACCESS_CONTROL",
  BLOCKED_BY_AUDIT_ACCESS_LOG: "BLOCKED_BY_AUDIT_ACCESS_LOG",
  BLOCKED_BY_PROVIDER_POSTURE: "BLOCKED_BY_PROVIDER_POSTURE",
  BLOCKED_BY_RECIPIENT_VERIFICATION: "BLOCKED_BY_RECIPIENT_VERIFICATION",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const LIFECYCLE_EVIDENCE_POSTURE = Object.freeze({
  DOCS_ONLY_CONTROL_PLAN: "DOCS_ONLY_CONTROL_PLAN",
  REGISTRY_SCAFFOLD_EVIDENCE: "REGISTRY_SCAFFOLD_EVIDENCE",
  TESTED_ALIGNMENT_EVIDENCE: "TESTED_ALIGNMENT_EVIDENCE",
  CI_TESTED_SCENARIO_EVIDENCE: "CI_TESTED_SCENARIO_EVIDENCE",
  FUTURE_CANDIDATE_ONLY: "FUTURE_CANDIDATE_ONLY",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const BASE_NON_AUTHORIZATIONS = Object.freeze({
  authorized: false,
  deletion_authorized: false,
  purge_authorized: false,
  erasure_authorized: false,
  encryption_authorized: false,
  legal_hold_authorized: false,
  provider_deletion_authorized: false,
  recipient_purge_authorized: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_authorized: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
});

const BASE_LIFECYCLE_FLAGS = Object.freeze({
  deletion_executed: false,
  deletion_verified: false,
  purge_executed: false,
  purge_verified: false,
  erasure_executed: false,
  encryption_implemented: false,
  key_management_implemented: false,
  provider_deletion_verified: false,
  recipient_purge_verified: false,
  legal_hold_created: false,
});

const BASE_IMPLEMENTATION_STATUSES = Object.freeze([
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_RETENTION_IMPLEMENTATION,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_DELETION_IMPLEMENTATION,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_PURGE_IMPLEMENTATION,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_ERASURE_IMPLEMENTATION,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_ENCRYPTION_IMPLEMENTATION,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_KEY_MANAGEMENT_IMPLEMENTATION,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_LEGAL_HOLD,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_CHAIN_OF_CUSTODY,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_EVIDENTIARY_RECORD,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_SOURCE_TRUTH,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_PROVIDER_DELETION_VERIFICATION,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_RECIPIENT_PURGE_VERIFICATION,
  LIFECYCLE_IMPLEMENTATION_STATUS.NOT_RUNTIME_LIFECYCLE_EXECUTION,
]);

const RDE_REQUIRED_PREREQUISITES = Object.freeze([
  "complete storage/data-location inventory",
  "material-class lifecycle map",
  "RBAC/access-control model",
  "admin/support lifecycle no-bypass model",
  "audit/access-log model",
  "log retention/deletion policy",
  "retention categories",
  "deletion/purge/erasure semantics",
  "encryption/key-management design",
  "provider lifecycle policy",
  "recipient purge/compliance verification model",
  "CI test plan",
  "non-proof/non-chain-of-custody wording",
]);

const RDE_NON_OVERCLAIM_RULES = Object.freeze([
  "RETENTION_POLICY does not mean RETENTION_EXECUTION",
  "RETENTION_REVALIDATION does not mean CURRENTNESS_PROOF",
  "DELETION_REQUEST does not mean DELETION_EXECUTED",
  "DELETION_EXECUTED does not mean DELETION_VERIFIED",
  "DELETION_VERIFIED does not mean TRUTH_PROOF",
  "PURGE_REQUEST does not mean PURGE_EXECUTED",
  "PURGE_EVENT does not mean PURGE_PROOF",
  "ERASURE_REQUEST does not mean LEGAL_ERASURE_COMPLETION",
  "ENCRYPTION_REQUIREMENT does not mean ENCRYPTION_IMPLEMENTED",
  "ENCRYPTED_STORAGE does not mean DELETION",
  "KEY_ROTATION does not mean PURGE",
  "KEY_REVOCATION does not mean LEGAL_ERASURE",
  "PROVIDER_POSTURE does not mean PROVIDER_DELETION_VERIFICATION",
  "RECIPIENT_RESPONSE does not mean RECIPIENT_PURGE_VERIFICATION",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
  "AUDIT_EVENT does not mean CHAIN_OF_CUSTODY",
  "HASH_OR_MANIFEST does not mean DELETION_PROOF",
  "HUMAN_REVIEW does not mean SYSTEM_APPROVAL",
]);

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }

  Object.freeze(value);
  for (const key of Object.keys(value)) {
    deepFreeze(value[key]);
  }

  return value;
}

function cloneAndFreeze(value) {
  if (Array.isArray(value)) {
    return deepFreeze(value.map((item) => cloneAndFreeze(item)));
  }

  if (value && typeof value === "object") {
    return deepFreeze(
      Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, cloneAndFreeze(item)]),
      ),
    );
  }

  return value;
}

function makeAction({
  id,
  label,
  family,
  decisionStatus,
  storageLocationIds,
  materialClasses,
  requiredPrerequisites,
  notes,
}) {
  return Object.freeze({
    id,
    label,
    family,
    decision_status: decisionStatus,
    implementation_statuses: BASE_IMPLEMENTATION_STATUSES,
    required_storage_location_ids: Object.freeze([...storageLocationIds]),
    related_material_classes: Object.freeze([...materialClasses]),
    required_prerequisites: Object.freeze([...requiredPrerequisites]),
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    lifecycle_flags: BASE_LIFECYCLE_FLAGS,
    notes,
  });
}

function makeDependency({
  id,
  storageLocationIds,
  materialClasses,
  lifecycleFamilies,
  currentEvidencePosture,
  decisionStatus,
  requiredPrerequisites,
  requiredTestEvidence,
  notes,
}) {
  return Object.freeze({
    id,
    storage_location_ids: Object.freeze([...storageLocationIds]),
    material_classes: Object.freeze([...materialClasses]),
    lifecycle_families: Object.freeze([...lifecycleFamilies]),
    current_evidence_posture: currentEvidencePosture,
    implementation_statuses: BASE_IMPLEMENTATION_STATUSES,
    decision_status: decisionStatus,
    required_prerequisites: Object.freeze([...requiredPrerequisites]),
    required_test_evidence: Object.freeze([...requiredTestEvidence]),
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    lifecycle_flags: BASE_LIFECYCLE_FLAGS,
    notes,
  });
}

const allPrerequisites = RDE_REQUIRED_PREREQUISITES;
const alignmentEvidence = Object.freeze([
  "registry unit tests",
  "control-plan/registry alignment proof",
  "CI evidence hardening workflow",
]);

const LIFECYCLE_ACTION_CANDIDATES = deepFreeze({
  "RDE-ACTION-001_RETENTION_CLASSIFY": makeAction({
    id: "RDE-ACTION-001_RETENTION_CLASSIFY",
    label: "Retention classify candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.RETENTION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.CANDIDATE_ONLY,
    storageLocationIds: ["L01_REPO_TRACKED_SOURCE_FILES", "L03_REPO_TRACKED_DOCS"],
    materialClasses: [
      MATERIAL_CLASSES.SYNTHETIC_NO_RAW_MATERIAL,
      MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL,
    ],
    requiredPrerequisites: ["complete storage/data-location inventory", "retention categories"],
    notes: "Retention classification candidate only; not retention execution.",
  }),
  "RDE-ACTION-002_RETENTION_APPLY": makeAction({
    id: "RDE-ACTION-002_RETENTION_APPLY",
    label: "Retention apply candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.RETENTION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.NOT_AUTHORIZED,
    storageLocationIds: ["L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    requiredPrerequisites: allPrerequisites,
    notes: "Retention policy text does not apply retention in runtime storage.",
  }),
  "RDE-ACTION-003_RETENTION_REVALIDATE": makeAction({
    id: "RDE-ACTION-003_RETENTION_REVALIDATE",
    label: "Retention revalidate candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.RETENTION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.GAP_REVIEW_ONLY,
    storageLocationIds: ["L03_REPO_TRACKED_DOCS", "L08_GITHUB_ACTIONS_CI_LOGS"],
    materialClasses: [
      MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL,
      MATERIAL_CLASSES.CI_LOG_OR_WORKFLOW_ARTIFACT,
    ],
    requiredPrerequisites: ["retention categories", "CI test plan"],
    notes: "Retention revalidation does not create currentness proof.",
  }),
  "RDE-ACTION-004_DELETION_REQUEST": makeAction({
    id: "RDE-ACTION-004_DELETION_REQUEST",
    label: "Deletion request candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.DELETION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.REQUEST_ONLY,
    storageLocationIds: ["L03_REPO_TRACKED_DOCS"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    requiredPrerequisites: ["deletion/purge/erasure semantics", "audit/access-log model"],
    notes: "Deletion request does not mean deletion executed.",
  }),
  "RDE-ACTION-005_DELETION_APPROVE": makeAction({
    id: "RDE-ACTION-005_DELETION_APPROVE",
    label: "Deletion approval candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.DELETION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.NOT_AUTHORIZED,
    storageLocationIds: ["L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.AUDIT_ACCESS_EVENT_RECORD],
    requiredPrerequisites: allPrerequisites,
    notes: "No deletion approval is created by this scaffold.",
  }),
  "RDE-ACTION-006_DELETION_EXECUTE": makeAction({
    id: "RDE-ACTION-006_DELETION_EXECUTE",
    label: "Deletion execute candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.DELETION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.NOT_EXECUTED,
    storageLocationIds: ["L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    requiredPrerequisites: allPrerequisites,
    notes: "Deletion execution remains not implemented and not executed.",
  }),
  "RDE-ACTION-007_DELETION_VERIFY": makeAction({
    id: "RDE-ACTION-007_DELETION_VERIFY",
    label: "Deletion verify candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.DELETION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.NOT_VERIFIED,
    storageLocationIds: ["L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.AUDIT_ACCESS_EVENT_RECORD],
    requiredPrerequisites: allPrerequisites,
    notes: "Deletion executed does not mean deletion verified.",
  }),
  "RDE-ACTION-008_PURGE_REQUEST": makeAction({
    id: "RDE-ACTION-008_PURGE_REQUEST",
    label: "Purge request candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.PURGE,
    decisionStatus: LIFECYCLE_DECISION_STATUS.REQUEST_ONLY,
    storageLocationIds: ["L03_REPO_TRACKED_DOCS"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    requiredPrerequisites: ["deletion/purge/erasure semantics"],
    notes: "Purge request does not mean purge executed.",
  }),
  "RDE-ACTION-009_PURGE_EXECUTE": makeAction({
    id: "RDE-ACTION-009_PURGE_EXECUTE",
    label: "Purge execute candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.PURGE,
    decisionStatus: LIFECYCLE_DECISION_STATUS.NOT_EXECUTED,
    storageLocationIds: ["L18_OBJECT_STORAGE_FUTURE", "L19_QUEUE_TEMP_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.GENERATED_ARTIFACT_OR_EXPORT_MATERIAL],
    requiredPrerequisites: allPrerequisites,
    notes: "Purge event does not mean purge proof.",
  }),
  "RDE-ACTION-010_PURGE_VERIFY": makeAction({
    id: "RDE-ACTION-010_PURGE_VERIFY",
    label: "Purge verify candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.PURGE,
    decisionStatus: LIFECYCLE_DECISION_STATUS.NOT_VERIFIED,
    storageLocationIds: ["L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.AUDIT_ACCESS_EVENT_RECORD],
    requiredPrerequisites: allPrerequisites,
    notes: "Purge verification is not created by local logs or audit events.",
  }),
  "RDE-ACTION-011_ERASURE_REQUEST": makeAction({
    id: "RDE-ACTION-011_ERASURE_REQUEST",
    label: "Erasure request candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.ERASURE,
    decisionStatus: LIFECYCLE_DECISION_STATUS.REQUEST_ONLY,
    storageLocationIds: ["L03_REPO_TRACKED_DOCS"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    requiredPrerequisites: ["deletion/purge/erasure semantics"],
    notes: "Erasure request does not mean legal erasure completion.",
  }),
  "RDE-ACTION-012_ERASURE_EXECUTE": makeAction({
    id: "RDE-ACTION-012_ERASURE_EXECUTE",
    label: "Erasure execute candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.ERASURE,
    decisionStatus: LIFECYCLE_DECISION_STATUS.NOT_EXECUTED,
    storageLocationIds: ["L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    requiredPrerequisites: allPrerequisites,
    notes: "Legal erasure completion is not implemented or verified.",
  }),
  "RDE-ACTION-013_ENCRYPTION_APPLY": makeAction({
    id: "RDE-ACTION-013_ENCRYPTION_APPLY",
    label: "Encryption apply candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.ENCRYPTION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_STORAGE_INVENTORY,
    storageLocationIds: ["L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE", "L18_OBJECT_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    requiredPrerequisites: ["encryption/key-management design", "complete storage/data-location inventory"],
    notes: "Encryption requirement does not mean encryption implemented.",
  }),
  "RDE-ACTION-014_KEY_ROTATE": makeAction({
    id: "RDE-ACTION-014_KEY_ROTATE",
    label: "Key rotation candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.KEY_ROTATION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_STORAGE_INVENTORY,
    storageLocationIds: ["L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    requiredPrerequisites: ["encryption/key-management design"],
    notes: "Key rotation does not mean deletion, purge, or erasure.",
  }),
  "RDE-ACTION-015_KEY_REVOKE": makeAction({
    id: "RDE-ACTION-015_KEY_REVOKE",
    label: "Key revocation candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.KEY_REVOCATION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_STORAGE_INVENTORY,
    storageLocationIds: ["L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    requiredPrerequisites: ["encryption/key-management design"],
    notes: "Key revocation does not mean legal erasure.",
  }),
  "RDE-ACTION-016_PROVIDER_DELETION_REQUEST": makeAction({
    id: "RDE-ACTION-016_PROVIDER_DELETION_REQUEST",
    label: "Provider deletion request candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.PROVIDER_DELETION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_PROVIDER_POSTURE,
    storageLocationIds: ["L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL],
    requiredPrerequisites: ["provider lifecycle policy"],
    notes: "Provider posture does not authorize provider deletion.",
  }),
  "RDE-ACTION-017_PROVIDER_DELETION_VERIFY": makeAction({
    id: "RDE-ACTION-017_PROVIDER_DELETION_VERIFY",
    label: "Provider deletion verify candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.PROVIDER_DELETION,
    decisionStatus: LIFECYCLE_DECISION_STATUS.NOT_VERIFIED,
    storageLocationIds: ["L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL],
    requiredPrerequisites: ["provider lifecycle policy", "audit/access-log model"],
    notes: "Provider posture does not mean provider deletion verification.",
  }),
  "RDE-ACTION-018_RECIPIENT_PURGE_RESPONSE": makeAction({
    id: "RDE-ACTION-018_RECIPIENT_PURGE_RESPONSE",
    label: "Recipient purge response candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.RECIPIENT_PURGE,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_RECIPIENT_VERIFICATION,
    storageLocationIds: ["L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.GENERATED_ARTIFACT_OR_EXPORT_MATERIAL],
    requiredPrerequisites: ["recipient purge/compliance verification model"],
    notes: "Recipient response does not mean recipient purge verification.",
  }),
  "RDE-ACTION-019_RECIPIENT_PURGE_VERIFY": makeAction({
    id: "RDE-ACTION-019_RECIPIENT_PURGE_VERIFY",
    label: "Recipient purge verify candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.RECIPIENT_PURGE,
    decisionStatus: LIFECYCLE_DECISION_STATUS.NOT_VERIFIED,
    storageLocationIds: ["L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.GENERATED_ARTIFACT_OR_EXPORT_MATERIAL],
    requiredPrerequisites: ["recipient purge/compliance verification model", "audit/access-log model"],
    notes: "Recipient purge verification is not created by this scaffold.",
  }),
  "RDE-ACTION-020_LEGAL_HOLD_CANDIDATE": makeAction({
    id: "RDE-ACTION-020_LEGAL_HOLD_CANDIDATE",
    label: "Legal hold candidate",
    family: LIFECYCLE_CONTROL_FAMILIES.LEGAL_HOLD,
    decisionStatus: LIFECYCLE_DECISION_STATUS.CANDIDATE_ONLY,
    storageLocationIds: ["L03_REPO_TRACKED_DOCS", "L24_PR_COMMENTS_ISSUES_REVIEW_METADATA"],
    materialClasses: [
      MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL,
      MATERIAL_CLASSES.HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL,
    ],
    requiredPrerequisites: allPrerequisites,
    notes: "Legal hold candidate does not mean legal hold created.",
  }),
});

const RDE_STORAGE_DEPENDENCY_REGISTRY = deepFreeze({
  "RDE-DEP-001_REPO_TRACKED_FILES_RETENTION": makeDependency({
    id: "RDE-DEP-001_REPO_TRACKED_FILES_RETENTION",
    storageLocationIds: ["L01_REPO_TRACKED_SOURCE_FILES", "L02_REPO_TRACKED_TEST_FILES", "L03_REPO_TRACKED_DOCS"],
    materialClasses: [MATERIAL_CLASSES.SYNTHETIC_NO_RAW_MATERIAL, MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.REGISTRY_SCAFFOLD_EVIDENCE,
    decisionStatus: LIFECYCLE_DECISION_STATUS.POLICY_TEXT_ONLY,
    requiredPrerequisites: ["retention categories", "CI test plan"],
    requiredTestEvidence: alignmentEvidence,
    notes: "Repo tracked file retention remains policy/scaffold evidence only.",
  }),
  "RDE-DEP-002_CI_LOG_RETENTION": makeDependency({
    id: "RDE-DEP-002_CI_LOG_RETENTION",
    storageLocationIds: ["L08_GITHUB_ACTIONS_CI_LOGS", "L09_GITHUB_ACTIONS_CI_ARTIFACTS"],
    materialClasses: [MATERIAL_CLASSES.CI_LOG_OR_WORKFLOW_ARTIFACT],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.CI_TESTED_SCENARIO_EVIDENCE,
    decisionStatus: LIFECYCLE_DECISION_STATUS.POLICY_TEXT_ONLY,
    requiredPrerequisites: ["log retention/deletion policy", "CI test plan"],
    requiredTestEvidence: alignmentEvidence,
    notes: "CI logs are CI evidence only and not release evidence.",
  }),
  "RDE-DEP-003_LOCAL_LOG_RETENTION": makeDependency({
    id: "RDE-DEP-003_LOCAL_LOG_RETENTION",
    storageLocationIds: ["L10_LOCAL_TEST_LOGS"],
    materialClasses: [MATERIAL_CLASSES.LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION, LIFECYCLE_CONTROL_FAMILIES.DELETION],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_STORAGE_INVENTORY,
    requiredPrerequisites: ["log retention/deletion policy", "complete storage/data-location inventory"],
    requiredTestEvidence: alignmentEvidence,
    notes: "Local logs are not CI evidence and cannot prove deletion or purge.",
  }),
  "RDE-DEP-004_GENERATED_ARTIFACT_LIFECYCLE": makeDependency({
    id: "RDE-DEP-004_GENERATED_ARTIFACT_LIFECYCLE",
    storageLocationIds: ["L12_LOCAL_GENERATED_ARTIFACTS"],
    materialClasses: [MATERIAL_CLASSES.GENERATED_ARTIFACT_OR_EXPORT_MATERIAL],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.DELETION, LIFECYCLE_CONTROL_FAMILIES.PURGE],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    decisionStatus: LIFECYCLE_DECISION_STATUS.CANDIDATE_ONLY,
    requiredPrerequisites: ["deletion/purge/erasure semantics", "CI test plan"],
    requiredTestEvidence: alignmentEvidence,
    notes: "Generated artifact lifecycle does not authorize external use or approved packets.",
  }),
  "RDE-DEP-005_EXPORT_PACKAGE_LIFECYCLE": makeDependency({
    id: "RDE-DEP-005_EXPORT_PACKAGE_LIFECYCLE",
    storageLocationIds: ["L13_LOCAL_EXPORT_PACKAGES", "L14_LOCAL_ARCHIVES_OR_ZIPS"],
    materialClasses: [MATERIAL_CLASSES.GENERATED_ARTIFACT_OR_EXPORT_MATERIAL],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.DELETION, LIFECYCLE_CONTROL_FAMILIES.PURGE, LIFECYCLE_CONTROL_FAMILIES.ARCHIVE],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    decisionStatus: LIFECYCLE_DECISION_STATUS.CANDIDATE_ONLY,
    requiredPrerequisites: ["deletion/purge/erasure semantics", "non-proof/non-chain-of-custody wording"],
    requiredTestEvidence: alignmentEvidence,
    notes: "Export package lifecycle does not create release approval.",
  }),
  "RDE-DEP-006_LOCAL_UNTRACKED_FILES_UNKNOWN": makeDependency({
    id: "RDE-DEP-006_LOCAL_UNTRACKED_FILES_UNKNOWN",
    storageLocationIds: ["L11_LOCAL_UNTRACKED_FILES"],
    materialClasses: [MATERIAL_CLASSES.RAW_PRIVATE_SOURCE_MATERIAL, MATERIAL_CLASSES.SOURCE_PACKAGE_MATERIAL],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION, LIFECYCLE_CONTROL_FAMILIES.DELETION],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
    decisionStatus: LIFECYCLE_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
    requiredPrerequisites: allPrerequisites,
    requiredTestEvidence: alignmentEvidence,
    notes: "Local untracked files remain present, not inspected, not relied on, and not authorized.",
  }),
  "RDE-DEP-007_FUTURE_DATABASE_LIFECYCLE": makeDependency({
    id: "RDE-DEP-007_FUTURE_DATABASE_LIFECYCLE",
    storageLocationIds: ["L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION, LIFECYCLE_CONTROL_FAMILIES.DELETION, LIFECYCLE_CONTROL_FAMILIES.ERASURE, LIFECYCLE_CONTROL_FAMILIES.ENCRYPTION],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_STORAGE_INVENTORY,
    requiredPrerequisites: allPrerequisites,
    requiredTestEvidence: alignmentEvidence,
    notes: "Future database lifecycle remains a candidate only and not implemented.",
  }),
  "RDE-DEP-008_FUTURE_OBJECT_STORAGE_LIFECYCLE": makeDependency({
    id: "RDE-DEP-008_FUTURE_OBJECT_STORAGE_LIFECYCLE",
    storageLocationIds: ["L18_OBJECT_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.GENERATED_ARTIFACT_OR_EXPORT_MATERIAL],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION, LIFECYCLE_CONTROL_FAMILIES.PURGE, LIFECYCLE_CONTROL_FAMILIES.ENCRYPTION],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_STORAGE_INVENTORY,
    requiredPrerequisites: allPrerequisites,
    requiredTestEvidence: alignmentEvidence,
    notes: "Future object storage lifecycle remains not implemented.",
  }),
  "RDE-DEP-009_FUTURE_QUEUE_TEMP_STORAGE_LIFECYCLE": makeDependency({
    id: "RDE-DEP-009_FUTURE_QUEUE_TEMP_STORAGE_LIFECYCLE",
    storageLocationIds: ["L19_QUEUE_TEMP_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.PURGE, LIFECYCLE_CONTROL_FAMILIES.ERASURE],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_STORAGE_INVENTORY,
    requiredPrerequisites: allPrerequisites,
    requiredTestEvidence: alignmentEvidence,
    notes: "Future queue/temp lifecycle is not purge execution.",
  }),
  "RDE-DEP-010_FUTURE_AUDIT_LOG_STORAGE_LIFECYCLE": makeDependency({
    id: "RDE-DEP-010_FUTURE_AUDIT_LOG_STORAGE_LIFECYCLE",
    storageLocationIds: ["L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.AUDIT_ACCESS_EVENT_RECORD],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION, LIFECYCLE_CONTROL_FAMILIES.DELETION],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_AUDIT_ACCESS_LOG,
    requiredPrerequisites: ["audit/access-log model", "log retention/deletion policy"],
    requiredTestEvidence: alignmentEvidence,
    notes: "Audit-log storage remains future and not implemented.",
  }),
  "RDE-DEP-011_BACKUP_SNAPSHOT_LIFECYCLE": makeDependency({
    id: "RDE-DEP-011_BACKUP_SNAPSHOT_LIFECYCLE",
    storageLocationIds: ["L21_BACKUP_SNAPSHOT_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION, LIFECYCLE_CONTROL_FAMILIES.DELETION, LIFECYCLE_CONTROL_FAMILIES.PURGE],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_STORAGE_INVENTORY,
    requiredPrerequisites: allPrerequisites,
    requiredTestEvidence: alignmentEvidence,
    notes: "Backup/snapshot lifecycle does not create chain of custody.",
  }),
  "RDE-DEP-012_PROVIDER_STORAGE_LIFECYCLE": makeDependency({
    id: "RDE-DEP-012_PROVIDER_STORAGE_LIFECYCLE",
    storageLocationIds: ["L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"],
    materialClasses: [
      MATERIAL_CLASSES.THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
      MATERIAL_CLASSES.PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL,
    ],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.PROVIDER_DELETION],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_PROVIDER_POSTURE,
    requiredPrerequisites: ["provider lifecycle policy"],
    requiredTestEvidence: alignmentEvidence,
    notes: "Provider storage remains future and provider routing is not authorized.",
  }),
  "RDE-DEP-013_RECIPIENT_DOWNSTREAM_STORAGE_LIFECYCLE": makeDependency({
    id: "RDE-DEP-013_RECIPIENT_DOWNSTREAM_STORAGE_LIFECYCLE",
    storageLocationIds: ["L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE"],
    materialClasses: [MATERIAL_CLASSES.GENERATED_ARTIFACT_OR_EXPORT_MATERIAL],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RECIPIENT_PURGE],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    decisionStatus: LIFECYCLE_DECISION_STATUS.BLOCKED_BY_RECIPIENT_VERIFICATION,
    requiredPrerequisites: ["recipient purge/compliance verification model"],
    requiredTestEvidence: alignmentEvidence,
    notes: "Recipient downstream storage remains future and not authorized.",
  }),
  "RDE-DEP-014_TOKEN_URL_SECRET_LIFECYCLE": makeDependency({
    id: "RDE-DEP-014_TOKEN_URL_SECRET_LIFECYCLE",
    storageLocationIds: ["L25_CONNECTOR_TOOL_OR_AGENT_STATE"],
    materialClasses: [MATERIAL_CLASSES.TOKEN_URL_SECRET_MATERIAL],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.DELETION, LIFECYCLE_CONTROL_FAMILIES.KEY_REVOCATION],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
    decisionStatus: LIFECYCLE_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
    requiredPrerequisites: allPrerequisites,
    requiredTestEvidence: alignmentEvidence,
    notes: "Token/URL/secret lifecycle is denied and not handled by this scaffold.",
  }),
  "RDE-DEP-015_RAW_PRIVATE_SOURCE_LIFECYCLE": makeDependency({
    id: "RDE-DEP-015_RAW_PRIVATE_SOURCE_LIFECYCLE",
    storageLocationIds: ["L11_LOCAL_UNTRACKED_FILES"],
    materialClasses: [
      MATERIAL_CLASSES.RAW_PRIVATE_SOURCE_MATERIAL,
      MATERIAL_CLASSES.SOURCE_PACKAGE_MATERIAL,
      MATERIAL_CLASSES.PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL,
    ],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION, LIFECYCLE_CONTROL_FAMILIES.ERASURE],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
    decisionStatus: LIFECYCLE_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
    requiredPrerequisites: allPrerequisites,
    requiredTestEvidence: alignmentEvidence,
    notes: "Raw/private/source material is not inspected, not relied on, and not authorized.",
  }),
  "RDE-DEP-016_PACKAGE_LOCK_BUILD_METADATA_LIFECYCLE": makeDependency({
    id: "RDE-DEP-016_PACKAGE_LOCK_BUILD_METADATA_LIFECYCLE",
    storageLocationIds: ["L05_REPO_PACKAGE_MANIFESTS", "L06_REPO_LOCKFILE"],
    materialClasses: [MATERIAL_CLASSES.PACKAGE_LOCK_OR_BUILD_METADATA],
    lifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
    currentEvidencePosture: LIFECYCLE_EVIDENCE_POSTURE.TESTED_ALIGNMENT_EVIDENCE,
    decisionStatus: LIFECYCLE_DECISION_STATUS.POLICY_TEXT_ONLY,
    requiredPrerequisites: ["CI test plan", "non-proof/non-chain-of-custody wording"],
    requiredTestEvidence: alignmentEvidence,
    notes: "Package-lock/build metadata is not supply-chain security approval or deletion proof.",
  }),
});

function listLifecycleControlFamilies() {
  return cloneAndFreeze(Object.values(LIFECYCLE_CONTROL_FAMILIES));
}

function listLifecycleActionCandidates() {
  return cloneAndFreeze(Object.values(LIFECYCLE_ACTION_CANDIDATES));
}

function getLifecycleActionCandidate(id) {
  const entry = LIFECYCLE_ACTION_CANDIDATES[id];

  if (!entry) {
    return cloneAndFreeze({
      id,
      family: LIFECYCLE_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
      decision_status: LIFECYCLE_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
      implementation_statuses: [
        LIFECYCLE_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
      ],
      required_storage_location_ids: [],
      related_material_classes: [],
      required_prerequisites: allPrerequisites,
      non_authorizations: BASE_NON_AUTHORIZATIONS,
      lifecycle_flags: BASE_LIFECYCLE_FLAGS,
      notes: "Unknown lifecycle action is not evidenced and not authorized.",
    });
  }

  return cloneAndFreeze(entry);
}

function classifyLifecycleAction(id) {
  const entry = getLifecycleActionCandidate(id);
  return cloneAndFreeze({
    id: entry.id,
    family: entry.family,
    decision_status: entry.decision_status,
    implementation_statuses: entry.implementation_statuses,
    authorized: false,
  });
}

function hasLifecycleActionCandidate(id) {
  return Object.prototype.hasOwnProperty.call(LIFECYCLE_ACTION_CANDIDATES, id);
}

function listRdeStorageDependencies() {
  return cloneAndFreeze(Object.values(RDE_STORAGE_DEPENDENCY_REGISTRY));
}

function getRdeStorageDependency(id) {
  const entry = RDE_STORAGE_DEPENDENCY_REGISTRY[id];

  if (!entry) {
    return cloneAndFreeze({
      id,
      storage_location_ids: [],
      material_classes: [],
      lifecycle_families: [],
      current_evidence_posture: LIFECYCLE_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
      implementation_statuses: [
        LIFECYCLE_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
      ],
      decision_status: LIFECYCLE_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
      required_prerequisites: allPrerequisites,
      required_test_evidence: [],
      non_authorizations: BASE_NON_AUTHORIZATIONS,
      lifecycle_flags: BASE_LIFECYCLE_FLAGS,
      notes: "Unknown storage dependency is not evidenced and not authorized.",
    });
  }

  return cloneAndFreeze(entry);
}

function classifyRdeStorageDependency(id) {
  const entry = getRdeStorageDependency(id);
  return cloneAndFreeze({
    id: entry.id,
    current_evidence_posture: entry.current_evidence_posture,
    decision_status: entry.decision_status,
    implementation_statuses: entry.implementation_statuses,
    authorized: false,
  });
}

function hasRdeStorageDependency(id) {
  return Object.prototype.hasOwnProperty.call(RDE_STORAGE_DEPENDENCY_REGISTRY, id);
}

function listRdeNonOverclaimRules() {
  return cloneAndFreeze(RDE_NON_OVERCLAIM_RULES);
}

function getRdeRequiredPrerequisites() {
  return cloneAndFreeze(RDE_REQUIRED_PREREQUISITES);
}

function getRdeNonAuthorizationStatus() {
  return cloneAndFreeze({
    ...BASE_NON_AUTHORIZATIONS,
    ...BASE_LIFECYCLE_FLAGS,
    retention_implementation_created: false,
    deletion_implementation_created: false,
    purge_implementation_created: false,
    erasure_implementation_created: false,
    encryption_implementation_created: false,
    key_management_implementation_created: false,
    chain_of_custody_created: false,
    evidentiary_record_created: false,
    source_truth_created: false,
    runtime_lifecycle_execution_created: false,
  });
}

function isLifecycleImplementationCreated() {
  return false;
}

function isLifecycleActionAuthorized() {
  return false;
}

module.exports = {
  LIFECYCLE_ACTION_CANDIDATES,
  LIFECYCLE_CONTROL_FAMILIES,
  LIFECYCLE_DECISION_STATUS,
  LIFECYCLE_EVIDENCE_POSTURE,
  LIFECYCLE_IMPLEMENTATION_STATUS,
  RDE_NON_OVERCLAIM_RULES,
  RDE_REQUIRED_PREREQUISITES,
  RDE_STORAGE_DEPENDENCY_REGISTRY,
  classifyLifecycleAction,
  classifyRdeStorageDependency,
  getLifecycleActionCandidate,
  getRdeNonAuthorizationStatus,
  getRdeRequiredPrerequisites,
  getRdeStorageDependency,
  hasLifecycleActionCandidate,
  hasRdeStorageDependency,
  isLifecycleActionAuthorized,
  isLifecycleImplementationCreated,
  listLifecycleActionCandidates,
  listLifecycleControlFamilies,
  listRdeNonOverclaimRules,
  listRdeStorageDependencies,
  storageDataLocationRegistry: DATA_LOCATION_REGISTRY,
  storageMaterialClasses: MATERIAL_CLASSES,
  storageHighRiskMaterialClassesDenied: HIGH_RISK_MATERIAL_CLASSES_DENIED,
};
