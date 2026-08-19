"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const contractRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md";
const sourcePaths = [
  contractRelativePath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-chronology.json",
  "packages/schemas/src/index.js",
  "tests/human-review-source-register-schema.test.js",
  "tests/human-review-chronology-schema.test.js",
];
const futurePaths = [
  "schemas/human-review-asserted-claim-matrix.json",
  "tests/human-review-asserted-claim-matrix-schema.test.js",
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

test("schema-scaffold scope references claim-matrix truth and convention evidence", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(docsText, /Convention evidence supplies file layout, Draft 2020-12/u);
  assert.match(docsText, /does not supply Asserted/u);
  assert.match(docsText, /Claim Matrix fields, values, limits/u);
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
    "## 6. Exact Future Claims Array And Local Definition",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );

  assert.deepEqual(identityRows, [
    ["$schema", "https://json-schema.org/draft/2020-12/schema"],
    [
      "$id",
      "https://governance-contracts.invalid/schemas/human-review-asserted-claim-matrix.json",
    ],
    ["title", "Human Review Asserted Claim Matrix Contract Scaffold"],
    ["type", "object"],
    ["additionalProperties", "false"],
  ]);
  assert.deepEqual(rootRows.map((row) => row[1]), [
    "contract_id",
    "contract_version",
    "packet_ref",
    "claims",
  ]);
  assert.match(docsText, /FUTURE_SCHEMA_REQUIRED_ROOT_PROPERTY_COUNT:\n4/u);
  assert.match(docsText, /FUTURE_SCHEMA_OPTIONAL_ROOT_PROPERTIES:\nNONE/u);
  assert.match(docsText, /FUTURE_SCHEMA_ADDITIONAL_ROOT_PROPERTIES:\nFALSE/u);
  assert.match(docsText, /FUTURE_SCHEMA_DRAFT:\nDRAFT_2020_12/u);
});

test("future claims array and local claimRow definition remain narrowly scoped", () => {
  const docsText = readRequired(docsRelativePath);
  const claimsSection = section(
    docsText,
    "## 6. Exact Future Claims Array And Local Definition",
    "## 7. Exact Future Review-State Vocabulary",
  );
  const claimRows = tableRows(
    docsText,
    "Its `required` array and `properties` object must contain exactly these six",
    "FUTURE_SCHEMA_CLAIM_ROW_DEF_NAME:",
    /^\| \d+ \| `[a-z_]+` \|/u,
  );

  assert.match(claimsSection, /\| `minItems` \| `0` \|/u);
  assert.match(claimsSection, /\| `items\.\$ref` \| `#\/\$defs\/claimRow` \|/u);
  assert.match(claimsSection, /FUTURE_SCHEMA_CLAIMS_MAX_ITEMS:\nOMITTED/u);
  assert.match(
    claimsSection,
    /FUTURE_SCHEMA_CLAIMS_UNIQUE_ITEMS:\nOMITTED_PROPERTY_LEVEL_CLAIM_REF_UNIQUENESS_REMAINS_VALIDATOR_ONLY/u,
  );
  assert.deepEqual(claimRows.map((row) => row[1]), [
    "claim_ref",
    "review_state",
    "asserted_claim_text",
    "supplied_material_observation_text",
    "source_refs",
    "chronology_entry_refs",
  ]);
  assert.match(claimsSection, /FUTURE_SCHEMA_CLAIM_ROW_DEF_NAME:\nclaimRow/u);
  assert.match(
    claimsSection,
    /FUTURE_SCHEMA_REQUIRED_CLAIM_ROW_PROPERTY_COUNT:\n6/u,
  );
  assert.match(
    claimsSection,
    /FUTURE_SCHEMA_ADDITIONAL_CLAIM_ROW_PROPERTIES:\nFALSE/u,
  );
});

test("future review-state enum and state-observation coupling are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const states = section(
    docsText,
    "## 7. Exact Future Review-State Vocabulary",
    "## 8. Exact Future State-Observation Coupling",
  );
  const coupling = section(
    docsText,
    "## 8. Exact Future State-Observation Coupling",
    "## 9. Exact Future Text And Reference-Array Scope",
  );

  for (const value of [
    "ASSERTED",
    "APPEARS_IN_SUPPLIED_MATERIAL",
    "NOT_ESTABLISHED",
    "HUMAN_REVIEW_REQUIRED",
  ]) {
    assert.equal(states.includes(`\`${value}\``), true, value);
  }
  assert.match(states, /FUTURE_SCHEMA_REVIEW_STATE_ENUM_COUNT:\n4/u);
  assert.match(coupling, /ordered type array `\["string", "null"\]`/u);
  assert.match(coupling, /\| 1 \| `const: "ASSERTED"` \| `const: null` \|/u);
  assert.match(
    coupling,
    /\| 2 \| `const: "APPEARS_IN_SUPPLIED_MATERIAL"` \| `type: "string"`, `minLength: 1` \|/u,
  );
  assert.match(coupling, /\| 3 \| `const: "NOT_ESTABLISHED"` \| `const: null` \|/u);
  assert.match(
    coupling,
    /\| 4 \| `const: "HUMAN_REVIEW_REQUIRED"` \| nested `oneOf`/u,
  );
  assert.match(
    coupling,
    /FUTURE_SCHEMA_STATE_OBSERVATION_COUPLING_KEYWORD:\noneOf/u,
  );
  assert.match(
    coupling,
    /FUTURE_SCHEMA_STATE_OBSERVATION_COUPLING_BRANCH_COUNT:\n4/u,
  );
  assert.match(
    coupling,
    /FUTURE_SCHEMA_HUMAN_REVIEW_OBSERVATION_BRANCH_COUNT:\n2/u,
  );
});

