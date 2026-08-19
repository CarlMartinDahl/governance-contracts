const assert = require("node:assert/strict");
const test = require("node:test");

const governance = require("../packages/governance/src/index.js");
const registryModule = require("../packages/governance/src/storage-data-location-inventory-registry.js");

const expectedLocationIds = [
  "L01_REPO_TRACKED_SOURCE_FILES",
  "L02_REPO_TRACKED_TEST_FILES",
  "L03_REPO_TRACKED_DOCS",
  "L04_REPO_TRACKED_SCHEMAS",
  "L05_REPO_PACKAGE_MANIFESTS",
  "L06_REPO_LOCKFILE",
  "L07_GITHUB_ACTIONS_WORKFLOWS",
  "L08_GITHUB_ACTIONS_CI_LOGS",
  "L09_GITHUB_ACTIONS_CI_ARTIFACTS",
  "L10_LOCAL_TEST_LOGS",
  "L11_LOCAL_UNTRACKED_FILES",
  "L12_LOCAL_GENERATED_ARTIFACTS",
  "L13_LOCAL_EXPORT_PACKAGES",
  "L14_LOCAL_ARCHIVES_OR_ZIPS",
  "L15_NODE_MODULES_OR_PACKAGE_CACHE",
  "L16_OPERATOR_UI_CACHE_FUTURE",
  "L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE",
  "L18_OBJECT_STORAGE_FUTURE",
  "L19_QUEUE_TEMP_STORAGE_FUTURE",
  "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
  "L21_BACKUP_SNAPSHOT_STORAGE_FUTURE",
  "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
  "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
  "L24_PR_COMMENTS_ISSUES_REVIEW_METADATA",
  "L25_CONNECTOR_TOOL_OR_AGENT_STATE",
];

const expectedMaterialClasses = [
  "SYNTHETIC_NO_RAW_MATERIAL",
  "SANITIZED_TEXT_PRIMARY_MATERIAL",
  "REDACTED_REVIEW_SIGNAL_MATERIAL",
  "NO_RAW_METADATA_MANIFEST_MATERIAL",
  "GENERATED_ARTIFACT_OR_EXPORT_MATERIAL",
  "LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
  "CI_LOG_OR_WORKFLOW_ARTIFACT",
  "HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
  "RAW_PRIVATE_SOURCE_MATERIAL",
  "SOURCE_PACKAGE_MATERIAL",
  "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
  "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
  "PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL",
  "TOKEN_URL_SECRET_MATERIAL",
  "AUDIT_ACCESS_EVENT_RECORD",
  "PACKAGE_LOCK_OR_BUILD_METADATA",
];

const expectedHighRiskMaterialClasses = [
  "RAW_PRIVATE_SOURCE_MATERIAL",
  "SOURCE_PACKAGE_MATERIAL",
  "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
  "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
  "PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL",
  "TOKEN_URL_SECRET_MATERIAL",
];

function assertNoPositiveAuthorization(value) {
  if (Array.isArray(value)) {
    for (const item of value) {
      assertNoPositiveAuthorization(item);
    }
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, item] of Object.entries(value)) {
    if (
      [
        "authorized",
        "external_use_authorized",
        "product_candidate_authorized",
        "release_approved",
        "runtime_certification_created",
        "technical_signoff_created",
      ].includes(key)
    ) {
      assert.equal(item, false, `${key} must remain false`);
    }
    assertNoPositiveAuthorization(item);
  }
}

test("L01-L25 data-location entries exist exactly", () => {
  assert.deepEqual(
    governance.listDataLocations().map((entry) => entry.id),
    expectedLocationIds,
  );
  assert.deepEqual(Object.keys(governance.DATA_LOCATION_REGISTRY), expectedLocationIds);
});

test("all material classes exist and high-risk material is denied", () => {
  assert.deepEqual(governance.listMaterialClasses(), expectedMaterialClasses);

  for (const materialClass of expectedHighRiskMaterialClasses) {
    const denial = governance.getHighRiskMaterialClassDenial(materialClass);
    assert.equal(governance.isHighRiskMaterialClass(materialClass), true);
    assert.equal(denial.denied, true);
    assertNoPositiveAuthorization(denial);
  }
});

