"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const boundaryPath = path.join(
  repoRoot,
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
);
const boundaryModuleId = require.resolve(boundaryPath);
const schemasIndexPath = path.join(repoRoot, "packages/schemas/src/index.js");
const packageSchemas = require(schemasIndexPath);
const resultSchema = require("../schemas/human-review-chronology-source-register-cross-reference-result.json");

function loadFreshBoundary() {
  delete require.cache[boundaryModuleId];
  return require(boundaryModuleId);
}

function withMockedValidators(chronologyValidator, sourceValidator, callback) {
  const originalChronologyValidator =
    packageSchemas.validateHumanReviewChronology;
  const originalSourceValidator =
    packageSchemas.validateHumanReviewSourceRegister;

  packageSchemas.validateHumanReviewChronology = chronologyValidator;
  packageSchemas.validateHumanReviewSourceRegister = sourceValidator;

  try {
    return callback(loadFreshBoundary());
  } finally {
    packageSchemas.validateHumanReviewChronology =
      originalChronologyValidator;
    packageSchemas.validateHumanReviewSourceRegister =
      originalSourceValidator;
    delete require.cache[boundaryModuleId];
  }
}

function makeValidChronology({
  packetRef = "pkt_001",
  sourceRefsByEntry = [["src_001"]],
} = {}) {
  return {
    contract_id: "human_review.review_chronology",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    entries: sourceRefsByEntry.map((sourceRefs, index) => ({
      entry_ref: `chr_${index + 1}`,
      review_state: "HUMAN_REVIEW_REQUIRED",
      temporal_status: "UNKNOWN",
      declared_temporal_text: null,
      review_text: `Synthetic review entry ${index + 1}`,
      source_refs: [...sourceRefs],
    })),
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

function makeEnvelope(
  reviewChronology = makeValidChronology(),
  sourceRegister = makeValidSourceRegister(),
) {
  return {
    review_chronology: reviewChronology,
    source_register: sourceRegister,
  };
}

function invalidInputShapeResult() {
  return {
    valid: false,
    contractKind:
      "HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_BOUNDARY",
    version: "1.0.0",
    errors: [{ code: "invalid_input_shape", path: "$" }],
  };
}

test("module exposes exactly one unary direct internal checkpoint", () => {
  const boundary = loadFreshBoundary();
  const governanceIndex = require("../packages/governance/src/index.js");

  assert.deepEqual(Object.keys(boundary), [
    "validateHumanReviewChronologySourceRegisterCrossReference",
  ]);
  assert.equal(
    typeof boundary.validateHumanReviewChronologySourceRegisterCrossReference,
    "function",
  );
  assert.equal(
    boundary.validateHumanReviewChronologySourceRegisterCrossReference.length,
    1,
  );
  assert.equal(
    Object.hasOwn(
      governanceIndex,
      "validateHumanReviewChronologySourceRegisterCrossReference",
    ),
    false,
  );
  assert.equal(
    Object.hasOwn(
      packageSchemas,
      "validateHumanReviewChronologySourceRegisterCrossReference",
    ),
    false,
  );
});

test("valid exact envelope returns the exact deeply frozen success result", () => {
  const boundary = loadFreshBoundary();
  const envelope = makeEnvelope();
  const before = JSON.stringify(envelope);
  const result =
    boundary.validateHumanReviewChronologySourceRegisterCrossReference(
      envelope,
    );

  assert.deepEqual(result, {
    valid: true,
    contractKind:
      "HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_BOUNDARY",
    version: "1.0.0",
    errors: [],
  });
  assert.deepEqual(Object.keys(result), [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.equal(
    result.contractKind,
    resultSchema.properties.contractKind.const,
  );
  assert.equal(result.version, resultSchema.properties.version.const);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.errors), true);
  assert.equal(JSON.stringify(envelope), before);
  assert.equal(Object.isFrozen(envelope), false);
});

test("null-prototype and non-enumerable exact data envelopes are accepted", () => {
  const boundary = loadFreshBoundary();
  const envelope = Object.create(null);

  Object.defineProperty(envelope, "review_chronology", {
    value: makeValidChronology(),
    enumerable: false,
  });
  Object.defineProperty(envelope, "source_register", {
    value: makeValidSourceRegister(),
    enumerable: false,
  });

  const result =
    boundary.validateHumanReviewChronologySourceRegisterCrossReference(
      envelope,
    );

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test("malformed special reordered and unknown-key envelopes fail closed", () => {
  const boundary = loadFreshBoundary();
  const extraSymbolEnvelope = makeEnvelope();
  extraSymbolEnvelope[Symbol("extra")] = true;
  const inheritedEnvelope = Object.create(makeEnvelope());
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
    { review_chronology: makeValidChronology() },
    { source_register: makeValidSourceRegister() },
    {
      source_register: makeValidSourceRegister(),
      review_chronology: makeValidChronology(),
    },
    { ...makeEnvelope(), extra: true },
    extraSymbolEnvelope,
    inheritedEnvelope,
  ];

  for (const envelope of invalidEnvelopes) {
    let result;

    assert.doesNotThrow(() => {
      result =
        boundary.validateHumanReviewChronologySourceRegisterCrossReference(
          envelope,
        );
    });
    assert.deepEqual(result, invalidInputShapeResult());
    assert.equal(Object.isFrozen(result), true);
    assert.equal(Object.isFrozen(result.errors), true);
    assert.equal(Object.isFrozen(result.errors[0]), true);
  }
});

test("envelope accessors are rejected without execution or child calls", () => {
  let getterCalls = 0;
  let chronologyCalls = 0;
  let sourceCalls = 0;
  const envelope = {};

  Object.defineProperty(envelope, "review_chronology", {
    enumerable: true,
    get() {
      getterCalls += 1;
      return makeValidChronology();
    },
  });
  Object.defineProperty(envelope, "source_register", {
    enumerable: true,
    value: makeValidSourceRegister(),
  });

  withMockedValidators(
    () => {
      chronologyCalls += 1;
      return { valid: true };
    },
    () => {
      sourceCalls += 1;
      return { valid: true };
    },
    (boundary) => {
      const result =
        boundary.validateHumanReviewChronologySourceRegisterCrossReference(
          envelope,
        );

      assert.deepEqual(result, invalidInputShapeResult());
    },
  );

  assert.equal(getterCalls, 0);
  assert.equal(chronologyCalls, 0);
  assert.equal(sourceCalls, 0);
});

test("both child validators run once in canonical order with direct values", () => {
  const chronologyCandidate = Object.freeze({ chronology: "sentinel" });
  const sourceCandidate = Object.freeze({ source: "sentinel" });
  const chronologyResult = Object.freeze({
    valid: false,
    errors: Object.freeze([{ private: "chronology-secret" }]),
  });
  const sourceResult = Object.freeze({
    valid: false,
    errors: Object.freeze([{ private: "source-secret" }]),
  });
  const calls = [];

  withMockedValidators(
    (candidate) => {
      calls.push(["chronology", candidate]);
      return chronologyResult;
    },
    (candidate) => {
      calls.push(["source_register", candidate]);
      return sourceResult;
    },
    (boundary) => {
      const result =
        boundary.validateHumanReviewChronologySourceRegisterCrossReference({
          review_chronology: chronologyCandidate,
          source_register: sourceCandidate,
        });

      assert.deepEqual(result, {
        valid: false,
        contractKind:
          "HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_BOUNDARY",
        version: "1.0.0",
        errors: [
          {
            code: "review_chronology_invalid",
            path: "$.review_chronology",
          },
          {
            code: "source_register_invalid",
            path: "$.source_register",
          },
        ],
      });
      assert.equal(JSON.stringify(result).includes("secret"), false);
    },
  );

  assert.deepEqual(calls, [
    ["chronology", chronologyCandidate],
    ["source_register", sourceCandidate],
  ]);
  assert.equal(Object.isFrozen(chronologyResult), true);
  assert.equal(Object.isFrozen(sourceResult), true);
});

test("real child failures are reduced to the two bounded aggregate errors", () => {
  const boundary = loadFreshBoundary();
  const bothInvalid =
    boundary.validateHumanReviewChronologySourceRegisterCrossReference({
      review_chronology: { private_value: "must-not-echo" },
      source_register: { another_private_value: "must-not-echo" },
    });
  const chronologyInvalid =
    boundary.validateHumanReviewChronologySourceRegisterCrossReference(
      makeEnvelope({}, makeValidSourceRegister()),
    );
  const sourceInvalid =
    boundary.validateHumanReviewChronologySourceRegisterCrossReference(
      makeEnvelope(makeValidChronology(), {}),
    );

  assert.deepEqual(bothInvalid.errors, [
    {
      code: "review_chronology_invalid",
      path: "$.review_chronology",
    },
    {
      code: "source_register_invalid",
      path: "$.source_register",
    },
  ]);
  assert.deepEqual(chronologyInvalid.errors, [
    {
      code: "review_chronology_invalid",
      path: "$.review_chronology",
    },
  ]);
  assert.deepEqual(sourceInvalid.errors, [
    {
      code: "source_register_invalid",
      path: "$.source_register",
    },
  ]);
  assert.equal(JSON.stringify(bothInvalid).includes("private"), false);
});

test("packet mismatch emits one error and stops membership traversal", () => {
  const chronologyCandidate = { packet_ref: "pkt_chronology" };
  const sourceCandidate = { packet_ref: "pkt_register" };

  Object.defineProperty(chronologyCandidate, "entries", {
    get() {
      throw new Error("membership traversal must not read chronology entries");
    },
  });
  Object.defineProperty(sourceCandidate, "sources", {
    get() {
      throw new Error("membership traversal must not read source entries");
    },
  });

  withMockedValidators(
    () => ({ valid: true }),
    () => ({ valid: true }),
    (boundary) => {
      let result;

      assert.doesNotThrow(() => {
        result =
          boundary.validateHumanReviewChronologySourceRegisterCrossReference(
            makeEnvelope(chronologyCandidate, sourceCandidate),
          );
      });
      assert.deepEqual(result.errors, [
        {
          code: "packet_ref_mismatch",
          path: "$.review_chronology.packet_ref",
        },
      ]);
    },
  );
});

test("membership errors follow entry then source-reference order", () => {
  const boundary = loadFreshBoundary();
  const envelope = makeEnvelope(
    makeValidChronology({
      sourceRefsByEntry: [
        ["src_missing_a", "src_present", "src_missing_b"],
        ["src_missing_a"],
      ],
    }),
    makeValidSourceRegister({ sourceRefs: ["src_present"] }),
  );
  const result =
    boundary.validateHumanReviewChronologySourceRegisterCrossReference(
      envelope,
    );

  assert.deepEqual(result.errors, [
    {
      code: "source_ref_not_in_register",
      path: "$.review_chronology.entries[0].source_refs[0]",
    },
    {
      code: "source_ref_not_in_register",
      path: "$.review_chronology.entries[0].source_refs[2]",
    },
    {
      code: "source_ref_not_in_register",
      path: "$.review_chronology.entries[1].source_refs[0]",
    },
  ]);
  assert.equal(result.valid, false);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.errors), true);
  for (const error of result.errors) {
    assert.deepEqual(Object.keys(error), ["code", "path"]);
    assert.equal(Object.isFrozen(error), true);
  }
});

test("present references may be reused across chronology entries", () => {
  const boundary = loadFreshBoundary();
  const result =
    boundary.validateHumanReviewChronologySourceRegisterCrossReference(
      makeEnvelope(
        makeValidChronology({
          sourceRefsByEntry: [["src_present"], ["src_present"]],
        }),
        makeValidSourceRegister({ sourceRefs: ["src_present"] }),
      ),
    );

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test("results are deterministic newly constructed and contain no values", () => {
  const boundary = loadFreshBoundary();
  const privateReference = "src_private_reference";
  const envelope = makeEnvelope(
    makeValidChronology({ sourceRefsByEntry: [[privateReference]] }),
    makeValidSourceRegister({ sourceRefs: [] }),
  );
  const before = JSON.stringify(envelope);
  const first =
    boundary.validateHumanReviewChronologySourceRegisterCrossReference(
      envelope,
    );
  const second =
    boundary.validateHumanReviewChronologySourceRegisterCrossReference(
      envelope,
    );

  assert.deepEqual(first, second);
  assert.notStrictEqual(first, second);
  assert.notStrictEqual(first.errors, second.errors);
  assert.notStrictEqual(first.errors[0], second.errors[0]);
  assert.equal(JSON.stringify(first).includes(privateReference), false);
  assert.equal(JSON.stringify(envelope), before);
});

test("unexpected child validator faults are not caught or translated", () => {
  const sentinel = new Error("unexpected-validator-fault");
  let sourceCalls = 0;

  withMockedValidators(
    () => {
      throw sentinel;
    },
    () => {
      sourceCalls += 1;
      return { valid: true };
    },
    (boundary) => {
      assert.throws(
        () =>
          boundary.validateHumanReviewChronologySourceRegisterCrossReference(
            makeEnvelope(),
          ),
        (error) => error === sentinel,
      );
    },
  );

  assert.equal(sourceCalls, 0);
});

test("module remains bounded to in-process validation without public wiring", () => {
  const source = fs.readFileSync(boundaryPath, "utf8");
  const governanceIndexSource = fs.readFileSync(
    path.join(repoRoot, "packages/governance/src/index.js"),
    "utf8",
  );

  assert.match(source, /require\("\.\.\/\.\.\/schemas\/src\/index\.js"\)/u);
  assert.equal(
    (source.match(/validateHumanReviewChronology\(\s*input\.reviewChronology/gu) ?? [])
      .length,
    1,
  );
  assert.equal(
    (source.match(/validateHumanReviewSourceRegister\(\s*input\.sourceRegister/gu) ?? [])
      .length,
    1,
  );
  assert.doesNotMatch(
    source,
    /node:fs|node:http|node:https|node:net|process\.env|console\.|logger|telemetry|metrics|tracing|audit|JSON\.parse|JSON\.stringify/u,
  );
  assert.equal(
    governanceIndexSource.includes(
      "validateHumanReviewChronologySourceRegisterCrossReference",
    ),
    false,
  );
});
