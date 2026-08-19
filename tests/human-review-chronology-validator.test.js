"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const validatorModule = require("../packages/schemas/src/human-review-chronology-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");
const resultSchema = require("../schemas/human-review-chronology-validator-result.json");

const { validateHumanReviewChronology } = validatorModule;
const validatorPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "human-review-chronology-validator.js",
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

function createEntry(overrides = {}) {
  return {
    entry_ref: "chr_alpha",
    review_state: "ASSERTED",
    temporal_status: "DECLARED",
    declared_temporal_text: "2026-07-14",
    review_text: "Declared review text",
    source_refs: ["src_alpha"],
    ...overrides,
  };
}

function createChronology(overrides = {}) {
  return {
    contract_id: "human_review.review_chronology",
    contract_version: "1.0.0",
    packet_ref: "pkt_alpha",
    entries: [],
    ...overrides,
  };
}

function expectedResult(errors = []) {
  return {
    valid: errors.length === 0,
    contractKind: "HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_BOUNDARY",
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

test("module exports exactly one unary validator with reference-equivalent package exposure", () => {
  assert.deepEqual(Object.keys(validatorModule), [
    "validateHumanReviewChronology",
  ]);
  assert.equal(typeof validateHumanReviewChronology, "function");
  assert.equal(validateHumanReviewChronology.length, 1);

  assert.strictEqual(
    packageSchemas.validateHumanReviewChronology,
    validateHumanReviewChronology,
  );
  for (const exportName of [
    "humanReviewChronologyValidator",
    "getHumanReviewChronologyValidator",
    "humanReviewChronologyValidatorRegistry",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }
});

test("valid empty and populated chronologies return exact frozen successes", () => {
  const emptyResult = validateHumanReviewChronology(createChronology());
  const populatedResult = validateHumanReviewChronology(
    createChronology({
      entries: [
        createEntry(),
        createEntry({
          entry_ref: "chr_beta-2",
          review_state: "APPEARS_IN_SUPPLIED_MATERIAL",
          temporal_status: "UNKNOWN",
          declared_temporal_text: null,
          review_text: "Second review entry",
          source_refs: ["src_alpha", "src_beta"],
        }),
      ],
    }),
  );

  assert.deepEqual(emptyResult, expectedResult());
  assert.deepEqual(populatedResult, expectedResult());
  assert.equal(matchesResultContract(emptyResult), true);
  assert.equal(matchesResultContract(populatedResult), true);
});

test("null-prototype root and chronology entry remain valid plain objects", () => {
  const root = Object.assign(Object.create(null), createChronology());
  const entry = Object.assign(Object.create(null), createEntry());
  root.entries = [entry];

  assert.deepEqual(validateHumanReviewChronology(root), expectedResult());
});

test("root type gate short-circuits every non-plain candidate", () => {
  const customPrototype = Object.create({ inherited: true });
  Object.assign(customPrototype, createChronology());

  for (const candidate of [
    null,
    undefined,
    false,
    1,
    "chronology",
    [],
    new Date(0),
    () => {},
    customPrototype,
  ]) {
    assert.deepEqual(
      validateHumanReviewChronology(candidate),
      expectedResult([{ code: "invalid_field_type", path: "$" }]),
    );
  }
});

test("root errors follow missing unknown type and value phase order", () => {
  const candidate = {
    contract_id: "wrong",
    packet_ref: 7,
    entries: "not-an-array",
    hidden_unknown: "must-not-echo",
  };

  assert.deepEqual(
    validateHumanReviewChronology(candidate),
    expectedResult([
      { code: "required_field_missing", path: "$.contract_version" },
      { code: "unexpected_field", path: "$" },
      { code: "invalid_field_type", path: "$.packet_ref" },
      { code: "invalid_field_type", path: "$.entries" },
      { code: "invalid_field_value", path: "$.contract_id" },
    ]),
  );
});

test("root identity version and packet reference values fail in canonical order", () => {
  assert.deepEqual(
    validateHumanReviewChronology(
      createChronology({
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

test("entry errors follow index then missing unknown type value coupling and source order", () => {
  const entries = [
    null,
    {},
    {
      entry_ref: 9,
      review_state: "SEEN",
      temporal_status: "LATER",
      declared_temporal_text: " padded ",
      review_text: " ",
      source_refs: [9, "INVALID"],
      secret_field: "never-echo-this",
    },
  ];

  assert.deepEqual(
    validateHumanReviewChronology(createChronology({ entries })),
    expectedResult([
      { code: "invalid_field_type", path: "$.entries[0]" },
      { code: "required_field_missing", path: "$.entries[1].entry_ref" },
      { code: "required_field_missing", path: "$.entries[1].review_state" },
      {
        code: "required_field_missing",
        path: "$.entries[1].temporal_status",
      },
      {
        code: "required_field_missing",
        path: "$.entries[1].declared_temporal_text",
      },
      { code: "required_field_missing", path: "$.entries[1].review_text" },
      { code: "required_field_missing", path: "$.entries[1].source_refs" },
      { code: "unexpected_field", path: "$.entries[2]" },
      { code: "invalid_field_type", path: "$.entries[2].entry_ref" },
      { code: "invalid_field_value", path: "$.entries[2].review_state" },
      { code: "invalid_field_value", path: "$.entries[2].temporal_status" },
      {
        code: "invalid_field_value",
        path: "$.entries[2].declared_temporal_text",
      },
      { code: "invalid_field_value", path: "$.entries[2].review_text" },
      {
        code: "invalid_field_type",
        path: "$.entries[2].source_refs[0]",
      },
      {
        code: "invalid_field_value",
        path: "$.entries[2].source_refs[1]",
      },
    ]),
  );
});

test("temporal coupling is exact and duplicate code-path pairs collapse", () => {
  const cases = [
    {
      overrides: { declared_temporal_text: null },
      errors: [
        {
          code: "invalid_field_value",
          path: "$.entries[0].declared_temporal_text",
        },
      ],
    },
    {
      overrides: {
        temporal_status: "UNKNOWN",
        declared_temporal_text: "2026-07-14",
      },
      errors: [
        {
          code: "invalid_field_value",
          path: "$.entries[0].declared_temporal_text",
        },
      ],
    },
    {
      overrides: {
        temporal_status: "LATER",
        declared_temporal_text: null,
      },
      errors: [
        {
          code: "invalid_field_value",
          path: "$.entries[0].temporal_status",
        },
        {
          code: "invalid_field_value",
          path: "$.entries[0].declared_temporal_text",
        },
      ],
    },
    {
      overrides: { declared_temporal_text: " padded " },
      errors: [
        {
          code: "invalid_field_value",
          path: "$.entries[0].declared_temporal_text",
        },
      ],
    },
  ];

  for (const { overrides, errors } of cases) {
    assert.deepEqual(
      validateHumanReviewChronology(
        createChronology({ entries: [createEntry(overrides)] }),
      ),
      expectedResult(errors),
    );
  }
});

test("source reference arrays require one item and validate items by index", () => {
  assert.deepEqual(
    validateHumanReviewChronology(
      createChronology({ entries: [createEntry({ source_refs: [] })] }),
    ),
    expectedResult([
      { code: "invalid_field_value", path: "$.entries[0].source_refs" },
    ]),
  );

  assert.deepEqual(
    validateHumanReviewChronology(
      createChronology({
        entries: [createEntry({ source_refs: [8, "INVALID", "src_valid"] })],
      }),
    ),
    expectedResult([
      { code: "invalid_field_type", path: "$.entries[0].source_refs[0]" },
      { code: "invalid_field_value", path: "$.entries[0].source_refs[1]" },
    ]),
  );
});

test("duplicates are reported after structure in entry then source phases", () => {
  const entries = [
    createEntry({
      entry_ref: "chr_repeat",
      source_refs: ["src_repeat", "src_repeat"],
    }),
    createEntry({
      entry_ref: "chr_repeat",
      review_text: " bad ",
      source_refs: ["src_second", "src_second"],
    }),
    createEntry({
      entry_ref: "chr_repeat",
      review_state: "SEEN",
      source_refs: ["src_repeat"],
    }),
  ];

  assert.deepEqual(
    validateHumanReviewChronology(createChronology({ entries })),
    expectedResult([
      { code: "invalid_field_value", path: "$.entries[1].review_text" },
      { code: "invalid_field_value", path: "$.entries[2].review_state" },
      { code: "duplicate_entry_ref", path: "$.entries[1].entry_ref" },
      { code: "duplicate_entry_ref", path: "$.entries[2].entry_ref" },
      {
        code: "duplicate_source_ref",
        path: "$.entries[0].source_refs[1]",
      },
      {
        code: "duplicate_source_ref",
        path: "$.entries[1].source_refs[1]",
      },
    ]),
  );
});

test("invalid references never participate in duplicate detection", () => {
  const entries = [
    createEntry({ entry_ref: "INVALID", source_refs: ["INVALID", "INVALID"] }),
    createEntry({ entry_ref: "INVALID", source_refs: ["src_shared"] }),
    createEntry({
      entry_ref: "chr_valid",
      source_refs: ["src_valid", "src_valid"],
    }),
    createEntry({ entry_ref: "chr_valid", source_refs: ["src_shared"] }),
  ];

  assert.deepEqual(
    validateHumanReviewChronology(createChronology({ entries })),
    expectedResult([
      { code: "invalid_field_value", path: "$.entries[0].entry_ref" },
      { code: "invalid_field_value", path: "$.entries[0].source_refs[0]" },
      { code: "invalid_field_value", path: "$.entries[0].source_refs[1]" },
      { code: "invalid_field_value", path: "$.entries[1].entry_ref" },
      { code: "duplicate_entry_ref", path: "$.entries[3].entry_ref" },
      {
        code: "duplicate_source_ref",
        path: "$.entries[2].source_refs[1]",
      },
    ]),
  );
});

test("all review and temporal states are accepted while aliases fail closed", () => {
  const reviewStates = [
    "ASSERTED",
    "APPEARS_IN_SUPPLIED_MATERIAL",
    "NOT_ESTABLISHED",
    "HUMAN_REVIEW_REQUIRED",
  ];
  const entries = reviewStates.map((review_state, index) =>
    createEntry({
      entry_ref: `chr_state_${index}`,
      review_state,
      temporal_status: index % 2 === 0 ? "DECLARED" : "UNKNOWN",
      declared_temporal_text: index % 2 === 0 ? "Declared time" : null,
      source_refs: [`src_state_${index}`],
    }),
  );

  assert.deepEqual(
    validateHumanReviewChronology(createChronology({ entries })),
    expectedResult(),
  );
  assert.deepEqual(
    validateHumanReviewChronology(
      createChronology({
        entries: [createEntry({ review_state: "NEEDS_REVIEW" })],
      }),
    ),
    expectedResult([
      { code: "invalid_field_value", path: "$.entries[0].review_state" },
    ]),
  );
});

test("review and declared temporal text require trimmed Unicode content", () => {
  const emoji = "\u{1F600}";

  assert.deepEqual(
    validateHumanReviewChronology(
      createChronology({
        entries: [
          createEntry({
            declared_temporal_text: emoji,
            review_text: emoji,
          }),
        ],
      }),
    ),
    expectedResult(),
  );

  for (const review_text of ["", " ", " leading", "trailing "]) {
    assert.deepEqual(
      validateHumanReviewChronology(
        createChronology({ entries: [createEntry({ review_text })] }),
      ),
      expectedResult([
        { code: "invalid_field_value", path: "$.entries[0].review_text" },
      ]),
    );
  }
});

test("unknown string symbol and non-enumerable keys aggregate without echo", () => {
  const root = createChronology();
  const entry = createEntry();
  const rootSymbol = Symbol("root-secret-symbol");
  const entrySymbol = Symbol("entry-secret-symbol");

  root.root_secret = "root-secret-value";
  root[rootSymbol] = "symbol-secret-value";
  Object.defineProperty(root, "root_hidden", {
    value: "hidden-secret-value",
    enumerable: false,
  });
  entry.entry_secret = "entry-secret-value";
  entry[entrySymbol] = "entry-symbol-secret-value";
  Object.defineProperty(entry, "entry_hidden", {
    value: "entry-hidden-secret-value",
    enumerable: false,
  });
  root.entries = [entry];

  const result = validateHumanReviewChronology(root);
  const serialized = JSON.stringify(result);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "unexpected_field", path: "$" },
      { code: "unexpected_field", path: "$.entries[0]" },
    ]),
  );
  for (const secret of [
    "root_secret",
    "root-secret-value",
    "root_hidden",
    "entry_secret",
    "entry-secret-value",
    "entry_hidden",
  ]) {
    assert.equal(serialized.includes(secret), false, secret);
  }
});

test("root entry array-index and source-item accessors are never invoked", () => {
  let rootGetterCalls = 0;
  let entryGetterCalls = 0;
  let entryIndexGetterCalls = 0;
  let sourceIndexGetterCalls = 0;
  const root = createChronology();
  const firstEntry = createEntry();
  const thirdEntry = createEntry({ entry_ref: "chr_third" });
  const sourceReferences = [];

  Object.defineProperty(root, "contract_id", {
    get() {
      rootGetterCalls += 1;
      return "human_review.review_chronology";
    },
    enumerable: true,
  });
  Object.defineProperty(firstEntry, "entry_ref", {
    get() {
      entryGetterCalls += 1;
      return "chr_first";
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
  thirdEntry.source_refs = sourceReferences;

  const entries = [];
  entries.length = 3;
  entries[0] = firstEntry;
  Object.defineProperty(entries, "1", {
    get() {
      entryIndexGetterCalls += 1;
      return createEntry({ entry_ref: "chr_second" });
    },
    enumerable: true,
  });
  entries[2] = thirdEntry;
  root.entries = entries;

  assert.deepEqual(
    validateHumanReviewChronology(root),
    expectedResult([
      { code: "invalid_field_type", path: "$.contract_id" },
      { code: "invalid_field_type", path: "$.entries[0].entry_ref" },
      { code: "invalid_field_type", path: "$.entries[1]" },
      { code: "invalid_field_type", path: "$.entries[2].source_refs[0]" },
    ]),
  );
  assert.equal(rootGetterCalls, 0);
  assert.equal(entryGetterCalls, 0);
  assert.equal(entryIndexGetterCalls, 0);
  assert.equal(sourceIndexGetterCalls, 0);
});

test("sparse positions fail by index while extra array properties are ignored", () => {
  const sourceReferences = new Array(2);
  sourceReferences[1] = "src_second";
  sourceReferences.array_secret = "source-array-secret";
  const entries = new Array(2);
  entries[1] = createEntry({ source_refs: sourceReferences });
  entries.array_secret = "entry-array-secret";

  const result = validateHumanReviewChronology(createChronology({ entries }));
  const serialized = JSON.stringify(result);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "invalid_field_type", path: "$.entries[0]" },
      { code: "invalid_field_type", path: "$.entries[1].source_refs[0]" },
    ]),
  );
  assert.equal(serialized.includes("array_secret"), false);
  assert.equal(serialized.includes("source-array-secret"), false);
  assert.equal(serialized.includes("entry-array-secret"), false);
});

test("canonical non-enumerable data properties remain valid", () => {
  const entry = {};
  for (const [field, value] of Object.entries(createEntry())) {
    Object.defineProperty(entry, field, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  const root = {};
  for (const [field, value] of Object.entries(
    createChronology({ entries: [entry] }),
  )) {
    Object.defineProperty(root, field, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  assert.deepEqual(validateHumanReviewChronology(root), expectedResult());
});

test("candidate insertion order never changes deterministic error order", () => {
  const first = {
    hidden: "secret",
    entries: 4,
    packet_ref: 3,
  };
  const second = {
    packet_ref: 3,
    hidden: "secret",
    entries: 4,
  };

  assert.deepEqual(
    validateHumanReviewChronology(first),
    validateHumanReviewChronology(second),
  );
});

test("cyclic candidates fail structurally without recursion or mutation", () => {
  const candidate = createChronology();
  candidate.entries = [candidate];
  const originalEntries = candidate.entries;

  assert.deepEqual(
    validateHumanReviewChronology(candidate),
    expectedResult([
      { code: "required_field_missing", path: "$.entries[0].entry_ref" },
      { code: "required_field_missing", path: "$.entries[0].review_state" },
      {
        code: "required_field_missing",
        path: "$.entries[0].temporal_status",
      },
      {
        code: "required_field_missing",
        path: "$.entries[0].declared_temporal_text",
      },
      { code: "required_field_missing", path: "$.entries[0].review_text" },
      { code: "required_field_missing", path: "$.entries[0].source_refs" },
      { code: "unexpected_field", path: "$.entries[0]" },
    ]),
  );
  assert.strictEqual(candidate.entries, originalEntries);
  assert.strictEqual(candidate.entries[0], candidate);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.entries), false);
});

test("normal candidates arrays entries and source arrays remain unmodified", () => {
  const candidate = createChronology({
    entries: [
      createEntry(),
      createEntry({
        entry_ref: "chr_second",
        source_refs: ["src_second", "src_third"],
      }),
    ],
  });
  const before = JSON.stringify(candidate);

  validateHumanReviewChronology(candidate);

  assert.equal(JSON.stringify(candidate), before);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.entries), false);
  assert.equal(Object.isFrozen(candidate.entries[0]), false);
  assert.equal(Object.isFrozen(candidate.entries[0].source_refs), false);
});

test("success and failure results are recursively immutable", () => {
  const success = validateHumanReviewChronology(createChronology());
  const failure = validateHumanReviewChronology(null);

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
    validateHumanReviewChronology(createChronology()),
    validateHumanReviewChronology(null),
    validateHumanReviewChronology(
      createChronology({
        entries: [
          createEntry({ entry_ref: "chr_repeat" }),
          createEntry({ entry_ref: "chr_repeat" }),
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
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-chronology\.json"\)/u,
  );
  assert.match(
    source,
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-chronology-validator-result\.json"\)/u,
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
    /source[- ]register/iu,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});

test("package index preserves line count and exact static package export", () => {
  const packageIndex = fs.readFileSync(packageIndexPath, "utf8");
  const scaffoldText = fs.readFileSync(scaffoldPath, "utf8");
  const transitionText = fs.readFileSync(transitionPath, "utf8");
  const symbolOccurrences =
    packageIndex.match(/\bvalidateHumanReviewChronology\b/gu) ?? [];

  assert.equal((packageIndex.match(/\n/gu) ?? []).length, 13165);
  assert.equal(packageIndex.includes("human-review-chronology-validator.js"), true);
  assert.equal(symbolOccurrences.length, 3);
  assert.match(
    packageIndex,
    /\{ validateHumanReviewChronology \} = require\("\.\/human-review-chronology-validator\.js"\)/u,
  );
  assert.match(
    packageIndex,
    /module\.exports\.validateHumanReviewChronology = validateHumanReviewChronology/u,
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
});
