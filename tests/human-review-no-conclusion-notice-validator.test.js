"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const validatorModule = require("../packages/schemas/src/human-review-no-conclusion-notice-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");
const resultSchema = require("../schemas/human-review-no-conclusion-notice-validator-result.json");

const { validateHumanReviewNoConclusionNotice } = validatorModule;
const repoRoot = path.join(__dirname, "..");
const validatorPath = path.join(
  repoRoot,
  "packages",
  "schemas",
  "src",
  "human-review-no-conclusion-notice-validator.js",
);
const packageIndexPath = path.join(
  repoRoot,
  "packages",
  "schemas",
  "src",
  "index.js",
);
const scaffoldPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const referenceFields = [
  {
    field: "source_refs",
    valid: "src_valid",
    duplicateCode: "duplicate_source_ref",
  },
  {
    field: "chronology_entry_refs",
    valid: "chr_valid",
    duplicateCode: "duplicate_chronology_entry_ref",
  },
  {
    field: "claim_refs",
    valid: "clm_valid",
    duplicateCode: "duplicate_claim_ref",
  },
  {
    field: "gap_refs",
    valid: "gap_valid",
    duplicateCode: "duplicate_gap_ref",
  },
  {
    field: "question_refs",
    valid: "qst_valid",
    duplicateCode: "duplicate_question_ref",
  },
];

function createNotice(overrides = {}) {
  return {
    notice_ref: "ncn_alpha",
    declaration_origin: "BOUNDARY_DECLARED",
    notice_code: "NO_MODEL_CONCLUSION_UNDER_CURRENT_BOUNDARY",
    notice_text:
      "No model conclusion is established under the current boundary.",
    source_refs: ["src_alpha"],
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
    packet_ref: "pkt_alpha",
    notices: [createNotice()],
    ...overrides,
  };
}

function expectedResult(errors = []) {
  return {
    valid: errors.length === 0,
    contractKind:
      "HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_BOUNDARY",
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
    "validateHumanReviewNoConclusionNotice",
  ]);
  assert.equal(typeof validateHumanReviewNoConclusionNotice, "function");
  assert.equal(validateHumanReviewNoConclusionNotice.length, 1);

  for (const exportName of [
    "humanReviewNoConclusionNoticeValidator",
    "validateHumanReviewNoConclusionNotice",
    "getHumanReviewNoConclusionNoticeValidator",
    "humanReviewNoConclusionNoticeValidatorRegistry",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }
});

test("valid minimal and populated packets return exact frozen successes", () => {
  const minimalResult = validateHumanReviewNoConclusionNotice(createPacket());
  const populatedResult = validateHumanReviewNoConclusionNotice(
    createPacket({
      notices: [
        createNotice({
          source_refs: ["src_alpha", "src_beta"],
          chronology_entry_refs: ["chr_alpha"],
          claim_refs: ["clm_alpha"],
          gap_refs: ["gap_alpha"],
          question_refs: ["qst_alpha"],
        }),
        createNotice({
          notice_ref: "ncn_beta",
          source_refs: [],
          chronology_entry_refs: ["chr_beta"],
          claim_refs: ["clm_beta"],
          gap_refs: ["gap_beta"],
          question_refs: ["qst_beta"],
        }),
      ],
    }),
  );

  assert.deepEqual(minimalResult, expectedResult());
  assert.deepEqual(populatedResult, expectedResult());
  assert.equal(matchesResultContract(minimalResult), true);
  assert.equal(matchesResultContract(populatedResult), true);
});

test("null-prototype root and notice row remain valid plain objects", () => {
  const root = Object.assign(Object.create(null), createPacket());
  const notice = Object.assign(Object.create(null), createNotice());
  root.notices = [notice];

  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(root),
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
      validateHumanReviewNoConclusionNotice(candidate),
      expectedResult([{ code: "invalid_field_type", path: "$" }]),
    );
  }
});

test("root errors follow missing unknown type and value phase order", () => {
  const candidate = {
    contract_id: "wrong",
    packet_ref: 7,
    notices: "not-an-array",
    hidden_unknown: "must-not-echo",
  };

  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(candidate),
    expectedResult([
      { code: "required_field_missing", path: "$.contract_version" },
      { code: "unexpected_field", path: "$" },
      { code: "invalid_field_type", path: "$.packet_ref" },
      { code: "invalid_field_type", path: "$.notices" },
      { code: "invalid_field_value", path: "$.contract_id" },
    ]),
  );
});

