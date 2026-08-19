"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  allowedEventContentCategoryRegistry,
  deriveNoContentAuditAccessEventDescriptor,
  eventFamilyRegistry,
  noContentAuditAccessImplementationBoundary,
  noContentAuditAccessMarkers,
  prohibitedEventContentCategoryRegistry,
} = require("../packages/governance/src/index.js");

test("audit/access event taxonomy exposes category-only families and content categories", () => {
  assert.equal(
    eventFamilyRegistry.ACCESS_DECISION_CATEGORY_EVENT.event_family,
    "ACCESS_DECISION_CATEGORY_EVENT",
  );
  assert.equal(
    allowedEventContentCategoryRegistry.EVENT_FAMILY_CATEGORY.content_allowed,
    true,
  );
  assert.equal(
    prohibitedEventContentCategoryRegistry.RAW_SOURCE_TEXT_CONTENT.content_allowed,
    false,
  );
  assert.equal(noContentAuditAccessMarkers.no_raw_source_text, true);
  assert.equal(noContentAuditAccessMarkers.no_private_facts, true);
  assert.equal(noContentAuditAccessMarkers.no_source_locators, true);
  assert.equal(noContentAuditAccessMarkers.no_credentials_or_secret_bearing_values, true);
});

test("event descriptor helper returns category-only descriptors without content payload fields", () => {
  const descriptor = deriveNoContentAuditAccessEventDescriptor({
    event_family: "ACCESS_DECISION_CATEGORY_EVENT",
    allowed_content_categories: [
      "EVENT_FAMILY_CATEGORY",
      "EVENT_OUTCOME_CATEGORY",
      "NON_AUTHORIZATION_CATEGORY",
    ],
  });
  const serialized = JSON.stringify(descriptor);

  assert.equal(descriptor.category_only, true);
  assert.equal(descriptor.content_allowed, true);
  assert.deepEqual(descriptor.allowed_content_categories, [
    "EVENT_FAMILY_CATEGORY",
    "EVENT_OUTCOME_CATEGORY",
    "NON_AUTHORIZATION_CATEGORY",
  ]);
  assert.equal(descriptor.prohibited_content_categories.length, 0);
  assert.doesNotMatch(
    serialized,
    /raw_source_text|raw_text|private_fact|source_locator|filename|private_path|page_reference|url|token|secret|provider_payload|prompt|response/i,
  );
});

test("prohibited content inputs are denied without reflecting prohibited values", () => {
  const descriptor = deriveNoContentAuditAccessEventDescriptor({
    event_family: "MATERIAL_ROUTE_CATEGORY_EVENT",
    raw_source_text: "synthetic raw source fixture",
    private_fact: "synthetic private fact fixture",
    source_locator: "synthetic locator fixture",
    filename: "synthetic filename fixture",
    page_reference: "synthetic page fixture",
    url: "synthetic network fixture",
    token: "synthetic credential fixture",
    secret: "synthetic secret fixture",
    provider_payload: "synthetic provider fixture",
    prompt: "synthetic prompt fixture",
    response: "synthetic response fixture",
    pdf_content: "synthetic pdf fixture",
    image_content: "synthetic image fixture",
    metadata_content: "synthetic metadata fixture",
    legal_conclusion: "synthetic legal conclusion fixture",
    clinical_conclusion: "synthetic clinical conclusion fixture",
    evidentiary_conclusion: "synthetic evidentiary conclusion fixture",
    case_truth_conclusion: "synthetic case truth fixture",
    product_candidate_claim: "synthetic product fixture",
    external_use_claim: "synthetic external use fixture",
  });
  const serialized = JSON.stringify(descriptor);

  assert.equal(descriptor.category_only, true);
  assert.equal(descriptor.content_allowed, false);
  assert.ok(descriptor.prohibited_content_categories.includes("RAW_SOURCE_TEXT_CONTENT"));
  assert.ok(descriptor.prohibited_content_categories.includes("PRIVATE_FACT_CONTENT"));
  assert.ok(descriptor.prohibited_content_categories.includes("SOURCE_LOCATOR_CONTENT"));
  assert.ok(descriptor.prohibited_content_categories.includes("FILENAME_PRIVATE_PATH_CONTENT"));
  assert.ok(descriptor.prohibited_content_categories.includes("PAGE_REFERENCE_CONTENT"));
  assert.ok(descriptor.prohibited_content_categories.includes("NETWORK_OR_CREDENTIAL_CONTENT"));
  assert.ok(descriptor.prohibited_content_categories.includes("PROVIDER_INTERACTION_CONTENT"));
  assert.ok(descriptor.prohibited_content_categories.includes("PDF_IMAGE_METADATA_CONTENT"));
  assert.ok(descriptor.prohibited_content_categories.includes("DOMAIN_TRUTH_CONCLUSION_CONTENT"));
  assert.ok(
    descriptor.prohibited_content_categories.includes(
      "PRODUCT_OR_EXTERNAL_USE_CLAIM_CONTENT",
    ),
  );
  assert.doesNotMatch(serialized, /synthetic raw source fixture/i);
  assert.doesNotMatch(serialized, /synthetic private fact fixture/i);
  assert.doesNotMatch(serialized, /synthetic locator fixture/i);
  assert.doesNotMatch(serialized, /synthetic credential fixture/i);
  assert.doesNotMatch(serialized, /synthetic provider fixture/i);
});

test("taxonomy does not imply audit/access-log implementation or audit proof", () => {
  const descriptor = deriveNoContentAuditAccessEventDescriptor({
    event_family: "GOVERNANCE_BOUNDARY_CATEGORY_EVENT",
  });

  assert.equal(noContentAuditAccessImplementationBoundary.audit_log_storage_implemented, false);
  assert.equal(noContentAuditAccessImplementationBoundary.access_logging_implemented, false);
  assert.equal(noContentAuditAccessImplementationBoundary.runtime_event_emitters_created, false);
  assert.equal(noContentAuditAccessImplementationBoundary.log_schema_or_storage_created, false);
  assert.equal(noContentAuditAccessImplementationBoundary.audit_proof_created, false);
  assert.equal(descriptor.implementation_boundary.audit_log_storage_implemented, false);
  assert.equal(descriptor.implementation_boundary.access_logging_implemented, false);
});

test("taxonomy does not create CI evidence, proof, certification, or sign-off", () => {
  const descriptor = deriveNoContentAuditAccessEventDescriptor({
    event_family: "TAXONOMY_REVIEW_CATEGORY_EVENT",
    allowed_content_categories: ["SYNTHETIC_FIXTURE_CATEGORY"],
  });

  assert.equal(descriptor.implementation_boundary.local_logs_are_ci_evidence, false);
  assert.equal(descriptor.implementation_boundary.chain_of_custody_created, false);
  assert.equal(descriptor.implementation_boundary.legal_proof_created, false);
  assert.equal(descriptor.implementation_boundary.evidentiary_proof_created, false);
  assert.equal(descriptor.implementation_boundary.runtime_certification_created, false);
  assert.equal(descriptor.implementation_boundary.technical_signoff_created, false);
});
