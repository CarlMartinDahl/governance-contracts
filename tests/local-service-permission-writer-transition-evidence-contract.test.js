"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/local-service-permission-writer-transition-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");

const {
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
} = contract;

const EXPECTED_EXPORTS = [
  "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_IDENTITY",
  "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_POSTURE",
  "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TOP_LEVEL_FIELDS",
  "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_OPAQUE_REFERENCE_FIELDS",
  "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_LIFECYCLE_POSTURES",
  "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TRANSITION_CATEGORIES",
  "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TRANSACTION_OUTCOME_POSTURES",
  "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_VERIFICATION_POSTURES",
  "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_VALIDATION_ERROR_CODES",
  "validateLocalServicePermissionWriterTransitionEvidence",
];

const EXPECTED_TOP_LEVEL_FIELDS = [
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

const EXPECTED_OPAQUE_REFERENCE_FIELDS = [
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

const EXPECTED_TRANSITION_CATEGORIES = [
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

const EXPECTED_TRANSACTION_OUTCOMES = [
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_NOT_ATTEMPTED",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_REJECTED_BEFORE_EFFECT",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_ACCEPTED_FOR_EXECUTION",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_OUTCOME_UNKNOWN",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_COMMITTED",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_NOT_COMMITTED",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_RECONCILIATION_REQUIRED",
  "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_DISPUTED",
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

const PROHIBITED_FIELDS = [
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
];

function makeValidEnvelope(overrides = {}) {
  return {
    contractVersion: "v1",
    evidenceKind: "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE",
    verificationPosture: "NOT_VERIFIED_BY_CONTRACT",
    evidenceId: "evidence:transition:001",
    permissionDeclarationRef: "permission:declaration:001",
    callerProcessRef: "process:api:001",
    serviceRecipientRef: "service:identity:001",
    serviceOperationRef: "operation:session-resolution:001",
    requestPurposeRef: "purpose:operation-context:001",
    priorLifecyclePosture:
      "LOCAL_SERVICE_PERMISSION_DECLARED_PENDING_APPROVAL",
    expectedCurrentStateVersionRef: "version:permission:001",
    transitionCategory:
      "LOCAL_SERVICE_PERMISSION_TRANSITION_DECLARED_APPROVAL",
    resultingLifecyclePosture:
      "LOCAL_SERVICE_PERMISSION_DECLARED_APPROVED_NOT_ACTIVE",
    resultingCurrentStateVersionRef: "version:permission:002",
    administrationApprovalEvidenceRef: "approval:evidence:001",
    writerProvenanceRef: "writer:provenance:001",
    transactionOutcomeDeclaration:
      "LOCAL_SERVICE_PERMISSION_TRANSACTION_OUTCOME_DECLARED_OUTCOME_UNKNOWN",
    lifecycleHistoryEntryRef: "history:entry:001",
    sourceProvenanceRef: "source:provenance:001",
    humanProfessionalReviewRequired: true,
    ...overrides,
  };
}

function assertDeepFrozen(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return;
  }

  seen.add(value);
  assert.equal(Object.isFrozen(value), true);

  Reflect.ownKeys(Object.getOwnPropertyDescriptors(value)).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);

    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      assertDeepFrozen(descriptor.value, seen);
    }
  });
}

function validate(envelope) {
  return validateLocalServicePermissionWriterTransitionEvidence(envelope);
}

function errorsFor(envelope) {
  return validate(envelope).errors;
}

function assertSingleError(envelope, code, path) {
  assert.deepEqual(errorsFor(envelope), [{ code, path }]);
}

test("exact module exports and export count", () => {
  assert.deepEqual(Object.keys(contract), EXPECTED_EXPORTS);
  assert.equal(Object.keys(contract).length, 10);
  assert.equal(
    Object.values(contract).filter((value) => typeof value === "function")
      .length,
    1,
  );
  assert.equal(validateLocalServicePermissionWriterTransitionEvidence.length, 1);
  assert.equal(
    validateLocalServicePermissionWriterTransitionEvidence.name,
    "validateLocalServicePermissionWriterTransitionEvidence",
  );
  assert.equal(Object.hasOwn(contract, "default"), false);
});

