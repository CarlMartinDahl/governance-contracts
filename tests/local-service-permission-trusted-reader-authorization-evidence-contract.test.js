"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/local-service-permission-trusted-reader-authorization-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");

const {
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_IDENTITY,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_TOP_LEVEL_FIELDS,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_AUTHORIZATION_EVIDENCE_DECLARATIONS,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_VERIFICATION_POSTURES,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_VALIDATION_ERROR_CODES,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_PROHIBITED_FIELD_KEYS,
  validateLocalServicePermissionTrustedReaderAuthorizationEvidence,
} = contract;

const EXPECTED_EXPORTS = [
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_IDENTITY",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_TOP_LEVEL_FIELDS",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_OPAQUE_REFERENCE_FIELDS",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_AUTHORIZATION_EVIDENCE_DECLARATIONS",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_VERIFICATION_POSTURES",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_VALIDATION_ERROR_CODES",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_PROHIBITED_FIELD_KEYS",
  "validateLocalServicePermissionTrustedReaderAuthorizationEvidence",
];

const EXPECTED_FIELDS = [
  "contractVersion",
  "evidenceKind",
  "evidenceId",
  "actorIdentityEvidenceRef",
  "identityApplicabilityEvidenceRef",
  "authenticationEvidenceRef",
  "permissionDeclarationRef",
  "callerProcessRef",
  "serviceRecipientRef",
  "serviceOperationRef",
  "requestPurposeRef",
  "repositoryIdentityRef",
  "repositoryCurrentnessEvidenceRef",
  "readerContextRef",
  "repositoryReadRequestRef",
  "currentRequestBindingRef",
  "authorizationPolicyEvidenceRef",
  "authorizationSourceProvenanceRef",
  "authorizationEvidenceDeclaration",
  "verificationPosture",
  "humanProfessionalReviewRequired",
];

const EXPECTED_OPAQUE_FIELDS = [
  "evidenceId",
  "actorIdentityEvidenceRef",
  "identityApplicabilityEvidenceRef",
  "authenticationEvidenceRef",
  "permissionDeclarationRef",
  "callerProcessRef",
  "serviceRecipientRef",
  "serviceOperationRef",
  "requestPurposeRef",
  "repositoryIdentityRef",
  "repositoryCurrentnessEvidenceRef",
  "readerContextRef",
  "repositoryReadRequestRef",
  "currentRequestBindingRef",
  "authorizationPolicyEvidenceRef",
  "authorizationSourceProvenanceRef",
];

const EXPECTED_AUTHORIZATION_DECLARATIONS = [
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_NOT_ASSESSED",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_PRESENT",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_NOT_PRESENT",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_DISPUTED",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_CONFLICTING",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_UNAVAILABLE",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_UNKNOWN",
];

const EXPECTED_ERROR_CODES = [
  "INVALID_TYPE",
  "MISSING_FIELD",
  "UNKNOWN_FIELD",
  "PROHIBITED_FIELD",
  "INVALID_ENUM",
  "INVALID_OPAQUE_REFERENCE",
  "INVALID_BOOLEAN",
  "PROHIBITED_WILDCARD",
  "PROHIBITED_BROAD_SCOPE",
  "INVALID_CROSS_FIELD_COMBINATION",
];

const EXPECTED_TRUE_POSTURE_FIELDS = [
  "contractOnly",
  "proveOnly",
  "schemaValidatorOnly",
  "localServicePermissionTrustedReaderAuthorizationEvidenceOnly",
  "requestBoundEvidenceOnly",
  "declarationsOnly",
  "flatObjectOnly",
  "opaqueReferencesOnly",
  "wildcardsProhibited",
  "broadScopeProhibited",
  "humanProfessionalReviewRequired",
];

