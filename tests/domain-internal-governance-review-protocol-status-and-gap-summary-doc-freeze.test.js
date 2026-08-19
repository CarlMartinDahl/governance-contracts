const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_STATUS_AND_GAP_SUMMARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(values) {
  for (const value of values) {
    assert.match(docsText, new RegExp(escapeRegExp(value)));
  }
}

function assertTableRow(cells) {
  assertIncludesAll([`| ${cells.join(" | ")} |`]);
}

test("status-and-gap summary doc exists and freezes docs-only posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_STATUS_AND_GAP_SUMMARY",
    "DOCS_ONLY",
    "STATUS_AND_GAP_SUMMARY_ONLY",
    "This boundary creates an internal governance status-and-gap summary only.",
    "It consolidates current status and remaining gaps only.",
    "It does not create approval.",
    "It does not create product-candidate selection.",
    "It does not authorize external-use.",
    "It does not resolve blockers.",
    "It does not create implementation evidence.",
    "It does not change runtime/API/schema/package behavior.",
    "It does not create runtime certification.",
    "It does not create technical sign-off.",
    "It does not create External Reviewer approval.",
    "It does not create legal, clinical, evidentiary, case-truth, security, vulnerability, severity, or remediation conclusions.",
  ]);
});

test("all required current status tokens appear", () => {
  assertIncludesAll([
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "REAL_PRIVATE_RUN_NOT_STARTED",
    "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
    "SOURCE_PACKAGE_NOT_INSPECTED",
    "METADATA_NOT_ACQUIRED",
    "NO_RELEASE_APPROVAL_CREATED",
    "NO_RUNTIME_CERTIFICATION_CREATED",
    "NO_TECHNICAL_SIGN_OFF_CREATED",
    "NO_EXTERNAL_REVIEWER_APPROVAL_CREATED",
    "NO_LEGAL_CONCLUSION_CREATED",
    "NO_CLINICAL_CONCLUSION_CREATED",
    "NO_EVIDENTIARY_PROOF_CREATED",
    "NO_CASE_TRUTH_CONCLUSION_CREATED",
    "NO_SECURITY_FINDING_CREATED",
    "NO_VULNERABILITY_FINDING_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
  ]);
});

test("required summary sections are present", () => {
  assertIncludesAll([
    "Purpose and scope",
    "Current committed status boundaries",
    "Evidence classification summary",
    "Implemented / runtime-supported surfaces",
    "Schema/validator-supported surfaces",
    "DOCS_ONLY governance boundaries",
    "Partial docs/test evidence surfaces",
    "Unknown / not evidenced surfaces",
    "Explicitly unresolved blockers",
    "No-overclaim rules",
    "No-reopening rules",
    "Remaining blocker table",
    "Next-slice posture",
    "Non-authorization summary",
  ]);
});

test("current committed status boundary list includes required boundaries and commits", () => {
  assertIncludesAll([
    "DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY",
    "d6d54a4 docs(domain): freeze data-handling blocker evidence status",
    "ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY",
    "915ada0 docs(domain): freeze access-control threat-model inventory status",
    "ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY",
    "b540d3d docs(domain): harden role-permission surface inventory status",
    "EXPORT_ARTIFACT_ACCESS_BOUNDARY_INVENTORY_STATUS_BOUNDARY",
    "534cded docs(domain): freeze export-artifact access-boundary inventory status",
    "INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_BOUNDARY",
    "1b0e480 docs(domain): freeze internal governance review protocol",
    "DELIVERY_PACKET_COMPONENT_RUNTIME_BOUNDARY_INVENTORY_STATUS_BOUNDARY",
    "6cba64f docs(domain): freeze delivery-packet runtime-boundary inventory status",
    "ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY",
    "3dac54c docs(domain): freeze admin-support access-surface inventory status",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "e469197 docs(verification): add External Reviewer consolidated evidence dossier",
  ]);
});

test("evidence classification summary defines required labels", () => {
  assertTableRow([
    "`RUNTIME_ENFORCED_FOR_DOCUMENTED_AND_TESTED_SURFACES`",
    "Runtime implementation and tests support only the documented and tested surfaces; not total non-bypassability or release approval.",
  ]);
  assertTableRow([
    "`SCHEMA_VALIDATOR_ENFORCED_FOR_EXPORTED_TRACKED_SCHEMA_VALIDATORS`",
    "Exported tracked schema validators enforce their tracked schemas only; not access policy, legal proof, or product readiness.",
  ]);
  assertTableRow([
    "`PROMPT_WORKFLOW_ENFORCED`",
    "Governance instructions, review protocols, and prompt/workflow controls constrain process only; not runtime enforcement.",
  ]);
  assertTableRow([
    "`HUMAN_PROFESSIONAL_REVIEW_REQUIRED`",
    "Human/professional review remains the release gate and is not replaced by local tests, docs, or generated materials.",
  ]);
  assertTableRow([
    "`DOCS_ONLY`",
    "The boundary is documentation/proof-test status only and does not create runtime/API/schema/package behavior.",
  ]);
  assertTableRow([
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "Some tracked docs, implementation references, or tests support a limited surface only; gaps remain unresolved.",
  ]);
  assertTableRow([
    "`UNKNOWN_NOT_EVIDENCED`",
    "Tracked searched evidence does not establish the surface; absence of found evidence is not proof outside searched scope.",
  ]);
  assertTableRow([
    "`EXPLICITLY_UNRESOLVED`",
    "The blocker remains open until separately addressed by an authorized future slice.",
  ]);
  assertTableRow([
    "`NOT_FOUND`",
    "No tracked evidence was found in the searched repo scope for the named item.",
  ]);
  assertTableRow([
    "`NOT_AUTHORIZED`",
    "The action, inspection, approval, delivery, or conclusion remains outside current authorization.",
  ]);
});

