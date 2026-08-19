"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-contract-boundary-doc-freeze.test.js";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CROSS_REFERENCE_ADMISSIBILITY_SEMANTICS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-semantics-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json",
];
const expectedStageRows = [
  "| 1 | `OPTION_A` | one separate closed approval-specific declaration-only review-session candidate is supplied exactly once in the same call and is necessary but insufficient |",
  "| 2 | `OPTION_A` | exact contract identity and version are defined; `review_session_ref` is the candidate's sole session identity and no separate evidence-record identity is added |",
  "| 3 | `OPTION_A` | one immutable review-session record belongs to one exact approval attempt; reuse across approval attempts, mutation, embedded history, and current-record selection are prohibited |",
  "| 4 | `OPTION_A` | required `approval_ref` binds only to the approval candidate in the future outer checkpoint; packet, brief, fingerprint, decision, and attestation fields remain outside this candidate |",
  "| 5 | `OPTION_A` | required `reviewer_ref` and `reviewer_role` bind one exact reviewer attribution; multi-reviewer membership and direct reviewer-evidence references remain outside this candidate |",
  "| 6 | `OPTION_A` | no generic identity, authentication, request-binding, session, or clock candidate is composed by this contract |",
  "| 7 | `OPTION_A` | the record declares only a bounded approval review session; it is not an authentication session, security session, workflow container, or activity history |",
  "| 8 | `OPTION_A` | required opaque `binding_issuer_ref` and `binding_provenance_ref` declare origin without proving issuer trust or provenance |",
  "| 9 | `OPTION_A` | one exact three-value declared session lifecycle is an immutable structural posture, not verified currentness or a transition history |",
  "| 10 | `OPTION_A` | no timestamp, TTL, expiry field, revocation timestamp, or clock-evidence reference is present; all temporal evaluation remains separate |",
  "| 11 | `OPTION_A` | verification posture is exactly `NOT_VERIFIED_BY_CONTRACT` and human/professional review remains required |",
  "| 12 | `OPTION_A` | the root is one exact closed eleven-field flat scalar object with five pairwise-distinct references and no optional or extension fields |",
  "| 13 | `OPTION_A` | the local future validator is structural only; every external equality, reviewer-evidence relationship, trust determination, lifecycle admissibility, and currentness decision belongs to the future outer checkpoint and policy matrix |",
];
const expectedFields = [
  "contract_id",
  "contract_version",
  "review_session_ref",
  "approval_ref",
  "reviewer_ref",
  "reviewer_role",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "session_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const expectedFieldRows = [
  "| `contract_id` | string equal to `human_review.controlled_handoff_human_professional_approval_review_session_evidence` |",
  "| `contract_version` | string equal to `1.0.0` |",
  "| `review_session_ref` | opaque string matching `^rvs_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `approval_ref` | opaque string matching `^apr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `reviewer_ref` | opaque string matching `^rvr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `reviewer_role` | one exact value from Section 7 |",
  "| `binding_issuer_ref` | one exact generic opaque reference from Section 9 |",
  "| `binding_provenance_ref` | one exact generic opaque reference from Section 9 |",
  "| `session_lifecycle_posture` | one exact value from Section 10 |",
  "| `verification_posture` | string equal to `NOT_VERIFIED_BY_CONTRACT` |",
  "| `human_professional_review_required` | boolean equal to `true` |",
];
const expectedReviewerRoles = [
  "HUMAN_REVIEWER",
  "PROFESSIONAL_REVIEWER",
];
const expectedReviewerOuterEqualityItems = [
  "exact equality between the candidate's `reviewer_ref` and `approval_candidate.reviewer_attribution.reviewer_ref`",
  "exact equality between the candidate's `reviewer_role` and `approval_candidate.reviewer_attribution.reviewer_role`",
  "exact consistency across the shared approval, session, reviewer, and role fields of the separately supplied reviewer identity, role, and authority evidence candidates under their own contracts",
];
const expectedSessionExclusions = [
  "an authenticated login session",
  "a browser, API, device, provider, or security session",
  "authentication continuity or reauthentication",
  "request binding or current-request membership",
  "replay prevention or nonce validity",
  "an activity log, workflow container, transcript, or embedded history",
  "review completion, professional work performed, or approval effect",
];
const expectedTimeExclusions = [
  "session start or end timestamp",
  "observation, issuance, or update timestamp",
  "expiry or revocation timestamp",
  "TTL, duration, sequence, or version counter",
  "clock-evidence, freshness-evidence, or currentness-evidence reference",
  "prior, replacement, successor, or supersession reference",
];
const expectedNonInterferenceItems = [
  "modify any approval, Controlled Handoff Brief, reviewer identity, reviewer role, or reviewer authority contract, schema, validator, result schema, package export, checkpoint, or runtime file",
  "create a generic session, authentication, request-binding, clock, currentness, lifecycle-history, replacement, or supersession contract",
  "add packet, brief, fingerprint, decision, attestation, decision-support, participant, timestamp, TTL, expiry, revocation-time, currentness, or replacement fields to the session candidate",
  "perform lookup, dereference, discovery, persistence, registry selection, current-record selection, mutation, deletion, replacement, or supersession",
  "trust a precomputed validator or cross-reference result",
  "inspect or process raw, private, source, case, credential, provider, authentication, or real-session material",
  "create session identity, authentication, reviewer presence, reviewer qualification, reviewer authority, trusted time, freshness, currentness, approval effect, handoff eligibility, release readiness, product candidacy, or external-use authorization",
  "create a legal conclusion, evidentiary conclusion, professional opinion, finding, severity, score, recommendation, remediation, blocker resolution, security finding, compliance certification, or technical sign-off",
];
const expectedProofClaims = [
  "the thirteen Owner-selected Stage A markers and exact stage table are tracked",
  "the exact contract identity, version, eleven-field root, field order, scalar types, reference patterns, enums, constants, and pairwise-distinct set are frozen",
  "exactly one immutable direct candidate per approval attempt and the no-reuse posture are frozen",
  "approval, reviewer, origin, lifecycle, time-free, verification, privacy, and outer-checkpoint ownership boundaries are explicit",
  "schema, validator result, export, validator, checkpoint, clock/currentness matrix, persistence, API, UI, runtime, product, and external-use surfaces remain absent and unauthorized",
];
const expectedApprovalOuterEquality =
  "The future outer checkpoint, not the local structural validator, must require exact case-sensitive equality between the candidate's `approval_ref` and `approval_candidate.approval_ref`.";
