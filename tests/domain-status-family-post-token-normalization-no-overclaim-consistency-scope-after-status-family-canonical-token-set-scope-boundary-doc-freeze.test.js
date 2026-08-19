const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_BOUNDARY_v1.md",
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
    "Status-Family Post-Token-Normalization No-Overclaim Consistency Scope After Status-Family Canonical Token-Set Scope Boundary v1",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_BOUNDARY",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_ONLY",
    "DOCS_ONLY",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_PARTIAL_GAP_CONTEXT",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_NON_AUTHORIZING",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_REVIEW_ONLY",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_CONSISTENCY_ONLY",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_VERIFICATION_ONLY",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_TOKEN_VOCABULARY_ONLY",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_NO_NEW_TOKEN_GROUPS",
    "POST_TOKEN_NORMALIZATION_CONSISTENCY_ONLY",
    "TOKEN_NORMALIZATION_NO_OVERCLAIM_ONLY",
    "CONSISTENCY_ONLY",
    "VERIFICATION_ONLY",
    "TOKEN_VOCABULARY_ONLY",
    "NO_NEW_TOKEN_GROUPS",
    "CANONICAL_TOKEN_GROUPS_REMAIN_VOCABULARY_ONLY",
    "TOKEN_NORMALIZATION_NOT_ACTUAL_LABELS",
    "TOKEN_NORMALIZATION_NOT_APPLIED_STATUS_LABELS",
    "TOKEN_NORMALIZATION_NOT_RUNTIME_PRODUCT_DELIVERY_STATUS_APPLICATION",
    "TOKEN_NORMALIZATION_NOT_ROUTE_BEHAVIOR",
    "TOKEN_NORMALIZATION_NOT_EVIDENCE_OR_CI",
    "NO_ACTUAL_LABEL_APPLICATION",
    "NO_APPLIED_STATUS_LABELS",
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
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_CONTINUED_PAUSE",
  ]);
});

test("purpose, source hierarchy, current state, and prior review result are explicit", () => {
  assertIncludesAll(sectionBetween("## Purpose", "## Source Hierarchy"), [
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_BOUNDARY",
    "post-token-normalization consistency-only",
    "token-normalization no-overclaim only",
    "verification-only",
    "token-vocabulary-only",
    "No new token groups are created.",
    "Canonical token groups remain vocabulary only.",
    "does not create actual labels",
    "does not create CI evidence",
    "runtime/API/schema/package behavior",
  ]);

  assertIncludesAll(sectionBetween("## Source Hierarchy", "## Current Accepted State"), [
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_BOUNDARY_CONTROLS_CURRENT_CANONICAL_TOKEN_SET_CONTEXT",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_BOUNDARY_CONTROLS_CURRENT_USAGE_RULE_CONTEXT",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY_CONTROLS_CURRENT_REPAIRED_LABEL_SET_CONTEXT",
    "NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_BOUNDARY_CONTROLS_CURRENT_NOCS_CONTEXT",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_BOUNDARY_CONTROLS_CURRENT_FCSL_CONTEXT",
    "REVIEW_ROUTE_STATUS_LABEL_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_BOUNDARY_CONTROLS_CURRENT_RRSL_CONTEXT",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_BOUNDARY_CONTROLS_CURRENT_VOCABULARY_CONTEXT",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_CURRENT_TEV_CONTEXT",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_BOUNDARY_CONTROLS_CURRENT_D007_CONTEXT",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY_CONTROLS_CURRENT_DATA_HANDLING_CONTEXT",
  ]);

  assertIncludesAll(sectionBetween("## Current Accepted State", "## Prior Read-Only Review Result"), [
    "0898c72 docs(context): refresh new-thread handoff after status-family canonical token-set boundary",
    "53d0401 docs(domain): freeze status-family canonical token-set scope",
    "f3345d1 docs(domain): freeze status-family no-overclaim usage-rule scope",
    "8d22d37",
    "5b49934 docs(domain): freeze no-overclaim consistency scope after fail-closed status-label family boundary",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_COMPLETED_NO_CHANGE",
    "COMBINED_READ_ONLY_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_COMPLETED_NO_CHANGE",
    "continued pause",
  ]);

  assertIncludesAll(sectionBetween("## Prior Read-Only Review Result", "## SF-POSTTOKEN Matrix"), [
    "REVIEW_ONLY status-family post-token-normalization no-overclaim consistency scope",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_BOUNDARY",
    "future DOCS_ONLY status-family post-token-normalization no-overclaim consistency boundary is suitable",
    "freezes that partial/gap result only",
    "does not convert token normalization into actual labels",
    "blocker closure",
    "dependency closure",
  ]);
});

