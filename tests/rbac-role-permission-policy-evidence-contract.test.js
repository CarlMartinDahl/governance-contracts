"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const candidate = require("../packages/governance/src/rbac-role-permission-policy-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");
const rbacScaffold = require("../packages/governance/src/rbac-role-permission-deny-by-default-scaffold.js");
const pr67 = require("../packages/governance/src/rbac-admin-support-authorization-context-contract.js");

const {
  RBAC_ROLE_PERMISSION_POLICY_EFFECT_DECLARATIONS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_CATEGORIES,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_DEFINITION_FIELDS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_CATEGORIES,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_DEFINITION_FIELDS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_SCOPE_DIMENSIONS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_TOP_LEVEL_FIELDS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_VALIDATION_ERROR_CODES,
  RBAC_ROLE_PERMISSION_POLICY_LIFECYCLE_POSTURES,
  validateRbacRolePermissionPolicyEvidence,
} = candidate;

const expectedRoleCategories = Object.values(rbacScaffold.roleCategoryRegistry).map(
  (entry) => entry.role_category,
);
const expectedPermissionCategories = Object.values(
  rbacScaffold.permissionCategoryRegistry,
).map((entry) => entry.permission_category);

function baseRole(overrides = {}) {
  return {
    roleId: "role:synthetic-001",
    roleCategory: expectedRoleCategories[0],
    definitionVersion: "role-definition:synthetic-v1",
    provenanceRef: "provenance:synthetic-role",
    descriptionRef: "description:synthetic-role",
    ...overrides,
  };
}

function basePermission(overrides = {}) {
  return {
    permissionId: "permission:synthetic-001",
    permissionCategory: expectedPermissionCategories[0],
    definitionVersion: "permission-definition:synthetic-v1",
    provenanceRef: "provenance:synthetic-permission",
    actionCategoryRef: "action:synthetic-review",
    resourceCategoryRef: "resource:synthetic-artifact",
    materialClassRef: "material:synthetic-no-raw",
    scopeDimensions: ["TENANT", "CASE", "OBJECT", "FUNCTION", "PROPERTY"],
    effectDeclaration: "POLICY_EFFECT_DENY_DECLARATION",
    ...overrides,
  };
}

function basePolicy(overrides = {}) {
  return {
    contractVersion: "v1",
    evidenceKind: "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE",
    evidenceId: "evidence:synthetic-policy-001",
    policyId: "policy:synthetic-001",
    policyVersion: "version:synthetic-v1",
    policyProvenanceRef: "provenance:synthetic-policy",
    policyLifecyclePosture: "DECLARED_ACTIVE",
    defaultEffectDeclaration: "POLICY_EFFECT_DENY_DECLARATION",
    denyPrecedence: true,
    wildcardsAllowed: false,
    humanProfessionalReviewRequired: true,
    roleDefinitions: [baseRole()],
    permissionDefinitions: [basePermission()],
    ...overrides,
  };
}

function validate(input) {
  return validateRbacRolePermissionPolicyEvidence(input);
}

function assertValid(result) {
  assert.equal(result.valid, true);
  assert.equal(result.contractKind, "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE");
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
  for (const child of Object.values(value)) {
    assertDeepFrozen(child, seen);
  }
}

function errorCodes(result) {
  return result.errors.map((error) => error.code);
}

test("exact contract identity, version, evidence kind, and posture metadata", () => {
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY, {
    contractName: "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT",
    version: "v1",
    evidenceKind: "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE",
  });
  assert.equal(RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE.contractOnly, true);
  assert.equal(RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE.proveOnly, true);
  assert.equal(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE.schemaValidatorOnly,
    true,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE.denyByDefaultDeclared,
    true,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE.actorTypeRoleCategorySeparated,
    true,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE.authorizationDecisionCreated,
    false,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE.accessGrantCreated,
    false,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE.runtimeCertificationCreated,
    false,
  );
});

