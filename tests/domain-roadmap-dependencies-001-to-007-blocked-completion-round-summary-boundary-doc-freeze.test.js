import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_BOUNDARY_v1.md";
const doc = readFileSync(DOC_PATH, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(entries) {
  for (const entry of entries) {
    assert.match(doc, new RegExp(escapeRegExp(entry)), `missing ${entry}`);
  }
}

test("roadmap dependencies blocked completion round summary boundary doc exists", () => {
  assert.equal(existsSync(DOC_PATH), true);
});

test("identity and status tokens exist", () => {
  assertIncludesAll([
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_BOUNDARY",
    "DOCS_ONLY",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_ONLY",
    "BLOCKED_COMPLETION_ROUND_SUMMARY_ONLY",
    "NOT_MODEL_COMPLETION",
    "NOT_RUNTIME_READY",
    "NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "NOT_IMPLEMENTATION",
    "NOT_CI_CERTIFICATION",
    "NOT_RELEASE_APPROVAL",
    "NOT_RUNTIME_CERTIFICATION",
    "NOT_TECHNICAL_SIGN_OFF",
    "NOT_EXTERNAL_REVIEWER_APPROVAL",
    "NOT_PRODUCT_READINESS",
    "NOT_EXTERNAL_USE_AUTHORIZATION",
    "NOT_BLOCKER_RESOLUTION",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "MODEL_COMPLETION_READINESS_ROADMAP_CONTROLS_DEPENDENCY_ORDER",
    "ROADMAP_DEPENDENCY_REVIEW_RESULTS_ARE_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "39611ee docs(domain): freeze model completion readiness roadmap boundary",
    "MODEL_COMPLETION_READINESS_ROADMAP_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "TECHNICAL_REPO_TEST_STATIC_INSPECTION_ROUND_STAGE_1_TO_3_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_REVIEWED_CONSISTENT_BLOCKED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("all RD-001 through RD-007 rows exist", () => {
  assertIncludesAll([
    "RD-001 | global access-control / RBAC / admin-support | reviewed, consistent, blocked, paused, not closed",
    "RD-002 | audit/access-log / event taxonomy / log schema-storage | reviewed, consistent, blocked, paused, not closed",
    "RD-003 | retention/deletion lifecycle | reviewed, consistent, blocked, paused, not closed",
    "RD-004 | raw-material routing controls | reviewed, consistent, blocked, paused, not closed",
    "RD-005 | third-party provider/routing prerequisites | reviewed, consistent, blocked, paused, not closed",
    "RD-006 | validator dispatch / registry lookup / runtime gates | reviewed, consistent, blocked by upstream dependencies, paused, not closed",
    "RD-007 | CI evidence / local-log boundary / human-professional release gate / product-external-use gate | reviewed, consistent, blocked by upstream dependencies, paused, not closed",
  ]);
});

test("closure evidence limits exist", () => {
  assertIncludesAll([
    "Dependencies 001 through 007 have no tracked implementation closure evidence.",
    "Dependencies 001 through 007 have no tracked test closure evidence.",
    "Reviewed and paused does not mean closed.",
    "Blocked and paused does not mean resolved.",
    "Required implementation evidence remains future evidence.",
    "Required test evidence remains future evidence.",
    "Closure criteria do not mean closure.",
  ]);
});

test("dependency 006 limits exist", () => {
  assertIncludesAll([
    "Validator dispatch remains not created.",
    "Registry/lookup remains not created.",
    "Runtime gate inventory remains deferred.",
    "Runtime gates remain not implemented.",
    "Runtime gate inventory remains not implementation.",
    "Runtime/schema/workflow gate candidates remain future-only.",
    "Runtime/schema/workflow gate candidates remain not enforcement.",
    "Dependency 006 remains blocked by dependencies 001 through 005.",
  ]);
});

test("dependency 007 limits exist", () => {
  assertIncludesAll([
    "Local logs remain not CI logs.",
    "Local logs remain not CI evidence.",
    "Local logs remain not packet components.",
    "CI evidence remains not created where only local/local transcript summaries exist.",
    "Human/professional review remains release gate.",
    "Human/professional review does not create automatic approval.",
    "Product/external-use readiness gate remains future-only.",
    "Product/external-use readiness gate does not authorize product or external-use.",
    "Dependency 007 remains blocked by dependencies 001 through 006.",
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
    "Human/professional review remains release gate.",
    "Continued pause is valid.",
  ]);
});

test("remaining blocker summary exists", () => {
  assertIncludesAll([
    "Complete global access-control threat model remains unresolved.",
    "RBAC/access-control implementation remains absent.",
    "Role/permission fields/schema remain absent.",
    "Admin/support model/access remains unresolved.",
    "Audit/access-log implementation remains absent.",
    "Event taxonomy runtime code remains absent.",
    "Log schema/storage remains absent.",
    "Retention/deletion implementation remains absent.",
    "Raw-material routing implementation remains absent.",
    "Third-party routing remains unauthorized.",
    "Provider/routing prerequisites remain unresolved.",
    "Validator dispatch remains not created.",
    "Registry/lookup remains not created.",
    "Runtime gate inventory remains deferred.",
    "Runtime gates remain not implemented.",
    "CI evidence remains not created.",
    "Product/external-use remains unauthorized.",
  ]);
});

test("negative authorization checks exist", () => {
  assertIncludesAll([
    "This boundary creates no implementation.",
    "This boundary creates no implementation-readiness authorization.",
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
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "Blocked completion round does not mean model completion.",
    "Reviewed dependency does not mean closed dependency.",
    "Blocked dependency does not mean resolved blocker.",
    "Dependency order does not mean implementation authorization.",
    "Dependency 006 blocked-by-upstream does not mean runtime gate readiness.",
    "Dependency 007 blocked-by-upstream does not mean CI/release/product/external-use readiness.",
    "Product/external-use readiness gate does not mean product/external-use is authorized.",
    "Human/professional review remains release gate.",
    "Continued pause remains valid.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_BOUNDARY",
    "continued pause",
  ]);
});

test("none are authorized by this boundary exists", () => {
  assertIncludesAll(["None are authorized by this boundary."]);
});

test("exact overclaiming tokens are rejected", () => {
  [
    "MODEL_COMPLETE",
    "MODEL_COMPLETION_READY",
    "MODEL_RUNTIME_READY",
    "MODEL_PRODUCT_READY",
    "MODEL_EXTERNAL_USE_READY",
    "ROADMAP_ROUND_AUTHORIZES_IMPLEMENTATION",
    "ROADMAP_ROUND_AUTHORIZES_RUNTIME",
    "ROADMAP_ROUND_AUTHORIZES_PRODUCT",
    "ROADMAP_ROUND_AUTHORIZES_EXTERNAL_USE",
    "IMPLEMENTATION_AUTHORIZED",
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "RUNTIME_CERTIFICATION_CREATED",
    "RELEASE_APPROVAL_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "EXTERNAL_REVIEWER_APPROVAL_CREATED",
    "PRODUCT_READINESS_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
    "BLOCKER_RESOLVED",
    "DEPENDENCIES_CLOSED",
    "CLOSURE_EVIDENCE_CREATED",
    "CI_EVIDENCE_CREATED",
    "CI_CERTIFICATION_CREATED",
    "LOCAL_LOGS_PROMOTED_TO_CI_EVIDENCE",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "RBAC_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "RETENTION_DELETION_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "PROVIDER_INTEGRATION_CREATED",
    "PROVIDER_REGISTRY_CREATED",
    "DATA_ROUTING_MAP_CREATED",
    "TOKEN_SECRET_HANDLING_CREATED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ].forEach((forbiddenToken) => assert.doesNotMatch(doc, new RegExp(forbiddenToken)));
});
