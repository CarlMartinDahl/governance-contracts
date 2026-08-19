const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(values) {
  for (const value of values) {
    assert.match(docsText, new RegExp(escapeRegExp(value)));
  }
}

function assertTableRow(category, status, evidence, limitation, unresolved) {
  assertIncludesAll([
    `| ${category} | \`${status}\` | ${evidence} | ${limitation} | ${unresolved} |`,
  ]);
}

test("admin/support access surface inventory status doc exists and freezes status-only posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY",
    "DOCS_ONLY",
    "ADMIN_SUPPORT_ACCESS_SURFACE_STATUS_ONLY",
    "This boundary freezes admin/support access-surface inventory status only.",
    "It does not create a security finding.",
    "It does not create a vulnerability finding.",
    "It does not assign severity.",
    "It does not recommend or implement remediation.",
    "It does not resolve admin/support, role-permission, access-control, product, or external-use blockers.",
    "It does not create implementation evidence.",
    "It does not change runtime/API/schema/package behavior.",
    "Tenant/case/capability checks are not admin/support access control.",
    "Capability gates are not RBAC unless separately evidenced.",
    "Absence of found admin/support evidence is not proof of absence outside searched tracked repo scope.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "Human/professional review remains release gate.",
  ]);
});

test("all required current status tokens appear", () => {
  assertIncludesAll([
    "ADMIN_ROUTE_ENTRY_POINTS_NOT_FOUND",
    "SUPPORT_ROUTE_ENTRY_POINTS_NOT_FOUND",
    "INTERNAL_TOOLING_ROUTE_ENTRY_POINTS_NOT_FOUND",
    "REQUEST_AUTH_ADMIN_SUPPORT_FIELDS_NOT_FOUND",
    "REQUEST_AUTH_ROLE_PERMISSION_FIELDS_NOT_FOUND",
    "REQUEST_AUTH_TENANT_ID_ONLY_EVIDENCED",
    "ADMIN_SUPPORT_ROLE_FIELDS_IN_SCHEMAS_NOT_FOUND",
    "ADMIN_SUPPORT_PERMISSION_FIELDS_IN_SCHEMAS_NOT_FOUND",
    "ADMIN_SUPPORT_DATABASE_FIELDS_NOT_FOUND",
    "ADMIN_SUPPORT_ROUTE_LEVEL_CHECKS_PARTIAL_TENANT_CASE_CAPABILITY_ONLY",
    "ADMIN_SUPPORT_FUNCTION_LEVEL_CHECKS_PARTIAL_CAPABILITY_ONLY",
    "ADMIN_SUPPORT_OBJECT_LEVEL_CHECKS_PARTIAL_CASE_CONTEXT_ONLY",
    "ADMIN_SUPPORT_TENANT_OVERRIDE_PATHS_UNKNOWN_NOT_EVIDENCED",
    "ADMIN_SUPPORT_CASE_OVERRIDE_PATHS_UNKNOWN_NOT_EVIDENCED",
    "ADMIN_SUPPORT_BYPASS_EMERGENCY_ACCESS_NOT_FOUND",
    "ADMIN_SUPPORT_EXPORT_ARTIFACT_DOWNLOAD_ACCESS_PARTIAL_ONLY",
    "ADMIN_SUPPORT_DELIVERY_PACKET_ACCESS_DOCS_ONLY_BOUNDARY",
    "ADMIN_SUPPORT_ALLOWED_TESTS_NOT_FOUND",
    "ADMIN_SUPPORT_DENIED_TESTS_NOT_FOUND",
    "ADMIN_SUPPORT_BYPASS_PREVENTION_TESTS_NOT_FOUND",
    "ADMIN_SUPPORT_DOCS_ONLY_BLOCKERS_EXPLICITLY_UNRESOLVED",
    "COMPLETE_ADMIN_SUPPORT_ACCESS_THREAT_MODEL_UNKNOWN_NOT_EVIDENCED",
    "ADMIN_SUPPORT_REMAINING_UNKNOWN_BLOCKERS_EXPLICITLY_UNRESOLVED",
    "TENANT_CASE_CAPABILITY_CHECKS_NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
    "TENANT_CASE_CAPABILITY_CHECKS_NOT_ROLE_PERMISSION_MODEL",
    "CAPABILITY_GATES_NOT_RBAC",
    "ROLE_PERMISSIONS_EXPLICITLY_UNRESOLVED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "REAL_PRIVATE_RUN_NOT_STARTED",
    "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
    "SOURCE_PACKAGE_NOT_INSPECTED",
    "METADATA_NOT_ACQUIRED",
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
  ]);
});

