"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/rbac-resource-tenant-case-placement-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");
const contextContract = require("../packages/governance/src/rbac-admin-support-authorization-context-contract.js");

const {
  RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE,
  RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_TOP_LEVEL_FIELDS,
  RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_SCOPE_DIMENSIONS,
  RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_PLACEMENT_LIFECYCLE_POSTURES,
  RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_VALIDATION_ERROR_CODES,
  RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_VERIFICATION_POSTURES,
  validateRbacResourceTenantCasePlacementEvidence,
} = contract;

const EXPECTED_EXPORTS = [
  "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_IDENTITY",
  "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE",
  "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_TOP_LEVEL_FIELDS",
  "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_SCOPE_DIMENSIONS",
  "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_PLACEMENT_LIFECYCLE_POSTURES",
  "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_VALIDATION_ERROR_CODES",
  "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_VERIFICATION_POSTURES",
  "validateRbacResourceTenantCasePlacementEvidence",
];

const EXPECTED_TOP_LEVEL_FIELDS = [
  "contractVersion",
  "evidenceKind",
  "verificationPosture",
  "evidenceId",
  "placementId",
  "placementVersion",
  "placementIssuerRef",
  "placementProvenanceRef",
  "placementLifecyclePosture",
  "resourceRef",
  "tenantRef",
  "caseRef",
  "humanProfessionalReviewRequired",
];

const OPAQUE_REFERENCE_FIELDS = [
  "evidenceId",
  "placementId",
  "placementVersion",
  "placementIssuerRef",
  "placementProvenanceRef",
  "resourceRef",
  "tenantRef",
  "caseRef",
];

const EXPECTED_LIFECYCLE_POSTURES = [
  "RESOURCE_TENANT_CASE_PLACEMENT_DECLARED_ACTIVE",
  "RESOURCE_TENANT_CASE_PLACEMENT_DECLARED_INACTIVE",
  "RESOURCE_TENANT_CASE_PLACEMENT_DECLARED_REVOKED",
];

const EXPECTED_ERROR_CODES = [
  "INVALID_TYPE",
  "MISSING_FIELD",
  "UNKNOWN_FIELD",
  "INVALID_ENUM",
  "INVALID_OPAQUE_REFERENCE",
  "INVALID_BOOLEAN",
];

const EXPECTED_TRUE_FIELDS = [
  "contractOnly",
  "proveOnly",
  "schemaValidatorOnly",
  "resourceTenantCasePlacementEvidenceOnly",
  "resourceReferenceGeneric",
  "membershipSeparated",
  "ownershipSeparated",
  "accessSeparated",
  "scopeAuthoritySeparated",
  "lifecycleDeclarationsOnly",
  "wildcardsProhibited",
  "humanProfessionalReviewRequired",
];

const EXPECTED_FALSE_FIELDS = [
  "authenticationCreated",
  "identityVerificationCreated",
  "authoritativeActorIdentityCreated",
  "authoritativeActorTypeCreated",
  "actorRoleCompositionCreated",
  "rolePermissionCompositionCreated",
  "resourceResolved",
  "tenantResolved",
  "caseResolved",
  "authoritativePlacementCreated",
  "resourceTenantPlacementAuthorityCreated",
  "resourceCasePlacementAuthorityCreated",
  "caseTenantAuthorityCreated",
  "placementIssuerVerified",
  "placementProvenanceVerified",
  "placementVersionVerified",
  "placementLifecycleVerified",
  "currentPlacementVerified",
  "tenantMembershipAuthorityCreated",
  "caseMembershipAuthorityCreated",
  "authoritativeMembershipCreated",
  "currentMembershipVerified",
  "resourceOwnershipCreated",
  "objectAccessCreated",
  "functionAccessCreated",
  "propertyAccessCreated",
  "scopeAuthorityCreated",
  "wrongTenantDeterminationCreated",
  "wrongCaseDeterminationCreated",
  "roleAuthorityCreated",
  "permissionAuthorityCreated",
  "policyAuthorityCreated",
  "bindingAuthorityCreated",
  "actorRoleAssignmentCreated",
  "rolePermissionAssignmentCreated",
  "permissionGrantCreated",
  "directGrantCreated",
  "directDenialAuthorityCreated",
  "effectExecutionCreated",
  "denyPrecedenceExecuted",
  "conflictResolutionCreated",
  "authorizationDecisionCreated",
  "allowCapableDecisionCreated",
  "accessGrantCreated",
  "runtimeLookupCreated",
  "registryLookupCreated",
  "dynamicResolutionCreated",
  "validatorDispatchCreated",
  "routeIntegrationCreated",
  "middlewareCreated",
  "persistenceCreated",
  "auditEventEmitted",
  "auditStorageCreated",
  "professionalQualificationVerified",
  "humanReviewCompleted",
  "approvalCreated",
  "providerRouteAuthorized",
  "externalUseAuthorized",
  "productCandidateSelected",
  "releaseApprovalCreated",
  "blockerClosureCreated",
  "technicalSignOffCreated",
  "runtimeCertificationCreated",
];