test("root and fixed notice values fail in canonical order", () => {
  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(
      createPacket({
        contract_id: "wrong",
        contract_version: "v1",
        packet_ref: "PKT_NOT_ALLOWED",
        notices: [
          createNotice({
            notice_ref: "NCN_NOT_ALLOWED",
            declaration_origin: "MODEL_DECLARED",
            notice_code: "OTHER_CODE",
            notice_text: "Other text",
          }),
        ],
      }),
    ),
    expectedResult([
      { code: "invalid_field_value", path: "$.contract_id" },
      { code: "invalid_field_value", path: "$.contract_version" },
      { code: "invalid_field_value", path: "$.packet_ref" },
      { code: "invalid_field_value", path: "$.notices[0].notice_ref" },
      {
        code: "invalid_field_value",
        path: "$.notices[0].declaration_origin",
      },
      { code: "invalid_field_value", path: "$.notices[0].notice_code" },
      { code: "invalid_field_value", path: "$.notices[0].notice_text" },
    ]),
  );

  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(createPacket({ notices: [] })),
    expectedResult([{ code: "invalid_field_value", path: "$.notices" }]),
  );
});

test("notice errors follow row structure then reference item phase order", () => {
  const notices = [
    null,
    {},
    {
      notice_ref: 9,
      declaration_origin: "MODEL_DECLARED",
      notice_code: "OTHER_CODE",
      notice_text: "Other text",
      source_refs: [9, "INVALID"],
      chronology_entry_refs: [9, "INVALID"],
      claim_refs: [9, "INVALID"],
      gap_refs: [9, "INVALID"],
      question_refs: [9, "INVALID"],
      secret_field: "never-echo-this",
    },
  ];
  const missingRowErrors = [
    "notice_ref",
    "declaration_origin",
    "notice_code",
    "notice_text",
    "source_refs",
    "chronology_entry_refs",
    "claim_refs",
    "gap_refs",
    "question_refs",
  ].map((field) => ({
    code: "required_field_missing",
    path: `$.notices[1].${field}`,
  }));
  const referenceErrors = referenceFields.flatMap(({ field }) => [
    { code: "invalid_field_type", path: `$.notices[2].${field}[0]` },
    { code: "invalid_field_value", path: `$.notices[2].${field}[1]` },
  ]);

  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(createPacket({ notices })),
    expectedResult([
      { code: "invalid_field_type", path: "$.notices[0]" },
      ...missingRowErrors,
      { code: "unexpected_field", path: "$.notices[2]" },
      { code: "invalid_field_type", path: "$.notices[2].notice_ref" },
      {
        code: "invalid_field_value",
        path: "$.notices[2].declaration_origin",
      },
      { code: "invalid_field_value", path: "$.notices[2].notice_code" },
      { code: "invalid_field_value", path: "$.notices[2].notice_text" },
      ...referenceErrors,
    ]),
  );
});

test("five empty reference arrays require one total notice reference", () => {
  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(
      createPacket({
        notices: [
          createNotice({
            source_refs: [],
            chronology_entry_refs: [],
            claim_refs: [],
            gap_refs: [],
            question_refs: [],
          }),
        ],
      }),
    ),
    expectedResult([
      { code: "notice_reference_required", path: "$.notices[0]" },
    ]),
  );

  const notices = referenceFields.map(({ field, valid }, index) =>
    createNotice({
      notice_ref: `ncn_family_${index}`,
      source_refs: [],
      chronology_entry_refs: [],
      claim_refs: [],
      gap_refs: [],
      question_refs: [],
      [field]: [valid],
    }),
  );

  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(createPacket({ notices })),
    expectedResult(),
  );
});

test("reference arrays validate items by field then index", () => {
  const overrides = Object.fromEntries(
    referenceFields.map(({ field, valid }) => [field, [8, "INVALID", valid]]),
  );
  const expectedErrors = referenceFields.flatMap(({ field }) => [
    { code: "invalid_field_type", path: `$.notices[0].${field}[0]` },
    { code: "invalid_field_value", path: `$.notices[0].${field}[1]` },
  ]);

  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(
      createPacket({ notices: [createNotice(overrides)] }),
    ),
    expectedResult(expectedErrors),
  );
});

