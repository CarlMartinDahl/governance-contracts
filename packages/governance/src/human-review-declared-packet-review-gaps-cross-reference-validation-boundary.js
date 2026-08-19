"use strict";

const {
  validateHumanReviewDeclaredPacketReviewGaps,
} = require("../../schemas/src/human-review-declared-packet-review-gaps-validator.js");
const {
  validateHumanReviewAssertedClaimMatrix,
} = require("../../schemas/src/human-review-asserted-claim-matrix-validator.js");
const {
  humanReviewDeclaredPacketReviewGapsCrossReferenceResult: resultSchema,
  validateHumanReviewChronology,
  validateHumanReviewSourceRegister,
} = require("../../schemas/src/index.js");

const INPUT_FIELDS = Object.freeze([
  "declared_packet_review_gaps",
  "source_register",
  "review_chronology",
  "asserted_claim_matrix",
]);
const RESULT_CONTRACT_KIND = resultSchema.properties.contractKind.const;
const RESULT_VERSION = resultSchema.properties.version.const;

function readInputEnvelope(candidate) {
  try {
    if (candidate === null || typeof candidate !== "object") {
      return null;
    }

    if (Array.isArray(candidate)) {
      return null;
    }

    const prototype = Object.getPrototypeOf(candidate);
    if (prototype !== Object.prototype && prototype !== null) {
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

    const values = [];
    for (const field of INPUT_FIELDS) {
      const descriptor = descriptors[field];
      if (!Object.prototype.hasOwnProperty.call(descriptor, "value")) {
        return null;
      }
      values.push(descriptor.value);
    }

    return {
      declaredPacketReviewGaps: values[0],
      sourceRegister: values[1],
      reviewChronology: values[2],
      assertedClaimMatrix: values[3],
    };
  } catch {
    return null;
  }
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

function validateHumanReviewDeclaredPacketReviewGapsCrossReference(candidate) {
  const input = readInputEnvelope(candidate);

  if (input === null) {
    return makeResult([{ code: "invalid_input_shape", path: "$" }]);
  }

  const gapsResult = validateHumanReviewDeclaredPacketReviewGaps(
    input.declaredPacketReviewGaps,
  );
  const sourceRegisterResult = validateHumanReviewSourceRegister(
    input.sourceRegister,
  );
  const chronologyResult = validateHumanReviewChronology(
    input.reviewChronology,
  );
  const matrixResult = validateHumanReviewAssertedClaimMatrix(
    input.assertedClaimMatrix,
  );
  const errors = [];

  if (gapsResult.valid !== true) {
    addError(
      errors,
      "declared_packet_review_gaps_invalid",
      "$.declared_packet_review_gaps",
    );
  }

  if (sourceRegisterResult.valid !== true) {
    addError(errors, "source_register_invalid", "$.source_register");
  }

  if (chronologyResult.valid !== true) {
    addError(errors, "review_chronology_invalid", "$.review_chronology");
  }

  if (matrixResult.valid !== true) {
    addError(
      errors,
      "asserted_claim_matrix_invalid",
      "$.asserted_claim_matrix",
    );
  }

  if (errors.length > 0) {
    return makeResult(errors);
  }

  const anchorPacketReference = input.declaredPacketReviewGaps.packet_ref;

  if (anchorPacketReference !== input.sourceRegister.packet_ref) {
    addError(
      errors,
      "packet_ref_mismatch",
      "$.source_register.packet_ref",
    );
  }

  if (anchorPacketReference !== input.reviewChronology.packet_ref) {
    addError(
      errors,
      "packet_ref_mismatch",
      "$.review_chronology.packet_ref",
    );
  }

  if (anchorPacketReference !== input.assertedClaimMatrix.packet_ref) {
    addError(
      errors,
      "packet_ref_mismatch",
      "$.asserted_claim_matrix.packet_ref",
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
    let gapIndex = 0;
    gapIndex < input.declaredPacketReviewGaps.gaps.length;
    gapIndex += 1
  ) {
    const sourceReferences =
      input.declaredPacketReviewGaps.gaps[gapIndex].source_refs;

    for (
      let referenceIndex = 0;
      referenceIndex < sourceReferences.length;
      referenceIndex += 1
    ) {
      if (!registeredSourceReferences.has(sourceReferences[referenceIndex])) {
        addError(
          errors,
          "source_ref_not_in_register",
          `$.declared_packet_review_gaps.gaps[${gapIndex}].source_refs[${referenceIndex}]`,
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
    let gapIndex = 0;
    gapIndex < input.declaredPacketReviewGaps.gaps.length;
    gapIndex += 1
  ) {
    const chronologyReferences =
      input.declaredPacketReviewGaps.gaps[gapIndex].chronology_entry_refs;

    for (
      let referenceIndex = 0;
      referenceIndex < chronologyReferences.length;
      referenceIndex += 1
    ) {
      if (!chronologyEntryReferences.has(chronologyReferences[referenceIndex])) {
        addError(
          errors,
          "chronology_entry_ref_not_in_chronology",
          `$.declared_packet_review_gaps.gaps[${gapIndex}].chronology_entry_refs[${referenceIndex}]`,
        );
      }
    }
  }

  const assertedClaimReferences = new Set();

  for (
    let claimIndex = 0;
    claimIndex < input.assertedClaimMatrix.claims.length;
    claimIndex += 1
  ) {
    assertedClaimReferences.add(
      input.assertedClaimMatrix.claims[claimIndex].claim_ref,
    );
  }

  for (
    let gapIndex = 0;
    gapIndex < input.declaredPacketReviewGaps.gaps.length;
    gapIndex += 1
  ) {
    const claimReferences =
      input.declaredPacketReviewGaps.gaps[gapIndex].claim_refs;

    for (
      let referenceIndex = 0;
      referenceIndex < claimReferences.length;
      referenceIndex += 1
    ) {
      if (!assertedClaimReferences.has(claimReferences[referenceIndex])) {
        addError(
          errors,
          "claim_ref_not_in_asserted_claim_matrix",
          `$.declared_packet_review_gaps.gaps[${gapIndex}].claim_refs[${referenceIndex}]`,
        );
      }
    }
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewDeclaredPacketReviewGapsCrossReference,
};
