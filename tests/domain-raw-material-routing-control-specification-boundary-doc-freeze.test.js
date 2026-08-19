const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
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

function rowForMaterial(materialClass, table) {
  const row = table
    .split("\n")
    .find((line) => line.startsWith("| `RMR-CS-") && line.includes(`| \`${materialClass}\` |`));
  assert.ok(row, `missing table row for material class: ${materialClass}`);
  return row;
}

const statusTokens = [
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY",
  "DOCS_ONLY",
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_ONLY",
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_EXTERNAL_REVIEWER_21_POINT_HARDENED",
  "EXTERNAL_REVIEWER_21_FIELD_STRUCTURE_INCLUDED",
  "CONTROL_ID_INCLUDED_PER_MATERIAL_CLASS",
  "CURRENT_EVIDENCE_LEVEL_INCLUDED_PER_MATERIAL_CLASS",
  "INTENDED_ENFORCEMENT_LAYER_INCLUDED_PER_MATERIAL_CLASS",
  "IMPLEMENTATION_GAP_INCLUDED_PER_MATERIAL_CLASS",
  "RBAC_ACCESS_CONTROL_DEPENDENCY_INCLUDED_PER_MATERIAL_CLASS",
  "RAW_MATERIAL_ROUTING_SPECIFICATION_NOT_IMPLEMENTATION",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "RAW_MATERIAL_ROUTING_NOT_RESOLVED",
  "NO_BLOCKER_RESOLVED",
  "NO_IMPLEMENTATION_EVIDENCE_CREATED",
  "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
  "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
  "SOURCE_PACKAGE_NOT_INSPECTED",
  "PDF_IMAGE_SCREENSHOT_METADATA_NOT_INSPECTED",
  "METADATA_NOT_ACQUIRED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "REAL_PRIVATE_RUN_NOT_STARTED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "PRODUCT_CANDIDATE_NONE",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
  "NO_SECURITY_FINDING_CREATED",
  "NO_VULNERABILITY_FINDING_CREATED",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "NO_REMEDIATION_IMPLEMENTED",
];

const expectedFields = [
  "Control ID",
  "Material class",
  "Allowed ingress",
  "Prohibited ingress",
  "Allowed processing layer",
  "Prohibited processing layer",
  "Allowed egress",
  "Prohibited egress",
  "Required redaction/sanitization point",
  "Required audit/access-log event",
  "Retention/deletion dependency",
  "RBAC/access-control dependency",
  "Third-party model/API constraint",
  "Current evidence level",
  "Intended enforcement layer",
  "Implementation gap",
  "Required implementation evidence",
  "Required test evidence",
  "Blocker status",
  "Closure criteria",
  "What remains non-authorized until closure",
];

