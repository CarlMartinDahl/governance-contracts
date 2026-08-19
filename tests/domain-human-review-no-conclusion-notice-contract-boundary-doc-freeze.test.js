"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-no-conclusion-notice-contract-boundary-doc-freeze.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
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
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-questions.json",
  "packages/schemas/src/human-review-questions-validator.js",
  "packages/governance/src/human-review-questions-pre-controlled-handoff-validation-boundary.js",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
  "schemas/controlled-synthetic-red-team-result-envelope.json",
];
const candidateSchemaPaths = [
  "schemas/human-review-no-conclusion-notice.json",
  "tests/human-review-no-conclusion-notice-schema.test.js",
];
const retainedLaterSiblingPaths = [
  "schemas/human-review-no-conclusion-notice-validator-result.json",
  "tests/human-review-no-conclusion-notice-validator-result-schema.test.js",
  "packages/schemas/src/human-review-no-conclusion-notice-validator.js",
  "tests/human-review-no-conclusion-notice-validator.test.js",
  "packages/governance/src/human-review-no-conclusion-notice-cross-reference-validation-boundary.js",
  "tests/human-review-no-conclusion-notice-cross-reference-validation-boundary.test.js",
];
const validatorResultCandidatePaths = retainedLaterSiblingPaths.slice(0, 2);
const stillRetainedSiblingPaths = retainedLaterSiblingPaths.slice(2);
const historicalValidatorHelperPaths = stillRetainedSiblingPaths.slice(0, 2);
const retainedCrossReferencePaths = stillRetainedSiblingPaths.slice(2);
const reservedLaterPaths = [
  ...candidateSchemaPaths,
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

test("contract sources and six-stage decision record are frozen", () => {
  const docsText = readRequired(docsPath);
  const decisions = sectionBetween(
    docsText,
    "## 3. Owner-Selected Decision Record",
    "## 4.",
  );

  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
    assert.equal(
      docsText.includes("`" + controllingPath + "`"),
      true,
      controllingPath,
    );
  }
  for (let stage = 1; stage <= 6; stage += 1) {
    assert.equal(
      docsText.includes(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`),
      true,
    );
  }
  assert.equal((decisions.match(/^\| \d+ \|/gmu) ?? []).length, 20);
  assert.match(docsText, /OWNER_SELECTED_DECISION_STAGE_COUNT:\n6/u);
  assert.match(
    docsText,
    /PREVIOUSLY_OPEN_DECISION_COUNT_RESOLVED_AT_DOCS_CONTRACT_LEVEL:\n20/u,
  );
});

test("exact root and nine-field notice shape are frozen", () => {
  const docsText = readRequired(docsPath);
  const root = sectionBetween(
    docsText,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5.",
  );
  const row = sectionBetween(
    docsText,
    "## 5. Exact Notice Row Shape",
    "## 6.",
  );

  assert.match(root, /CONTRACT_ID:\nhuman_review\.no_conclusion_notice/u);
  assert.match(root, /CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(root, /TOP_LEVEL_FIELD_COUNT:\n4/u);
  for (const [position, field] of [
    [1, "contract_id"],
    [2, "contract_version"],
    [3, "packet_ref"],
    [4, "notices"],
  ]) {
    assert.equal(root.includes(`${position}. \`${field}\``), true, field);
  }
  assert.match(root, /`notices` \| ordered array with `minItems: 1`/u);
  assert.match(root, /WORKSPACE_OUTPUT_PRESENCE:\nOPTIONAL/u);

  const rowFields = [
    "notice_ref",
    "declaration_origin",
    "notice_code",
    "notice_text",
    "source_refs",
    "chronology_entry_refs",
    "claim_refs",
    "gap_refs",
    "question_refs",
  ];
  assert.match(row, /NOTICE_ROW_FIELD_COUNT:\n9/u);
  for (const [index, field] of rowFields.entries()) {
    assert.equal(row.includes(`${index + 1}. \`${field}\``), true, field);
  }
  assert.equal(row.includes("`^ncn_[a-z0-9][a-z0-9_-]{0,59}$`"), true);
  assert.match(row, /string equal to `BOUNDARY_DECLARED`/u);
  assert.match(
    row,
    /string equal to `NO_MODEL_CONCLUSION_UNDER_CURRENT_BOUNDARY`/u,
  );
  for (const referencePattern of [
    "^src_[a-z0-9][a-z0-9_-]{0,59}$",
    "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
    "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
    "^gap_[a-z0-9][a-z0-9_-]{0,59}$",
    "^qst_[a-z0-9][a-z0-9_-]{0,59}$",
  ]) {
    assert.equal(row.includes(`\`${referencePattern}\``), true, referencePattern);
  }
});

test("fixed no-conclusion posture has no free text or trigger behavior", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 6. Boundary Origin And Fixed Notice Posture",
    "## 7.",
  );

  assert.match(section, /DECLARATION_ORIGIN_ENUM_COUNT:\n1/u);
  assert.match(section, /DECLARATION_ORIGIN_VALUE:\nBOUNDARY_DECLARED/u);
  assert.match(section, /NOTICE_CODE_ENUM_COUNT:\n1/u);
  assert.match(
    section,
    /NOTICE_CODE_VALUE:\nNO_MODEL_CONCLUSION_UNDER_CURRENT_BOUNDARY/u,
  );
  assert.match(
    section,
    /NOTICE_TEXT_VALUE:\nNo model conclusion is established under the current boundary\./u,
  );
  assert.match(section, /AUTOMATIC_NOTICE_GENERATION:\nPROHIBITED_IN_V1/u);
  assert.match(
    section,
    /AUTOMATIC_TRIGGER_OR_REQUEST_CLASSIFICATION:\nPROHIBITED_IN_V1/u,
  );
});