test("all 21 inventory categories are row-scoped with status, evidence, limitation, and unresolved posture", () => {
  assertTableRow("Admin route entry points", "NOT_FOUND", "no tracked admin route found in searched scope", "not proof of absence outside searched scope", "yes");
  assertTableRow("Support route entry points", "NOT_FOUND", "no tracked support route found in searched scope", "not proof of absence outside searched scope", "yes");
  assertTableRow("Internal tooling route entry points", "NOT_FOUND", "no tracked internal tooling route found in searched scope", "not proof of absence outside searched scope", "yes");
  assertTableRow("request.auth admin/support fields", "NOT_FOUND", "helper checks `auth.tenantId` only", "does not prove full auth model", "yes");
  assertTableRow("Role fields in schemas", "NOT_FOUND", "prior tracked inventory found no role-field evidence", "not proof of absence outside searched scope", "yes");
  assertTableRow("Permission fields in schemas", "NOT_FOUND", "prior tracked inventory found no permission-field evidence", "not proof of absence outside searched scope", "yes");
  assertTableRow("Admin/support database fields", "NOT_FOUND", "no tracked admin/support DB fields found", "case-keyed tables do not prove admin/support DB model", "yes");
  assertTableRow("Admin/support route-level checks", "PARTIAL_DOCS_OR_TEST_EVIDENCE", "tenant/case/capability checks exist", "not admin/support or RBAC checks", "yes");
  assertTableRow("Admin/support function-level checks", "PARTIAL_DOCS_OR_TEST_EVIDENCE", "route families pass required capabilities", "not admin/support matrix", "yes");
  assertTableRow("Admin/support object-level checks", "PARTIAL_DOCS_OR_TEST_EVIDENCE", "case/profile matching appears in documented surfaces", "not global object authorization", "yes");
  assertTableRow("Admin/support tenant override paths", "UNKNOWN_NOT_EVIDENCED", "no concrete admin/support override path evidenced", "not proof of absence outside searched scope", "yes");
  assertTableRow("Admin/support case override paths", "UNKNOWN_NOT_EVIDENCED", "no concrete case override path evidenced", "not proof of absence outside searched scope", "yes");
  assertTableRow("Admin/support bypass or emergency access paths", "NOT_FOUND", "no bypass path evidenced", "not proof of absence outside searched scope", "yes");
  assertTableRow("Admin/support artifact/export/download access", "PARTIAL_DOCS_OR_TEST_EVIDENCE", "download/export routes use tenant/case/capability checks", "not admin/support-specific access", "yes");
  assertTableRow("Admin/support delivery/packet access", "DOCS_ONLY_BOUNDARY", "delivery-packet runtime boundary remains docs-only inventory", "no admin/support delivery gate evidenced", "yes");
  assertTableRow("Admin/support allowed-access tests", "NOT_FOUND", "no role/admin allowed-access suite found", "not proof of absence outside searched scope", "yes");
  assertTableRow("Admin/support denied-access tests", "NOT_FOUND", "no role/admin denied-access suite found", "not proof of absence outside searched scope", "yes");
  assertTableRow("Admin/support bypass-prevention tests", "NOT_FOUND", "no admin/support bypass-prevention test found", "not proof of absence outside searched scope", "yes");
  assertTableRow("Docs-only admin/support blockers", "EXPLICITLY_UNRESOLVED", "admin/support and role-permission blockers remain open", "blocker resolution not proven", "yes");
  assertTableRow("Complete admin/support access threat model", "UNKNOWN_NOT_EVIDENCED", "partial route/case/capability evidence only", "complete model not proven", "yes");
  assertTableRow("Remaining unknowns/blockers", "EXPLICITLY_UNRESOLVED", "boundary work remains needed", "no blocker resolved", "yes");
});

test("required evidence references appear", () => {
  assertIncludesAll([
    "apps/api/src/index.js",
    "packages/database/migrations/0001_case_profile_inputs.sql",
    "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DELIVERY_PACKET_COMPONENT_RUNTIME_BOUNDARY_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_EXPORT_ARTIFACT_ACCESS_BOUNDARY_INVENTORY_STATUS_BOUNDARY_v1.md",
    "Tracked implementation and test evidence supports tenant/case/capability checks on documented route surfaces only.",
    "This evidence does not prove admin route entry points",
    "support route entry points",
    "internal tooling route entry points",
    "admin/support delivery/packet access",
    "or a complete admin/support access threat model.",
  ]);
});

test("non-proof and no-overclaim rules are preserved", () => {
  assertIncludesAll([
    "admin/support access-surface inventory status boundary is not a security assessment finding",
    "admin/support access-surface inventory status boundary is not a vulnerability finding",
    "admin/support access-surface inventory status boundary assigns no severity",
    "admin/support access-surface inventory status boundary recommends no remediation",
    "tenant/case/capability checks are not admin/support access control",
    "tenant/case/capability checks are not a full role-permission model",
    "capability gates are not RBAC unless separately evidenced",
    "absence of found admin/support evidence is not proof of absence outside searched tracked repo scope",
    "no admin/support blocker is resolved by this boundary",
    "no role-permission blocker is resolved by this boundary",
    "no runtime behavior changes by this boundary",
    "no schema/API/package behavior changes by this boundary",
    "no product candidate is selected",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
  ]);
});

