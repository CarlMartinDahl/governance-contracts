const assert = require("node:assert/strict");
const test = require("node:test");

const governance = require("../packages/governance/src/index.js");
const aal = require("../packages/governance/src/audit-access-log-storage-dependency-registry.js");
const lifecycle = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const storage = require("../packages/governance/src/storage-data-location-inventory-registry.js");

const expectedFamilies = [
  "AUDIT_EVENT_CANDIDATE",
  "ACCESS_LOG_EVENT_CANDIDATE",
  "MATERIAL_INTAKE_EVENT",
  "BLOCKED_PROHIBITED_INGRESS_EVENT",
  "QUARANTINE_BLOCK_DECISION_EVENT",
  "REDACTION_SANITIZATION_EVENT",
  "MATERIAL_ROUTING_EVENT",
  "REVIEW_ACCESS_EVENT",
  "MANIFEST_VALIDATION_EVENT",
  "EXPORT_DOWNLOAD_EVENT",
  "PACKET_DELIVERY_PROMOTION_EVENT",
  "LOCAL_LOG_TEST_TRANSCRIPT_HANDLING_EVENT",
  "ADMIN_SUPPORT_ACCESS_ATTEMPT_EVENT",
  "RETENTION_DELETION_OPERATION_EVENT",
  "THIRD_PARTY_ROUTE_DENIAL_APPROVAL_EVENT",
  "HUMAN_PROFESSIONAL_REVIEW_ACCESS_EVENT",
  "AUDIT_LOG_VIEWER_ACCESS_EVENT",
];

const expectedImplementationStatuses = [
  "NOT_AUDIT_LOG_IMPLEMENTATION",
  "NOT_ACCESS_LOG_IMPLEMENTATION",
  "NOT_EVENT_TAXONOMY_RUNTIME_CODE",
  "NOT_LOG_SCHEMA",
  "NOT_LOG_STORAGE",
  "NOT_CURRENT_LOGGING",
  "NOT_RUNTIME_ENFORCEMENT",
  "NOT_AUDIT_PROOF",
  "NOT_CHAIN_OF_CUSTODY",
  "NOT_EVIDENTIARY_RECORD",
  "NOT_RELEASE_EVIDENCE",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedDecisionStatuses = [
  "DOCS_ONLY_CONTROL_PLAN",
  "REGISTRY_SCAFFOLD_ONLY",
  "EVENT_CANDIDATE_ONLY",
  "STORAGE_DEPENDENCY_ONLY",
  "NOT_EMITTED",
  "NOT_STORED",
  "NOT_VERIFIED",
  "NOT_AUTHORIZED",
  "BLOCKED_BY_RBAC_ACCESS_CONTROL",
  "BLOCKED_BY_RETENTION_DELETION",
  "BLOCKED_BY_LOG_STORAGE",
  "BLOCKED_BY_NO_CONTENT_POLICY",
  "UNKNOWN_NOT_EVIDENCED",
];

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

const positiveKeys = [
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
];

function assertNoPositiveAalClaim(value) {
  if (Array.isArray(value)) {
    for (const item of value) {
      assertNoPositiveAalClaim(item);
    }
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, item] of Object.entries(value)) {
    if (positiveKeys.includes(key)) {
      assert.equal(item, false, `${key} must remain false`);
    }
    assertNoPositiveAalClaim(item);
  }
}

test("audit/access-log families statuses and categories exist", () => {
  assert.deepEqual(governance.listAuditAccessLogControlFamilies(), expectedFamilies);
  assert.deepEqual(
    Object.values(governance.AUDIT_ACCESS_LOG_IMPLEMENTATION_STATUS),
    expectedImplementationStatuses,
  );
  assert.deepEqual(
    Object.values(governance.AUDIT_ACCESS_LOG_DECISION_STATUS),
    expectedDecisionStatuses,
  );

  for (const category of [
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
  ]) {
    assert.ok(governance.listAalAllowedEventContentCategories().includes(category));
  }

  for (const category of [
    "RAW_SOURCE_TEXT",
    "PRIVATE_FACTS",
    "SOURCE_LOCATORS",
    "FILENAMES_PRIVATE_PATHS",
    "PAGE_REFERENCES",
    "URLS",
    "TOKENS",
    "SECRETS",
    "PROVIDER_PAYLOADS",
    "PROMPTS",
    "RESPONSES",
    "PDF_IMAGE_METADATA_CONTENT",
    "SENSITIVE_PERSONAL_DETAILS",
    "LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_CONCLUSIONS",
    "PRODUCT_CANDIDATE_CLAIMS",
    "EXTERNAL_USE_CLAIMS",
    "RELEASE_APPROVAL_CLAIMS",
    "RUNTIME_CERTIFICATION_CLAIMS",
    "TECHNICAL_SIGNOFF_CLAIMS",
  ]) {
    assert.ok(governance.listAalProhibitedEventContentCategories().includes(category));
  }
});

