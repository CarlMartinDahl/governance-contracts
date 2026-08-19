const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_P3_RBAC_ROLE_PERMISSION_LIFECYCLE_AUTHORIZATION_BOUNDARY_v1.md",
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

function sectionBetween(startHeading, endHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing start heading: ${startHeading}`);
  const end = docsText.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(end, -1, `missing end heading: ${endHeading}`);
  return docsText.slice(start, end);
}

const actorTypes = [
  "PRIMARY_USER_CASE_OWNER",
  "REVIEWER",
  "HUMAN_PROFESSIONAL_REVIEWER",
  "WORKFLOW_AGENT_TOOL",
  "SYSTEM_SERVICE_ACCOUNT",
  "ADMIN",
  "SUPPORT",
  "THIRD_PARTY_PROVIDER_ROUTE",
  "EXPORT_DOWNLOAD_ACTOR",
  "PACKET_DELIVERY_PROMOTION_ACTOR",
  "RETENTION_DELETION_OPERATOR",
  "AUDIT_LOG_VIEWER",
];

const roleCategories = [
  "FUTURE_USER",
  "FUTURE_REVIEWER",
  "RELEASE_GATE_REVIEWER",
  "SERVICE_WORKFLOW",
  "SERVICE_ACCOUNT",
  "ADMIN_PRIVILEGED_CANDIDATE",
  "SUPPORT_CANDIDATE",
  "PROVIDER_ROUTE_CANDIDATE",
  "EXPORT_ACTOR",
  "PROMOTION_ACTOR",
  "LIFECYCLE_OPERATOR",
  "AUDIT_VIEWER",
];

const permissions = [
  "VIEW_LIFECYCLE_STATUS",
  "REQUEST_RETENTION_REVIEW",
  "REQUEST_DELETION",
  "REQUEST_PURGE",
  "APPROVE_RETENTION_HOLD",
  "DENY_RETENTION_HOLD",
  "RELEASE_RETENTION_HOLD",
  "APPROVE_DELETION",
  "DENY_DELETION",
  "EXECUTE_DELETION",
  "VERIFY_DELETION",
  "EXECUTE_PURGE",
  "VERIFY_PURGE",
  "VIEW_NO_CONTENT_LIFECYCLE_AUDIT",
  "REQUEST_PROVIDER_DELETION_STATUS",
  "VERIFY_PROVIDER_DELETION_STATUS",
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

const activeBlockers = [
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST",
  "NO_BLOCKER_RESOLVED",
];

test("boundary doc exists and freezes P3 docs-only posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "Boundary name: `P3_RBAC_ROLE_PERMISSION_LIFECYCLE_AUTHORIZATION_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `P3_RBAC_ROLE_PERMISSION_LIFECYCLE_AUTHORIZATION_ONLY`",
    "P3_RBAC_ROLE_PERMISSION_LIFECYCLE_AUTHORIZATION_SPEC_v0",
    "P3 does not duplicate existing RBAC boundaries",
  ]);
});

test("private specification and no-overclaim status tokens appear", () => {
  assertIncludesAll([
    "P3_RBAC_ROLE_PERMISSION_LIFECYCLE_AUTHORIZATION_BOUNDARY",
    "DOCS_ONLY",
    "P3_RBAC_ROLE_PERMISSION_LIFECYCLE_AUTHORIZATION_ONLY",
    "PRIVATE_CONTROL_PLANE_SPECIFICATION_ONLY",
    "PRIVATE_LIFECYCLE_AUTHORIZATION_VOCABULARY_ONLY",
    "PRIVATE_RBAC_ROLE_PERMISSION_VOCABULARY_ONLY",
    "FUTURE_LIFECYCLE_AUTHORIZATION_FLOW_ONLY",
    "EXISTING_RBAC_BOUNDARIES_CONTEXT_ONLY",
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
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "ROLE_PERMISSION_MODEL_NOT_CREATED",
    "ROLE_FIELDS_NOT_CREATED",
    "PERMISSION_FIELDS_NOT_CREATED",
    "ROLE_SCHEMA_NOT_CREATED",
    "PERMISSION_SCHEMA_NOT_CREATED",
    "ADMIN_SUPPORT_MODEL_NOT_CREATED",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "RETENTION_DELETION_NOT_IMPLEMENTED",
    "RETENTION_POLICY_NOT_CREATED",
    "DELETION_POLICY_NOT_CREATED",
    "PURGE_POLICY_NOT_CREATED",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
    "LOG_SCHEMA_NOT_CREATED",
    "LOG_STORAGE_NOT_CREATED",
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  ]);
});

