const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
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
  "## Third-Party Routing Runtime-Readiness Blocker Matrix",
  "## Third-Party Routing Surface Coverage Summary",
);
const tableRows = matrix
  .split("\n")
  .filter((line) => line.startsWith("| `TPR-RUNTIME-BLOCKER-"));

const statusTokens = [
  "THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY",
  "DOCS_ONLY",
  "THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_ONLY",
  "THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_FEASIBLE_AS_PROVE_ONLY_USED_AS_CONTEXT",
  "THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_DERIVED_FROM_PROVE_ONLY_REVIEW",
  "THIRD_PARTY_ROUTING_RUNTIME_READINESS_SURFACES_FUTURE_ONLY",
  "THIRD_PARTY_ROUTING_RUNTIME_READINESS_NOT_IMPLEMENTATION",
  "THIRD_PARTY_ROUTING_RUNTIME_READINESS_NOT_AUTHORIZATION",
  "THIRD_PARTY_ROUTING_RUNTIME_READINESS_NOT_RUNTIME_ENFORCEMENT",
  "THIRD_PARTY_ROUTING_RUNTIME_READINESS_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "THIRD_PARTY_PROVIDER_ROUTING_STATUS_NOT_EVIDENCED",
  "DATA_ROUTING_MAP_NOT_CREATED",
  "PROVIDER_RETENTION_DELETION_POSTURE_NOT_CREATED",
  "PROVIDER_AUDITABILITY_NOT_EVIDENCED",
  "PROVIDER_TOKEN_URL_SECRET_HANDLING_UNRESOLVED",
  "PROVIDER_REGISTRY_NOT_CREATED",
  "PROVIDER_STATUS_IMPLEMENTATION_NOT_CREATED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST",
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
  "third-party routing surface",
  "related upstream candidate or surface",
  "route family candidate",
  "current blocker status",
  "required prerequisite",
  "no-raw/no-private/no-source-locator/no-token/no-URL requirement",
  "current runtime-readiness status",
  "current authorization status",
  "what remains non-authorized until closure",
];

const rows = [
  ["TPR-RUNTIME-BLOCKER-001", "third-party model/API route request"],
  ["TPR-RUNTIME-BLOCKER-002", "third-party route denial event"],
  ["TPR-RUNTIME-BLOCKER-003", "third-party route approval candidate"],
  ["TPR-RUNTIME-BLOCKER-004", "provider identity/status record"],
  ["TPR-RUNTIME-BLOCKER-005", "provider data-routing map"],
  ["TPR-RUNTIME-BLOCKER-006", "provider retention/deletion posture"],
  ["TPR-RUNTIME-BLOCKER-007", "provider auditability/logging posture"],
  ["TPR-RUNTIME-BLOCKER-008", "provider token/URL/secret handling"],
  ["TPR-RUNTIME-BLOCKER-009", "raw/private/source material route attempt"],
  ["TPR-RUNTIME-BLOCKER-010", "PDF/image/screenshot/metadata route attempt"],
  ["TPR-RUNTIME-BLOCKER-011", "generated/export artifact route attempt"],
  ["TPR-RUNTIME-BLOCKER-012", "admin/support third-party route approval attempt"],
  ["TPR-RUNTIME-BLOCKER-013", "workflow agent/tool provider route attempt"],
  ["TPR-RUNTIME-BLOCKER-014", "runtime/schema/workflow gate provider route event"],
  ["TPR-RUNTIME-BLOCKER-015", "human/professional review provider route dependency"],
];

const rowStatuses = [
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
];

const evidenceReferences = [
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "[excluded private review artifact]",
  "[excluded private review artifact]",
];

test("doc exists and boundary/status tokens exist", () => {
  assert.ok(fs.existsSync(docPath));
  assertIncludesAll(statusTokens);
  assert.match(doc, /THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_FEASIBLE_AS_PROVE_ONLY/);
});

test("all 15 blocker rows and all 10 matrix fields exist", () => {
  assertIncludesAll(matrixFields, matrix);
  assert.equal(tableRows.length, 15);
  for (const [rowId, surface] of rows) {
    const row = tableRows.find((line) => line.includes(`| \`${rowId}\` | ${surface} |`));
    assert.ok(row, `missing row ${rowId}`);
    assert.equal(row.split("|").slice(1, -1).length, 10, `${rowId} must have 10 fields`);
    assertIncludesAll(rowStatuses, row);
  }
});

test("all required third-party routing surfaces appear", () => {
  assertIncludesAll(rows.map(([, surface]) => surface));
});

test("no-raw/no-private/no-source-locator/no-token/no-URL section appears", () => {
  assertIncludesAll([
    "## No-Raw / No-Private / No-Source-Locator / No-Token / No-URL Route Content Summary",
    "subject reference",
    "role/permission concept",
    "tenant/case scope",
    "material class",
    "route/surface",
    "decision status",
    "timestamp category",
    "reason code",
    "provider category reference",
    "explicit no-raw/no-private/no-source-locator/no-token/no-URL marker",
    "raw source text",
    "private facts",
    "source locators",
    "filenames/private paths",
    "page references",
    "URLs",
    "tokens",
    "secrets",
    "provider payloads",
    "prompts",
    "responses",
    "PDF/image/metadata content",
    "sensitive personal details",
    "legal/clinical/evidentiary/case-truth conclusions",
    "product-candidate claims",
    "external-use claims",
  ]);
});