const EXPECTED_FALSE_POSTURE_FIELDS = [
  "identityExistenceAuthorityCreated",
  "identityOwnershipCreated",
  "identityVerificationCreated",
  "identityApplicabilityTruthCreated",
  "credentialVerificationCreated",
  "authenticationVerificationCreated",
  "authenticationSuccessCreated",
  "authenticationCreated",
  "tokenVerificationCreated",
  "sessionVerificationCreated",
  "certificateVerificationCreated",
  "signatureVerificationCreated",
  "issuerTrustRootVerificationCreated",
  "expiryTruthCreated",
  "revocationTruthCreated",
  "requestBindingTruthCreated",
  "requestBindingCreated",
  "replayProtectionCreated",
  "policyDecisionTruthCreated",
  "policyDecisionVerificationCreated",
  "roleBindingCreated",
  "permissionBindingCreated",
  "permissionGrantCreated",
  "readerAuthorizationVerificationCreated",
  "readerAuthorizationCreated",
  "readerAuthorityCreated",
  "trustedReaderStatusCreated",
  "trustedReadStatusCreated",
  "readPermissionCreated",
  "readRequestCreated",
  "repositoryReadCreated",
  "readOccurrenceCreated",
  "readSuccessCreated",
  "repositoryReadProvenanceCreated",
  "repositoryIdentityTruthCreated",
  "repositoryCurrentnessCreated",
  "sanitizedResultCreated",
  "resolverOutputCreated",
  "evaluatorDecisionCreated",
  "serviceAuthorizationCreated",
  "accessGrantCreated",
  "runtimeEnforcementCreated",
  "lookupCreated",
  "registryLookupCreated",
  "dispatchCreated",
  "routeIntegrationCreated",
  "persistenceCreated",
  "auditImplementationCreated",
  "auditEmissionCreated",
  "providerRoutingCreated",
  "externalUseAuthorized",
  "technicalSignoffCreated",
  "runtimeCertificationCreated",
  "releaseApprovalCreated",
  "blockerClosureCreated",
  "legalClinicalEvidentiaryCaseTruthAuthorityCreated",
];

const EXPECTED_PROHIBITED_FIELDS = [
  "authorized",
  "authorizationVerified",
  "authorizationSucceeded",
  "authorizationSuccess",
  "authorizationDecision",
  "authorizationDecisionVerified",
  "policyDecision",
  "policyDecisionVerified",
  "policyDecisionAllows",
  "policyAllowed",
  "policyPermits",
  "allowedByPolicy",
  "roleBound",
  "roleBindingVerified",
  "permissionBound",
  "permissionBindingVerified",
  "permissionGranted",
  "permissionGrant",
  "permissionVerified",
  "hasPermission",
  "accessGranted",
  "accessGrant",
  "readAllowed",
  "readPermissionGranted",
  "repositoryReadAllowed",
  "repositoryReadAuthorized",
  "readAuthorized",
  "serviceAuthorized",
  "serviceAuthorization",
  "serviceAuthorizationVerified",
  "readerAuthorized",
  "readerAuthority",
  "readAuthority",
  "authorityGranted",
  "trustedReader",
  "trustedReaderStatus",
  "trustedReaderCreated",
  "trustedRead",
  "trustedReadStatus",
  "trustedReadCreated",
  "trustedReadAllowed",
  "authenticated",
  "readerAuthenticated",
  "authenticationVerified",
  "authenticationSucceeded",
  "authenticationSuccess",
  "identityOwnershipVerified",
  "identityVerified",
  "verifiedIdentity",
  "credentialValid",
  "credentialVerified",
  "credential",
  "credentials",
  "password",
  "token",
  "tokenValid",
  "session",
  "sessionValid",
  "certificate",
  "certificateValid",
  "signature",
  "signatureValid",
  "issuer",
  "issuerTrusted",
  "trustAnchor",
  "expiryVerified",
  "revocationChecked",
  "revocationVerified",
  "notExpired",
  "notRevoked",
  "freshnessVerified",
  "nonce",
  "replayProtected",
  "requestBound",
  "requestBindingVerified",
  "requestBindingTrue",
  "runtimeEnforced",
  "enforcementEnabled",
  "middlewareBound",
  "routeIntegrated",
  "lookupPerformed",
  "dispatchEnabled",
  "persisted",
  "auditEmitted",
  "auditLogged",
  "auditVerified",
  "repositoryCurrent",
  "repositoryVerified",
  "currentnessVerified",
  "latestVerified",
  "current",
  "latest",
  "fresh",
  "repositoryRecord",
  "rawCurrentState",
  "rawRepositoryContent",
  "sanitizedResult",
  "resolverResult",
  "evaluatorDecision",
  "identityProviderPayload",
  "providerPayload",
  "rawIdentityAttributes",
  "rawSourceContent",
  "privateFacts",
  "caseContent",
  "sourceUrl",
  "sourcePath",
  "databaseLocator",
  "connectionString",
  "repositoryHandle",
  "legalConclusion",
  "clinicalConclusion",
  "evidentiaryConclusion",
  "caseTruthConclusion",
  "blockerClosed",
  "releaseApproved",
];

