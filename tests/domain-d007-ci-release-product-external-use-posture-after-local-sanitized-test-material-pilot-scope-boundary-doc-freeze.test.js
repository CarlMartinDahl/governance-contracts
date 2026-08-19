const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(entries, text = docsText) {
  for (const entry of entries) {
    assert.match(text, new RegExp(escapeRegExp(entry)), `missing ${entry}`);
  }
}

function assertDoesNotIncludeExactToken(entries, text = docsText) {
  for (const entry of entries) {
    const pattern = new RegExp(
      `(?<![A-Z0-9_])${escapeRegExp(entry)}(?![A-Z0-9_])`,
    );
    assert.doesNotMatch(text, pattern, `forbidden exact token ${entry}`);
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing section ${startHeading}`);
  const end = endHeading
    ? docsText.indexOf(endHeading, start + startHeading.length)
    : docsText.length;
  assert.notEqual(end, -1, `missing end section ${endHeading}`);
  return docsText.slice(start, end);
}

const matrix = sectionBetween(
  "## D007-CPEU Matrix",
  "## D007 CI/Release/Product/External-Use Posture Summary After Local Sanitized Pilot-Scope",
);
const summary = sectionBetween(
  "## D007 CI/Release/Product/External-Use Posture Summary After Local Sanitized Pilot-Scope",
  "## Required Non-Authorizations",
);
const nonAuthorizations = sectionBetween(
  "## Required Non-Authorizations",
  "## Evidence Limits",
);
const evidenceLimits = sectionBetween("## Evidence Limits", "## No-Overclaim Rules");
const noOverclaim = sectionBetween("## No-Overclaim Rules", "## External Reviewer Posture");
const externalReviewer = sectionBetween("## External Reviewer Posture", "## Recommended Next Posture");
const recommended = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docsPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_BOUNDARY",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_ONLY",
    "DOCS_ONLY",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_PARTIAL_GAP_CONTEXT",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NON_AUTHORIZING",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_IMPLEMENTATION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_RUNTIME_BEHAVIOR",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_CI_EVIDENCE",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_RELEASE_APPROVAL",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_RUNTIME_CERTIFICATION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_TECHNICAL_SIGN_OFF",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_PRODUCT_CANDIDATE",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_EXTERNAL_USE_AUTHORIZATION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_PACKET_APPROVAL",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_FINAL_DELIVERY_DECISION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_PDF_PACKET",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_ARCHIVE_ZIP",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_LOCAL_SANITIZED_TEST_PILOT_EXECUTION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_ACTUAL_TEST_MATERIAL_SELECTION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_REAL_PRIVATE_RUN",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_SOURCE_PACKAGE_INSPECTION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_METADATA_ACQUISITION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_LOCAL_LOG_INSPECTION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_CONCLUSIONS",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_CREDIBILITY_RISK_SUFFICIENCY_POLICE_REPORT_PLEADING_OUTPUTS",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_BLOCKER_RESOLUTION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_NOT_DEPENDENCY_CLOSURE",
    "CI_EVIDENCE_REMAINS_ABSENT",
    "LOCAL_LOGS_REMAIN_NOT_CI_EVIDENCE",
    "LOCAL_LOGS_REMAIN_NOT_PACKET_COMPONENTS",
    "GREEN_TESTS_REMAIN_NOT_RELEASE_APPROVAL",
    "RELEASE_APPROVAL_REMAINS_ABSENT",
    "RUNTIME_CERTIFICATION_REMAINS_ABSENT",
    "TECHNICAL_SIGN_OFF_REMAINS_ABSENT",
    "EXTERNAL_REVIEWER_APPROVAL_REMAINS_ABSENT",
    "PRODUCT_CANDIDATE_REMAINS_NONE",
    "EXTERNAL_USE_REMAINS_UNAUTHORIZED",
    "DELIVERY_TO_EXTERNAL_REVIEWER_REMAINS_UNAUTHORIZED",
    "PACKET_APPROVAL_REMAINS_ABSENT",
    "FINAL_DELIVERY_DECISION_REMAINS_ABSENT",
    "PDF_PACKET_REMAINS_ABSENT",
    "ARCHIVE_ZIP_REMAINS_ABSENT",
    "GENERATED_PDF_NOT_REPO_EVIDENCE_NOT_PACKET_COMPONENT_UNLESS_SEPARATELY_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "D001_D006_PREREQUISITES_REMAIN_UNRESOLVED_NOT_CLOSED",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only D007 CI/release/product/external-use posture review after local sanitized test-material pilot-scope as DOCS_ONLY repo evidence only.",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_BOUNDARY",
    "This is posture review only.",
    "D007 CI/release/product/external-use posture is the next suitable review-only surface after local sanitized pilot-scope.",
    "D007 posture should precede any synthetic input/output candidate-scope that might otherwise be overread as product or external-use readiness.",
    "This boundary does not authorize CI evidence, release approval, runtime certification, technical sign-off, External Reviewer approval, product candidate, external-use, delivery, packet approval, final delivery decision, PDF packet, archive/ZIP, pilot execution, actual test-material selection, real private run, raw/private/source/log/metadata inspection, legal/clinical/evidentiary/case-truth conclusions, blocker resolution, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_BOUNDARY_CONTROLS_CURRENT_PILOT_SCOPE_CONTEXT",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_BOUNDARY_CONTROLS_CURRENT_D006_CONTEXT",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_BOUNDARY_CONTROLS_CURRENT_D005_CONTEXT",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_BOUNDARY_CONTROLS_CURRENT_D004_CONTEXT",
    "D003_RETENTION_DELETION_AFTER_D002_AUDIT_ACCESS_LOG_BOUNDARY_CONTROLS_CURRENT_D003_CONTEXT",
    "D002_AUDIT_ACCESS_LOG_AFTER_D001_RBAC_ADMIN_SUPPORT_BOUNDARY_CONTROLS_CURRENT_D002_CONTEXT",
    "D001_RBAC_ADMIN_SUPPORT_AFTER_DATA_HANDLING_CONTROL_PLAN_BOUNDARY_CONTROLS_CURRENT_D001_CONTEXT",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY_CONTROLS_CURRENT_DATA_HANDLING_CONTEXT",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_BOUNDARY_CONTROLS_CURRENT_DHC_ALIGNMENT_CONTEXT",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_CONTEXT_IS_DOWNSTREAM_CONTEXT_ONLY",
    "TECHNICAL_VERIFICATION_NO_RAW_TRACE_CONTEXT_IS_ADVISORY_CONTEXT_ONLY",
    "FAILURE_MODE_REGISTER_USED_AS_NO_OVERCLAIM_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "6e3bc9e docs(context): refresh new-thread handoff after local sanitized pilot scope boundary",
    "4d6276e docs(domain): freeze local sanitized pilot scope after runtime gate inventory boundary",
    "78ceb94 docs(domain): freeze runtime gate inventory posture after D005 third-party routing boundary",
    "78c27b5 docs(domain): freeze D005 third-party/provider routing after D004 raw-material routing boundary",
    "4f26035 docs(domain): freeze D004 raw material routing after D003 retention deletion boundary",
    "4fd0b26 docs(domain): freeze D003 retention deletion after D002 audit boundary",
    "af1fd3b docs(domain): freeze D002 audit access log after D001 boundary",
    "21f8c0d docs(domain): freeze D001 RBAC admin support after data handling control plan boundary",
    "070133e docs(domain): freeze data handling control plan after DHC alignment boundary",
    "58c4e4f docs(domain): freeze DHC alignment after D001-D007 reprioritization boundary",
    "39c28ea docs(domain): freeze D001-D007 post-trust-spine reprioritization boundary",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_COMPLETED_NO_CHANGE",
    "POST_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
  ]);
});

test("prior read-only review result exists", () => {
  assertIncludesAll([
    "REVIEW_ONLY D007 CI/release/product/external-use posture after local sanitized test-material pilot-scope was performed.",
    "A future DOCS_ONLY D007 CI/release/product/external-use posture boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not convert posture review into CI evidence, release approval, runtime certification, technical sign-off, External Reviewer approval, product candidate, external-use authorization, delivery, packet approval, final delivery decision, PDF packet, archive/ZIP, local sanitized pilot execution, actual test-material selection, real private run, blocker closure, or dependency closure.",
  ]);
});

test("D007-CPEU matrix exists and all rows exist", () => {
  assertIncludesAll([
    "row ID",
    "D007 posture surface",
    "current tracked evidence level",
    "relation to pilot-scope and D001-D007 order",
    "current blocker/status",
    "upstream dependencies",
    "downstream dependencies",
    "intended future authorization/enforcement layer, if any",
    "implementation/evidence gap",
    "required future authorization evidence",
    "required future test/CI evidence",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY review only",
  ], matrix);

  for (let index = 1; index <= 30; index += 1) {
    assertIncludesAll([`D007-CPEU-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("required row content exists", () => {
  assertIncludesAll([
    "D007 planning posture remains DOCS_ONLY partial/gap after local sanitized pilot-scope.",
    "CI evidence remains absent.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
    "Green tests are validation history only and not release approval.",
    "Release approval remains absent.",
    "Runtime certification remains absent.",
    "Technical sign-off remains absent.",
    "External Reviewer approval remains absent.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "Delivery-to-External Reviewer remains unauthorized.",
    "Packet approval remains absent.",
    "Final delivery decision remains absent.",
    "PDF packet remains absent.",
    "Archive/ZIP remains absent.",
    "Generated PDF is not repo evidence and not packet component unless separately authorized.",
    "Local sanitized pilot execution remains unauthorized.",
    "Actual test-material selection remains absent.",
    "Real private run remains blocked.",
    "Raw/private/source inspection remains prohibited.",
    "Source-package/PDF/image/screenshot/metadata inspection remains prohibited.",
    "Metadata acquisition remains prohibited.",
    "Legal, clinical, evidentiary, and case-truth conclusions remain prohibited.",
    "Credibility, risk, sufficiency, police-report, and pleading outputs remain prohibited.",
    "Human/professional review remains release gate.",
    "D001-D006 prerequisite blockers remain visible and unresolved/not closed.",
    "Implementation evidence is absent.",
    "Closure criteria are not met and remain future-only.",
    "Continued pause preserves no approvals, sign-offs, findings, severity, remediation, product, external-use, delivery, packet approval, blocker resolution, or dependency closure.",
  ]);
});

test("D007 CI/release/product/external-use posture summary exists", () => {
  assertIncludesAll([
    "D007 CI/release/product/external-use posture is the next suitable review-only surface after local sanitized pilot-scope.",
    "D007 posture should precede any synthetic input/output candidate-scope that might otherwise be overread as product or external-use readiness.",
    "CI evidence remains absent.",
    "Local logs remain not CI evidence.",
    "Local logs remain not packet components.",
    "Green tests remain not release approval.",
    "Release approval remains absent.",
    "Runtime certification remains absent.",
    "Technical sign-off remains absent.",
    "External Reviewer approval remains absent.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "Delivery, packet approval, final delivery decision, PDF packet, archive, and ZIP remain unauthorized/absent.",
    "Local sanitized pilot execution remains unauthorized.",
    "Actual test-material selection remains absent.",
    "Real private run remains blocked.",
    "Raw/private/source/log/metadata inspection remains prohibited or absent.",
    "Legal/clinical/evidentiary/case-truth conclusions remain prohibited.",
    "Human/professional review remains release gate.",
    "D001-D006 prerequisites remain unresolved/not closed.",
    "D007 cannot be closed now.",
    "No implementation-readiness authorization is created now.",
    "No implementation is created now.",
  ], summary);
});

test("required non-authorizations exist", () => {
  assertIncludesAll([
    "implementation-readiness",
    "implementation",
    "runtime behavior",
    "runtime/API/schema/package behavior change",
    "CI evidence",
    "release approval",
    "runtime certification",
    "technical sign-off",
    "External Reviewer approval",
    "product candidate",
    "external-use authorization",
    "delivery to External Reviewer",
    "packet approval",
    "packet component approval",
    "final delivery decision",
    "PDF packet",
    "generated PDF as repo evidence",
    "generated PDF as packet component",
    "archive/ZIP",
    "PDF generation",
    "ZIP generation",
    "local sanitized test pilot authorization",
    "local sanitized test pilot execution",
    "actual test-material selection",
    "real private run",
    "raw/private/source inspection",
    "source package inspection",
    "PDF/image/screenshot/metadata inspection",
    "metadata acquisition",
    "local log inspection",
    "local logs as CI evidence",
    "local logs as packet components",
    "legal conclusion",
    "clinical conclusion",
    "evidentiary conclusion",
    "case-truth conclusion",
    "credibility finding",
    "risk score",
    "sufficiency score",
    "police report",
    "pleading",
    "runtime gate implementation",
    "runtime gate movement",
    "validator dispatch",
    "registry/lookup",
    "schema enforcement creation",
    "workflow enforcement creation",
    "third-party/provider routing implementation or authorization",
    "provider integration",
    "provider registry",
    "data-routing map",
    "token/URL/secret handling",
    "raw-material routing implementation",
    "retention implementation",
    "deletion implementation",
    "audit/access-log implementation",
    "RBAC/access-control implementation",
    "DHC implementation",
    "DHC closure",
    "blocker resolution",
    "dependency closure",
    "finding",
    "severity",
    "remediation",
  ], nonAuthorizations);
});

test("evidence limits exist", () => {
  assertIncludesAll([
    "D007 posture boundary is not CI evidence.",
    "D007 posture boundary is not release approval.",
    "D007 posture boundary is not runtime certification.",
    "D007 posture boundary is not technical sign-off.",
    "D007 posture boundary is not External Reviewer approval.",
    "D007 posture boundary is not product candidate.",
    "D007 posture boundary is not external-use authorization.",
    "D007 posture boundary is not delivery authorization.",
    "D007 posture boundary is not packet approval.",
    "D007 posture boundary is not final delivery decision.",
    "D007 posture boundary is not PDF packet.",
    "D007 posture boundary is not archive/ZIP.",
    "D007 posture boundary is not pilot execution.",
    "D007 posture boundary is not actual test-material selection.",
    "D007 posture boundary is not real private run.",
    "D007 posture boundary is not raw/private/source inspection.",
    "D007 posture boundary is not source-package/PDF/image/screenshot/metadata inspection.",
    "D007 posture boundary is not metadata acquisition.",
    "D007 posture boundary is not local log inspection.",
    "D007 posture boundary is not legal/clinical/evidentiary/case-truth conclusion.",
    "Green tests do not mean release approval.",
    "Local logs do not mean CI evidence.",
    "Local logs do not mean packet components.",
    "Generated PDF does not mean repo evidence.",
    "Generated PDF does not mean packet component.",
    "Required CI does not mean CI exists.",
    "Required implementation evidence does not mean evidence exists.",
    "Future proof tests do not mean tests exist.",
    "Tests remain tested-scenario evidence, not runtime certainty.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "Product candidate requires separate explicit selection.",
    "External-use requires separate explicit authorization.",
    "Human/professional review remains release gate.",
    "Continued pause is valid.",
  ], evidenceLimits);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "D007 review does not mean CI evidence exists.",
    "D007 review does not mean release approval exists.",
    "D007 review does not mean runtime certification exists.",
    "D007 review does not mean technical sign-off exists.",
    "D007 review does not mean External Reviewer approval exists.",
    "D007 review does not mean product candidate exists.",
    "D007 review does not mean external-use is authorized.",
    "D007 review does not mean delivery is authorized.",
    "D007 review does not mean packet approval exists.",
    "D007 review does not mean final delivery decision exists.",
    "D007 review does not mean PDF packet exists.",
    "D007 review does not mean archive/ZIP exists.",
    "Local logs not CI row does not create CI evidence.",
    "Local logs not packet row does not create packet components.",
    "Green tests row does not authorize release.",
    "Generated PDF row does not create repo evidence.",
    "Generated PDF row does not create packet component.",
    "Pilot execution row does not authorize pilot execution.",
    "Actual test-material row does not select actual test material.",
    "Real private run row does not authorize real private run.",
    "Source/log/metadata inspection rows do not authorize inspection.",
    "Conclusion rows do not authorize legal/clinical/evidentiary/case-truth conclusions.",
    "Human/professional review gate row does not create release approval.",
    "D001-D006 prerequisite row does not close blockers.",
    "Implementation evidence absence row does not mean implementation evidence exists.",
    "Closure criteria row does not mean closure.",
    "D007 before synthetic candidate scope does not mean synthetic candidate scope is authorized.",
    "Any future CI evidence requires separate explicit CI evidence creation.",
    "Any future release approval requires separate explicit release approval.",
    "Any future product candidate requires separate explicit product candidate selection.",
    "Any future external-use requires separate explicit external-use authorization.",
    "Any future delivery or packet approval requires separate explicit authorization.",
    "Any future implementation-readiness authorization requires separate explicit authorization.",
    "Any future implementation requires separate explicit authorization.",
  ], noOverclaim);
});

