"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const candidate = require("../packages/governance/src/rbac-role-permission-binding-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");
const policyContract = require("../packages/governance/src/rbac-role-permission-policy-evidence-contract.js");

const {
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_BINDING_LIFECYCLE_POSTURES,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VALIDATION_ERROR_CODES,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VERIFICATION_POSTURES,
  validateRbacRolePermissionBindingEvidence,
} = candidate;

const EXPECTED_FIELDS = [
  "contractVersion",
  "evidenceKind",
  "verificationPosture",
  "evidenceId",
  "bindingId",
  "bindingVersion",
  "bindingIssuerRef",
  "bindingProvenanceRef",
  "bindingLifecyclePosture",
  "policyEvidenceKind",
  "policyEvidenceContractVersion",
  "policyEvidenceRef",
  "policyId",
  "policyVersion",
  "roleId",
  "roleDefinitionVersion",
  "permissionId",
  "permissionDefinitionVersion",
  "humanProfessionalReviewRequired",
];

const TRUE_POSTURE_FIELDS = [
  "contractOnly",
  "proveOnly",
  "schemaValidatorOnly",
  "rolePermissionBindingEvidenceOnly",
  "policyDefinitionBindingSeparated",
  "bindingGrantSeparated",
  "actorFieldsExcluded",
  "actorRoleBindingExcluded",
  "scopeFieldsExcluded",
  "effectOverrideExcluded",
  "wildcardsProhibited",
  "humanProfessionalReviewRequired",
];

const FALSE_POSTURE_FIELDS = [
  "authenticationCreated",
  "identityVerificationCreated",
  "authoritativeActorIdentityCreated",
  "authoritativeActorTypeCreated",
  "actorRoleBindingImported",
  "actorRoleBindingCreated",
  "actorRoleAssignmentCreated",
  "roleAuthorityCreated",
  "roleReferenceResolved",
  "permissionAuthorityCreated",
  "permissionReferenceResolved",
  "permissionAssignmentCreated",
  "policyAuthorityCreated",
  "policyReferenceResolved",
  "policyVersionVerified",
  "policyProvenanceVerified",
  "policyLifecycleVerified",
  "bindingAuthorityCreated",
  "bindingIssuerVerified",
  "bindingProvenanceVerified",
  "bindingVersionVerified",
  "bindingLifecycleVerified",
  "authoritativeRolePermissionBindingCreated",
  "rolePermissionAssignmentCreated",
  "permissionGrantCreated",
  "directGrantCreated",
  "directDenialAuthorityCreated",
  "effectOverrideCreated",
  "denyPrecedenceExecuted",
  "conflictResolutionCreated",
  "roleInheritanceCreated",
  "delegationCreated",
  "impersonationCreated",
  "breakGlassCreated",
  "adminDesignationCreated",
  "supportDesignationCreated",
  "serviceSystemDesignationCreated",
  "professionalQualificationVerified",
  "humanReviewCompleted",
  "approvalCreated",
  "scopeAuthorityCreated",
  "scopeMembershipCreated",
  "scopeOwnershipCreated",
  "authorizationDecisionCreated",
  "allowCapableDecisionCreated",
  "accessGrantCreated",
  "runtimeLookupCreated",
  "registryLookupCreated",
  "policyResolverCreated",
  "dynamicResolutionCreated",
  "validatorDispatchCreated",
  "routeIntegrationCreated",
  "middlewareCreated",
  "persistenceCreated",
  "auditEventEmitted",
  "auditStorageCreated",
  "providerRouteAuthorized",
  "externalUseAuthorized",
  "productCandidateSelected",
  "releaseApprovalCreated",
  "blockerClosureCreated",
  "technicalSignOffCreated",
  "runtimeCertificationCreated",
];

