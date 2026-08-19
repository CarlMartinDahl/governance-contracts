"use strict";

const candidateSchema = require("../../../schemas/human-review-chronology.json");
const resultSchema = require("../../../schemas/human-review-chronology-validator-result.json");

const ROOT_FIELDS = Object.freeze([...candidateSchema.required]);
const ROOT_STRING_FIELDS = Object.freeze([
  "contract_id",
  "contract_version",
  "packet_ref",
]);
const ENTRY_SCHEMA = candidateSchema.$defs.chronologyEntry;
const ENTRY_FIELDS = Object.freeze([...ENTRY_SCHEMA.required]);
const CONTRACT_ID = candidateSchema.properties.contract_id.const;
const CONTRACT_VERSION = candidateSchema.properties.contract_version.const;
const PACKET_REF_PATTERN = new RegExp(
  candidateSchema.properties.packet_ref.pattern,
  "u",
);
const ENTRY_REF_PATTERN = new RegExp(
  ENTRY_SCHEMA.properties.entry_ref.pattern,
  "u",
);
const REVIEW_STATES = Object.freeze([
  ...ENTRY_SCHEMA.properties.review_state.enum,
]);
const TEMPORAL_STATES = Object.freeze([
  ...ENTRY_SCHEMA.properties.temporal_status.enum,
]);
const SOURCE_REF_PATTERN = new RegExp(
  ENTRY_SCHEMA.properties.source_refs.items.pattern,
  "u",
);
const SOURCE_REFS_MIN_ITEMS = ENTRY_SCHEMA.properties.source_refs.minItems;
const REVIEW_TEXT_MIN_LENGTH = ENTRY_SCHEMA.properties.review_text.minLength;
const DECLARED_TEMPORAL_RULE = ENTRY_SCHEMA.oneOf.find(
  (branch) => branch.properties.temporal_status.const === "DECLARED",
);
const UNKNOWN_TEMPORAL_RULE = ENTRY_SCHEMA.oneOf.find(
  (branch) => branch.properties.temporal_status.const === "UNKNOWN",
);
const DECLARED_TEMPORAL_STATUS =
  DECLARED_TEMPORAL_RULE.properties.temporal_status.const;
const UNKNOWN_TEMPORAL_STATUS =
  UNKNOWN_TEMPORAL_RULE.properties.temporal_status.const;
const DECLARED_TEMPORAL_MIN_LENGTH =
  DECLARED_TEMPORAL_RULE.properties.declared_temporal_text.minLength;
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

function hasMinimumCodePoints(value, minimum) {
  let count = 0;

  for (const _codePoint of value) {
    count += 1;
    if (count >= minimum) {
      return true;
    }
  }

  return minimum === 0;
}

