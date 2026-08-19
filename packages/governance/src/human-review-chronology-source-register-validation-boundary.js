"use strict";

const {
  humanReviewChronologySourceRegisterCrossReferenceResult: resultSchema,
  validateHumanReviewChronology,
  validateHumanReviewSourceRegister,
} = require("../../schemas/src/index.js");

const INPUT_FIELDS = Object.freeze([
  "review_chronology",
  "source_register",
]);
const RESULT_CONTRACT_KIND = resultSchema.properties.contractKind.const;
const RESULT_VERSION = resultSchema.properties.version.const;

function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function getDataDescriptor(descriptors, field) {
  if (!Object.prototype.hasOwnProperty.call(descriptors, field)) {
    return null;
  }

  const descriptor = descriptors[field];
  return Object.prototype.hasOwnProperty.call(descriptor, "value")
    ? descriptor
    : null;
}

function readInputEnvelope(candidate) {
  if (!isPlainObject(candidate)) {
    return null;
  }

  const descriptors = Object.getOwnPropertyDescriptors(candidate);
  const keys = Reflect.ownKeys(descriptors);

  if (
    keys.length !== INPUT_FIELDS.length ||
    keys.some((key, index) => key !== INPUT_FIELDS[index])
  ) {
    return null;
  }

  const chronologyDescriptor = getDataDescriptor(
    descriptors,
    "review_chronology",
  );
  const sourceRegisterDescriptor = getDataDescriptor(
    descriptors,
    "source_register",
  );

  if (chronologyDescriptor === null || sourceRegisterDescriptor === null) {
    return null;
  }

  return {
    reviewChronology: chronologyDescriptor.value,
    sourceRegister: sourceRegisterDescriptor.value,
  };
}

function addError(errors, code, path) {
  errors.push({ code, path });
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
      Object.freeze({
        code: error.code,
        path: error.path,
      }),
    ),
  );

  return Object.freeze({
    valid: frozenErrors.length === 0,
    contractKind: RESULT_CONTRACT_KIND,
    version: RESULT_VERSION,
    errors: frozenErrors,
  });
}

function validateHumanReviewChronologySourceRegisterCrossReference(candidate) {
  const input = readInputEnvelope(candidate);

  if (input === null) {
    return makeResult([{ code: "invalid_input_shape", path: "$" }]);
  }

  const chronologyResult = validateHumanReviewChronology(
    input.reviewChronology,
  );
  const sourceRegisterResult = validateHumanReviewSourceRegister(
    input.sourceRegister,
  );
  const errors = [];

  if (chronologyResult.valid !== true) {
    addError(
      errors,
      "review_chronology_invalid",
      "$.review_chronology",
    );
  }

  if (sourceRegisterResult.valid !== true) {
    addError(errors, "source_register_invalid", "$.source_register");
  }

  if (errors.length > 0) {
    return makeResult(errors);
  }

  if (
    input.reviewChronology.packet_ref !== input.sourceRegister.packet_ref
  ) {
    return makeResult([
      {
        code: "packet_ref_mismatch",
        path: "$.review_chronology.packet_ref",
      },
    ]);
  }

  const registeredSourceReferences = new Set();

  for (
    let sourceIndex = 0;
    sourceIndex < input.sourceRegister.sources.length;
    sourceIndex += 1
  ) {
    registeredSourceReferences.add(
      input.sourceRegister.sources[sourceIndex].source_ref,
    );
  }

  for (
    let entryIndex = 0;
    entryIndex < input.reviewChronology.entries.length;
    entryIndex += 1
  ) {
    const sourceReferences =
      input.reviewChronology.entries[entryIndex].source_refs;

    for (
      let referenceIndex = 0;
      referenceIndex < sourceReferences.length;
      referenceIndex += 1
    ) {
      if (!registeredSourceReferences.has(sourceReferences[referenceIndex])) {
        addError(
          errors,
          "source_ref_not_in_register",
          `$.review_chronology.entries[${entryIndex}].source_refs[${referenceIndex}]`,
        );
      }
    }
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewChronologySourceRegisterCrossReference,
};