test("duplicates follow structure cardinality and item checks in canonical phases", () => {
  function duplicateReferences(suffix) {
    return Object.fromEntries(
      referenceFields.map(({ field, valid }) => {
        const value = valid.replace("valid", suffix);
        return [field, [value, value]];
      }),
    );
  }

  const notices = [
    createNotice({
      notice_ref: "ncn_repeat",
      ...duplicateReferences("first"),
    }),
    createNotice({
      notice_ref: "ncn_repeat",
      notice_code: "OTHER_CODE",
      ...duplicateReferences("second"),
    }),
    createNotice({
      notice_ref: "ncn_repeat",
      declaration_origin: "OTHER",
      source_refs: ["src_first"],
      chronology_entry_refs: ["chr_first"],
      claim_refs: ["clm_first"],
      gap_refs: ["gap_first"],
      question_refs: ["qst_first"],
    }),
  ];
  const duplicateItemErrors = [0, 1].flatMap((noticeIndex) =>
    referenceFields.map(({ field, duplicateCode }) => ({
      code: duplicateCode,
      path: `$.notices[${noticeIndex}].${field}[1]`,
    })),
  );

  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(createPacket({ notices })),
    expectedResult([
      { code: "invalid_field_value", path: "$.notices[1].notice_code" },
      {
        code: "invalid_field_value",
        path: "$.notices[2].declaration_origin",
      },
      { code: "duplicate_notice_ref", path: "$.notices[1].notice_ref" },
      { code: "duplicate_notice_ref", path: "$.notices[2].notice_ref" },
      ...duplicateItemErrors,
    ]),
  );
});

test("invalid references do not participate and valid reuse remains local", () => {
  const invalidReferences = Object.fromEntries(
    referenceFields.map(({ field }) => [field, ["INVALID", "INVALID"]]),
  );
  const duplicateReferences = Object.fromEntries(
    referenceFields.map(({ field, valid }) => [field, [valid, valid]]),
  );
  const sharedReferences = Object.fromEntries(
    referenceFields.map(({ field, valid }) => [field, [valid]]),
  );
  const notices = [
    createNotice({ notice_ref: "INVALID", ...invalidReferences }),
    createNotice({ notice_ref: "INVALID", ...sharedReferences }),
    createNotice({ notice_ref: "ncn_valid", ...duplicateReferences }),
    createNotice({ notice_ref: "ncn_second", ...sharedReferences }),
  ];
  const invalidValueErrors = [
    { code: "invalid_field_value", path: "$.notices[0].notice_ref" },
    { code: "invalid_field_value", path: "$.notices[1].notice_ref" },
    ...referenceFields.flatMap(({ field }) => [
      { code: "invalid_field_value", path: `$.notices[0].${field}[0]` },
      { code: "invalid_field_value", path: `$.notices[0].${field}[1]` },
    ]),
  ];
  const duplicateErrors = referenceFields.map(({ field, duplicateCode }) => ({
    code: duplicateCode,
    path: `$.notices[2].${field}[1]`,
  }));

  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(createPacket({ notices })),
    expectedResult([...invalidValueErrors, ...duplicateErrors]),
  );
});

test("unknown string symbol and non-enumerable keys aggregate without echo", () => {
  const root = createPacket();
  const notice = createNotice();
  const rootSymbol = Symbol("root-secret-symbol");
  const noticeSymbol = Symbol("notice-secret-symbol");

  root.root_secret = "root-secret-value";
  root[rootSymbol] = "symbol-secret-value";
  Object.defineProperty(root, "root_hidden", {
    value: "hidden-secret-value",
    enumerable: false,
  });
  notice.notice_secret = "notice-secret-value";
  notice[noticeSymbol] = "notice-symbol-secret-value";
  Object.defineProperty(notice, "notice_hidden", {
    value: "notice-hidden-secret-value",
    enumerable: false,
  });
  root.notices = [notice];

  const result = validateHumanReviewNoConclusionNotice(root);
  const serialized = JSON.stringify(result);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "unexpected_field", path: "$" },
      { code: "unexpected_field", path: "$.notices[0]" },
    ]),
  );
  for (const secret of [
    "root_secret",
    "root-secret-value",
    "root_hidden",
    "notice_secret",
    "notice-secret-value",
    "notice_hidden",
  ]) {
    assert.equal(serialized.includes(secret), false, secret);
  }
});

