# Controlled Synthetic Red-Team Result Envelope Validation Error Taxonomy and Ordering Boundary v1

CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY
DOCS_ONLY
APPEND_ONLY_PREREQUISITE_RESOLUTION
RTRE_P08_RESOLVED_DOCS_ONLY
RTRE_P01_TO_P07_PRESERVED_RESOLVED_DOCS_ONLY
RTRE_P01_TO_P08_DOCUMENTED_BY_APPEND_ONLY_BOUNDARIES
DETERMINISTIC_BOUNDED_NO_ECHO_ERROR_TAXONOMY_ONLY
RESULT_ENVELOPE_CONTRACT_NOT_CREATED
SCHEMA_NOT_CREATED
VALIDATOR_NOT_CREATED
VALIDATION_EXECUTION_NOT_CREATED
MODEL_PROVIDER_EXECUTION_NOT_CREATED
EXECUTED_MODEL_RUN_EVIDENCE_NOT_CREATED
NO_RUNTIME_BEHAVIOR_CREATED
NO_SEMANTIC_CONTENT_CLASSIFIER_CREATED
NO_REJECTED_KEY_OR_VALUE_ECHO_CREATED
NO_FINDING_SCORE_OR_CONCLUSION_CREATED
NO_APPROVAL_OR_READINESS_CREATED
NO_BLOCKER_CLOSURE_CREATED
NO_DEPENDENCY_CLOSURE_CREATED
PRODUCT_CANDIDATE_NONE
EXTERNAL_USE_NOT_AUTHORIZED
HUMAN_PROFESSIONAL_REVIEW_REQUIRED

## 1. Purpose

This boundary resolves only `RTRE-P08`, the exact bounded validation-error
taxonomy, path set, aggregation rule, and deterministic ordering prerequisite
for a possible future machine-readable controlled synthetic red-team result
envelope.

It does not create that result-envelope contract, a schema, validator, parser,
semantic content classifier, validation execution, provider execution, package
export, persistence, API, or runtime behavior. Documenting the last listed RTRE
prerequisite does not make the envelope contract-ready or implementation-ready.

## 2. Canonical Sources and Structural Precedent

The controlling prerequisite and resolved boundary sources are:

- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_PREREQUISITE_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_IDENTITY_VERSION_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SINGLE_CASE_TOP_LEVEL_SHAPE_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CORPUS_REFERENCE_REPRESENTATION_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_COMPOSITE_OUTPUT_TYPE_REPRESENTATION_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_POSTURE_FIELDS_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PROHIBITED_FIELD_DENY_LIST_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md`

The nearest deterministic structural validator precedent is:

- `packages/governance/src/api-contract-schema-validator.js`
- `tests/api-contract-schema-validator.test.js`

That precedent supports root-type short-circuiting, required-field order,
descriptor-safe type checks, exact-literal checks, code/path deduplication,
deterministic error ordering, no rejected-value echo, and immutable result
construction. Its API-specific validator, identity, fields, paths, runtime
behavior, and the codes `PROHIBITED_FIELD`, `INVALID_OPAQUE_REFERENCE`,
`PROHIBITED_WILDCARD`, and `PROHIBITED_BROAD_SCOPE` are not imported.

## 3. Exact Bounded Error Taxonomy

Only these five symbolic codes are within the RTRE-P08 boundary:

| Position | Exact error code | Exact structural meaning |
| --- | --- | --- |
| 1 | `INVALID_TYPE` | The candidate is not one plain object, or a required string field is present without an own string data value |
| 2 | `MISSING_FIELD` | One exact RTRE-P02 required field is absent |
| 3 | `UNKNOWN_FIELD` | One or more additional top-level own properties are present |
| 4 | `INVALID_ENUM` | A required string field does not equal its exact governed literal, allowed corpus identifier, or canonical case-row value |
| 5 | `INVALID_BOOLEAN` | `humanProfessionalReviewRequired` is present but is not the boolean `true` data value |

VALIDATION_ERROR_CODE_COUNT:
5

VALIDATION_ERROR_CODES:
EXACT_FIVE_ONLY

OPTIONAL_VALIDATION_ERROR_CODES:
NONE

ADDITIONAL_VALIDATION_ERROR_CODES:
NONE

No error code states that prohibited material was substantively classified,
that a conclusion was reached, or that any finding, severity, remediation,
approval, readiness, truth, or compliance result exists.

## 4. Exact Closed Path Set

Only these eleven paths are allowed:

| Position | Exact allowed path | Exact use boundary |
| --- | --- | --- |
| 1 | `$` | root candidate type failure or aggregated unknown-field presence |
| 2 | `$.contractVersion` | exact canonical field only |
| 3 | `$.contractKind` | exact canonical field only |
| 4 | `$.caseId` | exact canonical field only |
| 5 | `$.outputType` | exact canonical field only |
| 6 | `$.actionClass` | exact canonical field only |
| 7 | `$.escalationTarget` | exact canonical field only |
| 8 | `$.safeNextAction` | exact canonical field only |
| 9 | `$.syntheticCorpusPosture` | exact canonical field only |
| 10 | `$.realEvidencePosture` | exact canonical field only |
| 11 | `$.humanProfessionalReviewRequired` | exact canonical field only |

VALIDATION_ERROR_PATH_COUNT:
11

VALIDATION_ERROR_PATHS:
EXACT_ELEVEN_ONLY

OPTIONAL_VALIDATION_ERROR_PATHS:
NONE

ADDITIONAL_VALIDATION_ERROR_PATHS:
NONE

An unknown property always produces `UNKNOWN_FIELD` at `$`. Its key, symbol,
spelling, casing, path, value, descriptor content, or insertion position must
not be copied into the result. No dynamic path segment is authorized.

## 5. Exact Code-to-Path Partition

The code/path combinations are closed as follows:

| Error code | Allowed path partition |
| --- | --- |
| `INVALID_TYPE` | `$` or one of the nine canonical string-field paths |
| `MISSING_FIELD` | one of the ten canonical field paths |
| `UNKNOWN_FIELD` | `$` only |
| `INVALID_ENUM` | one of the nine canonical string-field paths |
| `INVALID_BOOLEAN` | `$.humanProfessionalReviewRequired` only |

The nine canonical string fields are positions 1 through 9 in the exact
RTRE-P02 field order. The tenth field is the required boolean
`humanProfessionalReviewRequired`.

No code/path pair may carry a message, detail, hint, candidate, input, key,
value, actual value, expected value, payload, content, excerpt, score, finding,
conclusion, approval, or remediation.

## 6. Deterministic Validation and Error Ordering

The exact future ordering contract has these phases:

| Phase | Exact phase | Exact ordering rule |
| --- | --- | --- |
| 0 | `ROOT_TYPE_GATE` | If the candidate is not one plain object, return only `{ code: "INVALID_TYPE", path: "$" }` and stop |
| 1 | `MISSING_REQUIRED_FIELDS` | Emit `MISSING_FIELD` in the exact ten-field RTRE-P02 order |
| 2 | `UNKNOWN_TOP_LEVEL_FIELD_AGGREGATE` | If any additional own property exists, emit exactly one `UNKNOWN_FIELD` at `$` |
| 3 | `KNOWN_FIELD_TYPES` | Check present canonical fields in exact RTRE-P02 order and emit the field's exact type code/path |
| 4 | `KNOWN_FIELD_VALUES_AND_CASE_MAPPING` | Check structurally typed canonical fields in exact RTRE-P02 order and emit exact value or case-row failures |

VALIDATION_PHASE_COUNT:
5

VALIDATION_PHASE_ORDER:
EXACT_ZERO_THROUGH_FOUR

Within phases 1, 3, and 4, the exact field order is:

1. `contractVersion`
2. `contractKind`
3. `caseId`
4. `outputType`
5. `actionClass`
6. `escalationTarget`
7. `safeNextAction`
8. `syntheticCorpusPosture`
9. `realEvidencePosture`
10. `humanProfessionalReviewRequired`

The value phase applies these exact gates:

- `contractVersion` and `contractKind` use the exact RTRE-P01 literals
- `caseId` must equal one of the exact 26 RTRE-P03 canonical identifiers
- `outputType`, `actionClass`, `escalationTarget`, and `safeNextAction` must be
  members of their exact canonical four-field taxonomy columns
- when `caseId` is valid, those four taxonomy fields must also equal the exact
  values in that case's canonical row
- `syntheticCorpusPosture` and `realEvidencePosture` use the exact RTRE-P05
  literals
- `humanProfessionalReviewRequired` must be the boolean `true`
- a value check runs only when that field has the required data type
- case-row comparison runs only when `caseId` is an exact canonical identifier

Global taxonomy-column membership and case-row mismatch use the same
`INVALID_ENUM` code and canonical field path. Deduplication therefore prevents
two identical code/path items for one field.

## 7. Deduplication, Determinism, and No-Echo

- an exact `{ code, path }` pair appears at most once
- deduplication preserves the first occurrence under the phase and field order
- input property insertion order cannot change the returned error order
- multiple unknown properties collapse to one `UNKNOWN_FIELD` at `$`
- no unknown or rejected property name is used for sorting or returned as a path
- no rejected key or value is retained, copied, normalized, summarized, hashed,
  logged, or returned
- no candidate field is copied into the result
- the candidate is not mutated
- a future separately authorized implementation must not invoke accessors while
  inspecting required field descriptors
- identical structural input produces an identical result
- the exact RTRE-P07 four-field result and two-field error-item shapes remain
  unchanged

This is a future deterministic contract boundary only. It does not execute
validation or prove that any candidate is valid or invalid.

## 8. RTRE-P06 Deny-List Alignment Without Semantic Classification

The fourteen RTRE-P06 labels are documentation-only semantic families, not JSON
keys or validator codes. RTRE-P08 therefore does not create a
`PROHIBITED_FIELD` code or a model-based, heuristic, legal, evidentiary, or other
semantic content classifier.

The exact structural boundary remains fail closed:

- every additional top-level property produces `UNKNOWN_FIELD` at `$`
- an object, array, accessor, or other non-string value in a canonical string
  field produces `INVALID_TYPE` at that canonical field path
- any non-canonical string under a governed string field produces
  `INVALID_ENUM` at that canonical field path
- any non-`true` boolean-field representation produces `INVALID_BOOLEAN` at
  `$.humanProfessionalReviewRequired`
- rejected keys and values are never echoed

This alignment blocks non-canonical material structurally without claiming to
identify, inspect, understand, label, score, or conclude what rejected content
means. A separate Owner decision and concrete contract would be required before
any implementation could be considered.

## 9. Prerequisite Status and Non-Closure

RTRE_P08_STATUS:
RESOLVED_DOCS_ONLY_NOT_CONTRACT_READY

RTRE_PREREQUISITE_DOCUMENTATION_STATUS:
P01_THROUGH_P08_HAVE_APPEND_ONLY_BOUNDARIES

RESULT_ENVELOPE_CONTRACT_READINESS:
NOT_CREATED_SEPARATE_OWNER_DECISION_REQUIRED

SCHEMA_READINESS:
NOT_CREATED

VALIDATOR_READINESS:
NOT_CREATED

Resolving this documentation prerequisite does not retroactively rewrite the
historical `OPEN_NOT_SPECIFIED` rows in earlier append-only boundaries. It does
not close a blocker or dependency, create a new candidate, select a contract
implementation, or authorize schema, validator, provider, runtime, product,
release, client-facing, or external-use work.

## 10. Non-Interference Rules

- preserve RTRE-P01 through RTRE-P07 unchanged
- preserve the exact RTRE-P02 ten-field candidate-envelope shape
- preserve the exact RTRE-P03 corpus identifiers and RTRE-P04 four-field matrix
- preserve the exact RTRE-P05 posture fields
- preserve the RTRE-P06 semantic deny-list without inventing machine keys or a
  semantic classifier
- preserve the exact RTRE-P07 validator-result and error-item shapes
- do not create schema, validator, package export, registry, lookup,
  persistence, API, provider execution, scoring, approval, readiness, or closure
- preserve human/professional review as the release gate

## 11. Proof Boundary

The focused proof test for this document may prove only:

- this RTRE-P08 documentation boundary exists
- the exact five-code taxonomy and eleven-path closed set are frozen
- the exact five-phase precedence and RTRE-P02 field order are frozen
- unknown properties are aggregated at `$` without key or value echo
- RTRE-P06 remains structural and no semantic classifier is created
- P01 through P08 have append-only documentation boundaries
- schema, validator, runtime behavior, and executed-run evidence remain uncreated

It does not prove contract readiness, schema readiness, validator readiness,
model behavior, executed runs, runtime enforcement, legal correctness,
evidentiary sufficiency, professional approval, technical sign-off, release
readiness, product readiness, external-use authorization, blocker closure,
dependency closure, or compliance.

## 12. Final No-Conclusion Boundary

This validation error-taxonomy boundary is not actual human review,
professional review, legal review, technical review, legal advice, professional
approval, technical sign-off, release approval, product/external-use
authorization, compliance certification, evidentiary conclusion, ownership
determination, source-truth conclusion, identity-truth conclusion,
authorship-truth conclusion, chain-of-custody proof, runtime verification,
security approval, deployment readiness, implementation-readiness, governance
approval, case-truth conclusion, or real-evidence review.

CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_STATUS:
TRACKED_DOCS_ONLY_RTRE_P08_RESOLUTION

REPO_NEXT_ACTION:
none without a separate Owner decision