test("five opaque reference arrays require one total reference", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 7. Reference Arrays And Cross-Reference Separation",
    "## 8.",
  );

  assert.match(section, /NOTICE_REFERENCE_ARRAY_COUNT:\n5/u);
  assert.match(section, /NOTICE_REFERENCE_TOTAL_MINIMUM_COUNT:\n1/u);
  assert.match(section, /`notice_reference_required` at the notice-row path/u);
  assert.match(
    section,
    /CROSS_REFERENCE_MEMBERSHIP_IN_STRUCTURAL_VALIDATOR:\nPROHIBITED/u,
  );
  assert.match(
    section,
    /PACKET_EQUALITY_ACROSS_OUTPUTS_IN_STRUCTURAL_VALIDATOR:\nPROHIBITED/u,
  );
});

test("replacement-only lifecycle and deterministic validation stay separate", () => {
  const docsText = readRequired(docsPath);
  const ordering = sectionBetween(
    docsText,
    "## 8. Ordering, Duplicates, And Collisions",
    "## 9.",
  );
  const lifecycle = sectionBetween(
    docsText,
    "## 9. Snapshot And Human Lifecycle Boundary",
    "## 10.",
  );

  assert.match(ordering, /duplicate_notice_ref/u);
  assert.match(ordering, /no row is merged, ranked, sorted, rewritten/u);
  assert.match(
    lifecycle,
    /HUMAN_CORRECTION_MODEL:\nCOMPLETE_REPLACEMENT_CANDIDATE_BEFORE_CONTROLLED_HANDOFF/u,
  );
  assert.match(lifecycle, /APPROVAL_OR_SIGN_OFF_IN_V1_CONTRACT:\nABSENT/u);
  assert.match(
    docsText,
    /DETERMINISTIC_ORDER_DUPLICATE_AND_SNAPSHOT_RULES_DEFINED/u,
  );
});

test("validator result and eleven-code no-echo taxonomy are exact", () => {
  const docsText = readRequired(docsPath);
  const result = sectionBetween(
    docsText,
    "## 11. Future Structural Validator Result Contract",
    "## 12.",
  );
  const taxonomy = sectionBetween(
    docsText,
    "## 12. Exact Error Taxonomy And Canonical Paths",
    "## 13.",
  );
  const codes = [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "notice_reference_required",
    "duplicate_notice_ref",
    "duplicate_source_ref",
    "duplicate_chronology_entry_ref",
    "duplicate_claim_ref",
    "duplicate_gap_ref",
    "duplicate_question_ref",
  ];

  assert.match(result, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    result,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_BOUNDARY/u,
  );
  assert.match(taxonomy, /VALIDATOR_ERROR_CODE_COUNT:\n11/u);
  for (const code of codes) {
    assert.equal(taxonomy.includes(`\`${code}\``), true, code);
  }
  assert.match(taxonomy, /`\$\.notices\[n\]\.question_refs\[m\]`/u);
  assert.match(taxonomy, /CODE_TO_PATH_PARTITION_ROW_COUNT:\n11/u);
  assert.equal(
    (taxonomy.match(/^\| `[^`]+` \|/gmu) ?? []).length,
    11,
  );
  assert.match(result, /Errors do\nnot contain rejected keys/u);
});

test("historical reservations preserve the exact staged proof transitions", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionPath,
  );
  const reserved = sectionBetween(
    docsText,
    "## 15. Reserved Later Paths And Proof Ownership",
    "## 16.",
  );
  const scope = sectionBetween(
    docsText,
    "## 17. Exact File Scope",
    "## 18.",
  );

  assert.match(reserved, /RESERVED_LATER_PATH_COUNT:\n8/u);
  for (const reservedPath of reservedLaterPaths) {
    assert.equal(reserved.includes(`\`${reservedPath}\``), true, reservedPath);
    assert.equal(
      transitionText.includes(`\`${reservedPath}\``),
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
  for (const retainedPath of retainedLaterSiblingPaths) {
    assert.equal(
      transitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
  }
  for (const candidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" +
          candidatePath +
          "` | `PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  for (const retainedPath of stillRetainedSiblingPaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
  }
  for (const helperPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + helperPath + "`"),
      true,
      helperPath,
    );
  }
  for (const crossReferencePath of retainedCrossReferencePaths) {
    assert.equal(
      crossReferenceProofTransitionText.includes("`" + crossReferencePath + "`"),
      true,
      crossReferencePath,
    );
  }
  assert.match(
    crossReferenceProofTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n20/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n13/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(transitionText, /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n2/u);
  assert.match(transitionText, /HISTORICAL_SCHEMA_ABSENCE_MARKERS_PRESERVED/u);
  assert.match(transitionText, /SCHEMA_FILE_NOT_CREATED_BY_THIS_SLICE/u);
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_FIRST_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransitionText,
    /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    validatorResultTransitionText,
    /PROOF_TRANSITION_SLICE_FILE_COUNT:\n6/u,
  );
  assert.match(
    validatorResultTransitionText,
    /TRACKED_CONTRACT_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.equal(scope.includes(`\`${docsPath}\``), true);
  assert.equal(scope.includes(`\`${proofPath}\``), true);
  assert.match(scope, /CONTRACT_SLICE_FILE_COUNT:\n2/u);
  assert.match(scope, /No existing file changes in this slice/u);

  for (const marker of [
    "SCHEMA_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "PACKAGE_EXPORT_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "CONTROLLED_HANDOFF_NOT_CREATED",
    "PERSISTENCE_API_UI_RUNTIME_NOT_CREATED",
    "NO_AUTOMATIC_NOTICE_GENERATION_OR_TRIGGER_CLASSIFICATION_CREATED",
    "REAL_PRIVATE_SOURCE_MATERIAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});
