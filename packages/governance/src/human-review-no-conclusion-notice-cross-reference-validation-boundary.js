"use strict";

const {
  validateHumanReviewNoConclusionNotice,
} = require("../../schemas/src/human-review-no-conclusion-notice-validator.js");
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
  humanReviewNoConclusionNoticeCrossReferenceResult: resultSchema,
  validateHumanReviewChronology,
  validateHumanReviewSourceRegister,
} = require("../../schemas/src/index.js");

const INPUT_FIELDS = Object.freeze([
  "human_review_no_conclusion_notice",
  "source_register",
  "review_chronology",
  "asserted_claim_matrix",
  "declared_packet_review_gaps",
  "human_review_questions",
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
      humanReviewNoConclusionNotice: values[0],
      sourceRegister: values[1],
      reviewChronology: values[2],
      assertedClaimMatrix: values[3],
      declaredPacketReviewGaps: values[4],
      humanReviewQuestions: values[5],
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

function validateHumanReviewNoConclusionNoticeCrossReference(candidate) {
  const input = readInputEnvelope(candidate);

  if (input === null) {
    return makeResult([{ code: "invalid_input_shape", path: "$" }]);
  }

  const noticeResult = validateHumanReviewNoConclusionNotice(
    input.humanReviewNoConclusionNotice,
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
  const gapsResult = validateHumanReviewDeclaredPacketReviewGaps(
    input.declaredPacketReviewGaps,
  );
  const questionsResult = validateHumanReviewQuestions(
    input.humanReviewQuestions,
  );
  const errors = [];

  if (noticeResult.valid !== true) {
    addError(
      errors,
      "human_review_no_conclusion_notice_invalid",
      "$.human_review_no_conclusion_notice",
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

  if (gapsResult.valid !== true) {
    addError(
      errors,
      "declared_packet_review_gaps_invalid",
      "$.declared_packet_review_gaps",
    );
  }

  if (questionsResult.valid !== true) {
    addError(
      errors,
      "human_review_questions_invalid",
      "$.human_review_questions",
    );
  }

  if (errors.length > 0) {
    return makeResult(errors);
  }

  const anchorPacketReference =
    input.humanReviewNoConclusionNotice.packet_ref;

  if (anchorPacketReference !== input.sourceRegister.packet_ref) {
    addError(errors, "packet_ref_mismatch", "$.source_register.packet_ref");
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

  if (anchorPacketReference !== input.declaredPacketReviewGaps.packet_ref) {
    addError(
      errors,
      "packet_ref_mismatch",
      "$.declared_packet_review_gaps.packet_ref",
    );
  }

  if (anchorPacketReference !== input.humanReviewQuestions.packet_ref) {
    addError(
      errors,
      "packet_ref_mismatch",
      "$.human_review_questions.packet_ref",
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
    let noticeIndex = 0;
    noticeIndex < input.humanReviewNoConclusionNotice.notices.length;
    noticeIndex += 1
  ) {
    const sourceReferences =
      input.humanReviewNoConclusionNotice.notices[noticeIndex].source_refs;

    for (
      let referenceIndex = 0;
      referenceIndex < sourceReferences.length;
      referenceIndex += 1
    ) {
      if (!registeredSourceReferences.has(sourceReferences[referenceIndex])) {
        addError(
          errors,
          "source_ref_not_in_register",
          `$.human_review_no_conclusion_notice.notices[${noticeIndex}].source_refs[${referenceIndex}]`,
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
    let noticeIndex = 0;
    noticeIndex < input.humanReviewNoConclusionNotice.notices.length;
    noticeIndex += 1
  ) {
    const chronologyReferences =
      input.humanReviewNoConclusionNotice.notices[noticeIndex]
        .chronology_entry_refs;

    for (
      let referenceIndex = 0;
      referenceIndex < chronologyReferences.length;
      referenceIndex += 1
    ) {
      if (!chronologyEntryReferences.has(chronologyReferences[referenceIndex])) {
        addError(
          errors,
          "chronology_entry_ref_not_in_chronology",
          `$.human_review_no_conclusion_notice.notices[${noticeIndex}].chronology_entry_refs[${referenceIndex}]`,
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
    let noticeIndex = 0;
    noticeIndex < input.humanReviewNoConclusionNotice.notices.length;
    noticeIndex += 1
  ) {
    const claimReferences =
      input.humanReviewNoConclusionNotice.notices[noticeIndex].claim_refs;

    for (
      let referenceIndex = 0;
      referenceIndex < claimReferences.length;
      referenceIndex += 1
    ) {
      if (!assertedClaimReferences.has(claimReferences[referenceIndex])) {
        addError(
          errors,
          "claim_ref_not_in_asserted_claim_matrix",
          `$.human_review_no_conclusion_notice.notices[${noticeIndex}].claim_refs[${referenceIndex}]`,
        );
      }
    }
  }

  const declaredGapReferences = new Set();

  for (
    let gapIndex = 0;
    gapIndex < input.declaredPacketReviewGaps.gaps.length;
    gapIndex += 1
  ) {
    declaredGapReferences.add(
      input.declaredPacketReviewGaps.gaps[gapIndex].gap_ref,
    );
  }

  for (
    let noticeIndex = 0;
    noticeIndex < input.humanReviewNoConclusionNotice.notices.length;
    noticeIndex += 1
  ) {
    const gapReferences =
      input.humanReviewNoConclusionNotice.notices[noticeIndex].gap_refs;

    for (
      let referenceIndex = 0;
      referenceIndex < gapReferences.length;
      referenceIndex += 1
    ) {
      if (!declaredGapReferences.has(gapReferences[referenceIndex])) {
        addError(
          errors,
          "gap_ref_not_in_declared_packet_review_gaps",
          `$.human_review_no_conclusion_notice.notices[${noticeIndex}].gap_refs[${referenceIndex}]`,
        );
      }
    }
  }

  const humanReviewQuestionReferences = new Set();

  for (
    let questionIndex = 0;
    questionIndex < input.humanReviewQuestions.questions.length;
    questionIndex += 1
  ) {
    humanReviewQuestionReferences.add(
      input.humanReviewQuestions.questions[questionIndex].question_ref,
    );
  }

  for (
    let noticeIndex = 0;
    noticeIndex < input.humanReviewNoConclusionNotice.notices.length;
    noticeIndex += 1
  ) {
    const questionReferences =
      input.humanReviewNoConclusionNotice.notices[noticeIndex].question_refs;

    for (
      let referenceIndex = 0;
      referenceIndex < questionReferences.length;
      referenceIndex += 1
    ) {
      if (!humanReviewQuestionReferences.has(questionReferences[referenceIndex])) {
        addError(
          errors,
          "question_ref_not_in_human_review_questions",
          `$.human_review_no_conclusion_notice.notices[${noticeIndex}].question_refs[${referenceIndex}]`,
        );
      }
    }
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewNoConclusionNoticeCrossReference,
};
