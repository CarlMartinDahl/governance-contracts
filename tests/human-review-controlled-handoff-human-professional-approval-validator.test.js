"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const candidateSchema = require(
  "../schemas/human-review-controlled-handoff-human-professional-approval.json",
);
const resultSchema = require(
  "../schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
);
const validatorModule = require(
  "../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
);
const packageSchemas = require("../packages/schemas/src/index.js");

const {
  validateHumanReviewControlledHandoffHumanProfessionalApproval,
} = validatorModule;
const repoRoot = path.join(__dirname, "..");
const modulePath =
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js";
const proofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js";
const scaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const transitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const rootFields = [...candidateSchema.required];
const reviewerFields = [
  ...candidateSchema.$defs.reviewerAttribution.required,
];
const referenceFields = [...candidateSchema.$defs.decisionSupport.required];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, "expected " + relativePath);
  return fs.readFileSync(absolutePath, "utf8");
}

function createReviewer(overrides = {}) {
  return {
    reviewer_ref: "rvr_reviewer_1",
    reviewer_role: "HUMAN_REVIEWER",
    reviewer_authority_evidence_ref: "rae_authority_1",
    ...overrides,
  };
}

function createSupport(overrides = {}) {
  return {
    decision_basis_refs: ["rvb_basis_1"],
    prior_approval_refs: [],
    correction_request_refs: [],
    ...overrides,
  };
}

function createCandidate(overrides = {}) {
  return {
    contract_id:
      "human_review.controlled_handoff_human_professional_approval",
    contract_version: "1.0.0",
    approval_ref: "apr_approval_1",
    packet_ref: "pkt_packet_1",
    controlled_handoff_brief_ref: "hro_handoff_1",
    controlled_handoff_brief_fingerprint: "sha256:" + "a".repeat(64),
    approval_posture: "APPROVAL_DECISION_CANDIDATE_ONLY",
    decision: "HUMAN_PROFESSIONAL_GATE_APPROVED",
    reviewer_attribution: createReviewer(),
    decision_support: createSupport(),
    decided_at: "2026-07-17T12:00:00.000Z",
    review_session_ref: "rvs_session_1",
    decision_attestation_ref: "att_attestation_1",
    ...overrides,
  };
}

function expectedResult(errors = []) {
  return {
    valid: errors.length === 0,
    contractKind:
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors,
  };
}

function error(code, errorPath) {
  return {
    code,
    path: errorPath,
  };
}

function pathRuleMatches(errorPath, rule) {
  if (typeof rule.const === "string") {
    return errorPath === rule.const;
  }
  if (Array.isArray(rule.enum)) {
    return rule.enum.includes(errorPath);
  }
  if (typeof rule.pattern === "string") {
    return new RegExp(rule.pattern, "u").test(errorPath);
  }
  if (Array.isArray(rule.oneOf)) {
    return rule.oneOf.some((branch) => pathRuleMatches(errorPath, branch));
  }
  return false;
}

function assertConformsToResultSchema(result) {
  assert.deepEqual(Object.keys(result), resultSchema.required);
  assert.equal(typeof result.valid, "boolean");
  assert.equal(result.contractKind, resultSchema.properties.contractKind.const);
  assert.equal(result.version, resultSchema.properties.version.const);
  assert.equal(Array.isArray(result.errors), true);
  assert.equal(result.valid, result.errors.length === 0);

  const seenPairs = new Set();
  for (const resultError of result.errors) {
    assert.deepEqual(Object.keys(resultError), ["code", "path"]);
    const branch = resultSchema.properties.errors.items.oneOf.find(
      (candidateBranch) =>
        candidateBranch.properties.code.const === resultError.code,
    );
    assert.notEqual(branch, undefined, resultError.code);
    assert.equal(
      pathRuleMatches(resultError.path, branch.properties.path),
      true,
      resultError.path,
    );
    const pair = resultError.code + "\u0000" + resultError.path;
    assert.equal(seenPairs.has(pair), false, pair);
    seenPairs.add(pair);
  }
}

