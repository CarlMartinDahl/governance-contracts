"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const validatorModule = require("../packages/schemas/src/human-review-source-register-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");
const resultSchema = require("../schemas/human-review-source-register-validator-result.json");

const { validateHumanReviewSourceRegister } = validatorModule;
const validatorPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "human-review-source-register-validator.js",
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const packageExportScaffoldPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);

function createEntry(overrides = {}) {
  return {
    source_ref: "src_alpha",
    declared_source_type: "message_thread",
    declared_label: "Declared source",
    ...overrides,
  };
}

function createRegister(overrides = {}) {
  return {
    contract_id: "human_review.source_register",
    contract_version: "1.0.0",
    packet_ref: "pkt_alpha",
    sources: [],
    ...overrides,
  };
}

function expectedResult(errors = []) {
  return {
    valid: errors.length === 0,
    contractKind: "HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors,
  };
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

  return resultSchema.properties.errors.items.oneOf.some((branch) => {
    if (error.code !== branch.properties.code.const) {
      return false;
    }

    const pathRule = branch.properties.path;
    return pathRule.enum
      ? pathRule.enum.includes(error.path)
      : new RegExp(pathRule.pattern, "u").test(error.path);
  });
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
    "validateHumanReviewSourceRegister",
  ]);
  assert.equal(typeof validateHumanReviewSourceRegister, "function");
  assert.equal(validateHumanReviewSourceRegister.length, 1);
  assert.strictEqual(
    packageSchemas.validateHumanReviewSourceRegister,
    validateHumanReviewSourceRegister,
  );
  assert.equal(
    Object.hasOwn(packageSchemas, "humanReviewSourceRegisterValidator"),
    false,
  );
});

test("valid empty and populated registers return exact frozen successes", () => {
  const emptyResult = validateHumanReviewSourceRegister(createRegister());
  const populatedResult = validateHumanReviewSourceRegister(
    createRegister({
      sources: [
        createEntry(),
        createEntry({
          source_ref: "src_beta-2",
          declared_source_type: "document",
          declared_label: "Second declared source",
        }),
      ],
    }),
  );

  assert.deepEqual(emptyResult, expectedResult());
  assert.deepEqual(populatedResult, expectedResult());
  assert.equal(matchesResultContract(emptyResult), true);
  assert.equal(matchesResultContract(populatedResult), true);
});

test("null-prototype root and source entry remain valid plain objects", () => {
  const root = Object.assign(Object.create(null), createRegister());
  const entry = Object.assign(Object.create(null), createEntry());
  root.sources = [entry];

  assert.deepEqual(validateHumanReviewSourceRegister(root), expectedResult());
});

test("root type gate short-circuits every non-plain candidate", () => {
  const customPrototype = Object.create({ inherited: true });
  Object.assign(customPrototype, createRegister());

  for (const candidate of [
    null,
    undefined,
    false,
    1,
    "register",
    [],
    new Date(0),
    () => {},
    customPrototype,
  ]) {
    assert.deepEqual(
      validateHumanReviewSourceRegister(candidate),
      expectedResult([{ code: "invalid_field_type", path: "$" }]),
    );
  }
});

test("root errors follow missing unknown type and value phase order", () => {
  const candidate = {
    packet_ref: 7,
    sources: "not-an-array",
    hidden_unknown: "must-not-echo",
  };

  assert.deepEqual(
    validateHumanReviewSourceRegister(candidate),
    expectedResult([
      { code: "required_field_missing", path: "$.contract_id" },
      { code: "required_field_missing", path: "$.contract_version" },
      { code: "unexpected_field", path: "$" },
      { code: "invalid_field_type", path: "$.packet_ref" },
      { code: "invalid_field_type", path: "$.sources" },
    ]),
  );
});

test("root identity version and packet reference values fail in canonical order", () => {
  const result = validateHumanReviewSourceRegister(
    createRegister({
      contract_id: "wrong",
      contract_version: "v1",
      packet_ref: "PKT_NOT_ALLOWED",
    }),
  );

  assert.deepEqual(
    result,
    expectedResult([
      { code: "invalid_field_value", path: "$.contract_id" },
      { code: "invalid_field_value", path: "$.contract_version" },
      { code: "invalid_field_value", path: "$.packet_ref" },
    ]),
  );
});

test("entry errors follow index then missing unknown type and value order", () => {
  const sources = [
    null,
    {},
    {
      source_ref: 9,
      declared_source_type: "binary_blob",
      declared_label: " padded ",
      secret_field: "never-echo-this",
    },
  ];

  assert.deepEqual(
    validateHumanReviewSourceRegister(createRegister({ sources })),
    expectedResult([
      { code: "invalid_field_type", path: "$.sources[0]" },
      { code: "required_field_missing", path: "$.sources[1].source_ref" },
      {
        code: "required_field_missing",
        path: "$.sources[1].declared_source_type",
      },
      {
        code: "required_field_missing",
        path: "$.sources[1].declared_label",
      },
      { code: "unexpected_field", path: "$.sources[2]" },
      { code: "invalid_field_type", path: "$.sources[2].source_ref" },
      {
        code: "invalid_field_value",
        path: "$.sources[2].declared_source_type",
      },
      {
        code: "invalid_field_value",
        path: "$.sources[2].declared_label",
      },
    ]),
  );
});

