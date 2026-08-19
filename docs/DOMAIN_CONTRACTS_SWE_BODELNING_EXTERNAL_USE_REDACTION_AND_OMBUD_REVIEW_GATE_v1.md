# SWE_BODELNING External Use Redaction And Ombud Review Gate

## Status

Contract name: `SWE_BODELNING` external-use redaction and ombud-review gate.

Status: `DOCS_ONLY`.

Purpose: freeze a documentation-only product boundary requiring a separate external-use redaction and ombud-review gate before any `SWE_BODELNING` source-review, matrix, worksheet, or redacted evidence-readiness material is used outside the private review workspace.

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

An external-use redaction and ombud-review gate is required before any source-review, matrix, worksheet, or redacted evidence-readiness material is used outside the private review workspace.

The purpose is to prevent the model from treating:

- `human-review-ready`
- `provenance-review-ready`
- `core-review`
- `supporting-review`

as automatically external-ready.

## Core Rule

`REVIEW_READY` is not `EXTERNAL_READY`.

`CORE_REVIEW` is not `SEND_AS_IS`.

`SUPPORTING_REVIEW` is not `LEGAL_ARGUMENT`.

`FORMAL_RECORD` is not `OWNERSHIP_CONCLUSION`.

`ADMITTED_FACT` is not `LEGAL_CONCLUSION`.

`PRIVATE_REVIEW_ONLY` must not be externally shared as-is.

## Required External-Use Classifications

Every source family or matrix row intended for possible external use must be classified as one of:

- `READY_AFTER_REDACTION`
- `READY_AFTER_STRICT_REDACTION`
- `SUMMARY_ONLY`
- `PRIVATE_REVIEW_ONLY`
- `NEEDS_OMBUD_REVIEW`
- `DO_NOT_USE_EXTERNALLY`

## Required External-Use Row Structure

Each row must include:

- `REVIEW_ID`
- `SOURCE_FAMILY`
- `INTERNAL_REVIEW_STATUS`
- `EXTERNAL_USE_CLASSIFICATION`
- `REDACTION_LEVEL`
- `OMBUD_REVIEW_REQUIRED`
- `SAFE_PUBLIC_SUMMARY`
- `PRIVATE_DETAILS_TO_REMOVE`
- `HUMAN_REVIEW_GATE`
- `MUST_NOT_CONCLUDE`

The row structure is organizational only. It is not runtime behavior, not a schema object contract, and not semantic-fact mapping.

## Redaction Level Definitions

### `LOW_REDACTION`

Remove limited direct identifiers while preserving the source fact in nearly full generic form.

### `MEDIUM_REDACTION`

Remove direct identifiers plus narrower private context, ticket references, and extra chronology not needed for the review signal.

### `HIGH_REDACTION`

Remove direct identifiers, detailed chronology, source-path traces, and any narrow contextual details that could re-identify the private material.

### `STRICT_REDACTION`

Use only tightly bounded, highly generalized summaries with no raw quotations, no narrow source-window markers beyond what is safely necessary, and no path-like or identifier-like details.

### `SUMMARY_ONLY_REDACTION`

Allow only a short generic summary of the preserved source fact; no raw quotation, no detailed chronology, and no direct source artifacts.

### `PRIVATE_ONLY_NO_EXTERNAL_USE`

The material remains inside private review only and must not be used externally.

## Source Classes Requiring Strict Handling

Strict handling is required for:

- raw message exports
- narrow lifecycle message windows
- bank/transfer documents
- account/payment materials
- identity images
- signatures
- tax/source-status documents
- counterparty protocols
- family-transfer image/message provenance
- debt authority materials
- medical/intimate/psychological/unrelated family-conflict content
- formal register records containing private identifiers
- email headers and ticket references

## Allowed Transformation

The gate distinguishes:

- `SOURCE FACT PRESERVED`
- `PRIVATE IDENTIFIER REDACTED`
- `RAW PATH REMOVED`
- `UNRELATED PRIVATE CONTEXT OMITTED`
- `LEGAL CONCLUSION BLOCKED`
- `SUMMARY_ONLY_ALLOWED`
- `DO_NOT_QUOTE_RAW`

The allowed transformation preserves the review-relevant source fact while removing identifiers, raw paths, and unrelated private detail.

## Special Source-Family Rules

### A. Core financial/payment source

