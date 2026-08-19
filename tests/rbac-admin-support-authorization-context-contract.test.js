"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/rbac-admin-support-authorization-context-contract.js");
const packageIndex = require("../packages/governance/src/index.js");

const {
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTION_CATEGORIES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTOR_TYPES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_AUDIT_EVENT_CATEGORIES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_IDENTITY,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DECISION_STATUSES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_HUMAN_REVIEW_DEPENDENCIES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_MATERIAL_BOUNDARIES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_REASON_CODES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SOURCE_EVIDENCE_CLASSIFICATIONS,
  validateRbacAdminSupportAuthorizationDecisionContext,
  validateRbacAdminSupportAuthorizationRequestContext,
  validateRbacAdminSupportNoContentAuditDescriptor,
} = contract;

function baseRequest(overrides = {}) {
  return {
    version: "v1",
    requestId: "req:synthetic-001",
    actorType: "HUMAN_REVIEWER",
    actorId: "actor:synthetic-001",
    actionCategory: "READ_SANITIZED_REVIEW_DATA",
    scopeContext: {
      tenantId: "tenant:synthetic-001",
      functionId: "function:review.read",
    },
    materialBoundary: "SYNTHETIC_SANITIZED_NO_RAW_ONLY",
    humanReviewDependency: "NOT_APPLICABLE",
    providerRouteIntent: false,
    externalUseIntent: false,
    sourceEvidenceClassification: "TEST_FIXTURE_ONLY",
    contextReasonCodes: [],
    ...overrides,
  };
}

function baseDecision(overrides = {}) {
  return {
    version: "v1",
    requestId: "req:synthetic-001",
    decisionStatus: "DENY",
    reasonCodes: ["DEFAULT_DENY"],
    evaluatedScopeDimensions: ["TENANT", "FUNCTION"],
    humanReviewDependency: "REQUIRED_NOT_GRANTED",
    auditEventRequired: true,
    providerRouteAuthorized: false,
    externalUseAuthorized: false,
    blockerClosureCreated: false,
    ...overrides,
  };
}

function baseAuditDescriptor(overrides = {}) {
  return {
    contractVersion: "v1",
    eventId: "event:synthetic-001",
    eventCategory: "AUTHORIZATION_DECISION_CONTEXT",
    actorType: "HUMAN_REVIEWER",
    actionCategory: "READ_SANITIZED_REVIEW_DATA",
    decisionStatus: "DENY",
    reasonCodes: ["DEFAULT_DENY"],
    scopeDimensionsPresent: ["TENANT", "FUNCTION"],
    ...overrides,
  };
}

function assertValid(result) {
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
}

function assertInvalid(result, code) {
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some((error) => error.code === code),
    `expected ${code}, got ${JSON.stringify(result.errors)}`,
  );
}

function assertDeepFrozen(value) {
  assert.equal(Object.isFrozen(value), true);
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) {
      assertDeepFrozen(child);
    }
  }
}

test("contract identity and posture are exact and non-operational", () => {
  assert.deepEqual(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_IDENTITY, {
    contractName: "RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT",
    version: "v1",
  });
  assert.deepEqual(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE.posture, [
    "CONTRACT_ONLY",
    "PROVE_ONLY",
    "SCHEMA_VALIDATOR_ONLY",
  ]);
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE.implementationCreated,
    false,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE.rbacImplementationCreated,
    false,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE.accessControlImplementationCreated,
    false,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE.adminSupportImplementationCreated,
    false,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE.runtimeEnforcementAuthorized,
    false,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE.providerRouteAuthorized,
    false,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE.externalUseAuthorized,
    false,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE.blockerClosureCreated,
    false,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE.humanProfessionalReviewRequired,
    true,
  );
});

