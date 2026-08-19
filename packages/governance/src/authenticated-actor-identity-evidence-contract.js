"use strict";

const CONTRACT_NAME = "AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND = "AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE";

const AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY = deepFreeze({
  contractName: CONTRACT_NAME,
  version: CONTRACT_VERSION,
});

const AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_POSTURE = deepFreeze({
  posture: ["CONTRACT_ONLY", "PROVE_ONLY", "SCHEMA_VALIDATOR_ONLY"],
  implementationCreated: false,
  identityProviderCreated: false,
  authenticatedSessionCreated: false,
  authenticationCreated: false,
  issuerVerificationCreated: false,
  signatureVerificationCreated: false,
  tokenVerificationCreated: false,
  certificateVerificationCreated: false,
  currentTimeVerificationCreated: false,
  expiryCheckCreated: false,
  revocationCheckCreated: false,
  currentRequestBindingVerificationCreated: false,
  actorTypeAuthorityCreated: false,
  roleResolutionCreated: false,
  permissionResolutionCreated: false,
  actorRoleBindingCreated: false,
  rolePermissionBindingCreated: false,
  scopeOwnershipCreated: false,
  runtimeLookupCreated: false,
  dynamicResolutionCreated: false,
  validatorDispatchCreated: false,
  routeIntegrationCreated: false,
  persistenceCreated: false,
  authorizationDecisionCreated: false,
  accessGrantCreated: false,
  providerRouteAuthorized: false,
  externalUseAuthorized: false,
  blockerClosureCreated: false,
  serverProducedEvidenceRequired: true,
  humanProfessionalReviewRequired: true,
});

const AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_ACTOR_TYPES = deepFreeze([
  "HUMAN_REVIEWER",
  "ADMIN",
  "SUPPORT",
  "SERVICE_SYSTEM",
]);

const AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_SOURCE_CLASSES = deepFreeze([
  "SERVER_SESSION_EVIDENCE",
  "TOKEN_EVIDENCE",
  "CERTIFICATE_EVIDENCE",
  "DATABASE_ACCOUNT_EVIDENCE",
  "SERVICE_CREDENTIAL_EVIDENCE",
]);

const AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VERIFICATION_POSTURES =
  deepFreeze(["NOT_VERIFIED_BY_CONTRACT"]);

const AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_REQUIRED_FIELDS = deepFreeze([
  "version",
  "evidenceId",
  "actorId",
  "actorIdNamespace",
  "actorType",
  "identitySourceClass",
  "issuerRef",
  "subjectRef",
  "actorTypeEvidenceRef",
  "authenticationEvidenceRef",
  "currentRequestBindingRef",
  "issuedAtEpochSeconds",
  "expiresAtEpochSeconds",
  "revocationEvidenceRef",
  "verificationPosture",
]);

const AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_OPTIONAL_FIELDS = deepFreeze([
  "professionalReviewQualificationRef",
]);

const AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_FIELDS = deepFreeze([
  ...AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_REQUIRED_FIELDS,
  ...AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_OPTIONAL_FIELDS,
]);

const AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VALIDATION_ERROR_CODES =
  deepFreeze([
    "UNKNOWN_CONTRACT_VERSION",
    "INPUT_NOT_OBJECT",
    "MISSING_REQUIRED_FIELD",
    "UNKNOWN_FIELD",
    "INVALID_TYPE",
    "INVALID_OPAQUE_REFERENCE",
    "UNKNOWN_ENUM_VALUE",
    "PROHIBITED_FIELD",
    "INVALID_CROSS_FIELD_COMBINATION",
    "VALUE_OUT_OF_RANGE",
  ]);

const OPAQUE_REFERENCE_FIELDS = deepFreeze([
  "evidenceId",
  "actorId",
  "actorIdNamespace",
  "issuerRef",
  "subjectRef",
  "actorTypeEvidenceRef",
  "authenticationEvidenceRef",
  "currentRequestBindingRef",
  "revocationEvidenceRef",
  "professionalReviewQualificationRef",
]);

