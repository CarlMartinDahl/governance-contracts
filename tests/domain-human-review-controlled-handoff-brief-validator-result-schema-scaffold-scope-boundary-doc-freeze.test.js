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
const tick = String.fromCharCode(96);
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-brief-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const validatorResultTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md",
  readinessPath,
  "schemas/human-review-controlled-handoff-brief.json",
  "tests/human-review-controlled-handoff-brief-schema.test.js",
  "packages/schemas/src/index.js",
  "tests/human-review-controlled-handoff-brief-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
];
const futureSchemaPaths = [
  "schemas/human-review-controlled-handoff-brief-validator-result.json",
  "tests/human-review-controlled-handoff-brief-validator-result-schema.test.js",
];
const retainedSiblingPaths = [
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "tests/human-review-controlled-handoff-brief-validator.test.js",
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];
const historicalValidatorHelperPaths = retainedSiblingPaths.slice(0, 2);
const retainedCrossReferencePaths = retainedSiblingPaths.slice(2);
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

test("scaffold scope references exact controlling and precedent sources", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(tick + sourcePath + tick), true, sourcePath);
  }
  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /does not supply\nControlled Handoff Brief semantics/u);
});

test("future validator-result schema slice is exact and transition-permitted", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(validatorResultTransitionPath);

  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_SCHEMA_SLICE_FILE_COUNT:\n2/u);
  for (const futurePath of futureSchemaPaths) {
    assert.equal(docsText.includes(tick + futurePath + tick), true, futurePath);
    assert.equal(
      transitionText.includes(
        tick +
          futurePath +
          tick +
          " | " +
          tick +
          "PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE" +
          tick,
      ),
      true,
      futurePath,
    );
  }
  assert.match(transitionText, /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u);
  assert.match(transitionText, /PROOF_TRANSITION_SLICE_FILE_COUNT:\n6/u);
  assert.match(
    docsText,
    /https:\/\/governance-contracts\.invalid\/schemas\/human-review-controlled-handoff-brief-validator-result\.json/u,
  );
  assert.match(
    docsText,
    /Human Review Controlled Handoff Brief Validator Result Contract/u,
  );
});

