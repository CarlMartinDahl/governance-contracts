"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-readiness-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const comparisonPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-brief.json",
  "schemas/human-review-no-conclusion-notice.json",
  "schemas/human-review-questions.json",
  "packages/schemas/src/index.js",
  "tests/human-review-controlled-handoff-brief-schema.test.js",
  "tests/human-review-no-conclusion-notice-schema.test.js",
];
const reservedLaterPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const candidateSchemaPaths = reservedLaterPaths.slice(0, 2);
const validatorResultCandidatePaths = reservedLaterPaths.slice(2, 4);
const candidatePackageExportProofPath = reservedLaterPaths[4];
const validatorResultPackageExportProofPath = reservedLaterPaths[5];
const retainedValidatorSiblingPaths = reservedLaterPaths.slice(6);

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(docsText, start, end) {
  const startIndex = docsText.indexOf(start);
  const endIndex = docsText.indexOf(end, startIndex + start.length);

  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return docsText.slice(startIndex, endIndex);
}

test("contract source and comparison evidence are tracked and bounded", () => {
  const docsText = readRequired(docsPath);

  readRequired(contractPath);
  assert.equal(docsText.includes("`" + contractPath + "`"), true);
  for (const comparisonPath of comparisonPaths) {
    readRequired(comparisonPath);
    assert.equal(
      docsText.includes("`" + comparisonPath + "`"),
      true,
      comparisonPath,
    );
  }
  assert.match(docsText, /Comparison evidence supplies repository workflow/u);
  assert.match(docsText, /does not authorize reuse of another contract's fields/u);
});

test("twenty-nine readiness rows partition schema facts from later seams", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 3. Schema-Readiness Classification",
    "## 4.",
  );

  assert.equal((section.match(/^\| [^|]+ \| `[^`]+` \|$/gmu) ?? []).length, 29);
  assert.match(section, /SCHEMA_READINESS_CLASSIFICATION_ROW_COUNT:\n29/u);
  assert.match(
    section,
    /SCHEMA_READINESS_RESULT:\nREADY_FOR_SEPARATE_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_REVIEW/u,
  );
  assert.match(section, /SCHEMA_IMPLEMENTATION_STATUS:\nNOT_CREATED/u);
  for (const classification of [
    "EXACT_CONTRACT_FACT_AVAILABLE",
    "EXACT_SCHEMA_EXPRESSIBLE_FACT_AVAILABLE",
    "EXACT_CONDITIONAL_SCHEMA_FACT_AVAILABLE",
    "VALIDATOR_ONLY_NOT_JSON_SCHEMA_PROOF",
    "SEPARATE_FUTURE_CHECKPOINT_ONLY",
    "SEPARATE_FUTURE_GATE_ONLY",
    "OPEN_FOR_SEPARATE_SCAFFOLD_SCOPE",
    "OUT_OF_SCOPE_NOT_AUTHORIZED",
  ]) {
    assert.equal(section.includes("`" + classification + "`"), true);
  }
});

test("future closed root preserves exactly thirteen contract fields", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 4. Exact Future Candidate Root Shape",
    "## 5.",
  );
  const fields = [
    "contract_id",
    "contract_version",
    "approval_ref",
    "packet_ref",
    "controlled_handoff_brief_ref",
    "controlled_handoff_brief_fingerprint",
    "approval_posture",
    "decision",
    "reviewer_attribution",
    "decision_support",
    "decided_at",
    "review_session_ref",
    "decision_attestation_ref",
  ];

  assert.match(section, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n13/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_REQUIRED_FIELDS:\nALL_THIRTEEN/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_OPTIONAL_FIELDS:\nNONE/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_ADDITIONAL_FIELDS:\nNONE/u);
  for (const [index, field] of fields.entries()) {
    assert.equal(
      section.includes("| " + (index + 1) + " | `" + field + "` |"),
      true,
      field,
    );
  }
  assert.match(section, /must not claim that JSON Schema enforces member order/u);
  assert.match(section, /does not prove that a review attempt occurred/u);
});

test("reviewer attribution and decision support stay exact closed definitions", () => {
  const docsText = readRequired(docsPath);
  const reviewer = sectionBetween(
    docsText,
    "## 5. Exact Future Reviewer-Attribution Shape",
    "## 6.",
  );
  const support = sectionBetween(
    docsText,
    "## 6. Exact Future Decision-Support Shape",
    "## 7.",
  );

  assert.match(reviewer, /FUTURE_SCHEMA_REVIEWER_ATTRIBUTION_FIELD_COUNT:\n3/u);
  assert.match(reviewer, /FUTURE_SCHEMA_REVIEWER_ATTRIBUTION_REQUIRED_FIELDS:\nALL_THREE/u);
  assert.match(reviewer, /FUTURE_SCHEMA_REVIEWER_ATTRIBUTION_ADDITIONAL_FIELDS:\nNONE/u);
  for (const field of [
    "reviewer_ref",
    "reviewer_role",
    "reviewer_authority_evidence_ref",
  ]) {
    assert.equal(reviewer.includes("`" + field + "`"), true, field);
  }
  assert.match(reviewer, /must not add a person name, email/u);

  assert.match(support, /FUTURE_SCHEMA_DECISION_SUPPORT_FIELD_COUNT:\n3/u);
  assert.match(support, /FUTURE_SCHEMA_DECISION_SUPPORT_REQUIRED_FIELDS:\nALL_THREE/u);
  assert.match(support, /FUTURE_SCHEMA_DECISION_SUPPORT_ADDITIONAL_FIELDS:\nNONE/u);
  assert.match(support, /`decision_basis_refs` \| array, `minItems: 1`/u);
  assert.match(support, /`prior_approval_refs` \| array, `minItems: 0`, `maxItems: 1`/u);
  assert.match(support, /`uniqueItems: true`/u);
  assert.match(support, /cannot prove that a decision-basis reference exists/u);
});

test("seventeen scalar constraints and conditional cardinality are exact", () => {
  const docsText = readRequired(docsPath);
  const scalar = sectionBetween(
    docsText,
    "## 7. Exact Future Scalar Constraints",
    "## 8.",
  );
  const conditional = sectionBetween(
    docsText,
    "## 8. Exact Conditional Correction-Request Constraint",
    "## 9.",
  );

  assert.equal(
    (scalar.match(/^\| `[^`]+`(?: items)? \|/gmu) ?? []).length,
    17,
  );
  assert.match(scalar, /FUTURE_SCHEMA_SCALAR_CONSTRAINT_ROW_COUNT:\n17/u);
  for (const value of [
    "human_review.controlled_handoff_human_professional_approval",
    "APPROVAL_DECISION_CANDIDATE_ONLY",
    "HUMAN_PROFESSIONAL_GATE_APPROVED",
    "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
    "HUMAN_PROFESSIONAL_GATE_REJECTED",
    "HUMAN_REVIEWER",
    "PROFESSIONAL_REVIEWER",
  ]) {
    assert.equal(scalar.includes(value), true, value);
  }
  for (const prefix of [
    "apr_",
    "pkt_",
    "hro_",
    "sha256:",
    "rvr_",
    "rae_",
    "rvb_",
    "cor_",
    "rvs_",
    "att_",
  ]) {
    assert.equal(scalar.includes(prefix), true, prefix);
  }
  assert.match(scalar, /Every\nfield is required with one non-null type/u);
  assert.match(conditional, /FUTURE_SCHEMA_CORRECTION_REQUIRED_MIN_ITEMS:\n1/u);
  assert.match(conditional, /FUTURE_SCHEMA_CORRECTION_REQUIRED_MAX_ITEMS:\n1/u);
  assert.match(conditional, /FUTURE_SCHEMA_NON_CORRECTION_MAX_ITEMS:\n0/u);
  assert.match(conditional, /does not determine\nthat correction is substantively required/u);
});

