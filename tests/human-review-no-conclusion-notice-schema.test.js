"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-no-conclusion-notice.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const packageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionPath = path.join(
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

const expectedRootFields = [
  "contract_id",
  "contract_version",
  "packet_ref",
  "notices",
];
const expectedNoticeFields = [
  "notice_ref",
  "declaration_origin",
  "notice_code",
  "notice_text",
  "source_refs",
  "chronology_entry_refs",
  "claim_refs",
  "gap_refs",
  "question_refs",
];
const referenceFields = [
  "source_refs",
  "chronology_entry_refs",
  "claim_refs",
  "gap_refs",
  "question_refs",
];
const referencePatterns = {
  source_refs: "^src_[a-z0-9][a-z0-9_-]{0,59}$",
  chronology_entry_refs: "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
  claim_refs: "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
  gap_refs: "^gap_[a-z0-9][a-z0-9_-]{0,59}$",
  question_refs: "^qst_[a-z0-9][a-z0-9_-]{0,59}$",
};
const referenceTokens = {
  source_refs: "src_message_001",
  chronology_entry_refs: "chr_review_001",
  claim_refs: "clm_review_001",
  gap_refs: "gap_review_001",
  question_refs: "qst_review_001",
};
const validatorResultCandidatePaths = [
  "schemas/human-review-no-conclusion-notice-validator-result.json",
  "tests/human-review-no-conclusion-notice-validator-result-schema.test.js",
];
const retainedSiblingPaths = [
  "packages/schemas/src/human-review-no-conclusion-notice-validator.js",
  "tests/human-review-no-conclusion-notice-validator.test.js",
  "packages/governance/src/human-review-no-conclusion-notice-cross-reference-validation-boundary.js",
  "tests/human-review-no-conclusion-notice-cross-reference-validation-boundary.test.js",
];
const historicalValidatorHelperPaths = retainedSiblingPaths.slice(0, 2);
const retainedCrossReferencePaths = retainedSiblingPaths.slice(2);

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, `expected ${filePath}`);
  return fs.readFileSync(filePath, "utf8");
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
  if (definition.pattern && !new RegExp(definition.pattern, "u").test(value)) {
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
  if (definition.uniqueItems === true && new Set(value).size !== value.length) {
    return false;
  }
  return value.every((item) => matchesDefinition(item, definition.items));
}

function satisfiesReferenceAnyOf(notice, branches) {
  return branches.some((branch) =>
    Object.entries(branch.properties).every(
      ([field, definition]) =>
        Array.isArray(notice[field]) && notice[field].length >= definition.minItems,
    ),
  );
}

function validateAgainstSchemaContract(schema, candidate) {
  if (!hasExactObjectShape(candidate, schema)) return false;
  for (const field of ["contract_id", "contract_version", "packet_ref"]) {
    if (!matchesDefinition(candidate[field], schema.properties[field])) return false;
  }

  const noticesDefinition = schema.properties.notices;
  if (!Array.isArray(candidate.notices)) return false;
  if (candidate.notices.length < noticesDefinition.minItems) return false;

  const noticeDefinition = schema.$defs.noticeRow;
  for (const notice of candidate.notices) {
    if (!hasExactObjectShape(notice, noticeDefinition)) return false;
    for (const field of [
      "notice_ref",
      "declaration_origin",
      "notice_code",
      "notice_text",
    ]) {
      if (!matchesDefinition(notice[field], noticeDefinition.properties[field])) {
        return false;
      }
    }
    for (const field of referenceFields) {
      if (!validatesReferenceArray(notice[field], noticeDefinition.properties[field])) {
        return false;
      }
    }
    if (!satisfiesReferenceAnyOf(notice, noticeDefinition.anyOf)) return false;
  }
  return true;
}

function createNotice(overrides = {}) {
  return {
    notice_ref: "ncn_review_001",
    declaration_origin: "BOUNDARY_DECLARED",
    notice_code: "NO_MODEL_CONCLUSION_UNDER_CURRENT_BOUNDARY",
    notice_text: "No model conclusion is established under the current boundary.",
    source_refs: ["src_message_001"],
    chronology_entry_refs: [],
    claim_refs: [],
    gap_refs: [],
    question_refs: [],
    ...overrides,
  };
}

function createPacket(overrides = {}) {
  return {
    contract_id: "human_review.no_conclusion_notice",
    contract_version: "1.0.0",
    packet_ref: "pkt_review_001",
    notices: [createNotice()],
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
    "https://governance-contracts.invalid/schemas/human-review-no-conclusion-notice.json",
  );
  assert.equal(
    schema.title,
    "Human Review No-Conclusion Notice Contract Scaffold",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
});

