"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-contract-boundary-doc-freeze.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "README.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_STATE_MODEL_CONTRACT_v1.md",
  "schemas/human-review-state-model.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-brief.json",
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-brief-cross-reference-result.json",
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_CONSUMER_TARGET_SELECTION_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_CONSUMER_IMPLEMENTATION_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_CONSUMER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "packages/governance/src/human-review-controlled-handoff-brief-pre-human-professional-approval-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-pre-human-professional-approval-validation-boundary.test.js",
  "packages/governance/src/authenticated-actor-identity-evidence-contract.js",
  "packages/governance/src/rbac-actor-role-binding-evidence-contract.js",
  "tests/authenticated-actor-identity-evidence-contract.test.js",
  "tests/rbac-actor-role-binding-evidence-contract.test.js",
];
const reservedLaterPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const candidateSchemaPaths = reservedLaterPaths.slice(0, 2);
const validatorResultCandidatePaths = reservedLaterPaths.slice(2, 4);
const candidatePackageExportProofPath = reservedLaterPaths[4];
const validatorResultPackageExportProofPath = reservedLaterPaths[5];
const retainedValidatorSiblingPaths = reservedLaterPaths.slice(6);

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
      section.includes(index + 1 + ". `" + value + "`"),
      true,
      value,
    );
  }
}

test("tracked sources and all ten Owner-selected stages are frozen", () => {
  const docsText = readRequired(docsPath);
  const decisions = sectionBetween(
    docsText,
    "## 3. Owner-Selected Decision Record",
    "## 4.",
  );

  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
    assert.equal(
      docsText.includes("`" + controllingPath + "`"),
      true,
      controllingPath,
    );
  }
  for (let stage = 1; stage <= 10; stage += 1) {
    assert.equal(
      docsText.includes("OWNER_SELECTED_STAGE_" + stage + "_OPTION_A"),
      true,
      stage,
    );
  }
  assert.equal((decisions.match(/^\| \d+ \|/gmu) ?? []).length, 10);
  assert.match(docsText, /OWNER_SELECTED_DECISION_STAGE_COUNT:\n10/u);
  assert.match(docsText, /OPEN_CONTRACT_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(docsText, /OWNER_SELECTED_TEN_STAGE_SEMANTICS_TRANSLATED/u);
});

test("exact identity and thirteen-field root shape are frozen", () => {
  const docsText = readRequired(docsPath);
  const root = sectionBetween(
    docsText,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5.",
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

  assert.match(
    root,
    /CONTRACT_ID:\nhuman_review\.controlled_handoff_human_professional_approval/u,
  );
  assert.match(root, /CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(root, /TOP_LEVEL_FIELD_COUNT:\n13/u);
  assertOrderedList(root, fields);

  for (const pattern of [
    "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
    "^pkt_[a-z0-9][a-z0-9_-]{0,59}$",
    "^hro_[a-z0-9][a-z0-9_-]{0,59}$",
    "^sha256:[a-f0-9]{64}$",
    "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
    "^att_[a-z0-9][a-z0-9_-]{0,59}$",
  ]) {
    assert.equal(root.includes("`" + pattern + "`"), true, pattern);
  }
  assert.match(root, /No root field is optional/u);
  assert.match(root, /contains no `case_id`, free text/u);
});

test("record cardinality binding and immutable replacement are exact", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 5. Record Cardinality, Immutability, And Candidate Binding",
    "## 6.",
  );

  assert.match(
    section,
    /APPROVAL_RECORD_CARDINALITY:\nONE_RECORD_PER_REVIEW_ATTEMPT_FOR_ONE_EXACT_CONTROLLED_HANDOFF_BRIEF_CANDIDATE/u,
  );
  assert.match(section, /APPROVAL_RECORD_MUTATION:\nPROHIBITED/u);
  assert.match(section, /EMBEDDED_APPROVAL_HISTORY:\nABSENT/u);
  assert.match(section, /CURRENT_APPROVAL_RECORD_SELECTION:\nSEPARATE_FUTURE_SEAM/u);
  assert.match(section, /CANDIDATE_BINDING_FIELD_COUNT:\n3/u);
  assertOrderedList(section, [
    "packet_ref",
    "controlled_handoff_brief_ref",
    "controlled_handoff_brief_fingerprint",
  ]);
  assert.match(section, /requires\na new `controlled_handoff_brief_ref`/u);
  assert.match(section, /do not prove candidate existence/u);
});

