"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json";
const candidateSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const decisionAttestationSourcePaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-contract-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  candidateSchemaPath,
  candidateSchemaProofPath,
];
const precedentPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
];
const rootFieldPaths = [
  "$.contract_id",
  "$.contract_version",
  "$.decision_attestation_ref",
  "$.approval_ref",
  "$.review_session_ref",
  "$.reviewer_ref",
  "$.reviewer_role",
  "$.decision",
  "$.attested_at",
  "$.attestation_posture",
  "$.binding_issuer_ref",
  "$.binding_provenance_ref",
  "$.attestation_lifecycle_posture",
  "$.verification_posture",
  "$.human_professional_review_required",
];
const referenceFields = [
  "decision_attestation_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const retainedLaterSurfaces = [
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
];
const validatorResultCandidatePaths = retainedLaterSurfaces.slice(0, 2);
const historicalValidatorResultRetainedSurfaces =
  retainedLaterSurfaces.slice(2);
const candidatePackageExportProofPath =
  historicalValidatorResultRetainedSurfaces[0];
const retainedPackageAndValidatorSurfaces =
  historicalValidatorResultRetainedSurfaces.slice(1);
const validatorResultPackageExportProofPath = retainedLaterSurfaces[3];
const retainedValidatorSurfaces = retainedLaterSurfaces.slice(4);

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(text, start, end) {
  const startIndex = text.indexOf(start);
  const endIndex = text.indexOf(end, startIndex + start.length);

  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return text.slice(startIndex, endIndex);
}

function exactNumberedBacktickLines(values) {
  return values.map((value, index) => `${index + 1}. \`${value}\``);
}

function exactMarkdownBacktickBullets(values) {
  return values.map((value) => `- \`${value}\``);
}

