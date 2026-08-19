"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/local-service-permission-current-state-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");

const {
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_IDENTITY,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_TOP_LEVEL_FIELDS,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_LIFECYCLE_POSTURES,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VERIFICATION_POSTURES,
  LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VALIDATION_ERROR_CODES,
  validateLocalServicePermissionCurrentStateEvidence,
} = contract;

const EXPECTED_EXPORTS = [
  "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_IDENTITY",
  "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE",
  "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_TOP_LEVEL_FIELDS",
  "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_OPAQUE_REFERENCE_FIELDS",
  "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_LIFECYCLE_POSTURES",
  "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VERIFICATION_POSTURES",
  "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VALIDATION_ERROR_CODES",
  "validateLocalServicePermissionCurrentStateEvidence",
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
  "permissionLifecyclePosture",
  "currentStateVersionRef",
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
  "currentStateVersionRef",
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
  "INVALID_ENUM",
  "INVALID_OPAQUE_REFERENCE",
  "INVALID_BOOLEAN",
  "PROHIBITED_FIELD",
  "PROHIBITED_WILDCARD",
  "PROHIBITED_BROAD_SCOPE",
  "INVALID_CROSS_FIELD_COMBINATION",
];

const EXPECTED_TRUE_FIELDS = [
  "contractOnly",
  "proveOnly",
  "schemaValidatorOnly",
  "localServicePermissionCurrentStateEvidenceOnly",
  "lifecycleDeclarationsOnly",
  "wildcardsProhibited",
  "broadScopeProhibited",
  "humanProfessionalReviewRequired",
];

const EXPECTED_FALSE_FIELDS = [
  "processAuthenticationCreated",
  "callerVerificationCreated",
  "recipientVerificationCreated",
  "permissionAuthorityCreated",
  "authoritativePermissionSourceCreated",
  "permissionRepositoryCreated",
  "writerProvenanceVerified",
  "repositoryCurrentnessVerified",
  "permissionCurrentnessVerified",
  "lifecycleTruthVerified",
  "currentStateVersionVerified",
  "resolverCreated",
  "evaluatorCreated",
  "serviceAuthorizationCreated",
  "accessGrantCreated",
  "portableGrantCreated",
  "inheritanceCreated",
  "lookupCreated",
  "runtimeLookupCreated",
  "registryLookupCreated",
  "dynamicDispatchCreated",
  "validatorDispatchCreated",
  "routeIntegrationCreated",
  "middlewareCreated",
  "requestAuthMigrationCreated",
  "persistenceCreated",
  "auditEventEmitted",
  "auditStorageCreated",
  "providerRoutingCreated",
  "externalUseAuthorized",
  "productCandidateSelected",
  "productApprovalCreated",
  "securityFindingCreated",
  "severityAssigned",
  "remediationRecommended",
  "technicalSignOffCreated",
  "runtimeCertificationCreated",
  "releaseApprovalCreated",
  "blockerClosureCreated",
];

const PROHIBITED_FIELDS = [
  "allow",
  "allowed",
  "authorize",
  "authorized",
  "authorization",
  "serviceAuthorization",
  "accessGrant",
  "accessGranted",
  "grant",
  "effectiveGrant",
  "runtimeEnforced",
  "verifiedCurrent",
  "authoritative",
  "trusted",
  "resolved",
  "lookupResult",
  "repositoryRecord",
  "evaluatorDecision",
  "routePermission",
  "capability",
  "requiredCapability",
  "role",
  "roles",
  "humanPermission",
  "humanPermissions",
  "permissionGrant",
  "tenantMembership",
  "caseMembership",
  "resourcePlacement",
  "ownership",
  "domainAction",
  "domainAuthorization",
  "inheritsFrom",
  "inheritedFrom",
  "inheritance",
  "inheritedPermissionRef",
  "rawCredential",
  "token",
  "secret",
  "providerPayload",
  "sourceUrl",
  "sourcePath",
  "databaseLocator",
];