test("root fields and nonempty notices array have the exact closed scaffold", () => {
  const schema = require(schemaPath);
  const notices = schema.properties.notices;

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
    "human_review.no_conclusion_notice",
  );
  assert.equal(schema.properties.contract_version.const, "1.0.0");
  assert.equal(
    schema.properties.packet_ref.pattern,
    "^pkt_[a-z0-9][a-z0-9_-]{0,59}$",
  );
  assert.deepEqual(Object.keys(notices), ["type", "minItems", "items"]);
  assert.equal(notices.minItems, 1);
  assert.equal(Object.hasOwn(notices, "maxItems"), false);
  assert.equal(Object.hasOwn(notices, "uniqueItems"), false);
  assert.deepEqual(notices.items, { $ref: "#/$defs/noticeRow" });
});

test("local noticeRow has exactly nine fields and fixed scalar definitions", () => {
  const schema = require(schemaPath);
  const notice = schema.$defs.noticeRow;

  assert.deepEqual(Object.keys(schema.$defs), ["noticeRow"]);
  assert.deepEqual(Object.keys(notice), [
    "type",
    "additionalProperties",
    "required",
    "properties",
    "anyOf",
  ]);
  assert.equal(notice.type, "object");
  assert.equal(notice.additionalProperties, false);
  assert.deepEqual(notice.required, expectedNoticeFields);
  assert.deepEqual(Object.keys(notice.properties), expectedNoticeFields);
  assert.deepEqual(notice.properties.notice_ref, {
    type: "string",
    pattern: "^ncn_[a-z0-9][a-z0-9_-]{0,59}$",
  });
  assert.deepEqual(notice.properties.declaration_origin, {
    type: "string",
    const: "BOUNDARY_DECLARED",
  });
  assert.deepEqual(notice.properties.notice_code, {
    type: "string",
    const: "NO_MODEL_CONCLUSION_UNDER_CURRENT_BOUNDARY",
  });
  assert.deepEqual(notice.properties.notice_text, {
    type: "string",
    const: "No model conclusion is established under the current boundary.",
  });
});

test("five reference arrays have exact empty-allowed unique scalar constraints", () => {
  const properties = require(schemaPath).$defs.noticeRow.properties;

  for (const field of referenceFields) {
    assert.deepEqual(properties[field], {
      type: "array",
      minItems: 0,
      uniqueItems: true,
      items: { type: "string", pattern: referencePatterns[field] },
    });
    assert.equal(Object.hasOwn(properties[field], "maxItems"), false, field);
  }
});

test("noticeRow anyOf has five exact ordered minimum-reference branches", () => {
  const branches = require(schemaPath).$defs.noticeRow.anyOf;

  assert.deepEqual(
    branches,
    referenceFields.map((field) => ({
      properties: { [field]: { minItems: 1 } },
    })),
  );
  assert.equal(branches.length, 5);
});

test("each reference family and combined relationships satisfy structural proof", () => {
  const schema = require(schemaPath);

  for (const field of referenceFields) {
    const references = Object.fromEntries(referenceFields.map((name) => [name, []]));
    references[field] = [referenceTokens[field]];
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createPacket({ notices: [createNotice(references)] }),
      ),
      true,
      field,
    );
  }
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({
        notices: [
          createNotice(
            Object.fromEntries(
              referenceFields.map((field) => [field, [referenceTokens[field]]]),
            ),
          ),
        ],
      }),
    ),
    true,
  );
});

test("empty notice and empty total-reference cardinalities fail closed", () => {
  const schema = require(schemaPath);
  const emptyReferences = Object.fromEntries(
    referenceFields.map((field) => [field, []]),
  );

  assert.equal(validateAgainstSchemaContract(schema, createPacket({ notices: [] })), false);
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({ notices: [createNotice(emptyReferences)] }),
    ),
    false,
  );
});

test("missing unknown wrong-type fixed-value pattern and reference cases fail", () => {
  const schema = require(schemaPath);
  const valid = createPacket();

  for (const field of expectedRootFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(validateAgainstSchemaContract(schema, missing), false, field);
  }
  for (const field of expectedNoticeFields) {
    const notice = createNotice();
    delete notice[field];
    assert.equal(
      validateAgainstSchemaContract(schema, createPacket({ notices: [notice] })),
      false,
      field,
    );
  }
  for (const field of referenceFields) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createPacket({ notices: [createNotice({ [field]: {} })] }),
      ),
      false,
      `${field} type`,
    );
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createPacket({ notices: [createNotice({ [field]: ["invalid-ref"] })] }),
      ),
      false,
      `${field} pattern`,
    );
  }

  const invalidCandidates = [
    { ...valid, extra: "blocked" },
    { ...valid, contract_id: "other" },
    { ...valid, contract_version: "2.0.0" },
    { ...valid, packet_ref: "packet-001" },
    { ...valid, notices: {} },
    createPacket({ notices: [createNotice({ extra: "blocked" })] }),
    createPacket({ notices: [createNotice({ notice_ref: "notice-001" })] }),
    createPacket({ notices: [createNotice({ declaration_origin: "MODEL_DERIVED" })] }),
    createPacket({ notices: [createNotice({ notice_code: "OTHER" })] }),
    createPacket({ notices: [createNotice({ notice_text: "A conclusion." })] }),
  ];
  for (const candidate of invalidCandidates) {
    assert.equal(validateAgainstSchemaContract(schema, candidate), false);
  }
});

