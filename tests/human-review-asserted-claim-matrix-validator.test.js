"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const validatorModule = require("../packages/schemas/src/human-review-asserted-claim-matrix-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");
const resultSchema = require("../schemas/human-review-asserted-claim-matrix-validator-result.json");

const { validateHumanReviewAssertedClaimMatrix } = validatorModule;
const validatorPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "human-review-asserted-claim-matrix-validator.js",
);
const packageIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "index.js",
);
const scaffoldPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

function createClaim(overrides = {}) {
  return {
    claim_ref: "clm_alpha",
    review_state: "ASSERTED",
    asserted_claim_text: "Asserted claim text",
    supplied_material_observation_text: null,
    source_refs: ["src_alpha"],
    chronology_entry_refs: [],
    ...overrides,
  };
}

function createMatrix(overrides = {}) {
  return {
    contract_id: "human_review.asserted_claim_matrix",
    contract_version: "1.0.0",
    packet_ref: "pkt_alpha",
    claims: [],
    ...overrides,
  };
}

function expectedResult(errors = []) {
  return {
    valid: errors.length === 0,
    contractKind: "HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors,
  };
}

function matchesStringRule(value, rule) {
  if (Object.hasOwn(rule, "const") && value !== rule.const) {
    return false;
  }
  if (rule.enum && !rule.enum.includes(value)) {
    return false;
  }
  if (rule.pattern && !new RegExp(rule.pattern, "u").test(value)) {
    return false;
  }
  if (rule.oneOf && !rule.oneOf.some((branch) => matchesStringRule(value, branch))) {
    return false;
  }
  return true;
}

function matchesErrorContract(error) {
  if (
    error === null ||
    typeof error !== "object" ||
    Array.isArray(error) ||
    Object.getPrototypeOf(error) !== Object.prototype ||
    !Object.isFrozen(error) ||
    JSON.stringify(Object.keys(error)) !== JSON.stringify(["code", "path"])
  ) {
    return false;
  }

  return resultSchema.properties.errors.items.oneOf.some(
    (branch) =>
      matchesStringRule(error.code, branch.properties.code) &&
      matchesStringRule(error.path, branch.properties.path),
  );
}

function matchesResultContract(result) {
  if (
    result === null ||
    typeof result !== "object" ||
    Array.isArray(result) ||
    JSON.stringify(Object.keys(result)) !==
      JSON.stringify(["valid", "contractKind", "version", "errors"]) ||
    result.contractKind !== resultSchema.properties.contractKind.const ||
    result.version !== resultSchema.properties.version.const ||
    !Array.isArray(result.errors) ||
    !Object.isFrozen(result) ||
    !Object.isFrozen(result.errors) ||
    !result.errors.every(matchesErrorContract)
  ) {
    return false;
  }

  const pairs = result.errors.map((error) => `${error.code}\u0000${error.path}`);
  return (
    new Set(pairs).size === pairs.length &&
    result.valid === (result.errors.length === 0)
  );
}

test("module exports exactly one internal unary validator", () => {
  assert.deepEqual(Object.keys(validatorModule), [
    "validateHumanReviewAssertedClaimMatrix",
  ]);
  assert.equal(typeof validateHumanReviewAssertedClaimMatrix, "function");
  assert.equal(validateHumanReviewAssertedClaimMatrix.length, 1);

  for (const exportName of [
    "humanReviewAssertedClaimMatrixValidator",
    "validateHumanReviewAssertedClaimMatrix",
    "getHumanReviewAssertedClaimMatrixValidator",
    "humanReviewAssertedClaimMatrixValidatorRegistry",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }
});

test("valid empty and populated matrices return exact frozen successes", () => {
  const emptyResult = validateHumanReviewAssertedClaimMatrix(createMatrix());
  const populatedResult = validateHumanReviewAssertedClaimMatrix(
    createMatrix({
      claims: [
        createClaim(),
        createClaim({
          claim_ref: "clm_beta",
          review_state: "APPEARS_IN_SUPPLIED_MATERIAL",
          asserted_claim_text: "Second asserted claim",
          supplied_material_observation_text: " Appears in supplied material ",
          source_refs: ["src_beta", "src_gamma"],
          chronology_entry_refs: ["chr_beta", "chr_gamma"],
        }),
        createClaim({
          claim_ref: "clm_gamma",
          review_state: "NOT_ESTABLISHED",
          source_refs: ["src_alpha"],
          chronology_entry_refs: ["chr_beta"],
        }),
        createClaim({
          claim_ref: "clm_delta",
          review_state: "HUMAN_REVIEW_REQUIRED",
          supplied_material_observation_text: "Review note",
        }),
      ],
    }),
  );

  assert.deepEqual(emptyResult, expectedResult());
  assert.deepEqual(populatedResult, expectedResult());
  assert.equal(matchesResultContract(emptyResult), true);
  assert.equal(matchesResultContract(populatedResult), true);
});

test("null-prototype root and claim row remain valid plain objects", () => {
  const root = Object.assign(Object.create(null), createMatrix());
  const claim = Object.assign(Object.create(null), createClaim());
  root.claims = [claim];

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(root),
    expectedResult(),
  );
});