test("exact tracked role-category equality and source order", () => {
  assert.deepEqual(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_CATEGORIES,
    expectedRoleCategories,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_CATEGORIES.includes("ADMIN"),
    false,
  );
});

test("exact tracked permission-category equality and source order", () => {
  assert.deepEqual(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_CATEGORIES,
    expectedPermissionCategories,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_CATEGORIES.includes("ALLOW"),
    false,
  );
});

test("exact PR67 scope-dimension equality and source order", () => {
  assert.deepEqual(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_SCOPE_DIMENSIONS,
    pr67.RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS,
  );
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_SCOPE_DIMENSIONS, [
    "TENANT",
    "CASE",
    "OBJECT",
    "FUNCTION",
    "PROPERTY",
  ]);
});

test("exact one-function public surface, validator name, arity one, and package-index equivalence", () => {
  const functionExports = Object.entries(candidate).filter(
    ([, value]) => typeof value === "function",
  );

  assert.deepEqual(functionExports.map(([name]) => name), [
    "validateRbacRolePermissionPolicyEvidence",
  ]);
  assert.equal(validateRbacRolePermissionPolicyEvidence.length, 1);
  assert.equal(
    packageIndex.validateRbacRolePermissionPolicyEvidence,
    validateRbacRolePermissionPolicyEvidence,
  );
});

test("one fully valid synthetic policy-evidence object", () => {
  const result = validate(basePolicy());

  assertValid(result);
  assert.deepEqual(Object.keys(result), ["valid", "contractKind", "version", "errors"]);
});

test("top-level non-plain objects, missing fields, unknown fields, and fixed-field values", () => {
  assertInvalid(validate(null), "INVALID_TYPE", "$");
  assertInvalid(validate(new Date(0)), "INVALID_TYPE", "$");
  assertInvalid(validate(Object.create(null)), "INVALID_TYPE", "$");

  const missing = basePolicy();
  delete missing.policyId;
  assertInvalid(validate(missing), "MISSING_FIELD", "$.policyId");

  assertInvalid(validate(basePolicy({ unknown: "synthetic" })), "UNKNOWN_FIELD", "$.unknown");
  const unknownAccessor = basePolicy();
  Object.defineProperty(unknownAccessor, "unknownAccessor", {
    enumerable: true,
    get() {
      throw new Error("getter must not run");
    },
  });
  assertInvalid(
    validate(unknownAccessor),
    "UNKNOWN_FIELD",
    "$.unknownAccessor",
  );
  assertInvalid(validate(basePolicy({ contractVersion: "v2" })), "INVALID_ENUM", "$.contractVersion");
  assertInvalid(validate(basePolicy({ evidenceKind: "OTHER" })), "INVALID_ENUM", "$.evidenceKind");
});

test("exact role-definition schema and tracked role-category validation", () => {
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_DEFINITION_FIELDS, [
    "roleId",
    "roleCategory",
    "definitionVersion",
    "provenanceRef",
    "descriptionRef",
  ]);
  assertValid(
    validate(
      basePolicy({
        roleDefinitions: [baseRole({ roleCategory: expectedRoleCategories[1] })],
      }),
    ),
  );
  assertInvalid(
    validate(
      basePolicy({
        roleDefinitions: [baseRole({ roleCategory: "ADMIN" })],
      }),
    ),
    "INVALID_ENUM",
    "$.roleDefinitions[0].roleCategory",
  );
});