function isValidText(value, minimum) {
  return value === value.trim() && hasMinimumCodePoints(value, minimum);
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

function hasExpectedEntryType(descriptors, field) {
  const descriptor = getDataDescriptor(descriptors, field);
  if (descriptor === null) {
    return false;
  }

  if (
    field === "entry_ref" ||
    field === "review_state" ||
    field === "temporal_status" ||
    field === "review_text"
  ) {
    return typeof descriptor.value === "string";
  }

  if (field === "declared_temporal_text") {
    return descriptor.value === null || typeof descriptor.value === "string";
  }

  return Array.isArray(descriptor.value);
}

function validateEntryTypes(descriptors, entryPath, errors) {
  for (const field of ENTRY_FIELDS) {
    if (
      hasOwnDescriptor(descriptors, field) &&
      !hasExpectedEntryType(descriptors, field)
    ) {
      addError(errors, "invalid_field_type", `${entryPath}.${field}`);
    }
  }
}

function validateEntryValues(descriptors, entryPath, errors) {
  if (
    hasDataString(descriptors, "entry_ref") &&
    !ENTRY_REF_PATTERN.test(descriptors.entry_ref.value)
  ) {
    addError(errors, "invalid_field_value", `${entryPath}.entry_ref`);
  }

  if (
    hasDataString(descriptors, "review_state") &&
    !REVIEW_STATES.includes(descriptors.review_state.value)
  ) {
    addError(errors, "invalid_field_value", `${entryPath}.review_state`);
  }

  if (
    hasDataString(descriptors, "temporal_status") &&
    !TEMPORAL_STATES.includes(descriptors.temporal_status.value)
  ) {
    addError(errors, "invalid_field_value", `${entryPath}.temporal_status`);
  }

  const temporalTextDescriptor = getDataDescriptor(
    descriptors,
    "declared_temporal_text",
  );
  if (
    temporalTextDescriptor !== null &&
    typeof temporalTextDescriptor.value === "string" &&
    !isValidText(
      temporalTextDescriptor.value,
      DECLARED_TEMPORAL_MIN_LENGTH,
    )
  ) {
    addError(
      errors,
      "invalid_field_value",
      `${entryPath}.declared_temporal_text`,
    );
  }

  if (
    hasDataString(descriptors, "review_text") &&
    !isValidText(descriptors.review_text.value, REVIEW_TEXT_MIN_LENGTH)
  ) {
    addError(errors, "invalid_field_value", `${entryPath}.review_text`);
  }
}

function validateTemporalCoupling(descriptors, entryPath, errors) {
  const statusDescriptor = getDataDescriptor(descriptors, "temporal_status");
  const textDescriptor = getDataDescriptor(
    descriptors,
    "declared_temporal_text",
  );

  if (
    statusDescriptor === null ||
    typeof statusDescriptor.value !== "string" ||
    textDescriptor === null ||
    (textDescriptor.value !== null && typeof textDescriptor.value !== "string")
  ) {
    return;
  }

  const isDeclaredPair =
    statusDescriptor.value === DECLARED_TEMPORAL_STATUS &&
    typeof textDescriptor.value === "string" &&
    isValidText(textDescriptor.value, DECLARED_TEMPORAL_MIN_LENGTH);
  const isUnknownPair =
    statusDescriptor.value === UNKNOWN_TEMPORAL_STATUS &&
    textDescriptor.value === null;

  if (!isDeclaredPair && !isUnknownPair) {
    addError(
      errors,
      "invalid_field_value",
      `${entryPath}.declared_temporal_text`,
    );
  }
}

function validateSourceReferences(sourceReferences, entryPath, errors) {
  const descriptors = Object.getOwnPropertyDescriptors(sourceReferences);
  const length = descriptors.length.value;
  const validReferences = [];

  if (length < SOURCE_REFS_MIN_ITEMS) {
    addError(errors, "invalid_field_value", `${entryPath}.source_refs`);
  }

  for (let index = 0; index < length; index += 1) {
    const descriptor = getDataDescriptor(descriptors, String(index));
    const itemPath = `${entryPath}.source_refs[${index}]`;

    if (descriptor === null || typeof descriptor.value !== "string") {
      addError(errors, "invalid_field_type", itemPath);
      continue;
    }

    if (!SOURCE_REF_PATTERN.test(descriptor.value)) {
      addError(errors, "invalid_field_value", itemPath);
      continue;
    }

    validReferences.push({
      index,
      value: descriptor.value,
    });
  }

  return validReferences;
}

function validateEntries(entries, errors) {
  const arrayDescriptors = Object.getOwnPropertyDescriptors(entries);
  const length = arrayDescriptors.length.value;
  const snapshots = [];

  for (let index = 0; index < length; index += 1) {
    const indexDescriptor = getDataDescriptor(arrayDescriptors, String(index));
    const entry = indexDescriptor === null ? undefined : indexDescriptor.value;
    const entryPath = `$.entries[${index}]`;

    if (!isPlainObject(entry)) {
      addError(errors, "invalid_field_type", entryPath);
      continue;
    }

    const descriptors = Object.getOwnPropertyDescriptors(entry);
    const snapshot = {
      index,
      descriptors,
      validSourceReferences: [],
    };
    snapshots.push(snapshot);

    for (const field of ENTRY_FIELDS) {
      if (!hasOwnDescriptor(descriptors, field)) {
        addError(errors, "required_field_missing", `${entryPath}.${field}`);
      }
    }

    if (hasUnknownOwnKey(descriptors, ENTRY_FIELDS)) {
      addError(errors, "unexpected_field", entryPath);
    }

    validateEntryTypes(descriptors, entryPath, errors);
    validateEntryValues(descriptors, entryPath, errors);
    validateTemporalCoupling(descriptors, entryPath, errors);

    const sourceReferencesDescriptor = getDataDescriptor(
      descriptors,
      "source_refs",
    );
    if (
      sourceReferencesDescriptor !== null &&
      Array.isArray(sourceReferencesDescriptor.value)
    ) {
      snapshot.validSourceReferences = validateSourceReferences(
        sourceReferencesDescriptor.value,
        entryPath,
        errors,
      );
    }
  }

  return snapshots;
}

function validateDuplicateEntryReferences(snapshots, errors) {
  const seenReferences = new Set();

  for (const snapshot of snapshots) {
    const descriptor = getDataDescriptor(snapshot.descriptors, "entry_ref");
    if (
      descriptor === null ||
      typeof descriptor.value !== "string" ||
      !ENTRY_REF_PATTERN.test(descriptor.value)
    ) {
      continue;
    }

    if (seenReferences.has(descriptor.value)) {
      addError(
        errors,
        "duplicate_entry_ref",
        `$.entries[${snapshot.index}].entry_ref`,
      );
    } else {
      seenReferences.add(descriptor.value);
    }
  }
}

function validateDuplicateSourceReferences(snapshots, errors) {
  for (const snapshot of snapshots) {
    const seenReferences = new Set();

    for (const sourceReference of snapshot.validSourceReferences) {
      if (seenReferences.has(sourceReference.value)) {
        addError(
          errors,
          "duplicate_source_ref",
          `$.entries[${snapshot.index}].source_refs[${sourceReference.index}]`,
        );
      } else {
        seenReferences.add(sourceReference.value);
      }
    }
  }
}

function validateHumanReviewChronology(candidate) {
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

  const entriesDescriptor = getDataDescriptor(descriptors, "entries");
  if (entriesDescriptor !== null && Array.isArray(entriesDescriptor.value)) {
    const snapshots = validateEntries(entriesDescriptor.value, errors);
    validateDuplicateEntryReferences(snapshots, errors);
    validateDuplicateSourceReferences(snapshots, errors);
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewChronology,
};
