"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-questions-validator-result.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md",
);
const readinessPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorHelperTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const crossReferenceTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

const resultFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const indexedQuestionPattern = "^\\$\\.questions\\[(0|[1-9][0-9]*)\\]$";
const indexedQuestionFieldPattern =
  "^\\$\\.questions\\[(0|[1-9][0-9]*)\\]\\.(question_ref|declaration_origin|declared_question_text|source_refs|chronology_entry_refs|claim_refs|gap_refs)$";
const indexedQuestionValuePattern =
  "^\\$\\.questions\\[(0|[1-9][0-9]*)\\]\\.(question_ref|declaration_origin|declared_question_text)$";
const indexedReferenceItemPattern =
  "^\\$\\.questions\\[(0|[1-9][0-9]*)\\]\\.(source_refs|chronology_entry_refs|claim_refs|gap_refs)\\[(0|[1-9][0-9]*)\\]$";
const duplicateQuestionPattern =
  "^\\$\\.questions\\[(0|[1-9][0-9]*)\\]\\.question_ref$";
const duplicateSourcePattern =
  "^\\$\\.questions\\[(0|[1-9][0-9]*)\\]\\.source_refs\\[(0|[1-9][0-9]*)\\]$";
const duplicateChronologyPattern =
  "^\\$\\.questions\\[(0|[1-9][0-9]*)\\]\\.chronology_entry_refs\\[(0|[1-9][0-9]*)\\]$";
const duplicateClaimPattern =
  "^\\$\\.questions\\[(0|[1-9][0-9]*)\\]\\.claim_refs\\[(0|[1-9][0-9]*)\\]$";
const duplicateGapPattern =
  "^\\$\\.questions\\[(0|[1-9][0-9]*)\\]\\.gap_refs\\[(0|[1-9][0-9]*)\\]$";

const errorPartitions = [
  {
    code: "required_field_missing",
    paths: [
      {
        enum: ["$.contract_id", "$.contract_version", "$.packet_ref", "$.questions"],
      },
      { pattern: indexedQuestionFieldPattern },
    ],
  },
  {
    code: "unexpected_field",
    paths: [{ const: "$" }, { pattern: indexedQuestionPattern }],
  },
  {
    code: "invalid_field_type",
    paths: [
      {
        enum: [
          "$",
          "$.contract_id",
          "$.contract_version",
          "$.packet_ref",
          "$.questions",
        ],
      },
      { pattern: indexedQuestionPattern },
      { pattern: indexedQuestionFieldPattern },
      { pattern: indexedReferenceItemPattern },
    ],
  },
  {
    code: "invalid_field_value",
    paths: [
      { enum: ["$.contract_id", "$.contract_version", "$.packet_ref"] },
      { pattern: indexedQuestionValuePattern },
      { pattern: indexedReferenceItemPattern },
    ],
  },
  { code: "question_reference_required", pattern: indexedQuestionPattern },
  { code: "duplicate_question_ref", pattern: duplicateQuestionPattern },
  { code: "duplicate_source_ref", pattern: duplicateSourcePattern },
  {
    code: "duplicate_chronology_entry_ref",
    pattern: duplicateChronologyPattern,
  },
  { code: "duplicate_claim_ref", pattern: duplicateClaimPattern },
  { code: "duplicate_gap_ref", pattern: duplicateGapPattern },
];

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, "expected " + filePath);
  return fs.readFileSync(filePath, "utf8");
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, canonicalize(value[key])]),
  );
}

function matchesSchema(value, definition) {
  if (definition.type === "boolean" && typeof value !== "boolean") return false;
  if (definition.type === "string" && typeof value !== "string") return false;
  if (definition.type === "array" && !Array.isArray(value)) return false;
  if (definition.type === "object" && !isObject(value)) return false;
  if (Object.hasOwn(definition, "const") && value !== definition.const) return false;
  if (definition.enum && !definition.enum.includes(value)) return false;
  if (definition.pattern && !new RegExp(definition.pattern, "u").test(value)) return false;
  if (definition.maxItems !== undefined && value.length > definition.maxItems) return false;
  if (definition.minItems !== undefined && value.length < definition.minItems) return false;

  if (definition.required) {
    if (!isObject(value)) return false;
    if (definition.required.some((field) => !Object.hasOwn(value, field))) return false;
  }
  if (definition.additionalProperties === false) {
    if (!isObject(value)) return false;
    if (
      Object.keys(value).some(
        (field) => !Object.hasOwn(definition.properties ?? {}, field),
      )
    ) {
      return false;
    }
  }
  if (definition.properties && isObject(value)) {
    for (const [field, fieldDefinition] of Object.entries(definition.properties)) {
      if (Object.hasOwn(value, field) && !matchesSchema(value[field], fieldDefinition)) {
        return false;
      }
    }
  }
  if (definition.items && Array.isArray(value)) {
    if (value.some((item) => !matchesSchema(item, definition.items))) return false;
  }
  if (definition.uniqueItems && Array.isArray(value)) {
    const canonicalItems = value.map((item) => JSON.stringify(canonicalize(item)));
    if (new Set(canonicalItems).size !== canonicalItems.length) return false;
  }
  if (definition.oneOf) {
    if (definition.oneOf.filter((branch) => matchesSchema(value, branch)).length !== 1) {
      return false;
    }
  }
  return true;
}

