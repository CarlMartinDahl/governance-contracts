const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY_v1.md",
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

const matrix = sectionBetween("## Dependency 007 Status/Gap Matrix", "## Required Implementation / Authorization Evidence Definition");
const recommendations = sectionBetween("## Recommended Smallest Safe Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_STATUS_GAP_ONLY",
    "DEPENDENCY_007_STATUS_GAP_PARTIAL_GAP",
    "DEPENDENCY_007_STATUS_GAP_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_IMPLEMENTATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_RUNTIME_READY",
    "DEPENDENCY_007_STATUS_GAP_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_007_STATUS_GAP_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "DEPENDENCY_007_STATUS_GAP_NOT_CI_EVIDENCE_CREATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_CI_CERTIFICATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_LOCAL_LOG_PROMOTION_TO_CI_EVIDENCE",
    "DEPENDENCY_007_STATUS_GAP_NOT_LOCAL_LOG_PROMOTION_TO_PACKET_COMPONENT",
    "DEPENDENCY_007_STATUS_GAP_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_007_STATUS_GAP_NOT_RUNTIME_CERTIFICATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_TECHNICAL_SIGN_OFF",
    "DEPENDENCY_007_STATUS_GAP_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "DEPENDENCY_007_STATUS_GAP_NOT_PRODUCT_READINESS",
    "DEPENDENCY_007_STATUS_GAP_NOT_PRODUCT_CANDIDATE",
    "DEPENDENCY_007_STATUS_GAP_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "DEPENDENCY_007_STATUS_GAP_NOT_PACKET_APPROVAL",
    "DEPENDENCY_007_STATUS_GAP_NOT_PACKET_COMPONENT_APPROVAL",
    "DEPENDENCY_007_STATUS_GAP_NOT_FINAL_DELIVERY_DECISION",
    "DEPENDENCY_007_STATUS_GAP_NOT_PDF_PACKET",
    "DEPENDENCY_007_STATUS_GAP_NOT_ARCHIVE_ZIP",
    "DEPENDENCY_007_STATUS_GAP_NOT_GENERATED_PDF_AS_REPO_EVIDENCE",
    "DEPENDENCY_007_STATUS_GAP_NOT_GENERATED_PDF_AS_PACKET_COMPONENT",
    "DEPENDENCY_007_STATUS_GAP_NOT_VALIDATOR_DISPATCH",
    "DEPENDENCY_007_STATUS_GAP_NOT_REGISTRY_LOOKUP",
    "DEPENDENCY_007_STATUS_GAP_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "DEPENDENCY_007_STATUS_GAP_NOT_WORKFLOW_ENFORCEMENT",
    "DEPENDENCY_007_STATUS_GAP_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_RETENTION_DELETION_IMPLEMENTATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_PROVIDER_INTEGRATION",
    "DEPENDENCY_007_STATUS_GAP_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "DEPENDENCY_007_STATUS_GAP_NOT_SOURCE_PACKAGE_INSPECTION",
    "DEPENDENCY_007_STATUS_GAP_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "DEPENDENCY_007_STATUS_GAP_NOT_METADATA_ACQUISITION",
    "DEPENDENCY_007_STATUS_GAP_NOT_REAL_PRIVATE_RUN",
    "DEPENDENCY_007_STATUS_GAP_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_007_STATUS_GAP_NOT_DEPENDENCY_CLOSURE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "freezes the completed PROVE_ONLY dependency-007 CI/release-gate/product/external-use implementation-readiness status/gap review",
    "The status/gap review is non-authorizing.",
    "The status/gap review is partial/gap.",
    "The status/gap review does not authorize implementation-readiness.",
    "The status/gap review does not authorize implementation.",
    "The status/gap review does not close dependency 007.",
    "The status/gap review does not resolve blockers.",
    "The status/gap review does not create runtime behavior.",
    "The status/gap review does not create CI evidence, CI certification, release approval, runtime certification, technical sign-off, External Reviewer approval, product readiness, product candidate, external-use, delivery, packet approval, packet component approval, final delivery decision, PDF packet, archive/ZIP, generated PDF repo evidence, implementation evidence, test evidence, or dependency closure.",
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
    "DEPENDENCY_007_PROVE_ONLY_REVIEW_IS_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "835d6ff docs(domain): freeze dependency-006 validator registry runtime gate planning round summary boundary",
    "DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE_REVIEWED_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "PROVE_ONLY_DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_STATUS_GAP_REVIEWED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_006_VALIDATOR_REGISTRY_RUNTIME_GATE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_003_RETENTION_DELETION_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DEPENDENCY_001_GLOBAL_ACCESS_CONTROL_RBAC_ADMIN_SUPPORT_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("dependency 007 scope exists", () => {
  assertIncludesAll([
    "Dependency 007 follows dependency 006 in roadmap order.",
    "Dependency 007 covers CI evidence boundary.",
    "Dependency 007 covers local logs as not CI evidence.",
    "Dependency 007 covers local logs as not packet components.",
    "Dependency 007 covers focused proof tests as tested-scenario evidence only.",
    "Dependency 007 covers npm test/lint/build validation history as not release approval.",
    "Dependency 007 covers runtime certification boundary.",
    "Dependency 007 covers technical sign-off boundary.",
    "Dependency 007 covers External Reviewer approval boundary.",
    "Dependency 007 covers release approval boundary.",
    "Dependency 007 covers human/professional review release gate.",
    "Dependency 007 covers product candidate selection boundary.",
    "Dependency 007 covers external-use authorization boundary.",
    "Dependency 007 covers delivery to External Reviewer boundary.",
    "Dependency 007 covers packet approval boundary.",
    "Dependency 007 covers packet component approval boundary.",
    "Dependency 007 covers final delivery decision boundary.",
    "Dependency 007 covers generated PDF / PDF packet boundary.",
    "Dependency 007 covers archive / ZIP boundary.",
    "Dependency 007 covers generated PDF as not repo evidence unless separately approved.",
    "Dependency 007 covers runtime/API/schema/package behavior change boundary.",
    "Dependency 007 covers upstream dependencies 001-006 closure dependency.",
    "Dependency 007 covers RBAC/admin-support dependency.",
    "Dependency 007 covers audit/access-log dependency.",
    "Dependency 007 covers retention/deletion dependency.",
    "Dependency 007 covers raw-material routing dependency.",
    "Dependency 007 covers third-party/provider dependency.",
    "Dependency 007 covers validator/registry/runtime-gate dependency.",
    "Dependency 007 covers no-raw/no-private/no-source-locator/no-token/no-URL delivery posture.",
    "Dependency 007 covers implementation evidence.",
    "Dependency 007 covers test evidence.",
    "Dependency 007 covers CI evidence.",
    "Dependency 007 covers closure criteria.",
    "Dependency 007 covers non-authorization boundary.",
  ]);
});

test("dependency 007 current status exists", () => {
  assertIncludesAll([
    "Dependency 007 remains blocked.",
    "Dependency 007 remains not implemented.",
    "Dependency 007 remains not closed.",
    "Dependency 007 has no tracked implementation closure evidence.",
    "Dependency 007 has no tracked test closure evidence.",
    "Dependency 007 has no tracked CI closure evidence.",
    "Upstream dependency 001 remains not closed and must not be treated as closure.",
    "Upstream dependency 002 remains not closed and must not be treated as closure.",
    "Upstream dependency 003 remains not closed and must not be treated as closure.",
    "Upstream dependency 004 remains not closed and must not be treated as closure.",
    "Upstream dependency 005 remains not closed and must not be treated as closure.",
    "Upstream dependency 006 remains not closed and must not be treated as closure.",
    "CI evidence remains not created.",
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
    "Generated PDFs are not repo evidence or packet components unless separately approved.",
    "Archive/ZIP generation remains absent/not approved.",
    "Human/professional review remains release gate.",
    "Closure criteria are not met.",
    "Closure criteria do not mean closure.",
  ]);
});

test("status/gap matrix exists with required columns", () => {
  assertIncludesAll([
    "row ID",
    "surface",
    "current evidence level",
    "current blocker status",
    "implementation/evidence gap",
    "required implementation or authorization evidence",
    "required test/CI evidence",
    "closure criteria",
    "what remains non-authorized until closure",
    "Every row preserves blocked or future-only status, partial/gap posture where applicable",
  ], matrix);
});

test("all D007-CRP-001 through D007-CRP-033 rows exist", () => {
  for (let index = 1; index <= 33; index += 1) {
    assertIncludesAll([`D007-CRP-${String(index).padStart(3, "0")}`], matrix);
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
    "runtime/API/schema/package behavior-change authorization only if separately authorized",
    "dependency 001-006 closure or explicit non-requirement review",
    "no-raw/no-private/no-source-locator/no-token/no-URL delivery posture",
    "rollback/fail-closed posture",
    "human/professional review preservation",
    "None of this evidence exists yet for dependency 007 closure.",
  ]);
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
  ]);
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
    "Product candidate remains none.",
    "External-use remains unauthorized.",
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
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "Status/gap boundary does not mean implementation-readiness authorization.",
    "Status/gap boundary does not mean implementation.",
    "Status/gap row does not mean blocker closure.",
    "Partial/gap review does not mean dependency closure.",
    "CI evidence row does not mean CI evidence exists.",
    "Local log row does not mean local logs are CI evidence.",
    "Local log row does not mean local logs are packet components.",
    "Proof-test row does not mean runtime certainty.",
    "npm test/lint/build history row does not mean release approval.",
    "Runtime certification row does not mean runtime certification exists.",
    "Technical sign-off row does not mean technical sign-off exists.",
    "External Reviewer approval row does not mean External Reviewer approval exists.",
    "Release approval row does not mean release approval exists.",
    "Product candidate row does not mean product candidate selected.",
    "External-use row does not mean external-use authorized.",
    "Delivery row does not mean delivery authorized.",
    "Packet approval row does not mean packet approved.",
    "Packet component row does not mean packet component approved.",
    "Final delivery decision row does not mean final delivery decision exists.",
    "Generated PDF row does not mean generated PDF is repo evidence.",
    "PDF packet row does not mean PDF packet exists.",
    "Archive/ZIP row does not mean archive/ZIP exists.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Required CI evidence does not mean CI evidence exists.",
    "Closure criteria do not mean closure.",
    "Dependency 007 status/gap suitability does not mean dependency 007 is implementation-ready.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_007_CI_RELEASE_GATE_PRODUCT_EXTERNAL_USE_IMPLEMENTATION_READINESS_STATUS_GAP_BOUNDARY",
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
