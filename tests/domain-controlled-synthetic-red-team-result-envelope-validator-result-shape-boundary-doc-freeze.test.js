const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const boundaryPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md",
);

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, `expected ${filePath} to exist`);
  return fs.readFileSync(filePath, "utf8");
}

function parseRows(text, heading, pattern) {
  const section = text.split(heading)[1];
  assert.equal(typeof section, "string", `expected section ${heading}`);
  return section
    .split("\n")
    .filter((line) => pattern.test(line))
    .map((line) => {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.replaceAll("`", "").trim());
      return { position: Number(cells[0]), field: cells[1] };
    });
}

test("RTRE-P07 references controlling sources and only structural precedent", () => {
  const docsText = readRequired(boundaryPath);
  const sources = [
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_PREREQUISITE_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PROHIBITED_FIELD_DENY_LIST_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SINGLE_CASE_TOP_LEVEL_SHAPE_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_IDENTITY_VERSION_BOUNDARY_v1.md",
    "packages/governance/src/api-contract-schema-validator.js",
    "tests/api-contract-schema-validator.test.js",
  ];

  for (const source of sources) {
    assert.equal(fs.existsSync(path.join(repoRoot, source)), true);
    assert.equal(docsText.includes(`\`${source}\``), true);
  }

  assert.match(docsText, /error codes,\s+paths, ordering.*are not imported/is);
});

test("RTRE-P07 freezes the exact four-field result shape and identity", () => {
  const docsText = readRequired(boundaryPath);
  const rows = parseRows(
    docsText,
    "## 4. Exact Top-Level Result Shape",
    /^\| \d+ \| `[a-z][A-Za-z]+` \|/,
  );

  assert.deepEqual(
    rows.slice(0, 4).map(({ position }) => position),
    [1, 2, 3, 4],
  );
  assert.deepEqual(
    rows.slice(0, 4).map(({ field }) => field),
    ["valid", "contractKind", "version", "errors"],
  );
  assert.match(
    docsText,
    /`contractKind` \| `CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_BOUNDARY`/,
  );
  assert.match(docsText, /`version` \| `v1`/);
  assert.match(docsText, /VALIDATOR_RESULT_FIELD_COUNT:\n4/);
  assert.match(docsText, /REQUIRED_VALIDATOR_RESULT_FIELDS:\nALL_FOUR/);
  assert.match(docsText, /OPTIONAL_VALIDATOR_RESULT_FIELDS:\nNONE/);
  assert.match(docsText, /ADDITIONAL_VALIDATOR_RESULT_FIELDS:\nNONE/);
});

test("RTRE-P07 freezes exact no-echo error items and success/failure invariants", () => {
  const docsText = readRequired(boundaryPath);
  const rows = parseRows(
    docsText,
    "## 5. Exact Error-Item Shape",
    /^\| \d+ \| `[a-z][A-Za-z]+` \|/,
  );

  assert.deepEqual(
    rows.slice(0, 2).map(({ position }) => position),
    [1, 2],
  );
  assert.deepEqual(
    rows.slice(0, 2).map(({ field }) => field),
    ["code", "path"],
  );
  assert.match(docsText, /VALIDATION_ERROR_ITEM_FIELD_COUNT:\n2/);
  assert.match(docsText, /REQUIRED_VALIDATION_ERROR_ITEM_FIELDS:\nBOTH/);
  assert.match(docsText, /`valid` is `true` if and only if `errors` is empty/);
  assert.match(docsText, /`valid` is `false` if and only if `errors` is non-empty/);
  assert.match(docsText, /must not contain.*candidate object or any candidate property value/is);
  assert.match(
    docsText,
    /no result field or error item may echo.*any rejected key or value/is,
  );
});

test("RTRE-P07 remains docs-only and leaves only RTRE-P08 open", () => {
  const docsText = readRequired(boundaryPath);

  for (const token of [
    "DOCS_ONLY",
    "RTRE_P07_RESOLVED_DOCS_ONLY",
    "RTRE_P01_TO_P06_PRESERVED_RESOLVED_DOCS_ONLY",
    "RTRE_P08_OPEN_NOT_SPECIFIED",
    "DETERMINISTIC_NO_ECHO_RESULT_SHAPE_ONLY",
    "SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_ERROR_TAXONOMY_CREATED",
    "NO_REJECTED_VALUE_ECHO_CREATED",
    "BLOCKED_BY_RTRE_P08",
    "none without a separate Owner decision",
  ]) {
    assert.equal(docsText.includes(token), true, `expected ${token}`);
  }

  assert.deepEqual(
    [...docsText.matchAll(/^\| `(RTRE-P\d{2})` \|.*`OPEN_NOT_SPECIFIED` \|$/gm)].map(
      (match) => match[1],
    ),
    ["RTRE-P08"],
  );
  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
