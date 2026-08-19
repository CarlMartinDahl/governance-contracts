"use strict";

const {
  dataHandlingBlockerRegistry,
  dataHandlingNonAuthorizationInvariant,
  decideMaterialRoute,
} = require("./data-handling-control-plane.js");
const {
  classifyProhibitedEventContent,
  deriveNoContentAuditAccessEventDescriptor,
  noContentAuditAccessImplementationBoundary,
  noContentAuditAccessMarkers,
} = require("./no-content-audit-access-event-taxonomy.js");
const {
  deriveAdminSupportNonBypassDecision,
  deriveRbacDenyByDefaultAccessDecision,
} = require("./rbac-role-permission-deny-by-default-scaffold.js");

const rawRouteDenialRegistry = Object.freeze({
  RAW_PRIVATE_SOURCE_ROUTE_DENIED: Object.freeze({
    route_denial: "RAW_PRIVATE_SOURCE_ROUTE_DENIED",
    authorized: false,
    description: "Raw, private, or source material route attempts are denied by default.",
  }),
  SOURCE_PACKAGE_ROUTE_DENIED: Object.freeze({
    route_denial: "SOURCE_PACKAGE_ROUTE_DENIED",
    authorized: false,
    description: "Source-package route attempts are denied by default.",
  }),
  PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_DENIED: Object.freeze({
    route_denial: "PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_DENIED",
    authorized: false,
    description: "PDF, image, screenshot, and metadata route attempts are denied.",
  }),
  GENERATED_EXPORT_ARTIFACT_NOT_EXTERNAL_USE: Object.freeze({
    route_denial: "GENERATED_EXPORT_ARTIFACT_NOT_EXTERNAL_USE",
    authorized: false,
    description: "Generated or export artifact routes do not imply external-use approval.",
  }),
});

const thirdPartyRouteDenialRegistry = Object.freeze({
  THIRD_PARTY_MODEL_API_ROUTE_DENIED: Object.freeze({
    route_denial: "THIRD_PARTY_MODEL_API_ROUTE_DENIED",
    authorized: false,
    description: "Third-party model or API route attempts are denied by default.",
  }),
  THIRD_PARTY_ROUTING_NOT_AUTHORIZED: Object.freeze({
    route_denial: "THIRD_PARTY_ROUTING_NOT_AUTHORIZED",
    authorized: false,
    description: "Third-party routing remains not authorized.",
  }),
  ADMIN_SUPPORT_PROVIDER_ROUTING_APPROVAL_DENIED: Object.freeze({
    route_denial: "ADMIN_SUPPORT_PROVIDER_ROUTING_APPROVAL_DENIED",
    authorized: false,
    description: "Admin/support categories cannot approve third-party routing.",
  }),
  HUMAN_PROFESSIONAL_REVIEW_NOT_PROVIDER_ROUTING_AUTHORIZATION: Object.freeze({
    route_denial: "HUMAN_PROFESSIONAL_REVIEW_NOT_PROVIDER_ROUTING_AUTHORIZATION",
    authorized: false,
    description: "Human/professional review cannot authorize provider routing by itself.",
  }),
});

const providerRouteGapStatusRegistry = Object.freeze({
  PROVIDER_IDENTITY_STATUS_MISSING: Object.freeze({
    provider_gap_status: "PROVIDER_IDENTITY_STATUS_MISSING",
    blocks_routing: true,
    description: "Missing provider identity or status blocks routing.",
  }),
  PROVIDER_REGISTRY_MISSING: Object.freeze({
    provider_gap_status: "PROVIDER_REGISTRY_MISSING",
    blocks_routing: true,
    description: "Missing provider registry blocks routing.",
  }),
  PROVIDER_DATA_ROUTING_MAP_MISSING: Object.freeze({
    provider_gap_status: "PROVIDER_DATA_ROUTING_MAP_MISSING",
    blocks_routing: true,
    description: "Missing provider data-routing map blocks routing.",
  }),
  PROVIDER_RETENTION_DELETION_POSTURE_MISSING: Object.freeze({
    provider_gap_status: "PROVIDER_RETENTION_DELETION_POSTURE_MISSING",
    blocks_routing: true,
    description: "Missing provider retention/deletion posture blocks routing.",
  }),
  PROVIDER_AUDITABILITY_MISSING: Object.freeze({
    provider_gap_status: "PROVIDER_AUDITABILITY_MISSING",
    blocks_routing: true,
    description: "Missing provider auditability blocks routing.",
  }),
  PROVIDER_NETWORK_CREDENTIAL_HANDLING_MISSING: Object.freeze({
    provider_gap_status: "PROVIDER_NETWORK_CREDENTIAL_HANDLING_MISSING",
    blocks_routing: true,
    description: "Missing provider network/credential handling blocks routing.",
  }),
});

