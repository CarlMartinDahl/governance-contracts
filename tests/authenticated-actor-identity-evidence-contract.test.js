"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/authenticated-actor-identity-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");
const pr67Contract = require("../packages/governance/src/rbac-admin-support-authorization-context-contract.js");

const {
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_ACTOR_TYPES,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_POSTURE,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_OPTIONAL_FIELDS,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_REQUIRED_FIELDS,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_SOURCE_CLASSES,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VALIDATION_ERROR_CODES,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VERIFICATION_POSTURES,
  validateAuthenticatedActorIdentityEvidence,
} = contract;

const REQUIRED_FIELDS = [
  "version",
  "evidenceId",
  "actorId",
  "actorIdNamespace",
  "actorType",
  "identitySourceClass",
  "issuerRef",
  "subjectRef",
  "actorTypeEvidenceRef",
  "authenticationEvidenceRef",
  "currentRequestBindingRef",
  "issuedAtEpochSeconds",
  "expiresAtEpochSeconds",
  "revocationEvidenceRef",
  "verificationPosture",
];

function baseEvidence(overrides = {}) {
  return {
    version: "v1",
    evidenceId: "evidence:synthetic-001",
    actorId: "actor:synthetic-001",
    actorIdNamespace: "namespace:internal",
    actorType: "HUMAN_REVIEWER",
    identitySourceClass: "SERVER_SESSION_EVIDENCE",
    issuerRef: "issuer:synthetic",
    subjectRef: "subject:synthetic",
    actorTypeEvidenceRef: "actor-type-evidence:synthetic",
    authenticationEvidenceRef: "authentication-evidence:synthetic",
    currentRequestBindingRef: "request-binding:synthetic",
    issuedAtEpochSeconds: 1,
    expiresAtEpochSeconds: 2,
    revocationEvidenceRef: "revocation-evidence:synthetic",
    verificationPosture: "NOT_VERIFIED_BY_CONTRACT",
    ...overrides,
  };
}

function assertValid(result) {
  assert.equal(result.valid, true);
  assert.equal(result.contractKind, "AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE");
  assert.equal(result.version, "v1");
  assert.deepEqual(result.errors, []);
}

