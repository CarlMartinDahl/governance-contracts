const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_BOUNDARY_v1.md",
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

const matrix = sectionBetween("## SIO-VOCAB Matrix", "## Required Row Content");
const summary = sectionBetween(
  "## Candidate-Vocabulary Scope Summary After Technical Evidence Verification-Scope",
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
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_BOUNDARY",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_ONLY",
    "DOCS_ONLY",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_PARTIAL_GAP_CONTEXT",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NON_AUTHORIZING",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_VOCABULARY_ONLY",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_CANDIDATE_SELECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_CANDIDATE_EXAMPLES",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_ACTUAL_TEST_MATERIAL_SELECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_PILOT_EXECUTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_REAL_PRIVATE_RUN",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_TECHNICAL_EVIDENCE_CREATION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_CI_EVIDENCE",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_RUNTIME_CERTIFICATION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_TECHNICAL_SIGN_OFF",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_RELEASE_APPROVAL",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_PRODUCT_CANDIDATE",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_EXTERNAL_USE_AUTHORIZATION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_DELIVERY",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_PACKET_APPROVAL",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_SOURCE_PACKAGE_INSPECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_METADATA_ACQUISITION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_LOCAL_LOG_INSPECTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_IMPLEMENTATION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_RUNTIME_BEHAVIOR",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_BLOCKER_RESOLUTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_NOT_DEPENDENCY_CLOSURE",
    "VOCABULARY_SCOPE_REVIEW_ONLY",
    "VOCABULARY_ONLY",
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
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only synthetic input/output candidate-vocabulary scope review after technical evidence verification-scope.",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_BOUNDARY",
    "This is vocabulary-scope review only.",
    "This is vocabulary-only.",
    "This boundary should not contain candidate examples.",
    "This boundary does not select vocabulary examples, synthetic input/output candidates, candidate examples, actual test material, or pilot material.",
    "This boundary does not authorize technical evidence creation, CI evidence, runtime certification, technical sign-off, release approval, External Reviewer approval, product candidate, external-use, delivery, packet approval, final delivery decision, PDF packet, archive/ZIP, candidate selection, actual test-material selection, pilot execution, real private run, raw/private/source inspection, source-package/PDF/image/screenshot/metadata inspection, metadata acquisition, local log inspection, legal/clinical/evidentiary/case-truth conclusions, blocker resolution, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
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
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "c7069d2 docs(context): refresh new-thread handoff after technical evidence verification scope boundary",
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
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_COMPLETED_NO_CHANGE",
    "POST_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
  ]);
});

test("prior read-only review result exists", () => {
  assertIncludesAll([
    "REVIEW_ONLY synthetic input/output candidate vocabulary scope after technical evidence verification-scope was performed.",
    "The result was `PARTIAL_GAP_REQUIRES_DOCS_ONLY_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_BOUNDARY`.",
    "A future DOCS_ONLY synthetic input/output candidate-vocabulary boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not convert vocabulary-scope review into candidate examples, candidate selection, actual test-material selection, pilot execution, real private run, technical evidence creation, CI evidence, runtime certification, technical sign-off, release approval, External Reviewer approval, product candidate, external-use authorization, delivery, packet approval, final delivery decision, PDF packet, archive/ZIP, implementation-readiness authorization, implementation, runtime behavior, blocker closure, or dependency closure.",
  ]);
});

