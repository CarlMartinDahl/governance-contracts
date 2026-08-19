"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const comparisonPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "schemas/human-review-no-conclusion-notice.json",
  "schemas/human-review-questions.json",
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
  "tests/human-review-no-conclusion-notice-schema.test.js",
  "packages/schemas/src/index.js",
];
const candidatePaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js",
];
const laterSiblingPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.test.js",
];
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
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

function assertOrderedList(section, values) {
  for (const [index, value] of values.entries()) {
    assert.equal(
      section.includes(`${index + 1}. \`${value}\``),
      true,
      value,
    );
  }
}

test("canonical and comparison sources are tracked without importing semantics", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [contractPath, ...comparisonPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }
  assert.match(
    docsText,
    /Comparison evidence controls only repository-native draft 2020-12/u,
  );
  assert.match(docsText, /does not\s+import another contract's fields/u);
  assert.match(docsText, /No chat output, handoff text, local memory/u);
});

test("all nine owner selections resolve to one docs-only scaffold boundary", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 3. Nine Resolved Scaffold-Scope Questions",
    "## 4.",
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 9);
  for (let stage = 1; stage <= 9; stage += 1) {
    assert.match(docsText, new RegExp(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`, "u"));
  }
  assert.match(docsText, /OWNER_SELECTED_NINE_STAGE_SCOPE_TRANSLATED/u);
  assert.match(section, /OWNER_SELECTED_STAGE_COUNT:\n9/u);
  assert.match(section, /OPEN_SCHEMA_SCAFFOLD_SCOPE_DECISION_COUNT:\n0/u);
});

test("future candidate and schema identity scopes are exact", () => {
  const docsText = readRequired(docsPath);
  const candidates = sectionBetween(
    docsText,
    "## 4. Exact Future Candidate Files",
    "## 5.",
  );
  const identity = sectionBetween(
    docsText,
    "## 5. Exact Future Schema Identity",
    "## 6.",
  );

  assertOrderedList(candidates, candidatePaths);
  assert.match(candidates, /FUTURE_SCHEMA_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(candidates, /`packages\/schemas\/src\/index\.js` remains unchanged/u);
  assert.match(identity, /FUTURE_SCHEMA_IDENTITY_KEYWORD_COUNT:\n5/u);
  assert.match(identity, /https:\/\/json-schema\.org\/draft\/2020-12\/schema/u);
  assert.match(
    identity,
    /https:\/\/governance-contracts\.invalid\/schemas\/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence\.json/u,
  );
  assert.match(
    identity,
    /Human Review Controlled Handoff Human\/Professional Approval Reviewer Identity Evidence Contract Scaffold/u,
  );
  assert.match(identity, /root `type` \| `object`/u);
  assert.match(identity, /root `additionalProperties` \| `false`/u);
});

test("future root is flat closed and contains exactly twelve required scalars", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 6. Exact Future Flat Root Scaffold",
    "## 7.",
  );
  const fields = [
    "contract_id",
    "contract_version",
    "reviewer_identity_evidence_ref",
    "approval_ref",
    "review_session_ref",
    "reviewer_ref",
    "actor_identity_evidence_ref",
    "binding_issuer_ref",
    "binding_provenance_ref",
    "binding_lifecycle_posture",
    "verification_posture",
    "human_professional_review_required",
  ];

  assertOrderedList(section, fields);
  for (const field of fields) {
    assert.equal(section.includes(`| \`${field}\` |`), true, field);
  }
  assert.match(section, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n12/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_REQUIRED_COUNT:\n12/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_OPTIONAL_FIELD_COUNT:\n0/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_ADDITIONAL_PROPERTIES:\nFALSE/u);
  assert.match(section, /FUTURE_SCHEMA_LOCAL_DEFINITION_COUNT:\n0/u);
  assert.match(
    section,
    /"const": "human_review\.controlled_handoff_human_professional_approval_reviewer_identity_evidence"/u,
  );
  assert.match(section, /"const": "1\.0\.0"/u);
  assert.match(section, /"const": "NOT_VERIFIED_BY_CONTRACT"/u);
  assert.match(section, /"type": "boolean", "const": true/u);
  assert.match(
    section,
    /\["REVIEWER_IDENTITY_BINDING_DECLARED_ACTIVE", "REVIEWER_IDENTITY_BINDING_DECLARED_INACTIVE", "REVIEWER_IDENTITY_BINDING_DECLARED_REVOKED"\]/u,
  );
});

