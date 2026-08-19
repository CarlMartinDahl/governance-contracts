"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/api-contract-schema-validator.js");
const packageIndex = require("../packages/governance/src/index.js");

const {
  API_CONTRACT_SCHEMA_VALIDATOR_IDENTITY,
  API_CONTRACT_SCHEMA_VALIDATOR_POSTURE,
  API_CONTRACT_SCHEMA_VALIDATOR_TOP_LEVEL_FIELDS,
  API_CONTRACT_SCHEMA_VALIDATOR_SCHEMA_SHAPE_FIELDS,
  API_CONTRACT_SCHEMA_VALIDATOR_REQUEST_RESPONSE_SHAPE_FIELDS,
  API_CONTRACT_SCHEMA_VALIDATOR_PROHIBITED_FIELD_KEYS,
  API_CONTRACT_SCHEMA_VALIDATOR_VALIDATION_ERROR_CODES,
  validateApiContractSchema,
} = contract;

const EXPECTED_EXPORTS = [
  "API_CONTRACT_SCHEMA_VALIDATOR_IDENTITY",
  "API_CONTRACT_SCHEMA_VALIDATOR_POSTURE",
  "API_CONTRACT_SCHEMA_VALIDATOR_TOP_LEVEL_FIELDS",
  "API_CONTRACT_SCHEMA_VALIDATOR_SCHEMA_SHAPE_FIELDS",
  "API_CONTRACT_SCHEMA_VALIDATOR_REQUEST_RESPONSE_SHAPE_FIELDS",
  "API_CONTRACT_SCHEMA_VALIDATOR_PROHIBITED_FIELD_KEYS",
  "API_CONTRACT_SCHEMA_VALIDATOR_VALIDATION_ERROR_CODES",
  "validateApiContractSchema",
];

const EXPECTED_FIELDS = [
  "contractVersion",
  "contractKind",
  "apiContractSchemaRef",
  "requestSchemaShapeRef",
  "responseSchemaShapeRef",
  "schemaVersionRef",
  "requestShapeDeclaration",
  "responseShapeDeclaration",
  "evidenceRef",
  "verificationPosture",
  "humanProfessionalReviewRequired",
];

const EXPECTED_SCHEMA_SHAPE_FIELDS = [
  "apiContractSchemaRef",
  "requestSchemaShapeRef",
  "responseSchemaShapeRef",
  "schemaVersionRef",
  "evidenceRef",
];

const EXPECTED_REQUEST_RESPONSE_SHAPE_FIELDS = [
  "requestShapeDeclaration",
  "responseShapeDeclaration",
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
];

const EXPECTED_TRUE_POSTURE_FIELDS = [
  "contractOnly",
  "proveOnly",
  "schemaValidatorOnly",
  "apiContractSchemaValidationOnly",
  "structuralSchemaOnly",
  "requestResponseShapeOnly",
  "flatObjectOnly",
  "opaqueReferencesOnly",
  "wildcardsProhibited",
  "broadScopeProhibited",
  "humanProfessionalReviewRequired",
];

const EXPECTED_FALSE_POSTURE_FIELDS = [
  "runtimeEnforcementCreated",
  "routeIntegrationCreated",
  "middlewareIntegrationCreated",
  "deployedApiAvailabilityCreated",
  "apiAvailabilityCreated",
  "endpointAvailabilityCreated",
  "apiCorrectnessCreated",
  "requestTruthCreated",
  "responseTruthCreated",
  "businessRuleTruthCreated",
  "contractTruthCreated",
  "repositoryCurrentnessTruthCreated",
  "releaseReadinessCreated",
  "technicalSignoffCreated",
  "blockerClosureCreated",
  "securityProofCreated",
  "authenticationProofCreated",
  "authorizationProofCreated",
  "accessProofCreated",
  "deploymentProofCreated",
  "legalClinicalEvidentiaryCaseTruthAuthorityCreated",
];

