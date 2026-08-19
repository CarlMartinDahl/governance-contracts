"use strict";

const candidateSchema = require("../../../schemas/human-review-controlled-handoff-human-professional-approval.json");
const resultSchema = require("../../../schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json");

const ROOT_FIELDS = Object.freeze([...candidateSchema.required]);
const ROOT_CONTAINER_FIELDS = Object.freeze([
  "reviewer_attribution",
  "decision_support",
]);
const ROOT_STRING_FIELDS = Object.freeze(
  ROOT_FIELDS.filter((field) => !ROOT_CONTAINER_FIELDS.includes(field)),
);
const REVIEWER_SCHEMA = candidateSchema.$defs.reviewerAttribution;
const REVIEWER_FIELDS = Object.freeze([...REVIEWER_SCHEMA.required]);
const SUPPORT_SCHEMA = candidateSchema.$defs.decisionSupport;
const REFERENCE_FIELDS = Object.freeze([...SUPPORT_SCHEMA.required]);
const RESULT_CONTRACT_KIND = resultSchema.properties.contractKind.const;
const RESULT_VERSION = resultSchema.properties.version.const;
const CORRECTION_REQUIRED_DECISION =
  candidateSchema.allOf[0].if.properties.decision.const;
const CANONICAL_ARRAY_INDEX = /^(?:0|[1-9][0-9]*)$/u;

function createStringRule(propertySchema) {
  return Object.freeze({
    hasConst: Object.hasOwn(propertySchema, "const"),
    constValue: propertySchema.const,
    enumValues: Array.isArray(propertySchema.enum)
      ? Object.freeze([...propertySchema.enum])
      : null,
    pattern:
      typeof propertySchema.pattern === "string"
        ? new RegExp(propertySchema.pattern, "u")
        : null,
  });
}

function createStringRules(properties, fields) {
  return Object.freeze(
    Object.fromEntries(
      fields.map((field) => [field, createStringRule(properties[field])]),
    ),
  );
}

const ROOT_STRING_RULES = createStringRules(
  candidateSchema.properties,
  ROOT_STRING_FIELDS,
);
const REVIEWER_STRING_RULES = createStringRules(
  REVIEWER_SCHEMA.properties,
  REVIEWER_FIELDS,
);
const REFERENCE_RULES = Object.freeze(
  Object.fromEntries(
    REFERENCE_FIELDS.map((field) => [
      field,
      Object.freeze({
        pattern: new RegExp(
          SUPPORT_SCHEMA.properties[field].items.pattern,
          "u",
        ),
      }),
    ]),
  ),
);

function isArray(value) {
  try {
    return Array.isArray(value);
  } catch {
    return false;
  }
}

