const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const boundaryPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_v1.md",
);

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

function numberedTableValues(text, heading, nextHeading) {
  return section(text, heading, nextHeading)
    .split("\n")
    .filter((line) => /^\| \d+ \| `[^`]+` \|/.test(line))
    .map((line) => {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.replaceAll("`", "").trim());
      return { position: Number(cells[0]), value: cells[1] };
    });
}

test("RTRE-P08 references every controlling boundary and structural precedent", () => {
  const docsText = readRequired(boundaryPath);
  const sources = [
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_PREREQUISITE_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_IDENTITY_VERSION_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SINGLE_CASE_TOP_LEVEL_SHAPE_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CORPUS_REFERENCE_REPRESENTATION_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_COMPOSITE_OUTPUT_TYPE_REPRESENTATION_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_POSTURE_FIELDS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PROHIBITED_FIELD_DENY_LIST_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md",
    "packages/governance/src/api-contract-schema-validator.js",
    "tests/api-contract-schema-validator.test.js",
  ];

  for (const source of sources) {
    assert.equal(fs.existsSync(path.join(repoRoot, source)), true, source);
    assert.equal(docsText.includes(`\`${source}\``), true, source);
  }

  assert.match(
    docsText,
    /codes `PROHIBITED_FIELD`, `INVALID_OPAQUE_REFERENCE`,\s+`PROHIBITED_WILDCARD`, and `PROHIBITED_BROAD_SCOPE` are not imported/,
  );
});

test("RTRE-P08 freezes exactly five bounded structural error codes", () => {
  const docsText = readRequired(boundaryPath);
  const rows = numberedTableValues(
    docsText,
    "## 3. Exact Bounded Error Taxonomy",
    "## 4. Exact Closed Path Set",
  );

  assert.deepEqual(
    rows.map(({ position }) => position),
    [1, 2, 3, 4, 5],
  );
  assert.deepEqual(
    rows.map(({ value }) => value),
    [
      "INVALID_TYPE",
      "MISSING_FIELD",
      "UNKNOWN_FIELD",
      "INVALID_ENUM",
      "INVALID_BOOLEAN",
    ],
  );
  assert.match(docsText, /VALIDATION_ERROR_CODE_COUNT:\n5/);
  assert.match(docsText, /ADDITIONAL_VALIDATION_ERROR_CODES:\nNONE/);
});

test("RTRE-P08 freezes exactly the root and ten canonical field paths", () => {
  const docsText = readRequired(boundaryPath);
  const rows = numberedTableValues(
    docsText,
    "## 4. Exact Closed Path Set",
    "## 5. Exact Code-to-Path Partition",
  );

  assert.deepEqual(
    rows.map(({ position }) => position),
    Array.from({ length: 11 }, (_, index) => index + 1),
  );
  assert.deepEqual(
    rows.map(({ value }) => value),
    [
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
    ],
  );
  assert.match(docsText, /VALIDATION_ERROR_PATH_COUNT:\n11/);
  assert.match(docsText, /An unknown property always produces `UNKNOWN_FIELD` at `\$`/);
  assert.match(docsText, /No dynamic path segment is authorized/);
});

test("RTRE-P08 freezes the exact code-to-path partition", () => {
  const docsText = readRequired(boundaryPath);
  const rows = section(
    docsText,
    "## 5. Exact Code-to-Path Partition",
    "## 6. Deterministic Validation and Error Ordering",
  )
    .split("\n")
    .filter((line) => /^\| `[A-Z_]+` \|/.test(line))
    .map((line) => {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.replaceAll("`", "").trim());
      return { code: cells[0], pathPartition: cells[1] };
    });

  assert.deepEqual(rows, [
    {
      code: "INVALID_TYPE",
      pathPartition: "$ or one of the nine canonical string-field paths",
    },
    {
      code: "MISSING_FIELD",
      pathPartition: "one of the ten canonical field paths",
    },
    { code: "UNKNOWN_FIELD", pathPartition: "$ only" },
    {
      code: "INVALID_ENUM",
      pathPartition: "one of the nine canonical string-field paths",
    },
    {
      code: "INVALID_BOOLEAN",
      pathPartition: "$.humanProfessionalReviewRequired only",
    },
  ]);
});

test("RTRE-P08 freezes root short-circuit and deterministic phase ordering", () => {
  const docsText = readRequired(boundaryPath);
  const orderingSection = section(
    docsText,
    "## 6. Deterministic Validation and Error Ordering",
    "## 7. Deduplication, Determinism, and No-Echo",
  );
  const phaseRows = orderingSection
    .split("\n")
    .filter((line) => /^\| \d+ \| `[A-Z_]+` \|/.test(line))
    .map((line) => {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.replaceAll("`", "").trim());
      return { phase: Number(cells[0]), name: cells[1] };
    });

  assert.deepEqual(phaseRows, [
    { phase: 0, name: "ROOT_TYPE_GATE" },
    { phase: 1, name: "MISSING_REQUIRED_FIELDS" },
    { phase: 2, name: "UNKNOWN_TOP_LEVEL_FIELD_AGGREGATE" },
    { phase: 3, name: "KNOWN_FIELD_TYPES" },
    { phase: 4, name: "KNOWN_FIELD_VALUES_AND_CASE_MAPPING" },
  ]);
  assert.deepEqual(
    orderingSection
      .split("\n")
      .filter((line) => /^\d+\. `[a-zA-Z]+`$/.test(line))
      .map((line) => line.match(/^\d+\. `([^`]+)`$/)[1]),
    [
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
    ],
  );
  assert.match(docsText, /VALIDATION_PHASE_COUNT:\n5/);
  assert.match(
    docsText,
    /return only `\{ code: "INVALID_TYPE", path: "\$" \}` and stop/,
  );
  assert.match(docsText, /multiple unknown properties collapse to one `UNKNOWN_FIELD` at `\$`/);
  assert.match(docsText, /input property insertion order cannot change the returned error order/);
  assert.match(docsText, /an exact `\{ code, path \}` pair appears at most once/);
});

test("RTRE-P08 preserves P06 structurally and creates no classifier or readiness", () => {
  const docsText = readRequired(boundaryPath);

  for (const token of [
    "DOCS_ONLY",
    "RTRE_P08_RESOLVED_DOCS_ONLY",
    "RTRE_P01_TO_P07_PRESERVED_RESOLVED_DOCS_ONLY",
    "RTRE_P01_TO_P08_DOCUMENTED_BY_APPEND_ONLY_BOUNDARIES",
    "NO_SEMANTIC_CONTENT_CLASSIFIER_CREATED",
    "SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_REJECTED_KEY_OR_VALUE_ECHO_CREATED",
    "NOT_CREATED_SEPARATE_OWNER_DECISION_REQUIRED",
    "none without a separate Owner decision",
  ]) {
    assert.equal(docsText.includes(token), true, `expected ${token}`);
  }

  assert.match(docsText, /does not create a\s+`PROHIBITED_FIELD` code/);
  assert.match(docsText, /rejected keys and values are never echoed/);
  assert.match(docsText, /does not retroactively rewrite.*`OPEN_NOT_SPECIFIED`/is);
  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
