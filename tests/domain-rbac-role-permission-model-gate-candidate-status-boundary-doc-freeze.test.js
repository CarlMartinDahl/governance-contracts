const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
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
  "## RBAC / Role-Permission Gate-Candidate Status Matrix",
  "## Future Runtime Gate Candidates",
);
const tableRows = matrix
  .split("\n")
  .filter((line) => line.startsWith("| `RBAC-RP-GC-"));

function rowForCandidate(id, sourceId, actorType) {
  const row = tableRows.find(
    (line) => line.includes(`| \`${id}\` | \`${sourceId}\` | ${actorType} |`),
  );
  assert.ok(row, `missing matrix row for ${id}`);
  return row;
}

function cellsForRow(row) {
  return row
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

const statusTokens = [
  "RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY",
  "DOCS_ONLY",
  "RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_ONLY",
  "RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATES_FUTURE_ONLY",
  "RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATES_NOT_IMPLEMENTED",
  "RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATES_NOT_RUNTIME_ENFORCEMENT",
  "RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATES_NOT_SCHEMA_ENFORCEMENT",
  "RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATES_NOT_WORKFLOW_ENFORCEMENT",
  "RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_USED_AS_CONTEXT_ONLY",
  "RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_FROZEN_AND_COMMITTED_USED_AS_CONTEXT",
  "RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_DERIVED_GATE_STATUS",
  "ADMIN_SUPPORT_ACCESS_INCLUDED_IN_GATE_CANDIDATE_SCOPE",
  "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
  "MODEL_AGENT_ALIGNMENT_USED_AS_INTERNAL_REPO_EVIDENCE_CONTEXT_ONLY",
  "RBAC_MODEL_NOT_IMPLEMENTED",
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
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "RETENTION_DELETION_NOT_IMPLEMENTED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
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

const matrixFields = [
  "gate candidate ID",
  "source control ID",
  "actor type",
  "role category candidate",
  "permission category candidate",
  "material/resource scope",
  "gate candidate family",
  "future gate category",
  "admin/support access implication",
  "human/professional review dependency",
  "required audit/access-log event",
  "retention/deletion dependency",
  "third-party routing constraint",
  "intended future enforcement layer",
  "current evidence level",
  "implementation gap",
  "required implementation evidence",
  "required test evidence",
  "blocker status",
  "runtime inventory status",
  "current authorization status",
  "what remains non-authorized until closure",
];

const candidates = [
  ["RBAC-RP-GC-001", "RBAC-RP-CS-001", "primary user / case owner"],
  ["RBAC-RP-GC-002", "RBAC-RP-CS-002", "reviewer"],
  ["RBAC-RP-GC-003", "RBAC-RP-CS-003", "human/professional reviewer"],
  ["RBAC-RP-GC-004", "RBAC-RP-CS-004", "workflow agent/tool"],
  ["RBAC-RP-GC-005", "RBAC-RP-CS-005", "system/service account"],
  ["RBAC-RP-GC-006", "RBAC-RP-CS-006", "admin"],
  ["RBAC-RP-GC-007", "RBAC-RP-CS-007", "support"],
  ["RBAC-RP-GC-008", "RBAC-RP-CS-008", "third-party provider route"],
  ["RBAC-RP-GC-009", "RBAC-RP-CS-009", "export/download actor"],
  ["RBAC-RP-GC-010", "RBAC-RP-CS-010", "packet/delivery promotion actor"],
  ["RBAC-RP-GC-011", "RBAC-RP-CS-011", "retention/deletion operator"],
  ["RBAC-RP-GC-012", "RBAC-RP-CS-012", "audit/log viewer"],
];

const materialClasses = [
  "SANITIZED_TEXT_PRIMARY_MATERIAL",
  "REDACTED_REVIEW_SIGNAL_MATERIAL",
  "NO_RAW_METADATA_MANIFEST_MATERIAL",
  "GENERATED_ARTIFACT_OR_EXPORT_MATERIAL",
  "LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
  "RAW_PRIVATE_SOURCE_MATERIAL",
  "SOURCE_PACKAGE_MATERIAL",
  "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
  "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
  "HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
];

const groupingSections = [
  "## Future Runtime Gate Candidates",
  "## Future Schema/Validator Gate Candidates",
  "## Future Workflow/Prompt Gate Candidates",
  "## Human/Professional Review Gate Candidates",
  "## Admin/Support Privileged-Access Gate Candidates",
  "## Third-Party Route Approval/Denial Gate Candidates",
  "## Export/Download And Packet/Delivery Promotion Gate Candidates",
  "## Retention/Deletion Authorization Gate Candidates",
  "## Audit/Log-View Gate Candidates",
  "## Not Suitable For Runtime Gate Inventory As Implementation Yet",
];

const evidenceReferences = [
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "tests/domain-rbac-role-permission-model-control-specification-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_v1.md",
  "tests/domain-rbac-role-permission-model-scope-review-boundary-with-admin-support-access-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
  "tests/domain-rbac-gate-candidate-status-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
  "tests/domain-runtime-gate-candidate-status-inventory-boundary-after-rbac-gate-status-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
  "[excluded private review artifact]",
  "[excluded private review artifact]",
];

test("doc exists and boundary/status tokens exist", () => {
  assert.ok(fs.existsSync(docPath));
  assertIncludesAll(statusTokens);
});

test("control specification, scope review, RBAC gate, runtime inventory, and protocol context appear", () => {
  assertIncludesAll([
    "Relationship To Frozen RBAC Role-Permission Control Specification",
    "RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_FROZEN_AND_COMMITTED",
    "Relationship To Frozen Scope Review",
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS",
    "Relationship To RBAC Gate-Candidate Status Boundary",
    "DOMAIN_CONTRACTS_RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
    "Relationship To Runtime Gate-Candidate Status Inventory",
    "DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
    "Protocol Deviation Note",
    "accidentally run",
    "does not mean release approval",
  ]);
});

test("all 12 deterministic rows and all 22 gate-candidate matrix fields exist", () => {
  assertIncludesAll(matrixFields, matrix);
  assert.equal(tableRows.length, 12);
  for (const [candidateId, sourceId, actorType] of candidates) {
    const row = rowForCandidate(candidateId, sourceId, actorType);
    assert.equal(cellsForRow(row).length, 22, `${candidateId} must have 22 cells`);
    assert.match(row, /future/i);
    assert.match(row, /RUNTIME_GATE_INVENTORY_DEFERRED/);
    assert.match(row, /NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT/);
  }
});

test("all required material classes and grouping sections appear", () => {
  assertIncludesAll(materialClasses);
  assertIncludesAll(groupingSections);
});

test("admin/support gate-candidate section appears", () => {
  assertIncludesAll([
    "## Admin/Support Gate-Candidate Section",
    "admin raw/private/source access gate candidate",
    "admin source-package access gate candidate",
    "admin PDF/image/screenshot/metadata access gate candidate",
    "admin/support log access gate candidate",
    "admin/support export/download gate candidate",
    "admin/support packet/delivery promotion gate candidate",
    "admin/support third-party routing approval gate candidate",
    "admin/support retention/deletion operation gate candidate",
    "admin/support bypass-prevention gate candidate",
    "admin/support audit-event gate candidate",
    "admin/support human/professional review dependency",
    "admin/support cannot substitute for human/professional review",
    "admin/support cannot create product candidate",
    "admin/support cannot authorize external-use",
  ]);
});

test("required relationship and summary sections appear", () => {
  assertIncludesAll([
    "## Relationship To Frozen RBAC Role-Permission Control Specification",
    "## Relationship To Frozen Scope Review",
    "## Relationship To RBAC Gate-Candidate Status Boundary",
    "## Relationship To Runtime Gate-Candidate Status Inventory",
    "## Answer Table Summary For External Reviewer's Twelve Questions As Context Only",
    "## Internal Model-Agent Alignment Summary As Context Only",
    "## Admin/Support Gate-Candidate Summary",
    "## Cross-Tenant/Case-Access Gate-Candidate Summary",
    "## Audit-Event Gate-Candidate Dependency Summary",
    "## Third-Party Routing Gate-Candidate Summary",
    "## Runtime Gate Dependency Summary",
    "## Exact Gaps / Blockers",
    "## Recommended Smallest Safe Next Posture",
  ]);
});

test("answer table covers External Reviewer's twelve questions as context only", () => {
  const answers = sectionBetween(
    "## Answer Table Summary For External Reviewer's Twelve Questions As Context Only",
    "## Internal Model-Agent Alignment Summary As Context Only",
  );
  for (let question = 1; question <= 12; question += 1) {
    assert.match(answers, new RegExp(`\\| ${question}\\. `), `missing question ${question}`);
  }
  assert.match(answers, /context/i);
});

test("exact gaps and blockers appear", () => {
  const gaps = sectionBetween("## Exact Gaps / Blockers", "## No-Overclaim Rules");
  assertIncludesAll([
    "RBAC model not implemented",
    "role fields not created",
    "permission fields not created",
    "role schema not created",
    "permission schema not created",
    "admin/support model not created",
    "admin/support access unresolved",
    "global access-control model not created",
    "audit/access-log implementation not created",
    "event taxonomy runtime code not created",
    "log schema not created",
    "log storage not created",
    "raw-material routing not implemented",
    "retention/deletion not implemented",
    "third-party routing not authorized",
    "runtime gate inventory deferred",
    "product candidate none",
    "external-use unauthorized",
    "human/professional review required",
  ], gaps);
});

test("runtime inventory and enforcement denial appear for every row plus global rule", () => {
  assert.match(doc, /all candidates remain `RUNTIME_GATE_INVENTORY_DEFERRED`/i);
  assert.match(doc, /all candidates remain `NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT`/i);
  for (const row of tableRows) {
    assert.match(row, /RUNTIME_GATE_INVENTORY_DEFERRED/);
    assert.match(row, /NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT/);
  }
});

test("no-overclaim and no-reopening rules appear", () => {
  assertIncludesAll([
    "gate candidate status does not mean gate implementation",
    "RBAC role-permission gate candidate does not mean RBAC implementation",
    "role category candidate does not mean role exists",
    "permission category candidate does not mean permission exists",
    "admin/support gate candidate does not mean admin/support model exists",
    "material-class permission gate candidate does not mean current access control exists",
    "audit-event gate candidate does not mean audit/access-log implementation exists",
    "runtime gate candidate does not mean runtime gate implementation exists",
    "schema/validator gate candidate does not mean validator dispatch exists",
    "registry/lookup dependency does not mean registry/lookup exists",
    "external-review requirements does not mean approval",
    "model-agent convergence does not mean implementation authorization",
    "accidental prior npm test does not mean release approval",
    "required implementation evidence is future evidence",
    "required test evidence is future evidence",
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
    "admin/support model creation",
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
    "SWE psykiskt vald legal modelling",
    "Nordic comparison",
  ]);
});

test("evidence references and next-slice posture appear without authorization", () => {
  assertIncludesAll(evidenceReferences);
  const next = sectionBetween("## Recommended Smallest Safe Next Posture", null);
  assertIncludesAll([
    "REVIEW_ONLY_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY",
    "PROVE_ONLY_RBAC_ROLE_PERMISSION_MODEL_RUNTIME_GATE_READINESS_SCOPE_REVIEW",
    "continued pause",
    "None are authorized by this boundary",
  ], next);
});

test("negative authorization checks and raw/private/conclusion guard appear", () => {
  assertIncludesAll([
    "This boundary creates no RBAC/access-control implementation",
    "no role fields",
    "no permission fields",
    "no role schema",
    "no permission schema",
    "no admin/support model",
    "no validator dispatch",
    "no registry/lookup",
    "no audit/access-log implementation",
    "no event taxonomy runtime code",
    "no log schema/storage",
    "no raw-material routing implementation",
    "no retention/deletion implementation",
    "no third-party routing",
    "no runtime gate implementation",
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
    "Raw/Private/Conclusion Guard",
    "contains no raw/private source material",
    "does not inspect raw/private material",
    "source locator material",
  ]);
});

test("stale or overclaiming exact status tokens are rejected", () => {
  assertDoesNotIncludeAny([
    "RBAC_IMPLEMENTED",
    "ACCESS_CONTROL_IMPLEMENTED",
    "ROLE_SCHEMA_CREATED",
    "PERMISSION_SCHEMA_CREATED",
    "ADMIN_SUPPORT_MODEL_CREATED",
    "RUNTIME_ENFORCED",
    "SCHEMA_ENFORCED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
  ]);
});
