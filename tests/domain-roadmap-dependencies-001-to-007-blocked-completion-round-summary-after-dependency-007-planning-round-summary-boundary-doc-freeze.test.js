import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_AFTER_DEPENDENCY_007_PLANNING_ROUND_SUMMARY_BOUNDARY_v1.md";
const doc = readFileSync(DOC_PATH, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(entries, text = doc) {
  for (const entry of entries) {
    assert.match(text, new RegExp(escapeRegExp(entry)), `missing ${entry}`);
  }
}

function assertDoesNotIncludeExactToken(entries, text = doc) {
  for (const entry of entries) {
    const pattern = new RegExp(`(?<![A-Z0-9_])${escapeRegExp(entry)}(?![A-Z0-9_])`);
    assert.doesNotMatch(text, pattern, `forbidden exact token ${entry}`);
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
  "## Roadmap 001-To-007 Blocked-Completion Matrix",
  "## Cross-Dependency Blocker Summary",
);
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(existsSync(DOC_PATH), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_AFTER_DEPENDENCY_007_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "DOCS_ONLY",
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_ONLY",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_PARTIAL_GAP_CONTEXT",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_IMPLEMENTATION",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_RUNTIME_READY",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_RUNTIME_BEHAVIOR",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_CI_EVIDENCE_CREATION",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_CI_CERTIFICATION",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_LOCAL_LOG_PROMOTION_TO_CI_EVIDENCE",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_LOCAL_LOG_PROMOTION_TO_PACKET_COMPONENT",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_RELEASE_APPROVAL",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_RUNTIME_CERTIFICATION",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_TECHNICAL_SIGN_OFF",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_PRODUCT_READINESS",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_PRODUCT_CANDIDATE",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_EXTERNAL_USE_AUTHORIZATION",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_PACKET_APPROVAL",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_PACKET_COMPONENT_APPROVAL",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_FINAL_DELIVERY_DECISION",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_DEPENDENCY_CLOSURE",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_NOT_BLOCKER_RESOLUTION",
    "ROADMAP_001_TO_007_BLOCKED_COMPLETION_ROUND_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only roadmap dependencies 001-to-007 blocked-completion round review after dependency-007 planning-round summary.",
    "It is non-authorizing, partial/gap, and summary/context only.",
    "It does not authorize implementation-readiness, implementation, runtime behavior, runtime/API/schema/package behavior change, CI evidence, release approval, runtime certification, technical sign-off, External Reviewer approval, product candidate, external-use, delivery, packet approval, blocker resolution, or dependency closure.",
    "It does not create implementation evidence, test evidence, or CI closure evidence.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "DEPENDENCY_001_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_002_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_003_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_004_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_005_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_006_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_007_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "RBAC_ADMIN_SUPPORT_BOUNDARY_DOCS_CONTROL_ACCESS_CONTEXT",
    "AUDIT_ACCESS_LOG_BOUNDARY_DOCS_CONTROL_AUDIT_CONTEXT",
    "RETENTION_DELETION_BOUNDARY_DOCS_CONTROL_LIFECYCLE_CONTEXT",
    "RAW_MATERIAL_ROUTING_BOUNDARY_DOCS_CONTROL_RAW_ROUTING_CONTEXT",
    "THIRD_PARTY_PROVIDER_BOUNDARY_DOCS_CONTROL_PROVIDER_CONTEXT",
    "VALIDATOR_REGISTRY_RUNTIME_GATE_BOUNDARY_DOCS_CONTROL_GATE_CONTEXT",
    "CI_RELEASE_PRODUCT_EXTERNAL_USE_BOUNDARY_DOCS_CONTROL_RELEASE_CONTEXT",
    "DELIVERY_PACKET_BOUNDARY_DOCS_CONTROL_DELIVERY_CONTEXT",
    "LOCAL_LOG_BOUNDARY_DOCS_CONTROL_LOCAL_LOG_CONTEXT",
    "DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_REVIEW_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "559b440 docs(domain): freeze dependency-007 ci release gate product external use planning round summary boundary",
    "NEXT_PHASE_SELECTED_AFTER_DEPENDENCY_007_PLANNING_ROUND_SUMMARY_PAUSE_NO_CHANGE",
    "REVIEW_ONLY_ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_AFTER_DEPENDENCY_007_PLANNING_ROUND_SUMMARY_COMPLETED_NO_CHANGE",
    "COMBINED_READ_ONLY_NEXT_PHASE_SELECTION_AND_ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_REVIEW_COMPLETED_NO_CHANGE",
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_006_VALIDATOR_REGISTRY_RUNTIME_GATE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("roadmap 001-to-007 blocked-completion matrix exists", () => {
  assertIncludesAll([
    "dependency ID",
    "surface",
    "planning-round summary status",
    "blocker status",
    "implementation status",
    "closure status",
    "implementation evidence status",
    "test evidence status",
    "CI evidence status if applicable",
    "product/external-use/release impact if applicable",
    "unresolved linked dependencies",
    "what remains non-authorized",
    "Every row preserves planning summary frozen/reviewed/paused status, blocked status, not implemented status, not closed status, no tracked implementation closure evidence, no tracked test closure evidence, no CI closure evidence where applicable, DOCS_ONLY/partial-gap/non-authorizing posture, closure criteria not met, closure criteria do not mean closure, and continued pause remains valid.",
  ], matrix);
});

test("all dependency rows D001 through D007 exist", () => {
  assertIncludesAll(["D001", "D002", "D003", "D004", "D005", "D006", "D007"], matrix);
});

test("matrix preserves blocked and non-authorizing state", () => {
  assertIncludesAll([
    "not implemented",
    "not closed",
    "no tracked implementation closure evidence",
    "no tracked test closure evidence",
    "closure criteria are not met",
    "closure criteria do not mean closure",
    "DOCS_ONLY partial-gap non-authorizing context",
    "continued pause remains valid",
    "no tracked CI closure evidence",
  ], matrix);
});

test("cross-dependency blocker summary exists", () => {
  assertIncludesAll([
    "Dependencies 001 through 007 remain blocked.",
    "Dependencies 001 through 007 remain not implemented.",
    "Dependencies 001 through 007 remain not closed.",
    "Dependencies 001 through 007 have no tracked implementation closure evidence.",
    "Dependencies 001 through 007 have no tracked test closure evidence.",
    "Dependency 007 has no tracked CI closure evidence.",
    "RBAC/admin-support remains unresolved.",
    "Audit/access-log remains unresolved.",
    "Retention/deletion remains unresolved.",
    "Raw-material routing remains unresolved/not implemented.",
    "Third-party/provider remains unresolved/not implemented/unauthorized.",
    "Validator dispatch remains not created.",
    "Registry/lookup remains not created.",
    "Runtime gate implementation remains absent.",
    "Schema/validator enforcement remains absent.",
    "Workflow enforcement remains absent.",
    "CI evidence remains not created.",
    "Local logs remain not CI evidence.",
    "Local logs remain not packet components.",
    "Release approval remains absent.",
    "Runtime certification remains absent.",
    "Technical sign-off remains absent.",
    "External Reviewer approval remains absent.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "Delivery to External Reviewer remains unauthorized.",
    "Packet approval remains absent.",
    "Final delivery decision remains absent.",
    "Human/professional review remains release gate.",
  ]);
});

test("evidence limits exist", () => {
  assertIncludesAll([
    "Tests are tested-scenario evidence, not runtime certainty.",
    "Green tests are not release approval.",
    "npm test/lint/build history is not release approval.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
    "Generated PDFs are not repo evidence unless separately approved.",
    "Generated PDFs are not packet components unless separately approved.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "Prompt/workflow controls are not runtime enforcement.",
    "Runtime gate inventory is not implementation.",
    "Schema/validator gate candidate is not schema enforcement.",
    "Workflow/prompt gate candidate is not workflow enforcement.",
    "Route/case/capability evidence is not full RBAC/access-control.",
    "Route/case/capability evidence is not admin/support access-control.",
    "Route/case/capability evidence is not global authorization model.",
    "CI evidence requires separate explicit CI evidence creation.",
    "Runtime certification requires separate explicit evidence.",
    "Technical sign-off requires separate explicit evidence.",
    "External Reviewer approval requires separate explicit evidence.",
    "Product candidate requires separate explicit selection.",
    "External-use requires separate explicit authorization.",
    "Delivery to External Reviewer requires separate explicit authorization.",
    "Packet approval requires separate explicit authorization.",
    "Digest/dossier context is not product readiness.",
    "Consolidated dossier context is not runtime certification.",
    "Human/professional review remains release gate.",
    "Continued pause is valid.",
  ]);
});

test("negative authorization checks exist", () => {
  assertIncludesAll([
    "This boundary creates no implementation-readiness.",
    "This boundary creates no implementation.",
    "This boundary creates no runtime behavior.",
    "This boundary creates no runtime/API/schema/package behavior change.",
    "This boundary creates no CI evidence.",
    "This boundary creates no CI certification.",
    "This boundary creates no local log promotion to CI evidence.",
    "This boundary creates no local log promotion to packet component.",
    "This boundary creates no release approval.",
    "This boundary creates no runtime certification.",
    "This boundary creates no technical sign-off.",
    "This boundary creates no External Reviewer approval.",
    "This boundary creates no product readiness.",
    "This boundary creates no product candidate.",
    "This boundary creates no external-use authorization.",
    "This boundary creates no delivery to External Reviewer.",
    "This boundary creates no packet approval.",
    "This boundary creates no packet component approval.",
    "This boundary creates no final delivery decision.",
    "This boundary creates no PDF packet.",
    "This boundary creates no archive/ZIP.",
    "This boundary creates no generated PDF as repo evidence.",
    "This boundary creates no generated PDF as packet component.",
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no runtime gate implementation.",
    "This boundary creates no schema/validator enforcement.",
    "This boundary creates no workflow enforcement.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no retention/deletion implementation.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no third-party routing implementation or authorization.",
    "This boundary creates no provider integration.",
    "This boundary creates no raw/private/source inspection.",
    "This boundary creates no source package inspection.",
    "This boundary creates no PDF/image/screenshot/metadata inspection.",
    "This boundary creates no metadata acquisition.",
    "This boundary creates no real private run.",
    "This boundary creates no blocker resolution.",
    "This boundary creates no dependency closure.",
    "This boundary creates no finding.",
    "This boundary assigns no severity.",
    "This boundary recommends no remediation.",
    "This boundary creates no local log file inspection.",
    "This boundary creates no delivery package generation.",
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "Blocked-completion summary does not mean implementation-readiness authorization.",
    "Blocked-completion summary does not mean implementation.",
    "Blocked-completion summary does not mean runtime readiness.",
    "Blocked-completion summary does not mean CI evidence exists.",
    "Blocked-completion summary does not mean release approval.",
    "Blocked-completion summary does not mean runtime certification.",
    "Blocked-completion summary does not mean technical sign-off.",
    "Blocked-completion summary does not mean External Reviewer approval.",
    "Blocked-completion summary does not mean product candidate selected.",
    "Blocked-completion summary does not mean external-use authorized.",
    "Blocked-completion summary does not mean delivery authorized.",
    "Blocked-completion summary does not mean packet approved.",
    "Blocked-completion summary does not mean final delivery decision exists.",
    "Blocked-completion summary does not mean dependency closure.",
    "Blocked-completion summary does not mean blocker resolution.",
    "Planning-round summary does not mean closure.",
    "Partial/gap planning round does not mean closure.",
    "Evidence plan does not mean evidence exists.",
    "Closure plan does not mean closure.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Required CI evidence does not mean CI evidence exists.",
    "Dependencies 001-to-007 planning completion does not mean dependencies 001-to-007 are implementation-ready.",
    "Product candidate row does not mean product candidate selected.",
    "External-use row does not mean external-use authorized.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_AFTER_DEPENDENCY_007_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "REVIEW_ONLY_POST_ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_NEXT_SAFE_POSTURE_SELECTION",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("rejects exact overclaiming tokens", () => {
  assertDoesNotIncludeExactToken([
    "ROADMAP_001_TO_007_IMPLEMENTATION_READY",
    "ROADMAP_001_TO_007_READY_FOR_IMPLEMENTATION",
    "ROADMAP_001_TO_007_IMPLEMENTED",
    "ROADMAP_001_TO_007_CLOSED",
    "ROADMAP_001_TO_007_BLOCKERS_RESOLVED",
    "DEPENDENCIES_001_TO_007_IMPLEMENTATION_READY",
    "DEPENDENCIES_001_TO_007_READY_FOR_IMPLEMENTATION",
    "DEPENDENCIES_001_TO_007_IMPLEMENTED",
    "DEPENDENCIES_001_TO_007_CLOSED",
    "DEPENDENCIES_001_TO_007_BLOCKERS_RESOLVED",
    "BLOCKED_COMPLETION_SUMMARY_AUTHORIZES_IMPLEMENTATION",
    "BLOCKED_COMPLETION_SUMMARY_AUTHORIZES_RUNTIME",
    "BLOCKED_COMPLETION_SUMMARY_CREATES_CLOSURE",
    "PLANNING_ROUND_AUTHORIZES_IMPLEMENTATION",
    "PLANNING_ROUND_AUTHORIZES_RUNTIME",
    "PLANNING_ROUND_CREATES_CLOSURE",
    "IMPLEMENTATION_EVIDENCE_EXISTS",
    "TEST_EVIDENCE_EXISTS",
    "CI_EVIDENCE_EXISTS",
    "CI_EVIDENCE_CREATED",
    "CI_CERTIFICATION_CREATED",
    "LOCAL_LOGS_PROMOTED_TO_CI_EVIDENCE",
    "LOCAL_LOGS_PROMOTED_TO_PACKET_COMPONENTS",
    "RELEASE_APPROVAL_CREATED",
    "RUNTIME_CERTIFICATION_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "EXTERNAL_REVIEWER_APPROVAL_CREATED",
    "PRODUCT_READINESS_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
    "DELIVERY_TO_EXTERNAL_REVIEWER_AUTHORIZED",
    "PACKET_APPROVAL_CREATED",
    "PACKET_COMPONENT_APPROVAL_CREATED",
    "FINAL_DELIVERY_DECISION_CREATED",
    "PDF_PACKET_CREATED",
    "ARCHIVE_ZIP_CREATED",
    "GENERATED_PDF_REPO_EVIDENCE_CREATED",
    "GENERATED_PDF_PACKET_COMPONENT_CREATED",
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
    "SCHEMA_VALIDATOR_ENFORCEMENT_CREATED",
    "WORKFLOW_ENFORCEMENT_CREATED",
    "RBAC_ACCESS_CONTROL_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "RETENTION_DELETION_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "PROVIDER_INTEGRATION_CREATED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "REAL_PRIVATE_RUN_AUTHORIZED",
    "BLOCKER_RESOLVED",
    "DEPENDENCY_CLOSED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ]);
});