test("root row array-index and reference-item accessors are never invoked", () => {
  let rootGetterCalls = 0;
  let noticeGetterCalls = 0;
  let noticeSetterCalls = 0;
  let noticeIndexGetterCalls = 0;
  const referenceGetterCalls = Object.fromEntries(
    referenceFields.map(({ field }) => [field, 0]),
  );
  const root = createPacket();
  const firstNotice = createNotice();
  const thirdNotice = createNotice({ notice_ref: "ncn_third" });

  Object.defineProperty(root, "contract_id", {
    get() {
      rootGetterCalls += 1;
      return "human_review.no_conclusion_notice";
    },
    enumerable: true,
  });
  Object.defineProperty(firstNotice, "notice_ref", {
    get() {
      noticeGetterCalls += 1;
      return "ncn_first";
    },
    enumerable: true,
  });
  Object.defineProperty(firstNotice, "notice_text", {
    set(_value) {
      noticeSetterCalls += 1;
    },
    enumerable: true,
  });
  for (const { field, valid } of referenceFields) {
    const references = [];
    references.length = 1;
    Object.defineProperty(references, "0", {
      get() {
        referenceGetterCalls[field] += 1;
        return valid;
      },
      enumerable: true,
    });
    thirdNotice[field] = references;
  }

  const notices = [];
  notices.length = 3;
  notices[0] = firstNotice;
  Object.defineProperty(notices, "1", {
    get() {
      noticeIndexGetterCalls += 1;
      return createNotice({ notice_ref: "ncn_second" });
    },
    enumerable: true,
  });
  notices[2] = thirdNotice;
  root.notices = notices;

  const expectedReferenceErrors = referenceFields.map(({ field }) => ({
    code: "invalid_field_type",
    path: `$.notices[2].${field}[0]`,
  }));
  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(root),
    expectedResult([
      { code: "invalid_field_type", path: "$.contract_id" },
      { code: "invalid_field_type", path: "$.notices[0].notice_ref" },
      { code: "invalid_field_type", path: "$.notices[0].notice_text" },
      { code: "invalid_field_type", path: "$.notices[1]" },
      ...expectedReferenceErrors,
    ]),
  );
  assert.equal(rootGetterCalls, 0);
  assert.equal(noticeGetterCalls, 0);
  assert.equal(noticeSetterCalls, 0);
  assert.equal(noticeIndexGetterCalls, 0);
  for (const { field } of referenceFields) {
    assert.equal(referenceGetterCalls[field], 0, field);
  }
});

test("array row and reference descriptor failures remain bounded", () => {
  const noticeArrayDescriptorFailure = new Proxy([createNotice()], {
    ownKeys() {
      throw new Error("notice array snapshot denied");
    },
  });
  const rowDescriptorFailure = new Proxy(createNotice(), {
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
    validateHumanReviewNoConclusionNotice(
      createPacket({ notices: noticeArrayDescriptorFailure }),
    ),
    expectedResult([{ code: "invalid_field_type", path: "$.notices" }]),
  );
  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(
      createPacket({
        notices: [
          rowDescriptorFailure,
          createNotice({
            notice_ref: "ncn_second",
            source_refs: referenceDescriptorFailure,
          }),
        ],
      }),
    ),
    expectedResult([
      { code: "invalid_field_type", path: "$.notices[0]" },
      { code: "invalid_field_type", path: "$.notices[1].source_refs" },
    ]),
  );
});

test("sparse positions fail by index while extra array properties are ignored", () => {
  const referenceOverrides = {};
  for (const { field, valid } of referenceFields) {
    const references = new Array(2);
    references[1] = valid;
    references.array_secret = `${field}-array-secret`;
    referenceOverrides[field] = references;
  }
  const notices = new Array(2);
  notices[1] = createNotice(referenceOverrides);
  notices.array_secret = "notice-array-secret";

  const result = validateHumanReviewNoConclusionNotice(
    createPacket({ notices }),
  );
  const serialized = JSON.stringify(result);

  assert.deepEqual(
    result,
    expectedResult([
      { code: "invalid_field_type", path: "$.notices[0]" },
      ...referenceFields.map(({ field }) => ({
        code: "invalid_field_type",
        path: `$.notices[1].${field}[0]`,
      })),
    ]),
  );
  for (const secret of ["array_secret", "notice-array-secret"]) {
    assert.equal(serialized.includes(secret), false, secret);
  }
});

