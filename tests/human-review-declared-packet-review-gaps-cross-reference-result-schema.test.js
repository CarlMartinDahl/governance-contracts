"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-declared-packet-review-gaps-cross-reference-result.json",
);
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
];
const resultFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const sourceReferencePathPattern =
  "^\\$\\.declared_packet_review_gaps\\.gaps\\[(0|[1-9][0-9]*)\\]\\.source_refs\\[(0|[1-9][0-9]*)\\]$";
const chronologyReferencePathPattern =
  "^\\$\\.declared_packet_review_gaps\\.gaps\\[(0|[1-9][0-9]*)\\]\\.chronology_entry_refs\\[(0|[1-9][0-9]*)\\]$";
const claimReferencePathPattern =
  "^\\$\\.declared_packet_review_gaps\\.gaps\\[(0|[1-9][0-9]*)\\]\\.claim_refs\\[(0|[1-9][0-9]*)\\]$";
const errorPairs = [
  ["invalid_input_shape", { const: "$" }],
  [
    "declared_packet_review_gaps_invalid",
    { const: "$.declared_packet_review_gaps" },
  ],
  ["source_register_invalid", { const: "$.source_register" }],
  ["review_chronology_invalid", { const: "$.review_chronology" }],
  ["asserted_claim_matrix_invalid", { const: "$.asserted_claim_matrix" }],
  [
    "packet_ref_mismatch",
    {
      enum: [
        "$.source_register.packet_ref",
        "$.review_chronology.packet_ref",
        "$.asserted_claim_matrix.packet_ref",
      ],
    },
  ],
  ["source_ref_not_in_register", { pattern: sourceReferencePathPattern }],
  [
    "chronology_entry_ref_not_in_chronology",
    { pattern: chronologyReferencePathPattern },
  ],
  [
    "claim_ref_not_in_asserted_claim_matrix",
    { pattern: claimReferencePathPattern },
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
      "HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_BOUNDARY",
    version: "1.0.0",
    errors: [],
    ...overrides,
  };
}

test("declared-gaps cross-reference result schema has the exact identity", () => {
  const schema = JSON.parse(readRequired(schemaPath));

  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-declared-packet-review-gaps-cross-reference-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review Declared Packet Review Gaps Cross-Reference Result Contract",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
});

test("root shape identity literals and two states are exact", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.required, resultFields);
  assert.deepEqual(Object.keys(schema.properties), resultFields);
  assert.equal(
    schema.properties.contractKind.const,
    "HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_BOUNDARY",
  );
  assert.equal(schema.properties.version.const, "1.0.0");
  assert.equal(schema.properties.errors.uniqueItems, true);
  assert.deepEqual(schema.oneOf, [
    { properties: { valid: { const: true }, errors: { maxItems: 0 } } },
    { properties: { valid: { const: false }, errors: { minItems: 1 } } },
  ]);
});

test("inline error item and nine code-to-path branches are exact", () => {
  const item = require(schemaPath).properties.errors.items;

  assert.deepEqual(Object.keys(item), [
    "type",
    "additionalProperties",
    "required",
    "properties",
    "oneOf",
  ]);
  assert.equal(item.additionalProperties, false);
  assert.deepEqual(item.required, errorFields);
  assert.deepEqual(Object.keys(item.properties), errorFields);
  assert.equal(item.oneOf.length, 9);
  for (const [index, [code, pathConstraint]] of errorPairs.entries()) {
    assert.deepEqual(item.oneOf[index], {
      properties: {
        code: { const: code },
        path: pathConstraint,
      },
    });
  }
});

test("minimal success and all eleven path alternatives satisfy the schema", () => {
  const schema = require(schemaPath);
  const errors = [
    { code: "invalid_input_shape", path: "$" },
    {
      code: "declared_packet_review_gaps_invalid",
      path: "$.declared_packet_review_gaps",
    },
    { code: "source_register_invalid", path: "$.source_register" },
    { code: "review_chronology_invalid", path: "$.review_chronology" },
    { code: "asserted_claim_matrix_invalid", path: "$.asserted_claim_matrix" },
    {
      code: "packet_ref_mismatch",
      path: "$.source_register.packet_ref",
    },
    {
      code: "packet_ref_mismatch",
      path: "$.review_chronology.packet_ref",
    },
    {
      code: "packet_ref_mismatch",
      path: "$.asserted_claim_matrix.packet_ref",
    },
    {
      code: "source_ref_not_in_register",
      path: "$.declared_packet_review_gaps.gaps[12].source_refs[3]",
    },
    {
      code: "chronology_entry_ref_not_in_chronology",
      path:
        "$.declared_packet_review_gaps.gaps[4].chronology_entry_refs[15]",
    },
    {
      code: "claim_ref_not_in_asserted_claim_matrix",
      path: "$.declared_packet_review_gaps.gaps[7].claim_refs[2]",
    },
  ];

  assert.equal(matchesSchema(createResult(), schema), true);
  for (const error of errors) {
    assert.equal(
      matchesSchema(createResult({ valid: false, errors: [error] }), schema),
      true,
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
  assert.equal(matchesSchema({ ...valid, contractKind: "OTHER" }, schema), false);
  assert.equal(matchesSchema({ ...valid, version: "2.0.0" }, schema), false);
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
  const invalidErrors = [
    { code: "unknown", path: "$" },
    { code: "invalid_input_shape", path: "$.declared_packet_review_gaps" },
    { code: "packet_ref_mismatch", path: "$" },
    {
      code: "packet_ref_mismatch",
      path: "$.declared_packet_review_gaps.packet_ref",
    },
    {
      code: "source_ref_not_in_register",
      path: "$.declared_packet_review_gaps.gaps[01].source_refs[0]",
    },
    {
      code: "source_ref_not_in_register",
      path: "$.declared_packet_review_gaps.gaps[0].source_refs[02]",
    },
    {
      code: "source_ref_not_in_register",
      path: "$.declared_packet_review_gaps.gaps[0].chronology_entry_refs[0]",
    },
    {
      code: "chronology_entry_ref_not_in_chronology",
      path: "$.declared_packet_review_gaps.gaps[0].source_refs[0]",
    },
    {
      code: "claim_ref_not_in_asserted_claim_matrix",
      path: "$.declared_packet_review_gaps.gaps[0].chronology_entry_refs[0]",
    },
    { code: "invalid_input_shape", path: "$", message: "no" },
  ];

  for (const error of invalidErrors) {
    assert.equal(
      matchesSchema(createResult({ valid: false, errors: [error] }), schema),
      false,
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

test("schema remains source-bound structural-only and runtime neutral", () => {
  for (const relativePath of controllingPaths) {
    readRequired(path.join(repoRoot, relativePath));
  }
  const schemaText = readRequired(schemaPath);
  for (const prohibited of [
    "message",
    "source_ref_value",
    "chronology_entry_ref_value",
    "claim_ref_value",
    "packet_ref_value",
    "finding",
    "conclusion",
    "severity",
    "approval",
    "readiness",
  ]) {
    assert.equal(schemaText.includes(`\"${prohibited}\"`), false, prohibited);
  }
});
