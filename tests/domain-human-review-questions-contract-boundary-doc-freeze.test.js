"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-questions-contract-boundary-doc-freeze.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "README.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_STATE_MODEL_CONTRACT_v1.md",
  "schemas/human-review-state-model.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-chronology.json",
  "packages/schemas/src/human-review-chronology-validator.js",
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix.json",
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-declared-packet-review-gaps.json",
  "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
  "packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
  "schemas/controlled-synthetic-red-team-result-envelope.json",
];
const candidateSchemaPaths = [
  "schemas/human-review-questions.json",
  "tests/human-review-questions-schema.test.js",
];
const validatorResultCandidatePaths = [
  "schemas/human-review-questions-validator-result.json",
  "tests/human-review-questions-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-questions-validator.js",
  "tests/human-review-questions-validator.test.js",
];
const retainedCrossReferencePaths = [
  "packages/governance/src/human-review-questions-cross-reference-validation-boundary.js",
  "tests/human-review-questions-cross-reference-validation-boundary.test.js",
];
const retainedLaterSiblingPaths = [
  ...historicalValidatorHelperPaths,
  ...retainedCrossReferencePaths,
];
const reservedLaterPaths = [
  ...candidateSchemaPaths,
  ...validatorResultCandidatePaths,
  ...retainedLaterSiblingPaths,
];

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