function baseBinding(overrides = {}) {
  return {
    contractVersion: "v1",
    evidenceKind: "RBAC_ROLE_PERMISSION_BINDING_EVIDENCE",
    verificationPosture: "NOT_VERIFIED_BY_CONTRACT",
    evidenceId: "evidence:synthetic-binding-001",
    bindingId: "binding:synthetic-role-permission-001",
    bindingVersion: "binding-version:synthetic-v1",
    bindingIssuerRef: "issuer:synthetic-rbac",
    bindingProvenanceRef: "provenance:synthetic-binding",
    bindingLifecyclePosture: "ROLE_PERMISSION_BINDING_DECLARED_ACTIVE",
    policyEvidenceKind: "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE",
    policyEvidenceContractVersion: "v1",
    policyEvidenceRef: "policy-evidence:synthetic-001",
    policyId: "policy:synthetic-001",
    policyVersion: "policy-version:synthetic-v1",
    roleId: "role:synthetic-reviewer",
    roleDefinitionVersion: "role-definition:synthetic-v1",
    permissionId: "permission:synthetic-review",
    permissionDefinitionVersion: "permission-definition:synthetic-v1",
    humanProfessionalReviewRequired: true,
    ...overrides,
  };
}

function validate(input) {
  return validateRbacRolePermissionBindingEvidence(input);
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

function assertValid(result) {
  assert.equal(result.valid, true);
  assert.deepEqual(Object.keys(result), ["valid", "contractKind", "version", "errors"]);
  assert.equal(result.contractKind, "RBAC_ROLE_PERMISSION_BINDING_EVIDENCE");
  assert.equal(result.version, "v1");
  assert.deepEqual(result.errors, []);
  assertDeepFrozen(result);
}

function assertInvalid(result, code, path) {
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some(
      (error) => error.code === code && (!path || error.path === path),
    ),
    `expected ${code} at ${path || "*"}, got ${JSON.stringify(result.errors)}`,
  );
  for (const error of result.errors) {
    assert.deepEqual(Object.keys(error), ["code", "path"]);
  }
  assertDeepFrozen(result);
}

function assertNoEcho(result, values) {
  const serialized = JSON.stringify(result);
  for (const value of values) {
    if (typeof value === "string" && value.length > 3) {
      assert.equal(serialized.includes(value), false, `echoed ${value}`);
    }
  }
}

function postureBooleans(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => typeof entry === "boolean"),
  );
}

test("declares exact identity, posture, descriptive exports, verification posture, and deep freeze", () => {
  assert.deepEqual(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_IDENTITY, {
    contractName: "RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT",
    version: "v1",
    evidenceKind: "RBAC_ROLE_PERMISSION_BINDING_EVIDENCE",
  });
  assert.deepEqual(
    Object.entries(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE)
      .filter(([, value]) => value === true)
      .map(([key]) => key),
    TRUE_POSTURE_FIELDS,
  );
  assert.deepEqual(
    Object.entries(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE)
      .filter(([, value]) => value === false)
      .map(([key]) => key),
    FALSE_POSTURE_FIELDS,
  );
  assert.deepEqual(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VERIFICATION_POSTURES, [
    "NOT_VERIFIED_BY_CONTRACT",
  ]);
  assertDeepFrozen(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_IDENTITY);
  assertDeepFrozen(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE);
  assertDeepFrozen(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS);
  assertDeepFrozen(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_BINDING_LIFECYCLE_POSTURES);
  assertDeepFrozen(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VALIDATION_ERROR_CODES);
  assertDeepFrozen(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VERIFICATION_POSTURES);
});

