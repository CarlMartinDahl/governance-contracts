const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_P2_RETENTION_DELETION_LIFECYCLE_CONTROL_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(values, text = docsText) {
  for (const value of values) {
    assert.match(text, new RegExp(escapeRegExp(value)));
  }
}

function assertDoesNotMatchAny(patterns, text = docsText) {
  for (const pattern of patterns) {
    assert.doesNotMatch(text, pattern);
  }
}

function assertNoLikelyRawTokenPattern(text = docsText) {
  const matches = text.match(/\b[a-z]{5,}-[a-z0-9]{5,}-[A-Za-z0-9]{5,}\b/g) || [];
  assert.deepEqual(matches.filter((match) => match !== "wrong-material-class"), []);
}

function sectionBetween(startHeading, endHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing start heading: ${startHeading}`);
  const end = docsText.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(end, -1, `missing end heading: ${endHeading}`);
  return docsText.slice(start, end);
}

const materialClasses = [
  "SANITIZED_TEXT_PRIMARY_MATERIAL",
  "REDACTED_REVIEW_SIGNAL_MATERIAL",
  "NO_RAW_METADATA_MANIFEST_MATERIAL",
  "GENERATED_ARTIFACT_OR_EXPORT_MATERIAL",
  "LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
  "RAW_PRIVATE_SOURCE_MATERIAL",
  "SOURCE_PACKAGE_MATERIAL",
  "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
  "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
  "HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
];

const retentionStates = [
  "RETENTION_NOT_AUTHORIZED",
  "EPHEMERAL_PRIVATE_WORKING_CONTEXT",
  "DOCS_ONLY_REPO_REFERENCE",
  "SANITIZED_REVIEW_SUMMARY",
  "LOCAL_TEST_TRANSCRIPT_SUMMARY",
  "GENERATED_ARTIFACT_CANDIDATE",
  "QUARANTINED_BLOCKED_MATERIAL",
  "RETENTION_POLICY_REQUIRED",
  "PROVIDER_RETENTION_UNKNOWN",
  "RETAINED_WITH_SCOPE_JUSTIFICATION",
  "RETENTION_CLOSED",
];

const deletionStates = [
  "DELETION_NOT_IMPLEMENTED",
  "DELETE_NOT_REQUESTED",
  "DELETE_REQUEST_REGISTERED",
  "DELETE_SCOPE_REVIEW_REQUIRED",
  "DELETE_ELIGIBLE_AFTER_AUTHORIZATION",
  "DELETE_BLOCKED_BY_RETENTION_POLICY",
  "DELETE_EXECUTED_WITH_NO_CONTENT_AUDIT",
  "DELETE_VERIFICATION_PENDING",
  "DELETE_VERIFIED",
  "DELETE_DENIED",
  "PURGE_REQUIRED",
  "PROVIDER_DELETION_UNKNOWN",
  "DELETION_CLOSED",
];

const activeBlockers = [
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "RETENTION_POLICY_NOT_CREATED",
  "DELETION_POLICY_NOT_CREATED",
  "PURGE_POLICY_NOT_CREATED",
  "PROVIDER_RETENTION_DELETION_POSTURE_NOT_CREATED",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST",
  "NO_BLOCKER_RESOLVED",
];

test("boundary doc exists and freezes P2 docs-only lifecycle posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "Boundary name: `P2_RETENTION_DELETION_LIFECYCLE_CONTROL_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `P2_RETENTION_DELETION_LIFECYCLE_CONTROL_ONLY`",
    "P2_RETENTION_DELETION_LIFECYCLE_CONTROL_SPEC_v0",
    "P2 defines lifecycle vocabulary and future closure criteria only",
  ]);
});

test("private specification and no-overclaim status tokens appear", () => {
  assertIncludesAll([
    "P2_RETENTION_DELETION_LIFECYCLE_CONTROL_BOUNDARY",
    "DOCS_ONLY",
    "P2_RETENTION_DELETION_LIFECYCLE_CONTROL_ONLY",
    "PRIVATE_CONTROL_PLANE_SPECIFICATION_ONLY",
    "PRIVATE_LIFECYCLE_VOCABULARY_ONLY",
    "PRIVATE_RETENTION_DELETION_STATE_MODEL_ONLY",
    "FUTURE_CLOSURE_CRITERIA_ONLY",
    "NOT_REPO_EVIDENCE",
    "NOT_CI_EVIDENCE",
    "NOT_TECHNICAL_EVIDENCE",
    "NOT_RUNTIME_CERTIFICATION",
    "NOT_TECHNICAL_SIGN_OFF",
    "NOT_RELEASE_APPROVAL",
    "NO_IMPLEMENTATION_CREATED",
    "NO_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
  ]);
});