const AUTHORITY_FIELD_KEYS = deepFreeze([
  "role",
  "roles",
  "permission",
  "permissions",
  "grant",
  "grants",
  "approval",
  "approved",
  "authenticated",
  "verified",
  "authorized",
  "accessGranted",
  "actorRoleBinding",
  "rolePermissionBinding",
  "providerRouteAuthorized",
  "externalUseAuthorized",
  "blockerClosureCreated",
]);

const SENSITIVE_FIELD_KEYS = deepFreeze([
  "rawContent",
  "rawSource",
  "rawSourceText",
  "privateFacts",
  "sourceExcerpt",
  "sourceLocator",
  "url",
  "urls",
  "token",
  "tokens",
  "jwt",
  "certificate",
  "credential",
  "password",
  "secret",
  "secrets",
  "providerPayload",
  "fileName",
  "filePath",
]);

const PROHIBITED_FIELD_KEYS = deepFreeze([
  ...AUTHORITY_FIELD_KEYS,
  ...SENSITIVE_FIELD_KEYS,
]);

const DANGEROUS_SCHEME_PATTERN =
  /^(?:https?|ftp|file|mailto|data|javascript):/i;
const OPAQUE_REFERENCE_PATTERN = /^[A-Za-z0-9._:-]{1,128}$/;

function deepFreeze(value, active = new WeakSet()) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }
  if (active.has(value)) {
    return value;
  }

  active.add(value);
  Object.freeze(value);
  for (const descriptor of Object.values(Object.getOwnPropertyDescriptors(value))) {
    if ("value" in descriptor) {
      deepFreeze(descriptor.value, active);
    }
  }
  active.delete(value);
  return value;
}

function isPlainObject(value) {
  try {
    return (
      Boolean(value) &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.getPrototypeOf(value) === Object.prototype
    );
  } catch (_error) {
    return false;
  }
}

function makeError(code, path) {
  return deepFreeze({ code, path });
}

function pushError(errors, code, path) {
  errors.push(makeError(code, path));
}

function versionForResult(input) {
  if (!isPlainObject(input)) {
    return null;
  }
  const descriptor = Object.getOwnPropertyDescriptor(input, "version");
  return descriptor && "value" in descriptor && descriptor.value === CONTRACT_VERSION
    ? CONTRACT_VERSION
    : null;
}

function makeResult(valid, version, errors) {
  return deepFreeze({
    valid,
    contractKind: CONTRACT_KIND,
    version,
    errors: errors.slice(),
  });
}

function hasDataKey(input, key) {
  const descriptor = Object.getOwnPropertyDescriptor(input, key);
  return Boolean(descriptor && "value" in descriptor);
}

function hasOwnKey(input, key) {
  return Boolean(Object.getOwnPropertyDescriptor(input, key));
}

function getDataValue(input, key) {
  const descriptor = Object.getOwnPropertyDescriptor(input, key);
  return descriptor && "value" in descriptor ? descriptor.value : undefined;
}

function ownEnumerableDataKeys(input) {
  return Object.entries(Object.getOwnPropertyDescriptors(input))
    .filter(([, descriptor]) => descriptor.enumerable && "value" in descriptor)
    .map(([key]) => key);
}

function descriptorPath(basePath, key) {
  return `${basePath}.${key}`;
}

function indexPath(basePath, index) {
  return `${basePath}[${index}]`;
}

function validateKnownFieldAccessors(input, errors) {
  for (const field of AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_FIELDS) {
    const descriptor = Object.getOwnPropertyDescriptor(input, field);
    if (descriptor && !("value" in descriptor)) {
      pushError(errors, "INVALID_TYPE", descriptorPath("$", field));
    }
  }
}

function validateRequiredFields(input, errors) {
  for (const field of AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_REQUIRED_FIELDS) {
    if (!hasOwnKey(input, field)) {
      pushError(errors, "MISSING_REQUIRED_FIELD", descriptorPath("$", field));
    }
  }
}

