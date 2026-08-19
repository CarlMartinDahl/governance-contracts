# Controlled Synthetic Red-Team Result Envelope Prohibited-Field Deny-List Boundary v1

CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PROHIBITED_FIELD_DENY_LIST_BOUNDARY
DOCS_ONLY
APPEND_ONLY_PREREQUISITE_RESOLUTION
RTRE_P06_RESOLVED_DOCS_ONLY
RTRE_P01_TO_P05_PRESERVED_RESOLVED_DOCS_ONLY
RTRE_P07_AND_P08_OPEN_NOT_SPECIFIED
SEMANTIC_DENY_LIST_ONLY
RESULT_ENVELOPE_CONTRACT_NOT_CREATED
SCHEMA_NOT_CREATED
VALIDATOR_NOT_CREATED
MODEL_PROVIDER_EXECUTION_NOT_CREATED
EXECUTED_MODEL_RUN_EVIDENCE_NOT_CREATED
NO_RUNTIME_BEHAVIOR_CREATED
NO_RAW_OR_PRIVATE_MATERIAL_CREATED
NO_SOURCE_OR_IDENTITY_TRUTH_CREATED
NO_FINDING_SCORE_OR_CONCLUSION_CREATED
NO_APPROVAL_OR_READINESS_CREATED
NO_BLOCKER_CLOSURE_CREATED
NO_DEPENDENCY_CLOSURE_CREATED
PRODUCT_CANDIDATE_NONE
EXTERNAL_USE_NOT_AUTHORIZED
HUMAN_PROFESSIONAL_REVIEW_REQUIRED

## 1. Purpose

This boundary resolves only `RTRE-P06`, the prohibited result-envelope field
prerequisite for a possible future machine-readable controlled synthetic
red-team result envelope.

It freezes an explicit semantic deny-list for field families that must not be
added to, nested in, aliased into, or encoded through the envelope. It does not
add a field, change the ten-field shape, create a schema or validator, select a
validator result or error taxonomy, execute a provider, or establish contract
readiness.

## 2. Canonical Sources and Precedent

The controlling prerequisite source is:

- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_PREREQUISITE_BOUNDARY_v1.md`

The controlling field-shape and semantic sources are:

- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SINGLE_CASE_TOP_LEVEL_SHAPE_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_POSTURE_FIELDS_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CORPUS_REFERENCE_REPRESENTATION_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md`

The nearest deterministic prohibited-field precedent is:

- `packages/governance/src/api-contract-schema-validator.js`
- `tests/api-contract-schema-validator.test.js`

That precedent proves only that an exact allowlist and a separately declared
prohibited-field surface can coexist and fail closed. Its API-specific field
keys, validator behavior, error codes, paths, and ordering are not imported by
this boundary.

## 3. RTRE-P06 Semantic Deny-List

The exact prohibited semantic field families are:

| Position | Prohibited semantic field family | Prohibited envelope meaning |
| --- | --- | --- |
| 1 | `RAW_MATERIAL` | Raw messages, documents, files, images, audio, video, bytes, excerpts, or replayable content |
| 2 | `PRIVATE_MATERIAL` | Private, personal, confidential, secret, credential, token, or access-bearing material |
| 3 | `SOURCE_CONTENT_OR_LOCATOR` | Source content, filenames, paths, URLs, account locators, device locators, or external source references |
| 4 | `PROMPT_CONTENT` | Provider prompts, system prompts, user prompts, templates, or prompt payloads |
| 5 | `RESPONSE_CONTENT` | Provider responses, generated answers, free-form model output, or response payloads |
| 6 | `REASONING_TRACE` | Hidden reasoning, chain-of-thought, internal deliberation, scratch work, or reasoning traces |
| 7 | `PROVIDER_IDENTITY` | Provider identity, provider account, endpoint identity, routing identity, or provider configuration |
| 8 | `MODEL_IDENTITY` | Model identity, model version, deployment identity, or model-selection metadata |
| 9 | `RUN_IDENTITY_OR_EXECUTION_METADATA` | Run identity, request identity, timestamps, latency, usage, token counts, execution state, or execution metadata |
| 10 | `FINDING` | Finding, defect, violation, issue determination, severity, remediation, or blocker resolution |
| 11 | `SCORE_OR_RANKING` | Score, probability, confidence, credibility, reliability, strength, likelihood, risk, merit, sufficiency, or ranking |
| 12 | `CONCLUSION_OR_TRUTH_CLAIM` | Legal, evidentiary, ownership, source, identity, authorship, chain-of-custody, compliance, or case-truth conclusion |
| 13 | `APPROVAL_CERTIFICATION_OR_SIGN_OFF` | Human approval completion, professional approval, technical sign-off, release approval, certification, or authorization |
| 14 | `RUNTIME_READINESS_OR_ENFORCEMENT_CLAIM` | Runtime availability, enforcement, persistence, API readiness, deployment readiness, product readiness, or external-use readiness |

