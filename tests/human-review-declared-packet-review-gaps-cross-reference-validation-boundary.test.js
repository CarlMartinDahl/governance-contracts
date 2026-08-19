"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const boundaryPath = path.join(
  repoRoot,
  "packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js",
);
const boundaryModuleId = require.resolve(boundaryPath);
const gapsValidatorPath = path.join(
  repoRoot,
  "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
);
const matrixValidatorPath = path.join(
  repoRoot,
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
);
const gapsValidatorModule = require(gapsValidatorPath);
const matrixValidatorModule = require(matrixValidatorPath);
const schemasIndexPath = path.join(repoRoot, "packages/schemas/src/index.js");
const packageSchemas = require(schemasIndexPath);
const resultSchema = require("../schemas/human-review-declared-packet-review-gaps-cross-reference-result.json");

function loadFreshBoundary() {
  delete require.cache[boundaryModuleId];
  return require(boundaryModuleId);
}

function withMockedValidators(
  gapsValidator,
  sourceValidator,
  chronologyValidator,
  matrixValidator,
  callback,
) {
  const originalGapsValidator =
    gapsValidatorModule.validateHumanReviewDeclaredPacketReviewGaps;
  const originalSourceValidator =
    packageSchemas.validateHumanReviewSourceRegister;
  const originalChronologyValidator =
    packageSchemas.validateHumanReviewChronology;
  const originalMatrixValidator =
    matrixValidatorModule.validateHumanReviewAssertedClaimMatrix;

  gapsValidatorModule.validateHumanReviewDeclaredPacketReviewGaps =
    gapsValidator;
  packageSchemas.validateHumanReviewSourceRegister = sourceValidator;
  packageSchemas.validateHumanReviewChronology = chronologyValidator;
  matrixValidatorModule.validateHumanReviewAssertedClaimMatrix =
    matrixValidator;

  try {
    return callback(loadFreshBoundary());
  } finally {
    gapsValidatorModule.validateHumanReviewDeclaredPacketReviewGaps =
      originalGapsValidator;
    packageSchemas.validateHumanReviewSourceRegister =
      originalSourceValidator;
    packageSchemas.validateHumanReviewChronology =
      originalChronologyValidator;
    matrixValidatorModule.validateHumanReviewAssertedClaimMatrix =
      originalMatrixValidator;
    delete require.cache[boundaryModuleId];
  }
}

