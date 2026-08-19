"use strict";

const CONTRACT_NAME =
  "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND = "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE";
const VERIFICATION_POSTURE = "NOT_VERIFIED_BY_CONTRACT";

const TOP_LEVEL_FIELDS = [
  "contractVersion",
  "evidenceKind",
  "verificationPosture",
  "evidenceId",
  "permissionDeclarationRef",
  "callerProcessRef",
  "serviceRecipientRef",
  "serviceOperationRef",
  "requestPurposeRef",
  "permissionLifecyclePosture",
  "currentStateVersionRef",
  "sourceProvenanceRef",
  "humanProfessionalReviewRequired",
];

const OPAQUE_REFERENCE_FIELDS = [
  "evidenceId",
  "permissionDeclarationRef",
  "callerProcessRef",
  "serviceRecipientRef",
  "serviceOperationRef",
  "requestPurposeRef",
  "currentStateVersionRef",
  "sourceProvenanceRef",
];

const LIFECYCLE_POSTURES = [
  "LOCAL_SERVICE_PERMISSION_DECLARED_CURRENT_ACTIVE",
  "LOCAL_SERVICE_PERMISSION_DECLARED_INACTIVE",
  "LOCAL_SERVICE_PERMISSION_DECLARED_SUSPENDED",
  "LOCAL_SERVICE_PERMISSION_DECLARED_REVOKED",
  "LOCAL_SERVICE_PERMISSION_DECLARED_EXPIRED",
  "LOCAL_SERVICE_PERMISSION_DECLARED_SUPERSEDED",
  "LOCAL_SERVICE_PERMISSION_DECLARED_RETIRED",
  "LOCAL_SERVICE_PERMISSION_DECLARED_DISPUTED",
  "LOCAL_SERVICE_PERMISSION_DECLARED_CONFLICTING",
  "LOCAL_SERVICE_PERMISSION_DECLARED_PROPOSED",
  "LOCAL_SERVICE_PERMISSION_DECLARED_PENDING_APPROVAL",
  "LOCAL_SERVICE_PERMISSION_DECLARED_APPROVED_NOT_ACTIVE",
  "LOCAL_SERVICE_PERMISSION_DECLARED_UNAVAILABLE",
  "LOCAL_SERVICE_PERMISSION_DECLARED_UNKNOWN",
];

const VERIFICATION_POSTURES = [VERIFICATION_POSTURE];

const VALIDATION_ERROR_CODES = [
  "INVALID_TYPE",
  "MISSING_FIELD",
  "UNKNOWN_FIELD",
  "INVALID_ENUM",
  "INVALID_OPAQUE_REFERENCE",
  "INVALID_BOOLEAN",
  "PROHIBITED_FIELD",
  "PROHIBITED_WILDCARD",
  "PROHIBITED_BROAD_SCOPE",
  "INVALID_CROSS_FIELD_COMBINATION",
];

const POSTURE_TRUE_FIELDS = [
  "contractOnly",
  "proveOnly",
  "schemaValidatorOnly",
  "localServicePermissionCurrentStateEvidenceOnly",
  "lifecycleDeclarationsOnly",
  "wildcardsProhibited",
  "broadScopeProhibited",
  "humanProfessionalReviewRequired",
];

const POSTURE_FALSE_FIELDS = [
  "processAuthenticationCreated",
  "callerVerificationCreated",
  "recipientVerificationCreated",
  "permissionAuthorityCreated",
  "authoritativePermissionSourceCreated",
  "permissionRepositoryCreated",
  "writerProvenanceVerified",
  "repositoryCurrentnessVerified",
  "permissionCurrentnessVerified",
  "lifecycleTruthVerified",
  "currentStateVersionVerified",
  "resolverCreated",
  "evaluatorCreated",
  "serviceAuthorizationCreated",
  "accessGrantCreated",
  "portableGrantCreated",
  "inheritanceCreated",
  "lookupCreated",
  "runtimeLookupCreated",
  "registryLookupCreated",
  "dynamicDispatchCreated",
  "validatorDispatchCreated",
  "routeIntegrationCreated",
  "middlewareCreated",
  "requestAuthMigrationCreated",
  "persistenceCreated",
  "auditEventEmitted",
  "auditStorageCreated",
  "providerRoutingCreated",
  "externalUseAuthorized",
  "productCandidateSelected",
  "productApprovalCreated",
  "securityFindingCreated",
  "severityAssigned",
  "remediationRecommended",
  "technicalSignOffCreated",
  "runtimeCertificationCreated",
  "releaseApprovalCreated",
  "blockerClosureCreated",
];