function assertInvalid(result, code, path) {
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some(
      (error) => error.code === code && (!path || error.path === path),
    ),
    `expected ${code}${path ? ` at ${path}` : ""}, got ${JSON.stringify(
      result.errors,
    )}`,
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

function containsValue(value, needle, seen = new WeakSet()) {
  if (value === needle) {
    return true;
  }
  if (!value || typeof value !== "object" || seen.has(value)) {
    return false;
  }
  seen.add(value);
  return Object.values(Object.getOwnPropertyDescriptors(value)).some(
    (descriptor) =>
      "value" in descriptor && containsValue(descriptor.value, needle, seen),
  );
}

function errorCodes(result) {
  return result.errors.map((error) => error.code).sort();
}

test("contract identity, version, posture, and metadata boundaries are exact", () => {
  assert.deepEqual(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY, {
    contractName: "AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT",
    version: "v1",
  });
  assert.deepEqual(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_POSTURE.posture, [
    "CONTRACT_ONLY",
    "PROVE_ONLY",
    "SCHEMA_VALIDATOR_ONLY",
  ]);
  for (const [key, value] of Object.entries(
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_POSTURE,
  )) {
    if (key === "posture") {
      continue;
    }
    if (
      key === "serverProducedEvidenceRequired" ||
      key === "humanProfessionalReviewRequired"
    ) {
      assert.equal(value, true);
    } else {
      assert.equal(value, false, `${key} must stay false`);
    }
  }
  assertDeepFrozen(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_POSTURE);
});

test("canonical actor types are exact and exclude a fifth actor", () => {
  assert.deepEqual(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_ACTOR_TYPES, [
    "HUMAN_REVIEWER",
    "ADMIN",
    "SUPPORT",
    "SERVICE_SYSTEM",
  ]);
  assert.equal(
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_ACTOR_TYPES.includes(
      "PROFESSIONAL_REVIEWER",
    ),
    false,
  );
  assert.equal(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_ACTOR_TYPES.length, 4);
  assertDeepFrozen(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_ACTOR_TYPES);
});

test("identity-source classes and verification posture are exact", () => {
  assert.deepEqual(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_SOURCE_CLASSES, [
    "SERVER_SESSION_EVIDENCE",
    "TOKEN_EVIDENCE",
    "CERTIFICATE_EVIDENCE",
    "DATABASE_ACCOUNT_EVIDENCE",
    "SERVICE_CREDENTIAL_EVIDENCE",
  ]);
  assert.deepEqual(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VERIFICATION_POSTURES, [
    "NOT_VERIFIED_BY_CONTRACT",
  ]);
});

test("required and optional field declarations are exact", () => {
  assert.deepEqual(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_REQUIRED_FIELDS, REQUIRED_FIELDS);
  assert.deepEqual(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_OPTIONAL_FIELDS, [
    "professionalReviewQualificationRef",
  ]);
});

test("public surface contains exactly one function with arity one", () => {
  const publicFunctions = Object.entries(contract)
    .filter(([, value]) => typeof value === "function")
    .map(([name]) => name);

  assert.deepEqual(publicFunctions, ["validateAuthenticatedActorIdentityEvidence"]);
  assert.equal(validateAuthenticatedActorIdentityEvidence.length, 1);
  assert.deepEqual(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VALIDATION_ERROR_CODES, [
    "UNKNOWN_CONTRACT_VERSION",
    "INPUT_NOT_OBJECT",
    "MISSING_REQUIRED_FIELD",
    "UNKNOWN_FIELD",
    "INVALID_TYPE",
    "INVALID_OPAQUE_REFERENCE",
    "UNKNOWN_ENUM_VALUE",
    "PROHIBITED_FIELD",
    "INVALID_CROSS_FIELD_COMBINATION",
    "VALUE_OUT_OF_RANGE",
  ]);
});

test("package-index exports match the candidate module exports", () => {
  assert.equal(
    packageIndex.validateAuthenticatedActorIdentityEvidence,
    validateAuthenticatedActorIdentityEvidence,
  );
  assert.equal(
    packageIndex.AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY,
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY,
  );
  assert.equal(
    packageIndex.AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VALIDATION_ERROR_CODES,
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VALIDATION_ERROR_CODES,
  );
});

test("PR67 actor values align while request-context scope remains separate", () => {
  assert.deepEqual(
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_ACTOR_TYPES,
    pr67Contract.RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTOR_TYPES,
  );
  assert.equal(pr67Contract.validateRbacAdminSupportAuthorizationRequestContext.length, 1);
  const scopeFields = [
    "tenantId",
    "caseId",
    "objectId",
    "functionId",
    "propertyId",
    "scopeContext",
    "scopeOwnership",
    "tenantMembership",
    "caseMembership",
  ];
  for (const field of scopeFields) {
    assert.equal(REQUIRED_FIELDS.includes(field), false);
  }
  assert.equal(
    "validateAuthenticatedActorIdentityEvidence" in pr67Contract,
    false,
  );

  for (const field of scopeFields) {
    const value =
      field === "scopeContext"
        ? { marker: "synthetic-scope-context" }
        : `${field}:synthetic`;
    const input = baseEvidence({ [field]: value });
    const before = JSON.stringify(input);
    let result;
    assert.doesNotThrow(() => {
      result = validateAuthenticatedActorIdentityEvidence(input);
    });
    assertInvalid(result, "UNKNOWN_FIELD", `$.${field}`);
    assert.equal(errorCodes(result).includes("INVALID_TYPE"), false);
    assert.doesNotMatch(JSON.stringify(result), /synthetic-scope-context/);
    assert.doesNotMatch(JSON.stringify(result), new RegExp(`${field}:synthetic`));
    assert.equal(Object.isFrozen(input), false);
    assert.equal(JSON.stringify(input), before);
    assert.equal(containsValue(result, input), false);
  }
});

test("valid minimal evidence is accepted for every identity-source class", () => {
  for (const identitySourceClass of AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_SOURCE_CLASSES) {
    assertValid(
      validateAuthenticatedActorIdentityEvidence(
        baseEvidence({ identitySourceClass }),
      ),
    );
  }
});

test("HUMAN_REVIEWER may carry optional professional-review qualification reference", () => {
  assertValid(
    validateAuthenticatedActorIdentityEvidence(
      baseEvidence({
        actorType: "HUMAN_REVIEWER",
        professionalReviewQualificationRef: "qualification:synthetic",
      }),
    ),
  );
});

test("professional-review qualification reference is rejected for non-human actor types", () => {
  for (const actorType of ["ADMIN", "SUPPORT", "SERVICE_SYSTEM"]) {
    assertInvalid(
      validateAuthenticatedActorIdentityEvidence(
        baseEvidence({
          actorType,
          professionalReviewQualificationRef: "qualification:synthetic",
        }),
      ),
      "INVALID_CROSS_FIELD_COMBINATION",
      "$.professionalReviewQualificationRef",
    );
  }
});

test("missing fields, unknown fields, unknown version, and unknown enums are rejected", () => {
  const missing = baseEvidence();
  delete missing.evidenceId;
  assertInvalid(
    validateAuthenticatedActorIdentityEvidence(missing),
    "MISSING_REQUIRED_FIELD",
    "$.evidenceId",
  );
  assertInvalid(
    validateAuthenticatedActorIdentityEvidence(baseEvidence({ extraField: "synthetic" })),
    "UNKNOWN_FIELD",
    "$.extraField",
  );
  const unknownVersion = validateAuthenticatedActorIdentityEvidence(
    baseEvidence({ version: "v2" }),
  );
  assertInvalid(unknownVersion, "UNKNOWN_CONTRACT_VERSION", "$.version");
  assert.equal(unknownVersion.version, null);
  assertInvalid(
    validateAuthenticatedActorIdentityEvidence(baseEvidence({ actorType: "PROFESSIONAL_REVIEWER" })),
    "UNKNOWN_ENUM_VALUE",
    "$.actorType",
  );
});

test("opaque-reference rules reject length, wildcard, path, URL, and scheme values", () => {
  const longReference = `actor:${"a".repeat(123)}`;
  for (const actorId of [
    "",
    longReference,
    "actor:*",
    "actor\\synthetic",
    "actor?synthetic",
    "actor#synthetic",
    "actor*synthetic",
    "actor/path",
    "https:synthetic",
    "HTTP:synthetic",
    "HTTPS:synthetic",
    "FTP:synthetic",
    "file:synthetic",
    "MAILTO:synthetic",
    "DATA:synthetic",
    "JAVASCRIPT:synthetic",
    ".",
    "..",
    "actor value",
  ]) {
    const input = baseEvidence({ actorId });
    const before = JSON.stringify(input);
    let result;
    assert.doesNotThrow(() => {
      result = validateAuthenticatedActorIdentityEvidence(input);
    });
    assertInvalid(result, "INVALID_OPAQUE_REFERENCE", "$.actorId");
    if (actorId) {
      assert.equal(JSON.stringify(result).includes(JSON.stringify(actorId)), false);
    }
    assert.equal(Object.isFrozen(input), false);
    assert.equal(JSON.stringify(input), before);
  }
});

test("issued and expiry fields require positive safe integers and ordering only", () => {
  const invalidTimeCases = [
    {
      overrides: { issuedAtEpochSeconds: 0 },
      code: "VALUE_OUT_OF_RANGE",
      path: "$.issuedAtEpochSeconds",
    },
    {
      overrides: { issuedAtEpochSeconds: -1 },
      code: "VALUE_OUT_OF_RANGE",
      path: "$.issuedAtEpochSeconds",
    },
    {
      overrides: { issuedAtEpochSeconds: "100" },
      code: "INVALID_TYPE",
      path: "$.issuedAtEpochSeconds",
    },
    {
      overrides: { issuedAtEpochSeconds: Number.MAX_SAFE_INTEGER + 1 },
      code: "INVALID_TYPE",
      path: "$.issuedAtEpochSeconds",
    },
    {
      overrides: { issuedAtEpochSeconds: NaN },
      code: "INVALID_TYPE",
      path: "$.issuedAtEpochSeconds",
    },
    {
      overrides: { issuedAtEpochSeconds: Infinity },
      code: "INVALID_TYPE",
      path: "$.issuedAtEpochSeconds",
    },
    {
      overrides: { issuedAtEpochSeconds: 100n },
      code: "INVALID_TYPE",
      path: "$.issuedAtEpochSeconds",
    },
    {
      overrides: { expiresAtEpochSeconds: 0 },
      code: "VALUE_OUT_OF_RANGE",
      path: "$.expiresAtEpochSeconds",
    },
    {
      overrides: { expiresAtEpochSeconds: -1 },
      code: "VALUE_OUT_OF_RANGE",
      path: "$.expiresAtEpochSeconds",
    },
    {
      overrides: { expiresAtEpochSeconds: "200" },
      code: "INVALID_TYPE",
      path: "$.expiresAtEpochSeconds",
    },
    {
      overrides: { expiresAtEpochSeconds: Number.MAX_SAFE_INTEGER + 1 },
      code: "INVALID_TYPE",
      path: "$.expiresAtEpochSeconds",
    },
    {
      overrides: { expiresAtEpochSeconds: NaN },
      code: "INVALID_TYPE",
      path: "$.expiresAtEpochSeconds",
    },
    {
      overrides: { expiresAtEpochSeconds: Infinity },
      code: "INVALID_TYPE",
      path: "$.expiresAtEpochSeconds",
    },
    {
      overrides: { expiresAtEpochSeconds: 200n },
      code: "INVALID_TYPE",
      path: "$.expiresAtEpochSeconds",
    },
    {
      overrides: { issuedAtEpochSeconds: 4, expiresAtEpochSeconds: 4 },
      code: "INVALID_CROSS_FIELD_COMBINATION",
      path: "$.expiresAtEpochSeconds",
    },
    {
      overrides: { issuedAtEpochSeconds: 4, expiresAtEpochSeconds: 3 },
      code: "INVALID_CROSS_FIELD_COMBINATION",
      path: "$.expiresAtEpochSeconds",
    },
  ];

  for (const { overrides, code, path } of invalidTimeCases) {
    const input = baseEvidence(overrides);
    const descriptorsBefore = Object.getOwnPropertyDescriptors(input);
    let result;
    assert.doesNotThrow(() => {
      result = validateAuthenticatedActorIdentityEvidence(input);
    });
    assertInvalid(result, code, path);
    assert.equal(Object.isFrozen(input), false);
    assert.deepEqual(Object.getOwnPropertyDescriptors(input), descriptorsBefore);
    assert.equal(containsValue(result, input), false);
    assert.doesNotMatch(JSON.stringify(result), /100|200|Infinity|NaN/);
  }

  assertValid(
    validateAuthenticatedActorIdentityEvidence(
      baseEvidence({ issuedAtEpochSeconds: 4, expiresAtEpochSeconds: 5 }),
    ),
  );
});

test("recursive prohibited authority fields are rejected without value echo", () => {
  const result = validateAuthenticatedActorIdentityEvidence(
    baseEvidence({
      nested: {
        role: "synthetic-admin-value",
      },
    }),
  );
  assertInvalid(result, "PROHIBITED_FIELD", "$.nested.role");
  assert.doesNotMatch(JSON.stringify(result), /synthetic-admin-value/);
});

test("recursive prohibited sensitive fields are rejected without value echo", () => {
  const result = validateAuthenticatedActorIdentityEvidence(
    baseEvidence({
      nested: [
        {
          token: "synthetic-sensitive-value",
        },
      ],
    }),
  );
  assertInvalid(result, "PROHIBITED_FIELD", "$.nested[0].token");
  assert.doesNotMatch(JSON.stringify(result), /synthetic-sensitive-value/);
});

test("object and array accessors are not executed and special objects are rejected", () => {
  let topLevelGetterCount = 0;
  const topLevel = baseEvidence();
  Object.defineProperty(topLevel, "actorId", {
    enumerable: true,
    get() {
      topLevelGetterCount += 1;
      return "getter:sentinel";
    },
  });
  const topLevelResult = validateAuthenticatedActorIdentityEvidence(topLevel);
  assertInvalid(topLevelResult, "INVALID_TYPE", "$.actorId");
  assert.equal(topLevelGetterCount, 0);
  assert.doesNotMatch(JSON.stringify(topLevelResult), /getter:sentinel/);

  let nestedGetterCount = 0;
  const nested = baseEvidence({ nested: {} });
  Object.defineProperty(nested.nested, "token", {
    enumerable: true,
    get() {
      nestedGetterCount += 1;
      return "nested:sentinel";
    },
  });
  const nestedResult = validateAuthenticatedActorIdentityEvidence(nested);
  assertInvalid(nestedResult, "PROHIBITED_FIELD", "$.nested.token");
  assert.equal(nestedGetterCount, 0);
  assert.doesNotMatch(JSON.stringify(nestedResult), /nested:sentinel/);

  let arrayGetterCount = 0;
  const arrayInput = baseEvidence({ nested: [] });
  Object.defineProperty(arrayInput.nested, "0", {
    enumerable: true,
    get() {
      arrayGetterCount += 1;
      return "array:sentinel";
    },
  });
  const arrayResult = validateAuthenticatedActorIdentityEvidence(arrayInput);
  assertInvalid(arrayResult, "INVALID_TYPE", "$.nested[0]");
  assert.equal(arrayGetterCount, 0);
  assert.doesNotMatch(JSON.stringify(arrayResult), /array:sentinel/);

  for (const input of [null, [], new Date(0), new Map(), new Set(), Object.create(null)]) {
    assertInvalid(validateAuthenticatedActorIdentityEvidence(input), "INPUT_NOT_OBJECT", "$");
  }

  const proxyTarget = baseEvidence();
  const proxyInput = new Proxy(proxyTarget, {
    ownKeys() {
      throw new Error("PROXY_TRAP_SENTINEL");
    },
  });
  let proxyResult;
  assert.doesNotThrow(() => {
    proxyResult = validateAuthenticatedActorIdentityEvidence(proxyInput);
  });
  assertInvalid(proxyResult, "INVALID_TYPE", "$");
  assertDeepFrozen(proxyResult);
  for (const error of proxyResult.errors) {
    assert.deepEqual(Object.keys(error), ["code", "path"]);
  }
  assert.doesNotMatch(JSON.stringify(proxyResult), /PROXY_TRAP_SENTINEL/);
  assert.equal(containsValue(proxyResult, proxyInput), false);
  assert.equal(containsValue(proxyResult, proxyTarget), false);
  assert.equal(
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_POSTURE.authenticationCreated,
    false,
  );
  assert.equal(
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_POSTURE.authorizationDecisionCreated,
    false,
  );
});

test("direct, indirect, and array cycles are safe while shared acyclic references are allowed", () => {
  const direct = baseEvidence();
  direct.loop = direct;
  const directResult = validateAuthenticatedActorIdentityEvidence(direct);
  assertInvalid(directResult, "INVALID_TYPE", "$.loop");

  const indirect = baseEvidence({ first: {} });
  indirect.first.second = indirect.first;
  const indirectResult = validateAuthenticatedActorIdentityEvidence(indirect);
  assertInvalid(indirectResult, "INVALID_TYPE", "$.first.second");

  const circularArray = [];
  circularArray[0] = circularArray;
  const arrayResult = validateAuthenticatedActorIdentityEvidence(
    baseEvidence({ nested: circularArray }),
  );
  assertInvalid(arrayResult, "INVALID_TYPE", "$.nested[0]");
  assert.deepEqual(
    validateAuthenticatedActorIdentityEvidence(baseEvidence({ nested: circularArray })),
    arrayResult,
  );

  const shared = { marker: "synthetic" };
  const repeated = validateAuthenticatedActorIdentityEvidence(
    baseEvidence({ one: shared, two: shared }),
  );
  assert.equal(errorCodes(repeated).includes("INVALID_TYPE"), false);
});

test("results are deeply frozen, isolated, deterministic, non-mutating, and non-operational", () => {
  const input = baseEvidence();
  const before = JSON.stringify(input);
  const resultOne = validateAuthenticatedActorIdentityEvidence(input);
  const resultTwo = validateAuthenticatedActorIdentityEvidence(baseEvidence());

  assertValid(resultOne);
  assert.notEqual(resultOne, resultTwo);
  assert.deepEqual(resultOne, resultTwo);
  assertDeepFrozen(resultOne);
  assert.equal(Object.isFrozen(input), false);
  assert.equal(JSON.stringify(input), before);
  assert.equal(containsValue(resultOne, input), false);

  const rejected = validateAuthenticatedActorIdentityEvidence(
    baseEvidence({ rawSource: "do-not-echo" }),
  );
  assertDeepFrozen(rejected);
  assert.doesNotMatch(JSON.stringify(rejected), /do-not-echo/);

  const originalDate = globalThis.Date;
  const originalRandom = Math.random;
  const originalFetch = globalThis.fetch;
  let dateTouched = false;
  let randomTouched = false;
  let fetchTouched = false;
  globalThis.Date = function blockedDate() {
    dateTouched = true;
  };
  Math.random = function blockedRandom() {
    randomTouched = true;
    return 0;
  };
  globalThis.fetch = function blockedFetch() {
    fetchTouched = true;
  };
  try {
    assertValid(validateAuthenticatedActorIdentityEvidence(baseEvidence()));
  } finally {
    globalThis.Date = originalDate;
    Math.random = originalRandom;
    globalThis.fetch = originalFetch;
  }
  assert.equal(dateTouched, false);
  assert.equal(randomTouched, false);
  assert.equal(fetchTouched, false);
  assert.equal(
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_POSTURE.authenticationCreated,
    false,
  );
  assert.equal(
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_POSTURE.authorizationDecisionCreated,
    false,
  );
});