const CONTRACT_NAME =
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const EVIDENCE_KIND =
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE";
const VERIFICATION_POSTURE = "NOT_VERIFIED_BY_CONTRACT";

function validEnvelope(overrides = {}) {
  return {
    contractVersion: CONTRACT_VERSION,
    evidenceKind: EVIDENCE_KIND,
    evidenceId: "evidence:trusted-reader-authorization:001",
    actorIdentityEvidenceRef: "actor-identity-evidence:001",
    identityApplicabilityEvidenceRef: "identity-applicability:evidence:001",
    authenticationEvidenceRef: "authentication:evidence:001",
    permissionDeclarationRef: "permission-declaration:001",
    callerProcessRef: "caller-process:permission-reader:001",
    serviceRecipientRef: "service-recipient:permission-repository:001",
    serviceOperationRef: "service-operation:current-state-read",
    requestPurposeRef: "request-purpose:permission-check",
    repositoryIdentityRef: "repository:local-service-permission",
    repositoryCurrentnessEvidenceRef: "repository-currentness:evidence:001",
    readerContextRef: "reader-context:trusted-reader:001",
    repositoryReadRequestRef: "repository-read-request:001",
    currentRequestBindingRef: "current-request-binding:001",
    authorizationPolicyEvidenceRef: "authorization-policy:evidence:001",
    authorizationSourceProvenanceRef:
      "authorization-source-provenance:synthetic",
    authorizationEvidenceDeclaration:
      "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_CLAIMED_NOT_ASSESSED",
    verificationPosture: VERIFICATION_POSTURE,
    humanProfessionalReviewRequired: true,
    ...overrides,
  };
}

function errorPairs(result) {
  return result.errors.map((error) => [error.code, error.path]);
}

function assertValid(candidate) {
  assert.deepEqual(
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence(candidate),
    {
      valid: true,
      contractKind: CONTRACT_NAME,
      version: CONTRACT_VERSION,
      errors: [],
    },
  );
}

test("exports the exact public surface in the selected order", () => {
  assert.deepEqual(Object.keys(contract), EXPECTED_EXPORTS);
  assert.equal(Object.keys(contract).length, 9);
  assert.equal(
    typeof validateLocalServicePermissionTrustedReaderAuthorizationEvidence,
    "function",
  );
  assert.equal(
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence.length,
    1,
  );
});

test("aggregates the exact public surface through the governance package index", () => {
  for (const exportName of EXPECTED_EXPORTS) {
    assert.equal(packageIndex[exportName], contract[exportName]);
  }
});

test("freezes identity posture fields and declarations without creating authority", () => {
  assert.deepEqual(Object.keys(LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_IDENTITY), [
    "contractName",
    "version",
    "evidenceKind",
  ]);
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_IDENTITY,
    {
      contractName: CONTRACT_NAME,
      version: CONTRACT_VERSION,
      evidenceKind: EVIDENCE_KIND,
    },
  );
  assert.equal(
    Object.isFrozen(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_IDENTITY,
    ),
    true,
  );
  assert.deepEqual(
    Object.keys(LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE),
    [...EXPECTED_TRUE_POSTURE_FIELDS, ...EXPECTED_FALSE_POSTURE_FIELDS],
  );
  assert.equal(
    Object.keys(LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE).length,
    67,
  );
  for (const field of EXPECTED_TRUE_POSTURE_FIELDS) {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE[field],
      true,
    );
  }
  for (const field of EXPECTED_FALSE_POSTURE_FIELDS) {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE[field],
      false,
    );
  }
});

