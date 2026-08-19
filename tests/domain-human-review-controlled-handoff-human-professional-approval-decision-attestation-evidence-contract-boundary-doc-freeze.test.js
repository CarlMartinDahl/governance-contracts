"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-contract-boundary-doc-freeze.test.js";
const approvalSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval.json";
const approvalCrossReferencePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CROSS_REFERENCE_ADMISSIBILITY_SEMANTICS_BOUNDARY_v1.md";
const reviewSessionContractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const schemaProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  approvalSchemaPath,
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
  approvalCrossReferencePath,
  "tests/domain-human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-semantics-boundary-doc-freeze.test.js",
  reviewSessionContractPath,
  "schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json",
];
const candidateSchemaPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js",
];
const retainedValidatorResultAndValidatorPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
];
const validatorResultCandidatePaths =
  retainedValidatorResultAndValidatorPaths.slice(0, 2);
const retainedValidatorPaths =
  retainedValidatorResultAndValidatorPaths.slice(2);
const laterSiblingPaths = [
  ...candidateSchemaPaths,
  ...retainedValidatorResultAndValidatorPaths,
];
const expectedStageRows = [
  "| 1 | `OPTION_A` | one separate closed approval-specific declaration-only decision-attestation candidate is supplied exactly once in the same call and is necessary but insufficient |",
  "| 2 | `OPTION_A` | exact contract identity and version are defined; `decision_attestation_ref` is the candidate's sole identity and no separate evidence-record identity is added |",
  "| 3 | `OPTION_A` | one immutable decision-attestation record belongs to one exact approval attempt; reuse across approval attempts, mutation, embedded history, and current-record selection are prohibited |",
  "| 4 | `OPTION_A` | required `approval_ref` and `decision_attestation_ref` bind only to the approval candidate in the future outer checkpoint; the approval object, packet, brief, and fingerprint are not embedded |",
  "| 5 | `OPTION_A` | required `decision` reuses the exact approval enum and must equal the approval candidate's decision without interpreting, changing, or creating approval effect |",
  "| 6 | `OPTION_A` | required `reviewer_ref` and `reviewer_role` bind one exact approval reviewer attribution; no separate attester identity or multi-attester membership is added |",
  "| 7 | `OPTION_A` | required `review_session_ref` binds to both the approval candidate and the separately supplied review-session candidate without proving session validity |",
  "| 8 | `OPTION_A` | required `attested_at` uses exact lexical UTC milliseconds; truth, clock accuracy, temporal order, and currentness remain separate |",
  "| 9 | `OPTION_A` | `attestation_posture` has the sole value `DECISION_ATTESTATION_CANDIDATE_ONLY` and creates no verified signature, valid attestation, or approval effect |",
  "| 10 | `OPTION_A` | required opaque `binding_issuer_ref` and `binding_provenance_ref` declare origin without proving issuer trust, provenance, or chain of custody |",
  "| 11 | `OPTION_A` | version 1 contains no signature, certificate chain, credential, key, biometric data, provider payload, cryptographic digest, free attestation text, or attestation-proof reference |",
  "| 12 | `OPTION_A` | one exact three-value declared attestation lifecycle is an immutable structural posture, not verified currentness, revocation proof, or transition history |",
  "| 13 | `OPTION_A` | verification posture is exactly `NOT_VERIFIED_BY_CONTRACT` and human/professional review remains required |",
  "| 14 | `OPTION_A` | the root is one exact closed fifteen-field flat scalar object with no optional, extension, nested, accessor, symbol, or free-text fields |",
  "| 15 | `OPTION_A` | six internal references are pairwise distinct while approval, session, reviewer, role, decision, and attestation bindings use exact case-sensitive equality without normalization or lookup |",
  "| 16 | `OPTION_A` | the local future validator is descriptor-safe and structural only; every external equality, trust, identity, authority, time, currentness, signature, attestation-validity, admissibility, and approval-effect decision belongs to future outer seams |",
];
const expectedFields = [
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
const expectedFieldRows = [
  "| `contract_id` | string equal to `human_review.controlled_handoff_human_professional_approval_decision_attestation_evidence` |",
  "| `contract_version` | string equal to `1.0.0` |",
  "| `decision_attestation_ref` | opaque string matching `^att_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `approval_ref` | opaque string matching `^apr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `review_session_ref` | opaque string matching `^rvs_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `reviewer_ref` | opaque string matching `^rvr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `reviewer_role` | one exact value from Section 7 |",
  "| `decision` | one exact value from Section 6 |",
  "| `attested_at` | exact lexical UTC-millisecond timestamp from Section 8 |",
  "| `attestation_posture` | string equal to `DECISION_ATTESTATION_CANDIDATE_ONLY` |",
  "| `binding_issuer_ref` | one exact generic opaque reference from Section 10 |",
  "| `binding_provenance_ref` | one exact generic opaque reference from Section 10 |",
  "| `attestation_lifecycle_posture` | one exact value from Section 11 |",
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
const expectedApprovalEqualityItems = [
  "exact equality between the candidate's `decision_attestation_ref` and `approval_candidate.decision_attestation_ref`",
  "exact equality between the candidate's `approval_ref` and `approval_candidate.approval_ref`",
  "exact equality between the candidate's `decision` and `approval_candidate.decision`",
];
const expectedReviewerSessionEqualityItems = [
  "exact equality between the candidate's `reviewer_ref` and `approval_candidate.reviewer_attribution.reviewer_ref`",
  "exact equality between the candidate's `reviewer_role` and `approval_candidate.reviewer_attribution.reviewer_role`",
  "exact equality between the candidate's `review_session_ref` and `approval_candidate.review_session_ref`",
  "exact equality between the candidate's `review_session_ref` and the separately supplied review-session candidate's `review_session_ref`",
  "exact consistency across the shared approval, session, reviewer, and role fields of the separately supplied reviewer identity, role, and authority evidence candidates under their own contracts",
];
const expectedApprovalExclusions = [
  "packet_ref",
  "controlled_handoff_brief_ref",
  "controlled_handoff_brief_fingerprint",
  "approval_posture",
  "decision_support",
  "decided_at",
];
const expectedTimeExclusions = [
  "decision timestamp copy",
  "observation, issuance, update, expiry, or revocation timestamp",
  "TTL, duration, sequence, version counter, or timezone offset",
  "clock-evidence, freshness-evidence, or currentness-evidence reference",
  "prior, replacement, successor, or supersession reference",
];
const expectedProhibitedAttestationMaterial = [
  "raw or encoded signature",
  "signed payload or detached payload",
  "certificate or certificate chain",
  "credential, secret, token, key, public key, or key identifier",
  "biometric data or biometric template",
  "provider payload, provider response, or remote verification result",
  "cryptographic digest of signature, certificate, credential, or provider material",
  "free attestation text, reason, explanation, or statement",
  "`attestation_proof_ref` or other signature-proof reference",
];
const expectedLifecycleValues = [
  "DECISION_ATTESTATION_DECLARED_ACTIVE",
  "DECISION_ATTESTATION_DECLARED_INACTIVE",
  "DECISION_ATTESTATION_DECLARED_REVOKED",
];
const expectedInternalReferences = [
  "decision_attestation_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const expectedNonInterferenceItems = [
  "modify no approval, Controlled Handoff Brief, review-session, reviewer identity, reviewer role, reviewer authority, or other tracked contract, schema, validator, result schema, package export, checkpoint, or runtime file",
  "create no generic signature, certificate, credential, cryptographic attestation, trusted-clock, currentness, lifecycle-history, replacement, or supersession contract",
  "add no packet, brief, fingerprint, decision-support, reviewer-evidence, authority, signature, certificate, credential, proof-reference, TTL, expiry, revocation-time, currentness, or replacement field to the decision-attestation candidate",
  "perform no lookup, dereference, discovery, persistence, registry selection, current-record selection, mutation, deletion, replacement, or supersession",
  "trust no precomputed validator or cross-reference result",
  "inspect or process no raw, private, source, case, identity, session, signature, certificate, credential, provider, biometric, cryptographic, or real-attestation material",
  "create no signature validity, attestation validity, reviewer identity, reviewer authorship, reviewer qualification, reviewer authority, issuer trust, trusted time, freshness, currentness, approval effect, handoff eligibility, release readiness, product candidacy, or external-use authorization",
  "create no legal conclusion, evidentiary conclusion, professional opinion, finding, severity, score, recommendation, remediation, blocker resolution, security finding, compliance certification, or technical sign-off",
];
const expectedProofClaims = [
  "the sixteen Owner-selected Stage A markers and exact stage table are tracked",
  "the exact contract identity, version, fifteen-field root, field order, scalar types, reference patterns, timestamp form, enums, constants, and pairwise-distinct set are frozen",
  "exactly one immutable direct candidate per approval attempt and the no-reuse posture are frozen",
  "approval, decision, reviewer, review-session, origin, lifecycle, time, verification, privacy, and outer-checkpoint ownership boundaries are explicit",
  "signature material, proof references, schema, validator result, export, validator, checkpoint, clock/currentness matrix, persistence, API, UI, runtime, product, and external-use surfaces remain absent and unauthorized",
];
const expectedPrivacyBoundary =
  "The exact fifteen fields in Section 4 are the complete allowlist. The candidate contains no person name, email address, telephone number, address, account identifier, organization name, title, jurisdiction, license, credential, provider payload, browser identifier, device identifier, IP address, token, cookie, JWT, certificate, signature, key, nonce, secret, URL, file path, raw content, source content, case content, transcript, prompt, response, screenshot, image, PDF, metadata, free-text reason, explanation, recommendation, finding, score, severity, remediation, or conclusion. Opaque references must not be populated with raw or encoded private material, credentials, provider payloads, URLs, paths, source excerpts, evidence content, attestation material, or case content. No unknown key may carry shadow timestamps, lifecycle history, participants, authority, authentication, currentness, approval, handoff, delivery, or release semantics.";
const expectedValidityBoundary =
  "A structurally valid candidate proves only that one supplied object matches the selected closed scalar shape. It does not prove external reference existence or equality, one-real-world-attestation cardinality, reviewer identity, reviewer authorship, reviewer authority, session existence, signature existence or validity, issuer trust, provenance, lifecycle truth, trusted time, temporal order, freshness, currentness, approval admissibility, candidate eligibility, or handoff authorization. The future outer checkpoint must stop closed when the candidate is missing, extra, duplicated, structurally invalid, mismatched, unavailable, unknown, unverifiable, stale, inactive, revoked, superseded, disputed, conflicting, or otherwise inadmissible under the later policy matrix. This document does not define that matrix or implement the checkpoint. No structural validator result shape, public error code taxonomy, JSON error path map, schema keyword order, validator execution order, package export, consumer, dispatch, checkpoint call, or runtime behavior is selected here.";
const expectedProofCannotEstablish =
  "It cannot prove contract implementation, schema correctness, validator correctness, external equality, attestation occurrence, reviewer authorship, signature existence, signature validity, issuer trust, review-session validity, trusted time, lifecycle truth, currentness, approval admissibility, candidate eligibility, runtime behavior, professional review completion, release readiness, product candidacy, or external-use readiness.";
const expectedFinalNoConclusion =
  "This boundary is not human review, professional review, legal review, evidentiary review, identity verification, authentication, reviewer-authorship verification, reviewer-role verification, reviewer-authority verification, session verification, signature verification, certificate verification, credential verification, cryptographic attestation verification, issuer-trust verification, provenance verification, trusted-time verification, currentness verification, lifecycle verification, approval, approval effect, handoff authorization, release authorization, product approval, external-use authorization, security review, technical sign-off, compliance certification, source-truth determination, chain-of-custody proof, or case-truth determination.";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
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

function numberedBacktickValues(section) {
  return [...section.matchAll(/^\d+\. `([^`]+)`$/gmu)].map(
    (match) => match[1],
  );
}

function markdownTableRows(section) {
  return section
    .split("\n")
    .filter((line) => line.startsWith("| ") && !line.startsWith("| ---"));
}

function markdownBulletItems(section) {
  return section
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2));
}

function numberedTextItems(section) {
  return section
    .split("\n")
    .filter((line) => /^\d+\. /u.test(line))
    .map((line) => line.replace(/^\d+\. /u, ""));
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/gu, " ").trim();
}

test("canonical sources and the exact sixteen-stage matrix are frozen", () => {
  const docsText = readRequired(docsPath);
  const sources = sectionBetween(
    docsText,
    "## 2. Canonical Sources And Precedent Boundary",
    "## 3.",
  );
  const stages = sectionBetween(
    docsText,
    "## 3. Sixteen Owner-Selected Stages",
    "## 4.",
  );

  assert.deepEqual(
    markdownBulletItems(sources),
    controllingPaths.map((controllingPath) => "`" + controllingPath + "`"),
  );
  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
  }
  for (let stage = 1; stage <= 16; stage += 1) {
    assert.equal(
      docsText.includes("OWNER_SELECTED_STAGE_" + stage + "_OPTION_A"),
      true,
    );
  }
  assert.deepEqual(
    markdownTableRows(stages),
    ["| Stage | Selected option | Frozen docs-level result |", ...expectedStageRows],
  );
  assert.match(stages, /OWNER_SELECTED_STAGE_COUNT:\n16/u);
  assert.match(stages, /OPEN_CONTRACT_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(
    docsText,
    /OWNER_SELECTED_SIXTEEN_STAGE_SEMANTICS_TRANSLATED/u,
  );
});

test("tracked approval and dependency facts support but do not implement the contract", () => {
  const approvalSchema = JSON.parse(readRequired(approvalSchemaPath));
  const crossReference = readRequired(approvalCrossReferencePath);
  const reviewSession = readRequired(reviewSessionContractPath);

  assert.deepEqual(approvalSchema.properties.decision_attestation_ref, {
    type: "string",
    pattern: "^att_[a-z0-9][a-z0-9_-]{0,59}$",
  });
  assert.deepEqual(
    approvalSchema.properties.decision.enum,
    expectedDecisionValues,
  );
  assert.deepEqual(
    approvalSchema.$defs.reviewerAttribution.properties.reviewer_role.enum,
    expectedReviewerRoles,
  );
  assert.equal(
    approvalSchema.properties.decided_at.pattern,
    "^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\\.[0-9]{3}Z$",
  );
  assert.match(
    crossReference,
    /exactly one decision-attestation candidate corresponding to\n   `decision_attestation_ref`/u,
  );
  assert.match(
    crossReference,
    /Reference equality and cardinality do not prove session identity, attestation\nvalidity, issuer authority, signature validity/u,
  );
  assert.match(
    reviewSession,
    /The review-session candidate contains no:[\s\S]*6\. `decision_attestation_ref`/u,
  );
});

test("exact identity and fifteen-field closed scalar root are frozen", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5.",
  );

  assert.match(
    section,
    /CONTRACT_ID:\nhuman_review\.controlled_handoff_human_professional_approval_decision_attestation_evidence/u,
  );
  assert.match(section, /CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(section, /TOP_LEVEL_FIELD_COUNT:\n15/u);
  assert.deepEqual(numberedBacktickValues(section), expectedFields);
  assert.deepEqual(
    markdownTableRows(section),
    ["| Field | Exact structural contract |", ...expectedFieldRows],
  );
  assert.match(section, /prototype is exactly\n`Object\.prototype` or `null`/u);
  assert.match(section, /No field is optional/u);
  assert.match(section, /Unknown string or symbol keys/u);
});

test("candidate identity cardinality immutability and no-reuse posture are exact", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 5. Candidate Cardinality, Identity, And Immutability",
    "## 6.",
  );

  for (const marker of [
    "DECISION_ATTESTATION_EVIDENCE_CANDIDATE_COUNT_PER_CALL:\n1",
    "DECISION_ATTESTATION_RECORD_COUNT_PER_APPROVAL_ATTEMPT:\n1",
    "DECISION_ATTESTATION_REFERENCE_REUSE_ACROSS_APPROVAL_ATTEMPTS:\nPROHIBITED",
    "DECISION_ATTESTATION_RECORD_MUTATION:\nPROHIBITED",
    "EMBEDDED_ATTESTATION_HISTORY:\nABSENT",
    "CURRENT_ATTESTATION_RECORD_SELECTION:\nNOT_CREATED",
  ]) {
    assert.equal(section.includes(marker), true, marker);
  }
  assert.match(
    section,
    /There is no separate\n`decision_attestation_evidence_ref`/u,
  );
  assert.match(
    section,
    /requires a new approval record and a new `decision_attestation_ref`/u,
  );
  assert.match(section, /No array, candidate set, fallback candidate/u);
});

test("approval and decision bindings reuse exact controlling vocabulary", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 6. Exact Approval And Decision Binding",
    "## 7.",
  );
  const decisionValues = sectionBetween(
    section,
    "The exact decision values in canonical order are:",
    "DECISION_ENUM_COUNT:",
  );
  const outerEquality = sectionBetween(
    section,
    "The future outer checkpoint, not the local structural validator",
    "The decision-attestation candidate contains no:",
  );
  const exclusions = sectionBetween(
    section,
    "The decision-attestation candidate contains no:",
    "EXCLUDED_APPROVAL_FIELD_COUNT:",
  );

  assert.deepEqual(numberedBacktickValues(decisionValues), expectedDecisionValues);
  assert.match(section, /DECISION_ENUM_COUNT:\n3/u);
  assert.deepEqual(
    numberedTextItems(outerEquality),
    expectedApprovalEqualityItems,
  );
  assert.deepEqual(
    numberedBacktickValues(exclusions),
    expectedApprovalExclusions,
  );
  assert.match(section, /EXCLUDED_APPROVAL_FIELD_COUNT:\n6/u);
  assert.match(section, /does not interpret, replace, override,\nvalidate/u);
});

test("reviewer and review-session bindings remain exact and externally owned", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 7. Exact Reviewer And Review-Session Binding",
    "## 8.",
  );
  const reviewerRoles = sectionBetween(
    section,
    "The exact reviewer-role values in canonical order are:",
    "REVIEWER_ROLE_VALUE_COUNT:",
  );
  const outerEquality = sectionBetween(
    section,
    "The future outer checkpoint, not the local structural validator",
    "The candidate contains no separate attester reference",
  );

  assert.deepEqual(numberedBacktickValues(reviewerRoles), expectedReviewerRoles);
  assert.match(section, /REVIEWER_ROLE_VALUE_COUNT:\n2/u);
  assert.deepEqual(
    numberedTextItems(outerEquality),
    expectedReviewerSessionEqualityItems,
  );
  assert.match(
    section,
    /REVIEWER_CARDINALITY_PER_ATTESTATION_RECORD:\n1/u,
  );
  assert.match(
    section,
    /MULTI_ATTESTER_OR_PARTICIPANT_MEMBERSHIP:\nPROHIBITED/u,
  );
  assert.match(section, /contains no separate attester reference/u);
  assert.match(section, /does not prove reviewer identity/u);
});

test("attestation time is exact while trusted time and ordering remain separate", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 8. Exact Attestation Time And Temporal Separation",
    "## 9.",
  );

  assert.equal(
    section.includes(
      "`^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\\.[0-9]{3}Z$`",
    ),
    true,
  );
  assert.match(
    section,
    /ATTESTED_AT_FORMAT:\nRFC3339_UTC_EXACT_MILLISECONDS_LEXICAL_FORM/u,
  );
  assert.deepEqual(markdownBulletItems(section), expectedTimeExclusions);
  assert.match(section, /OTHER_INLINE_TIME_FIELD_COUNT:\n0/u);
  assert.match(section, /ATTESTATION_CLOCK_EVIDENCE_REFERENCE_COUNT:\n0/u);
  assert.match(
    section,
    /TRUSTED_TIME_CURRENTNESS_REPLACEMENT_EVALUATION:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u,
  );
  assert.match(section, /ARBITRARY_OR_GLOBAL_TTL:\nPROHIBITED/u);
  assert.match(section, /does\s+not compare `attested_at`/u);
});

test("candidate posture and prohibited attestation material are closed", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 9. Attestation Posture And Prohibited Material",
    "## 10.",
  );

  assert.match(section, /ATTESTATION_POSTURE_COUNT:\n1/u);
  assert.match(
    section,
    /ATTESTATION_POSTURE_VALUE:\nDECISION_ATTESTATION_CANDIDATE_ONLY/u,
  );
  assert.deepEqual(
    markdownBulletItems(section),
    expectedProhibitedAttestationMaterial,
  );
  assert.match(section, /PROHIBITED_ATTESTATION_MATERIAL_FIELD_COUNT:\n9/u);
  assert.match(section, /ATTESTATION_PROOF_REFERENCE_COUNT:\n0/u);
  assert.match(
    section,
    /CRYPTOGRAPHIC_SIGNATURE_OR_ATTESTATION_VERIFICATION:\nSEPARATE_FUTURE_OWNER_DECISION_REQUIRED/u,
  );
});

test("opaque origin references and declared lifecycle remain unverified", () => {
  const docsText = readRequired(docsPath);
  const origin = sectionBetween(
    docsText,
    "## 10. Binding Issuer, Provenance, And Opaque References",
    "## 11.",
  );
  const lifecycle = sectionBetween(
    docsText,
    "## 11. Declared Attestation Lifecycle",
    "## 12.",
  );

  assert.deepEqual(numberedBacktickValues(origin), [
    "binding_issuer_ref",
    "binding_provenance_ref",
  ]);
  assert.equal(origin.includes("`^[A-Za-z0-9._:-]{1,128}$`"), true);
  for (const scheme of [
    "http:",
    "https:",
    "ftp:",
    "file:",
    "mailto:",
    "data:",
    "javascript:",
  ]) {
    assert.equal(origin.includes("`" + scheme + "`"), true, scheme);
  }
  assert.match(origin, /OPAQUE_BINDING_REFERENCE_COUNT:\n2/u);
  assert.match(
    origin,
    /ISSUER_OR_PROVENANCE_VERIFICATION:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u,
  );

  assert.deepEqual(numberedBacktickValues(lifecycle), expectedLifecycleValues);
  assert.match(lifecycle, /ATTESTATION_LIFECYCLE_POSTURE_COUNT:\n3/u);
  assert.match(
    lifecycle,
    /Even\n`DECISION_ATTESTATION_DECLARED_ACTIVE` remains unverified/u,
  );
  assert.match(lifecycle, /may establish lifecycle truth or currentness/u);
});

test("verification posture reference distinctness and validator boundary are exact", () => {
  const docsText = readRequired(docsPath);
  const verification = sectionBetween(
    docsText,
    "## 12. Verification Posture And Required Human Review",
    "## 13.",
  );
  const ownership = sectionBetween(
    docsText,
    "## 13. Reference Distinctness And External Equality Ownership",
    "## 14.",
  );

  assert.match(verification, /VERIFICATION_POSTURE_COUNT:\n1/u);
  assert.match(
    verification,
    /VERIFICATION_POSTURE_VALUE:\nNOT_VERIFIED_BY_CONTRACT/u,
  );
  assert.match(
    verification,
    /HUMAN_PROFESSIONAL_REVIEW_REQUIRED_VALUE:\ntrue/u,
  );
  assert.match(
    verification,
    /No\n`VERIFIED`, `CURRENT`, `AUTHENTIC`, `SIGNED`, `TRUSTED`, `AUTHORIZED`/u,
  );
  assert.deepEqual(
    numberedBacktickValues(ownership),
    expectedInternalReferences,
  );
  assert.match(
    ownership,
    /PAIRWISE_DISTINCT_INTERNAL_REFERENCE_COUNT:\n6/u,
  );
  assert.match(
    ownership,
    /descriptor-safe, inspect only own data\nproperties, execute no accessor/u,
  );
  assert.match(
    ownership,
    /LOCAL_STRUCTURAL_VALIDATOR_EXTERNAL_CANDIDATE_COUNT:\n0/u,
  );
  assert.match(
    ownership,
    /LOOKUP_DEREFERENCE_DISCOVERY_OR_PERSISTENCE:\nPROHIBITED/u,
  );
  assert.match(
    ownership,
    /TRUST_PRECOMPUTED_VALIDATOR_OR_CROSS_REFERENCE_RESULT:\nPROHIBITED/u,
  );
});

test("privacy deferred ownership and schema transition remain fail-closed", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);
  const transitionText = readRequired(schemaProofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const privacy = sectionBetween(
    docsText,
    "## 14. Privacy, Closed Shape, And Shadow-Semantics Prohibition",
    "## 15.",
  );
  const validity = sectionBetween(
    docsText,
    "## 15. Structural Validity And Separate Future Admissibility",
    "## 16.",
  );
  const deferred = sectionBetween(
    docsText,
    "## 16. Deferred Ownership And Separate Future Prerequisites",
    "## 17.",
  );

  assert.equal(
    normalizeWhitespace(
      sectionBetween(
        privacy,
        "The exact fifteen fields in Section 4 are the complete allowlist.",
        "RAW_PRIVATE_SOURCE_OR_ATTESTATION_MATERIAL_FIELD_COUNT:",
      ),
    ),
    expectedPrivacyBoundary,
  );
  assert.match(
    privacy,
    /RAW_PRIVATE_SOURCE_OR_ATTESTATION_MATERIAL_FIELD_COUNT:\n0/u,
  );
  assert.match(privacy, /OPTIONAL_OR_EXTENSION_FIELD_COUNT:\n0/u);
  assert.equal(
    normalizeWhitespace(
      sectionBetween(validity, "A structurally valid candidate proves only"),
    ),
    expectedValidityBoundary,
  );

  for (const marker of [
    "FUTURE_SCHEMA_PATH:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "FUTURE_VALIDATOR_RESULT_SCHEMA_PATH:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "FUTURE_PACKAGE_EXPORT_OWNERSHIP:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "FUTURE_VALIDATOR_CODE_OWNERSHIP:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "FUTURE_OUTER_ENVELOPE_FIELD_AND_ERROR_PATH_MAP:\nDEFERRED_UNTIL_ALL_DEPENDENCY_CONTRACTS_ARE_TRACKED",
    "TRUSTED_CLOCK_CURRENTNESS_REPLACEMENT_MATRIX:\nSEPARATE_FUTURE_OWNER_DECISION_REQUIRED",
    "CRYPTOGRAPHIC_ATTESTATION_CONTRACT:\nSEPARATE_FUTURE_OWNER_DECISION_REQUIRED",
    "CURRENT_SAFE_SCHEMA_OR_RUNTIME_STEP:\nNONE",
  ]) {
    assert.equal(deferred.includes(marker), true, marker);
  }
  assert.deepEqual(candidateSchemaPaths, [
    "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json",
    "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js",
  ]);
  assert.deepEqual(
    retainedValidatorResultAndValidatorPaths,
    [
      "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json",
      "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js",
      "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
      "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
    ],
  );
  assert.equal(candidateSchemaPaths.length, 2);
  assert.equal(retainedValidatorResultAndValidatorPaths.length, 4);
  assert.deepEqual(laterSiblingPaths, [
    ...candidateSchemaPaths,
    ...retainedValidatorResultAndValidatorPaths,
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
  for (const retainedPath of retainedValidatorResultAndValidatorPaths) {
    assert.equal(
      transitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
  }
  assert.deepEqual(validatorResultCandidatePaths, [
    "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json",
    "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js",
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
  assert.deepEqual(retainedValidatorPaths, [
    "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
    "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
  ]);
  for (const retainedValidatorPath of retainedValidatorPaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" +
          retainedValidatorPath +
          "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedValidatorPath,
    );
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" +
          retainedValidatorPath +
          "` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE`",
      ),
      true,
      retainedValidatorPath,
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
        "` | preserve decision-attestation contract history and two validator sibling absences; align only the two validator-result candidate paths |",
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

test("exact two-file docs-only scope and non-interference are frozen", () => {
  const docsText = readRequired(docsPath);
  const scope = sectionBetween(
    docsText,
    "## 17. Exact Two-File Docs-Only Slice",
    "## 18.",
  );
  const nonInterference = sectionBetween(
    docsText,
    "## 18. Non-Interference Rules",
    "## 19.",
  );

  assert.deepEqual(numberedBacktickValues(scope), [docsPath, proofPath]);
  for (const marker of [
    "CURRENT_SLICE_FILE_COUNT:\n2",
    "CURRENT_SLICE_DOC_FILE_COUNT:\n1",
    "CURRENT_SLICE_FOCUSED_PROOF_FILE_COUNT:\n1",
    "CURRENT_SLICE_SCHEMA_FILE_COUNT:\n0",
    "CURRENT_SLICE_PACKAGE_EXPORT_COUNT:\n0",
    "CURRENT_SLICE_RUNTIME_FILE_COUNT:\n0",
  ]) {
    assert.equal(scope.includes(marker), true, marker);
  }
  assert.deepEqual(
    markdownBulletItems(nonInterference),
    expectedNonInterferenceItems,
  );
});

test("proof and final no-conclusion boundaries remain explicit", () => {
  const docsText = readRequired(docsPath);
  const proof = sectionBetween(docsText, "## 19. Proof Boundary", "## 20.");
  const finalBoundary = sectionBetween(
    docsText,
    "## 20. Final No-Conclusion Boundary",
  );

  assert.deepEqual(numberedTextItems(proof), expectedProofClaims);
  assert.equal(
    normalizeWhitespace(
      sectionBetween(proof, "It cannot prove", "SCHEMA_CREATED_BY_THIS_SLICE:"),
    ),
    expectedProofCannotEstablish,
  );
  for (const marker of [
    "SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_RESULT_SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "PACKAGE_EXPORT_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_OR_RUNTIME_CREATED_BY_THIS_SLICE:\nNO",
    "DECISION_ATTESTATION_VERIFIED_BY_THIS_SLICE:\nNO",
    "REVIEWER_IDENTITY_ROLE_OR_AUTHORITY_VERIFIED_BY_THIS_SLICE:\nNO",
    "APPROVAL_ADMISSIBILITY_OR_ELIGIBILITY_CREATED_BY_THIS_SLICE:\nNO",
  ]) {
    assert.equal(proof.includes(marker), true, marker);
  }
  assert.match(proof, /PROOF_CLASSIFICATION:\nSYNTHETIC_DOC_BOUNDARY_ONLY/u);
  assert.match(
    proof,
    /DOCS_ONLY_DECISION_ATTESTATION_EVIDENCE_SEMANTICS_FROZEN_IMPLEMENTATION_REMAINS_FAIL_CLOSED/u,
  );
  assert.equal(
    normalizeWhitespace(
      sectionBetween(finalBoundary, "This boundary is not", "FINAL_SAFE_ACTION:"),
    ),
    expectedFinalNoConclusion,
  );
  assert.match(
    finalBoundary,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_DECISION_ATTESTATION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_DECISION/u,
  );
  assert.match(docsText, /PRODUCT_CANDIDATE_NONE/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
});
