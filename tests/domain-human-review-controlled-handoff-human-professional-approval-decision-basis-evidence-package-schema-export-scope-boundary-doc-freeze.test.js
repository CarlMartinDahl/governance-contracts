"use strict";

const assert = require("node:assert/strict");
const childProcess = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-schema-export-scope-boundary-doc-freeze.test.js";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionRecoveryPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_RECOVERY_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionMonitorRecoveryCorrectionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_MONITOR_RECOVERY_CORRECTION_PREREQUISITE_BOUNDARY_v1.md";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json";
const candidateSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema.test.js";
const validatorResultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json";
const validatorResultSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const futureExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js";
const validatorResultExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js";
const retainedValidatorPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
];
const controllingPaths = [
  candidateSchemaPath,
  candidateSchemaProofPath,
  validatorResultSchemaPath,
  validatorResultSchemaProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
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
  "decision_basis_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "reviewer_role",
  "decision",
  "basis_subject_kind",
  "basis_subject_ref",
  "basis_posture",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "basis_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const namespaceReferencePatterns = Object.freeze({
  decision_basis_ref: "^rvb_[a-z0-9][a-z0-9_-]{0,59}$",
  approval_ref: "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
  review_session_ref: "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
  reviewer_ref: "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
});
const basisSubjectMappings = [
  ["SOURCE_REGISTER_SOURCE", "^src_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["REVIEW_CHRONOLOGY_ENTRY", "^chr_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["ASSERTED_CLAIM", "^clm_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["DECLARED_REVIEW_GAP", "^gap_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["HUMAN_REVIEW_QUESTION", "^qst_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["NO_CONCLUSION_NOTICE", "^ncn_[a-z0-9][a-z0-9_-]{0,59}$"],
];
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
const basisSubjectKinds = basisSubjectMappings.map(([kind]) => kind);
const lifecyclePostures = [
  "DECISION_BASIS_DECLARED_ACTIVE",
  "DECISION_BASIS_DECLARED_INACTIVE",
  "DECISION_BASIS_DECLARED_REVOKED",
];
const candidateExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence";
const validatorResultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorResult";
const validatorHelperExportName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence";
const prohibitedSiblingNames = [
  validatorResultExportName,
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  validatorHelperExportName,
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorRegistry",
];
const retainedValidatorNames = prohibitedSiblingNames.slice(1);
const schemaIdentityTable = [
  "| Keyword | Exact value |",
  "| --- | --- |",
  "| `$schema` | `https://json-schema.org/draft/2020-12/schema` |",
  "| `$id` | `https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json` |",
  "| `title` | `Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Contract Scaffold` |",
];
const boundedFieldTable = [
  "| Field family | Exact fields or values |",
  "| --- | --- |",
  "| namespace references | `decision_basis_ref`, `approval_ref`, `review_session_ref`, `reviewer_ref`, `basis_subject_ref` |",
  "| direct namespace patterns | `^rvb_[a-z0-9][a-z0-9_-]{0,59}$`, `^apr_[a-z0-9][a-z0-9_-]{0,59}$`, `^rvs_[a-z0-9][a-z0-9_-]{0,59}$`, `^rvr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| basis-subject kinds | `SOURCE_REGISTER_SOURCE`, `REVIEW_CHRONOLOGY_ENTRY`, `ASSERTED_CLAIM`, `DECLARED_REVIEW_GAP`, `HUMAN_REVIEW_QUESTION`, `NO_CONCLUSION_NOTICE` |",
  "| basis-subject namespace patterns | `^src_[a-z0-9][a-z0-9_-]{0,59}$`, `^chr_[a-z0-9][a-z0-9_-]{0,59}$`, `^clm_[a-z0-9][a-z0-9_-]{0,59}$`, `^gap_[a-z0-9][a-z0-9_-]{0,59}$`, `^qst_[a-z0-9][a-z0-9_-]{0,59}$`, `^ncn_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| generic opaque references | `binding_issuer_ref`, `binding_provenance_ref` |",
  "| generic opaque-reference pattern | `^[A-Za-z0-9._:-]{1,128}$` |",
  "| reviewer roles | `HUMAN_REVIEWER`, `PROFESSIONAL_REVIEWER` |",
  "| decisions | `HUMAN_PROFESSIONAL_GATE_APPROVED`, `HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED`, `HUMAN_PROFESSIONAL_GATE_REJECTED` |",
  "| basis posture | `DECISION_BASIS_CANDIDATE_ONLY` |",
  "| basis lifecycle postures | `DECISION_BASIS_DECLARED_ACTIVE`, `DECISION_BASIS_DECLARED_INACTIVE`, `DECISION_BASIS_DECLARED_REVOKED` |",
  "| verification posture | `NOT_VERIFIED_BY_CONTRACT` |",
  "| human/professional review requirement | `true` |",
];
const futureFileScopeTable = [
  "| Position | Future path | Future action |",
  "| --- | --- | --- |",
  "| 1 | `packages/schemas/src/index.js` | add one candidate-schema import and one schema-object export |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js` | add the focused candidate package-export proof |",
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
  "`packages/schemas` exposes exactly the selected `humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence` property",
  "the exported object is reference-equal and deeply equal to the tracked candidate JSON schema object",
  "the exported `$id` and title equal the tracked schema identity",
  "all sixteen root fields and their declaration order are preserved",
  "exact `const`, `pattern`, `enum`, closed-object, `not`, `anyOf`, `allOf`, `if`, and `then` counts are preserved",
  "exact namespace-specific, basis-subject-kind, basis-subject-reference, reviewer-role, decision, basis-posture, generic opaque-reference, lifecycle, verification, and human-review declarations are preserved",
  "none of the five prohibited sibling names is exported",
  "the tracked validator-result schema remains unexported in this first slice",
  "no validation, subject existence, membership or truth, issuer, session, identity, currentness, role, authority, admissibility, approval effect, handoff, delivery, persistence, source, API, or runtime behavior is created",
];
const futureProofExclusionParagraph =
  "The proof must not claim JSON Schema runtime enforcement, validator correctness, decision-basis existence, subject existence, membership or truth, issuer authority, session existence, reviewer presence, identity authenticity, reviewer role or authority, trusted time, lifecycle truth or currentness, reference existence, approval admissibility, approval effect, handoff eligibility, legal correctness, evidentiary sufficiency, professional approval, technical sign-off, release readiness, product readiness, external-use authorization, security approval, blocker closure, compliance, or case truth.";
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
  "inspect or process no raw, private, source, case, session, identity-provider, credential, authentication, subject, provenance, or real-evidence material",
  "preserve human/professional review as the release gate",
];
const finalBoundaryParagraph =
  "This package-export scope boundary is not actual human review, professional review, legal review, technical review, evidentiary review, session verification, identity verification, authentication, request-binding verification, reviewer-presence verification, professional-qualification verification, reviewer-role or authority verification, trusted-time or currentness verification, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, admissibility evidence, approval effect, ownership determination, source-truth conclusion, identity-truth conclusion, subject-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, finding, severity assignment, remediation recommendation, blocker resolution, metadata acquisition, real private run, domain-specific reopening, handoff approval, delivery approval, case-truth conclusion, or real-evidence review.";
const purposeParagraphs = [
  "This docs-only boundary translates the Owner-selected package-export sequence for the tracked Human Review Controlled Handoff human/professional approval decision basis evidence contracts. It defines the smallest later `CONTRACT_ONLY` package schema-object export slice for the decision basis evidence candidate schema. The validator-result schema export remains a separate later slice.",
  "This boundary freezes the exact package export symbol, future file scope, and proof limits. It does not modify the package index, change either schema, create either package export, create or execute a validator, create a cross-reference or admissibility checkpoint, verify a decision-basis subject, subject membership or truth, issuer, session, or identity, authenticate a reviewer, bind a request, evaluate reviewer presence, role, authority, trusted time, lifecycle truth or currentness, or create approval effect, handoff, delivery, release, or runtime behavior.",
  "Package export scope is not package export implementation. Human/professional review remains the release gate.",
];
const conventionBoundaryParagraph =
  "The controlling group supplies schema identity, exact tracked structures, selected export sequence, sibling separation, and no-overclaim boundaries. The precedent group supplies only CommonJS schema-object export layout, camel-case symbol convention, and focused proof convention. It does not supply decision basis evidence fields, values, subject mappings, validator behavior, session or identity meaning, authentication, request binding, reviewer presence, currentness, role, qualification, authority, admissibility, approval effect, handoff, delivery, release, or runtime semantics.";

const remainingPackageExportProofAlignmentPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-contract-boundary-doc-freeze.test.js",
  candidateSchemaProofPath,
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  validatorResultSchemaProofPath,
];
const completedPackageExportProofAlignmentPaths =
  remainingPackageExportProofAlignmentPaths.slice(0, 7);
const activePackageExportProofAlignmentPaths =
  remainingPackageExportProofAlignmentPaths.slice(7);
const allPackageAndValidatorSiblingPaths = [
  validatorResultSchemaPath,
  validatorResultSchemaProofPath,
  futureExportProofPath,
  validatorResultExportProofPath,
  ...retainedValidatorPaths,
];
const retainedPackageAndValidatorSiblingPaths =
  allPackageAndValidatorSiblingPaths.slice(2);
const retainedLaterPackageAndValidatorPaths = [
  validatorResultExportProofPath,
  ...retainedValidatorPaths,
];
const validatorResultPackageExportRecoveryCanonicalSources = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  validatorResultPackageExportProofTransitionPath,
  completedPackageExportProofAlignmentPaths[0],
  proofPath,
  validatorResultSchemaProofPath,
  packageIndexPath,
];
const validatorResultPackageExportRecoveryCanonicalSourceBoundaryParagraph =
  "These sources supply only the existing selected export scope, historical transition inventory, live contract-proof behavior, and fail-closed monitor. They supply no new decision-basis, subject, issuer, provenance, session, identity, time, lifecycle, reviewer-role, reviewer-authority, admissibility, approval, handoff, delivery, release, validation, or runtime semantics.";
const validatorResultPackageExportRecoveryContractAlignmentTargetParagraph =
  "After this recovery is tracked, one separate focused alignment may modify only: `" +
  completedPackageExportProofAlignmentPaths[0] +
  "`";
const validatorResultPackageExportRecoveryFinalGateParagraph =
  "Only after the recovery prerequisite and the separate contract-proof alignment are tracked may the original exact two-file `CONTRACT_ONLY` export slice modify or create:";
const validatorResultPackageExportRecoveryFinalSymbolParagraph =
  "The exact export symbol remains: `" +
  validatorResultExportName +
  "` This recovery does not add either target and does not broaden the final slice.";
const validatorResultPackageExportRecoveryFinalNoConclusionParagraph =
  "This recovery prerequisite is not actual human review, professional review, legal review, technical review, evidentiary review, decision-basis or subject-existence verification, subject-membership verification, subject-pair uniqueness verification, subject-truth or subject-authenticity verification, relevance, support, sufficiency or probative-value verification, issuer-trust or provenance verification, review-session or identity verification, trusted-time or lifecycle-currentness verification, reviewer-role or authority verification, authentication, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, admissibility evidence, approval effect, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, finding, severity assignment, remediation recommendation, blocker resolution, metadata acquisition, real private run, domain-specific reopening, handoff approval, delivery approval, case-truth conclusion, or real-evidence review.";