const materialRows = [
  [
    "RMR-CS-001",
    "SANITIZED_TEXT_PRIMARY_MATERIAL",
    "synthetic/sanitized planning material only",
    "raw/source/PDF metadata",
    "docs/workflow and no-raw validation",
    "raw processing",
    "marker/pointer/review-route only",
    "external-use, product use, External Reviewer delivery",
    "sanitize before any route",
    "sanitized intake event",
    "scoped policy required",
    "role/permission access required",
    "third-party routing blocked until provider/routing status",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "`FUTURE_WORKFLOW_GATE_CANDIDATE`",
    "no routing implementation; no audit/access-log implementation; no RBAC/access-control implementation; no retention/deletion implementation; no runtime gate inventory",
    "future runtime/workflow gate evidence",
    "tests proving no raw/private leakage",
    "unresolved",
    "scoped routing path and tests prove sanitized-only routing without raw/private leakage",
    "real private run, external-use, product candidate, release approval, runtime certification, technical sign-off",
  ],
  [
    "RMR-CS-002",
    "REDACTED_REVIEW_SIGNAL_MATERIAL",
    "no-raw/redacted review signal concept",
    "raw source ingress",
    "human/professional review workflow",
    "automated raw inference",
    "review-only signal",
    "external-use/product conclusions",
    "redaction before review routing",
    "review access event",
    "retention/RBAC required",
    "review-role access required",
    "no third-party raw/private routing",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "`FUTURE_WORKFLOW_GATE_CANDIDATE`",
    "no redaction workflow implementation; no review workflow gate evidence; no audit/access-log implementation; no RBAC/access-control implementation; no retention/deletion implementation",
    "future redaction workflow path",
    "tests for redaction and review-only egress",
    "unresolved",
    "redacted-review workflow and tests prove no raw/private signal leakage",
    "external-use, product candidate, release approval, runtime certification, technical sign-off",
  ],
  [
    "RMR-CS-003",
    "NO_RAW_METADATA_MANIFEST_MATERIAL",
    "contract/validator fixture only",
    "metadata acquisition/population",
    "schema validation",
    "runtime/dispatch/registry use",
    "validation result only",
    "matrix/proof/product",
    "no-raw field contract before manifest use",
    "manifest validation event if later used",
    "required if persisted",
    "required if access-controlled",
    "no third-party routing",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "`FUTURE_SCHEMA_VALIDATOR_GATE_CANDIDATE`",
    "no metadata acquisition authorization; no manifest instance authorization; no consumer path; no audit/access-log implementation; no retention/deletion implementation",
    "future acquisition contract and consumer path",
    "manifest instance boundary and validator/consumer tests",
    "unresolved",
    "authorized manifest workflow and tests prove no raw metadata acquisition or leakage",
    "metadata acquisition, manifest instance creation, product candidate, external-use",
  ],
  [
    "RMR-CS-004",
    "GENERATED_ARTIFACT_OR_EXPORT_MATERIAL",
    "documented export/artifact routes for tested surfaces",
    "packet/delivery approval ingress",
    "tenant/case/capability-gated route surfaces",
    "delivery/product use",
    "scoped export/download only",
    "External Reviewer delivery/external-use",
    "before export/download if sensitive content is present",
    "download/access event",
    "artifact lifecycle policy required",
    "role/permission model required beyond tenant/case/capability",
    "no third-party routing",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "`FUTURE_RUNTIME_GATE_CANDIDATE`",
    "no packet/delivery runtime gate; no role-aware export/download policy; no audit/access-log implementation; no RBAC/access-control implementation; no retention/deletion implementation",
    "packet/delivery gate evidence if later used",
    "allow/deny, wrong-case, overexposure, packet-gate tests",
    "unresolved beyond documented surfaces",
    "scoped artifact routing and tests prove no unauthorized delivery, external-use, or overexposure",
    "External Reviewer delivery, external-use, product candidate, release approval, runtime certification, technical sign-off",
  ],
  [
    "RMR-CS-005",
    "LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
    "reviewed summary only",
    "local-test-output inspection or CI evidence treatment",
    "summary in docs",
    "runtime or packet treatment",
    "local review summary",
    "CI evidence or packet component",
    "before any summary",
    "future log access event if authorized",
    "log retention policy required",
    "log access role required",
    "no third-party routing",
    "`DOCS_ONLY`",
    "`DOCS_ONLY_UNTIL_SEPARATE_AUTHORIZATION`",
    "no log classification/access path; no audit/access-log implementation; no retention/deletion implementation; no RBAC/access-control implementation; no packet/CI evidence approval",
    "future log classification/access path",
    "log classification, retention, access logging, non-packet tests",
    "unresolved",
    "scoped log policy and tests prove logs are not treated as CI evidence or packet components unless separately approved",
    "CI evidence use, packet component use, external-use, release approval",
  ],
  [
    "RMR-CS-006",
    "RAW_PRIVATE_SOURCE_MATERIAL",
    "none",
    "all current ingress",
    "none",
    "all runtime/workflow/model processing",
    "none",
    "all egress",
    "only after explicit future authorization",
    "attempted ingress/block event",
    "retention/deletion required before any authorized handling",
    "RBAC required before any authorized handling",
    "third-party routing blocked",
    "`NOT_AUTHORIZED` / `EXPLICITLY_UNRESOLVED`",
    "`NOT_AUTHORIZED_UNTIL_SEPARATE_APPROVAL`",
    "no routing implementation; no quarantine/block runtime gate; no raw-routing policy; no audit/access-log implementation; no RBAC/access-control implementation; no retention/deletion implementation; no runtime gate inventory",
    "raw-routing policy, quarantine implementation, deny path",
    "negative leakage tests, quarantine/minimization tests",
    "unresolved",
    "explicit future authorization, quarantine/block implementation, and tests prove no unauthorized raw/private routing",
    "raw/private inspection, source inspection, real private run, third-party routing, external-use, product candidate",
  ],
  [
    "RMR-CS-007",
    "SOURCE_PACKAGE_MATERIAL",
    "none",
    "package/source inspection",
    "none",
    "source package opening/routing",
    "none",
    "archive/delivery/model/API",
    "none unless separately authorized",
    "attempted package handling event",
    "package retention/deletion policy required before any authorized handling",
    "RBAC required before any authorized handling",
    "no third-party routing",
    "`NOT_AUTHORIZED`",
    "`NOT_AUTHORIZED_UNTIL_SEPARATE_APPROVAL`",
    "no source package handling authorization; no package quarantine/block runtime gate; no audit/access-log implementation; no RBAC/access-control implementation; no retention/deletion implementation",
    "source-package routing spec and deny implementation",
    "source-package deny tests before activation",
    "unresolved",
    "explicit future authorization and tests prove source packages are blocked/quarantined unless separately approved",
    "source package inspection, archive/ZIP routing, model/API routing, external-use, product candidate",
  ],
  [
    "RMR-CS-008",
    "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
    "none",
    "PDF/image/metadata inspection",
    "none",
    "OCR/metadata extraction",
    "none",
    "repo evidence/packet component",
    "before metadata acquisition, if ever authorized",
    "attempted access/acquisition event",
    "metadata retention/deletion policy required before any authorized handling",
    "RBAC required before any authorized handling",
    "no third-party routing",
    "`NOT_AUTHORIZED` / `DOCS_ONLY`",
    "`NOT_AUTHORIZED_UNTIL_SEPARATE_APPROVAL`",
    "no metadata acquisition authorization; no PDF/image/screenshot inspection authorization; no OCR/metadata extraction route; no audit/access-log implementation; no RBAC/access-control implementation; no retention/deletion implementation",
    "explicit metadata acquisition contract and blocking path",
    "metadata acquisition denial and no-raw tests",
    "unresolved",
    "explicit future authorization and tests prove no unauthorized PDF/image/screenshot/metadata inspection or egress",
    "PDF/image/screenshot/metadata inspection, OCR, metadata extraction, repo evidence use, packet component use",
  ],
  [
    "RMR-CS-009",
    "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    "none for raw/private; sanitized routing unresolved",
    "raw/private routing",
    "none until provider/data-routing status",
    "third-party model/API processing",
    "none",
    "all third-party/API egress without approval",
    "before any future provider route",
    "third-party route denial/approval event",
    "provider retention/deletion posture required",
    "route authorization/RBAC required",
    "provider status, terms, routing map, audit, retention, RBAC required before use",
    "`EXPLICITLY_UNRESOLVED` / `ARCHITECTURE_REQUIRED_FIRST`",
    "`FUTURE_RUNTIME_GATE_CANDIDATE`",
    "no third-party provider/API routing status; no provider record; no data-routing map; no audit/access-log implementation; no RBAC/access-control implementation; no retention/deletion implementation",
    "provider record, data-routing map, no-unauthorized-route control",
    "tests proving no unauthorized third-party routing",
    "unresolved",
    "provider/API status and tests prove scoped third-party routing posture without raw/private leakage",
    "third-party routing, real private run, external-use, product candidate, release approval, runtime certification, technical sign-off",
  ],
  [
    "RMR-CS-010",
    "HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
    "review-gate context only",
    "raw/private/source material unless separately authorized",
    "human/professional review",
    "automated conclusion/product use",
    "review-only handoff",
    "approval/sign-off/external-use",
    "before review handoff",
    "review access event",
    "review-material retention/deletion policy required",
    "review-role access required",
    "no third-party routing",
    "`HUMAN_PROFESSIONAL_REVIEW_GATE_REQUIRED` / `DOCS_ONLY`",
    "`HUMAN_PROFESSIONAL_REVIEW_GATE_REQUIRED`",
    "no review workflow gate evidence; no approval/sign-off gate; no audit/access-log implementation; no RBAC/access-control implementation; no retention/deletion implementation",
    "workflow gate evidence if later implemented",
    "tests preserving no-conclusion/no-approval posture",
    "unresolved",
    "scoped human-review workflow and tests prove no unauthorized approval, sign-off, or external-use",
    "approval, sign-off, external-use, product candidate, release approval, runtime certification",
  ],
];

