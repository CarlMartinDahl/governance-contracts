"use strict";

const assert = require("node:assert/strict");
const childProcess = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionStatus =
  "LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE";
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json";
const packageIndexPath = "packages/schemas/src/index.js";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-contract-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  candidateSchemaPath,
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  readinessPath,
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  packageIndexPath,
];
const conventionPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-brief-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
];
const currentPaths = [docsPath, proofPath];
const futureSchemaPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js",
];
const retainedSiblingPaths = [
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
];
const candidatePackageExportProofPath = retainedSiblingPaths[0];
const validatorResultPackageExportProofPath = retainedSiblingPaths[1];
const retainedValidatorPaths = retainedSiblingPaths.slice(2);
const allLaterPaths = [...futureSchemaPaths, ...retainedSiblingPaths];
const proofConflictPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  proofPath,
];
const remainingProofAlignmentPaths = proofConflictPaths.slice(0, 5);
const remainingProofAlignmentBindings = [
  {
    path: remainingProofAlignmentPaths[0],
    sourceCollection: "retainedValidatorResultAndValidatorPaths",
    sourcePaths: [...futureSchemaPaths, ...retainedSiblingPaths.slice(2)],
    pendingItem: "retainedPath",
    retainedCollection: "retainedValidatorPaths",
    retainedItem: "retainedValidatorPath",
    retainedPaths: retainedSiblingPaths.slice(2),
    alignedExistsOperands: ["relativePath"],
  },
  {
    path: remainingProofAlignmentPaths[1],
    sourceCollection: "laterSiblingPaths",
    sourcePaths: allLaterPaths,
    pendingItem: "siblingPath",
    historicalRetainedCollection: "retainedPackageAndValidatorSiblingPaths",
    retainedCollection: "activePackageAndValidatorSiblingPaths",
    retainedSourceCollection: "retainedPackageAndValidatorSiblingPaths",
    retainedSliceArguments: [1],
    retainedItem: "retainedSiblingPath",
    retainedPaths: retainedSiblingPaths.slice(1),
    resultAlignedRetainedCollection: "retainedValidatorSiblingPaths",
    resultAlignedRetainedSourceCollection: "laterSiblingPaths",
    resultAlignedRetainedSliceArguments: [4],
    resultAlignedRetainedPaths: retainedSiblingPaths.slice(2),
    alignedExistsOperands: [
      "relativePath",
      '"packages/schemas/src/index.js"',
    ],
  },
  {
    path: remainingProofAlignmentPaths[2],
    sourceCollection: "laterSiblingPaths",
    sourcePaths: allLaterPaths,
    pendingItem: "siblingPath",
    historicalRetainedCollection: "retainedPackageAndValidatorSiblingPaths",
    retainedCollection: "activePackageAndValidatorSiblingPaths",
    retainedSourceCollection: "retainedPackageAndValidatorSiblingPaths",
    retainedSliceArguments: [1],
    retainedItem: "retainedSiblingPath",
    retainedPaths: retainedSiblingPaths.slice(1),
    resultAlignedRetainedCollection: "retainedValidatorSiblingPaths",
    resultAlignedRetainedSourceCollection: "laterSiblingPaths",
    resultAlignedRetainedSliceArguments: [4],
    resultAlignedRetainedPaths: retainedSiblingPaths.slice(2),
    alignedExistsOperands: [],
  },
  {
    path: remainingProofAlignmentPaths[3],
    sourceCollection: "retainedLaterSurfaces",
    sourcePaths: allLaterPaths,
    pendingItem: "retainedSurface",
    historicalRetainedCollection:
      "historicalValidatorResultRetainedSurfaces",
    retainedCollection: "retainedPackageAndValidatorSurfaces",
    retainedSourceCollection: "historicalValidatorResultRetainedSurfaces",
    retainedSliceArguments: [1],
    retainedItem: "retainedSurface",
    retainedPaths: retainedSiblingPaths.slice(1),
    resultAlignedRetainedCollection: "retainedValidatorSurfaces",
    resultAlignedRetainedSourceCollection: "retainedLaterSurfaces",
    resultAlignedRetainedSliceArguments: [4],
    resultAlignedRetainedPaths: retainedSiblingPaths.slice(2),
    alignedExistsOperands: ["relativePath"],
  },
  {
    path: remainingProofAlignmentPaths[4],
    sourceCollection: "reservedLaterPaths",
    sourcePaths: allLaterPaths,
    pendingItem: "reservedPath",
    historicalRetainedCollection: "historicalValidatorResultRetainedPaths",
    retainedCollection: "retainedPackageAndValidatorPaths",
    retainedSourceCollection: "historicalValidatorResultRetainedPaths",
    retainedSliceArguments: [1],
    retainedItem: "retainedPath",
    retainedPaths: retainedSiblingPaths.slice(1),
    resultAlignedRetainedCollection: "retainedValidatorPaths",
    resultAlignedRetainedSourceCollection: "reservedLaterPaths",
    resultAlignedRetainedSliceArguments: [4],
    resultAlignedRetainedPaths: retainedSiblingPaths.slice(2),
    alignedExistsOperands: ["relativePath"],
  },
];
const prerequisiteCurrentPaths = [proofTransitionPath, proofPath];
const rootKeywords = [
  "$schema",
  "$id",
  "title",
  "type",
  "additionalProperties",
  "required",
  "properties",
  "oneOf",
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
const candidateFields = rootFieldPaths.map((fieldPath) => fieldPath.slice(2));
const duplicateReferencePaths = [
  "$.decision_attestation_ref",
  "$.approval_ref",
  "$.review_session_ref",
  "$.reviewer_ref",
  "$.binding_issuer_ref",
  "$.binding_provenance_ref",
];
const forbiddenValidatorResultKeys = [
  "valid",
  "contractKind",
  "version",
  "errors",
  "code",
  "path",
];
const errorsKeywords = ["type", "uniqueItems", "items"];
const errorItemKeywords = [
  "type",
  "additionalProperties",
  "required",
  "properties",
  "oneOf",
];
const futureFileTable = [
  "| Position | Future path | Classification |",
  "| --- | --- | --- |",
  "| 1 | `schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json` | `FUTURE_CONTRACT_ONLY_SCHEMA_CANDIDATE` |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js` | `FUTURE_CONTRACT_ONLY_PROOF_TEST_CANDIDATE` |",
];
const identityTable = [
  "| Keyword | Exact future value |",
  "| --- | --- |",
  "| `$schema` | `https://json-schema.org/draft/2020-12/schema` |",
  "| `$id` | `https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json` |",
  "| `title` | `Human Review Controlled Handoff Human/Professional Approval Decision Attestation Evidence Validator Result Contract` |",
  "| `type` | `object` |",
  "| `additionalProperties` | `false` |",
];
const rootTable = [
  "| Position | Property | Type | Root constraint |",
  "| --- | --- | --- | --- |",
  "| 1 | `valid` | boolean | constrained by the exact two-state root `oneOf` |",
  "| 2 | `contractKind` | string | `const: \"HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_BOUNDARY\"` |",
  "| 3 | `version` | string | `const: \"1.0.0\"` |",
  "| 4 | `errors` | array | exact inline error items and `uniqueItems: true` |",
];
const stateTable = [
  "| Position | Result state | Exact branch constraints |",
  "| --- | --- | --- |",
  "| 1 | success | `valid const true`; `errors maxItems 0` |",
  "| 2 | failure | `valid const false`; `errors minItems 1` |",
];
const inlineItemRules = [
  '`type: "object"`',
  "`additionalProperties: false`",
  '`required: ["code", "path"]`',
  "`properties` declared in the order `code`, then `path`",
  "both properties typed as strings",
  "one item-level `oneOf` containing the exact five code-to-path branches in Section 9",
];
const branchTable = [
  "| Position | Code const | Exact path constraint | Path count |",
  "| --- | --- | --- | --- |",
  "| 1 | `required_field_missing` | ordered enum of all fifteen root-field paths from Section 8 | 15 |",
  "| 2 | `unexpected_field` | `const: \"$\"` | 1 |",
  "| 3 | `invalid_field_type` | ordered enum of `$` followed by all fifteen root-field paths from Section 8 | 16 |",
  "| 4 | `invalid_field_value` | ordered enum of all fifteen root-field paths from Section 8 | 15 |",
  "| 5 | `duplicate_reference` | ordered enum of all six duplicate-reference paths from Section 8 | 6 |",
];
const validatorOnlyRules = [
  "two-phase validation execution and canonical error emission order",
  "root preflight and prerequisite-gated missing, type, value, and duplicate cascade",
  "first-occurrence exact `{ code, path }` deduplication behavior",
  "actual pairwise duplicate-reference detection across six candidate fields",
  "descriptor-safe inspection, accessor non-execution, and prototype handling",
  "input non-mutation, no coercion, and insertion-order independence",
  "deterministic result construction and recursive result immutability",
  "no-echo behavior during validation execution",
  "internal execution-failure handling",
  "external reference equality, attestation occurrence, reviewer authorship, signature existence or validity, issuer or provenance trust, review-session validity, reviewer identity, role, authority, lifecycle truth, trusted time, currentness, reference resolution, admissibility, approval effect, handoff eligibility, export, delivery, or release",
];
const siblingTable = [
  "| Surface | Scope status |",
  "| --- | --- |",
  "| decision-attestation-evidence candidate schema | `TRACKED_UNEXPORTED_SEPARATE_CONTRACT_ONLY` |",
  "| candidate package schema-object export | `SEPARATE_LATER_CONTRACT_ONLY_SLICE` |",
  "| validator-result schema | `FUTURE_SEPARATE_CONTRACT_ONLY_SLICE` |",
  "| validator-result package schema-object export | `SEPARATE_LATER_CONTRACT_ONLY_SLICE` |",
  "| structural validator helper and proof | `SEPARATE_LATER_SLICE_NOT_AUTHORIZED` |",
  "| validator dispatch or registry | `SEPARATE_LATER_SLICE_NOT_AUTHORIZED` |",
  "| cross-reference, attestation, signature, issuer, currentness, or admissibility checkpoint | `SEPARATE_LATER_SLICE_NOT_AUTHORIZED` |",
  "| reviewer identity, role, authority, and review-session evaluation | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| approval effect, handoff, export, delivery, or release | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
];
const futureProofScope = [
  "the schema parses as JSON and has the exact Draft 2020-12 identity, title, root type, root closure, and root keyword order in Section 4",
  "root `required` and `properties` order, types, identity literals, and four fields are exact",
  "root `oneOf` has exactly the two success/failure branches in Section 6",
  "`errors` has exact `type`, `uniqueItems`, `items` order",
  "`errors.items` is the exact closed inline two-field object, has no `$defs`, and preserves the exact keyword and property order in Section 7",
  "all sixteen static paths, fifteen root-field paths, and six duplicate-reference paths are exact and no indexed path pattern exists",
  "item `oneOf` has exactly the five complete code/path branches in Section 9",
  "`uniqueItems: true` is exact",
  "structurally canonical success and representative failure objects for all five code/path branches are accepted",
  "missing or extra fields, wrong identity literals, invalid state coupling, unknown codes, unknown paths, invalid code/path pairs, extra error fields, and duplicate identical errors are rejected",
  "neither package export, validator, dispatch, checkpoint, attestation verification, signature verification, issuer verification, reviewer-authorship verification, review-session verification, identity evaluation, role evaluation, authority evaluation, approval effect, source use, execution, nor runtime behavior is created by that slice",
];
const futureProofProhibition =
  "The proof must not import a future validator helper, execute validation, inspect source or private content, or claim validator correctness, canonical runtime ordering, attestation occurrence, reviewer authorship, signature existence, signature validity, issuer trust, provenance trust, review-session validity, identity authenticity, reviewer role, reviewer authority, lifecycle truth, trusted time, currentness, reference existence, admissibility, approval effect, handoff eligibility, legal correctness, evidentiary sufficiency, professional approval, technical sign-off, release readiness, product readiness, external-use authorization, blocker closure, compliance, or case truth.";
const resolvedTable = [
  "| Position | Readiness question | Scoped answer |",
  "| --- | --- | --- |",
  "| 1 | schema identity, reserved paths, and focused proof path | exact values in Sections 3 and 4 |",
  "| 2 | root keyword/property order and success/failure coupling | exact order and two branches in Sections 4 through 6 |",
  "| 3 | inline item order, five code/path branches, and no indexed paths | exact item, branches, and ordered sets in Sections 7 through 9 |",
  "| 4 | structurally duplicate exact error items | rejected with `uniqueItems: true` in Section 10 |",
  "| 5 | candidate and validator-result package exports | both excluded as separate later sibling slices in Section 12 |",
  "| 6 | proof fixtures, proof limits, and sibling absences | exact structural-only scope and transition gate in Sections 13, 14, and 16 |",
];
const transitionConflictTable = [
  "| Surface | Current proof posture | Required transition posture |",
  "| --- | --- | --- |",
  "| historical boundary markers | schema and proof absent in each originating slice | preserve unchanged |",
  "| six reserved later-path references in scaffold scope | all six documented | preserve unchanged |",
  "| direct scaffold-scope proof candidate-path absence | asserted for two schema candidate paths | narrow in this slice |",
  "| five earlier proof candidate-path absences | asserted | retain pending separate focused alignments |",
  "| four package-export-proof and validator sibling absences | asserted | retain live absence |",
];
const candidateTransitionTable = [
  "| Position | Reserved candidate path | Transition status |",
  "| --- | --- | --- |",
  "| 1 | `schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE` |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE` |",
];
const retainedSiblingTransitionTable = [
  "| Position | Retained absent path | Retained status |",
  "| --- | --- | --- |",
  "| 1 | `tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-export.test.js` | `RETAIN_LIVE_ABSENCE_ASSERTION` |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-export.test.js` | `RETAIN_LIVE_ABSENCE_ASSERTION` |",
  "| 3 | `packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js` | `RETAIN_LIVE_ABSENCE_ASSERTION` |",
  "| 4 | `tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js` | `RETAIN_LIVE_ABSENCE_ASSERTION` |",
];
const remainingAlignmentTable = [
  "| Position | Proof path | Required bounded action |",
  "| --- | --- | --- |",
  "| 1 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-contract-boundary-doc-freeze.test.js` | preserve decision-attestation contract history and two validator sibling absences; align only the two validator-result candidate paths |",
  "| 2 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js` | preserve candidate-schema scaffold history and four sibling absences; align only the two validator-result candidate paths |",
  "| 3 | `tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js` | preserve candidate-schema structural proof and four sibling absences; align only the two validator-result candidate paths |",
  "| 4 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js` | preserve validator error/path semantics and four sibling absences; align only the two validator-result candidate paths |",
  "| 5 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js` | preserve readiness history and four sibling absences; align only the two validator-result candidate paths |",
];
const currentPrerequisiteTable = [
  "| Position | Current path | Exact action |",
  "| --- | --- | --- |",
  "| 1 | `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md` | create this docs-only prerequisite |",
  "| 2 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js` | preserve scaffold semantics while narrowing only two live candidate-path absence assertions |",
];
const directTransitionSteps = [
  "keep the exact two-path validator-result schema candidate list",
  "keep the exact four-path package-export-proof and validator sibling list",
  "continue proving that the historical scaffold document references all six paths",
  "read this prerequisite as the controlling live proof-transition source",
  "prove the exact six-file live conflict inventory",
  "prove the exact candidate status for both schema candidate paths",
  "stop checking live filesystem absence for only those two candidate paths",
  "prove the exact five-file remaining alignment inventory",
  "prove the retained status and live absence for all four sibling paths",
  "preserve every schema-representation and no-overclaim assertion unchanged",
];
const transitionNonInterferenceRules = [
  "preserve every historical contract, readiness, error-semantics, and scaffold marker",
  "preserve all six reserved later-path references in the scaffold boundary",
  "narrow only the two candidate-path live absence assertions in the direct scaffold proof",
  "retain all five additional proof-alignment gates",
  "retain all four package-export-proof and validator sibling live absences",
  "create no schema, schema proof, package export, validator, or dispatch",
  "create no checkpoint, attestation verification, signature verification, issuer or provenance verification, reviewer-authorship verification, review-session verification, identity verification, role resolution, authority resolution, lifecycle or currentness evaluation, admissibility, approval effect, persistence, audit, handoff, export, delivery, recipient, release, API, UI, or runtime behavior",
  "acquire, inspect, or process no raw, private, source, source-package, PDF, image, screenshot, metadata, case, identity-provider, credential, signature, certificate, biometric, cryptographic, provider, session, real-attestation, or real-evidence material",
  "perform no real private run",
  "create no security or vulnerability finding, severity assignment, remediation recommendation, domain finding, score, conclusion, approval, sign-off, certification, readiness, product-candidate, or external-use claim",
  "resolve only the documented direct scaffold live-proof conflict; resolve no implementation, runtime, attestation, signature, issuer, provenance, reviewer-authorship, session, identity, role, authority, lifecycle, currentness, approval-effect, product, release, external-use, security, or domain blocker",
  "preserve human and professional review as release gates",
];
const transitionProofLimitBoundary =
  "The transitioned proof may establish only the exact historical/current distinction, direct-proof transition, 2/4 path partition, and five remaining alignment gates. This slice resolves only the direct scaffold proof conflict created by its two live candidate-path absence assertions. It resolves no implementation, runtime, attestation, signature, issuer, provenance, session, identity, role, authority, lifecycle, currentness, approval, product, release, external-use, security, or domain blocker. It does not prove schema existence, schema correctness, validator correctness, attestation occurrence, reviewer authorship, signature existence or validity, issuer or provenance trust, review-session validity, identity authenticity, reviewer role, reviewer authority, lifecycle truth, trusted time, currentness, reference existence, candidate authenticity, admissibility, approval effect, handoff eligibility, legal correctness, evidentiary sufficiency, release readiness, product readiness, external-use authorization, security approval, implementation blocker closure, product blocker closure, release blocker closure, external-use blocker closure, or compliance.";
const transitionFinalNoConclusionBoundary =
  "This proof-transition prerequisite is not schema correctness, validator correctness, attestation verification, signature verification, reviewer-authorship verification, issuer-trust verification, provenance verification, review-session verification, role assignment, identity verification, authority verification, lifecycle or currentness verification, actual human review, professional review, legal review, technical review, evidentiary review, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, admissibility evidence, approval effect, ownership determination, credibility assessment, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, fingerprint proof, runtime verification, security approval, security finding, vulnerability finding, severity assignment, remediation recommendation, deployment readiness, implementation readiness, governance approval, handoff approval, metadata acquisition, raw/private/source/source-package/PDF/image/screenshot inspection, real private run, implementation/product/release blocker resolution, case-truth conclusion, or real-evidence review.";
const nonInterferenceRules = [
  "preserve the decision-attestation-evidence contract, candidate schema, candidate schema proof, error-path semantics boundary, and readiness boundary unchanged",
  "do not create or modify any JSON Schema file",
  "do not modify `packages/schemas/src/index.js`",
  "do not create a candidate or validator-result package export",
  "do not create a validator, dispatch, registry, caller, or helper",
  "do not create a cross-reference, attestation, signature, issuer, currentness, or admissibility checkpoint",
  "do not create reviewer-authorship verification, review-session verification, identity verification, role resolution, authority resolution, lifecycle evaluation, approval effect, handoff, export, delivery, recipient, release, persistence, API, route, UI, audit, provider, model, or executed-run behavior",
  "do not inspect or process raw, private, source, case, identity-provider, credential, signature, certificate, biometric, cryptographic, provider, session, or real-attestation material",
  "do not claim that schema structure enforces validator ordering, cascade, duplicate-reference detection, descriptor safety, no-echo, immutability, attestation occurrence, reviewer authorship, signature validity, issuer trust, session validity, identity, role, authority, currentness, admissibility, approval effect, or release",
  "preserve human/professional review as the release gate",
];
const finalNoConclusionBoundary =
  "This scaffold-scope boundary is not schema correctness, validator correctness, attestation verification, signature verification, reviewer-authorship verification, issuer-trust verification, provenance verification, review-session verification, role assignment, identity verification, authority verification, lifecycle or currentness verification, actual human review, professional review, legal review, technical review, evidentiary review, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, admissibility evidence, approval effect, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, case-truth conclusion, or real-evidence review.";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function executedAbsoluteExistsCalls(relativePath) {
  const marker = "__ABSOLUTE_EXISTS_TRACE__";
  const traceScript = [
    '"use strict";',
    'const strictAssert = require("node:assert/strict");',
    'const fs = require("node:fs");',
    'const path = require("node:path");',
    "const calls = [];",
    "const originalExistsSync = fs.existsSync;",
    "const originalEqual = strictAssert.equal;",
    "let lastExistsCall = null;",
    "fs.existsSync = (value) => {",
    "  const call = {",
    "    path: String(value),",
    "    stack: new Error().stack || \"\",",
    "    result: originalExistsSync(value),",
    "    assertedFalseStack: null,",
    "  };",
    "  calls.push(call);",
    "  lastExistsCall = call;",
    "  return call.result;",
    "};",
    "strictAssert.equal = (actual, expected, message) => {",
    "  if (",
    "    lastExistsCall !== null &&",
    "    actual === lastExistsCall.result &&",
    "    expected === false &&",
    "    typeof message === \"string\" &&",
    "    path.resolve(message) === lastExistsCall.path",
    "  ) {",
    "    lastExistsCall.assertedFalseStack = new Error().stack || \"\";",
    "  }",
    "  lastExistsCall = null;",
    "  return originalEqual(actual, expected, message);",
    "};",
    "process.on(\"exit\", () => {",
    "  process.stderr.write(\"\\n" + marker + "\" + JSON.stringify(calls));",
    "});",
    "require(path.resolve(process.argv[1]));",
  ].join("\n");
  const result = childProcess.spawnSync(
    process.execPath,
    ["-e", traceScript, relativePath],
    {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    },
  );

  assert.equal(
    result.status,
    0,
    relativePath + "\n" + result.stdout + "\n" + result.stderr,
  );
  const markerIndex = result.stderr.lastIndexOf(marker);
  assert.notEqual(markerIndex, -1, relativePath);
  return JSON.parse(result.stderr.slice(markerIndex + marker.length));
}

function executedReadCalls(
  targetPath,
  requiredRelativePath,
  markerOverride = null,
) {
  const traceGuard =
    "CODEX_DECISION_ATTESTATION_RESULT_SCAFFOLD_TRANSITION_TRACE_ACTIVE";
  assert.notEqual(process.env[traceGuard], "1", targetPath + ": recursive trace");
  const marker =
    markerOverride ?? "__READ_REQUIRED_TRACE_" + crypto.randomUUID() + "__";
  const resolvedTargetPath = fs.realpathSync(
    path.isAbsolute(targetPath) ? targetPath : absolute(targetPath),
  );
  const requiredPath = fs.realpathSync(absolute(requiredRelativePath));
  const traceScript = [
    '"use strict";',
    'const fs = require("node:fs");',
    'const path = require("node:path");',
    "const NativeError = Error;",
    "const calls = [];",
    "const marker = " + JSON.stringify(marker) + ";",
    "const requiredPath = path.resolve(process.argv[2]);",
    "const originalPrepareStackTrace = NativeError.prepareStackTrace;",
    "const originalReadFileSync = fs.readFileSync;",
    "const originalWriteSync = fs.writeSync;",
    "fs.readFileSync = (value, ...args) => {",
    "  const resolvedPath = path.resolve(String(value));",
    "  const result = originalReadFileSync(value, ...args);",
    "  if (resolvedPath === requiredPath) {",
    "    let frames;",
    "    try {",
    "      NativeError.prepareStackTrace = (_error, structuredFrames) =>",
    "        structuredFrames.map((frame) => {",
    "          const fileName = frame.getFileName();",
    "          return {",
    "            fileName:",
    "              typeof fileName === \"string\" &&",
    "              fileName !== \"[eval]\" &&",
    "              !fileName.startsWith(\"node:\")",
    "                ? path.resolve(fileName)",
    "                : fileName,",
    "            functionName: frame.getFunctionName(),",
    "            lineNumber: frame.getLineNumber(),",
    "            columnNumber: frame.getColumnNumber(),",
    "          };",
    "        });",
    "      frames = new NativeError().stack;",
    "    } finally {",
    "      NativeError.prepareStackTrace = originalPrepareStackTrace;",
    "    }",
    "    calls.push({",
    "      path: resolvedPath,",
    "      frames,",
    "    });",
    "  }",
    "  return result;",
    "};",
    'process.on("exit", () => {',
    '  originalWriteSync(2, "\\n" + marker + JSON.stringify(calls));',
    "});",
    "require(path.resolve(process.argv[1]));",
  ].join("\n");
  const result = childProcess.spawnSync(
    process.execPath,
    ["-e", traceScript, resolvedTargetPath, requiredPath],
    {
      cwd: repoRoot,
      encoding: "utf8",
      env: { ...process.env, [traceGuard]: "1" },
      maxBuffer: 20 * 1024 * 1024,
      timeout: 30_000,
    },
  );

  assert.equal(result.error, undefined, resolvedTargetPath);
  assert.equal(
    result.status,
    0,
    resolvedTargetPath + "\n" + result.stdout + "\n" + result.stderr,
  );
  const markerCount = result.stderr.split(marker).length - 1;
  assert.equal(markerCount, 1, resolvedTargetPath + ": trace payload count");
  const markerIndex = result.stderr.indexOf(marker);
  assert.notEqual(markerIndex, -1, resolvedTargetPath);
  return JSON.parse(result.stderr.slice(markerIndex + marker.length));
}

function hasExecutedReadRequiredPath(targetPath, requiredRelativePath) {
  const resolvedTargetPath = fs.realpathSync(
    path.isAbsolute(targetPath) ? targetPath : absolute(targetPath),
  );
  const requiredPath = fs.realpathSync(absolute(requiredRelativePath));

  return executedReadCalls(resolvedTargetPath, requiredRelativePath).some(
    (call) => {
      if (call.path !== requiredPath || !Array.isArray(call.frames)) {
        return false;
      }
      const immediateExternalFrame = call.frames.find(
        (frame) =>
          frame !== null &&
          typeof frame === "object" &&
          typeof frame.fileName === "string" &&
          frame.fileName !== "[eval]" &&
          !frame.fileName.startsWith("node:"),
      );
      return (
        immediateExternalFrame?.fileName === resolvedTargetPath &&
        immediateExternalFrame.functionName === "readRequired"
      );
    },
  );
}

function resultExportTransitionAligned(text, targetPath) {
  const aligned = hasExecutedReadRequiredPath(
    targetPath,
    validatorResultPackageExportProofTransitionPath,
  );

  if (!aligned) {
    assert.equal(
      text.includes(validatorResultPackageExportProofTransitionPath),
      false,
      targetPath + ": non-executed validator-result export transition anchor",
    );
  }
  return aligned;
}

function assertResultExportTransitionPosture(
  candidateDeclaration,
  resultExportAligned,
  label,
) {
  assert.equal(
    resultExportAligned && !candidateDeclaration,
    false,
    label + ": executed transition anchor requires candidate alignment",
  );
}

function tokenizeJavaScript(source, label) {
  const tokens = [];
  const lineStarts = [0];
  const identifierStart = /[A-Za-z_$]/u;
  const identifierPart = /[A-Za-z0-9_$]/u;
  const expressionPrefixKeywords = new Set([
    "return",
    "case",
    "throw",
    "delete",
    "void",
    "typeof",
    "new",
    "in",
    "of",
    "instanceof",
    "yield",
    "await",
    "else",
    "do",
  ]);
  const expressionEndingPunctuators = new Set([")", "]", "}", "++", "--"]);
  const multiCharacterPunctuators = [
    ">>>=",
    "===",
    "!==",
    "**=",
    "&&=",
    "||=",
    "??=",
    ">>>",
    "<<=",
    ">>=",
    "=>",
    "==",
    "!=",
    "<=",
    ">=",
    "&&",
    "||",
    "??",
    "++",
    "--",
    "**",
    "?.",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
    "&=",
    "|=",
    "^=",
    "<<",
    ">>",
  ];
  let index = 0;

  for (let sourceIndex = 0; sourceIndex < source.length; sourceIndex += 1) {
    if (source[sourceIndex] === "\n") {
      lineStarts.push(sourceIndex + 1);
    }
  }

  function lineAt(position) {
    let low = 0;
    let high = lineStarts.length;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (lineStarts[middle] <= position) {
        low = middle + 1;
      } else {
        high = middle;
      }
    }
    return low;
  }

  function previousTokenCanEndExpression(contextTokenStart) {
    if (tokens.length === contextTokenStart) {
      return false;
    }
    const previous = tokens.at(-1);
    if (previous === undefined) {
      return false;
    }
    if (
      previous.type === "string" ||
      previous.type === "number" ||
      previous.type === "regex"
    ) {
      return true;
    }
    if (previous.type === "identifier") {
      return !expressionPrefixKeywords.has(previous.value);
    }
    return expressionEndingPunctuators.has(previous.value);
  }

  function scanQuotedString(delimiter) {
    const start = index;
    let escaped = false;

    index += 1;
    while (index < source.length) {
      const current = source[index];
      if (escaped) {
        escaped = false;
      } else if (current === "\\") {
        escaped = true;
      } else if (current === delimiter) {
        index += 1;
        break;
      }
      index += 1;
    }
    assert.equal(
      source[index - 1],
      delimiter,
      label +
        ": unterminated string at line " +
        source.slice(0, start).split("\n").length,
    );
    tokens.push({
      type: "string",
      value: source.slice(start + 1, index - 1),
      raw: source.slice(start, index),
      line: lineAt(start),
    });
  }

  function scanTemplate() {
    const templateStart = index;
    let chunkStart = index + 1;

    index += 1;
    while (index < source.length) {
      const current = source[index];
      const next = source[index + 1];
      if (current === "\\") {
        index += 2;
        continue;
      }
      if (current === "`") {
        tokens.push({
          type: "string",
          value: source.slice(chunkStart, index),
          raw: source.slice(templateStart, index + 1),
          line: lineAt(chunkStart),
        });
        index += 1;
        return;
      }
      if (current === "$" && next === "{") {
        tokens.push({
          type: "string",
          value: source.slice(chunkStart, index),
          raw: "`" + source.slice(chunkStart, index) + "`",
          line: lineAt(chunkStart),
        });
        index += 2;
        scanCode(true);
        chunkStart = index;
        continue;
      }
      index += 1;
    }
    assert.fail(
      label +
        ": unterminated template at line " +
        source.slice(0, templateStart).split("\n").length,
    );
  }

  function scanRegex() {
    const start = index;
    let escaped = false;
    let characterClass = false;
    let terminated = false;

    index += 1;
    while (index < source.length) {
      const current = source[index];
      if (escaped) {
        escaped = false;
      } else if (current === "\\") {
        escaped = true;
      } else if (current === "[") {
        characterClass = true;
      } else if (current === "]") {
        characterClass = false;
      } else if (current === "/" && !characterClass) {
        index += 1;
        while (/[A-Za-z]/u.test(source[index] ?? "")) {
          index += 1;
        }
        terminated = true;
        break;
      } else if (current === "\n") {
        break;
      }
      index += 1;
    }
    assert.equal(
      terminated,
      true,
      label +
        ": unterminated regex at line " +
        source.slice(0, start).split("\n").length,
    );
    tokens.push({
      type: "regex",
      value: source.slice(start, index),
      raw: source.slice(start, index),
      line: lineAt(start),
    });
  }

  function scanCode(stopAtTemplateExpressionEnd) {
    const contextTokenStart = tokens.length;
    let templateExpressionBraceDepth = 0;

    while (index < source.length) {
      const character = source[index];
      const nextCharacter = source[index + 1];
      if (
        stopAtTemplateExpressionEnd &&
        character === "}" &&
        templateExpressionBraceDepth === 0
      ) {
        index += 1;
        return;
      }
      if (/\s/u.test(character)) {
        index += 1;
        continue;
      }
      if (character === "/" && nextCharacter === "/") {
        index += 2;
        while (index < source.length && source[index] !== "\n") {
          index += 1;
        }
        continue;
      }
      if (character === "/" && nextCharacter === "*") {
        const commentEnd = source.indexOf("*/", index + 2);
        assert.notEqual(commentEnd, -1, "unterminated block comment");
        index = commentEnd + 2;
        continue;
      }
      if (character === '"' || character === "'") {
        scanQuotedString(character);
        continue;
      }
      if (character === "`") {
        scanTemplate();
        continue;
      }
      if (
        character === "/" &&
        !previousTokenCanEndExpression(contextTokenStart)
      ) {
        scanRegex();
        continue;
      }
      if (identifierStart.test(character)) {
        const start = index;
        index += 1;
        while (
          index < source.length &&
          identifierPart.test(source[index])
        ) {
          index += 1;
        }
        tokens.push({
          type: "identifier",
          value: source.slice(start, index),
          raw: source.slice(start, index),
          line: lineAt(start),
        });
        continue;
      }
      if (/[0-9]/u.test(character)) {
        const start = index;
        index += 1;
        while (/[0-9]/u.test(source[index] ?? "")) {
          index += 1;
        }
        tokens.push({
          type: "number",
          value: source.slice(start, index),
          raw: source.slice(start, index),
          line: lineAt(start),
        });
        continue;
      }
      const punctuator = multiCharacterPunctuators.find((candidate) =>
        source.startsWith(candidate, index),
      );
      const value = punctuator ?? character;
      tokens.push({
        type: "punctuator",
        value,
        raw: value,
        line: lineAt(index),
      });
      if (stopAtTemplateExpressionEnd) {
        if (value === "{") {
          templateExpressionBraceDepth += 1;
        } else if (value === "}") {
          templateExpressionBraceDepth -= 1;
        }
      }
      index += value.length;
    }
    assert.equal(
      stopAtTemplateExpressionEnd,
      false,
      label + ": unterminated template expression",
    );
  }

  scanCode(false);
  return tokens;
}

