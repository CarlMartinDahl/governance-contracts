"use strict";

const CONTRACT_NAME = "RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT";
const CONTRACT_VERSION = "v1";

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_IDENTITY = deepFreeze({
  contractName: CONTRACT_NAME,
  version: CONTRACT_VERSION,
});

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE = deepFreeze({
  posture: ["CONTRACT_ONLY", "PROVE_ONLY", "SCHEMA_VALIDATOR_ONLY"],
  implementationCreated: false,
  rbacImplementationCreated: false,
  accessControlImplementationCreated: false,
  adminSupportImplementationCreated: false,
  runtimeEnforcementAuthorized: false,
  actorIdentityLookupCreated: false,
  roleResolutionCreated: false,
  permissionResolutionCreated: false,
  actorRoleBindingCreated: false,
  rolePermissionBindingCreated: false,
  registryLookupCreated: false,
  validatorDispatchCreated: false,
  routeIntegrationCreated: false,
  persistenceCreated: false,
  auditEmitterCreated: false,
  auditStorageCreated: false,
  providerRouteAuthorized: false,
  externalUseAuthorized: false,
  blockerClosureCreated: false,
  humanProfessionalReviewRequired: true,
});

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTOR_TYPES = deepFreeze([
  "HUMAN_REVIEWER",
  "ADMIN",
  "SUPPORT",
  "SERVICE_SYSTEM",
]);

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTION_CATEGORIES = deepFreeze([
  "READ_SANITIZED_REVIEW_DATA",
  "WRITE_SANITIZED_REVIEW_STATE",
  "REQUEST_HUMAN_REVIEW",
  "VIEW_NO_CONTENT_AUDIT_DESCRIPTOR",
  "ADMINISTER_NON_CONTENT_CONFIGURATION",
  "SUPPORT_NON_CONTENT_DIAGNOSTIC",
  "REQUEST_EXPORT",
  "REQUEST_DELETION",
  "REQUEST_ROLE_CHANGE",
  "REQUEST_BREAK_GLASS",
  "REQUEST_PROVIDER_ROUTE",
]);

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS = deepFreeze([
  "TENANT",
  "CASE",
  "OBJECT",
  "FUNCTION",
  "PROPERTY",
]);

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_MATERIAL_BOUNDARIES = deepFreeze([
  "SYNTHETIC_SANITIZED_NO_RAW_ONLY",
]);

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_HUMAN_REVIEW_DEPENDENCIES =
  deepFreeze(["REQUIRED_NOT_GRANTED", "NOT_APPLICABLE"]);

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DECISION_STATUSES = deepFreeze([
  "NOT_EVALUATED",
  "DENY",
  "INVALID_CONTEXT",
  "HUMAN_REVIEW_REQUIRED",
]);

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SOURCE_EVIDENCE_CLASSIFICATIONS =
  deepFreeze([
    "STATIC_DECLARATION_ONLY",
    "TEST_FIXTURE_ONLY",
    "DOCS_ONLY",
    "UNKNOWN_NOT_EVIDENCED",
    "NOT_AUTHORIZED",
  ]);

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_REASON_CODES = deepFreeze([
  "UNKNOWN_ACTOR_TYPE",
  "UNKNOWN_ACTION",
  "MISSING_SCOPE",
  "WRONG_TENANT",
  "WRONG_CASE",
  "WRONG_OBJECT",
  "WRONG_FUNCTION",
  "WRONG_PROPERTY",
  "RAW_PRIVATE_SOURCE_NOT_ALLOWED",
  "SUPPORT_RAW_ACCESS_PROHIBITED",
  "SERVICE_SELF_APPROVAL_PROHIBITED",
  "ADMIN_REVIEW_BYPASS_PROHIBITED",
  "HUMAN_REVIEW_REQUIRED",
  "PERMISSION_NOT_EVIDENCED",
  "ROLE_BINDING_NOT_EVIDENCED",
  "PROVIDER_ROUTING_NOT_AUTHORIZED",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "DEFAULT_DENY",
]);

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_AUDIT_EVENT_CATEGORIES =
  deepFreeze([
    "AUTHORIZATION_REQUEST_CONTEXT",
    "AUTHORIZATION_DECISION_CONTEXT",
    "HUMAN_REVIEW_DEPENDENCY",
    "PRIVILEGED_ACTION_REQUEST",
  ]);

