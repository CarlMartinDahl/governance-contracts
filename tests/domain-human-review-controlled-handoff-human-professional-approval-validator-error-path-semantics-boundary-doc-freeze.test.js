"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-error-path-semantics-boundary-doc-freeze.test.js";
const approvalSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval.json";
const approvalSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  approvalSchemaPath,
  approvalSchemaProofPath,
  "tests/domain-human-review-controlled-handoff-human-professional-approval-contract-boundary-doc-freeze.test.js",
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "schemas/human-review-controlled-handoff-brief-validator-result.json",
  "packages/schemas/src/human-review-questions-validator.js",
  "schemas/human-review-questions-validator-result.json",
];
const retainedLaterSurfaces = [
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const validatorResultCandidatePaths = retainedLaterSurfaces.slice(0, 2);
const candidatePackageExportProofPath = retainedLaterSurfaces[2];
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

function assertOrderedList(section, values) {
  let previousIndex = -1;

  for (const [index, value] of values.entries()) {
    const item = `${index + 1}. \`${value}\``;
    const itemIndex = section.indexOf(item);
    assert.notEqual(itemIndex, -1, value);
    assert.equal(itemIndex > previousIndex, true, value);
    previousIndex = itemIndex;
  }
}

test("approval validator error-path semantics sources and seven stages are frozen", () => {
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
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /OWNER_SELECTED_SEVEN_STAGE_SEMANTICS_TRANSLATED/u);
  assert.match(docsText, /OWNER_APPROVED_REPO_PRECEDENT_NORMALIZATION/u);

  for (let stage = 1; stage <= 7; stage += 1) {
    assert.match(
      docsText,
      new RegExp(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`, "u"),
    );
  }

  assert.match(docsText, /OWNER_SELECTED_STAGE_COUNT:\n7/u);
  assert.match(docsText, /OPEN_ERROR_PATH_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(docsText, /REPO_PRECEDENT_NORMALIZATION_COUNT:\n2/u);
  assert.match(
    docsText,
    /correction-request cross-field phase runs before duplicate-reference/u,
  );
  assert.match(
    docsText,
    /all own property descriptors participate regardless of enumerability/u,
  );
});

test("closed path vocabulary contains exact static and indexed paths", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 4. Closed Canonical Error-Path Vocabulary",
    "## 5.",
  );
  const rootFields = [
    "$.contract_id",
    "$.contract_version",
    "$.approval_ref",
    "$.packet_ref",
    "$.controlled_handoff_brief_ref",
    "$.controlled_handoff_brief_fingerprint",
    "$.approval_posture",
    "$.decision",
    "$.reviewer_attribution",
    "$.decision_support",
    "$.decided_at",
    "$.review_session_ref",
    "$.decision_attestation_ref",
  ];
  const nestedFields = [
    "$.reviewer_attribution.reviewer_ref",
    "$.reviewer_attribution.reviewer_role",
    "$.reviewer_attribution.reviewer_authority_evidence_ref",
    "$.decision_support.decision_basis_refs",
    "$.decision_support.prior_approval_refs",
    "$.decision_support.correction_request_refs",
  ];
  const indexedPaths = [
    "$.decision_support.decision_basis_refs[<index>]",
    "$.decision_support.prior_approval_refs[<index>]",
    "$.decision_support.correction_request_refs[<index>]",
  ];

  assertOrderedList(section, rootFields);
  assertOrderedList(section, nestedFields);
  assertOrderedList(section, indexedPaths);
  assert.match(section, /CANONICAL_ROOT_AND_ROOT_FIELD_PATH_COUNT:\n14/u);
  assert.match(section, /CANONICAL_NESTED_FIELD_PATH_COUNT:\n6/u);
  assert.match(section, /CANONICAL_INDEXED_PATH_TEMPLATE_COUNT:\n3/u);
  assert.match(section, /CANONICAL_STATIC_ERROR_PATH_COUNT:\n20/u);
  assert.match(
    section,
    /CANONICAL_ARRAY_INDEX_TOKEN:\n\(\?:0\|\[1-9\]\[0-9\]\*\)/u,
  );
  assert.match(section, /UNKNOWN_KEY_NAME_ECHO:\nPROHIBITED/u);
  assert.match(section, /DYNAMIC_VALUE_DERIVED_PATHS:\nPROHIBITED/u);
});

test("six error codes have an exact closed path partition", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 5. Exact Six-Code-To-Path Partition",
    "## 6.",
  );
  const errorCodes = [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "invalid_cross_field_combination",
    "duplicate_reference",
  ];

  assertOrderedList(section, errorCodes);
  assert.equal((section.match(/^\| `[^`]+` \|/gmu) ?? []).length, 6);
  assert.match(section, /VALIDATOR_ERROR_CODE_COUNT:\n6/u);
  assert.match(section, /CODE_TO_PATH_PARTITION_COUNT:\n6/u);
  assert.match(
    section,
    /`unexpected_field` \| exactly `\$`, `\$\.reviewer_attribution`, or `\$\.decision_support`/u,
  );
  assert.match(
    section,
    /correction-request decision-dependent cardinality rule is represented only as\n`invalid_cross_field_combination`/u,
  );
  assert.match(section, /ADDITIONAL_VALIDATOR_ERROR_CODES:\nNONE/u);
  assert.match(section, /ADDITIONAL_ERROR_PATH_FAMILIES:\nNONE/u);
});

test("array indices cardinality cross-field and duplicates are exact", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 6. Indexed Items, Cardinality, And Duplicate References",
    "## 7.",
  );

  assertOrderedList(section, [
    "decision_basis_refs",
    "prior_approval_refs",
    "correction_request_refs",
  ]);
  assert.match(section, /ascending actual numeric\nindex/u);
  assert.match(section, /hole, accessor-backed index, or non-string data value/u);
  assert.match(
    section,
    /empty `decision_basis_refs` array produces `invalid_field_value`/u,
  );
  assert.match(
    section,
    /`prior_approval_refs` array containing more than one supplied position/u,
  );
  assert.match(
    section,
    /`HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED` with any count other than one/u,
  );
  assert.match(section, /first locally valid exact string occurrence/u);
  assert.match(
    section,
    /cross-field error is emitted first under\nSection 7/u,
  );
  assert.match(
    section,
    /DUPLICATE_COMPARISON_SCOPE:\nWITHIN_ONE_REFERENCE_ARRAY_ONLY/u,
  );
  assert.match(
    section,
    /DUPLICATE_ERROR_POSITION:\nEACH_LATER_VALID_EXACT_OCCURRENCE/u,
  );
  assert.match(section, /REFERENCE_VALUE_ECHO:\nPROHIBITED/u);
});

