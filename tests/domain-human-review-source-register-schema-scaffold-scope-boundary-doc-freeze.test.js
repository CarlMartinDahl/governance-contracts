"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const contractRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md";
const readinessRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_READINESS_BOUNDARY_v1.md";
const sourcePaths = [
  contractRelativePath,
  readinessRelativePath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/no-raw-metadata-manifest.json",
  "schemas/cmd-export-package-bundle-manifest.json",
  "packages/schemas/src/index.js",
  "tests/no-raw-metadata-manifest-schema.test.js",
];
const futurePaths = [
  "schemas/human-review-source-register.json",
  "tests/human-review-source-register-schema.test.js",
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

test("schema-scaffold scope references contract truth and convention evidence", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(docsText, /Convention evidence supplies file layout, Draft 2020-12/u);
  assert.match(docsText, /does not supply Source Register fields, values, limits/u);
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
    /^\| `|^\| `title`/u,
  );
  const rootRows = tableRows(
    docsText,
    "## 5. Exact Future Root Shape",
    "## 6. Exact Future Source Array and Local Definition",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );

  assert.deepEqual(identityRows, [
    ["$schema", "https://json-schema.org/draft/2020-12/schema"],
    ["$id", "https://governance-contracts.invalid/schemas/human-review-source-register.json"],
    ["title", "Human Review Source Register Contract Scaffold"],
    ["type", "object"],
    ["additionalProperties", "false"],
  ]);
  assert.deepEqual(rootRows.map((row) => row[1]), [
    "contract_id",
    "contract_version",
    "packet_ref",
    "sources",
  ]);
  assert.match(docsText, /FUTURE_SCHEMA_REQUIRED_ROOT_PROPERTY_COUNT:\n4/u);
  assert.match(docsText, /FUTURE_SCHEMA_OPTIONAL_ROOT_PROPERTIES:\nNONE/u);
  assert.match(docsText, /FUTURE_SCHEMA_ADDITIONAL_ROOT_PROPERTIES:\nFALSE/u);
});

test("future source array and local sourceEntry definition remain narrowly scoped", () => {
  const docsText = readRequired(docsRelativePath);
  const sourceSection = section(
    docsText,
    "## 6. Exact Future Source Array and Local Definition",
    "## 7. Exact Future Declared Source-Type Enum",
  );
  const entryRows = tableRows(
    docsText,
    "exactly these required properties in this documentation order:",
    "FUTURE_SCHEMA_SOURCE_ENTRY_DEF_NAME:",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );

  assert.match(sourceSection, /\| `minItems` \| `0` \|/u);
  assert.match(sourceSection, /\| `maxItems` \| omitted; the contract has no maximum \|/u);
  assert.match(sourceSection, /\| `uniqueItems` \| omitted;/u);
  assert.match(sourceSection, /\| `items\.\$ref` \| `#\/\$defs\/sourceEntry` \|/u);
  assert.deepEqual(entryRows.map((row) => row[1]), [
    "source_ref",
    "declared_source_type",
    "declared_label",
  ]);
  assert.match(sourceSection, /FUTURE_SCHEMA_SOURCE_ENTRY_DEF_NAME:\nsourceEntry/u);
  assert.match(sourceSection, /FUTURE_SCHEMA_REQUIRED_SOURCE_ENTRY_PROPERTY_COUNT:\n3/u);
  assert.match(sourceSection, /FUTURE_SCHEMA_ADDITIONAL_SOURCE_ENTRY_PROPERTIES:\nFALSE/u);
});

