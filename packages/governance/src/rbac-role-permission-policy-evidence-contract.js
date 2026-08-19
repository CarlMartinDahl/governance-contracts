"use strict";

const {
  permissionCategoryRegistry,
  roleCategoryRegistry,
} = require("./rbac-role-permission-deny-by-default-scaffold.js");
const {
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS,
} = require("./rbac-admin-support-authorization-context-contract.js");

const CONTRACT_NAME = "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND = "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE";

const RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY = deepFreeze({
  contractName: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  evidenceKind: CONTRACT_KIND,
});

const RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE = deepFreeze({
  contractOnly: true,
  proveOnly: true,
  schemaValidatorOnly: true,
  denyByDefaultDeclared: true,
  denyPrecedenceDeclared: true,
  wildcardsProhibited: true,
  actorTypeRoleCategorySeparated: true,
  sourceProvenanceSeparated: true,
  humanProfessionalReviewRequired: true,
  authenticationCreated: false,
  identityVerificationCreated: false,
  authoritativeActorTypeCreated: false,
  roleAuthorityCreated: false,
  permissionAuthorityCreated: false,
  policyAuthorityCreated: false,
  policyProvenanceVerified: false,
  policyVersionVerified: false,
  policyLifecycleVerified: false,
  actorRoleBindingCreated: false,
  rolePermissionBindingCreated: false,
  directGrantCreated: false,
  directDenialAuthorityCreated: false,
  roleInheritanceCreated: false,
  delegationCreated: false,
  impersonationCreated: false,
  breakGlassCreated: false,
  professionalQualificationVerified: false,
  scopeAuthorityCreated: false,
  scopeOwnershipCreated: false,
  authorizationDecisionCreated: false,
  allowCapableDecisionCreated: false,
  accessGrantCreated: false,
  runtimeLookupCreated: false,
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
  blockerClosureCreated: false,
  technicalSignOffCreated: false,
  runtimeCertificationCreated: false,
});

const RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_CATEGORIES = deepFreeze(
  Object.values(roleCategoryRegistry).map((entry) => entry.role_category),
);

const RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_CATEGORIES = deepFreeze(
  Object.values(permissionCategoryRegistry).map(
    (entry) => entry.permission_category,
  ),
);

const RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_SCOPE_DIMENSIONS = deepFreeze(
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS.slice(),
);

const RBAC_ROLE_PERMISSION_POLICY_LIFECYCLE_POSTURES = deepFreeze([
  "DECLARED_ACTIVE",
  "DECLARED_INACTIVE",
  "DECLARED_REVOKED",
]);

const RBAC_ROLE_PERMISSION_POLICY_EFFECT_DECLARATIONS = deepFreeze([
  "POLICY_EFFECT_ALLOW_DECLARATION",
  "POLICY_EFFECT_DENY_DECLARATION",
]);

const RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_VALIDATION_ERROR_CODES = deepFreeze([
  "INVALID_TYPE",
  "MISSING_FIELD",
  "UNKNOWN_FIELD",
  "INVALID_ENUM",
  "INVALID_OPAQUE_REFERENCE",
  "INVALID_BOOLEAN",
  "INVALID_ARRAY",
  "DUPLICATE_VALUE",
  "INVALID_CROSS_FIELD_COMBINATION",
]);

const RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_TOP_LEVEL_FIELDS = deepFreeze([
  "contractVersion",
  "evidenceKind",
  "evidenceId",
  "policyId",
  "policyVersion",
  "policyProvenanceRef",
  "policyLifecyclePosture",
  "defaultEffectDeclaration",
  "denyPrecedence",
  "wildcardsAllowed",
  "humanProfessionalReviewRequired",
  "roleDefinitions",
  "permissionDefinitions",
]);

const RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_DEFINITION_FIELDS = deepFreeze([
  "roleId",
  "roleCategory",
  "definitionVersion",
  "provenanceRef",
  "descriptionRef",
]);

const RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_DEFINITION_FIELDS =
  deepFreeze([
    "permissionId",
    "permissionCategory",
    "definitionVersion",
    "provenanceRef",
    "actionCategoryRef",
    "resourceCategoryRef",
    "materialClassRef",
    "scopeDimensions",
    "effectDeclaration",
  ]);

const TOP_LEVEL_OPAQUE_FIELDS = deepFreeze([
  "evidenceId",
  "policyId",
  "policyVersion",
  "policyProvenanceRef",
]);

const ROLE_OPAQUE_FIELDS = deepFreeze([
  "roleId",
  "definitionVersion",
  "provenanceRef",
  "descriptionRef",
]);

const PERMISSION_OPAQUE_FIELDS = deepFreeze([
  "permissionId",
  "definitionVersion",
  "provenanceRef",
  "actionCategoryRef",
  "resourceCategoryRef",
  "materialClassRef",
]);

const ROLE_PROHIBITED_FIELDS = deepFreeze([
  "actorId",
  "actorType",
  "subjectRef",
  "tenantId",
  "caseId",
  "objectId",
  "functionId",
  "propertyId",
  "permissions",
  "permissionIds",
  "permissionGrants",
  "actorRoleBinding",
  "rolePermissionBinding",
  "grant",
  "grants",
  "approval",
  "authorized",
  "accessGranted",
  "inheritance",
  "parentRole",
  "delegatedFrom",
  "impersonation",
  "breakGlass",
  "professionalReviewQualificationRef",
]);

const PERMISSION_PROHIBITED_FIELDS = deepFreeze([
  "actorId",
  "actorType",
  "roleId",
  "roleIds",
  "roleCategory",
  "tenantId",
  "caseId",
  "objectId",
  "functionId",
  "propertyId",
  "actorRoleBinding",
  "rolePermissionBinding",
  "grant",
  "grants",
  "approval",
  "authorized",
  "accessGranted",
  "providerRouteAuthorized",
  "externalUseAuthorized",
  "reviewCompleted",
  "reviewerApproved",
]);

const TOP_LEVEL_AUTHORITY_FIELDS = deepFreeze([
  "serverProduced",
  "verified",
  "authoritative",
  "approved",
  "authorized",
  "accessGranted",
  "authorizationDecision",
  "grant",
  "grants",
]);

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

function isDescriptorSafePlainObject(value) {
  return isPlainObject(value);
}

function isDescriptorSafeArray(value) {
  try {
    return Array.isArray(value);
  } catch (_error) {
    return false;
  }
}

function getDescriptor(value, key) {
  try {
    return Object.getOwnPropertyDescriptor(value, key);
  } catch (_error) {
    return null;
  }
}

function getDescriptors(value) {
  try {
    return Object.getOwnPropertyDescriptors(value);
  } catch (_error) {
    return null;
  }
}

function dataKeys(value) {
  const descriptors = getDescriptors(value);
  if (!descriptors) {
    return null;
  }

  return Object.entries(descriptors)
    .filter(([, descriptor]) => descriptor.enumerable && "value" in descriptor)
    .map(([key]) => key);
}

function hasDataKey(value, key) {
  const descriptor = getDescriptor(value, key);
  return Boolean(descriptor && descriptor.enumerable && "value" in descriptor);
}

function hasOwnKey(value, key) {
  return Boolean(getDescriptor(value, key));
}

function getDataValue(value, key) {
  const descriptor = getDescriptor(value, key);
  return descriptor && descriptor.enumerable && "value" in descriptor
    ? descriptor.value
    : undefined;
}

function fieldPath(basePath, field) {
  return `${basePath}.${field}`;
}

function indexPath(basePath, index) {
  return `${basePath}[${index}]`;
}

function versionForResult(input) {
  return isPlainObject(input) &&
    getDataValue(input, "contractVersion") === CONTRACT_VERSION
    ? CONTRACT_VERSION
    : null;
}

function validatePlainObject(value, errors, path, activePath) {
  if (!isDescriptorSafePlainObject(value)) {
    pushError(errors, "INVALID_TYPE", path);
    return false;
  }
  if (activePath.has(value)) {
    pushError(errors, "INVALID_TYPE", path);
    return false;
  }
  return true;
}

