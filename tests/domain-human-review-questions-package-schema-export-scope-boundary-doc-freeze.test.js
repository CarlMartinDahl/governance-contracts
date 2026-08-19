"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const controllingPaths = [
  "schemas/human-review-questions.json",
  "tests/human-review-questions-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
];
const conventionPaths = [
  "packages/schemas/src/index.js",
  "tests/human-review-source-register-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
];
const futurePaths = [
  "packages/schemas/src/index.js",
  "tests/human-review-questions-package-export.test.js",
];
const blockedSiblingExports = [
  "humanReviewQuestionsValidatorResult",
  "humanReviewQuestionsValidator",
  "validateHumanReviewQuestions",
  "getHumanReviewQuestionsValidator",
  "humanReviewQuestionsValidatorRegistry",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("Human Review Questions package export scope and sources exist", () => {
  const docsText = readRequired(docsRelativePath);
  for (const sourcePath of [...controllingPaths, ...conventionPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(
    docsText,
    /HUMAN_REVIEW_QUESTIONS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE/u);
});

test("future package export slice is exactly two files", () => {
  const docsText = readRequired(docsRelativePath);
  assert.match(docsText, /FUTURE_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/u);
  for (const futurePath of futurePaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.match(
    docsText,
    /tracked schema file and its existing schema proof test must remain\nunchanged/u,
  );
});

test("exact future package export symbol and source path are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  assert.match(
    docsText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewQuestions/u,
  );
  assert.equal(docsText.includes("`humanReviewQuestions`"), true);
  assert.equal(
    docsText.includes("`../../../schemas/human-review-questions.json`"),
    true,
  );
  assert.match(docsText, /one static `require` binding/u);
  assert.match(docsText, /one `module\.exports` property/u);
});

test("tracked schema identity and structural counts remain unchanged facts", () => {
  const docsText = readRequired(docsRelativePath);
  const schema = JSON.parse(readRequired(controllingPaths[0]));
  const questionRow = schema.$defs.questionRow;
  const referenceFields = [
    "source_refs",
    "chronology_entry_refs",
    "claim_refs",
    "gap_refs",
  ];

  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-questions.json",
  );
  assert.equal(schema.title, "Human Review Questions Contract Scaffold");
  assert.equal(schema.required.length, 4);
  assert.equal(Object.keys(schema.properties).length, 4);
  assert.equal(questionRow.required.length, 7);
  assert.equal(Object.keys(questionRow.properties).length, 7);
  assert.equal(referenceFields.length, 4);
  assert.equal(
    [
      schema.properties.questions,
      ...referenceFields.map((field) => questionRow.properties[field]),
    ].filter((definition) => definition.minItems === 0).length,
    5,
  );
  assert.equal(
    referenceFields.filter(
      (field) => questionRow.properties[field].uniqueItems === true,
    ).length,
    4,
  );
  assert.equal(questionRow.anyOf.length, 4);
  assert.match(docsText, /exactly four required root properties/u);
  assert.match(docsText, /exactly seven required question-row properties/u);
  assert.match(docsText, /Cross-row\n`question_ref` uniqueness/u);
  assert.match(docsText, /does not change or reinterpret that schema/u);
});

test("validator cross-reference generation answers source use and runtime remain separate", () => {
  const docsText = readRequired(docsRelativePath);
  for (const blockedExport of blockedSiblingExports) {
    assert.equal(docsText.includes("- `" + blockedExport + "`"), true, blockedExport);
  }
  for (const marker of [
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "QUESTION_GENERATION_NOT_CREATED",
    "ANSWER_GENERATION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /SEPARATE_LATER_CONTRACT_ONLY_SLICE/u);
  assert.match(docsText, /SEPARATE_LATER_GOVERNANCE_SLICE/u);
  assert.match(docsText, /OUT_OF_SCOPE_NOT_AUTHORIZED/u);
});

test("future proof remains schema-object export proof only", () => {
  const docsText = readRequired(docsRelativePath);
  assert.match(docsText, /exported object is reference-equal and deeply equal/u);
  assert.match(docsText, /exported `\$id` and title equal/u);
  assert.match(docsText, /four-field root, seven-field question/u);
  assert.match(docsText, /four reference arrays, five zero minima/u);
  assert.match(docsText, /four ordered `anyOf` branches/u);
  assert.match(docsText, /adds no validation execution, cross-reference/u);
  assert.match(docsText, /does not prove that the package export exists/u);
});

test("scope preserves release and no-conclusion boundaries", () => {
  const docsText = readRequired(docsRelativePath);
  for (const marker of [
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /Human\/professional\nreview remains the release gate/u);
  assert.match(docsText, /not actual human review/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
  assert.doesNotMatch(docsText, /\/Users\//u);
});
