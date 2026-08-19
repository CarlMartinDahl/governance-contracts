"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

const paths = Object.freeze({
  review:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59_v1.md",
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
  feasibility:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
  controlSpec:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  gapInventory:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37_v1.md",
  blockerAnalysis:
    "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  noContentTaxonomy:
    "packages/governance/src/no-content-audit-access-event-taxonomy.js",
  noContentTaxonomyTest:
    "tests/no-content-audit-access-event-taxonomy.test.js",
  rbacScope:
    "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_v1.md",
  rbacRegistry:
    "packages/governance/src/rbac-role-permission-model-scope-review-registry.js",
  adminSupportScope:
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55_v1.md",
  adminSupportRegistry:
    "packages/governance/src/admin-support-access-model-scope-review-registry.js",
  adminSupportAlignment:
    "tests/admin-support-access-model-scope-review-registry-alignment.test.js",
});

const readFixed = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const evidence = Object.freeze(
  Object.fromEntries(
    Object.entries(paths).map(([key, value]) => [key, readFixed(value)]),
  ),
);

const jsonBlock = (name) => {
  const pattern = new RegExp(
    `\`${name}\`\\s*\\n\\s*\`\`\`json\\s*([\\s\\S]*?)\\s*\`\`\``,
  );
  const match = evidence.review.match(pattern);
  assert.ok(match, `${name} block exists`);
  return JSON.parse(match[1]);
};

const metadata = jsonBlock(
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA",
);
const relationships = jsonBlock(
  "AUDIT_ACCESS_LOG_EXISTING_EVIDENCE_RELATIONSHIPS",
);
const provenance = jsonBlock("AUDIT_ACCESS_LOG_SOURCE_PROVENANCE_FIXTURES");
const noContentProfile = jsonBlock(
  "AUDIT_ACCESS_LOG_CANONICAL_NO_CONTENT_PROFILE",
);
const rows = jsonBlock(
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATRIX",
);

const expectedSurfaces = Object.freeze([
  "material intake event",
  "blocked/prohibited ingress event",
  "quarantine/block decision event",
  "redaction/sanitization event",
  "material routing event",
  "review access event",
  "manifest validation event",
  "export/download event",
  "packet/delivery promotion event",
  "local log/test transcript handling event",
  "admin/support access attempt event",
  "retention/deletion operation event",
  "third-party route denial/approval event",
  "runtime/schema/workflow gate candidate event",
  "human/professional review access event",
  "audit/log viewer access event",
  "admin/support privileged log access event",
]);

const expectedFields = Object.freeze([
  "readiness_id",
  "source_blocker_id",
  "surface",
  "actor_context_dependency",
  "role_permission_dependency",
  "scope_correlation_dependency",
  "decision_status_requirement",
  "allowed_event_content_profile",
  "prohibited_event_content_profile",
  "required_emitter_evidence",
  "required_schema_evidence",
  "required_storage_evidence",
  "required_log_viewer_access_control_evidence",
  "retention_deletion_dependency",
  "raw_material_routing_dependency",
  "third_party_provider_constraint",
  "current_evidence_level",
  "implementation_gap",
  "required_test_evidence",
  "blocker_status",
  "closure_criteria",
  "remains_non_authorized_until_closure",
]);

const expectedAllowedCategories = Object.freeze([
  "subject reference",
  "role/permission concept",
  "tenant/case scope",
  "material class",
  "route/surface",
  "decision status",
  "timestamp category",
  "reason code",
  "explicit no-raw/no-private/no-source-locator marker",
]);

const expectedProhibitedCategories = Object.freeze([
  "raw source text",
  "private facts",
  "source locators",
  "filenames or private paths",
  "page references",
  "URLs",
  "tokens",
  "secrets",
  "PDF/image/metadata content",
  "sensitive personal details",
  "legal conclusions",
  "clinical conclusions",
  "evidentiary conclusions",
  "case-truth conclusions",
  "product-candidate claims",
  "external-use claims",
]);

const requiredOpenBlockers = Object.freeze([
  "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
  "AUDIT_LOGGING_NOT_IMPLEMENTED",
  "ACCESS_LOGGING_NOT_IMPLEMENTED",
  "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
  "EVENT_EMITTER_NOT_CREATED",
  "LOG_SCHEMA_NOT_CREATED",
  "LOG_STORAGE_NOT_CREATED",
  "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
]);

const trackedActors = Object.freeze([
  "human professional reviewer",
  "repo/operator maintainer",
  "support/admin actor",
  "workflow automation agent",
  "system/service actor",
  "external reviewer or auditor",
  "third-party/provider actor",
  "UNKNOWN_NOT_EVIDENCED",
]);

const trackedRoles = Object.freeze([
  "owner/maintainer",
  "reviewer",
  "professional reviewer",
  "admin/support",
  "automation/service",
  "external auditor",
  "read-only observer",
  "third-party/provider",
  "UNKNOWN_NOT_EVIDENCED",
]);

const assertIncludesAll = (actual, expected) => {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
};