test("canonical enums are exact and exclude fifth actor or allow status", () => {
  assert.deepEqual(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTOR_TYPES, [
    "HUMAN_REVIEWER",
    "ADMIN",
    "SUPPORT",
    "SERVICE_SYSTEM",
  ]);
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTOR_TYPES.includes(
      "PROFESSIONAL_REVIEWER",
    ),
    false,
  );
  assert.deepEqual(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTION_CATEGORIES, [
    "READ_SANITIZED_REVIEW_DATA",
    "WRITE_SANITIZED_REVIEW_STATE",
    "REQUEST_HUMAN_REVIEW",
    "VIEW_NO_CONTENT_AUDIT_DESCRIPTOR",
    "ADMINISTER_NON_CONTENT_CONFIGURATION",
    "SUPPORT_NON_CONTENT_DIAGNOSTIC",
    "REQUEST_EXPORT",
    "REQUEST_DELETION",
    "REQUEST_ROLE_CHANGE",
    "REQUEST_BREAK_GLASS",
    "REQUEST_PROVIDER_ROUTE",
  ]);
  assert.deepEqual(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS, [
    "TENANT",
    "CASE",
    "OBJECT",
    "FUNCTION",
    "PROPERTY",
  ]);
  assert.deepEqual(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_MATERIAL_BOUNDARIES, [
    "SYNTHETIC_SANITIZED_NO_RAW_ONLY",
  ]);
  assert.deepEqual(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_HUMAN_REVIEW_DEPENDENCIES, [
    "REQUIRED_NOT_GRANTED",
    "NOT_APPLICABLE",
  ]);
  assert.deepEqual(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DECISION_STATUSES, [
    "NOT_EVALUATED",
    "DENY",
    "INVALID_CONTEXT",
    "HUMAN_REVIEW_REQUIRED",
  ]);
  assert.equal(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DECISION_STATUSES.includes("ALLOW"), false);
  assert.deepEqual(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SOURCE_EVIDENCE_CLASSIFICATIONS, [
    "STATIC_DECLARATION_ONLY",
    "TEST_FIXTURE_ONLY",
    "DOCS_ONLY",
    "UNKNOWN_NOT_EVIDENCED",
    "NOT_AUTHORIZED",
  ]);
});

test("reason codes and no-content audit categories are exact", () => {
  assert.deepEqual(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_REASON_CODES, [
    "UNKNOWN_ACTOR_TYPE",
    "UNKNOWN_ACTION",
    "MISSING_SCOPE",
    "WRONG_TENANT",
    "WRONG_CASE",
    "WRONG_OBJECT",
    "WRONG_FUNCTION",
    "WRONG_PROPERTY",
    "RAW_PRIVATE_SOURCE_NOT_ALLOWED",
    "SUPPORT_RAW_ACCESS_PROHIBITED",
    "SERVICE_SELF_APPROVAL_PROHIBITED",
    "ADMIN_REVIEW_BYPASS_PROHIBITED",
    "HUMAN_REVIEW_REQUIRED",
    "PERMISSION_NOT_EVIDENCED",
    "ROLE_BINDING_NOT_EVIDENCED",
    "PROVIDER_ROUTING_NOT_AUTHORIZED",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "DEFAULT_DENY",
  ]);
  assert.deepEqual(RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_AUDIT_EVENT_CATEGORIES, [
    "AUTHORIZATION_REQUEST_CONTEXT",
    "AUTHORIZATION_DECISION_CONTEXT",
    "HUMAN_REVIEW_DEPENDENCY",
    "PRIVILEGED_ACTION_REQUEST",
  ]);
});

test("public functions and package-index wiring are exact", () => {
  const functionExports = Object.entries(contract)
    .filter(([, value]) => typeof value === "function")
    .map(([name]) => name)
    .sort();

  assert.deepEqual(functionExports, [
    "validateRbacAdminSupportAuthorizationDecisionContext",
    "validateRbacAdminSupportAuthorizationRequestContext",
    "validateRbacAdminSupportNoContentAuditDescriptor",
  ].sort());
  assert.equal(validateRbacAdminSupportAuthorizationRequestContext.length, 1);
  assert.equal(validateRbacAdminSupportAuthorizationDecisionContext.length, 1);
  assert.equal(validateRbacAdminSupportNoContentAuditDescriptor.length, 1);
  assert.equal(
    packageIndex.validateRbacAdminSupportAuthorizationRequestContext,
    validateRbacAdminSupportAuthorizationRequestContext,
  );
  assert.equal(
    packageIndex.RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_IDENTITY,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_IDENTITY,
  );
});

