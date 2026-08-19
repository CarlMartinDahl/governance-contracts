"use strict";

const {
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS,
} = require("./rbac-admin-support-authorization-context-contract.js");

const CONTRACT_NAME =
  "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND = "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE";
const VERIFICATION_POSTURE = "NOT_VERIFIED_BY_CONTRACT";

const TOP_LEVEL_FIELDS = [
  "contractVersion",
  "evidenceKind",
  "verificationPosture",
  "evidenceId",
  "membershipId",
  "membershipVersion",
  "membershipIssuerRef",
  "membershipProvenanceRef",
  "membershipLifecyclePosture",
  "subjectRef",
  "tenantRef",
  "caseRef",
  "humanProfessionalReviewRequired",
];

const OPAQUE_REFERENCE_FIELDS = [
  "evidenceId",
  "membershipId",
  "membershipVersion",
  "membershipIssuerRef",
  "membershipProvenanceRef",
  "subjectRef",
  "tenantRef",
  "caseRef",
];

const MEMBERSHIP_LIFECYCLE_POSTURES = [
  "TENANT_CASE_SCOPE_MEMBERSHIP_DECLARED_ACTIVE",
  "TENANT_CASE_SCOPE_MEMBERSHIP_DECLARED_INACTIVE",
  "TENANT_CASE_SCOPE_MEMBERSHIP_DECLARED_REVOKED",
];

const VALIDATION_ERROR_CODES = [
  "INVALID_TYPE",
  "MISSING_FIELD",
  "UNKNOWN_FIELD",
  "INVALID_ENUM",
  "INVALID_OPAQUE_REFERENCE",
  "INVALID_BOOLEAN",
];

const VERIFICATION_POSTURES = [VERIFICATION_POSTURE];

const POSTURE_TRUE_FIELDS = [
  "contractOnly",
  "proveOnly",
  "schemaValidatorOnly",
  "tenantCaseScopeMembershipEvidenceOnly",
  "subjectReferenceGeneric",
  "tenantCaseMembershipPaired",
  "objectOwnershipSeparated",
  "functionPropertyAccessSeparated",
  "scopeAuthoritySeparated",
  "lifecycleDeclarationsOnly",
  "wildcardsProhibited",
  "humanProfessionalReviewRequired",
];

const POSTURE_FALSE_FIELDS = [
  "authenticationCreated",
  "identityVerificationCreated",
  "authoritativeActorIdentityCreated",
  "authoritativeActorTypeCreated",
  "actorRoleCompositionCreated",
  "subjectResolved",
  "tenantMembershipAuthorityCreated",
  "caseMembershipAuthorityCreated",
  "authoritativeMembershipCreated",
  "membershipIssuerVerified",
  "membershipProvenanceVerified",
  "membershipVersionVerified",
  "membershipLifecycleVerified",
  "currentMembershipVerified",
  "resourcePlacementCreated",
  "resourceOwnershipCreated",
  "objectAccessCreated",
  "functionAccessCreated",
  "propertyAccessCreated",
  "scopeAuthorityCreated",
  "scopeBindingCreated",
  "wrongTenantDeterminationCreated",
  "wrongCaseDeterminationCreated",
  "roleAuthorityCreated",
  "permissionAuthorityCreated",
  "policyAuthorityCreated",
  "bindingAuthorityCreated",
  "actorRoleAssignmentCreated",
  "rolePermissionAssignmentCreated",
  "permissionGrantCreated",
  "directGrantCreated",
  "directDenialAuthorityCreated",
  "effectExecutionCreated",
  "denyPrecedenceExecuted",
  "conflictResolutionCreated",
  "authorizationDecisionCreated",
  "allowCapableDecisionCreated",
  "accessGrantCreated",
  "runtimeLookupCreated",
  "registryLookupCreated",
  "dynamicResolutionCreated",
  "validatorDispatchCreated",
  "routeIntegrationCreated",
  "middlewareCreated",
  "persistenceCreated",
  "auditEventEmitted",
  "auditStorageCreated",
  "adminDesignationCreated",
  "supportDesignationCreated",
  "serviceSystemDesignationCreated",
  "professionalQualificationVerified",
  "humanReviewCompleted",
  "approvalCreated",
  "delegationCreated",
  "impersonationCreated",
  "breakGlassCreated",
  "providerRouteAuthorized",
  "externalUseAuthorized",
  "productCandidateSelected",
  "releaseApprovalCreated",
  "blockerClosureCreated",
  "technicalSignOffCreated",
  "runtimeCertificationCreated",
];

