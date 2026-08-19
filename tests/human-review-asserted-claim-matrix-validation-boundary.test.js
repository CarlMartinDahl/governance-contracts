"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const boundaryPath = path.join(
  repoRoot,
  "packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js",
);
const boundaryModuleId = require.resolve(boundaryPath);
const matrixValidatorPath = path.join(
  repoRoot,
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
);
const matrixValidatorModule = require(matrixValidatorPath);
const schemasIndexPath = path.join(repoRoot, "packages/schemas/src/index.js");
const packageSchemas = require(schemasIndexPath);
const resultSchema = require("../schemas/human-review-asserted-claim-matrix-cross-reference-result.json");

function loadFreshBoundary() {
  delete require.cache[boundaryModuleId];
  return require(boundaryModuleId);
}

function withMockedValidators(
  matrixValidator,
  sourceValidator,
  chronologyValidator,
  callback,
) {
  const originalMatrixValidator =
    matrixValidatorModule.validateHumanReviewAssertedClaimMatrix;
  const originalSourceValidator =
    packageSchemas.validateHumanReviewSourceRegister;
  const originalChronologyValidator =
    packageSchemas.validateHumanReviewChronology;

  matrixValidatorModule.validateHumanReviewAssertedClaimMatrix =
    matrixValidator;
  packageSchemas.validateHumanReviewSourceRegister = sourceValidator;
  packageSchemas.validateHumanReviewChronology = chronologyValidator;

  try {
    return callback(loadFreshBoundary());
  } finally {
    matrixValidatorModule.validateHumanReviewAssertedClaimMatrix =
      originalMatrixValidator;
    packageSchemas.validateHumanReviewSourceRegister =
      originalSourceValidator;
    packageSchemas.validateHumanReviewChronology =
      originalChronologyValidator;
    delete require.cache[boundaryModuleId];
  }
}

function makeClaim({
  index = 0,
  sourceRefs = ["src_001"],
  chronologyEntryRefs = ["chr_1"],
} = {}) {
  return {
    claim_ref: `clm_${index + 1}`,
    review_state: "HUMAN_REVIEW_REQUIRED",
    asserted_claim_text: `Synthetic asserted claim ${index + 1}`,
    supplied_material_observation_text: null,
    source_refs: [...sourceRefs],
    chronology_entry_refs: [...chronologyEntryRefs],
  };
}

function makeValidMatrix({
  packetRef = "pkt_001",
  claims = [makeClaim()],
} = {}) {
  return {
    contract_id: "human_review.asserted_claim_matrix",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    claims,
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
  entryRefs = ["chr_1"],
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
      source_refs: ["src_001"],
    })),
  };
}

function makeEnvelope(
  assertedClaimMatrix = makeValidMatrix(),
  sourceRegister = makeValidSourceRegister(),
  reviewChronology = makeValidChronology(),
) {
  return {
    asserted_claim_matrix: assertedClaimMatrix,
    source_register: sourceRegister,
    review_chronology: reviewChronology,
  };
}

function invalidInputShapeResult() {
  return {
    valid: false,
    contractKind:
      "HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_BOUNDARY",
    version: "1.0.0",
    errors: [{ code: "invalid_input_shape", path: "$" }],
  };
}

test("module exposes exactly one unary direct internal checkpoint", () => {
  const boundary = loadFreshBoundary();
  const governanceIndex = require("../packages/governance/src/index.js");

  assert.deepEqual(Object.keys(boundary), [
    "validateHumanReviewAssertedClaimMatrixCrossReference",
  ]);
  assert.equal(
    typeof boundary.validateHumanReviewAssertedClaimMatrixCrossReference,
    "function",
  );
  assert.equal(
    boundary.validateHumanReviewAssertedClaimMatrixCrossReference.length,
    1,
  );
  assert.equal(
    Object.hasOwn(
      governanceIndex,
      "validateHumanReviewAssertedClaimMatrixCrossReference",
    ),
    false,
  );
  assert.equal(
    Object.hasOwn(
      packageSchemas,
      "validateHumanReviewAssertedClaimMatrixCrossReference",
    ),
    false,
  );
});