test("package-index reference equivalence", () => {
  EXPECTED_EXPORTS.forEach((name) => {
    assert.equal(packageIndex[name], contract[name], name);
  });
});

test("contract identity and posture", () => {
  assert.deepEqual(
    Object.keys(
      LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_IDENTITY,
    ),
    ["contractName", "version", "evidenceKind"],
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_IDENTITY,
    {
      contractName: "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT",
      version: "v1",
      evidenceKind: "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE",
    },
  );
  [
    "contractOnly",
    "proveOnly",
    "schemaValidatorOnly",
    "localServicePermissionWriterTransitionEvidenceOnly",
    "humanProfessionalReviewRequired",
  ].forEach((field) => {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_POSTURE[field],
      true,
      field,
    );
  });
  [
    "permissionCreated",
    "permissionTransitionCreated",
    "approvalCreated",
    "executionCreated",
    "writerIdentityCreated",
    "writerAuthorizationCreated",
    "repositoryCreated",
    "transactionCreated",
    "resolverCreated",
    "evaluatorCreated",
    "serviceAuthorizationCreated",
    "accessGrantCreated",
    "lookupCreated",
    "routeIntegrationCreated",
    "persistenceCreated",
    "auditEventEmitted",
    "providerRoutingCreated",
    "externalUseAuthorized",
    "technicalSignOffCreated",
    "runtimeCertificationCreated",
    "releaseApprovalCreated",
    "blockerClosureCreated",
  ].forEach((field) => {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_POSTURE[field],
      false,
      field,
    );
  });
  assertDeepFrozen(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_IDENTITY,
  );
  assertDeepFrozen(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_POSTURE,
  );
});

test("exact top-level field declarations and order", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TOP_LEVEL_FIELDS,
    EXPECTED_TOP_LEVEL_FIELDS,
  );
  assert.equal(EXPECTED_TOP_LEVEL_FIELDS.length, 20);
  assertDeepFrozen(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TOP_LEVEL_FIELDS,
  );
});

test("exact opaque-reference declarations and order", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
    EXPECTED_OPAQUE_REFERENCE_FIELDS,
  );
  assert.equal(EXPECTED_OPAQUE_REFERENCE_FIELDS.length, 12);
  assertDeepFrozen(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  );
});

test("exact lifecycle declaration values and order", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_LIFECYCLE_POSTURES,
    EXPECTED_LIFECYCLE_POSTURES,
  );
  assert.equal(EXPECTED_LIFECYCLE_POSTURES.length, 14);
  assertDeepFrozen(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_LIFECYCLE_POSTURES,
  );
});

test("exact transition values and order", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TRANSITION_CATEGORIES,
    EXPECTED_TRANSITION_CATEGORIES,
  );
  assert.equal(EXPECTED_TRANSITION_CATEGORIES.length, 13);
  assertDeepFrozen(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TRANSITION_CATEGORIES,
  );
});

test("exact transaction-outcome and verification values", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TRANSACTION_OUTCOME_POSTURES,
    EXPECTED_TRANSACTION_OUTCOMES,
  );
  assert.equal(EXPECTED_TRANSACTION_OUTCOMES.length, 8);
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_VERIFICATION_POSTURES,
    ["NOT_VERIFIED_BY_CONTRACT"],
  );
  assertDeepFrozen(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_TRANSACTION_OUTCOME_POSTURES,
  );
  assertDeepFrozen(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_VERIFICATION_POSTURES,
  );
});

test("exact error-code declarations and order", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_VALIDATION_ERROR_CODES,
    EXPECTED_ERROR_CODES,
  );
  assert.equal(EXPECTED_ERROR_CODES.length, 10);
  assertDeepFrozen(
    LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_VALIDATION_ERROR_CODES,
  );
});

