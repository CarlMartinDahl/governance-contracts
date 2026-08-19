const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_BOUNDARY_v1.md",
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
  "## SIO-CANDIDATE Matrix",
  "## Synthetic Input/Output Candidate-Scope Summary After D007 Posture",
);
const summary = sectionBetween(
  "## Synthetic Input/Output Candidate-Scope Summary After D007 Posture",
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
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_BOUNDARY",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_ONLY",
    "DOCS_ONLY",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_PARTIAL_GAP_CONTEXT",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NON_AUTHORIZING",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_IMPLEMENTATION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_RUNTIME_BEHAVIOR",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_SYNTHETIC_CANDIDATE_SELECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_ACTUAL_TEST_MATERIAL_SELECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_PILOT_AUTHORIZATION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_PILOT_EXECUTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_REAL_PRIVATE_RUN",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_SOURCE_PACKAGE_INSPECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_METADATA_ACQUISITION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_LOCAL_LOG_INSPECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_CI_EVIDENCE",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_RELEASE_APPROVAL",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_PRODUCT_CANDIDATE",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_EXTERNAL_USE_AUTHORIZATION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_DELIVERY",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_PACKET_APPROVAL",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_BLOCKER_RESOLUTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_NOT_DEPENDENCY_CLOSURE",
    "CANDIDATE_SCOPE_REVIEW_ONLY",
    "SYNTHETIC_MANUALLY_SANITIZED_ONLY",
    "NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_NO_TOKEN_NO_URL",
    "NO_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SELECTED",
    "NO_ACTUAL_TEST_MATERIAL_SELECTED",
    "PILOT_EXECUTION_REMAINS_UNAUTHORIZED",
    "REAL_PRIVATE_RUN_REMAINS_BLOCKED",
    "CI_EVIDENCE_REMAINS_ABSENT",
    "RELEASE_APPROVAL_REMAINS_ABSENT",
    "PRODUCT_CANDIDATE_REMAINS_NONE",
    "EXTERNAL_USE_REMAINS_UNAUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only synthetic input/output candidate-scope review after D007 CI/release/product/external-use posture as DOCS_ONLY repo evidence only.",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_BOUNDARY",
    "This is candidate-scope review only.",
    "This boundary does not authorize synthetic input/output candidate selection, actual test-material selection, pilot execution, real private run, raw/private/source inspection, source-package/PDF/image/screenshot/metadata inspection, metadata acquisition, local log inspection, CI evidence, release approval, product candidate, external-use, delivery, packet approval, legal/clinical/evidentiary/case-truth conclusions, blocker resolution, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_BOUNDARY_CONTROLS_CURRENT_D007_CONTEXT",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_BOUNDARY_CONTROLS_CURRENT_PILOT_SCOPE_CONTEXT",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_BOUNDARY_CONTROLS_CURRENT_D006_CONTEXT",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_BOUNDARY_CONTROLS_CURRENT_D005_CONTEXT",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_BOUNDARY_CONTROLS_CURRENT_D004_CONTEXT",
    "D003_RETENTION_DELETION_AFTER_D002_AUDIT_ACCESS_LOG_BOUNDARY_CONTROLS_CURRENT_D003_CONTEXT",
    "D002_AUDIT_ACCESS_LOG_AFTER_D001_RBAC_ADMIN_SUPPORT_BOUNDARY_CONTROLS_CURRENT_D002_CONTEXT",
    "D001_RBAC_ADMIN_SUPPORT_AFTER_DATA_HANDLING_CONTROL_PLAN_BOUNDARY_CONTROLS_CURRENT_D001_CONTEXT",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY_CONTROLS_CURRENT_DATA_HANDLING_CONTEXT",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_BOUNDARY_CONTROLS_CURRENT_DHC_ALIGNMENT_CONTEXT",
    "TECHNICAL_VERIFICATION_NO_RAW_TRACE_CONTEXT_IS_ADVISORY_CONTEXT_ONLY",
    "FAILURE_MODE_REGISTER_USED_AS_NO_OVERCLAIM_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "63cce7e docs(context): refresh new-thread handoff after D007 CI release product external-use posture boundary",
    "7cadab0 docs(domain): freeze D007 CI release product external-use posture after local sanitized pilot scope boundary",
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
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_COMPLETED_NO_CHANGE",
    "POST_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
  ]);
});

