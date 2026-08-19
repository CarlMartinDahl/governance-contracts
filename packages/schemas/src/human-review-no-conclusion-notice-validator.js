"use strict";

const candidateSchema = require("../../../schemas/human-review-no-conclusion-notice.json");
const resultSchema = require("../../../schemas/human-review-no-conclusion-notice-validator-result.json");

const ROOT_FIELDS = Object.freeze([...candidateSchema.required]);
const ROOT_STRING_FIELDS = Object.freeze([
  "contract_id",
  "contract_version",
  "packet_ref",
]);
const NOTICE_SCHEMA = candidateSchema.$defs.noticeRow;
const NOTICE_FIELDS = Object.freeze([...NOTICE_SCHEMA.required]);
const NOTICE_STRING_FIELDS = Object.freeze([
  "notice_ref",
  "declaration_origin",
  "notice_code",
  "notice_text",
]);
const REFERENCE_FIELDS = Object.freeze(
  NOTICE_FIELDS.filter((field) => NOTICE_SCHEMA.properties[field].type === "array"),
);
const CONTRACT_ID = candidateSchema.properties.contract_id.const;
const CONTRACT_VERSION = candidateSchema.properties.contract_version.const;
const PACKET_REF_PATTERN = new RegExp(
  candidateSchema.properties.packet_ref.pattern,
  "u",
);
const NOTICES_MIN_ITEMS = candidateSchema.properties.notices.minItems;
const NOTICE_REF_PATTERN = new RegExp(
  NOTICE_SCHEMA.properties.notice_ref.pattern,
  "u",
);
const DECLARATION_ORIGIN = NOTICE_SCHEMA.properties.declaration_origin.const;
const NOTICE_CODE = NOTICE_SCHEMA.properties.notice_code.const;
const NOTICE_TEXT = NOTICE_SCHEMA.properties.notice_text.const;
const REFERENCE_RULES = Object.freeze(
  Object.fromEntries(
    REFERENCE_FIELDS.map((field) => [
      field,
      Object.freeze({
        pattern: new RegExp(NOTICE_SCHEMA.properties[field].items.pattern, "u"),
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

function validateRootValues(descriptors, noticesDescriptors, errors) {
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

  if (
    noticesDescriptors !== null &&
    noticesDescriptors.length.value < NOTICES_MIN_ITEMS
  ) {
    addError(errors, "invalid_field_value", "$.notices");
  }
}

function hasExpectedNoticeFieldType(descriptors, field) {
  const descriptor = getDataDescriptor(descriptors, field);
  if (descriptor === null) {
    return false;
  }

  return NOTICE_STRING_FIELDS.includes(field)
    ? typeof descriptor.value === "string"
    : isArray(descriptor.value);
}

function validateNoticeTypes(descriptors, noticePath, errors) {
  for (const field of NOTICE_FIELDS) {
    if (
      hasOwnDescriptor(descriptors, field) &&
      !hasExpectedNoticeFieldType(descriptors, field)
    ) {
      addError(errors, "invalid_field_type", `${noticePath}.${field}`);
    }
  }
}

function validateNoticeValues(descriptors, noticePath, errors) {
  if (
    hasDataString(descriptors, "notice_ref") &&
    !NOTICE_REF_PATTERN.test(descriptors.notice_ref.value)
  ) {
    addError(errors, "invalid_field_value", `${noticePath}.notice_ref`);
  }

  for (const [field, expectedValue] of [
    ["declaration_origin", DECLARATION_ORIGIN],
    ["notice_code", NOTICE_CODE],
    ["notice_text", NOTICE_TEXT],
  ]) {
    if (
      hasDataString(descriptors, field) &&
      descriptors[field].value !== expectedValue
    ) {
      addError(errors, "invalid_field_value", `${noticePath}.${field}`);
    }
  }
}

function validateNoticeRows(arrayDescriptors, errors) {
  const length = arrayDescriptors.length.value;
  const snapshots = [];

  for (let index = 0; index < length; index += 1) {
    const indexDescriptor = getDataDescriptor(arrayDescriptors, String(index));
    const noticePath = `$.notices[${index}]`;

    if (indexDescriptor === null) {
      addError(errors, "invalid_field_type", noticePath);
      continue;
    }

    const descriptors = snapshotPlainObject(indexDescriptor.value);
    if (descriptors === null) {
      addError(errors, "invalid_field_type", noticePath);
      continue;
    }

    const snapshot = {
      index,
      descriptors,
      referenceStates: Object.create(null),
    };
    snapshots.push(snapshot);

    for (const field of NOTICE_FIELDS) {
      if (!hasOwnDescriptor(descriptors, field)) {
        addError(errors, "required_field_missing", `${noticePath}.${field}`);
      }
    }

    if (hasUnknownOwnKey(descriptors, NOTICE_FIELDS)) {
      addError(errors, "unexpected_field", noticePath);
    }

    validateNoticeTypes(descriptors, noticePath, errors);
    validateNoticeValues(descriptors, noticePath, errors);
  }

  return snapshots;
}

function validateReferenceArray(
  references,
  noticePath,
  field,
  pattern,
  errors,
) {
  const descriptors = snapshotArray(references);
  if (descriptors === null) {
    addError(errors, "invalid_field_type", `${noticePath}.${field}`);
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
    const itemPath = `${noticePath}.${field}[${index}]`;

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
    const noticePath = `$.notices[${snapshot.index}]`;

    for (const field of REFERENCE_FIELDS) {
      const descriptor = getDataDescriptor(snapshot.descriptors, field);
      if (descriptor === null || !isArray(descriptor.value)) {
        continue;
      }

      snapshot.referenceStates[field] = validateReferenceArray(
        descriptor.value,
        noticePath,
        field,
        REFERENCE_RULES[field].pattern,
        errors,
      );
    }
  }
}

function validateNoticeReferenceCardinality(snapshots, errors) {
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
        "notice_reference_required",
        `$.notices[${snapshot.index}]`,
      );
    }
  }
}

function validateDuplicateNoticeReferences(snapshots, errors) {
  const seenReferences = new Set();

  for (const snapshot of snapshots) {
    const descriptor = getDataDescriptor(snapshot.descriptors, "notice_ref");
    if (
      descriptor === null ||
      typeof descriptor.value !== "string" ||
      !NOTICE_REF_PATTERN.test(descriptor.value)
    ) {
      continue;
    }

    if (seenReferences.has(descriptor.value)) {
      addError(
        errors,
        "duplicate_notice_ref",
        `$.notices[${snapshot.index}].notice_ref`,
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
            `$.notices[${snapshot.index}].${field}[${reference.index}]`,
          );
        } else {
          seenReferences.add(reference.value);
        }
      }
    }
  }
}

function validateHumanReviewNoConclusionNotice(candidate) {
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

  const noticesDescriptor = getDataDescriptor(descriptors, "notices");
  const noticesDescriptors =
    noticesDescriptor !== null && isArray(noticesDescriptor.value)
      ? snapshotArray(noticesDescriptor.value)
      : null;
  validateRootValues(descriptors, noticesDescriptors, errors);

  if (noticesDescriptor !== null && isArray(noticesDescriptor.value)) {
    if (noticesDescriptors === null) {
      addError(errors, "invalid_field_type", "$.notices");
    } else {
      const snapshots = validateNoticeRows(noticesDescriptors, errors);
      validateReferenceItems(snapshots, errors);
      validateNoticeReferenceCardinality(snapshots, errors);
      validateDuplicateNoticeReferences(snapshots, errors);
      validateDuplicateReferenceItems(snapshots, errors);
    }
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewNoConclusionNotice,
};
