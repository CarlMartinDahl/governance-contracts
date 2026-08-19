"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/local-service-permission-repository-currentness-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");

const {
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
} = contract;

const EXPECTED_EXPORTS = [
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_IDENTITY",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_TOP_LEVEL_FIELDS",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_OPAQUE_REFERENCE_FIELDS",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_LIFECYCLE_POSTURES",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CURRENTNESS_DECLARATIONS",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CURRENT_HISTORY_CONSISTENCY_DECLARATIONS",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_RECONCILIATION_DECLARATIONS",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_VERIFICATION_POSTURES",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_VALIDATION_ERROR_CODES",
  "validateLocalServicePermissionRepositoryCurrentnessEvidence",
];

const EXPECTED_FIELDS = [
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

const EXPECTED_OPAQUE_FIELDS = [
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

const EXPECTED_LIFECYCLE_POSTURES = [
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

const EXPECTED_CURRENTNESS_DECLARATIONS = [
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_NOT_ASSESSED",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_CURRENT",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_NOT_CURRENT",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_STALE",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_CONFLICTING",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_DISPUTED",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_UNAVAILABLE",
  "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_UNKNOWN",
];

const EXPECTED_CONSISTENCY_DECLARATIONS = [
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_NOT_ASSESSED",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_CONSISTENT",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_MISMATCH",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_CONFLICTING",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_DISPUTED",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_UNAVAILABLE",
  "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_UNKNOWN",
];

const EXPECTED_RECONCILIATION_DECLARATIONS = [
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_NOT_ASSESSED",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_NOT_REQUIRED",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_REQUIRED",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_PENDING",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_OUTCOME_UNKNOWN",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_DISPUTED",
  "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_UNAVAILABLE",
];

const EXPECTED_ERROR_CODES = [
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

const EXPECTED_TRUE_POSTURE_FIELDS = [
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

const EXPECTED_FALSE_POSTURE_FIELDS = [
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

const PROHIBITED_FIELDS = [
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
];

function validEnvelope(overrides = {}) {
  return {
    contractVersion: "v1",
    evidenceKind: "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE",
    verificationPosture: "NOT_VERIFIED_BY_CONTRACT",
    evidenceId: "evidence:repository-currentness:1",
    permissionDeclarationRef: "permission:declaration:1",
    callerProcessRef: "process:caller:1",
    serviceRecipientRef: "service:recipient:1",
    serviceOperationRef: "service:operation:review",
    requestPurposeRef: "purpose:review:1",
    repositoryIdentityRef: "repository:identity:1",
    currentStateEvidenceRef: "evidence:current-state:1",
    writerTransitionEvidenceRef: "evidence:writer-transition:1",
    lifecycleHistoryEvidenceRef: "evidence:lifecycle-history:1",
    sourceProvenanceRef: "provenance:source:1",
    writerProvenanceRef: "provenance:writer:1",
    expectedCurrentStateVersionRef: "version:expected:1",
    declaredCurrentStateVersionRef: "version:declared:1",
    permissionLifecyclePosture:
      "LOCAL_SERVICE_PERMISSION_DECLARED_CURRENT_ACTIVE",
    repositoryCurrentnessDeclaration:
      "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_CLAIMED_NOT_ASSESSED",
    currentHistoryConsistencyDeclaration:
      "LOCAL_SERVICE_PERMISSION_CURRENT_HISTORY_CONSISTENCY_CLAIMED_NOT_ASSESSED",
    reconciliationDeclaration:
      "LOCAL_SERVICE_PERMISSION_RECONCILIATION_CLAIMED_NOT_ASSESSED",
    humanProfessionalReviewRequired: true,
    ...overrides,
  };
}

function validate(overrides = {}) {
  return validateLocalServicePermissionRepositoryCurrentnessEvidence(
    validEnvelope(overrides),
  );
}

function errorPairs(result) {
  return result.errors.map((error) => `${error.code}:${error.path}`);
}

test("exports the exact repository-currentness evidence contract surface", () => {
  assert.deepEqual(Object.keys(contract), EXPECTED_EXPORTS);
  assert.equal(
    Object.values(contract).filter((value) => typeof value === "function")
      .length,
    1,
  );
  assert.equal(
    validateLocalServicePermissionRepositoryCurrentnessEvidence.length,
    1,
  );
});

test("package index exposes the exact reference-equivalent contract surface", () => {
  for (const exportName of EXPECTED_EXPORTS) {
    assert.equal(packageIndex[exportName], contract[exportName]);
  }
});

test("freezes the exact contract identity and posture objects", () => {
  assert.deepEqual(
    Object.keys(
      LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_IDENTITY,
    ),
    ["contractName", "version", "evidenceKind"],
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_IDENTITY,
    {
      contractName:
        "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT",
      version: "v1",
      evidenceKind: "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE",
    },
  );
  assert.equal(
    Object.isFrozen(
      LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_IDENTITY,
    ),
    true,
  );
  assert.deepEqual(
    Object.keys(
      LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE,
    ),
    [...EXPECTED_TRUE_POSTURE_FIELDS, ...EXPECTED_FALSE_POSTURE_FIELDS],
  );
  assert.equal(EXPECTED_TRUE_POSTURE_FIELDS.length, 10);
  assert.equal(EXPECTED_FALSE_POSTURE_FIELDS.length, 40);
  for (const field of EXPECTED_TRUE_POSTURE_FIELDS) {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE[
        field
      ],
      true,
    );
  }
  for (const field of EXPECTED_FALSE_POSTURE_FIELDS) {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE[
        field
      ],
      false,
    );
  }
  assert.equal(
    Object.isFrozen(
      LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE,
    ),
    true,
  );
});

test("freezes the exact field and opaque-reference declarations", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_TOP_LEVEL_FIELDS,
    EXPECTED_FIELDS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
    EXPECTED_OPAQUE_FIELDS,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_TOP_LEVEL_FIELDS
      .length,
    22,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_OPAQUE_REFERENCE_FIELDS
      .length,
    14,
  );
  assert.equal(
    Object.isFrozen(
      LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_TOP_LEVEL_FIELDS,
    ),
    true,
  );
  assert.equal(
    Object.isFrozen(
      LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
    ),
    true,
  );
});

test("accepts every exact lifecycle declaration in a synthetic envelope", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_LIFECYCLE_POSTURES,
    EXPECTED_LIFECYCLE_POSTURES,
  );
  for (const permissionLifecyclePosture of EXPECTED_LIFECYCLE_POSTURES) {
    assert.equal(validate({ permissionLifecyclePosture }).valid, true);
  }
});