test("AAL event candidates exist exactly and remain candidate-only", () => {
  assert.deepEqual(
    governance.listAuditAccessLogEventCandidates().map((entry) => entry.id),
    expectedEventIds,
  );
  assert.deepEqual(Object.keys(governance.AUDIT_ACCESS_LOG_EVENT_CANDIDATES), expectedEventIds);

  for (const event of governance.listAuditAccessLogEventCandidates()) {
    assert.equal(governance.hasAuditAccessLogEventCandidate(event.id), true);
    assert.equal(governance.isAuditAccessLogEventAuthorized(event.id), false);
    assert.ok(Array.isArray(event.related_storage_location_ids));
    assert.ok(Array.isArray(event.related_material_classes));
    assert.ok(Array.isArray(event.related_lifecycle_families));
    assert.ok(Array.isArray(event.allowed_event_content_categories));
    assert.ok(Array.isArray(event.prohibited_event_content_categories));
    assert.ok(event.implementation_statuses.includes("NOT_LOG_STORAGE"));
    assertNoPositiveAalClaim(event);
  }
});

test("AAL storage dependencies exist exactly and reference known registries", () => {
  const knownLocations = new Set(Object.keys(storage.DATA_LOCATION_REGISTRY));
  const knownMaterialClasses = new Set(Object.values(storage.MATERIAL_CLASSES));
  const knownLifecycleFamilies = new Set(Object.values(lifecycle.LIFECYCLE_CONTROL_FAMILIES));
  const knownEvents = new Set(expectedEventIds);

  assert.deepEqual(
    governance.listAalStorageDependencies().map((entry) => entry.id),
    expectedDependencyIds,
  );
  assert.deepEqual(Object.keys(governance.AAL_STORAGE_DEPENDENCY_REGISTRY), expectedDependencyIds);

  for (const dependency of governance.listAalStorageDependencies()) {
    for (const id of dependency.storage_location_ids) {
      assert.equal(knownLocations.has(id), true, `${dependency.id} references ${id}`);
    }
    for (const materialClass of dependency.material_classes) {
      assert.equal(
        knownMaterialClasses.has(materialClass),
        true,
        `${dependency.id} references ${materialClass}`,
      );
    }
    for (const eventId of dependency.event_candidate_ids) {
      assert.equal(knownEvents.has(eventId), true, `${dependency.id} references ${eventId}`);
    }
    for (const family of dependency.lifecycle_family_dependencies) {
      assert.equal(
        knownLifecycleFamilies.has(family),
        true,
        `${dependency.id} references ${family}`,
      );
    }
    assertNoPositiveAalClaim(dependency);
  }
});

test("high-risk material classes remain denied and not authorized", () => {
  const highRiskClasses = Object.values(storage.HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
    (entry) => entry.material_class,
  );

  for (const materialClass of highRiskClasses) {
    const denial = storage.getHighRiskMaterialClassDenial(materialClass);
    assert.equal(denial.denied, true);
    assertNoPositiveAalClaim(denial);
  }

  const rawDenial = governance.getAalStorageDependency(
    "AAL-DEP-012_RAW_PRIVATE_SOURCE_EVENT_DENIAL",
  );
  for (const materialClass of rawDenial.material_classes) {
    const denial = storage.getHighRiskMaterialClassDenial(materialClass);
    assert.equal(denial.denied, true);
    assertNoPositiveAalClaim(denial);
  }
});

