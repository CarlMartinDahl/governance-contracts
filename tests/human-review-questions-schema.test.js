"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(repoRoot, "schemas", "human-review-questions.json");
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const packageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionPath = path.join(
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
const referenceFields = [
  "source_refs",
  "chronology_entry_refs",
  "claim_refs",
  "gap_refs",
];
const referencePatterns = {
  source_refs: "^src_[a-z0-9][a-z0-9_-]{0,59}$",
  chronology_entry_refs: "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
  claim_refs: "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
  gap_refs: "^gap_[a-z0-9][a-z0-9_-]{0,59}$",
};
const referenceTokens = {
  source_refs: "src_message_001",
  chronology_entry_refs: "chr_review_001",
  claim_refs: "clm_review_001",
  gap_refs: "gap_review_001",
};
const validatorResultCandidatePaths = [
  "schemas/human-review-questions-validator-result.json",
  "tests/human-review-questions-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-questions-validator.js",
  "tests/human-review-questions-validator.test.js",
];
const retainedCrossReferencePaths = [
  "packages/governance/src/human-review-questions-cross-reference-validation-boundary.js",
  "tests/human-review-questions-cross-reference-validation-boundary.test.js",
];

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, `expected ${filePath}`);
  return fs.readFileSync(filePath, "utf8");
}

function codePointLength(value) {
  return [...value].length;
}

function matchesType(value, type) {
  if (type === "string") return typeof value === "string";
  if (type === "array") return Array.isArray(value);
  if (type === "object") {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  return false;
}

function matchesDefinition(value, definition) {
  if (definition.type && !matchesType(value, definition.type)) return false;
  if (Object.hasOwn(definition, "const") && value !== definition.const) return false;
  if (definition.pattern && !new RegExp(definition.pattern, "u").test(value)) return false;
  if (
    definition.minLength !== undefined &&
    (typeof value !== "string" || codePointLength(value) < definition.minLength)
  ) {
    return false;
  }
  if (
    definition.maxLength !== undefined &&
    (typeof value !== "string" || codePointLength(value) > definition.maxLength)
  ) {
    return false;
  }
  return true;
}

function hasExactObjectShape(value, definition) {
  if (!matchesType(value, "object")) return false;
  const actualKeys = Object.keys(value);
  if (
    definition.additionalProperties === false &&
    actualKeys.some((key) => !Object.hasOwn(definition.properties, key))
  ) {
    return false;
  }
  return definition.required.every((field) => Object.hasOwn(value, field));
}

function validatesReferenceArray(value, definition) {
  if (!Array.isArray(value)) return false;
  if (value.length < definition.minItems) return false;
  if (definition.uniqueItems === true && new Set(value).size !== value.length) return false;
  return value.every((item) => matchesDefinition(item, definition.items));
}

function satisfiesReferenceAnyOf(question, branches) {
  return branches.some((branch) =>
    Object.entries(branch.properties).every(
      ([field, definition]) =>
        Array.isArray(question[field]) && question[field].length >= definition.minItems,
    ),
  );
}

function validateAgainstSchemaContract(schema, candidate) {
  if (!hasExactObjectShape(candidate, schema)) return false;
  for (const field of ["contract_id", "contract_version", "packet_ref"]) {
    if (!matchesDefinition(candidate[field], schema.properties[field])) return false;
  }

  const questionsDefinition = schema.properties.questions;
  if (!Array.isArray(candidate.questions)) return false;
  if (candidate.questions.length < questionsDefinition.minItems) return false;

  const questionDefinition = schema.$defs.questionRow;
  for (const question of candidate.questions) {
    if (!hasExactObjectShape(question, questionDefinition)) return false;
    for (const field of [
      "question_ref",
      "declaration_origin",
      "declared_question_text",
    ]) {
      if (!matchesDefinition(question[field], questionDefinition.properties[field])) {
        return false;
      }
    }
    for (const field of referenceFields) {
      if (!validatesReferenceArray(question[field], questionDefinition.properties[field])) {
        return false;
      }
    }
    if (!satisfiesReferenceAnyOf(question, questionDefinition.anyOf)) return false;
  }
  return true;
}

function createQuestion(overrides = {}) {
  return {
    question_ref: "qst_review_001",
    declaration_origin: "HUMAN_DECLARED",
    declared_question_text: "What requires human review?",
    source_refs: ["src_message_001"],
    chronology_entry_refs: [],
    claim_refs: [],
    gap_refs: [],
    ...overrides,
  };
}

function createPacket(overrides = {}) {
  return {
    contract_id: "human_review.review_questions",
    contract_version: "1.0.0",
    packet_ref: "pkt_review_001",
    questions: [],
    ...overrides,
  };
}

test("schema file exists with the exact scoped identity and keyword order", () => {
  const schemaText = readRequired(schemaPath);
  const schema = JSON.parse(schemaText);

  assert.deepEqual(Object.keys(schema), [
    "$schema",
    "$id",
    "title",
    "type",
    "additionalProperties",
    "required",
    "properties",
    "$defs",
  ]);
  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-questions.json",
  );
  assert.equal(schema.title, "Human Review Questions Contract Scaffold");
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
});

