const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_BOUNDARY_v1.md",
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

const matrix = sectionBetween("## FCSL-SCOPE Matrix", "## Required Row Content");
const rowContent = sectionBetween(
  "## Required Row Content",
  "## Fail-Closed Status-Label Family Scope Summary After Review-Route/Status-Label Scope",
);
const summary = sectionBetween(
  "## Fail-Closed Status-Label Family Scope Summary After Review-Route/Status-Label Scope",
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
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_BOUNDARY",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_ONLY",
    "DOCS_ONLY",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_PARTIAL_GAP_CONTEXT",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NON_AUTHORIZING",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_STATUS_FAMILY_ONLY",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_FAIL_CLOSED_LABEL_FAMILY_ONLY",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_ACTUAL_LABEL_APPLICATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_RUNTIME_STATUS_APPLICATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_PRODUCT_STATUS_APPLICATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_DELIVERY_STATUS_APPLICATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_ACTUAL_ROUTE_CREATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_ROUTE_EXECUTION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_RUNTIME_ROUTE_CREATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_WORKFLOW_ROUTE_CREATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_SCHEMA_ROUTE_CREATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_DELIVERY_ROUTE_CREATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_PACKET_ROUTE_CREATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_PRODUCT_EXTERNAL_USE_ROUTE_CREATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_CANDIDATE_ROUTE_CREATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_CANDIDATE_EXAMPLES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_CANDIDATE_SELECTION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_ACTUAL_TEST_MATERIAL_SELECTION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_PILOT_EXECUTION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_REAL_PRIVATE_RUN",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_TECHNICAL_EVIDENCE_CREATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_CI_EVIDENCE",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_RELEASE_APPROVAL",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_RUNTIME_CERTIFICATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_TECHNICAL_SIGN_OFF",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_PRODUCT_CANDIDATE",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_EXTERNAL_USE_AUTHORIZATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_DELIVERY",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_PACKET_APPROVAL",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_FINAL_DELIVERY_DECISION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_PDF_PACKET",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_ARCHIVE_ZIP",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_SOURCE_PACKAGE_INSPECTION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_METADATA_ACQUISITION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_LOCAL_LOG_INSPECTION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_IMPLEMENTATION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_RUNTIME_BEHAVIOR",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_BLOCKER_RESOLUTION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_NOT_DEPENDENCY_CLOSURE",
    "STATUS_FAMILY_SCOPE_REVIEW_ONLY",
    "STATUS_FAMILY_ONLY",
    "FAIL_CLOSED_LABEL_FAMILY_ONLY",
    "NO_ACTUAL_LABEL_APPLICATION",
    "NO_RUNTIME_STATUS_APPLICATION",
    "NO_PRODUCT_STATUS_APPLICATION",
    "NO_DELIVERY_STATUS_APPLICATION",
    "NO_ACTUAL_REVIEW_ROUTE_CREATED",
    "NO_REVIEW_ROUTE_EXECUTED",
    "NO_RUNTIME_ROUTE_CREATED",
    "NO_WORKFLOW_ROUTE_CREATED",
    "NO_SCHEMA_ROUTE_CREATED",
    "NO_DELIVERY_ROUTE_CREATED",
    "NO_PACKET_ROUTE_CREATED",
    "NO_PRODUCT_EXTERNAL_USE_ROUTE_CREATED",
    "NO_CANDIDATE_ROUTE_CREATED",
    "NO_CANDIDATE_EXAMPLES",
    "NO_CANDIDATE_EXAMPLE_SELECTION",
    "NO_EXAMPLE_CANDIDATE_TEXT",
    "NO_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SELECTED",
    "NO_ACTUAL_TEST_MATERIAL_SELECTED",
    "PILOT_EXECUTION_REMAINS_UNAUTHORIZED",
    "REAL_PRIVATE_RUN_REMAINS_BLOCKED",
    "NO_TECHNICAL_EVIDENCE_CREATED",
    "NO_CI_EVIDENCE_CREATED",
    "TESTED_SCENARIO_EVIDENCE_NOT_RUNTIME_CERTAINTY",
    "DOCS_ONLY_BOUNDARIES_REMAIN_NOT_RUNTIME_ENFORCEMENT",
    "PRODUCT_CANDIDATE_REMAINS_NONE",
    "EXTERNAL_USE_REMAINS_UNAUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_CONTINUED_PAUSE",
  ]);
});

