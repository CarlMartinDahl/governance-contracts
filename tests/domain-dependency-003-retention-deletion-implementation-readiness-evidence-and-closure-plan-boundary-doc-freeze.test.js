const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_v1.md",
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
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_003_RETENTION_DELETION_EVIDENCE_AND_CLOSURE_PLAN_ONLY",
    "DEPENDENCY_003_EVIDENCE_PLAN_PARTIAL_GAP_CONTEXT",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_IMPLEMENTATION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_RUNTIME_READY",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_RETENTION_DELETION_IMPLEMENTATION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_DELETE_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_PURGE_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_LIFECYCLE_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_RETENTION_POLICY_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_DELETION_POLICY_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_LIFECYCLE_SCHEDULER",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_RETENTION_JOB",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_DELETION_JOB",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_STORAGE_POLICY_IMPLEMENTATION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_RETENTION_DELETION_IMPLEMENTATION_EVIDENCE",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_RETENTION_DELETION_TEST_EVIDENCE",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_PRODUCT_READINESS",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_003_EVIDENCE_PLAN_NOT_DEPENDENCY_CLOSURE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "freezes the evidence and closure-plan layer for dependency 003 retention/deletion",
    "The evidence and closure plan is non-authorizing.",
    "The evidence and closure plan preserves partial/gap posture.",
    "The evidence and closure plan defines future evidence requirements only.",
    "The evidence and closure plan creates no implementation-readiness authorization.",
    "The evidence and closure plan creates no implementation.",
    "The evidence and closure plan creates no runtime behavior.",
    "The evidence and closure plan creates no implementation evidence, test evidence, CI evidence, product candidate, external-use, blocker resolution, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "DEPENDENCY_001_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_002_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_003_STATUS_GAP_BOUNDARY_CONTROLS_CURRENT_GAPS",
    "RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_SPECIFICATION_CONTEXT",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "DEPENDENCY_003_EVIDENCE_AND_CLOSURE_PLAN_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "64c8c0b docs(domain): freeze dependency-003 retention deletion status gap boundary",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "PROVE_ONLY_DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_STATUS_GAP_REVIEWED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("dependency 003 current status exists", () => {
  assertIncludesAll([
    "Dependency 003 follows dependency 002 in roadmap order.",
    "Dependency 003 remains blocked.",
    "Dependency 003 remains not implemented.",
    "Dependency 003 remains not closed.",
    "Dependency 003 has no tracked implementation closure evidence.",
    "Dependency 003 has no tracked test closure evidence.",
    "Upstream dependency 001 remains not closed and must not be treated as closure.",
    "Upstream dependency 002 remains not closed and must not be treated as closure.",
    "RBAC/admin-support dependencies are identified but unresolved.",
    "Audit/access-log dependencies are identified but unresolved.",
    "Third-party/provider dependencies are identified but unresolved.",
    "No CI evidence is claimed.",
    "Local logs remain not CI evidence.",
    "Retention/deletion control specification remains DOCS_ONLY.",
    "Retention/deletion implementation remains absent.",
    "Delete runtime behavior remains absent.",
    "Purge runtime behavior remains absent.",
    "Lifecycle runtime behavior remains absent.",
    "Retention policy runtime behavior remains absent.",
    "Deletion policy runtime behavior remains absent.",
    "Lifecycle scheduler remains absent.",
    "Retention job remains absent.",
    "Deletion job remains absent.",
    "Storage policy implementation remains absent.",
    "Retention/deletion implementation evidence remains absent.",
    "Retention/deletion test evidence remains absent.",
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

test("all D003-ECP-001 through D003-ECP-024 rows exist", () => {
  for (let index = 1; index <= 24; index += 1) {
    assertIncludesAll([`D003-ECP-${String(index).padStart(3, "0")}`], matrix);
  }
  assertIncludesAll([
    "retention/deletion lifecycle evidence plan",
    "retention implementation evidence plan",
    "deletion implementation evidence plan",
    "purge logic evidence plan",
    "lifecycle state evidence plan",
    "retention policy runtime behavior evidence plan",
    "deletion policy runtime behavior evidence plan",
    "lifecycle scheduler evidence plan",
    "retention job evidence plan",
    "deletion job evidence plan",
    "storage policy implementation evidence plan",
    "local-log retention/deletion boundary evidence plan",
    "raw/private/source material retention/deletion boundary evidence plan",
    "generated/export artifact retention/deletion boundary evidence plan",
    "audit/access-log retention/deletion dependency evidence plan",
    "RBAC/admin-support authorization dependency evidence plan",
    "raw-material routing dependency evidence plan",
    "third-party/provider retention/deletion dependency evidence plan",
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
    "Future implementation evidence would need, at minimum:",
    "tracked implementation diff",
    "scoped implementation rationale",
    "explicit affected and non-affected surfaces",
    "retention/deletion policy-to-runtime binding",
    "lifecycle state model if introduced",
    "delete path evidence",
    "purge path evidence",
    "retention path evidence",
    "lifecycle scheduler/job evidence if introduced",
    "storage policy evidence if introduced",
    "local-log retention/deletion boundary evidence",
    "raw/private/source material retention/deletion boundary evidence",
    "generated/export artifact retention/deletion boundary evidence",
    "no raw/private/source inspection proof",
    "no runtime/API/schema/package behavior beyond explicit authorization",
    "RBAC/admin-support dependency evidence",
    "audit/access-log dependency evidence",
    "raw-material routing dependency evidence",
    "third-party/provider dependency evidence",
    "rollback/fail-closed posture",
    "human/professional review preservation",
    "None of this evidence exists yet for dependency 003 closure.",
  ], implementationEvidence);
});

test("required test evidence definition exists", () => {
  assertIncludesAll([
    "Future test evidence would need, at minimum:",
    "retention policy linkage tests",
    "deletion policy linkage tests",
    "delete/no-content tests",
    "purge scope tests",
    "lifecycle state transition tests",
    "retention job tests if job introduced",
    "deletion job tests if job introduced",
    "storage policy tests if storage policy introduced",
    "wrong-tenant tests",
    "wrong-case tests",
    "wrong-object/function/property tests where applicable",
    "local-log retention/deletion boundary tests",
    "raw/private/source retention/deletion boundary tests",
    "generated/export artifact retention/deletion boundary tests",
    "audit/access-log lifecycle event tests",
    "RBAC/admin-support authorization tests",
    "third-party/provider no-route or lifecycle-policy tests",
    "CI evidence only if CI is claimed",
    "no-release/no-product/no-external-use overclaim tests",
    "None of this test evidence exists yet for dependency 003 closure.",
  ], testEvidence);
});

test("closure criteria definition exists", () => {
  assertIncludesAll([
    "all required implementation evidence",
    "all required test evidence",
    "separate future blocker-status update",
    "negative-boundary preservation",
    "dependency-order preservation",
    "upstream dependency review",
    "RBAC/admin-support dependency resolution or explicit not-required review",
    "audit/access-log dependency resolution or explicit not-required review",
    "third-party/provider dependency resolution or explicit not-required review",
    "human/professional release gate preservation",
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
    "RBAC/admin-support implementation remains absent.",
    "Audit/access-log implementation remains absent.",
    "Audit logging/access logging remain not implemented.",
    "Event taxonomy runtime code remains absent.",
    "Log schema remains absent.",
    "Log storage remains absent.",
    "Raw-material routing implementation remains absent.",
    "Third-party routing remains unauthorized.",
    "Third-party/provider dependencies remain unresolved.",
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
    "This boundary creates no retention/deletion implementation.",
    "This boundary creates no delete runtime behavior.",
    "This boundary creates no purge runtime behavior.",
    "This boundary creates no lifecycle runtime behavior.",
    "This boundary creates no retention/deletion jobs/scheduler.",
    "This boundary creates no storage policy implementation.",
    "This boundary creates no retention/deletion evidence creation.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no third-party routing implementation or authorization.",
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no runtime gates.",
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
    "Status/gap suitability does not mean dependency 003 is implementation-ready.",
    "Partial/gap review does not mean dependency closure.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Dependency 003 evidence plan does not mean dependency 003 is closed.",
    "Retention/deletion lifecycle plan does not mean retention/deletion implementation.",
    "Policy linkage plan does not mean policy-to-runtime binding exists.",
    "Delete plan does not mean delete runtime behavior exists.",
    "Purge plan does not mean purge runtime behavior exists.",
    "Lifecycle plan does not mean lifecycle runtime behavior exists.",
    "Local log boundary does not mean local logs are CI evidence.",
    "Local log boundary does not mean local logs are packet components.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "May recommend only:",
    "REVIEW_ONLY_DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "REVIEW_ONLY_DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("rejects exact overclaiming tokens", () => {
  assertDoesNotIncludeExactToken([
    "DEPENDENCY_003_IMPLEMENTATION_READY",
    "DEPENDENCY_003_READY_FOR_IMPLEMENTATION",
    "DEPENDENCY_003_IMPLEMENTED",
    "DEPENDENCY_003_CLOSED",
    "DEPENDENCY_003_BLOCKER_RESOLVED",
    "EVIDENCE_PLAN_AUTHORIZES_IMPLEMENTATION",
    "EVIDENCE_PLAN_AUTHORIZES_RUNTIME",
    "CLOSURE_PLAN_CREATES_CLOSURE",
    "IMPLEMENTATION_EVIDENCE_EXISTS",
    "TEST_EVIDENCE_EXISTS",
    "RETENTION_DELETION_IMPLEMENTED",
    "DELETE_RUNTIME_BEHAVIOR_CREATED",
    "PURGE_RUNTIME_BEHAVIOR_CREATED",
    "LIFECYCLE_RUNTIME_BEHAVIOR_CREATED",
    "RETENTION_POLICY_RUNTIME_BEHAVIOR_CREATED",
    "DELETION_POLICY_RUNTIME_BEHAVIOR_CREATED",
    "LIFECYCLE_SCHEDULER_CREATED",
    "RETENTION_JOB_CREATED",
    "DELETION_JOB_CREATED",
    "STORAGE_POLICY_IMPLEMENTED",
    "RETENTION_DELETION_IMPLEMENTATION_EVIDENCE_CREATED",
    "RETENTION_DELETION_TEST_EVIDENCE_CREATED",
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
