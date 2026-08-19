"use strict";

const candidateSchema = require("../../../schemas/human-review-questions.json");
const resultSchema = require("../../../schemas/human-review-questions-validator-result.json");

const ROOT_FIELDS = Object.freeze([...candidateSchema.required]);
const ROOT_STRING_FIELDS = Object.freeze([
  "contract_id",
  "contract_version",
  "packet_ref",
]);
const QUESTION_SCHEMA = candidateSchema.$defs.questionRow;
const QUESTION_FIELDS = Object.freeze([...QUESTION_SCHEMA.required]);
const QUESTION_STRING_FIELDS = Object.freeze([
  "question_ref",
  "declaration_origin",
  "declared_question_text",
]);
const REFERENCE_FIELDS = Object.freeze(
  QUESTION_FIELDS.filter(
    (field) => QUESTION_SCHEMA.properties[field].type === "array",
  ),
);
const CONTRACT_ID = candidateSchema.properties.contract_id.const;
const CONTRACT_VERSION = candidateSchema.properties.contract_version.const;
const PACKET_REF_PATTERN = new RegExp(
  candidateSchema.properties.packet_ref.pattern,
  "u",
);
const QUESTION_REF_PATTERN = new RegExp(
  QUESTION_SCHEMA.properties.question_ref.pattern,
  "u",
);
const DECLARATION_ORIGIN =
  QUESTION_SCHEMA.properties.declaration_origin.const;
const DECLARED_TEXT_MIN_LENGTH =
  QUESTION_SCHEMA.properties.declared_question_text.minLength;
const DECLARED_TEXT_MAX_LENGTH =
  QUESTION_SCHEMA.properties.declared_question_text.maxLength;
const REFERENCE_RULES = Object.freeze(
  Object.fromEntries(
    REFERENCE_FIELDS.map((field) => [
      field,
      Object.freeze({
        pattern: new RegExp(
          QUESTION_SCHEMA.properties[field].items.pattern,
          "u",
        ),
        duplicateCode: `duplicate_${
          field === "chronology_entry_refs"
            ? "chronology_entry_ref"
            : field.slice(0, -1)
        }`,
      }),
    ]),
  ),
);
const RESULT_CONTRACT_KIND = resultSchema.properties.contractKind.const;
const RESULT_VERSION = resultSchema.properties.version.const;

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

    return descriptors;
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

function hasDataString(descriptors, field) {
  const descriptor = getDataDescriptor(descriptors, field);
  return descriptor !== null && typeof descriptor.value === "string";
}