test("one valid minimal synthetic envelope", () => {
  const input = makeValidEnvelope();
  const snapshot = { ...input };
  const result = validate(input);
  const second = validate(input);

  assert.deepEqual(Object.keys(result), ["valid", "contractKind", "version", "errors"]);
  assert.equal(result.valid, true);
  assert.equal(
    result.contractKind,
    "LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT",
  );
  assert.equal(result.version, "v1");
  assert.deepEqual(result.errors, []);
  assert.notEqual(result, second);
  assert.deepEqual(result, second);
  assert.deepEqual(input, snapshot);
  assert.equal(Object.isFrozen(input), false);
  assertDeepFrozen(result);
});

test("every lifecycle value is structurally accepted in prior and resulting posture positions", () => {
  EXPECTED_LIFECYCLE_POSTURES.forEach((lifecyclePosture) => {
    assert.equal(
      validate(makeValidEnvelope({ priorLifecyclePosture: lifecyclePosture }))
        .valid,
      true,
      lifecyclePosture,
    );
    assert.equal(
      validate(makeValidEnvelope({ resultingLifecyclePosture: lifecyclePosture }))
        .valid,
      true,
      lifecyclePosture,
    );
  });
});

test("every transition category is structurally accepted", () => {
  EXPECTED_TRANSITION_CATEGORIES.forEach((transitionCategory) => {
    assert.equal(
      validate(makeValidEnvelope({ transitionCategory })).valid,
      true,
      transitionCategory,
    );
  });
});

test("every transaction-outcome declaration is structurally accepted", () => {
  EXPECTED_TRANSACTION_OUTCOMES.forEach((transactionOutcomeDeclaration) => {
    assert.equal(
      validate(makeValidEnvelope({ transactionOutcomeDeclaration })).valid,
      true,
      transactionOutcomeDeclaration,
    );
  });
});

test("missing required fields and exact deterministic paths", () => {
  assert.deepEqual(
    errorsFor({}),
    EXPECTED_TOP_LEVEL_FIELDS.map((field) => ({
      code: "MISSING_FIELD",
      path: field,
    })),
  );
  EXPECTED_TOP_LEVEL_FIELDS.forEach((field) => {
    const envelope = makeValidEnvelope();

    delete envelope[field];
    assert.equal(
      errorsFor(envelope).some(
        (error) => error.code === "MISSING_FIELD" && error.path === field,
      ),
      true,
      field,
    );
  });
});

test("unknown fields and prohibited fields remain distinct", () => {
  const envelope = makeValidEnvelope();

  envelope.zeta = "synthetic:zeta";
  envelope.alpha = "synthetic:alpha";
  envelope.authorized = true;
  envelope.grant = true;

  assert.deepEqual(errorsFor(envelope), [
    { code: "PROHIBITED_FIELD", path: "authorized" },
    { code: "PROHIBITED_FIELD", path: "grant" },
    { code: "UNKNOWN_FIELD", path: "alpha" },
    { code: "UNKNOWN_FIELD", path: "zeta" },
  ]);

  const allProhibited = makeValidEnvelope();
  PROHIBITED_FIELDS.forEach((field) => {
    allProhibited[field] = `synthetic:${field}`;
  });
  assert.deepEqual(
    errorsFor(allProhibited),
    [...PROHIBITED_FIELDS].sort().map((field) => ({
      code: "PROHIBITED_FIELD",
      path: field,
    })),
  );
});

test("invalid top-level values", () => {
  class CustomClass {}
  [
    undefined,
    null,
    "value",
    1,
    true,
    [],
    new Date("2026-01-01T00:00:00Z"),
    new Map(),
    new Set(),
    Buffer.from("x"),
    function invalidFunction() {},
    new CustomClass(),
    Object.create(null),
  ].forEach((value) => {
    assert.deepEqual(errorsFor(value), [{ code: "INVALID_TYPE", path: "$" }]);
  });
});