function sequenceMatches(tokens, start, expected) {
  return expected.every(
    (value, offset) => tokens[start + offset]?.value === value,
  );
}

function sequenceIndices(tokens, expected) {
  const indices = [];
  for (let index = 0; index <= tokens.length - expected.length; index += 1) {
    if (sequenceMatches(tokens, index, expected)) {
      indices.push(index);
    }
  }
  return indices;
}

function declaredStringArray(tokens, name) {
  const starts = sequenceIndices(tokens, ["const", name, "=", "["]);
  assert.equal(starts.length, 1, name);
  const values = [];
  let index = starts[0] + 4;
  let expectValue = true;

  while (tokens[index]?.value !== "]") {
    if (expectValue) {
      assert.equal(tokens[index]?.type, "string", name);
      values.push(tokens[index].value);
      expectValue = false;
    } else {
      assert.equal(tokens[index]?.value, ",", name);
      expectValue = true;
    }
    index += 1;
  }
  assert.equal(values.length > 0, true, name);
  assert.equal(tokens[index + 1]?.value, ";", name);
  return values;
}

function hasSliceDeclaration(
  tokens,
  target,
  sourceCollection,
  sliceArguments,
) {
  const expected = [
    "const",
    target,
    "=",
    sourceCollection,
    ".",
    "slice",
    "(",
  ];
  for (const [index, argument] of sliceArguments.entries()) {
    if (index > 0) {
      expected.push(",");
    }
    expected.push(String(argument));
  }
  expected.push(")", ";");
  return sequenceIndices(tokens, expected).length === 1;
}