const expectedReviewerExclusions =
  "The candidate contains no reviewer identity evidence reference, reviewer role evidence reference, reviewer authority evidence reference, participant array, co-reviewer array, reviewer name, professional qualification, organization, permission, authority, or scope declaration.";
const expectedSessionDependencyBoundary =
  "The contract composes no generic authenticated-actor candidate, RBAC candidate, authentication candidate, request-binding candidate, provider-session candidate, clock candidate, currentness candidate, or replacement candidate.";
const expectedPrivacyBoundary =
  "The exact eleven fields in Section 4 are the complete allowlist. The candidate contains no person name, email address, telephone number, address, account identifier, provider payload, browser identifier, device identifier, IP address, token, cookie, JWT, credential, certificate, signature, public key, nonce, session secret, URL, file path, raw content, source content, case content, transcript, prompt, response, screenshot, image, PDF, metadata, free-text reason, explanation, recommendation, finding, score, severity, remediation, or conclusion. Opaque references must not be populated with raw or encoded private material, credentials, provider payloads, URLs, paths, source excerpts, evidence content, or case content. No unknown key may carry shadow timestamps, lifecycle history, participants, authority, authentication, currentness, approval, handoff, delivery, or release semantics.";
const expectedValidityBoundary =
  "A structurally valid candidate proves only that one supplied object matches the selected closed scalar shape. It does not prove external reference existence or equality, one-real-world-session cardinality, reviewer identity or presence, authentication, request binding, issuer trust, provenance, lifecycle truth, trusted time, freshness, currentness, approval admissibility, candidate eligibility, or handoff authorization. The future outer checkpoint must stop closed when the candidate is missing, extra, duplicated, structurally invalid, mismatched, unavailable, unknown, unverifiable, stale, revoked, superseded, disputed, conflicting, or otherwise inadmissible under the later policy matrix. This document does not define that matrix or implement the checkpoint. No structural validator result shape, public error code taxonomy, JSON error path map, schema keyword order, validator execution order, package export, consumer, dispatch, checkpoint call, or runtime behavior is selected here.";
const expectedProofCannotEstablish =
  "It cannot prove contract implementation, schema correctness, validator correctness, external equality, session identity, authentication, reviewer presence, trusted time, lifecycle truth, currentness, approval admissibility, candidate eligibility, runtime behavior, professional review completion, release readiness, product candidacy, or external-use readiness.";
