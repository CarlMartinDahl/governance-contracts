"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-no-conclusion-notice-schema-scaffold-scope-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_v1.md";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const sourcePaths = [
  contractPath,
  readinessPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-chronology.json",
  "schemas/human-review-asserted-claim-matrix.json",
  "schemas/human-review-declared-packet-review-gaps.json",
  "schemas/human-review-questions.json",
  "tests/human-review-questions-schema.test.js",
  "packages/schemas/src/index.js",
];
const candidateSchemaPath =
  "schemas/human-review-no-conclusion-notice.json";
const candidateProofPath =
  "tests/human-review-no-conclusion-notice-schema.test.js";
const validatorResultCandidatePaths = [
  "schemas/human-review-no-conclusion-notice-validator-result.json",
  "tests/human-review-no-conclusion-notice-validator-result-schema.test.js",
];
const retainedLaterSiblingPaths = [
  "packages/schemas/src/human-review-no-conclusion-notice-validator.js",
  "tests/human-review-no-conclusion-notice-validator.test.js",
  "packages/governance/src/human-review-no-conclusion-notice-cross-reference-validation-boundary.js",
  "tests/human-review-no-conclusion-notice-cross-reference-validation-boundary.test.js",
];
const historicalValidatorHelperPaths = retainedLaterSiblingPaths.slice(0, 2);
const retainedCrossReferencePaths = retainedLaterSiblingPaths.slice(2);
const laterSiblingPaths = [
  ...validatorResultCandidatePaths,
  ...retainedLaterSiblingPaths,
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

test("no-conclusion schema scaffold references contract and conventions", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(docsText, /Comparison evidence controls only repository-native/u);
  assert.match(docsText, /does not import another contract's domain fields/u);
});

test("all ten readiness questions receive bounded scope answers", () => {
  const docsText = readRequired(docsPath);
  const resolved = section(
    docsText,
    "## 3. Ten Resolved Scaffold-Scope Questions",
    "## 4.",
  );

  assert.equal((resolved.match(/^\| \d+ \|/gmu) ?? []).length, 10);
  assert.match(resolved, /RESOLVED_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n10/u);
  for (const selection of [
    "https://json-schema.org/draft/2020-12/schema",
    "$defs.noticeRow",
    "minItems: 1",
    "five field-specific `minItems: 1` branches",
    "uniqueItems: true",
    "no `maxItems`",
    "all six later sibling paths retain live absence",
  ]) {
    assert.equal(resolved.includes(selection), true, selection);
  }
});

test("future implementation paths follow the tracked proof transition", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const files = section(docsText, "## 4.", "## 5.");

  assert.match(files, /FUTURE_SCHEMA_IMPLEMENTATION_FILE_COUNT:\n2/u);
  for (const candidatePath of [candidateSchemaPath, candidateProofPath]) {
    assert.equal(files.includes("`" + candidatePath + "`"), true, candidatePath);
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
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n2/u);
  assert.equal(
    transitionText.includes(
      "`tests/domain-human-review-no-conclusion-notice-schema-scaffold-scope-boundary-doc-freeze.test.js`",
    ),
    true,
  );
  assert.match(files, /`packages\/schemas\/src\/index\.js` remains unchanged/u);
});

test("future identity and exact nonempty four-field root are frozen", () => {
  const docsText = readRequired(docsPath);
  const identity = section(docsText, "## 5.", "## 6.");
  const root = section(docsText, "## 6.", "## 7.");

  for (const exactValue of [
    "https://json-schema.org/draft/2020-12/schema",
    "https://governance-contracts.invalid/schemas/human-review-no-conclusion-notice.json",
    "Human Review No-Conclusion Notice Contract Scaffold",
  ]) {
    assert.equal(identity.includes("`" + exactValue + "`"), true, exactValue);
  }
  assert.match(identity, /FUTURE_SCHEMA_IDENTITY_KEYWORD_COUNT:\n5/u);
  for (const [position, field] of [
    [1, "contract_id"],
    [2, "contract_version"],
    [3, "packet_ref"],
    [4, "notices"],
  ]) {
    assert.equal(root.includes(position + ". `" + field + "`"), true, field);
  }
  assert.match(root, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n4/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_REQUIRED_COUNT:\n4/u);
  assert.match(root, /FUTURE_SCHEMA_NOTICE_ARRAY_MIN_ITEMS:\n1/u);
  assert.match(root, /FUTURE_SCHEMA_MAX_ITEMS_KEYWORD_COUNT:\n0/u);
  assert.match(root, /human_review\.no_conclusion_notice/u);
  assert.match(root, /#\/\$defs\/noticeRow/u);
});

test("future notice row keeps nine exact fields and scalar constraints", () => {
  const docsText = readRequired(docsPath);
  const row = section(docsText, "## 7.", "## 8.");

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
    assert.equal(row.includes(position + ". `" + field + "`"), true, field);
  }
  for (const exactValue of [
    "^ncn_[a-z0-9][a-z0-9_-]{0,59}$",
    "BOUNDARY_DECLARED",
    "NO_MODEL_CONCLUSION_UNDER_CURRENT_BOUNDARY",
    "No model conclusion is established under the current boundary.",
    "^src_[a-z0-9][a-z0-9_-]{0,59}$",
    "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
    "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
    "^gap_[a-z0-9][a-z0-9_-]{0,59}$",
    "^qst_[a-z0-9][a-z0-9_-]{0,59}$",
  ]) {
    assert.equal(row.includes("`" + exactValue + "`"), true, exactValue);
  }
  assert.match(row, /FUTURE_SCHEMA_LOCAL_DEFINITION_COUNT:\n1/u);
  assert.match(row, /FUTURE_SCHEMA_NOTICE_ROW_FIELD_COUNT:\n9/u);
  assert.match(row, /FUTURE_SCHEMA_NOTICE_ROW_REQUIRED_COUNT:\n9/u);
  assert.match(
    row,
    /FUTURE_SCHEMA_EXPLICIT_REFERENCE_MIN_ITEMS_ZERO_COUNT:\n5/u,
  );
  assert.match(row, /FUTURE_SCHEMA_UNIQUE_ITEMS_TRUE_COUNT:\n5/u);
});

