const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_v1.md",
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
  "## Dependency-007 Planning-Layer Matrix",
  "## Dependency 007 Current Status",
);
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_PLANNING_ROUND_SUMMARY_ONLY",
    "DEPENDENCY_007_PLANNING_ROUND_PARTIAL_GAP_CONTEXT",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_IMPLEMENTATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_RUNTIME_READY",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_CI_CERTIFICATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_LOCAL_LOG_PROMOTION_TO_CI_EVIDENCE",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_LOCAL_LOG_PROMOTION_TO_PACKET_COMPONENT",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_TECHNICAL_SIGN_OFF",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_PRODUCT_READINESS",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_PRODUCT_CANDIDATE",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_PACKET_APPROVAL",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_PACKET_COMPONENT_APPROVAL",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_FINAL_DELIVERY_DECISION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_PDF_PACKET",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_ARCHIVE_ZIP",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_GENERATED_PDF_AS_REPO_EVIDENCE",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_GENERATED_PDF_AS_PACKET_COMPONENT",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_WORKFLOW_ENFORCEMENT",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_RETENTION_DELETION_IMPLEMENTATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_PROVIDER_INTEGRATION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_SOURCE_PACKAGE_INSPECTION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_METADATA_ACQUISITION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_REAL_PRIVATE_RUN",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_007_PLANNING_ROUND_NOT_DEPENDENCY_CLOSURE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed dependency-007 CI/release-gate/product/external-use implementation-readiness planning round as summary/context only.",
    "It is non-authorizing, partial/gap, and does not authorize implementation-readiness, implementation, runtime behavior, runtime/API/schema/package behavior change, CI evidence, CI certification, release approval, runtime certification, technical sign-off, External Reviewer approval, product candidate, external-use, delivery, packet approval, final delivery decision, blocker resolution, or dependency closure.",
    "It does not create implementation evidence, test evidence, CI closure evidence, local log promotion to CI evidence, local log promotion to packet component, product readiness, product-candidate selection, external-use authorization, delivery approval, packet component approval, PDF packet, archive/ZIP, generated PDF repo evidence, generated PDF packet component, validator dispatch, registry/lookup, runtime gate implementation, schema/validator enforcement, workflow enforcement, RBAC/access-control implementation, admin/support implementation, audit/access-log implementation, retention/deletion implementation, raw-material routing implementation, third-party routing implementation or authorization, provider integration, raw/private/source inspection, source package inspection, PDF/image/screenshot/metadata inspection, metadata acquisition, real private run, finding, severity, or remediation.",
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
    "DEPENDENCY_006_PLANNING_ROUND_SUMMARY_CONTROLS_UPSTREAM_CONTEXT",
    "DEPENDENCY_007_STATUS_GAP_BOUNDARY_CONTROLS_CURRENT_GAPS",
    "DEPENDENCY_007_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_CONTROLS_FUTURE_EVIDENCE_REQUIREMENTS",
    "ROADMAP_DEPENDENCIES_001_TO_007_SUMMARY_CONTROLS_BLOCKED_ROUND_CONTEXT",
    "DELIVERY_PACKET_BOUNDARY_DOCS_CONTROL_DELIVERY_CONTEXT",
    "EXTERNAL_REVIEWER_PACKET_BOUNDARY_DOCS_CONTROL_EXTERNAL_REVIEWER_CONTEXT",
    "LOCAL_LOG_BOUNDARY_DOCS_CONTROL_LOCAL_LOG_CONTEXT",
    "CI_RELEASE_BOUNDARY_DOCS_CONTROL_CI_RELEASE_CONTEXT",
    "PRODUCT_EXTERNAL_USE_BOUNDARY_DOCS_CONTROL_PRODUCT_EXTERNAL_USE_CONTEXT",
    "RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_CONTROLS_DEFERRED_GATE_CONTEXT",
    "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_CONTROLS_AUDIT_LOG_CONTEXT",
    "RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RETENTION_CONTEXT",
    "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RAW_ROUTING_CONTEXT",
    "THIRD_PARTY_ROUTING_STATUS_GAP_BOUNDARY_CONTROLS_PROVIDER_CONTEXT",
    "ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_CONTROLS_ADMIN_SUPPORT_CONTEXT",
    "DEPENDENCY_007_PLANNING_ROUND_STATUS_LOCK_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "8f5a27c docs(domain): freeze dependency-007 ci release gate product external use evidence closure plan boundary",
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_PLANNING_ROUND_STATUS_LOCKED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "PROVE_ONLY_DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_STATUS_GAP_REVIEWED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_006_VALIDATOR_REGISTRY_RUNTIME_GATE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
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
    "Every row preserves partial/gap where applicable, non-authorizing status, no implementation-readiness authorization, no implementation, no runtime behavior, no runtime/API/schema/package behavior change, no CI evidence, no release approval, no runtime certification, no technical sign-off, no External Reviewer approval, no product candidate, no external-use authorization, no delivery authorization, no packet approval, no final delivery decision, no dependency closure, and no blocker resolution.",
  ], matrix);
});

