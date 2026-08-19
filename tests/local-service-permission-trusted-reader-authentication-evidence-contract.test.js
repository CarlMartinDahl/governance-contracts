"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/local-service-permission-trusted-reader-authentication-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");

const {
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_IDENTITY,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_POSTURE,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_TOP_LEVEL_FIELDS,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_AUTHENTICATION_EVIDENCE_DECLARATIONS,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_VERIFICATION_POSTURES,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_VALIDATION_ERROR_CODES,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_PROHIBITED_FIELD_KEYS,
  validateLocalServicePermissionTrustedReaderAuthenticationEvidence,
} = contract;

const EXPECTED_EXPORTS = [
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_IDENTITY",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_POSTURE",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_TOP_LEVEL_FIELDS",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_OPAQUE_REFERENCE_FIELDS",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_AUTHENTICATION_EVIDENCE_DECLARATIONS",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_VERIFICATION_POSTURES",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_VALIDATION_ERROR_CODES",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_PROHIBITED_FIELD_KEYS",
  "validateLocalServicePermissionTrustedReaderAuthenticationEvidence",
];

const EXPECTED_FIELDS = [
  "contractVersion",
  "evidenceKind",
  "evidenceId",
  "actorIdentityEvidenceRef",
  "identityApplicabilityEvidenceRef",
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
  "authenticationMechanismEvidenceRef",
  "authenticationSourceProvenanceRef",
  "authenticationEvidenceDeclaration",
  "verificationPosture",
  "humanProfessionalReviewRequired",
];

const EXPECTED_OPAQUE_FIELDS = [
  "evidenceId",
  "actorIdentityEvidenceRef",
  "identityApplicabilityEvidenceRef",
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
  "authenticationMechanismEvidenceRef",
  "authenticationSourceProvenanceRef",
];

const EXPECTED_AUTHENTICATION_DECLARATIONS = [
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_CLAIMED_NOT_ASSESSED",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_CLAIMED_PRESENT",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_CLAIMED_NOT_PRESENT",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_CLAIMED_DISPUTED",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_CLAIMED_CONFLICTING",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_CLAIMED_UNAVAILABLE",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_CLAIMED_UNKNOWN",
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
  "localServicePermissionTrustedReaderAuthenticationEvidenceOnly",
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
  "roleBindingCreated",
  "permissionBindingCreated",
  "readerAuthorizationCreated",
  "readerAuthorityCreated",
  "trustedReaderStatusCreated",
  "trustedReadStatusCreated",
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
  "providerRoutingCreated",
  "externalUseAuthorized",
  "technicalSignoffCreated",
  "runtimeCertificationCreated",
  "releaseApprovalCreated",
  "blockerClosureCreated",
  "legalClinicalEvidentiaryCaseTruthAuthorityCreated",
];

const CONTRACT_NAME =
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const EVIDENCE_KIND =
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE";
const VERIFICATION_POSTURE = "NOT_VERIFIED_BY_CONTRACT";

function validEnvelope(overrides = {}) {
  return {
    contractVersion: CONTRACT_VERSION,
    evidenceKind: EVIDENCE_KIND,
    evidenceId: "evidence:trusted-reader-authentication:001",
    actorIdentityEvidenceRef: "actor-identity-evidence:001",
    identityApplicabilityEvidenceRef: "identity-applicability:evidence:001",
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
    authenticationMechanismEvidenceRef: "authentication-mechanism:evidence:001",
    authenticationSourceProvenanceRef:
      "authentication-source-provenance:synthetic",
    authenticationEvidenceDeclaration:
      "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_CLAIMED_NOT_ASSESSED",
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
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence(candidate),
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
    typeof validateLocalServicePermissionTrustedReaderAuthenticationEvidence,
    "function",
  );
  assert.equal(
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence.length,
    1,
  );
});

test("aggregates the exact public surface through the governance package index", () => {
  for (const exportName of EXPECTED_EXPORTS) {
    assert.equal(packageIndex[exportName], contract[exportName]);
  }
});