test("actors, roles, permissions, and material classes are frozen", () => {
  assertIncludesAll(actorTypes);
  assertIncludesAll(roleCategories);
  assertIncludesAll(permissions);
  assertIncludesAll(materialClasses);
});

test("lifecycle authorization matrix exists with all actor rows", () => {
  const matrix = sectionBetween("## Lifecycle Authorization Matrix", "## Core Deny Rules");
  assertIncludesAll(["actor", "may request", "may approve", "may execute", "may verify", "current status"], matrix);
  assertIncludesAll(actorTypes, matrix);
});

test("core deny rules and future lifecycle authorization flow are frozen", () => {
  assertIncludesAll([
    "## Core Deny Rules",
    "no actor may approve their own privileged lifecycle action",
    "no admin/support actor may bypass human/professional review",
    "no support actor may execute deletion",
    "no workflow agent/tool may approve deletion",
    "no system/service account may initiate its own lifecycle action",
    "no actor may access raw/private/source material through lifecycle status",
    "no lifecycle audit event may contain raw/private/source-locator content",
    "wrong-tenant action must deny",
    "wrong-case action must deny",
    "wrong-object action must deny",
    "wrong-function action must deny",
    "wrong-property action must deny",
    "third-party provider route remains denied by default",
    "provider retention/deletion status unknown blocks provider lifecycle claims",
    "## Future Lifecycle Authorization Flow",
    "classify material class",
    "check tenant/case/object/function/property scope",
    "check actor role",
    "check requested permission",
    "check retention/deletion policy",
    "create no-content audit event candidate",
    "current flow status: `NOT_IMPLEMENTED`",
  ]);
});

test("admin support bypass prevention and scope gates are frozen", () => {
  assertIncludesAll([
    "## Admin/Support Bypass Prevention",
    "admin/support cannot view raw/private/source material by lifecycle route",
    "admin/support cannot approve their own deletion request",
    "admin/support cannot execute deletion without separate lifecycle operator role",
    "admin/support cannot bypass human/professional review",
    "admin/support cannot bypass tenant/case scope",
    "admin/support cannot bypass no-raw/no-source-locator logging",
    "admin/support cannot approve third-party provider route",
    "admin/support cannot treat support escalation as authorization",
    "admin/support cannot treat infrastructure access as content access",
    "## Scope Gates",
    "TENANT_SCOPE_GATE",
    "CASE_SCOPE_GATE",
    "OBJECT_SCOPE_GATE",
    "FUNCTION_SCOPE_GATE",
    "PROPERTY_SCOPE_GATE",
    "MATERIAL_CLASS_SCOPE_GATE",
    "wrong tenant denied",
    "wrong case denied",
    "wrong object denied",
    "wrong function denied",
    "wrong property denied",
    "wrong material class denied",
  ]);
});

test("dependency sections and permission-to-material matrix are frozen", () => {
  assertIncludesAll([
    "AUDIT_DEPENDENCIES",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_REQUIRED",
    "EVENT_TAXONOMY_RUNTIME_CODE_REQUIRED",
    "LOG_SCHEMA_REQUIRED",
    "LOG_STORAGE_REQUIRED",
    "NO_CONTENT_LIFECYCLE_EVENT_REQUIRED",
    "RETENTION_DELETION_DEPENDENCIES",
    "RETENTION_POLICY_REQUIRED",
    "DELETION_POLICY_REQUIRED",
    "PURGE_POLICY_REQUIRED",
    "MATERIAL_CLASS_LIFECYCLE_POLICY_REQUIRED",
    "DELETION_VERIFICATION_REQUIRED",
    "PURGE_VERIFICATION_REQUIRED",
    "RELEASE_IMPACTING_LIFECYCLE_REVIEW_REQUIRED",
    "THIRD_PARTY_DEPENDENCIES",
    "PROVIDER_REGISTRY_REQUIRED",
    "PROVIDER_STATUS_REQUIRED",
    "PROVIDER_RETENTION_DELETION_POSTURE_REQUIRED",
    "PROVIDER_AUDITABILITY_REQUIRED",
    "PROVIDER_TOKEN_URL_SECRET_HANDLING_REQUIRED",
    "DATA_ROUTING_MAP_REQUIRED",
    "## Permission-To-Material Matrix",
    "sanitized material",
    "generated/export material",
    "local logs",
    "raw/private/source",
    "source package",
    "PDF/image/metadata",
    "third-party routed",
    "denied by default",
    "not authorized",
    "not CI evidence",
    "not delivery or external-use",
    "verification must expose no raw/private/source content",
  ]);
});

