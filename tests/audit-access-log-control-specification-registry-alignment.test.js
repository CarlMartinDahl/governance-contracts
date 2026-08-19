const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const test = require("node:test");

const auditAccessLog = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const storageRegistry = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const lifecycleRegistry = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");

const CONTROL_SPEC_DOC_PATH =
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md";
const RUNTIME_BLOCKER_DOC_PATH =
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md";

const controlSpecDoc = readFileSync(CONTROL_SPEC_DOC_PATH, "utf8");
const runtimeBlockerDoc = readFileSync(RUNTIME_BLOCKER_DOC_PATH, "utf8");
const combinedDocs = `${controlSpecDoc}\n${runtimeBlockerDoc}`;

const expectedEventIds = [
  "AAL-EVENT-001_MATERIAL_INTAKE_ATTEMPT",
  "AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS",
  "AAL-EVENT-003_QUARANTINE_BLOCK_DECISION",
  "AAL-EVENT-004_REDACTION_SANITIZATION",
  "AAL-EVENT-005_MATERIAL_ROUTING_DECISION",
  "AAL-EVENT-006_REVIEW_ACCESS",
  "AAL-EVENT-007_MANIFEST_VALIDATION",
  "AAL-EVENT-008_EXPORT_DOWNLOAD_ACCESS",
  "AAL-EVENT-009_PACKET_DELIVERY_PROMOTION_ATTEMPT",
  "AAL-EVENT-010_LOCAL_LOG_TEST_TRANSCRIPT_HANDLING",
  "AAL-EVENT-011_ADMIN_SUPPORT_ACCESS_ATTEMPT",
  "AAL-EVENT-012_RETENTION_DELETION_OPERATION",
  "AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL",
  "AAL-EVENT-014_RUNTIME_SCHEMA_WORKFLOW_GATE_CANDIDATE",
  "AAL-EVENT-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS",
  "AAL-EVENT-016_AUDIT_LOG_VIEWER_ACCESS",
  "AAL-EVENT-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS",
];

const expectedDependencyIds = [
  "AAL-DEP-001_REPO_TRACKED_SOURCE_AUDITABILITY",
  "AAL-DEP-002_REPO_TRACKED_TEST_AUDITABILITY",
  "AAL-DEP-003_CI_LOG_EVIDENCE_BOUNDARY",
  "AAL-DEP-004_LOCAL_LOG_TRANSCRIPT_BOUNDARY",
  "AAL-DEP-005_AUDIT_LOG_STORAGE_FUTURE",
  "AAL-DEP-006_ADMIN_SUPPORT_LOG_ACCESS_FUTURE",
  "AAL-DEP-007_EXPORT_DOWNLOAD_EVENT_STORAGE",
  "AAL-DEP-008_PACKET_DELIVERY_PROMOTION_EVENT_STORAGE",
  "AAL-DEP-009_RETENTION_DELETION_EVENT_STORAGE",
  "AAL-DEP-010_THIRD_PARTY_ROUTE_EVENT_STORAGE",
  "AAL-DEP-011_PROVIDER_AUDITABILITY_GAP",
  "AAL-DEP-012_RAW_PRIVATE_SOURCE_EVENT_DENIAL",
  "AAL-DEP-013_TOKEN_URL_SECRET_LOG_EXCLUSION",
  "AAL-DEP-014_HUMAN_REVIEW_EVENT_STORAGE",
  "AAL-DEP-015_AUDIT_LOG_VIEWER_ACCESS_FUTURE",
  "AAL-DEP-016_BACKUP_SNAPSHOT_LOG_RETENTION_FUTURE",
];