test("decision and candidate-only posture remain separate from release", () => {
  const docsText = readRequired(docsPath);
  const decisions = sectionBetween(
    docsText,
    "## 6. Exact Decision Enum And Attempt Meaning",
    "## 7.",
  );
  const posture = sectionBetween(
    docsText,
    "## 10. Candidate Posture And Separate Admissibility Gate",
    "## 11.",
  );

  assertOrderedList(decisions, [
    "HUMAN_PROFESSIONAL_GATE_APPROVED",
    "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
    "HUMAN_PROFESSIONAL_GATE_REJECTED",
  ]);
  assert.match(decisions, /DECISION_ENUM_COUNT:\n3/u);
  assert.match(decisions, /requires complete candidate\nreplacement/u);
  assert.match(decisions, /applies only to the exact candidate reference/u);
  assert.match(
    posture,
    /APPROVAL_POSTURE_VALUE:\nAPPROVAL_DECISION_CANDIDATE_ONLY/u,
  );
  assert.match(posture, /FUTURE_ADMISSIBILITY_CHECK_COUNT:\n6/u);
  assert.match(posture, /Eligibility is not authorization/u);
  assert.match(
    posture,
    /AUTOMATIC_HANDOFF_EXPORT_DELIVERY_RELEASE:\nPROHIBITED/u,
  );
});

test("reviewer attribution and decision support have exact closed shapes", () => {
  const docsText = readRequired(docsPath);
  const reviewer = sectionBetween(
    docsText,
    "## 7. Exact Reviewer Attribution Object",
    "## 8.",
  );
  const support = sectionBetween(
    docsText,
    "## 8. Exact Decision-Support Object And Cross-Field Rules",
    "## 9.",
  );

  assert.match(reviewer, /REVIEWER_ATTRIBUTION_FIELD_COUNT:\n3/u);
  assertOrderedList(reviewer, [
    "reviewer_ref",
    "reviewer_role",
    "reviewer_authority_evidence_ref",
  ]);
  assertOrderedList(reviewer, ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"]);
  assert.match(reviewer, /REVIEWER_ROLE_ENUM_COUNT:\n2/u);
  assert.equal(
    reviewer.includes("`^rvr_[a-z0-9][a-z0-9_-]{0,59}$`"),
    true,
  );
  assert.equal(
    reviewer.includes("`^rae_[a-z0-9][a-z0-9_-]{0,59}$`"),
    true,
  );
  assert.match(reviewer, /do not prove identity, authentication/u);

  assert.match(support, /DECISION_SUPPORT_FIELD_COUNT:\n3/u);
  assertOrderedList(support, [
    "decision_basis_refs",
    "prior_approval_refs",
    "correction_request_refs",
  ]);
  for (const pattern of [
    "^rvb_[a-z0-9][a-z0-9_-]{0,59}$",
    "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
    "^cor_[a-z0-9][a-z0-9_-]{0,59}$",
  ]) {
    assert.equal(support.includes("`" + pattern + "`"), true, pattern);
  }
  assert.match(support, /DECISION_BASIS_REFERENCE_MINIMUM_COUNT:\n1/u);
  assert.match(support, /PRIOR_APPROVAL_REFERENCE_MAXIMUM_COUNT:\n1/u);
  assert.match(support, /CORRECTION_REQUIRED_REFERENCE_COUNT:\n1/u);
  assert.match(support, /NON_CORRECTION_DECISION_REFERENCE_COUNT:\n0/u);
  assert.match(support, /Duplicate references within one array are\ninvalid/u);
});

test("decision timestamp session and attestation are lexical references only", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 9. Decision Time, Session, And Attestation References",
    "## 10.",
  );

  assert.match(
    section,
    /DECIDED_AT_FORMAT:\nRFC3339_UTC_EXACT_MILLISECONDS_LEXICAL_FORM/u,
  );
  assert.equal(
    section.includes("`^rvs_[a-z0-9][a-z0-9_-]{0,59}$`"),
    true,
  );
  assert.equal(
    section.includes("`^att_[a-z0-9][a-z0-9_-]{0,59}$`"),
    true,
  );
  assert.match(section, /contains no inline signature/u);
  assert.match(section, /do not prove clock accuracy/u);
});

