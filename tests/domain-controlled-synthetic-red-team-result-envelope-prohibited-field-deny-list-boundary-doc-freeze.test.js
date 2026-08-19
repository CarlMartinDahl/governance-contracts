const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const boundaryPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PROHIBITED_FIELD_DENY_LIST_BOUNDARY_v1.md",
);
const shapePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SINGLE_CASE_TOP_LEVEL_SHAPE_BOUNDARY_v1.md",
);

const expectedFamilies = [
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

const expectedTopLevelFields = [
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

function parseRows(text, pattern) {
  return text
    .split("\n")
    .filter((line) => pattern.test(line))
    .map((line) => {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.replaceAll("`", "").trim());
      return { position: Number(cells[0]), value: cells[1] };
    });
}

test("RTRE-P06 references the controlling sources without importing validator behavior", () => {
  const docsText = readRequired(boundaryPath);
  const sources = [
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_PREREQUISITE_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SINGLE_CASE_TOP_LEVEL_SHAPE_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_POSTURE_FIELDS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CORPUS_REFERENCE_REPRESENTATION_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md",
    "packages/governance/src/api-contract-schema-validator.js",
    "tests/api-contract-schema-validator.test.js",
  ];

  for (const source of sources) {
    assert.equal(fs.existsSync(path.join(repoRoot, source)), true);
    assert.equal(docsText.includes(`\`${source}\``), true);
  }

  assert.match(docsText, /error codes, paths, and ordering are not imported/i);
});

test("RTRE-P06 freezes exactly fourteen ordered semantic deny families", () => {
  const docsText = readRequired(boundaryPath);
  const rows = parseRows(
    docsText,
    /^\| \d+ \| `[A-Z][A-Z_]+` \|/,
  );

  assert.deepEqual(
    rows.map(({ position }) => position),
    Array.from({ length: 14 }, (_, index) => index + 1),
  );
  assert.deepEqual(
    rows.map(({ value }) => value),
    expectedFamilies,
  );
  assert.match(docsText, /PROHIBITED_SEMANTIC_FIELD_FAMILY_COUNT:\n14/);
  assert.match(docsText, /PROHIBITED_SEMANTIC_FIELD_FAMILIES:\nALL_FOURTEEN/);
  assert.match(docsText, /OPTIONAL_PROHIBITED_FAMILIES:\nNONE/);
});

test("RTRE-P06 preserves the exact ten-field allowlist and adds no field", () => {
  const docsText = readRequired(boundaryPath);
  const shapeText = readRequired(shapePath);
  const shapeRows = parseRows(
    shapeText,
    /^\| \d+ \| `[a-z][A-Za-z]+` \|/,
  );

  assert.deepEqual(
    shapeRows.map(({ value }) => value),
    expectedTopLevelFields,
  );

  for (const field of expectedTopLevelFields) {
    assert.equal(docsText.includes(`\`${field}\``), true);
  }

  assert.match(docsText, /adds no eleventh field/i);
  assert.match(
    docsText,
    /Every unknown top-level field remains\s+structurally prohibited/i,
  );
  assert.match(docsText, /aliases, abbreviations, differently cased keys, nested objects, arrays/i);
  assert.match(
    docsText,
    /must not be retained, ignored, echoed, normalized,\s+summarized, hashed, or passed through/i,
  );
});

test("RTRE-P06 remains docs-only and leaves RTRE-P07 and RTRE-P08 open", () => {
  const docsText = readRequired(boundaryPath);

  for (const token of [
    "DOCS_ONLY",
    "APPEND_ONLY_PREREQUISITE_RESOLUTION",
    "RTRE_P06_RESOLVED_DOCS_ONLY",
    "RTRE_P01_TO_P05_PRESERVED_RESOLVED_DOCS_ONLY",
    "RTRE_P07_AND_P08_OPEN_NOT_SPECIFIED",
    "RESULT_ENVELOPE_CONTRACT_NOT_CREATED",
    "SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "BLOCKED_BY_RTRE_P07_AND_P08",
    "none without a separate Owner decision",
  ]) {
    assert.equal(docsText.includes(token), true, `expected ${token}`);
  }

  assert.deepEqual(
    [...docsText.matchAll(/^\| `(RTRE-P\d{2})` \|.*`OPEN_NOT_SPECIFIED` \|$/gm)].map(
      (match) => match[1],
    ),
    ["RTRE-P07", "RTRE-P08"],
  );
  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