const VALIDATION_ERROR_CODES = deepFreeze([
  "UNKNOWN_CONTRACT_VERSION",
  "INPUT_NOT_OBJECT",
  "MISSING_REQUIRED_FIELD",
  "UNKNOWN_FIELD",
  "INVALID_TYPE",
  "INVALID_OPAQUE_ID",
  "UNKNOWN_ENUM_VALUE",
  "DUPLICATE_VALUE",
  "PROHIBITED_FIELD",
  "INVALID_CROSS_FIELD_COMBINATION",
  "VALUE_MUST_BE_FALSE",
  "VALUE_MUST_BE_TRUE",
]);

const REQUEST_KIND = "RBAC_ADMIN_SUPPORT_AUTHORIZATION_REQUEST_CONTEXT";
const DECISION_KIND = "RBAC_ADMIN_SUPPORT_AUTHORIZATION_DECISION_CONTEXT";
const AUDIT_DESCRIPTOR_KIND =
  "RBAC_ADMIN_SUPPORT_NO_CONTENT_AUDIT_DESCRIPTOR";

const REQUEST_FIELDS = deepFreeze([
  "version",
  "requestId",
  "actorType",
  "actorId",
  "actionCategory",
  "scopeContext",
  "materialBoundary",
  "humanReviewDependency",
  "providerRouteIntent",
  "externalUseIntent",
  "sourceEvidenceClassification",
  "contextReasonCodes",
]);

const DECISION_FIELDS = deepFreeze([
  "version",
  "requestId",
  "decisionStatus",
  "reasonCodes",
  "evaluatedScopeDimensions",
  "humanReviewDependency",
  "auditEventRequired",
  "providerRouteAuthorized",
  "externalUseAuthorized",
  "blockerClosureCreated",
]);

const AUDIT_DESCRIPTOR_FIELDS = deepFreeze([
  "contractVersion",
  "eventId",
  "eventCategory",
  "actorType",
  "actionCategory",
  "decisionStatus",
  "reasonCodes",
  "scopeDimensionsPresent",
]);

const SCOPE_CONTEXT_FIELDS = deepFreeze([
  "tenantId",
  "caseId",
  "objectId",
  "functionId",
  "propertyId",
]);

const REQUIRED_SCOPE_CONTEXT_FIELDS = deepFreeze(["tenantId", "functionId"]);

const HUMAN_REVIEW_REQUIRED_ACTIONS = deepFreeze([
  "REQUEST_HUMAN_REVIEW",
  "REQUEST_EXPORT",
  "REQUEST_DELETION",
  "REQUEST_ROLE_CHANGE",
  "REQUEST_BREAK_GLASS",
  "REQUEST_PROVIDER_ROUTE",
]);

const EXTERNAL_USE_INTENT_ACTIONS = deepFreeze([
  "REQUEST_EXPORT",
  "REQUEST_PROVIDER_ROUTE",
]);

const RECURSIVE_PROHIBITED_FIELDS = deepFreeze([
  "rawContent",
  "rawSource",
  "rawSourceText",
  "privateFacts",
  "sourceExcerpt",
  "sourceExcerpts",
  "sourceLocator",
  "sourceLocators",
  "url",
  "urls",
  "token",
  "tokens",
  "secret",
  "secrets",
  "providerPayload",
  "providerPayloads",
  "fileName",
  "fileNames",
  "filePath",
  "filePaths",
]);

const REQUEST_PROHIBITED_FIELDS = deepFreeze([
  "role",
  "roles",
  "permission",
  "permissions",
  "grants",
  "approval",
  "approved",
  "reviewerApproval",
  "authoritativeIdentity",
  "providerPayload",
  "routeDestination",
]);

const AUDIT_DESCRIPTOR_PROHIBITED_FIELDS = deepFreeze([
  "scopeContext",
  "scopeValues",
  "tenantId",
  "caseId",
  "objectId",
  "functionId",
  "propertyId",
  "actorId",
  "requestId",
  "fileName",
  "fileNames",
  "filePath",
  "filePaths",
  "sourceLocator",
  "sourceLocators",
]);

const OPAQUE_ID_PATTERN = /^[A-Za-z0-9._:-]{1,128}$/;

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }

  Object.freeze(value);

  for (const descriptor of Object.values(Object.getOwnPropertyDescriptors(value))) {
    if (Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value);
    }
  }

  return value;
}

function isPlainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.getPrototypeOf(value) === Object.prototype;
}

function getDataKeys(value) {
  if (!isPlainObject(value) && !Array.isArray(value)) {
    return [];
  }

  const descriptors = Object.getOwnPropertyDescriptors(value);

  return Object.keys(descriptors)
    .filter((key) => Object.prototype.hasOwnProperty.call(descriptors[key], "value"))
    .sort();
}

function getDataValue(value, key) {
  const descriptor = Object.getOwnPropertyDescriptor(value, key);

  if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
    return undefined;
  }

  return descriptor.value;
}

function hasDataKey(value, key) {
  const descriptor = Object.getOwnPropertyDescriptor(value, key);

  return Boolean(
    descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value"),
  );
}

function makeError(code, path) {
  return { code, path };
}

function addError(errors, code, path) {
  errors.push(makeError(code, path));
}

function makeResult(contractKind, version, errors) {
  return deepFreeze({
    valid: errors.length === 0,
    contractKind,
    version,
    errors: errors.map((error) => ({ code: error.code, path: error.path })),
  });
}

function validateBaseInput(input, contractKind, versionPath) {
  const errors = [];

  if (!isPlainObject(input)) {
    addError(errors, "INPUT_NOT_OBJECT", "$");
    return {
      errors,
      version: null,
      shouldContinue: false,
      dataKeys: [],
    };
  }

  const version = getDataValue(input, versionPath);

  if (version !== CONTRACT_VERSION) {
    addError(errors, "UNKNOWN_CONTRACT_VERSION", versionPath);
  }

  return {
    errors,
    version: version === CONTRACT_VERSION ? CONTRACT_VERSION : null,
    shouldContinue: true,
    dataKeys: getDataKeys(input),
    contractKind,
  };
}

function validateNoUnknownFields(input, allowedFields, errors, basePath = "$") {
  const allowed = new Set(allowedFields);

  for (const key of getDataKeys(input)) {
    if (!allowed.has(key)) {
      addError(errors, "UNKNOWN_FIELD", `${basePath}.${key}`);
    }
  }
}

function validateRequiredFields(input, requiredFields, errors, basePath = "$") {
  for (const field of requiredFields) {
    if (!hasDataKey(input, field)) {
      addError(errors, "MISSING_REQUIRED_FIELD", `${basePath}.${field}`);
    }
  }
}

function validateProhibitedFields(input, prohibitedFields, errors) {
  const prohibited = new Set(prohibitedFields);

  walkPlainData(input, "$", errors, (key, path) => {
    if (prohibited.has(key)) {
      addError(errors, "PROHIBITED_FIELD", path);
      return false;
    }

    return true;
  });
}

function validateRecursiveProhibitedFields(input, errors) {
  validateProhibitedFields(input, RECURSIVE_PROHIBITED_FIELDS, errors);
}

function walkPlainData(value, path, errors, onKey, active = new WeakSet()) {
  if (!value || typeof value !== "object") {
    return;
  }

  if (active.has(value)) {
    addError(errors, "INVALID_TYPE", path);
    return;
  }

  if (Array.isArray(value)) {
    active.add(value);
    try {
      for (let index = 0; index < value.length; index += 1) {
        const childPath = `${path}[${index}]`;
        const descriptor = Object.getOwnPropertyDescriptor(value, String(index));

        if (!descriptor) {
          continue;
        }
        if (!Object.prototype.hasOwnProperty.call(descriptor, "value")) {
          addError(errors, "INVALID_TYPE", childPath);
          continue;
        }

        walkPlainData(descriptor.value, childPath, errors, onKey, active);
      }

      for (const key of getEnumerableOwnKeys(value).filter((key) => !isArrayIndex(key))) {
        const childPath = `${path}.${key}`;
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        const shouldDescend = onKey(key, childPath);

        if (shouldDescend === false) {
          continue;
        }
        if (!Object.prototype.hasOwnProperty.call(descriptor, "value")) {
          addError(errors, "INVALID_TYPE", childPath);
          continue;
        }

        walkPlainData(descriptor.value, childPath, errors, onKey, active);
      }
    } finally {
      active.delete(value);
    }
    return;
  }

  if (!isPlainObject(value)) {
    return;
  }

  active.add(value);
  try {
    for (const key of getEnumerableOwnKeys(value)) {
      const childPath = `${path}.${key}`;
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      const shouldDescend = onKey(key, childPath);

      if (shouldDescend === false) {
        continue;
      }
      if (!Object.prototype.hasOwnProperty.call(descriptor, "value")) {
        addError(errors, "INVALID_TYPE", childPath);
        continue;
      }

      walkPlainData(descriptor.value, childPath, errors, onKey, active);
    }
  } finally {
    active.delete(value);
  }
}

