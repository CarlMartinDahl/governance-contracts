const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_v1.md",
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
  "## Dependency-005 Planning-Layer Matrix",
  "## Dependency 005 Current Status",
);
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_PLANNING_ROUND_SUMMARY_ONLY",
    "DEPENDENCY_005_PLANNING_ROUND_PARTIAL_GAP_CONTEXT",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_RUNTIME_READY",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_DEPENDENCY_CLOSURE",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_PROVIDER_INTEGRATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_PROVIDER_REGISTRY",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_PROVIDER_STATUS_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_DATA_ROUTING_MAP_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_PROVIDER_RETENTION_DELETION_POSTURE_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_PROVIDER_AUDITABILITY_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_LOG_SCHEMA",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_LOG_STORAGE",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_RETENTION_DELETION_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_PRODUCT_READINESS",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_005_PLANNING_ROUND_NOT_DEPENDENCY_006_SELECTION",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed dependency-005 third-party routing implementation-readiness planning round as summary/context only.",
    "It is non-authorizing, partial/gap, and does not authorize implementation-readiness, implementation, runtime behavior, dependency closure, blocker resolution, evidence creation, test creation, dependency 006, product candidate, release approval, or external-use.",
    "It does not create third-party routing implementation, third-party routing authorization, provider integration, provider registry/status implementation, data-routing map, provider retention/deletion posture, provider auditability, token/URL/secret handling, audit/access-log implementation, retention/deletion implementation, raw-material routing implementation, validator dispatch, registry/lookup, runtime gates, CI evidence, product candidate, release approval, or external-use.",
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
    "DEPENDENCY_005_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_CONTROLS_FUTURE_EVIDENCE_REQUIREMENTS",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_CONTROLS_THIRD_PARTY_BLOCKER_CONTEXT",
    "THIRD_PARTY_ROUTING_RUNTIME_READINESS_STATUS_GAP_SUMMARY_AFTER_BLOCKER_ANALYSIS_BOUNDARY_CONTROLS_THIRD_PARTY_GAP_CONTEXT",
    "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_CONTROLS_AUDIT_LOG_CONTEXT",
    "RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RETENTION_CONTEXT",
    "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RAW_ROUTING_CONTEXT",
    "RBAC_ADMIN_SUPPORT_BOUNDARIES_CONTROL_ACCESS_CONTEXT",
    "RUNTIME_GATE_INVENTORY_BOUNDARY_CONTROLS_DEFERRED_GATE_CONTEXT",
    "DEPENDENCY_005_PLANNING_ROUND_STATUS_LOCK_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "383d713 docs(domain): freeze dependency-005 third party routing evidence closure plan boundary",
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_STATUS_LOCKED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
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

test("planning-layer matrix exists", () => {
  assertIncludesAll([
    "row ID",
    "planning layer",
    "source / accepted marker",
    "current status",
    "what it proves",
    "what it does not prove",
    "what remains non-authorized",
    "Every row preserves partial/gap posture where applicable, non-authorizing status, no implementation-readiness authorization, no implementation, no runtime behavior, no dependency closure, no blocker resolution, no provider integration, no route authorization, no product/external-use authorization, and no dependency 006 selection.",
  ], matrix);
});

test("all D005-PLAN-001 through D005-PLAN-005 rows exist", () => {
  assertIncludesAll([
    "D005-PLAN-001",
    "D005-PLAN-002",
    "D005-PLAN-003",
    "D005-PLAN-004",
    "D005-PLAN-005",
  ], matrix);
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
    "RBAC/admin-support, audit/access-log, retention/deletion, raw-material routing, third-party/provider dependencies remain unresolved.",
    "Validator dispatch, registry/lookup, runtime gate inventory, and CI evidence remain absent/deferred.",
    "Third-party routing authorization remains absent.",
    "Provider integration remains absent.",
    "Provider registry/status implementation remains absent.",
    "Data-routing map remains absent.",
    "Provider retention/deletion posture remains absent.",
    "Provider auditability remains absent/not evidenced.",
    "Provider token/URL/secret handling remains unresolved.",
    "Token/URL/secret handling implementation remains absent.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "Closure criteria are not met.",
    "Closure criteria do not mean closure.",
    "Dependency 006 was not selected by dependency-005 planning-round status lock.",
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
    "No closure is created by dependency-005 planning round.",
    "Closure requires separate tracked implementation evidence.",
    "Closure requires separate tracked test evidence.",
    "Closure requires separate future explicit authorization.",
  ]);
});

