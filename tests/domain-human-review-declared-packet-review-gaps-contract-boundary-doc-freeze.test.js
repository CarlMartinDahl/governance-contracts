"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "README.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_STATE_MODEL_CONTRACT_v1.md",
  "schemas/human-review-state-model.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-chronology.json",
  "packages/schemas/src/human-review-chronology-validator.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix.json",
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix-cross-reference-result.json",
  "packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_READINESS_BOUNDARY_v1.md",
];
const candidateSchemaPaths = [
  "schemas/human-review-declared-packet-review-gaps.json",
  "tests/human-review-declared-packet-review-gaps-schema.test.js",
];
const validatorResultCandidatePaths = [
  "schemas/human-review-declared-packet-review-gaps-validator-result.json",
  "tests/human-review-declared-packet-review-gaps-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
  "tests/human-review-declared-packet-review-gaps-validator.test.js",
];
const retainedCrossReferencePaths = [
  "packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js",
  "tests/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.test.js",
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

test("declared packet review gaps contract boundary and sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
    assert.equal(docsText.includes("`" + controllingPath + "`"), true, controllingPath);
  }

  for (const marker of [
    "HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY",
    "DOCS_ONLY",
    "EXACT_CONTRACT_IDENTITY_FROZEN",
    "EXACT_TOP_LEVEL_SHAPE_FROZEN",
    "EXACT_GAP_ROW_SHAPE_FROZEN",
    "SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "PACKAGE_EXPORT_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});

test("all six Owner-selected stages resolve eighteen docs-level decisions", () => {
  const docsText = readRequired(docsPath);
  const decisionSection = docsText.slice(
    docsText.indexOf("## 3. Owner-Selected Decision Record"),
    docsText.indexOf("## 4."),
  );

  for (let stage = 1; stage <= 6; stage += 1) {
    assert.match(docsText, new RegExp(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`, "u"));
  }
  assert.equal((decisionSection.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  assert.match(docsText, /OWNER_SELECTED_DECISION_STAGE_COUNT:\n6/u);
  assert.match(
    docsText,
    /PREVIOUSLY_OPEN_DECISION_COUNT_RESOLVED_AT_DOCS_CONTRACT_LEVEL:\n18/u,
  );
});

test("contract identity and exact four-field root shape are frozen", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 4. Contract Identity And Exact Root Shape"),
    docsText.indexOf("## 5."),
  );

  assert.match(
    section,
    /CONTRACT_ID:\nhuman_review\.declared_packet_review_gaps/u,
  );
  assert.match(section, /CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(section, /TOP_LEVEL_FIELD_COUNT:\n4/u);
  for (const [position, field] of [
    [1, "contract_id"],
    [2, "contract_version"],
    [3, "packet_ref"],
    [4, "gaps"],
  ]) {
    assert.match(
      section,
      new RegExp(String(position) + "\\. `" + field + "`", "u"),
    );
  }
  assert.match(section, /\^pkt_\[a-z0-9\]\[a-z0-9_-\]\{0,59\}\$/u);
  assert.match(section, /`gaps` \| array with `minItems: 0`/u);
  assert.match(section, /No top-level field is optional/u);
  assert.match(section, /empty `gaps` array is structurally valid/u);
});

test("gap rows freeze six required fields with human-declared bounded text", () => {
  const docsText = readRequired(docsPath);
  const shapeSection = docsText.slice(
    docsText.indexOf("## 5. Exact Gap Row Shape"),
    docsText.indexOf("## 6."),
  );
  const textSection = docsText.slice(
    docsText.indexOf("## 6. Human Declaration And Bounded Text"),
    docsText.indexOf("## 7."),
  );

  assert.match(shapeSection, /GAP_ROW_FIELD_COUNT:\n6/u);
  for (const [position, field] of [
    [1, "gap_ref"],
    [2, "declaration_origin"],
    [3, "declared_gap_text"],
    [4, "source_refs"],
    [5, "chronology_entry_refs"],
    [6, "claim_refs"],
  ]) {
    assert.match(
      shapeSection,
      new RegExp(String(position) + "\\. `" + field + "`", "u"),
    );
  }
  assert.match(shapeSection, /\^gap_\[a-z0-9\]\[a-z0-9_-\]\{0,59\}\$/u);
  assert.match(shapeSection, /`declaration_origin` \| string equal to `HUMAN_DECLARED`/u);
  assert.match(shapeSection, /1 through 1000 Unicode code points/u);
  assert.match(shapeSection, /GAP_CATEGORY_IN_V1:\nABSENT/u);
  assert.match(shapeSection, /REVIEW_STATE_OR_STATUS_IN_V1:\nABSENT/u);
  assert.match(textSection, /DECLARATION_ORIGIN_ENUM_COUNT:\n1/u);
  assert.match(textSection, /DECLARED_GAP_TEXT_MIN_CODE_POINTS:\n1/u);
  assert.match(textSection, /DECLARED_GAP_TEXT_MAX_CODE_POINTS:\n1000/u);
  assert.match(textSection, /AUTOMATIC_OR_MODEL_DECLARATION_ORIGIN:\nPROHIBITED_IN_V1/u);
});

test("three opaque reference arrays may be empty and remain non-resolving", () => {
  const docsText = readRequired(docsPath);
  const shapeSection = docsText.slice(
    docsText.indexOf("## 5. Exact Gap Row Shape"),
    docsText.indexOf("## 6."),
  );
  const referenceSection = docsText.slice(
    docsText.indexOf("## 7. Opaque Reference Relationships"),
    docsText.indexOf("## 8."),
  );

  for (const pattern of [
    "^src_[a-z0-9][a-z0-9_-]{0,59}$",
    "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
    "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
  ]) {
    assert.equal(shapeSection.includes("`" + pattern + "`"), true, pattern);
  }
  assert.match(referenceSection, /REFERENCE_ARRAY_COUNT:\n3/u);
  assert.match(referenceSection, /ALL_REFERENCE_ARRAYS_MAY_BE_EMPTY:\ntrue/u);
  assert.match(
    referenceSection,
    /CROSS_REFERENCE_MEMBERSHIP_IN_STRUCTURAL_VALIDATOR:\nfalse/u,
  );
  assert.match(referenceSection, /exact token membership/u);
  assert.match(referenceSection, /does not establish missing evidence/u);
});

test("ordering duplicates conflicts and no-derivation posture are exact", () => {
  const docsText = readRequired(docsPath);
  const orderingSection = docsText.slice(
    docsText.indexOf("## 8. Ordering, Duplicates, And Conflicts"),
    docsText.indexOf("## 9."),
  );
  const derivationSection = docsText.slice(
    docsText.indexOf("## 9. No Automatic Derivation Or Inference"),
    docsText.indexOf("## 10."),
  );

  for (const code of [
    "duplicate_gap_ref",
    "duplicate_source_ref",
    "duplicate_chronology_entry_ref",
    "duplicate_claim_ref",
  ]) {
    assert.equal(orderingSection.includes("`" + code + "`"), true, code);
  }
  assert.match(orderingSection, /input gap-row order is preserved/u);
  assert.match(orderingSection, /repeated text or repeated references across distinct gap rows are allowed/u);
  assert.match(orderingSection, /Conflicting declared gaps may coexist/u);
  assert.match(derivationSection, /NO_AUTOMATIC_DERIVATION_INPUT_COUNT:\n10/u);
  assert.match(derivationSection, /No future implementation may introduce derivation/u);
});

test("snapshot lifecycle and prohibited semantic families stay fail closed", () => {
  const docsText = readRequired(docsPath);
  const lifecycleSection = docsText.slice(
    docsText.indexOf("## 10. Snapshot And Human Correction Lifecycle"),
    docsText.indexOf("## 11."),
  );
  const prohibitedSection = docsText.slice(
    docsText.indexOf("## 11. Prohibited Semantic Families"),
    docsText.indexOf("## 12."),
  );

  assert.match(
    lifecycleSection,
    /HUMAN_CORRECTION_MODEL:\nCOMPLETE_REPLACEMENT_CANDIDATE_BEFORE_CONTROLLED_HANDOFF/u,
  );
  assert.match(lifecycleSection, /IN_PLACE_MUTATION_BY_VALIDATOR:\nPROHIBITED/u);
  assert.match(lifecycleSection, /REVISION_HISTORY_IN_V1_CONTRACT:\nABSENT/u);
  assert.match(prohibitedSection, /PROHIBITED_SEMANTIC_FAMILY_COUNT:\n12/u);
  for (const boundary of [
    "packet completeness",
    "missing-evidence",
    "evidence strength",
    "source truth",
    "credibility",
    "legal characterization",
    "severity",
    "product readiness",
  ]) {
    assert.equal(prohibitedSection.includes(boundary), true, boundary);
  }
});

test("future structural validator result codes phases and paths are frozen", () => {
  const docsText = readRequired(docsPath);
  const resultSection = docsText.slice(
    docsText.indexOf("## 12. Future Structural Validator Result Contract"),
    docsText.indexOf("## 13."),
  );
  const validationSection = docsText.slice(
    docsText.indexOf("## 13. Future Structural Validation Order And Paths"),
    docsText.indexOf("## 14."),
  );

  assert.match(resultSection, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(resultSection, /VALIDATOR_ERROR_FIELD_COUNT:\n2/u);
  assert.match(resultSection, /VALIDATOR_ERROR_CODE_COUNT:\n8/u);
  for (const field of ["valid", "contractKind", "version", "errors"]) {
    assert.equal(resultSection.includes("`" + field + "`"), true, field);
  }
  for (const code of [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "duplicate_gap_ref",
    "duplicate_source_ref",
    "duplicate_chronology_entry_ref",
    "duplicate_claim_ref",
  ]) {
    assert.equal(resultSection.includes("`" + code + "`"), true, code);
  }
  assert.match(resultSection, /No error contains the rejected value/u);
  assert.match(validationSection, /VALIDATION_PHASE_COUNT:\n10/u);
  assert.match(validationSection, /VALIDATOR_PATH_TEMPLATE_COUNT:\n15/u);
  assert.match(validationSection, /must\s+not\s+execute getters/u);
  assert.match(validationSection, /must not mutate input/u);
  assert.match(validationSection, /Paths never contain candidate\nvalues or unknown key names/u);
});

test("historical reservations transition only the two candidate schema live absences", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const validatorResultTransitionText = readRequired(validatorResultTransitionPath);
  const validatorHelperTransitionText = readRequired(validatorHelperTransitionPath);
  const crossReferenceTransitionText = readRequired(
    crossReferenceProofTransitionPath,
  );
  const exactPaths = [
    docsPath,
    "tests/domain-human-review-declared-packet-review-gaps-contract-boundary-doc-freeze.test.js",
  ];

  assert.match(docsText, /CONTRACT_SLICE_FILE_COUNT:\n2/u);
  for (const exactPath of exactPaths) {
    assert.equal(docsText.includes("`" + exactPath + "`"), true, exactPath);
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
  for (const reservedPath of retainedLaterSiblingPaths) {
    assert.equal(
      transitionText.includes(
        "`" + reservedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      reservedPath,
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
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
  }
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(transitionText, /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n2/u);
  assert.match(validatorResultTransitionText, /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(validatorResultTransitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u);
  assert.match(
    validatorHelperTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n7/u,
  );
  assert.match(
    validatorHelperTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n14/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(transitionText, /HISTORICAL_SCHEMA_ABSENCE_MARKERS_PRESERVED/u);
  assert.match(transitionText, /SCHEMA_FILE_NOT_CREATED_BY_THIS_SLICE/u);
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_FIRST_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nREAD_ONLY_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_READINESS_ASSESSMENT_ONLY/u,
  );
});

test("contract boundary creates no implementation approval or conclusion", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "NO_MACHINE_CATEGORY_IN_V1",
    "NO_REVIEW_STATE_STATUS_SEVERITY_OR_CLOSURE_IN_V1",
    "NO_AUTOMATIC_GAP_DERIVATION_IN_V1",
    "PERSISTENCE_API_UI_RUNTIME_NOT_CREATED",
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