test("implemented, schema, docs-only, partial, and unknown surfaces keep limits explicit", () => {
  assertIncludesAll([
    "Current runtime support is classified as `RUNTIME_ENFORCED_FOR_DOCUMENTED_AND_TESTED_SURFACES` only where tracked implementation and tests support the specific route/helper/surface.",
    "These surfaces do not prove admin/support access control, RBAC, complete global access-control threat model, delivery approval, packet-component approval, product-candidate enforcement, external-use enforcement",
    "Schema/validator support is classified as `SCHEMA_VALIDATOR_ENFORCED_FOR_EXPORTED_TRACKED_SCHEMA_VALIDATORS` only.",
    "Tracked schemas and validators support exported tracked schema validation surfaces only.",
    "DOCS_ONLY governance boundaries do not implement runtime behavior.",
    "Focused proof tests freeze the text and status tokens; they do not convert documentation into runtime enforcement.",
    "tenant/case/capability authorization on documented route surfaces",
    "selected export/artifact/download route behavior",
    "admin/support route-level, function-level, and object-level checks where only tenant/case/capability or case/profile evidence exists",
    "complete global access-control threat model",
    "complete export/artifact/download threat model",
    "complete admin/support access threat model",
    "red-team prompt/output corpus",
    "exact real blocker activation traces",
    "Absence of found evidence is not proof of absence outside searched tracked repo scope.",
  ]);
});

test("remaining blocker table freezes required blocker statuses and limitations", () => {
  assertTableRow(["retention", "`EXPLICITLY_UNRESOLVED`", "no implementation evidence resolved it"]);
  assertTableRow(["deletion", "`EXPLICITLY_UNRESOLVED`", "no implementation evidence resolved it"]);
  assertTableRow(["encryption", "`EXPLICITLY_UNRESOLVED`", "no implementation evidence resolved it"]);
  assertTableRow(["audit logs", "`EXPLICITLY_UNRESOLVED`", "no implementation evidence resolved it"]);
  assertTableRow(["role permissions", "`EXPLICITLY_UNRESOLVED`", "tenant/case/capability is not RBAC"]);
  assertTableRow(["admin/support access paths", "`UNKNOWN_NOT_EVIDENCED` / `NOT_FOUND`", "no admin/support model found in searched tracked repo scope"]);
  assertTableRow(["raw-material routing", "`EXPLICITLY_UNRESOLVED`", "raw/private/source-package inspection remains unauthorized"]);
  assertTableRow(["third-party model/API status", "`EXPLICITLY_UNRESOLVED`", "not resolved by current evidence"]);
  assertTableRow(["complete global access-control threat model", "`UNKNOWN_NOT_EVIDENCED`", "route/case/capability evidence is partial only"]);
  assertTableRow(["complete export/artifact/download threat model", "`UNKNOWN_NOT_EVIDENCED`", "export/artifact routes are not delivery approval"]);
  assertTableRow(["runtime packet-component approval", "`DOCS_ONLY_BOUNDARY`", "no runtime gate proven"]);
  assertTableRow(["runtime delivery/final-decision gate", "`DOCS_ONLY_BOUNDARY`", "no runtime gate proven"]);
  assertTableRow(["runtime external-use/product-candidate enforcement", "`DOCS_ONLY_BOUNDARY`", "no runtime gate proven"]);
  assertTableRow(["generated PDFs as repo evidence", "`DOCS_ONLY_BOUNDARY`", "no runtime enforcement proven"]);
  assertTableRow(["local logs as CI evidence", "`DOCS_ONLY_BOUNDARY`", "local logs are not CI evidence"]);
  assertTableRow(["red-team prompt/output corpus", "`UNKNOWN_NOT_EVIDENCED`", "no tracked corpus evidenced"]);
  assertTableRow(["exact blocker activation traces", "`SYNTHETIC_TRACE_ONLY` / `UNKNOWN_NOT_EVIDENCED`", "no exact real trace corpus evidenced"]);
});