const packageExportTransitionPreambleLines = [
  "# Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Package Schema Export Proof Transition Prerequisite Boundary v1",
  "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY",
  "DOCS_ONLY",
  "APPEND_ONLY_PROOF_TRANSITION_PREREQUISITE",
  "OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A_PRESERVED",
  "HISTORICAL_CANDIDATE_SCHEMA_UNEXPORTED_MARKERS_PRESERVED",
  "PACKAGE_SCHEMA_EXPORT_SCOPE_PROOF_LIVE_ABSENCE_ASSERTIONS_NARROWED",
  "SEVEN_REMAINING_FOCUSED_PROOF_ALIGNMENTS_REQUIRED",
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
  "SUBJECT_EXISTENCE_MEMBERSHIP_OR_TRUTH_VERIFICATION_NOT_CREATED",
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
const packageExportTransitionControllingSourceItems = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-contract-boundary-doc-freeze.test.js",
  candidateSchemaPath,
  candidateSchemaProofPath,
  validatorResultSchemaPath,
  validatorResultSchemaProofPath,
  docsPath,
  proofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  packageIndexPath,
].map((relativePath) => "`" + relativePath + "`");
const packageExportTransitionPrecedentSourceItems = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
].map((relativePath) => "`" + relativePath + "`");
const packageExportTransitionCanonicalSourceItems = [
  ...packageExportTransitionControllingSourceItems,
  ...packageExportTransitionPrecedentSourceItems,
];
const packageExportTransitionPurposeParagraphs = [
  "This docs-only prerequisite resolves the first live proof conflict before the separately scoped Human Review Controlled Handoff human/professional approval decision basis evidence candidate package schema-object export. The tracked package-export scope proof currently asserts that this prerequisite does not exist, that `packages/schemas/src/index.js` does not expose the candidate schema, and that the focused package-export proof does not exist. Its prerequisite-path assertion would fail as soon as this boundary exists.",
  "This boundary preserves the historical fact that the candidate schema slice and package-export scope slice created no package export. It narrows only the prerequisite-path and candidate package-export live absence assertions in the package-export scope proof. Seven other focused proof surfaces remain fail-closed and require separate no-semantics alignments before package export implementation.",
  "This boundary does not modify the package index, create a package export, change either tracked schema, create a validator, execute validation, create a cross-reference or admissibility checkpoint, verify a decision basis, subject existence, membership or truth, issuer, session, or identity, evaluate reviewer role or authority, trusted time, lifecycle truth or currentness, or create approval effect, handoff, delivery, release, or runtime behavior.",
  "Proof transition is not package-export implementation. Human/professional review remains the release gate.",
];
const packageExportTransitionPrecedentBoundaryParagraph =
  "The controlling sources supply the selected candidate-first sequence, exact decision basis evidence schema identity and shape, future export symbol, and sibling separation. The precedent supplies only the distinction between correct historical absence evidence and a later superseded live absence assertion. It does not supply decision basis evidence fields, states, subject mappings, validator behavior, subject existence, membership or truth, issuer authority, session or identity meaning, trusted time, lifecycle truth or currentness, reviewer role or authority, admissibility, approval effect, handoff, delivery, release, or runtime semantics.";
const packageExportTransitionClassificationBoundaryParagraph =
  "This transition is not package-export implementation and is not evidence that the future package export or focused export proof currently exists.";
