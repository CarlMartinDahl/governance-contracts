"use strict";

const CONTRACT_NAME = "API_CONTRACT_SCHEMA_VALIDATOR_BOUNDARY";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND = "API_CONTRACT_SCHEMA_VALIDATION_BOUNDARY";
const VERIFICATION_POSTURE = "NOT_VERIFIED_BY_CONTRACT";

const TOP_LEVEL_FIELDS = [
  "contractVersion",
  "contractKind",
  "apiContractSchemaRef",
  "requestSchemaShapeRef",
  "responseSchemaShapeRef",
  "schemaVersionRef",
  "requestShapeDeclaration",
  "responseShapeDeclaration",
  "evidenceRef",
  "verificationPosture",
  "humanProfessionalReviewRequired",
];

const SCHEMA_SHAPE_FIELDS = [
  "apiContractSchemaRef",
  "requestSchemaShapeRef",
  "responseSchemaShapeRef",
  "schemaVersionRef",
  "evidenceRef",
];

const REQUEST_RESPONSE_SHAPE_FIELDS = [
  "requestShapeDeclaration",
  "responseShapeDeclaration",
];

const REQUEST_SHAPE_DECLARATIONS = [
  "API_CONTRACT_REQUEST_SHAPE_DECLARED_STRUCTURAL_ONLY",
  "API_CONTRACT_REQUEST_SHAPE_DECLARED_OPAQUE_REFERENCE_ONLY",
];

const RESPONSE_SHAPE_DECLARATIONS = [
  "API_CONTRACT_RESPONSE_SHAPE_DECLARED_STRUCTURAL_ONLY",
  "API_CONTRACT_RESPONSE_SHAPE_DECLARED_OPAQUE_REFERENCE_ONLY",
];

const VALIDATION_ERROR_CODES = [
  "INVALID_TYPE",
  "MISSING_FIELD",
  "UNKNOWN_FIELD",
  "PROHIBITED_FIELD",
  "INVALID_ENUM",
  "INVALID_OPAQUE_REFERENCE",
  "INVALID_BOOLEAN",
  "PROHIBITED_WILDCARD",
  "PROHIBITED_BROAD_SCOPE",
];

const POSTURE_TRUE_FIELDS = [
  "contractOnly",
  "proveOnly",
  "schemaValidatorOnly",
  "apiContractSchemaValidationOnly",
  "structuralSchemaOnly",
  "requestResponseShapeOnly",
  "flatObjectOnly",
  "opaqueReferencesOnly",
  "wildcardsProhibited",
  "broadScopeProhibited",
  "humanProfessionalReviewRequired",
];

const POSTURE_FALSE_FIELDS = [
  "runtimeEnforcementCreated",
  "routeIntegrationCreated",
  "middlewareIntegrationCreated",
  "deployedApiAvailabilityCreated",
  "apiAvailabilityCreated",
  "endpointAvailabilityCreated",
  "apiCorrectnessCreated",
  "requestTruthCreated",
  "responseTruthCreated",
  "businessRuleTruthCreated",
  "contractTruthCreated",
  "repositoryCurrentnessTruthCreated",
  "releaseReadinessCreated",
  "technicalSignoffCreated",
  "blockerClosureCreated",
  "securityProofCreated",
  "authenticationProofCreated",
  "authorizationProofCreated",
  "accessProofCreated",
  "deploymentProofCreated",
  "legalClinicalEvidentiaryCaseTruthAuthorityCreated",
];

const PROHIBITED_FIELD_KEYS = [
  "runtimeEnforced",
  "routeIntegrated",
  "middlewareBound",
  "endpointAvailable",
  "apiAvailable",
  "deployed",
  "deploymentVerified",
  "serverRunning",
  "apiCorrect",
  "requestVerified",
  "responseVerified",
  "responseTruth",
  "businessRuleVerified",
  "contractTruthVerified",
  "repositoryCurrent",
  "currentnessVerified",
  "latestVerified",
  "releaseReady",
  "releaseApproved",
  "technicalSignoff",
  "technicalSignOff",
  "blockerClosed",
  "authorized",
  "accessGranted",
  "securityVerified",
  "authenticationVerified",
  "authorizationVerified",
  "route",
  "middleware",
  "lookup",
  "dispatch",
  "persisted",
  "auditEmitted",
  "auditVerified",
  "requestTruth",
  "requestSucceeded",
  "responseSucceeded",
  "businessRuleSatisfied",
  "contractTruth",
  "repositoryVerified",
  "current",
  "latest",
  "fresh",
  "securityProof",
  "authenticationSucceeded",
  "authorizationSucceeded",
  "accessGrant",
  "legalConclusion",
  "clinicalConclusion",
  "evidentiaryConclusion",
  "caseTruthConclusion",
];

const BROAD_SCOPE_VALUES = new Set([
  "all",
  "any",
  "all-contracts",
  "all_contracts",
  "all-apis",
  "all_apis",
  "all-routes",
  "all_routes",
  "all-requests",
  "all_requests",
  "all-responses",
  "all_responses",
]);

const OPAQUE_REFERENCE_PATTERN = /^[A-Za-z0-9._:-]{1,128}$/u;
const GENERIC_SYNTAX_PATTERN = /[/?#\\]/u;
const PROHIBITED_FIELD_KEY_SET = new Set(PROHIBITED_FIELD_KEYS);
const TOP_LEVEL_FIELD_SET = new Set(TOP_LEVEL_FIELDS);

function deepFreeze(value, seen = new WeakSet()) {
  if (value === null || typeof value !== "object" || seen.has(value)) {
    return value;
  }

  seen.add(value);

  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value, seen);
    }
  }

  return Object.freeze(value);
}