test("no-overclaim and no-reopening rules remain explicit", () => {
  assertIncludesAll([
    "green tests are not release approval",
    "local logs are not CI evidence",
    "generated PDFs are not repo evidence unless separately reviewed and approved",
    "generated PDFs are not packet components unless separately approved",
    "route evidence is not delivery approval",
    "route evidence is not packet-component approval",
    "route evidence is not external-use readiness",
    "tenant/case/capability checks are not admin/support access control",
    "tenant/case/capability checks are not a full role-permission model",
    "capability gates are not RBAC unless separately evidenced",
    "schema validators are not complete access policy",
    "hashes/manifests/checksums prove integrity/reproducibility only, not truth/legal/clinical/evidentiary proof",
    "DOCS_ONLY boundaries do not implement runtime behavior",
    "proof tests are tested-scenario evidence, not total non-bypassability",
    "excluded private review is not external-use approval",
    "product candidate remains none",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
    "no manual External Reviewer delivery",
    "no PDF generation",
    "no PDF packet creation",
    "no archive/ZIP generation",
    "no packet component approval",
    "no excluded private-review packet markdown update",
    "no excluded private-review manifest update",
    "no excluded private-review TOC update",
    "no excluded private-review reference index update",
    "no runtime/API/schema/package behavior",
    "no validator dispatch",
    "no registry/lookup/generic dispatch",
    "no real private run",
    "no raw/private material inspection",
    "no source inspection",
    "no metadata acquisition",
    "no source package inspection",
    "no product-candidate selection",
    "no external-use authorization",
    "no release approval",
    "no runtime certification",
    "no technical sign-off",
    "no External Reviewer approval",
    "no legal/professional verification",
    "no clinical review",
    "no evidentiary proof",
    "no case-truth conclusion",
    "no credibility finding",
    "no offence finding",
    "no ownership finding",
    "no risk score",
    "no sufficiency score",
    "no police-report language",
    "no pleading language",
    "no marker finding",
    "no security finding",
    "no vulnerability finding",
    "no severity assignment",
    "no remediation recommendation",
    "no remediation implementation",
  ]);
});

test("next-slice posture and non-authorization summary block promotion", () => {
  assertIncludesAll([
    "DOCS_ONLY_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_STATUS_AND_GAP_SUMMARY_REVIEW",
    "PROVE_ONLY_DATA_HANDLING_IMPLEMENTATION_GAP_INVENTORY",
    "PROVE_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY",
    "continued pause",
    "None are authorized by this boundary.",
    "Any future slice must preserve product candidate none, external-use unauthorized, human/professional review as release gate",
    "This boundary does not authorize private runs, source inspection, source package inspection, PDF/image/metadata/source package inspection, metadata acquisition",
    "delivery to External Reviewer, final delivery decision, packet component approval, excluded private-review packet markdown/manifest/TOC/reference-index updates",
    "product-candidate selection, external-use, release approval, runtime certification, technical sign-off, External Reviewer approval",
    "legal/professional verification, clinical review, evidentiary proof, case-truth conclusion",
    "security finding, vulnerability finding, severity assignment, remediation recommendation, or remediation implementation.",
    "This boundary contains no raw/private source material.",
    "This boundary contains no source package material.",
    "This boundary contains no PDF, image, metadata, or source-package inspection result.",
  ]);
});

test("required tracked evidence references are explicit", () => {
  assertIncludesAll([
    "[excluded private review artifact]",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_EXPORT_ARTIFACT_ACCESS_BOUNDARY_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DELIVERY_PACKET_COMPONENT_RUNTIME_BOUNDARY_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
  ]);
});

test("doc does not contain common promotion phrases", () => {
  assert.doesNotMatch(docsText, /\bruntime behavior changed\b/i);
  assert.doesNotMatch(docsText, /\bAPI behavior changed\b/i);
  assert.doesNotMatch(docsText, /\bschema behavior changed\b/i);
  assert.doesNotMatch(docsText, /\bpackage behavior changed\b/i);
  assert.doesNotMatch(docsText, /\bvalidator dispatch created\b/i);
  assert.doesNotMatch(docsText, /\bregistry lookup created\b/i);
  assert.doesNotMatch(docsText, /\breal private run started\b/i);
  assert.doesNotMatch(docsText, /\bsource inspection occurred\b/i);
  assert.doesNotMatch(docsText, /\bmetadata acquired\b/i);
  assert.doesNotMatch(docsText, /\bexternal-use authorized\b/i);
  assert.doesNotMatch(docsText, /\bproduct candidate selected\b/i);
  assert.doesNotMatch(docsText, /\brelease approval created\b/i);
  assert.doesNotMatch(docsText, /\bruntime certification created\b/i);
  assert.doesNotMatch(docsText, /\btechnical sign-off created\b/i);
  assert.doesNotMatch(docsText, /\bExternal Reviewer approval created\b/i);
  assert.doesNotMatch(docsText, /\blegal conclusion created\b/i);
  assert.doesNotMatch(docsText, /\bclinical conclusion created\b/i);
  assert.doesNotMatch(docsText, /\bevidentiary proof created\b/i);
  assert.doesNotMatch(docsText, /\bcase-truth conclusion created\b/i);
  assert.doesNotMatch(docsText, /\bsecurity finding created\b/i);
  assert.doesNotMatch(docsText, /\bvulnerability finding created\b/i);
  assert.doesNotMatch(docsText, /\bseverity assigned\b/i);
  assert.doesNotMatch(docsText, /\bremediation recommended\b/i);
  assert.doesNotMatch(docsText, /\bremediation implemented\b/i);
});
