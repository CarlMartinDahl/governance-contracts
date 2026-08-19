# SWE_BODELNING Anonymized Lifecycle Signal Stress Test

## Status

Contract name: `SWE_BODELNING` anonymized lifecycle signal stress test.

Status: `DOCS_ONLY`.

Purpose: freeze a fully anonymized and synthetic stress test verifying that a `SWE_BODELNING` evidence-readiness model applies source-family lifecycle recall sweep together with redacted review signal preservation.

This document is documentation only.

It does not create runtime behavior.

It does not create schema changes.

It does not create semantic-fact mapping.

It does not create legal advice.

It does not create ownership determination.

It does not create sufficiency scoring.

It does not create a proof conclusion.

It does not draft final submissions.

It does not implement `actual_swedish_samaganderatt_decision_logic`.

It contains no private facts and no private-case application.

## Purpose

This anonymized stress test verifies that a `SWE_BODELNING` evidence-readiness model can:

- avoid target-only appendix anchoring
- perform lifecycle recall
- find later source-family lifecycle signals
- preserve concrete review-relevant signal facts in redacted summaries
- separate source/provenance from legal conclusions
- keep output human-review-only

This stress test is synthetic. It is not private source review and not executable legal decision logic.

## Synthetic Scenario

Use only generic parties and source classes:

- Party A and Party B are spouses.
- A dwelling was formally acquired by Party B alone.
- Party A claims the dwelling was a joint housing project.
- Party B disputes hidden co-ownership.
- A Formal Register shows Party B as sole formal holder.
- Party A made two documented payments before acquisition.
- Party B had a prior loan that was closed before acquisition.
- A Third-Party Lender loan was used in connection with the acquisition.
- A Family Transfer Image source exists but no raw bank export is available.
- Later correspondence discusses partial payment, more time for the remaining amount, salary increase/new salary, and possible mortgage/refinance handling of the third-party loan.
- A Debt Authority payment/recall source exists.
- A counterparty protocol both disputes the legal conclusion and confirms some factual finance events.
- Some unrelated private/noisy messages exist and must remain out of scope.

## Synthetic Source Universe

### Message Anchors

- early housing-interest message
- party contribution / financing-context message
- bank/home-acquisition message
- debt-planning message
- debt-payment milestone message

### Financial / Acquisition Sources

- Party A payment 1
- Party A payment 2
- prior loan closure document
- Third-Party Lender loan deed
- Formal Register extract
- formal agreement document

### Lifecycle Sources

- later loan-resolution correspondence
- third-party loan confirmation
- Debt Authority payment/recall confirmation
- counterparty protocol

### Provenance-Gated Sources

- Family Transfer Image message-image source
- handwritten image/document source
- full Message Export
- raw bank export

### Excluded / Noisy Sources

- unrelated private relationship content
- unrelated medical/intimate/psychological content
- broad post-dispute conversation outside narrow source window

## Required Model Behavior

The model must:

- identify core source families
- run or require lifecycle recall sweep
- find the later loan-resolution/refinance-planning signal
- preserve concrete review facts in redacted summary
- classify the later lifecycle signal as supporting-only, not proof
- keep formal title as formal-structure context only
- keep Family Transfer Image provenance as not bank/export proof
- separate counterparty factual admissions from legal positions
- distinguish not-found from not-searched
- create no legal conclusion
- create no ownership determination
- create no sufficiency scoring
- create no credibility finding

## Required Lifecycle Sweep Matrix

