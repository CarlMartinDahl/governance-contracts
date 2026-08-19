"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const wrapperRelativePath =
  "packages/governance/src/human-review-controlled-handoff-brief-pre-human-professional-approval-validation-boundary.js";
const wrapperPath = path.join(repoRoot, wrapperRelativePath);
const wrapperModuleId = require.resolve(wrapperPath);
const checkpointPath = path.join(
  repoRoot,
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
);
const checkpointModule = require(checkpointPath);
const functionName =
  "validateHumanReviewControlledHandoffBriefCrossReferencePreHumanProfessionalApproval";
const familyFields = [
  "source_register",
  "review_chronology",
  "asserted_claim_matrix",
  "declared_packet_review_gaps",
  "human_review_questions",
  "no_conclusion_notice",
];
const briefReferenceFields = [
  "source_register_ref",
  "review_chronology_ref",
  "asserted_claim_matrix_ref",
  "declared_packet_review_gaps_ref",
  "human_review_questions_ref",
  "no_conclusion_notice_ref",
];

function loadFreshWrapper() {
  delete require.cache[wrapperModuleId];
  return require(wrapperModuleId);
}

function withMockedCheckpoint(checkpoint, callback) {
  const originalCheckpoint =
    checkpointModule.validateHumanReviewControlledHandoffBriefCrossReference;
  checkpointModule.validateHumanReviewControlledHandoffBriefCrossReference =
    checkpoint;

  try {
    return callback(loadFreshWrapper());
  } finally {
    checkpointModule.validateHumanReviewControlledHandoffBriefCrossReference =
      originalCheckpoint;
    delete require.cache[wrapperModuleId];
  }
}

function makeValidEnvelope() {
  const brief = {
    contract_id: "human_review.controlled_handoff_brief",
    contract_version: "1.0.0",
    packet_ref: "pkt_001",
    handoff_posture: "HANDOFF_CANDIDATE_ONLY",
    component_refs: {
      source_register_ref: "hro_source",
      review_chronology_ref: "hro_chronology",
      asserted_claim_matrix_ref: "hro_matrix",
      declared_packet_review_gaps_ref: "hro_gaps",
      human_review_questions_ref: "hro_questions",
      no_conclusion_notice_ref: "hro_notice",
    },
  };
  const candidates = {
    source_register: {
      contract_id: "human_review.source_register",
      contract_version: "1.0.0",
      packet_ref: "pkt_001",
      sources: [
        {
          source_ref: "src_001",
          declared_source_type: "message_thread",
          declared_label: "Synthetic source",
        },
      ],
    },
    review_chronology: {
      contract_id: "human_review.review_chronology",
      contract_version: "1.0.0",
      packet_ref: "pkt_001",
      entries: [],
    },
    asserted_claim_matrix: {
      contract_id: "human_review.asserted_claim_matrix",
      contract_version: "1.0.0",
      packet_ref: "pkt_001",
      claims: [],
    },
    declared_packet_review_gaps: {
      contract_id: "human_review.declared_packet_review_gaps",
      contract_version: "1.0.0",
      packet_ref: "pkt_001",
      gaps: [],
    },
    human_review_questions: {
      contract_id: "human_review.review_questions",
      contract_version: "1.0.0",
      packet_ref: "pkt_001",
      questions: [],
    },
    no_conclusion_notice: {
      contract_id: "human_review.no_conclusion_notice",
      contract_version: "1.0.0",
      packet_ref: "pkt_001",
      notices: [
        {
          notice_ref: "ncn_1",
          declaration_origin: "BOUNDARY_DECLARED",
          notice_code: "NO_MODEL_CONCLUSION_UNDER_CURRENT_BOUNDARY",
          notice_text:
            "No model conclusion is established under the current boundary.",
          source_refs: ["src_001"],
          chronology_entry_refs: [],
          claim_refs: [],
          gap_refs: [],
          question_refs: [],
        },
      ],
    },
  };
  const componentBindings = {};

  for (let index = 0; index < familyFields.length; index += 1) {
    const field = familyFields[index];
    componentBindings[field] = {
      component_ref: brief.component_refs[briefReferenceFields[index]],
      candidate: candidates[field],
    };
  }

  return {
    controlled_handoff_brief: brief,
    component_bindings: componentBindings,
  };
}

test("module exposes exactly one unary internal pre-approval wrapper", () => {
  const wrapper = loadFreshWrapper();
  const governanceIndex = require("../packages/governance/src/index.js");

  assert.deepEqual(Object.keys(wrapper), [functionName]);
  assert.equal(typeof wrapper[functionName], "function");
  assert.equal(wrapper[functionName].length, 1);
  assert.equal(Object.hasOwn(governanceIndex, functionName), false);
});

