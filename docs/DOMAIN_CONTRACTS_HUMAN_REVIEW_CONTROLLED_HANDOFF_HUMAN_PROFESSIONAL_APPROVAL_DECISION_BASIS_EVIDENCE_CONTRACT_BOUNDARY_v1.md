# Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Contract Boundary v1

HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY
DOCS_ONLY
OWNER_SELECTED_STAGE_1_OPTION_A
OWNER_SELECTED_STAGE_2_OPTION_A
OWNER_SELECTED_STAGE_3_OPTION_A
OWNER_SELECTED_STAGE_4_OPTION_A
OWNER_SELECTED_STAGE_5_OPTION_A
OWNER_SELECTED_STAGE_6_OPTION_A
OWNER_SELECTED_STAGE_7_OPTION_A
OWNER_SELECTED_STAGE_8_OPTION_A
OWNER_SELECTED_STAGE_9_OPTION_A
OWNER_SELECTED_STAGE_10_OPTION_A
OWNER_SELECTED_STAGE_11_OPTION_A
OWNER_SELECTED_STAGE_12_OPTION_A
OWNER_SELECTED_STAGE_13_OPTION_A
OWNER_SELECTED_STAGE_14_OPTION_A
OWNER_SELECTED_STAGE_15_OPTION_A
OWNER_SELECTED_STAGE_16_OPTION_A
OWNER_SELECTED_STAGE_17_OPTION_A
OWNER_SELECTED_STAGE_18_OPTION_A
OWNER_SELECTED_EIGHTEEN_STAGE_SEMANTICS_TRANSLATED
OPEN_CONTRACT_SEMANTIC_DECISION_COUNT_ZERO
SEPARATE_APPROVAL_SPECIFIC_DECISION_BASIS_EVIDENCE_CONTRACT
ONE_DIRECT_CANDIDATE_PER_UNIQUE_DECLARED_DECISION_BASIS_REFERENCE
EXACT_ORDERED_CANDIDATE_SET_REQUIRED
DECLARATION_ONLY_NECESSARY_BUT_INSUFFICIENT
DECISION_BASIS_REF_IS_SOLE_CANDIDATE_IDENTITY
ONE_IMMUTABLE_RECORD_PER_APPROVAL_ATTEMPT
DECISION_BASIS_REFERENCE_REUSE_ACROSS_APPROVAL_ATTEMPTS_PROHIBITED
EXACT_SIXTEEN_REQUIRED_ROOT_FIELDS
EXACT_SEVEN_PAIRWISE_DISTINCT_REFERENCES
EXACT_SIX_VALUE_BASIS_SUBJECT_KIND_ENUM
EXACT_THREE_VALUE_APPROVAL_DECISION_ENUM_REUSED
EXACT_TWO_VALUE_REVIEWER_ROLE_ENUM_REUSED
EXACT_ONE_VALUE_BASIS_POSTURE
EXACT_THREE_VALUE_DECLARED_BASIS_LIFECYCLE
REFERENCE_ONLY_NO_INLINE_BASIS_CONTENT
NO_FREE_TEXT_RAW_CONTENT_OR_SOURCE_EXCERPT
NOT_VERIFIED_BY_CONTRACT
NO_LOOKUP_DEREFERENCE_DISCOVERY_OR_PERSISTENCE
SCHEMA_NOT_CREATED
VALIDATOR_RESULT_SCHEMA_NOT_CREATED
PACKAGE_EXPORT_NOT_CREATED
VALIDATOR_NOT_CREATED
CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED
TRUSTED_TIME_CURRENTNESS_REPLACEMENT_MATRIX_NOT_CREATED
PERSISTENCE_API_UI_RUNTIME_NOT_CREATED
REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_USE_NOT_AUTHORIZED
NO_RELEVANCE_SUFFICIENCY_PROBATIVE_VALUE_APPROVAL_OR_CONCLUSION_CREATED
PRODUCT_CANDIDATE_NONE
EXTERNAL_USE_NOT_AUTHORIZED
HUMAN_PROFESSIONAL_REVIEW_REQUIRED

## 1. Purpose

This docs-only boundary freezes the Owner-selected version 1 contract semantics
for one approval-specific decision-basis evidence candidate. Each candidate is
one closed declaration record that binds one exact approval attempt, one exact
declared decision, one exact reviewer and review session, and one exact
reference-only Human Review subject.

The future outer approval admissibility envelope must receive exactly one
candidate for every pairwise-unique entry in
`approval_candidate.decision_support.decision_basis_refs`. Candidate order must
match the approval reference order exactly. Every candidate is necessary but
never sufficient for approval admissibility, candidate eligibility, handoff,
delivery, or release.

