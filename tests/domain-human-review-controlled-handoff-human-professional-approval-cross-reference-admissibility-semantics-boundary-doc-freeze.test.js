"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CROSS_REFERENCE_ADMISSIBILITY_SEMANTICS_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-brief-cross-reference-result.json",
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
  "packages/governance/src/human-review-controlled-handoff-brief-pre-human-professional-approval-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-pre-human-professional-approval-validation-boundary.test.js",
  "docs/API_CONTRACTS_GOVERNANCE_v1.md",
  "packages/governance/src/index.js",
  "tests/governance-canonical-json-helper-doc-freeze.test.js",
  "packages/governance/src/authenticated-actor-identity-evidence-contract.js",
  "packages/governance/src/rbac-actor-role-binding-evidence-contract.js",
  "packages/governance/src/local-service-permission-current-state-evidence-contract.js",
  "packages/governance/src/local-service-permission-repository-currentness-evidence-contract.js",
  "packages/governance/src/local-service-permission-lifecycle-history-evidence-contract.js",
];
const retainedAbsentFuturePaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-result-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CROSS_REFERENCE_ADMISSIBILITY_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "packages/governance/src/human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-validation-boundary.js",
  "tests/human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-validation-boundary.test.js",
];
const futureResultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalCrossReferenceAdmissibilityResult";
const futureFunctionName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalCrossReferenceAdmissibility";
const dependencyFileFragments = [
  "reviewer-identity",
  "reviewer-role",
  "reviewer-authority",
  "review-session",
  "decision-attestation",
  "decision-basis",
  "prior-approval",
  "correction-request",
  "trusted-clock",
  "trusted-time",
  "clock",
  "freshness",
  "lifecycle",
  "adjacency",
  "currentness",
  "replacement",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(
    fs.existsSync(absolutePath),
    true,
    `expected ${relativePath} to exist`,
  );
  return fs.readFileSync(absolutePath, "utf8");
}

function readSection(docsText, heading, nextHeading) {
  const start = docsText.indexOf(heading);
  const end = nextHeading
    ? docsText.indexOf(nextHeading, start + heading.length)
    : docsText.length;

  assert.notEqual(start, -1, heading);
  assert.notEqual(end, -1, nextHeading);
  return docsText.slice(start, end);
}

test("approval admissibility semantics boundary and controlling sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
    assert.equal(
      docsText.includes("`" + controllingPath + "`"),
      true,
      controllingPath,
    );
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CROSS_REFERENCE_ADMISSIBILITY_SEMANTICS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(
    docsText,
    /OWNER_SELECTED_ELEVEN_STAGE_SEMANTICS_TRANSLATED/u,
  );
});