test("aligns with actual PR70 identity and role and permission field declarations", () => {
  assert.equal(
    baseBinding().policyEvidenceKind,
    policyContract.RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY.evidenceKind,
  );
  assert.equal(
    baseBinding().policyEvidenceContractVersion,
    policyContract.RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY.version,
  );
  assert.equal(
    policyContract.RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY.evidenceKind,
    "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE",
  );
  assert.equal(
    policyContract.RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY.version,
    "v1",
  );
  assert.deepEqual(
    policyContract.RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_DEFINITION_FIELDS,
    ["roleId", "roleCategory", "definitionVersion", "provenanceRef", "descriptionRef"],
  );
  assert.deepEqual(
    policyContract.RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_DEFINITION_FIELDS,
    [
      "permissionId",
      "permissionCategory",
      "definitionVersion",
      "provenanceRef",
      "actionCategoryRef",
      "resourceCategoryRef",
      "materialClassRef",
      "scopeDimensions",
      "effectDeclaration",
    ],
  );
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS.includes("roleId"), true);
  assert.equal(
    RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS.includes("roleDefinitionVersion"),
    true,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS.includes("permissionId"),
    true,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS.includes("permissionDefinitionVersion"),
    true,
  );
  assert.deepEqual(policyContract.RBAC_ROLE_PERMISSION_POLICY_LIFECYCLE_POSTURES, [
    "DECLARED_ACTIVE",
    "DECLARED_INACTIVE",
    "DECLARED_REVOKED",
  ]);
});

test("declares exact field order, lifecycle order, verification posture, and error code order", () => {
  assert.deepEqual(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS, EXPECTED_FIELDS);
  assert.deepEqual(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_BINDING_LIFECYCLE_POSTURES, [
    "ROLE_PERMISSION_BINDING_DECLARED_ACTIVE",
    "ROLE_PERMISSION_BINDING_DECLARED_INACTIVE",
    "ROLE_PERMISSION_BINDING_DECLARED_REVOKED",
  ]);
  assert.deepEqual(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VERIFICATION_POSTURES, [
    "NOT_VERIFIED_BY_CONTRACT",
  ]);
  assert.deepEqual(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VALIDATION_ERROR_CODES, [
    "INVALID_TYPE",
    "MISSING_FIELD",
    "UNKNOWN_FIELD",
    "INVALID_ENUM",
    "INVALID_OPAQUE_REFERENCE",
    "INVALID_BOOLEAN",
  ]);
});

test("exposes exactly one validator function through direct module and package index without PR72 alias", () => {
  const publicFunctions = Object.entries(candidate)
    .filter(([, value]) => typeof value === "function")
    .map(([name]) => name);

  assert.deepEqual(publicFunctions, ["validateRbacRolePermissionBindingEvidence"]);
  assert.equal(validateRbacRolePermissionBindingEvidence.length, 1);
  assert.equal(
    packageIndex.validateRbacRolePermissionBindingEvidence,
    validateRbacRolePermissionBindingEvidence,
  );
  assert.equal(
    packageIndex.RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_IDENTITY,
    RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_IDENTITY,
  );
  assert.equal(
    Object.prototype.hasOwnProperty.call(candidate, "validateRbacActorRoleBindingEvidence"),
    false,
  );
});

test("validates one materially valid synthetic envelope without mutating, freezing, echoing, or retaining caller input", () => {
  const input = baseBinding();
  const before = JSON.stringify(input);
  const result = validate(input);
  const second = validate(input);

  assertValid(result);
  assert.notEqual(result, second);
  assert.deepEqual(result, second);
  assert.equal(JSON.stringify(input), before);
  assert.equal(Object.isFrozen(input), false);
  assert.equal(containsReference(result, input), false);
});

test("accepts all lifecycle declarations structurally while preserving non-authority posture", () => {
  for (const bindingLifecyclePosture of RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_BINDING_LIFECYCLE_POSTURES) {
    assertValid(validate(baseBinding({ bindingLifecyclePosture })));
  }
  assert.equal(
    RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.bindingLifecycleVerified,
    false,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.bindingAuthorityCreated,
    false,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.rolePermissionAssignmentCreated,
    false,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.permissionGrantCreated,
    false,
  );
});

