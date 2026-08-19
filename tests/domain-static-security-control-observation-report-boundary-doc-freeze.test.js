const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_STATIC_SECURITY_CONTROL_OBSERVATION_REPORT_BOUNDARY_v1.md",
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

function sectionFrom(startHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing start heading: ${startHeading}`);
  return docsText.slice(start);
}

test("static security control observation report boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "Boundary name: `STATIC_SECURITY_CONTROL_OBSERVATION_REPORT_BOUNDARY`.",
    "Status token: `DOCS_ONLY_STATIC_SECURITY_CONTROL_OBSERVATION_REPORT_BOUNDARY`.",
    "Mode: `DOCS_ONLY`.",
    "This boundary freezes a completed `PROVE_ONLY` static technical control observation report.",
  ]);
});

test("boundary preserves report limits without authorizing assessment findings severity remediation or dynamic testing", () => {
  assertIncludesAll([
    "It is not a vulnerability assessment.",
    "It is not a pentest.",
    "It is not scanner output.",
    "It is not audit output.",
    "It is not a dependency vulnerability audit.",
    "It is not dynamic testing.",
    "It is not a security finding report.",
    "It creates no security findings.",
    "It creates no vulnerability findings.",
    "It assigns no severity.",
    "It recommends no remediation.",
    "It implements no remediation.",
    "It claims no vulnerability absence.",
    "It claims no safety certification.",
    "It claims no release approval.",
    "It claims no runtime certification.",
    "It claims no technical sign-off.",
    "It claims no external-use readiness.",
  ]);
});

test("boundary blocks behavior changes private run source inspection metadata product selection and professional conclusions", () => {
  assertIncludesAll([
    "It selects no product candidate.",
    "It changes no runtime/API/schema/package behavior.",
    "It authorizes no real private run.",
    "It authorizes no source inspection, raw/private material inspection, source-package inspection, or metadata acquisition.",
    "It authorizes no legal/professional verification, clinical review, evidentiary proof, or case-truth conclusion.",
    "It preserves observed control surfaces as future-review candidates only.",
  ]);
});

test("required current statuses appear", () => {
  assertIncludesAll([
    "STATIC_SECURITY_CONTROL_OBSERVATION_REPORT_BOUNDARY",
    "DOCS_ONLY_STATIC_SECURITY_CONTROL_OBSERVATION_REPORT_BOUNDARY",
    "DOCS_ONLY",
    "PROVE_ONLY_STATIC_TECHNICAL_CONTROL_OBSERVATION_REPORT_COMPLETED",
    "STATIC_CONTROL_OBSERVATION_REPORT_FROZEN",
    "NOT_VULNERABILITY_ASSESSMENT",
    "NOT_PENTEST",
    "NOT_SECURITY_FINDING_REPORT",
    "NO_SECURITY_FINDINGS_CREATED",
    "NO_VULNERABILITY_FINDINGS_CREATED",
    "NO_SEVERITY_ASSIGNED",
    "NO_REMEDIATION_RECOMMENDED",
    "NO_REMEDIATION_IMPLEMENTED",
    "NO_SECURITY_TOOLS_RUN",
    "NO_SCANNERS_RUN",
    "NO_NPM_AUDIT_RUN",
    "NO_DEPENDENCY_VULNERABILITY_AUDIT",
    "NO_DYNAMIC_TESTING",
    "APP_NOT_STARTED",
    "NO_EXTERNAL_TARGET_CONTACT",
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

test("report method preserves passive static inspection only", () => {
  assertIncludesAll([
    "The frozen report used passive static repo inspection only:",
    "git status",
    "git ls-files",
    "find",
    "rg",
    "sed",
    "nl",
    "guard/status commands",
    "It did not run security tools, scanners, audits, dependency vulnerability scanners, runtime commands, app startup, network probes, dynamic testing, exploit tooling, findings, severity, or remediation.",
  ]);
});

test("allowed neutral labels and observation status values appear", () => {
  assertIncludesAll([
    "CONTROL_SURFACE_OBSERVED",
    "CONTROL_EVIDENCE_PRESENT",
    "CONTROL_EVIDENCE_PARTIAL",
    "CONTROL_EVIDENCE_NOT_FOUND",
    "UNKNOWN_NOT_EVIDENCED",
    "FUTURE_REVIEW_REQUIRED",
    "NOT_AUTHORIZED_FOR_FINDING",
    "NOT_AUTHORIZED_FOR_SEVERITY",
    "NOT_AUTHORIZED_FOR_REMEDIATION",
    "Allowed observation status values are `FOUND`, `PARTIAL`, `NOT_FOUND`, and `UNKNOWN_NOT_EVIDENCED`.",
  ]);
});

test("observation report contains exactly the required categories with allowed statuses", () => {
  const reportSection = sectionBetween(
    "## Static Control Observation Report",
    "## Absent / Unknown Items Preserved",
  );

  const rows = reportSection
    .split("\n")
    .filter((line) => line.startsWith("| `"));

  assert.equal(rows.length, 20);

  const expectedCategories = [
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
  ];
  const allowedStatuses = new Set([
    "FOUND",
    "PARTIAL",
    "NOT_FOUND",
    "UNKNOWN_NOT_EVIDENCED",
  ]);

  const actualCategories = rows.map((row) => row.split("|")[1].trim());
  assert.deepEqual(
    actualCategories,
    expectedCategories.map((category) => `\`${category}\``),
  );

  for (const row of rows) {
    const status = row.split("|")[2].trim().replaceAll("`", "");
    assert.equal(
      allowedStatuses.has(status),
      true,
      `unexpected status value: ${status}`,
    );
  }
});

