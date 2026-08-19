"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/rbac-tenant-case-scope-membership-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");
const contextContract = require("../packages/governance/src/rbac-admin-support-authorization-context-contract.js");

const {
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_TOP_LEVEL_FIELDS,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_SCOPE_DIMENSIONS,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_MEMBERSHIP_LIFECYCLE_POSTURES,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VALIDATION_ERROR_CODES,
  RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VERIFICATION_POSTURES,
  validateRbacTenantCaseScopeMembershipEvidence,
} = contract;

const EXPECTED_EXPORTS = [
  "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_IDENTITY",
  "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE",
  "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_TOP_LEVEL_FIELDS",
  "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_SCOPE_DIMENSIONS",
  "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_MEMBERSHIP_LIFECYCLE_POSTURES",
  "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VALIDATION_ERROR_CODES",
  "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VERIFICATION_POSTURES",
  "validateRbacTenantCaseScopeMembershipEvidence",
];

const EXPECTED_TOP_LEVEL_FIELDS = [
  "contractVersion",
  "evidenceKind",
  "verificationPosture",
  "evidenceId",
  "membershipId",
  "membershipVersion",
  "membershipIssuerRef",
  "membershipProvenanceRef",
  "membershipLifecyclePosture",
  "subjectRef",
  "tenantRef",
  "caseRef",
  "humanProfessionalReviewRequired",
];

const OPAQUE_REFERENCE_FIELDS = [
  "evidenceId",
  "membershipId",
  "membershipVersion",
  "membershipIssuerRef",
  "membershipProvenanceRef",
  "subjectRef",
  "tenantRef",
  "caseRef",
];

const EXPECTED_LIFECYCLE_POSTURES = [
  "TENANT_CASE_SCOPE_MEMBERSHIP_DECLARED_ACTIVE",
  "TENANT_CASE_SCOPE_MEMBERSHIP_DECLARED_INACTIVE",
  "TENANT_CASE_SCOPE_MEMBERSHIP_DECLARED_REVOKED",
];

const EXPECTED_ERROR_CODES = [
  "INVALID_TYPE",
  "MISSING_FIELD",
  "UNKNOWN_FIELD",
  "INVALID_ENUM",
  "INVALID_OPAQUE_REFERENCE",
  "INVALID_BOOLEAN",
];

const EXPECTED_POSTURE_TRUE_FIELDS = [
  "contractOnly",
  "proveOnly",
  "schemaValidatorOnly",
  "tenantCaseScopeMembershipEvidenceOnly",
  "subjectReferenceGeneric",
  "tenantCaseMembershipPaired",
  "objectOwnershipSeparated",
  "functionPropertyAccessSeparated",
  "scopeAuthoritySeparated",
  "lifecycleDeclarationsOnly",
  "wildcardsProhibited",
  "humanProfessionalReviewRequired",
];

const EXPECTED_POSTURE_FALSE_FIELDS = [
  "authenticationCreated",
  "identityVerificationCreated",
  "authoritativeActorIdentityCreated",
  "authoritativeActorTypeCreated",
  "actorRoleCompositionCreated",
  "subjectResolved",
  "tenantMembershipAuthorityCreated",
  "caseMembershipAuthorityCreated",
  "authoritativeMembershipCreated",
  "membershipIssuerVerified",
  "membershipProvenanceVerified",
  "membershipVersionVerified",
  "membershipLifecycleVerified",
  "currentMembershipVerified",
  "resourcePlacementCreated",
  "resourceOwnershipCreated",
  "objectAccessCreated",
  "functionAccessCreated",
  "propertyAccessCreated",
  "scopeAuthorityCreated",
  "scopeBindingCreated",
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
  "adminDesignationCreated",
  "supportDesignationCreated",
  "serviceSystemDesignationCreated",
  "professionalQualificationVerified",
  "humanReviewCompleted",
  "approvalCreated",
  "delegationCreated",
  "impersonationCreated",
  "breakGlassCreated",
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
    evidenceKind: "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE",
    verificationPosture: "NOT_VERIFIED_BY_CONTRACT",
    evidenceId: "evidence:tenant_case_membership:001",
    membershipId: "membership:tenant_case:001",
    membershipVersion: "membership.version:1",
    membershipIssuerRef: "issuer:governance.review",
    membershipProvenanceRef: "provenance:tracked.review",
    membershipLifecyclePosture:
      "TENANT_CASE_SCOPE_MEMBERSHIP_DECLARED_ACTIVE",
    subjectRef: "subject:opaque:reviewer_001",
    tenantRef: "tenant:synthetic:alpha",
    caseRef: "case:synthetic:alpha_001",
    humanProfessionalReviewRequired: true,
    ...overrides,
  };
}

