"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const validatorModule = require("../packages/schemas/src/human-review-declared-packet-review-gaps-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");
const resultSchema = require("../schemas/human-review-declared-packet-review-gaps-validator-result.json");

const { validateHumanReviewDeclaredPacketReviewGaps } = validatorModule;
const validatorPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "human-review-declared-packet-review-gaps-validator.js",
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

function createGap(overrides = {}) {
  return {
    gap_ref: "gap_alpha",
    declaration_origin: "HUMAN_DECLARED",
    declared_gap_text: "Declared review gap",
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
    packet_ref: "pkt_alpha",
    gaps: [],
    ...overrides,
  };
}

function expectedResult(errors = []) {
  return {
    valid: errors.length === 0,
    contractKind:
      "HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_BOUNDARY",
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
  if (
    rule.oneOf &&
    !rule.oneOf.some((branch) => matchesStringRule(value, branch))
  ) {
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
    "validateHumanReviewDeclaredPacketReviewGaps",
  ]);
  assert.equal(
    typeof validateHumanReviewDeclaredPacketReviewGaps,
    "function",
  );
  assert.equal(validateHumanReviewDeclaredPacketReviewGaps.length, 1);

  for (const exportName of [
    "humanReviewDeclaredPacketReviewGapsValidator",
    "validateHumanReviewDeclaredPacketReviewGaps",
    "getHumanReviewDeclaredPacketReviewGapsValidator",
    "humanReviewDeclaredPacketReviewGapsValidatorRegistry",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }
});

test("valid empty and populated packets return exact frozen successes", () => {
  const emptyResult = validateHumanReviewDeclaredPacketReviewGaps(
    createPacket(),
  );
  const populatedResult = validateHumanReviewDeclaredPacketReviewGaps(
    createPacket({
      gaps: [
        createGap({
          source_refs: ["src_alpha", "src_beta"],
          chronology_entry_refs: ["chr_alpha"],
          claim_refs: ["clm_alpha"],
        }),
        createGap({
          gap_ref: "gap_beta",
          declared_gap_text: "  A second declared gap  ",
          source_refs: ["src_alpha"],
          chronology_entry_refs: ["chr_alpha"],
          claim_refs: ["clm_alpha", "clm_beta"],
        }),
      ],
    }),
  );

  assert.deepEqual(emptyResult, expectedResult());
  assert.deepEqual(populatedResult, expectedResult());
  assert.equal(matchesResultContract(emptyResult), true);
  assert.equal(matchesResultContract(populatedResult), true);
});

test("null-prototype root and gap row remain valid plain objects", () => {
  const root = Object.assign(Object.create(null), createPacket());
  const gap = Object.assign(Object.create(null), createGap());
  root.gaps = [gap];

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(root),
    expectedResult(),
  );
});

test("root type gate and descriptor snapshot fail closed", () => {
  const customPrototype = Object.create({ inherited: true });
  Object.assign(customPrototype, createPacket());
  const descriptorFailure = new Proxy(createPacket(), {
    ownKeys() {
      throw new Error("must fail closed");
    },
  });

  for (const candidate of [
    null,
    undefined,
    false,
    1,
    "packet",
    [],
    new Date(0),
    () => {},
    customPrototype,
    descriptorFailure,
  ]) {
    assert.deepEqual(
      validateHumanReviewDeclaredPacketReviewGaps(candidate),
      expectedResult([{ code: "invalid_field_type", path: "$" }]),
    );
  }
});

test("root errors follow missing unknown type and value phase order", () => {
  const candidate = {
    contract_id: "wrong",
    packet_ref: 7,
    gaps: "not-an-array",
    hidden_unknown: "must-not-echo",
  };

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(candidate),
    expectedResult([
      { code: "required_field_missing", path: "$.contract_version" },
      { code: "unexpected_field", path: "$" },
      { code: "invalid_field_type", path: "$.packet_ref" },
      { code: "invalid_field_type", path: "$.gaps" },
      { code: "invalid_field_value", path: "$.contract_id" },
    ]),
  );
});

