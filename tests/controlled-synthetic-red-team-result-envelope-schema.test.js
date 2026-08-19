const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "controlled-synthetic-red-team-result-envelope.json",
);
const taxonomyPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);

const expectedFields = [
  "contractVersion",
  "contractKind",
  "caseId",
  "outputType",
  "actionClass",
  "escalationTarget",
  "safeNextAction",
  "syntheticCorpusPosture",
  "realEvidencePosture",
  "humanProfessionalReviewRequired",
];

const branchFields = [
  "caseId",
  "outputType",
  "actionClass",
  "escalationTarget",
  "safeNextAction",
];

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, `expected ${filePath} to exist`);
  return fs.readFileSync(filePath, "utf8");
}

function canonicalRows(text) {
  return text
    .split("\n")
    .filter((line) => /^\| [A-Z]+-\d{3} \|/.test(line))
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.replaceAll("`", "").trim()),
    );
}

function schemaRows(schema) {
  return schema.oneOf.map((branch) =>
    branchFields.map((field) => branch.properties[field].const),
  );
}

function createCandidate(row, overrides = {}) {
  const [caseId, outputType, actionClass, escalationTarget, safeNextAction] = row;
  return {
    contractVersion: "v1",
    contractKind: "CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE",
    caseId,
    outputType,
    actionClass,
    escalationTarget,
    safeNextAction,
    syntheticCorpusPosture: "SYNTHETIC_CONTROL_CORPUS_ONLY",
    realEvidencePosture: "NO_REAL_EVIDENCE",
    humanProfessionalReviewRequired: true,
    ...overrides,
  };
}

function matchesDefinition(value, definition) {
  if (definition.type === "string" && typeof value !== "string") return false;
  if (definition.type === "boolean" && typeof value !== "boolean") return false;
  if (Object.hasOwn(definition, "const") && value !== definition.const) return false;
  return true;
}

function validateAgainstSchemaContract(schema, candidate) {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return false;

  const actualKeys = Object.keys(candidate);
  if (
    schema.additionalProperties === false &&
    actualKeys.some((key) => !Object.hasOwn(schema.properties, key))
  ) {
    return false;
  }

  if (schema.required.some((field) => !Object.hasOwn(candidate, field))) return false;

  for (const [field, definition] of Object.entries(schema.properties)) {
    if (!matchesDefinition(candidate[field], definition)) return false;
  }

  const matchingBranches = schema.oneOf.filter((branch) =>
    Object.entries(branch.properties).every(([field, definition]) =>
      matchesDefinition(candidate[field], definition),
    ),
  );

  return matchingBranches.length === 1;
}

test("schema file exists with the exact scoped identity", () => {
  const schemaText = readRequired(schemaPath);
  const schema = JSON.parse(schemaText);

  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/controlled-synthetic-red-team-result-envelope.json",
  );
  assert.equal(schema.title, "Controlled Synthetic Red-Team Result Envelope Contract");
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
});

test("root required and property declarations contain exactly ten fields in order", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.required, expectedFields);
  assert.deepEqual(Object.keys(schema.properties), expectedFields);
  assert.deepEqual(expectedFields.map((field) => schema.properties[field].type), [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "boolean",
  ]);
});

test("identity and posture constraints remain exact with boolean true", () => {
  const schema = require(schemaPath);

  assert.equal(schema.properties.contractVersion.const, "v1");
  assert.equal(
    schema.properties.contractKind.const,
    "CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE",
  );
  assert.equal(
    schema.properties.syntheticCorpusPosture.const,
    "SYNTHETIC_CONTROL_CORPUS_ONLY",
  );
  assert.equal(schema.properties.realEvidencePosture.const, "NO_REAL_EVIDENCE");
  assert.equal(schema.properties.humanProfessionalReviewRequired.const, true);
  assert.equal(typeof schema.properties.humanProfessionalReviewRequired.const, "boolean");
});

