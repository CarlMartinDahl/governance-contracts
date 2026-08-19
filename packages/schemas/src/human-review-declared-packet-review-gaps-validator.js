"use strict";

const candidateSchema = require("../../../schemas/human-review-declared-packet-review-gaps.json");
const resultSchema = require("../../../schemas/human-review-declared-packet-review-gaps-validator-result.json");

const ROOT_FIELDS = Object.freeze([...candidateSchema.required]);
const ROOT_STRING_FIELDS = Object.freeze([
  "contract_id",
  "contract_version",
  "packet_ref",
]);
const GAP_SCHEMA = candidateSchema.$defs.gapRow;
const GAP_FIELDS = Object.freeze([...GAP_SCHEMA.required]);
const GAP_STRING_FIELDS = Object.freeze([
  "gap_ref",
  "declaration_origin",
  "declared_gap_text",
]);
const REFERENCE_FIELDS = Object.freeze(
  GAP_FIELDS.filter((field) => GAP_SCHEMA.properties[field].type === "array"),
);
const CONTRACT_ID = candidateSchema.properties.contract_id.const;
const CONTRACT_VERSION = candidateSchema.properties.contract_version.const;
const PACKET_REF_PATTERN = new RegExp(
  candidateSchema.properties.packet_ref.pattern,
  "u",
);
const GAP_REF_PATTERN = new RegExp(
  GAP_SCHEMA.properties.gap_ref.pattern,
  "u",
);
const DECLARATION_ORIGIN = GAP_SCHEMA.properties.declaration_origin.const;
const DECLARED_TEXT_MIN_LENGTH =
  GAP_SCHEMA.properties.declared_gap_text.minLength;
const DECLARED_TEXT_MAX_LENGTH =
  GAP_SCHEMA.properties.declared_gap_text.maxLength;
