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
  module:
    "packages/governance/src/admin-support-access-model-scope-review-registry.js",
  index: "packages/governance/src/index.js",
  pr53Alignment:
    "tests/domain-rbac-role-permission-model-scope-review-after-pr51-alignment.test.js",
  pr55RegistryAlignment:
    "tests/rbac-role-permission-model-scope-review-registry-alignment.test.js",
  pr56Review:
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55_v1.md",
  pr56FocusedTest:
    "tests/domain-admin-support-access-model-scope-review-after-pr55.test.js",
  pr57Alignment:
    "tests/domain-admin-support-access-model-scope-review-after-pr55-alignment.test.js",
  wikiIndex: "docs/wiki/index.md",
  wikiLog: "docs/wiki/log.md",
});

const evidence = Object.fromEntries(
  Object.entries(paths).map(([key, value]) => [key, readFixed(value)]),
);

const parseJsonBlock = (markdown, blockName) => {
  const pattern = new RegExp(
    `\`${blockName}_JSON_BEGIN\`\\s*\`\`\`json\\s*([\\s\\S]*?)\\s*\`\`\`\\s*\`${blockName}_JSON_END\``,
  );
  const match = markdown.match(pattern);
  assert.ok(match, `${blockName} JSON block exists`);
  return JSON.parse(match[1]);
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

const accessPathIds = Array.from({ length: 20 }, (_, index) =>
  `ASAM-AP-${String(index + 1).padStart(3, "0")}`,
);
const bypassRiskIds = Array.from({ length: 18 }, (_, index) =>
  `ASAM-BR-${String(index + 1).padStart(3, "0")}`,
);

const stripRegistryFields = ({ registry_id, row_type, ...row }) => row;

const assertIncludesAll = (actual, expected) => {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
};

test("exports admin/support scope-review registry surface through module and index", () => {
  for (const exportName of [
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
  ]) {
    assert.equal(Object.hasOwn(registry, exportName), true, exportName);
    assert.equal(Object.hasOwn(index, exportName), true, exportName);
  }

  assert.match(
    evidence.index,
    /require\("\.\/admin-support-access-model-scope-review-registry\.js"\)/,
  );
});

test("registry identity is static scaffold and source provenance stays separated", () => {
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
    "NOT_IMPLEMENTATION",
    "NOT_RUNTIME_ENFORCEMENT",
    "NOT_RBAC_IMPLEMENTATION",
    "NOT_ACCESS_CONTROL_IMPLEMENTATION",
    "NOT_ADMIN_SUPPORT_AUTHORIZATION",
    "NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
  ]);

  assert.deepEqual(
    summary.sourceEvidence.pr53LegacyAlignment.literalMarkers,
    ["PROVE_ONLY", "SCOPE_REVIEW_ONLY"],
  );
  assert.deepEqual(
    summary.sourceEvidence.pr53LegacyAlignment.absentLiteralMarkers,
    ["TEST_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
  assert.deepEqual(
    summary.sourceEvidence.pr53LegacyAlignment.boundaries,
    ["no implementation", "no enforcement", "no blocker closure"],
  );
  assert.equal(
    summary.sourceEvidence.pr53LegacyAlignment.boundaries.length,
    3,
    "PR53 boundary array must contain exactly three entries",
  );
  assertIncludesAll(evidence.pr53Alignment, [
    "no\\nimplementation",
    "RBAC enforcement",
    "access-control enforcement",
    "blocker closure",
  ]);
  assert.deepEqual(
    summary.sourceEvidence.pr55RegistryAlignment.literalMarkers,
    ["TEST_ONLY", "PROVE_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
  assert.equal(
    summary.sourceEvidence.pr56ScopeReview.sourceAnchor,
    "governance/main @ f8ccf0434659de424a3d460ed26998e0b3472484",
  );
  assert.deepEqual(
    summary.sourceEvidence.pr57AlignmentProof.literalMarkers,
    ["TEST_ONLY", "PROVE_ONLY", "ALIGNMENT_PROOF_ONLY"],
  );
  assert.equal(
    summary.sourceProvenanceSeparated,
    true,
    "source/provenance separation must be explicit summary metadata",
  );
  assert.equal(
    summary.legacyEvidenceRewritten,
    false,
    "legacy evidence must remain unrevised in summary metadata",
  );
});

test("accepted merge provenance is explicit and not rewritten into source docs", () => {
  assert.equal(
    summary.acceptedMergeProvenance.pr53Alignment.mergeCommit,
    "03516fa6deeea91a7dccbcb35c17907e3e113da8",
  );
  assert.equal(
    summary.acceptedMergeProvenance.pr56ScopeReview.mergeCommit,
    "7c6917c8f43b0cf1febc5fc95c682203e18d01d3",
  );
  assert.equal(
    summary.acceptedMergeProvenance.pr57AlignmentProof.mergeCommit,
    "aae85a902b255c4405f9e0eb93a9487bc7e0b754",
  );
  assert.equal(
    evidence.pr56Review.includes(
      summary.acceptedMergeProvenance.pr56ScopeReview.mergeMarker,
    ),
    false,
  );
  assertIncludesAll(evidence.pr57Alignment, [
    "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55",
    "7c6917c8f43b0cf1febc5fc95c682203e18d01d3",
    "TEST_ONLY",
    "PROVE_ONLY",
    "ALIGNMENT_PROOF_ONLY",
  ]);
});

test("access-path rows exactly mirror PR56 JSON scope evidence", () => {
  assert.equal(accessPathRows.length, 20);
  assert.deepEqual(
    accessPathRows.map((row) => row.registry_id),
    accessPathIds,
  );
  assert.deepEqual(
    accessPathRows.map((row) => stripRegistryFields(row)),
    sourceAccessPaths,
  );

  for (const row of accessPathRows) {
    assert.equal(row.row_type, "ACCESS_PATH_SCOPE");
    assert.ok(
      ["NOT_AUTHORIZED", "UNKNOWN_NOT_EVIDENCED"].includes(
        row.currentAuthorization,
      ),
      row.category,
    );
  }
});

test("bypass-risk rows exactly mirror PR56 JSON scope evidence", () => {
  assert.equal(bypassRiskRows.length, 18);
  assert.deepEqual(
    bypassRiskRows.map((row) => row.registry_id),
    bypassRiskIds,
  );
  assert.deepEqual(
    bypassRiskRows.map((row) => stripRegistryFields(row)),
    sourceBypassRisks,
  );

  for (const row of bypassRiskRows) {
    assert.equal(row.row_type, "BYPASS_RISK");
    assert.equal(row.blockerStatus, "NOT_AUTHORIZED");
    assert.match(row.requiredFutureImplementationEvidence, /future/i);
    assert.match(row.requiredFutureTestEvidence, /future/i);
  }
});

test("allowed and forbidden labels remain safe governance evidence labels only", () => {
  assert.deepEqual(summary.allowedEvidenceLabels, [
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
  assert.deepEqual(summary.forbiddenPositiveLabels, [
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
});

test("non-authorization flags stay false and helpers return immutable copies", () => {
  for (const [key, value] of Object.entries(summary.nonAuthorizationFlags)) {
    assert.equal(value, false, key);
  }

  assert.throws(() => {
    accessPathRows.push({});
  }, TypeError);
  assert.throws(() => {
    bypassRiskRows[0].blockerStatus = "AUTHORIZED";
  }, TypeError);
  assert.notEqual(
    accessPathRows,
    registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCESS_PATH_ROWS,
  );
  assert.notEqual(
    bypassRiskRows,
    registry.ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_BYPASS_RISK_ROWS,
  );
});

test("module source contains no fs, network, env, provider, dispatch, or runtime APIs", () => {
  for (const pattern of [
    /require\("node:fs"\)/,
    /fs\./,
    /readFile/,
    /writeFile/,
    /appendFile/,
    /readdir/,
    /glob\(/,
    /fetch\(/,
    /axios/,
    /child_process/,
    /exec\(/,
    /spawn\(/,
    /process\.env/,
    /crypto\./,
    /createCipher/,
    /createDecipher/,
    /deleteObject/,
    /purge\(/,
    /erase\(/,
    /keyManagement/,
    /writeLog/,
    /emitEvent/,
    /\brouteMaterial\(/,
    /\bsendToProvider\(/,
    /\bproviderRoute\(/,
    /\bvalidatorDispatch\(/,
    /\bdispatchValidator\(/,
    /\bregistryLookup\(/,
  ]) {
    assert.doesNotMatch(evidence.module, pattern);
  }
});

test("module exports no operational helper names", () => {
  for (const exportName of Object.keys(registry)) {
    assert.doesNotMatch(
      exportName,
      /\b(lookup|getById|findById|resolve|dispatch|authorize|authorise|enforce|grant|permit|canAccess|allowAccess|approve|validateActor|checkPermission|decideAccess)\b/i,
      exportName,
    );
  }
});

test("fixed tracked evidence boundaries avoid copied private, source, or log material", () => {
  assertIncludesAll(evidence.wikiIndex, [
    "This wiki is a tracked repo orientation and coordination layer.",
    "Chat, pasted summaries, private notes, uploaded conversation material, and",
    "non-repo files are advisory only.",
  ]);
  assertIncludesAll(evidence.wikiLog, [
    "does not create governance proof, implementation, readiness, approval",
    "no runtime behavior",
    "no runtime/API/schema/package behavior",
  ]);

  const combinedRegistryText = evidence.module;
  for (const forbidden of [
    ["named private", " recipient"].join(""),
    "personal identity number",
    "private case facts",
    "source package payload",
    "provider payload",
    "prompt/response transcript",
    "PDF binary",
    "image binary",
    "screenshot binary",
  ]) {
    assert.equal(combinedRegistryText.includes(forbidden), false, forbidden);
  }
});

test("summary stays counts and evidence posture, not a decision helper", () => {
  assert.deepEqual(
    {
      accessPathCount: summary.accessPathCount,
      bypassRiskCount: summary.bypassRiskCount,
    },
    {
      accessPathCount: 20,
      bypassRiskCount: 18,
    },
  );
  assert.equal(
    Object.hasOwn(summary, "decision"),
    false,
    "summary must not return a decision field",
  );
  assert.equal(
    Object.hasOwn(summary, "approval"),
    false,
    "summary must not return an approval field",
  );
});