test("freezes identity posture fields and declarations without creating authority", () => {
  assert.deepEqual(Object.keys(LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_IDENTITY), [
    "contractName",
    "version",
    "evidenceKind",
  ]);
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_IDENTITY,
    {
      contractName: CONTRACT_NAME,
      version: CONTRACT_VERSION,
      evidenceKind: EVIDENCE_KIND,
    },
  );
  assert.equal(
    Object.isFrozen(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_IDENTITY,
    ),
    true,
  );
  assert.deepEqual(
    Object.keys(LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_POSTURE),
    [...EXPECTED_TRUE_POSTURE_FIELDS, ...EXPECTED_FALSE_POSTURE_FIELDS],
  );
  assert.equal(
    Object.keys(LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_POSTURE).length,
    61,
  );
  for (const field of EXPECTED_TRUE_POSTURE_FIELDS) {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_POSTURE[field],
      true,
    );
  }
  for (const field of EXPECTED_FALSE_POSTURE_FIELDS) {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_POSTURE[field],
      false,
    );
  }
});

test("freezes exact top-level opaque reference enum and error declarations", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_TOP_LEVEL_FIELDS,
    EXPECTED_FIELDS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
    EXPECTED_OPAQUE_FIELDS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_AUTHENTICATION_EVIDENCE_DECLARATIONS,
    EXPECTED_AUTHENTICATION_DECLARATIONS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_VERIFICATION_POSTURES,
    [VERIFICATION_POSTURE],
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_VALIDATION_ERROR_CODES,
    EXPECTED_ERROR_CODES,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_TOP_LEVEL_FIELDS.length,
    20,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_OPAQUE_REFERENCE_FIELDS.length,
    15,
  );
});

test("accepts one valid synthetic request-bound authentication evidence envelope", () => {
  assertValid(validEnvelope());
});

test("accepts every authentication declaration as structure only", () => {
  for (const authenticationEvidenceDeclaration of EXPECTED_AUTHENTICATION_DECLARATIONS) {
    assertValid(validEnvelope({ authenticationEvidenceDeclaration }));
  }
});

test("requires every top-level field and defines no optional field", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence({});
  assert.deepEqual(
    errorPairs(result),
    EXPECTED_FIELDS.map((field) => ["MISSING_FIELD", `$.${field}`]),
  );
});

test("rejects prohibited fields before unknown fields in deterministic lexical order", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence({
      ...validEnvelope(),
      zebraUnknown: "x",
      accessGranted: "x",
      alphaUnknown: "x",
      authenticated: "x",
    });

  assert.deepEqual(errorPairs(result).slice(0, 4), [
    ["PROHIBITED_FIELD", "$.accessGranted"],
    ["PROHIBITED_FIELD", "$.authenticated"],
    ["UNKNOWN_FIELD", "$.alphaUnknown"],
    ["UNKNOWN_FIELD", "$.zebraUnknown"],
  ]);
});

test("rejects invalid top-level values accessors arrays and non-plain objects", () => {
  assert.deepEqual(
    errorPairs(validateLocalServicePermissionTrustedReaderAuthenticationEvidence([])),
    [["INVALID_TYPE", "$"]],
  );
  assert.deepEqual(
    errorPairs(
      validateLocalServicePermissionTrustedReaderAuthenticationEvidence(
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
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence(candidate);

  assert.equal(getterInvoked, false);
  assert.deepEqual(errorPairs(result).slice(0, 3), [
    ["INVALID_TYPE", "$.actorIdentityEvidenceRef"],
    ["INVALID_TYPE", "$.permissionDeclarationRef"],
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired"],
  ]);
});

test("rejects invalid fixed literals and authentication declarations", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence(
      validEnvelope({
        contractVersion: "v2",
        evidenceKind: "OTHER",
        authenticationEvidenceDeclaration: "OTHER",
        verificationPosture: "VERIFIED",
      }),
    );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_ENUM", "$.contractVersion"],
    ["INVALID_ENUM", "$.evidenceKind"],
    ["INVALID_ENUM", "$.verificationPosture"],
    ["INVALID_ENUM", "$.authenticationEvidenceDeclaration"],
  ]);
});

