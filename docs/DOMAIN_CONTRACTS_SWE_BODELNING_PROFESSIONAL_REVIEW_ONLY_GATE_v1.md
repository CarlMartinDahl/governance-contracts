# SWE_BODELNING Professional Review Only Gate

## Status

Contract name: `SWE_BODELNING` professional-review-only gate.

Status: `DOCS_ONLY`.

Purpose: freeze a documentation-only product boundary that keeps `SWE_BODELNING` evidence-readiness, external-use, and share-candidate outputs directed to ombud, advokater, jurister, or other human legal reviewers.

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

It does not create a self-represented filing tool.

It does not implement `actual_swedish_samaganderatt_decision_logic`.

It contains no private facts and no private-case application.

## Purpose

The model is professional-review-facing.

It may organize evidence-readiness material for ombud, advokater, jurister, or other human legal reviewers, but it must not become a self-represented filing tool.

The purpose of this gate is to prevent a lack of currently available ombud from lowering review, redaction, or no-conclusion boundaries.

## Core Rule

`PROFESSIONAL_REVIEW_ONLY`.

`NO_OMBUD_PRESENT` does not change model scope.

A user lacking ombud must not cause:

- lower redaction gates
- direct filing recommendations
- final submission drafting
- legal strategy advice
- ownership determination
- sufficiency scoring
- credibility findings
- `actual_swedish_samaganderatt_decision_logic`

## Role Separation

The model may support:

- source/provenance organization
- review-readiness classification
- redaction planning
- ombud-review preparation
- safe question lists for professional review
- no-conclusion summaries

The model must not provide:

- legal advice
- direct filing instruction
- final legal argument
- litigation strategy
- ownership outcome
- proof conclusion
- evidentiary sufficiency score
- credibility finding
- final submission text

## Required Status Labels

Future professional-review and share-candidate work must preserve these labels where relevant:

- `PROFESSIONAL_REVIEW_ONLY`
- `OMBUD_REVIEW_REQUIRED`
- `HUMAN_LEGAL_REVIEW_REQUIRED`
- `NOT_SELF_REPRESENTED_FILING`
- `NO_OMBUD_PRESENT_SCOPE_UNCHANGED`
- `DIRECT_EXTERNAL_USE_BLOCKED`
- `SHARE_CANDIDATE_REQUIRES_PROFESSIONAL_APPROVAL`
- `CLEAN_SUMMARY_NOT_FINAL_SUBMISSION`
- `PRIVATE_REVIEW_NOT_EXTERNAL_USE`

## Share-Candidate Rule

A share-candidate package is not a filing package.

A clean ombud cover summary is not a self-represented submission.

Any share candidate remains:

- review-only
- not final
- not legal advice
- not proof
- not ownership determination
- not sufficiency assessment
- subject to professional/human approval

Required status posture:

- `SHARE_CANDIDATE_REQUIRES_PROFESSIONAL_APPROVAL`
- `CLEAN_SUMMARY_NOT_FINAL_SUBMISSION`
- `DIRECT_EXTERNAL_USE_BLOCKED`
- `PRIVATE_REVIEW_NOT_EXTERNAL_USE`

## No-Ombud Rule

If the user lacks ombud, outputs must remain in professional-review posture.

The model may say:

- seek professional review if possible
- use this only as private organization
- do not treat as final filing
- do not submit raw materials without redaction and review

The model must not say:

- file this as-is
- use this as legal argument
- this proves ownership
- this is sufficient evidence
- this is how you should litigate the case

Required status posture:

- `NO_OMBUD_PRESENT_SCOPE_UNCHANGED`
- `NOT_SELF_REPRESENTED_FILING`
- `OMBUD_REVIEW_REQUIRED`
- `HUMAN_LEGAL_REVIEW_REQUIRED`

## Relation To Prior Safeguards

The lifecycle recall sweep finds signals.

The redacted review signal preservation boundary keeps them concrete.

The anonymized stress test exercises those behaviors.

The counterparty/formal matrix separates facts, positions, formal records, and source references.

The external-use redaction gate decides what can leave private review and in what form.

The professional-review-only gate ensures all outputs remain for ombud/jurist/human legal review rather than self-represented filing.

## Required Package Language

Future clean cover or share-candidate packages should state:

“This material is prepared for professional/human legal review. It is not a legal submission, not final filing text, not legal advice, not proof, and not an ownership determination.”

This required language is a boundary statement. It is not runtime behavior, not a schema object, and not legal advice.

## Forbidden Outputs

The professional-review-only gate forbids:

- proof of hidden co-ownership
- ownership determination
- legal advice
- evidentiary sufficiency scoring
- credibility finding
- final submission drafting
- direct self-represented filing instruction
- litigation strategy
- runtime decision logic
- `actual_swedish_samaganderatt_decision_logic`
- psychological-violence blending
- DK/SWE comparison
- Nordic comparison

## Privacy Rule

This gate preserves the existing privacy rules.

Generated professional-review, clean-cover, or share-candidate material must not include:

- raw phone-number filenames
- transaction IDs
- account numbers
- IBAN/BIC
- CPR/personnummer
- full private addresses
- private URLs/tokens
- private bank identifiers
- raw email addresses unless reviewed
- identity document details
- signatures unless approved
- unrelated intimate/medical/psychological/family-conflict material
- private case identifiers

The privacy rule applies even when a user lacks ombud.

## Pass Criteria

A future package passes this gate only if:

- it is explicitly `PROFESSIONAL_REVIEW_ONLY`
- it marks ombud or human legal review as required where external sharing is contemplated
- it treats clean summaries as review material rather than final filing text
- it keeps private review distinct from external use
- it blocks direct external use unless professional/human approval is present
- it preserves no-conclusion boundaries
- it does not lower redaction gates because `NO_OMBUD_PRESENT`
- it does not generate final submission text
- it does not create a self-represented filing workflow

## Failure Modes

Failures include:

- treating no ombud as permission to draft final filing text
- treating a share candidate as a filing package
- treating a clean ombud cover summary as a self-represented submission
- giving direct filing instructions
- giving legal strategy advice
- turning review classifications into ownership argument
- turning source references into proof
- scoring evidentiary sufficiency
- making credibility findings
- omitting `OMBUD_REVIEW_REQUIRED`
- omitting `HUMAN_LEGAL_REVIEW_REQUIRED`
- omitting no-conclusion boundaries
- weakening privacy/redaction rules because professional review is not yet available