test("future text and both reference arrays stay exact and bounded", () => {
  const docsText = readRequired(docsRelativePath);
  const textAndRefs = section(
    docsText,
    "## 9. Exact Future Text And Reference-Array Scope",
    "## 10. Contract Rules Deliberately Outside Candidate Schema Enforcement",
  );
  const sourceRefs = section(
    textAndRefs,
    "The future `source_refs` property must contain exactly these keywords",
    "FUTURE_SCHEMA_SOURCE_REFS_MAX_ITEMS:",
  );
  const chronologyRefs = section(
    textAndRefs,
    "The future `chronology_entry_refs` property must contain exactly these",
    "FUTURE_SCHEMA_CHRONOLOGY_ENTRY_REFS_MAX_ITEMS:",
  );

  assert.match(textAndRefs, /FUTURE_SCHEMA_TEXT_MAX_LENGTH:\nOMITTED_NO_CONTRACT_MAXIMUM/u);
  assert.match(textAndRefs, /FUTURE_SCHEMA_TEXT_PATTERN:\nOMITTED/u);
  assert.match(textAndRefs, /TEXT_TRIMMING_OR_NORMALIZATION:\nPROHIBITED/u);
  assert.match(textAndRefs, /Padded and whitespace-only non-empty strings/u);
  assert.match(sourceRefs, /\| `minItems` \| `1` \|/u);
  assert.match(sourceRefs, /\| `uniqueItems` \| `true` \|/u);
  assert.match(sourceRefs, /\| `items\.pattern` \| `\^src_/u);
  assert.match(chronologyRefs, /\| `minItems` \| `0` \|/u);
  assert.match(chronologyRefs, /\| `uniqueItems` \| `true` \|/u);
  assert.match(chronologyRefs, /\| `items\.pattern` \| `\^chr_/u);
  assert.match(
    textAndRefs,
    /FUTURE_SCHEMA_SOURCE_REFS_MAX_ITEMS:\nOMITTED_NO_CONTRACT_MAXIMUM/u,
  );
  assert.match(
    textAndRefs,
    /FUTURE_SCHEMA_CHRONOLOGY_ENTRY_REFS_MAX_ITEMS:\nOMITTED_NO_CONTRACT_MAXIMUM/u,
  );
});

test("claim uniqueness cross-reference duties and sibling surfaces stay separate", () => {
  const docsText = readRequired(docsRelativePath);
  const outside = section(
    docsText,
    "## 10. Contract Rules Deliberately Outside Candidate Schema Enforcement",
    "## 11. Separate Sibling Surfaces",
  );
  const siblings = section(
    docsText,
    "## 11. Separate Sibling Surfaces",
    "## 12. Exact Future Proof Scope",
  );

  assert.match(outside, /CLAIM_REF_UNIQUENESS_KEYWORD:\nNONE/u);
  assert.match(
    outside,
    /CLAIM_REF_UNIQUENESS_ENFORCEMENT:\nSEPARATE_FUTURE_VALIDATOR_ONLY/u,
  );
  assert.match(
    outside,
    /PACKET_EQUALITY_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(
    outside,
    /SOURCE_REGISTER_MEMBERSHIP_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(
    outside,
    /REVIEW_CHRONOLOGY_MEMBERSHIP_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(outside, /`uniqueItems: true` is prohibited on `claims`/u);
  assert.match(siblings, /package schema export in `packages\/schemas\/src\/index\.js`/u);
  assert.match(siblings, /validator-result JSON Schema/u);
  assert.match(siblings, /structural validator/u);
  assert.match(siblings, /cross-reference result and checkpoint/u);
  assert.match(siblings, /OUT_OF_SCOPE_NOT_AUTHORIZED/u);
});

test("all thirteen readiness questions receive bounded non-runtime scope answers", () => {
  const docsText = readRequired(docsRelativePath);
  const resolved = section(
    docsText,
    "## 13. Resolved Readiness Questions",
    "## 14. Non-Interference Rules",
  );
  const rows = resolved.split("\n").filter((line) => /^\| \d+ \|/u.test(line));

  assert.equal(rows.length, 13);
  assert.match(resolved, /one local `\$defs\.claimRow`/u);
  assert.match(resolved, /exact four-branch outer `oneOf`/u);
  assert.match(resolved, /ordered string\/null base type/u);
  assert.match(resolved, /source-reference minimum and uniqueness/u);
  assert.match(resolved, /chronology-reference minimum and uniqueness/u);
  assert.match(resolved, /future validator-only rule/u);
  assert.match(resolved, /package export in smallest scaffold \| excluded/u);
  assert.match(resolved, /validator-result schema in smallest scaffold \| excluded/u);
  assert.match(resolved, /cross-reference result and implementation \| excluded/u);
  assert.match(resolved, /RESOLVED_SCAFFOLD_SCOPE_QUESTION_COUNT:\n13/u);
});

test("scaffold scope remains docs-only source-safe and non-authorizing", () => {
  const docsText = readRequired(docsRelativePath);

  for (const token of [
    "DOCS_ONLY",
    "APPEND_ONLY_SCHEMA_SCAFFOLD_SCOPE",
    "EXACT_TWO_FILE_FUTURE_SCOPE_DEFINED",
    "FOUR_BRANCH_ONE_OF_STATE_OBSERVATION_COUPLING_SELECTED",
    "NESTED_ONE_OF_HUMAN_REVIEW_OBSERVATION_SELECTED",
    "TEXT_TRIMMING_OR_NORMALIZATION_PROHIBITED",
    "CLAIM_REF_PROPERTY_UNIQUENESS_DEFERRED_TO_VALIDATOR",
    "SOURCE_REGISTER_AND_CHRONOLOGY_MEMBERSHIP_DEFERRED_TO_GOVERNANCE_CHECKPOINT",
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
