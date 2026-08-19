const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md",
);
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_v1.md",
  "schemas/controlled-synthetic-red-team-result-envelope.json",
  "schemas/controlled-synthetic-red-team-result-envelope-validator-result.json",
  "tests/controlled-synthetic-red-team-result-envelope-schema.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator-result-schema.test.js",
  "packages/schemas/src/index.js",
  "tests/controlled-synthetic-red-team-result-envelope-package-export.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator-result-package-export.test.js",
  "packages/governance/src/api-contract-schema-validator.js",
  "tests/api-contract-schema-validator.test.js",
];
const currentSchemaExports = [
  "controlledSyntheticRedTeamResultEnvelope",
  "controlledSyntheticRedTeamResultEnvelopeValidatorResult",
];
const historicallyAbsentBehaviorExports = [
  "controlledSyntheticRedTeamResultEnvelopeValidator",
  "validateControlledSyntheticRedTeamResultEnvelope",
  "getControlledSyntheticRedTeamResultEnvelopeValidator",
  "controlledSyntheticRedTeamResultEnvelopeValidatorRegistry",
];
const currentlyAbsentBehaviorSiblingExports = [
  "controlledSyntheticRedTeamResultEnvelopeValidator",
  "getControlledSyntheticRedTeamResultEnvelopeValidator",
  "controlledSyntheticRedTeamResultEnvelopeValidatorRegistry",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath} to exist`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("validator-helper readiness boundary and every source exist", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }

  assert.match(
    docsText,
    /CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_READINESS_BOUNDARY/,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/);
  assert.match(docsText, /APPEND_ONLY_READINESS_ASSESSMENT/);
});

test("eleven concrete validation contract facts are recorded without conclusions", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));
  const section = docsText.slice(
    docsText.indexOf("## 3. Concrete Contract Facts"),
    docsText.indexOf("## 4."),
  );

  assert.equal((section.match(/^\| (?!Surface |---)[^|]+ \| [^|]+ \|$/gm) ?? []).length, 11);
  assert.match(docsText, /CONCRETE_VALIDATION_CONTRACT_FACT_COUNT:\n11/);
  assert.match(section, /descriptor-safe inspection/);
  assert.match(section, /no accessor invocation/);
  assert.match(section, /deep immutability/);
  assert.match(section, /structural contract facts only/);
});

test("historical absent behavior exports remain documented while current sibling denials stay distinct", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));
  const packageSchemas = require("../packages/schemas/src/index.js");

  for (const exportName of currentSchemaExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), true, exportName);
    assert.equal(docsText.includes("- `" + exportName + "`"), true, exportName);
  }
  for (const exportName of historicallyAbsentBehaviorExports) {
    assert.equal(docsText.includes("- `" + exportName + "`"), true, exportName);
  }
  for (const exportName of currentlyAbsentBehaviorSiblingExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }

  assert.match(docsText, /absence of those exports is a current fact, not permission/);
});

test("readiness matrix remains blocked by exact scope decisions", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /VALIDATOR_HELPER_READINESS:\nBLOCKED_BY_EXACT_SCOPE_DECISIONS/);
  assert.match(docsText, /candidate contract concrete \| `YES_TRACKED`/);
  assert.match(docsText, /validator module\/package path frozen \| `NO_OPEN`/);
  assert.match(docsText, /exact public helper\/export surface frozen \| `NO_OPEN`/);
  assert.match(docsText, /conformance proof against result schema frozen \| `NO_OPEN`/);
});

test("exactly eight implementation-scope decisions remain open", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));
  const section = docsText.slice(
    docsText.indexOf("## 6. Eight Open Scope Decisions"),
    docsText.indexOf("## 7."),
  );

  assert.equal((section.match(/^\| \d+ \|/gm) ?? []).length, 8);
  assert.match(docsText, /OPEN_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/);
  assert.match(section, /exact package and module path/);
  assert.match(section, /authoritative 26-row machine source/);
  assert.match(section, /line-count preservation/);
  assert.match(section, /validator\/result-schema conformance proof/);
});

test("smallest safe next slice is one docs-only scaffold scope boundary", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nCONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_DOCS_ONLY/,
  );
  assert.match(docsText, /next slice must not implement or export the validator/);
});

test("readiness assessment preserves no-implementation and release boundaries", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const marker of [
    "VALIDATOR_HELPER_NOT_IMPLEMENTATION_READY",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_EXECUTED_MODEL_RUN_EVIDENCE_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_HELPER_READINESS_BLOCKED_BY_SCOPE_DECISIONS",
  ]) {
    assert.match(docsText, new RegExp(marker));
  }

  assert.match(docsText, /Human\/professional review\s+remains the release gate/);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/);
});
