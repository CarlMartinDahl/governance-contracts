"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const candidateSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json");
const resultSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result.json");
const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");

const {
  validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence,
} = validatorModule;
const repoRoot = path.join(__dirname, "..");
const modulePath =
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.js";
const proofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.test.js";
const scaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const transitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportScaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const rootFields = [...candidateSchema.required];
const duplicateFields = [
  "review_session_ref",
  "approval_ref",
  "reviewer_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const genericReferenceFields = [
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const reviewerRoles = ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"];
const lifecyclePostures = [
  "REVIEW_SESSION_DECLARED_ACTIVE",
  "REVIEW_SESSION_DECLARED_INACTIVE",
  "REVIEW_SESSION_DECLARED_REVOKED",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, relativePath);
  return fs.readFileSync(absolutePath, "utf8");
}

function createCandidate(overrides = {}) {
  return {
    contract_id:
      "human_review.controlled_handoff_human_professional_approval_review_session_evidence",
    contract_version: "1.0.0",
    review_session_ref: "rvs_session_1",
    approval_ref: "apr_approval_1",
    reviewer_ref: "rvr_reviewer_1",
    reviewer_role: "HUMAN_REVIEWER",
    binding_issuer_ref: "issuer.session:001",
    binding_provenance_ref: "provenance.session:001",
    session_lifecycle_posture: "REVIEW_SESSION_DECLARED_ACTIVE",
    verification_posture: "NOT_VERIFIED_BY_CONTRACT",
    human_professional_review_required: true,
    ...overrides,
  };
}

function expectedResult(errors = []) {
  return {
    valid: errors.length === 0,
    contractKind:
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors,
  };
}

function error(code, errorPath) {
  return { code, path: errorPath };
}

function pathRuleMatches(errorPath, rule) {
  if (typeof rule.const === "string") {
    return errorPath === rule.const;
  }
  if (Array.isArray(rule.enum)) {
    return rule.enum.includes(errorPath);
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

    const pair = `${resultError.code}\u0000${resultError.path}`;
    assert.equal(seenPairs.has(pair), false, pair);
    seenPairs.add(pair);
  }
}

function assertErrors(candidate, errors) {
  const result =
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      candidate,
    );
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

