"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionText = fs.readFileSync(
  path.join(repoRoot, crossReferenceProofTransitionPath),
  "utf8",
);
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-brief-contract-boundary-doc-freeze.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
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
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-no-conclusion-notice.json",
  "packages/schemas/src/human-review-no-conclusion-notice-validator.js",
  "packages/governance/src/human-review-no-conclusion-notice-pre-controlled-handoff-validation-boundary.js",
];
const candidateSchemaPaths = [
  "schemas/human-review-controlled-handoff-brief.json",
  "tests/human-review-controlled-handoff-brief-schema.test.js",
];
const retainedLaterSiblingPaths = [
  "schemas/human-review-controlled-handoff-brief-validator-result.json",
  "tests/human-review-controlled-handoff-brief-validator-result-schema.test.js",
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "tests/human-review-controlled-handoff-brief-validator.test.js",
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];
const reservedLaterPaths = [
  ...candidateSchemaPaths,
  ...retainedLaterSiblingPaths,
];
const validatorResultCandidatePaths = retainedLaterSiblingPaths.slice(0, 2);
const historicalValidatorHelperPaths = retainedLaterSiblingPaths.slice(2, 4);
const retainedCrossReferencePaths = retainedLaterSiblingPaths.slice(4);

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

test("contract sources and eight-stage decision record are frozen", () => {
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
  for (let stage = 1; stage <= 8; stage += 1) {
    assert.equal(
      docsText.includes("OWNER_SELECTED_STAGE_" + stage + "_OPTION_A"),
      true,
    );
  }
  assert.equal((decisions.match(/^\| \d+ \|/gmu) ?? []).length, 24);
  assert.match(docsText, /OWNER_SELECTED_DECISION_STAGE_COUNT:\n8/u);
  assert.match(
    docsText,
    /PREVIOUSLY_OPEN_DECISION_COUNT_RESOLVED_AT_DOCS_CONTRACT_LEVEL:\n24/u,
  );
});

test("exact five-field root identity and packet scope are frozen", () => {
  const docsText = readRequired(docsPath);
  const root = sectionBetween(
    docsText,
    "## 4. Contract Identity, Cardinality, And Exact Root Shape",
    "## 5.",
  );
  const fields = [
    "contract_id",
    "contract_version",
    "packet_ref",
    "handoff_posture",
    "component_refs",
  ];

  assert.match(
    root,
    /CONTRACT_ID:\nhuman_review\.controlled_handoff_brief/u,
  );
  assert.match(root, /CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(root, /TOP_LEVEL_FIELD_COUNT:\n5/u);
  for (const [index, field] of fields.entries()) {
    assert.equal(root.includes(index + 1 + ". `" + field + "`"), true, field);
  }
  assert.equal(
    root.includes("`^pkt_[a-z0-9][a-z0-9_-]{0,59}$`"),
    true,
  );
  assert.match(
    root,
    /`handoff_posture` \| string equal to `HANDOFF_CANDIDATE_ONLY`/u,
  );
  assert.match(
    root,
    /BRIEF_CARDINALITY:\nONE_OBJECT_PER_DECLARED_SUPPLIED_PACKET/u,
  );
  assert.match(root, /CASE_IDENTIFIER:\nABSENT/u);
});

test("component_refs has six exact opaque pairwise-unique references", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 5. Exact Component-Reference Object",
    "## 6.",
  );
  const fields = [
    "source_register_ref",
    "review_chronology_ref",
    "asserted_claim_matrix_ref",
    "declared_packet_review_gaps_ref",
    "human_review_questions_ref",
    "no_conclusion_notice_ref",
  ];

  assert.match(section, /COMPONENT_REFERENCE_FIELD_COUNT:\n6/u);
  for (const [index, field] of fields.entries()) {
    assert.equal(
      section.includes(index + 1 + ". `" + field + "`"),
      true,
      field,
    );
  }
  assert.equal(
    section.includes("`^hro_[a-z0-9][a-z0-9_-]{0,59}$`"),
    true,
  );
  assert.match(section, /pairwise unique/u);
  assert.match(section, /`duplicate_component_ref`/u);
  assert.match(section, /opaque token carries no embedded family/u);
});

