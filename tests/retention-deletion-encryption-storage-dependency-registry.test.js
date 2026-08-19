const assert = require("node:assert/strict");
const test = require("node:test");

const governance = require("../packages/governance/src/index.js");
const registryModule = require("../packages/governance/src/retention-deletion-encryption-storage-dependency-registry.js");
const storageRegistry = require("../packages/governance/src/storage-data-location-inventory-registry.js");

const expectedFamilies = [
  "RETENTION",
  "DELETION",
  "PURGE",
  "ERASURE",
  "ARCHIVE",
  "LEGAL_HOLD",
  "EXCEPTION_HOLD",
  "ENCRYPTION",
  "KEY_MANAGEMENT",
  "KEY_ROTATION",
  "KEY_REVOCATION",
  "PROVIDER_DELETION",
  "RECIPIENT_PURGE",
];

const expectedImplementationStatuses = [
  "NOT_RETENTION_IMPLEMENTATION",
  "NOT_DELETION_IMPLEMENTATION",
  "NOT_PURGE_IMPLEMENTATION",
  "NOT_ERASURE_IMPLEMENTATION",
  "NOT_ENCRYPTION_IMPLEMENTATION",
  "NOT_KEY_MANAGEMENT_IMPLEMENTATION",
  "NOT_LEGAL_HOLD",
  "NOT_CHAIN_OF_CUSTODY",
  "NOT_EVIDENTIARY_RECORD",
  "NOT_SOURCE_TRUTH",
  "NOT_PROVIDER_DELETION_VERIFICATION",
  "NOT_RECIPIENT_PURGE_VERIFICATION",
  "NOT_RUNTIME_LIFECYCLE_EXECUTION",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedDecisionStatuses = [
  "POLICY_TEXT_ONLY",
  "REQUEST_ONLY",
  "CANDIDATE_ONLY",
  "GAP_REVIEW_ONLY",
  "NOT_EXECUTED",
  "NOT_VERIFIED",
  "NOT_AUTHORIZED",
  "BLOCKED_BY_STORAGE_INVENTORY",
  "BLOCKED_BY_RBAC_ACCESS_CONTROL",
  "BLOCKED_BY_AUDIT_ACCESS_LOG",
  "BLOCKED_BY_PROVIDER_POSTURE",
  "BLOCKED_BY_RECIPIENT_VERIFICATION",
  "UNKNOWN_NOT_EVIDENCED",
];

const expectedActionIds = [
  "RDE-ACTION-001_RETENTION_CLASSIFY",
  "RDE-ACTION-002_RETENTION_APPLY",
  "RDE-ACTION-003_RETENTION_REVALIDATE",
  "RDE-ACTION-004_DELETION_REQUEST",
  "RDE-ACTION-005_DELETION_APPROVE",
  "RDE-ACTION-006_DELETION_EXECUTE",
  "RDE-ACTION-007_DELETION_VERIFY",
  "RDE-ACTION-008_PURGE_REQUEST",
  "RDE-ACTION-009_PURGE_EXECUTE",
  "RDE-ACTION-010_PURGE_VERIFY",
  "RDE-ACTION-011_ERASURE_REQUEST",
  "RDE-ACTION-012_ERASURE_EXECUTE",
  "RDE-ACTION-013_ENCRYPTION_APPLY",
  "RDE-ACTION-014_KEY_ROTATE",
  "RDE-ACTION-015_KEY_REVOKE",
  "RDE-ACTION-016_PROVIDER_DELETION_REQUEST",
  "RDE-ACTION-017_PROVIDER_DELETION_VERIFY",
  "RDE-ACTION-018_RECIPIENT_PURGE_RESPONSE",
  "RDE-ACTION-019_RECIPIENT_PURGE_VERIFY",
  "RDE-ACTION-020_LEGAL_HOLD_CANDIDATE",
];

const expectedDependencyIds = [
  "RDE-DEP-001_REPO_TRACKED_FILES_RETENTION",
  "RDE-DEP-002_CI_LOG_RETENTION",
  "RDE-DEP-003_LOCAL_LOG_RETENTION",
  "RDE-DEP-004_GENERATED_ARTIFACT_LIFECYCLE",
  "RDE-DEP-005_EXPORT_PACKAGE_LIFECYCLE",
  "RDE-DEP-006_LOCAL_UNTRACKED_FILES_UNKNOWN",
  "RDE-DEP-007_FUTURE_DATABASE_LIFECYCLE",
  "RDE-DEP-008_FUTURE_OBJECT_STORAGE_LIFECYCLE",
  "RDE-DEP-009_FUTURE_QUEUE_TEMP_STORAGE_LIFECYCLE",
  "RDE-DEP-010_FUTURE_AUDIT_LOG_STORAGE_LIFECYCLE",
  "RDE-DEP-011_BACKUP_SNAPSHOT_LIFECYCLE",
  "RDE-DEP-012_PROVIDER_STORAGE_LIFECYCLE",
  "RDE-DEP-013_RECIPIENT_DOWNSTREAM_STORAGE_LIFECYCLE",
  "RDE-DEP-014_TOKEN_URL_SECRET_LIFECYCLE",
  "RDE-DEP-015_RAW_PRIVATE_SOURCE_LIFECYCLE",
  "RDE-DEP-016_PACKAGE_LOCK_BUILD_METADATA_LIFECYCLE",
];

const positiveKeys = [
  "authorized",
  "deletion_executed",
  "deletion_verified",
  "purge_executed",
  "purge_verified",
  "erasure_executed",
  "encryption_implemented",
  "key_management_implemented",
  "provider_deletion_verified",
  "recipient_purge_verified",
  "legal_hold_created",
  "release_approved",
  "external_use_authorized",
  "product_candidate_authorized",
  "runtime_certification_created",
  "technical_signoff_created",
];

function assertNoPositiveLifecycleClaim(value) {
  if (Array.isArray(value)) {
    for (const item of value) {
      assertNoPositiveLifecycleClaim(item);
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
    assertNoPositiveLifecycleClaim(item);
  }
}

test("lifecycle families implementation statuses and decision statuses exist", () => {
  assert.deepEqual(governance.listLifecycleControlFamilies(), expectedFamilies);
  assert.deepEqual(
    Object.values(governance.LIFECYCLE_IMPLEMENTATION_STATUS),
    expectedImplementationStatuses,
  );
  assert.deepEqual(Object.values(governance.LIFECYCLE_DECISION_STATUS), expectedDecisionStatuses);
});

test("RDE action candidates exist exactly and remain non-executable", () => {
  assert.deepEqual(
    governance.listLifecycleActionCandidates().map((entry) => entry.id),
    expectedActionIds,
  );
  assert.deepEqual(Object.keys(governance.LIFECYCLE_ACTION_CANDIDATES), expectedActionIds);

  for (const action of governance.listLifecycleActionCandidates()) {
    assert.equal(governance.hasLifecycleActionCandidate(action.id), true);
    assert.equal(governance.isLifecycleActionAuthorized(action.id), false);
    assert.ok(Array.isArray(action.required_storage_location_ids));
    assert.ok(Array.isArray(action.related_material_classes));
    assert.ok(Array.isArray(action.required_prerequisites));
    assertNoPositiveLifecycleClaim(action);
  }
});

test("RDE storage dependencies exist exactly and reference known locations and material classes", () => {
  const knownLocations = new Set(Object.keys(storageRegistry.DATA_LOCATION_REGISTRY));
  const knownMaterialClasses = new Set(Object.values(storageRegistry.MATERIAL_CLASSES));

  assert.deepEqual(
    governance.listRdeStorageDependencies().map((entry) => entry.id),
    expectedDependencyIds,
  );
  assert.deepEqual(Object.keys(governance.RDE_STORAGE_DEPENDENCY_REGISTRY), expectedDependencyIds);

  for (const dependency of governance.listRdeStorageDependencies()) {
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
    assertNoPositiveLifecycleClaim(dependency);
  }
});

test("high-risk material classes remain denied and not authorized", () => {
  for (const materialClass of Object.values(storageRegistry.MATERIAL_CLASSES)) {
    if (governance.isHighRiskMaterialClass(materialClass)) {
      const denial = governance.getHighRiskMaterialClassDenial(materialClass);
      assert.equal(denial.denied, true);
      assertNoPositiveLifecycleClaim(denial);
    }
  }
});

test("unknown action and dependency remain unknown and not authorized", () => {
  const unknownAction = governance.getLifecycleActionCandidate("RDE-ACTION-999_UNKNOWN");
  const unknownActionClass = governance.classifyLifecycleAction("RDE-ACTION-999_UNKNOWN");
  assert.equal(unknownAction.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknownActionClass.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(governance.hasLifecycleActionCandidate("RDE-ACTION-999_UNKNOWN"), false);
  assertNoPositiveLifecycleClaim(unknownAction);
  assertNoPositiveLifecycleClaim(unknownActionClass);

  const unknownDependency = governance.getRdeStorageDependency("RDE-DEP-999_UNKNOWN");
  const unknownDependencyClass = governance.classifyRdeStorageDependency("RDE-DEP-999_UNKNOWN");
  assert.equal(unknownDependency.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknownDependencyClass.decision_status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(governance.hasRdeStorageDependency("RDE-DEP-999_UNKNOWN"), false);
  assertNoPositiveLifecycleClaim(unknownDependency);
  assertNoPositiveLifecycleClaim(unknownDependencyClass);
});

test("lifecycle implementation is globally false and helpers never return positive claims", () => {
  assert.equal(governance.isLifecycleImplementationCreated(), false);
  assertNoPositiveLifecycleClaim(governance.getRdeNonAuthorizationStatus());
  assertNoPositiveLifecycleClaim(governance.listLifecycleActionCandidates());
  assertNoPositiveLifecycleClaim(governance.listRdeStorageDependencies());
});

test("registry entries are frozen and copy-safe", () => {
  const first = governance.getLifecycleActionCandidate("RDE-ACTION-004_DELETION_REQUEST");
  const second = governance.getLifecycleActionCandidate("RDE-ACTION-004_DELETION_REQUEST");

  assert.notEqual(first, second);
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.required_prerequisites), true);
  assert.throws(() => first.required_prerequisites.push("MUTATION_ATTEMPT"));
  assert.equal(second.required_prerequisites.includes("MUTATION_ATTEMPT"), false);

  const depFirst = governance.getRdeStorageDependency("RDE-DEP-010_FUTURE_AUDIT_LOG_STORAGE_LIFECYCLE");
  const depSecond = governance.getRdeStorageDependency("RDE-DEP-010_FUTURE_AUDIT_LOG_STORAGE_LIFECYCLE");
  assert.notEqual(depFirst, depSecond);
  assert.equal(Object.isFrozen(depFirst.storage_location_ids), true);
  assert.throws(() => depFirst.storage_location_ids.push("L99_MUTATION"));
  assert.equal(depSecond.storage_location_ids.includes("L99_MUTATION"), false);
});

test("non-overclaim rules and prerequisites preserve lifecycle distinctions", () => {
  for (const rule of [
    "RETENTION_POLICY does not mean RETENTION_EXECUTION",
    "DELETION_REQUEST does not mean DELETION_EXECUTED",
    "PURGE_EVENT does not mean PURGE_PROOF",
    "ERASURE_REQUEST does not mean LEGAL_ERASURE_COMPLETION",
    "ENCRYPTION_REQUIREMENT does not mean ENCRYPTION_IMPLEMENTED",
    "KEY_ROTATION does not mean PURGE",
    "PROVIDER_POSTURE does not mean PROVIDER_DELETION_VERIFICATION",
    "RECIPIENT_RESPONSE does not mean RECIPIENT_PURGE_VERIFICATION",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "CI_LOG does not mean RELEASE_EVIDENCE",
    "HUMAN_REVIEW does not mean SYSTEM_APPROVAL",
  ]) {
    assert.ok(governance.listRdeNonOverclaimRules().includes(rule));
  }

  for (const prerequisite of [
    "complete storage/data-location inventory",
    "RBAC/access-control model",
    "audit/access-log model",
    "encryption/key-management design",
    "provider lifecycle policy",
    "recipient purge/compliance verification model",
    "CI test plan",
  ]) {
    assert.ok(governance.getRdeRequiredPrerequisites().includes(prerequisite));
  }
});

test("future audit provider and recipient locations remain not implemented and not authorized", () => {
  const audit = governance.getRdeStorageDependency(
    "RDE-DEP-010_FUTURE_AUDIT_LOG_STORAGE_LIFECYCLE",
  );
  assert.equal(audit.current_evidence_posture, "FUTURE_CANDIDATE_ONLY");
  assert.equal(audit.decision_status, "BLOCKED_BY_AUDIT_ACCESS_LOG");
  assert.ok(audit.implementation_statuses.includes("NOT_RUNTIME_LIFECYCLE_EXECUTION"));
  assertNoPositiveLifecycleClaim(audit);

  const provider = governance.getRdeStorageDependency("RDE-DEP-012_PROVIDER_STORAGE_LIFECYCLE");
  assert.equal(provider.decision_status, "BLOCKED_BY_PROVIDER_POSTURE");
  assert.match(provider.notes, /not authorized/);
  assertNoPositiveLifecycleClaim(provider);

  const recipient = governance.getRdeStorageDependency(
    "RDE-DEP-013_RECIPIENT_DOWNSTREAM_STORAGE_LIFECYCLE",
  );
  assert.equal(recipient.decision_status, "BLOCKED_BY_RECIPIENT_VERIFICATION");
  assert.match(recipient.notes, /not authorized/);
  assertNoPositiveLifecycleClaim(recipient);
});

test("local CI provider recipient and package-lock evidence boundaries remain separated", () => {
  assert.match(
    governance.getRdeStorageDependency("RDE-DEP-003_LOCAL_LOG_RETENTION").notes,
    /not CI evidence/,
  );
  assert.match(
    governance.getRdeStorageDependency("RDE-DEP-002_CI_LOG_RETENTION").notes,
    /not release evidence/,
  );
  assert.match(
    governance.getLifecycleActionCandidate("RDE-ACTION-017_PROVIDER_DELETION_VERIFY").notes,
    /does not mean provider deletion verification/,
  );
  assert.match(
    governance.getLifecycleActionCandidate("RDE-ACTION-018_RECIPIENT_PURGE_RESPONSE").notes,
    /does not mean recipient purge verification/,
  );
  assert.match(
    governance.getRdeStorageDependency("RDE-DEP-016_PACKAGE_LOCK_BUILD_METADATA_LIFECYCLE").notes,
    /not supply-chain security approval or deletion proof/,
  );
});

test("index exports RDE storage dependency registry without side effects", () => {
  for (const exportName of [
    "LIFECYCLE_ACTION_CANDIDATES",
    "LIFECYCLE_CONTROL_FAMILIES",
    "LIFECYCLE_DECISION_STATUS",
    "LIFECYCLE_EVIDENCE_POSTURE",
    "LIFECYCLE_IMPLEMENTATION_STATUS",
    "RDE_NON_OVERCLAIM_RULES",
    "RDE_REQUIRED_PREREQUISITES",
    "RDE_STORAGE_DEPENDENCY_REGISTRY",
    "classifyLifecycleAction",
    "classifyRdeStorageDependency",
    "getLifecycleActionCandidate",
    "getRdeNonAuthorizationStatus",
    "getRdeRequiredPrerequisites",
    "getRdeStorageDependency",
    "hasLifecycleActionCandidate",
    "hasRdeStorageDependency",
    "isLifecycleActionAuthorized",
    "isLifecycleImplementationCreated",
    "listLifecycleActionCandidates",
    "listLifecycleControlFamilies",
    "listRdeNonOverclaimRules",
    "listRdeStorageDependencies",
  ]) {
    assert.equal(governance[exportName], registryModule[exportName]);
  }
});
