const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY_v1.md",
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

const matrix = sectionBetween("## Dependency 001 Status/Gap Matrix", "## Matrix Row Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_001_IMPLEMENTATION_READINESS_STATUS_GAP_ONLY",
    "DEPENDENCY_001_STATUS_GAP_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_001_STATUS_GAP_NOT_IMPLEMENTATION",
    "DEPENDENCY_001_STATUS_GAP_NOT_RUNTIME_READY",
    "DEPENDENCY_001_STATUS_GAP_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_001_STATUS_GAP_NOT_ROLE_FIELDS",
    "DEPENDENCY_001_STATUS_GAP_NOT_PERMISSION_FIELDS",
    "DEPENDENCY_001_STATUS_GAP_NOT_ROLE_SCHEMA",
    "DEPENDENCY_001_STATUS_GAP_NOT_PERMISSION_SCHEMA",
    "DEPENDENCY_001_STATUS_GAP_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "DEPENDENCY_001_STATUS_GAP_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_001_STATUS_GAP_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_001_STATUS_GAP_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_001_STATUS_GAP_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_001_STATUS_GAP_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_001_STATUS_GAP_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_001_STATUS_GAP_NOT_PRODUCT_READINESS",
    "DEPENDENCY_001_STATUS_GAP_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_001_STATUS_GAP_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_001_STATUS_GAP_NOT_DEPENDENCY_CLOSURE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "freezes the completed PROVE_ONLY dependency-001 implementation-readiness status/gap review",
    "The status/gap review is non-authorizing.",
    "The status/gap review does not authorize implementation-readiness.",
    "The status/gap review does not authorize implementation.",
    "The status/gap review does not close dependency 001.",
    "The status/gap review does not resolve blockers.",
    "The status/gap review does not create runtime behavior.",
    "The status/gap review does not create role fields, permission fields, schemas, admin/support model, admin/support routes, admin/support auth fields, DB fields, tests, runtime gates, validator dispatch, registry/lookup, CI evidence, product candidate, or external-use.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "DEPENDENCY_001_PROVE_ONLY_REVIEW_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "429f4e0 docs(domain): freeze implementation-readiness entry criteria boundary",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "PROVE_ONLY_DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_STATUS_GAP_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("dependency 001 scope exists", () => {
  assertIncludesAll([
    "Dependency 001 is first in roadmap order.",
    "Dependency 001 covers complete global access-control threat model.",
    "Dependency 001 covers global access-control model/implementation.",
    "Dependency 001 covers RBAC / role-permission model.",
    "Dependency 001 covers role fields.",
    "Dependency 001 covers permission fields.",
    "Dependency 001 covers role schema.",
    "Dependency 001 covers permission schema.",
    "Dependency 001 covers admin/support model.",
    "Dependency 001 covers admin/support auth fields.",
    "Dependency 001 covers admin/support routes.",
    "Dependency 001 covers admin/support DB fields.",
    "Dependency 001 covers admin/support allowed/denied tests.",
    "Dependency 001 covers admin/support bypass-prevention tests.",
    "Dependency 001 covers implementation evidence.",
    "Dependency 001 covers test evidence.",
    "Dependency 001 covers closure criteria.",
    "Dependency 001 covers non-authorization boundary.",
  ]);
});

