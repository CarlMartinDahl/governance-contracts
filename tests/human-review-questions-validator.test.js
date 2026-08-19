"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const validatorModule = require("../packages/schemas/src/human-review-questions-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");
const resultSchema = require("../schemas/human-review-questions-validator-result.json");

const { validateHumanReviewQuestions } = validatorModule;
const validatorPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "human-review-questions-validator.js",
);
const packageIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "index.js",
);
const scaffoldPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

function createQuestion(overrides = {}) {
  return {
    question_ref: "qst_alpha",
    declaration_origin: "HUMAN_DECLARED",
    declared_question_text: "Declared review question",
    source_refs: ["src_alpha"],
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
    packet_ref: "pkt_alpha",
    questions: [],
    ...overrides,
  };
}

function expectedResult(errors = []) {
  return {
    valid: errors.length === 0,
    contractKind:
      "HUMAN_REVIEW_QUESTIONS_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors,
  };
}

function matchesStringRule(value, rule) {
  if (Object.hasOwn(rule, "const") && value !== rule.const) {
    return false;
  }
  if (rule.enum && !rule.enum.includes(value)) {
    return false;
  }
  if (rule.pattern && !new RegExp(rule.pattern, "u").test(value)) {
    return false;
  }
  if (
    rule.oneOf &&
    !rule.oneOf.some((branch) => matchesStringRule(value, branch))
  ) {
    return false;
  }
  return true;
}

function matchesErrorContract(error) {
  if (
    error === null ||
    typeof error !== "object" ||
    Array.isArray(error) ||
    Object.getPrototypeOf(error) !== Object.prototype ||
    !Object.isFrozen(error) ||
    JSON.stringify(Object.keys(error)) !== JSON.stringify(["code", "path"])
  ) {
    return false;
  }

  return resultSchema.properties.errors.items.oneOf.some(
    (branch) =>
      matchesStringRule(error.code, branch.properties.code) &&
      matchesStringRule(error.path, branch.properties.path),
  );
}

function matchesResultContract(result) {
  if (
    result === null ||
    typeof result !== "object" ||
    Array.isArray(result) ||
    JSON.stringify(Object.keys(result)) !==
      JSON.stringify(["valid", "contractKind", "version", "errors"]) ||
    result.contractKind !== resultSchema.properties.contractKind.const ||
    result.version !== resultSchema.properties.version.const ||
    !Array.isArray(result.errors) ||
    !Object.isFrozen(result) ||
    !Object.isFrozen(result.errors) ||
    !result.errors.every(matchesErrorContract)
  ) {
    return false;
  }

  const pairs = result.errors.map((error) => `${error.code}\u0000${error.path}`);
  return (
    new Set(pairs).size === pairs.length &&
    result.valid === (result.errors.length === 0)
  );
}