test("no implementation or runtime behavior change tokens appear", () => {
  assertIncludesAll([
    "RETENTION_DELETION_NOT_IMPLEMENTED",
    "RETENTION_POLICY_NOT_CREATED",
    "DELETION_POLICY_NOT_CREATED",
    "PURGE_POLICY_NOT_CREATED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ROLE_PERMISSION_MODEL_NOT_CREATED",
    "ADMIN_SUPPORT_MODEL_NOT_CREATED",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
    "LOG_SCHEMA_NOT_CREATED",
    "LOG_STORAGE_NOT_CREATED",
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
    "PROVIDER_RETENTION_DELETION_POSTURE_NOT_CREATED",
  ]);
});

test("all material classes, retention states, and deletion states appear", () => {
  assertIncludesAll(materialClasses);
  assertIncludesAll(retentionStates);
  assertIncludesAll(deletionStates);
});

test("default lifecycle posture, allowed-now, and prohibited-now sections appear", () => {
  assertIncludesAll([
    "## Default Lifecycle Posture",
    "DENY_BY_DEFAULT_FOR_RAW_PRIVATE_SOURCE_MATERIAL",
    "do not retain raw/private/source/source-package/provider-routed material unless",
    "deletion cannot be claimed as completed until lifecycle implementation and",
    "lifecycle logs must not include raw source text",
    "lifecycle logs must not include private facts",
    "lifecycle logs must not include source locators",
    "lifecycle logs must not include filenames/private paths",
    "lifecycle logs must not include URLs",
    "lifecycle logs must not include tokens",
    "lifecycle logs must not include page references",
    "lifecycle logs must not include exact timestamps",
    "lifecycle logs must not include legal/clinical/evidentiary/case-truth",
    "lifecycle logs must not include product/external-use claims",
    "lifecycle logs must not include private identifiers",
    "## Allowed Now",
    "private GPT control-plane specification",
    "private lifecycle vocabulary",
    "private retention/deletion state model",
    "private blocker mapping",
    "private closure criteria draft",
    "no-raw / no-source-locator / no-conclusion status language",
    "## Prohibited Now",
    "retention implementation",
    "deletion implementation",
    "purge implementation",
    "provider deletion claim",
    "provider retention claim",
    "blocker closure",
  ]);
});

test("audit, RBAC, third-party, and raw-material dependency sections appear", () => {
  assertIncludesAll([
    "AUDIT_DEPENDENCIES",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_REQUIRED",
    "EVENT_TAXONOMY_RUNTIME_CODE_REQUIRED",
    "LOG_SCHEMA_REQUIRED",
    "LOG_STORAGE_REQUIRED",
    "NO_CONTENT_LIFECYCLE_EVENT_REQUIRED",
    "RBAC_DEPENDENCIES",
    "RBAC_MODEL_REQUIRED",
    "ROLE_PERMISSION_MODEL_REQUIRED",
    "ADMIN_SUPPORT_MODEL_REQUIRED",
    "ADMIN_SUPPORT_BYPASS_PREVENTION_REQUIRED",
    "THIRD_PARTY_DEPENDENCIES",
    "PROVIDER_STATUS_REQUIRED",
    "PROVIDER_REGISTRY_REQUIRED",
    "PROVIDER_RETENTION_DELETION_POSTURE_REQUIRED",
    "PROVIDER_AUDITABILITY_REQUIRED",
    "PROVIDER_TOKEN_URL_SECRET_HANDLING_REQUIRED",
    "DATA_ROUTING_MAP_REQUIRED",
    "RAW_MATERIAL_ROUTING_DEPENDENCIES",
    "RAW_PRIVATE_SOURCE_MATERIAL_DENY_BY_DEFAULT",
    "SOURCE_PACKAGE_MATERIAL_DENY_BY_DEFAULT",
    "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_DENY_BY_DEFAULT",
    "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL_DENY_BY_DEFAULT",
    "QUARANTINE_OR_BLOCK_PATH_REQUIRED",
  ]);
});

