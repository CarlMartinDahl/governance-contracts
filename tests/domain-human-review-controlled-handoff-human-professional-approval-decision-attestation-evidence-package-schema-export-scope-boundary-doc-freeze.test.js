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
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-schema-export-scope-boundary-doc-freeze.test.js";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json";
const candidateSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js";
const validatorResultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json";
const validatorResultSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const futureExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-export.test.js";
const validatorResultExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-export.test.js";
const retainedValidatorPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
];
const controllingPaths = [
  candidateSchemaPath,
  candidateSchemaProofPath,
  validatorResultSchemaPath,
  validatorResultSchemaProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  packageIndexPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
];
const rootFields = [
  "contract_id",
  "contract_version",
  "decision_attestation_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "reviewer_role",
  "decision",
  "attested_at",
  "attestation_posture",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "attestation_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const namespaceReferencePatterns = Object.freeze({
  decision_attestation_ref: "^att_[a-z0-9][a-z0-9_-]{0,59}$",
  approval_ref: "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
  review_session_ref: "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
  reviewer_ref: "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
});
const genericReferenceFields = [
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const genericReferencePattern = "^[A-Za-z0-9._:-]{1,128}$";
const genericReferenceExclusions = [
  { enum: [".", ".."] },
  { pattern: "^[Hh][Tt][Tt][Pp]:" },
  { pattern: "^[Hh][Tt][Tt][Pp][Ss]:" },
  { pattern: "^[Ff][Tt][Pp]:" },
  { pattern: "^[Ff][Ii][Ll][Ee]:" },
  { pattern: "^[Mm][Aa][Ii][Ll][Tt][Oo]:" },
  { pattern: "^[Dd][Aa][Tt][Aa]:" },
  { pattern: "^[Jj][Aa][Vv][Aa][Ss][Cc][Rr][Ii][Pp][Tt]:" },
];
const reviewerRoles = ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"];
const decisions = [
  "HUMAN_PROFESSIONAL_GATE_APPROVED",
  "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
  "HUMAN_PROFESSIONAL_GATE_REJECTED",
];
const timestampPattern =
  "^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\\.[0-9]{3}Z$";
const lifecyclePostures = [
  "DECISION_ATTESTATION_DECLARED_ACTIVE",
  "DECISION_ATTESTATION_DECLARED_INACTIVE",
  "DECISION_ATTESTATION_DECLARED_REVOKED",
];
const candidateExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence";
const validatorResultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidatorResult";
const validatorHelperExportName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence";
const prohibitedSiblingNames = [
  validatorResultExportName,
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidator",
  validatorHelperExportName,
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidatorRegistry",
];
const retainedValidatorNames = prohibitedSiblingNames.filter(
  (name) =>
    name !== validatorResultExportName && name !== validatorHelperExportName,
);
const schemaIdentityTable = [
  "| Keyword | Exact value |",
  "| --- | --- |",
  "| `$schema` | `https://json-schema.org/draft/2020-12/schema` |",
  "| `$id` | `https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json` |",
  "| `title` | `Human Review Controlled Handoff Human/Professional Approval Decision Attestation Evidence Contract Scaffold` |",
];
const boundedFieldTable = [
  "| Field family | Exact fields or values |",
  "| --- | --- |",
  "| namespace references | `decision_attestation_ref`, `approval_ref`, `review_session_ref`, `reviewer_ref` |",
  "| namespace patterns | `^att_[a-z0-9][a-z0-9_-]{0,59}$`, `^apr_[a-z0-9][a-z0-9_-]{0,59}$`, `^rvs_[a-z0-9][a-z0-9_-]{0,59}$`, `^rvr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| generic opaque references | `binding_issuer_ref`, `binding_provenance_ref` |",
  "| generic opaque-reference pattern | `^[A-Za-z0-9._:-]{1,128}$` |",
  "| reviewer roles | `HUMAN_REVIEWER`, `PROFESSIONAL_REVIEWER` |",
  "| decisions | `HUMAN_PROFESSIONAL_GATE_APPROVED`, `HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED`, `HUMAN_PROFESSIONAL_GATE_REJECTED` |",
  "| attested-at timestamp pattern | `^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\\\\.[0-9]{3}Z$` |",
  "| attestation posture | `DECISION_ATTESTATION_CANDIDATE_ONLY` |",
  "| attestation lifecycle postures | `DECISION_ATTESTATION_DECLARED_ACTIVE`, `DECISION_ATTESTATION_DECLARED_INACTIVE`, `DECISION_ATTESTATION_DECLARED_REVOKED` |",
  "| verification posture | `NOT_VERIFIED_BY_CONTRACT` |",
  "| human/professional review requirement | `true` |",
];
const futureFileScopeTable = [
  "| Position | Future path | Future action |",
  "| --- | --- | --- |",
  "| 1 | `packages/schemas/src/index.js` | add one candidate-schema import and one schema-object export |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-export.test.js` | add the focused candidate package-export proof |",
];
const futurePackageActions = [
  "one static `require` binding for the tracked candidate schema",
  "one `module.exports` property using the exact symbol above",
];
const exportSequenceTable = [
  "| Position | Surface | Scope status |",
  "| --- | --- | --- |",
  "| 1 | candidate schema-object package export | `FIRST_SEPARATE_CONTRACT_ONLY_SLICE` |",
  "| 2 | validator-result schema-object package export | `SECOND_SEPARATE_CONTRACT_ONLY_SLICE` |",
];
const futureProofFamilies = [
  "`packages/schemas` exposes exactly the selected `humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence` property",
  "the exported object is reference-equal and deeply equal to the tracked candidate JSON schema object",
  "the exported `$id` and title equal the tracked schema identity",
  "all fifteen root fields and their declaration order are preserved",
  "exact `const`, `pattern`, `enum`, closed-object, `not`, and `anyOf` counts are preserved",
  "exact namespace-specific, reviewer-role, decision, attested-at, attestation-posture, generic opaque-reference, lifecycle, verification, and human-review declarations are preserved",
  "none of the five prohibited sibling names is exported",
  "the tracked validator-result schema remains unexported in this first slice",
  "no validation, attestation, signature, issuer, session, identity, currentness, role, authority, admissibility, approval effect, handoff, delivery, persistence, source, API, or runtime behavior is created",
];
const futureProofExclusionParagraph =
  "The proof must not claim JSON Schema runtime enforcement, validator correctness, decision-attestation existence, authenticity, authorship, signature validity, issuer authority, session existence, reviewer presence, identity authenticity, reviewer role or authority, trusted time, lifecycle truth or currentness, reference existence, approval admissibility, approval effect, handoff eligibility, legal correctness, evidentiary sufficiency, professional approval, technical sign-off, release readiness, product readiness, external-use authorization, security approval, blocker closure, compliance, or case truth.";
const currentScopeItems = ["`" + docsPath + "`", "`" + proofPath + "`"];
const nonInterferenceRules = [
  "preserve both tracked schemas and focused schema proofs unchanged",
  "create no package export in this docs-only slice",
  "modify no file outside the exact current two-file scope",
  "preserve all existing package exports unchanged",
  "keep validator-result package export as a separate later slice",
  "create no validator, dispatch, registry, cross-reference checkpoint, admissibility checkpoint, session verifier, authentication verifier, request-binding verifier, reviewer-presence verifier, identity verifier, currentness evaluator, role, qualification, or authority resolver, approval effect, handoff, delivery, release, persistence, API, route, UI, audit, provider, model, logging, telemetry, or executed-run behavior",
  "add no fields, states, statuses, mappings, aliases, findings, conclusions, scores, approvals, recipients, or readiness states",
  "assign no severity, recommend no remediation, and resolve no blocker",
  "acquire no metadata, inspect no media, perform no real private run, and reopen no domain-specific surface",
  "inspect or process no raw, private, source, case, session, identity-provider, credential, authentication, authorship, or real-evidence material",
  "preserve human/professional review as the release gate",
];
const finalBoundaryParagraph =
  "This package-export scope boundary is not actual human review, professional review, legal review, technical review, evidentiary review, session verification, identity verification, authentication, request-binding verification, reviewer-presence verification, professional-qualification verification, reviewer-role or authority verification, trusted-time or currentness verification, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, admissibility evidence, approval effect, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, finding, severity assignment, remediation recommendation, blocker resolution, metadata acquisition, real private run, domain-specific reopening, handoff approval, delivery approval, case-truth conclusion, or real-evidence review.";
const purposeParagraphs = [
  "This docs-only boundary translates the Owner-selected package-export sequence for the tracked Human Review Controlled Handoff human/professional approval decision attestation evidence contracts. It defines the smallest later `CONTRACT_ONLY` package schema-object export slice for the decision attestation evidence candidate schema. The validator-result schema export remains a separate later slice.",
  "This boundary freezes the exact package export symbol, future file scope, and proof limits. It does not modify the package index, change either schema, create either package export, create or execute a validator, create a cross-reference or admissibility checkpoint, verify an attestation, signature, issuer, session, or identity, authenticate a reviewer, bind a request, evaluate reviewer presence, role, authority, trusted time, lifecycle truth or currentness, or create approval effect, handoff, delivery, release, or runtime behavior.",
  "Package export scope is not package export implementation. Human/professional review remains the release gate.",
];
const conventionBoundaryParagraph =
  "The controlling group supplies schema identity, exact tracked structures, selected export sequence, sibling separation, and no-overclaim boundaries. The precedent group supplies only CommonJS schema-object export layout, camel-case symbol convention, and focused proof convention. It does not supply decision attestation evidence fields, values, mappings, validator behavior, session or identity meaning, authentication, request binding, reviewer presence, currentness, role, qualification, authority, admissibility, approval effect, handoff, delivery, release, or runtime semantics.";

const remainingPackageExportProofAlignmentPaths = [
  candidateSchemaProofPath,
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  validatorResultSchemaProofPath,
];
const completedPackageExportProofAlignmentPaths =
  remainingPackageExportProofAlignmentPaths.slice(0, 6);
const activePackageExportProofAlignmentPaths =
  remainingPackageExportProofAlignmentPaths.slice(6);
const allPackageAndValidatorSiblingPaths = [
  validatorResultSchemaPath,
  validatorResultSchemaProofPath,
  futureExportProofPath,
  validatorResultExportProofPath,
  ...retainedValidatorPaths,
];
const retainedPackageAndValidatorSiblingPaths = allPackageAndValidatorSiblingPaths.slice(2);
const packageExportTransitionPreambleLines = [
  "# Human Review Controlled Handoff Human/Professional Approval Decision Attestation Evidence Package Schema Export Proof Transition Prerequisite Boundary v1",
  "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY",
  "DOCS_ONLY",
  "APPEND_ONLY_PROOF_TRANSITION_PREREQUISITE",
  "OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A_PRESERVED",
  "HISTORICAL_CANDIDATE_SCHEMA_UNEXPORTED_MARKERS_PRESERVED",
  "PACKAGE_SCHEMA_EXPORT_SCOPE_PROOF_LIVE_ABSENCE_ASSERTIONS_NARROWED",
  "SIX_REMAINING_FOCUSED_PROOF_ALIGNMENTS_REQUIRED",
  "THREE_LATER_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_ASSERTIONS_RETAINED",
  "EXACT_TWO_FILE_PREREQUISITE_SCOPE_DEFINED",
  "PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE",
  "VALIDATOR_RESULT_PACKAGE_EXPORT_NOT_CREATED",
  "SCHEMA_NOT_CHANGED",
  "VALIDATOR_RESULT_SCHEMA_NOT_CHANGED",
  "VALIDATOR_NOT_CREATED",
  "VALIDATOR_DISPATCH_NOT_CHANGED",
  "VALIDATION_EXECUTION_NOT_CREATED",
  "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
  "ATTESTATION_SIGNATURE_OR_ISSUER_VERIFICATION_NOT_CREATED",
  "IDENTITY_ROLE_AUTHORITY_OR_SESSION_VERIFICATION_NOT_CREATED",
  "TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH_NOT_CREATED",
  "APPROVAL_EFFECT_NOT_CREATED",
  "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
  "NO_RUNTIME_BEHAVIOR_CREATED",
  "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
  "NO_METADATA_ACQUISITION_OR_MEDIA_INSPECTION_CREATED",
  "NO_REAL_PRIVATE_RUN_CREATED",
  "NO_SECURITY_VULNERABILITY_FINDING_SEVERITY_OR_REMEDIATION_CREATED",
  "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
  "NO_BLOCKER_RESOLUTION_CREATED",
  "NO_DOMAIN_SPECIFIC_REOPENING_CREATED",
  "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
  "PRODUCT_CANDIDATE_NONE",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
];
const packageExportTransitionCanonicalSourceItems = [
  candidateSchemaPath,
  candidateSchemaProofPath,
  validatorResultSchemaPath,
  validatorResultSchemaProofPath,
  docsPath,
  proofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  packageIndexPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
].map((relativePath) => "`" + relativePath + "`");
const packageExportTransitionPurposeParagraphs = [
  "This docs-only prerequisite resolves the first live proof conflict before the separately scoped Human Review Controlled Handoff human/professional approval decision attestation evidence candidate package schema-object export. The tracked package-export scope proof currently asserts that this prerequisite does not exist, that `packages/schemas/src/index.js` does not expose the candidate schema, and that the focused package-export proof does not exist. Its prerequisite-path assertion would fail as soon as this boundary exists.",
  "This boundary preserves the historical fact that the candidate schema slice and package-export scope slice created no package export. It narrows only the prerequisite-path and candidate package-export live absence assertions in the package-export scope proof. Six other focused proof surfaces remain fail-closed and require separate no-semantics alignments before package export implementation.",
  "This boundary does not modify the package index, create a package export, change either tracked schema, create a validator, execute validation, create a cross-reference or admissibility checkpoint, verify an attestation, signature, issuer, session, or identity, evaluate reviewer role or authority, trusted time, lifecycle truth or currentness, or create approval effect, handoff, delivery, release, or runtime behavior.",
  "Proof transition is not package-export implementation. Human/professional review remains the release gate.",
];
const packageExportTransitionPrecedentBoundaryParagraph =
  "The controlling sources supply the selected candidate-first sequence, exact decision attestation evidence schema identity and shape, future export symbol, and sibling separation. The precedent supplies only the distinction between correct historical absence evidence and a later superseded live absence assertion. It does not supply decision attestation evidence fields, states, mappings, validator behavior, attestation authenticity, signature validity, issuer authority, session or identity meaning, trusted time, lifecycle truth or currentness, reviewer role or authority, admissibility, approval effect, handoff, delivery, release, or runtime semantics.";
const packageExportTransitionClassificationTable = [
  "| Surface | Current proof posture | Required prerequisite posture |",
  "| --- | --- | --- |",
  "| candidate schema identity and structure | exact tracked proof | preserve unchanged |",
  "| historical unexported candidate posture | correct for candidate schema slice | preserve as historical evidence |",
  "| scope-proof prerequisite-path live absence | asserted | narrow in this slice |",
  "| scope-proof package-index and focused export-proof live absence | asserted | narrow in this slice |",
  "| six other focused proof surfaces | assert live candidate package-export absence | retain pending separate alignments |",
  "| validator-result package export and validator files | assert live absence | retain all three |",
];
const packageExportTransitionTargetTable = [
  "| Position | Target path | Later action |",
  "| --- | --- | --- |",
  "| 1 | `packages/schemas/src/index.js` | add one candidate-schema binding and export |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-export.test.js` | create the focused candidate package-export proof |",
];
const packageExportTransitionConflictTable = [
  "| Position | Proof surface | Transition posture |",
  "| --- | --- | --- |",
  "| 1 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-schema-export-scope-boundary-doc-freeze.test.js` | `TRANSITION_DIRECTLY_IN_THIS_SLICE` |",
  ...remainingPackageExportProofAlignmentPaths.map(
    (relativePath, index) =>
      `| ${index + 2} | \`${relativePath}\` | \`SEPARATE_FOCUSED_ALIGNMENT_REQUIRED\` |`,
  ),
];
const packageExportTransitionRetainedSiblingTable = [
  "| Position | Retained absent path |",
  "| --- | --- |",
  `| 1 | \`${validatorResultExportProofPath}\` |`,
  ...retainedValidatorPaths.map(
    (relativePath, index) => `| ${index + 2} | \`${relativePath}\` |`,
  ),
];
const packageExportTransitionCurrentScopeTable = [
  "| Position | Current path | Exact action |",
  "| --- | --- | --- |",
  `| 1 | \`${packageExportProofTransitionPath}\` | create this docs-only prerequisite |`,
  `| 2 | \`${proofPath}\` | preserve the package-export scope proof while narrowing only its prerequisite-path and candidate package-export live absence assertions |`,
];
const packageExportTransitionSteps = [
  "keep every scope identity, selected sequence, target path, export symbol, future proof family, and non-interference assertion",
  "preserve the exact historical docs-only scope and unexported markers as historical evidence",
  "add this transition prerequisite as a tracked required anchor",
  "stop checking live absence of this transition prerequisite",
  "stop checking package-index live absence of the candidate schema export",
  "stop checking live absence of the candidate focused package-export proof",
  "keep all three later package-and-validator sibling absence assertions",
  "keep validator-result package export and validator surfaces separate",
  "freeze the exact seven-surface conflict inventory and one/six partition",
  "retain all six separate proof-alignment gates",
  "preserve every non-interference and no-conclusion boundary",
  "create no export, validator, checkpoint, attestation, signature, issuer, session, identity, authority, approval-effect, handoff, delivery, release, or runtime behavior",
];
const packageExportTransitionLaterExportItems = [
  "one static candidate schema binding in `packages/schemas/src/index.js`",
  "one exact `humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence` export",
  "the focused candidate package-export proof",
];
const packageExportTransitionNonInterferenceRules = [
  "preserve both tracked schemas and structural proofs unchanged",
  "narrow only the prerequisite-path and candidate package-export live absence assertions in the package-export scope proof",
  "retain six focused proof-alignment gates",
  "retain all three later sibling live absence assertions in the transitioned proof",
  "create no package export in this prerequisite slice",
  "modify no file outside the exact current two-file scope",
  "create no validator, dispatch, registry, cross-reference checkpoint, admissibility checkpoint, attestation, signature, issuer, session, or identity verifier, trusted-time or lifecycle-currentness evaluator, reviewer role or authority resolver, approval effect, handoff, delivery, release, persistence, API, route, UI, audit, provider, model, logging, telemetry, or executed-run behavior",
  "add no fields, states, statuses, mappings, aliases, conclusions, scores, approvals, sign-offs, recipients, or readiness states",
  "create no finding, assign no severity, recommend no remediation, and resolve no blocker",
  "acquire no metadata, inspect no media, perform no real private run, and reopen no domain-specific surface",
  "inspect or process no raw, private, source, case, attestation, signature, issuer, session, identity-provider, credential, authentication, authorship, or real-evidence material",
  "create no product candidate or external-use authorization",
  "preserve human/professional review as the release gate",
];
const packageExportTransitionFinalBoundaryParagraph =
  "This proof-transition prerequisite is not actual human review, professional review, legal review, technical review, evidentiary review, attestation, signature, issuer, session, or identity verification, authentication, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, admissibility evidence, approval effect, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, finding, severity assignment, remediation recommendation, blocker resolution, metadata acquisition, real private run, domain-specific reopening, handoff approval, delivery approval, case-truth conclusion, or real-evidence review.";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function executedReadCalls(
  targetPath,
  requiredRelativePath,
  markerOverride = null,
) {
  const traceGuard =
    "CODEX_DECISION_ATTESTATION_RESULT_EXPORT_TRANSITION_TRACE_ACTIVE";
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
    "const calls = [];",
    "const marker = " + JSON.stringify(marker) + ";",
    "const requiredPath = path.resolve(process.argv[2]);",
    "const originalReadFileSync = fs.readFileSync;",
    "fs.readFileSync = (value, ...args) => {",
    "  const resolvedPath = path.resolve(String(value));",
    "  const result = originalReadFileSync(value, ...args);",
    "  if (resolvedPath === requiredPath) {",
    "    calls.push({",
    "      path: resolvedPath,",
    '      stack: new Error().stack || "",',
    "    });",
    "  }",
    "  return result;",
    "};",
    'process.on("exit", () => {',
    '  fs.writeSync(2, "\\n" + marker + JSON.stringify(calls));',
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function hasExecutedReadRequiredPath(targetPath, requiredRelativePath) {
  const resolvedTargetPath = fs.realpathSync(
    path.isAbsolute(targetPath) ? targetPath : absolute(targetPath),
  );
  const requiredPath = fs.realpathSync(absolute(requiredRelativePath));
  const targetFramePattern = new RegExp(
    "^\\s*at readRequired \\(" +
      escapeRegExp(resolvedTargetPath) +
      ":\\d+:\\d+\\)\\s*$",
    "u",
  );

  return executedReadCalls(resolvedTargetPath, requiredRelativePath).some(
    (call) =>
      call.path === requiredPath &&
      call.stack.split("\n").some((line) => targetFramePattern.test(line)),
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

function hasExactIdentifier(text, identifier) {
  return new RegExp("\\b" + identifier + "\\b", "u").test(text);
}

function assertPendingOrAlignedResultExportProof(
  text,
  label,
  pendingFragments,
) {
  const aligned = resultExportTransitionAligned(text, label);

  if (aligned) {
    assert.equal(text.includes(validatorResultExportProofPath), true, label);
    assert.equal(
      text.includes(
        "fs." +
          "existsSync(absolute(validatorResultPackageExportProofPath))",
      ),
      false,
      label,
    );
  } else {
    for (const fragment of pendingFragments) {
      assert.equal(text.includes(fragment), true, label + ": " + fragment);
    }
  }
  return aligned;
}

function readSection(text, heading, nextHeading) {
  const marker = "## " + heading + "\n";
  const nextMarker = "\n## " + nextHeading + "\n";
  const start = text.indexOf(marker);
  assert.notEqual(start, -1, heading);
  assert.equal(text.indexOf(marker, start + marker.length), -1, heading);
  const bodyStart = start + marker.length;
  const end = text.indexOf(nextMarker, bodyStart);
  assert.notEqual(end, -1, nextHeading);
  return text.slice(bodyStart, end).trim();
}

function literalStringArrayValues(sourceText, constantName) {
  const pattern = new RegExp(
    "const " + constantName + " = \\[\\n([\\s\\S]*?)\\n\\];",
    "u",
  );
  const match = sourceText.match(pattern);

  assert.notEqual(match, null, constantName);
  return [...match[1].matchAll(/^  "([^"]+)",?$/gmu)].map(
    (valueMatch) => valueMatch[1],
  );
}

function markdownTables(sectionText) {
  const tables = [];
  let current = [];
  for (const line of sectionText.split("\n")) {
    if (line.startsWith("| ")) {
      current.push(line);
    } else if (current.length > 0) {
      tables.push(current);
      current = [];
    }
  }
  if (current.length > 0) tables.push(current);
  return tables;
}

function orderedItems(sectionText) {
  const items = [];
  let current = null;
  for (const line of sectionText.split("\n")) {
    const match = line.match(/^\d+\. (.+)$/u);
    if (match) {
      if (current !== null) items.push(current);
      current = match[1];
    } else if (current !== null && /^ {3}\S/u.test(line)) {
      current += " " + line.trim();
    } else if (current !== null) {
      items.push(current);
      current = null;
    }
  }
  if (current !== null) items.push(current);
  return items;
}

function bulletItems(sectionText) {
  const items = [];
  let current = null;
  for (const line of sectionText.split("\n")) {
    const match = line.match(/^- (.+)$/u);
    if (match) {
      if (current !== null) items.push(current);
      current = match[1];
    } else if (current !== null && /^ {2}\S/u.test(line)) {
      current += " " + line.trim();
    } else if (current !== null) {
      items.push(current);
      current = null;
    }
  }
  if (current !== null) items.push(current);
  return items;
}

function normalize(text) {
  return text.replace(/\s+/gu, " ").trim();
}

function countKey(value, key, predicate = () => true) {
  if (Array.isArray(value)) {
    return value.reduce((count, item) => count + countKey(item, key, predicate), 0);
  }
  if (value === null || typeof value !== "object") return 0;
  return Object.entries(value).reduce(
    (count, [entryKey, entryValue]) =>
      count +
      (entryKey === key && predicate(entryValue) ? 1 : 0) +
      countKey(entryValue, key, predicate),
    0,
  );
}

function assertMarkerValue(text, marker, value) {
  const needle = marker + ":\n" + value;
  assert.equal(text.split(needle).length - 1, 1, needle);
}

test("result-export transition alignment requires an executed exact readRequired anchor", () => {
  const tempDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "decision-attestation-transition-anchor-"),
  );
  const transitionPath = absolute(
    validatorResultPackageExportProofTransitionPath,
  );
  const forgedMarker = "__FORGED_READ_REQUIRED_TRACE__";
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
      assertPendingOrAlignedResultExportProof(
        fixtureBodies.pending,
        fixturePaths.pending,
        ["const pendingMarker = true;"],
      ),
      false,
    );
    assert.equal(
      resultExportTransitionAligned(fixtureBodies.exact, fixturePaths.exact),
      true,
    );
  } finally {
    fs.rmSync(tempDirectory, { recursive: true, force: true });
  }
});