test("review has exact identity, posture, source anchor, and latest marker", () => {
  assert.match(
    evidence.review,
    /^# Audit\/Access-Log Implementation-Readiness Scope Review After PR59/m,
  );
  assert.equal(metadata.review_name, "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59");
  assert.equal(metadata.version, "v1");
  assert.deepEqual(metadata.posture, [
    "DOCS_ONLY",
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
  ]);
  assert.equal(
    metadata.source_anchor,
    "governance/main @ 350960b4350f9bb27317e21c5fc159bada80803e",
  );
  assert.equal(
    metadata.latest_marker,
    "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR58",
  );
  assertIncludesAll(evidence.review, [
    "post-PR59 implementation-readiness scope review",
    "not a duplicate feasibility review",
    "not a duplicate control specification",
    "not a duplicate implementation-gap inventory",
    "not a duplicate runtime-readiness blocker analysis",
  ]);
});

test("wiki/process and existing evidence relationships are context-only", () => {
  assertIncludesAll(evidence.wikiIndex, [
    "This wiki is a tracked repo orientation and coordination layer.",
    "Live git state, tracked",
    "GitHub PR metadata, and verified CI metadata win over wiki text.",
    "non-repo files are advisory only",
  ]);
  assertIncludesAll(evidence.wikiLog, [
    "Chat is advisory only and is not a source of truth.",
    "does not create governance proof, implementation, readiness, approval",
  ]);

  for (const relationship of Object.values(relationships)) {
    assert.equal(relationship.implementation, false);
    assert.equal(relationship.enforcement, false);
    assert.equal(relationship.approval, false);
    assert.equal(relationship.closure, false);
  }
  assert.equal(
    relationships.runtime_readiness_blocker_analysis.relationship,
    "source surface mapping only",
  );
  assert.equal(
    relationships.no_content_event_taxonomy_scaffold.relationship,
    "static governance scaffold only",
  );
});

test("source/provenance separation preserves PR53 literal and absent markers", () => {
  assert.deepEqual(provenance.pr53_literal_source_evidence.literal_markers, [
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
  ]);
  assert.deepEqual(
    provenance.pr53_literal_source_evidence.absent_literal_markers,
    ["TEST_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
  assert.deepEqual(provenance.pr53_literal_source_evidence.literal_boundaries, [
    "no implementation",
    "no enforcement",
    "no blocker closure",
  ]);
  assert.equal(provenance.sourceProvenanceSeparated, true);
  assert.equal(provenance.legacyEvidenceRewritten, false);
  assert.equal(metadata.sourceProvenanceSeparated, true);
  assert.equal(metadata.legacyEvidenceRewritten, false);

  assertIncludesAll(evidence.adminSupportAlignment, [
    "source provenance stays separated",
    "legacyEvidenceRewritten",
    "PR53 legacy literal source posture and separate provenance are preserved",
  ]);
});

test("accepted provenance fixtures are exact and not source rewrites", () => {
  assert.deepEqual(provenance.accepted_merge_provenance, {
    pr53: {
      marker:
        "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
      commit: "03516fa6deeea91a7dccbcb35c17907e3e113da8",
    },
    pr56: {
      marker: "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55",
      commit: "7c6917c8f43b0cf1febc5fc95c682203e18d01d3",
    },
    pr57: {
      marker:
        "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55_ALIGNMENT_PROOF",
      commit: "aae85a902b255c4405f9e0eb93a9487bc7e0b754",
    },
    pr58: {
      marker:
        "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_SCAFFOLD_AFTER_PR57",
      commit: "1702b1d8434ec71b8c8b4f508c46dfd70ecafd27",
    },
    pr59: {
      marker:
        "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR58",
      commit: "350960b4350f9bb27317e21c5fc159bada80803e",
    },
  });
  assertIncludesAll(provenance.rules.join("\n"), [
    "merge markers are not claimed as pre-merge source-file text",
    "historical source evidence is not rewritten",
    "inferred classifications are not literal historical source evidence",
  ]);
});

test("canonical no-content profile is exact and future-only", () => {
  assert.equal(noContentProfile.future_specification_material_only, true);
  assert.equal(noContentProfile.current_runtime_event_schema, false);
  assert.deepEqual(
    noContentProfile.allowed_future_event_content_categories,
    expectedAllowedCategories,
  );
  assert.deepEqual(
    noContentProfile.prohibited_event_log_content,
    expectedProhibitedCategories,
  );
  assertIncludesAll(evidence.noContentTaxonomy, [
    "noContentAuditAccessImplementationBoundary",
    "access_logging_implemented: false",
    "log_schema_or_storage_created: false",
  ]);
  assertIncludesAll(evidence.noContentTaxonomyTest, [
    "audit/access event taxonomy exposes category-only families",
    "taxonomy does not imply audit/access-log implementation or audit proof",
  ]);
});

test("readiness matrix has exact 17 IDs, blocker mapping, surfaces, and field shape", () => {
  assert.equal(rows.length, 17);
  assert.deepEqual(
    rows.map((row) => row.readiness_id),
    Array.from({ length: 17 }, (_, index) =>
      `AAL-IRSR-${String(index + 1).padStart(3, "0")}`,
    ),
  );
  assert.deepEqual(
    rows.map((row) => row.source_blocker_id),
    Array.from({ length: 17 }, (_, index) =>
      `AAL-RUNTIME-BLOCKER-${String(index + 1).padStart(3, "0")}`,
    ),
  );
  assert.deepEqual(
    rows.map((row) => row.surface),
    expectedSurfaces,
  );

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), expectedFields, row.readiness_id);
  }
});