function validateExactFields(value, expectedFields, errors, path) {
  const descriptors = getDescriptors(value);
  if (!descriptors) {
    pushError(errors, "INVALID_TYPE", path);
    return;
  }
  const keys = Object.keys(descriptors).filter(
    (key) => descriptors[key].enumerable,
  );
  const dataOnlyKeys = keys.filter((key) => "value" in descriptors[key]);

  for (const field of expectedFields) {
    const descriptor = getDescriptor(value, field);
    if (!descriptor) {
      pushError(errors, "MISSING_FIELD", fieldPath(path, field));
    } else if (!descriptor.enumerable || !("value" in descriptor)) {
      pushError(errors, "INVALID_TYPE", fieldPath(path, field));
    }
  }

  const unknownFields = keys
    .filter((key) => !expectedFields.includes(key))
    .sort();
  for (const field of unknownFields) {
    pushError(errors, "UNKNOWN_FIELD", fieldPath(path, field));
  }

  if (
    dataOnlyKeys.length === expectedFields.length &&
    expectedFields.every((field, index) => dataOnlyKeys[index] === field)
  ) {
    return;
  }

  if (expectedFields.every((field) => dataOnlyKeys.includes(field))) {
    pushError(errors, "INVALID_CROSS_FIELD_COMBINATION", path);
  }
}

function validateNoProhibitedFields(value, fields, errors, path) {
  for (const field of fields) {
    if (hasOwnKey(value, field)) {
      pushError(errors, "UNKNOWN_FIELD", fieldPath(path, field));
    }
  }
}

function validateExactValue(value, expected, errors, path) {
  if (value !== expected) {
    pushError(errors, "INVALID_ENUM", path);
  }
}

function validateBooleanValue(value, expected, errors, path) {
  if (typeof value !== "boolean") {
    pushError(errors, "INVALID_BOOLEAN", path);
  } else if (value !== expected) {
    pushError(errors, "INVALID_CROSS_FIELD_COMBINATION", path);
  }
}

function validateEnum(value, allowed, errors, path) {
  if (!allowed.includes(value)) {
    pushError(errors, "INVALID_ENUM", path);
  }
}

