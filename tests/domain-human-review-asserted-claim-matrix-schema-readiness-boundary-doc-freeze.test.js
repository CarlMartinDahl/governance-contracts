"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_READINESS_BOUNDARY_v1.md";
const contractRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md";
const sourcePaths = [
  contractRelativePath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-chronology.json",
  "schemas/human-review-source-register.json",
  "tests/human-review-chronology-schema.test.js",
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

test("schema-readiness boundary references claim-matrix truth and comparison evidence", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /Comparison evidence supplies repository workflow, file layout, Draft 2020-12/u,
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
    "OPEN_FOR_SEPARATE_LATER_GOVERNANCE_SCOPE",
  ]) {
    assert.equal(classification.includes(`\`${token}\``), true, token);
  }

  assert.match(
    classification,
    /SCHEMA_READINESS_RESULT:\nREADY_FOR_SEPARATE_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_REVIEW/u,
  );
  assert.match(classification, /SCHEMA_IMPLEMENTATION_STATUS:\nNOT_CREATED/u);
  assert.match(classification, /releases only the two reserved/u);
});

test("future root and claim-row field surfaces exactly match the contract", () => {
  const docsText = readRequired(docsRelativePath);
  const contractText = readRequired(contractRelativePath);
  const readinessRootRows = tableRows(
    docsText,
    "## 4. Exact Future Candidate Root Shape",
    "## 5. Exact Future Claim-Row Shape And Array Cardinality",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );
  const contractRootRows = tableRows(
    contractText,
    "## 4. Exact Top-Level Shape",
    "## 5. Exact Claim-Row Shape And Cardinality",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );
  const readinessClaimRows = tableRows(
    docsText,
    "A future claim-row schema may consider only these six fields",
    "FUTURE_SCHEMA_CLAIM_ROW_FIELD_COUNT:",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );
  const contractClaimRows = tableRows(
    contractText,
    "Every claim row is one plain JSON-like object",
    "CLAIM_ROW_FIELD_COUNT:",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );

  assert.deepEqual(
    readinessRootRows.map((row) => row.slice(0, 3)),
    contractRootRows.map((row) => row.slice(0, 3)),
  );
  assert.deepEqual(
    readinessClaimRows.map((row) => row.slice(0, 3)),
    contractClaimRows.map((row) => row.slice(0, 3)),
  );
  assert.deepEqual(readinessRootRows.map((row) => row[1]), [
    "contract_id",
    "contract_version",
    "packet_ref",
    "claims",
  ]);
  assert.deepEqual(readinessClaimRows.map((row) => row[1]), [
    "claim_ref",
    "review_state",
    "asserted_claim_text",
    "supplied_material_observation_text",
    "source_refs",
    "chronology_entry_refs",
  ]);
  assert.match(docsText, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n4/u);
  assert.match(docsText, /FUTURE_SCHEMA_CLAIM_ROW_FIELD_COUNT:\n6/u);
});

test("identity references cardinality and review states remain exact contract facts", () => {
  const docsText = readRequired(docsRelativePath);
  const references = section(
    docsText,
    "## 6. Exact Future Identity And Reference Constraints",
    "## 7. Exact Future Review-State Vocabulary",
  );
  const states = section(
    docsText,
    "## 7. Exact Future Review-State Vocabulary",
    "## 8. State-Observation Coupling And Text-Encoding Boundary",
  );

  for (const exactPattern of [
    '`pattern: "^pkt_[a-z0-9][a-z0-9_-]{0,59}$"`',
    '`pattern: "^clm_[a-z0-9][a-z0-9_-]{0,59}$"`',
    '`pattern: "^src_[a-z0-9][a-z0-9_-]{0,59}$"`',
    '`pattern: "^chr_[a-z0-9][a-z0-9_-]{0,59}$"`',
  ]) {
    assert.equal(references.includes(exactPattern), true, exactPattern);
  }
  for (const exactIdentityRow of [
    '| `contract_id` | `const: "human_review.asserted_claim_matrix"` |',
    '| `contract_version` | `const: "1.0.0"` |',
  ]) {
    assert.equal(references.includes(exactIdentityRow), true, exactIdentityRow);
  }

  assert.match(docsText, /minimum claim-row count \| `0`/u);
  assert.match(docsText, /maximum claim-row count \| `NO_CONTRACT_MAXIMUM`/u);
  assert.match(docsText, /must not invent `maxItems`/u);
  for (const value of [
    "ASSERTED",
    "APPEARS_IN_SUPPLIED_MATERIAL",
    "NOT_ESTABLISHED",
    "HUMAN_REVIEW_REQUIRED",
  ]) {
    assert.equal(states.includes(`\`${value}\``), true, value);
  }
  assert.match(states, /FUTURE_SCHEMA_REVIEW_STATE_ENUM_COUNT:\n4/u);
});

