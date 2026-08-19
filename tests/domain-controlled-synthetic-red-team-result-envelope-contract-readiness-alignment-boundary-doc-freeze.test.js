const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const boundaryPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_READINESS_ALIGNMENT_BOUNDARY_v1.md",
);
const prerequisitePath =
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_PREREQUISITE_BOUNDARY_v1.md";
const taxonomyPath =
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md";
const definitionSources = [
  {
    id: "RTRE-P01",
    path: "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_IDENTITY_VERSION_BOUNDARY_v1.md",
    statusToken: "RTRE_P01_STATUS:\nRESOLVED_DOCS_ONLY_NOT_CONTRACT_READY",
  },
  {
    id: "RTRE-P02",
    path: "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SINGLE_CASE_TOP_LEVEL_SHAPE_BOUNDARY_v1.md",
    statusToken: "RTRE_P02_STATUS:\nRESOLVED_DOCS_ONLY_NOT_CONTRACT_READY",
  },
  {
    id: "RTRE-P03",
    path: "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CORPUS_REFERENCE_REPRESENTATION_BOUNDARY_v1.md",
    statusToken: "RTRE_P03_STATUS:\nRESOLVED_DOCS_ONLY_NOT_CONTRACT_READY",
  },
  {
    id: "RTRE-P04",
    path: "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_COMPOSITE_OUTPUT_TYPE_REPRESENTATION_BOUNDARY_v1.md",
    statusToken: "RTRE_P04_STATUS:\nRESOLVED_DOCS_ONLY_NOT_CONTRACT_READY",
  },
  {
    id: "RTRE-P05",
    path: "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_POSTURE_FIELDS_BOUNDARY_v1.md",
    statusToken: "RTRE_P05_STATUS:\nRESOLVED_DOCS_ONLY_NOT_CONTRACT_READY",
  },
  {
    id: "RTRE-P06",
    path: "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PROHIBITED_FIELD_DENY_LIST_BOUNDARY_v1.md",
    statusToken: "RTRE_P06_STATUS:\nRESOLVED_DOCS_ONLY_NOT_CONTRACT_READY",
  },
  {
    id: "RTRE-P07",
    path: "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md",
    statusToken: "RTRE_P07_STATUS:\nRESOLVED_DOCS_ONLY_NOT_CONTRACT_READY",
  },
  {
    id: "RTRE-P08",
    path: "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_v1.md",
    statusToken: "RTRE_P08_STATUS:\nRESOLVED_DOCS_ONLY_NOT_CONTRACT_READY",
  },
];

function readRequired(relativePath) {
  const filePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(filePath), true, `expected ${relativePath}`);
  return fs.readFileSync(filePath, "utf8");
}

function section(text, heading, nextHeading) {
  const start = text.indexOf(heading);
  assert.notEqual(start, -1, `expected section ${heading}`);
  const end = nextHeading ? text.indexOf(nextHeading, start + heading.length) : -1;
  return text.slice(start, end === -1 ? undefined : end);
}

test("readiness alignment references the prerequisite and all P01-P08 sources", () => {
  const docsText = readRequired(
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_READINESS_ALIGNMENT_BOUNDARY_v1.md",
  );

  for (const source of [
    prerequisitePath,
    taxonomyPath,
    ...definitionSources.map(({ path }) => path),
  ]) {
    readRequired(source);
    assert.equal(docsText.includes(`\`${source}\``), true, source);
  }

  for (const { path: sourcePath, statusToken } of definitionSources) {
    assert.equal(readRequired(sourcePath).includes(statusToken), true, sourcePath);
  }
});

test("readiness alignment freezes exactly eight ordered docs-only definitions", () => {
  const docsText = fs.readFileSync(boundaryPath, "utf8");
  const rows = section(
    docsText,
    "## 3. Exact Prerequisite Definition Coverage",
    "## 4. Structural Alignment Review",
  )
    .split("\n")
    .filter((line) => /^\| \d+ \| `RTRE-P\d{2}` \|/.test(line))
    .map((line) => {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.replaceAll("`", "").trim());
      return {
        position: Number(cells[0]),
        id: cells[1],
        status: cells[3],
      };
    });

  assert.deepEqual(
    rows.map(({ position }) => position),
    [1, 2, 3, 4, 5, 6, 7, 8],
  );
  assert.deepEqual(
    rows.map(({ id }) => id),
    definitionSources.map(({ id }) => id),
  );
  assert.deepEqual(
    rows.map(({ status }) => status),
    Array(8).fill("TRACKED_APPEND_ONLY_DOCS_ONLY"),
  );
  assert.match(docsText, /RTRE_PREREQUISITE_DEFINITION_COUNT:\n8/);
  assert.match(
    docsText,
    /RTRE_PREREQUISITE_DEFINITION_COVERAGE:\nEIGHT_OF_EIGHT_TRACKED_APPEND_ONLY_DOCS_ONLY/,
  );
  assert.match(docsText, /HISTORICAL_OPEN_PREREQUISITE_ROWS:\nPRESERVED_NOT_REWRITTEN/);
});

test("readiness alignment preserves the exact aggregate structural facts", () => {
  const docsText = fs.readFileSync(boundaryPath, "utf8");

  for (const token of [
    "exact 26 allowed `caseId` values",
    "exact ten-field single-case object",
    "fourteen semantic deny-list families",
    "separate four-field validator result with two-field errors",
    "five codes, eleven paths, five phases",
    "candidate-envelope `contractKind` and validator-result `contractKind`",
    "UNKNOWN_FIELD` at `$`",
    "does not create a semantic classifier or `PROHIBITED_FIELD` code",
  ]) {
    assert.equal(docsText.includes(token), true, `expected ${token}`);
  }

  assert.match(
    docsText,
    /STRUCTURAL_ALIGNMENT_RESULT:\nNO_CONTRADICTION_IDENTIFIED_WITHIN_TRACKED_P01_TO_P08_BOUNDARIES/,
  );
});

test("contract-definition eligibility remains separate from contract creation", () => {
  const docsText = fs.readFileSync(boundaryPath, "utf8");

  assert.match(
    docsText,
    /CONTRACT_DEFINITION_SLICE_ELIGIBILITY:\nELIGIBLE_FOR_SEPARATE_CONTRACT_ONLY_DEFINITION_REVIEW/,
  );
  assert.match(docsText, /RESULT_ENVELOPE_CONTRACT_STATUS:\nNOT_CREATED/);
  assert.match(docsText, /SCHEMA_STATUS:\nNOT_CREATED/);
  assert.match(docsText, /VALIDATOR_STATUS:\nNOT_CREATED/);
  assert.match(docsText, /RUNTIME_STATUS:\nNOT_CREATED/);

  for (const token of [
    "RESULT_ENVELOPE_CONTRACT_NOT_CREATED",
    "SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "none without a separate exact contract-definition decision",
  ]) {
    assert.equal(docsText.includes(token), true, `expected ${token}`);
  }
});

test("readiness alignment remains tracked docs-only and free of local identity", () => {
  const docsText = fs.readFileSync(boundaryPath, "utf8");

  assert.equal(docsText.includes("DOCS_ONLY"), true);
  assert.equal(docsText.includes("PRODUCT_CANDIDATE_NONE"), true);
  assert.equal(docsText.includes("HUMAN_PROFESSIONAL_REVIEW_REQUIRED"), true);
  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
