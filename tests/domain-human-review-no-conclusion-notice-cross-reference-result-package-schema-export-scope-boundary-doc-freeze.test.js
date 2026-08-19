"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const schemaPath =
  "schemas/human-review-no-conclusion-notice-cross-reference-result.json";
const resultSchemaProofPath =
  "tests/human-review-no-conclusion-notice-cross-reference-result-schema.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const exportName = "humanReviewNoConclusionNoticeCrossReferenceResult";
const sourcePaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_RESULT_PACKAGE_EXPORT_READINESS_BOUNDARY_v1.md",
  schemaPath,
  resultSchemaProofPath,
  packageIndexPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "tests/human-review-questions-cross-reference-result-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "tests/human-review-declared-packet-review-gaps-cross-reference-result-package-export.test.js",
];
const proofTransitionOwnerPaths = [
  "tests/domain-human-review-no-conclusion-notice-cross-reference-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-no-conclusion-notice-cross-reference-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-no-conclusion-notice-cross-reference-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  resultSchemaProofPath,
];
const futureExportPaths = [
  packageIndexPath,
  "tests/human-review-no-conclusion-notice-cross-reference-result-package-export.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("No-Conclusion Notice cross-reference result package schema-export scope and sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(
    docsText,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE/u);
});

test("exact static export name source and package placement are frozen", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    new RegExp(
      "FUTURE_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\\n" +
        exportName,
      "u",
    ),
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-no-conclusion-notice-cross-reference-result\.json`/u,
  );
  assert.match(docsText, /one static `require` binding/u);
  assert.match(docsText, /one\n`module\.exports` property/u);
  assert.match(docsText, /after `humanReviewNoConclusionNoticeValidatorResult`/u);
  assert.match(
    docsText,
    /after\n`module\.exports\.humanReviewNoConclusionNoticeValidatorResult`/u,
  );
});

test("tracked schema identity and structure remain exact", () => {
  const docsText = readRequired(docsPath);
  const schema = JSON.parse(readRequired(schemaPath));
  const branches = schema.properties.errors.items.oneOf;
  const pathAlternativeCount = branches.reduce(
    (count, branch) => count + (branch.properties.path.enum?.length ?? 1),
    0,
  );
  const indexedPatternCount = branches.filter(
    (branch) => typeof branch.properties.path.pattern === "string",
  ).length;

  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-no-conclusion-notice-cross-reference-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review No-Conclusion Notice Cross-Reference Result Contract",
  );
  assert.equal(schema.required.length, 4);
  assert.equal(Object.keys(schema.properties).length, 4);
  assert.equal(schema.oneOf.length, 2);
  assert.equal(branches.length, 13);
  assert.equal(pathAlternativeCount, 17);
  assert.equal(indexedPatternCount, 5);
  assert.equal(schema.properties.errors.uniqueItems, true);
  assert.match(docsText, /exactly four required root properties/u);
  assert.match(docsText, /exactly thirteen complete code-to-path item branches/u);
  assert.match(docsText, /exactly\nseventeen path alternatives/u);
  assert.match(docsText, /five indexed path patterns/u);
});

test("separate proof-transition prerequisite is exactly five files", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 6. Separate Docs-Only Proof-Transition Prerequisite"),
    docsText.indexOf("## 7."),
  );

  assert.equal(section.includes("`" + proofTransitionPath + "`"), true);
  for (const ownerPath of proofTransitionOwnerPaths) {
    readRequired(ownerPath);
    assert.equal(section.includes("`" + ownerPath + "`"), true, ownerPath);
  }
  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 5);
  assert.match(
    docsText,
    /FUTURE_PACKAGE_EXPORT_PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n5/u,
  );
  assert.match(section, /exactly four package-symbol live absence/u);
  assert.match(section, /one package-proof-path live absence assertion/u);
  assert.match(section, /result-schema proof must\npreserve every schema identity/u);
});

test("later contract-only export scope is exactly two files", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 7. Exact Later Two-File Export Scope"),
    docsText.indexOf("## 8."),
  );

  for (const futurePath of futureExportPaths) {
    assert.equal(section.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 2);
  assert.match(
    docsText,
    /FUTURE_CROSS_REFERENCE_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/u,
  );
  assert.match(
    section,
    /focused schema proof[\s\S]*every runtime file remain unchanged/u,
  );
});

test("result-schema proof transition is exact and otherwise preserving", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 8. Exact Result-Schema Proof Transition"),
    docsText.indexOf("## 9."),
  );

  assert.equal(section.includes("`" + resultSchemaProofPath + "`"), true);
  assert.match(section, /reads the schemas package only to prove absence/u);
  assert.match(section, /remove only the package-symbol\nconstant/u);
  assert.match(section, /live absence assertion/u);
  assert.match(section, /Every remaining schema identity/u);
  assert.match(section, /authorizes no validator or execution behavior/u);
});

test("future focused proof and package line-count guard are bounded", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired(packageIndexPath);
  const section = docsText.slice(
    docsText.indexOf("## 9. Exact Focused Package-Export Proof"),
    docsText.indexOf("## 10."),
  );

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(
    docsText,
    /FUTURE_PACKAGE_INDEX_EXPORT_SYMBOL_OCCURRENCE_COUNT:\n3/u,
  );
  assert.equal((section.match(/^\d+\./gmu) ?? []).length, 10);
  assert.match(docsText, /FUTURE_FOCUSED_PACKAGE_EXPORT_PROOF_CLAIM_COUNT:\n10/u);
  assert.match(section, /deeply equal and strictly identical/u);
  assert.match(section, /all six child validator-result package exports/u);
  assert.match(section, /all four existing cross-reference result package exports/u);
  assert.match(section, /remains outside the\n   package surface/u);
  assert.match(section, /no validator execution, dispatch, persistence, API/u);
});

test("scope proof is append-only and creates no live export assertion", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /must not import the package to assert live absence or presence/u,
  );
  assert.match(docsText, /PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE/u);
  assert.match(docsText, /RESULT_SCHEMA_NOT_CHANGED/u);
  assert.match(docsText, /CROSS_REFERENCE_EXECUTION_NOT_CREATED/u);
  assert.match(docsText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
});

test("scope preserves non-interference and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "NO_REAL_PRIVATE_OR_SOURCE_MATERIAL_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
  assert.match(
    docsText,
    /proof transition and static export remain separate later slices/u,
  );
});