function buildPosture() {
  const posture = {};

  for (const field of POSTURE_TRUE_FIELDS) {
    posture[field] = true;
  }

  for (const field of POSTURE_FALSE_FIELDS) {
    posture[field] = false;
  }

  return posture;
}

const IDENTITY = deepFreeze({
  contractName: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  contractKind: CONTRACT_KIND,
});

const POSTURE = deepFreeze(buildPosture());

function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
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

function validateOpaqueReference(value) {
  if (value.includes("*")) {
    return "PROHIBITED_WILDCARD";
  }

  if (BROAD_SCOPE_VALUES.has(value.toLowerCase())) {
    return "PROHIBITED_BROAD_SCOPE";
  }

  if (
    value === "." ||
    value === ".." ||
    GENERIC_SYNTAX_PATTERN.test(value) ||
    !OPAQUE_REFERENCE_PATTERN.test(value)
  ) {
    return "INVALID_OPAQUE_REFERENCE";
  }

  return null;
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
  const dedupedErrors = dedupeErrors(errors).map((error) =>
    deepFreeze({
      code: error.code,
      path: error.path,
    }),
  );

  return deepFreeze({
    valid: dedupedErrors.length === 0,
    contractKind: CONTRACT_NAME,
    version: CONTRACT_VERSION,
    errors: dedupedErrors,
  });
}

function validateApiContractSchema(candidate) {
  const errors = [];

  if (!isPlainObject(candidate)) {
    addError(errors, "INVALID_TYPE", "$");
    return makeResult(errors);
  }

  const descriptors = Object.getOwnPropertyDescriptors(candidate);
  const stringKeys = Object.keys(descriptors);

  for (const field of TOP_LEVEL_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(descriptors, field)) {
      addError(errors, "MISSING_FIELD", `$.${field}`);
    }
  }

  for (const key of stringKeys
    .filter((field) => PROHIBITED_FIELD_KEY_SET.has(field))
    .sort()) {
    addError(errors, "PROHIBITED_FIELD", `$.${key}`);
  }

  for (const key of stringKeys
    .filter(
      (field) =>
        !TOP_LEVEL_FIELD_SET.has(field) &&
        !PROHIBITED_FIELD_KEY_SET.has(field),
    )
    .sort()) {
    addError(errors, "UNKNOWN_FIELD", `$.${key}`);
  }

  for (const field of TOP_LEVEL_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(descriptors, field)) {
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

  if (
    hasDataString(descriptors, "contractVersion") &&
    descriptors.contractVersion.value !== CONTRACT_VERSION
  ) {
    addError(errors, "INVALID_ENUM", "$.contractVersion");
  }

  if (
    hasDataString(descriptors, "contractKind") &&
    descriptors.contractKind.value !== CONTRACT_KIND
  ) {
    addError(errors, "INVALID_ENUM", "$.contractKind");
  }

  if (
    hasDataString(descriptors, "verificationPosture") &&
    descriptors.verificationPosture.value !== VERIFICATION_POSTURE
  ) {
    addError(errors, "INVALID_ENUM", "$.verificationPosture");
  }

  if (
    hasDataString(descriptors, "requestShapeDeclaration") &&
    !REQUEST_SHAPE_DECLARATIONS.includes(
      descriptors.requestShapeDeclaration.value,
    )
  ) {
    addError(errors, "INVALID_ENUM", "$.requestShapeDeclaration");
  }

  if (
    hasDataString(descriptors, "responseShapeDeclaration") &&
    !RESPONSE_SHAPE_DECLARATIONS.includes(
      descriptors.responseShapeDeclaration.value,
    )
  ) {
    addError(errors, "INVALID_ENUM", "$.responseShapeDeclaration");
  }

  for (const field of SCHEMA_SHAPE_FIELDS) {
    if (!hasDataString(descriptors, field)) {
      continue;
    }

    const errorCode = validateOpaqueReference(descriptors[field].value);
    if (errorCode) {
      addError(errors, errorCode, `$.${field}`);
    }
  }

  if (
    hasDataBoolean(descriptors, "humanProfessionalReviewRequired") &&
    descriptors.humanProfessionalReviewRequired.value !== true
  ) {
    addError(errors, "INVALID_BOOLEAN", "$.humanProfessionalReviewRequired");
  }

  return makeResult(errors);
}

module.exports = {
  API_CONTRACT_SCHEMA_VALIDATOR_IDENTITY: IDENTITY,
  API_CONTRACT_SCHEMA_VALIDATOR_POSTURE: POSTURE,
  API_CONTRACT_SCHEMA_VALIDATOR_TOP_LEVEL_FIELDS: deepFreeze([
    ...TOP_LEVEL_FIELDS,
  ]),
  API_CONTRACT_SCHEMA_VALIDATOR_SCHEMA_SHAPE_FIELDS: deepFreeze([
    ...SCHEMA_SHAPE_FIELDS,
  ]),
  API_CONTRACT_SCHEMA_VALIDATOR_REQUEST_RESPONSE_SHAPE_FIELDS: deepFreeze([
    ...REQUEST_RESPONSE_SHAPE_FIELDS,
  ]),
  API_CONTRACT_SCHEMA_VALIDATOR_PROHIBITED_FIELD_KEYS: deepFreeze([
    ...PROHIBITED_FIELD_KEYS,
  ]),
  API_CONTRACT_SCHEMA_VALIDATOR_VALIDATION_ERROR_CODES: deepFreeze([
    ...VALIDATION_ERROR_CODES,
  ]),
  validateApiContractSchema,
};