test("closed four-field root and exact two result states are frozen", () => {
  const docsText = readRequired(docsPath);
  const root = section(docsText, "## 5.", "## 6.");
  const states = section(docsText, "## 6.", "## 7.");

  assert.equal((root.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  for (const field of ["valid", "contractKind", "version", "errors"]) {
    assert.equal(root.includes(tick + field + tick), true, field);
  }
  assert.match(root, /FUTURE_VALIDATOR_RESULT_REQUIRED_PROPERTY_COUNT:\n4/u);
  assert.match(root, /FUTURE_VALIDATOR_RESULT_ADDITIONAL_PROPERTIES:\nFALSE/u);
  assert.match(states, /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_KEYWORD:\noneOf/u);
  assert.match(states, /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_COUNT:\n2/u);
  assert.match(states, /valid const true\x60; \x60errors maxItems 0/u);
  assert.match(states, /valid const false\x60; \x60errors minItems 1/u);
});

test("closed error item and all five code-path branches are exact", () => {
  const docsText = readRequired(docsPath);
  const errorItem = section(docsText, "## 7.", "## 8.");
  const branches = section(docsText, "## 9.", "## 10.");

  assert.match(
    errorItem,
    /FUTURE_VALIDATION_ERROR_ITEM_REQUIRED_PROPERTY_COUNT:\n2/u,
  );
  assert.match(errorItem, /required: \["code", "path"\]/u);
  assert.match(
    errorItem,
    /FUTURE_VALIDATION_ERROR_CODE_PATH_BRANCH_COUNT:\n5/u,
  );
  assert.equal((branches.match(/^\| \d+ \|/gmu) ?? []).length, 5);
  for (const code of codes) {
    assert.equal(branches.includes(tick + code + tick), true, code);
  }
  for (const marker of [
    "REQUIRED_FIELD_MISSING_PATH_ENUM_COUNT:\n11",
    "UNEXPECTED_FIELD_PATH_ENUM_COUNT:\n2",
    "INVALID_FIELD_TYPE_PATH_ENUM_COUNT:\n12",
    "INVALID_FIELD_VALUE_PATH_ENUM_COUNT:\n10",
    "DUPLICATE_COMPONENT_REF_PATH_ENUM_COUNT:\n5",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(branches, /would admit\ninvalid cross-pairs/u);
});

test("twelve exact paths and no indexed path grammar are frozen", () => {
  const docsText = readRequired(docsPath);
  const pathSection = section(docsText, "## 8.", "## 9.");

  for (const canonicalPath of paths) {
    assert.equal(
      pathSection.includes(tick + canonicalPath + tick),
      true,
      canonicalPath,
    );
  }
  assert.match(
    pathSection,
    /FUTURE_VALIDATION_ERROR_CANONICAL_PATH_COUNT:\n12/u,
  );
  assert.match(
    pathSection,
    /FUTURE_VALIDATION_ERROR_INDEXED_PATH_PATTERN_COUNT:\n0/u,
  );
  assert.match(pathSection, /All path constraints use ordered exact enums/u);
});

test("unique exact error items stay distinct from validator behavior", () => {
  const docsText = readRequired(docsPath);
  const duplicates = section(docsText, "## 10.", "## 11.");
  const validatorOnly = section(docsText, "## 11.", "## 12.");

  assert.match(
    duplicates,
    /FUTURE_VALIDATION_ERROR_ARRAY_UNIQUE_ITEMS:\nTRUE/u,
  );
  for (const marker of [
    "ten-phase validation execution order",
    "first-occurrence exact error deduplication behavior",
    "pairwise duplicate component-reference detection",
    "accessor non-execution",
    "candidate non-mutation",
    "deep immutability",
    "packet equality",
    "family identity checks",
  ]) {
    assert.equal(validatorOnly.includes(marker), true, marker);
  }
  assert.match(
    validatorOnly,
    /SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:\nTRUE/u,
  );
});

test("all six readiness questions resolve without package or runtime widening", () => {
  const docsText = readRequired(docsPath);
  const resolved = section(docsText, "## 14.", "## 15.");
  const siblings = section(docsText, "## 12.", "## 13.");

  assert.equal((resolved.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  assert.match(
    resolved,
    /RESOLVED_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  assert.match(
    siblings,
    /PACKAGE_SCHEMA_EXPORT_INCLUDED_IN_FUTURE_SCHEMA_SLICE:\nFALSE/u,
  );
  assert.match(siblings, /FUTURE_SEPARATE_SLICE_NOT_AUTHORIZED/u);
});

test("current slice stays exact two-file fail-closed and non-authorizing", () => {
  const docsText = readRequired(docsPath);
  const readinessText = readRequired(readinessPath);
  const transitionText = readRequired(validatorResultTransitionPath);
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );

  assert.match(docsText, /CURRENT_SCHEMA_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  for (const currentPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes(tick + currentPath + tick), true, currentPath);
    readRequired(currentPath);
  }
  for (const absentPath of [...futureSchemaPaths, ...retainedSiblingPaths]) {
    assert.equal(docsText.includes(tick + absentPath + tick), true, absentPath);
  }
  for (const historicalPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes(tick + historicalPath + tick),
      true,
      historicalPath,
    );
  }
  for (const retainedPath of retainedCrossReferencePaths) {
    assert.equal(
      transitionText.includes(
        tick +
          retainedPath +
          tick +
          " | " +
          tick +
          "RETAIN_LIVE_ABSENCE_ASSERTION" +
          tick,
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
  assert.match(docsText, /RETAINED_LATER_PATH_LIVE_ABSENCE_COUNT:\n6/u);
  assert.match(
    transitionText,
    /TRACKED_CONTRACT_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    readinessText,
    /OPEN_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  for (const marker of [
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
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review[\s\S]*chain-of-custody proof/u);
});