function hasIndexDeclaration(tokens, target, sourceCollection, index) {
  return (
    sequenceIndices(tokens, [
      "const",
      target,
      "=",
      sourceCollection,
      "[",
      String(index),
      "]",
      ";",
    ]).length === 1
  );
}

function forLoopBody(tokens, item, collection) {
  const loopStart = [
    "for",
    "(",
    "const",
    item,
    "of",
    collection,
    ")",
    "{",
  ];
  const starts = sequenceIndices(tokens, loopStart);
  assert.equal(starts.length, 1, item + " of " + collection);
  const bodyStart = starts[0] + loopStart.length;
  let depth = 1;

  for (let index = bodyStart; index < tokens.length; index += 1) {
    if (tokens[index].value === "{") {
      depth += 1;
    } else if (tokens[index].value === "}") {
      depth -= 1;
      if (depth === 0) {
        const body = tokens.slice(bodyStart, index);
        body.startLine = tokens[starts[0]].line;
        body.endLine = tokens[index].line;
        return body;
      }
    }
  }
  assert.fail("unterminated loop: " + item + " of " + collection);
}

function absoluteExistsOperands(tokens) {
  const prefix = ["fs", ".", "existsSync", "(", "absolute", "("];
  const starts = sequenceIndices(tokens, prefix);
  const operands = [];

  for (const start of starts) {
    const operand = tokens[start + prefix.length];
    assert.equal(
      operand?.type === "identifier" || operand?.type === "string",
      true,
    );
    assert.equal(
      sequenceMatches(tokens, start + prefix.length + 1, [")", ")"]),
      true,
    );
    operands.push(operand.type === "string" ? operand.raw : operand.value);
  }
  return operands;
}

