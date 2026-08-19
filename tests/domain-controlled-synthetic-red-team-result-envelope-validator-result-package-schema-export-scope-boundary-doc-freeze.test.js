const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const schemaPath = "schemas/controlled-synthetic-red-team-result-envelope-validator-result.json";
const sourcePaths = [
  schemaPath,
  "tests/controlled-synthetic-red-team-result-envelope-validator-result-schema.test.js",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_v1.md",
  "packages/schemas/src/index.js",
  "tests/controlled-synthetic-red-team-result-envelope-package-export.test.js",
  "tests/no-raw-metadata-manifest-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
];
const futurePaths = [
  "packages/schemas/src/index.js",
  "tests/controlled-synthetic-red-team-result-envelope-package-export.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator-result-schema.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator-result-package-export.test.js",
];
const retainedBlockedExports = [
  "controlledSyntheticRedTeamResultEnvelopeValidator",
  "validateControlledSyntheticRedTeamResultEnvelope",
  "getControlledSyntheticRedTeamResultEnvelopeValidator",
  "controlledSyntheticRedTeamResultEnvelopeValidatorRegistry",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath} to exist`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("validator-result package export scope and all controlling sources exist", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }

  assert.match(
    docsText,
    /CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY/,
  );
  assert.match(docsText, /DOCS_ONLY/);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE/);
});

test("future package export transition is exactly four files", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n4/);
  for (const futurePath of futurePaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.match(docsText, /all runtime files\s+remain unchanged/);
});

test("exact package export symbol and schema source path are frozen", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\ncontrolledSyntheticRedTeamResultEnvelopeValidatorResult/,
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/controlled-synthetic-red-team-result-envelope-validator-result\.json`/,
  );
  assert.match(docsText, /one static `require` binding/);
  assert.match(docsText, /one\s+`module\.exports` property/);
});

test("tracked schema identity and structural counts remain exact", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));
  const schema = JSON.parse(readRequired(schemaPath));

  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/controlled-synthetic-red-team-result-envelope-validator-result.json",
  );
  assert.equal(
    schema.title,
    "Controlled Synthetic Red-Team Result Envelope Validator Result Contract",
  );
  assert.equal(schema.required.length, 4);
  assert.equal(Object.keys(schema.properties).length, 4);
  assert.equal(schema.oneOf.length, 2);
  assert.equal(schema.properties.errors.items.oneOf.length, 5);
  assert.equal(schema.properties.errors.uniqueItems, true);

  assert.match(docsText, /exactly four required root properties/);
  assert.match(docsText, /exactly two root state/);
  assert.match(docsText, /exactly five complete code\/path/);
  assert.match(docsText, /`errors\.uniqueItems: true`/);
});

test("existing candidate proof transition removes only the schema export denial", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /remove only the validator-result schema symbol/);
  assert.match(docsText, /test-alignment transition, not deletion of a safety boundary/);
  for (const blockedExport of retainedBlockedExports) {
    assert.equal(docsText.includes("- `" + blockedExport + "`"), true, blockedExport);
  }
  assert.match(docsText, /candidate export symbol and candidate schema proof remain unchanged/);
});

test("schema proof transition removes only the obsolete package absence assertion", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /## 7\. Exact Schema-Proof Transition/);
  assert.match(docsText, /remove the package-index source read used only by that obsolete absence check/);
  assert.match(docsText, /remove only the assertion that the validator-result schema path is absent/);
  assert.match(docsText, /align the affected test description/);
  assert.match(docsText, /every structural validator-result schema assertion unchanged/);
  assert.match(docsText, /authorizes no validator or execution behavior/);
});

test("future proof remains static schema-object export proof only", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /exported value is deeply equal and strictly identical/);
  assert.match(docsText, /exact four root properties, two state branches, five error branches/);
  assert.match(docsText, /pre-existing candidate schema export remains unchanged/);
  assert.match(docsText, /no validator execution, dispatch, API, persistence, provider, model/);
  assert.match(docsText, /does not prove that the package export exists/);
});

test("scope preserves non-implementation release and no-conclusion boundaries", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_EXECUTED_MODEL_RUN_EVIDENCE_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker));
  }

  assert.match(docsText, /Human\/professional\s+review remains the release gate/);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/);
});