test("exact permission-definition schema and tracked permission-category validation", () => {
  assert.deepEqual(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_DEFINITION_FIELDS,
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
  assertValid(
    validate(
      basePolicy({
        permissionDefinitions: [
          basePermission({ permissionCategory: expectedPermissionCategories[1] }),
        ],
      }),
    ),
  );
  assertInvalid(
    validate(
      basePolicy({
        permissionDefinitions: [
          basePermission({ permissionCategory: "UNKNOWN_PERMISSION" }),
        ],
      }),
    ),
    "INVALID_ENUM",
    "$.permissionDefinitions[0].permissionCategory",
  );
});

test("opaque-reference invalid forms, wildcard prohibition, paths, whitespace, and URI schemes", () => {
  const invalidValues = [
    "",
    " leading",
    "trailing ",
    "embedded whitespace",
    "role*wild",
    "path/value",
    "path\\value",
    "query?value",
    "fragment#value",
    ".",
    "..",
    "https:synthetic",
    "mailto:synthetic",
    "a".repeat(129),
  ];

  for (const value of invalidValues) {
    assertInvalid(
      validate(basePolicy({ evidenceId: value })),
      "INVALID_OPAQUE_REFERENCE",
      "$.evidenceId",
    );
  }
  assertInvalid(
    validate(basePolicy({ wildcardsAllowed: true })),
    "INVALID_CROSS_FIELD_COMBINATION",
    "$.wildcardsAllowed",
  );
});

test("duplicate role IDs and duplicate permission IDs", () => {
  assertInvalid(
    validate(
      basePolicy({
        roleDefinitions: [
          baseRole({ roleId: "role:synthetic-duplicate" }),
          baseRole({
            roleId: "role:synthetic-duplicate",
            roleCategory: expectedRoleCategories[1],
          }),
        ],
      }),
    ),
    "DUPLICATE_VALUE",
    "$.roleDefinitions[1].roleId",
  );
  assertInvalid(
    validate(
      basePolicy({
        permissionDefinitions: [
          basePermission({ permissionId: "permission:synthetic-duplicate" }),
          basePermission({
            permissionId: "permission:synthetic-duplicate",
            permissionCategory: expectedPermissionCategories[1],
          }),
        ],
      }),
    ),
    "DUPLICATE_VALUE",
    "$.permissionDefinitions[1].permissionId",
  );
});

test("scope-dimension unknown values, duplicates, sparse arrays, accessors, and noncanonical order", () => {
  assertInvalid(
    validate(
      basePolicy({
        permissionDefinitions: [
          basePermission({ scopeDimensions: ["TENANT", "UNKNOWN_SCOPE"] }),
        ],
      }),
    ),
    "INVALID_ENUM",
    "$.permissionDefinitions[0].scopeDimensions[1]",
  );
  assertInvalid(
    validate(
      basePolicy({
        permissionDefinitions: [
          basePermission({ scopeDimensions: ["TENANT", "TENANT"] }),
        ],
      }),
    ),
    "DUPLICATE_VALUE",
    "$.permissionDefinitions[0].scopeDimensions[1]",
  );
  assertInvalid(
    validate(
      basePolicy({
        permissionDefinitions: [
          basePermission({ scopeDimensions: ["CASE", "TENANT"] }),
        ],
      }),
    ),
    "INVALID_CROSS_FIELD_COMBINATION",
    "$.permissionDefinitions[0].scopeDimensions[1]",
  );

  const sparse = ["TENANT", "CASE"];
  delete sparse[1];
  assertInvalid(
    validate(
      basePolicy({
        permissionDefinitions: [basePermission({ scopeDimensions: sparse })],
      }),
    ),
    "INVALID_ARRAY",
    "$.permissionDefinitions[0].scopeDimensions[1]",
  );

  const accessor = ["TENANT"];
  Object.defineProperty(accessor, "0", {
    enumerable: true,
    get() {
      throw new Error("getter must not run");
    },
  });
  assertInvalid(
    validate(
      basePolicy({
        permissionDefinitions: [basePermission({ scopeDimensions: accessor })],
      }),
    ),
    "INVALID_ARRAY",
    "$.permissionDefinitions[0].scopeDimensions[0]",
  );
});

test("exact policy lifecycle posture including structurally valid active inactive and revoked declarations", () => {
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_LIFECYCLE_POSTURES, [
    "DECLARED_ACTIVE",
    "DECLARED_INACTIVE",
    "DECLARED_REVOKED",
  ]);
  for (const policyLifecyclePosture of RBAC_ROLE_PERMISSION_POLICY_LIFECYCLE_POSTURES) {
    assertValid(validate(basePolicy({ policyLifecyclePosture })));
  }
  assertInvalid(
    validate(basePolicy({ policyLifecyclePosture: "ACTIVE_VERIFIED" })),
    "INVALID_ENUM",
    "$.policyLifecyclePosture",
  );
});