test("module exports exactly one internal unary validator", () => {
  assert.deepEqual(Object.keys(validatorModule), [
    "validateHumanReviewQuestions",
  ]);
  assert.equal(
    typeof validateHumanReviewQuestions,
    "function",
  );
  assert.equal(validateHumanReviewQuestions.length, 1);

  for (const exportName of [
    "humanReviewQuestionsValidator",
    "validateHumanReviewQuestions",
    "getHumanReviewQuestionsValidator",
    "humanReviewQuestionsValidatorRegistry",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }
});

test("valid empty and populated packets return exact frozen successes", () => {
  const emptyResult = validateHumanReviewQuestions(
    createPacket(),
  );
  const populatedResult = validateHumanReviewQuestions(
    createPacket({
      questions: [
        createQuestion({
          source_refs: ["src_alpha", "src_beta"],
          chronology_entry_refs: ["chr_alpha"],
          claim_refs: ["clm_alpha"],
        }),
        createQuestion({
          question_ref: "qst_beta",
          declared_question_text: "A second declared question",
          source_refs: ["src_alpha"],
          chronology_entry_refs: ["chr_alpha"],
          claim_refs: ["clm_alpha", "clm_beta"],
          gap_refs: ["gap_alpha"],
        }),
      ],
    }),
  );

  assert.deepEqual(emptyResult, expectedResult());
  assert.deepEqual(populatedResult, expectedResult());
  assert.equal(matchesResultContract(emptyResult), true);
  assert.equal(matchesResultContract(populatedResult), true);
});

test("null-prototype root and question row remain valid plain objects", () => {
  const root = Object.assign(Object.create(null), createPacket());
  const question = Object.assign(Object.create(null), createQuestion());
  root.questions = [question];

  assert.deepEqual(
    validateHumanReviewQuestions(root),
    expectedResult(),
  );
});

test("root type gate and descriptor snapshot fail closed", () => {
  const customPrototype = Object.create({ inherited: true });
  Object.assign(customPrototype, createPacket());
  const descriptorFailure = new Proxy(createPacket(), {
    ownKeys() {
      throw new Error("must fail closed");
    },
  });

  for (const candidate of [
    null,
    undefined,
    false,
    1,
    "packet",
    [],
    new Date(0),
    () => {},
    customPrototype,
    descriptorFailure,
  ]) {
    assert.deepEqual(
      validateHumanReviewQuestions(candidate),
      expectedResult([{ code: "invalid_field_type", path: "$" }]),
    );
  }
});

test("root errors follow missing unknown type and value phase order", () => {
  const candidate = {
    contract_id: "wrong",
    packet_ref: 7,
    questions: "not-an-array",
    hidden_unknown: "must-not-echo",
  };

  assert.deepEqual(
    validateHumanReviewQuestions(candidate),
    expectedResult([
      { code: "required_field_missing", path: "$.contract_version" },
      { code: "unexpected_field", path: "$" },
      { code: "invalid_field_type", path: "$.packet_ref" },
      { code: "invalid_field_type", path: "$.questions" },
      { code: "invalid_field_value", path: "$.contract_id" },
    ]),
  );
});

test("root identity version and packet reference values fail canonically", () => {
  assert.deepEqual(
    validateHumanReviewQuestions(
      createPacket({
        contract_id: "wrong",
        contract_version: "v1",
        packet_ref: "PKT_NOT_ALLOWED",
      }),
    ),
    expectedResult([
      { code: "invalid_field_value", path: "$.contract_id" },
      { code: "invalid_field_value", path: "$.contract_version" },
      { code: "invalid_field_value", path: "$.packet_ref" },
    ]),
  );
});

test("question errors follow row structure then reference item phase order", () => {
  const questions = [
    null,
    {},
    {
      question_ref: 9,
      declaration_origin: "MODEL_DECLARED",
      declared_question_text: "",
      source_refs: [9, "INVALID"],
      chronology_entry_refs: [9, "INVALID"],
      claim_refs: [9, "INVALID"],
      gap_refs: [9, "INVALID"],
      secret_field: "never-echo-this",
    },
  ];

  assert.deepEqual(
    validateHumanReviewQuestions(createPacket({ questions })),
    expectedResult([
      { code: "invalid_field_type", path: "$.questions[0]" },
      { code: "required_field_missing", path: "$.questions[1].question_ref" },
      {
        code: "required_field_missing",
        path: "$.questions[1].declaration_origin",
      },
      {
        code: "required_field_missing",
        path: "$.questions[1].declared_question_text",
      },
      { code: "required_field_missing", path: "$.questions[1].source_refs" },
      {
        code: "required_field_missing",
        path: "$.questions[1].chronology_entry_refs",
      },
      { code: "required_field_missing", path: "$.questions[1].claim_refs" },
      { code: "required_field_missing", path: "$.questions[1].gap_refs" },
      { code: "unexpected_field", path: "$.questions[2]" },
      { code: "invalid_field_type", path: "$.questions[2].question_ref" },
      {
        code: "invalid_field_value",
        path: "$.questions[2].declaration_origin",
      },
      {
        code: "invalid_field_value",
        path: "$.questions[2].declared_question_text",
      },
      { code: "invalid_field_type", path: "$.questions[2].source_refs[0]" },
      { code: "invalid_field_value", path: "$.questions[2].source_refs[1]" },
      {
        code: "invalid_field_type",
        path: "$.questions[2].chronology_entry_refs[0]",
      },
      {
        code: "invalid_field_value",
        path: "$.questions[2].chronology_entry_refs[1]",
      },
      { code: "invalid_field_type", path: "$.questions[2].claim_refs[0]" },
      { code: "invalid_field_value", path: "$.questions[2].claim_refs[1]" },
      { code: "invalid_field_type", path: "$.questions[2].gap_refs[0]" },
      { code: "invalid_field_value", path: "$.questions[2].gap_refs[1]" },
    ]),
  );
});

test("declared text is pre-trimmed and uses inclusive Unicode code-point bounds", () => {
  const emoji = "\u{1F600}";
  const boundaryText = emoji.repeat(1000);
  const candidate = createPacket({
    questions: [createQuestion({ declared_question_text: emoji })],
  });
  const before = JSON.stringify(candidate);

  assert.deepEqual(
    validateHumanReviewQuestions(candidate),
    expectedResult(),
  );
  assert.equal(JSON.stringify(candidate), before);
  assert.deepEqual(
    validateHumanReviewQuestions(
      createPacket({
        questions: [createQuestion({ declared_question_text: boundaryText })],
      }),
    ),
    expectedResult(),
  );

  for (const declaredQuestionText of [
    "",
    "   ",
    ` ${emoji}`,
    `${emoji} `,
    `${boundaryText}${emoji}`,
  ]) {
    assert.deepEqual(
      validateHumanReviewQuestions(
        createPacket({
          questions: [
            createQuestion({ declared_question_text: declaredQuestionText }),
          ],
        }),
      ),
      expectedResult([
        {
          code: "invalid_field_value",
          path: "$.questions[0].declared_question_text",
        },
      ]),
    );
  }
});

test("four empty reference arrays require one total question reference", () => {
  assert.deepEqual(
    validateHumanReviewQuestions(
      createPacket({
        questions: [
          createQuestion({
            source_refs: [],
            chronology_entry_refs: [],
            claim_refs: [],
            gap_refs: [],
          }),
        ],
      }),
    ),
    expectedResult([
      { code: "question_reference_required", path: "$.questions[0]" },
    ]),
  );

  const questions = [
    createQuestion({ source_refs: ["src_only"] }),
    createQuestion({
      question_ref: "qst_chronology",
      source_refs: [],
      chronology_entry_refs: ["chr_only"],
    }),
    createQuestion({
      question_ref: "qst_claim",
      source_refs: [],
      claim_refs: ["clm_only"],
    }),
    createQuestion({
      question_ref: "qst_gap",
      source_refs: [],
      gap_refs: ["gap_only"],
    }),
  ];

  assert.deepEqual(
    validateHumanReviewQuestions(createPacket({ questions })),
    expectedResult(),
  );
});

test("reference arrays validate items by field then index", () => {
  assert.deepEqual(
    validateHumanReviewQuestions(
      createPacket({
        questions: [
          createQuestion({
            source_refs: [8, "INVALID", "src_valid"],
            chronology_entry_refs: [8, "INVALID", "chr_valid"],
            claim_refs: [8, "INVALID", "clm_valid"],
            gap_refs: [8, "INVALID", "gap_valid"],
          }),
        ],
      }),
    ),
    expectedResult([
      { code: "invalid_field_type", path: "$.questions[0].source_refs[0]" },
      { code: "invalid_field_value", path: "$.questions[0].source_refs[1]" },
      {
        code: "invalid_field_type",
        path: "$.questions[0].chronology_entry_refs[0]",
      },
      {
        code: "invalid_field_value",
        path: "$.questions[0].chronology_entry_refs[1]",
      },
      { code: "invalid_field_type", path: "$.questions[0].claim_refs[0]" },
      { code: "invalid_field_value", path: "$.questions[0].claim_refs[1]" },
      { code: "invalid_field_type", path: "$.questions[0].gap_refs[0]" },
      { code: "invalid_field_value", path: "$.questions[0].gap_refs[1]" },
    ]),
  );
});

test("duplicates follow all structure and item checks in canonical phases", () => {
  const questions = [
    createQuestion({
      question_ref: "qst_repeat",
      source_refs: ["src_repeat", "src_repeat"],
      chronology_entry_refs: ["chr_repeat", "chr_repeat"],
      claim_refs: ["clm_repeat", "clm_repeat"],
      gap_refs: ["gap_repeat", "gap_repeat"],
    }),
    createQuestion({
      question_ref: "qst_repeat",
      declared_question_text: "",
      source_refs: ["src_second", "src_second"],
      chronology_entry_refs: ["chr_second", "chr_second"],
      claim_refs: ["clm_second", "clm_second"],
      gap_refs: ["gap_second", "gap_second"],
    }),
    createQuestion({
      question_ref: "qst_repeat",
      declaration_origin: "OTHER",
      source_refs: ["src_repeat"],
      chronology_entry_refs: ["chr_repeat"],
      claim_refs: ["clm_repeat"],
      gap_refs: ["gap_repeat"],
    }),
  ];

  assert.deepEqual(
    validateHumanReviewQuestions(createPacket({ questions })),
    expectedResult([
      {
        code: "invalid_field_value",
        path: "$.questions[1].declared_question_text",
      },
      {
        code: "invalid_field_value",
        path: "$.questions[2].declaration_origin",
      },
      { code: "duplicate_question_ref", path: "$.questions[1].question_ref" },
      { code: "duplicate_question_ref", path: "$.questions[2].question_ref" },
      {
        code: "duplicate_source_ref",
        path: "$.questions[0].source_refs[1]",
      },
      {
        code: "duplicate_chronology_entry_ref",
        path: "$.questions[0].chronology_entry_refs[1]",
      },
      {
        code: "duplicate_claim_ref",
        path: "$.questions[0].claim_refs[1]",
      },
      {
        code: "duplicate_gap_ref",
        path: "$.questions[0].gap_refs[1]",
      },
      {
        code: "duplicate_source_ref",
        path: "$.questions[1].source_refs[1]",
      },
      {
        code: "duplicate_chronology_entry_ref",
        path: "$.questions[1].chronology_entry_refs[1]",
      },
      {
        code: "duplicate_claim_ref",
        path: "$.questions[1].claim_refs[1]",
      },
      {
        code: "duplicate_gap_ref",
        path: "$.questions[1].gap_refs[1]",
      },
    ]),
  );
});

test("invalid references do not participate and valid reuse remains local", () => {
  const questions = [
    createQuestion({
      question_ref: "INVALID",
      source_refs: ["INVALID", "INVALID"],
      chronology_entry_refs: ["INVALID", "INVALID"],
      claim_refs: ["INVALID", "INVALID"],
      gap_refs: ["INVALID", "INVALID"],
    }),
    createQuestion({
      question_ref: "INVALID",
      source_refs: ["src_shared"],
      chronology_entry_refs: ["chr_shared"],
      claim_refs: ["clm_shared"],
      gap_refs: ["gap_shared"],
    }),
    createQuestion({
      question_ref: "qst_valid",
      source_refs: ["src_valid", "src_valid"],
      chronology_entry_refs: ["chr_valid", "chr_valid"],
      claim_refs: ["clm_valid", "clm_valid"],
      gap_refs: ["gap_valid", "gap_valid"],
    }),
    createQuestion({
      question_ref: "qst_second",
      source_refs: ["src_shared", "src_valid"],
      chronology_entry_refs: ["chr_shared", "chr_valid"],
      claim_refs: ["clm_shared", "clm_valid"],
      gap_refs: ["gap_shared", "gap_valid"],
    }),
  ];

  assert.deepEqual(
    validateHumanReviewQuestions(createPacket({ questions })),
    expectedResult([
      { code: "invalid_field_value", path: "$.questions[0].question_ref" },
      { code: "invalid_field_value", path: "$.questions[1].question_ref" },
      { code: "invalid_field_value", path: "$.questions[0].source_refs[0]" },
      { code: "invalid_field_value", path: "$.questions[0].source_refs[1]" },
      {
        code: "invalid_field_value",
        path: "$.questions[0].chronology_entry_refs[0]",
      },
      {
        code: "invalid_field_value",
        path: "$.questions[0].chronology_entry_refs[1]",
      },
      { code: "invalid_field_value", path: "$.questions[0].claim_refs[0]" },
      { code: "invalid_field_value", path: "$.questions[0].claim_refs[1]" },
      { code: "invalid_field_value", path: "$.questions[0].gap_refs[0]" },
      { code: "invalid_field_value", path: "$.questions[0].gap_refs[1]" },
      {
        code: "duplicate_source_ref",
        path: "$.questions[2].source_refs[1]",
      },
      {
        code: "duplicate_chronology_entry_ref",
        path: "$.questions[2].chronology_entry_refs[1]",
      },
      {
        code: "duplicate_claim_ref",
        path: "$.questions[2].claim_refs[1]",
      },
      {
        code: "duplicate_gap_ref",
        path: "$.questions[2].gap_refs[1]",
      },
    ]),
  );
});

test("unknown string symbol and non-enumerable keys aggregate without echo", () => {
  const root = createPacket();
  const question = createQuestion();
  const rootSymbol = Symbol("root-secret-symbol");
  const gapSymbol = Symbol("question-secret-symbol");

  root.root_secret = "root-secret-value";
  root[rootSymbol] = "symbol-secret-value";
  Object.defineProperty(root, "root_hidden", {
    value: "hidden-secret-value",
    enumerable: false,
  });
  question.qst_secret = "question-secret-value";
  question[gapSymbol] = "question-symbol-secret-value";
  Object.defineProperty(question, "qst_hidden", {
    value: "question-hidden-secret-value",
    enumerable: false,
  });
  root.questions = [question];

  const result = validateHumanReviewQuestions(root);
  const serialized = JSON.stringify(result);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "unexpected_field", path: "$" },
      { code: "unexpected_field", path: "$.questions[0]" },
    ]),
  );
  for (const secret of [
    "root_secret",
    "root-secret-value",
    "root_hidden",
    "qst_secret",
    "question-secret-value",
    "qst_hidden",
  ]) {
    assert.equal(serialized.includes(secret), false, secret);
  }
});

