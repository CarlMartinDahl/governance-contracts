# SWE_BODELNING_DOLD_SAMAGANDERATT Source-Backed Material Classification Gate

## Status

This document is a DOCS_ONLY source-backed material classification gate only.

It defines a source-status gate for `SWE_BODELNING_DOLD_SAMAGANDERATT`.

It classifies material before it may be used in the core evidence dossier.

It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, proof of any requisite, or ownership conclusions.

## Purpose

This source-backed material classification gate exists to:

- define a source-status gate for `SWE_BODELNING_DOLD_SAMAGANDERATT`
- classify material before it may be used in the core evidence dossier
- preserve the principle that source-backed material is different from party assertion, counterparty assertion, working memo, hypothesis, unverified lead, and source-integrity concern
- preserve the boundary that this gate does not decide issue relevance beyond source-status classification
- preserve the boundary that this gate does not route side-tracks, create rebuttal matrices, or decide whether any evidence proves a requisite
- preserve the no sufficiency / no conclusion / no implementation boundary
- prepare for later domain contract work without implementing doctrine, schema, runtime, semantic-fact mapping, or decision logic

## Prior Closed Prerequisites

- The `SWE_BODELNING_DOLD_SAMAGANDERATT` boundary/prerequisite freeze is closed at `1a6d6c6`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` legal/source inventory contract is closed at `6fa0a4a`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` neutral evidence dossier scaffold is closed at `625e538`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` doctrine/requisite label scaffold is closed at `ed13c92`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` evidence-to-label boundary scaffold is closed at `93edca0`.

This source-status gate builds on those contracts but does not supersede them.

runtime/schema/semantic-fact mapping remains blocked

actual_swedish_samaganderatt_decision_logic remains excluded/not implemented

## Existing SWE_BODELNING Context

Existing `SWE_BODELNING` lane keys are context only:

- `economic_contribution`
- `shared_use`
- `shared_intent`

These lane keys are not treated as implemented hidden co-ownership decision logic,
source-status classification, sufficiency scoring, or proof that any requisite is satisfied.

They may provide vocabulary context for later reviewed work, but they do not create
`SWE_BODELNING_DOLD_SAMAGANDERATT` source-status classification behavior.

## Source-Status Classifications

The following classifications are neutral source-status classifications only:

- `VERIFIED_SOURCE_ARTIFACT`
- `EXTRACTED_SOURCE_EXCERPT`
- `SUBMITTED_PARTY_POSITION`
- `COUNTERPARTY_POSITION`
- `WORKING_MEMO_ONLY`
- `HYPOTHESIS_ONLY`
- `UNVERIFIED_SOURCE_LEAD`
- `SOURCE_INTEGRITY_CONCERN`
- `MANUAL_REVIEW_REQUIRED`
- `CORE_DOSSIER_USE_BLOCKED_UNTIL_SOURCE_BACKED`

These classifications are not schema fields, runtime classes, semantic-fact mappings,
legal conclusions, issue relevance determinations, or sufficiency determinations.

## Classification Rules

- VERIFIED_SOURCE_ARTIFACT may identify a source-backed artifact, such as a bank receipt, email with header, registered document, authority document, original export, or other reviewable source artifact.
- EXTRACTED_SOURCE_EXCERPT may identify text or excerpt taken from a source-backed artifact, but it must remain linked to that artifact.
- SUBMITTED_PARTY_POSITION identifies submitted party’s submitted position, not truth by itself.
- COUNTERPARTY_POSITION identifies counterparty’s submitted or recorded counterparty position, not truth by itself.
- WORKING_MEMO_ONLY identifies working memo material or working notes, not verified proof.
- HYPOTHESIS_ONLY identifies a theory, interpretation, or legal question, not verified proof.
- UNVERIFIED_SOURCE_LEAD identifies a lead without sufficient documentary/source support.
- SOURCE_INTEGRITY_CONCERN identifies alleged deletion, editing, alteration, or source-integrity issue that requires technical/source verification.
- MANUAL_REVIEW_REQUIRED identifies material that cannot safely enter core use without human legal/product review.
- CORE_DOSSIER_USE_BLOCKED_UNTIL_SOURCE_BACKED identifies material that must not support the core evidence dossier unless linked to a source artifact or extracted source excerpt.

