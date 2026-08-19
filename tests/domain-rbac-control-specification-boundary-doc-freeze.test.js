const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_RBAC_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
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
    .find((line) => line.startsWith("| ") && line.includes(`| \`${materialClass}\` |`));
  assert.ok(row, `missing table row for material class: ${materialClass}`);
  return row;
}

const statusTokens = [
  "RBAC_CONTROL_SPECIFICATION_BOUNDARY",
  "DOCS_ONLY",
  "RBAC_CONTROL_SPECIFICATION_ONLY",
  "RBAC_CONTROL_SPECIFICATION_SCOPE_ALIGNED_AFTER_RAW_ROUTING_HARDENING",
  "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_EXTERNAL_REVIEWER_21_POINT_HARDENED_USED_AS_CONTEXT",
  "RBAC_DOWNSTREAM_CONTEXT_ONLY_AFTER_RAW_ROUTING_HARDENING",
  "ALL_TEN_MATERIAL_CLASSES_ROW_SCOPED_FOR_RBAC",
  "RBAC_SPECIFICATION_NOT_IMPLEMENTATION",
  "RBAC_NOT_IMPLEMENTED",
  "RBAC_NOT_RESOLVED",
  "ROLE_PERMISSION_MODEL_NOT_CREATED",
  "ROLE_FIELDS_NOT_CREATED",
  "PERMISSION_FIELDS_NOT_CREATED",
  "ROLE_SCHEMA_NOT_CREATED",
  "PERMISSION_SCHEMA_NOT_CREATED",
  "ADMIN_SUPPORT_MODEL_NOT_CREATED",
  "ADMIN_SUPPORT_ACCESS_UNRESOLVED",
  "GLOBAL_ACCESS_CONTROL_MODEL_NOT_CREATED",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_RBAC",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_FULL_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_GLOBAL_AUTHORIZATION_MODEL",
  "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
  "SOURCE_PACKAGE_NOT_INSPECTED",
  "PDF_IMAGE_SCREENSHOT_METADATA_NOT_INSPECTED",
  "METADATA_NOT_ACQUIRED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
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

const subjectConcepts = [
  "user",
  "reviewer",
  "admin",
  "support",
  "system/service account",
  "workflow agent/tool",
  "third-party provider route",
  "human/professional reviewer",
];

const permissionFamilies = [
  "material intake",
  "material view",
  "material redaction",
  "material routing",
  "quarantine/block override",
  "review access",
  "export/download access",
  "packet/delivery promotion",
  "third-party route approval",
  "audit log view",
  "retention/deletion operation",
  "admin/support access",
];

const resourceScopes = [
  "tenant",
  "case",
  "material class",
  "object",
  "function",
  "property/field",
  "route",
  "export/artifact",
  "log/audit record",
  "third-party route",
];

const rbacControlRows = [
  [
    "SANITIZED_TEXT_PRIMARY_MATERIAL",
    "sanitized-only candidate; no raw/private leakage",
    "user, reviewer, workflow agent/tool",
    "material intake, material view, material redaction, material routing, review access",
    "admin/support access unresolved",
    "sanitized intake, review access, and route events required",
    "scoped sanitized-material retention/deletion policy required",
    "third-party routing blocked until provider/routing status",
    "RBAC policy, subject/resource model, sanitized-only route policy",
    "allow, deny, wrong-tenant, wrong-case, wrong-material-class, no-raw leakage, audit event tests",
    "future evidence only; policy and tests prove sanitized-only access without raw/private leakage",
    "implementation, runtime gates, raw/private inspection, product candidate, external-use",
  ],
  [
    "REDACTED_REVIEW_SIGNAL_MATERIAL",
    "review-signal-only; no product conclusion",
    "reviewer, human/professional reviewer",
    "material redaction, material view, review access",
    "admin/support review access unresolved",
    "review access and redaction events required",
    "review-signal retention/deletion policy required",
    "no third-party raw/private routing",
    "review-role policy, redaction workflow model, no-conclusion workflow guard",
    "allow, deny, review-only egress, no product-conclusion, audit event tests",
    "future evidence only; tests prove review-only access without raw/private leakage or product conclusions",
    "implementation, runtime gates, approval, sign-off, product candidate, external-use",
  ],
  [
    "NO_RAW_METADATA_MANIFEST_MATERIAL",
    "contract/validator-only; no metadata acquisition",
    "system/service account",
    "material view, validation, access-controlled manifest use",
    "admin/support manifest access unresolved",
    "manifest validation and manifest access events required if later used",
    "retention/deletion required if persisted",
    "no third-party routing",
    "authorized manifest workflow, consumer model, no-acquisition control",
    "no metadata acquisition, validator/consumer allow/deny, audit event tests",
    "future evidence only; tests prove no raw metadata acquisition or leakage",
    "implementation, runtime gates, metadata acquisition, manifest instance, product candidate, external-use",
  ],
  [
    "GENERATED_ARTIFACT_OR_EXPORT_MATERIAL",
    "scoped export/download only; not delivery or external-use approval",
    "user, reviewer, admin, support candidates",
    "export/download access, material view, packet/delivery promotion",
    "admin/support export/download and promotion unresolved",
    "export/download, packet-promotion denial, and overexposure events required",
    "artifact lifecycle retention/deletion policy required",
    "no third-party routing without separate approval",
    "role-aware export/download policy, packet-promotion policy, overexposure controls",
    "allow, deny, wrong-tenant, wrong-case, overexposure, packet/delivery promotion, audit event tests",
    "future evidence only; role/permission tests prove no unauthorized export, delivery, external-use, or overexposure",
    "implementation, runtime gates, packet/delivery promotion, product candidate, external-use, release approval, runtime certification, technical sign-off, External Reviewer approval",
  ],
  [
    "LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
    "non-CI and non-packet unless separately approved",
    "reviewer, admin, support candidates",
    "log view, audit log view, retention/deletion operation",
    "admin/support log access unresolved",
    "log view, audit log view, retention/deletion, and non-packet access events required",
    "log retention/deletion policy required",
    "no third-party routing",
    "log classification policy, log access model, audit/access-log handling",
    "allow/deny, log access, retention/deletion, non-CI, non-packet, audit event tests",
    "future evidence only; tests prove logs are not CI evidence or packet components unless separately approved",
    "implementation, runtime gates, local log CI evidence use, packet component use, external-use, release approval",
  ],
  [
    "RAW_PRIVATE_SOURCE_MATERIAL",
    "deny-by-default; block/quarantine only",
    "future authorized reviewer/admin/system only after explicit authorization",
    "material intake, quarantine/block override, material redaction, review access",
    "admin/support raw access unresolved and blocked",
    "attempted ingress, block/quarantine, access-denial, and escalation events required",
    "raw/private retention and deletion policy required before any authorized handling",
    "third-party raw/private routing remains unauthorized",
    "explicit future authorization, RBAC architecture, quarantine/block implementation, raw/private deny path",
    "allow/deny, raw/private denial, wrong-tenant, wrong-case, wrong-material-class, escalation, audit event tests",
    "future evidence only; explicit authorization plus tests prove no unauthorized raw/private access or routing",
    "implementation, runtime gates, real private run, raw/private inspection, third-party routing, product candidate, external-use, release approval, runtime certification, technical sign-off, External Reviewer approval",
  ],
  [
    "SOURCE_PACKAGE_MATERIAL",
    "deny-by-default; package block/quarantine only",
    "future admin/system quarantine subjects only after explicit authorization",
    "material intake, material routing, quarantine/block override, review access",
    "admin/support source-package access unresolved and blocked",
    "attempted package handling and package-block event required",
    "source-package retention/deletion policy required before any authorized handling",
    "model/API routing and archive/delivery routing remain unauthorized",
    "explicit future authorization, source-package deny/quarantine model, RBAC policy",
    "deny, wrong-material-class, source-package denial, no archive/API route, audit event tests",
    "future evidence only; tests prove packages are blocked/quarantined unless separately approved",
    "implementation, runtime gates, source package inspection, archive/ZIP routing, model/API routing, product candidate, external-use",
  ],
  [
    "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
    "deny-by-default; metadata acquisition blocked",
    "future reviewer/admin/system only after explicit authorization",
    "material view, metadata acquisition approval, review access, audit log view",
    "admin/support metadata access unresolved and blocked",
    "attempted access, metadata acquisition denial, and audit events required",
    "metadata retention/deletion policy required before any authorized handling",
    "third-party metadata routing remains unauthorized",
    "explicit metadata acquisition contract, RBAC policy, blocking path",
    "deny, metadata acquisition denial, no-raw, no packet/repo-evidence, audit event tests",
    "future evidence only; tests prove no unauthorized PDF/image/screenshot/metadata inspection or egress",
    "implementation, runtime gates, PDF/image/screenshot/metadata inspection, OCR, metadata extraction, repo evidence use, packet component use",
  ],
  [
    "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    "deny-by-default; no third-party route without provider/routing authorization",
    "service account, provider route, admin approval subject only after provider status",
    "third-party route approval, material routing, audit log view, provider config view",
    "admin/support/provider approval unresolved",
    "third-party route denial, approval, provider config access, and audit events required",
    "provider retention/deletion posture required",
    "provider status, terms, privacy posture, data-routing map, audit, retention, and RBAC required before use",
    "provider record, data-routing map, route authorization policy, no-unauthorized-route control",
    "third-party no-route, route allow/deny, raw/private denial, wrong-tenant, wrong-case, audit event tests",
    "future evidence only; provider/API status and tests prove no unauthorized third-party routing or raw/private leakage",
    "implementation, runtime gates, third-party routing, real private run, product candidate, external-use, release approval",
  ],
  [
    "HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
    "review-only human/professional gate",
    "human/professional reviewer",
    "review access only",
    "admin/support cannot substitute for professional review without separate authorization",
    "review access event required",
    "review-material retention/deletion policy required",
    "no third-party routing",
    "human/professional review workflow gate evidence if later implemented",
    "no-conclusion, no-approval, no-sign-off, no-external-use, audit event tests",
    "future evidence only; tests preserve no unauthorized approval, sign-off, product-candidate, or external-use",
    "implementation, runtime gates, approval, sign-off, product candidate, external-use, release approval, runtime certification, technical sign-off, External Reviewer approval",
  ],
];

const alignmentRows = [
  [
    "SANITIZED_TEXT_PRIMARY_MATERIAL",
    "sanitized-only candidate aligned to `RMR-CS-001`",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "sanitized intake user, reviewer, workflow agent/tool",
    "raw-source viewer, third-party route approver",
    "tenant/case/material-class/object/function/property scope needed",
    "no audit/access-log implementation created",
    "scoped sanitized-material retention/deletion policy required",
    "third-party routing blocked until provider/routing status",
    "RBAC policy, subject/resource model, sanitized-only route policy",
    "yes",
  ],
  [
    "REDACTED_REVIEW_SIGNAL_MATERIAL",
    "review-signal-only aligned to `RMR-CS-002`",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "reviewer, human/professional reviewer",
    "automated raw inference actor, product conclusion actor",
    "review signal must be scoped by tenant/case/material class",
    "no audit/access-log implementation created",
    "review-signal retention/deletion policy required",
    "no third-party raw/private routing",
    "review-role policy, redaction workflow model, no-conclusion workflow guard",
    "yes",
  ],
  [
    "NO_RAW_METADATA_MANIFEST_MATERIAL",
    "contract/validator-only aligned to `RMR-CS-003`",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "validator service account",
    "metadata acquisition actor without authorization",
    "manifest access scope needed if persisted or consumed",
    "no audit/access-log implementation created",
    "retention/deletion required if persisted",
    "no third-party routing",
    "authorized manifest workflow, consumer model, no-acquisition control",
    "yes",
  ],
  [
    "GENERATED_ARTIFACT_OR_EXPORT_MATERIAL",
    "scoped export/download only aligned to `RMR-CS-004`; not delivery or external-use approval",
    "`PARTIAL_DOCS_OR_TEST_EVIDENCE`",
    "export reader, reviewer, future approved packet promoter",
    "unauthorized packet promoter, external-use actor",
    "tenant/case/export/artifact/object/function/property scope needed",
    "no audit/access-log implementation created",
    "artifact lifecycle retention/deletion policy required",
    "no third-party routing without separate approval",
    "role-aware export/download policy, packet-promotion policy, overexposure controls",
    "yes",
  ],
  [
    "LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
    "non-CI and non-packet aligned to `RMR-CS-005` unless separately approved",
    "`DOCS_ONLY`",
    "log reviewer, future audit viewer",
    "CI evidence publisher, packet component promoter",
    "log/audit record scope needed",
    "no audit/access-log implementation created",
    "log retention/deletion policy required",
    "no third-party routing",
    "log classification policy, log access model, audit/access-log handling",
    "yes",
  ],
  [
    "RAW_PRIVATE_SOURCE_MATERIAL",
    "deny-by-default aligned to `RMR-CS-006`; block/quarantine only",
    "`NOT_AUTHORIZED` / `EXPLICITLY_UNRESOLVED`",
    "none currently; future authorized quarantine reviewer only",
    "general user, general reviewer, workflow agent, third-party route",
    "full material-class and object/property scope required before any future handling",
    "no audit/access-log implementation created",
    "raw/private retention and deletion policy required before any authorized handling",
    "third-party raw/private routing remains unauthorized",
    "explicit future authorization, RBAC architecture, quarantine/block implementation, raw/private deny path",
    "yes",
  ],
  [
    "SOURCE_PACKAGE_MATERIAL",
    "deny-by-default aligned to `RMR-CS-007`; package block/quarantine only",
    "`NOT_AUTHORIZED`",
    "none currently; future admin/system quarantine subject only",
    "package opener, model/API route actor, archive/delivery promoter",
    "package/material-class/object scope required before any future handling",
    "no audit/access-log implementation created",
    "source-package retention/deletion policy required before any authorized handling",
    "model/API routing and archive/delivery routing remain unauthorized",
    "explicit future authorization, source-package deny/quarantine model, RBAC policy",
    "yes",
  ],
  [
    "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
    "deny-by-default aligned to `RMR-CS-008`; metadata acquisition blocked",
    "`NOT_AUTHORIZED` / `DOCS_ONLY`",
    "none currently; future authorized metadata reviewer only",
    "OCR actor, metadata extractor, packet evidence promoter",
    "object/property metadata scope required before any future handling",
    "no audit/access-log implementation created",
    "metadata retention/deletion policy required before any authorized handling",
    "third-party metadata routing remains unauthorized",
    "explicit metadata acquisition contract, RBAC policy, blocking path",
    "yes",
  ],
  [
    "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    "deny-by-default aligned to `RMR-CS-009`; no third-party route without provider/routing authorization",
    "`EXPLICITLY_UNRESOLVED` / `ARCHITECTURE_REQUIRED_FIRST`",
    "none currently; future route approver only after provider status",
    "general user route, raw/private route actor",
    "third-party route must be scoped by tenant/case/material class/object/function/property",
    "no audit/access-log implementation created",
    "provider retention/deletion posture required",
    "provider status, terms, privacy posture, data-routing map, audit, retention, and RBAC required before use",
    "provider record, data-routing map, route authorization policy, no-unauthorized-route control",
    "yes",
  ],
  [
    "HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
    "review-only human/professional gate aligned to `RMR-CS-010`",
    "`HUMAN_PROFESSIONAL_REVIEW_GATE_REQUIRED` / `DOCS_ONLY`",
    "human/professional reviewer",
    "automated conclusion actor, product approval actor, external-use actor",
    "review handoff scope required",
    "review access event required; no audit/access-log implementation created",
    "review-material retention/deletion policy required",
    "no third-party routing",
    "human/professional review workflow gate evidence if later implemented",
    "yes",
  ],
];

test("doc exists", () => {
  assert.ok(fs.existsSync(docsPath));
  assert.ok(docsText.length > 0);
});

test("freezes RBAC control specification identity and statuses", () => {
  assertIncludesAll(statusTokens);
  assertIncludesAll([
    "Boundary name: `RBAC_CONTROL_SPECIFICATION_BOUNDARY`",
    "Status: `RBAC_CONTROL_SPECIFICATION_ONLY`",
    "It is derived from the frozen RBAC control-specification feasibility review.",
    "It uses the hardened raw-material routing control specification as current routing/material-class baseline context only.",
    "The current routing/material-class baseline is `RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_EXTERNAL_REVIEWER_21_POINT_HARDENED_AND_COMMITTED`.",
    "This RBAC control specification is downstream `DOCS_ONLY` context after raw-routing hardening.",
  ]);
});

test("specifies future subject concepts, permission families, and resource scopes", () => {
  assertIncludesAll(subjectConcepts, sectionBetween("## Future Subject Concepts", "## Future Permission Families"));
  assertIncludesAll(permissionFamilies, sectionBetween("## Future Permission Families", "## Resource Scopes"));
  assertIncludesAll(resourceScopes, sectionBetween("## Resource Scopes", "## Deny-By-Default Classes"));
  assertIncludesAll([
    "A role concept does not mean current role exists.",
    "A permission family does not mean current permission exists.",
  ]);
});

test("freezes downstream-context-only alignment after raw-routing hardening", () => {
  assertIncludesAll([
    "This hardening aligns the existing RBAC control specification to the current hardened raw-material routing control specification.",
    "The hardened raw-material routing control specification is used as current routing/material-class baseline for RBAC scope review only.",
    "The RBAC control specification is aligned downstream context after raw-routing hardening, not approval, not implementation, and not runtime enforcement.",
    "Material-class scope alignment does not mean RBAC implementation.",
    "Raw-material routing hardening does not mean RBAC implementation.",
  ], sectionBetween("## Scope Alignment After Raw-Routing Hardening", "## RBAC Scope Alignment Matrix After Raw-Routing Hardening"));
});

test("freezes deny-by-default classes and high-priority material classes", () => {
  assertIncludesAll(
    [
      "raw private source",
      "source packages",
      "PDF/image/screenshot/metadata",
      "third-party raw/private routing",
    ],
    sectionBetween("## Deny-By-Default Classes", "## Scope Alignment After Raw-Routing Hardening"),
  );

  assertIncludesAll(
    [
      "RAW_PRIVATE_SOURCE_MATERIAL",
      "SOURCE_PACKAGE_MATERIAL",
      "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
      "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
      "GENERATED_ARTIFACT_OR_EXPORT_MATERIAL",
      "LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
    ],
    sectionBetween("## Highest-Priority Material Classes", "## Required Future Test Evidence"),
  );
});

test("freezes row-scoped RBAC control requirements for all ten material classes", () => {
  const matrix = sectionBetween("## RBAC Control Specification Matrix", "## Highest-Priority Material Classes");

  for (const [materialClass, ...expectedCells] of rbacControlRows) {
    const row = rowForMaterial(materialClass, matrix);
    assertIncludesAll(expectedCells, row);
  }
});

test("freezes raw-routing hardening scope alignment for all ten material classes", () => {
  const matrix = sectionBetween(
    "## RBAC Scope Alignment Matrix After Raw-Routing Hardening",
    "## RBAC Control Specification Matrix",
  );

  assertIncludesAll([
    "Routing/material posture",
    "Role/permission evidence level",
    "Future subject concepts",
    "Future permission families",
    "Allowed role concept candidates",
    "Prohibited role concept candidates",
    "Admin/support implications",
    "Tenant/case/object/function/property authorization implications",
    "Audit/access-log dependency",
    "Retention/deletion dependency",
    "Third-party/API dependency",
    "Implementation prerequisite",
    "Required future test evidence",
    "Blocker status",
    "Closure criteria",
    "Runtime implementation premature",
  ], matrix);

  for (const [materialClass, ...expectedCells] of alignmentRows) {
    const row = rowForMaterial(materialClass, matrix);
    assertIncludesAll(expectedCells, row);
  }

  assertIncludesAll(materialClasses, matrix);
});

test("preserves audit, retention, third-party, evidence, and closure requirements", () => {
  const matrix = sectionBetween("## RBAC Control Specification Matrix", "## Highest-Priority Material Classes");

  assertIncludesAll([
    "Audit/access-log dependency",
    "Retention/deletion dependency",
    "Third-party/API constraint",
    "Required implementation evidence",
    "Required test evidence",
    "Closure criteria",
    "Non-authorized until closure",
  ], matrix);
});

test("freezes future test evidence and future-only closure criteria", () => {
  assertIncludesAll(
    [
      "allow",
      "deny",
      "wrong-tenant",
      "wrong-case",
      "wrong-material-class",
      "admin/support bypass-prevention",
      "overexposure",
      "escalation",
      "raw/private denial",
      "third-party no-route",
      "audit event tests",
      "Required test evidence is future evidence, not current closure.",
    ],
    sectionBetween("## Required Future Test Evidence", "## Closure Criteria"),
  );

  assertIncludesAll(
    [
      "Closure requires future implementation evidence and future test evidence only.",
      "This boundary creates no current closure.",
      "No blocker is resolved by this specification.",
      "role fields",
      "permission fields",
      "admin/support model",
      "audit/access-log behavior",
      "retention/deletion behavior",
      "third-party provider/data-routing posture",
      "complete global access-control model",
    ],
    sectionBetween("## Closure Criteria", "## Non-Authorized Until Closure"),
  );
});

test("freezes non-authorized gates until closure", () => {
  assertIncludesAll(
    [
      "implementation",
      "runtime gates",
      "product candidate",
      "external-use",
      "release approval",
      "runtime certification",
      "technical sign-off",
      "External Reviewer approval",
      "Human/professional review remains the release gate.",
    ],
    sectionBetween("## Non-Authorized Until Closure", "## Evidence References"),
  );
});

test("preserves evidence references to routing hardening, RBAC, audit, and External Reviewer contexts", () => {
  assertIncludesAll([
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
    "tests/domain-raw-material-routing-control-specification-boundary-doc-freeze.test.js",
    "docs/DOMAIN_CONTRACTS_SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_RBAC_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_RBAC_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
    "tests/domain-rbac-control-specification-boundary-doc-freeze.test.js",
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
  ]);
});

test("preserves no-overclaim rules", () => {
  assertIncludesAll(
    [
      "this hardening is not implementation",
      "this hardening is not remediation",
      "this hardening is not a security finding",
      "this hardening is not a vulnerability finding",
      "this hardening assigns no severity",
      "this hardening recommends no remediation",
      "this RBAC control specification is not implementation",
      "this RBAC control specification is not remediation",
      "this RBAC control specification is not a security assessment finding",
      "this RBAC control specification is not a vulnerability finding",
      "this RBAC control specification assigns no severity",
      "this RBAC control specification recommends no remediation",
      "RBAC control specification remains downstream DOCS_ONLY context only",
      "downstream context does not mean approval",
      "downstream context does not mean runtime enforcement",
      "downstream context does not mean implementation",
      "role concept does not mean current role exists",
      "permission family does not mean current permission exists",
      "material-class scope alignment does not mean RBAC implementation",
      "raw-material routing hardening does not mean RBAC implementation",
      "required test evidence is future evidence, not current closure",
      "route/case/capability evidence is not RBAC",
      "route/case/capability evidence is not full access control",
      "route/case/capability evidence is not admin/support access control",
      "route/case/capability evidence is not global authorization model",
      "DOCS_ONLY boundaries are not runtime enforcement",
      "product candidate remains none",
      "external-use remains unauthorized",
      "human/professional review remains release gate",
      "runtime gate inventory remains deferred",
    ],
    sectionBetween("## No-Overclaim Rules", "## No-Reopening Rules"),
  );
});

test("preserves no-reopening rules and raw/private/conclusion guard", () => {
  assertIncludesAll(
    [
      "runtime implementation",
      "API behavior change",
      "schema behavior change",
      "package implementation behavior",
      "RBAC implementation",
      "access-control architecture implementation",
      "raw-material routing implementation",
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
    ],
    sectionBetween("## No-Reopening Rules", "## Raw/Private/Conclusion Guard"),
  );

  assertIncludesAll(
    [
      "This boundary contains no raw/private source material.",
      "This boundary contains no source package material.",
      "This boundary creates no legal, clinical, evidentiary, case-truth, credibility, offence, ownership, risk, sufficiency, police-report, pleading, marker-finding, security-finding, vulnerability-finding, severity, remediation, external-use, or product-candidate conclusion.",
      "Any references to those categories are blocked-category, forbidden-category, future-evidence, or non-authorization wording only.",
    ],
    sectionBetween("## Raw/Private/Conclusion Guard", "## Next-Slice Posture"),
  );
});

test("does not include implementation, approval, finding, severity, or remediation claims", () => {
  assertDoesNotIncludeAny([
    "RBAC_IMPLEMENTED",
    "ACCESS_CONTROL_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "ROLE_FIELDS_CREATED",
    "PERMISSION_FIELDS_CREATED",
    "ROLE_SCHEMA_CREATED",
    "PERMISSION_SCHEMA_CREATED",
    "ADMIN_SUPPORT_MODEL_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "RELEASE_APPROVAL_CREATED",
    "RUNTIME_CERTIFICATION_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "EXTERNAL_REVIEWER_APPROVAL_CREATED",
  ]);
});

test("freezes next-slice posture without authorization", () => {
  const section = docsText.slice(docsText.indexOf("## Next-Slice Posture"));
  assertIncludesAll(
    [
      "`REVIEW_ONLY_RBAC_CONTROL_SPECIFICATION_SCOPE_ALIGNMENT_AFTER_RAW_ROUTING_HARDENING`",
      "`DOCS_ONLY_RBAC_GATE_CANDIDATE_STATUS_BOUNDARY`",
      "`PROVE_ONLY_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_SCOPE_REVIEW_AFTER_RBAC_ALIGNMENT`",
      "continued pause",
      "None are authorized by this hardening.",
    ],
    section,
  );
  assertDoesNotIncludeAny([
    "`REVIEW_ONLY_RBAC_CONTROL_SPECIFICATION_BOUNDARY`",
    "`PROVE_ONLY_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW`",
  ], section);
});