A candidate declares only that one already governed Human Review item is named
as a proposed basis subject for the bound approval decision. It does not prove
that the item exists, belongs to the packet, is authentic, is current, is
relevant, supports the decision, is sufficient, has probative value, or
justifies any legal, evidentiary, professional, technical, or release outcome.

This document creates no JSON Schema, validator-result schema, package export,
validator, cross-reference checkpoint, trusted clock, currentness evaluator,
replacement selector, persistence, API, route, user interface, runtime
behavior, product candidate, or external-use authorization. It processes no
raw, private, source, case, identity, session, or real-evidence material.

Human/professional review remains the release gate.

## 2. Canonical Sources And Precedent Boundary

The controlling approval and approval-checkpoint sources are:

- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-controlled-handoff-human-professional-approval.json`
- `packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js`
- `tests/human-review-controlled-handoff-human-professional-approval-validator.test.js`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CROSS_REFERENCE_ADMISSIBILITY_SEMANTICS_BOUNDARY_v1.md`
- `tests/domain-human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-semantics-boundary-doc-freeze.test.js`

The controlling Controlled Handoff Brief and Human Review subject-family
sources are:

- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-controlled-handoff-brief.json`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-source-register.json`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-chronology.json`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-asserted-claim-matrix.json`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-declared-packet-review-gaps.json`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-questions.json`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-no-conclusion-notice.json`

The controlling approval-specific reviewer, session, and attestation precedent
sources are:

- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_CONTRACT_BOUNDARY_v1.md`
- `schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json`

The approval contract supplies the exact approval, decision-basis,
review-session, reviewer, reviewer-role, decision, and attempt vocabularies.
The approval cross-reference admissibility boundary requires one directly
supplied decision-basis candidate for every declared decision-basis reference
and keeps decision-basis sufficiency separately unresolved.

The six Human Review contracts provide the only selected version 1 subject
families. Their item references are opaque structural identifiers. Their
contracts do not establish truth, relevance, credibility, sufficiency,
probative value, approval effect, or release authority.

No tracked generic rationale, recommendation, finding, score, legal-reasoning,
evidentiary-weight, or free-text contract directly satisfies this dependency
family.

Chat-only selections become repository truth only through this tracked
boundary after review and merge. Handoff text, local memory, untracked files,
raw material, private material, source content, case material, and real
evidence are not canonical contract sources.

## 3. Eighteen Owner-Selected Stages

| Stage | Selected option | Frozen docs-level result |
| --- | --- | --- |
| 1 | `OPTION_A` | one separate closed declaration-only decision-basis candidate is supplied directly for every unique declared `decision_basis_ref`; the exact set is necessary but insufficient |
| 2 | `OPTION_A` | exact contract identity and version are defined; `decision_basis_ref` is the candidate's sole identity and no separate evidence-record identity is added |
| 3 | `OPTION_A` | one immutable decision-basis record belongs to one exact approval attempt; reuse across approval attempts, mutation, embedded history, and current-record selection are prohibited |
| 4 | `OPTION_A` | required `approval_ref` and `decision_basis_ref` bind only to the approval candidate in the future outer checkpoint; approval, packet, brief, and fingerprint objects are not embedded |
| 5 | `OPTION_A` | required `decision` reuses the exact approval enum and must equal the approval candidate's decision without establishing support, sufficiency, or approval effect |
| 6 | `OPTION_A` | required `reviewer_ref` and `reviewer_role` bind one exact approval reviewer attribution; no separate basis author or participant membership is added |
| 7 | `OPTION_A` | required `review_session_ref` binds to both the approval candidate and the separately supplied review-session candidate without proving session validity |
| 8 | `OPTION_A` | the candidate is reference-only and contains no free text, rationale, summary, recommendation, conclusion, raw material, source excerpt, or inline Human Review item |
| 9 | `OPTION_A` | required `basis_subject_kind` and `basis_subject_ref` select exactly one item from exactly one of six already governed Human Review subject families |
| 10 | `OPTION_A` | candidates follow approval `decision_basis_refs` order exactly; basis-subject kind/reference pairs are unique and order creates no priority, weight, or probative meaning |
| 11 | `OPTION_A` | `basis_posture` has the sole value `DECISION_BASIS_CANDIDATE_ONLY` and creates no support, relevance, sufficiency, acceptance, or approval effect |
| 12 | `OPTION_A` | required opaque `binding_issuer_ref` and `binding_provenance_ref` declare origin without proving issuer trust, provenance, ownership, or chain of custody |
| 13 | `OPTION_A` | one exact three-value declared basis lifecycle is an immutable structural posture, not verified currentness, revocation proof, or transition history |
| 14 | `OPTION_A` | verification posture is exactly `NOT_VERIFIED_BY_CONTRACT` and human/professional review remains required |
| 15 | `OPTION_A` | version 1 contains no timestamp, TTL, expiry, revocation time, update time, or clock-evidence reference; all temporal evaluation remains separate |
| 16 | `OPTION_A` | the root is one exact closed sixteen-field flat scalar object with no optional, extension, nested, accessor, symbol, or free-text fields |
| 17 | `OPTION_A` | seven internal references are pairwise distinct while approval, session, reviewer, decision, candidate-set, and subject bindings use exact case-sensitive equality without normalization or lookup |
| 18 | `OPTION_A` | the local future validator is descriptor-safe and structural only; every external equality, membership, trust, identity, authority, time, currentness, relevance, sufficiency, admissibility, and approval-effect decision belongs to future outer seams |

