"use strict";

const {
  validateHumanReviewControlledHandoffBriefCrossReference,
} = require("./human-review-controlled-handoff-brief-cross-reference-validation-boundary.js");

function validateHumanReviewControlledHandoffBriefCrossReferencePreHumanProfessionalApproval(
  envelope,
) {
  return validateHumanReviewControlledHandoffBriefCrossReference(envelope);
}

module.exports = {
  validateHumanReviewControlledHandoffBriefCrossReferencePreHumanProfessionalApproval,
};
