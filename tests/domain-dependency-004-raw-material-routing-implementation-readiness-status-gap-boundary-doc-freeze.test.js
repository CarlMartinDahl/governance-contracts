const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY_v1.md",
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

const matrix = sectionBetween("## Dependency 004 Status/Gap Matrix", "## Matrix Row Posture");
const recommendations = sectionBetween("## Recommended Smallest Safe Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_STATUS_GAP_ONLY",
    "DEPENDENCY_004_STATUS_GAP_PARTIAL_GAP",
    "DEPENDENCY_004_STATUS_GAP_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_004_STATUS_GAP_NOT_IMPLEMENTATION",
    "DEPENDENCY_004_STATUS_GAP_NOT_RUNTIME_READY",
    "DEPENDENCY_004_STATUS_GAP_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_004_STATUS_GAP_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_004_STATUS_GAP_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "DEPENDENCY_004_STATUS_GAP_NOT_SOURCE_PACKAGE_INSPECTION",
    "DEPENDENCY_004_STATUS_GAP_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "DEPENDENCY_004_STATUS_GAP_NOT_METADATA_ACQUISITION",
    "DEPENDENCY_004_STATUS_GAP_NOT_DENY_QUARANTINE_RUNTIME_ENFORCEMENT",
    "DEPENDENCY_004_STATUS_GAP_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION_EVIDENCE",
    "DEPENDENCY_004_STATUS_GAP_NOT_RAW_MATERIAL_ROUTING_TEST_EVIDENCE",
    "DEPENDENCY_004_STATUS_GAP_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_004_STATUS_GAP_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "DEPENDENCY_004_STATUS_GAP_NOT_LOG_SCHEMA",
    "DEPENDENCY_004_STATUS_GAP_NOT_LOG_STORAGE",
    "DEPENDENCY_004_STATUS_GAP_NOT_RETENTION_DELETION_IMPLEMENTATION",
    "DEPENDENCY_004_STATUS_GAP_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_004_STATUS_GAP_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "DEPENDENCY_004_STATUS_GAP_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_004_STATUS_GAP_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_004_STATUS_GAP_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_004_STATUS_GAP_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_004_STATUS_GAP_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_004_STATUS_GAP_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_004_STATUS_GAP_NOT_PRODUCT_READINESS",
    "DEPENDENCY_004_STATUS_GAP_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_004_STATUS_GAP_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_004_STATUS_GAP_NOT_DEPENDENCY_CLOSURE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "freezes the completed PROVE_ONLY dependency-004 raw-material routing implementation-readiness status/gap review",
    "The status/gap review is non-authorizing.",
    "The status/gap review is partial/gap.",
    "The status/gap review does not authorize implementation-readiness.",
    "The status/gap review does not authorize implementation.",
    "The status/gap review does not close dependency 004.",
    "The status/gap review does not resolve blockers.",
    "The status/gap review does not create runtime behavior.",
    "The status/gap review does not create raw-material routing implementation, material inspection, metadata acquisition, deny/quarantine runtime enforcement, implementation evidence, test evidence, CI evidence, runtime gates, validator dispatch, registry/lookup, product candidate, release approval, or external-use.",
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
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY_CONTROLS_FEASIBILITY_CONTEXT",
    "SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY_CONTROLS_SCOPE_CONTEXT",
    "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_SPECIFICATION_CONTEXT",
    "DEPENDENCY_004_PROVE_ONLY_REVIEW_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "4c03849 docs(domain): freeze dependency-003 retention deletion planning round summary boundary",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "PROVE_ONLY_DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_STATUS_GAP_REVIEWED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("dependency 004 scope exists", () => {
  assertIncludesAll([
    "Dependency 004 follows dependency 003 in roadmap order.",
    "Dependency 004 covers raw-material routing controls.",
    "Dependency 004 covers raw-material routing implementation.",
    "Dependency 004 covers raw/private/source material handling.",
    "Dependency 004 covers source package handling.",
    "Dependency 004 covers PDF/image/screenshot/metadata handling.",
    "Dependency 004 covers metadata acquisition boundary.",
    "Dependency 004 covers deny/quarantine posture.",
    "Dependency 004 covers no-raw/no-private/no-source-locator routing posture.",
    "Dependency 004 covers material-class routing matrix.",
    "Dependency 004 covers sanitized text material route.",
    "Dependency 004 covers redacted review signal material route.",
    "Dependency 004 covers no-raw metadata manifest material route.",
    "Dependency 004 covers generated/export artifact material route.",
    "Dependency 004 covers local log/test transcript material route.",
    "Dependency 004 covers raw private source material route.",
    "Dependency 004 covers source package material route.",
    "Dependency 004 covers PDF/image/screenshot/metadata material route.",
    "Dependency 004 covers third-party model/API routed material route.",
    "Dependency 004 covers human/professional review-only material route.",
    "Dependency 004 covers implementation evidence.",
    "Dependency 004 covers test evidence.",
    "Dependency 004 covers closure criteria.",
    "Dependency 004 covers non-authorization boundary.",
  ]);
});

test("dependency 004 current status exists", () => {
  assertIncludesAll([
    "Dependency 004 remains blocked.",
    "Dependency 004 remains not implemented.",
    "Dependency 004 remains not closed.",
    "Dependency 004 has no tracked implementation closure evidence.",
    "Dependency 004 has no tracked test closure evidence.",
    "Upstream dependency 001 remains not closed and must not be treated as closure.",
    "Upstream dependency 002 remains not closed and must not be treated as closure.",
    "Upstream dependency 003 remains not closed and must not be treated as closure.",
    "RBAC/admin-support dependencies are identified but unresolved.",
    "Audit/access-log dependencies are identified but unresolved.",
    "Retention/deletion dependencies are identified but unresolved.",
    "Third-party/provider dependencies are identified but unresolved.",
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

test("all D004-RMR-001 through D004-RMR-029 rows exist", () => {
  for (let index = 1; index <= 29; index += 1) {
    assertIncludesAll([`D004-RMR-${String(index).padStart(3, "0")}`], matrix);
  }
  assertIncludesAll([
    "raw-material routing controls",
    "routing implementation",
    "raw/private/source handling",
    "source packages",
    "PDF/image/screenshot/metadata",
    "metadata acquisition",
    "deny/quarantine",
    "no-raw/no-private/no-locator routing",
    "material-class matrix",
    "sanitized text route",
    "redacted review signal",
    "no-raw metadata manifest",
    "generated/export artifact",
    "local log/test transcript",
    "raw private source route",
    "source package route",
    "PDF/image/screenshot/metadata route",
    "third-party/API route",
    "human/professional review-only",
    "audit/access-log dependency",
    "RBAC/admin-support dependency",
    "retention/deletion dependency",
    "third-party/provider dependency",
    "validator/registry/runtime gate",
    "CI evidence",
    "implementation evidence",
    "test evidence",
    "closure criteria",
    "non-authorization boundary",
  ], matrix);
});

test("matrix row posture exists", () => {
  assertIncludesAll([
    "Every row preserves blocked or future-only status.",
    "Every row preserves partial/gap posture where applicable.",
    "Every row preserves not currently implemented status.",
    "Every row preserves not currently closed status.",
    "Every row preserves no current runtime authorization.",
    "Every row preserves no current product/external-use authorization.",
    "Every row preserves no current implementation-readiness authorization.",
    "Every row preserves no raw/private/source inspection.",
    "Every row preserves no source package inspection.",
    "Every row preserves no PDF/image/screenshot/metadata inspection.",
    "Every row preserves no metadata acquisition.",
    "Every row preserves no deny/quarantine runtime enforcement.",
    "Every row preserves that required implementation evidence remains future evidence.",
    "Every row preserves that required test evidence remains future evidence.",
    "Every row preserves that closure criteria do not mean closure.",
    "Every row preserves that closure requires separate tracked implementation evidence and separate tracked test evidence.",
    "Every row preserves that upstream dependencies 001, 002, and 003 remain not closed.",
  ]);
});

test("required implementation evidence definition exists", () => {
  assertIncludesAll([
    "Future implementation evidence would need, at minimum:",
    "tracked implementation diff",
    "scoped implementation rationale",
    "explicit affected and non-affected surfaces",
    "material-class routing control path",
    "deny/quarantine control path",
    "no-raw/no-private/no-source-locator route policy",
    "raw/private/source deny/quarantine boundary",
    "source package deny/quarantine boundary",
    "PDF/image/screenshot/metadata deny/acquisition boundary",
    "metadata acquisition contract if introduced",
    "sanitized text route evidence",
    "redacted review signal route evidence",
    "no-raw metadata manifest route evidence",
    "generated/export artifact route evidence",
    "local log/test transcript classification route evidence",
    "third-party/API no-route or provider-route policy evidence",
    "human/professional review-only route preservation",
    "RBAC/admin-support dependency evidence",
    "audit/access-log dependency evidence",
    "retention/deletion dependency evidence",
    "third-party/provider dependency evidence",
    "validator dispatch / registry lookup / runtime gate evidence only if separately authorized",
    "rollback/fail-closed posture",
    "human/professional review preservation",
    "None of this evidence exists yet for dependency 004 closure.",
  ]);
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
    "RBAC/admin-support authorization and bypass-prevention tests",
    "retention/deletion lifecycle dependency tests",
    "third-party/provider no-route/raw-denial tests",
    "validator dispatch / registry lookup / runtime gate tests only if separately authorized",
    "CI evidence only if CI is claimed",
    "no-release/no-product/no-external-use overclaim tests",
    "None of this test evidence exists yet for dependency 004 closure.",
  ]);
});

test("dependency links exist", () => {
  assertIncludesAll([
    "Upstream dependency 001 remains not closed.",
    "Upstream dependency 002 remains not closed.",
    "Upstream dependency 003 remains not closed.",
    "RBAC/admin-support implementation remains absent.",
    "Audit/access-log implementation remains absent.",
    "Audit logging/access logging remain not implemented.",
    "Event taxonomy runtime code remains absent.",
    "Log schema remains absent.",
    "Log storage remains absent.",
    "Retention/deletion implementation remains absent.",
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
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no raw/private/source inspection.",
    "This boundary creates no source package inspection.",
    "This boundary creates no PDF/image/screenshot/metadata inspection.",
    "This boundary creates no metadata acquisition.",
    "This boundary creates no deny/quarantine runtime enforcement.",
    "This boundary creates no raw-material routing implementation evidence.",
    "This boundary creates no raw-material routing test evidence.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no audit logging implementation.",
    "This boundary creates no access logging implementation.",
    "This boundary creates no event taxonomy runtime code.",
    "This boundary creates no log schema.",
    "This boundary creates no log storage.",
    "This boundary creates no retention/deletion implementation.",
    "This boundary creates no third-party routing implementation or authorization.",
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
    "Status/gap boundary does not mean implementation-readiness authorization.",
    "Status/gap boundary does not mean implementation.",
    "Status/gap row does not mean blocker closure.",
    "Partial/gap review does not mean dependency closure.",
    "Raw-material routing spec row does not mean raw-material routing implementation.",
    "Material-class row does not mean material-class runtime enforcement.",
    "Deny/quarantine row does not mean deny/quarantine runtime enforcement.",
    "No-raw/no-private/no-source-locator row does not mean runtime route policy exists.",
    "Raw/private/source row does not mean raw/private/source inspection is authorized.",
    "Source package row does not mean source package inspection is authorized.",
    "PDF/image/screenshot/metadata row does not mean inspection is authorized.",
    "Metadata acquisition row does not mean metadata acquisition is authorized.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Closure criteria do not mean closure.",
    "Dependency 004 status/gap suitability does not mean dependency 004 is implementation-ready.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY",
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
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "DENY_QUARANTINE_RUNTIME_ENFORCEMENT_CREATED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTATION_EVIDENCE_CREATED",
    "RAW_MATERIAL_ROUTING_TEST_EVIDENCE_CREATED",
    "STATUS_GAP_AUTHORIZES_IMPLEMENTATION",
    "STATUS_GAP_AUTHORIZES_RUNTIME",
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