test("future row-level anyOf has five exact ordered branches", () => {
  const docsText = readRequired(docsPath);
  const anyOf = section(docsText, "## 8.", "## 9.");

  for (const [position, field] of [
    [1, "source_refs"],
    [2, "chronology_entry_refs"],
    [3, "claim_refs"],
    [4, "gap_refs"],
    [5, "question_refs"],
  ]) {
    const phrase =
      position +
      '. `{ "properties": { "' +
      field +
      '": { "minItems": 1 } } }`';
    assert.equal(anyOf.includes(phrase), true, phrase);
  }
  assert.match(anyOf, /FUTURE_SCHEMA_NOTICE_ROW_ANY_OF_BRANCH_COUNT:\n5/u);
  assert.match(
    anyOf,
    /FUTURE_SCHEMA_NOTICE_ROW_MINIMUM_TOTAL_REFERENCE_COUNT:\n1/u,
  );
  assert.match(anyOf, /Satisfying more than one branch is valid/u);
});

test("focused proof and all six later siblings remain separated", () => {
  const docsText = readRequired(docsPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionPath,
  );
  const proof = section(docsText, "## 9.", "## 10.");
  const excluded = section(docsText, "## 10.", "## 11.");

  assert.equal((proof.match(/^\d+\. /gmu) ?? []).length, 12);
  assert.match(proof, /FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:\n12/u);
  assert.match(proof, /five empty reference arrays[\s\S]*rejected/u);
  assert.match(proof, /sharing `notice_ref` remain schema-valid/u);
  assert.match(proof, /no `maxItems` claim is introduced/u);
  for (const siblingPath of laterSiblingPaths) {
    assert.equal(excluded.includes("`" + siblingPath + "`"), true, siblingPath);
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
  for (const siblingPath of retainedLaterSiblingPaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + siblingPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      siblingPath,
    );
  }
  for (const helperPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + helperPath + "`"),
      true,
      helperPath,
    );
  }
  for (const crossReferencePath of retainedCrossReferencePaths) {
    assert.equal(
      crossReferenceProofTransitionText.includes("`" + crossReferencePath + "`"),
      true,
      crossReferencePath,
    );
  }
  assert.match(
    crossReferenceProofTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n20/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n13/u,
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
});

test("scope remains exact two-file docs-only and non-authorizing", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /CURRENT_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  for (const exactPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes("`" + exactPath + "`"), true, exactPath);
    readRequired(exactPath);
  }
  for (const marker of [
    "DOCS_ONLY",
    "ALL_TEN_SCHEMA_READINESS_QUESTIONS_RESOLVED_AT_SCOPE_LEVEL",
    "NONEMPTY_NOTICE_ARRAY_SELECTED",
    "FIVE_BRANCH_AT_LEAST_ONE_REFERENCE_ANY_OF_SELECTED",
    "CROSS_ROW_NOTICE_REF_UNIQUENESS_REMAINS_VALIDATOR_ONLY",
    "WORKSPACE_PRESENCE_REMAINS_ORCHESTRATOR_ONLY",
    "NO_MAX_ITEMS_SELECTED",
    "PACKAGE_EXPORT_EXCLUDED",
    "VALIDATOR_RESULT_SCHEMA_EXCLUDED",
    "CROSS_REFERENCE_SURFACES_EXCLUDED",
    "SCHEMA_FILE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_EXACT_TWO_FILE_FUTURE_SCHEMA_SCOPE_FROZEN",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(docsText, /not schema correctness[\s\S]*real-evidence\nreview/u);
});