test("root identity version and packet reference values fail canonically", () => {
  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(
      createPacket({
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

test("gap errors follow row structure then reference item phase order", () => {
  const gaps = [
    null,
    {},
    {
      gap_ref: 9,
      declaration_origin: "MODEL_DECLARED",
      declared_gap_text: "",
      source_refs: [9, "INVALID"],
      chronology_entry_refs: [9, "INVALID"],
      claim_refs: [9, "INVALID"],
      secret_field: "never-echo-this",
    },
  ];

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(createPacket({ gaps })),
    expectedResult([
      { code: "invalid_field_type", path: "$.gaps[0]" },
      { code: "required_field_missing", path: "$.gaps[1].gap_ref" },
      {
        code: "required_field_missing",
        path: "$.gaps[1].declaration_origin",
      },
      {
        code: "required_field_missing",
        path: "$.gaps[1].declared_gap_text",
      },
      { code: "required_field_missing", path: "$.gaps[1].source_refs" },
      {
        code: "required_field_missing",
        path: "$.gaps[1].chronology_entry_refs",
      },
      { code: "required_field_missing", path: "$.gaps[1].claim_refs" },
      { code: "unexpected_field", path: "$.gaps[2]" },
      { code: "invalid_field_type", path: "$.gaps[2].gap_ref" },
      {
        code: "invalid_field_value",
        path: "$.gaps[2].declaration_origin",
      },
      {
        code: "invalid_field_value",
        path: "$.gaps[2].declared_gap_text",
      },
      { code: "invalid_field_type", path: "$.gaps[2].source_refs[0]" },
      { code: "invalid_field_value", path: "$.gaps[2].source_refs[1]" },
      {
        code: "invalid_field_type",
        path: "$.gaps[2].chronology_entry_refs[0]",
      },
      {
        code: "invalid_field_value",
        path: "$.gaps[2].chronology_entry_refs[1]",
      },
      { code: "invalid_field_type", path: "$.gaps[2].claim_refs[0]" },
      { code: "invalid_field_value", path: "$.gaps[2].claim_refs[1]" },
    ]),
  );
});

test("declared text uses inclusive Unicode code-point bounds without rewriting", () => {
  const emoji = "\u{1F600}";
  const boundaryText = emoji.repeat(1000);
  const candidate = createPacket({
    gaps: [createGap({ declared_gap_text: ` ${emoji} ` })],
  });
  const before = JSON.stringify(candidate);

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(candidate),
    expectedResult(),
  );
  assert.equal(JSON.stringify(candidate), before);
  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(
      createPacket({ gaps: [createGap({ declared_gap_text: "   " })] }),
    ),
    expectedResult(),
  );
  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(
      createPacket({ gaps: [createGap({ declared_gap_text: boundaryText })] }),
    ),
    expectedResult(),
  );

  for (const declaredGapText of ["", `${boundaryText}${emoji}`]) {
    assert.deepEqual(
      validateHumanReviewDeclaredPacketReviewGaps(
        createPacket({
          gaps: [createGap({ declared_gap_text: declaredGapText })],
        }),
      ),
      expectedResult([
        {
          code: "invalid_field_value",
          path: "$.gaps[0].declared_gap_text",
        },
      ]),
    );
  }
});

test("reference arrays may be empty and validate items by field then index", () => {
  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(
      createPacket({ gaps: [createGap()] }),
    ),
    expectedResult(),
  );

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(
      createPacket({
        gaps: [
          createGap({
            source_refs: [8, "INVALID", "src_valid"],
            chronology_entry_refs: [8, "INVALID", "chr_valid"],
            claim_refs: [8, "INVALID", "clm_valid"],
          }),
        ],
      }),
    ),
    expectedResult([
      { code: "invalid_field_type", path: "$.gaps[0].source_refs[0]" },
      { code: "invalid_field_value", path: "$.gaps[0].source_refs[1]" },
      {
        code: "invalid_field_type",
        path: "$.gaps[0].chronology_entry_refs[0]",
      },
      {
        code: "invalid_field_value",
        path: "$.gaps[0].chronology_entry_refs[1]",
      },
      { code: "invalid_field_type", path: "$.gaps[0].claim_refs[0]" },
      { code: "invalid_field_value", path: "$.gaps[0].claim_refs[1]" },
    ]),
  );
});