const EXPECTED_PROHIBITED_FIELDS = [
  "runtimeEnforced",
  "routeIntegrated",
  "middlewareBound",
  "endpointAvailable",
  "apiAvailable",
  "deployed",
  "deploymentVerified",
  "serverRunning",
  "apiCorrect",
  "requestVerified",
  "responseVerified",
  "responseTruth",
  "businessRuleVerified",
  "contractTruthVerified",
  "repositoryCurrent",
  "currentnessVerified",
  "latestVerified",
  "releaseReady",
  "releaseApproved",
  "technicalSignoff",
  "technicalSignOff",
  "blockerClosed",
  "authorized",
  "accessGranted",
  "securityVerified",
  "authenticationVerified",
  "authorizationVerified",
  "route",
  "middleware",
  "lookup",
  "dispatch",
  "persisted",
  "auditEmitted",
  "auditVerified",
  "requestTruth",
  "requestSucceeded",
  "responseSucceeded",
  "businessRuleSatisfied",
  "contractTruth",
  "repositoryVerified",
  "current",
  "latest",
  "fresh",
  "securityProof",
  "authenticationSucceeded",
  "authorizationSucceeded",
  "accessGrant",
  "legalConclusion",
  "clinicalConclusion",
  "evidentiaryConclusion",
  "caseTruthConclusion",
];

const CONTRACT_NAME = "API_CONTRACT_SCHEMA_VALIDATOR_BOUNDARY";
const CONTRACT_VERSION = "v1";
const CONTRACT_KIND = "API_CONTRACT_SCHEMA_VALIDATION_BOUNDARY";
const VERIFICATION_POSTURE = "NOT_VERIFIED_BY_CONTRACT";

function validEnvelope(overrides = {}) {
  return {
    contractVersion: CONTRACT_VERSION,
    contractKind: CONTRACT_KIND,
    apiContractSchemaRef: "api-contract-schema:local-governance:001",
    requestSchemaShapeRef: "request-schema-shape:structural:001",
    responseSchemaShapeRef: "response-schema-shape:structural:001",
    schemaVersionRef: "schema-version:v1",
    requestShapeDeclaration:
      "API_CONTRACT_REQUEST_SHAPE_DECLARED_STRUCTURAL_ONLY",
    responseShapeDeclaration:
      "API_CONTRACT_RESPONSE_SHAPE_DECLARED_STRUCTURAL_ONLY",
    evidenceRef: "api-contract-schema-validation:evidence:001",
    verificationPosture: VERIFICATION_POSTURE,
    humanProfessionalReviewRequired: true,
    ...overrides,
  };
}

function errorPairs(result) {
  return result.errors.map((error) => [error.code, error.path]);
}

function assertValid(candidate) {
  assert.deepEqual(validateApiContractSchema(candidate), {
    valid: true,
    contractKind: CONTRACT_NAME,
    version: CONTRACT_VERSION,
    errors: [],
  });
}

test("exports the exact public surface in the selected order", () => {
  assert.deepEqual(Object.keys(contract), EXPECTED_EXPORTS);
  assert.equal(Object.keys(contract).length, 8);
  assert.equal(typeof validateApiContractSchema, "function");
  assert.equal(validateApiContractSchema.length, 1);
});

test("aggregates the exact public surface through the governance package index", () => {
  for (const exportName of EXPECTED_EXPORTS) {
    assert.equal(packageIndex[exportName], contract[exportName]);
  }
});

test("freezes identity and posture without creating runtime authority", () => {
  assert.deepEqual(Object.keys(API_CONTRACT_SCHEMA_VALIDATOR_IDENTITY), [
    "contractName",
    "version",
    "contractKind",
  ]);
  assert.deepEqual(API_CONTRACT_SCHEMA_VALIDATOR_IDENTITY, {
    contractName: CONTRACT_NAME,
    version: CONTRACT_VERSION,
    contractKind: CONTRACT_KIND,
  });
  assert.equal(Object.isFrozen(API_CONTRACT_SCHEMA_VALIDATOR_IDENTITY), true);
  assert.deepEqual(Object.keys(API_CONTRACT_SCHEMA_VALIDATOR_POSTURE), [
    ...EXPECTED_TRUE_POSTURE_FIELDS,
    ...EXPECTED_FALSE_POSTURE_FIELDS,
  ]);
  for (const field of EXPECTED_TRUE_POSTURE_FIELDS) {
    assert.equal(API_CONTRACT_SCHEMA_VALIDATOR_POSTURE[field], true);
  }
  for (const field of EXPECTED_FALSE_POSTURE_FIELDS) {
    assert.equal(API_CONTRACT_SCHEMA_VALIDATOR_POSTURE[field], false);
  }
});