function assertDeepFrozen(value) {
  assert.equal(Object.isFrozen(value), true);

  if (value && typeof value === "object") {
    Reflect.ownKeys(value).forEach((key) => {
      assertDeepFrozen(value[key]);
    });
  }
}

function codesFor(envelope) {
  return validateRbacTenantCaseScopeMembershipEvidence(envelope).errors.map(
    (error) => error.code,
  );
}

function errorFor(envelope, path) {
  return validateRbacTenantCaseScopeMembershipEvidence(envelope).errors.find(
    (error) => error.path === path,
  );
}

test("exports identity and posture as contract-only non-operational metadata", () => {
  assert.deepEqual(
    Object.keys(RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_IDENTITY),
    ["contractName", "version", "evidenceKind"],
  );
  assert.deepEqual(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_IDENTITY,
    {
      contractName: "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT",
      version: "v1",
      evidenceKind: "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE",
    },
  );

  assert.deepEqual(
    Object.keys(RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE),
    [...EXPECTED_POSTURE_TRUE_FIELDS, ...EXPECTED_POSTURE_FALSE_FIELDS],
  );
  assert.equal(EXPECTED_POSTURE_TRUE_FIELDS.length, 12);
  assert.equal(EXPECTED_POSTURE_FALSE_FIELDS.length, 63);

  EXPECTED_POSTURE_TRUE_FIELDS.forEach((field) => {
    assert.equal(
      RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE[field],
      true,
      field,
    );
  });
  EXPECTED_POSTURE_FALSE_FIELDS.forEach((field) => {
    assert.equal(
      RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE[field],
      false,
      field,
    );
  });

  [
    "notVerifiedByContract",
    "tenantCaseMembershipCombined",
    "genericSubjectReferenceOnly",
    "opaqueReferencesOnly",
    "membershipLifecycleDeclarationOnly",
    "singleRelationEnvelopeOnly",
  ].forEach((oldField) => {
    assert.equal(
      Object.hasOwn(
        RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE,
        oldField,
      ),
      false,
      oldField,
    );
  });

  assertDeepFrozen(RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_IDENTITY);
  assertDeepFrozen(RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE);
});

test("derives TENANT and CASE scope dimensions from the PR67 context declaration", () => {
  assert.deepEqual(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_SCOPE_DIMENSIONS,
    ["TENANT", "CASE"],
  );
  assert.deepEqual(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_SCOPE_DIMENSIONS,
    contextContract.RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS.filter(
      (dimension) => dimension === "TENANT" || dimension === "CASE",
    ),
  );
  assert.notEqual(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_SCOPE_DIMENSIONS,
    contextContract.RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS,
  );
  assert.throws(() => {
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_SCOPE_DIMENSIONS.push("OBJECT");
  }, TypeError);
  assert.deepEqual(
    contextContract.RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS,
    ["TENANT", "CASE", "OBJECT", "FUNCTION", "PROPERTY"],
  );
});

test("publishes exact schema, lifecycle, verification, and error declarations", () => {
  assert.deepEqual(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_TOP_LEVEL_FIELDS,
    EXPECTED_TOP_LEVEL_FIELDS,
  );
  assert.deepEqual(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_MEMBERSHIP_LIFECYCLE_POSTURES,
    EXPECTED_LIFECYCLE_POSTURES,
  );
  assert.deepEqual(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VALIDATION_ERROR_CODES,
    EXPECTED_ERROR_CODES,
  );
  assert.deepEqual(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VERIFICATION_POSTURES,
    ["NOT_VERIFIED_BY_CONTRACT"],
  );

  assertDeepFrozen(RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_TOP_LEVEL_FIELDS);
  assertDeepFrozen(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_MEMBERSHIP_LIFECYCLE_POSTURES,
  );
  assertDeepFrozen(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VALIDATION_ERROR_CODES,
  );
  assertDeepFrozen(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_VERIFICATION_POSTURES,
  );
});

