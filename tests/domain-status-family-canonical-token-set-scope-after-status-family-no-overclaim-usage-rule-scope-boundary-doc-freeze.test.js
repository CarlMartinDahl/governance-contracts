const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_BOUNDARY_v1.md",
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
    "Status-Family Canonical Token-Set Scope After Status-Family No-Overclaim Usage-Rule Scope Boundary v1",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_BOUNDARY",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_ONLY",
    "DOCS_ONLY",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_PARTIAL_GAP_CONTEXT",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_NON_AUTHORIZING",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_REVIEW_ONLY",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_CANONICAL_TOKEN_SET_ONLY",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_TOKEN_NORMALIZATION_ONLY",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_VOCABULARY_FAMILY_ONLY",
    "CANONICAL_TOKEN_SET_ONLY",
    "TOKEN_NORMALIZATION_ONLY",
    "VOCABULARY_FAMILY_ONLY",
    "CANONICAL_ALLOWED_FAMILY_TOKEN_GROUP",
    "CANONICAL_PROHIBITED_OVERCLAIM_EXCLUSION_TOKEN_GROUP",
    "CANONICAL_FUTURE_AUTHORIZATION_REQUIRED_TOKEN_GROUP",
    "CANONICAL_NON_EVIDENCE_TOKEN_GROUP",
    "CANONICAL_NON_RUNTIME_NON_ENFORCEMENT_TOKEN_GROUP",
    "CANONICAL_NO_ROUTE_NO_EXECUTION_TOKEN_GROUP",
    "CANONICAL_NO_EXAMPLE_NO_CANDIDATE_NO_MATERIAL_TOKEN_GROUP",
    "CANONICAL_NO_PRODUCT_NO_EXTERNAL_USE_NO_DELIVERY_TOKEN_GROUP",
    "CANONICAL_NO_FINDING_NO_SEVERITY_NO_REMEDIATION_NO_CLOSURE_TOKEN_GROUP",
    "ALLOWED_TOKEN_GROUP_NOT_ACTUAL_LABEL",
    "ALLOWED_TOKEN_GROUP_NOT_APPLIED_LABEL",
    "TOKEN_GROUP_NOT_RUNTIME_BEHAVIOR",
    "TOKEN_GROUP_NOT_ROUTE_BEHAVIOR",
    "TOKEN_GROUP_NOT_EVIDENCE_OR_CI",
    "NO_ACTUAL_LABEL_APPLICATION",
    "NO_APPLIED_STATUS_LABELS",
    "NO_TECHNICAL_EVIDENCE_CREATED",
    "NO_CI_EVIDENCE_CREATED",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_CONTINUED_PAUSE",
  ]);
});

test("purpose, source hierarchy, current state, and prior review result are explicit", () => {
  assertIncludesAll(sectionBetween("## Purpose", "## Source Hierarchy"), [
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_BOUNDARY",
    "canonical-token-set-only",
    "token-normalization-only",
    "vocabulary-family-only",
    "Canonical token groups are not actual labels.",
    "Canonical token groups are not applied statuses.",
    "does not create labels",
    "does not create CI evidence",
  ]);

  assertIncludesAll(sectionBetween("## Source Hierarchy", "## Current Accepted State"), [
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_BOUNDARY_CONTROLS_CURRENT_USAGE_RULE_CONTEXT",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AFTER_NO_OVERCLAIM_CONSISTENCY_SCOPE_BOUNDARY_CONTROLS_CURRENT_REPAIRED_LABEL_SET_CONTEXT",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_SUPERSEDES_50672e0_WITH_8d22d37",
    "NO_OVERCLAIM_CONSISTENCY_SCOPE_AFTER_FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_BOUNDARY_CONTROLS_CURRENT_NOCS_CONTEXT",
    "FAIL_CLOSED_STATUS_LABEL_FAMILY_SCOPE_AFTER_REVIEW_ROUTE_STATUS_LABEL_SCOPE_BOUNDARY_CONTROLS_CURRENT_FCSL_CONTEXT",
    "REVIEW_ROUTE_STATUS_LABEL_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_BOUNDARY_CONTROLS_CURRENT_RRSL_CONTEXT",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_BOUNDARY_CONTROLS_CURRENT_VOCABULARY_CONTEXT",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_CURRENT_TEV_CONTEXT",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_POSTURE_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_BOUNDARY_CONTROLS_CURRENT_D007_CONTEXT",
  ]);

  assertIncludesAll(sectionBetween("## Current Accepted State", "## Prior Read-Only Review Result"), [
    "c399e91 docs(context): refresh new-thread handoff after status-family usage-rule boundary",
    "f3345d1",
    "8d22d37",
    "77a7100 docs(context): refresh new-thread handoff after repaired status-family label-set boundary",
    "50672e0",
    "5b49934 docs(domain): freeze no-overclaim consistency scope after fail-closed status-label family boundary",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "COMBINED_READ_ONLY_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_COMPLETED_NO_CHANGE",
    "continued pause",
  ]);

  assertIncludesAll(sectionBetween("## Prior Read-Only Review Result", "## SF-TOKEN Matrix"), [
    "REVIEW_ONLY status-family canonical token-set scope",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_BOUNDARY",
    "future DOCS_ONLY status-family canonical token-set boundary is suitable",
    "freezes that partial/gap result only",
    "does not convert token groups into actual labels",
    "blocker closure",
    "dependency closure",
  ]);
});

