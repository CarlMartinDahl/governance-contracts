"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const wrapperRelativePath =
  "packages/governance/src/human-review-questions-pre-controlled-handoff-validation-boundary.js";
const wrapperPath = path.join(repoRoot, wrapperRelativePath);
const wrapperModuleId = require.resolve(wrapperPath);
const checkpointPath = path.join(
  repoRoot,
  "packages/governance/src/human-review-questions-cross-reference-validation-boundary.js",
);
const checkpointModule = require(checkpointPath);
const functionName =
  "validateHumanReviewQuestionsCrossReferencePreControlledHandoff";

function loadFreshWrapper() {
  delete require.cache[wrapperModuleId];
  return require(wrapperModuleId);
}

function withMockedCheckpoint(checkpoint, callback) {
  const originalCheckpoint =
    checkpointModule.validateHumanReviewQuestionsCrossReference;

  checkpointModule.validateHumanReviewQuestionsCrossReference = checkpoint;

  try {
    return callback(loadFreshWrapper());
  } finally {
    checkpointModule.validateHumanReviewQuestionsCrossReference =
      originalCheckpoint;
    delete require.cache[wrapperModuleId];
  }
}

function makeValidEnvelope() {
  return {
    human_review_questions: {
      contract_id: "human_review.review_questions",
      contract_version: "1.0.0",
      packet_ref: "pkt_001",
      questions: [],
    },
    source_register: {
      contract_id: "human_review.source_register",
      contract_version: "1.0.0",
      packet_ref: "pkt_001",
      sources: [],
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
  };
}

test("module exposes exactly one unary internal pre-handoff wrapper", () => {
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
    contractKind: "HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_BOUNDARY",
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
      checkpointModule.validateHumanReviewQuestionsCrossReference(candidate);
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

  Object.defineProperty(envelope, "human_review_questions", {
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
  envelope.source_register.packet_ref = "pkt_other";
  const before = JSON.stringify(envelope);
  const first = wrapper[functionName](envelope);
  const second = wrapper[functionName](envelope);

  assert.deepEqual(first, second);
  assert.equal(JSON.stringify(envelope), before);
  assert.equal(first.valid, false);
  assert.deepEqual(first.errors, [
    { code: "packet_ref_mismatch", path: "$.source_register.packet_ref" },
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
    /require\("\.\/human-review-questions-cross-reference-validation-boundary\.js"\)/u,
  );
  assert.match(
    source,
    /return validateHumanReviewQuestionsCrossReference\(envelope\);/u,
  );
  assert.equal(
    (
      source.match(
        /validateHumanReviewQuestionsCrossReference\(envelope\)/gu,
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
