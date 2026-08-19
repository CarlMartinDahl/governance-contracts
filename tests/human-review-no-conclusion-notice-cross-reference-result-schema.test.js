"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaRelativePath =
  "schemas/human-review-no-conclusion-notice-cross-reference-result.json";
const schemaPath = path.join(repoRoot, schemaRelativePath);
const proofRelativePath =
  "tests/human-review-no-conclusion-notice-cross-reference-result-schema.test.js";
const proofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  proofTransitionRelativePath,
  packageExportProofTransitionPath,
];
const resultFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const packetMismatchPaths = [
  "$.source_register.packet_ref",
  "$.review_chronology.packet_ref",
  "$.asserted_claim_matrix.packet_ref",
  "$.declared_packet_review_gaps.packet_ref",
  "$.human_review_questions.packet_ref",
];
const sourceReferencePathPattern =
  "^\\$\\.human_review_no_conclusion_notice\\.notices\\[(0|[1-9][0-9]*)\\]\\.source_refs\\[(0|[1-9][0-9]*)\\]$";
const chronologyReferencePathPattern =
  "^\\$\\.human_review_no_conclusion_notice\\.notices\\[(0|[1-9][0-9]*)\\]\\.chronology_entry_refs\\[(0|[1-9][0-9]*)\\]$";
const claimReferencePathPattern =
  "^\\$\\.human_review_no_conclusion_notice\\.notices\\[(0|[1-9][0-9]*)\\]\\.claim_refs\\[(0|[1-9][0-9]*)\\]$";
const gapReferencePathPattern =
  "^\\$\\.human_review_no_conclusion_notice\\.notices\\[(0|[1-9][0-9]*)\\]\\.gap_refs\\[(0|[1-9][0-9]*)\\]$";
const questionReferencePathPattern =
  "^\\$\\.human_review_no_conclusion_notice\\.notices\\[(0|[1-9][0-9]*)\\]\\.question_refs\\[(0|[1-9][0-9]*)\\]$";
const errorPairs = [
  ["invalid_input_shape", { const: "$" }],
  [
    "human_review_no_conclusion_notice_invalid",
    { const: "$.human_review_no_conclusion_notice" },
  ],
  ["source_register_invalid", { const: "$.source_register" }],
  ["review_chronology_invalid", { const: "$.review_chronology" }],
  ["asserted_claim_matrix_invalid", { const: "$.asserted_claim_matrix" }],
  [
    "declared_packet_review_gaps_invalid",
    { const: "$.declared_packet_review_gaps" },
  ],
  ["human_review_questions_invalid", { const: "$.human_review_questions" }],
  ["packet_ref_mismatch", { enum: packetMismatchPaths }],
  ["source_ref_not_in_register", { pattern: sourceReferencePathPattern }],
  [
    "chronology_entry_ref_not_in_chronology",
    { pattern: chronologyReferencePathPattern },
  ],
  [
    "claim_ref_not_in_asserted_claim_matrix",
    { pattern: claimReferencePathPattern },
  ],
  [
    "gap_ref_not_in_declared_packet_review_gaps",
    { pattern: gapReferencePathPattern },
  ],
  [
    "question_ref_not_in_human_review_questions",
    { pattern: questionReferencePathPattern },
  ],
];

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, `expected ${filePath}`);
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
  if (definition.pattern && !new RegExp(definition.pattern, "u").test(value)) {
    return false;
  }
  if (definition.maxItems !== undefined && value.length > definition.maxItems) {
    return false;
  }
  if (definition.minItems !== undefined && value.length < definition.minItems) {
    return false;
  }
  if (definition.required) {
    if (!isObject(value)) return false;
    if (definition.required.some((field) => !Object.hasOwn(value, field))) {
      return false;
    }
  }
  if (definition.additionalProperties === false) {
    if (!isObject(value)) return false;
    if (
      Object.keys(value).some(
        (field) => !Object.hasOwn(definition.properties, field),
      )
    ) {
      return false;
    }
  }
  if (definition.properties && isObject(value)) {
    for (const [field, fieldDefinition] of Object.entries(
      definition.properties,
    )) {
      if (
        Object.hasOwn(value, field) &&
        !matchesSchema(value[field], fieldDefinition)
      ) {
        return false;
      }
    }
  }
  if (definition.items && Array.isArray(value)) {
    if (value.some((item) => !matchesSchema(item, definition.items))) {
      return false;
    }
  }
  if (definition.uniqueItems && Array.isArray(value)) {
    const items = value.map((item) => JSON.stringify(canonicalize(item)));
    if (new Set(items).size !== items.length) return false;
  }
  if (definition.oneOf) {
    if (
      definition.oneOf.filter((branch) => matchesSchema(value, branch))
        .length !== 1
    ) {
      return false;
    }
  }
  return true;
}