function makeValidEnvelope(overrides = {}) {
  return {
    contractVersion: "v1",
    evidenceKind: "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE",
    verificationPosture: "NOT_VERIFIED_BY_CONTRACT",
    evidenceId: "evidence:local_service_permission:001",
    permissionDeclarationRef: "permission:local_service:read_state",
    callerProcessRef: "process:api_runtime:001",
    serviceRecipientRef: "service:permission_resolver:001",
    serviceOperationRef: "operation:permission_current_state_read",
    requestPurposeRef: "purpose:synthetic_governance_review",
    permissionLifecyclePosture:
      "LOCAL_SERVICE_PERMISSION_DECLARED_CURRENT_ACTIVE",
    currentStateVersionRef: "state.version:1",
    sourceProvenanceRef: "provenance:tracked.synthetic",
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

  Reflect.ownKeys(value).forEach((key) => {
    assertDeepFrozen(value[key], seen);
  });
}

function validate(envelope) {
  return validateLocalServicePermissionCurrentStateEvidence(envelope);
}

function errorsFor(envelope) {
  return validate(envelope).errors;
}

function onlyError(envelope) {
  const errors = errorsFor(envelope);

  assert.equal(errors.length, 1);
  return errors[0];
}

function assertSingleError(envelope, code, path) {
  assert.deepEqual(onlyError(envelope), { code, path });
}

test("exact public exports expose one validator with fixed name and arity", () => {
  assert.deepEqual(Object.keys(contract), EXPECTED_EXPORTS);
  assert.equal(Object.keys(contract).length, 8);
  assert.equal(Object.values(contract).filter((value) => typeof value === "function").length, 1);
  assert.equal(
    validateLocalServicePermissionCurrentStateEvidence.name,
    "validateLocalServicePermissionCurrentStateEvidence",
  );
  assert.equal(validateLocalServicePermissionCurrentStateEvidence.length, 1);
  assert.equal(Object.hasOwn(contract, "default"), false);
  [
    "resolveLocalServicePermissionCurrentStateEvidence",
    "lookupLocalServicePermissionCurrentStateEvidence",
    "evaluateLocalServicePermissionCurrentStateEvidence",
  ].forEach((name) => {
    assert.equal(Object.hasOwn(contract, name), false, name);
  });
});

test("package index exposes reference-equivalent direct module exports", () => {
  EXPECTED_EXPORTS.forEach((name) => {
    assert.equal(packageIndex[name], contract[name], name);
  });
  assert.equal(
    packageIndex.validateLocalServicePermissionCurrentStateEvidence,
    validateLocalServicePermissionCurrentStateEvidence,
  );
});

test("identity, posture, declarations, and error-code surfaces are frozen", () => {
  assert.deepEqual(
    Object.keys(LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_IDENTITY),
    ["contractName", "version", "evidenceKind"],
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_IDENTITY,
    {
      contractName: "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT",
      version: "v1",
      evidenceKind: "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE",
    },
  );
  assert.deepEqual(
    Object.keys(LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE),
    [...EXPECTED_TRUE_FIELDS, ...EXPECTED_FALSE_FIELDS],
  );
  EXPECTED_TRUE_FIELDS.forEach((field) => {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE[field],
      true,
      field,
    );
  });
  EXPECTED_FALSE_FIELDS.forEach((field) => {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE[field],
      false,
      field,
    );
  });
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_TOP_LEVEL_FIELDS,
    EXPECTED_TOP_LEVEL_FIELDS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
    EXPECTED_OPAQUE_REFERENCE_FIELDS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_LIFECYCLE_POSTURES,
    EXPECTED_LIFECYCLE_POSTURES,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VERIFICATION_POSTURES,
    ["NOT_VERIFIED_BY_CONTRACT"],
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VALIDATION_ERROR_CODES,
    EXPECTED_ERROR_CODES,
  );
  [
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_IDENTITY,
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE,
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_TOP_LEVEL_FIELDS,
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_LIFECYCLE_POSTURES,
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VERIFICATION_POSTURES,
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_VALIDATION_ERROR_CODES,
  ].forEach((declaration) => {
    assertDeepFrozen(declaration);
  });
});

test("minimal conforming synthetic envelope returns exact frozen success shape", () => {
  const input = makeValidEnvelope();
  const snapshot = { ...input };
  const first = validate(input);
  const second = validate(input);

  assert.deepEqual(Object.keys(first), ["valid", "contractKind", "version", "errors"]);
  assert.equal(first.valid, true);
  assert.equal(
    first.contractKind,
    "LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT",
  );
  assert.equal(first.version, "v1");
  assert.deepEqual(first.errors, []);
  assert.notEqual(first, second);
  assert.deepEqual(first, second);
  assert.deepEqual(input, snapshot);
  assert.equal(Object.isFrozen(input), false);
  assertDeepFrozen(first);
});

test("every lifecycle declaration is structurally accepted without authority content", () => {
  EXPECTED_LIFECYCLE_POSTURES.forEach((permissionLifecyclePosture) => {
    const result = validate(makeValidEnvelope({ permissionLifecyclePosture }));

    assert.equal(result.valid, true, permissionLifecyclePosture);
    [
      "allow",
      "grant",
      "authorized",
      "accessGrant",
      "currentnessVerified",
      "permissionAuthority",
    ].forEach((field) => {
      assert.equal(Object.hasOwn(result, field), false, field);
    });
  });
  assert.equal(
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE.permissionCurrentnessVerified,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE.lifecycleTruthVerified,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE.accessGrantCreated,
    false,
  );
});