test("human review questions contract boundary and sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
    assert.equal(
      docsText.includes("`" + controllingPath + "`"),
      true,
      controllingPath,
    );
  }

  for (const marker of [
    "HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY",
    "DOCS_ONLY",
    "OWNER_SELECTED_SIX_STAGE_SEMANTICS_TRANSLATED",
    "EXACT_NINETEEN_CONTRACT_DECISIONS_RESOLVED",
    "EXACT_PACKET_SCOPED_FOUR_FIELD_ROOT_DEFINED",
    "EXACT_SEVEN_FIELD_QUESTION_ROW_DEFINED",
    "HUMAN_DECLARED_UNANSWERED_QUESTION_POSTURE_DEFINED",
    "EXACT_FOUR_REFERENCE_ARRAYS_DEFINED",
    "AT_LEAST_ONE_REFERENCE_REQUIRED",
    "NO_REVIEW_STATE_STOP_OUTCOME_OR_ANSWER_FIELDS",
    "DETERMINISTIC_ORDER_DUPLICATE_AND_SNAPSHOT_RULES_DEFINED",
    "EXACT_FOUR_FIELD_VALIDATOR_RESULT_DEFINED",
    "EXACT_TEN_VALIDATOR_ERROR_CODES_DEFINED",
    "STRUCTURAL_VALIDATION_SEPARATE_FROM_CROSS_REFERENCE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});

test("all six Owner stages resolve exactly nineteen decisions", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 3. Owner-Selected Decision Record",
    "## 4.",
  );

  for (let stage = 1; stage <= 6; stage += 1) {
    assert.match(docsText, new RegExp(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`, "u"));
  }
  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 19);
  assert.match(docsText, /OWNER_SELECTED_DECISION_STAGE_COUNT:\n6/u);
  assert.match(
    docsText,
    /PREVIOUSLY_OPEN_DECISION_COUNT_RESOLVED_AT_DOCS_CONTRACT_LEVEL:\n19/u,
  );
});

test("contract identity and exact packet-scoped four-field root are frozen", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5.",
  );

  assert.match(section, /CONTRACT_ID:\nhuman_review\.review_questions/u);
  assert.match(section, /CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(section, /TOP_LEVEL_FIELD_COUNT:\n4/u);
  for (const [position, field] of [
    [1, "contract_id"],
    [2, "contract_version"],
    [3, "packet_ref"],
    [4, "questions"],
  ]) {
    assert.match(section, new RegExp(String(position) + "\\. `" + field + "`", "u"));
  }
  assert.equal(
    section.includes("`^pkt_[a-z0-9][a-z0-9_-]{0,59}$`"),
    true,
  );
  assert.match(section, /`questions` \| array with `minItems: 0`/u);
  assert.match(section, /No top-level field is optional/u);
  assert.match(section, /empty `questions` array is structurally valid/u);
  assert.match(section, /Unknown contract identifiers[\s\S]*fail closed/u);
});

test("question rows freeze seven fields human origin and pre-trimmed text", () => {
  const docsText = readRequired(docsPath);
  const shapeSection = sectionBetween(
    docsText,
    "## 5. Exact Question Row Shape",
    "## 6.",
  );
  const textSection = sectionBetween(
    docsText,
    "## 6. Human Declaration And Bounded Text",
    "## 7.",
  );

  assert.match(shapeSection, /QUESTION_ROW_FIELD_COUNT:\n7/u);
  for (const [position, field] of [
    [1, "question_ref"],
    [2, "declaration_origin"],
    [3, "declared_question_text"],
    [4, "source_refs"],
    [5, "chronology_entry_refs"],
    [6, "claim_refs"],
    [7, "gap_refs"],
  ]) {
    assert.match(
      shapeSection,
      new RegExp(String(position) + "\\. `" + field + "`", "u"),
    );
  }
  assert.equal(
    shapeSection.includes("`^qst_[a-z0-9][a-z0-9_-]{0,59}$`"),
    true,
  );
  assert.match(
    shapeSection,
    /`declaration_origin` \| string equal to `HUMAN_DECLARED`/u,
  );
  assert.match(shapeSection, /pre-trimmed string containing 1 through 1000/u);
  assert.match(shapeSection, /QUESTION_PURPOSE_OR_CATEGORY_IN_V1:\nABSENT/u);
  assert.match(shapeSection, /REVIEW_STATE_OR_STOP_OUTCOME_IN_V1:\nABSENT/u);
  assert.match(shapeSection, /ANSWER_RESOLUTION_OR_CLOSURE_IN_V1:\nABSENT/u);
  assert.match(textSection, /DECLARATION_ORIGIN_ENUM_COUNT:\n1/u);
  assert.match(textSection, /DECLARED_QUESTION_TEXT_MIN_CODE_POINTS:\n1/u);
  assert.match(textSection, /DECLARED_QUESTION_TEXT_MAX_CODE_POINTS:\n1000/u);
  assert.match(textSection, /DECLARED_QUESTION_TEXT_MUST_BE_PRE_TRIMMED:\ntrue/u);
  assert.match(
    textSection,
    /AUTOMATIC_QUESTION_REWRITING_COMPLETION_OR_GENERATION:\nPROHIBITED_IN_V1/u,
  );
});

test("four opaque reference arrays require at least one total relationship", () => {
  const docsText = readRequired(docsPath);
  const shapeSection = sectionBetween(
    docsText,
    "## 5. Exact Question Row Shape",
    "## 6.",
  );
  const referenceSection = sectionBetween(
    docsText,
    "## 7. Opaque Reference Relationships",
    "## 8.",
  );

  for (const pattern of [
    "^src_[a-z0-9][a-z0-9_-]{0,59}$",
    "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
    "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
    "^gap_[a-z0-9][a-z0-9_-]{0,59}$",
  ]) {
    assert.equal(shapeSection.includes("`" + pattern + "`"), true, pattern);
  }
  assert.match(referenceSection, /REFERENCE_ARRAY_COUNT:\n4/u);
  assert.match(referenceSection, /EACH_REFERENCE_ARRAY_MAY_BE_EMPTY:\ntrue/u);
  assert.match(
    referenceSection,
    /QUESTION_ROW_MINIMUM_TOTAL_REFERENCE_COUNT:\n1/u,
  );
  assert.match(referenceSection, /`question_reference_required` at the row path/u);
  assert.match(
    referenceSection,
    /CROSS_REFERENCE_MEMBERSHIP_IN_STRUCTURAL_VALIDATOR:\nfalse/u,
  );
  assert.match(
    referenceSection,
    /PACKET_REFERENCE_EQUALITY_IN_STRUCTURAL_VALIDATOR:\nfalse/u,
  );
  assert.match(referenceSection, /does not establish source truth/u);
});

test("unanswered posture ordering duplicates and lifecycle stay fail closed", () => {
  const docsText = readRequired(docsPath);
  const postureSection = sectionBetween(
    docsText,
    "## 8. Unanswered Human Review Posture",
    "## 9.",
  );
  const orderingSection = sectionBetween(
    docsText,
    "## 9. Ordering, Duplicates, And Conflicts",
    "## 10.",
  );
  const lifecycleSection = sectionBetween(
    docsText,
    "## 10. Snapshot And Human Lifecycle Boundary",
    "## 11.",
  );

  assert.match(
    postureSection,
    /QUESTION_POSTURE:\nHUMAN_DECLARED_UNANSWERED_REVIEW_PROPOSAL_ONLY/u,
  );
  assert.match(postureSection, /AUTOMATIC_REVIEW_STATE_MAPPING:\nPROHIBITED/u);
  assert.match(
    postureSection,
    /AUTOMATIC_ANSWER_DECISION_OR_ESCALATION:\nPROHIBITED/u,
  );
  for (const code of [
    "duplicate_question_ref",
    "duplicate_source_ref",
    "duplicate_chronology_entry_ref",
    "duplicate_claim_ref",
    "duplicate_gap_ref",
  ]) {
    assert.equal(orderingSection.includes("`" + code + "`"), true, code);
  }
  assert.match(orderingSection, /input question-row order is preserved/u);
  assert.match(orderingSection, /repeated question text is allowed/u);
  assert.match(orderingSection, /same structurally valid referenced token may be reused/u);
  assert.match(orderingSection, /Conflicting questions may coexist/u);
  assert.match(
    lifecycleSection,
    /HUMAN_CORRECTION_MODEL:\nCOMPLETE_REPLACEMENT_CANDIDATE_BEFORE_CONTROLLED_HANDOFF/u,
  );
  assert.match(lifecycleSection, /IN_PLACE_MUTATION_BY_VALIDATOR:\nPROHIBITED/u);
  assert.match(lifecycleSection, /REVISION_HISTORY_IN_V1_CONTRACT:\nABSENT/u);
});

test("generation inference and prohibited semantic families remain excluded", () => {
  const docsText = readRequired(docsPath);
  const generationSection = sectionBetween(
    docsText,
    "## 11. No Automatic Generation Or Inference",
    "## 12.",
  );
  const prohibitedSection = sectionBetween(
    docsText,
    "## 12. Prohibited Semantic Families",
    "## 13.",
  );

  assert.match(
    generationSection,
    /NO_AUTOMATIC_QUESTION_DERIVATION_INPUT_COUNT:\n10/u,
  );
  assert.match(
    generationSection,
    /No future implementation may introduce generation or inference/u,
  );
  assert.match(prohibitedSection, /PROHIBITED_SEMANTIC_FAMILY_COUNT:\n12/u);
  for (const boundary of [
    "question correctness",
    "packet completeness",
    "missing-evidence",
    "evidence strength",
    "source truth",
    "credibility",
    "legal characterization",
    "severity",
    "answer",
    "product-ready",
  ]) {
    assert.equal(prohibitedSection.includes(boundary), true, boundary);
  }
});

test("future structural validator result codes phases and paths are exact", () => {
  const docsText = readRequired(docsPath);
  const resultSection = sectionBetween(
    docsText,
    "## 13. Future Structural Validator Result Contract",
    "## 14.",
  );
  const validationSection = sectionBetween(
    docsText,
    "## 14. Future Structural Validation Order And Paths",
    "## 15.",
  );

  assert.match(resultSection, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(resultSection, /VALIDATOR_ERROR_FIELD_COUNT:\n2/u);
  assert.match(resultSection, /VALIDATOR_ERROR_CODE_COUNT:\n10/u);
  for (const field of ["valid", "contractKind", "version", "errors"]) {
    assert.equal(resultSection.includes("`" + field + "`"), true, field);
  }
  assert.equal(
    resultSection.includes("`HUMAN_REVIEW_QUESTIONS_VALIDATOR_BOUNDARY`"),
    true,
  );
  for (const code of [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "question_reference_required",
    "duplicate_question_ref",
    "duplicate_source_ref",
    "duplicate_chronology_entry_ref",
    "duplicate_claim_ref",
    "duplicate_gap_ref",
  ]) {
    assert.equal(resultSection.includes("`" + code + "`"), true, code);
  }
  assert.match(resultSection, /No error contains the rejected value/u);
  assert.match(validationSection, /VALIDATION_PHASE_COUNT:\n11/u);
  assert.match(validationSection, /VALIDATOR_PATH_TEMPLATE_COUNT:\n17/u);
  assert.match(validationSection, /must not\nexecute getters/u);
  assert.match(validationSection, /must not mutate input/u);
  assert.match(validationSection, /Paths never contain candidate\nvalues or unknown key names/u);
  assert.match(validationSection, /`question_reference_required` uses\n`\$\.questions\[n\]`/u);
});

test("structural validation stays separate from future cross-reference work", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 15. Structural Validation And Cross-Reference Separation",
    "## 16.",
  );

  assert.match(section, /must not[\s\S]*resolve references/u);
  assert.match(section, /exact `packet_ref` inequality among the five candidates/u);
  assert.match(section, /token absent from its corresponding/u);
  assert.match(
    section,
    /STRUCTURAL_VALIDATOR_CHECKS_TOKEN_MEMBERSHIP:\nfalse/u,
  );
  assert.match(
    section,
    /STRUCTURAL_VALIDATOR_CHECKS_CROSS_CANDIDATE_PACKET_EQUALITY:\nfalse/u,
  );
  assert.match(
    section,
    /CROSS_REFERENCE_RESULT_CONTRACT_DEFINED_BY_THIS_SLICE:\nfalse/u,
  );
  assert.match(section, /do not freeze a cross-reference result/u);
});

test("historical reservations transition only the two candidate schema live absences", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const validatorResultTransitionText = readRequired(validatorResultTransitionPath);
  const validatorHelperTransitionText = readRequired(validatorHelperTransitionPath);
  const crossReferenceTransitionText = readRequired(crossReferenceTransitionPath);
  const exactPaths = [docsPath, proofPath];

  assert.match(docsText, /CONTRACT_SLICE_FILE_COUNT:\n2/u);
  for (const exactPath of exactPaths) {
    assert.equal(docsText.includes("`" + exactPath + "`"), true, exactPath);
    readRequired(exactPath);
  }

  assert.match(docsText, /RESERVED_LATER_PATH_COUNT:\n8/u);
  for (const reservedPath of reservedLaterPaths) {
    assert.equal(docsText.includes("`" + reservedPath + "`"), true, reservedPath);
    assert.equal(
      transitionText.includes("`" + reservedPath + "`"),
      true,
      reservedPath,
    );
  }
  for (const candidatePath of candidateSchemaPaths) {
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
  for (const candidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + candidatePath + "` | `PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  for (const retainedPath of retainedLaterSiblingPaths) {
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
  }
  for (const historicalPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperTransitionText.includes("`" + historicalPath + "`"),
      true,
      historicalPath,
    );
  }
  for (const retainedPath of retainedCrossReferencePaths) {
    assert.equal(
      crossReferenceTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
  }
  assert.match(
    crossReferenceTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n16/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(transitionText, /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n2/u);
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransitionText,
    /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    validatorHelperTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n9/u,
  );
  assert.match(
    validatorHelperTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(transitionText, /HISTORICAL_SCHEMA_ABSENCE_MARKERS_PRESERVED/u);
  assert.match(transitionText, /SCHEMA_FILE_NOT_CREATED_BY_THIS_SLICE/u);
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_FIRST_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nREAD_ONLY_HUMAN_REVIEW_QUESTIONS_SCHEMA_READINESS_ASSESSMENT_ONLY/u,
  );
});

test("contract boundary creates no implementation approval or conclusion", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "SCHEMA_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "PACKAGE_EXPORT_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "PERSISTENCE_API_UI_RUNTIME_NOT_CREATED",
    "NO_AUTOMATIC_QUESTION_GENERATION_OR_LEGAL_ANALYSIS_CREATED",
    "REAL_PRIVATE_SOURCE_MATERIAL_USE_NOT_AUTHORIZED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_CONTRACT_SEMANTICS_FROZEN_SCHEMA_VALIDATOR_AND_RUNTIME_NOT_CREATED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(docsText, /Human\/professional review remains the release gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