test("SIO-VOCAB matrix exists and all rows exist", () => {
  assertIncludesAll([
    "row ID",
    "vocabulary surface",
    "current tracked evidence level",
    "relation to technical evidence verification-scope, synthetic candidate-scope, D007 posture, and evidence digest",
    "overclaim risk",
    "current blocker/status",
    "required future evidence if separately authorized",
    "minimum future proof tests if separately authorized",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY review only",
  ], matrix);

  for (let index = 1; index <= 30; index += 1) {
    assertIncludesAll([`SIO-VOCAB-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("required row content exists", () => {
  assertIncludesAll([
    "Vocabulary planning posture remains DOCS_ONLY partial/gap after technical evidence verification-scope.",
    "Vocabulary-only boundary means allowed/prohibited vocabulary categories only, not examples, not candidates, and not material.",
    "Candidate examples are prohibited.",
    "Synthetic input/output candidate selection remains prohibited.",
    "Actual test-material selection remains absent and unauthorized.",
    "Pilot execution remains unauthorized.",
    "Real private run remains blocked.",
    "Allowed vocabulary category families are future-only and must remain broad category families, not specific examples or test strings.",
    "Prohibited vocabulary category families must include raw/private/source-adjacent, locator, token/URL/secret, metadata, log, product/external-use, legal/clinical/evidentiary/case-truth, credibility/risk/sufficiency/police-report/pleading, finding/severity/remediation, and closure/approval categories.",
    "Forbidden example/material classes include candidate examples, actual test material, source snippets, private facts, source locators, filenames/private paths, page references, URLs, tokens, secrets, PDF/image/screenshot/metadata content, local logs, real private material, source packages, untracked private files, generated delivery language, and any source-adjacent evidence material.",
    "Strict synthetic/manually sanitized/no-raw/no-private/no-source-locator/no-token/no-URL posture remains preserved.",
    "Source locators, private paths, filenames, and page references are prohibited.",
    "URLs, tokens, and secrets are prohibited.",
    "PDF/image/screenshot/metadata inspection and metadata acquisition remain prohibited.",
    "Local log inspection and local-log promotion remain prohibited.",
    "D007 non-authorization remains controlling.",
    "Technical evidence verification no-overclaim posture remains preserved.",
    "Test evidence remains tested-scenario evidence only, not runtime certainty.",
    "DOCS_ONLY boundaries remain not runtime enforcement.",
    "Human/professional review remains release gate.",
    "Product candidate remains none, external-use remains unauthorized, and delivery/packet remain unauthorized.",
    "Legal, clinical, evidentiary, and case-truth conclusions are prohibited.",
    "Credibility, risk, sufficiency, police-report, and pleading outputs are prohibited.",
    "Allowed output forms for vocabulary review are limited to category families, prohibited category families, fail-closed labels, review-route notes, and future proof-test needs.",
    "Prohibited output forms include candidate examples, selected candidates, test strings, generated testcases, legal/clinical/evidentiary/case-truth conclusions, credibility/risk/sufficiency scores, police reports, pleadings, product claims, delivery outputs, external-use claims, findings, severity, remediation, approvals, and closure claims.",
    "Fail-closed vocabulary/status labels may include NOT_AUTHORIZED, BLOCKED, FUTURE_ONLY, DOCS_ONLY, VOCABULARY_ONLY, NO_EXAMPLES, NO_CANDIDATE_SELECTION, NO_ACTUAL_TEST_MATERIAL_SELECTION, NO_PILOT_EXECUTION, REAL_PRIVATE_RUN_BLOCKED, NO_RAW, NO_PRIVATE, NO_SOURCE_LOCATOR, NO_TOKEN, NO_URL, NO_METADATA_ACQUISITION, NO_LOCAL_LOG_INSPECTION, HUMAN_PROFESSIONAL_REVIEW_REQUIRED.",
    "D001-D007 and data-handling blockers remain visible and unresolved/not closed.",
    "Future proof-test needs are future-only and do not mean tests exist.",
    "Implementation evidence remains absent.",
    "Closure criteria are not met and remain future-only.",
    "Continued pause preserves no approvals, sign-offs, evidence creation, findings, severity, remediation, product, external-use, delivery, packet approval, blocker resolution, or dependency closure.",
  ]);
});

test("candidate-vocabulary scope summary exists", () => {
  assertIncludesAll([
    "synthetic input/output candidate-vocabulary scope is the next suitable review-only surface after technical evidence verification-scope",
    "it can remain vocabulary-only",
    "it can be defined without candidate examples",
    "it can be defined without synthetic input/output candidate selection",
    "it can be defined without actual test-material selection",
    "it can be defined without pilot execution",
    "it can be defined without real private run",
    "it can be defined without raw/private/source inspection",
    "it can be defined without local logs",
    "it can be defined without source-package/PDF/image/screenshot/metadata inspection",
    "it preserves no metadata acquisition",
    "it preserves D007 non-authorization",
    "it preserves technical evidence verification-scope no-overclaim rules",
    "it preserves tested-scenario evidence, not runtime certainty",
    "it preserves DOCS_ONLY boundaries not runtime enforcement",
    "it preserves product candidate none and external-use unauthorized",
    "it preserves human/professional review as release gate",
    "no implementation-readiness authorization is created now",
    "no implementation is created now",
    "no technical evidence or CI evidence is created now",
    "no candidate, example, or test material is selected now",
    "no blocker or dependency is closed now",
    "candidate-vocabulary scope cannot be closed now",
  ], summary);
});

test("required non-authorizations exist", () => {
  assertIncludesAll([
    "candidate examples",
    "candidate example selection",
    "example candidate text",
    "synthetic input/output candidate selection",
    "actual test-material selection",
    "local sanitized test pilot authorization",
    "local sanitized test pilot execution",
    "real private run",
    "technical evidence creation",
    "CI evidence",
    "test output capture",
    "log capture",
    "local log inspection",
    "local logs as CI evidence",
    "local logs as packet components",
    "runtime certification",
    "technical sign-off",
    "release approval",
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
    "raw/private/source inspection",
    "source package inspection",
    "PDF/image/screenshot/metadata inspection",
    "metadata acquisition",
    "implementation-readiness",
    "implementation",
    "runtime behavior",
    "runtime/API/schema/package behavior change",
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
    "vocabulary-scope boundary is not candidate example selection",
    "vocabulary-scope boundary is not candidate selection",
    "vocabulary-scope boundary is not actual test-material selection",
    "vocabulary-scope boundary is not pilot authorization",
    "vocabulary-scope boundary is not pilot execution",
    "vocabulary-scope boundary is not real private run",
    "vocabulary-scope boundary is not technical evidence creation",
    "vocabulary-scope boundary is not CI evidence",
    "vocabulary-scope boundary is not runtime certification",
    "vocabulary-scope boundary is not technical sign-off",
    "vocabulary-scope boundary is not release approval",
    "vocabulary-scope boundary is not External Reviewer approval",
    "vocabulary-scope boundary is not product candidate",
    "vocabulary-scope boundary is not external-use authorization",
    "vocabulary-scope boundary is not delivery authorization",
    "vocabulary-scope boundary is not packet approval",
    "vocabulary-scope boundary is not final delivery decision",
    "vocabulary-scope boundary is not PDF packet",
    "vocabulary-scope boundary is not archive/ZIP",
    "vocabulary category family does not mean example exists",
    "allowed vocabulary family does not mean actual input exists",
    "prohibited vocabulary family does not mean those materials were inspected",
    "forbidden example class does not mean examples were reviewed",
    "allowed output form does not mean output was generated",
    "future proof tests do not mean tests exist",
    "required CI does not mean CI exists",
    "required implementation evidence does not mean evidence exists",
    "test evidence remains tested-scenario evidence, not runtime certainty",
    "green tests do not mean release approval",
    "local logs are not CI evidence",
    "local logs are not packet components",
    "generated PDF is not repo evidence",
    "generated PDF is not packet component",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "product candidate requires separate explicit selection",
    "external-use requires separate explicit authorization",
    "human/professional review remains release gate",
    "continued pause is valid",
  ], evidenceLimits);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "vocabulary-scope review does not mean candidate examples exist",
    "vocabulary-scope review does not mean candidate examples were selected",
    "vocabulary-scope review does not mean synthetic input/output candidates were selected",
    "vocabulary-scope review does not mean actual test material was selected",
    "vocabulary-scope review does not mean pilot execution is authorized",
    "vocabulary-scope review does not mean real private run is authorized",
    "allowed vocabulary category row does not authorize actual examples",
    "prohibited vocabulary category row does not mean prohibited materials were inspected",
    "forbidden example class row does not mean forbidden examples were inspected",
    "synthetic/sanitized row does not mean real material exists",
    "no-raw row does not mean raw material was inspected",
    "no source-locator row does not mean source locators were inspected",
    "no token/URL/secret row does not mean credentials or endpoints were inspected",
    "no PDF/image/screenshot/metadata row does not mean those materials were inspected",
    "no metadata row does not mean metadata was acquired",
    "no local-log row does not mean local logs were inspected",
    "D007 non-authorization row does not authorize D007",
    "TEV no-overclaim row does not create technical evidence",
    "tested-scenario row does not create runtime certainty",
    "DOCS_ONLY row does not create runtime enforcement",
    "human/professional review gate row does not create approval",
    "no product/external-use row does not authorize product candidate or external-use",
    "no delivery/packet row does not authorize delivery, PDF packet, archive, or ZIP",
    "no conclusion row does not authorize legal/clinical/evidentiary/case-truth conclusions",
    "no report/score row does not authorize reports or scores",
    "fail-closed status row does not create implementation",
    "future proof-test needs row does not mean proof tests exist",
    "D001-D007 blocker visibility row does not close blockers",
    "implementation evidence absence row does not mean implementation evidence exists",
    "closure criteria do not mean closure",
    "any future candidate examples require separate explicit authorization",
    "any future candidate selection requires separate explicit authorization",
    "any future test-material selection requires separate explicit authorization",
    "any future pilot execution requires separate explicit authorization",
    "any future technical evidence creation requires separate explicit authorization",
    "any future CI evidence requires separate explicit CI evidence creation",
    "any future release approval requires separate explicit release approval",
    "any future product candidate requires separate explicit selection",
    "any future external-use requires separate explicit authorization",
    "any future implementation-readiness authorization requires separate explicit authorization",
    "any future implementation requires separate explicit authorization",
  ], noOverclaim);
});

test("External Reviewer posture exists", () => {
  assertIncludesAll([
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY synthetic input/output candidate-vocabulary boundary after technical evidence verification-scope, preserving vocabulary-only review with no examples, no candidate selection, no actual test material, no pilot execution, no real private run, no source/log/metadata inspection, no CI evidence, no product candidate, no external-use, and no blocker or dependency closure?",
    "external-review requirements remains advisory context only, not approval, sign-off, implementation-readiness authorization, implementation authorization, runtime certification, release approval, product candidate, external-use authorization, delivery authorization, packet approval, CI evidence, technical evidence creation, candidate example authorization, candidate selection authorization, local sanitized pilot authorization, real private run authorization, blocker resolution, or dependency closure.",
  ], externalReviewer);
});

test("recommended next posture is limited and not authorized", () => {
  assertIncludesAll([
    "REVIEW_ONLY_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommended);
});

test("forbidden exact overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_SELECTS_CANDIDATE_EXAMPLES",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_INCLUDES_CANDIDATE_EXAMPLES",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_DEFINES_EXAMPLE_CANDIDATE_TEXT",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_SELECTS_SYNTHETIC_CANDIDATE",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_SELECTS_ACTUAL_TEST_MATERIAL",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AUTHORIZES_PILOT_EXECUTION",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_AUTHORIZES_REAL_PRIVATE_RUN",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_CREATES_TECHNICAL_EVIDENCE",
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_VOCABULARY_SCOPE_CREATES_CI_EVIDENCE",
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