function hasUnknownOwnKey(descriptors, allowedFields) {
  return Reflect.ownKeys(descriptors).some(
    (key) => typeof key !== "string" || !allowedFields.includes(key),
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

function hasValidCodePointLength(value, minimum, maximum) {
  let count = 0;

  for (const _codePoint of value) {
    count += 1;
    if (count > maximum) {
      return false;
    }
  }

  return count >= minimum;
}

function validateRootTypes(descriptors, errors) {
  for (const field of ROOT_FIELDS) {
    if (!hasOwnDescriptor(descriptors, field)) {
      continue;
    }

    const descriptor = getDataDescriptor(descriptors, field);
    const hasExpectedType = ROOT_STRING_FIELDS.includes(field)
      ? descriptor !== null && typeof descriptor.value === "string"
      : descriptor !== null && isArray(descriptor.value);

    if (!hasExpectedType) {
      addError(errors, "invalid_field_type", `$.${field}`);
    }
  }
}

function validateRootValues(descriptors, errors) {
  if (
    hasDataString(descriptors, "contract_id") &&
    descriptors.contract_id.value !== CONTRACT_ID
  ) {
    addError(errors, "invalid_field_value", "$.contract_id");
  }

  if (
    hasDataString(descriptors, "contract_version") &&
    descriptors.contract_version.value !== CONTRACT_VERSION
  ) {
    addError(errors, "invalid_field_value", "$.contract_version");
  }

  if (
    hasDataString(descriptors, "packet_ref") &&
    !PACKET_REF_PATTERN.test(descriptors.packet_ref.value)
  ) {
    addError(errors, "invalid_field_value", "$.packet_ref");
  }
}

function hasExpectedQuestionFieldType(descriptors, field) {
  const descriptor = getDataDescriptor(descriptors, field);
  if (descriptor === null) {
    return false;
  }

  return QUESTION_STRING_FIELDS.includes(field)
    ? typeof descriptor.value === "string"
    : isArray(descriptor.value);
}

function validateQuestionTypes(descriptors, questionPath, errors) {
  for (const field of QUESTION_FIELDS) {
    if (
      hasOwnDescriptor(descriptors, field) &&
      !hasExpectedQuestionFieldType(descriptors, field)
    ) {
      addError(errors, "invalid_field_type", `${questionPath}.${field}`);
    }
  }
}

function validateQuestionValues(descriptors, questionPath, errors) {
  if (
    hasDataString(descriptors, "question_ref") &&
    !QUESTION_REF_PATTERN.test(descriptors.question_ref.value)
  ) {
    addError(errors, "invalid_field_value", `${questionPath}.question_ref`);
  }

  if (
    hasDataString(descriptors, "declaration_origin") &&
    descriptors.declaration_origin.value !== DECLARATION_ORIGIN
  ) {
    addError(
      errors,
      "invalid_field_value",
      `${questionPath}.declaration_origin`,
    );
  }

  if (hasDataString(descriptors, "declared_question_text")) {
    const value = descriptors.declared_question_text.value;
    if (
      !hasValidCodePointLength(
        value,
        DECLARED_TEXT_MIN_LENGTH,
        DECLARED_TEXT_MAX_LENGTH,
      ) ||
      value.trim() !== value
    ) {
      addError(
        errors,
        "invalid_field_value",
        `${questionPath}.declared_question_text`,
      );
    }
  }
}

function validateQuestionRows(questions, errors) {
  const arrayDescriptors = snapshotArray(questions);
  if (arrayDescriptors === null) {
    addError(errors, "invalid_field_type", "$.questions");
    return [];
  }

  const length = arrayDescriptors.length.value;
  const snapshots = [];

  for (let index = 0; index < length; index += 1) {
    const indexDescriptor = getDataDescriptor(arrayDescriptors, String(index));
    const questionPath = `$.questions[${index}]`;

    if (indexDescriptor === null) {
      addError(errors, "invalid_field_type", questionPath);
      continue;
    }

    const descriptors = snapshotPlainObject(indexDescriptor.value);
    if (descriptors === null) {
      addError(errors, "invalid_field_type", questionPath);
      continue;
    }

    const snapshot = {
      index,
      descriptors,
      referenceStates: Object.create(null),
    };
    snapshots.push(snapshot);

    for (const field of QUESTION_FIELDS) {
      if (!hasOwnDescriptor(descriptors, field)) {
        addError(errors, "required_field_missing", `${questionPath}.${field}`);
      }
    }

    if (hasUnknownOwnKey(descriptors, QUESTION_FIELDS)) {
      addError(errors, "unexpected_field", questionPath);
    }

    validateQuestionTypes(descriptors, questionPath, errors);
    validateQuestionValues(descriptors, questionPath, errors);
  }

  return snapshots;
}

function validateReferenceArray(
  references,
  questionPath,
  field,
  pattern,
  errors,
) {
  const descriptors = snapshotArray(references);
  if (descriptors === null) {
    addError(errors, "invalid_field_type", `${questionPath}.${field}`);
    return {
      structurallyValid: false,
      itemCount: 0,
      validReferences: [],
    };
  }

  const validReferences = [];
  const length = descriptors.length.value;
  let structurallyValid = true;

  for (let index = 0; index < length; index += 1) {
    const descriptor = getDataDescriptor(descriptors, String(index));
    const itemPath = `${questionPath}.${field}[${index}]`;

    if (descriptor === null || typeof descriptor.value !== "string") {
      structurallyValid = false;
      addError(errors, "invalid_field_type", itemPath);
      continue;
    }

    if (!pattern.test(descriptor.value)) {
      structurallyValid = false;
      addError(errors, "invalid_field_value", itemPath);
      continue;
    }

    validReferences.push({ index, value: descriptor.value });
  }

  return {
    structurallyValid,
    itemCount: length,
    validReferences,
  };
}

function validateReferenceItems(snapshots, errors) {
  for (const snapshot of snapshots) {
    const questionPath = `$.questions[${snapshot.index}]`;

    for (const field of REFERENCE_FIELDS) {
      const descriptor = getDataDescriptor(snapshot.descriptors, field);
      if (descriptor === null || !isArray(descriptor.value)) {
        continue;
      }

      snapshot.referenceStates[field] = validateReferenceArray(
        descriptor.value,
        questionPath,
        field,
        REFERENCE_RULES[field].pattern,
        errors,
      );
    }
  }
}

function validateQuestionReferenceCardinality(snapshots, errors) {
  for (const snapshot of snapshots) {
    const states = REFERENCE_FIELDS.map(
      (field) => snapshot.referenceStates[field],
    );
    if (
      states.every(
        (state) => state !== undefined && state.structurallyValid === true,
      ) &&
      states.every((state) => state.itemCount === 0)
    ) {
      addError(
        errors,
        "question_reference_required",
        `$.questions[${snapshot.index}]`,
      );
    }
  }
}

function validateDuplicateQuestionReferences(snapshots, errors) {
  const seenReferences = new Set();

  for (const snapshot of snapshots) {
    const descriptor = getDataDescriptor(snapshot.descriptors, "question_ref");
    if (
      descriptor === null ||
      typeof descriptor.value !== "string" ||
      !QUESTION_REF_PATTERN.test(descriptor.value)
    ) {
      continue;
    }

    if (seenReferences.has(descriptor.value)) {
      addError(
        errors,
        "duplicate_question_ref",
        `$.questions[${snapshot.index}].question_ref`,
      );
    } else {
      seenReferences.add(descriptor.value);
    }
  }
}

function validateDuplicateReferenceItems(snapshots, errors) {
  for (const snapshot of snapshots) {
    for (const field of REFERENCE_FIELDS) {
      const seenReferences = new Set();
      const references =
        snapshot.referenceStates[field]?.validReferences ?? [];

      for (const reference of references) {
        if (seenReferences.has(reference.value)) {
          addError(
            errors,
            REFERENCE_RULES[field].duplicateCode,
            `$.questions[${snapshot.index}].${field}[${reference.index}]`,
          );
        } else {
          seenReferences.add(reference.value);
        }
      }
    }
  }
}

function validateHumanReviewQuestions(candidate) {
  const errors = [];
  const descriptors = snapshotPlainObject(candidate);

  if (descriptors === null) {
    addError(errors, "invalid_field_type", "$");
    return makeResult(errors);
  }

  for (const field of ROOT_FIELDS) {
    if (!hasOwnDescriptor(descriptors, field)) {
      addError(errors, "required_field_missing", `$.${field}`);
    }
  }

  if (hasUnknownOwnKey(descriptors, ROOT_FIELDS)) {
    addError(errors, "unexpected_field", "$");
  }

  validateRootTypes(descriptors, errors);
  validateRootValues(descriptors, errors);

  const questionsDescriptor = getDataDescriptor(descriptors, "questions");
  if (questionsDescriptor !== null && isArray(questionsDescriptor.value)) {
    const snapshots = validateQuestionRows(questionsDescriptor.value, errors);
    validateReferenceItems(snapshots, errors);
    validateQuestionReferenceCardinality(snapshots, errors);
    validateDuplicateQuestionReferences(snapshots, errors);
    validateDuplicateReferenceItems(snapshots, errors);
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewQuestions,
};