test("unknown location and material class remain unknown and not authorized", () => {
  const unknownLocation = governance.getDataLocation("L99_UNKNOWN");
  assert.equal(unknownLocation.status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(unknownLocation.evidence_posture, "UNKNOWN_NOT_EVIDENCED");
  assertNoPositiveAuthorization(unknownLocation);

  const unknownMaterial = governance.getHighRiskMaterialClassDenial("UNKNOWN_MATERIAL");
  assert.equal(governance.isHighRiskMaterialClass("UNKNOWN_MATERIAL"), false);
  assert.equal(unknownMaterial.status, "UNKNOWN_NOT_EVIDENCED");
  assertNoPositiveAuthorization(unknownMaterial);
});

test("registry entries and helper return values are frozen and copy-safe", () => {
  const first = governance.getDataLocation("L08_GITHUB_ACTIONS_CI_LOGS");
  const second = governance.getDataLocation("L08_GITHUB_ACTIONS_CI_LOGS");

  assert.notEqual(first, second);
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.allowed_material_classes), true);
  assert.throws(() => first.allowed_material_classes.push("MUTATION_ATTEMPT"));
  assert.equal(second.allowed_material_classes.includes("MUTATION_ATTEMPT"), false);
});

test("evidence boundaries remain local, CI, and release separated", () => {
  const localLogs = governance.getDataLocation("L10_LOCAL_TEST_LOGS");
  const ciLogs = governance.getDataLocation("L08_GITHUB_ACTIONS_CI_LOGS");
  const lockfile = governance.getDataLocation("L06_REPO_LOCKFILE");

  assert.equal(localLogs.evidence_posture, "LOCAL_TRANSCRIPT_EVIDENCE_ONLY");
  assert.notEqual(localLogs.evidence_posture, "CI_EVIDENCE");
  assert.equal(ciLogs.evidence_posture, "CI_EVIDENCE");
  assert.match(ciLogs.notes, /not release evidence/);
  assert.match(lockfile.notes, /not truth proof or security approval/);
});

test("future storage candidates remain future-only and not implemented", () => {
  for (const id of [
    "L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE",
    "L18_OBJECT_STORAGE_FUTURE",
    "L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE",
    "L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE",
    "L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE",
  ]) {
    const entry = governance.getDataLocation(id);
    assert.match(entry.status, /FUTURE/);
    assert.equal(entry.evidence_posture, "FUTURE_CANDIDATE_ONLY");
    assert.ok(entry.implementation_statuses.includes("NOT_STORAGE_IMPLEMENTATION"));
    assertNoPositiveAuthorization(entry);
  }

  assert.ok(
    governance
      .getDataLocation("L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE")
      .implementation_statuses.includes("NOT_AUDIT_LOG_STORAGE"),
  );
  assert.match(
    governance.getDataLocation("L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE").notes,
    /not authorized/,
  );
  assert.match(
    governance.getDataLocation("L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE").notes,
    /not verified/,
  );
});

test("inventory fields, dependency map, and non-overclaim rules preserve boundaries", () => {
  for (const field of [
    "location ID",
    "storage type",
    "CI/local/release evidence relation",
    "non-authorized until closure",
  ]) {
    assert.ok(governance.getRequiredInventoryFields().includes(field));
  }

  for (const dependency of [
    "RBAC/access-control",
    "audit/access logs",
    "provider routing",
    "recipient/downstream purge verification",
  ]) {
    assert.ok(governance.getStorageDependencyMap().includes(dependency));
  }

  for (const rule of [
    "CI_LOG does not mean RELEASE_EVIDENCE",
    "LOCAL_LOG does not mean CI_EVIDENCE",
    "AUDIT_EVENT_CANDIDATE does not mean AUDIT_LOG_STORAGE",
    "RETENTION_POLICY does not mean RETENTION_EXECUTION",
    "PROVIDER_STATUS does not mean PROVIDER_VERIFICATION",
    "RECIPIENT_RESPONSE does not mean RECIPIENT_COMPLIANCE",
  ]) {
    assert.ok(governance.getStorageNonOverclaimRules().includes(rule));
  }
});

test("helpers do not expose implementation or authorization state", () => {
  assertNoPositiveAuthorization(governance.listDataLocations());
  assertNoPositiveAuthorization(governance.getStorageRegistryNonAuthorizationStatus());
  assert.equal(governance.hasDataLocation("L01_REPO_TRACKED_SOURCE_FILES"), true);
  assert.equal(governance.hasDataLocation("L99_UNKNOWN"), false);
  assert.equal(
    governance.classifyDataLocation("L99_UNKNOWN").status,
    "UNKNOWN_NOT_EVIDENCED",
  );
});

test("index exports registry scaffold without side effects", () => {
  for (const exportName of [
    "DATA_LOCATION_REGISTRY",
    "DATA_LOCATION_STATUS",
    "EVIDENCE_POSTURE",
    "STORAGE_IMPLEMENTATION_STATUS",
    "MATERIAL_CLASSES",
    "HIGH_RISK_MATERIAL_CLASSES_DENIED",
    "listDataLocations",
    "getDataLocation",
    "classifyDataLocation",
  ]) {
    assert.equal(governance[exportName], registryModule[exportName]);
  }
});
