"use strict";

const candidateSchema = require("../../../schemas/human-review-asserted-claim-matrix.json");
const resultSchema = require("../../../schemas/human-review-asserted-claim-matrix-validator-result.json");

const ROOT_FIELDS = Object.freeze([...candidateSchema.required]);
const ROOT_STRING_FIELDS = Object.freeze([
  "contract_id",
  "contract_version",
  "packet_ref",
]);
const CLAIM_SCHEMA = candidateSchema.$defs.claimRow;
const CLAIM_FIELDS = Object.freeze([...CLAIM_SCHEMA.required]);
const CLAIM_STRING_FIELDS = Object.freeze([
  "claim_ref",
  "review_state",
  "asserted_claim_text",
]);
const CONTRACT_ID = candidateSchema.properties.contract_id.const;
const CONTRACT_VERSION = candidateSchema.properties.contract_version.const;
const PACKET_REF_PATTERN = new RegExp(
  candidateSchema.properties.packet_ref.pattern,
  "u",
);
const CLAIM_REF_PATTERN = new RegExp(
  CLAIM_SCHEMA.properties.claim_ref.pattern,
  "u",
);
const REVIEW_STATES = Object.freeze([
  ...CLAIM_SCHEMA.properties.review_state.enum,
]);
const ASSERTED_CLAIM_TEXT_MIN_LENGTH =
  CLAIM_SCHEMA.properties.asserted_claim_text.minLength;
const SOURCE_REF_SCHEMA = CLAIM_SCHEMA.properties.source_refs;
const SOURCE_REF_PATTERN = new RegExp(SOURCE_REF_SCHEMA.items.pattern, "u");
const SOURCE_REF_MIN_ITEMS = SOURCE_REF_SCHEMA.minItems;
const CHRONOLOGY_REF_SCHEMA = CLAIM_SCHEMA.properties.chronology_entry_refs;
const CHRONOLOGY_REF_PATTERN = new RegExp(
  CHRONOLOGY_REF_SCHEMA.items.pattern,
  "u",
);
const CHRONOLOGY_REF_MIN_ITEMS = CHRONOLOGY_REF_SCHEMA.minItems;
const RESULT_CONTRACT_KIND = resultSchema.properties.contractKind.const;
const RESULT_VERSION = resultSchema.properties.version.const;

function findStringRule(rule) {
  if (rule.type === "string") {
    return rule;
  }

  if (Array.isArray(rule.oneOf)) {
    return rule.oneOf.find((branch) => branch.type === "string") ?? null;
  }

  return null;
}

function allowsNull(rule) {
  if (Object.hasOwn(rule, "const") && rule.const === null) {
    return true;
  }

  return (
    Array.isArray(rule.oneOf) &&
    rule.oneOf.some(
      (branch) => Object.hasOwn(branch, "const") && branch.const === null,
    )
  );
}

const OBSERVATION_COUPLING_RULES = Object.freeze(
  CLAIM_SCHEMA.oneOf.map((branch) => {
    const observationRule = branch.properties.supplied_material_observation_text;
    const stringRule = findStringRule(observationRule);

    return Object.freeze({
      reviewState: branch.properties.review_state.const,
      allowsNull: allowsNull(observationRule),
      allowsString: stringRule !== null,
      stringMinLength: stringRule?.minLength ?? 0,
    });
  }),
);
const OBSERVATION_TEXT_MIN_LENGTH = Math.max(
  ...OBSERVATION_COUPLING_RULES.filter((rule) => rule.allowsString).map(
    (rule) => rule.stringMinLength,
  ),
);

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

function hasExpectedClaimFieldType(descriptors, field) {
  const descriptor = getDataDescriptor(descriptors, field);
  if (descriptor === null) {
    return false;
  }

  if (CLAIM_STRING_FIELDS.includes(field)) {
    return typeof descriptor.value === "string";
  }

  if (field === "supplied_material_observation_text") {
    return descriptor.value === null || typeof descriptor.value === "string";
  }

  return Array.isArray(descriptor.value);
}

