"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const candidateSchema = require("../schemas/human-review-controlled-handoff-brief.json");
const resultSchema = require(
  "../schemas/human-review-controlled-handoff-brief-validator-result.json",
);
const validatorModule = require(
  "../packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
);
const packageSchemas = require("../packages/schemas/src/index.js");

const { validateHumanReviewControlledHandoffBrief } = validatorModule;
const repoRoot = path.join(__dirname, "..");
const modulePath =
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js";
const proofPath =
  "tests/human-review-controlled-handoff-brief-validator.test.js";
const scaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const transitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const selfTransitionHardeningPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_SCAFFOLD_PROOF_SELF_TRANSITION_HARDENING_BOUNDARY_v1.md";
const componentFields = [...candidateSchema.$defs.componentRefs.required];
const resultRules = new Map(
  resultSchema.properties.errors.items.oneOf.map((branch) => [
    branch.properties.code.const,
    new Set(branch.properties.path.enum),
  ]),
);

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

function createComponentRefs(overrides = {}) {
  return {
    source_register_ref: "hro_source_1",
    review_chronology_ref: "hro_chronology_1",
    asserted_claim_matrix_ref: "hro_claims_1",
    declared_packet_review_gaps_ref: "hro_gaps_1",
    human_review_questions_ref: "hro_questions_1",
    no_conclusion_notice_ref: "hro_notice_1",
    ...overrides,
  };
}

function createCandidate(overrides = {}) {
  return {
    contract_id: "human_review.controlled_handoff_brief",
    contract_version: "1.0.0",
    packet_ref: "pkt_controlled_handoff_1",
    handoff_posture: "HANDOFF_CANDIDATE_ONLY",
    component_refs: createComponentRefs(),
    ...overrides,
  };
}

function expectedResult(errors = []) {
  return {
    valid: errors.length === 0,
    contractKind: "HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors,
  };
}

function assertConformsToResultSchema(result) {
  assert.deepEqual(Object.keys(result), resultSchema.required);
  assert.equal(typeof result.valid, "boolean");
  assert.equal(result.contractKind, resultSchema.properties.contractKind.const);
  assert.equal(result.version, resultSchema.properties.version.const);
  assert.equal(Array.isArray(result.errors), true);
  assert.equal(result.valid, result.errors.length === 0);

  const exactPairs = new Set();
  for (const error of result.errors) {
    assert.deepEqual(Object.keys(error), ["code", "path"]);
    assert.equal(typeof error.code, "string");
    assert.equal(typeof error.path, "string");
    assert.equal(resultRules.has(error.code), true, error.code);
    assert.equal(resultRules.get(error.code).has(error.path), true, error.path);
    const pair = `${error.code}\u0000${error.path}`;
    assert.equal(exactPairs.has(pair), false, pair);
    exactPairs.add(pair);
  }
}

function assertErrors(candidate, errors) {
  const result = validateHumanReviewControlledHandoffBrief(candidate);
  assert.deepEqual(result, expectedResult(errors));
  assertConformsToResultSchema(result);
  return result;
}

