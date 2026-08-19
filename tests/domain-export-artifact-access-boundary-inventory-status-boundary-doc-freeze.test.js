const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_EXPORT_ARTIFACT_ACCESS_BOUNDARY_INVENTORY_STATUS_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function assertIncludesAll(values) {
  for (const value of values) {
    assert.match(docsText, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
}

function assertTableRow(category, status, evidence, limitation, unresolved) {
  assertIncludesAll([
    `| ${category} | \`${status}\` | ${evidence} | ${limitation} | ${unresolved} |`,
  ]);
}

test("export/artifact access boundary inventory status doc exists and freezes status-only posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "EXPORT_ARTIFACT_ACCESS_BOUNDARY_INVENTORY_STATUS_BOUNDARY",
    "DOCS_ONLY",
    "EXPORT_ARTIFACT_ACCESS_BOUNDARY_STATUS_ONLY",
    "This boundary freezes export/artifact access-boundary inventory status only.",
    "It does not create a security finding.",
    "It does not create a vulnerability finding.",
    "It does not assign severity.",
    "It does not recommend or implement remediation.",
    "It does not resolve export/artifact/download blockers.",
    "It does not create implementation evidence.",
    "It does not change runtime/API/schema/package behavior.",
    "The complete export/artifact/download threat model remains not evidenced.",
  ]);
});

