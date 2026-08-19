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
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-controlled-handoff-brief.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const packageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorHelperProofTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

const expectedRootFields = [
  "contract_id",
  "contract_version",
  "packet_ref",
  "handoff_posture",
  "component_refs",
];
const expectedComponentFields = [
  "source_register_ref",
  "review_chronology_ref",
  "asserted_claim_matrix_ref",
  "declared_packet_review_gaps_ref",
  "human_review_questions_ref",
  "no_conclusion_notice_ref",
];
const componentPattern = "^hro_[a-z0-9][a-z0-9_-]{0,59}$";
const laterSiblingPaths = [
  "schemas/human-review-controlled-handoff-brief-validator-result.json",
  "tests/human-review-controlled-handoff-brief-validator-result-schema.test.js",
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "tests/human-review-controlled-handoff-brief-validator.test.js",
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];
const validatorResultCandidatePaths = laterSiblingPaths.slice(0, 2);
const historicalValidatorHelperPaths = laterSiblingPaths.slice(2, 4);
const retainedCrossReferencePaths = laterSiblingPaths.slice(4);

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, "expected " + filePath);
  return fs.readFileSync(filePath, "utf8");
}

function matchesDefinition(value, definition) {
  if (definition.type === "string" && typeof value !== "string") return false;
  if (Object.hasOwn(definition, "const") && value !== definition.const) return false;
  if (definition.pattern && !new RegExp(definition.pattern, "u").test(value)) {
    return false;
  }
  return true;
}

function hasExactObjectShape(value, definition) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
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
  for (const field of [
    "contract_id",
    "contract_version",
    "packet_ref",
    "handoff_posture",
  ]) {
    if (!matchesDefinition(candidate[field], schema.properties[field])) return false;
  }

  const componentDefinition = schema.$defs.componentRefs;
  if (!hasExactObjectShape(candidate.component_refs, componentDefinition)) {
    return false;
  }
  return expectedComponentFields.every((field) =>
    matchesDefinition(
      candidate.component_refs[field],
      componentDefinition.properties[field],
    ),
  );
}

function createComponents(overrides = {}) {
  return {
    source_register_ref: "hro_source_register_001",
    review_chronology_ref: "hro_review_chronology_001",
    asserted_claim_matrix_ref: "hro_asserted_claim_matrix_001",
    declared_packet_review_gaps_ref: "hro_declared_review_gaps_001",
    human_review_questions_ref: "hro_human_review_questions_001",
    no_conclusion_notice_ref: "hro_no_conclusion_notice_001",
    ...overrides,
  };
}

function createBrief(overrides = {}) {
  return {
    contract_id: "human_review.controlled_handoff_brief",
    contract_version: "1.0.0",
    packet_ref: "pkt_review_001",
    handoff_posture: "HANDOFF_CANDIDATE_ONLY",
    component_refs: createComponents(),
    ...overrides,
  };
}

test("schema metadata root order and local componentRefs definition are exact", () => {
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
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-brief.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Brief Contract Scaffold",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
  assert.deepEqual(schema.required, expectedRootFields);
  assert.deepEqual(Object.keys(schema.properties), expectedRootFields);
  assert.deepEqual(Object.keys(schema.$defs), ["componentRefs"]);
  assert.deepEqual(Object.keys(schema.$defs.componentRefs), [
    "type",
    "additionalProperties",
    "required",
    "properties",
  ]);
  assert.equal(schema.$defs.componentRefs.type, "object");
  assert.equal(schema.$defs.componentRefs.additionalProperties, false);
  assert.deepEqual(
    schema.$defs.componentRefs.required,
    expectedComponentFields,
  );
  assert.deepEqual(
    Object.keys(schema.$defs.componentRefs.properties),
    expectedComponentFields,
  );
});

test("one exact distinct-reference handoff candidate is structurally valid", () => {
  const schema = require(schemaPath);

  assert.equal(validateAgainstSchemaContract(schema, createBrief()), true);
});

