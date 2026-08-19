"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionText = fs.readFileSync(
  path.join(repoRoot, crossReferenceProofTransitionPath),
  "utf8",
);
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-brief-validator-result-schema-readiness-boundary-doc-freeze.test.js";
const validatorResultTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-brief.json";
const candidatePackageProofPath =
  "tests/human-review-controlled-handoff-brief-package-export.test.js";
const absentPaths = [
  "schemas/human-review-controlled-handoff-brief-validator-result.json",
  "tests/human-review-controlled-handoff-brief-validator-result-schema.test.js",
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "tests/human-review-controlled-handoff-brief-validator.test.js",
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];
const validatorResultCandidatePaths = absentPaths.slice(0, 2);
const historicalValidatorHelperPaths = absentPaths.slice(2, 4);
const retainedCrossReferencePaths = absentPaths.slice(4);
const sourcePaths = [
  contractPath,
  candidateSchemaPath,
  "tests/human-review-controlled-handoff-brief-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "packages/schemas/src/index.js",
  candidatePackageProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
];

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

test("readiness references exact controlling separation and convention sources", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(docsText, /Convention evidence supplies only/u);
  assert.match(docsText, /does not supply Controlled Handoff Brief identity/u);
});

test("candidate schema is package exported while validator-result stays separate", () => {
  const docsText = readRequired(docsPath);
  const separation = section(docsText, "## 3.", "## 4.");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const candidateSchema = require("../schemas/human-review-controlled-handoff-brief.json");

  assert.strictEqual(
    packageSchemas.humanReviewControlledHandoffBrief,
    candidateSchema,
  );
  assert.match(
    separation,
    /CONTROLLED_HANDOFF_BRIEF_SCHEMA_STATUS:\nTRACKED_AND_PACKAGE_EXPORTED/u,
  );
  assert.match(
    separation,
    /VALIDATOR_RESULT_SCHEMA_STATUS:\nNOT_CREATED/u,
  );
});