test("schema limits retain admissibility authority and approval-effect separation", () => {
  const docsText = readRequired(docsPath);
  const limits = sectionBetween(
    docsText,
    "## 9. JSON Schema Enforcement Limits",
    "## 10.",
  );
  const ownership = sectionBetween(
    docsText,
    "## 10. Separate Validator, Admissibility, And Runtime Ownership",
    "## 11.",
  );

  assert.match(
    limits,
    /REFERENCE_EXISTENCE_OR_MEMBERSHIP_ENFORCEMENT:\nSEPARATE_FUTURE_ADMISSIBILITY_CHECKPOINT_ONLY/u,
  );
  assert.match(
    limits,
    /FINGERPRINT_CORRECTNESS_ENFORCEMENT:\nSEPARATE_FUTURE_ADMISSIBILITY_CHECKPOINT_ONLY/u,
  );
  assert.match(
    limits,
    /REVIEWER_AUTHORITY_ENFORCEMENT:\nSEPARATE_FUTURE_ADMISSIBILITY_CHECKPOINT_ONLY/u,
  );
  assert.match(
    limits,
    /SESSION_ATTESTATION_AND_CURRENTNESS_ENFORCEMENT:\nSEPARATE_FUTURE_ADMISSIBILITY_CHECKPOINT_ONLY/u,
  );
  assert.match(limits, /APPROVAL_EFFECT_IN_CANDIDATE_SCHEMA:\nPROHIBITED/u);
  assert.match(
    ownership,
    /VALIDATOR_RESULT_SCHEMA_IN_CANDIDATE_SCAFFOLD:\nEXCLUDED_AND_NOT_CREATED/u,
  );
  assert.match(
    ownership,
    /CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_IN_CANDIDATE_SCAFFOLD:\nEXCLUDED_AND_NOT_CREATED/u,
  );
  assert.match(
    ownership,
    /APPROVAL_EFFECT_IN_CANDIDATE_SCAFFOLD:\nEXCLUDED_AND_NOT_CREATED/u,
  );
});