test("root row array-index and reference-item accessors are never invoked", () => {
  let rootGetterCalls = 0;
  let questionGetterCalls = 0;
  let questionSetterCalls = 0;
  let questionIndexGetterCalls = 0;
  let sourceIndexGetterCalls = 0;
  let chronologyIndexGetterCalls = 0;
  let claimIndexGetterCalls = 0;
  let gapIndexGetterCalls = 0;
  const root = createPacket();
  const firstQuestion = createQuestion();
  const thirdQuestion = createQuestion({ question_ref: "qst_third" });
  const sourceReferences = [];
  const chronologyReferences = [];
  const claimReferences = [];
  const gapReferences = [];

  Object.defineProperty(root, "contract_id", {
    get() {
      rootGetterCalls += 1;
      return "human_review.review_questions";
    },
    enumerable: true,
  });
  Object.defineProperty(firstQuestion, "question_ref", {
    get() {
      questionGetterCalls += 1;
      return "qst_first";
    },
    enumerable: true,
  });
  Object.defineProperty(firstQuestion, "declared_question_text", {
    set(_value) {
      questionSetterCalls += 1;
    },
    enumerable: true,
  });
  sourceReferences.length = 1;
  Object.defineProperty(sourceReferences, "0", {
    get() {
      sourceIndexGetterCalls += 1;
      return "src_third";
    },
    enumerable: true,
  });
  chronologyReferences.length = 1;
  Object.defineProperty(chronologyReferences, "0", {
    get() {
      chronologyIndexGetterCalls += 1;
      return "chr_third";
    },
    enumerable: true,
  });
  claimReferences.length = 1;
  Object.defineProperty(claimReferences, "0", {
    get() {
      claimIndexGetterCalls += 1;
      return "clm_third";
    },
    enumerable: true,
  });
  gapReferences.length = 1;
  Object.defineProperty(gapReferences, "0", {
    get() {
      gapIndexGetterCalls += 1;
      return "gap_third";
    },
    enumerable: true,
  });
  thirdQuestion.source_refs = sourceReferences;
  thirdQuestion.chronology_entry_refs = chronologyReferences;
  thirdQuestion.claim_refs = claimReferences;
  thirdQuestion.gap_refs = gapReferences;

  const questions = [];
  questions.length = 3;
  questions[0] = firstQuestion;
  Object.defineProperty(questions, "1", {
    get() {
      questionIndexGetterCalls += 1;
      return createQuestion({ question_ref: "qst_second" });
    },
    enumerable: true,
  });
  questions[2] = thirdQuestion;
  root.questions = questions;

  assert.deepEqual(
    validateHumanReviewQuestions(root),
    expectedResult([
      { code: "invalid_field_type", path: "$.contract_id" },
      { code: "invalid_field_type", path: "$.questions[0].question_ref" },
      {
        code: "invalid_field_type",
        path: "$.questions[0].declared_question_text",
      },
      { code: "invalid_field_type", path: "$.questions[1]" },
      { code: "invalid_field_type", path: "$.questions[2].source_refs[0]" },
      {
        code: "invalid_field_type",
        path: "$.questions[2].chronology_entry_refs[0]",
      },
      { code: "invalid_field_type", path: "$.questions[2].claim_refs[0]" },
      { code: "invalid_field_type", path: "$.questions[2].gap_refs[0]" },
    ]),
  );
  assert.equal(rootGetterCalls, 0);
  assert.equal(questionGetterCalls, 0);
  assert.equal(questionSetterCalls, 0);
  assert.equal(questionIndexGetterCalls, 0);
  assert.equal(sourceIndexGetterCalls, 0);
  assert.equal(chronologyIndexGetterCalls, 0);
  assert.equal(claimIndexGetterCalls, 0);
  assert.equal(gapIndexGetterCalls, 0);
});

