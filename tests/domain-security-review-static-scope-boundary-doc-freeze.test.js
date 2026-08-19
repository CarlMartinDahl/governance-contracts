const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_SECURITY_REVIEW_STATIC_SCOPE_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function assertIncludesAll(entries, text = docsText) {
  for (const entry of entries) {
    assert.match(
      text,
      new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing start heading: ${startHeading}`);
  const end = docsText.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(end, -1, `missing end heading: ${endHeading}`);
  return docsText.slice(start, end);
}

test("static security review scope boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "Boundary name: `SECURITY_REVIEW_STATIC_SCOPE_BOUNDARY`.",
    "Status: `DOCS_ONLY`.",
    "It defines static security-review scope only.",
    "It records the completed PROVE_ONLY static scope inventory.",
    "It records static review surfaces as scope candidates only.",
  ]);
});

test("boundary does not execute review findings severity remediation tooling or dynamic testing", () => {
  assertIncludesAll([
    "It does not perform a security review.",
    "It does not create findings.",
    "It does not create vulnerability findings.",
    "It does not assign severity.",
    "It does not recommend remediation.",
    "It does not implement remediation.",
    "It does not run tools, scanners, audits, app startup, network probes, or dynamic testing.",
    "It does not run `npm audit`.",
    "It does not contact external, third-party, preview, staging, or production targets.",
  ]);
});

test("boundary blocks behavior changes product external-use release certification and conclusions", () => {
  assertIncludesAll([
    "It does not authorize active pentest.",
    "It does not authorize dynamic testing.",
    "It does not authorize runtime/API/schema/package behavior changes.",
    "It does not authorize product-candidate selection.",
    "It does not authorize external-use readiness.",
    "It does not authorize release approval.",
    "It does not authorize runtime certification.",
    "It does not authorize safety certification.",
    "It does not authorize legal/professional verification.",
    "It does not authorize clinical review.",
    "It does not authorize evidentiary proof.",
    "It does not authorize case-truth, legal, clinical, or evidentiary conclusions.",
  ]);
});

test("current statuses appear", () => {
  assertIncludesAll([
    "SECURITY_REVIEW_STATIC_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "STATIC_SECURITY_REVIEW_SCOPE_ONLY",
    "PROVE_ONLY_STATIC_SCOPE_INVENTORY_COMPLETED",
    "STATIC_SECURITY_REVIEW_NOT_EXECUTED",
    "NO_SECURITY_FINDINGS_CREATED",
    "NO_VULNERABILITY_FINDINGS_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
    "SECURITY_TOOLS_NOT_RUN",
    "SCANNERS_NOT_RUN",
    "NPM_AUDIT_NOT_RUN",
    "DYNAMIC_TESTING_NOT_AUTHORIZED",
    "APP_NOT_STARTED",
    "EXTERNAL_TARGET_TESTING_NOT_AUTHORIZED",
    "THIRD_PARTY_TARGET_TESTING_NOT_AUTHORIZED",
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
    "REAL_PRIVATE_RUN_NOT_AUTHORIZED",
    "SOURCE_INSPECTION_NOT_AUTHORIZED",
    "RAW_PRIVATE_MATERIAL_INSPECTION_NOT_AUTHORIZED",
    "METADATA_ACQUISITION_NOT_AUTHORIZED",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
});

test("inventory surface table contains required categories and status values", () => {
  const inventorySection = sectionBetween(
    "## Static Review Surface Inventory",
    "## Absent / Unknown Inventory Entries",
  );

  assertIncludesAll([
    "Allowed inventory status values are `FOUND`, `NOT_FOUND`, `UNKNOWN_NOT_EVIDENCED`, and `NOT_SEARCHED_BY_SCOPE`.",
    "APPLICATION_ENTRY_POINTS",
    "API_ROUTES_HANDLERS",
    "AUTH_SESSION_AUTHENTICATION",
    "AUTHORIZATION_ACCESS_CONTROL",
    "CASE_CONTEXT_ACCESS_CONTROL",
    "SCHEMA_VALIDATOR_SURFACES",
    "INPUT_PARSING_VALIDATION",
    "DATABASE_PERSISTENCE",
    "EXPORT_PACKAGE_ARTIFACT_SURFACES",
    "FILE_UPLOAD_DOWNLOAD",
    "WEBHOOK_SURFACES",
    "LOGGING_AUDIT_SURFACES",
    "ENVIRONMENT_SECRET_HANDLING",
    "DEPENDENCY_MANIFESTS_LOCKFILES",
    "CI_CD_CONFIG",
    "CONTAINER_DOCKER_IAC",
    "SECURITY_CONFIG_HEADERS_CORS_COOKIE_SESSION",
    "AI_AGENT_TOOLING_CONTROL_SURFACES",
    "GENERATED_ARTIFACT_PDF_ARCHIVE_BOUNDARIES",
    "GOVERNANCE_BOUNDARIES_RELEVANT_TO_SECURITY_REVIEW",
    "FOUND",
    "NOT_FOUND",
    "UNKNOWN_NOT_EVIDENCED",
  ], inventorySection);
});

test("required found evidence paths appear", () => {
  assertIncludesAll([
    "apps/api/src/index.js",
    "packages/database/package.json",
    "packages/governance/package.json",
    "packages/schemas/package.json",
    "packages/schemas/src/index.js",
    "packages/governance/src/index.js",
    "packages/database/src/index.js",
    "packages/database/migrations/",
    "scripts/build.mjs",
    "scripts/lint.mjs",
    "package.json",
    "docs/TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE_v1.md",
    "docs/DOMAIN_CONTRACTS_SECURITY_REVIEW_PENTEST_AGENT_READINESS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY_v1.md",
  ]);
});

test("required absent and unknown entries appear", () => {
  const absentSection = sectionBetween(
    "## Absent / Unknown Inventory Entries",
    "## Gaps Preserved",
  );

  assertIncludesAll([
    "Webhook surfaces: `NOT_FOUND`.",
    "Upload routes: `NOT_FOUND`.",
    "`.github` CI/CD config: `NOT_FOUND`.",
    "Docker/container/IaC: `NOT_FOUND`.",
    "Dependency lockfiles: `NOT_FOUND`.",
    "CORS/cookie/session config: `NOT_FOUND`.",
    "Complete secret/env handling evidence: `UNKNOWN_NOT_EVIDENCED`.",
    "Formal audit-log implementation evidence: `UNKNOWN_NOT_EVIDENCED`.",
    "`NOT_FOUND` is limited to the searched paths",
    "`UNKNOWN_NOT_EVIDENCED` remains unresolved",
  ], absentSection);
});

test("required gaps appear", () => {
  const gapSection = sectionBetween("## Gaps Preserved", "## Next Slice Recommendation");

  assertIncludesAll([
    "No full static security review report yet.",
    "No threat model execution.",
    "No severity findings authorized.",
    "No vulnerability absence proof.",
    "No safety certification.",
    "No dependency vulnerability audit.",
    "No tool/scanner output.",
    "Retention/deletion/encryption/audit logs/role permissions remain unresolved.",
    "No dependency lockfile found.",
    "No CI/container evidence found.",
    "No complete secret/env handling evidence.",
    "No formal audit-log implementation evidence.",
  ], gapSection);
});

test("next slice recommendation appears without authorizing review now", () => {
  const nextSection = sectionBetween(
    "## Next Slice Recommendation",
    "## Blocked / Must-Not-Use Actions",
  );

  assertIncludesAll([
    "A future static security review is safe to consider only after separate explicit authorization.",
    "This boundary does not authorize that review now.",
    "PROVE_ONLY_STATIC_SECURITY_REVIEW_REPORT_WITHOUT_TOOLS_FINDINGS_SEVERITY_OR_REMEDIATION",
    "continued pause",
  ], nextSection);
});

test("blocked actions appear only in blocked or must-not-use language", () => {
  const blockedSection = sectionBetween(
    "## Blocked / Must-Not-Use Actions",
    "## Prior Boundaries Not Bypassed",
  );

  for (const status of [
    "STATIC_SECURITY_REVIEW_EXECUTED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
    "ACTIVE_PENTEST_STARTED",
    "SECURITY_TOOL_EXECUTED",
    "SCANNER_EXECUTED",
    "NPM_AUDIT_RUN",
    "DEPENDENCY_VULNERABILITY_SCANNER_RUN",
    "DYNAMIC_TESTING_STARTED",
    "APP_STARTED",
    "NETWORK_PROBE_EXECUTED",
    "EXTERNAL_TARGET_CONTACTED",
    "THIRD_PARTY_TARGET_TESTED",
    "PREVIEW_STAGING_TARGET_TESTED",
    "PRODUCTION_TARGET_TESTED",
    "DESTRUCTIVE_TESTING_PERFORMED",
    "PERSISTENCE_CREATED",
    "DATA_EXFILTRATED",
    "DENIAL_OF_SERVICE_ATTEMPTED",
    "CREDENTIAL_STUFFING_ATTEMPTED",
    "BRUTE_FORCE_ATTEMPTED",
    "UNSAFE_EXPLOITATION_ATTEMPTED",
    "REAL_USER_CREDENTIALS_USED",
    "SOURCE_CODE_MODIFIED",
    "RUNTIME_BEHAVIOR_CHANGED",
    "API_BEHAVIOR_CHANGED",
    "SCHEMA_CHANGED",
    "PACKAGE_IMPLEMENTATION_CHANGED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "REAL_PRIVATE_RUN_STARTED",
    "SOURCE_INSPECTION_STARTED",
    "SOURCE_PACKAGE_INSPECTED",
    "RAW_PRIVATE_MATERIAL_INSPECTED",
    "METADATA_ACQUIRED",
    "PDF_IMAGE_METADATA_SOURCE_PACKAGE_INSPECTED",
    "PDF_PACKET_CREATED",
    "ARCHIVE_ZIP_CREATED",
    "DELIVERY_TO_EXTERNAL_REVIEWER_PREPARED",
    "MATERIAL_SENT_TO_EXTERNAL_REVIEWER",
    "GENERATED_PDF_TREATED_AS_REPO_EVIDENCE",
    "GENERATED_PDF_TREATED_AS_PACKET_COMPONENT",
    "EXTERNAL_USE_READY",
    "PRODUCT_CANDIDATE_SELECTED",
    "RELEASE_APPROVAL_CLAIMED",
    "RUNTIME_CERTIFICATION_CLAIMED",
    "TECHNICAL_SIGN_OFF_CLAIMED",
    "SAFETY_CERTIFICATION_CLAIMED",
    "LEGAL_PROFESSIONAL_VERIFICATION_CLAIMED",
    "CLINICAL_REVIEW_CLAIMED",
    "EVIDENTIARY_PROOF_CLAIMED",
    "CASE_TRUTH_CLAIM_CREATED",
    "CREDIBILITY_FINDING_CREATED",
    "OFFENCE_FINDING_CREATED",
    "OWNERSHIP_FINDING_CREATED",
    "RISK_SCORE_CREATED",
    "SUFFICIENCY_SCORE_CREATED",
    "POLICE_REPORT_TEXT_CREATED",
    "PLEADING_TEXT_CREATED",
    "MARKER_FINDING_CREATED",
  ]) {
    assert.match(blockedSection, new RegExp(status));
  }

  assert.match(blockedSection, /blocked \/ must-not-use language only/i);
  assert.match(blockedSection, /must not be emitted as active findings or active conclusions/i);
});

test("prior boundaries appear and are not bypassed", () => {
  assertIncludesAll([
    "This boundary references and does not bypass:",
    "SECURITY_REVIEW_PENTEST_AGENT_READINESS_BOUNDARY",
    "TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT_BOUNDARY",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY",
    "PRIVATE_LARGE_SOURCE_RUN_READINESS_BOUNDARY",
    "LOCAL_REAL_PRIVATE_RUN_MANUAL_DECISION_RECORD",
    "TRAUMA_MINIMIZING_LAYERED_SOURCE_NAVIGATION_BOUNDARY",
    "TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "These boundaries remain active constraints.",
  ]);
});

test("non-proof and no-overclaim rules appear", () => {
  assertIncludesAll([
    "Static scope boundary is not static security review execution.",
    "Static scope boundary is not active pentest.",
    "Static scope boundary is not tool execution.",
    "Static scope boundary is not scanner execution.",
    "Static scope boundary is not dependency vulnerability audit.",
    "Static scope boundary is not dynamic testing.",
    "Static scope boundary is not vulnerability finding.",
    "Static scope boundary is not severity assessment.",
    "Static scope boundary is not remediation recommendation.",
    "Static scope boundary is not remediation implementation.",
    "Static scope boundary is not vulnerability absence proof.",
    "Static scope boundary is not safety certification.",
    "Static scope boundary is not release approval.",
    "Static scope boundary is not runtime certification.",
    "Static scope boundary is not technical sign-off.",
    "Static scope boundary is not production assurance.",
    "Static scope boundary is not external-use readiness.",
    "Static scope boundary is not product-candidate selection.",
    "Static scope boundary is not legal/professional verification.",
    "Static scope boundary is not clinical review.",
    "Static scope boundary is not evidentiary proof.",
    "Inventory status `FOUND` is not a finding of vulnerability.",
    "Inventory status `NOT_FOUND` is not proof of absence unless limited to searched scope.",
    "Inventory status `UNKNOWN_NOT_EVIDENCED` must remain unresolved.",
    "Human/professional review remains release gate.",
    "DOCS_ONLY is not runtime enforcement.",
    "Test evidence is not runtime certainty.",
    "Hash/manifest/ZIP validation is not truth proof.",
    "Package integrity is not legal/clinical/evidentiary proof.",
  ]);
});

test("no-reopening rules appear", () => {
  assertIncludesAll([
    "This boundary does not reopen:",
    "SWE bodelning",
    "DK psykisk vold offence modelling",
    "SWE psykiskt våld legal modelling",
    "Nordic comparison",
    "real large-source private run",
    "actual 1.8 GB source processing",
    "raw source inspection",
    "PDF/image/metadata/source inspection",
    "PDF packet generation",
    "archive/ZIP generation",
    "actual source review matrix creation",
    "metadata acquisition",
    "metadata acquisition contract",
    "deterministic preprocessor",
    "reviewed chunk ledger",
    "manual attestation workflow",
    "manifest instance creation",
    "manifest population",
    "test fixture instance creation",
    "product-candidate selection",
    "external-use readiness",
    "runtime behavior",
    "API behavior",
    "schema behavior",
    "package implementation behavior",
    "validator dispatch",
    "registry/lookup/generic dispatch",
    "packet component approval",
    "direct packet addition",
    "supplemental packet creation",
    "supplemental markdown addendum creation",
    "addendum creation approval",
    "excluded private-review packet markdown update",
    "excluded private-review packet manifest update",
    "excluded private-review packet TOC update",
    "excluded private-review reference index update",
    "material delivery to External Reviewer",
    "generated PDF as repo evidence",
    "generated PDF as packet component",
    "active pentest",
    "security tool execution",
    "scanner execution",
    "dependency vulnerability audit",
    "dynamic testing",
    "external target testing",
    "destructive testing",
    "source-code remediation implementation",
    "vulnerability findings",
    "severity assessment",
  ]);
});

test("proof text contains no raw private source locator or active conclusion material", () => {
  assert.doesNotMatch(docsText, /https?:\/\//);
  assert.doesNotMatch(docsText, /\bpage\s+\d+\b/i);
  assert.doesNotMatch(docsText, /\bsource locator:/i);
  assert.doesNotMatch(docsText, /\bsecret\s*[:=]\s*['"`]/i);
  assert.doesNotMatch(docsText, /\btoken\s*[:=]\s*['"`]/i);
  assert.doesNotMatch(docsText, /\blegal conclusion:/i);
  assert.doesNotMatch(docsText, /\bclinical conclusion:/i);
  assert.doesNotMatch(docsText, /\bevidentiary conclusion:/i);
  assert.match(docsText, /blocked \/ must-not-use language only/i);
  assert.match(docsText, /It does not authorize case-truth, legal, clinical, or evidentiary conclusions/i);
});

test("boundary creates no active review tooling findings severity remediation behavior delivery or authorization", () => {
  assertIncludesAll([
    "This boundary does not authorize that review now.",
    "They do not create a review, finding, vulnerability finding, severity assessment, remediation recommendation, remediation implementation",
    "Any future static security review, security report, pentest, tool execution, scanner execution, dependency vulnerability audit, dynamic testing, app startup, network probing, target contact, source-code remediation, behavior change, delivery, external-use readiness, product-candidate selection, release approval, certification, verification, proof, finding, severity assessment, or conclusion requires separate explicit authorization",
  ]);

  assert.doesNotMatch(docsText, /\bstatic security review executed\b/i);
  assert.doesNotMatch(docsText, /\bsecurity finding created\b/i);
  assert.doesNotMatch(docsText, /\bvulnerability finding created\b/i);
  assert.doesNotMatch(docsText, /\bseverity assigned\b/i);
  assert.doesNotMatch(docsText, /\bremediation recommended\b/i);
  assert.doesNotMatch(docsText, /\bactive pentest started\b/i);
  assert.doesNotMatch(docsText, /\bsecurity tool executed\b/i);
  assert.doesNotMatch(docsText, /\bscanner executed\b/i);
  assert.doesNotMatch(docsText, /\bnpm audit run\b/i);
  assert.doesNotMatch(docsText, /\bdynamic testing started\b/i);
  assert.doesNotMatch(docsText, /\bexternal-use ready\b/i);
  assert.doesNotMatch(docsText, /\bproduct candidate selected\b/i);
  assert.doesNotMatch(docsText, /\brelease approved\b/i);
  assert.doesNotMatch(docsText, /\bsafety certified\b/i);
});