test("package index exposes only the additive public surface for this contract", () => {
  assert.deepEqual(Object.keys(contract), EXPECTED_EXPORTS);
  EXPECTED_EXPORTS.forEach((exportName) => {
    assert.equal(packageIndex[exportName], contract[exportName], exportName);
  });

  assert.equal(validateRbacTenantCaseScopeMembershipEvidence.length, 1);
  assert.equal(
    EXPECTED_EXPORTS.filter(
      (exportName) => typeof contract[exportName] === "function",
    ).length,
    1,
  );

  [
    "validateRbacActorRoleBindingEvidence",
    "validateRbacRolePermissionBindingEvidence",
    "validateRbacRolePermissionPolicyEvidence",
    "validateRbacAdminSupportAuthorizationContext",
  ].forEach((adjacentExport) => {
    assert.equal(Object.hasOwn(contract, adjacentExport), false);
  });
});

test("accepts one supplied synthetic tenant/case membership envelope", () => {
  const result = validateRbacTenantCaseScopeMembershipEvidence(
    makeValidEnvelope(),
  );

  assert.deepEqual(Object.keys(result), [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.equal(result.valid, true);
  assert.equal(
    result.contractKind,
    "RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE",
  );
  assert.equal(result.version, "v1");
  assert.deepEqual(result.errors, []);
  assertDeepFrozen(result);
});

test("accepts every declared membership lifecycle posture", () => {
  EXPECTED_LIFECYCLE_POSTURES.forEach((membershipLifecyclePosture) => {
    const result = validateRbacTenantCaseScopeMembershipEvidence(
      makeValidEnvelope({ membershipLifecyclePosture }),
    );

    assert.equal(result.valid, true, membershipLifecyclePosture);
    assert.deepEqual(result.errors, []);
  });
});

test("rejects invalid top-level inputs with frozen echo-free result objects", () => {
  [null, [], new Date(), new Map(), new Set(), Buffer.from("x"), () => {}].forEach(
    (value) => {
      const result = validateRbacTenantCaseScopeMembershipEvidence(value);
      assert.equal(result.valid, false);
      assert.deepEqual(result.errors, [{ code: "INVALID_TYPE", path: "$" }]);
      assertDeepFrozen(result);
      assert.equal(JSON.stringify(result).includes("Buffer"), false);
    },
  );

  class CustomEnvelope {}
  assert.deepEqual(codesFor(new CustomEnvelope()), ["INVALID_TYPE"]);
  assert.deepEqual(codesFor(Object.create(null)), ["INVALID_TYPE"]);
});

test("rejects missing and unknown fields deterministically", () => {
  const missing = makeValidEnvelope();
  delete missing.tenantRef;
  assert.deepEqual(errorFor(missing, "tenantRef"), {
    code: "MISSING_FIELD",
    path: "tenantRef",
  });

  const unknown = makeValidEnvelope({
    zetaUnknown: "z",
    alphaUnknown: "a",
  });
  assert.deepEqual(
    validateRbacTenantCaseScopeMembershipEvidence(unknown).errors.slice(-2),
    [
      { code: "UNKNOWN_FIELD", path: "alphaUnknown" },
      { code: "UNKNOWN_FIELD", path: "zetaUnknown" },
    ],
  );
});

test("enforces fixed enum fields and the human-review boolean", () => {
  assert.deepEqual(errorFor(makeValidEnvelope({ contractVersion: 1 }), "contractVersion"), {
    code: "INVALID_TYPE",
    path: "contractVersion",
  });
  assert.deepEqual(
    errorFor(makeValidEnvelope({ contractVersion: "v2" }), "contractVersion"),
    { code: "INVALID_ENUM", path: "contractVersion" },
  );
  assert.deepEqual(errorFor(makeValidEnvelope({ evidenceKind: 1 }), "evidenceKind"), {
    code: "INVALID_TYPE",
    path: "evidenceKind",
  });
  assert.deepEqual(
    errorFor(
      makeValidEnvelope({ evidenceKind: "RBAC_SCOPE_AUTHORITY_EVIDENCE" }),
      "evidenceKind",
    ),
    { code: "INVALID_ENUM", path: "evidenceKind" },
  );
  assert.deepEqual(
    errorFor(
      makeValidEnvelope({ verificationPosture: "VERIFIED" }),
      "verificationPosture",
    ),
    { code: "INVALID_ENUM", path: "verificationPosture" },
  );
  assert.deepEqual(
    errorFor(
      makeValidEnvelope({ humanProfessionalReviewRequired: false }),
      "humanProfessionalReviewRequired",
    ),
    { code: "INVALID_BOOLEAN", path: "humanProfessionalReviewRequired" },
  );
  assert.deepEqual(
    errorFor(
      makeValidEnvelope({ humanProfessionalReviewRequired: "true" }),
      "humanProfessionalReviewRequired",
    ),
    { code: "INVALID_BOOLEAN", path: "humanProfessionalReviewRequired" },
  );
});

test("rejects invalid opaque reference strings across all opaque fields", () => {
  const invalidStrings = [
    "",
    " has-leading-space",
    "has-trailing-space ",
    "has embedded",
    "*",
    "tenant/path",
    "tenant\\path",
    "tenant?query",
    "tenant#fragment",
    ".",
    "..",
    "https:tenant",
    "FTP:tenant",
    "x".repeat(129),
  ];

  OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    invalidStrings.forEach((value) => {
      assert.deepEqual(errorFor(makeValidEnvelope({ [field]: value }), field), {
        code: "INVALID_OPAQUE_REFERENCE",
        path: field,
      });
    });
  });
});