test("row and reference descriptor failures remain bounded", () => {
  const rowDescriptorFailure = new Proxy(createQuestion(), {
    ownKeys() {
      throw new Error("row snapshot denied");
    },
  });
  const referenceDescriptorFailure = new Proxy([], {
    ownKeys() {
      throw new Error("reference snapshot denied");
    },
  });

  assert.deepEqual(
    validateHumanReviewQuestions(
      createPacket({
        questions: [
          rowDescriptorFailure,
          createQuestion({
            question_ref: "qst_second",
            source_refs: referenceDescriptorFailure,
          }),
        ],
      }),
    ),
    expectedResult([
      { code: "invalid_field_type", path: "$.questions[0]" },
      { code: "invalid_field_type", path: "$.questions[1].source_refs" },
    ]),
  );
});

test("sparse positions fail by index while extra array properties are ignored", () => {
  const sourceReferences = new Array(2);
  sourceReferences[1] = "src_second";
  sourceReferences.array_secret = "source-array-secret";
  const chronologyReferences = new Array(2);
  chronologyReferences[1] = "chr_second";
  chronologyReferences.array_secret = "chronology-array-secret";
  const claimReferences = new Array(2);
  claimReferences[1] = "clm_second";
  claimReferences.array_secret = "claim-array-secret";
  const gapReferences = new Array(2);
  gapReferences[1] = "gap_second";
  gapReferences.array_secret = "gap-array-secret";
  const questions = new Array(2);
  questions[1] = createQuestion({
    source_refs: sourceReferences,
    chronology_entry_refs: chronologyReferences,
    claim_refs: claimReferences,
    gap_refs: gapReferences,
  });
  questions.array_secret = "question-array-secret";

  const result = validateHumanReviewQuestions(
    createPacket({ questions }),
  );
  const serialized = JSON.stringify(result);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "invalid_field_type", path: "$.questions[0]" },
      { code: "invalid_field_type", path: "$.questions[1].source_refs[0]" },
      {
        code: "invalid_field_type",
        path: "$.questions[1].chronology_entry_refs[0]",
      },
      { code: "invalid_field_type", path: "$.questions[1].claim_refs[0]" },
      { code: "invalid_field_type", path: "$.questions[1].gap_refs[0]" },
    ]),
  );
  for (const secret of [
    "array_secret",
    "source-array-secret",
    "chronology-array-secret",
    "claim-array-secret",
    "gap-array-secret",
    "question-array-secret",
  ]) {
    assert.equal(serialized.includes(secret), false, secret);
  }
});