test("root literals packet pattern and common component pattern are exact", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.properties.contract_id, {
    type: "string",
    const: "human_review.controlled_handoff_brief",
  });
  assert.deepEqual(schema.properties.contract_version, {
    type: "string",
    const: "1.0.0",
  });
  assert.deepEqual(schema.properties.packet_ref, {
    type: "string",
    pattern: "^pkt_[a-z0-9][a-z0-9_-]{0,59}$",
  });
  assert.deepEqual(schema.properties.handoff_posture, {
    type: "string",
    const: "HANDOFF_CANDIDATE_ONLY",
  });
  assert.deepEqual(schema.properties.component_refs, {
    $ref: "#/$defs/componentRefs",
  });
  for (const field of expectedComponentFields) {
    assert.deepEqual(schema.$defs.componentRefs.properties[field], {
      type: "string",
      pattern: componentPattern,
    });
  }
});

test("missing and additional root fields are rejected by the closed shape", () => {
  const schema = require(schemaPath);
  const valid = createBrief();

  for (const field of expectedRootFields) {
    const candidate = { ...valid };
    delete candidate[field];
    assert.equal(validateAgainstSchemaContract(schema, candidate), false, field);
  }
  assert.equal(
    validateAgainstSchemaContract(schema, { ...valid, extra: "blocked" }),
    false,
  );
});

test("missing and additional component-reference fields are rejected", () => {
  const schema = require(schemaPath);
  const validComponents = createComponents();

  for (const field of expectedComponentFields) {
    const component_refs = { ...validComponents };
    delete component_refs[field];
    assert.equal(
      validateAgainstSchemaContract(schema, createBrief({ component_refs })),
      false,
      field,
    );
  }
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createBrief({
        component_refs: { ...validComponents, extra_ref: "hro_extra_001" },
      }),
    ),
    false,
  );
});

test("wrong literals types packet syntax and component syntax fail closed", () => {
  const schema = require(schemaPath);

  for (const [field, invalidValue] of [
    ["contract_id", "human_review.other"],
    ["contract_version", "2.0.0"],
    ["packet_ref", "packet_review_001"],
    ["packet_ref", "pkt_REVIEW"],
    ["handoff_posture", "READY"],
    ["contract_id", null],
    ["contract_version", 1],
    ["packet_ref", false],
    ["handoff_posture", {}],
    ["component_refs", null],
    ["component_refs", []],
    ["component_refs", "hro_not_an_object"],
  ]) {
    assert.equal(
      validateAgainstSchemaContract(schema, createBrief({ [field]: invalidValue })),
      false,
      field + ":" + String(invalidValue),
    );
  }

  for (const field of expectedComponentFields) {
    for (const invalidValue of ["", "src_wrong_family_001", "hro_UPPER", 1, null, {}]) {
      assert.equal(
        validateAgainstSchemaContract(
          schema,
          createBrief({
            component_refs: createComponents({ [field]: invalidValue }),
          }),
        ),
        false,
        field + ":" + String(invalidValue),
      );
    }
  }
});

test("null arrays inline objects free text and lifecycle metadata stay outside", () => {
  const schema = require(schemaPath);

  for (const candidate of [null, [], "candidate", 1, false]) {
    assert.equal(validateAgainstSchemaContract(schema, candidate), false);
  }
  for (const field of [
    "summary",
    "narrative",
    "source_register",
    "actor_ref",
    "timestamp",
    "signature",
    "approval",
    "export",
    "delivery",
    "recipient",
    "revision",
    "extensions",
  ]) {
    assert.equal(
      validateAgainstSchemaContract(schema, {
        ...createBrief(),
        [field]: "blocked",
      }),
      false,
      field,
    );
  }
  for (const field of ["label", "content", "source_locator", "approval", "extensions"]) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createBrief({
          component_refs: { ...createComponents(), [field]: "blocked" },
        }),
      ),
      false,
      field,
    );
  }
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createBrief({
        component_refs: createComponents({ source_register_ref: {} }),
      }),
    ),
    false,
  );
});

test("candidate property insertion order does not alter schema validity", () => {
  const schema = require(schemaPath);
  const canonical = createBrief();
  const reversedComponents = Object.fromEntries(
    [...expectedComponentFields]
      .reverse()
      .map((field) => [field, canonical.component_refs[field]]),
  );
  const reversedRoot = {
    component_refs: reversedComponents,
    handoff_posture: canonical.handoff_posture,
    packet_ref: canonical.packet_ref,
    contract_version: canonical.contract_version,
    contract_id: canonical.contract_id,
  };

  assert.deepEqual(Object.keys(reversedRoot), [...expectedRootFields].reverse());
  assert.deepEqual(
    Object.keys(reversedComponents),
    [...expectedComponentFields].reverse(),
  );
  assert.equal(validateAgainstSchemaContract(schema, reversedRoot), true);
  assert.deepEqual(schema.required, expectedRootFields);
  assert.deepEqual(schema.$defs.componentRefs.required, expectedComponentFields);
});

