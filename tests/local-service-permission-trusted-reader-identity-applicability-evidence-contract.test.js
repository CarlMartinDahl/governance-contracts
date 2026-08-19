"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/local-service-permission-trusted-reader-identity-applicability-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");

const {
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_IDENTITY,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_POSTURE,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_TOP_LEVEL_FIELDS,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_APPLICABILITY_DECLARATIONS,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_VERIFICATION_POSTURES,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_VALIDATION_ERROR_CODES,
  LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_PROHIBITED_FIELD_KEYS,
  validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence,
} = contract;

const EXPECTED_EXPORTS = [
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_IDENTITY",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_POSTURE",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_TOP_LEVEL_FIELDS",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_OPAQUE_REFERENCE_FIELDS",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_APPLICABILITY_DECLARATIONS",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_VERIFICATION_POSTURES",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_VALIDATION_ERROR_CODES",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_PROHIBITED_FIELD_KEYS",
  "validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence",
];

const EXPECTED_FIELDS = [
  "contractVersion",
  "evidenceKind",
  "evidenceId",
  "actorIdentityEvidenceRef",
  "permissionDeclarationRef",
  "callerProcessRef",
  "serviceRecipientRef",
  "serviceOperationRef",
  "requestPurposeRef",
  "repositoryIdentityRef",
  "repositoryCurrentnessEvidenceRef",
  "readerContextRef",
  "readOnlyOperationCategoryRef",
  "sourceProvenanceRef",
  "identityApplicabilityDeclaration",
  "verificationPosture",
  "humanProfessionalReviewRequired",
];

const EXPECTED_OPAQUE_FIELDS = [
  "evidenceId",
  "actorIdentityEvidenceRef",
  "permissionDeclarationRef",
  "callerProcessRef",
  "serviceRecipientRef",
  "serviceOperationRef",
  "requestPurposeRef",
  "repositoryIdentityRef",
  "repositoryCurrentnessEvidenceRef",
  "readerContextRef",
  "readOnlyOperationCategoryRef",
  "sourceProvenanceRef",
];

const EXPECTED_APPLICABILITY_DECLARATIONS = [
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_CLAIMED_NOT_ASSESSED",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_CLAIMED_APPLICABLE",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_CLAIMED_NOT_APPLICABLE",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_CLAIMED_DISPUTED",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_CLAIMED_CONFLICTING",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_CLAIMED_UNAVAILABLE",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_CLAIMED_UNKNOWN",
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
  "localServicePermissionTrustedReaderIdentityApplicabilityEvidenceOnly",
  "declarationsOnly",
  "flatObjectOnly",
  "opaqueReferencesOnly",
  "wildcardsProhibited",
  "broadScopeProhibited",
  "humanProfessionalReviewRequired",
];

