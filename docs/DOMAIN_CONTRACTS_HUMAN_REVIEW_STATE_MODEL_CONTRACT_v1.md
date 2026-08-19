# Human Review State Model Contract v1

HUMAN_REVIEW_STATE_MODEL_CONTRACT
CONTRACT_ONLY
MACHINE_READABLE_REVIEW_STATE_VOCABULARY_ONLY
NO_RUNTIME_BEHAVIOR_CREATED
NO_STOP_OUTCOME_MAPPING_CREATED
NO_LEGAL_RULE_EXPANSION
NO_PRODUCT_CANDIDATE
EXTERNAL_USE_NOT_AUTHORIZED
HUMAN_PROFESSIONAL_REVIEW_REQUIRED

## 1. Purpose and source boundary

This contract is the smallest machine-readable projection of the four
conceptual review states frozen by
`DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md`.

The canonical reusable schema surface is defined in
`schemas/human-review-state-model.json` and exported through
`packages/schemas`.

The schema has exactly one required field, `review_state`, and accepts exactly
these values in this order:

1. `ASSERTED`
2. `APPEARS_IN_SUPPLIED_MATERIAL`
3. `NOT_ESTABLISHED`
4. `HUMAN_REVIEW_REQUIRED`

No additional field is allowed.

## 2. State meanings

| Review state | Bounded meaning |
| --- | --- |
| `ASSERTED` | An event or claim is asserted without model endorsement. |
| `APPEARS_IN_SUPPLIED_MATERIAL` | Specified content appears in the declared supplied packet without source-truth, authenticity, completeness, or authorship conclusion. |
| `NOT_ESTABLISHED` | The requested proposition is not established by the model under the current boundary. |
| `HUMAN_REVIEW_REQUIRED` | A human or professional reviewer must decide the relevant question. |

These states classify review posture only. They do not score or determine
probability, credibility, reliability, merit, sufficiency, guilt, ownership,
source truth, identity truth, authorship truth, chain of custody, legal outcome,
or court usefulness.

## 3. Stop-outcome separation

`HUMAN_REVIEW_REQUIRED` is a Human Review Workspace review state.

`requires_human_review` remains a separate canonical stop outcome in
`schemas/stop-outcome-model.json`.

This contract creates no automatic mapping, conversion, equivalence, dispatch,
workflow transition, or runtime behavior between the two vocabularies. Any
future mapping requires its own tracked source contract and separately
authorized contract-only or runtime slice.

## 4. Validation scope

The package validator may validate only:

- that the input is a plain object
- that the object contains exactly `review_state`
- that `review_state` is one of the four exact canonical values

Successful validation means only that the object matches this structural
contract. It does not validate the supplied material, source reference,
asserted claim, factual proposition, review decision, or professional judgment.

## 5. Non-interference and negative authorization

This contract creates no runtime workflow, API behavior, persistence, export,
user interface, source acquisition, forensic extraction, source verification,
evidence selection, human approval, professional approval, legal conclusion,
evidentiary conclusion, ownership determination, source-truth conclusion,
identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof,
police readiness, public-sector readiness, compliance certification, product
candidate, release approval, or external-use authorization.

It does not reopen `SWE_BODELNING`, `DK_PSYKISK_VOLD`,
`SWE_PSYKISKT_VALD`, offence modelling, ownership modelling, Nordic legal
comparison, raw/private source review, real-evidence review, or third-party
model routing.

Human/professional review remains the release gate.