test("relationship and summary sections appear", () => {
  assertIncludesAll([
    "## Relationship To Prior PROVE_ONLY Third-Party Routing Runtime-Readiness Blocker Analysis",
    "## Relationship To Audit/Access-Log Runtime-Readiness Blocker Analysis Boundary",
    "## Relationship To Admin/Support Runtime-Readiness Status/Gap Boundary",
    "## Relationship To RBAC Role-Permission Gate-Candidate Status Boundary",
    "## Relationship To Raw-Material Routing Control Specification",
    "## Primary Blocker Summary",
    "## Provider/Routing Status Dependency Summary",
    "## Data-Routing Map Dependency Summary",
    "## RBAC / Admin-Support Dependency Summary",
    "## Audit/Access-Log Dependency Summary",
    "## Retention / Deletion Dependency Summary",
    "## Raw-Material Routing Dependency Summary",
    "## Token / URL / Secret / No-Source-Locator Handling Summary",
    "## Global Access-Control Threat-Model Dependency Summary",
    "## Deny-By-Default Summary",
    "## Overclaim-Risk Summary",
    "## Exact Gaps / Blockers",
  ]);
});

test("exact gaps and blockers appear", () => {
  const gaps = sectionBetween("## Exact Gaps / Blockers", "## No-Overclaim Rules");
  assertIncludesAll([
    "third-party routing not authorized",
    "third-party provider/routing status not evidenced",
    "data-routing map not created",
    "provider retention/deletion posture not created",
    "provider auditability not evidenced",
    "provider token/URL/secret handling unresolved",
    "raw-material routing not implemented",
    "audit/access-log implementation not created",
    "event taxonomy runtime code not created",
    "log schema not created",
    "log storage not created",
    "retention/deletion not implemented",
    "RBAC/admin-support unresolved",
    "role/permission fields/schema not created",
    "complete global access-control threat model not evidenced",
    "runtime gate inventory deferred",
    "product candidate none",
    "external-use unauthorized",
    "human/professional review required",
  ], gaps);
});

test("no-overclaim and no-reopening rules appear", () => {
  assertIncludesAll([
    "third-party routing runtime-readiness blocker boundary does not mean third-party routing implementation",
    "third-party routing blocker row does not mean route authorization",
    "route family candidate does not mean provider integration exists",
    "provider identity/status row does not mean provider registry/status implementation exists",
    "data-routing map row does not mean data-routing map exists",
    "provider auditability row does not mean audit/access-log implementation exists",
    "token/URL/secret row does not mean token/URL/secret handling implementation exists",
    "future prerequisite does not mean current evidence",
    "future boundary suitability does not mean blocker closure",
    "deny-by-default posture does not mean approved routing",
    "product candidate remains none",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "This boundary must not reopen runtime implementation",
    "API behavior change",
    "schema behavior change",
    "package implementation behavior",
    "third-party routing implementation",
    "third-party model/API routing authorization",
    "provider integration",
    "provider registry",
    "provider status implementation",
    "data-routing map implementation",
    "provider retention/deletion posture implementation",
    "provider auditability implementation",
    "provider token/URL/secret handling implementation",
    "audit/access-log implementation",
    "audit logging implementation",
    "access logging implementation",
    "event taxonomy runtime code",
    "log schema",
    "log storage",
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
    "raw-material routing implementation",
    "retention/deletion implementation",
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
    "REVIEW_ONLY_THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY",
    "PROVE_ONLY_THIRD_PARTY_ROUTING_RUNTIME_READINESS_STATUS_GAP_SUMMARY_AFTER_BLOCKER_ANALYSIS",
    "continued pause",
    "None are authorized by this boundary",
  ], next);
});

test("negative authorization checks and raw/private/conclusion guard appear", () => {
  assertIncludesAll([
    "This boundary creates no third-party routing implementation",
    "no route authorization",
    "no third-party model/API routing authorization",
    "no provider integration",
    "no provider registry",
    "no provider status implementation",
    "no data-routing map implementation",
    "no provider retention/deletion posture implementation",
    "no provider auditability implementation",
    "no token/URL/secret handling implementation",
    "no audit/access-log implementation",
    "no audit logging implementation",
    "no access logging implementation",
    "no event taxonomy runtime code",
    "no log schema/storage",
    "no RBAC/access-control implementation",
    "no role fields",
    "no permission fields",
    "no role schema",
    "no permission schema",
    "no admin/support model",
    "no validator dispatch",
    "no registry/lookup",
    "no raw-material routing implementation",
    "no retention/deletion implementation",
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
    "token/URL/secret handling implementation",
  ]);
});

test("stale or overclaiming exact status tokens are rejected", () => {
  assertDoesNotIncludeAny([
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "PROVIDER_REGISTRY_CREATED",
    "PROVIDER_STATUS_IMPLEMENTED",
    "DATA_ROUTING_MAP_CREATED",
    "TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "RUNTIME_ENFORCED",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
  ]);
});