test("duplicates follow all structure and item checks in canonical phases", () => {
  const gaps = [
    createGap({
      gap_ref: "gap_repeat",
      source_refs: ["src_repeat", "src_repeat"],
      chronology_entry_refs: ["chr_repeat", "chr_repeat"],
      claim_refs: ["clm_repeat", "clm_repeat"],
    }),
    createGap({
      gap_ref: "gap_repeat",
      declared_gap_text: "",
      source_refs: ["src_second", "src_second"],
      chronology_entry_refs: ["chr_second", "chr_second"],
      claim_refs: ["clm_second", "clm_second"],
    }),
    createGap({
      gap_ref: "gap_repeat",
      declaration_origin: "OTHER",
      source_refs: ["src_repeat"],
      chronology_entry_refs: ["chr_repeat"],
      claim_refs: ["clm_repeat"],
    }),
  ];

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(createPacket({ gaps })),
    expectedResult([
      {
        code: "invalid_field_value",
        path: "$.gaps[1].declared_gap_text",
      },
      {
        code: "invalid_field_value",
        path: "$.gaps[2].declaration_origin",
      },
      { code: "duplicate_gap_ref", path: "$.gaps[1].gap_ref" },
      { code: "duplicate_gap_ref", path: "$.gaps[2].gap_ref" },
      {
        code: "duplicate_source_ref",
        path: "$.gaps[0].source_refs[1]",
      },
      {
        code: "duplicate_chronology_entry_ref",
        path: "$.gaps[0].chronology_entry_refs[1]",
      },
      {
        code: "duplicate_claim_ref",
        path: "$.gaps[0].claim_refs[1]",
      },
      {
        code: "duplicate_source_ref",
        path: "$.gaps[1].source_refs[1]",
      },
      {
        code: "duplicate_chronology_entry_ref",
        path: "$.gaps[1].chronology_entry_refs[1]",
      },
      {
        code: "duplicate_claim_ref",
        path: "$.gaps[1].claim_refs[1]",
      },
    ]),
  );
});

test("invalid references do not participate and valid reuse remains local", () => {
  const gaps = [
    createGap({
      gap_ref: "INVALID",
      source_refs: ["INVALID", "INVALID"],
      chronology_entry_refs: ["INVALID", "INVALID"],
      claim_refs: ["INVALID", "INVALID"],
    }),
    createGap({
      gap_ref: "INVALID",
      source_refs: ["src_shared"],
      chronology_entry_refs: ["chr_shared"],
      claim_refs: ["clm_shared"],
    }),
    createGap({
      gap_ref: "gap_valid",
      source_refs: ["src_valid", "src_valid"],
      chronology_entry_refs: ["chr_valid", "chr_valid"],
      claim_refs: ["clm_valid", "clm_valid"],
    }),
    createGap({
      gap_ref: "gap_second",
      source_refs: ["src_shared", "src_valid"],
      chronology_entry_refs: ["chr_shared", "chr_valid"],
      claim_refs: ["clm_shared", "clm_valid"],
    }),
  ];

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(createPacket({ gaps })),
    expectedResult([
      { code: "invalid_field_value", path: "$.gaps[0].gap_ref" },
      { code: "invalid_field_value", path: "$.gaps[1].gap_ref" },
      { code: "invalid_field_value", path: "$.gaps[0].source_refs[0]" },
      { code: "invalid_field_value", path: "$.gaps[0].source_refs[1]" },
      {
        code: "invalid_field_value",
        path: "$.gaps[0].chronology_entry_refs[0]",
      },
      {
        code: "invalid_field_value",
        path: "$.gaps[0].chronology_entry_refs[1]",
      },
      { code: "invalid_field_value", path: "$.gaps[0].claim_refs[0]" },
      { code: "invalid_field_value", path: "$.gaps[0].claim_refs[1]" },
      {
        code: "duplicate_source_ref",
        path: "$.gaps[2].source_refs[1]",
      },
      {
        code: "duplicate_chronology_entry_ref",
        path: "$.gaps[2].chronology_entry_refs[1]",
      },
      {
        code: "duplicate_claim_ref",
        path: "$.gaps[2].claim_refs[1]",
      },
    ]),
  );
});

test("unknown string symbol and non-enumerable keys aggregate without echo", () => {
  const root = createPacket();
  const gap = createGap();
  const rootSymbol = Symbol("root-secret-symbol");
  const gapSymbol = Symbol("gap-secret-symbol");

  root.root_secret = "root-secret-value";
  root[rootSymbol] = "symbol-secret-value";
  Object.defineProperty(root, "root_hidden", {
    value: "hidden-secret-value",
    enumerable: false,
  });
  gap.gap_secret = "gap-secret-value";
  gap[gapSymbol] = "gap-symbol-secret-value";
  Object.defineProperty(gap, "gap_hidden", {
    value: "gap-hidden-secret-value",
    enumerable: false,
  });
  root.gaps = [gap];

  const result = validateHumanReviewDeclaredPacketReviewGaps(root);
  const serialized = JSON.stringify(result);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "unexpected_field", path: "$" },
      { code: "unexpected_field", path: "$.gaps[0]" },
    ]),
  );
  for (const secret of [
    "root_secret",
    "root-secret-value",
    "root_hidden",
    "gap_secret",
    "gap-secret-value",
    "gap_hidden",
  ]) {
    assert.equal(serialized.includes(secret), false, secret);
  }
});