test("package-export scope references exact sources and selected sequence", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A",
    "CANDIDATE_SCHEMA_EXPORT_FIRST",
    "VALIDATOR_RESULT_SCHEMA_EXPORT_SEPARATE_LATER_SLICE",
    "PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("purpose and convention boundary target decision attestation exactly", () => {
  const docsText = readRequired(docsPath);
  const purposeSection = readSection(
    docsText,
    "1. Purpose",
    "2. Canonical Sources And Convention Boundary",
  );
  const conventionSection = readSection(
    docsText,
    "2. Canonical Sources And Convention Boundary",
    "3. Current Tracked Candidate Schema Facts",
  );

  assert.deepEqual(
    purposeSection.split(/\n\n+/u).map(normalize),
    purposeParagraphs,
  );
  assert.equal(
    normalize(conventionSection).endsWith(conventionBoundaryParagraph),
    true,
  );
  for (const stalePhrase of [
    "for the review session evidence candidate schema",
    "supply review session evidence fields",
  ]) {
    assert.equal(docsText.includes(stalePhrase), false, stalePhrase);
  }
});

test("tracked candidate schema facts and exact closed field vocabulary are frozen", () => {
  const docsText = readRequired(docsPath);
  const schema = require("../" + candidateSchemaPath);
  const section = readSection(
    docsText,
    "3. Current Tracked Candidate Schema Facts",
    "4. Exact Future File Scope",
  );

  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Decision Attestation Evidence Contract Scaffold",
  );
  assert.deepEqual(markdownTables(section), [schemaIdentityTable, boundedFieldTable]);
  assert.deepEqual(orderedItems(section), rootFields.map((field) => "`" + field + "`"));
  assert.deepEqual(schema.required, rootFields);
  assert.deepEqual(Object.keys(schema.properties), rootFields);
  assert.equal(schema.additionalProperties, false);
  assert.equal(
    schema.properties.contract_id.const,
    "human_review.controlled_handoff_human_professional_approval_decision_attestation_evidence",
  );
  assert.equal(schema.properties.contract_version.const, "1.0.0");
  assert.equal(schema.properties.verification_posture.const, "NOT_VERIFIED_BY_CONTRACT");
  assert.equal(schema.properties.human_professional_review_required.const, true);
  assert.deepEqual(schema.properties.reviewer_role.enum, reviewerRoles);
  assert.deepEqual(schema.properties.decision.enum, decisions);
  assert.equal(schema.properties.attested_at.pattern, timestampPattern);
  assert.equal(schema.properties.attestation_posture.const, "DECISION_ATTESTATION_CANDIDATE_ONLY");
  assert.deepEqual(schema.properties.attestation_lifecycle_posture.enum, lifecyclePostures);

  for (const [field, pattern] of Object.entries(namespaceReferencePatterns)) {
    assert.equal(schema.properties[field].pattern, pattern, field);
  }
  for (const field of genericReferenceFields) {
    assert.equal(schema.properties[field].pattern, genericReferencePattern, field);
    assert.deepEqual(schema.properties[field].not.anyOf, genericReferenceExclusions, field);
  }

  const expectedCounts = {
    TRACKED_SCHEMA_ROOT_FIELD_COUNT: 15,
    TRACKED_SCHEMA_NAMESPACE_REFERENCE_FIELD_COUNT: 4,
    TRACKED_SCHEMA_GENERIC_REFERENCE_FIELD_COUNT: 2,
    TRACKED_SCHEMA_CONST_COUNT: 5,
    TRACKED_SCHEMA_PATTERN_COUNT: 21,
    TRACKED_SCHEMA_ENUM_COUNT: 5,
    TRACKED_SCHEMA_CLOSED_OBJECT_COUNT: 1,
    TRACKED_SCHEMA_NOT_COUNT: 2,
    TRACKED_SCHEMA_ANY_OF_COUNT: 2,
    TRACKED_SCHEMA_REF_COUNT: 0,
    TRACKED_SCHEMA_ALLOF_COUNT: 0,
    TRACKED_SCHEMA_MIN_ITEMS_COUNT: 0,
    TRACKED_SCHEMA_MAX_ITEMS_COUNT: 0,
    TRACKED_SCHEMA_UNIQUE_ITEMS_COUNT: 0,
  };
  for (const [marker, value] of Object.entries(expectedCounts)) {
    assertMarkerValue(docsText, marker, String(value));
  }
  assert.equal(countKey(schema, "const"), 5);
  assert.equal(countKey(schema, "pattern"), 21);
  assert.equal(countKey(schema, "enum"), 5);
  assert.equal(countKey(schema, "additionalProperties", (value) => value === false), 1);
  assert.equal(countKey(schema, "not"), 2);
  assert.equal(countKey(schema, "anyOf"), 2);
  assert.equal(countKey(schema, "$ref"), 0);
  assert.equal(countKey(schema, "allOf"), 0);
  assert.equal(countKey(schema, "minItems"), 0);
  assert.equal(countKey(schema, "maxItems"), 0);
  assert.equal(countKey(schema, "uniqueItems"), 0);
});

