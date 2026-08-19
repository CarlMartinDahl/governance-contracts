"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const candidate = require("../packages/governance/src/rbac-actor-role-binding-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");
const identityContract = require("../packages/governance/src/authenticated-actor-identity-evidence-contract.js");
const policyContract = require("../packages/governance/src/rbac-role-permission-policy-evidence-contract.js");

const {
  PROHIBITED_FIELD_KEYS,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_LIFECYCLE_POSTURES,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_SCHEMA,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_VALIDATION_ERROR_CODES,
  validateRbacActorRoleBindingEvidence,
} = candidate;

function baseBinding(overrides = {}) {
  return {
    contractVersion: "v1",
    evidenceKind: "RBAC_ACTOR_ROLE_BINDING_EVIDENCE",
    verificationPosture: "NOT_VERIFIED_BY_CONTRACT",
    evidenceId: "evidence:synthetic-binding-001",
    bindingId: "binding:synthetic-001",
    bindingVersion: "binding-version:synthetic-v1",
    bindingIssuerRef: "issuer:synthetic-rbac",
    bindingProvenanceRef: "provenance:synthetic-binding",
    bindingLifecyclePosture: "ACTOR_ROLE_BINDING_DECLARED_ACTIVE",
    actorIdentityEvidenceKind: "AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE",
    actorIdentityEvidenceContractVersion: "v1",
    actorIdentityEvidenceRef: "actor-identity-evidence:synthetic-001",
    policyEvidenceKind: "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE",
    policyEvidenceContractVersion: "v1",
    policyEvidenceRef: "policy-evidence:synthetic-001",
    policyId: "policy:synthetic-001",
    policyVersion: "policy-version:synthetic-v1",
    roleId: "role:synthetic-reviewer",
    roleDefinitionVersion: "role-definition:synthetic-v1",
    humanProfessionalReviewRequired: true,
    ...overrides,
  };
}

function validate(input) {
  return validateRbacActorRoleBindingEvidence(input);
}

function assertValid(result) {
  assert.equal(result.valid, true);
  assert.equal(result.contractKind, "RBAC_ACTOR_ROLE_BINDING_EVIDENCE");
  assert.equal(result.version, "v1");
  assert.deepEqual(result.errors, []);
}

function assertInvalid(result, code, path) {
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some(
      (error) => error.code === code && (!path || error.path === path),
    ),
    `expected ${code} at ${path || "*"}, got ${JSON.stringify(result.errors)}`,
  );
}

function assertDeepFrozen(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return;
  }
  seen.add(value);
  assert.equal(Object.isFrozen(value), true);
  for (const descriptor of Object.values(Object.getOwnPropertyDescriptors(value))) {
    if ("value" in descriptor) {
      assertDeepFrozen(descriptor.value, seen);
    }
  }
}

function containsReference(value, reference, seen = new WeakSet()) {
  if (value === reference) {
    return true;
  }
  if (
    (!value || (typeof value !== "object" && typeof value !== "function")) ||
    seen.has(value)
  ) {
    return false;
  }
  seen.add(value);
  for (const descriptor of Object.values(Object.getOwnPropertyDescriptors(value))) {
    if ("value" in descriptor && containsReference(descriptor.value, reference, seen)) {
      return true;
    }
  }
  return false;
}

test("declares exact contract identity and posture metadata without operational claims", () => {
  assert.deepEqual(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT_IDENTITY, {
    contractName: "RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT",
    version: "v1",
    evidenceKind: "RBAC_ACTOR_ROLE_BINDING_EVIDENCE",
  });

  assert.deepEqual(
    Object.entries(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE)
      .filter(([, value]) => value === true)
      .map(([key]) => key),
    [
      "contractOnly",
      "proveOnly",
      "schemaValidatorOnly",
      "actorRoleBindingEvidenceOnly",
      "actorTypeRoleCategorySeparated",
      "sourceProvenanceSeparated",
      "scopeFieldsExcluded",
      "rolePermissionBindingExcluded",
      "directGrantExcluded",
      "humanProfessionalReviewRequired",
    ],
  );
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.accessGrantCreated, false);
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.blockerClosureCreated, false);
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.runtimeCertificationCreated, false);
});