const PROHIBITED_FIELDS = new Set([
  "allow",
  "allowed",
  "authorize",
  "authorized",
  "authorization",
  "serviceAuthorization",
  "accessGrant",
  "accessGranted",
  "grant",
  "effectiveGrant",
  "runtimeEnforced",
  "verifiedCurrent",
  "authoritative",
  "trusted",
  "resolved",
  "lookupResult",
  "repositoryRecord",
  "evaluatorDecision",
  "routePermission",
  "capability",
  "requiredCapability",
  "role",
  "roles",
  "humanPermission",
  "humanPermissions",
  "permissionGrant",
  "tenantMembership",
  "caseMembership",
  "resourcePlacement",
  "ownership",
  "domainAction",
  "domainAuthorization",
  "inheritsFrom",
  "inheritedFrom",
  "inheritance",
  "inheritedPermissionRef",
  "rawCredential",
  "token",
  "secret",
  "providerPayload",
  "sourceUrl",
  "sourcePath",
  "databaseLocator",
]);

const BROAD_SCOPE_VALUES = new Set([
  "all",
  "any",
  "all-operations",
  "all_operations",
  "all-services",
  "all_services",
]);

const OPAQUE_REFERENCE_PATTERN = /^[A-Za-z0-9._:-]+$/u;
const DISALLOWED_URI_SCHEME_PATTERN =
  /^(?:https?|ftp|mailto|data|javascript):/iu;
const MAX_OPAQUE_REFERENCE_LENGTH = 128;

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return value;
  }

  seen.add(value);

  Reflect.ownKeys(Object.getOwnPropertyDescriptors(value)).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);

    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value, seen);
    }
  });

  Object.freeze(value);
  return value;
}

function makeError(code, path) {
  return { code, path };
}

function makeResult(valid, errors) {
  return deepFreeze({
    valid,
    contractKind: CONTRACT_NAME,
    version: CONTRACT_VERSION,
    errors,
  });
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  try {
    return Object.getPrototypeOf(value) === Object.prototype;
  } catch (_error) {
    return false;
  }
}

function getOwnDescriptors(value) {
  try {
    return Object.getOwnPropertyDescriptors(value);
  } catch (_error) {
    return null;
  }
}

function enumerableKeysFromDescriptors(descriptors) {
  return Object.keys(descriptors).filter((key) => descriptors[key].enumerable);
}

function hasOwnEnumerableDataKey(descriptors, key) {
  return (
    Object.prototype.hasOwnProperty.call(descriptors, key) &&
    descriptors[key].enumerable === true &&
    Object.prototype.hasOwnProperty.call(descriptors[key], "value")
  );
}

function getOwnEnumerableDataValue(descriptors, key) {
  if (!hasOwnEnumerableDataKey(descriptors, key)) {
    return undefined;
  }

  return descriptors[key].value;
}

function validateFixedEnum(value, expected) {
  if (typeof value !== "string") {
    return "INVALID_TYPE";
  }

  if (value !== expected) {
    return "INVALID_ENUM";
  }

  return null;
}

function validateLifecyclePosture(value) {
  if (typeof value !== "string") {
    return "INVALID_TYPE";
  }

  if (!LIFECYCLE_POSTURES.includes(value)) {
    return "INVALID_ENUM";
  }

  return null;
}

function validateHumanProfessionalReviewRequired(value) {
  if (typeof value !== "boolean" || value !== true) {
    return "INVALID_BOOLEAN";
  }

  return null;
}

function validateOpaqueReference(value) {
  if (typeof value !== "string") {
    return "INVALID_TYPE";
  }

  if (value.includes("*")) {
    return "PROHIBITED_WILDCARD";
  }

  if (BROAD_SCOPE_VALUES.has(value.toLowerCase())) {
    return "PROHIBITED_BROAD_SCOPE";
  }

  if (
    value.length === 0 ||
    value.length > MAX_OPAQUE_REFERENCE_LENGTH ||
    value.trim() !== value ||
    value === "." ||
    value === ".." ||
    value.includes("/") ||
    value.includes("\\") ||
    value.includes("?") ||
    value.includes("#") ||
    DISALLOWED_URI_SCHEME_PATTERN.test(value) ||
    !OPAQUE_REFERENCE_PATTERN.test(value)
  ) {
    return "INVALID_OPAQUE_REFERENCE";
  }

  return null;
}

