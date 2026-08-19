"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const schema = require("../schemas/human-review-questions.json");
const packageSchemas = require("../packages/schemas/src/index.js");

const packageIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "index.js",
);
const scopeDocPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const transitionDocPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const exportName = "humanReviewQuestions";
const expectedRootFields = [
  "contract_id",
  "contract_version",
  "packet_ref",
  "questions",
];
const expectedQuestionFields = [
  "question_ref",
  "declaration_origin",
  "declared_question_text",
  "source_refs",
  "chronology_entry_refs",
  "claim_refs",
  "gap_refs",
];
const expectedReferenceFields = [
  "source_refs",
  "chronology_entry_refs",
  "claim_refs",
  "gap_refs",
];
const blockedSiblingExports = [
  "humanReviewQuestionsValidator",
  "validateHumanReviewQuestions",
  "getHumanReviewQuestionsValidator",
  "humanReviewQuestionsValidatorRegistry",
];

test("packages/schemas exports the Human Review Questions schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-questions.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Questions Contract Scaffold",
  );
});

test("package export preserves the exact Human Review Questions shape", () => {
  const exportedSchema = packageSchemas[exportName];
  const questionRow = exportedSchema.$defs.questionRow;

  assert.deepEqual(exportedSchema.required, expectedRootFields);
  assert.deepEqual(Object.keys(exportedSchema.properties), expectedRootFields);
  assert.equal(exportedSchema.properties.questions.minItems, 0);
  assert.equal(Object.hasOwn(exportedSchema.properties.questions, "uniqueItems"), false);
  assert.deepEqual(questionRow.required, expectedQuestionFields);
  assert.deepEqual(Object.keys(questionRow.properties), expectedQuestionFields);
  assert.equal(questionRow.properties.declaration_origin.const, "HUMAN_DECLARED");
  assert.equal(questionRow.properties.declared_question_text.minLength, 1);
  assert.equal(questionRow.properties.declared_question_text.maxLength, 1000);
  for (const referenceField of expectedReferenceFields) {
    assert.equal(questionRow.properties[referenceField].minItems, 0, referenceField);
    assert.equal(questionRow.properties[referenceField].uniqueItems, true, referenceField);
  }
});

test("package export preserves the four ordered reference-cardinality branches", () => {
  const branches = packageSchemas[exportName].$defs.questionRow.anyOf;

  assert.deepEqual(
    branches,
    expectedReferenceFields.map((field) => ({
      properties: { [field]: { minItems: 1 } },
    })),
  );
});

test("candidate package export preserves validator and dispatch sibling boundaries", () => {
  for (const blockedExport of blockedSiblingExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static schema binding and one schema-object export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences = indexText.match(/\bhumanReviewQuestions\b/gu) ?? [];

  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /humanReviewQuestions = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-questions\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewQuestions = humanReviewQuestions/u,
  );
});

test("package export remains anchored to scope and proof-transition boundaries", () => {
  const scopeText = fs.readFileSync(scopeDocPath, "utf8");
  const transitionText = fs.readFileSync(transitionDocPath, "utf8");

  assert.match(
    scopeText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewQuestions/u,
  );
  assert.match(
    scopeText,
    /HUMAN_REVIEW_QUESTIONS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED/u,
  );
  assert.match(
    transitionText,
    /HUMAN_REVIEW_QUESTIONS_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(scopeText, /Human\/professional\nreview remains the release gate/u);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
});