const packageExportTransitionClassificationTable = [
  "| Surface | Current proof posture | Required prerequisite posture |",
  "| --- | --- | --- |",
  "| candidate schema identity and structure | exact tracked proof | preserve unchanged |",
  "| historical unexported candidate posture | correct for candidate schema slice | preserve as historical evidence |",
  "| scope-proof prerequisite-path live absence | asserted | narrow in this slice |",
  "| scope-proof package-index and focused export-proof live absence | asserted | narrow in this slice |",
  "| seven other focused proof surfaces | assert live candidate package-export absence | retain pending separate alignments |",
  "| validator-result package export and validator files | assert live absence | retain all three |",
];
const packageExportTransitionTargetTable = [
  "| Position | Target path | Later action |",
  "| --- | --- | --- |",
  "| 1 | `packages/schemas/src/index.js` | add one candidate-schema binding and export |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js` | create the focused candidate package-export proof |",
];
const packageExportTransitionConflictTable = [
  "| Position | Proof surface | Transition posture |",
  "| --- | --- | --- |",
  "| 1 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-schema-export-scope-boundary-doc-freeze.test.js` | `TRANSITION_DIRECTLY_IN_THIS_SLICE` |",
  ...remainingPackageExportProofAlignmentPaths.map(
    (relativePath, index) =>
      `| ${index + 2} | \`${relativePath}\` | \`SEPARATE_FOCUSED_ALIGNMENT_REQUIRED\` |`,
  ),
];
const packageExportTransitionRetainedSiblingTable = [
  "| Position | Retained absent path |",
  "| --- | --- |",
  ...retainedLaterPackageAndValidatorPaths.map(
    (relativePath, index) => `| ${index + 1} | \`${relativePath}\` |`,
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
  "freeze the exact eight-surface conflict inventory and one/seven partition",
  "retain all seven separate proof-alignment gates",
  "preserve every non-interference and no-conclusion boundary",
  "create no export, validator, checkpoint, subject verification, issuer, session, identity, authority, approval-effect, handoff, delivery, release, or runtime behavior",
];
const packageExportTransitionDirectBoundaryParagraph =
  "No schema field, state, reference, subject mapping, lifecycle posture, verification posture, human-review requirement, fixture, pairwise-distinct reference rule, or no-conclusion semantics may be removed or weakened.";
const packageExportTransitionLaterAlignmentBoundaryParagraph =
  "Each of the seven remaining proof surfaces requires a separate no-semantics alignment. Each alignment may remove only that proof's perpetual live absence assertion for the candidate package-export target and must retain every validator-result export, validator, dispatch, registry, checkpoint, subject existence, membership or truth, issuer, session or identity verification, trusted time, lifecycle truth or currentness, reviewer role or authority, admissibility, approval, handoff, delivery, release, source, and runtime boundary.";
const packageExportTransitionLaterExportItems = [
  "one static candidate schema binding in `packages/schemas/src/index.js`",
  "one exact `humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence` export",
  "the focused candidate package-export proof",
];
const packageExportTransitionNonInterferenceRules = [
  "preserve both tracked schemas and structural proofs unchanged",
  "narrow only the prerequisite-path and candidate package-export live absence assertions in the package-export scope proof",
  "retain seven focused proof-alignment gates",
  "retain all three later sibling live absence assertions in the transitioned proof",
  "create no package export in this prerequisite slice",
  "modify no file outside the exact current two-file scope",
  "create no validator, dispatch, registry, cross-reference checkpoint, admissibility checkpoint, subject-existence, subject-membership, subject-truth, issuer, session, or identity verifier, trusted-time or lifecycle-currentness evaluator, reviewer role or authority resolver, approval effect, handoff, delivery, release, persistence, API, route, UI, audit, provider, model, logging, telemetry, or executed-run behavior",
  "add no fields, states, statuses, mappings, aliases, conclusions, scores, approvals, sign-offs, recipients, or readiness states",
  "create no finding, assign no severity, recommend no remediation, and resolve no blocker",
  "acquire no metadata, inspect no media, perform no real private run, and reopen no domain-specific surface",
  "inspect or process no raw, private, source, case, decision-basis, subject, issuer, session, identity-provider, credential, authentication, provenance, or real-evidence material",
  "create no product candidate or external-use authorization",
  "preserve human/professional review as the release gate",
];
const packageExportTransitionProofLimitParagraph =
  "The transitioned proof may prove only that the package-export scope remains exact, its perpetual prerequisite-path and candidate package-export absence assertions are narrowed, seven separate proof alignments remain, and all three later sibling surfaces remain absent. It does not prove that the export exists, validation can execute, references resolve, a decision basis or subject exists, belongs to a packet, or is true, an issuer, session, or identity is authentic or current, reviewer role or authority is established, approval occurred, handoff is eligible, delivery or release is authorized, or any legal, evidentiary, professional, technical, security, product, external-use, compliance, or case-truth conclusion.";
const packageExportTransitionFinalBoundaryParagraph =
  "This proof-transition prerequisite is not actual human review, professional review, legal review, technical review, evidentiary review, decision-basis or subject verification, issuer, session, or identity verification, authentication, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, admissibility evidence, approval effect, ownership determination, source-truth conclusion, identity-truth conclusion, subject-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, finding, severity assignment, remediation recommendation, blocker resolution, metadata acquisition, real private run, domain-specific reopening, handoff approval, delivery approval, case-truth conclusion, or real-evidence review.";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function executedFileSystemCalls(targetPath, markerOverride = null) {
  const traceGuard =
    "CODEX_DECISION_BASIS_RESULT_EXPORT_TRANSITION_TRACE_ACTIVE";
  assert.notEqual(process.env[traceGuard], "1", targetPath + ": recursive trace");
  const marker =
    markerOverride ?? "__FILE_SYSTEM_TRACE_" + crypto.randomUUID() + "__";
  const resolvedTargetPath = fs.realpathSync(
    path.isAbsolute(targetPath) ? targetPath : absolute(targetPath),
  );
  const trackedPaths = [
    validatorResultPackageExportProofTransitionPath,
    validatorResultPackageExportProofTransitionRecoveryPath,
    validatorResultPackageExportProofTransitionMonitorRecoveryCorrectionPath,
    validatorResultExportProofPath,
    ...retainedValidatorPaths,
  ].map((relativePath) => path.resolve(absolute(relativePath)));
  const traceScript = [
    '"use strict";',
    'const fs = require("node:fs");',
    'const path = require("node:path");',
    'const { getCallSites } = require("node:util");',
    "const readCalls = [];",
    "const existsCalls = [];",
    "const marker = " + JSON.stringify(marker) + ";",
    "const trackedPaths = new Set(JSON.parse(process.argv[2]));",
    "const originalReadFileSync = fs.readFileSync;",
    "const originalExistsSync = fs.existsSync;",
    "fs.readFileSync = (value, ...args) => {",
    "  const resolvedPath = path.resolve(String(value));",
    "  const result = originalReadFileSync(value, ...args);",
    "  if (trackedPaths.has(resolvedPath)) {",
    "    readCalls.push({",
    "      path: resolvedPath,",
    "      callSites: getCallSites().map((site) => ({",
    "        functionName: site.functionName,",
    "        scriptName: site.scriptName,",
    "        lineNumber: site.lineNumber,",
    "        columnNumber: site.columnNumber,",
    "      })),",
    "    });",
    "  }",
    "  return result;",
    "};",
    "fs.existsSync = (value, ...args) => {",
    "  const resolvedPath = path.resolve(String(value));",
    "  const result = originalExistsSync(value, ...args);",
    "  if (trackedPaths.has(resolvedPath)) {",
    "    existsCalls.push({",
    "      path: resolvedPath,",
    "      callSites: getCallSites().map((site) => ({",
    "        functionName: site.functionName,",
    "        scriptName: site.scriptName,",
    "        lineNumber: site.lineNumber,",
    "        columnNumber: site.columnNumber,",
    "      })),",
    "      result,",
    "    });",
    "  }",
    "  return result;",
    "};",
    'process.on("exit", () => {',
    '  fs.writeSync(2, "\\n" + marker + JSON.stringify({ readCalls, existsCalls }));',
    "});",
    "require(path.resolve(process.argv[1]));",
  ].join("\n");
  const result = childProcess.spawnSync(
    process.execPath,
    [
      "-e",
      traceScript,
      resolvedTargetPath,
      JSON.stringify(trackedPaths),
    ],
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

function targetRejectsPresentPath(targetPath, relativePath) {
  const resolvedTargetPath = fs.realpathSync(
    path.isAbsolute(targetPath) ? targetPath : absolute(targetPath),
  );
  const overriddenPath = path.resolve(absolute(relativePath));
  const overrideScript = [
    '"use strict";',
    'const fs = require("node:fs");',
    'const path = require("node:path");',
    "const overriddenPath = path.resolve(process.argv[2]);",
    "const originalExistsSync = fs.existsSync;",
    "fs.existsSync = (value, ...args) =>",
    "  path.resolve(String(value)) === overriddenPath",
    "    ? true",
    "    : originalExistsSync(value, ...args);",
    "require(path.resolve(process.argv[1]));",
  ].join("\n");
  const result = childProcess.spawnSync(
    process.execPath,
    ["-e", overrideScript, resolvedTargetPath, overriddenPath],
    {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
      timeout: 30_000,
    },
  );

  assert.equal(result.error, undefined, resolvedTargetPath);
  return result.status !== 0;
}

function inspectResultExportTransition(text, targetPath) {
  const resolvedTargetPath = fs.realpathSync(
    path.isAbsolute(targetPath) ? targetPath : absolute(targetPath),
  );
  const transitionPaths = [
    validatorResultPackageExportProofTransitionPath,
    validatorResultPackageExportProofTransitionRecoveryPath,
  ].map((relativePath) => path.resolve(absolute(relativePath)));
  const trace = executedFileSystemCalls(resolvedTargetPath);
  const executedTransitionPaths = transitionPaths.filter((transitionPath) =>
    trace.readCalls.some(
      (call) =>
        call.path === transitionPath &&
        call.callSites.some(
          (site) =>
            site.functionName === "readRequired" &&
            typeof site.scriptName === "string" &&
            path.resolve(site.scriptName) === resolvedTargetPath,
        ),
    ),
  );
  const aligned = executedTransitionPaths.length > 0;

  if (!aligned) {
    for (const transitionPath of [
      validatorResultPackageExportProofTransitionPath,
      validatorResultPackageExportProofTransitionRecoveryPath,
    ]) {
      assert.equal(
        text.includes(transitionPath),
        false,
        targetPath + ": non-executed validator-result export transition anchor",
      );
    }
  }
  return { aligned, executedTransitionPaths, trace };
}

function resultExportTransitionAligned(text, targetPath) {
  return inspectResultExportTransition(text, targetPath).aligned;
}

function inspectContractProofResultExportTransition(text, targetPath) {
  const transition = inspectResultExportTransition(text, targetPath);

  if (transition.aligned) {
    assert.deepEqual(
      transition.executedTransitionPaths,
      [
        validatorResultPackageExportProofTransitionPath,
        validatorResultPackageExportProofTransitionRecoveryPath,
      ].map((relativePath) => path.resolve(absolute(relativePath))),
      targetPath +
        ": aligned contract proof must execute original and recovery transition anchors",
    );
  }
  return transition;
}

function hasExactIdentifier(text, identifier) {
  return new RegExp("\\b" + identifier + "\\b", "u").test(text);
}

function assertPendingOrAlignedResultExportProof(
  text,
  label,
  pendingFragments,
) {
  const { aligned, trace } = inspectResultExportTransition(text, label);

  if (aligned) {
    assert.equal(text.includes(validatorResultExportProofPath), true, label);
    const resultExportProofPath = path.resolve(
      absolute(validatorResultExportProofPath),
    );
    assert.equal(
      trace.existsCalls.filter((call) => call.path === resultExportProofPath)
        .length,
      0,
      label + ": validator-result export proof live absence must be removed",
    );
    for (const validatorPath of retainedValidatorPaths) {
      const absoluteValidatorPath = path.resolve(absolute(validatorPath));
      assert.equal(
        trace.existsCalls.filter(
          (call) => call.path === absoluteValidatorPath,
        ).length,
        1,
        label + ": " + validatorPath,
      );
      assert.equal(
        targetRejectsPresentPath(label, validatorPath),
        true,
        label + ": present-path simulation must fail closed for " + validatorPath,
      );
    }
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
  const bodyLines = match[1]
    .split("\n")
    .filter((line) => line.trim().length > 0);
  for (const line of bodyLines) {
    assert.match(line, /^  "[^"]+",?$/u, constantName + ": " + line);
  }
  const values = [...match[1].matchAll(/^  "([^"]+)",?$/gmu)].map(
    (valueMatch) => valueMatch[1],
  );
  assert.equal(values.length, bodyLines.length, constantName);
  return values;
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

test("result-export alignment requires an executed anchor and retained validator checks", () => {
  const tempDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "decision-basis-result-export-alignment-"),
  );
  const transitionPath = absolute(
    validatorResultPackageExportProofTransitionPath,
  );
  const recoveryTransitionPath = absolute(
    validatorResultPackageExportProofTransitionRecoveryPath,
  );
  const resultExportProofPath = absolute(validatorResultExportProofPath);
  const validatorPaths = retainedValidatorPaths.map(absolute);
  const forgedMarker = "__FORGED_FILE_SYSTEM_TRACE__";
  const readRequiredSource =
    'const fs = require("node:fs");\n' +
    "function readRequired(filePath) {\n" +
    '  return fs.readFileSync(filePath, "utf8");\n' +
    "}\n";
  const alignedPrefix =
    '"use strict";\n' +
    'const assert = require("node:assert/strict");\n' +
    readRequiredSource +
    "const resultExportProofPath = " +
    JSON.stringify(validatorResultExportProofPath) +
    ";\n" +
    "readRequired(" +
    JSON.stringify(transitionPath) +
    ");\n";
  const recoveryAlignedPrefix =
    '"use strict";\n' +
    'const assert = require("node:assert/strict");\n' +
    readRequiredSource +
    "const resultExportProofPath = " +
    JSON.stringify(validatorResultExportProofPath) +
    ";\n" +
    "readRequired(" +
    JSON.stringify(recoveryTransitionPath) +
    ");\n";
  const dualAnchorAlignedPrefix =
    '"use strict";\n' +
    'const assert = require("node:assert/strict");\n' +
    readRequiredSource +
    "const resultExportProofPath = " +
    JSON.stringify(validatorResultExportProofPath) +
    ";\n" +
    "readRequired(" +
    JSON.stringify(transitionPath) +
    ");\n" +
    "readRequired(" +
    JSON.stringify(recoveryTransitionPath) +
    ");\n";
  const retainedValidatorChecks = validatorPaths
    .map(
      (validatorPath) =>
        "assert.equal(fs.existsSync(" +
        JSON.stringify(validatorPath) +
        "), false, " +
        JSON.stringify(validatorPath) +
        ");",
    )
    .join("\n");
  const bareValidatorChecks = validatorPaths
    .map((validatorPath) => "fs.existsSync(" + JSON.stringify(validatorPath) + ");")
    .join("\n");
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
      '  try { return fs.readFileSync(filePath, "utf8"); } catch { return ""; }\n' +
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
    stackForged:
      '"use strict";\n' +
      'const fs = require("node:fs");\n' +
      "Error.prepareStackTrace = () => " +
      JSON.stringify(
        "Error\n    at readRequired (" + transitionPath + ":1:1)",
      ) +
      ";\n" +
      "fs.readFileSync(" +
      JSON.stringify(transitionPath) +
      ', "utf8");\n',
    dependency:
      '"use strict";\n' +
      readRequiredSource +
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
      JSON.stringify("\n" + forgedMarker + "{}") +
      ");\n" +
      "});\n",
    pending: '"use strict";\nconst pendingMarker = true;\n',
    exact:
      '"use strict";\n' +
      readRequiredSource +
      "readRequired(" +
      JSON.stringify(transitionPath) +
      ");\n",
    alignedValid: alignedPrefix + retainedValidatorChecks + "\n",
    recoveryAlignedValid:
      recoveryAlignedPrefix + retainedValidatorChecks + "\n",
    dualAnchorAlignedValid:
      dualAnchorAlignedPrefix + retainedValidatorChecks + "\n",
    alignedAliasAbsence:
      alignedPrefix +
      "const aliasedProofPath = " +
      JSON.stringify(resultExportProofPath) +
      ";\n" +
      "fs.existsSync(aliasedProofPath);\n" +
      retainedValidatorChecks +
      "\n",
    alignedMissingValidator:
      alignedPrefix +
      "assert.equal(fs.existsSync(" +
      JSON.stringify(validatorPaths[0]) +
      "), false, " +
      JSON.stringify(validatorPaths[0]) +
      ");\n",
    alignedBareValidator: alignedPrefix + bareValidatorChecks + "\n",
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
      "stackForged",
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
      () => executedFileSystemCalls(fixturePaths.forged, forgedMarker),
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
    assert.equal(
      assertPendingOrAlignedResultExportProof(
        fixtureBodies.alignedValid,
        fixturePaths.alignedValid,
        [],
      ),
      true,
    );
    const recoveryTransition = inspectResultExportTransition(
      fixtureBodies.recoveryAlignedValid,
      fixturePaths.recoveryAlignedValid,
    );
    assert.equal(recoveryTransition.aligned, true);
    assert.deepEqual(recoveryTransition.executedTransitionPaths, [
      path.resolve(recoveryTransitionPath),
    ]);
    assert.equal(
      assertPendingOrAlignedResultExportProof(
        fixtureBodies.recoveryAlignedValid,
        fixturePaths.recoveryAlignedValid,
        [],
      ),
      true,
    );
    assert.throws(
      () =>
        inspectContractProofResultExportTransition(
          fixtureBodies.recoveryAlignedValid,
          fixturePaths.recoveryAlignedValid,
        ),
      /aligned contract proof must execute original and recovery transition anchors/u,
    );
    const dualAnchorTransition = inspectContractProofResultExportTransition(
      fixtureBodies.dualAnchorAlignedValid,
      fixturePaths.dualAnchorAlignedValid,
    );
    assert.equal(dualAnchorTransition.aligned, true);
    assert.deepEqual(dualAnchorTransition.executedTransitionPaths, [
      path.resolve(transitionPath),
      path.resolve(recoveryTransitionPath),
    ]);
    assert.equal(
      assertPendingOrAlignedResultExportProof(
        fixtureBodies.dualAnchorAlignedValid,
        fixturePaths.dualAnchorAlignedValid,
        [],
      ),
      true,
    );
    assert.throws(
      () =>
        assertPendingOrAlignedResultExportProof(
          fixtureBodies.alignedAliasAbsence,
          fixturePaths.alignedAliasAbsence,
          [],
        ),
      /validator-result export proof live absence must be removed/u,
    );
    assert.throws(
      () =>
        assertPendingOrAlignedResultExportProof(
          fixtureBodies.alignedMissingValidator,
          fixturePaths.alignedMissingValidator,
          [],
        ),
      /evidence-validator\.test\.js/u,
    );
    assert.throws(
      () =>
        assertPendingOrAlignedResultExportProof(
          fixtureBodies.alignedBareValidator,
          fixturePaths.alignedBareValidator,
          [],
        ),
      /present-path simulation must fail closed/u,
    );
  } finally {
    fs.rmSync(tempDirectory, { recursive: true, force: true });
  }
});

test("result-export recovery records one omitted contract proof and preserves the export gate", () => {
  const recoveryText = readRequired(
    validatorResultPackageExportProofTransitionRecoveryPath,
  );
  const originalTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const contractProofPath = completedPackageExportProofAlignmentPaths[0];
  const contractProofText = readRequired(contractProofPath);
  const canonicalSourcesSection = readSection(
    recoveryText,
    "2. Canonical Sources",
    "3. Historical Inventory And Recovered Count",
  );
  const historicalInventorySection = readSection(
    recoveryText,
    "3. Historical Inventory And Recovered Count",
    "4. Exact Omitted Live Proof Conflict",
  );
  const omittedConflictSection = readSection(
    recoveryText,
    "4. Exact Omitted Live Proof Conflict",
    "5. Two Retained Validator File Absence Requirements",
  );
  const retainedValidatorSection = readSection(
    recoveryText,
    "5. Two Retained Validator File Absence Requirements",
    "6. Exact Recovery Slice",
  );
  const recoveryScopeSection = readSection(
    recoveryText,
    "6. Exact Recovery Slice",
    "7. Exact Later Contract-Proof Alignment",
  );
  const contractAlignmentSection = readSection(
    recoveryText,
    "7. Exact Later Contract-Proof Alignment",
    "8. Preserved Final Two-File Export",
  );
  const finalExportSection = readSection(
    recoveryText,
    "8. Preserved Final Two-File Export",
    "9. Non-Interference And Proof Boundary",
  );
  const nonInterferenceSection = readSection(
    recoveryText,
    "9. Non-Interference And Proof Boundary",
    "10. Final No-Conclusion Boundary",
  );
  const finalNoConclusionHeading =
    "## 10. Final No-Conclusion Boundary\n\n";
  const finalNoConclusionStart = recoveryText.indexOf(finalNoConclusionHeading);
  const finalNoConclusionStatusMarker =
    "\n\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_RECOVERY_PREREQUISITE_STATUS:";
  const finalNoConclusionEnd = recoveryText.indexOf(
    finalNoConclusionStatusMarker,
    finalNoConclusionStart,
  );
  const preambleEnd = recoveryText.indexOf("\n## 1. Purpose\n");

  assert.notEqual(preambleEnd, -1);
  assert.deepEqual(
    recoveryText.slice(0, preambleEnd).split("\n").filter(Boolean),
    [
      "# Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Validator-Result Package Schema Export Proof Transition Recovery Prerequisite Boundary v1",
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_RECOVERY_PREREQUISITE_BOUNDARY",
      "DOCS_ONLY",
      "APPEND_ONLY_PROOF_TRANSITION_RECOVERY_PREREQUISITE",
      "OWNER_SELECTED_VALIDATOR_RESULT_PACKAGE_EXPORT_SCOPE_PRESERVED",
      "HISTORICAL_NINE_SURFACE_INVENTORY_PRESERVED",
      "ONE_OMITTED_CONTRACT_PROOF_CONFLICT_REGISTERED",
      "TOTAL_LIVE_PROOF_CONFLICT_COUNT_RECOVERED_TO_TEN",
      "ONE_ADDITIONAL_FOCUSED_PROOF_ALIGNMENT_REQUIRED",
      "EXACT_TWO_FILE_RECOVERY_SCOPE_DEFINED",
      "VALIDATOR_RESULT_PACKAGE_EXPORT_NOT_CREATED",
      "PACKAGE_INDEX_NOT_CHANGED",
      "SCHEMA_NOT_CHANGED",
      "VALIDATOR_RESULT_SCHEMA_NOT_CHANGED",
      "VALIDATOR_NOT_CREATED",
      "VALIDATOR_DISPATCH_NOT_CHANGED",
      "VALIDATION_EXECUTION_NOT_CREATED",
      "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
      "SUBJECT_EXISTENCE_MEMBERSHIP_OR_TRUTH_VERIFICATION_NOT_CREATED",
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
      "NO_PRODUCT_CANDIDATE_CREATED",
      "EXTERNAL_USE_NOT_AUTHORIZED",
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    ],
  );
  assert.deepEqual(
    bulletItems(canonicalSourcesSection),
    validatorResultPackageExportRecoveryCanonicalSources.map(
      (sourcePath) => "`" + sourcePath + "`",
    ),
  );
  const canonicalSourceBoundaryStart = canonicalSourcesSection.indexOf(
    "\n\nThese sources supply only",
  );
  assert.notEqual(canonicalSourceBoundaryStart, -1);
  assert.equal(
    normalize(canonicalSourcesSection.slice(canonicalSourceBoundaryStart)),
    validatorResultPackageExportRecoveryCanonicalSourceBoundaryParagraph,
  );
  assert.deepEqual(markdownTables(historicalInventorySection), [
    [
      "| Measure | Historical declared value |",
      "| --- | --- |",
      "| validator-result package-export live proof conflicts | `9` |",
      "| direct structural proof transition | `1` |",
      "| separately required focused proof alignments | `8` |",
    ],
    [
      "| Measure | Recovered value |",
      "| --- | --- |",
      "| historically registered proof surfaces | `9` |",
      "| omitted live proof surface | `1` |",
      "| total live proof surfaces | `10` |",
      "| already registered later alignments | `8` |",
      "| additional recovery alignment | `1` |",
      "| total separately required alignments | `9` |",
    ],
  ]);
  for (const [marker, value] of [
    ["HISTORICAL_REGISTERED_LIVE_PROOF_CONFLICT_COUNT", "9"],
    ["OMITTED_LIVE_PROOF_CONFLICT_COUNT", "1"],
    ["RECOVERED_TOTAL_LIVE_PROOF_CONFLICT_COUNT", "10"],
    ["HISTORICAL_REGISTERED_FOCUSED_ALIGNMENT_COUNT", "8"],
    ["RECOVERY_ADDITIONAL_FOCUSED_ALIGNMENT_COUNT", "1"],
    ["RECOVERED_TOTAL_FOCUSED_ALIGNMENT_COUNT", "9"],
    ["OMITTED_CONTRACT_PROOF_SURFACE_COUNT", "1"],
    ["DERIVATIVE_MONITOR_FAILURE_COUNT", "2"],
    ["RECOVERY_RETAINED_VALIDATOR_FILE_ABSENCE_COUNT", "2"],
    ["CURRENT_RECOVERY_PREREQUISITE_FILE_COUNT", "2"],
    ["CONTRACT_PROOF_RECOVERY_ALIGNMENT_FILE_COUNT", "1"],
    ["CONTRACT_PROOF_RECOVERY_ALIGNMENT_STEP_COUNT", "8"],
    ["PRESERVED_FINAL_VALIDATOR_RESULT_PACKAGE_EXPORT_FILE_COUNT", "2"],
  ]) {
    assertMarkerValue(recoveryText, marker, value);
  }
  assertMarkerValue(
    originalTransitionText,
    "VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT",
    "9",
  );
  assertMarkerValue(
    originalTransitionText,
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT",
    "8",
  );
  assert.equal(originalTransitionText.includes("`" + contractProofPath + "`"), false);
  assert.deepEqual(markdownTables(omittedConflictSection), [
    [
      "| Position | Omitted proof surface | Current live behavior | Recovery posture |",
      "| --- | --- | --- | --- |",
      "| 1 | `" +
        contractProofPath +
        "` | includes the focused validator-result package-export proof in an active retained-sibling loop and asserts live filesystem absence | `SEPARATE_FOCUSED_RECOVERY_ALIGNMENT_REQUIRED` |",
    ],
  ]);
  assert.deepEqual(markdownTables(retainedValidatorSection), [
    [
      "| Position | Retained absent path |",
      "| --- | --- |",
      "| 1 | `" + retainedValidatorPaths[0] + "` |",
      "| 2 | `" + retainedValidatorPaths[1] + "` |",
    ],
  ]);
  assert.deepEqual(markdownTables(recoveryScopeSection), [
    [
      "| Position | Recovery path | Exact action |",
      "| --- | --- | --- |",
      "| 1 | `" +
        validatorResultPackageExportProofTransitionRecoveryPath +
        "` | create this recovery prerequisite |",
      "| 2 | `" +
        proofPath +
        "` | freeze the omission, recovered counts, continued export block, and later recovery anchor |",
    ],
  ]);
  const contractAlignmentCountMarker =
    "\n\nCONTRACT_PROOF_RECOVERY_ALIGNMENT_FILE_COUNT:";
  const contractAlignmentTargetEnd = contractAlignmentSection.indexOf(
    contractAlignmentCountMarker,
  );
  assert.notEqual(contractAlignmentTargetEnd, -1);
  assert.equal(
    normalize(contractAlignmentSection.slice(0, contractAlignmentTargetEnd)),
    validatorResultPackageExportRecoveryContractAlignmentTargetParagraph,
  );
  assert.deepEqual(orderedItems(contractAlignmentSection), [
    "preserve the complete historical candidate, validator-result, package-export, and validator sibling path inventory",
    "load this recovery prerequisite through the proof's required-file reader",
    "preserve the original validator-result package-export transition as a historical anchor",
    "identify only the focused validator-result package-export proof as released from live absence checking",
    "retain exactly the two validator-file live absence checks",
    "retain present-path fail-closed behavior for both validator files",
    "preserve every decision-basis contract field, mapping, lifecycle, review, privacy, and no-conclusion assertion",
    "create no export, validator, dispatch, checkpoint, approval effect, handoff, delivery, release, or runtime behavior",
  ]);
  assert.deepEqual(markdownTables(finalExportSection), [
    [
      "| Position | Final export path | Preserved action |",
      "| --- | --- | --- |",
      "| 1 | `packages/schemas/src/index.js` | add one validator-result schema binding and export |",
      "| 2 | `" +
        validatorResultExportProofPath +
        "` | add the focused validator-result package-export proof |",
    ],
  ]);
  const finalExportTableStart = finalExportSection.indexOf(
    "\n\n| Position | Final export path | Preserved action |",
  );
  assert.notEqual(finalExportTableStart, -1);
  assert.equal(
    normalize(finalExportSection.slice(0, finalExportTableStart)),
    validatorResultPackageExportRecoveryFinalGateParagraph,
  );
  const finalExportSymbolStart = finalExportSection.indexOf(
    "\n\nThe exact export symbol remains:",
  );
  assert.notEqual(finalExportSymbolStart, -1);
  assert.equal(
    normalize(finalExportSection.slice(finalExportSymbolStart)),
    validatorResultPackageExportRecoveryFinalSymbolParagraph,
  );
  assert.deepEqual(bulletItems(nonInterferenceSection), [
    "preserve the original nine-row transition inventory as historical documentation",
    "register exactly one omitted contract-proof live conflict",
    "preserve both schemas and all selected schema semantics",
    "preserve the completed candidate schema export",
    "create no validator-result package export in this recovery",
    "retain both validator-file live absence assertions",
    "modify no file outside the exact two-file recovery scope",
    "create no validator, dispatch, helper, registry, cross-reference checkpoint, admissibility checkpoint, decision-basis or subject verifier, issuer, provenance, session, or identity verifier, trusted-time or lifecycle-currentness evaluator, reviewer-role or authority resolver, approval effect, handoff, delivery, release, persistence, API, route, UI, audit, provider, model, logging, telemetry, or executed-run behavior",
    "inspect or process no raw, private, source, case, decision-basis, subject, issuer, provenance, session, identity-provider, credential, authorship, or real-evidence material",
    "assign no severity, recommend no remediation, resolve no blocker, acquire no metadata, execute no real private run, and reopen no domain-specific boundary",
    "preserve human/professional review as the release gate",
  ]);
  const transition = inspectContractProofResultExportTransition(
    contractProofText,
    contractProofPath,
  );
  const resultExportProofAbsolutePath = path.resolve(
    absolute(validatorResultExportProofPath),
  );
  const resultExportAbsenceCalls = transition.trace.existsCalls.filter(
    (call) => call.path === resultExportProofAbsolutePath,
  );
  if (transition.aligned) {
    assert.equal(resultExportAbsenceCalls.length, 0);
    assert.equal(
      transition.executedTransitionPaths.includes(
        path.resolve(
          absolute(validatorResultPackageExportProofTransitionRecoveryPath),
        ),
      ),
      true,
    );
  } else {
    assert.equal(resultExportAbsenceCalls.length, 1);
  }
  for (const validatorPath of retainedValidatorPaths) {
    assert.equal(
      transition.trace.existsCalls.filter(
        (call) => call.path === path.resolve(absolute(validatorPath)),
      ).length,
      1,
      validatorPath,
    );
  }
  assert.match(
    recoveryText,
    /TRACKED_DOCS_ONLY_OMITTED_CONTRACT_PROOF_CONFLICT_RECOVERY_DEFINED/u,
  );
  assert.match(
    recoveryText,
    /REPO_NEXT_ACTION:\none separate focused contract-proof recovery alignment remains before the original two-file validator-result package schema export/u,
  );
  assert.notEqual(finalNoConclusionStart, -1);
  assert.notEqual(finalNoConclusionEnd, -1);
  assert.equal(
    normalize(
      recoveryText.slice(
        finalNoConclusionStart + finalNoConclusionHeading.length,
        finalNoConclusionEnd,
      ),
    ),
    validatorResultPackageExportRecoveryFinalNoConclusionParagraph,
  );
});

test("monitor recovery correction reclassifies one active rule and preserves the ordered export gate", () => {
  const correctionText = readRequired(
    validatorResultPackageExportProofTransitionMonitorRecoveryCorrectionPath,
  );
  const originalTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const firstRecoveryText = readRequired(
    validatorResultPackageExportProofTransitionRecoveryPath,
  );
  const contractProofPath = completedPackageExportProofAlignmentPaths[0];
  const schemaScaffoldMonitorPath =
    completedPackageExportProofAlignmentPaths[5];
  const schemaScaffoldMonitorText = readRequired(schemaScaffoldMonitorPath);
  const canonicalSourcesSection = readSection(
    correctionText,
    "2. Canonical Sources",
    "3. Preserved History And Corrected Operative Count",
  );
  const historySection = readSection(
    correctionText,
    "3. Preserved History And Corrected Operative Count",
    "4. Exact Monitor Reclassification",
  );
  const reclassificationSection = readSection(
    correctionText,
    "4. Exact Monitor Reclassification",
    "5. Exact Current Correction Slice",
  );
  const currentScopeSection = readSection(
    correctionText,
    "5. Exact Current Correction Slice",
    "6. First Later Alignment: Schema-Scaffold Monitor",
  );
  const monitorAlignmentSection = readSection(
    correctionText,
    "6. First Later Alignment: Schema-Scaffold Monitor",
    "7. Second Later Alignment: Contract Proof",
  );
  const contractAlignmentSection = readSection(
    correctionText,
    "7. Second Later Alignment: Contract Proof",
    "8. Preserved Final Two-File Export",
  );
  const finalExportSection = readSection(
    correctionText,
    "8. Preserved Final Two-File Export",
    "9. Non-Interference And Proof Boundary",
  );
  const nonInterferenceSection = readSection(
    correctionText,
    "9. Non-Interference And Proof Boundary",
    "10. Final No-Conclusion Boundary",
  );
  const preambleEnd = correctionText.indexOf("\n## 1. Purpose\n");

  assert.notEqual(preambleEnd, -1);
  assert.deepEqual(
    correctionText.slice(0, preambleEnd).split("\n").filter(Boolean),
    [
      "# Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Validator-Result Package Schema Export Proof Transition Monitor Recovery Correction Prerequisite Boundary v1",
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_MONITOR_RECOVERY_CORRECTION_PREREQUISITE_BOUNDARY",
      "DOCS_ONLY",
      "APPEND_ONLY_MONITOR_RECOVERY_CORRECTION_PREREQUISITE",
      "OWNER_SELECTED_VALIDATOR_RESULT_PACKAGE_EXPORT_SCOPE_PRESERVED",
      "HISTORICAL_NINE_SURFACE_INVENTORY_PRESERVED",
      "FIRST_RECOVERY_TEN_SURFACE_INVENTORY_PRESERVED",
      "FIRST_RECOVERY_NINE_ALIGNMENT_COUNT_PRESERVED_AS_HISTORICAL",
      "ONE_ACTIVE_MONITOR_RULE_RECLASSIFIED",
      "ONE_PROPAGATED_MONITOR_FAILURE_REMAINS_DERIVATIVE",
      "OPERATIVE_ALIGNMENT_ACTION_COUNT_CORRECTED_TO_TEN",
      "EXACT_TWO_FILE_CORRECTION_SCOPE_DEFINED",
      "VALIDATOR_RESULT_PACKAGE_EXPORT_NOT_CREATED",
      "PACKAGE_INDEX_NOT_CHANGED",
      "SCHEMA_NOT_CHANGED",
      "VALIDATOR_RESULT_SCHEMA_NOT_CHANGED",
      "VALIDATOR_NOT_CREATED",
      "VALIDATOR_DISPATCH_NOT_CHANGED",
      "VALIDATION_EXECUTION_NOT_CREATED",
      "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
      "SUBJECT_EXISTENCE_MEMBERSHIP_OR_TRUTH_VERIFICATION_NOT_CREATED",
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
      "NO_PRODUCT_CANDIDATE_CREATED",
      "EXTERNAL_USE_NOT_AUTHORIZED",
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    ],
  );
  assert.deepEqual(bulletItems(canonicalSourcesSection), [
    "`docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md`",
    "`" + validatorResultPackageExportProofTransitionPath + "`",
    "`" + validatorResultPackageExportProofTransitionRecoveryPath + "`",
    "`" + schemaScaffoldMonitorPath + "`",
    "`" + contractProofPath + "`",
    "`" + proofPath + "`",
  ]);
  const canonicalBoundaryStart = canonicalSourcesSection.indexOf(
    "\n\nThese sources supply only",
  );
  assert.notEqual(canonicalBoundaryStart, -1);
  assert.equal(
    normalize(canonicalSourcesSection.slice(canonicalBoundaryStart)),
    "These sources supply only the selected export scope, historical transition records, observed proof execution, and fail-closed monitoring behavior. They supply no new domain, validation, approval, handoff, release, or runtime semantics.",
  );
  assert.deepEqual(markdownTables(historySection), [
    [
      "| Measure | Preserved or corrected value |",
      "| --- | --- |",
      "| historical unique proof surfaces | `9` |",
      "| first-recovery unique proof surfaces | `10` |",
      "| corrected operative unique proof surfaces | `10` |",
      "| historical focused alignment actions | `8` |",
      "| first-recovery focused alignment actions | `9` |",
      "| additional monitor recovery alignment action | `1` |",
      "| corrected operative focused alignment actions | `10` |",
    ],
  ]);
  for (const [marker, value] of [
    ["HISTORICAL_REGISTERED_UNIQUE_PROOF_SURFACE_COUNT", "9"],
    ["FIRST_RECOVERY_UNIQUE_PROOF_SURFACE_COUNT", "10"],
    ["CORRECTED_OPERATIVE_UNIQUE_PROOF_SURFACE_COUNT", "10"],
    ["HISTORICAL_REGISTERED_FOCUSED_ALIGNMENT_ACTION_COUNT", "8"],
    ["FIRST_RECOVERY_FOCUSED_ALIGNMENT_ACTION_COUNT", "9"],
    ["ADDITIONAL_MONITOR_RECOVERY_ALIGNMENT_ACTION_COUNT", "1"],
    ["CORRECTED_OPERATIVE_FOCUSED_ALIGNMENT_ACTION_COUNT", "10"],
    ["ACTIVE_RECLASSIFIED_MONITOR_RULE_COUNT", "1"],
    ["PROPAGATED_DERIVATIVE_MONITOR_FAILURE_COUNT", "1"],
    ["CURRENT_MONITOR_RECOVERY_CORRECTION_FILE_COUNT", "2"],
    ["SCHEMA_SCAFFOLD_MONITOR_RECOVERY_ALIGNMENT_FILE_COUNT", "1"],
    ["SCHEMA_SCAFFOLD_MONITOR_RECOVERY_ADMISSION_CASE_COUNT", "4"],
    ["SCHEMA_SCAFFOLD_MONITOR_RECOVERY_ALIGNMENT_STEP_COUNT", "9"],
    ["CONTRACT_PROOF_RECOVERY_ALIGNMENT_FILE_COUNT", "1"],
    ["CONTRACT_PROOF_RECOVERY_ALIGNMENT_STEP_COUNT", "8"],
    ["PRESERVED_FINAL_VALIDATOR_RESULT_PACKAGE_EXPORT_FILE_COUNT", "2"],
  ]) {
    assertMarkerValue(correctionText, marker, value);
  }
  assertMarkerValue(
    originalTransitionText,
    "VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT",
    "9",
  );
  assertMarkerValue(
    originalTransitionText,
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT",
    "8",
  );
  assertMarkerValue(
    firstRecoveryText,
    "RECOVERED_TOTAL_LIVE_PROOF_CONFLICT_COUNT",
    "10",
  );
  assertMarkerValue(
    firstRecoveryText,
    "RECOVERED_TOTAL_FOCUSED_ALIGNMENT_COUNT",
    "9",
  );
  assertMarkerValue(
    firstRecoveryText,
    "DERIVATIVE_MONITOR_FAILURE_COUNT",
    "2",
  );
  assert.deepEqual(markdownTables(reclassificationSection), [
    [
      "| Position | Proof monitor | Observed behavior | Corrected classification |",
      "| --- | --- | --- | --- |",
      "| 1 | `" +
        schemaScaffoldMonitorPath +
        "` | treats a result-export-aligned proof as valid only when its path occurs in the historical validator-result package-export transition inventory | `ACTIVE_MONITOR_RECOVERY_ALIGNMENT_REQUIRED` |",
      "| 2 | `" +
        proofPath +
        "` | executes the schema-scaffold monitor and propagates its failure | `DERIVATIVE_AFTER_SCHEMA_SCAFFOLD_MONITOR_EXECUTION` |",
    ],
  ]);
  assert.deepEqual(markdownTables(currentScopeSection), [
    [
      "| Position | Correction path | Exact action |",
      "| --- | --- | --- |",
      "| 1 | `" +
        validatorResultPackageExportProofTransitionMonitorRecoveryCorrectionPath +
        "` | create this append-only monitor correction prerequisite |",
      "| 2 | `" +
        proofPath +
        "` | freeze the reclassification, corrected sequence, continued export block, and future monitor-correction anchor |",
    ],
  ]);
  const monitorAlignmentCountMarker =
    "\n\nSCHEMA_SCAFFOLD_MONITOR_RECOVERY_ALIGNMENT_FILE_COUNT:";
  const monitorAlignmentTargetEnd = monitorAlignmentSection.indexOf(
    monitorAlignmentCountMarker,
  );
  assert.notEqual(monitorAlignmentTargetEnd, -1);
  assert.equal(
    normalize(monitorAlignmentSection.slice(0, monitorAlignmentTargetEnd)),
    "One separate focused alignment must modify only: `" +
      schemaScaffoldMonitorPath +
      "`",
  );
  assert.deepEqual(markdownTables(monitorAlignmentSection), [
    [
      "| Position | Alignment case | Required executed anchors | Required inventory evidence | Expected result |",
      "| --- | --- | --- | --- | --- |",
      "| 1 | exact historically listed alignment path | historical validator-result package-export transition | exact historical transition row | `ALLOW_HISTORICAL_ALIGNMENT` |",
      "| 2 | exact omitted contract-proof path | historical validator-result package-export transition plus first recovery | exact first-recovery omitted-conflict row | `ALLOW_RECOVERED_CONTRACT_ALIGNMENT` |",
      "| 3 | exact omitted contract-proof path with first-recovery anchor only | first recovery only | exact first-recovery omitted-conflict row | `REJECT_MISSING_HISTORICAL_ANCHOR` |",
      "| 4 | any other path absent from both inventories | any anchor set | no exact historical or first-recovery row | `REJECT_UNREGISTERED_ALIGNMENT` |",
    ],
  ]);
  assert.deepEqual(orderedItems(monitorAlignmentSection), [
    "preserve the complete historical proof-conflict and alignment-path inventories",
    "load the first recovery and this monitor correction through the proof's required-file reader",
    "preserve the historical validator-result package-export transition anchor",
    "keep the historical transition-inventory requirement for every historically listed alignment",
    "recognize only the omitted contract proof through the exact first-recovery record",
    "require the omitted contract proof to execute both the historical transition and first-recovery anchors when aligned",
    "implement and directly fixture-test the exact four-case admission matrix above",
    "retain both validator-file live absence checks and their present-path fail-closed behavior",
    "create no export, validator, dispatch, checkpoint, approval effect, handoff, delivery, release, or runtime behavior",
  ]);
  const contractAlignmentCountMarker =
    "\n\nCONTRACT_PROOF_RECOVERY_ALIGNMENT_FILE_COUNT:";
  const contractAlignmentTargetEnd = contractAlignmentSection.indexOf(
    contractAlignmentCountMarker,
  );
  assert.notEqual(contractAlignmentTargetEnd, -1);
  assert.equal(
    normalize(contractAlignmentSection.slice(0, contractAlignmentTargetEnd)),
    "Only after Section 6 is tracked may one separate focused alignment modify only: `" +
      contractProofPath +
      "`",
  );
  assert.deepEqual(orderedItems(contractAlignmentSection), [
    "preserve the complete historical candidate, validator-result, package-export, and validator sibling path inventory",
    "load the historical validator-result package-export transition through the proof's required-file reader",
    "load the first recovery through the proof's required-file reader",
    "identify only the focused validator-result package-export proof as released from live absence checking",
    "retain exactly the two validator-file live absence checks",
    "retain present-path fail-closed behavior for both validator files",
    "preserve every decision-basis contract field, mapping, lifecycle, review, privacy, and no-conclusion assertion",
    "create no export, validator, dispatch, checkpoint, approval effect, handoff, delivery, release, or runtime behavior",
  ]);
  assert.deepEqual(markdownTables(finalExportSection), [
    [
      "| Position | Final export path | Preserved action |",
      "| --- | --- | --- |",
      "| 1 | `packages/schemas/src/index.js` | add one validator-result schema binding and export |",
      "| 2 | `" +
        validatorResultExportProofPath +
        "` | add the focused validator-result package-export proof |",
    ],
  ]);
  const finalExportTableStart = finalExportSection.indexOf(
    "\n\n| Position | Final export path | Preserved action |",
  );
  assert.notEqual(finalExportTableStart, -1);
  assert.equal(
    normalize(finalExportSection.slice(0, finalExportTableStart)),
    "Only after both later alignments are tracked may the original exact two-file `CONTRACT_ONLY` export slice modify or create:",
  );
  const finalExportSymbolStart = finalExportSection.indexOf(
    "\n\nThe exact export symbol remains:",
  );
  assert.notEqual(finalExportSymbolStart, -1);
  assert.equal(
    normalize(finalExportSection.slice(finalExportSymbolStart)),
    "The exact export symbol remains: `" +
      validatorResultExportName +
      "` This correction does not add either target and does not broaden the final slice.",
  );
  assert.deepEqual(bulletItems(nonInterferenceSection), [
    "preserve the original nine-surface transition inventory as historical documentation",
    "preserve the first recovery's ten-surface inventory as historical documentation",
    "correct only the operative alignment-action count and sequence",
    "register exactly one active monitor rule in an already counted proof surface",
    "retain one propagated package-scope monitor failure as derivative",
    "preserve both schemas, all selected schema semantics, and the completed candidate schema export",
    "create no validator-result package export in this correction",
    "retain both validator-file live absence assertions",
    "modify no file outside the exact two-file correction scope",
    "create no validator, dispatch, helper, registry, cross-reference checkpoint, admissibility checkpoint, decision-basis or subject verifier, issuer, provenance, session, or identity verifier, trusted-time or lifecycle-currentness evaluator, reviewer-role or authority resolver, approval effect, handoff, delivery, release, persistence, API, route, UI, audit, provider, model, logging, telemetry, or executed-run behavior",
    "inspect or process no raw, private, source, case, decision-basis, subject, issuer, provenance, session, identity-provider, credential, authorship, or real-evidence material",
    "assign no severity, recommend no remediation, resolve no blocker, acquire no metadata, execute no real private run, and reopen no domain-specific boundary",
    "preserve human/professional review as the release gate",
  ]);
  const proofBoundaryStart = nonInterferenceSection.indexOf(
    "\n\nThis correction does not prove",
  );
  assert.notEqual(proofBoundaryStart, -1);
  assert.equal(
    normalize(nonInterferenceSection.slice(proofBoundaryStart)),
    "This correction does not prove export correctness, validator correctness, validation execution, decision-basis existence, subject existence, membership, uniqueness, truth, relevance, support, sufficiency, issuer trust, provenance trust, review-session validity, reviewer presence, identity authenticity, professional qualification, trusted time, lifecycle currentness, reviewer role, reviewer authority, reference resolution, admissibility, approval effect, handoff eligibility, legal or evidentiary correctness, professional approval, technical sign-off, product or release readiness, external-use authorization, security, compliance, or case truth.",
  );
  const finalNoConclusionHeading =
    "## 10. Final No-Conclusion Boundary\n\n";
  const finalNoConclusionStart = correctionText.indexOf(
    finalNoConclusionHeading,
  );
  const finalNoConclusionStatusMarker =
    "\n\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_MONITOR_RECOVERY_CORRECTION_PREREQUISITE_STATUS:";
  const finalNoConclusionEnd = correctionText.indexOf(
    finalNoConclusionStatusMarker,
    finalNoConclusionStart,
  );
  assert.notEqual(finalNoConclusionStart, -1);
  assert.notEqual(finalNoConclusionEnd, -1);
  assert.equal(
    normalize(
      correctionText.slice(
        finalNoConclusionStart + finalNoConclusionHeading.length,
        finalNoConclusionEnd,
      ),
    ),
    "This monitor recovery correction prerequisite is not actual human review, professional review, legal review, technical review, evidentiary review, decision-basis or subject-existence verification, subject-membership verification, subject-pair uniqueness verification, subject-truth or subject-authenticity verification, relevance, support, sufficiency or probative-value verification, issuer-trust or provenance verification, review-session or identity verification, trusted-time or lifecycle-currentness verification, reviewer-role or authority verification, authentication, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, admissibility evidence, approval effect, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, finding, severity assignment, remediation recommendation, blocker resolution, metadata acquisition, real private run, domain-specific reopening, handoff approval, delivery approval, case-truth conclusion, or real-evidence review.",
  );
  assert.match(
    correctionText,
    /TRACKED_DOCS_ONLY_ACTIVE_MONITOR_RECOVERY_CORRECTION_DEFINED/u,
  );
  assert.match(
    correctionText,
    /REPO_NEXT_ACTION:\none separate schema-scaffold monitor recovery alignment remains before the contract-proof recovery alignment and final two-file validator-result package schema export/u,
  );

  const monitorTrace = executedFileSystemCalls(schemaScaffoldMonitorPath);
  const resolvedMonitorPath = fs.realpathSync(absolute(schemaScaffoldMonitorPath));
  const executedRequiredRead = (relativePath) =>
    monitorTrace.readCalls.some(
      (call) =>
        call.path === path.resolve(absolute(relativePath)) &&
        call.callSites.some(
          (site) =>
            site.functionName === "readRequired" &&
            typeof site.scriptName === "string" &&
            path.resolve(site.scriptName) === resolvedMonitorPath,
        ),
    );
  const monitorCorrectionAligned = executedRequiredRead(
    validatorResultPackageExportProofTransitionMonitorRecoveryCorrectionPath,
  );
  const monitorAdmissionResult = (alignmentPath, executedAnchorPaths) => {
    const historicalRow =
      "`" + alignmentPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`";
    if (originalTransitionText.includes(historicalRow)) {
      return executedAnchorPaths.includes(
        validatorResultPackageExportProofTransitionPath,
      )
        ? "ALLOW_HISTORICAL_ALIGNMENT"
        : "REJECT_MISSING_HISTORICAL_ANCHOR";
    }
    const recoveredContract =
      alignmentPath === contractProofPath &&
      firstRecoveryText.includes(
        "`" +
          contractProofPath +
          "` | includes the focused validator-result package-export proof in an active retained-sibling loop and asserts live filesystem absence | `SEPARATE_FOCUSED_RECOVERY_ALIGNMENT_REQUIRED` |",
      );
    if (recoveredContract) {
      if (
        !executedAnchorPaths.includes(
          validatorResultPackageExportProofTransitionPath,
        )
      ) {
        return "REJECT_MISSING_HISTORICAL_ANCHOR";
      }
      return executedAnchorPaths.includes(
        validatorResultPackageExportProofTransitionRecoveryPath,
      )
        ? "ALLOW_RECOVERED_CONTRACT_ALIGNMENT"
        : "REJECT_UNREGISTERED_ALIGNMENT";
    }
    return "REJECT_UNREGISTERED_ALIGNMENT";
  };
  const historicalAlignmentPath =
    completedPackageExportProofAlignmentPaths[5];
  assert.deepEqual(
    [
      monitorAdmissionResult(historicalAlignmentPath, [
        validatorResultPackageExportProofTransitionPath,
      ]),
      monitorAdmissionResult(contractProofPath, [
        validatorResultPackageExportProofTransitionPath,
        validatorResultPackageExportProofTransitionRecoveryPath,
      ]),
      monitorAdmissionResult(contractProofPath, [
        validatorResultPackageExportProofTransitionRecoveryPath,
      ]),
      monitorAdmissionResult(
        "tests/unregistered-decision-basis-result-export-alignment.test.js",
        [
          validatorResultPackageExportProofTransitionPath,
          validatorResultPackageExportProofTransitionRecoveryPath,
        ],
      ),
    ],
    [
      "ALLOW_HISTORICAL_ALIGNMENT",
      "ALLOW_RECOVERED_CONTRACT_ALIGNMENT",
      "REJECT_MISSING_HISTORICAL_ANCHOR",
      "REJECT_UNREGISTERED_ALIGNMENT",
    ],
  );
  if (monitorCorrectionAligned) {
    assert.equal(
      executedRequiredRead(validatorResultPackageExportProofTransitionPath),
      true,
    );
    assert.equal(
      executedRequiredRead(
        validatorResultPackageExportProofTransitionRecoveryPath,
      ),
      true,
    );
    for (const fragment of [
      validatorResultPackageExportProofTransitionMonitorRecoveryCorrectionPath,
      validatorResultPackageExportProofTransitionRecoveryPath,
      contractProofPath,
      "ACTIVE_MONITOR_RECOVERY_ALIGNMENT_REQUIRED",
      "ALLOW_HISTORICAL_ALIGNMENT",
      "ALLOW_RECOVERED_CONTRACT_ALIGNMENT",
      "REJECT_MISSING_HISTORICAL_ANCHOR",
      "REJECT_UNREGISTERED_ALIGNMENT",
      "recovery-aware monitor admission matrix",
    ]) {
      assert.equal(
        schemaScaffoldMonitorText.includes(fragment),
        true,
        fragment,
      );
    }
  } else {
    assert.equal(
      schemaScaffoldMonitorText.includes(
        validatorResultPackageExportProofTransitionMonitorRecoveryCorrectionPath,
      ),
      false,
    );
    for (const fragment of [
      "if (resultExportAligned)",
      "validatorResultPackageExportTransitionText.includes(",
      '"`" + alignmentPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`"',
      'alignmentPath + ": validator-result export transition inventory"',
    ]) {
      assert.equal(
        schemaScaffoldMonitorText.includes(fragment),
        true,
        fragment,
      );
    }
  }
});