OWNER_SELECTED_STAGE_COUNT:
18

OPEN_CONTRACT_SEMANTIC_DECISION_COUNT:
0

Resolution of these documentation decisions is not schema, validator, runtime,
admissibility, release, or external-use authority.

## 4. Contract Identity And Exact Root Shape

CONTRACT_ID:
human_review.controlled_handoff_human_professional_approval_decision_basis_evidence

CONTRACT_VERSION:
1.0.0

The candidate is one plain closed object whose prototype is exactly
`Object.prototype` or `null`. It has exactly these required fields in this
declaration and future structural-validation order:

1. `contract_id`
2. `contract_version`
3. `decision_basis_ref`
4. `approval_ref`
5. `review_session_ref`
6. `reviewer_ref`
7. `reviewer_role`
8. `decision`
9. `basis_subject_kind`
10. `basis_subject_ref`
11. `basis_posture`
12. `binding_issuer_ref`
13. `binding_provenance_ref`
14. `basis_lifecycle_posture`
15. `verification_posture`
16. `human_professional_review_required`

TOP_LEVEL_FIELD_COUNT:
16

| Field | Exact structural contract |
| --- | --- |
| `contract_id` | string equal to `human_review.controlled_handoff_human_professional_approval_decision_basis_evidence` |
| `contract_version` | string equal to `1.0.0` |
| `decision_basis_ref` | opaque string matching `^rvb_[a-z0-9][a-z0-9_-]{0,59}$` |
| `approval_ref` | opaque string matching `^apr_[a-z0-9][a-z0-9_-]{0,59}$` |
| `review_session_ref` | opaque string matching `^rvs_[a-z0-9][a-z0-9_-]{0,59}$` |
| `reviewer_ref` | opaque string matching `^rvr_[a-z0-9][a-z0-9_-]{0,59}$` |
| `reviewer_role` | one exact value from Section 7 |
| `decision` | one exact value from Section 6 |
| `basis_subject_kind` | one exact value from Section 9 |
| `basis_subject_ref` | one exact kind-matched opaque item reference from Section 9 |
| `basis_posture` | string equal to `DECISION_BASIS_CANDIDATE_ONLY` |
| `binding_issuer_ref` | one exact generic opaque reference from Section 12 |
| `binding_provenance_ref` | one exact generic opaque reference from Section 12 |
| `basis_lifecycle_posture` | one exact value from Section 13 |
| `verification_posture` | string equal to `NOT_VERIFIED_BY_CONTRACT` |
| `human_professional_review_required` | boolean equal to `true` |

No field is optional. Unknown string or symbol keys, aliases, accessors, null
field values, nested values, arrays, and extension fields are prohibited.
Dates, maps, sets, regular expressions, functions, buffers, typed arrays, and
other non-scalar field values are invalid.

## 5. Candidate Cardinality, Order, Identity, And Immutability

For every exact pairwise-unique `decision_basis_refs` entry in one supplied
approval candidate, the future outer admissibility envelope supplies one and
only one direct decision-basis candidate with the same `decision_basis_ref`.

DECISION_BASIS_EVIDENCE_CANDIDATE_COUNT_PER_CALL:
EXACTLY_ONE_PER_UNIQUE_DECLARED_DECISION_BASIS_REFERENCE

DECISION_BASIS_EVIDENCE_CANDIDATE_MINIMUM_COUNT_PER_CALL:
1

DECISION_BASIS_EVIDENCE_CANDIDATE_ORDER:
EXACT_APPROVAL_DECISION_BASIS_REFERENCE_ORDER

MISSING_EXTRA_DUPLICATE_OR_REORDERED_CANDIDATE:
STOP_CLOSED_IN_FUTURE_OUTER_CHECKPOINT

Each candidate's `decision_basis_ref` is both its sole identity and the opaque
reference carried by the approval candidate. There is no separate
`decision_basis_evidence_ref`.

DECISION_BASIS_RECORD_COUNT_PER_REFERENCE_PER_APPROVAL_ATTEMPT:
1

DECISION_BASIS_REFERENCE_REUSE_ACROSS_APPROVAL_ATTEMPTS:
PROHIBITED