test("three generic references share one exact eight-branch negative encoding", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 7. Exact Generic Opaque-Reference Encoding",
    "## 8.",
  );
  const genericFields = [
    "actor_identity_evidence_ref",
    "binding_issuer_ref",
    "binding_provenance_ref",
  ];
  const jsonBlock = section.match(/```json\n([\s\S]*?)\n```/u);

  assertOrderedList(section, genericFields);
  assert.notEqual(jsonBlock, null);
  const encoding = JSON.parse(jsonBlock[1]);
  assert.deepEqual(Object.keys(encoding), ["type", "pattern", "not"]);
  assert.equal(encoding.type, "string");
  assert.equal(encoding.pattern, "^[A-Za-z0-9._:-]{1,128}$");
  assert.deepEqual(encoding.not.anyOf, [
    { enum: [".", ".."] },
    { pattern: "^[Hh][Tt][Tt][Pp]:" },
    { pattern: "^[Hh][Tt][Tt][Pp][Ss]:" },
    { pattern: "^[Ff][Tt][Pp]:" },
    { pattern: "^[Ff][Ii][Ll][Ee]:" },
    { pattern: "^[Mm][Aa][Ii][Ll][Tt][Oo]:" },
    { pattern: "^[Dd][Aa][Tt][Aa]:" },
    { pattern: "^[Jj][Aa][Vv][Aa][Ss][Cc][Rr][Ii][Pp][Tt]:" },
  ]);
  assert.match(section, /GENERIC_OPAQUE_REFERENCE_SCHEMA_FIELD_COUNT:\n3/u);
  assert.match(section, /GENERIC_OPAQUE_REFERENCE_NOT_ANYOF_BRANCH_COUNT:\n8/u);
  assert.match(section, /GENERIC_OPAQUE_REFERENCE_PROHIBITED_SCHEME_PREFIX_COUNT:\n7/u);
  assert.match(section, /GENERIC_OPAQUE_REFERENCE_FORMAT_KEYWORD_COUNT:\n0/u);
  assert.equal(section.includes('"format"'), false);
});

test("schema validator and checkpoint responsibilities remain partitioned", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 8. Schema, Validator, And Checkpoint Partition",
    "## 9.",
  );

  assert.equal(
    (sectionBetween(section, "The future schema may enforce only:", "The future schema must not claim to enforce:").match(/^\d+\. /gmu) ?? []).length,
    7,
  );
  assert.equal(
    (sectionBetween(section, "The future schema must not claim to enforce:", "PAIRWISE_REFERENCE_DISTINCTNESS_IN_JSON_SCHEMA:").match(/^\d+\. /gmu) ?? []).length,
    8,
  );
  assert.match(section, /PAIRWISE_REFERENCE_DISTINCTNESS_IN_JSON_SCHEMA:\nNOT_ENFORCED/u);
  assert.match(section, /EXTERNAL_REFERENCE_EQUALITY_IN_JSON_SCHEMA:\nNOT_ENFORCED/u);
  assert.match(section, /GENERIC_IDENTITY_CANDIDATE_EMBEDDED_IN_WRAPPER_SCHEMA:\nNO/u);
  assert.match(section, /GENERIC_IDENTITY_DEPENDENCY_VALIDATION_IN_WRAPPER_SCHEMA:\nNO/u);
  assert.match(section, /IDENTITY_ROLE_AUTHORITY_OR_ADMISSIBILITY_IN_WRAPPER_SCHEMA:\nNO/u);
});

test("future focused proof is exactly fourteen bounded assertion families", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 9. Exact Future Focused Proof Scope",
    "## 10.",
  );

  assert.equal((section.match(/^\d+\. /gmu) ?? []).length, 14);
  assert.match(section, /FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:\n14/u);
  assert.match(section, /equal values across the three generic-reference fields remain schema-valid/u);
  assert.match(section, /without identity, existence, binding, currentness, role, authority, or admissibility claims/u);
  assert.match(section, /package export, validator-result schema, validator, and all six sibling paths remain absent/u);
  assert.match(section, /JSON Schema does not enforce object-member\norder/u);
});

