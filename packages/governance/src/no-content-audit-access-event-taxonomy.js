"use strict";

const eventFamilyRegistry = Object.freeze({
  AUTHENTICATION_CATEGORY_EVENT: Object.freeze({
    event_family: "AUTHENTICATION_CATEGORY_EVENT",
    description: "Category-only authentication boundary event.",
  }),
  ACCESS_DECISION_CATEGORY_EVENT: Object.freeze({
    event_family: "ACCESS_DECISION_CATEGORY_EVENT",
    description: "Category-only access decision boundary event.",
  }),
  MATERIAL_ROUTE_CATEGORY_EVENT: Object.freeze({
    event_family: "MATERIAL_ROUTE_CATEGORY_EVENT",
    description: "Category-only material route boundary event.",
  }),
  GOVERNANCE_BOUNDARY_CATEGORY_EVENT: Object.freeze({
    event_family: "GOVERNANCE_BOUNDARY_CATEGORY_EVENT",
    description: "Category-only governance boundary event.",
  }),
  TAXONOMY_REVIEW_CATEGORY_EVENT: Object.freeze({
    event_family: "TAXONOMY_REVIEW_CATEGORY_EVENT",
    description: "Category-only taxonomy review event.",
  }),
});

const allowedEventContentCategoryRegistry = Object.freeze({
  EVENT_FAMILY_CATEGORY: Object.freeze({
    content_category: "EVENT_FAMILY_CATEGORY",
    content_allowed: true,
    description: "Allows only a registered event-family category.",
  }),
  EVENT_OUTCOME_CATEGORY: Object.freeze({
    content_category: "EVENT_OUTCOME_CATEGORY",
    content_allowed: true,
    description: "Allows only a coarse event outcome category.",
  }),
  ACTOR_ROLE_CATEGORY: Object.freeze({
    content_category: "ACTOR_ROLE_CATEGORY",
    content_allowed: true,
    description: "Allows only a coarse actor role category.",
  }),
  SUBJECT_TYPE_CATEGORY: Object.freeze({
    content_category: "SUBJECT_TYPE_CATEGORY",
    content_allowed: true,
    description: "Allows only a coarse subject type category.",
  }),
  ROUTE_SURFACE_CATEGORY: Object.freeze({
    content_category: "ROUTE_SURFACE_CATEGORY",
    content_allowed: true,
    description: "Allows only a coarse route surface category.",
  }),
  NON_AUTHORIZATION_CATEGORY: Object.freeze({
    content_category: "NON_AUTHORIZATION_CATEGORY",
    content_allowed: true,
    description: "Allows only a coarse non-authorization category.",
  }),
  SYNTHETIC_FIXTURE_CATEGORY: Object.freeze({
    content_category: "SYNTHETIC_FIXTURE_CATEGORY",
    content_allowed: true,
    description: "Allows only synthetic fixture category labels.",
  }),
});

const prohibitedEventContentCategoryRegistry = Object.freeze({
  RAW_SOURCE_TEXT_CONTENT: Object.freeze({
    content_category: "RAW_SOURCE_TEXT_CONTENT",
    content_allowed: false,
    description: "Raw source text is never allowed in event descriptors.",
  }),
  PRIVATE_FACT_CONTENT: Object.freeze({
    content_category: "PRIVATE_FACT_CONTENT",
    content_allowed: false,
    description: "Private facts are never allowed in event descriptors.",
  }),
  SOURCE_LOCATOR_CONTENT: Object.freeze({
    content_category: "SOURCE_LOCATOR_CONTENT",
    content_allowed: false,
    description: "Source locators are never allowed in event descriptors.",
  }),
  FILENAME_PRIVATE_PATH_CONTENT: Object.freeze({
    content_category: "FILENAME_PRIVATE_PATH_CONTENT",
    content_allowed: false,
    description: "Filenames and private paths are never allowed in event descriptors.",
  }),
  PAGE_REFERENCE_CONTENT: Object.freeze({
    content_category: "PAGE_REFERENCE_CONTENT",
    content_allowed: false,
    description: "Page references are never allowed in event descriptors.",
  }),
  NETWORK_OR_CREDENTIAL_CONTENT: Object.freeze({
    content_category: "NETWORK_OR_CREDENTIAL_CONTENT",
    content_allowed: false,
    description: "Network locations, credentials, and secret-bearing values are never allowed.",
  }),
  PROVIDER_INTERACTION_CONTENT: Object.freeze({
    content_category: "PROVIDER_INTERACTION_CONTENT",
    content_allowed: false,
    description: "Provider payloads, prompts, and responses are never allowed.",
  }),
  PDF_IMAGE_METADATA_CONTENT: Object.freeze({
    content_category: "PDF_IMAGE_METADATA_CONTENT",
    content_allowed: false,
    description: "PDF, image, and metadata content is never allowed.",
  }),
  DOMAIN_TRUTH_CONCLUSION_CONTENT: Object.freeze({
    content_category: "DOMAIN_TRUTH_CONCLUSION_CONTENT",
    content_allowed: false,
    description: "Legal, clinical, evidentiary, and case-truth conclusions are never allowed.",
  }),
  PRODUCT_OR_EXTERNAL_USE_CLAIM_CONTENT: Object.freeze({
    content_category: "PRODUCT_OR_EXTERNAL_USE_CLAIM_CONTENT",
    content_allowed: false,
    description: "Product-candidate and external-use claims are never allowed.",
  }),
});

