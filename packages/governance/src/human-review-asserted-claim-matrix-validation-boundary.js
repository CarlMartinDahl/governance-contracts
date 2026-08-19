"use strict";

const {
  validateHumanReviewAssertedClaimMatrix,
} = require("../../schemas/src/human-review-asserted-claim-matrix-validator.js");
const {
  humanReviewAssertedClaimMatrixCrossReferenceResult: resultSchema,
  validateHumanReviewChronology,
  validateHumanReviewSourceRegister,
} = require("../../schemas/src/index.js");

const INPUT_FIELDS = Object.freeze([
  "asserted_claim_matrix",
  "source_register",
  "review_chronology",
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

  const matrixDescriptor = getDataDescriptor(
    descriptors,
    "asserted_claim_matrix",
  );
  const sourceRegisterDescriptor = getDataDescriptor(
    descriptors,
    "source_register",
  );
  const chronologyDescriptor = getDataDescriptor(
    descriptors,
    "review_chronology",
  );

  if (
    matrixDescriptor === null ||
    sourceRegisterDescriptor === null ||
    chronologyDescriptor === null
  ) {
    return null;
  }

  return {
    assertedClaimMatrix: matrixDescriptor.value,
    sourceRegister: sourceRegisterDescriptor.value,
    reviewChronology: chronologyDescriptor.value,
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

function validateHumanReviewAssertedClaimMatrixCrossReference(candidate) {
  const input = readInputEnvelope(candidate);

  if (input === null) {
    return makeResult([{ code: "invalid_input_shape", path: "$" }]);
  }

  const matrixResult = validateHumanReviewAssertedClaimMatrix(
    input.assertedClaimMatrix,
  );
  const sourceRegisterResult = validateHumanReviewSourceRegister(
    input.sourceRegister,
  );
  const chronologyResult = validateHumanReviewChronology(
    input.reviewChronology,
  );
  const errors = [];

  if (matrixResult.valid !== true) {
    addError(
      errors,
      "asserted_claim_matrix_invalid",
      "$.asserted_claim_matrix",
    );
  }

  if (sourceRegisterResult.valid !== true) {
    addError(errors, "source_register_invalid", "$.source_register");
  }

  if (chronologyResult.valid !== true) {
    addError(errors, "review_chronology_invalid", "$.review_chronology");
  }

  if (errors.length > 0) {
    return makeResult(errors);
  }

  if (
    input.assertedClaimMatrix.packet_ref !== input.sourceRegister.packet_ref
  ) {
    addError(
      errors,
      "packet_ref_mismatch",
      "$.source_register.packet_ref",
    );
  }

  if (
    input.assertedClaimMatrix.packet_ref !== input.reviewChronology.packet_ref
  ) {
    addError(
      errors,
      "packet_ref_mismatch",
      "$.review_chronology.packet_ref",
    );
  }

  if (errors.length > 0) {
    return makeResult(errors);
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
    let claimIndex = 0;
    claimIndex < input.assertedClaimMatrix.claims.length;
    claimIndex += 1
  ) {
    const sourceReferences =
      input.assertedClaimMatrix.claims[claimIndex].source_refs;

    for (
      let referenceIndex = 0;
      referenceIndex < sourceReferences.length;
      referenceIndex += 1
    ) {
      if (!registeredSourceReferences.has(sourceReferences[referenceIndex])) {
        addError(
          errors,
          "source_ref_not_in_register",
          `$.asserted_claim_matrix.claims[${claimIndex}].source_refs[${referenceIndex}]`,
        );
      }
    }
  }

  const chronologyEntryReferences = new Set();

  for (
    let entryIndex = 0;
    entryIndex < input.reviewChronology.entries.length;
    entryIndex += 1
  ) {
    chronologyEntryReferences.add(
      input.reviewChronology.entries[entryIndex].entry_ref,
    );
  }

  for (
    let claimIndex = 0;
    claimIndex < input.assertedClaimMatrix.claims.length;
    claimIndex += 1
  ) {
    const chronologyReferences =
      input.assertedClaimMatrix.claims[claimIndex].chronology_entry_refs;

    for (
      let referenceIndex = 0;
      referenceIndex < chronologyReferences.length;
      referenceIndex += 1
    ) {
      if (!chronologyEntryReferences.has(chronologyReferences[referenceIndex])) {
        addError(
          errors,
          "chronology_entry_ref_not_in_chronology",
          `$.asserted_claim_matrix.claims[${claimIndex}].chronology_entry_refs[${referenceIndex}]`,
        );
      }
    }
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewAssertedClaimMatrixCrossReference,
};
