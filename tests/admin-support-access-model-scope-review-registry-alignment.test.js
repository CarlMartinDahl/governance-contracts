"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const registry =
  require("../packages/governance/src/admin-support-access-model-scope-review-registry.js");
const index = require("../packages/governance/src/index.js");

const repoRoot = path.resolve(__dirname, "..");
const readFixed = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const paths = Object.freeze({
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
  pr53LegacyAlignment:
    "tests/domain-rbac-role-permission-model-scope-review-after-pr51-alignment.test.js",
  pr55RegistryAlignment:
    "tests/rbac-role-permission-model-scope-review-registry-alignment.test.js",
  pr56Review:
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55_v1.md",
  pr56FocusedTest:
    "tests/domain-admin-support-access-model-scope-review-after-pr55.test.js",
  pr57Alignment:
    "tests/domain-admin-support-access-model-scope-review-after-pr55-alignment.test.js",
  pr58FocusedTest:
    "tests/admin-support-access-model-scope-review-registry.test.js",
});

const evidence = Object.fromEntries(
  Object.entries(paths).map(([key, value]) => [key, readFixed(value)]),
);

const testPosture = Object.freeze([
  "TEST_ONLY",
  "PROVE_ONLY",
  "ALIGNMENT_PROOF_ONLY",
]);

const acceptedMergeProvenance = Object.freeze({
  pr53Alignment: Object.freeze({
    marker:
      "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
    commit: "03516fa6deeea91a7dccbcb35c17907e3e113da8",
  }),
  pr56ScopeReview: Object.freeze({
    marker:
      "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55",
    commit: "7c6917c8f43b0cf1febc5fc95c682203e18d01d3",
  }),
  pr57AlignmentProof: Object.freeze({
    marker:
      "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55_ALIGNMENT_PROOF",
    commit: "aae85a902b255c4405f9e0eb93a9487bc7e0b754",
  }),
  pr58RegistryScaffold: Object.freeze({
    marker:
      "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_SCAFFOLD_AFTER_PR57",
    commit: "1702b1d8434ec71b8c8b4f508c46dfd70ecafd27",
  }),
});

const expectedExports = Object.freeze([
  "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE",
  "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCESS_PATH_ROWS",
  "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ALLOWED_EVIDENCE_LABELS",
  "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_BYPASS_RISK_ROWS",
  "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS",
  "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_NON_AUTHORIZATION_FLAGS",
  "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_NAME",
  "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_POSTURE",
  "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_VERSION",
  "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_SOURCE_EVIDENCE",
  "getAdminSupportAccessModelScopeReviewRegistrySummary",
  "listAdminSupportAccessModelScopeReviewAccessPathRows",
  "listAdminSupportAccessModelScopeReviewBypassRiskRows",
]);

const helperExports = Object.freeze([
  "getAdminSupportAccessModelScopeReviewRegistrySummary",
  "listAdminSupportAccessModelScopeReviewAccessPathRows",
  "listAdminSupportAccessModelScopeReviewBypassRiskRows",
]);

const expectedAllowedEvidenceLabels = Object.freeze([
  "DOCS_ONLY",
  "TEST_ONLY",
  "PROVE_ONLY",
  "SCOPE_REVIEW_ONLY",
  "ALIGNMENT_PROOF_ONLY",
  "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
  "UNKNOWN_NOT_EVIDENCED",
  "NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
]);

const expectedForbiddenPositiveLabels = Object.freeze([
  "RUNTIME_ENFORCED",
  "RBAC_ENFORCED",
  "ACCESS_CONTROL_ENFORCED",
  "ADMIN_SUPPORT_AUTHORIZED",
  "IMPLICIT_SUPERUSER_AUTHORIZED",
  "BREAK_GLASS_AUTHORIZED",
  "IMPERSONATION_AUTHORIZED",
  "ROLE_SCHEMA_CREATED",
  "PERMISSION_SCHEMA_CREATED",
  "TECHNICAL_SIGNED_OFF",
  "RELEASE_APPROVED",
  "EXTERNAL_USE_READY",
  "AI_ACT_COMPLIANT",
  "COURT_READY",
  "HIGH_RISK_APPROVED",
]);

