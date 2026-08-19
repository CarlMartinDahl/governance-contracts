const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_BOUNDARY_v1.md",
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
    "Status-Family No-Overclaim Usage-Rule Scope After Status-Family Allowed/Prohibited Label-Set Scope Boundary v1",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_BOUNDARY",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_ONLY",
    "DOCS_ONLY",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_PARTIAL_GAP_CONTEXT",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_NON_AUTHORIZING",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_REVIEW_ONLY",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_USAGE_RULE_ONLY",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_FAMILY_SET_USAGE_RULE_ONLY",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_VOCABULARY_FAMILY_ONLY",
    "USAGE_RULE_ONLY",
    "FAMILY_SET_USAGE_RULE_ONLY",
    "VOCABULARY_FAMILY_ONLY",
    "ALLOWED_FAMILY_IS_VOCABULARY_ONLY",
    "ALLOWED_FAMILY_NOT_ACTUAL_LABEL",
    "ALLOWED_FAMILY_NOT_APPLIED_LABEL",
    "PROHIBITED_FAMILY_IS_OVERCLAIM_EXCLUSION_ONLY",
    "FAMILY_SET_ROW_NOT_RUNTIME_BEHAVIOR",
    "FAMILY_SET_ROW_NOT_ROUTE_BEHAVIOR",
    "FAMILY_SET_ROW_NOT_EVIDENCE_OR_CI",
    "FUTURE_PRODUCT_EXTERNAL_USE_DELIVERY_REQUIRES_SEPARATE_AUTHORIZATION",
    "STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_CONTINUED_PAUSE",
  ]);
});

test("purpose, source hierarchy, current state, and prior review result are explicit", () => {
  assertIncludesAll(sectionBetween("## Purpose", "## Source Hierarchy"), [
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_BOUNDARY",
    "usage-rule-only",
    "family-set usage-rule only",
    "vocabulary-family-only",
    "Allowed family means vocabulary family only",
    "Prohibited family means overclaim exclusion only",
    "does not create labels",
    "does not create CI evidence",
    "does not create findings",
  ]);

  assertIncludesAll(sectionBetween("## Source Hierarchy", "## Current Accepted State"), [
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
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
    "77a7100 docs(context): refresh new-thread handoff after repaired status-family label-set boundary",
    "8d22d37",
    "50672e0",
    "5b49934 docs(domain): freeze no-overclaim consistency scope after fail-closed status-label family boundary",
    "STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "COMBINED_READ_ONLY_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_COMPLETED_NO_CHANGE",
    "continued pause",
  ]);

  assertIncludesAll(sectionBetween("## Prior Read-Only Review Result", "## SF-USAGE Matrix"), [
    "REVIEW_ONLY status-family no-overclaim usage-rule scope",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_BOUNDARY",
    "future DOCS_ONLY status-family no-overclaim usage-rule boundary is suitable",
    "freezes that partial/gap result only",
    "does not convert usage rules into actual labels",
    "blocker closure",
    "dependency closure",
  ]);
});

test("SF-USAGE matrix includes all required rows", () => {
  const matrix = sectionBetween("## SF-USAGE Matrix", "## Required Row Content");
  assertIncludesAll(matrix, [
    "| row ID | usage-rule surface | current tracked evidence level | relation to repaired label-set / NOCS / FCSL / RRSL / vocabulary / TEV / D007 / digest | overclaim risk | current blocker/status | required future evidence if separately authorized | minimum future proof tests if separately authorized | what remains non-authorized |",
    "SF-USAGE-001",
    "SF-USAGE-002",
    "SF-USAGE-003",
    "SF-USAGE-004",
    "SF-USAGE-005",
    "SF-USAGE-006",
    "SF-USAGE-007",
    "SF-USAGE-008",
    "SF-USAGE-009",
    "SF-USAGE-010",
    "SF-USAGE-011",
    "SF-USAGE-012",
    "SF-USAGE-013",
    "SF-USAGE-014",
    "SF-USAGE-015",
    "SF-USAGE-016",
    "SF-USAGE-017",
    "SF-USAGE-018",
    "SF-USAGE-019",
    "SF-USAGE-020",
    "SF-USAGE-021",
    "SF-USAGE-022",
    "SF-USAGE-023",
    "SF-USAGE-024",
    "SF-USAGE-025",
    "SF-USAGE-026",
    "SF-USAGE-027",
    "SF-USAGE-028",
    "SF-USAGE-029",
    "SF-USAGE-030",
  ]);
});

