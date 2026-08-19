const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_v1.md",
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

const matrix = sectionBetween("## Evidence And Closure-Plan Matrix", "## Required Implementation / Authorization Evidence Definition");
const implementationEvidence = sectionBetween(
  "## Required Implementation / Authorization Evidence Definition",
  "## Required Test / CI Evidence Definition",
);
const testEvidence = sectionBetween("## Required Test / CI Evidence Definition", "## Closure Criteria");
const closureCriteria = sectionBetween("## Closure Criteria", "## Dependency Links");
const dependencyLinks = sectionBetween("## Dependency Links", "## Evidence Limits");
const evidenceLimits = sectionBetween("## Evidence Limits", "## Negative Authorization");
const negativeAuthorization = sectionBetween("## Negative Authorization", "## No-Overclaim Rules");
const noOverclaim = sectionBetween("## No-Overclaim Rules", "## Recommended Smallest Safe Next Posture");
const recommendations = sectionBetween("## Recommended Smallest Safe Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_EVIDENCE_AND_CLOSURE_PLAN_ONLY",
    "DEPENDENCY_007_EVIDENCE_PLAN_PARTIAL_GAP_CONTEXT",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_IMPLEMENTATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_RUNTIME_READY",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_CI_CERTIFICATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_LOCAL_LOG_PROMOTION_TO_CI_EVIDENCE",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_LOCAL_LOG_PROMOTION_TO_PACKET_COMPONENT",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_TECHNICAL_SIGN_OFF",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_PRODUCT_READINESS",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_PRODUCT_CANDIDATE",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_PACKET_APPROVAL",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_PACKET_COMPONENT_APPROVAL",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_FINAL_DELIVERY_DECISION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_PDF_PACKET",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_ARCHIVE_ZIP",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_GENERATED_PDF_AS_REPO_EVIDENCE",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_GENERATED_PDF_AS_PACKET_COMPONENT",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_WORKFLOW_ENFORCEMENT",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_RETENTION_DELETION_IMPLEMENTATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_PROVIDER_INTEGRATION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_SOURCE_PACKAGE_INSPECTION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_METADATA_ACQUISITION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_REAL_PRIVATE_RUN",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_007_EVIDENCE_PLAN_NOT_DEPENDENCY_CLOSURE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "freezes the evidence and closure-plan layer for dependency 007 CI/release-gate/product/external-use readiness",
    "The evidence and closure plan is non-authorizing.",
    "The evidence and closure plan preserves partial/gap posture.",
    "The evidence and closure plan defines future evidence requirements only.",
    "The evidence and closure plan creates no implementation-readiness authorization.",
    "The evidence and closure plan creates no implementation.",
    "The evidence and closure plan creates no runtime behavior.",
    "The evidence and closure plan creates no runtime/API/schema/package behavior change.",
    "The evidence and closure plan creates no evidence, tests, CI evidence, CI certification, release approval, runtime certification, technical sign-off, External Reviewer approval, product readiness, product candidate, external-use, delivery, packet approval, packet component approval, final delivery decision, PDF packet, archive/ZIP, generated PDF repo evidence, generated PDF packet component, blocker resolution, or dependency closure.",
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
    "DEPENDENCY_007_EVIDENCE_AND_CLOSURE_PLAN_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "81c2a74 docs(domain): freeze dependency-007 ci release gate product external use status gap boundary",
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
    "Archive/ZIP generation remains absent/not approved.",
    "Human/professional review remains release gate.",
    "Closure criteria are not met.",
    "Closure criteria do not mean closure.",
  ]);
});

test("evidence and closure-plan matrix exists", () => {
  assertIncludesAll([
    "row ID",
    "evidence surface",
    "current status/gap",
    "future implementation or authorization evidence required",
    "future test/CI evidence required",
    "closure criteria",
    "dependency links that must remain visible",
    "failure/ambiguity outcome",
    "what remains non-authorized until closure",
    "Every row preserves future evidence only, partial/gap where applicable",
  ], matrix);
});