test("freezes top-level field order and structural shape declarations", () => {
  assert.deepEqual(
    API_CONTRACT_SCHEMA_VALIDATOR_TOP_LEVEL_FIELDS,
    EXPECTED_FIELDS,
  );
  assert.deepEqual(
    API_CONTRACT_SCHEMA_VALIDATOR_SCHEMA_SHAPE_FIELDS,
    EXPECTED_SCHEMA_SHAPE_FIELDS,
  );
  assert.deepEqual(
    API_CONTRACT_SCHEMA_VALIDATOR_REQUEST_RESPONSE_SHAPE_FIELDS,
    EXPECTED_REQUEST_RESPONSE_SHAPE_FIELDS,
  );
  assert.equal(
    Object.isFrozen(API_CONTRACT_SCHEMA_VALIDATOR_TOP_LEVEL_FIELDS),
    true,
  );
});

test("freezes error and prohibited-field declarations", () => {
  assert.deepEqual(
    API_CONTRACT_SCHEMA_VALIDATOR_VALIDATION_ERROR_CODES,
    EXPECTED_ERROR_CODES,
  );
  assert.deepEqual(
    API_CONTRACT_SCHEMA_VALIDATOR_PROHIBITED_FIELD_KEYS,
    EXPECTED_PROHIBITED_FIELDS,
  );
});

test("accepts one valid minimal structural API contract schema envelope", () => {
  assertValid(validEnvelope());
});

test("accepts opaque-only request and response shape declarations", () => {
  assertValid(
    validEnvelope({
      requestShapeDeclaration:
        "API_CONTRACT_REQUEST_SHAPE_DECLARED_OPAQUE_REFERENCE_ONLY",
      responseShapeDeclaration:
        "API_CONTRACT_RESPONSE_SHAPE_DECLARED_OPAQUE_REFERENCE_ONLY",
    }),
  );
});

test("requires every top-level field and defines no optional field", () => {
  const result = validateApiContractSchema({});
  assert.deepEqual(
    errorPairs(result),
    EXPECTED_FIELDS.map((field) => ["MISSING_FIELD", `$.${field}`]),
  );
});

test("rejects unknown fields after prohibited fields in deterministic lexical order", () => {
  const result = validateApiContractSchema({
    ...validEnvelope(),
    zebraUnknown: "x",
    apiCorrect: "x",
    alphaUnknown: "x",
    runtimeEnforced: "x",
  });

  assert.deepEqual(errorPairs(result).slice(0, 4), [
    ["PROHIBITED_FIELD", "$.apiCorrect"],
    ["PROHIBITED_FIELD", "$.runtimeEnforced"],
    ["UNKNOWN_FIELD", "$.alphaUnknown"],
    ["UNKNOWN_FIELD", "$.zebraUnknown"],
  ]);
});

test("rejects invalid top-level values accessors arrays and non-plain objects", () => {
  assert.deepEqual(errorPairs(validateApiContractSchema([])), [
    ["INVALID_TYPE", "$"],
  ]);
  assert.deepEqual(errorPairs(validateApiContractSchema(new Date(0))), [
    ["INVALID_TYPE", "$"],
  ]);

  let getterInvoked = false;
  const candidate = validEnvelope({
    apiContractSchemaRef: ["not", "flat"],
    humanProfessionalReviewRequired: "true",
  });
  Object.defineProperty(candidate, "requestSchemaShapeRef", {
    enumerable: true,
    get() {
      getterInvoked = true;
      throw new Error("getter must not be invoked");
    },
  });

  const result = validateApiContractSchema(candidate);

  assert.equal(getterInvoked, false);
  assert.deepEqual(errorPairs(result).slice(0, 3), [
    ["INVALID_TYPE", "$.apiContractSchemaRef"],
    ["INVALID_TYPE", "$.requestSchemaShapeRef"],
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired"],
  ]);
});

test("rejects invalid fixed literals and request response declarations", () => {
  const result = validateApiContractSchema(
    validEnvelope({
      contractVersion: "v2",
      contractKind: "OTHER",
      requestShapeDeclaration: "REQUEST_VERIFIED",
      responseShapeDeclaration: "RESPONSE_VERIFIED",
      verificationPosture: "VERIFIED",
    }),
  );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_ENUM", "$.contractVersion"],
    ["INVALID_ENUM", "$.contractKind"],
    ["INVALID_ENUM", "$.verificationPosture"],
    ["INVALID_ENUM", "$.requestShapeDeclaration"],
    ["INVALID_ENUM", "$.responseShapeDeclaration"],
  ]);
});

