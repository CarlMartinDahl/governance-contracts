"use strict";

const candidateSchema = require("../../../schemas/human-review-controlled-handoff-brief.json");
const resultSchema = require("../../../schemas/human-review-controlled-handoff-brief-validator-result.json");

const ROOT_FIELDS = Object.freeze([...candidateSchema.required]);
const ROOT_STRING_FIELDS = Object.freeze(ROOT_FIELDS.slice(0, 4));
const COMPONENT_SCHEMA = candidateSchema.$defs.componentRefs;
const COMPONENT_FIELDS = Object.freeze([...COMPONENT_SCHEMA.required]);
const CONTRACT_ID = candidateSchema.properties.contract_id.const;
const CONTRACT_VERSION = candidateSchema.properties.contract_version.const;
const PACKET_REF_PATTERN = new RegExp(
  candidateSchema.properties.packet_ref.pattern,
  "u",
);
const HANDOFF_POSTURE = candidateSchema.properties.handoff_posture.const;
const COMPONENT_PATTERNS = Object.freeze(
  Object.fromEntries(
    COMPONENT_FIELDS.map((field) => [
      field,
      new RegExp(COMPONENT_SCHEMA.properties[field].pattern, "u"),
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

function addMissingFields(descriptors, fields, pathPrefix, errors) {
  for (const field of fields) {
    if (!hasOwnDescriptor(descriptors, field)) {
      addError(errors, "required_field_missing", `${pathPrefix}.${field}`);
    }
  }
}

function validateRootTypes(descriptors, errors) {
  for (const field of ROOT_STRING_FIELDS) {
    if (hasOwnDescriptor(descriptors, field) && !hasDataString(descriptors, field)) {
      addError(errors, "invalid_field_type", `$.${field}`);
    }
  }
}

function validateRootValues(descriptors, errors) {
  for (const [field, expectedValue] of [
    ["contract_id", CONTRACT_ID],
    ["contract_version", CONTRACT_VERSION],
  ]) {
    if (
      hasDataString(descriptors, field) &&
      descriptors[field].value !== expectedValue
    ) {
      addError(errors, "invalid_field_value", `$.${field}`);
    }
  }

  if (
    hasDataString(descriptors, "packet_ref") &&
    !PACKET_REF_PATTERN.test(descriptors.packet_ref.value)
  ) {
    addError(errors, "invalid_field_value", "$.packet_ref");
  }

  if (
    hasDataString(descriptors, "handoff_posture") &&
    descriptors.handoff_posture.value !== HANDOFF_POSTURE
  ) {
    addError(errors, "invalid_field_value", "$.handoff_posture");
  }
}

function validateComponentTypes(descriptors, errors) {
  for (const field of COMPONENT_FIELDS) {
    if (hasOwnDescriptor(descriptors, field) && !hasDataString(descriptors, field)) {
      addError(
        errors,
        "invalid_field_type",
        `$.component_refs.${field}`,
      );
    }
  }
}

function validateComponentValues(descriptors, errors) {
  for (const field of COMPONENT_FIELDS) {
    if (
      hasDataString(descriptors, field) &&
      !COMPONENT_PATTERNS[field].test(descriptors[field].value)
    ) {
      addError(
        errors,
        "invalid_field_value",
        `$.component_refs.${field}`,
      );
    }
  }
}

function validateDuplicateComponentReferences(descriptors, errors) {
  const seenReferences = new Set();

  for (const field of COMPONENT_FIELDS) {
    const descriptor = getDataDescriptor(descriptors, field);
    if (
      descriptor === null ||
      typeof descriptor.value !== "string" ||
      !COMPONENT_PATTERNS[field].test(descriptor.value)
    ) {
      continue;
    }

    if (seenReferences.has(descriptor.value)) {
      addError(
        errors,
        "duplicate_component_ref",
        `$.component_refs.${field}`,
      );
    } else {
      seenReferences.add(descriptor.value);
    }
  }
}

function validateComponentReferences(descriptors, errors) {
  addMissingFields(descriptors, COMPONENT_FIELDS, "$.component_refs", errors);

  if (hasUnknownOwnKey(descriptors, COMPONENT_FIELDS)) {
    addError(errors, "unexpected_field", "$.component_refs");
  }

  validateComponentTypes(descriptors, errors);
  validateComponentValues(descriptors, errors);
  validateDuplicateComponentReferences(descriptors, errors);
}

function validateHumanReviewControlledHandoffBrief(candidate) {
  const errors = [];
  const descriptors = snapshotPlainObject(candidate);

  if (descriptors === null) {
    addError(errors, "invalid_field_type", "$");
    return makeResult(errors);
  }

  addMissingFields(descriptors, ROOT_FIELDS, "$", errors);

  if (hasUnknownOwnKey(descriptors, ROOT_FIELDS)) {
    addError(errors, "unexpected_field", "$");
  }

  validateRootTypes(descriptors, errors);
  validateRootValues(descriptors, errors);

  if (hasOwnDescriptor(descriptors, "component_refs")) {
    const componentDescriptor = getDataDescriptor(descriptors, "component_refs");
    const componentDescriptors =
      componentDescriptor === null
        ? null
        : snapshotPlainObject(componentDescriptor.value);

    if (componentDescriptors === null) {
      addError(errors, "invalid_field_type", "$.component_refs");
    } else {
      validateComponentReferences(componentDescriptors, errors);
    }
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewControlledHandoffBrief,
};
