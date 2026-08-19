const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_BOUNDARY_v1.md",
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
  "## TEV-SCOPE Matrix",
  "## Required Row Content",
);
const summary = sectionBetween(
  "## Technical Evidence Verification-Scope Summary After Synthetic Input/Output Candidate-Scope",
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
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_BOUNDARY",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_ONLY",
    "DOCS_ONLY",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_PARTIAL_GAP_CONTEXT",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NON_AUTHORIZING",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_TECHNICAL_EVIDENCE_CREATION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_CI_EVIDENCE",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_RUNTIME_CERTIFICATION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_TECHNICAL_SIGN_OFF",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_RELEASE_APPROVAL",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_PRODUCT_CANDIDATE",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_EXTERNAL_USE_AUTHORIZATION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_DELIVERY",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_PACKET_APPROVAL",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_FINAL_DELIVERY_DECISION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_PDF_PACKET",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_ARCHIVE_ZIP",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_SYNTHETIC_CANDIDATE_SELECTION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_ACTUAL_TEST_MATERIAL_SELECTION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_PILOT_EXECUTION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_REAL_PRIVATE_RUN",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_SOURCE_PACKAGE_INSPECTION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_METADATA_ACQUISITION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_LOCAL_LOG_INSPECTION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_IMPLEMENTATION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_RUNTIME_BEHAVIOR",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_BLOCKER_RESOLUTION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_NOT_DEPENDENCY_CLOSURE",
    "VERIFICATION_SCOPE_REVIEW_ONLY",
    "NO_TECHNICAL_EVIDENCE_CREATED",
    "NO_CI_EVIDENCE_CREATED",
    "NO_TEST_OUTPUT_CAPTURED",
    "NO_LOG_CAPTURED",
    "TESTED_SCENARIO_EVIDENCE_NOT_RUNTIME_CERTAINTY",
    "LOCAL_LOGS_REMAIN_NOT_CI_EVIDENCE",
    "LOCAL_LOGS_REMAIN_NOT_PACKET_COMPONENTS",
    "DOCS_ONLY_BOUNDARIES_REMAIN_NOT_RUNTIME_ENFORCEMENT",
    "GENERATED_PDF_REMAINS_NOT_REPO_EVIDENCE_NOT_PACKET_COMPONENT",
    "PRODUCT_CANDIDATE_REMAINS_NONE",
    "EXTERNAL_USE_REMAINS_UNAUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only technical evidence verification-scope review after synthetic input/output candidate-scope as DOCS_ONLY repo evidence only.",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_BOUNDARY",
    "This is verification-scope review only.",
    "This boundary does not create or capture technical evidence.",
    "This boundary should precede candidate-vocabulary narrowing.",
    "This boundary does not authorize technical evidence creation, CI evidence, runtime certification, technical sign-off, release approval, External Reviewer approval, product candidate, external-use, delivery, packet approval, final delivery decision, PDF packet, archive/ZIP, synthetic candidate selection, actual test-material selection, pilot execution, real private run, raw/private/source inspection, source-package/PDF/image/screenshot/metadata inspection, metadata acquisition, local log inspection, legal/clinical/evidentiary/case-truth conclusions, blocker resolution, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
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
    "85adc23 docs(context): refresh new-thread handoff after synthetic input output candidate scope boundary",
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
    "SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_COMPLETED_NO_CHANGE",
    "POST_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
  ]);
});

test("prior read-only review result exists", () => {
  assertIncludesAll([
    "REVIEW_ONLY technical evidence verification scope after synthetic input/output candidate-scope was performed.",
    "The result was `PARTIAL_GAP_REQUIRES_DOCS_ONLY_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_BOUNDARY`.",
    "A future DOCS_ONLY technical evidence verification-scope boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not convert verification-scope review into technical evidence, CI evidence, runtime certification, technical sign-off, release approval, External Reviewer approval, product candidate, external-use authorization, delivery, packet approval, final delivery decision, PDF packet, archive/ZIP, candidate selection, actual test-material selection, pilot execution, real private run, implementation-readiness authorization, implementation, runtime behavior, blocker closure, or dependency closure.",
  ]);
});

