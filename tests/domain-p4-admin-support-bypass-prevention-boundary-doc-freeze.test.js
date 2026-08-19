const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_P4_ADMIN_SUPPORT_BYPASS_PREVENTION_BOUNDARY_v1.md",
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

const surfaces = [
  "ADMIN_RAW_PRIVATE_SOURCE_ACCESS",
  "ADMIN_SOURCE_PACKAGE_ACCESS",
  "ADMIN_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS",
  "ADMIN_SUPPORT_LOG_ACCESS",
  "ADMIN_SUPPORT_EXPORT_DOWNLOAD_ACCESS",
  "ADMIN_SUPPORT_PACKET_DELIVERY_PROMOTION",
  "ADMIN_SUPPORT_THIRD_PARTY_ROUTING_APPROVAL",
  "ADMIN_SUPPORT_RETENTION_DELETION_OPERATION",
  "ADMIN_SUPPORT_BYPASS_PREVENTION",
  "SUPPORT_TENANT_CASE_OVERRIDE",
  "SUPPORT_WRONG_CASE_WRONG_TENANT_ACCESS",
  "ADMIN_SUPPORT_AUDIT_EVENT_GATE",
  "ADMIN_SUPPORT_HUMAN_REVIEW_BYPASS_ATTEMPT",
  "ADMIN_SUPPORT_SELF_APPROVAL_ATTEMPT",
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

const denyRules = [
  "ADMIN_SUPPORT_RAW_ACCESS_DENIED",
  "ADMIN_SUPPORT_SOURCE_PACKAGE_ACCESS_DENIED",
  "ADMIN_SUPPORT_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS_DENIED",
  "ADMIN_SUPPORT_CROSS_TENANT_ACCESS_DENIED",
  "ADMIN_SUPPORT_WRONG_CASE_ACCESS_DENIED",
  "ADMIN_SUPPORT_WRONG_OBJECT_ACCESS_DENIED",
  "ADMIN_SUPPORT_WRONG_FUNCTION_ACCESS_DENIED",
  "ADMIN_SUPPORT_WRONG_PROPERTY_ACCESS_DENIED",
  "ADMIN_SUPPORT_SELF_APPROVAL_DENIED",
  "ADMIN_SUPPORT_HUMAN_REVIEW_SUBSTITUTION_DENIED",
  "ADMIN_SUPPORT_THIRD_PARTY_ROUTE_APPROVAL_DENIED",
  "ADMIN_SUPPORT_EXTERNAL_USE_APPROVAL_DENIED",
  "ADMIN_SUPPORT_PRODUCT_CANDIDATE_APPROVAL_DENIED",
  "ADMIN_SUPPORT_EXTERNAL_REVIEWER_DELIVERY_APPROVAL_DENIED",
];

const separationRules = [
  "REQUESTER_CANNOT_APPROVE",
  "APPROVER_CANNOT_EXECUTE",
  "EXECUTOR_CANNOT_VERIFY",
  "ADMIN_CANNOT_SELF_APPROVE",
  "SUPPORT_CANNOT_SELF_APPROVE",
  "SYSTEM_ACCOUNT_CANNOT_SELF_INITIATE",
  "WORKFLOW_AGENT_CANNOT_APPROVE",
  "HUMAN_PROFESSIONAL_REVIEW_CANNOT_BE_SUBSTITUTED_BY_ADMIN",
  "HUMAN_PROFESSIONAL_REVIEW_CANNOT_BE_SUBSTITUTED_BY_SUPPORT",
];

const activeBlockers = [
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "ADMIN_SUPPORT_AUTH_FIELDS_NOT_CREATED",
  "ADMIN_SUPPORT_ROUTES_NOT_CREATED",
  "ADMIN_SUPPORT_DB_FIELDS_NOT_CREATED",
  "ADMIN_SUPPORT_ALLOWED_DENIED_TESTS_NOT_CREATED",
  "ADMIN_SUPPORT_BYPASS_PREVENTION_TESTS_NOT_CREATED",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
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

test("boundary doc exists and freezes P4 docs-only posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "Boundary name: `P4_ADMIN_SUPPORT_BYPASS_PREVENTION_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `P4_ADMIN_SUPPORT_BYPASS_PREVENTION_ONLY`",
    "P4_ADMIN_SUPPORT_BYPASS_PREVENTION_SPEC_v0",
    "P4 does not duplicate existing admin/support or RBAC boundaries",
    "P4 distinct value is cross-surface bypass prevention after P1, P2, and P3",
  ]);
});

test("private specification and proof limit tokens appear", () => {
  assertIncludesAll([
    "P4_ADMIN_SUPPORT_BYPASS_PREVENTION_BOUNDARY",
    "DOCS_ONLY",
    "P4_ADMIN_SUPPORT_BYPASS_PREVENTION_ONLY",
    "PRIVATE_CONTROL_PLANE_SPECIFICATION_ONLY",
    "PRIVATE_ADMIN_SUPPORT_BYPASS_PREVENTION_VOCABULARY_ONLY",
    "PRIVATE_ADMIN_SUPPORT_DENY_RULES_ONLY",
    "PRIVATE_SEPARATION_OF_DUTIES_VOCABULARY_ONLY",
    "FUTURE_ADMIN_SUPPORT_BYPASS_PREVENTION_FLOW_ONLY",
    "EXISTING_ADMIN_SUPPORT_BOUNDARIES_CONTEXT_ONLY",
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
    "Local/focused proof validation is doc-freeze validation only, not CI evidence",
  ]);
});

test("admin support, RBAC, lifecycle, audit, raw routing, and provider implementations remain absent", () => {
  assertIncludesAll([
    "ADMIN_SUPPORT_MODEL_NOT_CREATED",
    "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
    "ADMIN_SUPPORT_AUTH_FIELDS_NOT_CREATED",
    "ADMIN_SUPPORT_ROUTES_NOT_CREATED",
    "ADMIN_SUPPORT_DB_FIELDS_NOT_CREATED",
    "ADMIN_SUPPORT_ALLOWED_DENIED_TESTS_NOT_CREATED",
    "ADMIN_SUPPORT_BYPASS_PREVENTION_TESTS_NOT_CREATED",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
    "ROLE_PERMISSION_MODEL_NOT_CREATED",
    "ROLE_FIELDS_NOT_CREATED",
    "PERMISSION_FIELDS_NOT_CREATED",
    "ROLE_SCHEMA_NOT_CREATED",
    "PERMISSION_SCHEMA_NOT_CREATED",
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
    "PROVIDER_REGISTRY_REQUIRED",
    "PROVIDER_STATUS_REQUIRED",
    "PROVIDER_RETENTION_DELETION_POSTURE_REQUIRED",
    "PROVIDER_AUDITABILITY_REQUIRED",
    "PROVIDER_TOKEN_URL_SECRET_HANDLING_REQUIRED",
    "DATA_ROUTING_MAP_REQUIRED",
  ]);
});

test("source context, purpose, bypass definition, and privilege rule are frozen", () => {
  assertIncludesAll([
    "## Source Context",
    "SOURCE_INPUTS",
    "P4_ADMIN_SUPPORT_BYPASS_PREVENTION_SPEC_v0",
    "P1_MATERIAL_CLASS_REGISTRY_AND_SCOPE_MODEL_BOUNDARY",
    "P2_RETENTION_DELETION_LIFECYCLE_CONTROL_BOUNDARY",
    "P3_RBAC_ROLE_PERMISSION_LIFECYCLE_AUTHORIZATION_BOUNDARY",
    "SOURCE_UNIVERSE_DECLARED",
    "P4 private GPT material only",
    "SEARCHED",
    "P4 admin/support bypass-prevention private spec summary",
    "NOT_SEARCHED_BY_SCOPE",
    "raw source text",
    "private source material",
    "source packages",
    "PDF/image/screenshot/metadata material",
    "metadata acquisition",
    "## P4 Purpose",
    "define what admin/support must not be able to bypass",
    "define admin/support privilege as not content authorization",
    "## Bypass Definition",
    "ADMIN_SUPPORT_BYPASS_DEFINITION",
    "Admin/support privilege is not content authorization",
  ]);
});

test("bypass includes, surfaces, material classes, deny rules, and separation rules are frozen", () => {
  assertIncludesAll([
    "## Bypass Includes",
    "raw/private/source access through privileged role",
    "source package access through privileged role",
    "PDF/image/screenshot/metadata access through privileged role",
    "tenant/case override",
    "self-approval",
    "approval substitution for human/professional review",
    "third-party route approval without provider status",
    "packet/delivery promotion without human/professional review",
    "## P4 Surfaces",
    "## Material Classes",
    "## Deny By Default Rules",
    "## Separation Of Duties Rules",
  ]);
  assertIncludesAll(surfaces);
  assertIncludesAll(materialClasses);
  assertIncludesAll(denyRules);
  assertIncludesAll(separationRules);
});

test("retention deletion, third party, and audit event family sections are frozen", () => {
  assertIncludesAll([
    "## Retention Deletion Admin Support Rules",
    "approve retention hold without policy",
    "release retention hold without policy",
    "approve deletion without policy",
    "execute deletion without separate authorization",
    "verify deletion they executed",
    "expose raw/private/source content in lifecycle event",
    "## Third Party Admin Support Rules",
    "approve provider route",
    "create provider route",
    "treat provider status unknown as acceptable",
    "route raw/private/source material to provider",
    "log provider URL/token/secret",
    "approve third-party route without provider auditability posture",
    "## Required Future Audit Event Families",
    "admin access attempt",
    "support access attempt",
    "admin raw/private denial",
    "support raw/private denial",
    "wrong-tenant denial",
    "wrong-case denial",
    "privileged self-approval denial",
    "human-review bypass denial",
    "third-party routing approval denial",
    "retention/deletion privileged attempt",
    "lifecycle approval denial",
    "deletion execution denial",
    "deletion verification denial",
  ]);
});

test("admin support bypass prevention matrix has required columns, rows, and postures", () => {
  const matrix = sectionBetween("## Admin Support Bypass Prevention Matrix", "## Dependencies");
  assertIncludesAll(["surface", "default posture", "bypass risk", "required future control", "current status"], matrix);
  assertIncludesAll(surfaces, matrix);
  assertIncludesAll([
    "raw/private/source access denied",
    "source package access denied",
    "PDF/image/screenshot/metadata access denied",
    "log access no-content only",
    "export/download not delivery or external-use",
    "packet/delivery promotion cannot bypass human/professional review",
    "third-party routing approval denied",
    "retention/deletion operation requires lifecycle policy and separation of duties",
    "tenant/case override denied",
    "wrong-case/wrong-tenant access denied",
    "audit event must be no-content",
    "human-review bypass denied",
    "self-approval denied",
    "not implemented; unresolved",
  ], matrix);
});

test("dependency sections are frozen", () => {
  assertIncludesAll([
    "RBAC_DEPENDENCIES",
    "RBAC_MODEL_REQUIRED",
    "ROLE_PERMISSION_MODEL_REQUIRED",
    "ROLE_FIELDS_REQUIRED",
    "PERMISSION_FIELDS_REQUIRED",
    "ROLE_SCHEMA_REQUIRED",
    "PERMISSION_SCHEMA_REQUIRED",
    "ACCESS_CONTROL_IMPLEMENTATION_REQUIRED",
    "RETENTION_DELETION_DEPENDENCIES",
    "RETENTION_POLICY_REQUIRED",
    "DELETION_POLICY_REQUIRED",
    "PURGE_POLICY_REQUIRED",
    "MATERIAL_CLASS_LIFECYCLE_POLICY_REQUIRED",
    "DELETION_VERIFICATION_REQUIRED",
    "PURGE_VERIFICATION_REQUIRED",
    "RELEASE_IMPACTING_LIFECYCLE_REVIEW_REQUIRED",
    "AUDIT_DEPENDENCIES",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_REQUIRED",
    "EVENT_TAXONOMY_RUNTIME_CODE_REQUIRED",
    "NO_CONTENT_PRIVILEGED_EVENT_REQUIRED",
    "RAW_ROUTING_DEPENDENCIES",
    "RAW_PRIVATE_SOURCE_MATERIAL_DENY_BY_DEFAULT",
    "SOURCE_PACKAGE_MATERIAL_DENY_BY_DEFAULT",
    "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_DENY_BY_DEFAULT",
    "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL_DENY_BY_DEFAULT",
    "QUARANTINE_OR_BLOCK_PATH_REQUIRED",
    "THIRD_PARTY_DEPENDENCIES",
    "PROVIDER_REGISTRY_REQUIRED",
    "PROVIDER_STATUS_REQUIRED",
    "PROVIDER_RETENTION_DELETION_POSTURE_REQUIRED",
    "PROVIDER_AUDITABILITY_REQUIRED",
    "PROVIDER_TOKEN_URL_SECRET_HANDLING_REQUIRED",
    "DATA_ROUTING_MAP_REQUIRED",
  ]);
});

test("future evidence, tests, blockers, and closure rules are frozen", () => {
  assertIncludesAll([
    "## Required Future Implementation Evidence",
    "admin/support actor model",
    "admin/support role model",
    "admin/support permission model",
    "admin/support auth fields",
    "admin/support routes",
    "admin/support DB fields",
    "admin/support allow/deny policy",
    "admin/support bypass-prevention policy",
    "RBAC integration",
    "material-class scope integration",
    "tenant/case/object/function/property scope integration",
    "no-content privileged audit event taxonomy",
    "human/professional review non-substitution gate",
    "## Required Future Tests",
    "admin raw/private source access denied",
    "support raw/private source access denied",
    "admin source-package access denied",
    "support source-package access denied",
    "admin PDF/image/metadata access denied",
    "support PDF/image/metadata access denied",
    "admin wrong-tenant access denied",
    "support wrong-tenant access denied",
    "admin self-approval denied",
    "support self-approval denied",
    "admin cannot replace human/professional review",
    "support cannot replace human/professional review",
    "admin/support denial event contains no URL/token/secret",
    "provider token/URL/secret not logged",
    "third-party routed material denied by default",
    "## Active Blockers",
    "## Closure Criteria",
    "## Closure Not Allowed With",
    "prior admin/support runtime-readiness status/gap boundary alone",
    "prior RBAC scope/control/gate-candidate boundaries alone",
    "P3 lifecycle authorization boundary alone",
  ]);
  assertIncludesAll(activeBlockers);
});

test("duplication risk, relationships, what-this-does-not-prove, and non-authorization are frozen", () => {
  assertIncludesAll([
    "## Duplication Risk",
    "existing admin/support runtime-readiness status/gap boundary is context only",
    "existing RBAC scope review boundary is context only",
    "existing RBAC control specification boundary is context only",
    "existing RBAC gate-candidate status boundary is context only",
    "existing audit/access-log runtime-readiness blocker analysis is context only",
    "existing third-party routing runtime-readiness blocker analysis is context only",
    "P4 does not replace or weaken existing admin/support or RBAC boundaries",
    "P4 does not reopen existing admin/support or RBAC boundaries",
    "P4 does not claim existing admin/support or RBAC boundaries implemented",
    "P4 is distinct because it freezes cross-surface bypass prevention",
    "## Relationships",
    "relationship to P1 material-class registry and scope model boundary: upstream",
    "relationship to P2 retention/deletion lifecycle control boundary: upstream",
    "relationship to P3 RBAC role-permission lifecycle authorization boundary",
    "relationship to existing admin/support runtime-readiness status/gap boundary",
    "relationship to existing RBAC role-permission scope review: context only",
    "relationship to audit/access-log event taxonomy/runtime-readiness blocker",
    "relationship to third-party provider routing status/runtime-readiness blocker",
    "none of these are implemented or closed by this boundary",
    "## What This Does Not Prove",
    "not implementation",
    "not admin/support behavior",
    "not admin/support model",
    "not admin/support auth fields",
    "not admin/support routes",
    "not admin/support DB fields",
    "not admin/support allowed/denied tests",
    "not admin/support bypass-prevention tests",
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
    "no raw/private/source inspection",
    "source package routing",
    "PDF/image/screenshot/metadata acquisition",
    "legal/clinical/evidentiary/case-truth conclusion",
    "security finding",
    "vulnerability finding",
    "severity",
    "remediation",
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