test("prior read-only review result exists", () => {
  assertIncludesAll([
    "REVIEW_ONLY synthetic input/output candidate scope after D007 CI/release/product/external-use posture was performed.",
    "A future DOCS_ONLY synthetic input/output candidate-scope boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not convert candidate-scope review into candidate selection, actual test-material selection, pilot execution, real private run, implementation-readiness authorization, implementation, runtime behavior, CI evidence, release approval, product candidate, external-use authorization, delivery, packet approval, blocker closure, or dependency closure.",
  ]);
});

test("SIO-CANDIDATE matrix exists and all rows exist", () => {
  assertIncludesAll([
    "row ID",
    "candidate-scope surface",
    "current tracked evidence level",
    "relation to D007 posture and D001-D007 order",
    "current blocker/status",
    "upstream dependencies",
    "downstream dependencies",
    "intended future enforcement or authorization layer, if any",
    "implementation/execution/evidence gap",
    "required future authorization evidence",
    "required future test/CI evidence",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY review only",
  ], matrix);

  for (let index = 1; index <= 30; index += 1) {
    assertIncludesAll([`SIO-CANDIDATE-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("required row content exists", () => {
  assertIncludesAll([
    "Candidate planning posture remains DOCS_ONLY partial/gap after D007 posture.",
    "Synthetic/manually sanitized input-only requirement remains future-only.",
    "Actual test-material selection remains absent and unauthorized.",
    "Pilot execution remains unauthorized.",
    "Real private run remains blocked.",
    "Raw/private/source material is prohibited.",
    "Source locators, private paths, filenames, and page references are prohibited.",
    "URLs, tokens, and secrets are prohibited.",
    "PDF/image/screenshot/metadata inspection is prohibited.",
    "Metadata acquisition is prohibited.",
    "Local log inspection is prohibited.",
    "Local logs are not CI evidence and not packet components.",
    "D007 non-authorization remains controlling.",
    "CI evidence, release approval, runtime certification, technical sign-off, and External Reviewer approval remain absent.",
    "Product candidate remains none, external-use remains unauthorized, and delivery remains unauthorized.",
    "Packet, PDF packet, archive, and ZIP remain absent/unauthorized.",
    "Legal, clinical, evidentiary, and case-truth conclusions are prohibited.",
    "Credibility, risk, sufficiency, police-report, and pleading outputs are prohibited.",
    "Human/professional review remains release gate.",
    "D001-D007 prerequisite blockers remain visible and unresolved/not closed.",
    "Allowed synthetic input candidate classes are future-only and must remain non-real/non-private/no-raw/no-locator/no-token/no-URL.",
    "Prohibited input candidate classes include raw source, private facts, source locators, filenames/private paths, page references, URLs, tokens, secrets, PDF/image/screenshot/metadata content, local logs, real private material, source packages, untracked private files, and any source-adjacent evidence material.",
    "Allowed output candidate classes are limited to scope/status markers, allowed/prohibited class lists, fail-closed statuses, review-route notes, and future proof-test needs.",
    "Prohibited output classes include legal/clinical/evidentiary/case-truth conclusions, credibility/risk/sufficiency scores, police reports, pleadings, product claims, delivery outputs, external-use claims, findings, severity, and remediation.",
    "Expected fail-closed statuses include NOT_AUTHORIZED, BLOCKED, FUTURE_ONLY, DOCS_ONLY, NO_RAW, NO_PRIVATE, NO_SOURCE_LOCATOR, NO_TOKEN, NO_URL, NO_METADATA_ACQUISITION, NO_LOCAL_LOG_INSPECTION, NO_SYNTHETIC_CANDIDATE_SELECTION, NO_ACTUAL_TEST_MATERIAL_SELECTION, NO_PILOT_EXECUTION, REAL_PRIVATE_RUN_BLOCKED, HUMAN_PROFESSIONAL_REVIEW_REQUIRED.",
    "Failure modes to preserve include raw-content leak, scope leak, legal conclusion leak, clinical conclusion leak, metadata-as-proof, source-completeness overclaim, DOCS_ONLY-as-runtime overclaim, generated-PDF-as-evidence, external-use overclaim, and product-candidate overclaim.",
    "Future proof-test needs are future-only and do not mean test evidence exists.",
    "Implementation evidence remains absent.",
    "Closure criteria are not met and remain future-only.",
    "Continued pause preserves no approvals, sign-offs, findings, severity, remediation, product, external-use, delivery, packet approval, blocker resolution, or dependency closure.",
  ]);
});

test("synthetic input/output candidate-scope summary exists", () => {
  assertIncludesAll([
    "synthetic input/output candidate-scope is the next suitable review-only surface after D007 posture",
    "D007 non-authorization is now frozen and handoff-safe",
    "candidate scope can remain strictly candidate-only",
    "candidate scope can remain strictly synthetic/manually sanitized/no-raw/no-private/no-source-locator/no-token/no-URL",
    "candidate scope can be defined without actual test-material selection",
    "candidate scope can be defined without pilot execution",
    "candidate scope can be defined without real private run",
    "candidate scope can be defined without local logs",
    "candidate scope can be defined without raw/private/source inspection",
    "candidate scope can be defined without source-package/PDF/image/screenshot/metadata inspection",
    "candidate scope can be defined without metadata acquisition",
    "D007 non-authorization remains preserved",
    "CI evidence, release approval, runtime certification, technical sign-off, External Reviewer approval, product candidate, external-use, delivery, packet approval, final delivery decision, PDF packet, archive, and ZIP remain absent/unauthorized",
    "no legal/clinical/evidentiary/case-truth conclusions are allowed",
    "no credibility/risk/sufficiency/police-report/pleading outputs are allowed",
    "human/professional review remains release gate",
    "no implementation-readiness authorization is created now",
    "no implementation is created now",
    "no synthetic input/output candidate is selected now",
    "no pilot execution is authorized now",
    "real private run is not authorized now",
    "synthetic input/output candidate-scope cannot be closed now",
  ], summary);
});

test("required non-authorizations exist", () => {
  assertIncludesAll([
    "implementation-readiness",
    "implementation",
    "runtime behavior",
    "runtime/API/schema/package behavior change",
    "synthetic input/output candidate selection",
    "actual test-material selection",
    "local sanitized test pilot authorization",
    "local sanitized test pilot execution",
    "real private run",
    "raw/private/source inspection",
    "source package inspection",
    "PDF/image/screenshot/metadata inspection",
    "metadata acquisition",
    "local log inspection",
    "local logs as CI evidence",
    "local logs as packet components",
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
    "synthetic input/output candidate-scope boundary is not synthetic input/output candidate selection",
    "synthetic input/output candidate-scope boundary is not actual test-material selection",
    "synthetic input/output candidate-scope boundary is not pilot authorization",
    "synthetic input/output candidate-scope boundary is not pilot execution",
    "synthetic input/output candidate-scope boundary is not real private run",
    "synthetic input/output candidate-scope boundary is not raw/private/source inspection",
    "synthetic input/output candidate-scope boundary is not source-package/PDF/image/screenshot/metadata inspection",
    "synthetic input/output candidate-scope boundary is not metadata acquisition",
    "synthetic input/output candidate-scope boundary is not local log inspection",
    "synthetic input/output candidate-scope boundary is not CI evidence",
    "synthetic input/output candidate-scope boundary is not release approval",
    "synthetic input/output candidate-scope boundary is not product candidate",
    "synthetic input/output candidate-scope boundary is not external-use authorization",
    "synthetic input/output candidate-scope boundary is not delivery authorization",
    "synthetic input/output candidate-scope boundary is not packet approval",
    "allowed synthetic input vocabulary does not mean actual input exists",
    "prohibited input classes do not mean those materials were inspected",
    "allowed output classes do not mean output was generated",
    "future proof tests do not mean tests exist",
    "required implementation evidence does not mean evidence exists",
    "required CI does not mean CI exists",
    "tests remain tested-scenario evidence, not runtime certainty",
    "local logs are not CI evidence",
    "local logs are not packet components",
    "green tests are not release approval",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "product candidate requires separate explicit selection",
    "external-use requires separate explicit authorization",
    "human/professional review remains release gate",
    "continued pause is valid",
  ], evidenceLimits);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "candidate-scope review does not mean synthetic input/output candidate selection",
    "candidate-scope review does not mean actual test material was selected",
    "synthetic/manually sanitized row does not mean real material exists",
    "no-raw row does not mean raw material was inspected",
    "no source-locator row does not mean source locators were inspected",
    "no token/URL/secret row does not mean credentials or endpoints were inspected",
    "no PDF/image/screenshot/metadata row does not mean those materials were inspected",
    "no metadata row does not mean metadata was acquired",
    "no local-log row does not mean local logs were inspected",
    "local logs not CI row does not mean CI evidence exists",
    "no real private run row does not mean real private run is authorized",
    "no pilot execution row does not mean pilot execution is authorized",
    "D007 non-authorization row does not authorize D007",
    "no conclusion row does not authorize legal/clinical/evidentiary/case-truth conclusions",
    "no product/external-use row does not authorize product candidate or external-use",
    "no delivery/packet row does not authorize delivery, PDF packet, archive, or ZIP",
    "no runtime/API/schema/package row does not authorize runtime behavior",
    "D001-D007 blocker visibility row does not close blockers",
    "allowed input classes row does not authorize real/private/source input",
    "allowed output classes row does not authorize conclusions",
    "prohibited output classes row does not create findings/severity/remediation",
    "fail-closed status row does not create implementation",
    "failure modes row does not mean failure modes were exercised now",
    "future proof-test needs row does not mean proof tests exist",
    "closure criteria do not mean closure",
    "any future candidate selection requires separate explicit authorization",
    "any future pilot execution requires separate explicit authorization",
    "any future implementation-readiness authorization requires separate explicit authorization",
    "any future implementation requires separate explicit authorization",
    "any future product candidate requires separate explicit selection",
    "any future external-use requires separate explicit authorization",
  ], noOverclaim);
});

test("External Reviewer posture exists", () => {
  assertIncludesAll([
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY synthetic input/output candidate-scope boundary after D007, preserving strictly synthetic/manually sanitized inputs, no actual test-material selection, no pilot execution, no real private run, no raw/private/source/log/metadata inspection, no CI evidence, no release approval, no product candidate, no external-use, no delivery, and no blocker/dependency closure?",
    "external-review requirements remains advisory context only, not approval, sign-off, implementation-readiness authorization, implementation authorization, runtime certification, release approval, product candidate, external-use authorization, delivery authorization, packet approval, CI evidence, local sanitized pilot authorization, real private run authorization, D007 closure, blocker resolution, or dependency closure.",
  ], externalReviewer);
});

test("recommended next posture is review-only, docs-only handoff refresh, or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommended);
});

test("rejects exact overclaiming tokens", () => {
  assertDoesNotIncludeExactToken([
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AUTHORIZES_IMPLEMENTATION_READINESS",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AUTHORIZES_IMPLEMENTATION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_SELECTS_SYNTHETIC_CANDIDATE",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_SELECTS_ACTUAL_TEST_MATERIAL",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AUTHORIZES_PILOT",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AUTHORIZES_PILOT_EXECUTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_EXECUTES_PILOT",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AUTHORIZES_REAL_PRIVATE_RUN",
    "SYNTHETIC_CANDIDATE_SELECTED",
    "ACTUAL_TEST_MATERIAL_SELECTED",
    "LOCAL_SANITIZED_TEST_PILOT_AUTHORIZED",
    "LOCAL_SANITIZED_TEST_PILOT_EXECUTED",
    "REAL_PRIVATE_RUN_AUTHORIZED",
    "REAL_PRIVATE_RUN_STARTED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "LOCAL_LOG_INSPECTION_AUTHORIZED",
    "LOCAL_LOGS_ARE_CI_EVIDENCE",
    "LOCAL_LOGS_ARE_PACKET_COMPONENTS",
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
    "BLOCKER_RESOLVED",
    "DEPENDENCY_CLOSED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ]);
});