test("all eleven Owner-selected Stage A decisions are frozen", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "## 3. Eleven Owner-Selected Stages",
    "## 4.",
  );

  for (let stage = 1; stage <= 11; stage += 1) {
    assert.match(
      docsText,
      new RegExp(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`, "u"),
    );
  }

  assert.equal((section.match(/^\| (?:[1-9]|1[01]) \|/gmu) ?? []).length, 11);
  assert.match(docsText, /OWNER_SELECTED_STAGE_COUNT:\n11/u);
  assert.match(docsText, /OPEN_OWNER_SELECTED_STAGE_DECISION_COUNT:\n0/u);
  assert.match(
    docsText,
    /IMPLEMENTATION_PREREQUISITE_FAMILY_COUNT:\n9/u,
  );
  assert.match(
    docsText,
    /Resolution of these documentation decisions is not implementation authority/u,
  );
});

test("same-call posture is direct, closed, and lookup-free", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "## 4. Future Same-Call Input Posture",
    "## 5.",
  );

  for (const marker of [
    "SINGLE_CLOSED_SAME_CALL_ENVELOPE_REQUIRED",
    "NO_LOOKUP_DEREFERENCE_DISCOVERY_OR_PERSISTENCE",
    "OUTER_ENVELOPE_MACHINE_FIELD_MAP:\nDEFERRED_UNTIL_ALL_DEPENDENCY_CONTRACTS_ARE_TRACKED",
    "OUTER_ENVELOPE_MACHINE_FIELD_ORDER:\nDEFERRED_UNTIL_ALL_DEPENDENCY_CONTRACTS_ARE_TRACKED",
    "INPUT_SCHEMA_STATUS:\nNOT_CREATED_AND_NOT_AUTHORIZED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  for (const phrase of [
    "one `approval_candidate`",
    "No previously computed cross-reference",
    "No candidate is fetched, discovered, resolved through a",
    "generic evidence bag",
  ]) {
    assert.equal(section.includes(phrase), true, phrase);
  }
});

test("validation uses the two existing helpers once and stops by phase", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "## 5. Deterministic Validation And Stop Order",
    "## 6.",
  );
  const orderedPhrases = [
    "snapshot and validate the exact closed outer envelope",
    "validateHumanReviewControlledHandoffBriefCrossReferencePreHumanProfessionalApproval",
    "validateHumanReviewControlledHandoffHumanProfessionalApproval",
    "perform exact packet-reference",
    "validate reviewer identity, role, and authority",
    "validate the five separate session",
    "evaluate trusted time, freshness, currentness",
    "derive approval-record admissibility and candidate eligibility",
    "return one deeply frozen no-echo result",
  ];
  let priorIndex = -1;

  for (const phrase of orderedPhrases) {
    const index = section.indexOf(phrase);
    assert.equal(index > priorIndex, true, phrase);
    priorIndex = index;
  }

  assert.match(docsText, /DETERMINISTIC_EXECUTION_PHASE_COUNT:\n9/u);
  assert.match(
    docsText,
    /EXISTING_BRIEF_PRE_APPROVAL_WRAPPER_INVOCATION_COUNT:\n1/u,
  );
  assert.match(
    docsText,
    /APPROVAL_STRUCTURAL_VALIDATOR_INVOCATION_COUNT:\n1/u,
  );
  assert.match(
    docsText,
    /TRUST_PRECOMPUTED_VALIDATOR_OR_CROSS_REFERENCE_RESULT:\nPROHIBITED/u,
  );
  assert.match(section, /Each failed phase stops every later phase/u);
});

test("brief binding and canonical fingerprint semantics stay exact", () => {
  const docsText = readRequired(docsPath);
  const canonicalBoundaryText = readRequired("docs/API_CONTRACTS_GOVERNANCE_v1.md");
  const governanceIndexText = readRequired("packages/governance/src/index.js");
  const section = readSection(
    docsText,
    "## 6. Exact Brief Binding And Fingerprint Semantics",
    "## 7.",
  );

  for (const phrase of [
    "`approval_candidate.packet_ref`",
    "`approval_candidate.controlled_handoff_brief_ref`",
    "`toCanonicalJson(value)` byte profile",
    "arrays are serialized recursively in encounter order",
    "`Object.keys(value).sort()` with no comparator",
    "default ECMAScript ascending comparison of UTF-16 code-unit sequences",
    "`JSON.stringify(key)`",
    "`JSON.stringify(value)`",
    "with no inserted whitespace",
    "UTF-8 bytes without a",
    "byte-order mark",
    "calculate SHA-256",
    "exactly 64 lowercase hexadecimal",
    "compare that string case-sensitively",
    "The hash excludes the separate brief binding",
    "it may not substitute a locale",
  ]) {
    assert.equal(section.includes(phrase), true, phrase);
  }

  assert.match(
    docsText,
    /CANONICAL_JSON_HELPER_OWNERSHIP:\nSHARED_GOVERNANCE_TO_CANONICAL_JSON_SEAM/u,
  );
  assert.match(docsText, /SHARED_GOVERNANCE_TO_CANONICAL_JSON_SEAM_SELECTED/u);
  assert.match(
    docsText,
    /CANONICAL_JSON_BYTE_PROFILE:\nEXACT_EXISTING_TO_CANONICAL_JSON_SEMANTICS/u,
  );
  assert.match(
    docsText,
    /PARALLEL_CANONICAL_JSON_BUILDER:\nPROHIBITED/u,
  );
  assert.match(
    docsText,
    /CANONICAL_JSON_RUNTIME_EXTENSION_CREATED_BY_THIS_SLICE:\nNO/u,
  );
  assert.match(
    docsText,
    /FINGERPRINT_CALCULATION_OR_COMPARISON_CREATED_BY_THIS_SLICE:\nNO/u,
  );
  assert.match(
    canonicalBoundaryText,
    /future governance flows that need the same stable serialization should extend the existing `toCanonicalJson` seam instead of introducing parallel canonical JSON builders/u,
  );
  assert.match(
    governanceIndexText,
    /function toCanonicalJson\(value\) \{[\s\S]*value\.map\(\(item\) => toCanonicalJson\(item\)\)[\s\S]*Object\.keys\(value\)[\s\S]*\.sort\(\)[\s\S]*JSON\.stringify\(key\)[\s\S]*toCanonicalJson\(value\[key\]\)[\s\S]*return JSON\.stringify\(value\);[\s\S]*\}/u,
  );
});

test("reviewer evidence remains a separate three-family prerequisite", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "## 7. Reviewer Evidence Prerequisite Partition",
    "## 8.",
  );

  for (const fieldPath of [
    "approval_candidate.reviewer_attribution.reviewer_ref",
    "approval_candidate.reviewer_attribution.reviewer_role",
    "approval_candidate.reviewer_attribution.reviewer_authority_evidence_ref",
  ]) {
    assert.equal(
      section.includes("`" + fieldPath + "`"),
      true,
      fieldPath,
    );
  }

  assert.match(
    docsText,
    /REVIEWER_EVIDENCE_DEPENDENCY_CONTRACT_COUNT:\n3/u,
  );
  assert.match(
    docsText,
    /REVIEWER_EVIDENCE_CONTRACTS_STATUS:\nABSENT_AND_IMPLEMENTATION_BLOCKING/u,
  );
  assert.match(section, /remain precedent only/u);
  assert.match(
    section,
    /cannot satisfy this approval-specific\nadmissibility phase/u,
  );
});

test("session attestation and decision-support dependencies stay partitioned", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "## 8. Session, Attestation, And Decision-Support Prerequisites",
    "## 9.",
  );

  for (const field of [
    "review_session_ref",
    "decision_attestation_ref",
    "decision_basis_refs",
    "prior_approval_refs",
  ]) {
    assert.equal(section.includes("`" + field + "`"), true, field);
  }
  assert.match(section, /correction-request candidates/u);
  assert.match(
    section,
    /zero correction-request candidates when `approval_candidate\.decision` is\s+`HUMAN_PROFESSIONAL_GATE_APPROVED` or\s+`HUMAN_PROFESSIONAL_GATE_REJECTED`, and exactly one candidate for the sole\s+correction-required reference when `approval_candidate\.decision` is\s+`HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED`/u,
  );
  assert.match(section, /no missing candidate, no\nextra candidate/u);
  assert.match(
    section,
    /order is preserved for deterministic\nprocessing but creates no priority/u,
  );
  assert.match(
    docsText,
    /SESSION_ATTESTATION_DECISION_SUPPORT_DEPENDENCY_CONTRACT_COUNT:\n5/u,
  );
  assert.match(
    docsText,
    /SESSION_ATTESTATION_DECISION_SUPPORT_CONTRACTS_STATUS:\nABSENT_AND_IMPLEMENTATION_BLOCKING/u,
  );
});

test("trusted time currentness and replacement remain separately blocked", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "## 9. Trusted Time, Currentness, And Replacement Matrix",
    "## 10.",
  );

  for (const phrase of [
    "trusted evaluation instant",
    "freshness rule separately for each dependency family",
    "immediate historical adjacency",
    "current-record selection",
    "replacement and supersession relationships",
    "stale, expired, revoked, superseded, disputed, conflicting",
  ]) {
    assert.equal(section.includes(phrase), true, phrase);
  }

  for (const marker of [
    "TRUSTED_CLOCK_CONTRACT_STATUS:\nABSENT_AND_IMPLEMENTATION_BLOCKING",
    "APPROVAL_CURRENTNESS_REPLACEMENT_MATRIX_STATUS:\nABSENT_AND_IMPLEMENTATION_BLOCKING",
    "ARBITRARY_GLOBAL_TTL:\nPROHIBITED",
    "DECLARED_CURRENTNESS_ACCEPTED_AS_VERIFIED_CURRENTNESS:\nPROHIBITED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});

test("admissibility and candidate eligibility remain distinct", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "## 10. Approval-Record Admissibility And Candidate Eligibility",
    "## 11.",
  );

  assert.equal((section.match(/^\| yes \|/gmu) ?? []).length, 3);
  assert.equal((section.match(/^\| no \|/gmu) ?? []).length, 1);
  assert.match(
    section,
    /HUMAN_PROFESSIONAL_GATE_APPROVED.*`true`.*`ELIGIBLE_FOR_SEPARATE_FUTURE_HANDOFF_EXPORT_GATE`/u,
  );
  assert.match(
    section,
    /HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED.*`true`.*`INELIGIBLE_FOR_SEPARATE_FUTURE_HANDOFF_EXPORT_GATE`/u,
  );
  assert.match(
    section,
    /HUMAN_PROFESSIONAL_GATE_REJECTED.*`true`.*`INELIGIBLE_FOR_SEPARATE_FUTURE_HANDOFF_EXPORT_GATE`/u,
  );
  assert.match(
    docsText,
    /ADMISSIBILITY_AND_ELIGIBILITY_CONFLATION:\nPROHIBITED/u,
  );
  assert.match(docsText, /ELIGIBILITY_AS_AUTHORIZATION:\nPROHIBITED/u);
  assert.match(
    docsText,
    /AUTOMATIC_HANDOFF_EXPORT_DELIVERY_RELEASE:\nPROHIBITED/u,
  );
});

test("future result shape and two-value eligibility enum are exact", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "## 11. Exact Future Result Shape",
    "## 12.",
  );
  const expectedFields = [
    "admissible",
    "candidateEligibility",
    "contractKind",
    "version",
    "errors",
  ];
  const enumHeading = "The exact candidate-eligibility values in canonical order are:";
  const enumHeadingIndex = section.indexOf(enumHeading);
  assert.notEqual(enumHeadingIndex, -1);
  const fieldBlock = section.slice(0, enumHeadingIndex);
  const enumBlock = section.slice(enumHeadingIndex + enumHeading.length);
  const declaredFields = Array.from(
    fieldBlock.matchAll(/^\d+\. `([^`]+)`$/gmu),
    (match) => match[1],
  );
  const expectedEligibilityValues = [
    "ELIGIBLE_FOR_SEPARATE_FUTURE_HANDOFF_EXPORT_GATE",
    "INELIGIBLE_FOR_SEPARATE_FUTURE_HANDOFF_EXPORT_GATE",
  ];
  const declaredEligibilityValues = Array.from(
    enumBlock.matchAll(/^\d+\. `([^`]+)`$/gmu),
    (match) => match[1],
  );

  assert.deepEqual(declaredFields, expectedFields);
  assert.deepEqual(declaredEligibilityValues, expectedEligibilityValues);

  assert.match(docsText, /FUTURE_RESULT_FIELD_COUNT:\n5/u);
  assert.match(docsText, /CANDIDATE_ELIGIBILITY_ENUM_COUNT:\n2/u);
  assert.match(
    section,
    /ELIGIBLE_FOR_SEPARATE_FUTURE_HANDOFF_EXPORT_GATE/u,
  );
  assert.match(
    section,
    /INELIGIBLE_FOR_SEPARATE_FUTURE_HANDOFF_EXPORT_GATE/u,
  );
  assert.match(
    docsText,
    /RESULT_CONTRACT_KIND_LITERAL:\nDEFERRED_TO_SEPARATE_RESULT_SCHEMA_SEMANTICS/u,
  );
  assert.match(
    docsText,
    /RESULT_VERSION_LITERAL:\nDEFERRED_TO_SEPARATE_RESULT_SCHEMA_SEMANTICS/u,
  );
  assert.match(
    docsText,
    /RESULT_SCHEMA_STATUS:\nNOT_CREATED_AND_NOT_AUTHORIZED/u,
  );
  assert.match(section, /never echoes the approval decision/u);
});

test("nineteen public errors are ordered fail-fast and no-echo", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "## 12. Exact Ordered Public Error Taxonomy",
    "## 13.",
  );
  const errorCodes = [
    "invalid_input_shape",
    "controlled_handoff_brief_cross_reference_invalid",
    "approval_candidate_invalid",
    "packet_ref_mismatch",
    "controlled_handoff_brief_ref_mismatch",
    "controlled_handoff_brief_fingerprint_evaluation_failed",
    "controlled_handoff_brief_fingerprint_mismatch",
    "reviewer_identity_evidence_invalid",
    "reviewer_role_evidence_invalid",
    "reviewer_authority_evidence_invalid",
    "review_session_evidence_invalid",
    "decision_attestation_evidence_invalid",
    "decision_basis_evidence_invalid",
    "prior_approval_evidence_invalid",
    "correction_request_evidence_invalid",
    "freshness_evidence_invalid",
    "currentness_evidence_invalid",
    "replacement_relationship_invalid",
    "internal_evaluation_failure",
  ];
  let priorIndex = -1;

  for (const code of errorCodes) {
    const index = section.indexOf("`" + code + "`");
    assert.equal(index > priorIndex, true, code);
    priorIndex = index;
  }

  assert.equal((section.match(/^\d+\. `/gmu) ?? []).length, 19);
  assert.match(docsText, /PUBLIC_ERROR_CODE_COUNT:\n19/u);
  assert.match(docsText, /MAXIMUM_PUBLIC_ERROR_COUNT_PER_RESULT:\n1/u);
  assert.match(docsText, /CHILD_VALIDATOR_ERROR_ECHO:\nPROHIBITED/u);
  assert.match(docsText, /EVIDENCE_OR_VALUE_ECHO:\nPROHIBITED/u);
  assert.match(docsText, /EXCEPTION_MESSAGE_ECHO:\nPROHIBITED/u);
  assert.match(
    docsText,
    /ERROR_PATH_LITERAL_MAP:\nDEFERRED_UNTIL_DEPENDENCY_ENVELOPE_FREEZE/u,
  );
  assert.match(
    section,
    /correction-required or rejected record is ineligible but has no\npublic error/u,
  );
});

