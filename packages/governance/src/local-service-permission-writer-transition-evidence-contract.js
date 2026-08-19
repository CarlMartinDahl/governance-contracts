"use strict";

const CONTRACT_NAME =
  "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND = "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE";
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
  "priorLifecyclePosture",
  "expectedCurrentStateVersionRef",
  "transitionCategory",
  "resultingLifecyclePosture",
  "resultingCurrentStateVersionRef",
  "administrationApprovalEvidenceRef",
  "writerProvenanceRef",
  "transactionOutcomeDeclaration",
  "lifecycleHistoryEntryRef",
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
  "expectedCurrentStateVersionRef",
  "resultingCurrentStateVersionRef",
  "administrationApprovalEvidenceRef",
  "writerProvenanceRef",
  "lifecycleHistoryEntryRef",
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

const TRANSITION_CATEGORIES = [
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_PROPOSAL",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_APPROVAL",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_ACTIVATION",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_NARROWING",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_WIDENING",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_SUSPENSION",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_REVOCATION",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_EXPIRY",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_SUPERSESSION",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_RETIREMENT",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_CORRECTION",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_RESTORATION",
  "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_RECOVERY",
];

const TRANSACTION_OUTCOME_POSTURES = [
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_NOT_ATTEMPTED",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_REJECTED_BEFORE_EFFECT",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_ACCEPTED_FOR_EXECUTION",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_OUTCOME_UNKNOWN",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_COMMITTED",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_NOT_COMMITTED",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_RECONCILIATION_REQUIRED",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_DISPUTED",
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
  "localServicePermissionWriterTransitionEvidenceOnly",
  "wildcardsProhibited",
  "broadScopeProhibited",
  "humanProfessionalReviewRequired",
];