test("valid request contexts accept required and optional scope dimensions", () => {
  assertValid(validateRbacAdminSupportAuthorizationRequestContext(baseRequest()));
  assertValid(
    validateRbacAdminSupportAuthorizationRequestContext(
      baseRequest({
        scopeContext: {
          tenantId: "tenant:synthetic-001",
          caseId: "case.synthetic-001",
          objectId: "object_synthetic-001",
          functionId: "function:review.read",
          propertyId: "property-synthetic-001",
        },
      }),
    ),
  );
});

test("request context rejects missing scope, malformed IDs, and unknown enums", () => {
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(
      baseRequest({ scopeContext: { functionId: "function:review.read" } }),
    ),
    "MISSING_REQUIRED_FIELD",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(
      baseRequest({ scopeContext: { tenantId: "tenant:synthetic-001" } }),
    ),
    "MISSING_REQUIRED_FIELD",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(
      baseRequest({ scopeContext: { tenantId: "*", functionId: "function:review.read" } }),
    ),
    "INVALID_OPAQUE_ID",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(
      baseRequest({ requestId: "https://example.invalid/request" }),
    ),
    "INVALID_OPAQUE_ID",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(baseRequest({ actorType: "ROOT" })),
    "UNKNOWN_ENUM_VALUE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(baseRequest({ actionCategory: "APPROVE" })),
    "UNKNOWN_ENUM_VALUE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(baseRequest({ version: "v2" })),
    "UNKNOWN_CONTRACT_VERSION",
  );
});

test("request context rejects unknown, role, permission, grant, approval, and nested fields", () => {
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(baseRequest({ extra: "synthetic" })),
    "UNKNOWN_FIELD",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(baseRequest({ role: "ADMIN" })),
    "PROHIBITED_FIELD",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(
      baseRequest({ scopeContext: { tenantId: "tenant:1", functionId: "function:1", rawContent: "x" } }),
    ),
    "PROHIBITED_FIELD",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(baseRequest({ grants: ["x"] })),
    "PROHIBITED_FIELD",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(baseRequest({ reviewerApproval: true })),
    "PROHIBITED_FIELD",
  );
});

test("request context enforces human-review, provider, and external-use cross-field rules", () => {
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(
      baseRequest({
        actionCategory: "REQUEST_DELETION",
        humanReviewDependency: "NOT_APPLICABLE",
      }),
    ),
    "INVALID_CROSS_FIELD_COMBINATION",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(
      baseRequest({
        actionCategory: "REQUEST_PROVIDER_ROUTE",
        humanReviewDependency: "REQUIRED_NOT_GRANTED",
        providerRouteIntent: false,
      }),
    ),
    "VALUE_MUST_BE_TRUE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(
      baseRequest({ providerRouteIntent: true }),
    ),
    "VALUE_MUST_BE_FALSE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(
      baseRequest({ externalUseIntent: true }),
    ),
    "INVALID_CROSS_FIELD_COMBINATION",
  );
  assertValid(
    validateRbacAdminSupportAuthorizationRequestContext(
      baseRequest({
        actionCategory: "REQUEST_EXPORT",
        humanReviewDependency: "REQUIRED_NOT_GRANTED",
        externalUseIntent: true,
      }),
    ),
  );
});

test("decision context validates only non-authorizing descriptors", () => {
  const prohibitedTrueValue = Boolean(1);

  assertValid(validateRbacAdminSupportAuthorizationDecisionContext(baseDecision()));
  assertInvalid(
    validateRbacAdminSupportAuthorizationDecisionContext(
      baseDecision({ decisionStatus: "ALLOW" }),
    ),
    "UNKNOWN_ENUM_VALUE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationDecisionContext(
      baseDecision({ decisionStatus: "APPROVE" }),
    ),
    "UNKNOWN_ENUM_VALUE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationDecisionContext(
      baseDecision({ decisionStatus: "AUTHORIZED" }),
    ),
    "UNKNOWN_ENUM_VALUE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationDecisionContext(
      baseDecision({ auditEventRequired: false }),
    ),
    "VALUE_MUST_BE_TRUE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationDecisionContext(
      baseDecision({ providerRouteAuthorized: prohibitedTrueValue }),
    ),
    "VALUE_MUST_BE_FALSE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationDecisionContext(
      baseDecision({ externalUseAuthorized: prohibitedTrueValue }),
    ),
    "VALUE_MUST_BE_FALSE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationDecisionContext(
      baseDecision({ blockerClosureCreated: prohibitedTrueValue }),
    ),
    "VALUE_MUST_BE_FALSE",
  );
});

