"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_READINESS_BOUNDARY_v1.md";
const contractRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md";
const sourcePaths = [
  contractRelativePath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/no-raw-metadata-manifest.json",
  "schemas/swe-bodelning-profile-dossier-snapshot.json",
  "packages/schemas/src/index.js",
  "tests/no-raw-metadata-manifest-schema.test.js",
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

test("schema-readiness boundary references contract truth and comparison evidence", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /Comparison evidence supplies repository workflow, file-layout, JSON Schema/u,
  );
  assert.match(docsText, /does not\s+authorize reuse of another contract's fields/u);
});

test("readiness classification keeps schema and validator concerns separate", () => {
  const docsText = readRequired(docsRelativePath);
  const classification = section(
    docsText,
    "## 3. Schema-Readiness Classification",
    "## 4. Exact Future Candidate Root Shape",
  );

  for (const classificationToken of [
    "EXACT_CONTRACT_FACT_AVAILABLE",
    "EXACT_CONTRACT_FACT_AVAILABLE_ENCODING_OPEN",
    "VALIDATOR_ONLY_NOT_JSON_SCHEMA_PROOF",
    "DOCUMENTATION_AND_VALIDATOR_ONLY",
    "DOCUMENTATION_ONLY_NOT_SCHEMA_CLASSIFIER",
    "OPEN_FOR_SEPARATE_SCAFFOLD_SCOPE",
    "OPEN_FOR_SEPARATE_LATER_SIBLING_SCOPE",
  ]) {
    assert.equal(classification.includes(`\`${classificationToken}\``), true);
  }

  assert.match(
    classification,
    /SCHEMA_READINESS_RESULT:\nREADY_FOR_SEPARATE_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_REVIEW/u,
  );
  assert.match(classification, /SCHEMA_IMPLEMENTATION_STATUS:\nNOT_CREATED/u);
});

test("future root and source-entry field surfaces exactly match the tracked contract", () => {
  const docsText = readRequired(docsRelativePath);
  const contractText = readRequired(contractRelativePath);
  const readinessRootRows = tableRows(
    docsText,
    "## 4. Exact Future Candidate Root Shape",
    "## 5. Exact Future Source-Entry Shape and Array Cardinality",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );
  const contractRootRows = tableRows(
    contractText,
    "## 4. Exact Top-Level Shape",
    "## 5. Exact Source-Entry Shape and Cardinality",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );
  const readinessEntryRows = tableRows(
    docsText,
    "A future source-entry schema may consider only these three fields",
    "FUTURE_SCHEMA_SOURCE_ENTRY_FIELD_COUNT:",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );
  const contractEntryRows = tableRows(
    contractText,
    "Every source entry is one plain JSON-like object",
    "SOURCE_ENTRY_FIELD_COUNT:",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );

  assert.deepEqual(
    readinessRootRows.map((row) => row.slice(0, 3)),
    contractRootRows.map((row) => row.slice(0, 3)),
  );
  assert.deepEqual(
    readinessEntryRows.map((row) => row.slice(0, 3)),
    contractEntryRows.map((row) => row.slice(0, 3)),
  );
  assert.deepEqual(readinessRootRows.map((row) => row[1]), [
    "contract_id",
    "contract_version",
    "packet_ref",
    "sources",
  ]);
  assert.deepEqual(readinessEntryRows.map((row) => row[1]), [
    "source_ref",
    "declared_source_type",
    "declared_label",
  ]);
  assert.match(docsText, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n4/u);
  assert.match(docsText, /FUTURE_SCHEMA_SOURCE_ENTRY_FIELD_COUNT:\n3/u);
});