PROHIBITED_SEMANTIC_FIELD_FAMILY_COUNT:
14

PROHIBITED_SEMANTIC_FIELD_FAMILIES:
ALL_FOURTEEN

OPTIONAL_PROHIBITED_FAMILIES:
NONE

The labels in this table are documentation-only semantic family identifiers.
They are not JSON keys, schema properties, validator codes, runtime statuses,
findings, scores, or conclusions.

## 4. Application to the Frozen Ten-Field Shape

RTRE-P02 permits exactly these ten top-level fields in this order:

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

This boundary adds no eleventh field. Every unknown top-level field remains
structurally prohibited by RTRE-P02, whether or not its name resembles a family
label in this document.

The deny-list also applies semantically:

- a permitted field must not carry raw, private, source, prompt, response, or
  reasoning content
- a permitted field must not be repurposed as provider, model, run, or execution
  metadata
- a permitted field must not encode a finding, score, ranking, conclusion,
  approval, certification, sign-off, readiness, or enforcement claim
- aliases, abbreviations, differently cased keys, nested objects, arrays,
  metadata wrappers, encoded payloads, and pass-through fields do not bypass the
  deny-list
- prohibited content must not be retained, ignored, echoed, normalized,
  summarized, hashed, or passed through by a future envelope validator

`caseId` remains only the symbolic canonical synthetic corpus reference frozen
by RTRE-P03. It is not a source locator, private matter identifier, provider run
identifier, or truth claim.

`outputType`, `actionClass`, `escalationTarget`, and `safeNextAction` remain only
the exact canonical taxonomy values. They do not contain the generated response
and do not authorize an action.

The three RTRE-P05 posture fields retain their exact values. They do not prove
that execution, review, approval, or absence of material occurred.

## 5. Fail-Closed and Non-Echo Posture

- no prohibited semantic field family is optional or conditionally allowed
- no debug, audit, provenance, metadata, compatibility, migration, extension,
  vendor, or experimental namespace may carry a prohibited family
- no future validator may return rejected input or prohibited content in its
  result
- no future error may echo a prohibited value
- exact future validator result shape remains governed by `RTRE-P07`
- exact future error taxonomy, path format, and deterministic precedence remain
  governed by `RTRE-P08`

This documentation boundary creates no parser, sanitizer, redactor, validator,
serializer, logger, audit event, runtime enforcement, persistence, API, or
provider execution.

## 6. Remaining Open Prerequisites

| `PREREQUISITE_ID` | Decision surface | Current status |
| --- | --- | --- |
| `RTRE-P07` | Validator result shape | `OPEN_NOT_SPECIFIED` |
| `RTRE-P08` | Validation error taxonomy and ordering | `OPEN_NOT_SPECIFIED` |

RTRE_P06_STATUS:
RESOLVED_DOCS_ONLY_NOT_CONTRACT_READY

RESULT_ENVELOPE_CONTRACT_READINESS:
BLOCKED_BY_RTRE_P07_AND_P08

## 7. Non-Interference Rules

- preserve RTRE-P01 through RTRE-P05 unchanged
- preserve the exact RTRE-P02 ten-field order and no-additional-field posture
- do not create schema, validator, package export, registry, lookup,
  persistence, API, provider execution, scoring, approval, readiness, or closure
- do not select RTRE-P07 validator results or RTRE-P08 errors and precedence
- preserve human/professional review as the release gate

## 8. Proof Boundary

The focused proof test for this document may prove only:

- this RTRE-P06 boundary exists
- exactly fourteen ordered semantic field families are denied
- the RTRE-P02 ten-field shape remains unchanged and no eleventh field is added
- alias, nesting, encoding, pass-through, and echo do not bypass the deny-list
- schema, validator, runtime behavior, and executed-run evidence remain uncreated
- `RTRE-P07` and `RTRE-P08` remain `OPEN_NOT_SPECIFIED`

It does not prove contract readiness, schema readiness, validator readiness,
model behavior, executed runs, runtime enforcement, legal correctness,
evidentiary sufficiency, professional approval, technical sign-off, release
readiness, product readiness, external-use authorization, blocker closure,
dependency closure, or compliance.

## 9. Final No-Conclusion Boundary

This prohibited-field deny-list boundary is not actual human review,
professional review, legal review, technical review, legal advice, professional
approval, technical sign-off, release approval, product/external-use
authorization, compliance certification, evidentiary conclusion, ownership
determination, source-truth conclusion, identity-truth conclusion,
authorship-truth conclusion, chain-of-custody proof, runtime verification,
security approval, deployment readiness, implementation-readiness, governance
approval, case-truth conclusion, or real-evidence review.

CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_PROHIBITED_FIELD_DENY_LIST_BOUNDARY_STATUS:
TRACKED_DOCS_ONLY_RTRE_P06_RESOLUTION

REPO_NEXT_ACTION:
none without a separate Owner decision
