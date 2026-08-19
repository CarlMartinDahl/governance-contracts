const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
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

function assertDoesNotIncludeAny(values, text = doc) {
  for (const value of values) {
    assert.doesNotMatch(text, new RegExp(escapeRegExp(value)), `forbidden exact token ${value}`);
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = doc.indexOf(startHeading);
  assert.notEqual(start, -1, `missing section ${startHeading}`);
  const end = endHeading ? doc.indexOf(endHeading, start + startHeading.length) : doc.length;
  assert.notEqual(end, -1, `missing end section ${endHeading}`);
  return doc.slice(start, end);
}

test("doc exists and boundary/status tokens exist", () => {
  assert.ok(fs.existsSync(docPath));
  assertIncludesAll([
    "RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY",
    "DOCS_ONLY",
    "RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_ONLY",
    "RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_DERIVED_FROM_SCOPE_REVIEW",
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_USED_AS_CONTEXT_ONLY",
    "ADMIN_SUPPORT_ACCESS_INCLUDED_IN_CONTROL_SPECIFICATION_SCOPE",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "MODEL_AGENT_ALIGNMENT_USED_AS_INTERNAL_REPO_EVIDENCE_CONTEXT_ONLY",
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_FEASIBLE_AS_PROVE_ONLY_USED_AS_CONTEXT",
    "MODEL_AGENT_ALIGNS_WITH_EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_CONTEXT",
    "MODEL_AGENT_MISMATCH_CLASSIFICATION_NONE_USED_AS_CONTEXT",
    "PROVE_ONLY_PROTOCOL_DEVIATION_PRIOR_NPM_TEST_ACCIDENTALLY_RUN",
    "PRIOR_NPM_TEST_NOT_REQUIRED_PROVE_ONLY_VALIDATION_EVIDENCE",
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
  ]);
});

test("scope review context and protocol deviation note appear", () => {
  assertIncludesAll([
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_FROZEN_AND_COMMITTED",
    "Relationship To Frozen Scope Review",
    "external-review requirements remains advisory context only",
    "Model-agent alignment remains internal repo-evidence-derived orientation only",
    "Protocol Deviation Note",
    "npm test",
    "accidentally run",
    "does not mean release approval",
  ]);
});

test("all deterministic control rows and 22 matrix fields exist", () => {
  const matrix = sectionBetween("## RBAC / Role-Permission Control Specification Matrix", "## Material-Class Coverage");
  assertIncludesAll([
    "control ID",
    "actor type",
    "role category candidate",
    "permission category candidate",
    "material/resource scope",
    "allowed material classes",
    "prohibited material classes",
    "allowed actions",
    "prohibited actions",
    "admin/support access rule",
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
    "closure criteria",
    "what remains non-authorized until closure",
    "RBAC-RP-CS-001",
    "RBAC-RP-CS-002",
    "RBAC-RP-CS-003",
    "RBAC-RP-CS-004",
    "RBAC-RP-CS-005",
    "RBAC-RP-CS-006",
    "RBAC-RP-CS-007",
    "RBAC-RP-CS-008",
    "RBAC-RP-CS-009",
    "RBAC-RP-CS-010",
    "RBAC-RP-CS-011",
    "RBAC-RP-CS-012",
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

test("required material classes and admin/support access control section appear", () => {
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
    "## Admin/Support Access Control Section",
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
    "admin/support cannot substitute for human/professional review",
    "admin/support cannot create product candidate",
    "admin/support cannot authorize external-use",
  ]);
});

test("required summary sections appear", () => {
  assertIncludesAll([
    "## Relationship To Frozen Scope Review",
    "## Answer Table Summary For External Reviewer's Twelve Questions As Context Only",
    "## Internal Model-Agent Alignment Summary As Context Only",
    "## Protocol Deviation Note",
    "## Admin/Support Access Control Summary",
    "## Cross-Tenant/Case-Access Control Summary",
    "## Audit-Event Control Dependency Summary",
    "## Third-Party Routing Permission Control Summary",
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

test("exact gaps and blockers are preserved", () => {
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
    "raw-material routing not implemented",
    "retention/deletion not implemented",
    "third-party routing not authorized",
    "runtime gate inventory deferred",
    "product candidate none",
    "external-use unauthorized",
    "human/professional review required",
  ], gaps);
});

test("no-overclaim rules appear", () => {
  assertIncludesAll([
    "RBAC role-permission control specification does not mean RBAC implementation",
    "Role category candidate does not mean role exists",
    "Permission category candidate does not mean permission exists",
    "Admin/support access control rule does not mean admin/support model exists",
    "Material-class permission rule does not mean current access control exists",
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
    "DOCS_ONLY",
    "boundaries are not runtime enforcement",
  ]);
});

test("no-reopening rules appear", () => {
  assertIncludesAll([
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
    "audit logging implementation",
    "access logging implementation",
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
  ]);
});

test("evidence references and next-slice posture appear without authorization", () => {
  assertIncludesAll([
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_BOUNDARY_WITH_ADMIN_SUPPORT_ACCESS_v1.md",
    "tests/domain-rbac-role-permission-model-scope-review-boundary-with-admin-support-access-doc-freeze.test.js",
    "docs/DOMAIN_CONTRACTS_RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_v1.md",
    "tests/domain-rbac-gate-candidate-status-boundary-doc-freeze.test.js",
    "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_v1.md",
    "tests/domain-runtime-gate-candidate-status-inventory-boundary-after-rbac-gate-status-doc-freeze.test.js",
    "docs/DOMAIN_CONTRACTS_RBAC_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
    "tests/domain-rbac-control-specification-boundary-doc-freeze.test.js",
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
    "REVIEW_ONLY_RBAC_ROLE_PERMISSION_MODEL_CONTROL_SPECIFICATION_BOUNDARY",
    "DOCS_ONLY_RBAC_ROLE_PERMISSION_MODEL_GATE_CANDIDATE_STATUS_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary",
  ]);
});

test("negative authorization checks and raw/private/conclusion guard appear", () => {
  assertIncludesAll([
    "creates no RBAC implementation",
    "no access-control implementation",
    "no role fields",
    "no permission fields",
    "no role schema",
    "no permission schema",
    "no admin/support model",
    "no validator dispatch",
    "no registry/lookup",
    "no audit/access-log implementation",
    "no event taxonomy runtime code",
    "no log schema",
    "no log storage",
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
    "This boundary contains no raw/private source material",
    "authorizes no raw/private/source inspection",
    "no source package inspection",
    "no PDF/image/screenshot/metadata inspection",
    "no metadata acquisition",
    "no real private run",
  ]);
});

test("proof rejects stale or overclaiming exact tokens", () => {
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