function hasFalseExistsAssertion(tokens, item) {
  const assertion = [
    "assert",
    ".",
    "equal",
    "(",
    "fs",
    ".",
    "existsSync",
    "(",
    "absolute",
    "(",
    item,
    ")",
    ")",
    ",",
    "false",
    ",",
    item,
  ];
  return (
    sequenceIndices(tokens, [...assertion, ")", ";"]).length === 1 ||
    sequenceIndices(tokens, [...assertion, ",", ")", ";"]).length === 1
  );
}

function hasStringContaining(tokens, value) {
  return tokens.some(
    (token) => token.type === "string" && token.value.includes(value),
  );
}

function sectionBetween(text, start, end) {
  const startIndex = text.indexOf(start);
  const endIndex = text.indexOf(end, startIndex + start.length);

  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return text.slice(startIndex, endIndex);
}

function tableLines(section) {
  return section.split("\n").filter((line) => line.startsWith("|"));
}

function numberedListLines(section) {
  return section.split("\n").filter((line) => /^\d+\. /u.test(line));
}

function exactNumberedBacktickLines(values) {
  return values.map((value, index) => String(index + 1) + ". `" + value + "`");
}

function exactNumberedLines(values) {
  return values.map((value, index) => String(index + 1) + ". " + value);
}

