const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);

const sourcePaths = [
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md",
  "schemas/no-raw-metadata-manifest.json",
  "tests/no-raw-metadata-manifest-schema.test.js",
  "packages/schemas/src/index.js",
];

const expectedFields = [
  "contractVersion",
  "contractKind",
  "caseId",
  "outputType",
  "actionClass",
  "escalationTarget",
  "safeNextAction",
  "syntheticCorpusPosture",
  "realEvidencePosture",
  "humanProfessionalReviewRequired",
];

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, `expected ${filePath} to exist`);
  return fs.readFileSync(filePath, "utf8");
}

function section(text, heading, nextHeading) {
  const start = text.indexOf(heading);
  assert.notEqual(start, -1, `expected ${heading}`);
  const end = nextHeading ? text.indexOf(nextHeading, start + heading.length) : -1;
  return text.slice(start, end === -1 ? undefined : end);
}

function tableRows(text, heading, nextHeading, pattern) {
  return section(text, heading, nextHeading)
    .split("\n")
    .filter((line) => pattern.test(line))
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.replaceAll("`", "").trim()),
    );
}

test("scaffold scope references contract truth and repository convention evidence", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    assert.equal(fs.existsSync(path.join(repoRoot, sourcePath)), true, sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(docsText, /Convention evidence supplies file layout, JSON Schema draft/);
  assert.match(docsText, /does not supply result-envelope fields, values/);
});

test("smallest future contract-only file scope contains exactly schema and proof test", () => {
  const docsText = readRequired(docsPath);
  const rows = tableRows(
    docsText,
    "## 3. Exact Future File Scope",
    "## 4. Exact Future Schema Identity",
    /^\| \d+ \| `(?:schemas|tests)\//,
  );

  assert.deepEqual(rows, [
    [
      "1",
      "schemas/controlled-synthetic-red-team-result-envelope.json",
      "FUTURE_CONTRACT_ONLY_SCHEMA_CANDIDATE",
    ],
    [
      "2",
      "tests/controlled-synthetic-red-team-result-envelope-schema.test.js",
      "FUTURE_CONTRACT_ONLY_PROOF_TEST_CANDIDATE",
    ],
  ]);
  assert.match(docsText, /FUTURE_SCHEMA_SLICE_FILE_COUNT:\n2/);
  assert.match(docsText, /No package export, package validator, validator-result schema/);
});

test("future schema identity follows the exact tracked repository convention", () => {
  const docsText = readRequired(docsPath);
  const rows = tableRows(
    docsText,
    "## 4. Exact Future Schema Identity",
    "## 5. Exact Future Root Shape",
    /^\| `[^`]+` \|/,
  );

  assert.deepEqual(rows, [
    ["$schema", "https://json-schema.org/draft/2020-12/schema"],
    [
      "$id",
      "https://governance-contracts.invalid/schemas/controlled-synthetic-red-team-result-envelope.json",
    ],
    ["title", "Controlled Synthetic Red-Team Result Envelope Contract"],
    ["type", "object"],
    ["additionalProperties", "false"],
  ]);
  assert.match(docsText, /local `\$id` is\nnot a network endpoint/);
});

test("future root shape freezes exact ten properties and constraints", () => {
  const docsText = readRequired(docsPath);
  const rows = tableRows(
    docsText,
    "## 5. Exact Future Root Shape",
    "## 6. Exact 26-Row Encoding Scope",
    /^\| \d+ \| `[a-z][A-Za-z]+` \|/,
  );

  assert.deepEqual(rows.map((row) => Number(row[0])), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(rows.map((row) => row[1]), expectedFields);
  assert.deepEqual(rows.map((row) => row[2]), [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "boolean",
  ]);
  assert.match(docsText, /FUTURE_SCHEMA_REQUIRED_PROPERTY_COUNT:\n10/);
  assert.match(docsText, /FUTURE_SCHEMA_OPTIONAL_PROPERTIES:\nNONE/);
  assert.match(docsText, /FUTURE_SCHEMA_ADDITIONAL_PROPERTIES:\nFALSE/);
  assert.match(docsText, /must not claim that JSON Schema enforces input object-member order/);
});

test("future case mapping uses exactly 26 complete oneOf branches", () => {
  const docsText = readRequired(docsPath);
  const encodingSection = section(
    docsText,
    "## 6. Exact 26-Row Encoding Scope",
    "## 7. Separate Sibling Surfaces",
  );
  const branchFields = encodingSection
    .split("\n")
    .filter((line) => /^\d+\. `[a-z][A-Za-z]+`$/.test(line))
    .map((line) => line.match(/^\d+\. `([^`]+)`$/)[1]);

  assert.match(encodingSection, /FUTURE_SCHEMA_CASE_BRANCH_KEYWORD:\noneOf/);
  assert.match(encodingSection, /FUTURE_SCHEMA_CASE_BRANCH_COUNT:\n26/);
  assert.deepEqual(branchFields, [
    "caseId",
    "outputType",
    "actionClass",
    "escalationTarget",
    "safeNextAction",
  ]);
  assert.match(encodingSection, /No branch may mix values\nfrom different cases/);
  assert.match(encodingSection, /Separate global enums.*are insufficient/s);
  assert.match(encodingSection, /NO_OVERCLAIM_WARNING \+ OWNER_DECISION_REQUEST/);
});

test("package export validator-result validator dispatch and runtime remain separate", () => {
  const docsText = readRequired(docsPath);
  const rows = tableRows(
    docsText,
    "## 7. Separate Sibling Surfaces",
    "## 8. Exact Future Proof Scope",
    /^\| (?:package|validator|validation|persistence)/,
  );

  assert.deepEqual(rows.map((row) => row[1]), [
    "SEPARATE_LATER_CONTRACT_ONLY_SLICE",
    "SEPARATE_LATER_CONTRACT_ONLY_SLICE",
    "SEPARATE_LATER_CONTRACT_ONLY_SLICE",
    "SEPARATE_LATER_CONTRACT_ONLY_SLICE",
    "OUT_OF_SCOPE_NOT_AUTHORIZED",
  ]);
  assert.match(docsText, /Nothing in the future candidate-envelope schema may be described as enforcing/);
});

test("all six readiness questions receive scope answers without creating files", () => {
  const docsText = readRequired(docsPath);
  const rows = tableRows(
    docsText,
    "## 9. Resolved Readiness Questions",
    "## 10. Non-Interference Rules",
    /^\| \d+ \|/,
  );

  assert.equal(rows.length, 6);
  assert.deepEqual(rows.map((row) => Number(row[0])), [1, 2, 3, 4, 5, 6]);
  assert.match(docsText, /RESOLVED_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/);
  assert.match(docsText, /These answers define only future file and proof scope/);
});

test("scope remains docs-only non-runtime non-authorizing and source-safe", () => {
  const docsText = readRequired(docsPath);

  for (const token of [
    "DOCS_ONLY",
    "APPEND_ONLY_SCHEMA_SCAFFOLD_SCOPE",
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_EXECUTED_MODEL_RUN_EVIDENCE_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(token), true, token);
  }

  assert.match(docsText, /does not prove schema correctness, validator correctness/i);
  assert.match(docsText, /not actual human review, professional review,/i);
  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