test("External Reviewer posture exists", () => {
  assertIncludesAll([
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY D007 CI/release/product/external-use posture boundary after local sanitized pilot-scope, preserving no CI evidence, no release approval, no product candidate, no external-use, no delivery, no packet/PDF/archive, no pilot execution, no real private run, and no blocker/dependency closure?",
    "external-review requirements remains advisory context only, not approval, sign-off, implementation-readiness authorization, implementation authorization, runtime certification, release approval, product candidate, external-use authorization, delivery authorization, packet approval, CI evidence, local sanitized pilot authorization, real private run authorization, D007 closure, blocker resolution, or dependency closure.",
  ], externalReviewer);
});

test("recommended next posture is limited and non-authorized", () => {
  assertIncludesAll([
    "REVIEW_ONLY_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommended);
});

test("forbidden overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AUTHORIZES_IMPLEMENTATION_READINESS",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AUTHORIZES_IMPLEMENTATION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_CREATES_CI_EVIDENCE",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_CREATES_RELEASE_APPROVAL",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_CREATES_RUNTIME_CERTIFICATION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_CREATES_TECHNICAL_SIGN_OFF",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_CREATES_EXTERNAL_REVIEWER_APPROVAL",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_SELECTS_PRODUCT_CANDIDATE",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AUTHORIZES_EXTERNAL_USE",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AUTHORIZES_DELIVERY",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_CREATES_PACKET_APPROVAL",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_CREATES_FINAL_DELIVERY_DECISION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_CREATES_PDF_PACKET",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_CREATES_ARCHIVE_ZIP",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AUTHORIZES_PILOT_EXECUTION",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_SELECTS_ACTUAL_TEST_MATERIAL",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AUTHORIZES_REAL_PRIVATE_RUN",
    "CI_EVIDENCE_EXISTS",
    "CI_EVIDENCE_CREATED",
    "RELEASE_APPROVAL_CREATED",
    "RUNTIME_CERTIFICATION_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "EXTERNAL_REVIEWER_APPROVAL_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
    "DELIVERY_TO_EXTERNAL_REVIEWER_AUTHORIZED",
    "PACKET_APPROVAL_CREATED",
    "PACKET_COMPONENT_APPROVED",
    "FINAL_DELIVERY_DECISION_CREATED",
    "PDF_PACKET_CREATED",
    "ARCHIVE_ZIP_CREATED",
    "PDF_CREATED",
    "ZIP_CREATED",
    "LOCAL_SANITIZED_TEST_PILOT_AUTHORIZED",
    "LOCAL_SANITIZED_TEST_PILOT_EXECUTED",
    "ACTUAL_TEST_MATERIAL_SELECTED",
    "REAL_PRIVATE_RUN_AUTHORIZED",
    "REAL_PRIVATE_RUN_STARTED",
    "LOCAL_LOGS_ARE_CI_EVIDENCE",
    "LOCAL_LOGS_ARE_PACKET_COMPONENTS",
    "LOCAL_LOG_INSPECTION_AUTHORIZED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "LEGAL_CONCLUSION_CREATED",
    "CLINICAL_CONCLUSION_CREATED",
    "EVIDENTIARY_CONCLUSION_CREATED",
    "CASE_TRUTH_CONCLUSION_CREATED",
    "CREDIBILITY_FINDING_CREATED",
    "RISK_SCORE_CREATED",
    "SUFFICIENCY_SCORE_CREATED",
    "POLICE_REPORT_CREATED",
    "PLEADING_CREATED",
    "IMPLEMENTATION_EVIDENCE_EXISTS",
    "TEST_EVIDENCE_EXISTS",
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_AUTHORIZED",
    "RUNTIME_READY",
    "MODEL_RUNTIME_READY",
    "MODEL_COMPLETE",
    "MODEL_COMPLETION_READY",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_MOVEMENT_AUTHORIZED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "SCHEMA_ENFORCEMENT_CREATED",
    "WORKFLOW_ENFORCEMENT_CREATED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "RETENTION_IMPLEMENTED",
    "DELETION_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "RBAC_IMPLEMENTED",
    "ACCESS_CONTROL_IMPLEMENTED",
    "DHC_IMPLEMENTED",
    "DHC_CLOSED",
    "D007_CLOSED",
    "D007_BLOCKER_RESOLVED",
    "BLOCKER_RESOLVED",
    "DEPENDENCY_CLOSED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ]);
});
