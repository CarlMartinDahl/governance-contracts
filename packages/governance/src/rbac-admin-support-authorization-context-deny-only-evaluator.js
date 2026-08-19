"use strict";

const {
  validateRbacAdminSupportAuthorizationRequestContext,
} = require("./rbac-admin-support-authorization-context-contract.js");
const {
  validateAuthenticatedActorIdentityEvidence,
} = require("./authenticated-actor-identity-evidence-contract.js");

const EVALUATOR_NAME =
  "RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR";
const EVALUATOR_VERSION = "v1";
const RESULT_KIND =
  "RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_RESULT";
const TRACE_KIND =
  "RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_SANITIZED_BLOCKER_ACTIVATION_TRACE";

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_IDENTITY =
  deepFreeze({
    evaluator: EVALUATOR_NAME,
    version: EVALUATOR_VERSION,
    resultKind: RESULT_KIND,
    traceKind: TRACE_KIND,
  });

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_STATUSES =
  deepFreeze(["INVALID_CONTEXT", "DENY", "HUMAN_REVIEW_REQUIRED"]);

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_REASON_CODES =
  deepFreeze([
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
  ]);

const RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE =
  deepFreeze({
    proveOnly: true,
    pureFunctionOnly: true,
    denyOnly: true,
    limitedExecutableHelperCreated: true,
    sanitizedNoContentTraceCreated: true,
    humanProfessionalReviewRequired: true,
    authenticationCreated: false,
    identityVerificationCreated: false,
    issuerVerificationCreated: false,
    signatureVerificationCreated: false,
    tokenVerificationCreated: false,
    certificateVerificationCreated: false,
    currentTimeVerificationCreated: false,
    expiryCheckCreated: false,
    revocationCheckCreated: false,
    currentRequestBindingVerificationCreated: false,
    policyAuthorityCreated: false,
    roleAuthorityCreated: false,
    permissionAuthorityCreated: false,
    actorRoleBindingCreated: false,
    rolePermissionBindingCreated: false,
    scopeAuthorityCreated: false,
    scopeOwnershipCreated: false,
    authorizationDecisionCreated: false,
    allowCapableDecisionCreated: false,
    accessGrantCreated: false,
    runtimeRouteIntegrated: false,
    middlewareCreated: false,
    runtimeLookupCreated: false,
    dynamicResolutionCreated: false,
    validatorDispatchCreated: false,
    persistenceCreated: false,
    auditEventEmitted: false,
    auditStorageCreated: false,
    providerRouteAuthorized: false,
    externalUseAuthorized: false,
    blockerClosureCreated: false,
    technicalSignOffCreated: false,
    runtimeCertificationCreated: false,
  });

function deepFreeze(value, active = new WeakSet()) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }
  if (active.has(value)) {
    return value;
  }

  active.add(value);
  for (const key of Object.keys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value, active);
    }
  }
  active.delete(value);
  return Object.freeze(value);
}

function makeResult(status, reasonCodes) {
  const reasons = reasonCodes.slice();
  const traceReasons = reasonCodes.slice();
  return deepFreeze({
    evaluator: EVALUATOR_NAME,
    version: EVALUATOR_VERSION,
    resultKind: RESULT_KIND,
    status,
    reasonCodes: reasons,
    blockerTrace: {
      traceKind: TRACE_KIND,
      version: EVALUATOR_VERSION,
      status,
      reasonCodes: traceReasons,
      noContent: true,
      runtimeRouteActivated: false,
      auditEventEmitted: false,
      persisted: false,
      authorizationGranted: false,
      accessGranted: false,
      providerRouteAuthorized: false,
      externalUseAuthorized: false,
      blockerClosureCreated: false,
      humanProfessionalReviewRequired: true,
    },
  });
}

