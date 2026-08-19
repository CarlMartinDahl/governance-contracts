"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";

const controllingPaths = [
  "schemas/human-review-source-register.json",
  "tests/human-review-source-register-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
];

const conventionPaths = [
  "packages/schemas/src/index.js",
  "tests/no-raw-metadata-manifest-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
];

const futurePaths = [
  "packages/schemas/src/index.js",
  "tests/human-review-source-register-package-export.test.js",
];

const blockedSiblingExports = [
  "humanReviewSourceRegisterValidatorResult",
  "humanReviewSourceRegisterValidator",
  "validateHumanReviewSourceRegister",
  "getHumanReviewSourceRegisterValidator",
  "humanReviewSourceRegisterValidatorRegistry",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("Source Register package export scope and tracked sources exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of [...controllingPaths, ...conventionPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_SOURCE_REGISTER_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE/u);
});

test("future package export slice is exactly two files", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(docsText, /FUTURE_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/u);
  for (const futurePath of futurePaths) {
    assert.equal(docsText.includes(`\`${futurePath}\``), true, futurePath);
  }

  assert.match(
    docsText,
    /tracked schema file and its existing schema proof test must remain\nunchanged/u,
  );
});

test("exact future package export symbol and source path are frozen", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewSourceRegister/u,
  );
  assert.equal(docsText.includes("`humanReviewSourceRegister`"), true);
  assert.equal(
    docsText.includes("`../../../schemas/human-review-source-register.json`"),
    true,
  );
  assert.match(docsText, /one static `require` binding/u);
  assert.match(docsText, /one `module\.exports` property/u);
});

test("tracked schema identity and structural counts remain unchanged facts", () => {
  const docsText = readRequired(docsRelativePath);
  const schema = JSON.parse(readRequired(controllingPaths[0]));
  const sourceEntry = schema.$defs.sourceEntry;

  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-source-register.json",
  );
  assert.equal(schema.title, "Human Review Source Register Contract Scaffold");
  assert.equal(schema.required.length, 4);
  assert.equal(Object.keys(schema.properties).length, 4);
  assert.equal(sourceEntry.required.length, 3);
  assert.equal(Object.keys(sourceEntry.properties).length, 3);
  assert.equal(
    sourceEntry.properties.declared_source_type.enum.length,
    7,
  );

  assert.match(docsText, /exactly four required root properties/u);
  assert.match(docsText, /exactly three required source-entry properties/u);
  assert.match(docsText, /exactly seven declared source-type values/u);
  assert.match(docsText, /does not change or reinterpret that schema/u);
});

test("validator result validator dispatch source use and runtime stay separate", () => {
  const docsText = readRequired(docsRelativePath);

  for (const blockedExport of blockedSiblingExports) {
    assert.equal(docsText.includes(`- \`${blockedExport}\``), true, blockedExport);
  }

  for (const marker of [
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /SEPARATE_LATER_CONTRACT_ONLY_SLICE/u);
  assert.match(docsText, /OUT_OF_SCOPE_NOT_AUTHORIZED/u);
});

test("future proof remains schema-object export proof only", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /exported object is deeply equal to the tracked JSON schema object/u,
  );
  assert.match(docsText, /exported `\$id` and title equal/u);
  assert.match(docsText, /four-field root, three-field\n  source-entry/u);
  assert.match(docsText, /adds no validation execution, persistence, API,/u);
  assert.match(docsText, /does not prove that the package export exists/u);
});

test("scope preserves release and no-conclusion boundaries", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /Human\/professional\nreview remains the release gate/u);
  assert.match(docsText, /not actual human review/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