test("SF-TOKEN matrix includes all required rows", () => {
  const matrix = sectionBetween("## SF-TOKEN Matrix", "## Required Row Content");
  assertIncludesAll(matrix, [
    "| row ID | canonical-token-set surface | current tracked evidence level | relation to usage-rule boundary, repaired status-family label-set boundary, no-overclaim consistency boundary, fail-closed status-label family boundary, review-route/status-label boundary, vocabulary boundary, TEV boundary, D007 posture, and evidence digest | overclaim risk | current blocker/status | required future evidence if separately authorized | minimum future proof tests if separately authorized | what remains non-authorized |",
    "SF-TOKEN-001",
    "SF-TOKEN-002",
    "SF-TOKEN-003",
    "SF-TOKEN-004",
    "SF-TOKEN-005",
    "SF-TOKEN-006",
    "SF-TOKEN-007",
    "SF-TOKEN-008",
    "SF-TOKEN-009",
    "SF-TOKEN-010",
    "SF-TOKEN-011",
    "SF-TOKEN-012",
    "SF-TOKEN-013",
    "SF-TOKEN-014",
    "SF-TOKEN-015",
    "SF-TOKEN-016",
    "SF-TOKEN-017",
    "SF-TOKEN-018",
    "SF-TOKEN-019",
    "SF-TOKEN-020",
    "SF-TOKEN-021",
    "SF-TOKEN-022",
    "SF-TOKEN-023",
    "SF-TOKEN-024",
    "SF-TOKEN-025",
    "SF-TOKEN-026",
    "SF-TOKEN-027",
    "SF-TOKEN-028",
    "SF-TOKEN-029",
    "SF-TOKEN-030",
    "Every row preserves DOCS_ONLY review only",
    "canonical-token-set-only",
    "continued pause",
  ]);
});