function makeValidEnvelope(overrides = {}) {
  return {
    contractVersion: "v1",
    evidenceKind: "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE",
    verificationPosture: "NOT_VERIFIED_BY_CONTRACT",
    evidenceId: "evidence:resource_tenant_case_placement:001",
    placementId: "placement:resource_tenant_case:001",
    placementVersion: "placement.version:1",
    placementIssuerRef: "issuer:governance.review",
    placementProvenanceRef: "provenance:tracked.review",
    placementLifecyclePosture:
      "RESOURCE_TENANT_CASE_PLACEMENT_DECLARED_ACTIVE",
    resourceRef: "resource:synthetic:alpha_001",
    tenantRef: "tenant:synthetic:alpha",
    caseRef: "case:synthetic:alpha_001",
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
  return validateRbacResourceTenantCasePlacementEvidence(envelope);
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

function assertUnknownFields(fields) {
  const envelope = makeValidEnvelope();

  fields.forEach((field) => {
    envelope[field] = `synthetic:${field}`;
  });

  assert.deepEqual(
    errorsFor(envelope),
    [...fields].sort().map((field) => ({ code: "UNKNOWN_FIELD", path: field })),
  );
}

test("identity, posture, exports, and freeze are exact", () => {
  assert.deepEqual(
    Object.keys(RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_IDENTITY),
    ["contractName", "version", "evidenceKind"],
  );
  assert.deepEqual(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_IDENTITY,
    {
      contractName: "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT",
      version: "v1",
      evidenceKind: "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE",
    },
  );

  assert.deepEqual(Object.keys(contract), EXPECTED_EXPORTS);
  assert.equal(Object.values(contract).filter((value) => typeof value === "function").length, 1);
  assert.equal(validateRbacResourceTenantCasePlacementEvidence.name, "validateRbacResourceTenantCasePlacementEvidence");
  assert.equal(validateRbacResourceTenantCasePlacementEvidence.length, 1);
  assert.deepEqual(
    Object.keys(RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE),
    [...EXPECTED_TRUE_FIELDS, ...EXPECTED_FALSE_FIELDS],
  );
  assert.equal(EXPECTED_TRUE_FIELDS.length, 12);
  assert.equal(EXPECTED_FALSE_FIELDS.length, 63);
  assert.equal(new Set(EXPECTED_TRUE_FIELDS).size, EXPECTED_TRUE_FIELDS.length);
  assert.equal(new Set(EXPECTED_FALSE_FIELDS).size, EXPECTED_FALSE_FIELDS.length);
  EXPECTED_TRUE_FIELDS.forEach((field) => {
    assert.equal(
      RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE[field],
      true,
      field,
    );
  });
  EXPECTED_FALSE_FIELDS.forEach((field) => {
    assert.equal(
      RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE[field],
      false,
      field,
    );
  });
  assert.equal(
    EXPECTED_TRUE_FIELDS.some((field) => EXPECTED_FALSE_FIELDS.includes(field)),
    false,
  );
  assertDeepFrozen(RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_IDENTITY);
  assertDeepFrozen(RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE);
});

test("PR67 dimensions are aligned, isolated, and not caller supplied", () => {
  const source =
    contextContract.RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS;

  assert.deepEqual(source, ["TENANT", "CASE", "OBJECT", "FUNCTION", "PROPERTY"]);
  assert.deepEqual(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_SCOPE_DIMENSIONS,
    ["TENANT", "CASE"],
  );
  assert.deepEqual(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_SCOPE_DIMENSIONS,
    source.filter((dimension) => dimension === "TENANT" || dimension === "CASE"),
  );
  assert.notEqual(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_SCOPE_DIMENSIONS,
    source,
  );
  assertDeepFrozen(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_SCOPE_DIMENSIONS,
  );
  assert.throws(() => {
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_SCOPE_DIMENSIONS.push("OBJECT");
  }, TypeError);
  assert.deepEqual(source, ["TENANT", "CASE", "OBJECT", "FUNCTION", "PROPERTY"]);
  assertSingleError(
    makeValidEnvelope({ scopeDimensions: ["TENANT", "CASE"] }),
    "UNKNOWN_FIELD",
    "scopeDimensions",
  );
});

test("declarations and schema are exact and frozen", () => {
  assert.deepEqual(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_TOP_LEVEL_FIELDS,
    EXPECTED_TOP_LEVEL_FIELDS,
  );
  assert.deepEqual(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_PLACEMENT_LIFECYCLE_POSTURES,
    EXPECTED_LIFECYCLE_POSTURES,
  );
  assert.deepEqual(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_VERIFICATION_POSTURES,
    ["NOT_VERIFIED_BY_CONTRACT"],
  );
  assert.deepEqual(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_VALIDATION_ERROR_CODES,
    EXPECTED_ERROR_CODES,
  );
  [
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_TOP_LEVEL_FIELDS,
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_PLACEMENT_LIFECYCLE_POSTURES,
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_VERIFICATION_POSTURES,
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_VALIDATION_ERROR_CODES,
  ].forEach((declaration) => {
    assertDeepFrozen(declaration);
  });
});

test("package index exposes the same public surface without aliases", () => {
  EXPECTED_EXPORTS.forEach((name) => {
    assert.equal(packageIndex[name], contract[name], name);
  });
  assert.equal(
    packageIndex.validateRbacResourceTenantCasePlacementEvidence,
    validateRbacResourceTenantCasePlacementEvidence,
  );
  assert.equal(Object.values(contract).filter((value) => typeof value === "function").length, 1);
  [
    "validateRbacResourcePlacementEvidence",
    "resolveRbacResourceTenantCasePlacementEvidence",
    "lookupRbacResourceTenantCasePlacementEvidence",
  ].forEach((name) => {
    assert.equal(Object.hasOwn(contract, name), false, name);
  });
});

test("valid structural envelope returns isolated frozen success", () => {
  const input = makeValidEnvelope();
  const snapshot = { ...input };
  const first = validate(input);
  const second = validate(input);

  assert.deepEqual(Object.keys(first), ["valid", "contractKind", "version", "errors"]);
  assert.equal(first.valid, true);
  assert.equal(first.contractKind, "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE");
  assert.equal(first.version, "v1");
  assert.deepEqual(first.errors, []);
  assert.notEqual(first, second);
  assert.deepEqual(first, second);
  assert.deepEqual(input, snapshot);
  assert.equal(Object.isFrozen(input), false);
  assert.notEqual(first.errors, input);
  assertDeepFrozen(first);
  assertDeepFrozen(first.errors);
});

test("all lifecycle declarations are structurally accepted without authority", () => {
  EXPECTED_LIFECYCLE_POSTURES.forEach((placementLifecyclePosture) => {
    const result = validate(makeValidEnvelope({ placementLifecyclePosture }));

    assert.equal(result.valid, true, placementLifecyclePosture);
  });
  assert.equal(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE.currentPlacementVerified,
    false,
  );
  assert.equal(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE.authoritativePlacementCreated,
    false,
  );
  assert.equal(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE.accessGrantCreated,
    false,
  );
});

test("top-level input boundary rejects non-plain objects safely", () => {
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
    assert.equal(Object.hasOwn(result.errors[0], "value"), false);
    assert.equal(Object.hasOwn(result.errors[0], "message"), false);
  });
});

