"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix.json",
  "tests/human-review-asserted-claim-matrix-schema.test.js",
  "packages/schemas/src/index.js",
  "tests/human-review-asserted-claim-matrix-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-source-register-validator-result.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-chronology-validator-result.json",
];
const futurePaths = [
  "schemas/human-review-asserted-claim-matrix-validator-result.json",
  "tests/human-review-asserted-claim-matrix-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "tests/human-review-asserted-claim-matrix-validator.test.js",
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
const patternMarkers = [
  "indexed claim row",
  "indexed claim-row field",
  "indexed scalar claim value",
  "indexed reference-array field",
  "indexed reference item",
  "state-observation target",
  "duplicate claim target",
  "duplicate source target",
  "duplicate chronology target",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("validator-result scaffold scope and every source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }
  assert.match(
    docsText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_SCHEMA_SCAFFOLD_SCOPE/u);
});

test("future validator-result schema slice is exactly two transition-permitted files", () => {
  const docsText = readRequired(docsRelativePath);
  const proofTransitionText = readRequired(proofTransitionRelativePath);
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionRelativePath,
  );

  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_SCHEMA_SLICE_FILE_COUNT:\n2/u);
  for (const [index, futurePath] of futurePaths.entries()) {
    const expectedRow =
      `| ${index + 1} | \`${futurePath}\` | ` +
      "`PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE` |";
    assert.equal(docsText.includes(`\`${futurePath}\``), true, futurePath);
    assert.equal(proofTransitionText.includes(expectedRow), true, futurePath);
  }
  for (const [index, retainedPath] of historicalValidatorHelperPaths.entries()) {
    const expectedRow =
      `| ${index + 1} | \`${retainedPath}\` | ` +
      "`RETAIN_LIVE_ABSENCE_ASSERTION` |";
    assert.equal(proofTransitionText.includes(expectedRow), true, retainedPath);
    assert.equal(
      validatorHelperProofTransitionText.includes(`\`${retainedPath}\``),
      true,
      retainedPath,
    );
  }
  assert.match(proofTransitionText, /PROOF_TRANSITION_SLICE_FILE_COUNT:\n5/u);
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n10/u,
  );
});

test("future schema identity and exact root shape are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const rootSection = docsText.slice(
    docsText.indexOf("## 5. Exact Future Root Shape"),
    docsText.indexOf("## 6."),
  );

  assert.equal((rootSection.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  for (const field of ["valid", "contractKind", "version", "errors"]) {
    assert.equal(rootSection.includes(`\`${field}\``), true, field);
  }
  assert.match(
    docsText,
    /https:\/\/governance-contracts\.invalid\/schemas\/human-review-asserted-claim-matrix-validator-result\.json/u,
  );
  assert.match(docsText, /Human Review Asserted Claim Matrix Validator Result Contract/u);
  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_REQUIRED_PROPERTY_COUNT:\n4/u);
});

test("two root states and closed error-item shape are exact", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_KEYWORD:\noneOf/u);
  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_COUNT:\n2/u);
  assert.match(docsText, /valid const true`; `errors maxItems 0/u);
  assert.match(docsText, /valid const false`; `errors minItems 1/u);
  assert.match(
    docsText,
    /FUTURE_VALIDATION_ERROR_ITEM_REQUIRED_PROPERTY_COUNT:\n2/u,
  );
  assert.match(docsText, /required: \["code", "path"\]/u);
});

test("nine indexed path patterns are frozen with leading-zero exclusion", () => {
  const docsText = readRequired(docsRelativePath);
  const patternSection = docsText.slice(
    docsText.indexOf("## 8. Exact Indexed Path Patterns"),
    docsText.indexOf("## 9."),
  );

  assert.equal((patternSection.match(/^\| [a-z]/gmu) ?? []).length, 9);
  for (const marker of patternMarkers) {
    assert.equal(patternSection.includes(`| ${marker} |`), true, marker);
  }
  assert.match(
    docsText,
    /FUTURE_VALIDATION_ERROR_INDEXED_PATH_PATTERN_COUNT:\n9/u,
  );
  assert.match(docsText, /rejects multi-digit indices\nwith a leading zero/u);
});

test("eight code-to-path branches and their path branch counts are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const branchSection = docsText.slice(
    docsText.indexOf("## 17. Exact Eight Code-to-Path Branches"),
    docsText.indexOf("## 18."),
  );

  assert.equal((branchSection.match(/^\d+\./gmu) ?? []).length, 8);
  for (const code of validationCodes) {
    assert.equal(branchSection.includes(`\`${code}\``), true, code);
  }
  for (const marker of [
    "REQUIRED_FIELD_MISSING_PATH_BRANCH_COUNT:\n2",
    "UNEXPECTED_FIELD_PATH_BRANCH_COUNT:\n2",
    "INVALID_FIELD_TYPE_PATH_BRANCH_COUNT:\n4",
    "INVALID_FIELD_VALUE_PATH_BRANCH_COUNT:\n4",
    "STATE_OBSERVATION_MISMATCH_PATH_BRANCH_COUNT:\n1",
    "DUPLICATE_CLAIM_REF_PATH_BRANCH_COUNT:\n1",
    "DUPLICATE_SOURCE_REF_PATH_BRANCH_COUNT:\n1",
    "DUPLICATE_CHRONOLOGY_ENTRY_REF_PATH_BRANCH_COUNT:\n1",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(
    docsText,
    /FUTURE_VALIDATION_ERROR_CODE_PATH_BRANCH_COUNT:\n8/u,
  );
});

test("unique exact errors are structural while validator behavior stays separate", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(docsText, /FUTURE_VALIDATION_ERROR_ARRAY_UNIQUE_ITEMS:\nTRUE/u);
  assert.match(docsText, /does not implement first-occurrence retention/u);
  for (const phrase of [
    "eight-phase validation execution order",
    "root-type short-circuit execution",
    "structural duplicate detection for claim, source, or chronology references",
    "state-observation coupling execution order",
    "deep immutability of returned results",
    "no-echo behavior during validation execution",
  ]) {
    assert.equal(docsText.includes(phrase), true, phrase);
  }
});

test("six readiness questions are resolved only at scope level", () => {
  const docsText = readRequired(docsRelativePath);
  const resolvedSection = docsText.slice(
    docsText.indexOf("## 22. Resolved Readiness Questions"),
    docsText.indexOf("## 23."),
  );

  assert.equal((resolvedSection.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  assert.match(
    docsText,
    /RESOLVED_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  assert.match(resolvedSection, /create no schema,\nvalidator, execution/u);
});

test("scaffold scope creates no implementation runtime or conclusion", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
  assert.doesNotMatch(docsText, /\/Users\//u);
});
