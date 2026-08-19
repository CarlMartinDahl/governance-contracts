# SWE_BODELNING Redacted Review Signal Preservation Boundary

## Status

Contract name: `SWE_BODELNING` redacted review signal-preservation boundary.

Status: `DOCS_ONLY`.

Purpose: freeze a product-level redacted-review boundary requiring concrete review-relevant source signals to remain preserved in redacted evidence-readiness summaries after lifecycle signals are found.

This document freezes a documentation-only product boundary.

It is not runtime implementation, not schema behavior, not semantic-fact mapping, not legal advice, not proof, not ownership determination, not evidentiary sufficiency scoring, not credibility finding, not final submission drafting, not private-case application, and not `actual_swedish_samaganderatt_decision_logic`.

It does not create runtime behavior.

It does not create schema changes.

It does not create semantic-fact mapping.

It does not create legal advice.

It does not create ownership determination.

It does not create sufficiency scoring.

It does not create a proof conclusion.

It does not draft final submissions.

It contains no private case facts and no case-specific examples.

## Purpose

A redacted review package must preserve concrete review-relevant source signals.

Redaction must remove private identifiers and unrelated private material, but must not abstract away the material source signal that makes an item relevant for human review.

This boundary exists to keep redacted review packages useful for human source/provenance review even after privacy-safe redaction is applied.

## Problem Boundary

A lifecycle signal can be found but later weakened by over-redaction or over-abstraction.

This boundary prevents summaries that reduce a material source signal to wording such as:

- “later loan-management”
- “financial context”
- “message context”
- “supporting source”

when the accepted source signal contains concrete review-relevant facts that must still be preserved in redacted form.

The problem is not only privacy leakage. The problem is also signal loss.

## Signal Preservation Rule

For every material source signal included in a redacted evidence-readiness review, the summary must preserve at least:

- source family
- lifecycle stage
- approximate date or narrow time window, if safely stated
- type of source
- concrete action or event
- material amount or category of amount, if central and safe to state
- role of the parties using neutral labels
- relation to the core chain
- use classification
- remaining human-review gate
- no-conclusion boundary

If those elements are missing, the review signal may be too abstract to support reliable human review.

## Concrete Facts That Must Not Be Abstracted Away

When source-relevant and privacy-safe after redaction, preserve facts such as:

- partial-payment amount
- remaining amount
- request for more time
- salary increase / new salary
- mortgage handling
- bank contact
- possible refinance
- loan closure
- debt recall / withdrawal
- third-party confirmation
- counterparty explanation
- source provenance type
- original/export not found
- manual source-selection gate

These are review-signal facts, not legal conclusions.

## Redaction Versus Abstraction

The boundary distinguishes:

- `REDACT_PRIVATE_IDENTIFIER`
- `REDACT_RAW_PATH`
- `REDACT_UNRELATED_PRIVATE_CONTEXT`
- `PRESERVE_REVIEW_SIGNAL`
- `SIGNAL_TOO_ABSTRACT_REQUIRES_ENRICHMENT`
- `SIGNAL_PRESERVED_READY_FOR_HUMAN_REVIEW`

Rules:

- Removing account numbers is redaction.
- Removing private URLs/tokens is redaction.
- Removing unrelated intimate or medical content is redaction.
- Removing the fact that a partial payment was discussed is impermissible abstraction.
- Removing the fact that a salary increase or mortgage/refinance handling was discussed is impermissible abstraction if that fact is material to the source family.
- Removing the fact that a source is only supporting and not proof is impermissible boundary loss.

Redaction removes private identifiers and unrelated private context.

Impermissible abstraction removes the reason the source matters.

## Minimum Signal Tuple

Each material redacted source row should include:

- `REVIEW_ID`
- `SOURCE_FAMILY`
- `LIFECYCLE_STAGE`
- `SOURCE_WINDOW`
- `REVIEW_SIGNAL`
- `USE_CLASSIFICATION`
- `REDACTION_REQUIRED`
- `HUMAN_REVIEW_GATE`
- `MUST_NOT_CONCLUDE`

This minimum signal tuple is organizational and review-oriented only. It is not a schema field set, runtime tuple, or semantic-fact mapping.

## Safe Statuses

Allowed statuses:

- `SIGNAL_PRESERVED_READY_FOR_HUMAN_REVIEW`
- `SIGNAL_TOO_ABSTRACT_REQUIRES_ENRICHMENT`
- `SIGNAL_PRESERVED_SUPPORTING_ONLY`
- `SIGNAL_PRESERVED_BACKGROUND_ONLY`
- `SIGNAL_REDACTED_PRIVATE_REVIEW_ONLY`
- `SIGNAL_REQUIRES_MANUAL_SOURCE_SELECTION`
- `SIGNAL_NOT_INCLUDED_SCOPE_LIMITATION`