test("module exports exactly one unary validator with reference-equivalent package exposure", () => {
  assert.deepEqual(Object.keys(validatorModule), [
    "validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence",
  ]);
  assert.equal(
    typeof validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence,
    "function",
  );
  assert.equal(
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence.length,
    1,
  );

  assert.strictEqual(
    packageSchemas.validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence,
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence,
  );
  for (const blockedExport of [
    "humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidator",
    "getHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidator",
    "humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorRegistry",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("both reviewer roles and all lifecycle values return exact frozen successes", () => {
  assert.deepEqual(reviewerRoles, candidateSchema.properties.reviewer_role.enum);
  assert.deepEqual(
    lifecyclePostures,
    candidateSchema.properties.session_lifecycle_posture.enum,
  );

  for (const reviewer_role of reviewerRoles) {
    for (const session_lifecycle_posture of lifecyclePostures) {
      const result =
        validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
          createCandidate({ reviewer_role, session_lifecycle_posture }),
        );
      assert.deepEqual(result, expectedResult());
      assertConformsToResultSchema(result);
      assert.equal(Object.isFrozen(result), true);
      assert.equal(Object.isFrozen(result.errors), true);
    }
  }
});

test("null-prototype and non-enumerable canonical data remain valid", () => {
  const nullPrototype = Object.assign(Object.create(null), createCandidate());
  const nonEnumerable = defineDataProperties(Object.entries(createCandidate()));

  assertErrors(nullPrototype, []);
  assertErrors(nonEnumerable, []);
});

test("root preflight stops with one bounded error for every rejected root", () => {
  const customPrototype = Object.create({ inherited: true });
  Object.assign(customPrototype, createCandidate());
  const getPrototypeFailure = new Proxy(createCandidate(), {
    getPrototypeOf() {
      throw new Error("private prototype diagnostic");
    },
  });
  const ownKeysFailure = new Proxy(createCandidate(), {
    ownKeys() {
      throw new Error("private own-key diagnostic");
    },
  });
  const descriptorFailure = new Proxy(createCandidate(), {
    getOwnPropertyDescriptor() {
      throw new Error("private descriptor diagnostic");
    },
  });
  const revoked = Proxy.revocable(createCandidate(), {});
  revoked.revoke();

  for (const candidate of [
    null,
    undefined,
    false,
    1,
    "candidate",
    [],
    new Date(0),
    function candidateFunction() {},
    customPrototype,
    getPrototypeFailure,
    ownKeysFailure,
    descriptorFailure,
    revoked.proxy,
  ]) {
    const result = assertErrors(candidate, [
      error("invalid_field_type", "$"),
    ]);
    assert.equal(JSON.stringify(result).includes("private"), false);
  }
});

test("missing fields follow exact declaration order", () => {
  assertErrors(
    {},
    rootFields.map((field) =>
      error("required_field_missing", `$.${field}`),
    ),
  );
});

test("phase one and duplicate errors follow exact canonical order", () => {
  const candidate = createCandidate({
    review_session_ref: 7,
    approval_ref: "wrong",
    reviewer_ref: "rvr_repeat",
    reviewer_role: "UNKNOWN_REVIEWER_ROLE",
    binding_issuer_ref: "rvr_repeat",
    binding_provenance_ref: "rvr_repeat",
    session_lifecycle_posture: "UNKNOWN_LIFECYCLE",
    human_professional_review_required: false,
  });
  delete candidate.contract_id;
  delete candidate.contract_version;
  candidate.private_unknown = "must-not-echo";

  const result = assertErrors(candidate, [
    error("required_field_missing", "$.contract_id"),
    error("required_field_missing", "$.contract_version"),
    error("unexpected_field", "$"),
    error("invalid_field_type", "$.review_session_ref"),
    error("invalid_field_value", "$.approval_ref"),
    error("invalid_field_value", "$.reviewer_role"),
    error("invalid_field_value", "$.session_lifecycle_posture"),
    error("invalid_field_value", "$.human_professional_review_required"),
    error("duplicate_reference", "$.binding_issuer_ref"),
    error("duplicate_reference", "$.binding_provenance_ref"),
  ]);
  assert.equal(JSON.stringify(result).includes("must-not-echo"), false);
});

test("all correctly typed local-value failures follow declaration order", () => {
  assertErrors(
    createCandidate({
      contract_id: "wrong",
      contract_version: "wrong",
      review_session_ref: "RVS_wrong",
      approval_ref: "APR_wrong",
      reviewer_ref: "RVR_wrong",
      reviewer_role: "UNKNOWN_REVIEWER_ROLE",
      binding_issuer_ref: ".",
      binding_provenance_ref: "..",
      session_lifecycle_posture: "UNKNOWN_LIFECYCLE",
      verification_posture: "VERIFIED",
      human_professional_review_required: false,
    }),
    rootFields.map((field) => error("invalid_field_value", `$.${field}`)),
  );
});

test("generic opaque-reference exclusions come only from the schema rules", () => {
  const prohibitedValues = [
    ".",
    "..",
    "http:private",
    "HtTpS:private",
    "FTP:private",
    "File:private",
    "mailto:private",
    "DATA:private",
    "javascript:private",
  ];

  for (const field of genericReferenceFields) {
    for (const value of prohibitedValues) {
      assertErrors(createCandidate({ [field]: value }), [
        error("invalid_field_value", `$.${field}`),
      ]);
    }
  }
});

test("unknown keys and canonical accessors never echo or execute", () => {
  let invocationCount = 0;
  const candidate = createCandidate();
  const privateSymbol = Symbol("private-symbol-description");

  candidate.private_string_key = "private-string-value";
  candidate[privateSymbol] = "private-symbol-value";
  Object.defineProperty(candidate, "private_hidden_key", {
    value: "private-hidden-value",
    enumerable: false,
  });
  Object.defineProperty(candidate, "private_accessor", {
    get() {
      invocationCount += 1;
      return "private-accessor-value";
    },
  });
  Object.defineProperty(candidate, "contract_id", {
    get() {
      invocationCount += 1;
      return candidateSchema.properties.contract_id.const;
    },
    enumerable: true,
  });
  Object.defineProperty(candidate, "human_professional_review_required", {
    set(_value) {
      invocationCount += 1;
    },
    enumerable: true,
  });

  const result = assertErrors(candidate, [
    error("unexpected_field", "$"),
    error("invalid_field_type", "$.contract_id"),
    error("invalid_field_type", "$.human_professional_review_required"),
  ]);
  assert.equal(invocationCount, 0);

  const serialized = JSON.stringify(result);
  for (const secret of [
    "private_string_key",
    "private-string-value",
    "private-symbol-description",
    "private-symbol-value",
    "private_hidden_key",
    "private-hidden-value",
    "private_accessor",
    "private-accessor-value",
  ]) {
    assert.equal(serialized.includes(secret), false, secret);
  }
});

test("five reference participants use exact later-occurrence equality", () => {
  assert.deepEqual(duplicateFields, [
    ...resultSchema.properties.errors.items.oneOf.find(
      (branch) => branch.properties.code.const === "duplicate_reference",
    ).properties.path.enum.map((errorPath) => errorPath.slice(2)),
  ]);

  assertErrors(
    createCandidate({
      review_session_ref: "rvs_shared",
      approval_ref: "apr_shared",
      reviewer_ref: "rvr_shared",
      binding_issuer_ref: "rvs_shared",
      binding_provenance_ref: "apr_shared",
    }),
    [
      error("duplicate_reference", "$.binding_issuer_ref"),
      error("duplicate_reference", "$.binding_provenance_ref"),
    ],
  );

  assertErrors(
    createCandidate({
      binding_issuer_ref: "opaque_shared",
      binding_provenance_ref: "opaque_shared",
    }),
    [
      error("duplicate_reference", "$.binding_provenance_ref"),
    ],
  );

  assertErrors(
    createCandidate({
      binding_issuer_ref: "opaque_shared",
      binding_provenance_ref: "OPAQUE_shared",
    }),
    [],
  );
});

test("invalid references neither establish nor match duplicates", () => {
  assertErrors(
    createCandidate({
      binding_issuer_ref: "https:private",
      binding_provenance_ref: "https:private",
    }),
    [
      error("invalid_field_value", "$.binding_issuer_ref"),
      error("invalid_field_value", "$.binding_provenance_ref"),
    ],
  );

  assertErrors(
    createCandidate({
      binding_issuer_ref: 9,
      binding_provenance_ref: 9,
    }),
    [
      error("invalid_field_type", "$.binding_issuer_ref"),
      error("invalid_field_type", "$.binding_provenance_ref"),
    ],
  );
});

test("candidate insertion order cannot change returned error order", () => {
  const canonical = createCandidate({
    contract_id: 4,
    contract_version: "wrong",
    binding_issuer_ref: "rvs_session_1",
    binding_provenance_ref: "https:private",
    human_professional_review_required: false,
  });
  canonical.private_unknown = "private";
  const reversed = Object.fromEntries(Object.entries(canonical).reverse());

  assert.deepEqual(
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      reversed,
    ),
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      canonical,
    ),
  );
});

test("flat cyclic candidates remain bounded and candidates remain unmodified", () => {
  const candidate = createCandidate();
  const before = JSON.stringify(candidate);
  assertErrors(candidate, []);
  assert.equal(JSON.stringify(candidate), before);
  assert.equal(Object.isFrozen(candidate), false);

  const cyclic = createCandidate();
  cyclic.binding_issuer_ref = cyclic;
  assertErrors(cyclic, [
    error("invalid_field_type", "$.binding_issuer_ref"),
  ]);
  assert.strictEqual(cyclic.binding_issuer_ref, cyclic);
  assert.equal(Object.isFrozen(cyclic), false);
});

test("success and failure results are recursively frozen and isolated", () => {
  const success =
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      createCandidate(),
    );
  const failure =
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      {},
    );
  const secondFailure =
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      {},
    );

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

