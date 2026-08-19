"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-scaffold-scope-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_READINESS_BOUNDARY_v1.md";
const comparisonPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-brief.json",
  "schemas/human-review-no-conclusion-notice.json",
  "schemas/human-review-questions.json",
  "tests/human-review-controlled-handoff-brief-schema.test.js",
  "tests/human-review-no-conclusion-notice-schema.test.js",
  "packages/schemas/src/index.js",
];
const candidatePaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
];
const laterSiblingPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const hardeningPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_SCAFFOLD_PROOF_SELF_TRANSITION_HARDENING_BOUNDARY_v1.md";
const validatorResultCandidatePaths = laterSiblingPaths.slice(0, 2);
const candidatePackageExportProofPath = laterSiblingPaths[2];
const validatorResultPackageExportProofPath = laterSiblingPaths[3];
const retainedValidatorSiblingPaths = laterSiblingPaths.slice(4);

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(docsText, start, end) {
  const startIndex = docsText.indexOf(start);
  const endIndex = docsText.indexOf(end, startIndex + start.length);

  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return docsText.slice(startIndex, endIndex);
}

test("contract readiness and comparison sources are tracked and bounded", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [contractPath, readinessPath, ...comparisonPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(docsText, /Comparison evidence controls only repository-native JSON Schema/u);
  assert.match(docsText, /does not import another contract's fields/u);
});

test("all eleven readiness questions resolve to one narrow future scope", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 3. Eleven Resolved Scaffold-Scope Questions",
    "## 4.",
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 11);
  assert.match(section, /RESOLVED_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n11/u);
  assert.match(section, /draft `https:\/\/json-schema\.org\/draft\/2020-12\/schema`/u);
  assert.match(section, /`\$defs\.reviewerAttribution` and `\$defs\.decisionSupport`/u);
  assert.match(section, /exactly one root `allOf` conditional/u);
  assert.match(section, /no reference resolution, fingerprint proof, authority proof/u);
});

test("future implementation is exactly two transitioned files with no package export", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const section = sectionBetween(
    docsText,
    "## 4. Exact Future Candidate Files",
    "## 5.",
  );

  assert.match(section, /FUTURE_SCHEMA_IMPLEMENTATION_FILE_COUNT:\n2/u);
  for (const candidatePath of candidatePaths) {
    assert.equal(section.includes("`" + candidatePath + "`"), true, candidatePath);
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
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(section, /`packages\/schemas\/src\/index\.js` remains unchanged/u);
  assert.match(section, /all historical live-absence proofs have been separately aligned/u);
});

test("future schema identity and thirteen-field closed root are exact", () => {
  const docsText = readRequired(docsPath);
  const identity = sectionBetween(
    docsText,
    "## 5. Exact Future Schema Identity",
    "## 6.",
  );
  const root = sectionBetween(
    docsText,
    "## 6. Exact Future Root Scaffold",
    "## 7.",
  );
  const fields = [
    "contract_id",
    "contract_version",
    "approval_ref",
    "packet_ref",
    "controlled_handoff_brief_ref",
    "controlled_handoff_brief_fingerprint",
    "approval_posture",
    "decision",
    "reviewer_attribution",
    "decision_support",
    "decided_at",
    "review_session_ref",
    "decision_attestation_ref",
  ];

  assert.match(identity, /FUTURE_SCHEMA_IDENTITY_KEYWORD_COUNT:\n5/u);
  assert.match(identity, /https:\/\/json-schema\.org\/draft\/2020-12\/schema/u);
  assert.match(
    identity,
    /https:\/\/governance-contracts\.invalid\/schemas\/human-review-controlled-handoff-human-professional-approval\.json/u,
  );
  assert.match(identity, /Human Review Controlled Handoff Human\/Professional Approval Contract Scaffold/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n13/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_REQUIRED_COUNT:\n13/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_OPTIONAL_FIELD_COUNT:\n0/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_ADDITIONAL_PROPERTIES:\nFALSE/u);
  for (const [index, field] of fields.entries()) {
    assert.equal(root.includes(index + 1 + ". `" + field + "`"), true, field);
  }
  assert.match(root, /JSON Schema does not enforce candidate object-member insertion order/u);
});

test("two local closed definitions preserve exact fields and arrays", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 7. Exact Future Local Definitions",
    "## 8.",
  );

  assert.match(section, /FUTURE_SCHEMA_LOCAL_DEFINITION_COUNT:\n2/u);
  assert.equal(section.includes("1. `reviewerAttribution`"), true);
  assert.equal(section.includes("2. `decisionSupport`"), true);
  assert.match(section, /FUTURE_SCHEMA_REVIEWER_ATTRIBUTION_REQUIRED_COUNT:\n3/u);
  assert.match(section, /FUTURE_SCHEMA_REVIEWER_ATTRIBUTION_ADDITIONAL_PROPERTIES:\nFALSE/u);
  assert.match(section, /FUTURE_SCHEMA_DECISION_SUPPORT_REQUIRED_COUNT:\n3/u);
  assert.match(section, /FUTURE_SCHEMA_DECISION_SUPPORT_ADDITIONAL_PROPERTIES:\nFALSE/u);
  for (const field of [
    "reviewer_ref",
    "reviewer_role",
    "reviewer_authority_evidence_ref",
    "decision_basis_refs",
    "prior_approval_refs",
    "correction_request_refs",
  ]) {
    assert.equal(section.includes("`" + field + "`"), true, field);
  }
  assert.match(section, /`minItems: 1`, no `maxItems`, `uniqueItems: true`/u);
  assert.match(section, /`minItems: 0`, `maxItems: 1`/u);
});

