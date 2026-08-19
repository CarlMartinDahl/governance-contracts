const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
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

const currentStatus = sectionBetween("## Current Status Tokens", "## Bounded Status Vocabulary");
const vocabularySection = sectionBetween("## Bounded Status Vocabulary", "## Required Blocker Vocabulary");
const blockerSection = sectionBetween("## Required Blocker Vocabulary", "## Classification Preservation");
const classificationSection = sectionBetween("## Classification Preservation", "## Runtime Gate-Candidate Status Inventory Matrix");
const matrix = sectionBetween("## Runtime Gate-Candidate Status Inventory Matrix", "## Evidence References");
const matrixRows = matrix
  .split("\n")
  .filter((line) => line.startsWith("| `RGCI-"));

function rowForCandidate(inventoryId, candidateId, name) {
  const row = matrixRows.find((line) =>
    line.includes(`| \`${inventoryId}\` | \`${candidateId}\` | ${name} |`)
  );
  assert.ok(row, `missing matrix row for ${inventoryId} ${candidateId} ${name}`);
  return row;
}

function cellsForRow(row) {
  return row
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

const statusTokens = [
  "RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS",
  "DOCS_ONLY",
  "RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_ONLY",
  "RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FEASIBLE_AS_PROVE_ONLY",
  "RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_USED_AS_CONTEXT_ONLY",
  "RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_FROZEN_AND_COMMITTED_USED_AS_CONTEXT",
  "RUNTIME_GATE_CANDIDATES_FUTURE_ONLY",
  "RUNTIME_GATE_CANDIDATES_NOT_IMPLEMENTED",
  "RUNTIME_GATE_CANDIDATES_NOT_RUNTIME_ENFORCEMENT",
  "SCHEMA_VALIDATOR_GATE_CANDIDATES_NOT_SCHEMA_ENFORCEMENT",
  "WORKFLOW_PROMPT_GATE_CANDIDATES_NOT_WORKFLOW_ENFORCEMENT",
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
  "RBAC_NOT_IMPLEMENTED",
  "ACCESS_CONTROL_NOT_IMPLEMENTED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "GLOBAL_ACCESS_CONTROL_MODEL_NOT_CREATED",
  "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST",
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

const statusVocabulary = [
  "DOCS_ONLY_STATUS_INVENTORY",
  "FUTURE_RUNTIME_GATE_CANDIDATE_ONLY",
  "FUTURE_SCHEMA_VALIDATOR_GATE_CANDIDATE_ONLY",
  "FUTURE_WORKFLOW_PROMPT_GATE_CANDIDATE_ONLY",
  "HUMAN_PROFESSIONAL_REVIEW_GATE_REQUIRED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
  "NOT_AUTHORIZED_FOR_SCHEMA_ENFORCEMENT",
  "NOT_AUTHORIZED_FOR_WORKFLOW_ENFORCEMENT",
  "IMPLEMENTATION_NOT_STARTED",
  "BLOCKER_UNRESOLVED",
  "ARCHITECTURE_REQUIRED_FIRST",
  "RBAC_MODEL_REQUIRED_FIRST",
  "ADMIN_SUPPORT_MODEL_REQUIRED_FIRST",
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_REQUIRED_FIRST",
  "RETENTION_DELETION_IMPLEMENTATION_REQUIRED_FIRST",
  "THIRD_PARTY_ROUTING_STATUS_REQUIRED_FIRST",
  "RAW_ROUTING_IMPLEMENTATION_REQUIRED_FIRST",
  "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST",
  "NOT_AUTHORIZED_FOR_PRODUCT_CANDIDATE",
  "NOT_AUTHORIZED_FOR_EXTERNAL_USE",
];

const fields = [
  "inventory ID",
  "source RBAC gate candidate ID",
  "source RBAC gate candidate name",
  "future gate category",
  "later runtime gate candidate status",
  "later schema/validator gate candidate status",
  "later workflow/prompt gate candidate status",
  "human/professional review gate status",
  "material/resource surface",
  "primary blocker",
  "secondary blockers",
  "implementation prerequisite",
  "required implementation evidence",
  "required test evidence",
  "overclaim risk",
  "current evidence level",
  "runtime inventory status",
  "current authorization status",
  "closure criteria",
  "what remains non-authorized until closure",
];

const candidates = [
  ["RGCI-001", "RBAC-GC-001", "material intake authorization gate candidate"],
  ["RGCI-002", "RBAC-GC-002", "material view/access gate candidate"],
  ["RGCI-003", "RBAC-GC-003", "material redaction/sanitization gate candidate"],
  ["RGCI-004", "RBAC-GC-004", "material routing decision gate candidate"],
  ["RGCI-005", "RBAC-GC-005", "raw/private/source material deny/quarantine gate candidate"],
  ["RGCI-006", "RBAC-GC-006", "source package deny/quarantine gate candidate"],
  ["RGCI-007", "RBAC-GC-007", "PDF/image/screenshot/metadata deny/acquisition gate candidate"],
  ["RGCI-008", "RBAC-GC-008", "review access gate candidate"],
  ["RGCI-009", "RBAC-GC-009", "export/download access gate candidate"],
  ["RGCI-010", "RBAC-GC-010", "packet/delivery promotion gate candidate"],
  ["RGCI-011", "RBAC-GC-011", "third-party model/API route approval/denial gate candidate"],
  ["RGCI-012", "RBAC-GC-012", "audit/access-log view/access gate candidate"],
  ["RGCI-013", "RBAC-GC-013", "retention/deletion operation authorization gate candidate"],
  ["RGCI-014", "RBAC-GC-014", "admin/support access gate candidate"],
  ["RGCI-015", "RBAC-GC-015", "cross-tenant / wrong-case denial gate candidate"],
  ["RGCI-016", "RBAC-GC-016", "object/function/property authorization gate candidate"],
  ["RGCI-017", "RBAC-GC-017", "human/professional review-only gate candidate"],
];

const laterRuntimeCandidates = [
  "RBAC-GC-001",
  "RBAC-GC-002",
  "RBAC-GC-004",
  "RBAC-GC-005",
  "RBAC-GC-006",
  "RBAC-GC-007",
  "RBAC-GC-009",
  "RBAC-GC-011",
  "RBAC-GC-012",
  "RBAC-GC-013",
  "RBAC-GC-014",
  "RBAC-GC-015",
  "RBAC-GC-016",
];

const laterSchemaCandidates = [
  "RBAC-GC-007",
  "RBAC-GC-012",
  "RBAC-GC-013",
  "RBAC-GC-015",
  "RBAC-GC-016",
  "manifest-adjacent/schema evidence from raw-routing `RMR-CS-003`",
];

const laterWorkflowCandidates = [
  "RBAC-GC-001",
  "RBAC-GC-003",
  "RBAC-GC-004",
  "RBAC-GC-005",
  "RBAC-GC-006",
  "RBAC-GC-008",
  "RBAC-GC-010",
  "RBAC-GC-017",
];

const humanReviewCandidates = [
  "RBAC-GC-008",
  "RBAC-GC-010",
  "RBAC-GC-017",
  "any export/delivery candidate touching approval/external-use",
];

const blockerVocabulary = [
  "missing RBAC model / role-permission fields",
  "missing admin/support model",
  "missing audit/access-log implementation / log schema / log storage",
  "missing retention/deletion implementation",
  "missing third-party routing/provider status",
  "missing raw-material routing implementation",
  "missing complete global access-control threat model",
];

const evidenceReferences = [
  "docs/DOMAIN_CONTRACTS_RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
  "tests/domain-rbac-gate-candidate-status-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_RBAC_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "tests/domain-rbac-control-specification-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "tests/domain-audit-access-log-control-specification-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "tests/domain-raw-material-routing-control-specification-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
  "[excluded private review artifact]",
  "[excluded private review artifact]",
];

const noOverclaimRules = [
  "Runtime gate candidate does not mean runtime gate implementation.",
  "Runtime gate candidate does not mean runtime enforcement.",
  "Schema/validator gate candidate does not mean schema enforcement.",
  "Workflow/prompt gate candidate does not mean workflow enforcement.",
  "Gate category does not mean validator dispatch.",
  "Gate category does not mean registry/lookup.",
  "Gate category does not mean RBAC model exists.",
  "Gate category does not mean role/permission fields exist.",
  "Gate category does not mean admin/support model exists.",
  "Gate category does not mean runtime gate inventory has started as implementation.",
  "Gate category does not mean product readiness.",
  "Gate category does not mean external-use authorization.",
  "Gate category does not mean release approval.",
  "Gate category does not mean technical sign-off.",
  "Gate category does not mean External Reviewer approval.",
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
  "runtime gate implementation",
  "runtime gate inventory as implementation",
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
    "# Runtime Gate-Candidate Status Inventory Boundary After RBAC Gate Status v1",
    "Boundary name: `RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS`",
    "Mode: `DOCS_ONLY`",
    "Status: `RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_ONLY`",
    "This boundary is runtime/schema/workflow/human-review gate-candidate status inventory only.",
    "It freezes the PROVE_ONLY classification after `RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_FROZEN_AND_COMMITTED`.",
    "It creates no runtime gate implementation.",
    "It does not start runtime gate inventory as implementation.",
    "It creates no runtime enforcement.",
    "It creates no schema enforcement.",
    "It creates no workflow enforcement.",
    "It creates no validator dispatch.",
    "It creates no registry/lookup.",
    "It creates no RBAC implementation.",
    "It creates no access-control implementation.",
    "It creates no audit/access-log implementation.",
    "It changes no runtime/API/schema/package behavior.",
    "Human/professional review remains release gate.",
  ]);
});