const accessPathIds = Object.freeze(
  Array.from({ length: 20 }, (_, index) =>
    `ASAM-AP-${String(index + 1).padStart(3, "0")}`,
  ),
);

const bypassRiskIds = Object.freeze(
  Array.from({ length: 18 }, (_, index) =>
    `ASAM-BR-${String(index + 1).padStart(3, "0")}`,
  ),
);

const accessPathFields = Object.freeze([
  "registry_id",
  "row_type",
  "category",
  "posture",
  "currentAuthorization",
  "materialPosture",
]);

const bypassRiskFields = Object.freeze([
  "registry_id",
  "row_type",
  "risk",
  "currentEvidenceLevel",
  "currentNonAuthorization",
  "dependency",
  "requiredFutureImplementationEvidence",
  "requiredFutureTestEvidence",
  "blockerStatus",
  "futureOnlyClosureCriterion",
]);

const allowedAccessPathPostures = Object.freeze([
  "deny-by-default",
  "narrow future review-support candidate",
  "not authorized",
  "separately gated future dependency",
  "unknown/not evidenced",
]);

const operationalHelperNamePattern =
  /\b(lookup|getById|findById|resolve|dispatch|authorize|authorise|enforce|grant|permit|canAccess|allowAccess|approve|validateActor|checkPermission|decideAccess)\b/i;

const forbiddenInputTerms = Object.freeze([
  "actor",
  "role",
  "permission",
  "tenant",
  "case",
  "object",
  "route",
  "payload",
  "authorization",
]);

const nonAuthorizationFlagKeys = Object.freeze([
  "implementation_created",
  "runtime_behavior_changed",
  "rbac_implemented",
  "access_control_implemented",
  "admin_support_implemented",
  "admin_support_access_authorized",
  "implicit_superuser_authorized",
  "break_glass_authorized",
  "impersonation_authorized",
  "audit_access_log_implemented",
  "retention_deletion_encryption_implemented",
  "raw_material_routing_implemented",
  "third_party_provider_routing_authorized",
  "runtime_gate_created",
  "validator_dispatch_created",
  "runtime_registry_lookup_created",
  "blocker_closure_created",
  "security_finding_created",
  "vulnerability_finding_created",
  "severity_assigned",
  "remediation_recommended",
  "release_approved",
  "external_use_authorized",
  "product_candidate_selected",
  "technical_signoff_created",
  "runtime_certification_created",
  "domain_conclusion_created",
]);

const assertIncludesAll = (actual, expected) => {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
};

const parseJsonBlock = (markdown, blockName) => {
  const pattern = new RegExp(
    `\`${blockName}_JSON_BEGIN\`\\s*\`\`\`json\\s*([\\s\\S]*?)\\s*\`\`\`\\s*\`${blockName}_JSON_END\``,
  );
  const match = markdown.match(pattern);
  assert.ok(match, `${blockName} JSON block exists`);
  return JSON.parse(match[1]);
};

const stripRegistryFields = ({ registry_id, row_type, ...row }) => row;

const assertUnique = (values, label) => {
  assert.equal(new Set(values).size, values.length, label);
};

const sourceAccessPaths = parseJsonBlock(
  evidence.pr56Review,
  "ADMIN_SUPPORT_ACCESS_PATH_SCOPE",
);
const sourceBypassRisks = parseJsonBlock(
  evidence.pr56Review,
  "ADMIN_SUPPORT_BYPASS_RISK_REGISTER",
);

const accessPathRows =
  registry.listAdminSupportAccessModelScopeReviewAccessPathRows();
const bypassRiskRows =
  registry.listAdminSupportAccessModelScopeReviewBypassRiskRows();
const summary =
  registry.getAdminSupportAccessModelScopeReviewRegistrySummary();

