const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
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
  "## Audit/Access-Log Runtime-Readiness Blocker Matrix",
  "## Event Surface Coverage Summary",
);
const tableRows = matrix
  .split("\n")
  .filter((line) => line.startsWith("| `AAL-RUNTIME-BLOCKER-"));

const statusTokens = [
  "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY",
  "DOCS_ONLY",
  "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_ONLY",
  "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_FEASIBLE_AS_PROVE_ONLY_USED_AS_CONTEXT",
  "AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_DERIVED_FROM_PROVE_ONLY_REVIEW",
  "AUDIT_ACCESS_LOG_RUNTIME_READINESS_SURFACES_FUTURE_ONLY",
  "AUDIT_ACCESS_LOG_RUNTIME_READINESS_NOT_IMPLEMENTATION",
  "AUDIT_ACCESS_LOG_RUNTIME_READINESS_NOT_CURRENT_LOGGING",
  "AUDIT_ACCESS_LOG_RUNTIME_READINESS_NOT_RUNTIME_ENFORCEMENT",
  "AUDIT_ACCESS_LOG_RUNTIME_READINESS_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "AUDIT_LOGGING_NOT_IMPLEMENTED",
  "ACCESS_LOGGING_NOT_IMPLEMENTED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "FORMAL_AUDIT_LOGGING_NOT_EVIDENCED",
  "ACCESS_LOGGING_NOT_EVIDENCED",
  "LOCAL_LOGS_NOT_CI_EVIDENCE",
  "LOCAL_LOGS_NOT_PACKET_COMPONENTS",
  "RBAC_MODEL_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
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
  "audit/access-log surface",
  "related upstream candidate or surface",
  "event family candidate",
  "current blocker status",
  "required prerequisite",
  "no-raw/no-private/no-source-locator requirement",
  "current runtime-readiness status",
  "current authorization status",
  "what remains non-authorized until closure",
];

const rows = [
  ["AAL-RUNTIME-BLOCKER-001", "material intake event"],
  ["AAL-RUNTIME-BLOCKER-002", "blocked/prohibited ingress event"],
  ["AAL-RUNTIME-BLOCKER-003", "quarantine/block decision event"],
  ["AAL-RUNTIME-BLOCKER-004", "redaction/sanitization event"],
  ["AAL-RUNTIME-BLOCKER-005", "material routing event"],
  ["AAL-RUNTIME-BLOCKER-006", "review access event"],
  ["AAL-RUNTIME-BLOCKER-007", "manifest validation event"],
  ["AAL-RUNTIME-BLOCKER-008", "export/download event"],
  ["AAL-RUNTIME-BLOCKER-009", "packet/delivery promotion event"],
  ["AAL-RUNTIME-BLOCKER-010", "local log/test transcript handling event"],
  ["AAL-RUNTIME-BLOCKER-011", "admin/support access attempt event"],
  ["AAL-RUNTIME-BLOCKER-012", "retention/deletion operation event"],
  ["AAL-RUNTIME-BLOCKER-013", "third-party route denial/approval event"],
  ["AAL-RUNTIME-BLOCKER-014", "runtime/schema/workflow gate candidate event"],
  ["AAL-RUNTIME-BLOCKER-015", "human/professional review access event"],
  ["AAL-RUNTIME-BLOCKER-016", "audit/log viewer access event"],
  ["AAL-RUNTIME-BLOCKER-017", "admin/support privileged log access event"],
];

const evidenceReferences = [
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_RUNTIME_READINESS_STATUS_GAP_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "[excluded private review artifact]",
  "[excluded private review artifact]",
];

test("doc exists and boundary/status tokens exist", () => {
  assert.ok(fs.existsSync(docPath));
  assertIncludesAll(statusTokens);
  assert.match(doc, /AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_FEASIBLE_AS_PROVE_ONLY/);
});

test("all 17 blocker rows and all 10 matrix fields exist", () => {
  assertIncludesAll(matrixFields, matrix);
  assert.equal(tableRows.length, 17);
  for (const [rowId, surface] of rows) {
    const row = tableRows.find((line) => line.includes(`| \`${rowId}\` | ${surface} |`));
    assert.ok(row, `missing row ${rowId}`);
    assert.equal(row.split("|").slice(1, -1).length, 10, `${rowId} must have 10 fields`);
    assert.match(row, /AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED/);
    assert.match(row, /EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED/);
    assert.match(row, /LOG_SCHEMA_NOT_CREATED/);
    assert.match(row, /LOG_STORAGE_NOT_CREATED/);
    assert.match(row, /RUNTIME_GATE_INVENTORY_DEFERRED/);
    assert.match(row, /NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT/);
  }
});