test("historical open questions follow both candidate transitions and retain sibling absence", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const readinessProofText = readRequired(proofPath);
  const section = sectionBetween(
    docsText,
    "## 11. Open Scaffold-Scope Questions",
    "## 12.",
  );

  assert.match(section, /OPEN_SCAFFOLD_SCOPE_QUESTION_COUNT:\n11/u);
  assert.equal((section.match(/^\d+\. /gmu) ?? []).length, 11);
  for (const candidatePath of candidateSchemaPaths) {
    assert.equal(section.includes("`" + candidatePath + "`"), true, candidatePath);
    assert.equal(
      transitionText.includes(
        "`" +
          candidatePath +
          "` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  for (const validatorResultCandidatePath of validatorResultCandidatePaths) {
    assert.equal(
      transitionText.includes(
        "`" + validatorResultCandidatePath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      validatorResultCandidatePath,
    );
    assert.equal(
      validatorResultTransitionText.includes(
        "`" +
          validatorResultCandidatePath +
          "` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      validatorResultCandidatePath,
    );
  }
  assert.equal(
    readinessProofText.includes(
      "fs." + "existsSync(absolute(validatorResultCandidatePath))",
    ),
    false,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" + candidatePackageExportProofPath + "`",
    ),
    true,
  );
  assert.equal(
    readinessProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`" + validatorResultPackageExportProofPath + "`",
    ),
    true,
  );
  assert.equal(
    readinessProofText.includes(
      "fs." +
        "existsSync(absolute(validatorResultPackageExportProofPath))",
    ),
    false,
  );
  const validatorHelperProofTransitionText = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  );
  for (const retainedPath of retainedValidatorSiblingPaths) {
    assert.equal(
      transitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
  }
  assert.match(section, /Path reservation is not file creation/u);
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.equal(
    transitionText.includes("`" + proofPath + "`"),
    true,
  );
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_CANDIDATE_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransitionText,
    /RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    validatorResultTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  assert.match(
    validatorResultTransitionText,
    /TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n11/u,
  );
  assert.match(
    packageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n10/u,
  );
  assert.match(
    packageExportTransitionText,
    /TRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n13/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n12/u,
  );
});

test("exact two-file docs scope and no-overclaim boundary are frozen", () => {
  const docsText = readRequired(docsPath);
  const scope = sectionBetween(
    docsText,
    "## 12. Non-Interference And Exact File Scope",
    "## 13.",
  );

  assert.match(scope, /SCHEMA_READINESS_SLICE_FILE_COUNT:\n2/u);
  assert.equal(scope.includes("`" + docsPath + "`"), true);
  assert.equal(scope.includes("`" + proofPath + "`"), true);
  assert.match(docsText, /SCHEMA_FILE_NOT_CREATED/u);
  assert.match(docsText, /VALIDATOR_NOT_CREATED/u);
  assert.match(docsText, /APPROVAL_EFFECT_NOT_CREATED/u);
  assert.match(docsText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
  assert.match(docsText, /PRODUCT_CANDIDATE_NONE/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
});
