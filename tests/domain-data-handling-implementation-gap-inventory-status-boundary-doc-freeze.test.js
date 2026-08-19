const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DATA_HANDLING_IMPLEMENTATION_GAP_INVENTORY_STATUS_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(values, text = docsText) {
  for (const value of values) {
    assert.match(text, new RegExp(escapeRegExp(value)));
  }
}

function assertDoesNotIncludeAny(values, text = docsText) {
  for (const value of values) {
    assert.doesNotMatch(text, new RegExp(escapeRegExp(value), "i"));
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing start heading: ${startHeading}`);
  const end = docsText.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(end, -1, `missing end heading: ${endHeading}`);
  return docsText.slice(start, end);
}

function rowForCategory(category, table) {
  const row = table
    .split("\n")
    .find((line) => line.startsWith("| ") && line.includes(`| ${category} |`));
  assert.ok(row, `missing table row for category: ${category}`);
  return row;
}

const inventoryRows = [
  [
    "Retention policy implementation",
    "`EXPLICITLY_UNRESOLVED`",
    "blocker preserved in tracked data-handling boundary",
    "no implementation or policy sufficiency proven",
    "yes",
  ],
  [
    "Deletion / purge implementation",
    "`EXPLICITLY_UNRESOLVED`",
    "blocker preserved in tracked data-handling boundary",
    "no purge or erasure implementation proven",
    "yes",
  ],
  [
    "Encryption at rest evidence",
    "`EXPLICITLY_UNRESOLVED`",
    "no control evidence found in tracked scope",
    "no encryption-at-rest control proven",
    "yes",
  ],
  [
    "Encryption in transit evidence",
    "`UNKNOWN_NOT_EVIDENCED`",
    "encryption unresolved generally",
    "no transport/TLS enforcement proven",
    "yes",
  ],
  [
    "Formal audit logging implementation",
    "`EXPLICITLY_UNRESOLVED`",
    "no formal audit-log implementation found",
    "no audit-log runtime proven",
    "yes",
  ],
  [
    "Access logging implementation",
    "`UNKNOWN_NOT_EVIDENCED`",
    "local-log posture only",
    "no access-log runtime proven",
    "yes",
  ],
  [
    "Role-permission implementation",
    "`EXPLICITLY_UNRESOLVED` / `NOT_FOUND`",
    "tenant/case/capability only",
    "no RBAC or user permissions proven",
    "yes",
  ],
  [
    "Admin/support data access",
    "`UNKNOWN_NOT_EVIDENCED` / `NOT_FOUND`",
    "no tracked admin/support routes found",
    "not proof of absence outside searched scope",
    "yes",
  ],
  [
    "Raw-material routing implementation",
    "`EXPLICITLY_UNRESOLVED`",
    "routing not authorized/evidenced",
    "no routing implementation proven",
    "yes",
  ],
  [
    "Source-package inspection/routing",
    "`NOT_AUTHORIZED` / `DOCS_ONLY_BOUNDARY`",
    "inspection remains closed",
    "no routing implementation proven",
    "yes",
  ],
  [
    "Metadata acquisition/routing",
    "`DOCS_ONLY_BOUNDARY`",
    "schema/export/validator concepts only",
    "no acquisition/routing/runtime use proven",
    "yes",
  ],
  [
    "Third-party model/API provider status",
    "`EXPLICITLY_UNRESOLVED`",
    "provider status unresolved",
    "no provider evidence proven",
    "yes",
  ],
  [
    "Third-party model/API data routing",
    "`EXPLICITLY_UNRESOLVED`",
    "raw/private routing not authorized when status unknown",
    "no routing behavior proven",
    "yes",
  ],
  [
    "Data minimization / no-raw output",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "no-raw manifest contract/validator surface",
    "no broad runtime no-raw enforcement proven",
    "yes",
  ],
  [
    "Local logs handling",
    "`DOCS_ONLY_BOUNDARY`",
    "local logs not CI/packet evidence posture",
    "no runtime enforcement proven",
    "yes",
  ],
  [
    "Generated PDF handling",
    "`DOCS_ONLY_BOUNDARY`",
    "generated PDFs not repo/packet evidence posture",
    "no runtime enforcement proven",
    "yes",
  ],
  [
    "Export/artifact data handling",
    "`SUPPORTED_BY_TRACKED_IMPLEMENTATION_AND_TEST`",
    "documented route mechanics, tenant/case/capability checks",
    "no delivery/external-use/full threat model proven",
    "yes",
  ],
  [
    "Database persistence data handling",
    "`SUPPORTED_BY_TRACKED_IMPLEMENTATION_ONLY`",
    "case-keyed persistence",
    "no tenant-scoped DB/security model proven",
    "yes",
  ],
  [
    "Schema/validator contribution to data handling",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "shape/status validation",
    "no complete access/data-handling policy proven",
    "yes",
  ],
  [
    "Tests for retention/deletion/encryption/audit",
    "`DOCS_ONLY_BOUNDARY`",
    "frozen unresolved posture",
    "no implementation behavior proven",
    "yes",
  ],
  [
    "Tests for role/admin/support data handling",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE` / `NOT_FOUND`",
    "route/case examples only",
    "no role/admin/support model proven",
    "yes",
  ],
  [
    "Tests for raw-material routing / no-raw",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "schema validator fixture behavior",
    "no raw-routing runtime proven",
    "yes",
  ],
  [
    "DOCS_ONLY data-handling blockers",
    "`DOCS_ONLY_BOUNDARY`",
    "blockers frozen",
    "no blocker resolution proven",
    "yes",
  ],
  [
    "Complete data-handling runtime threat model",
    "`UNKNOWN_NOT_EVIDENCED`",
    "gap preserved",
    "complete model not proven",
    "yes",
  ],
  [
    "Remaining unknowns/blockers",
    "`EXPLICITLY_UNRESOLVED`",
    "unresolved table preserved",
    "no resolution proven",
    "yes",
  ],
];