test("required status tokens, bounded vocabulary, blockers, and evidence references are present", () => {
  assertIncludesAll(statusTokens, currentStatus);
  assertIncludesAll(statusVocabulary, vocabularySection);
  assertIncludesAll(blockerVocabulary, blockerSection);
  assertIncludesAll(evidenceReferences, sectionBetween("## Evidence References", "## No-Overclaim Rules"));
});

test("all 20 inventory fields and all 17 source candidate rows are row-scoped", () => {
  assertIncludesAll(fields, matrix);
  assert.equal(matrixRows.length, candidates.length);

  for (const [inventoryId, candidateId, name] of candidates) {
    const row = rowForCandidate(inventoryId, candidateId, name);
    const cells = cellsForRow(row);
    assert.equal(cells.length, fields.length, `${inventoryId} must have 20 fields`);
    assert.equal(cells[0], `\`${inventoryId}\``);
    assert.equal(cells[1], `\`${candidateId}\``);
    assert.equal(cells[2], name);
    assert.match(cells[3], /status candidate/i);
    assert.match(cells[9], /FIRST`$|`HUMAN_PROFESSIONAL_REVIEW_GATE_REQUIRED`/);
    assert.match(cells[10], /FIRST|context only|human\/professional review/i);
    assert.match(cells[12], /future/i);
    assert.match(cells[13], /tests/i);
    assert.match(cells[14], /overread/i);
    assert.match(cells[15], /`DOCS_ONLY_STATUS_INVENTORY`/);
    assert.match(cells[15], /`IMPLEMENTATION_NOT_STARTED`/);
    assert.match(cells[15], /`BLOCKER_UNRESOLVED`/);
    assert.equal(cells[16], "`RUNTIME_GATE_INVENTORY_DEFERRED`");
    assert.match(cells[17], /`NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT`/);
    assert.match(cells[17], /`NOT_AUTHORIZED_FOR_SCHEMA_ENFORCEMENT`/);
    assert.match(cells[17], /`NOT_AUTHORIZED_FOR_WORKFLOW_ENFORCEMENT`/);
    assert.match(cells[17], /`NOT_AUTHORIZED_FOR_PRODUCT_CANDIDATE`/);
    assert.match(cells[17], /`NOT_AUTHORIZED_FOR_EXTERNAL_USE`/);
  }
});

test("PROVE_ONLY result label and candidate groupings are preserved", () => {
  assertIncludesAll([
    "Selected PROVE_ONLY result label: `RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_FEASIBLE_AS_PROVE_ONLY`",
    "Not suitable for runtime gate inventory yet: all 17 source RBAC gate candidates",
  ]);
  assertIncludesAll(laterRuntimeCandidates, classificationSection);
  assertIncludesAll(laterSchemaCandidates, classificationSection);
  assertIncludesAll(laterWorkflowCandidates, classificationSection);
  assertIncludesAll(humanReviewCandidates, classificationSection);

  for (const id of laterRuntimeCandidates) {
    const row = matrixRows.find((line) => line.includes(`| \`${id}\` |`));
    assert.ok(row, `missing later runtime candidate row for ${id}`);
    assert.match(row, /`FUTURE_RUNTIME_GATE_CANDIDATE_ONLY`/);
  }
  for (const id of laterSchemaCandidates.filter((value) => value.startsWith("RBAC-GC"))) {
    const row = matrixRows.find((line) => line.includes(`| \`${id}\` |`));
    assert.ok(row, `missing later schema candidate row for ${id}`);
    assert.match(row, /`FUTURE_SCHEMA_VALIDATOR_GATE_CANDIDATE_ONLY`/);
  }
  for (const id of laterWorkflowCandidates) {
    const row = matrixRows.find((line) => line.includes(`| \`${id}\` |`));
    assert.ok(row, `missing later workflow candidate row for ${id}`);
    assert.match(row, /`FUTURE_WORKFLOW_PROMPT_GATE_CANDIDATE_ONLY`/);
  }
  for (const id of ["RBAC-GC-008", "RBAC-GC-010", "RBAC-GC-017"]) {
    const row = matrixRows.find((line) => line.includes(`| \`${id}\` |`));
    assert.ok(row, `missing human review candidate row for ${id}`);
    assert.match(row, /`HUMAN_PROFESSIONAL_REVIEW_GATE_REQUIRED`/);
  }
});