test("purpose, source hierarchy, current state, and prior result exist", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only fail-closed status-label family scope review after review-route/status-label scope.",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_BOUNDARY",
    "This is status-family scope review only.",
    "This is status-family-only.",
    "This is fail-closed label-family-only.",
    "This boundary does not create or apply actual labels.",
    "This boundary does not apply labels in runtime, product, or delivery context.",
    "This boundary does not create or execute actual routes.",
    "This boundary does not create runtime, workflow, schema, delivery, packet, product/external-use, or candidate routes.",
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "REVIEW_ROUTE_STATUS_LABEL_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_BOUNDARY_CONTROLS_CURRENT_RRSL_CONTEXT",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_BOUNDARY_CONTROLS_CURRENT_VOCABULARY_CONTEXT",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_CURRENT_TEV_CONTEXT",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AFTER_D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_BOUNDARY_CONTROLS_CURRENT_CANDIDATE_SCOPE_CONTEXT",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_BOUNDARY_CONTROLS_CURRENT_D007_CONTEXT",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_BOUNDARY_CONTROLS_CURRENT_PILOT_SCOPE_CONTEXT",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_BOUNDARY_CONTROLS_CURRENT_D006_CONTEXT",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY_CONTROLS_CURRENT_DATA_HANDLING_CONTEXT",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_BOUNDARY_CONTROLS_CURRENT_DHC_ALIGNMENT_CONTEXT",
    "TECHNICAL_VERIFICATION_NO_RAW_TRACE_CONTEXT_IS_ADVISORY_CONTEXT_ONLY",
    "FAILURE_MODE_REGISTER_USED_AS_NO_OVERCLAIM_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
    "8eefc48 docs(context): refresh new-thread handoff after review-route status-label boundary",
    "8e2ac5f docs(domain): freeze review-route status-label scope after synthetic vocabulary boundary",
    "ee998b0 docs(domain): freeze synthetic input output candidate vocabulary scope after technical evidence verification boundary",
    "7fa91be docs(domain): freeze technical evidence verification scope after synthetic candidate scope boundary",
    "6ac88d9 docs(domain): freeze synthetic input output candidate scope after D007 posture boundary",
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
    "REVIEW_ROUTE_STATUS_LABEL_SCOPE_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_COMPLETED_NO_CHANGE",
    "POST_REVIEW_ROUTE_STATUS_LABEL_SCOPE_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_COMPLETED_NO_CHANGE",
    "REVIEW_ONLY fail-closed status-label family scope after review-route/status-label scope was performed.",
    "A future DOCS_ONLY fail-closed status-label family boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
  ]);
});