test("references PR68 identity and PR70 policy evidence declarations without validator imports", () => {
  assert.equal(
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS.actorIdentityEvidenceKind,
    identityContract.AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_KIND,
  );
  assert.equal(
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS
      .actorIdentityEvidenceContractVersion,
    identityContract.AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY.version,
  );
  assert.equal(
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS.actorIdentityEvidenceKind,
    "AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE",
  );

  assert.equal(
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS.policyEvidenceKind,
    policyContract.RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY.evidenceKind,
  );
  assert.equal(
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS
      .policyEvidenceContractVersion,
    policyContract.RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY.version,
  );
  assert.equal(
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS.policyEvidenceKind,
    "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE",
  );
});

test("freezes exact schema fields, opaque-reference fields, lifecycle values, and error codes", () => {
  assert.deepEqual(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS, [
    "contractVersion",
    "evidenceKind",
    "verificationPosture",
    "evidenceId",
    "bindingId",
    "bindingVersion",
    "bindingIssuerRef",
    "bindingProvenanceRef",
    "bindingLifecyclePosture",
    "actorIdentityEvidenceKind",
    "actorIdentityEvidenceContractVersion",
    "actorIdentityEvidenceRef",
    "policyEvidenceKind",
    "policyEvidenceContractVersion",
    "policyEvidenceRef",
    "policyId",
    "policyVersion",
    "roleId",
    "roleDefinitionVersion",
    "humanProfessionalReviewRequired",
  ]);
  assert.deepEqual(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_OPAQUE_REFERENCE_FIELDS, [
    "evidenceId",
    "bindingId",
    "bindingVersion",
    "bindingIssuerRef",
    "bindingProvenanceRef",
    "actorIdentityEvidenceRef",
    "policyEvidenceRef",
    "policyId",
    "policyVersion",
    "roleId",
    "roleDefinitionVersion",
  ]);
  assert.deepEqual(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_LIFECYCLE_POSTURES, [
    "ACTOR_ROLE_BINDING_DECLARED_ACTIVE",
    "ACTOR_ROLE_BINDING_DECLARED_INACTIVE",
    "ACTOR_ROLE_BINDING_DECLARED_REVOKED",
  ]);
  assert.deepEqual(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_VALIDATION_ERROR_CODES, [
    "INVALID_TYPE",
    "MISSING_FIELD",
    "UNKNOWN_FIELD",
    "INVALID_ENUM",
    "INVALID_OPAQUE_REFERENCE",
    "INVALID_BOOLEAN",
  ]);
  assert.equal(
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_SCHEMA.requiredFields,
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS,
  );
});

test("exports exactly one public validator with arity one and package-index wiring", () => {
  const functionExports = Object.entries(candidate).filter(
    ([, value]) => typeof value === "function",
  );

  assert.deepEqual(functionExports.map(([name]) => name), [
    "validateRbacActorRoleBindingEvidence",
  ]);
  assert.equal(validateRbacActorRoleBindingEvidence.length, 1);
  assert.equal(
    packageIndex.validateRbacActorRoleBindingEvidence,
    validateRbacActorRoleBindingEvidence,
  );
});

test("accepts one valid synthetic actor-role binding evidence envelope", () => {
  const result = validate(baseBinding());

  assertValid(result);
  assert.deepEqual(Object.keys(result), ["valid", "contractKind", "version", "errors"]);
});

test("accepts only the three declared lifecycle posture values", () => {
  for (const bindingLifecyclePosture of RBAC_ACTOR_ROLE_BINDING_EVIDENCE_LIFECYCLE_POSTURES) {
    assertValid(validate(baseBinding({ bindingLifecyclePosture })));
  }

  assertInvalid(
    validate(baseBinding({ bindingLifecyclePosture: "DECLARED_ACTIVE" })),
    "INVALID_ENUM",
    "$.bindingLifecyclePosture",
  );
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.bindingLifecycleVerified, false);
});