DECISION_BASIS_RECORD_MUTATION:
PROHIBITED

EMBEDDED_DECISION_BASIS_HISTORY:
ABSENT

CURRENT_DECISION_BASIS_RECORD_SELECTION:
NOT_CREATED

A correction, replacement decision, rejection, or other new approval attempt
requires a new approval record and a new complete ordered set of decision-basis
records with new `decision_basis_ref` values. This contract does not select a
current attempt, order attempts, replace a prior record, or authorize deletion
or mutation.

No generic evidence bag, lookup result, registry result, persistence-loaded
candidate, precomputed validator result, or precomputed cross-reference result
may substitute for the exact direct candidates.

## 6. Exact Approval, Reference, And Decision Binding

The candidate requires:

1. `decision_basis_ref` matching `^rvb_[a-z0-9][a-z0-9_-]{0,59}$`
2. `approval_ref` matching `^apr_[a-z0-9][a-z0-9_-]{0,59}$`
3. `decision` using the exact canonical enum below

The exact decision values in canonical order are:

1. `HUMAN_PROFESSIONAL_GATE_APPROVED`
2. `HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED`
3. `HUMAN_PROFESSIONAL_GATE_REJECTED`

DECISION_ENUM_COUNT:
3

The future outer checkpoint, not the local structural validator, must require:

1. exact equality between the candidate's `approval_ref` and `approval_candidate.approval_ref`
2. exact equality between the candidate's `decision` and `approval_candidate.decision`
3. exact equality between each candidate's `decision_basis_ref` and the approval `decision_basis_refs` entry at the same canonical position
4. complete one-to-one ordered coverage of the approval `decision_basis_refs` array with no missing, extra, duplicate, or reordered candidate

The decision-basis candidate contains no:

1. `packet_ref`
2. `controlled_handoff_brief_ref`
3. `controlled_handoff_brief_fingerprint`
4. `approval_posture`
5. embedded `decision_support`
6. `decided_at`
7. `decision_attestation_ref`
8. `prior_approval_refs`
9. `correction_request_refs`

EXCLUDED_APPROVAL_FIELD_COUNT:
9

The decision value identifies only which already-declared approval decision is
bound to this candidate. It does not interpret, replace, override, validate,
support, justify, approve, reject, correct, or otherwise give effect to that
decision.

## 7. Exact Reviewer And Review-Session Binding

The candidate requires one `reviewer_ref` matching:

`^rvr_[a-z0-9][a-z0-9_-]{0,59}$`

The exact reviewer-role values in canonical order are:

1. `HUMAN_REVIEWER`
2. `PROFESSIONAL_REVIEWER`

REVIEWER_ROLE_VALUE_COUNT:
2

The candidate also requires one `review_session_ref` matching:

`^rvs_[a-z0-9][a-z0-9_-]{0,59}$`

The future outer checkpoint, not the local structural validator, must require:

1. exact equality between the candidate's `reviewer_ref` and `approval_candidate.reviewer_attribution.reviewer_ref`
2. exact equality between the candidate's `reviewer_role` and `approval_candidate.reviewer_attribution.reviewer_role`
3. exact equality between the candidate's `review_session_ref` and `approval_candidate.review_session_ref`
4. exact equality between the candidate's `review_session_ref` and the separately supplied review-session candidate's `review_session_ref`
5. exact consistency across the shared approval, session, reviewer, and role fields of the separately supplied reviewer identity, role, and authority evidence candidates under their own contracts

The candidate contains no separate basis author, attester, reviewer identity
evidence reference, reviewer role evidence reference, reviewer authority
evidence reference, participant array, co-reviewer array, reviewer name,
professional qualification, organization, permission, credential, signature,
or authority declaration.

REVIEWER_CARDINALITY_PER_DECISION_BASIS_RECORD:
1

MULTI_AUTHOR_OR_PARTICIPANT_MEMBERSHIP:
PROHIBITED

Passing this structural contract does not prove reviewer identity, role,
qualification, presence, independence, authority, permission, authorship, or
scope. Passing the separate review-session structural contract does not prove
session existence, validity, authentication, continuity, or currentness.

## 8. Strict Reference-Only Basis Representation

The candidate contains no:

1. free-text basis, rationale, reason, explanation, narrative, or summary
2. recommendation, conclusion, finding, score, severity, rank, weight, or probability
3. raw source material, source excerpt, evidence excerpt, transcript, message, or attachment
4. filename, path, URL, locator, query, prompt, response, provider payload, or model output
5. inline Source Register source, Review Chronology entry, Asserted Claim, Declared Review Gap, Human Review Question, or No-Conclusion Notice
6. legal rule, legal analysis, evidentiary analysis, credibility assessment, sufficiency assessment, or professional opinion
7. signature, certificate, credential, key, biometric data, cryptographic proof, or attestation material