test("decision context rejects empty, unknown, and duplicate enum arrays", () => {
  assertInvalid(
    validateRbacAdminSupportAuthorizationDecisionContext(baseDecision({ reasonCodes: [] })),
    "MISSING_REQUIRED_FIELD",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationDecisionContext(
      baseDecision({ reasonCodes: ["DEFAULT_DENY", "DEFAULT_DENY"] }),
    ),
    "DUPLICATE_VALUE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationDecisionContext(
      baseDecision({ evaluatedScopeDimensions: ["TENANT", "TENANT"] }),
    ),
    "DUPLICATE_VALUE",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationDecisionContext(
      baseDecision({ reasonCodes: ["UNREGISTERED_REASON"] }),
    ),
    "UNKNOWN_ENUM_VALUE",
  );
});

test("no-content audit descriptor validates without actor IDs, request IDs, or scope values", () => {
  assertValid(validateRbacAdminSupportNoContentAuditDescriptor(baseAuditDescriptor()));
  assertInvalid(
    validateRbacAdminSupportNoContentAuditDescriptor(
      baseAuditDescriptor({ requestId: "req:synthetic-001" }),
    ),
    "PROHIBITED_FIELD",
  );
  assertInvalid(
    validateRbacAdminSupportNoContentAuditDescriptor(
      baseAuditDescriptor({ actorId: "actor:synthetic-001" }),
    ),
    "PROHIBITED_FIELD",
  );
  assertInvalid(
    validateRbacAdminSupportNoContentAuditDescriptor(
      baseAuditDescriptor({ tenantId: "tenant:synthetic-001" }),
    ),
    "PROHIBITED_FIELD",
  );
  assertInvalid(
    validateRbacAdminSupportNoContentAuditDescriptor(
      baseAuditDescriptor({ fileName: "synthetic.txt" }),
    ),
    "PROHIBITED_FIELD",
  );
  assertInvalid(
    validateRbacAdminSupportNoContentAuditDescriptor(
      baseAuditDescriptor({ reasonCodes: ["DEFAULT_DENY", "DEFAULT_DENY"] }),
    ),
    "DUPLICATE_VALUE",
  );
});

test("recursive prohibited-field boundary rejects raw private source and provider leakage", () => {
  const result = validateRbacAdminSupportAuthorizationRequestContext(
    baseRequest({
      scopeContext: {
        tenantId: "tenant:synthetic-001",
        functionId: "function:review.read",
        nested: [{ providerPayload: "synthetic provider payload" }],
      },
    }),
  );
  const serialized = JSON.stringify(result);

  assertInvalid(result, "PROHIBITED_FIELD");
  assert.doesNotMatch(serialized, /synthetic provider payload/);
});

test("special objects and getters are rejected without executing getters", () => {
  let getterExecuted = false;
  const objectWithGetter = {};

  Object.defineProperty(objectWithGetter, "version", {
    enumerable: true,
    get() {
      getterExecuted = true;
      return "v1";
    },
  });

  assertInvalid(validateRbacAdminSupportAuthorizationRequestContext(new Date(0)), "INPUT_NOT_OBJECT");
  assertInvalid(validateRbacAdminSupportAuthorizationRequestContext(new Map()), "INPUT_NOT_OBJECT");
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(Object.create(null)),
    "INPUT_NOT_OBJECT",
  );
  assertInvalid(
    validateRbacAdminSupportAuthorizationRequestContext(objectWithGetter),
    "UNKNOWN_CONTRACT_VERSION",
  );
  assert.equal(getterExecuted, false);
});

