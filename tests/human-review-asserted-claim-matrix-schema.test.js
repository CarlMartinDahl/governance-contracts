"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-asserted-claim-matrix.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorHelperProofTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

const expectedRootFields = ["contract_id", "contract_version", "packet_ref", "claims"];
const expectedClaimFields = [
  "claim_ref",
  "review_state",
  "asserted_claim_text",
  "supplied_material_observation_text",
  "source_refs",
  "chronology_entry_refs",
];
const expectedReviewStates = [
  "ASSERTED",
  "APPEARS_IN_SUPPLIED_MATERIAL",
  "NOT_ESTABLISHED",
  "HUMAN_REVIEW_REQUIRED",
];
const validatorResultCandidatePaths = [
  "schemas/human-review-asserted-claim-matrix-validator-result.json",
  "tests/human-review-asserted-claim-matrix-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "tests/human-review-asserted-claim-matrix-validator.test.js",
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
  if (type === "object") {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
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
  if (definition.oneOf) {
    const matches = definition.oneOf.filter((branch) => matchesDefinition(value, branch));
    if (matches.length !== 1) return false;
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

function matchesObjectOneOf(value, branches) {
  return (
    branches.filter((branch) =>
      Object.entries(branch.properties).every(([field, definition]) =>
        matchesDefinition(value[field], definition),
      ),
    ).length === 1
  );
}

function validatesReferenceArray(value, definition) {
  if (!Array.isArray(value)) return false;
  if (value.length < definition.minItems) return false;
  if (definition.uniqueItems === true && new Set(value).size !== value.length) return false;
  return value.every((item) => matchesDefinition(item, definition.items));
}

function validateAgainstSchemaContract(schema, candidate) {
  if (!hasExactObjectShape(candidate, schema)) return false;
  for (const field of ["contract_id", "contract_version", "packet_ref"]) {
    if (!matchesDefinition(candidate[field], schema.properties[field])) return false;
  }

  const claimsDefinition = schema.properties.claims;
  if (!Array.isArray(candidate.claims)) return false;
  if (candidate.claims.length < claimsDefinition.minItems) return false;

  const claimDefinition = schema.$defs.claimRow;
  for (const claim of candidate.claims) {
    if (!hasExactObjectShape(claim, claimDefinition)) return false;
    for (const field of [
      "claim_ref",
      "review_state",
      "asserted_claim_text",
      "supplied_material_observation_text",
    ]) {
      if (!matchesDefinition(claim[field], claimDefinition.properties[field])) return false;
    }
    if (!matchesObjectOneOf(claim, claimDefinition.oneOf)) return false;
    if (!validatesReferenceArray(claim.source_refs, claimDefinition.properties.source_refs)) {
      return false;
    }
    if (
      !validatesReferenceArray(
        claim.chronology_entry_refs,
        claimDefinition.properties.chronology_entry_refs,
      )
    ) {
      return false;
    }
  }
  return true;
}

function createClaim(overrides = {}) {
  return {
    claim_ref: "clm_review_001",
    review_state: "HUMAN_REVIEW_REQUIRED",
    asserted_claim_text: "Asserted statement requiring human review",
    supplied_material_observation_text: null,
    source_refs: ["src_message_001"],
    chronology_entry_refs: [],
    ...overrides,
  };
}

function createMatrix(overrides = {}) {
  return {
    contract_id: "human_review.asserted_claim_matrix",
    contract_version: "1.0.0",
    packet_ref: "pkt_review_001",
    claims: [],
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
    "https://governance-contracts.invalid/schemas/human-review-asserted-claim-matrix.json",
  );
  assert.equal(schema.title, "Human Review Asserted Claim Matrix Contract Scaffold");
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
  assert.equal(schema.properties.contract_id.const, "human_review.asserted_claim_matrix");
  assert.equal(schema.properties.contract_version.const, "1.0.0");
  assert.equal(schema.properties.packet_ref.pattern, "^pkt_[a-z0-9][a-z0-9_-]{0,59}$");
});

test("claims array has an explicit zero minimum and no maximum or uniqueness claim", () => {
  const schema = require(schemaPath);
  const claims = schema.properties.claims;
  assert.deepEqual(Object.keys(claims), ["type", "minItems", "items"]);
  assert.equal(claims.type, "array");
  assert.equal(claims.minItems, 0);
  assert.equal(Object.hasOwn(claims, "maxItems"), false);
  assert.equal(Object.hasOwn(claims, "uniqueItems"), false);
  assert.deepEqual(claims.items, { $ref: "#/$defs/claimRow" });
});

test("local claimRow definition contains exactly six required fields in order", () => {
  const schema = require(schemaPath);
  const claim = schema.$defs.claimRow;
  assert.deepEqual(Object.keys(schema.$defs), ["claimRow"]);
  assert.deepEqual(Object.keys(claim), [
    "type",
    "additionalProperties",
    "required",
    "properties",
    "oneOf",
  ]);
  assert.equal(claim.type, "object");
  assert.equal(claim.additionalProperties, false);
  assert.deepEqual(claim.required, expectedClaimFields);
  assert.deepEqual(Object.keys(claim.properties), expectedClaimFields);
  assert.equal(claim.properties.claim_ref.pattern, "^clm_[a-z0-9][a-z0-9_-]{0,59}$");
  assert.deepEqual(claim.properties.review_state.enum, expectedReviewStates);
});

test("review state and supplied-material observation have exact structural coupling", () => {
  const schema = require(schemaPath);
  const claim = schema.$defs.claimRow;
  assert.deepEqual(claim.properties.supplied_material_observation_text, {
    type: ["string", "null"],
  });
  assert.deepEqual(claim.oneOf, [
    {
      properties: {
        review_state: { const: "ASSERTED" },
        supplied_material_observation_text: { const: null },
      },
    },
    {
      properties: {
        review_state: { const: "APPEARS_IN_SUPPLIED_MATERIAL" },
        supplied_material_observation_text: { type: "string", minLength: 1 },
      },
    },
    {
      properties: {
        review_state: { const: "NOT_ESTABLISHED" },
        supplied_material_observation_text: { const: null },
      },
    },
    {
      properties: {
        review_state: { const: "HUMAN_REVIEW_REQUIRED" },
        supplied_material_observation_text: {
          oneOf: [{ const: null }, { type: "string", minLength: 1 }],
        },
      },
    },
  ]);
});

test("claim text and both reference arrays have exact bounded constraints", () => {
  const schema = require(schemaPath);
  const properties = schema.$defs.claimRow.properties;
  assert.deepEqual(properties.asserted_claim_text, { type: "string", minLength: 1 });
  assert.equal(Object.hasOwn(properties.asserted_claim_text, "maxLength"), false);
  assert.equal(Object.hasOwn(properties.asserted_claim_text, "pattern"), false);
  assert.deepEqual(properties.source_refs, {
    type: "array",
    minItems: 1,
    uniqueItems: true,
    items: { type: "string", pattern: "^src_[a-z0-9][a-z0-9_-]{0,59}$" },
  });
  assert.deepEqual(properties.chronology_entry_refs, {
    type: "array",
    minItems: 0,
    uniqueItems: true,
    items: { type: "string", pattern: "^chr_[a-z0-9][a-z0-9_-]{0,59}$" },
  });
  assert.equal(Object.hasOwn(properties.source_refs, "maxItems"), false);
  assert.equal(Object.hasOwn(properties.chronology_entry_refs, "maxItems"), false);
});

test("empty matrix and every exact state-observation branch satisfy structural proof", () => {
  const schema = require(schemaPath);
  const claims = [
    createClaim({
      claim_ref: "clm_asserted_001",
      review_state: "ASSERTED",
      supplied_material_observation_text: null,
    }),
    createClaim({
      claim_ref: "clm_appears_001",
      review_state: "APPEARS_IN_SUPPLIED_MATERIAL",
      supplied_material_observation_text: "A supplied passage appears relevant",
      chronology_entry_refs: ["chr_review_001"],
    }),
    createClaim({
      claim_ref: "clm_not_established_001",
      review_state: "NOT_ESTABLISHED",
      supplied_material_observation_text: null,
    }),
    createClaim({ claim_ref: "clm_review_null_001" }),
    createClaim({
      claim_ref: "clm_review_text_001",
      supplied_material_observation_text: "Human review note",
    }),
  ];
  assert.equal(validateAgainstSchemaContract(schema, createMatrix()), true);
  assert.equal(validateAgainstSchemaContract(schema, createMatrix({ claims })), true);
});

test("missing unknown invalid references enums and observation couplings are rejected", () => {
  const schema = require(schemaPath);
  const valid = createMatrix({ claims: [createClaim()] });
  for (const field of expectedRootFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(validateAgainstSchemaContract(schema, missing), false, field);
  }
  for (const field of expectedClaimFields) {
    const claim = createClaim();
    delete claim[field];
    assert.equal(
      validateAgainstSchemaContract(schema, createMatrix({ claims: [claim] })),
      false,
      field,
    );
  }
  const invalidCandidates = [
    { ...valid, extra: "blocked" },
    { ...valid, contract_id: "other" },
    { ...valid, contract_version: "2.0.0" },
    { ...valid, packet_ref: "packet-001" },
    { ...valid, claims: {} },
    createMatrix({ claims: [createClaim({ extra: "blocked" })] }),
    createMatrix({ claims: [createClaim({ claim_ref: "claim-001" })] }),
    createMatrix({ claims: [createClaim({ review_state: "VERIFIED" })] }),
    createMatrix({ claims: [createClaim({ asserted_claim_text: "" })] }),
    createMatrix({ claims: [createClaim({ supplied_material_observation_text: 1 })] }),
    createMatrix({ claims: [createClaim({ source_refs: [] })] }),
    createMatrix({ claims: [createClaim({ source_refs: ["source-001"] })] }),
    createMatrix({
      claims: [createClaim({ source_refs: ["src_message_001", "src_message_001"] })],
    }),
    createMatrix({ claims: [createClaim({ chronology_entry_refs: ["entry-001"] })] }),
    createMatrix({
      claims: [
        createClaim({ chronology_entry_refs: ["chr_review_001", "chr_review_001"] }),
      ],
    }),
    createMatrix({
      claims: [
        createClaim({
          review_state: "ASSERTED",
          supplied_material_observation_text: "not permitted",
        }),
      ],
    }),
    createMatrix({
      claims: [
        createClaim({
          review_state: "APPEARS_IN_SUPPLIED_MATERIAL",
          supplied_material_observation_text: null,
        }),
      ],
    }),
    createMatrix({
      claims: [
        createClaim({
          review_state: "APPEARS_IN_SUPPLIED_MATERIAL",
          supplied_material_observation_text: "",
        }),
      ],
    }),
    createMatrix({
      claims: [
        createClaim({
          review_state: "NOT_ESTABLISHED",
          supplied_material_observation_text: "not permitted",
        }),
      ],
    }),
    createMatrix({ claims: [createClaim({ supplied_material_observation_text: "" })] }),
  ];
  for (const candidate of invalidCandidates) {
    assert.equal(validateAgainstSchemaContract(schema, candidate), false);
  }
});

test("trim membership and property-level claim uniqueness remain outside this schema", () => {
  const schema = require(schemaPath);
  const duplicateClaimReference = createMatrix({
    packet_ref: "pkt_unresolved_001",
    claims: [
      createClaim({
        asserted_claim_text: "   ",
        source_refs: ["src_not_registered_001"],
        chronology_entry_refs: ["chr_not_registered_001"],
      }),
      createClaim({
        review_state: "APPEARS_IN_SUPPLIED_MATERIAL",
        asserted_claim_text: " second padded assertion ",
        supplied_material_observation_text: " observed text ",
        source_refs: ["src_not_registered_002"],
      }),
    ],
  });
  assert.equal(Object.hasOwn(schema.properties.claims, "uniqueItems"), false);
  assert.equal(validateAgainstSchemaContract(schema, duplicateClaimReference), true);
  assert.equal(
    Object.hasOwn(schema.$defs.claimRow.properties.asserted_claim_text, "pattern"),
    false,
  );
});

test("schema remains candidate-only while helper history transitions without implementation claims", () => {
  const schema = require(schemaPath);
  const schemaText = readRequired(schemaPath);
  const transitionText = readRequired(transitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultTransitionPath,
  );
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );
  for (const field of ["valid", "contractKind", "version", "errors", "code", "path"]) {
    assert.equal(Object.hasOwn(schema.properties, field), false, field);
  }
  for (const fragment of [
    "duplicate_claim_ref",
    "missing_source_ref",
    "missing_chronology_entry_ref",
    "ROOT_TYPE_GATE",
    "VALIDATION_EXECUTION",
    "provider",
    "runtime",
    "persistence",
    "api",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
  for (const [index, relativePath] of validatorResultCandidatePaths.entries()) {
    const expectedRow =
      `| ${index + 1} | \`${relativePath}\` | ` +
      "`PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE` |";
    assert.equal(
      validatorResultTransitionText.includes(expectedRow),
      true,
      relativePath,
    );
    assert.equal(transitionText.includes(`\`${relativePath}\``), true, relativePath);
  }
  for (const [index, relativePath] of historicalValidatorHelperPaths.entries()) {
    const expectedRow =
      `| ${index + 1} | \`${relativePath}\` | ` +
      "`RETAIN_LIVE_ABSENCE_ASSERTION` |";
    assert.equal(transitionText.includes(`\`${relativePath}\``), true, relativePath);
    assert.equal(
      validatorResultTransitionText.includes(expectedRow),
      true,
      relativePath,
    );
    assert.equal(
      validatorHelperProofTransitionText.includes(`\`${relativePath}\``),
      true,
      relativePath,
    );
  }
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u);
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransitionText,
    /RETAINED_VALIDATOR_HELPER_ABSENCE_COUNT:\n2/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n10/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("schema remains anchored to contract scaffold scope and proof transition", () => {
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);
  assert.match(
    contractText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_OWNER_SELECTED_ASSERTED_CLAIM_MATRIX_V1_CONTRACT_DEFINED/u,
  );
  assert.match(
    scopeText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_DEFINED/u,
  );
  assert.match(scopeText, /SCHEMA_EXPORT_NOT_CREATED/u);
  assert.match(scopeText, /VALIDATOR_RESULT_SCHEMA_NOT_CREATED/u);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
  assert.match(
    transitionText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});