const noContentAuditAccessMarkers = Object.freeze({
  no_raw_source_text: true,
  no_private_facts: true,
  no_source_locators: true,
  no_filenames_or_private_paths: true,
  no_page_references: true,
  no_network_locations: true,
  no_credentials_or_secret_bearing_values: true,
  no_provider_payloads_prompts_or_responses: true,
  no_pdf_image_or_metadata_content: true,
  no_domain_truth_conclusions: true,
  no_product_candidate_or_external_use_claims: true,
});

const noContentAuditAccessImplementationBoundary = Object.freeze({
  audit_log_storage_implemented: false,
  access_logging_implemented: false,
  runtime_event_emitters_created: false,
  log_schema_or_storage_created: false,
  audit_proof_created: false,
  chain_of_custody_created: false,
  legal_proof_created: false,
  evidentiary_proof_created: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
  local_logs_are_ci_evidence: false,
});

const prohibitedInputKeyCategoryByKey = Object.freeze({
  raw_source_text: "RAW_SOURCE_TEXT_CONTENT",
  raw_text: "RAW_SOURCE_TEXT_CONTENT",
  source_text: "RAW_SOURCE_TEXT_CONTENT",
  private_fact: "PRIVATE_FACT_CONTENT",
  private_facts: "PRIVATE_FACT_CONTENT",
  source_locator: "SOURCE_LOCATOR_CONTENT",
  source_locators: "SOURCE_LOCATOR_CONTENT",
  filename: "FILENAME_PRIVATE_PATH_CONTENT",
  private_path: "FILENAME_PRIVATE_PATH_CONTENT",
  path: "FILENAME_PRIVATE_PATH_CONTENT",
  page_reference: "PAGE_REFERENCE_CONTENT",
  page_references: "PAGE_REFERENCE_CONTENT",
  page: "PAGE_REFERENCE_CONTENT",
  url: "NETWORK_OR_CREDENTIAL_CONTENT",
  href: "NETWORK_OR_CREDENTIAL_CONTENT",
  token: "NETWORK_OR_CREDENTIAL_CONTENT",
  api_key: "NETWORK_OR_CREDENTIAL_CONTENT",
  secret: "NETWORK_OR_CREDENTIAL_CONTENT",
  provider_payload: "PROVIDER_INTERACTION_CONTENT",
  prompt: "PROVIDER_INTERACTION_CONTENT",
  response: "PROVIDER_INTERACTION_CONTENT",
  pdf_content: "PDF_IMAGE_METADATA_CONTENT",
  image_content: "PDF_IMAGE_METADATA_CONTENT",
  metadata_content: "PDF_IMAGE_METADATA_CONTENT",
  legal_conclusion: "DOMAIN_TRUTH_CONCLUSION_CONTENT",
  clinical_conclusion: "DOMAIN_TRUTH_CONCLUSION_CONTENT",
  evidentiary_conclusion: "DOMAIN_TRUTH_CONCLUSION_CONTENT",
  case_truth_conclusion: "DOMAIN_TRUTH_CONCLUSION_CONTENT",
  product_candidate_claim: "PRODUCT_OR_EXTERNAL_USE_CLAIM_CONTENT",
  external_use_claim: "PRODUCT_OR_EXTERNAL_USE_CLAIM_CONTENT",
});

function unique(values) {
  return [...new Set(values)];
}

function getRegistryEntry(registry, key) {
  return registry[key] || null;
}

function getEventFamilyEntry(eventFamily) {
  return getRegistryEntry(eventFamilyRegistry, eventFamily);
}

function getAllowedEventContentCategoryEntry(contentCategory) {
  return getRegistryEntry(allowedEventContentCategoryRegistry, contentCategory);
}

function getProhibitedEventContentCategoryEntry(contentCategory) {
  return getRegistryEntry(prohibitedEventContentCategoryRegistry, contentCategory);
}

function classifyProhibitedEventContent(input = {}) {
  return unique(
    Object.keys(input)
      .map((key) => prohibitedInputKeyCategoryByKey[key])
      .filter(Boolean),
  );
}

function deriveNoContentAuditAccessEventDescriptor(input = {}) {
  const requestedCategories = Array.isArray(input.allowed_content_categories)
    ? input.allowed_content_categories
    : [];
  const allowedContentCategories = requestedCategories.filter((contentCategory) =>
    Boolean(getAllowedEventContentCategoryEntry(contentCategory)),
  );
  const prohibitedContentCategories = unique([
    ...classifyProhibitedEventContent(input),
    ...requestedCategories.filter((contentCategory) =>
      Boolean(getProhibitedEventContentCategoryEntry(contentCategory)),
    ),
  ]);
  const eventFamily = getEventFamilyEntry(input.event_family)
    ? input.event_family
    : "TAXONOMY_REVIEW_CATEGORY_EVENT";

  return Object.freeze({
    event_family: eventFamily,
    event_descriptor_type: "CATEGORY_ONLY_NO_CONTENT_EVENT_DESCRIPTOR",
    category_only: true,
    content_allowed: prohibitedContentCategories.length === 0,
    allowed_content_categories: Object.freeze(allowedContentCategories),
    prohibited_content_categories: Object.freeze(prohibitedContentCategories),
    implementation_boundary: noContentAuditAccessImplementationBoundary,
  });
}

module.exports = {
  allowedEventContentCategoryRegistry,
  classifyProhibitedEventContent,
  deriveNoContentAuditAccessEventDescriptor,
  eventFamilyRegistry,
  getAllowedEventContentCategoryEntry,
  getEventFamilyEntry,
  getProhibitedEventContentCategoryEntry,
  noContentAuditAccessImplementationBoundary,
  noContentAuditAccessMarkers,
  prohibitedEventContentCategoryRegistry,
};
