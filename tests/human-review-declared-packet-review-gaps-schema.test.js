"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-declared-packet-review-gaps.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const packageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorHelperTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const crossReferenceProofTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

const expectedRootFields = ["contract_id", "contract_version", "packet_ref", "gaps"];
const expectedGapFields = [
  "gap_ref",
  "declaration_origin",
  "declared_gap_text",
  "source_refs",
  "chronology_entry_refs",
  "claim_refs",
];
const referenceFields = ["source_refs", "chronology_entry_refs", "claim_refs"];
const validatorResultCandidatePaths = [
  "schemas/human-review-declared-packet-review-gaps-validator-result.json",
  "tests/human-review-declared-packet-review-gaps-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
  "tests/human-review-declared-packet-review-gaps-validator.test.js",
];
const retainedCrossReferencePaths = [
  "packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js",
  "tests/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.test.js",
];

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, `expected ${filePath}`);
  return fs.readFileSync(filePath, "utf8");
}

function codePointLength(value) {
  return [...value].length;
}

function matchesType(value, type) {
  if (type === "string") return typeof value === "string";
  if (type === "array") return Array.isArray(value);
  if (type === "object") {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  return false;
}

function matchesDefinition(value, definition) {
  if (definition.type && !matchesType(value, definition.type)) return false;
  if (Object.hasOwn(definition, "const") && value !== definition.const) return false;
  if (definition.pattern && !new RegExp(definition.pattern, "u").test(value)) return false;
  if (
    definition.minLength !== undefined &&
    (typeof value !== "string" || codePointLength(value) < definition.minLength)
  ) {
    return false;
  }
  if (
    definition.maxLength !== undefined &&
    (typeof value !== "string" || codePointLength(value) > definition.maxLength)
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

  const gapsDefinition = schema.properties.gaps;
  if (!Array.isArray(candidate.gaps)) return false;
  if (candidate.gaps.length < gapsDefinition.minItems) return false;

  const gapDefinition = schema.$defs.gapRow;
  for (const gap of candidate.gaps) {
    if (!hasExactObjectShape(gap, gapDefinition)) return false;
    for (const field of ["gap_ref", "declaration_origin", "declared_gap_text"]) {
      if (!matchesDefinition(gap[field], gapDefinition.properties[field])) return false;
    }
    for (const field of referenceFields) {
      if (!validatesReferenceArray(gap[field], gapDefinition.properties[field])) return false;
    }
  }
  return true;
}

function createGap(overrides = {}) {
  return {
    gap_ref: "gap_review_001",
    declaration_origin: "HUMAN_DECLARED",
    declared_gap_text: "Human-declared review gap",
    source_refs: [],
    chronology_entry_refs: [],
    claim_refs: [],
    ...overrides,
  };
}

function createPacket(overrides = {}) {
  return {
    contract_id: "human_review.declared_packet_review_gaps",
    contract_version: "1.0.0",
    packet_ref: "pkt_review_001",
    gaps: [],
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
    "https://governance-contracts.invalid/schemas/human-review-declared-packet-review-gaps.json",
  );
  assert.equal(schema.title, "Human Review Declared Packet Review Gaps Contract Scaffold");
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
  assert.equal(
    schema.properties.contract_id.const,
    "human_review.declared_packet_review_gaps",
  );
  assert.equal(schema.properties.contract_version.const, "1.0.0");
  assert.equal(schema.properties.packet_ref.pattern, "^pkt_[a-z0-9][a-z0-9_-]{0,59}$");
});

test("gaps array has an explicit zero minimum and no maximum or uniqueness claim", () => {
  const schema = require(schemaPath);
  const gaps = schema.properties.gaps;

  assert.deepEqual(Object.keys(gaps), ["type", "minItems", "items"]);
  assert.equal(gaps.type, "array");
  assert.equal(gaps.minItems, 0);
  assert.equal(Object.hasOwn(gaps, "maxItems"), false);
  assert.equal(Object.hasOwn(gaps, "uniqueItems"), false);
  assert.deepEqual(gaps.items, { $ref: "#/$defs/gapRow" });
});

test("local gapRow definition contains exactly six required fields in order", () => {
  const schema = require(schemaPath);
  const gap = schema.$defs.gapRow;

  assert.deepEqual(Object.keys(schema.$defs), ["gapRow"]);
  assert.deepEqual(Object.keys(gap), [
    "type",
    "additionalProperties",
    "required",
    "properties",
  ]);
  assert.equal(gap.type, "object");
  assert.equal(gap.additionalProperties, false);
  assert.deepEqual(gap.required, expectedGapFields);
  assert.deepEqual(Object.keys(gap.properties), expectedGapFields);
  assert.equal(gap.properties.gap_ref.pattern, "^gap_[a-z0-9][a-z0-9_-]{0,59}$");
  assert.deepEqual(gap.properties.declaration_origin, {
    type: "string",
    const: "HUMAN_DECLARED",
  });
  assert.deepEqual(gap.properties.declared_gap_text, {
    type: "string",
    minLength: 1,
    maxLength: 1000,
  });
});

test("three reference arrays have exact empty-allowed unique scalar constraints", () => {
  const schema = require(schemaPath);
  const properties = schema.$defs.gapRow.properties;
  const expectedPatterns = {
    source_refs: "^src_[a-z0-9][a-z0-9_-]{0,59}$",
    chronology_entry_refs: "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
    claim_refs: "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
  };

  for (const field of referenceFields) {
    assert.deepEqual(properties[field], {
      type: "array",
      minItems: 0,
      uniqueItems: true,
      items: { type: "string", pattern: expectedPatterns[field] },
    });
    assert.equal(Object.hasOwn(properties[field], "maxItems"), false, field);
  }
});

test("empty complete and reference-populated packets satisfy structural proof", () => {
  const schema = require(schemaPath);
  assert.equal(validateAgainstSchemaContract(schema, createPacket()), true);
  assert.equal(
    validateAgainstSchemaContract(schema, createPacket({ gaps: [createGap()] })),
    true,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({
        gaps: [
          createGap({
            source_refs: ["src_message_001"],
            chronology_entry_refs: ["chr_review_001"],
            claim_refs: ["clm_review_001"],
          }),
        ],
      }),
    ),
    true,
  );
});

