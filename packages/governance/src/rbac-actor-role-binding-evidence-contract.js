"use strict";

const {
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_KIND,
} = require("./authenticated-actor-identity-evidence-contract.js");
const {
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY,
} = require("./rbac-role-permission-policy-evidence-contract.js");

const CONTRACT_NAME = "RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND = "RBAC_ACTOR_ROLE_BINDING_EVIDENCE";
const VERIFICATION_POSTURE = "NOT_VERIFIED_BY_CONTRACT";

const RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT_IDENTITY = deepFreeze({
  contractName: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  evidenceKind: CONTRACT_KIND,
});

const RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS = deepFreeze([
  "contractVersion",
  "evidenceKind",
  "verificationPosture",
  "evidenceId",
  "bindingId",
  "bindingVersion",
  "bindingIssuerRef",
  "bindingProvenanceRef",
  "bindingLifecyclePosture",
  "actorIdentityEvidenceKind",
  "actorIdentityEvidenceContractVersion",
  "actorIdentityEvidenceRef",
  "policyEvidenceKind",
  "policyEvidenceContractVersion",
  "policyEvidenceRef",
  "policyId",
  "policyVersion",
  "roleId",
  "roleDefinitionVersion",
  "humanProfessionalReviewRequired",
]);

const RBAC_ACTOR_ROLE_BINDING_EVIDENCE_OPAQUE_REFERENCE_FIELDS = deepFreeze([
  "evidenceId",
  "bindingId",
  "bindingVersion",
  "bindingIssuerRef",
  "bindingProvenanceRef",
  "actorIdentityEvidenceRef",
  "policyEvidenceRef",
  "policyId",
  "policyVersion",
  "roleId",
  "roleDefinitionVersion",
]);

const RBAC_ACTOR_ROLE_BINDING_EVIDENCE_LIFECYCLE_POSTURES = deepFreeze([
  "ACTOR_ROLE_BINDING_DECLARED_ACTIVE",
  "ACTOR_ROLE_BINDING_DECLARED_INACTIVE",
  "ACTOR_ROLE_BINDING_DECLARED_REVOKED",
]);

const RBAC_ACTOR_ROLE_BINDING_EVIDENCE_VALIDATION_ERROR_CODES = deepFreeze([
  "INVALID_TYPE",
  "MISSING_FIELD",
  "UNKNOWN_FIELD",
  "INVALID_ENUM",
  "INVALID_OPAQUE_REFERENCE",
  "INVALID_BOOLEAN",
]);

const RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS = deepFreeze({
  actorIdentityEvidenceKind:
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_KIND,
  actorIdentityEvidenceContractVersion:
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY.version,
  policyEvidenceKind:
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY.evidenceKind,
  policyEvidenceContractVersion:
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY.version,
});

const RBAC_ACTOR_ROLE_BINDING_EVIDENCE_SCHEMA = deepFreeze({
  requiredFields: RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS,
  opaqueReferenceFields:
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  lifecyclePostures: RBAC_ACTOR_ROLE_BINDING_EVIDENCE_LIFECYCLE_POSTURES,
  validationErrorCodes:
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_VALIDATION_ERROR_CODES,
});

const RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE = deepFreeze({
  contractOnly: true,
  proveOnly: true,
  schemaValidatorOnly: true,
  actorRoleBindingEvidenceOnly: true,
  actorTypeRoleCategorySeparated: true,
  sourceProvenanceSeparated: true,
  scopeFieldsExcluded: true,
  rolePermissionBindingExcluded: true,
  directGrantExcluded: true,
  humanProfessionalReviewRequired: true,
  authenticationCreated: false,
  identityVerificationCreated: false,
  authoritativeActorIdentityCreated: false,
  authoritativeActorTypeCreated: false,
  actorIdentityReferenceResolved: false,
  roleAuthorityCreated: false,
  roleReferenceResolved: false,
  roleDefinitionConsistencyVerified: false,
  policyAuthorityCreated: false,
  policyReferenceResolved: false,
  policyVersionVerified: false,
  policyProvenanceVerified: false,
  bindingAuthorityCreated: false,
  bindingIssuerVerified: false,
  bindingProvenanceVerified: false,
  bindingVersionVerified: false,
  bindingLifecycleVerified: false,
  actorRoleAssignmentCreated: false,
  authoritativeActorRoleBindingCreated: false,
  actorRoleBindingActivated: false,
  rolePermissionBindingCreated: false,
  permissionGrantCreated: false,
  directGrantCreated: false,
  directDenialAuthorityCreated: false,
  roleInheritanceCreated: false,
  delegationCreated: false,
  impersonationCreated: false,
  breakGlassCreated: false,
  adminDesignationCreated: false,
  supportDesignationCreated: false,
  serviceSystemDesignationCreated: false,
  professionalQualificationVerified: false,
  humanReviewCompleted: false,
  approvalCreated: false,
  scopeAuthorityCreated: false,
  scopeMembershipCreated: false,
  scopeOwnershipCreated: false,
  authorizationDecisionCreated: false,
  allowCapableDecisionCreated: false,
  accessGrantCreated: false,
  runtimeLookupCreated: false,
  registryLookupCreated: false,
  policyResolverCreated: false,
  dynamicResolutionCreated: false,
  validatorDispatchCreated: false,
  routeIntegrationCreated: false,
  middlewareCreated: false,
  persistenceCreated: false,
  auditEventEmitted: false,
  auditStorageCreated: false,
  providerRouteAuthorized: false,
  externalUseAuthorized: false,
  productCandidateSelected: false,
  releaseApprovalCreated: false,
  blockerClosureCreated: false,
  technicalSignOffCreated: false,
  runtimeCertificationCreated: false,
});

const PROHIBITED_FIELD_KEYS = deepFreeze([
  "actorId",
  "actorType",
  "actorCategory",
  "subjectId",
  "subjectRef",
  "principalId",
  "sessionId",
  "tokenId",
  "certificateId",
  "credentialId",
  "issuerVerified",
  "subjectVerified",
  "identityVerified",
  "authenticated",
  "authenticationResult",
  "currentRequestBinding",
  "currentRequestBindingVerified",
  "roleCategory",
  "actorRoleAssignment",
  "assignedRole",
  "assignedRoleCategory",
  "roleAuthority",
  "roleResolved",
  "permissionId",
  "permissionIds",
  "permissionCategory",
  "permissions",
  "permissionGrant",
  "permissionGrants",
  "rolePermissionBinding",
  "policyEffect",
  "effectDeclaration",
  "defaultEffectDeclaration",
  "denyPrecedence",
  "wildcardsAllowed",
  "professionalReviewQualificationRef",
  "professionalQualification",
  "professionalQualified",
  "reviewerQualification",
  "reviewCompleted",
  "reviewerApproved",
  "humanReviewCompleted",
  "approval",
  "approved",
  "signOff",
  "adminDesignation",
  "adminApproved",
  "supportDesignation",
  "supportApproved",
  "serviceDesignation",
  "serviceAuthorized",
  "systemAuthority",
  "privilegedActor",
  "privilegedRole",
  "impersonation",
  "delegation",
  "breakGlass",
  "emergencyAccess",
  "bypass",
  "humanReviewBypass",
  "scopeContext",
  "scopeDimensions",
  "tenantId",
  "caseId",
  "objectId",
  "functionId",
  "propertyId",
  "tenantMembership",
  "caseMembership",
  "objectAccess",
  "functionAccess",
  "propertyAccess",
  "scopeOwnership",
  "scopeAuthority",
  "crossTenant",
  "crossCase",
  "wildcardScope",
  "assignment",
  "assigned",
  "authoritativeBinding",
  "bindingAuthority",
  "bindingActivated",
  "bindingVerified",
  "grant",
  "grants",
  "granted",
  "directGrant",
  "directDenial",
  "permissionDenial",
  "authorized",
  "authorization",
  "authorizationResult",
  "allowed",
  "accessGranted",
  "accessDecision",
  "accessResult",
  "routeAuthorized",
  "providerRouteAuthorized",
  "externalUseAuthorized",
  "blockerClosureCreated",
]);

const EXACT_VALUE_FIELDS = deepFreeze({
  contractVersion: CONTRACT_VERSION,
  evidenceKind: CONTRACT_KIND,
  verificationPosture: VERIFICATION_POSTURE,
  actorIdentityEvidenceKind:
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS
      .actorIdentityEvidenceKind,
  actorIdentityEvidenceContractVersion:
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS
      .actorIdentityEvidenceContractVersion,
  policyEvidenceKind:
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS
      .policyEvidenceKind,
  policyEvidenceContractVersion:
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS
      .policyEvidenceContractVersion,
});

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
    if (Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value, active);
    }
  }
  active.delete(value);
  return value;
}

