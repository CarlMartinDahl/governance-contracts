"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-questions-schema-scaffold-scope-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const sourcePaths = [
  contractPath,
  readinessPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-chronology.json",
  "schemas/human-review-asserted-claim-matrix.json",
  "schemas/human-review-declared-packet-review-gaps.json",
  "tests/human-review-declared-packet-review-gaps-schema.test.js",
  "packages/schemas/src/index.js",
];
const candidateSchemaPath = "schemas/human-review-questions.json";
const candidateProofPath = "tests/human-review-questions-schema.test.js";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function section(text, heading, nextHeading) {
  const start = text.indexOf(heading);
  assert.notEqual(start, -1, heading);
  const end = text.indexOf(nextHeading, start + heading.length);
  assert.notEqual(end, -1, nextHeading);
  return text.slice(start, end);
}

test("questions schema-scaffold scope references contract and conventions", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(docsText, /Comparison evidence controls only repository-native/u);
  assert.match(docsText, /does not import another contract's domain fields/u);
});

test("all eleven readiness questions receive bounded scope answers", () => {
  const docsText = readRequired(docsPath);
  const resolved = section(
    docsText,
    "## 3. Eleven Resolved Scaffold-Scope Questions",
    "## 4.",
  );

  assert.equal((resolved.match(/^\| \d+ \|/gmu) ?? []).length, 11);
  assert.match(resolved, /RESOLVED_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n11/u);
  for (const selection of [
    "https://json-schema.org/draft/2020-12/schema",
    "$defs.questionRow",
    "minItems: 0",
    "minLength: 1",
    "future-validator-only",
    "uniqueItems: true",
    "four field-specific `minItems: 1` branches",
    "excluded from the smallest schema scaffold",
  ]) {
    assert.equal(resolved.includes(selection), true, selection);
  }
});

test("future implementation paths follow the tracked proof transition", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const files = section(docsText, "## 4.", "## 5.");

  assert.match(files, /FUTURE_SCHEMA_IMPLEMENTATION_FILE_COUNT:\n2/u);
  for (const candidatePath of [candidateSchemaPath, candidateProofPath]) {
    assert.equal(files.includes("`" + candidatePath + "`"), true, candidatePath);
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
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n2/u);
  assert.equal(
    transitionText.includes(
      "`tests/domain-human-review-questions-schema-scaffold-scope-boundary-doc-freeze.test.js`",
    ),
    true,
  );
  assert.match(files, /`packages\/schemas\/src\/index\.js` remains unchanged/u);
});