test("duplicate component-reference values remain schema-valid", () => {
  const schema = require(schemaPath);
  const duplicateComponents = Object.fromEntries(
    expectedComponentFields.map((field) => [field, "hro_duplicate_001"]),
  );
  const componentDefinition = schema.$defs.componentRefs;

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createBrief({ component_refs: duplicateComponents }),
    ),
    true,
  );
  for (const keyword of ["uniqueItems", "allOf", "anyOf", "oneOf", "if", "then"]) {
    assert.equal(Object.hasOwn(componentDefinition, keyword), false, keyword);
  }
});

test("arbitrary distinct opaque component tokens remain schema-valid", () => {
  const schema = require(schemaPath);
  const arbitraryComponents = {
    source_register_ref: "hro_unregistered_alpha",
    review_chronology_ref: "hro_unregistered_beta",
    asserted_claim_matrix_ref: "hro_unregistered_gamma",
    declared_packet_review_gaps_ref: "hro_unregistered_delta",
    human_review_questions_ref: "hro_unregistered_epsilon",
    no_conclusion_notice_ref: "hro_unregistered_zeta",
  };
  const schemaText = readRequired(schemaPath);

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createBrief({ component_refs: arbitraryComponents }),
    ),
    true,
  );
  for (const familyPattern of ["^src_", "^chr_", "^clm_", "^gap_", "^qst_", "^ncn_"]) {
    assert.equal(schemaText.includes(familyPattern), false, familyPattern);
  }
  assert.equal(schemaText.includes("$data"), false);
});

test("schema stays runtime-neutral and anchored to tracked boundaries", () => {
  const schemaText = readRequired(schemaPath);
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);
  const packageExportTransitionText = readRequired(packageExportTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultTransitionPath,
  );
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );

  readRequired(__filename);
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
  for (const historicalPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + historicalPath + "`"),
      true,
      historicalPath,
    );
  }
  for (const retainedPath of retainedCrossReferencePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
    assert.equal(
      crossReferenceProofTransitionText.includes("\`" + retainedPath + "\`"),
      true,
      retainedPath,
    );
  }
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n18/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.equal(
    packageExportTransitionText.includes("`packages/schemas/src/index.js`"),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes("`humanReviewControlledHandoffBrief`"),
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
  for (const fragment of [
    "duplicate_component_ref",
    "contractKind",
    "errors",
    "approval",
    "recipient",
    "delivery",
    "runtime",
    "persistence",
    "api",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
  assert.match(
    contractText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_CONTRACT_SEMANTICS_FROZEN_SCHEMA_VALIDATOR_CROSS_REFERENCE_APPROVAL_AND_RUNTIME_NOT_CREATED/u,
  );
  assert.match(
    scopeText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_SCAFFOLD_SCOPE_STATUS:\nTRACKED_DOCS_ONLY_EXACT_TWO_FILE_FUTURE_SCHEMA_SCOPE_FROZEN/u,
  );
  assert.match(scopeText, /FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:\n11/u);
  assert.match(
    scopeText,
    /FUTURE_SCHEMA_PAIRWISE_COMPONENT_REFERENCE_UNIQUENESS_KEYWORD:\nNONE/u,
  );
  assert.match(scopeText, /PACKAGE_EXPORT_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED/u);
  assert.match(
    scopeText,
    /CROSS_REFERENCE_SURFACES_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED/u,
  );
  for (const limit of [
    /plain-object or\naccessor behavior/u,
    /cycle handling/u,
    /no mutation/u,
    /validator error ordering/u,
    /cross-contract token membership/u,
    /packet equality/u,
    /component-family identity/u,
    /candidate assembly/u,
    /human review/u,
    /approval/u,
    /handoff/u,
    /delivery/u,
    /substantive\ncandidate meaning/u,
  ]) {
    assert.match(scopeText, limit);
  }
  assert.match(
    transitionText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_FIRST_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
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
  assert.match(
    validatorResultTransitionText,
    /TRACKED_CONTRACT_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    packageExportTransitionText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(
    packageExportTransitionText,
    /one focused scope-proof alignment remains before package schema export/u,
  );
});