test("invalid top-level values return only INVALID_TYPE", () => {
  class CustomClass {}
  const invalidValues = [
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
  ];

  invalidValues.forEach((value) => {
    const result = validate(value);

    assert.deepEqual(result.errors, [{ code: "INVALID_TYPE", path: "$" }]);
    assert.equal(result.valid, false);
    assertDeepFrozen(result);
  });
});

test("every missing required field is reported in required-field order", () => {
  const empty = {};

  assert.deepEqual(
    errorsFor(empty),
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

test("ordinary unknown fields produce UNKNOWN_FIELD in deterministic order", () => {
  const envelope = makeValidEnvelope();

  envelope.zeta = "synthetic:zeta";
  envelope.alpha = "synthetic:alpha";

  assert.deepEqual(errorsFor(envelope), [
    { code: "UNKNOWN_FIELD", path: "alpha" },
    { code: "UNKNOWN_FIELD", path: "zeta" },
  ]);
});

test("authority and sensitive prohibited keys produce PROHIBITED_FIELD", () => {
  const envelope = makeValidEnvelope();

  PROHIBITED_FIELDS.forEach((field) => {
    envelope[field] = `synthetic:${field}`;
  });

  assert.deepEqual(
    errorsFor(envelope),
    [...PROHIBITED_FIELDS].sort().map((field) => ({
      code: "PROHIBITED_FIELD",
      path: field,
    })),
  );
});

test("invalid primitive types and accessor-backed required fields are rejected safely", () => {
  [
    "contractVersion",
    "evidenceKind",
    "verificationPosture",
    "permissionLifecyclePosture",
  ].forEach((field) => {
    assertSingleError(makeValidEnvelope({ [field]: 1 }), "INVALID_TYPE", field);
  });

  EXPECTED_OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    assertSingleError(makeValidEnvelope({ [field]: 1 }), "INVALID_TYPE", field);
  });

  let getterInvoked = false;
  const accessorEnvelope = makeValidEnvelope();

  Object.defineProperty(accessorEnvelope, "evidenceId", {
    enumerable: true,
    get() {
      getterInvoked = true;
      return "evidence:bad";
    },
  });

  assertSingleError(accessorEnvelope, "INVALID_TYPE", "evidenceId");
  assert.equal(getterInvoked, false);
});

test("invalid bounded literals produce INVALID_ENUM", () => {
  [
    "contractVersion",
    "evidenceKind",
    "verificationPosture",
    "permissionLifecyclePosture",
  ].forEach((field) => {
    assertSingleError(makeValidEnvelope({ [field]: "WRONG" }), "INVALID_ENUM", field);
  });
});

test("malformed opaque-reference fields produce INVALID_OPAQUE_REFERENCE", () => {
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
  });
});

test("wildcard references produce PROHIBITED_WILDCARD before generic syntax", () => {
  EXPECTED_OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    assertSingleError(
      makeValidEnvelope({ [field]: "permission:*" }),
      "PROHIBITED_WILDCARD",
      field,
    );
  });
});

test("broad-scope reference values produce PROHIBITED_BROAD_SCOPE", () => {
  const broadScopeValues = [
    "all",
    "ANY",
    "all-operations",
    "ALL_OPERATIONS",
    "all-services",
    "ALL_SERVICES",
  ];

  EXPECTED_OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    broadScopeValues.forEach((value) => {
      assertSingleError(
        makeValidEnvelope({ [field]: value }),
        "PROHIBITED_BROAD_SCOPE",
        field,
      );
    });
    assert.equal(
      validate(makeValidEnvelope({ [field]: "locally.anything:1" })).valid,
      true,
    );
  });
});

test("humanProfessionalReviewRequired rejects non-boolean and false values", () => {
  [false, "true", 1, null, undefined].forEach((value) => {
    assertSingleError(
      makeValidEnvelope({ humanProfessionalReviewRequired: value }),
      "INVALID_BOOLEAN",
      "humanProfessionalReviewRequired",
    );
  });
});

test("identical caller and recipient references produce cross-field failure", () => {
  assertSingleError(
    makeValidEnvelope({ serviceRecipientRef: "process:api_runtime:001" }),
    "INVALID_CROSS_FIELD_COMBINATION",
    "serviceRecipientRef",
  );
});

