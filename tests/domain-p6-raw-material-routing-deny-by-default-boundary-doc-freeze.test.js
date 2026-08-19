const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_P6_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_BOUNDARY_v1.md",
);

assert.ok(fs.existsSync(docPath), "boundary file must exist");

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
  "P6_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_BOUNDARY",
  "DOCS_ONLY",
  "P6_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_ONLY",
  "PRIVATE_CONTROL_PLANE_SPECIFICATION_ONLY",
  "PRIVATE_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_VOCABULARY_ONLY",
  "PRIVATE_ROUTE_SURFACE_VOCABULARY_ONLY",
  "PRIVATE_ROUTE_STATUS_VOCABULARY_ONLY",
  "PRIVATE_MATERIAL_CLASS_ROUTE_POSTURE_ONLY",
  "FUTURE_ROUTE_DENY_QUARANTINE_BLOCK_REQUIREMENTS_ONLY",
  "FUTURE_NO_CONTENT_ROUTE_DENIAL_EVENT_REQUIREMENTS_ONLY",
  "FUTURE_ROUTE_DECISION_LAYER_ONLY",
  "P1_P5_INTEGRATED_ROUTE_DECISION_LAYER_ONLY",
  "EXISTING_RAW_MATERIAL_ROUTING_BOUNDARIES_CONTEXT_ONLY",
  "NOT_CI_EVIDENCE",
  "NOT_TECHNICAL_SIGN_OFF",
  "NOT_RELEASE_APPROVAL",
  "NO_IMPLEMENTATION_CREATED",
  "NO_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "RAW_MATERIAL_ROUTING_IMPLEMENTATION_NOT_CREATED",
  "ROUTE_POLICY_NOT_IMPLEMENTED",
  "ROUTE_DECISION_ENGINE_NOT_CREATED",
  "QUARANTINE_IMPLEMENTATION_NOT_CREATED",
  "BLOCK_PATH_IMPLEMENTATION_NOT_CREATED",
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
  "MATERIAL_CLASS_REGISTRY_NOT_IMPLEMENTED",
  "SCOPE_MODEL_NOT_IMPLEMENTED",
  "TENANT_CASE_OBJECT_FUNCTION_PROPERTY_SCOPE_NOT_IMPLEMENTED",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "RETENTION_POLICY_NOT_CREATED",
  "DELETION_POLICY_NOT_CREATED",
  "PURGE_POLICY_NOT_CREATED",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "AUDIT_LOGGING_NOT_IMPLEMENTED",
  "ACCESS_LOGGING_NOT_IMPLEMENTED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "EVENT_EMITTER_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
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

const routeSurfaces = [
  "MODEL_CONTEXT_ROUTE",
  "INTERNAL_REVIEW_ROUTE",
  "SANITIZED_REVIEW_SUMMARY_ROUTE",
  "LOCAL_LOG_ROUTE",
  "AUDIT_ACCESS_LOG_EVENT_ROUTE",
  "EXPORT_DOWNLOAD_ROUTE",
  "PACKET_DELIVERY_PROMOTION_ROUTE",
  "THIRD_PARTY_MODEL_API_ROUTE",
  "PROVIDER_API_ROUTE",
  "ADMIN_SUPPORT_ACCESS_ROUTE",
  "RETENTION_DELETION_LIFECYCLE_ROUTE",
  "PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION_ROUTE",
  "SOURCE_PACKAGE_ROUTE",
  "RAW_PRIVATE_SOURCE_ROUTE",
  "HUMAN_PROFESSIONAL_REVIEW_ROUTE",
];