test("package-export scope references exact sources and selected sequence", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY",
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

test("purpose and convention boundary target decision basis exactly", () => {
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
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Contract Scaffold",
  );
  assert.deepEqual(markdownTables(section), [schemaIdentityTable, boundedFieldTable]);
  assert.deepEqual(orderedItems(section), rootFields.map((field) => "`" + field + "`"));
  assert.deepEqual(schema.required, rootFields);
  assert.deepEqual(Object.keys(schema.properties), rootFields);
  assert.equal(schema.additionalProperties, false);
  assert.equal(
    schema.properties.contract_id.const,
    "human_review.controlled_handoff_human_professional_approval_decision_basis_evidence",
  );
  assert.equal(schema.properties.contract_version.const, "1.0.0");
  assert.equal(schema.properties.verification_posture.const, "NOT_VERIFIED_BY_CONTRACT");
  assert.equal(schema.properties.human_professional_review_required.const, true);
  assert.deepEqual(schema.properties.reviewer_role.enum, reviewerRoles);
  assert.deepEqual(schema.properties.decision.enum, decisions);
  assert.deepEqual(schema.properties.basis_subject_kind.enum, basisSubjectKinds);
  assert.deepEqual(schema.properties.basis_subject_ref, { type: "string" });
  assert.equal(schema.properties.basis_posture.const, "DECISION_BASIS_CANDIDATE_ONLY");
  assert.deepEqual(
    schema.properties.basis_lifecycle_posture.enum,
    lifecyclePostures,
  );

  for (const [field, pattern] of Object.entries(namespaceReferencePatterns)) {
    assert.equal(schema.properties[field].pattern, pattern, field);
  }
  assert.equal(schema.allOf.length, basisSubjectMappings.length);
  for (const [index, [kind, pattern]] of basisSubjectMappings.entries()) {
    const branch = schema.allOf[index];
    assert.deepEqual(branch.if.required, ["basis_subject_kind"]);
    assert.equal(branch.if.properties.basis_subject_kind.const, kind);
    assert.equal(branch.then.properties.basis_subject_ref.pattern, pattern);
  }
  for (const field of genericReferenceFields) {
    assert.equal(schema.properties[field].pattern, genericReferencePattern, field);
    assert.deepEqual(schema.properties[field].not.anyOf, genericReferenceExclusions, field);
  }

  const expectedCounts = {
    TRACKED_SCHEMA_ROOT_FIELD_COUNT: 16,
    TRACKED_SCHEMA_NAMESPACE_REFERENCE_FIELD_COUNT: 5,
    TRACKED_SCHEMA_GENERIC_REFERENCE_FIELD_COUNT: 2,
    TRACKED_SCHEMA_CONST_COUNT: 11,
    TRACKED_SCHEMA_PATTERN_COUNT: 26,
    TRACKED_SCHEMA_ENUM_COUNT: 6,
    TRACKED_SCHEMA_CLOSED_OBJECT_COUNT: 1,
    TRACKED_SCHEMA_NOT_COUNT: 2,
    TRACKED_SCHEMA_ANYOF_COUNT: 2,
    TRACKED_SCHEMA_REF_COUNT: 0,
    TRACKED_SCHEMA_ALLOF_COUNT: 1,
    TRACKED_SCHEMA_IF_COUNT: 6,
    TRACKED_SCHEMA_THEN_COUNT: 6,
    TRACKED_SCHEMA_MIN_ITEMS_COUNT: 0,
    TRACKED_SCHEMA_MAX_ITEMS_COUNT: 0,
    TRACKED_SCHEMA_UNIQUE_ITEMS_COUNT: 0,
  };
  for (const [marker, value] of Object.entries(expectedCounts)) {
    assertMarkerValue(docsText, marker, String(value));
  }
  assert.equal(countKey(schema, "const"), 11);
  assert.equal(countKey(schema, "pattern"), 26);
  assert.equal(countKey(schema, "enum"), 6);
  assert.equal(countKey(schema, "additionalProperties", (value) => value === false), 1);
  assert.equal(countKey(schema, "not"), 2);
  assert.equal(countKey(schema, "anyOf"), 2);
  assert.equal(countKey(schema, "$ref"), 0);
  assert.equal(countKey(schema, "allOf"), 1);
  assert.equal(countKey(schema, "if"), 6);
  assert.equal(countKey(schema, "then"), 6);
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
      "`../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json`",
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

test("candidate and validator-result exports remain exact separate slices", () => {
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

test("proof transition prerequisite and exact 1/7 partition are frozen", () => {
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
  const controllingSourceLead =
    "The controlling decision basis evidence sources are:\n\n";
  const precedentSourceMarker =
    "\n\nRepository transition precedent only:\n\n";
  assert.equal(canonicalSourcesSection.startsWith(controllingSourceLead), true);
  const sourceGroups = canonicalSourcesSection
    .slice(controllingSourceLead.length)
    .split(precedentSourceMarker);
  assert.equal(sourceGroups.length, 2);
  assert.equal(
    sourceGroups[0],
    packageExportTransitionControllingSourceItems
      .map((item) => "- " + item)
      .join("\n"),
  );
  const precedentBoundaryMarker = "\n\nThe controlling sources supply";
  const precedentBoundaryStart = sourceGroups[1].indexOf(
    precedentBoundaryMarker,
  );
  assert.notEqual(precedentBoundaryStart, -1);
  assert.equal(
    sourceGroups[1].slice(0, precedentBoundaryStart),
    packageExportTransitionPrecedentSourceItems
      .map((item) => "- " + item)
      .join("\n"),
  );
  assert.equal(
    normalize(sourceGroups[1].slice(precedentBoundaryStart + 2)),
    packageExportTransitionPrecedentBoundaryParagraph,
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
  assert.deepEqual(markdownTables(classificationSection), [
    packageExportTransitionClassificationTable,
  ]);
  assert.equal(
    normalize(classificationSection).endsWith(
      packageExportTransitionClassificationBoundaryParagraph,
    ),
    true,
  );
  assert.equal(
    normalize(classificationSection),
    normalize(
      [
        ...packageExportTransitionClassificationTable,
        "",
        "PROOF_CONFLICT_CLASSIFICATION:",
        "HISTORICAL_SCOPE_PROOF_CORRECT_CANDIDATE_PACKAGE_EXPORT_ASSERTIONS_PARTIALLY_SUPERSEDED",
        "",
        packageExportTransitionClassificationBoundaryParagraph,
      ].join("\n"),
    ),
  );
  assert.equal(
    transitionText.includes(
      "OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A_PRESERVED",
    ),
    true,
  );
  assert.equal(
    transitionText.includes(
      "HISTORICAL_CANDIDATE_SCHEMA_UNEXPORTED_MARKERS_PRESERVED",
    ),
    true,
  );
  assert.equal(
    transitionText.includes(
      "PROOF_CONFLICT_CLASSIFICATION:\nHISTORICAL_SCOPE_PROOF_CORRECT_CANDIDATE_PACKAGE_EXPORT_ASSERTIONS_PARTIALLY_SUPERSEDED",
    ),
    true,
  );
  assert.deepEqual(markdownTables(targetSection), [
    packageExportTransitionTargetTable,
  ]);
  assert.deepEqual(markdownTables(conflictSection), [
    packageExportTransitionConflictTable,
  ]);
  assert.deepEqual(markdownTables(retainedSection), [
    packageExportTransitionRetainedSiblingTable,
  ]);
  assert.deepEqual(markdownTables(currentScopeSection), [
    packageExportTransitionCurrentScopeTable,
  ]);
  assert.deepEqual(
    orderedItems(directTransitionSection),
    packageExportTransitionSteps,
  );
  assert.equal(
    normalize(directTransitionSection).endsWith(
      packageExportTransitionDirectBoundaryParagraph,
    ),
    true,
  );
  assert.equal(
    normalize(directTransitionSection),
    normalize(
      [
        "The package-export scope proof must:",
        "",
        ...packageExportTransitionSteps.map(
          (item, index) => `${index + 1}. ${item}`,
        ),
        "",
        "DIRECT_PACKAGE_EXPORT_SCOPE_PROOF_TRANSITION_STEP_COUNT:",
        "12",
        "",
        packageExportTransitionDirectBoundaryParagraph,
      ].join("\n"),
    ),
  );
  const laterExportMarker =
    "\n\nOnly after all seven alignments are tracked may the exact two-file";
  const laterExportStart = laterAlignmentSection.indexOf(laterExportMarker);
  assert.notEqual(laterExportStart, -1);
  assert.equal(
    normalize(laterAlignmentSection.slice(0, laterExportStart)),
    packageExportTransitionLaterAlignmentBoundaryParagraph,
  );
  assert.deepEqual(
    orderedItems(laterAlignmentSection),
    packageExportTransitionLaterExportItems,
  );
  assert.equal(
    normalize(laterAlignmentSection).includes(
      "Only after all seven alignments are tracked may the exact two-file `CONTRACT_ONLY` package-export slice add:",
    ),
    true,
  );
  assert.equal(
    normalize(laterAlignmentSection).endsWith(
      "The validator-result schema-object export remains a separate later slice.",
    ),
    true,
  );
  assert.equal(
    normalize(laterAlignmentSection),
    normalize(
      [
        packageExportTransitionLaterAlignmentBoundaryParagraph,
        "",
        "Only after all seven alignments are tracked may the exact two-file",
        "`CONTRACT_ONLY` package-export slice add:",
        "",
        ...packageExportTransitionLaterExportItems.map(
          (item, index) => `${index + 1}. ${item}`,
        ),
        "",
        "The validator-result schema-object export remains a separate later slice.",
      ].join("\n"),
    ),
  );
  assert.deepEqual(
    bulletItems(nonInterferenceSection),
    packageExportTransitionNonInterferenceRules,
  );
  assert.equal(
    normalize(nonInterferenceSection).endsWith(
      packageExportTransitionProofLimitParagraph,
    ),
    true,
  );
  assert.equal(
    normalize(nonInterferenceSection),
    normalize(
      [
        ...packageExportTransitionNonInterferenceRules.map(
          (rule) => "- " + rule,
        ),
        "",
        packageExportTransitionProofLimitParagraph,
      ].join("\n"),
    ),
  );
  assert.equal(remainingPackageExportProofAlignmentPaths.length, 7);
  assert.equal(retainedLaterPackageAndValidatorPaths.length, 3);
  assert.deepEqual(
    allPackageAndValidatorSiblingPaths.slice(3),
    retainedLaterPackageAndValidatorPaths,
  );
  assertMarkerValue(
    transitionText,
    "PACKAGE_SCHEMA_EXPORT_TARGET_PATH_COUNT",
    "2",
  );
  assertMarkerValue(
    transitionText,
    "PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT",
    "8",
  );
  assertMarkerValue(
    transitionText,
    "DIRECT_PACKAGE_EXPORT_SCOPE_PROOF_TRANSITION_COUNT",
    "1",
  );
  assertMarkerValue(
    transitionText,
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT",
    "7",
  );
  assertMarkerValue(
    transitionText,
    "RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT",
    "3",
  );
  assertMarkerValue(
    transitionText,
    "CURRENT_PREREQUISITE_FILE_COUNT",
    "2",
  );
  assertMarkerValue(
    transitionText,
    "DIRECT_PACKAGE_EXPORT_SCOPE_PROOF_TRANSITION_STEP_COUNT",
    "12",
  );
  assert.equal(transitionText.includes("`" + candidateExportName + "`"), true);
  assert.equal(
    normalize(transitionText).includes(
      "The selected sequence remains candidate schema export first and " +
        "`" +
        validatorResultExportName +
        "` in a separate later slice.",
    ),
    true,
  );
  assert.deepEqual(completedPackageExportProofAlignmentPaths, [
    "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-contract-boundary-doc-freeze.test.js",
    candidateSchemaProofPath,
    "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
    "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
    "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
    "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
    validatorResultSchemaProofPath,
  ]);
  assert.equal(completedPackageExportProofAlignmentPaths.length, 7);
  assert.equal(activePackageExportProofAlignmentPaths.length, 0);
  const completedContractProofText = readRequired(
    completedPackageExportProofAlignmentPaths[0],
  );
  assert.deepEqual(
    literalStringArrayValues(
      completedContractProofText,
      "retainedLaterSiblingPaths",
    ),
    allPackageAndValidatorSiblingPaths,
  );
  for (const fragment of [
    "const candidatePackageExportProofPath =",
    packageExportProofTransitionPath,
    "SEPARATE_FOCUSED_ALIGNMENT_REQUIRED",
  ]) {
    assert.equal(
      completedContractProofText.includes(fragment),
      true,
      fragment,
    );
  }
  assertPendingOrAlignedResultExportProof(
    completedContractProofText,
    completedPackageExportProofAlignmentPaths[0],
    [
      "retainedLaterSiblingPaths.slice(2);",
      "const activePackageAndValidatorSiblingPaths =",
      "retainedPackageAndValidatorSiblingPaths.slice(1);",
      "for (const retainedSiblingPath of activePackageAndValidatorSiblingPaths)",
    ],
  );
  assert.equal(
    completedContractProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  const completedSchemaProofText = readRequired(candidateSchemaProofPath);
  assert.deepEqual(
    literalStringArrayValues(completedSchemaProofText, "laterSiblingPaths"),
    allPackageAndValidatorSiblingPaths,
  );
  for (const fragment of [
    "const candidatePackageExportProofPath =",
    packageExportProofTransitionPath,
    "SEPARATE_FOCUSED_ALIGNMENT_REQUIRED",
  ]) {
    assert.equal(completedSchemaProofText.includes(fragment), true, fragment);
  }
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
    completedSchemaProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.equal(
    completedSchemaProofText.includes("packageIndex" + ".includes("),
    false,
  );
  const completedScaffoldProofText = readRequired(
    completedPackageExportProofAlignmentPaths[2],
  );
  assert.deepEqual(
    literalStringArrayValues(completedScaffoldProofText, "laterSiblingPaths"),
    allPackageAndValidatorSiblingPaths,
  );
  for (const fragment of [
    "const candidatePackageExportProofPath =",
    packageExportProofTransitionPath,
    "SEPARATE_FOCUSED_ALIGNMENT_REQUIRED",
  ]) {
    assert.equal(completedScaffoldProofText.includes(fragment), true, fragment);
  }
  assertPendingOrAlignedResultExportProof(
    completedScaffoldProofText,
    completedPackageExportProofAlignmentPaths[2],
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
    completedPackageExportProofAlignmentPaths[3],
  );
  assert.deepEqual(
    literalStringArrayValues(
      completedErrorPathProofText,
      "retainedLaterSurfaces",
    ),
    allPackageAndValidatorSiblingPaths,
  );
  for (const fragment of [
    "const candidatePackageExportProofPath =",
    packageExportProofTransitionPath,
    "SEPARATE_FOCUSED_ALIGNMENT_REQUIRED",
  ]) {
    assert.equal(completedErrorPathProofText.includes(fragment), true, fragment);
  }
  assertPendingOrAlignedResultExportProof(
    completedErrorPathProofText,
    completedPackageExportProofAlignmentPaths[3],
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
    completedPackageExportProofAlignmentPaths[4],
  );
  assert.deepEqual(
    literalStringArrayValues(completedReadinessProofText, "reservedLaterPaths"),
    allPackageAndValidatorSiblingPaths,
  );
  assertPendingOrAlignedResultExportProof(
    completedReadinessProofText,
    completedPackageExportProofAlignmentPaths[4],
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
    completedPackageExportProofAlignmentPaths[5],
  );
  assert.deepEqual(
    literalStringArrayValues(
      completedResultScaffoldProofText,
      "retainedSiblingPaths",
    ),
    retainedPackageAndValidatorSiblingPaths,
  );
  for (const fragment of [
    "const candidatePackageExportProofPath = retainedSiblingPaths[0];",
    packageExportProofTransitionPath,
    "SEPARATE_FOCUSED_ALIGNMENT_REQUIRED",
  ]) {
    assert.equal(
      completedResultScaffoldProofText.includes(fragment),
      true,
      fragment,
    );
  }
  assertPendingOrAlignedResultExportProof(
    completedResultScaffoldProofText,
    completedPackageExportProofAlignmentPaths[5],
    [
      "const activeRetainedSiblingPaths = retainedSiblingPaths.slice(1);",
      "for (const retainedPath of activeRetainedSiblingPaths)",
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
    completedPackageExportProofAlignmentPaths[6],
  );
  assert.deepEqual(
    literalStringArrayValues(
      completedResultStructuralProofText,
      "retainedSiblingPaths",
    ),
    retainedPackageAndValidatorSiblingPaths,
  );
  for (const fragment of [
    "const candidatePackageExportProofPath = retainedSiblingPaths[0];",
    path.basename(packageExportProofTransitionPath),
    "SEPARATE_FOCUSED_ALIGNMENT_REQUIRED",
  ]) {
    assert.equal(
      completedResultStructuralProofText.includes(fragment),
      true,
      fragment,
    );
  }
  assertPendingOrAlignedResultExportProof(
    completedResultStructuralProofText,
    completedPackageExportProofAlignmentPaths[6],
    ["const retainedAfterCandidateExportPaths = retainedSiblingPaths.slice(1);"],
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
      assert.equal(
        gateProofText.includes(fragment),
        true,
        gate.relativePath + ": " + fragment,
      );
    }
    for (const fragment of gate.requiredNormalizedFragments || []) {
      assert.equal(
        normalize(gateProofText).includes(fragment),
        true,
        gate.relativePath + ": " + fragment,
      );
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
    assert.equal(fs.existsSync(absolute(validatorPath)), false, validatorPath);
  }
  for (const retainedValidatorName of retainedValidatorNames) {
    assert.equal(
      hasExactIdentifier(packageIndexText, retainedValidatorName),
      false,
      retainedValidatorName,
    );
  }
  const finalMarker = "## 11. Final No-Conclusion Boundary\n";
  const finalStart = transitionText.indexOf(finalMarker);
  assert.notEqual(finalStart, -1);
  const finalSection = transitionText
    .slice(finalStart + finalMarker.length)
    .trim();
  const statusMarker =
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:";
  const finalParagraph = finalSection
    .slice(0, finalSection.indexOf(statusMarker))
    .trim();
  assert.equal(
    normalize(finalParagraph),
    packageExportTransitionFinalBoundaryParagraph,
  );
  assertMarkerValue(
    transitionText,
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS",
    "TRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED",
  );
  assertMarkerValue(
    transitionText,
    "REPO_NEXT_ACTION",
    "none from this boundary; seven focused proof alignments remain before candidate package schema export",
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
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:";
  const paragraph = section.slice(0, section.indexOf(statusMarker)).trim();

  assert.equal(normalize(paragraph), finalBoundaryParagraph);
  assertMarkerValue(
    docsText,
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS",
    "TRACKED_DOCS_ONLY_CANDIDATE_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  );
  assertMarkerValue(
    docsText,
    "REPO_NEXT_ACTION",
    "none from this boundary; a separate proof-transition prerequisite remains required before candidate package export",
  );
});
