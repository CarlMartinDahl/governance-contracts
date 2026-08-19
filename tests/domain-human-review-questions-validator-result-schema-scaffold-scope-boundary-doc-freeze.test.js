"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const transitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-questions.json",
  "tests/human-review-questions-schema.test.js",
  "packages/schemas/src/index.js",
  "tests/human-review-questions-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-declared-packet-review-gaps-validator-result.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix-validator-result.json",
];
const futurePaths = [
  "schemas/human-review-questions-validator-result.json",
  "tests/human-review-questions-validator-result-schema.test.js",
];
const validationCodes = [
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
];
const patternMarkers = [
  "indexed question row",
  "indexed question-row field",
  "indexed scalar question value",
  "indexed reference-array field",
  "indexed reference item",
  "duplicate question target",
  "duplicate source target",
  "duplicate chronology target",
  "duplicate claim target",
  "duplicate gap target",
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
    /HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_SCHEMA_SCAFFOLD_SCOPE/u);
});

test("future validator-result schema slice is exactly two transition-permitted files", () => {
  const docsText = readRequired(docsRelativePath);
  const transitionText = readRequired(transitionRelativePath);

  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_SCHEMA_SLICE_FILE_COUNT:\n2/u);
  for (const futurePath of futurePaths) {
    assert.equal(docsText.includes(`\`${futurePath}\``), true, futurePath);
    assert.equal(
      transitionText.includes(
        `\`${futurePath}\` | \`PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE\``,
      ),
      true,
      futurePath,
    );
  }
  assert.match(transitionText, /PROOF_TRANSITION_SLICE_FILE_COUNT:\n5/u);
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
    /https:\/\/governance-contracts\.invalid\/schemas\/human-review-questions-validator-result\.json/u,
  );
  assert.match(docsText, /Human Review Questions Validator Result Contract/u);
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

test("ten indexed path patterns use canonical decimal indices", () => {
  const docsText = readRequired(docsRelativePath);
  const patternSection = docsText.slice(
    docsText.indexOf("## 8. Exact Indexed Path Patterns"),
    docsText.indexOf("## 9."),
  );

  assert.equal((patternSection.match(/^\| [a-z]/gmu) ?? []).length, 10);
  for (const marker of patternMarkers) {
    assert.equal(patternSection.includes(`| ${marker} |`), true, marker);
  }
  assert.match(
    docsText,
    /FUTURE_VALIDATION_ERROR_INDEXED_PATH_PATTERN_COUNT:\n10/u,
  );
  assert.match(docsText, /rejects multi-digit\nindices with a leading zero/u);
  assert.match(docsText, /representation decision for future\nschema paths/u);
});

test("ten code-to-path branches and path branch counts are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const branchSection = docsText.slice(
    docsText.indexOf("## 19. Exact Ten Code-To-Path Branches"),
    docsText.indexOf("## 20."),
  );

  assert.equal((branchSection.match(/^\d+\./gmu) ?? []).length, 10);
  for (const code of validationCodes) {
    assert.equal(branchSection.includes(`\`${code}\``), true, code);
  }
  for (const marker of [
    "REQUIRED_FIELD_MISSING_PATH_BRANCH_COUNT:\n2",
    "UNEXPECTED_FIELD_PATH_BRANCH_COUNT:\n2",
    "INVALID_FIELD_TYPE_PATH_BRANCH_COUNT:\n4",
    "INVALID_FIELD_VALUE_PATH_BRANCH_COUNT:\n3",
    "QUESTION_REFERENCE_REQUIRED_PATH_BRANCH_COUNT:\n1",
    "DUPLICATE_QUESTION_REF_PATH_BRANCH_COUNT:\n1",
    "DUPLICATE_SOURCE_REF_PATH_BRANCH_COUNT:\n1",
    "DUPLICATE_CHRONOLOGY_ENTRY_REF_PATH_BRANCH_COUNT:\n1",
    "DUPLICATE_CLAIM_REF_PATH_BRANCH_COUNT:\n1",
    "DUPLICATE_GAP_REF_PATH_BRANCH_COUNT:\n1",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(
    docsText,
    /FUTURE_VALIDATION_ERROR_CODE_PATH_BRANCH_COUNT:\n10/u,
  );
});

test("unique exact errors are structural while validator behavior stays separate", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(docsText, /FUTURE_VALIDATION_ERROR_ARRAY_UNIQUE_ITEMS:\nTRUE/u);
  assert.match(docsText, /does not implement first-occurrence retention/u);
  for (const phrase of [
    "eleven-phase validation execution order",
    "root-type short-circuit execution",
    "at-least-one-total-reference evaluation behavior",
    "structural duplicate detection for question, source, chronology, claim, or gap references",
    "deep immutability of returned results",
    "no-echo behavior during validation execution",
    "cross-reference membership",
  ]) {
    assert.equal(docsText.includes(phrase), true, phrase);
  }
});

test("six readiness questions are resolved only at scope level", () => {
  const docsText = readRequired(docsRelativePath);
  const resolvedSection = docsText.slice(
    docsText.indexOf("## 24. Resolved Readiness Questions"),
    docsText.indexOf("## 25."),
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
    "QUESTION_GENERATION_NOT_CREATED",
    "ANSWER_GENERATION_NOT_CREATED",
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