const denyRules = [
  "UNKNOWN_MATERIAL_CLASS_ROUTE_DENIED",
  "RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_DENIED",
  "SOURCE_PACKAGE_MATERIAL_ROUTE_DENIED",
  "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_ROUTE_DENIED",
  "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL_ROUTE_DENIED",
  "RAW_PRIVATE_SOURCE_ROUTE_DENIED",
  "SOURCE_PACKAGE_ROUTE_DENIED",
  "PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_DENIED",
  "THIRD_PARTY_MODEL_API_ROUTE_DENIED",
  "PROVIDER_API_ROUTE_DENIED",
  "ADMIN_SUPPORT_RAW_ROUTE_DENIED",
  "EXPORT_DELIVERY_ROUTE_DENIED_UNLESS_FUTURE_REVIEW_GATE",
  "PACKET_DELIVERY_ROUTE_DENIED_UNLESS_FUTURE_REVIEW_GATE",
  "LOCAL_LOG_ROUTE_NO_CONTENT_ONLY",
  "AUDIT_EVENT_ROUTE_NO_CONTENT_ONLY",
  "PROVIDER_STATUS_UNKNOWN_BLOCKS_ROUTE",
  "PROVIDER_RETENTION_DELETION_UNKNOWN_BLOCKS_ROUTE",
  "PROVIDER_AUDITABILITY_UNKNOWN_BLOCKS_ROUTE",
  "PROVIDER_TOKEN_URL_SECRET_HANDLING_UNKNOWN_BLOCKS_ROUTE",
  "DATA_ROUTING_MAP_MISSING_BLOCKS_ROUTE",
  "RBAC_MODEL_MISSING_BLOCKS_ROUTE",
  "ADMIN_SUPPORT_MODEL_MISSING_BLOCKS_ROUTE",
  "RETENTION_DELETION_POLICY_MISSING_BLOCKS_ROUTE",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_MISSING_BLOCKS_ROUTE",
  "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_MISSING_BLOCKS_ROUTE",
];

const routeStatuses = [
  "ROUTE_NOT_AUTHORIZED",
  "ROUTE_DENIED_BY_DEFAULT",
  "ROUTE_BLOCKED_UNKNOWN_MATERIAL_CLASS",
  "ROUTE_BLOCKED_RAW_PRIVATE_SOURCE",
  "ROUTE_BLOCKED_SOURCE_PACKAGE",
  "ROUTE_BLOCKED_PDF_IMAGE_SCREENSHOT_METADATA",
  "ROUTE_BLOCKED_THIRD_PARTY_ROUTED_MATERIAL",
  "ROUTE_BLOCKED_PROVIDER_STATUS_UNKNOWN",
  "ROUTE_BLOCKED_RBAC_MISSING",
  "ROUTE_BLOCKED_ADMIN_SUPPORT_UNRESOLVED",
  "ROUTE_BLOCKED_AUDIT_LOGGING_MISSING",
  "ROUTE_BLOCKED_RETENTION_DELETION_MISSING",
  "ROUTE_BLOCKED_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_MISSING",
  "QUARANTINE_OR_BLOCK_REQUIRED",
  "NO_CONTENT_AUDIT_EVENT_REQUIRED",
  "ROUTE_ELIGIBLE_ONLY_AFTER_FUTURE_POLICY_AND_TESTS",
  "ROUTE_CLOSED",
];

const dependencyTokens = [
  "MATERIAL_AND_SCOPE_DEPENDENCIES",
  "MATERIAL_CLASS_REGISTRY_REQUIRED",
  "SCOPE_MODEL_REQUIRED",
  "TENANT_CASE_OBJECT_FUNCTION_PROPERTY_SCOPE_REQUIRED",
  "RBAC_ADMIN_SUPPORT_DEPENDENCIES",
  "RBAC_MODEL_REQUIRED",
  "ROLE_PERMISSION_MODEL_REQUIRED",
  "ADMIN_SUPPORT_MODEL_REQUIRED",
  "ADMIN_SUPPORT_BYPASS_PREVENTION_REQUIRED",
  "RETENTION_DELETION_DEPENDENCIES",
  "RETENTION_POLICY_REQUIRED",
  "DELETION_POLICY_REQUIRED",
  "PURGE_POLICY_REQUIRED",
  "MATERIAL_CLASS_LIFECYCLE_POLICY_REQUIRED",
  "AUDIT_ACCESS_LOG_DEPENDENCIES",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_REQUIRED",
  "AUDIT_LOGGING_IMPLEMENTATION_REQUIRED",
  "ACCESS_LOGGING_IMPLEMENTATION_REQUIRED",
  "EVENT_TAXONOMY_RUNTIME_CODE_REQUIRED",
  "EVENT_EMITTER_REQUIRED",
  "LOG_SCHEMA_REQUIRED",
  "LOG_STORAGE_REQUIRED",
  "NO_CONTENT_ROUTE_DENIAL_EVENT_REQUIRED",
  "RAW_ROUTING_DEPENDENCIES",
  "THIRD_PARTY_DEPENDENCIES",
  "GLOBAL_DEPENDENCIES",
  "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST",
];

