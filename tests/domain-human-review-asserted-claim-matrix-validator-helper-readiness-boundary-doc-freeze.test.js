const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md";
const validatorHelperProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const historicalHelperPath =
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix.json",
  "schemas/human-review-asserted-claim-matrix-validator-result.json",
  "tests/human-review-asserted-claim-matrix-schema.test.js",
  "tests/human-review-asserted-claim-matrix-validator-result-schema.test.js",
  "packages/schemas/src/index.js",
  "tests/human-review-asserted-claim-matrix-package-export.test.js",
  "tests/human-review-asserted-claim-matrix-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-source-register-validator.js",
  "tests/human-review-source-register-validator.test.js",
  "packages/schemas/src/human-review-chronology-validator.js",
  "tests/human-review-chronology-validator.test.js",
];
const currentSchemaExports = [
  "humanReviewAssertedClaimMatrix",
  "humanReviewAssertedClaimMatrixValidatorResult",
];
const blockedBehaviorExports = [
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

test("validator-helper readiness boundary and every source exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_READINESS_ASSESSMENT/u);
});

test("eleven concrete validation contract facts are recorded without conclusions", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 3. Concrete Contract Facts"),
    docsText.indexOf("## 4."),
  );

  assert.equal((section.match(/^\| (?!Surface |---)[^|]+ \| [^|]+ \|$/gmu) ?? []).length, 11);
  assert.match(docsText, /CONCRETE_VALIDATION_CONTRACT_FACT_COUNT:\n11/u);
  assert.match(section, /descriptor-safe inspection/u);
  assert.match(section, /no accessor invocation/u);
  assert.match(section, /deep immutability/u);
  assert.match(section, /structural contract facts only/u);
});

test("schema exports exist while package behavior exports remain absent", () => {
  const docsText = readRequired(docsPath);
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionRelativePath,
  );
  const packageSchemas = require("../packages/schemas/src/index.js");

  for (const exportName of currentSchemaExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), true, exportName);
    assert.equal(docsText.includes("- `" + exportName + "`"), true, exportName);
  }
  for (const exportName of blockedBehaviorExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
    assert.equal(docsText.includes("- `" + exportName + "`"), true, exportName);
  }
  assert.equal(docsText.includes("`" + historicalHelperPath + "`"), true);
  assert.match(docsText, /absence of those helper surfaces is a current fact, not permission/u);
  assert.equal(
    validatorHelperProofTransitionText.includes("`" + historicalHelperPath + "`"),
    true,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n10/u,
  );
});

test("readiness remains blocked by exact scope decisions", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /VALIDATOR_HELPER_READINESS:\nBLOCKED_BY_EXACT_SCOPE_DECISIONS/u);
  assert.match(docsText, /candidate contract concrete \| `YES_TRACKED`/u);
  assert.match(docsText, /validator module\/package path frozen \| `NO_OPEN`/u);
  assert.match(docsText, /exact public helper\/export surface frozen \| `NO_OPEN`/u);
  assert.match(docsText, /conformance proof against result schema frozen \| `NO_OPEN`/u);
});

test("exactly eight implementation-scope decisions remain open", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 6. Eight Open Scope Decisions"),
    docsText.indexOf("## 7."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  assert.match(docsText, /OPEN_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  assert.match(section, /exact package and module path/u);
  assert.match(section, /authoritative nested validation machine sources/u);
  assert.match(section, /line-count preservation/u);
  assert.match(section, /validator\/result-schema conformance proof/u);
});

test("smallest safe next slice is one docs-only scaffold scope boundary", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nHUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_DOCS_ONLY/u,
  );
  assert.match(docsText, /next slice must not implement or export the validator/u);
});

test("readiness preserves non-implementation and release boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "VALIDATOR_HELPER_NOT_IMPLEMENTATION_READY",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_REAL_PRIVATE_OR_SOURCE_MATERIAL_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_HELPER_READINESS_BLOCKED_BY_SCOPE_DECISIONS",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  assert.match(docsText, /Human\/professional review remains the release\s+gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