test("root fields and questions array have the exact closed scaffold", () => {
  const schema = require(schemaPath);
  const questions = schema.properties.questions;

  assert.deepEqual(schema.required, expectedRootFields);
  assert.deepEqual(Object.keys(schema.properties), expectedRootFields);
  assert.deepEqual(expectedRootFields.map((field) => schema.properties[field].type), [
    "string",
    "string",
    "string",
    "array",
  ]);
  assert.equal(schema.properties.contract_id.const, "human_review.review_questions");
  assert.equal(schema.properties.contract_version.const, "1.0.0");
  assert.equal(schema.properties.packet_ref.pattern, "^pkt_[a-z0-9][a-z0-9_-]{0,59}$");
  assert.deepEqual(Object.keys(questions), ["type", "minItems", "items"]);
  assert.equal(questions.minItems, 0);
  assert.equal(Object.hasOwn(questions, "maxItems"), false);
  assert.equal(Object.hasOwn(questions, "uniqueItems"), false);
  assert.deepEqual(questions.items, { $ref: "#/$defs/questionRow" });
});

test("local questionRow has exactly seven fields and bounded scalar definitions", () => {
  const schema = require(schemaPath);
  const question = schema.$defs.questionRow;

  assert.deepEqual(Object.keys(schema.$defs), ["questionRow"]);
  assert.deepEqual(Object.keys(question), [
    "type",
    "additionalProperties",
    "required",
    "properties",
    "anyOf",
  ]);
  assert.equal(question.type, "object");
  assert.equal(question.additionalProperties, false);
  assert.deepEqual(question.required, expectedQuestionFields);
  assert.deepEqual(Object.keys(question.properties), expectedQuestionFields);
  assert.equal(
    question.properties.question_ref.pattern,
    "^qst_[a-z0-9][a-z0-9_-]{0,59}$",
  );
  assert.deepEqual(question.properties.declaration_origin, {
    type: "string",
    const: "HUMAN_DECLARED",
  });
  assert.deepEqual(question.properties.declared_question_text, {
    type: "string",
    minLength: 1,
    maxLength: 1000,
  });
});

test("four reference arrays have exact empty-allowed unique scalar constraints", () => {
  const properties = require(schemaPath).$defs.questionRow.properties;

  for (const field of referenceFields) {
    assert.deepEqual(properties[field], {
      type: "array",
      minItems: 0,
      uniqueItems: true,
      items: { type: "string", pattern: referencePatterns[field] },
    });
    assert.equal(Object.hasOwn(properties[field], "maxItems"), false, field);
  }
});