test("missing, inherited, and unknown-field ordering is fail-closed", () => {
  Object.defineProperty(Object.prototype, "contractVersion", {
    configurable: true,
    enumerable: true,
    value: "v1",
  });

  try {
    const inherited = {};
    inherited.zeta = "synthetic:zeta";
    inherited.alpha = "synthetic:alpha";

    assert.deepEqual(errorsFor(inherited), [
      ...EXPECTED_TOP_LEVEL_FIELDS.map((field) => ({
        code: "MISSING_FIELD",
        path: field,
      })),
      { code: "UNKNOWN_FIELD", path: "alpha" },
      { code: "UNKNOWN_FIELD", path: "zeta" },
    ]);
  } finally {
    delete Object.prototype.contractVersion;
  }

  const differentOrder = makeValidEnvelope();
  differentOrder.zeta = "synthetic:zeta";
  differentOrder.alpha = "synthetic:alpha";
  assert.deepEqual(errorsFor(differentOrder), [
    { code: "UNKNOWN_FIELD", path: "alpha" },
    { code: "UNKNOWN_FIELD", path: "zeta" },
  ]);
});

test("fixed fields and review boolean are classified deterministically", () => {
  [
    "contractVersion",
    "evidenceKind",
    "verificationPosture",
  ].forEach((field) => {
    assertSingleError(makeValidEnvelope({ [field]: 1 }), "INVALID_TYPE", field);
    assertSingleError(makeValidEnvelope({ [field]: "WRONG" }), "INVALID_ENUM", field);
  });
  [false, "true", 1, null].forEach((value) => {
    assertSingleError(
      makeValidEnvelope({ humanProfessionalReviewRequired: value }),
      "INVALID_BOOLEAN",
      "humanProfessionalReviewRequired",
    );
  });
});