test("SF-POSTTOKEN matrix includes all required rows", () => {
  const matrix = sectionBetween("## SF-POSTTOKEN Matrix", "## Required Row Content");
  assertIncludesAll(matrix, [
    "| row ID | post-token-normalization surface | current tracked evidence level | relation to canonical-token-set, usage-rule, repaired label-set, no-overclaim consistency, fail-closed status-label family, review-route/status-label, vocabulary, TEV, D007, data-handling, and evidence limits | overclaim risk | current blocker/status | required future evidence if separately authorized | minimum future proof tests if separately authorized | what remains non-authorized |",
    "Every row preserves DOCS_ONLY review only",
    "post-token-normalization consistency-only",
    "token-normalization no-overclaim only",
    "verification-only",
    "token-vocabulary-only",
    "no new token groups",
    "continued pause",
  ]);

  for (let index = 1; index <= 30; index += 1) {
    assertIncludesAll(matrix, [`SF-POSTTOKEN-${String(index).padStart(3, "0")}`]);
  }
});

test("required row content and summary preserve post-token no-overclaim posture", () => {
  assertIncludesAll(sectionBetween("## Required Row Content", "## Post-Token-Normalization No-Overclaim Consistency Scope Summary"), [
    "Planning posture remains DOCS_ONLY partial/gap after status-family canonical token-set scope.",
    "Post-token-normalization consistency-only means wording consistency after token normalization only, not behavior.",
    "Canonical token groups remain vocabulary only.",
    "Token normalization does not create actual labels.",
    "Token normalization does not create applied status labels.",
    "Token normalization does not create runtime/product/delivery status application.",
    "Token normalization does not create route behavior.",
    "Token normalization does not create evidence or CI evidence.",
    "Allowed token group remains vocabulary-only.",
    "Prohibited token group remains overclaim-exclusion only.",
    "Future-authorization-required token group remains future-only.",
    "Non-evidence token group remains non-evidence only.",
    "Non-runtime/non-enforcement token group remains non-runtime/non-enforcement only.",
    "No-route/no-execution token group remains no-route/no-execution only.",
    "No-example/no-candidate/no-material token group remains no-example/no-candidate/no-material only.",
    "No-product/no-external-use/no-delivery token group remains no-product/no-external-use/no-delivery only.",
    "No-finding/no-severity/no-remediation/no-closure token group remains no-finding/no-severity/no-remediation/no-closure only.",
    "Canonical-token-set boundary remains controlling.",
    "Usage-rule boundary remains controlling.",
    "Repaired allowed/prohibited label-set remains controlling.",
    "No-overclaim consistency remains controlling.",
    "Fail-closed status-family-only remains controlling.",
    "Review-route/status-label no-route/no-execution remains controlling.",
    "Vocabulary no-example/no-selection remains controlling.",
    "TEV/no-overclaim remains controlling.",
    "D007 non-authorization remains controlling.",
    "Local logs/PDF/evidence limits remain controlling.",
    "Data-handling/D001-D007 blockers remain visible and unresolved/not closed.",
    "Future proof-test needs remain future-only and do not mean proof exists.",
    "Non-authorization and continued pause remain controlling.",
  ]);

  assertIncludesAll(sectionBetween("## Post-Token-Normalization No-Overclaim Consistency Scope Summary", "## Required Non-Authorizations"), [
    "next suitable review-only surface",
    "post-token-normalization consistency-only",
    "token-normalization no-overclaim only",
    "verification-only",
    "token-vocabulary-only",
    "no-new-token-groups",
    "without actual labels",
    "without applied status labels",
    "without runtime/product/delivery status application",
    "without route creation or route execution",
    "without examples",
    "without candidate examples",
    "without example candidate text",
    "without candidate selection",
    "without actual test-material selection",
    "without pilot execution or real private run",
    "without technical evidence creation or CI evidence",
    "without local-log/source/metadata inspection",
    "preserves no metadata acquisition",
    "preserves canonical token groups as vocabulary only",
    "preserves the canonical-token-set boundary",
    "preserves the allowed token group as vocabulary-only",
    "prohibited token group as overclaim-exclusion only",
    "future-authorization-required token group as future-only",
    "non-evidence token group as non-evidence only",
    "non-runtime/non-enforcement token group as non-runtime/non-enforcement only",
    "D007 non-authorization",
    "data-handling/D001-D007 blockers",
    "human/professional review as release gate",
    "No implementation-readiness authorization is created now.",
    "Status-family post-token-normalization no-overclaim consistency scope cannot be closed now.",
  ]);
});

