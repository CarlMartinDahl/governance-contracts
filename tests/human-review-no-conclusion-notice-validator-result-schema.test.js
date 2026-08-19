"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-no-conclusion-notice-validator-result.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_v1.md",
);
const readinessPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorHelperProofTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const crossReferenceProofTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

const resultFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const noticeRowPattern = "^\\$\\.notices\\[(0|[1-9][0-9]*)\\]$";
const noticeFieldPattern =
  "^\\$\\.notices\\[(0|[1-9][0-9]*)\\]\\.(notice_ref|declaration_origin|notice_code|notice_text|source_refs|chronology_entry_refs|claim_refs|gap_refs|question_refs)$";
const noticeValuePattern =
  "^\\$\\.notices\\[(0|[1-9][0-9]*)\\]\\.(notice_ref|declaration_origin|notice_code|notice_text)$";
const referenceItemPattern =
  "^\\$\\.notices\\[(0|[1-9][0-9]*)\\]\\.(source_refs|chronology_entry_refs|claim_refs|gap_refs|question_refs)\\[(0|[1-9][0-9]*)\\]$";
const duplicateNoticePattern =
  "^\\$\\.notices\\[(0|[1-9][0-9]*)\\]\\.notice_ref$";
const duplicateSourcePattern =
  "^\\$\\.notices\\[(0|[1-9][0-9]*)\\]\\.source_refs\\[(0|[1-9][0-9]*)\\]$";
const duplicateChronologyPattern =
  "^\\$\\.notices\\[(0|[1-9][0-9]*)\\]\\.chronology_entry_refs\\[(0|[1-9][0-9]*)\\]$";
const duplicateClaimPattern =
  "^\\$\\.notices\\[(0|[1-9][0-9]*)\\]\\.claim_refs\\[(0|[1-9][0-9]*)\\]$";
const duplicateGapPattern =
  "^\\$\\.notices\\[(0|[1-9][0-9]*)\\]\\.gap_refs\\[(0|[1-9][0-9]*)\\]$";
const duplicateQuestionPattern =
  "^\\$\\.notices\\[(0|[1-9][0-9]*)\\]\\.question_refs\\[(0|[1-9][0-9]*)\\]$";
const errorPartitions = [
  {
    code: "required_field_missing",
    paths: [
      {
        enum: [
          "$.contract_id",
          "$.contract_version",
          "$.packet_ref",
          "$.notices",
        ],
      },
      { pattern: noticeFieldPattern },
    ],
  },
  {
    code: "unexpected_field",
    paths: [{ const: "$" }, { pattern: noticeRowPattern }],
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
          "$.notices",
        ],
      },
      { pattern: noticeRowPattern },
      { pattern: noticeFieldPattern },
      { pattern: referenceItemPattern },
    ],
  },
  {
    code: "invalid_field_value",
    paths: [
      {
        enum: [
          "$.contract_id",
          "$.contract_version",
          "$.packet_ref",
          "$.notices",
        ],
      },
      { pattern: noticeValuePattern },
      { pattern: referenceItemPattern },
    ],
  },
  {
    code: "notice_reference_required",
    pattern: noticeRowPattern,
  },
  {
    code: "duplicate_notice_ref",
    pattern: duplicateNoticePattern,
  },
  {
    code: "duplicate_source_ref",
    pattern: duplicateSourcePattern,
  },
  {
    code: "duplicate_chronology_entry_ref",
    pattern: duplicateChronologyPattern,
  },
  {
    code: "duplicate_claim_ref",
    pattern: duplicateClaimPattern,
  },
  {
    code: "duplicate_gap_ref",
    pattern: duplicateGapPattern,
  },
  {
    code: "duplicate_question_ref",
    pattern: duplicateQuestionPattern,
  },
];
const retainedSiblingPaths = [
  "packages/schemas/src/human-review-no-conclusion-notice-validator.js",
  "tests/human-review-no-conclusion-notice-validator.test.js",
  "packages/governance/src/human-review-no-conclusion-notice-cross-reference-validation-boundary.js",
  "tests/human-review-no-conclusion-notice-cross-reference-validation-boundary.test.js",
];
const historicalValidatorHelperPaths = retainedSiblingPaths.slice(0, 2);
const retainedCrossReferencePaths = retainedSiblingPaths.slice(2);
const fence = String.fromCharCode(96);

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
        (field) => !Object.hasOwn(definition.properties ?? {}, field),
      )
    ) {
      return false;
    }
  }
  if (definition.properties && isObject(value)) {
    for (const [field, fieldDefinition] of Object.entries(definition.properties)) {
      if (
        Object.hasOwn(value, field) &&
        !matchesSchema(value[field], fieldDefinition)
      ) {
        return false;
      }
    }
  }
  if (definition.items && Array.isArray(value)) {
    if (value.some((item) => !matchesSchema(item, definition.items))) return false;
  }
  if (definition.uniqueItems && Array.isArray(value)) {
    const items = value.map((item) => JSON.stringify(canonicalize(item)));
    if (new Set(items).size !== items.length) return false;
  }
  if (definition.oneOf) {
    const matchingBranches = definition.oneOf.filter((branch) =>
      matchesSchema(value, branch),
    );
    if (matchingBranches.length !== 1) return false;
  }
  return true;
}

function createResult(overrides = {}) {
  return {
    valid: true,
    contractKind: "HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors: [],
    ...overrides,
  };
}

test("validator-result schema exists with exact identity and keyword order", () => {
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
    "https://governance-contracts.invalid/schemas/human-review-no-conclusion-notice-validator-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review No-Conclusion Notice Validator Result Contract",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
});