test("own posture is test-only prove-only alignment-proof evidence", () => {
  assert.deepEqual(testPosture, [
    "TEST_ONLY",
    "PROVE_ONLY",
    "ALIGNMENT_PROOF_ONLY",
  ]);
  assert.equal(summary.nonAuthorizationFlags.implementation_created, false);
  assert.equal(summary.nonAuthorizationFlags.runtime_behavior_changed, false);
});

test("wiki process remains orientation only and does not make repo decisions", () => {
  assertIncludesAll(evidence.wikiIndex, [
    "This wiki is a tracked repo orientation and coordination layer.",
    "It is not the primary source of truth",
    "Live git state, tracked",
    "GitHub PR metadata, and verified CI metadata win over wiki text.",
    "Chat, pasted summaries, private notes, uploaded conversation material, and",
    "non-repo files are advisory only.",
    "Future wiki updates must re-read both files before editing them.",
    "Future wiki updates must be docs-only slices.",
  ]);
  assertIncludesAll(evidence.wikiLog, [
    "Chat is advisory only and is not a source of truth.",
    "does not create governance proof, implementation, readiness, approval",
  ]);
});

test("registry identity and package index expose the same static surface", () => {
  assert.equal(
    registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_NAME,
    "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY",
  );
  assert.equal(
    registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_VERSION,
    "v1",
  );
  assertIncludesAll(summary.posture, [
    "PROVE_ONLY",
    "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
  ]);

  for (const exportName of expectedExports) {
    assert.equal(Object.hasOwn(registry, exportName), true, exportName);
    assert.equal(Object.hasOwn(index, exportName), true, exportName);
    assert.strictEqual(index[exportName], registry[exportName], exportName);
  }
});