test("canonical seven-phase order cascade and exact-pair dedupe are frozen", () => {
  const docsText = readRequired(docsPath);
  const orderSection = sectionBetween(
    docsText,
    "## 7. Deterministic Canonical Error Order And Deduplication",
    "## 8.",
  );
  const cascadeSection = sectionBetween(
    docsText,
    "## 8. Error Cascade And Cross-Field Evaluability",
    "## 9.",
  );

  assert.equal((orderSection.match(/^\| [1-7] \|/gmu) ?? []).length, 7);
  assert.match(orderSection, /CANONICAL_VALIDATION_PHASE_COUNT:\n7/u);
  assert.match(
    orderSection,
    /correction-request cross-field rule when its exact participants are evaluable/u,
  );
  assert.match(
    orderSection,
    /duplicate-reference detection in array declaration order/u,
  );
  assert.match(
    orderSection,
    /ERROR_DEDUPLICATION_KEY:\nEXACT_CODE_AND_PATH_PAIR/u,
  );
  assert.match(
    orderSection,
    /ERROR_DEDUPLICATION_RETENTION:\nFIRST_CANONICAL_OCCURRENCE/u,
  );
  assert.match(
    orderSection,
    /INPUT_PROPERTY_INSERTION_ORDER_EFFECT:\nNONE/u,
  );
  assert.match(cascadeSection, /no missing child errors\n  are synthesized/u);
  assert.match(cascadeSection, /No secondary or hypothetical error/u);
  assert.match(cascadeSection, /HYPOTHETICAL_DESCENDANT_ERRORS:\nPROHIBITED/u);
  assert.match(
    cascadeSection,
    /CROSS_FIELD_PREREQUISITE_FAILURE_BEHAVIOR:\nSKIP_CROSS_FIELD_EMISSION/u,
  );
});