const EXPECTED_FALSE_POSTURE_FIELDS = [
  "identityExistenceAuthorityCreated",
  "identityVerificationCreated",
  "credentialVerificationCreated",
  "authenticationCreated",
  "tokenVerificationCreated",
  "sessionVerificationCreated",
  "certificateVerificationCreated",
  "signatureVerificationCreated",
  "issuerTrustRootVerificationCreated",
  "roleBindingCreated",
  "permissionBindingCreated",
  "readerCategoryTruthCreated",
  "applicabilityTruthCreated",
  "readerAuthorizationCreated",
  "repositoryIdentityTruthCreated",
  "repositoryCurrentnessCreated",
  "requestBindingCreated",
  "replayProtectionCreated",
  "readRequestCreated",
  "repositoryReadCreated",
  "readOccurrenceCreated",
  "readSuccessCreated",
  "repositoryReadProvenanceCreated",
  "trustedReadStatusCreated",
  "sanitizedResultCreated",
  "resolverOutputCreated",
  "evaluatorDecisionCreated",
  "serviceAuthorizationCreated",
  "accessGrantCreated",
  "humanRbacCreated",
  "domainAuthorizationCreated",
  "adminSupportBypassCreated",
  "serviceSystemSelfAuthorizationCreated",
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

const EXPECTED_PROHIBITED_FIELDS = [
  "identityVerified",
  "verifiedIdentity",
  "authenticated",
  "readerAuthenticated",
  "credential",
  "password",
  "token",
  "session",
  "certificate",
  "signature",
  "issuer",
  "trustAnchor",
  "revocationVerified",
  "freshnessVerified",
  "nonce",
  "replayProtected",
  "role",
  "roles",
  "permission",
  "permissions",
  "roleAssigned",
  "permissionGranted",
  "allow",
  "allowed",
  "deny",
  "denied",
  "authorize",
  "authorized",
  "authorization",
  "readerAuthorized",
  "accessGrant",
  "accessGranted",
  "effectiveGrant",
  "repositoryVerified",
  "repositoryCurrent",
  "current",
  "latest",
  "fresh",
  "trusted",
  "requestBound",
  "readRequest",
  "readAllowed",
  "readPerformed",
  "readSucceeded",
  "repositoryRecord",
  "rawCurrentState",
  "fullHistory",
  "rawRepositoryContent",
  "trustedRead",
  "trustedReadPerformed",
  "sanitizedResult",
  "resolverResult",
  "evaluatorDecision",
  "serviceAuthorization",
  "runtimeEnforced",
  "route",
  "middleware",
  "registry",
  "lookup",
  "dispatch",
  "persisted",
  "auditVerified",
  "name",
  "email",
  "phone",
  "personalIdentifier",
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
  "tenantMembership",
  "caseMembership",
  "resourcePlacement",
  "domainAuthorization",
  "inherited",
  "portableGrant",
  "fallbackAuthorization",
  "adminBypass",
];

const CONTRACT_NAME =
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT";
const CONTRACT_VERSION = "v1";
const EVIDENCE_KIND =
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE";
const VERIFICATION_POSTURE = "NOT_VERIFIED_BY_CONTRACT";

function validEnvelope(overrides = {}) {
  return {
    contractVersion: CONTRACT_VERSION,
    evidenceKind: EVIDENCE_KIND,
    evidenceId: "evidence:trusted-reader-applicability:001",
    actorIdentityEvidenceRef: "actor-identity-evidence:001",
    permissionDeclarationRef: "permission-declaration:001",
    callerProcessRef: "caller-process:permission-reader:001",
    serviceRecipientRef: "service-recipient:permission-repository:001",
    serviceOperationRef: "service-operation:current-state-read",
    requestPurposeRef: "request-purpose:permission-check",
    repositoryIdentityRef: "repository:local-service-permission",
    repositoryCurrentnessEvidenceRef: "repository-currentness:evidence:001",
    readerContextRef: "reader-context:trusted-reader:001",
    readOnlyOperationCategoryRef: "read-only-operation:current-state",
    sourceProvenanceRef: "source-provenance:synthetic-governance",
    identityApplicabilityDeclaration:
      "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_CLAIMED_NOT_ASSESSED",
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
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      candidate,
    ),
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
    typeof validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence,
    "function",
  );
  assert.equal(
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence
      .length,
    1,
  );
});

test("aggregates the exact public surface through the governance package index", () => {
  for (const exportName of EXPECTED_EXPORTS) {
    assert.equal(packageIndex[exportName], contract[exportName]);
  }
});

test("freezes the exact identity and posture without creating authority", () => {
  assert.deepEqual(Object.keys(LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_IDENTITY), [
    "contractName",
    "version",
    "evidenceKind",
  ]);
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_IDENTITY,
    {
      contractName: CONTRACT_NAME,
      version: CONTRACT_VERSION,
      evidenceKind: EVIDENCE_KIND,
    },
  );
  assert.equal(
    Object.isFrozen(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_IDENTITY,
    ),
    true,
  );
  assert.deepEqual(
    Object.keys(LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_POSTURE),
    [...EXPECTED_TRUE_POSTURE_FIELDS, ...EXPECTED_FALSE_POSTURE_FIELDS],
  );
  assert.equal(
    Object.keys(LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_POSTURE).length,
    57,
  );
  for (const field of EXPECTED_TRUE_POSTURE_FIELDS) {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_POSTURE[field],
      true,
    );
  }
  for (const field of EXPECTED_FALSE_POSTURE_FIELDS) {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_POSTURE[field],
      false,
    );
  }
});

