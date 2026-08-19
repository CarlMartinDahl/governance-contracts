"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/local-service-permission-lifecycle-history-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");

const {
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_IDENTITY,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_POSTURE,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_TOP_LEVEL_FIELDS,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_LIFECYCLE_POSTURES,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VERIFICATION_POSTURES,
  LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VALIDATION_ERROR_CODES,
  validateLocalServicePermissionLifecycleHistoryEvidence,
} = contract;

const EXPECTED_EXPORTS = [
  "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_IDENTITY",
  "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_POSTURE",
  "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_TOP_LEVEL_FIELDS",
  "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_OPAQUE_REFERENCE_FIELDS",
  "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_LIFECYCLE_POSTURES",
  "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VERIFICATION_POSTURES",
  "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VALIDATION_ERROR_CODES",
  "validateLocalServicePermissionLifecycleHistoryEvidence",
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
  "lifecycleHistoryEntryRef",
  "writerTransitionEvidenceRef",
  "priorLifecyclePosture",
  "resultingLifecyclePosture",
  "expectedCurrentStateVersionRef",
  "resultingCurrentStateVersionRef",
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
  "lifecycleHistoryEntryRef",
  "writerTransitionEvidenceRef",
  "expectedCurrentStateVersionRef",
  "resultingCurrentStateVersionRef",
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

const EXPECTED_TRUE_FIELDS = [
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

const EXPECTED_FALSE_FIELDS = [
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

const PROHIBITED_FIELDS = [
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
];

function makeValidEnvelope(overrides = {}) {
  return {
    contractVersion: "v1",
    evidenceKind: "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE",
    verificationPosture: "NOT_VERIFIED_BY_CONTRACT",
    evidenceId: "evidence:lifecycle_history:001",
    permissionDeclarationRef: "permission:declaration:001",
    callerProcessRef: "process:api:001",
    serviceRecipientRef: "service:identity:001",
    serviceOperationRef: "operation:session-resolution:001",
    requestPurposeRef: "purpose:operation-context:001",
    lifecycleHistoryEntryRef: "history:entry:001",
    writerTransitionEvidenceRef: "evidence:transition:001",
    priorLifecyclePosture:
      "LOCAL_SERVICE_PERMISSION_DECLARED_PENDING_APPROVAL",
    resultingLifecyclePosture:
      "LOCAL_SERVICE_PERMISSION_DECLARED_APPROVED_NOT_ACTIVE",
    expectedCurrentStateVersionRef: "version:permission:001",
    resultingCurrentStateVersionRef: "version:permission:002",
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
  return validateLocalServicePermissionLifecycleHistoryEvidence(envelope);
}

function errorsFor(envelope) {
  return validate(envelope).errors;
}

function assertSingleError(envelope, code, path) {
  assert.deepEqual(errorsFor(envelope), [{ code, path }]);
}

test("exact eight direct exports and package-index reference equivalence", () => {
  assert.deepEqual(Object.keys(contract), EXPECTED_EXPORTS);
  assert.equal(Object.keys(contract).length, 8);
  assert.equal(
    Object.values(contract).filter((value) => typeof value === "function")
      .length,
    1,
  );
  assert.equal(
    validateLocalServicePermissionLifecycleHistoryEvidence.name,
    "validateLocalServicePermissionLifecycleHistoryEvidence",
  );
  assert.equal(validateLocalServicePermissionLifecycleHistoryEvidence.length, 1);
  assert.equal(Object.hasOwn(contract, "default"), false);
  EXPECTED_EXPORTS.forEach((name) => {
    assert.equal(packageIndex[name], contract[name], name);
  });
});

test("exact frozen contract identity and exact frozen posture object", () => {
  assert.deepEqual(
    Object.keys(
      LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_IDENTITY,
    ),
    ["contractName", "version", "evidenceKind"],
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_IDENTITY,
    {
      contractName: "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT",
      version: "v1",
      evidenceKind: "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE",
    },
  );
  assert.deepEqual(
    Object.keys(
      LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_POSTURE,
    ),
    [...EXPECTED_TRUE_FIELDS, ...EXPECTED_FALSE_FIELDS],
  );
  assert.equal(EXPECTED_TRUE_FIELDS.length, 10);
  assert.equal(EXPECTED_FALSE_FIELDS.length, 43);
  EXPECTED_TRUE_FIELDS.forEach((field) => {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_POSTURE[
        field
      ],
      true,
      field,
    );
  });
  EXPECTED_FALSE_FIELDS.forEach((field) => {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_POSTURE[
        field
      ],
      false,
      field,
    );
  });
  assertDeepFrozen(
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_IDENTITY,
  );
  assertDeepFrozen(
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_POSTURE,
  );
});

test("exact frozen declaration arrays", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_TOP_LEVEL_FIELDS,
    EXPECTED_TOP_LEVEL_FIELDS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
    EXPECTED_OPAQUE_REFERENCE_FIELDS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_LIFECYCLE_POSTURES,
    EXPECTED_LIFECYCLE_POSTURES,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VERIFICATION_POSTURES,
    ["NOT_VERIFIED_BY_CONTRACT"],
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VALIDATION_ERROR_CODES,
    EXPECTED_ERROR_CODES,
  );
  [
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_TOP_LEVEL_FIELDS,
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_LIFECYCLE_POSTURES,
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VERIFICATION_POSTURES,
    LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_VALIDATION_ERROR_CODES,
  ].forEach((declaration) => {
    assertDeepFrozen(declaration);
  });
});

