"use strict";

const {
  validateHumanReviewControlledHandoffBrief,
} = require("../../schemas/src/human-review-controlled-handoff-brief-validator.js");
const {
  validateHumanReviewAssertedClaimMatrix,
} = require("../../schemas/src/human-review-asserted-claim-matrix-validator.js");
const {
  validateHumanReviewDeclaredPacketReviewGaps,
} = require("../../schemas/src/human-review-declared-packet-review-gaps-validator.js");
const {
  validateHumanReviewQuestions,
} = require("../../schemas/src/human-review-questions-validator.js");
const {
  validateHumanReviewNoConclusionNotice,
} = require("../../schemas/src/human-review-no-conclusion-notice-validator.js");
const {
  humanReviewControlledHandoffBriefCrossReferenceResult: resultSchema,
  validateHumanReviewChronology,
  validateHumanReviewSourceRegister,
} = require("../../schemas/src/index.js");

const INPUT_FIELDS = Object.freeze([
  "controlled_handoff_brief",
  "component_bindings",
]);
const BINDING_FIELDS = Object.freeze([
  "source_register",
  "review_chronology",
  "asserted_claim_matrix",
  "declared_packet_review_gaps",
  "human_review_questions",
  "no_conclusion_notice",
]);
const BINDING_VALUE_FIELDS = Object.freeze(["component_ref", "candidate"]);
const BRIEF_REFERENCE_FIELDS = Object.freeze([
  "source_register_ref",
  "review_chronology_ref",
  "asserted_claim_matrix_ref",
  "declared_packet_review_gaps_ref",
  "human_review_questions_ref",
  "no_conclusion_notice_ref",
]);
const STRUCTURAL_ERROR_CODES = Object.freeze([
  "source_register_invalid",
  "review_chronology_invalid",
  "asserted_claim_matrix_invalid",
  "declared_packet_review_gaps_invalid",
  "human_review_questions_invalid",
  "human_review_no_conclusion_notice_invalid",
]);
const RESULT_CONTRACT_KIND = resultSchema.properties.contractKind.const;
const RESULT_VERSION = resultSchema.properties.version.const;

function readExactDataValues(candidate, expectedFields) {
  try {
    if (
      candidate === null ||
      typeof candidate !== "object" ||
      Array.isArray(candidate)
    ) {
      return null;
    }

    const prototype = Object.getPrototypeOf(candidate);
    if (prototype !== Object.prototype && prototype !== null) {
      return null;
    }

    const descriptors = Object.getOwnPropertyDescriptors(candidate);
    const keys = Reflect.ownKeys(descriptors);
    if (
      keys.length !== expectedFields.length ||
      keys.some((key, index) => key !== expectedFields[index])
    ) {
      return null;
    }

    const values = [];
    for (const field of expectedFields) {
      const descriptor = descriptors[field];
      if (!Object.prototype.hasOwnProperty.call(descriptor, "value")) {
        return null;
      }
      values.push(descriptor.value);
    }
    return values;
  } catch {
    return null;
  }
}

function readInputEnvelope(candidate) {
  const inputValues = readExactDataValues(candidate, INPUT_FIELDS);
  if (inputValues === null) {
    return null;
  }

  const bindingValues = readExactDataValues(inputValues[1], BINDING_FIELDS);
  if (bindingValues === null) {
    return null;
  }

  const bindings = [];
  for (let index = 0; index < BINDING_FIELDS.length; index += 1) {
    const values = readExactDataValues(
      bindingValues[index],
      BINDING_VALUE_FIELDS,
    );
    if (values === null || typeof values[0] !== "string") {
      return null;
    }
    bindings.push({
      field: BINDING_FIELDS[index],
      briefReferenceField: BRIEF_REFERENCE_FIELDS[index],
      componentRef: values[0],
      candidate: values[1],
    });
  }

  return {
    controlledHandoffBrief: inputValues[0],
    bindings,
  };
}