test("canonical non-enumerable data properties remain valid", () => {
  const question = {};
  for (const [field, value] of Object.entries(createQuestion())) {
    Object.defineProperty(question, field, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  const root = {};
  for (const [field, value] of Object.entries(
    createPacket({ questions: [question] }),
  )) {
    Object.defineProperty(root, field, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  assert.deepEqual(
    validateHumanReviewQuestions(root),
    expectedResult(),
  );
});

test("candidate insertion order never changes deterministic error order", () => {
  const first = {
    hidden: "secret",
    questions: 4,
    packet_ref: 3,
  };
  const second = {
    packet_ref: 3,
    hidden: "secret",
    questions: 4,
  };

  assert.deepEqual(
    validateHumanReviewQuestions(first),
    validateHumanReviewQuestions(second),
  );
});

test("cyclic candidates fail structurally without recursion or mutation", () => {
  const candidate = createPacket();
  candidate.questions = [candidate];
  const originalQuestions = candidate.questions;

  assert.deepEqual(
    validateHumanReviewQuestions(candidate),
    expectedResult([
      { code: "required_field_missing", path: "$.questions[0].question_ref" },
      {
        code: "required_field_missing",
        path: "$.questions[0].declaration_origin",
      },
      {
        code: "required_field_missing",
        path: "$.questions[0].declared_question_text",
      },
      { code: "required_field_missing", path: "$.questions[0].source_refs" },
      {
        code: "required_field_missing",
        path: "$.questions[0].chronology_entry_refs",
      },
      { code: "required_field_missing", path: "$.questions[0].claim_refs" },
      { code: "required_field_missing", path: "$.questions[0].gap_refs" },
      { code: "unexpected_field", path: "$.questions[0]" },
    ]),
  );
  assert.strictEqual(candidate.questions, originalQuestions);
  assert.strictEqual(candidate.questions[0], candidate);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.questions), false);
});

test("normal candidates arrays rows and reference arrays remain unmodified", () => {
  const candidate = createPacket({
    questions: [
      createQuestion(),
      createQuestion({
        question_ref: "qst_second",
        source_refs: ["src_second", "src_third"],
        chronology_entry_refs: ["chr_second", "chr_third"],
        claim_refs: ["clm_second", "clm_third"],
        gap_refs: ["gap_second", "gap_third"],
      }),
    ],
  });
  const before = JSON.stringify(candidate);

  validateHumanReviewQuestions(candidate);

  assert.equal(JSON.stringify(candidate), before);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.questions), false);
  assert.equal(Object.isFrozen(candidate.questions[0]), false);
  assert.equal(Object.isFrozen(candidate.questions[1].source_refs), false);
  assert.equal(
    Object.isFrozen(candidate.questions[1].chronology_entry_refs),
    false,
  );
  assert.equal(Object.isFrozen(candidate.questions[1].claim_refs), false);
  assert.equal(Object.isFrozen(candidate.questions[1].gap_refs), false);
});