test("cyclic object and array inputs are rejected without throwing", () => {
  const directCycle = baseRequest();
  directCycle.self = directCycle;
  const resultReferencesValue = (value, target) => {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (value === target) {
      return true;
    }
    return Object.values(value).some((child) => resultReferencesValue(child, target));
  };

  let directResult;
  assert.doesNotThrow(() => {
    directResult = validateRbacAdminSupportAuthorizationRequestContext(directCycle);
  });
  assertInvalid(directResult, "INVALID_TYPE");
  assert.ok(directResult.errors.some((error) => error.path === "$.self"));
  assertDeepFrozen(directResult);
  assert.equal(resultReferencesValue(directResult, directCycle), false);

  const firstCycleNode = {};
  const secondCycleNode = { first: firstCycleNode };
  firstCycleNode.second = secondCycleNode;
  const indirectCycleRequest = baseRequest({ indirectCycle: firstCycleNode });
  const indirectCyclePath = "$.indirectCycle.second.first";

  let firstIndirectResult;
  assert.doesNotThrow(() => {
    firstIndirectResult = validateRbacAdminSupportAuthorizationRequestContext(
      indirectCycleRequest,
    );
  });
  assertInvalid(firstIndirectResult, "INVALID_TYPE");
  assert.ok(
    firstIndirectResult.errors.some(
      (error) => error.code === "INVALID_TYPE" && error.path === indirectCyclePath,
    ),
  );
  assertDeepFrozen(firstIndirectResult);
  assert.equal(resultReferencesValue(firstIndirectResult, firstCycleNode), false);
  assert.equal(resultReferencesValue(firstIndirectResult, secondCycleNode), false);
  assert.deepEqual(Object.keys(firstCycleNode), ["second"]);
  assert.equal(firstCycleNode.second, secondCycleNode);
  assert.deepEqual(Object.keys(secondCycleNode), ["first"]);
  assert.equal(secondCycleNode.first, firstCycleNode);

  let secondIndirectResult;
  assert.doesNotThrow(() => {
    secondIndirectResult = validateRbacAdminSupportAuthorizationRequestContext(
      indirectCycleRequest,
    );
  });
  assert.notEqual(firstIndirectResult, secondIndirectResult);
  assert.deepEqual(secondIndirectResult, firstIndirectResult);
  assertDeepFrozen(secondIndirectResult);
  assert.ok(
    secondIndirectResult.errors.some(
      (error) => error.code === "INVALID_TYPE" && error.path === indirectCyclePath,
    ),
  );
  assert.equal(resultReferencesValue(secondIndirectResult, firstCycleNode), false);
  assert.equal(resultReferencesValue(secondIndirectResult, secondCycleNode), false);
  assert.deepEqual(Object.keys(firstCycleNode), ["second"]);
  assert.equal(firstCycleNode.second, secondCycleNode);
  assert.deepEqual(Object.keys(secondCycleNode), ["first"]);
  assert.equal(secondCycleNode.first, firstCycleNode);

  const sharedChild = { marker: "synthetic-shared-reference" };
  const sharedReferenceRequest = baseRequest({
    sharedFirst: sharedChild,
    sharedSecond: sharedChild,
  });
  const beforeSharedChild = { ...sharedChild };
  let sharedReferenceResult;
  assert.doesNotThrow(() => {
    sharedReferenceResult = validateRbacAdminSupportAuthorizationRequestContext(
      sharedReferenceRequest,
    );
  });
  assertInvalid(sharedReferenceResult, "UNKNOWN_FIELD");
  assert.ok(
    sharedReferenceResult.errors.some(
      (error) => error.code === "UNKNOWN_FIELD" && error.path === "$.sharedFirst",
    ),
  );
  assert.ok(
    sharedReferenceResult.errors.some(
      (error) => error.code === "UNKNOWN_FIELD" && error.path === "$.sharedSecond",
    ),
  );
  assert.equal(
    sharedReferenceResult.errors.some((error) => error.code === "INVALID_TYPE"),
    false,
  );
  assert.deepEqual(sharedChild, beforeSharedChild);
  assert.equal(resultReferencesValue(sharedReferenceResult, sharedChild), false);

  const circularReasons = ["DEFAULT_DENY"];
  circularReasons.push(circularReasons);

  let arrayResult;
  assert.doesNotThrow(() => {
    arrayResult = validateRbacAdminSupportAuthorizationDecisionContext(
      baseDecision({ reasonCodes: circularReasons }),
    );
  });
  assertInvalid(arrayResult, "INVALID_TYPE");
  assert.ok(arrayResult.errors.some((error) => error.path === "$.reasonCodes[1]"));
  assertDeepFrozen(arrayResult);
});

