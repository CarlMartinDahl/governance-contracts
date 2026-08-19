"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md";
const readinessRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_READINESS_BOUNDARY_v1.md";
const proofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  readinessRelativePath,
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
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "schemas/human-review-chronology-source-register-cross-reference-result.json",
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
  "tests/human-review-chronology-source-register-validation-boundary.test.js",
];
const candidateSchemaPaths = [
  "schemas/human-review-asserted-claim-matrix.json",
  "tests/human-review-asserted-claim-matrix-schema.test.js",
];
const validatorResultCandidatePaths = [
  "schemas/human-review-asserted-claim-matrix-validator-result.json",
  "tests/human-review-asserted-claim-matrix-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "tests/human-review-asserted-claim-matrix-validator.test.js",
];
const retainedAbsentFuturePaths = [
  ...validatorResultCandidatePaths,
  ...historicalValidatorHelperPaths,
];
const reservedFuturePaths = [...candidateSchemaPaths, ...retainedAbsentFuturePaths];
const reviewStates = [
  "ASSERTED",
  "APPEARS_IN_SUPPLIED_MATERIAL",
  "NOT_ESTABLISHED",
  "HUMAN_REVIEW_REQUIRED",
];
const validationCodes = [
  "required_field_missing",
  "unexpected_field",
  "invalid_field_type",
  "invalid_field_value",
  "state_observation_mismatch",
  "duplicate_claim_ref",
  "duplicate_source_ref",
  "duplicate_chronology_entry_ref",
];

function absolutePath(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  const candidatePath = absolutePath(relativePath);
  assert.equal(fs.existsSync(candidatePath), true, `expected ${relativePath}`);
  return fs.readFileSync(candidatePath, "utf8");
}

test("asserted-claim-matrix contract and controlling sources exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(docsText, /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY/u);
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_CONTRACT_DEFINITION/u);
  assert.match(docsText, /OWNER_SELECTED_STAGED_SEMANTICS_TRANSLATED/u);
});

test("identity cardinality and exact four-field root shape are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 4. Exact Top-Level Shape"),
    docsText.indexOf("## 5."),
  );

  assert.match(
    docsText,
    /ASSERTED_CLAIM_MATRIX_CONTRACT_ID:\nhuman_review\.asserted_claim_matrix/u,
  );
  assert.match(docsText, /ASSERTED_CLAIM_MATRIX_CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(
    docsText,
    /ASSERTED_CLAIM_MATRIX_CARDINALITY:\nONE_OBJECT_PER_DECLARED_SUPPLIED_PACKET/u,
  );
  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  for (const field of [
    "contract_id",
    "contract_version",
    "packet_ref",
    "claims",
  ]) {
    assert.equal(section.includes(`\`${field}\``), true, field);
  }
  assert.match(section, /REQUIRED_TOP_LEVEL_FIELDS:\nALL_FOUR/u);
  assert.match(section, /OPTIONAL_TOP_LEVEL_FIELDS:\nNONE/u);
  assert.match(section, /ADDITIONAL_TOP_LEVEL_FIELDS:\nNONE/u);
});

test("claim rows have the selected exact six-field shape", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 5. Exact Claim-Row Shape And Cardinality"),
    docsText.indexOf("## 6."),
  );

  assert.match(section, /CLAIM_ROW_MINIMUM_COUNT:\n0/u);
  assert.match(section, /EMPTY_ASSERTED_CLAIM_MATRIX:\nALLOWED/u);
  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  for (const field of [
    "claim_ref",
    "review_state",
    "asserted_claim_text",
    "supplied_material_observation_text",
    "source_refs",
    "chronology_entry_refs",
  ]) {
    assert.equal(section.includes(`\`${field}\``), true, field);
  }
  assert.match(section, /REQUIRED_CLAIM_ROW_FIELDS:\nALL_SIX/u);
  assert.match(section, /OPTIONAL_CLAIM_ROW_FIELDS:\nNONE/u);
  assert.match(section, /ADDITIONAL_CLAIM_ROW_FIELDS:\nNONE/u);
});

test("opaque references and cross-contract relationships remain bounded", () => {
  const docsText = readRequired(docsRelativePath);

  for (const pattern of [
    "`^pkt_[a-z0-9][a-z0-9_-]{0,59}$`",
    "`^src_[a-z0-9][a-z0-9_-]{0,59}$`",
    "`^chr_[a-z0-9][a-z0-9_-]{0,59}$`",
    "`^clm_[a-z0-9][a-z0-9_-]{0,59}$`",
  ]) {
    assert.equal(docsText.includes(pattern), true, pattern);
  }
  assert.match(
    docsText,
    /OPAQUE_REFERENCE_RESOLUTION_BY_STRUCTURAL_VALIDATOR:\nPROHIBITED/u,
  );
  assert.match(docsText, /SOURCE_REFS_MINIMUM_COUNT_PER_CLAIM:\n1/u);
  assert.match(docsText, /SOURCE_REFS_UNIQUE_WITHIN_CLAIM:\nREQUIRED/u);
  assert.match(docsText, /CHRONOLOGY_ENTRY_REFS_MINIMUM_COUNT_PER_CLAIM:\n0/u);
  assert.match(
    docsText,
    /CHRONOLOGY_ENTRY_REFS_UNIQUE_WITHIN_CLAIM:\nREQUIRED/u,
  );
  assert.match(docsText, /separately authorized cross-reference checkpoint/u);
  assert.match(docsText, /packet mismatch or absent referenced member must fail closed/u);
});

