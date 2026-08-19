const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY_v1.md",
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

function rowForBlocker(blocker, table) {
  const row = table
    .split("\n")
    .find((line) => line.startsWith("| ") && line.includes(`| ${blocker} |`));
  assert.ok(row, `missing table row for blocker: ${blocker}`);
  return row;
}

const blockers = [
  "retention",
  "deletion",
  "encryption",
  "audit logs",
  "role permissions",
  "raw-material routing",
  "third-party model/API status",
  "access control beyond documented route/case behavior",
  "complete global access-control threat model",
];

test("boundary doc exists and is docs-only status boundary", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "# Data-Handling Blocker Evidence Status Boundary",
    "Boundary name: `DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY`.",
    "Status: `DOCS_ONLY`.",
    "Mode: `DATA_HANDLING_BLOCKER_STATUS_ONLY`.",
    "This boundary freezes current data-handling blocker evidence status only.",
  ]);
});

test("all required status tokens are frozen", () => {
  assertIncludesAll([
    "DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY",
    "DOCS_ONLY",
    "DATA_HANDLING_BLOCKER_STATUS_ONLY",
    "RETENTION_EXPLICITLY_UNRESOLVED",
    "DELETION_EXPLICITLY_UNRESOLVED",
    "ENCRYPTION_EXPLICITLY_UNRESOLVED",
    "AUDIT_LOGS_EXPLICITLY_UNRESOLVED",
    "ROLE_PERMISSIONS_EXPLICITLY_UNRESOLVED",
    "RAW_MATERIAL_ROUTING_EXPLICITLY_UNRESOLVED",
    "THIRD_PARTY_MODEL_API_STATUS_EXPLICITLY_UNRESOLVED",
    "ACCESS_CONTROL_BEYOND_DOCUMENTED_ROUTE_CASE_BEHAVIOR_PARTIAL_ONLY",
    "COMPLETE_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_UNKNOWN_NOT_EVIDENCED",
    "NO_RETENTION_IMPLEMENTATION_EVIDENCE_FOUND",
    "NO_DELETION_IMPLEMENTATION_EVIDENCE_FOUND",
    "NO_ENCRYPTION_IMPLEMENTATION_EVIDENCE_FOUND",
    "NO_FORMAL_AUDIT_LOG_IMPLEMENTATION_EVIDENCE_FOUND",
    "NO_ROLE_PERMISSION_IMPLEMENTATION_EVIDENCE_FOUND",
    "NO_RAW_MATERIAL_ROUTING_IMPLEMENTATION_EVIDENCE_FOUND",
    "NO_THIRD_PARTY_MODEL_API_STATUS_IMPLEMENTATION_EVIDENCE_FOUND",
    "DOCUMENTED_ROUTE_CASE_ACCESS_CONTROL_PARTIAL_IMPLEMENTATION_TEST_EVIDENCE_ONLY",
    "ROUTE_CASE_EVIDENCE_NOT_GLOBAL_ACCESS_CONTROL_MODEL",
    "DATA_HANDLING_BLOCKERS_REMAIN_UNRESOLVED_UNLESS_SEPARATELY_EVIDENCED",
  ]);
});

test("all nine blockers and per-blocker status claims appear in evidence table", () => {
  const table = sectionBetween("## Evidence Status Table", "## Implementation Evidence Summary");
  assertIncludesAll(blockers, table);
  const rowAssertions = [
    {
      blocker: "retention",
      phrases: [
        "`EXPLICITLY_UNRESOLVED`",
        "no implementation evidence found",
        "blocker remains unresolved",
      ],
    },
    {
      blocker: "deletion",
      phrases: [
        "`EXPLICITLY_UNRESOLVED`",
        "no implementation evidence found",
        "blocker remains unresolved",
      ],
    },
    {
      blocker: "encryption",
      phrases: [
        "`EXPLICITLY_UNRESOLVED`",
        "no implementation/control evidence found",
        "blocker remains unresolved",
      ],
    },
    {
      blocker: "audit logs",
      phrases: [
        "`EXPLICITLY_UNRESOLVED`",
        "formal audit logging remains unknown/not evidenced",
        "no audit-log implementation found",
        "blocker remains unresolved",
      ],
    },
    {
      blocker: "role permissions",
      phrases: [
        "`EXPLICITLY_UNRESOLVED`",
        "no role-permission implementation found",
        "blocker remains unresolved",
      ],
    },
    {
      blocker: "raw-material routing",
      phrases: [
        "`EXPLICITLY_UNRESOLVED`",
        "raw/private routing remains not authorized/evidenced",
        "no routing implementation found",
        "blocker remains unresolved",
      ],
    },
    {
      blocker: "third-party model/API status",
      phrases: [
        "`EXPLICITLY_UNRESOLVED`",
        "no provider-status implementation/evidence found",
        "blocker remains unresolved",
      ],
    },
    {
      blocker: "access control beyond documented route/case behavior",
      phrases: [
        "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
        "documented route/case tenant/capability checks have partial evidence",
        "does not prove broader/global access control",
        "blocker remains unresolved beyond documented surfaces",
      ],
    },
    {
      blocker: "complete global access-control threat model",
      phrases: [
        "`UNKNOWN_NOT_EVIDENCED`",
        "no complete formal threat model evidenced",
        "blocker remains unresolved",
      ],
    },
  ];

  for (const { blocker, phrases } of rowAssertions) {
    assertIncludesAll(phrases, rowForBlocker(blocker, table));
  }
});