test("scalar duplicates fail while cross-row notice identity remains validator-only", () => {
  const schema = require(schemaPath);

  for (const field of referenceFields) {
    const token = referenceTokens[field];
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createPacket({ notices: [createNotice({ [field]: [token, token] })] }),
      ),
      false,
      field,
    );
  }
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createPacket({ notices: [createNotice(), createNotice()] }),
    ),
    true,
  );
  assert.equal(Object.hasOwn(schema.properties.notices, "uniqueItems"), false);
});

test("multiple rows and references stay valid without maximum cardinality claims", () => {
  const schema = require(schemaPath);
  const manySources = Array.from({ length: 64 }, (_, index) =>
    `src_message_${String(index).padStart(3, "0")}`,
  );
  const notices = Array.from({ length: 16 }, (_, index) =>
    createNotice({
      notice_ref: `ncn_review_${String(index).padStart(3, "0")}`,
      source_refs: manySources,
    }),
  );

  assert.equal(validateAgainstSchemaContract(schema, createPacket({ notices })), true);
  assert.equal(JSON.stringify(schema).includes("maxItems"), false);
});

test("schema stays candidate-only with package validator cross-reference and runtime seams closed", () => {
  const schema = require(schemaPath);
  const schemaText = readRequired(schemaPath);
  const transitionText = readRequired(transitionPath);
  const packageExportTransitionText = readRequired(packageExportTransitionPath);
  const validatorResultTransitionText = readRequired(validatorResultTransitionPath);
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionPath,
  );

  for (const prohibitedField of [
    "category",
    "subject",
    "purpose",
    "trigger",
    "request",
    "stop_condition",
    "reason",
    "review_state",
    "status",
    "outcome",
    "action",
    "escalation",
    "safeNextAction",
    "actor",
    "provider",
    "model",
    "timestamp",
    "approval",
    "resolution",
    "closure",
    "handoff",
    "raw_content",
    "source_locator",
    "external_locator",
  ]) {
    assert.equal(
      Object.hasOwn(schema.$defs.noticeRow.properties, prohibitedField),
      false,
      prohibitedField,
    );
  }
  for (const fragment of [
    "duplicate_notice_ref",
    "ROOT_TYPE_GATE",
    "VALIDATION_EXECUTION",
    "runtime",
    "persistence",
    "api",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
  assert.equal(
    packageExportTransitionText.includes("`packages/schemas/src/index.js`"),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes("`humanReviewNoConclusionNotice`"),
    true,
  );
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_TRANSITION_COUNT:\n1/u,
  );
  assert.match(
    packageExportTransitionText,
    /REMAINING_PACKAGE_EXPORT_PROOF_ALIGNMENT_COUNT:\n1/u,
  );
  for (const candidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" +
          candidatePath +
          "` | `PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  for (const retainedPath of retainedSiblingPaths) {
    assert.equal(
      transitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
    assert.equal(
      packageExportTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
  }
  for (const helperPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + helperPath + "`"),
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
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransitionText,
    /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u,
  );
});

test("schema remains anchored to contract scope proof transition and stated limits", () => {
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);
  const packageExportTransitionText = readRequired(packageExportTransitionPath);
  const validatorResultTransitionText = readRequired(validatorResultTransitionPath);

  assert.match(
    contractText,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_CONTRACT_SEMANTICS_FROZEN_SCHEMA_VALIDATOR_AND_RUNTIME_NOT_CREATED/u,
  );
  assert.match(
    scopeText,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_SCAFFOLD_SCOPE_STATUS:\nTRACKED_DOCS_ONLY_EXACT_TWO_FILE_FUTURE_SCHEMA_SCOPE_FROZEN/u,
  );
  for (const marker of [
    "PACKAGE_EXPORT_EXCLUDED",
    "VALIDATOR_RESULT_SCHEMA_EXCLUDED",
    "CROSS_REFERENCE_SURFACES_EXCLUDED",
    "CROSS_ROW_NOTICE_REF_UNIQUENESS_REMAINS_VALIDATOR_ONLY",
    "WORKSPACE_PRESENCE_REMAINS_ORCHESTRATOR_ONLY",
    "NO_MAX_ITEMS_SELECTED",
  ]) {
    assert.equal(scopeText.includes(marker), true, marker);
  }
  assert.match(scopeText, /does not enforce cross-row/u);
  assert.match(scopeText, /plain-object\/accessor behavior/u);
  assert.match(scopeText, /cross-contract token membership/u);
  assert.match(scopeText, /executed model refusal/u);
  assert.match(
    transitionText,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_FIRST_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(transitionText, /not evidence that either candidate file already exists/u);
  assert.match(
    packageExportTransitionText,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(
    packageExportTransitionText,
    /one focused scope-proof alignment remains before package schema export/u,
  );
  assert.match(
    validatorResultTransitionText,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_CONTRACT_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});