test("actor, role, permission, and admin/support dependencies use tracked labels", () => {
  assertIncludesAll(evidence.rbacScope, [
    "human professional reviewer",
    "repo/operator maintainer",
    "support/admin actor",
    "workflow automation agent",
    "system/service actor",
    "external reviewer or auditor",
    "third-party/provider actor",
    "admin/support access explicitly included",
  ]);
  assertIncludesAll(evidence.rbacRegistry, [
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY",
    "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
    "NOT_ADMIN_SUPPORT_AUTHORIZATION",
  ]);
  assertIncludesAll(evidence.adminSupportScope, [
    "admin/support is not an implicit superuser",
    "support identity does not permit self-approval",
    "break-glass access is not authorized or implemented",
    "impersonation is not authorized or implemented",
  ]);
  assertIncludesAll(evidence.adminSupportRegistry, [
    "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY",
    "ASAM-AP-001",
    "ASAM-BR-018",
    "sourceProvenanceSeparated",
  ]);

  for (const row of rows) {
    assert.equal(
      trackedActors.includes(row.actor_context_dependency),
      true,
      row.readiness_id,
    );
    assert.equal(
      trackedRoles.includes(row.role_permission_dependency),
      true,
      row.readiness_id,
    );
  }
});

test("all blocker statuses remain open and closure criteria are future-only", () => {
  for (const row of rows) {
    assertIncludesAll(row.blocker_status, requiredOpenBlockers);
    assert.match(row.closure_criteria, /^future /i, row.readiness_id);
    assert.match(
      row.remains_non_authorized_until_closure,
      /implementation|authorization|logging|external-use|approval|closure|runtime|registry|dispatch|routing|candidate|sign-off|conclusions|viewer|schema|storage|gate|packet|evidence/,
      row.readiness_id,
    );
  }
});

test("cross-dependency coverage is explicit without implementation claims", () => {
  assertIncludesAll(evidence.review, [
    "user/reviewer actors",
    "service/system actors",
    "admin actors",
    "support actors",
    "human/professional reviewers",
    "unknown or unauthenticated actor posture",
    "role/permission dependency",
    "tenant dependency",
    "case dependency",
    "object/function/property correlation dependency",
    "wrong-tenant attempt",
    "wrong-case attempt",
    "wrong-object/function/property attempt",
    "self-grant risk",
    "self-approval risk",
    "impersonation risk",
    "break-glass risk",
    "admin/support bypass risk",
    "third-party/provider deny-by-default",
    "log-viewer access control",
    "privileged log-viewer access control",
    "retention/deletion of logs",
    "tamper-evidence/integrity gap",
    "contestability/correction dependency",
    "None of those controls are implemented by this review.",
  ]);
});

test("gap summary and non-authorizations are explicit", () => {
  assertIncludesAll(evidence.review, [
    "audit/access-log implementation",
    "audit logging",
    "access logging",
    "event taxonomy runtime code",
    "event emitters",
    "log schema",
    "log storage",
    "log integrity/tamper evidence",
    "log-viewer access control",
    "privileged log-viewer access control",
    "retention/deletion/purge of logs",
    "RBAC role/permission model",
    "admin/support access model",
    "raw-material routing implementation",
    "third-party/provider routing authorization",
    "runtime gates",
    "validator dispatch",
    "executable/runtime registry lookup",
    "global authorization model",
    "incident response and monitoring",
    "contestability/correction support",
  ]);
  assertIncludesAll(evidence.review, [
    "This document creates no:",
    "implementation",
    "audit middleware",
    "access middleware",
    "database table",
    "registry lookup",
    "validator dispatch",
    "security finding",
    "blocker closure",
    "external-use authorization",
    "runtime certification",
    "AI Act compliance claim",
  ]);
});

test("no positive implementation, logging, route, approval, or authorization claim exists", () => {
  const forbiddenPositivePatterns = [
    /implemented\s*:\s*true\b/i,
    /authorized\s*:\s*true\b/i,
    /allowed\s*:\s*true\b/i,
    /approved\s*:\s*true\b/i,
    /enforcementActive\s*:\s*true\b/,
    /blockerClosed\s*:\s*true\b/,
    /\bruntime enforcement active\b/i,
    /\baudit logging implemented\b/i,
    /\baccess logging implemented\b/i,
    /\bevent emitter created\b/i,
    /\blog schema created\b/i,
    /\blog storage created\b/i,
    /\bblocker closed\b/i,
    /\brelease approved\b/i,
    /\bexternal-use ready\b/i,
    /\bruntime certification created\b/i,
  ];

  for (const pattern of forbiddenPositivePatterns) {
    assert.doesNotMatch(evidence.review, pattern);
  }
});