test("duplicate references are reported after all entry-structure errors", () => {
  const sources = [
    createEntry({ source_ref: "src_repeat" }),
    createEntry({
      source_ref: "src_repeat",
      declared_label: " bad ",
    }),
    createEntry({ source_ref: "src_repeat", declared_source_type: "bad" }),
  ];

  assert.deepEqual(
    validateHumanReviewSourceRegister(createRegister({ sources })),
    expectedResult([
      {
        code: "invalid_field_value",
        path: "$.sources[1].declared_label",
      },
      {
        code: "invalid_field_value",
        path: "$.sources[2].declared_source_type",
      },
      { code: "duplicate_source_ref", path: "$.sources[1].source_ref" },
      { code: "duplicate_source_ref", path: "$.sources[2].source_ref" },
    ]),
  );
});

test("invalid source references never participate in duplicate detection", () => {
  const sources = [
    createEntry({ source_ref: "INVALID" }),
    createEntry({ source_ref: "INVALID" }),
    createEntry({ source_ref: "src_valid" }),
    createEntry({ source_ref: "src_valid" }),
  ];
  const result = validateHumanReviewSourceRegister(createRegister({ sources }));

  assert.deepEqual(
    result,
    expectedResult([
      { code: "invalid_field_value", path: "$.sources[0].source_ref" },
      { code: "invalid_field_value", path: "$.sources[1].source_ref" },
      { code: "duplicate_source_ref", path: "$.sources[3].source_ref" },
    ]),
  );
});

test("all seven declared source types are accepted and aliases fail closed", () => {
  const declaredTypes = [
    "message_thread",
    "email",
    "document",
    "image",
    "audio",
    "video",
    "other_declared",
  ];
  const sources = declaredTypes.map((declared_source_type, index) =>
    createEntry({
      source_ref: `src_type_${index}`,
      declared_source_type,
    }),
  );

  assert.deepEqual(
    validateHumanReviewSourceRegister(createRegister({ sources })),
    expectedResult(),
  );
  assert.deepEqual(
    validateHumanReviewSourceRegister(
      createRegister({
        sources: [createEntry({ declared_source_type: "other" })],
      }),
    ),
    expectedResult([
      {
        code: "invalid_field_value",
        path: "$.sources[0].declared_source_type",
      },
    ]),
  );
});

test("labels require pre-trimmed content and count Unicode code points", () => {
  const twoHundredEmoji = "😀".repeat(200);
  const twoHundredOneEmoji = "😀".repeat(201);

  assert.deepEqual(
    validateHumanReviewSourceRegister(
      createRegister({
        sources: [createEntry({ declared_label: twoHundredEmoji })],
      }),
    ),
    expectedResult(),
  );

  for (const declared_label of ["", " ", " leading", "trailing ", twoHundredOneEmoji]) {
    assert.deepEqual(
      validateHumanReviewSourceRegister(
        createRegister({ sources: [createEntry({ declared_label })] }),
      ),
      expectedResult([
        {
          code: "invalid_field_value",
          path: "$.sources[0].declared_label",
        },
      ]),
    );
  }
});

test("unknown string symbol and non-enumerable keys aggregate without echo", () => {
  const root = createRegister();
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
  root.sources = [entry];

  const result = validateHumanReviewSourceRegister(root);
  const serialized = JSON.stringify(result);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "unexpected_field", path: "$" },
      { code: "unexpected_field", path: "$.sources[0]" },
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

test("root entry and indexed accessors are never invoked", () => {
  let rootGetterCalls = 0;
  let entryGetterCalls = 0;
  let indexGetterCalls = 0;
  const root = createRegister();
  const entry = createEntry();

  Object.defineProperty(root, "contract_id", {
    get() {
      rootGetterCalls += 1;
      return "human_review.source_register";
    },
    enumerable: true,
  });
  Object.defineProperty(entry, "source_ref", {
    get() {
      entryGetterCalls += 1;
      return "src_alpha";
    },
    enumerable: true,
  });
  const accessorSources = [];
  accessorSources.length = 2;
  accessorSources[0] = entry;
  Object.defineProperty(accessorSources, "1", {
    get() {
      indexGetterCalls += 1;
      return createEntry({ source_ref: "src_beta" });
    },
    enumerable: true,
  });
  root.sources = accessorSources;

  const result = validateHumanReviewSourceRegister(root);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "invalid_field_type", path: "$.contract_id" },
      { code: "invalid_field_type", path: "$.sources[0].source_ref" },
      { code: "invalid_field_type", path: "$.sources[1]" },
    ]),
  );
  assert.equal(rootGetterCalls, 0);
  assert.equal(entryGetterCalls, 0);
  assert.equal(indexGetterCalls, 0);
});

