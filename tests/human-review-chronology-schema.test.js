"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(repoRoot, "schemas", "human-review-chronology.json");
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const packageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorHelperTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const crossReferenceProofTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

const expectedRootFields = ["contract_id", "contract_version", "packet_ref", "entries"];
const expectedEntryFields = [
  "entry_ref",
  "review_state",
  "temporal_status",
  "declared_temporal_text",
  "review_text",
  "source_refs",
];
const expectedReviewStates = [
  "ASSERTED",
  "APPEARS_IN_SUPPLIED_MATERIAL",
  "NOT_ESTABLISHED",
  "HUMAN_REVIEW_REQUIRED",
];
const expectedTemporalStatuses = ["DECLARED", "UNKNOWN"];
const validatorResultSchemaCandidatePaths = [
  "schemas/human-review-chronology-validator-result.json",
  "tests/human-review-chronology-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-chronology-validator.js",
  "tests/human-review-chronology-validator.test.js",
];
const historicalCrossReferencePaths = [
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
  "tests/human-review-chronology-source-register-validation-boundary.test.js",
];

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, `expected ${filePath}`);
  return fs.readFileSync(filePath, "utf8");
}

function codePointLength(value) {
  return [...value].length;
}

function matchesType(value, type) {
  if (type === "null") return value === null;
  if (type === "string") return typeof value === "string";
  if (type === "array") return Array.isArray(value);
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  return false;
}