test("PR53 legacy literal source posture and separate provenance are preserved", () => {
  assertIncludesAll(evidence.pr53LegacyAlignment, [
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
    "alignment conclusion remains prove-only and blocker-open",
    "no\\nimplementation",
    "RBAC enforcement",
    "access-control enforcement",
    "blocker closure",
  ]);
  assert.equal(evidence.pr53LegacyAlignment.includes("TEST_ONLY"), false);
  assert.equal(
    evidence.pr53LegacyAlignment.includes("ALIGNMENT_PROOF_ONLY"),
    false,
  );
  assert.deepEqual(
    summary.sourceEvidence.pr53LegacyAlignment.literalMarkers,
    ["PROVE_ONLY", "SCOPE_REVIEW_ONLY"],
  );
  assert.deepEqual(
    summary.sourceEvidence.pr53LegacyAlignment.absentLiteralMarkers,
    ["TEST_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
  assert.deepEqual(summary.sourceEvidence.pr53LegacyAlignment.boundaries, [
    "no implementation",
    "no enforcement",
    "no blocker closure",
  ]);
  assert.deepEqual(
    summary.acceptedMergeProvenance.pr53Alignment,
    {
      mergeMarker: acceptedMergeProvenance.pr53Alignment.marker,
      mergeCommit: acceptedMergeProvenance.pr53Alignment.commit,
    },
  );
});

test("PR55 source posture and registry metadata remain aligned", () => {
  assertIncludesAll(evidence.pr55RegistryAlignment, [
    "TEST_ONLY",
    "PROVE_ONLY",
    "ALIGNMENT_PROOF_ONLY",
    "exports registry surface through module and package index",
    "summary helper authorizes nothing and leaves blockers future-only",
  ]);
  assert.deepEqual(
    summary.sourceEvidence.pr55RegistryAlignment.literalMarkers,
    ["TEST_ONLY", "PROVE_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
});

test("PR56 source review and PR57 alignment remain consistent with the registry", () => {
  assert.match(
    evidence.pr56Review,
    /^# Admin\/Support Access Model Scope Review After PR55/m,
  );
  assertIncludesAll(evidence.pr56Review, [
    "DOCS_ONLY",
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
    "Source anchor: `governance/main @ f8ccf0434659de424a3d460ed26998e0b3472484`",
    "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR54",
    "admin/support is not an implicit superuser",
    "support access to raw/private/source material is not authorized",
    "support access across tenant/case/object/function/property boundaries is not authorized",
    "role escalation and self-grant are not authorized or implemented",
    "support identity does not permit self-approval",
    "break-glass access is not authorized or implemented",
    "impersonation is not authorized or implemented",
    "human/professional review cannot be replaced by admin/support",
    "This dependency is not audit/access-log implementation.",
    "Retention/deletion requires request/execute/verify separation.",
    "Raw-material routing remains a prerequisite for material visibility.",
    "Third-party/provider routing remains deny-by-default.",
  ]);
  assertIncludesAll(evidence.pr56FocusedTest, [
    "admin/support scope review has exact identity and source anchor",
    "access-path categories are exact and do not create present authorization",
    "bypass-risk register is exact and future-only",
  ]);
  assertIncludesAll(evidence.pr57Alignment, [
    "TEST_ONLY",
    "PROVE_ONLY",
    "ALIGNMENT_PROOF_ONLY",
    "PR56 accepted post-merge provenance marker",
    "PR56 post-merge marker is not pre-merge document source text",
    "PR56 post-merge marker is not pre-merge focused-test source text",
    "All closure criteria remain future-only.",
  ]);
  assert.deepEqual(
    summary.sourceEvidence.pr57AlignmentProof.literalMarkers,
    ["TEST_ONLY", "PROVE_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
  assert.deepEqual(
    summary.acceptedMergeProvenance.pr56ScopeReview,
    {
      mergeMarker: acceptedMergeProvenance.pr56ScopeReview.marker,
      mergeCommit: acceptedMergeProvenance.pr56ScopeReview.commit,
    },
  );
  assert.deepEqual(
    summary.acceptedMergeProvenance.pr57AlignmentProof,
    {
      mergeMarker: acceptedMergeProvenance.pr57AlignmentProof.marker,
      mergeCommit: acceptedMergeProvenance.pr57AlignmentProof.commit,
    },
  );
});

test("PR58 focused registry proof aligns with metadata and provenance boundaries", () => {
  assertIncludesAll(evidence.pr58FocusedTest, [
    "exports admin/support scope-review registry surface through module and index",
    "registry identity is static scaffold and source provenance stays separated",
    "accepted merge provenance is explicit and not rewritten into source docs",
    "access-path rows exactly mirror PR56 JSON scope evidence",
    "bypass-risk rows exactly mirror PR56 JSON scope evidence",
    "summary stays counts and evidence posture, not a decision helper",
  ]);
  assert.equal(summary.sourceProvenanceSeparated, true);
  assert.equal(summary.legacyEvidenceRewritten, false);
  assert.deepEqual(acceptedMergeProvenance.pr58RegistryScaffold, {
    marker:
      "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_SCAFFOLD_AFTER_PR57",
    commit: "1702b1d8434ec71b8c8b4f508c46dfd70ecafd27",
  });
  assert.equal(
    Object.values(summary.sourceEvidence).some((entry) =>
      JSON.stringify(entry).includes(acceptedMergeProvenance.pr58RegistryScaffold.marker),
    ),
    false,
    "PR58 merge provenance is not literal pre-merge source metadata",
  );
  assert.equal(
    Object.values(summary.acceptedMergeProvenance).some((entry) =>
      entry.mergeMarker === acceptedMergeProvenance.pr58RegistryScaffold.marker,
    ),
    false,
    "PR58 accepted merge marker is kept in this alignment fixture only",
  );
});

test("access-path rows keep exact IDs, order, fields, taxonomy, and non-access posture", () => {
  assert.equal(accessPathRows.length, 20);
  assert.deepEqual(
    accessPathRows.map((row) => row.registry_id),
    accessPathIds,
  );
  assertUnique(
    accessPathRows.map((row) => row.registry_id),
    "access path IDs are unique",
  );
  assert.deepEqual(
    accessPathRows.map((row) => stripRegistryFields(row)),
    sourceAccessPaths,
  );

  for (const row of accessPathRows) {
    assert.deepEqual(Object.keys(row), accessPathFields, row.registry_id);
    assert.equal(row.row_type, "ACCESS_PATH_SCOPE", row.registry_id);
    assert.equal(
      allowedAccessPathPostures.includes(row.posture),
      true,
      row.registry_id,
    );
    assert.ok(
      ["NOT_AUTHORIZED", "UNKNOWN_NOT_EVIDENCED"].includes(
        row.currentAuthorization,
      ),
      row.registry_id,
    );
  }
});

test("bypass-risk rows keep exact IDs, order, fields, future evidence, and open blockers", () => {
  assert.equal(bypassRiskRows.length, 18);
  assert.deepEqual(
    bypassRiskRows.map((row) => row.registry_id),
    bypassRiskIds,
  );
  assertUnique(
    bypassRiskRows.map((row) => row.registry_id),
    "bypass risk IDs are unique",
  );
  assert.deepEqual(
    bypassRiskRows.map((row) => stripRegistryFields(row)),
    sourceBypassRisks,
  );

  for (const row of bypassRiskRows) {
    assert.deepEqual(Object.keys(row), bypassRiskFields, row.registry_id);
    assert.equal(row.row_type, "BYPASS_RISK", row.registry_id);
    assert.match(row.currentNonAuthorization, /not|cannot|absent/i);
    assert.match(row.requiredFutureImplementationEvidence, /future/i);
    assert.match(row.requiredFutureTestEvidence, /future/i);
    assert.equal(row.blockerStatus, "NOT_AUTHORIZED");
    assert.match(row.futureOnlyClosureCriterion, /future|cannot be closed/i);
  }
});

test("evidence labels and helper surface remain fixture-only and non-operational", () => {
  assert.deepEqual(
    registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ALLOWED_EVIDENCE_LABELS,
    expectedAllowedEvidenceLabels,
  );
  assert.deepEqual(
    registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS,
    expectedForbiddenPositiveLabels,
  );
  assert.deepEqual(summary.allowedEvidenceLabels, expectedAllowedEvidenceLabels);
  assert.deepEqual(summary.forbiddenPositiveLabels, expectedForbiddenPositiveLabels);

  for (const row of [...accessPathRows, ...bypassRiskRows]) {
    assert.equal(
      expectedForbiddenPositiveLabels.includes(row.currentEvidenceLevel),
      false,
      row.registry_id,
    );
    assert.equal(
      expectedForbiddenPositiveLabels.includes(row.currentAuthorization),
      false,
      row.registry_id,
    );
  }

  assert.deepEqual(helperExports, [
    "getAdminSupportAccessModelScopeReviewRegistrySummary",
    "listAdminSupportAccessModelScopeReviewAccessPathRows",
    "listAdminSupportAccessModelScopeReviewBypassRiskRows",
  ]);
  for (const exportName of Object.keys(registry)) {
    if (!helperExports.includes(exportName)) {
      assert.doesNotMatch(exportName, operationalHelperNamePattern);
    }
  }
  for (const helperName of helperExports) {
    assert.equal(registry[helperName].length, 0, helperName);
    for (const forbiddenInputTerm of forbiddenInputTerms) {
      assert.equal(helperName.toLowerCase().includes(forbiddenInputTerm), false);
    }
  }
});

test("summary helper reports counts and evidence metadata without access decisions", () => {
  assert.equal(summary.registryName, "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY");
  assert.equal(summary.registryVersion, "v1");
  assert.equal(summary.accessPathCount, 20);
  assert.equal(summary.bypassRiskCount, 18);
  assert.equal(summary.sourceProvenanceSeparated, true);
  assert.equal(summary.legacyEvidenceRewritten, false);
  assert.equal(Object.hasOwn(summary, "decision"), false);
  assert.equal(Object.hasOwn(summary, "approval"), false);
  assert.equal(Object.hasOwn(summary, "accessAllowed"), false);
  assert.equal(Object.hasOwn(summary, "authorized"), false);

  for (const key of nonAuthorizationFlagKeys) {
    assert.equal(summary.nonAuthorizationFlags[key], false, key);
  }
});

test("canonical registry metadata and helper results are deeply immutable", () => {
  assert.equal(Object.isFrozen(registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_SOURCE_EVIDENCE), true);
  assert.equal(Object.isFrozen(registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_SOURCE_EVIDENCE.pr53LegacyAlignment), true);
  assert.equal(Object.isFrozen(registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE), true);
  assert.equal(Object.isFrozen(registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE.pr56ScopeReview), true);
  assert.equal(Object.isFrozen(registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ALLOWED_EVIDENCE_LABELS), true);
  assert.equal(Object.isFrozen(registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS), true);
  assert.equal(Object.isFrozen(registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCESS_PATH_ROWS), true);
  assert.equal(Object.isFrozen(registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_BYPASS_RISK_ROWS), true);
  assert.equal(accessPathRows.every(Object.isFrozen), true);
  assert.equal(bypassRiskRows.every(Object.isFrozen), true);
  assert.equal(Object.isFrozen(summary), true);
  assert.equal(Object.isFrozen(summary.sourceEvidence.pr57AlignmentProof), true);

  assert.throws(() => accessPathRows.push({}), TypeError);
  assert.throws(() => {
    accessPathRows[0].currentAuthorization = "AUTHORIZED";
  }, TypeError);
  assert.throws(() => {
    summary.nonAuthorizationFlags.release_approved = true;
  }, TypeError);
  assert.equal(
    registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCESS_PATH_ROWS[0]
      .currentAuthorization,
    "NOT_AUTHORIZED",
  );
});

test("dependency and non-authorization alignment excludes implementation and approvals", () => {
  assertIncludesAll(evidence.pr56Review, [
    "This document is review-support only. It creates no implementation",
    "no runtime",
    "no role or permission grant",
    "no current admin/support access",
    "authorization, no executable schema field",
    "no executable schema field",
    "no route decision",
    "no route decision, no registry",
    "lookup, no validator dispatch",
    "no validator dispatch",
    "no audit/access-log implementation",
    "blocker closure, no readiness approval",
    "no readiness approval",
    "no domain conclusion",
  ]);
  assertIncludesAll(Object.keys(summary.nonAuthorizationFlags).join("\n"), [
    "implementation_created",
    "runtime_behavior_changed",
    "runtime_registry_lookup_created",
    "admin_support_access_authorized",
    "implicit_superuser_authorized",
    "break_glass_authorized",
    "impersonation_authorized",
    "audit_access_log_implemented",
    "retention_deletion_encryption_implemented",
    "raw_material_routing_implemented",
    "third_party_provider_routing_authorized",
    "runtime_gate_created",
    "validator_dispatch_created",
    "security_finding_created",
    "severity_assigned",
    "remediation_recommended",
    "blocker_closure_created",
    "release_approved",
    "external_use_authorized",
    "product_candidate_selected",
    "technical_signoff_created",
    "runtime_certification_created",
    "domain_conclusion_created",
  ]);
});

test("private and advisory boundaries stay outside repository truth", () => {
  assertIncludesAll(evidence.wikiIndex, [
    "Chat, pasted summaries, private notes, uploaded conversation material, and",
    "non-repo files are advisory only.",
  ]);
  assertIncludesAll(evidence.pr56Review, [
    "Chat, pasted summaries, private notes",
    "advisory only",
    "are not copied here as repo truth",
  ]);

  const thisFile = readFixed(
    "tests/admin-support-access-model-scope-review-registry-alignment.test.js",
  );
  const privateMaterialPattern =
    /\b(External Reviewer|EXTERNAL_REVIEWER|confidential|private prompt|uploaded conversation|source locator|private material copied)\b/;

  assert.equal(
    evidence.pr56Review.includes(["named private", " recipient"].join("")),
    false,
  );
  assert.equal(
    evidence.pr57Alignment.includes(["private recipient", " identity"].join("")),
    false,
  );
  assert.equal(
    privateMaterialPattern.test(thisFile),
    true,
    "private boundary pattern remains a forbidden fixture only",
  );
});