test("future schema export proof-transition runtime and dependencies stay absent", () => {
  const docsText = readRequired(docsPath);

  for (const relativePath of retainedAbsentFuturePaths) {
    assert.equal(
      fs.existsSync(path.join(repoRoot, relativePath)),
      false,
      relativePath,
    );
  }

  const governanceSourceNames = fs.readdirSync(
    path.join(repoRoot, "packages/governance/src"),
  );
  const approvalDependencySourceNames = governanceSourceNames.filter((name) =>
    dependencyFileFragments.some((fragment) =>
      name.includes(
        "human-review-controlled-handoff-human-professional-approval-" +
          fragment,
      ),
    ),
  );
  assert.deepEqual(approvalDependencySourceNames, []);

  const schemasIndex = readRequired("packages/schemas/src/index.js");
  const governanceIndex = readRequired("packages/governance/src/index.js");
  assert.equal(schemasIndex.includes(futureResultExportName), false);
  assert.equal(governanceIndex.includes(futureFunctionName), false);

  for (const marker of [
    "RESULT_SCHEMA_NOT_CREATED",
    "RESULT_SCHEMA_PACKAGE_EXPORT_NOT_CREATED",
    "PROOF_TRANSITION_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "IMPLEMENTATION_READINESS_BLOCKED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});

test("two-file scope and final no-conclusion boundary remain explicit", () => {
  const docsText = readRequired(docsPath);
  const scope = readSection(
    docsText,
    "## 14. Current Two-File Docs-Only Slice",
    "## 15.",
  );
  const proof = readSection(docsText, "## 16. Proof Boundary", "## 17.");
  const finalBoundary = readSection(
    docsText,
    "## 17. Final No-Conclusion Boundary",
  );

  assert.match(scope, /CURRENT_SLICE_FILE_COUNT:\n2/u);
  assert.match(scope, /CURRENT_SLICE_RUNTIME_FILE_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SLICE_SCHEMA_FILE_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SLICE_PACKAGE_EXPORT_COUNT:\n0/u);
  assert.match(
    proof,
    /DOCS_ONLY_SEMANTICS_FROZEN_DEPENDENCIES_AND_IMPLEMENTATION_REMAIN_FAIL_CLOSED/u,
  );
  assert.match(
    docsText,
    /NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED/u,
  );
  assert.match(
    docsText,
    /NO_LEGAL_EVIDENTIARY_PROFESSIONAL_OR_CASE_TRUTH_CONCLUSION_CREATED/u,
  );
  assert.match(docsText, /PRODUCT_CANDIDATE_NONE/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
  assert.match(finalBoundary, /not legal review, evidentiary review/u);
  assert.match(
    finalBoundary,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_PREREQUISITE_CONTRACT_SEMANTICS/u,
  );
});