function snapshotPlainObject(value) {
  try {
    if (value === null || typeof value !== "object" || isArray(value)) {
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

function snapshotArray(value) {
  if (!isArray(value)) {
    return null;
  }

  try {
    const descriptors = Object.getOwnPropertyDescriptors(value);
    const lengthDescriptor = descriptors.length;
    if (
      lengthDescriptor === undefined ||
      !Object.prototype.hasOwnProperty.call(lengthDescriptor, "value") ||
      !Number.isSafeInteger(lengthDescriptor.value) ||
      lengthDescriptor.value < 0
    ) {
      return null;
    }

    return {
      descriptors,
      length: lengthDescriptor.value,
      allItemsValid: true,
      validReferences: [],
    };
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

function hasUnknownOwnKey(descriptors, allowedFields) {
  return Reflect.ownKeys(descriptors).some(
    (key) => typeof key !== "string" || !allowedFields.includes(key),
  );
}

function hasUnknownArrayKey(state) {
  return Reflect.ownKeys(state.descriptors).some((key) => {
    if (key === "length") {
      return false;
    }
    if (typeof key !== "string" || !CANONICAL_ARRAY_INDEX.test(key)) {
      return true;
    }

    const index = Number(key);
    return !Number.isSafeInteger(index) || index >= state.length;
  });
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

function addMissingFields(descriptors, fields, pathPrefix, errors) {
  for (const field of fields) {
    if (!hasOwnDescriptor(descriptors, field)) {
      addError(errors, "required_field_missing", `${pathPrefix}.${field}`);
    }
  }
}

function stringMatchesRule(value, rule) {
  if (rule.hasConst && value !== rule.constValue) {
    return false;
  }
  if (rule.enumValues !== null && !rule.enumValues.includes(value)) {
    return false;
  }
  return rule.pattern === null || rule.pattern.test(value);
}

function validateRoot(descriptors, errors) {
  addMissingFields(descriptors, ROOT_FIELDS, "$", errors);

  if (hasUnknownOwnKey(descriptors, ROOT_FIELDS)) {
    addError(errors, "unexpected_field", "$");
  }

  const typedStringValues = Object.create(null);
  let reviewerDescriptors = null;
  let supportDescriptors = null;

  for (const field of ROOT_FIELDS) {
    if (!hasOwnDescriptor(descriptors, field)) {
      continue;
    }

    const descriptor = getDataDescriptor(descriptors, field);
    if (ROOT_CONTAINER_FIELDS.includes(field)) {
      const nestedDescriptors =
        descriptor === null ? null : snapshotPlainObject(descriptor.value);
      if (nestedDescriptors === null) {
        addError(errors, "invalid_field_type", `$.${field}`);
      } else if (field === "reviewer_attribution") {
        reviewerDescriptors = nestedDescriptors;
      } else {
        supportDescriptors = nestedDescriptors;
      }
      continue;
    }

    if (descriptor === null || typeof descriptor.value !== "string") {
      addError(errors, "invalid_field_type", `$.${field}`);
    } else {
      typedStringValues[field] = descriptor.value;
    }
  }

  const validStringValues = Object.create(null);
  for (const field of ROOT_FIELDS) {
    if (!Object.hasOwn(typedStringValues, field)) {
      continue;
    }

    const value = typedStringValues[field];
    if (!stringMatchesRule(value, ROOT_STRING_RULES[field])) {
      addError(errors, "invalid_field_value", `$.${field}`);
    } else {
      validStringValues[field] = value;
    }
  }

  return {
    reviewerDescriptors,
    supportDescriptors,
    validStringValues,
  };
}

function validateReviewerAttribution(descriptors, errors) {
  addMissingFields(
    descriptors,
    REVIEWER_FIELDS,
    "$.reviewer_attribution",
    errors,
  );

  if (hasUnknownOwnKey(descriptors, REVIEWER_FIELDS)) {
    addError(errors, "unexpected_field", "$.reviewer_attribution");
  }

  const typedStringValues = Object.create(null);
  for (const field of REVIEWER_FIELDS) {
    if (!hasOwnDescriptor(descriptors, field)) {
      continue;
    }

    const descriptor = getDataDescriptor(descriptors, field);
    if (descriptor === null || typeof descriptor.value !== "string") {
      addError(
        errors,
        "invalid_field_type",
        `$.reviewer_attribution.${field}`,
      );
    } else {
      typedStringValues[field] = descriptor.value;
    }
  }

  for (const field of REVIEWER_FIELDS) {
    if (
      Object.hasOwn(typedStringValues, field) &&
      !stringMatchesRule(
        typedStringValues[field],
        REVIEWER_STRING_RULES[field],
      )
    ) {
      addError(
        errors,
        "invalid_field_value",
        `$.reviewer_attribution.${field}`,
      );
    }
  }
}

function prepareDecisionSupport(descriptors, errors) {
  addMissingFields(
    descriptors,
    REFERENCE_FIELDS,
    "$.decision_support",
    errors,
  );

  const referenceStates = Object.create(null);
  for (const field of REFERENCE_FIELDS) {
    if (!hasOwnDescriptor(descriptors, field)) {
      continue;
    }

    const descriptor = getDataDescriptor(descriptors, field);
    const state = descriptor === null ? null : snapshotArray(descriptor.value);
    if (state !== null) {
      referenceStates[field] = state;
    }
  }

  const hasUnknownKey =
    hasUnknownOwnKey(descriptors, REFERENCE_FIELDS) ||
    REFERENCE_FIELDS.some(
      (field) =>
        Object.hasOwn(referenceStates, field) &&
        hasUnknownArrayKey(referenceStates[field]),
    );
  if (hasUnknownKey) {
    addError(errors, "unexpected_field", "$.decision_support");
  }

  for (const field of REFERENCE_FIELDS) {
    if (
      hasOwnDescriptor(descriptors, field) &&
      !Object.hasOwn(referenceStates, field)
    ) {
      addError(
        errors,
        "invalid_field_type",
        `$.decision_support.${field}`,
      );
    }
  }

  return referenceStates;
}

function validateReferenceItems(referenceStates, errors) {
  for (const field of REFERENCE_FIELDS) {
    if (!Object.hasOwn(referenceStates, field)) {
      continue;
    }

    const state = referenceStates[field];
    for (let index = 0; index < state.length; index += 1) {
      const descriptor = getDataDescriptor(state.descriptors, String(index));
      const itemPath = `$.decision_support.${field}[${index}]`;

      if (descriptor === null || typeof descriptor.value !== "string") {
        state.allItemsValid = false;
        addError(errors, "invalid_field_type", itemPath);
        continue;
      }

      if (!REFERENCE_RULES[field].pattern.test(descriptor.value)) {
        state.allItemsValid = false;
        addError(errors, "invalid_field_value", itemPath);
        continue;
      }

      state.validReferences.push({
        index,
        value: descriptor.value,
      });
    }
  }
}

function validateLocalCardinality(referenceStates, errors) {
  const decisionBasisState = referenceStates.decision_basis_refs;
  if (decisionBasisState !== undefined && decisionBasisState.length === 0) {
    addError(
      errors,
      "invalid_field_value",
      "$.decision_support.decision_basis_refs",
    );
  }

  const priorApprovalState = referenceStates.prior_approval_refs;
  if (priorApprovalState !== undefined && priorApprovalState.length > 1) {
    addError(
      errors,
      "invalid_field_value",
      "$.decision_support.prior_approval_refs",
    );
  }
}

function validateCorrectionRequestRule(
  validDecision,
  referenceStates,
  errors,
) {
  if (validDecision === undefined) {
    return;
  }

  const correctionState = referenceStates.correction_request_refs;
  if (
    correctionState === undefined ||
    correctionState.allItemsValid !== true
  ) {
    return;
  }

  const invalidCount =
    validDecision === CORRECTION_REQUIRED_DECISION
      ? correctionState.length !== 1
      : correctionState.length !== 0;
  if (invalidCount) {
    addError(
      errors,
      "invalid_cross_field_combination",
      "$.decision_support.correction_request_refs",
    );
  }
}

function validateDuplicateReferences(referenceStates, errors) {
  for (const field of REFERENCE_FIELDS) {
    const references = referenceStates[field]?.validReferences ?? [];
    const seenReferences = new Set();

    for (const reference of references) {
      if (seenReferences.has(reference.value)) {
        addError(
          errors,
          "duplicate_reference",
          `$.decision_support.${field}[${reference.index}]`,
        );
      } else {
        seenReferences.add(reference.value);
      }
    }
  }
}

function validateHumanReviewControlledHandoffHumanProfessionalApproval(
  candidate,
) {
  const errors = [];
  const descriptors = snapshotPlainObject(candidate);

  if (descriptors === null) {
    addError(errors, "invalid_field_type", "$");
    return makeResult(errors);
  }

  const rootState = validateRoot(descriptors, errors);

  if (rootState.reviewerDescriptors !== null) {
    validateReviewerAttribution(rootState.reviewerDescriptors, errors);
  }

  let referenceStates = null;
  if (rootState.supportDescriptors !== null) {
    referenceStates = prepareDecisionSupport(
      rootState.supportDescriptors,
      errors,
    );
    validateReferenceItems(referenceStates, errors);
    validateLocalCardinality(referenceStates, errors);
    validateCorrectionRequestRule(
      rootState.validStringValues.decision,
      referenceStates,
      errors,
    );
    validateDuplicateReferences(referenceStates, errors);
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewControlledHandoffHumanProfessionalApproval,
};