test("future evidence, future tests, blockers, and closure rules are frozen", () => {
  assertIncludesAll([
    "## Required Future Implementation Evidence",
    "role model",
    "permission model",
    "actor model",
    "lifecycle permission model",
    "material-class authorization map",
    "tenant/case/object/function/property scope model",
    "admin/support model",
    "no-bypass rule implementation",
    "lifecycle policy engine",
    "retention policy integration",
    "deletion policy integration",
    "purge policy integration",
    "audit event taxonomy runtime code",
    "no-content audit log schema",
    "log storage model",
    "service-account execution model",
    "lifecycle verification model",
    "third-party provider lifecycle-status model",
    "## Required Future Tests",
    "primary user can request own-scope deletion review",
    "primary user cannot approve deletion",
    "reviewer cannot execute deletion",
    "workflow agent cannot approve deletion",
    "system service account cannot self-initiate deletion",
    "retention/deletion operator cannot self-approve",
    "admin cannot bypass human/professional review",
    "support cannot bypass lifecycle policy",
    "lifecycle event contains no URL/token/secret",
    "provider retention/deletion unknown blocks provider route",
    "## Active Blockers",
    "## Closure Criteria",
    "## Closure Not Allowed With",
    "prior RBAC scope/control/gate-candidate boundaries alone",
  ]);
  assertIncludesAll(activeBlockers);
});

test("duplication risk, relationships, what-this-does-not-prove, and non-authorization are frozen", () => {
  assertIncludesAll([
    "## Duplication Risk",
    "existing RBAC scope review boundary is context only",
    "existing RBAC control specification boundary is context only",
    "existing RBAC gate-candidate status boundary is context only",
    "existing admin/support runtime-readiness status/gap boundary is context only",
    "P3 does not replace or weaken existing RBAC boundaries",
    "P3 does not reopen existing RBAC boundaries",
    "P3 does not claim existing RBAC boundaries implemented anything",
    "## Relationships",
    "relationship to P1 material-class registry and scope model boundary: upstream",
    "relationship to P2 retention/deletion lifecycle control boundary: upstream",
    "relationship to existing RBAC role-permission scope review: context only",
    "relationship to existing RBAC role-permission control specification: context",
    "relationship to existing RBAC role-permission gate-candidate status: context",
    "relationship to admin/support bypass prevention: context only",
    "relationship to audit/access-log event taxonomy: context only",
    "relationship to raw-material routing deny-by-default: context only",
    "relationship to third-party provider routing status: context only",
    "relationship to global access-control threat model: context only",
    "none of these are implemented or closed by this boundary",
    "## What This Does Not Prove",
    "not implementation",
    "not RBAC behavior",
    "not access-control behavior",
    "not lifecycle authorization behavior",
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
    "not blocker closure",
    "not dependency closure",
    "## Non-Authorization",
    "This boundary creates no Codex implementation",
    "no blocker closure, and no dependency closure",
  ]);
});

test("external use, delivery, proof limits, and raw inspection blocks remain explicit", () => {
  assertIncludesAll([
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "NO_DELIVERY_TO_EXTERNAL_REVIEWER",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "NO_BLOCKER_RESOLVED",
    "NO_BLOCKER_CLOSURE",
    "NO_DEPENDENCY_CLOSURE",
    "Local/focused proof validation is doc-freeze validation only, not CI evidence",
    "raw source text",
    "private source material",
    "source packages",
    "PDF/image/screenshot/metadata material",
    "new source windows",
    "metadata acquisition",
  ]);
});

test("document contains no obvious raw source locator patterns", () => {
  assertDoesNotMatchAny([
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