test("unknown event and dependency remain unknown and not authorized", () => {
  const unknownEvent = governance.getAuditAccessLogEventCandidate("AAL-EVENT-999_UNKNOWN");
  const unknownEventClass = governance.classifyAuditAccessLogEventCandidate(
    "AAL-EVENT-999_UNKNOWN",
  );

  assert.equal(unknownEvent.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknownEventClass.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(governance.hasAuditAccessLogEventCandidate(unknownEvent.id), false);
  assertNoPositiveAalClaim(unknownEvent);
  assertNoPositiveAalClaim(unknownEventClass);

  const unknownDependency = governance.getAalStorageDependency("AAL-DEP-999_UNKNOWN");
  const unknownDependencyClass = governance.classifyAalStorageDependency(
    "AAL-DEP-999_UNKNOWN",
  );

  assert.equal(unknownDependency.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknownDependencyClass.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(governance.hasAalStorageDependency(unknownDependency.id), false);
  assertNoPositiveAalClaim(unknownDependency);
  assertNoPositiveAalClaim(unknownDependencyClass);
});

test("AAL implementation is globally false and helpers never return positive claims", () => {
  assert.equal(governance.isAuditAccessLogImplementationCreated(), false);
  assertNoPositiveAalClaim(governance.getAalNonAuthorizationStatus());
  assertNoPositiveAalClaim(governance.listAuditAccessLogEventCandidates());
  assertNoPositiveAalClaim(governance.listAalStorageDependencies());
  assertNoPositiveAalClaim(
    governance.getAuditAccessLogEventCandidate("AAL-EVENT-016_AUDIT_LOG_VIEWER_ACCESS"),
  );
  assertNoPositiveAalClaim(
    governance.getAalStorageDependency("AAL-DEP-005_AUDIT_LOG_STORAGE_FUTURE"),
  );
});

test("registry entries are frozen and copy-safe", () => {
  const firstEvent = governance.getAuditAccessLogEventCandidate(
    "AAL-EVENT-012_RETENTION_DELETION_OPERATION",
  );
  const secondEvent = governance.getAuditAccessLogEventCandidate(
    "AAL-EVENT-012_RETENTION_DELETION_OPERATION",
  );

  assert.notEqual(firstEvent, secondEvent);
  assert.equal(Object.isFrozen(firstEvent), true);
  assert.equal(Object.isFrozen(firstEvent.related_lifecycle_families), true);
  assert.throws(() => firstEvent.related_lifecycle_families.push("MUTATION_ATTEMPT"));
  assert.equal(secondEvent.related_lifecycle_families.includes("MUTATION_ATTEMPT"), false);

  const firstDependency = governance.getAalStorageDependency(
    "AAL-DEP-009_RETENTION_DELETION_EVENT_STORAGE",
  );
  const secondDependency = governance.getAalStorageDependency(
    "AAL-DEP-009_RETENTION_DELETION_EVENT_STORAGE",
  );

  assert.notEqual(firstDependency, secondDependency);
  assert.equal(Object.isFrozen(firstDependency.storage_location_ids), true);
  assert.throws(() => firstDependency.storage_location_ids.push("L99_MUTATION"));
  assert.equal(secondDependency.storage_location_ids.includes("L99_MUTATION"), false);
});

test("non-overclaim rules and prerequisites preserve audit/access-log boundaries", () => {
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
    assert.ok(governance.listAalNonOverclaimRules().includes(rule));
  }

  for (const prerequisite of [
    "no-content event taxonomy",
    "log schema",
    "log storage design",
    "log viewer RBAC",
    "admin/support privileged log access policy",
    "retention/deletion policy for logs",
    "encryption/key-management approach for logs",
    "raw/private/source exclusion policy",
    "provider route event policy",
    "export/download event policy",
    "packet/delivery promotion event policy",
    "lifecycle operation event policy",
    "CI test plan",
    "non-proof/non-chain-of-custody wording",
  ]) {
    assert.ok(governance.getAalRequiredPrerequisites().includes(prerequisite));
  }
});

test("future storage and evidence boundaries remain non-authorizing", () => {
  const futureAuditStorage = governance.getDataLocation(
    "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
  );
  const providerStorage = governance.getDataLocation(
    "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
  );
  const recipientStorage = governance.getDataLocation(
    "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
  );
  const localLog = governance.getAalStorageDependency(
    "AAL-DEP-004_LOCAL_LOG_TRANSCRIPT_BOUNDARY",
  );
  const ciLog = governance.getAalStorageDependency("AAL-DEP-003_CI_LOG_EVIDENCE_BOUNDARY");
  const providerGap = governance.getAalStorageDependency(
    "AAL-DEP-011_PROVIDER_AUDITABILITY_GAP",
  );
  const thirdPartyRoute = governance.getAuditAccessLogEventCandidate(
    "AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL",
  );
  const humanReview = governance.getAuditAccessLogEventCandidate(
    "AAL-EVENT-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS",
  );

  assert.equal(futureAuditStorage.evidence_posture, "FUTURE_CANDIDATE_ONLY");
  assert.ok(futureAuditStorage.implementation_statuses.includes("NOT_AUDIT_LOG_STORAGE"));
  assertNoPositiveAalClaim(futureAuditStorage);

  assert.equal(providerStorage.evidence_posture, "FUTURE_CANDIDATE_ONLY");
  assertNoPositiveAalClaim(providerStorage);
  assert.equal(recipientStorage.evidence_posture, "FUTURE_CANDIDATE_ONLY");
  assertNoPositiveAalClaim(recipientStorage);

  assert.equal(localLog.notes.includes("not CI evidence"), true);
  assert.equal(ciLog.notes.includes("not release evidence"), true);
  assert.equal(providerGap.notes.includes("not provider verification"), true);
  assert.equal(thirdPartyRoute.notes.includes("provider routing is not authorized"), true);
  assert.equal(humanReview.notes.includes("not system approval"), true);
});

test("index export wiring exposes AAL registry without side effects", () => {
  assert.equal(
    governance.AUDIT_ACCESS_LOG_EVENT_CANDIDATES,
    aal.AUDIT_ACCESS_LOG_EVENT_CANDIDATES,
  );
  assert.deepEqual(
    governance.listAalStorageDependencies().map((entry) => entry.id),
    aal.listAalStorageDependencies().map((entry) => entry.id),
  );
  assert.equal(governance.isAuditAccessLogImplementationCreated(), false);
});