test("state text uniqueness and cross-reference boundaries stay partitioned", () => {
  const docsText = readRequired(docsRelativePath);
  const coupling = section(
    docsText,
    "## 8. State-Observation Coupling And Text-Encoding Boundary",
    "## 9. Reference Arrays And Uniqueness Partition",
  );
  const uniqueness = section(
    docsText,
    "## 9. Reference Arrays And Uniqueness Partition",
    "## 10. Source Register And Review Chronology Cross-Reference Boundary",
  );
  const sourceRefs = section(
    uniqueness,
    "The `source_refs` field has these exact future constraints:",
    "The `chronology_entry_refs` field has these exact future constraints:",
  );
  const chronologyEntryRefs = section(
    uniqueness,
    "The `chronology_entry_refs` field has these exact future constraints:",
    "Because both fields are arrays of scalar strings",
  );
  const crossReference = section(
    docsText,
    "## 10. Source Register And Review Chronology Cross-Reference Boundary",
    "## 11. JSON Schema Enforcement Limits",
  );

  assert.match(coupling, /`ASSERTED` \| exact `null`/u);
  assert.match(coupling, /`APPEARS_IN_SUPPLIED_MATERIAL` \| one non-empty string/u);
  assert.match(coupling, /`NOT_ESTABLISHED` \| exact `null`/u);
  assert.match(coupling, /`HUMAN_REVIEW_REQUIRED` \| exact `null` or one non-empty string/u);
  assert.match(
    coupling,
    /STATE_OBSERVATION_COUPLING_SCHEMA_ENFORCEMENT:\nEXACT_FACT_AVAILABLE_ENCODING_OPEN/u,
  );
  assert.match(coupling, /TEXT_MINIMUM_LENGTH_FACT:\nONE_UNICODE_CODE_POINT/u);
  assert.match(
    coupling,
    /TEXT_MAXIMUM_LENGTH_KEYWORD:\nPROHIBITED_BY_NO_CONTRACT_MAXIMUM/u,
  );
  assert.match(coupling, /TEXT_TRIMMING_OR_NORMALIZATION:\nPROHIBITED/u);

  assert.match(sourceRefs, /array minimum \| `1`/u);
  assert.match(sourceRefs, /array maximum \| `NO_CONTRACT_MAXIMUM`/u);
  assert.match(sourceRefs, /duplicate strings within one claim row \| prohibited/u);
  assert.match(sourceRefs, /reuse across different claim rows \| allowed/u);
  assert.match(chronologyEntryRefs, /array minimum \| `0`/u);
  assert.match(chronologyEntryRefs, /array maximum \| `NO_CONTRACT_MAXIMUM`/u);
  assert.match(
    chronologyEntryRefs,
    /duplicate strings within one claim row \| prohibited/u,
  );
  assert.match(chronologyEntryRefs, /reuse across different claim rows \| allowed/u);
  assert.match(uniqueness, /`uniqueItems: true` can represent exact-string uniqueness/u);
  assert.match(
    uniqueness,
    /REFERENCE_ARRAY_UNIQUE_ITEMS_REPRESENTATION:\nAVAILABLE_FOR_LATER_SCAFFOLD_SCOPE_DECISION/u,
  );
  assert.match(
    uniqueness,
    /CLAIM_REF_UNIQUENESS_ENFORCEMENT:\nFUTURE_VALIDATOR_ONLY/u,
  );
  assert.match(
    uniqueness,
    /FUTURE_CLAIMS_UNIQUE_ITEMS_CLAIM:\nPROHIBITED_AS_COMPLETE_CLAIM_REF_UNIQUENESS_PROOF/u,
  );
  assert.match(
    crossReference,
    /PACKET_EQUALITY_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(
    crossReference,
    /SOURCE_REGISTER_MEMBERSHIP_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(
    crossReference,
    /REVIEW_CHRONOLOGY_MEMBERSHIP_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
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
  assert.match(limits, /canonical review order as truth, evidence, priority, or ranking order/u);
  assert.match(limits, /plain-object identity, own-data-property status/u);
  assert.match(limits, /eight validation phases, root short-circuit/u);
  assert.match(limits, /Source Register membership, or Review Chronology membership/u);
  assert.match(limits, /does not inspect the meaning of allowed free/u);
  assert.match(
    docsText,
    /VALIDATOR_RESULT_SCHEMA_IN_CANDIDATE_SCAFFOLD:\nNOT_DECIDED_AND_NOT_CREATED/u,
  );
});

test("all thirteen scaffold-scope questions remain open and paths are reservations", () => {
  const docsText = readRequired(docsRelativePath);
  const openSection = section(
    docsText,
    "## 13. Open Scaffold-Scope Questions",
    "## 14. Non-Interference Rules",
  );
  const questions = openSection.split("\n").filter((line) => /^\d+\. /u.test(line));

  assert.equal(questions.length, 13);
  assert.match(openSection, /exact conditional representation/u);
  assert.match(openSection, /property-level `claim_ref` uniqueness remains validator-only/u);
  assert.match(openSection, /cross-reference result and implementation remain later/u);
  assert.match(openSection, /OPEN_SCAFFOLD_SCOPE_QUESTION_COUNT:\n13/u);
  assert.equal(
    openSection.includes("`schemas/human-review-asserted-claim-matrix.json`"),
    true,
  );
  assert.equal(
    openSection.includes("`tests/human-review-asserted-claim-matrix-schema.test.js`"),
    true,
  );
  assert.match(openSection, /Path release is not schema creation/u);
});

test("readiness remains docs-only source-safe and non-authorizing", () => {
  const docsText = readRequired(docsRelativePath);

  for (const token of [
    "DOCS_ONLY",
    "APPEND_ONLY_SCHEMA_READINESS_REVIEW",
    "SCHEMA_PROOF_TRANSITION_PREREQUISITE_TRACKED",
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_PROOF_NOT_CREATED",
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
