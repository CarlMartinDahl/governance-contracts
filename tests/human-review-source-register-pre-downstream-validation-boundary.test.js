"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const consumerRelativePath =
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js";
const consumerPath = path.join(repoRoot, consumerRelativePath);
const consumerModuleId = require.resolve(consumerPath);
const schemasIndexPath = path.join(repoRoot, "packages/schemas/src/index.js");
const packageSchemas = require(schemasIndexPath);
const directValidatorModule = require("../packages/schemas/src/human-review-source-register-validator.js");

function loadFreshConsumer() {
  delete require.cache[consumerModuleId];
  return require(consumerModuleId);
}

function makeValidCandidate() {
  return {
    contract_id: "human_review.source_register",
    contract_version: "1.0.0",
    packet_ref: "pkt_001",
    sources: [
      {
        source_ref: "src_001",
        declared_source_type: "message_thread",
        declared_label: "Synthetic message export",
      },
    ],
  };
}

test("module exposes exactly one unary internal checkpoint", () => {
  const consumer = loadFreshConsumer();
  const governanceIndex = require("../packages/governance/src/index.js");

  assert.deepEqual(Object.keys(consumer), [
    "validateHumanReviewSourceRegisterForDownstream",
  ]);
  assert.equal(
    typeof consumer.validateHumanReviewSourceRegisterForDownstream,
    "function",
  );
  assert.equal(
    consumer.validateHumanReviewSourceRegisterForDownstream.length,
    1,
  );
  assert.equal(
    Object.hasOwn(
      governanceIndex,
      "validateHumanReviewSourceRegisterForDownstream",
    ),
    false,
  );
});

test("checkpoint delegates exactly once and returns the exact validator result", () => {
  const originalValidator = packageSchemas.validateHumanReviewSourceRegister;
  const candidate = Object.freeze({ candidate: "sentinel" });
  const sentinelResult = Object.freeze({ result: "sentinel" });
  let invocationCount = 0;
  let receivedCandidate;

  packageSchemas.validateHumanReviewSourceRegister = (value) => {
    invocationCount += 1;
    receivedCandidate = value;
    return sentinelResult;
  };

  try {
    const consumer = loadFreshConsumer();
    const result =
      consumer.validateHumanReviewSourceRegisterForDownstream(candidate);

    assert.equal(invocationCount, 1);
    assert.strictEqual(receivedCandidate, candidate);
    assert.strictEqual(result, sentinelResult);
  } finally {
    packageSchemas.validateHumanReviewSourceRegister = originalValidator;
    delete require.cache[consumerModuleId];
  }
});

test("valid candidate behavior remains exact frozen and non-mutating", () => {
  const consumer = loadFreshConsumer();
  const candidate = makeValidCandidate();
  const before = JSON.stringify(candidate);
  const result =
    consumer.validateHumanReviewSourceRegisterForDownstream(candidate);

  assert.deepEqual(result, {
    valid: true,
    contractKind: "HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors: [],
  });
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.errors), true);
  assert.equal(JSON.stringify(candidate), before);
  assert.equal(Object.isFrozen(candidate), false);
});

test("invalid and malformed candidates preserve validator results without throws", () => {
  const consumer = loadFreshConsumer();
  const cyclic = {};
  cyclic.self = cyclic;
  const candidates = [null, [], {}, cyclic, { ...makeValidCandidate(), packet_ref: "../bad" }];

  for (const candidate of candidates) {
    const expected = directValidatorModule.validateHumanReviewSourceRegister(candidate);
    let actual;

    assert.doesNotThrow(() => {
      actual = consumer.validateHumanReviewSourceRegisterForDownstream(candidate);
    });
    assert.deepEqual(actual, expected);
    assert.equal(actual.valid, false);
    assert.equal(Object.isFrozen(actual), true);
    assert.equal(Object.isFrozen(actual.errors), true);
  }
});

test("accessors are not executed and error output does not echo rejected values", () => {
  const consumer = loadFreshConsumer();
  const secret = "private-value-must-not-echo";
  let getterCalls = 0;
  const candidate = {};

  Object.defineProperty(candidate, "contract_id", {
    enumerable: true,
    get() {
      getterCalls += 1;
      return secret;
    },
  });

  const result =
    consumer.validateHumanReviewSourceRegisterForDownstream(candidate);

  assert.equal(getterCalls, 0);
  assert.equal(result.valid, false);
  assert.equal(JSON.stringify(result).includes(secret), false);
});

test("repeated calls remain deterministic and preserve caller input", () => {
  const consumer = loadFreshConsumer();
  const candidate = {
    ...makeValidCandidate(),
    sources: [
      makeValidCandidate().sources[0],
      {
        ...makeValidCandidate().sources[0],
        declared_label: "Duplicate reference",
      },
    ],
  };
  const before = JSON.stringify(candidate);
  const first =
    consumer.validateHumanReviewSourceRegisterForDownstream(candidate);
  const second =
    consumer.validateHumanReviewSourceRegisterForDownstream(candidate);

  assert.deepEqual(first, second);
  assert.equal(JSON.stringify(candidate), before);
  assert.equal(first.valid, false);
});

test("module source contains only the frozen direct-delegation surface", () => {
  const source = fs.readFileSync(consumerPath, "utf8");
  const governanceIndexSource = fs.readFileSync(
    path.join(repoRoot, "packages/governance/src/index.js"),
    "utf8",
  );

  assert.match(source, /require\("\.\.\/\.\.\/schemas\/src\/index\.js"\)/u);
  assert.match(
    source,
    /return validateHumanReviewSourceRegister\(candidate\);/u,
  );
  assert.equal(
    (source.match(/validateHumanReviewSourceRegister\(candidate\)/gu) ?? [])
      .length,
    1,
  );
  assert.doesNotMatch(
    source,
    /node:fs|node:http|node:https|node:net|process\.env|console\.|logger|telemetry|JSON\.parse|JSON\.stringify/u,
  );
  assert.equal(
    governanceIndexSource.includes(
      "validateHumanReviewSourceRegisterForDownstream",
    ),
    false,
  );
});