test("required evidence paths appear", () => {
  assertIncludesAll([
    "apps/api/src/index.js",
    "package.json",
    "packages/database/package.json",
    "packages/governance/package.json",
    "packages/schemas/package.json",
    "packages/schemas/src/index.js",
    "packages/governance/src/index.js",
    "packages/database/src/index.js",
    "packages/database/migrations/",
    "scripts/build.mjs",
    "scripts/lint.mjs",
    "docs/TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE_v1.md",
    "docs/DOMAIN_CONTRACTS_SECURITY_REVIEW_PENTEST_AGENT_READINESS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_SECURITY_REVIEW_STATIC_SCOPE_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY_v1.md",
  ]);
});

test("absent and unknown items are preserved", () => {
  const absentSection = sectionBetween(
    "## Absent / Unknown Items Preserved",
    "## Gaps Preserved",
  );

  assertIncludesAll([
    "Webhook surfaces: `NOT_FOUND`.",
    "Upload routes: `NOT_FOUND`.",
    "`.github` CI/CD config: `NOT_FOUND`.",
    "Docker/container/IaC: `NOT_FOUND`.",
    "Dependency lockfiles: `NOT_FOUND`.",
    "CORS/cookie/session config: `NOT_FOUND`.",
    "Complete secret/env handling: `UNKNOWN_NOT_EVIDENCED`.",
    "Formal audit-log implementation: `UNKNOWN_NOT_EVIDENCED`.",
  ], absentSection);
});

test("gaps and future review questions remain preserved without current authorization", () => {
  const gapSection = sectionBetween("## Gaps Preserved", "## Future Review Questions");
  const futureSection = sectionBetween(
    "## Future Review Questions",
    "## Next-Slice Posture",
  );
  const nextSection = sectionBetween(
    "## Next-Slice Posture",
    "## Blocked / Must-Not-Use Actions",
  );

  assertIncludesAll([
    "No full security certification.",
    "No vulnerability absence proof.",
    "No safety certification.",
    "No dependency vulnerability audit.",
    "No tool/scanner output.",
    "Retention/deletion/encryption/audit logs/role permissions remain unresolved.",
    "No findings/severity/remediation authorized.",
  ], gapSection);

  assertIncludesAll([
    "Formal threat model.",
    "Complete access/session model.",
    "Dependency lockfile posture.",
    "CI/CD/container/IaC presence if later added.",
    "Formal audit logging.",
    "Secret/env handling.",
  ], futureSection);

  assertIncludesAll([
    "PROVE_ONLY_STATIC_SECURITY_REVIEW_REPORT_WITHOUT_TOOLS_FINDINGS_SEVERITY_OR_REMEDIATION",
    "continued pause",
    "That future review is not authorized by this boundary.",
  ], nextSection);
});