test("invalid opaque-reference strings are rejected without echo", () => {
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
    "has*wildcard",
    ".",
    "..",
    "http://example",
    "HTTPS://example",
  ];

  invalidValues.forEach((evidenceId) => {
    const error = onlyError(makeValidEnvelope({ evidenceId }));

    assert.deepEqual(error, {
      code: "INVALID_OPAQUE_REFERENCE",
      path: "evidenceId",
    });
    assert.equal(Object.hasOwn(error, "value"), false);
  });
});

test("non-string opaque-reference values return type errors before syntax", () => {
  [undefined, null, 1, false, 1n, Symbol("opaque")].forEach((evidenceId) => {
    assertSingleError(
      makeValidEnvelope({ evidenceId }),
      "INVALID_TYPE",
      "evidenceId",
    );
  });
  OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    assertSingleError(makeValidEnvelope({ [field]: 1 }), "INVALID_TYPE", field);
  });
});

test("generic resource boundary stays opaque and rejects classification fields", () => {
  assert.equal(validate(makeValidEnvelope({ resourceRef: "resource:opaque.1" })).valid, true);
  assertSingleError(
    makeValidEnvelope({ resourceRef: { nested: "not-read" } }),
    "INVALID_TYPE",
    "resourceRef",
  );
  assertUnknownFields(["resourceType", "resourceClass", "materialClass", "objectType"]);
  assert.equal(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE.resourceResolved,
    false,
  );
});

test("placement and membership separation is preserved", () => {
  assertUnknownFields([
    "subjectRef",
    "membershipId",
    "tenantMembership",
    "caseMembership",
    "authoritativeMembership",
    "currentMembership",
    "tenantCaseScopeMembershipEvidenceRef",
  ]);
  assert.equal(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE.authoritativePlacementCreated,
    false,
  );
  assert.equal(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE.authoritativeMembershipCreated,
    false,
  );
});

test("ownership and access separation is preserved", () => {
  assertUnknownFields([
    "ownerRef",
    "resourceOwnerRef",
    "ownershipAuthority",
    "objectAccess",
    "functionAccess",
    "propertyAccess",
    "readAccess",
    "writeAccess",
    "deleteAccess",
    "exportAccess",
  ]);
  assert.equal(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE.resourceOwnershipCreated,
    false,
  );
  assert.equal(
    RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE.objectAccessCreated,
    false,
  );
});

test("actor, RBAC, authority, grant, scope, and runtime fields remain unknown", () => {
  const prohibitedFields = [
    "actorId",
    "actorType",
    "actorIdentityEvidenceRef",
    "authenticatedActor",
    "actorRoleBindingEvidenceRef",
    "roleId",
    "permissionId",
    "policyId",
    "actorRoleBindingId",
    "rolePermissionBindingId",
    "roleCategory",
    "permissionCategory",
    "policyEffect",
    "authoritativePlacement",
    "placementAuthority",
    "currentPlacement",
    "placementVerified",
    "placementActive",
    "placementRevoked",
    "caseTenantAuthority",
    "scopeAuthority",
    "scopeBinding",
    "wrongTenant",
    "wrongCase",
    "wrongTenantDetermination",
    "wrongCaseDetermination",
    "assignment",
    "permissionGrant",
    "directGrant",
    "directDeny",
    "authorizationDecision",
    "accessGrant",
    "allow",
    "deny",
    "authorized",
    "runtimeLookup",
    "registryLookup",
    "resolver",
    "validatorDispatch",
    "routeIntegration",
    "middleware",
    "persistence",
    "auditEvent",
    "auditStorage",
    "providerRouteAuthorization",
    "externalUseAuthorization",
    "blockerClosure",
  ];

  assertUnknownFields(prohibitedFields);
});

