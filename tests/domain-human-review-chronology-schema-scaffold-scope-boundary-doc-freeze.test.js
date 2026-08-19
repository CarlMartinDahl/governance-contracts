"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const contractRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md";
const readinessRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_READINESS_BOUNDARY_v1.md";
const sourcePaths = [
  contractRelativePath,
  readinessRelativePath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/controlled-synthetic-red-team-result-envelope.json",
  "packages/schemas/src/index.js",
  "tests/human-review-source-register-schema.test.js",
];
const futurePaths = [
  "schemas/human-review-chronology.json",
  "tests/human-review-chronology-schema.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
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

test("schema-scaffold scope references chronology truth and convention evidence", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(docsText, /Convention evidence supplies file layout, Draft 2020-12/u);
  assert.match(docsText, /does not supply Review Chronology fields, values,/u);
});

test("future scaffold is exactly one schema and one focused proof test", () => {
  const docsText = readRequired(docsRelativePath);
  const fileRows = tableRows(
    docsText,
    "## 3. Exact Future File Scope",
    "## 4. Exact Future Schema Identity",
    /^\| \d+ \| `(?:schemas|tests)\//u,
  );

  assert.equal(fileRows.length, 2);
  assert.deepEqual(fileRows.map((row) => row[1]), futurePaths);
  assert.match(docsText, /FUTURE_SCHEMA_SLICE_FILE_COUNT:\n2/u);
  assert.match(docsText, /No package export, validator-result schema, validator helper/u);
});

test("future schema identity and root shape are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const identityRows = tableRows(
    docsText,
    "## 4. Exact Future Schema Identity",
    "## 5. Exact Future Root Shape",
    /^\| `(?:\$schema|\$id|title|type|additionalProperties)`/u,
  );
  const rootRows = tableRows(
    docsText,
    "## 5. Exact Future Root Shape",
    "## 6. Exact Future Entries Array And Local Definition",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );

  assert.deepEqual(identityRows, [
    ["$schema", "https://json-schema.org/draft/2020-12/schema"],
    ["$id", "https://governance-contracts.invalid/schemas/human-review-chronology.json"],
    ["title", "Human Review Chronology Contract Scaffold"],
    ["type", "object"],
    ["additionalProperties", "false"],
  ]);
  assert.deepEqual(rootRows.map((row) => row[1]), [
    "contract_id",
    "contract_version",
    "packet_ref",
    "entries",
  ]);
  assert.match(docsText, /FUTURE_SCHEMA_REQUIRED_ROOT_PROPERTY_COUNT:\n4/u);
  assert.match(docsText, /FUTURE_SCHEMA_OPTIONAL_ROOT_PROPERTIES:\nNONE/u);
  assert.match(docsText, /FUTURE_SCHEMA_ADDITIONAL_ROOT_PROPERTIES:\nFALSE/u);
});

test("future entries array and local chronologyEntry definition remain narrowly scoped", () => {
  const docsText = readRequired(docsRelativePath);
  const entriesSection = section(
    docsText,
    "## 6. Exact Future Entries Array And Local Definition",
    "## 7. Exact Future Enumerated Vocabularies",
  );
  const entryRows = tableRows(
    docsText,
    "Its `required` array and `properties` object must contain exactly these six",
    "FUTURE_SCHEMA_CHRONOLOGY_ENTRY_DEF_NAME:",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );

  assert.match(entriesSection, /\| `minItems` \| `0` \|/u);
  assert.match(entriesSection, /\| `items\.\$ref` \| `#\/\$defs\/chronologyEntry` \|/u);
  assert.match(entriesSection, /FUTURE_SCHEMA_ENTRIES_MAX_ITEMS:\nOMITTED/u);
  assert.match(
    entriesSection,
    /FUTURE_SCHEMA_ENTRIES_UNIQUE_ITEMS:\nOMITTED_PROPERTY_LEVEL_ENTRY_REF_UNIQUENESS_REMAINS_VALIDATOR_ONLY/u,
  );
  assert.deepEqual(entryRows.map((row) => row[1]), [
    "entry_ref",
    "review_state",
    "temporal_status",
    "declared_temporal_text",
    "review_text",
    "source_refs",
  ]);
  assert.match(
    entriesSection,
    /FUTURE_SCHEMA_CHRONOLOGY_ENTRY_DEF_NAME:\nchronologyEntry/u,
  );
  assert.match(
    entriesSection,
    /FUTURE_SCHEMA_REQUIRED_CHRONOLOGY_ENTRY_PROPERTY_COUNT:\n6/u,
  );
  assert.match(
    entriesSection,
    /FUTURE_SCHEMA_ADDITIONAL_CHRONOLOGY_ENTRY_PROPERTIES:\nFALSE/u,
  );
});

test("future enums and temporal oneOf coupling are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const enums = section(
    docsText,
    "## 7. Exact Future Enumerated Vocabularies",
    "## 8. Exact Future Temporal Coupling",
  );
  const temporal = section(
    docsText,
    "## 8. Exact Future Temporal Coupling",
    "## 9. Exact Future Text And Source-Reference Scope",
  );

  for (const value of [
    "ASSERTED",
    "APPEARS_IN_SUPPLIED_MATERIAL",
    "NOT_ESTABLISHED",
    "HUMAN_REVIEW_REQUIRED",
    "DECLARED",
    "UNKNOWN",
  ]) {
    assert.equal(enums.includes(`\`${value}\``), true, value);
  }
  assert.match(enums, /FUTURE_SCHEMA_REVIEW_STATE_ENUM_COUNT:\n4/u);
  assert.match(enums, /FUTURE_SCHEMA_TEMPORAL_STATUS_ENUM_COUNT:\n2/u);
  assert.match(temporal, /ordered type array `\["string", "null"\]`/u);
  assert.match(temporal, /\| 1 \| `const: "DECLARED"` \| `type: "string"`, `minLength: 1` \|/u);
  assert.match(temporal, /\| 2 \| `const: "UNKNOWN"` \| `const: null` \|/u);
  assert.match(temporal, /FUTURE_SCHEMA_TEMPORAL_COUPLING_KEYWORD:\noneOf/u);
  assert.match(temporal, /FUTURE_SCHEMA_TEMPORAL_COUPLING_BRANCH_COUNT:\n2/u);
});