test("all required current status tokens appear", () => {
  assertIncludesAll([
    "EXPORT_PACKAGE_ROUTE_ENTRY_POINTS_SUPPORTED_BY_IMPLEMENTATION_AND_TEST",
    "EXPORT_PACKAGE_READ_WRITE_REFRESH_HELPERS_SUPPORTED_BY_IMPLEMENTATION_ONLY",
    "MANIFEST_ROUTES_ARTIFACT_ACCESS_SUPPORTED_BY_IMPLEMENTATION_AND_TEST",
    "ARTIFACT_ROUTES_SUPPORTED_BY_IMPLEMENTATION_AND_TEST",
    "ARTIFACT_DOWNLOAD_ROUTES_SUPPORTED_BY_IMPLEMENTATION_AND_TEST",
    "BUNDLE_ARCHIVE_ROUTES_SUPPORTED_BY_IMPLEMENTATION_AND_TEST",
    "JSON_MARKDOWN_PDF_DOCX_HELPERS_SUPPORTED_BY_IMPLEMENTATION_AND_TEST",
    "CURRENTNESS_FRESHNESS_CHECKS_SUPPORTED_BY_IMPLEMENTATION_AND_TEST",
    "CASE_TENANT_AUTHORIZATION_SUPPORTED_BY_IMPLEMENTATION_AND_TEST",
    "CAPABILITY_GATES_SUPPORTED_BY_IMPLEMENTATION_ONLY",
    "ROLE_RESTRICTIONS_BEYOND_TENANT_CASE_CAPABILITY_PARTIAL_ONLY",
    "ADMIN_SUPPORT_OVERRIDE_PATHS_UNKNOWN_NOT_EVIDENCED",
    "GENERATED_PDF_AS_REPO_EVIDENCE_DOCS_ONLY_BOUNDARY",
    "GENERATED_LOGS_AS_EVIDENCE_COMPONENT_DOCS_ONLY_BOUNDARY",
    "PACKET_COMPONENT_APPROVAL_DOCS_ONLY_BOUNDARY",
    "DELIVERY_FINAL_DECISION_DOCS_ONLY_BOUNDARY",
    "EXTERNAL_USE_PRODUCT_CANDIDATE_DOCS_ONLY_BOUNDARY",
    "DATABASE_PERSISTENCE_CASE_KEYED_ONLY",
    "TENANT_SCOPED_DB_PERSISTENCE_NOT_PROVEN",
    "SCHEMA_VALIDATOR_EXPORT_ARTIFACT_CONTRIBUTION_PARTIAL_ONLY",
    "ALLOWED_EXPORT_ARTIFACT_ACCESS_TESTS_PARTIAL_ONLY",
    "DENIED_EXPORT_ARTIFACT_ACCESS_TESTS_PARTIAL_ONLY",
    "STALE_NON_CURRENT_ARTIFACT_TESTS_PARTIAL_ONLY",
    "WRONG_TENANT_CASE_TESTS_PARTIAL_ONLY",
    "COMPLETE_EXPORT_ARTIFACT_DOWNLOAD_THREAT_MODEL_UNKNOWN_NOT_EVIDENCED",
    "REMAINING_UNKNOWN_BLOCKERS_EXPLICITLY_UNRESOLVED",
    "EXPORT_ARTIFACT_ROUTE_EVIDENCE_NOT_DELIVERY_APPROVAL",
    "EXPORT_ARTIFACT_ROUTE_EVIDENCE_NOT_PACKET_COMPONENT_APPROVAL",
    "EXPORT_ARTIFACT_ROUTE_EVIDENCE_NOT_EXTERNAL_USE_READINESS",
    "TENANT_CASE_CAPABILITY_CHECKS_NOT_ROLE_PERMISSION_MODEL",
    "LOCAL_LOGS_NOT_CI_EVIDENCE",
    "GENERATED_PDFS_NOT_REPO_EVIDENCE",
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

test("all 25 inventory categories are row-scoped with status, evidence, limitation, and unresolved posture", () => {
  assertTableRow("Export package route entry points", "SUPPORTED_BY_TRACKED_IMPLEMENTATION_AND_TEST", "latest + refresh routes exist", "does not prove complete threat model", "yes");
  assertTableRow("Export package read/write/refresh helpers", "SUPPORTED_BY_TRACKED_IMPLEMENTATION_ONLY", "case-keyed latest/projection/persist/refresh helpers exist", "does not prove tenant-scoped DB model", "yes");
  assertTableRow("Manifest routes/artifact access", "SUPPORTED_BY_TRACKED_IMPLEMENTATION_AND_TEST", "manifest latest/refresh route family exists", "does not prove packet approval", "yes");
  assertTableRow("Artifact routes", "SUPPORTED_BY_TRACKED_IMPLEMENTATION_AND_TEST", "JSON/Markdown/PDF/DOCX latest routes exist", "does not prove delivery approval", "yes");
  assertTableRow("Artifact download routes", "SUPPORTED_BY_TRACKED_IMPLEMENTATION_AND_TEST", "download routes exist", "does not prove external-use approval", "yes");
  assertTableRow("Bundle/archive routes", "SUPPORTED_BY_TRACKED_IMPLEMENTATION_AND_TEST", "latest/refresh/download archive routes exist", "does not prove packet/archive approval", "yes");
  assertTableRow("JSON/Markdown/PDF/DOCX helpers", "SUPPORTED_BY_TRACKED_IMPLEMENTATION_AND_TEST", "artifact refresh helpers exist", "does not prove access policy", "yes");
  assertTableRow("Currentness/freshness checks", "SUPPORTED_BY_TRACKED_IMPLEMENTATION_AND_TEST", "downloads reject non-current snapshots", "does not prove full stale-state threat model", "yes");
  assertTableRow("Case/tenant authorization", "SUPPORTED_BY_TRACKED_IMPLEMENTATION_AND_TEST", "`auth.tenantId` and case tenant match gate", "does not prove full auth/session model", "yes");
  assertTableRow("Capability gates", "SUPPORTED_BY_TRACKED_IMPLEMENTATION_ONLY", "profile capability gates exist", "does not prove RBAC/user permissions", "yes");
  assertTableRow("Role restrictions beyond tenant/case/capability", "PARTIAL_DOCS_OR_TEST_EVIDENCE", "routes use capability gates", "does not prove role restrictions", "yes");
  assertTableRow("Admin/support override paths", "UNKNOWN_NOT_EVIDENCED", "unresolved status preserved", "does not prove absence outside searched scope", "yes");
  assertTableRow("Generated PDF as repo evidence", "DOCS_ONLY_BOUNDARY", "docs block treating generated PDF as repo evidence/component", "does not prove runtime enforcement", "yes");
  assertTableRow("Generated logs as evidence/component", "DOCS_ONLY_BOUNDARY", "local logs not CI evidence/packet components", "does not prove runtime enforcement", "yes");
  assertTableRow("Packet-component approval", "DOCS_ONLY_BOUNDARY", "not approved in docs", "does not prove runtime approval system", "yes");
  assertTableRow("Delivery/final-decision", "DOCS_ONLY_BOUNDARY", "delivery/final decision not created", "does not prove runtime gate", "yes");
  assertTableRow("External-use/product-candidate", "DOCS_ONLY_BOUNDARY", "none/unauthorized posture", "does not prove runtime enforcement", "yes");
  assertTableRow("DB persistence", "SUPPORTED_BY_TRACKED_IMPLEMENTATION_ONLY", "case-keyed snapshot stores exist", "does not prove tenant DB scoping", "yes");
  assertTableRow("Schema/validator contribution", "PARTIAL_DOCS_OR_TEST_EVIDENCE", "validators enforce shape/currentness", "does not prove access policy", "yes");
  assertTableRow("Allowed access tests", "PARTIAL_DOCS_OR_TEST_EVIDENCE", "representative happy paths", "does not prove exhaustive matrix", "yes");
  assertTableRow("Denied access tests", "PARTIAL_DOCS_OR_TEST_EVIDENCE", "tenant/case denial examples", "does not prove full denial suite", "yes");
  assertTableRow("Stale/non-current tests", "PARTIAL_DOCS_OR_TEST_EVIDENCE", "stale download branches exist", "does not prove exhaustive freshness model", "yes");
  assertTableRow("Wrong tenant/case tests", "PARTIAL_DOCS_OR_TEST_EVIDENCE", "representative coverage", "does not prove global BOLA/IDOR", "yes");
  assertTableRow("Complete export/artifact threat model", "UNKNOWN_NOT_EVIDENCED", "explicit partial status", "does not prove complete model", "yes");
  assertTableRow("Remaining unknowns/blockers", "EXPLICITLY_UNRESOLVED", "unresolved posture preserved", "does not prove blocker resolution", "yes");
});

test("required evidence references and limitations are explicit", () => {
  assertIncludesAll([
    "apps/api/src/index.js",
    "packages/database/src/index.js",
    "packages/schemas/src/index.js",
    "packages/governance/src/jurisdiction-profile-registry.js",
    "tests/export-package-api.test.js",
    "tests/export-package-refresh-api.test.js",
    "tests/export-package-bundle-manifest-api.test.js",
    "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
    "This evidence does not prove role restrictions beyond tenant/case/capability",
    "admin/support override paths",
    "runtime packet approval",
    "runtime delivery/final-decision gates",
    "runtime external-use/product-candidate enforcement",
    "tenant-scoped DB persistence beyond case-keyed storage",
    "complete export/artifact/download threat model",
  ]);
});

test("non-proof and no-overclaim rules are preserved", () => {
  assertIncludesAll([
    "export/artifact access-boundary inventory status boundary is not a security assessment finding",
    "export/artifact access-boundary inventory status boundary is not a vulnerability finding",
    "export/artifact access-boundary inventory status boundary assigns no severity",
    "export/artifact access-boundary inventory status boundary recommends no remediation",
    "export/artifact route evidence is not delivery approval",
    "export/artifact route evidence is not packet-component approval",
    "export/artifact route evidence is not external-use readiness",
    "tenant/case/capability checks are not role-permission controls",
    "generated PDFs are not repo evidence unless separately reviewed and approved",
    "local logs are not CI evidence",
    "packet-component approval remains separate",
    "delivery/final-decision remains separate",
    "external-use/product-candidate authorization remains separate",
    "absence of found evidence is not proof of absence outside searched tracked repo scope",
    "no export/artifact blocker is resolved by this boundary",
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
    "PROVE_ONLY_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY",
    "PROVE_ONLY_DELIVERY_PACKET_COMPONENT_RUNTIME_BOUNDARY_INVENTORY",
    "DOCS_ONLY_EXPORT_ARTIFACT_ACCESS_STATUS_AND_GAP_SUMMARY",
    "continued pause",
    "None are authorized by this boundary.",
  ]);
});

test("document contains no raw/private or active conclusion material outside blocked wording", () => {
  assertIncludesAll([
    "This boundary contains no raw/private source material.",
    "This boundary contains no source package material.",
    "blocked-category or forbidden-category wording only",
  ]);
  assert.doesNotMatch(docsText, /\braw private material included\b/i);
  assert.doesNotMatch(docsText, /\bsource package included\b/i);
  assert.doesNotMatch(docsText, /\bcase truth found\b/i);
  assert.doesNotMatch(docsText, /\bsecurity finding:\b/i);
  assert.doesNotMatch(docsText, /\bvulnerability finding:\b/i);
  assert.doesNotMatch(docsText, /\bseverity:\s+(critical|high|medium|low)\b/i);
});