test("root type gate short-circuits every non-plain candidate", () => {
  const customPrototype = Object.create({ inherited: true });
  Object.assign(customPrototype, createMatrix());

  for (const candidate of [
    null,
    undefined,
    false,
    1,
    "matrix",
    [],
    new Date(0),
    () => {},
    customPrototype,
  ]) {
    assert.deepEqual(
      validateHumanReviewAssertedClaimMatrix(candidate),
      expectedResult([{ code: "invalid_field_type", path: "$" }]),
    );
  }
});

test("root errors follow missing unknown type and value phase order", () => {
  const candidate = {
    contract_id: "wrong",
    packet_ref: 7,
    claims: "not-an-array",
    hidden_unknown: "must-not-echo",
  };

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(candidate),
    expectedResult([
      { code: "required_field_missing", path: "$.contract_version" },
      { code: "unexpected_field", path: "$" },
      { code: "invalid_field_type", path: "$.packet_ref" },
      { code: "invalid_field_type", path: "$.claims" },
      { code: "invalid_field_value", path: "$.contract_id" },
    ]),
  );
});

test("root identity version and packet reference values fail in canonical order", () => {
  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(
      createMatrix({
        contract_id: "wrong",
        contract_version: "v1",
        packet_ref: "PKT_NOT_ALLOWED",
      }),
    ),
    expectedResult([
      { code: "invalid_field_value", path: "$.contract_id" },
      { code: "invalid_field_value", path: "$.contract_version" },
      { code: "invalid_field_value", path: "$.packet_ref" },
    ]),
  );
});

test("claim errors follow index then missing unknown type value coupling and reference order", () => {
  const claims = [
    null,
    {},
    {
      claim_ref: 9,
      review_state: "SEEN",
      asserted_claim_text: "",
      supplied_material_observation_text: 7,
      source_refs: [9, "INVALID"],
      chronology_entry_refs: [9, "INVALID"],
      secret_field: "never-echo-this",
    },
  ];

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(createMatrix({ claims })),
    expectedResult([
      { code: "invalid_field_type", path: "$.claims[0]" },
      { code: "required_field_missing", path: "$.claims[1].claim_ref" },
      { code: "required_field_missing", path: "$.claims[1].review_state" },
      {
        code: "required_field_missing",
        path: "$.claims[1].asserted_claim_text",
      },
      {
        code: "required_field_missing",
        path: "$.claims[1].supplied_material_observation_text",
      },
      { code: "required_field_missing", path: "$.claims[1].source_refs" },
      {
        code: "required_field_missing",
        path: "$.claims[1].chronology_entry_refs",
      },
      { code: "unexpected_field", path: "$.claims[2]" },
      { code: "invalid_field_type", path: "$.claims[2].claim_ref" },
      {
        code: "invalid_field_type",
        path: "$.claims[2].supplied_material_observation_text",
      },
      { code: "invalid_field_value", path: "$.claims[2].review_state" },
      {
        code: "invalid_field_value",
        path: "$.claims[2].asserted_claim_text",
      },
      { code: "invalid_field_type", path: "$.claims[2].source_refs[0]" },
      { code: "invalid_field_value", path: "$.claims[2].source_refs[1]" },
      {
        code: "invalid_field_type",
        path: "$.claims[2].chronology_entry_refs[0]",
      },
      {
        code: "invalid_field_value",
        path: "$.claims[2].chronology_entry_refs[1]",
      },
    ]),
  );
});