test("rejects invalid opaque references wildcards broad scope and generic syntax", () => {
  const result = validateApiContractSchema(
    validEnvelope({
      apiContractSchemaRef: "*",
      requestSchemaShapeRef: "all",
      responseSchemaShapeRef: "ALL_APIS",
      schemaVersionRef: "schema/v1",
      evidenceRef: "a".repeat(129),
    }),
  );

  assert.deepEqual(errorPairs(result).slice(0, 5), [
    ["PROHIBITED_WILDCARD", "$.apiContractSchemaRef"],
    ["PROHIBITED_BROAD_SCOPE", "$.requestSchemaShapeRef"],
    ["PROHIBITED_BROAD_SCOPE", "$.responseSchemaShapeRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.schemaVersionRef"],
    ["INVALID_OPAQUE_REFERENCE", "$.evidenceRef"],
  ]);
});

test("requires humanProfessionalReviewRequired to be exactly true", () => {
  const result = validateApiContractSchema(
    validEnvelope({ humanProfessionalReviewRequired: false }),
  );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired"],
  ]);
});

test("rejects runtime deployment route middleware persistence audit and enforcement claims", () => {
  const result = validateApiContractSchema({
    ...validEnvelope(),
    runtimeEnforced: true,
    routeIntegrated: true,
    middlewareBound: true,
    endpointAvailable: true,
    apiAvailable: true,
    deployed: true,
    deploymentVerified: true,
    serverRunning: true,
    persisted: true,
    auditEmitted: true,
  });

  assert.deepEqual(errorPairs(result).slice(0, 10), [
    ["PROHIBITED_FIELD", "$.apiAvailable"],
    ["PROHIBITED_FIELD", "$.auditEmitted"],
    ["PROHIBITED_FIELD", "$.deployed"],
    ["PROHIBITED_FIELD", "$.deploymentVerified"],
    ["PROHIBITED_FIELD", "$.endpointAvailable"],
    ["PROHIBITED_FIELD", "$.middlewareBound"],
    ["PROHIBITED_FIELD", "$.persisted"],
    ["PROHIBITED_FIELD", "$.routeIntegrated"],
    ["PROHIBITED_FIELD", "$.runtimeEnforced"],
    ["PROHIBITED_FIELD", "$.serverRunning"],
  ]);
});

test("rejects correctness request response and business truth claims", () => {
  const result = validateApiContractSchema({
    ...validEnvelope(),
    apiCorrect: true,
    requestVerified: true,
    requestTruth: true,
    responseVerified: true,
    responseTruth: true,
    businessRuleVerified: true,
    businessRuleSatisfied: true,
    contractTruthVerified: true,
    contractTruth: true,
  });

  assert.deepEqual(errorPairs(result).slice(0, 9), [
    ["PROHIBITED_FIELD", "$.apiCorrect"],
    ["PROHIBITED_FIELD", "$.businessRuleSatisfied"],
    ["PROHIBITED_FIELD", "$.businessRuleVerified"],
    ["PROHIBITED_FIELD", "$.contractTruth"],
    ["PROHIBITED_FIELD", "$.contractTruthVerified"],
    ["PROHIBITED_FIELD", "$.requestTruth"],
    ["PROHIBITED_FIELD", "$.requestVerified"],
    ["PROHIBITED_FIELD", "$.responseTruth"],
    ["PROHIBITED_FIELD", "$.responseVerified"],
  ]);
});

test("rejects repository currentness release sign-off and blocker claims", () => {
  const result = validateApiContractSchema({
    ...validEnvelope(),
    repositoryCurrent: true,
    currentnessVerified: true,
    latestVerified: true,
    releaseReady: true,
    releaseApproved: true,
    technicalSignoff: true,
    technicalSignOff: true,
    blockerClosed: true,
  });

  assert.deepEqual(errorPairs(result).slice(0, 8), [
    ["PROHIBITED_FIELD", "$.blockerClosed"],
    ["PROHIBITED_FIELD", "$.currentnessVerified"],
    ["PROHIBITED_FIELD", "$.latestVerified"],
    ["PROHIBITED_FIELD", "$.releaseApproved"],
    ["PROHIBITED_FIELD", "$.releaseReady"],
    ["PROHIBITED_FIELD", "$.repositoryCurrent"],
    ["PROHIBITED_FIELD", "$.technicalSignOff"],
    ["PROHIBITED_FIELD", "$.technicalSignoff"],
  ]);
});