test("future schema identity and exact four-field root are frozen", () => {
  const docsText = readRequired(docsPath);
  const identity = section(docsText, "## 5.", "## 6.");
  const root = section(docsText, "## 6.", "## 7.");

  for (const exactValue of [
    "https://json-schema.org/draft/2020-12/schema",
    "https://governance-contracts.invalid/schemas/human-review-questions.json",
    "Human Review Questions Contract Scaffold",
  ]) {
    assert.equal(identity.includes("`" + exactValue + "`"), true, exactValue);
  }
  assert.match(identity, /FUTURE_SCHEMA_IDENTITY_KEYWORD_COUNT:\n5/u);
  for (const [position, field] of [
    [1, "contract_id"],
    [2, "contract_version"],
    [3, "packet_ref"],
    [4, "questions"],
  ]) {
    assert.equal(root.includes(position + ". `" + field + "`"), true, field);
  }
  assert.match(root, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n4/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_REQUIRED_COUNT:\n4/u);
  assert.match(root, /human_review\.review_questions/u);
  assert.match(root, /#\/\$defs\/questionRow/u);
});

test("future question row keeps seven exact fields and scalar constraints", () => {
  const docsText = readRequired(docsPath);
  const row = section(docsText, "## 7.", "## 8.");

  for (const [position, field] of [
    [1, "question_ref"],
    [2, "declaration_origin"],
    [3, "declared_question_text"],
    [4, "source_refs"],
    [5, "chronology_entry_refs"],
    [6, "claim_refs"],
    [7, "gap_refs"],
  ]) {
    assert.equal(row.includes(position + ". `" + field + "`"), true, field);
  }
  for (const pattern of [
    "^qst_[a-z0-9][a-z0-9_-]{0,59}$",
    "^src_[a-z0-9][a-z0-9_-]{0,59}$",
    "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
    "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
    "^gap_[a-z0-9][a-z0-9_-]{0,59}$",
  ]) {
    assert.equal(row.includes("`" + pattern + "`"), true, pattern);
  }
  assert.match(row, /FUTURE_SCHEMA_LOCAL_DEFINITION_COUNT:\n1/u);
  assert.match(row, /FUTURE_SCHEMA_QUESTION_ROW_FIELD_COUNT:\n7/u);
  assert.match(row, /FUTURE_SCHEMA_QUESTION_ROW_REQUIRED_COUNT:\n7/u);
  assert.match(row, /FUTURE_SCHEMA_EXPLICIT_MIN_ITEMS_ZERO_COUNT:\n5/u);
  assert.match(row, /FUTURE_SCHEMA_UNIQUE_ITEMS_TRUE_COUNT:\n4/u);
});

test("future row-level anyOf has four exact ordered branches", () => {
  const docsText = readRequired(docsPath);
  const anyOf = section(docsText, "## 8.", "## 9.");

  for (const [position, field] of [
    [1, "source_refs"],
    [2, "chronology_entry_refs"],
    [3, "claim_refs"],
    [4, "gap_refs"],
  ]) {
    const phrase =
      position +
      '. `{ "properties": { "' +
      field +
      '": { "minItems": 1 } } }`';
    assert.equal(
      anyOf.includes(phrase),
      true,
      phrase,
    );
  }
  assert.match(anyOf, /FUTURE_SCHEMA_QUESTION_ROW_ANY_OF_BRANCH_COUNT:\n4/u);
  assert.match(
    anyOf,
    /FUTURE_SCHEMA_QUESTION_ROW_MINIMUM_TOTAL_REFERENCE_COUNT:\n1/u,
  );
  assert.match(anyOf, /Satisfying more than one branch is valid/u);
});

test("future focused proof preserves schema limits and sibling separation", () => {
  const docsText = readRequired(docsPath);
  const proof = section(docsText, "## 9.", "## 10.");
  const excluded = section(docsText, "## 10.", "## 11.");

  assert.equal((proof.match(/^\d+\. /gmu) ?? []).length, 11);
  assert.match(proof, /FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:\n11/u);
  assert.match(proof, /untrimmed string remains schema-valid/u);
  assert.match(proof, /four empty reference arrays[\s\S]*rejected/u);
  assert.match(proof, /sharing `question_ref` remain schema-valid/u);
  for (const excludedPath of [
    "packages/schemas/src/index.js",
    "schemas/human-review-questions-validator-result.json",
    "packages/schemas/src/human-review-questions-validator.js",
  ]) {
    assert.equal(excluded.includes("`" + excludedPath + "`"), true, excludedPath);
  }
});

test("scope remains exact two-file docs-only and non-authorizing", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /CURRENT_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  for (const exactPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes("`" + exactPath + "`"), true, exactPath);
    readRequired(exactPath);
  }
  for (const marker of [
    "DOCS_ONLY",
    "ALL_ELEVEN_SCHEMA_READINESS_QUESTIONS_RESOLVED_AT_SCOPE_LEVEL",
    "FOUR_BRANCH_AT_LEAST_ONE_REFERENCE_ANY_OF_SELECTED",
    "TEXT_TRIM_REMAINS_VALIDATOR_ONLY",
    "CROSS_ROW_QUESTION_REF_UNIQUENESS_REMAINS_VALIDATOR_ONLY",
    "PACKAGE_EXPORT_EXCLUDED",
    "VALIDATOR_RESULT_SCHEMA_EXCLUDED",
    "CROSS_REFERENCE_SURFACES_EXCLUDED",
    "SCHEMA_FILE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_EXACT_TWO_FILE_FUTURE_SCHEMA_SCOPE_FROZEN",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(docsText, /not schema correctness[\s\S]*real-evidence review/u);
});