const expectedFinalNoConclusion =
  "This boundary is not human review, professional review, legal review, evidentiary review, identity verification, authentication, session verification, reviewer-presence verification, reviewer-role verification, reviewer-authority verification, trusted-time verification, currentness verification, lifecycle verification, approval, approval effect, handoff authorization, release authorization, product approval, external-use authorization, security review, technical sign-off, compliance certification, source-truth determination, chain-of-custody proof, or case-truth determination.";

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

test("canonical sources and the exact thirteen-stage matrix are frozen", () => {
  const docsText = readRequired(docsPath);
  const stages = sectionBetween(
    docsText,
    "## 3. Thirteen Owner-Selected Stages",
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

  for (let stage = 1; stage <= 13; stage += 1) {
    assert.match(
      docsText,
      new RegExp("OWNER_SELECTED_STAGE_" + stage + "_OPTION_A", "u"),
    );
  }

  assert.deepEqual(
    markdownTableRows(stages),
    ["| Stage | Selected option | Frozen docs-level result |", ...expectedStageRows],
  );
  assert.match(docsText, /OWNER_SELECTED_STAGE_COUNT:\n13/u);
  assert.match(docsText, /OPEN_CONTRACT_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(
    docsText,
    /OWNER_SELECTED_THIRTEEN_STAGE_SEMANTICS_TRANSLATED/u,
  );
});

test("exact identity and eleven-field closed scalar root are frozen", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5.",
  );
  const tableRows = markdownTableRows(section);

  assert.match(
    section,
    /CONTRACT_ID:\nhuman_review\.controlled_handoff_human_professional_approval_review_session_evidence/u,
  );
  assert.match(section, /CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(section, /TOP_LEVEL_FIELD_COUNT:\n11/u);
  assert.deepEqual(numberedBacktickValues(section), expectedFields);
  assert.deepEqual(
    tableRows,
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
    "REVIEW_SESSION_EVIDENCE_CANDIDATE_COUNT_PER_CALL:\n1",
    "REVIEW_SESSION_RECORD_COUNT_PER_APPROVAL_ATTEMPT:\n1",
    "REVIEW_SESSION_REFERENCE_REUSE_ACROSS_APPROVAL_ATTEMPTS:\nPROHIBITED",
    "REVIEW_SESSION_RECORD_MUTATION:\nPROHIBITED",
    "EMBEDDED_SESSION_HISTORY:\nABSENT",
    "CURRENT_SESSION_RECORD_SELECTION:\nNOT_CREATED",
  ]) {
    assert.match(section, new RegExp(marker, "u"));
  }
  assert.match(section, /There is no separate\n`review_session_evidence_ref`/u);
  assert.match(section, /requires a new approval record and a new `review_session_ref`/u);
  assert.match(section, /No array, candidate set, fallback candidate/u);
});

test("approval and reviewer bindings remain exact and externally owned", () => {
  const docsText = readRequired(docsPath);
  const approval = sectionBetween(
    docsText,
    "## 6. Exact Approval Binding And Excluded Approval Fields",
    "## 7.",
  );
  const reviewer = sectionBetween(
    docsText,
    "## 7. Exact Reviewer Binding And Reviewer-Evidence Separation",
    "## 8.",
  );

  assert.equal(approval.includes("`^apr_[a-z0-9][a-z0-9_-]{0,59}$`"), true);
  assert.equal(
    normalizeWhitespace(
      sectionBetween(
        approval,
        "The future outer checkpoint, not the local structural validator",
        "The review-session candidate contains no:",
      ),
    ),
    expectedApprovalOuterEquality,
  );
  assert.deepEqual(numberedBacktickValues(approval), [
    "packet_ref",
    "controlled_handoff_brief_ref",
    "controlled_handoff_brief_fingerprint",
    "approval_posture",
    "decision",
    "decision_attestation_ref",
    "decision_support",
  ]);
  assert.match(approval, /EXCLUDED_APPROVAL_FIELD_COUNT:\n7/u);

  assert.equal(reviewer.includes("`^rvr_[a-z0-9][a-z0-9_-]{0,59}$`"), true);
  assert.deepEqual(
    numberedBacktickValues(
      sectionBetween(
        reviewer,
        "The exact reviewer-role values in canonical order are:",
        "REVIEWER_ROLE_VALUE_COUNT:",
      ),
    ),
    expectedReviewerRoles,
  );
  assert.match(reviewer, /REVIEWER_ROLE_VALUE_COUNT:\n2/u);
  assert.match(reviewer, /REVIEWER_CARDINALITY_PER_SESSION_RECORD:\n1/u);
  assert.match(reviewer, /MULTI_REVIEWER_OR_PARTICIPANT_MEMBERSHIP:\nPROHIBITED/u);
  assert.deepEqual(
    numberedTextItems(
      sectionBetween(
        reviewer,
        "The future outer checkpoint, not the local structural validator",
        "The candidate contains no reviewer identity evidence reference",
      ),
    ),
    expectedReviewerOuterEqualityItems,
  );
  assert.equal(
    normalizeWhitespace(
      sectionBetween(
        reviewer,
        "The candidate contains no reviewer identity evidence reference",
        "REVIEWER_CARDINALITY_PER_SESSION_RECORD:",
      ),
    ),
    expectedReviewerExclusions,
  );
});

