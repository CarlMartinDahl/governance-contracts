"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-contract-boundary-doc-freeze.test.js";
const approvalSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval.json";
const schemaProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionRecoveryPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_RECOVERY_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CROSS_REFERENCE_ADMISSIBILITY_SEMANTICS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-semantics-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-brief.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-chronology.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-declared-packet-review-gaps.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-questions.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-no-conclusion-notice.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json",
];
const candidateSchemaPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema.test.js",
];
const retainedLaterSiblingPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
];
const validatorResultCandidatePaths = retainedLaterSiblingPaths.slice(0, 2);
const retainedPackageAndValidatorSiblingPaths =
  retainedLaterSiblingPaths.slice(2);
const candidatePackageExportProofPath =
  retainedPackageAndValidatorSiblingPaths[0];
const activePackageAndValidatorSiblingPaths =
  retainedPackageAndValidatorSiblingPaths.slice(1);
const validatorResultPackageExportProofPath =
  activePackageAndValidatorSiblingPaths[0];
const retainedValidatorSiblingPaths =
  activePackageAndValidatorSiblingPaths.slice(1);
const laterSiblingPaths = [
  ...candidateSchemaPaths,
  ...retainedLaterSiblingPaths,
];
const subjectSchemaBindings = [
  {
    kind: "SOURCE_REGISTER_SOURCE",
    schemaPath: "schemas/human-review-source-register.json",
    collectionField: "sources",
    definitionField: "sourceEntry",
    referenceField: "source_ref",
    pattern: "^src_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "REVIEW_CHRONOLOGY_ENTRY",
    schemaPath: "schemas/human-review-chronology.json",
    collectionField: "entries",
    definitionField: "chronologyEntry",
    referenceField: "entry_ref",
    pattern: "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "ASSERTED_CLAIM",
    schemaPath: "schemas/human-review-asserted-claim-matrix.json",
    collectionField: "claims",
    definitionField: "claimRow",
    referenceField: "claim_ref",
    pattern: "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "DECLARED_REVIEW_GAP",
    schemaPath: "schemas/human-review-declared-packet-review-gaps.json",
    collectionField: "gaps",
    definitionField: "gapRow",
    referenceField: "gap_ref",
    pattern: "^gap_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "HUMAN_REVIEW_QUESTION",
    schemaPath: "schemas/human-review-questions.json",
    collectionField: "questions",
    definitionField: "questionRow",
    referenceField: "question_ref",
    pattern: "^qst_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "NO_CONCLUSION_NOTICE",
    schemaPath: "schemas/human-review-no-conclusion-notice.json",
    collectionField: "notices",
    definitionField: "noticeRow",
    referenceField: "notice_ref",
    pattern: "^ncn_[a-z0-9][a-z0-9_-]{0,59}$",
  },
];
const expectedStageRows = [
  "| 1 | `OPTION_A` | one separate closed declaration-only decision-basis candidate is supplied directly for every unique declared `decision_basis_ref`; the exact set is necessary but insufficient |",
  "| 2 | `OPTION_A` | exact contract identity and version are defined; `decision_basis_ref` is the candidate's sole identity and no separate evidence-record identity is added |",
  "| 3 | `OPTION_A` | one immutable decision-basis record belongs to one exact approval attempt; reuse across approval attempts, mutation, embedded history, and current-record selection are prohibited |",
  "| 4 | `OPTION_A` | required `approval_ref` and `decision_basis_ref` bind only to the approval candidate in the future outer checkpoint; approval, packet, brief, and fingerprint objects are not embedded |",
  "| 5 | `OPTION_A` | required `decision` reuses the exact approval enum and must equal the approval candidate's decision without establishing support, sufficiency, or approval effect |",
  "| 6 | `OPTION_A` | required `reviewer_ref` and `reviewer_role` bind one exact approval reviewer attribution; no separate basis author or participant membership is added |",
  "| 7 | `OPTION_A` | required `review_session_ref` binds to both the approval candidate and the separately supplied review-session candidate without proving session validity |",
  "| 8 | `OPTION_A` | the candidate is reference-only and contains no free text, rationale, summary, recommendation, conclusion, raw material, source excerpt, or inline Human Review item |",
  "| 9 | `OPTION_A` | required `basis_subject_kind` and `basis_subject_ref` select exactly one item from exactly one of six already governed Human Review subject families |",
  "| 10 | `OPTION_A` | candidates follow approval `decision_basis_refs` order exactly; basis-subject kind/reference pairs are unique and order creates no priority, weight, or probative meaning |",
  "| 11 | `OPTION_A` | `basis_posture` has the sole value `DECISION_BASIS_CANDIDATE_ONLY` and creates no support, relevance, sufficiency, acceptance, or approval effect |",
  "| 12 | `OPTION_A` | required opaque `binding_issuer_ref` and `binding_provenance_ref` declare origin without proving issuer trust, provenance, ownership, or chain of custody |",
  "| 13 | `OPTION_A` | one exact three-value declared basis lifecycle is an immutable structural posture, not verified currentness, revocation proof, or transition history |",
  "| 14 | `OPTION_A` | verification posture is exactly `NOT_VERIFIED_BY_CONTRACT` and human/professional review remains required |",
  "| 15 | `OPTION_A` | version 1 contains no timestamp, TTL, expiry, revocation time, update time, or clock-evidence reference; all temporal evaluation remains separate |",
  "| 16 | `OPTION_A` | the root is one exact closed sixteen-field flat scalar object with no optional, extension, nested, accessor, symbol, or free-text fields |",
  "| 17 | `OPTION_A` | seven internal references are pairwise distinct while approval, session, reviewer, decision, candidate-set, and subject bindings use exact case-sensitive equality without normalization or lookup |",
  "| 18 | `OPTION_A` | the local future validator is descriptor-safe and structural only; every external equality, membership, trust, identity, authority, time, currentness, relevance, sufficiency, admissibility, and approval-effect decision belongs to future outer seams |",
];
const expectedFields = [
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
const expectedFieldRows = [
  "| `contract_id` | string equal to `human_review.controlled_handoff_human_professional_approval_decision_basis_evidence` |",
  "| `contract_version` | string equal to `1.0.0` |",
  "| `decision_basis_ref` | opaque string matching `^rvb_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `approval_ref` | opaque string matching `^apr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `review_session_ref` | opaque string matching `^rvs_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `reviewer_ref` | opaque string matching `^rvr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `reviewer_role` | one exact value from Section 7 |",
  "| `decision` | one exact value from Section 6 |",
  "| `basis_subject_kind` | one exact value from Section 9 |",
  "| `basis_subject_ref` | one exact kind-matched opaque item reference from Section 9 |",
  "| `basis_posture` | string equal to `DECISION_BASIS_CANDIDATE_ONLY` |",
  "| `binding_issuer_ref` | one exact generic opaque reference from Section 12 |",
  "| `binding_provenance_ref` | one exact generic opaque reference from Section 12 |",
  "| `basis_lifecycle_posture` | one exact value from Section 13 |",
  "| `verification_posture` | string equal to `NOT_VERIFIED_BY_CONTRACT` |",
  "| `human_professional_review_required` | boolean equal to `true` |",
];
const expectedDecisionValues = [
  "HUMAN_PROFESSIONAL_GATE_APPROVED",
  "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
  "HUMAN_PROFESSIONAL_GATE_REJECTED",
];
const expectedReviewerRoles = [
  "HUMAN_REVIEWER",
  "PROFESSIONAL_REVIEWER",
];
const expectedSubjectKinds = [
  "SOURCE_REGISTER_SOURCE",
  "REVIEW_CHRONOLOGY_ENTRY",
  "ASSERTED_CLAIM",
  "DECLARED_REVIEW_GAP",
  "HUMAN_REVIEW_QUESTION",
  "NO_CONCLUSION_NOTICE",
];
const expectedSubjectMappingRows = [
  "| `SOURCE_REGISTER_SOURCE` | `^src_[a-z0-9][a-z0-9_-]{0,59}$` | Source Register `sources[].source_ref` |",
  "| `REVIEW_CHRONOLOGY_ENTRY` | `^chr_[a-z0-9][a-z0-9_-]{0,59}$` | Review Chronology `entries[].entry_ref` |",
  "| `ASSERTED_CLAIM` | `^clm_[a-z0-9][a-z0-9_-]{0,59}$` | Asserted Claim Matrix `claims[].claim_ref` |",
  "| `DECLARED_REVIEW_GAP` | `^gap_[a-z0-9][a-z0-9_-]{0,59}$` | Declared Packet Review Gaps `gaps[].gap_ref` |",
  "| `HUMAN_REVIEW_QUESTION` | `^qst_[a-z0-9][a-z0-9_-]{0,59}$` | Human Review Questions `questions[].question_ref` |",
  "| `NO_CONCLUSION_NOTICE` | `^ncn_[a-z0-9][a-z0-9_-]{0,59}$` | No-Conclusion Notice `notices[].notice_ref` |",
];
const expectedSubjectMappingTableRows = [
  "| `basis_subject_kind` | Required `basis_subject_ref` pattern | Direct same-call candidate and item field |",
  "| --- | --- | --- |",
  ...expectedSubjectMappingRows,
];
const expectedApprovalEqualityItems = [
  "exact equality between the candidate's `approval_ref` and `approval_candidate.approval_ref`",
  "exact equality between the candidate's `decision` and `approval_candidate.decision`",
  "exact equality between each candidate's `decision_basis_ref` and the approval `decision_basis_refs` entry at the same canonical position",
  "complete one-to-one ordered coverage of the approval `decision_basis_refs` array with no missing, extra, duplicate, or reordered candidate",
];
const expectedApprovalExclusions = [
  "`packet_ref`",
  "`controlled_handoff_brief_ref`",
  "`controlled_handoff_brief_fingerprint`",
  "`approval_posture`",
  "embedded `decision_support`",
  "`decided_at`",
  "`decision_attestation_ref`",
  "`prior_approval_refs`",
  "`correction_request_refs`",
];
const expectedReviewerSessionEqualityItems = [
  "exact equality between the candidate's `reviewer_ref` and `approval_candidate.reviewer_attribution.reviewer_ref`",
  "exact equality between the candidate's `reviewer_role` and `approval_candidate.reviewer_attribution.reviewer_role`",
  "exact equality between the candidate's `review_session_ref` and `approval_candidate.review_session_ref`",
  "exact equality between the candidate's `review_session_ref` and the separately supplied review-session candidate's `review_session_ref`",
  "exact consistency across the shared approval, session, reviewer, and role fields of the separately supplied reviewer identity, role, and authority evidence candidates under their own contracts",
];
const expectedProhibitedContent = [
  "free-text basis, rationale, reason, explanation, narrative, or summary",
  "recommendation, conclusion, finding, score, severity, rank, weight, or probability",
  "raw source material, source excerpt, evidence excerpt, transcript, message, or attachment",
  "filename, path, URL, locator, query, prompt, response, provider payload, or model output",
  "inline Source Register source, Review Chronology entry, Asserted Claim, Declared Review Gap, Human Review Question, or No-Conclusion Notice",
  "legal rule, legal analysis, evidentiary analysis, credibility assessment, sufficiency assessment, or professional opinion",
  "signature, certificate, credential, key, biometric data, cryptographic proof, or attestation material",
];
const expectedLifecycleValues = [
  "DECISION_BASIS_DECLARED_ACTIVE",
  "DECISION_BASIS_DECLARED_INACTIVE",
  "DECISION_BASIS_DECLARED_REVOKED",
];
const expectedTimeExclusions = [
  "creation, declaration, observation, issuance, decision, update, expiry, or revocation timestamp",
  "TTL, duration, sequence, version counter, or timezone offset",
  "clock-evidence, freshness-evidence, or currentness-evidence reference",
  "prior, replacement, successor, or supersession reference",
];
const expectedInternalReferences = [
  "decision_basis_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "basis_subject_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const expectedNonInterferenceItems = [
  "modify no approval, Controlled Handoff Brief, Human Review subject-family, review-session, decision-attestation, reviewer identity, reviewer role, reviewer authority, or other tracked contract, schema, validator, result schema, package export, checkpoint, or runtime file",
  "create no generic rationale, recommendation, finding, score, legal-reasoning, evidentiary-weight, relevance, sufficiency, probative-value, trusted-clock, currentness, lifecycle-history, replacement, or supersession contract",
  "add no packet, brief, fingerprint, embedded decision-support, prior-approval, correction-request, decision-attestation, reviewer-evidence, timestamp, TTL, expiry, currentness, replacement, rationale, reason, explanation, recommendation, finding, score, weight, or conclusion field to the decision-basis candidate",
  "perform no lookup, dereference, discovery, persistence, registry selection, current-record selection, mutation, deletion, replacement, or supersession",
  "trust no precomputed validator or cross-reference result",
  "inspect or process no raw, private, source, case, identity, session, attestation, credential, provider, model, or real-evidence material",
  "create no subject truth, relevance, support, sufficiency, probative value, reviewer identity, reviewer qualification, reviewer authority, issuer trust, trusted time, freshness, currentness, approval effect, handoff eligibility, release readiness, product candidacy, or external-use authorization",
  "create no legal conclusion, evidentiary conclusion, professional opinion, finding, severity, score, recommendation, remediation, blocker resolution, security finding, compliance certification, or technical sign-off",
];
const expectedProofClaims = [
  "the eighteen Owner-selected Stage A markers and exact stage table are tracked",
  "the exact contract identity, version, sixteen-field root, field order, scalar types, reference patterns, enums, constants, and seven-field pairwise-distinct set are frozen",
  "exact one-candidate-per-reference cardinality, approval-order preservation, immutability, no-reuse, and unique subject-pair postures are frozen",
  "approval, decision, reviewer, review-session, six subject-family, origin, lifecycle, time, verification, privacy, and outer-checkpoint ownership boundaries are explicit",
  "free text, inline material, raw content, schema, validator result, export, validator, checkpoint, clock/currentness matrix, relevance or sufficiency policy, persistence, API, UI, runtime, product, and external-use surfaces remain absent and unauthorized",
];
const expectedPrivacyBoundary =
  "The exact sixteen fields in Section 4 are the complete allowlist. The candidate contains no person name, email address, telephone number, address, account identifier, organization name, title, jurisdiction, license, credential, provider payload, browser identifier, device identifier, IP address, token, cookie, JWT, certificate, signature, key, nonce, secret, URL, file path, raw content, source content, case content, transcript, message, prompt, response, screenshot, image, PDF, metadata, free-text basis, rationale, reason, explanation, recommendation, finding, score, severity, weight, probability, remediation, or conclusion. Opaque references must not be populated with raw or encoded private material, credentials, provider payloads, URLs, paths, source excerpts, evidence content, attestation material, or case content. No unknown key may carry shadow timestamps, lifecycle history, participants, authority, authentication, relevance, sufficiency, currentness, approval, handoff, delivery, or release semantics.";
const expectedValidityBoundary =
  "A structurally valid candidate proves only that one supplied object matches the selected closed scalar shape. It does not prove external reference existence or equality, candidate-set completeness, subject membership, subject truth, subject authenticity, reviewer identity, reviewer authority, session existence, issuer trust, provenance, lifecycle truth, trusted time, freshness, currentness, relevance, support, sufficiency, probative value, approval admissibility, candidate eligibility, or handoff authorization. The future outer checkpoint must stop closed when any candidate or candidate set is missing, extra, duplicated, reordered, structurally invalid, mismatched, unavailable, unknown, unverifiable, stale, inactive, revoked, superseded, disputed, conflicting, or otherwise inadmissible under the later policy matrix. It must also stop closed when a subject kind/reference pair is invalid, duplicated, absent from its named same-call component, present more than once, or bound to a different packet. This document does not define the outer-envelope machine field map, public result identity, public error path map, clock/currentness matrix, relevance or sufficiency policy, or checkpoint implementation. No structural validator result shape, public error code taxonomy, JSON error path map, schema keyword order, validator execution order, package export, consumer, dispatch, checkpoint call, or runtime behavior is selected here.";
const expectedProofCannotEstablish =
  "It cannot prove contract implementation, schema correctness, validator correctness, external equality, candidate-set completeness, subject existence, subject membership, subject truth, subject authenticity, relevance, support, sufficiency, probative value, reviewer identity, reviewer authority, review-session validity, issuer trust, trusted time, lifecycle truth, currentness, approval admissibility, candidate eligibility, runtime behavior, professional review completion, release readiness, product candidacy, or external-use readiness.";
const expectedFinalNoConclusion =
  "This boundary is not human review, professional review, legal review, evidentiary review, identity verification, authentication, reviewer-authorship verification, reviewer-role verification, reviewer-authority verification, session verification, subject verification, source verification, issuer-trust verification, provenance verification, trusted-time verification, currentness verification, lifecycle verification, relevance assessment, support assessment, sufficiency assessment, probative-value assessment, approval, approval effect, handoff authorization, release authorization, product approval, external-use authorization, security review, technical sign-off, compliance certification, source-truth determination, chain-of-custody proof, or case-truth determination.";
const expectedPlainRootPreamble =
  "The candidate is one plain closed object whose prototype is exactly `Object.prototype` or `null`. It has exactly these required fields in this declaration and future structural-validation order:";
const expectedProhibitedRootShape =
  "No field is optional. Unknown string or symbol keys, aliases, accessors, null field values, nested values, arrays, and extension fields are prohibited. Dates, maps, sets, regular expressions, functions, buffers, typed arrays, and other non-scalar field values are invalid.";
const expectedReplacementPosture =
  "A correction, replacement decision, rejection, or other new approval attempt requires a new approval record and a new complete ordered set of decision-basis records with new `decision_basis_ref` values. This contract does not select a current attempt, order attempts, replace a prior record, or authorize deletion or mutation. No generic evidence bag, lookup result, registry result, persistence-loaded candidate, precomputed validator result, or precomputed cross-reference result may substitute for the exact direct candidates.";
const expectedOpaqueReferenceFields = [
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const expectedOpaqueReferenceRules =
  "Each is a string of 1 through 128 characters matching: `^[A-Za-z0-9._:-]{1,128}$` The values `.` and `..` are invalid. Values beginning with `http:`, `https:`, `ftp:`, `file:`, `mailto:`, `data:`, or `javascript:`, compared case-insensitively, are invalid.";
const expectedDeferredOwnershipBoundary =
  "FUTURE_SCHEMA_PATH: DEFERRED_TO_SEPARATE_OWNER_DECISION FUTURE_VALIDATOR_RESULT_SCHEMA_PATH: DEFERRED_TO_SEPARATE_OWNER_DECISION FUTURE_PACKAGE_EXPORT_OWNERSHIP: DEFERRED_TO_SEPARATE_OWNER_DECISION FUTURE_VALIDATOR_CODE_OWNERSHIP: DEFERRED_TO_SEPARATE_OWNER_DECISION FUTURE_OUTER_ENVELOPE_FIELD_AND_ERROR_PATH_MAP: DEFERRED_UNTIL_ALL_DEPENDENCY_CONTRACTS_ARE_TRACKED TRUSTED_CLOCK_CURRENTNESS_REPLACEMENT_MATRIX: SEPARATE_FUTURE_OWNER_DECISION_REQUIRED RELEVANCE_SUFFICIENCY_OR_PROBATIVE_VALUE_POLICY: NOT_CREATED_AND_NOT_AUTHORIZED CURRENT_SAFE_SCHEMA_OR_RUNTIME_STEP: NONE No future path is reserved or authorized by this boundary. Schema scaffold, validator-result semantics, package exports, structural validator, cross-reference integration, clock/currentness policy, relevance or sufficiency policy, consumer selection, and runtime checkpoint remain separate slices with their own review gates.";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function readJsonRequired(relativePath) {
  return JSON.parse(readRequired(relativePath));
}

function sectionBetween(docsText, start, end) {
  const startIndex = docsText.indexOf(start);
  const endIndex = end
    ? docsText.indexOf(end, startIndex + start.length)
    : docsText.length;

  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return docsText.slice(startIndex, endIndex);
}

function numberedItems(section) {
  return [...section.matchAll(/^\d+\. (.+)$/gmu)].map((match) => match[1]);
}

function numberedBacktickValues(section) {
  return [...section.matchAll(/^\d+\. `([^`]+)`$/gmu)].map(
    (match) => match[1],
  );
}

function tableDataRows(section) {
  return section
    .split("\n")
    .filter((line) => line.startsWith("| "))
    .filter((line) => !line.startsWith("| ---"));
}

function normalize(value) {
  return value.replace(/\s+/gu, " ").trim();
}

const docs = readRequired(docsPath);
const approvalSchema = readJsonRequired(approvalSchemaPath);

test("slice history remains exact while candidate package export proof is transition-aligned", () => {
  const proofText = readRequired(proofPath);
  const transitionText = readRequired(schemaProofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionRecoveryText = readRequired(
    validatorResultPackageExportProofTransitionRecoveryPath,
  );
  const scope = sectionBetween(
    docs,
    "## 20. Exact Two-File Docs-Only Slice",
    "## 21. Non-Interference Rules",
  );

  assert.deepEqual(numberedBacktickValues(scope), [docsPath, proofPath]);
  assert.match(scope, /CURRENT_SLICE_FILE_COUNT:\n2/u);
  assert.match(scope, /CURRENT_SLICE_DOC_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SLICE_FOCUSED_PROOF_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SLICE_SCHEMA_FILE_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SLICE_PACKAGE_EXPORT_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SLICE_RUNTIME_FILE_COUNT:\n0/u);

  assert.deepEqual(candidateSchemaPaths, [
    "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json",
    "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema.test.js",
  ]);
  assert.deepEqual(
    retainedLaterSiblingPaths,
    [
      "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json",
      "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js",
      "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js",
      "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js",
      "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
      "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
    ],
  );
  assert.equal(candidateSchemaPaths.length, 2);
  assert.equal(retainedLaterSiblingPaths.length, 6);
  assert.deepEqual(laterSiblingPaths, [
    ...candidateSchemaPaths,
    ...retainedLaterSiblingPaths,
  ]);
  assert.match(
    transitionText,
    /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    transitionText,
    /REMAINING_CANDIDATE_PATH_PROOF_ALIGNMENT_COUNT:\n0/u,
  );
  for (const candidatePath of candidateSchemaPaths) {
    assert.equal(
      transitionText.includes(
        "`" +
          candidatePath +
          "` | `PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  for (const retainedPath of retainedLaterSiblingPaths) {
    assert.equal(
      transitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
  }
  assert.deepEqual(validatorResultCandidatePaths, [
    "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json",
    "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js",
  ]);
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
  assert.deepEqual(retainedPackageAndValidatorSiblingPaths, [
    "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js",
    "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js",
    "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
    "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
  ]);
  assert.equal(
    candidatePackageExportProofPath,
    "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js",
  );
  assert.deepEqual(
    activePackageAndValidatorSiblingPaths,
    retainedPackageAndValidatorSiblingPaths.slice(1),
  );
  assert.equal(
    validatorResultPackageExportProofPath,
    "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js",
  );
  assert.deepEqual(retainedValidatorSiblingPaths, [
    "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
    "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
  ]);
  assert.equal(
    packageExportTransitionText.includes(
      "`" +
        candidatePackageExportProofPath +
        "` | create the focused candidate package-export proof",
    ),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n8/u,
  );
  assert.match(
    packageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n7/u,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  for (const retainedSiblingPath of activePackageAndValidatorSiblingPaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedSiblingPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedSiblingPath,
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
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`" + proofPath + "`",
    ),
    false,
  );
  assert.match(
    validatorResultPackageExportTransitionRecoveryText,
    /HISTORICAL_REGISTERED_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultPackageExportTransitionRecoveryText,
    /RECOVERED_TOTAL_LIVE_PROOF_CONFLICT_COUNT:\n10/u,
  );
  assert.match(
    validatorResultPackageExportTransitionRecoveryText,
    /RECOVERED_TOTAL_FOCUSED_ALIGNMENT_COUNT:\n9/u,
  );
  assert.equal(
    validatorResultPackageExportTransitionRecoveryText.includes(
      "| 1 | `" +
        proofPath +
        "` | includes the focused validator-result package-export proof in an active retained-sibling loop and asserts live filesystem absence | `SEPARATE_FOCUSED_RECOVERY_ALIGNMENT_REQUIRED` |",
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionRecoveryText.includes(
      "After this recovery is tracked, one separate focused alignment may modify only:\n\n`" +
        proofPath +
        "`",
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionRecoveryText.includes(
      "load this recovery prerequisite through the proof's required-file reader",
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionRecoveryText.includes(
      "preserve the original validator-result package-export transition as a historical anchor",
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionRecoveryText.includes(
      "identify only the focused validator-result package-export proof as released from live absence checking",
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
  for (const retainedSiblingPath of retainedValidatorSiblingPaths) {
    assert.equal(
      validatorResultPackageExportTransitionRecoveryText.includes(
        "`" + retainedSiblingPath + "`",
      ),
      true,
      retainedSiblingPath,
    );
    assert.equal(
      fs.existsSync(absolute(retainedSiblingPath)),
      false,
      retainedSiblingPath,
    );
  }
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_LIVE_PROOF_CONFLICT_COUNT:\n6/u,
  );
  assert.match(
    validatorResultTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n5/u,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "| 1 | `" +
        proofPath +
        "` | preserve decision-basis contract history and two validator sibling absences; align only the two validator-result candidate paths |",
    ),
    true,
  );
  assert.doesNotMatch(
    proofText,
    /for\s*\(\s*const\s+\w+\s+of\s+laterSiblingPaths\s*\)/u,
  );
  assert.doesNotMatch(
    proofText,
    /fs\s*\.\s*existsSync\s*\(\s*absolute\s*\(\s*candidate(?:Schema)?Path\s*\)\s*\)/u,
  );
  assert.equal(
    proofText.includes("fs." + "existsSync(absolute(retainedPath))"),
    false,
  );
  assert.doesNotMatch(
    proofText,
    /fs\s*\.\s*existsSync\s*\(\s*absolute\s*\(\s*validatorResultCandidatePath\s*\)\s*\)/u,
  );
});

test("all controlling sources are tracked and named in the boundary", () => {
  for (const controllingPath of controllingPaths) {
    assert.equal(fs.existsSync(absolute(controllingPath)), true, controllingPath);
    assert.match(docs, new RegExp(`- \`${controllingPath.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}\``));
  }
});

test("reused approval and six subject-family schema truths are directly frozen", () => {
  assert.deepEqual(approvalSchema.properties.approval_ref, {
    type: "string",
    pattern: "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
  });
  assert.deepEqual(approvalSchema.properties.review_session_ref, {
    type: "string",
    pattern: "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
  });
  assert.deepEqual(approvalSchema.properties.decision, {
    type: "string",
    enum: expectedDecisionValues,
  });
  assert.deepEqual(
    approvalSchema.$defs.reviewerAttribution.properties.reviewer_ref,
    {
      type: "string",
      pattern: "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
    },
  );
  assert.deepEqual(
    approvalSchema.$defs.reviewerAttribution.properties.reviewer_role,
    {
      type: "string",
      enum: expectedReviewerRoles,
    },
  );
  assert.deepEqual(
    approvalSchema.$defs.decisionSupport.properties.decision_basis_refs,
    {
      type: "array",
      minItems: 1,
      uniqueItems: true,
      items: {
        type: "string",
        pattern: "^rvb_[a-z0-9][a-z0-9_-]{0,59}$",
      },
    },
  );
  assert.deepEqual(
    subjectSchemaBindings.map(({ kind }) => kind),
    expectedSubjectKinds,
  );

  for (const binding of subjectSchemaBindings) {
    const schema = readJsonRequired(binding.schemaPath);
    const collection = schema.properties[binding.collectionField];
    const itemDefinition = schema.$defs[binding.definitionField];

    assert.equal(
      schema.required.includes(binding.collectionField),
      true,
      binding.collectionField,
    );
    assert.equal(collection.type, "array", binding.collectionField);
    assert.equal(
      collection.items.$ref,
      `#/$defs/${binding.definitionField}`,
      binding.collectionField,
    );
    assert.equal(
      itemDefinition.required.includes(binding.referenceField),
      true,
      binding.referenceField,
    );
    assert.deepEqual(
      itemDefinition.properties[binding.referenceField],
      {
        type: "string",
        pattern: binding.pattern,
      },
      binding.referenceField,
    );
  }
});

test("all eighteen Owner-selected stages and exact rows are frozen", () => {
  for (let stage = 1; stage <= 18; stage += 1) {
    assert.match(docs, new RegExp(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`));
  }

  const stages = sectionBetween(
    docs,
    "## 3. Eighteen Owner-Selected Stages",
    "## 4. Contract Identity And Exact Root Shape",
  );
  const stageRows = tableDataRows(stages).filter((row) => /^\| \d+ \|/u.test(row));

  assert.deepEqual(stageRows, expectedStageRows);
  assert.match(stages, /OWNER_SELECTED_STAGE_COUNT:\n18/u);
  assert.match(stages, /OPEN_CONTRACT_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(docs, /OWNER_SELECTED_EIGHTEEN_STAGE_SEMANTICS_TRANSLATED/u);
});

test("contract identity and exact sixteen-field scalar root are frozen", () => {
  const identity = sectionBetween(
    docs,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5. Candidate Cardinality, Order, Identity, And Immutability",
  );
  const fieldRows = tableDataRows(identity).filter((row) =>
    row.startsWith("| `"),
  );
  const plainRootPreamble = sectionBetween(
    identity,
    "The candidate is one plain closed object",
    "1. `contract_id`",
  );
  const prohibitedRootStart = identity.indexOf("No field is optional.");

  assert.match(
    identity,
    /CONTRACT_ID:\nhuman_review\.controlled_handoff_human_professional_approval_decision_basis_evidence/u,
  );
  assert.match(identity, /CONTRACT_VERSION:\n1\.0\.0/u);
  assert.deepEqual(numberedBacktickValues(identity), expectedFields);
  assert.deepEqual(fieldRows, expectedFieldRows);
  assert.match(identity, /TOP_LEVEL_FIELD_COUNT:\n16/u);
  assert.equal(normalize(plainRootPreamble), expectedPlainRootPreamble);
  assert.notEqual(prohibitedRootStart, -1);
  assert.equal(
    normalize(identity.slice(prohibitedRootStart)),
    expectedProhibitedRootShape,
  );
});

test("candidate cardinality, order, identity, immutability, and no reuse are exact", () => {
  const cardinality = sectionBetween(
    docs,
    "## 5. Candidate Cardinality, Order, Identity, And Immutability",
    "## 6. Exact Approval, Reference, And Decision Binding",
  );

  assert.match(
    cardinality,
    /DECISION_BASIS_EVIDENCE_CANDIDATE_COUNT_PER_CALL:\nEXACTLY_ONE_PER_UNIQUE_DECLARED_DECISION_BASIS_REFERENCE/u,
  );
  assert.match(
    cardinality,
    /DECISION_BASIS_EVIDENCE_CANDIDATE_MINIMUM_COUNT_PER_CALL:\n1/u,
  );
  assert.match(
    cardinality,
    /DECISION_BASIS_EVIDENCE_CANDIDATE_ORDER:\nEXACT_APPROVAL_DECISION_BASIS_REFERENCE_ORDER/u,
  );
  assert.match(
    cardinality,
    /MISSING_EXTRA_DUPLICATE_OR_REORDERED_CANDIDATE:\nSTOP_CLOSED_IN_FUTURE_OUTER_CHECKPOINT/u,
  );
  assert.match(
    cardinality,
    /There is no separate\n`decision_basis_evidence_ref`/u,
  );
  assert.match(
    cardinality,
    /DECISION_BASIS_RECORD_COUNT_PER_REFERENCE_PER_APPROVAL_ATTEMPT:\n1/u,
  );
  assert.match(
    cardinality,
    /DECISION_BASIS_REFERENCE_REUSE_ACROSS_APPROVAL_ATTEMPTS:\nPROHIBITED/u,
  );
  assert.match(cardinality, /DECISION_BASIS_RECORD_MUTATION:\nPROHIBITED/u);
  assert.match(cardinality, /EMBEDDED_DECISION_BASIS_HISTORY:\nABSENT/u);
  assert.match(cardinality, /CURRENT_DECISION_BASIS_RECORD_SELECTION:\nNOT_CREATED/u);
  assert.equal(
    normalize(
      cardinality.slice(
        cardinality.indexOf(
          "A correction, replacement decision, rejection, or other new approval attempt",
        ),
      ),
    ),
    expectedReplacementPosture,
  );
});

test("approval reference and decision bindings are closed and exact", () => {
  const approval = sectionBetween(
    docs,
    "## 6. Exact Approval, Reference, And Decision Binding",
    "## 7. Exact Reviewer And Review-Session Binding",
  );
  const decisionSection = sectionBetween(
    approval,
    "The exact decision values in canonical order are:",
    "DECISION_ENUM_COUNT:",
  );
  const equalitySection = sectionBetween(
    approval,
    "The future outer checkpoint, not the local structural validator, must require:",
    "The decision-basis candidate contains no:",
  );
  const exclusionSection = sectionBetween(
    approval,
    "The decision-basis candidate contains no:",
    "EXCLUDED_APPROVAL_FIELD_COUNT:",
  );

  assert.deepEqual(numberedBacktickValues(decisionSection), expectedDecisionValues);
  assert.match(approval, /DECISION_ENUM_COUNT:\n3/u);
  assert.deepEqual(numberedItems(equalitySection), expectedApprovalEqualityItems);
  assert.deepEqual(numberedItems(exclusionSection), expectedApprovalExclusions);
  assert.match(approval, /EXCLUDED_APPROVAL_FIELD_COUNT:\n9/u);
  assert.match(approval, /does not interpret, replace, override, validate,\nsupport, justify, approve, reject, correct/u);
});

test("reviewer and review-session bindings remain exact and non-authoritative", () => {
  const reviewer = sectionBetween(
    docs,
    "## 7. Exact Reviewer And Review-Session Binding",
    "## 8. Strict Reference-Only Basis Representation",
  );
  const roles = sectionBetween(
    reviewer,
    "The exact reviewer-role values in canonical order are:",
    "REVIEWER_ROLE_VALUE_COUNT:",
  );
  const equalitySection = sectionBetween(
    reviewer,
    "The future outer checkpoint, not the local structural validator, must require:",
    "The candidate contains no separate basis author",
  );

  assert.deepEqual(numberedBacktickValues(roles), expectedReviewerRoles);
  assert.match(reviewer, /REVIEWER_ROLE_VALUE_COUNT:\n2/u);
  assert.deepEqual(numberedItems(equalitySection), expectedReviewerSessionEqualityItems);
  assert.match(reviewer, /REVIEWER_CARDINALITY_PER_DECISION_BASIS_RECORD:\n1/u);
  assert.match(reviewer, /MULTI_AUTHOR_OR_PARTICIPANT_MEMBERSHIP:\nPROHIBITED/u);
  assert.match(reviewer, /does not prove reviewer identity, role,\nqualification/u);
  assert.match(reviewer, /does not prove\nsession existence, validity, authentication, continuity, or currentness/u);
});

test("reference-only content boundary and exact six-family subject mapping are frozen", () => {
  const representation = sectionBetween(
    docs,
    "## 8. Strict Reference-Only Basis Representation",
    "## 9. Exact Basis Subject Kind And Reference Mapping",
  );
  const prohibited = sectionBetween(
    representation,
    "The candidate contains no:",
    "PROHIBITED_INLINE_BASIS_CONTENT_CATEGORY_COUNT:",
  );
  const mapping = sectionBetween(
    docs,
    "## 9. Exact Basis Subject Kind And Reference Mapping",
    "## 10. Exact Candidate-Set And Duplicate-Subject Rules",
  );
  const kindSection = sectionBetween(
    mapping,
    "`basis_subject_kind` has exactly these values in canonical order:",
    "BASIS_SUBJECT_KIND_COUNT:",
  );
  const mappingTable = sectionBetween(
    mapping,
    "The exact kind-to-reference mapping is:",
    "BASIS_SUBJECT_REFERENCE_PATTERN_COUNT:",
  );
  const mappingRows = mappingTable
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  assert.deepEqual(numberedItems(prohibited), expectedProhibitedContent);
  assert.match(representation, /PROHIBITED_INLINE_BASIS_CONTENT_CATEGORY_COUNT:\n7/u);
  assert.match(representation, /REFERENCE_ONLY_DECISION_BASIS_POSTURE:\nREQUIRED/u);
  assert.deepEqual(numberedBacktickValues(kindSection), expectedSubjectKinds);
  assert.match(mapping, /BASIS_SUBJECT_KIND_COUNT:\n6/u);
  assert.deepEqual(mappingRows, expectedSubjectMappingTableRows);
  assert.match(mapping, /BASIS_SUBJECT_REFERENCE_PATTERN_COUNT:\n6/u);
  assert.match(mapping, /BASIS_SUBJECT_COUNT_PER_CANDIDATE:\n1/u);
  assert.match(mapping, /subject reference occurs exactly once/u);
  assert.match(mapping, /SUBJECT_LOOKUP_DEREFERENCE_DISCOVERY_OR_PERSISTENCE:\nPROHIBITED/u);
});

test("candidate-set order, duplicate-subject, and candidate-only posture are exact", () => {
  const setRules = sectionBetween(
    docs,
    "## 10. Exact Candidate-Set And Duplicate-Subject Rules",
    "## 11. Basis Posture And No-Support Boundary",
  );
  const posture = sectionBetween(
    docs,
    "## 11. Basis Posture And No-Support Boundary",
    "## 12. Binding Issuer, Provenance, And Opaque References",
  );

  assert.match(
    setRules,
    /CANDIDATE_ORDER_CREATES_PRIORITY_WEIGHT_OR_STRENGTH:\nNO/u,
  );
  assert.match(
    setRules,
    /BASIS_SUBJECT_PAIR_DUPLICATION_WITHIN_APPROVAL_ATTEMPT:\nPROHIBITED/u,
  );
  assert.match(setRules, /Comparison is exact and case-sensitive/u);
  assert.match(posture, /BASIS_POSTURE_COUNT:\n1/u);
  assert.match(posture, /BASIS_POSTURE_VALUE:\nDECISION_BASIS_CANDIDATE_ONLY/u);
  assert.match(posture, /It is not a `SUPPORTS`, `PROVES`, `SUFFICIENT`, `RELEVANT`, `ACCEPTED`,\n`ADMISSIBLE`, `APPROVED`/u);
  assert.match(posture, /No field or field combination creates direction, strength, weight/u);
});

test("origin, lifecycle, verification, and temporal separation remain fail closed", () => {
  const origin = sectionBetween(
    docs,
    "## 12. Binding Issuer, Provenance, And Opaque References",
    "## 13. Declared Basis Lifecycle",
  );
  const lifecycle = sectionBetween(
    docs,
    "## 13. Declared Basis Lifecycle",
    "## 14. Verification Posture And Required Human Review",
  );
  const lifecycleValues = sectionBetween(
    lifecycle,
    "`basis_lifecycle_posture` has exactly these values in canonical order:",
    "BASIS_LIFECYCLE_POSTURE_COUNT:",
  );
  const verification = sectionBetween(
    docs,
    "## 14. Verification Posture And Required Human Review",
    "## 15. Temporal And Currentness Separation",
  );
  const temporal = sectionBetween(
    docs,
    "## 15. Temporal And Currentness Separation",
    "## 16. Reference Distinctness And External Equality Ownership",
  );
  const timeExclusions = sectionBetween(
    temporal,
    "Version 1 contains no:",
    "INLINE_TIME_FIELD_COUNT:",
  );
  const opaqueReferenceRules = sectionBetween(
    origin,
    "Each is a string of 1 through 128 characters matching:",
    "The references declare only which opaque issuer and provenance records",
  );

  assert.deepEqual(
    numberedBacktickValues(origin),
    expectedOpaqueReferenceFields,
  );
  assert.equal(normalize(opaqueReferenceRules), expectedOpaqueReferenceRules);
  assert.match(origin, /OPAQUE_BINDING_REFERENCE_COUNT:\n2/u);
  assert.match(origin, /ISSUER_OR_PROVENANCE_VERIFICATION:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u);
  assert.deepEqual(numberedBacktickValues(lifecycleValues), expectedLifecycleValues);
  assert.match(lifecycle, /BASIS_LIFECYCLE_POSTURE_COUNT:\n3/u);
  assert.match(lifecycle, /Even\n`DECISION_BASIS_DECLARED_ACTIVE` remains unverified/u);
  assert.match(verification, /VERIFICATION_POSTURE_VALUE:\nNOT_VERIFIED_BY_CONTRACT/u);
  assert.match(verification, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED_VALUE:\ntrue/u);
  assert.deepEqual(numberedItems(timeExclusions), expectedTimeExclusions);
  assert.match(temporal, /INLINE_TIME_FIELD_COUNT:\n0/u);
  assert.match(temporal, /CLOCK_OR_CURRENTNESS_EVIDENCE_REFERENCE_COUNT:\n0/u);
  assert.match(
    temporal,
    /TRUSTED_TIME_CURRENTNESS_REPLACEMENT_EVALUATION:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u,
  );
  assert.match(temporal, /ARBITRARY_OR_GLOBAL_TTL:\nPROHIBITED/u);
});

test("seven internal references and local validator ownership are exact", () => {
  const ownership = sectionBetween(
    docs,
    "## 16. Reference Distinctness And External Equality Ownership",
    "## 17. Privacy, Closed Shape, And Shadow-Semantics Prohibition",
  );
  const references = sectionBetween(
    ownership,
    "These seven internal reference fields must be pairwise distinct",
    "PAIRWISE_DISTINCT_INTERNAL_REFERENCE_COUNT:",
  );

  assert.deepEqual(numberedBacktickValues(references), expectedInternalReferences);
  assert.match(ownership, /PAIRWISE_DISTINCT_INTERNAL_REFERENCE_COUNT:\n7/u);
  assert.match(ownership, /must be descriptor-safe, inspect\nonly own data properties, execute no accessor/u);
  assert.match(ownership, /perform no external equality or\nmembership check/u);
  assert.match(ownership, /LOCAL_STRUCTURAL_VALIDATOR_EXTERNAL_CANDIDATE_COUNT:\n0/u);
  assert.match(ownership, /LOOKUP_DEREFERENCE_DISCOVERY_OR_PERSISTENCE:\nPROHIBITED/u);
  assert.match(ownership, /TRUST_PRECOMPUTED_VALIDATOR_OR_CROSS_REFERENCE_RESULT:\nPROHIBITED/u);
});

test("privacy, structural-validity, and deferred-ownership boundaries are complete", () => {
  const privacy = sectionBetween(
    docs,
    "## 17. Privacy, Closed Shape, And Shadow-Semantics Prohibition",
    "RAW_PRIVATE_SOURCE_OR_BASIS_MATERIAL_FIELD_COUNT:",
  );
  const validity = sectionBetween(
    docs,
    "## 18. Structural Validity And Separate Future Admissibility",
    "## 19. Deferred Ownership And Separate Future Prerequisites",
  );
  const deferred = sectionBetween(
    docs,
    "## 19. Deferred Ownership And Separate Future Prerequisites",
    "## 20. Exact Two-File Docs-Only Slice",
  );

  assert.equal(normalize(privacy.replace(/^##[^\n]+\n/u, "")), expectedPrivacyBoundary);
  assert.match(docs, /RAW_PRIVATE_SOURCE_OR_BASIS_MATERIAL_FIELD_COUNT:\n0/u);
  assert.match(docs, /OPTIONAL_OR_EXTENSION_FIELD_COUNT:\n0/u);
  assert.equal(normalize(validity.replace(/^##[^\n]+\n/u, "")), expectedValidityBoundary);
  assert.equal(
    normalize(deferred.replace(/^##[^\n]+\n/u, "")),
    expectedDeferredOwnershipBoundary,
  );
  assert.match(deferred, /FUTURE_SCHEMA_PATH:\nDEFERRED_TO_SEPARATE_OWNER_DECISION/u);
  assert.match(
    deferred,
    /FUTURE_VALIDATOR_RESULT_SCHEMA_PATH:\nDEFERRED_TO_SEPARATE_OWNER_DECISION/u,
  );
  assert.match(
    deferred,
    /FUTURE_OUTER_ENVELOPE_FIELD_AND_ERROR_PATH_MAP:\nDEFERRED_UNTIL_ALL_DEPENDENCY_CONTRACTS_ARE_TRACKED/u,
  );
  assert.match(
    deferred,
    /RELEVANCE_SUFFICIENCY_OR_PROBATIVE_VALUE_POLICY:\nNOT_CREATED_AND_NOT_AUTHORIZED/u,
  );
  assert.match(deferred, /CURRENT_SAFE_SCHEMA_OR_RUNTIME_STEP:\nNONE/u);
});

test("non-interference, proof limits, and final no-conclusion boundary are exact", () => {
  const nonInterference = sectionBetween(
    docs,
    "## 21. Non-Interference Rules",
    "## 22. Proof Boundary",
  );
  const proof = sectionBetween(
    docs,
    "## 22. Proof Boundary",
    "## 23. Final No-Conclusion Boundary",
  );
  const proofClaims = sectionBetween(
    proof,
    "The focused proof for this docs-only slice may establish only that:",
    "It cannot prove",
  );
  const cannotStart = proof.indexOf("It cannot prove");
  const cannotEnd = proof.indexOf("\n\nSCHEMA_CREATED_BY_THIS_SLICE:");
  const cannotText = proof.slice(cannotStart, cannotEnd);
  const finalSection = sectionBetween(
    docs,
    "## 23. Final No-Conclusion Boundary",
    "FINAL_SAFE_ACTION:",
  );

  assert.deepEqual(
    nonInterference
      .split("\n")
      .filter((line) => line.startsWith("- "))
      .map((line) => line.slice(2)),
    expectedNonInterferenceItems,
  );
  assert.deepEqual(numberedItems(proofClaims), expectedProofClaims);
  assert.equal(normalize(cannotText), expectedProofCannotEstablish);
  assert.equal(
    normalize(finalSection.replace(/^##[^\n]+\n/u, "")),
    expectedFinalNoConclusion,
  );
  assert.match(proof, /SCHEMA_CREATED_BY_THIS_SLICE:\nNO/u);
  assert.match(proof, /VALIDATOR_RESULT_SCHEMA_CREATED_BY_THIS_SLICE:\nNO/u);
  assert.match(proof, /PACKAGE_EXPORT_CREATED_BY_THIS_SLICE:\nNO/u);
  assert.match(proof, /VALIDATOR_OR_RUNTIME_CREATED_BY_THIS_SLICE:\nNO/u);
  assert.match(proof, /DECISION_BASIS_SUBJECT_VERIFIED_BY_THIS_SLICE:\nNO/u);
  assert.match(
    proof,
    /RELEVANCE_SUPPORT_SUFFICIENCY_OR_PROBATIVE_VALUE_CREATED_BY_THIS_SLICE:\nNO/u,
  );
  assert.match(proof, /APPROVAL_ADMISSIBILITY_OR_ELIGIBILITY_CREATED_BY_THIS_SLICE:\nNO/u);
  assert.match(
    docs,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_DECISION_BASIS_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_DECISION/u,
  );
  assert.match(
    docs,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_OWNER_SELECTED_SEMANTICS/u,
  );
});