test("exact effect declarations, deny-default, deny precedence, and wildcard false requirements", () => {
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_EFFECT_DECLARATIONS, [
    "POLICY_EFFECT_ALLOW_DECLARATION",
    "POLICY_EFFECT_DENY_DECLARATION",
  ]);
  assertValid(
    validate(
      basePolicy({
        permissionDefinitions: [
          basePermission({
            effectDeclaration: "POLICY_EFFECT_ALLOW_DECLARATION",
          }),
        ],
      }),
    ),
  );
  assertInvalid(
    validate(basePolicy({ defaultEffectDeclaration: "POLICY_EFFECT_ALLOW_DECLARATION" })),
    "INVALID_ENUM",
    "$.defaultEffectDeclaration",
  );
  assertInvalid(
    validate(basePolicy({ denyPrecedence: false })),
    "INVALID_CROSS_FIELD_COMBINATION",
    "$.denyPrecedence",
  );
  assertInvalid(
    validate(
      basePolicy({
        permissionDefinitions: [
          basePermission({ effectDeclaration: "ACCESS_GRANTED" }),
        ],
      }),
    ),
    "INVALID_ENUM",
    "$.permissionDefinitions[0].effectDeclaration",
  );
});

test("actor-type and role separation rejects actor designation qualification binding grant approval and ownership fields", () => {
  const roleRejected = [
    "actorId",
    "actorType",
    "actorRoleBinding",
    "rolePermissionBinding",
    "grant",
    "approval",
    "professionalReviewQualificationRef",
  ];
  for (const field of roleRejected) {
    assertInvalid(
      validate(basePolicy({ roleDefinitions: [baseRole({ [field]: "synthetic" })] })),
      "UNKNOWN_FIELD",
      `$.roleDefinitions[0].${field}`,
    );
  }

  const permissionRejected = [
    "actorId",
    "actorType",
    "roleId",
    "tenantId",
    "caseId",
    "authorized",
    "accessGranted",
    "reviewerApproved",
  ];
  for (const field of permissionRejected) {
    assertInvalid(
      validate(
        basePolicy({
          permissionDefinitions: [basePermission({ [field]: "synthetic" })],
        }),
      ),
      "UNKNOWN_FIELD",
      `$.permissionDefinitions[0].${field}`,
    );
  }
});

test("absence of inheritance delegation impersonation break-glass lookup resolver and authorization behavior", () => {
  for (const field of ["inheritance", "delegatedFrom", "impersonation", "breakGlass"]) {
    assertInvalid(
      validate(basePolicy({ roleDefinitions: [baseRole({ [field]: "synthetic" })] })),
      "UNKNOWN_FIELD",
      `$.roleDefinitions[0].${field}`,
    );
  }

  const functionNames = Object.entries(candidate)
    .filter(([, value]) => typeof value === "function")
    .map(([name]) => name);
  assert.deepEqual(functionNames, ["validateRbacRolePermissionPolicyEvidence"]);
  assert.equal(/lookup|resolve|dispatch|route|grant|authorize/i.test(functionNames[0]), false);

  const result = validate(basePolicy());
  assert.doesNotMatch(JSON.stringify(result), /ALLOW|GRANT|AUTHORIZED|ACCESS_GRANTED/);
});

