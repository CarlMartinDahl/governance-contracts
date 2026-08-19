"use strict";

const {
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY,
} = require("./rbac-role-permission-policy-evidence-contract.js");

const CONTRACT_NAME = "RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND = "RBAC_ROLE_PERMISSION_BINDING_EVIDENCE";
const VERIFICATION_POSTURE = "NOT_VERIFIED_BY_CONTRACT";

const RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_IDENTITY = deepFreeze({
  contractName: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  evidenceKind: CONTRACT_KIND,
});

const RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE = deepFreeze({
  contractOnly: true,
  proveOnly: true,
  schemaValidatorOnly: true,
  rolePermissionBindingEvidenceOnly: true,
  policyDefinitionBindingSeparated: true,
  bindingGrantSeparated: true,
  actorFieldsExcluded: true,
  actorRoleBindingExcluded: true,
  scopeFieldsExcluded: true,
  effectOverrideExcluded: true,
  wildcardsProhibited: true,
  humanProfessionalReviewRequired: true,
  authenticationCreated: false,
  identityVerificationCreated: false,
  authoritativeActorIdentityCreated: false,
  authoritativeActorTypeCreated: false,
  actorRoleBindingImported: false,
  actorRoleBindingCreated: false,
  actorRoleAssignmentCreated: false,
  roleAuthorityCreated: false,
  roleReferenceResolved: false,
  permissionAuthorityCreated: false,
  permissionReferenceResolved: false,
  permissionAssignmentCreated: false,
  policyAuthorityCreated: false,
  policyReferenceResolved: false,
  policyVersionVerified: false,
  policyProvenanceVerified: false,
  policyLifecycleVerified: false,
  bindingAuthorityCreated: false,
  bindingIssuerVerified: false,
  bindingProvenanceVerified: false,
  bindingVersionVerified: false,
  bindingLifecycleVerified: false,
  authoritativeRolePermissionBindingCreated: false,
  rolePermissionAssignmentCreated: false,
  permissionGrantCreated: false,
  directGrantCreated: false,
  directDenialAuthorityCreated: false,
  effectOverrideCreated: false,
  denyPrecedenceExecuted: false,
  conflictResolutionCreated: false,
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

const RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS = deepFreeze([
  "contractVersion",
  "evidenceKind",
  "verificationPosture",
  "evidenceId",
  "bindingId",
  "bindingVersion",
  "bindingIssuerRef",
  "bindingProvenanceRef",
  "bindingLifecyclePosture",
  "policyEvidenceKind",
  "policyEvidenceContractVersion",
  "policyEvidenceRef",
  "policyId",
  "policyVersion",
  "roleId",
  "roleDefinitionVersion",
  "permissionId",
  "permissionDefinitionVersion",
  "humanProfessionalReviewRequired",
]);

const RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_BINDING_LIFECYCLE_POSTURES =
  deepFreeze([
    "ROLE_PERMISSION_BINDING_DECLARED_ACTIVE",
    "ROLE_PERMISSION_BINDING_DECLARED_INACTIVE",
    "ROLE_PERMISSION_BINDING_DECLARED_REVOKED",
  ]);

const RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VALIDATION_ERROR_CODES =
  deepFreeze([
    "INVALID_TYPE",
    "MISSING_FIELD",
    "UNKNOWN_FIELD",
    "INVALID_ENUM",
    "INVALID_OPAQUE_REFERENCE",
    "INVALID_BOOLEAN",
  ]);

const RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VERIFICATION_POSTURES =
  deepFreeze(["NOT_VERIFIED_BY_CONTRACT"]);

const OPAQUE_REFERENCE_FIELDS = deepFreeze([
  "evidenceId",
  "bindingId",
  "bindingVersion",
  "bindingIssuerRef",
  "bindingProvenanceRef",
  "policyEvidenceRef",
  "policyId",
  "policyVersion",
  "roleId",
  "roleDefinitionVersion",
  "permissionId",
  "permissionDefinitionVersion",
]);

const EXACT_VALUE_FIELDS = deepFreeze({
  contractVersion: CONTRACT_VERSION,
  evidenceKind: CONTRACT_KIND,
  verificationPosture: VERIFICATION_POSTURE,
  policyEvidenceKind:
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY.evidenceKind,
  policyEvidenceContractVersion:
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY.version,
});

const OPAQUE_REFERENCE_PATTERN = /^[A-Za-z0-9._:-]{1,128}$/;
const DANGEROUS_SCHEME_PATTERN =
  /^(?:https?|ftp|file|mailto|data|javascript):/i;

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

function makeResult(valid, errors) {
  return deepFreeze({
    valid,
    contractKind: CONTRACT_KIND,
    version: CONTRACT_VERSION,
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

function hasDataKey(descriptors, key) {
  if (!Object.prototype.hasOwnProperty.call(descriptors, key)) {
    return false;
  }
  const descriptor = descriptors[key];
  return Boolean(descriptor && descriptor.enumerable && "value" in descriptor);
}

function getDataValue(descriptors, key) {
  if (!Object.prototype.hasOwnProperty.call(descriptors, key)) {
    return undefined;
  }
  const descriptor = descriptors[key];
  return descriptor && descriptor.enumerable && "value" in descriptor
    ? descriptor.value
    : undefined;
}

function fieldPath(field) {
  return `$.${field}`;
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

function validateRbacRolePermissionBindingEvidence(input) {
  try {
    if (!isPlainObject(input)) {
      return makeResult(false, [makeError("INVALID_TYPE", "$")]);
    }

    const descriptors = getDescriptors(input);
    if (!descriptors) {
      return makeResult(false, [makeError("INVALID_TYPE", "$")]);
    }

    const errors = [];
    const enumerableKeys = Object.keys(descriptors).filter(
      (key) => descriptors[key].enumerable,
    );

    for (const field of RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS) {
      if (!Object.prototype.hasOwnProperty.call(descriptors, field)) {
        pushError(errors, "MISSING_FIELD", fieldPath(field));
        continue;
      }

      const descriptor = descriptors[field];
      if (!descriptor.enumerable || !("value" in descriptor)) {
        pushError(errors, "INVALID_TYPE", fieldPath(field));
      }
    }

    const unknownFields = enumerableKeys
      .filter(
        (field) =>
          !RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS.includes(
            field,
          ),
      )
      .sort();
    for (const field of unknownFields) {
      pushError(errors, "UNKNOWN_FIELD", fieldPath(field));
    }

    for (const field of RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS) {
      if (!hasDataKey(descriptors, field)) {
        continue;
      }

      const value = getDataValue(descriptors, field);
      const path = fieldPath(field);

      if (OPAQUE_REFERENCE_FIELDS.includes(field)) {
        validateOpaqueReference(value, errors, path);
      } else if (field === "bindingLifecyclePosture") {
        if (typeof value !== "string") {
          pushError(errors, "INVALID_TYPE", path);
        } else if (
          !RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_BINDING_LIFECYCLE_POSTURES.includes(
            value,
          )
        ) {
          pushError(errors, "INVALID_ENUM", path);
        }
      } else if (field === "humanProfessionalReviewRequired") {
        if (value !== true) {
          pushError(errors, "INVALID_BOOLEAN", path);
        }
      } else if (Object.prototype.hasOwnProperty.call(EXACT_VALUE_FIELDS, field)) {
        if (typeof value !== "string") {
          pushError(errors, "INVALID_TYPE", path);
        } else if (value !== EXACT_VALUE_FIELDS[field]) {
          pushError(errors, "INVALID_ENUM", path);
        }
      }
    }

    return makeResult(errors.length === 0, errors);
  } catch (_error) {
    return makeResult(false, [makeError("INVALID_TYPE", "$")]);
  }
}

module.exports = {
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_BINDING_LIFECYCLE_POSTURES,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VALIDATION_ERROR_CODES,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VERIFICATION_POSTURES,
  validateRbacRolePermissionBindingEvidence,
};