function getEnumerableOwnKeys(value) {
  const descriptors = Object.getOwnPropertyDescriptors(value);

  return Object.keys(descriptors)
    .filter((key) => descriptors[key].enumerable)
    .sort();
}

function isArrayIndex(key) {
  const index = Number(key);

  return (
    Number.isInteger(index)
    && index >= 0
    && index < 4294967295
    && String(index) === key
  );
}

function validateString(value, errors, path) {
  if (typeof value !== "string") {
    addError(errors, "INVALID_TYPE", path);
    return false;
  }

  return true;
}

function validateBoolean(value, errors, path) {
  if (typeof value !== "boolean") {
    addError(errors, "INVALID_TYPE", path);
    return false;
  }

  return true;
}

function validateOpaqueId(value, errors, path) {
  if (!validateString(value, errors, path)) {
    return;
  }

  if (!OPAQUE_ID_PATTERN.test(value)) {
    addError(errors, "INVALID_OPAQUE_ID", path);
  }
}

function validateEnum(value, enumValues, errors, path) {
  if (!validateString(value, errors, path)) {
    return;
  }

  if (!enumValues.includes(value)) {
    addError(errors, "UNKNOWN_ENUM_VALUE", path);
  }
}

function validateEnumArray(value, enumValues, errors, path, options = {}) {
  if (!Array.isArray(value)) {
    addError(errors, "INVALID_TYPE", path);
    return;
  }

  if (options.nonEmpty && value.length === 0) {
    addError(errors, "MISSING_REQUIRED_FIELD", path);
  }

  const seen = new Set();

  for (let index = 0; index < value.length; index += 1) {
    const itemPath = `${path}[${index}]`;
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    const item =
      descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")
        ? descriptor.value
        : undefined;

    if (descriptor && !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      addError(errors, "INVALID_TYPE", itemPath);
      continue;
    }

    validateEnum(item, enumValues, errors, itemPath);

    if (typeof item === "string") {
      if (seen.has(item)) {
        addError(errors, "DUPLICATE_VALUE", itemPath);
      }
      seen.add(item);
    }
  }
}

function validateScopeContext(value, errors, path) {
  if (!isPlainObject(value)) {
    addError(errors, "INVALID_TYPE", path);
    return;
  }

  validateNoUnknownFields(value, SCOPE_CONTEXT_FIELDS, errors, path);
  validateRequiredFields(value, REQUIRED_SCOPE_CONTEXT_FIELDS, errors, path);

  for (const field of SCOPE_CONTEXT_FIELDS) {
    if (hasDataKey(value, field)) {
      validateOpaqueId(getDataValue(value, field), errors, `${path}.${field}`);
    }
  }
}

function validateRequestCrossFields(input, errors) {
  const actionCategory = getDataValue(input, "actionCategory");
  const humanReviewDependency = getDataValue(input, "humanReviewDependency");
  const providerRouteIntent = getDataValue(input, "providerRouteIntent");
  const externalUseIntent = getDataValue(input, "externalUseIntent");

  if (
    HUMAN_REVIEW_REQUIRED_ACTIONS.includes(actionCategory) &&
    humanReviewDependency !== "REQUIRED_NOT_GRANTED"
  ) {
    addError(errors, "INVALID_CROSS_FIELD_COMBINATION", "$.humanReviewDependency");
  }

  if (actionCategory === "REQUEST_PROVIDER_ROUTE" && providerRouteIntent !== true) {
    addError(errors, "VALUE_MUST_BE_TRUE", "$.providerRouteIntent");
  }

  if (actionCategory !== "REQUEST_PROVIDER_ROUTE" && providerRouteIntent !== false) {
    addError(errors, "VALUE_MUST_BE_FALSE", "$.providerRouteIntent");
  }

  if (
    externalUseIntent === true &&
    !EXTERNAL_USE_INTENT_ACTIONS.includes(actionCategory)
  ) {
    addError(errors, "INVALID_CROSS_FIELD_COMBINATION", "$.externalUseIntent");
  }
}

