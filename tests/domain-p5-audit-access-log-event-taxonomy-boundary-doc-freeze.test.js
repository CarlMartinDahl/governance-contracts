const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_P5_AUDIT_ACCESS_LOG_EVENT_TAXONOMY_BOUNDARY_v1.md",
);
const docText = fs.readFileSync(docPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(haystack, values) {
  for (const value of values) {
    assert.match(haystack, new RegExp(escapeRegExp(value)), `missing ${value}`);
  }
}

function assertDoesNotMatchAny(haystack, patterns) {
  for (const pattern of patterns) {
    assert.doesNotMatch(haystack, pattern);
  }
}

function sectionBetween(title, nextTitle) {
  const start = docText.indexOf(`## ${title}`);
  assert.notEqual(start, -1, `missing section ${title}`);
  const next = nextTitle ? docText.indexOf(`## ${nextTitle}`, start + 1) : -1;
  return docText.slice(start, next === -1 ? undefined : next);
}

const statusTokens = [
  "P5_AUDIT_ACCESS_LOG_EVENT_TAXONOMY_BOUNDARY",
  "DOCS_ONLY",
  "P5_AUDIT_ACCESS_LOG_EVENT_TAXONOMY_ONLY",
  "PRIVATE_CONTROL_PLANE_SPECIFICATION_ONLY",
  "PRIVATE_NO_CONTENT_EVENT_TAXONOMY_ONLY",
  "PRIVATE_AUDIT_ACCESS_LOG_EVENT_VOCABULARY_ONLY",
  "PRIVATE_ALLOWED_PROHIBITED_EVENT_FIELD_VOCABULARY_ONLY",
  "PRIVATE_REASON_CODE_VOCABULARY_ONLY",
  "FUTURE_EVENT_TAXONOMY_ONLY",
  "FUTURE_EVENT_TAXONOMY_TO_CONTROL_PLANE_MAPPING_ONLY",
  "EXISTING_AUDIT_ACCESS_LOG_BOUNDARIES_CONTEXT_ONLY",
  "NOT_REPO_EVIDENCE",
  "NOT_CI_EVIDENCE",
  "NOT_TECHNICAL_EVIDENCE",
  "NOT_RUNTIME_CERTIFICATION",
  "NOT_TECHNICAL_SIGN_OFF",
  "NOT_RELEASE_APPROVAL",
  "NO_IMPLEMENTATION_CREATED",
  "NO_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "AUDIT_LOGGING_NOT_IMPLEMENTED",
  "ACCESS_LOGGING_NOT_IMPLEMENTED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "EVENT_EMITTER_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "FORMAL_AUDIT_LOGGING_NOT_EVIDENCED",
  "ACCESS_LOGGING_NOT_EVIDENCED",
  "LOCAL_LOGS_NOT_CI_EVIDENCE",
  "LOCAL_LOGS_NOT_PACKET_COMPONENTS",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "RETENTION_POLICY_NOT_CREATED",
  "DELETION_POLICY_NOT_CREATED",
  "PURGE_POLICY_NOT_CREATED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "PROVIDER_REGISTRY_REQUIRED",
  "PROVIDER_STATUS_REQUIRED",
  "PROVIDER_RETENTION_DELETION_POSTURE_REQUIRED",
  "PROVIDER_AUDITABILITY_REQUIRED",
  "PROVIDER_TOKEN_URL_SECRET_HANDLING_REQUIRED",
  "DATA_ROUTING_MAP_REQUIRED",
  "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST",
  "PRODUCT_CANDIDATE_NONE",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "NO_DELIVERY_TO_EXTERNAL_REVIEWER",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
  "NO_SECURITY_FINDING_CREATED",
  "NO_VULNERABILITY_FINDING_CREATED",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "NO_BLOCKER_RESOLVED",
  "NO_BLOCKER_CLOSURE",
  "NO_DEPENDENCY_CLOSURE",
];

const eventFamilies = [
  "MATERIAL_CLASSIFICATION_EVENT",
  "SCOPE_DECLARATION_EVENT",
  "SCOPE_DENIAL_EVENT",
  "RBAC_PERMISSION_CHECK_EVENT",
  "LIFECYCLE_RETENTION_EVENT",
  "LIFECYCLE_DELETION_REQUEST_EVENT",
  "LIFECYCLE_DELETION_APPROVAL_DENIAL_EVENT",
  "LIFECYCLE_DELETION_EXECUTION_EVENT",
  "LIFECYCLE_DELETION_VERIFICATION_EVENT",
  "PURGE_EVENT",
  "ADMIN_SUPPORT_ACCESS_ATTEMPT_EVENT",
  "ADMIN_SUPPORT_BYPASS_DENIAL_EVENT",
  "RAW_MATERIAL_ROUTE_DENIAL_EVENT",
  "SOURCE_PACKAGE_ROUTE_DENIAL_EVENT",
  "PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_DENIAL_EVENT",
  "THIRD_PARTY_ROUTE_DENIAL_EVENT",
  "PROVIDER_STATUS_GAP_EVENT",
  "EXPORT_DOWNLOAD_REVIEW_EVENT",
  "PACKET_DELIVERY_PROMOTION_REVIEW_EVENT",
  "HUMAN_PROFESSIONAL_REVIEW_GATE_EVENT",
  "LOCAL_LOG_TEST_TRANSCRIPT_HANDLING_EVENT",
  "AUDIT_LOG_VIEW_ACCESS_EVENT",
];

const allowedEventContent = [
  "event family",
  "event type candidate",
  "decision status",
  "reason code",
  "material class",
  "actor category",
  "role/permission concept",
  "tenant scope category",
  "case scope category",
  "object scope category",
  "function scope category",
  "property scope category",
  "route/surface category",
  "lifecycle state category",
  "provider category reference",
  "timestamp category only",
  "no-raw marker",
  "no-private marker",
  "no-source-locator marker",
  "no-url marker",
  "no-token/secret marker",
  "blocker/gap reference",
  "future correlation category that is not a source locator",
];

const prohibitedEventContent = [
  "raw source text",
  "private facts",
  "source locators",
  "filenames/private paths",
  "exact local paths",
  "page references",
  "URLs",
  "social-media URLs",
  "tokens",
  "secrets",
  "provider payloads",
  "prompts",
  "responses",
  "PDF/image/screenshot/metadata content",
  "exact raw timestamps",
  "sensitive personal details",
  "private identifiers",
  "legal conclusions",
  "clinical conclusions",
  "evidentiary conclusions",
  "case-truth conclusions",
  "security findings",
  "vulnerability findings",
  "severity",
  "remediation",
  "product-candidate claims",
  "external-use claims",
  "External Reviewer delivery readiness claims",
];

const reasonCodes = [
  "UNKNOWN_MATERIAL_CLASS_BLOCKED",
  "RAW_PRIVATE_SOURCE_MATERIAL_BLOCKED",
  "SOURCE_PACKAGE_MATERIAL_BLOCKED",
  "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_BLOCKED",
  "THIRD_PARTY_ROUTED_MATERIAL_BLOCKED",
  "SOURCE_LOCATOR_BLOCKED",
  "URL_SOCIAL_URL_BLOCKED",
  "TOKEN_SECRET_BLOCKED",
  "TENANT_SCOPE_UNKNOWN",
  "WRONG_TENANT_DENIED",
  "CASE_SCOPE_UNKNOWN",
  "WRONG_CASE_DENIED",
  "WRONG_OBJECT_DENIED",
  "WRONG_FUNCTION_DENIED",
  "WRONG_PROPERTY_DENIED",
  "ROUTE_SURFACE_UNKNOWN",
  "PROVIDER_ROUTE_DENIED",
  "PROVIDER_STATUS_UNKNOWN_BLOCKED",
  "EXPORT_ROUTE_NOT_AUTHORIZED",
  "DELIVERY_ROUTE_NOT_AUTHORIZED",
  "RETENTION_POLICY_REQUIRED",
  "DELETION_POLICY_REQUIRED",
  "PURGE_POLICY_REQUIRED",
  "RBAC_REQUIRES_MATERIAL_CLASS",
  "RBAC_REQUIRES_TENANT_CASE_SCOPE",
  "ADMIN_SUPPORT_BYPASS_DENIED",
  "ADMIN_SUPPORT_RAW_ACCESS_DENIED",
  "ADMIN_SUPPORT_SELF_APPROVAL_DENIED",
  "ADMIN_SUPPORT_HUMAN_REVIEW_SUBSTITUTION_DENIED",
  "AUDIT_EVENT_RAW_CONTENT_REJECTED",
  "AUDIT_EVENT_SOURCE_LOCATOR_REJECTED",
  "AUDIT_EVENT_URL_TOKEN_SECRET_REJECTED",
  "LOCAL_LOG_NOT_CI_EVIDENCE",
  "DOCS_ONLY_NOT_RUNTIME_ENFORCEMENT",
  "NO_BLOCKER_CLOSURE",
];

const surfaces = [
  "material classification",
  "tenant/case/object/function/property scope check",
  "RBAC permission check",
  "retention/deletion lifecycle decision",
  "deletion execution/verification",
  "purge decision",
  "admin/support access attempt",
  "admin/support bypass-prevention denial",
  "raw/private/source route denial",
  "source-package route denial",
  "PDF/image/screenshot/metadata route denial",
  "third-party route denial",
  "provider status gap",
  "export/download review",
  "packet/delivery promotion review",
  "human/professional review gate",
  "local log/test transcript handling",
  "audit-log view/access",
];

const dependencyTokens = [
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_REQUIRED",
  "AUDIT_LOGGING_IMPLEMENTATION_REQUIRED",
  "ACCESS_LOGGING_IMPLEMENTATION_REQUIRED",
  "EVENT_TAXONOMY_RUNTIME_CODE_REQUIRED",
  "LOG_SCHEMA_REQUIRED",
  "LOG_STORAGE_REQUIRED",
  "NO_CONTENT_EVENT_EMITTER_REQUIRED",
  "LOCAL_LOGS_NOT_CI_EVIDENCE",
  "LOCAL_LOGS_NOT_PACKET_COMPONENTS",
  "RBAC_MODEL_REQUIRED",
  "ROLE_PERMISSION_MODEL_REQUIRED",
  "ADMIN_SUPPORT_MODEL_REQUIRED",
  "ADMIN_SUPPORT_BYPASS_PREVENTION_REQUIRED",
  "RETENTION_POLICY_REQUIRED",
  "DELETION_POLICY_REQUIRED",
  "PURGE_POLICY_REQUIRED",
  "MATERIAL_CLASS_LIFECYCLE_POLICY_REQUIRED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "RAW_PRIVATE_SOURCE_MATERIAL_DENY_BY_DEFAULT",
  "SOURCE_PACKAGE_MATERIAL_DENY_BY_DEFAULT",
  "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_DENY_BY_DEFAULT",
  "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL_DENY_BY_DEFAULT",
  "QUARANTINE_OR_BLOCK_PATH_REQUIRED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "PROVIDER_REGISTRY_REQUIRED",
  "PROVIDER_STATUS_REQUIRED",
  "PROVIDER_RETENTION_DELETION_POSTURE_REQUIRED",
  "PROVIDER_AUDITABILITY_REQUIRED",
  "PROVIDER_TOKEN_URL_SECRET_HANDLING_REQUIRED",
  "DATA_ROUTING_MAP_REQUIRED",
  "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST",
];

const activeBlockers = [
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "AUDIT_LOGGING_NOT_IMPLEMENTED",
  "ACCESS_LOGGING_NOT_IMPLEMENTED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "EVENT_EMITTER_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "FORMAL_AUDIT_LOGGING_NOT_EVIDENCED",
  "ACCESS_LOGGING_NOT_EVIDENCED",
  "LOCAL_LOGS_NOT_CI_EVIDENCE",
  "LOCAL_LOGS_NOT_PACKET_COMPONENTS",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST",
  "NO_BLOCKER_RESOLVED",
];

test("P5 doc-freeze declares docs-only taxonomy boundary and limits", () => {
  assert.match(docText, /^# P5 Audit Access Log Event Taxonomy Boundary v1/m);
  assertIncludesAll(docText, [
    "freezes only the private GPT working material `P5_AUDIT_ACCESS_LOG_EVENT_TAXONOMY_SPEC_v0`",
    "P5 is private control-plane specification only",
    "future event-taxonomy-to-control-plane mapping only",
    "Existing audit/access-log boundaries are context only",
    "P5's distinct value is the P1-P4 no-content event taxonomy bridge",
    "Human and professional review remains required",
    "`DOCS_ONLY` boundaries are not runtime enforcement",
  ]);
  assertIncludesAll(docText, statusTokens);
});

test("P5 source context and purpose stay inside declared source universe", () => {
  const sourceContext = sectionBetween("Source Context", "P5 Purpose");
  assertIncludesAll(sourceContext, [
    "Source inputs:",
    "Source universe declared:",
    "Searched:",
    "Not searched by scope:",
    "Private GPT working material named `P5_AUDIT_ACCESS_LOG_EVENT_TAXONOMY_SPEC_v0`",
    "Existing repository docs and tests used only as structural context",
    "Raw messages.",
    "Private facts.",
    "Source packages.",
    "External websites.",
  ]);

  const purpose = sectionBetween("P5 Purpose", "Distinct Value");
  assertIncludesAll(purpose, [
    "Define a no-content audit/access-log event taxonomy for future control-plane decisions",
    "material classification decisions may later be logged without raw/private/source leakage",
    "scope denials may later be logged without source locators",
    "RBAC permission checks may later be logged without private content",
    "lifecycle retention/deletion/purge decisions may later be logged without raw/private/source content",
    "admin/support bypass attempts may later be logged as no-content denial events",
    "raw-routing denials may later be logged without raw material",
    "third-party route denials may later be logged without provider payloads, URLs, tokens, or secrets",
    "export/download and packet/delivery review actions may later be logged without delivery approval",
    "human/professional review gates may later be logged without substituting for review",
    "local-log/test-transcript handling as not CI evidence and not packet component",
    "Preserve the human/professional review gate",
  ]);
});

test("P5 vocabulary lists include event families, fields, prohibitions, reasons, and surfaces", () => {
  assertIncludesAll(sectionBetween("P5 Event Families", "Allowed Event Content"), eventFamilies);
  assertIncludesAll(sectionBetween("Allowed Event Content", "Prohibited Event Log Content"), allowedEventContent);
  assertIncludesAll(sectionBetween("Prohibited Event Log Content", "Reason-Code Vocabulary Candidates"), prohibitedEventContent);
  assertIncludesAll(sectionBetween("Reason-Code Vocabulary Candidates", "P5 Surfaces"), reasonCodes);
  assertIncludesAll(sectionBetween("P5 Surfaces", "Event Taxonomy Matrix"), surfaces);
});

test("P5 event taxonomy matrix covers every family without implementation claims", () => {
  const matrix = sectionBetween("Event Taxonomy Matrix", "AUDIT_ACCESS_LOG_DEPENDENCIES");
  assertIncludesAll(matrix, [
    "Event family",
    "Related control-plane surface",
    "Allowed no-content fields",
    "Prohibited content",
    "Current implementation status",
    "Blocker status",
  ]);
  assertIncludesAll(matrix, eventFamilies);

  const tableRows = matrix
    .split("\n")
    .filter((line) => line.startsWith("| `"));
  assert.equal(tableRows.length, eventFamilies.length);

  for (const row of tableRows) {
    assertIncludesAll(row, [
      "future taxonomy only",
      "not implemented",
      "no event emitter",
      "no runtime taxonomy code",
      "no log schema",
      "no log storage",
      "no audit/access-log implementation",
      "no raw/private/source-locator/URL/token leakage",
      "no blocker closure",
    ]);
  }
});

test("P5 dependencies, future evidence, future tests, and active blockers are explicit", () => {
  assertIncludesAll(docText, [
    "## AUDIT_ACCESS_LOG_DEPENDENCIES",
    "## RBAC_ADMIN_SUPPORT_DEPENDENCIES",
    "## RETENTION_DELETION_DEPENDENCIES",
    "## RAW_ROUTING_DEPENDENCIES",
    "## THIRD_PARTY_DEPENDENCIES",
    "## GLOBAL_DEPENDENCIES",
  ]);
  assertIncludesAll(docText, dependencyTokens);

  const futureEvidence = sectionBetween("Required Future Implementation Evidence", "Required Future Tests");
  assertIncludesAll(futureEvidence, [
    "audit/access-log implementation",
    "audit logging implementation",
    "access logging implementation",
    "no-content event emitter",
    "event taxonomy runtime code",
    "event type registry",
    "reason-code registry",
    "log schema",
    "log storage",
    "log access-control model",
    "log retention policy",
    "log deletion policy",
    "log purge policy where applicable",
    "local-log handling policy",
    "local logs not CI evidence rule",
    "local logs not packet components rule",
    "RBAC integration",
    "admin/support bypass-prevention integration",
    "retention/deletion lifecycle integration",
    "raw-routing denial integration",
    "third-party provider route-denial integration",
    "provider status gap integration",
    "no raw/private/source-locator/URL/token/secret leakage tests",
  ]);

  const futureTests = sectionBetween("Required Future Tests", "Active Blockers");
  assertIncludesAll(futureTests, [
    "audit event contains only allowed no-content fields",
    "audit event rejects raw source text",
    "audit event rejects private facts",
    "audit event rejects source locator",
    "audit event rejects local file path",
    "audit event rejects URL",
    "audit event rejects social URL",
    "audit event rejects token",
    "audit event rejects secret",
    "audit event rejects prompt/response/provider payload",
    "audit event rejects PDF/image/screenshot/metadata content",
    "audit event rejects exact raw timestamp",
    "audit event rejects legal/clinical/evidentiary/case-truth conclusion",
    "wrong tenant/case/object/function/property denial no-content",
    "admin/support bypass denial no-content",
    "raw/private/source route denial no-content",
    "source-package route denial no-content",
    "PDF/image/screenshot/metadata route denial no-content",
    "third-party route denial no-content",
    "provider status unknown no-content gap",
    "local log not CI evidence",
    "local log not packet component",
    "event taxonomy not runtime code",
    "DOCS_ONLY not runtime enforcement",
  ]);

  assertIncludesAll(sectionBetween("Active Blockers", "Closure Criteria"), activeBlockers);
});

test("P5 closure, relationships, proof limits, and non-authorization remain frozen", () => {
  assertIncludesAll(sectionBetween("Closure Criteria", "Closure Not Allowed With"), [
    "Closure is allowed only after separate future work creates and proves",
    "Human/professional review",
    "Local green checks alone are not release approval",
  ]);
  assertIncludesAll(sectionBetween("Closure Not Allowed With", "Duplication Risk"), activeBlockers);
  assertIncludesAll(sectionBetween("Duplication Risk", "Relationships"), [
    "must not reopen or duplicate existing audit/access-log readiness boundaries",
    "future no-content event taxonomy bridge",
    "must not be cited as runtime implementation evidence",
  ]);
  assertIncludesAll(sectionBetween("Relationships", "What This Does Not Prove"), [
    "P1 relationship",
    "P2 relationship",
    "P3 relationship",
    "P4 relationship",
    "Existing audit/access-log relationship",
  ]);
  assertIncludesAll(sectionBetween("What This Does Not Prove", "Non-Authorization"), [
    "It does not prove implementation",
    "It does not prove runtime behavior",
    "It does not prove schema/API/package behavior",
    "It does not prove audit logging",
    "It does not prove access logging",
    "It does not resolve blockers or dependencies",
  ]);
  assertIncludesAll(sectionBetween("Non-Authorization"), [
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "NO_DELIVERY_TO_EXTERNAL_REVIEWER",
    "NOT_RELEASE_APPROVAL",
    "NOT_TECHNICAL_SIGN_OFF",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_BLOCKER_RESOLVED",
    "NO_BLOCKER_CLOSURE",
    "NO_DEPENDENCY_CLOSURE",
  ]);
});

test("P5 doc contains no raw source-locator-like or private-material patterns", () => {
  assertDoesNotMatchAny(docText, [
    /\+46\d+/,
    /file:\/\/\/Users/i,
    /https?:\/\/\S+/i,
    /instagram\.com/i,
    /Sidan\s+\d+\s+av\s+\d+/i,
    /\bJan(?:uary)?\s+2021\b/i,
    /\bFeb(?:ruary)?\s+2021\b/i,
    /\b[a-z]{5,}-[a-z0-9]{5,}-[A-Za-z0-9]{5,}\b/,
  ]);
});
