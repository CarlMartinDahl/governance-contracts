const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
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
    .find((line) => line.startsWith("| ") && line.includes(`| \`${materialClass}\` |`));
  assert.ok(row, `missing table row for material class: ${materialClass}`);
  return row;
}

const statusTokens = [
  "RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY",
  "DOCS_ONLY",
  "RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_ONLY",
  "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
  "RAW_MATERIAL_ROUTING_NOT_RESOLVED",
  "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
  "SOURCE_PACKAGE_NOT_INSPECTED",
  "PDF_IMAGE_SCREENSHOT_METADATA_NOT_INSPECTED",
  "METADATA_NOT_ACQUIRED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "REAL_PRIVATE_RUN_NOT_STARTED",
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
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_SURFACE_SPECIFIC_PARTIAL_ONLY",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_FULL_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_RBAC",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_GLOBAL_AUTHORIZATION_MODEL",
];

const materialRows = [
  [
    "SANITIZED_TEXT_PRIMARY_MATERIAL",
    "synthetic/sanitized planning material",
    "raw/source/PDF metadata",
    "docs/workflow and no-raw validation",
    "raw processing",
    "marker/pointer/review-route only",
    "external-use, product use, External Reviewer delivery",
    "before any route",
    "sanitized intake",
    "scoped policy required",
    "role/permission access required",
    "third-party routing blocked until provider/routing status",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "future runtime/workflow gate evidence",
    "tests proving no raw/private leakage",
    "unresolved",
    "scoped routing path and tests prove sanitized-only routing without raw/private leakage",
  ],
  [
    "REDACTED_REVIEW_SIGNAL_MATERIAL",
    "no-raw/redacted review signal concept",
    "raw source ingress",
    "human/professional review workflow",
    "automated raw inference",
    "review-only signal",
    "external-use/product conclusions",
    "before review routing",
    "review access",
    "retention/RBAC required",
    "review-role access required",
    "no third-party raw/private routing",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "future redaction workflow path",
    "tests for redaction and review-only egress",
    "unresolved",
    "redacted-review workflow and tests prove no raw/private signal leakage",
  ],
  [
    "NO_RAW_METADATA_MANIFEST_MATERIAL",
    "contract/validator fixture only",
    "metadata acquisition/population",
    "schema validation",
    "runtime/dispatch/registry use",
    "validation result only",
    "matrix/proof/product",
    "no-raw field contract before manifest use",
    "manifest validation if later used",
    "required if persisted",
    "required if access-controlled",
    "no third-party routing",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "future acquisition contract and consumer path",
    "manifest instance boundary and validator/consumer tests",
    "unresolved",
    "authorized manifest workflow and tests prove no raw metadata acquisition or leakage",
  ],
  [
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
    "packet/delivery gate evidence if later used",
    "allow/deny, wrong-case, overexposure, packet-gate tests",
    "unresolved beyond documented surfaces",
    "scoped artifact routing and tests prove no unauthorized delivery, external-use, or overexposure",
  ],
  [
    "LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
    "reviewed summary only",
    "local-test-output inspection or CI evidence treatment",
    "summary in docs",
    "runtime or packet treatment",
    "local review summary",
    "CI evidence or packet component",
    "before any summary",
    "future log access if authorized",
    "log retention policy required",
    "log access role required",
    "no third-party routing",
    "`DOCS_ONLY`",
    "future log classification/access path",
    "log classification, retention, access logging, non-packet tests",
    "unresolved",
    "scoped log policy and tests prove logs are not treated as CI evidence or packet components unless separately approved",
  ],
  [
    "RAW_PRIVATE_SOURCE_MATERIAL",
    "none",
    "all current ingress",
    "none",
    "all runtime/workflow/model processing",
    "none",
    "all egress",
    "quarantine/block before route",
    "attempted ingress/block event",
    "retention/deletion required before any authorized handling",
    "RBAC required before any authorized handling",
    "third-party routing blocked",
    "`NOT_AUTHORIZED` / `EXPLICITLY_UNRESOLVED`",
    "raw-routing policy, quarantine implementation, deny path",
    "negative leakage tests, quarantine/minimization tests",
    "unresolved",
    "explicit future authorization, quarantine/block implementation, and tests prove no unauthorized raw/private routing",
  ],
  [
    "SOURCE_PACKAGE_MATERIAL",
    "none",
    "package/source inspection",
    "none",
    "source package opening/routing",
    "none",
    "archive/delivery/model/API",
    "package block/quarantine before opening",
    "attempted package handling",
    "package retention/deletion policy required before any authorized handling",
    "RBAC required before any authorized handling",
    "no third-party routing",
    "`NOT_AUTHORIZED`",
    "source-package routing spec and deny implementation",
    "source-package deny tests before activation",
    "unresolved",
    "explicit future authorization and tests prove source packages are blocked/quarantined unless separately approved",
  ],
  [
    "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
    "none",
    "PDF/image/metadata inspection",
    "none",
    "OCR/metadata extraction",
    "none",
    "repo evidence/packet component",
    "before metadata acquisition, if ever authorized",
    "attempted access/acquisition",
    "metadata retention/deletion policy required before any authorized handling",
    "RBAC required before any authorized handling",
    "no third-party routing",
    "`NOT_AUTHORIZED` / `DOCS_ONLY`",
    "explicit metadata acquisition contract and blocking path",
    "metadata acquisition denial and no-raw tests",
    "unresolved",
    "explicit future authorization and tests prove no unauthorized PDF/image/screenshot/metadata inspection or egress",
  ],
  [
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
    "provider record, data-routing map, no-unauthorized-route control",
    "tests proving no unauthorized third-party routing",
    "unresolved",
    "provider/API status and tests prove scoped third-party routing posture without raw/private leakage",
  ],
  [
    "HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
    "review-gate context only",
    "raw/private/source material unless separately authorized",
    "human/professional review",
    "automated conclusion/product use",
    "review-only handoff",
    "approval/sign-off/external-use",
    "before review handoff",
    "review access",
    "review-material retention/deletion policy required",
    "review-role access required",
    "no third-party routing",
    "`HUMAN_PROFESSIONAL_REVIEW_GATE_REQUIRED` / `DOCS_ONLY`",
    "workflow gate evidence if later implemented",
    "tests preserving no-conclusion/no-approval posture",
    "unresolved",
    "scoped human-review workflow and tests prove no unauthorized approval, sign-off, or external-use",
  ],
];

