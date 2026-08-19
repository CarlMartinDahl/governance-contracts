"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(repoRoot, "schemas", "human-review-source-register.json");
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

const expectedRootFields = ["contract_id", "contract_version", "packet_ref", "sources"];
const expectedEntryFields = ["source_ref", "declared_source_type", "declared_label"];
const expectedSourceTypes = [
  "message_thread",
  "email",
  "document",
  "image",
  "audio",
  "video",
  "other_declared",
];

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, `expected ${filePath}`);
  return fs.readFileSync(filePath, "utf8");
}

function codePointLength(value) {
  return [...value].length;
}

function matchesDefinition(value, definition) {
  if (definition.type === "string" && typeof value !== "string") return false;
  if (Object.hasOwn(definition, "const") && value !== definition.const) return false;
  if (definition.pattern && !new RegExp(definition.pattern, "u").test(value)) return false;
  if (definition.enum && !definition.enum.includes(value)) return false;
  if (definition.minLength !== undefined && codePointLength(value) < definition.minLength) {
    return false;
  }
  if (definition.maxLength !== undefined && codePointLength(value) > definition.maxLength) {
    return false;
  }
  return true;
}

function hasExactObjectShape(value, definition) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const actualKeys = Object.keys(value);
  if (
    definition.additionalProperties === false &&
    actualKeys.some((key) => !Object.hasOwn(definition.properties, key))
  ) {
    return false;
  }
  return definition.required.every((field) => Object.hasOwn(value, field));
}

function validateAgainstSchemaContract(schema, candidate) {
  if (!hasExactObjectShape(candidate, schema)) return false;

  for (const field of ["contract_id", "contract_version", "packet_ref"]) {
    if (!matchesDefinition(candidate[field], schema.properties[field])) return false;
  }

  const sourcesDefinition = schema.properties.sources;
  if (!Array.isArray(candidate.sources)) return false;
  if (candidate.sources.length < sourcesDefinition.minItems) return false;

  const entryDefinition = schema.$defs.sourceEntry;
  for (const source of candidate.sources) {
    if (!hasExactObjectShape(source, entryDefinition)) return false;
    for (const field of expectedEntryFields) {
      if (!matchesDefinition(source[field], entryDefinition.properties[field])) return false;
    }
  }

  return true;
}

function createSource(overrides = {}) {
  return {
    source_ref: "src_message_001",
    declared_source_type: "message_thread",
    declared_label: "Declared message thread",
    ...overrides,
  };
}

function createRegister(overrides = {}) {
  return {
    contract_id: "human_review.source_register",
    contract_version: "1.0.0",
    packet_ref: "pkt_review_001",
    sources: [],
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
    "https://governance-contracts.invalid/schemas/human-review-source-register.json",
  );
  assert.equal(schema.title, "Human Review Source Register Contract Scaffold");
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
});

test("root required and property declarations contain exactly four fields in order", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.required, expectedRootFields);
  assert.deepEqual(Object.keys(schema.properties), expectedRootFields);
  assert.deepEqual(expectedRootFields.map((field) => schema.properties[field].type), [
    "string",
    "string",
    "string",
    "array",
  ]);
  assert.equal(schema.properties.contract_id.const, "human_review.source_register");
  assert.equal(schema.properties.contract_version.const, "1.0.0");
  assert.equal(schema.properties.packet_ref.pattern, "^pkt_[a-z0-9][a-z0-9_-]{0,59}$");
});

test("sources array has an explicit zero minimum and no invented maximum or uniqueness claim", () => {
  const schema = require(schemaPath);
  const sources = schema.properties.sources;

  assert.deepEqual(Object.keys(sources), ["type", "minItems", "items"]);
  assert.equal(sources.type, "array");
  assert.equal(sources.minItems, 0);
  assert.equal(Object.hasOwn(sources, "maxItems"), false);
  assert.equal(Object.hasOwn(sources, "uniqueItems"), false);
  assert.deepEqual(sources.items, { $ref: "#/$defs/sourceEntry" });
});