test("invalid primitive types and fixed literals", () => {
  EXPECTED_TOP_LEVEL_FIELDS.filter(
    (field) => field !== "humanProfessionalReviewRequired",
  ).forEach((field) => {
    assertSingleError(makeValidEnvelope({ [field]: 1 }), "INVALID_TYPE", field);
  });
  [
    ["contractVersion", "v2"],
    ["evidenceKind", "OTHER_EVIDENCE"],
    ["verificationPosture", "VERIFIED"],
  ].forEach(([field, value]) => {
    assertSingleError(makeValidEnvelope({ [field]: value }), "INVALID_ENUM", field);
  });
});

test("invalid lifecycle, transition, outcome, verification, and review boolean", () => {
  [
    "priorLifecyclePosture",
    "resultingLifecyclePosture",
    "transitionCategory",
    "transactionOutcomeDeclaration",
    "verificationPosture",
  ].forEach((field) => {
    assertSingleError(makeValidEnvelope({ [field]: "WRONG" }), "INVALID_ENUM", field);
  });
  [false, "true", 1, null, undefined].forEach((value) => {
    assertSingleError(
      makeValidEnvelope({ humanProfessionalReviewRequired: value }),
      "INVALID_BOOLEAN",
      "humanProfessionalReviewRequired",
    );
  });
});

test("invalid opaque references, wildcard precedence, and broad-scope precedence", () => {
  const invalidValues = [
    "",
    "a".repeat(129),
    " leading",
    "trailing ",
    "embedded space",
    "has/slash",
    "has\\backslash",
    "has?query",
    "has#fragment",
    ".",
    "..",
    "http://example",
    "HTTPS://example",
  ];

  EXPECTED_OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    invalidValues.forEach((value) => {
      assertSingleError(
        makeValidEnvelope({ [field]: value }),
        "INVALID_OPAQUE_REFERENCE",
        field,
      );
    });
    assertSingleError(
      makeValidEnvelope({ [field]: "permission:*" }),
      "PROHIBITED_WILDCARD",
      field,
    );
    ["all", "ANY", "all-operations", "ALL_OPERATIONS", "all-services"].forEach(
      (value) => {
        assertSingleError(
          makeValidEnvelope({ [field]: value }),
          "PROHIBITED_BROAD_SCOPE",
          field,
        );
      },
    );
  });
});

test("all four cross-field structural rules", () => {
  assertSingleError(
    makeValidEnvelope({ serviceRecipientRef: "process:api:001" }),
    "INVALID_CROSS_FIELD_COMBINATION",
    "serviceRecipientRef",
  );
  assertSingleError(
    makeValidEnvelope({ resultingCurrentStateVersionRef: "version:permission:001" }),
    "INVALID_CROSS_FIELD_COMBINATION",
    "resultingCurrentStateVersionRef",
  );
  assertSingleError(
    makeValidEnvelope({ writerProvenanceRef: "approval:evidence:001" }),
    "INVALID_CROSS_FIELD_COMBINATION",
    "writerProvenanceRef",
  );
  assertSingleError(
    makeValidEnvelope({ lifecycleHistoryEntryRef: "evidence:transition:001" }),
    "INVALID_CROSS_FIELD_COMBINATION",
    "lifecycleHistoryEntryRef",
  );
});