test("accepts every exact repository-currentness declaration", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CURRENTNESS_DECLARATIONS,
    EXPECTED_CURRENTNESS_DECLARATIONS,
  );
  for (const repositoryCurrentnessDeclaration of EXPECTED_CURRENTNESS_DECLARATIONS) {
    assert.equal(validate({ repositoryCurrentnessDeclaration }).valid, true);
  }
});

test("accepts every exact consistency and reconciliation declaration", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CURRENT_HISTORY_CONSISTENCY_DECLARATIONS,
    EXPECTED_CONSISTENCY_DECLARATIONS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_RECONCILIATION_DECLARATIONS,
    EXPECTED_RECONCILIATION_DECLARATIONS,
  );
  for (const currentHistoryConsistencyDeclaration of EXPECTED_CONSISTENCY_DECLARATIONS) {
    assert.equal(validate({ currentHistoryConsistencyDeclaration }).valid, true);
  }
  for (const reconciliationDeclaration of EXPECTED_RECONCILIATION_DECLARATIONS) {
    assert.equal(validate({ reconciliationDeclaration }).valid, true);
  }
});

test("exports the exact verification posture error taxonomy and result shape", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_VERIFICATION_POSTURES,
    ["NOT_VERIFIED_BY_CONTRACT"],
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_VALIDATION_ERROR_CODES,
    EXPECTED_ERROR_CODES,
  );
  const result = validate();
  assert.deepEqual(Object.keys(result), [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.equal(
    result.contractKind,
    "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT",
  );
  assert.equal(result.version, "v1");
  assert.deepEqual(result.errors, []);
});

test("accepts one fully synthetic no-raw repository-currentness evidence envelope", () => {
  assert.deepEqual(validate(), {
    valid: true,
    contractKind:
      "LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT",
    version: "v1",
    errors: [],
  });
});

test("requires every field and permits no optional field", () => {
  const missing = validateLocalServicePermissionRepositoryCurrentnessEvidence({});
  assert.equal(missing.valid, false);
  assert.deepEqual(
    missing.errors.map((error) => error.path),
    EXPECTED_FIELDS,
  );
  assert.equal(
    missing.errors.every((error) => error.code === "MISSING_FIELD"),
    true,
  );
  assert.equal(validate({ optionalRef: "optional:1" }).valid, false);
  assert.deepEqual(validate({ optionalRef: "optional:1" }).errors, [
    { code: "UNKNOWN_FIELD", path: "optionalRef" },
  ]);
});