test("all required event surfaces appear", () => {
  assertIncludesAll(rows.map(([, surface]) => surface));
});

test("no-raw/no-private/no-source-locator event content section appears", () => {
  assertIncludesAll([
    "## No-Raw / No-Private / No-Source-Locator Event Content Summary",
    "subject reference",
    "role/permission concept",
    "tenant/case scope",
    "material class",
    "route/surface",
    "decision status",
    "timestamp category",
    "reason code",
    "explicit no-raw/no-private/no-source-locator marker",
    "raw source text",
    "private facts",
    "source locators",
    "filenames/private paths",
    "page references",
    "URLs/tokens",
    "PDF/image/metadata content",
    "sensitive personal details",
    "legal/clinical/evidentiary/case-truth conclusions",
    "product-candidate claims",
    "external-use claims",
  ]);
});

test("relationship and summary sections appear", () => {
  assertIncludesAll([
    "## Relationship To Prior PROVE_ONLY Audit/Access-Log Runtime-Readiness Blocker Analysis",
    "## Relationship To Audit/Access-Log Control Specification Boundary",
    "## Relationship To Audit/Access-Log Feasibility Boundary",
    "## Relationship To Admin/Support Runtime-Readiness Status/Gap Boundary",
    "## Relationship To RBAC Role-Permission Gate-Candidate Status Boundary",
    "## Primary Blocker Summary",
    "## Event-Taxonomy Dependency Summary",
    "## Log Schema / Storage Dependency Summary",
    "## RBAC / Admin-Support Dependency Summary",
    "## Retention / Deletion Dependency Summary",
    "## Third-Party Routing Dependency Summary",
    "## Raw-Material Routing Dependency Summary",
    "## Overclaim-Risk Summary",
    "## Exact Gaps / Blockers",
  ]);
});

test("exact gaps and blockers appear", () => {
  const gaps = sectionBetween("## Exact Gaps / Blockers", "## No-Overclaim Rules");
  assertIncludesAll([
    "audit/access-log implementation not created",
    "audit logging not implemented",
    "access logging not implemented",
    "event taxonomy runtime code not created",
    "log schema not created",
    "log storage not created",
    "formal audit logging not evidenced",
    "access logging not evidenced",
    "RBAC/admin-support unresolved",
    "admin/support model not created",
    "admin/support access unresolved",
    "retention/deletion not implemented",
    "third-party routing not authorized",
    "raw-material routing not implemented",
    "complete global access-control threat model not evidenced",
    "local logs not CI evidence",
    "local logs not packet components",
    "runtime gate inventory deferred",
    "product candidate none",
    "external-use unauthorized",
    "human/professional review required",
  ], gaps);
});

test("no-overclaim and no-reopening rules appear", () => {
  assertIncludesAll([
    "audit/access-log runtime-readiness blocker boundary does not mean audit/access-log implementation",
    "audit surface does not mean event emitter exists",
    "event family candidate does not mean runtime taxonomy exists",
    "access-log candidate does not mean access logging exists",
    "audit-log candidate does not mean audit logging exists",
    "no-content event rule does not mean log schema exists",
    "future prerequisite does not mean current evidence",
    "future boundary suitability does not mean blocker closure",
    "local logs are not CI evidence",
    "local logs are not packet components",
    "product candidate remains none",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "This boundary must not reopen runtime implementation",
    "API behavior change",
    "schema behavior change",
    "package implementation behavior",
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
    "REVIEW_ONLY_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY",
    "PROVE_ONLY_THIRD_PARTY_ROUTING_RUNTIME_READINESS_BLOCKER_ANALYSIS",
    "continued pause",
    "None are authorized by this boundary",
  ], next);
});

test("negative authorization checks and raw/private/conclusion guard appear", () => {
  assertIncludesAll([
    "This boundary creates no audit/access-log implementation",
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
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "AUDIT_LOGGING_IMPLEMENTED",
    "ACCESS_LOGGING_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "CURRENT_LOGGING_ENABLED",
    "RUNTIME_ENFORCED",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
  ]);
});