function validateLocalServicePermissionCurrentStateEvidence(value) {
  if (!isPlainObject(value)) {
    return makeResult(false, [makeError("INVALID_TYPE", "$")]);
  }

  const descriptors = getOwnDescriptors(value);

  if (descriptors === null) {
    return makeResult(false, [makeError("INVALID_TYPE", "$")]);
  }

  const errors = [];
  const enumerableKeys = enumerableKeysFromDescriptors(descriptors);

  TOP_LEVEL_FIELDS.forEach((field) => {
    if (!Object.prototype.hasOwnProperty.call(descriptors, field)) {
      errors.push(makeError("MISSING_FIELD", field));
      return;
    }

    if (!hasOwnEnumerableDataKey(descriptors, field)) {
      errors.push(makeError("INVALID_TYPE", field));
    }
  });

  const unexpectedFields = enumerableKeys
    .filter((field) => !TOP_LEVEL_FIELDS.includes(field))
    .sort();

  unexpectedFields
    .filter((field) => PROHIBITED_FIELDS.has(field))
    .forEach((field) => {
      errors.push(makeError("PROHIBITED_FIELD", field));
    });

  unexpectedFields
    .filter((field) => !PROHIBITED_FIELDS.has(field))
    .forEach((field) => {
      errors.push(makeError("UNKNOWN_FIELD", field));
    });

  [
    ["contractVersion", CONTRACT_VERSION],
    ["evidenceKind", CONTRACT_KIND],
    ["verificationPosture", VERIFICATION_POSTURE],
    ["permissionLifecyclePosture", LIFECYCLE_POSTURES],
  ].forEach(([field, expected]) => {
    if (!hasOwnEnumerableDataKey(descriptors, field)) {
      return;
    }

    const fieldValue = getOwnEnumerableDataValue(descriptors, field);
    const errorCode = Array.isArray(expected)
      ? validateLifecyclePosture(fieldValue)
      : validateFixedEnum(fieldValue, expected);

    if (errorCode) {
      errors.push(makeError(errorCode, field));
    }
  });

  OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    if (!hasOwnEnumerableDataKey(descriptors, field)) {
      return;
    }

    const errorCode = validateOpaqueReference(
      getOwnEnumerableDataValue(descriptors, field),
    );

    if (errorCode) {
      errors.push(makeError(errorCode, field));
    }
  });

  if (hasOwnEnumerableDataKey(descriptors, "humanProfessionalReviewRequired")) {
    const errorCode = validateHumanProfessionalReviewRequired(
      getOwnEnumerableDataValue(
        descriptors,
        "humanProfessionalReviewRequired",
      ),
    );

    if (errorCode) {
      errors.push(makeError(errorCode, "humanProfessionalReviewRequired"));
    }
  }

  if (
    hasOwnEnumerableDataKey(descriptors, "callerProcessRef") &&
    hasOwnEnumerableDataKey(descriptors, "serviceRecipientRef")
  ) {
    const callerProcessRef = getOwnEnumerableDataValue(
      descriptors,
      "callerProcessRef",
    );
    const serviceRecipientRef = getOwnEnumerableDataValue(
      descriptors,
      "serviceRecipientRef",
    );

    if (
      typeof callerProcessRef === "string" &&
      typeof serviceRecipientRef === "string" &&
      callerProcessRef === serviceRecipientRef
    ) {
      errors.push(
        makeError("INVALID_CROSS_FIELD_COMBINATION", "serviceRecipientRef"),
      );
    }
  }

  return makeResult(errors.length === 0, errors);
}

const LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_IDENTITY =
  deepFreeze({
    contractName: CONTRACT_NAME,
    version: CONTRACT_VERSION,
    evidenceKind: CONTRACT_KIND,
  });

const LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE =
  deepFreeze(
    Object.fromEntries([
      ...POSTURE_TRUE_FIELDS.map((field) => [field, true]),
      ...POSTURE_FALSE_FIELDS.map((field) => [field, false]),
    ]),
  );

const LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_TOP_LEVEL_FIELDS =
  deepFreeze([...TOP_LEVEL_FIELDS]);

const LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_OPAQUE_REFERENCE_FIELDS =
  deepFreeze([...OPAQUE_REFERENCE_FIELDS]);

const LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_LIFECYCLE_POSTURES =
  deepFreeze([...LIFECYCLE_POSTURES]);

const LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VERIFICATION_POSTURES =
  deepFreeze([...VERIFICATION_POSTURES]);

const LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VALIDATION_ERROR_CODES =
  deepFreeze([...VALIDATION_ERROR_CODES]);

module.exports = {
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_IDENTITY,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_TOP_LEVEL_FIELDS,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_LIFECYCLE_POSTURES,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VERIFICATION_POSTURES,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VALIDATION_ERROR_CODES,
  validateLocalServicePermissionCurrentStateEvidence,
};