test("all rows remain not suitable for runtime gate inventory yet", () => {
  for (const row of matrixRows) {
    assert.match(row, /`RUNTIME_GATE_INVENTORY_DEFERRED`/);
    assert.match(row, /`NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT`/);
    assert.match(row, /`NOT_AUTHORIZED_FOR_PRODUCT_CANDIDATE`/);
    assert.match(row, /`NOT_AUTHORIZED_FOR_EXTERNAL_USE`/);
  }
});

test("current-status and matrix sections avoid forbidden unnegated current-state statuses", () => {
  const currentAndMatrix = `${currentStatus}\n${matrix}`;
  assertDoesNotIncludeAny([
    "`IMPLEMENTED`",
    "`RUNTIME_ENFORCED`",
    "`SCHEMA_ENFORCED`",
    "`WORKFLOW_ENFORCED`",
    "`APPROVED`",
    "`CERTIFIED`",
    "`READY`",
    "`REMEDIATED`",
  ], currentAndMatrix);
});

test("no-overclaim, no-reopening, raw/private/conclusion guard, and next posture are frozen", () => {
  assertIncludesAll(noOverclaimRules, sectionBetween("## No-Overclaim Rules", "## No-Reopening Rules"));
  assertIncludesAll(noReopeningTerms, sectionBetween("## No-Reopening Rules", "## Raw/Private/Conclusion Guard"));
  assertIncludesAll([
    "This boundary contains no raw/private source material.",
    "This boundary authorizes no source package inspection, PDF/image/screenshot/metadata inspection, metadata acquisition, source inspection, raw/private material inspection, or real private run.",
    "This boundary creates no legal, clinical, evidentiary, case-truth, credibility, offence, ownership, risk, sufficiency, police-report, pleading, marker-finding, security-finding, vulnerability-finding, severity, remediation, external-use, or product-candidate conclusion.",
  ], sectionBetween("## Raw/Private/Conclusion Guard", "## Next-Slice Posture"));
  assertIncludesAll([
    "`REVIEW_ONLY_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS`",
    "continued pause",
    "None are authorized by this boundary.",
  ], sectionBetween("## Next-Slice Posture", null));
});
