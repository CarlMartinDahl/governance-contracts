"use strict";

const CONTRACT_NAME =
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND =
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE";
const VERIFICATION_POSTURE = "NOT_VERIFIED_BY_CONTRACT";

const TOP_LEVEL_FIELDS = [
  "contractVersion",
  "evidenceKind",
  "evidenceId",
  "actorIdentityEvidenceRef",
  "identityApplicabilityEvidenceRef",
  "authenticationEvidenceRef",
  "permissionDeclarationRef",
  "callerProcessRef",
  "serviceRecipientRef",
  "serviceOperationRef",
  "requestPurposeRef",
  "repositoryIdentityRef",
  "repositoryCurrentnessEvidenceRef",
  "readerContextRef",
  "repositoryReadRequestRef",
  "currentRequestBindingRef",
  "authorizationPolicyEvidenceRef",
  "authorizationSourceProvenanceRef",
  "authorizationEvidenceDeclaration",
  "verificationPosture",
  "humanProfessionalReviewRequired",
];

const OPAQUE_REFERENCE_FIELDS = [
  "evidenceId",
  "actorIdentityEvidenceRef",
  "identityApplicabilityEvidenceRef",
  "authenticationEvidenceRef",
  "permissionDeclarationRef",
  "callerProcessRef",
  "serviceRecipientRef",
  "serviceOperationRef",
  "requestPurposeRef",
  "repositoryIdentityRef",
  "repositoryCurrentnessEvidenceRef",
  "readerContextRef",
  "repositoryReadRequestRef",
  "currentRequestBindingRef",
  "authorizationPolicyEvidenceRef",
  "authorizationSourceProvenanceRef",
];

const AUTHORIZATION_EVIDENCE_DECLARATIONS = [
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_NOT_ASSESSED",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_PRESENT",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_NOT_PRESENT",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_DISPUTED",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_CONFLICTING",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_UNAVAILABLE",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_UNKNOWN",
];

const VERIFICATION_POSTURES = [VERIFICATION_POSTURE];

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
  "INVALID_CROSS_FIELD_COMBINATION",
];

const POSTURE_TRUE_FIELDS = [
  "contractOnly",
  "proveOnly",
  "schemaValidatorOnly",
  "localServicePermissionTrustedReaderAuthorizationEvidenceOnly",
  "requestBoundEvidenceOnly",
  "declarationsOnly",
  "flatObjectOnly",
  "opaqueReferencesOnly",
  "wildcardsProhibited",
  "broadScopeProhibited",
  "humanProfessionalReviewRequired",
];

const POSTURE_FALSE_FIELDS = [
  "identityExistenceAuthorityCreated",
  "identityOwnershipCreated",
  "identityVerificationCreated",
  "identityApplicabilityTruthCreated",
  "credentialVerificationCreated",
  "authenticationVerificationCreated",
  "authenticationSuccessCreated",
  "authenticationCreated",
  "tokenVerificationCreated",
  "sessionVerificationCreated",
  "certificateVerificationCreated",
  "signatureVerificationCreated",
  "issuerTrustRootVerificationCreated",
  "expiryTruthCreated",
  "revocationTruthCreated",
  "requestBindingTruthCreated",
  "requestBindingCreated",
  "replayProtectionCreated",
  "policyDecisionTruthCreated",
  "policyDecisionVerificationCreated",
  "roleBindingCreated",
  "permissionBindingCreated",
  "permissionGrantCreated",
  "readerAuthorizationVerificationCreated",
  "readerAuthorizationCreated",
  "readerAuthorityCreated",
  "trustedReaderStatusCreated",
  "trustedReadStatusCreated",
  "readPermissionCreated",
  "readRequestCreated",
  "repositoryReadCreated",
  "readOccurrenceCreated",
  "readSuccessCreated",
  "repositoryReadProvenanceCreated",
  "repositoryIdentityTruthCreated",
  "repositoryCurrentnessCreated",
  "sanitizedResultCreated",
  "resolverOutputCreated",
  "evaluatorDecisionCreated",
  "serviceAuthorizationCreated",
  "accessGrantCreated",
  "runtimeEnforcementCreated",
  "lookupCreated",
  "registryLookupCreated",
  "dispatchCreated",
  "routeIntegrationCreated",
  "persistenceCreated",
  "auditImplementationCreated",
  "auditEmissionCreated",
  "providerRoutingCreated",
  "externalUseAuthorized",
  "technicalSignoffCreated",
  "runtimeCertificationCreated",
  "releaseApprovalCreated",
  "blockerClosureCreated",
  "legalClinicalEvidentiaryCaseTruthAuthorityCreated",
];