function bulletListItems(section) {
  const items = [];

  for (const line of section.split("\n")) {
    if (line.startsWith("- ")) {
      items.push(line.slice(2).trim());
    } else if (items.length > 0 && line.trim() !== "") {
      items[items.length - 1] += " " + line.trim();
    }
  }
  return items;
}

function hasOwnKeyDeep(value, key) {
  if (Array.isArray(value)) {
    return value.some((item) => hasOwnKeyDeep(item, key));
  }
  if (value === null || typeof value !== "object") {
    return false;
  }
  if (Object.prototype.hasOwnProperty.call(value, key)) {
    return true;
  }
  return Object.values(value).some((item) => hasOwnKeyDeep(item, key));
}

test("result-export cross-monitor requires an executed exact target-owned anchor", () => {
  const tempDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "decision-attestation-scaffold-anchor-"),
  );
  const transitionPath = absolute(
    validatorResultPackageExportProofTransitionPath,
  );
  const forgedMarker = "__FORGED_SCAFFOLD_READ_REQUIRED_TRACE__";
  const fixtureBodies = {
    unused:
      '"use strict";\n' +
      "const unusedTransitionPath = " +
      JSON.stringify(transitionPath) +
      ";\n",
    suffixed:
      '"use strict";\n' +
      'const fs = require("node:fs");\n' +
      "function readRequired(filePath) {\n" +
      "  try { return fs.readFileSync(filePath, \"utf8\"); } catch { return \"\"; }\n" +
      "}\n" +
      "readRequired(" +
      JSON.stringify(transitionPath + "-suffix") +
      ");\n",
    direct:
      '"use strict";\n' +
      'const fs = require("node:fs");\n' +
      "fs.readFileSync(" +
      JSON.stringify(transitionPath) +
      ', "utf8");\n',
    nearName:
      '"use strict";\n' +
      'const fs = require("node:fs");\n' +
      "function readRequiredBypass(filePath) {\n" +
      '  return fs.readFileSync(filePath, "utf8");\n' +
      "}\n" +
      "readRequiredBypass(" +
      JSON.stringify(transitionPath) +
      ");\n",
    dependency:
      '"use strict";\n' +
      'const fs = require("node:fs");\n' +
      "function readRequired(filePath) {\n" +
      '  return fs.readFileSync(filePath, "utf8");\n' +
      "}\n" +
      "module.exports = { readRequired };\n",
    dependencyOwned:
      '"use strict";\n' +
      'const { readRequired } = require("./dependency.js");\n' +
      "readRequired(" +
      JSON.stringify(transitionPath) +
      ");\n",
    forged:
      '"use strict";\n' +
      'const fs = require("node:fs");\n' +
      'process.on("exit", () => {\n' +
      "  fs.writeSync(2, " +
      JSON.stringify("\n" + forgedMarker + "[]") +
      ");\n" +
      "});\n",
    singleMarker:
      '"use strict";\n' +
      'const fs = require("node:fs");\n' +
      'const path = require("node:path");\n' +
      "const originalWriteSync = fs.writeSync;\n" +
      "fs.writeSync = (fd, value, ...args) => {\n" +
      "  const text = String(value);\n" +
      "  const match = text.match(/(__READ_REQUIRED_TRACE_[0-9a-f-]+__)/u);\n" +
      "  if (fd === 2 && match !== null) {\n" +
      "    const calls = [{ path: path.resolve(process.argv[2]), frames: [{\n" +
      "      fileName: __filename,\n" +
      '      functionName: "readRequired",\n' +
      "      lineNumber: 1,\n" +
      "      columnNumber: 1,\n" +
      "    }] }];\n" +
      "    return originalWriteSync(\n" +
      '      fd, "\\n" + match[1] + JSON.stringify(calls), ...args,\n' +
      "    );\n" +
      "  }\n" +
      "  return originalWriteSync(fd, value, ...args);\n" +
      "};\n",
    forgedStack:
      '"use strict";\n' +
      'const fs = require("node:fs");\n' +
      "Error.prepareStackTrace = () =>\n" +
      '  "Error\\n    at readRequired (" + __filename + ":1:1)";\n' +
      "fs.readFileSync(" +
      JSON.stringify(transitionPath) +
      ', "utf8");\n',
    wrapperDependency:
      '"use strict";\n' +
      'const fs = require("node:fs");\n' +
      "function dependencyRead(filePath) {\n" +
      '  return fs.readFileSync(filePath, "utf8");\n' +
      "}\n" +
      "module.exports = { dependencyRead };\n",
    wrapperTarget:
      '"use strict";\n' +
      'const { dependencyRead } = require("./wrapperDependency.js");\n' +
      "function readRequired(filePath) {\n" +
      "  return dependencyRead(filePath);\n" +
      "}\n" +
      "readRequired(" +
      JSON.stringify(transitionPath) +
      ");\n",
    pendingAnchor:
      '"use strict";\n' +
      'const assert = require("node:assert/strict");\n' +
      'const fs = require("node:fs");\n' +
      "const laterSiblingPaths = " +
      JSON.stringify(allLaterPaths, null, 2) +
      ";\n" +
      "function absolute(relativePath) { return relativePath; }\n" +
      "function readRequired(filePath) {\n" +
      '  return fs.readFileSync(filePath, "utf8");\n' +
      "}\n" +
      "function retainedPendingProof() {\n" +
      "  for (const siblingPath of laterSiblingPaths) {\n" +
      "    assert.equal(fs.existsSync(absolute(siblingPath)), false, siblingPath);\n" +
      "  }\n" +
      "}\n" +
      "readRequired(" +
      JSON.stringify(transitionPath) +
      ");\n",
    pending: '"use strict";\nconst pendingMarker = true;\n',
    exact:
      '"use strict";\n' +
      'const fs = require("node:fs");\n' +
      "function readRequired(filePath) {\n" +
      '  return fs.readFileSync(filePath, "utf8");\n' +
      "}\n" +
      "readRequired(" +
      JSON.stringify(transitionPath) +
      ");\n",
  };

  try {
    const fixturePaths = Object.fromEntries(
      Object.entries(fixtureBodies).map(([name, body]) => {
        const fixturePath = path.join(tempDirectory, name + ".js");
        fs.writeFileSync(fixturePath, body, "utf8");
        return [name, fixturePath];
      }),
    );

    for (const name of [
      "unused",
      "suffixed",
      "direct",
      "nearName",
      "dependencyOwned",
      "forgedStack",
      "wrapperTarget",
    ]) {
      assert.throws(
        () =>
          resultExportTransitionAligned(
            fixtureBodies[name],
            fixturePaths[name],
          ),
        /non-executed validator-result export transition anchor/u,
        name,
      );
    }
    assert.equal(
      resultExportTransitionAligned(
        fixtureBodies.singleMarker,
        fixturePaths.singleMarker,
      ),
      false,
    );
    assert.throws(
      () =>
        executedReadCalls(
          fixturePaths.forged,
          validatorResultPackageExportProofTransitionPath,
          forgedMarker,
        ),
      /trace payload count/u,
    );
    assert.equal(
      resultExportTransitionAligned(
        fixtureBodies.pending,
        fixturePaths.pending,
      ),
      false,
    );
    const pendingAnchorTokens = tokenizeJavaScript(
      fixtureBodies.pendingAnchor,
      fixturePaths.pendingAnchor,
    );
    const pendingAnchorCandidateDeclaration = hasSliceDeclaration(
      pendingAnchorTokens,
      "validatorResultCandidatePaths",
      "laterSiblingPaths",
      [0, 2],
    );
    const pendingAnchorAligned = resultExportTransitionAligned(
      fixtureBodies.pendingAnchor,
      fixturePaths.pendingAnchor,
    );
    assert.equal(pendingAnchorCandidateDeclaration, false);
    assert.equal(pendingAnchorAligned, true);
    assert.throws(
      () =>
        assertResultExportTransitionPosture(
          pendingAnchorCandidateDeclaration,
          pendingAnchorAligned,
          fixturePaths.pendingAnchor,
        ),
      /executed transition anchor requires candidate alignment/u,
    );
    assert.equal(
      resultExportTransitionAligned(fixtureBodies.exact, fixturePaths.exact),
      true,
    );
  } finally {
    fs.rmSync(tempDirectory, { recursive: true, force: true });
  }
});