test("candidate posture approval and cross-reference checks stay separate", () => {
  const docsText = readRequired(docsPath);
  const crossReference = sectionBetween(
    docsText,
    "## 6. Reference-Only And Cross-Reference Separation",
    "## 7.",
  );
  const lifecycle = sectionBetween(
    docsText,
    "## 7. Candidate Posture And Human Lifecycle Boundary",
    "## 8.",
  );

  assert.match(
    crossReference,
    /CROSS_REFERENCE_MEMBERSHIP_IN_STRUCTURAL_VALIDATOR:\nPROHIBITED/u,
  );
  assert.match(
    crossReference,
    /PACKET_EQUALITY_ACROSS_OUTPUTS_IN_STRUCTURAL_VALIDATOR:\nPROHIBITED/u,
  );
  assert.match(
    crossReference,
    /COMPONENT_FAMILY_IDENTITY_CHECK_IN_STRUCTURAL_VALIDATOR:\nPROHIBITED/u,
  );
  assert.match(lifecycle, /HANDOFF_POSTURE_ENUM_COUNT:\n1/u);
  assert.match(
    lifecycle,
    /HANDOFF_POSTURE_VALUE:\nHANDOFF_CANDIDATE_ONLY/u,
  );
  assert.match(
    lifecycle,
    /HUMAN_CORRECTION_MODEL:\nCOMPLETE_REPLACEMENT_CANDIDATE_BEFORE_SEPARATE_APPROVAL/u,
  );
  assert.match(lifecycle, /APPROVAL_OR_SIGN_OFF_IN_V1_CONTRACT:\nABSENT/u);
  assert.match(lifecycle, /APPROVAL_STATE_IN_V1_CONTRACT:\nABSENT/u);
});

test("strict candidate contains no inline content free text or release metadata", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 8. Strict No-Content And No-Conclusion Boundary",
    "## 9.",
  );

  assert.match(section, /free text, summary, narrative/u);
  assert.match(section, /inline Source Register, Review Chronology/u);
  assert.match(section, /raw source material, private material/u);
  assert.match(section, /actor, identity, authorship, provider, model/u);
  assert.match(section, /legal, evidentiary, ownership, source-truth/u);
  assert.match(section, /any approval, export, delivery, external use/u);
});

test("validator result five-code taxonomy and ten phases are exact", () => {
  const docsText = readRequired(docsPath);
  const result = sectionBetween(
    docsText,
    "## 10. Future Structural Validator Result Contract",
    "## 11.",
  );
  const taxonomy = sectionBetween(
    docsText,
    "## 11. Exact Error Taxonomy And Canonical Paths",
    "## 12.",
  );
  const phases = sectionBetween(
    docsText,
    "## 12. Deterministic Validation Order",
    "## 13.",
  );
  const codes = [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "duplicate_component_ref",
  ];

  assert.match(result, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    result,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_BOUNDARY/u,
  );
  assert.match(taxonomy, /VALIDATOR_ERROR_CODE_COUNT:\n5/u);
  for (const code of codes) {
    assert.equal(taxonomy.includes("`" + code + "`"), true, code);
  }
  assert.match(
    taxonomy,
    /`\$\.component_refs\.no_conclusion_notice_ref`/u,
  );
  assert.match(taxonomy, /CODE_TO_PATH_PARTITION_ROW_COUNT:\n5/u);
  assert.equal(
    (taxonomy.match(/^\| `[^`]+` \|/gmu) ?? []).length,
    5,
  );
  assert.match(
    taxonomy,
    /`invalid_field_type` \| `\$`, a scalar root-field path, `\$\.component_refs`, or a component-field path/u,
  );
  assert.match(phases, /VALIDATION_PHASE_COUNT:\n10/u);
  assert.match(phases, /unknown component fields without exposing rejected keys/u);
  assert.match(result, /Errors do\nnot contain rejected keys/u);
});

test("historical reservations transition candidate and validator-result schema paths in order", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );
  const reserved = sectionBetween(
    docsText,
    "## 14. Reserved Later Paths And Proof Ownership",
    "## 15.",
  );
  const scope = sectionBetween(
    docsText,
    "## 16. Exact File Scope",
    "## 17.",
  );

  assert.match(reserved, /RESERVED_LATER_PATH_COUNT:\n8/u);
  for (const reservedPath of reservedLaterPaths) {
    assert.equal(
      reserved.includes("`" + reservedPath + "`"),
      true,
      reservedPath,
    );
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
  for (const historicalPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + historicalPath + "`"),
      true,
      historicalPath,
    );
  }
  for (const retainedPath of retainedCrossReferencePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
    assert.equal(
      crossReferenceProofTransitionText.includes("\`" + retainedPath + "\`"),
      true,
      retainedPath,
    );
  }
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n18/u,
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
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_FIRST_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(scope, /CONTRACT_SLICE_FILE_COUNT:\n2/u);
  assert.equal(scope.includes("`" + docsPath + "`"), true);
  assert.equal(scope.includes("`" + proofPath + "`"), true);
  assert.match(docsText, /SCHEMA_NOT_CREATED/u);
  assert.match(docsText, /CROSS_REFERENCE_CHECKPOINT_NOT_CREATED/u);
  assert.match(docsText, /HUMAN_APPROVAL_WORKFLOW_NOT_CREATED/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
});