test("all 26 oneOf branches exactly mirror the canonical taxonomy rows", () => {
  const schema = require(schemaPath);
  const taxonomy = readRequired(taxonomyPath);
  const expectedRows = canonicalRows(taxonomy);

  assert.equal(schema.oneOf.length, 26);
  assert.deepEqual(schemaRows(schema), expectedRows);
  assert.equal(new Set(schemaRows(schema).map((row) => row[0])).size, 26);

  for (const branch of schema.oneOf) {
    assert.deepEqual(Object.keys(branch), ["properties"]);
    assert.deepEqual(Object.keys(branch.properties), branchFields);
    for (const field of branchFields) {
      assert.deepEqual(Object.keys(branch.properties[field]), ["const"]);
    }
  }
});

test("only PRODUCT-001 and PRODUCT-002 use the exact composite output scalar", () => {
  const schema = require(schemaPath);
  const composite = "NO_OVERCLAIM_WARNING + OWNER_DECISION_REQUEST";

  assert.deepEqual(
    schemaRows(schema)
      .filter((row) => row[1] === composite)
      .map((row) => row[0]),
    ["PRODUCT-001", "PRODUCT-002"],
  );
});

test("every canonical row satisfies the bounded schema contract proof", () => {
  const schema = require(schemaPath);
  const rows = canonicalRows(readRequired(taxonomyPath));

  for (const row of rows) {
    assert.equal(validateAgainstSchemaContract(schema, createCandidate(row)), true, row[0]);
  }
});

test("missing unknown fixed-value and unknown-case candidates remain outside the contract", () => {
  const schema = require(schemaPath);
  const row = canonicalRows(readRequired(taxonomyPath))[0];
  const valid = createCandidate(row);

  for (const field of expectedFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(validateAgainstSchemaContract(schema, missing), false, field);
  }

  assert.equal(validateAgainstSchemaContract(schema, { ...valid, extra: "blocked" }), false);
  assert.equal(validateAgainstSchemaContract(schema, { ...valid, contractVersion: "v2" }), false);
  assert.equal(validateAgainstSchemaContract(schema, { ...valid, contractKind: "OTHER" }), false);
  assert.equal(
    validateAgainstSchemaContract(schema, { ...valid, syntheticCorpusPosture: "OTHER" }),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(schema, { ...valid, realEvidencePosture: "OTHER" }),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(schema, { ...valid, humanProfessionalReviewRequired: "true" }),
    false,
  );
  assert.equal(validateAgainstSchemaContract(schema, { ...valid, caseId: "UNKNOWN-001" }), false);
});

test("cross-case mixed response fields never satisfy complete-row equality", () => {
  const schema = require(schemaPath);
  const rows = canonicalRows(readRequired(taxonomyPath));
  const first = createCandidate(rows[0]);

  for (const field of ["outputType", "actionClass", "escalationTarget", "safeNextAction"]) {
    const replacementRow = rows.find((row) => row[branchFields.indexOf(field)] !== first[field]);
    assert.ok(replacementRow, field);
    const mixed = { ...first, [field]: replacementRow[branchFields.indexOf(field)] };
    assert.equal(validateAgainstSchemaContract(schema, mixed), false, field);
  }
});

test("schema stays candidate-envelope-only and contains no validator or runtime contract", () => {
  const schema = require(schemaPath);
  const schemaText = readRequired(schemaPath);

  for (const field of ["valid", "version", "errors", "code", "path"]) {
    assert.equal(Object.hasOwn(schema.properties, field), false, field);
  }

  for (const fragment of [
    "INVALID_TYPE",
    "MISSING_FIELD",
    "UNKNOWN_FIELD",
    "INVALID_ENUM",
    "INVALID_BOOLEAN",
    "ROOT_TYPE_GATE",
    "VALIDATION_EXECUTION",
    "provider",
    "runtime",
    "persistence",
    "api",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
});

test("schema remains anchored to the tracked contract and scaffold scope", () => {
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);

  assert.match(contractText, /TRACKED_CONTRACT_ONLY_DOCUMENTATION_CONTRACT_DEFINED/);
  assert.match(scopeText, /TRACKED_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_DEFINED/);
  assert.match(scopeText, /SCHEMA_EXPORT_NOT_CREATED/);
  assert.match(scopeText, /VALIDATOR_RESULT_SCHEMA_NOT_CREATED/);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/);
});
