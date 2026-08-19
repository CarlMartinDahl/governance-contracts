const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
);
const taxonomyPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md",
);

const sourcePaths = [
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_READINESS_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_IDENTITY_VERSION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SINGLE_CASE_TOP_LEVEL_SHAPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CORPUS_REFERENCE_REPRESENTATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_COMPOSITE_OUTPUT_TYPE_REPRESENTATION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_POSTURE_FIELDS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PROHIBITED_FIELD_DENY_LIST_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md",
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

const expectedDenyFamilies = [
  "RAW_MATERIAL",
  "PRIVATE_MATERIAL",
  "SOURCE_CONTENT_OR_LOCATOR",
  "PROMPT_CONTENT",
  "RESPONSE_CONTENT",
  "REASONING_TRACE",
  "PROVIDER_IDENTITY",
  "MODEL_IDENTITY",
  "RUN_IDENTITY_OR_EXECUTION_METADATA",
  "FINDING",
  "SCORE_OR_RANKING",
  "CONCLUSION_OR_TRUTH_CLAIM",
  "APPROVAL_CERTIFICATION_OR_SIGN_OFF",
  "RUNTIME_READINESS_OR_ENFORCEMENT_CLAIM",
];

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, `expected ${filePath} to exist`);
  return fs.readFileSync(filePath, "utf8");
}

function section(text, heading, nextHeading) {
  const start = text.indexOf(heading);
  assert.notEqual(start, -1, `expected section ${heading}`);
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

function canonicalTaxonomyRows(text) {
  return text
    .split("\n")
    .filter((line) => /^\| [A-Z]+-\d{3} \|/.test(line))
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.replaceAll("`", "").trim()),
    );
}