test("one valid synthetic minimal envelope has exact result shape and structural-only meaning", () => {
  const input = makeValidEnvelope();
  const snapshot = { ...input };
  const result = validate(input);
  const second = validate(input);

  assert.deepEqual(Object.keys(result), ["valid", "contractKind", "version", "errors"]);
  assert.equal(result.valid, true);
  assert.equal(
    result.contractKind,
    "LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT",
  );
  assert.equal(result.version, "v1");
  assert.deepEqual(result.errors, []);
  assert.notEqual(result, second);
  assert.deepEqual(result, second);
  assert.deepEqual(input, snapshot);
  assert.equal(Object.isFrozen(input), false);
  assertDeepFrozen(result);
  [
    "authoritativeLifecycleHistory",
    "appendOnlyVerified",
    "transitionExecuted",
    "transactionCommitted",
    "writerAuthorized",
    "repositoryCurrentnessVerified",
    "serviceAuthorizationCreated",
    "accessGrantCreated",
  ].forEach((field) => {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_POSTURE[
        field
      ],
      false,
      field,
    );
    assert.equal(Object.hasOwn(result, field), false, field);
  });
});

test("all lifecycle values are accepted in priorLifecyclePosture", () => {
  EXPECTED_LIFECYCLE_POSTURES.forEach((priorLifecyclePosture) => {
    assert.equal(
      validate(makeValidEnvelope({ priorLifecyclePosture })).valid,
      true,
      priorLifecyclePosture,
    );
  });
});

test("all lifecycle values are accepted in resultingLifecyclePosture", () => {
  EXPECTED_LIFECYCLE_POSTURES.forEach((resultingLifecyclePosture) => {
    assert.equal(
      validate(makeValidEnvelope({ resultingLifecyclePosture })).valid,
      true,
      resultingLifecyclePosture,
    );
  });
});

test("all fields are required with no optional fields and deterministic missing paths", () => {
  assert.equal(EXPECTED_TOP_LEVEL_FIELDS.length, 17);
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

test("prohibited fields and unknown fields remain distinct and deterministic", () => {
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
  assert.equal(PROHIBITED_FIELDS.length, 65);
  assert.deepEqual(
    errorsFor(allProhibited),
    [...PROHIBITED_FIELDS].sort().map((field) => ({
      code: "PROHIBITED_FIELD",
      path: field,
    })),
  );
});

test("invalid top-level inputs and nested collection values are structurally rejected", () => {
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
  assertSingleError(
    makeValidEnvelope({ lifecycleHistoryEntryRef: ["history:entry:001"] }),
    "INVALID_TYPE",
    "lifecycleHistoryEntryRef",
  );
  assertSingleError(
    makeValidEnvelope({ writerTransitionEvidenceRef: { nested: true } }),
    "INVALID_TYPE",
    "writerTransitionEvidenceRef",
  );
});

test("accessor safety and cycle safety avoid getter invocation and recursive traversal", () => {
  let getterInvoked = false;
  const accessorEnvelope = makeValidEnvelope();
  Object.defineProperty(accessorEnvelope, "lifecycleHistoryEntryRef", {
    enumerable: true,
    get() {
      getterInvoked = true;
      return "history:entry:bad";
    },
  });

  assertSingleError(accessorEnvelope, "INVALID_TYPE", "lifecycleHistoryEntryRef");
  assert.equal(getterInvoked, false);

  const cycle = {};
  cycle.self = cycle;
  assertSingleError(
    makeValidEnvelope({ sourceProvenanceRef: cycle }),
    "INVALID_TYPE",
    "sourceProvenanceRef",
  );
  assert.equal(Object.isFrozen(cycle), false);
});

test("primitive-type validation follows declared field order", () => {
  const envelope = makeValidEnvelope();

  EXPECTED_TOP_LEVEL_FIELDS.filter(
    (field) => field !== "humanProfessionalReviewRequired",
  ).forEach((field) => {
    envelope[field] = 1;
  });

  assert.deepEqual(
    errorsFor(envelope),
    EXPECTED_TOP_LEVEL_FIELDS.filter(
      (field) => field !== "humanProfessionalReviewRequired",
    ).map((field) => ({ code: "INVALID_TYPE", path: field })),
  );
});

test("invalid contract version, evidence kind, and verification posture are rejected", () => {
  [
    ["contractVersion", "v2"],
    ["evidenceKind", "OTHER_EVIDENCE"],
    ["verificationPosture", "VERIFIED"],
  ].forEach(([field, value]) => {
    assertSingleError(makeValidEnvelope({ [field]: value }), "INVALID_ENUM", field);
  });
});

test("invalid prior and resulting lifecycle declarations are rejected", () => {
  [
    "priorLifecyclePosture",
    "resultingLifecyclePosture",
  ].forEach((field) => {
    assertSingleError(makeValidEnvelope({ [field]: "WRONG" }), "INVALID_ENUM", field);
  });
});

test("invalid opaque references reject length whitespace URL paths separators and dot values", () => {
  const invalidValues = [
    "",
    "a".repeat(129),
    " leading",
    "trailing ",
    "embedded space",
    "http://example",
    "HTTPS://example",
    "mailto:person@example",
    "has/slash",
    "has\\backslash",
    "has?query",
    "has#fragment",
    ".",
    "..",
  ];

  EXPECTED_OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    invalidValues.forEach((value) => {
      assertSingleError(
        makeValidEnvelope({ [field]: value }),
        "INVALID_OPAQUE_REFERENCE",
        field,
      );
    });
  });
});