test("root row array-index and reference-item accessors are never invoked", () => {
  let rootGetterCalls = 0;
  let gapGetterCalls = 0;
  let gapSetterCalls = 0;
  let gapIndexGetterCalls = 0;
  let sourceIndexGetterCalls = 0;
  let chronologyIndexGetterCalls = 0;
  let claimIndexGetterCalls = 0;
  const root = createPacket();
  const firstGap = createGap();
  const thirdGap = createGap({ gap_ref: "gap_third" });
  const sourceReferences = [];
  const chronologyReferences = [];
  const claimReferences = [];

  Object.defineProperty(root, "contract_id", {
    get() {
      rootGetterCalls += 1;
      return "human_review.declared_packet_review_gaps";
    },
    enumerable: true,
  });
  Object.defineProperty(firstGap, "gap_ref", {
    get() {
      gapGetterCalls += 1;
      return "gap_first";
    },
    enumerable: true,
  });
  Object.defineProperty(firstGap, "declared_gap_text", {
    set(_value) {
      gapSetterCalls += 1;
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
  claimReferences.length = 1;
  Object.defineProperty(claimReferences, "0", {
    get() {
      claimIndexGetterCalls += 1;
      return "clm_third";
    },
    enumerable: true,
  });
  thirdGap.source_refs = sourceReferences;
  thirdGap.chronology_entry_refs = chronologyReferences;
  thirdGap.claim_refs = claimReferences;

  const gaps = [];
  gaps.length = 3;
  gaps[0] = firstGap;
  Object.defineProperty(gaps, "1", {
    get() {
      gapIndexGetterCalls += 1;
      return createGap({ gap_ref: "gap_second" });
    },
    enumerable: true,
  });
  gaps[2] = thirdGap;
  root.gaps = gaps;

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(root),
    expectedResult([
      { code: "invalid_field_type", path: "$.contract_id" },
      { code: "invalid_field_type", path: "$.gaps[0].gap_ref" },
      {
        code: "invalid_field_type",
        path: "$.gaps[0].declared_gap_text",
      },
      { code: "invalid_field_type", path: "$.gaps[1]" },
      { code: "invalid_field_type", path: "$.gaps[2].source_refs[0]" },
      {
        code: "invalid_field_type",
        path: "$.gaps[2].chronology_entry_refs[0]",
      },
      { code: "invalid_field_type", path: "$.gaps[2].claim_refs[0]" },
    ]),
  );
  assert.equal(rootGetterCalls, 0);
  assert.equal(gapGetterCalls, 0);
  assert.equal(gapSetterCalls, 0);
  assert.equal(gapIndexGetterCalls, 0);
  assert.equal(sourceIndexGetterCalls, 0);
  assert.equal(chronologyIndexGetterCalls, 0);
  assert.equal(claimIndexGetterCalls, 0);
});

test("row and reference descriptor failures remain bounded", () => {
  const rowDescriptorFailure = new Proxy(createGap(), {
    ownKeys() {
      throw new Error("row snapshot denied");
    },
  });
  const referenceDescriptorFailure = new Proxy([], {
    ownKeys() {
      throw new Error("reference snapshot denied");
    },
  });

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(
      createPacket({
        gaps: [
          rowDescriptorFailure,
          createGap({
            gap_ref: "gap_second",
            source_refs: referenceDescriptorFailure,
          }),
        ],
      }),
    ),
    expectedResult([
      { code: "invalid_field_type", path: "$.gaps[0]" },
      { code: "invalid_field_type", path: "$.gaps[1].source_refs" },
    ]),
  );
});

test("sparse positions fail by index while extra array properties are ignored", () => {
  const sourceReferences = new Array(2);
  sourceReferences[1] = "src_second";
  sourceReferences.array_secret = "source-array-secret";
  const chronologyReferences = new Array(2);
  chronologyReferences[1] = "chr_second";
  chronologyReferences.array_secret = "chronology-array-secret";
  const claimReferences = new Array(2);
  claimReferences[1] = "clm_second";
  claimReferences.array_secret = "claim-array-secret";
  const gaps = new Array(2);
  gaps[1] = createGap({
    source_refs: sourceReferences,
    chronology_entry_refs: chronologyReferences,
    claim_refs: claimReferences,
  });
  gaps.array_secret = "gap-array-secret";

  const result = validateHumanReviewDeclaredPacketReviewGaps(
    createPacket({ gaps }),
  );
  const serialized = JSON.stringify(result);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "invalid_field_type", path: "$.gaps[0]" },
      { code: "invalid_field_type", path: "$.gaps[1].source_refs[0]" },
      {
        code: "invalid_field_type",
        path: "$.gaps[1].chronology_entry_refs[0]",
      },
      { code: "invalid_field_type", path: "$.gaps[1].claim_refs[0]" },
    ]),
  );
  for (const secret of [
    "array_secret",
    "source-array-secret",
    "chronology-array-secret",
    "claim-array-secret",
    "gap-array-secret",
  ]) {
    assert.equal(serialized.includes(secret), false, secret);
  }
});