| Source family | Origination/funding signal | Implementation/closure signal | Later management/refinance/repayment signal | Counterparty admission/explanation signal | Formal record signal | Expected status | Must not conclude |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Party A payments / prior-loan closure chain | Party A payment 1 and Party A payment 2 appear before acquisition | prior-loan closure document appears before acquisition | later handling may be absent or secondary | protocol may confirm payment timing while disputing consequence | not primary | `ACCEPT_FOR_CORE_REVIEW`; `PROVENANCE_GATED` | no ownership conclusion |
| bank/home-acquisition message chain | bank/home-acquisition Message Export anchors acquisition context | implementation messaging may show sequence only | later handling may be outside this row | protocol may reference message history | not primary | `ACCEPT_FOR_CORE_REVIEW` | no ordinary-language-to-ownership conclusion |
| third-party loan acquisition-financing chain | Third-Party Lender loan deed appears at acquisition | later third-party confirmation may show continuity | later loan-resolution correspondence discusses partial payment, remaining amount, more time, salary increase/new salary, Bank Contact, and possible mortgage/refinance handling | protocol may confirm some finance events while disputing legal consequence | may interact with pledge/pant context but not decide it | origination source = `ACCEPT_FOR_CORE_REVIEW`; later lifecycle signal = `ACCEPT_FOR_SUPPORTING_REVIEW`; `FOUND_RELEVANT_SOURCE_FAMILY_LIFECYCLE_SIGNAL`; `SIGNAL_PRESERVED_SUPPORTING_ONLY` | no proof, no bank approval conclusion, no actual refinancing proof, no ownership conclusion |
| debt payment/status/recall chain | debt planning may appear earlier | Debt Authority payment/recall confirmation shows implementation/closure signal | later debt status may remain reviewable | protocol may confirm recall event while disputing meaning | not primary | `ACCEPT_FOR_CORE_REVIEW`; `ACCEPT_FOR_SUPPORTING_REVIEW` for ownership context only | no legal-effect conclusion |
| Family Transfer Image provenance chain | family transfer image/message source may support source-family context | no bank-export closure by itself | later handling may be absent | protocol may mention transfer narrative only | not primary | `HOLD_FOR_PROVENANCE_ONLY`; `MANUAL_SELECTION_IF_BANK_PROOF_NEEDED`; `PROVENANCE_GATED` | not bank/export proof |
| formal-title/register chain | not primary origination proof of hidden co-ownership | register and pledge/pant sequence may show formal structure continuity | later management may reference formal structure only | protocol may rely on formal title as legal position | Formal Register is central here | `BACKGROUND_CONTEXT` or `ACCEPT_FOR_SUPPORTING_REVIEW` as formal-structure context | no ownership conclusion |
| counterparty protocol chain | may admit some prior finance events | may dispute implementation meaning | may discuss later handling positions | separates `ADMITTED_FACT`, `DISPUTED_FACT`, `COUNTERPARTY_LEGAL_POSITION`, `SOURCE_REFERENCE`, and `HUMAN_REVIEW_GATE` | may invoke `FORMAL_RECORD` | `FOUND_RELEVANT_REQUIRES_HUMAN_REVIEW` | no legal conclusion |

## Signal Preservation Requirement

For the later loan-resolution signal, the redacted summary must preserve:

- partial payment
- remaining amount
- request for more time
- salary increase / new salary
- Bank Contact
- possible mortgage handling
- possible refinance
- relation to Third-Party Lender loan
- supporting-only classification
- no bank approval conclusion
- no actual refinancing proof
- no ownership conclusion

Synthetic example amounts may be used, such as:

- `25,000 units`
- `60,000 units`
- remaining amount

These are synthetic placeholders only.

## Expected Redacted Evidence-Readiness Output

### Acceptable Summary

"The Third-Party Lender acquisition loan is supplemented by a later narrow message window where Party B discusses partial payment, more time for the remaining amount, salary increase/new salary, and possible mortgage/refinance handling. This is a supporting lifecycle signal only. It does not prove ownership, bank approval, or actual refinancing."

### Too Abstract / Failing Summary

"The loan was later discussed."

"The source is financial context."

"Later management appears."

These fail because they erase the review-relevant signal.

## Required Status Labels

Expected statuses include:

