"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_RESULT_PACKAGE_EXPORT_READINESS_BOUNDARY_v1.md";
const schemaPath =
  "schemas/human-review-asserted-claim-matrix-cross-reference-result.json";
const schemaProofPath =
  "tests/human-review-asserted-claim-matrix-cross-reference-result-schema.test.js";
const reservedPackageProofPath =
  "tests/human-review-asserted-claim-matrix-cross-reference-result-package-export.test.js";
const exportName = "humanReviewAssertedClaimMatrixCrossReferenceResult";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  schemaPath,
  schemaProofPath,
  "packages/schemas/src/index.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "tests/human-review-chronology-source-register-cross-reference-result-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "tests/human-review-asserted-claim-matrix-validator-result-package-export.test.js",
];
const baselineSymbolAbsenceOwnerPaths = [
  "tests/domain-human-review-asserted-claim-matrix-cross-reference-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-cross-reference-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-cross-reference-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("claim-matrix cross-reference package-export readiness and sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_RESULT_PACKAGE_EXPORT_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_EXPORT_READINESS_ASSESSMENT/u);
  assert.match(
    docsText,
    /ASSESSMENT_BASELINE_HEAD:\n46170fe0834eea37c4cd45a02a25a34e8f2ea155/u,
  );
});

test("ten baseline facts are captured without package implementation", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 3. Baseline Tracked Facts"),
    docsText.indexOf("## 4."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 10);
  assert.match(docsText, /CURRENT_PACKAGE_EXPORT_READINESS_FACT_COUNT:\n10/u);
  assert.match(
    section,
    /reserved static schema export was absent at the assessment baseline/u,
  );
  assert.match(section, /three tracked tests held live package-symbol absence/u);
  assert.match(docsText, /PACKAGE_INDEX_UNCHANGED_BY_THIS_SLICE/u);
  assert.match(docsText, /RESULT_SCHEMA_UNCHANGED_BY_THIS_SLICE/u);
});

test("tracked result schema identity and structural counts remain exact", () => {
  const docsText = readRequired(docsPath);
  const schema = JSON.parse(readRequired(schemaPath));

  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-asserted-claim-matrix-cross-reference-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review Asserted Claim Matrix Cross-Reference Result Contract",
  );
  assert.equal(schema.required.length, 4);
  assert.equal(Object.keys(schema.properties).length, 4);
  assert.equal(schema.oneOf.length, 2);
  assert.equal(schema.properties.errors.items.oneOf.length, 7);
  assert.equal(
    schema.properties.errors.items.oneOf[4].properties.path.enum.length,
    2,
  );
  assert.equal(schema.properties.errors.uniqueItems, true);
  assert.match(docsText, /exactly four required root fields, two state branches/u);
  assert.match(
    docsText,
    /exactly seven complete code-to-path branches and eight path alternatives/u,
  );
});

test("reserved export identity source and proof path are exact", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    new RegExp(
      "RESERVED_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\\n" +
        exportName,
      "u",
    ),
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-asserted-claim-matrix-cross-reference-result\.json`/u,
  );
  assert.equal(docsText.includes(`\`${reservedPackageProofPath}\``), true);
  assert.match(docsText, /does not decide the package-index edit/u);
});

test("three symbol owners and one proof-path guard are enumerated without a new owner", () => {
  const docsText = readRequired(docsPath);

  assert.equal(baselineSymbolAbsenceOwnerPaths.length, 3);
  for (const ownerPath of baselineSymbolAbsenceOwnerPaths) {
    const ownerText = readRequired(ownerPath);
    assert.equal(docsText.includes(`\`${ownerPath}\``), true, ownerPath);
    assert.equal(ownerText.includes(exportName), true, ownerPath);
  }
  const semanticsText = readRequired(baselineSymbolAbsenceOwnerPaths[0]);
  assert.equal(semanticsText.includes(reservedPackageProofPath), true);
  assert.match(
    docsText,
    /BASELINE_PACKAGE_EXPORT_SYMBOL_LIVE_ABSENCE_ASSERTION_COUNT:\n3/u,
  );
  assert.match(
    docsText,
    /BASELINE_PACKAGE_EXPORT_PROOF_PATH_LIVE_ABSENCE_ASSERTION_COUNT:\n1/u,
  );
  assert.match(docsText, /NO_NEW_LIVE_ABSENCE_OWNER_CREATED_BY_THIS_PROOF/u);
  assert.match(docsText, /must not import `packages\/schemas\/src\/index\.js`/u);
});

test("readiness advances only to five-decision docs-only scope freeze", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 7. Five Open Package-Export Scope Decisions"),
    docsText.indexOf("## 8."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 5);
  assert.match(
    docsText,
    /OPEN_CROSS_REFERENCE_RESULT_PACKAGE_EXPORT_SCOPE_DECISION_COUNT:\n5/u,
  );
  assert.match(
    docsText,
    /CROSS_REFERENCE_RESULT_PACKAGE_EXPORT_READINESS:\nREADY_FOR_DOCS_ONLY_SCOPE_FREEZE_NOT_IMPLEMENTATION/u,
  );
  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nHUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_DOCS_ONLY/u,
  );
  assert.match(docsText, /must not modify `packages\/schemas\/src\/index\.js`/u);
});

test("readiness preserves non-interference and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "PACKAGE_EXPORT_NOT_IMPLEMENTATION_READY",
    "VALIDATOR_AND_RUNTIME_NOT_CREATED",
    "NO_REAL_PRIVATE_OR_SOURCE_MATERIAL_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_PACKAGE_EXPORT_READY_FOR_SCOPE_FREEZE",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
  assert.match(
    docsText,
    /package-schema-export scope remains a separate docs-only slice/u,
  );
});
