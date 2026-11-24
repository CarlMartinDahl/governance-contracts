"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const candidateSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json");
const resultSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json");
const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");

const {
  validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence,
} = validatorModule;
const repoRoot = path.join(__dirname, "..");
const modulePath =
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js";
const packageIndexPath = "packages/schemas/src/index.js";
const packageExportScaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const rootFields = [...candidateSchema.required];
const duplicateFields = [
  "decision_basis_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "basis_subject_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const genericReferenceFields = [
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const reviewerRoles = ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"];
const decisions = [
  "HUMAN_PROFESSIONAL_GATE_APPROVED",
  "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
  "HUMAN_PROFESSIONAL_GATE_REJECTED",
];
const lifecyclePostures = [
  "DECISION_BASIS_DECLARED_ACTIVE",
  "DECISION_BASIS_DECLARED_INACTIVE",
  "DECISION_BASIS_DECLARED_REVOKED",
];
const subjectKindExamples = [
  { kind: "SOURCE_REGISTER_SOURCE", validRef: "src_source_1", wrongRef: "chr_source_1" },
  { kind: "REVIEW_CHRONOLOGY_ENTRY", validRef: "chr_entry_1", wrongRef: "src_entry_1" },
  { kind: "ASSERTED_CLAIM", validRef: "clm_claim_1", wrongRef: "gap_claim_1" },
  { kind: "DECLARED_REVIEW_GAP", validRef: "gap_gap_1", wrongRef: "qst_gap_1" },
  { kind: "HUMAN_REVIEW_QUESTION", validRef: "qst_question_1", wrongRef: "ncn_question_1" },
  { kind: "NO_CONCLUSION_NOTICE", validRef: "ncn_notice_1", wrongRef: "src_notice_1" },
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, relativePath);
  return fs.readFileSync(absolutePath, "utf8");
}

function createCandidate(overrides = {}) {
  return {
    contract_id:
      "human_review.controlled_handoff_human_professional_approval_decision_basis_evidence",
    contract_version: "1.0.0",
    decision_basis_ref: "rvb_basis_1",
    approval_ref: "apr_approval_1",
    review_session_ref: "rvs_session_1",
    reviewer_ref: "rvr_reviewer_1",
    reviewer_role: "HUMAN_REVIEWER",
    decision: "HUMAN_PROFESSIONAL_GATE_APPROVED",
    basis_subject_kind: "SOURCE_REGISTER_SOURCE",
    basis_subject_ref: "src_source_1",
    basis_posture: "DECISION_BASIS_CANDIDATE_ONLY",
    binding_issuer_ref: "issuer.basis:001",
    binding_provenance_ref: "provenance.basis:001",
    basis_lifecycle_posture: "DECISION_BASIS_DECLARED_ACTIVE",
    verification_posture: "NOT_VERIFIED_BY_CONTRACT",
    human_professional_review_required: true,
    ...overrides,
  };
}

function expectedResult(errors = []) {
  return {
    valid: errors.length === 0,
    contractKind:
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_BOUNDARY",
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
    validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence(
      candidate,
    );
  assert.deepEqual(result, expectedResult(errors));
  assertConformsToResultSchema(result);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.errors), true);
  for (const item of result.errors) {
    assert.equal(Object.isFrozen(item), true);
  }
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

function loadPrivateDedupeHarness() {
  const moduleSource = readRequired(modulePath);
  const privateModule = { exports: {} };
  const localRequire = (request) => {
    if (
      request ===
      "../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json"
    ) {
      return candidateSchema;
    }
    if (
      request ===
      "../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json"
    ) {
      return resultSchema;
    }
    throw new Error("unexpected static require");
  };
  const factory = new Function(
    "require",
    "module",
    "exports",
    moduleSource +
      "\nmodule.exports.__dedupeErrorsForFocusedProof = dedupeErrors;\n",
  );
  factory(localRequire, privateModule, privateModule.exports);
  return privateModule.exports.__dedupeErrorsForFocusedProof;
}

test("module exports exactly one unary validator and package index remains unchanged", () => {
  const functionName =
    "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence";

  assert.deepEqual(Object.keys(validatorModule), [functionName]);
  assert.equal(
    typeof validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence,
    "function",
  );
  assert.equal(
    validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence.length,
    1,
  );
  assert.equal(readRequired(packageIndexPath).split("\n").length - 1, 13165);
  assert.strictEqual(
    packageSchemas[functionName],
    validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence,
  );
  for (const blockedExport of [
    "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
    "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
    "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorRegistry",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("all valid role, decision, subject-kind, and lifecycle combinations return frozen successes", () => {
  assert.deepEqual(reviewerRoles, candidateSchema.properties.reviewer_role.enum);
  assert.deepEqual(decisions, candidateSchema.properties.decision.enum);
  assert.deepEqual(
    lifecyclePostures,
    candidateSchema.properties.basis_lifecycle_posture.enum,
  );
  assert.deepEqual(
    subjectKindExamples.map((entry) => entry.kind),
    candidateSchema.properties.basis_subject_kind.enum,
  );

  for (const reviewer_role of reviewerRoles) {
    for (const decision of decisions) {
      for (const basis_lifecycle_posture of lifecyclePostures) {
        for (const { kind, validRef } of subjectKindExamples) {
          assertErrors(
            createCandidate({
              reviewer_role,
              decision,
              basis_subject_kind: kind,
              basis_subject_ref: validRef,
              basis_lifecycle_posture,
            }),
            [],
          );
        }
      }
    }
  }
});

test("conditional kind-to-reference namespace mapping rejects mismatched prefixes and suppresses hypothetical errors", () => {
  for (const { kind, wrongRef } of subjectKindExamples) {
    assertErrors(
      createCandidate({
        basis_subject_kind: kind,
        basis_subject_ref: wrongRef,
      }),
      [error("invalid_field_value", "$.basis_subject_ref")],
    );
  }

  // Missing basis_subject_kind suppresses conditional evaluation of basis_subject_ref and excludes it from duplicate checks
  const missingKind = createCandidate({
    basis_subject_ref: "rvb_basis_1",
  });
  delete missingKind.basis_subject_kind;
  assertErrors(missingKind, [
    error("required_field_missing", "$.basis_subject_kind"),
  ]);

  // Wrong-type basis_subject_kind suppresses conditional evaluation of basis_subject_ref and excludes it from duplicate checks
  assertErrors(
    createCandidate({
      basis_subject_kind: 42,
      basis_subject_ref: "rvb_basis_1",
    }),
    [error("invalid_field_type", "$.basis_subject_kind")],
  );

  // Invalid basis_subject_kind value suppresses conditional evaluation of basis_subject_ref and excludes it from duplicate checks
  assertErrors(
    createCandidate({
      basis_subject_kind: "UNKNOWN_KIND",
      basis_subject_ref: "rvb_basis_1",
    }),
    [error("invalid_field_value", "$.basis_subject_kind")],
  );
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
      throw new Error("secret-prototype-detail");
    },
  });
  const ownKeysFailure = new Proxy(createCandidate(), {
    ownKeys() {
      throw new Error("secret-ownkeys-detail");
    },
  });
  const descriptorFailure = new Proxy(createCandidate(), {
    getOwnPropertyDescriptor() {
      throw new Error("secret-descriptor-detail");
    },
  });

  for (const invalidRoot of [
    null,
    undefined,
    true,
    false,
    0,
    "candidate",
    Symbol("root"),
    10n,
    [],
    [createCandidate()],
    new Date(),
    new Map(),
    new Set(),
    () => {},
    customPrototype,
    getPrototypeFailure,
    ownKeysFailure,
    descriptorFailure,
  ]) {
    const result = assertErrors(invalidRoot, [error("invalid_field_type", "$")]);
    assert.equal(JSON.stringify(result).includes("secret-"), false);
  }
});

test("Phase 1 emits missing, single unknown, type, and value errors in exact declaration order independent of insertion order", () => {
  const unknownSymbol = Symbol("secret-symbol-key");
  const candidate = {
    human_professional_review_required: false,
    verification_posture: "VERIFIED_BY_CONTRACT",
    unknown_b: "secret-val-b",
    basis_lifecycle_posture: "BAD_LIFECYCLE",
    binding_provenance_ref: "https://example.invalid/secret",
    binding_issuer_ref: "..",
    basis_posture: "BAD_POSTURE",
    basis_subject_ref: "chr_wrong_prefix",
    basis_subject_kind: "SOURCE_REGISTER_SOURCE",
    decision: 123,
    reviewer_role: undefined,
    reviewer_ref: "rvr_reviewer_1",
    review_session_ref: "rvs_session_1",
    approval_ref: "apr_approval_1",
    // decision_basis_ref intentionally omitted
    contract_version: "2.0.0",
    // contract_id intentionally omitted
    unknown_a: "secret-val-a",
    [unknownSymbol]: "secret-sym-val",
  };

  const result = assertErrors(candidate, [
    error("required_field_missing", "$.contract_id"),
    error("required_field_missing", "$.decision_basis_ref"),
    error("unexpected_field", "$"),
    error("invalid_field_type", "$.reviewer_role"),
    error("invalid_field_type", "$.decision"),
    error("invalid_field_value", "$.contract_version"),
    error("invalid_field_value", "$.basis_subject_ref"),
    error("invalid_field_value", "$.basis_posture"),
    error("invalid_field_value", "$.binding_issuer_ref"),
    error("invalid_field_value", "$.binding_provenance_ref"),
    error("invalid_field_value", "$.basis_lifecycle_posture"),
    error("invalid_field_value", "$.verification_posture"),
    error("invalid_field_value", "$.human_professional_review_required"),
  ]);

  const serialized = JSON.stringify(result);
  assert.equal(serialized.includes("secret-"), false);
  assert.equal(serialized.includes("unknown_a"), false);
  assert.equal(serialized.includes("unknown_b"), false);
});

test("unknown keys, accessors, non-enumerable keys, cycles, and inherited fields never invoke getters or echo values", () => {
  let getterInvoked = false;
  const proto = { contract_id: "human_review.controlled_handoff_human_professional_approval_decision_basis_evidence" };
  const withInherited = Object.create(proto);
  assertErrors(withInherited, [error("invalid_field_type", "$")]);

  const candidate = createCandidate();
  delete candidate.contract_id;
  Object.defineProperty(candidate, "approval_ref", {
    get() {
      getterInvoked = true;
      return "apr_getter";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(candidate, "hidden_unknown_secret_key", {
    get() {
      getterInvoked = true;
      return "secret";
    },
    enumerable: false,
    configurable: true,
  });
  const cyclic = {};
  cyclic.self = cyclic;
  candidate.review_session_ref = cyclic;

  const result = assertErrors(candidate, [
    error("required_field_missing", "$.contract_id"),
    error("unexpected_field", "$"),
    error("invalid_field_type", "$.approval_ref"),
    error("invalid_field_type", "$.review_session_ref"),
  ]);

  assert.equal(getterInvoked, false);
  assert.equal(JSON.stringify(result).includes("hidden_unknown_secret_key"), false);
});

test("Phase 2 compares all seven locally valid references case-sensitively and marks only later exact duplicates", () => {
  // Exact duplicates across generic and namespaced valid references:
  // binding_issuer_ref and binding_provenance_ref can legally match any valid namespaced ref OR each other!
  assertErrors(
    createCandidate({
      binding_issuer_ref: "src_source_1",
      binding_provenance_ref: "src_source_1",
    }),
    [
      error("duplicate_reference", "$.binding_issuer_ref"),
      error("duplicate_reference", "$.binding_provenance_ref"),
    ],
  );

  // Case-sensitive: uppercase differs from lowercase
  assertErrors(
    createCandidate({
      binding_issuer_ref: "SRC_SOURCE_1",
      binding_provenance_ref: "src_source_1",
    }),
    [error("duplicate_reference", "$.binding_provenance_ref")],
  );

  // Generic issuer/provenance exact duplicate
  assertErrors(
    createCandidate({
      binding_issuer_ref: "shared.ref:001",
      binding_provenance_ref: "shared.ref:001",
    }),
    [error("duplicate_reference", "$.binding_provenance_ref")],
  );

  // Duplicate against decision_basis_ref, approval_ref, review_session_ref, reviewer_ref
  for (const earlierField of [
    "decision_basis_ref",
    "approval_ref",
    "review_session_ref",
    "reviewer_ref",
    "basis_subject_ref",
  ]) {
    const base = createCandidate();
    assertErrors(
      createCandidate({
        binding_issuer_ref: base[earlierField],
      }),
      [error("duplicate_reference", "$.binding_issuer_ref")],
    );
  }

  // Locally invalid reference neither establishes nor matches a duplicate
  assertErrors(
    createCandidate({
      binding_issuer_ref: "http://forbidden.invalid",
      binding_provenance_ref: "http://forbidden.invalid",
    }),
    [
      error("invalid_field_value", "$.binding_issuer_ref"),
      error("invalid_field_value", "$.binding_provenance_ref"),
    ],
  );

  // Unrelated field error does not suppress Phase 2 duplicate detection among valid references
  assertErrors(
    createCandidate({
      contract_version: "9.9.9",
      binding_issuer_ref: "rvb_basis_1",
    }),
    [
      error("invalid_field_value", "$.contract_version"),
      error("duplicate_reference", "$.binding_issuer_ref"),
    ],
  );

  assert.deepEqual(
    duplicateFields,
    resultSchema.properties.errors.items.oneOf
      .find((branch) => branch.properties.code.const === "duplicate_reference")
      .properties.path.enum.map((p) => p.slice(2)),
  );
});

test("generic reference exclusions reject dot, dot-dot, and all seven URI schemes regardless of case", () => {
  const forbidden = [
    ".",
    "..",
    "http:abc",
    "HTTP:abc",
    "https:abc",
    "HtTpS:abc",
    "ftp:abc",
    "file:abc",
    "mailto:abc",
    "data:abc",
    "javascript:abc",
    "JavaScript:abc",
    "",
    "has space",
    "a".repeat(129),
  ];

  for (const field of genericReferenceFields) {
    for (const badValue of forbidden) {
      assertErrors(createCandidate({ [field]: badValue }), [
        error("invalid_field_value", `$.${field}`),
      ]);
    }
  }
});

test("dedupeErrors preserves first canonical occurrence and candidate input is never mutated", () => {
  const dedupeErrors = loadPrivateDedupeHarness();
  const deduped = dedupeErrors([
    error("invalid_field_value", "$.contract_version"),
    error("duplicate_reference", "$.binding_provenance_ref"),
    error("invalid_field_value", "$.contract_version"),
    error("invalid_field_type", "$.contract_version"),
  ]);
  assert.deepEqual(deduped, [
    error("invalid_field_value", "$.contract_version"),
    error("duplicate_reference", "$.binding_provenance_ref"),
    error("invalid_field_type", "$.contract_version"),
  ]);

  const input = createCandidate();
  const snapshot = structuredClone(input);
  assertErrors(input, []);
  assert.deepEqual(input, snapshot);
});

test("validator module source stays pure, schema-bound, and free of I/O or external behavior", () => {
  const source = readRequired(modulePath);
  const requires = [...source.matchAll(/require\(([^)]+)\)/gu)].map((m) => m[1]);
  assert.deepEqual(requires, [
    '"../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json"',
    '"../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json"',
  ]);

  for (const forbiddenToken of [
    "node:fs",
    "node:http",
    "node:https",
    "node:child_process",
    "process.env",
    "fetch(",
    "console.",
    "eval(",
    "new Function",
    "Date.now",
    "Math.random",
  ]) {
    assert.equal(source.includes(forbiddenToken), false, forbiddenToken);
  }
  assert.equal(rootFields.length, 16);
});