function defineDataProperties(entries) {
  const value = Object.create(null);
  for (const [key, entryValue] of entries) {
    Object.defineProperty(value, key, {
      value: entryValue,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }
  return value;
}

test("module exposes exactly one unary internal validator", () => {
  assert.deepEqual(Object.keys(validatorModule), [
    "validateHumanReviewControlledHandoffBrief",
  ]);
  assert.equal(typeof validateHumanReviewControlledHandoffBrief, "function");
  assert.equal(validateHumanReviewControlledHandoffBrief.length, 1);
  assert.equal(
    Object.hasOwn(packageSchemas, "validateHumanReviewControlledHandoffBrief"),
    false,
  );
  assert.equal(
    Object.hasOwn(packageSchemas, "humanReviewControlledHandoffBriefValidator"),
    false,
  );
});

test("valid canonical and null-prototype candidates return exact frozen successes", () => {
  const canonical = createCandidate();
  const canonicalResult = assertErrors(canonical, []);

  const nullPrototypeComponents = Object.assign(
    Object.create(null),
    createComponentRefs(),
  );
  const nullPrototypeCandidate = Object.assign(
    Object.create(null),
    createCandidate({ component_refs: nullPrototypeComponents }),
  );
  assertErrors(nullPrototypeCandidate, []);

  assert.equal(Object.isFrozen(canonicalResult), true);
  assert.equal(Object.isFrozen(canonicalResult.errors), true);
  assert.equal(Object.isFrozen(canonical), false);
  assert.equal(Object.isFrozen(canonical.component_refs), false);
});

test("canonical non-enumerable data properties remain valid", () => {
  const components = defineDataProperties(
    Object.entries(createComponentRefs()),
  );
  const candidate = defineDataProperties(
    Object.entries(createCandidate({ component_refs: components })),
  );

  assertErrors(candidate, []);
});

test("root type gate short-circuits all non-plain and trap-backed candidates", () => {
  const customPrototype = Object.create({ inherited: true });
  const getPrototypeTrap = new Proxy({}, {
    getPrototypeOf() {
      throw new Error("secret prototype failure");
    },
  });
  const descriptorTrap = new Proxy({}, {
    ownKeys() {
      throw new Error("secret descriptor failure");
    },
  });
  const revocable = Proxy.revocable({}, {});
  revocable.revoke();

  for (const candidate of [
    null,
    undefined,
    true,
    1,
    "candidate",
    Symbol("candidate"),
    [],
    new Date(),
    () => {},
    customPrototype,
    getPrototypeTrap,
    descriptorTrap,
    revocable.proxy,
  ]) {
    assertErrors(candidate, [{ code: "invalid_field_type", path: "$" }]);
  }
});

test("root errors follow missing unknown type then value phase order", () => {
  const candidate = {
    unknown: "do-not-echo",
    contract_id: 1,
    contract_version: "2.0.0",
    packet_ref: "bad packet",
    handoff_posture: null,
  };

  assertErrors(candidate, [
    { code: "required_field_missing", path: "$.component_refs" },
    { code: "unexpected_field", path: "$" },
    { code: "invalid_field_type", path: "$.contract_id" },
    { code: "invalid_field_type", path: "$.handoff_posture" },
    { code: "invalid_field_value", path: "$.contract_version" },
    { code: "invalid_field_value", path: "$.packet_ref" },
  ]);
});

test("missing root fields are emitted in canonical schema order", () => {
  assertErrors({}, [
    { code: "required_field_missing", path: "$.contract_id" },
    { code: "required_field_missing", path: "$.contract_version" },
    { code: "required_field_missing", path: "$.packet_ref" },
    { code: "required_field_missing", path: "$.handoff_posture" },
    { code: "required_field_missing", path: "$.component_refs" },
  ]);
});

test("root constants and packet pattern fail in canonical order", () => {
  assertErrors(
    createCandidate({
      contract_id: "human_review.other",
      contract_version: "2.0.0",
      packet_ref: "pkt_BAD",
      handoff_posture: "APPROVED",
    }),
    [
      { code: "invalid_field_value", path: "$.contract_id" },
      { code: "invalid_field_value", path: "$.contract_version" },
      { code: "invalid_field_value", path: "$.packet_ref" },
      { code: "invalid_field_value", path: "$.handoff_posture" },
    ],
  );
});

test("unknown root keys aggregate without key or value echo", () => {
  const candidate = createCandidate();
  candidate.secret_alpha = "PRIVATE-ALPHA";
  Object.defineProperty(candidate, "secret_beta", {
    value: "PRIVATE-BETA",
    enumerable: false,
  });
  candidate[Symbol("PRIVATE-SYMBOL")] = "PRIVATE-VALUE";

  const result = assertErrors(candidate, [
    { code: "unexpected_field", path: "$" },
  ]);
  const serialized = JSON.stringify(result);
  for (const secret of [
    "secret_alpha",
    "secret_beta",
    "PRIVATE-ALPHA",
    "PRIVATE-BETA",
    "PRIVATE-SYMBOL",
    "PRIVATE-VALUE",
  ]) {
    assert.equal(serialized.includes(secret), false, secret);
  }
});

test("root accessors are rejected without invocation", () => {
  let getterCalls = 0;
  let setterCalls = 0;
  const candidate = createCandidate();

  for (const field of candidateSchema.required) {
    Object.defineProperty(candidate, field, {
      get() {
        getterCalls += 1;
        return "PRIVATE-GETTER";
      },
      set() {
        setterCalls += 1;
      },
      enumerable: true,
      configurable: true,
    });
  }

  assertErrors(candidate, [
    { code: "invalid_field_type", path: "$.contract_id" },
    { code: "invalid_field_type", path: "$.contract_version" },
    { code: "invalid_field_type", path: "$.packet_ref" },
    { code: "invalid_field_type", path: "$.handoff_posture" },
    { code: "invalid_field_type", path: "$.component_refs" },
  ]);
  assert.equal(getterCalls, 0);
  assert.equal(setterCalls, 0);
});

test("component gate emits one bounded error and suppresses nested checks", () => {
  const customPrototype = Object.create({ inherited: true });
  const getPrototypeTrap = new Proxy({}, {
    getPrototypeOf() {
      throw new Error("component prototype trap");
    },
  });
  const descriptorTrap = new Proxy({}, {
    ownKeys() {
      throw new Error("component descriptor trap");
    },
  });

  for (const componentRefs of [
    null,
    true,
    1,
    "components",
    [],
    new Date(),
    () => {},
    customPrototype,
    getPrototypeTrap,
    descriptorTrap,
  ]) {
    assertErrors(createCandidate({ component_refs: componentRefs }), [
      { code: "invalid_field_type", path: "$.component_refs" },
    ]);
  }
});

test("missing and unknown component fields precede component type and value errors", () => {
  const components = {
    source_register_ref: 1,
    review_chronology_ref: "bad chronology",
    unknown_component: "PRIVATE-COMPONENT",
  };

  assertErrors(createCandidate({ component_refs: components }), [
    {
      code: "required_field_missing",
      path: "$.component_refs.asserted_claim_matrix_ref",
    },
    {
      code: "required_field_missing",
      path: "$.component_refs.declared_packet_review_gaps_ref",
    },
    {
      code: "required_field_missing",
      path: "$.component_refs.human_review_questions_ref",
    },
    {
      code: "required_field_missing",
      path: "$.component_refs.no_conclusion_notice_ref",
    },
    { code: "unexpected_field", path: "$.component_refs" },
    {
      code: "invalid_field_type",
      path: "$.component_refs.source_register_ref",
    },
    {
      code: "invalid_field_value",
      path: "$.component_refs.review_chronology_ref",
    },
  ]);
});

test("component type errors precede pattern errors in canonical field order", () => {
  const components = createComponentRefs({
    source_register_ref: 1,
    review_chronology_ref: "bad-review",
    asserted_claim_matrix_ref: null,
    declared_packet_review_gaps_ref: "bad-gaps",
    human_review_questions_ref: [],
    no_conclusion_notice_ref: "bad-notice",
  });

  assertErrors(createCandidate({ component_refs: components }), [
    {
      code: "invalid_field_type",
      path: "$.component_refs.source_register_ref",
    },
    {
      code: "invalid_field_type",
      path: "$.component_refs.asserted_claim_matrix_ref",
    },
    {
      code: "invalid_field_type",
      path: "$.component_refs.human_review_questions_ref",
    },
    {
      code: "invalid_field_value",
      path: "$.component_refs.review_chronology_ref",
    },
    {
      code: "invalid_field_value",
      path: "$.component_refs.declared_packet_review_gaps_ref",
    },
    {
      code: "invalid_field_value",
      path: "$.component_refs.no_conclusion_notice_ref",
    },
  ]);
});

test("component accessors are rejected without invocation", () => {
  let getterCalls = 0;
  let setterCalls = 0;
  const components = createComponentRefs();

  for (const field of componentFields) {
    Object.defineProperty(components, field, {
      get() {
        getterCalls += 1;
        return "hro_private";
      },
      set() {
        setterCalls += 1;
      },
      enumerable: true,
      configurable: true,
    });
  }

  assertErrors(
    createCandidate({ component_refs: components }),
    componentFields.map((field) => ({
      code: "invalid_field_type",
      path: `$.component_refs.${field}`,
    })),
  );
  assert.equal(getterCalls, 0);
  assert.equal(setterCalls, 0);
});

test("unknown component keys aggregate without echo", () => {
  const components = createComponentRefs();
  components.secret_component = "PRIVATE-COMPONENT";
  components[Symbol("PRIVATE-COMPONENT-SYMBOL")] = "PRIVATE-COMPONENT-VALUE";

  const result = assertErrors(createCandidate({ component_refs: components }), [
    { code: "unexpected_field", path: "$.component_refs" },
  ]);
  const serialized = JSON.stringify(result);
  for (const secret of [
    "secret_component",
    "PRIVATE-COMPONENT",
    "PRIVATE-COMPONENT-SYMBOL",
    "PRIVATE-COMPONENT-VALUE",
  ]) {
    assert.equal(serialized.includes(secret), false, secret);
  }
});

test("pairwise duplicates preserve first valid token and flag every later field", () => {
  const duplicate = "hro_duplicate_1";
  const components = Object.fromEntries(
    componentFields.map((field) => [field, duplicate]),
  );

  assertErrors(
    createCandidate({ component_refs: components }),
    componentFields.slice(1).map((field) => ({
      code: "duplicate_component_ref",
      path: `$.component_refs.${field}`,
    })),
  );
});

test("duplicate checks use canonical later-field order", () => {
  const values = [
    "hro_alpha",
    "hro_beta",
    "hro_alpha",
    "hro_beta",
    "hro_alpha",
    "hro_gamma",
  ];
  const components = Object.fromEntries(
    componentFields.map((field, index) => [field, values[index]]),
  );

  assertErrors(createCandidate({ component_refs: components }), [
    {
      code: "duplicate_component_ref",
      path: "$.component_refs.asserted_claim_matrix_ref",
    },
    {
      code: "duplicate_component_ref",
      path: "$.component_refs.declared_packet_review_gaps_ref",
    },
    {
      code: "duplicate_component_ref",
      path: "$.component_refs.human_review_questions_ref",
    },
  ]);
});

test("invalid component references never participate in duplicate detection", () => {
  const components = Object.fromEntries(
    componentFields.map((field) => [field, "invalid duplicate"]),
  );

  assertErrors(
    createCandidate({ component_refs: components }),
    componentFields.map((field) => ({
      code: "invalid_field_value",
      path: `$.component_refs.${field}`,
    })),
  );
});

test("opaque component tokens remain family-neutral", () => {
  const components = Object.fromEntries(
    componentFields.map((field, index) => [field, `hro_neutral_${index + 1}`]),
  );

  assertErrors(createCandidate({ component_refs: components }), []);
});

test("candidate insertion order never changes deterministic error order", () => {
  const forwardComponents = {
    source_register_ref: "bad-source",
    review_chronology_ref: "bad-review",
    asserted_claim_matrix_ref: "bad-claims",
    declared_packet_review_gaps_ref: "bad-gaps",
    human_review_questions_ref: "bad-questions",
    no_conclusion_notice_ref: "bad-notice",
  };
  const reversedComponents = Object.fromEntries(
    Object.entries(forwardComponents).reverse(),
  );
  const forward = createCandidate({
    contract_id: "bad",
    component_refs: forwardComponents,
  });
  const reversed = Object.fromEntries(
    Object.entries(
      createCandidate({ contract_id: "bad", component_refs: reversedComponents }),
    ).reverse(),
  );

  assert.deepEqual(
    validateHumanReviewControlledHandoffBrief(forward),
    validateHumanReviewControlledHandoffBrief(reversed),
  );
});

test("cyclic candidates fail structurally without recursion or echo", () => {
  const candidate = createCandidate();
  candidate.component_refs = candidate;

  const result = validateHumanReviewControlledHandoffBrief(candidate);
  assert.equal(result.valid, false);
  assertConformsToResultSchema(result);
  assert.equal(JSON.stringify(result).includes("pkt_controlled_handoff_1"), false);
  assert.equal(
    result.errors.some((error) => error.path === "$.component_refs"),
    true,
  );
});

test("normal candidates remain unmodified", () => {
  const candidate = createCandidate();
  const before = JSON.stringify(candidate);

  validateHumanReviewControlledHandoffBrief(candidate);

  assert.equal(JSON.stringify(candidate), before);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.component_refs), false);
});