test("deterministic aggregation, insertion-order independence, no duplicate errors, no rejected-value echo, deep freeze, isolated results, input preservation, and no input freeze", () => {
  const first = makeValidEnvelope({
    contractVersion: "WRONG",
    evidenceId: "bad/slash",
    priorLifecyclePosture: "BAD_LIFECYCLE",
    humanProfessionalReviewRequired: false,
  });
  first.zeta = "synthetic:zeta";
  first.authorized = true;
  first.alpha = "synthetic:alpha";

  const second = {
    authorized: true,
    alpha: "synthetic:alpha",
    zeta: "synthetic:zeta",
    ...makeValidEnvelope({
      humanProfessionalReviewRequired: false,
      priorLifecyclePosture: "BAD_LIFECYCLE",
      evidenceId: "bad/slash",
      contractVersion: "WRONG",
    }),
  };

  const expected = [
    { code: "PROHIBITED_FIELD", path: "authorized" },
    { code: "UNKNOWN_FIELD", path: "alpha" },
    { code: "UNKNOWN_FIELD", path: "zeta" },
    { code: "INVALID_TYPE", path: "contractVersion" },
    { code: "INVALID_TYPE", path: "evidenceId" },
    { code: "INVALID_TYPE", path: "priorLifecyclePosture" },
    { code: "INVALID_BOOLEAN", path: "humanProfessionalReviewRequired" },
  ];
  Object.defineProperty(first, "contractVersion", {
    enumerable: true,
    get() {
      throw new Error("getter must not run");
    },
  });
  Object.defineProperty(first, "evidenceId", {
    enumerable: true,
    get() {
      throw new Error("getter must not run");
    },
  });
  Object.defineProperty(first, "priorLifecyclePosture", {
    enumerable: true,
    get() {
      throw new Error("getter must not run");
    },
  });
  Object.defineProperty(second, "contractVersion", {
    enumerable: true,
    get() {
      throw new Error("getter must not run");
    },
  });
  Object.defineProperty(second, "evidenceId", {
    enumerable: true,
    get() {
      throw new Error("getter must not run");
    },
  });
  Object.defineProperty(second, "priorLifecyclePosture", {
    enumerable: true,
    get() {
      throw new Error("getter must not run");
    },
  });

  const beforeKeys = Object.keys(first);
  const result = validate(first);
  const resultTwo = validate(second);

  assert.deepEqual(result.errors, expected);
  assert.deepEqual(resultTwo.errors, expected);
  assert.notEqual(result, resultTwo);
  assertDeepFrozen(result);
  assert.equal(Object.isFrozen(first), false);
  assert.deepEqual(Object.keys(first), beforeKeys);
  result.errors.forEach((error) => {
    assert.deepEqual(Object.keys(error), ["code", "path"]);
    assert.equal(Object.hasOwn(error, "value"), false);
    assert.equal(Object.hasOwn(error, "message"), false);
  });
  ["WRONG", "bad/slash", "BAD_LIFECYCLE"].forEach((rejectedValue) => {
    assert.equal(JSON.stringify(result).includes(rejectedValue), false);
  });
});

test("accessor and cycle safety plus absence of lookup, dispatch, repository, writer, resolver, evaluator, route, persistence, authorization, grant, or runtime behavior", () => {
  let getterInvoked = false;
  const accessorEnvelope = makeValidEnvelope();
  Object.defineProperty(accessorEnvelope, "writerProvenanceRef", {
    enumerable: true,
    get() {
      getterInvoked = true;
      return "writer:provenance:bad";
    },
  });

  assertSingleError(accessorEnvelope, "INVALID_TYPE", "writerProvenanceRef");
  assert.equal(getterInvoked, false);

  const cycle = {};
  cycle.self = cycle;
  assertSingleError(
    makeValidEnvelope({ sourceProvenanceRef: cycle }),
    "INVALID_TYPE",
    "sourceProvenanceRef",
  );
  assert.equal(Object.isFrozen(cycle), false);

  [
    "lookupCreated",
    "registryLookupCreated",
    "dynamicDispatchCreated",
    "validatorDispatchCreated",
    "repositoryCreated",
    "writerIdentityCreated",
    "resolverCreated",
    "evaluatorCreated",
    "routeIntegrationCreated",
    "persistenceCreated",
    "serviceAuthorizationCreated",
    "accessGrantCreated",
  ].forEach((field) => {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_WRITER_TRANSITION_EVIDENCE_CONTRACT_POSTURE[field],
      false,
      field,
    );
  });
  [
    "lookupLocalServicePermissionWriterTransitionEvidence",
    "dispatchLocalServicePermissionWriterTransitionEvidence",
    "writeLocalServicePermissionWriterTransitionEvidence",
    "authorizeLocalServicePermissionWriterTransitionEvidence",
    "grantLocalServicePermissionWriterTransitionEvidence",
  ].forEach((name) => {
    assert.equal(Object.hasOwn(contract, name), false, name);
  });
});