const futureEvidence = [
  "Material-class registry.",
  "Scope model.",
  "Tenant/case/object/function/property scope model.",
  "Raw-material route policy.",
  "Route decision engine.",
  "Quarantine/block path.",
  "No-content route-denial event taxonomy runtime code.",
  "No-content event emitter.",
  "Audit/access-log implementation.",
  "Log schema.",
  "Log storage.",
  "RBAC integration.",
  "Admin/support bypass-prevention integration.",
  "Retention/deletion lifecycle integration.",
  "Third-party provider registry.",
  "Provider status model.",
  "Data-routing map.",
  "Provider retention/deletion posture model.",
  "Provider auditability posture.",
  "Provider token/URL/secret handling policy.",
  "Global access-control threat model.",
  "No raw/private/source-locator/URL/token/secret leakage tests.",
];

const futureTests = [
  "Unknown material class route denied.",
  "Raw/private/source route denied.",
  "Source package route denied.",
  "PDF/image/screenshot/metadata route denied.",
  "Third-party model/API route denied.",
  "Provider status unknown blocks route.",
  "Provider retention/deletion unknown blocks route.",
  "Provider auditability unknown blocks route.",
  "Provider token/URL/secret handling unknown blocks route.",
  "Data-routing map missing blocks route.",
  "RBAC missing blocks route.",
  "Admin/support unresolved blocks route.",
  "Admin/support cannot approve raw route.",
  "Admin/support cannot approve provider route.",
  "Retention/deletion policy missing blocks route.",
  "Audit/access-log missing blocks route.",
  "Route denial creates no-content event only.",
  "Route denial event rejects raw source text.",
  "Route denial event rejects private facts.",
  "Route denial event rejects source locator.",
  "Route denial event rejects local file path.",
  "Route denial event rejects URL/social URL.",
  "Route denial event rejects token/secret.",
  "Route denial event rejects prompt/response/provider payload.",
  "Route denial event rejects PDF/image/screenshot/metadata content.",
  "Route denial event rejects exact raw timestamp.",
  "Route denial event rejects legal/clinical/evidentiary/case-truth conclusion.",
  "Local log route remains no-content only.",
  "Local log route remains not CI evidence.",
  "Local log route remains not packet component.",
  "Export/download route does not authorize delivery.",
  "Packet/delivery route does not bypass human/professional review.",
  "DOCS_ONLY boundary does not become runtime enforcement.",
];

test("P6 boundary freezes docs-only raw-material routing deny-by-default contract", () => {
  assertIncludesAll(docText, statusTokens);
  assertIncludesAll(docText, [
    "P6_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_SPEC_v0",
    "private control-plane specification only",
    "raw-material routing deny-by-default vocabulary only",
    "route surface vocabulary only",
    "route status vocabulary only",
    "material-class-to-route posture only",
    "Existing raw-routing boundaries remain context only.",
    "P1-P5 integrated deny-by-default route decision layer",
  ]);
});

test("P6 boundary includes source context, purpose, and distinct value", () => {
  assertIncludesAll(docText, [
    "## Source Context",
    "SOURCE_INPUTS:",
    "SOURCE_UNIVERSE_DECLARED:",
    "SEARCHED:",
    "NOT_SEARCHED_BY_SCOPE:",
    "## P6 Purpose",
    "## P6 Distinct Value",
    "P6 is not the older raw-material routing feasibility review.",
    "P6 is not the older raw-material routing control specification.",
  ]);
});

test("P6 boundary enumerates material classes, route surfaces, rules, and statuses", () => {
  assertIncludesAll(sectionBetween("Material Classes", "Route Surfaces"), materialClasses);
  assertIncludesAll(sectionBetween("Route Surfaces", "Deny By Default Rules"), routeSurfaces);
  assertIncludesAll(sectionBetween("Deny By Default Rules", "Route Statuses"), denyRules);
  assertIncludesAll(sectionBetween("Route Statuses", "Default Route Posture"), routeStatuses);
});

