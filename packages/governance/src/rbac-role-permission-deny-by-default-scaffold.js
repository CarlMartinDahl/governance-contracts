"use strict";

const actorTypeRegistry = Object.freeze({
  HUMAN_REVIEW_ACTOR: Object.freeze({
    actor_type: "HUMAN_REVIEW_ACTOR",
    description: "Human review actor category; not system approval.",
  }),
  PROFESSIONAL_REVIEW_ACTOR: Object.freeze({
    actor_type: "PROFESSIONAL_REVIEW_ACTOR",
    description: "Professional review actor category; not system approval.",
  }),
  ADMIN_OPERATOR_ACTOR: Object.freeze({
    actor_type: "ADMIN_OPERATOR_ACTOR",
    description: "Admin operator category; no bypass capability is created.",
  }),
  SUPPORT_OPERATOR_ACTOR: Object.freeze({
    actor_type: "SUPPORT_OPERATOR_ACTOR",
    description: "Support operator category; no bypass capability is created.",
  }),
  SYSTEM_SERVICE_ACTOR: Object.freeze({
    actor_type: "SYSTEM_SERVICE_ACTOR",
    description: "System service category; no runtime authorization is created.",
  }),
});

const roleCategoryRegistry = Object.freeze({
  HUMAN_REVIEW_ROLE_CATEGORY: Object.freeze({
    role_category: "HUMAN_REVIEW_ROLE_CATEGORY",
    grants_access: false,
    description: "Human review remains required but is not system approval.",
  }),
  PROFESSIONAL_REVIEW_ROLE_CATEGORY: Object.freeze({
    role_category: "PROFESSIONAL_REVIEW_ROLE_CATEGORY",
    grants_access: false,
    description: "Professional review remains required but is not system approval.",
  }),
  ADMIN_ROLE_CATEGORY: Object.freeze({
    role_category: "ADMIN_ROLE_CATEGORY",
    grants_access: false,
    description: "Admin role category cannot bypass no-raw constraints.",
  }),
  SUPPORT_ROLE_CATEGORY: Object.freeze({
    role_category: "SUPPORT_ROLE_CATEGORY",
    grants_access: false,
    description: "Support role category cannot bypass no-raw constraints.",
  }),
  SYSTEM_INTERNAL_ROLE_CATEGORY: Object.freeze({
    role_category: "SYSTEM_INTERNAL_ROLE_CATEGORY",
    grants_access: false,
    description: "System internal role category is not runtime authorization.",
  }),
});

const permissionCategoryRegistry = Object.freeze({
  CATEGORY_ONLY_REVIEW_PERMISSION: Object.freeze({
    permission_category: "CATEGORY_ONLY_REVIEW_PERMISSION",
    grants_access: false,
    description: "Category-only review permission; no material access grant.",
  }),
  RAW_PRIVATE_SOURCE_MATERIAL_ACCESS: Object.freeze({
    permission_category: "RAW_PRIVATE_SOURCE_MATERIAL_ACCESS",
    grants_access: false,
    description: "Raw, private, or source material access is denied.",
  }),
  SOURCE_PACKAGE_ACCESS: Object.freeze({
    permission_category: "SOURCE_PACKAGE_ACCESS",
    grants_access: false,
    description: "Source-package access is denied.",
  }),
  PDF_IMAGE_SCREENSHOT_METADATA_ACCESS: Object.freeze({
    permission_category: "PDF_IMAGE_SCREENSHOT_METADATA_ACCESS",
    grants_access: false,
    description: "PDF, image, screenshot, and metadata access is denied.",
  }),
  THIRD_PARTY_MODEL_API_ROUTING_PERMISSION: Object.freeze({
    permission_category: "THIRD_PARTY_MODEL_API_ROUTING_PERMISSION",
    grants_access: false,
    description: "Third-party model or API routing is denied.",
  }),
  RELEASE_APPROVAL_PERMISSION: Object.freeze({
    permission_category: "RELEASE_APPROVAL_PERMISSION",
    grants_access: false,
    description: "Release approval is denied.",
  }),
  EXTERNAL_USE_PERMISSION: Object.freeze({
    permission_category: "EXTERNAL_USE_PERMISSION",
    grants_access: false,
    description: "External use is denied.",
  }),
  PRODUCT_CANDIDATE_PERMISSION: Object.freeze({
    permission_category: "PRODUCT_CANDIDATE_PERMISSION",
    grants_access: false,
    description: "Product-candidate selection is denied.",
  }),
  PUBLIC_COURT_LAW_ENFORCEMENT_PERMISSION: Object.freeze({
    permission_category: "PUBLIC_COURT_LAW_ENFORCEMENT_PERMISSION",
    grants_access: false,
    description: "Public, court, and law-enforcement use is denied.",
  }),
});

