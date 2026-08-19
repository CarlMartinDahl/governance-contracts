"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-no-conclusion-notice-schema-readiness-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_v1.md";
const sourcePaths = [
  contractPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-chronology.json",
  "schemas/human-review-asserted-claim-matrix.json",
  "schemas/human-review-declared-packet-review-gaps.json",
  "schemas/human-review-questions.json",
  "packages/schemas/src/index.js",
  "tests/human-review-questions-schema.test.js",
];
const candidateSchemaPath =
  "schemas/human-review-no-conclusion-notice.json";
const candidateProofPath =
  "tests/human-review-no-conclusion-notice-schema.test.js";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function section(text, heading, nextHeading) {
  const start = text.indexOf(heading);
  const end = text.indexOf(nextHeading, start + heading.length);

  assert.notEqual(start, -1, heading);
  assert.notEqual(end, -1, nextHeading);
  return text.slice(start, end);
}

test("readiness references contract truth and comparison evidence", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(docsText, /Comparison evidence supplies repository workflow/u);
  assert.match(
    docsText,
    /does not\nauthorize reuse of another contract's fields/u,
  );
});

test("twenty-four rows separate schema validator and governance ownership", () => {
  const docsText = readRequired(docsPath);
  const classification = section(
    docsText,
    "## 3. Schema-Readiness Classification",
    "## 4.",
  );

  assert.equal(
    (classification.match(/^\| (?!Surface|---)[^|]+ \| `[^`]+` \|$/gmu) ?? [])
      .length,
    24,
  );
  for (const token of [
    "EXACT_CONTRACT_FACT_AVAILABLE",
    "EXACT_SCHEMA_EXPRESSIBLE_FACT_AVAILABLE",
    "VALIDATOR_ONLY_NOT_JSON_SCHEMA_PROOF",
    "DOCUMENTATION_AND_VALIDATOR_ONLY",
    "DOCUMENTATION_AND_FUTURE_ORCHESTRATOR_ONLY",
    "SEPARATE_GOVERNANCE_CHECKPOINT_ONLY",
    "SCHEMA_CLOSURE_AND_DOCUMENTATION_BOUNDARY",
    "DOCUMENTATION_ONLY_NOT_SCHEMA_CLASSIFIER",
    "OPEN_FOR_SEPARATE_SCAFFOLD_SCOPE",
    "OPEN_FOR_SEPARATE_LATER_SCOPE",
    "OPEN_FOR_SEPARATE_LATER_SIBLING_SCOPE",
  ]) {
    assert.equal(classification.includes("`" + token + "`"), true, token);
  }
  assert.match(classification, /SCHEMA_READINESS_CLASSIFICATION_ROW_COUNT:\n24/u);
  assert.match(
    classification,
    /SCHEMA_READINESS_RESULT:\nREADY_FOR_SEPARATE_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_REVIEW/u,
  );
  assert.match(classification, /SCHEMA_IMPLEMENTATION_STATUS:\nNOT_CREATED/u);
});

test("future root and notice-row fields exactly match the contract", () => {
  const docsText = readRequired(docsPath);
  const contractText = readRequired(contractPath);
  const root = section(docsText, "## 4.", "## 5.");
  const row = section(docsText, "## 5.", "## 6.");

  for (const [position, field] of [
    [1, "contract_id"],
    [2, "contract_version"],
    [3, "packet_ref"],
    [4, "notices"],
  ]) {
    const phrase = `| ${position} | \`${field}\` |`;
    assert.equal(root.includes(phrase), true, phrase);
    assert.equal(contractText.includes(`${position}. \`${field}\``), true, field);
  }
  for (const [position, field] of [
    [1, "notice_ref"],
    [2, "declaration_origin"],
    [3, "notice_code"],
    [4, "notice_text"],
    [5, "source_refs"],
    [6, "chronology_entry_refs"],
    [7, "claim_refs"],
    [8, "gap_refs"],
    [9, "question_refs"],
  ]) {
    const phrase = `| ${position} | \`${field}\` |`;
    assert.equal(row.includes(phrase), true, phrase);
    assert.equal(contractText.includes(`${position}. \`${field}\``), true, field);
  }
  assert.match(root, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n4/u);
  assert.match(row, /FUTURE_SCHEMA_NOTICE_ROW_FIELD_COUNT:\n9/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_ADDITIONAL_FIELDS:\nNONE/u);
  assert.match(row, /FUTURE_SCHEMA_NOTICE_ROW_ADDITIONAL_FIELDS:\nNONE/u);
  assert.match(root, /Workspace-level optionality/u);
});

test("fourteen exact schema-expressible constraints are frozen", () => {
  const docsText = readRequired(docsPath);
  const constraints = section(docsText, "## 6.", "## 7.");

  assert.equal(
    (
      constraints.match(
        /^\| (?!Field or row rule|---)(?:`[^`]+`|notice-row total references) \|/gmu,
      ) ?? []
    ).length,
    14,
  );
  for (const literal of [
    'const: "human_review.no_conclusion_notice"',
    'const: "1.0.0"',
    "^pkt_[a-z0-9][a-z0-9_-]{0,59}$",
    "minItems: 1",
    "^ncn_[a-z0-9][a-z0-9_-]{0,59}$",
    'const: "BOUNDARY_DECLARED"',
    'const: "NO_MODEL_CONCLUSION_UNDER_CURRENT_BOUNDARY"',
    "No model conclusion is established under the current boundary.",
    "^src_[a-z0-9][a-z0-9_-]{0,59}$",
    "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
    "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
    "^gap_[a-z0-9][a-z0-9_-]{0,59}$",
    "^qst_[a-z0-9][a-z0-9_-]{0,59}$",
  ]) {
    assert.equal(constraints.includes(literal), true, literal);
  }
  assert.match(
    constraints,
    /FUTURE_SCHEMA_SCALAR_ARRAY_AND_COMBINED_CONSTRAINT_ROW_COUNT:\n14/u,
  );
  assert.match(
    constraints,
    /row-level `anyOf` with exactly five branches requiring `minItems: 1`/u,
  );
});

test("schema limits preserve presence identity and cross-reference boundaries", () => {
  const docsText = readRequired(docsPath);
  const limits = section(docsText, "## 7.", "## 8.");

  assert.match(limits, /NOTICE_REF_UNIQUENESS_ENFORCEMENT:\nFUTURE_VALIDATOR_ONLY/u);
  assert.match(
    limits,
    /FUTURE_SCHEMA_NOTICE_ROW_UNIQUE_ITEMS_CLAIM:\nPROHIBITED_AS_COMPLETE_NOTICE_REF_UNIQUENESS_PROOF/u,
  );
  assert.match(
    limits,
    /WORKSPACE_OUTPUT_PRESENCE_ENFORCEMENT:\nFUTURE_ORCHESTRATOR_ONLY/u,
  );
  assert.match(
    limits,
    /BOUNDARY_EXECUTION_OR_TRIGGER_PROOF:\nNOT_PROVIDED_BY_JSON_SCHEMA/u,
  );
  assert.match(
    limits,
    /CROSS_REFERENCE_MEMBERSHIP_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(limits, /object-member insertion order/u);
  assert.match(limits, /do not prove an executed\nmodel refusal/u);
});

test("historical open questions and candidate paths follow the tracked proof transition", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const open = section(docsText, "## 9.", "## 10.");

  assert.equal((open.match(/^\d+\. /gmu) ?? []).length, 10);
  assert.match(open, /OPEN_SCAFFOLD_SCOPE_QUESTION_COUNT:\n10/u);
  for (const candidatePath of [candidateSchemaPath, candidateProofPath]) {
    assert.equal(open.includes("`" + candidatePath + "`"), true, candidatePath);
    assert.equal(
      transitionText.includes(
        "`" +
          candidatePath +
          "` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  assert.match(open, /Path reservation is not file creation/u);
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n2/u);
  assert.equal(
    transitionText.includes(
      "`tests/domain-human-review-no-conclusion-notice-schema-readiness-boundary-doc-freeze.test.js`",
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

  assert.match(docsText, /SCHEMA_READINESS_SLICE_FILE_COUNT:\n2/u);
  for (const exactPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes("`" + exactPath + "`"), true, exactPath);
    readRequired(exactPath);
  }
  for (const marker of [
    "DOCS_ONLY",
    "NONEMPTY_NOTICE_AND_AT_LEAST_ONE_REFERENCE_RULES_SCHEMA_EXPRESSIBLE",
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_SCHEMA_READINESS_WITH_OPEN_SCAFFOLD_SCOPE",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
