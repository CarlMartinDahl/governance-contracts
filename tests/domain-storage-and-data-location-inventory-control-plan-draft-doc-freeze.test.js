const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const test = require("node:test");

const DOC_PATH = "docs/DOMAIN_CONTRACTS_STORAGE_AND_DATA_LOCATION_INVENTORY_CONTROL_PLAN_DRAFT_v1.md";
const doc = readFileSync(DOC_PATH, "utf8");

const locationIds = [
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

const materialClasses = [
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

const highRiskMaterialClasses = [
  "RAW_PRIVATE_SOURCE_MATERIAL",
  "SOURCE_PACKAGE_MATERIAL",
  "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
  "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
  "PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL",
  "TOKEN_URL_SECRET_MATERIAL",
];

test("storage and data-location control-plan draft exists with status and non-authorizations", () => {
  assert.match(doc, /^# Storage and Data Location Inventory Control Plan Draft v1$/m);
  for (const token of [
    "DOCS_ONLY / CONTROL_PLAN_DRAFT_ONLY",
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
    "NO_RBAC_IMPLEMENTATION",
    "NO_ACCESS_CONTROL_ENFORCEMENT",
    "NO_ADMIN_SUPPORT_RUNTIME_ACCESS",
    "NO_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "NO_RELEASE_APPROVAL",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "NO_RUNTIME_CERTIFICATION",
    "NO_TECHNICAL_SIGN_OFF",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.match(doc, new RegExp(token));
  }
});

test("all L01-L25 data-location IDs exist in taxonomy and matrix rows", () => {
  for (const locationId of locationIds) {
    assert.match(doc, new RegExp(`- ${locationId}`));
    assert.match(doc, new RegExp(`\\| ${locationId} \\|`));
  }
});

test("material classes exist and high-risk material remains denied or not authorized", () => {
  for (const materialClass of materialClasses) {
    assert.match(doc, new RegExp(materialClass));
  }

  for (const materialClass of highRiskMaterialClasses) {
    assert.match(doc, new RegExp(`\\| ${materialClass} \\| DENIED_NOT_AUTHORIZED \\|`));
  }
});

test("required inventory fields and dependency map terms are frozen", () => {
  for (const field of [
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
    "RBAC/access-control",
    "admin/support access",
    "audit/access logs",
    "retention/deletion/purge/erasure",
    "encryption/key management",
    "provider routing",
    "recipient/downstream purge verification",
    "internal sanitized pilot runtime",
  ]) {
    assert.match(doc, new RegExp(field.replace(/[/-]/g, "[$&]")));
  }
});

test("SDL-001 through SDL-016 threat rows are present", () => {
  for (let threatIndex = 1; threatIndex <= 16; threatIndex += 1) {
    assert.match(doc, new RegExp(`SDL-${String(threatIndex).padStart(3, "0")}`));
  }
});

test("required evidence, required tests, non-overclaim rules, and readiness outcome are present", () => {
  for (const section of [
    "## Required Evidence Before Closure",
    "tracked repo location map",
    "generated artifact location map",
    "local log policy",
    "CI log policy",
    "provider storage policy",
    "recipient/downstream storage policy",
    "## Required Tests Before Implementation Closure",
    "workflow uses npm ci, not npm install",
    "local logs not treated as CI evidence",
    "CI logs not treated as release evidence",
    "storage location map contains required fields",
    "recipient purge cannot be claimed from recipient response alone",
    "## Non-Overclaim Rules",
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
    "STORAGE_AND_DATA_LOCATION_INVENTORY_NOT_COMPLETE",
    "STORAGE_IMPLEMENTATION_NOT_READY",
    "DATABASE_OR_PERSISTED_STORAGE_NOT_IMPLEMENTED",
    "AUDIT_LOG_STORAGE_NOT_IMPLEMENTED",
    "CI_EVIDENCE_LOCATION_PARTIALLY_CREATED_BY_PR_2",
    "PACKAGE_LOCK_AUDITABILITY_CREATED_BY_PR_2",
    "LOCAL_UNTRACKED_FILES_PRESENT_NOT_INSPECTED",
    "FUTURE_RUNTIME_STORAGE_CANDIDATE_ONLY",
  ]) {
    assert.match(doc, new RegExp(section.replace(/[/-]/g, "[$&]")));
  }
});

test("control-plan draft does not create forbidden positive authorization claims", () => {
  for (const forbiddenClaim of [
    "RELEASE_APPROVAL_CREATED",
    "EXTERNAL_USE_AUTHORIZED",
    "PRODUCT_CANDIDATE_SELECTED",
    "RUNTIME_CERTIFICATION_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "STORAGE_IMPLEMENTED",
    "DATABASE_IMPLEMENTED",
    "AUDIT_LOG_STORAGE_IMPLEMENTED",
    "RETENTION_IMPLEMENTED",
    "DELETION_IMPLEMENTED",
    "PURGE_IMPLEMENTED",
    "ERASURE_IMPLEMENTED",
    "ENCRYPTION_IMPLEMENTED",
    "KEY_MANAGEMENT_IMPLEMENTED",
    "RBAC_IMPLEMENTED",
    "ACCESS_CONTROL_ENFORCED",
    "PROVIDER_ROUTING_AUTHORIZED",
    "REAL_PRIVATE_CASE_PROCESSING_AUTHORIZED",
  ]) {
    assert.doesNotMatch(doc, new RegExp(`^- ${forbiddenClaim}$`, "m"));
    assert.doesNotMatch(doc, new RegExp(`\\b${forbiddenClaim}\\b\\s+(?:created|authorized|selected|enforced|ready)`, "i"));
  }
});