test("review-state observation coupling is exact and invalid text is not double-reported", () => {
  const cases = [
    {
      overrides: { supplied_material_observation_text: "Observed" },
      errors: [
        {
          code: "state_observation_mismatch",
          path: "$.claims[0].supplied_material_observation_text",
        },
      ],
    },
    {
      overrides: {
        review_state: "APPEARS_IN_SUPPLIED_MATERIAL",
        supplied_material_observation_text: null,
      },
      errors: [
        {
          code: "state_observation_mismatch",
          path: "$.claims[0].supplied_material_observation_text",
        },
      ],
    },
    {
      overrides: {
        review_state: "APPEARS_IN_SUPPLIED_MATERIAL",
        supplied_material_observation_text: "",
      },
      errors: [
        {
          code: "invalid_field_value",
          path: "$.claims[0].supplied_material_observation_text",
        },
      ],
    },
    {
      overrides: {
        review_state: "NOT_ESTABLISHED",
        supplied_material_observation_text: "Observed",
      },
      errors: [
        {
          code: "state_observation_mismatch",
          path: "$.claims[0].supplied_material_observation_text",
        },
      ],
    },
    {
      overrides: {
        review_state: "HUMAN_REVIEW_REQUIRED",
        supplied_material_observation_text: "",
      },
      errors: [
        {
          code: "invalid_field_value",
          path: "$.claims[0].supplied_material_observation_text",
        },
      ],
    },
  ];

  for (const { overrides, errors } of cases) {
    assert.deepEqual(
      validateHumanReviewAssertedClaimMatrix(
        createMatrix({ claims: [createClaim(overrides)] }),
      ),
      expectedResult(errors),
    );
  }

  for (const supplied_material_observation_text of [null, "Review note"]) {
    assert.deepEqual(
      validateHumanReviewAssertedClaimMatrix(
        createMatrix({
          claims: [
            createClaim({
              review_state: "HUMAN_REVIEW_REQUIRED",
              supplied_material_observation_text,
            }),
          ],
        }),
      ),
      expectedResult(),
    );
  }
});

test("non-empty text is preserved without trimming or normalization", () => {
  const emoji = "\u{1F600}";
  const claim = createClaim({
    review_state: "APPEARS_IN_SUPPLIED_MATERIAL",
    asserted_claim_text: "   ",
    supplied_material_observation_text: ` ${emoji} `,
  });
  const candidate = createMatrix({ claims: [claim] });
  const before = JSON.stringify(candidate);

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(candidate),
    expectedResult(),
  );
  assert.equal(JSON.stringify(candidate), before);

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(
      createMatrix({ claims: [createClaim({ asserted_claim_text: "" })] }),
    ),
    expectedResult([
      {
        code: "invalid_field_value",
        path: "$.claims[0].asserted_claim_text",
      },
    ]),
  );
});

test("reference arrays enforce cardinality and validate items by index", () => {
  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(
      createMatrix({ claims: [createClaim({ source_refs: [] })] }),
    ),
    expectedResult([
      { code: "invalid_field_value", path: "$.claims[0].source_refs" },
    ]),
  );

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(
      createMatrix({
        claims: [
          createClaim({
            source_refs: [8, "INVALID", "src_valid"],
            chronology_entry_refs: [8, "INVALID", "chr_valid"],
          }),
        ],
      }),
    ),
    expectedResult([
      { code: "invalid_field_type", path: "$.claims[0].source_refs[0]" },
      { code: "invalid_field_value", path: "$.claims[0].source_refs[1]" },
      {
        code: "invalid_field_type",
        path: "$.claims[0].chronology_entry_refs[0]",
      },
      {
        code: "invalid_field_value",
        path: "$.claims[0].chronology_entry_refs[1]",
      },
    ]),
  );
});

