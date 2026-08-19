"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  assertNoTokenUrlSecretRoute,
  classifyProviderRouteGap,
  denyRawMaterialRoute,
  denyThirdPartyModelApiRoute,
  deriveRouteDenialDescriptor,
  networkCredentialSourceLocatorDenialRegistry,
  providerRouteGapStatusRegistry,
  rawMaterialRoutingThirdPartyNonAuthorizationInvariant,
  rawRouteDenialRegistry,
  thirdPartyRouteDenialRegistry,
} = require("../packages/governance/src/index.js");

test("raw and acquisition route attempts deny by default", () => {
  const materialClasses = [
    ["RAW_PRIVATE_SOURCE_MATERIAL", "RAW_PRIVATE_SOURCE_ROUTE_DENIED"],
    ["SOURCE_PACKAGE_MATERIAL", "SOURCE_PACKAGE_ROUTE_DENIED"],
    [
      "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
      "PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_DENIED",
    ],
  ];

  for (const [materialClass, routeDenial] of materialClasses) {
    const decision = denyRawMaterialRoute(materialClass);

    assert.equal(rawRouteDenialRegistry[routeDenial].authorized, false);
    assert.equal(decision.authorized, false);
    assert.equal(decision.route_denied, true);
    assert.equal(decision.route_denial, routeDenial);
    assert.equal(decision.human_professional_review_required, true);
    assert.equal(decision.external_use_authorized, false);
    assert.equal(decision.product_candidate, "NONE");
  }
});

test("generated/export artifact route does not imply external-use", () => {
  const decision = denyRawMaterialRoute("GENERATED_EXPORT_ARTIFACT_MATERIAL");

  assert.equal(decision.route_denial, "GENERATED_EXPORT_ARTIFACT_NOT_EXTERNAL_USE");
  assert.equal(decision.authorized, false);
  assert.equal(decision.external_use_authorized, false);
  assert.equal(decision.product_candidate, "NONE");
  assert.equal(
    decision.descriptor.non_authorizations.includes("NO_EXTERNAL_USE_AUTHORIZATION"),
    true,
  );
});

test("third-party model/API route attempts remain denied for admin, support, and review", () => {
  const adminDecision = denyThirdPartyModelApiRoute({
    actor_category: "ADMIN_SUPPORT",
  });
  const reviewDecision = denyThirdPartyModelApiRoute({
    actor_category: "HUMAN_PROFESSIONAL_REVIEW",
  });

  assert.equal(
    thirdPartyRouteDenialRegistry.THIRD_PARTY_MODEL_API_ROUTE_DENIED.authorized,
    false,
  );
  assert.equal(adminDecision.authorized, false);
  assert.equal(adminDecision.admin_support_approval_authorized, false);
  assert.equal(adminDecision.admin_support_decision.authorized, false);
  assert.equal(
    reviewDecision.human_professional_review_authorizes_provider_routing,
    false,
  );
  assert.equal(reviewDecision.review_decision.authorized, false);
  assert.equal(reviewDecision.product_candidate, "NONE");
  assert.equal(reviewDecision.external_use_authorized, false);
});

test("provider route gaps block routing when provider assurances are missing", () => {
  const gapDecision = classifyProviderRouteGap();

  assert.equal(
    providerRouteGapStatusRegistry.PROVIDER_IDENTITY_STATUS_MISSING.blocks_routing,
    true,
  );
  assert.equal(gapDecision.authorized, false);
  assert.equal(gapDecision.blocks_routing, true);
  assert.equal(gapDecision.provider_routing_authorized, false);
  assert.ok(
    gapDecision.provider_route_gaps.includes("PROVIDER_IDENTITY_STATUS_MISSING"),
  );
  assert.ok(gapDecision.provider_route_gaps.includes("PROVIDER_REGISTRY_MISSING"));
  assert.ok(
    gapDecision.provider_route_gaps.includes("PROVIDER_DATA_ROUTING_MAP_MISSING"),
  );
  assert.ok(
    gapDecision.provider_route_gaps.includes(
      "PROVIDER_RETENTION_DELETION_POSTURE_MISSING",
    ),
  );
  assert.ok(gapDecision.provider_route_gaps.includes("PROVIDER_AUDITABILITY_MISSING"));
  assert.ok(
    gapDecision.provider_route_gaps.includes(
      "PROVIDER_NETWORK_CREDENTIAL_HANDLING_MISSING",
    ),
  );
});

