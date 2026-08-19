"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

const paths = Object.freeze({
  review: "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59_v1.md",
  focusedTest: "tests/domain-audit-access-log-implementation-readiness-scope-review-after-pr59.test.js",
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
  feasibility: "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY_v1.md",
  controlSpec: "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
  gapInventory: "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY_AFTER_PR37_v1.md",
  blockerAnalysis: "docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_RUNTIME_READINESS_BLOCKER_ANALYSIS_BOUNDARY_v1.md",
  noContentTaxonomy: "packages/governance/src/no-content-audit-access-event-taxonomy.js",
  noContentTaxonomyTest: "tests/no-content-audit-access-event-taxonomy.test.js",
  rbacScope: "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_v1.md",
  rbacRegistry: "packages/governance/src/rbac-role-permission-model-scope-review-registry.js",
  adminSupportScope: "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55_v1.md",
  adminSupportRegistry: "packages/governance/src/admin-support-access-model-scope-review-registry.js",
  adminSupportAlignment: "tests/admin-support-access-model-scope-review-registry-alignment.test.js",
});

const readFixed = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const evidence = Object.freeze(
  Object.fromEntries(Object.entries(paths).map(([key, value]) => [key, readFixed(value)])),
);

const assertIncludesAll = (source, values, label) => {
  for (const value of values) {
    assert.match(source, new RegExp(escapeRegExp(value)), `${label} missing ${value}`);
  }
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseJsonBlock = (source, blockName) => {
  const pattern = new RegExp(
    "`" +
      escapeRegExp(blockName) +
      "`\\n\\n" +
      "```json\\n([\\s\\S]*?)\\n```",
  );
  const match = source.match(pattern);
  assert.ok(match, `missing JSON block ${blockName}`);
  return JSON.parse(match[1]);
};

const parseDelimitedJsonBlock = (source, blockName) => {
  const pattern = new RegExp(
    "`" +
      escapeRegExp(`${blockName}_JSON_BEGIN`) +
      "`\\s*```json\\s*([\\s\\S]*?)\\s*```\\s*`" +
      escapeRegExp(`${blockName}_JSON_END`) +
      "`",
  );
  const match = source.match(pattern);
  assert.ok(match, `missing JSON block ${blockName}`);
  return JSON.parse(match[1]);
};

const reviewBlock = (blockName) => parseJsonBlock(evidence.review, blockName);

const metadata = reviewBlock("AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_METADATA");
const relationships = reviewBlock("AUDIT_ACCESS_LOG_EXISTING_EVIDENCE_RELATIONSHIPS");
const provenance = reviewBlock("AUDIT_ACCESS_LOG_SOURCE_PROVENANCE_FIXTURES");
const noContentProfile = reviewBlock("AUDIT_ACCESS_LOG_CANONICAL_NO_CONTENT_PROFILE");
const matrixBlockName = "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATRIX";
const readinessRows = reviewBlock(matrixBlockName);
const rbacScopeRows = parseDelimitedJsonBlock(evidence.rbacScope, "RBAC_SCOPE_REVIEW_ROWS");
const adminSupportAccessPaths = parseDelimitedJsonBlock(
  evidence.adminSupportScope,
  "ADMIN_SUPPORT_ACCESS_PATH_SCOPE",
);
const adminSupportBypassRisks = parseDelimitedJsonBlock(
  evidence.adminSupportScope,
  "ADMIN_SUPPORT_BYPASS_RISK_REGISTER",
);

const expectedRowIds = Object.freeze(
  Array.from({ length: 17 }, (_, index) => `AAL-IRSR-${String(index + 1).padStart(3, "0")}`),
);

const expectedBlockerIds = Object.freeze(
  Array.from(
    { length: 17 },
    (_, index) => `AAL-RUNTIME-BLOCKER-${String(index + 1).padStart(3, "0")}`,
  ),
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

const requiredRowFields = Object.freeze([
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

const expectedAllowedFutureEventContentCategories = Object.freeze([
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

const expectedProhibitedEventLogContent = Object.freeze([
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

const acceptedMergeProvenance = Object.freeze({
  pr53: Object.freeze({
    commit: "03516fa6deeea91a7dccbcb35c17907e3e113da8",
    marker: "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
  }),
  pr56: Object.freeze({
    commit: "7c6917c8f43b0cf1febc5fc95c682203e18d01d3",
    marker: "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55",
  }),
  pr57: Object.freeze({
    commit: "aae85a902b255c4405f9e0eb93a9487bc7e0b754",
    marker: "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55_ALIGNMENT_PROOF",
  }),
  pr58: Object.freeze({
    commit: "1702b1d8434ec71b8c8b4f508c46dfd70ecafd27",
    marker: "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_SCAFFOLD_AFTER_PR57",
  }),
  pr59: Object.freeze({
    commit: "350960b4350f9bb27317e21c5fc159bada80803e",
    marker: "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR58",
  }),
  pr60: Object.freeze({
    commit: "a1cd1c6ab7aebc5eae7034f71e58053ab9e41bda",
    marker: "MERGED_AS_AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59",
  }),
});

const joinedReadinessMatrix = readinessRows
  .map((row) => Object.values(row).join("\n"))
  .join("\n");

const assertAny = (items, predicate, label) => {
  assert.equal(items.some(predicate), true, label);
};

const assertReadinessMatrixMentions = (value, label) => {
  assert.match(joinedReadinessMatrix, new RegExp(escapeRegExp(value)), label);
};

const rowForSurface = (surface) => {
  const row = readinessRows.find((entry) => entry.surface === surface);
  assert.ok(row, `missing readiness row for ${surface}`);
  return row;
};

test("alignment proof keeps its own posture separate from the PR60 scope review source", () => {
  const ownPosture = Object.freeze(["TEST_ONLY", "PROVE_ONLY", "ALIGNMENT_PROOF_ONLY"]);

  assertIncludesAll(ownPosture.join("\n"), ownPosture, "own posture");

  assert.equal(metadata.review_name, "AUDIT_ACCESS_LOG_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR59");
  assert.equal(metadata.version, "v1");
  assert.equal(metadata.source_anchor, `governance/main @ ${acceptedMergeProvenance.pr59.commit}`);
  assert.equal(metadata.latest_marker, acceptedMergeProvenance.pr59.marker);
  assert.deepEqual(metadata.posture, [
    "DOCS_ONLY",
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
  ]);

  assert.deepEqual(provenance.pr53_literal_source_evidence.absent_literal_markers, [
    "TEST_ONLY",
    "ALIGNMENT_PROOF_ONLY",
  ]);
});

test("PR60 metadata directly preserves negative runtime posture and review-required posture", () => {
  const expectedMetadataValues = Object.freeze({
    sourceProvenanceSeparated: true,
    legacyEvidenceRewritten: false,
    implementationCreated: false,
    auditLoggingImplemented: false,
    accessLoggingImplemented: false,
    eventEmitterCreated: false,
    eventTaxonomyRuntimeCodeCreated: false,
    logSchemaCreated: false,
    logStorageCreated: false,
    logViewerCreated: false,
    runtimeEnforcementAuthorized: false,
    blockerClosureCreated: false,
    externalUseAuthorized: false,
    humanProfessionalReviewRequired: true,
  });

  for (const [key, value] of Object.entries(expectedMetadataValues)) {
    assert.equal(metadata[key], value, key);
  }

  assertIncludesAll(provenance.rules.join("\n"), [
    "sourceProvenanceSeparated is evidence metadata only",
    "legacyEvidenceRewritten is evidence metadata only",
  ], "metadata provenance rules");
  assert.match(evidence.review, /human\/professional-review dependency/);
  assert.doesNotMatch(
    evidence.review,
    /sourceProvenanceSeparated.+(?:access|route|enforcement|implementation|approval|closure) decision/i,
  );
  assert.doesNotMatch(
    evidence.review,
    /humanProfessionalReviewRequired.+(?:granted|completed|approved|certified)/i,
  );

  for (const key of Object.keys(expectedMetadataValues).filter(
    (metadataKey) => expectedMetadataValues[metadataKey] === false,
  )) {
    assert.doesNotMatch(
      evidence.review,
      new RegExp(`"${escapeRegExp(key)}"\\s*:\\s*true`),
      `${key} must not become a positive runtime claim`,
    );
  }
});

test("accepted merge provenance is explicit and separate from pre-merge source anchors", () => {
  assert.deepEqual(provenance.accepted_merge_provenance, {
    pr53: acceptedMergeProvenance.pr53,
    pr56: acceptedMergeProvenance.pr56,
    pr57: acceptedMergeProvenance.pr57,
    pr58: acceptedMergeProvenance.pr58,
    pr59: acceptedMergeProvenance.pr59,
  });

  assert.equal(
    JSON.stringify(provenance).includes(acceptedMergeProvenance.pr60.marker),
    false,
    "PR60 merge marker is post-merge status, not pre-merge source provenance",
  );

  assert.equal(
    evidence.focusedTest.includes(acceptedMergeProvenance.pr60.marker),
    false,
    "focused PR60 source test remains pre-merge evidence and must not claim the PR60 merge marker",
  );
});

test("focused PR60 test remains fixed-path evidence and does not scan beyond tracked sources", () => {
  const fixedPathsUsedByFocusedTest = Object.entries(paths)
    .filter(([key]) => key !== "focusedTest")
    .map(([, value]) => value);

  assertIncludesAll(evidence.focusedTest, fixedPathsUsedByFocusedTest, "focused fixed path set");
  assert.match(evidence.focusedTest, new RegExp(escapeRegExp(matrixBlockName)));
  assert.match(evidence.focusedTest, /readFileSync\(path\.join\(repoRoot, repoRelativePath\), "utf8"\)/);
});

test("existing evidence relationships stay dependency-only and non-implementing", () => {
  for (const [name, relationship] of Object.entries(relationships)) {
    assert.equal(relationship.implementation, false, `${name} must not be implementation`);
    assert.equal(relationship.enforcement, false, `${name} must not be enforcement`);
    assert.equal(relationship.approval, false, `${name} must not be approval`);
    assert.equal(relationship.closure, false, `${name} must not be closure`);
  }
});

test("canonical no-content profile aligns with taxonomy fixtures without authorizing content capture", () => {
  assert.deepEqual(noContentProfile.allowed_future_event_content_categories, [
    ...expectedAllowedFutureEventContentCategories,
  ]);
  assert.deepEqual(noContentProfile.prohibited_event_log_content, [
    ...expectedProhibitedEventLogContent,
  ]);

  assert.equal(noContentProfile.future_specification_material_only, true);
  assert.equal(noContentProfile.current_runtime_event_schema, false);

  assertIncludesAll(
    evidence.noContentTaxonomy,
    [
      "RAW_SOURCE_TEXT_CONTENT",
      "PRIVATE_FACT_CONTENT",
      "SOURCE_LOCATOR_CONTENT",
      "FILENAME_PRIVATE_PATH_CONTENT",
      "PAGE_REFERENCE_CONTENT",
      "NETWORK_OR_CREDENTIAL_CONTENT",
      "PROVIDER_INTERACTION_CONTENT",
      "PDF_IMAGE_METADATA_CONTENT",
      "DOMAIN_TRUTH_CONCLUSION_CONTENT",
    ],
    "taxonomy prohibited category",
  );
  assertIncludesAll(
    evidence.noContentTaxonomyTest,
    [
      "RAW_SOURCE_TEXT_CONTENT",
      "PRIVATE_FACT_CONTENT",
      "SOURCE_LOCATOR_CONTENT",
      "FILENAME_PRIVATE_PATH_CONTENT",
      "PAGE_REFERENCE_CONTENT",
      "NETWORK_OR_CREDENTIAL_CONTENT",
      "PROVIDER_INTERACTION_CONTENT",
      "PDF_IMAGE_METADATA_CONTENT",
      "DOMAIN_TRUTH_CONCLUSION_CONTENT",
    ],
    "taxonomy test prohibited category",
  );
});

test("readiness matrix has exact AAL-IRSR rows, surfaces, blockers, and required fields", () => {
  assert.equal(readinessRows.length, 17);
  assert.deepEqual(readinessRows.map((row) => row.readiness_id), [...expectedRowIds]);
  assert.deepEqual(readinessRows.map((row) => row.source_blocker_id), [...expectedBlockerIds]);
  assert.deepEqual(readinessRows.map((row) => row.surface), [...expectedSurfaces]);

  for (const row of readinessRows) {
    assert.deepEqual(Object.keys(row), [...requiredRowFields]);
    assert.equal(row.current_evidence_level, "SCOPE_REVIEW_ONLY");
    assert.match(row.allowed_event_content_profile, /canonical no-content profile/);
    assert.match(row.prohibited_event_content_profile, /prohibited/);
    assert.match(row.required_emitter_evidence, /^future /);
    assert.match(row.required_schema_evidence, /^future /);
    assert.match(row.required_storage_evidence, /^future /);
    assert.match(row.required_log_viewer_access_control_evidence, /^future /);
    assert.match(row.blocker_status, /AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED/);
    assert.match(row.blocker_status, /EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED/);
    assert.match(row.blocker_status, /EVENT_EMITTER_NOT_CREATED/);
    assert.match(row.blocker_status, /LOG_SCHEMA_NOT_CREATED/);
    assert.match(row.blocker_status, /LOG_STORAGE_NOT_CREATED/);
    assert.match(row.blocker_status, /NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT/);
    assert.match(row.closure_criteria, /^future /);
    assert.doesNotMatch(row.remains_non_authorized_until_closure, /approved|certified|closed/i);
  }
});

test("readiness matrix remains aligned with runtime blocker analysis anchors", () => {
  for (const row of readinessRows) {
    assert.match(
      evidence.blockerAnalysis,
      new RegExp(
        String.raw`\|\s*` +
          "`" +
          escapeRegExp(row.source_blocker_id) +
          "`" +
          String.raw`\s*\|\s*` +
          escapeRegExp(row.surface) +
          String.raw`\s*\|`,
      ),
      `missing blocker-analysis row for ${row.source_blocker_id}`,
    );
  }

  assert.match(
    evidence.review,
    /third-party route denial\/approval event` is a historical surface label only/,
  );
  assert.doesNotMatch(evidence.review, /current route approval created|provider authorization created/);
});

test("RBAC and admin-support dependencies remain open dependencies, not access grants", () => {
  assertIncludesAll(evidence.rbacScope, [
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
    "NOT_ADMIN_SUPPORT_AUTHORIZATION",
    "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
  ], "RBAC scope review");

  assertIncludesAll(evidence.rbacRegistry, [
    "RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51",
    "ROLE_PERMISSION_MODEL_NOT_IMPLEMENTED",
    "NOT_AUTHORIZED",
  ], "RBAC scope registry");

  assertIncludesAll(evidence.adminSupportScope, [
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
    "ADMIN_SUPPORT_ACCESS_PATH_SCOPE",
    "ADMIN_SUPPORT_BYPASS_RISK_REGISTER",
  ], "admin support scope review");

  assertIncludesAll(evidence.adminSupportRegistry, [
    "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55",
    "NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "NOT_AUTHORIZED",
  ], "admin support registry");

  assertIncludesAll(evidence.adminSupportAlignment, [
    acceptedMergeProvenance.pr53.commit,
    acceptedMergeProvenance.pr53.marker,
    "PR53 legacy literal source posture",
  ], "admin support alignment source provenance");

  for (const row of readinessRows) {
    assert.match(row.role_permission_dependency, /.+/);
    assert.match(row.implementation_gap, /absent|implementation/i);
    assert.match(row.required_log_viewer_access_control_evidence, /future /);
  }
});

test("RBAC/admin-support dependency coverage cross-checks actual rows against PR60 matrix", () => {
  const reviewAccess = rowForSurface("review access event");
  const privilegedAccess = rowForSurface("admin/support access attempt event");
  const runtimeGate = rowForSurface("runtime/schema/workflow gate candidate event");
  const professionalReview = rowForSurface("human/professional review access event");
  const logViewer = rowForSurface("audit/log viewer access event");
  const privilegedLogViewer = rowForSurface("admin/support privileged log access event");

  assertAny(
    rbacScopeRows,
    (row) => row.actorType === "human professional reviewer" && row.roleCategory === "professional reviewer",
    "RBAC source covers human professional reviewer actor",
  );
  assertAny(
    rbacScopeRows,
    (row) => row.actorType === "system/service actor" && row.currentEvidenceLevel === "UNKNOWN_NOT_EVIDENCED",
    "RBAC source covers unknown service actor posture",
  );
  assertAny(
    rbacScopeRows,
    (row) => row.actorType === "workflow automation agent" && row.roleCategory === "automation/service",
    "RBAC source covers workflow automation actor",
  );
  assertAny(
    rbacScopeRows,
    (row) => row.actorType === "support/admin actor" && row.roleCategory === "admin/support",
    "RBAC source covers support/admin actor",
  );
  assertAny(
    rbacScopeRows,
    (row) => row.actorType === "external reviewer or auditor" && row.roleCategory === "external auditor",
    "RBAC source covers external auditor actor",
  );
  assertAny(
    rbacScopeRows,
    (row) => row.thirdPartyRoutingConstraint === "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "RBAC source keeps provider routing deny-by-default",
  );
  assertAny(
    adminSupportAccessPaths,
    (row) => row.category === "Break-glass or emergency access" && row.currentAuthorization === "UNKNOWN_NOT_EVIDENCED",
    "admin/support source covers unknown break-glass posture",
  );
  assertAny(
    adminSupportAccessPaths,
    (row) => row.category === "Cross-tenant access" && row.currentAuthorization === "NOT_AUTHORIZED",
    "admin/support source covers cross-tenant denial",
  );
  assertAny(
    adminSupportAccessPaths,
    (row) => row.category === "Cross-case access" && row.currentAuthorization === "NOT_AUTHORIZED",
    "admin/support source covers cross-case denial",
  );
  assertAny(
    adminSupportAccessPaths,
    (row) => row.category === "Cross-object/function/property access" && row.currentAuthorization === "NOT_AUTHORIZED",
    "admin/support source covers object/function/property denial",
  );
  assertAny(
    adminSupportAccessPaths,
    (row) => row.category === "Audit/access-log viewing access" && row.currentAuthorization === "NOT_AUTHORIZED",
    "admin/support source covers audit/access-log viewer denial",
  );

  for (const risk of [
    "self-granted permission",
    "self-approval",
    "impersonation/session takeover",
    "emergency or break-glass misuse",
    "audit-log access bypass",
    "human-review bypass",
    "object/function/property scope bypass",
    "tenant/case switching",
  ]) {
    assertAny(
      adminSupportBypassRisks,
      (row) => row.risk === risk && row.blockerStatus === "NOT_AUTHORIZED",
      `admin/support source covers ${risk}`,
    );
  }

  assert.match(reviewAccess.actor_context_dependency, /human professional reviewer/);
  assert.match(reviewAccess.scope_correlation_dependency, /tenant\/case\/object\/function\/property/);
  assert.match(reviewAccess.required_test_evidence, /wrong-tenant/);
  assert.match(reviewAccess.required_test_evidence, /wrong-case/);
  assert.match(reviewAccess.required_test_evidence, /wrong-object\/function\/property/);
  assert.match(privilegedAccess.actor_context_dependency, /support\/admin actor/);
  assert.match(privilegedAccess.role_permission_dependency, /admin\/support/);
  assert.match(privilegedAccess.scope_correlation_dependency, /tenant\/case\/object\/function\/property/);
  assert.match(privilegedAccess.required_log_viewer_access_control_evidence, /privileged log-viewer access-control/);
  assert.match(privilegedAccess.required_test_evidence, /self-grant/);
  assert.match(privilegedAccess.required_test_evidence, /self-approval/);
  assert.match(privilegedAccess.required_test_evidence, /impersonation/);
  assert.match(privilegedAccess.required_test_evidence, /break-glass/);
  assert.match(privilegedAccess.required_test_evidence, /bypass-prevention/);
  assert.match(runtimeGate.actor_context_dependency, /system\/service actor/);
  assert.match(runtimeGate.required_test_evidence, /no-registry-lookup/);
  assert.match(runtimeGate.required_test_evidence, /no-validator-dispatch/);
  assert.match(professionalReview.actor_context_dependency, /human professional reviewer/);
  assert.match(professionalReview.required_test_evidence, /no-approval/);
  assert.match(professionalReview.required_test_evidence, /no-signoff/);
  assert.match(logViewer.actor_context_dependency, /external reviewer or auditor/);
  assert.match(logViewer.required_log_viewer_access_control_evidence, /wrong-scope denial/);
  assert.match(privilegedLogViewer.actor_context_dependency, /support\/admin actor/);
  assert.match(privilegedLogViewer.required_log_viewer_access_control_evidence, /admin\/support bypass-prevention/);
  assert.match(privilegedLogViewer.required_test_evidence, /self-grant/);
  assert.match(privilegedLogViewer.required_test_evidence, /self-approval/);
  assert.match(privilegedLogViewer.required_test_evidence, /impersonation/);
  assert.match(privilegedLogViewer.required_test_evidence, /break-glass/);

  for (const term of [
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
    "log-viewer access control",
    "privileged log-viewer access control",
    "human/professional-review dependency",
  ]) {
    assertIncludesAll(evidence.review, [term], "PR60 cross-dependency coverage");
  }

  for (const term of [
    "tenant/case scope",
    "object/function/property",
    "wrong-tenant",
    "wrong-case",
    "wrong-object/function/property",
    "self-grant",
    "self-approval",
    "impersonation",
    "break-glass",
    "bypass-prevention",
    "log-viewer access-control",
    "privileged log-viewer",
    "no-registry-lookup",
    "no-validator-dispatch",
  ]) {
    assertReadinessMatrixMentions(term, `PR60 readiness matrix must mention ${term}`);
  }

  for (const row of readinessRows) {
    assert.match(row.current_evidence_level, /SCOPE_REVIEW_ONLY/);
    assert.match(row.closure_criteria, /^future /);
    assert.match(row.blocker_status, /NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT/);
    assert.doesNotMatch(row.required_test_evidence, /implemented|granted|approved|closed/i);
  }
});

test("every readiness row preserves open blockers and future-only non-authorization", () => {
  const reviewText = evidence.review;

  assertIncludesAll(reviewText, [
    "It creates no runtime logging, persistence, authorization, enforcement, event taxonomy runtime code, emitter, schema, storage, viewer, middleware, current logging behavior, or blocker closure.",
    "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    "AUDIT_LOGGING_NOT_IMPLEMENTED",
    "ACCESS_LOGGING_NOT_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED",
    "EVENT_EMITTER_NOT_CREATED",
    "LOG_SCHEMA_NOT_CREATED",
    "LOG_STORAGE_NOT_CREATED",
    "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
    "release approval",
    "external-use authorization",
    "product candidate",
    "technical sign-off",
    "runtime certification",
  ], "review non-authorization text");

  for (const row of readinessRows) {
    assert.match(row.blocker_status, /NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT/);
    assert.match(row.closure_criteria, /^future independently verified/);
    assert.match(row.remains_non_authorized_until_closure, /external-use|product candidate|blocker closure|runtime|implementation|approval|admin\/support|logging|schema|storage|routing|delivery|metadata acquisition|source inspection|real private run|technical sign-off|runtime certification|local logs|CI evidence|packet components|generated artifacts|release evidence/i);
  }
});

test("wiki remains orientation-only and cannot override live tracked evidence", () => {
  assertIncludesAll(evidence.wikiIndex, [
    "This wiki is a tracked repo orientation and coordination layer.",
    "It is not the primary source of truth for implementation, tests, PR status, CI",
    "Live git state, tracked",
    "GitHub PR metadata, and verified CI metadata win over wiki text.",
  ], "wiki index source hierarchy");

  assertIncludesAll(evidence.wikiLog, [
    "Chat is advisory only and is not a source of truth.",
    "does not create governance proof, implementation, readiness, approval",
  ], "wiki log boundary");
});

test("alignment proof text does not create positive implementation, approval, or closure claims", () => {
  const thisFile = fs.readFileSync(__filename, "utf8");

  assert.doesNotMatch(thisFile, /\bcanAccess\b/);
  assert.doesNotMatch(thisFile, /\bpermissionGranted\b/);
  assert.doesNotMatch(thisFile, /\bruntimeEnforced\b/);
  assert.doesNotMatch(thisFile, /\btechnicalSignoff\b/);
  assert.doesNotMatch(thisFile, /\bruntimeCertification\b/);
  assert.doesNotMatch(thisFile, /\bexternalUseApproved\b/);
  assert.doesNotMatch(thisFile, /\bproductCandidateSelected\b/);
  assert.doesNotMatch(thisFile, /\bsecurityFinding\b/);
  assert.doesNotMatch(thisFile, /\bseverity\b\s*:\s*true/);
  assert.doesNotMatch(thisFile, /\bremediation\b\s*:\s*true/);
  assert.doesNotMatch(thisFile, /\bimplemented\b\s*:\s*true/);
  assert.doesNotMatch(thisFile, /\bblocker closed\b/i);
});