test("all five codes and all twelve static paths remain schema-bounded", () => {
  const allWrongTypes = Object.fromEntries(
    rootFields.map((field) => [
      field,
      candidateSchema.properties[field].type === "boolean" ? "true" : 1,
    ]),
  );
  const unknown = createCandidate();
  unknown.private_unknown = true;
  const duplicate = createCandidate({
    binding_issuer_ref: "opaque_shared",
    binding_provenance_ref: "opaque_shared",
  });
  const results = [
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      {},
    ),
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      null,
    ),
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      unknown,
    ),
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      allWrongTypes,
    ),
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      createCandidate({ contract_id: "wrong" }),
    ),
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      duplicate,
    ),
  ];
  const errors = results.flatMap((result) => result.errors);
  const observedCodes = [...new Set(errors.map(({ code }) => code))].sort();
  const observedPaths = [...new Set(errors.map(({ path: errorPath }) => errorPath))].sort();
  const schemaCodes = resultSchema.properties.errors.items.oneOf
    .map((branch) => branch.properties.code.const)
    .sort();
  const staticPaths = ["$", ...rootFields.map((field) => `$.${field}`)].sort();

  assert.deepEqual(observedCodes, schemaCodes);
  assert.deepEqual(observedPaths, staticPaths);
  assert.equal(observedPaths.some((errorPath) => errorPath.includes("[")), false);
  for (const result of results) {
    assertConformsToResultSchema(result);
  }
});