function readWrapper(input) {
  try {
    if (!input || typeof input !== "object" || Array.isArray(input)) {
      return null;
    }
    if (Object.getPrototypeOf(input) !== Object.prototype) {
      return null;
    }

    const keys = Object.keys(input);
    if (
      keys.length !== 2 ||
      !keys.includes("actorIdentityEvidence") ||
      !keys.includes("requestContext")
    ) {
      return null;
    }

    const actorDescriptor = Object.getOwnPropertyDescriptor(
      input,
      "actorIdentityEvidence",
    );
    const requestDescriptor = Object.getOwnPropertyDescriptor(input, "requestContext");
    if (!isDataDescriptor(actorDescriptor) || !isDataDescriptor(requestDescriptor)) {
      return null;
    }

    return {
      actorIdentityEvidence: actorDescriptor.value,
      requestContext: requestDescriptor.value,
    };
  } catch (_error) {
    return null;
  }
}

function isDataDescriptor(descriptor) {
  return Boolean(
    descriptor &&
      descriptor.enumerable === true &&
      Object.prototype.hasOwnProperty.call(descriptor, "value"),
  );
}

function validateWith(validator, value) {
  try {
    const result = validator(value);
    return Boolean(result && result.valid === true);
  } catch (_error) {
    return false;
  }
}

function readOwnDataValue(value, key) {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!isDataDescriptor(descriptor)) {
      return { ok: false, value: undefined };
    }
    return { ok: true, value: descriptor.value };
  } catch (_error) {
    return { ok: false, value: undefined };
  }
}

function evaluateRbacAdminSupportAuthorizationContext(input) {
  const wrapper = readWrapper(input);
  if (!wrapper) {
    return makeResult("INVALID_CONTEXT", ["EVALUATOR_INPUT_INVALID"]);
  }

  const identityValid = validateWith(
    validateAuthenticatedActorIdentityEvidence,
    wrapper.actorIdentityEvidence,
  );
  const requestValid = validateWith(
    validateRbacAdminSupportAuthorizationRequestContext,
    wrapper.requestContext,
  );

  if (!identityValid || !requestValid) {
    const reasons = [];
    if (!identityValid) {
      reasons.push("ACTOR_IDENTITY_EVIDENCE_INVALID");
    }
    if (!requestValid) {
      reasons.push("REQUEST_CONTEXT_INVALID");
    }
    return makeResult("INVALID_CONTEXT", reasons);
  }

  const identityActorId = readOwnDataValue(wrapper.actorIdentityEvidence, "actorId");
  const requestActorId = readOwnDataValue(wrapper.requestContext, "actorId");
  const identityActorType = readOwnDataValue(
    wrapper.actorIdentityEvidence,
    "actorType",
  );
  const requestActorType = readOwnDataValue(wrapper.requestContext, "actorType");

  if (
    !identityActorId.ok ||
    !requestActorId.ok ||
    !identityActorType.ok ||
    !requestActorType.ok
  ) {
    return makeResult("INVALID_CONTEXT", ["EVALUATOR_INPUT_INVALID"]);
  }

  const mismatchReasons = [];
  if (identityActorId.value !== requestActorId.value) {
    mismatchReasons.push("ACTOR_ID_MISMATCH");
  }
  if (identityActorType.value !== requestActorType.value) {
    mismatchReasons.push("ACTOR_TYPE_MISMATCH");
  }

  if (mismatchReasons.length > 0) {
    return makeResult("DENY", mismatchReasons);
  }

  return makeResult("HUMAN_REVIEW_REQUIRED", [
    "AUTHENTICATION_NOT_VERIFIED",
    "CURRENT_REQUEST_BINDING_NOT_VERIFIED",
    "POLICY_AUTHORITY_NOT_EVIDENCED",
    "BINDING_AUTHORITY_NOT_EVIDENCED",
    "SCOPE_AUTHORITY_NOT_EVIDENCED",
    "HUMAN_REVIEW_STATE_NOT_EVIDENCED",
  ]);
}

module.exports = {
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_IDENTITY,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_POSTURE,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_REASON_CODES,
  RBAC_ADMIN_SUPPORT_AUTHORIZATION_CONTEXT_DENY_ONLY_EVALUATOR_STATUSES,
  evaluateRbacAdminSupportAuthorizationContext,
};