test("no-reopening rules and negative authorization checks remain explicit", () => {
  assertIncludesAll([
    "no manual External Reviewer delivery",
    "no PDF generation",
    "no PDF packet creation",
    "no archive/ZIP generation",
    "no packet component approval",
    "no excluded private-review packet markdown update",
    "no excluded private-review manifest update",
    "no excluded private-review TOC update",
    "no excluded private-review reference index update",
    "no generated PDF as repo evidence",
    "no generated PDF as packet component",
    "no committing local logs",
    "no local logs as CI evidence",
    "no runtime/API/schema/package behavior",
    "no validator dispatch",
    "no registry/lookup/generic dispatch",
    "no real private run",
    "no source inspection",
    "no metadata acquisition",
    "no source package inspection",
    "no actual matrix creation",
    "no manifest instance creation",
    "no test fixture instance creation",
    "no product-candidate selection",
    "no external-use readiness",
    "no release approval",
    "no runtime certification",
    "no technical sign-off",
    "no External Reviewer approval",
    "no legal/clinical/evidentiary/case-truth conclusions",
    "no security findings",
    "no vulnerability findings",
    "no severity",
    "no remediation",
    "no SWE bodelning",
    "no DK psykisk vold offence modelling",
    "no SWE psykiskt våld legal modelling",
    "no Nordic comparison",
  ]);

  assert.doesNotMatch(docsText, /\bruntime behavior changed\b/i);
  assert.doesNotMatch(docsText, /\bAPI behavior changed\b/i);
  assert.doesNotMatch(docsText, /\bschema behavior changed\b/i);
  assert.doesNotMatch(docsText, /\bpackage behavior changed\b/i);
  assert.doesNotMatch(docsText, /\bvalidator dispatch created\b/i);
  assert.doesNotMatch(docsText, /\bregistry lookup created\b/i);
  assert.doesNotMatch(docsText, /\breal private run started\b/i);
  assert.doesNotMatch(docsText, /\bsource inspection occurred\b/i);
  assert.doesNotMatch(docsText, /\bmetadata acquired\b/i);
  assert.doesNotMatch(docsText, /\bproduct candidate selected\b/i);
  assert.doesNotMatch(docsText, /\bexternal-use authorized\b/i);
  assert.doesNotMatch(docsText, /\brelease approval created\b/i);
  assert.doesNotMatch(docsText, /\bruntime certification created\b/i);
  assert.doesNotMatch(docsText, /\btechnical sign-off created\b/i);
  assert.doesNotMatch(docsText, /\bExternal Reviewer approval created\b/i);
  assert.doesNotMatch(docsText, /\blegal conclusion created\b/i);
  assert.doesNotMatch(docsText, /\bclinical conclusion created\b/i);
  assert.doesNotMatch(docsText, /\bevidentiary conclusion created\b/i);
  assert.doesNotMatch(docsText, /\bcase-truth conclusion created\b/i);
  assert.doesNotMatch(docsText, /\bsecurity finding created\b/i);
  assert.doesNotMatch(docsText, /\bvulnerability finding created\b/i);
  assert.doesNotMatch(docsText, /\bseverity assigned\b/i);
  assert.doesNotMatch(docsText, /\bremediation recommended\b/i);
  assert.doesNotMatch(docsText, /\bremediation implemented\b/i);
});

test("next-slice posture is explicit and unauthorized", () => {
  assertIncludesAll([
    "The next possible safe slice may be:",
    "DOCS_ONLY_ADMIN_SUPPORT_ACCESS_SURFACE_STATUS_AND_GAP_SUMMARY",
    "DOCS_ONLY_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_STATUS_AND_GAP_SUMMARY",
    "continued pause",
    "None are authorized by this boundary.",
  ]);
  assert.doesNotMatch(docsText, /\bnext slice is authorized\b/i);
});

test("document contains no raw/private or active conclusion material outside blocked wording", () => {
  assertIncludesAll([
    "This boundary contains no raw/private source material.",
    "This boundary contains no source package material.",
    "blocked-category or forbidden-category wording only",
  ]);
  assert.doesNotMatch(docsText, /\braw private material included\b/i);
  assert.doesNotMatch(docsText, /\bsource package included\b/i);
  assert.doesNotMatch(docsText, /\blegal conclusion:\b/i);
  assert.doesNotMatch(docsText, /\bclinical conclusion:\b/i);
  assert.doesNotMatch(docsText, /\bevidentiary conclusion:\b/i);
  assert.doesNotMatch(docsText, /\bcase-truth conclusion:\b/i);
});