test("valid exact envelope returns the exact deeply frozen success result", () => {
  const boundary = loadFreshBoundary();
  const envelope = makeEnvelope();
  const before = JSON.stringify(envelope);
  const result =
    boundary.validateHumanReviewAssertedClaimMatrixCrossReference(envelope);

  assert.deepEqual(result, {
    valid: true,
    contractKind:
      "HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_BOUNDARY",
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

  Object.defineProperty(envelope, "asserted_claim_matrix", {
    value: makeValidMatrix(),
    enumerable: false,
  });
  Object.defineProperty(envelope, "source_register", {
    value: makeValidSourceRegister(),
    enumerable: false,
  });
  Object.defineProperty(envelope, "review_chronology", {
    value: makeValidChronology(),
    enumerable: false,
  });

  const result =
    boundary.validateHumanReviewAssertedClaimMatrixCrossReference(envelope);

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
    { asserted_claim_matrix: makeValidMatrix() },
    {
      asserted_claim_matrix: makeValidMatrix(),
      source_register: makeValidSourceRegister(),
    },
    {
      source_register: makeValidSourceRegister(),
      asserted_claim_matrix: makeValidMatrix(),
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
        boundary.validateHumanReviewAssertedClaimMatrixCrossReference(
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
  let matrixCalls = 0;
  let sourceCalls = 0;
  let chronologyCalls = 0;
  const envelope = {};

  Object.defineProperty(envelope, "asserted_claim_matrix", {
    enumerable: true,
    get() {
      getterCalls += 1;
      return makeValidMatrix();
    },
  });
  Object.defineProperty(envelope, "source_register", {
    enumerable: true,
    value: makeValidSourceRegister(),
  });
  Object.defineProperty(envelope, "review_chronology", {
    enumerable: true,
    value: makeValidChronology(),
  });

  withMockedValidators(
    () => {
      matrixCalls += 1;
      return { valid: true };
    },
    () => {
      sourceCalls += 1;
      return { valid: true };
    },
    () => {
      chronologyCalls += 1;
      return { valid: true };
    },
    (boundary) => {
      const result =
        boundary.validateHumanReviewAssertedClaimMatrixCrossReference(
          envelope,
        );

      assert.deepEqual(result, invalidInputShapeResult());
    },
  );

  assert.equal(getterCalls, 0);
  assert.equal(matrixCalls, 0);
  assert.equal(sourceCalls, 0);
  assert.equal(chronologyCalls, 0);
});

test("all three child validators run once in canonical order with direct values", () => {
  const matrixCandidate = Object.freeze({ matrix: "sentinel" });
  const sourceCandidate = Object.freeze({ source: "sentinel" });
  const chronologyCandidate = Object.freeze({ chronology: "sentinel" });
  const matrixResult = Object.freeze({
    valid: false,
    errors: Object.freeze([{ private: "matrix-secret" }]),
  });
  const sourceResult = Object.freeze({
    valid: false,
    errors: Object.freeze([{ private: "source-secret" }]),
  });
  const chronologyResult = Object.freeze({
    valid: false,
    errors: Object.freeze([{ private: "chronology-secret" }]),
  });
  const calls = [];

  withMockedValidators(
    (candidate) => {
      calls.push(["asserted_claim_matrix", candidate]);
      return matrixResult;
    },
    (candidate) => {
      calls.push(["source_register", candidate]);
      return sourceResult;
    },
    (candidate) => {
      calls.push(["review_chronology", candidate]);
      return chronologyResult;
    },
    (boundary) => {
      const result =
        boundary.validateHumanReviewAssertedClaimMatrixCrossReference({
          asserted_claim_matrix: matrixCandidate,
          source_register: sourceCandidate,
          review_chronology: chronologyCandidate,
        });

      assert.deepEqual(result.errors, [
        {
          code: "asserted_claim_matrix_invalid",
          path: "$.asserted_claim_matrix",
        },
        {
          code: "source_register_invalid",
          path: "$.source_register",
        },
        {
          code: "review_chronology_invalid",
          path: "$.review_chronology",
        },
      ]);
      assert.equal(JSON.stringify(result).includes("secret"), false);
    },
  );

  assert.deepEqual(calls, [
    ["asserted_claim_matrix", matrixCandidate],
    ["source_register", sourceCandidate],
    ["review_chronology", chronologyCandidate],
  ]);
  assert.equal(Object.isFrozen(matrixResult), true);
  assert.equal(Object.isFrozen(sourceResult), true);
  assert.equal(Object.isFrozen(chronologyResult), true);
});

test("real child failures are reduced to the three bounded aggregate errors", () => {
  const boundary = loadFreshBoundary();
  const allInvalid =
    boundary.validateHumanReviewAssertedClaimMatrixCrossReference({
      asserted_claim_matrix: { private_value: "must-not-echo" },
      source_register: { another_private_value: "must-not-echo" },
      review_chronology: { third_private_value: "must-not-echo" },
    });

  assert.deepEqual(allInvalid.errors, [
    {
      code: "asserted_claim_matrix_invalid",
      path: "$.asserted_claim_matrix",
    },
    {
      code: "source_register_invalid",
      path: "$.source_register",
    },
    {
      code: "review_chronology_invalid",
      path: "$.review_chronology",
    },
  ]);
  assert.equal(JSON.stringify(allInvalid).includes("private"), false);
});

test("packet mismatches aggregate in exact order and stop membership traversal", () => {
  const matrixCandidate = { packet_ref: "pkt_matrix" };
  const sourceCandidate = { packet_ref: "pkt_source" };
  const chronologyCandidate = { packet_ref: "pkt_chronology" };

  Object.defineProperty(matrixCandidate, "claims", {
    get() {
      throw new Error("membership traversal must not read matrix claims");
    },
  });
  Object.defineProperty(sourceCandidate, "sources", {
    get() {
      throw new Error("membership traversal must not read source entries");
    },
  });
  Object.defineProperty(chronologyCandidate, "entries", {
    get() {
      throw new Error("membership traversal must not read chronology entries");
    },
  });

  withMockedValidators(
    () => ({ valid: true }),
    () => ({ valid: true }),
    () => ({ valid: true }),
    (boundary) => {
      let result;

      assert.doesNotThrow(() => {
        result =
          boundary.validateHumanReviewAssertedClaimMatrixCrossReference(
            makeEnvelope(
              matrixCandidate,
              sourceCandidate,
              chronologyCandidate,
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
      ]);
    },
  );
});

test("membership errors follow source phase then chronology phase and claim order", () => {
  const boundary = loadFreshBoundary();
  const matrix = makeValidMatrix({
    claims: [
      makeClaim({
        index: 0,
        sourceRefs: ["src_missing_a", "src_present", "src_missing_b"],
        chronologyEntryRefs: ["chr_missing_a", "chr_present"],
      }),
      makeClaim({
        index: 1,
        sourceRefs: ["src_missing_a"],
        chronologyEntryRefs: ["chr_missing_a"],
      }),
    ],
  });
  const result =
    boundary.validateHumanReviewAssertedClaimMatrixCrossReference(
      makeEnvelope(
        matrix,
        makeValidSourceRegister({ sourceRefs: ["src_present"] }),
        makeValidChronology({ entryRefs: ["chr_present"] }),
      ),
    );

  assert.deepEqual(result.errors, [
    {
      code: "source_ref_not_in_register",
      path: "$.asserted_claim_matrix.claims[0].source_refs[0]",
    },
    {
      code: "source_ref_not_in_register",
      path: "$.asserted_claim_matrix.claims[0].source_refs[2]",
    },
    {
      code: "source_ref_not_in_register",
      path: "$.asserted_claim_matrix.claims[1].source_refs[0]",
    },
    {
      code: "chronology_entry_ref_not_in_chronology",
      path: "$.asserted_claim_matrix.claims[0].chronology_entry_refs[0]",
    },
    {
      code: "chronology_entry_ref_not_in_chronology",
      path: "$.asserted_claim_matrix.claims[1].chronology_entry_refs[0]",
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

test("present references may be reused across distinct claims", () => {
  const boundary = loadFreshBoundary();
  const matrix = makeValidMatrix({
    claims: [
      makeClaim({ index: 0 }),
      makeClaim({ index: 1 }),
    ],
  });
  const result =
    boundary.validateHumanReviewAssertedClaimMatrixCrossReference(
      makeEnvelope(matrix),
    );

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test("results are deterministic newly constructed and contain no values", () => {
  const boundary = loadFreshBoundary();
  const privateSourceReference = "src_private_reference";
  const privateChronologyReference = "chr_private_reference";
  const envelope = makeEnvelope(
    makeValidMatrix({
      claims: [
        makeClaim({
          sourceRefs: [privateSourceReference],
          chronologyEntryRefs: [privateChronologyReference],
        }),
      ],
    }),
    makeValidSourceRegister({ sourceRefs: [] }),
    makeValidChronology({ entryRefs: [] }),
  );
  const before = JSON.stringify(envelope);
  const first =
    boundary.validateHumanReviewAssertedClaimMatrixCrossReference(envelope);
  const second =
    boundary.validateHumanReviewAssertedClaimMatrixCrossReference(envelope);

  assert.deepEqual(first, second);
  assert.notStrictEqual(first, second);
  assert.notStrictEqual(first.errors, second.errors);
  assert.notStrictEqual(first.errors[0], second.errors[0]);
  assert.equal(JSON.stringify(first).includes(privateSourceReference), false);
  assert.equal(JSON.stringify(first).includes(privateChronologyReference), false);
  assert.equal(JSON.stringify(envelope), before);
});

test("unexpected child validator faults are not caught or translated", () => {
  const sentinel = new Error("unexpected-validator-fault");
  let sourceCalls = 0;
  let chronologyCalls = 0;

  withMockedValidators(
    () => {
      throw sentinel;
    },
    () => {
      sourceCalls += 1;
      return { valid: true };
    },
    () => {
      chronologyCalls += 1;
      return { valid: true };
    },
    (boundary) => {
      assert.throws(
        () =>
          boundary.validateHumanReviewAssertedClaimMatrixCrossReference(
            makeEnvelope(),
          ),
        (error) => error === sentinel,
      );
    },
  );

  assert.equal(sourceCalls, 0);
  assert.equal(chronologyCalls, 0);
});

test("module remains bounded to in-process validation without public wiring", () => {
  const source = fs.readFileSync(boundaryPath, "utf8");
  const governanceIndexSource = fs.readFileSync(
    path.join(repoRoot, "packages/governance/src/index.js"),
    "utf8",
  );

  assert.match(
    source,
    /require\("\.\.\/\.\.\/schemas\/src\/human-review-asserted-claim-matrix-validator\.js"\)/u,
  );
  assert.match(source, /require\("\.\.\/\.\.\/schemas\/src\/index\.js"\)/u);
  assert.equal(
    (
      source.match(
        /validateHumanReviewAssertedClaimMatrix\(\s*input\.assertedClaimMatrix/gu,
      ) ?? []
    ).length,
    1,
  );
  assert.equal(
    (
      source.match(
        /validateHumanReviewSourceRegister\(\s*input\.sourceRegister/gu,
      ) ?? []
    ).length,
    1,
  );
  assert.equal(
    (
      source.match(
        /validateHumanReviewChronology\(\s*input\.reviewChronology/gu,
      ) ?? []
    ).length,
    1,
  );
  assert.doesNotMatch(
    source,
    /node:fs|node:http|node:https|node:net|process\.env|console\.|logger|telemetry|metrics|tracing|audit|JSON\.parse|JSON\.stringify/u,
  );
  assert.equal(
    governanceIndexSource.includes(
      "validateHumanReviewAssertedClaimMatrixCrossReference",
    ),
    false,
  );
});
