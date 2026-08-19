const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
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

const matrix = sectionBetween("## Control Specification Matrix", "## Evidence References");
const tableRows = matrix
  .split("\n")
  .filter((line) => line.startsWith("| `AAL-CS-"));

function rowForSurface(surface) {
  const row = tableRows.find((line) => line.includes(`| \`${surface}\` |`));
  assert.ok(row, `missing matrix row for ${surface}`);
  return row;
}

function cellsForRow(row) {
  return row
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

const specificationFields = [
  "control ID",
  "control surface",
  "event family",
  "event type candidate",
  "allowed event content",
  "prohibited event content",
  "required no-raw/no-private/no-source-locator constraint",
  "subject / RBAC dependency",
  "material-class dependency",
  "retention/deletion dependency",
  "third-party/API dependency",
  "where event would be generated later",
  "where event must not be generated",
  "intended enforcement layer",
  "current evidence level",
  "implementation gap",
  "required implementation evidence",
  "required test evidence",
  "blocker status",
  "closure criteria",
  "what remains non-authorized until closure",
];

const controlSurfaces = [
  "material intake",
  "blocked/prohibited ingress",
  "quarantine/block decision",
  "redaction/sanitization",
  "material routing",
  "review access",
  "manifest validation",
  "export/download access",
  "packet/delivery promotion attempt",
  "local log / test transcript handling",
  "admin/support access attempt",
  "retention/deletion operation",
  "third-party route denial/approval",
  "runtime/schema/workflow gate candidate",
  "human/professional review access",
];

const statusTokens = [
  "AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY",
  "DOCS_ONLY",
  "AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_ONLY",
  "AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_DERIVED_FROM_FEASIBILITY_ALIGNMENT",
  "AUDIT_ACCESS_LOG_FEASIBILITY_SCOPE_ALIGNED_AFTER_RBAC_ALIGNMENT_USED_AS_CONTEXT",
  "RBAC_CONTROL_SPECIFICATION_SCOPE_ALIGNED_AFTER_RAW_ROUTING_HARDENING_USED_AS_CONTEXT",
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_EXTERNAL_REVIEWER_21_POINT_HARDENED_USED_AS_CONTEXT",
  "AUDIT_ACCESS_LOG_SPECIFICATION_NOT_CURRENT_LOGGING",
  "AUDIT_ACCESS_LOG_SPECIFICATION_NOT_IMPLEMENTATION",
  "AUDIT_LOGGING_NOT_IMPLEMENTED",
  "ACCESS_LOGGING_NOT_IMPLEMENTED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "FORMAL_AUDIT_LOGGING_NOT_EVIDENCED",
  "ACCESS_LOGGING_NOT_EVIDENCED",
  "LOCAL_LOGS_NOT_CI_EVIDENCE",
  "LOCAL_LOGS_NOT_PACKET_COMPONENTS",
  "RBAC_NOT_IMPLEMENTED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
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
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
  "PRODUCT_CANDIDATE_NONE",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
];

const allowedContent = [
  "subject reference",
  "role/permission concept",
  "tenant/case scope",
  "material class",
  "route/surface",
  "decision status",
  "timestamp category",
  "reason code",
  "no-raw/no-private/no-source-locator marker",
];

const prohibitedContent = [
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
];

const evidenceReferences = [
  "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
  "tests/domain-audit-access-log-control-specification-feasibility-review-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_RBAC_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "tests/domain-rbac-control-specification-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  "tests/domain-raw-material-routing-control-specification-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
  "[excluded private review artifact]",
  "[excluded private review artifact]",
];

test("doc exists and freezes the DOCS_ONLY boundary posture", () => {
  assert.ok(fs.existsSync(docPath));
  assertIncludesAll([
    "# Audit/Access-Log Control Specification Boundary v1",
    "Boundary name: `AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_ONLY`",
    "derived from the aligned audit/access-log feasibility review at `0167ee6",
    "RBAC alignment at `71f8383",
    "raw-material routing control-specification hardening at `995a48a",
    "This boundary is not current logging.",
    "This boundary is not audit logging implementation.",
    "This boundary is not access logging implementation.",
    "This boundary is not event taxonomy runtime code.",
    "This boundary is not log schema.",
    "This boundary is not log storage.",
    "This boundary is not runtime enforcement.",
    "This boundary resolves no blocker.",
    "This boundary creates no implementation evidence.",
    "This boundary changes no runtime/API/schema/package behavior.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "Human/professional review remains release gate.",
    "Runtime gate inventory remains deferred.",
  ]);
});

test("required status tokens and evidence references are present", () => {
  assertIncludesAll(statusTokens);
  assertIncludesAll(evidenceReferences);
});

test("allowed and prohibited event content are frozen", () => {
  assertIncludesAll(allowedContent, sectionBetween("## Allowed Event Content", "## Prohibited Log Content"));
  assertIncludesAll(prohibitedContent, sectionBetween("## Prohibited Log Content", "## Control Specification Matrix"));
});

test("all 21 specification fields and all 15 control surfaces are row-scoped", () => {
  assertIncludesAll(specificationFields, matrix);
  assert.equal(tableRows.length, controlSurfaces.length);

  for (const surface of controlSurfaces) {
    const row = rowForSurface(surface);
    const cells = cellsForRow(row);
    assert.equal(cells.length, specificationFields.length, `${surface} must have 21 fields`);
    assert.match(cells[0], /^`AAL-CS-\d{3}`$/);
    assert.equal(cells[1], `\`${surface}\``);
    assert.notEqual(cells[2], "", `${surface} missing event family`);
    assert.notEqual(cells[3], "", `${surface} missing event type candidate`);
    assertIncludesAll(allowedContent, cells[4]);
    assert.match(cells[5], /raw|payload|content/i);
    assert.match(cells[5], /private|sensitive/i);
    assert.match(cells[5], /source|locator|path|page|URL|metadata/i);
    assert.match(cells[5], /product/i);
    assert.match(cells[5], /external-use/i);
    assert.match(cells[6], /never|not/i);
    assert.match(cells[6], /payload|material|content|locator|private|source|body|data/i);
    assert.match(cells[7], /RBAC|subject|permission|reviewer|support|lifecycle|gate/i);
    assert.match(cells[8], /material class/i);
    assert.match(cells[9], /retention|deletion|lifecycle/i);
    assert.match(cells[10], /third-party|API|provider|route/i);
    assert.match(cells[11], /future/i);
    assert.notEqual(cells[12], "", `${surface} missing where event must not be generated`);
    assert.match(cells[13], /gate|candidate/i);
    assert.match(cells[14], /SPECIFICATION_ONLY/i);
    assert.notEqual(cells[15], "", `${surface} missing implementation gap`);
    assert.match(cells[16], /tracked|event|path|taxonomy|guard|policy|inventory/i);
    assert.match(cells[17], /test/i);
    assert.equal(cells[18], "`UNRESOLVED`");
    assert.match(cells[19], /future|tests|evidence/i);
    assert.notEqual(cells[20], "", `${surface} missing non-authorized posture`);
  }
});

test("row-scoped assertions bind each required surface to dependencies, gaps, evidence, closure, and non-authorization", () => {
  const expectedFragmentsBySurface = {
    "material intake": ["intake attempt", "material-intake workflow gate", "allowed intake event", "external-use"],
    "blocked/prohibited ingress": ["intake denial", "denied ingress", "denial event", "source package inspection"],
    "quarantine/block decision": ["block/quarantine decision", "quarantine/block decision event", "log schema"],
    "redaction/sanitization": ["redaction/sanitization", "redaction event", "source inspection"],
    "material routing": ["routing decision", "wrong-material-class", "third-party routing"],
    "review access": ["access event", "wrong-tenant", "access logging implementation"],
    "manifest validation": ["manifest validation", "no source-locator tests", "metadata acquisition"],
    "export/download access": ["export/download access", "no external-use claim tests", "packet addition"],
    "packet/delivery promotion attempt": ["packet promotion decision", "promotion denial", "delivery to External Reviewer"],
    "local log / test transcript handling": ["local log treatment", "local-log non-CI", "local logs as packet components"],
    "admin/support access attempt": ["privileged access attempt", "bypass prevention", "admin/support model"],
    "retention/deletion operation": ["lifecycle operation", "policy linkage tests", "purge logic"],
    "third-party route denial/approval": ["third-party route decision", "third-party no-route", "real private run"],
    "runtime/schema/workflow gate candidate": ["gate decision", "runtime gate inventory", "validator dispatch"],
    "human/professional review access": ["human/professional review access", "no-conclusion", "External Reviewer approval"],
  };

  for (const [surface, fragments] of Object.entries(expectedFragmentsBySurface)) {
    assertIncludesAll(fragments, rowForSurface(surface));
  }
});

test("no-overclaim, no-reopening, and next-slice posture are explicit", () => {
  assertIncludesAll([
    "## No-Overclaim Rules",
    "Derived-from-context wording does not create approval, implementation, runtime enforcement, or closure.",
    "Future event families are specification candidates only, not current logging.",
    "Required implementation evidence and required test evidence are future evidence requirements, not current closure.",
    "## No-Reopening Rules",
    "This boundary creates no runtime implementation",
    "audit logging implementation",
    "access logging implementation",
    "event taxonomy runtime code",
    "log schema",
    "log storage",
    "RBAC implementation",
    "access-control implementation",
    "raw-material routing implementation",
    "retention/deletion implementation",
    "third-party routing implementation",
    "role field",
    "permission field",
    "role schema",
    "permission schema",
    "admin/support model",
    "validator dispatch",
    "registry lookup",
    "real private run",
    "source inspection",
    "raw/private material inspection",
    "source package inspection",
    "PDF/image/screenshot/metadata inspection",
    "metadata acquisition",
    "logs, artifacts, PDF, archive, ZIP",
    "delivery to External Reviewer",
    "packet-component approval",
    "generated PDF repo evidence",
    "product-candidate selection",
    "external-use readiness",
    "release approval",
    "runtime certification",
    "technical sign-off",
    "External Reviewer approval",
    "legal/clinical/evidentiary/case-truth conclusion",
    "security finding",
    "vulnerability finding",
    "severity",
    "remediation",
    "Next possible safe slice may be:",
    "`REVIEW_ONLY_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY`",
    "`DOCS_ONLY_RBAC_GATE_CANDIDATE_STATUS_BOUNDARY`",
    "continued pause",
    "None are authorized by this boundary.",
  ]);
});

test("negative authorization checks reject implementation, approval, and evidence overclaims", () => {
  const forbiddenClaims = [
    "audit logging implemented",
    "access logging implemented",
    "event taxonomy runtime code created",
    "log schema created",
    "log storage created",
    "RBAC implemented",
    "runtime/API/schema/package behavior changed",
    "product candidate selected",
    "external-use authorized",
    "release approved",
    "runtime certified",
    "technical sign-off created",
    "External Reviewer approved",
    "security finding created",
    "vulnerability finding created",
    "severity assigned",
    "remediation recommended",
    "remediation implemented",
    "blocker resolved",
    "implementation evidence created",
  ];

  assertDoesNotIncludeAny(forbiddenClaims);
});

test("no raw/private/conclusion material appears outside blocked-category wording", () => {
  const allowedSections = [
    sectionBetween("## Allowed Event Content", "## Prohibited Log Content"),
    sectionBetween("## Prohibited Log Content", "## Control Specification Matrix"),
    sectionBetween("## Control Specification Matrix", "## Evidence References"),
    sectionBetween("## No-Reopening Rules", "## Next-Slice Posture"),
  ].join("\n");

  const sensitiveTerms = [
    "raw source text",
    "private facts",
    "source locators",
    "filenames/private paths",
    "page references",
    "URLs/tokens",
    "PDF/image/metadata content",
    "sensitive personal details",
    "legal/clinical/evidentiary/case-truth conclusions",
  ];

  for (const term of sensitiveTerms) {
    const allOccurrences = [...doc.matchAll(new RegExp(escapeRegExp(term), "gi"))].length;
    const allowedOccurrences = [...allowedSections.matchAll(new RegExp(escapeRegExp(term), "gi"))].length;
    assert.equal(allOccurrences, allowedOccurrences, `${term} appears outside blocked-category wording`);
  }
}
);
