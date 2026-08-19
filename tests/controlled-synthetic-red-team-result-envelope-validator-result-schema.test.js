const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "controlled-synthetic-red-team-result-envelope-validator-result.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
);
const resultShapePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md",
);
const taxonomyPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);

const resultFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const stringFieldPaths = [
  "$.contractVersion",
  "$.contractKind",
  "$.caseId",
  "$.outputType",
  "$.actionClass",
  "$.escalationTarget",
  "$.safeNextAction",
  "$.syntheticCorpusPosture",
  "$.realEvidencePosture",
];
const requiredFieldPaths = [
  ...stringFieldPaths,
  "$.humanProfessionalReviewRequired",
];
const errorPartitions = [
  ["INVALID_TYPE", ["$", ...stringFieldPaths]],
  ["MISSING_FIELD", requiredFieldPaths],
  ["UNKNOWN_FIELD", ["$"]],
  ["INVALID_ENUM", stringFieldPaths],
  ["INVALID_BOOLEAN", ["$.humanProfessionalReviewRequired"]],
];

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, `expected ${filePath} to exist`);
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

function matchesDefinition(value, definition) {
  if (definition.type === "boolean" && typeof value !== "boolean") return false;
  if (definition.type === "string" && typeof value !== "string") return false;
  if (definition.type === "array" && !Array.isArray(value)) return false;
  if (definition.type === "object" && !isObject(value)) return false;
  if (Object.hasOwn(definition, "const") && value !== definition.const) return false;
  if (definition.enum && !definition.enum.includes(value)) return false;
  if (definition.maxItems !== undefined && value.length > definition.maxItems) return false;
  if (definition.minItems !== undefined && value.length < definition.minItems) return false;
  return true;
}

function matchesClosedObject(value, definition) {
  if (!matchesDefinition(value, definition)) return false;
  if (definition.required.some((field) => !Object.hasOwn(value, field))) return false;
  if (
    definition.additionalProperties === false &&
    Object.keys(value).some((field) => !Object.hasOwn(definition.properties, field))
  ) {
    return false;
  }
  return Object.entries(definition.properties).every(([field, fieldDefinition]) =>
    matchesDefinition(value[field], fieldDefinition),
  );
}

function validateAgainstSchemaContract(schema, candidate) {
  if (!matchesClosedObject(candidate, schema)) return false;

  const errorsDefinition = schema.properties.errors;
  const errors = candidate.errors;
  if (
    errorsDefinition.uniqueItems &&
    new Set(errors.map((error) => JSON.stringify(canonicalize(error)))).size !== errors.length
  ) {
    return false;
  }

  for (const error of errors) {
    if (!matchesClosedObject(error, errorsDefinition.items)) return false;
    const matchingBranches = errorsDefinition.items.oneOf.filter((branch) =>
      Object.entries(branch.properties).every(([field, definition]) =>
        matchesDefinition(error[field], definition),
      ),
    );
    if (matchingBranches.length !== 1) return false;
  }

  const matchingStates = schema.oneOf.filter((branch) =>
    Object.entries(branch.properties).every(([field, definition]) =>
      matchesDefinition(candidate[field], definition),
    ),
  );
  return matchingStates.length === 1;
}

function createResult(overrides = {}) {
  return {
    valid: true,
    contractKind: "CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_BOUNDARY",
    version: "v1",
    errors: [],
    ...overrides,
  };
}

test("validator-result schema exists with the exact scoped identity", () => {
  const schemaText = readRequired(schemaPath);
  const schema = JSON.parse(schemaText);

  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/controlled-synthetic-red-team-result-envelope-validator-result.json",
  );
  assert.equal(
    schema.title,
    "Controlled Synthetic Red-Team Result Envelope Validator Result Contract",
  );
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
    "CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_BOUNDARY",
  );
  assert.equal(schema.properties.version.const, "v1");
  assert.equal(schema.properties.errors.uniqueItems, true);
});