test("enum timestamp and correction condition encodings are exact", () => {
  const docsText = readRequired(docsPath);
  const encodings = sectionBetween(
    docsText,
    "## 8. Exact Future Enum And Timestamp Encodings",
    "## 9.",
  );
  const conditional = sectionBetween(
    docsText,
    "## 9. Exact Future Conditional Encoding",
    "## 10.",
  );

  assert.match(encodings, /FUTURE_SCHEMA_DECISION_ENUM_COUNT:\n3/u);
  assert.match(encodings, /FUTURE_SCHEMA_REVIEWER_ROLE_ENUM_COUNT:\n2/u);
  assert.match(encodings, /FUTURE_SCHEMA_DECIDED_AT_FORMAT_KEYWORD:\nABSENT/u);
  for (const value of [
    "HUMAN_PROFESSIONAL_GATE_APPROVED",
    "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
    "HUMAN_PROFESSIONAL_GATE_REJECTED",
    "HUMAN_REVIEWER",
    "PROFESSIONAL_REVIEWER",
  ]) {
    assert.equal(encodings.includes(value), true, value);
  }
  assert.match(conditional, /FUTURE_SCHEMA_ROOT_ALLOF_ITEM_COUNT:\n1/u);
  assert.match(conditional, /FUTURE_SCHEMA_CORRECTION_REQUIRED_MIN_ITEMS:\n1/u);
  assert.match(conditional, /FUTURE_SCHEMA_CORRECTION_REQUIRED_MAX_ITEMS:\n1/u);
  assert.match(conditional, /FUTURE_SCHEMA_NON_CORRECTION_MAX_ITEMS:\n0/u);
  assert.match(conditional, /must not create a correction workflow/u);
});

test("focused proof exclusions and sibling absences stay fail closed", () => {
  const docsText = readRequired(docsPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const scaffoldProofText = readRequired(proofPath);
  const proof = sectionBetween(
    docsText,
    "## 10. Exact Future Focused Proof Scope",
    "## 11.",
  );
  const excluded = sectionBetween(
    docsText,
    "## 11. Excluded Sibling And Downstream Surfaces",
    "## 12.",
  );

  assert.equal((proof.match(/^\d+\. /gmu) ?? []).length, 15);
  assert.match(proof, /FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:\n15/u);
  assert.match(proof, /does not enforce plain-object\nor accessor behavior/u);
  assert.match(excluded, /LATER_SIBLING_PATH_COUNT:\n6/u);
  for (const siblingPath of laterSiblingPaths) {
    assert.equal(excluded.includes("`" + siblingPath + "`"), true, siblingPath);
  }
  for (const validatorResultCandidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" +
          validatorResultCandidatePath +
          "` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      validatorResultCandidatePath,
    );
  }
  assert.equal(
    scaffoldProofText.includes(
      "fs." + "existsSync(absolute(validatorResultCandidatePath))",
    ),
    false,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" + candidatePackageExportProofPath + "`",
    ),
    true,
  );
  assert.equal(
    scaffoldProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`" + validatorResultPackageExportProofPath + "`",
    ),
    true,
  );
  assert.equal(
    scaffoldProofText.includes(
      "fs." +
        "existsSync(absolute(validatorResultPackageExportProofPath))",
    ),
    false,
  );
  const validatorHelperProofTransitionText = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  );
  for (const retainedPath of retainedValidatorSiblingPaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
  }
  assert.match(excluded, /PACKAGE_EXPORT_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED/u);
  assert.match(excluded, /APPROVAL_EFFECT_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED/u);
});

test("proof transition and current docs-only scope are exact", () => {
  const docsText = readRequired(docsPath);
  const hardeningText = readRequired(hardeningPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const transition = sectionBetween(
    docsText,
    "## 12. Proof-Transition Boundary",
    "## 13.",
  );
  const scope = sectionBetween(
    docsText,
    "## 13. Exact Current Docs-Only File Scope",
    "## 14.",
  );

  assert.equal(transition.includes("`" + proofTransitionPath + "`"), true);
  assert.equal(hardeningText.includes("`" + proofTransitionPath + "`"), true);
  assert.match(
    hardeningText,
    /SCAFFOLD_PROOF_SELF_CREATED_LIVE_ABSENCE_TRANSITION_COUNT:\n1/u,
  );
  assert.match(transition, /CANDIDATE_SCHEMA_PATH_COUNT:\n2/u);
  assert.match(transition, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(transition, /PROOF_TRANSITION_PREREQUISITE_STATUS:\nNOT_CREATED/u);
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_CANDIDATE_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransitionText,
    /RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    validatorResultTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  assert.match(
    validatorResultTransitionText,
    /TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n11/u,
  );
  assert.match(
    packageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n10/u,
  );
  assert.match(
    packageExportTransitionText,
    /TRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n13/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n12/u,
  );
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  assert.equal(scope.includes("`" + docsPath + "`"), true);
  assert.equal(scope.includes("`" + proofPath + "`"), true);
  assert.match(docsText, /SCHEMA_FILE_NOT_CREATED/u);
  assert.match(docsText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
  assert.match(docsText, /PRODUCT_CANDIDATE_NONE/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
});