test("rejects non-plain inputs, missing required fields, unknown fields, and wrong fixed values", () => {
  assertInvalid(validate(null), "INVALID_TYPE", "$");
  assertInvalid(validate(new Date(0)), "INVALID_TYPE", "$");
  assertInvalid(validate(new Map()), "INVALID_TYPE", "$");
  assertInvalid(validate(Object.create(null)), "INVALID_TYPE", "$");

  const missing = baseBinding();
  delete missing.policyEvidenceRef;
  assertInvalid(validate(missing), "MISSING_FIELD", "$.policyEvidenceRef");

  assertInvalid(validate(baseBinding({ unknown: "synthetic" })), "UNKNOWN_FIELD", "$.unknown");
  assertInvalid(validate(baseBinding({ contractVersion: "v2" })), "INVALID_ENUM", "$.contractVersion");
  assertInvalid(validate(baseBinding({ evidenceKind: "OTHER" })), "INVALID_ENUM", "$.evidenceKind");
  assertInvalid(
    validate(baseBinding({ verificationPosture: "VERIFIED" })),
    "INVALID_ENUM",
    "$.verificationPosture",
  );
});

test("rejects opaque references with whitespace, URL syntax, paths, wildcards, fragments, and dot values", () => {
  const invalidValues = [
    "",
    " has-space",
    "has space",
    "has*wildcard",
    "path/value",
    "path\\value",
    "query?value",
    "fragment#value",
    ".",
    "..",
    "http:locator",
    "HTTPS:locator",
    "ftp:locator",
    "file:locator",
    "mailto:locator",
    "data:locator",
    "javascript:locator",
    "a".repeat(129),
  ];

  for (const [index, field] of RBAC_ACTOR_ROLE_BINDING_EVIDENCE_OPAQUE_REFERENCE_FIELDS.entries()) {
    const result = validate(baseBinding({ [field]: invalidValues[index] }));
    assertInvalid(result, "INVALID_OPAQUE_REFERENCE", `$.${field}`);
  }
});

test("rejects actor identity content while allowing only actor identity evidence references", () => {
  assertValid(validate(baseBinding({ actorIdentityEvidenceRef: "actor:identity-ref-002" })));

  for (const field of [
    "actorId",
    "actorType",
    "subjectRef",
    "issuerVerified",
    "identityVerified",
    "authenticated",
    "currentRequestBindingVerified",
  ]) {
    assertInvalid(validate(baseBinding({ [field]: "synthetic" })), "UNKNOWN_FIELD", `$.${field}`);
  }
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.actorIdentityReferenceResolved, false);
});

test("rejects policy and role authority content while preserving reference-only posture", () => {
  for (const field of [
    "roleCategory",
    "roleAuthority",
    "roleResolved",
    "permissionId",
    "permissions",
    "policyEffect",
    "denyPrecedence",
  ]) {
    assertInvalid(validate(baseBinding({ [field]: "synthetic" })), "UNKNOWN_FIELD", `$.${field}`);
  }
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.roleAuthorityCreated, false);
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.policyAuthorityCreated, false);
});

test("keeps actor type and role category separated from binding evidence", () => {
  assert.equal(PROHIBITED_FIELD_KEYS.includes("actorType"), true);
  assert.equal(PROHIBITED_FIELD_KEYS.includes("roleCategory"), true);
  assert.equal(
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.actorTypeRoleCategorySeparated,
    true,
  );
  assertInvalid(validate(baseBinding({ actorCategory: "ADMIN" })), "UNKNOWN_FIELD", "$.actorCategory");
  assertInvalid(
    validate(baseBinding({ assignedRoleCategory: "HUMAN_REVIEWER" })),
    "UNKNOWN_FIELD",
    "$.assignedRoleCategory",
  );
});

test("rejects assignments, role-permission bindings, grants, authorization, and access decisions", () => {
  for (const field of [
    "assignment",
    "assigned",
    "actorRoleAssignment",
    "rolePermissionBinding",
    "grant",
    "directGrant",
    "permissionGrant",
    "authorized",
    "authorizationResult",
    "allowed",
    "accessGranted",
    "accessDecision",
  ]) {
    assertInvalid(validate(baseBinding({ [field]: true })), "UNKNOWN_FIELD", `$.${field}`);
  }
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.authorizationDecisionCreated, false);
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.accessGrantCreated, false);
});