test("wildcard references produce PROHIBITED_WILDCARD before generic syntax", () => {
  EXPECTED_OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    assertSingleError(
      makeValidEnvelope({ [field]: "*" }),
      "PROHIBITED_WILDCARD",
      field,
    );
    assertSingleError(
      makeValidEnvelope({ [field]: "permission:*" }),
      "PROHIBITED_WILDCARD",
      field,
    );
  });
});

test("broad-scope reference values produce PROHIBITED_BROAD_SCOPE", () => {
  [
    "all",
    "any",
    "all-operations",
    "all_operations",
    "all-services",
    "all_services",
  ].forEach((value) => {
    EXPECTED_OPAQUE_REFERENCE_FIELDS.forEach((field) => {
      assertSingleError(
        makeValidEnvelope({ [field]: value }),
        "PROHIBITED_BROAD_SCOPE",
        field,
      );
      assertSingleError(
        makeValidEnvelope({ [field]: value.toUpperCase() }),
        "PROHIBITED_BROAD_SCOPE",
        field,
      );
    });
  });
});

test("humanProfessionalReviewRequired must be exactly true", () => {
  [false, "true", 1, null, undefined, {}, []].forEach((value) => {
    assertSingleError(
      makeValidEnvelope({ humanProfessionalReviewRequired: value }),
      "INVALID_BOOLEAN",
      "humanProfessionalReviewRequired",
    );
  });
  let getterInvoked = false;
  const accessorEnvelope = makeValidEnvelope();
  Object.defineProperty(accessorEnvelope, "humanProfessionalReviewRequired", {
    enumerable: true,
    get() {
      getterInvoked = true;
      return true;
    },
  });

  assertSingleError(
    accessorEnvelope,
    "INVALID_BOOLEAN",
    "humanProfessionalReviewRequired",
  );
  assert.equal(getterInvoked, false);
});

test("all five cross-field rules use exact paths and valid participants", () => {
  assertSingleError(
    makeValidEnvelope({ serviceRecipientRef: "process:api:001" }),
    "INVALID_CROSS_FIELD_COMBINATION",
    "serviceRecipientRef",
  );
  assertSingleError(
    makeValidEnvelope({ lifecycleHistoryEntryRef: "evidence:lifecycle_history:001" }),
    "INVALID_CROSS_FIELD_COMBINATION",
    "lifecycleHistoryEntryRef",
  );
  assertSingleError(
    makeValidEnvelope({ writerTransitionEvidenceRef: "history:entry:001" }),
    "INVALID_CROSS_FIELD_COMBINATION",
    "writerTransitionEvidenceRef",
  );
  assertSingleError(
    makeValidEnvelope({ resultingCurrentStateVersionRef: "version:permission:001" }),
    "INVALID_CROSS_FIELD_COMBINATION",
    "resultingCurrentStateVersionRef",
  );
  assertSingleError(
    makeValidEnvelope({ sourceProvenanceRef: "evidence:lifecycle_history:001" }),
    "INVALID_CROSS_FIELD_COMBINATION",
    "sourceProvenanceRef",
  );
  const malformedParticipantErrors = errorsFor(
    makeValidEnvelope({
      lifecycleHistoryEntryRef: "bad/slash",
      writerTransitionEvidenceRef: "bad/slash",
    }),
  );
  assert.deepEqual(malformedParticipantErrors, [
    {
      code: "INVALID_OPAQUE_REFERENCE",
      path: "lifecycleHistoryEntryRef",
    },
    {
      code: "INVALID_OPAQUE_REFERENCE",
      path: "writerTransitionEvidenceRef",
    },
  ]);
  assert.equal(
    malformedParticipantErrors.some(
      (error) => error.code === "INVALID_CROSS_FIELD_COMBINATION",
    ),
    false,
  );
  assert.deepEqual(
    new Set(malformedParticipantErrors.map((error) => error.path)),
    new Set(["lifecycleHistoryEntryRef", "writerTransitionEvidenceRef"]),
  );
  assert.equal(
    new Set(
      malformedParticipantErrors.map((error) => `${error.code}:${error.path}`),
    ).size,
    malformedParticipantErrors.length,
  );
});

