const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_v1.md",
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
const testEvidence = sectionBetween("## Required Test Evidence Definition", "## Event Content Posture");
const closureCriteria = sectionBetween("## Closure Criteria", "## Dependency Links");
const recommendations = sectionBetween("## Recommended Smallest Safe Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_EVIDENCE_AND_CLOSURE_PLAN_ONLY",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_IMPLEMENTATION",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_RUNTIME_READY",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_AUDIT_LOGGING_IMPLEMENTATION",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_ACCESS_LOGGING_IMPLEMENTATION",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_LOG_SCHEMA",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_LOG_STORAGE",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_LOCAL_LOGS_PROMOTED_TO_CI_EVIDENCE",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_LOCAL_LOGS_PROMOTED_TO_PACKET_COMPONENTS",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_PRODUCT_READINESS",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_002_EVIDENCE_PLAN_NOT_DEPENDENCY_CLOSURE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "freezes the evidence and closure-plan layer for dependency 002 audit/access-log",
    "The evidence and closure plan is non-authorizing.",
    "The evidence and closure plan defines future evidence requirements only.",
    "The evidence and closure plan does not authorize implementation-readiness.",
    "The evidence and closure plan does not authorize implementation.",
    "The evidence and closure plan does not close dependency 002.",
    "The evidence and closure plan does not resolve blockers.",
    "The evidence and closure plan does not create runtime behavior, logging, schemas, storage, tests, CI evidence, product candidate, or external-use.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "DEPENDENCY_001_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_002_STATUS_GAP_BOUNDARY_CONTROLS_CURRENT_GAPS",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_SPECIFICATION_CONTEXT",
    "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_CONTROLS_BLOCKER_CONTEXT",
    "DEPENDENCY_002_EVIDENCE_AND_CLOSURE_PLAN_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "b05b150 docs(domain): freeze dependency-002 audit access log status gap boundary",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "PROVE_ONLY_DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_STATUS_GAP_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("dependency 002 current status exists", () => {
  assertIncludesAll([
    "Dependency 002 follows dependency 001 in roadmap order.",
    "Dependency 002 remains blocked.",
    "Dependency 002 remains not implemented.",
    "Dependency 002 remains not closed.",
    "Dependency 002 has no tracked implementation closure evidence.",
    "Dependency 002 has no tracked test closure evidence.",
    "Upstream dependency 001 remains not closed and must not be treated as closure.",
    "Audit/access-log foundation remains DOCS_ONLY/future-only.",
    "Audit/access-log implementation remains absent.",
    "Audit logging remains not implemented.",
    "Access logging remains not implemented.",
    "Event taxonomy runtime code remains absent.",
    "Log schema remains absent.",
    "Log storage remains absent.",
    "Formal audit logging remains not evidenced.",
    "Access logging remains not evidenced.",
    "Local logs remain not CI evidence.",
    "Local logs remain not packet components.",
    "Audit/access-log docs remain DOCS_ONLY or future-only.",
    "Event family candidates remain candidates only.",
    "Implementation evidence remains future evidence only.",
    "Test evidence remains future evidence only.",
    "Closure criteria are not met.",
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

test("all D002-ECP-001 through D002-ECP-029 rows exist", () => {
  for (let index = 1; index <= 29; index += 1) {
    assertIncludesAll([`D002-ECP-${String(index).padStart(3, "0")}`], matrix);
  }
  assertIncludesAll([
    "audit/access-log foundation evidence plan",
    "audit logging implementation evidence plan",
    "access logging implementation evidence plan",
    "event taxonomy runtime code evidence plan",
    "log schema evidence plan",
    "log storage evidence plan",
    "formal audit logging evidence plan",
    "access logging evidence plan",
    "local log boundary evidence plan",
    "no-raw/no-private/no-source-locator event content evidence plan",
    "prohibited event/log content evidence plan",
    "material intake event evidence plan",
    "blocked/prohibited ingress event evidence plan",
    "quarantine/block decision event evidence plan",
    "redaction/sanitization event evidence plan",
    "material routing event evidence plan",
    "review access event evidence plan",
    "manifest validation event evidence plan",
    "export/download event evidence plan",
    "packet/delivery promotion event evidence plan",
    "admin/support access attempt event evidence plan",
    "retention/deletion operation event evidence plan",
    "third-party route denial/approval event evidence plan",
    "runtime/schema/workflow gate candidate event evidence plan",
    "human/professional review access event evidence plan",
    "implementation evidence plan",
    "test evidence plan",
    "closure criteria plan",
    "non-authorization preservation plan",
  ], matrix);
});

test("matrix row posture exists", () => {
  assertIncludesAll([
    "Every row preserves future evidence only.",
    "Every row preserves not currently implemented status.",
    "Every row preserves not currently closed status.",
    "Every row preserves no current runtime authorization.",
    "Every row preserves no current product/external-use authorization.",
    "Every row preserves no current implementation-readiness authorization.",
    "Every row preserves that closure requires separate tracked implementation evidence.",
    "Every row preserves that closure requires separate tracked test evidence.",
    "Every row preserves that closure requires separate future explicit authorization.",
    "Every row preserves that failure or ambiguity outcome is fail-closed continued pause.",
  ]);
});

test("required implementation evidence definition exists", () => {
  assertIncludesAll([
    "tracked implementation diff",
    "scoped implementation rationale",
    "explicit affected and non-affected surfaces",
    "no raw/private/source inspection proof",
    "no runtime/API/schema/package behavior beyond explicit authorization",
    "event taxonomy contract",
    "no-content/no-raw/no-private/no-source-locator event guard",
    "audit logging path evidence",
    "access logging path evidence",
    "log schema evidence if schema is introduced",
    "log storage evidence if storage is introduced",
    "local-log non-CI/non-packet boundary evidence",
    "RBAC/admin-support dependency evidence",
    "retention/deletion dependency evidence",
    "raw-material routing dependency evidence",
    "third-party/provider dependency evidence",
    "rollback/fail-closed posture",
    "human/professional review preservation",
    "None of this evidence exists yet for dependency 002 closure.",
  ], implementationEvidence);
});

test("required test evidence definition exists", () => {
  assertIncludesAll([
    "audit event allow/deny tests",
    "access event allow/deny tests",
    "wrong-tenant tests",
    "wrong-case tests",
    "wrong-object/function/property tests where applicable",
    "no-raw/no-private/no-source-locator leakage tests",
    "prohibited event/log content tests",
    "local-log not-CI and not-packet tests",
    "event taxonomy tests",
    "log schema tests if log schema is introduced",
    "log storage/access/no-leak tests if storage is introduced",
    "admin/support access attempt event tests",
    "retention/deletion operation event tests",
    "third-party no-route or route-decision event tests",
    "export/download and packet/delivery promotion no-approval/no-external-use tests",
    "human/professional review access no-signoff/no-approval tests",
    "CI evidence only if CI is claimed",
    "no-release/no-product/no-external-use overclaim tests",
    "None of this test evidence exists yet for dependency 002 closure.",
  ], testEvidence);
});

test("event content posture exists", () => {
  assertIncludesAll([
    "Allowed future event content is limited to subject reference, role/permission concept, tenant/case scope, material class, route/surface, decision status, timestamp category, reason code, and explicit no-raw/no-private/no-source-locator marker.",
    "Prohibited event/log content includes raw source text, private facts, source locators, filenames/private paths, page references, URLs/tokens, PDF/image/metadata content, sensitive personal details, legal/clinical/evidentiary/case-truth conclusions, product-candidate claims, and external-use claims.",
  ]);
});

test("closure criteria definition exists", () => {
  assertIncludesAll([
    "all required implementation evidence tracked",
    "all required test evidence tracked",
    "current blocker status updated by separate future boundary",
    "negative boundary preserved",
    "dependency order preserved",
    "upstream/dependency links resolved or explicitly reviewed as not required",
    "human/professional release gate preserved",
    "explicit future user-authorized closure posture",
    "focused proof test for closure boundary",
    "no overclaiming tokens present",
    "Closure criteria do not mean closure.",
    "Closure criteria are not met.",
    "No closure is created by this boundary.",
  ], closureCriteria);
});

test("dependency links exist", () => {
  assertIncludesAll([
    "Upstream dependency 001 remains not closed.",
    "RBAC/admin-support implementation remains absent.",
    "Retention/deletion implementation remains absent.",
    "Raw-material routing implementation remains absent.",
    "Third-party routing remains unauthorized.",
    "Validator dispatch remains not created.",
    "Registry/lookup remains not created.",
    "Runtime gate inventory remains deferred.",
    "CI evidence remains not created.",
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
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no audit logging implementation.",
    "This boundary creates no access logging implementation.",
    "This boundary creates no event taxonomy runtime code.",
    "This boundary creates no log schema.",
    "This boundary creates no log storage.",
    "This boundary creates no formal audit logging evidence.",
    "This boundary creates no access logging evidence.",
    "This boundary creates no local logs promoted to CI evidence.",
    "This boundary creates no local logs promoted to packet components.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no retention/deletion implementation.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no third-party routing implementation or authorization.",
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no runtime gate implementation.",
    "This boundary creates no runtime gate inventory as implementation.",
    "This boundary creates no CI evidence creation.",
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
    "This boundary creates no raw/private/source inspection.",
    "This boundary creates no source package inspection.",
    "This boundary creates no PDF/image/screenshot/metadata inspection.",
    "This boundary creates no metadata acquisition.",
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
    "Status/gap suitability does not mean dependency 002 is implementation-ready.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Dependency 002 evidence plan does not mean dependency 002 is closed.",
    "Audit/access-log foundation plan does not mean foundation implementation.",
    "Event family candidate does not mean runtime event taxonomy exists.",
    "Local log boundary does not mean local logs are CI evidence.",
    "Local log boundary does not mean local logs are packet components.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "REVIEW_ONLY_DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
  assertDoesNotIncludeExactToken([
    "DOCS_ONLY_DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "RUNTIME_CHANGE_DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "IMPLEMENT_DEPENDENCY_002_AUDIT_ACCESS_LOG",
  ], recommendations);
});

test("overclaiming exact tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "DEPENDENCY_002_IMPLEMENTATION_READY",
    "DEPENDENCY_002_READY_FOR_IMPLEMENTATION",
    "DEPENDENCY_002_IMPLEMENTED",
    "DEPENDENCY_002_CLOSED",
    "DEPENDENCY_002_BLOCKER_RESOLVED",
    "EVIDENCE_PLAN_AUTHORIZES_IMPLEMENTATION",
    "EVIDENCE_PLAN_AUTHORIZES_RUNTIME",
    "CLOSURE_PLAN_CREATES_CLOSURE",
    "IMPLEMENTATION_EVIDENCE_EXISTS",
    "TEST_EVIDENCE_EXISTS",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "AUDIT_LOGGING_IMPLEMENTED",
    "ACCESS_LOGGING_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "FORMAL_AUDIT_LOGGING_EVIDENCE_CREATED",
    "ACCESS_LOGGING_EVIDENCE_CREATED",
    "LOCAL_LOGS_PROMOTED_TO_CI_EVIDENCE",
    "LOCAL_LOGS_PROMOTED_TO_PACKET_COMPONENTS",
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_AUTHORIZED",
    "RUNTIME_READY",
    "MODEL_RUNTIME_READY",
    "MODEL_COMPLETE",
    "MODEL_COMPLETION_READY",
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