test("root fields types identity literals and closure are exact", () => {
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
    "HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_BOUNDARY",
  );
  assert.equal(schema.properties.version.const, "1.0.0");
  assert.equal(schema.properties.errors.uniqueItems, true);
});

test("root oneOf couples exactly one success or failure state", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.oneOf, [
    { properties: { valid: { const: true }, errors: { maxItems: 0 } } },
    { properties: { valid: { const: false }, errors: { minItems: 1 } } },
  ]);
  assert.equal(matchesSchema(createResult(), schema), true);
  assert.equal(
    matchesSchema(
      createResult({
        valid: false,
        errors: [{ code: "unexpected_field", path: "$" }],
      }),
      schema,
    ),
    true,
  );
});

test("inline error item is closed with exact field order and eleven branches", () => {
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
  assert.deepEqual(errorFields.map((field) => item.properties[field].type), [
    "string",
    "string",
  ]);
  assert.equal(item.oneOf.length, 11);
});

test("eleven code-to-path branches and all indexed patterns are exact", () => {
  const branches = require(schemaPath).properties.errors.items.oneOf;

  assert.deepEqual(
    branches.map((branch) => branch.properties.code.const),
    errorPartitions.map((partition) => partition.code),
  );
  for (const [index, branch] of branches.entries()) {
    assert.deepEqual(Object.keys(branch.properties), errorFields);
    if (errorPartitions[index].paths) {
      assert.deepEqual(branch.properties.path.oneOf, errorPartitions[index].paths);
    } else {
      assert.equal(branch.properties.path.pattern, errorPartitions[index].pattern);
    }
  }
  assert.equal(
    new Set([
      noticeRowPattern,
      noticeFieldPattern,
      noticeValuePattern,
      referenceItemPattern,
      duplicateNoticePattern,
      duplicateSourcePattern,
      duplicateChronologyPattern,
      duplicateClaimPattern,
      duplicateGapPattern,
      duplicateQuestionPattern,
    ]).size,
    10,
  );
});

test("representative error from every partition satisfies structural proof", () => {
  const schema = require(schemaPath);
  const representativeErrors = [
    { code: "required_field_missing", path: "$.notices[12].notice_text" },
    { code: "unexpected_field", path: "$.notices[0]" },
    { code: "invalid_field_type", path: "$.notices[9].source_refs[3]" },
    { code: "invalid_field_value", path: "$.notices[3].question_refs[4]" },
    { code: "notice_reference_required", path: "$.notices[5]" },
    { code: "duplicate_notice_ref", path: "$.notices[22].notice_ref" },
    { code: "duplicate_source_ref", path: "$.notices[22].source_refs[4]" },
    {
      code: "duplicate_chronology_entry_ref",
      path: "$.notices[22].chronology_entry_refs[5]",
    },
    { code: "duplicate_claim_ref", path: "$.notices[22].claim_refs[6]" },
    { code: "duplicate_gap_ref", path: "$.notices[22].gap_refs[7]" },
    { code: "duplicate_question_ref", path: "$.notices[22].question_refs[8]" },
  ];

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

test("missing unknown type identity and state violations fail closed", () => {
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

test("malformed paths cross-pairs extra fields and duplicate errors fail closed", () => {
  const schema = require(schemaPath);
  const duplicate = {
    code: "duplicate_source_ref",
    path: "$.notices[1].source_refs[2]",
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
    { code: "unexpected_field", path: "$.notices" },
    { code: "duplicate_notice_ref", path: "$.notices[1].source_refs[0]" },
    { code: "duplicate_source_ref", path: "$.notices[1].notice_ref" },
    {
      code: "duplicate_chronology_entry_ref",
      path: "$.notices[1].claim_refs[0]",
    },
    { code: "duplicate_claim_ref", path: "$.notices[1].gap_refs[0]" },
    { code: "duplicate_gap_ref", path: "$.notices[1].question_refs[0]" },
    { code: "duplicate_question_ref", path: "$.notices[1].claim_refs[0]" },
    { code: "notice_reference_required", path: "$.notices[1].notice_ref" },
    { code: "duplicate_notice_ref", path: "$.notices[01].notice_ref" },
    { code: "duplicate_source_ref", path: "$.notices[1].source_refs[02]" },
    { code: "invalid_field_value", path: "$.notices[1].source_refs" },
    { code: "required_field_missing", path: "$.notices[0]" },
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

test("schema remains structural-only with validator and cross-reference siblings closed", () => {
  const schemaText = readRequired(schemaPath);
  const transitionText = readRequired(transitionPath);
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionPath,
  );

  for (const fragment of [
    "\"message\"",
    "\"detail\"",
    "\"candidate\"",
    "\"payload\"",
    "\"content\"",
    "\"score\"",
    "\"finding\"",
    "\"approval\"",
    "\"readiness\"",
    "\"remediation\"",
    "\"$defs\"",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
  for (const retainedPath of retainedSiblingPaths) {
    assert.equal(
      transitionText.includes(
        fence +
          retainedPath +
          fence +
          " | " +
          fence +
          "RETAIN_LIVE_ABSENCE_ASSERTION" +
          fence,
      ),
      true,
      retainedPath,
    );
  }
  for (const helperPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes(fence + helperPath + fence),
      true,
      helperPath,
    );
  }
  for (const crossReferencePath of retainedCrossReferencePaths) {
    assert.equal(
      crossReferenceProofTransitionText.includes("`" + crossReferencePath + "`"),
      true,
      crossReferencePath,
    );
  }
  assert.match(
    crossReferenceProofTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n20/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n13/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("schema remains anchored to contract readiness scope and transition", () => {
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
  for (const marker of [
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(scopeText.includes(marker), true, marker);
  }
});