test("descriptor safety and result invariants preserve fail-closed precedent", () => {
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

  assert.match(descriptorSection, /regardless of enumerability/u);
  assert.match(descriptorSection, /Inherited\nproperties are never traversed/u);
  assert.match(descriptorSection, /no getter or setter is invoked/u);
  assert.match(
    descriptorSection,
    /OWN_DESCRIPTOR_ENUMERABILITY_FILTER:\nNONE/u,
  );
  assert.match(
    descriptorSection,
    /INHERITED_PROPERTY_TRAVERSAL:\nPROHIBITED/u,
  );
  assert.match(descriptorSection, /ACCESSOR_EXECUTION:\nPROHIBITED/u);
  assert.match(
    descriptorSection,
    /OWN_SYMBOL_KEY_BEHAVIOR:\nUNEXPECTED_FIELD_AT_NEAREST_PERMITTED_CONTAINER/u,
  );
  assertOrderedList(resultSection, ["valid", "contractKind", "version", "errors"]);
  assert.match(resultSection, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    resultSection,
    /VALIDATOR_RESULT_CONTRACT_KIND:\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_BOUNDARY/u,
  );
  assert.match(resultSection, /VALIDATOR_RESULT_VERSION:\n1\.0\.0/u);
  assert.match(resultSection, /`valid` is `true` if and only if `errors` is exactly empty/u);
  assert.match(resultSection, /VALID_TRUE_ERROR_COUNT:\n0/u);
  assert.match(resultSection, /VALID_FALSE_ERROR_MINIMUM_COUNT:\n1/u);
  assert.match(resultSection, /ADDITIONAL_RESULT_FIELDS:\nNONE/u);
  assert.match(resultSection, /INPUT_OR_DIAGNOSTIC_ECHO:\nPROHIBITED/u);
});

test("two-file docs-only scope preserves history and current path partition", () => {
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
  const futureSection = sectionBetween(
    docsText,
    "## 11. Reserved Later Surfaces And Ordered Separation",
    "## 12.",
  );
  const scopeSection = sectionBetween(
    docsText,
    "## 13. Exact File Scope",
    "## 14.",
  );

  readRequired(approvalSchemaPath);
  readRequired(approvalSchemaProofPath);

  for (const validatorResultCandidatePath of validatorResultCandidatePaths) {
    assert.equal(
      futureSection.includes("`" + validatorResultCandidatePath + "`"),
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
  const validatorHelperProofTransitionText = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  );
  for (const retainedSurface of retainedValidatorSurfaces) {
    assert.equal(
      futureSection.includes("`" + retainedSurface + "`"),
      true,
      retainedSurface,
    );
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedSurface + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedSurface,
    );
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + retainedSurface + "`"),
      true,
      retainedSurface,
    );
  }

  assert.match(futureSection, /RETAINED_LATER_SURFACE_LIVE_ABSENCE_COUNT:\n6/u);
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
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n11/u,
  );
  assert.match(
    packageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n10/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n13/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n12/u,
  );
  assert.match(futureSection, /FUTURE_IMPLEMENTATION_SEQUENCE_STEP_COUNT:\n7/u);
  assert.match(scopeSection, /SEMANTICS_SLICE_FILE_COUNT:\n2/u);
  assert.equal(scopeSection.includes("`" + docsPath + "`"), true);
  assert.equal(scopeSection.includes("`" + proofPath + "`"), true);
  assert.match(scopeSection, /No existing file is modified by this slice/u);
  assert.match(docsText, /VALIDATOR_RESULT_SCHEMA_NOT_CREATED/u);
  assert.match(docsText, /VALIDATOR_NOT_CREATED/u);
  assert.match(docsText, /APPROVAL_EFFECT_NOT_CREATED/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
});