test("boundary doc exists and freezes docs-only raw-material routing control specification posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "Boundary name: `RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_ONLY`",
    "This boundary creates a raw-material routing control specification only.",
    "It is derived from the frozen raw-material routing feasibility review.",
    "It is also hardened against the direct internal security-agent matrix scope review where `SUITABLE_AS_SCOPE_UNDERLAG` is scope input only.",
    "This hardening explicitly includes External Reviewer's 21-field Raw-Material Routing Control Specification v1 structure.",
    "It is not implementation.",
    "It is not remediation.",
    "It is not a security finding.",
    "It is not a vulnerability finding.",
    "It assigns no severity.",
    "It recommends no remediation.",
    "It does not resolve raw-material routing.",
    "It does not resolve data-handling blockers.",
    "It does not create implementation evidence.",
    "It does not change runtime/API/schema/package behavior.",
    "It does not authorize runtime gate inventory.",
    "It preserves that DOCS_ONLY boundaries are not runtime enforcement.",
  ]);
});

test("all required current status tokens appear", () => {
  assertIncludesAll(statusTokens);
});

test("all ten material-class rows appear and no extra rows are present", () => {
  const table = sectionBetween("## Control Specification Matrix", "## Summary Findings");
  const rows = table
    .split("\n")
    .filter((line) => line.startsWith("| `RMR-CS-"));
  assert.equal(rows.length, 10);
  for (const [, materialClass] of materialRows) {
    assertIncludesAll([materialClass], table);
  }
});