test("scaffold scope and every canonical source exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [...controllingPaths, ...conventionPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_SCHEMA_SCAFFOLD_SCOPE",
    "VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
    "OWNER_SELECTED_OPTION_A_APPLIED",
    "OWNER_SELECTED_STAGES_1_TO_6_OPTION_A_APPLIED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("future two-file scope identity and root keyword order are exact", () => {
  const docsText = readRequired(docsPath);
  const fileSection = sectionBetween(docsText, "## 3. Exact Future File Scope", "## 4.");
  const identitySection = sectionBetween(
    docsText,
    "## 4. Exact Future Schema Identity And Root Keyword Order",
    "## 5.",
  );
  const keywordSection = sectionBetween(
    identitySection,
    "The future schema root must preserve this exact keyword order:",
    "FUTURE_VALIDATOR_RESULT_ROOT_KEYWORD_COUNT:",
  );

  assert.deepEqual(tableLines(fileSection), futureFileTable);
  assert.deepEqual(
    numberedListLines(keywordSection),
    exactNumberedBacktickLines(rootKeywords),
  );
  assert.deepEqual(tableLines(identitySection), identityTable);
  assert.match(fileSection, /FUTURE_VALIDATOR_RESULT_SCHEMA_SLICE_FILE_COUNT:\n2/u);
  assert.match(identitySection, /FUTURE_VALIDATOR_RESULT_ROOT_KEYWORD_COUNT:\n8/u);
});

test("candidate schema remains exact and separate with historical export posture preserved", () => {
  const docsText = readRequired(docsPath);
  const candidateSchema = require("../" + candidateSchemaPath);
  const proofText = readRequired(proofPath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );

  assert.deepEqual(candidateSchema.required, candidateFields);
  assert.deepEqual(Object.keys(candidateSchema.properties), candidateFields);
  for (const forbiddenKey of forbiddenValidatorResultKeys) {
    assert.equal(hasOwnKeyDeep(candidateSchema, forbiddenKey), false, forbiddenKey);
  }
  assert.equal(
    packageExportTransitionText.includes(
      "`humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence`",
    ),
    true,
  );
  assert.match(
    packageExportTransitionText,
    /HISTORICAL_CANDIDATE_SCHEMA_UNEXPORTED_MARKERS_PRESERVED/u,
  );
  assert.equal(
    proofText.includes(
      "packageIndex" + "Text.includes(path.basename(candidateSchemaPath))",
    ),
    false,
  );
  assert.match(
    docsText,
    /CANDIDATE_PACKAGE_SCHEMA_EXPORT_INCLUDED_IN_FUTURE_SCHEMA_SLICE:\nFALSE/u,
  );
  assert.match(
    docsText,
    /VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_INCLUDED_IN_FUTURE_SCHEMA_SLICE:\nFALSE/u,
  );
});

test("closed root states and inline error item are exact", () => {
  const docsText = readRequired(docsPath);
  const rootSection = sectionBetween(docsText, "## 5. Exact Future Root Shape", "## 6.");
  const stateSection = sectionBetween(
    docsText,
    "## 6. Exact Two-State Root Encoding",
    "## 7.",
  );
  const itemSection = sectionBetween(
    docsText,
    "## 7. Exact Errors Array And Inline Error-Item Shape",
    "## 8.",
  );
  const errorsKeywordSection = sectionBetween(
    itemSection,
    "The future `errors` property must preserve this exact keyword order:",
    "FUTURE_VALIDATION_ERRORS_KEYWORD_COUNT:",
  );
  const itemKeywordSection = sectionBetween(
    itemSection,
    "`errors.items` must be one inline exact object schema with this keyword order:",
    "FUTURE_VALIDATION_ERROR_ITEM_KEYWORD_COUNT:",
  );
  const inlineRulesSection = sectionBetween(
    itemSection,
    "The inline item must use:",
    "FUTURE_VALIDATION_ERROR_ITEM_REQUIRED_PROPERTY_COUNT:",
  );

  assert.deepEqual(tableLines(rootSection), rootTable);
  assert.deepEqual(tableLines(stateSection), stateTable);
  assert.deepEqual(
    numberedListLines(errorsKeywordSection),
    exactNumberedBacktickLines(errorsKeywords),
  );
  assert.deepEqual(
    numberedListLines(itemKeywordSection),
    exactNumberedBacktickLines(errorItemKeywords),
  );
  assert.deepEqual(bulletListItems(inlineRulesSection), inlineItemRules);
  assert.match(rootSection, /FUTURE_VALIDATOR_RESULT_REQUIRED_PROPERTY_COUNT:\n4/u);
  assert.match(rootSection, /FUTURE_VALIDATOR_RESULT_ADDITIONAL_PROPERTIES:\nFALSE/u);
  assert.match(stateSection, /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_COUNT:\n2/u);
  assert.match(itemSection, /FUTURE_VALIDATION_ERRORS_KEYWORD_COUNT:\n3/u);
  assert.match(itemSection, /FUTURE_VALIDATION_ERROR_ITEM_KEYWORD_COUNT:\n5/u);
  assert.match(itemSection, /FUTURE_VALIDATION_ERROR_ITEM_DEFS_COUNT:\n0/u);
});