function makeError(code, path) {
  return deepFreeze({ code, path });
}

function pushError(errors, code, path) {
  errors.push(makeError(code, path));
}

function makeResult(valid, version, errors) {
  return deepFreeze({
    valid,
    contractKind: CONTRACT_KIND,
    version,
    errors: errors.slice(),
  });
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

function getDescriptors(value) {
  try {
    return Object.getOwnPropertyDescriptors(value);
  } catch (_error) {
    return null;
  }
}

function getDataValue(descriptors, key) {
  const descriptor = descriptors[key];
  return descriptor && descriptor.enumerable && "value" in descriptor
    ? descriptor.value
    : undefined;
}

function hasDataKey(descriptors, key) {
  const descriptor = descriptors[key];
  return Boolean(descriptor && descriptor.enumerable && "value" in descriptor);
}

function fieldPath(field) {
  return `$.${field}`;
}

function versionForResult(descriptors) {
  return getDataValue(descriptors, "contractVersion") === CONTRACT_VERSION
    ? CONTRACT_VERSION
    : null;
}

function validateOpaqueReference(value, errors, path) {
  if (typeof value !== "string") {
    pushError(errors, "INVALID_TYPE", path);
    return;
  }

  if (
    value.length === 0 ||
    value.length > 128 ||
    value.trim() !== value ||
    /\s/.test(value) ||
    value === "." ||
    value === ".." ||
    /[*\\/?#]/.test(value) ||
    DANGEROUS_SCHEME_PATTERN.test(value) ||
    !OPAQUE_REFERENCE_PATTERN.test(value)
  ) {
    pushError(errors, "INVALID_OPAQUE_REFERENCE", path);
  }
}

function validateRbacActorRoleBindingEvidence(input) {
  try {
    if (!isPlainObject(input)) {
      return makeResult(false, null, [makeError("INVALID_TYPE", "$")]);
    }

    const descriptors = getDescriptors(input);
    if (!descriptors) {
      return makeResult(false, null, [makeError("INVALID_TYPE", "$")]);
    }

    const errors = [];
    const enumerableKeys = Object.keys(descriptors).filter(
      (key) => descriptors[key].enumerable,
    );

    for (const field of RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS) {
      const descriptor = descriptors[field];
      if (!descriptor) {
        pushError(errors, "MISSING_FIELD", fieldPath(field));
      } else if (!descriptor.enumerable || !("value" in descriptor)) {
        pushError(errors, "INVALID_TYPE", fieldPath(field));
      }
    }

    const unknownFields = enumerableKeys
      .filter(
        (field) =>
          !RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS.includes(field),
      )
      .sort();
    for (const field of unknownFields) {
      pushError(errors, "UNKNOWN_FIELD", fieldPath(field));
    }

    for (const field of RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS) {
      if (!hasDataKey(descriptors, field)) {
        continue;
      }

      const value = getDataValue(descriptors, field);
      const path = fieldPath(field);

      if (
        RBAC_ACTOR_ROLE_BINDING_EVIDENCE_OPAQUE_REFERENCE_FIELDS.includes(field)
      ) {
        validateOpaqueReference(value, errors, path);
      } else if (field === "bindingLifecyclePosture") {
        if (!RBAC_ACTOR_ROLE_BINDING_EVIDENCE_LIFECYCLE_POSTURES.includes(value)) {
          pushError(errors, "INVALID_ENUM", path);
        }
      } else if (field === "humanProfessionalReviewRequired") {
        if (value !== true) {
          pushError(errors, "INVALID_BOOLEAN", path);
        }
      } else if (Object.prototype.hasOwnProperty.call(EXACT_VALUE_FIELDS, field)) {
        if (value !== EXACT_VALUE_FIELDS[field]) {
          pushError(errors, "INVALID_ENUM", path);
        }
      }
    }

    const valid = errors.length === 0;
    return makeResult(valid, versionForResult(descriptors), errors);
  } catch (_error) {
    return makeResult(false, null, [makeError("INVALID_TYPE", "$")]);
  }
}

module.exports = {
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_LIFECYCLE_POSTURES,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_SCHEMA,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_VALIDATION_ERROR_CODES,
  PROHIBITED_FIELD_KEYS,
  validateRbacActorRoleBindingEvidence,
};
