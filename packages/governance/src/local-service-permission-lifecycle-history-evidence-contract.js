"use strict";

const CONTRACT_NAME =
  "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND = "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE";
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
  "lifecycleHistoryEntryRef",
  "writerTransitionEvidenceRef",
  "priorLifecyclePosture",
  "resultingLifecyclePosture",
  "expectedCurrentStateVersionRef",
  "resultingCurrentStateVersionRef",
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
  "lifecycleHistoryEntryRef",
  "writerTransitionEvidenceRef",
  "expectedCurrentStateVersionRef",
  "resultingCurrentStateVersionRef",
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
  "localServicePermissionLifecycleHistoryEvidenceOnly",
  "lifecycleHistoryEntryEvidenceOnly",
  "flatObjectOnly",
  "opaqueReferencesOnly",
  "wildcardsProhibited",
  "broadScopeProhibited",
  "humanProfessionalReviewRequired",
];

const POSTURE_FALSE_FIELDS = [
  "historyEntryExistenceVerified",
  "authoritativeLifecycleHistory",
  "appendOnlyVerified",
  "nonRewritingVerified",
  "historyCompletenessVerified",
  "historyOrderingVerified",
  "predecessorExistenceVerified",
  "successorExistenceVerified",
  "transitionEvidenceVerified",
  "transitionExecuted",
  "transitionApproved",
  "administrationApprovalVerified",
  "writerIdentityVerified",
  "writerAuthenticated",
  "writerAuthorized",
  "writerExclusivityVerified",
  "lifecycleTruthVerified",
  "priorLifecycleTruthVerified",
  "resultingLifecycleTruthVerified",
  "versionExistenceVerified",
  "versionOrderingVerified",
  "expectedVersionMatched",
  "transactionOutcomeVerified",
  "transactionCommitted",
  "repositoryStateVerified",
  "repositoryCurrentnessVerified",
  "currentHistoryConsistencyVerified",
  "currentnessVerified",
  "trustedReadPerformed",
  "resolverResultCreated",
  "evaluatorDecisionCreated",
  "serviceAuthorizationCreated",
  "accessGrantCreated",
  "runtimeEnforcementCreated",
  "lookupPerformed",
  "persistencePerformed",
  "auditEmitted",
  "providerRoutingAuthorized",
  "externalUseAuthorized",
  "technicalSignOffCreated",
  "runtimeCertificationCreated",
  "releaseApprovalCreated",
  "blockerClosureCreated",
];

const PROHIBITED_FIELDS = new Set([
  "current",
  "latest",
  "effective",
  "authoritative",
  "verified",
  "trusted",
  "immutable",
  "appendOnlyVerified",
  "nonRewritingVerified",
  "historyComplete",
  "historyOrdered",
  "sequenceVerified",
  "predecessorVerified",
  "successorVerified",
  "repositoryCurrent",
  "historyConsistent",
  "currentStateResolved",
  "transitionApplied",
  "transitionAuthorized",
  "approvalVerified",
  "executionSucceeded",
  "writerAuthenticated",
  "writerAuthorized",
  "trustedWriter",
  "authoritativeWriter",
  "expectedVersionMatched",
  "versionOrdered",
  "transactionCommitted",
  "commitVerified",
  "allow",
  "allowed",
  "authorize",
  "authorized",
  "authorization",
  "accessGrant",
  "accessGranted",
  "grant",
  "effectiveGrant",
  "resolverResult",
  "evaluatorDecision",
  "runtimeEnforced",
  "repositoryRecord",
  "fullHistory",
  "historyEntries",
  "lifecycleHistoryContent",
  "rawHistoryContent",
  "rawPermissionRecord",
  "rawApprovalRecord",
  "administratorNote",
  "credential",
  "token",
  "secret",
  "certificate",
  "signature",
  "providerPayload",
  "role",
  "permission",
  "tenantMembership",
  "caseMembership",
  "resourcePlacement",
  "domainAuthorization",
  "sourceUrl",
  "sourcePath",
  "databaseLocator",
  "repositoryHandle",
]);

const BROAD_SCOPE_VALUES = new Set([
  "all",
  "any",
  "all-operations",
  "all_operations",
  "all-services",
  "all_services",
]);

const OPAQUE_REFERENCE_PATTERN = /^[A-Za-z0-9._:-]{1,128}$/u;
const DISALLOWED_URI_SCHEME_PATTERN =
  /^(?:https?|ftp|mailto|data|javascript):/iu;

const STRING_FIELDS = TOP_LEVEL_FIELDS.filter(
  (field) => field !== "humanProfessionalReviewRequired",
);

const FIXED_LITERAL_FIELDS = [
  ["contractVersion", CONTRACT_VERSION],
  ["evidenceKind", CONTRACT_KIND],
  ["verificationPosture", VERIFICATION_POSTURE],
];

const LIFECYCLE_FIELDS = ["priorLifecyclePosture", "resultingLifecyclePosture"];

const CROSS_FIELD_RULES = [
  ["callerProcessRef", "serviceRecipientRef", "serviceRecipientRef"],
  ["evidenceId", "lifecycleHistoryEntryRef", "lifecycleHistoryEntryRef"],
  [
    "lifecycleHistoryEntryRef",
    "writerTransitionEvidenceRef",
    "writerTransitionEvidenceRef",
  ],
  [
    "expectedCurrentStateVersionRef",
    "resultingCurrentStateVersionRef",
    "resultingCurrentStateVersionRef",
  ],
  ["sourceProvenanceRef", "evidenceId", "sourceProvenanceRef"],
];

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

function addError(errors, invalidFields, code, path) {
  errors.push(makeError(code, path));

  if (code !== "UNKNOWN_FIELD" && code !== "PROHIBITED_FIELD") {
    invalidFields.add(path);
  }
}