test("future candidate package-export file scope is exactly two files", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "4. Exact Future File Scope",
    "5. Exact Future Export Surface",
  );

  assert.deepEqual(markdownTables(section), [futureFileScopeTable]);
  assertMarkerValue(docsText, "FUTURE_CANDIDATE_PACKAGE_EXPORT_SLICE_FILE_COUNT", "2");
});

test("future candidate export name import and package actions are exact", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "5. Exact Future Export Surface",
    "6. Explicitly Separate Sibling Surfaces",
  );

  assert.equal(section.includes("`" + candidateExportName + "`"), true);
  assertMarkerValue(
    docsText,
    "FUTURE_CANDIDATE_PACKAGE_SCHEMA_EXPORT_NAME",
    candidateExportName,
  );
  assert.equal(
    section.includes(
      "`../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json`",
    ),
    true,
  );
  assert.deepEqual(orderedItems(section), futurePackageActions);
  for (const prohibitedVerb of [
    "wrap",
    "normalize",
    "project",
    "mutate",
    "clone",
    "populate",
    "execute",
    "validate",
    "verify",
    "resolve",
    "authenticate",
    "authorize",
    "approve",
    "hand off",
    "deliver",
    "release",
  ]) {
    assert.equal(section.includes(prohibitedVerb), true, prohibitedVerb);
  }
});