test("canonical non-enumerable data properties remain valid", () => {
  const gap = {};
  for (const [field, value] of Object.entries(createGap())) {
    Object.defineProperty(gap, field, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  const root = {};
  for (const [field, value] of Object.entries(
    createPacket({ gaps: [gap] }),
  )) {
    Object.defineProperty(root, field, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(root),
    expectedResult(),
  );
});

test("candidate insertion order never changes deterministic error order", () => {
  const first = {
    hidden: "secret",
    gaps: 4,
    packet_ref: 3,
  };
  const second = {
    packet_ref: 3,
    hidden: "secret",
    gaps: 4,
  };

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(first),
    validateHumanReviewDeclaredPacketReviewGaps(second),
  );
});

test("cyclic candidates fail structurally without recursion or mutation", () => {
  const candidate = createPacket();
  candidate.gaps = [candidate];
  const originalGaps = candidate.gaps;

  assert.deepEqual(
    validateHumanReviewDeclaredPacketReviewGaps(candidate),
    expectedResult([
      { code: "required_field_missing", path: "$.gaps[0].gap_ref" },
      {
        code: "required_field_missing",
        path: "$.gaps[0].declaration_origin",
      },
      {
        code: "required_field_missing",
        path: "$.gaps[0].declared_gap_text",
      },
      { code: "required_field_missing", path: "$.gaps[0].source_refs" },
      {
        code: "required_field_missing",
        path: "$.gaps[0].chronology_entry_refs",
      },
      { code: "required_field_missing", path: "$.gaps[0].claim_refs" },
      { code: "unexpected_field", path: "$.gaps[0]" },
    ]),
  );
  assert.strictEqual(candidate.gaps, originalGaps);
  assert.strictEqual(candidate.gaps[0], candidate);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.gaps), false);
});

test("normal candidates arrays rows and reference arrays remain unmodified", () => {
  const candidate = createPacket({
    gaps: [
      createGap(),
      createGap({
        gap_ref: "gap_second",
        source_refs: ["src_second", "src_third"],
        chronology_entry_refs: ["chr_second", "chr_third"],
        claim_refs: ["clm_second", "clm_third"],
      }),
    ],
  });
  const before = JSON.stringify(candidate);

  validateHumanReviewDeclaredPacketReviewGaps(candidate);

  assert.equal(JSON.stringify(candidate), before);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.gaps), false);
  assert.equal(Object.isFrozen(candidate.gaps[0]), false);
  assert.equal(Object.isFrozen(candidate.gaps[1].source_refs), false);
  assert.equal(
    Object.isFrozen(candidate.gaps[1].chronology_entry_refs),
    false,
  );
  assert.equal(Object.isFrozen(candidate.gaps[1].claim_refs), false);
});

test("success and failure results are recursively immutable", () => {
  const success = validateHumanReviewDeclaredPacketReviewGaps(createPacket());
  const failure = validateHumanReviewDeclaredPacketReviewGaps(null);

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
    validateHumanReviewDeclaredPacketReviewGaps(createPacket()),
    validateHumanReviewDeclaredPacketReviewGaps(null),
    validateHumanReviewDeclaredPacketReviewGaps(
      createPacket({
        gaps: [
          createGap({ gap_ref: "gap_repeat" }),
          createGap({ gap_ref: "gap_repeat" }),
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
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-declared-packet-review-gaps\.json"\)/u,
  );
  assert.match(
    source,
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-declared-packet-review-gaps-validator-result\.json"\)/u,
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
    /human-review-source-register-validator/iu,
    /human-review-chronology-validator/iu,
    /human-review-asserted-claim-matrix-validator/iu,
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
    packageIndex.includes(
      "human-review-declared-packet-review-gaps-validator.js",
    ),
    false,
  );
  assert.equal(
    packageIndex.includes("validateHumanReviewDeclaredPacketReviewGaps"),
    false,
  );
  assert.match(
    scaffoldText,
    /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u,
  );
  assert.match(
    scaffoldText,
    /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    transitionText,
    /RETAINED_CROSS_REFERENCE_CHECKPOINT_ABSENCE_COUNT:\n2/u,
  );
});