test("session meaning and dependency ownership remain declaration-only", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 8. Session Meaning And Dependency Ownership",
    "## 9.",
  );

  assert.deepEqual(markdownBulletItems(section), expectedSessionExclusions);
  assert.equal(
    normalizeWhitespace(
      sectionBetween(
        section,
        "The contract composes no generic authenticated-actor candidate",
        "COMPOSED_GENERIC_OR_EXTERNAL_DEPENDENCY_CANDIDATE_COUNT:",
      ),
    ),
    expectedSessionDependencyBoundary,
  );
  assert.match(
    section,
    /COMPOSED_GENERIC_OR_EXTERNAL_DEPENDENCY_CANDIDATE_COUNT:\n0/u,
  );
  assert.match(
    section,
    /GENERIC_IDENTITY_AUTHENTICATION_OR_REQUEST_BINDING_AS_SESSION_VALIDITY:\nPROHIBITED/u,
  );
});

test("opaque origin references lifecycle and time-free posture are exact", () => {
  const docsText = readRequired(docsPath);
  const origin = sectionBetween(
    docsText,
    "## 9. Binding Issuer, Provenance, And Opaque References",
    "## 10.",
  );
  const lifecycle = sectionBetween(
    docsText,
    "## 10. Declared Lifecycle And Time Separation",
    "## 11.",
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
  assert.match(origin, /ISSUER_OR_PROVENANCE_VERIFICATION:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u);

  assert.deepEqual(numberedBacktickValues(lifecycle), [
    "REVIEW_SESSION_DECLARED_ACTIVE",
    "REVIEW_SESSION_DECLARED_INACTIVE",
    "REVIEW_SESSION_DECLARED_REVOKED",
  ]);
  assert.deepEqual(markdownBulletItems(lifecycle), expectedTimeExclusions);
  assert.match(lifecycle, /SESSION_LIFECYCLE_POSTURE_COUNT:\n3/u);
  assert.match(lifecycle, /Even\n`REVIEW_SESSION_DECLARED_ACTIVE` remains unverified/u);
  assert.match(lifecycle, /INLINE_SESSION_TIME_FIELD_COUNT:\n0/u);
  assert.match(lifecycle, /SESSION_CLOCK_EVIDENCE_REFERENCE_COUNT:\n0/u);
  assert.match(
    lifecycle,
    /TRUSTED_TIME_CURRENTNESS_REPLACEMENT_EVALUATION:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u,
  );
  assert.match(lifecycle, /ARBITRARY_OR_GLOBAL_TTL:\nPROHIBITED/u);
});

test("verification posture reference distinctness and outer ownership are exact", () => {
  const docsText = readRequired(docsPath);
  const verification = sectionBetween(
    docsText,
    "## 11. Verification Posture And Required Human Review",
    "## 12.",
  );
  const ownership = sectionBetween(
    docsText,
    "## 12. Reference Distinctness And External Equality Ownership",
    "## 13.",
  );

  assert.match(verification, /VERIFICATION_POSTURE_COUNT:\n1/u);
  assert.match(verification, /VERIFICATION_POSTURE_VALUE:\nNOT_VERIFIED_BY_CONTRACT/u);
  assert.match(verification, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED_VALUE:\ntrue/u);
  assert.match(verification, /No\n`VERIFIED`, `CURRENT`, `AUTHENTICATED`, `TRUSTED`, `ADMISSIBLE`, `APPROVED`/u);

  assert.deepEqual(numberedBacktickValues(ownership), [
    "review_session_ref",
    "approval_ref",
    "reviewer_ref",
    "binding_issuer_ref",
    "binding_provenance_ref",
  ]);
  assert.match(ownership, /PAIRWISE_DISTINCT_INTERNAL_REFERENCE_COUNT:\n5/u);
  assert.match(ownership, /LOCAL_STRUCTURAL_VALIDATOR_EXTERNAL_CANDIDATE_COUNT:\n0/u);
  assert.match(ownership, /LOOKUP_DEREFERENCE_DISCOVERY_OR_PERSISTENCE:\nPROHIBITED/u);
  assert.match(ownership, /TRUST_PRECOMPUTED_VALIDATOR_OR_CROSS_REFERENCE_RESULT:\nPROHIBITED/u);
});

test("privacy structural non-effects and deferred ownership remain fail-closed", () => {
  const docsText = readRequired(docsPath);
  const privacy = sectionBetween(
    docsText,
    "## 13. Privacy, Closed Shape, And Shadow-Semantics Prohibition",
    "## 14.",
  );
  const validity = sectionBetween(
    docsText,
    "## 14. Structural Validity And Separate Future Admissibility",
    "## 15.",
  );
  const deferred = sectionBetween(
    docsText,
    "## 15. Deferred Ownership And Separate Future Prerequisites",
    "## 16.",
  );

  assert.equal(
    normalizeWhitespace(
      sectionBetween(
        privacy,
        "The exact eleven fields in Section 4 are the complete allowlist.",
        "RAW_PRIVATE_SOURCE_OR_SESSION_MATERIAL_FIELD_COUNT:",
      ),
    ),
    expectedPrivacyBoundary,
  );
  assert.match(privacy, /RAW_PRIVATE_SOURCE_OR_SESSION_MATERIAL_FIELD_COUNT:\n0/u);
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
    "CURRENT_SAFE_SCHEMA_OR_RUNTIME_STEP:\nNONE",
  ]) {
    assert.match(deferred, new RegExp(marker, "u"));
  }
  assert.equal(
    normalizeWhitespace(
      sectionBetween(deferred, "No future path is reserved or authorized"),
    ),
    "No future path is reserved or authorized by this boundary. Schema scaffold, validator-result semantics, package exports, structural validator, cross-reference integration, clock/currentness policy, consumer selection, and runtime checkpoint remain separate slices with their own review gates.",
  );
});

