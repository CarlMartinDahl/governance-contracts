const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY_v1.md",
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

const matrix = sectionBetween("## Dependency 002 Status/Gap Matrix", "## Matrix Row Posture");
const recommendations = sectionBetween("## Recommended Smallest Safe Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_STATUS_GAP_ONLY",
    "DEPENDENCY_002_STATUS_GAP_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_002_STATUS_GAP_NOT_IMPLEMENTATION",
    "DEPENDENCY_002_STATUS_GAP_NOT_RUNTIME_READY",
    "DEPENDENCY_002_STATUS_GAP_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_002_STATUS_GAP_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_002_STATUS_GAP_NOT_AUDIT_LOGGING_IMPLEMENTATION",
    "DEPENDENCY_002_STATUS_GAP_NOT_ACCESS_LOGGING_IMPLEMENTATION",
    "DEPENDENCY_002_STATUS_GAP_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "DEPENDENCY_002_STATUS_GAP_NOT_LOG_SCHEMA",
    "DEPENDENCY_002_STATUS_GAP_NOT_LOG_STORAGE",
    "DEPENDENCY_002_STATUS_GAP_NOT_LOCAL_LOGS_PROMOTED_TO_CI_EVIDENCE",
    "DEPENDENCY_002_STATUS_GAP_NOT_LOCAL_LOGS_PROMOTED_TO_PACKET_COMPONENTS",
    "DEPENDENCY_002_STATUS_GAP_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_002_STATUS_GAP_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_002_STATUS_GAP_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_002_STATUS_GAP_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_002_STATUS_GAP_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_002_STATUS_GAP_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_002_STATUS_GAP_NOT_PRODUCT_READINESS",
    "DEPENDENCY_002_STATUS_GAP_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_002_STATUS_GAP_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_002_STATUS_GAP_NOT_DEPENDENCY_CLOSURE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "freezes the completed PROVE_ONLY dependency-002 audit/access-log implementation-readiness status/gap review",
    "The status/gap review is non-authorizing.",
    "The status/gap review does not authorize implementation-readiness.",
    "The status/gap review does not authorize implementation.",
    "The status/gap review does not close dependency 002.",
    "The status/gap review does not resolve blockers.",
    "The status/gap review does not create runtime behavior.",
    "The status/gap review does not create audit/access-log implementation, audit logging, access logging, event taxonomy runtime code, log schema, log storage, formal audit logging evidence, access logging evidence, CI evidence, packet components, runtime gates, validator dispatch, registry/lookup, product candidate, or external-use.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "DEPENDENCY_001_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_SPECIFICATION_CONTEXT",
    "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_CONTROLS_BLOCKER_CONTEXT",
    "DEPENDENCY_002_PROVE_ONLY_REVIEW_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "06e9cf6 docs(domain): freeze dependency-001 planning round summary boundary",
    "DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "PROVE_ONLY_DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_STATUS_GAP_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("dependency 002 scope exists", () => {
  assertIncludesAll([
    "Dependency 002 follows dependency 001 in roadmap order.",
    "Dependency 002 covers audit/access-log foundation.",
    "Dependency 002 covers audit logging implementation.",
    "Dependency 002 covers access logging implementation.",
    "Dependency 002 covers event taxonomy runtime code.",
    "Dependency 002 covers log schema.",
    "Dependency 002 covers log storage.",
    "Dependency 002 covers formal audit logging evidence.",
    "Dependency 002 covers access logging evidence.",
    "Dependency 002 covers local log boundary.",
    "Dependency 002 covers no-raw/no-private/no-source-locator event content.",
    "Dependency 002 covers prohibited event/log content.",
    "Dependency 002 covers event surfaces D002-AAL-012 through D002-AAL-025.",
    "Dependency 002 covers implementation evidence.",
    "Dependency 002 covers test evidence.",
    "Dependency 002 covers closure criteria.",
    "Dependency 002 covers non-authorization boundary.",
  ]);
});

test("dependency 002 current status exists", () => {
  assertIncludesAll([
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
    "Allowed future event content remains no-raw/no-private/no-source-locator.",
    "Prohibited event/log content remains blocked.",
    "Implementation evidence remains future evidence only.",
    "Test evidence remains future evidence only.",
    "Closure criteria are not met.",
  ]);
});

test("status/gap matrix exists with compact columns", () => {
  assertIncludesAll([
    "row ID",
    "surface",
    "current evidence level",
    "current blocker status",
    "implementation gap",
    "required implementation evidence",
    "required test evidence",
    "closure criteria",
    "what remains non-authorized until closure",
  ], matrix);
});

test("all D002-AAL-001 through D002-AAL-029 rows exist", () => {
  for (let index = 1; index <= 29; index += 1) {
    assertIncludesAll([`D002-AAL-${String(index).padStart(3, "0")}`], matrix);
  }
  assertIncludesAll([
    "audit/access-log foundation",
    "audit logging implementation",
    "access logging implementation",
    "event taxonomy runtime code",
    "log schema",
    "log storage",
    "formal audit logging evidence",
    "access logging evidence",
    "local log boundary",
    "no-raw/no-private/no-source-locator event content",
    "prohibited event/log content",
    "material intake event surface",
    "blocked/prohibited ingress event surface",
    "quarantine/block decision event surface",
    "redaction/sanitization event surface",
    "material routing event surface",
    "review access event surface",
    "manifest validation event surface",
    "export/download event surface",
    "packet/delivery promotion event surface",
    "admin/support access attempt event surface",
    "retention/deletion operation event surface",
    "third-party route denial/approval event surface",
    "runtime/schema/workflow gate candidate event surface",
    "human/professional review access event surface",
    "implementation evidence",
    "test evidence",
    "closure criteria",
    "what remains non-authorized",
  ], matrix);
});

test("matrix row posture exists", () => {
  assertIncludesAll([
    "Every row preserves blocked or future-only status.",
    "Every row preserves not currently implemented status.",
    "Every row preserves not currently closed status.",
    "Every row preserves no current runtime authorization.",
    "Every row preserves no current product/external-use authorization.",
    "Every row preserves that required implementation evidence remains future evidence.",
    "Every row preserves that required test evidence remains future evidence.",
    "Every row preserves that closure criteria do not mean closure.",
    "Every row preserves that closure requires separate tracked implementation evidence and separate tracked test evidence.",
  ]);
});

test("event content posture exists", () => {
  assertIncludesAll([
    "Allowed future event content is limited to subject reference, role/permission concept, tenant/case scope, material class, route/surface, decision status, timestamp category, reason code, and explicit no-raw/no-private/no-source-locator marker.",
    "Prohibited event/log content includes raw source text, private facts, source locators, filenames/private paths, page references, URLs/tokens, PDF/image/metadata content, sensitive personal details, legal/clinical/evidentiary/case-truth conclusions, product-candidate claims, and external-use claims.",
  ]);
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
    "Status/gap boundary does not mean implementation-readiness authorization.",
    "Status/gap boundary does not mean implementation.",
    "Status/gap row does not mean blocker closure.",
    "Audit/access-log foundation row does not mean foundation implementation.",
    "Event family candidate does not mean runtime event taxonomy exists.",
    "Log schema row does not mean log schema exists.",
    "Log storage row does not mean log storage exists.",
    "Local log boundary does not mean local logs are CI evidence.",
    "Local log boundary does not mean local logs are packet components.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Closure criteria do not mean closure.",
    "Dependency 002 status/gap suitability does not mean dependency 002 is implementation-ready.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
  assertDoesNotIncludeExactToken([
    "DOCS_ONLY_DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY",
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
    "STATUS_GAP_AUTHORIZES_IMPLEMENTATION",
    "STATUS_GAP_AUTHORIZES_RUNTIME",
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
