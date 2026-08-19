const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-declared-packet-review-gaps.json",
  "schemas/human-review-declared-packet-review-gaps-validator-result.json",
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "tests/human-review-asserted-claim-matrix-validator.test.js",
  "packages/schemas/src/human-review-chronology-validator.js",
  "tests/human-review-chronology-validator.test.js",
  "packages/schemas/src/human-review-source-register-validator.js",
  "tests/human-review-source-register-validator.test.js",
];
const prerequisitePaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "tests/domain-human-review-declared-packet-review-gaps-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-declared-packet-review-gaps-schema.test.js",
  "tests/domain-human-review-declared-packet-review-gaps-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-declared-packet-review-gaps-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-declared-packet-review-gaps-validator-helper-readiness-boundary-doc-freeze.test.js",
];
const futureImplementationPaths = [
  "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
  "tests/human-review-declared-packet-review-gaps-validator.test.js",
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
    /HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_VALIDATOR_HELPER_SCOPE/u);
});

test("internal module and one unary export are exact", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /`packages\/schemas\/src\/human-review-declared-packet-review-gaps-validator\.js`/u,
  );
  assert.match(docsText, /`validateHumanReviewDeclaredPacketReviewGaps`/u);
  assert.match(docsText, /FUTURE_VALIDATOR_MODULE_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_VALIDATOR_FUNCTION_ARITY:\n1/u);
  assert.match(docsText, /function is not a public\npackage-index export/u);
});

test("two tracked JSON schemas remain the exact machine sources", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-declared-packet-review-gaps\.json`/u,
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-declared-packet-review-gaps-validator-result\.json`/u,
  );
  assert.match(docsText, /direct descriptor-safe implementation/u);
  assert.match(docsText, /not a generic JSON Schema engine/u);
});

test("future algorithm preserves the exact ten stages", () => {
  const docsText = readRequired(docsPath);
  const algorithm = docsText.slice(
    docsText.indexOf("## 7. Exact Future Validation Algorithm"),
    docsText.indexOf("## 8."),
  );

  for (let stage = 1; stage <= 10; stage += 1) {
    assert.match(algorithm, new RegExp(`### Stage ${stage}:`, "u"));
  }
  assert.match(docsText, /FUTURE_VALIDATOR_STAGE_COUNT:\n10/u);
  assert.match(algorithm, /descriptor-safe/u);
  assert.match(algorithm, /never invoke getters or setters/u);
  assert.match(algorithm, /Unicode code points/u);
  assert.match(algorithm, /cross-contract membership/u);
  assert.match(algorithm, /recursively freeze/u);
});

test("proof transition and implementation scopes are exact and separate", () => {
  const docsText = readRequired(docsPath);

  assert.equal(prerequisitePaths.length, 6);
  for (const prerequisitePath of prerequisitePaths) {
    assert.equal(docsText.includes("`" + prerequisitePath + "`"), true, prerequisitePath);
  }
  assert.match(docsText, /PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n6/u);

  assert.equal(futureImplementationPaths.length, 2);
  for (const futurePath of futureImplementationPaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.match(docsText, /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(docsText, /implementation slice must not modify any existing file/u);
});

test("only seven live absence assertions may transition", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /LIVE_HELPER_PATH_ABSENCE_ASSERTION_TRANSITION_COUNT:\n7/u);
  assert.match(docsText, /Historical docs, reserved paths, status\nmarkers/u);
  assert.match(docsText, /all package-export denial\ntests remain correct and unchanged/u);
});

test("package index remains unchanged at its tracked line count", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(docsText, /package surface remain byte-for-byte outside/u);
});

test("all eight readiness decisions are resolved without implementation", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 12. Resolved Readiness Decisions"),
    docsText.indexOf("## 13."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  assert.match(docsText, /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  for (const marker of [
    "VALIDATOR_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATION_EXECUTION_NOT_CREATED_BY_THIS_SLICE",
    "PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "PERSISTENCE_API_SOURCE_PROVIDER_MODEL_INTEGRATION_NOT_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_INTERNAL_VALIDATOR_HELPER_SCOPE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
