"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_READINESS_BOUNDARY_v1.md";
const contractRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md";
const sourcePaths = [
  contractRelativePath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-state-model.json",
  "schemas/human-review-source-register.json",
  "packages/schemas/src/index.js",
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

test("schema-readiness boundary references chronology truth and comparison evidence", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /Comparison evidence supplies repository workflow, file-layout, Draft 2020-12/u,
  );
  assert.match(docsText, /does not authorize reuse of another contract's fields/u);
});

test("readiness classification keeps schema validator and governance duties separate", () => {
  const docsText = readRequired(docsRelativePath);
  const classification = section(
    docsText,
    "## 3. Schema-Readiness Classification",
    "## 4. Exact Future Candidate Root Shape",
  );

  for (const token of [
    "EXACT_CONTRACT_FACT_AVAILABLE",
    "EXACT_CONTRACT_FACT_AVAILABLE_ENCODING_OPEN",
    "VALIDATOR_ONLY_NOT_JSON_SCHEMA_PROOF",
    "GOVERNANCE_CHECKPOINT_ONLY_NOT_JSON_SCHEMA_PROOF",
    "DOCUMENTATION_AND_VALIDATOR_ONLY",
    "DOCUMENTATION_ONLY_NOT_SCHEMA_CLASSIFIER",
    "OPEN_FOR_SEPARATE_SCAFFOLD_SCOPE",
    "OPEN_FOR_SEPARATE_LATER_SCOPE",
    "OPEN_FOR_SEPARATE_LATER_SIBLING_SCOPE",
  ]) {
    assert.equal(classification.includes(`\`${token}\``), true, token);
  }

  assert.match(
    classification,
    /SCHEMA_READINESS_RESULT:\nREADY_FOR_SEPARATE_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_REVIEW/u,
  );
  assert.match(classification, /SCHEMA_IMPLEMENTATION_STATUS:\nNOT_CREATED/u);
});

test("future root and chronology-entry field surfaces exactly match the contract", () => {
  const docsText = readRequired(docsRelativePath);
  const contractText = readRequired(contractRelativePath);
  const readinessRootRows = tableRows(
    docsText,
    "## 4. Exact Future Candidate Root Shape",
    "## 5. Exact Future Chronology-Entry Shape And Array Cardinality",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );
  const contractRootRows = tableRows(
    contractText,
    "## 4. Exact Top-Level Shape",
    "## 5. Exact Chronology-Entry Shape And Cardinality",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );
  const readinessEntryRows = tableRows(
    docsText,
    "A future chronology-entry schema may consider only these six fields",
    "FUTURE_SCHEMA_CHRONOLOGY_ENTRY_FIELD_COUNT:",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );
  const contractEntryRows = tableRows(
    contractText,
    "Every chronology entry is one plain JSON-like object",
    "CHRONOLOGY_ENTRY_FIELD_COUNT:",
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
    "entries",
  ]);
  assert.deepEqual(readinessEntryRows.map((row) => row[1]), [
    "entry_ref",
    "review_state",
    "temporal_status",
    "declared_temporal_text",
    "review_text",
    "source_refs",
  ]);
  assert.match(docsText, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n4/u);
  assert.match(docsText, /FUTURE_SCHEMA_CHRONOLOGY_ENTRY_FIELD_COUNT:\n6/u);
});

test("identity references cardinality and enums remain exact contract facts", () => {
  const docsText = readRequired(docsRelativePath);
  const references = section(
    docsText,
    "## 6. Exact Future Identity And Reference Constraints",
    "## 7. Exact Future Enumerated Vocabularies",
  );
  const enums = section(
    docsText,
    "## 7. Exact Future Enumerated Vocabularies",
    "## 8. Temporal Coupling And Text-Encoding Boundary",
  );

  for (const exactPattern of [
    '`pattern: "^pkt_[a-z0-9][a-z0-9_-]{0,59}$"`',
    '`pattern: "^chr_[a-z0-9][a-z0-9_-]{0,59}$"`',
    '`pattern: "^src_[a-z0-9][a-z0-9_-]{0,59}$"`',
  ]) {
    assert.equal(references.includes(exactPattern), true, exactPattern);
  }

  assert.match(docsText, /minimum entry count \| `0`/u);
  assert.match(docsText, /maximum entry count \| `NO_CONTRACT_MAXIMUM`/u);
  assert.match(docsText, /must not invent `maxItems`/u);
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
});