test("control specification matrix has the exact 21 External Reviewer fields", () => {
  const table = sectionBetween("## Control Specification Matrix", "## Summary Findings");
  assertIncludesAll(expectedFields, table);
});

test("each material row has control ID, evidence, enforcement layer, implementation gap, and RBAC/access-control dependency", () => {
  const table = sectionBetween("## Control Specification Matrix", "## Summary Findings");
  for (const rowParts of materialRows) {
    const [
      controlId,
      materialClass,
      , , , , , , , ,
      ,
      rbacAccessControlDependency,
      ,
      currentEvidenceLevel,
      intendedEnforcementLayer,
      implementationGap,
    ] = rowParts;
    const row = rowForMaterial(materialClass, table);
    assertIncludesAll([
      controlId,
      materialClass,
      rbacAccessControlDependency,
      currentEvidenceLevel,
      intendedEnforcementLayer,
      implementationGap,
    ], row);
  }
});

test("row-scoped assertions bind all 21 External Reviewer fields together", () => {
  const table = sectionBetween("## Control Specification Matrix", "## Summary Findings");
  for (const rowParts of materialRows) {
    const [, materialClass, ...expectedParts] = rowParts;
    const row = rowForMaterial(materialClass, table);
    assertIncludesAll(rowParts, row);
    assertIncludesAll(expectedParts, row);
  }
});

test("required summary findings appear", () => {
  const section = sectionBetween("## Summary Findings", "## Evidence References");
  assertIncludesAll([
    "Raw-material routing control specification is derived from the frozen feasibility review and remains DOCS_ONLY.",
    "Sanitized/no-raw routing can only be specified as sanitized-only future workflow/runtime candidates.",
    "Raw/private source material must remain deny-by-default with future block/quarantine requirements.",
    "Source package material must remain deny-by-default.",
    "PDF/image/screenshot/metadata material must remain deny-by-default.",
    "Third-party model/API routing must remain deny-by-default until provider status, data-routing map, retention behavior, auditability, and RBAC are evidenced.",
    "Local logs/test transcript material must remain non-CI and non-packet unless separately reviewed and approved.",
    "Generated/export artifacts remain limited to documented surfaces and are not delivery/external-use approval.",
    "Human/professional review-only material remains review-only and does not create approval, sign-off, external-use, or product-candidate status.",
    "Runtime gate inventory remains deferred.",
    "`SUITABLE_AS_SCOPE_UNDERLAG` is a security-agent scope input only, not implementation approval, runtime enforcement, product readiness, or external-use authorization.",
    "Downstream RBAC and audit/access-log artifacts remain internal DOCS_ONLY context until raw-material routing control specification is finished and reviewed.",
  ], section);
});

test("required evidence references appear", () => {
  assertIncludesAll([
    "docs/DOMAIN_CONTRACTS_SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
    "tests/domain-raw-material-routing-feasibility-review-boundary-doc-freeze.test.js",
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
    "tests/domain-raw-material-routing-control-specification-boundary-doc-freeze.test.js",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
  ]);
});

