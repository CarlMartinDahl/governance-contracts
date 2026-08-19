# Data-Handling And Private-Pilot Readiness Boundary

## Status

Contract name: `DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY`.

Status: `DOCS_ONLY`.

Purpose: freeze a narrow product-doc boundary for synthetic or sanitized private pilot planning readiness while preserving unresolved data-handling questions, no-raw output, marker/pointer/review-route language, and human/professional review as the release gate.

This document is documentation only.

It does not create runtime behavior.

It does not create schema changes.

It does not create API behavior.

It does not implement package intake or source processing.

It does not authorize a real large-source private run.

It does not authorize processing the actual 1.8 GB source package.

It does not authorize raw message, image, screenshot, or metadata inspection.

It does not authorize external-use readiness.

It does not select a product candidate.

It does not inspect or authorize inspection of raw source material.

## Core Rule

`DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY`.

This boundary governs readiness for synthetic or sanitized private pilot planning only.

Allowed readiness status:

- `SYNTHETIC_OR_SANITIZED_PILOT_PLANNING_ONLY`
- `REAL_LARGE_SOURCE_RUN_NOT_AUTHORIZED`
- `DATA_HANDLING_UNKNOWN_NOT_BYPASSED`
- `THIRD_PARTY_MODEL_STATUS_UNKNOWN_NOT_BYPASSED`
- `RAW_MATERIAL_ROUTING_NOT_AUTHORIZED`
- `MARKER_POINTER_ONLY`
- `NO_RAW_OUTPUT`
- `HUMAN_PROFESSIONAL_REVIEW_REQUIRED`
- `VALIDATION_WITHOUT_CONCLUSION`

A synthetic or sanitized pilot may use only non-raw, non-private, non-identifying, synthetic or sanitized material.

Pilot output must use marker, pointer, and review-route language only.

Pilot output must remain validation without conclusion.

## Data-Handling Unknowns

The following data-handling items remain unresolved unless later live repo evidence or separately approved process resolves them:

- retention
- encryption
- audit logs
- deletion
- role permissions
- raw-material routing
- third-party model/API status
- access control beyond documented route/case-access behavior

These unknowns must not be bypassed by synthetic or sanitized pilot planning.

If data-handling unknowns are unresolved, the model must not escalate from synthetic or sanitized pilot planning to real private source processing.

If third-party model/API status is unknown, the model must not authorize raw or private material routing to that model/API.

If retention, deletion, encryption, audit-log status, role permissions, or raw-material routing status is unknown, the model must mark the item as unresolved and stop before real-run authorization.

## No-Raw Pilot Output

Pilot output must not include:

- raw replay
- raw messages
- private facts
- source locators
- filenames
- private paths
- page references
- URLs/tokens
- sensitive dates
- medical details
- intimate details
- child details
- third-party details

Pilot planning must not authorize raw message, image, screenshot, metadata, package, or source inspection.

## Required Pilot Safeguards

The synthetic or sanitized pilot path must preserve:

- text-primary first
- no raw by default
- source-universe declaration
- counter-context preservation
- privacy blockers
- unresolved pointer fail-closed behavior
- layer conflict fail-closed behavior
- human/professional review gate

These safeguards are inherited only as boundary constraints from the already frozen trauma-minimizing layered source navigation boundary. They do not authorize real private source processing.

## Integrity Boundary

Hash, manifest, ZIP, table, checksum, and package integrity signals are process and reproducibility context only.

Hash, manifest, ZIP, table, checksum, and package integrity must not be treated as truth proof, legal proof, clinical proof, evidentiary proof, credibility proof, or authorization to process raw material.

## Forbidden Statuses And Conclusions

Blocked statuses and phrases:

- `REAL_SOURCE_RUN_AUTHORIZED`
- `RAW_MATERIAL_APPROVED`
- `EXTERNAL_USE_READY`
- `PRODUCT_CANDIDATE_SELECTED`
- `LEGAL_CONCLUSION`
- `CLINICAL_CONCLUSION`
- `EVIDENTIARY_CONCLUSION`
- `VICTIM_CONFIRMED`
- `PERPETRATOR_CONFIRMED`
- `RISK_SCORE`
- `SUFFICIENCY_SCORE`
- `POLICE_REPORT_READY`
- `PLEADING_READY`

Pilot output must not create legal, clinical, evidentiary, credibility, victim-status, perpetrator-status, offence, ownership, risk, sufficiency, police-report, pleading, external-use, diagnosis, trauma-diagnosis, or product-candidate conclusions.

## Human Review Boundary

Human/professional review remains the release gate.

Synthetic or sanitized private pilot planning may organize governance readiness and unresolved prerequisites.

Synthetic or sanitized private pilot planning does not replace human/professional review.

Synthetic or sanitized private pilot planning does not authorize external use.

Synthetic or sanitized private pilot planning does not authorize product-candidate selection.

## Scope Separation

This boundary does not reopen:

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
- product-candidate selection

Adjacent Gate-001 no-raw, trauma-informed acknowledgement, technical verification appendix, trauma-minimizing layered source navigation, professional-review-only, and external-use redaction boundaries may be used only as comparison evidence. They do not authorize real source inspection, runtime implementation, schema implementation, API implementation, external-use readiness, real large-source private run, or product-candidate selection.