test("rejects prohibited and unknown fields in deterministic lexical phases", () => {
  assert.equal(PROHIBITED_FIELDS.length, 65);
  const result = validate({
    zUnknown: "unknown:1",
    allow: true,
    current: true,
    aUnknown: "unknown:2",
  });
  assert.deepEqual(result.errors, [
    { code: "PROHIBITED_FIELD", path: "allow" },
    { code: "PROHIBITED_FIELD", path: "current" },
    { code: "UNKNOWN_FIELD", path: "aUnknown" },
    { code: "UNKNOWN_FIELD", path: "zUnknown" },
  ]);
});

test("rejects invalid top-level primitive literal boolean and accessor shapes", () => {
  assert.deepEqual(
    validateLocalServicePermissionRepositoryCurrentnessEvidence(null).errors,
    [{ code: "INVALID_TYPE", path: "$" }],
  );
  assert.deepEqual(
    validate({ contractVersion: "v2" }).errors,
    [{ code: "INVALID_ENUM", path: "contractVersion" }],
  );
  assert.deepEqual(
    validate({ humanProfessionalReviewRequired: false }).errors,
    [{ code: "INVALID_BOOLEAN", path: "humanProfessionalReviewRequired" }],
  );
  const envelope = validEnvelope();
  Object.defineProperty(envelope, "evidenceId", {
    enumerable: true,
    get() {
      throw new Error("accessor must not be invoked");
    },
  });
  assert.deepEqual(
    validateLocalServicePermissionRepositoryCurrentnessEvidence(envelope).errors,
    [{ code: "INVALID_TYPE", path: "evidenceId" }],
  );
});

test("rejects invalid lifecycle currentness consistency and reconciliation declarations", () => {
  assert.deepEqual(validate({ permissionLifecyclePosture: "CURRENT" }).errors, [
    { code: "INVALID_ENUM", path: "permissionLifecyclePosture" },
  ]);
  assert.deepEqual(
    validate({ repositoryCurrentnessDeclaration: "VERIFIED_CURRENT" }).errors,
    [{ code: "INVALID_ENUM", path: "repositoryCurrentnessDeclaration" }],
  );
  assert.deepEqual(
    validate({ currentHistoryConsistencyDeclaration: "VERIFIED_CONSISTENT" })
      .errors,
    [{ code: "INVALID_ENUM", path: "currentHistoryConsistencyDeclaration" }],
  );
  assert.deepEqual(
    validate({ reconciliationDeclaration: "RECONCILIATION_COMPLETED" }).errors,
    [{ code: "INVALID_ENUM", path: "reconciliationDeclaration" }],
  );
});

test("enforces bounded opaque-reference syntax without lookup or resolution", () => {
  const validReference = "Aa0._:-".repeat(16);
  assert.equal(validReference.length, 112);
  assert.equal(validate({ evidenceId: validReference }).valid, true);
  assert.deepEqual(validate({ evidenceId: "" }).errors, [
    { code: "INVALID_OPAQUE_REFERENCE", path: "evidenceId" },
  ]);
  assert.deepEqual(validate({ evidenceId: "a".repeat(129) }).errors, [
    { code: "INVALID_OPAQUE_REFERENCE", path: "evidenceId" },
  ]);
  for (const evidenceId of [
    "has space",
    ".",
    "..",
    "path/value",
    "path\\value",
    "query?value",
    "fragment#value",
    "https:source",
  ]) {
    assert.deepEqual(validate({ evidenceId }).errors, [
      { code: "INVALID_OPAQUE_REFERENCE", path: "evidenceId" },
    ]);
  }
});

test("gives wildcard and broad-scope errors precedence over generic reference errors", () => {
  assert.deepEqual(validate({ evidenceId: "bad/value*" }).errors, [
    { code: "PROHIBITED_WILDCARD", path: "evidenceId" },
  ]);
  for (const evidenceId of [
    "all",
    "ANY",
    "all-operations",
    "all_operations",
    "all-services",
    "all_services",
    "all-repositories",
    "all_repositories",
  ]) {
    assert.deepEqual(validate({ evidenceId }).errors, [
      { code: "PROHIBITED_BROAD_SCOPE", path: "evidenceId" },
    ]);
  }
});