test("candidate and result history remains exact while current validator-object denials stay absent", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired(packageIndexPath);
  const section = readSection(
    docsText,
    "6. Explicitly Separate Sibling Surfaces",
    "7. Exact Future Proof Scope",
  );

  assert.deepEqual(markdownTables(section), [exportSequenceTable]);
  assert.deepEqual(
    bulletItems(section),
    prohibitedSiblingNames.map((name) => "`" + name + "`"),
  );
  assertMarkerValue(docsText, "PACKAGE_EXPORT_SEQUENCE_STEP_COUNT", "2");
  assertMarkerValue(docsText, "FUTURE_PROHIBITED_SIBLING_EXPORT_NAME_COUNT", "5");
  for (const name of retainedValidatorNames) {
    assert.equal(hasExactIdentifier(packageIndexText, name), false, name);
  }
});

test("future proof assertion families and exclusions are complete", () => {
  const docsText = readRequired(docsPath);
  const section = readSection(
    docsText,
    "7. Exact Future Proof Scope",
    "8. Required Proof Transition",
  );

  assert.deepEqual(orderedItems(section), futureProofFamilies);
  assertMarkerValue(
    docsText,
    "FUTURE_CANDIDATE_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT",
    "9",
  );
  assert.equal(normalize(section).endsWith(futureProofExclusionParagraph), true);
});