test("deterministic aggregation is insertion-order independent with no duplicate errors or rejected-value echo", () => {
  const first = makeValidEnvelope({
    contractVersion: "WRONG",
    priorLifecyclePosture: "BAD_LIFECYCLE",
    evidenceId: "bad/slash",
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
      evidenceId: "bad/slash",
      priorLifecyclePosture: "BAD_LIFECYCLE",
      contractVersion: "WRONG",
    }),
  };

  const expected = [
    { code: "PROHIBITED_FIELD", path: "authorized" },
    { code: "UNKNOWN_FIELD", path: "alpha" },
    { code: "UNKNOWN_FIELD", path: "zeta" },
    { code: "INVALID_ENUM", path: "contractVersion" },
    { code: "INVALID_ENUM", path: "priorLifecyclePosture" },
    { code: "INVALID_OPAQUE_REFERENCE", path: "evidenceId" },
    { code: "INVALID_BOOLEAN", path: "humanProfessionalReviewRequired" },
  ];

  assert.deepEqual(errorsFor(first), expected);
  assert.deepEqual(errorsFor(second), expected);
  assert.equal(
    new Set(expected.map((error) => `${error.code}:${error.path}`)).size,
    expected.length,
  );
  errorsFor(first).forEach((error) => {
    assert.deepEqual(Object.keys(error), ["code", "path"]);
    assert.equal(Object.hasOwn(error, "value"), false);
    assert.equal(Object.hasOwn(error, "message"), false);
  });
  ["WRONG", "BAD_LIFECYCLE", "bad/slash"].forEach((rejectedValue) => {
    assert.equal(JSON.stringify(validate(first)).includes(rejectedValue), false);
  });
});

test("deep freezing result isolation input preservation and input order are maintained", () => {
  const input = makeValidEnvelope();
  const keyOrder = Object.keys(input);
  const snapshot = { ...input };
  const first = validate(input);
  const second = validate(input);

  assert.notEqual(first, second);
  assert.deepEqual(first, second);
  assertDeepFrozen(first);
  assert.equal(Object.isFrozen(first.errors), true);
  first.errors.forEach((error) => {
    assert.equal(Object.isFrozen(error), true);
  });
  assert.deepEqual(input, snapshot);
  assert.deepEqual(Object.keys(input), keyOrder);
  assert.equal(Object.isFrozen(input), false);
});

test("no lookup history traversal ordering completeness persistence authorization access route audit provider or runtime behavior is exposed", () => {
  [
    "lookupPerformed",
    "persistencePerformed",
    "auditEmitted",
    "resolverResultCreated",
    "evaluatorDecisionCreated",
    "serviceAuthorizationCreated",
    "accessGrantCreated",
    "runtimeEnforcementCreated",
    "historyCompletenessVerified",
    "historyOrderingVerified",
    "providerRoutingAuthorized",
  ].forEach((field) => {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_LIFECYCLE_HISTORY_EVIDENCE_CONTRACT_POSTURE[
        field
      ],
      false,
      field,
    );
  });
  [
    "lookupLocalServicePermissionLifecycleHistoryEvidence",
    "dispatchLocalServicePermissionLifecycleHistoryEvidence",
    "writeLocalServicePermissionLifecycleHistoryEvidence",
    "authorizeLocalServicePermissionLifecycleHistoryEvidence",
    "grantLocalServicePermissionLifecycleHistoryEvidence",
    "routeLocalServicePermissionLifecycleHistoryEvidence",
    "persistLocalServicePermissionLifecycleHistoryEvidence",
  ].forEach((name) => {
    assert.equal(Object.hasOwn(contract, name), false, name);
  });
});