test("prior boundaries appear and remain non-bypassed", () => {
  const priorSection = sectionBetween(
    "## Prior Boundaries Not Bypassed",
    "## Non-Proof And No-Overclaim Rules",
  );

  assertIncludesAll([
    "This boundary references and does not bypass:",
    "SECURITY_REVIEW_STATIC_SCOPE_BOUNDARY",
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
    "These boundaries remain active constraints and comparison context only.",
    "They do not authorize an assessment, pentest, tool run, scanner run, audit run, dynamic test, app startup, network probe, target contact, finding, severity, remediation, real private run, source inspection, raw/private material inspection, metadata acquisition, generated PDF evidence use, packet component approval, external-use readiness, product-candidate selection, release approval, runtime certification, safety certification, legal/professional verification, clinical review, evidentiary proof, or case-truth conclusion.",
  ], priorSection);
});

test("non-proof and no-overclaim rules appear", () => {
  const noOverclaimSection = sectionBetween(
    "## Non-Proof And No-Overclaim Rules",
    "## No-Reopening Rules",
  );

  assertIncludesAll([
    "Static control observation report is not vulnerability assessment.",
    "Static control observation report is not active pentest.",
    "Static control observation report is not security finding report.",
    "Static control observation report is not severity assessment.",
    "Static control observation report is not remediation recommendation.",
    "Static control observation report is not remediation implementation.",
    "Static control observation report is not tool execution.",
    "Static control observation report is not scanner execution.",
    "Static control observation report is not audit execution.",
    "Static control observation report is not dependency vulnerability audit.",
    "Static control observation report is not dynamic testing.",
    "Static control observation report is not app startup.",
    "Static control observation report is not external target testing.",
    "Observed control surface is not vulnerability finding.",
    "`FOUND` is not security finding.",
    "`PARTIAL` is not severity.",
    "`NOT_FOUND` is not vulnerability absence proof outside searched scope.",
    "`UNKNOWN_NOT_EVIDENCED` remains unresolved.",
    "Future review questions are not remediation recommendations.",
    "Future review questions are not findings.",
    "Future review questions are not severity.",
    "No vulnerability absence is proven.",
    "No safety certification is created.",
    "No release approval is created.",
    "No runtime certification is created.",
    "No technical sign-off is created.",
    "No external-use readiness is created.",
    "No product candidate is selected.",
    "Human/professional review remains release gate.",
    "`DOCS_ONLY` is not runtime enforcement.",
    "Test evidence is not runtime certainty.",
    "Hash/manifest/ZIP validation is not truth proof.",
    "Package integrity is not legal/clinical/evidentiary proof.",
  ], noOverclaimSection);
});

test("no-reopening rules appear", () => {
  const noReopeningSection = sectionBetween(
    "## No-Reopening Rules",
    "## Extension Rule",
  );

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
    "active static security review",
    "security tool execution",
    "scanner execution",
    "dependency vulnerability audit",
    "dynamic testing",
    "app startup",
    "network probing",
    "external target testing",
    "destructive testing",
    "source-code remediation implementation",
    "vulnerability findings",
    "security findings",
    "severity assessment",
    "remediation recommendation",
  ], noReopeningSection);
});

