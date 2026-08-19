"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const boundaryPath = path.join(
  repoRoot,
  "packages/governance/src/human-review-no-conclusion-notice-cross-reference-validation-boundary.js",
);
const boundaryModuleId = require.resolve(boundaryPath);
const noticeValidatorPath = path.join(
  repoRoot,
  "packages/schemas/src/human-review-no-conclusion-notice-validator.js",
);
const matrixValidatorPath = path.join(
  repoRoot,
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
);
const gapsValidatorPath = path.join(
  repoRoot,
  "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
);
const questionsValidatorPath = path.join(
  repoRoot,
  "packages/schemas/src/human-review-questions-validator.js",
);
const noticeValidatorModule = require(noticeValidatorPath);
const matrixValidatorModule = require(matrixValidatorPath);
const gapsValidatorModule = require(gapsValidatorPath);
const questionsValidatorModule = require(questionsValidatorPath);
const schemasIndexPath = path.join(repoRoot, "packages/schemas/src/index.js");
const packageSchemas = require(schemasIndexPath);
const resultSchema = require("../schemas/human-review-no-conclusion-notice-cross-reference-result.json");

function loadFreshBoundary() {
  delete require.cache[boundaryModuleId];
  return require(boundaryModuleId);
}

function withMockedValidators(
  noticeValidator,
  sourceValidator,
  chronologyValidator,
  matrixValidator,
  gapsValidator,
  questionsValidator,
  callback,
) {
  const originalNoticeValidator =
    noticeValidatorModule.validateHumanReviewNoConclusionNotice;
  const originalSourceValidator =
    packageSchemas.validateHumanReviewSourceRegister;
  const originalChronologyValidator =
    packageSchemas.validateHumanReviewChronology;
  const originalMatrixValidator =
    matrixValidatorModule.validateHumanReviewAssertedClaimMatrix;
  const originalGapsValidator =
    gapsValidatorModule.validateHumanReviewDeclaredPacketReviewGaps;
  const originalQuestionsValidator =
    questionsValidatorModule.validateHumanReviewQuestions;

  noticeValidatorModule.validateHumanReviewNoConclusionNotice = noticeValidator;
  packageSchemas.validateHumanReviewSourceRegister = sourceValidator;
  packageSchemas.validateHumanReviewChronology = chronologyValidator;
  matrixValidatorModule.validateHumanReviewAssertedClaimMatrix =
    matrixValidator;
  gapsValidatorModule.validateHumanReviewDeclaredPacketReviewGaps =
    gapsValidator;
  questionsValidatorModule.validateHumanReviewQuestions = questionsValidator;

  try {
    return callback(loadFreshBoundary());
  } finally {
    noticeValidatorModule.validateHumanReviewNoConclusionNotice =
      originalNoticeValidator;
    packageSchemas.validateHumanReviewSourceRegister =
      originalSourceValidator;
    packageSchemas.validateHumanReviewChronology =
      originalChronologyValidator;
    matrixValidatorModule.validateHumanReviewAssertedClaimMatrix =
      originalMatrixValidator;
    gapsValidatorModule.validateHumanReviewDeclaredPacketReviewGaps =
      originalGapsValidator;
    questionsValidatorModule.validateHumanReviewQuestions =
      originalQuestionsValidator;
    delete require.cache[boundaryModuleId];
  }
}

function makeNotice({
  index = 0,
  sourceRefs = ["src_001"],
  chronologyEntryRefs = [],
  claimRefs = [],
  gapRefs = [],
  questionRefs = [],
} = {}) {
  return {
    notice_ref: `ncn_${index + 1}`,
    declaration_origin: "BOUNDARY_DECLARED",
    notice_code: "NO_MODEL_CONCLUSION_UNDER_CURRENT_BOUNDARY",
    notice_text:
      "No model conclusion is established under the current boundary.",
    source_refs: [...sourceRefs],
    chronology_entry_refs: [...chronologyEntryRefs],
    claim_refs: [...claimRefs],
    gap_refs: [...gapRefs],
    question_refs: [...questionRefs],
  };
}

function makeValidNotice({ packetRef = "pkt_001", notices } = {}) {
  return {
    contract_id: "human_review.no_conclusion_notice",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    notices: notices ?? [makeNotice()],
  };
}