test("exact four-field result and two-field error item remain available", () => {
  const docsText = readRequired(docsPath);
  const result = section(docsText, "## 4.", "## 5.");
  const errorItem = section(docsText, "## 5.", "## 6.");

  for (const field of ["valid", "contractKind", "version", "errors"]) {
    assert.equal(result.includes("`" + field + "`"), true, field);
  }
  assert.match(result, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(result, /VALIDATOR_RESULT_REQUIRED_FIELDS:\nALL_FOUR/u);
  assert.match(result, /VALIDATOR_RESULT_OPTIONAL_FIELDS:\nNONE/u);
  assert.match(result, /VALIDATOR_RESULT_ADDITIONAL_FIELDS:\nNONE/u);
  assert.match(result, /valid: true` if and only if `errors` is empty/u);
  assert.match(result, /valid: false` if and only if `errors` is non-empty/u);
  assert.match(errorItem, /VALIDATION_ERROR_ITEM_FIELD_COUNT:\n2/u);
  assert.match(errorItem, /VALIDATION_ERROR_ITEM_REQUIRED_FIELDS:\nBOTH/u);
  assert.match(errorItem, /VALIDATION_ERROR_ITEM_ADDITIONAL_FIELDS:\nNONE/u);
});

test("five codes and twelve canonical paths are exact and closed", () => {
  const docsText = readRequired(docsPath);
  const closed = section(docsText, "## 6.", "## 7.");
  const contractText = readRequired(contractPath);
  const codes = [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "duplicate_component_ref",
  ];
  const paths = [
    "$",
    "$.contract_id",
    "$.contract_version",
    "$.packet_ref",
    "$.handoff_posture",
    "$.component_refs",
    "$.component_refs.source_register_ref",
    "$.component_refs.review_chronology_ref",
    "$.component_refs.asserted_claim_matrix_ref",
    "$.component_refs.declared_packet_review_gaps_ref",
    "$.component_refs.human_review_questions_ref",
    "$.component_refs.no_conclusion_notice_ref",
  ];

  for (const value of [...codes, ...paths]) {
    assert.equal(closed.includes("`" + value + "`"), true, value);
    assert.equal(contractText.includes("`" + value + "`"), true, value);
  }
  assert.match(closed, /VALIDATION_ERROR_CODE_COUNT:\n5/u);
  assert.match(closed, /VALIDATION_ERROR_PATH_COUNT:\n12/u);
  assert.match(closed, /VALIDATION_ERROR_INDEXED_PATH_TEMPLATE_COUNT:\n0/u);
});

test("five code-to-path rows stay exact without independent cross-pair widening", () => {
  const docsText = readRequired(docsPath);
  const partition = section(docsText, "## 7.", "## 8.");

  for (const code of [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "duplicate_component_ref",
  ]) {
    assert.equal(partition.includes("| `" + code + "` |"), true, code);
  }
  assert.match(partition, /CODE_TO_PATH_PARTITION_ROW_COUNT:\n5/u);
  assert.match(partition, /would admit invalid cross-pairs/u);
});

test("schema-expressible and validator-only facts remain separated", () => {
  const docsText = readRequired(docsPath);
  const boundaries = section(docsText, "## 8.", "## 9.");

  for (const marker of [
    "exact code-to-path partition",
    "success versus non-empty-errors/failure coupling",
    "ten-phase validation execution order",
    "pairwise duplicate component-reference detection",
    "accessor non-execution",
    "candidate non-mutation",
    "deep immutability",
    "packet equality",
    "family identity checks",
  ]) {
    assert.equal(boundaries.includes(marker), true, marker);
  }
  assert.match(boundaries, /SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:\nTRUE/u);
});

test("six scaffold questions remain open and readiness is docs-only", () => {
  const docsText = readRequired(docsPath);
  const questions = section(docsText, "## 9.", "## 10.");
  const readiness = section(docsText, "## 10.", "## 11.");

  assert.equal((questions.match(/^\d+\. /gmu) ?? []).length, 6);
  assert.match(
    questions,
    /OPEN_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  assert.match(
    readiness,
    /VALIDATOR_RESULT_SCHEMA_READINESS:\nREADY_FOR_DOCS_ONLY_SCAFFOLD_SCOPE_DECISION/u,
  );
  assert.match(readiness, /VALIDATOR_IMPLEMENTATION_READINESS:\nNOT_CREATED/u);
});

test("scope stays exact two-file fail-closed and non-authorizing", () => {
  const docsText = readRequired(docsPath);
  const validatorResultTransitionText = readRequired(
    validatorResultTransitionPath,
  );
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );

  assert.match(docsText, /CURRENT_READINESS_SLICE_FILE_COUNT:\n2/u);
  for (const exactPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes("`" + exactPath + "`"), true, exactPath);
    readRequired(exactPath);
  }
  for (const absentPath of absentPaths) {
    assert.equal(docsText.includes("`" + absentPath + "`"), true, absentPath);
  }
  for (const candidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" +
          candidatePath +
          "` | `PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  for (const historicalPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + historicalPath + "`"),
      true,
      historicalPath,
    );
  }
  for (const retainedPath of retainedCrossReferencePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
    assert.equal(
      crossReferenceProofTransitionText.includes("\`" + retainedPath + "\`"),
      true,
      retainedPath,
    );
  }
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n18/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransitionText,
    /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    validatorResultTransitionText,
    /PROOF_TRANSITION_SLICE_FILE_COUNT:\n6/u,
  );
  for (const marker of [
    "DOCS_ONLY",
    "VALIDATOR_RESULT_SCHEMA_READINESS_ASSESSED",
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "COMPONENT_ASSEMBLY_NOT_CREATED",
    "HUMAN_REVIEW_OR_APPROVAL_NOT_CREATED",
    "DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_READINESS_ASSESSED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