test("rejects non-string opaque values before opaque syntax checks", () => {
  OPAQUE_REFERENCE_FIELDS.forEach((field) => {
    [1, true, {}, [], Symbol("x")].forEach((value) => {
      assert.deepEqual(errorFor(makeValidEnvelope({ [field]: value }), field), {
        code: "INVALID_TYPE",
        path: field,
      });
    });
  });
});

test("keeps subjectRef generic and rejects identity or actor authority fields", () => {
  assert.equal(
    validateRbacTenantCaseScopeMembershipEvidence(
      makeValidEnvelope({ subjectRef: "opaque.subject:anything" }),
    ).valid,
    true,
  );

  [
    "actorId",
    "actorType",
    "authenticatedActorIdentityEvidenceRef",
    "professionalQualificationRef",
    "qualifiedProfessional",
    "humanReviewCompleted",
  ].forEach((field) => {
    assert.deepEqual(errorFor(makeValidEnvelope({ [field]: "x" }), field), {
      code: "UNKNOWN_FIELD",
      path: field,
    });
  });
});

test("keeps tenant/case membership only and rejects object/function/property scope fields", () => {
  [
    "objectRef",
    "resourceRef",
    "resourcePlacementRef",
    "objectOwnerRef",
    "functionRef",
    "propertyRef",
    "scopeContext",
    "scopeDimensions",
    "scopeAuthorityRef",
    "tenantOwnershipRef",
    "caseOwnershipRef",
  ].forEach((field) => {
    assert.deepEqual(errorFor(makeValidEnvelope({ [field]: "x" }), field), {
      code: "UNKNOWN_FIELD",
      path: field,
    });
  });
});

test("rejects RBAC, policy, binding, grant, and authorization fields", () => {
  [
    "actorRoleBindingRef",
    "actorRoleBinding",
    "rolePermissionBindingRef",
    "rolePermissionBinding",
    "roleId",
    "permissionId",
    "policyId",
    "policyEffect",
    "rolePermissionAssignment",
    "grant",
    "grants",
    "allow",
    "authorized",
    "accessGranted",
    "permissionGranted",
    "providerRouteAuthorized",
    "externalUseAuthorized",
  ].forEach((field) => {
    assert.deepEqual(errorFor(makeValidEnvelope({ [field]: "x" }), field), {
      code: "UNKNOWN_FIELD",
      path: field,
    });
  });
});