function createResult(overrides = {}) {
  return {
    valid: true,
    contractKind:
      "HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_BOUNDARY",
    version: "1.0.0",
    errors: [],
    ...overrides,
  };
}

test("No-Conclusion Notice cross-reference result schema has exact identity", () => {
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
    "https://governance-contracts.invalid/schemas/human-review-no-conclusion-notice-cross-reference-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review No-Conclusion Notice Cross-Reference Result Contract",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
});

test("root shape identity literals and two states are exact", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.required, resultFields);
  assert.deepEqual(Object.keys(schema.properties), resultFields);
  assert.equal(schema.properties.valid.type, "boolean");
  assert.equal(schema.properties.contractKind.type, "string");
  assert.equal(
    schema.properties.contractKind.const,
    "HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_BOUNDARY",
  );
  assert.equal(schema.properties.version.type, "string");
  assert.equal(schema.properties.version.const, "1.0.0");
  assert.equal(schema.properties.errors.type, "array");
  assert.equal(schema.properties.errors.uniqueItems, true);
  assert.deepEqual(schema.oneOf, [
    { properties: { valid: { const: true }, errors: { maxItems: 0 } } },
    { properties: { valid: { const: false }, errors: { minItems: 1 } } },
  ]);
});

test("inline error item and thirteen code-to-path branches are exact", () => {
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
  assert.equal(item.oneOf.length, 13);
  for (const [index, [code, pathConstraint]] of errorPairs.entries()) {
    assert.deepEqual(item.oneOf[index], {
      properties: {
        code: { const: code },
        path: pathConstraint,
      },
    });
  }
});

test("minimal success and all seventeen path alternatives satisfy schema", () => {
  const schema = require(schemaPath);
  const errors = [
    { code: "invalid_input_shape", path: "$" },
    {
      code: "human_review_no_conclusion_notice_invalid",
      path: "$.human_review_no_conclusion_notice",
    },
    { code: "source_register_invalid", path: "$.source_register" },
    { code: "review_chronology_invalid", path: "$.review_chronology" },
    { code: "asserted_claim_matrix_invalid", path: "$.asserted_claim_matrix" },
    {
      code: "declared_packet_review_gaps_invalid",
      path: "$.declared_packet_review_gaps",
    },
    { code: "human_review_questions_invalid", path: "$.human_review_questions" },
    ...packetMismatchPaths.map((packetPath) => ({
      code: "packet_ref_mismatch",
      path: packetPath,
    })),
    {
      code: "source_ref_not_in_register",
      path: "$.human_review_no_conclusion_notice.notices[12].source_refs[3]",
    },
    {
      code: "chronology_entry_ref_not_in_chronology",
      path:
        "$.human_review_no_conclusion_notice.notices[4].chronology_entry_refs[15]",
    },
    {
      code: "claim_ref_not_in_asserted_claim_matrix",
      path: "$.human_review_no_conclusion_notice.notices[7].claim_refs[2]",
    },
    {
      code: "gap_ref_not_in_declared_packet_review_gaps",
      path: "$.human_review_no_conclusion_notice.notices[9].gap_refs[6]",
    },
    {
      code: "question_ref_not_in_human_review_questions",
      path: "$.human_review_no_conclusion_notice.notices[2].question_refs[11]",
    },
  ];

  assert.equal(errors.length, 17);
  assert.equal(matchesSchema(createResult(), schema), true);
  for (const error of errors) {
    assert.equal(
      matchesSchema(createResult({ valid: false, errors: [error] }), schema),
      true,
      `${error.code}:${error.path}`,
    );
  }
  assert.equal(
    matchesSchema(createResult({ valid: false, errors }), schema),
    true,
  );
});

test("identity shape and state-coupling violations fail closed", () => {
  const schema = require(schemaPath);
  const valid = createResult();

  for (const field of resultFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(matchesSchema(missing, schema), false, field);
  }
  assert.equal(matchesSchema({ ...valid, extra: true }, schema), false);
  assert.equal(matchesSchema({ ...valid, valid: "true" }, schema), false);
  assert.equal(matchesSchema({ ...valid, contractKind: "OTHER" }, schema), false);
  assert.equal(matchesSchema({ ...valid, version: "2.0.0" }, schema), false);
  assert.equal(matchesSchema({ ...valid, errors: {} }, schema), false);
  assert.equal(matchesSchema(createResult({ valid: false }), schema), false);
  assert.equal(
    matchesSchema(
      createResult({ errors: [{ code: "invalid_input_shape", path: "$" }] }),
      schema,
    ),
    false,
  );
});