test("proof transition prerequisite and exact 1/6 partition are frozen", () => {
  const proofText = readRequired(proofPath);
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(packageExportProofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const packageIndexText = readRequired(packageIndexPath);
  const section = readSection(
    docsText,
    "8. Required Proof Transition",
    "9. Exact Current Docs-Only File Scope",
  );
  const purposeSection = readSection(
    transitionText,
    "1. Purpose",
    "2. Canonical Sources And Transition Precedent",
  );
  const canonicalSourcesSection = readSection(
    transitionText,
    "2. Canonical Sources And Transition Precedent",
    "3. Exact Conflict Classification",
  );
  const classificationSection = readSection(
    transitionText,
    "3. Exact Conflict Classification",
    "4. Exact Candidate Package Export Targets",
  );
  const targetSection = readSection(
    transitionText,
    "4. Exact Candidate Package Export Targets",
    "5. Exact Live Proof Conflict Inventory",
  );
  const conflictSection = readSection(
    transitionText,
    "5. Exact Live Proof Conflict Inventory",
    "6. Three Retained Later Sibling Absence Requirements",
  );
  const retainedSection = readSection(
    transitionText,
    "6. Three Retained Later Sibling Absence Requirements",
    "7. Exact Current Two-File Slice",
  );
  const currentScopeSection = readSection(
    transitionText,
    "7. Exact Current Two-File Slice",
    "8. Exact Direct Package-Export-Scope-Proof Transition",
  );
  const directTransitionSection = readSection(
    transitionText,
    "8. Exact Direct Package-Export-Scope-Proof Transition",
    "9. Separate Later Alignments And Export",
  );
  const laterAlignmentSection = readSection(
    transitionText,
    "9. Separate Later Alignments And Export",
    "10. Non-Interference And Proof Boundary",
  );
  const nonInterferenceSection = readSection(
    transitionText,
    "10. Non-Interference And Proof Boundary",
    "11. Final No-Conclusion Boundary",
  );

  assertMarkerValue(docsText, "CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_REQUIRED", "TRUE");
  assert.equal(section.includes("separate docs-only"), true);
  assert.equal(section.includes("Historical absence statements remain preserved."), true);
  const preambleEnd = transitionText.indexOf("\n## 1. Purpose\n");
  assert.notEqual(preambleEnd, -1);
  assert.deepEqual(
    transitionText.slice(0, preambleEnd).split("\n").filter(Boolean),
    packageExportTransitionPreambleLines,
  );
  assert.deepEqual(
    purposeSection.split(/\n\n+/u).map(normalize),
    packageExportTransitionPurposeParagraphs,
  );
  assert.deepEqual(
    bulletItems(canonicalSourcesSection),
    packageExportTransitionCanonicalSourceItems,
  );
  assert.equal(
    normalize(canonicalSourcesSection).endsWith(
      packageExportTransitionPrecedentBoundaryParagraph,
    ),
    true,
  );
  assert.deepEqual(
    markdownTables(classificationSection),
    [packageExportTransitionClassificationTable],
  );
  assert.equal(
    transitionText.includes(
      "OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A_PRESERVED",
    ),
    true,
  );
  assert.equal(
    transitionText.includes("HISTORICAL_CANDIDATE_SCHEMA_UNEXPORTED_MARKERS_PRESERVED"),
    true,
  );
  assert.equal(
    transitionText.includes(
      "PROOF_CONFLICT_CLASSIFICATION:\nHISTORICAL_SCOPE_PROOF_CORRECT_CANDIDATE_PACKAGE_EXPORT_ASSERTIONS_PARTIALLY_SUPERSEDED",
    ),
    true,
  );
  assert.deepEqual(markdownTables(targetSection), [packageExportTransitionTargetTable]);
  assert.deepEqual(markdownTables(conflictSection), [packageExportTransitionConflictTable]);
  assert.deepEqual(markdownTables(retainedSection), [packageExportTransitionRetainedSiblingTable]);
  assert.deepEqual(markdownTables(currentScopeSection), [packageExportTransitionCurrentScopeTable]);
  assert.deepEqual(orderedItems(directTransitionSection), packageExportTransitionSteps);
  assert.deepEqual(
    orderedItems(laterAlignmentSection),
    packageExportTransitionLaterExportItems,
  );
  assert.equal(
    normalize(laterAlignmentSection).includes(
      "Only after all six alignments are tracked may the exact two-file `CONTRACT_ONLY` package-export slice add:",
    ),
    true,
  );
  assert.equal(
    normalize(laterAlignmentSection).endsWith(
      "The validator-result schema-object export remains a separate later slice.",
    ),
    true,
  );
  assert.deepEqual(
    bulletItems(nonInterferenceSection),
    packageExportTransitionNonInterferenceRules,
  );
  assertMarkerValue(transitionText, "PACKAGE_SCHEMA_EXPORT_TARGET_PATH_COUNT", "2");
  assertMarkerValue(transitionText, "PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT", "7");
  assertMarkerValue(
    transitionText,
    "DIRECT_PACKAGE_EXPORT_SCOPE_PROOF_TRANSITION_COUNT",
    "1",
  );
  assertMarkerValue(transitionText, "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT", "6");
  assertMarkerValue(
    transitionText,
    "RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT",
    "3",
  );
  assertMarkerValue(transitionText, "CURRENT_PREREQUISITE_FILE_COUNT", "2");
  assertMarkerValue(
    transitionText,
    "DIRECT_PACKAGE_EXPORT_SCOPE_PROOF_TRANSITION_STEP_COUNT",
    "12",
  );
  assert.equal(
    transitionText.includes("`" + candidateExportName + "`"),
    true,
  );
  assert.equal(
    normalize(transitionText).includes(
      "The selected sequence remains candidate schema export first and " +
        "`" +
        validatorResultExportName +
        "` in a separate later slice.",
    ),
    true,
  );
  assert.deepEqual(
    completedPackageExportProofAlignmentPaths,
    remainingPackageExportProofAlignmentPaths.slice(0, 6),
  );
  assert.equal(completedPackageExportProofAlignmentPaths.length, 6);
  assert.equal(activePackageExportProofAlignmentPaths.length, 0);
  const completedSchemaProofText = readRequired(candidateSchemaProofPath);
  assert.deepEqual(
    literalStringArrayValues(completedSchemaProofText, "laterSiblingPaths"),
    allPackageAndValidatorSiblingPaths,
  );
  assertPendingOrAlignedResultExportProof(
    completedSchemaProofText,
    candidateSchemaProofPath,
    [
      "const retainedPackageAndValidatorSiblingPaths = laterSiblingPaths.slice(2);",
      "const activePackageAndValidatorSiblingPaths =",
      "retainedPackageAndValidatorSiblingPaths.slice(1);",
      "for (const retainedSiblingPath of activePackageAndValidatorSiblingPaths)",
    ],
  );
  assert.equal(
    completedSchemaProofText.includes("packageIndex" + "Text.includes("),
    false,
  );
  const completedScaffoldProofText = readRequired(
    completedPackageExportProofAlignmentPaths[1],
  );
  assert.deepEqual(
    literalStringArrayValues(completedScaffoldProofText, "laterSiblingPaths"),
    allPackageAndValidatorSiblingPaths,
  );
  assertPendingOrAlignedResultExportProof(
    completedScaffoldProofText,
    completedPackageExportProofAlignmentPaths[1],
    [
      "const retainedPackageAndValidatorSiblingPaths = laterSiblingPaths.slice(2);",
      "const activePackageAndValidatorSiblingPaths =",
      "retainedPackageAndValidatorSiblingPaths.slice(1);",
      "for (const retainedSiblingPath of activePackageAndValidatorSiblingPaths)",
    ],
  );
  assert.equal(
    completedScaffoldProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  const completedErrorPathProofText = readRequired(
    completedPackageExportProofAlignmentPaths[2],
  );
  assert.deepEqual(
    literalStringArrayValues(completedErrorPathProofText, "retainedLaterSurfaces"),
    allPackageAndValidatorSiblingPaths,
  );
  assertPendingOrAlignedResultExportProof(
    completedErrorPathProofText,
    completedPackageExportProofAlignmentPaths[2],
    [
      "const historicalValidatorResultRetainedSurfaces =",
      "retainedLaterSurfaces.slice(2);",
      "historicalValidatorResultRetainedSurfaces.slice(1);",
      "for (const retainedSurface of retainedPackageAndValidatorSurfaces)",
    ],
  );
  assert.equal(
    completedErrorPathProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  const completedReadinessProofText = readRequired(
    completedPackageExportProofAlignmentPaths[3],
  );
  assert.deepEqual(
    literalStringArrayValues(completedReadinessProofText, "reservedLaterPaths"),
    allPackageAndValidatorSiblingPaths,
  );
  assertPendingOrAlignedResultExportProof(
    completedReadinessProofText,
    completedPackageExportProofAlignmentPaths[3],
    [
      "const historicalValidatorResultRetainedPaths = reservedLaterPaths.slice(2);",
      "historicalValidatorResultRetainedPaths.slice(1);",
      "for (const retainedPath of retainedPackageAndValidatorPaths)",
    ],
  );
  assert.equal(
    completedReadinessProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.equal(
    completedReadinessProofText.includes("packageIndex" + "Text.includes("),
    false,
  );
  const completedResultScaffoldProofText = readRequired(
    completedPackageExportProofAlignmentPaths[4],
  );
  assert.deepEqual(
    literalStringArrayValues(completedResultScaffoldProofText, "retainedSiblingPaths"),
    retainedPackageAndValidatorSiblingPaths,
  );
  assertPendingOrAlignedResultExportProof(
    completedResultScaffoldProofText,
    completedPackageExportProofAlignmentPaths[4],
    [
      "const retainedAfterCandidateExportPaths = retainedSiblingPaths.slice(1);",
      "for (const retainedPath of retainedAfterCandidateExportPaths)",
    ],
  );
  assert.equal(
    completedResultScaffoldProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.equal(
    completedResultScaffoldProofText.includes(
      "packageIndex" + "Text.includes(path.basename(candidateSchemaPath))",
    ),
    false,
  );
  const completedResultStructuralProofText = readRequired(
    completedPackageExportProofAlignmentPaths[5],
  );
  assert.deepEqual(
    literalStringArrayValues(
      completedResultStructuralProofText,
      "retainedSiblingPaths",
    ),
    retainedPackageAndValidatorSiblingPaths,
  );
  assertPendingOrAlignedResultExportProof(
    completedResultStructuralProofText,
    completedPackageExportProofAlignmentPaths[5],
    [
      "const retainedAfterCandidateExportPaths = retainedSiblingPaths.slice(1);",
    ],
  );
  assert.equal(
    completedResultStructuralProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  const remainingGateProofs = [];
  assert.deepEqual(
    remainingGateProofs.map((gate) => gate.relativePath),
    activePackageExportProofAlignmentPaths,
  );
  for (const gate of remainingGateProofs) {
    const gateProofText = readRequired(gate.relativePath);
    assert.deepEqual(
      literalStringArrayValues(gateProofText, gate.arrayName),
      gate.expectedPaths,
      gate.relativePath,
    );
    for (const fragment of gate.requiredFragments) {
      assert.equal(gateProofText.includes(fragment), true, gate.relativePath + ": " + fragment);
    }
  }
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(packageExportProofTransitionPath))",
    ),
    false,
  );
  assert.equal(
    proofText.includes("fs." + "existsSync(absolute(futureExportProofPath))"),
    false,
  );
  assert.equal(
    proofText.includes("packageIndex" + "Text.includes(candidateExportName)"),
    false,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "`" + validatorResultExportProofPath + "`",
    ),
    true,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9",
    ),
    true,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8",
    ),
    true,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED",
    ),
    true,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(validatorResultExportProofPath))",
    ),
    false,
  );
  for (const validatorPath of retainedValidatorPaths) {
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" +
          validatorPath +
          "` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE`",
      ),
      true,
      validatorPath,
    );
  }
  for (const retainedValidatorName of retainedValidatorNames) {
    assert.equal(
      hasExactIdentifier(packageIndexText, retainedValidatorName),
      false,
      retainedValidatorName,
    );
  }
  assert.equal(hasExactIdentifier(packageIndexText, validatorHelperExportName), true);
  const finalMarker = "## 11. Final No-Conclusion Boundary\n";
  const finalStart = transitionText.indexOf(finalMarker);
  assert.notEqual(finalStart, -1);
  const finalSection = transitionText.slice(finalStart + finalMarker.length).trim();
  const statusMarker =
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:";
  const finalParagraph = finalSection.slice(0, finalSection.indexOf(statusMarker)).trim();
  assert.equal(
    normalize(finalParagraph),
    packageExportTransitionFinalBoundaryParagraph,
  );
  assertMarkerValue(
    transitionText,
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS",
    "TRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED",
  );
  assertMarkerValue(
    transitionText,
    "REPO_NEXT_ACTION",
    "none from this boundary; six focused proof alignments remain before candidate package schema export",
  );
});