test("rejects runtime outcome, lifecycle verification, privileged, and review-state fields", () => {
  [
    "wrongTenant",
    "wrongCase",
    "membershipVerified",
    "membershipCurrent",
    "membershipLookup",
    "membershipStore",
    "duplicateMembershipResolution",
    "impersonation",
    "delegation",
    "breakGlass",
    "adminSupportDesignation",
    "serviceDesignation",
    "approval",
    "approved",
    "signoff",
    "technicalSignoff",
    "blockerClosureCreated",
  ].forEach((field) => {
    assert.deepEqual(errorFor(makeValidEnvelope({ [field]: "x" }), field), {
      code: "UNKNOWN_FIELD",
      path: field,
    });
  });
});

test("rejects accessors and proxy reflection failures without executing getters", () => {
  let accessed = false;
  const accessorEnvelope = makeValidEnvelope();
  Object.defineProperty(accessorEnvelope, "tenantRef", {
    enumerable: true,
    get() {
      accessed = true;
      return "tenant:should_not_read";
    },
  });

  assert.deepEqual(errorFor(accessorEnvelope, "tenantRef"), {
    code: "INVALID_TYPE",
    path: "tenantRef",
  });
  assert.equal(accessed, false);

  let unknownAccessed = false;
  const unknownAccessorEnvelope = makeValidEnvelope();
  Object.defineProperty(unknownAccessorEnvelope, "unknownGetter", {
    enumerable: true,
    get() {
      unknownAccessed = true;
      return "should_not_read";
    },
  });
  const unknownAccessorResult =
    validateRbacTenantCaseScopeMembershipEvidence(unknownAccessorEnvelope);
  assert.deepEqual(unknownAccessorResult.errors.at(-1), {
    code: "UNKNOWN_FIELD",
    path: "unknownGetter",
  });
  assert.equal(unknownAccessed, false);
  assertDeepFrozen(unknownAccessorResult);

  const inheritedRequiredValue = makeValidEnvelope();
  delete inheritedRequiredValue.tenantRef;
  Object.defineProperty(Object.prototype, "tenantRef", {
    configurable: true,
    enumerable: true,
    value: "tenant:inherited",
  });
  let inheritedResult;
  try {
    inheritedResult =
      validateRbacTenantCaseScopeMembershipEvidence(inheritedRequiredValue);
  } finally {
    delete Object.prototype.tenantRef;
  }
  assert.deepEqual(
    inheritedResult.errors.find((error) => error.path === "tenantRef"),
    {
      code: "MISSING_FIELD",
      path: "tenantRef",
    },
  );
  assert.deepEqual(Object.keys(inheritedResult.errors[0]), ["code", "path"]);
  assertDeepFrozen(inheritedResult);

  let setterInvoked = false;
  const setterEnvelope = makeValidEnvelope();
  Object.defineProperty(setterEnvelope, "caseRef", {
    enumerable: true,
    set(_value) {
      setterInvoked = true;
    },
  });
  const setterResult =
    validateRbacTenantCaseScopeMembershipEvidence(setterEnvelope);
  assert.deepEqual(errorFor(setterEnvelope, "caseRef"), {
    code: "INVALID_TYPE",
    path: "caseRef",
  });
  assert.equal(setterInvoked, false);
  assert.equal(JSON.stringify(setterResult).includes("setter"), false);
  assertDeepFrozen(setterResult);

  const proxy = new Proxy(makeValidEnvelope(), {
    ownKeys() {
      throw new Error("blocked");
    },
  });
  const proxyOwnKeysResult =
    validateRbacTenantCaseScopeMembershipEvidence(proxy);
  assert.deepEqual(proxyOwnKeysResult.errors, [
    { code: "INVALID_TYPE", path: "$" },
  ]);
  assert.equal(JSON.stringify(proxyOwnKeysResult).includes("blocked"), false);
  assertDeepFrozen(proxyOwnKeysResult);

  const descriptorProxy = new Proxy(makeValidEnvelope(), {
    getOwnPropertyDescriptor() {
      throw new Error("descriptor blocked");
    },
  });
  const descriptorProxyResult =
    validateRbacTenantCaseScopeMembershipEvidence(descriptorProxy);
  assert.deepEqual(descriptorProxyResult.errors, [
    { code: "INVALID_TYPE", path: "$" },
  ]);
  assert.equal(
    JSON.stringify(descriptorProxyResult).includes("descriptor blocked"),
    false,
  );
  assertDeepFrozen(descriptorProxyResult);
});