function makeValidSourceRegister({
  packetRef = "pkt_001",
  sourceRefs = ["src_001"],
} = {}) {
  return {
    contract_id: "human_review.source_register",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    sources: sourceRefs.map((sourceRef, index) => ({
      source_ref: sourceRef,
      declared_source_type: "message_thread",
      declared_label: `Synthetic source ${index + 1}`,
    })),
  };
}

function makeValidChronology({
  packetRef = "pkt_001",
  entryRefs = [],
  sourceRef = "src_001",
} = {}) {
  return {
    contract_id: "human_review.review_chronology",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    entries: entryRefs.map((entryRef, index) => ({
      entry_ref: entryRef,
      review_state: "HUMAN_REVIEW_REQUIRED",
      temporal_status: "UNKNOWN",
      declared_temporal_text: null,
      review_text: `Synthetic review entry ${index + 1}`,
      source_refs: [sourceRef],
    })),
  };
}

function makeValidMatrix({
  packetRef = "pkt_001",
  claimRefs = [],
  sourceRef = "src_001",
  chronologyEntryRefs = [],
} = {}) {
  return {
    contract_id: "human_review.asserted_claim_matrix",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    claims: claimRefs.map((claimRef, index) => ({
      claim_ref: claimRef,
      review_state: "HUMAN_REVIEW_REQUIRED",
      asserted_claim_text: `Synthetic asserted claim ${index + 1}`,
      supplied_material_observation_text: null,
      source_refs: [sourceRef],
      chronology_entry_refs: [...chronologyEntryRefs],
    })),
  };
}

function makeGap({
  index = 0,
  gapRef = `gap_${index + 1}`,
  sourceRefs = [],
  chronologyEntryRefs = [],
  claimRefs = [],
} = {}) {
  return {
    gap_ref: gapRef,
    declaration_origin: "HUMAN_DECLARED",
    declared_gap_text: `Synthetic declared review gap ${index + 1}`,
    source_refs: [...sourceRefs],
    chronology_entry_refs: [...chronologyEntryRefs],
    claim_refs: [...claimRefs],
  };
}

function makeValidGaps({ packetRef = "pkt_001", gaps = [] } = {}) {
  return {
    contract_id: "human_review.declared_packet_review_gaps",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    gaps,
  };
}

function makeQuestion({
  index = 0,
  questionRef = `qst_${index + 1}`,
  sourceRefs = ["src_001"],
  chronologyEntryRefs = [],
  claimRefs = [],
  gapRefs = [],
} = {}) {
  return {
    question_ref: questionRef,
    declaration_origin: "HUMAN_DECLARED",
    declared_question_text: `Synthetic review question ${index + 1}`,
    source_refs: [...sourceRefs],
    chronology_entry_refs: [...chronologyEntryRefs],
    claim_refs: [...claimRefs],
    gap_refs: [...gapRefs],
  };
}

function makeValidQuestions({ packetRef = "pkt_001", questions = [] } = {}) {
  return {
    contract_id: "human_review.review_questions",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    questions,
  };
}

function makeEnvelope(
  humanReviewNoConclusionNotice = makeValidNotice(),
  sourceRegister = makeValidSourceRegister(),
  reviewChronology = makeValidChronology(),
  assertedClaimMatrix = makeValidMatrix(),
  declaredPacketReviewGaps = makeValidGaps(),
  humanReviewQuestions = makeValidQuestions(),
) {
  return {
    human_review_no_conclusion_notice: humanReviewNoConclusionNotice,
    source_register: sourceRegister,
    review_chronology: reviewChronology,
    asserted_claim_matrix: assertedClaimMatrix,
    declared_packet_review_gaps: declaredPacketReviewGaps,
    human_review_questions: humanReviewQuestions,
  };
}