test("four states and observation coupling stay exact and non-inferential", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 7. Exact Review-State And Observation Coupling"),
    docsText.indexOf("## 8."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  for (const reviewState of reviewStates) {
    assert.equal(section.includes(`\`${reviewState}\``), true, reviewState);
  }
  for (const coupling of [
    "| `ASSERTED` | exact `null` |",
    "| `APPEARS_IN_SUPPLIED_MATERIAL` | one non-empty string |",
    "| `NOT_ESTABLISHED` | exact `null` |",
    "| `HUMAN_REVIEW_REQUIRED` | exact `null` or one non-empty string |",
  ]) {
    assert.equal(section.includes(coupling), true, coupling);
  }
  assert.match(section, /AUTOMATIC_REVIEW_STATE_TRANSITION:\nPROHIBITED/u);
  assert.match(section, /No review state may be inferred from/u);
});

test("text ordering conflict correction and gap posture remain human controlled", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(docsText, /TEXT_TRIMMING:\nPROHIBITED/u);
  assert.match(docsText, /TEXT_REWRITING_OR_NORMALIZATION:\nPROHIBITED/u);
  assert.match(docsText, /input claim-row order is preserved as canonical review order/u);
  assert.match(docsText, /produces `duplicate_claim_ref`/u);
  assert.match(docsText, /produces `duplicate_source_ref`/u);
  assert.match(docsText, /produces `duplicate_chronology_entry_ref`/u);
  assert.match(docsText, /Conflicting claim rows may coexist/u);
  assert.match(docsText, /`DECLARED_PACKET_REVIEW_GAPS` output family/u);
  assert.match(
    docsText,
    /HUMAN_CORRECTION_MODEL:\nCOMPLETE_REPLACEMENT_CANDIDATE_BEFORE_CONTROLLED_HANDOFF/u,
  );
  assert.match(docsText, /REVISION_HISTORY_IN_V1_CONTRACT:\nABSENT/u);
  assert.match(docsText, /APPROVAL_OR_EXPORT_STATE_IN_V1_CONTRACT:\nABSENT/u);
});

test("prohibited semantics create no free-text classifier", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 12. Prohibited Semantic Fields And No Classifier"),
    docsText.indexOf("## 13."),
  );

  for (const term of [
    "score, probability, confidence, rank, weight, or strength",
    "credibility, reliability, intent",
    "authenticity, source truth, identity truth, or authorship truth",
    "guilt, legal merit, admissibility, or evidentiary sufficiency",
    "approval, certification, sign-off, audit history, or release status",
  ]) {
    assert.equal(section.includes(term), true, term);
  }
  assert.match(section, /not a semantic classifier/u);
  assert.match(section, /does not scan or\s+moderate free-text meaning/u);
  assert.match(section, /real-evidence material is\s+not authorized/u);
});

