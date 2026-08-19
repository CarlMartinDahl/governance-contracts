# SWE_BODELNING Counterparty Admission Dispute Formal Context Matrix Boundary

## Status

Contract name: `SWE_BODELNING` counterparty admission / dispute / formal-context matrix boundary.

Status: `DOCS_ONLY`.

Purpose: freeze a documentation-only product boundary requiring a counterparty admission / dispute / formal-context matrix whenever counterparty protocols, formal register records, or third-party formal documents are used in `SWE_BODELNING` evidence-readiness review.

This document is documentation only.

It does not create runtime behavior.

It does not create schema changes.

It does not create semantic-fact mapping.

It does not create legal advice.

It does not create ownership determination.

It does not create sufficiency scoring.

It does not create a proof conclusion.

It does not create a credibility finding.

It does not draft final submissions.

It does not implement `actual_swedish_samaganderatt_decision_logic`.

It contains no private facts and no private-case application.

## Purpose

A counterparty admission / dispute / formal-context matrix is required when counterparty protocols, formal register records, or third-party formal documents are used in `SWE_BODELNING` evidence-readiness review.

The purpose is to prevent the model from converting factual confirmations or formal records into legal conclusions.

This boundary is source/provenance review only. It supports human review, redaction planning, and working-ledger organization. It must not become automatic legal interpretation.

## Problem Boundary

A counterparty may:

- confirm factual financial events
- dispute legal consequences
- make legal arguments
- provide formal records
- submit source references
- omit, qualify, or frame facts strategically

The model must preserve these distinctions.

The model must not flatten a mixed protocol into a single narrative label when the material contains both factual confirmations and legal framing.

## Required Matrix Categories

Every relevant counterparty/formal-context item must be classified into one or more of:

- `ADMITTED_FACT`
- `DISPUTED_FACT`
- `COUNTERPARTY_LEGAL_POSITION`
- `FORMAL_RECORD`
- `SOURCE_REFERENCE`
- `THIRD_PARTY_CONFIRMATION`
- `HUMAN_REVIEW_GATE`
- `MUST_NOT_CONCLUDE`

These are review-layer categories only. They are not legal determinations, runtime enums, schema fields, or semantic-fact outputs.

## Required Row Structure

Each matrix row must include:

- `REVIEW_ID`
- `SOURCE_TYPE`
- `SOURCE_FAMILY`
- `STATEMENT_OR_RECORD_SUMMARY`
- `CATEGORY`
- `WHAT_IT_SUPPORTS_FOR_REVIEW`
- `HUMAN_REVIEW_GATE`
- `MUST_NOT_CONCLUDE`
- `REDACTION_REQUIRED`
- `EXTERNAL_USE_CLASSIFICATION`

The row structure is organizational only. It is not a runtime object contract and not a machine decision format.

## Admission Versus Legal Position Rule

A factual admission can support source/provenance review.

A legal position is not a fact.

A formal record is not a legal conclusion.

A counterparty’s denial does not erase factual confirmations.

A counterparty’s factual confirmation does not prove the legal conclusion.

This distinction must remain visible in the matrix and in any later redacted review summary.

## Formal Record Rule

Formal title / registered owner / pledge / pant / loan records must be treated as `FORMAL_RECORD` or `FORMAL_STRUCTURE_CONTEXT`.

They must not be converted automatically into:

- ownership determination
- proof against hidden co-ownership
- proof of hidden co-ownership
- final legal conclusion

Formal title is not ownership conclusion.

Formal record may support chronology, source provenance, or formal-structure context only unless a later human legal review says otherwise.

## Counterparty Protocol Rule

A Counterparty Protocol must be parsed into separate layers:

- factual confirmations
- disputed facts
- legal positions
- formal records referenced
- source documents referenced
- human-review questions

The model must not summarize a mixed protocol as simply:

- “counterparty denies claim”
- “counterparty confirms claim”

Both are too abstract when mixed facts and positions are present.

Mixed protocol requires layer separation.

## Source Family Examples

Use fully anonymized examples only.

### Example A

Counterparty confirms receiving a Family Transfer and two payments from the other party, but disputes that these payments relate to the dwelling acquisition.

Expected:

- `ADMITTED_FACT` for receipt/use
- `COUNTERPARTY_LEGAL_POSITION` for disputed connection
- `HUMAN_REVIEW_GATE` for relation-to-acquisition review
- `MUST_NOT_CONCLUDE` no ownership determination

Expected shorthand: ADMITTED_FACT for receipt/use.

Expected shorthand: COUNTERPARTY_LEGAL_POSITION for disputed connection.

Expected shorthand: MUST_NOT_CONCLUDE no ownership determination.

Family transfer example is provenance-sensitive only. It is not bank/export proof.

### Example B

Counterparty confirms a Third-Party Loan was used to cover part of the purchase price, but states that only they carried the legal risk.

Expected:

- `ADMITTED_FACT` / `THIRD_PARTY_CONFIRMATION` for loan-use facts
- `COUNTERPARTY_LEGAL_POSITION` for risk/legal framing
- `SOURCE_REFERENCE` if the protocol points to the formal loan document
- `MUST_NOT_CONCLUDE` no legal conclusion

Expected shorthand: ADMITTED_FACT / THIRD_PARTY_CONFIRMATION for loan-use facts.

Expected shorthand: MUST_NOT_CONCLUDE no legal conclusion.

Third-party loan example remains source/provenance review only.

### Example C

Formal Register shows Party B as sole formal holder and pledge records.

Expected:

- `FORMAL_RECORD`
- `FORMAL_STRUCTURE_CONTEXT`
- `MUST_NOT_CONCLUDE` formal title is not by itself a hidden-co-ownership decision

Formal register example is context only. It is not ownership determination.

### Example D

Counterparty states that a formal agreement was required by a Bank Contact because of Party A’s financial status.

Expected:

- `ADMITTED_FACT` or `COUNTERPARTY_EXPLANATION` for reason given
- `FORMAL_STRUCTURE_CONTEXT` for the formal document
- `SOURCE_REFERENCE` if supporting records are named
- `MUST_NOT_CONCLUDE` no automatic legal effect

Expected shorthand: ADMITTED_FACT or COUNTERPARTY_EXPLANATION for reason given.

Expected shorthand: ADMITTED_FACT or `COUNTERPARTY_EXPLANATION` for reason given.

Bank-required formal agreement example remains explanation/context only.

## Interaction With Existing Safeguards

The lifecycle recall sweep finds lifecycle signals.

The redacted review signal preservation boundary keeps concrete facts from being abstracted away.

The anonymized lifecycle stress test exercises both.

The counterparty/formal matrix separates factual confirmations, legal positions, and formal records.

All four are complementary.

## Allowed Status Labels

Allowed statuses:

- `COUNTERPARTY_MATRIX_READY_FOR_HUMAN_REVIEW`
- `ADMITTED_FACT_READY_FOR_HUMAN_REVIEW`
- `DISPUTED_FACT_REQUIRES_HUMAN_REVIEW`
- `COUNTERPARTY_LEGAL_POSITION_RECORDED`
- `FORMAL_RECORD_CONTEXT_ONLY`
- `SOURCE_REFERENCE_REQUIRES_PROVENANCE_REVIEW`
- `MIXED_PROTOCOL_REQUIRES_LAYER_SEPARATION`
- `FORMAL_TITLE_NOT_OWNERSHIP_CONCLUSION`
- `FACTUAL_ADMISSION_NOT_LEGAL_CONCLUSION`
- `COUNTERPARTY_DENIAL_NOT_FACTUAL_NEGATION`

These statuses are review statuses only. They must not be treated as proof statuses or final legal outputs.

## Forbidden Outputs

The boundary forbids:

- proof of hidden co-ownership
- ownership determination
- legal advice
- evidentiary sufficiency scoring
- credibility finding
- final submission drafting
- runtime decision logic
- `actual_swedish_samaganderatt_decision_logic`
- psychological-violence blending
- DK/SWE comparison
- Nordic comparison

The model must not convert admission/dispute/formal-context separation into outcome prediction or legal conclusion.

## Privacy Rule

Generated summaries must not include:

- no raw phone-number filenames
- transaction IDs
- account numbers
- IBAN/BIC
- CPR/personnummer
- full private addresses
- private URLs/tokens
- private bank identifiers
- raw email addresses unless reviewed and necessary
- unrelated intimate, medical, psychological, or family-conflict material
- private case identifiers

Privacy-safe summary language must preserve source/provenance distinctions while removing private identifiers.

## Required Package / Checklist Effect

Future evidence-readiness packages using counterparty protocols or formal register documents should include:

- `COUNTERPARTY_ADMISSION_DISPUTE_MATRIX.md`
- `FORMAL_RECORD_CONTEXT_MATRIX.md`
- `SOURCE_REFERENCE_PROVENANCE_FOLLOW_UPS.md`
- `MUST_NOT_CONCLUDE_BOUNDARY.md`

These package elements support source/provenance review only.

## Pass Criteria

A package passes this boundary only if it:

- separates admitted facts from legal positions
- separates formal records from ownership conclusions
- records source references without treating them as proof
- preserves human-review gates
- preserves no-conclusion boundaries
- avoids credibility findings
- avoids legal advice
- avoids private identifiers

## Failure Modes

Failures include:

- treating counterparty denial as factual negation
- treating counterparty admission as legal conclusion
- treating formal title as final ownership conclusion
- treating formal title as proof against hidden co-ownership
- treating family transfer admission as bank/export proof
- summarizing mixed protocol too broadly
- omitting disputed-fact layer
- omitting human-review gate
- making credibility finding
- generating final submission text
- blending psychological-violence material