test("success and failure results are recursively immutable and isolated", () => {
  const success = validateHumanReviewControlledHandoffBrief(createCandidate());
  const failure = validateHumanReviewControlledHandoffBrief({});
  const secondFailure = validateHumanReviewControlledHandoffBrief({});

  for (const result of [success, failure]) {
    assert.equal(Object.isFrozen(result), true);
    assert.equal(Object.isFrozen(result.errors), true);
    for (const error of result.errors) {
      assert.equal(Object.isFrozen(error), true);
    }
  }
  assert.notStrictEqual(failure, secondFailure);
  assert.notStrictEqual(failure.errors, secondFailure.errors);
  assert.notStrictEqual(failure.errors[0], secondFailure.errors[0]);
});

test("representative outputs conform to the tracked result contract", () => {
  for (const candidate of [
    createCandidate(),
    {},
    createCandidate({ component_refs: null }),
    createCandidate({
      component_refs: createComponentRefs({
        no_conclusion_notice_ref: "hro_source_1",
      }),
    }),
  ]) {
    assertConformsToResultSchema(
      validateHumanReviewControlledHandoffBrief(candidate),
    );
  }
});

test("module source remains statically schema-bound and integration-free", () => {
  const sourceText = readRequired(modulePath);

  assert.equal(
    sourceText.includes(
      'require("../../../schemas/human-review-controlled-handoff-brief.json")',
    ),
    true,
  );
  assert.equal(
    sourceText.includes(
      'require("../../../schemas/human-review-controlled-handoff-brief-validator-result.json")',
    ),
    true,
  );
  for (const forbidden of [
    "node:fs",
    "process.env",
    "fetch(",
    "XMLHttpRequest",
    "packages/governance",
    "cross-reference-validation-boundary",
    "console.",
    "logger",
    "telemetry",
    "database",
  ]) {
    assert.equal(sourceText.includes(forbidden), false, forbidden);
  }
});

test("package index and tracked scope boundaries remain unchanged", () => {
  const packageIndexText = readRequired("packages/schemas/src/index.js");
  const scaffoldText = readRequired(scaffoldPath);
  const transitionText = readRequired(transitionPath);
  const selfTransitionHardeningText = readRequired(selfTransitionHardeningPath);

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.equal(
    packageIndexText.includes(
      'require("./human-review-controlled-handoff-brief-validator.js")',
    ),
    false,
  );
  assert.equal(packageIndexText.includes("validateHumanReviewControlledHandoffBrief"), false);
  assert.equal(scaffoldText.includes("`" + modulePath + "`"), true);
  assert.equal(scaffoldText.includes("`" + proofPath + "`"), true);
  assert.match(scaffoldText, /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(
    transitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n18/u,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    selfTransitionHardeningText,
    /SCAFFOLD_PROOF_SELF_CREATED_LIVE_ABSENCE_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    selfTransitionHardeningText,
    /TRACKED_DOCS_ONLY_SCAFFOLD_PROOF_SELF_TRANSITION_HARDENING_COMPLETE/u,
  );
});
