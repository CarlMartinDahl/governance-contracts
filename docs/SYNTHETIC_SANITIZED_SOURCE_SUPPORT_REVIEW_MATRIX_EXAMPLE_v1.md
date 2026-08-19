# Synthetic/Sanitized Source-Support Review Matrix Example

## Status

Example name: `SYNTHETIC_SANITIZED_SOURCE_SUPPORT_REVIEW_MATRIX_EXAMPLE`.

Status: `DOCS_ONLY`.

Purpose: freeze a standalone synthetic/sanitized source-support review matrix example using only placeholder rows from the already frozen `SYNTHETIC_SANITIZED_SOURCE_SUPPORT_REVIEW_MATRIX_PILOT_TEMPLATE` and row fields from `SOURCE_PERIOD_LAYERED_REVIEW_SUPPORT_MATRIX_BOUNDARY`.

This document is documentation only.

It does not create runtime behavior.

It does not create schema changes.

It does not create API behavior.

It does not implement package intake or source processing.

It does not create a real source review matrix.

It is not an evidence/proof matrix.

It does not authorize source package, PDF, image, screenshot, metadata, or original source inspection.

It does not authorize a real large-source private run.

It does not authorize external-use readiness.

It does not select a product candidate.

## Core Rule

`SYNTHETIC_SANITIZED_SOURCE_SUPPORT_REVIEW_MATRIX_EXAMPLE`.

This example is a synthetic/sanitized example matrix only.

It must use synthetic placeholder values only.

It must not use real raw text, private facts, exact dates, source locators, source filenames, absolute paths, page references, URLs/tokens, PDF content, image content, screenshot content, metadata content, source package content, or sensitive event details.

It must not use actual material from the user's five-year source set.

The example demonstrates marker, pointer, review-route, blocker, unresolved, fail-closed, and validation-without-conclusion language only.

The example preserves text-primary-first review and sanitized period buckets or chunk-period labels only.

## Required Row Fields

The example uses the exact row fields from `SOURCE_PERIOD_LAYERED_REVIEW_SUPPORT_MATRIX_BOUNDARY` and the frozen pilot template:

- `chunk_id`
- `chunk_period_bucket`
- `text_marker_id`
- `marker_family`
- `neutral_review_signal`
- `text_layer_status`
- `clean_pdf_pointer_status`
- `original_media_metadata_pointer_status`
- `source_universe_status`
- `counter_context_status`
- `privacy_blocker_status`
- `unresolved_pointer_status`
- `layer_conflict_status`
- `human_professional_review_status`
- `validation_without_conclusion_status`
- `forbidden_inference_guard`
- `matrix_row_status`

These fields are sanitized workflow fields only.

They must not contain raw excerpts, private facts, exact dates, source locators, source filenames, absolute paths, page references, URLs/tokens, PDF content, image content, screenshot content, metadata content, source package content, or sensitive event details.

## Allowed Statuses Demonstrated

The example uses only these allowed statuses:

- `TEXT_MARKER_PRESENT`
- `REVIEW_ROUTE_OPENED`
- `PDF_POINTER_PENDING`
- `PDF_POINTER_UNRESOLVED`
- `ORIGINAL_MEDIA_METADATA_NOT_OPENED_BY_DEFAULT`
- `ORIGINAL_MEDIA_METADATA_REVIEW_NEEDED`
- `SOURCE_LAYER_NOT_SEARCHED_BY_SCOPE`
- `COUNTER_CONTEXT_REQUIRED`
- `PRIVACY_BLOCKER`
- `LAYER_CONFLICT_FAIL_CLOSED`
- `HUMAN_PROFESSIONAL_REVIEW_REQUIRED`
- `VALIDATION_WITHOUT_CONCLUSION`

Clean PDF pointer statuses are demonstrated without opening any PDF.

Original media/metadata pointer statuses are demonstrated without opening any image, screenshot, metadata, source package, or original source material.

## Synthetic Example Matrix

The following rows are synthetic placeholders only. They are not real source review rows.

