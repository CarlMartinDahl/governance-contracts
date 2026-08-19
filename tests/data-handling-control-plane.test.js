"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  dataHandlingBlockerRegistry,
  decideMaterialRoute,
  evaluateNoOverclaim,
  getGlobalNonAuthorizationInvariant,
  materialClassRegistry,
  materialHandlingStatusRegistry,
  nonProofStatusRegistry,
  routeDecisionRegistry,
} = require("../packages/governance/src/index.js");

test("data-handling registries expose deny-by-default control-plane constants", () => {
  assert.equal(
    materialClassRegistry.RAW_PRIVATE_SOURCE_MATERIAL.handling_status,
    "DENY_BY_DEFAULT",
  );
  assert.equal(
    materialClassRegistry.SOURCE_PACKAGE_MATERIAL.blocker,
    "SOURCE_PACKAGE_ROUTE_BLOCKED",
  );
  assert.equal(
    materialClassRegistry.PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL.blocker,
    "PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION_BLOCKED",
  );
  assert.equal(
    materialClassRegistry.THIRD_PARTY_MODEL_API_ROUTED_MATERIAL.blocker,
    "THIRD_PARTY_MODEL_API_ROUTE_BLOCKED",
  );
  assert.equal(materialHandlingStatusRegistry.DENY_BY_DEFAULT.authorized, false);
  assert.equal(routeDecisionRegistry.RELEASE_APPROVAL_DENIED_BY_DEFAULT.authorized, false);
  assert.equal(
    dataHandlingBlockerRegistry.RBAC_ENFORCEMENT_NOT_CREATED.blocker,
    "RBAC_ENFORCEMENT_NOT_CREATED",
  );
});

test("material routing helper denies raw, source, acquisition, third-party, and unknown routes", () => {
  const expectedDenials = new Map([
    ["RAW_PRIVATE_SOURCE_MATERIAL", "RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_DENIED"],
    ["SOURCE_PACKAGE_MATERIAL", "SOURCE_PACKAGE_MATERIAL_ROUTE_DENIED"],
    [
      "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
      "PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION_ROUTE_DENIED",
    ],
    ["THIRD_PARTY_MODEL_API_ROUTED_MATERIAL", "THIRD_PARTY_MODEL_API_ROUTE_DENIED"],
    ["UNKNOWN_SYNTHETIC_FIXTURE_CLASS", "ROUTE_DENIED_BY_DEFAULT"],
  ]);

  for (const [materialClass, expectedDecision] of expectedDenials) {
    const decision = decideMaterialRoute(materialClass);

    assert.equal(decision.authorized, false);
    assert.equal(decision.route_decision, expectedDecision);
    assert.equal(decision.human_professional_review_required, true);
    assert.ok(decision.non_authorizations.includes("NO_EXTERNAL_USE_AUTHORIZATION"));
    assert.ok(decision.non_authorizations.includes("NO_RELEASE_APPROVAL"));
    assert.ok(decision.non_authorizations.includes("NO_COURT_USE"));
    assert.ok(decision.non_authorizations.includes("NO_LAW_ENFORCEMENT_USE"));
  }
});

test("route decisions do not carry raw, source, metadata, or provider payload fields", () => {
  const decision = decideMaterialRoute("SYNTHETIC_NO_RAW_MATERIAL");
  const serialized = JSON.stringify(decision);

  assert.equal(decision.authorized, false);
  assert.equal(decision.route_decision, "ROUTE_DENIED_BY_DEFAULT");
  assert.doesNotMatch(serialized, /raw_text|source_locator|metadata_url|provider_payload|secret/i);
});

test("no-overclaim helper denies proof promotion claims", () => {
  const claims = new Map([
    ["DOCS_ONLY_AS_RUNTIME_ENFORCEMENT", "DOCS_ONLY_NOT_RUNTIME_ENFORCEMENT"],
    ["LOCAL_LOG_AS_CI_EVIDENCE", "LOCAL_LOGS_NOT_CI_EVIDENCE"],
    ["HASH_MANIFEST_AS_TRUTH_PROOF", "HASH_MANIFEST_NOT_TRUTH_PROOF"],
    ["TESTED_SCENARIO_AS_RUNTIME_CERTAINTY", "TESTED_SCENARIO_NOT_RUNTIME_CERTAINTY"],
    ["ROUTE_CASE_CAPABILITY_AS_FULL_RBAC", "ROUTE_CASE_CAPABILITY_NOT_FULL_RBAC"],
    [
      "ROUTE_CASE_CAPABILITY_AS_FULL_ACCESS_CONTROL",
      "ROUTE_CASE_CAPABILITY_NOT_FULL_ACCESS_CONTROL",
    ],
    [
      "RECIPIENT_RESPONSE_AS_RECIPIENT_COMPLIANCE",
      "RECIPIENT_RESPONSE_NOT_RECIPIENT_COMPLIANCE",
    ],
    [
      "PROVIDER_STATUS_AS_PROVIDER_VERIFICATION",
      "PROVIDER_STATUS_NOT_PROVIDER_VERIFICATION",
    ],
  ]);

  for (const [claim, expectedStatus] of claims) {
    const result = evaluateNoOverclaim(claim);

    assert.equal(result.allowed, false);
    assert.equal(result.non_proof_status, expectedStatus);
    assert.equal(nonProofStatusRegistry[expectedStatus].allowed, false);
    assert.equal(result.human_professional_review_required, true);
  }
});

test("global non-authorization invariant preserves release and disclosure denials", () => {
  const invariant = getGlobalNonAuthorizationInvariant();

  assert.equal(invariant.external_use_authorized, false);
  assert.equal(invariant.product_candidate_selected, false);
  assert.equal(invariant.release_approved, false);
  assert.equal(invariant.public_authority_disclosure_authorized, false);
  assert.equal(invariant.court_use_authorized, false);
  assert.equal(invariant.law_enforcement_use_authorized, false);
  assert.equal(invariant.runtime_enforcement_created, false);
  assert.equal(invariant.ci_evidence_created_from_local_logs, false);
  assert.equal(invariant.truth_proof_created_from_hash_or_manifest, false);
  assert.equal(invariant.runtime_certainty_created_from_tested_scenario, false);
  assert.equal(invariant.full_rbac_created_from_route_case_capability, false);
  assert.equal(invariant.full_access_control_created_from_route_case_capability, false);
  assert.equal(invariant.recipient_compliance_created_from_response, false);
  assert.equal(invariant.provider_verification_created_from_status, false);
  assert.equal(invariant.human_professional_review_required, true);
});