const networkCredentialSourceLocatorDenialRegistry = Object.freeze({
  TOKEN_URL_SECRET_ROUTE_DENIED: Object.freeze({
    route_denial: "TOKEN_URL_SECRET_ROUTE_DENIED",
    authorized: false,
    description: "Token, URL, and secret-bearing route inputs are denied.",
  }),
  SOURCE_LOCATOR_ROUTE_DENIED: Object.freeze({
    route_denial: "SOURCE_LOCATOR_ROUTE_DENIED",
    authorized: false,
    description: "Source-locator route inputs are denied.",
  }),
  FILENAME_PRIVATE_PATH_ROUTE_DENIED: Object.freeze({
    route_denial: "FILENAME_PRIVATE_PATH_ROUTE_DENIED",
    authorized: false,
    description: "Filenames and private paths are denied.",
  }),
});

const rawRouteDenialByMaterialClass = Object.freeze({
  RAW_PRIVATE_SOURCE_MATERIAL: "RAW_PRIVATE_SOURCE_ROUTE_DENIED",
  SOURCE_PACKAGE_MATERIAL: "SOURCE_PACKAGE_ROUTE_DENIED",
  PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL: "PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_DENIED",
  GENERATED_EXPORT_ARTIFACT_MATERIAL: "GENERATED_EXPORT_ARTIFACT_NOT_EXTERNAL_USE",
});

const providerRouteGapByInputKey = Object.freeze({
  provider_identity_status: "PROVIDER_IDENTITY_STATUS_MISSING",
  provider_status: "PROVIDER_IDENTITY_STATUS_MISSING",
  provider_registry: "PROVIDER_REGISTRY_MISSING",
  provider_data_routing_map: "PROVIDER_DATA_ROUTING_MAP_MISSING",
  provider_retention_deletion_posture: "PROVIDER_RETENTION_DELETION_POSTURE_MISSING",
  provider_auditability: "PROVIDER_AUDITABILITY_MISSING",
  provider_token_url_secret_handling:
    "PROVIDER_NETWORK_CREDENTIAL_HANDLING_MISSING",
});

const networkCredentialSourceLocatorInputKeyDenial = Object.freeze({
  url: "TOKEN_URL_SECRET_ROUTE_DENIED",
  href: "TOKEN_URL_SECRET_ROUTE_DENIED",
  token: "TOKEN_URL_SECRET_ROUTE_DENIED",
  api_key: "TOKEN_URL_SECRET_ROUTE_DENIED",
  secret: "TOKEN_URL_SECRET_ROUTE_DENIED",
  source_locator: "SOURCE_LOCATOR_ROUTE_DENIED",
  source_locators: "SOURCE_LOCATOR_ROUTE_DENIED",
  filename: "FILENAME_PRIVATE_PATH_ROUTE_DENIED",
  private_path: "FILENAME_PRIVATE_PATH_ROUTE_DENIED",
  path: "FILENAME_PRIVATE_PATH_ROUTE_DENIED",
});

function unique(values) {
  return [...new Set(values)];
}

function hasRegistryEntry(registry, key) {
  return Object.prototype.hasOwnProperty.call(registry, key);
}

function getRawRouteDenialEntry(routeDenial) {
  return rawRouteDenialRegistry[routeDenial] || null;
}

function getThirdPartyRouteDenialEntry(routeDenial) {
  return thirdPartyRouteDenialRegistry[routeDenial] || null;
}

function getProviderRouteGapStatusEntry(providerGapStatus) {
  return providerRouteGapStatusRegistry[providerGapStatus] || null;
}

function getNetworkCredentialSourceLocatorDenialEntry(routeDenial) {
  return networkCredentialSourceLocatorDenialRegistry[routeDenial] || null;
}

