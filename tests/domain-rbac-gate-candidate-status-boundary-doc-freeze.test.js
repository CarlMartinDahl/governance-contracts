const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
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
    assert.doesNotMatch(text, new RegExp(escapeRegExp(item), "i"), `unexpected ${item}`);
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = doc.indexOf(startHeading);
  assert.notEqual(start, -1, `missing section ${startHeading}`);
  const end = endHeading ? doc.indexOf(endHeading, start + startHeading.length) : doc.length;
  assert.notEqual(end, -1, `missing end section ${endHeading}`);
  return doc.slice(start, end);
}

const matrix = sectionBetween("## RBAC Gate-Candidate Status Matrix", "## Evidence References");
const tableRows = matrix
  .split("\n")
  .filter((line) => line.startsWith("| `RBAC-GC-"));

function rowForCandidate(id, name) {
  const row = tableRows.find((line) => line.includes(`| \`${id}\` | ${name} |`));
  assert.ok(row, `missing matrix row for ${id} ${name}`);
  return row;
}

function cellsForRow(row) {
  return row
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

const statusTokens = [
  "RBAC_GATE_CANDIDATE_STATUS_BOUNDARY",
  "DOCS_ONLY",
  "RBAC_GATE_CANDIDATE_STATUS_ONLY",
  "RBAC_GATE_CANDIDATES_FUTURE_ONLY",
  "RBAC_GATE_CANDIDATES_NOT_IMPLEMENTED",
  "RBAC_GATE_CANDIDATES_NOT_RUNTIME_ENFORCEMENT",
  "RBAC_GATE_CANDIDATES_NOT_SCHEMA_ENFORCEMENT",
  "RBAC_GATE_CANDIDATES_NOT_WORKFLOW_ENFORCEMENT",
  "RBAC_GATE_CANDIDATES_NOT_VALIDATOR_DISPATCH",
  "RBAC_GATE_CANDIDATES_NOT_REGISTRY_LOOKUP",
  "RBAC_CONTROL_SPECIFICATION_USED_AS_CONTEXT_ONLY",
  "AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_USED_AS_CONTEXT_ONLY",
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_USED_AS_CONTEXT_ONLY",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "GLOBAL_ACCESS_CONTROL_MODEL_NOT_CREATED",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_RBAC",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_FULL_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_GLOBAL_AUTHORIZATION_MODEL",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "AUDIT_LOGGING_NOT_IMPLEMENTED",
  "ACCESS_LOGGING_NOT_IMPLEMENTED",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
  "SOURCE_PACKAGE_NOT_INSPECTED",
  "PDF_IMAGE_SCREENSHOT_METADATA_NOT_INSPECTED",
  "METADATA_NOT_ACQUIRED",
  "REAL_PRIVATE_RUN_NOT_STARTED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
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

const vocabulary = [
  "FUTURE_GATE_CANDIDATE_ONLY",
  "DOCS_ONLY_CANDIDATE_STATUS",
  "IMPLEMENTATION_NOT_STARTED",
  "BLOCKER_UNRESOLVED",
  "ARCHITECTURE_REQUIRED_FIRST",
  "RBAC_MODEL_REQUIRED_FIRST",
  "ADMIN_SUPPORT_MODEL_REQUIRED_FIRST",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_REQUIRED_FIRST",
  "RETENTION_DELETION_IMPLEMENTATION_REQUIRED_FIRST",
  "THIRD_PARTY_ROUTING_STATUS_REQUIRED_FIRST",
  "RAW_ROUTING_IMPLEMENTATION_REQUIRED_FIRST",
  "HUMAN_PROFESSIONAL_REVIEW_GATE_REQUIRED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  "NOT_AUTHORIZED_FOR_EXTERNAL_USE",
  "NOT_AUTHORIZED_FOR_PRODUCT_CANDIDATE",
];

const fields = [
  "gate candidate ID",
  "gate candidate name",
  "source control/spec context",
  "material class / resource surface",
  "subject / role concept dependency",
  "permission-family dependency",
  "resource-scope dependency",
  "audit/access-log dependency",
  "retention/deletion dependency",
  "third-party/API dependency",
  "intended future enforcement layer",
  "current evidence level",
  "implementation gap",
  "required implementation evidence",
  "required test evidence",
  "blocker status",
  "closure criteria",
  "what remains non-authorized until closure",
  "runtime inventory status",
  "current authorization status",
];

const candidates = [
  ["RBAC-GC-001", "material intake authorization gate candidate"],
  ["RBAC-GC-002", "material view/access gate candidate"],
  ["RBAC-GC-003", "material redaction/sanitization gate candidate"],
  ["RBAC-GC-004", "material routing decision gate candidate"],
  ["RBAC-GC-005", "raw/private/source material deny/quarantine gate candidate"],
  ["RBAC-GC-006", "source package deny/quarantine gate candidate"],
  ["RBAC-GC-007", "PDF/image/screenshot/metadata deny/acquisition gate candidate"],
  ["RBAC-GC-008", "review access gate candidate"],
  ["RBAC-GC-009", "export/download access gate candidate"],
  ["RBAC-GC-010", "packet/delivery promotion gate candidate"],
  ["RBAC-GC-011", "third-party model/API route approval/denial gate candidate"],
  ["RBAC-GC-012", "audit/access-log view/access gate candidate"],
  ["RBAC-GC-013", "retention/deletion operation authorization gate candidate"],
  ["RBAC-GC-014", "admin/support access gate candidate"],
  ["RBAC-GC-015", "cross-tenant / wrong-case denial gate candidate"],
  ["RBAC-GC-016", "object/function/property authorization gate candidate"],
  ["RBAC-GC-017", "human/professional review-only gate candidate"],
];

const evidenceReferences = [
  "docs/DOMAIN_CONTRACTS_RBAC_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "tests/domain-rbac-control-specification-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "tests/domain-audit-access-log-control-specification-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "tests/domain-raw-material-routing-control-specification-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
  "[excluded private review artifact]",
  "[excluded private review artifact]",
];

const noOverclaimRules = [
  "Gate candidate does not mean gate implementation.",
  "Gate candidate does not mean runtime enforcement.",
  "Gate candidate does not mean schema enforcement.",
  "Gate candidate does not mean workflow enforcement.",
  "Gate candidate does not mean validator dispatch.",
  "Gate candidate does not mean registry/lookup.",
  "Gate candidate does not mean RBAC model exists.",
  "Gate candidate does not mean role/permission fields exist.",
  "Gate candidate does not mean admin/support model exists.",
  "Gate candidate does not mean product readiness.",
  "Gate candidate does not mean external-use authorization.",
  "Gate candidate does not mean release approval.",
  "Gate candidate does not mean technical sign-off.",
  "Gate candidate does not mean External Reviewer approval.",
  "Required implementation evidence is future evidence, not current implementation evidence.",
  "Required test evidence is future evidence, not current closure.",
  "Runtime gate inventory remains deferred.",
  "DOCS_ONLY boundaries are not runtime enforcement.",
  "Local logs are not CI evidence.",
  "Local logs are not packet components.",
  "Product candidate remains none.",
  "External-use remains unauthorized.",
  "Human/professional review remains release gate.",
  "Route/case/capability evidence is not RBAC, not full access control, not admin/support access control, and not global authorization model.",
];

const noReopeningTerms = [
  "runtime implementation",
  "API behavior change",
  "schema behavior change",
  "package implementation behavior",
  "RBAC implementation",
  "access-control architecture implementation",
  "role field creation",
  "permission field creation",
  "role schema creation",
  "permission schema creation",
  "admin/support model creation",
  "audit/access-log implementation",
  "audit logging implementation",
  "access logging implementation",
  "event taxonomy runtime code",
  "log schema",
  "log storage",
  "raw-material routing implementation",
  "retention/deletion implementation",
  "third-party model/API routing",
  "validator dispatch",
  "registry/lookup/generic dispatch",
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
  "generated PDF as packet component",
  "committing local logs",
  "local logs as CI evidence",
  "local logs as packet components",
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
];

test("doc exists and freezes the DOCS_ONLY boundary posture", () => {
  assert.ok(fs.existsSync(docPath));
  assertIncludesAll([
    "# RBAC Gate-Candidate Status Boundary v1",
    "Boundary name: `RBAC_GATE_CANDIDATE_STATUS_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `RBAC_GATE_CANDIDATE_STATUS_ONLY`",
    "This boundary creates gate-candidate status classification only.",
    "It classifies future RBAC/access-control gate candidates and blocker status only.",
    "It creates no RBAC implementation.",
    "It creates no access-control implementation.",
    "It creates no runtime enforcement.",
    "It creates no schema enforcement.",
    "It creates no workflow enforcement.",
    "It creates no validator dispatch.",
    "It creates no registry/lookup.",
    "It resolves no blocker.",
    "It creates no implementation evidence.",
    "It changes no runtime/API/schema/package behavior.",
    "It selects no product candidate.",
    "It authorizes no external-use.",
    "Human/professional review remains release gate.",
  ]);
});

test("required status tokens, candidate vocabulary, and evidence references are present", () => {
  assertIncludesAll(statusTokens);
  assertIncludesAll(vocabulary, sectionBetween("## Candidate Status Vocabulary", "## RBAC Gate-Candidate Status Matrix"));
  assertIncludesAll(evidenceReferences, sectionBetween("## Evidence References", "## No-Overclaim Rules"));
});

test("all required matrix fields and all required candidate rows are row-scoped", () => {
  assertIncludesAll(fields, matrix);
  assert.equal(tableRows.length, candidates.length);

  for (const [id, name] of candidates) {
    const row = rowForCandidate(id, name);
    const cells = cellsForRow(row);
    assert.equal(cells.length, fields.length, `${id} must have 20 fields`);
    assert.equal(cells[0], `\`${id}\``);
    assert.equal(cells[1], name);
    assert.match(cells[2], /spec|context/i);
    assert.notEqual(cells[3], "", `${id} missing material/resource surface`);
    assert.match(cells[4], /future|subject|reviewer|admin|support|service|human/i);
    assert.match(cells[5], /permission/i);
    assert.match(cells[6], /tenant|case|object|function|property|route|scope/i);
    assert.match(cells[7], /audit|access-log|event|logging|taxonomy/i);
    assert.match(cells[8], /retention|deletion|lifecycle/i);
    assert.match(cells[9], /third-party|API|provider|route/i);
    assert.match(cells[10], /future/i);
    assert.match(cells[11], /`DOCS_ONLY_CANDIDATE_STATUS`/);
    assert.match(cells[12], /absent|required|unresolved/i);
    assert.match(cells[13], /future/i);
    assert.match(cells[14], /test/i);
    assert.match(cells[15], /`BLOCKER_UNRESOLVED`/);
    assert.match(cells[16], /future evidence|future implementation|future tests/i);
    assert.match(cells[17], /runtime|product candidate|external-use|inspection|implementation|approval|routing|enforcement/i);
    assert.equal(cells[18], "`RUNTIME_GATE_INVENTORY_DEFERRED`");
    assert.match(cells[19], /`FUTURE_GATE_CANDIDATE_ONLY`/);
    assert.match(cells[19], /`NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT`/);
  }
});

test("no-overclaim, no-reopening, and next-slice posture are frozen without authorization", () => {
  assertIncludesAll(noOverclaimRules, sectionBetween("## No-Overclaim Rules", "## No-Reopening Rules"));
  assertIncludesAll(noReopeningTerms, sectionBetween("## No-Reopening Rules", "## Next-Slice Posture"));
  assertIncludesAll([
    "Next possible safe slice may be:",
    "REVIEW_ONLY_RBAC_GATE_CANDIDATE_STATUS_BOUNDARY",
    "PROVE_ONLY_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_AFTER_RBAC_GATE_STATUS",
    "continued pause",
    "None are authorized by this boundary.",
  ], sectionBetween("## Next-Slice Posture", null));
});

test("negative authorization checks preserve the non-implementation posture", () => {
  assertIncludesAll([
    "It creates no role fields.",
    "It creates no permission fields.",
    "It creates no role schema.",
    "It creates no permission schema.",
    "It creates no admin/support model.",
    "It creates no audit/access-log implementation.",
    "It creates no current logging.",
    "It creates no event taxonomy runtime code.",
    "It creates no log schema.",
    "It creates no log storage.",
    "It authorizes no raw/private/source inspection.",
    "It authorizes no source package inspection.",
    "It authorizes no PDF/image/screenshot/metadata inspection.",
    "It authorizes no metadata acquisition.",
    "It authorizes no third-party model/API routing.",
    "It authorizes no real private run.",
    "It creates no legal/clinical/evidentiary/case-truth conclusions.",
    "It creates no security/vulnerability findings.",
    "It assigns no severity.",
    "It recommends no remediation.",
  ]);
  const currentStatusesAndMatrix = [
    sectionBetween("## Current Status Tokens", "## Candidate Status Vocabulary"),
    sectionBetween("## RBAC Gate-Candidate Status Matrix", "## Evidence References"),
  ].join("\n");
  assertDoesNotIncludeAny([
    "`IMPLEMENTED`",
    "`RUNTIME_ENFORCED`",
    "`SCHEMA_ENFORCED`",
    "`WORKFLOW_ENFORCED`",
    "`APPROVED`",
    "`CERTIFIED`",
    "`READY`",
    "`REMEDIATED`",
  ], currentStatusesAndMatrix);
});

test("doc contains no raw/private/conclusion material beyond blocked category wording", () => {
  assertDoesNotIncludeAny([
    "source locator:",
    "private path:",
    "case truth:",
    "clinical conclusion:",
    "legal conclusion:",
    "evidentiary conclusion:",
    "raw source excerpt",
    "metadata value:",
  ]);
});
