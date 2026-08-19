const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function assertIncludesAll(values) {
  for (const value of values) {
    assert.match(docsText, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
}

test("role-permission surface inventory status boundary doc exists and freezes status-only posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY",
    "DOCS_ONLY",
    "ROLE_PERMISSION_SURFACE_STATUS_ONLY",
    "This boundary freezes role-permission surface inventory status only.",
    "It does not create a security finding.",
    "It does not create a vulnerability finding.",
    "It does not assign severity.",
    "It does not recommend or implement remediation.",
    "It does not resolve role-permission blockers.",
    "It does not create implementation evidence.",
    "It does not change runtime/API/schema/package behavior.",
  ]);
});

test("all required role-permission status tokens appear", () => {
  assertIncludesAll([
    "REQUEST_AUTH_ROLE_PERMISSION_FIELDS_NOT_FOUND",
    "REQUEST_AUTH_TENANT_ID_ONLY_EVIDENCED",
    "LOAD_AUTHORIZED_CASE_CONTEXT_ROLE_ENFORCEMENT_NOT_EVIDENCED",
    "LOAD_AUTHORIZED_CASE_CONTEXT_TENANT_CASE_CAPABILITY_ONLY",
    "CAPABILITY_GATES_NOT_RBAC",
    "ROLE_FIELDS_IN_CODE_SCHEMAS_NOT_FOUND",
    "PERMISSION_FIELDS_IN_CODE_SCHEMAS_NOT_FOUND",
    "ADMIN_SUPPORT_ACCESS_PATHS_UNKNOWN_NOT_EVIDENCED",
    "ROUTE_LEVEL_ROLE_CHECKS_NOT_FOUND",
    "FUNCTION_LEVEL_ROLE_CHECKS_NOT_FOUND",
    "OBJECT_LEVEL_ROLE_CHECKS_BEYOND_CASE_CONTEXT_NOT_GLOBALLY_EVIDENCED",
    "EXPORT_ARTIFACT_DOWNLOAD_ROLE_RESTRICTIONS_PARTIAL_ONLY",
    "DATABASE_ROLE_PERMISSION_FIELDS_NOT_FOUND",
    "ROLE_BASED_ALLOWED_ACCESS_TESTS_NOT_FOUND",
    "ROLE_BASED_DENIED_ACCESS_TESTS_NOT_FOUND",
    "ADMIN_SUPPORT_BYPASS_TESTS_NOT_FOUND",
    "ROLE_PERMISSIONS_EXPLICITLY_UNRESOLVED",
    "ADMIN_SUPPORT_PATHS_UNRESOLVED",
    "GLOBAL_ACCESS_CONTROL_MODEL_UNRESOLVED",
    "ROLE_SCHEMA_DATABASE_FIELDS_UNRESOLVED",
    "TENANT_CASE_CAPABILITY_CHECKS_NOT_ROLE_PERMISSION_MODEL",
    "PARTIAL_ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_GLOBAL_ASSURANCE",
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "REAL_PRIVATE_RUN_NOT_STARTED",
    "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
    "SOURCE_PACKAGE_NOT_INSPECTED",
    "METADATA_NOT_ACQUIRED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
  ]);
});

test("inventory table includes the required 12 role-permission categories", () => {
  assertIncludesAll([
    "request.auth role/permission fields | `NOT_FOUND` | helper checks only `auth.tenantId` | does not prove full auth/session model | yes",
    "tenant/case/capability authorization | `SUPPORTED_BY_TRACKED_IMPLEMENTATION_AND_TEST` | tenant/case/capability helper path exists | does not prove global access-control assurance | yes",
    "capability gates vs RBAC | `SUPPORTED_BY_TRACKED_IMPLEMENTATION_ONLY` | profile capability flags exist | does not prove RBAC or user permissions | yes",
    "role fields in code/schemas | `NOT_FOUND` | no tracked role-field evidence in searched scope | does not prove absence outside searched scope | yes",
    "permission fields in code/schemas | `NOT_FOUND` | no tracked permission-field evidence in searched scope | does not prove absence outside searched scope | yes",
    "admin/support access paths | `UNKNOWN_NOT_EVIDENCED` | admin/support paths not evidenced | does not prove absence outside searched scope | yes",
    "route/function/object-level role checks | `NOT_FOUND` | route helper uses capability checks | does not prove role checks | yes",
    "export/artifact/download role restrictions | `PARTIAL_DOCS_OR_TEST_EVIDENCE` | artifact routes use helper/capability gates | does not prove role restriction beyond tenant/case/capability | yes",
    "database role/permission fields | `NOT_FOUND` | persisted records include case/profile data | does not prove user role/permission database fields | yes",
    "role-based tests | `NOT_FOUND` | no role-based allow/deny suite found in searched scope | does not prove absence outside searched scope | yes",
    "admin/support bypass tests | `NOT_FOUND` | no admin/support bypass tests found | does not prove absence outside searched scope | yes",
    "docs-only unresolved blockers | `EXPLICITLY_UNRESOLVED` | role permissions explicitly unresolved | does not prove implementation resolution | yes",
  ]);
});

