const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function assertIncludesAll(values) {
  for (const value of values) {
    assert.match(docsText, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
}

test("access-control threat-model inventory status boundary doc exists and freezes status-only posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY",
    "DOCS_ONLY",
    "ACCESS_CONTROL_THREAT_MODEL_STATUS_ONLY",
    "This boundary freezes access-control threat-model inventory status only.",
    "It does not create a security finding.",
    "It does not create a vulnerability finding.",
    "It does not assign severity.",
    "It does not recommend remediation.",
    "It does not implement remediation.",
    "It does not resolve access-control blockers.",
    "It does not create implementation evidence.",
    "It does not change runtime/API/schema/package behavior.",
  ]);
});

test("all required status tokens appear", () => {
  assertIncludesAll([
    "AUTH_REQUEST_CONTEXT_PARTIAL_ONLY",
    "TENANT_ISOLATION_PARTIAL_ONLY",
    "CASE_CONTEXT_ACCESS_CONTROL_PARTIAL_ONLY",
    "CAPABILITY_GATES_PARTIAL_ONLY",
    "ROUTE_LEVEL_AUTHORIZATION_PARTIAL_ONLY",
    "OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_NOT_EVIDENCED",
    "FUNCTION_LEVEL_AUTHORIZATION_PARTIAL_ONLY",
    "PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_NOT_EVIDENCED",
    "ROLE_PERMISSIONS_UNRESOLVED",
    "ADMIN_SUPPORT_ACCESS_PATHS_NOT_EVIDENCED",
    "EXPORT_ARTIFACT_DOWNLOAD_BOUNDARIES_PARTIAL_ONLY",
    "DATABASE_QUERY_SCOPING_PARTIAL_ONLY",
    "SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL_ONLY",
    "ALLOWED_ACCESS_TEST_COVERAGE_PARTIAL_ONLY",
    "DENIED_ACCESS_TEST_COVERAGE_PARTIAL_ONLY",
    "CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL_ONLY",
    "COMPLETE_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_NOT_EVIDENCED",
    "CI_SECURITY_AUDIT_EVIDENCE_NOT_EVIDENCED",
    "DOCUMENTED_ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_GLOBAL_ASSURANCE",
    "LOAD_AUTHORIZED_CASE_CONTEXT_PARTIAL_IMPLEMENTATION_TEST_EVIDENCE_ONLY",
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
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
  ]);
});

test("inventory table includes all categories with required statuses and limitations", () => {
  assertIncludesAll([
    "Authentication / request auth context | `PARTIAL` | `auth.tenantId` required for documented helper path | Does not prove full session/auth model. | yes",
    "Tenant isolation | `PARTIAL` | Tenant/case mismatch denial for documented surfaces | Does not prove global tenant model. | yes",
    "Case-context access control | `PARTIAL` | Case context gate exists | Does not prove object-wide policy. | yes",
    "Capability gates | `PARTIAL` | Route-required capability check | Does not prove role permission model. | yes",
    "Route-level authorization coverage | `PARTIAL` | Helper call sites and documented route families | Does not prove complete route threat model. | yes",
    "Object-level / BOLA / IDOR | `NOT_EVIDENCED_GLOBALLY` | Some case-id guarded routes only | Does not prove full BOLA/IDOR analysis. | yes",
    "Function-level authorization | `PARTIAL` | Capability per route family | Does not prove function permission matrix. | yes",
    "Property-level / data overexposure | `NOT_EVIDENCED_GLOBALLY` | Schema surfaces exist | Does not prove overexposure review. | yes",
    "Role permissions | `UNRESOLVED` | Unresolved status preserved | Does not prove role implementation. | yes",
    "Admin/support access paths | `NOT_EVIDENCED` | No concrete tracked admin/support access model found in scope | Does not prove absence outside searched scope. | yes",
    "Export/artifact/download boundaries | `PARTIAL` | Download routes gated and observed | Does not prove external-use or delivery approval. | yes",
    "Database query scoping | `PARTIAL` | Storage keyed by `caseId` | Does not prove tenant scoping in persistence layer. | yes",
    "Schema/validator contribution | `PARTIAL` | Exported validators evidenced | Does not prove access-control policy. | yes",
    "Allowed-access tests | `PARTIAL` | Representative happy paths for documented surfaces | Does not prove exhaustive allowed matrix. | yes",
    "Denied-access tests | `PARTIAL` | Tenant denial examples | Does not prove full denial suite. | yes",
    "Cross-tenant/wrong-case tests | `PARTIAL` | Cross-tenant examples | Does not prove global wrong-case coverage. | yes",
    "Missing global access-control threat model | `NOT_EVIDENCED` | Gap explicitly preserved | Does not prove complete model. | yes",
    "Missing CI/security audit evidence | `NOT_EVIDENCED` | CI/security-audit limits preserved | Does not prove CI/security assurance. | yes",
    "Remaining unknowns/blockers | `UNRESOLVED` | Data-handling blockers listed | Does not prove blocker resolution. | yes",
  ]);
});