test("lifecycle matrix exists and has ten material-class rows", () => {
  const table = sectionBetween("## Lifecycle Matrix", "## Required Future Tests");
  assertIncludesAll([
    "Material class",
    "Current retention posture",
    "Current deletion posture",
    "Main dependency",
    "Closure status",
  ], table);

  const rows = table
    .split("\n")
    .filter((line) => line.startsWith("| `") && line.endsWith(" |"));
  assert.equal(rows.length, 10);

  for (const materialClass of materialClasses) {
    assert.ok(
      rows.some((line) => line.includes(`\`${materialClass}\``)),
      `missing lifecycle row for ${materialClass}`,
    );
  }

  assertIncludesAll([
    "may be specifiable later",
    "deletion policy required",
    "RBAC + audit dependency",
    "not delivery-approved",
    "deletion/purge policy required",
    "local only / not CI",
    "retention not authorized",
    "source-package policy dependency",
    "acquisition/retention not authorized",
    "provider deletion unknown",
    "review-only",
    "open",
  ], table);
});

test("future tests, blockers, closure criteria, and closure-not-allowed rules appear", () => {
  assertIncludesAll([
    "## Required Future Tests",
    "retention policy allow/deny tests by material class",
    "deletion request / approval / execution / verification tests",
    "purge tests",
    "wrong-tenant tests",
    "wrong-case tests",
    "wrong-material-class tests",
    "admin/support bypass-prevention tests",
    "no-content lifecycle audit tests",
    "no raw/private/source-locator leakage tests",
    "provider route denied-by-default tests",
    "provider retention/deletion unknown blocks route tests",
    "token/URL/secret not logged tests",
    "## Active Blockers",
    "## Closure Criteria",
    "written retention policy by material class",
    "delete request / execute / verify tests",
    "purge request / execute / verify tests",
    "explicit non-authorization preserved",
    "## Closure Not Allowed With",
    "private spec only",
    "DOCS_ONLY",
    "green local tests unrelated to lifecycle",
    "provider terms assumed but not evidenced",
  ]);
  assertIncludesAll(activeBlockers);
});

test("relationships, non-proof, and non-authorization sections appear", () => {
  assertIncludesAll([
    "## Relationships",
    "relationship to P1 material-class registry and scope model boundary: upstream",
    "relationship to existing retention/deletion control specification boundary:",
    "relationship to RBAC role/permission lifecycle authorization: context only",
    "relationship to admin/support bypass prevention: context only",
    "relationship to audit/access-log event taxonomy: context only",
    "relationship to raw-material routing deny-by-default: context only",
    "relationship to third-party provider routing status: context only",
    "relationship to global access-control threat model: context only",
    "none of these are implemented or closed by this boundary",
    "WHAT_THIS_DOES_NOT_PROVE",
    "not retention behavior",
    "not deletion behavior",
    "not purge behavior",
    "not retention policy",
    "not deletion policy",
    "not purge policy",
    "not provider deletion request",
    "not provider deletion verification",
    "not provider routing",
    "not third-party model/API use",
    "not raw-material routing",
    "not source package routing",
    "not PDF/image/screenshot/metadata acquisition",
    "not RBAC implementation",
    "not admin/support implementation",
    "not audit/access-log implementation",
    "not runtime/API/schema/package behavior",
    "not CI evidence",
    "not technical sign-off",
    "not runtime certification",
    "not release approval",
    "not product readiness",
    "not external-use readiness",
    "not External Reviewer-ready material",
    "not security finding",
    "not vulnerability finding",
    "not severity",
    "not remediation",
    "not blocker closure",
    "not dependency closure",
    "## Non-Authorization",
    "This boundary creates no Codex implementation",
  ]);
});

test("product, external-use, delivery, review, and closure non-authorization appear", () => {
  assertIncludesAll([
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "NO_DELIVERY_TO_EXTERNAL_REVIEWER",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_BLOCKER_RESOLVED",
    "NO_BLOCKER_CLOSURE",
    "NO_DEPENDENCY_CLOSURE",
    "Raw/source/private inspection remains unauthorized",
    "Source package inspection",
    "remains unauthorized",
    "PDF/image/screenshot/metadata inspection and metadata",
    "No real private run or new source window is",
  ]);
});

test("boundary doc contains no obvious raw/source-locator patterns", () => {
  assertDoesNotMatchAny([
    /\+46\d+/,
    /file:\/\/\/Users/i,
    /https?:\/\/\S+/i,
    /instagram\.com/i,
    /Sidan\s+\d+\s+av\s+\d+/i,
    /\bJan\s+\d{1,2},\s+2021\s+\d{1,2}:\d{2}:\d{2}\s+(AM|PM)\b/,
    /\bFeb\s+\d{1,2},\s+2021\s+\d{1,2}:\d{2}:\d{2}\s+(AM|PM)\b/,
  ]);
  assertNoLikelyRawTokenPattern();
});