test("success and failure results are recursively immutable", () => {
  const success = validateHumanReviewQuestions(createPacket());
  const failure = validateHumanReviewQuestions(null);

  for (const result of [success, failure]) {
    assert.equal(Object.isFrozen(result), true);
    assert.equal(Object.isFrozen(result.errors), true);
    assert.equal(result.errors.every(Object.isFrozen), true);
    assert.throws(() => {
      result.valid = !result.valid;
    }, TypeError);
    assert.throws(() => {
      result.errors.push({ code: "unexpected_field", path: "$" });
    }, TypeError);
  }
});

test("representative outputs conform to the tracked result contract", () => {
  const outputs = [
    validateHumanReviewQuestions(createPacket()),
    validateHumanReviewQuestions(null),
    validateHumanReviewQuestions(
      createPacket({
        questions: [
          createQuestion({ question_ref: "qst_repeat" }),
          createQuestion({ question_ref: "qst_repeat" }),
        ],
      }),
    ),
  ];

  assert.equal(outputs.every(matchesResultContract), true);
});

test("module source remains statically schema-bound and integration-free", () => {
  const source = fs.readFileSync(validatorPath, "utf8");

  assert.match(
    source,
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-questions\.json"\)/u,
  );
  assert.match(
    source,
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-questions-validator-result\.json"\)/u,
  );
  for (const forbidden of [
    /require\(["'](?:node:)?fs/u,
    /process\.env/u,
    /\bfetch\s*\(/u,
    /\bhttps?\b/u,
    /console\./u,
    /localStorage/u,
    /database/u,
    /provider/u,
    /telemetry/u,
    /human-review-source-register-validator/iu,
    /human-review-chronology-validator/iu,
    /human-review-asserted-claim-matrix-validator/iu,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});

test("package index remains unchanged and scope boundaries stay anchored", () => {
  const packageIndex = fs.readFileSync(packageIndexPath, "utf8");
  const scaffoldText = fs.readFileSync(scaffoldPath, "utf8");
  const transitionText = fs.readFileSync(transitionPath, "utf8");

  assert.equal((packageIndex.match(/\n/gu) ?? []).length, 13165);
  assert.equal(
    packageIndex.includes(
      "human-review-questions-validator.js",
    ),
    false,
  );
  assert.equal(
    packageIndex.includes("validateHumanReviewQuestions"),
    false,
  );
  assert.match(
    scaffoldText,
    /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u,
  );
  assert.match(
    scaffoldText,
    /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    transitionText,
    /RETAINED_CROSS_REFERENCE_CHECKPOINT_ABSENCE_COUNT:\n2/u,
  );
});
