const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_v1.md",
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

test("implementation-readiness entry criteria boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity and status tokens exist", () => {
  assertIncludesAll([
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY",
    "DOCS_ONLY",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_ONLY",
    "ENTRY_CRITERIA_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "ENTRY_CRITERIA_NOT_IMPLEMENTATION",
    "ENTRY_CRITERIA_NOT_RUNTIME_READY",
    "ENTRY_CRITERIA_NOT_RUNTIME_BEHAVIOR",
    "ENTRY_CRITERIA_NOT_VALIDATOR_DISPATCH",
    "ENTRY_CRITERIA_NOT_REGISTRY_LOOKUP",
    "ENTRY_CRITERIA_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "ENTRY_CRITERIA_NOT_CI_EVIDENCE_CREATION",
    "ENTRY_CRITERIA_NOT_RELEASE_APPROVAL",
    "ENTRY_CRITERIA_NOT_RUNTIME_CERTIFICATION",
    "ENTRY_CRITERIA_NOT_PRODUCT_READINESS",
    "ENTRY_CRITERIA_NOT_EXTERNAL_USE_AUTHORIZATION",
    "ENTRY_CRITERIA_NOT_BLOCKER_RESOLUTION",
  ]);
});

test("purpose and transition-only limits exist", () => {
  assertIncludesAll([
    "freezes the criteria required before a future dependency or blocker can even be proposed as an implementation-readiness candidate",
    "Entry criteria are transition rules only.",
    "Entry criteria do not authorize any candidate.",
    "Entry criteria do not select dependency 001.",
    "Entry criteria do not reopen dependencies 001-007.",
    "Entry criteria do not close any dependency.",
    "Entry criteria do not create implementation-readiness.",
    "Entry criteria do not create implementation.",
    "Entry criteria do not create runtime behavior.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "MODEL_COMPLETION_READINESS_ROADMAP_CONTROLS_DEPENDENCY_ORDER",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "540f9bd docs(domain): freeze roadmap blocked completion round summary boundary",
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_REVIEWED_CONSISTENT_BLOCKED_AND_PAUSED_NO_CHANGE",
    "MODEL_COMPLETION_READINESS_ROADMAP_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("roadmap blocked-state preservation exists", () => {
  assertIncludesAll([
    "RD-001 remains reviewed, consistent, blocked, paused, and not closed.",
    "RD-002 remains reviewed, consistent, blocked, paused, and not closed.",
    "RD-003 remains reviewed, consistent, blocked, paused, and not closed.",
    "RD-004 remains reviewed, consistent, blocked, paused, and not closed.",
    "RD-005 remains reviewed, consistent, blocked, paused, and not closed.",
    "RD-006 remains reviewed, consistent, blocked by upstream dependencies, paused, and not closed.",
    "RD-007 remains reviewed, consistent, blocked by upstream dependencies, paused, and not closed.",
    "Dependencies 001 through 007 have no tracked implementation closure evidence.",
    "Dependencies 001 through 007 have no tracked test closure evidence.",
    "No PROVE_ONLY dependency-001 through dependency-007 status/gap candidate is currently needed.",
  ]);
});

test("implementation-readiness entry criteria definition exists", () => {
  assertIncludesAll([
    "A future implementation-readiness candidate may only be considered if all criteria below are satisfied in a separate future review:",
    "live git guard passes",
    "target dependency is explicitly selected by user-authorized posture",
    "dependency order is preserved",
    "all required upstream dependencies are either closed by tracked evidence or explicitly reviewed as not required for that candidate",
    "target dependency has an explicit current blocker status",
    "target dependency has an explicit negative boundary",
    "target dependency has a current evidence-level statement",
    "required implementation evidence is defined",
    "required test evidence is defined",
    "closure criteria are defined but not treated as closure",
    "raw/private/source handling is explicitly bounded",
    "audit/access-log dependency is identified",
    "RBAC/admin-support dependency is identified",
    "retention/deletion dependency is identified where relevant",
    "third-party routing/provider dependency is identified where relevant",
    "CI evidence requirement is identified where CI is claimed",
    "human/professional review gate remains preserved",
    "failure/ambiguity outcome is fail-closed continued pause",
  ]);
});

test("all IR-EC-001 through IR-EC-018 rows exist", () => {
  for (let index = 1; index <= 18; index += 1) {
    assert.match(doc, new RegExp(`IR-EC-${String(index).padStart(3, "0")}`), `missing IR-EC-${index}`);
  }
  assertIncludesAll([
    "live git guard and clean tracked worktree",
    "explicit user-authorized future posture",
    "dependency-order preservation",
    "upstream closure or explicit non-requirement review",
    "target dependency current blocker status",
    "target dependency negative boundary",
    "target dependency current evidence level",
    "required implementation evidence definition",
    "required test evidence definition",
    "closure criteria definition without closure claim",
    "raw/private/source handling boundary",
    "RBAC/admin-support dependency statement",
    "audit/access-log dependency statement",
    "retention/deletion dependency statement",
    "third-party/provider dependency statement",
    "CI evidence boundary where CI is claimed",
    "human/professional review release gate preservation",
    "fail-closed ambiguity outcome",
  ]);
});

test("dependency-001 specific caution exists", () => {
  assertIncludesAll([
    "Dependency 001 is the first roadmap dependency by order.",
    "Dependency 001 includes global access-control threat model, RBAC / role-permission model, and admin/support access model.",
    "Dependency 001 remains blocked and not implemented.",
    "Route/case/capability evidence is not full RBAC/access-control.",
    "Route/case/capability evidence is not admin/support access-control.",
    "Route/case/capability evidence is not global authorization model.",
    "This boundary does not select dependency 001 as an implementation-readiness candidate.",
    "Any dependency-001 entry-candidate review requires separate future explicit posture.",
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
    "Schema validator evidence is not proof of all schemas or all runtime behavior.",
    "Static inspection results are review context only.",
    "Digest/dossier context is not product readiness.",
    "Consolidated dossier context is not runtime certification.",
    "Implementation-readiness entry criteria are not implementation-readiness authorization.",
    "Human/professional review remains release gate.",
    "Continued pause is valid.",
  ]);
});

test("negative authorization checks exist", () => {
  assertIncludesAll([
    "This boundary creates no implementation.",
    "This boundary creates no implementation-readiness authorization.",
    "This boundary creates no implementation-readiness candidate selection.",
    "This boundary creates no runtime behavior.",
    "This boundary creates no runtime/API/schema/package behavior change.",
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no runtime gate implementation.",
    "This boundary creates no runtime gate inventory as implementation.",
    "This boundary creates no runtime/schema/workflow enforcement.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no role fields.",
    "This boundary creates no permission fields.",
    "This boundary creates no role schema.",
    "This boundary creates no permission schema.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no admin/support model.",
    "This boundary creates no admin/support routes.",
    "This boundary creates no admin/support auth fields.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no event taxonomy runtime code.",
    "This boundary creates no log schema/storage.",
    "This boundary creates no retention/deletion implementation.",
    "This boundary creates no deletion/purge/lifecycle runtime behavior.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no raw-material routing runtime behavior.",
    "This boundary creates no third-party routing implementation or authorization.",
    "This boundary creates no provider integration.",
    "This boundary creates no provider registry/status implementation.",
    "This boundary creates no data-routing map.",
    "This boundary creates no token/URL/secret handling.",
    "This boundary creates no provider auditability implementation.",
    "This boundary creates no provider retention/deletion posture implementation.",
    "This boundary creates no raw/private/source inspection.",
    "This boundary creates no source package inspection.",
    "This boundary creates no PDF/image/screenshot/metadata inspection.",
    "This boundary creates no metadata acquisition.",
    "This boundary creates no local log file inspection.",
    "This boundary creates no CI evidence creation.",
    "This boundary creates no CI certification.",
    "This boundary creates no local logs promoted to CI evidence.",
    "This boundary creates no real private run.",
    "This boundary creates no delivery to External Reviewer.",
    "This boundary creates no packet approval.",
    "This boundary creates no product candidate.",
    "This boundary creates no external-use authorization.",
    "This boundary creates no release approval.",
    "This boundary creates no runtime certification.",
    "This boundary creates no technical sign-off.",
    "This boundary creates no External Reviewer approval.",
    "This boundary creates no legal/clinical/evidentiary/case-truth conclusion.",
    "This boundary creates no security finding.",
    "This boundary creates no vulnerability finding.",
    "This boundary creates no severity.",
    "This boundary creates no remediation.",
    "This boundary creates no blocker resolution.",
    "This boundary creates no dependency closure.",
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "Entry criteria do not mean implementation-readiness authorization.",
    "Entry criteria do not mean implementation candidate selected.",
    "Implementation-readiness candidate does not mean implementation.",
    "Dependency order does not mean implementation authorization.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Closure criteria do not mean closure.",
    "Roadmap blocked round does not mean model completion.",
    "Reviewed dependency does not mean closed dependency.",
    "Blocked dependency does not mean resolved blocker.",
    "Human/professional review remains release gate.",
    "Continued pause remains valid.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY",
    "REVIEW_ONLY_DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE",
    "continued pause",
  ]);
});

test("none are authorized by this boundary exists", () => {
  assertIncludesAll(["None are authorized by this boundary."]);
});

test("exact overclaiming tokens are rejected", () => {
  assertDoesNotIncludeExactToken([
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "IMPLEMENTATION_READINESS_CANDIDATE_SELECTED",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_AUTHORIZED",
    "RUNTIME_READY",
    "MODEL_RUNTIME_READY",
    "MODEL_COMPLETE",
    "MODEL_COMPLETION_READY",
    "ENTRY_CRITERIA_AUTHORIZES_IMPLEMENTATION",
    "ENTRY_CRITERIA_AUTHORIZES_RUNTIME",
    "ENTRY_CRITERIA_SELECTS_DEPENDENCY_001",
    "DEPENDENCY_001_IMPLEMENTATION_READY",
    "DEPENDENCY_001_SELECTED_FOR_IMPLEMENTATION",
    "GLOBAL_ACCESS_CONTROL_IMPLEMENTED",
    "RBAC_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "ROLE_FIELDS_CREATED",
    "PERMISSION_FIELDS_CREATED",
    "ROLE_SCHEMA_CREATED",
    "PERMISSION_SCHEMA_CREATED",
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