function createResult(overrides = {}) {
  return {
    valid: true,
    contractKind: "HUMAN_REVIEW_QUESTIONS_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors: [],
    ...overrides,
  };
}

test("validator-result schema exists with the exact scoped identity", () => {
  const schema = JSON.parse(readRequired(schemaPath));

  assert.deepEqual(Object.keys(schema), [
    "$schema",
    "$id",
    "title",
    "type",
    "additionalProperties",
    "required",
    "properties",
    "oneOf",
  ]);
  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-questions-validator-result.json",
  );
  assert.equal(schema.title, "Human Review Questions Validator Result Contract");
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
});

test("root required properties types and identity literals are exact", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.required, resultFields);
  assert.deepEqual(Object.keys(schema.properties), resultFields);
  assert.deepEqual(resultFields.map((field) => schema.properties[field].type), [
    "boolean",
    "string",
    "string",
    "array",
  ]);
  assert.equal(
    schema.properties.contractKind.const,
    "HUMAN_REVIEW_QUESTIONS_VALIDATOR_BOUNDARY",
  );
  assert.equal(schema.properties.version.const, "1.0.0");
  assert.equal(schema.properties.errors.uniqueItems, true);
});

test("root oneOf contains only the exact success and failure branches", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.oneOf, [
    {
      properties: {
        valid: { const: true },
        errors: { maxItems: 0 },
      },
    },
    {
      properties: {
        valid: { const: false },
        errors: { minItems: 1 },
      },
    },
  ]);
});

test("inline error item is the exact closed two-field object", () => {
  const item = require(schemaPath).properties.errors.items;

  assert.deepEqual(Object.keys(item), [
    "type",
    "additionalProperties",
    "required",
    "properties",
    "oneOf",
  ]);
  assert.equal(item.type, "object");
  assert.equal(item.additionalProperties, false);
  assert.deepEqual(item.required, errorFields);
  assert.deepEqual(Object.keys(item.properties), errorFields);
  assert.equal(item.properties.code.type, "string");
  assert.equal(item.properties.path.type, "string");
  assert.equal(Object.hasOwn(item, "$defs"), false);
});

test("item oneOf contains the exact ten code-to-path partitions", () => {
  const branches = require(schemaPath).properties.errors.items.oneOf;

  assert.equal(branches.length, 10);
  assert.deepEqual(
    branches.map((branch) => branch.properties.code.const),
    errorPartitions.map((partition) => partition.code),
  );
  for (const [index, branch] of branches.entries()) {
    assert.deepEqual(Object.keys(branch), ["properties"]);
    assert.deepEqual(Object.keys(branch.properties), errorFields);
    assert.deepEqual(Object.keys(branch.properties.code), ["const"]);
    if (errorPartitions[index].paths) {
      assert.deepEqual(branch.properties.path.oneOf, errorPartitions[index].paths);
    } else {
      assert.equal(branch.properties.path.pattern, errorPartitions[index].pattern);
    }
  }
});

test("minimal success and representative indexed failures satisfy structural proof", () => {
  const schema = require(schemaPath);
  const representativeErrors = [
    { code: "required_field_missing", path: "$.contract_id" },
    { code: "required_field_missing", path: "$.questions[12].declared_question_text" },
    { code: "unexpected_field", path: "$" },
    { code: "unexpected_field", path: "$.questions[0]" },
    { code: "invalid_field_type", path: "$.questions" },
    { code: "invalid_field_type", path: "$.questions[9].gap_refs" },
    { code: "invalid_field_type", path: "$.questions[9].source_refs[3]" },
    { code: "invalid_field_value", path: "$.packet_ref" },
    { code: "invalid_field_value", path: "$.questions[3].question_ref" },
    { code: "invalid_field_value", path: "$.questions[3].claim_refs[2]" },
    { code: "question_reference_required", path: "$.questions[4]" },
    { code: "duplicate_question_ref", path: "$.questions[22].question_ref" },
    { code: "duplicate_source_ref", path: "$.questions[22].source_refs[4]" },
    {
      code: "duplicate_chronology_entry_ref",
      path: "$.questions[22].chronology_entry_refs[5]",
    },
    { code: "duplicate_claim_ref", path: "$.questions[22].claim_refs[6]" },
    { code: "duplicate_gap_ref", path: "$.questions[22].gap_refs[7]" },
  ];

  assert.equal(matchesSchema(createResult(), schema), true);
  for (const error of representativeErrors) {
    assert.equal(
      matchesSchema(createResult({ valid: false, errors: [error] }), schema),
      true,
      error.code + ":" + error.path,
    );
  }
  assert.equal(
    matchesSchema(createResult({ valid: false, errors: representativeErrors }), schema),
    true,
  );
});