test("duplicates follow all structure checks in claim source and chronology phases", () => {
  const claims = [
    createClaim({
      claim_ref: "clm_repeat",
      source_refs: ["src_repeat", "src_repeat"],
      chronology_entry_refs: ["chr_repeat", "chr_repeat"],
    }),
    createClaim({
      claim_ref: "clm_repeat",
      asserted_claim_text: "",
      source_refs: ["src_second", "src_second"],
      chronology_entry_refs: ["chr_second", "chr_second"],
    }),
    createClaim({
      claim_ref: "clm_repeat",
      review_state: "SEEN",
      source_refs: ["src_repeat"],
      chronology_entry_refs: ["chr_repeat"],
    }),
  ];

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(createMatrix({ claims })),
    expectedResult([
      {
        code: "invalid_field_value",
        path: "$.claims[1].asserted_claim_text",
      },
      { code: "invalid_field_value", path: "$.claims[2].review_state" },
      { code: "duplicate_claim_ref", path: "$.claims[1].claim_ref" },
      { code: "duplicate_claim_ref", path: "$.claims[2].claim_ref" },
      { code: "duplicate_source_ref", path: "$.claims[0].source_refs[1]" },
      { code: "duplicate_source_ref", path: "$.claims[1].source_refs[1]" },
      {
        code: "duplicate_chronology_entry_ref",
        path: "$.claims[0].chronology_entry_refs[1]",
      },
      {
        code: "duplicate_chronology_entry_ref",
        path: "$.claims[1].chronology_entry_refs[1]",
      },
    ]),
  );
});

test("invalid references never participate and valid reuse across rows is allowed", () => {
  const claims = [
    createClaim({
      claim_ref: "INVALID",
      source_refs: ["INVALID", "INVALID"],
      chronology_entry_refs: ["INVALID", "INVALID"],
    }),
    createClaim({
      claim_ref: "INVALID",
      source_refs: ["src_shared"],
      chronology_entry_refs: ["chr_shared"],
    }),
    createClaim({
      claim_ref: "clm_valid",
      source_refs: ["src_valid", "src_valid"],
      chronology_entry_refs: ["chr_valid", "chr_valid"],
    }),
    createClaim({
      claim_ref: "clm_valid",
      source_refs: ["src_shared", "src_valid"],
      chronology_entry_refs: ["chr_shared", "chr_valid"],
    }),
  ];

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(createMatrix({ claims })),
    expectedResult([
      { code: "invalid_field_value", path: "$.claims[0].claim_ref" },
      { code: "invalid_field_value", path: "$.claims[0].source_refs[0]" },
      { code: "invalid_field_value", path: "$.claims[0].source_refs[1]" },
      {
        code: "invalid_field_value",
        path: "$.claims[0].chronology_entry_refs[0]",
      },
      {
        code: "invalid_field_value",
        path: "$.claims[0].chronology_entry_refs[1]",
      },
      { code: "invalid_field_value", path: "$.claims[1].claim_ref" },
      { code: "duplicate_claim_ref", path: "$.claims[3].claim_ref" },
      { code: "duplicate_source_ref", path: "$.claims[2].source_refs[1]" },
      {
        code: "duplicate_chronology_entry_ref",
        path: "$.claims[2].chronology_entry_refs[1]",
      },
    ]),
  );
});

test("unknown string symbol and non-enumerable keys aggregate without echo", () => {
  const root = createMatrix();
  const claim = createClaim();
  const rootSymbol = Symbol("root-secret-symbol");
  const claimSymbol = Symbol("claim-secret-symbol");

  root.root_secret = "root-secret-value";
  root[rootSymbol] = "symbol-secret-value";
  Object.defineProperty(root, "root_hidden", {
    value: "hidden-secret-value",
    enumerable: false,
  });
  claim.claim_secret = "claim-secret-value";
  claim[claimSymbol] = "claim-symbol-secret-value";
  Object.defineProperty(claim, "claim_hidden", {
    value: "claim-hidden-secret-value",
    enumerable: false,
  });
  root.claims = [claim];

  const result = validateHumanReviewAssertedClaimMatrix(root);
  const serialized = JSON.stringify(result);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "unexpected_field", path: "$" },
      { code: "unexpected_field", path: "$.claims[0]" },
    ]),
  );
  for (const secret of [
    "root_secret",
    "root-secret-value",
    "root_hidden",
    "claim_secret",
    "claim-secret-value",
    "claim_hidden",
  ]) {
    assert.equal(serialized.includes(secret), false, secret);
  }
});