test("freezes exact top-level opaque reference enum and error declarations", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_TOP_LEVEL_FIELDS,
    EXPECTED_FIELDS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
    EXPECTED_OPAQUE_FIELDS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_AUTHORIZATION_EVIDENCE_DECLARATIONS,
    EXPECTED_AUTHORIZATION_DECLARATIONS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_VERIFICATION_POSTURES,
    [VERIFICATION_POSTURE],
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_VALIDATION_ERROR_CODES,
    EXPECTED_ERROR_CODES,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_PROHIBITED_FIELD_KEYS,
    EXPECTED_PROHIBITED_FIELDS,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_TOP_LEVEL_FIELDS.length,
    21,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_OPAQUE_REFERENCE_FIELDS.length,
    16,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_PROHIBITED_FIELD_KEYS.length,
    116,
  );
});

test("accepts one valid synthetic request-bound authorization evidence envelope", () => {
  assertValid(validEnvelope());
});

test("accepts every authorization declaration as structure only", () => {
  for (const authorizationEvidenceDeclaration of EXPECTED_AUTHORIZATION_DECLARATIONS) {
    assertValid(validEnvelope({ authorizationEvidenceDeclaration }));
  }
});

test("requires every top-level field and defines no optional field", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence({});
  assert.deepEqual(
    errorPairs(result),
    EXPECTED_FIELDS.map((field) => ["MISSING_FIELD", `$.${field}`]),
  );
});

test("rejects prohibited fields before unknown fields in deterministic lexical order", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence({
      ...validEnvelope(),
      zebraUnknown: "x",
      accessGranted: "x",
      alphaUnknown: "x",
      authorized: "x",
    });

  assert.deepEqual(errorPairs(result).slice(0, 4), [
    ["PROHIBITED_FIELD", "$.accessGranted"],
    ["PROHIBITED_FIELD", "$.authorized"],
    ["UNKNOWN_FIELD", "$.alphaUnknown"],
    ["UNKNOWN_FIELD", "$.zebraUnknown"],
  ]);
});

test("rejects invalid top-level values accessors arrays and non-plain objects", () => {
  assert.deepEqual(
    errorPairs(validateLocalServicePermissionTrustedReaderAuthorizationEvidence([])),
    [["INVALID_TYPE", "$"]],
  );
  assert.deepEqual(
    errorPairs(
      validateLocalServicePermissionTrustedReaderAuthorizationEvidence(
        new Date(0),
      ),
    ),
    [["INVALID_TYPE", "$"]],
  );

  let getterInvoked = false;
  const candidate = validEnvelope({
    actorIdentityEvidenceRef: ["not", "flat"],
    humanProfessionalReviewRequired: "true",
  });
  Object.defineProperty(candidate, "permissionDeclarationRef", {
    enumerable: true,
    get() {
      getterInvoked = true;
      throw new Error("getter must not be invoked");
    },
  });

  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence(candidate);

  assert.equal(getterInvoked, false);
  assert.deepEqual(errorPairs(result).slice(0, 3), [
    ["INVALID_TYPE", "$.actorIdentityEvidenceRef"],
    ["INVALID_TYPE", "$.permissionDeclarationRef"],
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired"],
  ]);
});

test("rejects invalid fixed literals and authorization declarations", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence(
      validEnvelope({
        contractVersion: "v2",
        evidenceKind: "OTHER",
        authorizationEvidenceDeclaration: "OTHER",
        verificationPosture: "VERIFIED",
      }),
    );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_ENUM", "$.contractVersion"],
    ["INVALID_ENUM", "$.evidenceKind"],
    ["INVALID_ENUM", "$.verificationPosture"],
    ["INVALID_ENUM", "$.authorizationEvidenceDeclaration"],
  ]);
});

test("rejects invalid opaque references wildcards broad scope and generic syntax", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence(
      validEnvelope({
        evidenceId: "*",
        actorIdentityEvidenceRef: "all",
        identityApplicabilityEvidenceRef: "ALL_READERS",
        authenticationEvidenceRef: "ALL_REQUESTS",
        repositoryReadRequestRef: "folder/name",
        currentRequestBindingRef: "request#fragment",
        authorizationPolicyEvidenceRef: "a".repeat(129),
      }),
    );

  assert.deepEqual(errorPairs(result).slice(0, 7), [
    ["PROHIBITED_WILDCARD", "$.evidenceId"],
    ["PROHIBITED_BROAD_SCOPE", "$.actorIdentityEvidenceRef"],
    ["PROHIBITED_BROAD_SCOPE", "$.identityApplicabilityEvidenceRef"],
    ["PROHIBITED_BROAD_SCOPE", "$.authenticationEvidenceRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.repositoryReadRequestRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.currentRequestBindingRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.authorizationPolicyEvidenceRef"],
  ]);
});

