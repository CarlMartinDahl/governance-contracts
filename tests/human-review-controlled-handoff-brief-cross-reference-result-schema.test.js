"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionText = fs.readFileSync(
  path.join(repoRoot, crossReferenceProofTransitionPath),
  "utf8",
);
const schemaRelativePath =
  "schemas/human-review-controlled-handoff-brief-cross-reference-result.json";
const schemaPath = path.join(repoRoot, schemaRelativePath);
const proofRelativePath =
  "tests/human-review-controlled-handoff-brief-cross-reference-result-schema.test.js";
const semanticsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md";
const proofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofRelativePath =
  "tests/human-review-controlled-handoff-brief-cross-reference-result-package-export.test.js";
const runtimeModuleRelativePath =
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js";
const runtimeProofRelativePath =
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js";
const resultFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const candidateInvalidPairs = [
  [
    "human_review_controlled_handoff_brief_invalid",
    "$.controlled_handoff_brief",
  ],
  ["source_register_invalid", "$.component_bindings.source_register.candidate"],
  [
    "review_chronology_invalid",
    "$.component_bindings.review_chronology.candidate",
  ],
  [
    "asserted_claim_matrix_invalid",
    "$.component_bindings.asserted_claim_matrix.candidate",
  ],
  [
    "declared_packet_review_gaps_invalid",
    "$.component_bindings.declared_packet_review_gaps.candidate",
  ],
  [
    "human_review_questions_invalid",
    "$.component_bindings.human_review_questions.candidate",
  ],
  [
    "human_review_no_conclusion_notice_invalid",
    "$.component_bindings.no_conclusion_notice.candidate",
  ],
];
const packetMismatchPaths = [
  "$.component_bindings.source_register.candidate.packet_ref",
  "$.component_bindings.review_chronology.candidate.packet_ref",
  "$.component_bindings.asserted_claim_matrix.candidate.packet_ref",
  "$.component_bindings.declared_packet_review_gaps.candidate.packet_ref",
  "$.component_bindings.human_review_questions.candidate.packet_ref",
  "$.component_bindings.no_conclusion_notice.candidate.packet_ref",
];
const componentMismatchPaths = [
  "$.component_bindings.source_register.component_ref",
  "$.component_bindings.review_chronology.component_ref",
  "$.component_bindings.asserted_claim_matrix.component_ref",
  "$.component_bindings.declared_packet_review_gaps.component_ref",
  "$.component_bindings.human_review_questions.component_ref",
  "$.component_bindings.no_conclusion_notice.component_ref",
];
const errorPairs = [
  ["invalid_input_shape", { const: "$" }],
  ...candidateInvalidPairs.map(([code, errorPath]) => [
    code,
    { const: errorPath },
  ]),
  ["packet_ref_mismatch", { enum: packetMismatchPaths }],
  ["component_ref_mismatch", { enum: componentMismatchPaths }],
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
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_BOUNDARY",
    version: "1.0.0",
    errors: [],
    ...overrides,
  };
}

test("controlled handoff cross-reference result schema has exact identity", () => {
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
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-brief-cross-reference-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Brief Cross-Reference Result Contract",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
});

test("root field order literals and success-failure coupling are exact", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.required, resultFields);
  assert.deepEqual(Object.keys(schema.properties), resultFields);
  assert.equal(schema.properties.valid.type, "boolean");
  assert.equal(
    schema.properties.contractKind.const,
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_BOUNDARY",
  );
  assert.equal(schema.properties.version.const, "1.0.0");
  assert.equal(schema.properties.errors.type, "array");
  assert.equal(schema.properties.errors.uniqueItems, true);
  assert.deepEqual(schema.oneOf, [
    { properties: { valid: { const: true }, errors: { maxItems: 0 } } },
    { properties: { valid: { const: false }, errors: { minItems: 1 } } },
  ]);
});

