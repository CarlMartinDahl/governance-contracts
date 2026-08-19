"use strict";

const candidateSchema = require("../../../schemas/controlled-synthetic-red-team-result-envelope.json");
const resultSchema = require("../../../schemas/controlled-synthetic-red-team-result-envelope-validator-result.json");

const REQUIRED_FIELDS = Object.freeze([...candidateSchema.required]);
const STRING_FIELDS = Object.freeze(REQUIRED_FIELDS.slice(0, 9));
const ROW_FIELDS = Object.freeze([
  "outputType",
  "actionClass",
  "escalationTarget",
  "safeNextAction",
]);
const ROW_SOURCE_FIELDS = Object.freeze(["caseId", ...ROW_FIELDS]);
const FIXED_STRING_FIELDS = Object.freeze([
  "contractVersion",
  "contractKind",
  "syntheticCorpusPosture",
  "realEvidencePosture",
]);

const CASE_ROWS = Object.freeze(
  candidateSchema.oneOf.map((branch) =>
    Object.freeze(
      Object.fromEntries(
        ROW_SOURCE_FIELDS.map((field) => [
          field,
          branch.properties[field].const,
        ]),
      ),
    ),
  ),
);
const CASE_IDS = Object.freeze(CASE_ROWS.map((row) => row.caseId));
const ALLOWED_ROW_VALUES = Object.freeze(
  Object.fromEntries(
    ROW_FIELDS.map((field) => [
      field,
      Object.freeze([...new Set(CASE_ROWS.map((row) => row[field]))]),
    ]),
  ),
);
const FIXED_STRING_VALUES = Object.freeze(
  Object.fromEntries(
    FIXED_STRING_FIELDS.map((field) => [
      field,
      candidateSchema.properties[field].const,
    ]),
  ),
);
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

function hasDataString(descriptors, field) {
  const descriptor = descriptors[field];
  return (
    descriptor &&
    Object.prototype.hasOwnProperty.call(descriptor, "value") &&
    typeof descriptor.value === "string"
  );
}

function hasDataBoolean(descriptors, field) {
  const descriptor = descriptors[field];
  return (
    descriptor &&
    Object.prototype.hasOwnProperty.call(descriptor, "value") &&
    typeof descriptor.value === "boolean"
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

function hasUnknownOwnKey(descriptors) {
  return Reflect.ownKeys(descriptors).some(
    (key) => typeof key !== "string" || !REQUIRED_FIELDS.includes(key),
  );
}

function findCanonicalRow(descriptors) {
  if (!hasDataString(descriptors, "caseId")) {
    return null;
  }

  const caseId = descriptors.caseId.value;
  return CASE_ROWS.find((row) => row.caseId === caseId) ?? null;
}

function validateControlledSyntheticRedTeamResultEnvelope(candidate) {
  const errors = [];

  if (!isPlainObject(candidate)) {
    addError(errors, "INVALID_TYPE", "$");
    return makeResult(errors);
  }

  const descriptors = Object.getOwnPropertyDescriptors(candidate);

  for (const field of REQUIRED_FIELDS) {
    if (!hasOwnDescriptor(descriptors, field)) {
      addError(errors, "MISSING_FIELD", `$.${field}`);
    }
  }

  if (hasUnknownOwnKey(descriptors)) {
    addError(errors, "UNKNOWN_FIELD", "$");
  }

  for (const field of REQUIRED_FIELDS) {
    if (!hasOwnDescriptor(descriptors, field)) {
      continue;
    }

    if (field === "humanProfessionalReviewRequired") {
      if (!hasDataBoolean(descriptors, field)) {
        addError(errors, "INVALID_BOOLEAN", `$.${field}`);
      }
      continue;
    }

    if (!hasDataString(descriptors, field)) {
      addError(errors, "INVALID_TYPE", `$.${field}`);
    }
  }

  const canonicalRow = findCanonicalRow(descriptors);

  for (const field of REQUIRED_FIELDS) {
    if (FIXED_STRING_FIELDS.includes(field)) {
      if (
        hasDataString(descriptors, field) &&
        descriptors[field].value !== FIXED_STRING_VALUES[field]
      ) {
        addError(errors, "INVALID_ENUM", `$.${field}`);
      }
      continue;
    }

    if (field === "caseId") {
      if (
        hasDataString(descriptors, field) &&
        !CASE_IDS.includes(descriptors[field].value)
      ) {
        addError(errors, "INVALID_ENUM", `$.${field}`);
      }
      continue;
    }

    if (ROW_FIELDS.includes(field)) {
      if (!hasDataString(descriptors, field)) {
        continue;
      }

      const value = descriptors[field].value;
      if (
        !ALLOWED_ROW_VALUES[field].includes(value) ||
        (canonicalRow && value !== canonicalRow[field])
      ) {
        addError(errors, "INVALID_ENUM", `$.${field}`);
      }
      continue;
    }

    if (
      field === "humanProfessionalReviewRequired" &&
      hasDataBoolean(descriptors, field) &&
      descriptors[field].value !== true
    ) {
      addError(errors, "INVALID_BOOLEAN", `$.${field}`);
    }
  }

  return makeResult(errors);
}

module.exports = {
  validateControlledSyntheticRedTeamResultEnvelope,
};
