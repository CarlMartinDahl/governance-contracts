const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_v1.md",
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
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_EVIDENCE_AND_CLOSURE_PLAN_ONLY",
    "DEPENDENCY_004_EVIDENCE_PLAN_PARTIAL_GAP_CONTEXT",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_IMPLEMENTATION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_RUNTIME_READY",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_SOURCE_PACKAGE_INSPECTION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_METADATA_ACQUISITION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_DENY_QUARANTINE_RUNTIME_ENFORCEMENT",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION_EVIDENCE",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_RAW_MATERIAL_ROUTING_TEST_EVIDENCE",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_LOG_SCHEMA",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_LOG_STORAGE",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_RETENTION_DELETION_IMPLEMENTATION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_PRODUCT_READINESS",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_004_EVIDENCE_PLAN_NOT_DEPENDENCY_CLOSURE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "freezes the evidence and closure-plan layer for dependency 004 raw-material routing",
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
    "DEPENDENCY_004_STATUS_GAP_BOUNDARY_CONTROLS_CURRENT_GAPS",
    "RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY_CONTROLS_FEASIBILITY_CONTEXT",
    "SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY_CONTROLS_SCOPE_CONTEXT",
    "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_SPECIFICATION_CONTEXT",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "DEPENDENCY_004_EVIDENCE_AND_CLOSURE_PLAN_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "4a8a28f docs(domain): freeze dependency-004 raw material routing status gap boundary",
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "PROVE_ONLY_DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_STATUS_GAP_REVIEWED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("dependency 004 current status exists", () => {
  assertIncludesAll([
    "Dependency 004 follows dependency 003 in roadmap order.",
    "Dependency 004 remains blocked.",
    "Dependency 004 remains not implemented.",
    "Dependency 004 remains not closed.",
    "Dependency 004 has no tracked implementation closure evidence.",
    "Dependency 004 has no tracked test closure evidence.",
    "Upstream dependencies 001, 002, and 003 remain not closed and must not be treated as closure.",
    "RBAC/admin-support, audit/access-log, retention/deletion, third-party/provider dependencies are identified but unresolved.",
    "Validator dispatch, registry/lookup, runtime gate inventory, and CI evidence remain absent/deferred.",
    "Raw-material routing feasibility review remains DOCS_ONLY.",
    "Security-agent raw-material routing feasibility matrix scope review remains DOCS_ONLY.",
    "Raw-material routing control specification remains DOCS_ONLY.",
    "Raw-material routing implementation remains absent.",
    "Raw/private/source material inspection remains absent and unauthorized.",
    "Source package inspection remains absent and unauthorized.",
    "PDF/image/screenshot/metadata inspection remains absent and unauthorized.",
    "Metadata acquisition remains absent and unauthorized.",
    "Deny/quarantine posture remains future-only and not runtime enforcement.",
    "No-raw/no-private/no-source-locator routing posture remains specification/future-only.",
    "Raw-material routing implementation evidence remains absent.",
    "Raw-material routing test evidence remains absent.",
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

test("all D004-ECP-001 through D004-ECP-029 rows exist", () => {
  for (let index = 1; index <= 29; index += 1) {
    assertIncludesAll([`D004-ECP-${String(index).padStart(3, "0")}`], matrix);
  }
  assertIncludesAll([
    "raw-material routing controls evidence plan",
    "routing implementation evidence plan",
    "raw/private/source handling evidence plan",
    "source package handling evidence plan",
    "PDF/image/screenshot/metadata handling evidence plan",
    "metadata acquisition boundary evidence plan",
    "deny/quarantine posture evidence plan",
    "no-raw/no-private/no-locator routing evidence plan",
    "material-class routing matrix evidence plan",
    "sanitized text route evidence plan",
    "redacted review signal route evidence plan",
    "no-raw metadata manifest route evidence plan",
    "generated/export artifact route evidence plan",
    "local log/test transcript route evidence plan",
    "raw private source route evidence plan",
    "source package route evidence plan",
    "PDF/image/screenshot/metadata route evidence plan",
    "third-party/API route evidence plan",
    "human/professional review-only route evidence plan",
    "audit/access-log dependency evidence plan",
    "RBAC/admin-support authorization dependency evidence plan",
    "retention/deletion dependency evidence plan",
    "third-party/provider dependency evidence plan",
    "validator dispatch / registry lookup / runtime gate dependency evidence plan",
    "CI evidence boundary plan",
    "implementation evidence plan",
    "test evidence plan",
    "closure criteria plan",
    "non-authorization preservation plan",
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
    "Every row preserves no raw/private/source inspection.",
    "Every row preserves no source package inspection.",
    "Every row preserves no PDF/image/screenshot/metadata inspection.",
    "Every row preserves no metadata acquisition.",
    "Every row preserves no deny/quarantine runtime enforcement.",
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
    "scoped rationale",
    "affected/non-affected surfaces",
    "material-class routing control path",
    "deny/quarantine control path",
    "no-raw/no-private/no-source-locator route policy",
    "raw/private/source deny/quarantine boundary",
    "source-package deny/quarantine boundary",
    "PDF/image/screenshot/metadata deny/acquisition boundary",
    "metadata acquisition contract if introduced",
    "sanitized text route evidence",
    "redacted review signal route evidence",
    "no-raw metadata manifest route evidence",
    "generated/export artifact route evidence",
    "local log/test transcript route evidence",
    "raw private source route denial evidence",
    "source package route denial evidence",
    "PDF/image/screenshot/metadata route denial evidence",
    "third-party/API no-route or provider-route policy evidence",
    "human/professional review-only route preservation",
    "no raw/private/source inspection proof",
    "no source package inspection proof",
    "no PDF/image/screenshot/metadata inspection proof",
    "no metadata acquisition proof unless separately authorized",
    "RBAC/admin-support dependency evidence",
    "audit/access-log dependency evidence",
    "retention/deletion dependency evidence",
    "third-party/provider dependency evidence",
    "validator/registry/runtime-gate evidence only if separately authorized",
    "rollback/fail-closed posture",
    "human/professional review preservation",
    "None of this evidence exists yet for dependency 004 closure.",
  ], implementationEvidence);
});

test("required test evidence definition exists", () => {
  assertIncludesAll([
    "Future test evidence would need, at minimum:",
    "material-class allow/deny tests",
    "sanitized-text-only routing tests",
    "redacted review signal routing tests",
    "no-raw metadata manifest routing tests",
    "generated/export artifact allow/deny tests",
    "local log/test transcript non-CI/non-packet tests",
    "raw/private/source denial tests",
    "source package denial tests",
    "PDF/image/screenshot/metadata no-acquisition/no-inspection tests",
    "metadata acquisition denial tests",
    "deny/quarantine behavior tests",
    "no-raw/no-private/no-source-locator leakage tests",
    "wrong-tenant tests",
    "wrong-case tests",
    "wrong-object/function/property tests where applicable",
    "audit/access-log no-payload event tests",
    "RBAC/admin/support authorization and bypass-prevention tests".replace("RBAC/admin/support", "RBAC/admin-support"),
    "retention/deletion lifecycle dependency tests",
    "third-party/provider no-route/raw-denial tests",
    "validator/registry/runtime-gate tests only if separately authorized",
    "CI evidence only if CI is claimed",
    "no-release/no-product/no-external-use overclaim tests",
    "None of this test evidence exists yet for dependency 004 closure.",
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
    "upstream dependencies 001/002/003 reviewed and not overread as closure unless separately closed",
    "RBAC/admin-support resolved or explicitly reviewed as not required",
    "audit/access-log resolved or explicitly reviewed as not required",
    "retention/deletion resolved or explicitly reviewed as not required",
    "third-party/provider resolved or explicitly reviewed as not required",
    "validator/registry/runtime-gate dependency resolved or explicitly reviewed as not required",
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
    "RBAC/admin-support implementation absent.",
    "Audit/access-log implementation absent.",
    "Audit logging/access logging not implemented.",
    "Event taxonomy runtime code absent.",
    "Log schema absent.",
    "Log storage absent.",
    "Retention/deletion implementation absent.",
    "Third-party routing unauthorized.",
    "Third-party/provider dependencies unresolved.",
    "Validator dispatch not created.",
    "Registry/lookup not created.",
    "Runtime gate inventory deferred.",
    "CI evidence not created.",
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
    "This boundary creates no runtime/API/schema/package change.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary authorizes no raw/private/source inspection.",
    "This boundary authorizes no source package inspection.",
    "This boundary authorizes no PDF/image/screenshot/metadata inspection.",
    "This boundary authorizes no metadata acquisition.",
    "This boundary creates no deny/quarantine runtime enforcement.",
    "This boundary creates no raw-material routing implementation evidence.",
    "This boundary creates no raw-material routing test evidence.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no audit logging.",
    "This boundary creates no access logging.",
    "This boundary creates no event taxonomy runtime code.",
    "This boundary creates no log schema.",
    "This boundary creates no log storage.",
    "This boundary creates no retention/deletion implementation.",
    "This boundary creates no third-party routing implementation or authorization.",
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no runtime gate implementation.",
    "This boundary treats runtime gate inventory as context only, not implementation.",
    "This boundary creates no CI evidence.",
    "This boundary creates no release approval.",
    "This boundary creates no runtime certification.",
    "This boundary creates no technical sign-off.",
    "This boundary creates no External Reviewer approval.",
    "This boundary creates no product readiness.",
    "This boundary selects no product candidate.",
    "This boundary authorizes no external-use.",
    "This boundary resolves no blocker.",
    "This boundary closes no dependency.",
    "This boundary creates no finding.",
    "This boundary assigns no severity.",
    "This boundary recommends no remediation.",
    "This boundary creates no local log file inspection.",
    "This boundary starts no real private run.",
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
    "Status/gap suitability does not mean dependency 004 is implementation-ready.",
    "Partial/gap review does not mean dependency closure.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Dependency 004 evidence plan does not mean dependency 004 is closed.",
    "Raw-material routing plan does not mean raw-material routing implementation.",
    "Material-class route plan does not mean material-class runtime enforcement.",
    "Deny/quarantine plan does not mean deny/quarantine runtime enforcement.",
    "No-raw/no-private/no-source-locator plan does not mean runtime route policy exists.",
    "Raw/private/source boundary does not mean raw/private/source inspection is authorized.",
    "Source package boundary does not mean source package inspection is authorized.",
    "PDF/image/screenshot/metadata boundary does not mean inspection is authorized.",
    "Metadata acquisition boundary does not mean metadata acquisition is authorized.",
    "Local log boundary does not mean local logs are CI evidence.",
    "Local log boundary does not mean local logs are packet components.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "REVIEW_ONLY_DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("forbidden exact overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "DEPENDENCY_004_IMPLEMENTATION_READY",
    "DEPENDENCY_004_READY_FOR_IMPLEMENTATION",
    "DEPENDENCY_004_IMPLEMENTED",
    "DEPENDENCY_004_CLOSED",
    "DEPENDENCY_004_BLOCKER_RESOLVED",
    "EVIDENCE_PLAN_AUTHORIZES_IMPLEMENTATION",
    "EVIDENCE_PLAN_AUTHORIZES_RUNTIME",
    "CLOSURE_PLAN_CREATES_CLOSURE",
    "IMPLEMENTATION_EVIDENCE_EXISTS",
    "TEST_EVIDENCE_EXISTS",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "DENY_QUARANTINE_RUNTIME_ENFORCEMENT_CREATED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_EVIDENCE_CREATED",
    "RAW_MATERIAL_ROUTING_TEST_EVIDENCE_CREATED",
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
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
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