test("rejects invalid opaque references wildcards broad scope and generic syntax", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence(
      validEnvelope({
        evidenceId: "*",
        actorIdentityEvidenceRef: "all",
        identityApplicabilityEvidenceRef: "ALL_READERS",
        repositoryReadRequestRef: "folder/name",
        currentRequestBindingRef: "request#fragment",
        authenticationMechanismEvidenceRef: "a".repeat(129),
      }),
    );

  assert.deepEqual(errorPairs(result).slice(0, 6), [
    ["PROHIBITED_WILDCARD", "$.evidenceId"],
    ["PROHIBITED_BROAD_SCOPE", "$.actorIdentityEvidenceRef"],
    ["PROHIBITED_BROAD_SCOPE", "$.identityApplicabilityEvidenceRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.repositoryReadRequestRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.currentRequestBindingRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.authenticationMechanismEvidenceRef"],
  ]);
});

test("requires humanProfessionalReviewRequired to be exactly true", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence(
      validEnvelope({ humanProfessionalReviewRequired: false }),
    );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired"],
  ]);
});

test("rejects authentication success credential session token and signature truth claims", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence({
      ...validEnvelope(),
      authenticated: true,
      authenticationSucceeded: true,
      credentialValid: true,
      sessionValid: true,
      tokenValid: true,
      signatureValid: true,
    });

  assert.deepEqual(errorPairs(result).slice(0, 6), [
    ["PROHIBITED_FIELD", "$.authenticated"],
    ["PROHIBITED_FIELD", "$.authenticationSucceeded"],
    ["PROHIBITED_FIELD", "$.credentialValid"],
    ["PROHIBITED_FIELD", "$.sessionValid"],
    ["PROHIBITED_FIELD", "$.signatureValid"],
    ["PROHIBITED_FIELD", "$.tokenValid"],
  ]);
});

test("rejects issuer expiry revocation and request-binding truth claims", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence({
      ...validEnvelope(),
      issuerTrusted: true,
      expiryVerified: true,
      notExpired: true,
      revocationChecked: true,
      notRevoked: true,
      requestBindingVerified: true,
      requestBindingTrue: true,
    });

  assert.deepEqual(errorPairs(result).slice(0, 7), [
    ["PROHIBITED_FIELD", "$.expiryVerified"],
    ["PROHIBITED_FIELD", "$.issuerTrusted"],
    ["PROHIBITED_FIELD", "$.notExpired"],
    ["PROHIBITED_FIELD", "$.notRevoked"],
    ["PROHIBITED_FIELD", "$.requestBindingTrue"],
    ["PROHIBITED_FIELD", "$.requestBindingVerified"],
    ["PROHIBITED_FIELD", "$.revocationChecked"],
  ]);
});

test("rejects authorization access trusted-read reader-authority runtime and legal truth claims", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence({
      ...validEnvelope(),
      authorized: true,
      accessGranted: true,
      trustedReaderStatus: true,
      trustedReadStatus: true,
      readerAuthority: true,
      runtimeEnforced: true,
      routeIntegrated: true,
      persisted: true,
      auditEmitted: true,
      repositoryCurrent: true,
      legalConclusion: true,
      evidentiaryConclusion: true,
      caseTruthConclusion: true,
      blockerClosed: true,
      releaseApproved: true,
    });

  assert.deepEqual(errorPairs(result).slice(0, 15), [
    ["PROHIBITED_FIELD", "$.accessGranted"],
    ["PROHIBITED_FIELD", "$.auditEmitted"],
    ["PROHIBITED_FIELD", "$.authorized"],
    ["PROHIBITED_FIELD", "$.blockerClosed"],
    ["PROHIBITED_FIELD", "$.caseTruthConclusion"],
    ["PROHIBITED_FIELD", "$.evidentiaryConclusion"],
    ["PROHIBITED_FIELD", "$.legalConclusion"],
    ["PROHIBITED_FIELD", "$.persisted"],
    ["PROHIBITED_FIELD", "$.readerAuthority"],
    ["PROHIBITED_FIELD", "$.releaseApproved"],
    ["PROHIBITED_FIELD", "$.repositoryCurrent"],
    ["PROHIBITED_FIELD", "$.routeIntegrated"],
    ["PROHIBITED_FIELD", "$.runtimeEnforced"],
    ["PROHIBITED_FIELD", "$.trustedReadStatus"],
    ["PROHIBITED_FIELD", "$.trustedReaderStatus"],
  ]);
});