const PROHIBITED_FIELD_KEYS = [
  "authorized",
  "authorizationVerified",
  "authorizationSucceeded",
  "authorizationSuccess",
  "authorizationDecision",
  "authorizationDecisionVerified",
  "policyDecision",
  "policyDecisionVerified",
  "policyDecisionAllows",
  "policyAllowed",
  "policyPermits",
  "allowedByPolicy",
  "roleBound",
  "roleBindingVerified",
  "permissionBound",
  "permissionBindingVerified",
  "permissionGranted",
  "permissionGrant",
  "permissionVerified",
  "hasPermission",
  "accessGranted",
  "accessGrant",
  "readAllowed",
  "readPermissionGranted",
  "repositoryReadAllowed",
  "repositoryReadAuthorized",
  "readAuthorized",
  "serviceAuthorized",
  "serviceAuthorization",
  "serviceAuthorizationVerified",
  "readerAuthorized",
  "readerAuthority",
  "readAuthority",
  "authorityGranted",
  "trustedReader",
  "trustedReaderStatus",
  "trustedReaderCreated",
  "trustedRead",
  "trustedReadStatus",
  "trustedReadCreated",
  "trustedReadAllowed",
  "authenticated",
  "readerAuthenticated",
  "authenticationVerified",
  "authenticationSucceeded",
  "authenticationSuccess",
  "identityOwnershipVerified",
  "identityVerified",
  "verifiedIdentity",
  "credentialValid",
  "credentialVerified",
  "credential",
  "credentials",
  "password",
  "token",
  "tokenValid",
  "session",
  "sessionValid",
  "certificate",
  "certificateValid",
  "signature",
  "signatureValid",
  "issuer",
  "issuerTrusted",
  "trustAnchor",
  "expiryVerified",
  "revocationChecked",
  "revocationVerified",
  "notExpired",
  "notRevoked",
  "freshnessVerified",
  "nonce",
  "replayProtected",
  "requestBound",
  "requestBindingVerified",
  "requestBindingTrue",
  "runtimeEnforced",
  "enforcementEnabled",
  "middlewareBound",
  "routeIntegrated",
  "lookupPerformed",
  "dispatchEnabled",
  "persisted",
  "auditEmitted",
  "auditLogged",
  "auditVerified",
  "repositoryCurrent",
  "repositoryVerified",
  "currentnessVerified",
  "latestVerified",
  "current",
  "latest",
  "fresh",
  "repositoryRecord",
  "rawCurrentState",
  "rawRepositoryContent",
  "sanitizedResult",
  "resolverResult",
  "evaluatorDecision",
  "identityProviderPayload",
  "providerPayload",
  "rawIdentityAttributes",
  "rawSourceContent",
  "privateFacts",
  "caseContent",
  "sourceUrl",
  "sourcePath",
  "databaseLocator",
  "connectionString",
  "repositoryHandle",
  "legalConclusion",
  "clinicalConclusion",
  "evidentiaryConclusion",
  "caseTruthConclusion",
  "blockerClosed",
  "releaseApproved",
];