const resourceMaterialScopeRegistry = Object.freeze({
  CATEGORY_ONLY_SYNTHETIC_SCOPE: Object.freeze({
    resource_material_scope: "CATEGORY_ONLY_SYNTHETIC_SCOPE",
    grants_material_access: false,
    description: "Synthetic category-only scope.",
  }),
  RAW_PRIVATE_SOURCE_MATERIAL_SCOPE: Object.freeze({
    resource_material_scope: "RAW_PRIVATE_SOURCE_MATERIAL_SCOPE",
    grants_material_access: false,
    description: "Raw, private, or source material scope remains denied.",
  }),
  SOURCE_PACKAGE_SCOPE: Object.freeze({
    resource_material_scope: "SOURCE_PACKAGE_SCOPE",
    grants_material_access: false,
    description: "Source-package scope remains denied.",
  }),
  PDF_IMAGE_SCREENSHOT_METADATA_SCOPE: Object.freeze({
    resource_material_scope: "PDF_IMAGE_SCREENSHOT_METADATA_SCOPE",
    grants_material_access: false,
    description: "PDF, image, screenshot, and metadata scope remains denied.",
  }),
  THIRD_PARTY_MODEL_API_ROUTE_SCOPE: Object.freeze({
    resource_material_scope: "THIRD_PARTY_MODEL_API_ROUTE_SCOPE",
    grants_material_access: false,
    description: "Third-party model or API route scope remains denied.",
  }),
  RELEASE_EXTERNAL_PRODUCT_SCOPE: Object.freeze({
    resource_material_scope: "RELEASE_EXTERNAL_PRODUCT_SCOPE",
    grants_material_access: false,
    description: "Release, external-use, and product scope remains denied.",
  }),
  PUBLIC_COURT_LAW_ENFORCEMENT_SCOPE: Object.freeze({
    resource_material_scope: "PUBLIC_COURT_LAW_ENFORCEMENT_SCOPE",
    grants_material_access: false,
    description: "Public, court, and law-enforcement scope remains denied.",
  }),
});

const accessDecisionRegistry = Object.freeze({
  ACCESS_DENIED_BY_DEFAULT: Object.freeze({
    access_decision: "ACCESS_DENIED_BY_DEFAULT",
    authorized: false,
    description: "No role, permission, or scope grants access.",
  }),
  UNKNOWN_NOT_EVIDENCED: Object.freeze({
    access_decision: "UNKNOWN_NOT_EVIDENCED",
    authorized: false,
    description: "Unknown actor, role, permission, or resource is denied.",
  }),
  ADMIN_SUPPORT_BYPASS_DENIED: Object.freeze({
    access_decision: "ADMIN_SUPPORT_BYPASS_DENIED",
    authorized: false,
    description: "Admin/support categories cannot bypass no-raw constraints.",
  }),
  ROUTE_CASE_CAPABILITY_OVERCLAIM_DENIED: Object.freeze({
    access_decision: "ROUTE_CASE_CAPABILITY_OVERCLAIM_DENIED",
    authorized: false,
    description: "Route, case, or capability evidence cannot become RBAC or authorization.",
  }),
  HUMAN_PROFESSIONAL_REVIEW_NOT_SYSTEM_APPROVAL: Object.freeze({
    access_decision: "HUMAN_PROFESSIONAL_REVIEW_NOT_SYSTEM_APPROVAL",
    authorized: false,
    description: "Human/professional review remains required and is not system approval.",
  }),
});

const adminSupportDeniedActionCategories = Object.freeze([
  "NO_RAW_CONSTRAINT_BYPASS",
  "RELEASE_APPROVAL",
  "EXTERNAL_USE",
  "PRODUCT_CANDIDATE_SELECTION",
  "PUBLIC_AUTHORITY_DISCLOSURE",
  "COURT_USE",
  "LAW_ENFORCEMENT_USE",
]);

const routeCaseCapabilityOverclaimRegistry = Object.freeze({
  ROUTE_CASE_CAPABILITY_NOT_FULL_RBAC: Object.freeze({
    claim_category: "ROUTE_CASE_CAPABILITY_NOT_FULL_RBAC",
    allowed: false,
    description: "Route, case, or capability evidence cannot become full RBAC.",
  }),
  ROUTE_CASE_CAPABILITY_NOT_FULL_ACCESS_CONTROL: Object.freeze({
    claim_category: "ROUTE_CASE_CAPABILITY_NOT_FULL_ACCESS_CONTROL",
    allowed: false,
    description: "Route, case, or capability evidence cannot become full access control.",
  }),
  ROUTE_CASE_CAPABILITY_NOT_ADMIN_SUPPORT_ACCESS_CONTROL: Object.freeze({
    claim_category: "ROUTE_CASE_CAPABILITY_NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
    allowed: false,
    description: "Route, case, or capability evidence cannot become admin/support access control.",
  }),
  ROUTE_CASE_CAPABILITY_NOT_GLOBAL_AUTHORIZATION: Object.freeze({
    claim_category: "ROUTE_CASE_CAPABILITY_NOT_GLOBAL_AUTHORIZATION",
    allowed: false,
    description: "Route, case, or capability evidence cannot become global authorization.",
  }),
});