test("TEV-SCOPE matrix exists and all rows exist", () => {
  assertIncludesAll([
    "row ID",
    "verification surface",
    "current tracked evidence level",
    "relation to synthetic candidate-scope, D007 posture, and evidence digest",
    "overclaim risk",
    "current blocker/status",
    "required future evidence if separately authorized",
    "minimum future proof tests if separately authorized",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY review only",
  ], matrix);

  for (let index = 1; index <= 30; index += 1) {
    assertIncludesAll([`TEV-SCOPE-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("required row content exists", () => {
  assertIncludesAll([
    "Technical evidence verification planning posture remains DOCS_ONLY partial/gap after synthetic input/output candidate-scope.",
    "Live git evidence wins; handoff/ledger are context only.",
    "Implemented-vs-DOCS_ONLY classification must stay narrowed and not overclaim implementation.",
    "Runtime-enforced claims apply only to documented/tested surfaces, not global runtime assurance.",
    "Schema/validator-enforced claims apply only to exported tracked validators, not all schemas or all runtime behavior.",
    "Prompt/workflow-enforced controls must not be described as runtime-enforced.",
    "Human/professional review remains release gate and does not create approval.",
    "Test evidence remains tested-scenario evidence only, not runtime certainty or total non-bypassability.",
    "Green tests are not release approval.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
    "Generated PDF is not repo evidence and not packet component unless separately authorized.",
    "Delivery, packet, archive, ZIP, PDF packet, product candidate, and external-use remain unauthorized or absent.",
    "D007 non-authorization remains controlling.",
    "Synthetic input/output candidate-scope is not candidate selection.",
    "Actual test-material selection remains absent and pilot execution remains unauthorized.",
    "Real private run remains blocked and source inspection remains prohibited.",
    "Raw/private/source/source-locator/token/URL leakage remains blocked.",
    "PDF/image/screenshot/metadata inspection and metadata acquisition remain prohibited.",
    "Sanitized no-raw trace scaffold remains synthetic/sanitized and does not mean actual source review.",
    "Failure-mode register remains no-overclaim context only and does not create findings, severity, or remediation.",
    "Legal, clinical, evidentiary, and case-truth conclusions are prohibited.",
    "Credibility, risk, sufficiency, police-report, and pleading outputs are prohibited.",
    "Data-handling blockers remain unresolved/not closed.",
    "RBAC/admin-support/access-control blockers remain unresolved/not closed.",
    "Audit/access-log/log schema/storage blockers remain unresolved/not closed.",
    "Raw-material routing and third-party/provider routing blockers remain unresolved/not closed.",
    "Runtime-gate inventory remains posture only and not implementation.",
    "Implementation evidence remains absent.",
    "Closure criteria are not met and remain future-only.",
    "Continued pause preserves no approvals, sign-offs, findings, severity, remediation, product, external-use, delivery, packet approval, blocker resolution, or dependency closure.",
  ]);
});

test("technical evidence verification-scope summary exists", () => {
  assertIncludesAll([
    "technical evidence verification-only consistency scope is the next suitable review-only surface after synthetic input/output candidate-scope",
    "it should precede candidate-vocabulary narrowing",
    "it can remain strictly verification-only",
    "it can be scoped without creating or capturing new technical evidence",
    "it can be scoped without running tests as evidence creation",
    "it can be scoped without inspecting local logs",
    "it can be scoped without raw/private/source/source-package/PDF/image/screenshot/metadata inspection",
    "it preserves no metadata acquisition",
    "it preserves tested-scenario evidence, not runtime certainty",
    "it preserves local logs not CI evidence and not packet components",
    "it preserves DOCS_ONLY boundaries not runtime enforcement",
    "it preserves product candidate none and external-use unauthorized",
    "it preserves human/professional review as release gate",
    "it preserves no candidate selection, no actual test material, no pilot execution, and no real private run",
    "no implementation-readiness authorization is created now",
    "no implementation is created now",
    "no CI evidence, release approval, runtime certification, technical sign-off, or External Reviewer approval is created now",
    "no blocker or dependency is closed now",
    "technical evidence verification-scope cannot be closed now",
  ], summary);
});

test("required non-authorizations exist", () => {
  assertIncludesAll([
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
    "synthetic input/output candidate selection",
    "actual test-material selection",
    "local sanitized test pilot authorization",
    "local sanitized test pilot execution",
    "real private run",
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
    "technical evidence verification-scope boundary is not technical evidence creation",
    "technical evidence verification-scope boundary is not CI evidence",
    "technical evidence verification-scope boundary is not runtime certification",
    "technical evidence verification-scope boundary is not technical sign-off",
    "technical evidence verification-scope boundary is not release approval",
    "technical evidence verification-scope boundary is not External Reviewer approval",
    "technical evidence verification-scope boundary is not product candidate",
    "technical evidence verification-scope boundary is not external-use authorization",
    "technical evidence verification-scope boundary is not delivery authorization",
    "technical evidence verification-scope boundary is not packet approval",
    "technical evidence verification-scope boundary is not final delivery decision",
    "technical evidence verification-scope boundary is not PDF packet",
    "technical evidence verification-scope boundary is not archive/ZIP",
    "technical evidence verification-scope boundary is not synthetic candidate selection",
    "technical evidence verification-scope boundary is not actual test-material selection",
    "technical evidence verification-scope boundary is not pilot execution",
    "technical evidence verification-scope boundary is not real private run",
    "technical evidence verification-scope boundary is not local log inspection",
    "technical evidence verification-scope boundary is not raw/private/source inspection",
    "technical evidence verification-scope boundary is not source-package/PDF/image/screenshot/metadata inspection",
    "technical evidence verification-scope boundary is not metadata acquisition",
    "runtime-enforced label does not mean global runtime assurance",
    "schema/validator-enforced label does not mean all schemas/all runtime behavior",
    "prompt/workflow-enforced label does not mean runtime enforcement",
    "test evidence does not mean runtime certainty",
    "green tests do not mean release approval",
    "local logs do not mean CI evidence",
    "local logs do not mean packet components",
    "generated PDF does not mean repo evidence",
    "generated PDF does not mean packet component",
    "required CI does not mean CI exists",
    "required implementation evidence does not mean evidence exists",
    "future proof tests do not mean tests exist",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "product candidate requires separate explicit selection",
    "external-use requires separate explicit authorization",
    "human/professional review remains release gate",
    "continued pause is valid",
  ], evidenceLimits);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "verification-scope review does not mean technical evidence was created",
    "verification-scope review does not mean CI evidence exists",
    "verification-scope review does not mean runtime certification exists",
    "verification-scope review does not mean technical sign-off exists",
    "verification-scope review does not mean release approval exists",
    "verification-scope review does not mean External Reviewer approval exists",
    "verification-scope review does not mean product candidate exists",
    "verification-scope review does not mean external-use is authorized",
    "verification-scope review does not mean delivery is authorized",
    "verification-scope review does not mean packet approval exists",
    "verification-scope review does not mean final delivery decision exists",
    "verification-scope review does not mean PDF packet exists",
    "verification-scope review does not mean archive/ZIP exists",
    "implemented-vs-DOCS_ONLY row does not create implementation",
    "runtime-enforced row does not create global runtime certainty",
    "schema/validator-enforced row does not create validator dispatch",
    "prompt/workflow row does not create runtime behavior",
    "human/professional review gate row does not create approval",
    "tested-scenario row does not create runtime certainty",
    "green tests row does not authorize release",
    "local logs not CI row does not create CI evidence",
    "local logs not packet row does not create packet components",
    "generated PDF row does not create repo evidence or packet component",
    "D007 non-authorization row does not authorize D007",
    "candidate-scope row does not select candidates",
    "actual test-material row does not select actual test material",
    "pilot execution row does not authorize pilot execution",
    "real private run row does not authorize real private run",
    "no-raw row does not mean raw material was inspected",
    "no metadata row does not mean metadata was acquired",
    "failure-mode row does not create findings/severity/remediation",
    "D001-D007 blocker rows do not close blockers",
    "implementation evidence absence row does not mean implementation evidence exists",
    "closure criteria row does not mean closure",
    "any future technical evidence creation requires separate explicit authorization",
    "any future CI evidence requires separate explicit CI evidence creation",
    "any future release approval requires separate explicit release approval",
    "any future product candidate requires separate explicit selection",
    "any future external-use requires separate explicit authorization",
    "any future candidate selection requires separate explicit authorization",
    "any future pilot execution requires separate explicit authorization",
    "any future implementation-readiness authorization requires separate explicit authorization",
    "any future implementation requires separate explicit authorization",
  ], noOverclaim);
});

test("External Reviewer posture exists", () => {
  assertIncludesAll([
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY technical evidence verification-only consistency boundary after synthetic input/output candidate-scope, preserving no evidence creation, no CI evidence, no runtime certification, no sign-off, no release approval, no product candidate, no external-use, no candidate selection, no pilot execution, no real private run, no source/log/metadata inspection, and no blocker/dependency closure?",
    "external-review requirements remains advisory context only, not approval, sign-off, implementation-readiness authorization, implementation authorization, runtime certification, release approval, product candidate, external-use authorization, delivery authorization, packet approval, CI evidence, technical evidence creation, local sanitized pilot authorization, real private run authorization, blocker resolution, or dependency closure.",
  ], externalReviewer);
});

test("recommended next posture is limited and non-authorizing", () => {
  assertIncludesAll([
    "REVIEW_ONLY_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AFTER_SYNTHETIC_INPUT_OUTPUT_CANDIDATE_SCOPE_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommended);
});

test("forbidden overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_CREATES_TECHNICAL_EVIDENCE",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_CREATES_CI_EVIDENCE",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_CREATES_RUNTIME_CERTIFICATION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_CREATES_TECHNICAL_SIGN_OFF",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_CREATES_RELEASE_APPROVAL",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_CREATES_EXTERNAL_REVIEWER_APPROVAL",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_SELECTS_PRODUCT_CANDIDATE",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AUTHORIZES_EXTERNAL_USE",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AUTHORIZES_DELIVERY",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_CREATES_PACKET_APPROVAL",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_CREATES_FINAL_DELIVERY_DECISION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_CREATES_PDF_PACKET",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_CREATES_ARCHIVE_ZIP",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_SELECTS_SYNTHETIC_CANDIDATE",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_SELECTS_ACTUAL_TEST_MATERIAL",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AUTHORIZES_PILOT_EXECUTION",
    "TECHNICAL_EVIDENCE_VERIFICATION_SCOPE_AUTHORIZES_REAL_PRIVATE_RUN",
    "TECHNICAL_EVIDENCE_CREATED",
    "CI_EVIDENCE_EXISTS",
    "CI_EVIDENCE_CREATED",
    "TEST_OUTPUT_CAPTURED_AS_EVIDENCE",
    "LOCAL_LOGS_CAPTURED_AS_EVIDENCE",
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
    "SYNTHETIC_CANDIDATE_SELECTED",
    "ACTUAL_TEST_MATERIAL_SELECTED",
    "LOCAL_SANITIZED_TEST_PILOT_AUTHORIZED",
    "LOCAL_SANITIZED_TEST_PILOT_EXECUTED",
    "REAL_PRIVATE_RUN_AUTHORIZED",
    "REAL_PRIVATE_RUN_STARTED",
    "LOCAL_LOG_INSPECTION_AUTHORIZED",
    "LOCAL_LOGS_ARE_CI_EVIDENCE",
    "LOCAL_LOGS_ARE_PACKET_COMPONENTS",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "RUNTIME_CERTAINTY_CREATED",
    "GLOBAL_RUNTIME_ASSURANCE_CREATED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "SCHEMA_ENFORCEMENT_CREATED",
    "WORKFLOW_ENFORCEMENT_CREATED",
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
    "LEGAL_CONCLUSION_CREATED",
    "CLINICAL_CONCLUSION_CREATED",
    "EVIDENTIARY_CONCLUSION_CREATED",
    "CASE_TRUTH_CONCLUSION_CREATED",
    "CREDIBILITY_FINDING_CREATED",
    "RISK_SCORE_CREATED",
    "SUFFICIENCY_SCORE_CREATED",
    "POLICE_REPORT_CREATED",
    "PLEADING_CREATED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ]);
});