test("network, credential, and source-locator inputs are denied without reflection", () => {
  const decision = assertNoTokenUrlSecretRoute({
    url: "https://example.invalid/private",
    token: "synthetic-token",
    secret: "synthetic-secret",
    source_locator: "synthetic-source-locator",
    private_path: "/private/synthetic/path",
  });
  const serialized = JSON.stringify(decision);

  assert.equal(
    networkCredentialSourceLocatorDenialRegistry.TOKEN_URL_SECRET_ROUTE_DENIED
      .authorized,
    false,
  );
  assert.equal(decision.allowed, false);
  assert.equal(decision.authorized, false);
  assert.equal(decision.route_denied, true);
  assert.ok(decision.route_denials.includes("TOKEN_URL_SECRET_ROUTE_DENIED"));
  assert.ok(decision.route_denials.includes("SOURCE_LOCATOR_ROUTE_DENIED"));
  assert.ok(decision.route_denials.includes("FILENAME_PRIVATE_PATH_ROUTE_DENIED"));
  assert.doesNotMatch(serialized, /example\.invalid|synthetic-token|synthetic-secret/);
  assert.doesNotMatch(serialized, /synthetic-source-locator|\/private\/synthetic/);
});

test("route-denial descriptor remains category-only and no-raw", () => {
  const descriptor = deriveRouteDenialDescriptor({
    raw_route_denials: ["RAW_PRIVATE_SOURCE_ROUTE_DENIED"],
    third_party_route_denials: ["THIRD_PARTY_ROUTING_NOT_AUTHORIZED"],
    provider_route_gaps: ["PROVIDER_REGISTRY_MISSING"],
    network_credential_source_locator_denials: ["TOKEN_URL_SECRET_ROUTE_DENIED"],
    raw_source_text: "synthetic raw text that must not be reflected",
    provider_payload: "synthetic provider payload that must not be reflected",
    prompt: "synthetic prompt that must not be reflected",
    response: "synthetic response that must not be reflected",
    external_use_claim: "synthetic external use claim",
  });
  const serialized = JSON.stringify(descriptor);

  assert.equal(descriptor.category_only, true);
  assert.equal(descriptor.authorized, false);
  assert.equal(descriptor.route_denied, true);
  assert.equal(descriptor.product_candidate, "NONE");
  assert.equal(descriptor.external_use_authorized, false);
  assert.equal(descriptor.human_professional_review_required, true);
  assert.equal(descriptor.implementation_boundary.provider_integration_implemented, false);
  assert.equal(descriptor.implementation_boundary.data_routing_map_created, false);
  assert.equal(descriptor.implementation_boundary.runtime_gates_created, false);
  assert.equal(descriptor.implementation_boundary.log_schema_or_storage_created, false);
  assert.doesNotMatch(
    serialized,
    /raw_source_text|synthetic raw text|private_fact|source_locator|private_path/i,
  );
  assert.doesNotMatch(
    serialized,
    /page_reference|https?:\/\/|synthetic-token|synthetic-secret/i,
  );
  assert.doesNotMatch(
    serialized,
    /provider_payload|synthetic provider payload|synthetic prompt|synthetic response/i,
  );
  assert.doesNotMatch(
    serialized,
    /pdf_content|image_content|metadata_content|legal_conclusion/i,
  );
  assert.doesNotMatch(serialized, /product_candidate_claim|external_use_claim/i);
});

test("non-authorization invariant preserves provider and release boundaries", () => {
  assert.equal(
    rawMaterialRoutingThirdPartyNonAuthorizationInvariant
      .third_party_routing_authorized,
    false,
  );
  assert.equal(rawMaterialRoutingThirdPartyNonAuthorizationInvariant.product_candidate, "NONE");
  assert.equal(
    rawMaterialRoutingThirdPartyNonAuthorizationInvariant.external_use_authorized,
    false,
  );
  assert.equal(
    rawMaterialRoutingThirdPartyNonAuthorizationInvariant.human_professional_review_required,
    true,
  );
  assert.equal(
    rawMaterialRoutingThirdPartyNonAuthorizationInvariant.provider_registry_created,
    false,
  );
  assert.equal(
    rawMaterialRoutingThirdPartyNonAuthorizationInvariant.data_routing_map_created,
    false,
  );
  assert.equal(
    rawMaterialRoutingThirdPartyNonAuthorizationInvariant
      .network_credential_handling_implementation_created,
    false,
  );
});