test("freezes the exact top-level and opaque-reference field order", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_TOP_LEVEL_FIELDS,
    EXPECTED_FIELDS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
    EXPECTED_OPAQUE_FIELDS,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_TOP_LEVEL_FIELDS.length,
    17,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_OPAQUE_REFERENCE_FIELDS.length,
    12,
  );
  assert.equal(
    Object.isFrozen(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_TOP_LEVEL_FIELDS,
    ),
    true,
  );
});

test("freezes applicability verification error and prohibited-key declarations", () => {
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_APPLICABILITY_DECLARATIONS,
    EXPECTED_APPLICABILITY_DECLARATIONS,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_VERIFICATION_POSTURES,
    [VERIFICATION_POSTURE],
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_VALIDATION_ERROR_CODES,
    EXPECTED_ERROR_CODES,
  );
  assert.deepEqual(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_PROHIBITED_FIELD_KEYS,
    EXPECTED_PROHIBITED_FIELDS,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_APPLICABILITY_DECLARATIONS.length,
    7,
  );
  assert.equal(
    LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_PROHIBITED_FIELD_KEYS.length,
    85,
  );
});

test("accepts one valid synthetic identity-applicability evidence envelope", () => {
  assertValid(validEnvelope());
});

test("accepts every applicability declaration without implying truth or authority", () => {
  for (const identityApplicabilityDeclaration of EXPECTED_APPLICABILITY_DECLARATIONS) {
    assertValid(validEnvelope({ identityApplicabilityDeclaration }));
  }
});

test("requires every top-level field and defines no optional field", () => {
  const result = validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence({});
  assert.deepEqual(
    errorPairs(result),
    EXPECTED_FIELDS.map((field) => ["MISSING_FIELD", `$.${field}`]),
  );
});

test("rejects prohibited fields before unknown fields in deterministic lexical order", () => {
  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence({
      ...validEnvelope(),
      zebraUnknown: "x",
      allow: "x",
      alphaUnknown: "x",
      token: "x",
    });

  assert.deepEqual(errorPairs(result).slice(0, 4), [
    ["PROHIBITED_FIELD", "$.allow"],
    ["PROHIBITED_FIELD", "$.token"],
    ["UNKNOWN_FIELD", "$.alphaUnknown"],
    ["UNKNOWN_FIELD", "$.zebraUnknown"],
  ]);
});

test("rejects unknown fields in deterministic lexical order", () => {
  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence({
      ...validEnvelope(),
      zeta: "x",
      alpha: "x",
    });

  assert.deepEqual(errorPairs(result).slice(0, 2), [
    ["UNKNOWN_FIELD", "$.alpha"],
    ["UNKNOWN_FIELD", "$.zeta"],
  ]);
});

test("rejects invalid top-level values arrays and non-plain objects", () => {
  assert.deepEqual(
    errorPairs(
      validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
        [],
      ),
    ),
    [["INVALID_TYPE", "$"]],
  );
  assert.deepEqual(
    errorPairs(
      validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
        new Date(0),
      ),
    ),
    [["INVALID_TYPE", "$"]],
  );
});

test("rejects accessors nested collections and invalid primitive values without invoking getters", () => {
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
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      candidate,
    );

  assert.equal(getterInvoked, false);
  assert.deepEqual(errorPairs(result).slice(0, 3), [
    ["INVALID_TYPE", "$.actorIdentityEvidenceRef"],
    ["INVALID_TYPE", "$.permissionDeclarationRef"],
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired"],
  ]);
});