test("dependency links/evidence limits exist", () => {
  assertIncludesAll([
    "Upstream dependency 001 remains not closed.",
    "Upstream dependency 002 remains not closed.",
    "Upstream dependency 003 remains not closed.",
    "Upstream dependency 004 remains not closed.",
    "RBAC/admin-support implementation remains absent.",
    "Audit/access-log implementation remains absent.",
    "Retention/deletion implementation remains absent.",
    "Raw-material routing implementation remains absent.",
    "Third-party routing unauthorized.",
    "Provider integration absent.",
    "Provider registry/status implementation absent.",
    "Data-routing map absent.",
    "Provider token/URL/secret handling unresolved.",
    "Validator dispatch not created.",
    "Registry/lookup not created.",
    "Runtime gate inventory deferred.",
    "CI evidence not created.",
    "Local logs remain not CI evidence.",
    "Human/professional review remains release gate.",
    "Tests are tested-scenario evidence, not runtime certainty.",
    "Green tests are not release approval.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "Prompt/workflow controls are not runtime enforcement.",
    "Route/case/capability evidence is not full RBAC/access-control.",
    "Route/case/capability evidence is not admin/support access-control.",
    "Route/case/capability evidence is not global authorization model.",
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
    "This boundary creates no provider registry/status.",
    "This boundary creates no data-routing map.",
    "This boundary creates no provider retention/deletion posture.",
    "This boundary creates no provider auditability.",
    "This boundary creates no token/URL/secret handling.",
    "This boundary creates no audit/access-log implementation.",
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
    "This boundary creates no dependency 006 selection.",
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
    "Planning-round summary does not select dependency 006.",
    "Partial/gap planning round does not mean closure.",
    "Evidence plan does not mean evidence exists.",
    "Closure plan does not mean closure.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Dependency 005 planning completion does not mean dependency 005 is implementation-ready.",
    "Third-party routing plan does not mean third-party routing implementation.",
    "Third-party routing plan does not mean third-party routing authorization.",
    "Provider registry plan does not mean provider registry exists.",
    "Provider status plan does not mean provider status implementation exists.",
    "Data-routing map plan does not mean data-routing map exists.",
    "Token/URL/secret handling plan does not mean token/URL/secret handling implementation exists.",
    "Local log boundary does not mean local logs are CI evidence.",
    "Product candidate row does not mean product candidate selected.",
    "External-use row does not mean external-use authorized.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "REVIEW_ONLY_DEPENDENCY_006_VALIDATOR_REGISTRY_RUNTIME_GATE_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_AFTER_DEPENDENCY_005_PLANNING_ROUND_SUMMARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("overclaiming exact tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "DEPENDENCY_005_IMPLEMENTATION_READY",
    "DEPENDENCY_005_READY_FOR_IMPLEMENTATION",
    "DEPENDENCY_005_IMPLEMENTED",
    "DEPENDENCY_005_CLOSED",
    "DEPENDENCY_005_BLOCKER_RESOLVED",
    "PLANNING_ROUND_AUTHORIZES_IMPLEMENTATION",
    "PLANNING_ROUND_AUTHORIZES_RUNTIME",
    "PLANNING_ROUND_CREATES_CLOSURE",
    "PLANNING_ROUND_SELECTS_DEPENDENCY_006",
    "EVIDENCE_PLAN_AUTHORIZES_IMPLEMENTATION",
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
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "RUNTIME_GATE_IMPLEMENTED",
    "CI_EVIDENCE_CREATED",
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