test("requires humanProfessionalReviewRequired to be exactly true", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence(
      validEnvelope({ humanProfessionalReviewRequired: false }),
    );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired"],
  ]);
});

test("rejects authorization success claims", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence({
      ...validEnvelope(),
      authorized: true,
      authorizationVerified: true,
      authorizationSucceeded: true,
      authorizationSuccess: true,
      authorizationDecision: true,
      authorizationDecisionVerified: true,
    });

  assert.deepEqual(errorPairs(result).slice(0, 6), [
    ["PROHIBITED_FIELD", "$.authorizationDecision"],
    ["PROHIBITED_FIELD", "$.authorizationDecisionVerified"],
    ["PROHIBITED_FIELD", "$.authorizationSucceeded"],
    ["PROHIBITED_FIELD", "$.authorizationSuccess"],
    ["PROHIBITED_FIELD", "$.authorizationVerified"],
    ["PROHIBITED_FIELD", "$.authorized"],
  ]);
});

test("rejects access grant and read permission claims", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence({
      ...validEnvelope(),
      accessGranted: true,
      accessGrant: true,
      readAllowed: true,
      readPermissionGranted: true,
      repositoryReadAllowed: true,
      repositoryReadAuthorized: true,
      readAuthorized: true,
    });

  assert.deepEqual(errorPairs(result).slice(0, 7), [
    ["PROHIBITED_FIELD", "$.accessGrant"],
    ["PROHIBITED_FIELD", "$.accessGranted"],
    ["PROHIBITED_FIELD", "$.readAllowed"],
    ["PROHIBITED_FIELD", "$.readAuthorized"],
    ["PROHIBITED_FIELD", "$.readPermissionGranted"],
    ["PROHIBITED_FIELD", "$.repositoryReadAllowed"],
    ["PROHIBITED_FIELD", "$.repositoryReadAuthorized"],
  ]);
});

test("rejects role permission and policy-decision truth claims", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence({
      ...validEnvelope(),
      roleBound: true,
      roleBindingVerified: true,
      permissionBound: true,
      permissionBindingVerified: true,
      permissionGranted: true,
      permissionGrant: true,
      permissionVerified: true,
      hasPermission: true,
      policyDecision: true,
      policyDecisionVerified: true,
      policyDecisionAllows: true,
      policyAllowed: true,
      policyPermits: true,
      allowedByPolicy: true,
    });

  assert.deepEqual(errorPairs(result).slice(0, 14), [
    ["PROHIBITED_FIELD", "$.allowedByPolicy"],
    ["PROHIBITED_FIELD", "$.hasPermission"],
    ["PROHIBITED_FIELD", "$.permissionBindingVerified"],
    ["PROHIBITED_FIELD", "$.permissionBound"],
    ["PROHIBITED_FIELD", "$.permissionGrant"],
    ["PROHIBITED_FIELD", "$.permissionGranted"],
    ["PROHIBITED_FIELD", "$.permissionVerified"],
    ["PROHIBITED_FIELD", "$.policyAllowed"],
    ["PROHIBITED_FIELD", "$.policyDecision"],
    ["PROHIBITED_FIELD", "$.policyDecisionAllows"],
    ["PROHIBITED_FIELD", "$.policyDecisionVerified"],
    ["PROHIBITED_FIELD", "$.policyPermits"],
    ["PROHIBITED_FIELD", "$.roleBindingVerified"],
    ["PROHIBITED_FIELD", "$.roleBound"],
  ]);
});