test("sparse array positions fail by index while extra array properties are ignored", () => {
  const sources = new Array(2);
  sources[1] = createEntry();
  sources.array_secret = "must-not-echo";

  const result = validateHumanReviewSourceRegister(createRegister({ sources }));

  assert.deepEqual(
    result,
    expectedResult([{ code: "invalid_field_type", path: "$.sources[0]" }]),
  );
  assert.equal(JSON.stringify(result).includes("array_secret"), false);
  assert.equal(JSON.stringify(result).includes("must-not-echo"), false);
});

test("canonical non-enumerable data properties remain valid", () => {
  const root = {};
  for (const [field, value] of Object.entries(createRegister())) {
    Object.defineProperty(root, field, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  assert.deepEqual(validateHumanReviewSourceRegister(root), expectedResult());
});

test("candidate insertion order never changes deterministic error order", () => {
  const first = {
    hidden: "secret",
    sources: 4,
    packet_ref: 3,
  };
  const second = {
    packet_ref: 3,
    hidden: "secret",
    sources: 4,
  };

  assert.deepEqual(
    validateHumanReviewSourceRegister(first),
    validateHumanReviewSourceRegister(second),
  );
});

test("cyclic candidates fail structurally without recursion or mutation", () => {
  const candidate = createRegister();
  candidate.sources = [candidate];
  const originalSources = candidate.sources;

  const result = validateHumanReviewSourceRegister(candidate);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "required_field_missing", path: "$.sources[0].source_ref" },
      {
        code: "required_field_missing",
        path: "$.sources[0].declared_source_type",
      },
      {
        code: "required_field_missing",
        path: "$.sources[0].declared_label",
      },
      { code: "unexpected_field", path: "$.sources[0]" },
    ]),
  );
  assert.strictEqual(candidate.sources, originalSources);
  assert.strictEqual(candidate.sources[0], candidate);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.sources), false);
});

test("normal candidates arrays and entries remain byte-for-byte unmodified", () => {
  const candidate = createRegister({
    sources: [
      createEntry(),
      createEntry({ source_ref: "src_second", declared_source_type: "email" }),
    ],
  });
  const before = JSON.stringify(candidate);

  validateHumanReviewSourceRegister(candidate);

  assert.equal(JSON.stringify(candidate), before);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.sources), false);
  assert.equal(Object.isFrozen(candidate.sources[0]), false);
});

test("success and failure results are recursively immutable", () => {
  const success = validateHumanReviewSourceRegister(createRegister());
  const failure = validateHumanReviewSourceRegister(null);

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
    validateHumanReviewSourceRegister(createRegister()),
    validateHumanReviewSourceRegister(null),
    validateHumanReviewSourceRegister(
      createRegister({
        sources: [
          createEntry({ source_ref: "src_repeat" }),
          createEntry({ source_ref: "src_repeat" }),
        ],
      }),
    ),
  ];

  assert.equal(outputs.every(matchesResultContract), true);
});

test("module source remains schema-bound and free of integration behavior", () => {
  const source = fs.readFileSync(validatorPath, "utf8");

  assert.match(
    source,
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-source-register\.json"\)/u,
  );
  assert.match(
    source,
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-source-register-validator-result\.json"\)/u,
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
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});

test("package index preserves line count and package-export boundaries remain anchored", () => {
  const packageIndex = fs.readFileSync(packageIndexPath, "utf8");
  const scaffoldText = fs.readFileSync(scaffoldPath, "utf8");
  const transitionText = fs.readFileSync(transitionPath, "utf8");
  const packageExportScaffoldText = fs.readFileSync(
    packageExportScaffoldPath,
    "utf8",
  );
  const symbolOccurrences =
    packageIndex.match(/\bvalidateHumanReviewSourceRegister\b/gu) ?? [];

  assert.equal((packageIndex.match(/\n/gu) ?? []).length, 13165);
  assert.equal(packageIndex.includes("human-review-source-register-validator.js"), true);
  assert.equal(symbolOccurrences.length, 3);
  assert.match(
    packageIndex,
    /\{ validateHumanReviewSourceRegister \} = require\("\.\/human-review-source-register-validator\.js"\)/u,
  );
  assert.match(
    packageIndex,
    /module\.exports\.validateHumanReviewSourceRegister = validateHumanReviewSourceRegister/u,
  );
  assert.match(scaffoldText, /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(scaffoldText, /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    packageExportScaffoldText,
    /TRACKED_DOCS_ONLY_REFERENCE_EQUIVALENT_PACKAGE_EXPORT_SCOPE_DEFINED/u,
  );
});