function markdownBacktickBulletLines(section) {
  return section.split("\n").filter((line) => /^- `[^`]+`$/u.test(line));
}

function numberedListLines(section) {
  return section.split("\n").filter((line) => /^\d+\. /u.test(line));
}

function markdownBulletItems(section) {
  const items = [];

  for (const line of section.split("\n")) {
    if (line.startsWith("- ")) {
      items.push(line.slice(2));
    } else if (items.length > 0 && /^  \S/u.test(line)) {
      items[items.length - 1] += " " + line.trim();
    }
  }

  return items;
}

function numberedListItems(section) {
  const items = [];

  for (const line of section.split("\n")) {
    if (/^\d+\. /u.test(line)) {
      items.push(line.replace(/^\d+\. /u, ""));
    } else if (items.length > 0 && /^ {3,}\S/u.test(line)) {
      items[items.length - 1] += " " + line.trim();
    }
  }

  return items;
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/gu, " ").trim();
}

test("decision attestation sources and seven selected stages are exact", () => {
  const docsText = readRequired(docsPath);
  const sourceSection = sectionBetween(
    docsText,
    "The controlling tracked decision-attestation-evidence sources are:",
    "The following tracked boundaries provide",
  );
  const precedentSection = sectionBetween(
    docsText,
    "The following tracked boundaries provide",
    "Those precedent sources do not validate",
  );
  const precedentBoundarySection = sectionBetween(
    docsText,
    "Those precedent sources do not validate",
    "The staged Owner selections supply",
  );
  const stageSection = sectionBetween(
    docsText,
    "## 3. Owner-Selected Decision Record",
    "OWNER_SELECTED_STAGE_COUNT:",
  );
  const expectedStageTable = [
    "| Stage | Selected option | Frozen result |",
    "| --- | --- | --- |",
    "| 1 | `OPTION_A` | one closed vocabulary containing `$` and the fifteen declared root-field paths; unknown key names are never echoed |",
    "| 2 | `OPTION_A` | exact five-code-to-path partition with no additional structural code or path family |",
    "| 3 | `OPTION_A` | exact case-sensitive comparison across six locally valid references with each later duplicate reported at its own field path |",
    "| 4 | `OPTION_A` | deterministic two-phase declaration traversal and exact `{ code, path }` first-occurrence deduplication independent of input insertion order |",
    "| 5 | `OPTION_A` | prerequisite-gated local validation, no hypothetical errors, and complete separation from external dependency and admissibility checks |",
    "| 6 | `OPTION_A` | all-own-descriptor inspection without accessor execution, prototype traversal, coercion, mutation, or value echo |",
    "| 7 | `OPTION_A` | exact four-field deeply frozen result coupling in which `valid` is equivalent to an empty `errors` array |",
  ];

  for (const sourcePath of [
    ...decisionAttestationSourcePaths,
    ...precedentPaths,
  ]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.deepEqual(
    markdownBacktickBulletLines(sourceSection),
    exactMarkdownBacktickBullets(decisionAttestationSourcePaths),
  );
  assert.deepEqual(
    markdownBacktickBulletLines(precedentSection),
    exactMarkdownBacktickBullets(precedentPaths),
  );
  assert.equal(
    normalizeWhitespace(precedentBoundarySection),
    "Those precedent sources do not validate this decision-attestation-evidence candidate and do not define its fields, reference uniqueness, attestation occurrence, signature validity, issuer trust, lifecycle truth, error paths, admissibility, or approval effect. They are not invoked by this docs-only boundary.",
  );
  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY/u,
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
  assert.deepEqual(
    stageSection.split("\n").filter((line) => line.startsWith("|")),
    expectedStageTable,
  );
  assert.match(
    docsText,
    /EXACT_TWO_FIELD_ERROR_OBJECT_AND_RECURSIVE_FREEZE_DEFINED/u,
  );
});

test("closed vocabulary is root plus exactly fifteen static field paths", () => {
  const section = sectionBetween(
    readRequired(docsPath),
    "## 4. Closed Canonical Error-Path Vocabulary",
    "## 5.",
  );

  assert.deepEqual(
    numberedListLines(section),
    exactNumberedBacktickLines(rootFieldPaths),
  );
  assert.match(section, /CANONICAL_ROOT_PATH_COUNT:\n1/u);
  assert.match(section, /CANONICAL_ROOT_FIELD_PATH_COUNT:\n15/u);
  assert.match(section, /CANONICAL_STATIC_ERROR_PATH_COUNT:\n16/u);
  assert.match(section, /CANONICAL_NESTED_FIELD_PATH_COUNT:\n0/u);
  assert.match(section, /CANONICAL_INDEXED_PATH_TEMPLATE_COUNT:\n0/u);
  assert.match(section, /UNKNOWN_KEY_PATH:\n\$/u);
  assert.match(section, /UNKNOWN_KEY_NAME_ECHO:\nPROHIBITED/u);
  assert.match(section, /DYNAMIC_VALUE_DERIVED_PATHS:\nPROHIBITED/u);
  assert.match(section, /ADDITIONAL_ERROR_PATH_FAMILIES:\nNONE/u);
});

test("five structural codes have one complete closed path partition", () => {
  const section = sectionBetween(
    readRequired(docsPath),
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
  const expectedTable = [
    "| Error code | Exact permitted path family |",
    "| --- | --- |",
    "| `required_field_missing` | any of the fifteen declared root-field paths from Section 4; never `$` or an unknown path |",
    "| `unexpected_field` | exactly `$` |",
    "| `invalid_field_type` | `$` or any of the fifteen declared root-field paths from Section 4 |",
    "| `invalid_field_value` | any of the fifteen declared root-field paths from Section 4; never `$` |",
    "| `duplicate_reference` | exactly one of the six reference-field paths listed in Section 6, subject to the later-occurrence rule |",
  ];

  assert.deepEqual(
    numberedListLines(section),
    exactNumberedBacktickLines(errorCodes),
  );
  assert.deepEqual(
    section.split("\n").filter((line) => line.startsWith("|")),
    expectedTable,
  );
  assert.match(section, /VALIDATOR_ERROR_CODE_COUNT:\n5/u);
  assert.match(section, /CODE_TO_PATH_PARTITION_COUNT:\n5/u);
  assert.match(
    section,
    /INVALID_CROSS_FIELD_COMBINATION_CODE:\nNOT_SELECTED_FOR_THIS_STRUCTURAL_VALIDATOR/u,
  );
  assert.match(section, /ADDITIONAL_VALIDATOR_ERROR_CODES:\nNONE/u);
});

test("pairwise duplicate handling is exact across six local references", () => {
  const section = sectionBetween(
    readRequired(docsPath),
    "## 6. Pairwise Reference Duplicate Semantics",
    "## 7.",
  );

  assert.deepEqual(
    numberedListLines(section),
    exactNumberedBacktickLines(referenceFields),
  );
  assert.match(section, /PAIRWISE_REFERENCE_FIELD_COUNT:\n6/u);
  assert.match(section, /exact case-sensitive string equality/u);
  assert.match(section, /first locally valid exact occurrence/u);
  assert.match(section, /Every later locally valid exact occurrence/u);
  assert.match(
    section,
    /DUPLICATE_COMPARISON_SCOPE:\nACROSS_ALL_SIX_WRAPPER_REFERENCE_FIELDS/u,
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

test("two-phase order cascade and external separation are complete", () => {
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
  const expectedPhaseTable = [
    "| Phase | Exact activity |",
    "| --- | --- |",
    "| 1 | required fields in declaration order; at most one root unknown-key error; field types in declaration order; then locally evaluable field values in declaration order |",
    "| 2 | duplicate-reference detection across the six reference fields in declaration order |",
  ];
  const expectedCascadeRules = [
    "a null, array, non-plain object, special object, or root whose prototype or own descriptors cannot be safely inspected produces exactly `invalid_field_type` at `$` and stops",
    "a missing field produces only `required_field_missing` at its declared path; no type, value, or duplicate error is synthesized for that field",
    "a present field whose value has the wrong type produces only `invalid_field_type` at its declared path; no value or duplicate evaluation occurs for that field",
    "a present field with the correct type but invalid local value produces `invalid_field_value` at its declared path and does not participate in duplicate evaluation",
    "every locally valid reference participates in duplicate evaluation even when unrelated fields contain errors",
    "no secondary, inferred, or hypothetical error is derived from a field whose prerequisite value cannot be safely evaluated",
  ];
  const expectedExternalChecks = [
    "equality between wrapper `decision_attestation_ref` and an approval candidate",
    "equality between wrapper `approval_ref` and an approval candidate",
    "equality between wrapper `decision` and an approval candidate",
    "equality between wrapper `review_session_ref` and approval and review-session candidates",
    "equality between wrapper `reviewer_ref` and approval reviewer attribution",
    "equality between wrapper `reviewer_role` and approval reviewer attribution",
    "consistency across separately supplied reviewer identity, role, and authority evidence candidates",
    "attestation occurrence, reviewer authorship, signature existence, signature validity, or cryptographic verification",
    "issuer or provenance trust, identity, ownership, chain of custody, or source truth",
    "lifecycle truth, trusted time, temporal order, freshness, currentness, conflict, replacement, or supersession",
    "approval admissibility, approval effect, handoff eligibility, export, delivery, release, product candidacy, or external use",
  ];

  assert.deepEqual(
    orderSection.split("\n").filter((line) => line.startsWith("|")),
    expectedPhaseTable,
  );
  assert.match(orderSection, /CANONICAL_VALIDATION_PHASE_COUNT:\n2/u);
  assert.match(
    orderSection,
    /ROOT_PREFLIGHT_FAILURE_RESULT:\nEXACT_INVALID_FIELD_TYPE_AT_ROOT_AND_STOP/u,
  );
  assert.match(
    orderSection,
    /PHASE_1_ORDER:\nREQUIRED_THEN_SINGLE_UNKNOWN_THEN_TYPE_THEN_VALUE/u,
  );
  assert.match(
    orderSection,
    /PHASE_2_ORDER:\nDUPLICATE_REFERENCE_DECLARATION_ORDER/u,
  );
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

  assert.deepEqual(markdownBulletItems(cascadeSection), expectedCascadeRules);
  assert.deepEqual(numberedListItems(cascadeSection), expectedExternalChecks);
  assert.match(cascadeSection, /PREREQUISITE_GATED_CASCADE_RULE_COUNT:\n6/u);
  assert.match(cascadeSection, /EXTERNAL_CHECK_SEPARATION_ITEM_COUNT:\n11/u);
  assert.match(cascadeSection, /STRUCTURAL_CROSS_FIELD_RULE_COUNT:\n1/u);
  assert.match(
    cascadeSection,
    /STRUCTURAL_CROSS_FIELD_RULE:\nPAIRWISE_REFERENCE_DISTINCTNESS_ONLY/u,
  );
  assert.match(cascadeSection, /HYPOTHETICAL_SECONDARY_ERRORS:\nPROHIBITED/u);
  assert.match(cascadeSection, /EXTERNAL_DEPENDENCY_CHECKS:\nNOT_EVALUATED/u);
  assert.match(
    cascadeSection,
    /ATTESTATION_SIGNATURE_OR_ISSUER_TRUST:\nNOT_EVALUATED/u,
  );
  assert.match(
    cascadeSection,
    /REVIEWER_IDENTITY_ROLE_AUTHORITY_OR_SESSION:\nNOT_EVALUATED/u,
  );
  assert.match(
    cascadeSection,
    /TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH:\nNOT_EVALUATED/u,
  );
  assert.match(
    cascadeSection,
    /OUTER_APPROVAL_AND_REVIEWER_CROSS_REFERENCES:\nNOT_EVALUATED/u,
  );
  assert.match(cascadeSection, /EXTERNAL_OR_ADMISSIBILITY_ERROR_CODES:\nNONE/u);
});

test("descriptor safety and exact result invariants remain fail closed", () => {
  const docsText = readRequired(docsPath);
  const descriptorSection = sectionBetween(
    docsText,
    "## 9. Descriptor-Safe Presence And Inspection",
    "## 10.",
  );
  const knownFieldSection = sectionBetween(
    descriptorSection,
    "For a known field:",
    "For an unknown own key:",
  );
  const unknownKeySection = sectionBetween(
    descriptorSection,
    "For an unknown own key:",
    "Failure of root prototype",
  );
  const resultSection = sectionBetween(
    docsText,
    "## 10. Exact Validator Result Invariants",
    "## 11.",
  );
  const resultFieldsSection = sectionBetween(
    resultSection,
    "object with exactly these fields in order:",
    "VALIDATOR_RESULT_FIELD_COUNT:",
  );
  const errorFieldsSection = sectionBetween(
    resultSection,
    "Every error is one deeply frozen closed object with exactly these fields in\norder:",
    "ERROR_OBJECT_FIELD_COUNT:",
  );
  const validitySection = sectionBetween(
    resultSection,
    "The exact invariant is bidirectional:",
    "VALID_TRUE_ERROR_COUNT:",
  );
  const expectedKnownRules = [
    "an own data descriptor establishes presence, including when its value is `undefined` or the descriptor is non-enumerable",
    "`undefined` is present but fails the expected type; it is not missing",
    "an own accessor descriptor is present but invalid and produces `invalid_field_type` at the known field path",
    "no getter or setter is invoked",
  ];
  const expectedUnknownRules = [
    "unknown string keys, symbol keys, and accessor-backed keys collectively produce at most one `unexpected_field` at `$`",
    "enumerability does not change that outcome",
    "the rejected key name, symbol description, accessor, or value is never read into or echoed by the result",
  ];
  const expectedValidityRules = [
    "`valid` is `true` if and only if `errors` is exactly empty",
    "`valid` is `false` if and only if `errors` contains at least one error",
  ];

  assert.deepEqual(markdownBulletItems(knownFieldSection), expectedKnownRules);
  assert.deepEqual(markdownBulletItems(unknownKeySection), expectedUnknownRules);
  assert.match(descriptorSection, /regardless of enumerability/u);
  assert.match(descriptorSection, /Inherited\nproperties are never traversed/u);
  assert.match(descriptorSection, /no getter or setter is invoked/u);
  assert.match(descriptorSection, /OWN_DESCRIPTOR_ENUMERABILITY_FILTER:\nNONE/u);
  assert.match(descriptorSection, /INHERITED_PROPERTY_TRAVERSAL:\nPROHIBITED/u);
  assert.match(descriptorSection, /ACCESSOR_EXECUTION:\nPROHIBITED/u);
  assert.match(
    descriptorSection,
    /OWN_SYMBOL_KEY_BEHAVIOR:\nUNEXPECTED_FIELD_AT_ROOT/u,
  );
  assert.match(
    descriptorSection,
    /INPUT_MUTATION_COERCION_OR_NORMALIZATION:\nPROHIBITED/u,
  );
  assert.match(
    descriptorSection,
    /VALID_ROOT_PROTOTYPE_SET:\nOBJECT_PROTOTYPE_OR_NULL/u,
  );
  assert.match(descriptorSection, /OWN_DATA_PROPERTY_PRESENCE:\nPRESENT/u);
  assert.match(
    descriptorSection,
    /OWN_DATA_UNDEFINED_CLASSIFICATION:\nPRESENT_INVALID_TYPE/u,
  );
  assert.match(
    descriptorSection,
    /KNOWN_FIELD_ACCESSOR_CLASSIFICATION:\nPRESENT_INVALID_FIELD_TYPE/u,
  );
  assert.match(
    descriptorSection,
    /ROOT_INSPECTION_FAILURE:\nINVALID_FIELD_TYPE_AT_ROOT_AND_STOP/u,
  );

  assert.deepEqual(
    numberedListLines(resultFieldsSection),
    exactNumberedBacktickLines(["valid", "contractKind", "version", "errors"]),
  );
  assert.deepEqual(
    numberedListLines(errorFieldsSection),
    exactNumberedBacktickLines(["code", "path"]),
  );
  assert.deepEqual(markdownBulletItems(validitySection), expectedValidityRules);
  assert.match(resultSection, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    resultSection,
    /VALIDATOR_RESULT_CONTRACT_KIND:\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_BOUNDARY/u,
  );
  assert.match(resultSection, /VALIDATOR_RESULT_VERSION:\n1\.0\.0/u);
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
    /result, error array, and every error object are recursively frozen/u,
  );
  assert.match(
    resultSection,
    /The error array preserves Section 7 order after exact-pair deduplication/u,
  );
  assert.match(
    resultSection,
    /unexpected internal implementation failure must not be converted into a\nsuccessful result or fabricated contract error/u,
  );
  assert.match(
    resultSection,
    /UNEXPECTED_INTERNAL_FAILURE_TRANSLATION:\nPROHIBITED/u,
  );
  assert.match(resultSection, /ADDITIONAL_RESULT_FIELDS:\nNONE/u);
  assert.match(resultSection, /INPUT_OR_DIAGNOSTIC_ECHO:\nPROHIBITED/u);
});

test("docs-only scope preserves history while both package exports are aligned", () => {
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
  const laterSection = sectionBetween(
    docsText,
    "## 11. Reserved Later Surfaces And Ordered Separation",
    "## 12.",
  );
  const candidateSection = sectionBetween(
    laterSection,
    "already exist and remain unchanged:",
    "This boundary retains live absence",
  );
  const retainedSection = sectionBetween(
    laterSection,
    "This boundary retains live absence for these exact separately reserved later\nsurfaces:",
    "RETAINED_LATER_SURFACE_LIVE_ABSENCE_COUNT:",
  );
  const sequenceSection = sectionBetween(
    laterSection,
    "Later work remains partitioned in this fail-closed order:",
    "FUTURE_IMPLEMENTATION_SEQUENCE_STEP_COUNT:",
  );
  const nonInterferenceSection = sectionBetween(
    docsText,
    "## 12. Non-Interference Rules",
    "## 13.",
  );
  const scopeSection = sectionBetween(
    docsText,
    "## 13. Exact File Scope",
    "## 14.",
  );
  const statusSection = docsText.slice(docsText.indexOf("## 14. Status"));
  const expectedSequence = [
    "separate prove-only validator-result readiness and any required proof transition prerequisite",
    "separate contract-only validator-result schema and focused proof",
    "separate candidate-schema and validator-result package-export alignments",
    "separate validator-helper scope and proof transition",
    "separate structural-validator implementation and focused proof",
    "separate cross-reference, attestation, signature, issuer, trusted-time, currentness, and admissibility semantics before any checkpoint",
    "separate caller, persistence, approval-effect, handoff/export, delivery, or release decision",
  ];
  const expectedNonInterference = [
    "preserve the decision-attestation-evidence contract, schema scaffold boundary, proof-transition prerequisite, candidate schema, and schema proof unchanged",
    "preserve the approval, review-session, reviewer identity, reviewer role, reviewer authority, and all controlled-handoff contract families unchanged",
    "do not create or export a validator-result schema or validator",
    "do not invoke an approval, review-session, reviewer identity, reviewer role, reviewer authority, signature, attestation, issuer, clock, currentness, or other validator and do not create an attestation verifier, signature verifier, issuer verifier, reviewer-authorship verifier, identity verifier, role resolver, authority resolver, lifecycle evaluator, current-record selector, reference resolver, persistence surface, API, route, UI, audit event, export, delivery, or release mechanism",
    "do not inspect, resolve, dereference, log, persist, or emit candidate values or raw, private, source, case, identity-provider, credential, signature, certificate, biometric, cryptographic, provider, session, or real-attestation material",
    "do not reinterpret structural validity as attestation occurrence, signature validity, issuer trust, reviewer authorship, reviewer identity, reviewer role, reviewer authority, session validity, human review, professional review, legal review, evidentiary review, approval, admissibility, sign-off, certification, readiness, product candidacy, or external-use authorization",
  ];
  const expectedFinalBoundary =
    "This docs-only boundary is not schema correctness, validator correctness, attestation verification, signature verification, reviewer-authorship verification, issuer-trust verification, provenance verification, session verification, identity verification, role verification, authority verification, lifecycle or currentness verification, actual human review, professional review, legal review, evidentiary review, technical sign-off, release approval, product or external-use authorization, compliance certification, runtime verification, security approval, deployment readiness, handoff approval, case-truth conclusion, or real-evidence review.";

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
      validatorResultTransitionText.includes(
        "`" + retainedSurface + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedSurface,
    );
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" +
          retainedSurface +
          "` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE`",
      ),
      true,
      retainedSurface,
    );
  }
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  assert.deepEqual(
    numberedListLines(candidateSection),
    exactNumberedBacktickLines([candidateSchemaPath, candidateSchemaProofPath]),
  );
  assert.deepEqual(
    numberedListLines(retainedSection),
    exactNumberedBacktickLines(retainedLaterSurfaces),
  );
  assert.deepEqual(numberedListItems(sequenceSection), expectedSequence);
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_LIVE_PROOF_CONFLICT_COUNT:\n6/u,
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
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n5/u,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "| 4 | `" +
        proofPath +
        "` | preserve validator error/path semantics and four sibling absences; align only the two validator-result candidate paths |",
    ),
    true,
  );
  assert.match(
    validatorResultTransitionText,
    /FIVE_ADDITIONAL_PROOF_ALIGNMENTS_REMAIN_REQUIRED/u,
  );
  assert.deepEqual(
    markdownBulletItems(nonInterferenceSection),
    expectedNonInterference,
  );
  assert.match(laterSection, /RETAINED_LATER_SURFACE_LIVE_ABSENCE_COUNT:\n6/u);
  assert.match(laterSection, /FUTURE_IMPLEMENTATION_SEQUENCE_STEP_COUNT:\n7/u);
  assert.deepEqual(
    numberedListLines(scopeSection),
    exactNumberedBacktickLines([docsPath, proofPath]),
  );
  assert.match(scopeSection, /SEMANTICS_SLICE_FILE_COUNT:\n2/u);
  assert.match(scopeSection, /No existing file is modified by this slice/u);
  assert.equal(
    normalizeWhitespace(
      sectionBetween(
        statusSection,
        "This docs-only boundary is not",
        "FINAL_SAFE_ACTION:",
      ),
    ),
    expectedFinalBoundary,
  );

  for (const marker of [
    "SCHEMA_UNCHANGED",
    "SCHEMA_PROOF_UNCHANGED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_RESULT_PACKAGE_EXPORT_NOT_CREATED",
    "CANDIDATE_PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "ATTESTATION_SIGNATURE_OR_ISSUER_VERIFICATION_NOT_CREATED",
    "IDENTITY_ROLE_AUTHORITY_OR_SESSION_VERIFICATION_NOT_CREATED",
    "TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH_NOT_CREATED",
    "PERSISTENCE_API_UI_RUNTIME_NOT_CREATED",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "PAUSE_UNTIL_SEPARATELY_AUTHORIZED_VALIDATOR_RESULT_READINESS_PROVE_ONLY",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});
