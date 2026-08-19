"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json";
const candidateSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-contract-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  candidateSchemaPath,
  candidateSchemaProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
];
const rootFieldPaths = [
  "$.contract_id",
  "$.contract_version",
  "$.reviewer_identity_evidence_ref",
  "$.approval_ref",
  "$.review_session_ref",
  "$.reviewer_ref",
  "$.actor_identity_evidence_ref",
  "$.binding_issuer_ref",
  "$.binding_provenance_ref",
  "$.binding_lifecycle_posture",
  "$.verification_posture",
  "$.human_professional_review_required",
];
const referenceFields = [
  "reviewer_identity_evidence_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "actor_identity_evidence_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const retainedLaterSurfaces = [
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.test.js",
];
const validatorResultCandidatePaths = retainedLaterSurfaces.slice(0, 2);
const candidatePackageExportProofPath = retainedLaterSurfaces[2];
const historicalValidatorResultRetainedSurfaces = retainedLaterSurfaces.slice(2);
const retainedPackageAndValidatorSurfaces = retainedLaterSurfaces.slice(3);
const validatorResultPackageExportProofPath = retainedLaterSurfaces[3];
const retainedValidatorSurfaces = retainedLaterSurfaces.slice(4);

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

function exactNumberedBacktickLines(values) {
  return values.map((value, index) => `${index + 1}. \`${value}\``);
}

function numberedListLines(section) {
  return section.split("\n").filter((line) => /^\d+\. /u.test(line));
}

test("reviewer identity error-path sources and seven stages are frozen", () => {
  const docsText = readRequired(docsPath);

  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
    assert.equal(
      docsText.includes("`" + controllingPath + "`"),
      true,
      controllingPath,
    );
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /OWNER_SELECTED_SEVEN_STAGE_SEMANTICS_TRANSLATED/u);
  for (let stage = 1; stage <= 7; stage += 1) {
    assert.match(
      docsText,
      new RegExp(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`, "u"),
    );
  }
  assert.match(docsText, /OWNER_SELECTED_STAGE_COUNT:\n7/u);
  assert.match(docsText, /OPEN_ERROR_PATH_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(docsText, /REPO_PRECEDENT_NORMALIZATION_COUNT:\n0/u);
  assert.match(
    docsText,
    /EXACT_TWO_FIELD_ERROR_OBJECT_AND_RECURSIVE_FREEZE_DEFINED/u,
  );
});

test("closed vocabulary contains exactly root and twelve static field paths", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 4. Closed Canonical Error-Path Vocabulary",
    "## 5.",
  );

  assert.deepEqual(
    numberedListLines(section),
    exactNumberedBacktickLines(rootFieldPaths),
  );
  assert.match(section, /CANONICAL_ROOT_PATH_COUNT:\n1/u);
  assert.match(section, /CANONICAL_ROOT_FIELD_PATH_COUNT:\n12/u);
  assert.match(section, /CANONICAL_STATIC_ERROR_PATH_COUNT:\n13/u);
  assert.match(section, /CANONICAL_NESTED_FIELD_PATH_COUNT:\n0/u);
  assert.match(section, /CANONICAL_INDEXED_PATH_TEMPLATE_COUNT:\n0/u);
  assert.match(section, /UNKNOWN_KEY_PATH:\n\$/u);
  assert.match(section, /UNKNOWN_KEY_NAME_ECHO:\nPROHIBITED/u);
  assert.match(section, /DYNAMIC_VALUE_DERIVED_PATHS:\nPROHIBITED/u);
  assert.match(section, /ADDITIONAL_ERROR_PATH_FAMILIES:\nNONE/u);
});

test("five structural codes have one exact closed path partition", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 5. Exact Five-Code-To-Path Partition",
    "## 6.",
  );
  const errorCodes = [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "duplicate_reference",
  ];
  const codeToPathTable = [
    "| Error code | Exact permitted path family |",
    "| --- | --- |",
    "| `required_field_missing` | any of the twelve declared root-field paths from Section 4; never `$` or an unknown path |",
    "| `unexpected_field` | exactly `$` |",
    "| `invalid_field_type` | `$` or any of the twelve declared root-field paths from Section 4 |",
    "| `invalid_field_value` | any of the twelve declared root-field paths from Section 4; never `$` |",
    "| `duplicate_reference` | exactly one of the seven reference-field paths listed in Section 6, subject to the later-occurrence rule |",
  ];

  assert.deepEqual(
    numberedListLines(section),
    exactNumberedBacktickLines(errorCodes),
  );
  assert.deepEqual(
    section.split("\n").filter((line) => line.startsWith("|")),
    codeToPathTable,
  );
  assert.match(section, /VALIDATOR_ERROR_CODE_COUNT:\n5/u);
  assert.match(section, /CODE_TO_PATH_PARTITION_COUNT:\n5/u);
  assert.match(
    section,
    /INVALID_CROSS_FIELD_COMBINATION_CODE:\nNOT_SELECTED_FOR_THIS_STRUCTURAL_VALIDATOR/u,
  );
  assert.match(section, /ADDITIONAL_VALIDATOR_ERROR_CODES:\nNONE/u);
});

test("pairwise duplicate handling is exact across seven local references", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 6. Pairwise Reference Duplicate Semantics",
    "## 7.",
  );

  assert.deepEqual(
    numberedListLines(section),
    exactNumberedBacktickLines(referenceFields),
  );
  assert.match(section, /PAIRWISE_REFERENCE_FIELD_COUNT:\n7/u);
  assert.match(section, /exact case-sensitive string equality/u);
  assert.match(section, /first locally valid exact occurrence/u);
  assert.match(section, /Every later locally valid exact occurrence/u);
  assert.match(
    section,
    /DUPLICATE_COMPARISON_SCOPE:\nACROSS_ALL_SEVEN_WRAPPER_REFERENCE_FIELDS/u,
  );
  assert.match(
    section,
    /DUPLICATE_COMPARISON_MODE:\nEXACT_CASE_SENSITIVE_STRING/u,
  );
  assert.match(
    section,
    /DUPLICATE_PARTICIPANT_REQUIREMENT:\nLOCALLY_VALID_OWN_DATA_PROPERTY_STRING/u,
  );
  assert.match(
    section,
    /DUPLICATE_ERROR_POSITION:\nEACH_LATER_VALID_EXACT_OCCURRENCE/u,
  );
  assert.match(section, /REFERENCE_VALUE_ECHO:\nPROHIBITED/u);
});

test("two-phase ordering cascade and external separation are frozen", () => {
  const docsText = readRequired(docsPath);
  const orderSection = sectionBetween(
    docsText,
    "## 7. Deterministic Canonical Error Order And Deduplication",
    "## 8.",
  );
  const cascadeSection = sectionBetween(
    docsText,
    "## 8. Error Cascade And External-Check Separation",
    "## 9.",
  );

  assert.equal((orderSection.match(/^\| [1-2] \|/gmu) ?? []).length, 2);
  assert.match(orderSection, /CANONICAL_VALIDATION_PHASE_COUNT:\n2/u);
  assert.match(orderSection, /at most one root unknown-key error/u);
  assert.match(orderSection, /duplicate-reference detection across the seven/u);
  assert.match(orderSection, /ROOT_UNKNOWN_KEY_ERROR_MAXIMUM_COUNT:\n1/u);
  assert.match(
    orderSection,
    /ERROR_DEDUPLICATION_KEY:\nEXACT_CODE_AND_PATH_PAIR/u,
  );
  assert.match(
    orderSection,
    /ERROR_DEDUPLICATION_RETENTION:\nFIRST_CANONICAL_OCCURRENCE/u,
  );
  assert.match(orderSection, /INPUT_PROPERTY_INSERTION_ORDER_EFFECT:\nNONE/u);

  assert.match(cascadeSection, /no type, value, or duplicate error is synthesized/u);
  assert.match(cascadeSection, /does not participate in\n  duplicate evaluation/u);
  assert.match(cascadeSection, /STRUCTURAL_CROSS_FIELD_RULE_COUNT:\n1/u);
  assert.match(
    cascadeSection,
    /STRUCTURAL_CROSS_FIELD_RULE:\nPAIRWISE_REFERENCE_DISTINCTNESS_ONLY/u,
  );
  assert.match(cascadeSection, /HYPOTHETICAL_SECONDARY_ERRORS:\nPROHIBITED/u);
  assert.match(cascadeSection, /EXTERNAL_DEPENDENCY_CHECKS:\nNOT_EVALUATED/u);
  assert.match(cascadeSection, /EXTERNAL_OR_ADMISSIBILITY_ERROR_CODES:\nNONE/u);
});

test("descriptor safety and exact result invariants remain fail closed", () => {
  const docsText = readRequired(docsPath);
  const descriptorSection = sectionBetween(
    docsText,
    "## 9. Descriptor-Safe Presence And Inspection",
    "## 10.",
  );
  const resultSection = sectionBetween(
    docsText,
    "## 10. Exact Validator Result Invariants",
    "## 11.",
  );
  const resultFieldsSection = sectionBetween(
    resultSection,
    "A future separately authorized validator must return one deeply frozen closed\nobject with exactly these fields in order:",
    "VALIDATOR_RESULT_FIELD_COUNT:",
  );
  const errorFieldsSection = sectionBetween(
    resultSection,
    "Every error is one deeply frozen closed object with exactly these fields in\norder:",
    "The error array preserves Section 7 order",
  );

  assert.match(descriptorSection, /regardless of enumerability/u);
  assert.match(descriptorSection, /Inherited\nproperties are never traversed/u);
  assert.match(descriptorSection, /no getter or setter is invoked/u);
  assert.match(descriptorSection, /OWN_DESCRIPTOR_ENUMERABILITY_FILTER:\nNONE/u);
  assert.match(descriptorSection, /INHERITED_PROPERTY_TRAVERSAL:\nPROHIBITED/u);
  assert.match(descriptorSection, /ACCESSOR_EXECUTION:\nPROHIBITED/u);
  assert.match(descriptorSection, /OWN_SYMBOL_KEY_BEHAVIOR:\nUNEXPECTED_FIELD_AT_ROOT/u);
  assert.match(
    descriptorSection,
    /INPUT_MUTATION_COERCION_OR_NORMALIZATION:\nPROHIBITED/u,
  );

  assert.deepEqual(
    numberedListLines(resultFieldsSection),
    exactNumberedBacktickLines(["valid", "contractKind", "version", "errors"]),
  );
  assert.deepEqual(
    numberedListLines(errorFieldsSection),
    exactNumberedBacktickLines(["code", "path"]),
  );
  assert.match(resultSection, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    resultSection,
    /VALIDATOR_RESULT_CONTRACT_KIND:\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_BOUNDARY/u,
  );
  assert.match(resultSection, /VALIDATOR_RESULT_VERSION:\n1\.0\.0/u);
  assert.match(resultSection, /`valid` is `true` if and only if `errors` is exactly empty/u);
  assert.match(resultSection, /VALID_TRUE_ERROR_COUNT:\n0/u);
  assert.match(resultSection, /VALID_FALSE_ERROR_MINIMUM_COUNT:\n1/u);
  assert.match(resultSection, /ERROR_OBJECT_FIELD_COUNT:\n2/u);
  assert.match(resultSection, /ADDITIONAL_ERROR_FIELDS:\nNONE/u);
  assert.match(
    resultSection,
    /RESULT_ERROR_ARRAY_AND_ERROR_OBJECT_FREEZE:\nRECURSIVE/u,
  );
  assert.match(
    resultSection,
    /The\nresult, error array, and every error object are recursively frozen/u,
  );
  assert.match(resultSection, /ADDITIONAL_RESULT_FIELDS:\nNONE/u);
  assert.match(resultSection, /INPUT_OR_DIAGNOSTIC_ECHO:\nPROHIBITED/u);
});

test("exact docs-only scope preserves six historical paths and the current 2/4 partition", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const scopeSection = sectionBetween(
    docsText,
    "## 13. Exact File Scope",
    "## 14.",
  );
  const laterSection = sectionBetween(
    docsText,
    "## 11. Reserved Later Surfaces And Ordered Separation",
    "## 12.",
  );

  readRequired(candidateSchemaPath);
  readRequired(candidateSchemaProofPath);
  for (const historicalSurface of retainedLaterSurfaces) {
    assert.equal(
      laterSection.includes("`" + historicalSurface + "`"),
      true,
      historicalSurface,
    );
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
    proofText.includes(
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
    proofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  for (const historicalRetainedSurface of historicalValidatorResultRetainedSurfaces) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" +
          historicalRetainedSurface +
          "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      historicalRetainedSurface,
    );
  }
  assert.equal(
    retainedPackageAndValidatorSurfaces.includes(candidatePackageExportProofPath),
    false,
  );
  assert.equal(retainedPackageAndValidatorSurfaces.length, 3);
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
    proofText.includes(
      "fs." +
        "existsSync(absolute(validatorResultPackageExportProofPath))",
    ),
    false,
  );
  assert.deepEqual(retainedValidatorSurfaces, retainedLaterSurfaces.slice(4));
  for (const retainedSurface of retainedValidatorSurfaces) {
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" + retainedSurface + "` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE`",
      ),
      true,
      retainedSurface,
    );
  }

  assert.match(laterSection, /RETAINED_LATER_SURFACE_LIVE_ABSENCE_COUNT:\n6/u);
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
      `| 3 | \`tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js\` | preserve validator error/path semantics and four sibling absences; align only the two validator-result candidate paths |`,
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
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  assert.match(laterSection, /FUTURE_IMPLEMENTATION_SEQUENCE_STEP_COUNT:\n7/u);
  assert.match(scopeSection, /SEMANTICS_SLICE_FILE_COUNT:\n2/u);
  assert.equal(scopeSection.includes("`" + docsPath + "`"), true);
  assert.equal(scopeSection.includes("`" + proofPath + "`"), true);
  assert.match(scopeSection, /No existing file is modified by this slice/u);

  for (const marker of [
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_RESULT_PACKAGE_EXPORT_NOT_CREATED",
    "CANDIDATE_PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "IDENTITY_VERIFICATION_NOT_CREATED",
    "CURRENTNESS_ROLE_AUTHORITY_NOT_CREATED",
    "PERSISTENCE_API_UI_RUNTIME_NOT_CREATED",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});