PROHIBITED_INLINE_BASIS_CONTENT_CATEGORY_COUNT:
7

The only subject representation is the exact closed
`basis_subject_kind`/`basis_subject_ref` pair from Section 9. Opaque references
must not encode or contain raw, private, source, case, identity, credential,
provider, model, or evidentiary material.

REFERENCE_ONLY_DECISION_BASIS_POSTURE:
REQUIRED

## 9. Exact Basis Subject Kind And Reference Mapping

`basis_subject_kind` has exactly these values in canonical order:

1. `SOURCE_REGISTER_SOURCE`
2. `REVIEW_CHRONOLOGY_ENTRY`
3. `ASSERTED_CLAIM`
4. `DECLARED_REVIEW_GAP`
5. `HUMAN_REVIEW_QUESTION`
6. `NO_CONCLUSION_NOTICE`

BASIS_SUBJECT_KIND_COUNT:
6

The exact kind-to-reference mapping is:

| `basis_subject_kind` | Required `basis_subject_ref` pattern | Direct same-call candidate and item field |
| --- | --- | --- |
| `SOURCE_REGISTER_SOURCE` | `^src_[a-z0-9][a-z0-9_-]{0,59}$` | Source Register `sources[].source_ref` |
| `REVIEW_CHRONOLOGY_ENTRY` | `^chr_[a-z0-9][a-z0-9_-]{0,59}$` | Review Chronology `entries[].entry_ref` |
| `ASSERTED_CLAIM` | `^clm_[a-z0-9][a-z0-9_-]{0,59}$` | Asserted Claim Matrix `claims[].claim_ref` |
| `DECLARED_REVIEW_GAP` | `^gap_[a-z0-9][a-z0-9_-]{0,59}$` | Declared Packet Review Gaps `gaps[].gap_ref` |
| `HUMAN_REVIEW_QUESTION` | `^qst_[a-z0-9][a-z0-9_-]{0,59}$` | Human Review Questions `questions[].question_ref` |
| `NO_CONCLUSION_NOTICE` | `^ncn_[a-z0-9][a-z0-9_-]{0,59}$` | No-Conclusion Notice `notices[].notice_ref` |

BASIS_SUBJECT_REFERENCE_PATTERN_COUNT:
6

BASIS_SUBJECT_COUNT_PER_CANDIDATE:
1

The local structural validator may enforce only the exact enum and conditional
kind-to-pattern mapping. The future outer checkpoint, only after the existing
Controlled Handoff Brief pre-approval boundary succeeds, must require that the
subject reference occurs exactly once in the named directly supplied Human
Review candidate for the exact same packet.

Subject-reference equality and same-call membership do not prove truth,
authenticity, relevance, support, sufficiency, probative value, review
completion, approval effect, or release authority.

SUBJECT_LOOKUP_DEREFERENCE_DISCOVERY_OR_PERSISTENCE:
PROHIBITED

## 10. Exact Candidate-Set And Duplicate-Subject Rules

The future outer envelope must preserve the approval candidate's
`decision_basis_refs` order exactly. Candidate position creates only
deterministic processing order.

CANDIDATE_ORDER_CREATES_PRIORITY_WEIGHT_OR_STRENGTH:
NO

Across one approval attempt, every exact
`basis_subject_kind`/`basis_subject_ref` pair must be unique. A later candidate
with the same exact pair stops the future outer checkpoint.

BASIS_SUBJECT_PAIR_DUPLICATION_WITHIN_APPROVAL_ATTEMPT:
PROHIBITED

Comparison is exact and case-sensitive. No normalization, case folding, prefix
stripping, Unicode normalization, URL decoding, alias resolution, or
derivation is permitted.

This version does not define multiple relationship types to the same subject.
Any future need for multiple independently meaningful relationships to one
subject requires a separately governed contract version.

## 11. Basis Posture And No-Support Boundary

BASIS_POSTURE_COUNT:
1

BASIS_POSTURE_VALUE:
DECISION_BASIS_CANDIDATE_ONLY

`DECISION_BASIS_CANDIDATE_ONLY` means only that the supplied object is a
proposed declaration record for the exact bound approval attempt and subject.
It is not a `SUPPORTS`, `PROVES`, `SUFFICIENT`, `RELEVANT`, `ACCEPTED`,
`ADMISSIBLE`, `APPROVED`, or equivalent positive posture.

No field or field combination creates direction, strength, weight, ranking,
credibility, reliability, relevance, merit, sufficiency, probative value,
legal effect, evidentiary effect, professional sign-off, approval effect,
handoff eligibility, or release authority.

## 12. Binding Issuer, Provenance, And Opaque References

The two generic-style references are:

1. `binding_issuer_ref`
2. `binding_provenance_ref`