function validateClaimTypes(descriptors, claimPath, errors) {
  for (const field of CLAIM_FIELDS) {
    if (
      hasOwnDescriptor(descriptors, field) &&
      !hasExpectedClaimFieldType(descriptors, field)
    ) {
      addError(errors, "invalid_field_type", `${claimPath}.${field}`);
    }
  }
}

function validateClaimValues(descriptors, claimPath, errors) {
  if (
    hasDataString(descriptors, "claim_ref") &&
    !CLAIM_REF_PATTERN.test(descriptors.claim_ref.value)
  ) {
    addError(errors, "invalid_field_value", `${claimPath}.claim_ref`);
  }

  if (
    hasDataString(descriptors, "review_state") &&
    !REVIEW_STATES.includes(descriptors.review_state.value)
  ) {
    addError(errors, "invalid_field_value", `${claimPath}.review_state`);
  }

  if (
    hasDataString(descriptors, "asserted_claim_text") &&
    !hasMinimumCodePoints(
      descriptors.asserted_claim_text.value,
      ASSERTED_CLAIM_TEXT_MIN_LENGTH,
    )
  ) {
    addError(
      errors,
      "invalid_field_value",
      `${claimPath}.asserted_claim_text`,
    );
  }

  const observationDescriptor = getDataDescriptor(
    descriptors,
    "supplied_material_observation_text",
  );
  if (
    observationDescriptor !== null &&
    typeof observationDescriptor.value === "string" &&
    !hasMinimumCodePoints(
      observationDescriptor.value,
      OBSERVATION_TEXT_MIN_LENGTH,
    )
  ) {
    addError(
      errors,
      "invalid_field_value",
      `${claimPath}.supplied_material_observation_text`,
    );
  }
}

function validateObservationCoupling(descriptors, claimPath, errors) {
  const stateDescriptor = getDataDescriptor(descriptors, "review_state");
  const observationDescriptor = getDataDescriptor(
    descriptors,
    "supplied_material_observation_text",
  );

  if (
    stateDescriptor === null ||
    typeof stateDescriptor.value !== "string" ||
    !REVIEW_STATES.includes(stateDescriptor.value) ||
    observationDescriptor === null ||
    (observationDescriptor.value !== null &&
      (typeof observationDescriptor.value !== "string" ||
        !hasMinimumCodePoints(
          observationDescriptor.value,
          OBSERVATION_TEXT_MIN_LENGTH,
        )))
  ) {
    return;
  }

  const couplingRule = OBSERVATION_COUPLING_RULES.find(
    (rule) => rule.reviewState === stateDescriptor.value,
  );
  const isAllowed =
    observationDescriptor.value === null
      ? couplingRule.allowsNull
      : couplingRule.allowsString &&
        hasMinimumCodePoints(
          observationDescriptor.value,
          couplingRule.stringMinLength,
        );

  if (!isAllowed) {
    addError(
      errors,
      "state_observation_mismatch",
      `${claimPath}.supplied_material_observation_text`,
    );
  }
}