test("required evidence references appear", () => {
  assertIncludesAll([
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY_v1.md",
    "tests/domain-data-handling-and-private-pilot-readiness-boundary-doc-freeze.test.js",
    "[excluded private review artifact]",
    "docs/DOMAIN_CONTRACTS_PRIVATE_LARGE_SOURCE_RUN_READINESS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_STATIC_SECURITY_CONTROL_OBSERVATION_REPORT_BOUNDARY_v1.md",
    "docs/TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE_v1.md",
    "[excluded private review artifact]",
    "apps/api/src/index.js",
    "tests/profile-input-api.test.js",
    "tests/release-eval-run-api.test.js",
  ]);
});

test("implementation summary preserves no-evidence and partial-route limits", () => {
  const section = sectionBetween(
    "## Implementation Evidence Summary",
    "## Non-Proof And No-Overclaim Rules",
  );
  assertIncludesAll([
    "No implementation evidence was found for:",
    "retention",
    "deletion",
    "encryption",
    "formal audit logs",
    "role-permission control",
    "raw-material routing",
    "third-party model/API status",
    "Documented route/case access-control surfaces have partial implementation/test evidence only.",
    "loadAuthorizedCaseContext",
    "That partial evidence is not global access-control assurance.",
    "That partial evidence is not a complete global access-control threat model.",
  ], section);
});

test("non-proof and no-overclaim rules are explicit", () => {
  const section = sectionBetween(
    "## Non-Proof And No-Overclaim Rules",
    "## No-Reopening Rules",
  );
  assertIncludesAll([
    "data-handling blocker status boundary is not blocker resolution",
    "unresolved docs are not implementation evidence",
    "partial route/case evidence is not global access-control assurance",
    "route/case tests are not complete threat model evidence",
    "absence of found implementation is not proof of absence outside searched tracked repo scope",
    "no blocker is resolved by this boundary",
    "no runtime behavior changes by this boundary",
    "no schema/API/package behavior changes by this boundary",
    "no product candidate is selected",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
    "no security/vulnerability finding is created",
    "no severity is assigned",
    "no remediation is recommended or implemented",
  ], section);
});

test("no-reopening rules include all blocked areas", () => {
  const section = sectionBetween("## No-Reopening Rules", "## Raw/Private/Conclusion Guard");
  assertIncludesAll([
    "manual External Reviewer delivery",
    "PDF generation",
    "PDF packet creation",
    "archive/ZIP generation",
    "packet component approval",
    "excluded private-review packet markdown update",
    "excluded private-review manifest update",
    "excluded private-review TOC update",
    "excluded private-review reference index update",
    "generated PDF as repo evidence",
    "generated PDF as packet component",
    "committing local logs",
    "local logs as CI evidence",
    "runtime/API/schema/package behavior",
    "validator dispatch",
    "registry/lookup/generic dispatch",
    "real private run",
    "source inspection",
    "metadata acquisition",
    "source package inspection",
    "actual matrix creation",
    "manifest instance creation",
    "test fixture instance creation",
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

test("negative authorization checks are explicit", () => {
  assertIncludesAll([
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
    "VALIDATOR_DISPATCH_NOT_CREATED",
    "REGISTRY_LOOKUP_NOT_CREATED",
    "REAL_PRIVATE_RUN_NOT_STARTED",
    "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
    "SOURCE_PACKAGE_NOT_INSPECTED",
    "METADATA_NOT_ACQUIRED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "SECURITY_FINDING_NOT_CREATED",
    "VULNERABILITY_FINDING_NOT_CREATED",
    "SEVERITY_NOT_ASSIGNED",
    "REMEDIATION_NOT_RECOMMENDED",
    "REMEDIATION_NOT_IMPLEMENTED",
  ]);
});

test("raw/private and conclusion material are only blocked-category wording", () => {
  const section = sectionBetween("## Raw/Private/Conclusion Guard", "## Next Slice Posture");
  assertIncludesAll([
    "This boundary contains no raw/private source material.",
    "This boundary contains no source package material.",
    "This boundary creates no legal, clinical, evidentiary, case-truth, credibility, offence, ownership, risk, sufficiency, police-report, pleading, marker-finding, security-finding, vulnerability-finding, severity, remediation, external-use, or product-candidate conclusion.",
    "Any references to those categories are blocked-category or non-authorization wording only.",
  ], section);
  assert.doesNotMatch(docsText, /RAW_PRIVATE_SOURCE_MATERIAL:/);
  assert.doesNotMatch(docsText, /PRIVATE_FACT:/);
  assert.doesNotMatch(docsText, /SOURCE_PACKAGE_CONTENT:/);
  assert.doesNotMatch(docsText, /LEGAL_CONCLUSION:/);
  assert.doesNotMatch(docsText, /CLINICAL_CONCLUSION:/);
  assert.doesNotMatch(docsText, /EVIDENTIARY_PROOF:/);
  assert.doesNotMatch(docsText, /CASE_TRUTH_CONCLUSION:/);
});

test("next-slice posture appears without authorization", () => {
  const section = sectionBetween("## Next Slice Posture", "None are authorized by this boundary.");
  assertIncludesAll([
    "PROVE_ONLY_ACCESS_CONTROL_THREAT_MODEL_INVENTORY",
    "DOCS_ONLY_THIRD_PARTY_MODEL_API_STATUS_BOUNDARY",
    "DOCS_ONLY_DATA_HANDLING_RETENTION_DELETION_ENCRYPTION_AUDIT_ROLE_STATUS_BOUNDARY",
    "continued pause",
  ], section);
  assertIncludesAll(["None are authorized by this boundary."]);
});