test("rejects scope, admin, support, service, delegation, bypass, and review-completion fields", () => {
  for (const field of [
    "scopeDimensions",
    "tenantId",
    "caseId",
    "objectId",
    "adminDesignation",
    "supportApproved",
    "serviceAuthorized",
    "impersonation",
    "delegation",
    "breakGlass",
    "humanReviewBypass",
    "reviewCompleted",
    "signOff",
  ]) {
    assertInvalid(validate(baseBinding({ [field]: "synthetic" })), "UNKNOWN_FIELD", `$.${field}`);
  }
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.scopeAuthorityCreated, false);
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.humanReviewCompleted, false);
});

test("does not invoke accessors and catches reflective proxy failures as invalid", () => {
  let getterCalls = 0;
  const input = baseBinding();
  Object.defineProperty(input, "roleId", {
    enumerable: true,
    get() {
      getterCalls += 1;
      return "role:from-getter";
    },
  });
  Object.defineProperty(input, "zzzUnknown", {
    enumerable: true,
    get() {
      getterCalls += 1;
      return "unknown";
    },
  });

  const accessorResult = validate(input);
  assert.equal(getterCalls, 0);
  assertInvalid(accessorResult, "INVALID_TYPE", "$.roleId");
  assertInvalid(accessorResult, "UNKNOWN_FIELD", "$.zzzUnknown");

  const proxyResult = validate(
    new Proxy(baseBinding(), {
      ownKeys() {
        throw new Error("reflective failure");
      },
    }),
  );
  assertInvalid(proxyResult, "INVALID_TYPE", "$");
});

test("rejects object and array field values without recursing into caller content", () => {
  const cycle = {};
  cycle.self = cycle;
  const directCycleResult = validate(baseBinding({ bindingId: cycle }));
  assertInvalid(directCycleResult, "INVALID_TYPE", "$.bindingId");
  assert.equal(containsReference(directCycleResult, cycle), false);
  assert.equal(cycle.self, cycle);
  assert.equal(Object.isFrozen(cycle), false);

  const arrayValue = ["policy:evidence"];
  const arrayResult = validate(baseBinding({ policyEvidenceRef: arrayValue }));
  assertInvalid(
    arrayResult,
    "INVALID_TYPE",
    "$.policyEvidenceRef",
  );
  assert.equal(containsReference(arrayResult, arrayValue), false);
  assert.equal(Object.isFrozen(arrayValue), false);

  const specialTopLevelValues = [
    new Set(["synthetic"]),
    Buffer.from("synthetic"),
    function syntheticRole() {},
    new (class SyntheticRole {})(),
    Object.create({ inherited: "synthetic" }),
  ];
  for (const value of specialTopLevelValues) {
    const result = validate(value);
    assertInvalid(result, "INVALID_TYPE", "$");
    assert.deepEqual(result.errors.map((error) => Object.keys(error)), [
      ["code", "path"],
    ]);
    assertDeepFrozen(result);
    assert.equal(containsReference(result, value), false);
    assert.equal(JSON.stringify(result).includes("synthetic"), false);
  }

  assertInvalid(
    validate(baseBinding({ policyId: new Set(["synthetic"]) })),
    "INVALID_TYPE",
    "$.policyId",
  );
  assertInvalid(
    validate(baseBinding({ roleId: function syntheticRole() {} })),
    "INVALID_TYPE",
    "$.roleId",
  );

  const first = { name: "first" };
  const second = { name: "second" };
  first.second = second;
  second.first = first;
  const indirectCycleResult = validate(baseBinding({ bindingIssuerRef: first }));
  assert.deepEqual(indirectCycleResult.errors, [
    { code: "INVALID_TYPE", path: "$.bindingIssuerRef" },
  ]);
  assertDeepFrozen(indirectCycleResult);
  assert.equal(containsReference(indirectCycleResult, first), false);
  assert.equal(containsReference(indirectCycleResult, second), false);
  assert.equal(first.second, second);
  assert.equal(second.first, first);
  assert.equal(Object.isFrozen(first), false);
  assert.equal(Object.isFrozen(second), false);

  const circularArray = [];
  circularArray.push(circularArray);
  const circularArrayResult = validate(
    baseBinding({ bindingProvenanceRef: circularArray }),
  );
  assert.deepEqual(circularArrayResult.errors, [
    { code: "INVALID_TYPE", path: "$.bindingProvenanceRef" },
  ]);
  assertDeepFrozen(circularArrayResult);
  assert.equal(containsReference(circularArrayResult, circularArray), false);
  assert.equal(circularArray[0], circularArray);
  assert.equal(Object.isFrozen(circularArray), false);

  const sharedReference = { ref: "synthetic" };
  const repeatedInput = baseBinding({
    evidenceId: sharedReference,
    bindingId: sharedReference,
  });
  const repeatedFirst = validate(repeatedInput);
  const repeatedSecond = validate(repeatedInput);
  assert.deepEqual(repeatedFirst.errors, [
    { code: "INVALID_TYPE", path: "$.evidenceId" },
    { code: "INVALID_TYPE", path: "$.bindingId" },
  ]);
  assert.deepEqual(repeatedSecond, repeatedFirst);
  assert.notEqual(repeatedSecond, repeatedFirst);
  assert.notEqual(repeatedSecond.errors, repeatedFirst.errors);
  assertDeepFrozen(repeatedFirst);
  assertDeepFrozen(repeatedSecond);
  assert.equal(containsReference(repeatedFirst, sharedReference), false);
  assert.equal(containsReference(repeatedSecond, sharedReference), false);
  assert.deepEqual(sharedReference, { ref: "synthetic" });
  assert.equal(Object.isFrozen(sharedReference), false);

  assertInvalid(
    validate(baseBinding({ humanProfessionalReviewRequired: "true" })),
    "INVALID_BOOLEAN",
    "$.humanProfessionalReviewRequired",
  );
  assertInvalid(
    validate(baseBinding({ humanProfessionalReviewRequired: false })),
    "INVALID_BOOLEAN",
    "$.humanProfessionalReviewRequired",
  );
});

