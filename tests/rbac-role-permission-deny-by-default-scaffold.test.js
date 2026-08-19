"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  accessDecisionRegistry,
  actorTypeRegistry,
  deriveAdminSupportNonBypassDecision,
  deriveRbacDenyByDefaultAccessDecision,
  evaluateRouteCaseCapabilityNonOverclaim,
  permissionCategoryRegistry,
  resourceMaterialScopeRegistry,
  roleCategoryRegistry,
  routeCaseCapabilityOverclaimRegistry,
} = require("../packages/governance/src/index.js");

test("RBAC scaffold exposes deny-only actor, role, permission, and resource categories", () => {
  assert.equal(actorTypeRegistry.ADMIN_OPERATOR_ACTOR.actor_type, "ADMIN_OPERATOR_ACTOR");
  assert.equal(roleCategoryRegistry.ADMIN_ROLE_CATEGORY.grants_access, false);
  assert.equal(roleCategoryRegistry.SUPPORT_ROLE_CATEGORY.grants_access, false);
  assert.equal(
    permissionCategoryRegistry.RAW_PRIVATE_SOURCE_MATERIAL_ACCESS.grants_access,
    false,
  );
  assert.equal(permissionCategoryRegistry.SOURCE_PACKAGE_ACCESS.grants_access, false);
  assert.equal(
    permissionCategoryRegistry.PDF_IMAGE_SCREENSHOT_METADATA_ACCESS.grants_access,
    false,
  );
  assert.equal(
    permissionCategoryRegistry.THIRD_PARTY_MODEL_API_ROUTING_PERMISSION.grants_access,
    false,
  );
  assert.equal(
    resourceMaterialScopeRegistry.RAW_PRIVATE_SOURCE_MATERIAL_SCOPE.grants_material_access,
    false,
  );
  assert.equal(accessDecisionRegistry.ACCESS_DENIED_BY_DEFAULT.authorized, false);
});

test("access decision helper denies all sensitive material and route scopes", () => {
  const deniedCombinations = [
    ["HUMAN_REVIEW_ROLE_CATEGORY", "RAW_PRIVATE_SOURCE_MATERIAL_ACCESS"],
    ["PROFESSIONAL_REVIEW_ROLE_CATEGORY", "SOURCE_PACKAGE_ACCESS"],
    ["ADMIN_ROLE_CATEGORY", "PDF_IMAGE_SCREENSHOT_METADATA_ACCESS"],
    ["SUPPORT_ROLE_CATEGORY", "THIRD_PARTY_MODEL_API_ROUTING_PERMISSION"],
  ];

  for (const [roleCategory, permissionCategory] of deniedCombinations) {
    const decision = deriveRbacDenyByDefaultAccessDecision({
      actor_type: "ADMIN_OPERATOR_ACTOR",
      role_category: roleCategory,
      permission_category: permissionCategory,
      resource_material_scope: "RAW_PRIVATE_SOURCE_MATERIAL_SCOPE",
    });

    assert.equal(decision.authorized, false);
    assert.equal(decision.access_decision, "ACCESS_DENIED_BY_DEFAULT");
    assert.equal(decision.category_only, true);
    assert.equal(decision.human_professional_review_required, true);
    assert.equal(decision.human_professional_review_is_system_approval, false);
    assert.ok(decision.non_authorizations.includes("NO_ADMIN_SUPPORT_BYPASS"));
    assert.ok(decision.non_authorizations.includes("NO_THIRD_PARTY_MODEL_API_ROUTING"));
    assert.ok(decision.non_authorizations.includes("NO_RELEASE_APPROVAL"));
    assert.ok(decision.non_authorizations.includes("NO_EXTERNAL_USE_AUTHORIZATION"));
  }
});

test("unknown actor, role, permission, or resource returns unknown-not-evidenced deny", () => {
  const decision = deriveRbacDenyByDefaultAccessDecision({
    actor_type: "UNKNOWN_SYNTHETIC_ACTOR",
    role_category: "UNKNOWN_SYNTHETIC_ROLE",
    permission_category: "UNKNOWN_SYNTHETIC_PERMISSION",
    resource_material_scope: "UNKNOWN_SYNTHETIC_RESOURCE",
  });

  assert.equal(decision.authorized, false);
  assert.equal(decision.access_decision, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(decision.actor_type, "UNKNOWN_ACTOR_TYPE");
  assert.equal(decision.role_category, "UNKNOWN_ROLE_CATEGORY");
  assert.equal(decision.permission_category, "UNKNOWN_PERMISSION_CATEGORY");
  assert.equal(decision.resource_material_scope, "UNKNOWN_RESOURCE_MATERIAL_SCOPE");
});

test("admin and support categories cannot bypass no-raw or authorization boundaries", () => {
  const deniedActions = [
    "NO_RAW_CONSTRAINT_BYPASS",
    "RELEASE_APPROVAL",
    "EXTERNAL_USE",
    "PRODUCT_CANDIDATE_SELECTION",
    "PUBLIC_AUTHORITY_DISCLOSURE",
    "COURT_USE",
    "LAW_ENFORCEMENT_USE",
  ];

  for (const actionCategory of deniedActions) {
    const decision = deriveAdminSupportNonBypassDecision(actionCategory);

    assert.equal(decision.authorized, false);
    assert.equal(decision.access_decision, "ADMIN_SUPPORT_BYPASS_DENIED");
    assert.equal(decision.admin_support_bypass_allowed, false);
    assert.equal(decision.release_approved, false);
    assert.equal(decision.external_use_authorized, false);
    assert.equal(decision.product_candidate_selected, false);
    assert.equal(decision.public_authority_disclosure_authorized, false);
    assert.equal(decision.court_use_authorized, false);
    assert.equal(decision.law_enforcement_use_authorized, false);
  }
});

test("route, case, and capability evidence cannot overclaim RBAC or authorization", () => {
  const claims = [
    "ROUTE_CASE_CAPABILITY_NOT_FULL_RBAC",
    "ROUTE_CASE_CAPABILITY_NOT_FULL_ACCESS_CONTROL",
    "ROUTE_CASE_CAPABILITY_NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
    "ROUTE_CASE_CAPABILITY_NOT_GLOBAL_AUTHORIZATION",
  ];

  for (const claimCategory of claims) {
    const result = evaluateRouteCaseCapabilityNonOverclaim(claimCategory);

    assert.equal(routeCaseCapabilityOverclaimRegistry[claimCategory].allowed, false);
    assert.equal(result.allowed, false);
    assert.equal(result.access_decision, "ROUTE_CASE_CAPABILITY_OVERCLAIM_DENIED");
    assert.equal(result.full_rbac_created, false);
    assert.equal(result.full_access_control_created, false);
    assert.equal(result.admin_support_access_control_created, false);
    assert.equal(result.global_authorization_created, false);
  }
});

test("RBAC scaffold outputs remain category-only and carry no raw payload fields", () => {
  const decision = deriveRbacDenyByDefaultAccessDecision({
    actor_type: "HUMAN_REVIEW_ACTOR",
    role_category: "HUMAN_REVIEW_ROLE_CATEGORY",
    permission_category: "CATEGORY_ONLY_REVIEW_PERMISSION",
    resource_material_scope: "CATEGORY_ONLY_SYNTHETIC_SCOPE",
  });
  const serialized = JSON.stringify(decision);

  assert.equal(decision.category_only, true);
  assert.equal(decision.authorized, false);
  assert.doesNotMatch(
    serialized,
    /raw_text|source_locator|private_path|url|token|secret|provider_payload|prompt|response/i,
  );
});