test("missing unknown wrong-type fixed-value and reference cases are rejected", () => {
  const schema = require(schemaPath);
  const valid = createPacket({ gaps: [createGap()] });

  for (const field of expectedRootFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(validateAgainstSchemaContract(schema, missing), false, field);
  }
  for (const field of expectedGapFields) {
    const gap = createGap();
    delete gap[field];
    assert.equal(
      validateAgainstSchemaContract(schema, createPacket({ gaps: [gap] })),
      false,
      field,
    );
  }

  const invalidCandidates = [
    { ...valid, extra: "blocked" },
    { ...valid, contract_id: "other" },
    { ...valid, contract_version: "2.0.0" },
    { ...valid, packet_ref: "packet-001" },
    { ...valid, gaps: {} },
    createPacket({ gaps: [createGap({ extra: "blocked" })] }),
    createPacket({ gaps: [createGap({ gap_ref: "review-gap-001" })] }),
    createPacket({ gaps: [createGap({ declaration_origin: "MODEL_DERIVED" })] }),
    createPacket({ gaps: [createGap({ declared_gap_text: 1 })] }),
    createPacket({ gaps: [createGap({ source_refs: ["source-001"] })] }),
    createPacket({ gaps: [createGap({ chronology_entry_refs: ["entry-001"] })] }),
    createPacket({ gaps: [createGap({ claim_refs: ["claim-001"] })] }),
  ];
  for (const candidate of invalidCandidates) {
    assert.equal(validateAgainstSchemaContract(schema, candidate), false);
  }
});

test("declared text uses code-point bounds while trim and meaning remain outside schema", () => {
  const schema = require(schemaPath);
  const glyph = String.fromCodePoint(0x1f600);

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({ gaps: [createGap({ declared_gap_text: glyph.repeat(1000) })] }),
    ),
    true,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({ gaps: [createGap({ declared_gap_text: glyph.repeat(1001) })] }),
    ),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({ gaps: [createGap({ declared_gap_text: "" })] }),
    ),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({ gaps: [createGap({ declared_gap_text: "   " })] }),
    ),
    true,
  );
  assert.equal(
    Object.hasOwn(schema.$defs.gapRow.properties.declared_gap_text, "pattern"),
    false,
  );
});