test("exact scalar cardinality and source-type facts remain contract-bound", () => {
  const docsText = readRequired(docsRelativePath);
  const scalarSection = section(
    docsText,
    "## 6. Exact Future Scalar Constraints",
    "## 7. Exact Declared Source-Type Vocabulary",
  );
  const sourceTypeSection = section(
    docsText,
    "## 7. Exact Declared Source-Type Vocabulary",
    "## 8. JSON Schema Enforcement Limits",
  );

  assert.equal(
    scalarSection.includes('`pattern: "^pkt_[a-z0-9][a-z0-9_-]{0,59}$"`'),
    true,
  );
  assert.equal(
    scalarSection.includes('`pattern: "^src_[a-z0-9][a-z0-9_-]{0,59}$"`'),
    true,
  );
  assert.match(docsText, /minimum entry count \| `0`/u);
  assert.match(docsText, /maximum entry count \| `NO_CONTRACT_MAXIMUM`/u);
  assert.match(docsText, /must not invent `maxItems`/u);
  assert.match(scalarSection, /1 through 200 Unicode code points/u);

  for (const sourceType of [
    "message_thread",
    "email",
    "document",
    "image",
    "audio",
    "video",
    "other_declared",
  ]) {
    assert.equal(sourceTypeSection.includes(`\`${sourceType}\``), true, sourceType);
  }
  assert.match(sourceTypeSection, /FUTURE_SCHEMA_DECLARED_SOURCE_TYPE_COUNT:\n7/u);
});

test("JSON Schema limits are explicit and do not overclaim uniqueness or semantics", () => {
  const docsText = readRequired(docsRelativePath);
  const limits = section(
    docsText,
    "## 8. JSON Schema Enforcement Limits",
    "## 9. Separate Validator-Result Readiness",
  );

  assert.match(limits, /`uniqueItems: true` compares complete array items/u);
  assert.match(limits, /SOURCE_REF_UNIQUENESS_ENFORCEMENT:\nFUTURE_VALIDATOR_ONLY/u);
  assert.match(
    limits,
    /FUTURE_SCHEMA_UNIQUE_ITEMS_CLAIM:\nPROHIBITED_AS_COMPLETE_SOURCE_REF_UNIQUENESS_PROOF/u,
  );
  assert.match(limits, /object-member insertion order/u);
  assert.match(limits, /plain-object identity, own-data-property status/u);
  assert.match(limits, /candidate immutability or no-echo result behavior/u);
  assert.match(limits, /does not inspect the meaning of allowed free text/u);
});

test("all nine scaffold-scope questions remain open and future paths are reservations", () => {
  const docsText = readRequired(docsRelativePath);
  const openSection = section(
    docsText,
    "## 10. Open Scaffold-Scope Questions",
    "## 11. Non-Interference Rules",
  );
  const questions = openSection.split("\n").filter((line) => /^\d+\. /u.test(line));

  assert.equal(questions.length, 9);
  assert.match(openSection, /exact label-length encoding/u);
  assert.match(openSection, /property-level `source_ref` uniqueness remains validator-only/u);
  assert.match(openSection, /whether validator-result schema remains a later sibling slice/u);
  assert.match(openSection, /OPEN_SCAFFOLD_SCOPE_QUESTION_COUNT:\n9/u);
  assert.equal(openSection.includes("`schemas/human-review-source-register.json`"), true);
  assert.equal(
    openSection.includes("`tests/human-review-source-register-schema.test.js`"),
    true,
  );
  assert.match(openSection, /Path reservation is not file creation or implementation authorization/u);
});

test("readiness remains docs-only non-runtime source-safe and non-authorizing", () => {
  const docsText = readRequired(docsRelativePath);

  for (const token of [
    "DOCS_ONLY",
    "APPEND_ONLY_SCHEMA_READINESS_REVIEW",
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
    "TRACKED_DOCS_ONLY_SCHEMA_READINESS_WITH_OPEN_SCAFFOLD_SCOPE",
  ]) {
    assert.equal(docsText.includes(token), true, token);
  }

  assert.match(docsText, /does not prove schema correctness, validator correctness/u);
  assert.match(docsText, /not actual human review, professional review,/u);
  assert.doesNotMatch(docsText, /\/Users\//u);
  assert.doesNotMatch(docsText, /https?:\/\/(?!json-schema\.org|governance-contracts\.invalid)/u);
  assert.doesNotMatch(docsText, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/u);
});