test("rejects security authentication authorization and access claims", () => {
  const result = validateApiContractSchema({
    ...validEnvelope(),
    authorized: true,
    accessGranted: true,
    securityVerified: true,
    authenticationVerified: true,
    authorizationVerified: true,
    authenticationSucceeded: true,
    authorizationSucceeded: true,
    accessGrant: true,
  });

  assert.deepEqual(errorPairs(result).slice(0, 8), [
    ["PROHIBITED_FIELD", "$.accessGrant"],
    ["PROHIBITED_FIELD", "$.accessGranted"],
    ["PROHIBITED_FIELD", "$.authenticationSucceeded"],
    ["PROHIBITED_FIELD", "$.authenticationVerified"],
    ["PROHIBITED_FIELD", "$.authorizationSucceeded"],
    ["PROHIBITED_FIELD", "$.authorizationVerified"],
    ["PROHIBITED_FIELD", "$.authorized"],
    ["PROHIBITED_FIELD", "$.securityVerified"],
  ]);
});

test("rejects legal clinical evidentiary and case-truth conclusion claims", () => {
  const result = validateApiContractSchema({
    ...validEnvelope(),
    legalConclusion: true,
    clinicalConclusion: true,
    evidentiaryConclusion: true,
    caseTruthConclusion: true,
  });

  assert.deepEqual(errorPairs(result).slice(0, 4), [
    ["PROHIBITED_FIELD", "$.caseTruthConclusion"],
    ["PROHIBITED_FIELD", "$.clinicalConclusion"],
    ["PROHIBITED_FIELD", "$.evidentiaryConclusion"],
    ["PROHIBITED_FIELD", "$.legalConclusion"],
  ]);
});

test("is deterministic and returns frozen result objects", () => {
  const candidate = {
    ...validEnvelope(),
    zeta: "x",
    alpha: "x",
    runtimeEnforced: true,
  };

  const first = validateApiContractSchema(candidate);
  const second = validateApiContractSchema(candidate);

  assert.deepEqual(first, second);
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.errors[0]), true);
});

test("does not mutate input", () => {
  const candidate = validEnvelope();
  const before = JSON.stringify(candidate);

  assertValid(candidate);

  assert.equal(JSON.stringify(candidate), before);
});

test("is cycle-safe for candidate objects", () => {
  const candidate = validEnvelope();
  candidate.self = candidate;

  const result = validateApiContractSchema(candidate);

  assert.deepEqual(errorPairs(result), [["UNKNOWN_FIELD", "$.self"]]);
});

test("result shape remains contract-only and does not prove runtime API availability", () => {
  const result = validateApiContractSchema(validEnvelope());

  assert.deepEqual(Object.keys(result), [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.equal(API_CONTRACT_SCHEMA_VALIDATOR_POSTURE.contractOnly, true);
  assert.equal(API_CONTRACT_SCHEMA_VALIDATOR_POSTURE.apiAvailabilityCreated, false);
  assert.equal(
    API_CONTRACT_SCHEMA_VALIDATOR_POSTURE.runtimeEnforcementCreated,
    false,
  );
  assert.equal(API_CONTRACT_SCHEMA_VALIDATOR_POSTURE.routeIntegrationCreated, false);
});

test("schema validator remains NOT_VERIFIED_BY_CONTRACT", () => {
  assert.equal(
    validateApiContractSchema(validEnvelope()).valid,
    true,
  );
  assert.equal(
    API_CONTRACT_SCHEMA_VALIDATOR_POSTURE.apiCorrectnessCreated,
    false,
  );
  assert.deepEqual(
    validateApiContractSchema(
      validEnvelope({ verificationPosture: "VERIFIED_BY_CONTRACT" }),
    ).errors,
    [{ code: "INVALID_ENUM", path: "$.verificationPosture" }],
  );
});