test("in-row duplicate references fail while cross-row gap identity remains validator-only", () => {
  const schema = require(schemaPath);

  for (const field of referenceFields) {
    const token = {
      source_refs: "src_message_001",
      chronology_entry_refs: "chr_review_001",
      claim_refs: "clm_review_001",
    }[field];
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createPacket({ gaps: [createGap({ [field]: [token, token] })] }),
      ),
      false,
      field,
    );
  }

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({
        gaps: [
          createGap(),
          createGap({ declared_gap_text: "A second declaration with the same gap ref" }),
        ],
      }),
    ),
    true,
  );
  assert.equal(Object.hasOwn(schema.properties.gaps, "uniqueItems"), false);
});

test("schema stays candidate-only with package validator cross-reference and runtime seams closed", () => {
  const schema = require(schemaPath);
  const schemaText = readRequired(schemaPath);
  const transitionText = readRequired(transitionPath);
  const packageExportTransitionText = readRequired(packageExportTransitionPath);
  const validatorResultTransitionText = readRequired(validatorResultTransitionPath);
  const validatorHelperTransitionText = readRequired(validatorHelperTransitionPath);
  const crossReferenceTransitionText = readRequired(
    crossReferenceProofTransitionPath,
  );

  for (const prohibitedField of [
    "gap_category",
    "review_state",
    "status",
    "severity",
    "score",
    "rank",
    "closure",
    "remediation",
    "approval",
    "handoff",
    "revision",
    "supersedes",
  ]) {
    assert.equal(Object.hasOwn(schema.$defs.gapRow.properties, prohibitedField), false);
  }
  for (const fragment of [
    "duplicate_gap_ref",
    "ROOT_TYPE_GATE",
    "VALIDATION_EXECUTION",
    "provider",
    "runtime",
    "persistence",
    "api",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_TRANSITION_COUNT:\n1/u,
  );
  assert.equal(
    packageExportTransitionText.includes("`humanReviewDeclaredPacketReviewGaps`"),
    true,
  );
  for (const candidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + candidatePath + "` | `PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  for (const historicalPath of historicalValidatorHelperPaths) {
    assert.equal(transitionText.includes("`" + historicalPath + "`"), true, historicalPath);
    assert.equal(
      packageExportTransitionText.includes("`" + historicalPath + "`"),
      true,
      historicalPath,
    );
    assert.equal(
      validatorHelperTransitionText.includes("`" + historicalPath + "`"),
      true,
      historicalPath,
    );
  }
  for (const retainedPath of retainedCrossReferencePaths) {
    assert.equal(transitionText.includes("`" + retainedPath + "`"), true, retainedPath);
    assert.equal(
      packageExportTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
    assert.equal(
      crossReferenceTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
  }
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(
    packageExportTransitionText,
    /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u,
  );
  assert.match(validatorResultTransitionText, /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(validatorResultTransitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u);
  assert.match(
    validatorHelperTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n7/u,
  );
  assert.match(
    validatorHelperTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n14/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("schema remains anchored to contract scope and proof transition boundaries", () => {
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);
  const packageExportTransitionText = readRequired(packageExportTransitionPath);

  assert.match(
    contractText,
    /HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_CONTRACT_SEMANTICS_FROZEN_SCHEMA_VALIDATOR_AND_RUNTIME_NOT_CREATED/u,
  );
  assert.match(
    scopeText,
    /HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_SCAFFOLD_SCOPE_STATUS:\nTRACKED_DOCS_ONLY_EXACT_TWO_FILE_FUTURE_SCHEMA_SCOPE_FROZEN/u,
  );
  assert.match(scopeText, /PACKAGE_EXPORT_EXCLUDED/u);
  assert.match(scopeText, /VALIDATOR_RESULT_SCHEMA_EXCLUDED/u);
  assert.match(scopeText, /CROSS_REFERENCE_SURFACES_EXCLUDED/u);
  assert.match(
    transitionText,
    /HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_FIRST_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(transitionText, /not evidence that either candidate file already\nexists/u);
  assert.match(
    packageExportTransitionText,
    /HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
});