function matchesDefinition(value, definition) {
  if (definition.type) {
    const types = Array.isArray(definition.type) ? definition.type : [definition.type];
    if (!types.some((type) => matchesType(value, type))) return false;
  }
  if (Object.hasOwn(definition, "const") && value !== definition.const) return false;
  if (definition.pattern && !new RegExp(definition.pattern, "u").test(value)) return false;
  if (definition.enum && !definition.enum.includes(value)) return false;
  if (
    definition.minLength !== undefined &&
    (typeof value !== "string" || codePointLength(value) < definition.minLength)
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

function matchesOneOf(value, branches) {
  return (
    branches.filter((branch) =>
      Object.entries(branch.properties).every(([field, definition]) =>
        matchesDefinition(value[field], definition),
      ),
    ).length === 1
  );
}

function validateAgainstSchemaContract(schema, candidate) {
  if (!hasExactObjectShape(candidate, schema)) return false;

  for (const field of ["contract_id", "contract_version", "packet_ref"]) {
    if (!matchesDefinition(candidate[field], schema.properties[field])) return false;
  }

  const entriesDefinition = schema.properties.entries;
  if (!Array.isArray(candidate.entries)) return false;
  if (candidate.entries.length < entriesDefinition.minItems) return false;

  const entryDefinition = schema.$defs.chronologyEntry;
  for (const entry of candidate.entries) {
    if (!hasExactObjectShape(entry, entryDefinition)) return false;
    for (const field of [
      "entry_ref",
      "review_state",
      "temporal_status",
      "declared_temporal_text",
      "review_text",
    ]) {
      if (!matchesDefinition(entry[field], entryDefinition.properties[field])) return false;
    }
    if (!matchesOneOf(entry, entryDefinition.oneOf)) return false;

    const sourceRefsDefinition = entryDefinition.properties.source_refs;
    if (!Array.isArray(entry.source_refs)) return false;
    if (entry.source_refs.length < sourceRefsDefinition.minItems) return false;
    if (
      sourceRefsDefinition.uniqueItems === true &&
      new Set(entry.source_refs).size !== entry.source_refs.length
    ) {
      return false;
    }
    if (
      entry.source_refs.some(
        (sourceRef) => !matchesDefinition(sourceRef, sourceRefsDefinition.items),
      )
    ) {
      return false;
    }
  }

  return true;
}

function createEntry(overrides = {}) {
  return {
    entry_ref: "chr_review_001",
    review_state: "HUMAN_REVIEW_REQUIRED",
    temporal_status: "UNKNOWN",
    declared_temporal_text: null,
    review_text: "Proposed neutral review description",
    source_refs: ["src_message_001"],
    ...overrides,
  };
}

function createChronology(overrides = {}) {
  return {
    contract_id: "human_review.review_chronology",
    contract_version: "1.0.0",
    packet_ref: "pkt_review_001",
    entries: [],
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
    "https://governance-contracts.invalid/schemas/human-review-chronology.json",
  );
  assert.equal(schema.title, "Human Review Chronology Contract Scaffold");
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
  assert.equal(schema.properties.contract_id.const, "human_review.review_chronology");
  assert.equal(schema.properties.contract_version.const, "1.0.0");
  assert.equal(schema.properties.packet_ref.pattern, "^pkt_[a-z0-9][a-z0-9_-]{0,59}$");
});

test("entries array has an explicit zero minimum and no invented maximum or uniqueness claim", () => {
  const schema = require(schemaPath);
  const entries = schema.properties.entries;

  assert.deepEqual(Object.keys(entries), ["type", "minItems", "items"]);
  assert.equal(entries.type, "array");
  assert.equal(entries.minItems, 0);
  assert.equal(Object.hasOwn(entries, "maxItems"), false);
  assert.equal(Object.hasOwn(entries, "uniqueItems"), false);
  assert.deepEqual(entries.items, { $ref: "#/$defs/chronologyEntry" });
});

test("local chronologyEntry definition contains exactly six required fields in order", () => {
  const schema = require(schemaPath);
  const entry = schema.$defs.chronologyEntry;

  assert.deepEqual(Object.keys(schema.$defs), ["chronologyEntry"]);
  assert.deepEqual(Object.keys(entry), [
    "type",
    "additionalProperties",
    "required",
    "properties",
    "oneOf",
  ]);
  assert.equal(entry.type, "object");
  assert.equal(entry.additionalProperties, false);
  assert.deepEqual(entry.required, expectedEntryFields);
  assert.deepEqual(Object.keys(entry.properties), expectedEntryFields);
  assert.equal(
    entry.properties.entry_ref.pattern,
    "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
  );
  assert.deepEqual(entry.properties.review_state.enum, expectedReviewStates);
  assert.deepEqual(entry.properties.temporal_status.enum, expectedTemporalStatuses);
});

test("temporal text has the exact two-branch structural coupling", () => {
  const schema = require(schemaPath);
  const entry = schema.$defs.chronologyEntry;

  assert.deepEqual(entry.properties.declared_temporal_text, {
    type: ["string", "null"],
  });
  assert.deepEqual(entry.oneOf, [
    {
      properties: {
        temporal_status: { const: "DECLARED" },
        declared_temporal_text: { type: "string", minLength: 1 },
      },
    },
    {
      properties: {
        temporal_status: { const: "UNKNOWN" },
        declared_temporal_text: { const: null },
      },
    },
  ]);
});

test("review text and source references have exact bounded schema constraints", () => {
  const schema = require(schemaPath);
  const properties = schema.$defs.chronologyEntry.properties;

  assert.deepEqual(properties.review_text, { type: "string", minLength: 1 });
  assert.equal(Object.hasOwn(properties.review_text, "maxLength"), false);
  assert.equal(Object.hasOwn(properties.review_text, "pattern"), false);
  assert.deepEqual(properties.source_refs, {
    type: "array",
    minItems: 1,
    uniqueItems: true,
    items: {
      type: "string",
      pattern: "^src_[a-z0-9][a-z0-9_-]{0,59}$",
    },
  });
  assert.equal(Object.hasOwn(properties.source_refs, "maxItems"), false);
});

test("empty declared and unknown chronologies satisfy the bounded structural schema proof", () => {
  const schema = require(schemaPath);

  assert.equal(validateAgainstSchemaContract(schema, createChronology()), true);
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createChronology({
        entries: [
          createEntry({
            temporal_status: "DECLARED",
            declared_temporal_text: "2026-07-14 as declared",
          }),
          createEntry({ entry_ref: "chr_review_002" }),
        ],
      }),
    ),
    true,
  );
});