test("rejects invalid fixed literals and applicability declarations", () => {
  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      validEnvelope({
        contractVersion: "v2",
        evidenceKind: "OTHER",
        identityApplicabilityDeclaration: "OTHER",
        verificationPosture: "VERIFIED",
      }),
    );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_ENUM", "$.contractVersion"],
    ["INVALID_ENUM", "$.evidenceKind"],
    ["INVALID_ENUM", "$.verificationPosture"],
    ["INVALID_ENUM", "$.identityApplicabilityDeclaration"],
  ]);
});

test("rejects invalid opaque references URLs paths dot values and overlength values", () => {
  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      validEnvelope({
        evidenceId: "https://example.invalid/id",
        actorIdentityEvidenceRef: "folder/name",
        permissionDeclarationRef: ".",
        callerProcessRef: "..",
        serviceRecipientRef: "a".repeat(129),
      }),
    );

  assert.deepEqual(errorPairs(result).slice(0, 5), [
    ["INVALID_OPAQUE_REFERENCE", "$.evidenceId"],
    ["INVALID_OPAQUE_REFERENCE", "$.actorIdentityEvidenceRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.permissionDeclarationRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.callerProcessRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.serviceRecipientRef"],
  ]);
});

test("applies wildcard broad-scope and generic-syntax precedence", () => {
  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      validEnvelope({
        evidenceId: "*",
        actorIdentityEvidenceRef: "all",
        permissionDeclarationRef: "ALL_READERS",
        callerProcessRef: "caller#fragment",
      }),
    );

  assert.deepEqual(errorPairs(result).slice(0, 4), [
    ["PROHIBITED_WILDCARD", "$.evidenceId"],
    ["PROHIBITED_BROAD_SCOPE", "$.actorIdentityEvidenceRef"],
    ["PROHIBITED_BROAD_SCOPE", "$.permissionDeclarationRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.callerProcessRef"],
  ]);
});

test("requires humanProfessionalReviewRequired to be exactly true", () => {
  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      validEnvelope({ humanProfessionalReviewRequired: false }),
    );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired"],
  ]);
});

test("enforces the six direct cross-field non-collapse rules at exact paths", () => {
  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      validEnvelope({
        callerProcessRef: "same:caller-service",
        serviceRecipientRef: "same:caller-service",
        evidenceId: "same:evidence-actor-reader-source",
        actorIdentityEvidenceRef: "same:evidence-actor-reader-source",
        readerContextRef: "same:evidence-actor-reader-source",
        repositoryIdentityRef: "same:repository-currentness",
        repositoryCurrentnessEvidenceRef: "same:repository-currentness",
        sourceProvenanceRef: "same:evidence-actor-reader-source",
      }),
    );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_CROSS_FIELD_COMBINATION", "$.serviceRecipientRef"],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.actorIdentityEvidenceRef"],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.readerContextRef"],
    [
      "INVALID_CROSS_FIELD_COMBINATION",
      "$.repositoryCurrentnessEvidenceRef",
    ],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.sourceProvenanceRef"],
  ]);
});