Each is a string of 1 through 128 characters matching:

`^[A-Za-z0-9._:-]{1,128}$`

The values `.` and `..` are invalid. Values beginning with `http:`, `https:`,
`ftp:`, `file:`, `mailto:`, `data:`, or `javascript:`, compared
case-insensitively, are invalid.

The references declare only which opaque issuer and provenance records are
associated with this declaration. Neither reference proves issuer identity,
issuer authority, source trust, provenance truth, authorship, ownership,
subject authenticity, or chain of custody. No source-class enum or
trusted-issuer enum is created.

OPAQUE_BINDING_REFERENCE_COUNT:
2

ISSUER_OR_PROVENANCE_VERIFICATION:
NOT_CREATED_AND_IMPLEMENTATION_BLOCKING

## 13. Declared Basis Lifecycle

`basis_lifecycle_posture` has exactly these values in canonical order:

1. `DECISION_BASIS_DECLARED_ACTIVE`
2. `DECISION_BASIS_DECLARED_INACTIVE`
3. `DECISION_BASIS_DECLARED_REVOKED`

BASIS_LIFECYCLE_POSTURE_COUNT:
3

The lifecycle field is one immutable declaration for the bound approval
attempt. It is not a transition event, lifecycle history, current-state proof,
revocation proof, or admissibility decision. Even
`DECISION_BASIS_DECLARED_ACTIVE` remains unverified.

No declared-active value, issuer reference, provenance reference, subject
membership, approval reference, or absence of a revocation field may establish
lifecycle truth or currentness.

## 14. Verification Posture And Required Human Review

VERIFICATION_POSTURE_COUNT:
1

VERIFICATION_POSTURE_VALUE:
NOT_VERIFIED_BY_CONTRACT

HUMAN_PROFESSIONAL_REVIEW_REQUIRED_VALUE:
true

`NOT_VERIFIED_BY_CONTRACT` is the only permitted verification posture. No
`VERIFIED`, `CURRENT`, `AUTHENTIC`, `TRUSTED`, `RELEVANT`, `SUPPORTED`,
`SUFFICIENT`, `ADMISSIBLE`, `APPROVED`, or equivalent positive posture is
permitted.

Structural validity does not prove subject existence, membership,
authenticity, truth, relevance, support, sufficiency, probative value, reviewer
identity, reviewer role, reviewer authority, session validity, lifecycle
truth, time, freshness, currentness, issuer trust, provenance, decision
validity, approval effect, handoff eligibility, release readiness, product
readiness, or external-use readiness.

## 15. Temporal And Currentness Separation

Version 1 contains no:

1. creation, declaration, observation, issuance, decision, update, expiry, or revocation timestamp
2. TTL, duration, sequence, version counter, or timezone offset
3. clock-evidence, freshness-evidence, or currentness-evidence reference
4. prior, replacement, successor, or supersession reference

INLINE_TIME_FIELD_COUNT:
0

CLOCK_OR_CURRENTNESS_EVIDENCE_REFERENCE_COUNT:
0

The candidate does not copy `approval_candidate.decided_at` or a decision
attestation's `attested_at`. Trusted time, temporal order, per-family
freshness, lifecycle admissibility, current-record selection, conflict
handling, replacement, and supersession remain in the separately required
clock/currentness/replacement matrix.

TRUSTED_TIME_CURRENTNESS_REPLACEMENT_EVALUATION:
NOT_CREATED_AND_IMPLEMENTATION_BLOCKING

ARBITRARY_OR_GLOBAL_TTL:
PROHIBITED

## 16. Reference Distinctness And External Equality Ownership

These seven internal reference fields must be pairwise distinct under exact
case-sensitive string equality:

1. `decision_basis_ref`
2. `approval_ref`
3. `review_session_ref`
4. `reviewer_ref`
5. `basis_subject_ref`
6. `binding_issuer_ref`
7. `binding_provenance_ref`

PAIRWISE_DISTINCT_INTERNAL_REFERENCE_COUNT:
7

No normalization, case folding, prefix stripping, URL decoding, Unicode
normalization, alias resolution, coercion, or derived comparison is permitted.

The future local structural validator may check only the complete closed root,
field presence and order, primitive types, exact constants, enums, reference
patterns, kind-to-reference-pattern mapping, generic opaque-reference
exclusions, and pairwise distinctness. It must be descriptor-safe, inspect
only own data properties, execute no accessor, traverse no inherited property,
mutate no input, coerce no value, and perform no external equality or
membership check.

The future outer checkpoint owns all exact equality and relationship checks
against the approval candidate, review-session candidate, reviewer identity,
role, and authority evidence candidates, and six directly supplied Human
Review component candidates. Separate future seams own issuer trust,
provenance, trusted time, lifecycle admissibility, freshness, currentness,
conflict, replacement, supersession, relevance, sufficiency, approval
admissibility, and approval effect.