const REFERENCE_RULES = Object.freeze(
  Object.fromEntries(
    REFERENCE_FIELDS.map((field) => [
      field,
      Object.freeze({
        pattern: new RegExp(GAP_SCHEMA.properties[field].items.pattern, "u"),
        duplicateCode: `duplicate_${
          field === "chronology_entry_refs" ? "chronology_entry_ref" : field.slice(0, -1)
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

function hasExpectedGapFieldType(descriptors, field) {
  const descriptor = getDataDescriptor(descriptors, field);
  if (descriptor === null) {
    return false;
  }

  return GAP_STRING_FIELDS.includes(field)
    ? typeof descriptor.value === "string"
    : isArray(descriptor.value);
}

function validateGapTypes(descriptors, gapPath, errors) {
  for (const field of GAP_FIELDS) {
    if (
      hasOwnDescriptor(descriptors, field) &&
      !hasExpectedGapFieldType(descriptors, field)
    ) {
      addError(errors, "invalid_field_type", `${gapPath}.${field}`);
    }
  }
}

function validateGapValues(descriptors, gapPath, errors) {
  if (
    hasDataString(descriptors, "gap_ref") &&
    !GAP_REF_PATTERN.test(descriptors.gap_ref.value)
  ) {
    addError(errors, "invalid_field_value", `${gapPath}.gap_ref`);
  }

  if (
    hasDataString(descriptors, "declaration_origin") &&
    descriptors.declaration_origin.value !== DECLARATION_ORIGIN
  ) {
    addError(
      errors,
      "invalid_field_value",
      `${gapPath}.declaration_origin`,
    );
  }

  if (
    hasDataString(descriptors, "declared_gap_text") &&
    !hasValidCodePointLength(
      descriptors.declared_gap_text.value,
      DECLARED_TEXT_MIN_LENGTH,
      DECLARED_TEXT_MAX_LENGTH,
    )
  ) {
    addError(errors, "invalid_field_value", `${gapPath}.declared_gap_text`);
  }
}

function validateGapRows(gaps, errors) {
  const arrayDescriptors = snapshotArray(gaps);
  if (arrayDescriptors === null) {
    addError(errors, "invalid_field_type", "$.gaps");
    return [];
  }

  const length = arrayDescriptors.length.value;
  const snapshots = [];

  for (let index = 0; index < length; index += 1) {
    const indexDescriptor = getDataDescriptor(arrayDescriptors, String(index));
    const gapPath = `$.gaps[${index}]`;

    if (indexDescriptor === null) {
      addError(errors, "invalid_field_type", gapPath);
      continue;
    }

    const descriptors = snapshotPlainObject(indexDescriptor.value);
    if (descriptors === null) {
      addError(errors, "invalid_field_type", gapPath);
      continue;
    }

    const snapshot = {
      index,
      descriptors,
      validReferences: Object.create(null),
    };
    snapshots.push(snapshot);

    for (const field of GAP_FIELDS) {
      if (!hasOwnDescriptor(descriptors, field)) {
        addError(errors, "required_field_missing", `${gapPath}.${field}`);
      }
    }

    if (hasUnknownOwnKey(descriptors, GAP_FIELDS)) {
      addError(errors, "unexpected_field", gapPath);
    }

    validateGapTypes(descriptors, gapPath, errors);
    validateGapValues(descriptors, gapPath, errors);
  }

  return snapshots;
}

function validateReferenceArray(
  references,
  gapPath,
  field,
  pattern,
  errors,
) {
  const descriptors = snapshotArray(references);
  if (descriptors === null) {
    addError(errors, "invalid_field_type", `${gapPath}.${field}`);
    return [];
  }

  const validReferences = [];
  const length = descriptors.length.value;

  for (let index = 0; index < length; index += 1) {
    const descriptor = getDataDescriptor(descriptors, String(index));
    const itemPath = `${gapPath}.${field}[${index}]`;

    if (descriptor === null || typeof descriptor.value !== "string") {
      addError(errors, "invalid_field_type", itemPath);
      continue;
    }

    if (!pattern.test(descriptor.value)) {
      addError(errors, "invalid_field_value", itemPath);
      continue;
    }

    validReferences.push({ index, value: descriptor.value });
  }

  return validReferences;
}

function validateReferenceItems(snapshots, errors) {
  for (const snapshot of snapshots) {
    const gapPath = `$.gaps[${snapshot.index}]`;

    for (const field of REFERENCE_FIELDS) {
      const descriptor = getDataDescriptor(snapshot.descriptors, field);
      if (descriptor === null || !isArray(descriptor.value)) {
        continue;
      }

      snapshot.validReferences[field] = validateReferenceArray(
        descriptor.value,
        gapPath,
        field,
        REFERENCE_RULES[field].pattern,
        errors,
      );
    }
  }
}

function validateDuplicateGapReferences(snapshots, errors) {
  const seenReferences = new Set();

  for (const snapshot of snapshots) {
    const descriptor = getDataDescriptor(snapshot.descriptors, "gap_ref");
    if (
      descriptor === null ||
      typeof descriptor.value !== "string" ||
      !GAP_REF_PATTERN.test(descriptor.value)
    ) {
      continue;
    }

    if (seenReferences.has(descriptor.value)) {
      addError(
        errors,
        "duplicate_gap_ref",
        `$.gaps[${snapshot.index}].gap_ref`,
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
      const references = snapshot.validReferences[field] ?? [];

      for (const reference of references) {
        if (seenReferences.has(reference.value)) {
          addError(
            errors,
            REFERENCE_RULES[field].duplicateCode,
            `$.gaps[${snapshot.index}].${field}[${reference.index}]`,
          );
        } else {
          seenReferences.add(reference.value);
        }
      }
    }
  }
}

function validateHumanReviewDeclaredPacketReviewGaps(candidate) {
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

  const gapsDescriptor = getDataDescriptor(descriptors, "gaps");
  if (gapsDescriptor !== null && isArray(gapsDescriptor.value)) {
    const snapshots = validateGapRows(gapsDescriptor.value, errors);
    validateReferenceItems(snapshots, errors);
    validateDuplicateGapReferences(snapshots, errors);
    validateDuplicateReferenceItems(snapshots, errors);
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewDeclaredPacketReviewGaps,
};