test("enforces all nine structural cross-field rules with exact paths and valid participants", () => {
  const same = "same:ref:1";
  const result = validate({
    callerProcessRef: same,
    serviceRecipientRef: same,
    evidenceId: same,
    repositoryIdentityRef: same,
    currentStateEvidenceRef: same,
    writerTransitionEvidenceRef: same,
    lifecycleHistoryEvidenceRef: same,
    sourceProvenanceRef: same,
    writerProvenanceRef: same,
  });
  assert.deepEqual(result.errors, [
    { code: "INVALID_CROSS_FIELD_COMBINATION", path: "serviceRecipientRef" },
    { code: "INVALID_CROSS_FIELD_COMBINATION", path: "repositoryIdentityRef" },
    {
      code: "INVALID_CROSS_FIELD_COMBINATION",
      path: "writerTransitionEvidenceRef",
    },
    {
      code: "INVALID_CROSS_FIELD_COMBINATION",
      path: "lifecycleHistoryEvidenceRef",
    },
    { code: "INVALID_CROSS_FIELD_COMBINATION", path: "sourceProvenanceRef" },
    { code: "INVALID_CROSS_FIELD_COMBINATION", path: "writerProvenanceRef" },
  ]);
  assert.deepEqual(
    validate({
      callerProcessRef: "bad/ref",
      serviceRecipientRef: "bad/ref",
    }).errors,
    [
      { code: "INVALID_OPAQUE_REFERENCE", path: "callerProcessRef" },
      { code: "INVALID_OPAQUE_REFERENCE", path: "serviceRecipientRef" },
    ],
  );
});

test("aggregates errors deterministically without duplicate pairs or rejected-value echo", () => {
  const first = validate({
    zUnknown: "hidden",
    contractVersion: "wrong",
    evidenceId: "all",
    repositoryIdentityRef: "all",
    permissionLifecyclePosture: "bad",
  });
  const second = validate({
    permissionLifecyclePosture: "bad",
    repositoryIdentityRef: "all",
    evidenceId: "all",
    contractVersion: "wrong",
    zUnknown: "hidden",
  });
  assert.deepEqual(first, second);
  assert.equal(new Set(errorPairs(first)).size, first.errors.length);
  assert.equal(JSON.stringify(first).includes("hidden"), false);
  assert.equal(JSON.stringify(first).includes("wrong"), false);
});

test("deep-freezes isolated results while preserving and not freezing caller input", () => {
  const input = validEnvelope();
  const beforeKeys = Object.keys(input);
  const result = validateLocalServicePermissionRepositoryCurrentnessEvidence(input);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.errors), true);
  assert.equal(Object.isFrozen(input), false);
  assert.deepEqual(Object.keys(input), beforeKeys);
  assert.notEqual(result, validateLocalServicePermissionRepositoryCurrentnessEvidence(input));
  const invalid = validate({ evidenceId: "" });
  assert.equal(Object.isFrozen(invalid.errors[0]), true);
  assert.deepEqual(Object.keys(invalid.errors[0]), ["code", "path"]);
});

test("is accessor-safe and cycle-safe without recursive traversal", () => {
  const cyclic = validEnvelope();
  cyclic.self = cyclic;
  assert.deepEqual(
    validateLocalServicePermissionRepositoryCurrentnessEvidence(cyclic).errors,
    [{ code: "UNKNOWN_FIELD", path: "self" }],
  );
  const envelope = validEnvelope();
  Object.defineProperty(envelope, "readerAuthorized", {
    enumerable: true,
    get() {
      throw new Error("prohibited accessor must not be invoked");
    },
  });
  assert.deepEqual(
    validateLocalServicePermissionRepositoryCurrentnessEvidence(envelope).errors,
    [{ code: "PROHIBITED_FIELD", path: "readerAuthorized" }],
  );
});

test("creates no repository currentness trusted-read resolver evaluator authorization or runtime behavior", () => {
  assert.equal(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE
      .repositoryCurrentnessVerified,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE
      .trustedReadPerformed,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE
      .resolverOutputCreated,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE
      .evaluatorDecisionCreated,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE
      .serviceAuthorizationCreated,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_REPOSITORY_CURRENTNESS_EVIDENCE_CONTRACT_POSTURE
      .accessGranted,
    false,
  );
});