test("representative outputs conform structurally to the result schema", () => {
  const unknown = createCandidate();
  unknown[Symbol("private")] = "private";
  const outputs = [
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      createCandidate(),
    ),
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      {},
    ),
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      unknown,
    ),
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
      createCandidate({
        binding_issuer_ref: "opaque_shared",
        binding_provenance_ref: "opaque_shared",
      }),
    ),
  ];

  for (const result of outputs) {
    assertConformsToResultSchema(result);
  }
});

test("module source remains integration-free while package exposure stays exact and static", () => {
  const moduleSource = readRequired(modulePath);
  const scaffoldText = readRequired(scaffoldPath);
  const transitionText = readRequired(transitionPath);
  const packageExportScaffoldText = readRequired(packageExportScaffoldPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");
  const symbolOccurrences =
    packageIndexText.match(
      /\bvalidateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence\b/gu,
    ) ?? [];

  for (const schemaRequire of [
    'require("../../../schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json")',
    'require("../../../schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result.json")',
  ]) {
    assert.equal(moduleSource.includes(schemaRequire), true, schemaRequire);
  }
  assert.equal(moduleSource.split('require("../../../schemas/').length - 1, 2);
  assert.equal(moduleSource.includes("Object.getOwnPropertyDescriptors"), true);
  assert.equal(moduleSource.includes("Reflect.ownKeys"), true);

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
    assert.equal(moduleSource.includes(forbiddenSource), false, forbiddenSource);
  }

  for (const scopedPath of [modulePath, proofPath]) {
    assert.equal(scaffoldText.includes(`\`${scopedPath}\``), true, scopedPath);
  }
  assert.match(
    scaffoldText,
    /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u,
  );
  assert.match(scaffoldText, /FUTURE_VALIDATOR_PHASE_COUNT:\n2/u);
  assert.match(
    scaffoldText,
    /FUTURE_VALIDATOR_FOCUSED_PROOF_FAMILY_COUNT:\n15/u,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.equal(symbolOccurrences.length, 3);
  assert.match(
    packageIndexText,
    /\{ validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence \} = require\("\.\/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator\.js"\)/u,
  );
  assert.match(
    packageIndexText,
    /module\.exports\.validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence = validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence/u,
  );
  assert.match(
    packageExportScaffoldText,
    /TRACKED_DOCS_ONLY_REFERENCE_EQUIVALENT_PACKAGE_EXPORT_SCOPE_DEFINED/u,
  );
});