function validateOpaqueReference(value, errors, path) {
  if (value && typeof value === "object") {
    pushError(errors, "INVALID_TYPE", path);
    return;
  }

  if (
    typeof value !== "string" ||
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

function validateOpaqueFields(value, fields, errors, path) {
  for (const field of fields) {
    if (hasDataKey(value, field)) {
      validateOpaqueReference(getDataValue(value, field), errors, fieldPath(path, field));
    }
  }
}

function validateDenseArray(value, errors, path, activePath) {
  if (!isDescriptorSafeArray(value)) {
    pushError(errors, "INVALID_ARRAY", path);
    return false;
  }
  if (activePath.has(value)) {
    pushError(errors, "INVALID_TYPE", path);
    return false;
  }

  const descriptors = getDescriptors(value);
  if (!descriptors) {
    pushError(errors, "INVALID_ARRAY", path);
    return false;
  }

  for (let index = 0; index < value.length; index += 1) {
    const descriptor = descriptors[String(index)];
    if (!descriptor || !descriptor.enumerable || !("value" in descriptor)) {
      pushError(errors, "INVALID_ARRAY", indexPath(path, index));
    }
  }

  return true;
}

function validateNonEmptyArray(value, errors, path, activePath) {
  if (!validateDenseArray(value, errors, path, activePath)) {
    return false;
  }
  if (value.length === 0) {
    pushError(errors, "INVALID_ARRAY", path);
  }
  return true;
}

function validateRoleDefinitions(value, errors, activePath) {
  const path = "$.roleDefinitions";
  if (!validateNonEmptyArray(value, errors, path, activePath)) {
    return;
  }

  const seenRoleIds = new Set();
  activePath.add(value);
  for (let index = 0; index < value.length; index += 1) {
    const itemPath = indexPath(path, index);
    const roleDefinition = getDataValue(value, String(index));
    if (!validatePlainObject(roleDefinition, errors, itemPath, activePath)) {
      continue;
    }

    activePath.add(roleDefinition);
    validateExactFields(
      roleDefinition,
      RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_DEFINITION_FIELDS,
      errors,
      itemPath,
    );
    validateNoProhibitedFields(roleDefinition, ROLE_PROHIBITED_FIELDS, errors, itemPath);
    validateOpaqueFields(roleDefinition, ROLE_OPAQUE_FIELDS, errors, itemPath);
    if (hasDataKey(roleDefinition, "roleCategory")) {
      validateEnum(
        getDataValue(roleDefinition, "roleCategory"),
        RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_CATEGORIES,
        errors,
        fieldPath(itemPath, "roleCategory"),
      );
    }
    if (hasDataKey(roleDefinition, "roleId")) {
      const roleId = getDataValue(roleDefinition, "roleId");
      if (seenRoleIds.has(roleId)) {
        pushError(errors, "DUPLICATE_VALUE", fieldPath(itemPath, "roleId"));
      }
      seenRoleIds.add(roleId);
    }
    activePath.delete(roleDefinition);
  }
  activePath.delete(value);
}

function validateScopeDimensions(value, errors, path, activePath) {
  if (!validateNonEmptyArray(value, errors, path, activePath)) {
    return;
  }

  const seen = new Set();
  let previousOrder = -1;
  activePath.add(value);
  for (let index = 0; index < value.length; index += 1) {
    const itemPath = indexPath(path, index);
    const scopeDimension = getDataValue(value, String(index));
    if (scopeDimension !== null && typeof scopeDimension === "object") {
      pushError(errors, "INVALID_TYPE", itemPath);
      continue;
    }

    const canonicalOrder =
      RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_SCOPE_DIMENSIONS.indexOf(scopeDimension);

    if (canonicalOrder === -1) {
      pushError(errors, "INVALID_ENUM", itemPath);
    } else if (canonicalOrder < previousOrder) {
      pushError(errors, "INVALID_CROSS_FIELD_COMBINATION", itemPath);
    } else {
      previousOrder = canonicalOrder;
    }

    if (seen.has(scopeDimension)) {
      pushError(errors, "DUPLICATE_VALUE", itemPath);
    }
    seen.add(scopeDimension);
  }
  activePath.delete(value);
}

function validatePermissionDefinitions(value, errors, activePath) {
  const path = "$.permissionDefinitions";
  if (!validateNonEmptyArray(value, errors, path, activePath)) {
    return;
  }

  const seenPermissionIds = new Set();
  activePath.add(value);
  for (let index = 0; index < value.length; index += 1) {
    const itemPath = indexPath(path, index);
    const permissionDefinition = getDataValue(value, String(index));
    if (!validatePlainObject(permissionDefinition, errors, itemPath, activePath)) {
      continue;
    }

    activePath.add(permissionDefinition);
    validateExactFields(
      permissionDefinition,
      RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_DEFINITION_FIELDS,
      errors,
      itemPath,
    );
    validateNoProhibitedFields(
      permissionDefinition,
      PERMISSION_PROHIBITED_FIELDS,
      errors,
      itemPath,
    );
    validateOpaqueFields(
      permissionDefinition,
      PERMISSION_OPAQUE_FIELDS,
      errors,
      itemPath,
    );
    if (hasDataKey(permissionDefinition, "permissionCategory")) {
      validateEnum(
        getDataValue(permissionDefinition, "permissionCategory"),
        RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_CATEGORIES,
        errors,
        fieldPath(itemPath, "permissionCategory"),
      );
    }
    if (hasDataKey(permissionDefinition, "scopeDimensions")) {
      validateScopeDimensions(
        getDataValue(permissionDefinition, "scopeDimensions"),
        errors,
        fieldPath(itemPath, "scopeDimensions"),
        activePath,
      );
    }
    if (hasDataKey(permissionDefinition, "effectDeclaration")) {
      validateEnum(
        getDataValue(permissionDefinition, "effectDeclaration"),
        RBAC_ROLE_PERMISSION_POLICY_EFFECT_DECLARATIONS,
        errors,
        fieldPath(itemPath, "effectDeclaration"),
      );
    }
    if (hasDataKey(permissionDefinition, "permissionId")) {
      const permissionId = getDataValue(permissionDefinition, "permissionId");
      if (seenPermissionIds.has(permissionId)) {
        pushError(errors, "DUPLICATE_VALUE", fieldPath(itemPath, "permissionId"));
      }
      seenPermissionIds.add(permissionId);
    }
    activePath.delete(permissionDefinition);
  }
  activePath.delete(value);
}

function validateRbacRolePermissionPolicyEvidence(input) {
  const errors = [];
  const version = versionForResult(input);
  const activePath = new WeakSet();

  if (!validatePlainObject(input, errors, "$", activePath)) {
    return makeResult(false, version, errors);
  }

  activePath.add(input);
  validateExactFields(
    input,
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_TOP_LEVEL_FIELDS,
    errors,
    "$",
  );
  validateNoProhibitedFields(input, TOP_LEVEL_AUTHORITY_FIELDS, errors, "$");
  validateOpaqueFields(input, TOP_LEVEL_OPAQUE_FIELDS, errors, "$");

  if (hasDataKey(input, "contractVersion")) {
    validateExactValue(getDataValue(input, "contractVersion"), CONTRACT_VERSION, errors, "$.contractVersion");
  }
  if (hasDataKey(input, "evidenceKind")) {
    validateExactValue(getDataValue(input, "evidenceKind"), CONTRACT_KIND, errors, "$.evidenceKind");
  }
  if (hasDataKey(input, "policyLifecyclePosture")) {
    validateEnum(
      getDataValue(input, "policyLifecyclePosture"),
      RBAC_ROLE_PERMISSION_POLICY_LIFECYCLE_POSTURES,
      errors,
      "$.policyLifecyclePosture",
    );
  }
  if (hasDataKey(input, "defaultEffectDeclaration")) {
    validateExactValue(
      getDataValue(input, "defaultEffectDeclaration"),
      "POLICY_EFFECT_DENY_DECLARATION",
      errors,
      "$.defaultEffectDeclaration",
    );
  }
  if (hasDataKey(input, "denyPrecedence")) {
    validateBooleanValue(getDataValue(input, "denyPrecedence"), true, errors, "$.denyPrecedence");
  }
  if (hasDataKey(input, "wildcardsAllowed")) {
    validateBooleanValue(getDataValue(input, "wildcardsAllowed"), false, errors, "$.wildcardsAllowed");
  }
  if (hasDataKey(input, "humanProfessionalReviewRequired")) {
    validateBooleanValue(
      getDataValue(input, "humanProfessionalReviewRequired"),
      true,
      errors,
      "$.humanProfessionalReviewRequired",
    );
  }
  if (hasDataKey(input, "roleDefinitions")) {
    validateRoleDefinitions(getDataValue(input, "roleDefinitions"), errors, activePath);
  }
  if (hasDataKey(input, "permissionDefinitions")) {
    validatePermissionDefinitions(
      getDataValue(input, "permissionDefinitions"),
      errors,
      activePath,
    );
  }
  activePath.delete(input);

  return makeResult(errors.length === 0, version, errors);
}

module.exports = {
  RBAC_ROLE_PERMISSION_POLICY_EFFECT_DECLARATIONS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_CATEGORIES,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_DEFINITION_FIELDS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_CATEGORIES,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_DEFINITION_FIELDS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_SCOPE_DIMENSIONS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_TOP_LEVEL_FIELDS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_VALIDATION_ERROR_CODES,
  RBAC_ROLE_PERMISSION_POLICY_LIFECYCLE_POSTURES,
  validateRbacRolePermissionPolicyEvidence,
};