test("canonical non-enumerable data properties remain valid", () => {
  const notice = {};
  for (const [field, value] of Object.entries(createNotice())) {
    Object.defineProperty(notice, field, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  const root = {};
  for (const [field, value] of Object.entries(
    createPacket({ notices: [notice] }),
  )) {
    Object.defineProperty(root, field, {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(root),
    expectedResult(),
  );
});

test("candidate insertion order never changes deterministic error order", () => {
  const first = {
    hidden: "secret",
    notices: 4,
    packet_ref: 3,
  };
  const second = {
    packet_ref: 3,
    hidden: "secret",
    notices: 4,
  };

  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(first),
    validateHumanReviewNoConclusionNotice(second),
  );
});

test("cyclic candidates fail structurally without recursion or mutation", () => {
  const candidate = createPacket();
  candidate.notices = [candidate];
  const originalNotices = candidate.notices;
  const missingErrors = [
    "notice_ref",
    "declaration_origin",
    "notice_code",
    "notice_text",
    "source_refs",
    "chronology_entry_refs",
    "claim_refs",
    "gap_refs",
    "question_refs",
  ].map((field) => ({
    code: "required_field_missing",
    path: `$.notices[0].${field}`,
  }));

  assert.deepEqual(
    validateHumanReviewNoConclusionNotice(candidate),
    expectedResult([
      ...missingErrors,
      { code: "unexpected_field", path: "$.notices[0]" },
    ]),
  );
  assert.strictEqual(candidate.notices, originalNotices);
  assert.strictEqual(candidate.notices[0], candidate);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.notices), false);
});

test("candidates arrays rows and reference arrays remain unmodified", () => {
  const candidate = createPacket({
    notices: [
      createNotice(),
      createNotice({
        notice_ref: "ncn_second",
        source_refs: ["src_second", "src_third"],
        chronology_entry_refs: ["chr_second", "chr_third"],
        claim_refs: ["clm_second", "clm_third"],
        gap_refs: ["gap_second", "gap_third"],
        question_refs: ["qst_second", "qst_third"],
      }),
    ],
  });
  const before = JSON.stringify(candidate);

  validateHumanReviewNoConclusionNotice(candidate);

  assert.equal(JSON.stringify(candidate), before);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.notices), false);
  assert.equal(Object.isFrozen(candidate.notices[0]), false);
  for (const { field } of referenceFields) {
    assert.equal(Object.isFrozen(candidate.notices[1][field]), false, field);
  }
});

test("success and failure results are recursively immutable", () => {
  const success = validateHumanReviewNoConclusionNotice(createPacket());
  const failure = validateHumanReviewNoConclusionNotice(null);

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
    validateHumanReviewNoConclusionNotice(createPacket()),
    validateHumanReviewNoConclusionNotice(null),
    validateHumanReviewNoConclusionNotice(
      createPacket({
        notices: [
          createNotice({ notice_ref: "ncn_repeat" }),
          createNotice({ notice_ref: "ncn_repeat" }),
        ],
      }),
    ),
    validateHumanReviewNoConclusionNotice(
      createPacket({
        notices: [
          createNotice({
            source_refs: [],
            chronology_entry_refs: [],
            claim_refs: [],
            gap_refs: [],
            question_refs: [],
          }),
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
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-no-conclusion-notice\.json"\)/u,
  );
  assert.match(
    source,
    /require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-no-conclusion-notice-validator-result\.json"\)/u,
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
    /cross-reference/iu,
    /human-review-source-register-validator/iu,
    /human-review-chronology-validator/iu,
    /human-review-asserted-claim-matrix-validator/iu,
    /human-review-declared-packet-review-gaps-validator/iu,
    /human-review-questions-validator/iu,
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
    packageIndex.includes("human-review-no-conclusion-notice-validator.js"),
    false,
  );
  assert.equal(
    packageIndex.includes("validateHumanReviewNoConclusionNotice"),
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
