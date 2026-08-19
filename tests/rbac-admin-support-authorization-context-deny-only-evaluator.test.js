"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const candidate = require("../packages/governance/src/rbac-admin-support-authorization-context-deny-only-evaluator.js");
const packageIndex = require("../packages/governance/src/index.js");
const pr67 = require("../packages/governance/src/rbac-admin-support-authorization-context-contract.js");
const pr68 = require("../packages/governance/src/authenticated-actor-identity-evidence-contract.js");

const {
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_IDENTITY,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_REASON_CODES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_STATUSES,
  evaluateRbacAdminSupportAuthorizationContext,
} = candidate;

const ALL_REASON_CODES = [
  "EVALUATOR_INPUT_INVALID",
  "ACTOR_IDENTITY_EVIDENCE_INVALID",
  "REQUEST_CONTEXT_INVALID",
  "ACTOR_ID_MISMATCH",
  "ACTOR_TYPE_MISMATCH",
  "AUTHENTICATION_NOT_VERIFIED",
  "CURRENT_REQUEST_BINDING_NOT_VERIFIED",
  "POLICY_AUTHORITY_NOT_EVIDENCED",
  "BINDING_AUTHORITY_NOT_EVIDENCED",
  "SCOPE_AUTHORITY_NOT_EVIDENCED",
  "HUMAN_REVIEW_STATE_NOT_EVIDENCED",
];