function hasRegistryEntry(registry, key) {
  return Object.prototype.hasOwnProperty.call(registry, key);
}

function deriveRbacDenyByDefaultAccessDecision(input = {}) {
  const actorKnown = hasRegistryEntry(actorTypeRegistry, input.actor_type);
  const roleKnown = hasRegistryEntry(roleCategoryRegistry, input.role_category);
  const permissionKnown = hasRegistryEntry(
    permissionCategoryRegistry,
    input.permission_category,
  );
  const resourceKnown = hasRegistryEntry(
    resourceMaterialScopeRegistry,
    input.resource_material_scope,
  );
  const accessDecision =
    actorKnown && roleKnown && permissionKnown && resourceKnown
      ? "ACCESS_DENIED_BY_DEFAULT"
      : "UNKNOWN_NOT_EVIDENCED";

  return Object.freeze({
    actor_type: actorKnown ? input.actor_type : "UNKNOWN_ACTOR_TYPE",
    role_category: roleKnown ? input.role_category : "UNKNOWN_ROLE_CATEGORY",
    permission_category: permissionKnown
      ? input.permission_category
      : "UNKNOWN_PERMISSION_CATEGORY",
    resource_material_scope: resourceKnown
      ? input.resource_material_scope
      : "UNKNOWN_RESOURCE_MATERIAL_SCOPE",
    access_decision: accessDecision,
    authorized: false,
    category_only: true,
    human_professional_review_required: true,
    human_professional_review_is_system_approval: false,
    non_authorizations: Object.freeze([
      "NO_RAW_PRIVATE_SOURCE_MATERIAL_ACCESS",
      "NO_SOURCE_PACKAGE_ACCESS",
      "NO_PDF_IMAGE_SCREENSHOT_METADATA_ACCESS",
      "NO_THIRD_PARTY_MODEL_API_ROUTING",
      "NO_ADMIN_SUPPORT_BYPASS",
      "NO_RELEASE_APPROVAL",
      "NO_EXTERNAL_USE_AUTHORIZATION",
      "NO_PRODUCT_CANDIDATE_SELECTION",
      "NO_PUBLIC_AUTHORITY_DISCLOSURE",
      "NO_COURT_USE",
      "NO_LAW_ENFORCEMENT_USE",
      "NO_RUNTIME_AUTHORIZATION",
      "NO_FULL_RBAC",
      "NO_FULL_ACCESS_CONTROL",
    ]),
  });
}

function deriveAdminSupportNonBypassDecision(actionCategory) {
  const actionKnown = adminSupportDeniedActionCategories.includes(actionCategory);

  return Object.freeze({
    action_category: actionKnown ? actionCategory : "UNKNOWN_ADMIN_SUPPORT_ACTION",
    access_decision: "ADMIN_SUPPORT_BYPASS_DENIED",
    authorized: false,
    category_only: true,
    admin_support_bypass_allowed: false,
    release_approved: false,
    external_use_authorized: false,
    product_candidate_selected: false,
    public_authority_disclosure_authorized: false,
    court_use_authorized: false,
    law_enforcement_use_authorized: false,
    human_professional_review_required: true,
  });
}

function evaluateRouteCaseCapabilityNonOverclaim(claimCategory) {
  const claimKnown = hasRegistryEntry(routeCaseCapabilityOverclaimRegistry, claimCategory);

  return Object.freeze({
    claim_category: claimKnown ? claimCategory : "UNKNOWN_ROUTE_CASE_CAPABILITY_CLAIM",
    access_decision: "ROUTE_CASE_CAPABILITY_OVERCLAIM_DENIED",
    allowed: false,
    category_only: true,
    full_rbac_created: false,
    full_access_control_created: false,
    admin_support_access_control_created: false,
    global_authorization_created: false,
  });
}

module.exports = {
  accessDecisionRegistry,
  actorTypeRegistry,
  adminSupportDeniedActionCategories,
  deriveAdminSupportNonBypassDecision,
  deriveRbacDenyByDefaultAccessDecision,
  evaluateRouteCaseCapabilityNonOverclaim,
  permissionCategoryRegistry,
  resourceMaterialScopeRegistry,
  roleCategoryRegistry,
  routeCaseCapabilityOverclaimRegistry,
};
