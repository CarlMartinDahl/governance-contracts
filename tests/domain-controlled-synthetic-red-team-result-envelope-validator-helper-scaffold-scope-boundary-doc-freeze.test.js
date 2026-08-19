const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const sourcePaths = [
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_v1.md",
  "schemas/controlled-synthetic-red-team-result-envelope.json",
  "schemas/controlled-synthetic-red-team-result-envelope-validator-result.json",
  "packages/governance/src/api-contract-schema-validator.js",
  "tests/api-contract-schema-validator.test.js",
];
const futurePaths = [
  "packages/schemas/src/controlled-synthetic-red-team-result-envelope-validator.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator.test.js",
];
const phaseNames = [
  "Root Type Gate",
  "Missing Required Fields",
  "Unknown Top-Level Aggregate",
  "Known Field Types",
  "Known Field Values and Case Mapping",
  "Result Construction",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath} to exist`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("validator-helper scaffold scope and all sources exist", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }

  assert.match(
    docsText,
    /CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY/,
  );
  assert.match(docsText, /DOCS_ONLY/);
  assert.match(docsText, /APPEND_ONLY_VALIDATOR_HELPER_SCOPE/);
});

test("internal module path and exact unary module export are frozen", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(
    docsText,
    /`packages\/schemas\/src\/controlled-synthetic-red-team-result-envelope-validator\.js`/,
  );
  assert.match(docsText, /`validateControlledSyntheticRedTeamResultEnvelope`/);
  assert.match(docsText, /FUTURE_VALIDATOR_MODULE_EXPORT_COUNT:\n1/);
  assert.match(docsText, /FUTURE_VALIDATOR_FUNCTION_ARITY:\n1/);
  assert.match(docsText, /must not export identity objects, posture objects/);
});

test("schemas are exact machine authorities without markdown parsing or copied rows", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/controlled-synthetic-red-team-result-envelope\.json`/,
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/controlled-synthetic-red-team-result-envelope-validator-result\.json`/,
  );
  assert.match(docsText, /exact 26 complete-row `oneOf` mappings/);
  assert.match(docsText, /must not duplicate the 26-row taxonomy/);
  assert.match(docsText, /parse markdown at runtime/);
  assert.match(docsText, /must not present itself as a generic JSON Schema engine/);
});

test("six exact algorithm sections preserve phase ordering and no echo", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));
  const section = docsText.slice(
    docsText.indexOf("## 7. Exact Future Validation Algorithm"),
    docsText.indexOf("## 8."),
  );

  for (const phaseName of phaseNames) {
    assert.match(section, new RegExp("### (?:Phase \\d: )?" + phaseName));
  }
  assert.match(section, /Object\.getOwnPropertyDescriptors/);
  assert.match(section, /never invoke getters or setters/);
  assert.match(section, /Reflect\.ownKeys/);
  assert.match(section, /never echo or sort unknown keys/);
  assert.match(section, /deduplicating exact code\/path pairs/);
  assert.match(section, /never mutate the candidate/);
});

test("future helper implementation scope is exactly two new files", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/);
  for (const futurePath of futurePaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.match(docsText, /future slice must not modify any existing file/);
});

test("package index denial tests and line anchors remain unchanged", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /`packages\/schemas\/src\/index\.js` remains unchanged/);
  assert.match(docsText, /function is not a public\s+package-index export/);
  assert.match(docsText, /all existing package-export denial\s+tests remain correct and unchanged/);
  assert.match(docsText, /No denylist transition belongs/);
  assert.match(docsText, /line count,[\s\S]*public\s+package surface remain byte-for-byte outside/);
});

test("future proof is bounded to structural helper behavior", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /all 26 schema-derived canonical rows return exact frozen success results/);
  assert.match(docsText, /unknown string, symbol, non-enumerable, cyclic, getter, and setter-bearing/);
  assert.match(docsText, /representative success and failure outputs conform structurally/);
  assert.match(docsText, /contains no `fs`, network, environment, provider, model,/);
  assert.match(docsText, /must not claim generic JSON Schema compliance/);
});

test("all eight readiness decisions are resolved without implementation", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));
  const section = docsText.slice(
    docsText.indexOf("## 12. Resolved Readiness Decisions"),
    docsText.indexOf("## 13."),
  );

  assert.equal((section.match(/^\| \d+ \|/gm) ?? []).length, 8);
  assert.match(docsText, /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/);

  for (const marker of [
    "EIGHT_SCOPE_DECISIONS_RESOLVED",
    "EXACT_INTERNAL_MODULE_ONLY_SURFACE_DEFINED",
    "EXACT_TWO_FILE_RUNTIME_CHANGE_SCOPE_DEFINED",
    "PACKAGE_INDEX_UNCHANGED",
    "PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "PERSISTENCE_API_PROVIDER_MODEL_INTEGRATION_NOT_CREATED",
    "VALIDATOR_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATION_EXECUTION_NOT_CREATED_BY_THIS_SLICE",
    "NO_EXECUTED_MODEL_RUN_EVIDENCE_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_INTERNAL_VALIDATOR_HELPER_SCOPE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker));
  }

  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/);
});