function validateBooleanMustBe(value, expected, errors, path) {
  if (!validateBoolean(value, errors, path)) {
    return;
  }

  if (value !== expected) {
    addError(errors, expected ? "VALUE_MUST_BE_TRUE" : "VALUE_MUST_BE_FALSE", path);
  }
}

function validateRbacAdminSupportAuthorizationRequestContext(input) {
  const base = validateBaseInput(input, REQUEST_KIND, "version");
  const errors = base.errors;

  if (!base.shouldContinue) {
    return makeResult(REQUEST_KIND, null, errors);
  }

  validateRecursiveProhibitedFields(input, errors);
  validateProhibitedFields(input, REQUEST_PROHIBITED_FIELDS, errors);
  validateNoUnknownFields(input, REQUEST_FIELDS, errors);
  validateRequiredFields(input, REQUEST_FIELDS, errors);

  if (hasDataKey(input, "requestId")) {
    validateOpaqueId(getDataValue(input, "requestId"), errors, "$.requestId");
  }
  if (hasDataKey(input, "actorType")) {
    validateEnum(
      getDataValue(input, "actorType"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTOR_TYPES,
      errors,
      "$.actorType",
    );
  }
  if (hasDataKey(input, "actorId")) {
    validateOpaqueId(getDataValue(input, "actorId"), errors, "$.actorId");
  }
  if (hasDataKey(input, "actionCategory")) {
    validateEnum(
      getDataValue(input, "actionCategory"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTION_CATEGORIES,
      errors,
      "$.actionCategory",
    );
  }
  if (hasDataKey(input, "scopeContext")) {
    validateScopeContext(getDataValue(input, "scopeContext"), errors, "$.scopeContext");
  }
  if (hasDataKey(input, "materialBoundary")) {
    validateEnum(
      getDataValue(input, "materialBoundary"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_MATERIAL_BOUNDARIES,
      errors,
      "$.materialBoundary",
    );
  }
  if (hasDataKey(input, "humanReviewDependency")) {
    validateEnum(
      getDataValue(input, "humanReviewDependency"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_HUMAN_REVIEW_DEPENDENCIES,
      errors,
      "$.humanReviewDependency",
    );
  }
  if (hasDataKey(input, "providerRouteIntent")) {
    validateBoolean(getDataValue(input, "providerRouteIntent"), errors, "$.providerRouteIntent");
  }
  if (hasDataKey(input, "externalUseIntent")) {
    validateBoolean(getDataValue(input, "externalUseIntent"), errors, "$.externalUseIntent");
  }
  if (hasDataKey(input, "sourceEvidenceClassification")) {
    validateEnum(
      getDataValue(input, "sourceEvidenceClassification"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SOURCE_EVIDENCE_CLASSIFICATIONS,
      errors,
      "$.sourceEvidenceClassification",
    );
  }
  if (hasDataKey(input, "contextReasonCodes")) {
    validateEnumArray(
      getDataValue(input, "contextReasonCodes"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_REASON_CODES,
      errors,
      "$.contextReasonCodes",
    );
  }

  validateRequestCrossFields(input, errors);

  return makeResult(REQUEST_KIND, base.version, errors);
}

function validateRbacAdminSupportAuthorizationDecisionContext(input) {
  const base = validateBaseInput(input, DECISION_KIND, "version");
  const errors = base.errors;

  if (!base.shouldContinue) {
    return makeResult(DECISION_KIND, null, errors);
  }

  validateRecursiveProhibitedFields(input, errors);
  validateNoUnknownFields(input, DECISION_FIELDS, errors);
  validateRequiredFields(input, DECISION_FIELDS, errors);

  if (hasDataKey(input, "requestId")) {
    validateOpaqueId(getDataValue(input, "requestId"), errors, "$.requestId");
  }
  if (hasDataKey(input, "decisionStatus")) {
    validateEnum(
      getDataValue(input, "decisionStatus"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DECISION_STATUSES,
      errors,
      "$.decisionStatus",
    );
  }
  if (hasDataKey(input, "reasonCodes")) {
    validateEnumArray(
      getDataValue(input, "reasonCodes"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_REASON_CODES,
      errors,
      "$.reasonCodes",
      { nonEmpty: true },
    );
  }
  if (hasDataKey(input, "evaluatedScopeDimensions")) {
    validateEnumArray(
      getDataValue(input, "evaluatedScopeDimensions"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS,
      errors,
      "$.evaluatedScopeDimensions",
    );
  }
  if (hasDataKey(input, "humanReviewDependency")) {
    validateEnum(
      getDataValue(input, "humanReviewDependency"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_HUMAN_REVIEW_DEPENDENCIES,
      errors,
      "$.humanReviewDependency",
    );
  }
  if (hasDataKey(input, "auditEventRequired")) {
    validateBooleanMustBe(getDataValue(input, "auditEventRequired"), true, errors, "$.auditEventRequired");
  }
  if (hasDataKey(input, "providerRouteAuthorized")) {
    validateBooleanMustBe(
      getDataValue(input, "providerRouteAuthorized"),
      false,
      errors,
      "$.providerRouteAuthorized",
    );
  }
  if (hasDataKey(input, "externalUseAuthorized")) {
    validateBooleanMustBe(
      getDataValue(input, "externalUseAuthorized"),
      false,
      errors,
      "$.externalUseAuthorized",
    );
  }
  if (hasDataKey(input, "blockerClosureCreated")) {
    validateBooleanMustBe(
      getDataValue(input, "blockerClosureCreated"),
      false,
      errors,
      "$.blockerClosureCreated",
    );
  }

  return makeResult(DECISION_KIND, base.version, errors);
}

function validateRbacAdminSupportNoContentAuditDescriptor(input) {
  const base = validateBaseInput(input, AUDIT_DESCRIPTOR_KIND, "contractVersion");
  const errors = base.errors;

  if (!base.shouldContinue) {
    return makeResult(AUDIT_DESCRIPTOR_KIND, null, errors);
  }

  validateRecursiveProhibitedFields(input, errors);
  validateProhibitedFields(input, AUDIT_DESCRIPTOR_PROHIBITED_FIELDS, errors);
  validateNoUnknownFields(input, AUDIT_DESCRIPTOR_FIELDS, errors);
  validateRequiredFields(input, AUDIT_DESCRIPTOR_FIELDS, errors);

  if (hasDataKey(input, "eventId")) {
    validateOpaqueId(getDataValue(input, "eventId"), errors, "$.eventId");
  }
  if (hasDataKey(input, "eventCategory")) {
    validateEnum(
      getDataValue(input, "eventCategory"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_AUDIT_EVENT_CATEGORIES,
      errors,
      "$.eventCategory",
    );
  }
  if (hasDataKey(input, "actorType")) {
    validateEnum(
      getDataValue(input, "actorType"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTOR_TYPES,
      errors,
      "$.actorType",
    );
  }
  if (hasDataKey(input, "actionCategory")) {
    validateEnum(
      getDataValue(input, "actionCategory"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTION_CATEGORIES,
      errors,
      "$.actionCategory",
    );
  }
  if (hasDataKey(input, "decisionStatus")) {
    validateEnum(
      getDataValue(input, "decisionStatus"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DECISION_STATUSES,
      errors,
      "$.decisionStatus",
    );
  }
  if (hasDataKey(input, "reasonCodes")) {
    validateEnumArray(
      getDataValue(input, "reasonCodes"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_REASON_CODES,
      errors,
      "$.reasonCodes",
      { nonEmpty: true },
    );
  }
  if (hasDataKey(input, "scopeDimensionsPresent")) {
    validateEnumArray(
      getDataValue(input, "scopeDimensionsPresent"),
      RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS,
      errors,
      "$.scopeDimensionsPresent",
    );
  }

  return makeResult(AUDIT_DESCRIPTOR_KIND, base.version, errors);
}

module.exports = {
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTION_CATEGORIES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTOR_TYPES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_AUDIT_EVENT_CATEGORIES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_IDENTITY,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DECISION_STATUSES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_HUMAN_REVIEW_DEPENDENCIES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_MATERIAL_BOUNDARIES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_REASON_CODES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SOURCE_EVIDENCE_CLASSIFICATIONS,
  VALIDATION_ERROR_CODES,
  validateRbacAdminSupportAuthorizationDecisionContext,
  validateRbacAdminSupportAuthorizationRequestContext,
  validateRbacAdminSupportNoContentAuditDescriptor,
};