test("accessor, Proxy, direct and indirect cycle, circular-array, and repeated-acyclic-reference safety", () => {
  const accessorPolicy = basePolicy();
  Object.defineProperty(accessorPolicy, "policyId", {
    enumerable: true,
    get() {
      throw new Error("getter must not run");
    },
  });
  assertInvalid(validate(accessorPolicy), "INVALID_TYPE", "$.policyId");

  const proxy = new Proxy(basePolicy(), {
    getOwnPropertyDescriptor() {
      throw new Error("proxy trap must be caught");
    },
  });
  assertInvalid(validate(proxy), "INVALID_TYPE", "$");

  const direct = basePolicy();
  direct.roleDefinitions[0].descriptionRef = direct.roleDefinitions[0];
  assertInvalid(
    validate(direct),
    "INVALID_TYPE",
    "$.roleDefinitions[0].descriptionRef",
  );

  const indirect = basePolicy();
  indirect.roleDefinitions[0].provenanceRef = indirect.permissionDefinitions[0];
  indirect.permissionDefinitions[0].provenanceRef = indirect.roleDefinitions[0];
  assertInvalid(
    validate(indirect),
    "INVALID_TYPE",
    "$.roleDefinitions[0].provenanceRef",
  );

  const circularArray = basePolicy();
  circularArray.permissionDefinitions[0].scopeDimensions.push(
    circularArray.permissionDefinitions[0].scopeDimensions,
  );
  assertInvalid(
    validate(circularArray),
    "INVALID_TYPE",
    "$.permissionDefinitions[0].scopeDimensions[5]",
  );

  const shared = baseRole();
  assertInvalid(
    validate(basePolicy({ roleDefinitions: [shared, shared] })),
    "DUPLICATE_VALUE",
    "$.roleDefinitions[1].roleId",
  );
});

test("deep freeze, fresh output isolation, deterministic repeated results, no input mutation freezing reference retention or value echo", () => {
  const input = basePolicy();
  const before = JSON.stringify(input);
  const first = validate(input);
  const second = validate(basePolicy());

  assert.deepEqual(first, second);
  assert.notEqual(first, second);
  assert.notEqual(first.errors, second.errors);
  assertDeepFrozen(first);
  assert.equal(JSON.stringify(input), before);
  assert.equal(Object.isFrozen(input), false);
  assert.equal(Object.isFrozen(input.roleDefinitions[0]), false);

  const invalid = validate(
    basePolicy({
      evidenceId: "http:synthetic-secret",
      roleDefinitions: [baseRole({ roleId: "role:synthetic-secret" })],
    }),
  );
  assertInvalid(invalid, "INVALID_OPAQUE_REFERENCE", "$.evidenceId");
  assert.doesNotMatch(
    JSON.stringify(invalid),
    /http:synthetic-secret|role:synthetic-secret|policy:synthetic-001|provenance:synthetic/,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE.runtimeLookupCreated,
    false,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE.validatorDispatchCreated,
    false,
  );
  assert.equal(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_POSTURE.externalUseAuthorized,
    false,
  );
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_VALIDATION_ERROR_CODES, [
    "INVALID_TYPE",
    "MISSING_FIELD",
    "UNKNOWN_FIELD",
    "INVALID_ENUM",
    "INVALID_OPAQUE_REFERENCE",
    "INVALID_BOOLEAN",
    "INVALID_ARRAY",
    "DUPLICATE_VALUE",
    "INVALID_CROSS_FIELD_COMBINATION",
  ]);
  const booleanInvalid = validate(basePolicy({ denyPrecedence: "true" }));

  assertInvalid(booleanInvalid, "INVALID_BOOLEAN", "$.denyPrecedence");
  for (const error of booleanInvalid.errors) {
    assert.deepEqual(Object.keys(error), ["code", "path"]);
  }
  assert.deepEqual(errorCodes(booleanInvalid), ["INVALID_BOOLEAN"]);
});