test("rejects non-plain top-level inputs fail-closed with exact root INVALID_TYPE", () => {
  const customPrototype = Object.create({ inherited: "synthetic" });
  customPrototype.contractVersion = "v1";
  const classInstance = new (class SyntheticBinding {})();
  const invalidInputs = [
    null,
    [],
    new Date(0),
    new Map(),
    new Set(),
    Buffer.from("synthetic"),
    function syntheticBinding() {},
    classInstance,
    customPrototype,
    Object.create(null),
  ];

  for (const input of invalidInputs) {
    assertInvalid(validate(input), "INVALID_TYPE", "$");
    assertNoEcho(validate(input), ["synthetic"]);
  }
});

test("reports missing, inherited, and unknown fields deterministically independent of caller insertion order", () => {
  const missing = validate({});
  assert.deepEqual(
    missing.errors.slice(0, EXPECTED_FIELDS.length),
    EXPECTED_FIELDS.map((field) => ({ code: "MISSING_FIELD", path: `$.${field}` })),
  );

  const inheritedSource = baseBinding();
  try {
    for (const [field, value] of Object.entries(inheritedSource)) {
      Object.defineProperty(Object.prototype, field, {
        configurable: true,
        enumerable: true,
        value,
      });
    }
    assert.deepEqual(
      validate({}).errors.slice(0, EXPECTED_FIELDS.length),
      EXPECTED_FIELDS.map((field) => ({ code: "MISSING_FIELD", path: `$.${field}` })),
    );
  } finally {
    for (const field of Object.keys(inheritedSource)) {
      delete Object.prototype[field];
    }
  }

  const first = validate({ zzzUnknown: true, aaaUnknown: true, ...baseBinding() });
  const second = validate({ aaaUnknown: true, zzzUnknown: true, ...baseBinding() });
  assert.deepEqual(first, second);
  assert.deepEqual(first.errors.slice(0, 2), [
    { code: "UNKNOWN_FIELD", path: "$.aaaUnknown" },
    { code: "UNKNOWN_FIELD", path: "$.zzzUnknown" },
  ]);
});

test("classifies fixed values, lifecycle, and review requirement with exact codes and paths", () => {
  assertInvalid(validate(baseBinding({ contractVersion: "v2" })), "INVALID_ENUM", "$.contractVersion");
  assertInvalid(validate(baseBinding({ contractVersion: 1 })), "INVALID_TYPE", "$.contractVersion");
  assertInvalid(validate(baseBinding({ evidenceKind: "OTHER" })), "INVALID_ENUM", "$.evidenceKind");
  assertInvalid(
    validate(baseBinding({ verificationPosture: "VERIFIED" })),
    "INVALID_ENUM",
    "$.verificationPosture",
  );
  assertInvalid(
    validate(baseBinding({ policyEvidenceKind: "OTHER" })),
    "INVALID_ENUM",
    "$.policyEvidenceKind",
  );
  assertInvalid(
    validate(baseBinding({ policyEvidenceContractVersion: "v2" })),
    "INVALID_ENUM",
    "$.policyEvidenceContractVersion",
  );
  assertInvalid(
    validate(baseBinding({ bindingLifecyclePosture: "OTHER" })),
    "INVALID_ENUM",
    "$.bindingLifecyclePosture",
  );
  assertInvalid(
    validate(baseBinding({ bindingLifecyclePosture: 1 })),
    "INVALID_TYPE",
    "$.bindingLifecyclePosture",
  );
  assertInvalid(
    validate(baseBinding({ humanProfessionalReviewRequired: false })),
    "INVALID_BOOLEAN",
    "$.humanProfessionalReviewRequired",
  );
  assertInvalid(
    validate(baseBinding({ humanProfessionalReviewRequired: "true" })),
    "INVALID_BOOLEAN",
    "$.humanProfessionalReviewRequired",
  );
});