test("raw private and conclusion material appears only as blocked or non-authorized categories", () => {
  assert.doesNotMatch(docsText, /\/Users\/|\/private\/|[A-Za-z]:\\/);
  assert.doesNotMatch(docsText, /https?:\/\//i);
  assert.doesNotMatch(
    docsText,
    /bearer\s+[a-z0-9._-]+|(?:api[_-]?key|secret|access[_-]?token|refresh[_-]?token)\s*[:=]/i,
  );

  const controlledContext =
    /(no |not |does not |do not |blocked|must-not-use|non-authori[sz]|unauthori[sz]|without|future-review|future review|forbidden|exclude|exclusion|outside searched scope|remains unresolved|requires separate explicit authorization|not-created|not-executed|none|only|`NO_|`NOT_|_NOT_|_NONE`)/i;
  const blockedStatusSection = sectionFrom(
    "The following statuses are blocked / must-not-use language only.",
  );
  const sensitivePatterns = [
    /raw source material/i,
    /raw source inspection/i,
    /raw\/private/i,
    /private facts/i,
    /source locators?/i,
    /source filenames?/i,
    /absolute local paths?/i,
    /sensitive dates?/i,
    /sensitive details?/i,
    /page references?/i,
    /\bURLs?\b/i,
    /\btokens?\b/i,
    /medical details?/i,
    /intimate details?/i,
    /child details?/i,
    /third-party details?/i,
    /legal conclusions?/i,
    /clinical conclusions?/i,
    /evidentiary conclusions?/i,
    /case-truth claims?/i,
    /case-truth conclusion/i,
    /credibility findings?/i,
    /offence findings?/i,
    /ownership findings?/i,
    /risk scores?/i,
    /sufficiency scores?/i,
    /victim-status conclusions?/i,
    /perpetrator-status conclusions?/i,
    /trauma-diagnosis/i,
    /police-report language/i,
    /pleading language/i,
    /external-use readiness/i,
    /product-candidate/i,
    /vulnerability findings?/i,
    /security findings?/i,
    /severity/i,
    /remediation/i,
  ];

  const matchingLines = docsText.split("\n").filter((line) =>
    sensitivePatterns.some((pattern) => pattern.test(line)),
  );
  assert.notEqual(matchingLines.length, 0);

  for (const line of matchingLines) {
    if (blockedStatusSection.includes(line)) {
      continue;
    }
    assert.match(
      line,
      controlledContext,
      `sensitive/conclusion wording outside controlled context: ${line}`,
    );
  }
});

test("blocked actions appear only in blocked or must-not-use language", () => {
  const blockedSection = sectionBetween(
    "## Blocked / Must-Not-Use Actions",
    "The following statuses are blocked / must-not-use language only.",
  );
  const blockedStatusSection = docsText.slice(docsText.indexOf(
    "The following statuses are blocked / must-not-use language only.",
  ));

  assertIncludesAll([
    "The following statuses are blocked / must-not-use language only. They do not create facts, findings, authorization, review execution, tool execution, target contact, remediation, behavior change, delivery, certification, proof, or conclusions:",
  ]);

  assert.equal(blockedSection.includes("SECURITY_FINDING_CREATED"), false);

  for (const status of [
    "ACTIVE_SECURITY_REVIEW_AS_VULNERABILITY_ASSESSMENT_STARTED",
    "PENTEST_STARTED",
    "SECURITY_TOOL_EXECED",
    "SCANNER_EXECED",
    "NPM_AUDIT_RUN",
    "DEPENDENCY_VULNERABILITY_AUDIT_RUN",
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
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
    "VULNERABILITY_ABSENCE_CLAIMED",
    "SAFETY_CERTIFICATION_CLAIMED",
    "RELEASE_APPROVAL_CLAIMED",
    "RUNTIME_CERTIFICATION_CLAIMED",
    "TECHNICAL_SIGN_OFF_CLAIMED",
    "EXTERNAL_USE_READY",
    "PRODUCT_CANDIDATE_SELECTED",
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
    assert.match(blockedStatusSection, new RegExp(status));
  }
});

test("extension rule preserves separate authorization for any future expansion", () => {
  const extensionSection = sectionFrom("## Extension Rule");

  assertIncludesAll([
    "Any future assessment, pentest, tool execution, scanner execution, audit execution, dependency vulnerability audit, dynamic testing, app startup, network probing, target contact, source-code remediation, behavior change, delivery, external-use readiness, product-candidate selection, release approval, certification, verification, proof, finding, severity assessment, remediation recommendation, remediation implementation, or conclusion requires separate explicit authorization, a narrowed boundary, and proof that prior data-handling, private-run, source-inspection, generated-PDF, external-use, product-candidate, and human/professional review gates are not bypassed.",
  ], extensionSection);
});