test("validator result error shape and exact eight codes are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const resultSection = docsText.slice(
    docsText.indexOf("## 13. Separate Validator-Result Contract"),
    docsText.indexOf("## 14."),
  );
  const codeSection = docsText.slice(
    docsText.indexOf("## 14. Exact Structural Validation Error Codes"),
    docsText.indexOf("## 15."),
  );

  assert.equal((resultSection.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  for (const field of ["valid", "contractKind", "version", "errors", "code", "path"]) {
    assert.equal(resultSection.includes(`\`${field}\``), true, field);
  }
  assert.match(resultSection, /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_BOUNDARY/u);
  assert.match(resultSection, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(resultSection, /VALIDATION_ERROR_ITEM_FIELD_COUNT:\n2/u);
  assert.match(resultSection, /deeply frozen/u);
  assert.equal((codeSection.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  for (const code of validationCodes) {
    assert.equal(codeSection.includes(`\`${code}\``), true, code);
  }
  assert.match(codeSection, /Packet mismatch and absent external\nreferences belong/u);
});

test("canonical paths deterministic ordering no-echo and immutability are frozen", () => {
  const docsText = readRequired(docsRelativePath);

  for (const pathTemplate of [
    "`$`",
    "`$.contract_id`",
    "`$.contract_version`",
    "`$.packet_ref`",
    "`$.claims`",
    "`$.claims[n]`",
    "`$.claims[n].claim_ref`",
    "`$.claims[n].review_state`",
    "`$.claims[n].asserted_claim_text`",
    "`$.claims[n].supplied_material_observation_text`",
    "`$.claims[n].source_refs`",
    "`$.claims[n].source_refs[m]`",
    "`$.claims[n].chronology_entry_refs`",
    "`$.claims[n].chronology_entry_refs[m]`",
  ]) {
    assert.equal(docsText.includes(pathTemplate), true, pathTemplate);
  }
  assert.match(docsText, /non-plain root with only `invalid_field_type` at `\$` and stop/u);
  assert.match(docsText, /claim rows by ascending index/u);
  assert.match(docsText, /flag every later duplicate/u);
  assert.match(docsText, /candidate object and all nested arrays and rows remain unmodified/u);
  assert.match(docsText, /accessors are not invoked/u);
  assert.match(docsText, /rejected keys and values are never returned, logged, retained/u);
  assert.match(docsText, /Identical structural input produces an identical result/u);
});

test("historical schema reservations remain documented while later sibling absences stay live", () => {
  const docsText = readRequired(docsRelativePath);
  const proofTransitionText = readRequired(proofTransitionRelativePath);
  const validatorResultProofTransitionText = readRequired(
    validatorResultProofTransitionRelativePath,
  );
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionRelativePath,
  );
  const ownershipSection = docsText.slice(
    docsText.indexOf("## 18. Ownership And Later Slice Partition"),
    docsText.indexOf("## 19."),
  );

  assert.equal(
    (ownershipSection.match(/^\d+\. `(?:docs|tests)\//gmu) ?? []).length,
    2,
  );
  for (const futurePath of reservedFuturePaths) {
    assert.equal(ownershipSection.includes(`\`${futurePath}\``), true, futurePath);
    assert.equal(proofTransitionText.includes(`\`${futurePath}\``), true, futurePath);
  }
  for (const [index, candidatePath] of candidateSchemaPaths.entries()) {
    const expectedRow =
      `| ${index + 1} | \`${candidatePath}\` | ` +
      "`PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE` |";
    assert.equal(proofTransitionText.includes(expectedRow), true, candidatePath);
  }
  for (const [index, retainedPath] of retainedAbsentFuturePaths.entries()) {
    const expectedRow =
      `| ${index + 1} | \`${retainedPath}\` | ` +
      "`RETAIN_LIVE_ABSENCE_ASSERTION` |";
    assert.equal(proofTransitionText.includes(expectedRow), true, retainedPath);
  }
  for (const [index, candidatePath] of validatorResultCandidatePaths.entries()) {
    const expectedRow =
      `| ${index + 1} | \`${candidatePath}\` | ` +
      "`PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE` |";
    assert.equal(
      validatorResultProofTransitionText.includes(expectedRow),
      true,
      candidatePath,
    );
  }
  for (const [index, retainedPath] of historicalValidatorHelperPaths.entries()) {
    const expectedRow =
      `| ${index + 1} | \`${retainedPath}\` | ` +
      "`RETAIN_LIVE_ABSENCE_ASSERTION` |";
    assert.equal(
      validatorResultProofTransitionText.includes(expectedRow),
      true,
      retainedPath,
    );
    assert.equal(
      validatorHelperProofTransitionText.includes(`\`${retainedPath}\``),
      true,
      retainedPath,
    );
  }
  for (const marker of [
    "DOCS_ONLY",
    "EXACT_TWO_FILE_PREREQUISITE_SCOPE_DEFINED",
    "FOUR_LATER_SIBLING_PATH_LIVE_ABSENCE_ASSERTIONS_RETAINED",
  ]) {
    assert.equal(proofTransitionText.split("\n").includes(marker), true, marker);
  }
  assert.match(proofTransitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(proofTransitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u);
  assert.match(proofTransitionText, /HISTORICAL_SCHEMA_ABSENCE_MARKERS_PRESERVED/u);
  assert.match(proofTransitionText, /SCHEMA_FILE_NOT_CREATED_BY_THIS_SLICE/u);
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n10/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /HISTORICAL_VALIDATOR_HELPER_ABSENCE_MARKERS_PRESERVED/u,
  );
  assert.match(
    validatorResultProofTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultProofTransitionText,
    /RETAINED_VALIDATOR_HELPER_ABSENCE_COUNT:\n2/u,
  );
  assert.match(
    validatorResultProofTransitionText,
    /TRACKED_CONTRACT_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    proofTransitionText,
    /TRACKED_DOCS_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(docsText, /CROSS_REFERENCE_CHECKPOINT_NOT_CREATED/u);
  assert.match(docsText, /ASSERTED_CLAIM_MATRIX_RUNTIME_NOT_CREATED/u);
  assert.match(docsText, /PRODUCT_CANDIDATE_NONE/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_OWNER_SELECTED_ASSERTED_CLAIM_MATRIX_V1_CONTRACT_DEFINED/u,
  );
});
