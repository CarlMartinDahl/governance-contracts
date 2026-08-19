# SWE_BODELNING Source-Family Lifecycle Recall Sweep Boundary

## Status

Contract name: `SWE_BODELNING` source-family lifecycle recall sweep boundary.

Status: `DOCS_ONLY`.

Purpose: freeze a product-level source-discovery boundary requiring a source-family lifecycle recall sweep before any case-specific evidence-readiness package may be marked complete for human review.

This boundary is documentation only. It is not runtime implementation, not schema behavior, not semantic-fact mapping, not legal advice, not proof, not ownership determination, not evidentiary sufficiency scoring, not credibility finding, not final submission drafting, not private-case application, and not `actual_swedish_samaganderatt_decision_logic`.

## Purpose

A source-family lifecycle recall sweep is required before any case-specific evidence-readiness package can be marked as complete for human review.

The purpose is to reduce anchoring on:

- user-selected appendices
- already-submitted documents
- already-known source candidates
- filenames created by one party
- first-pass package contents
- early-event-only evidence

The sweep is a source-discovery and source-provenance boundary only. It supports human source/provenance review and working-ledger organization. It must not become an automatic conclusion.

## Problem Boundary

Target-led review may miss later source-family evidence, including:

- later repayment planning
- later refinance planning
- later partial-payment discussions
- later loan-management correspondence
- third-party confirmations after the acquisition
- counterparty explanations or admissions
- dispute-stage clarifications
- later contradiction or consistency signals

This boundary exists because a package that only verifies user-curated targets may be source-organized but still incomplete as a lifecycle review.

## Required Source-Family Lifecycle Stages

For every material source family, reviewers must consider at least:

- `ORIGINATION`
- `FUNDING`
- `IMPLEMENTATION`
- `CLOSURE`
- `LATER_MANAGEMENT`
- `REFINANCE_OR_REPAYMENT_PLANNING`
- `DISPUTE_OR_DENIAL`
- `THIRD_PARTY_CONFIRMATION`
- `COUNTERPARTY_ADMISSION_OR_EXPLANATION`

These stages are recall prompts. They are not legal elements, proof elements, schema fields, runtime enums, or sufficiency weights.

## Required Source-Family Classes

The sweep must apply to source families such as:

- family transfer / third-party transfer
- party payment / contribution
- bank loan
- bridge loan
- association loan
- private loan
- pledge / pant / formal-title source
- debt-clearance source
- tax/income/source-status material
- message-anchor source
- handwritten document/image source
- counterparty protocol/process-context source

The class list is intentionally generic and anonymized. It must not be populated with private filenames, party names, addresses, or case-specific labels in product docs.

## Search-Expansion Principle

For each material source family, the sweep must include generic terms around:

- loan
- repay
- solve
- amortize
- refinance
- extend time
- remaining amount
- partial payment
- new salary
- mortgage
- bank contact
- bank approval
- pledge
- debt
- clearance
- closure
- confirmation
- admission
- denial
- explanation
- source correction
- later handling

Also include Swedish and Scandinavian equivalents where relevant:

- lån
- lösa
- betala
- amortera
- delbetala
- förlänga tid
- resterande belopp
- löneökning
- ny lön
- bolån
- baka in
- pant
- skuld
- återkallelse
- bekräftelse
- bestridande
- förklaring
- senere håndtering
- tilbagebetaling
- gæld
- lån

Search expansion must remain bounded by the declared source universe and privacy-limited search rule.

## Temporal Sweep Requirement

The sweep must not stop at the acquisition date or the submitted appendix date.

It must check for relevant source-family signals:

- before the acquisition
- during acquisition
- after acquisition
- during later management
- during dispute separation
- during post-dispute protocol/response phase

Temporal scope must be recorded. If later correspondence or after-dispute correspondence is outside scope, that must be recorded as `NOT_SEARCHED_BY_SCOPE`, not as a negative finding.

## Source-Universe Declaration

Every evidence-readiness package must include a source-universe declaration stating:

- which corpora were searched
- which corpora were not searched
- which years/months were included
- which years/months were excluded
- whether full exports were available
- whether only appendices were available
- whether private holdout files were excluded
- whether later correspondence was searched
- whether after-dispute correspondence was searched

The declaration must be specific enough for a human reviewer to see whether a source-family lifecycle recall sweep was actually performed, waived, or limited by scope.

## Not-Found Vs Not-Searched Distinction

The following statuses must remain distinct:

- `NOT_FOUND_AFTER_TARGETED_SEARCH`
- `NOT_SEARCHED_BY_SCOPE`
- `NOT_LOCAL`
- `FOUND_BUT_OUT_OF_SCOPE`
- `FOUND_RELEVANT_REQUIRES_HUMAN_REVIEW`
- `FOUND_RELEVANT_SOURCE_FAMILY_LIFECYCLE_SIGNAL`

This distinction prevents a source from being wrongly treated as absent when it was merely outside scope.

