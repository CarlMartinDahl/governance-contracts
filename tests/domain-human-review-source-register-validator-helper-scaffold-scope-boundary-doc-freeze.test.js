const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-source-register-validator-result.json",
  "packages/schemas/src/controlled-synthetic-red-team-result-envelope-validator.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator.test.js",
  "packages/governance/src/api-contract-schema-validator.js",
  "tests/api-contract-schema-validator.test.js",
];
const prerequisitePaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "tests/domain-human-review-source-register-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/domain-human-review-source-register-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-source-register-validator-result-schema-readiness-boundary-doc-freeze.test.js",
];
const futureImplementationPaths = [
  "packages/schemas/src/human-review-source-register-validator.js",
  "tests/human-review-source-register-validator.test.js",
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

  assert.match(docsText, /HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY/u);
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /EIGHT_SCOPE_DECISIONS_RESOLVED/u);
});

test("internal module and exact unary export surface are frozen", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /`packages\/schemas\/src\/human-review-source-register-validator\.js`/u);
  assert.match(docsText, /`validateHumanReviewSourceRegister`/u);
  assert.match(docsText, /FUTURE_VALIDATOR_MODULE_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_VALIDATOR_FUNCTION_ARITY:\n1/u);
  assert.match(docsText, /must not export identity objects, field arrays, maps, sets, schemas/u);
  assert.match(docsText, /function is not a public\npackage-index export/u);
});

test("two JSON schemas are the exact machine-readable sources", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-source-register\.json`/u,
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-source-register-validator-result\.json`/u,
  );
  assert.match(docsText, /derive immutable field lists, constants, regular\nexpressions, enums, and bounds/u);
  assert.match(docsText, /not a generic JSON Schema engine/u);
  assert.match(docsText, /must\nnot parse markdown at runtime/u);
});

test("seven deterministic phases nested descriptor safety and no-echo are exact", () => {
  const docsText = readRequired(docsPath);

  for (const phase of [
    "Phase 0: Root Type Gate",
    "Phase 1: Missing Root Fields",
    "Phase 2: Unknown Root Aggregate",
    "Phase 3: Root Field Types",
    "Phase 4: Root Field Values",
    "Phase 5: Source Entry Structure",
    "Phase 6: Duplicate Source References",
  ]) {
    assert.equal(docsText.includes(phase), true, phase);
  }

  assert.match(docsText, /Object\.getOwnPropertyDescriptors/u);
  assert.match(docsText, /never invoke getters or setters/u);
  assert.match(docsText, /missing sparse index, accessor index/u);
  assert.match(docsText, /ECMAScript `trim\(\)` result/u);
  assert.match(docsText, /between 1 and 200 Unicode code points/u);
  assert.match(docsText, /invalid source references do not participate/u);
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

  assert.match(docsText, /PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n4/u);
  assert.match(docsText, /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(docsText, /helper implementation slice must not modify any existing file/u);
});

test("package index and all public denials stay outside helper creation", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(docsText, /`packages\/schemas\/src\/index\.js` must not change/u);
  assert.match(docsText, /`validateHumanReviewSourceRegister` remains absent/u);
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
  assert.match(section, /exact four-file prerequisite then exact two-file implementation/u);
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
