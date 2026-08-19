"use strict";

const candidateSchema = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json");
const resultSchema = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result.json");

const ROOT_FIELDS = Object.freeze([...candidateSchema.required]);
const VALUE_RULES = Object.freeze(
  Object.fromEntries(
    ROOT_FIELDS.map((field) => [
      field,
      createValueRule(candidateSchema.properties[field]),
    ]),
  ),
);
const DUPLICATE_PATHS = Object.freeze([
  ...resultSchema.properties.errors.items.oneOf.find(
    (branch) => branch.properties.code.const === "duplicate_reference",
  ).properties.path.enum,
]);
const DUPLICATE_FIELDS = Object.freeze(
  ROOT_FIELDS.filter((field) => DUPLICATE_PATHS.includes(`$.${field}`)),
);
const RESULT_CONTRACT_KIND = resultSchema.properties.contractKind.const;
const RESULT_VERSION = resultSchema.properties.version.const;

function createExclusionRule(branch) {
  return Object.freeze({
    enumValues: Array.isArray(branch.enum)
      ? Object.freeze([...branch.enum])
      : null,
    pattern:
      typeof branch.pattern === "string"
        ? new RegExp(branch.pattern, "u")
        : null,
  });
}

function createValueRule(propertySchema) {
  const excludedBranches = propertySchema.not?.anyOf;

  return Object.freeze({
    type: propertySchema.type,
    hasConst: Object.hasOwn(propertySchema, "const"),
    constValue: propertySchema.const,
    enumValues: Array.isArray(propertySchema.enum)
      ? Object.freeze([...propertySchema.enum])
      : null,
    pattern:
      typeof propertySchema.pattern === "string"
        ? new RegExp(propertySchema.pattern, "u")
        : null,
    exclusions: Object.freeze(
      Array.isArray(excludedBranches)
        ? excludedBranches.map(createExclusionRule)
        : [],
    ),
  });
}

function snapshotPlainObject(value) {
  try {
    if (
      value === null ||
      typeof value !== "object" ||
      Array.isArray(value)
    ) {
      return null;
    }

    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      return null;
    }

    return Object.getOwnPropertyDescriptors(value);
  } catch {
    return null;
  }
}

function hasOwnDescriptor(descriptors, field) {
  return Object.prototype.hasOwnProperty.call(descriptors, field);
}

function getDataDescriptor(descriptors, field) {
  if (!hasOwnDescriptor(descriptors, field)) {
    return null;
  }

  const descriptor = descriptors[field];
  return Object.prototype.hasOwnProperty.call(descriptor, "value")
    ? descriptor
    : null;
}

function hasUnknownOwnKey(descriptors) {
  return Reflect.ownKeys(descriptors).some(
    (key) => typeof key !== "string" || !ROOT_FIELDS.includes(key),
  );
}

function matchesExclusion(value, exclusion) {
  return (
    (exclusion.enumValues !== null &&
      exclusion.enumValues.includes(value)) ||
    (exclusion.pattern !== null && exclusion.pattern.test(value))
  );
}

function matchesValueRule(value, rule) {
  if (rule.hasConst && value !== rule.constValue) {
    return false;
  }
  if (rule.enumValues !== null && !rule.enumValues.includes(value)) {
    return false;
  }
  if (rule.pattern !== null && !rule.pattern.test(value)) {
    return false;
  }

  return !rule.exclusions.some((exclusion) =>
    matchesExclusion(value, exclusion),
  );
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

function validatePhaseOne(descriptors, errors) {
  for (const field of ROOT_FIELDS) {
    if (!hasOwnDescriptor(descriptors, field)) {
      addError(errors, "required_field_missing", `$.${field}`);
    }
  }

  if (hasUnknownOwnKey(descriptors)) {
    addError(errors, "unexpected_field", "$");
  }

  const typedValues = Object.create(null);
  for (const field of ROOT_FIELDS) {
    if (!hasOwnDescriptor(descriptors, field)) {
      continue;
    }

    const descriptor = getDataDescriptor(descriptors, field);
    if (
      descriptor === null ||
      typeof descriptor.value !== VALUE_RULES[field].type
    ) {
      addError(errors, "invalid_field_type", `$.${field}`);
    } else {
      typedValues[field] = descriptor.value;
    }
  }

  const validValues = Object.create(null);
  for (const field of ROOT_FIELDS) {
    if (!Object.hasOwn(typedValues, field)) {
      continue;
    }

    const value = typedValues[field];
    if (!matchesValueRule(value, VALUE_RULES[field])) {
      addError(errors, "invalid_field_value", `$.${field}`);
    } else {
      validValues[field] = value;
    }
  }

  return validValues;
}

function validateDuplicateReferences(validValues, errors) {
  const seenReferences = new Set();

  for (const field of DUPLICATE_FIELDS) {
    if (!Object.hasOwn(validValues, field)) {
      continue;
    }

    const value = validValues[field];
    if (seenReferences.has(value)) {
      addError(errors, "duplicate_reference", `$.${field}`);
    } else {
      seenReferences.add(value);
    }
  }
}

function validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence(
  candidate,
) {
  const errors = [];
  const descriptors = snapshotPlainObject(candidate);

  if (descriptors === null) {
    addError(errors, "invalid_field_type", "$");
    return makeResult(errors);
  }

  const validValues = validatePhaseOne(descriptors, errors);
  validateDuplicateReferences(validValues, errors);

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence,
};