test("rejects special objects, cycles, and repeated references in primitive-only fields", () => {
  const cycle = {};
  cycle.self = cycle;
  const shared = {};
  const mutualA = {};
  const mutualB = { mutualA };
  mutualA.mutualB = mutualB;
  const circularArray = [];
  circularArray.push(circularArray);
  class SyntheticClass {}
  const customPrototype = Object.create({ inherited: true });

  [
    new Date(),
    new Map(),
    new Set(),
    Buffer.from("x"),
    () => {},
    {},
    [],
    cycle,
    mutualA,
    circularArray,
    new SyntheticClass(),
    customPrototype,
    shared,
    shared,
  ].forEach((value) => {
    assert.deepEqual(errorFor(makeValidEnvelope({ subjectRef: value }), "subjectRef"), {
      code: "INVALID_TYPE",
      path: "subjectRef",
    });
  });

  const envelope = makeValidEnvelope({ tenantRef: "tenant:alpha" });
  const before = { ...envelope };
  validateRbacTenantCaseScopeMembershipEvidence(envelope);
  assert.deepEqual(envelope, before);

  const sharedReference = { shared: true };
  const repeatedSharedEnvelope = makeValidEnvelope({
    tenantRef: sharedReference,
    caseRef: sharedReference,
  });
  const repeatedResultOne =
    validateRbacTenantCaseScopeMembershipEvidence(repeatedSharedEnvelope);
  const repeatedResultTwo =
    validateRbacTenantCaseScopeMembershipEvidence(repeatedSharedEnvelope);
  assert.notEqual(repeatedResultOne, repeatedResultTwo);
  assert.deepEqual(repeatedResultOne, repeatedResultTwo);
  assert.deepEqual(repeatedResultOne.errors, [
    { code: "INVALID_TYPE", path: "tenantRef" },
    { code: "INVALID_TYPE", path: "caseRef" },
  ]);
  assert.equal(repeatedResultOne.errors.length, 2);
  assertDeepFrozen(repeatedResultOne);
  assertDeepFrozen(repeatedResultTwo);
  assert.deepEqual(sharedReference, { shared: true });
  assert.equal(Object.isFrozen(sharedReference), false);
  assert.equal(JSON.stringify(repeatedResultOne).includes("shared"), false);

  assert.equal(Object.isFrozen(mutualA), false);
  assert.equal(Object.isFrozen(mutualB), false);
  assert.equal(mutualA.mutualB, mutualB);
  assert.equal(mutualB.mutualA, mutualA);
  assert.equal(Object.isFrozen(circularArray), false);
  assert.equal(circularArray[0], circularArray);
});

test("preserves result convention, isolation, posture, and non-authorizations", () => {
  const rejected = makeValidEnvelope({
    tenantRef: "https:tenant",
    accessGranted: true,
  });
  const result = validateRbacTenantCaseScopeMembershipEvidence(rejected);

  assert.deepEqual(Object.keys(result), [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  result.errors.forEach((error) => {
    assert.deepEqual(Object.keys(error), ["code", "path"]);
    assert.equal(Object.hasOwn(error, "value"), false);
    assert.equal(Object.hasOwn(error, "message"), false);
  });
  assert.notEqual(result.errors, rejected.errors);
  assertDeepFrozen(result);

  assert.equal(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE.accessGrantCreated,
    false,
  );
  assert.equal(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE.runtimeLookupCreated,
    false,
  );
  assert.equal(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE.auditEventEmitted,
    false,
  );
  assert.equal(
    RBAC_TENANT_CASE_SCOPE_MEMBERSHIP_EVIDENCE_CONTRACT_POSTURE.blockerClosureCreated,
    false,
  );
});