test("rejects service authorization and reader authority claims", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence({
      ...validEnvelope(),
      serviceAuthorized: true,
      serviceAuthorization: true,
      serviceAuthorizationVerified: true,
      readerAuthorized: true,
      readerAuthority: true,
      readAuthority: true,
      authorityGranted: true,
    });

  assert.deepEqual(errorPairs(result).slice(0, 7), [
    ["PROHIBITED_FIELD", "$.authorityGranted"],
    ["PROHIBITED_FIELD", "$.readAuthority"],
    ["PROHIBITED_FIELD", "$.readerAuthority"],
    ["PROHIBITED_FIELD", "$.readerAuthorized"],
    ["PROHIBITED_FIELD", "$.serviceAuthorization"],
    ["PROHIBITED_FIELD", "$.serviceAuthorizationVerified"],
    ["PROHIBITED_FIELD", "$.serviceAuthorized"],
  ]);
});

test("rejects trusted-reader and trusted-read status claims", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence({
      ...validEnvelope(),
      trustedReader: true,
      trustedReaderStatus: true,
      trustedReaderCreated: true,
      trustedRead: true,
      trustedReadStatus: true,
      trustedReadCreated: true,
      trustedReadAllowed: true,
    });

  assert.deepEqual(errorPairs(result).slice(0, 7), [
    ["PROHIBITED_FIELD", "$.trustedRead"],
    ["PROHIBITED_FIELD", "$.trustedReadAllowed"],
    ["PROHIBITED_FIELD", "$.trustedReadCreated"],
    ["PROHIBITED_FIELD", "$.trustedReadStatus"],
    ["PROHIBITED_FIELD", "$.trustedReader"],
    ["PROHIBITED_FIELD", "$.trustedReaderCreated"],
    ["PROHIBITED_FIELD", "$.trustedReaderStatus"],
  ]);
});

test("rejects authentication success and identity ownership truth claims", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence({
      ...validEnvelope(),
      authenticated: true,
      authenticationVerified: true,
      authenticationSucceeded: true,
      identityOwnershipVerified: true,
      identityVerified: true,
      credentialValid: true,
      tokenValid: true,
      sessionValid: true,
      signatureValid: true,
    });

  assert.deepEqual(errorPairs(result).slice(0, 9), [
    ["PROHIBITED_FIELD", "$.authenticated"],
    ["PROHIBITED_FIELD", "$.authenticationSucceeded"],
    ["PROHIBITED_FIELD", "$.authenticationVerified"],
    ["PROHIBITED_FIELD", "$.credentialValid"],
    ["PROHIBITED_FIELD", "$.identityOwnershipVerified"],
    ["PROHIBITED_FIELD", "$.identityVerified"],
    ["PROHIBITED_FIELD", "$.sessionValid"],
    ["PROHIBITED_FIELD", "$.signatureValid"],
    ["PROHIBITED_FIELD", "$.tokenValid"],
  ]);
});

test("rejects runtime enforcement route persistence and audit claims", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence({
      ...validEnvelope(),
      runtimeEnforced: true,
      enforcementEnabled: true,
      middlewareBound: true,
      routeIntegrated: true,
      lookupPerformed: true,
      dispatchEnabled: true,
      persisted: true,
      auditEmitted: true,
      auditLogged: true,
    });

  assert.deepEqual(errorPairs(result).slice(0, 9), [
    ["PROHIBITED_FIELD", "$.auditEmitted"],
    ["PROHIBITED_FIELD", "$.auditLogged"],
    ["PROHIBITED_FIELD", "$.dispatchEnabled"],
    ["PROHIBITED_FIELD", "$.enforcementEnabled"],
    ["PROHIBITED_FIELD", "$.lookupPerformed"],
    ["PROHIBITED_FIELD", "$.middlewareBound"],
    ["PROHIBITED_FIELD", "$.persisted"],
    ["PROHIBITED_FIELD", "$.routeIntegrated"],
    ["PROHIBITED_FIELD", "$.runtimeEnforced"],
  ]);
});