const BROAD_SCOPE_VALUES = new Set([
  "all",
  "any",
  "all-readers",
  "all_readers",
  "all-repositories",
  "all_repositories",
  "all-services",
  "all_services",
  "all-operations",
  "all_operations",
  "all-requests",
  "all_requests",
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
  evidenceKind: CONTRACT_KIND,
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

function validateLocalServicePermissionTrustedReaderAuthorizationEvidence(
  candidate,
) {
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
    hasDataString(descriptors, "evidenceKind") &&
    descriptors.evidenceKind.value !== CONTRACT_KIND
  ) {
    addError(errors, "INVALID_ENUM", "$.evidenceKind");
  }

  if (
    hasDataString(descriptors, "verificationPosture") &&
    descriptors.verificationPosture.value !== VERIFICATION_POSTURE
  ) {
    addError(errors, "INVALID_ENUM", "$.verificationPosture");
  }

  if (
    hasDataString(descriptors, "authorizationEvidenceDeclaration") &&
    !AUTHORIZATION_EVIDENCE_DECLARATIONS.includes(
      descriptors.authorizationEvidenceDeclaration.value,
    )
  ) {
    addError(errors, "INVALID_ENUM", "$.authorizationEvidenceDeclaration");
  }

  const opaqueReferenceValidity = new Map();
  for (const field of OPAQUE_REFERENCE_FIELDS) {
    if (!hasDataString(descriptors, field)) {
      continue;
    }

    const errorCode = validateOpaqueReference(descriptors[field].value);
    if (errorCode) {
      addError(errors, errorCode, `$.${field}`);
      opaqueReferenceValidity.set(field, false);
    } else {
      opaqueReferenceValidity.set(field, true);
    }
  }

  if (
    hasDataBoolean(descriptors, "humanProfessionalReviewRequired") &&
    descriptors.humanProfessionalReviewRequired.value !== true
  ) {
    addError(errors, "INVALID_BOOLEAN", "$.humanProfessionalReviewRequired");
  }

  function canCompare(field) {
    return (
      hasDataString(descriptors, field) &&
      opaqueReferenceValidity.get(field) === true
    );
  }

  function compareDifferent(leftField, rightField, errorPathField) {
    if (
      canCompare(leftField) &&
      canCompare(rightField) &&
      descriptors[leftField].value === descriptors[rightField].value
    ) {
      addError(errors, "INVALID_CROSS_FIELD_COMBINATION", `$.${errorPathField}`);
    }
  }

  compareDifferent(
    "callerProcessRef",
    "serviceRecipientRef",
    "serviceRecipientRef",
  );
  compareDifferent(
    "evidenceId",
    "actorIdentityEvidenceRef",
    "actorIdentityEvidenceRef",
  );
  compareDifferent(
    "evidenceId",
    "identityApplicabilityEvidenceRef",
    "identityApplicabilityEvidenceRef",
  );
  compareDifferent(
    "evidenceId",
    "authenticationEvidenceRef",
    "authenticationEvidenceRef",
  );
  compareDifferent("evidenceId", "readerContextRef", "readerContextRef");
  compareDifferent(
    "actorIdentityEvidenceRef",
    "readerContextRef",
    "readerContextRef",
  );
  compareDifferent(
    "identityApplicabilityEvidenceRef",
    "readerContextRef",
    "readerContextRef",
  );
  compareDifferent(
    "authenticationEvidenceRef",
    "readerContextRef",
    "readerContextRef",
  );
  compareDifferent(
    "repositoryIdentityRef",
    "repositoryCurrentnessEvidenceRef",
    "repositoryCurrentnessEvidenceRef",
  );
  compareDifferent(
    "repositoryReadRequestRef",
    "currentRequestBindingRef",
    "currentRequestBindingRef",
  );
  compareDifferent(
    "authorizationPolicyEvidenceRef",
    "authorizationSourceProvenanceRef",
    "authorizationSourceProvenanceRef",
  );
  compareDifferent(
    "authorizationSourceProvenanceRef",
    "evidenceId",
    "authorizationSourceProvenanceRef",
  );

  for (const relationField of [
    "permissionDeclarationRef",
    "callerProcessRef",
    "serviceRecipientRef",
    "serviceOperationRef",
    "requestPurposeRef",
    "repositoryReadRequestRef",
    "currentRequestBindingRef",
    "authorizationPolicyEvidenceRef",
  ]) {
    for (const contextField of [
      "actorIdentityEvidenceRef",
      "identityApplicabilityEvidenceRef",
      "authenticationEvidenceRef",
      "repositoryIdentityRef",
      "repositoryCurrentnessEvidenceRef",
    ]) {
      compareDifferent(relationField, contextField, relationField);
    }
  }

  return makeResult(errors);
}

module.exports = {
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_IDENTITY:
    IDENTITY,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE:
    POSTURE,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_TOP_LEVEL_FIELDS:
    deepFreeze([...TOP_LEVEL_FIELDS]),
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_OPAQUE_REFERENCE_FIELDS:
    deepFreeze([...OPAQUE_REFERENCE_FIELDS]),
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_AUTHORIZATION_EVIDENCE_DECLARATIONS:
    deepFreeze([...AUTHORIZATION_EVIDENCE_DECLARATIONS]),
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_VERIFICATION_POSTURES:
    deepFreeze([...VERIFICATION_POSTURES]),
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_VALIDATION_ERROR_CODES:
    deepFreeze([...VALIDATION_ERROR_CODES]),
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_PROHIBITED_FIELD_KEYS:
    deepFreeze([...PROHIBITED_FIELD_KEYS]),
  validateLocalServicePermissionTrustedReaderAuthorizationEvidence,
};