test("required row content and summary preserve canonical token-set-only posture", () => {
  assertIncludesAll(sectionBetween("## Required Row Content", "## Status-Family Canonical Token-Set Scope Summary After Status-Family No-Overclaim Usage-Rule Scope"), [
    "Planning posture remains DOCS_ONLY partial/gap after status-family no-overclaim usage-rule scope.",
    "Canonical-token-set-only means token normalization for family vocabulary only, not behavior.",
    "Token normalization is vocabulary-family-only.",
    "Canonical allowed family token group remains vocabulary-only.",
    "Canonical prohibited overclaim-exclusion token group remains overclaim-exclusion only.",
    "Canonical future-authorization-required token group remains future-only.",
    "Canonical non-evidence token group remains non-evidence only.",
    "Canonical non-runtime/non-enforcement token group remains non-runtime/non-enforcement only.",
    "Canonical no-route/no-execution token group remains no-route/no-execution only.",
    "Canonical no-example/no-candidate/no-material token group remains no-example/no-candidate/no-material only.",
    "Canonical no-product/no-external-use/no-delivery token group remains no-product/no-external-use/no-delivery only.",
    "Canonical no-finding/no-severity/no-remediation/no-closure token group remains no-finding/no-severity/no-remediation/no-closure only.",
    "Allowed token group does not mean actual label exists.",
    "Allowed token group does not mean label was applied.",
    "Prohibited token group does not mean prohibited output was generated.",
    "Token group does not create evidence or CI evidence.",
    "Future proof-test needs are future-only and do not mean proof exists.",
    "Non-authorization and continued pause remain controlling.",
  ]);

  assertIncludesAll(sectionBetween("## Status-Family Canonical Token-Set Scope Summary After Status-Family No-Overclaim Usage-Rule Scope", "## Required Non-Authorizations"), [
    "next suitable review-only surface",
    "canonical-token-set-only",
    "token-normalization-only",
    "vocabulary-family-only",
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
    "preserves D007 non-authorization",
    "preserves TEV no-overclaim rules",
    "preserves vocabulary-only no-example/no-selection rules",
    "preserves review-route/status-label no-route/no-execution rules",
    "preserves fail-closed status-family-only no-actual-label-application rules",
    "preserves repaired allowed/prohibited label-set family-set-only rules",
    "preserves status-family no-overclaim usage-rule rules",
    "preserves no-overclaim consistency validation-not-evidence rules",
    "preserves tested-scenario evidence, not runtime certainty",
    "preserves DOCS_ONLY boundaries not runtime enforcement",
    "preserves product candidate none and external-use unauthorized",
    "preserves human/professional review as release gate",
    "No implementation-readiness authorization is created now.",
    "Status-family canonical token-set scope cannot be closed now.",
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
    "runtime route creation",
    "workflow route creation",
    "schema route creation",
    "packet route creation",
    "candidate route creation",
    "candidate examples",
    "example candidate text",
    "actual test-material selection",
    "real private run",
    "technical evidence creation",
    "CI evidence",
    "local logs as CI evidence",
    "runtime/API/schema/package behavior change",
    "blocker resolution",
    "dependency closure",
    "None are authorized by this boundary.",
  ]);

  assertIncludesAll(sectionBetween("## Evidence Limits", "## No-Overclaim Rules"), [
    "Canonical token-set boundary is not actual label creation.",
    "Canonical token-set boundary is not applied status.",
    "Canonical token-set boundary is not runtime/product/delivery status application.",
    "Canonical token-set boundary is not route creation.",
    "Canonical token-set boundary is not route execution.",
    "Canonical token-set boundary is not technical evidence.",
    "Canonical token-set boundary is not CI evidence.",
    "Canonical token-set boundary is not runtime certification.",
    "Canonical token-set boundary is not release approval.",
    "Allowed token group is not actual label creation.",
    "Prohibited token group is not evidence that prohibited output exists.",
    "Validation output for this doc-freeze slice is not CI evidence.",
    "Test evidence remains tested-scenario evidence, not runtime certainty.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "Continued pause is valid.",
  ]);

  assertIncludesAll(sectionBetween("## No-Overclaim Rules", "## External Reviewer Posture"), [
    "Canonical token group does not mean actual label exists.",
    "Canonical token group does not mean label was applied.",
    "Prohibited token group means overclaim exclusion only.",
    "Prohibited token group does not mean prohibited output was generated.",
    "Token group does not create runtime behavior.",
    "Token group does not create route behavior.",
    "Token group does not create evidence or CI evidence.",
    "Future proof-test needs do not mean proof tests exist.",
    "Implementation evidence absence does not mean implementation evidence exists.",
    "Blocker visibility does not close blockers.",
    "Closure criteria do not mean closure.",
    "Any future implementation requires separate explicit authorization.",
  ]);

  assertIncludesAll(sectionBetween("## External Reviewer Posture", "## Recommended Next Posture"), [
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY status-family canonical token-set boundary",
    "external-review requirements remains advisory context only",
    "not approval",
    "not approval, sign-off",
    "label application authorization",
    "route execution authorization",
    "blocker resolution",
    "dependency closure",
  ]);

  assertIncludesAll(sectionBetween("## Recommended Next Posture", null), [
    "REVIEW_ONLY_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_STATUS_FAMILY_CANONICAL_TOKEN_SET_SCOPE_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_BOUNDARY",
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
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_CREATES_ACTUAL_LABELS",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_APPLIES_STATUS_LABELS",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_APPLIES_RUNTIME_STATUS",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_APPLIES_PRODUCT_STATUS",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_APPLIES_DELIVERY_STATUS",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_CREATES_ROUTES",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_EXECUTES_ROUTES",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_CREATES_TECHNICAL_EVIDENCE",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_CREATES_CI_EVIDENCE",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SELECTS_CANDIDATES",
    "STATUS_FAMILY_CANONICAL_TOKEN_SET_SELECTS_TEST_MATERIAL",
    "CANONICAL_TOKEN_SET_CREATES_ACTUAL_LABELS",
    "CANONICAL_TOKEN_SET_APPLIES_STATUS_LABELS",
    "CANONICAL_TOKEN_SET_CREATES_RUNTIME_BEHAVIOR",
    "CANONICAL_TOKEN_SET_CREATES_ROUTE_BEHAVIOR",
    "CANONICAL_TOKEN_SET_CREATES_EVIDENCE",
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