test("boundary doc exists and freezes docs-only raw-material routing feasibility posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "Boundary name: `RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_ONLY`",
    "This boundary freezes the raw-material routing feasibility review only.",
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
    "It preserves that runtime gate inventory remains deferred.",
  ]);
});

test("all required current status tokens appear", () => {
  assertIncludesAll(statusTokens);
});

test("all ten material-class rows appear", () => {
  for (const [materialClass] of materialRows) {
    assertIncludesAll([materialClass]);
  }
});

test("row-scoped assertions bind material class, routing controls, evidence, blocker, and closure together", () => {
  const table = sectionBetween("## Raw-Material Routing Feasibility Matrix", "## Summary Findings");
  for (const rowParts of materialRows) {
    const [materialClass, ...expectedParts] = rowParts;
    const row = rowForMaterial(materialClass, table);
    assertIncludesAll(expectedParts, row);
  }
});

test("required summary findings appear", () => {
  assertIncludesAll([
    "Clearly represented material classes include sanitized/no-raw material, no-raw manifest contract material, generated export/artifact material, local log summaries, human/professional review gate material, and blocked raw/source/PDF/metadata classes.",
    "Unknown/not-evidenced classes include complete redacted-review-signal implementation, third-party/API routed material, complete raw-routing runtime behavior, and global access-control threat model.",
    "Allowed ingress now is limited to synthetic or sanitized planning material, no-raw manifest contract/validator fixtures, and documented export/artifact route inputs for tested surfaces.",
    "Prohibited ingress includes raw private source, source packages, PDFs/images/screenshots/metadata, real private run inputs, and third-party raw/private routing.",
    "Sanitized/redacted material may be seen by docs/workflow review surfaces, schema validation for no-raw manifest fixtures, and human/professional review.",
    "Raw/private material must not be seen by runtime, schema validators, model/API routing, logs, generated artifacts, packet/delivery paths, or local review outputs.",
    "Blocked egress includes external-use, product candidate, External Reviewer delivery, packet component, PDF/archive/ZIP, CI evidence, third-party API, and legal/clinical/evidentiary/case-truth/security conclusions.",
    "Redaction/sanitization must happen before intake into any workflow, manifest, export, log, review, or model/API route.",
    "Audit/access logging would later be needed at intake attempt, quarantine/block decision, redaction/sanitization, review access, export/download, manifest validation, and third-party route denial/approval.",
    "Retention/deletion dependencies include scoped data-class policy, retention clock/status, purge/delete/archive semantics, idempotency/failure behavior, and post-delete non-availability.",
    "RBAC dependencies include role/permission model, admin/support model, tenant/case/object/function/property checks, allowed/denied/bypass tests.",
    "Third-party/API constraints include provider status, terms/privacy posture, data-routing map, retention behavior, and tests proving no unauthorized routing.",
    "Future gates needed include future runtime gate candidates, schema validator gate candidates, workflow gate candidates, and human/professional review gate.",
    "Later test evidence required includes raw/private deny tests, quarantine/minimization tests, redaction tests, no-raw output tests, audit event tests, retention/deletion tests, RBAC allow/deny/bypass tests, and third-party no-route tests.",
    "Main routing blockers remain raw routing policy/implementation, RBAC, audit/access logs, retention/deletion implementation, third-party status/routing, encryption architecture, and complete global access-control threat model.",
    "Runtime gate inventory remains deferred.",
  ]);
});