test("current docs-only scope and complete non-interference rules are exact", () => {
  const docsText = readRequired(docsPath);
  const scopeSection = readSection(
    docsText,
    "9. Exact Current Docs-Only File Scope",
    "10. Non-Interference Rules",
  );
  const nonInterferenceSection = readSection(
    docsText,
    "10. Non-Interference Rules",
    "11. Final No-Conclusion Boundary",
  );

  assert.deepEqual(orderedItems(scopeSection), currentScopeItems);
  assertMarkerValue(docsText, "CURRENT_CANDIDATE_PACKAGE_EXPORT_SCOPE_FILE_COUNT", "2");
  assert.deepEqual(bulletItems(nonInterferenceSection), nonInterferenceRules);
  for (const currentPath of [docsPath, proofPath]) {
    readRequired(currentPath);
  }
});

test("final no-conclusion boundary and next action are exact", () => {
  const docsText = readRequired(docsPath);
  const marker = "## 11. Final No-Conclusion Boundary\n";
  const start = docsText.indexOf(marker);
  assert.notEqual(start, -1);
  const section = docsText.slice(start + marker.length).trim();
  const statusMarker =
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:";
  const paragraph = section.slice(0, section.indexOf(statusMarker)).trim();

  assert.equal(normalize(paragraph), finalBoundaryParagraph);
  assertMarkerValue(
    docsText,
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS",
    "TRACKED_DOCS_ONLY_CANDIDATE_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  );
  assertMarkerValue(
    docsText,
    "REPO_NEXT_ACTION",
    "none from this boundary; a separate proof-transition prerequisite remains required before candidate package export",
  );
});