test("enforces all fifteen relation-context non-collapse comparisons at exact relation paths", () => {
  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      validEnvelope({
        actorIdentityEvidenceRef: "same:actor",
        repositoryIdentityRef: "same:repo",
        repositoryCurrentnessEvidenceRef: "same:currentness",
        permissionDeclarationRef: "same:actor",
        callerProcessRef: "same:repo",
        serviceRecipientRef: "same:currentness",
        serviceOperationRef: "same:actor",
        requestPurposeRef: "same:repo",
      }),
    );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_CROSS_FIELD_COMBINATION", "$.permissionDeclarationRef"],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.callerProcessRef"],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.serviceRecipientRef"],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.serviceOperationRef"],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.requestPurposeRef"],
  ]);

  let atomicCount = 0;
  for (const relationField of [
    "permissionDeclarationRef",
    "callerProcessRef",
    "serviceRecipientRef",
    "serviceOperationRef",
    "requestPurposeRef",
  ]) {
    for (const contextValue of ["same:actor", "same:repo", "same:currentness"]) {
      const candidate = validEnvelope({ [relationField]: contextValue });
      if (contextValue === "same:actor") {
        candidate.actorIdentityEvidenceRef = contextValue;
      } else if (contextValue === "same:repo") {
        candidate.repositoryIdentityRef = contextValue;
      } else {
        candidate.repositoryCurrentnessEvidenceRef = contextValue;
      }
      atomicCount += errorPairs(
        validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
          candidate,
        ),
      ).filter(
        ([code, path]) =>
          code === "INVALID_CROSS_FIELD_COMBINATION" &&
          path === `$.${relationField}`,
      ).length;
    }
  }
  assert.equal(atomicCount, 15);
});

test("gates cross-field comparisons on structurally valid participants", () => {
  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
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

test("suppresses duplicate identical code-path pairs", () => {
  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      validEnvelope({
        evidenceId: "same:all-three",
        actorIdentityEvidenceRef: "same:all-three",
        readerContextRef: "same:all-three",
      }),
    );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_CROSS_FIELD_COMBINATION", "$.actorIdentityEvidenceRef"],
    ["INVALID_CROSS_FIELD_COMBINATION", "$.readerContextRef"],
  ]);
});

test("aggregates errors deterministically and independently of insertion order", () => {
  const first =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence({
      ...validEnvelope(),
      zeta: "x",
      alpha: "x",
      token: "x",
      allow: "x",
    });
  const second =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence({
      ...validEnvelope(),
      allow: "x",
      alpha: "x",
      token: "x",
      zeta: "x",
    });

  assert.deepEqual(errorPairs(first), errorPairs(second));
});

test("returns exact no-echo deeply frozen isolated results and preserves input", () => {
  const candidate = validEnvelope();
  const before = { ...candidate };
  const first =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      candidate,
    );
  const second =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      candidate,
    );

  assert.deepEqual(candidate, before);
  assert.notEqual(first, second);
  assert.notEqual(first.errors, second.errors);
  assert.deepEqual(Object.keys(first), ["valid", "contractKind", "version", "errors"]);
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.errors), true);

  const invalid =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence({
      ...candidate,
      evidenceId: "*",
    });
  assert.deepEqual(Object.keys(invalid.errors[0]), ["code", "path"]);
  assert.equal(Object.isFrozen(invalid.errors[0]), true);
});

test("is safe for cycles and throwing accessors without recursive traversal", () => {
  const candidate = validEnvelope();
  candidate.self = candidate;
  Object.defineProperty(candidate, "rawSourceContent", {
    enumerable: true,
    get() {
      throw new Error("must not invoke prohibited getter");
    },
  });

  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      candidate,
    );

  assert.deepEqual(errorPairs(result), [
    ["PROHIBITED_FIELD", "$.rawSourceContent"],
    ["UNKNOWN_FIELD", "$.self"],
  ]);
});

test("creates no identity verification authentication authorization read access lookup or runtime behavior", () => {
  const result =
    validateLocalServicePermissionTrustedReaderIdentityApplicabilityEvidence(
      validEnvelope(),
    );

  for (const field of [
    "identityVerificationCreated",
    "authenticationCreated",
    "readerAuthorizationCreated",
    "readRequestCreated",
    "repositoryReadCreated",
    "trustedReadStatusCreated",
    "accessGrantCreated",
    "runtimeEnforcementCreated",
    "lookupCreated",
    "registryLookupCreated",
    "routeIntegrationCreated",
    "persistenceCreated",
  ]) {
    assert.equal(
      LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_APPLICABILITY_EVIDENCE_CONTRACT_POSTURE[field],
      false,
    );
    assert.equal(Object.prototype.hasOwnProperty.call(result, field), false);
  }
});
