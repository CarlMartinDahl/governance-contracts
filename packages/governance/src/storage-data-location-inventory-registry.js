"use strict";

const DATA_LOCATION_STATUS = Object.freeze({
  CURRENT_REPO_TRACKED: "CURRENT_REPO_TRACKED",
  CURRENT_CI_PLATFORM: "CURRENT_CI_PLATFORM",
  CURRENT_LOCAL_UNTRACKED_NOT_INSPECTED: "CURRENT_LOCAL_UNTRACKED_NOT_INSPECTED",
  FUTURE_RUNTIME_CANDIDATE: "FUTURE_RUNTIME_CANDIDATE",
  FUTURE_PROVIDER_OR_RECIPIENT_CANDIDATE:
    "FUTURE_PROVIDER_OR_RECIPIENT_CANDIDATE",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const EVIDENCE_POSTURE = Object.freeze({
  REPO_EVIDENCE: "REPO_EVIDENCE",
  CI_EVIDENCE: "CI_EVIDENCE",
  LOCAL_TRANSCRIPT_EVIDENCE_ONLY: "LOCAL_TRANSCRIPT_EVIDENCE_ONLY",
  DOCS_ONLY_CONTROL_PLAN: "DOCS_ONLY_CONTROL_PLAN",
  FUTURE_CANDIDATE_ONLY: "FUTURE_CANDIDATE_ONLY",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const STORAGE_IMPLEMENTATION_STATUS = Object.freeze({
  NOT_STORAGE_IMPLEMENTATION: "NOT_STORAGE_IMPLEMENTATION",
  NOT_DATABASE_IMPLEMENTATION: "NOT_DATABASE_IMPLEMENTATION",
  NOT_OBJECT_STORAGE_IMPLEMENTATION: "NOT_OBJECT_STORAGE_IMPLEMENTATION",
  NOT_AUDIT_LOG_STORAGE: "NOT_AUDIT_LOG_STORAGE",
  NOT_RETENTION_IMPLEMENTATION: "NOT_RETENTION_IMPLEMENTATION",
  NOT_DELETION_IMPLEMENTATION: "NOT_DELETION_IMPLEMENTATION",
  NOT_PURGE_IMPLEMENTATION: "NOT_PURGE_IMPLEMENTATION",
  NOT_ERASURE_IMPLEMENTATION: "NOT_ERASURE_IMPLEMENTATION",
  NOT_ENCRYPTION_IMPLEMENTATION: "NOT_ENCRYPTION_IMPLEMENTATION",
  NOT_KEY_MANAGEMENT_IMPLEMENTATION: "NOT_KEY_MANAGEMENT_IMPLEMENTATION",
});

const MATERIAL_CLASSES = Object.freeze({
  SYNTHETIC_NO_RAW_MATERIAL: "SYNTHETIC_NO_RAW_MATERIAL",
  SANITIZED_TEXT_PRIMARY_MATERIAL: "SANITIZED_TEXT_PRIMARY_MATERIAL",
  REDACTED_REVIEW_SIGNAL_MATERIAL: "REDACTED_REVIEW_SIGNAL_MATERIAL",
  NO_RAW_METADATA_MANIFEST_MATERIAL: "NO_RAW_METADATA_MANIFEST_MATERIAL",
  GENERATED_ARTIFACT_OR_EXPORT_MATERIAL: "GENERATED_ARTIFACT_OR_EXPORT_MATERIAL",
  LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL: "LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
  CI_LOG_OR_WORKFLOW_ARTIFACT: "CI_LOG_OR_WORKFLOW_ARTIFACT",
  HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL:
    "HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
  RAW_PRIVATE_SOURCE_MATERIAL: "RAW_PRIVATE_SOURCE_MATERIAL",
  SOURCE_PACKAGE_MATERIAL: "SOURCE_PACKAGE_MATERIAL",
  PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL:
    "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
  THIRD_PARTY_MODEL_API_ROUTED_MATERIAL: "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
  PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL:
    "PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL",
  TOKEN_URL_SECRET_MATERIAL: "TOKEN_URL_SECRET_MATERIAL",
  AUDIT_ACCESS_EVENT_RECORD: "AUDIT_ACCESS_EVENT_RECORD",
  PACKAGE_LOCK_OR_BUILD_METADATA: "PACKAGE_LOCK_OR_BUILD_METADATA",
});

const BASE_NON_AUTHORIZATIONS = Object.freeze({
  authorized: false,
  external_use_authorized: false,
  product_candidate_authorized: false,
  release_approved: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
  provider_routing_authorized: false,
  real_private_case_processing_authorized: false,
});

const BASE_IMPLEMENTATION_STATUSES = Object.freeze([
  STORAGE_IMPLEMENTATION_STATUS.NOT_STORAGE_IMPLEMENTATION,
  STORAGE_IMPLEMENTATION_STATUS.NOT_DATABASE_IMPLEMENTATION,
  STORAGE_IMPLEMENTATION_STATUS.NOT_OBJECT_STORAGE_IMPLEMENTATION,
  STORAGE_IMPLEMENTATION_STATUS.NOT_AUDIT_LOG_STORAGE,
  STORAGE_IMPLEMENTATION_STATUS.NOT_RETENTION_IMPLEMENTATION,
  STORAGE_IMPLEMENTATION_STATUS.NOT_DELETION_IMPLEMENTATION,
  STORAGE_IMPLEMENTATION_STATUS.NOT_PURGE_IMPLEMENTATION,
  STORAGE_IMPLEMENTATION_STATUS.NOT_ERASURE_IMPLEMENTATION,
  STORAGE_IMPLEMENTATION_STATUS.NOT_ENCRYPTION_IMPLEMENTATION,
  STORAGE_IMPLEMENTATION_STATUS.NOT_KEY_MANAGEMENT_IMPLEMENTATION,
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

function makeHighRiskDenial(materialClass) {
  return Object.freeze({
    material_class: materialClass,
    denied: true,
    ...BASE_NON_AUTHORIZATIONS,
    evidence_posture: EVIDENCE_POSTURE.DOCS_ONLY_CONTROL_PLAN,
  });
}

const HIGH_RISK_MATERIAL_CLASSES_DENIED = deepFreeze({
  RAW_PRIVATE_SOURCE_MATERIAL: makeHighRiskDenial(
    MATERIAL_CLASSES.RAW_PRIVATE_SOURCE_MATERIAL,
  ),
  SOURCE_PACKAGE_MATERIAL: makeHighRiskDenial(MATERIAL_CLASSES.SOURCE_PACKAGE_MATERIAL),
  PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL: makeHighRiskDenial(
    MATERIAL_CLASSES.PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL,
  ),
  THIRD_PARTY_MODEL_API_ROUTED_MATERIAL: makeHighRiskDenial(
    MATERIAL_CLASSES.THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
  ),
  PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL: makeHighRiskDenial(
    MATERIAL_CLASSES.PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL,
  ),
  TOKEN_URL_SECRET_MATERIAL: makeHighRiskDenial(
    MATERIAL_CLASSES.TOKEN_URL_SECRET_MATERIAL,
  ),
});

function makeLocation(id, label, status, evidencePosture, allowed, prohibited, notes) {
  return Object.freeze({
    id,
    label,
    status,
    evidence_posture: evidencePosture,
    allowed_material_classes: Object.freeze([...allowed]),
    prohibited_material_classes: Object.freeze([...prohibited]),
    implementation_statuses: BASE_IMPLEMENTATION_STATUSES,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    notes,
  });
}

const highRiskMaterialClassKeys = Object.freeze(
  Object.keys(HIGH_RISK_MATERIAL_CLASSES_DENIED),
);

const repoEvidenceAllowed = Object.freeze([
  MATERIAL_CLASSES.SYNTHETIC_NO_RAW_MATERIAL,
  MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL,
  MATERIAL_CLASSES.PACKAGE_LOCK_OR_BUILD_METADATA,
]);

const generatedArtifactAllowed = Object.freeze([
  MATERIAL_CLASSES.GENERATED_ARTIFACT_OR_EXPORT_MATERIAL,
  MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL,
]);

const DATA_LOCATION_REGISTRY = deepFreeze({
  L01_REPO_TRACKED_SOURCE_FILES: makeLocation(
    "L01_REPO_TRACKED_SOURCE_FILES",
    "Repo tracked source files",
    DATA_LOCATION_STATUS.CURRENT_REPO_TRACKED,
    EVIDENCE_POSTURE.REPO_EVIDENCE,
    [MATERIAL_CLASSES.SYNTHETIC_NO_RAW_MATERIAL, MATERIAL_CLASSES.PACKAGE_LOCK_OR_BUILD_METADATA],
    highRiskMaterialClassKeys,
    "Tracked source/config evidence only; not runtime storage.",
  ),
  L02_REPO_TRACKED_TEST_FILES: makeLocation(
    "L02_REPO_TRACKED_TEST_FILES",
    "Repo tracked test files",
    DATA_LOCATION_STATUS.CURRENT_REPO_TRACKED,
    EVIDENCE_POSTURE.REPO_EVIDENCE,
    [MATERIAL_CLASSES.SYNTHETIC_NO_RAW_MATERIAL],
    highRiskMaterialClassKeys,
    "Tracked tests prove only explicit assertions.",
  ),
  L03_REPO_TRACKED_DOCS: makeLocation(
    "L03_REPO_TRACKED_DOCS",
    "Repo tracked docs",
    DATA_LOCATION_STATUS.CURRENT_REPO_TRACKED,
    EVIDENCE_POSTURE.DOCS_ONLY_CONTROL_PLAN,
    [MATERIAL_CLASSES.SANITIZED_TEXT_PRIMARY_MATERIAL, MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    highRiskMaterialClassKeys,
    "Docs are contract evidence, not execution or release approval.",
  ),
  L04_REPO_TRACKED_SCHEMAS: makeLocation(
    "L04_REPO_TRACKED_SCHEMAS",
    "Repo tracked schemas",
    DATA_LOCATION_STATUS.CURRENT_REPO_TRACKED,
    EVIDENCE_POSTURE.REPO_EVIDENCE,
    [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    highRiskMaterialClassKeys,
    "Machine-readable contracts only.",
  ),
  L05_REPO_PACKAGE_MANIFESTS: makeLocation(
    "L05_REPO_PACKAGE_MANIFESTS",
    "Repo package manifests",
    DATA_LOCATION_STATUS.CURRENT_REPO_TRACKED,
    EVIDENCE_POSTURE.REPO_EVIDENCE,
    [MATERIAL_CLASSES.PACKAGE_LOCK_OR_BUILD_METADATA],
    highRiskMaterialClassKeys,
    "Dependency metadata is not supply-chain security approval.",
  ),
  L06_REPO_LOCKFILE: makeLocation(
    "L06_REPO_LOCKFILE",
    "Repo lockfile",
    DATA_LOCATION_STATUS.CURRENT_REPO_TRACKED,
    EVIDENCE_POSTURE.REPO_EVIDENCE,
    [MATERIAL_CLASSES.PACKAGE_LOCK_OR_BUILD_METADATA],
    highRiskMaterialClassKeys,
    "Deterministic install evidence; not truth proof or security approval.",
  ),
  L07_GITHUB_ACTIONS_WORKFLOWS: makeLocation(
    "L07_GITHUB_ACTIONS_WORKFLOWS",
    "GitHub Actions workflows",
    DATA_LOCATION_STATUS.CURRENT_REPO_TRACKED,
    EVIDENCE_POSTURE.REPO_EVIDENCE,
    [MATERIAL_CLASSES.CI_LOG_OR_WORKFLOW_ARTIFACT],
    highRiskMaterialClassKeys,
    "CI path definition only; not a release gate.",
  ),
  L08_GITHUB_ACTIONS_CI_LOGS: makeLocation(
    "L08_GITHUB_ACTIONS_CI_LOGS",
    "GitHub Actions CI logs",
    DATA_LOCATION_STATUS.CURRENT_CI_PLATFORM,
    EVIDENCE_POSTURE.CI_EVIDENCE,
    [MATERIAL_CLASSES.CI_LOG_OR_WORKFLOW_ARTIFACT],
    highRiskMaterialClassKeys,
    "CI evidence only; not release evidence.",
  ),
  L09_GITHUB_ACTIONS_CI_ARTIFACTS: makeLocation(
    "L09_GITHUB_ACTIONS_CI_ARTIFACTS",
    "GitHub Actions CI artifacts",
    DATA_LOCATION_STATUS.CURRENT_CI_PLATFORM,
    EVIDENCE_POSTURE.CI_EVIDENCE,
    [MATERIAL_CLASSES.CI_LOG_OR_WORKFLOW_ARTIFACT],
    highRiskMaterialClassKeys,
    "CI artifact candidate only; not a release packet.",
  ),
  L10_LOCAL_TEST_LOGS: makeLocation(
    "L10_LOCAL_TEST_LOGS",
    "Local test logs",
    DATA_LOCATION_STATUS.CURRENT_LOCAL_UNTRACKED_NOT_INSPECTED,
    EVIDENCE_POSTURE.LOCAL_TRANSCRIPT_EVIDENCE_ONLY,
    [MATERIAL_CLASSES.LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL],
    highRiskMaterialClassKeys,
    "Local transcript evidence only; not CI evidence.",
  ),
  L11_LOCAL_UNTRACKED_FILES: makeLocation(
    "L11_LOCAL_UNTRACKED_FILES",
    "Local untracked files",
    DATA_LOCATION_STATUS.CURRENT_LOCAL_UNTRACKED_NOT_INSPECTED,
    EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
    [],
    Object.values(MATERIAL_CLASSES),
    "Present, not inspected, and not relied on.",
  ),
  L12_LOCAL_GENERATED_ARTIFACTS: makeLocation(
    "L12_LOCAL_GENERATED_ARTIFACTS",
    "Local generated artifacts",
    DATA_LOCATION_STATUS.CURRENT_LOCAL_UNTRACKED_NOT_INSPECTED,
    EVIDENCE_POSTURE.LOCAL_TRANSCRIPT_EVIDENCE_ONLY,
    generatedArtifactAllowed,
    highRiskMaterialClassKeys,
    "Generated artifact candidate only; not external use.",
  ),
  L13_LOCAL_EXPORT_PACKAGES: makeLocation(
    "L13_LOCAL_EXPORT_PACKAGES",
    "Local export packages",
    DATA_LOCATION_STATUS.CURRENT_LOCAL_UNTRACKED_NOT_INSPECTED,
    EVIDENCE_POSTURE.LOCAL_TRANSCRIPT_EVIDENCE_ONLY,
    generatedArtifactAllowed,
    highRiskMaterialClassKeys,
    "Local package candidate only; not delivery authorization.",
  ),
  L14_LOCAL_ARCHIVES_OR_ZIPS: makeLocation(
    "L14_LOCAL_ARCHIVES_OR_ZIPS",
    "Local archives or zips",
    DATA_LOCATION_STATUS.CURRENT_LOCAL_UNTRACKED_NOT_INSPECTED,
    EVIDENCE_POSTURE.LOCAL_TRANSCRIPT_EVIDENCE_ONLY,
    generatedArtifactAllowed,
    highRiskMaterialClassKeys,
    "Local archive candidate only; not product readiness.",
  ),
  L15_NODE_MODULES_OR_PACKAGE_CACHE: makeLocation(
    "L15_NODE_MODULES_OR_PACKAGE_CACHE",
    "Node modules or package cache",
    DATA_LOCATION_STATUS.CURRENT_LOCAL_UNTRACKED_NOT_INSPECTED,
    EVIDENCE_POSTURE.LOCAL_TRANSCRIPT_EVIDENCE_ONLY,
    [MATERIAL_CLASSES.PACKAGE_LOCK_OR_BUILD_METADATA],
    highRiskMaterialClassKeys,
    "Package cache is not security approval or source truth.",
  ),
  L16_OPERATOR_UI_CACHE_FUTURE: makeLocation(
    "L16_OPERATOR_UI_CACHE_FUTURE",
    "Operator UI cache",
    DATA_LOCATION_STATUS.FUTURE_RUNTIME_CANDIDATE,
    EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    [MATERIAL_CLASSES.HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL],
    highRiskMaterialClassKeys,
    "Future candidate only; no runtime cache is implemented.",
  ),
  L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE: makeLocation(
    "L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE",
    "Database or persisted storage",
    DATA_LOCATION_STATUS.FUTURE_RUNTIME_CANDIDATE,
    EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    [MATERIAL_CLASSES.AUDIT_ACCESS_EVENT_RECORD, MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    highRiskMaterialClassKeys,
    "Future database candidate only; no persisted storage implementation.",
  ),
  L18_OBJECT_STORAGE_FUTURE: makeLocation(
    "L18_OBJECT_STORAGE_FUTURE",
    "Object storage",
    DATA_LOCATION_STATUS.FUTURE_RUNTIME_CANDIDATE,
    EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    generatedArtifactAllowed,
    highRiskMaterialClassKeys,
    "Future object-storage candidate only; no export storage implementation.",
  ),
  L19_QUEUE_TEMP_STORAGE_FUTURE: makeLocation(
    "L19_QUEUE_TEMP_STORAGE_FUTURE",
    "Queue/temp storage",
    DATA_LOCATION_STATUS.FUTURE_RUNTIME_CANDIDATE,
    EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    highRiskMaterialClassKeys,
    "Future queue/temp candidate only; no runtime queue implementation.",
  ),
  L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE: makeLocation(
    "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
    "Audit/access log storage",
    DATA_LOCATION_STATUS.FUTURE_RUNTIME_CANDIDATE,
    EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    [MATERIAL_CLASSES.AUDIT_ACCESS_EVENT_RECORD],
    highRiskMaterialClassKeys,
    "Future audit-log storage candidate only; audit-log storage is not implemented.",
  ),
  L21_BACKUP_SNAPSHOT_STORAGE_FUTURE: makeLocation(
    "L21_BACKUP_SNAPSHOT_STORAGE_FUTURE",
    "Backup/snapshot storage",
    DATA_LOCATION_STATUS.FUTURE_RUNTIME_CANDIDATE,
    EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    highRiskMaterialClassKeys,
    "Future backup/snapshot candidate only; no lifecycle proof.",
  ),
  L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE: makeLocation(
    "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
    "Third-party provider storage",
    DATA_LOCATION_STATUS.FUTURE_PROVIDER_OR_RECIPIENT_CANDIDATE,
    EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    [],
    highRiskMaterialClassKeys,
    "Provider storage remains a future candidate and provider routing is not authorized.",
  ),
  L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE: makeLocation(
    "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
    "Recipient downstream storage",
    DATA_LOCATION_STATUS.FUTURE_PROVIDER_OR_RECIPIENT_CANDIDATE,
    EVIDENCE_POSTURE.FUTURE_CANDIDATE_ONLY,
    [MATERIAL_CLASSES.GENERATED_ARTIFACT_OR_EXPORT_MATERIAL],
    highRiskMaterialClassKeys,
    "Recipient storage remains a future candidate and recipient compliance is not verified.",
  ),
  L24_PR_COMMENTS_ISSUES_REVIEW_METADATA: makeLocation(
    "L24_PR_COMMENTS_ISSUES_REVIEW_METADATA",
    "PR comments/issues/review metadata",
    DATA_LOCATION_STATUS.CURRENT_CI_PLATFORM,
    EVIDENCE_POSTURE.REPO_EVIDENCE,
    [MATERIAL_CLASSES.REDACTED_REVIEW_SIGNAL_MATERIAL, MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    highRiskMaterialClassKeys,
    "Review metadata only; not approval or sign-off.",
  ),
  L25_CONNECTOR_TOOL_OR_AGENT_STATE: makeLocation(
    "L25_CONNECTOR_TOOL_OR_AGENT_STATE",
    "Connector/tool/agent state",
    DATA_LOCATION_STATUS.UNKNOWN_NOT_EVIDENCED,
    EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
    [MATERIAL_CLASSES.NO_RAW_METADATA_MANIFEST_MATERIAL],
    highRiskMaterialClassKeys,
    "Tool state is not source truth, release evidence, or runtime certification.",
  ),
});

const REQUIRED_INVENTORY_FIELDS = Object.freeze([
  "location ID",
  "storage type",
  "current/future status",
  "owner/controller",
  "actor access categories",
  "material classes allowed",
  "material classes prohibited",
  "tenant/case/object/function/property scope",
  "raw/private/source risk",
  "source-locator risk",
  "token/URL/secret risk",
  "retention category",
  "deletion support",
  "purge support",
  "erasure relation",
  "encryption requirement",
  "key-management relation",
  "audit/access-log relation",
  "backup/snapshot relation",
  "provider/recipient relation",
  "CI/local/release evidence relation",
  "current evidence level",
  "implementation gap",
  "required tests before closure",
  "non-authorized until closure",
]);

const DEPENDENCY_MAP = Object.freeze([
  "RBAC/access-control",
  "admin/support access",
  "audit/access logs",
  "retention/deletion/purge/erasure",
  "encryption/key management",
  "provider routing",
  "recipient/downstream purge verification",
  "internal sanitized pilot runtime",
]);

const NON_OVERCLAIM_RULES = Object.freeze([
  "STORAGE_INVENTORY_REVIEW does not mean STORAGE_INVENTORY_COMPLETE",
  "LOCATION_TAXONOMY does not mean DATA_DISCOVERY_COMPLETED",
  "TRACKED_REPO_FILE does not mean RUNTIME_STORAGE",
  "PACKAGE_LOCK does not mean SUPPLY_CHAIN_SECURITY_APPROVAL",
  "CI_WORKFLOW does not mean RELEASE_GATE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "UNTRACKED_FILE_PRESENT does not mean INSPECTED_OR_RELIED_ON",
  "GENERATED_ARTIFACT does not mean APPROVED_PACKET",
  "HASH_OR_MANIFEST does not mean TRUTH_PROOF",
  "AUDIT_EVENT_CANDIDATE does not mean AUDIT_LOG_STORAGE",
  "RETENTION_POLICY does not mean RETENTION_EXECUTION",
  "DELETION_REQUEST does not mean DELETION_EXECUTED",
  "PROVIDER_STATUS does not mean PROVIDER_VERIFICATION",
  "RECIPIENT_RESPONSE does not mean RECIPIENT_COMPLIANCE",
]);

function listDataLocations() {
  return cloneAndFreeze(Object.values(DATA_LOCATION_REGISTRY));
}

function getDataLocation(id) {
  const entry = DATA_LOCATION_REGISTRY[id];

  if (!entry) {
    return cloneAndFreeze({
      id,
      status: DATA_LOCATION_STATUS.UNKNOWN_NOT_EVIDENCED,
      evidence_posture: EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
      allowed_material_classes: [],
      prohibited_material_classes: Object.values(MATERIAL_CLASSES),
      implementation_statuses: BASE_IMPLEMENTATION_STATUSES,
      non_authorizations: BASE_NON_AUTHORIZATIONS,
      notes: "Unknown data location is not evidenced and not authorized.",
    });
  }

  return cloneAndFreeze(entry);
}

function hasDataLocation(id) {
  return Object.prototype.hasOwnProperty.call(DATA_LOCATION_REGISTRY, id);
}

function classifyDataLocation(id) {
  const entry = getDataLocation(id);
  return cloneAndFreeze({
    id: entry.id,
    status: entry.status,
    evidence_posture: entry.evidence_posture,
    non_authorizations: entry.non_authorizations,
  });
}

function listMaterialClasses() {
  return cloneAndFreeze(Object.values(MATERIAL_CLASSES));
}

function isHighRiskMaterialClass(materialClass) {
  return Object.prototype.hasOwnProperty.call(
    HIGH_RISK_MATERIAL_CLASSES_DENIED,
    materialClass,
  );
}

function getHighRiskMaterialClassDenial(materialClass) {
  return cloneAndFreeze(
    HIGH_RISK_MATERIAL_CLASSES_DENIED[materialClass] || {
      material_class: materialClass,
      denied: false,
      status: DATA_LOCATION_STATUS.UNKNOWN_NOT_EVIDENCED,
      ...BASE_NON_AUTHORIZATIONS,
    },
  );
}

function getRequiredInventoryFields() {
  return cloneAndFreeze(REQUIRED_INVENTORY_FIELDS);
}

function getStorageDependencyMap() {
  return cloneAndFreeze(DEPENDENCY_MAP);
}

function getStorageNonOverclaimRules() {
  return cloneAndFreeze(NON_OVERCLAIM_RULES);
}

function getStorageRegistryNonAuthorizationStatus() {
  return cloneAndFreeze({
    ...BASE_NON_AUTHORIZATIONS,
    storage_implementation_created: false,
    database_implementation_created: false,
    object_storage_implementation_created: false,
    audit_log_storage_created: false,
    retention_implementation_created: false,
    deletion_implementation_created: false,
    purge_implementation_created: false,
    erasure_implementation_created: false,
    encryption_implementation_created: false,
    key_management_implementation_created: false,
    rbac_access_control_created: false,
    admin_support_runtime_access_created: false,
    pilot_runtime_created: false,
  });
}

module.exports = {
  DATA_LOCATION_REGISTRY,
  DATA_LOCATION_STATUS,
  DEPENDENCY_MAP,
  EVIDENCE_POSTURE,
  HIGH_RISK_MATERIAL_CLASSES_DENIED,
  MATERIAL_CLASSES,
  NON_OVERCLAIM_RULES,
  REQUIRED_INVENTORY_FIELDS,
  STORAGE_IMPLEMENTATION_STATUS,
  classifyDataLocation,
  getDataLocation,
  getHighRiskMaterialClassDenial,
  getRequiredInventoryFields,
  getStorageDependencyMap,
  getStorageNonOverclaimRules,
  getStorageRegistryNonAuthorizationStatus,
  hasDataLocation,
  isHighRiskMaterialClass,
  listDataLocations,
  listMaterialClasses,
};
