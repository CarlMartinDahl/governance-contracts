"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_READINESS_BOUNDARY_v1.md";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const sourcePaths = [
  contractPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-chronology.json",
  "schemas/human-review-asserted-claim-matrix.json",
  "packages/schemas/src/index.js",
  "tests/human-review-source-register-schema.test.js",
];
const candidateSchemaPath =
  "schemas/human-review-declared-packet-review-gaps.json";
const candidateProofPath =
  "tests/human-review-declared-packet-review-gaps-schema.test.js";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function section(text, heading, nextHeading) {
  const start = text.indexOf(heading);
  assert.notEqual(start, -1, heading);
  const end = text.indexOf(nextHeading, start + heading.length);
  assert.notEqual(end, -1, nextHeading);
  return text.slice(start, end);
}

test("schema-readiness boundary references contract truth and comparison evidence", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(docsText, /Comparison evidence supplies repository workflow/u);
  assert.match(docsText, /does not authorize reuse of another\ncontract's fields/u);
});

test("twenty readiness rows separate schema validator and governance ownership", () => {
  const docsText = readRequired(docsPath);
  const classification = section(
    docsText,
    "## 3. Schema-Readiness Classification",
    "## 4.",
  );

  assert.equal(
    (classification.match(/^\| (?!Surface|---)[^|]+ \| `[^`]+` \|$/gmu) ?? []).length,
    20,
  );
  for (const token of [
    "EXACT_CONTRACT_FACT_AVAILABLE",
    "EXACT_SCHEMA_EXPRESSIBLE_FACT_AVAILABLE",
    "VALIDATOR_ONLY_NOT_JSON_SCHEMA_PROOF",
    "DOCUMENTATION_AND_VALIDATOR_ONLY",
    "SEPARATE_GOVERNANCE_CHECKPOINT_ONLY",
    "DOCUMENTATION_ONLY_NOT_SCHEMA_CLASSIFIER",
    "OPEN_FOR_SEPARATE_SCAFFOLD_SCOPE",
    "OPEN_FOR_SEPARATE_LATER_SIBLING_SCOPE",
  ]) {
    assert.equal(classification.includes("`" + token + "`"), true, token);
  }
  assert.match(classification, /SCHEMA_READINESS_CLASSIFICATION_ROW_COUNT:\n20/u);
  assert.match(
    classification,
    /SCHEMA_READINESS_RESULT:\nREADY_FOR_SEPARATE_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_REVIEW/u,
  );
  assert.match(classification, /SCHEMA_IMPLEMENTATION_STATUS:\nNOT_CREATED/u);
});

test("future root and gap-row fields exactly match the tracked contract", () => {
  const docsText = readRequired(docsPath);
  const contractText = readRequired(contractPath);
  const rootSection = section(docsText, "## 4.", "## 5.");
  const gapSection = section(docsText, "## 5.", "## 6.");

  for (const [position, field] of [
    [1, "contract_id"],
    [2, "contract_version"],
    [3, "packet_ref"],
    [4, "gaps"],
  ]) {
    const phrase = "| " + position + " | `" + field + "` |";
    assert.equal(rootSection.includes(phrase), true, phrase);
    assert.equal(contractText.includes(position + ". `" + field + "`"), true, field);
  }
  for (const [position, field] of [
    [1, "gap_ref"],
    [2, "declaration_origin"],
    [3, "declared_gap_text"],
    [4, "source_refs"],
    [5, "chronology_entry_refs"],
    [6, "claim_refs"],
  ]) {
    const phrase = "| " + position + " | `" + field + "` |";
    assert.equal(gapSection.includes(phrase), true, phrase);
    assert.equal(contractText.includes(position + ". `" + field + "`"), true, field);
  }
  assert.match(rootSection, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n4/u);
  assert.match(gapSection, /FUTURE_SCHEMA_GAP_ROW_FIELD_COUNT:\n6/u);
  assert.match(rootSection, /FUTURE_SCHEMA_ROOT_ADDITIONAL_FIELDS:\nNONE/u);
  assert.match(gapSection, /FUTURE_SCHEMA_GAP_ROW_ADDITIONAL_FIELDS:\nNONE/u);
});

test("ten schema-expressible scalar and array constraints remain exact", () => {
  const docsText = readRequired(docsPath);
  const constraintSection = section(docsText, "## 6.", "## 7.");

  assert.equal(
    (constraintSection.match(/^\| `[a-z_]+` \|/gmu) ?? []).length,
    10,
  );
  for (const literal of [
    'const: "human_review.declared_packet_review_gaps"',
    'const: "1.0.0"',
    '^pkt_[a-z0-9][a-z0-9_-]{0,59}$',
    '^gap_[a-z0-9][a-z0-9_-]{0,59}$',
    'const: "HUMAN_DECLARED"',
    "minLength: 1",
    "maxLength: 1000",
    '^src_[a-z0-9][a-z0-9_-]{0,59}$',
    '^chr_[a-z0-9][a-z0-9_-]{0,59}$',
    '^clm_[a-z0-9][a-z0-9_-]{0,59}$',
  ]) {
    assert.equal(constraintSection.includes(literal), true, literal);
  }
  assert.match(
    constraintSection,
    /FUTURE_SCHEMA_SCALAR_AND_ARRAY_CONSTRAINT_ROW_COUNT:\n10/u,
  );
  assert.match(constraintSection, /`uniqueItems: true` is exact for each scalar reference array/u);
});

test("JSON Schema limits preserve validator and governance-only behavior", () => {
  const docsText = readRequired(docsPath);
  const limits = section(docsText, "## 7.", "## 8.");

  assert.match(limits, /GAP_REF_UNIQUENESS_ENFORCEMENT:\nFUTURE_VALIDATOR_ONLY/u);
  assert.match(
    limits,
    /FUTURE_SCHEMA_GAP_ROW_UNIQUE_ITEMS_CLAIM:\nPROHIBITED_AS_COMPLETE_GAP_REF_UNIQUENESS_PROOF/u,
  );
  assert.match(
    limits,
    /CROSS_REFERENCE_MEMBERSHIP_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(limits, /object-member insertion order/u);
  assert.match(limits, /plain-object identity/u);
  assert.match(limits, /does not inspect\nallowed free text/u);
});

test("historical open questions and candidate paths follow the tracked proof transition", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const openSection = section(docsText, "## 9.", "## 10.");

  assert.equal((openSection.match(/^\d+\. /gmu) ?? []).length, 9);
  assert.match(openSection, /OPEN_SCAFFOLD_SCOPE_QUESTION_COUNT:\n9/u);
  for (const reservedPath of [candidateSchemaPath, candidateProofPath]) {
    assert.equal(openSection.includes("`" + reservedPath + "`"), true, reservedPath);
    assert.equal(
      transitionText.includes(
        "`" +
          reservedPath +
          "` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      reservedPath,
    );
  }
  assert.match(openSection, /Path reservation is not file creation or implementation authorization/u);
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n2/u);
  assert.equal(
    transitionText.includes(
      "`tests/domain-human-review-declared-packet-review-gaps-schema-readiness-boundary-doc-freeze.test.js`",
    ),
    true,
  );
  assert.match(
    docsText,
    /VALIDATOR_RESULT_SCHEMA_IN_CANDIDATE_SCAFFOLD:\nEXCLUDED_AND_NOT_CREATED/u,
  );
  assert.match(
    docsText,
    /CROSS_REFERENCE_CHECKPOINT_IN_CANDIDATE_SCAFFOLD:\nEXCLUDED_AND_NOT_CREATED/u,
  );
});

test("readiness remains exact two-file docs-only and non-authorizing", () => {
  const docsText = readRequired(docsPath);
  const exactProofPath =
    "tests/domain-human-review-declared-packet-review-gaps-schema-readiness-boundary-doc-freeze.test.js";

  assert.match(docsText, /SCHEMA_READINESS_SLICE_FILE_COUNT:\n2/u);
  assert.equal(docsText.includes("`" + docsPath + "`"), true);
  assert.equal(docsText.includes("`" + exactProofPath + "`"), true);
  for (const marker of [
    "DOCS_ONLY",
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_REAL_PRIVATE_SOURCE_MATERIAL_USE_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_SCHEMA_READINESS_WITH_OPEN_SCAFFOLD_SCOPE",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
