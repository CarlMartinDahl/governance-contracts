const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_v1.md",
);
const doc = fs.readFileSync(docPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(values, text = doc) {
  for (const value of values) {
    assert.match(text, new RegExp(escapeRegExp(value), "i"), `missing ${value}`);
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = doc.indexOf(startHeading);
  assert.notEqual(start, -1, `missing section ${startHeading}`);
  const end = endHeading ? doc.indexOf(endHeading, start + startHeading.length) : doc.length;
  assert.notEqual(end, -1, `missing end section ${endHeading}`);
  return doc.slice(start, end);
}

test("doc exists and freezes boundary/status tokens", () => {
  assert.ok(fs.existsSync(docPath));
  assertIncludesAll([
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS",
    "DOCS_ONLY",
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_ONLY",
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_FEASIBLE_AS_PROVE_ONLY",
    "ADMIN_SUPPORT_ACCESS_INCLUDED_IN_SCOPE",
    "MODEL_AGENT_ALIGNS_WITH_EXTERNAL_REVIEW_REQUIREMENTS",
    "MODEL_AGENT_MISMATCH_CLASSIFICATION_NONE",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "MODEL_AGENT_ALIGNMENT_USED_AS_INTERNAL_REPO_EVIDENCE_CONTEXT_ONLY",
    "PROVE_ONLY_PROTOCOL_DEVIATION_PRIOR_NPM_TEST_ACCIDENTALLY_RUN",
    "PRIOR_NPM_TEST_NOT_REQUIRED_PROVE_ONLY_VALIDATION_EVIDENCE",
    "RBAC_MODEL_NOT_IMPLEMENTED",
    "ACCESS_CONTROL_NOT_IMPLEMENTED",
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
  ]);
});

test("frozen result, advisory context, alignment, and protocol deviation are explicit", () => {
  assertIncludesAll([
    "external-review requirements is used as advisory context only",
    "The internal model security/governance-agent alignment result is used as repo-evidence-derived orientation only",
    "MODEL_AGENT_ALIGNS_WITH_EXTERNAL_REVIEW_REQUIREMENTS",
    "mismatch classification",
    "none",
    "npm test",
    "protocol deviation",
    "not required PROVE_ONLY validation evidence",
  ]);
});

test("matrix contains all 19 fields and required actor rows", () => {
  const matrix = sectionBetween("## RBAC / Role-Permission Scope Matrix", "## Material-Class Coverage");
  assertIncludesAll([
    "actor type",
    "role category",
    "permission category",
    "allowed material classes",
    "prohibited material classes",
    "allowed actions",
    "prohibited actions",
    "admin/support access rule",
    "human/professional review dependency",
    "audit-log dependency",
    "retention/deletion dependency",
    "third-party routing constraint",
    "current evidence level",
    "implementation gap",
    "required implementation evidence",
    "required test evidence",
    "blocker status",
    "closure criteria",
    "what remains non-authorized until closure",
    "primary user / case owner",
    "reviewer",
    "human/professional reviewer",
    "workflow agent/tool",
    "system/service account",
    "admin",
    "support",
    "third-party provider route",
    "export/download actor",
    "packet/delivery promotion actor",
    "retention/deletion operator",
    "audit/log viewer",
  ], matrix);
});

test("required material classes and admin/support coverage appear", () => {
  assertIncludesAll([
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
    "admin access to raw/private/source material",
    "admin access to source packages",
    "admin access to PDFs/images/screenshots/metadata",
    "admin/support log access",
    "admin/support export/download access",
    "admin/support packet/delivery promotion",
    "admin/support third-party routing approval",
    "admin/support retention/deletion operations",
    "admin/support bypass risk",
    "admin/support audit requirement",
    "admin/support human/professional review dependency",
  ]);
});

test("required summary sections appear", () => {
  assertIncludesAll([
    "## Answer Table For External Reviewer's Twelve Questions",
    "## Internal Model-Agent Alignment Result",
    "## Admin/Support Access Risk Summary",
    "## Cross-Tenant/Case-Access Risk Summary",
    "## Audit-Event Dependency Summary",
    "## Third-Party Routing Permission Summary",
    "## Runtime Gate Dependency Summary",
    "## Exact Gaps / Blockers",
    "## No-Overclaim Rules",
    "## No-Reopening Rules",
    "## Evidence References",
    "## Next-Slice Posture",
  ]);
});

test("answer table covers External Reviewer's twelve questions", () => {
  const answers = sectionBetween("## Answer Table For External Reviewer's Twelve Questions", "## Internal Model-Agent Alignment Result");
  for (let question = 1; question <= 12; question += 1) {
    assert.match(answers, new RegExp(`\\| ${question}\\. `), `missing question ${question}`);
  }
});

test("no-overclaim and no-reopening rules are preserved", () => {
  assertIncludesAll([
    "RBAC scope review does not mean RBAC implementation",
    "Role category does not mean role exists",
    "Permission category does not mean permission exists",
    "Admin/support access analysis does not mean admin/support model exists",
    "Material-class permission concept does not mean current access control exists",
    "Audit-log dependency does not mean audit/access-log implementation exists",
    "Runtime gate dependency does not mean runtime gate implementation exists",
    "Validator/schema dependency does not mean validator dispatch exists",
    "Registry/lookup dependency does not mean registry/lookup exists",
    "external-review requirements does not mean approval",
    "Model-agent convergence does not mean implementation authorization",
    "Accidental prior npm test does not mean release approval",
    "Required implementation evidence is future evidence",
    "Required test evidence is future evidence",
    "Product candidate remains none",
    "External-use remains unauthorized",
    "Human/professional review remains release gate",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "runtime implementation",
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
  ]);
});

test("evidence references and next posture appear without authorization", () => {
  assertIncludesAll([
    "docs/DOMAIN_CONTRACTS_RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
    "tests/domain-rbac-gate-candidate-status-boundary-doc-freeze.test.js",
    "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
    "tests/domain-runtime-gate-candidate-status-inventory-boundary-after-rbac-gate-status-doc-freeze.test.js",
    "docs/DOMAIN_CONTRACTS_RBAC_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
    "tests/domain-rbac-control-specification-boundary-doc-freeze.test.js",
    "docs/DOMAIN_CONTRACTS_RBAC_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
    "REVIEW_ONLY_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS",
    "DOCS_ONLY_RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary",
  ]);
});

test("negative authorization checks and raw/private/conclusion guard remain explicit", () => {
  assertIncludesAll([
    "creates no RBAC implementation",
    "access-control implementation",
    "role fields",
    "permission fields",
    "role schema",
    "permission schema",
    "admin/support model",
    "validator dispatch",
    "registry/lookup",
    "audit/access-log implementation",
    "event taxonomy runtime code",
    "log schema",
    "log storage",
    "raw-material routing implementation",
    "retention/deletion implementation",
    "third-party model/API routing",
    "runtime gate implementation",
    "runtime/API/schema/package behavior change",
    "product candidate",
    "external-use authorization",
    "release approval",
    "runtime certification",
    "technical sign-off",
    "External Reviewer approval",
    "legal/clinical/evidentiary/case-truth conclusions",
    "security/vulnerability findings",
    "severity",
    "remediation",
    "This boundary contains no raw/private source material",
    "authorizes no raw/private/source inspection",
    "source package inspection",
    "PDF/image/screenshot/metadata inspection",
    "metadata acquisition",
    "real private run",
  ]);
});