function readOwnDataValue(candidate, field) {
  try {
    if (candidate === null || typeof candidate !== "object") {
      return { readable: false };
    }
    const descriptor = Object.getOwnPropertyDescriptor(candidate, field);
    if (
      descriptor === undefined ||
      !Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      return { readable: false };
    }
    return { readable: true, value: descriptor.value };
  } catch {
    return { readable: false };
  }
}

function readValidatedCrossReferenceValues(input) {
  const briefPacket = readOwnDataValue(
    input.controlledHandoffBrief,
    "packet_ref",
  );
  const componentRefs = readOwnDataValue(
    input.controlledHandoffBrief,
    "component_refs",
  );
  if (!briefPacket.readable || !componentRefs.readable) {
    return null;
  }

  const briefReferences = [];
  const candidatePackets = [];
  for (const binding of input.bindings) {
    const briefReference = readOwnDataValue(
      componentRefs.value,
      binding.briefReferenceField,
    );
    const candidatePacket = readOwnDataValue(binding.candidate, "packet_ref");
    if (!briefReference.readable || !candidatePacket.readable) {
      return null;
    }
    briefReferences.push(briefReference.value);
    candidatePackets.push(candidatePacket.value);
  }

  return {
    briefPacketRef: briefPacket.value,
    briefReferences,
    candidatePackets,
  };
}

function addError(errors, code, errorPath) {
  errors.push({ code, path: errorPath });
}

function dedupeErrors(errors) {
  const seen = new Set();
  const deduped = [];

  for (const error of errors) {
    const key = `${error.code}\u0000${error.path}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(error);
    }
  }
  return deduped;
}

function makeResult(errors) {
  const frozenErrors = Object.freeze(
    dedupeErrors(errors).map((error) =>
      Object.freeze({ code: error.code, path: error.path }),
    ),
  );

  return Object.freeze({
    valid: frozenErrors.length === 0,
    contractKind: RESULT_CONTRACT_KIND,
    version: RESULT_VERSION,
    errors: frozenErrors,
  });
}

function validateHumanReviewControlledHandoffBriefCrossReference(candidate) {
  const input = readInputEnvelope(candidate);
  if (input === null) {
    return makeResult([{ code: "invalid_input_shape", path: "$" }]);
  }

  const structuralResults = [
    validateHumanReviewControlledHandoffBrief(input.controlledHandoffBrief),
    validateHumanReviewSourceRegister(input.bindings[0].candidate),
    validateHumanReviewChronology(input.bindings[1].candidate),
    validateHumanReviewAssertedClaimMatrix(input.bindings[2].candidate),
    validateHumanReviewDeclaredPacketReviewGaps(input.bindings[3].candidate),
    validateHumanReviewQuestions(input.bindings[4].candidate),
    validateHumanReviewNoConclusionNotice(input.bindings[5].candidate),
  ];
  const errors = [];

  if (structuralResults[0].valid !== true) {
    addError(
      errors,
      "human_review_controlled_handoff_brief_invalid",
      "$.controlled_handoff_brief",
    );
  }
  for (let index = 0; index < input.bindings.length; index += 1) {
    if (structuralResults[index + 1].valid !== true) {
      addError(
        errors,
        STRUCTURAL_ERROR_CODES[index],
        `$.component_bindings.${input.bindings[index].field}.candidate`,
      );
    }
  }
  if (errors.length > 0) {
    return makeResult(errors);
  }

  const references = readValidatedCrossReferenceValues(input);
  if (references === null) {
    return makeResult([{ code: "invalid_input_shape", path: "$" }]);
  }

  for (let index = 0; index < input.bindings.length; index += 1) {
    if (references.briefPacketRef !== references.candidatePackets[index]) {
      addError(
        errors,
        "packet_ref_mismatch",
        `$.component_bindings.${input.bindings[index].field}.candidate.packet_ref`,
      );
    }
  }
  if (errors.length > 0) {
    return makeResult(errors);
  }

  for (let index = 0; index < input.bindings.length; index += 1) {
    if (references.briefReferences[index] !== input.bindings[index].componentRef) {
      addError(
        errors,
        "component_ref_mismatch",
        `$.component_bindings.${input.bindings[index].field}.component_ref`,
      );
    }
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewControlledHandoffBriefCrossReference,
};