test("future structural result and six-code taxonomy are exact and no-echo", () => {
  const docsText = readRequired(docsPath);
  const result = sectionBetween(
    docsText,
    "## 11. Future Structural Validator Result Contract",
    "## 12.",
  );
  const deterministic = sectionBetween(
    docsText,
    "## 12. Determinism, Descriptor Safety, And No-Echo Boundary",
    "## 13.",
  );
  const resultFields = ["valid", "contractKind", "version", "errors"];
  const errorCodes = [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "invalid_cross_field_combination",
    "duplicate_reference",
  ];

  assertOrderedList(result, resultFields);
  assert.match(result, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    result,
    /VALIDATOR_RESULT_CONTRACT_KIND:\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_BOUNDARY/u,
  );
  assert.match(result, /VALIDATOR_RESULT_VERSION:\n1\.0\.0/u);
  assertOrderedList(result, errorCodes);
  assert.match(result, /VALIDATOR_ERROR_CODE_COUNT:\n6/u);
  assert.match(result, /deeply frozen closed `\{ code, path \}` object/u);
  assert.match(result, /must not calculate or verify the candidate fingerprint/u);
  assert.match(deterministic, /no getter or setter is executed/u);
  assert.match(deterministic, /candidate input remains unmodified/u);
  assert.match(deterministic, /rejected values and unknown key names are never returned/u);
});

test("historical reservations follow both candidate transitions and retain sibling absence", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const contractProofText = readRequired(proofPath);
  const reserved = sectionBetween(
    docsText,
    "## 13. Reserved Later Paths And Ordered Implementation Sequence",
    "## 14.",
  );
  const scope = sectionBetween(
    docsText,
    "## 15. Exact File Scope",
    "## 16.",
  );

  assert.match(reserved, /RESERVED_LATER_PATH_COUNT:\n8/u);
  assert.match(reserved, /FUTURE_IMPLEMENTATION_SEQUENCE_STEP_COUNT:\n7/u);
  for (const reservedPath of reservedLaterPaths) {
    assert.equal(reserved.includes("`" + reservedPath + "`"), true, reservedPath);
    assert.equal(
      transitionText.includes("`" + reservedPath + "`"),
      true,
      reservedPath,
    );
  }
  for (const candidatePath of candidateSchemaPaths) {
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
  for (const validatorResultCandidatePath of validatorResultCandidatePaths) {
    assert.equal(
      transitionText.includes(
        "`" + validatorResultCandidatePath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      validatorResultCandidatePath,
    );
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
    contractProofText.includes(
      "fs." + "existsSync(absolute(validatorResultCandidatePath))",
    ),
    false,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" +
        proofPath +
        "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
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
    contractProofText.includes(
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
    contractProofText.includes(
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
      transitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
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
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(transitionText, /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n2/u);
  assert.match(transitionText, /CONTRACT_PROOF_TRANSITION_STEP_COUNT:\n9/u);
  assert.match(transitionText, /HISTORICAL_SCHEMA_ABSENCE_MARKERS_PRESERVED/u);
  assert.match(transitionText, /SCHEMA_FILE_NOT_CREATED_BY_THIS_SLICE/u);
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
  assert.match(
    validatorResultPackageExportTransitionText,
    /TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(scope, /CONTRACT_SLICE_FILE_COUNT:\n2/u);
  assert.equal(scope.includes("`" + docsPath + "`"), true);
  assert.equal(scope.includes("`" + proofPath + "`"), true);
  assert.match(docsText, /SCHEMA_NOT_CREATED/u);
  assert.match(docsText, /VALIDATOR_NOT_CREATED/u);
  assert.match(docsText, /APPROVAL_EFFECT_NOT_CREATED/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
});