LOCAL_STRUCTURAL_VALIDATOR_EXTERNAL_CANDIDATE_COUNT:
0

LOOKUP_DEREFERENCE_DISCOVERY_OR_PERSISTENCE:
PROHIBITED

TRUST_PRECOMPUTED_VALIDATOR_OR_CROSS_REFERENCE_RESULT:
PROHIBITED

## 17. Privacy, Closed Shape, And Shadow-Semantics Prohibition

The exact sixteen fields in Section 4 are the complete allowlist. The
candidate contains no person name, email address, telephone number, address,
account identifier, organization name, title, jurisdiction, license,
credential, provider payload, browser identifier, device identifier, IP
address, token, cookie, JWT, certificate, signature, key, nonce, secret, URL,
file path, raw content, source content, case content, transcript, message,
prompt, response, screenshot, image, PDF, metadata, free-text basis, rationale,
reason, explanation, recommendation, finding, score, severity, weight,
probability, remediation, or conclusion. Opaque references must not be
populated with raw or encoded private material, credentials, provider
payloads, URLs, paths, source excerpts, evidence content, attestation material,
or case content. No unknown key may carry shadow timestamps, lifecycle
history, participants, authority, authentication, relevance, sufficiency,
currentness, approval, handoff, delivery, or release semantics.

RAW_PRIVATE_SOURCE_OR_BASIS_MATERIAL_FIELD_COUNT:
0

OPTIONAL_OR_EXTENSION_FIELD_COUNT:
0

## 18. Structural Validity And Separate Future Admissibility

A structurally valid candidate proves only that one supplied object matches the
selected closed scalar shape. It does not prove external reference existence
or equality, candidate-set completeness, subject membership, subject truth,
subject authenticity, reviewer identity, reviewer authority, session
existence, issuer trust, provenance, lifecycle truth, trusted time, freshness,
currentness, relevance, support, sufficiency, probative value, approval
admissibility, candidate eligibility, or handoff authorization.

The future outer checkpoint must stop closed when any candidate or candidate
set is missing, extra, duplicated, reordered, structurally invalid,
mismatched, unavailable, unknown, unverifiable, stale, inactive, revoked,
superseded, disputed, conflicting, or otherwise inadmissible under the later
policy matrix. It must also stop closed when a subject kind/reference pair is
invalid, duplicated, absent from its named same-call component, present more
than once, or bound to a different packet.

This document does not define the outer-envelope machine field map, public
result identity, public error path map, clock/currentness matrix, relevance or
sufficiency policy, or checkpoint implementation.

No structural validator result shape, public error code taxonomy, JSON error
path map, schema keyword order, validator execution order, package export,
consumer, dispatch, checkpoint call, or runtime behavior is selected here.

## 19. Deferred Ownership And Separate Future Prerequisites

FUTURE_SCHEMA_PATH:
DEFERRED_TO_SEPARATE_OWNER_DECISION

FUTURE_VALIDATOR_RESULT_SCHEMA_PATH:
DEFERRED_TO_SEPARATE_OWNER_DECISION

FUTURE_PACKAGE_EXPORT_OWNERSHIP:
DEFERRED_TO_SEPARATE_OWNER_DECISION

FUTURE_VALIDATOR_CODE_OWNERSHIP:
DEFERRED_TO_SEPARATE_OWNER_DECISION

FUTURE_OUTER_ENVELOPE_FIELD_AND_ERROR_PATH_MAP:
DEFERRED_UNTIL_ALL_DEPENDENCY_CONTRACTS_ARE_TRACKED

TRUSTED_CLOCK_CURRENTNESS_REPLACEMENT_MATRIX:
SEPARATE_FUTURE_OWNER_DECISION_REQUIRED

RELEVANCE_SUFFICIENCY_OR_PROBATIVE_VALUE_POLICY:
NOT_CREATED_AND_NOT_AUTHORIZED

CURRENT_SAFE_SCHEMA_OR_RUNTIME_STEP:
NONE

No future path is reserved or authorized by this boundary. Schema scaffold,
validator-result semantics, package exports, structural validator,
cross-reference integration, clock/currentness policy, relevance or
sufficiency policy, consumer selection, and runtime checkpoint remain
separate slices with their own review gates.

## 20. Exact Two-File Docs-Only Slice

This slice adds exactly:

1. `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_v1.md`
2. `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-contract-boundary-doc-freeze.test.js`

CURRENT_SLICE_FILE_COUNT:
2

CURRENT_SLICE_DOC_FILE_COUNT:
1

CURRENT_SLICE_FOCUSED_PROOF_FILE_COUNT:
1

CURRENT_SLICE_SCHEMA_FILE_COUNT:
0