test("error aggregation and ordering are deterministic without rejected values", () => {
  const envelope = makeValidEnvelope({
    contractVersion: "WRONG",
    evidenceId: "bad/slash",
    humanProfessionalReviewRequired: false,
  });

  envelope.authorized = true;
  envelope.beta = "synthetic:beta";
  envelope.alpha = "synthetic:alpha";

  const expected = [
    { code: "PROHIBITED_FIELD", path: "authorized" },
    { code: "UNKNOWN_FIELD", path: "alpha" },
    { code: "UNKNOWN_FIELD", path: "beta" },
    { code: "INVALID_ENUM", path: "contractVersion" },
    { code: "INVALID_OPAQUE_REFERENCE", path: "evidenceId" },
    { code: "INVALID_BOOLEAN", path: "humanProfessionalReviewRequired" },
  ];

  assert.deepEqual(errorsFor(envelope), expected);
  assert.deepEqual(errorsFor(envelope), expected);
  errorsFor(envelope).forEach((error) => {
    assert.deepEqual(Object.keys(error), ["code", "path"]);
    assert.equal(Object.hasOwn(error, "value"), false);
    assert.equal(Object.hasOwn(error, "message"), false);
  });

  const lifecycleBeforeLateOpaqueExpected = [
    { code: "INVALID_ENUM", path: "permissionLifecyclePosture" },
    { code: "INVALID_OPAQUE_REFERENCE", path: "currentStateVersionRef" },
    { code: "INVALID_OPAQUE_REFERENCE", path: "sourceProvenanceRef" },
  ];
  const invalidLifecycleBeforeOpaque = makeValidEnvelope({
    permissionLifecyclePosture: "LOCAL_SERVICE_PERMISSION_DECLARED_UNKNOWN_NEW",
    currentStateVersionRef: "current/state/version",
    sourceProvenanceRef: "source/provenance",
  });
  const invalidOpaqueBeforeLifecycle = makeValidEnvelope({
    sourceProvenanceRef: "source/provenance",
    currentStateVersionRef: "current/state/version",
    permissionLifecyclePosture: "LOCAL_SERVICE_PERMISSION_DECLARED_UNKNOWN_NEW",
  });

  const orderingResults = [
    invalidLifecycleBeforeOpaque,
    invalidOpaqueBeforeLifecycle,
  ].map((candidate) => {
    const descriptorSnapshot = Object.getOwnPropertyDescriptors(candidate);
    const valueSnapshot = Object.fromEntries(
      Object.keys(descriptorSnapshot).map((key) => [
        key,
        descriptorSnapshot[key].value,
      ]),
    );
    const keySnapshot = Object.keys(candidate);

    assert.equal(Object.isFrozen(candidate), false);

    const result = validate(candidate);

    assert.deepEqual(result.errors, lifecycleBeforeLateOpaqueExpected);
    assert.equal(Object.isFrozen(result), true);
    assert.equal(Object.isFrozen(result.errors), true);
    assert.equal(Object.isFrozen(candidate), false);
    assert.deepEqual(candidate, valueSnapshot);
    assert.deepEqual(Object.keys(candidate), keySnapshot);
    assert.deepEqual(
      Object.keys(
        result.errors.reduce((paths, error) => {
          paths[error.path] = true;
          return paths;
        }, {}),
      ).sort(),
      [
        "currentStateVersionRef",
        "permissionLifecyclePosture",
        "sourceProvenanceRef",
      ],
    );
    assert.deepEqual(
      result.errors.map((error) => `${error.code}:${error.path}`).sort(),
      [
        "INVALID_ENUM:permissionLifecyclePosture",
        "INVALID_OPAQUE_REFERENCE:currentStateVersionRef",
        "INVALID_OPAQUE_REFERENCE:sourceProvenanceRef",
      ],
    );
    result.errors.forEach((error) => {
      assert.equal(Object.isFrozen(error), true);
      assert.deepEqual(Object.keys(error), ["code", "path"]);
      assert.equal(Object.hasOwn(error, "value"), false);
      assert.equal(Object.hasOwn(error, "message"), false);
    });
    [
      "LOCAL_SERVICE_PERMISSION_DECLARED_UNKNOWN_NEW",
      "current/state/version",
      "source/provenance",
    ].forEach((rejectedValue) => {
      assert.equal(JSON.stringify(result).includes(rejectedValue), false);
    });

    return result.errors;
  });

  assert.deepEqual(orderingResults[0], orderingResults[1]);
});

test("validation is pure, isolated, frozen, cycle-safe, and non-operational", () => {
  const input = makeValidEnvelope();
  const snapshot = { ...input };
  const result = validate(input);

  assert.deepEqual(input, snapshot);
  assert.equal(Object.isFrozen(input), false);
  assertDeepFrozen(result);

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
    "runtimeLookupCreated",
    "resolverCreated",
    "evaluatorCreated",
    "routeIntegrationCreated",
    "persistenceCreated",
    "auditEventEmitted",
  ].forEach((field) => {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_POSTURE[field],
      false,
      field,
    );
    assert.equal(Object.hasOwn(result, field), false, field);
  });
});