test("static paths and five code-to-path branches are exact", () => {
  const docsText = readRequired(docsPath);
  const pathSection = sectionBetween(
    docsText,
    "## 8. Exact Ordered Static Path Sets",
    "## 9.",
  );
  const rootPathSection = sectionBetween(
    pathSection,
    "The exact root-field paths, in contract order, are:",
    "The exact duplicate-reference paths, in participant declaration order, are:",
  );
  const duplicatePathSection = sectionBetween(
    pathSection,
    "The exact duplicate-reference paths, in participant declaration order, are:",
    "FUTURE_VALIDATION_ERROR_ROOT_PATH_COUNT:",
  );
  const branchSection = sectionBetween(
    docsText,
    "## 9. Exact Five Code-To-Path Branches",
    "## 10.",
  );

  assert.deepEqual(
    numberedListLines(rootPathSection),
    exactNumberedBacktickLines(rootFieldPaths),
  );
  assert.deepEqual(
    numberedListLines(duplicatePathSection),
    exactNumberedBacktickLines(duplicateReferencePaths),
  );
  assert.deepEqual(tableLines(branchSection), branchTable);
  for (const marker of [
    "FUTURE_VALIDATION_ERROR_ROOT_PATH_COUNT:\n1",
    "FUTURE_VALIDATION_ERROR_ROOT_FIELD_PATH_COUNT:\n15",
    "FUTURE_VALIDATION_ERROR_DUPLICATE_REFERENCE_PATH_COUNT:\n6",
    "FUTURE_VALIDATION_ERROR_STATIC_PATH_COUNT:\n16",
    "FUTURE_VALIDATION_ERROR_INDEXED_PATH_PATTERN_COUNT:\n0",
    "FUTURE_VALIDATION_ERROR_PATH_TEMPLATE_COUNT:\n16",
    "FUTURE_VALIDATION_ERROR_CODE_PATH_BRANCH_COUNT:\n5",
    "REQUIRED_FIELD_MISSING_PATH_ENUM_COUNT:\n15",
    "UNEXPECTED_FIELD_PATH_CONST_COUNT:\n1",
    "INVALID_FIELD_TYPE_PATH_ENUM_COUNT:\n16",
    "INVALID_FIELD_VALUE_PATH_ENUM_COUNT:\n15",
    "DUPLICATE_REFERENCE_PATH_ENUM_COUNT:\n6",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(pathSection, /No\nregex, indexed path template/u);
  assert.match(branchSection, /would admit invalid code\/path cross-pairs/u);
});

test("structural uniqueness stays separate from attestation and approval behavior", () => {
  const docsText = readRequired(docsPath);
  const duplicateSection = sectionBetween(
    docsText,
    "## 10. Exact Structural Duplicate Boundary",
    "## 11.",
  );
  const validatorSection = sectionBetween(
    docsText,
    "## 11. Validator-Only And Attestation/Approval-Only Rules Kept Outside Schema",
    "## 12.",
  );
  const validatorRulesSection = sectionBetween(
    validatorSection,
    "The future schema must not claim to enforce:",
    "SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:",
  );

  assert.match(
    duplicateSection,
    /FUTURE_VALIDATION_ERROR_ARRAY_UNIQUE_ITEMS:\nTRUE/u,
  );
  assert.deepEqual(bulletListItems(validatorRulesSection), validatorOnlyRules);
  assert.match(validatorSection, /SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:\nTRUE/u);
  assert.match(
    validatorSection,
    /SCHEMA_DOES_NOT_CREATE_ATTESTATION_OR_SIGNATURE_PROOF:\nTRUE/u,
  );
  assert.match(
    validatorSection,
    /SCHEMA_DOES_NOT_CREATE_IDENTITY_ROLE_AUTHORITY_OR_SESSION_PROOF:\nTRUE/u,
  );
  assert.match(validatorSection, /SCHEMA_DOES_NOT_CREATE_APPROVAL_EFFECT:\nTRUE/u);
});

test("proof scope transition gate siblings and six resolutions remain exact", () => {
  const docsText = readRequired(docsPath);
  const readinessText = readRequired(readinessPath);
  const siblingSection = sectionBetween(
    docsText,
    "## 12. Separate Sibling Surfaces And Export Boundary",
    "## 13.",
  );
  const proofSection = sectionBetween(
    docsText,
    "## 13. Exact Future Structural Proof Scope",
    "## 14.",
  );
  const proofAllowedSection = sectionBetween(
    proofSection,
    "The future focused schema proof may establish only:",
    "The proof must not import a future validator helper",
  );
  const proofProhibitionSection = sectionBetween(
    docsText,
    "The proof must not import a future validator helper",
    "## 14. Required Proof-Transition Prerequisite",
  );
  const transitionSection = sectionBetween(
    docsText,
    "## 14. Required Proof-Transition Prerequisite",
    "## 15.",
  );
  const resolvedSection = sectionBetween(
    docsText,
    "## 15. Resolved Readiness Questions",
    "## 16.",
  );

  assert.deepEqual(tableLines(siblingSection), siblingTable);
  assert.deepEqual(bulletListItems(proofAllowedSection), futureProofScope);
  assert.equal(
    proofProhibitionSection.replace(/\s+/gu, " ").trim(),
    futureProofProhibition,
  );
  assert.deepEqual(tableLines(resolvedSection), resolvedTable);
  assert.match(
    transitionSection,
    /VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_REQUIRED:\nTRUE/u,
  );
  assert.match(
    transitionSection,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT_REQUIRED:\n2/u,
  );
  assert.match(
    transitionSection,
    /RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT_REQUIRED:\n4/u,
  );
  assert.match(
    resolvedSection,
    /RESOLVED_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  assert.match(
    readinessText,
    /OPEN_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
});

test("proof transition prerequisite freezes the six-file conflict and exact 2/4 partition", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const scaffoldProofText = readRequired(proofPath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const inventorySection = sectionBetween(
    transitionText,
    "The exact six live proof surfaces identified by repository inspection are:",
    "VALIDATOR_RESULT_SCHEMA_LIVE_PROOF_CONFLICT_COUNT:",
  );
  const conflictSection = sectionBetween(
    transitionText,
    "## 3. Exact Conflict Classification",
    "## 4.",
  );
  const candidateSection = sectionBetween(
    transitionText,
    "## 4. Two Candidate Paths Narrowed In The Direct Scaffold Proof",
    "## 5.",
  );
  const retainedSection = sectionBetween(
    transitionText,
    "## 5. Four Retained Live Absence Requirements",
    "## 6.",
  );
  const remainingSection = sectionBetween(
    transitionText,
    "## 6. Five Remaining Focused Proof Alignments",
    "## 7.",
  );
  const currentScopeSection = sectionBetween(
    transitionText,
    "## 7. Exact Current Two-File Scope",
    "## 8.",
  );
  const directSection = sectionBetween(
    transitionText,
    "## 8. Exact Direct-Proof Transition",
    "## 9.",
  );
  const directStepsSection = sectionBetween(
    directSection,
    "The existing validator-result scaffold-scope proof must:",
    "DIRECT_SCAFFOLD_PROOF_TRANSITION_STEP_COUNT:",
  );
  const nonInterferenceSection = sectionBetween(
    transitionText,
    "## 10. Non-Interference And Proof Boundary",
    "The transitioned proof may establish only",
  );
  const proofLimitSection = sectionBetween(
    transitionText,
    "The transitioned proof may establish only",
    "## 11. Final No-Conclusion Boundary",
  );
  const finalBoundarySection = sectionBetween(
    transitionText,
    "This proof-transition prerequisite is not schema correctness",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:",
  );
  const lexicalTrapTokens = tokenizeJavaScript(
    [
      'const stringDecoy = "for (const candidatePath of candidatePaths) { fs.existsSync(absolute(candidatePath)); }";',
      "const templateDecoy = `assert.equal(fs.existsSync(absolute(decoyRetainedPath)), false, decoyRetainedPath);`;",
      "const interpolation = `${fs.existsSync(absolute(candidatePath))}`;",
      "const regexDecoy = true && /assert\\.equal\\(fs\\.existsSync\\(absolute\\(decoyRetainedPath\\)\\),false,decoyRetainedPath\\);x/u;",
      "// assert.equal(fs.existsSync(absolute(decoyRetainedPath)), false, decoyRetainedPath);",
      "/* for (const candidatePath of candidatePaths) {} */",
    ].join("\n"),
    "lexical trap proof",
  );

  assert.deepEqual(absoluteExistsOperands(lexicalTrapTokens), [
    "candidatePath",
  ]);
  assert.equal(
    hasFalseExistsAssertion(lexicalTrapTokens, "decoyRetainedPath"),
    false,
  );
  assert.equal(
    sequenceIndices(lexicalTrapTokens, [
      "for",
      "(",
      "const",
      "candidatePath",
      "of",
      "candidatePaths",
      ")",
      "{",
    ]).length,
    0,
  );
  assert.deepEqual(
    numberedListLines(inventorySection),
    exactNumberedBacktickLines(proofConflictPaths),
  );
  for (const conflictPath of proofConflictPaths) {
    readRequired(conflictPath);
  }
  assert.deepEqual(
    remainingProofAlignmentBindings.map((binding) => binding.path),
    remainingProofAlignmentPaths,
  );
  for (const binding of remainingProofAlignmentBindings) {
    const source = readRequired(binding.path);
    const sourceTokens = tokenizeJavaScript(source, binding.path);
    const candidateDeclaration = hasSliceDeclaration(
      sourceTokens,
      "validatorResultCandidatePaths",
      binding.sourceCollection,
      [0, 2],
    );
    const resultExportAligned =
      binding.resultAlignedRetainedCollection !== undefined &&
      resultExportTransitionAligned(source, binding.path);
    assertResultExportTransitionPosture(
      candidateDeclaration,
      resultExportAligned,
      binding.path,
    );
    const retainedCollection = resultExportAligned
      ? binding.resultAlignedRetainedCollection
      : binding.retainedCollection;
    const retainedSourceCollection = resultExportAligned
      ? binding.resultAlignedRetainedSourceCollection
      : (binding.retainedSourceCollection ?? binding.sourceCollection);
    const retainedSliceArguments = resultExportAligned
      ? binding.resultAlignedRetainedSliceArguments
      : (binding.retainedSliceArguments ?? [2]);
    const retainedPaths = resultExportAligned
      ? binding.resultAlignedRetainedPaths
      : binding.retainedPaths;

    assert.deepEqual(
      declaredStringArray(sourceTokens, binding.sourceCollection),
      binding.sourcePaths,
      binding.path,
    );
    if (candidateDeclaration) {
      if (binding.historicalRetainedCollection) {
        assert.equal(
          hasSliceDeclaration(
            sourceTokens,
            binding.historicalRetainedCollection,
            binding.sourceCollection,
            [2],
          ),
          true,
          binding.path,
        );
      }
      assert.equal(
        hasSliceDeclaration(
          sourceTokens,
          retainedCollection,
          retainedSourceCollection,
          retainedSliceArguments,
        ),
        true,
        binding.path,
      );
      if (resultExportAligned) {
        assert.equal(
          hasIndexDeclaration(
            sourceTokens,
            "validatorResultPackageExportProofPath",
            binding.sourceCollection,
            3,
          ),
          true,
          binding.path,
        );
        assert.equal(
          validatorResultPackageExportTransitionText.includes(
            "`" + binding.path + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
          ),
          true,
          binding.path,
        );
        assert.equal(
          hasFalseExistsAssertion(
            sourceTokens,
            "validatorResultPackageExportProofPath",
          ),
          false,
          binding.path,
        );
      }
      const candidateLoop = forLoopBody(
        sourceTokens,
        "validatorResultCandidatePath",
        "validatorResultCandidatePaths",
      );
      const retainedLoop = forLoopBody(
        sourceTokens,
        binding.retainedItem,
        retainedCollection,
      );

      assert.equal(
        sequenceIndices(candidateLoop, ["fs", ".", "existsSync"]).length,
        0,
        binding.path,
      );
      assert.equal(
        hasStringContaining(
          candidateLoop,
          "`PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
        ),
        true,
        binding.path,
      );
      assert.equal(
        hasStringContaining(retainedLoop, "`RETAIN_LIVE_ABSENCE_ASSERTION`"),
        true,
        binding.path,
      );
      assert.equal(
        hasStringContaining(sourceTokens, proofTransitionPath),
        true,
        binding.path,
      );
      assert.equal(
        hasFalseExistsAssertion(retainedLoop, binding.retainedItem),
        false,
        binding.path,
      );
      assert.equal(
        hasStringContaining(retainedLoop, validatorHelperProofTransitionStatus),
        true,
        binding.path,
      );
      assert.deepEqual(
        absoluteExistsOperands(sourceTokens),
        binding.alignedExistsOperands,
        binding.path,
      );
      const directExecutedExistsCalls = executedAbsoluteExistsCalls(
        binding.path,
      ).filter((call) => !call.stack.includes("at readRequired"));
      for (const candidatePath of futureSchemaPaths) {
        assert.equal(
          directExecutedExistsCalls.some(
            (call) => call.path === absolute(candidatePath),
          ),
          false,
          binding.path + ": " + candidatePath,
        );
      }
      if (resultExportAligned) {
        assert.equal(
          directExecutedExistsCalls.some(
            (call) =>
              call.path === absolute(validatorResultPackageExportProofPath),
          ),
          false,
          binding.path + ": " + validatorResultPackageExportProofPath,
        );
      }
      for (const retainedPath of retainedPaths) {
        assert.equal(
          readRequired(validatorHelperProofTransitionPath).includes(
            "`" +
              retainedPath +
              "` | `" +
              validatorHelperProofTransitionStatus +
              "`",
          ),
          true,
          retainedPath,
        );
        assert.equal(
          directExecutedExistsCalls.some(
            (call) => call.path === absolute(retainedPath),
          ),
          false,
          binding.path + ": " + retainedPath,
        );
      }
    } else {
      const pendingLoop = forLoopBody(
        sourceTokens,
        binding.pendingItem,
        binding.sourceCollection,
      );
      assert.equal(
        hasFalseExistsAssertion(pendingLoop, binding.pendingItem),
        true,
        binding.path,
      );
    }
  }
  assert.deepEqual(tableLines(conflictSection), transitionConflictTable);
  assert.deepEqual(tableLines(candidateSection), candidateTransitionTable);
  assert.deepEqual(
    tableLines(retainedSection),
    retainedSiblingTransitionTable,
  );
  assert.deepEqual(tableLines(remainingSection), remainingAlignmentTable);
  assert.deepEqual(tableLines(currentScopeSection), currentPrerequisiteTable);
  assert.deepEqual(
    numberedListLines(directStepsSection),
    exactNumberedLines(directTransitionSteps),
  );
  assert.deepEqual(
    bulletListItems(nonInterferenceSection),
    transitionNonInterferenceRules,
  );
  assert.equal(
    proofLimitSection.replace(/\s+/gu, " ").trim(),
    transitionProofLimitBoundary,
  );
  assert.equal(
    finalBoundarySection.replace(/\s+/gu, " ").trim(),
    transitionFinalNoConclusionBoundary,
  );

  for (const candidatePath of futureSchemaPaths) {
    assert.equal(docsText.includes("`" + candidatePath + "`"), true, candidatePath);
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
  assert.equal(
    scaffoldProofText.includes(
      "for (const futurePath of " + "futureSchemaPaths)",
    ),
    false,
  );
  assert.equal(
    scaffoldProofText.includes("for (const laterPath of " + "allLaterPaths)"),
    false,
  );
  assert.equal(
    scaffoldProofText.includes("fs." + "existsSync(absolute(futurePath))"),
    false,
  );
  assert.equal(
    scaffoldProofText.includes("fs." + "existsSync(absolute(laterPath))"),
    false,
  );
  assert.equal(
    scaffoldProofText.includes(
      "for (const retainedPath of " + "retainedSiblingPaths)",
    ),
    false,
  );
  assert.equal(
    scaffoldProofText.includes(
      "for (const retainedPath of " + "retainedValidatorPaths)",
    ),
    true,
  );
  for (const historicalRetainedPath of retainedSiblingPaths) {
    assert.equal(
      transitionText.includes(
        "`" + historicalRetainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      historicalRetainedPath,
    );
  }
  for (const retainedPath of retainedValidatorPaths) {
    assert.equal(docsText.includes("`" + retainedPath + "`"), true, retainedPath);
    assert.equal(
      transitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" +
          retainedPath +
          "` | `" +
          validatorHelperProofTransitionStatus +
          "`",
      ),
      true,
      retainedPath,
    );
  }
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
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n7/u,
  );
  assert.match(
    packageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n6/u,
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
  assert.equal(
    scaffoldProofText.includes(
      "packageIndex" +
        "Text.includes(path.basename(futureSchemaPaths[0]))",
    ),
    false,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  for (const remainingPath of remainingProofAlignmentPaths) {
    assert.equal(transitionText.includes("`" + remainingPath + "`"), true);
  }
  for (const currentPath of prerequisiteCurrentPaths) {
    readRequired(currentPath);
  }
  for (const marker of [
    "DOCS_ONLY",
    "HISTORICAL_SCHEMA_ABSENCE_MARKERS_PRESERVED",
    "VALIDATOR_RESULT_SCHEMA_LIVE_PROOF_CONFLICT_COUNT:\n6",
    "HISTORICAL_DOCS_CORRECT_SIX_CANDIDATE_LIVE_ASSERTIONS_PARTIALLY_SUPERSEDED",
    "VALIDATOR_RESULT_SCHEMA_CANDIDATE_PATH_TRANSITION_COUNT:\n2",
    "RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT:\n4",
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n5",
    "CURRENT_PREREQUISITE_FILE_COUNT:\n2",
    "DIRECT_SCAFFOLD_PROOF_TRANSITION_STEP_COUNT:\n10",
    "SCHEMA_FILE_NOT_CREATED_BY_THIS_SLICE",
    "SCHEMA_PROOF_NOT_CREATED_BY_THIS_SLICE",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "ATTESTATION_SIGNATURE_OR_ISSUER_VERIFICATION_NOT_CREATED",
    "IDENTITY_ROLE_AUTHORITY_OR_SESSION_VERIFICATION_NOT_CREATED",
    "TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_METADATA_ACQUISITION_OR_MEDIA_INSPECTION_CREATED",
    "NO_REAL_PRIVATE_RUN_CREATED",
    "NO_SECURITY_VULNERABILITY_FINDING_SEVERITY_OR_REMEDIATION_CREATED",
    "DIRECT_SCAFFOLD_PROOF_CONFLICT_ONLY_RESOLVED",
    "NO_IMPLEMENTATION_PRODUCT_RELEASE_BLOCKER_RESOLUTION_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED",
  ]) {
    assert.equal(transitionText.includes(marker), true, marker);
  }
});

test("historical two-file scope preserves all path references and no-conclusion boundary", () => {
  const docsText = readRequired(docsPath);
  const scopeSection = sectionBetween(
    docsText,
    "## 16. Exact Current Docs-Only Scope And Retained Absences",
    "## 17.",
  );
  const currentPathSection = sectionBetween(
    scopeSection,
    "This current slice adds exactly:",
    "CURRENT_SCHEMA_SCAFFOLD_SCOPE_FILE_COUNT:",
  );
  const laterPathSection = sectionBetween(
    scopeSection,
    "The following six later paths remain absent in this slice:",
    "RETAINED_LATER_PATH_LIVE_ABSENCE_COUNT:",
  );
  const nonInterferenceSection = sectionBetween(
    docsText,
    "## 17. Non-Interference Rules",
    "## 18.",
  );
  const finalBoundarySection = sectionBetween(
    docsText,
    "This scaffold-scope boundary is not schema correctness",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_STATUS:",
  );

  assert.deepEqual(
    numberedListLines(currentPathSection),
    exactNumberedBacktickLines(currentPaths),
  );
  assert.deepEqual(
    numberedListLines(laterPathSection),
    exactNumberedBacktickLines(allLaterPaths),
  );
  for (const retainedPath of retainedValidatorPaths) {
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" +
          retainedPath +
          "` | `" +
          validatorHelperProofTransitionStatus +
          "`",
      ),
      true,
      retainedPath,
    );
  }
  assert.match(scopeSection, /CURRENT_SCHEMA_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  assert.match(scopeSection, /RETAINED_LATER_PATH_LIVE_ABSENCE_COUNT:\n6/u);
  assert.deepEqual(bulletListItems(nonInterferenceSection), nonInterferenceRules);
  assert.equal(
    finalBoundarySection.replace(/\s+/gu, " ").trim(),
    finalNoConclusionBoundary,
  );
  for (const marker of [
    "VALIDATOR_RESULT_SCHEMA_FILE_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_PROOF_NOT_CREATED",
    "CANDIDATE_SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "ATTESTATION_SIGNATURE_OR_ISSUER_VERIFICATION_NOT_CREATED",
    "IDENTITY_ROLE_AUTHORITY_OR_SESSION_VERIFICATION_NOT_CREATED",
    "TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.doesNotMatch(docsText, /\/Users\//u);
});
