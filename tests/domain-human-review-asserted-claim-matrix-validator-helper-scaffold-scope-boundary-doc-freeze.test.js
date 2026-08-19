const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix.json",
  "schemas/human-review-asserted-claim-matrix-validator-result.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  "tests/human-review-source-register-validator.test.js",
  "packages/schemas/src/human-review-chronology-validator.js",
  "tests/human-review-chronology-validator.test.js",
];
const prerequisitePaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "tests/domain-human-review-asserted-claim-matrix-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-asserted-claim-matrix-schema.test.js",
  "tests/domain-human-review-asserted-claim-matrix-contract-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-validator-helper-readiness-boundary-doc-freeze.test.js",
];
const futureImplementationPaths = [
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "tests/human-review-asserted-claim-matrix-validator.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath} to exist`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("validator-helper scaffold scope and controlling sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /EIGHT_SCOPE_DECISIONS_RESOLVED/u);
});

test("internal module and exact unary export surface are frozen", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /`packages\/schemas\/src\/human-review-asserted-claim-matrix-validator\.js`/u,
  );
  assert.match(docsText, /`validateHumanReviewAssertedClaimMatrix`/u);
  assert.match(docsText, /FUTURE_VALIDATOR_MODULE_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_VALIDATOR_FUNCTION_ARITY:\n1/u);
  assert.match(docsText, /must not export identity objects, field arrays, maps, sets, schemas/u);
  assert.match(docsText, /function is not a public\npackage-index export/u);
});

test("two JSON schemas are the exact machine-readable sources", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-asserted-claim-matrix\.json`/u,
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-asserted-claim-matrix-validator-result\.json`/u,
  );
  assert.match(docsText, /derive immutable field lists, constants, regular\nexpressions, enums, bounds/u);
  assert.match(docsText, /not a generic JSON Schema engine/u);
  assert.match(docsText, /must not parse markdown at runtime/u);
});

test("eight deterministic stages nested descriptor safety and no-echo are exact", () => {
  const docsText = readRequired(docsPath);

  for (const stage of [
    "Stage 1: Root Type Gate",
    "Stage 2: Missing Root Fields",
    "Stage 3: Unknown Root Aggregate",
    "Stage 4: Root Field Types And Values",
    "Stage 5: Claim Row Structure And Values",
    "Stage 6: Duplicate Claim References",
    "Stage 7: Duplicate Source References",
    "Stage 8: Duplicate Chronology References",
  ]) {
    assert.equal(docsText.includes(stage), true, stage);
  }

  assert.match(docsText, /Object\.getOwnPropertyDescriptors/u);
  assert.match(docsText, /never invoke getters or setters/u);
  assert.match(docsText, /missing sparse index, accessor index/u);
  assert.match(docsText, /at least one\n  Unicode code point/u);
  assert.match(docsText, /preserved without trimming\n  or normalization/u);
  assert.match(docsText, /state-observation coupling only when both values are separately valid/u);
  assert.match(docsText, /duplicates are scoped within each row/u);
  assert.match(docsText, /never echo, hash, sort, normalize, or return the reference value/u);
});

test("proof transition prerequisite and later implementation scopes remain distinct", () => {
  const docsText = readRequired(docsPath);

  for (const prerequisitePath of prerequisitePaths) {
    assert.equal(docsText.includes("`" + prerequisitePath + "`"), true, prerequisitePath);
  }
  for (const futurePath of futureImplementationPaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }

  assert.match(docsText, /PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n8/u);
  assert.match(docsText, /LIVE_HELPER_PATH_ABSENCE_ASSERTION_TRANSITION_COUNT:\n10/u);
  assert.match(docsText, /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(docsText, /helper implementation slice must not modify any existing file/u);
});

test("package index and all public denials stay outside helper creation", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(docsText, /`packages\/schemas\/src\/index\.js` must not change/u);
  assert.match(docsText, /`validateHumanReviewAssertedClaimMatrix` remains absent/u);
  assert.match(docsText, /package-export denial tests\nremain correct and unchanged/u);
});

test("all eight readiness decisions are resolved without implementation", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 12. Resolved Readiness Decisions"),
    docsText.indexOf("## 13."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  assert.match(docsText, /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  assert.match(section, /exact eight-file prerequisite then exact two-file implementation/u);
  assert.match(section, /13165-line index remains unchanged/u);
  assert.match(section, /representative structural proof only/u);
});

test("scope preserves non-implementation release and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "PROOF_TRANSITION_PREREQUISITE_REQUIRED_FIRST",
    "PACKAGE_INDEX_UNCHANGED",
    "PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATION_EXECUTION_NOT_CREATED_BY_THIS_SLICE",
    "NO_REAL_PRIVATE_OR_SOURCE_MATERIAL_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_INTERNAL_VALIDATOR_HELPER_SCOPE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  assert.match(docsText, /Human\/professional review remains the\nrelease gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