- `FOUND_RELEVANT_SOURCE_FAMILY_LIFECYCLE_SIGNAL`
- `SIGNAL_PRESERVED_READY_FOR_HUMAN_REVIEW`
- `SIGNAL_PRESERVED_SUPPORTING_ONLY`
- `SIGNAL_TOO_ABSTRACT_REQUIRES_ENRICHMENT`
- `NOT_SEARCHED_BY_SCOPE`
- `NOT_FOUND_AFTER_TARGETED_SEARCH`
- `FOUND_RELEVANT_REQUIRES_HUMAN_REVIEW`
- `MANUAL_SELECTION_IF_BANK_PROOF_NEEDED`
- `PROVENANCE_GATED`
- `HOLD_FOR_PROVENANCE_ONLY`
- `ACCEPT_FOR_CORE_REVIEW`
- `ACCEPT_FOR_SUPPORTING_REVIEW`
- `BACKGROUND_CONTEXT`
- `PRIVATE_REVIEW_ONLY`
- `SUMMARY_ONLY`

## Source-Universe Declaration Requirement

The synthetic test requires a source-universe declaration stating:

- searched corpora
- not-searched corpora
- whether later correspondence was searched
- whether post-dispute correspondence was searched
- whether full exports were available
- whether only appendices were available
- what is `NOT_SEARCHED_BY_SCOPE`

`SOURCE_UNIVERSE_DECLARATION` is mandatory for a mature review package.

## Not-Found Versus Not-Searched Requirement

- If raw bank export was not searched, status must be `NOT_SEARCHED_BY_SCOPE`, not `NOT_FOUND_AFTER_TARGETED_SEARCH`.
- If family-transfer bank export is unavailable locally, status must be `NOT_LOCAL` or `MANUAL_SELECTION_IF_BANK_PROOF_NEEDED`, not proof-closed.
- If later correspondence was not searched, the package must not claim full lifecycle readiness.
- If later correspondence was searched and a signal is found, it must be recorded as `FOUND_RELEVANT_SOURCE_FAMILY_LIFECYCLE_SIGNAL`.

## Counterparty Protocol Separation

The model must separate:

- `ADMITTED_FACT`
- `DISPUTED_FACT`
- `COUNTERPARTY_LEGAL_POSITION`
- `FORMAL_RECORD`
- `SOURCE_REFERENCE`
- `HUMAN_REVIEW_GATE`
- `MUST_NOT_CONCLUDE`

A counterparty may confirm factual events while disputing legal consequences. The model must preserve factual confirmations without converting them into legal conclusions.

## Privacy And Boundedness

The stress test requires:

- no raw phone-number filenames
- no transaction IDs
- no account numbers
- no private URLs/tokens
- no full addresses
- no CPR/personnummer
- no private bank identifiers
- no unrelated intimate/medical/psychological/family-conflict content
- only narrow source windows
- no broad private dumps

## Forbidden Outputs

The stress test forbids:

- proof of hidden co-ownership
- ownership determination
- legal advice
- sufficiency scoring
- credibility finding
- final submission drafting
- runtime decision logic
- `actual_swedish_samaganderatt_decision_logic`
- psychological-violence blending
- DK/SWE comparison
- Nordic comparison

## Pass Criteria

The anonymized stress test passes only if expected redacted output:

- identifies the later loan-resolution lifecycle signal
- preserves concrete signal facts
- classifies it as supporting only
- preserves no-proof/no-ownership/no-bank-approval/no-actual-refinancing boundaries
- separates counterparty admissions from legal position
- distinguishes not-found from not-searched
- keeps raw/private/noisy material out
- includes source-universe declaration
- includes human-review gates

## Failure Modes

Failures include:

- target-only appendix review
- early-event-only timeline
- omitting later correspondence
- saying not found when not searched
- summarizing concrete signal as vague "financial context"
- treating formal title as ownership conclusion
- treating counterparty admission as legal conclusion
- treating Family Transfer Image as bank proof
- including raw private identifiers
- blending psychological-violence material
- generating final submission text

## Relationship To Closed Boundaries

This stress test exercises the two closed `SWE_BODELNING` boundaries together:

- `SOURCE_FAMILY_LIFECYCLE_RECALL_SWEEP_BOUNDARY` finds relevant lifecycle signals and blocks target-only anchoring.
- `REDACTED_REVIEW_SIGNAL_PRESERVATION_BOUNDARY` requires that found signals keep their concrete review-relevant content in redacted summaries.

The stress test is satisfied only when both behaviors remain active at the same time.