test("required evidence references and partial helper evidence appear", () => {
  assertIncludesAll([
    "apps/api/src/index.js",
    "tests/api-error-envelope-doc-freeze.test.js",
    "tests/load-authorized-case-context-doc-freeze.test.js",
    "tests/profile-input-api.test.js",
    "tests/release-eval-run-api.test.js",
    "tests/export-package-api.test.js",
    "tests/profile-input-adapter-registry.test.js",
    "packages/database/src/index.js",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_STATIC_SECURITY_CONTROL_OBSERVATION_REPORT_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY_v1.md",
    "`loadAuthorizedCaseContext` has partial implementation/test evidence only.",
    "Documented route/case/capability access-control evidence remains partial and limited.",
    "Partial route/case/capability evidence is not a complete global access-control model.",
    "A complete global access-control threat model remains not evidenced.",
    "CI/security-audit limits preserved",
  ]);
});

test("non-proof and no-overclaim rules appear", () => {
  assertIncludesAll([
    "access-control inventory status boundary is not a security assessment finding",
    "access-control inventory status boundary is not a vulnerability finding",
    "access-control inventory status boundary assigns no severity",
    "access-control inventory status boundary recommends no remediation",
    "partial route/case/capability evidence is not global access-control assurance",
    "route/case tests are not complete threat-model evidence",
    "helper call sites are not complete route authorization coverage",
    "case-id checks are not full BOLA/IDOR analysis",
    "schema validators are not access-control policy",
    "storage keyed by caseId is not tenant-scoped persistence proof",
    "absence of found evidence is not proof of absence outside searched tracked repo scope",
    "no access-control blocker is resolved by this boundary",
    "no runtime behavior changes by this boundary",
    "no schema/API/package behavior changes by this boundary",
    "no product candidate is selected",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
  ]);
});

test("no-reopening rules and next-slice posture appear without authorization", () => {
  assertIncludesAll([
    "manual External Reviewer delivery",
    "PDF generation",
    "PDF packet creation",
    "archive/ZIP generation",
    "packet component approval",
    "excluded private-review packet markdown update",
    "excluded private-review manifest update",
    "excluded private-review TOC update",
    "excluded private-review reference index update",
    "generated PDF as repo evidence",
    "generated PDF as packet component",
    "committing local logs",
    "local logs as CI evidence",
    "runtime/API/schema/package behavior",
    "validator dispatch",
    "registry/lookup/generic dispatch",
    "real private run",
    "source inspection",
    "metadata acquisition",
    "source package inspection",
    "actual matrix creation",
    "manifest instance creation",
    "test fixture instance creation",
    "product-candidate selection",
    "external-use readiness",
    "release approval",
    "runtime certification",
    "technical sign-off",
    "External Reviewer approval",
    "legal/clinical/evidentiary/case-truth conclusions",
    "security findings",
    "vulnerability findings",
    "severity",
    "remediation",
    "SWE bodelning",
    "DK psykisk vold offence modelling",
    "no SWE psykiskt våld legal modelling",
    "Nordic comparison",
    "PROVE_ONLY_ROLE_PERMISSION_SURFACE_INVENTORY",
    "PROVE_ONLY_EXPORT_ARTIFACT_ACCESS_BOUNDARY_INVENTORY",
    "DOCS_ONLY_ACCESS_CONTROL_THREAT_MODEL_STATUS_AND_GAP_SUMMARY",
    "continued pause",
    "None are authorized by this boundary.",
  ]);
});

test("negative authorization checks and raw/private/conclusion guard remain explicit", () => {
  assertIncludesAll([
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "REAL_PRIVATE_RUN_NOT_STARTED",
    "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
    "SOURCE_PACKAGE_NOT_INSPECTED",
    "METADATA_NOT_ACQUIRED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
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
  assert.doesNotMatch(docsText, /\bexternal-use authorized\b/i);
  assert.doesNotMatch(docsText, /\brelease approval created\b/i);
  assert.doesNotMatch(docsText, /\bruntime certification created\b/i);
  assert.doesNotMatch(docsText, /\btechnical sign-off created\b/i);
  assert.doesNotMatch(docsText, /\bExternal Reviewer approval created\b/i);
});