function validateReferenceArray(
  references,
  claimPath,
  field,
  pattern,
  minimumItems,
  errors,
) {
  const descriptors = Object.getOwnPropertyDescriptors(references);
  const length = descriptors.length.value;
  const validReferences = [];

  if (length < minimumItems) {
    addError(errors, "invalid_field_value", `${claimPath}.${field}`);
  }

  for (let index = 0; index < length; index += 1) {
    const descriptor = getDataDescriptor(descriptors, String(index));
    const itemPath = `${claimPath}.${field}[${index}]`;

    if (descriptor === null || typeof descriptor.value !== "string") {
      addError(errors, "invalid_field_type", itemPath);
      continue;
    }

    if (!pattern.test(descriptor.value)) {
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

function validateClaims(claims, errors) {
  const arrayDescriptors = Object.getOwnPropertyDescriptors(claims);
  const length = arrayDescriptors.length.value;
  const snapshots = [];

  for (let index = 0; index < length; index += 1) {
    const indexDescriptor = getDataDescriptor(arrayDescriptors, String(index));
    const claim = indexDescriptor === null ? undefined : indexDescriptor.value;
    const claimPath = `$.claims[${index}]`;

    if (!isPlainObject(claim)) {
      addError(errors, "invalid_field_type", claimPath);
      continue;
    }

    const descriptors = Object.getOwnPropertyDescriptors(claim);
    const snapshot = {
      index,
      descriptors,
      validSourceReferences: [],
      validChronologyReferences: [],
    };
    snapshots.push(snapshot);

    for (const field of CLAIM_FIELDS) {
      if (!hasOwnDescriptor(descriptors, field)) {
        addError(errors, "required_field_missing", `${claimPath}.${field}`);
      }
    }

    if (hasUnknownOwnKey(descriptors, CLAIM_FIELDS)) {
      addError(errors, "unexpected_field", claimPath);
    }

    validateClaimTypes(descriptors, claimPath, errors);
    validateClaimValues(descriptors, claimPath, errors);
    validateObservationCoupling(descriptors, claimPath, errors);

    const sourceReferencesDescriptor = getDataDescriptor(
      descriptors,
      "source_refs",
    );
    if (
      sourceReferencesDescriptor !== null &&
      Array.isArray(sourceReferencesDescriptor.value)
    ) {
      snapshot.validSourceReferences = validateReferenceArray(
        sourceReferencesDescriptor.value,
        claimPath,
        "source_refs",
        SOURCE_REF_PATTERN,
        SOURCE_REF_MIN_ITEMS,
        errors,
      );
    }

    const chronologyReferencesDescriptor = getDataDescriptor(
      descriptors,
      "chronology_entry_refs",
    );
    if (
      chronologyReferencesDescriptor !== null &&
      Array.isArray(chronologyReferencesDescriptor.value)
    ) {
      snapshot.validChronologyReferences = validateReferenceArray(
        chronologyReferencesDescriptor.value,
        claimPath,
        "chronology_entry_refs",
        CHRONOLOGY_REF_PATTERN,
        CHRONOLOGY_REF_MIN_ITEMS,
        errors,
      );
    }
  }

  return snapshots;
}

function validateDuplicateClaimReferences(snapshots, errors) {
  const seenReferences = new Set();

  for (const snapshot of snapshots) {
    const descriptor = getDataDescriptor(snapshot.descriptors, "claim_ref");
    if (
      descriptor === null ||
      typeof descriptor.value !== "string" ||
      !CLAIM_REF_PATTERN.test(descriptor.value)
    ) {
      continue;
    }

    if (seenReferences.has(descriptor.value)) {
      addError(
        errors,
        "duplicate_claim_ref",
        `$.claims[${snapshot.index}].claim_ref`,
      );
    } else {
      seenReferences.add(descriptor.value);
    }
  }
}

function validateDuplicateReferences(snapshots, field, code, errors) {
  for (const snapshot of snapshots) {
    const seenReferences = new Set();
    const references =
      field === "source_refs"
        ? snapshot.validSourceReferences
        : snapshot.validChronologyReferences;

    for (const reference of references) {
      if (seenReferences.has(reference.value)) {
        addError(
          errors,
          code,
          `$.claims[${snapshot.index}].${field}[${reference.index}]`,
        );
      } else {
        seenReferences.add(reference.value);
      }
    }
  }
}

function validateHumanReviewAssertedClaimMatrix(candidate) {
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

  const claimsDescriptor = getDataDescriptor(descriptors, "claims");
  if (claimsDescriptor !== null && Array.isArray(claimsDescriptor.value)) {
    const snapshots = validateClaims(claimsDescriptor.value, errors);
    validateDuplicateClaimReferences(snapshots, errors);
    validateDuplicateReferences(
      snapshots,
      "source_refs",
      "duplicate_source_ref",
      errors,
    );
    validateDuplicateReferences(
      snapshots,
      "chronology_entry_refs",
      "duplicate_chronology_entry_ref",
      errors,
    );
  }

  return makeResult(errors);
}

module.exports = {
  validateHumanReviewAssertedClaimMatrix,
};