const OPAQUE_REFERENCE_PATTERN = /^[A-Za-z0-9._:-]+$/u;
const DISALLOWED_URI_SCHEME_PATTERN =
  /^(?:https?|ftp|mailto|data|javascript):/iu;
const MAX_OPAQUE_REFERENCE_LENGTH = 128;

function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Reflect.ownKeys(value).forEach((key) => {
      deepFreeze(value[key]);
    });
    Object.freeze(value);
  }

  return value;
}

function makeResult(valid, errors) {
  return deepFreeze({
    valid,
    contractKind: CONTRACT_KIND,
    version: CONTRACT_VERSION,
    errors,
  });
}

function makeError(code, path) {
  return { code, path };
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

function validateOpaqueReference(value) {
  if (typeof value !== "string") {
    return "INVALID_TYPE";
  }

  if (
    value.length === 0 ||
    value.length > MAX_OPAQUE_REFERENCE_LENGTH ||
    value.trim() !== value ||
    value === "." ||
    value === ".." ||
    value.includes("*") ||
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

  if (!MEMBERSHIP_LIFECYCLE_POSTURES.includes(value)) {
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

function validateRbacTenantCaseScopeMembershipEvidence(value) {
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

  enumerableKeys
    .filter((field) => !TOP_LEVEL_FIELDS.includes(field))
    .sort()
    .forEach((field) => {
      errors.push(makeError("UNKNOWN_FIELD", field));
    });

  [
    ["contractVersion", CONTRACT_VERSION],
    ["evidenceKind", CONTRACT_KIND],
    ["verificationPosture", VERIFICATION_POSTURE],
  ].forEach(([field, expected]) => {
    if (!hasOwnEnumerableDataKey(descriptors, field)) {
      return;
    }

    const errorCode = validateFixedEnum(
      getOwnEnumerableDataValue(descriptors, field),
      expected,
    );

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

  if (hasOwnEnumerableDataKey(descriptors, "membershipLifecyclePosture")) {
    const errorCode = validateLifecyclePosture(
      getOwnEnumerableDataValue(descriptors, "membershipLifecyclePosture"),
    );

    if (errorCode) {
      errors.push(makeError(errorCode, "membershipLifecyclePosture"));
    }
  }

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

  return makeResult(errors.length === 0, errors);
}

const RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_IDENTITY = deepFreeze({
  contractName: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  evidenceKind: CONTRACT_KIND,
});

const RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE = deepFreeze(
  Object.fromEntries([
    ...POSTURE_TRUE_FIELDS.map((field) => [field, true]),
    ...POSTURE_FALSE_FIELDS.map((field) => [field, false]),
  ]),
);

const RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_TOP_LEVEL_FIELDS =
  deepFreeze([...TOP_LEVEL_FIELDS]);

const RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_SCOPE_DIMENSIONS = deepFreeze(
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS.filter(
    (dimension) => dimension === "TENANT" || dimension === "CASE",
  ),
);

const RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_MEMBERSHIP_LIFECYCLE_POSTURES =
  deepFreeze([...MEMBERSHIP_LIFECYCLE_POSTURES]);

const RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VALIDATION_ERROR_CODES =
  deepFreeze([...VALIDATION_ERROR_CODES]);

const RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VERIFICATION_POSTURES =
  deepFreeze([...VERIFICATION_POSTURES]);

module.exports = {
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_TOP_LEVEL_FIELDS,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_SCOPE_DIMENSIONS,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_MEMBERSHIP_LIFECYCLE_POSTURES,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VALIDATION_ERROR_CODES,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VERIFICATION_POSTURES,
  validateRbacTenantCaseScopeMembershipEvidence,
};