function validateUnknownFields(input, errors) {
  const allowed = new Set(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_FIELDS);
  const unknownFields = Object.keys(input)
    .filter((key) => !allowed.has(key))
    .sort();
  for (const field of unknownFields) {
    pushError(errors, "UNKNOWN_FIELD", descriptorPath("$", field));
  }
}

function validateEnum(value, allowedValues, errors, path) {
  if (typeof value !== "string") {
    pushError(errors, "INVALID_TYPE", path);
    return;
  }
  if (!allowedValues.includes(value)) {
    pushError(errors, "UNKNOWN_ENUM_VALUE", path);
  }
}

function validateVersion(input, errors) {
  if (!hasDataKey(input, "version")) {
    return;
  }
  const value = getDataValue(input, "version");
  if (typeof value !== "string") {
    pushError(errors, "INVALID_TYPE", "$.version");
    return;
  }
  if (value !== CONTRACT_VERSION) {
    pushError(errors, "UNKNOWN_CONTRACT_VERSION", "$.version");
  }
}

function validateOpaqueReference(value, errors, path) {
  if (typeof value !== "string") {
    pushError(errors, "INVALID_TYPE", path);
    return;
  }
  if (
    value === "." ||
    value === ".." ||
    !OPAQUE_REFERENCE_PATTERN.test(value) ||
    DANGEROUS_SCHEME_PATTERN.test(value)
  ) {
    pushError(errors, "INVALID_OPAQUE_REFERENCE", path);
  }
}

function validateTimeField(value, errors, path) {
  if (typeof value !== "number" || !Number.isSafeInteger(value)) {
    pushError(errors, "INVALID_TYPE", path);
    return;
  }
  if (value <= 0) {
    pushError(errors, "VALUE_OUT_OF_RANGE", path);
  }
}

function validateTimeOrdering(input, errors) {
  if (
    !hasDataKey(input, "issuedAtEpochSeconds") ||
    !hasDataKey(input, "expiresAtEpochSeconds")
  ) {
    return;
  }
  const issuedAt = getDataValue(input, "issuedAtEpochSeconds");
  const expiresAt = getDataValue(input, "expiresAtEpochSeconds");
  if (
    typeof issuedAt === "number" &&
    Number.isSafeInteger(issuedAt) &&
    issuedAt > 0 &&
    typeof expiresAt === "number" &&
    Number.isSafeInteger(expiresAt) &&
    expiresAt > 0 &&
    expiresAt <= issuedAt
  ) {
    pushError(
      errors,
      "INVALID_CROSS_FIELD_COMBINATION",
      "$.expiresAtEpochSeconds",
    );
  }
}

function validateProfessionalReviewQualification(input, errors) {
  if (!hasDataKey(input, "professionalReviewQualificationRef")) {
    return;
  }
  const actorType = hasDataKey(input, "actorType")
    ? getDataValue(input, "actorType")
    : null;
  if (actorType !== "HUMAN_REVIEWER") {
    pushError(
      errors,
      "INVALID_CROSS_FIELD_COMBINATION",
      "$.professionalReviewQualificationRef",
    );
  }
}

function validateProhibitedKeys(value, errors) {
  const prohibitedPaths = [];
  const invalidTypePaths = [];
  collectRecursivePaths(
    value,
    "$",
    prohibitedPaths,
    invalidTypePaths,
    new WeakSet(),
  );
  for (const path of invalidTypePaths.sort()) {
    pushError(errors, "INVALID_TYPE", path);
  }
  for (const path of prohibitedPaths.sort()) {
    pushError(errors, "PROHIBITED_FIELD", path);
  }
}