test("returns deterministic ordered errors independent of caller property insertion order", () => {
  const input = {
    zzzUnknown: "synthetic",
    aaaUnknown: "synthetic",
    ...baseBinding({
      contractVersion: "v2",
      bindingLifecyclePosture: "OTHER",
      roleDefinitionVersion: "",
    }),
  };
  const result = validate(input);

  assert.deepEqual(
    result.errors.slice(0, 5),
    [
      { code: "UNKNOWN_FIELD", path: "$.aaaUnknown" },
      { code: "UNKNOWN_FIELD", path: "$.zzzUnknown" },
      { code: "INVALID_ENUM", path: "$.contractVersion" },
      { code: "INVALID_ENUM", path: "$.bindingLifecyclePosture" },
      {
        code: "INVALID_OPAQUE_REFERENCE",
        path: "$.roleDefinitionVersion",
      },
    ],
  );
});

test("deep-freezes declarations and validation results without freezing or mutating caller input", () => {
  const input = baseBinding();
  const before = JSON.stringify(input);
  const result = validate(input);

  assert.equal(JSON.stringify(input), before);
  assert.equal(Object.isFrozen(input), false);
  assertDeepFrozen(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT_IDENTITY);
  assertDeepFrozen(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE);
  assertDeepFrozen(result);
});

test("creates isolated results without rejected-value echo or runtime authority side effects", () => {
  const rejectedValue = "bad opaque value";
  const first = validate(baseBinding({ evidenceId: rejectedValue }));
  const second = validate(baseBinding({ evidenceId: rejectedValue }));

  assert.notEqual(first, second);
  assert.notEqual(first.errors, second.errors);
  assert.throws(() => {
    first.errors.push({ code: "UNKNOWN_FIELD", path: "$.synthetic" });
  }, TypeError);
  assert.equal(JSON.stringify(first).includes(rejectedValue), false);
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.runtimeLookupCreated, false);
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.validatorDispatchCreated, false);
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.providerRouteAuthorized, false);
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.externalUseAuthorized, false);
  assert.equal(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_POSTURE.blockerClosureCreated, false);
});