const positiveClaimKeys = new Set([
  "authorized",
  "emitted",
  "stored",
  "verified",
  "audit_log_implemented",
  "access_log_implemented",
  "event_taxonomy_runtime_code_created",
  "log_schema_created",
  "log_storage_created",
  "audit_proof_created",
  "chain_of_custody_created",
  "release_approved",
  "external_use_authorized",
  "product_candidate_authorized",
  "runtime_certification_created",
  "technical_signoff_created",
  "provider_routing_authorized",
  "provider_deletion_verified",
  "recipient_purge_verified",
  "system_approval_created",
  "audit_access_log_implementation_created",
  "audit_log_storage_created",
  "access_log_storage_created",
  "runtime_logging_created",
  "log_viewer_rbac_created",
  "admin_support_log_access_created",
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertDocIncludes(doc, value) {
  assert.match(doc, new RegExp(escapeRegExp(value)), value);
}

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

test("control specification and runtime blocker docs preserve DOCS_ONLY audit/access-log boundary", () => {
  for (const token of [
    "DOCS_ONLY",
    "AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_ONLY",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
    "LOG_SCHEMA_NOT_CREATED",
    "LOG_STORAGE_NOT_CREATED",
    "LOCAL_LOGS_NOT_CI_EVIDENCE",
    "LOCAL_LOGS_NOT_PACKET_COMPONENTS",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
  ]) {
    assertDocIncludes(combinedDocs, token);
  }
});

test("registry event candidates align with control specification and runtime blocker surfaces", () => {
  assert.deepEqual(
    Object.keys(auditAccessLog.AUDIT_ACCESS_LOG_EVENT_CANDIDATES),
    expectedEventIds,
  );

  for (let index = 1; index <= 15; index += 1) {
    assertDocIncludes(controlSpecDoc, `AAL-CS-${String(index).padStart(3, "0")}`);
  }

  for (let index = 1; index <= 17; index += 1) {
    assertDocIncludes(
      runtimeBlockerDoc,
      `AAL-RUNTIME-BLOCKER-${String(index).padStart(3, "0")}`,
    );
  }

  for (const surface of [
    "material intake",
    "blocked/prohibited ingress",
    "quarantine/block decision",
    "redaction/sanitization",
    "material routing",
    "review access",
    "manifest validation",
    "export/download access",
    "packet/delivery promotion",
    "local log",
    "admin/support access",
    "retention/deletion operation",
    "third-party route",
    "runtime/schema/workflow gate",
    "human/professional review",
    "audit/log viewer access",
    "admin/support privileged log access",
  ]) {
    assertDocIncludes(combinedDocs, surface);
  }
});

test("allowed and prohibited event content categories stay aligned with no-content docs", () => {
  for (const phrase of [
    "subject reference",
    "role/permission concept",
    "tenant/case scope",
    "material class",
    "route/surface",
    "decision status",
    "timestamp category",
    "reason code",
    "no-raw/no-private/no-source-locator marker",
  ]) {
    assertDocIncludes(controlSpecDoc, phrase);
  }

  for (const phrase of [
    "raw source text",
    "private facts",
    "source locators",
    "filenames/private paths",
    "page references",
    "URLs/tokens",
    "PDF/image/metadata content",
    "legal/clinical/evidentiary/case-truth conclusions",
    "product-candidate claims",
    "external-use claims",
    "provider payload",
    "prompt",
    "response",
  ]) {
    assertDocIncludes(combinedDocs, phrase);
  }

  assert.deepEqual(auditAccessLog.listAalAllowedEventContentCategories(), [
    "SUBJECT_REFERENCE",
    "ROLE_PERMISSION_CONCEPT",
    "TENANT_CASE_SCOPE",
    "MATERIAL_CLASS",
    "ROUTE_SURFACE",
    "DECISION_STATUS",
    "TIMESTAMP_CATEGORY",
    "REASON_CODE",
    "NO_RAW_MARKER",
    "NO_PRIVATE_MARKER",
    "NO_SOURCE_LOCATOR_MARKER",
    "PROVIDER_CATEGORY_REFERENCE",
    "BLOCKER_GAP_REFERENCE",
  ]);
});

test("storage dependencies reference only known locations, materials, events, and lifecycle families", () => {
  assert.deepEqual(
    Object.keys(auditAccessLog.AAL_STORAGE_DEPENDENCY_REGISTRY),
    expectedDependencyIds,
  );

  const knownLocations = new Set(Object.keys(storageRegistry.DATA_LOCATION_REGISTRY));
  const knownMaterialClasses = new Set(Object.values(storageRegistry.MATERIAL_CLASSES));
  const knownLifecycleFamilies = new Set(
    Object.values(lifecycleRegistry.LIFECYCLE_CONTROL_FAMILIES),
  );

  for (const dependency of auditAccessLog.listAalStorageDependencies()) {
    for (const locationId of dependency.storage_location_ids) {
      assert.equal(knownLocations.has(locationId), true, locationId);
    }
    for (const materialClass of dependency.material_classes) {
      assert.equal(knownMaterialClasses.has(materialClass), true, materialClass);
    }
    for (const eventCandidateId of dependency.event_candidate_ids) {
      assert.equal(expectedEventIds.includes(eventCandidateId), true, eventCandidateId);
    }
    for (const lifecycleFamily of dependency.lifecycle_family_dependencies) {
      assert.equal(knownLifecycleFamilies.has(lifecycleFamily), true, lifecycleFamily);
    }
    assertNoPositiveClaims(dependency);
  }
});

test("future audit provider and recipient storage locations remain non-authorizing", () => {
  const auditLogStorage = storageRegistry.getDataLocation(
    "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
  );
  const providerStorage = storageRegistry.getDataLocation(
    "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
  );
  const recipientStorage = storageRegistry.getDataLocation(
    "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
  );

  assert.equal(storageRegistry.hasDataLocation(auditLogStorage.id), true);
  assert.equal(auditLogStorage.id, "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE");
  assert.equal(auditLogStorage.status, "FUTURE_RUNTIME_CANDIDATE");
  assert.equal(auditLogStorage.evidence_posture, "FUTURE_CANDIDATE_ONLY");
  assert.ok(
    auditLogStorage.implementation_statuses.includes("NOT_AUDIT_LOG_STORAGE"),
  );
  assert.ok(
    auditLogStorage.implementation_statuses.includes(
      "NOT_STORAGE_IMPLEMENTATION",
    ),
  );
  assert.match(auditLogStorage.notes, /not implemented/);

  assert.equal(storageRegistry.hasDataLocation(providerStorage.id), true);
  assert.equal(providerStorage.id, "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE");
  assert.equal(providerStorage.status, "FUTURE_PROVIDER_OR_RECIPIENT_CANDIDATE");
  assert.equal(providerStorage.evidence_posture, "FUTURE_CANDIDATE_ONLY");
  assert.equal(providerStorage.non_authorizations.provider_routing_authorized, false);
  assert.equal(providerStorage.non_authorizations.external_use_authorized, false);
  assert.equal(providerStorage.non_authorizations.product_candidate_authorized, false);
  assert.equal(
    providerStorage.non_authorizations.runtime_certification_created,
    false,
  );
  assert.equal(providerStorage.non_authorizations.technical_signoff_created, false);
  assert.match(providerStorage.notes, /provider routing is not authorized/);

  assert.equal(storageRegistry.hasDataLocation(recipientStorage.id), true);
  assert.equal(recipientStorage.id, "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE");
  assert.equal(recipientStorage.status, "FUTURE_PROVIDER_OR_RECIPIENT_CANDIDATE");
  assert.equal(recipientStorage.evidence_posture, "FUTURE_CANDIDATE_ONLY");
  assert.equal(recipientStorage.non_authorizations.authorized, false);
  assert.equal(recipientStorage.non_authorizations.external_use_authorized, false);
  assert.equal(recipientStorage.non_authorizations.product_candidate_authorized, false);
  assert.equal(
    recipientStorage.non_authorizations.runtime_certification_created,
    false,
  );
  assert.equal(recipientStorage.non_authorizations.technical_signoff_created, false);
  assert.match(recipientStorage.notes, /recipient compliance is not verified/);
  assert.equal(
    storageRegistry
      .getStorageNonOverclaimRules()
      .includes("RECIPIENT_RESPONSE does not mean RECIPIENT_COMPLIANCE"),
    true,
  );

  assertNoPositiveClaims([auditLogStorage, providerStorage, recipientStorage]);
});

test("high-risk material classes remain denied and event candidates do not authorize routing or access", () => {
  for (const materialClass of Object.keys(
    storageRegistry.HIGH_RISK_MATERIAL_CLASSES_DENIED,
  )) {
    const denial = storageRegistry.getHighRiskMaterialClassDenial(materialClass);
    assert.equal(denial.denied, true, materialClass);
    assert.equal(denial.authorized, false, materialClass);
    assert.equal(storageRegistry.isHighRiskMaterialClass(materialClass), true);
  }

  for (const eventCandidate of auditAccessLog.listAuditAccessLogEventCandidates()) {
    for (const materialClass of eventCandidate.related_material_classes) {
      assert.equal(Object.values(storageRegistry.MATERIAL_CLASSES).includes(materialClass), true);
    }
    assert.equal(auditAccessLog.isAuditAccessLogEventAuthorized(eventCandidate.id), false);
    assertNoPositiveClaims(eventCandidate);
  }
});

test("unknown event and dependency lookups fail closed", () => {
  const eventCandidate = auditAccessLog.getAuditAccessLogEventCandidate(
    "AAL-EVENT-999_UNKNOWN",
  );
  const eventClass = auditAccessLog.classifyAuditAccessLogEventCandidate(
    "AAL-EVENT-999_UNKNOWN",
  );
  const dependency = auditAccessLog.getAalStorageDependency("AAL-DEP-999_UNKNOWN");
  const dependencyClass = auditAccessLog.classifyAalStorageDependency(
    "AAL-DEP-999_UNKNOWN",
  );

  assert.equal(eventCandidate.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(eventClass.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(dependency.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(dependencyClass.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(auditAccessLog.hasAuditAccessLogEventCandidate(eventCandidate.id), false);
  assert.equal(auditAccessLog.hasAalStorageDependency(dependency.id), false);
  assertNoPositiveClaims([eventCandidate, eventClass, dependency, dependencyClass]);
});

test("non-overclaim rules preserve audit/access-log and evidence boundaries", () => {
  for (const rule of [
    "AUDIT_EVENT_CANDIDATE does not mean AUDIT_LOG_IMPLEMENTATION",
    "ACCESS_LOG_CANDIDATE does not mean ACCESS_LOG_IMPLEMENTATION",
    "EVENT_FAMILY does not mean EVENT_TAXONOMY_RUNTIME_CODE",
    "LOG_SCHEMA_CANDIDATE does not mean LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CANDIDATE does not mean LOG_STORAGE_CREATED",
    "AUDIT_EVENT does not mean AUDIT_PROOF",
    "AUDIT_LOG does not mean CHAIN_OF_CUSTODY",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "CI_LOG does not mean RELEASE_EVIDENCE",
    "ACCESS_LOG does not mean ACCESS_AUTHORIZATION",
    "RETENTION_EVENT does not mean RETENTION_IMPLEMENTED",
    "DELETION_EVENT does not mean DELETION_EXECUTED",
    "PROVIDER_AUDITABILITY does not mean PROVIDER_VERIFICATION",
    "THIRD_PARTY_ROUTE_EVENT does not mean PROVIDER_ROUTING_AUTHORIZED",
    "HUMAN_REVIEW_EVENT does not mean SYSTEM_APPROVAL",
  ]) {
    assert.equal(auditAccessLog.listAalNonOverclaimRules().includes(rule), true, rule);
  }

  assert.match(runtimeBlockerDoc, /Local logs are not CI evidence/);
  assert.match(runtimeBlockerDoc, /Product candidate remains none/);
  assert.match(runtimeBlockerDoc, /External-use remains unauthorized/);
  assert.match(runtimeBlockerDoc, /Human\/professional review remains release gate/);
});

test("helper outputs preserve audit/access-log non-implementation and non-authorization", () => {
  assert.equal(auditAccessLog.isAuditAccessLogImplementationCreated(), false);
  assert.equal(auditAccessLog.isAuditAccessLogEventAuthorized(), false);

  const outputs = [
    auditAccessLog.getAalNonAuthorizationStatus(),
    auditAccessLog.listAuditAccessLogEventCandidates(),
    auditAccessLog.listAalStorageDependencies(),
    auditAccessLog.getAuditAccessLogEventCandidate(
      "AAL-EVENT-016_AUDIT_LOG_VIEWER_ACCESS",
    ),
    auditAccessLog.getAuditAccessLogEventCandidate(
      "AAL-EVENT-017_ADMIN_SUPPORT_PRIVILEGED_LOG_ACCESS",
    ),
    auditAccessLog.getAalStorageDependency("AAL-DEP-005_AUDIT_LOG_STORAGE_FUTURE"),
    auditAccessLog.getAalStorageDependency(
      "AAL-DEP-010_THIRD_PARTY_ROUTE_EVENT_STORAGE",
    ),
    auditAccessLog.getAalStorageDependency("AAL-DEP-011_PROVIDER_AUDITABILITY_GAP"),
  ];

  assertNoPositiveClaims(outputs);
});
