const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SCHEMA_READINESS_BOUNDARY_v1.md",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
);

const sourcePaths = [
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_READINESS_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/no-raw-metadata-manifest.json",
  "packages/schemas/src/index.js",
  "tests/no-raw-metadata-manifest-schema.test.js",
];

const expectedCandidateFields = [
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

function contractCaseRows(text) {
  return section(
    text,
    "## 5. Exact Canonical Case Mapping",
    "## 6. Exact Posture Contract",
  )
    .split("\n")
    .filter((line) => /^\| `[A-Z]+-\d{3}` \|/.test(line));
}

test("schema-readiness boundary references contract truth and comparison evidence", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    assert.equal(fs.existsSync(path.join(repoRoot, sourcePath)), true, sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(docsText, /Comparison evidence supplies repository process and structural patterns only/);
});

test("readiness classification separates exact facts from open scaffold scope", () => {
  const docsText = readRequired(docsPath);
  const rows = tableRows(
    docsText,
    "## 3. Schema-Readiness Classification",
    "## 4. Exact Future Candidate-Envelope Fields",
    /^\| [a-z0-9-]/,
  );

  assert.equal(rows.length, 16);
  assert.deepEqual(rows.slice(-3).map((row) => row[1]), [
    "OPEN_FOR_SEPARATE_SCAFFOLD_SCOPE",
    "OPEN_FOR_SEPARATE_SCAFFOLD_SCOPE",
    "OPEN_FOR_SEPARATE_SCAFFOLD_SCOPE",
  ]);
  assert.match(
    docsText,
    /SCHEMA_READINESS_RESULT:\nREADY_FOR_SEPARATE_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_REVIEW/,
  );
  assert.match(docsText, /SCHEMA_IMPLEMENTATION_STATUS:\nNOT_CREATED/);
});

test("exact ten-field candidate schema surface matches the tracked contract", () => {
  const docsText = readRequired(docsPath);
  const contractText = readRequired(contractPath);
  const readinessRows = tableRows(
    docsText,
    "## 4. Exact Future Candidate-Envelope Fields",
    "## 5. Exact Future Fixed Values",
    /^\| \d+ \| `[a-z][A-Za-z]+` \|/,
  );
  const contractRows = tableRows(
    contractText,
    "## 4. Exact Candidate Envelope Shape",
    "## 5. Exact Canonical Case Mapping",
    /^\| \d+ \| `[a-z][A-Za-z]+` \|/,
  );

  assert.deepEqual(readinessRows.map((row) => row[1]), expectedCandidateFields);
  assert.deepEqual(readinessRows.map((row) => row[1]), contractRows.map((row) => row[1]));
  assert.deepEqual(readinessRows.map((row) => row[2]), contractRows.map((row) => row[2]));
  assert.match(docsText, /FUTURE_SCHEMA_CANDIDATE_FIELD_COUNT:\n10/);
  assert.match(docsText, /FUTURE_SCHEMA_REQUIRED_FIELDS:\nALL_TEN/);
  assert.match(docsText, /FUTURE_SCHEMA_OPTIONAL_FIELDS:\nNONE/);
  assert.match(docsText, /FUTURE_SCHEMA_ADDITIONAL_FIELDS:\nNONE/);
});

test("fixed values and exact case-mapping requirements remain contract-bound", () => {
  const docsText = readRequired(docsPath);
  const contractText = readRequired(contractPath);
  const fixedRows = tableRows(
    docsText,
    "## 5. Exact Future Fixed Values",
    "## 6. Exact Case-Mapping Readiness",
    /^\| `[a-z][A-Za-z]+` \|/,
  );

  assert.deepEqual(fixedRows, [
    ["contractVersion", "v1", "string"],
    ["contractKind", "CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE", "string"],
    ["syntheticCorpusPosture", "SYNTHETIC_CONTROL_CORPUS_ONLY", "string"],
    ["realEvidencePosture", "NO_REAL_EVIDENCE", "string"],
    ["humanProfessionalReviewRequired", "true", "boolean"],
  ]);
  assert.equal(contractCaseRows(contractText).length, 26);
  assert.match(docsText, /FUTURE_SCHEMA_CANONICAL_CASE_COUNT:\n26/);
  assert.match(docsText, /FUTURE_SCHEMA_CASE_MAPPING_REQUIREMENT:\nEXACT_COMPLETE_ROW_EQUALITY/);
  assert.match(docsText, /GLOBAL_ENUM_MEMBERSHIP_ALONE:\nINSUFFICIENT_FOR_CASE_MAPPING/);
  assert.match(docsText, /NO_OVERCLAIM_WARNING \+ OWNER_DECISION_REQUEST/);
});

test("candidate and validator-result schema questions remain separate", () => {
  const docsText = readRequired(docsPath);
  const validatorRows = tableRows(
    docsText,
    "## 7. Separate Validator-Result Readiness",
    "Its identity is exactly:",
    /^\| \d+ \| `[a-z][A-Za-z]+` \|/,
  );

  assert.deepEqual(validatorRows.map((row) => row[1]), [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.match(docsText, /does not decide whether a later candidate-envelope schema/);
  assert.match(docsText, /does not create either\nschema and does not create a validator/);
  assert.match(docsText, /JSON Schema structure alone must not be claimed to enforce validation phase/);
});

test("all six scaffold-scope questions remain open and no path is selected", () => {
  const docsText = readRequired(docsPath);
  const openSection = section(
    docsText,
    "## 9. Open Scaffold-Scope Questions",
    "## 10. Non-Interference Rules",
  );
  const questions = openSection
    .split("\n")
    .filter((line) => /^\d+\. /.test(line));

  assert.equal(questions.length, 6);
  assert.match(openSection, /exact candidate-envelope schema file path and title/);
  assert.match(openSection, /exact representation of all 26 complete case-row bindings/);
  assert.match(openSection, /whether validator-result schema representation remains a later sibling slice/);
  assert.match(docsText, /OPEN_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/);
});

test("readiness remains docs-only, non-runtime, non-authorizing, and source-safe", () => {
  const docsText = readRequired(docsPath);

  for (const token of [
    "DOCS_ONLY",
    "APPEND_ONLY_SCHEMA_READINESS_REVIEW",
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
    "TRACKED_DOCS_ONLY_SCHEMA_READINESS_WITH_OPEN_SCAFFOLD_SCOPE",
  ]) {
    assert.equal(docsText.includes(token), true, token);
  }

  assert.match(docsText, /does not prove schema correctness, validator correctness/i);
  assert.match(docsText, /not actual human review, professional review,/i);
  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /https?:\/\//);
  assert.doesNotMatch(docsText, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