test("all D007-PLAN-001 through D007-PLAN-005 rows exist", () => {
  assertIncludesAll([
    "D007-PLAN-001",
    "D007-PLAN-002",
    "D007-PLAN-003",
    "D007-PLAN-004",
    "D007-PLAN-005",
  ], matrix);
});

test("dependency 007 current status exists", () => {
  assertIncludesAll([
    "Dependency 007 follows dependency 006 in roadmap order.",
    "Dependency 007 remains blocked.",
    "Dependency 007 remains not implemented.",
    "Dependency 007 remains not closed.",
    "Dependency 007 has no tracked implementation closure evidence.",
    "Dependency 007 has no tracked test closure evidence.",
    "Dependency 007 has no tracked CI closure evidence.",
    "Upstream dependencies 001, 002, 003, 004, 005, and 006 remain not closed and must not be treated as closure.",
    "CI evidence remains not created.",
    "CI certification remains not created.",
    "Local logs remain not CI evidence.",
    "Local logs remain not packet components.",
    "npm test/lint/build pass history remains validation history and not release approval.",
    "Focused proof tests remain tested-scenario evidence and not runtime certainty.",
    "No runtime certification exists.",
    "No technical sign-off exists.",
    "No External Reviewer approval exists.",
    "No release approval exists.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "No delivery to External Reviewer is authorized.",
    "No packet approval exists.",
    "No packet component approval exists.",
    "No final delivery decision exists.",
    "No PDF packet exists.",
    "No archive/ZIP exists.",
    "Generated PDFs are not repo evidence or packet components unless separately approved.",
    "Human/professional review remains release gate.",
    "Closure criteria are not met.",
    "Closure criteria do not mean closure.",
  ]);
});

test("evidence and closure posture exists", () => {
  assertIncludesAll([
    "Partial/gap posture is preserved.",
    "Evidence plan does not mean evidence exists.",
    "Closure plan does not mean closure.",
    "Required implementation or authorization evidence remains future evidence.",
    "Required test evidence remains future evidence.",
    "Required CI evidence remains future evidence if CI is claimed.",
    "Closure criteria do not mean closure.",
    "Closure criteria are not met.",
    "No closure is created by dependency-007 planning round.",
    "Closure requires separate tracked implementation or authorization evidence.",
    "Closure requires separate tracked test evidence.",
    "Closure requires separate tracked CI evidence where CI is claimed.",
    "Closure requires separate future explicit authorization.",
  ]);
});

test("dependency links/evidence limits exist", () => {
  assertIncludesAll([
    "Upstream dependency 001 remains not closed.",
    "Upstream dependency 002 remains not closed.",
    "Upstream dependency 003 remains not closed.",
    "Upstream dependency 004 remains not closed.",
    "Upstream dependency 005 remains not closed.",
    "Upstream dependency 006 remains not closed.",
    "RBAC/admin-support implementation absent.",
    "Audit/access-log implementation absent.",
    "Retention/deletion implementation absent.",
    "Raw-material routing implementation absent.",
    "Third-party routing unauthorized.",
    "Provider integration absent.",
    "Validator dispatch not created.",
    "Registry/lookup not created.",
    "Runtime gate implementation absent.",
    "Schema/validator enforcement absent.",
    "Workflow enforcement absent.",
    "CI evidence not created.",
    "Local logs remain not CI evidence.",
    "Local logs remain not packet components.",
    "Release approval absent.",
    "Runtime certification absent.",
    "Technical sign-off absent.",
    "External Reviewer approval absent.",
    "Product candidate none.",
    "External-use unauthorized.",
    "Delivery to External Reviewer unauthorized.",
    "Packet approval absent.",
    "Packet component approval absent.",
    "Final delivery decision absent.",
    "Human/professional review remains release gate.",
    "Tests are tested-scenario evidence, not runtime certainty.",
    "Green tests are not release approval.",
    "npm test/lint/build history is not release approval.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
    "Generated PDFs are not repo evidence unless separately approved.",
    "Generated PDFs are not packet components unless separately approved.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "Prompt/workflow controls are not runtime enforcement.",
    "CI evidence requires separate explicit CI evidence creation.",
    "Runtime certification requires separate explicit evidence.",
    "Technical sign-off requires separate explicit evidence.",
    "External Reviewer approval requires separate explicit evidence.",
    "Product candidate requires separate explicit selection.",
    "External-use requires separate explicit authorization.",
    "Delivery to External Reviewer requires separate explicit authorization.",
    "Packet approval requires separate explicit authorization.",
    "Archive/ZIP generation requires separate explicit authorization.",
    "Digest/dossier context is not product readiness.",
    "Consolidated dossier context is not runtime certification.",
    "Continued pause is valid.",
  ]);
});