function baseIdentity(overrides = {}) {
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

function baseRequest(overrides = {}) {
  return {
    version: "v1",
    requestId: "request:synthetic-001",
    actorType: "HUMAN_REVIEWER",
    actorId: "actor:synthetic-001",
    actionCategory: "READ_SANITIZED_REVIEW_DATA",
    scopeContext: {
      tenantId: "tenant:synthetic",
      caseId: "case:synthetic",
      objectId: "object:synthetic",
      functionId: "function:synthetic",
      propertyId: "property:synthetic",
    },
    materialBoundary: "SYNTHETIC_SANITIZED_NO_RAW_ONLY",
    humanReviewDependency: "REQUIRED_NOT_GRANTED",
    providerRouteIntent: false,
    externalUseIntent: false,
    sourceEvidenceClassification: "STATIC_DECLARATION_ONLY",
    contextReasonCodes: ["DEFAULT_DENY"],
    ...overrides,
  };
}

function evaluate(overrides = {}) {
  return evaluateRbacAdminSupportAuthorizationContext({
    actorIdentityEvidence: baseIdentity(overrides.identity),
    requestContext: baseRequest(overrides.request),
  });
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

function assertExactKeys(value, keys) {
  assert.deepEqual(Object.keys(value), keys);
}

function assertInvalid(result, reasonCodes) {
  assert.equal(result.status, "INVALID_CONTEXT");
  assert.deepEqual(result.reasonCodes, reasonCodes);
}

test("exact evaluator identity, version, result kind, and posture metadata are exported", () => {
  assert.deepEqual(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_IDENTITY,
    {
      evaluator: "RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR",
      version: "v1",
      resultKind: "RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_RESULT",
      traceKind:
        "RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SANITIZED_BLOCKER_ACTIVATION_TRACE",
    },
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE.proveOnly,
    true,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE.pureFunctionOnly,
    true,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE.denyOnly,
    true,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE.limitedExecutableHelperCreated,
    true,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE.sanitizedNoContentTraceCreated,
    true,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE.authenticationCreated,
    false,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE.authorizationDecisionCreated,
    false,
  );
});

test("status declaration is exact and contains no positive authorization status", () => {
  assert.deepEqual(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_STATUSES,
    ["INVALID_CONTEXT", "DENY", "HUMAN_REVIEW_REQUIRED"],
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_STATUSES.some(
      (status) => /ALLOW|APPROVE|AUTHORIZED|GRANT|ACCESS_GRANTED/i.test(status),
    ),
    false,
  );
});

test("reason-code declaration is exact and excludes wrong-scope conclusions", () => {
  assert.deepEqual(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_REASON_CODES,
    ALL_REASON_CODES,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_REASON_CODES.some(
      (code) => /WRONG_TENANT|WRONG_CASE|SCOPE_AUTHORIZED|TOKEN_EXPIRED|REVOKED/i.test(code),
    ),
    false,
  );
});

test("public surface contains exactly one function with arity one", () => {
  const publicFunctions = Object.entries(candidate)
    .filter(([, value]) => typeof value === "function")
    .map(([name]) => name);

  assert.deepEqual(publicFunctions, [
    "evaluateRbacAdminSupportAuthorizationContext",
  ]);
  assert.equal(evaluateRbacAdminSupportAuthorizationContext.length, 1);
});

test("package-index exports match the evaluator module exports", () => {
  assert.equal(
    packageIndex.evaluateRbacAdminSupportAuthorizationContext,
    evaluateRbacAdminSupportAuthorizationContext,
  );
  assert.equal(
    packageIndex.RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_STATUSES,
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_STATUSES,
  );
});

test("actual PR67 and PR68 validators are imported and original contracts do not import evaluator", () => {
  assert.equal(
    typeof pr67.validateRbacAdminSupportAuthorizationRequestContext,
    "function",
  );
  assert.equal(pr67.validateRbacAdminSupportAuthorizationRequestContext.length, 1);
  assert.equal(typeof pr68.validateAuthenticatedActorIdentityEvidence, "function");
  assert.equal(pr68.validateAuthenticatedActorIdentityEvidence.length, 1);
  assert.equal(
    Object.hasOwn(pr67, "evaluateRbacAdminSupportAuthorizationContext"),
    false,
  );
  assert.equal(
    Object.hasOwn(pr68, "evaluateRbacAdminSupportAuthorizationContext"),
    false,
  );
});

test("invalid wrapper null array missing fields and unknown fields fail closed", () => {
  assertInvalid(evaluateRbacAdminSupportAuthorizationContext(null), [
    "EVALUATOR_INPUT_INVALID",
  ]);
  assertInvalid(evaluateRbacAdminSupportAuthorizationContext([]), [
    "EVALUATOR_INPUT_INVALID",
  ]);
  assertInvalid(
    evaluateRbacAdminSupportAuthorizationContext({
      actorIdentityEvidence: baseIdentity(),
    }),
    ["EVALUATOR_INPUT_INVALID"],
  );
  assertInvalid(
    evaluateRbacAdminSupportAuthorizationContext({
      actorIdentityEvidence: baseIdentity(),
      requestContext: baseRequest(),
      extra: "synthetic",
    }),
    ["EVALUATOR_INPUT_INVALID"],
  );
});

test("wrapper accessors and throwing Proxy failures fail closed without leakage", () => {
  let getterCalled = false;
  const accessorWrapper = {};
  Object.defineProperty(accessorWrapper, "actorIdentityEvidence", {
    enumerable: true,
    get() {
      getterCalled = true;
      return baseIdentity();
    },
  });
  Object.defineProperty(accessorWrapper, "requestContext", {
    enumerable: true,
    value: baseRequest(),
  });

  assertInvalid(evaluateRbacAdminSupportAuthorizationContext(accessorWrapper), [
    "EVALUATOR_INPUT_INVALID",
  ]);
  assert.equal(getterCalled, false);

  const proxy = new Proxy(
    {
      actorIdentityEvidence: baseIdentity(),
      requestContext: baseRequest(),
    },
    {
      ownKeys() {
        throw new Error("synthetic trap leak");
      },
    },
  );
  const result = evaluateRbacAdminSupportAuthorizationContext(proxy);
  assertInvalid(result, ["EVALUATOR_INPUT_INVALID"]);
  assert.doesNotMatch(JSON.stringify(result), /synthetic trap leak/);
});

test("invalid actor identity evidence maps to INVALID_CONTEXT without nested error echo", () => {
  const result = evaluateRbacAdminSupportAuthorizationContext({
    actorIdentityEvidence: baseIdentity({ token: "token:synthetic" }),
    requestContext: baseRequest(),
  });

  assertInvalid(result, ["ACTOR_IDENTITY_EVIDENCE_INVALID"]);
  assert.doesNotMatch(JSON.stringify(result), /token:synthetic|PROHIBITED_FIELD/);
});

test("invalid request context maps to INVALID_CONTEXT without nested error echo", () => {
  const result = evaluateRbacAdminSupportAuthorizationContext({
    actorIdentityEvidence: baseIdentity(),
    requestContext: baseRequest({ role: "ADMIN" }),
  });

  assertInvalid(result, ["REQUEST_CONTEXT_INVALID"]);
  assert.doesNotMatch(JSON.stringify(result), /role|PROHIBITED_FIELD/);
});

test("both nested inputs invalid preserve deterministic nested-invalid reason order", () => {
  const result = evaluateRbacAdminSupportAuthorizationContext({
    actorIdentityEvidence: baseIdentity({ rawSource: "synthetic raw" }),
    requestContext: baseRequest({ grants: ["synthetic grant"] }),
  });

  assertInvalid(result, [
    "ACTOR_IDENTITY_EVIDENCE_INVALID",
    "REQUEST_CONTEXT_INVALID",
  ]);
});

test("valid inputs with actorId mismatch map to DENY only", () => {
  const result = evaluate({ identity: { actorId: "actor:synthetic-002" } });

  assert.equal(result.status, "DENY");
  assert.deepEqual(result.reasonCodes, ["ACTOR_ID_MISMATCH"]);
});

test("valid inputs with actorType mismatch map to DENY only", () => {
  const result = evaluate({ identity: { actorType: "ADMIN" } });

  assert.equal(result.status, "DENY");
  assert.deepEqual(result.reasonCodes, ["ACTOR_TYPE_MISMATCH"]);
});

test("simultaneous actorId and actorType mismatch preserves fixed reason order", () => {
  const result = evaluate({
    identity: { actorId: "actor:synthetic-002", actorType: "SUPPORT" },
  });

  assert.equal(result.status, "DENY");
  assert.deepEqual(result.reasonCodes, [
    "ACTOR_ID_MISMATCH",
    "ACTOR_TYPE_MISMATCH",
  ]);
});

test("valid mutually consistent inputs map to HUMAN_REVIEW_REQUIRED with exact reasons", () => {
  const result = evaluate();

  assert.equal(result.status, "HUMAN_REVIEW_REQUIRED");
  assert.deepEqual(result.reasonCodes, [
    "AUTHENTICATION_NOT_VERIFIED",
    "CURRENT_REQUEST_BINDING_NOT_VERIFIED",
    "POLICY_AUTHORITY_NOT_EVIDENCED",
    "BINDING_AUTHORITY_NOT_EVIDENCED",
    "SCOPE_AUTHORITY_NOT_EVIDENCED",
    "HUMAN_REVIEW_STATE_NOT_EVIDENCED",
  ]);
});

test("scope authority remains not evidenced and wrong-scope conclusions are absent", () => {
  const result = evaluate({
    request: {
      scopeContext: {
        tenantId: "tenant:synthetic",
        caseId: "case:synthetic",
        objectId: "object:synthetic",
        functionId: "function:synthetic",
        propertyId: "property:synthetic",
      },
    },
  });
  const serialized = JSON.stringify(result);

  assert.equal(result.reasonCodes.includes("SCOPE_AUTHORITY_NOT_EVIDENCED"), true);
  assert.doesNotMatch(serialized, /WRONG_TENANT|WRONG_CASE|TENANT_AUTHORIZED|CASE_AUTHORIZED/);
});

test("sanitized blockerTrace has exact shape no identifiers content or runtime flags", () => {
  const result = evaluate();
  assertExactKeys(result.blockerTrace, [
    "traceKind",
    "version",
    "status",
    "reasonCodes",
    "noContent",
    "runtimeRouteActivated",
    "auditEventEmitted",
    "persisted",
    "authorizationGranted",
    "accessGranted",
    "providerRouteAuthorized",
    "externalUseAuthorized",
    "blockerClosureCreated",
    "humanProfessionalReviewRequired",
  ]);
  assert.equal(
    result.blockerTrace.traceKind,
    "RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SANITIZED_BLOCKER_ACTIVATION_TRACE",
  );
  assert.equal(result.blockerTrace.noContent, true);
  assert.equal(result.blockerTrace.runtimeRouteActivated, false);
  assert.equal(result.blockerTrace.auditEventEmitted, false);
  assert.equal(result.blockerTrace.persisted, false);
  assert.equal(result.blockerTrace.authorizationGranted, false);
  assert.equal(result.blockerTrace.accessGranted, false);
  assert.equal(result.blockerTrace.providerRouteAuthorized, false);
  assert.equal(result.blockerTrace.externalUseAuthorized, false);
  assert.equal(result.blockerTrace.blockerClosureCreated, false);
  assert.equal(result.blockerTrace.humanProfessionalReviewRequired, true);
  assert.doesNotMatch(
    JSON.stringify(result),
    /actor:synthetic|tenant:synthetic|case:synthetic|issuer:synthetic|request-binding:synthetic/,
  );
});

test("results are frozen isolated deterministic non-mutating and non-operational", () => {
  const input = {
    actorIdentityEvidence: baseIdentity(),
    requestContext: baseRequest(),
  };
  const before = JSON.stringify(input);
  const first = evaluateRbacAdminSupportAuthorizationContext(input);
  const second = evaluateRbacAdminSupportAuthorizationContext({
    actorIdentityEvidence: baseIdentity(),
    requestContext: baseRequest(),
  });

  assert.deepEqual(first, second);
  assert.notEqual(first, second);
  assert.notEqual(first.reasonCodes, second.reasonCodes);
  assert.notEqual(first.blockerTrace, second.blockerTrace);
  assert.notEqual(first.blockerTrace.reasonCodes, second.blockerTrace.reasonCodes);
  assertDeepFrozen(first);
  assert.equal(JSON.stringify(input), before);
  assert.equal(Object.isFrozen(input), false);
  assert.equal(Object.isFrozen(input.actorIdentityEvidence), false);
  assert.equal(Object.isFrozen(input.requestContext), false);
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE.runtimeLookupCreated,
    false,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE.validatorDispatchCreated,
    false,
  );
  assert.equal(
    RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE.externalUseAuthorized,
    false,
  );
});
