const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
);

const canonicalPaths = [
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_v1.md",
];

const separationPaths = [
  "schemas/controlled-synthetic-red-team-result-envelope.json",
  "tests/controlled-synthetic-red-team-result-envelope-schema.test.js",
  "packages/schemas/src/index.js",
  "tests/controlled-synthetic-red-team-result-envelope-package-export.test.js",
];

const expectedCodes = [
  "INVALID_TYPE",
  "MISSING_FIELD",
  "UNKNOWN_FIELD",
  "INVALID_ENUM",
  "INVALID_BOOLEAN",
];

const expectedPaths = [
  "$",
  "$.contractVersion",
  "$.contractKind",
  "$.caseId",
  "$.outputType",
  "$.actionClass",
  "$.escalationTarget",
  "$.safeNextAction",
  "$.syntheticCorpusPosture",
  "$.realEvidencePosture",
  "$.humanProfessionalReviewRequired",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath} to exist`);
  return fs.readFileSync(absolutePath, "utf8");
}

function numberedValues(text, heading, endMarker) {
  const start = text.indexOf(heading);
  assert.notEqual(start, -1, heading);
  const end = text.indexOf(endMarker, start + heading.length);
  assert.notEqual(end, -1, endMarker);
  const section = text.slice(start, end);
  return section
    .split("\n")
    .filter((line) => /^\d+\. `/.test(line))
    .map((line) => line.replace(/^\d+\. `/, "").replace(/`$/, ""));
}

test("validator-result schema readiness boundary and all sources exist", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const sourcePath of [...canonicalPaths, ...separationPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(sourcePath), true, sourcePath);
  }

  assert.match(
    docsText,
    /CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY/,
  );
  assert.match(docsText, /DOCS_ONLY/);
  assert.match(docsText, /APPEND_ONLY_SCHEMA_READINESS_ASSESSMENT/);
});

test("candidate schema remains a separate tracked and exported sibling", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));
  const candidateSchema = JSON.parse(readRequired(separationPaths[0]));
  const packageSchemas = require("../packages/schemas/src/index.js");

  assert.deepEqual(packageSchemas.controlledSyntheticRedTeamResultEnvelope, candidateSchema);
  assert.equal(Object.hasOwn(candidateSchema.properties, "valid"), false);
  assert.equal(Object.hasOwn(candidateSchema.properties, "errors"), false);
  assert.match(docsText, /CANDIDATE_ENVELOPE_SCHEMA_STATUS:\nTRACKED_AND_PACKAGE_EXPORTED/);
  assert.match(docsText, /VALIDATOR_RESULT_SCHEMA_STATUS:\nNOT_CREATED/);
});

test("exact four-field result and two-field error-item facts are available", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /VALIDATOR_RESULT_FIELD_COUNT:\n4/);
  assert.match(docsText, /VALIDATOR_RESULT_REQUIRED_FIELDS:\nALL_FOUR/);
  assert.match(docsText, /VALIDATOR_RESULT_OPTIONAL_FIELDS:\nNONE/);
  assert.match(docsText, /VALIDATOR_RESULT_ADDITIONAL_FIELDS:\nNONE/);
  assert.match(docsText, /\| 1 \| `valid` \| boolean \|/);
  assert.match(docsText, /\| 2 \| `contractKind` \| string \|/);
  assert.match(docsText, /\| 3 \| `version` \| string \|/);
  assert.match(docsText, /\| 4 \| `errors` \| array \|/);

  assert.match(docsText, /VALIDATION_ERROR_ITEM_FIELD_COUNT:\n2/);
  assert.match(docsText, /VALIDATION_ERROR_ITEM_REQUIRED_FIELDS:\nBOTH/);
  assert.match(docsText, /VALIDATION_ERROR_ITEM_OPTIONAL_FIELDS:\nNONE/);
  assert.match(docsText, /VALIDATION_ERROR_ITEM_ADDITIONAL_FIELDS:\nNONE/);
});

test("success and failure coupling remains exact", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.match(docsText, /`valid: true` if and only if `errors` is empty/);
  assert.match(docsText, /`valid: false` if and only if `errors` is non-empty/);
  assert.match(docsText, /two mutually exclusive result states/);
});

test("five codes and eleven paths remain exact and ordered", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  assert.deepEqual(
    numberedValues(docsText, "The exact error codes", "The exact paths"),
    expectedCodes,
  );
  assert.deepEqual(
    numberedValues(docsText, "The exact paths", "VALIDATION_ERROR_CODE_COUNT:"),
    expectedPaths,
  );
  assert.match(docsText, /VALIDATION_ERROR_CODE_COUNT:\n5/);
  assert.match(docsText, /VALIDATION_ERROR_PATH_COUNT:\n11/);
  assert.match(docsText, /No additional code or dynamic path is authorized/);
});

test("complete code-to-path partition is available", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const code of expectedCodes) {
    assert.equal(docsText.includes("| `" + code + "` |"), true, code);
  }

  assert.match(docsText, /Independent global code and path enums\n+alone would be insufficient/);
  assert.match(docsText, /complete code\/path branch equality/);
});

test("schema-expressible and validator-only rules remain separated", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

  for (const phrase of [
    "exact root and error-item keys",
    "exact code-to-path pair partition",
    "empty-errors/success versus non-empty-errors/failure coupling",
    "rejection of duplicate structurally identical error items",
    "five-phase validation execution order",
    "root-type short-circuit execution",
    "accessor non-execution",
    "deep immutability of returned results",
    "no-echo behavior during validation execution",
  ]) {
    assert.equal(docsText.includes(phrase), true, phrase);
  }

  assert.match(docsText, /SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:\nTRUE/);
});

test("exactly six scaffold-scope questions remain open", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));
  const sectionStart = docsText.indexOf("## 9. Open Scaffold-Scope Questions");
  const sectionEnd = docsText.indexOf("## 10.", sectionStart);
  const section = docsText.slice(sectionStart, sectionEnd);

  assert.equal((section.match(/^\d+\. /gm) ?? []).length, 6);
  assert.match(
    docsText,
    /OPEN_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/,
  );
  assert.match(docsText, /No answer is inferred by this readiness assessment/);
});

test("readiness remains docs-only and non-authorizing", () => {
  const docsText = readRequired(path.relative(repoRoot, docsPath));

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
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_READINESS_ASSESSED",
  ]) {
    assert.match(docsText, new RegExp(marker));
  }

  assert.match(
    docsText,
    /VALIDATOR_RESULT_SCHEMA_READINESS:\nREADY_FOR_DOCS_ONLY_SCAFFOLD_SCOPE_DECISION/,
  );
  assert.match(docsText, /VALIDATOR_IMPLEMENTATION_READINESS:\nNOT_CREATED/);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/);
});
