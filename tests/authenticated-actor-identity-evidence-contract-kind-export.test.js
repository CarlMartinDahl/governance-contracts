"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const contract = require("../packages/governance/src/authenticated-actor-identity-evidence-contract.js");
const packageIndex = require("../packages/governance/src/index.js");

const {
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY,
  AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_KIND,
  validateAuthenticatedActorIdentityEvidence,
} = contract;

function baseEvidence(overrides = {}) {
  return {
    version: "v1",
    evidenceId: "evidence:synthetic-kind-export-001",
    actorId: "actor:synthetic-kind-export-001",
    actorIdNamespace: "namespace:synthetic",
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

test("exports the existing authenticated-actor identity evidence contract kind", () => {
  assert.equal(
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_KIND,
    "AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE",
  );
});

test("package index exposes the same contract-kind declaration by existing wiring", () => {
  assert.equal(
    packageIndex.AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_KIND,
    AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_KIND,
  );
});

test("validator result contractKind matches the exported contract-kind declaration", () => {
  const result = validateAuthenticatedActorIdentityEvidence(baseEvidence());

  assert.equal(result.valid, true);
  assert.equal(result.contractKind, AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_KIND);
  assert.deepEqual(Object.keys(result), ["valid", "contractKind", "version", "errors"]);
});

test("identity object shape remains unchanged and does not absorb evidence kind", () => {
  assert.deepEqual(Object.keys(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY), [
    "contractName",
    "version",
  ]);
  assert.deepEqual(AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY, {
    contractName: "AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT",
    version: "v1",
  });
  assert.equal(
    Object.prototype.hasOwnProperty.call(
      AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_CONTRACT_IDENTITY,
      "evidenceKind",
    ),
    false,
  );
});

test("public function surface remains one validator with arity one", () => {
  const publicFunctions = Object.entries(contract)
    .filter(([, value]) => typeof value === "function")
    .map(([name]) => name);

  assert.deepEqual(publicFunctions, ["validateAuthenticatedActorIdentityEvidence"]);
  assert.equal(validateAuthenticatedActorIdentityEvidence.length, 1);
});