test("proof transition preserves six historical references and the exact 2/4 live partition", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);
  const proofTransitionText = readRequired(proofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const excluded = sectionBetween(
    docsText,
    "## 10. Excluded Sibling And Downstream Surfaces",
    "## 11.",
  );
  const transition = sectionBetween(
    docsText,
    "## 11. Proof-Transition Boundary",
    "## 12.",
  );

  assert.match(excluded, /LATER_SIBLING_PATH_COUNT:\n6/u);
  for (const siblingPath of laterSiblingPaths) {
    assert.equal(excluded.includes(`\`${siblingPath}\``), true, siblingPath);
  }
  for (const validatorResultCandidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        `\`${validatorResultCandidatePath}\` | \`PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE\``,
      ),
      true,
      validatorResultCandidatePath,
    );
  }
  assert.equal(
    proofText.includes("fs." + "existsSync(absolute(siblingPath))"),
    false,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(validatorResultCandidatePath))",
    ),
    false,
  );
  assert.equal(
    packageExportTransitionText.includes(
      `\`${proofPath}\` | \`SEPARATE_FOCUSED_ALIGNMENT_REQUIRED\``,
    ),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes(`\`${candidatePackageExportProofPath}\``),
    true,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      `\`${proofPath}\` | \`SEPARATE_FOCUSED_ALIGNMENT_REQUIRED\``,
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      `\`${validatorResultPackageExportProofPath}\``,
    ),
    true,
  );
  assert.equal(
    proofText.includes(
      "fs." +
        "existsSync(absolute(validatorResultPackageExportProofPath))",
    ),
    false,
  );
  for (const retainedPath of retainedValidatorSiblingPaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        `\`${retainedPath}\` | \`RETAIN_LIVE_ABSENCE_ASSERTION\``,
      ),
      true,
      retainedPath,
    );
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" + retainedPath + "` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE`",
      ),
      true,
      retainedPath,
    );
  }
  assert.match(excluded, /PACKAGE_EXPORT_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED/u);
  assert.match(excluded, /VALIDATOR_RESULT_SCHEMA_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED/u);
  assert.match(excluded, /STRUCTURAL_VALIDATOR_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED/u);
  assert.equal(transition.includes(`\`${proofTransitionPath}\``), true);
  assert.match(transition, /CANDIDATE_SCHEMA_PATH_COUNT:\n2/u);
  assert.match(transition, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(transition, /PROOF_TRANSITION_PREREQUISITE_STATUS:\nNOT_CREATED/u);

  assert.match(proofTransitionText, /HISTORICAL_SCAFFOLD_ABSENCE_MARKERS_PRESERVED/u);
  assert.match(proofTransitionText, /PROOF_TRANSITION_SELF_PATH_COUNT:\n1/u);
  assert.match(proofTransitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(proofTransitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(proofTransitionText, /LIVE_ABSENCE_ASSERTION_TRANSITION_COUNT:\n3/u);
  assert.match(proofTransitionText, /REMAINING_CANDIDATE_PATH_PROOF_ALIGNMENT_COUNT:\n0/u);
  assert.match(proofTransitionText, /CURRENT_PREREQUISITE_FILE_COUNT:\n2/u);
  assert.match(
    proofTransitionText,
    /TRACKED_DOCS_ONLY_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_LIVE_PROOF_CONFLICT_COUNT:\n5/u,
  );
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
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n4/u,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      `| 1 | \`${proofPath}\` | preserve candidate-schema scaffold history and four sibling absences; align only the two validator-result candidate paths |`,
    ),
    true,
  );
  assert.match(
    validatorResultTransitionText,
    /TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n7/u,
  );
  assert.match(
    packageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n6/u,
  );
  assert.match(
    packageExportTransitionText,
    /TRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  for (const candidatePath of candidatePaths) {
    assert.equal(
      proofTransitionText.includes(
        `\`${candidatePath}\` | \`PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE\``,
      ),
      true,
      candidatePath,
    );
  }
  assert.equal(
    proofText.includes("fs." + "existsSync(absolute(proofTransitionPath))"),
    false,
  );
  assert.equal(
    proofText.includes("fs." + "existsSync(absolute(candidatePath))"),
    false,
  );
});

test("current two-file docs-only scope and no-conclusion boundary are exact", () => {
  const docsText = readRequired(docsPath);
  const scope = sectionBetween(
    docsText,
    "## 12. Exact Current Docs-Only File Scope",
    "## 13.",
  );
  const currentPaths = [docsPath, proofPath];

  assertOrderedList(scope, currentPaths);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_DOC_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_FOCUSED_PROOF_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_SCHEMA_FILE_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_PACKAGE_EXPORT_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_RUNTIME_FILE_COUNT:\n0/u);
  assert.match(docsText, /SCHEMA_FILE_NOT_CREATED/u);
  assert.match(docsText, /SCHEMA_EXPORT_NOT_CREATED/u);
  assert.match(docsText, /VALIDATION_EXECUTION_NOT_CREATED/u);
  assert.match(docsText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
  assert.match(docsText, /PRODUCT_CANDIDATE_NONE/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
  assert.match(
    docsText,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_SCHEMA_PROOF_TRANSITION_PREREQUISITE/u,
  );
});
