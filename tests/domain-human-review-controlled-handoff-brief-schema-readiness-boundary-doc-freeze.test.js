"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-brief-schema-readiness-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md";
const sourcePaths = [
  contractPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-chronology.json",
  "schemas/human-review-asserted-claim-matrix.json",
  "schemas/human-review-declared-packet-review-gaps.json",
  "schemas/human-review-questions.json",
  "schemas/human-review-no-conclusion-notice.json",
  "packages/schemas/src/index.js",
  "tests/human-review-no-conclusion-notice-schema.test.js",
];
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-brief.json";
const candidateProofPath =
  "tests/human-review-controlled-handoff-brief-schema.test.js";

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
    /does not authorize reuse of\nanother contract's fields/u,
  );
});

test("twenty-two rows separate schema validator checkpoint and runtime ownership", () => {
  const docsText = readRequired(docsPath);
  const classification = section(
    docsText,
    "## 3. Schema-Readiness Classification",
    "## 4.",
  );

  assert.equal(
    (classification.match(/^\| (?!Surface|---)[^|]+ \| `[^`]+` \|$/gmu) ?? [])
      .length,
    22,
  );
  for (const token of [
    "EXACT_CONTRACT_FACT_AVAILABLE",
    "EXACT_SCHEMA_EXPRESSIBLE_FACT_AVAILABLE",
    "VALIDATOR_ONLY_NOT_JSON_SCHEMA_PROOF",
    "DOCUMENTATION_AND_VALIDATOR_ONLY",
    "SCHEMA_CLOSURE_AND_DOCUMENTATION_BOUNDARY",
    "DOCUMENTATION_AND_FUTURE_APPROVAL_WORKFLOW_ONLY",
    "SEPARATE_GOVERNANCE_CHECKPOINT_ONLY",
    "OPEN_FOR_SEPARATE_LATER_RUNTIME_SCOPE",
    "OPEN_FOR_SEPARATE_LATER_SIBLING_SCOPE",
    "OPEN_FOR_SEPARATE_LATER_SCOPE",
    "OPEN_FOR_SEPARATE_SCAFFOLD_SCOPE",
    "OUT_OF_SCOPE_NOT_AUTHORIZED",
  ]) {
    assert.equal(classification.includes("`" + token + "`"), true, token);
  }
  assert.match(classification, /SCHEMA_READINESS_CLASSIFICATION_ROW_COUNT:\n22/u);
  assert.match(
    classification,
    /SCHEMA_READINESS_RESULT:\nREADY_FOR_SEPARATE_DOCS_ONLY_SCHEMA_SCAFFOLD_SCOPE_REVIEW/u,
  );
  assert.match(classification, /SCHEMA_IMPLEMENTATION_STATUS:\nNOT_CREATED/u);
});

test("future root and component-reference fields exactly match the contract", () => {
  const docsText = readRequired(docsPath);
  const contractText = readRequired(contractPath);
  const root = section(docsText, "## 4.", "## 5.");
  const components = section(docsText, "## 5.", "## 6.");
  const rootFields = [
    "contract_id",
    "contract_version",
    "packet_ref",
    "handoff_posture",
    "component_refs",
  ];
  const componentFields = [
    "source_register_ref",
    "review_chronology_ref",
    "asserted_claim_matrix_ref",
    "declared_packet_review_gaps_ref",
    "human_review_questions_ref",
    "no_conclusion_notice_ref",
  ];

  for (const [index, field] of rootFields.entries()) {
    const phrase = "| " + (index + 1) + " | `" + field + "` |";
    assert.equal(root.includes(phrase), true, phrase);
    assert.equal(
      contractText.includes(index + 1 + ". `" + field + "`"),
      true,
      field,
    );
  }
  for (const [index, field] of componentFields.entries()) {
    const phrase = "| " + (index + 1) + " | `" + field + "` |";
    assert.equal(components.includes(phrase), true, phrase);
    assert.equal(
      contractText.includes(index + 1 + ". `" + field + "`"),
      true,
      field,
    );
  }
  assert.match(root, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n5/u);
  assert.match(
    components,
    /FUTURE_SCHEMA_COMPONENT_REFERENCE_FIELD_COUNT:\n6/u,
  );
  assert.match(root, /FUTURE_SCHEMA_ROOT_ADDITIONAL_FIELDS:\nNONE/u);
  assert.match(
    components,
    /FUTURE_SCHEMA_COMPONENT_REFERENCE_ADDITIONAL_FIELDS:\nNONE/u,
  );
  assert.equal(
    components.includes("`^hro_[a-z0-9][a-z0-9_-]{0,59}$`"),
    true,
  );
});

test("eleven exact schema-expressible constraints are frozen", () => {
  const docsText = readRequired(docsPath);
  const constraints = section(docsText, "## 6.", "## 7.");

  assert.equal(
    (
      constraints.match(
        /^\| (?!Field or object rule|---)`[^`]+` \|/gmu,
      ) ?? []
    ).length,
    11,
  );
  for (const literal of [
    'const: "human_review.controlled_handoff_brief"',
    'const: "1.0.0"',
    'pattern: "^pkt_[a-z0-9][a-z0-9_-]{0,59}$"',
    'const: "HANDOFF_CANDIDATE_ONLY"',
    'type: "object"',
    "^hro_[a-z0-9][a-z0-9_-]{0,59}$",
  ]) {
    assert.equal(constraints.includes(literal), true, literal);
  }
  assert.match(
    constraints,
    /FUTURE_SCHEMA_SCALAR_AND_OBJECT_CONSTRAINT_ROW_COUNT:\n11/u,
  );
  assert.match(constraints, /No `null` branch, extension object/u);
});

test("schema limits preserve uniqueness cross-reference and approval boundaries", () => {
  const docsText = readRequired(docsPath);
  const limits = section(docsText, "## 7.", "## 8.");

  assert.match(
    limits,
    /PAIRWISE_COMPONENT_REFERENCE_UNIQUENESS_ENFORCEMENT:\nFUTURE_VALIDATOR_ONLY/u,
  );
  assert.match(
    limits,
    /FUTURE_SCHEMA_CROSS_PROPERTY_UNIQUENESS_CLAIM:\nPROHIBITED/u,
  );
  assert.match(
    limits,
    /CROSS_REFERENCE_MEMBERSHIP_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(
    limits,
    /PACKET_EQUALITY_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(
    limits,
    /COMPONENT_FAMILY_IDENTITY_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(limits, /object-member insertion order/u);
  assert.match(limits, /cannot prove that\na handoff candidate is appropriate/u);
});

test("historical open questions and candidate paths follow the tracked proof transition", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const open = section(docsText, "## 9.", "## 10.");

  assert.equal((open.match(/^\d+\. /gmu) ?? []).length, 9);
  assert.match(open, /OPEN_SCAFFOLD_SCOPE_QUESTION_COUNT:\n9/u);
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
      "`tests/domain-human-review-controlled-handoff-brief-schema-readiness-boundary-doc-freeze.test.js`",
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
  assert.match(
    docsText,
    /HANDOFF_ASSEMBLY_IN_CANDIDATE_SCAFFOLD:\nEXCLUDED_AND_NOT_CREATED/u,
  );
  assert.match(
    docsText,
    /HUMAN_APPROVAL_IN_CANDIDATE_SCAFFOLD:\nEXCLUDED_AND_NOT_CREATED/u,
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
    "PAIRWISE_COMPONENT_REFERENCE_UNIQUENESS_VALIDATOR_ONLY",
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "HANDOFF_ASSEMBLY_NOT_CREATED",
    "HUMAN_APPROVAL_WORKFLOW_NOT_CREATED",
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
