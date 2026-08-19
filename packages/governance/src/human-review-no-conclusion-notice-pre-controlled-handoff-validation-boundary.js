"use strict";

const {
  validateHumanReviewNoConclusionNoticeCrossReference,
} = require("./human-review-no-conclusion-notice-cross-reference-validation-boundary.js");

function validateHumanReviewNoConclusionNoticeCrossReferencePreControlledHandoff(
  envelope,
) {
  return validateHumanReviewNoConclusionNoticeCrossReference(envelope);
}

module.exports = {
  validateHumanReviewNoConclusionNoticeCrossReferencePreControlledHandoff,
};