function deriveRouteDenialDescriptor(input = {}) {
  const rawRouteDenials = Array.isArray(input.raw_route_denials)
    ? input.raw_route_denials.filter((routeDenial) =>
        hasRegistryEntry(rawRouteDenialRegistry, routeDenial),
      )
    : [];
  const thirdPartyRouteDenials = Array.isArray(input.third_party_route_denials)
    ? input.third_party_route_denials.filter((routeDenial) =>
        hasRegistryEntry(thirdPartyRouteDenialRegistry, routeDenial),
      )
    : [];
  const providerRouteGaps = Array.isArray(input.provider_route_gaps)
    ? input.provider_route_gaps.filter((providerGapStatus) =>
        hasRegistryEntry(providerRouteGapStatusRegistry, providerGapStatus),
      )
    : [];
  const networkCredentialSourceLocatorDenials = Array.isArray(
    input.network_credential_source_locator_denials,
  )
    ? input.network_credential_source_locator_denials.filter((routeDenial) =>
        hasRegistryEntry(networkCredentialSourceLocatorDenialRegistry, routeDenial),
      )
    : [];

  return Object.freeze({
    descriptor_type: "CATEGORY_ONLY_ROUTE_DENIAL_DESCRIPTOR",
    category_only: true,
    authorized: false,
    route_denied: true,
    raw_route_denials: Object.freeze(unique(rawRouteDenials)),
    third_party_route_denials: Object.freeze(unique(thirdPartyRouteDenials)),
    provider_route_gaps: Object.freeze(unique(providerRouteGaps)),
    restricted_route_denials: Object.freeze(unique(networkCredentialSourceLocatorDenials)),
    implementation_boundary: Object.freeze({
      provider_integration_implemented: false,
      third_party_model_api_routing_implemented: false,
      raw_private_source_processing_implemented: false,
      source_package_inspection_implemented: false,
      pdf_image_screenshot_metadata_acquisition_implemented: false,
      provider_registry_created: false,
      provider_status_implementation_created: false,
      data_routing_map_created: false,
      provider_auditability_implementation_created: false,
      provider_retention_deletion_posture_created: false,
      network_credential_handling_implementation_created: false,
      retention_deletion_purge_encryption_implemented: false,
      runtime_gates_created: false,
      log_schema_or_storage_created: false,
      audit_access_log_implementation_created: false,
      rbac_enforcement_created: false,
    }),
    non_authorizations: Object.freeze([
      "NO_THIRD_PARTY_ROUTING_AUTHORIZATION",
      "NO_PRODUCT_CANDIDATE_SELECTION",
      "NO_EXTERNAL_USE_AUTHORIZATION",
      "NO_RELEASE_APPROVAL",
      "NO_PUBLIC_AUTHORITY_DISCLOSURE",
      "NO_COURT_USE",
      "NO_LAW_ENFORCEMENT_USE",
      "NO_LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_CONCLUSION",
      "NO_SECURITY_FINDING_SEVERITY_REMEDIATION",
    ]),
    product_candidate: "NONE",
    external_use_authorized: false,
    human_professional_review_required: true,
  });
}

function denyRawMaterialRoute(materialClass, routeSurface = "MODEL_CONTEXT_ROUTE") {
  const routeDenial =
    rawRouteDenialByMaterialClass[materialClass] || "RAW_PRIVATE_SOURCE_ROUTE_DENIED";
  const materialDecision = decideMaterialRoute(materialClass, routeSurface);

  return Object.freeze({
    material_class: materialClass,
    material_class_known:
      materialClass === "GENERATED_EXPORT_ARTIFACT_MATERIAL" ||
      materialDecision.material_class_known,
    route_surface: routeSurface,
    route_denial: routeDenial,
    route_decision: materialDecision.route_decision,
    authorized: false,
    route_denied: true,
    external_use_authorized: false,
    product_candidate: "NONE",
    human_professional_review_required: true,
    blocker:
      materialDecision.blocker ||
      dataHandlingBlockerRegistry.RELEASE_EXTERNAL_USE_PRODUCT_AUTHORIZATION_NOT_CREATED
        .blocker,
    descriptor: deriveRouteDenialDescriptor({
      raw_route_denials: [routeDenial],
    }),
  });
}