function invalidInputShapeResult() {
  return {
    valid: false,
    contractKind:
      "HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_BOUNDARY",
    version: "1.0.0",
    errors: [{ code: "invalid_input_shape", path: "$" }],
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
    Object.getPrototypeOf(result) !== Object.prototype ||
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

test("module exposes exactly one unary direct internal checkpoint", () => {
  const boundary = loadFreshBoundary();
  const governanceIndex = require("../packages/governance/src/index.js");

  assert.deepEqual(Object.keys(boundary), [
    "validateHumanReviewNoConclusionNoticeCrossReference",
  ]);
  assert.equal(
    typeof boundary.validateHumanReviewNoConclusionNoticeCrossReference,
    "function",
  );
  assert.equal(
    boundary.validateHumanReviewNoConclusionNoticeCrossReference.length,
    1,
  );
  assert.equal(
    Object.hasOwn(
      governanceIndex,
      "validateHumanReviewNoConclusionNoticeCrossReference",
    ),
    false,
  );
  assert.equal(
    Object.hasOwn(
      packageSchemas,
      "validateHumanReviewNoConclusionNoticeCrossReference",
    ),
    false,
  );
});

test("valid minimal and populated envelopes return exact frozen successes", () => {
  const boundary = loadFreshBoundary();
  const minimalEnvelope = makeEnvelope();
  const populatedEnvelope = makeEnvelope(
    makeValidNotice({
      notices: [
        makeNotice({
          sourceRefs: ["src_001"],
          chronologyEntryRefs: ["chr_001"],
          claimRefs: ["clm_001"],
          gapRefs: ["gap_1"],
          questionRefs: ["qst_1"],
        }),
      ],
    }),
    makeValidSourceRegister(),
    makeValidChronology({ entryRefs: ["chr_001"] }),
    makeValidMatrix({
      claimRefs: ["clm_001"],
      chronologyEntryRefs: ["chr_001"],
    }),
    makeValidGaps({ gaps: [makeGap()] }),
    makeValidQuestions({ questions: [makeQuestion()] }),
  );

  for (const envelope of [minimalEnvelope, populatedEnvelope]) {
    const before = JSON.stringify(envelope);
    const result =
      boundary.validateHumanReviewNoConclusionNoticeCrossReference(envelope);

    assert.deepEqual(result, {
      valid: true,
      contractKind:
        "HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_BOUNDARY",
      version: "1.0.0",
      errors: [],
    });
    assert.equal(matchesResultContract(result), true);
    assert.equal(JSON.stringify(envelope), before);
    assert.equal(Object.isFrozen(envelope), false);
  }
});

test("null-prototype and non-enumerable exact data envelopes are accepted", () => {
  const boundary = loadFreshBoundary();
  const envelope = Object.create(null);

  for (const [field, value] of [
    ["human_review_no_conclusion_notice", makeValidNotice()],
    ["source_register", makeValidSourceRegister()],
    ["review_chronology", makeValidChronology()],
    ["asserted_claim_matrix", makeValidMatrix()],
    ["declared_packet_review_gaps", makeValidGaps()],
    ["human_review_questions", makeValidQuestions()],
  ]) {
    Object.defineProperty(envelope, field, {
      value,
      enumerable: false,
    });
  }

  const result =
    boundary.validateHumanReviewNoConclusionNoticeCrossReference(envelope);

  assert.equal(result.valid, true);
  assert.equal(matchesResultContract(result), true);
});

test("malformed reordered unknown and trap-backed envelopes fail closed", () => {
  const boundary = loadFreshBoundary();
  const extraSymbolEnvelope = makeEnvelope();
  extraSymbolEnvelope[Symbol("extra")] = true;
  const customPrototypeEnvelope = Object.assign(
    Object.create({ inherited: true }),
    makeEnvelope(),
  );
  const prototypeTrapEnvelope = new Proxy(makeEnvelope(), {
    getPrototypeOf() {
      throw new Error("must fail closed");
    },
  });
  const descriptorTrapEnvelope = new Proxy(makeEnvelope(), {
    ownKeys() {
      throw new Error("must fail closed");
    },
  });
  const invalidEnvelopes = [
    undefined,
    null,
    false,
    1,
    "envelope",
    [],
    new Date(0),
    () => makeEnvelope(),
    {},
    { human_review_no_conclusion_notice: makeValidNotice() },
    {
      human_review_no_conclusion_notice: makeValidNotice(),
      source_register: makeValidSourceRegister(),
      review_chronology: makeValidChronology(),
      asserted_claim_matrix: makeValidMatrix(),
      declared_packet_review_gaps: makeValidGaps(),
    },
    {
      source_register: makeValidSourceRegister(),
      human_review_no_conclusion_notice: makeValidNotice(),
      review_chronology: makeValidChronology(),
      asserted_claim_matrix: makeValidMatrix(),
      declared_packet_review_gaps: makeValidGaps(),
      human_review_questions: makeValidQuestions(),
    },
    { ...makeEnvelope(), extra: true },
    extraSymbolEnvelope,
    customPrototypeEnvelope,
    Object.create(makeEnvelope()),
    prototypeTrapEnvelope,
    descriptorTrapEnvelope,
  ];

  for (const envelope of invalidEnvelopes) {
    let result;

    assert.doesNotThrow(() => {
      result =
        boundary.validateHumanReviewNoConclusionNoticeCrossReference(envelope);
    });
    assert.deepEqual(result, invalidInputShapeResult());
    assert.equal(matchesResultContract(result), true);
  }
});

test("envelope accessors are rejected without execution or child calls", () => {
  let getterCalls = 0;
  const calls = [];
  const envelope = {};

  Object.defineProperty(envelope, "human_review_no_conclusion_notice", {
    enumerable: true,
    get() {
      getterCalls += 1;
      return makeValidNotice();
    },
  });
  for (const [field, value] of [
    ["source_register", makeValidSourceRegister()],
    ["review_chronology", makeValidChronology()],
    ["asserted_claim_matrix", makeValidMatrix()],
    ["declared_packet_review_gaps", makeValidGaps()],
    ["human_review_questions", makeValidQuestions()],
  ]) {
    Object.defineProperty(envelope, field, { enumerable: true, value });
  }

  withMockedValidators(
    () => {
      calls.push("notice");
      return { valid: true };
    },
    () => {
      calls.push("source");
      return { valid: true };
    },
    () => {
      calls.push("chronology");
      return { valid: true };
    },
    () => {
      calls.push("matrix");
      return { valid: true };
    },
    () => {
      calls.push("gaps");
      return { valid: true };
    },
    () => {
      calls.push("questions");
      return { valid: true };
    },
    (boundary) => {
      const result =
        boundary.validateHumanReviewNoConclusionNoticeCrossReference(envelope);
      assert.deepEqual(result, invalidInputShapeResult());
    },
  );

  assert.equal(getterCalls, 0);
  assert.deepEqual(calls, []);
});

test("all six child validators run once in canonical order with direct values", () => {
  const noticeCandidate = Object.freeze({ notices: "sentinel" });
  const sourceCandidate = Object.freeze({ sources: "sentinel" });
  const chronologyCandidate = Object.freeze({ entries: "sentinel" });
  const matrixCandidate = Object.freeze({ claims: "sentinel" });
  const gapsCandidate = Object.freeze({ gaps: "sentinel" });
  const questionsCandidate = Object.freeze({ questions: "sentinel" });
  const names = ["notice", "source", "chronology", "matrix", "gaps", "questions"];
  const results = names.map((name) =>
    Object.freeze({
      valid: false,
      errors: Object.freeze([{ private: `${name}-secret` }]),
    }),
  );
  const calls = [];

  withMockedValidators(
    (candidate) => {
      calls.push(["human_review_no_conclusion_notice", candidate]);
      return results[0];
    },
    (candidate) => {
      calls.push(["source_register", candidate]);
      return results[1];
    },
    (candidate) => {
      calls.push(["review_chronology", candidate]);
      return results[2];
    },
    (candidate) => {
      calls.push(["asserted_claim_matrix", candidate]);
      return results[3];
    },
    (candidate) => {
      calls.push(["declared_packet_review_gaps", candidate]);
      return results[4];
    },
    (candidate) => {
      calls.push(["human_review_questions", candidate]);
      return results[5];
    },
    (boundary) => {
      const result =
        boundary.validateHumanReviewNoConclusionNoticeCrossReference(
          makeEnvelope(
            noticeCandidate,
            sourceCandidate,
            chronologyCandidate,
            matrixCandidate,
            gapsCandidate,
            questionsCandidate,
          ),
        );

      assert.deepEqual(result.errors, [
        {
          code: "human_review_no_conclusion_notice_invalid",
          path: "$.human_review_no_conclusion_notice",
        },
        { code: "source_register_invalid", path: "$.source_register" },
        { code: "review_chronology_invalid", path: "$.review_chronology" },
        {
          code: "asserted_claim_matrix_invalid",
          path: "$.asserted_claim_matrix",
        },
        {
          code: "declared_packet_review_gaps_invalid",
          path: "$.declared_packet_review_gaps",
        },
        {
          code: "human_review_questions_invalid",
          path: "$.human_review_questions",
        },
      ]);
      assert.equal(JSON.stringify(result).includes("secret"), false);
      assert.equal(matchesResultContract(result), true);
    },
  );

  assert.deepEqual(calls, [
    ["human_review_no_conclusion_notice", noticeCandidate],
    ["source_register", sourceCandidate],
    ["review_chronology", chronologyCandidate],
    ["asserted_claim_matrix", matrixCandidate],
    ["declared_packet_review_gaps", gapsCandidate],
    ["human_review_questions", questionsCandidate],
  ]);
  assert.equal(results.every(Object.isFrozen), true);
});

test("real child failures reduce to the six bounded aggregate errors", () => {
  const boundary = loadFreshBoundary();
  const result =
    boundary.validateHumanReviewNoConclusionNoticeCrossReference({
      human_review_no_conclusion_notice: { private_notice: "must-not-echo" },
      source_register: { private_source: "must-not-echo" },
      review_chronology: { private_chronology: "must-not-echo" },
      asserted_claim_matrix: { private_claim: "must-not-echo" },
      declared_packet_review_gaps: { private_gap: "must-not-echo" },
      human_review_questions: { private_question: "must-not-echo" },
    });

  assert.deepEqual(result.errors, [
    {
      code: "human_review_no_conclusion_notice_invalid",
      path: "$.human_review_no_conclusion_notice",
    },
    { code: "source_register_invalid", path: "$.source_register" },
    { code: "review_chronology_invalid", path: "$.review_chronology" },
    {
      code: "asserted_claim_matrix_invalid",
      path: "$.asserted_claim_matrix",
    },
    {
      code: "declared_packet_review_gaps_invalid",
      path: "$.declared_packet_review_gaps",
    },
    {
      code: "human_review_questions_invalid",
      path: "$.human_review_questions",
    },
  ]);
  assert.equal(JSON.stringify(result).includes("private"), false);
  assert.equal(matchesResultContract(result), true);
});

test("packet mismatches aggregate in exact order and stop memberships", () => {
  const noticeCandidate = { packet_ref: "pkt_anchor" };
  const sourceCandidate = { packet_ref: "pkt_source" };
  const chronologyCandidate = { packet_ref: "pkt_chronology" };
  const matrixCandidate = { packet_ref: "pkt_matrix" };
  const gapsCandidate = { packet_ref: "pkt_gaps" };
  const questionsCandidate = { packet_ref: "pkt_questions" };

  for (const [candidate, field] of [
    [noticeCandidate, "notices"],
    [sourceCandidate, "sources"],
    [chronologyCandidate, "entries"],
    [matrixCandidate, "claims"],
    [gapsCandidate, "gaps"],
    [questionsCandidate, "questions"],
  ]) {
    Object.defineProperty(candidate, field, {
      get() {
        throw new Error("membership traversal must not run");
      },
    });
  }

  withMockedValidators(
    () => ({ valid: true }),
    () => ({ valid: true }),
    () => ({ valid: true }),
    () => ({ valid: true }),
    () => ({ valid: true }),
    () => ({ valid: true }),
    (boundary) => {
      let result;

      assert.doesNotThrow(() => {
        result =
          boundary.validateHumanReviewNoConclusionNoticeCrossReference(
            makeEnvelope(
              noticeCandidate,
              sourceCandidate,
              chronologyCandidate,
              matrixCandidate,
              gapsCandidate,
              questionsCandidate,
            ),
          );
      });
      assert.deepEqual(result.errors, [
        {
          code: "packet_ref_mismatch",
          path: "$.source_register.packet_ref",
        },
        {
          code: "packet_ref_mismatch",
          path: "$.review_chronology.packet_ref",
        },
        {
          code: "packet_ref_mismatch",
          path: "$.asserted_claim_matrix.packet_ref",
        },
        {
          code: "packet_ref_mismatch",
          path: "$.declared_packet_review_gaps.packet_ref",
        },
        {
          code: "packet_ref_mismatch",
          path: "$.human_review_questions.packet_ref",
        },
      ]);
      assert.equal(matchesResultContract(result), true);
    },
  );
});

test("membership errors follow source chronology claim gap then question order", () => {
  const boundary = loadFreshBoundary();
  const notice = makeValidNotice({
    notices: [
      makeNotice({
        index: 0,
        sourceRefs: ["src_missing_a", "src_present", "src_missing_b"],
        chronologyEntryRefs: ["chr_missing_a", "chr_present"],
        claimRefs: ["clm_missing_a", "clm_present"],
        gapRefs: ["gap_missing_a", "gap_present"],
        questionRefs: ["qst_missing_a", "qst_present"],
      }),
      makeNotice({
        index: 1,
        sourceRefs: ["src_missing_a"],
        chronologyEntryRefs: ["chr_missing_a"],
        claimRefs: ["clm_missing_a"],
        gapRefs: ["gap_missing_a"],
        questionRefs: ["qst_missing_a"],
      }),
    ],
  });
  const result =
    boundary.validateHumanReviewNoConclusionNoticeCrossReference(
      makeEnvelope(
        notice,
        makeValidSourceRegister({ sourceRefs: ["src_present"] }),
        makeValidChronology({
          entryRefs: ["chr_present"],
          sourceRef: "src_present",
        }),
        makeValidMatrix({
          claimRefs: ["clm_present"],
          sourceRef: "src_present",
          chronologyEntryRefs: ["chr_present"],
        }),
        makeValidGaps({ gaps: [makeGap({ gapRef: "gap_present" })] }),
        makeValidQuestions({
          questions: [makeQuestion({ questionRef: "qst_present" })],
        }),
      ),
    );

  assert.deepEqual(result.errors, [
    {
      code: "source_ref_not_in_register",
      path:
        "$.human_review_no_conclusion_notice.notices[0].source_refs[0]",
    },
    {
      code: "source_ref_not_in_register",
      path:
        "$.human_review_no_conclusion_notice.notices[0].source_refs[2]",
    },
    {
      code: "source_ref_not_in_register",
      path:
        "$.human_review_no_conclusion_notice.notices[1].source_refs[0]",
    },
    {
      code: "chronology_entry_ref_not_in_chronology",
      path:
        "$.human_review_no_conclusion_notice.notices[0].chronology_entry_refs[0]",
    },
    {
      code: "chronology_entry_ref_not_in_chronology",
      path:
        "$.human_review_no_conclusion_notice.notices[1].chronology_entry_refs[0]",
    },
    {
      code: "claim_ref_not_in_asserted_claim_matrix",
      path: "$.human_review_no_conclusion_notice.notices[0].claim_refs[0]",
    },
    {
      code: "claim_ref_not_in_asserted_claim_matrix",
      path: "$.human_review_no_conclusion_notice.notices[1].claim_refs[0]",
    },
    {
      code: "gap_ref_not_in_declared_packet_review_gaps",
      path: "$.human_review_no_conclusion_notice.notices[0].gap_refs[0]",
    },
    {
      code: "gap_ref_not_in_declared_packet_review_gaps",
      path: "$.human_review_no_conclusion_notice.notices[1].gap_refs[0]",
    },
    {
      code: "question_ref_not_in_human_review_questions",
      path:
        "$.human_review_no_conclusion_notice.notices[0].question_refs[0]",
    },
    {
      code: "question_ref_not_in_human_review_questions",
      path:
        "$.human_review_no_conclusion_notice.notices[1].question_refs[0]",
    },
  ]);
  assert.equal(result.valid, false);
  assert.equal(matchesResultContract(result), true);
});

test("present references may be reused across distinct notice rows", () => {
  const boundary = loadFreshBoundary();
  const references = {
    sourceRefs: ["src_001"],
    chronologyEntryRefs: ["chr_001"],
    claimRefs: ["clm_001"],
    gapRefs: ["gap_1"],
    questionRefs: ["qst_1"],
  };
  const result =
    boundary.validateHumanReviewNoConclusionNoticeCrossReference(
      makeEnvelope(
        makeValidNotice({
          notices: [
            makeNotice({ index: 0, ...references }),
            makeNotice({ index: 1, ...references }),
          ],
        }),
        makeValidSourceRegister({ sourceRefs: references.sourceRefs }),
        makeValidChronology({ entryRefs: references.chronologyEntryRefs }),
        makeValidMatrix({ claimRefs: references.claimRefs }),
        makeValidGaps({ gaps: [makeGap()] }),
        makeValidQuestions({ questions: [makeQuestion()] }),
      ),
    );

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
  assert.equal(matchesResultContract(result), true);
});

test("results are deterministic newly constructed frozen and value free", () => {
  const boundary = loadFreshBoundary();
  const privateReferences = {
    sourceRefs: ["src_private_reference"],
    chronologyEntryRefs: ["chr_private_reference"],
    claimRefs: ["clm_private_reference"],
    gapRefs: ["gap_private_reference"],
    questionRefs: ["qst_private_reference"],
  };
  const envelope = makeEnvelope(
    makeValidNotice({ notices: [makeNotice(privateReferences)] }),
  );
  const before = JSON.stringify(envelope);
  const first =
    boundary.validateHumanReviewNoConclusionNoticeCrossReference(envelope);
  const second =
    boundary.validateHumanReviewNoConclusionNoticeCrossReference(envelope);

  assert.deepEqual(first, second);
  assert.notStrictEqual(first, second);
  assert.notStrictEqual(first.errors, second.errors);
  assert.notStrictEqual(first.errors[0], second.errors[0]);
  for (const privateReference of Object.values(privateReferences).flat()) {
    assert.equal(JSON.stringify(first).includes(privateReference), false);
  }
  assert.equal(JSON.stringify(envelope), before);
  assert.equal(matchesResultContract(first), true);
});

test("unexpected child validator faults are not caught or translated", () => {
  const sentinel = new Error("unexpected-validator-fault");
  const laterCalls = [];

  withMockedValidators(
    () => {
      throw sentinel;
    },
    () => {
      laterCalls.push("source");
      return { valid: true };
    },
    () => {
      laterCalls.push("chronology");
      return { valid: true };
    },
    () => {
      laterCalls.push("matrix");
      return { valid: true };
    },
    () => {
      laterCalls.push("gaps");
      return { valid: true };
    },
    () => {
      laterCalls.push("questions");
      return { valid: true };
    },
    (boundary) => {
      assert.throws(
        () =>
          boundary.validateHumanReviewNoConclusionNoticeCrossReference(
            makeEnvelope(),
          ),
        (error) => error === sentinel,
      );
    },
  );

  assert.deepEqual(laterCalls, []);
});

test("module remains in-process with no predecessor or public wiring", () => {
  const source = fs.readFileSync(boundaryPath, "utf8");
  const governanceIndexSource = fs.readFileSync(
    path.join(repoRoot, "packages/governance/src/index.js"),
    "utf8",
  );

  for (const importPath of [
    "human-review-no-conclusion-notice-validator.js",
    "human-review-asserted-claim-matrix-validator.js",
    "human-review-declared-packet-review-gaps-validator.js",
    "human-review-questions-validator.js",
    "index.js",
  ]) {
    assert.match(source, new RegExp(`require\\(\"[^\"]*${importPath}\"\\)`, "u"));
  }
  for (const [callPattern, expectedCount] of [
    [
      /validateHumanReviewNoConclusionNotice\(\s*input\.humanReviewNoConclusionNotice/gu,
      1,
    ],
    [
      /validateHumanReviewSourceRegister\(\s*input\.sourceRegister/gu,
      1,
    ],
    [
      /validateHumanReviewChronology\(\s*input\.reviewChronology/gu,
      1,
    ],
    [
      /validateHumanReviewAssertedClaimMatrix\(\s*input\.assertedClaimMatrix/gu,
      1,
    ],
    [
      /validateHumanReviewDeclaredPacketReviewGaps\(\s*input\.declaredPacketReviewGaps/gu,
      1,
    ],
    [
      /validateHumanReviewQuestions\(\s*input\.humanReviewQuestions/gu,
      1,
    ],
  ]) {
    assert.equal((source.match(callPattern) ?? []).length, expectedCount);
  }
  assert.doesNotMatch(
    source,
    /source-register-pre-downstream-validation-boundary|chronology-source-register-validation-boundary|asserted-claim-matrix-validation-boundary|declared-packet-review-gaps-cross-reference-validation-boundary|questions-cross-reference-validation-boundary/u,
  );
  assert.doesNotMatch(
    source,
    /node:fs|node:http|node:https|node:net|process\.env|console\.|logger|telemetry|metrics|tracing|audit|JSON\.parse|JSON\.stringify/u,
  );
  assert.equal(
    governanceIndexSource.includes(
      "validateHumanReviewNoConclusionNoticeCrossReference",
    ),
    false,
  );
});
