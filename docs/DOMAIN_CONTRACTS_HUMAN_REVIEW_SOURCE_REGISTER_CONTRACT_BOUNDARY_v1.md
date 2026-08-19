# Human Review Source Register Contract Boundary v1

HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY
DOCS_ONLY
APPEND_ONLY_CONTRACT_DEFINITION
CONTRACT_VERSION_1_0_0
PACKET_SCOPED_SINGLE_OBJECT_ONLY
EXACT_FOUR_REQUIRED_TOP_LEVEL_FIELDS
ORDERED_ZERO_OR_MORE_SOURCE_ENTRIES
NO_CONTRACT_MAXIMUM
OPAQUE_PACKET_AND_SOURCE_REFERENCES_ONLY
EXACT_SEVEN_DECLARED_SOURCE_TYPES
REVIEW_STATE_EXCLUDED
DETERMINISTIC_NO_ECHO_VALIDATOR_RESULT_CONTRACT_DEFINED
SCHEMA_NOT_CREATED
VALIDATOR_RESULT_SCHEMA_NOT_CREATED
VALIDATOR_NOT_CREATED
PARSER_NOT_CREATED
SERIALIZER_NOT_CREATED
PACKAGE_EXPORT_NOT_CREATED
PERSISTENCE_NOT_CREATED
API_NOT_CREATED
UI_NOT_CREATED
SOURCE_ACQUISITION_NOT_CREATED
FORENSIC_EXTRACTION_NOT_CREATED
NO_RUNTIME_BEHAVIOR_CREATED
REAL_PRIVATE_SOURCE_MATERIAL_USE_NOT_AUTHORIZED
NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED
NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED
PRODUCT_CANDIDATE_NONE
EXTERNAL_USE_NOT_AUTHORIZED
HUMAN_PROFESSIONAL_REVIEW_REQUIRED

## 1. Purpose

This docs-only boundary defines the first exact documentation contract for one
Human Review Workspace `SOURCE_REGISTER`. It resolves the twelve decisions
frozen by the source-register readiness boundary while preserving the
authorized supplied-packet, opaque-reference, no-overclaim, and human-review
boundaries.

This boundary creates no JSON Schema, validator-result schema, validator,
parser, serializer, package export, persistence, API, route, user interface,
source acquisition, forensic extraction, provider or model execution, product
candidate, or external-use authorization. It processes no raw, private,
source, case, identity, authorship, or real-evidence material.

## 2. Canonical Sources and Precedent

The controlling readiness source is:

- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_READINESS_BOUNDARY_v1.md`

The controlling product and review-state sources are:

- `README.md`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_STATE_MODEL_CONTRACT_v1.md`
- `schemas/human-review-state-model.json`

The nearest deterministic no-echo validator precedents are:

- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_v1.md`
- `packages/governance/src/api-contract-schema-validator.js`
- `tests/api-contract-schema-validator.test.js`

Those precedents supply only the four-field result, two-field error item,
root short-circuit, deterministic ordering, no-echo, and immutability patterns.
Their domain identity, candidate fields, codes, paths, implementation, package
export, and runtime behavior are not imported.

Chat-only output, handoff text, local memory, untracked files, raw material,
private material, source material, and real evidence are not canonical sources
for this contract.

## 3. Contract Identity, Version, and Cardinality

The source register is exactly one plain JSON-like object for exactly one
declared and bounded supplied packet.

SOURCE_REGISTER_CONTRACT_ID:
human_review.source_register

SOURCE_REGISTER_CONTRACT_VERSION:
1.0.0

SOURCE_REGISTER_CARDINALITY:
ONE_OBJECT_PER_DECLARED_SUPPLIED_PACKET

TOP_LEVEL_OBJECT_COUNT:
1

BATCH_ARRAY:
PROHIBITED_BY_THIS_CONTRACT

CASE_SCOPED_WRAPPER:
PROHIBITED_BY_THIS_CONTRACT

The identity and version literals are exact and case-sensitive. Unknown
identity or version values fail closed. No fallback, alias, case folding,
trimming, coercion, migration, compatibility, or version inference is
authorized.

Packet scope records only the declared review boundary. It does not establish
packet completeness, case completeness, source truth, identity truth,
authenticity, ownership, or chain of custody.

## 4. Exact Top-Level Shape

Every top-level field is required and has this canonical order:

| Position | Field | Type | Exact contract rule |
| --- | --- | --- | --- |
| 1 | `contract_id` | string | exact literal `human_review.source_register` |
| 2 | `contract_version` | string | exact literal `1.0.0` |
| 3 | `packet_ref` | string | exact opaque-reference contract from Section 6 |
| 4 | `sources` | array | ordered source entries from Section 5 |

TOP_LEVEL_FIELD_COUNT:
4

REQUIRED_TOP_LEVEL_FIELDS:
ALL_FOUR

OPTIONAL_TOP_LEVEL_FIELDS:
NONE

ADDITIONAL_TOP_LEVEL_FIELDS:
NONE

The listed order is the canonical representation and validation traversal
order. Input property insertion order is not a separate validity condition and
must not alter error ordering. Missing, inherited, accessor-backed, aliased,
differently cased, or unknown fields are not accepted as canonical own data
properties. A future validator must not invoke accessors.

## 5. Exact Source-Entry Shape and Cardinality

`sources` is one ordered array with zero or more entries.

SOURCE_ENTRY_MINIMUM_COUNT:
0

SOURCE_ENTRY_MAXIMUM_COUNT:
NO_CONTRACT_MAXIMUM

EMPTY_SOURCE_REGISTER:
ALLOWED_WITHIN_DECLARED_PACKET_BOUNDARY

No operational resource limit is created by this documentation contract. Any
future ingestion, storage, execution, or deployment limit remains a separate
runtime and product decision.

Every source entry is one plain JSON-like object with exactly these required
fields in this canonical order:

| Position | Field | Type | Exact contract rule |
| --- | --- | --- | --- |
| 1 | `source_ref` | string | exact opaque-reference contract from Section 6 |
| 2 | `declared_source_type` | string | one exact value from Section 7 |
| 3 | `declared_label` | string | trimmed, non-empty, 1 through 200 Unicode code points |

SOURCE_ENTRY_FIELD_COUNT:
3

REQUIRED_SOURCE_ENTRY_FIELDS:
ALL_THREE

OPTIONAL_SOURCE_ENTRY_FIELDS:
NONE

ADDITIONAL_SOURCE_ENTRY_FIELDS:
NONE

Source-entry array order is preserved exactly as declared. It is not a
chronology, relevance order, evidence order, credibility order, priority,
ranking, or finding. No entry is sorted, merged, inferred, expanded, resolved,
or deduplicated automatically.

`declared_label` is a human-facing declared descriptor only. It is not a
filename, locator, identity, authorship statement, authenticity statement, or
source-truth conclusion. It must not be repurposed to carry raw source content,
private content, credentials, external locators, findings, scores, or
conclusions. This semantic boundary creates no content classifier.

## 6. Exact Opaque-Reference Contracts

The packet reference must match this exact ASCII regular expression:

`^pkt_[a-z0-9][a-z0-9_-]{0,59}$`

The source reference must match this exact ASCII regular expression:

`^src_[a-z0-9][a-z0-9_-]{0,59}$`

Each reference is therefore 5 through 64 ASCII characters, case-sensitive,
and limited to its exact prefix plus lowercase letters, decimal digits,
underscore, and hyphen.

OPAQUE_REFERENCE_TRIMMING:
PROHIBITED

OPAQUE_REFERENCE_CASE_FOLDING:
PROHIBITED

OPAQUE_REFERENCE_ALIASING:
PROHIBITED

OPAQUE_REFERENCE_RESOLUTION:
PROHIBITED

Every `source_ref` must be unique within its register. The prefixes distinguish
the two reference surfaces only; no other embedded segment has governed
meaning. A syntactically valid reference is not a path, URL, filename, account
locator, device locator, token, identity, ownership marker, content digest, or
proof of source existence.

## 7. Exact Declared Source-Type Vocabulary

Only these seven case-sensitive values are allowed:

| Position | Exact `declared_source_type` value |
| --- | --- |
| 1 | `message_thread` |
| 2 | `email` |
| 3 | `document` |
| 4 | `image` |
| 5 | `audio` |
| 6 | `video` |
| 7 | `other_declared` |

DECLARED_SOURCE_TYPE_COUNT:
7

OPTIONAL_DECLARED_SOURCE_TYPES:
NONE

ADDITIONAL_DECLARED_SOURCE_TYPES:
NONE

The vocabulary classifies only the submitter-declared media category for
review organization. It does not verify format, content, origin, authorship,
authenticity, relevance, admissibility, ownership, or evidentiary value.

## 8. Packet Relationship and Review-State Separation

One `packet_ref` binds the register to one declared supplied packet. Source
entries inherit that packet boundary structurally and therefore contain no
repeated packet field. The reference does not load, fetch, acquire, replay,
resolve, hash, inspect, or prove the packet or any source.

No case identifier belongs to this contract. Packet scope must not be promoted
to case scope or interpreted as a complete record of a matter.

The review-state values `ASSERTED`, `APPEARS_IN_SUPPLIED_MATERIAL`,
`NOT_ESTABLISHED`, and `HUMAN_REVIEW_REQUIRED` remain governed only by the
separate human-review state contract and schema. No review-state field appears
at register or source-entry level, and no review-state transition is inferred.

REVIEW_STATE_AT_REGISTER_LEVEL:
PROHIBITED

REVIEW_STATE_AT_SOURCE_ENTRY_LEVEL:
PROHIBITED

INFERRED_REVIEW_STATE_TRANSITION:
PROHIBITED

## 9. Duplicates, Collisions, and Ordering

- the first structurally valid occurrence of a `source_ref` establishes that
  reference within the register
- every later structurally valid occurrence of the same exact `source_ref`
  produces `duplicate_source_ref` at that later entry's canonical source-ref
  path
- invalid source-reference values do not participate in duplicate comparison
- repeated labels or source types with distinct source references are allowed
  and remain distinct entries
- no repeated entry is merged, renamed, replaced, collapsed, or discarded
- source-entry position is deterministic representation order only
- input object-property insertion order does not alter validation traversal or
  error ordering
- an exact `{ code, path }` pair may occur at most once

These rules establish structural uniqueness only. They do not establish that
two references identify different real-world sources or that two entries with
different references are substantively distinct.

## 10. Prohibited Semantic Field Families

These fourteen labels are documentation-only semantic deny families. They are
not JSON keys, validator codes, findings, or a semantic classifier.

| Position | Prohibited semantic field family |
| --- | --- |
| 1 | `RAW_SOURCE_CONTENT` |
| 2 | `PRIVATE_OR_SECRET_CONTENT` |
| 3 | `FILENAME_PATH_URL_TOKEN_OR_EXTERNAL_LOCATOR` |
| 4 | `HASH_DIGEST_SIGNATURE_OR_INTEGRITY_PROOF` |
| 5 | `ACQUISITION_FORENSIC_OR_DEVICE_METADATA` |
| 6 | `IDENTITY_OR_AUTHORSHIP_CLAIM` |
| 7 | `AUTHENTICITY_OR_SOURCE_TRUTH_CLAIM` |
| 8 | `CHAIN_OF_CUSTODY_CLAIM` |
| 9 | `OWNERSHIP_OR_CONTROL_CLAIM` |
| 10 | `FINDING_OR_LEGAL_EVIDENTIARY_CONCLUSION` |
| 11 | `SCORE_CONFIDENCE_STRENGTH_OR_RANKING` |
| 12 | `REVIEW_STATE_OR_INFERRED_TRANSITION` |
| 13 | `APPROVAL_CERTIFICATION_OR_SIGN_OFF` |
| 14 | `RUNTIME_PERSISTENCE_OR_EXTERNAL_USE_READINESS` |

PROHIBITED_SEMANTIC_FIELD_FAMILY_COUNT:
14

Every additional top-level or source-entry field remains structurally
prohibited by the exact allowlists. A permitted field must not be aliased,
nested, encoded, or repurposed to carry a denied semantic family. A future
structural validator does not inspect or classify free-text meaning and must
not claim that prohibited content was substantively detected.

## 11. Separate Validator-Result Contract

The validator result is a separate object surface with exactly these required
fields in this order:

| Position | Field | Type | Exact contract rule |
| --- | --- | --- | --- |
| 1 | `valid` | boolean | `true` if and only if `errors` is empty |
| 2 | `contractKind` | string | exact literal `HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_BOUNDARY` |
| 3 | `version` | string | exact literal `1.0.0` |
| 4 | `errors` | array | ordered exact error items from Sections 12 through 14 |

VALIDATOR_RESULT_FIELD_COUNT:
4

REQUIRED_VALIDATOR_RESULT_FIELDS:
ALL_FOUR

OPTIONAL_VALIDATOR_RESULT_FIELDS:
NONE

ADDITIONAL_VALIDATOR_RESULT_FIELDS:
NONE

`valid` is `false` if and only if `errors` is non-empty. Every error item has
exactly two required fields in this order:

| Position | Field | Type |
| --- | --- | --- |
| 1 | `code` | string |
| 2 | `path` | string |

VALIDATION_ERROR_ITEM_FIELD_COUNT:
2

No result field or error item may contain or echo the candidate, a candidate
property value, a rejected key, a rejected value, a label, a reference value,
or source-entry content.

## 12. Exact Validation Error Codes

Only these five case-sensitive codes are allowed:

| Position | Exact error code | Structural use |
| --- | --- | --- |
| 1 | `required_field_missing` | one required canonical own data property is absent |
| 2 | `unexpected_field` | one or more additional own properties exist in one containing object |
| 3 | `invalid_field_type` | root, field, array entry, or entry field has the wrong structural type |
| 4 | `invalid_field_value` | exact literal, reference, enum, trimming, or label-length rule fails |
| 5 | `duplicate_source_ref` | one later valid source reference duplicates an earlier valid reference |

VALIDATION_ERROR_CODE_COUNT:
5

OPTIONAL_VALIDATION_ERROR_CODES:
NONE

ADDITIONAL_VALIDATION_ERROR_CODES:
NONE

No code represents a finding, severity, remediation, source assessment,
authenticity determination, evidence assessment, legal conclusion, approval,
certification, or readiness decision.

## 13. Exact Validation Path Grammar

The static root paths are:

1. `$`
2. `$.contract_id`
3. `$.contract_version`
4. `$.packet_ref`
5. `$.sources`

Source-entry paths use only these exact templates:

1. `$.sources[n]`
2. `$.sources[n].source_ref`
3. `$.sources[n].declared_source_type`
4. `$.sources[n].declared_label`

`n` is the entry's zero-based decimal array index, written as `0` or a
non-zero digit followed by zero or more decimal digits. No leading zero is
allowed for a multi-digit index.

An unknown top-level field produces one `unexpected_field` at `$`. Unknown
source-entry fields produce one `unexpected_field` at that entry's
`$.sources[n]` path. Rejected field names never become path segments.

The exact code-to-path partition is:

| Code | Allowed path partition |
| --- | --- |
| `required_field_missing` | one canonical root-field path or source-entry field path |
| `unexpected_field` | `$` or one `$.sources[n]` path |
| `invalid_field_type` | `$`, one canonical root-field path, one `$.sources[n]` path, or one source-entry field path |
| `invalid_field_value` | `$.contract_id`, `$.contract_version`, `$.packet_ref`, or one source-entry field path |
| `duplicate_source_ref` | one `$.sources[n].source_ref` path only |

No path may contain a rejected key, rejected value, reference value, label,
filename, URL, token, identity, or external locator.

## 14. Deterministic Validation Phases and Ordering

Validation uses these exact phases:

| Phase | Exact phase | Exact ordering rule |
| --- | --- | --- |
| 0 | `ROOT_TYPE_GATE` | non-plain-object input returns only `invalid_field_type` at `$` and stops |
| 1 | `MISSING_ROOT_FIELDS` | check the four root fields in canonical order |
| 2 | `UNKNOWN_ROOT_FIELD_AGGREGATE` | emit at most one `unexpected_field` at `$` |
| 3 | `ROOT_FIELD_TYPES` | check present canonical root fields in canonical order |
| 4 | `ROOT_FIELD_VALUES` | check typed root identity, version, and packet reference in canonical order |
| 5 | `SOURCE_ENTRY_STRUCTURE` | inspect array entries by ascending index, then missing, unknown, type, and value checks in canonical entry-field order |
| 6 | `DUPLICATE_SOURCE_REFERENCES` | inspect valid source references by ascending index and flag every later duplicate |

VALIDATION_PHASE_COUNT:
7

If `sources` is not an array, no source-entry or duplicate phase runs. If one
entry is not a plain object, that entry produces only `invalid_field_type` at
its entry path and entry-field checks are skipped for that entry. Other array
entries remain independently reviewable in ascending index order.

Within each plain source entry, checks use this exact field order:

1. `source_ref`
2. `declared_source_type`
3. `declared_label`

Deduplication preserves the first exact `{ code, path }` occurrence under the
phase and field order. Candidate property insertion order must not alter the
result. Identical structural input produces an identical result.

## 15. No-Echo, Immutability, and Structural Limits

- the candidate object and all nested arrays and entries remain unmodified
- no default, normalization, trimming, coercion, alias, migration, repair,
  sorting, merge, rename, redaction, hash, summary, or pass-through is created
- rejected keys and values are never returned, logged, retained, normalized,
  summarized, hashed, or used for sorting
- accessors are not invoked; canonical fields must be own data properties
- error paths expose only canonical structural positions
- validator success or failure concerns contract shape only
- structural validity does not prove source existence, content, completeness,
  origin, identity, authorship, authenticity, ownership, admissibility,
  relevance, evidentiary weight, legal merit, chain of custody, or case truth

This is a documentation contract only. No validation is executed by this
boundary.

## 16. Ownership and Later Slice Partition

This slice owns exactly these two files:

1. `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md`
2. `tests/domain-human-review-source-register-contract-boundary-doc-freeze.test.js`

Any later machine-readable work remains separately authorized and partitioned:

| Future surface | Reserved candidate path | Status |
| --- | --- | --- |
| candidate schema | `schemas/human-review-source-register.json` | separate future `CONTRACT_ONLY` slice |
| candidate schema proof | `tests/human-review-source-register-schema.test.js` | separate future `CONTRACT_ONLY` slice |
| validator-result schema | `schemas/human-review-source-register-validator-result.json` | separate later sibling slice |
| validator-result schema proof | `tests/human-review-source-register-validator-result-schema.test.js` | separate later sibling slice |
| validator helper | `packages/schemas/src/human-review-source-register-validator.js` | separate later sibling slice |
| validator helper proof | `tests/human-review-source-register-validator.test.js` | separate later sibling slice |
| package export | `packages/schemas/src/index.js` | separate later sibling slice |

No future path is created or implementation-authorized by reservation. Schema,
validator-result schema, validator helper, package export, persistence, API,
route, UI, export, source acquisition, forensic extraction, provider/model
execution, logging, telemetry, security, deployment, and external-use surfaces
remain distinct.

## 17. Non-Interference Rules

- preserve the Human Review Workspace product description unchanged
- preserve the four-state human-review contract and schema unchanged
- preserve the readiness boundary as historical prove-only state
- preserve packet scope as narrower than case scope
- preserve opaque references as non-resolving structural tokens
- create no schema, validator-result schema, validator, parser, serializer,
  package export, persistence, API, route, UI, export, acquisition, forensic,
  provider, model, logging, telemetry, or runtime behavior
- inspect or process no raw, private, source, case, identity, authorship, or
  real-evidence material
- create no authenticity, completeness, authorship, source-truth,
  identity-truth, chain-of-custody, evidence-strength, legal-merit, ownership,
  approval, certification, readiness, or case-truth claim
- preserve human/professional review as the release gate

## 18. Proof Boundary

The focused proof for this docs-only contract may prove only:

- all controlling tracked sources and precedents exist and are referenced
- identity, version, packet scope, cardinality, exact field names, types, and
  canonical order are documented
- opaque-reference patterns, source types, label limits, review-state
  separation, and duplicate handling are documented
- the fourteen semantic deny families remain structural/governance boundaries
  rather than classifier findings
- the separate four-field validator result, two-field errors, five codes, path
  grammar, seven phases, ordering, no-echo, and immutability rules are documented
- later schema, validator, package, and runtime surfaces remain separate
- this slice changes only this document and its focused proof test

It does not prove schema correctness, validator correctness, source validity,
source authenticity, evidentiary sufficiency, model behavior, executed runs,
runtime enforcement, security, legal correctness, professional approval,
technical sign-off, release readiness, product readiness, external-use
authorization, or compliance.

## 19. Final No-Conclusion Boundary

This contract boundary is not actual human review, professional review, legal
review, technical review, legal advice, professional approval, technical
sign-off, release approval, product/external-use authorization, compliance
certification, evidentiary conclusion, ownership determination, source-truth
conclusion, identity-truth conclusion, authorship-truth conclusion,
chain-of-custody proof, runtime verification, security approval, deployment
readiness, implementation-readiness, governance approval, case-truth
conclusion, or real-evidence review.

HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_STATUS:
TRACKED_DOCS_ONLY_SOURCE_REGISTER_CONTRACT_DEFINED

SCHEMA_STATUS:
NOT_CREATED

VALIDATOR_RESULT_SCHEMA_STATUS:
NOT_CREATED

VALIDATOR_STATUS:
NOT_CREATED

RUNTIME_STATUS:
NOT_CREATED

REPO_NEXT_ACTION:
none from this boundary; any schema-readiness assessment remains separate