test("missing unknown type identity and state-coupling violations fail closed", () => {
  const schema = require(schemaPath);
  const valid = createResult();

  for (const field of resultFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(matchesSchema(missing, schema), false, field);
  }
  assert.equal(matchesSchema(null, schema), false);
  assert.equal(matchesSchema([], schema), false);
  assert.equal(matchesSchema({ ...valid, extra: true }, schema), false);
  assert.equal(matchesSchema({ ...valid, valid: "true" }, schema), false);
  assert.equal(matchesSchema({ ...valid, errors: {} }, schema), false);
  assert.equal(matchesSchema({ ...valid, contractKind: "OTHER" }, schema), false);
  assert.equal(matchesSchema({ ...valid, version: "1.0.1" }, schema), false);
  assert.equal(
    matchesSchema(
      createResult({
        valid: true,
        errors: [{ code: "unexpected_field", path: "$" }],
      }),
      schema,
    ),
    false,
  );
  assert.equal(matchesSchema(createResult({ valid: false }), schema), false);
});

test("malformed paths invalid cross-pairs extra fields and duplicate errors fail closed", () => {
  const schema = require(schemaPath);
  const duplicate = {
    code: "duplicate_source_ref",
    path: "$.questions[1].source_refs[2]",
  };

  assert.equal(
    matchesSchema(
      createResult({
        valid: false,
        errors: [duplicate, { path: duplicate.path, code: duplicate.code }],
      }),
      schema,
    ),
    false,
  );

  for (const invalidError of [
    { code: "unknown_code", path: "$" },
    { code: "unexpected_field", path: "$.questions" },
    { code: "duplicate_question_ref", path: "$.questions[1].source_refs[0]" },
    { code: "duplicate_source_ref", path: "$.questions[1].question_ref" },
    {
      code: "duplicate_chronology_entry_ref",
      path: "$.questions[1].claim_refs[0]",
    },
    { code: "duplicate_claim_ref", path: "$.questions[1].gap_refs[0]" },
    { code: "duplicate_gap_ref", path: "$.questions[1].claim_refs[0]" },
    { code: "question_reference_required", path: "$.questions[1].question_ref" },
    { code: "duplicate_question_ref", path: "$.questions[01].question_ref" },
    { code: "duplicate_source_ref", path: "$.questions[1].source_refs[02]" },
    { code: "invalid_field_value", path: "$.questions[1].source_refs" },
    { code: "required_field_missing", path: "$.questions[0]" },
    { code: "invalid_field_type", path: "$.dynamic" },
    { code: "unexpected_field", path: "$", message: "blocked" },
    { code: "unexpected_field" },
    { path: "$" },
    { code: false, path: "$" },
    { code: "unexpected_field", path: false },
  ]) {
    assert.equal(
      matchesSchema(createResult({ valid: false, errors: [invalidError] }), schema),
      false,
      JSON.stringify(invalidError),
    );
  }
});

test("schema stays structural-only while validator export and checkpoint remain absent", () => {
  const schemaText = readRequired(schemaPath);
  const validatorHelperTransitionText = readRequired(validatorHelperTransitionPath);
  const crossReferenceTransitionText = readRequired(crossReferenceTransitionPath);
  const packageSchemas = require("../packages/schemas/src/index.js");

  for (const fragment of [
    "\"message\"",
    "\"detail\"",
    "\"candidate\"",
    "\"payload\"",
    "\"content\"",
    "\"answer\"",
    "\"score\"",
    "\"finding\"",
    "\"conclusion\"",
    "\"approval\"",
    "\"readiness\"",
    "\"remediation\"",
    "\"$defs\"",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
  for (const blockedExport of [
    "humanReviewQuestionsValidator",
    "validateHumanReviewQuestions",
    "getHumanReviewQuestionsValidator",
    "humanReviewQuestionsValidatorRegistry",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
  for (const historicalPath of [
    "packages/schemas/src/human-review-questions-validator.js",
    "tests/human-review-questions-validator.test.js",
  ]) {
    assert.equal(
      validatorHelperTransitionText.includes("`" + historicalPath + "`"),
      true,
      historicalPath,
    );
  }
  for (const blockedPath of [
    "packages/governance/src/human-review-questions-cross-reference-validation-boundary.js",
    "tests/human-review-questions-cross-reference-validation-boundary.test.js",
  ]) {
    assert.equal(
      crossReferenceTransitionText.includes("`" + blockedPath + "`"),
      true,
      blockedPath,
    );
  }
  assert.match(
    validatorHelperTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n9/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n16/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("schema remains anchored to contract readiness scope and proof transition", () => {
  const contractText = readRequired(contractPath);
  const readinessText = readRequired(readinessPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);

  assert.match(
    contractText,
    /TRACKED_DOCS_ONLY_CONTRACT_SEMANTICS_FROZEN_SCHEMA_VALIDATOR_AND_RUNTIME_NOT_CREATED/u,
  );
  assert.match(
    readinessText,
    /TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_READINESS_ASSESSED/u,
  );
  assert.match(
    scopeText,
    /TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED/u,
  );
  assert.match(
    transitionText,
    /TRACKED_CONTRACT_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(scopeText, /SCHEMA_EXPORT_NOT_CREATED/u);
  assert.match(scopeText, /VALIDATOR_NOT_CREATED/u);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
});