test("negative authorization checks exist", () => {
  assertIncludesAll([
    "This boundary creates no implementation-readiness authorization.",
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
    "This boundary creates no schema validator enforcement.",
    "This boundary creates no workflow enforcement.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no retention/deletion implementation.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no third-party routing implementation.",
    "This boundary creates no third-party routing authorization.",
    "This boundary creates no provider integration.",
    "This boundary creates no raw/private/source inspection.",
    "This boundary creates no source package inspection.",
    "This boundary creates no PDF/image/screenshot/metadata inspection.",
    "This boundary creates no metadata acquisition.",
    "This boundary creates no real private run.",
    "This boundary creates no blocker resolution.",
    "This boundary creates no dependency closure.",
    "This boundary creates no finding.",
    "This boundary creates no severity.",
    "This boundary creates no remediation.",
    "This boundary creates no local log file inspection.",
    "This boundary creates no delivery package generation.",
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "Planning-round summary does not mean implementation-readiness authorization.",
    "Planning-round summary does not mean implementation.",
    "Planning-round summary does not mean runtime readiness.",
    "Planning-round summary does not mean CI evidence exists.",
    "Planning-round summary does not mean release approval.",
    "Planning-round summary does not mean runtime certification.",
    "Planning-round summary does not mean technical sign-off.",
    "Planning-round summary does not mean External Reviewer approval.",
    "Planning-round summary does not mean product candidate selected.",
    "Planning-round summary does not mean external-use authorized.",
    "Planning-round summary does not mean delivery authorized.",
    "Planning-round summary does not mean packet approved.",
    "Planning-round summary does not mean final delivery decision exists.",
    "Planning-round summary does not mean dependency closure.",
    "Planning-round summary does not mean blocker resolution.",
    "Partial/gap planning round does not mean closure.",
    "Evidence plan does not mean evidence exists.",
    "Closure plan does not mean closure.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Required CI evidence does not mean CI evidence exists.",
    "Dependency 007 planning completion does not mean dependency 007 is implementation-ready.",
    "Local log boundary does not mean local logs are CI evidence.",
    "Local log boundary does not mean local logs are packet components.",
    "Generated PDF boundary does not mean generated PDF is repo evidence.",
    "Generated PDF boundary does not mean generated PDF is packet component.",
    "Product candidate row does not mean product candidate selected.",
    "External-use row does not mean external-use authorized.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "REVIEW_ONLY_ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_AFTER_DEPENDENCY_007_PLANNING_ROUND_SUMMARY",
    "continued pause",
  ], recommendations);
});

test("none are authorized by this boundary exists", () => {
  assertIncludesAll(["None are authorized by this boundary."], recommendations);
});

test("overclaiming exact tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "DEPENDENCY_007_IMPLEMENTATION_READY",
    "DEPENDENCY_007_READY_FOR_IMPLEMENTATION",
    "DEPENDENCY_007_IMPLEMENTED",
    "DEPENDENCY_007_CLOSED",
    "DEPENDENCY_007_BLOCKER_RESOLVED",
    "PLANNING_ROUND_AUTHORIZES_IMPLEMENTATION",
    "PLANNING_ROUND_AUTHORIZES_RUNTIME",
    "PLANNING_ROUND_CREATES_CLOSURE",
    "EVIDENCE_PLAN_AUTHORIZES_IMPLEMENTATION",
    "CLOSURE_PLAN_CREATES_CLOSURE",
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