These statuses are source/provenance and redacted-review statuses only.

They are not proof statuses, not ownership conclusions, and not bank approval conclusions.

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

The model must not convert a preserved review signal into proof, legal significance, ownership determination, bank approval conclusion, actual refinancing proof, credibility finding, or outcome prediction.

## Privacy-Preserving Rule

Generated redacted summaries must not include:

- raw phone-number filenames
- transaction IDs
- transfer references
- account numbers
- IBAN/BIC
- CPR/personnummer
- full private addresses
- private URLs/tokens
- private bank identifiers
- raw email addresses unless necessary and reviewed
- unrelated intimate, medical, psychological, or family-conflict material
- private case identifiers

Privacy-preserving redaction is required, but privacy-preserving redaction must still preserve the review signal.

## Human-Review-Only Boundary

Preserved signals are for:

- human source/provenance review
- source selection
- redaction planning
- working-ledger organization
- possible later human-drafted submission planning

They must not become automatic conclusions.

## Relation To Lifecycle Recall Sweep

The lifecycle recall sweep helps find signals.

The redacted review signal-preservation boundary ensures found signals are not lost in redacted summaries.

Both boundaries are required before a redacted evidence-readiness package can be treated as mature for human review.

The lifecycle sweep addresses discovery completeness.

This signal-preservation boundary addresses summary fidelity after discovery.

## Required Review Package Files

A redacted evidence-readiness package should include:

- `SOURCE_UNIVERSE_DECLARATION.md`
- `SOURCE_FAMILY_LIFECYCLE_SWEEP.md`
- `LIFECYCLE_SIGNALS_FOUND.md`
- `SOURCE_SELECTION_MATRIX.md`
- `SIGNAL_PRESERVATION_CHECKLIST.md`
- `NOT_SEARCHED_SCOPE_LIMITATIONS.md`
- `HUMAN_REVIEW_FOLLOW_UPS.md`
- `EXTERNAL_USE_REDACTION_PLAN.md`

## Signal Preservation Checklist

The checklist must ask:

- Does the summary preserve the actual source-family signal?
- Does it preserve material amounts or partial-payment facts where relevant?
- Does it preserve later management/refinance/repayment planning facts?
- Does it preserve the source’s use classification?
- Does it preserve human-review gates?
- Does it preserve no-conclusion boundaries?
- Did redaction remove only private identifiers and unrelated private context?
- Did redaction accidentally remove the reason the source matters?

## Anonymized Examples

Example A: A third-party loan used at acquisition later appears in post-acquisition correspondence discussing partial payment, remaining balance, salary increase, and possible mortgage refinancing. A redacted summary must preserve those concrete facts while removing identifiers.

Example B: A family transfer appears in a message-image source. The summary must preserve that message/image provenance exists, while also preserving that original bank/export proof remains manually gated.

Example C: A debt-clearance payment later appears in a third-party recall or withdrawal confirmation. The summary must preserve payment/status/recall sequence and no legal-effect conclusion.

Example D: A formal title document shows registered ownership. The summary must preserve formal-structure context and must not convert it into hidden-co-ownership conclusion.

## Supporting-Only And No-Conclusion Boundary

If a source is supporting-only, the summary must preserve that supporting-only classification.

If a source is not proof, the summary must preserve that no-proof boundary.

If a source does not show bank approval, the summary must preserve that no bank approval conclusion is allowed.

If a source does not show that refinancing happened, the summary must preserve that no actual refinancing proof is allowed.

No ownership determination is allowed.

No legal advice is allowed.

No sufficiency scoring is allowed.

No final submission drafting is allowed.

## Human Review Gates

Every preserved signal must carry a remaining human-review gate such as:

- source/original/provenance verification
- manual source selection
- redaction review
- legal significance review
- no-conclusion boundary review

If a redacted summary loses those gates, the package may appear more mature than the evidence supports.

## Explicit Negative Boundary

This contract is:

- not runtime/schema implementation
- not semantic-fact mapping
- not legal advice
- not proof
- not ownership determination
- not sufficiency scoring
- not final submission drafting
- not `actual_swedish_samaganderatt_decision_logic`
- not psychological-violence blending
- not DK/SWE comparison
- not Nordic comparison
- not private-case application