test("rejects repository currentness legal evidentiary case-truth and blocker claims", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence({
      ...validEnvelope(),
      repositoryCurrent: true,
      currentnessVerified: true,
      latestVerified: true,
      legalConclusion: true,
      clinicalConclusion: true,
      evidentiaryConclusion: true,
      caseTruthConclusion: true,
      blockerClosed: true,
      releaseApproved: true,
    });

  assert.deepEqual(errorPairs(result).slice(0, 9), [
    ["PROHIBITED_FIELD", "$.blockerClosed"],
    ["PROHIBITED_FIELD", "$.caseTruthConclusion"],
    ["PROHIBITED_FIELD", "$.clinicalConclusion"],
    ["PROHIBITED_FIELD", "$.currentnessVerified"],
    ["PROHIBITED_FIELD", "$.evidentiaryConclusion"],
    ["PROHIBITED_FIELD", "$.latestVerified"],
    ["PROHIBITED_FIELD", "$.legalConclusion"],
    ["PROHIBITED_FIELD", "$.releaseApproved"],
    ["PROHIBITED_FIELD", "$.repositoryCurrent"],
  ]);
});

test("enforces structural non-collapse rules without proving bindings", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence(
      validEnvelope({
        callerProcessRef: "same:caller-service",
        serviceRecipientRef: "same:caller-service",
        evidenceId: "same:evidence",
        actorIdentityEvidenceRef: "same:evidence",
        identityApplicabilityEvidenceRef: "same:evidence",
        authenticationEvidenceRef: "same:evidence",
        readerContextRef: "same:evidence",
        repositoryIdentityRef: "same:repo-currentness",
        repositoryCurrentnessEvidenceRef: "same:repo-currentness",
        repositoryReadRequestRef: "same:request-binding",
        currentRequestBindingRef: "same:request-binding",
        authorizationPolicyEvidenceRef: "same:authz-source",
        authorizationSourceProvenanceRef: "same:authz-source",
      }),
    );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_CROSS_FIELD_COMBINATION", "$.serviceRecipientRef"],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.actorIdentityEvidenceRef"],
    [
      "INVALID_CROSS_FIELD_COMBINATION",
      "$.identityApplicabilityEvidenceRef",
    ],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.authenticationEvidenceRef"],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.readerContextRef"],
    [
      "INVALID_CROSS_FIELD_COMBINATION",
      "$.repositoryCurrentnessEvidenceRef",
    ],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.currentRequestBindingRef"],
    [
      "INVALID_CROSS_FIELD_COMBINATION",
      "$.authorizationSourceProvenanceRef",
    ],
  ]);
});

test("gates cross-field comparisons on structurally valid participants", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence(
      validEnvelope({
        actorIdentityEvidenceRef: "same:*",
        permissionDeclarationRef: "same:*",
      }),
    );

  assert.deepEqual(errorPairs(result), [
    ["PROHIBITED_WILDCARD", "$.actorIdentityEvidenceRef"],
    ["PROHIBITED_WILDCARD", "$.permissionDeclarationRef"],
  ]);
});

test("returns deterministic no-echo deeply frozen isolated results and preserves input", () => {
  const candidate = validEnvelope();
  const before = { ...candidate };
  const first =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence(candidate);
  const second =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence(candidate);

  assert.deepEqual(candidate, before);
  assert.notEqual(first, second);
  assert.notEqual(first.errors, second.errors);
  assert.deepEqual(Object.keys(first), ["valid", "contractKind", "version", "errors"]);
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.errors), true);

  const invalid =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence({
      ...candidate,
      evidenceId: "*",
    });
  assert.deepEqual(Object.keys(invalid.errors[0]), ["code", "path"]);
  assert.equal(Object.isFrozen(invalid.errors[0]), true);
});

test("is safe for cycles and throwing accessors without recursive traversal", () => {
  const candidate = validEnvelope();
  candidate.self = candidate;
  Object.defineProperty(candidate, "providerPayload", {
    enumerable: true,
    get() {
      throw new Error("must not invoke prohibited getter");
    },
  });

  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence(candidate);

  assert.deepEqual(errorPairs(result), [
    ["PROHIBITED_FIELD", "$.providerPayload"],
    ["UNKNOWN_FIELD", "$.self"],
  ]);
});

test("creates no authorization verification access grant trusted read lookup or runtime behavior", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthorizationEvidence(
      validEnvelope(),
    );

  assert.equal(result.valid, true);
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE.readerAuthorizationCreated,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE.readerAuthorizationVerificationCreated,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE.accessGrantCreated,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE.trustedReadStatusCreated,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE.runtimeEnforcementCreated,
    false,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHORIZATION_EVIDENCE_CONTRACT_POSTURE.lookupCreated,
    false,
  );
});
