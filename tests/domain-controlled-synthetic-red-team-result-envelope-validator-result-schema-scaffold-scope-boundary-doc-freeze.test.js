const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);

const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
];

const conventionPaths = [
  "schemas/controlled-synthetic-red-team-result-envelope.json",
  "tests/controlled-synthetic-red-team-result-envelope-schema.test.js",
  "schemas/no-raw-metadata-manifest.json",
];

const futurePaths = [
  "schemas/controlled-synthetic-red-team-result-envelope-validator-result.json",
  "tests/controlled-synthetic-red-team-result-envelope-validator-result-schema.test.js",
];

const resultFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const codes = [
  "INVALID_TYPE",
  "MISSING_FIELD",
  "UNKNOWN_FIELD",
  "INVALID_ENUM",
  "INVALID_BOOLEAN",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath} to exist`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("validator-result schema scaffold scope and all sources exist", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const sourcePath of [...controllingPaths, ...conventionPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(sourcePath), true, sourcePath);
  }

  assert.match(
    docsText,
    /CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY/,
  );
  assert.match(docsText, /DOCS_ONLY/);
  assert.match(docsText, /APPEND_ONLY_SCHEMA_SCAFFOLD_SCOPE/);
});

test("future schema slice is exactly two files", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_SCHEMA_SLICE_FILE_COUNT:\n2/);
  for (const futurePath of futurePaths) {
    assert.equal(docsText.includes(futurePath), true, futurePath);
  }
  assert.match(docsText, /candidate-envelope schema, package index, and all runtime files remain\nunchanged/);
});

test("future schema identity is exact", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const value of [
    "https://json-schema.org/draft/2020-12/schema",
    "https://governance-contracts.invalid/schemas/controlled-synthetic-red-team-result-envelope-validator-result.json",
    "Controlled Synthetic Red-Team Result Envelope Validator Result Contract",
  ]) {
    assert.equal(docsText.includes(value), true, value);
  }

  assert.match(docsText, /\| `type` \| `object` \|/);
  assert.match(docsText, /\| `additionalProperties` \| `false` \|/);
});

test("four-field root shape and exact identity literals are frozen", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const field of resultFields) {
    assert.equal(docsText.includes("`" + field + "`"), true, field);
  }
  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_REQUIRED_PROPERTY_COUNT:\n4/);
  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_OPTIONAL_PROPERTIES:\nNONE/);
  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_ADDITIONAL_PROPERTIES:\nFALSE/);
  assert.match(
    docsText,
    /CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_BOUNDARY/,
  );
  assert.match(docsText, /`const: "v1"`/);
});

test("two-state root oneOf encoding is exact", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_KEYWORD:\noneOf/);
  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_COUNT:\n2/);
  assert.match(docsText, /`valid const true`; `errors maxItems 0`/);
  assert.match(docsText, /`valid const false`; `errors minItems 1`/);
  assert.match(docsText, /Each state branch may constrain only `valid` and `errors`/);
});

test("inline error item remains an exact closed two-field object", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const field of errorFields) {
    assert.equal(docsText.includes("`" + field + "`"), true, field);
  }
  assert.match(docsText, /`required: \["code", "path"\]`/);
  assert.match(docsText, /FUTURE_VALIDATION_ERROR_ITEM_REQUIRED_PROPERTY_COUNT:\n2/);
  assert.match(docsText, /FUTURE_VALIDATION_ERROR_ITEM_OPTIONAL_PROPERTIES:\nNONE/);
  assert.match(docsText, /FUTURE_VALIDATION_ERROR_ITEM_ADDITIONAL_PROPERTIES:\nFALSE/);
  assert.match(docsText, /No `\$defs`, dynamic reference/);
});

test("five complete code-to-path branches are frozen in order", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));
  const sectionStart = docsText.indexOf("## 8. Exact Five Code-to-Path Branches");
  const sectionEnd = docsText.indexOf("## 9.", sectionStart);
  const section = docsText.slice(sectionStart, sectionEnd);

  assert.match(section, /FUTURE_VALIDATION_ERROR_CODE_PATH_BRANCH_KEYWORD:\noneOf/);
  assert.match(section, /FUTURE_VALIDATION_ERROR_CODE_PATH_BRANCH_COUNT:\n5/);
  assert.deepEqual(
    [...section.matchAll(/^\| \d+ \| `([^`]+)` \|/gm)].map((match) => match[1]),
    codes,
  );
  assert.match(section, /\| 3 \| `UNKNOWN_FIELD` \| `\$` \|/);
  assert.match(
    section,
    /\| 5 \| `INVALID_BOOLEAN` \| `\$\.humanProfessionalReviewRequired` \|/,
  );
  assert.match(section, /Independent global code and path enums/);
  assert.match(section, /complete pair equality/);
});

test("duplicate boundary uses uniqueItems without claiming validator ordering", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /`uniqueItems: true`/);
  assert.match(docsText, /FUTURE_VALIDATION_ERROR_ARRAY_UNIQUE_ITEMS:\nTRUE/);
  assert.match(docsText, /does\s+not implement first-occurrence retention/);
  assert.match(docsText, /five-phase validation execution order/);
  assert.match(docsText, /no-echo behavior during validation execution/);
});

test("package export validator dispatch and runtime remain separate", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /package schema export in `packages\/schemas\/src\/index\.js`/);
  assert.match(docsText, /SEPARATE_LATER_CONTRACT_ONLY_SLICE/);
  assert.match(docsText, /OUT_OF_SCOPE_NOT_AUTHORIZED/);
  assert.match(docsText, /No package export belongs to the smallest future validator-result schema slice/);
});

test("all six readiness questions are resolved without creating schema or behavior", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));
  const sectionStart = docsText.indexOf("## 13. Resolved Readiness Questions");
  const sectionEnd = docsText.indexOf("## 14.", sectionStart);
  const section = docsText.slice(sectionStart, sectionEnd);

  assert.equal((section.match(/^\| \d+ \|/gm) ?? []).length, 6);
  assert.match(
    docsText,
    /RESOLVED_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/,
  );

  for (const marker of [
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
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
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker));
  }

  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/);
});