test("root claim array-index and reference-item accessors are never invoked", () => {
  let rootGetterCalls = 0;
  let claimGetterCalls = 0;
  let claimSetterCalls = 0;
  let claimIndexGetterCalls = 0;
  let sourceIndexGetterCalls = 0;
  let chronologyIndexGetterCalls = 0;
  const root = createMatrix();
  const firstClaim = createClaim();
  const thirdClaim = createClaim({ claim_ref: "clm_third" });
  const sourceReferences = [];
  const chronologyReferences = [];

  Object.defineProperty(root, "contract_id", {
    get() {
      rootGetterCalls += 1;
      return "human_review.asserted_claim_matrix";
    },
    enumerable: true,
  });
  Object.defineProperty(firstClaim, "claim_ref", {
    get() {
      claimGetterCalls += 1;
      return "clm_first";
    },
    enumerable: true,
  });
  Object.defineProperty(firstClaim, "asserted_claim_text", {
    set(_value) {
      claimSetterCalls += 1;
    },
    enumerable: true,
  });
  sourceReferences.length = 1;
  Object.defineProperty(sourceReferences, "0", {
    get() {
      sourceIndexGetterCalls += 1;
      return "src_third";
    },
    enumerable: true,
  });
  chronologyReferences.length = 1;
  Object.defineProperty(chronologyReferences, "0", {
    get() {
      chronologyIndexGetterCalls += 1;
      return "chr_third";
    },
    enumerable: true,
  });
  thirdClaim.source_refs = sourceReferences;
  thirdClaim.chronology_entry_refs = chronologyReferences;

  const claims = [];
  claims.length = 3;
  claims[0] = firstClaim;
  Object.defineProperty(claims, "1", {
    get() {
      claimIndexGetterCalls += 1;
      return createClaim({ claim_ref: "clm_second" });
    },
    enumerable: true,
  });
  claims[2] = thirdClaim;
  root.claims = claims;

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(root),
    expectedResult([
      { code: "invalid_field_type", path: "$.contract_id" },
      { code: "invalid_field_type", path: "$.claims[0].claim_ref" },
      {
        code: "invalid_field_type",
        path: "$.claims[0].asserted_claim_text",
      },
      { code: "invalid_field_type", path: "$.claims[1]" },
      { code: "invalid_field_type", path: "$.claims[2].source_refs[0]" },
      {
        code: "invalid_field_type",
        path: "$.claims[2].chronology_entry_refs[0]",
      },
    ]),
  );
  assert.equal(rootGetterCalls, 0);
  assert.equal(claimGetterCalls, 0);
  assert.equal(claimSetterCalls, 0);
  assert.equal(claimIndexGetterCalls, 0);
  assert.equal(sourceIndexGetterCalls, 0);
  assert.equal(chronologyIndexGetterCalls, 0);
});

test("sparse positions fail by index while extra array properties are ignored", () => {
  const sourceReferences = new Array(2);
  sourceReferences[1] = "src_second";
  sourceReferences.array_secret = "source-array-secret";
  const chronologyReferences = new Array(2);
  chronologyReferences[1] = "chr_second";
  chronologyReferences.array_secret = "chronology-array-secret";
  const claims = new Array(2);
  claims[1] = createClaim({
    source_refs: sourceReferences,
    chronology_entry_refs: chronologyReferences,
  });
  claims.array_secret = "claim-array-secret";

  const result = validateHumanReviewAssertedClaimMatrix(
    createMatrix({ claims }),
  );
  const serialized = JSON.stringify(result);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "invalid_field_type", path: "$.claims[0]" },
      { code: "invalid_field_type", path: "$.claims[1].source_refs[0]" },
      {
        code: "invalid_field_type",
        path: "$.claims[1].chronology_entry_refs[0]",
      },
    ]),
  );
  assert.equal(serialized.includes("array_secret"), false);
  assert.equal(serialized.includes("source-array-secret"), false);
  assert.equal(serialized.includes("chronology-array-secret"), false);
  assert.equal(serialized.includes("claim-array-secret"), false);
});

test("canonical non-enumerable data properties remain valid", () => {
  const claim = {};
  for (const [field, value] of Object.entries(createClaim())) {
    Object.defineProperty(claim, field, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  const root = {};
  for (const [field, value] of Object.entries(
    createMatrix({ claims: [claim] }),
  )) {
    Object.defineProperty(root, field, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(root),
    expectedResult(),
  );
});

test("candidate insertion order never changes deterministic error order", () => {
  const first = {
    hidden: "secret",
    claims: 4,
    packet_ref: 3,
  };
  const second = {
    packet_ref: 3,
    hidden: "secret",
    claims: 4,
  };

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(first),
    validateHumanReviewAssertedClaimMatrix(second),
  );
});

test("cyclic candidates fail structurally without recursion or mutation", () => {
  const candidate = createMatrix();
  candidate.claims = [candidate];
  const originalClaims = candidate.claims;

  assert.deepEqual(
    validateHumanReviewAssertedClaimMatrix(candidate),
    expectedResult([
      { code: "required_field_missing", path: "$.claims[0].claim_ref" },
      { code: "required_field_missing", path: "$.claims[0].review_state" },
      {
        code: "required_field_missing",
        path: "$.claims[0].asserted_claim_text",
      },
      {
        code: "required_field_missing",
        path: "$.claims[0].supplied_material_observation_text",
      },
      { code: "required_field_missing", path: "$.claims[0].source_refs" },
      {
        code: "required_field_missing",
        path: "$.claims[0].chronology_entry_refs",
      },
      { code: "unexpected_field", path: "$.claims[0]" },
    ]),
  );
  assert.strictEqual(candidate.claims, originalClaims);
  assert.strictEqual(candidate.claims[0], candidate);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.claims), false);
});