test("dependency 001 current status exists", () => {
  assertIncludesAll([
    "Dependency 001 remains blocked.",
    "Dependency 001 remains not implemented.",
    "Dependency 001 remains not closed.",
    "Dependency 001 has no tracked implementation closure evidence.",
    "Dependency 001 has no tracked test closure evidence.",
    "Complete global access-control threat model remains partial/not evidenced.",
    "Global access-control model/implementation remains absent.",
    "RBAC/access-control implementation remains absent.",
    "Role fields remain absent.",
    "Permission fields remain absent.",
    "Role schema remains absent.",
    "Permission schema remains absent.",
    "Admin/support model remains absent.",
    "Admin/support auth fields remain absent.",
    "Admin/support routes remain absent.",
    "Admin/support DB fields remain absent.",
    "Admin/support allowed/denied tests remain absent.",
    "Admin/support bypass-prevention tests remain absent.",
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

test("all D001 rows exist", () => {
  assertIncludesAll([
    "D001-GAC-001",
    "D001-GAC-002",
    "D001-RBAC-001",
    "D001-RBAC-002",
    "D001-RBAC-003",
    "D001-RBAC-004",
    "D001-RBAC-005",
    "D001-ADMIN-001",
    "D001-ADMIN-002",
    "D001-ADMIN-003",
    "D001-ADMIN-004",
    "D001-ADMIN-005",
    "D001-ADMIN-006",
    "D001-EVIDENCE-001",
    "D001-EVIDENCE-002",
    "D001-CLOSURE-001",
    "D001-NONAUTH-001",
  ], matrix);
});

test("matrix row posture exists", () => {
  assertIncludesAll([
    "Every row preserves blocked or future-only status.",
    "Every row preserves not currently implemented status.",
    "Every row preserves no current runtime authorization.",
    "Every row preserves no current product/external-use authorization.",
    "Every row preserves that required implementation evidence remains future evidence.",
    "Every row preserves that required test evidence remains future evidence.",
    "Every row preserves that closure criteria do not mean closure.",
    "Every row preserves that closure requires separate tracked implementation evidence and separate tracked test evidence.",
  ]);
});

test("dependency links exist", () => {
  assertIncludesAll([
    "Audit/access-log implementation remains absent.",
    "Event taxonomy runtime code remains absent.",
    "Log schema/storage remains absent.",
    "Retention/deletion implementation remains absent.",
    "Raw-material routing implementation remains absent.",
    "Third-party routing remains unauthorized.",
    "Validator dispatch remains not created.",
    "Registry/lookup remains not created.",
    "Runtime gate inventory remains deferred.",
  ]);
});

test("evidence limits exist", () => {
  assertIncludesAll([
    "Tests are tested-scenario evidence, not runtime certainty.",
    "Green tests are not release approval.",
    "Local logs are not CI evidence.",
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
    "This boundary creates no global access-control implementation.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no role fields.",
    "This boundary creates no permission fields.",
    "This boundary creates no role schema.",
    "This boundary creates no permission schema.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no admin/support model.",
    "This boundary creates no admin/support auth fields.",
    "This boundary creates no admin/support routes.",
    "This boundary creates no admin/support DB fields.",
    "This boundary creates no admin/support allowed/denied tests.",
    "This boundary creates no admin/support bypass-prevention tests.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no event taxonomy runtime code.",
    "This boundary creates no log schema/storage.",
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
    "Implementation gap does not mean implementation exists.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Closure criteria do not mean closure.",
    "Dependency 001 status/gap suitability does not mean dependency 001 is implementation-ready.",
    "Route/case/capability evidence does not mean full RBAC/access-control.",
    "Admin/support gap row does not mean admin/support access exists.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ]);
  assert.doesNotMatch(doc, /DOCS_ONLY_DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY/);
});

test("forbidden exact overclaiming tokens do not appear", () => {
  assertDoesNotIncludeExactToken([
    "DEPENDENCY_001_IMPLEMENTATION_READY",
    "DEPENDENCY_001_READY_FOR_IMPLEMENTATION",
    "DEPENDENCY_001_IMPLEMENTED",
    "DEPENDENCY_001_CLOSED",
    "DEPENDENCY_001_BLOCKER_RESOLVED",
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_AUTHORIZED",
    "RUNTIME_READY",
    "MODEL_RUNTIME_READY",
    "MODEL_COMPLETE",
    "MODEL_COMPLETION_READY",
    "STATUS_GAP_AUTHORIZES_IMPLEMENTATION",
    "STATUS_GAP_AUTHORIZES_RUNTIME",
    "GLOBAL_ACCESS_CONTROL_IMPLEMENTED",
    "RBAC_IMPLEMENTED",
    "ACCESS_CONTROL_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "ROLE_FIELDS_CREATED",
    "PERMISSION_FIELDS_CREATED",
    "ROLE_SCHEMA_CREATED",
    "PERMISSION_SCHEMA_CREATED",
    "ADMIN_SUPPORT_MODEL_CREATED",
    "ADMIN_SUPPORT_AUTH_FIELDS_CREATED",
    "ADMIN_SUPPORT_ROUTES_CREATED",
    "ADMIN_SUPPORT_DB_FIELDS_CREATED",
    "ADMIN_SUPPORT_ALLOWED_DENIED_TESTS_CREATED",
    "ADMIN_SUPPORT_BYPASS_PREVENTION_TESTS_CREATED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "RETENTION_DELETION_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
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