test("FCSL-SCOPE matrix exists and all rows exist", () => {
  assertIncludesAll([
    "row ID",
    "fail-closed status-label family surface",
    "current tracked evidence level",
    "relation to review-route/status-label boundary, vocabulary boundary, TEV boundary, D007 posture, and evidence digest",
    "overclaim risk",
    "current blocker/status",
    "required future evidence if separately authorized",
    "minimum future proof tests if separately authorized",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY review only",
  ], matrix);

  for (let index = 1; index <= 30; index += 1) {
    assertIncludesAll([`FCSL-SCOPE-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("required row content exists", () => {
  assertIncludesAll([
    "Planning posture remains DOCS_ONLY partial/gap after review-route/status-label scope.",
    "Fail-closed status-family-only boundary means broad status families only, not runtime-applied status, not product status, not delivery status, not implementation, not enforcement, and not decisions.",
    "NOT_AUTHORIZED is a fail-closed family only and creates no approval/denial action.",
    "BLOCKED is a fail-closed family only and does not resolve blockers.",
    "FUTURE_ONLY is a fail-closed family only and does not mean future evidence exists.",
    "DOCS_ONLY is a fail-closed family only and is not runtime enforcement.",
    "LABEL_STATUS_ONLY and REVIEW_ROUTE_NOTE_CATEGORY_ONLY are scope labels only and do not create actual routes or route execution.",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED preserves the release gate and creates no approval, sign-off, or External Reviewer approval.",
    "NO_ROUTE_EXECUTION and NO_ACTUAL_ROUTE_CREATION preserve no route creation and no execution.",
    "NO_RUNTIME_WORKFLOW_SCHEMA_ROUTE_CREATION preserves no runtime/workflow/schema route implementation.",
    "NO_DELIVERY_PACKET_PRODUCT_EXTERNAL_USE_ROUTE_CREATION preserves no delivery, packet, product, or external-use route.",
    "NO_CANDIDATE_ROUTE_CREATION preserves no candidate routes.",
    "NO_EXAMPLES / NO_CANDIDATE_SELECTION / NO_EXAMPLE_CANDIDATE_TEXT preserve no examples, no candidates, and no candidate text.",
    "NO_ACTUAL_TEST_MATERIAL_SELECTION preserves no test-material selection.",
    "NO_PILOT_EXECUTION / REAL_PRIVATE_RUN_BLOCKED preserves no pilot/private run.",
    "NO_RAW / NO_PRIVATE / NO_SOURCE_LOCATOR preserves no source inspection.",
    "NO_TOKEN / NO_URL / NO_METADATA_ACQUISITION preserves no metadata, URL, token, or secret handling.",
    "NO_LOCAL_LOG_INSPECTION / LOCAL_LOGS_NOT_CI_EVIDENCE / LOCAL_LOGS_NOT_PACKET_COMPONENTS preserves no log inspection and no log promotion.",
    "NO_TECHNICAL_EVIDENCE / NO_CI_EVIDENCE / TESTED_SCENARIO_NOT_RUNTIME_CERTAINTY preserves no evidence creation and no runtime certainty.",
    "NO_RUNTIME_CERTIFICATION / NO_TECHNICAL_SIGN_OFF / NO_RELEASE_APPROVAL / NO_EXTERNAL_REVIEWER_APPROVAL preserves no approvals.",
    "PRODUCT_CANDIDATE_NONE / EXTERNAL_USE_UNAUTHORIZED preserves no product/external-use.",
    "NO_DELIVERY / NO_PACKET_APPROVAL / NO_FINAL_DELIVERY_DECISION / NO_PDF_PACKET / NO_ARCHIVE_ZIP preserves no delivery packet.",
    "NO_IMPLEMENTATION / NO_RUNTIME_BEHAVIOR / DOCS_ONLY_NOT_RUNTIME_ENFORCEMENT preserves no implementation.",
    "NO_LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_CONCLUSION preserves no conclusions.",
    "NO_CREDIBILITY_RISK_SUFFICIENCY_POLICE_REPORT_PLEADING_OUTPUT preserves no reports or scores.",
    "NO_FINDING / NO_SEVERITY / NO_REMEDIATION preserves no findings, severity, or remediation.",
    "NO_BLOCKER_RESOLUTION / NO_DEPENDENCY_CLOSURE preserves unresolved blockers.",
    "D007, TEV, vocabulary-only, and review-route/status-label no-overclaim rules remain controlling.",
    "Future proof-test needs are future-only and do not mean tests exist.",
    "Implementation evidence remains absent.",
    "Closure criteria are not met and remain future-only.",
    "Continued pause preserves no approvals, sign-offs, evidence creation, findings, severity, remediation, product, external-use, delivery, packet approval, blocker resolution, or dependency closure.",
  ], rowContent);
});

test("summary, non-authorizations, evidence limits, and no-overclaim rules exist", () => {
  assertIncludesAll([
    "fail-closed status-label family scope is the next suitable review-only surface after review-route/status-label scope",
    "it can remain status-family-only",
    "it can remain fail-closed label-family-only",
    "it can be defined without actual label application in runtime/product/delivery context",
    "it can be defined without actual route creation",
    "it can be defined without route execution",
    "it preserves D007 non-authorization",
    "it preserves TEV no-overclaim rules",
    "it preserves vocabulary-only no-example/no-selection rules",
    "it preserves review-route/status-label no-route/no-execution rules",
    "fail-closed status-label family scope cannot be closed now",
  ], summary);

  assertIncludesAll([
    "No authorization is created for actual label application",
    "runtime/API/schema/package behavior change",
    "validator dispatch",
    "registry/lookup",
    "third-party/provider routing implementation or authorization",
    "token/URL/secret handling",
    "DHC closure",
    "finding, severity, or remediation",
  ], nonAuthorizations);

  assertIncludesAll([
    "fail-closed status-label family boundary is not actual label application",
    "fail-closed status-label family boundary is not runtime status application",
    "fail-closed status-label family boundary is not product status application",
    "fail-closed status-label family boundary is not delivery status application",
    "fail-closed status-label family boundary is not actual route creation",
    "status family does not mean status was applied at runtime",
    "future proof tests do not mean tests exist",
    "required implementation evidence does not mean evidence exists",
    "test evidence remains tested-scenario evidence, not runtime certainty",
    "green tests do not mean release approval",
    "local logs are not CI evidence",
    "generated PDF is not packet component",
    "continued pause is valid",
  ], evidenceLimits);

  assertIncludesAll([
    "fail-closed status-label family review does not mean actual labels exist",
    "fail-closed status-label family review does not mean labels were applied",
    "label/status family row does not create runtime behavior",
    "allowed label row does not authorize actual labels in product/runtime/delivery context",
    "prohibited label row does not mean prohibited outputs were generated or inspected",
    "D007 non-authorization row does not authorize D007",
    "TEV no-overclaim row does not create technical evidence",
    "vocabulary-only row does not select examples, candidates, or material",
    "review-route/status-label row does not create routes or route execution",
    "any future implementation requires separate explicit authorization",
  ], noOverclaim);
});

test("External Reviewer posture and recommended next posture are non-authorizing", () => {
  assertIncludesAll([
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY fail-closed status-label family boundary after review-route/status-label scope",
    "external-review requirements remains advisory context only",
  ], externalReviewer);

  assertIncludesAll([
    "REVIEW_ONLY_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommended);
});

test("forbidden exact overclaiming tokens are absent from the boundary doc", () => {
  assertDoesNotIncludeExactToken([
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_APPLIES_ACTUAL_LABELS",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_APPLIES_RUNTIME_STATUS",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_APPLIES_PRODUCT_STATUS",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_APPLIES_DELIVERY_STATUS",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_CREATES_ACTUAL_ROUTES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_EXECUTES_ROUTES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_CREATES_RUNTIME_ROUTES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_CREATES_WORKFLOW_ROUTES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_CREATES_SCHEMA_ROUTES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_CREATES_DELIVERY_ROUTES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_CREATES_PACKET_ROUTES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_CREATES_PRODUCT_EXTERNAL_USE_ROUTES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_CREATES_CANDIDATE_ROUTES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_SELECTS_CANDIDATE_EXAMPLES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_INCLUDES_CANDIDATE_EXAMPLES",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_DEFINES_EXAMPLE_CANDIDATE_TEXT",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_SELECTS_SYNTHETIC_CANDIDATE",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_SELECTS_ACTUAL_TEST_MATERIAL",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AUTHORIZES_PILOT_EXECUTION",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AUTHORIZES_REAL_PRIVATE_RUN",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_CREATES_TECHNICAL_EVIDENCE",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_CREATES_CI_EVIDENCE",
    "ACTUAL_LABEL_APPLIED",
    "RUNTIME_STATUS_APPLIED",
    "PRODUCT_STATUS_APPLIED",
    "DELIVERY_STATUS_APPLIED",
    "ACTUAL_REVIEW_ROUTE_CREATED",
    "REVIEW_ROUTE_EXECUTED",
    "RUNTIME_ROUTE_CREATED",
    "WORKFLOW_ROUTE_CREATED",
    "SCHEMA_ROUTE_CREATED",
    "DELIVERY_ROUTE_CREATED",
    "PACKET_ROUTE_CREATED",
    "PRODUCT_EXTERNAL_USE_ROUTE_CREATED",
    "CANDIDATE_ROUTE_CREATED",
    "CANDIDATE_EXAMPLES_SELECTED",
    "CANDIDATE_EXAMPLES_INCLUDED",
    "EXAMPLE_CANDIDATE_TEXT_DEFINED",
    "SYNTHETIC_CANDIDATE_SELECTED",
    "ACTUAL_TEST_MATERIAL_SELECTED",
    "LOCAL_SANITIZED_TEST_PILOT_AUTHORIZED",
    "LOCAL_SANITIZED_TEST_PILOT_EXECUTED",
    "REAL_PRIVATE_RUN_AUTHORIZED",
    "REAL_PRIVATE_RUN_STARTED",
    "TECHNICAL_EVIDENCE_CREATED",
    "CI_EVIDENCE_EXISTS",
    "CI_EVIDENCE_CREATED",
    "TEST_OUTPUT_CAPTURED_AS_EVIDENCE",
    "LOCAL_LOGS_CAPTURED_AS_EVIDENCE",
    "LOCAL_LOG_INSPECTION_AUTHORIZED",
    "LOCAL_LOGS_ARE_CI_EVIDENCE",
    "LOCAL_LOGS_ARE_PACKET_COMPONENTS",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
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