test("normal candidates arrays rows and reference arrays remain unmodified", () => {
  const candidate = createMatrix({
    claims: [
      createClaim(),
      createClaim({
        claim_ref: "clm_second",
        source_refs: ["src_second", "src_third"],
        chronology_entry_refs: ["chr_second", "chr_third"],
      }),
    ],
  });
  const before = JSON.stringify(candidate);

  validateHumanReviewAssertedClaimMatrix(candidate);

  assert.equal(JSON.stringify(candidate), before);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.claims), false);
  assert.equal(Object.isFrozen(candidate.claims[0]), false);
  assert.equal(Object.isFrozen(candidate.claims[0].source_refs), false);
  assert.equal(
    Object.isFrozen(candidate.claims[1].chronology_entry_refs),
    false,
  );
});

test("success and failure results are recursively immutable", () => {
  const success = validateHumanReviewAssertedClaimMatrix(createMatrix());
  const failure = validateHumanReviewAssertedClaimMatrix(null);

  for (const result of [success, failure]) {
    assert.equal(Object.isFrozen(result), true);
    assert.equal(Object.isFrozen(result.errors), true);
    assert.equal(result.errors.every(Object.isFrozen), true);
    assert.throws(() => {
      result.valid = !result.valid;
    }, TypeError);
    assert.throws(() => {
      result.errors.push({ code: "unexpected_field", path: "$" });
    }, TypeError);
  }
});

test("representative outputs conform to the tracked result contract", () => {
  const outputs = [
    validateHumanReviewAssertedClaimMatrix(createMatrix()),
    validateHumanReviewAssertedClaimMatrix(null),
    validateHumanReviewAssertedClaimMatrix(
      createMatrix({
        claims: [
          createClaim({ claim_ref: "clm_repeat" }),
          createClaim({ claim_ref: "clm_repeat" }),
        ],
      }),
    ),
  ];

  assert.equal(outputs.every(matchesResultContract), true);
});

test("module source remains statically schema-bound and integration-free", () => {
  const source = fs.readFileSync(validatorPath, "utf8");

  assert.match(
    source,
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-asserted-claim-matrix\.json"\)/u,
  );
  assert.match(
    source,
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-asserted-claim-matrix-validator-result\.json"\)/u,
  );
  for (const forbidden of [
    /require\(["'](?:node:)?fs/u,
    /process\.env/u,
    /\bfetch\s*\(/u,
    /\bhttps?\b/u,
    /console\./u,
    /localStorage/u,
    /database/u,
    /provider/u,
    /telemetry/u,
    /human-review-source-register/iu,
    /human-review-chronology-validator/iu,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});

test("package index remains unchanged and scope boundaries stay anchored", () => {
  const packageIndex = fs.readFileSync(packageIndexPath, "utf8");
  const scaffoldText = fs.readFileSync(scaffoldPath, "utf8");
  const transitionText = fs.readFileSync(transitionPath, "utf8");

  assert.equal((packageIndex.match(/\n/gu) ?? []).length, 13165);
  assert.equal(
    packageIndex.includes("human-review-asserted-claim-matrix-validator.js"),
    false,
  );
  assert.equal(
    packageIndex.includes("validateHumanReviewAssertedClaimMatrix"),
    false,
  );
  assert.match(
    scaffoldText,
    /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u,
  );
  assert.match(scaffoldText, /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    transitionText,
    /RETAINED_CROSS_REFERENCE_CHECKPOINT_ABSENCE_COUNT:\n1/u,
  );
});
