"use strict";

const candidateSchema = require("../../../schemas/human-review-source-register.json");
const resultSchema = require("../../../schemas/human-review-source-register-validator-result.json");

const ROOT_FIELDS = Object.freeze([...candidateSchema.required]);
const ROOT_STRING_FIELDS = Object.freeze([
  "contract_id",
  "contract_version",
  "packet_ref",
]);
const SOURCE_ENTRY_SCHEMA = candidateSchema.$defs.sourceEntry;
const SOURCE_ENTRY_FIELDS = Object.freeze([...SOURCE_ENTRY_SCHEMA.required]);
const CONTRACT_ID = candidateSchema.properties.contract_id.const;
const CONTRACT_VERSION = candidateSchema.properties.contract_version.const;
const PACKET_REF_PATTERN = new RegExp(
  candidateSchema.properties.packet_ref.pattern,
  "u",
);
const SOURCE_REF_PATTERN = new RegExp(
  SOURCE_ENTRY_SCHEMA.properties.source_ref.pattern,
  "u",
);
const SOURCE_TYPES = Object.freeze([
  ...SOURCE_ENTRY_SCHEMA.properties.declared_source_type.enum,
]);
const LABEL_MIN_LENGTH =
  SOURCE_ENTRY_SCHEMA.properties.declared_label.minLength;
const LABEL_MAX_LENGTH =
  SOURCE_ENTRY_SCHEMA.properties.declared_label.maxLength;
const RESULT_CONTRACT_KIND = resultSchema.properties.contractKind.const;
const RESULT_VERSION = resultSchema.properties.version.const;

function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
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

function countCodePoints(value) {
  let count = 0;

  for (const _codePoint of value) {
    count += 1;
    if (count > LABEL_MAX_LENGTH) {
      break;
    }
  }

  return count;
}

function isValidLabel(value) {
  const length = countCodePoints(value);
  return (
    value === value.trim() &&
    length >= LABEL_MIN_LENGTH &&
    length <= LABEL_MAX_LENGTH
  );
}

function validateRootTypes(descriptors, errors) {
  for (const field of ROOT_FIELDS) {
    if (!hasOwnDescriptor(descriptors, field)) {
      continue;
    }

    const descriptor = getDataDescriptor(descriptors, field);
    const hasExpectedType = ROOT_STRING_FIELDS.includes(field)
      ? descriptor !== null && typeof descriptor.value === "string"
      : descriptor !== null && Array.isArray(descriptor.value);

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

function validateEntryTypes(descriptors, index, errors) {
  for (const field of SOURCE_ENTRY_FIELDS) {
    if (
      hasOwnDescriptor(descriptors, field) &&
      !hasDataString(descriptors, field)
    ) {
      addError(
        errors,
        "invalid_field_type",
        `$.sources[${index}].${field}`,
      );
    }
  }
}

function validateEntryValues(descriptors, index, errors) {
  if (
    hasDataString(descriptors, "source_ref") &&
    !SOURCE_REF_PATTERN.test(descriptors.source_ref.value)
  ) {
    addError(
      errors,
      "invalid_field_value",
      `$.sources[${index}].source_ref`,
    );
  }

  if (
    hasDataString(descriptors, "declared_source_type") &&
    !SOURCE_TYPES.includes(descriptors.declared_source_type.value)
  ) {
    addError(
      errors,
      "invalid_field_value",
      `$.sources[${index}].declared_source_type`,
    );
  }

  if (
    hasDataString(descriptors, "declared_label") &&
    !isValidLabel(descriptors.declared_label.value)
  ) {
    addError(
      errors,
      "invalid_field_value",
      `$.sources[${index}].declared_label`,
    );
  }
}

function collectSourceReference(descriptors, index, sourceReferences) {
  if (
    hasDataString(descriptors, "source_ref") &&
    SOURCE_REF_PATTERN.test(descriptors.source_ref.value)
  ) {
    sourceReferences.push({
      index,
      value: descriptors.source_ref.value,
    });
  }
}

function validateSources(sources, errors) {
  const arrayDescriptors = Object.getOwnPropertyDescriptors(sources);
  const sourceReferences = [];
  const length = arrayDescriptors.length.value;

  for (let index = 0; index < length; index += 1) {
    const indexDescriptor = getDataDescriptor(arrayDescriptors, String(index));
    const entry = indexDescriptor === null ? undefined : indexDescriptor.value;
    const entryPath = `$.sources[${index}]`;

    if (!isPlainObject(entry)) {
      addError(errors, "invalid_field_type", entryPath);
      continue;
    }

    const descriptors = Object.getOwnPropertyDescriptors(entry);

    for (const field of SOURCE_ENTRY_FIELDS) {
      if (!hasOwnDescriptor(descriptors, field)) {
        addError(errors, "required_field_missing", `${entryPath}.${field}`);
      }
    }

    if (hasUnknownOwnKey(descriptors, SOURCE_ENTRY_FIELDS)) {
      addError(errors, "unexpected_field", entryPath);
    }

    validateEntryTypes(descriptors, index, errors);
    validateEntryValues(descriptors, index, errors);
    collectSourceReference(descriptors, index, sourceReferences);
  }

  const seenReferences = new Set();
  for (const sourceReference of sourceReferences) {
    if (seenReferences.has(sourceReference.value)) {
      addError(
        errors,
        "duplicate_source_ref",
        `$.sources[${sourceReference.index}].source_ref`,
      );
    } else {
      seenReferences.add(sourceReference.value);
    }
  }
}

function validateHumanReviewSourceRegister(candidate) {
  const errors = [];

  if (!isPlainObject(candidate)) {
    addError(errors, "invalid_field_type", "$");
    return makeResult(errors);
  }

  const descriptors = Object.getOwnPropertyDescriptors(candidate);

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

  const sourcesDescriptor = getDataDescriptor(descriptors, "sources");
  if (sourcesDescriptor !== null && Array.isArray(sourcesDescriptor.value)) {
    validateSources(sourcesDescriptor.value, errors);
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewSourceRegister,
};