test("enforces structural non-collapse rules without proving bindings", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence(
      validEnvelope({
        callerProcessRef: "same:caller-service",
        serviceRecipientRef: "same:caller-service",
        evidenceId: "same:evidence",
        actorIdentityEvidenceRef: "same:evidence",
        identityApplicabilityEvidenceRef: "same:evidence",
        readerContextRef: "same:evidence",
        repositoryIdentityRef: "same:repo-currentness",
        repositoryCurrentnessEvidenceRef: "same:repo-currentness",
        repositoryReadRequestRef: "same:request-binding",
        currentRequestBindingRef: "same:request-binding",
        authenticationMechanismEvidenceRef: "same:auth-source",
        authenticationSourceProvenanceRef: "same:auth-source",
      }),
    );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_CROSS_FIELD_COMBINATION", "$.serviceRecipientRef"],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.actorIdentityEvidenceRef"],
    [
      "INVALID_CROSS_FIELD_COMBINATION",
      "$.identityApplicabilityEvidenceRef",
    ],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.readerContextRef"],
    [
      "INVALID_CROSS_FIELD_COMBINATION",
      "$.repositoryCurrentnessEvidenceRef",
    ],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.currentRequestBindingRef"],
    [
      "INVALID_CROSS_FIELD_COMBINATION",
      "$.authenticationSourceProvenanceRef",
    ],
  ]);
});

test("gates cross-field comparisons on structurally valid participants", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence(
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
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence(candidate);
  const second =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence(candidate);

  assert.deepEqual(candidate, before);
  assert.notEqual(first, second);
  assert.notEqual(first.errors, second.errors);
  assert.deepEqual(Object.keys(first), ["valid", "contractKind", "version", "errors"]);
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.errors), true);

  const invalid =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence({
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
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence(candidate);

  assert.deepEqual(errorPairs(result), [
    ["PROHIBITED_FIELD", "$.providerPayload"],
    ["UNKNOWN_FIELD", "$.self"],
  ]);
});

test("creates no authentication verification authorization reader authority read access lookup or runtime behavior", () => {
  const result =
    validateLocalServicePermissionTrustedReaderAuthenticationEvidence(
      validEnvelope(),
    );

  for (const field of [
    "authenticationVerificationCreated",
    "authenticationSuccessCreated",
    "credentialVerificationCreated",
    "tokenVerificationCreated",
    "sessionVerificationCreated",
    "signatureVerificationCreated",
    "issuerTrustRootVerificationCreated",
    "expiryTruthCreated",
    "revocationTruthCreated",
    "requestBindingTruthCreated",
    "readerAuthorizationCreated",
    "readerAuthorityCreated",
    "trustedReaderStatusCreated",
    "trustedReadStatusCreated",
    "repositoryReadCreated",
    "repositoryCurrentnessCreated",
    "accessGrantCreated",
    "runtimeEnforcementCreated",
    "lookupCreated",
    "registryLookupCreated",
    "routeIntegrationCreated",
    "persistenceCreated",
    "blockerClosureCreated",
  ]) {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_AUTHENTICATION_EVIDENCE_CONTRACT_POSTURE[field],
      false,
    );
    assert.equal(Object.prototype.hasOwnProperty.call(result, field), false);
  }
});