test("P6 boundary preserves default posture and no-content denial constraints", () => {
  assertIncludesAll(sectionBetween("Default Route Posture", "Allowed Now"), [
    "DENY_BY_DEFAULT",
    "Unknown material class blocks route.",
    "Raw/private/source material blocks route.",
    "No route may be inferred from user approval.",
    "No route may be inferred from admin/support privilege.",
    "No route may be inferred from local logs.",
    "No route may be inferred from generated artifact/export status.",
    "No route may be inferred from package integrity or hash evidence.",
    "No route may be inferred from DOCS_ONLY boundary.",
    "No route may be inferred from provider identity.",
    "No route may be inferred from review convenience.",
    "Every future route denial event must be no-content.",
    "Route denial events must not include raw source text.",
    "Route denial events must not include private facts.",
    "Route denial events must not include source locators.",
    "Route denial events must not include filenames/private paths.",
    "Route denial events must not include URLs or social-media URLs.",
    "Route denial events must not include tokens or secrets.",
    "Route denial events must not include prompts, responses, or provider payloads.",
    "Route denial events must not include PDF/image/screenshot/metadata content.",
    "Route denial events must not include exact raw timestamps.",
    "Route denial events must not include legal/clinical/evidentiary/case-truth conclusions.",
    "Route denial events must not include product/external-use/External Reviewer readiness claims.",
  ]);
});

test("P6 boundary includes allowed/prohibited posture and dependencies", () => {
  assertIncludesAll(sectionBetween("Allowed Now", "Prohibited Now"), [
    "Private GPT control-plane specification.",
    "Private raw-routing deny-by-default vocabulary.",
    "Private route surface vocabulary.",
    "Private route status vocabulary.",
    "Private material-class-to-route posture.",
    "Private dependency map.",
    "Private closure criteria draft.",
    "No-raw / no-source-locator / no-conclusion status language.",
  ]);
  assertIncludesAll(sectionBetween("Prohibited Now", "Dependency Sections"), [
    "Raw-material routing implementation.",
    "Route policy implementation.",
    "Route decision engine.",
    "Quarantine implementation.",
    "Block path implementation.",
    "Validator dispatch.",
    "Registry lookup.",
    "Material-class registry implementation.",
    "Scope model implementation.",
    "RBAC implementation.",
    "Admin/support implementation.",
    "Audit/access-log implementation.",
    "Retention implementation.",
    "Deletion implementation.",
    "Purge implementation.",
    "Third-party provider/API routing.",
    "Provider registry.",
    "Provider status implementation.",
    "Data-routing map.",
    "External-use.",
    "External Reviewer delivery.",
    "Product candidate.",
    "Blocker closure.",
  ]);
  assertIncludesAll(sectionBetween("Dependency Sections", "Material Class Route Posture Matrix"), dependencyTokens);
});

test("P6 boundary includes complete material-class and route-surface matrices", () => {
  const materialMatrix = sectionBetween("Material Class Route Posture Matrix", "Route Surface Matrix");
  assertIncludesAll(materialMatrix, [
    "material class",
    "default route posture",
    "allowed route candidate",
    "prohibited route surfaces",
    "required dependency before future eligibility",
    "current status",
  ]);
  assertIncludesAll(materialMatrix, materialClasses);

  const surfaceMatrix = sectionBetween("Route Surface Matrix", "Required Future Implementation Evidence");
  assertIncludesAll(surfaceMatrix, [
    "route surface",
    "default posture",
    "route risk",
    "required future control",
    "current status",
  ]);
  assertIncludesAll(surfaceMatrix, routeSurfaces);
});

test("P6 boundary includes future evidence, future tests, active blockers, and closure sections", () => {
  assertIncludesAll(sectionBetween("Required Future Implementation Evidence", "Required Future Tests"), futureEvidence);
  assertIncludesAll(sectionBetween("Required Future Tests", "Active Blockers"), futureTests);
  assertIncludesAll(sectionBetween("Active Blockers", "Closure Criteria"), [
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    "RAW_PRIVATE_SOURCE_MATERIAL_DENY_BY_DEFAULT",
    "SOURCE_PACKAGE_MATERIAL_DENY_BY_DEFAULT",
    "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_DENY_BY_DEFAULT",
    "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL_DENY_BY_DEFAULT",
    "QUARANTINE_OR_BLOCK_PATH_REQUIRED",
    "NO_BLOCKER_RESOLVED",
  ]);
  assertIncludesAll(sectionBetween("Closure Criteria", "Closure Not Allowed With"), [
    "Material-class registry created.",
    "Scope model created.",
    "Raw-material route policy created.",
    "Route decision engine created.",
    "Quarantine/block path created.",
    "No-content route denial event tests pass.",
    "Product/external-use/External Reviewer non-authorization preserved.",
  ]);
  assertIncludesAll(sectionBetween("Closure Not Allowed With", "Duplication Risk"), [
    "Private spec only.",
    "DOCS_ONLY boundary only.",
    "Local notes.",
    "Green unrelated tests.",
    "Local logs alone.",
    "User approval alone.",
    "External Reviewer advisory context alone.",
    "Package/hash integrity alone.",
    "Provider identity alone.",
    "Existing raw-material routing vocabulary alone.",
    "Existing raw-material routing feasibility review alone.",
    "Existing security-agent matrix scope review alone.",
    "Existing raw-material routing control specification boundary alone.",
    "P1/P2/P3/P4/P5 boundaries alone.",
  ]);
});

