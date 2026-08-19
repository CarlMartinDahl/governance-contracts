const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const test = require("node:test");

const registry = require("../packages/governance/src/storage-data-location-inventory-registry.js");

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_STORAGE_AND_DATA_LOCATION_INVENTORY_CONTROL_PLAN_DRAFT_v1.md";
const doc = readFileSync(DOC_PATH, "utf8");

const locationIdPattern = /\bL\d{2}_[A-Z0-9_]+\b/g;
const docLocationIds = Array.from(new Set(doc.match(locationIdPattern) || []));
const registryLocationIds = registry.listDataLocations().map((entry) => entry.id);

const positiveAuthorizationKeys = [
  "authorized",
  "external_use_authorized",
  "product_candidate_authorized",
  "release_approved",
  "runtime_certification_created",
  "technical_signoff_created",
  "provider_routing_authorized",
  "real_private_case_processing_authorized",
  "storage_implementation_created",
  "database_implementation_created",
  "object_storage_implementation_created",
  "audit_log_storage_created",
  "retention_implementation_created",
  "deletion_implementation_created",
  "purge_implementation_created",
  "erasure_implementation_created",
  "encryption_implementation_created",
  "key_management_implementation_created",
  "rbac_access_control_created",
  "admin_support_runtime_access_created",
  "pilot_runtime_created",
];

function assertDocIncludes(value) {
  assert.match(doc, new RegExp(`\\b${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`));
}

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
    if (positiveAuthorizationKeys.includes(key)) {
      assert.equal(item, false, `${key} must remain false`);
    }
    assertNoPositiveAuthorization(item);
  }
}

test("control-plan and registry location IDs remain exactly aligned", () => {
  assert.deepEqual(registryLocationIds, [
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
  ]);

  assert.deepEqual(docLocationIds, registryLocationIds);
});

test("registry material classes and denied high-risk classes remain documented", () => {
  for (const materialClass of registry.listMaterialClasses()) {
    assertDocIncludes(materialClass);
  }

  for (const [materialClass, denial] of Object.entries(
    registry.HIGH_RISK_MATERIAL_CLASSES_DENIED,
  )) {
    assertDocIncludes(materialClass);
    assert.match(doc, new RegExp(`\\| ${materialClass} \\| DENIED_NOT_AUTHORIZED \\|`));
    assert.equal(denial.denied, true);
    assertNoPositiveAuthorization(denial);
  }
});

test("required inventory fields and dependency map remain aligned", () => {
  for (const field of registry.getRequiredInventoryFields()) {
    assert.match(doc, new RegExp(field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  for (const dependency of registry.getStorageDependencyMap()) {
    assert.match(doc, new RegExp(dependency.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("non-overclaim rules remain aligned between doc and registry", () => {
  for (const rule of registry.getStorageNonOverclaimRules()) {
    assert.match(doc, new RegExp(rule.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("final non-authorization tokens remain preserved in doc and registry helpers", () => {
  for (const token of [
    "NO_STORAGE_IMPLEMENTATION",
    "NO_DATABASE_IMPLEMENTATION",
    "NO_OBJECT_STORAGE_IMPLEMENTATION",
    "NO_AUDIT_LOG_STORAGE",
    "NO_RETENTION_IMPLEMENTATION",
    "NO_DELETION_IMPLEMENTATION",
    "NO_PURGE_IMPLEMENTATION",
    "NO_ERASURE_IMPLEMENTATION",
    "NO_ENCRYPTION_IMPLEMENTATION",
    "NO_KEY_MANAGEMENT_IMPLEMENTATION",
    "NO_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "NO_RELEASE_APPROVAL",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "NO_RUNTIME_CERTIFICATION",
    "NO_TECHNICAL_SIGN_OFF",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assertDocIncludes(token);
  }

  assertNoPositiveAuthorization(registry.listDataLocations());
  assertNoPositiveAuthorization(registry.getStorageRegistryNonAuthorizationStatus());
  assertNoPositiveAuthorization(registry.getDataLocation("UNKNOWN_LOCATION"));
  assertNoPositiveAuthorization(registry.getHighRiskMaterialClassDenial("UNKNOWN_MATERIAL"));
});

test("alignment proof does not create implementation or approval semantics", () => {
  const forbiddenPositiveClaims = [
    /^STORAGE_IMPLEMENTED$/m,
    /^DATABASE_IMPLEMENTED$/m,
    /^OBJECT_STORAGE_IMPLEMENTED$/m,
    /^AUDIT_LOG_STORAGE_IMPLEMENTED$/m,
    /^RETENTION_IMPLEMENTED$/m,
    /^DELETION_IMPLEMENTED$/m,
    /^PURGE_IMPLEMENTED$/m,
    /^ERASURE_IMPLEMENTED$/m,
    /^ENCRYPTION_IMPLEMENTED$/m,
    /^KEY_MANAGEMENT_IMPLEMENTED$/m,
    /^RBAC_IMPLEMENTED$/m,
    /^ACCESS_CONTROL_ENFORCED$/m,
    /^PROVIDER_ROUTING_AUTHORIZED$/m,
    /^PILOT_IMPLEMENTED$/m,
    /^RELEASE_APPROVAL_CREATED$/m,
    /^EXTERNAL_USE_AUTHORIZED$/m,
    /^PRODUCT_CANDIDATE_SELECTED$/m,
    /^RUNTIME_CERTIFICATION_CREATED$/m,
    /^TECHNICAL_SIGN_OFF_CREATED$/m,
  ];

  for (const forbiddenClaim of forbiddenPositiveClaims) {
    assert.doesNotMatch(doc, forbiddenClaim);
  }

  assertNoPositiveAuthorization(registry.listDataLocations());
  assertNoPositiveAuthorization(registry.getStorageRegistryNonAuthorizationStatus());
});