test("all D007-ECP-001 through D007-ECP-033 rows exist", () => {
  for (let index = 1; index <= 33; index += 1) {
    assertIncludesAll([`D007-ECP-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("required implementation / authorization evidence definition exists", () => {
  assertIncludesAll([
    "Future evidence would need, at minimum:",
    "tracked implementation diff where implementation is claimed",
    "scoped implementation rationale",
    "explicit affected and non-affected surfaces",
    "CI evidence creation authorization",
    "CI run/evidence artifact evidence",
    "CI/local-log separation evidence",
    "local-log-not-packet-component boundary evidence",
    "runtime certification record only if separately authorized",
    "technical sign-off record only if separately authorized",
    "External Reviewer approval record only if explicitly provided",
    "release approval record only if separately authorized",
    "product candidate selection authorization only if separately authorized",
    "external-use authorization only if separately authorized",
    "delivery-to-External Reviewer authorization only if separately authorized",
    "packet approval record only if separately authorized",
    "packet component approval record only if separately authorized",
    "final delivery decision only if separately authorized",
    "PDF packet authorization only if separately authorized",
    "archive/ZIP authorization only if separately authorized",
    "generated PDF repo-evidence approval only if separately authorized",
    "generated PDF packet-component approval only if separately authorized",
    "runtime/API/schema/package behavior-change authorization only if separately authorized",
    "dependency 001-006 closure or explicit non-requirement review",
    "no-raw/no-private/no-source-locator/no-token/no-URL delivery posture",
    "rollback/fail-closed posture",
    "human/professional review preservation",
    "None of this evidence exists yet for dependency 007 closure.",
  ], implementationEvidence);
});

test("required test / CI evidence definition exists", () => {
  assertIncludesAll([
    "Future test/CI evidence would need, at minimum:",
    "CI evidence proof",
    "CI/local-log separation tests",
    "local-log-not-packet-component tests",
    "no-release-approval-overclaim tests",
    "no-runtime-certification-overclaim tests",
    "no-technical-signoff-overclaim tests",
    "no-External Reviewer-approval-overclaim tests",
    "no-product-candidate-overclaim tests",
    "no-external-use-overclaim tests",
    "no-delivery-to-External Reviewer-overclaim tests",
    "no-packet-approval-overclaim tests",
    "no-packet-component-approval-overclaim tests",
    "no-final-delivery-decision-overclaim tests",
    "no-PDF-packet-overclaim tests",
    "no-archive-ZIP-overclaim tests",
    "generated-PDF-not-repo-evidence tests",
    "generated-PDF-not-packet-component tests",
    "no-raw/no-private/no-source-locator/no-token/no-URL delivery tests",
    "upstream dependency closure/non-requirement tests",
    "implementation tests if implementation is claimed",
    "CI tests only if CI is claimed",
    "None of this test/CI evidence exists yet for dependency 007 closure.",
  ], testEvidence);
});

test("closure criteria definition exists", () => {
  assertIncludesAll([
    "Closure requires all required implementation or authorization evidence tracked.",
    "Closure requires all required test/CI evidence tracked.",
    "Closure requires separate future blocker-status update.",
    "Closure requires the negative boundary preserved.",
    "Closure requires dependency order preserved.",
    "Closure requires upstream dependencies 001/002/003/004/005/006 reviewed and not overread as closure unless separately closed.",
    "Closure requires CI evidence created only if separately authorized.",
    "Closure requires local logs preserved as not CI evidence and not packet components.",
    "Closure requires release approval separately authorized.",
    "Closure requires runtime certification separately authorized.",
    "Closure requires technical sign-off separately authorized.",
    "Closure requires External Reviewer approval separately authorized.",
    "Closure requires product candidate separately selected.",
    "Closure requires external-use separately authorized.",
    "Closure requires delivery and packet approval separately authorized.",
    "Closure requires generated PDF/ZIP/archive posture separately authorized if claimed.",
    "Closure requires human/professional release gate preserved.",
    "Closure requires explicit future user-authorized closure posture.",
    "Closure requires focused proof test for closure boundary.",
    "Closure requires no overclaiming tokens.",
    "Closure criteria do not mean closure.",
    "Closure criteria are not met.",
    "No closure is created by this boundary.",
  ], closureCriteria);
});

test("dependency links exist", () => {
  assertIncludesAll([
    "Upstream dependency 001 remains not closed.",
    "Upstream dependency 002 remains not closed.",
    "Upstream dependency 003 remains not closed.",
    "Upstream dependency 004 remains not closed.",
    "Upstream dependency 005 remains not closed.",
    "Upstream dependency 006 remains not closed.",
    "RBAC/admin-support implementation remains absent.",
    "Audit/access-log implementation remains absent.",
    "Retention/deletion implementation remains absent.",
    "Raw-material routing implementation remains absent.",
    "Third-party routing remains unauthorized.",
    "Provider integration remains absent.",
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
    "Packet component approval remains absent.",
    "Final delivery decision remains absent.",
    "Human/professional review remains release gate.",
  ], dependencyLinks);
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
    "Human/professional review remains release gate.",
    "Continued pause is valid.",
  ], evidenceLimits);
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
    "This boundary creates no severity.",
    "This boundary creates no remediation.",
    "This boundary creates no local log file inspection.",
    "This boundary creates no delivery package generation.",
    "This boundary creates no packet approval.",
  ], negativeAuthorization);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "Evidence plan does not mean evidence exists.",
    "Closure plan does not mean closure.",
    "Evidence/closure boundary does not mean implementation-readiness authorization.",
    "Evidence/closure boundary does not mean implementation.",
    "Status/gap suitability does not mean dependency 007 is implementation-ready.",
    "Partial/gap review does not mean dependency closure.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Required CI evidence does not mean CI evidence exists.",
    "Dependency 007 evidence plan does not mean dependency 007 is closed.",
    "CI evidence plan does not mean CI evidence exists.",
    "Local log plan does not mean local logs are CI evidence.",
    "Local log plan does not mean local logs are packet components.",
    "Release plan does not mean release approval exists.",
    "Runtime certification plan does not mean runtime certification exists.",
    "Technical sign-off plan does not mean technical sign-off exists.",
    "External Reviewer approval plan does not mean External Reviewer approval exists.",
    "Product candidate plan does not mean product candidate selected.",
    "External-use plan does not mean external-use authorized.",
    "Delivery plan does not mean delivery authorized.",
    "Packet approval plan does not mean packet approved.",
    "Packet component plan does not mean packet component approved.",
    "Final delivery decision plan does not mean final delivery decision exists.",
    "Generated PDF plan does not mean generated PDF is repo evidence.",
    "Generated PDF plan does not mean generated PDF is packet component.",
    "PDF packet plan does not mean PDF packet exists.",
    "Archive/ZIP plan does not mean archive/ZIP exists.",
    "Local log boundary does not mean local logs are CI evidence.",
    "Local log boundary does not mean local logs are packet components.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ], noOverclaim);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "REVIEW_ONLY_DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("forbidden exact overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "DEPENDENCY_007_IMPLEMENTATION_READY",
    "DEPENDENCY_007_READY_FOR_IMPLEMENTATION",
    "DEPENDENCY_007_IMPLEMENTED",
    "DEPENDENCY_007_CLOSED",
    "DEPENDENCY_007_BLOCKER_RESOLVED",
    "EVIDENCE_PLAN_AUTHORIZES_IMPLEMENTATION",
    "EVIDENCE_PLAN_AUTHORIZES_RUNTIME",
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