test("required evidence references appear", () => {
  assertIncludesAll([
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_CONTROL_PLAN_SCOPE_PRIORITIZATION_REVIEW_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_IMPLEMENTATION_GAP_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_CONTRACT_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_ACTIVE_METADATA_ACQUISITION_PATH_READINESS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DELIVERY_PACKET_COMPONENT_RUNTIME_BOUNDARY_INVENTORY_STATUS_BOUNDARY_v1.md",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
  ]);
});

test("no-overclaim rules appear", () => {
  const section = sectionBetween("## No-Overclaim Rules", "## No-Reopening Rules");
  assertIncludesAll([
    "this raw-material routing feasibility review is not implementation",
    "this raw-material routing feasibility review is not remediation",
    "this raw-material routing feasibility review is not a security assessment finding",
    "this raw-material routing feasibility review is not a vulnerability finding",
    "this raw-material routing feasibility review assigns no severity",
    "this raw-material routing feasibility review recommends no remediation",
    "candidate gate does not mean authorized implementation",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "route/case/capability evidence is not full access control",
    "route/case/capability evidence is not RBAC",
    "route/case/capability evidence is not admin/support access control",
    "route/case/capability evidence is not global authorization model",
    "local logs are not CI evidence",
    "generated PDFs are not repo evidence unless separately reviewed and approved",
    "hashes/manifests/checksums prove integrity/reproducibility only, not truth/legal/clinical/evidentiary proof",
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
    "validator dispatch",
    "registry/lookup/generic dispatch",
    "real private run",
    "source inspection",
    "raw/private material inspection",
    "metadata acquisition",
    "source package inspection",
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
    "no SWE psykiskt vald legal modelling",
    "Nordic comparison",
  ], section);
});

test("next-slice posture appears without authorization", () => {
  const section = sectionBetween("## Next-Slice Posture", "None are authorized by this boundary.");
  assertIncludesAll([
    "REVIEW_ONLY_RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY",
    "DOCS_ONLY_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY",
    "PROVE_ONLY_RBAC_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW",
    "continued pause",
  ], section);
  assertIncludesAll(["None are authorized by this boundary."]);
});

test("negative authorization checks remain frozen", () => {
  assertIncludesAll([
    "It does not change runtime/API/schema/package behavior.",
    "It does not authorize raw/private/source material inspection.",
    "It does not authorize source package inspection.",
    "It does not authorize PDF/image/screenshot/metadata inspection.",
    "It does not authorize third-party model/API routing.",
    "It does not authorize real private run.",
    "It does not select product candidate.",
    "It does not authorize external-use.",
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

test("raw private and conclusion material is absent except blocked-category wording", () => {
  const guardSection = sectionBetween("## Raw/Private/Conclusion Guard", "## Next-Slice Posture");
  assertIncludesAll([
    "This boundary contains no raw/private source material.",
    "This boundary contains no source package material.",
    "Any references to those categories are blocked-category or forbidden-category wording only.",
  ], guardSection);

  assert.doesNotMatch(docsText, /BEGIN RAW/i);
  assert.doesNotMatch(docsText, /END RAW/i);
  assert.doesNotMatch(docsText, /source_locator:/i);
  assert.doesNotMatch(docsText, /private_fact:/i);
  assert.doesNotMatch(docsText, /case_truth_claim:/i);
  assert.doesNotMatch(docsText, /legal_conclusion:/i);
  assert.doesNotMatch(docsText, /clinical_conclusion:/i);
  assert.doesNotMatch(docsText, /evidentiary_conclusion:/i);
});
