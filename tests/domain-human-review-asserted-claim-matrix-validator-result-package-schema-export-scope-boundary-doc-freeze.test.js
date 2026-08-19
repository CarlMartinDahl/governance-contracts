const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const schemaPath = "schemas/human-review-asserted-claim-matrix-validator-result.json";
const sourcePaths = [
  schemaPath,
  "tests/human-review-asserted-claim-matrix-validator-result-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "packages/schemas/src/index.js",
  "tests/human-review-asserted-claim-matrix-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
];
const futurePaths = [
  "packages/schemas/src/index.js",
  "tests/human-review-asserted-claim-matrix-package-export.test.js",
  "tests/human-review-asserted-claim-matrix-validator-result-schema.test.js",
  "tests/human-review-asserted-claim-matrix-validator-result-package-export.test.js",
];
const retainedPackageBlockedExports = [
  "humanReviewAssertedClaimMatrixValidator",
  "validateHumanReviewAssertedClaimMatrix",
  "getHumanReviewAssertedClaimMatrixValidator",
  "humanReviewAssertedClaimMatrixValidatorRegistry",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath} to exist`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("validator-result package export scope and controlling sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE/u);
});

test("future package export transition is exactly four files", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n4/u);
  for (const futurePath of futurePaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.match(docsText, /all runtime files\s+remain unchanged/u);
});

test("exact package export symbol and schema source path are frozen", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewAssertedClaimMatrixValidatorResult/u,
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-asserted-claim-matrix-validator-result\.json`/u,
  );
  assert.match(docsText, /one static `require` binding/u);
  assert.match(docsText, /one\s+`module\.exports` property/u);
});

test("tracked schema identity and structural counts remain exact", () => {
  const docsText = readRequired(docsPath);
  const schema = JSON.parse(readRequired(schemaPath));

  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-asserted-claim-matrix-validator-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review Asserted Claim Matrix Validator Result Contract",
  );
  assert.equal(schema.required.length, 4);
  assert.equal(Object.keys(schema.properties).length, 4);
  assert.equal(schema.oneOf.length, 2);
  assert.equal(schema.properties.errors.items.oneOf.length, 8);
  assert.equal(schema.properties.errors.uniqueItems, true);

  assert.match(docsText, /exactly four required root properties/u);
  assert.match(docsText, /exactly two root state/u);
  assert.match(docsText, /exactly eight complete code\/path/u);
  assert.match(docsText, /`errors\.uniqueItems: true`/u);
});

test("existing package proof removes only the schema export denial", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /remove only the validator-result schema symbol/u);
  assert.match(docsText, /test-alignment transition, not deletion of a\s+safety boundary/u);
  for (const blockedExport of retainedPackageBlockedExports) {
    assert.equal(docsText.includes("- `" + blockedExport + "`"), true, blockedExport);
  }
  assert.match(docsText, /candidate export symbol and candidate schema proof\s+remain unchanged/u);
});

test("schema proof removes only its obsolete schema export denial", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /## 7\. Exact Validator-Result Schema-Proof Transition/u);
  assert.match(docsText, /remove only `humanReviewAssertedClaimMatrixValidatorResult`/u);
  assert.match(docsText, /retain the existing package import/u);
  assert.match(
    docsText,
    /`humanReviewAssertedClaimMatrixValidator` and\s+`validateHumanReviewAssertedClaimMatrix` remain absent/u,
  );
  assert.match(docsText, /structural validator-result schema assertion unchanged/u);
  assert.match(docsText, /authorizes no validator or execution behavior/u);
});

test("future proof preserves static export and package line-count guards", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(docsText, /exported value is deeply equal and strictly identical/u);
  assert.match(docsText, /exact four root properties, two state branches, eight error branches/u);
  assert.match(docsText, /pre-existing Asserted Claim Matrix candidate schema export remains unchanged/u);
  assert.match(docsText, /no validator execution, dispatch, API, persistence, provider, model/u);
  assert.match(docsText, /does not prove that the package export exists/u);
});

test("scope preserves non-implementation and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_REAL_PRIVATE_OR_SOURCE_MATERIAL_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  assert.match(docsText, /Human\/professional\s+review remains the release gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