test("inline error object and ten code-to-path branches are exact", () => {
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
  assert.equal(item.oneOf.length, 10);
  for (const [index, [code, pathConstraint]] of errorPairs.entries()) {
    assert.deepEqual(item.oneOf[index], {
      properties: {
        code: { const: code },
        path: pathConstraint,
      },
    });
  }
});

test("minimal success and all twenty exact path alternatives satisfy schema", () => {
  const schema = require(schemaPath);
  const errors = [
    { code: "invalid_input_shape", path: "$" },
    ...candidateInvalidPairs.map(([code, errorPath]) => ({
      code,
      path: errorPath,
    })),
    ...packetMismatchPaths.map((errorPath) => ({
      code: "packet_ref_mismatch",
      path: errorPath,
    })),
    ...componentMismatchPaths.map((errorPath) => ({
      code: "component_ref_mismatch",
      path: errorPath,
    })),
  ];

  assert.equal(errors.length, 20);
  assert.equal(matchesSchema(createResult(), schema), true);
  assert.equal(
    matchesSchema(createResult({ valid: false, errors }), schema),
    true,
  );
});

test("identity state shape code path and uniqueness violations fail closed", () => {
  const schema = require(schemaPath);
  const failure = createResult({
    valid: false,
    errors: [{ code: "invalid_input_shape", path: "$" }],
  });

  for (const invalid of [
    createResult({ contractKind: "OTHER" }),
    createResult({ version: "2.0.0" }),
    createResult({ extra: true }),
    createResult({ valid: false, errors: [] }),
    createResult({ errors: [{ code: "invalid_input_shape", path: "$" }] }),
    createResult({
      valid: false,
      errors: [{ code: "unknown", path: "$" }],
    }),
    createResult({
      valid: false,
      errors: [{ code: "packet_ref_mismatch", path: "$.wrong" }],
    }),
    createResult({
      valid: false,
      errors: [
        { code: "invalid_input_shape", path: "$" },
        { code: "invalid_input_shape", path: "$" },
      ],
    }),
    createResult({
      valid: false,
      errors: [{ code: "invalid_input_shape", path: "$", value: "echo" }],
    }),
  ]) {
    assert.equal(matchesSchema(invalid, schema), false);
  }
  assert.equal(matchesSchema(failure, schema), true);
});

test("schema remains contract-only and anchored to tracked semantics", () => {
  const semanticsText = readRequired(path.join(repoRoot, semanticsRelativePath));
  const transitionText = readRequired(
    path.join(repoRoot, proofTransitionRelativePath),
  );
  const packageExportTransitionText = readRequired(
    path.join(repoRoot, packageExportProofTransitionRelativePath),
  );
  const packageGovernance = require("../packages/governance/src/index.js");

  for (const trackedPath of [schemaRelativePath, proofRelativePath]) {
    assert.equal(semanticsText.includes("`" + trackedPath + "`"), true);
    assert.equal(transitionText.includes("`" + trackedPath + "`"), true);
  }
  assert.equal(
    packageExportTransitionText.includes(
      "humanReviewControlledHandoffBriefCrossReferenceResult",
    ),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" + packageExportProofRelativePath + "`",
    ),
    true,
  );
  assert.equal(
    Object.hasOwn(
      packageGovernance,
      "validateHumanReviewControlledHandoffBriefCrossReference",
    ),
    false,
  );
  for (const absentPath of [
    runtimeModuleRelativePath,
    runtimeProofRelativePath,
  ]) {
    assert.equal(
      crossReferenceProofTransitionText.includes("\`" + absentPath + "\`"),
      true,
      absentPath,
    );
  }
  assert.match(semanticsText, /RESULT_SCHEMA_PACKAGE_EXPORT_NOT_CREATED/u);
  assert.match(semanticsText, /CROSS_REFERENCE_CHECKPOINT_NOT_CREATED/u);
  assert.match(
    transitionText,
    /FUTURE_RESULT_SCHEMA_IMPLEMENTATION_FILE_COUNT:\n2/u,
  );
});