test("unknown mismatched malformed and duplicate errors fail closed", () => {
  const schema = require(schemaPath);
  const indexedPairs = [
    ["source_ref_not_in_register", "source_refs"],
    ["chronology_entry_ref_not_in_chronology", "chronology_entry_refs"],
    ["claim_ref_not_in_asserted_claim_matrix", "claim_refs"],
    ["gap_ref_not_in_declared_packet_review_gaps", "gap_refs"],
    ["question_ref_not_in_human_review_questions", "question_refs"],
  ];
  const invalidErrors = [
    { code: "unknown", path: "$" },
    { code: "invalid_input_shape", path: "$.human_review_no_conclusion_notice" },
    { code: "human_review_no_conclusion_notice_invalid", path: "$" },
    { code: "packet_ref_mismatch", path: "$" },
    {
      code: "packet_ref_mismatch",
      path: "$.human_review_no_conclusion_notice.packet_ref",
    },
    { path: "$" },
    { code: "invalid_input_shape" },
    { code: "invalid_input_shape", path: "$", message: "no" },
    ...indexedPairs.flatMap(([code, field]) => [
      {
        code,
        path: `$.human_review_no_conclusion_notice.notices[01].${field}[0]`,
      },
      {
        code,
        path: `$.human_review_no_conclusion_notice.notices[0].${field}[02]`,
      },
    ]),
    {
      code: "source_ref_not_in_register",
      path:
        "$.human_review_no_conclusion_notice.notices[0].chronology_entry_refs[0]",
    },
    {
      code: "chronology_entry_ref_not_in_chronology",
      path: "$.human_review_no_conclusion_notice.notices[0].claim_refs[0]",
    },
    {
      code: "claim_ref_not_in_asserted_claim_matrix",
      path: "$.human_review_no_conclusion_notice.notices[0].gap_refs[0]",
    },
    {
      code: "gap_ref_not_in_declared_packet_review_gaps",
      path: "$.human_review_no_conclusion_notice.notices[0].question_refs[0]",
    },
    {
      code: "question_ref_not_in_human_review_questions",
      path: "$.human_review_no_conclusion_notice.notices[0].source_refs[0]",
    },
  ];

  for (const error of invalidErrors) {
    assert.equal(
      matchesSchema(createResult({ valid: false, errors: [error] }), schema),
      false,
      JSON.stringify(error),
    );
  }
  const duplicate = { code: "invalid_input_shape", path: "$" };
  assert.equal(
    matchesSchema(
      createResult({ valid: false, errors: [duplicate, { ...duplicate }] }),
      schema,
    ),
    false,
  );
});

test("schema remains structural-only transition-anchored and source-bound", () => {
  for (const relativePath of controllingPaths) {
    readRequired(path.join(repoRoot, relativePath));
  }
  const schemaText = readRequired(schemaPath);
  for (const prohibited of [
    "$defs",
    "message",
    "detail",
    "candidate",
    "child_error",
    "rejected_key",
    "rejected_value",
    "packet_ref_value",
    "notice_ref_value",
    "source_ref_value",
    "chronology_entry_ref_value",
    "claim_ref_value",
    "gap_ref_value",
    "question_ref_value",
    "finding",
    "conclusion",
    "score",
    "severity",
    "remediation",
    "approval",
    "certification",
    "readiness",
  ]) {
    assert.equal(schemaText.includes(`\"${prohibited}\"`), false, prohibited);
  }

  const transitionText = readRequired(
    path.join(repoRoot, packageExportProofTransitionPath),
  );
  assert.equal(
    transitionText.includes(
      "| 5 | `tests/human-review-no-conclusion-notice-cross-reference-result-schema.test.js` | `REMOVE_PACKAGE_SYMBOL_CONSTANT_AND_ONE_PACKAGE_SYMBOL_LIVE_ABSENCE_ASSERTION_THEN_ANCHOR_TRANSITION` |",
    ),
    true,
  );
  for (const marker of [
    "`humanReviewNoConclusionNoticeCrossReferenceResult`",
    "PACKAGE_SCHEMA_EXPORT_SYMBOL_ASSERTION_TRANSITION_COUNT:\n4",
    "PACKAGE_SCHEMA_EXPORT_PROOF_PATH_ASSERTION_TRANSITION_COUNT:\n1",
    "PACKAGE_SCHEMA_EXPORT_TOTAL_LIVE_ABSENCE_TRANSITION_COUNT:\n5",
    "RETAINED_PACKAGE_SCHEMA_EXPORT_LIVE_ABSENCE_ASSERTION_COUNT:\n0",
    "CURRENT_PACKAGE_EXPORT_PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n5",
  ]) {
    assert.equal(transitionText.includes(marker), true, marker);
  }
});