test("questionRow anyOf has four exact ordered minimum-reference branches", () => {
  const branches = require(schemaPath).$defs.questionRow.anyOf;

  assert.deepEqual(
    branches,
    referenceFields.map((field) => ({ properties: { [field]: { minItems: 1 } } })),
  );
  assert.equal(branches.length, 4);
});

test("empty one-reference and combined-reference packets satisfy structural proof", () => {
  const schema = require(schemaPath);

  assert.equal(validateAgainstSchemaContract(schema, createPacket()), true);
  for (const field of referenceFields) {
    const references = Object.fromEntries(referenceFields.map((name) => [name, []]));
    references[field] = [referenceTokens[field]];
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createPacket({ questions: [createQuestion(references)] }),
      ),
      true,
      field,
    );
  }
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({
        questions: [
          createQuestion(
            Object.fromEntries(
              referenceFields.map((field) => [field, [referenceTokens[field]]]),
            ),
          ),
        ],
      }),
    ),
    true,
  );
});

test("missing unknown wrong-type fixed-value pattern and reference cases fail", () => {
  const schema = require(schemaPath);
  const valid = createPacket({ questions: [createQuestion()] });

  for (const field of expectedRootFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(validateAgainstSchemaContract(schema, missing), false, field);
  }
  for (const field of expectedQuestionFields) {
    const question = createQuestion();
    delete question[field];
    assert.equal(
      validateAgainstSchemaContract(schema, createPacket({ questions: [question] })),
      false,
      field,
    );
  }

  for (const field of referenceFields) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createPacket({ questions: [createQuestion({ [field]: {} })] }),
      ),
      false,
      `${field} type`,
    );
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createPacket({ questions: [createQuestion({ [field]: ["invalid-ref"] })] }),
      ),
      false,
      `${field} pattern`,
    );
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createPacket({ questions: [createQuestion({ [field]: [1] })] }),
      ),
      false,
      `${field} item type`,
    );
  }

  const invalidCandidates = [
    { ...valid, extra: "blocked" },
    { ...valid, contract_id: "other" },
    { ...valid, contract_version: "2.0.0" },
    { ...valid, packet_ref: "packet-001" },
    { ...valid, questions: {} },
    createPacket({ questions: [createQuestion({ extra: "blocked" })] }),
    createPacket({ questions: [createQuestion({ question_ref: "question-001" })] }),
    createPacket({ questions: [createQuestion({ declaration_origin: "MODEL_DERIVED" })] }),
    createPacket({ questions: [createQuestion({ declared_question_text: 1 })] }),
  ];
  for (const candidate of invalidCandidates) {
    assert.equal(validateAgainstSchemaContract(schema, candidate), false);
  }
});

test("declared text uses code-point bounds while trim and meaning stay outside schema", () => {
  const schema = require(schemaPath);
  const glyph = String.fromCodePoint(0x1f600);

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({
        questions: [createQuestion({ declared_question_text: glyph.repeat(1000) })],
      }),
    ),
    true,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({
        questions: [createQuestion({ declared_question_text: glyph.repeat(1001) })],
      }),
    ),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({ questions: [createQuestion({ declared_question_text: "" })] }),
    ),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({ questions: [createQuestion({ declared_question_text: "  pending  " })] }),
    ),
    true,
  );
  assert.equal(
    Object.hasOwn(
      schema.$defs.questionRow.properties.declared_question_text,
      "pattern",
    ),
    false,
  );
});

test("reference cardinality and duplicates stay structural while row identity stays validator-only", () => {
  const schema = require(schemaPath);
  const emptyReferences = Object.fromEntries(referenceFields.map((field) => [field, []]));

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({ questions: [createQuestion(emptyReferences)] }),
    ),
    false,
  );
  for (const field of referenceFields) {
    const token = referenceTokens[field];
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createPacket({ questions: [createQuestion({ [field]: [token, token] })] }),
      ),
      false,
      field,
    );
  }
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({
        questions: [
          createQuestion(),
          createQuestion({ declared_question_text: "A second question with the same ref" }),
        ],
      }),
    ),
    true,
  );
  assert.equal(Object.hasOwn(schema.properties.questions, "uniqueItems"), false);
});