## Specific Example Handling

working memo material is WORKING_MEMO_ONLY unless linked to source artifacts or extracted source excerpts

counterparty’s statements are COUNTERPARTY_POSITION and not truth by themselves

submitted party’s responses are SUBMITTED_PARTY_POSITION and not truth by themselves

reported telephone confirmation without written support is UNVERIFIED_SOURCE_LEAD

alleged message deletion/editing without technical or source verification is SOURCE_INTEGRITY_CONCERN

working memo content must not be treated as verified evidence

unverified leads must not be treated as core evidence

party assertions must not be treated as truth

counterparty assertions must not be treated as truth

## Core Dossier Use Rule

core claims must link to VERIFIED_SOURCE_ARTIFACT or EXTRACTED_SOURCE_EXCERPT

Submitted party positions may explain what submitted party argues, but they do not by themselves prove the underlying fact.

Counterparty positions may explain what counterparty argues, but they do not by themselves prove the underlying fact.

Working memos may preserve leads and issue hypotheses, but they do not by themselves support the core evidence dossier.

Hypotheses may guide follow-up, but they do not enter the core dossier as evidence.

Unverified source leads are blocked from core dossier use until source-backed.

Source integrity concerns require manual/technical verification before use.

This gate does not decide legal relevance, sufficiency, issue merits, or ownership.

## Manual-Review Gates

The following manual-review gates remain unresolved for this source-status gate:

- uncertain source status
- missing source artifact
- reported telephone confirmation
- alleged deletion/editing or source-integrity issue
- conflict/person material proposed for core dossier use
- borderline party/counterparty assertion
- working memo content proposed for core dossier use
- any attempt to use a classification as proof of a requisite
- any attempt to use a classification as legal conclusion

Material reaching these gates must remain manual-review-required rather than being
treated as core proof.

## Relationship To Prior Domain Layers

The source-status gate supports the neutral evidence dossier scaffold by deciding source-status before core dossier use.

The source-status gate supports the evidence-to-label boundary by ensuring only source-backed material can support core evidence organization.

The source-status gate does not replace the dossier scaffold.

The source-status gate does not replace the doctrine/requisite label scaffold.

The source-status gate does not replace the evidence-to-label boundary.

It must not create new dossier sections, issue-relevance routing, side-track workflow, schema types, runtime classes, or semantic facts.

## Negative Boundaries

This source-backed material classification gate does not implement or authorize:

- full evidence discipline / issue relevance gate
- issue relevance routing workflow
- side-track/quarantine workflow
- counterparty rebuttal matrix
- bohag/lösöre workflow
- submitted package workflow
- full doctrine contract
- final ownership determination
- legal advice
- legal decision logic
- `actual_swedish_samaganderatt_decision_logic`
- evidentiary sufficiency scoring
- proof that any requisite is satisfied
- proof that any requisite is not satisfied
- case outcome prediction
- process pleading generation
- runtime implementation
- schema behavior changes
- semantic-fact mapping
- automatic legal conclusions from digital material
- treating working memo content as verified evidence
- treating unverified leads as core evidence
- treating party assertions as truth
- treating counterparty assertions as truth
- resolving source-integrity concerns without verification
- Swedish psychological violence track blending
- Danish psychological violence track blending
- general bodelning decision engine
- governance helper-level freeze continuation
- database/API/route behavior
- generated artifact behavior

## Candidate-Shape Guard

This is a source-backed material classification gate only.

It is not the full evidence discipline / issue relevance gate.

It is not issue relevance routing.

It is not a side-track/quarantine workflow.

It is not a counterparty rebuttal matrix.

It is not a bohag/lösöre workflow.

It is not a submitted package workflow.

It is not a full doctrine contract.

It is not schema-first work.

It is not runtime implementation.

It is not semantic-fact mapping.

It is not legal decision logic.

It must not determine whether hidden co-ownership exists in any case.

It must not infer legal conclusions from digital material.

It must not score sufficiency.

It must not classify any requisite as satisfied or not satisfied.
