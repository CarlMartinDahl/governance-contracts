"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const boundaryPath = path.join(
  repoRoot,
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
);
const boundaryModuleId = require.resolve(boundaryPath);
const controlledHandoffValidatorPath = path.join(
  repoRoot,
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
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
const noticeValidatorPath = path.join(
  repoRoot,
  "packages/schemas/src/human-review-no-conclusion-notice-validator.js",
);
const controlledHandoffValidatorModule = require(controlledHandoffValidatorPath);
const matrixValidatorModule = require(matrixValidatorPath);
const gapsValidatorModule = require(gapsValidatorPath);
const questionsValidatorModule = require(questionsValidatorPath);
const noticeValidatorModule = require(noticeValidatorPath);
const schemasIndexPath = path.join(repoRoot, "packages/schemas/src/index.js");
const packageSchemas = require(schemasIndexPath);
const packageGovernance = require("../packages/governance/src/index.js");
const resultSchema = require("../schemas/human-review-controlled-handoff-brief-cross-reference-result.json");
const semanticsDocPath = path.join(
  repoRoot,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
);
const proofTransitionDocPath = path.join(
  repoRoot,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const functionName =
  "validateHumanReviewControlledHandoffBriefCrossReference";
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

function loadFreshBoundary() {
  delete require.cache[boundaryModuleId];
  return require(boundaryModuleId);
}

function withMockedValidators(validators, callback) {
  const originals = {
    handoff:
      controlledHandoffValidatorModule.validateHumanReviewControlledHandoffBrief,
    source: packageSchemas.validateHumanReviewSourceRegister,
    chronology: packageSchemas.validateHumanReviewChronology,
    matrix: matrixValidatorModule.validateHumanReviewAssertedClaimMatrix,
    gaps: gapsValidatorModule.validateHumanReviewDeclaredPacketReviewGaps,
    questions: questionsValidatorModule.validateHumanReviewQuestions,
    notice: noticeValidatorModule.validateHumanReviewNoConclusionNotice,
  };

  controlledHandoffValidatorModule.validateHumanReviewControlledHandoffBrief =
    validators.handoff;
  packageSchemas.validateHumanReviewSourceRegister = validators.source;
  packageSchemas.validateHumanReviewChronology = validators.chronology;
  matrixValidatorModule.validateHumanReviewAssertedClaimMatrix =
    validators.matrix;
  gapsValidatorModule.validateHumanReviewDeclaredPacketReviewGaps =
    validators.gaps;
  questionsValidatorModule.validateHumanReviewQuestions = validators.questions;
  noticeValidatorModule.validateHumanReviewNoConclusionNotice = validators.notice;

  try {
    return callback(loadFreshBoundary());
  } finally {
    controlledHandoffValidatorModule.validateHumanReviewControlledHandoffBrief =
      originals.handoff;
    packageSchemas.validateHumanReviewSourceRegister = originals.source;
    packageSchemas.validateHumanReviewChronology = originals.chronology;
    matrixValidatorModule.validateHumanReviewAssertedClaimMatrix =
      originals.matrix;
    gapsValidatorModule.validateHumanReviewDeclaredPacketReviewGaps =
      originals.gaps;
    questionsValidatorModule.validateHumanReviewQuestions = originals.questions;
    noticeValidatorModule.validateHumanReviewNoConclusionNotice = originals.notice;
    delete require.cache[boundaryModuleId];
  }
}

function makeValidSourceRegister(packetRef = "pkt_001") {
  return {
    contract_id: "human_review.source_register",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    sources: [
      {
        source_ref: "src_001",
        declared_source_type: "message_thread",
        declared_label: "Synthetic source",
      },
    ],
  };
}

function makeValidChronology(packetRef = "pkt_001") {
  return {
    contract_id: "human_review.review_chronology",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    entries: [],
  };
}

function makeValidMatrix(packetRef = "pkt_001") {
  return {
    contract_id: "human_review.asserted_claim_matrix",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    claims: [],
  };
}

function makeValidGaps(packetRef = "pkt_001") {
  return {
    contract_id: "human_review.declared_packet_review_gaps",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    gaps: [],
  };
}

function makeValidQuestions(packetRef = "pkt_001") {
  return {
    contract_id: "human_review.review_questions",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    questions: [],
  };
}

function makeValidNotice(packetRef = "pkt_001") {
  return {
    contract_id: "human_review.no_conclusion_notice",
    contract_version: "1.0.0",
    packet_ref: packetRef,
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
  };
}

function makeValidBrief(packetRef = "pkt_001", refs = {}) {
  return {
    contract_id: "human_review.controlled_handoff_brief",
    contract_version: "1.0.0",
    packet_ref: packetRef,
    handoff_posture: "HANDOFF_CANDIDATE_ONLY",
    component_refs: {
      source_register_ref: refs.source_register ?? "hro_source",
      review_chronology_ref: refs.review_chronology ?? "hro_chronology",
      asserted_claim_matrix_ref: refs.asserted_claim_matrix ?? "hro_matrix",
      declared_packet_review_gaps_ref:
        refs.declared_packet_review_gaps ?? "hro_gaps",
      human_review_questions_ref: refs.human_review_questions ?? "hro_questions",
      no_conclusion_notice_ref: refs.no_conclusion_notice ?? "hro_notice",
    },
  };
}

function makeCandidates(packetRefs = {}) {
  return {
    source_register: makeValidSourceRegister(
      packetRefs.source_register ?? "pkt_001",
    ),
    review_chronology: makeValidChronology(
      packetRefs.review_chronology ?? "pkt_001",
    ),
    asserted_claim_matrix: makeValidMatrix(
      packetRefs.asserted_claim_matrix ?? "pkt_001",
    ),
    declared_packet_review_gaps: makeValidGaps(
      packetRefs.declared_packet_review_gaps ?? "pkt_001",
    ),
    human_review_questions: makeValidQuestions(
      packetRefs.human_review_questions ?? "pkt_001",
    ),
    no_conclusion_notice: makeValidNotice(
      packetRefs.no_conclusion_notice ?? "pkt_001",
    ),
  };
}

function makeEnvelope({
  brief = makeValidBrief(),
  candidates = makeCandidates(),
  bindingRefs = {},
} = {}) {
  const bindings = {};
  for (let index = 0; index < familyFields.length; index += 1) {
    const field = familyFields[index];
    bindings[field] = {
      component_ref:
        bindingRefs[field] ?? brief.component_refs[briefReferenceFields[index]],
      candidate: candidates[field],
    };
  }
  return {
    controlled_handoff_brief: brief,
    component_bindings: bindings,
  };
}

function invalidInputShapeResult() {
  return {
    valid: false,
    contractKind:
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_BOUNDARY",
    version: "1.0.0",
    errors: [{ code: "invalid_input_shape", path: "$" }],
  };
}

function matchesResultContract(result) {
  if (
    result === null ||
    typeof result !== "object" ||
    Array.isArray(result) ||
    !Object.isFrozen(result) ||
    !Object.isFrozen(result.errors) ||
    JSON.stringify(Object.keys(result)) !==
      JSON.stringify(["valid", "contractKind", "version", "errors"])
  ) {
    return false;
  }
  if (
    result.contractKind !== resultSchema.properties.contractKind.const ||
    result.version !== resultSchema.properties.version.const ||
    result.valid !== (result.errors.length === 0)
  ) {
    return false;
  }
  return result.errors.every(
    (error) =>
      Object.isFrozen(error) &&
      JSON.stringify(Object.keys(error)) === JSON.stringify(["code", "path"]) &&
      resultSchema.properties.errors.items.oneOf.some((branch) => {
        const codeMatches = error.code === branch.properties.code.const;
        const pathRule = branch.properties.path;
        const pathMatches = Object.hasOwn(pathRule, "const")
          ? error.path === pathRule.const
          : pathRule.enum.includes(error.path);
        return codeMatches && pathMatches;
      }),
  );
}

test("module exposes exactly one unary direct internal checkpoint", () => {
  const boundary = loadFreshBoundary();

  assert.deepEqual(Object.keys(boundary), [functionName]);
  assert.equal(typeof boundary[functionName], "function");
  assert.equal(boundary[functionName].length, 1);
  assert.equal(Object.hasOwn(packageGovernance, functionName), false);
  assert.equal(Object.hasOwn(packageSchemas, functionName), false);
});

test("valid exact envelope returns an isolated deeply frozen success", () => {
  const validate = loadFreshBoundary()[functionName];
  const envelope = makeEnvelope();
  const before = JSON.stringify(envelope);
  const first = validate(envelope);
  const second = validate(envelope);

  assert.deepEqual(first, {
    valid: true,
    contractKind:
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_BOUNDARY",
    version: "1.0.0",
    errors: [],
  });
  assert.equal(matchesResultContract(first), true);
  assert.equal(matchesResultContract(second), true);
  assert.notStrictEqual(first, second);
  assert.notStrictEqual(first.errors, second.errors);
  assert.equal(JSON.stringify(envelope), before);
});

test("null-prototype and non-enumerable exact envelope layers are accepted", () => {
  const validate = loadFreshBoundary()[functionName];
  const ordinary = makeEnvelope();
  const envelope = Object.create(null);
  const bindings = Object.create(null);

  Object.defineProperties(envelope, {
    controlled_handoff_brief: {
      value: ordinary.controlled_handoff_brief,
      enumerable: false,
    },
    component_bindings: { value: bindings, enumerable: false },
  });
  for (const field of familyFields) {
    const binding = Object.create(null);
    Object.defineProperties(binding, {
      component_ref: {
        value: ordinary.component_bindings[field].component_ref,
        enumerable: false,
      },
      candidate: {
        value: ordinary.component_bindings[field].candidate,
        enumerable: false,
      },
    });
    Object.defineProperty(bindings, field, {
      value: binding,
      enumerable: false,
    });
  }

  assert.equal(validate(envelope).valid, true);
});

test("malformed reordered accessor and trap-backed envelope layers fail closed", () => {
  const validate = loadFreshBoundary()[functionName];
  let getterCalls = 0;
  const accessorEnvelope = {};
  Object.defineProperties(accessorEnvelope, {
    controlled_handoff_brief: {
      get() {
        getterCalls += 1;
        return makeValidBrief();
      },
    },
    component_bindings: { value: makeEnvelope().component_bindings },
  });
  const reordered = {};
  reordered.component_bindings = makeEnvelope().component_bindings;
  reordered.controlled_handoff_brief = makeValidBrief();
  const malformedBinding = makeEnvelope();
  malformedBinding.component_bindings.source_register.component_ref = 4;
  const bindingAccessor = makeEnvelope();
  Object.defineProperty(
    bindingAccessor.component_bindings.source_register,
    "component_ref",
    {
      get() {
        getterCalls += 1;
        return "hro_source";
      },
    },
  );
  const trap = new Proxy(
    {},
    {
      getPrototypeOf() {
        throw new Error("hidden trap");
      },
    },
  );

  for (const candidate of [
    null,
    [],
    {},
    { ...makeEnvelope(), extra: true },
    reordered,
    accessorEnvelope,
    malformedBinding,
    bindingAccessor,
    trap,
  ]) {
    assert.deepEqual(validate(candidate), invalidInputShapeResult());
  }
  assert.equal(getterCalls, 0);
});

test("all seven child validators run once in canonical order with direct values", () => {
  const envelope = makeEnvelope();
  const calls = [];
  const keys = [
    "handoff",
    "source",
    "chronology",
    "matrix",
    "gaps",
    "questions",
    "notice",
  ];
  const values = [
    envelope.controlled_handoff_brief,
    ...familyFields.map(
      (field) => envelope.component_bindings[field].candidate,
    ),
  ];
  const validators = Object.fromEntries(
    keys.map((key, index) => [
      key,
      (value) => {
        calls.push([key, value]);
        return { valid: true };
      },
    ]),
  );

  withMockedValidators(validators, (boundary) => {
    assert.equal(boundary[functionName](envelope).valid, true);
  });
  assert.deepEqual(
    calls.map(([key]) => key),
    keys,
  );
  for (let index = 0; index < values.length; index += 1) {
    assert.strictEqual(calls[index][1], values[index]);
  }
});

test("seven structural failures reduce to exact wrapper errors", () => {
  const validate = loadFreshBoundary()[functionName];
  const candidates = Object.fromEntries(familyFields.map((field) => [field, {}]));
  const result = validate(
    makeEnvelope({
      brief: {},
      candidates,
      bindingRefs: Object.fromEntries(
        familyFields.map((field, index) => [field, `hro_invalid_${index}`]),
      ),
    }),
  );

  assert.deepEqual(result.errors, [
    {
      code: "human_review_controlled_handoff_brief_invalid",
      path: "$.controlled_handoff_brief",
    },
    {
      code: "source_register_invalid",
      path: "$.component_bindings.source_register.candidate",
    },
    {
      code: "review_chronology_invalid",
      path: "$.component_bindings.review_chronology.candidate",
    },
    {
      code: "asserted_claim_matrix_invalid",
      path: "$.component_bindings.asserted_claim_matrix.candidate",
    },
    {
      code: "declared_packet_review_gaps_invalid",
      path: "$.component_bindings.declared_packet_review_gaps.candidate",
    },
    {
      code: "human_review_questions_invalid",
      path: "$.component_bindings.human_review_questions.candidate",
    },
    {
      code: "human_review_no_conclusion_notice_invalid",
      path: "$.component_bindings.no_conclusion_notice.candidate",
    },
  ]);
  assert.equal(matchesResultContract(result), true);
});

test("packet mismatches aggregate in family order and stop reference checks", () => {
  const validate = loadFreshBoundary()[functionName];
  const packetRefs = Object.fromEntries(
    familyFields.map((field, index) => [field, `pkt_other_${index}`]),
  );
  const bindingRefs = Object.fromEntries(
    familyFields.map((field, index) => [field, `hro_other_${index}`]),
  );
  const result = validate(
    makeEnvelope({ candidates: makeCandidates(packetRefs), bindingRefs }),
  );

  assert.deepEqual(
    result.errors,
    familyFields.map((field) => ({
      code: "packet_ref_mismatch",
      path: `$.component_bindings.${field}.candidate.packet_ref`,
    })),
  );
  assert.equal(
    result.errors.some((error) => error.code === "component_ref_mismatch"),
    false,
  );
});

test("component-reference mismatches aggregate in exact family order", () => {
  const validate = loadFreshBoundary()[functionName];
  const bindingRefs = Object.fromEntries(
    familyFields.map((field, index) => [field, `hro_other_${index}`]),
  );
  const result = validate(makeEnvelope({ bindingRefs }));

  assert.deepEqual(
    result.errors,
    familyFields.map((field) => ({
      code: "component_ref_mismatch",
      path: `$.component_bindings.${field}.component_ref`,
    })),
  );
  assert.equal(matchesResultContract(result), true);
});

test("field-specific validators enforce family identity before comparison", () => {
  const validate = loadFreshBoundary()[functionName];
  const candidates = makeCandidates();
  candidates.source_register = makeValidChronology();
  const result = validate(makeEnvelope({ candidates }));

  assert.deepEqual(result.errors, [
    {
      code: "source_register_invalid",
      path: "$.component_bindings.source_register.candidate",
    },
  ]);
});

test("cycles traps and rejected values do not leak or mutate input", () => {
  const validate = loadFreshBoundary()[functionName];
  const envelope = makeEnvelope();
  envelope.component_bindings.source_register.candidate.self =
    envelope.component_bindings.source_register.candidate;
  const beforeKeys = Reflect.ownKeys(
    envelope.component_bindings.source_register.candidate,
  );
  const result = validate(envelope);

  assert.deepEqual(result.errors, [
    {
      code: "source_register_invalid",
      path: "$.component_bindings.source_register.candidate",
    },
  ]);
  assert.deepEqual(
    Reflect.ownKeys(envelope.component_bindings.source_register.candidate),
    beforeKeys,
  );
  assert.equal(JSON.stringify(result).includes("self"), false);
  assert.equal(JSON.stringify(result).includes("pkt_001"), false);
  assert.equal(JSON.stringify(result).includes("hro_source"), false);
});

test("module remains static in-process and integration-free", () => {
  const source = fs.readFileSync(boundaryPath, "utf8");
  const semanticsText = fs.readFileSync(semanticsDocPath, "utf8");
  const transitionText = fs.readFileSync(proofTransitionDocPath, "utf8");
  const governanceIndexText = fs.readFileSync(
    path.join(repoRoot, "packages/governance/src/index.js"),
    "utf8",
  );

  for (const forbidden of [
    "node:fs",
    "node:http",
    "node:https",
    "fetch(",
    "process.env",
    "console.",
    "pre-controlled-handoff-validation-boundary",
    "human-review-chronology-source-register-validation-boundary",
    "human-review-asserted-claim-matrix-validation-boundary",
    "human-review-declared-packet-review-gaps-cross-reference-validation-boundary",
  ]) {
    assert.equal(source.includes(forbidden), false, forbidden);
  }
  assert.equal(governanceIndexText.includes(functionName), false);
  assert.equal((governanceIndexText.match(/\n/gu) ?? []).length, 6212);
  assert.match(semanticsText, /PREDECESSOR_CHECKPOINT_INVOCATION_COUNT:\n0/u);
  assert.match(semanticsText, /CROSS_REFERENCE_EXECUTION_PHASE_COUNT:\n6/u);
  assert.match(
    transitionText,
    /FUTURE_CROSS_REFERENCE_RUNTIME_IMPLEMENTATION_FILE_COUNT:\n2/u,
  );
  assert.match(
    transitionText,
    /FUTURE_GOVERNANCE_PACKAGE_INDEX_EXPORT:\nPROHIBITED/u,
  );
  assert.match(
    semanticsText,
    /not actual human review[\s\S]*real-evidence review/u,
  );
});
