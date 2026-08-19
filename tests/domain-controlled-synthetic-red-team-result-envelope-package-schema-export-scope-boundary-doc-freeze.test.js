const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);

const controllingPaths = [
  "schemas/controlled-synthetic-red-team-result-envelope.json",
  "tests/controlled-synthetic-red-team-result-envelope-schema.test.js",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
];

const conventionPaths = [
  "packages/schemas/src/index.js",
  "tests/no-raw-metadata-manifest-package-export.test.js",
];

const futurePaths = [
  "packages/schemas/src/index.js",
  "tests/controlled-synthetic-red-team-result-envelope-package-export.test.js",
];

const blockedSiblingExports = [
  "controlledSyntheticRedTeamResultEnvelopeValidatorResult",
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

test("package schema export scope boundary and all tracked sources exist", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const sourcePath of [...controllingPaths, ...conventionPaths]) {
    readRequired(sourcePath);
    assert.match(docsText, new RegExp(sourcePath.replaceAll("/", "\\/")));
  }

  assert.match(
    docsText,
    /CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY/,
  );
  assert.match(docsText, /DOCS_ONLY/);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE/);
});

test("future package export slice is exactly two files", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /FUTURE_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/);
  for (const futurePath of futurePaths) {
    assert.match(docsText, new RegExp(futurePath.replaceAll("/", "\\/")));
  }

  assert.match(docsText, /tracked schema file and its existing schema proof test must remain\nunchanged/);
});

test("exact future package export symbol and source path are frozen", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(
    docsText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\ncontrolledSyntheticRedTeamResultEnvelope/,
  );
  assert.match(
    docsText,
    /`controlledSyntheticRedTeamResultEnvelope`/,
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/controlled-synthetic-red-team-result-envelope\.json`/,
  );
  assert.match(docsText, /one static `require` binding/);
  assert.match(docsText, /one `module\.exports` property/);
});

test("tracked schema identity and structural counts remain unchanged facts", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));
  const schema = JSON.parse(readRequired(controllingPaths[0]));

  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/controlled-synthetic-red-team-result-envelope.json",
  );
  assert.equal(schema.title, "Controlled Synthetic Red-Team Result Envelope Contract");
  assert.equal(schema.required.length, 10);
  assert.equal(Object.keys(schema.properties).length, 10);
  assert.equal(schema.oneOf.length, 26);

  assert.match(docsText, /exactly ten required root properties/);
  assert.match(docsText, /exactly 26 complete-row/);
  assert.match(docsText, /does not change or reinterpret that schema/);
});

test("validator-result validator dispatch and runtime stay separate", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const blockedExport of blockedSiblingExports) {
    assert.equal(docsText.includes("- `" + blockedExport + "`"), true, blockedExport);
  }

  for (const marker of [
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
  ]) {
    assert.match(docsText, new RegExp(marker));
  }

  assert.match(docsText, /SEPARATE_LATER_CONTRACT_ONLY_SLICE/);
  assert.match(docsText, /OUT_OF_SCOPE_NOT_AUTHORIZED/);
});

test("future proof remains schema-object export proof only", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /exported object is deeply equal to the tracked JSON schema object/);
  assert.match(docsText, /exported `\$id` and title equal the tracked schema identity/);
  assert.match(docsText, /preserves the exact ten-property and 26-branch shape/);
  assert.match(docsText, /adds no runtime, API, persistence, provider,/);
  assert.match(docsText, /does not prove that the package export exists/);
});

test("scope preserves release and no-conclusion boundaries", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const marker of [
    "NO_EXECUTED_MODEL_RUN_EVIDENCE_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker));
  }

  assert.match(docsText, /Human\/professional\s+review remains the release gate/);
  assert.match(docsText, /not actual human review/);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/);
});