test("non-authorizations, evidence limits, no-overclaim, External Reviewer, and next posture stay bounded", () => {
  assertIncludesAll(sectionBetween("## Required Non-Authorizations", "## Evidence Limits"), [
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
    "local logs as CI evidence",
    "runtime/API/schema/package behavior change",
    "implementation-readiness authorization",
    "blocker resolution",
    "dependency closure",
    "None are authorized by this boundary.",
  ]);

  assertIncludesAll(sectionBetween("## Evidence Limits", "## No-Overclaim Rules"), [
    "Post-token-normalization no-overclaim consistency boundary is not actual label creation.",
    "Post-token-normalization no-overclaim consistency boundary is not applied status.",
    "Post-token-normalization no-overclaim consistency boundary is not runtime/product/delivery status application.",
    "Post-token-normalization no-overclaim consistency boundary is not route creation or route execution.",
    "Post-token-normalization no-overclaim consistency boundary is not technical evidence",
    "Validation for this doc-freeze slice is focused proof-test validation only.",
    "Test evidence remains tested-scenario evidence, not runtime certainty.",
    "DOCS_ONLY boundaries remain not runtime enforcement.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
  ]);

  assertIncludesAll(sectionBetween("## No-Overclaim Rules", "## External Reviewer Posture"), [
    "Do not convert post-token-normalization consistency into behavior.",
    "Do not convert token normalization into actual label creation.",
    "Do not convert token normalization into applied status labels.",
    "Do not convert token normalization into runtime, product, or delivery status application.",
    "Do not convert token normalization into route creation or route execution.",
    "Do not convert token normalization into evidence or CI evidence.",
    "Do not create new token groups.",
    "Do not treat canonical token groups as actual labels.",
    "Do not treat allowed token group wording as label existence.",
    "Do not treat prohibited token group wording as evidence that prohibited output exists.",
    "Do not treat future proof-test needs as proof tests that exist.",
    "Do not treat local proof-test output as CI evidence or technical evidence.",
    "Do not treat blocker visibility as blocker closure.",
    "Do not treat dependency visibility as dependency closure.",
    "Any future implementation",
  ]);

  assertIncludesAll(sectionBetween("## External Reviewer Posture", "## Recommended Next Posture"), [
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY status-family post-token-normalization no-overclaim consistency boundary",
    "external-review requirements remains advisory context only",
    "no External Reviewer-specific approval",
    "sign-off",
    "label application authorization",
    "route execution authorization",
    "blocker resolution",
    "dependency closure",
  ]);

  assertIncludesAll(sectionBetween("## Recommended Next Posture", null), [
    "REVIEW_ONLY_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_STATUS_FAMILY_POST_TOKEN_NORMALIZATION_NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_BOUNDARY",
    "continued pause",
    "No runtime",
    "API",
    "schema",
    "package/export",
    "evidence",
    "CI",
    "product",
    "external-use",
    "None are authorized by this boundary.",
  ]);
});

test("forbidden exact overclaiming tokens are absent", () => {
  const forbiddenTokens = [
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_CREATES_ACTUAL_LABELS",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_APPLIES_STATUS_LABELS",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_APPLIES_RUNTIME_STATUS",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_APPLIES_PRODUCT_STATUS",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_APPLIES_DELIVERY_STATUS",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_CREATES_ROUTES",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_EXECUTES_ROUTES",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_CREATES_TECHNICAL_EVIDENCE",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_CREATES_CI_EVIDENCE",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_SELECTS_CANDIDATES",
    "STATUS_FAMILY_POST_TOKEN_NORMALIZATION_SELECTS_TEST_MATERIAL",
    "POST_TOKEN_NORMALIZATION_CREATES_NEW_TOKEN_GROUPS",
    "POST_TOKEN_NORMALIZATION_CREATES_ACTUAL_LABELS",
    "POST_TOKEN_NORMALIZATION_APPLIES_STATUS_LABELS",
    "POST_TOKEN_NORMALIZATION_CREATES_RUNTIME_BEHAVIOR",
    "POST_TOKEN_NORMALIZATION_CREATES_ROUTE_BEHAVIOR",
    "POST_TOKEN_NORMALIZATION_CREATES_EVIDENCE",
    "TOKEN_NORMALIZATION_CREATES_ACTUAL_LABELS",
    "TOKEN_NORMALIZATION_APPLIES_STATUS",
    "TOKEN_NORMALIZATION_APPLIES_RUNTIME_STATUS",
    "TOKEN_NORMALIZATION_CREATES_ROUTES",
    "TOKEN_NORMALIZATION_CREATES_EVIDENCE",
    "ACTUAL_LABEL_APPLIED",
    "STATUS_APPLIED",
    "RUNTIME_STATUS_APPLIED",
    "PRODUCT_STATUS_APPLIED",
    "DELIVERY_STATUS_APPLIED",
    "ACTUAL_REVIEW_ROUTE_CREATED",
    "REVIEW_ROUTE_EXECUTED",
    "CANDIDATE_EXAMPLES_SELECTED",
    "SYNTHETIC_CANDIDATE_SELECTED",
    "ACTUAL_TEST_MATERIAL_SELECTED",
    "LOCAL_SANITIZED_TEST_PILOT_AUTHORIZED",
    "LOCAL_SANITIZED_TEST_PILOT_EXECUTED",
    "REAL_PRIVATE_RUN_AUTHORIZED",
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