test("tracked evidence references and role-permission limitations are explicit", () => {
  assertIncludesAll([
    "apps/api/src/index.js",
    "packages/governance/src/jurisdiction-profile-registry.js",
    "packages/governance/src/index.js",
    "packages/database/src/index.js",
    "tests/load-authorized-case-context-doc-freeze.test.js",
    "tests/jurisdiction-profile-registry-schema.test.js",
    "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY_v1.md",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
    "no tracked evidence that `request.auth` contains role or permission fields beyond `tenantId`",
    "`loadAuthorizedCaseContext` has documented implementation/test evidence for auth tenant checking, case-context loading, tenant/case denial, and profile capability gates only.",
    "Jurisdiction capabilities are profile capability gates.",
    "They are not evidenced as RBAC, user-role permissions, route-level role checks, function-level role checks, or admin/support access paths.",
    "That partial evidence does not prove role restriction beyond tenant/case/capability.",
  ]);
});

test("non-proof and no-overclaim rules preserve unresolved posture", () => {
  assertIncludesAll([
    "this boundary is not a security assessment finding",
    "this boundary is not a vulnerability finding",
    "this boundary assigns no severity",
    "this boundary recommends no remediation",
    "this boundary implements no remediation",
    "role-permission surface inventory status boundary is not a security assessment finding",
    "role-permission surface inventory status boundary is not a vulnerability finding",
    "role-permission surface inventory status boundary assigns no severity",
    "role-permission surface inventory status boundary recommends no remediation",
    "role permissions remain unresolved",
    "admin/support paths remain unresolved",
    "global access-control model remains unresolved",
    "role schema/database fields remain unresolved",
    "tenant/case/capability checks are not a role-permission model",
    "tenant/case/capability checks are not a full role-permission model",
    "capability gates are not evidenced as RBAC",
    "capability gates are not RBAC unless separately evidenced",
    "partial route/case/capability evidence is not global access-control assurance",
    "absence of found evidence is not proof of absence outside searched tracked repo scope",
    "role-permission absence in searched tracked repo evidence is not proof of absence outside searched scope",
    "no role-permission blocker is resolved by this boundary",
    "no runtime behavior changes by this boundary",
    "no API behavior changes by this boundary",
    "no schema behavior changes by this boundary",
    "no schema/API/package behavior changes by this boundary",
    "no package behavior changes by this boundary",
    "no product candidate is selected",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
  ]);
});

test("no-reopening and blocked-category guard remain explicit", () => {
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
    "runtime/API/schema/package behavior changes",
    "validator dispatch",
    "registry/lookup creation",
    "real private run",
    "raw/private material inspection",
    "source package inspection",
    "PDF/image/metadata/source package inspection",
    "metadata acquisition",
    "manifest instance creation",
    "test fixture instance creation",
    "actual source matrix creation",
    "log creation",
    "CI log creation",
    "artifact creation",
    "PDF/PDF packet/archive/ZIP creation",
    "delivery to External Reviewer",
    "final delivery decision",
    "packet component approval",
    "excluded private-review packet markdown update",
    "excluded private-review manifest update",
    "excluded private-review TOC update",
    "excluded private-review reference index update",
    "product-candidate selection",
    "external-use authorization",
    "release approval",
    "runtime certification",
    "technical sign-off",
    "External Reviewer approval",
    "legal/professional verification",
    "clinical review",
    "evidentiary proof",
    "case-truth conclusion",
    "credibility finding",
    "offence finding",
    "ownership finding",
    "risk score",
    "sufficiency score",
    "police-report language",
    "pleading language",
    "marker finding",
    "security finding",
    "vulnerability finding",
    "severity",
    "remediation recommendation",
    "remediation implementation",
    "None are authorized by this boundary.",
    "This boundary contains no raw/private source material.",
    "This boundary contains no source package material.",
    "blocked-category or forbidden-category wording only",
  ]);
  assert.doesNotMatch(docsText, /\bsecurity finding created\b/i);
  assert.doesNotMatch(docsText, /\bvulnerability finding created\b/i);
  assert.doesNotMatch(docsText, /\bseverity assigned\b/i);
  assert.doesNotMatch(docsText, /\bremediation recommended\b/i);
  assert.doesNotMatch(docsText, /\bremediation implemented\b/i);
  assert.doesNotMatch(docsText, /\bproduct candidate selected\b/i);
  assert.doesNotMatch(docsText, /SWE psykiskt vald legal modelling/);
});

test("next-slice posture is explicit and unauthorized", () => {
  assertIncludesAll([
    "The next possible safe slice may be:",
    "PROVE_ONLY_EXPORT_ARTIFACT_ACCESS_BOUNDARY_INVENTORY",
    "PROVE_ONLY_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY",
    "DOCS_ONLY_ROLE_PERMISSION_SURFACE_STATUS_AND_GAP_SUMMARY",
    "continued pause",
    "None are authorized by this boundary.",
  ]);
});