test("temporal text uniqueness and cross-reference boundaries stay partitioned", () => {
  const docsText = readRequired(docsRelativePath);
  const temporal = section(
    docsText,
    "## 8. Temporal Coupling And Text-Encoding Boundary",
    "## 9. Source-Reference Array And Uniqueness Partition",
  );
  const uniqueness = section(
    docsText,
    "## 9. Source-Reference Array And Uniqueness Partition",
    "## 10. Source Register Cross-Reference Boundary",
  );
  const crossReference = section(
    docsText,
    "## 10. Source Register Cross-Reference Boundary",
    "## 11. JSON Schema Enforcement Limits",
  );

  assert.match(temporal, /`DECLARED` \| one trimmed, non-empty string/u);
  assert.match(temporal, /`UNKNOWN` \| exact `null`/u);
  assert.match(
    temporal,
    /TEMPORAL_COUPLING_SCHEMA_ENFORCEMENT:\nEXACT_FACT_AVAILABLE_ENCODING_OPEN/u,
  );
  assert.match(temporal, /TEXT_TRIM_SCHEMA_ENFORCEMENT:\nNOT_YET_CLAIMED/u);
  assert.match(temporal, /No ASCII-only, ECMAScript `\\s`, Unicode White_Space/u);

  assert.match(uniqueness, /array minimum \| `1`/u);
  assert.match(uniqueness, /`uniqueItems: true` can represent within-array/u);
  assert.match(
    uniqueness,
    /ENTRY_REF_UNIQUENESS_ENFORCEMENT:\nFUTURE_VALIDATOR_ONLY/u,
  );
  assert.match(
    uniqueness,
    /FUTURE_ENTRIES_UNIQUE_ITEMS_CLAIM:\nPROHIBITED_AS_COMPLETE_ENTRY_REF_UNIQUENESS_PROOF/u,
  );
  assert.match(
    crossReference,
    /SOURCE_REGISTER_PACKET_EQUALITY_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(
    crossReference,
    /SOURCE_REGISTER_MEMBERSHIP_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
});

test("JSON Schema limits do not overclaim order validator behavior or semantics", () => {
  const docsText = readRequired(docsRelativePath);
  const limits = section(
    docsText,
    "## 11. JSON Schema Enforcement Limits",
    "## 12. Separate Validator-Result Readiness",
  );

  assert.match(limits, /object-member insertion order/u);
  assert.match(limits, /canonical review order as temporal or factual order/u);
  assert.match(limits, /plain-object identity, own-data-property status/u);
  assert.match(limits, /eight validation phases, root short-circuit/u);
  assert.match(limits, /Source Register packet equality or membership/u);
  assert.match(limits, /does not inspect the meaning of allowed free text/u);
  assert.match(
    docsText,
    /VALIDATOR_RESULT_SCHEMA_IN_CANDIDATE_SCAFFOLD:\nNOT_DECIDED_AND_NOT_CREATED/u,
  );
});

test("all eleven scaffold-scope questions remain open and paths are reservations", () => {
  const docsText = readRequired(docsRelativePath);
  const openSection = section(
    docsText,
    "## 13. Open Scaffold-Scope Questions",
    "## 14. Non-Interference Rules",
  );
  const questions = openSection.split("\n").filter((line) => /^\d+\. /u.test(line));

  assert.equal(questions.length, 11);
  assert.match(openSection, /exact conditional representation/u);
  assert.match(openSection, /without guessing a whitespace taxonomy/u);
  assert.match(openSection, /property-level `entry_ref` uniqueness remains validator-only/u);
  assert.match(openSection, /validator-result schema remains a later sibling slice/u);
  assert.match(openSection, /OPEN_SCAFFOLD_SCOPE_QUESTION_COUNT:\n11/u);
  assert.equal(openSection.includes("`schemas/human-review-chronology.json`"), true);
  assert.equal(
    openSection.includes("`tests/human-review-chronology-schema.test.js`"),
    true,
  );
  assert.match(openSection, /Path reservation is not file creation or implementation authorization/u);
});

test("readiness remains docs-only source-safe and non-authorizing", () => {
  const docsText = readRequired(docsRelativePath);

  for (const token of [
    "DOCS_ONLY",
    "APPEND_ONLY_SCHEMA_READINESS_REVIEW",
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
    "TRACKED_DOCS_ONLY_SCHEMA_READINESS_WITH_OPEN_SCAFFOLD_SCOPE",
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
