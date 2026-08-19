const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY_v1.md",
);

const doc = fs.readFileSync(docPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(haystack, values) {
  for (const value of values) {
    assert.match(haystack, new RegExp(escapeRegExp(value)), `missing required text: ${value}`);
  }
}

function assertDoesNotIncludeExactToken(haystack, token) {
  const tokenPattern = new RegExp(`(?<![A-Z0-9_])${escapeRegExp(token)}(?![A-Z0-9_])`);
  assert.doesNotMatch(haystack, tokenPattern, `forbidden exact token present: ${token}`);
}

function sectionBetween(heading, nextHeading) {
  const start = doc.indexOf(heading);
  assert.notEqual(start, -1, `missing section: ${heading}`);
  const afterStart = start + heading.length;
  const end = nextHeading ? doc.indexOf(nextHeading, afterStart) : doc.length;
  assert.notEqual(end, -1, `missing next section: ${nextHeading}`);
  return doc.slice(afterStart, end);
}

test("boundary doc exists and identity/status tokens are frozen", () => {
  assert.ok(fs.existsSync(docPath), "boundary doc must exist");
  assertIncludesAll(doc, [
    "Status-Family Post-Consistency Status-Token Application-Risk Scope After Status-Family Post-Token-Normalization No-Overclaim Consistency Scope Boundary v1",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_ONLY",
    "DOCS_ONLY",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_PARTIAL_GAP_CONTEXT",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_NON_AUTHORIZING",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_REVIEW_ONLY",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_RISK_REVIEW_ONLY",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_APPLICATION_RISK_REVIEW_ONLY",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_CONSISTENCY_ONLY",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_VERIFICATION_ONLY",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_TOKEN_VOCABULARY_ONLY",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_NO_NEW_TOKEN_GROUPS",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_NO_TOKEN_APPLICATION",
    "APPLICATION_RISK_REVIEW_ONLY",
    "RISK_REVIEW_ONLY",
    "CONSISTENCY_ONLY",
    "VERIFICATION_ONLY",
    "TOKEN_VOCABULARY_ONLY",
    "NO_NEW_TOKEN_GROUPS",
    "NO_TOKEN_APPLICATION",
    "STATUS_TOKEN_VOCABULARY_NOT_TOKEN_APPLICATION",
    "STATUS_TOKEN_VOCABULARY_NOT_ACTUAL_LABELS",
    "STATUS_TOKEN_VOCABULARY_NOT_APPLIED_STATUS_LABELS",
    "STATUS_TOKEN_VOCABULARY_NOT_ACTUAL_STATUS_APPLICATION",
    "STATUS_TOKEN_VOCABULARY_NOT_RUNTIME_PRODUCT_DELIVERY_STATUS_APPLICATION",
    "STATUS_TOKEN_VOCABULARY_NOT_ROUTE_BEHAVIOR",
    "STATUS_TOKEN_VOCABULARY_NOT_EVIDENCE_OR_CI",
    "NO_ACTUAL_LABEL_APPLICATION",
    "NO_APPLIED_STATUS_LABELS",
    "NO_ACTUAL_STATUS_APPLICATION",
    "NO_RUNTIME_STATUS_APPLICATION",
    "NO_PRODUCT_STATUS_APPLICATION",
    "NO_DELIVERY_STATUS_APPLICATION",
    "NO_ACTUAL_REVIEW_ROUTE_CREATED",
    "NO_REVIEW_ROUTE_EXECUTED",
    "NO_CANDIDATE_EXAMPLES",
    "NO_CANDIDATE_EXAMPLE_SELECTION",
    "NO_EXAMPLE_CANDIDATE_TEXT",
    "NO_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SELECTED",
    "NO_ACTUAL_TEST_MATERIAL_SELECTED",
    "NO_TECHNICAL_EVIDENCE_CREATED",
    "NO_CI_EVIDENCE_CREATED",
    "TESTED_SCENARIO_EVIDENCE_NOT_RUNTIME_CERTAINTY",
    "DOCS_ONLY_BOUNDARIES_REMAIN_NOT_RUNTIME_ENFORCEMENT",
    "PRODUCT_CANDIDATE_REMAINS_NONE",
    "EXTERNAL_USE_REMAINS_UNAUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_CONTINUED_PAUSE",
  ]);
});

test("purpose, source hierarchy, current state, and prior review result are explicit", () => {
  assertIncludesAll(sectionBetween("## Purpose", "## Source Hierarchy"), [
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY",
    "risk-review-only",
    "application-risk-review-only",
    "consistency-only",
    "verification-only",
    "token-vocabulary-only",
    "defines no new token groups",
    "applies no tokens",
    "Status-token vocabulary is not actual labels",
    "runtime/API/schema/package behavior",
  ]);

  assertIncludesAll(sectionBetween("## Source Hierarchy", "## Current Accepted State"), [
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_BOUNDARY_CONTROLS_CURRENT_POST_TOKEN_CONTEXT",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_BOUNDARY_CONTROLS_CURRENT_CANONICAL_TOKEN_SET_CONTEXT",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_BOUNDARY_CONTROLS_CURRENT_USAGE_RULE_CONTEXT",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY_CONTROLS_CURRENT_REPAIRED_LABEL_SET_CONTEXT",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_SUPERSEDES_50672e0_WITH_8d22d37",
    "NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_BOUNDARY_CONTROLS_CURRENT_NOCS_CONTEXT",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_BOUNDARY_CONTROLS_CURRENT_FCSL_CONTEXT",
    "REVIEW_ROUTE_STATUS_LABEL_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_BOUNDARY_CONTROLS_CURRENT_RRSL_CONTEXT",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_BOUNDARY_CONTROLS_CURRENT_VOCABULARY_CONTEXT",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_CURRENT_TEV_CONTEXT",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_BOUNDARY_CONTROLS_CURRENT_D007_CONTEXT",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);

  assertIncludesAll(sectionBetween("## Current Accepted State", "## Prior Read-Only Review Result"), [
    "8456227",
    "a110bb8",
    "0898c72 docs(context): refresh new-thread handoff after status-family canonical token-set boundary",
    "53d0401 docs(domain): freeze status-family canonical token-set scope",
    "c399e91 docs(context): refresh new-thread handoff after status-family usage-rule boundary",
    "f3345d1",
    "8d22d37",
    "77a7100 docs(context): refresh new-thread handoff after repaired status-family label-set boundary",
    "50672e0",
    "5b49934 docs(domain): freeze no-overclaim consistency scope after fail-closed status-label family boundary",
    "be1f35d docs(domain): freeze fail-closed status-label family scope after review-route status-label boundary",
    "8e2ac5f docs(domain): freeze review-route status-label scope after synthetic vocabulary boundary",
    "ee998b0 docs(domain): freeze synthetic input output candidate vocabulary scope after technical evidence verification boundary",
    "7fa91be docs(domain): freeze technical evidence verification scope after synthetic candidate scope boundary",
    "6ac88d9 docs(domain): freeze synthetic input output candidate scope after D007 posture boundary",
    "7cadab0 docs(domain): freeze D007 CI release product external-use posture after local sanitized pilot scope boundary",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_COMPLETED_NO_CHANGE",
    "POST_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_STATUS_TOKEN_APPLICATION_RISK_SCOPE_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_COMPLETED_NO_CHANGE",
    "continued pause",
  ]);

  assertIncludesAll(sectionBetween("## Prior Read-Only Review Result", "## SF-APPRISK Matrix"), [
    "REVIEW_ONLY status-family post-consistency status-token application-risk scope",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY",
    "future DOCS_ONLY status-family post-consistency status-token application-risk boundary is suitable",
    "freezes that partial/gap result only",
    "does not define new token groups",
    "does not apply tokens",
    "does not convert token vocabulary into actual labels",
    "blocker closure",
    "dependency closure",
  ]);
});

test("SF-APPRISK matrix includes all required rows", () => {
  const matrix = sectionBetween("## SF-APPRISK Matrix", "## Required Row Content");
  assertIncludesAll(matrix, [
    "| row ID | status-token application-risk surface | current tracked evidence level | relation to post-token-normalization consistency boundary, canonical-token-set boundary, usage-rule boundary, repaired status-family label-set boundary, no-overclaim consistency boundary, fail-closed status-label family boundary, review-route/status-label boundary, vocabulary boundary, TEV boundary, D007 posture, and evidence digest | overclaim risk | current blocker/status | required future evidence if separately authorized | minimum future proof tests if separately authorized | what remains non-authorized |",
    "Every row preserves DOCS_ONLY review only",
    "risk-review-only",
    "consistency-only",
    "verification-only",
    "token-vocabulary-only",
    "no new token groups",
    "no token application",
    "continued pause",
  ]);

  for (let index = 1; index <= 30; index += 1) {
    assertIncludesAll(matrix, [`SF-APPRISK-${String(index).padStart(3, "0")}`]);
  }
});

test("required row content and summary preserve application-risk posture", () => {
  assertIncludesAll(sectionBetween("## Required Row Content", "## Status-Token Application-Risk Scope Summary"), [
    "Planning posture remains DOCS_ONLY partial/gap after post-token-normalization no-overclaim consistency scope.",
    "Application-risk-review-only means reviewing risk that token vocabulary may later be overread as application.",
    "Status-token vocabulary is not token application.",
    "No new token groups are defined.",
    "No actual labels are created.",
    "No applied status labels are created.",
    "No actual status application is created.",
    "No runtime/product/delivery status application is created.",
    "No route creation or route behavior is created.",
    "No route execution is created.",
    "No evidence or CI evidence is created.",
    "No examples, candidates, or actual test material are selected.",
    "No pilot execution or real private run is authorized.",
    "No product/external-use/delivery/packet is created or authorized.",
    "No findings, severity, remediation, blocker closure, or dependency closure is created.",
    "Allowed token group application-risk review remains vocabulary-only.",
    "Prohibited token group application-risk review remains overclaim-exclusion-only.",
    "Future-authorization-required token group remains future-only.",
    "Non-evidence token group remains non-evidence-only.",
    "Non-runtime/non-enforcement token group remains non-runtime-only.",
    "No-route/no-execution token group remains no-route/no-execution-only.",
    "No-example/no-candidate/no-material token group remains no-selection-only.",
    "No-product/no-external-use/no-delivery token group remains downstream non-authorization.",
    "No-finding/no-severity/no-remediation/no-closure token group remains advisory-only.",
    "Post-token-normalization consistency, canonical-token-set, usage-rule, repaired label-set, FCSL, RRSL, vocabulary, TEV, and D007 rules remain controlling.",
    "Local logs/PDF/evidence limits remain controlling.",
    "Data-handling/D001-D007 blockers remain visible and unresolved/not closed.",
    "Future proof-test needs are future-only and do not mean proof exists.",
    "Non-authorization and continued pause remain controlling.",
  ]);

  assertIncludesAll(sectionBetween("## Status-Token Application-Risk Scope Summary", "## Required Non-Authorizations"), [
    "next suitable review-only surface",
    "risk-review-only",
    "consistency-only",
    "verification-only",
    "token-vocabulary-only",
    "defines no new token groups",
    "applies no token",
    "without actual labels",
    "without applied status labels",
    "without actual status application",
    "without runtime/product/delivery status application",
    "without route creation or route execution",
    "without examples, candidate examples, or example candidate text",
    "without candidate selection",
    "without actual test-material selection",
    "without pilot execution or real private run",
    "without technical evidence creation or CI evidence",
    "without local-log/source/metadata inspection",
    "preserves no metadata acquisition",
    "preserves D007 non-authorization",
    "preserves TEV no-overclaim rules",
    "preserves vocabulary-only no-example/no-selection rules",
    "preserves review-route/status-label no-route/no-execution rules",
    "preserves fail-closed status-family-only no-actual-label-application rules",
    "preserves repaired allowed/prohibited label-set family-set-only rules",
    "preserves status-family no-overclaim usage-rule rules",
    "preserves canonical-token-set token-normalization-only rules",
    "preserves post-token-normalization consistency no-new-token-groups rules",
    "preserves no-overclaim consistency validation-not-evidence rules",
    "preserves tested-scenario evidence, not runtime certainty",
    "preserves DOCS_ONLY boundaries not runtime enforcement",
    "preserves product candidate none and external-use unauthorized",
    "preserves human/professional review as release gate",
    "No implementation-readiness authorization is created now.",
    "Status-token application-risk scope cannot be closed now.",
  ]);
});

test("non-authorizations, evidence limits, no-overclaim, External Reviewer, and next posture stay bounded", () => {
  assertIncludesAll(sectionBetween("## Required Non-Authorizations", "## Evidence Limits"), [
    "new token groups",
    "token application",
    "actual label application",
    "applied status labels",
    "actual status application",
    "runtime status application",
    "product status application",
    "delivery status application",
    "actual review-route creation",
    "review-route execution",
    "candidate examples",
    "example candidate text",
    "actual test-material selection",
    "real private run",
    "technical evidence creation",
    "CI evidence",
    "test output capture",
    "log capture",
    "local logs as CI evidence",
    "generated PDF as repo evidence",
    "implementation-readiness",
    "runtime/API/schema/package behavior change",
    "blocker resolution",
    "dependency closure",
    "None are authorized by this boundary.",
  ]);

  assertIncludesAll(sectionBetween("## Evidence Limits", "## No-Overclaim Rules"), [
    "Status-token application-risk boundary is not token application.",
    "Status-token application-risk boundary is not actual label creation.",
    "Status-token application-risk boundary is not applied status.",
    "Status-token application-risk boundary is not runtime/product/delivery status application.",
    "Status-token application-risk boundary is not route creation.",
    "Status-token application-risk boundary is not route execution.",
    "Status-token application-risk boundary is not technical evidence.",
    "Status-token application-risk boundary is not CI evidence.",
    "Status-token application-risk boundary is not runtime certification.",
    "Status-token application-risk boundary is not technical sign-off.",
    "Status-token application-risk boundary is not release approval.",
    "Status-token application-risk boundary is not External Reviewer approval.",
    "Status-token application-risk boundary is not product candidate.",
    "Status-token application-risk boundary is not external-use authorization.",
    "Token vocabulary is not actual label creation.",
    "Validation output for this doc-freeze slice is not CI evidence.",
    "Test evidence remains tested-scenario evidence, not runtime certainty.",
    "Green tests do not mean release approval.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
    "Generated PDF is not repo evidence.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "Continued pause is valid.",
  ]);

  assertIncludesAll(sectionBetween("## No-Overclaim Rules", "## External Reviewer Posture"), [
    "Status-token vocabulary does not mean token application.",
    "Status-token vocabulary does not mean actual label exists.",
    "Status-token vocabulary does not mean label was applied.",
    "Status-token vocabulary does not mean actual status application.",
    "Status-token vocabulary does not mean runtime/product/delivery status application.",
    "Status-token vocabulary does not mean route behavior.",
    "Status-token vocabulary does not mean evidence or CI evidence.",
    "Status-token vocabulary does not create examples, candidates, or test material.",
    "Allowed token group remains vocabulary-only.",
    "Prohibited token group remains overclaim-exclusion only.",
    "Future-authorization-required token group remains future-only.",
    "Non-evidence token group remains non-evidence only.",
    "Non-runtime/non-enforcement token group remains non-runtime/non-enforcement only.",
    "Future proof-test needs do not mean proof tests exist.",
    "Implementation evidence absence does not mean implementation evidence exists.",
    "Blocker visibility does not close blockers.",
    "Closure criteria do not mean closure.",
    "Any future implementation requires separate explicit authorization.",
  ]);

  assertIncludesAll(sectionBetween("## External Reviewer Posture", "## Recommended Next Posture"), [
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY status-family post-consistency status-token application-risk boundary after the post-token-normalization no-overclaim consistency scope, limited to reviewing status-token wording risk before any token application, actual labels, applied statuses, runtime/product/delivery status application, routes, evidence, CI, examples, candidates, test material, product/external-use, delivery, findings, severity, remediation, blocker closure, dependency closure, implementation, or source/log/metadata inspection?",
    "external-review requirements remains advisory context only",
    "not approval",
    "implementation-readiness authorization",
    "token application authorization",
    "label application authorization",
    "route execution authorization",
    "blocker resolution",
    "dependency closure",
  ]);

  const nextPosture = sectionBetween("## Recommended Next Posture", null);
  assertIncludesAll(nextPosture, [
    "REVIEW_ONLY_STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_STATUS_FAMILY_POST_CONSISTENCY_STATUS_TOKEN_APPLICATION_RISK_SCOPE_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ]);
  assert.doesNotMatch(nextPosture, /RUNTIME_CHANGE|CONTRACT_ONLY|PRODUCT_CANDIDATE_SELECTED/);
});

test("forbidden exact overclaiming tokens are absent", () => {
  const forbiddenTokens = [
    "STATUS_TOKEN_APPLICATION_RISK_CREATES_NEW_TOKEN_GROUPS",
    "STATUS_TOKEN_APPLICATION_RISK_APPLIES_TOKENS",
    "STATUS_TOKEN_APPLICATION_RISK_CREATES_ACTUAL_LABELS",
    "STATUS_TOKEN_APPLICATION_RISK_APPLIES_STATUS_LABELS",
    "STATUS_TOKEN_APPLICATION_RISK_APPLIES_RUNTIME_STATUS",
    "STATUS_TOKEN_APPLICATION_RISK_APPLIES_PRODUCT_STATUS",
    "STATUS_TOKEN_APPLICATION_RISK_APPLIES_DELIVERY_STATUS",
    "STATUS_TOKEN_APPLICATION_RISK_CREATES_ROUTES",
    "STATUS_TOKEN_APPLICATION_RISK_EXECUTES_ROUTES",
    "STATUS_TOKEN_APPLICATION_RISK_CREATES_TECHNICAL_EVIDENCE",
    "STATUS_TOKEN_APPLICATION_RISK_CREATES_CI_EVIDENCE",
    "STATUS_TOKEN_APPLICATION_RISK_SELECTS_CANDIDATES",
    "STATUS_TOKEN_APPLICATION_RISK_SELECTS_TEST_MATERIAL",
    "STATUS_TOKEN_APPLICATION_CREATES_NEW_TOKEN_GROUPS",
    "STATUS_TOKEN_APPLICATION_CREATES_ACTUAL_LABELS",
    "STATUS_TOKEN_APPLICATION_APPLIES_STATUS_LABELS",
    "STATUS_TOKEN_APPLICATION_CREATES_RUNTIME_BEHAVIOR",
    "STATUS_TOKEN_APPLICATION_CREATES_ROUTE_BEHAVIOR",
    "STATUS_TOKEN_APPLICATION_CREATES_EVIDENCE",
    "TOKEN_APPLICATION_CREATED",
    "TOKEN_APPLIED",
    "ACTUAL_LABEL_APPLIED",
    "STATUS_APPLIED",
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
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_AUTHORIZED",
    "RUNTIME_READY",
    "MODEL_RUNTIME_READY",
    "MODEL_COMPLETE",
    "MODEL_COMPLETION_READY",
    "BLOCKER_RESOLVED",
    "DEPENDENCY_CLOSED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ];

  for (const token of forbiddenTokens) {
    assertDoesNotIncludeExactToken(doc, token);
  }
});