test("wrapper delegates exactly once and returns the exact checkpoint result", () => {
  const envelope = Object.freeze({ envelope: "sentinel" });
  const sentinelResult = Object.freeze({ result: "sentinel" });
  let invocationCount = 0;
  let receivedEnvelope;

  withMockedCheckpoint(
    (value) => {
      invocationCount += 1;
      receivedEnvelope = value;
      return sentinelResult;
    },
    (wrapper) => {
      const result = wrapper[functionName](envelope);
      assert.equal(invocationCount, 1);
      assert.strictEqual(receivedEnvelope, envelope);
      assert.strictEqual(result, sentinelResult);
    },
  );
});

test("valid envelope behavior remains exact frozen and non-mutating", () => {
  const wrapper = loadFreshWrapper();
  const envelope = makeValidEnvelope();
  const before = JSON.stringify(envelope);
  const result = wrapper[functionName](envelope);

  assert.deepEqual(result, {
    valid: true,
    contractKind:
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_BOUNDARY",
    version: "1.0.0",
    errors: [],
  });
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.errors), true);
  assert.equal(JSON.stringify(envelope), before);
  assert.equal(Object.isFrozen(envelope), false);
});

test("invalid malformed and cyclic envelopes preserve checkpoint results", () => {
  const wrapper = loadFreshWrapper();
  const cyclic = {};
  cyclic.self = cyclic;
  const candidates = [
    null,
    [],
    {},
    cyclic,
    { ...makeValidEnvelope(), unknown_field: true },
  ];

  for (const candidate of candidates) {
    const expected =
      checkpointModule.validateHumanReviewControlledHandoffBriefCrossReference(
        candidate,
      );
    let actual;
    assert.doesNotThrow(() => {
      actual = wrapper[functionName](candidate);
    });
    assert.deepEqual(actual, expected);
    assert.equal(actual.valid, false);
    assert.equal(Object.isFrozen(actual), true);
    assert.equal(Object.isFrozen(actual.errors), true);
  }
});

test("accessors are not executed and rejected values are not echoed", () => {
  const wrapper = loadFreshWrapper();
  const secret = "private-value-must-not-echo";
  let getterCalls = 0;
  const envelope = {};

  Object.defineProperty(envelope, "controlled_handoff_brief", {
    enumerable: true,
    get() {
      getterCalls += 1;
      return secret;
    },
  });

  const result = wrapper[functionName](envelope);
  assert.equal(getterCalls, 0);
  assert.equal(result.valid, false);
  assert.equal(JSON.stringify(result).includes(secret), false);
});

test("repeated calls remain deterministic and preserve caller input", () => {
  const wrapper = loadFreshWrapper();
  const envelope = makeValidEnvelope();
  envelope.component_bindings.source_register.candidate.packet_ref =
    "pkt_other";
  const before = JSON.stringify(envelope);
  const first = wrapper[functionName](envelope);
  const second = wrapper[functionName](envelope);

  assert.deepEqual(first, second);
  assert.equal(JSON.stringify(envelope), before);
  assert.deepEqual(first.errors, [
    {
      code: "packet_ref_mismatch",
      path: "$.component_bindings.source_register.candidate.packet_ref",
    },
  ]);
});

test("unexpected checkpoint faults propagate without translation", () => {
  const sentinel = new Error("synthetic-checkpoint-fault");

  withMockedCheckpoint(
    () => {
      throw sentinel;
    },
    (wrapper) => {
      assert.throws(
        () => wrapper[functionName](makeValidEnvelope()),
        (error) => error === sentinel,
      );
    },
  );
});

test("module source contains only the frozen direct-delegation surface", () => {
  const source = fs.readFileSync(wrapperPath, "utf8");
  const governanceIndexSource = fs.readFileSync(
    path.join(repoRoot, "packages/governance/src/index.js"),
    "utf8",
  );

  assert.match(
    source,
    /require\("\.\/human-review-controlled-handoff-brief-cross-reference-validation-boundary\.js"\)/u,
  );
  assert.match(
    source,
    /return validateHumanReviewControlledHandoffBriefCrossReference\(envelope\);/u,
  );
  assert.equal(
    (
      source.match(
        /validateHumanReviewControlledHandoffBriefCrossReference\(envelope\)/gu,
      ) ?? []
    ).length,
    1,
  );
  assert.doesNotMatch(
    source,
    /node:fs|node:http|node:https|node:net|process\.env|console\.|logger|telemetry|metrics|tracing|audit|JSON\.parse|JSON\.stringify/u,
  );
  assert.equal(governanceIndexSource.includes(functionName), false);
});
