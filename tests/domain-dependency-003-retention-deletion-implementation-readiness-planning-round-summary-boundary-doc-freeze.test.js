const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_v1.md",
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

const matrix = sectionBetween(
  "## Dependency-003 Planning-Layer Matrix",
  "## Dependency 003 Current Status",
);
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_003_RETENTION_DELETION_PLANNING_ROUND_SUMMARY_ONLY",
    "DEPENDENCY_003_PLANNING_ROUND_PARTIAL_GAP_CONTEXT",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_IMPLEMENTATION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RUNTIME_READY",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_DEPENDENCY_CLOSURE",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RETENTION_DELETION_IMPLEMENTATION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_DELETE_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_PURGE_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_LIFECYCLE_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RETENTION_POLICY_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_DELETION_POLICY_RUNTIME_BEHAVIOR",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_LIFECYCLE_SCHEDULER",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RETENTION_JOB",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_DELETION_JOB",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_STORAGE_POLICY_IMPLEMENTATION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RETENTION_DELETION_IMPLEMENTATION_EVIDENCE",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RETENTION_DELETION_TEST_EVIDENCE",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_SOURCE_PACKAGE_INSPECTION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_METADATA_ACQUISITION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_PRODUCT_READINESS",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_003_PLANNING_ROUND_NOT_DEPENDENCY_004_SELECTION",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed dependency-003 retention/deletion implementation-readiness planning round as summary/context only.",
    "It is non-authorizing.",
    "It preserves partial/gap posture.",
    "It does not authorize implementation-readiness, implementation, runtime behavior, dependency closure, blocker resolution, evidence creation, test creation, dependency 004, product candidate, release approval, or external-use.",
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
    "DEPENDENCY_003_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_CONTROLS_FUTURE_EVIDENCE_REQUIREMENTS",
    "RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_SPECIFICATION_CONTEXT",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "DEPENDENCY_003_PLANNING_ROUND_STATUS_LOCK_IS_CONTEXT_ONLY",
    "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_DEPENDENCY_004_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "5a582ce docs(domain): freeze dependency-003 retention deletion evidence closure plan boundary",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_PLANNING_ROUND_STATUS_LOCKED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "PROVE_ONLY_DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_STATUS_GAP_REVIEWED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("planning-layer matrix exists", () => {
  assertIncludesAll([
    "row ID",
    "planning layer",
    "source / accepted marker",
    "current status",
    "what it proves",
    "what it does not prove",
    "what remains non-authorized",
    "Every row preserves partial/gap posture where applicable, non-authorizing status, no implementation-readiness authorization, no implementation, no runtime behavior, no dependency closure, no blocker resolution, and no product/external-use authorization.",
  ], matrix);
});

test("all D003-PLAN-001 through D003-PLAN-005 rows exist", () => {
  assertIncludesAll([
    "D003-PLAN-001",
    "D003-PLAN-002",
    "D003-PLAN-003",
    "D003-PLAN-004",
    "D003-PLAN-005",
  ], matrix);
});

test("dependency 003 current status exists", () => {
  assertIncludesAll([
    "Dependency 003 follows dependency 002 in roadmap order.",
    "Dependency 003 covers retention/deletion lifecycle, retention/deletion implementation, delete runtime behavior, purge runtime behavior, lifecycle runtime behavior, retention policy runtime behavior, deletion policy runtime behavior, lifecycle scheduler, retention job, deletion job, storage policy implementation, local-log retention/deletion boundary, raw/private/source material retention/deletion boundary, generated/export artifact retention/deletion boundary.",
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

test("evidence and closure posture exists", () => {
  assertIncludesAll([
    "Partial/gap posture is preserved.",
    "Evidence plan does not mean evidence exists.",
    "Closure plan does not mean closure.",
    "Required implementation evidence remains future evidence.",
    "Required test evidence remains future evidence.",
    "Closure criteria do not mean closure.",
    "Closure criteria are not met.",
    "No closure is created by dependency-003 planning round.",
    "Closure requires separate tracked implementation evidence.",
    "Closure requires separate tracked test evidence.",
    "Closure requires separate future explicit authorization.",
  ]);
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
    "Raw/private/source material inspection remains absent and unauthorized.",
    "Source package inspection remains absent and unauthorized.",
    "PDF/image/screenshot/metadata inspection remains absent and unauthorized.",
    "Metadata acquisition remains absent and unauthorized.",
    "Third-party routing remains unauthorized.",
    "Third-party/provider dependencies remain unresolved.",
    "Validator dispatch remains not created.",
    "Registry/lookup remains not created.",
    "Runtime gate inventory remains deferred.",
    "CI evidence remains not created.",
    "Human/professional review remains release gate.",
    "Dependency 004 was not selected by dependency-003 planning-round lock.",
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
    "This boundary creates no retention policy runtime behavior.",
    "This boundary creates no deletion policy runtime behavior.",
    "This boundary creates no lifecycle scheduler.",
    "This boundary creates no retention job.",
    "This boundary creates no deletion job.",
    "This boundary creates no storage policy implementation.",
    "This boundary creates no retention/deletion implementation evidence.",
    "This boundary creates no retention/deletion test evidence.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no raw/private/source inspection.",
    "This boundary creates no source package inspection.",
    "This boundary creates no PDF/image/screenshot/metadata inspection.",
    "This boundary creates no metadata acquisition.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no audit logging implementation.",
    "This boundary creates no access logging implementation.",
    "This boundary creates no event taxonomy runtime code.",
    "This boundary creates no log schema.",
    "This boundary creates no log storage.",
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
    "This boundary creates no dependency 004 selection.",
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
    "Planning-round summary does not mean implementation-readiness authorization.",
    "Planning-round summary does not mean implementation.",
    "Planning-round summary does not mean dependency closure.",
    "Planning-round summary does not mean blocker resolution.",
    "Planning-round summary does not select dependency 004.",
    "Partial/gap planning round does not mean closure.",
    "Evidence plan does not mean evidence exists.",
    "Closure plan does not mean closure.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Dependency 003 planning completion does not mean dependency 003 is implementation-ready.",
    "Retention/deletion lifecycle plan does not mean retention/deletion implementation.",
    "Policy linkage plan does not mean policy-to-runtime binding exists.",
    "Delete plan does not mean delete runtime behavior exists.",
    "Purge plan does not mean purge runtime behavior exists.",
    "Lifecycle plan does not mean lifecycle runtime behavior exists.",
    "Raw-material routing dependency does not mean raw-material routing implementation.",
    "Raw/private/source inspection remains unauthorized.",
    "Source package inspection remains unauthorized.",
    "PDF/image/screenshot/metadata inspection remains unauthorized.",
    "Metadata acquisition remains unauthorized.",
    "Local log boundary does not mean local logs are CI evidence.",
    "Local log boundary does not mean local logs are packet components.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "May recommend only:",
    "REVIEW_ONLY_DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "REVIEW_ONLY_DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_AFTER_DEPENDENCY_003_PLANNING_ROUND_SUMMARY",
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
    "PLANNING_ROUND_AUTHORIZES_IMPLEMENTATION",
    "PLANNING_ROUND_AUTHORIZES_RUNTIME",
    "PLANNING_ROUND_CREATES_CLOSURE",
    "PLANNING_ROUND_SELECTS_DEPENDENCY_004",
    "EVIDENCE_PLAN_AUTHORIZES_IMPLEMENTATION",
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
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
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
