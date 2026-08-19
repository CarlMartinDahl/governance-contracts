const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_v1.md",
);
const doc = fs.readFileSync(docPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(values, text = doc) {
  for (const value of values) {
    assert.match(text, new RegExp(escapeRegExp(value)), `missing ${value}`);
  }
}

function assertDoesNotIncludeExactToken(values, text = doc) {
  for (const value of values) {
    const pattern = new RegExp(`(?<![A-Z0-9_])${escapeRegExp(value)}(?![A-Z0-9_])`);
    assert.doesNotMatch(text, pattern, `forbidden exact token ${value}`);
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = doc.indexOf(startHeading);
  assert.notEqual(start, -1, `missing section ${startHeading}`);
  const end = endHeading ? doc.indexOf(endHeading, start + startHeading.length) : doc.length;
  assert.notEqual(end, -1, `missing end section ${endHeading}`);
  return doc.slice(start, end);
}

const matrix = sectionBetween("## Evidence And Closure-Plan Matrix", "## Matrix Row Posture");
const implementationEvidence = sectionBetween(
  "## Required Implementation Evidence Definition",
  "## Required Test Evidence Definition",
);
const testEvidence = sectionBetween("## Required Test Evidence Definition", "## Closure Criteria");
const closureCriteria = sectionBetween("## Closure Criteria", "## Dependency Links");
const recommendations = sectionBetween("## Recommended Smallest Safe Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_EVIDENCE_AND_CLOSURE_PLAN_ONLY",
    "DEPENDENCY_005_EVIDENCE_PLAN_PARTIAL_GAP_CONTEXT",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_RUNTIME_READY",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_PROVIDER_INTEGRATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_PROVIDER_REGISTRY",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_PROVIDER_STATUS_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_DATA_ROUTING_MAP_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_PROVIDER_RETENTION_DELETION_POSTURE_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_PROVIDER_AUDITABILITY_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_LOG_SCHEMA",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_LOG_STORAGE",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_RETENTION_DELETION_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_SOURCE_PACKAGE_INSPECTION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_METADATA_ACQUISITION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_TECHNICAL_SIGN_OFF",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_PRODUCT_READINESS",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_005_EVIDENCE_PLAN_NOT_DEPENDENCY_CLOSURE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "freezes the evidence and closure-plan layer for dependency 005 third-party routing",
    "The evidence and closure plan is non-authorizing.",
    "The evidence and closure plan preserves partial/gap posture.",
    "The evidence and closure plan defines future evidence requirements only.",
    "The evidence and closure plan creates no implementation-readiness authorization.",
    "The evidence and closure plan creates no implementation.",
    "The evidence and closure plan creates no runtime behavior.",
    "The evidence and closure plan creates no evidence, tests, CI evidence, product candidate, external-use, blocker resolution, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "DEPENDENCY_001_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_002_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_003_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_004_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_005_STATUS_GAP_BOUNDARY_CONTROLS_CURRENT_GAPS",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_CONTROLS_THIRD_PARTY_BLOCKER_CONTEXT",
    "THIRD_PARTY_ROUTING_RUNTIME_READINESS_STATUS_GAP_SUMMARY_AFTER_BLOCKER_ANALYSIS_BOUNDARY_CONTROLS_THIRD_PARTY_GAP_CONTEXT",
    "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_CONTROLS_AUDIT_LOG_CONTEXT",
    "RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RETENTION_CONTEXT",
    "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RAW_ROUTING_CONTEXT",
    "RBAC_ADMIN_SUPPORT_BOUNDARIES_CONTROL_ACCESS_CONTEXT",
    "RUNTIME_GATE_INVENTORY_BOUNDARY_CONTROLS_DEFERRED_GATE_CONTEXT",
    "DEPENDENCY_005_EVIDENCE_AND_CLOSURE_PLAN_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "d55073c docs(domain): freeze dependency-005 third party routing status gap boundary",
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "PROVE_ONLY_DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_STATUS_GAP_REVIEWED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("dependency 005 current status exists", () => {
  assertIncludesAll([
    "Dependency 005 follows dependency 004 in roadmap order.",
    "Dependency 005 remains blocked.",
    "Dependency 005 remains not implemented.",
    "Dependency 005 remains not closed.",
    "Dependency 005 has no tracked implementation closure evidence.",
    "Dependency 005 has no tracked test closure evidence.",
    "Upstream dependencies 001, 002, 003, and 004 remain not closed and must not be treated as closure.",
    "RBAC/admin-support dependencies are identified but unresolved.",
    "Audit/access-log dependencies are identified but unresolved.",
    "Retention/deletion dependencies are identified but unresolved.",
    "Raw-material routing dependencies are identified but unresolved/not implemented.",
    "Validator dispatch, registry/lookup, runtime gate inventory, and CI evidence remain absent/deferred.",
    "Third-party routing authorization remains absent.",
    "Provider integration remains absent.",
    "Provider registry remains absent.",
    "Provider status implementation remains absent.",
    "Data-routing map remains absent.",
    "Provider retention/deletion posture remains absent.",
    "Provider auditability remains absent/not evidenced.",
    "Provider token/URL/secret handling remains unresolved.",
    "Token/URL/secret handling implementation remains absent.",
    "No-token/no-URL/no-secret route/event content posture remains future-only/specification-only.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "Closure criteria are not met.",
    "Closure criteria do not mean closure.",
  ]);
});

test("evidence and closure-plan matrix exists", () => {
  assertIncludesAll([
    "row ID",
    "evidence surface",
    "current status/gap",
    "future implementation evidence required",
    "future test evidence required",
    "closure criteria",
    "dependency links that must remain visible",
    "failure/ambiguity outcome",
    "what remains non-authorized until closure",
  ], matrix);
});

test("all D005-ECP-001 through D005-ECP-028 rows exist", () => {
  for (let index = 1; index <= 28; index += 1) {
    assertIncludesAll([`D005-ECP-${String(index).padStart(3, "0")}`], matrix);
  }
  assertIncludesAll([
    "third-party routing authorization evidence plan",
    "provider registry evidence plan",
    "provider status evidence plan",
    "data-routing map evidence plan",
    "provider retention/deletion posture evidence plan",
    "provider auditability/logging evidence plan",
    "provider token/URL/secret handling evidence plan",
    "raw-material routing dependency evidence plan",
    "audit/access-log dependency evidence plan",
    "event taxonomy runtime evidence plan",
    "log schema evidence plan",
    "log storage evidence plan",
    "RBAC dependency evidence plan",
    "admin support dependency evidence plan",
    "role/permission fields evidence plan",
    "access-control threat model evidence plan",
    "runtime gate inventory evidence plan",
    "implementation evidence plan",
    "test closure evidence plan",
    "CI evidence boundary plan",
    "blocker resolution plan",
    "product candidate non-authorization plan",
    "external use non-authorization plan",
    "raw/private/source inspection boundary evidence plan",
    "source package inspection boundary evidence plan",
    "PDF/image/screenshot/metadata inspection boundary evidence plan",
    "metadata acquisition boundary evidence plan",
    "runtime enforcement posture plan",
  ], matrix);
});

test("matrix row posture exists", () => {
  assertIncludesAll([
    "Every row preserves future evidence only.",
    "Every row preserves partial/gap posture where applicable.",
    "Every row preserves not implemented status.",
    "Every row preserves not closed status.",
    "Every row preserves no current runtime authorization.",
    "Every row preserves no current product/external-use authorization.",
    "Every row preserves no current implementation-readiness authorization.",
    "Every row preserves no third-party routing authorization.",
    "Every row preserves no provider integration.",
    "Every row preserves no provider registry/status/data-routing map implementation.",
    "Every row preserves no provider token/URL/secret handling implementation.",
    "Every row preserves that separate tracked implementation evidence is required.",
    "Every row preserves that separate tracked test evidence is required.",
    "Every row preserves that separate future explicit authorization is required.",
    "Every row preserves that failure or ambiguity outcome is fail-closed continued pause.",
  ]);
});

test("required implementation evidence definition exists", () => {
  assertIncludesAll([
    "Future implementation evidence would need, at minimum:",
    "tracked implementation diff",
    "scoped implementation rationale",
    "explicit affected and non-affected surfaces",
    "provider identity/status contract",
    "provider registry/status implementation evidence",
    "provider data-routing map implementation evidence",
    "provider retention/deletion posture evidence",
    "provider auditability/logging posture evidence",
    "provider token/URL/secret handling boundary",
    "no-token/no-URL/no-secret route/event content policy",
    "third-party model/API route deny-by-default policy",
    "third-party/API routed material policy",
    "raw/private/source no-route policy",
    "source package no-route policy",
    "PDF/image/screenshot/metadata no-route policy",
    "generated/export artifact provider-route policy",
    "admin/support third-party route approval policy",
    "workflow agent/tool provider route policy",
    "runtime/schema/workflow gate provider route policy only if separately authorized",
    "human/professional review provider dependency preservation",
    "audit/access-log dependency evidence",
    "RBAC/admin-support dependency evidence",
    "retention/deletion dependency evidence",
    "raw-material routing dependency evidence",
    "validator dispatch / registry lookup / runtime gate evidence only if separately authorized",
    "rollback/fail-closed posture",
    "human/professional review preservation",
    "None of this evidence exists yet for dependency 005 closure.",
  ], implementationEvidence);
});

test("required test evidence definition exists", () => {
  assertIncludesAll([
    "Future test evidence would need, at minimum:",
    "third-party route allow/deny tests",
    "provider registry/status tests",
    "provider data-routing map tests",
    "provider retention/deletion posture tests",
    "provider auditability/logging tests",
    "token/URL/secret no-leak tests",
    "no-token/no-URL/no-secret route/event content tests",
    "raw/private/source no-route tests",
    "source package no-route tests",
    "PDF/image/screenshot/metadata no-route/no-inspection tests",
    "generated/export artifact route tests",
    "admin/support third-party approval bypass-prevention tests",
    "workflow agent/tool provider route tests",
    "runtime/schema/workflow gate provider route tests only if separately authorized",
    "human/professional review provider dependency tests",
    "audit/access-log no-payload event tests",
    "RBAC/admin-support authorization tests",
    "retention/deletion lifecycle dependency tests",
    "raw-material routing dependency tests",
    "wrong-tenant tests",
    "wrong-case tests",
    "wrong-object/function/property tests where applicable",
    "CI evidence only if CI is claimed",
    "no-release/no-product/no-external-use overclaim tests",
    "None of this test evidence exists yet for dependency 005 closure.",
  ], testEvidence);
});

test("closure criteria definition exists", () => {
  assertIncludesAll([
    "Closure would require:",
    "all required implementation evidence tracked",
    "all required test evidence tracked",
    "separate future blocker-status update",
    "negative boundary preserved",
    "dependency order preserved",
    "upstream dependencies 001/002/003/004 reviewed and not overread as closure unless separately closed",
    "RBAC/admin-support resolved or explicitly reviewed as not required",
    "audit/access-log resolved or explicitly reviewed as not required",
    "retention/deletion resolved or explicitly reviewed as not required",
    "raw-material routing resolved or explicitly reviewed as not required",
    "validator/registry/runtime-gate dependency resolved or explicitly reviewed as not required",
    "provider registry/status/data-routing posture resolved",
    "token/URL/secret handling resolved",
    "human/professional release gate preserved",
    "explicit future user-authorized closure posture",
    "focused proof test for closure boundary",
    "no overclaiming tokens",
    "Closure criteria do not mean closure.",
    "Closure criteria are not met.",
    "No closure is created by this boundary.",
  ], closureCriteria);
});

test("dependency links exist", () => {
  assertIncludesAll([
    "Upstream dependency 001 remains not closed.",
    "Upstream dependency 002 remains not closed.",
    "Upstream dependency 003 remains not closed.",
    "Upstream dependency 004 remains not closed.",
    "RBAC/admin-support implementation remains absent.",
    "Audit/access-log implementation remains absent.",
    "Audit logging/access logging remain not implemented.",
    "Event taxonomy runtime code remains absent.",
    "Log schema remains absent.",
    "Log storage remains absent.",
    "Retention/deletion implementation remains absent.",
    "Raw-material routing implementation remains absent.",
    "Third-party routing remains unauthorized.",
    "Provider integration remains absent.",
    "Provider registry/status implementation remains absent.",
    "Data-routing map remains absent.",
    "Provider token/URL/secret handling remains unresolved.",
    "Validator dispatch remains not created.",
    "Registry/lookup remains not created.",
    "Runtime gate inventory remains deferred.",
    "CI evidence remains not created.",
    "Local logs remain not CI evidence.",
    "Human/professional review remains release gate.",
  ]);
});

test("evidence limits exist", () => {
  assertIncludesAll([
    "Tests are tested-scenario evidence, not runtime certainty.",
    "Green tests are not release approval.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "Prompt/workflow controls are not runtime enforcement.",
    "Route/case/capability evidence is not full RBAC/access-control.",
    "Route/case/capability evidence is not admin/support access-control.",
    "Route/case/capability evidence is not global authorization model.",
    "Schema validator evidence is not proof of all schemas or all runtime behavior.",
    "Static inspection results are review context only.",
    "Digest/dossier context is not product readiness.",
    "Consolidated dossier context is not runtime certification.",
    "Human/professional review remains release gate.",
    "Continued pause is valid.",
  ]);
});

test("negative authorization checks exist", () => {
  assertIncludesAll([
    "This boundary creates no implementation-readiness authorization.",
    "This boundary creates no implementation.",
    "This boundary creates no runtime behavior.",
    "This boundary creates no runtime/API/schema/package behavior change.",
    "This boundary creates no third-party routing implementation.",
    "This boundary creates no third-party routing authorization.",
    "This boundary creates no provider integration.",
    "This boundary creates no provider registry.",
    "This boundary creates no provider status implementation.",
    "This boundary creates no data-routing map implementation.",
    "This boundary creates no provider retention/deletion posture implementation.",
    "This boundary creates no provider auditability implementation.",
    "This boundary creates no provider token/URL/secret handling implementation.",
    "This boundary creates no token/URL/secret handling implementation.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no audit logging.",
    "This boundary creates no access logging.",
    "This boundary creates no event taxonomy runtime code.",
    "This boundary creates no log schema.",
    "This boundary creates no log storage.",
    "This boundary creates no retention/deletion implementation.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no raw/private/source inspection.",
    "This boundary creates no source package inspection.",
    "This boundary creates no PDF/image/screenshot/metadata inspection.",
    "This boundary creates no metadata acquisition.",
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no runtime gate implementation.",
    "This boundary creates no runtime gate inventory as implementation.",
    "This boundary creates no CI evidence.",
    "This boundary creates no release approval.",
    "This boundary creates no runtime certification.",
    "This boundary creates no technical sign-off.",
    "This boundary creates no External Reviewer approval.",
    "This boundary creates no product readiness.",
    "This boundary creates no product candidate.",
    "This boundary creates no external-use authorization.",
    "This boundary creates no blocker resolution.",
    "This boundary creates no dependency closure.",
    "This boundary creates no finding.",
    "This boundary creates no severity.",
    "This boundary creates no remediation.",
    "This boundary creates no local log file inspection.",
    "This boundary creates no real private run.",
    "This boundary creates no delivery to External Reviewer.",
    "This boundary creates no packet approval.",
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "Evidence plan does not mean evidence exists.",
    "Closure plan does not mean closure.",
    "Evidence/closure boundary does not mean implementation-readiness authorization.",
    "Evidence/closure boundary does not mean implementation.",
    "Status/gap suitability does not mean dependency 005 is implementation-ready.",
    "Partial/gap review does not mean dependency closure.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Dependency 005 evidence plan does not mean dependency 005 is closed.",
    "Third-party routing plan does not mean third-party routing implementation.",
    "Third-party routing plan does not mean third-party routing authorization.",
    "Provider registry plan does not mean provider registry exists.",
    "Provider status plan does not mean provider status implementation exists.",
    "Data-routing map plan does not mean data-routing map exists.",
    "Token/URL/secret handling plan does not mean token/URL/secret handling implementation exists.",
    "Auditability plan does not mean audit/access-log implementation exists.",
    "Product candidate plan does not mean product candidate selected.",
    "External-use plan does not mean external-use authorized.",
    "Local log boundary does not mean local logs are CI evidence.",
    "Local log boundary does not mean local logs are packet components.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "REVIEW_ONLY_DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("forbidden exact overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "DEPENDENCY_005_IMPLEMENTATION_READY",
    "DEPENDENCY_005_READY_FOR_IMPLEMENTATION",
    "DEPENDENCY_005_IMPLEMENTED",
    "DEPENDENCY_005_CLOSED",
    "DEPENDENCY_005_BLOCKER_RESOLVED",
    "EVIDENCE_PLAN_AUTHORIZES_IMPLEMENTATION",
    "EVIDENCE_PLAN_AUTHORIZES_RUNTIME",
    "CLOSURE_PLAN_CREATES_CLOSURE",
    "IMPLEMENTATION_EVIDENCE_EXISTS",
    "TEST_EVIDENCE_EXISTS",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "PROVIDER_INTEGRATION_CREATED",
    "PROVIDER_REGISTRY_CREATED",
    "PROVIDER_STATUS_IMPLEMENTED",
    "DATA_ROUTING_MAP_CREATED",
    "PROVIDER_RETENTION_DELETION_POSTURE_IMPLEMENTED",
    "PROVIDER_AUDITABILITY_IMPLEMENTED",
    "PROVIDER_TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_AUTHORIZED",
    "RUNTIME_READY",
    "MODEL_RUNTIME_READY",
    "MODEL_COMPLETE",
    "MODEL_COMPLETION_READY",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "RETENTION_DELETION_IMPLEMENTED",
    "RBAC_ACCESS_CONTROL_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "RUNTIME_GATE_IMPLEMENTED",
    "CI_EVIDENCE_CREATED",
    "CI_CERTIFICATION_CREATED",
    "RELEASE_APPROVAL_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "EXTERNAL_REVIEWER_APPROVAL_CREATED",
    "PRODUCT_READINESS_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
    "BLOCKER_RESOLVED",
    "DEPENDENCY_CLOSED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ]);
});