test("exact two-file docs-only scope and non-interference are frozen", () => {
  const docsText = readRequired(docsPath);
  const scope = sectionBetween(
    docsText,
    "## 16. Exact Two-File Docs-Only Slice",
    "## 17.",
  );
  const nonInterference = sectionBetween(
    docsText,
    "## 17. Non-Interference Rules",
    "## 18.",
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
    assert.match(scope, new RegExp(marker, "u"));
  }
  assert.deepEqual(
    markdownBulletItems(nonInterference),
    expectedNonInterferenceItems,
  );
});

test("proof and final no-conclusion boundaries remain explicit", () => {
  const docsText = readRequired(docsPath);
  const proof = sectionBetween(docsText, "## 18. Proof Boundary", "## 19.");
  const finalBoundary = sectionBetween(
    docsText,
    "## 19. Final No-Conclusion Boundary",
  );

  assert.deepEqual(numberedTextItems(proof), expectedProofClaims);
  assert.equal(
    normalizeWhitespace(
      sectionBetween(proof, "It cannot prove", "PROOF_CLASSIFICATION:"),
    ),
    expectedProofCannotEstablish,
  );
  for (const marker of [
    "SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_RESULT_SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "PACKAGE_EXPORT_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_OR_RUNTIME_CREATED_BY_THIS_SLICE:\nNO",
    "REVIEW_SESSION_VERIFIED_BY_THIS_SLICE:\nNO",
    "REVIEWER_IDENTITY_ROLE_OR_AUTHORITY_VERIFIED_BY_THIS_SLICE:\nNO",
    "APPROVAL_ADMISSIBILITY_OR_ELIGIBILITY_CREATED_BY_THIS_SLICE:\nNO",
  ]) {
    assert.match(proof, new RegExp(marker, "u"));
  }
  assert.match(proof, /PROOF_CLASSIFICATION:\nSYNTHETIC_DOC_BOUNDARY_ONLY/u);
  assert.match(
    proof,
    /DOCS_ONLY_REVIEW_SESSION_EVIDENCE_SEMANTICS_FROZEN_IMPLEMENTATION_REMAINS_FAIL_CLOSED/u,
  );
  assert.equal(
    normalizeWhitespace(
      sectionBetween(finalBoundary, "This boundary is not", "FINAL_SAFE_ACTION:"),
    ),
    expectedFinalNoConclusion,
  );
  assert.match(
    finalBoundary,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_REVIEW_SESSION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_DECISION/u,
  );
  assert.match(docsText, /PRODUCT_CANDIDATE_NONE/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
});
