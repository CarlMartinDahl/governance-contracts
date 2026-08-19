"use strict";

const {
  validateHumanReviewQuestionsCrossReference,
} = require("./human-review-questions-cross-reference-validation-boundary.js");

function validateHumanReviewQuestionsCrossReferencePreControlledHandoff(
  envelope,
) {
  return validateHumanReviewQuestionsCrossReference(envelope);
}

module.exports = {
  validateHumanReviewQuestionsCrossReferencePreControlledHandoff,
};