test("schema stays candidate-only with package validator cross-reference and runtime seams closed", () => {
  const schema = require(schemaPath);
  const schemaText = readRequired(schemaPath);
  const transitionText = readRequired(transitionPath);
  const packageExportTransitionText = readRequired(packageExportTransitionPath);
  const validatorResultTransitionText = readRequired(validatorResultTransitionPath);
  const validatorHelperTransitionText = readRequired(validatorHelperTransitionPath);
  const crossReferenceTransitionText = readRequired(crossReferenceTransitionPath);

  for (const prohibitedField of [
    "question_category",
    "question_purpose",
    "review_state",
    "status",
    "answer",
    "resolution",
    "closed",
    "priority",
    "severity",
    "score",
    "rank",
    "recommendation",
    "actionClass",
    "escalationTarget",
    "safeNextAction",
    "actor_ref",
    "approval",
    "handoff",
    "revision",
    "supersedes",
  ]) {
    assert.equal(
      Object.hasOwn(schema.$defs.questionRow.properties, prohibitedField),
      false,
      prohibitedField,
    );
  }
  for (const fragment of [
    "duplicate_question_ref",
    "ROOT_TYPE_GATE",
    "VALIDATION_EXECUTION",
    "provider",
    "runtime",
    "persistence",
    "api",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_TRANSITION_COUNT:\n1/u,
  );
  assert.equal(packageExportTransitionText.includes("`humanReviewQuestions`"), true);
  for (const candidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + candidatePath + "` | `PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  for (const historicalPath of historicalValidatorHelperPaths) {
    assert.equal(transitionText.includes("`" + historicalPath + "`"), true, historicalPath);
    assert.equal(
      packageExportTransitionText.includes("`" + historicalPath + "`"),
      true,
      historicalPath,
    );
    assert.equal(
      validatorHelperTransitionText.includes("`" + historicalPath + "`"),
      true,
      historicalPath,
    );
  }
  for (const retainedPath of retainedCrossReferencePaths) {
    assert.equal(transitionText.includes("`" + retainedPath + "`"), true, retainedPath);
    assert.equal(
      packageExportTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
    assert.equal(
      crossReferenceTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
  }
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(
    packageExportTransitionText,
    /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u,
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
    validatorHelperTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n9/u,
  );
  assert.match(
    validatorHelperTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
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

test("schema remains anchored to contract scope proof transition and stated limits", () => {
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);
  const packageExportTransitionText = readRequired(packageExportTransitionPath);

  assert.match(
    contractText,
    /HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_CONTRACT_SEMANTICS_FROZEN_SCHEMA_VALIDATOR_AND_RUNTIME_NOT_CREATED/u,
  );
  assert.match(
    scopeText,
    /HUMAN_REVIEW_QUESTIONS_SCHEMA_SCAFFOLD_SCOPE_STATUS:\nTRACKED_DOCS_ONLY_EXACT_TWO_FILE_FUTURE_SCHEMA_SCOPE_FROZEN/u,
  );
  assert.match(scopeText, /PACKAGE_EXPORT_EXCLUDED/u);
  assert.match(scopeText, /VALIDATOR_RESULT_SCHEMA_EXCLUDED/u);
  assert.match(scopeText, /CROSS_REFERENCE_SURFACES_EXCLUDED/u);
  assert.match(scopeText, /does not enforce cross-row/u);
  assert.match(scopeText, /plain-object\/accessor behavior/u);
  assert.match(scopeText, /cross-contract token membership/u);
  assert.match(scopeText, /unanswered posture, or substantive text meaning/u);
  assert.match(
    transitionText,
    /HUMAN_REVIEW_QUESTIONS_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_FIRST_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(transitionText, /not evidence that either candidate file already exists/u);
  assert.match(
    packageExportTransitionText,
    /HUMAN_REVIEW_QUESTIONS_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
});
