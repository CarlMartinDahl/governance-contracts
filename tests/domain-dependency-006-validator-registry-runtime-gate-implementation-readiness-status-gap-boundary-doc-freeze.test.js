const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_006_VALIDATOR_REGISTRY_RUNTIME_GATE_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY_v1.md",
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

const matrix = sectionBetween("## Dependency 006 Status/Gap Matrix", "## Matrix Row Posture");
const recommendations = sectionBetween("## Recommended Smallest Safe Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_006_VALIDATOR_REGISTRY_RUNTIME_GATE_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_006_VALIDATOR_REGISTRY_RUNTIME_GATE_STATUS_GAP_ONLY",
    "DEPENDENCY_006_STATUS_GAP_PARTIAL_GAP",
    "DEPENDENCY_006_STATUS_GAP_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_RUNTIME_READY",
    "DEPENDENCY_006_STATUS_GAP_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_006_STATUS_GAP_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_006_STATUS_GAP_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_006_STATUS_GAP_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_SCHEMA_VALIDATOR_GATE_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "DEPENDENCY_006_STATUS_GAP_NOT_WORKFLOW_GATE_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_WORKFLOW_ENFORCEMENT",
    "DEPENDENCY_006_STATUS_GAP_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "DEPENDENCY_006_STATUS_GAP_NOT_LOG_SCHEMA",
    "DEPENDENCY_006_STATUS_GAP_NOT_LOG_STORAGE",
    "DEPENDENCY_006_STATUS_GAP_NOT_RETENTION_DELETION_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_PROVIDER_INTEGRATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_PROVIDER_REGISTRY",
    "DEPENDENCY_006_STATUS_GAP_NOT_DATA_ROUTING_MAP_IMPLEMENTATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "DEPENDENCY_006_STATUS_GAP_NOT_SOURCE_PACKAGE_INSPECTION",
    "DEPENDENCY_006_STATUS_GAP_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "DEPENDENCY_006_STATUS_GAP_NOT_METADATA_ACQUISITION",
    "DEPENDENCY_006_STATUS_GAP_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_006_STATUS_GAP_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_TECHNICAL_SIGN_OFF",
    "DEPENDENCY_006_STATUS_GAP_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "DEPENDENCY_006_STATUS_GAP_NOT_PRODUCT_READINESS",
    "DEPENDENCY_006_STATUS_GAP_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_006_STATUS_GAP_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_006_STATUS_GAP_NOT_DEPENDENCY_CLOSURE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "freezes the completed PROVE_ONLY dependency-006 validator/registry/runtime-gate implementation-readiness status/gap review",
    "The status/gap review is non-authorizing.",
    "The status/gap review is partial/gap.",
    "The status/gap review does not authorize implementation-readiness.",
    "The status/gap review does not authorize implementation.",
    "The status/gap review does not close dependency 006.",
    "The status/gap review does not resolve blockers.",
    "The status/gap review does not create runtime behavior.",
    "The status/gap review does not create validator dispatch, registry/lookup, runtime gate implementation, runtime gate inventory as implementation, schema/validator enforcement, workflow enforcement, implementation evidence, test evidence, CI evidence, product candidate, release approval, or external-use.",
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
    "DEPENDENCY_005_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_CONTROLS_DEFERRED_GATE_CONTEXT",
    "RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_CONTROLS_GATE_CANDIDATE_CONTEXT",
    "RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY_CONTROLS_RBAC_GATE_CONTEXT",
    "RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RBAC_CONTEXT",
    "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_CONTROLS_AUDIT_LOG_CONTEXT",
    "RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RETENTION_CONTEXT",
    "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RAW_ROUTING_CONTEXT",
    "THIRD_PARTY_ROUTING_STATUS_GAP_BOUNDARY_CONTROLS_PROVIDER_CONTEXT",
    "ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_CONTROLS_ADMIN_SUPPORT_CONTEXT",
    "DEPENDENCY_006_PROVE_ONLY_REVIEW_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "7e40521 docs(domain): freeze dependency-005 third party routing planning round summary boundary",
    "DEPENDENCY_006_VALIDATOR_REGISTRY_RUNTIME_GATE_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "PROVE_ONLY_DEPENDENCY_006_VALIDATOR_REGISTRY_RUNTIME_GATE_IMPLEMENTATION_READINESS_STATUS_GAP_REVIEWED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("dependency 006 scope exists", () => {
  assertIncludesAll([
    "Dependency 006 follows dependency 005 in roadmap order.",
    "Dependency 006 covers validator dispatch.",
    "Dependency 006 covers registry/lookup.",
    "Dependency 006 covers runtime gate candidates.",
    "Dependency 006 covers schema/validator gate candidates.",
    "Dependency 006 covers workflow/prompt gate candidates.",
    "Dependency 006 covers human/professional review gate candidates.",
    "Dependency 006 covers runtime gate inventory.",
    "Dependency 006 covers runtime gate inventory as not implementation.",
    "Dependency 006 covers RBAC gate-candidate linkage.",
    "Dependency 006 covers role/permission model gate linkage.",
    "Dependency 006 covers audit/access-log event dependency.",
    "Dependency 006 covers retention/deletion dependency.",
    "Dependency 006 covers raw-material routing dependency.",
    "Dependency 006 covers third-party routing/provider dependency.",
    "Dependency 006 covers no-raw/no-private/no-source-locator route/event posture.",
    "Dependency 006 covers material-class gate posture.",
    "Dependency 006 covers wrong-tenant gate posture.",
    "Dependency 006 covers wrong-case gate posture.",
    "Dependency 006 covers wrong-object gate posture.",
    "Dependency 006 covers wrong-function gate posture.",
    "Dependency 006 covers wrong-property gate posture.",
    "Dependency 006 covers validator dispatch implementation evidence.",
    "Dependency 006 covers registry/lookup implementation evidence.",
    "Dependency 006 covers runtime gate implementation evidence.",
    "Dependency 006 covers schema/validator implementation evidence.",
    "Dependency 006 covers workflow gate implementation evidence.",
    "Dependency 006 covers test evidence.",
    "Dependency 006 covers closure criteria.",
    "Dependency 006 covers non-authorization boundary.",
  ]);
});

test("dependency 006 current status exists", () => {
  assertIncludesAll([
    "Dependency 006 remains blocked.",
    "Dependency 006 remains not implemented.",
    "Dependency 006 remains not closed.",
    "Dependency 006 has no tracked implementation closure evidence.",
    "Dependency 006 has no tracked test closure evidence.",
    "Upstream dependency 001 remains not closed and must not be treated as closure.",
    "Upstream dependency 002 remains not closed and must not be treated as closure.",
    "Upstream dependency 003 remains not closed and must not be treated as closure.",
    "Upstream dependency 004 remains not closed and must not be treated as closure.",
    "Upstream dependency 005 remains not closed and must not be treated as closure.",
    "RBAC/admin-support dependencies are identified but unresolved.",
    "Audit/access-log dependencies are identified but unresolved.",
    "Retention/deletion dependencies are identified but unresolved.",
    "Raw-material routing dependencies are identified but unresolved/not implemented.",
    "Third-party/provider dependencies are identified but unresolved/not implemented/unauthorized.",
    "Validator dispatch remains not created.",
    "Registry/lookup remains not created.",
    "Runtime gate inventory remains deferred and not implementation.",
    "Runtime gate implementation remains absent.",
    "Schema/validator gate implementation remains absent.",
    "Workflow gate implementation remains absent.",
    "CI evidence remains not created.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "Human/professional review remains release gate.",
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

test("all D006-VRG-001 through D006-VRG-029 rows exist", () => {
  for (let index = 1; index <= 29; index += 1) {
    assertIncludesAll([`D006-VRG-${String(index).padStart(3, "0")}`], matrix);
  }
  assertIncludesAll([
    "validator dispatch",
    "registry/lookup",
    "runtime gate candidates",
    "schema/validator gate candidates",
    "workflow/prompt gate candidates",
    "human/professional review gate candidates",
    "runtime gate inventory",
    "runtime gate inventory as not implementation",
    "RBAC gate-candidate linkage",
    "role/permission model gate linkage",
    "audit/access-log event dependency",
    "retention/deletion dependency",
    "raw-material routing dependency",
    "third-party routing/provider dependency",
    "no-raw/no-private/no-source-locator route/event posture",
    "material-class gate posture",
    "wrong-tenant gate posture",
    "wrong-case gate posture",
    "wrong-object gate posture",
    "wrong-function gate posture",
    "wrong-property gate posture",
    "validator dispatch implementation evidence",
    "registry/lookup implementation evidence",
    "runtime gate implementation evidence",
    "schema/validator implementation evidence",
    "workflow gate implementation evidence",
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
    "Every row preserves no current implementation-readiness authorization.",
    "Every row preserves no validator dispatch.",
    "Every row preserves no registry/lookup.",
    "Every row preserves no runtime gate implementation.",
    "Every row preserves no runtime gate inventory as implementation.",
    "Every row preserves no schema/validator gate implementation.",
    "Every row preserves no schema/validator enforcement.",
    "Every row preserves no workflow gate implementation.",
    "Every row preserves no workflow enforcement.",
    "Every row preserves that required implementation evidence remains future evidence.",
    "Every row preserves that required test evidence remains future evidence.",
    "Every row preserves that closure criteria do not mean closure.",
    "Every row preserves that closure requires separate tracked implementation evidence and separate tracked test evidence.",
    "Every row preserves that upstream dependencies 001, 002, 003, 004, and 005 remain not closed.",
  ]);
});

test("required implementation evidence definition exists", () => {
  assertIncludesAll([
    "Future implementation evidence would need, at minimum:",
    "tracked implementation diff",
    "scoped implementation rationale",
    "explicit affected and non-affected surfaces",
    "validator dispatch design and implementation",
    "registry/lookup contract and implementation",
    "runtime gate implementation evidence",
    "schema/validator gate implementation evidence",
    "workflow gate implementation evidence",
    "runtime gate inventory update only if separately authorized",
    "runtime gate inventory not as implementation unless implementation exists",
    "RBAC gate-candidate linkage evidence",
    "role/permission model linkage evidence",
    "audit/access-log event dependency evidence",
    "retention/deletion dependency evidence",
    "raw-material routing dependency evidence",
    "third-party/provider dependency evidence",
    "no-raw/no-private/no-source-locator route/event controls",
    "material-class gate controls",
    "wrong-tenant gate controls",
    "wrong-case gate controls",
    "wrong-object gate controls",
    "wrong-function gate controls",
    "wrong-property gate controls",
    "fail-closed dispatch posture",
    "rollback/fail-closed posture",
    "human/professional review preservation",
    "None of this evidence exists yet for dependency 006 closure.",
  ]);
});

test("required test evidence definition exists", () => {
  assertIncludesAll([
    "Future test evidence would need, at minimum:",
    "validator dispatch allow/deny tests",
    "registry/lookup allow/deny and wrong-scope tests",
    "runtime gate allow/deny tests",
    "schema/validator gate tests",
    "workflow gate tests",
    "no-runtime-inventory-as-implementation overclaim tests",
    "RBAC gate-candidate linkage tests",
    "role/permission linkage tests",
    "audit/access-log no-payload event tests",
    "retention/deletion dependency tests",
    "raw-material routing dependency tests",
    "third-party/provider dependency tests",
    "no-raw/no-private/no-source-locator leakage tests",
    "material-class gate tests",
    "wrong-tenant tests",
    "wrong-case tests",
    "wrong-object tests",
    "wrong-function tests",
    "wrong-property tests",
    "CI evidence only if CI is claimed",
    "no-release/no-product/no-external-use overclaim tests",
    "None of this test evidence exists yet for dependency 006 closure.",
  ]);
});

test("dependency links exist", () => {
  assertIncludesAll([
    "Upstream dependency 001 remains not closed.",
    "Upstream dependency 002 remains not closed.",
    "Upstream dependency 003 remains not closed.",
    "Upstream dependency 004 remains not closed.",
    "Upstream dependency 005 remains not closed.",
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
    "Runtime gate inventory is not implementation.",
    "Schema/validator gate candidate is not schema enforcement.",
    "Workflow/prompt gate candidate is not workflow enforcement.",
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
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no runtime gate implementation.",
    "This boundary creates no runtime gate inventory as implementation.",
    "This boundary creates no schema validator gate implementation.",
    "This boundary creates no schema validator enforcement.",
    "This boundary creates no workflow gate implementation.",
    "This boundary creates no workflow enforcement.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no audit logging implementation.",
    "This boundary creates no access logging implementation.",
    "This boundary creates no event taxonomy runtime code.",
    "This boundary creates no log schema.",
    "This boundary creates no log storage.",
    "This boundary creates no retention/deletion implementation.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no third-party routing implementation or authorization.",
    "This boundary creates no provider integration.",
    "This boundary creates no provider registry.",
    "This boundary creates no data-routing map implementation.",
    "This boundary creates no raw/private/source inspection.",
    "This boundary creates no source package inspection.",
    "This boundary creates no PDF/image/screenshot/metadata inspection.",
    "This boundary creates no metadata acquisition.",
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
    "Validator dispatch row does not mean validator dispatch exists.",
    "Registry/lookup row does not mean registry/lookup exists.",
    "Runtime gate row does not mean runtime gate implementation exists.",
    "Runtime gate inventory row does not mean runtime gate inventory is implementation.",
    "Schema/validator gate row does not mean schema enforcement exists.",
    "Workflow/prompt gate row does not mean workflow enforcement exists.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Closure criteria do not mean closure.",
    "Dependency 006 status/gap suitability does not mean dependency 006 is implementation-ready.",
    "Product candidate row does not mean product candidate selected.",
    "External-use row does not mean external-use authorized.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_006_VALIDATOR_REGISTRY_RUNTIME_GATE_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("forbidden exact overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "DEPENDENCY_006_IMPLEMENTATION_READY",
    "DEPENDENCY_006_READY_FOR_IMPLEMENTATION",
    "DEPENDENCY_006_IMPLEMENTED",
    "DEPENDENCY_006_CLOSED",
    "DEPENDENCY_006_BLOCKER_RESOLVED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION_CREATED",
    "SCHEMA_VALIDATOR_GATE_IMPLEMENTED",
    "SCHEMA_VALIDATOR_ENFORCEMENT_CREATED",
    "WORKFLOW_GATE_IMPLEMENTED",
    "WORKFLOW_ENFORCEMENT_CREATED",
    "STATUS_GAP_AUTHORIZES_IMPLEMENTATION",
    "STATUS_GAP_AUTHORIZES_RUNTIME",
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_AUTHORIZED",
    "RUNTIME_READY",
    "MODEL_RUNTIME_READY",
    "MODEL_COMPLETE",
    "MODEL_COMPLETION_READY",
    "RBAC_ACCESS_CONTROL_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "RETENTION_DELETION_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "PROVIDER_INTEGRATION_CREATED",
    "PROVIDER_REGISTRY_CREATED",
    "DATA_ROUTING_MAP_CREATED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
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