## Anti-Anchoring Rule

A package cannot be marked `FULL_SOURCE_REVIEW_PACKAGE_READY_FOR_HUMAN_REVIEW` if it only confirms user-curated targets and does not run or explicitly waive the lifecycle recall sweep.

Any waiver must be recorded as:

`LIFECYCLE_RECALL_SWEEP_NOT_PERFORMED_SCOPE_LIMITATION`

The waiver must preserve:

- no proof conclusion
- no completeness claim
- no sufficiency scoring

Waiver language must be visible in the package checklist and summary, not hidden in internal notes.

## Privacy-Limited Search Rule

The sweep must be bounded.

It must not dump broad private conversations.

It must not inspect unrelated intimate, medical, psychological, or family material unless explicitly in scope.

It must isolate narrow source windows and redact them.

Generated summaries must avoid:

- raw phone-number filenames
- transaction IDs
- account numbers
- private URLs/tokens
- CPR/personnummer
- full addresses
- private bank identifiers

Source-discovery review must remain proportionate to the source family being checked.

## Safe Output Statuses

Allowed statuses:

- `SOURCE_FAMILY_LIFECYCLE_SWEEP_READY_FOR_HUMAN_REVIEW`
- `SOURCE_FAMILY_LIFECYCLE_SIGNAL_FOUND_READY_FOR_HUMAN_REVIEW`
- `SOURCE_FAMILY_LIFECYCLE_SWEEP_NEEDS_MANUAL_SELECTION`
- `SOURCE_FAMILY_LIFECYCLE_SWEEP_NOT_PERFORMED_SCOPE_LIMITATION`
- `SOURCE_FAMILY_LIFECYCLE_SWEEP_TOO_AMBIGUOUS`
- `SOURCE_FAMILY_LIFECYCLE_SIGNAL_FOUND_SUPPORTING_ONLY`
- `SOURCE_FAMILY_LIFECYCLE_SIGNAL_FOUND_BACKGROUND_ONLY`

These statuses are source/provenance and working-ledger statuses only. They are not proof statuses and not legal conclusions.

## Forbidden Outputs

The boundary forbids:

- proof of hidden co-ownership
- final ownership determination
- legal advice
- evidentiary sufficiency scoring
- credibility finding
- final submission drafting
- runtime decision logic
- `actual_swedish_samaganderatt_decision_logic`
- psychological-violence blending
- DK/SWE comparison
- Nordic comparison

The model must not convert a lifecycle signal into legal significance, issue satisfaction, proof, credibility, or outcome prediction.

## Human-Review Role

Lifecycle signals must be treated as:

- source/provenance support
- working-ledger support
- human legal/product review material

They must not become automatic conclusions.

Human reviewers decide whether a lifecycle signal should be ignored, used as background, used as supporting source material, followed up for original/source provenance, or withheld from external use.

## Anonymized Examples

Example A: A third-party loan used at acquisition later appears in a post-acquisition message where a party discusses partial repayment, salary increase, and possible mortgage refinancing.

Safe treatment: `SOURCE_FAMILY_LIFECYCLE_SIGNAL_FOUND_SUPPORTING_ONLY`, with human provenance review and redaction required. No ownership determination, no bank approval conclusion, and no proof that refinancing occurred.

Example B: A debt-clearance payment later appears in a third-party withdrawal/recall confirmation.

Safe treatment: source-family lifecycle signal for payment/status/recall sequencing. No proof conclusion and no legal-effect conclusion.

Example C: A family transfer appears in a message/image provenance source but not in bank-export form.

Safe treatment: source candidate requiring human review. If exact bank/export proof is needed, mark `SOURCE_FAMILY_LIFECYCLE_SWEEP_NEEDS_MANUAL_SELECTION`.

Example D: A formal-title record appears to show sole title but must be separated from hidden-co-ownership legal significance.

Safe treatment: formal-title source family / formal-structure context only. Formal title is not by itself a hidden-co-ownership decision.

## Required Package Checklist

Every future human-review source package should include:

- `SOURCE_UNIVERSE_DECLARATION.md`
- `SOURCE_FAMILY_LIFECYCLE_SWEEP.md`
- `LIFECYCLE_SIGNALS_FOUND.md`
- `NOT_SEARCHED_SCOPE_LIMITATIONS.md`
- `HUMAN_REVIEW_FOLLOW_UPS.md`

If a package does not include these files or equivalent clearly labeled sections, it must not claim full lifecycle recall coverage.

## Product Boundary

This document freezes a documentation-only product boundary.

It does not create runtime behavior.

It does not create schema changes.

It does not create semantic-fact mapping.

It does not create legal advice.

It does not create ownership determination.

It does not create sufficiency scoring.

It does not create a proof conclusion.

It does not draft final submissions.

It does not implement `actual_swedish_samaganderatt_decision_logic`.

It does not apply private facts and contains no case-specific examples.