function assertErrors(candidate, errors) {
  const result =
    validateHumanReviewControlledHandoffHumanProfessionalApproval(candidate);
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

function defineArrayItems(values) {
  const array = [];
  for (let index = 0; index < values.length; index += 1) {
    Object.defineProperty(array, String(index), {
      value: values[index],
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }
  return array;
}

test("module exposes exactly one unary internal validator", () => {
  assert.deepEqual(Object.keys(validatorModule), [
    "validateHumanReviewControlledHandoffHumanProfessionalApproval",
  ]);
  assert.equal(
    typeof validateHumanReviewControlledHandoffHumanProfessionalApproval,
    "function",
  );
  assert.equal(
    validateHumanReviewControlledHandoffHumanProfessionalApproval.length,
    1,
  );

  for (const blockedExport of [
    "humanReviewControlledHandoffHumanProfessionalApprovalValidator",
    "validateHumanReviewControlledHandoffHumanProfessionalApproval",
    "getHumanReviewControlledHandoffHumanProfessionalApprovalValidator",
    "humanReviewControlledHandoffHumanProfessionalApprovalValidatorRegistry",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("all declared decisions return exact frozen success results", () => {
  const cases = [
    createCandidate(),
    createCandidate({
      decision: "HUMAN_PROFESSIONAL_GATE_REJECTED",
      reviewer_attribution: createReviewer({
        reviewer_role: "PROFESSIONAL_REVIEWER",
      }),
    }),
    createCandidate({
      decision: "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
      decision_support: createSupport({
        correction_request_refs: ["cor_correction_1"],
      }),
    }),
  ];

  for (const candidate of cases) {
    const result = assertErrors(candidate, []);
    assert.equal(Object.isFrozen(result), true);
    assert.equal(Object.isFrozen(result.errors), true);
  }
});

test("null-prototype and non-enumerable canonical data remain valid", () => {
  const reviewer = defineDataProperties(
    Object.entries(createReviewer()),
  );
  const support = defineDataProperties(
    Object.entries(
      createSupport({
        decision_basis_refs: defineArrayItems(["rvb_basis_1"]),
        prior_approval_refs: defineArrayItems([]),
        correction_request_refs: defineArrayItems([]),
      }),
    ),
  );
  const candidate = defineDataProperties(
    Object.entries(
      createCandidate({
        reviewer_attribution: reviewer,
        decision_support: support,
      }),
    ),
  );

  assertErrors(candidate, []);
});

test("root preflight returns one bounded error for non-plain or uninspectable roots", () => {
  const customPrototype = Object.create({ inherited: true });
  const getPrototypeTrap = new Proxy({}, {
    getPrototypeOf() {
      throw new Error("private prototype diagnostic");
    },
  });
  const descriptorTrap = new Proxy({}, {
    ownKeys() {
      throw new Error("private descriptor diagnostic");
    },
  });
  const revocable = Proxy.revocable({}, {});
  revocable.revoke();

  for (const candidate of [
    null,
    undefined,
    false,
    1,
    "candidate",
    [],
    new Date(),
    function candidateFunction() {},
    customPrototype,
    getPrototypeTrap,
    descriptorTrap,
    revocable.proxy,
  ]) {
    const result = assertErrors(candidate, [
      error("invalid_field_type", "$"),
    ]);
    assert.equal(JSON.stringify(result).includes("private"), false);
  }
});

test("missing root fields follow exact declaration order without descendants", () => {
  assertErrors(
    {},
    rootFields.map((field) =>
      error("required_field_missing", "$." + field),
    ),
  );
});

test("root errors follow unknown type then value phase order", () => {
  const unknownSymbol = Symbol("secret-root-key");
  const candidate = createCandidate({
    contract_id: 7,
    contract_version: "wrong",
    approval_ref: null,
    packet_ref: "wrong",
    controlled_handoff_brief_ref: true,
    controlled_handoff_brief_fingerprint: "wrong",
    approval_posture: "wrong",
    decision: "wrong",
    decided_at: "wrong",
    review_session_ref: [],
    decision_attestation_ref: "wrong",
  });
  candidate[unknownSymbol] = "secret-root-value";

  const result = assertErrors(candidate, [
    error("unexpected_field", "$"),
    error("invalid_field_type", "$.contract_id"),
    error("invalid_field_type", "$.approval_ref"),
    error("invalid_field_type", "$.controlled_handoff_brief_ref"),
    error("invalid_field_type", "$.review_session_ref"),
    error("invalid_field_value", "$.contract_version"),
    error("invalid_field_value", "$.packet_ref"),
    error(
      "invalid_field_value",
      "$.controlled_handoff_brief_fingerprint",
    ),
    error("invalid_field_value", "$.approval_posture"),
    error("invalid_field_value", "$.decision"),
    error("invalid_field_value", "$.decided_at"),
    error("invalid_field_value", "$.decision_attestation_ref"),
  ]);
  const serialized = JSON.stringify(result);
  assert.equal(serialized.includes("secret-root-key"), false);
  assert.equal(serialized.includes("secret-root-value"), false);
});

test("root accessors are present invalid and never invoked", () => {
  let invocationCount = 0;
  const candidate = createCandidate();
  Object.defineProperty(candidate, "decision", {
    get() {
      invocationCount += 1;
      return "HUMAN_PROFESSIONAL_GATE_APPROVED";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(candidate, "secret_unknown", {
    get() {
      invocationCount += 1;
      return "secret";
    },
    enumerable: false,
    configurable: true,
  });

  const result = assertErrors(candidate, [
    error("unexpected_field", "$"),
    error("invalid_field_type", "$.decision"),
  ]);
  assert.equal(invocationCount, 0);
  assert.equal(JSON.stringify(result).includes("secret"), false);
});

test("invalid parent containers suppress only their descendants", () => {
  const missingReviewer = createCandidate();
  delete missingReviewer.reviewer_attribution;
  assertErrors(missingReviewer, [
    error("required_field_missing", "$.reviewer_attribution"),
  ]);

  const missingSupport = createCandidate();
  delete missingSupport.decision_support;
  assertErrors(missingSupport, [
    error("required_field_missing", "$.decision_support"),
  ]);

  assertErrors(
    createCandidate({
      reviewer_attribution: [],
      decision_support: new Date(),
    }),
    [
      error("invalid_field_type", "$.reviewer_attribution"),
      error("invalid_field_type", "$.decision_support"),
    ],
  );
});

test("reviewer attribution follows missing unknown type then value order", () => {
  const reviewer = {
    reviewer_ref: 3,
    reviewer_role: "UNKNOWN_ROLE",
    reviewer_authority_evidence_ref: "wrong",
  };
  reviewer[Symbol("secret-reviewer-key")] = "secret-reviewer-value";

  const result = assertErrors(
    createCandidate({ reviewer_attribution: reviewer }),
    [
      error("unexpected_field", "$.reviewer_attribution"),
      error(
        "invalid_field_type",
        "$.reviewer_attribution.reviewer_ref",
      ),
      error(
        "invalid_field_value",
        "$.reviewer_attribution.reviewer_role",
      ),
      error(
        "invalid_field_value",
        "$.reviewer_attribution.reviewer_authority_evidence_ref",
      ),
    ],
  );
  assert.equal(JSON.stringify(result).includes("secret-reviewer"), false);

  assertErrors(createCandidate({ reviewer_attribution: {} }), [
    ...reviewerFields.map((field) =>
      error(
        "required_field_missing",
        "$.reviewer_attribution." + field,
      ),
    ),
  ]);
});

test("reviewer accessors and descriptor failures do not execute or recurse", () => {
  let invocationCount = 0;
  const reviewer = createReviewer();
  Object.defineProperty(reviewer, "reviewer_ref", {
    get() {
      invocationCount += 1;
      return "rvr_hidden";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(reviewer, "unknown", {
    get() {
      invocationCount += 1;
      return "hidden";
    },
    configurable: true,
  });
  assertErrors(createCandidate({ reviewer_attribution: reviewer }), [
    error("unexpected_field", "$.reviewer_attribution"),
    error(
      "invalid_field_type",
      "$.reviewer_attribution.reviewer_ref",
    ),
  ]);
  assert.equal(invocationCount, 0);

  const descriptorTrap = new Proxy(createReviewer(), {
    ownKeys() {
      throw new Error("reviewer descriptor diagnostic");
    },
  });
  assertErrors(createCandidate({ reviewer_attribution: descriptorTrap }), [
    error("invalid_field_type", "$.reviewer_attribution"),
  ]);
});

test("decision support aggregates object and array unknown keys before types", () => {
  let invocationCount = 0;
  const support = createSupport({
    decision_basis_refs: ["rvb_basis_1"],
    prior_approval_refs: {},
  });
  support[Symbol("secret-support-key")] = "secret-support-value";
  Object.defineProperty(support.decision_basis_refs, "secret_array_key", {
    get() {
      invocationCount += 1;
      return "secret-array-value";
    },
    configurable: true,
  });
  Object.defineProperty(support, "correction_request_refs", {
    get() {
      invocationCount += 1;
      return [];
    },
    enumerable: true,
    configurable: true,
  });

  const result = assertErrors(createCandidate({ decision_support: support }), [
    error("unexpected_field", "$.decision_support"),
    error(
      "invalid_field_type",
      "$.decision_support.prior_approval_refs",
    ),
    error(
      "invalid_field_type",
      "$.decision_support.correction_request_refs",
    ),
  ]);
  assert.equal(invocationCount, 0);
  assert.equal(JSON.stringify(result).includes("secret"), false);
});

test("missing decision-support arrays stop at their declared paths", () => {
  assertErrors(createCandidate({ decision_support: {} }), [
    ...referenceFields.map((field) =>
      error(
        "required_field_missing",
        "$.decision_support." + field,
      ),
    ),
  ]);
});

test("array item errors follow array declaration and actual index order", () => {
  let invocationCount = 0;
  const basis = new Array(3);
  Object.defineProperty(basis, "0", {
    get() {
      invocationCount += 1;
      return "rvb_hidden";
    },
    configurable: true,
  });
  basis[1] = 4;
  basis[2] = "wrong";

  const result = assertErrors(
    createCandidate({
      decision_support: createSupport({
        decision_basis_refs: basis,
        prior_approval_refs: ["wrong", 8],
        correction_request_refs: ["wrong"],
      }),
    }),
    [
      error(
        "invalid_field_type",
        "$.decision_support.decision_basis_refs[0]",
      ),
      error(
        "invalid_field_type",
        "$.decision_support.decision_basis_refs[1]",
      ),
      error(
        "invalid_field_value",
        "$.decision_support.decision_basis_refs[2]",
      ),
      error(
        "invalid_field_value",
        "$.decision_support.prior_approval_refs[0]",
      ),
      error(
        "invalid_field_type",
        "$.decision_support.prior_approval_refs[1]",
      ),
      error(
        "invalid_field_value",
        "$.decision_support.correction_request_refs[0]",
      ),
      error(
        "invalid_field_value",
        "$.decision_support.prior_approval_refs",
      ),
    ],
  );
  assert.equal(invocationCount, 0);
  assert.equal(JSON.stringify(result).includes("hidden"), false);
});

test("holes are indexed type failures and do not suppress local cardinality", () => {
  const sparsePriorApprovals = new Array(2);
  assertErrors(
    createCandidate({
      decision_support: createSupport({
        decision_basis_refs: [],
        prior_approval_refs: sparsePriorApprovals,
      }),
    }),
    [
      error(
        "invalid_field_type",
        "$.decision_support.prior_approval_refs[0]",
      ),
      error(
        "invalid_field_type",
        "$.decision_support.prior_approval_refs[1]",
      ),
      error(
        "invalid_field_value",
        "$.decision_support.decision_basis_refs",
      ),
      error(
        "invalid_field_value",
        "$.decision_support.prior_approval_refs",
      ),
    ],
  );
});

test("non-enumerable array indices participate normally", () => {
  assertErrors(
    createCandidate({
      decision_support: createSupport({
        decision_basis_refs: defineArrayItems([
          "rvb_basis_1",
          "rvb_basis_1",
        ]),
      }),
    }),
    [
      error(
        "duplicate_reference",
        "$.decision_support.decision_basis_refs[1]",
      ),
    ],
  );
});

test("array descriptor failures stop at the declared container", () => {
  const descriptorTrap = new Proxy(["rvb_basis_1"], {
    ownKeys() {
      throw new Error("array descriptor diagnostic");
    },
  });
  assertErrors(
    createCandidate({
      decision_support: createSupport({
        decision_basis_refs: descriptorTrap,
      }),
    }),
    [
      error(
        "invalid_field_type",
        "$.decision_support.decision_basis_refs",
      ),
    ],
  );

  const revocable = Proxy.revocable([], {});
  revocable.revoke();
  assertErrors(
    createCandidate({
      decision_support: createSupport({
        correction_request_refs: revocable.proxy,
      }),
    }),
    [
      error(
        "invalid_field_type",
        "$.decision_support.correction_request_refs",
      ),
    ],
  );
});

test("correction-request rule is decision-dependent and participant-gated", () => {
  assertErrors(
    createCandidate({
      decision: "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
    }),
    [
      error(
        "invalid_cross_field_combination",
        "$.decision_support.correction_request_refs",
      ),
    ],
  );
  for (const decision of [
    "HUMAN_PROFESSIONAL_GATE_APPROVED",
    "HUMAN_PROFESSIONAL_GATE_REJECTED",
  ]) {
    assertErrors(
      createCandidate({
        decision,
        decision_support: createSupport({
          correction_request_refs: ["cor_correction_1"],
        }),
      }),
      [
        error(
          "invalid_cross_field_combination",
          "$.decision_support.correction_request_refs",
        ),
      ],
    );
  }

  assertErrors(
    createCandidate({
      decision: "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
      decision_support: createSupport({
        correction_request_refs: ["wrong"],
      }),
    }),
    [
      error(
        "invalid_field_value",
        "$.decision_support.correction_request_refs[0]",
      ),
    ],
  );
  assertErrors(
    createCandidate({
      decision: "UNKNOWN_DECISION",
      decision_support: createSupport({
        correction_request_refs: ["cor_correction_1"],
      }),
    }),
    [error("invalid_field_value", "$.decision")],
  );
});

test("unrelated errors do not suppress an evaluable correction rule", () => {
  assertErrors(
    createCandidate({
      decision: "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
      reviewer_attribution: createReviewer({ reviewer_ref: 3 }),
      decision_support: createSupport({
        decision_basis_refs: [4],
      }),
    }),
    [
      error(
        "invalid_field_type",
        "$.reviewer_attribution.reviewer_ref",
      ),
      error(
        "invalid_field_type",
        "$.decision_support.decision_basis_refs[0]",
      ),
      error(
        "invalid_cross_field_combination",
        "$.decision_support.correction_request_refs",
      ),
    ],
  );
});

test("cross-field errors precede independently applicable duplicates", () => {
  assertErrors(
    createCandidate({
      decision: "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
      decision_support: createSupport({
        correction_request_refs: [
          "cor_correction_1",
          "cor_correction_1",
        ],
      }),
    }),
    [
      error(
        "invalid_cross_field_combination",
        "$.decision_support.correction_request_refs",
      ),
      error(
        "duplicate_reference",
        "$.decision_support.correction_request_refs[1]",
      ),
    ],
  );
});

test("duplicates are local valid-only and flag every later occurrence", () => {
  assertErrors(
    createCandidate({
      decision_support: createSupport({
        decision_basis_refs: [
          "rvb_basis_1",
          "rvb_basis_1",
          "wrong",
          "wrong",
          "rvb_basis_1",
        ],
        prior_approval_refs: ["apr_prior_1", "apr_prior_1"],
      }),
    }),
    [
      error(
        "invalid_field_value",
        "$.decision_support.decision_basis_refs[2]",
      ),
      error(
        "invalid_field_value",
        "$.decision_support.decision_basis_refs[3]",
      ),
      error(
        "invalid_field_value",
        "$.decision_support.prior_approval_refs",
      ),
      error(
        "duplicate_reference",
        "$.decision_support.decision_basis_refs[1]",
      ),
      error(
        "duplicate_reference",
        "$.decision_support.decision_basis_refs[4]",
      ),
      error(
        "duplicate_reference",
        "$.decision_support.prior_approval_refs[1]",
      ),
    ],
  );
});

test("candidate insertion order does not change canonical output", () => {
  const canonical = createCandidate({
    contract_id: 4,
    contract_version: "wrong",
    reviewer_attribution: {
      reviewer_ref: 5,
      reviewer_role: "wrong",
      reviewer_authority_evidence_ref: "wrong",
    },
    decision_support: {
      decision_basis_refs: ["wrong"],
      prior_approval_refs: [],
      correction_request_refs: [],
    },
  });
  canonical.unknown = "secret";

  const reversed = Object.fromEntries(
    Object.entries(canonical).reverse(),
  );
  reversed.reviewer_attribution = Object.fromEntries(
    Object.entries(canonical.reviewer_attribution).reverse(),
  );
  reversed.decision_support = Object.fromEntries(
    Object.entries(canonical.decision_support).reverse(),
  );

  assert.deepEqual(
    validateHumanReviewControlledHandoffHumanProfessionalApproval(reversed),
    validateHumanReviewControlledHandoffHumanProfessionalApproval(canonical),
  );
});

test("cycles stop at declared structural boundaries without recursion", () => {
  const parentCycle = createCandidate();
  parentCycle.reviewer_attribution = parentCycle;
  assertErrors(parentCycle, [
    ...reviewerFields.map((field) =>
      error(
        "required_field_missing",
        "$.reviewer_attribution." + field,
      ),
    ),
    error("unexpected_field", "$.reviewer_attribution"),
  ]);

  const itemCycle = createCandidate();
  itemCycle.decision_support.decision_basis_refs = [itemCycle];
  assertErrors(itemCycle, [
    error(
      "invalid_field_type",
      "$.decision_support.decision_basis_refs[0]",
    ),
  ]);
});

test("normal candidates remain unmodified", () => {
  const candidate = createCandidate({
    decision: "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
    decision_support: createSupport({
      decision_basis_refs: ["rvb_basis_1", "rvb_basis_2"],
      prior_approval_refs: ["apr_prior_1"],
      correction_request_refs: ["cor_correction_1"],
    }),
  });
  const before = JSON.stringify(candidate);

  assertErrors(candidate, []);
  assert.equal(JSON.stringify(candidate), before);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(candidate.reviewer_attribution), false);
  assert.equal(Object.isFrozen(candidate.decision_support), false);
  assert.equal(
    Object.isFrozen(candidate.decision_support.decision_basis_refs),
    false,
  );
});

test("success and failure results are recursively immutable and isolated", () => {
  const success =
    validateHumanReviewControlledHandoffHumanProfessionalApproval(
      createCandidate(),
    );
  const failure =
    validateHumanReviewControlledHandoffHumanProfessionalApproval({});
  const secondFailure =
    validateHumanReviewControlledHandoffHumanProfessionalApproval({});

  for (const result of [success, failure]) {
    assert.equal(Object.isFrozen(result), true);
    assert.equal(Object.isFrozen(result.errors), true);
    for (const resultError of result.errors) {
      assert.equal(Object.isFrozen(resultError), true);
    }
  }
  assert.notEqual(failure, secondFailure);
  assert.notEqual(failure.errors, secondFailure.errors);
  assert.notEqual(failure.errors[0], secondFailure.errors[0]);
  assert.throws(() => {
    failure.errors.push(error("unexpected_field", "$"));
  }, TypeError);
  assert.throws(() => {
    failure.errors[0].path = "$";
  }, TypeError);
});

test("representative outputs conform to the tracked result schema", () => {
  const outputs = [
    validateHumanReviewControlledHandoffHumanProfessionalApproval(
      createCandidate(),
    ),
    validateHumanReviewControlledHandoffHumanProfessionalApproval({}),
    validateHumanReviewControlledHandoffHumanProfessionalApproval(
      createCandidate({
        decision: "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
      }),
    ),
    validateHumanReviewControlledHandoffHumanProfessionalApproval(
      createCandidate({
        decision_support: createSupport({
          decision_basis_refs: ["rvb_basis_1", "rvb_basis_1"],
        }),
      }),
    ),
  ];

  for (const result of outputs) {
    assertConformsToResultSchema(result);
  }
});

test("module source remains statically schema-bound and integration-free", () => {
  const moduleSource = readRequired(modulePath);

  assert.equal(
    moduleSource.includes(
      'require("../../../schemas/human-review-controlled-handoff-human-professional-approval.json")',
    ),
    true,
  );
  assert.equal(
    moduleSource.includes(
      'require("../../../schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json")',
    ),
    true,
  );
  assert.equal(
    moduleSource.split('require("../../../schemas/').length - 1,
    2,
  );
  assert.equal(
    moduleSource.includes("Object.getOwnPropertyDescriptors"),
    true,
  );
  for (const forbiddenSource of [
    'require("node:fs")',
    'require("fs")',
    "child_process",
    "../governance",
    "../database",
    "process.",
    "fetch(",
    "XMLHttpRequest",
    "console.",
    "packageSchemas",
    "module.exports.validate",
  ]) {
    assert.equal(
      moduleSource.includes(forbiddenSource),
      false,
      forbiddenSource,
    );
  }
});

test("package index and tracked two-file scope remain unchanged", () => {
  const scaffoldText = readRequired(scaffoldPath);
  const transitionText = readRequired(transitionPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");

  for (const scopedPath of [modulePath, proofPath]) {
    assert.equal(
      scaffoldText.includes("`" + scopedPath + "`"),
      true,
      scopedPath,
    );
  }
  assert.match(
    scaffoldText,
    /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u,
  );
  assert.match(scaffoldText, /FUTURE_VALIDATOR_PHASE_COUNT:\n7/u);
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
});