test("required row content and summary preserve usage-rule-only posture", () => {
  assertIncludesAll(sectionBetween("## Required Row Content", "## Status-Family No-Overclaim Usage-Rule Scope Summary After Repaired Allowed/Prohibited Label-Set Scope"), [
    "Planning posture remains DOCS_ONLY partial/gap",
    "Usage-rule-only means rules for referencing family vocabulary only, not behavior.",
    "Allowed family means vocabulary family only.",
    "Allowed family does not mean actual label exists.",
    "Allowed family does not mean label was applied.",
    "Allowed family does not mean runtime/product/delivery status application.",
    "Prohibited family means overclaim exclusion only.",
    "Prohibited family does not mean prohibited output was generated.",
    "Prohibited family does not mean prohibited material was inspected.",
    "Prohibited family does not mean source/log/metadata was acquired.",
    "Family-set row does not create runtime behavior.",
    "Family-set row does not create route behavior.",
    "Family-set row does not create evidence or CI evidence.",
    "Family-set row does not create examples, candidates, or test material.",
    "Any future actual label application requires separate explicit authorization.",
    "Any future status application requires separate explicit authorization.",
    "Any future route creation/execution requires separate explicit authorization.",
    "Any future product candidate/external-use/delivery requires separate explicit authorization.",
    "Non-authorization and continued pause remain controlling.",
  ]);

  assertIncludesAll(sectionBetween("## Status-Family No-Overclaim Usage-Rule Scope Summary After Repaired Allowed/Prohibited Label-Set Scope", "## Required Non-Authorizations"), [
    "next suitable review-only surface",
    "usage-rule-only",
    "family vocabulary only",
    "without actual labels",
    "without applied status labels",
    "without runtime/product/delivery status application",
    "without route creation or route execution",
    "without examples",
    "without candidate selection",
    "without actual test-material selection",
    "without pilot execution",
    "without technical evidence creation",
    "without local-log/source/metadata inspection",
    "preserves no metadata acquisition",
    "preserves D007 non-authorization",
    "preserves TEV no-overclaim rules",
    "preserves product candidate none and external-use unauthorized",
    "human/professional review as release gate",
    "No implementation-readiness authorization is created now.",
    "Status-family no-overclaim usage-rule scope cannot be closed now.",
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
    "Usage-rule boundary is not actual label creation.",
    "Usage-rule boundary is not applied status.",
    "Usage-rule boundary is not runtime/product/delivery status application.",
    "Usage-rule boundary is not route creation.",
    "Usage-rule boundary is not route execution.",
    "Usage-rule boundary is not technical evidence.",
    "Usage-rule boundary is not CI evidence.",
    "Usage-rule boundary is not runtime certification.",
    "Usage-rule boundary is not release approval.",
    "Allowed family set is not actual label creation.",
    "Prohibited family set is not evidence that prohibited output exists.",
    "Validation output for this doc-freeze slice is not CI evidence.",
    "Test evidence remains tested-scenario evidence, not runtime certainty.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "Continued pause is valid.",
  ]);

  assertIncludesAll(sectionBetween("## No-Overclaim Rules", "## External Reviewer Posture"), [
    "Allowed family does not mean actual label exists.",
    "Allowed family does not mean label was applied.",
    "Prohibited family means overclaim exclusion only.",
    "Prohibited family does not mean prohibited output was generated.",
    "Family-set row does not create runtime behavior.",
    "Family-set row does not create route behavior.",
    "Future proof-test needs do not mean proof tests exist.",
    "Implementation evidence absence does not mean implementation evidence exists.",
    "Blocker visibility does not close blockers.",
    "Closure criteria do not mean closure.",
    "Any future implementation requires separate explicit authorization.",
  ]);

  assertIncludesAll(sectionBetween("## External Reviewer Posture", "## Recommended Next Posture"), [
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY status-family no-overclaim usage-rule boundary",
    "external-review requirements remains advisory context only",
    "not approval",
    "not approval, sign-off",
    "label application authorization",
    "route execution authorization",
    "blocker resolution",
    "dependency closure",
  ]);

  assertIncludesAll(sectionBetween("## Recommended Next Posture", null), [
    "REVIEW_ONLY_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_STATUS_FAMILY_NO_OVERCLAIM_USAGE_RULE_SCOPE_AFTER_STATUS_FAMILY_ALLOWED_PROHIBITED_LABEL_SET_SCOPE_BOUNDARY",
    "continued pause",
    "No runtime",
    "API",
    "schema",
    "package/export",
    "evidence",
    "CI",
    "product",
    "delivery",
    "external-use",
    "None are authorized by this boundary.",
  ]);
});

test("forbidden exact overclaiming tokens are absent", () => {
  [
    "STATUS_FAMILY_USAGE_RULE_CREATES_ACTUAL_LABELS",
    "STATUS_FAMILY_USAGE_RULE_APPLIES_STATUS_LABELS",
    "STATUS_FAMILY_USAGE_RULE_APPLIES_RUNTIME_STATUS",
    "STATUS_FAMILY_USAGE_RULE_APPLIES_PRODUCT_STATUS",
    "STATUS_FAMILY_USAGE_RULE_APPLIES_DELIVERY_STATUS",
    "STATUS_FAMILY_USAGE_RULE_CREATES_ROUTES",
    "STATUS_FAMILY_USAGE_RULE_EXECUTES_ROUTES",
    "STATUS_FAMILY_USAGE_RULE_CREATES_TECHNICAL_EVIDENCE",
    "STATUS_FAMILY_USAGE_RULE_CREATES_CI_EVIDENCE",
    "STATUS_FAMILY_USAGE_RULE_SELECTS_CANDIDATES",
    "STATUS_FAMILY_USAGE_RULE_SELECTS_TEST_MATERIAL",
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
  ].forEach((token) => assertDoesNotIncludeExactToken(doc, token));
});