function collectRecursivePaths(
  value,
  currentPath,
  prohibitedPaths,
  invalidTypePaths,
  active,
) {
  if (!value || typeof value !== "object") {
    return;
  }
  if (active.has(value)) {
    invalidTypePaths.push(currentPath);
    return;
  }

  active.add(value);
  try {
    if (Array.isArray(value)) {
      const descriptors = Object.getOwnPropertyDescriptors(value);
      const indexes = Object.keys(descriptors)
        .filter((key) => String(Number(key)) === key)
        .sort((left, right) => Number(left) - Number(right));
      for (const key of indexes) {
        const descriptor = descriptors[key];
        const path = indexPath(currentPath, key);
        if ("value" in descriptor) {
          collectRecursivePaths(
            descriptor.value,
            path,
            prohibitedPaths,
            invalidTypePaths,
            active,
          );
        } else {
          invalidTypePaths.push(path);
        }
      }
      return;
    }

    if (!isPlainObject(value)) {
      return;
    }

    const descriptors = Object.getOwnPropertyDescriptors(value);
    for (const key of Object.keys(descriptors).sort()) {
      const path = descriptorPath(currentPath, key);
      const descriptor = descriptors[key];
      if (PROHIBITED_FIELD_KEYS.includes(key)) {
        prohibitedPaths.push(path);
        continue;
      }
      if ("value" in descriptor) {
        collectRecursivePaths(
          descriptor.value,
          path,
          prohibitedPaths,
          invalidTypePaths,
          active,
        );
      } else {
        invalidTypePaths.push(path);
      }
    }
  } finally {
    active.delete(value);
  }
}

function validateTopLevelObject(input, errors) {
  if (!isPlainObject(input)) {
    pushError(errors, "INPUT_NOT_OBJECT", "$");
    return false;
  }
  return true;
}

function validateKnownFields(input, errors) {
  validateVersion(input, errors);

  for (const field of OPAQUE_REFERENCE_FIELDS) {
    if (hasDataKey(input, field)) {
      validateOpaqueReference(
        getDataValue(input, field),
        errors,
        descriptorPath("$", field),
      );
    }
  }

  if (hasDataKey(input, "actorType")) {
    validateEnum(
      getDataValue(input, "actorType"),
      AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_ACTOR_TYPES,
      errors,
      "$.actorType",
    );
  }

  if (hasDataKey(input, "identitySourceClass")) {
    validateEnum(
      getDataValue(input, "identitySourceClass"),
      AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_SOURCE_CLASSES,
      errors,
      "$.identitySourceClass",
    );
  }

  if (hasDataKey(input, "verificationPosture")) {
    validateEnum(
      getDataValue(input, "verificationPosture"),
      AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VERIFICATION_POSTURES,
      errors,
      "$.verificationPosture",
    );
  }

  if (hasDataKey(input, "issuedAtEpochSeconds")) {
    validateTimeField(
      getDataValue(input, "issuedAtEpochSeconds"),
      errors,
      "$.issuedAtEpochSeconds",
    );
  }

  if (hasDataKey(input, "expiresAtEpochSeconds")) {
    validateTimeField(
      getDataValue(input, "expiresAtEpochSeconds"),
      errors,
      "$.expiresAtEpochSeconds",
    );
  }

  validateTimeOrdering(input, errors);
  validateProfessionalReviewQualification(input, errors);
}

function validateAuthenticatedActorIdentityEvidence(input) {
  const errors = [];
  let outputVersion = null;

  try {
    outputVersion = versionForResult(input);
    const topLevelValid = validateTopLevelObject(input, errors);

    if (!topLevelValid) {
      return makeResult(false, outputVersion, errors);
    }

    validateProhibitedKeys(input, errors);
    validateKnownFieldAccessors(input, errors);
    validateRequiredFields(input, errors);
    validateUnknownFields(input, errors);
    validateKnownFields(input, errors);
  } catch (_error) {
    pushError(errors, "INVALID_TYPE", "$");
  }

  return makeResult(
    errors.length === 0,
    errors.length === 0 ? CONTRACT_VERSION : outputVersion,
    errors,
  );
}

module.exports = {
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_ACTOR_TYPES,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_KIND: CONTRACT_KIND,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_POSTURE,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_OPTIONAL_FIELDS,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_REQUIRED_FIELDS,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_SOURCE_CLASSES,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VALIDATION_ERROR_CODES,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VERIFICATION_POSTURES,
  validateAuthenticatedActorIdentityEvidence,
};