function denyThirdPartyModelApiRoute(input = {}) {
  const adminSupportDecision =
    input.actor_category === "ADMIN_SUPPORT"
      ? deriveAdminSupportNonBypassDecision("NO_RAW_CONSTRAINT_BYPASS")
      : null;
  const reviewDecision =
    input.actor_category === "HUMAN_PROFESSIONAL_REVIEW"
      ? deriveRbacDenyByDefaultAccessDecision({
          actor_type: "PROFESSIONAL_REVIEW_ACTOR",
          role_category: "PROFESSIONAL_REVIEW_ROLE_CATEGORY",
          permission_category: "THIRD_PARTY_MODEL_API_ROUTING_PERMISSION",
          resource_material_scope: "THIRD_PARTY_MODEL_API_ROUTE_SCOPE",
        })
      : null;

  return Object.freeze({
    route_surface: input.route_surface || "THIRD_PARTY_MODEL_API_ROUTE",
    route_denial: "THIRD_PARTY_MODEL_API_ROUTE_DENIED",
    authorized: false,
    route_denied: true,
    admin_support_approval_authorized: false,
    human_professional_review_authorizes_provider_routing: false,
    admin_support_decision: adminSupportDecision,
    review_decision: reviewDecision,
    product_candidate: "NONE",
    external_use_authorized: false,
    human_professional_review_required: true,
    descriptor: deriveRouteDenialDescriptor({
      third_party_route_denials: [
        "THIRD_PARTY_MODEL_API_ROUTE_DENIED",
        "THIRD_PARTY_ROUTING_NOT_AUTHORIZED",
        "ADMIN_SUPPORT_PROVIDER_ROUTING_APPROVAL_DENIED",
        "HUMAN_PROFESSIONAL_REVIEW_NOT_PROVIDER_ROUTING_AUTHORIZATION",
      ],
    }),
  });
}

function classifyProviderRouteGap(input = {}) {
  const explicitGaps = Array.isArray(input.provider_route_gaps)
    ? input.provider_route_gaps.filter((providerGapStatus) =>
        hasRegistryEntry(providerRouteGapStatusRegistry, providerGapStatus),
      )
    : [];
  const missingInputGaps = Object.entries(providerRouteGapByInputKey)
    .filter(([inputKey]) => input[inputKey] !== true)
    .map(([, providerGapStatus]) => providerGapStatus);
  const providerRouteGaps = unique([...explicitGaps, ...missingInputGaps]);

  return Object.freeze({
    provider_route_gaps: Object.freeze(providerRouteGaps),
    blocks_routing: true,
    authorized: false,
    provider_routing_authorized: false,
    descriptor: deriveRouteDenialDescriptor({
      provider_route_gaps: providerRouteGaps,
    }),
  });
}

function assertNoTokenUrlSecretRoute(input = {}) {
  const routeDenials = unique(
    Object.keys(input)
      .map((inputKey) => networkCredentialSourceLocatorInputKeyDenial[inputKey])
      .filter(Boolean),
  );
  const prohibitedContentCategories = classifyProhibitedEventContent(input);

  return Object.freeze({
    allowed: routeDenials.length === 0 && prohibitedContentCategories.length === 0,
    authorized: false,
    route_denied: routeDenials.length > 0 || prohibitedContentCategories.length > 0,
    route_denials: Object.freeze(routeDenials),
    prohibited_content_categories: Object.freeze(prohibitedContentCategories),
    event_descriptor: deriveNoContentAuditAccessEventDescriptor(input),
    descriptor: deriveRouteDenialDescriptor({
      network_credential_source_locator_denials: routeDenials,
    }),
  });
}

const rawMaterialRoutingThirdPartyNonAuthorizationInvariant = Object.freeze({
  third_party_routing_authorized: false,
  product_candidate: "NONE",
  external_use_authorized: false,
  human_professional_review_required: true,
  provider_integration_implemented: false,
  provider_registry_created: false,
  provider_status_implementation_created: false,
  data_routing_map_created: false,
  provider_auditability_implementation_created: false,
  provider_retention_deletion_posture_created: false,
  network_credential_handling_implementation_created: false,
  no_content_markers: noContentAuditAccessMarkers,
  no_content_implementation_boundary: noContentAuditAccessImplementationBoundary,
  data_handling_non_authorizations: dataHandlingNonAuthorizationInvariant,
});

module.exports = {
  assertNoTokenUrlSecretRoute,
  classifyProviderRouteGap,
  denyRawMaterialRoute,
  denyThirdPartyModelApiRoute,
  deriveRouteDenialDescriptor,
  getNetworkCredentialSourceLocatorDenialEntry,
  getProviderRouteGapStatusEntry,
  getRawRouteDenialEntry,
  getThirdPartyRouteDenialEntry,
  networkCredentialSourceLocatorDenialRegistry,
  providerRouteGapStatusRegistry,
  rawMaterialRoutingThirdPartyNonAuthorizationInvariant,
  rawRouteDenialRegistry,
  thirdPartyRouteDenialRegistry,
};