test("result-envelope contract references every controlling tracked source", () => {
  const docsText = readRequired(contractPath);

  for (const sourcePath of sourcePaths) {
    assert.equal(fs.existsSync(path.join(repoRoot, sourcePath)), true, sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }
});

test("candidate contract freezes exact identity, cardinality, and ten-field order", () => {
  const docsText = readRequired(contractPath);
  const rows = tableRows(
    docsText,
    "## 4. Exact Candidate Envelope Shape",
    "## 5. Exact Canonical Case Mapping",
    /^\| \d+ \| `[a-z][A-Za-z]+` \|/,
  );

  assert.deepEqual(rows.map((row) => Number(row[0])), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(rows.map((row) => row[1]), expectedCandidateFields);
  assert.match(docsText, /CANDIDATE_ENVELOPE_CONTRACT_VERSION:\nv1/);
  assert.match(
    docsText,
    /CANDIDATE_ENVELOPE_CONTRACT_KIND:\nCONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE/,
  );
  assert.match(docsText, /ENVELOPE_CARDINALITY:\nSINGLE_CASE_FLAT_OBJECT_ONLY/);
  assert.match(docsText, /TOP_LEVEL_FIELD_COUNT:\n10/);
  assert.match(docsText, /OPTIONAL_TOP_LEVEL_FIELDS:\nNONE/);
  assert.match(docsText, /ADDITIONAL_TOP_LEVEL_FIELDS:\nNONE/);
});

test("all 26 exact case rows match the canonical four-field taxonomy", () => {
  const docsText = readRequired(contractPath);
  const taxonomyText = readRequired(taxonomyPath);
  const contractRows = tableRows(
    docsText,
    "## 5. Exact Canonical Case Mapping",
    "## 6. Exact Posture Contract",
    /^\| `[A-Z]+-\d{3}` \|/,
  );
  const taxonomyRows = canonicalTaxonomyRows(taxonomyText);

  assert.equal(contractRows.length, 26);
  assert.equal(new Set(contractRows.map((row) => row[0])).size, 26);
  assert.deepEqual(contractRows, taxonomyRows);
  assert.deepEqual(
    contractRows.filter((row) => row[1].includes(" + ")).map((row) => [row[0], row[1]]),
    [
      ["PRODUCT-001", "NO_OVERCLAIM_WARNING + OWNER_DECISION_REQUEST"],
      ["PRODUCT-002", "NO_OVERCLAIM_WARNING + OWNER_DECISION_REQUEST"],
    ],
  );
});

test("posture fields and semantic deny families remain exact and non-expanding", () => {
  const docsText = readRequired(contractPath);
  const postureRows = tableRows(
    docsText,
    "## 6. Exact Posture Contract",
    "## 7. Prohibited Semantic Field Families",
    /^\| `(?:syntheticCorpusPosture|realEvidencePosture|humanProfessionalReviewRequired)` \|/,
  );
  const denyRows = tableRows(
    docsText,
    "## 7. Prohibited Semantic Field Families",
    "## 8. Separate Validator Result Contract",
    /^\| \d+ \| `[A-Z][A-Z_]+` \|/,
  );

  assert.deepEqual(postureRows, [
    ["syntheticCorpusPosture", "SYNTHETIC_CONTROL_CORPUS_ONLY", "string"],
    ["realEvidencePosture", "NO_REAL_EVIDENCE", "string"],
    ["humanProfessionalReviewRequired", "true", "boolean"],
  ]);
  assert.deepEqual(denyRows.map((row) => Number(row[0])), Array.from({ length: 14 }, (_, i) => i + 1));
  assert.deepEqual(denyRows.map((row) => row[1]), expectedDenyFamilies);
  assert.match(docsText, /adds no eleventh field/i);
  assert.match(docsText, /creates no content classifier/i);
});

test("separate validator result and no-echo error item shapes remain exact", () => {
  const docsText = readRequired(contractPath);
  const validatorRows = tableRows(
    docsText,
    "## 8. Separate Validator Result Contract",
    "Each validation error item has exactly this shape:",
    /^\| \d+ \| `[a-z][A-Za-z]+` \|/,
  );
  const errorRows = tableRows(
    docsText,
    "Each validation error item has exactly this shape:",
    "## 9. Exact Validation Error Contract",
    /^\| \d+ \| `[a-z]+` \|/,
  );

  assert.deepEqual(validatorRows.map((row) => row[1]), ["valid", "contractKind", "version", "errors"]);
  assert.deepEqual(errorRows.map((row) => row[1]), ["code", "path"]);
  assert.match(
    docsText,
    /CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_BOUNDARY/,
  );
  assert.match(docsText, /`valid` is `true` if and only if `errors` is empty/);
  assert.match(docsText, /`valid` is `false` if and only if `errors` is non-empty/);
  assert.match(docsText, /rejected key, or a rejected value/);
});

test("error taxonomy, paths, partitions, phases, and field order remain exact", () => {
  const docsText = readRequired(contractPath);
  const codeRows = tableRows(
    docsText,
    "The only validation error codes are:",
    "The only validation paths are:",
    /^\| \d+ \| `[A-Z_]+` \|/,
  );
  const pathRows = tableRows(
    docsText,
    "The only validation paths are:",
    "The exact code-to-path partition is:",
    /^\| \d+ \| `[^`]+` \|/,
  );
  const partitionRows = tableRows(
    docsText,
    "The exact code-to-path partition is:",
    "## 10. Deterministic Validation Ordering",
    /^\| `[A-Z_]+` \|/,
  );
  const phaseRows = tableRows(
    docsText,
    "## 10. Deterministic Validation Ordering",
    "If the root is not an object",
    /^\| \d+ \| `[A-Z_]+` \|/,
  );

  assert.deepEqual(codeRows.map((row) => row[1]), [
    "INVALID_TYPE",
    "MISSING_FIELD",
    "UNKNOWN_FIELD",
    "INVALID_ENUM",
    "INVALID_BOOLEAN",
  ]);
  assert.deepEqual(pathRows.map((row) => row[1]), [
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
  ]);
  assert.deepEqual(partitionRows, [
    ["INVALID_TYPE", "$ or one of the nine canonical string-field paths"],
    ["MISSING_FIELD", "one of the ten canonical field paths"],
    ["UNKNOWN_FIELD", "$ only"],
    ["INVALID_ENUM", "one of the nine canonical string-field paths"],
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired only"],
  ]);
  assert.deepEqual(phaseRows.map((row) => [Number(row[0]), row[1]]), [
    [0, "ROOT_TYPE_GATE"],
    [1, "MISSING_REQUIRED_FIELDS"],
    [2, "UNKNOWN_TOP_LEVEL_FIELD_AGGREGATE"],
    [3, "KNOWN_FIELD_TYPES"],
    [4, "KNOWN_FIELD_VALUES_AND_CASE_MAPPING"],
  ]);
  assert.deepEqual(
    section(docsText, "If the root is not an object", "## 11. Non-Interference Rules")
      .split("\n")
      .filter((line) => /^\d+\. `[a-zA-Z]+`$/.test(line))
      .map((line) => line.match(/^\d+\. `([^`]+)`$/)[1]),
    expectedCandidateFields,
  );
});

test("contract remains non-runtime, non-authorizing, and source-safe", () => {
  const docsText = readRequired(contractPath);

  for (const token of [
    "CONTRACT_ONLY",
    "APPEND_ONLY_CONTRACT_DEFINITION",
    "SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "MODEL_PROVIDER_EXECUTION_NOT_CREATED",
    "EXECUTED_MODEL_RUN_EVIDENCE_NOT_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_CONTRACT_ONLY_DOCUMENTATION_CONTRACT_DEFINED",
  ]) {
    assert.equal(docsText.includes(token), true, token);
  }

  assert.match(docsText, /does not prove schema correctness, validator correctness/i);
  assert.match(docsText, /not actual human review, professional review,/i);
  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /https?:\/\//);
  assert.doesNotMatch(docsText, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
