const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_v1.md",
);
const doc = fs.readFileSync(docPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(expected, text = doc) {
  for (const item of expected) {
    assert.match(text, new RegExp(escapeRegExp(item), "i"), `missing ${item}`);
  }
}

function assertDoesNotIncludeAny(forbidden, text = doc) {
  for (const item of forbidden) {
    assert.doesNotMatch(text, new RegExp(escapeRegExp(item)), `unexpected ${item}`);
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = doc.indexOf(startHeading);
  assert.notEqual(start, -1, `missing section ${startHeading}`);
  const end = endHeading ? doc.indexOf(endHeading, start + startHeading.length) : doc.length;
  assert.notEqual(end, -1, `missing end section ${endHeading}`);
  return doc.slice(start, end);
}

const matrix = sectionBetween(
  "## Admin/Support Runtime-Readiness Status/Gap Matrix",
  "## Admin/Support Surface Coverage Summary",
);
const tableRows = matrix
  .split("\n")
  .filter((line) => line.startsWith("| `ADMIN-SUPPORT-GAP-"));

const statusTokens = [
  "ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY",
  "DOCS_ONLY",
  "ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_ONLY",
  "ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_SUMMARY_FEASIBLE_AS_PROVE_ONLY_USED_AS_CONTEXT",
  "ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_DERIVED_FROM_PROVE_ONLY_SUMMARY",
  "ADMIN_SUPPORT_RUNTIME_READINESS_SURFACES_FUTURE_ONLY",
  "ADMIN_SUPPORT_RUNTIME_READINESS_NOT_IMPLEMENTATION",
  "ADMIN_SUPPORT_RUNTIME_READINESS_NOT_RUNTIME_ENFORCEMENT",
  "ADMIN_SUPPORT_RUNTIME_READINESS_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "ADMIN_SUPPORT_AUTH_FIELDS_NOT_CREATED",
  "ADMIN_SUPPORT_ROUTES_NOT_CREATED",
  "ADMIN_SUPPORT_DB_FIELDS_NOT_CREATED",
  "ADMIN_SUPPORT_ALLOWED_DENIED_TESTS_NOT_CREATED",
  "ADMIN_SUPPORT_BYPASS_PREVENTION_TESTS_NOT_CREATED",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
  "GLOBAL_ACCESS_CONTROL_MODEL_NOT_CREATED",
  "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
  "SOURCE_PACKAGE_NOT_INSPECTED",
  "PDF_IMAGE_SCREENSHOT_METADATA_NOT_INSPECTED",
  "METADATA_NOT_ACQUIRED",
  "REAL_PRIVATE_RUN_NOT_STARTED",
  "NO_SECURITY_FINDING_CREATED",
  "NO_VULNERABILITY_FINDING_CREATED",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "NO_REMEDIATION_IMPLEMENTED",
  "NO_BLOCKER_RESOLVED",
  "NO_IMPLEMENTATION_EVIDENCE_CREATED",
  "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
  "PRODUCT_CANDIDATE_NONE",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
];

const matrixFields = [
  "row ID",
  "admin/support surface",
  "related candidate ID",
  "current status",
  "primary blocker",
  "required prerequisite",
  "overclaim risk",
  "current authorization status",
  "future boundary posture",
  "what remains non-authorized until closure",
];

const rows = [
  ["ADMIN-SUPPORT-GAP-001", "admin raw/private/source access"],
  ["ADMIN-SUPPORT-GAP-002", "admin source-package access"],
  ["ADMIN-SUPPORT-GAP-003", "admin PDF/image/screenshot/metadata access"],
  ["ADMIN-SUPPORT-GAP-004", "admin/support log access"],
  ["ADMIN-SUPPORT-GAP-005", "admin/support export/download"],
  ["ADMIN-SUPPORT-GAP-006", "admin/support packet/delivery promotion"],
  ["ADMIN-SUPPORT-GAP-007", "admin/support third-party routing approval"],
  ["ADMIN-SUPPORT-GAP-008", "admin/support retention/deletion operation"],
  ["ADMIN-SUPPORT-GAP-009", "admin/support bypass-prevention"],
  ["ADMIN-SUPPORT-GAP-010", "admin/support audit-event gate"],
  ["ADMIN-SUPPORT-GAP-011", "support tenant/case override"],
  ["ADMIN-SUPPORT-GAP-012", "support wrong-case/wrong-tenant access"],
];

const evidenceReferences = [
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
  "tests/domain-rbac-role-permission-model-gate-candidate-status-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_v1.md",
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
  "[excluded private review artifact]",
  "[excluded private review artifact]",
];

test("doc exists and boundary/status tokens exist", () => {
  assert.ok(fs.existsSync(docPath));
  assertIncludesAll(statusTokens);
  assert.match(doc, /ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_SUMMARY_FEASIBLE_AS_PROVE_ONLY/);
});

test("all 12 status/gap rows and all 10 matrix fields exist", () => {
  assertIncludesAll(matrixFields, matrix);
  assert.equal(tableRows.length, 12);
  for (const [rowId, surface] of rows) {
    const row = tableRows.find((line) => line.includes(`| \`${rowId}\` | ${surface} |`));
    assert.ok(row, `missing row ${rowId}`);
    assert.equal(row.split("|").slice(1, -1).length, 10, `${rowId} must have 10 fields`);
    assert.match(row, /RUNTIME_GATE_INVENTORY_DEFERRED/);
    assert.match(row, /NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT/);
    assert.match(row, /ADMIN_SUPPORT_MODEL_NOT_CREATED/);
    assert.match(row, /ADMIN_SUPPORT_ACCESS_UNRESOLVED/);
  }
});

test("all required admin/support surfaces appear", () => {
  assertIncludesAll(rows.map(([, surface]) => surface));
});

test("relationship and summary sections appear", () => {
  assertIncludesAll([
    "## Relationship To Prior PROVE_ONLY Admin/Support Runtime-Readiness Blocker Analysis",
    "## Relationship To Prior PROVE_ONLY Admin/Support Status/Gap Summary",
    "## Relationship To RBAC Role-Permission Gate-Candidate Status Boundary",
    "## Relationship To Admin/Support Access Surface Inventory",
    "## Primary Blocker Summary",
    "## Required Prerequisite Summary",
    "## Overclaim-Risk Summary",
    "## Future Boundary Suitability Assessment",
    "## Exact Gaps / Blockers",
  ]);
});

test("exact gaps and blockers appear", () => {
  const gaps = sectionBetween("## Exact Gaps / Blockers", "## No-Overclaim Rules");
  assertIncludesAll([
    "missing admin/support model",
    "missing admin/support auth fields",
    "missing role/permission fields",
    "missing role/permission schema",
    "missing admin/support routes",
    "missing admin/support DB fields",
    "missing admin/support allowed/denied tests",
    "missing bypass-prevention tests",
    "missing audit/access-log implementation",
    "missing event taxonomy runtime code",
    "missing log schema/storage",
    "missing retention/deletion implementation",
    "missing third-party provider/routing status",
    "missing complete global access-control threat model",
  ], gaps);
});

test("no-overclaim and no-reopening rules appear", () => {
  assertIncludesAll([
    "admin/support runtime-readiness status/gap boundary does not mean admin/support implementation",
    "admin/support surface does not mean route exists",
    "admin/support blocker row does not mean runtime enforcement exists",
    "admin/support blocker row does not mean runtime gate inventory as implementation exists",
    "admin/support blocker row does not mean RBAC/access-control implementation exists",
    "admin/support blocker row does not mean audit/access-log implementation exists",
    "admin/support blocker row does not mean retention/deletion implementation exists",
    "admin/support blocker row does not mean third-party routing authorization exists",
    "future prerequisite does not mean current evidence",
    "future boundary suitability does not mean blocker closure",
    "product candidate remains none",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "This boundary must not reopen runtime implementation",
    "API behavior change",
    "schema behavior change",
    "package implementation behavior",
    "RBAC implementation",
    "access-control implementation",
    "role field creation",
    "permission field creation",
    "role schema creation",
    "permission schema creation",
    "admin/support model creation",
    "admin/support auth fields",
    "admin/support routes",
    "admin/support DB fields",
    "admin/support tests",
    "bypass-prevention tests",
    "validator dispatch",
    "registry/lookup/generic dispatch",
    "audit/access-log implementation",
    "event taxonomy runtime code",
    "log schema",
    "log storage",
    "raw-material routing implementation",
    "retention/deletion implementation",
    "third-party model/API routing",
    "runtime gate implementation",
    "runtime gate inventory as implementation",
    "real private run",
    "source inspection",
    "raw/private material inspection",
    "metadata acquisition",
    "source package inspection",
    "PDF/image/screenshot inspection",
    "manifest instance creation",
    "actual source matrix creation",
    "test fixture instance creation",
    "manual External Reviewer delivery",
    "PDF/PDF packet/archive/ZIP",
    "packet component approval",
    "generated PDF as repo evidence",
    "local logs as CI evidence",
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
    "SWE psykiskt våld legal modelling",
    "Nordic comparison",
  ]);
});

test("evidence references and next-slice posture appear without authorization", () => {
  assertIncludesAll(evidenceReferences);
  const next = sectionBetween("## Recommended Smallest Safe Next Posture", null);
  assertIncludesAll([
    "REVIEW_ONLY_ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY",
    "PROVE_ONLY_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS",
    "PROVE_ONLY_THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS",
    "continued pause",
    "None are authorized by this boundary",
  ], next);
});

test("negative authorization checks and raw/private/conclusion guard appear", () => {
  assertIncludesAll([
    "This boundary creates no admin/support model",
    "no RBAC/access-control implementation",
    "no role fields",
    "no permission fields",
    "no role schema",
    "no permission schema",
    "no validator dispatch",
    "no registry/lookup",
    "no audit/access-log implementation",
    "no event taxonomy runtime code",
    "no log schema/storage",
    "no raw-material routing implementation",
    "no retention/deletion implementation",
    "no third-party routing",
    "no runtime gate implementation",
    "no runtime gate inventory as implementation",
    "no runtime/API/schema/package behavior change",
    "no product candidate",
    "no external-use",
    "no release approval",
    "no runtime certification",
    "no technical sign-off",
    "no External Reviewer approval",
    "no legal/clinical/evidentiary/case-truth conclusions",
    "no security/vulnerability findings",
    "no severity",
    "no remediation",
    "## Raw/Private/Conclusion Guard",
    "contains no raw/private source material",
    "contains no source package material",
    "authorizes no raw/private material inspection",
    "source locator handling",
  ]);
});

test("stale or overclaiming exact status tokens are rejected", () => {
  assertDoesNotIncludeAny([
    "ADMIN_SUPPORT_MODEL_CREATED",
    "ADMIN_SUPPORT_ROUTE_CREATED",
    "ADMIN_SUPPORT_AUTH_FIELD_CREATED",
    "RBAC_IMPLEMENTED",
    "ACCESS_CONTROL_IMPLEMENTED",
    "RUNTIME_ENFORCED",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
  ]);
});