test("rejects invalid opaque-reference strings for every opaque reference field without echo", () => {
  const invalidStrings = [
    "",
    "x".repeat(129),
    " leading",
    "trailing ",
    "embed ded",
    "slash/value",
    "back\\slash",
    "query?value",
    "fragment#value",
    "wild*card",
    ".",
    "..",
    "http:value",
    "HTTPS:value",
    "ftp:value",
    "mailto:value",
    "data:value",
    "javascript:value",
  ];
  const opaqueFields = EXPECTED_FIELDS.filter((field) =>
    ![
      "contractVersion",
      "evidenceKind",
      "verificationPosture",
      "bindingLifecyclePosture",
      "policyEvidenceKind",
      "policyEvidenceContractVersion",
      "humanProfessionalReviewRequired",
    ].includes(field),
  );

  for (const field of opaqueFields) {
    for (const value of invalidStrings) {
      const input = baseBinding({ [field]: value });
      const result = validate(input);
      assertInvalid(result, "INVALID_OPAQUE_REFERENCE", `$.${field}`);
      assertNoEcho(result, [value]);
      assert.equal(Object.isFrozen(input), false);
    }
  }
});

test("rejects non-string opaque-reference values without traversal, coercion, serialization, or caller retention", () => {
  const cyclic = {};
  cyclic.self = cyclic;
  const symbolValue = Symbol("synthetic-symbol");
  const values = [
    undefined,
    null,
    1,
    true,
    1n,
    symbolValue,
    function syntheticPermission() {},
    { nested: "synthetic-object" },
    ["synthetic-array"],
    new Set(["synthetic-set"]),
    new Map([["synthetic", "map"]]),
    Buffer.from("synthetic-buffer"),
    cyclic,
  ];

  for (const value of values) {
    const result = validate(baseBinding({ permissionId: value }));
    assertInvalid(result, "INVALID_TYPE", "$.permissionId");
    if (value && (typeof value === "object" || typeof value === "function")) {
      assert.equal(containsReference(result, value), false);
    }
    assertNoEcho(result, ["synthetic-object", "synthetic-array", "synthetic-set", "synthetic-buffer"]);
  }
  assert.equal(cyclic.self, cyclic);
  assert.equal(Object.isFrozen(cyclic), false);
});

test("keeps role and permission definitions separate from references and creates no authority, assignment, or grant", () => {
  for (const field of [
    "roleCategory",
    "roleDefinition",
    "roleDefinitions",
    "resolvedRole",
    "authoritativeRole",
    "permissionCategory",
    "permissionDefinition",
    "permissionDefinitions",
    "resolvedPermission",
    "authoritativePermission",
  ]) {
    assertInvalid(validate(baseBinding({ [field]: "synthetic" })), "UNKNOWN_FIELD", `$.${field}`);
  }
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.roleAuthorityCreated, false);
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.permissionAuthorityCreated, false);
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.permissionAssignmentCreated, false);
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.permissionGrantCreated, false);
});

test("keeps actor and PR72 actor-role evidence separate without actor composition", () => {
  for (const field of [
    "actorId",
    "actorType",
    "actorCategory",
    "actorIdentityEvidenceKind",
    "actorIdentityEvidenceContractVersion",
    "actorIdentityEvidenceRef",
    "actorRoleBinding",
    "actorRoleBindingRef",
    "actorRoleBindingId",
    "actorRoleAssignment",
    "assignedActor",
    "assignedRole",
    "subjectId",
    "principalId",
  ]) {
    assertInvalid(validate(baseBinding({ [field]: "synthetic" })), "UNKNOWN_FIELD", `$.${field}`);
  }
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.actorRoleBindingImported, false);
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.actorRoleAssignmentCreated, false);
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.authoritativeActorIdentityCreated, false);
});