test("local sourceEntry definition contains exactly three required fields in order", () => {
  const schema = require(schemaPath);
  const entry = schema.$defs.sourceEntry;

  assert.deepEqual(Object.keys(schema.$defs), ["sourceEntry"]);
  assert.equal(entry.type, "object");
  assert.equal(entry.additionalProperties, false);
  assert.deepEqual(entry.required, expectedEntryFields);
  assert.deepEqual(Object.keys(entry.properties), expectedEntryFields);
  assert.equal(
    entry.properties.source_ref.pattern,
    "^src_[a-z0-9][a-z0-9_-]{0,59}$",
  );
  assert.deepEqual(entry.properties.declared_source_type.enum, expectedSourceTypes);
  assert.deepEqual(entry.properties.declared_label, {
    type: "string",
    minLength: 1,
    maxLength: 200,
  });
});

test("empty and populated registers satisfy the bounded structural schema proof", () => {
  const schema = require(schemaPath);

  assert.equal(validateAgainstSchemaContract(schema, createRegister()), true);
  assert.equal(
    validateAgainstSchemaContract(schema, createRegister({ sources: [createSource()] })),
    true,
  );
});

test("missing unknown wrong-type fixed-value reference and enum cases remain outside schema", () => {
  const schema = require(schemaPath);
  const valid = createRegister({ sources: [createSource()] });

  for (const field of expectedRootFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(validateAgainstSchemaContract(schema, missing), false, field);
  }

  assert.equal(validateAgainstSchemaContract(schema, { ...valid, extra: "blocked" }), false);
  assert.equal(
    validateAgainstSchemaContract(schema, { ...valid, contract_id: "other" }),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(schema, { ...valid, contract_version: "2.0.0" }),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(schema, { ...valid, packet_ref: "packet-001" }),
    false,
  );
  assert.equal(validateAgainstSchemaContract(schema, { ...valid, sources: {} }), false);
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createRegister({ sources: [createSource({ source_ref: "source-001" })] }),
    ),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createRegister({ sources: [createSource({ declared_source_type: "chat" })] }),
    ),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createRegister({ sources: [createSource({ unexpected: "blocked" })] }),
    ),
    false,
  );
});

test("label length uses code-point fixtures while trim enforcement remains unclaimed", () => {
  const schema = require(schemaPath);
  const glyph = String.fromCodePoint(0x1f600);

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createRegister({ sources: [createSource({ declared_label: glyph.repeat(200) })] }),
    ),
    true,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createRegister({ sources: [createSource({ declared_label: glyph.repeat(201) })] }),
    ),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createRegister({ sources: [createSource({ declared_label: "" })] }),
    ),
    false,
  );

  const labelDefinition = schema.$defs.sourceEntry.properties.declared_label;
  assert.equal(Object.hasOwn(labelDefinition, "pattern"), false);
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createRegister({ sources: [createSource({ declared_label: " padded " })] }),
    ),
    true,
  );
});

test("property-level source_ref uniqueness remains outside this schema scaffold", () => {
  const schema = require(schemaPath);
  const duplicateReferenceRegister = createRegister({
    sources: [
      createSource({ declared_label: "First declaration" }),
      createSource({ declared_label: "Second declaration", declared_source_type: "document" }),
    ],
  });

  assert.equal(Object.hasOwn(schema.properties.sources, "uniqueItems"), false);
  assert.equal(validateAgainstSchemaContract(schema, duplicateReferenceRegister), true);
});

test("schema remains candidate-only and contains no validator-result or runtime contract", () => {
  const schema = require(schemaPath);
  const schemaText = readRequired(schemaPath);

  for (const field of ["valid", "contractKind", "version", "errors", "code", "path"]) {
    assert.equal(Object.hasOwn(schema.properties, field), false, field);
  }

  for (const fragment of [
    "duplicate_source_ref",
    "required_field_missing",
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

test("schema remains anchored to contract scaffold scope and proof transition", () => {
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);

  assert.match(
    contractText,
    /HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_SOURCE_REGISTER_CONTRACT_DEFINED/u,
  );
  assert.match(
    scopeText,
    /HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_DEFINED/u,
  );
  assert.match(scopeText, /SCHEMA_EXPORT_NOT_CREATED/u);
  assert.match(scopeText, /VALIDATOR_RESULT_SCHEMA_NOT_CREATED/u);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
  assert.match(
    transitionText,
    /HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});
