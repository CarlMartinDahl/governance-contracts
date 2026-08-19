"use strict";

const CONTRACT_NAME =
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND =
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE";
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
  "repositoryIdentityRef",
  "currentStateEvidenceRef",
  "writerTransitionEvidenceRef",
  "lifecycleHistoryEvidenceRef",
  "sourceProvenanceRef",
  "writerProvenanceRef",
  "expectedCurrentStateVersionRef",
  "declaredCurrentStateVersionRef",
  "permissionLifecyclePosture",
  "repositoryCurrentnessDeclaration",
  "currentHistoryConsistencyDeclaration",
  "reconciliationDeclaration",
  "humanProfessionalReviewRequired",
];

const OPAQUE_REFERENCE_FIELDS = [
  "evidenceId",
  "permissionDeclarationRef",
  "callerProcessRef",
  "serviceRecipientRef",
  "serviceOperationRef",
  "requestPurposeRef",
  "repositoryIdentityRef",
  "currentStateEvidenceRef",
  "writerTransitionEvidenceRef",
  "lifecycleHistoryEvidenceRef",
  "sourceProvenanceRef",
  "writerProvenanceRef",
  "expectedCurrentStateVersionRef",
  "declaredCurrentStateVersionRef",
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

const CURRENTNESS_DECLARATIONS = [
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_NOT_ASSESSED",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_CURRENT",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_NOT_CURRENT",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_STALE",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_CONFLICTING",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_DISPUTED",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_UNAVAILABLE",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_UNKNOWN",
];

const CURRENT_HISTORY_CONSISTENCY_DECLARATIONS = [
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_NOT_ASSESSED",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_CONSISTENT",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_MISMATCH",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_CONFLICTING",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_DISPUTED",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_UNAVAILABLE",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_UNKNOWN",
];

const RECONCILIATION_DECLARATIONS = [
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_NOT_ASSESSED",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_NOT_REQUIRED",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_REQUIRED",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_PENDING",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_OUTCOME_UNKNOWN",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_DISPUTED",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_UNAVAILABLE",
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
  "localServicePermissionRepositoryCurrentnessEvidenceOnly",
  "declarationsOnly",
  "flatObjectOnly",
  "opaqueReferencesOnly",
  "wildcardsProhibited",
  "broadScopeProhibited",
  "humanProfessionalReviewRequired",
];

const POSTURE_FALSE_FIELDS = [
  "repositoryExistenceVerified",
  "repositoryIdentityVerified",
  "authoritativeRepositoryEstablished",
  "repositoryCurrentnessVerified",
  "latestStateVerified",
  "freshnessVerified",
  "versionOrderingVerified",
  "expectedCurrentVersionMatchVerified",
  "transitionCommitVerified",
  "repositoryUpdateVerified",
  "lifecycleTruthVerified",
  "historyCompletenessVerified",
  "historyAppendOnlyVerified",
  "historyNonRewritingVerified",
  "currentHistoryConsistencyVerified",
  "reconciliationCompleted",
  "cacheAuthorityCreated",
  "replicaAuthorityCreated",
  "restartAuthorityCreated",
  "restoreAuthorityCreated",
  "backupAuthorityCreated",
  "readerIdentityVerified",
  "readerAuthenticated",
  "readerAuthorized",
  "trustedReadPerformed",
  "sanitizedRuntimeResultCreated",
  "resolverOutputCreated",
  "evaluatorDecisionCreated",
  "serviceAuthorizationCreated",
  "accessGranted",
  "runtimeEnforced",
  "lookupPerformed",
  "persistenceCreated",
  "auditImplementationCreated",
  "providerRoutingCreated",
  "externalUseAuthorized",
  "technicalSignOffCreated",
  "runtimeCertificationCreated",
  "releaseApprovalCreated",
  "blockerClosureCreated",
];

const PROHIBITED_FIELDS = new Set([
  "current",
  "latest",
  "authoritative",
  "verified",
  "fresh",
  "synchronized",
  "trusted",
  "repositoryCurrent",
  "repositoryVerified",
  "currentnessVerified",
  "freshnessVerified",
  "expectedVersionMatched",
  "versionOrdered",
  "repositoryUpdated",
  "transitionCommitted",
  "commitVerified",
  "currentStateResolved",
  "historyConsistent",
  "consistencyVerified",
  "reconciliationCompleted",
  "conflictResolved",
  "rollbackCompleted",
  "restoreValidated",
  "cacheCurrent",
  "replicaCurrent",
  "readerAuthenticated",
  "readerAuthorized",
  "trustedReader",
  "trustedReadPerformed",
  "resolverResult",
  "evaluatorDecision",
  "runtimeEnforced",
  "allow",
  "allowed",
  "authorize",
  "authorized",
  "authorization",
  "accessGrant",
  "accessGranted",
  "grant",
  "effectiveGrant",
  "repositoryRecord",
  "repositorySnapshot",
  "rawRepositoryRecord",
  "rawCurrentState",
  "fullHistory",
  "historyEntries",
  "lifecycleHistoryContent",
  "sourceUrl",
  "sourcePath",
  "databaseLocator",
  "connectionString",
  "repositoryHandle",
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
]);

const BROAD_SCOPE_VALUES = new Set([
  "all",
  "any",
  "all-operations",
  "all_operations",
  "all-services",
  "all_services",
  "all-repositories",
  "all_repositories",
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

const CROSS_FIELD_RULES = [
  ["callerProcessRef", "serviceRecipientRef", "serviceRecipientRef"],
  ["evidenceId", "repositoryIdentityRef", "repositoryIdentityRef"],
  [
    "currentStateEvidenceRef",
    "writerTransitionEvidenceRef",
    "writerTransitionEvidenceRef",
  ],
  [
    "currentStateEvidenceRef",
    "lifecycleHistoryEvidenceRef",
    "lifecycleHistoryEvidenceRef",
  ],
  [
    "writerTransitionEvidenceRef",
    "lifecycleHistoryEvidenceRef",
    "lifecycleHistoryEvidenceRef",
  ],
  ["sourceProvenanceRef", "evidenceId", "sourceProvenanceRef"],
  ["sourceProvenanceRef", "repositoryIdentityRef", "sourceProvenanceRef"],
  ["writerProvenanceRef", "evidenceId", "writerProvenanceRef"],
  ["writerProvenanceRef", "repositoryIdentityRef", "writerProvenanceRef"],
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

function hasError(errors, code, path) {
  return errors.some((error) => error.code === code && error.path === path);
}

function addError(errors, invalidFields, code, path) {
  if (!hasError(errors, code, path)) {
    errors.push(makeError(code, path));
  }

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

function validateLocalServicePermissionRepositoryCurrentnessEvidence(value) {
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
      addError(errors, invalidFields, "PROHIBITED_FIELD", field);
    });

  unexpectedFields
    .filter((field) => !PROHIBITED_FIELDS.has(field))
    .forEach((field) => {
      addError(errors, invalidFields, "UNKNOWN_FIELD", field);
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

  if (
    structurallyValidStringField(
      descriptors,
      invalidFields,
      "permissionLifecyclePosture",
    )
  ) {
    const errorCode = validateEnum(
      getOwnEnumerableDataValue(descriptors, "permissionLifecyclePosture"),
      LIFECYCLE_POSTURES,
    );

    if (errorCode) {
      addError(errors, invalidFields, errorCode, "permissionLifecyclePosture");
    }
  }

  if (
    structurallyValidStringField(
      descriptors,
      invalidFields,
      "repositoryCurrentnessDeclaration",
    )
  ) {
    const errorCode = validateEnum(
      getOwnEnumerableDataValue(descriptors, "repositoryCurrentnessDeclaration"),
      CURRENTNESS_DECLARATIONS,
    );

    if (errorCode) {
      addError(
        errors,
        invalidFields,
        errorCode,
        "repositoryCurrentnessDeclaration",
      );
    }
  }

  if (
    structurallyValidStringField(
      descriptors,
      invalidFields,
      "currentHistoryConsistencyDeclaration",
    )
  ) {
    const errorCode = validateEnum(
      getOwnEnumerableDataValue(
        descriptors,
        "currentHistoryConsistencyDeclaration",
      ),
      CURRENT_HISTORY_CONSISTENCY_DECLARATIONS,
    );

    if (errorCode) {
      addError(
        errors,
        invalidFields,
        errorCode,
        "currentHistoryConsistencyDeclaration",
      );
    }
  }

  if (
    structurallyValidStringField(
      descriptors,
      invalidFields,
      "reconciliationDeclaration",
    )
  ) {
    const errorCode = validateEnum(
      getOwnEnumerableDataValue(descriptors, "reconciliationDeclaration"),
      RECONCILIATION_DECLARATIONS,
    );

    if (errorCode) {
      addError(errors, invalidFields, errorCode, "reconciliationDeclaration");
    }
  }

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

const LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_IDENTITY =
  deepFreeze({
    contractName: CONTRACT_NAME,
    version: CONTRACT_VERSION,
    evidenceKind: CONTRACT_KIND,
  });

const LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE =
  deepFreeze(
    Object.fromEntries([
      ...POSTURE_TRUE_FIELDS.map((field) => [field, true]),
      ...POSTURE_FALSE_FIELDS.map((field) => [field, false]),
    ]),
  );

const LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_TOP_LEVEL_FIELDS =
  deepFreeze([...TOP_LEVEL_FIELDS]);

const LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_OPAQUE_REFERENCE_FIELDS =
  deepFreeze([...OPAQUE_REFERENCE_FIELDS]);

const LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_LIFECYCLE_POSTURES =
  deepFreeze([...LIFECYCLE_POSTURES]);

const LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CURRENTNESS_DECLARATIONS =
  deepFreeze([...CURRENTNESS_DECLARATIONS]);

const LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CURRENT_HISTORY_CONSISTENCY_DECLARATIONS =
  deepFreeze([...CURRENT_HISTORY_CONSISTENCY_DECLARATIONS]);

const LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_RECONCILIATION_DECLARATIONS =
  deepFreeze([...RECONCILIATION_DECLARATIONS]);

const LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_VERIFICATION_POSTURES =
  deepFreeze([...VERIFICATION_POSTURES]);

const LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_VALIDATION_ERROR_CODES =
  deepFreeze([...VALIDATION_ERROR_CODES]);

module.exports = {
  LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_IDENTITY,
  LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE,
  LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_TOP_LEVEL_FIELDS,
  LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_LIFECYCLE_POSTURES,
  LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CURRENTNESS_DECLARATIONS,
  LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CURRENT_HISTORY_CONSISTENCY_DECLARATIONS,
  LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_RECONCILIATION_DECLARATIONS,
  LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_VERIFICATION_POSTURES,
  LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_VALIDATION_ERROR_CODES,
  validateLocalServicePermissionRepositoryCurrentnessEvidence,
};