const POSTURE_FALSE_FIELDS = [
  "permissionCreated",
  "permissionTransitionCreated",
  "approvalCreated",
  "executionCreated",
  "approverSelected",
  "executorSelected",
  "writerIdentityCreated",
  "writerAuthenticationCreated",
  "writerAuthorizationCreated",
  "permissionAuthorityCreated",
  "administrationAuthorityCreated",
  "authoritativeSourceCreated",
  "repositoryCreated",
  "storeCreated",
  "databaseCreated",
  "transactionCreated",
  "currentnessCreated",
  "lifecycleTruthVerified",
  "transactionOutcomeTruthVerified",
  "historyTruthVerified",
  "resolverCreated",
  "evaluatorCreated",
  "processAuthenticationCreated",
  "serviceAuthorizationCreated",
  "accessGrantCreated",
  "lookupCreated",
  "registryLookupCreated",
  "dynamicDispatchCreated",
  "validatorDispatchCreated",
  "routeIntegrationCreated",
  "middlewareCreated",
  "persistenceCreated",
  "auditEventEmitted",
  "auditStorageCreated",
  "providerRoutingCreated",
  "externalUseAuthorized",
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
  "accessGrant",
  "grant",
  "effectiveGrant",
  "approvalVerified",
  "executionSucceeded",
  "writerAuthenticated",
  "writerAuthorized",
  "trustedWriter",
  "authoritativeWriter",
  "verifiedCurrentVersion",
  "versionMatched",
  "versionOrdered",
  "staleWriteRejected",
  "transitionApplied",
  "transitionAuthorized",
  "currentStateUpdated",
  "commitVerified",
  "rollbackCompleted",
  "repositoryCurrent",
  "historyConsistent",
  "resolverResult",
  "evaluatorDecision",
  "runtimeEnforced",
  "repositoryRecord",
  "lifecycleHistoryContent",
  "rawApprovalRecord",
  "credential",
  "token",
  "secret",
  "certificate",
  "providerPayload",
  "role",
  "permission",
  "tenantMembership",
  "caseMembership",
  "resourcePlacement",
  "domainAuthorization",
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
  [
    "expectedCurrentStateVersionRef",
    "resultingCurrentStateVersionRef",
    "resultingCurrentStateVersionRef",
  ],
  [
    "administrationApprovalEvidenceRef",
    "writerProvenanceRef",
    "writerProvenanceRef",
  ],
  ["lifecycleHistoryEntryRef", "evidenceId", "lifecycleHistoryEntryRef"],
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

function structurallyValidField(descriptors, invalidFields, field) {
  return (
    hasOwnEnumerableDataKey(descriptors, field) &&
    !invalidFields.has(field) &&
    typeof getOwnEnumerableDataValue(descriptors, field) === "string"
  );
}

function validateLocalServicePermissionWriterTransitionEvidence(value) {
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
    if (!structurallyValidField(descriptors, invalidFields, field)) {
      return;
    }

    if (getOwnEnumerableDataValue(descriptors, field) !== expectedValue) {
      addError(errors, invalidFields, "INVALID_ENUM", field);
    }
  });

  LIFECYCLE_FIELDS.forEach((field) => {
    if (!structurallyValidField(descriptors, invalidFields, field)) {
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

  if (structurallyValidField(descriptors, invalidFields, "transitionCategory")) {
    const errorCode = validateEnum(
      getOwnEnumerableDataValue(descriptors, "transitionCategory"),
      TRANSITION_CATEGORIES,
    );

    if (errorCode) {
      addError(errors, invalidFields, errorCode, "transitionCategory");
    }
  }

  if (
    structurallyValidField(
      descriptors,
      invalidFields,
      "transactionOutcomeDeclaration",
    )
  ) {
    const errorCode = validateEnum(
      getOwnEnumerableDataValue(descriptors, "transactionOutcomeDeclaration"),
      TRANSACTION_OUTCOME_POSTURES,
    );

    if (errorCode) {
      addError(errors, invalidFields, errorCode, "transactionOutcomeDeclaration");
    }
  }

  OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    if (!structurallyValidField(descriptors, invalidFields, field)) {
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
    const valueForReview = getOwnEnumerableDataValue(
      descriptors,
      "humanProfessionalReviewRequired",
    );

    if (typeof valueForReview !== "boolean" || valueForReview !== true) {
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
      structurallyValidField(descriptors, invalidFields, leftField) &&
      structurallyValidField(descriptors, invalidFields, rightField) &&
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

const LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_IDENTITY =
  deepFreeze({
    contractName: CONTRACT_NAME,
    version: CONTRACT_VERSION,
    evidenceKind: CONTRACT_KIND,
  });

const LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_POSTURE =
  deepFreeze(
    Object.fromEntries([
      ...POSTURE_TRUE_FIELDS.map((field) => [field, true]),
      ...POSTURE_FALSE_FIELDS.map((field) => [field, false]),
    ]),
  );

const LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TOP_LEVEL_FIELDS =
  deepFreeze([...TOP_LEVEL_FIELDS]);

const LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_OPAQUE_REFERENCE_FIELDS =
  deepFreeze([...OPAQUE_REFERENCE_FIELDS]);

const LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_LIFECYCLE_POSTURES =
  deepFreeze([...LIFECYCLE_POSTURES]);

const LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TRANSITION_CATEGORIES =
  deepFreeze([...TRANSITION_CATEGORIES]);

const LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TRANSACTION_OUTCOME_POSTURES =
  deepFreeze([...TRANSACTION_OUTCOME_POSTURES]);

const LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_VERIFICATION_POSTURES =
  deepFreeze([...VERIFICATION_POSTURES]);

const LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_VALIDATION_ERROR_CODES =
  deepFreeze([...VALIDATION_ERROR_CODES]);

module.exports = {
  LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_IDENTITY,
  LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_POSTURE,
  LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TOP_LEVEL_FIELDS,
  LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_LIFECYCLE_POSTURES,
  LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TRANSITION_CATEGORIES,
  LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TRANSACTION_OUTCOME_POSTURES,
  LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_VERIFICATION_POSTURES,
  LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_VALIDATION_ERROR_CODES,
  validateLocalServicePermissionWriterTransitionEvidence,
};