test("reference source-type and label schema constraints stay exact and bounded", () => {
  const docsText = readRequired(docsRelativePath);
  const rootSection = section(
    docsText,
    "## 5. Exact Future Root Shape",
    "## 6. Exact Future Source Array and Local Definition",
  );
  const sourceSection = section(
    docsText,
    "## 6. Exact Future Source Array and Local Definition",
    "## 7. Exact Future Declared Source-Type Enum",
  );
  const enumSection = section(
    docsText,
    "## 7. Exact Future Declared Source-Type Enum",
    "## 8. Exact Future Label Schema Scope",
  );
  const labelSection = section(
    docsText,
    "## 8. Exact Future Label Schema Scope",
    "## 9. Contract Rules Deliberately Outside Candidate Schema Enforcement",
  );

  assert.equal(
    rootSection.includes('`pattern: "^pkt_[a-z0-9][a-z0-9_-]{0,59}$"`'),
    true,
  );
  assert.equal(
    sourceSection.includes('`pattern: "^src_[a-z0-9][a-z0-9_-]{0,59}$"`'),
    true,
  );
  for (const sourceType of [
    "message_thread",
    "email",
    "document",
    "image",
    "audio",
    "video",
    "other_declared",
  ]) {
    assert.equal(enumSection.includes(`\`${sourceType}\``), true, sourceType);
  }
  assert.match(enumSection, /FUTURE_SCHEMA_DECLARED_SOURCE_TYPE_ENUM_COUNT:\n7/u);
  assert.match(labelSection, /\| `minLength` \| `1` \|/u);
  assert.match(labelSection, /\| `maxLength` \| `200` \|/u);
  assert.match(labelSection, /FUTURE_SCHEMA_LABEL_PATTERN:\nOMITTED/u);
  assert.match(labelSection, /FUTURE_SCHEMA_LABEL_TRIM_ENFORCEMENT:\nNOT_CLAIMED/u);
});

test("trim uniqueness ordering and semantic enforcement remain outside schema", () => {
  const docsText = readRequired(docsRelativePath);
  const outsideSection = section(
    docsText,
    "## 9. Contract Rules Deliberately Outside Candidate Schema Enforcement",
    "## 10. Separate Sibling Surfaces",
  );

  assert.match(docsText, /does not define an exact whitespace taxonomy/u);
  assert.match(docsText, /No ASCII-only, ECMAScript `\\s`, Unicode White_Space/u);
  assert.match(outsideSection, /SOURCE_REF_UNIQUENESS_KEYWORD:\nNONE/u);
  assert.match(
    outsideSection,
    /SOURCE_REF_UNIQUENESS_ENFORCEMENT:\nSEPARATE_FUTURE_VALIDATOR_ONLY/u,
  );
  assert.match(outsideSection, /`uniqueItems: true` is prohibited in this scaffold/u);
  assert.match(outsideSection, /object-member insertion order/u);
  assert.match(outsideSection, /does not inspect the meaning of allowed free text/u);
});

test("all nine readiness questions receive bounded non-runtime scope answers", () => {
  const docsText = readRequired(docsRelativePath);
  const resolvedSection = section(
    docsText,
    "## 12. Resolved Readiness Questions",
    "## 13. Non-Interference Rules",
  );
  const rows = resolvedSection
    .split("\n")
    .filter((line) => /^\| \d+ \|/u.test(line));

  assert.equal(rows.length, 9);
  assert.match(resolvedSection, /one local `\$defs\.sourceEntry`/u);
  assert.match(resolvedSection, /no schema pattern; exact semantics and enforcement remain/u);
  assert.match(resolvedSection, /future validator-only rule/u);
  assert.match(resolvedSection, /package export in smallest scaffold \| excluded/u);
  assert.match(resolvedSection, /validator-result schema in smallest scaffold \| excluded/u);
  assert.match(resolvedSection, /RESOLVED_SCAFFOLD_SCOPE_QUESTION_COUNT:\n9/u);
});

test("scaffold scope remains docs-only source-safe and non-authorizing", () => {
  const docsText = readRequired(docsRelativePath);

  for (const token of [
    "DOCS_ONLY",
    "APPEND_ONLY_SCHEMA_SCAFFOLD_SCOPE",
    "EXACT_TWO_FILE_FUTURE_SCOPE_DEFINED",
    "LABEL_TRIM_SCHEMA_ENCODING_DEFERRED_TO_VALIDATOR",
    "SOURCE_REF_UNIQUENESS_DEFERRED_TO_VALIDATOR",
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATION_EXECUTION_NOT_CREATED",
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