CURRENT_SLICE_PACKAGE_EXPORT_COUNT:
0

CURRENT_SLICE_RUNTIME_FILE_COUNT:
0

## 21. Non-Interference Rules

- modify no approval, Controlled Handoff Brief, Human Review subject-family, review-session, decision-attestation, reviewer identity, reviewer role, reviewer authority, or other tracked contract, schema, validator, result schema, package export, checkpoint, or runtime file
- create no generic rationale, recommendation, finding, score, legal-reasoning, evidentiary-weight, relevance, sufficiency, probative-value, trusted-clock, currentness, lifecycle-history, replacement, or supersession contract
- add no packet, brief, fingerprint, embedded decision-support, prior-approval, correction-request, decision-attestation, reviewer-evidence, timestamp, TTL, expiry, currentness, replacement, rationale, reason, explanation, recommendation, finding, score, weight, or conclusion field to the decision-basis candidate
- perform no lookup, dereference, discovery, persistence, registry selection, current-record selection, mutation, deletion, replacement, or supersession
- trust no precomputed validator or cross-reference result
- inspect or process no raw, private, source, case, identity, session, attestation, credential, provider, model, or real-evidence material
- create no subject truth, relevance, support, sufficiency, probative value, reviewer identity, reviewer qualification, reviewer authority, issuer trust, trusted time, freshness, currentness, approval effect, handoff eligibility, release readiness, product candidacy, or external-use authorization
- create no legal conclusion, evidentiary conclusion, professional opinion, finding, severity, score, recommendation, remediation, blocker resolution, security finding, compliance certification, or technical sign-off

## 22. Proof Boundary

The focused proof for this docs-only slice may establish only that:

1. the eighteen Owner-selected Stage A markers and exact stage table are tracked
2. the exact contract identity, version, sixteen-field root, field order, scalar types, reference patterns, enums, constants, and seven-field pairwise-distinct set are frozen
3. exact one-candidate-per-reference cardinality, approval-order preservation, immutability, no-reuse, and unique subject-pair postures are frozen
4. approval, decision, reviewer, review-session, six subject-family, origin, lifecycle, time, verification, privacy, and outer-checkpoint ownership boundaries are explicit
5. free text, inline material, raw content, schema, validator result, export, validator, checkpoint, clock/currentness matrix, relevance or sufficiency policy, persistence, API, UI, runtime, product, and external-use surfaces remain absent and unauthorized

It cannot prove contract implementation, schema correctness, validator
correctness, external equality, candidate-set completeness, subject existence,
subject membership, subject truth, subject authenticity, relevance, support,
sufficiency, probative value, reviewer identity, reviewer authority,
review-session validity, issuer trust, trusted time, lifecycle truth,
currentness, approval admissibility, candidate eligibility, runtime behavior,
professional review completion, release readiness, product candidacy, or
external-use readiness.

SCHEMA_CREATED_BY_THIS_SLICE:
NO

VALIDATOR_RESULT_SCHEMA_CREATED_BY_THIS_SLICE:
NO

PACKAGE_EXPORT_CREATED_BY_THIS_SLICE:
NO

VALIDATOR_OR_RUNTIME_CREATED_BY_THIS_SLICE:
NO

DECISION_BASIS_SUBJECT_VERIFIED_BY_THIS_SLICE:
NO

RELEVANCE_SUPPORT_SUFFICIENCY_OR_PROBATIVE_VALUE_CREATED_BY_THIS_SLICE:
NO

APPROVAL_ADMISSIBILITY_OR_ELIGIBILITY_CREATED_BY_THIS_SLICE:
NO

PROOF_CLASSIFICATION:
SYNTHETIC_DOC_BOUNDARY_ONLY

DOCS_ONLY_DECISION_BASIS_EVIDENCE_SEMANTICS_FROZEN_IMPLEMENTATION_REMAINS_FAIL_CLOSED

## 23. Final No-Conclusion Boundary

This boundary is not human review, professional review, legal review,
evidentiary review, identity verification, authentication, reviewer-authorship
verification, reviewer-role verification, reviewer-authority verification,
session verification, subject verification, source verification, issuer-trust
verification, provenance verification, trusted-time verification, currentness
verification, lifecycle verification, relevance assessment, support
assessment, sufficiency assessment, probative-value assessment, approval,
approval effect, handoff authorization, release authorization, product
approval, external-use authorization, security review, technical sign-off,
compliance certification, source-truth determination, chain-of-custody proof,
or case-truth determination.

FINAL_SAFE_ACTION:
PAUSE_UNTIL_SEPARATELY_AUTHORIZED_DECISION_BASIS_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_DECISION

HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_STATUS:
TRACKED_DOCS_ONLY_OWNER_SELECTED_SEMANTICS