test("accessor, setter, inherited, and Proxy safety is fail-closed", () => {
  let getterInvoked = false;
  let unknownGetterInvoked = false;
  let setterInvoked = false;
  const accessorEnvelope = makeValidEnvelope();

  Object.defineProperty(accessorEnvelope, "evidenceId", {
    enumerable: true,
    get() {
      getterInvoked = true;
      return "evidence:bad";
    },
  });
  Object.defineProperty(accessorEnvelope, "unknownAccessor", {
    enumerable: true,
    get() {
      unknownGetterInvoked = true;
      return "unknown:bad";
    },
  });
  Object.defineProperty(accessorEnvelope, "setterOnly", {
    enumerable: true,
    set() {
      setterInvoked = true;
    },
  });

  assert.deepEqual(errorsFor(accessorEnvelope), [
    { code: "INVALID_TYPE", path: "evidenceId" },
    { code: "UNKNOWN_FIELD", path: "setterOnly" },
    { code: "UNKNOWN_FIELD", path: "unknownAccessor" },
  ]);
  assert.equal(getterInvoked, false);
  assert.equal(unknownGetterInvoked, false);
  assert.equal(setterInvoked, false);

  Object.defineProperty(Object.prototype, "evidenceId", {
    configurable: true,
    enumerable: true,
    value: "evidence:inherited",
  });

  try {
    const missingOwnEvidence = makeValidEnvelope();
    delete missingOwnEvidence.evidenceId;
    assert.equal(
      errorsFor(missingOwnEvidence).some(
        (error) => error.path === "evidenceId" && error.code === "MISSING_FIELD",
      ),
      true,
    );
  } finally {
    delete Object.prototype.evidenceId;
  }

  const ownKeysFailure = new Proxy(
    {},
    {
      ownKeys() {
        throw new Error("trap-message");
      },
    },
  );
  const descriptorFailure = new Proxy(
    { contractVersion: "v1" },
    {
      ownKeys() {
        return ["contractVersion"];
      },
      getOwnPropertyDescriptor() {
        throw new Error("descriptor-message");
      },
    },
  );

  [ownKeysFailure, descriptorFailure].forEach((value) => {
    const result = validate(value);

    assert.deepEqual(result.errors, [{ code: "INVALID_TYPE", path: "$" }]);
    assert.equal(JSON.stringify(result).includes("message"), false);
    assertDeepFrozen(result);
  });
});

test("object, array, special value, cycle, and shared-reference safety is preserved", () => {
  class CustomClass {}
  const directCycle = {};
  directCycle.self = directCycle;
  const left = {};
  const right = { left };
  left.right = right;
  const circularArray = [];
  circularArray.push(circularArray);
  const values = [
    {},
    [],
    new Set(),
    Buffer.from("x"),
    function invalidFunction() {},
    new CustomClass(),
    Object.create({ inherited: true }),
    directCycle,
    left,
    circularArray,
  ];

  values.forEach((tenantRef) => {
    const result = validate(makeValidEnvelope({ tenantRef }));

    assert.deepEqual(result.errors, [{ code: "INVALID_TYPE", path: "tenantRef" }]);
    assert.equal(Object.isFrozen(tenantRef), false);
    assert.equal(Object.hasOwn(result.errors[0], "value"), false);
  });

  const shared = { nested: "not-read" };
  const first = validate(makeValidEnvelope({ tenantRef: shared, caseRef: shared }));
  const second = validate(makeValidEnvelope({ tenantRef: shared, caseRef: shared }));

  assert.deepEqual(first.errors, [
    { code: "INVALID_TYPE", path: "tenantRef" },
    { code: "INVALID_TYPE", path: "caseRef" },
  ]);
  assert.notEqual(first, second);
  assert.deepEqual(first, second);
  assert.deepEqual(shared, { nested: "not-read" });
  assert.equal(Object.isFrozen(shared), false);
  assertDeepFrozen(first);
  assertDeepFrozen(second);
});

test("result convention, isolation, and explicit non-authorizations hold", () => {
  const validResult = validate(makeValidEnvelope());
  const invalidResult = validate(makeValidEnvelope({ authorized: true }));

  [validResult, invalidResult].forEach((result) => {
    assert.deepEqual(Object.keys(result), ["valid", "contractKind", "version", "errors"]);
    assert.equal(result.contractKind, "RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE");
    assert.equal(result.version, "v1");
    assertDeepFrozen(result);
  });
  invalidResult.errors.forEach((error) => {
    assert.deepEqual(Object.keys(error), ["code", "path"]);
    assert.equal(Object.hasOwn(error, "value"), false);
    assert.equal(Object.hasOwn(error, "details"), false);
  });
  EXPECTED_FALSE_FIELDS.forEach((field) => {
    assert.equal(
      RBAC_RESOURCE_TENANT_CASE_PLACEMENT_EVIDENCE_CONTRACT_POSTURE[field],
      false,
      field,
    );
  });
});