test("nested object and array accessors are rejected without getter execution", () => {
  let nestedGetterExecuted = false;
  const scopeContext = {
    functionId: "function:review.read",
  };

  Object.defineProperty(scopeContext, "tenantId", {
    enumerable: true,
    get() {
      nestedGetterExecuted = true;
      return "tenant:synthetic-getter-value";
    },
  });

  const nestedAccessorResult = validateRbacAdminSupportAuthorizationRequestContext(
    baseRequest({ scopeContext }),
  );
  assert.equal(nestedGetterExecuted, false);
  assertInvalid(nestedAccessorResult, "INVALID_TYPE");
  assert.ok(
    nestedAccessorResult.errors.some((error) => error.path === "$.scopeContext.tenantId"),
  );
  assert.doesNotMatch(JSON.stringify(nestedAccessorResult), /synthetic-getter-value/);

  let prohibitedGetterExecuted = false;
  const prohibitedContainer = {};
  Object.defineProperty(prohibitedContainer, "rawContent", {
    enumerable: true,
    get() {
      prohibitedGetterExecuted = true;
      return "synthetic raw getter value";
    },
  });

  const prohibitedAccessorResult = validateRbacAdminSupportAuthorizationRequestContext(
    baseRequest({
      scopeContext: {
        tenantId: "tenant:synthetic-001",
        functionId: "function:review.read",
        nested: prohibitedContainer,
      },
    }),
  );
  assert.equal(prohibitedGetterExecuted, false);
  assertInvalid(prohibitedAccessorResult, "PROHIBITED_FIELD");
  assert.ok(
    prohibitedAccessorResult.errors.some(
      (error) => error.path === "$.scopeContext.nested.rawContent",
    ),
  );
  assert.doesNotMatch(JSON.stringify(prohibitedAccessorResult), /synthetic raw getter value/);

  let arrayGetterExecuted = false;
  const reasonCodes = [];
  Object.defineProperty(reasonCodes, "0", {
    enumerable: true,
    get() {
      arrayGetterExecuted = true;
      return "DEFAULT_DENY";
    },
  });
  reasonCodes.length = 1;

  const arrayAccessorResult = validateRbacAdminSupportAuthorizationDecisionContext(
    baseDecision({ reasonCodes }),
  );
  assert.equal(arrayGetterExecuted, false);
  assertInvalid(arrayAccessorResult, "INVALID_TYPE");
  assert.ok(arrayAccessorResult.errors.some((error) => error.path === "$.reasonCodes[0]"));
});

test("validation results are frozen, isolated, and do not mutate or echo rejected input", () => {
  const input = baseRequest({
    requestId: "bad/request",
    rawContent: "synthetic raw content",
  });
  const before = JSON.stringify(input);
  const first = validateRbacAdminSupportAuthorizationRequestContext(input);
  const second = validateRbacAdminSupportAuthorizationRequestContext(input);
  const serialized = JSON.stringify(first);

  assert.equal(JSON.stringify(input), before);
  assert.notEqual(first, second);
  assert.notEqual(first.errors, second.errors);
  assertDeepFrozen(first);
  assertDeepFrozen(second);
  assert.doesNotMatch(serialized, /synthetic raw content|bad\/request/);
});

test("exported arrays and metadata are deeply frozen", () => {
  for (const value of [
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_IDENTITY,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_CONTRACT_POSTURE,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTOR_TYPES,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_ACTION_CATEGORIES,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SCOPE_DIMENSIONS,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_MATERIAL_BOUNDARIES,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_HUMAN_REVIEW_DEPENDENCIES,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DECISION_STATUSES,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SOURCE_EVIDENCE_CLASSIFICATIONS,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_REASON_CODES,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_AUDIT_EVENT_CATEGORIES,
  ]) {
    assertDeepFrozen(value);
  }
});

test("contract surface carries no runtime or implementation overclaim", () => {
  const serialized = JSON.stringify(contract);

  assert.doesNotMatch(serialized, /"implementationCreated":true/);
  assert.doesNotMatch(serialized, /"providerRouteAuthorized":true/);
  assert.doesNotMatch(serialized, /"externalUseAuthorized":true/);
  assert.doesNotMatch(serialized, /"blockerClosureCreated":true/);
  assert.equal(
    typeof contract.validateRbacAdminSupportAuthorizationRequestContext,
    "function",
  );
});