test("no-overclaim rules appear", () => {
  const section = sectionBetween("## No-Overclaim Rules", "## No-Reopening Rules");
  assertIncludesAll([
    "this hardening is not implementation",
    "this hardening is not remediation",
    "this hardening is not a security finding",
    "this hardening is not a vulnerability finding",
    "this hardening assigns no severity",
    "this hardening recommends no remediation",
    "this raw-material routing control specification is not implementation",
    "this raw-material routing control specification is not remediation",
    "this raw-material routing control specification is not a security assessment finding",
    "this raw-material routing control specification is not a vulnerability finding",
    "this raw-material routing control specification assigns no severity",
    "this raw-material routing control specification recommends no remediation",
    "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean implementation approval",
    "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean runtime enforcement",
    "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean product readiness",
    "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean external-use authorization",
    "required implementation evidence is future evidence, not current implementation evidence",
    "required test evidence is future evidence, not current closure",
    "intended enforcement layer is future/intended classification, not current enforcement",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "route/case/capability evidence is not full access control",
    "route/case/capability evidence is not RBAC",
    "route/case/capability evidence is not admin/support access control",
    "route/case/capability evidence is not global authorization model",
    "product candidate remains none",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
    "runtime gate inventory remains deferred",
  ], section);
});

test("no-reopening rules appear", () => {
  const section = sectionBetween("## No-Reopening Rules", "## Raw/Private/Conclusion Guard");
  assertIncludesAll([
    "runtime implementation",
    "API behavior change",
    "schema behavior change",
    "package implementation behavior",
    "raw-material routing implementation",
    "RBAC implementation",
    "audit/access-log implementation",
    "event taxonomy runtime code",
    "log schema",
    "log storage",
    "role field creation",
    "permission field creation",
    "role schema creation",
    "permission schema creation",
    "admin/support model creation",
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
    "PDF generation",
    "PDF packet creation",
    "archive/ZIP generation",
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
    "no SWE psykiskt våld legal modelling",
    "Nordic comparison",
  ], section);
});

test("next-slice posture appears without authorization", () => {
  const section = sectionBetween("## Next-Slice Posture", "None are authorized by this hardening.");
  assertIncludesAll([
    "REVIEW_ONLY_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_EXTERNAL_REVIEWER_21_POINT_HARDENING",
    "DOCS_ONLY_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_SCOPE_ALIGNMENT_STATUS_BOUNDARY",
    "PROVE_ONLY_RBAC_CONTROL_SPECIFICATION_SCOPE_REVIEW_AFTER_RAW_ROUTING_HARDENING",
    "continued pause",
  ], section);
  assertIncludesAll(["None are authorized by this hardening."]);
});

test("negative authorization checks preserve no behavior change and no approvals", () => {
  assertIncludesAll([
    "It does not change runtime/API/schema/package behavior.",
    "It does not authorize raw/private/source material inspection.",
    "It does not authorize source package inspection.",
    "It does not authorize PDF/image/screenshot/metadata inspection.",
    "It does not authorize metadata acquisition.",
    "It does not authorize third-party model/API routing.",
    "It does not authorize real private run.",
    "It does not authorize runtime gate inventory.",
    "It does not select product candidate.",
    "It does not authorize external-use.",
    "RAW_MATERIAL_ROUTING_SPECIFICATION_NOT_IMPLEMENTATION",
    "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_NOT_RESOLVED",
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "REAL_PRIVATE_RUN_NOT_STARTED",
    "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
    "SOURCE_PACKAGE_NOT_INSPECTED",
    "METADATA_NOT_ACQUIRED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
  ]);
});

test("raw private and conclusion guard limits wording to blocked categories", () => {
  const section = sectionBetween("## Raw/Private/Conclusion Guard", "## Next-Slice Posture");
  assertIncludesAll([
    "This boundary contains no raw/private source material.",
    "This boundary contains no source package material.",
    "This boundary creates no legal, clinical, evidentiary, case-truth, credibility, offence, ownership, risk, sufficiency, police-report, pleading, marker-finding, security-finding, vulnerability-finding, severity, remediation, external-use, or product-candidate conclusion.",
    "Any references to those categories are blocked-category, forbidden-category, future-evidence, or non-authorization wording only.",
  ], section);
  assertDoesNotIncludeAny([
    "legal conclusion:",
    "clinical conclusion:",
    "case truth:",
    "credibility finding:",
    "offence finding:",
    "ownership finding:",
    "risk score:",
    "sufficiency score:",
    "police report:",
    "pleading:",
    "marker finding:",
    "security finding:",
    "vulnerability finding:",
    "severity:",
    "remediation recommendation:",
  ]);
});