function makeGap({
  index = 0,
  sourceRefs = [],
  chronologyEntryRefs = [],
  claimRefs = [],
} = {}) {
  return {
    gap_ref: `gap_${index + 1}`,
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

function makeValidSourceRegister({
  packetRef = "pkt_001",
  sourceRefs = [],
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

function makeEnvelope(
  declaredPacketReviewGaps = makeValidGaps(),
  sourceRegister = makeValidSourceRegister(),
  reviewChronology = makeValidChronology(),
  assertedClaimMatrix = makeValidMatrix(),
) {
  return {
    declared_packet_review_gaps: declaredPacketReviewGaps,
    source_register: sourceRegister,
    review_chronology: reviewChronology,
    asserted_claim_matrix: assertedClaimMatrix,
  };
}

function invalidInputShapeResult() {
  return {
    valid: false,
    contractKind:
      "HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_BOUNDARY",
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
    "validateHumanReviewDeclaredPacketReviewGapsCrossReference",
  ]);
  assert.equal(
    typeof boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference,
    "function",
  );
  assert.equal(
    boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference.length,
    1,
  );
  assert.equal(
    Object.hasOwn(
      governanceIndex,
      "validateHumanReviewDeclaredPacketReviewGapsCrossReference",
    ),
    false,
  );
  assert.equal(
    Object.hasOwn(
      packageSchemas,
      "validateHumanReviewDeclaredPacketReviewGapsCrossReference",
    ),
    false,
  );
});

test("valid empty and populated envelopes return exact frozen successes", () => {
  const boundary = loadFreshBoundary();
  const emptyEnvelope = makeEnvelope();
  const populatedEnvelope = makeEnvelope(
    makeValidGaps({
      gaps: [
        makeGap({
          sourceRefs: ["src_001"],
          chronologyEntryRefs: ["chr_001"],
          claimRefs: ["clm_001"],
        }),
      ],
    }),
    makeValidSourceRegister({ sourceRefs: ["src_001"] }),
    makeValidChronology({ entryRefs: ["chr_001"] }),
    makeValidMatrix({
      claimRefs: ["clm_001"],
      chronologyEntryRefs: ["chr_001"],
    }),
  );

  for (const envelope of [emptyEnvelope, populatedEnvelope]) {
    const before = JSON.stringify(envelope);
    const result =
      boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference(
        envelope,
      );

    assert.deepEqual(result, {
      valid: true,
      contractKind:
        "HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_BOUNDARY",
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
    ["declared_packet_review_gaps", makeValidGaps()],
    ["source_register", makeValidSourceRegister()],
    ["review_chronology", makeValidChronology()],
    ["asserted_claim_matrix", makeValidMatrix()],
  ]) {
    Object.defineProperty(envelope, field, {
      value,
      enumerable: false,
    });
  }

  const result =
    boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference(
      envelope,
    );

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
    { declared_packet_review_gaps: makeValidGaps() },
    {
      declared_packet_review_gaps: makeValidGaps(),
      source_register: makeValidSourceRegister(),
      review_chronology: makeValidChronology(),
    },
    {
      source_register: makeValidSourceRegister(),
      declared_packet_review_gaps: makeValidGaps(),
      review_chronology: makeValidChronology(),
      asserted_claim_matrix: makeValidMatrix(),
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
        boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference(
          envelope,
        );
    });
    assert.deepEqual(result, invalidInputShapeResult());
    assert.equal(matchesResultContract(result), true);
  }
});

test("envelope accessors are rejected without execution or child calls", () => {
  let getterCalls = 0;
  const calls = [];
  const envelope = {};

  Object.defineProperty(envelope, "declared_packet_review_gaps", {
    enumerable: true,
    get() {
      getterCalls += 1;
      return makeValidGaps();
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
  Object.defineProperty(envelope, "asserted_claim_matrix", {
    enumerable: true,
    value: makeValidMatrix(),
  });

  withMockedValidators(
    () => {
      calls.push("gaps");
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
    (boundary) => {
      const result =
        boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference(
          envelope,
        );
      assert.deepEqual(result, invalidInputShapeResult());
    },
  );

  assert.equal(getterCalls, 0);
  assert.deepEqual(calls, []);
});

test("all four child validators run once in canonical order with direct values", () => {
  const gapsCandidate = Object.freeze({ gaps: "sentinel" });
  const sourceCandidate = Object.freeze({ source: "sentinel" });
  const chronologyCandidate = Object.freeze({ chronology: "sentinel" });
  const matrixCandidate = Object.freeze({ matrix: "sentinel" });
  const results = ["gaps", "source", "chronology", "matrix"].map((name) =>
    Object.freeze({
      valid: false,
      errors: Object.freeze([{ private: `${name}-secret` }]),
    }),
  );
  const calls = [];

  withMockedValidators(
    (candidate) => {
      calls.push(["declared_packet_review_gaps", candidate]);
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
    (boundary) => {
      const result =
        boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference(
          makeEnvelope(
            gapsCandidate,
            sourceCandidate,
            chronologyCandidate,
            matrixCandidate,
          ),
        );

      assert.deepEqual(result.errors, [
        {
          code: "declared_packet_review_gaps_invalid",
          path: "$.declared_packet_review_gaps",
        },
        { code: "source_register_invalid", path: "$.source_register" },
        { code: "review_chronology_invalid", path: "$.review_chronology" },
        {
          code: "asserted_claim_matrix_invalid",
          path: "$.asserted_claim_matrix",
        },
      ]);
      assert.equal(JSON.stringify(result).includes("secret"), false);
      assert.equal(matchesResultContract(result), true);
    },
  );

  assert.deepEqual(calls, [
    ["declared_packet_review_gaps", gapsCandidate],
    ["source_register", sourceCandidate],
    ["review_chronology", chronologyCandidate],
    ["asserted_claim_matrix", matrixCandidate],
  ]);
  assert.equal(results.every(Object.isFrozen), true);
});

test("real child failures reduce to the four bounded aggregate errors", () => {
  const boundary = loadFreshBoundary();
  const result =
    boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference({
      declared_packet_review_gaps: { private_gap: "must-not-echo" },
      source_register: { private_source: "must-not-echo" },
      review_chronology: { private_chronology: "must-not-echo" },
      asserted_claim_matrix: { private_claim: "must-not-echo" },
    });

  assert.deepEqual(result.errors, [
    {
      code: "declared_packet_review_gaps_invalid",
      path: "$.declared_packet_review_gaps",
    },
    { code: "source_register_invalid", path: "$.source_register" },
    { code: "review_chronology_invalid", path: "$.review_chronology" },
    {
      code: "asserted_claim_matrix_invalid",
      path: "$.asserted_claim_matrix",
    },
  ]);
  assert.equal(JSON.stringify(result).includes("private"), false);
  assert.equal(matchesResultContract(result), true);
});

test("packet mismatches aggregate in exact order and stop memberships", () => {
  const gapsCandidate = { packet_ref: "pkt_anchor" };
  const sourceCandidate = { packet_ref: "pkt_source" };
  const chronologyCandidate = { packet_ref: "pkt_chronology" };
  const matrixCandidate = { packet_ref: "pkt_matrix" };

  for (const [candidate, field] of [
    [gapsCandidate, "gaps"],
    [sourceCandidate, "sources"],
    [chronologyCandidate, "entries"],
    [matrixCandidate, "claims"],
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
    (boundary) => {
      let result;

      assert.doesNotThrow(() => {
        result =
          boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference(
            makeEnvelope(
              gapsCandidate,
              sourceCandidate,
              chronologyCandidate,
              matrixCandidate,
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
      ]);
      assert.equal(matchesResultContract(result), true);
    },
  );
});

test("membership errors follow source chronology then claim phase order", () => {
  const boundary = loadFreshBoundary();
  const gaps = makeValidGaps({
    gaps: [
      makeGap({
        index: 0,
        sourceRefs: ["src_missing_a", "src_present", "src_missing_b"],
        chronologyEntryRefs: ["chr_missing_a", "chr_present"],
        claimRefs: ["clm_missing_a", "clm_present"],
      }),
      makeGap({
        index: 1,
        sourceRefs: ["src_missing_a"],
        chronologyEntryRefs: ["chr_missing_a"],
        claimRefs: ["clm_missing_a"],
      }),
    ],
  });
  const result =
    boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference(
      makeEnvelope(
        gaps,
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
      ),
    );

  assert.deepEqual(result.errors, [
    {
      code: "source_ref_not_in_register",
      path: "$.declared_packet_review_gaps.gaps[0].source_refs[0]",
    },
    {
      code: "source_ref_not_in_register",
      path: "$.declared_packet_review_gaps.gaps[0].source_refs[2]",
    },
    {
      code: "source_ref_not_in_register",
      path: "$.declared_packet_review_gaps.gaps[1].source_refs[0]",
    },
    {
      code: "chronology_entry_ref_not_in_chronology",
      path:
        "$.declared_packet_review_gaps.gaps[0].chronology_entry_refs[0]",
    },
    {
      code: "chronology_entry_ref_not_in_chronology",
      path:
        "$.declared_packet_review_gaps.gaps[1].chronology_entry_refs[0]",
    },
    {
      code: "claim_ref_not_in_asserted_claim_matrix",
      path: "$.declared_packet_review_gaps.gaps[0].claim_refs[0]",
    },
    {
      code: "claim_ref_not_in_asserted_claim_matrix",
      path: "$.declared_packet_review_gaps.gaps[1].claim_refs[0]",
    },
  ]);
  assert.equal(result.valid, false);
  assert.equal(matchesResultContract(result), true);
});

test("present references may be reused across distinct gap rows", () => {
  const boundary = loadFreshBoundary();
  const references = {
    sourceRefs: ["src_001"],
    chronologyEntryRefs: ["chr_001"],
    claimRefs: ["clm_001"],
  };
  const result =
    boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference(
      makeEnvelope(
        makeValidGaps({
          gaps: [
            makeGap({ index: 0, ...references }),
            makeGap({ index: 1, ...references }),
          ],
        }),
        makeValidSourceRegister({ sourceRefs: references.sourceRefs }),
        makeValidChronology({ entryRefs: references.chronologyEntryRefs }),
        makeValidMatrix({ claimRefs: references.claimRefs }),
      ),
    );

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
  assert.equal(matchesResultContract(result), true);
});

test("results are deterministic newly constructed frozen and value free", () => {
  const boundary = loadFreshBoundary();
  const privateSourceReference = "src_private_reference";
  const privateChronologyReference = "chr_private_reference";
  const privateClaimReference = "clm_private_reference";
  const envelope = makeEnvelope(
    makeValidGaps({
      gaps: [
        makeGap({
          sourceRefs: [privateSourceReference],
          chronologyEntryRefs: [privateChronologyReference],
          claimRefs: [privateClaimReference],
        }),
      ],
    }),
  );
  const before = JSON.stringify(envelope);
  const first =
    boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference(
      envelope,
    );
  const second =
    boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference(
      envelope,
    );

  assert.deepEqual(first, second);
  assert.notStrictEqual(first, second);
  assert.notStrictEqual(first.errors, second.errors);
  assert.notStrictEqual(first.errors[0], second.errors[0]);
  assert.equal(JSON.stringify(first).includes(privateSourceReference), false);
  assert.equal(
    JSON.stringify(first).includes(privateChronologyReference),
    false,
  );
  assert.equal(JSON.stringify(first).includes(privateClaimReference), false);
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
    (boundary) => {
      assert.throws(
        () =>
          boundary.validateHumanReviewDeclaredPacketReviewGapsCrossReference(
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

  assert.match(
    source,
    /require\("\.\.\/\.\.\/schemas\/src\/human-review-declared-packet-review-gaps-validator\.js"\)/u,
  );
  assert.match(
    source,
    /require\("\.\.\/\.\.\/schemas\/src\/human-review-asserted-claim-matrix-validator\.js"\)/u,
  );
  assert.match(source, /require\("\.\.\/\.\.\/schemas\/src\/index\.js"\)/u);
  for (const [callPattern, expectedCount] of [
    [
      /validateHumanReviewDeclaredPacketReviewGaps\(\s*input\.declaredPacketReviewGaps/gu,
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
  ]) {
    assert.equal((source.match(callPattern) ?? []).length, expectedCount);
  }
  assert.doesNotMatch(
    source,
    /source-register-pre-downstream-validation-boundary|chronology-source-register-validation-boundary|asserted-claim-matrix-validation-boundary/u,
  );
  assert.doesNotMatch(
    source,
    /node:fs|node:http|node:https|node:net|process\.env|console\.|logger|telemetry|metrics|tracing|audit|JSON\.parse|JSON\.stringify/u,
  );
  assert.equal(
    governanceIndexSource.includes(
      "validateHumanReviewDeclaredPacketReviewGapsCrossReference",
    ),
    false,
  );
});