test("root oneOf contains only the exact success and failure state branches", () => {
  const schema = require(schemaPath);

  assert.equal(schema.oneOf.length, 2);
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

test("item oneOf contains the exact five complete code-to-path partitions", () => {
  const branches = require(schemaPath).properties.errors.items.oneOf;

  assert.equal(branches.length, 5);
  assert.deepEqual(
    branches.map((branch) => [
      branch.properties.code.const,
      branch.properties.path.enum ?? [branch.properties.path.const],
    ]),
    errorPartitions,
  );

  for (const branch of branches) {
    assert.deepEqual(Object.keys(branch), ["properties"]);
    assert.deepEqual(Object.keys(branch.properties), errorFields);
    assert.deepEqual(Object.keys(branch.properties.code), ["const"]);
    assert.equal(
      Object.keys(branch.properties.path).every((key) => key === "enum" || key === "const"),
      true,
    );
  }
});

test("minimal success and every representative failure partition satisfy the schema proof", () => {
  const schema = require(schemaPath);
  const representativeErrors = errorPartitions.map(([code, paths]) => ({
    code,
    path: paths[0],
  }));

  assert.equal(validateAgainstSchemaContract(schema, createResult()), true);
  for (const error of representativeErrors) {
    assert.equal(
      validateAgainstSchemaContract(schema, createResult({ valid: false, errors: [error] })),
      true,
      error.code,
    );
  }
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createResult({ valid: false, errors: representativeErrors }),
    ),
    true,
  );
});

test("missing unknown type and identity violations remain outside the schema contract", () => {
  const schema = require(schemaPath);
  const valid = createResult();

  for (const field of resultFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(validateAgainstSchemaContract(schema, missing), false, field);
  }

  assert.equal(validateAgainstSchemaContract(schema, null), false);
  assert.equal(validateAgainstSchemaContract(schema, []), false);
  assert.equal(validateAgainstSchemaContract(schema, { ...valid, extra: true }), false);
  assert.equal(validateAgainstSchemaContract(schema, { ...valid, valid: "true" }), false);
  assert.equal(validateAgainstSchemaContract(schema, { ...valid, errors: {} }), false);
  assert.equal(validateAgainstSchemaContract(schema, { ...valid, contractKind: "OTHER" }), false);
  assert.equal(validateAgainstSchemaContract(schema, { ...valid, version: "v2" }), false);
});

test("state coupling invalid error shapes and duplicate items fail closed", () => {
  const schema = require(schemaPath);
  const error = { code: "INVALID_TYPE", path: "$" };

  assert.equal(
    validateAgainstSchemaContract(schema, createResult({ valid: true, errors: [error] })),
    false,
  );
  assert.equal(validateAgainstSchemaContract(schema, createResult({ valid: false })), false);
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createResult({ valid: false, errors: [error, { path: "$", code: "INVALID_TYPE" }] }),
    ),
    false,
  );

  for (const invalidError of [
    { code: "UNKNOWN_CODE", path: "$" },
    { code: "INVALID_TYPE", path: "$.dynamic" },
    { code: "INVALID_BOOLEAN", path: "$.caseId" },
    { code: "UNKNOWN_FIELD", path: "$.caseId" },
    { code: "INVALID_TYPE", path: "$", message: "blocked" },
    { code: "INVALID_TYPE" },
    { path: "$" },
    { code: false, path: "$" },
    { code: "INVALID_TYPE", path: false },
  ]) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createResult({ valid: false, errors: [invalidError] }),
      ),
      false,
      JSON.stringify(invalidError),
    );
  }
});

test("schema stays structural-only and creates no validator behavior", () => {
  const schemaText = readRequired(schemaPath);

  for (const fragment of [
    '"message"',
    '"detail"',
    '"candidate"',
    '"payload"',
    '"provider"',
    '"model"',
    '"score"',
    '"finding"',
    '"conclusion"',
    '"approval"',
    '"readiness"',
    '"remediation"',
    '"$defs"',
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }

  assert.equal(schemaText.includes("validateControlledSyntheticRedTeam"), false);
});

test("schema remains anchored to tracked contract result taxonomy and scaffold boundaries", () => {
  const contractText = readRequired(contractPath);
  const resultShapeText = readRequired(resultShapePath);
  const taxonomyText = readRequired(taxonomyPath);
  const scopeText = readRequired(scopePath);

  assert.match(contractText, /TRACKED_CONTRACT_ONLY_DOCUMENTATION_CONTRACT_DEFINED/);
  assert.match(resultShapeText, /TRACKED_DOCS_ONLY_RTRE_P07_RESOLUTION/);
  assert.match(taxonomyText, /VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY/);
  assert.match(scopeText, /TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED/);
  assert.match(scopeText, /SCHEMA_EXPORT_NOT_CREATED/);
  assert.match(scopeText, /VALIDATOR_NOT_CREATED/);
  assert.match(scopeText, /VALIDATION_EXECUTION_NOT_CREATED/);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/);
});