Core financial/payment source can be `READY_AFTER_REDACTION` or `READY_AFTER_STRICT_REDACTION` after human provenance review.

Must not conclude:

- No ownership determination.
- No sufficiency scoring.

### B. Later lifecycle/refinance-planning signal

Later lifecycle/refinance-planning signal is usually `SUMMARY_ONLY` or `READY_AFTER_STRICT_REDACTION`.

Must not conclude:

- No bank approval.
- No actual refinancing proof.
- No ownership conclusion.

### C. Family-transfer image/message provenance

Family-transfer image/message provenance is usually `PRIVATE_REVIEW_ONLY` or `SUMMARY_ONLY`.

Must not conclude:

- Not bank/export proof.
- No gift/loan/contribution characterization.

### D. Counterparty protocol

Counterparty protocol must use layer-separated summary only.

Must not conclude:

- Counterparty admission is not legal conclusion.
- Counterparty denial is not factual negation.
- No credibility finding.

### E. Formal register/title/pant

Formal register/title/pant can be `READY_AFTER_REDACTION` as formal context.

Must not conclude:

- Formal title is not hidden-co-ownership conclusion.
- Formal title is not proof against hidden co-ownership by itself.

### F. Tax/source-status documents

Tax/source-status documents are usually `SUMMARY_ONLY` or `PRIVATE_REVIEW_ONLY`.

Must not include:

- private links/tokens
- personal identifiers
- raw URLs

## External Use Forbidden Unless Ombud-Approved

The following should not be used externally unless human/ombud approves:

- raw full message exports
- raw 2025-type post-dispute exports
- identity images
- raw bank transfer confirmations
- private tax URLs/tokens
- source extracts containing unrelated intimate/medical/psychological content
- counterparty protocol broad quotations
- internal working-ledger labels
- local context handoffs
- private source packages
- private worksheets

## Required Package Files

Future external-use preparation packages should include:

- `EXTERNAL_USE_CLASSIFICATION_TABLE.md`
- `OMBUD_REVIEW_QUEUE.md`
- `STRICT_REDACTION_PLAN.md`
- `SUMMARY_ONLY_SOURCE_ROWS.md`
- `PRIVATE_REVIEW_ONLY_SOURCE_ROWS.md`
- `DO_NOT_USE_EXTERNALLY.md`
- `SAFE_PUBLIC_SUMMARY_DRAFT.md`
- `NO_CONCLUSION_BOUNDARY.md`

## Required Pass Criteria

A package passes this gate only if:

- every source row has external-use classification
- every row has redaction level
- every row has ombud-review flag
- every row has must-not-conclude boundary
- private identifiers are not present
- raw source paths are not present
- private URLs/tokens are not present
- full private addresses are not present
- account/payment identifiers are not present
- unrelated intimate/medical/psychological/family-conflict material is excluded
- source references are not treated as proof
- core-review does not become send-as-is
- supporting-review does not become legal argument
- no final submission text is generated

## Failure Modes

Failures include:

- treating `CORE_REVIEW` as external-ready
- sharing private review package as-is
- quoting raw message export broadly
- including identity image details
- including transaction IDs or account numbers
- preserving private URLs/tokens
- treating counterparty protocol as neutral truth
- treating formal register as legal conclusion
- turning supporting signal into ownership argument
- omitting ombud-review gate
- omitting no-conclusion boundary
- generating final submission text

## Relation To Prior Safeguards

The lifecycle recall sweep finds signals.

The signal preservation boundary keeps them concrete.

The anonymized stress test exercises both.

The counterparty/formal matrix separates factual admissions, legal positions, formal records, and source references.

The external-use gate decides what can leave private review and in what form.

Source references are not proof.

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

## Privacy Rule

Generated external-use summaries must not include:

- raw phone-number filenames
- transaction IDs
- transfer references
- account numbers
- IBAN/BIC
- CPR/personnummer
- full private addresses
- private URLs/tokens
- private bank identifiers
- raw email addresses unless reviewed and necessary
- identity document details
- signatures unless approved
- unrelated intimate, medical, psychological, or family-conflict material
- private case identifiers

## Human-Review Boundary

This gate supports:

- human source/provenance review
- redaction planning
- ombud review preparation
- safe public summary drafting at a generic level
- possible later human-drafted submission planning

It must not convert review readiness into external-use readiness by default.
