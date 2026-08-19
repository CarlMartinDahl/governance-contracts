"use strict";

const {
  validateHumanReviewSourceRegister,
} = require("../../schemas/src/index.js");

function validateHumanReviewSourceRegisterForDownstream(candidate) {
  return validateHumanReviewSourceRegister(candidate);
}

module.exports = {
  validateHumanReviewSourceRegisterForDownstream,
};