test("P6 boundary records duplication risk, relationships, limits, and non-authorization", () => {
  assertIncludesAll(sectionBetween("Duplication Risk", "Relationships"), [
    "Existing raw-material routing feasibility review is context only.",
    "Existing security-agent raw-material routing feasibility matrix scope review is context only.",
    "Existing raw-material routing control specification boundary is context only.",
    "Existing audit/access-log, RBAC, admin/support, third-party routing, and global access-control boundaries are context only.",
    "P6 does not replace or weaken existing raw-material routing boundaries.",
    "P6 does not reopen existing raw-material routing boundaries.",
    "P6 does not claim existing raw-material routing boundaries implemented anything.",
    "P6 is distinct because it freezes the P1-P5 integrated deny-by-default route decision layer.",
  ]);
  assertIncludesAll(sectionBetween("Relationships", "WHAT_THIS_DOES_NOT_PROVE"), [
    "Relationship to P1 material-class registry and scope model boundary: upstream context only.",
    "Relationship to P2 retention/deletion lifecycle control boundary: upstream context only.",
    "Relationship to P3 RBAC role-permission lifecycle authorization boundary: upstream context only.",
    "Relationship to P4 admin/support bypass-prevention boundary: upstream context only.",
    "Relationship to P5 audit/access-log event taxonomy boundary: upstream context only.",
    "None of these are implemented or closed by this boundary.",
  ]);
  assertIncludesAll(sectionBetween("WHAT_THIS_DOES_NOT_PROVE", "Non-Authorization"), [
    "Not implementation.",
    "Not raw-material routing behavior.",
    "Not route policy.",
    "Not route decision engine.",
    "Not quarantine implementation.",
    "Not block path implementation.",
    "Not validator dispatch.",
    "Not registry lookup.",
    "Not material-class registry.",
    "Not scope model.",
    "Not RBAC implementation.",
    "Not admin/support implementation.",
    "Not retention behavior.",
    "Not deletion behavior.",
    "Not audit/access-log implementation.",
    "Not event taxonomy runtime code.",
    "Not third-party provider routing.",
    "Not runtime/API/schema/package behavior.",
    "Not CI evidence.",
    "Not product readiness.",
    "Not external-use readiness.",
    "Not External Reviewer-ready material.",
    "Not security finding.",
    "Not vulnerability finding.",
    "Not blocker closure.",
    "Not dependency closure.",
  ]);
  assertIncludesAll(sectionBetween("Non-Authorization"), [
    "This boundary creates no Codex implementation",
    "no provider deletion request",
    "no product candidate",
    "no external-use",
    "no External Reviewer delivery",
    "no release approval",
    "no runtime certification",
    "no technical sign-off",
    "no legal/clinical/evidentiary/case-truth conclusion",
    "no security finding",
    "no vulnerability finding",
    "no severity",
    "no remediation",
    "no blocker closure",
    "no dependency closure",
  ]);
});

test("P6 boundary contains no obvious raw/source-locator patterns", () => {
  assertDoesNotMatchAny(docText, [
    /\+46\d+/,
    /file:\/\/\/Users/i,
    /https?:\/\/\S+/i,
    /instagram\.com/i,
    /Sidan\s+\d+\s+av\s+\d+/i,
    /\bJan\s+\d{1,2},\s+2021\s+\d{1,2}:\d{2}:\d{2}\s+(AM|PM)\b/,
    /\bFeb\s+\d{1,2},\s+2021\s+\d{1,2}:\d{2}:\d{2}\s+(AM|PM)\b/,
    /\b[a-z]{5,}-[a-z0-9]{5,}-[A-Za-z0-9]{5,}\b/,
  ]);
});