test("excludes policy authority, effects, grants, denial authority, authorization, and access results", () => {
  for (const field of [
    "policyDefinition",
    "resolvedPolicy",
    "currentPolicy",
    "authoritativePolicy",
    "policyVerified",
    "policyActive",
    "policyRevoked",
    "policyIssuerVerified",
    "policyProvenanceVerified",
    "policyLifecycleVerified",
    "effect",
    "effectDeclaration",
    "effectOverride",
    "defaultEffect",
    "defaultEffectDeclaration",
    "denyPrecedence",
    "wildcardsAllowed",
    "conflictResolution",
    "conflictingEffects",
    "allow",
    "allowed",
    "grant",
    "grants",
    "granted",
    "directGrant",
    "permissionGrant",
    "permissionGrants",
    "denial",
    "directDenial",
    "directDenialAuthority",
    "authorized",
    "authorization",
    "authorizationDecision",
    "authorizationResult",
    "accessGranted",
    "accessDecision",
    "accessResult",
    "routeAuthorized",
    "providerRouteAuthorized",
    "externalUseAuthorized",
  ]) {
    assertInvalid(validate(baseBinding({ [field]: true })), "UNKNOWN_FIELD", `$.${field}`);
  }
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.effectOverrideCreated, false);
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.directGrantCreated, false);
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.directDenialAuthorityCreated, false);
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.allowCapableDecisionCreated, false);
});

test("excludes scope, designation, qualification, completed review, approval, delegation, impersonation, and break-glass fields", () => {
  for (const field of [
    "scopeContext",
    "scopeDimensions",
    "tenantId",
    "caseId",
    "objectId",
    "functionId",
    "propertyId",
    "tenantMembership",
    "caseMembership",
    "objectAccess",
    "functionAccess",
    "propertyAccess",
    "scopeOwnership",
    "scopeAuthority",
    "wildcardScope",
    "crossTenant",
    "crossCase",
    "adminDesignation",
    "adminApproved",
    "supportDesignation",
    "supportApproved",
    "serviceDesignation",
    "serviceAuthorized",
    "systemAuthority",
    "privilegedActor",
    "privilegedRole",
    "impersonation",
    "delegation",
    "breakGlass",
    "emergencyAccess",
    "bypass",
    "humanReviewBypass",
    "selfApproval",
    "professionalReviewQualificationRef",
    "professionalQualification",
    "professionalQualified",
    "reviewerQualification",
    "reviewCompleted",
    "reviewerApproved",
    "humanReviewCompleted",
    "approval",
    "approved",
    "signOff",
  ]) {
    assertInvalid(validate(baseBinding({ [field]: "synthetic" })), "UNKNOWN_FIELD", `$.${field}`);
  }
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.scopeAuthorityCreated, false);
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.adminDesignationCreated, false);
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.professionalQualificationVerified, false);
  assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE.humanReviewCompleted, false);
});

test("does not invoke accessors and catches proxy reflection failures fail-closed", () => {
  let getterCalls = 0;
  let setterCalls = 0;
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
      return "sentinel-getter-message";
    },
  });
  Object.defineProperty(input, "setterOnly", {
    enumerable: true,
    set() {
      setterCalls += 1;
    },
  });

  const accessorResult = validate(input);
  assert.equal(getterCalls, 0);
  assert.equal(setterCalls, 0);
  assertInvalid(accessorResult, "INVALID_TYPE", "$.roleId");
  assertInvalid(accessorResult, "UNKNOWN_FIELD", "$.setterOnly");
  assertInvalid(accessorResult, "UNKNOWN_FIELD", "$.zzzUnknown");
  assertNoEcho(accessorResult, ["sentinel-getter-message"]);

  Object.defineProperty(Object.prototype, "permissionId", {
    configurable: true,
    enumerable: true,
    value: "permission:inherited",
  });
  try {
    const inheritedOnly = baseBinding();
    delete inheritedOnly.permissionId;
    assertInvalid(validate(inheritedOnly), "MISSING_FIELD", "$.permissionId");
  } finally {
    delete Object.prototype.permissionId;
  }

  for (const proxy of [
    new Proxy(baseBinding(), {
      ownKeys() {
        throw new Error("sentinel-ownkeys-message");
      },
    }),
    new Proxy(baseBinding(), {
      getOwnPropertyDescriptor() {
        throw new Error("sentinel-descriptor-message");
      },
    }),
  ]) {
    const result = validate(proxy);
    assertInvalid(result, "INVALID_TYPE", "$");
    assertNoEcho(result, ["sentinel-ownkeys-message", "sentinel-descriptor-message"]);
  }
});