test("future text and source-reference constraints stay exact and bounded", () => {
  const docsText = readRequired(docsRelativePath);
  const textAndRefs = section(
    docsText,
    "## 9. Exact Future Text And Source-Reference Scope",
    "## 10. Contract Rules Deliberately Outside Candidate Schema Enforcement",
  );

  assert.match(textAndRefs, /\| `minLength` \| `1` \|/u);
  assert.match(textAndRefs, /FUTURE_SCHEMA_TEXT_MAX_LENGTH:\nOMITTED_NO_CONTRACT_MAXIMUM/u);
  assert.match(textAndRefs, /FUTURE_SCHEMA_TEXT_PATTERN:\nOMITTED/u);
  assert.match(textAndRefs, /FUTURE_SCHEMA_TEXT_TRIM_ENFORCEMENT:\nNOT_CLAIMED/u);
  assert.match(textAndRefs, /No ASCII-only, ECMAScript `\\s`, Unicode White_Space/u);
  assert.match(textAndRefs, /\| `minItems` \| `1` \|/u);
  assert.match(textAndRefs, /\| `uniqueItems` \| `true` \|/u);
  assert.match(textAndRefs, /\| `items\.pattern` \| `\^src_/u);
  assert.match(
    textAndRefs,
    /FUTURE_SCHEMA_SOURCE_REFS_MAX_ITEMS:\nOMITTED_NO_CONTRACT_MAXIMUM/u,
  );
  assert.match(textAndRefs, /It represents only exact within-entry string uniqueness/u);
});

test("entry uniqueness Source Register membership and semantics remain outside schema", () => {
  const docsText = readRequired(docsRelativePath);
  const outside = section(
    docsText,
    "## 10. Contract Rules Deliberately Outside Candidate Schema Enforcement",
    "## 11. Separate Sibling Surfaces",
  );

  assert.match(outside, /ENTRY_REF_UNIQUENESS_KEYWORD:\nNONE/u);
  assert.match(
    outside,
    /ENTRY_REF_UNIQUENESS_ENFORCEMENT:\nSEPARATE_FUTURE_VALIDATOR_ONLY/u,
  );
  assert.match(
    outside,
    /SOURCE_REGISTER_CROSS_REFERENCE_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(outside, /`uniqueItems: true` is prohibited on `entries`/u);
  assert.match(outside, /canonical review order as temporal, factual/u);
  assert.match(outside, /does not inspect the meaning of allowed free text/u);
});

test("all eleven readiness questions receive bounded non-runtime scope answers", () => {
  const docsText = readRequired(docsRelativePath);
  const resolved = section(
    docsText,
    "## 13. Resolved Readiness Questions",
    "## 14. Non-Interference Rules",
  );
  const rows = resolved.split("\n").filter((line) => /^\| \d+ \|/u.test(line));

  assert.equal(rows.length, 11);
  assert.match(resolved, /one local `\$defs\.chronologyEntry`/u);
  assert.match(resolved, /exact two-branch `oneOf`/u);
  assert.match(resolved, /no schema pattern; exact semantics and enforcement remain/u);
  assert.match(resolved, /future validator-only rule/u);
  assert.match(resolved, /package export in smallest scaffold \| excluded/u);
  assert.match(resolved, /validator-result schema in smallest scaffold \| excluded/u);
  assert.match(resolved, /RESOLVED_SCAFFOLD_SCOPE_QUESTION_COUNT:\n11/u);
});

test("scaffold scope remains docs-only source-safe and non-authorizing", () => {
  const docsText = readRequired(docsRelativePath);

  for (const token of [
    "DOCS_ONLY",
    "APPEND_ONLY_SCHEMA_SCAFFOLD_SCOPE",
    "EXACT_TWO_FILE_FUTURE_SCOPE_DEFINED",
    "ONE_OF_TEMPORAL_COUPLING_SELECTED",
    "TEXT_TRIM_SCHEMA_ENCODING_DEFERRED_TO_VALIDATOR",
    "ENTRY_REF_PROPERTY_UNIQUENESS_DEFERRED_TO_VALIDATOR",
    "SOURCE_REGISTER_MEMBERSHIP_DEFERRED_TO_GOVERNANCE_CHECKPOINT",
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SOURCE_ACQUISITION_OR_FORENSIC_EXTRACTION_CREATED",
    "NO_REAL_PRIVATE_SOURCE_MATERIAL_USE_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(token), true, token);
  }

  assert.match(docsText, /does not prove schema correctness, validator correctness/u);
  assert.match(docsText, /not actual human review, professional review,/u);
  assert.doesNotMatch(docsText, /\/Users\//u);
  assert.doesNotMatch(
    docsText,
    /https?:\/\/(?!json-schema\.org|governance-contracts\.invalid)/u,
  );
  assert.doesNotMatch(docsText, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/u);
});