function structurallyValidStringField(descriptors, invalidFields, field) {
  return (
    hasOwnEnumerableDataKey(descriptors, field) &&
    !invalidFields.has(field) &&
    typeof getOwnEnumerableDataValue(descriptors, field) === "string"
  );
}

function validateEnum(value, allowedValues) {
  if (!allowedValues.includes(value)) {
    return "INVALID_ENUM";
  }

  return null;
}

function validateOpaqueReference(value) {
  if (value.includes("*")) {
    return "PROHIBITED_WILDCARD";
  }

  if (BROAD_SCOPE_VALUES.has(value.toLowerCase())) {
    return "PROHIBITED_BROAD_SCOPE";
  }

  if (
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

function validateLocalServicePermissionLifecycleHistoryEvidence(value) {
  if (!isPlainObject(value)) {
    return makeResult(false, [makeError("INVALID_TYPE", "$")]);
  }

  const descriptors = getOwnDescriptors(value);

  if (descriptors === null) {
    return makeResult(false, [makeError("INVALID_TYPE", "$")]);
  }

  const errors = [];
  const invalidFields = new Set();
  const enumerableKeys = enumerableKeysFromDescriptors(descriptors);

  TOP_LEVEL_FIELDS.forEach((field) => {
    if (!Object.prototype.hasOwnProperty.call(descriptors, field)) {
      addError(errors, invalidFields, "MISSING_FIELD", field);
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

  STRING_FIELDS.forEach((field) => {
    if (
      !Object.prototype.hasOwnProperty.call(descriptors, field) ||
      invalidFields.has(field)
    ) {
      return;
    }

    if (
      !hasOwnEnumerableDataKey(descriptors, field) ||
      typeof getOwnEnumerableDataValue(descriptors, field) !== "string"
    ) {
      addError(errors, invalidFields, "INVALID_TYPE", field);
    }
  });

  FIXED_LITERAL_FIELDS.forEach(([field, expectedValue]) => {
    if (!structurallyValidStringField(descriptors, invalidFields, field)) {
      return;
    }

    if (getOwnEnumerableDataValue(descriptors, field) !== expectedValue) {
      addError(errors, invalidFields, "INVALID_ENUM", field);
    }
  });

  LIFECYCLE_FIELDS.forEach((field) => {
    if (!structurallyValidStringField(descriptors, invalidFields, field)) {
      return;
    }

    const errorCode = validateEnum(
      getOwnEnumerableDataValue(descriptors, field),
      LIFECYCLE_POSTURES,
    );

    if (errorCode) {
      addError(errors, invalidFields, errorCode, field);
    }
  });

  OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    if (!structurallyValidStringField(descriptors, invalidFields, field)) {
      return;
    }

    const errorCode = validateOpaqueReference(
      getOwnEnumerableDataValue(descriptors, field),
    );

    if (errorCode) {
      addError(errors, invalidFields, errorCode, field);
    }
  });

  if (hasOwnEnumerableDataKey(descriptors, "humanProfessionalReviewRequired")) {
    const reviewValue = getOwnEnumerableDataValue(
      descriptors,
      "humanProfessionalReviewRequired",
    );

    if (typeof reviewValue !== "boolean" || reviewValue !== true) {
      addError(
        errors,
        invalidFields,
        "INVALID_BOOLEAN",
        "humanProfessionalReviewRequired",
      );
    }
  } else if (
    Object.prototype.hasOwnProperty.call(
      descriptors,
      "humanProfessionalReviewRequired",
    )
  ) {
    addError(
      errors,
      invalidFields,
      "INVALID_BOOLEAN",
      "humanProfessionalReviewRequired",
    );
  }

  CROSS_FIELD_RULES.forEach(([leftField, rightField, path]) => {
    if (
      structurallyValidStringField(descriptors, invalidFields, leftField) &&
      structurallyValidStringField(descriptors, invalidFields, rightField) &&
      getOwnEnumerableDataValue(descriptors, leftField) ===
        getOwnEnumerableDataValue(descriptors, rightField)
    ) {
      addError(
        errors,
        invalidFields,
        "INVALID_CROSS_FIELD_COMBINATION",
        path,
      );
    }
  });

  return makeResult(errors.length === 0, errors);
}

const LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_IDENTITY =
  deepFreeze({
    contractName: CONTRACT_NAME,
    version: CONTRACT_VERSION,
    evidenceKind: CONTRACT_KIND,
  });

const LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_POSTURE =
  deepFreeze(
    Object.fromEntries([
      ...POSTURE_TRUE_FIELDS.map((field) => [field, true]),
      ...POSTURE_FALSE_FIELDS.map((field) => [field, false]),
    ]),
  );

const LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_TOP_LEVEL_FIELDS =
  deepFreeze([...TOP_LEVEL_FIELDS]);

const LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_OPAQUE_REFERENCE_FIELDS =
  deepFreeze([...OPAQUE_REFERENCE_FIELDS]);

const LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_LIFECYCLE_POSTURES =
  deepFreeze([...LIFECYCLE_POSTURES]);

const LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VERIFICATION_POSTURES =
  deepFreeze([...VERIFICATION_POSTURES]);

const LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VALIDATION_ERROR_CODES =
  deepFreeze([...VALIDATION_ERROR_CODES]);

module.exports = {
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_IDENTITY,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_POSTURE,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_TOP_LEVEL_FIELDS,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_LIFECYCLE_POSTURES,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VERIFICATION_POSTURES,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VALIDATION_ERROR_CODES,
  validateLocalServicePermissionLifecycleHistoryEvidence,
};