test("boundary doc exists and freezes docs-only status posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "Boundary name: `DATA_HANDLING_IMPLEMENTATION_GAP_INVENTORY_STATUS_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `DATA_HANDLING_IMPLEMENTATION_GAP_STATUS_ONLY`",
    "This boundary freezes data-handling implementation gap inventory status only.",
    "It does not create implementation evidence.",
    "It does not change runtime/API/schema/package behavior.",
  ]);
});

test("all required current status tokens appear", () => {
  assertIncludesAll([
    "DATA_HANDLING_IMPLEMENTATION_GAP_INVENTORY_STATUS_BOUNDARY",
    "DOCS_ONLY",
    "DATA_HANDLING_IMPLEMENTATION_GAP_STATUS_ONLY",
    "RETENTION_IMPLEMENTATION_EXPLICITLY_UNRESOLVED",
    "DELETION_PURGE_IMPLEMENTATION_EXPLICITLY_UNRESOLVED",
    "ENCRYPTION_AT_REST_EXPLICITLY_UNRESOLVED",
    "ENCRYPTION_IN_TRANSIT_UNKNOWN_NOT_EVIDENCED",
    "FORMAL_AUDIT_LOGGING_EXPLICITLY_UNRESOLVED",
    "ACCESS_LOGGING_UNKNOWN_NOT_EVIDENCED",
    "ROLE_PERMISSION_IMPLEMENTATION_EXPLICITLY_UNRESOLVED",
    "ROLE_PERMISSION_IMPLEMENTATION_NOT_FOUND",
    "ADMIN_SUPPORT_DATA_ACCESS_UNKNOWN_NOT_EVIDENCED",
    "ADMIN_SUPPORT_DATA_ACCESS_NOT_FOUND",
    "RAW_MATERIAL_ROUTING_EXPLICITLY_UNRESOLVED",
    "SOURCE_PACKAGE_INSPECTION_ROUTING_NOT_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_ROUTING_DOCS_ONLY_BOUNDARY",
    "METADATA_ACQUISITION_ROUTING_DOCS_ONLY_BOUNDARY",
    "THIRD_PARTY_MODEL_API_PROVIDER_STATUS_EXPLICITLY_UNRESOLVED",
    "THIRD_PARTY_MODEL_API_DATA_ROUTING_EXPLICITLY_UNRESOLVED",
    "DATA_MINIMIZATION_NO_RAW_OUTPUT_PARTIAL_DOCS_OR_TEST_EVIDENCE",
    "LOCAL_LOGS_HANDLING_DOCS_ONLY_BOUNDARY",
    "GENERATED_PDF_HANDLING_DOCS_ONLY_BOUNDARY",
    "EXPORT_ARTIFACT_DATA_HANDLING_NARROW_IMPLEMENTATION_AND_TEST",
    "DATABASE_PERSISTENCE_DATA_HANDLING_IMPLEMENTATION_ONLY",
    "SCHEMA_VALIDATOR_DATA_HANDLING_PARTIAL_DOCS_OR_TEST_EVIDENCE",
    "RETENTION_DELETION_ENCRYPTION_AUDIT_TESTS_DOCS_ONLY_BOUNDARY",
    "ROLE_ADMIN_SUPPORT_DATA_HANDLING_TESTS_PARTIAL_OR_NOT_FOUND",
    "RAW_MATERIAL_ROUTING_NO_RAW_TESTS_PARTIAL_DOCS_OR_TEST_EVIDENCE",
    "DOCS_ONLY_DATA_HANDLING_BLOCKERS_PRESERVED",
    "COMPLETE_DATA_HANDLING_RUNTIME_THREAT_MODEL_UNKNOWN_NOT_EVIDENCED",
    "DATA_HANDLING_REMAINING_UNKNOWN_BLOCKERS_EXPLICITLY_UNRESOLVED",
    "DOCS_ONLY_DATA_HANDLING_BLOCKERS_ARE_NOT_RUNTIME_ENFORCEMENT",
    "ROUTE_CASE_CAPABILITY_CHECKS_NOT_FULL_DATA_HANDLING_ASSURANCE",
    "CAPABILITY_GATES_NOT_RBAC",
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

test("all 25 inventory categories appear", () => {
  for (const [category] of inventoryRows) {
    assertIncludesAll([category]);
  }
});

test("row-scoped inventory assertions bind category, status, evidence, limitation, and unresolved state", () => {
  const table = sectionBetween("## Inventory Status Table", "## Evidence References");
  for (const [category, status, evidence, limitation, unresolved] of inventoryRows) {
    const row = rowForCategory(category, table);
    assertIncludesAll([status, evidence, limitation, unresolved], row);
  }
});

test("required evidence references appear", () => {
  assertIncludesAll([
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_STATUS_AND_GAP_SUMMARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DELIVERY_PACKET_COMPONENT_RUNTIME_BOUNDARY_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_ACTIVE_METADATA_ACQUISITION_PATH_READINESS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_CONTRACT_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_EXPORT_ARTIFACT_ACCESS_BOUNDARY_INVENTORY_STATUS_BOUNDARY_v1.md",
    "schemas/no-raw-metadata-manifest.json",
    "packages/database/src/index.js",
    "packages/schemas/src/index.js",
    "apps/api/src/index.js",
    "tests/domain-data-handling-blocker-evidence-status-boundary-doc-freeze.test.js",
    "tests/no-raw-metadata-manifest-validator.test.js",
  ]);
});

test("non-proof and no-overclaim rules are explicit", () => {
  const section = sectionBetween(
    "## Non-Proof And No-Overclaim Rules",
    "## No-Reopening Rules",
  );
  assertIncludesAll([
    "data-handling implementation gap inventory status boundary is not a security assessment finding",
    "data-handling implementation gap inventory status boundary is not a vulnerability finding",
    "data-handling implementation gap inventory status boundary assigns no severity",
    "data-handling implementation gap inventory status boundary recommends no remediation",
    "DOCS_ONLY data-handling blockers are not runtime enforcement",
    "route/case/capability checks are not full access-control assurance",
    "route/case/capability checks are not role-permission or RBAC assurance",
    "route/case/capability checks are not complete data-handling assurance",
    "schema validators are not complete data-handling policy",
    "local logs are not CI evidence",
    "generated PDFs are not repo evidence unless separately reviewed and approved",
    "hashes/manifests/checksums prove integrity/reproducibility only, not truth/legal/clinical/evidentiary proof",
    "absence of found evidence is not proof of absence outside searched tracked repo scope",
    "no data-handling blocker is resolved by this boundary",
    "no runtime behavior changes by this boundary",
    "no schema/API/package behavior changes by this boundary",
    "no product candidate is selected",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
  ], section);
});

test("no-reopening rules are explicit", () => {
  const section = sectionBetween("## No-Reopening Rules", "## Raw/Private/Conclusion Guard");
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
  ], section);
});

test("next-slice posture appears without authorization", () => {
  const section = sectionBetween("## Next-Slice Posture", "None are authorized by this boundary.");
  assertIncludesAll([
    "PROVE_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY",
    "DOCS_ONLY_DATA_HANDLING_IMPLEMENTATION_GAP_STATUS_AND_GAP_SUMMARY",
    "DOCS_ONLY_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_STATUS_AND_GAP_SUMMARY_REVIEW",
    "continued pause",
  ], section);
  assertIncludesAll(["None are authorized by this boundary."]);
});

test("negative authorization checks remain frozen", () => {
  assertIncludesAll([
    "It does not create implementation evidence.",
    "It does not change runtime/API/schema/package behavior.",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "REAL_PRIVATE_RUN_NOT_STARTED",
    "SOURCE_PACKAGE_NOT_INSPECTED",
    "METADATA_NOT_ACQUIRED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
    "release approval",
    "runtime certification",
    "technical sign-off",
    "External Reviewer approval",
    "legal/clinical/evidentiary/case-truth conclusions",
  ]);
  assertDoesNotIncludeAny([
    "runtime/API/schema/package behavior changed",
    "validator dispatch created",
    "registry lookup created",
    "real private run started",
    "source inspection occurred",
    "metadata acquired",
    "product candidate selected",
    "external-use authorized",
    "release approval created",
    "runtime certification created",
    "technical sign-off created",
    "External Reviewer approval created",
    "security finding created",
    "vulnerability finding created",
    "severity assigned",
    "remediation recommended",
    "remediation implemented",
  ]);
});

test("raw private and conclusion material is absent except blocked wording", () => {
  const section = sectionBetween("## Raw/Private/Conclusion Guard", "## Next-Slice Posture");
  assertIncludesAll([
    "This boundary contains no raw/private source material.",
    "This boundary contains no source package material.",
    "This boundary creates no legal, clinical, evidentiary, case-truth, credibility, offence, ownership, risk, sufficiency, police-report, pleading, marker-finding, security-finding, vulnerability-finding, severity, remediation, external-use, or product-candidate conclusion.",
    "Any references to those categories are blocked-category or non-authorization wording only.",
  ], section);
});