| chunk_id | chunk_period_bucket | text_marker_id | marker_family | neutral_review_signal | text_layer_status | clean_pdf_pointer_status | original_media_metadata_pointer_status | source_universe_status | counter_context_status | privacy_blocker_status | unresolved_pointer_status | layer_conflict_status | human_professional_review_status | validation_without_conclusion_status | forbidden_inference_guard | matrix_row_status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `chunk_001` | `PERIOD_BUCKET_001` | `TEXT_MARKER_SYNTHETIC_001` | `MARKER_FAMILY_SYNTHETIC_A` | `NEUTRAL_REVIEW_SIGNAL_SYNTHETIC` | `TEXT_MARKER_PRESENT` | `PDF_POINTER_PENDING` | `ORIGINAL_MEDIA_METADATA_NOT_OPENED_BY_DEFAULT` | `SOURCE_LAYER_NOT_SEARCHED_BY_SCOPE` | `COUNTER_CONTEXT_REQUIRED` | `PRIVACY_BLOCKER` | `PDF_POINTER_UNRESOLVED` | `LAYER_CONFLICT_FAIL_CLOSED` | `HUMAN_PROFESSIONAL_REVIEW_REQUIRED` | `VALIDATION_WITHOUT_CONCLUSION` | `NO_PROOF_NO_CONCLUSION` | `REVIEW_ROUTE_OPENED` |
| `chunk_002` | `PERIOD_BUCKET_002` | `TEXT_MARKER_SYNTHETIC_002` | `MARKER_FAMILY_SYNTHETIC_B` | `NEUTRAL_REVIEW_SIGNAL_SYNTHETIC` | `TEXT_MARKER_PRESENT` | `PDF_POINTER_UNRESOLVED` | `ORIGINAL_MEDIA_METADATA_NOT_OPENED_BY_DEFAULT` | `SOURCE_LAYER_NOT_SEARCHED_BY_SCOPE` | `COUNTER_CONTEXT_REQUIRED` | `PRIVACY_BLOCKER` | `PDF_POINTER_UNRESOLVED` | `LAYER_CONFLICT_FAIL_CLOSED` | `HUMAN_PROFESSIONAL_REVIEW_REQUIRED` | `VALIDATION_WITHOUT_CONCLUSION` | `NO_PROOF_NO_CONCLUSION` | `REVIEW_ROUTE_OPENED` |
| `chunk_003` | `PERIOD_BUCKET_003` | `TEXT_MARKER_SYNTHETIC_003` | `MARKER_FAMILY_SYNTHETIC_C` | `NEUTRAL_REVIEW_SIGNAL_SYNTHETIC` | `TEXT_MARKER_PRESENT` | `PDF_POINTER_PENDING` | `ORIGINAL_MEDIA_METADATA_REVIEW_NEEDED` | `SOURCE_LAYER_NOT_SEARCHED_BY_SCOPE` | `COUNTER_CONTEXT_REQUIRED` | `PRIVACY_BLOCKER` | `PDF_POINTER_UNRESOLVED` | `LAYER_CONFLICT_FAIL_CLOSED` | `HUMAN_PROFESSIONAL_REVIEW_REQUIRED` | `VALIDATION_WITHOUT_CONCLUSION` | `NO_PROOF_NO_CONCLUSION` | `REVIEW_ROUTE_OPENED` |

The placeholder values above are generic and non-identifying.

They do not represent real events, real messages, real people, real source files, exact dates, page references, URLs/tokens, PDF content, image content, screenshot content, metadata content, or source package content.

## Blocked / Must-Not-Use Statuses

The following statuses are blocked and must not be used as example matrix row outcomes:

- `PROOF_FOUND`
- `ABUSE_CONFIRMED`
- `VICTIM_CONFIRMED`
- `PERPETRATOR_CONFIRMED`
- `LEGAL_RELEVANCE_CONFIRMED`
- `EVIDENCE_SUFFICIENT`
- `RISK_SCORE`
- `SUFFICIENCY_SCORE`
- `EXTERNAL_USE_READY`
- `PRODUCT_CANDIDATE_SELECTED`

These blocked statuses are listed only as must-not-use statuses.

## Non-Proof And No-Raw Rules

Metadata, timestamps, read receipts, repetition, silence, filenames, page positions, source-layer proximity, period overlap, and chunk proximity are not proof.

Chunks are not proof.

The example must not turn marker presence, marker repetition, chunk proximity, period overlap, source-layer proximity, source-universe declarations, pointer status, privacy blockers, unresolved pointers, or layer conflicts into proof.

The example must not emit raw source material by default or by example.

## Source-Universe, Context, Privacy, And Fail-Closed Rules

The example preserves source-universe status.

The example preserves counter-context status.

The example preserves privacy blocker status.

The example preserves unresolved pointer fail-closed status.

The example preserves layer conflict fail-closed status.

If a synthetic text marker cannot be mapped to a clean PDF pointer, the example must mark the pointer unresolved and must not infer content.

If a synthetic clean PDF pointer cannot be mapped to original media/metadata, the example must mark the pointer unresolved and must not infer content.

If synthetic layers conflict, the example must fail closed and require human/professional review.

Human/professional review remains the release gate.

Validation-without-conclusion remains required.

## Readiness Boundary

Real large-source private run remains unauthorized.

PDF, image, screenshot, metadata, source package, and original source inspection remain unauthorized.

Data-handling unknowns remain unresolved and not bypassed.

Raw output remains unauthorized.

External-use remains unauthorized.

Product candidate remains none.

## Forbidden Conclusions

The example must not create legal, clinical, evidentiary, case-truth, credibility, victim-status, perpetrator-status, offence, ownership, risk, sufficiency, police-report, pleading, external-use, diagnosis, trauma-diagnosis, or product-candidate conclusions.

## Scope Separation

This example does not reopen:

- `SWE_BODELNING`
- `DK_PSYKISK_VOLD` offence modelling
- `SWE_PSYKISKT_VALD` legal modelling
- Nordic comparison
- runtime behavior
- schemas
- API behavior
- package implementation
- external-use readiness
- real large-source private run
- PDF/image/metadata/source inspection
- product-candidate selection