test("missing unknown type literal reference enum and temporal-coupling cases are rejected", () => {
  const schema = require(schemaPath);
  const valid = createChronology({ entries: [createEntry()] });

  for (const field of expectedRootFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(validateAgainstSchemaContract(schema, missing), false, field);
  }
  for (const field of expectedEntryFields) {
    const entry = createEntry();
    delete entry[field];
    assert.equal(
      validateAgainstSchemaContract(schema, createChronology({ entries: [entry] })),
      false,
      field,
    );
  }

  const invalidCandidates = [
    { ...valid, extra: "blocked" },
    { ...valid, contract_id: "other" },
    { ...valid, contract_version: "2.0.0" },
    { ...valid, packet_ref: "packet-001" },
    { ...valid, entries: {} },
    createChronology({ entries: [createEntry({ extra: "blocked" })] }),
    createChronology({ entries: [createEntry({ entry_ref: "entry-001" })] }),
    createChronology({ entries: [createEntry({ review_state: "VERIFIED" })] }),
    createChronology({ entries: [createEntry({ temporal_status: "ESTIMATED" })] }),
    createChronology({ entries: [createEntry({ review_text: "" })] }),
    createChronology({ entries: [createEntry({ source_refs: [] })] }),
    createChronology({ entries: [createEntry({ source_refs: ["source-001"] })] }),
    createChronology({
      entries: [createEntry({ source_refs: ["src_message_001", "src_message_001"] })],
    }),
    createChronology({
      entries: [createEntry({ temporal_status: "DECLARED", declared_temporal_text: null })],
    }),
    createChronology({
      entries: [createEntry({ temporal_status: "DECLARED", declared_temporal_text: "" })],
    }),
    createChronology({
      entries: [
        createEntry({ temporal_status: "UNKNOWN", declared_temporal_text: "declared" }),
      ],
    }),
  ];

  for (const candidate of invalidCandidates) {
    assert.equal(validateAgainstSchemaContract(schema, candidate), false);
  }
});

test("trim and property-level entry uniqueness remain outside this schema scaffold", () => {
  const schema = require(schemaPath);
  const duplicateEntryReference = createChronology({
    entries: [
      createEntry({ review_text: " first padded proposal " }),
      createEntry({
        review_state: "ASSERTED",
        temporal_status: "DECLARED",
        declared_temporal_text: " declared time ",
        review_text: " second padded proposal ",
        source_refs: ["src_message_002"],
      }),
    ],
  });

  assert.equal(Object.hasOwn(schema.properties.entries, "uniqueItems"), false);
  assert.equal(validateAgainstSchemaContract(schema, duplicateEntryReference), true);
  assert.equal(
    Object.hasOwn(schema.$defs.chronologyEntry.properties.review_text, "pattern"),
    false,
  );
  assert.equal(
    Object.hasOwn(
      schema.$defs.chronologyEntry.oneOf[0].properties.declared_temporal_text,
      "pattern",
    ),
    false,
  );
});

test("schema remains candidate-only while helper and cross-reference paths transition", () => {
  const schema = require(schemaPath);
  const schemaText = readRequired(schemaPath);
  const transitionText = readRequired(packageExportTransitionPath);
  const validatorResultTransitionText = readRequired(validatorResultTransitionPath);
  const validatorHelperTransitionText = readRequired(validatorHelperTransitionPath);
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionPath,
  );

  for (const field of ["valid", "contractKind", "version", "errors", "code", "path"]) {
    assert.equal(Object.hasOwn(schema.properties, field), false, field);
  }
  for (const fragment of [
    "duplicate_entry_ref",
    "duplicate_source_ref",
    "ROOT_TYPE_GATE",
    "VALIDATION_EXECUTION",
    "provider",
    "runtime",
    "persistence",
    "api",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
  for (const historicalPath of historicalCrossReferencePaths) {
    assert.equal(
      crossReferenceProofTransitionText.includes(`\`${historicalPath}\``),
      true,
      historicalPath,
    );
  }
  for (const helperPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperTransitionText.includes(`\`${helperPath}\``),
      true,
      helperPath,
    );
  }
  for (const candidatePath of validatorResultSchemaCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(`\`${candidatePath}\``),
      true,
      candidatePath,
    );
  }
  assert.match(transitionText, /PACKAGE_SCHEMA_EXPORT_TRANSITION_COUNT:\n1/u);
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.equal(
    transitionText.includes("`packages/schemas/src/index.js`"),
    true,
  );
  assert.equal(
    transitionText.includes("`tests/human-review-chronology-package-export.test.js`"),
    true,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransitionText,
    /RETAINED_VALIDATOR_AND_CROSS_REFERENCE_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    validatorHelperTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n7/u,
  );
  assert.match(
    validatorHelperTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /CROSS_REFERENCE_RUNTIME_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n12/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("schema remains anchored to contract scaffold scope and proof transition", () => {
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);

  assert.match(
    contractText,
    /HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_REVIEW_CHRONOLOGY_CONTRACT_DEFINED/u,
  );
  assert.match(
    scopeText,
    /HUMAN_REVIEW_CHRONOLOGY_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_DEFINED/u,
  );
  assert.match(scopeText, /SCHEMA_EXPORT_NOT_CREATED/u);
  assert.match(scopeText, /VALIDATOR_RESULT_SCHEMA_NOT_CREATED/u);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
  assert.match(
    transitionText,
    /HUMAN_REVIEW_CHRONOLOGY_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});