test("rejects special objects, cycles, circular arrays, and repeated references as field values without traversal", () => {
  const directCycle = {};
  directCycle.self = directCycle;
  const first = {};
  const second = { first };
  first.second = second;
  const circularArray = [];
  circularArray.push(circularArray);
  const repeated = { marker: "synthetic-shared" };
  const classInstance = new (class SyntheticField {})();
  const customPrototype = Object.create({ inherited: "synthetic" });
  customPrototype.own = "synthetic-own";

  const result = validate(
    baseBinding({
      bindingId: directCycle,
      bindingVersion: first,
      bindingIssuerRef: circularArray,
      bindingProvenanceRef: repeated,
      policyEvidenceRef: repeated,
      policyId: classInstance,
      policyVersion: customPrototype,
    }),
  );

  assert.deepEqual(
    result.errors.map((error) => error.path),
    [
      "$.bindingId",
      "$.bindingVersion",
      "$.bindingIssuerRef",
      "$.bindingProvenanceRef",
      "$.policyEvidenceRef",
      "$.policyId",
      "$.policyVersion",
    ],
  );
  assert.ok(result.errors.every((error) => error.code === "INVALID_TYPE"));
  const repeatedResult = validate(
    baseBinding({
      bindingId: directCycle,
      bindingVersion: first,
      bindingIssuerRef: circularArray,
      bindingProvenanceRef: repeated,
      policyEvidenceRef: repeated,
      policyId: classInstance,
      policyVersion: customPrototype,
    }),
  );
  assert.notEqual(result, repeatedResult);
  assert.deepEqual(result, repeatedResult);
  for (const value of [
    directCycle,
    first,
    second,
    circularArray,
    repeated,
    classInstance,
    customPrototype,
  ]) {
    assert.equal(Object.isFrozen(value), false);
    assert.equal(containsReference(result, value), false);
  }
  assert.equal(first.second, second);
  assert.equal(second.first, first);
  assert.equal(circularArray[0], circularArray);
  assertNoEcho(result, ["synthetic-shared", "synthetic-own"]);
});

test("keeps deterministic isolated non-echoing results and exact non-authorizing posture", () => {
  const validInput = baseBinding();
  const invalidInput = baseBinding({
    evidenceId: "bad opaque value",
    roleId: "role:synthetic-secret",
    permissionId: "permission:synthetic-secret",
  });
  const valid = validate(validInput);
  const invalidA = validate(invalidInput);
  const invalidB = validate(invalidInput);

  assertValid(valid);
  assert.deepEqual(Object.keys(invalidA), ["valid", "contractKind", "version", "errors"]);
  assert.deepEqual(invalidA.errors.map((error) => Object.keys(error)), [
    ["code", "path"],
  ]);
  assert.notEqual(invalidA, invalidB);
  assert.notEqual(invalidA.errors, invalidB.errors);
  assert.deepEqual(invalidA, invalidB);
  assertDeepFrozen(invalidA);
  assert.equal(Object.isFrozen(validInput), false);
  assert.equal(Object.isFrozen(invalidInput), false);
  assertNoEcho(invalidA, [
    "bad opaque value",
    "role:synthetic-secret",
    "permission:synthetic-secret",
  ]);
  for (const field of TRUE_POSTURE_FIELDS) {
    assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE[field], true);
  }
  for (const field of FALSE_POSTURE_FIELDS) {
    assert.equal(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE[field], false);
  }
  assert.deepEqual(
    Object.keys(postureBooleans(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_POSTURE)),
    [...TRUE_POSTURE_FIELDS, ...FALSE_POSTURE_FIELDS],
  );
});
