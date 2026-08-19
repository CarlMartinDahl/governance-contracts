# SWE_BODELNING_DOLD_SAMAGANDERATT Issue Relevance Gate

## Status

This document is a DOCS_ONLY issue relevance gate only.

It defines an issue relevance gate for `SWE_BODELNING_DOLD_SAMAGANDERATT`.

It classifies already source-backed material by issue area before it may be placed in the hidden-co-ownership core dossier.

It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, proof of any requisite, or ownership conclusions.

## Purpose

This issue relevance gate exists to:

- define an issue relevance gate for `SWE_BODELNING_DOLD_SAMAGANDERATT`
- classify already source-backed material by issue area before it may be placed in the hidden-co-ownership core dossier
- preserve the distinction between source-status classification and issue relevance classification
- preserve the rule that source-backed does not mean core-relevant
- preserve the rule that core-relevant does not mean legally proven
- preserve the rule that issue placement is not legal conclusion
- preserve the rule that bohag/lösöre remains a separate bodelning side-track
- preserve the rule that access/safety/contact statements do not contaminate the hidden-co-ownership core unless separately source-backed and issue-linked
- prepare for later domain contract work without implementing doctrine, schema, runtime, semantic-fact mapping, or decision logic

## Prior Closed Prerequisites

- The `SWE_BODELNING_DOLD_SAMAGANDERATT` boundary/prerequisite freeze is closed at `1a6d6c6`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` legal/source inventory contract is closed at `6fa0a4a`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` neutral evidence dossier scaffold is closed at `625e538`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` doctrine/requisite label scaffold is closed at `ed13c92`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` evidence-to-label boundary scaffold is closed at `93edca0`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` source-backed material classification gate is closed at `4a20f9f`.

This issue relevance gate builds on those contracts but does not supersede them.

runtime/schema/semantic-fact mapping remains blocked

actual_swedish_samaganderatt_decision_logic remains excluded/not implemented

## Source-Status Precondition

Issue relevance classification applies only after source-status classification.

Source-status classification answers what kind of source material is present.

Issue relevance classification answers where source-backed material may belong in the matter.

Material that is not source-backed remains controlled by the source-status gate and must not be placed in the hidden-co-ownership core merely by issue label.

## Existing SWE_BODELNING Context

Existing `SWE_BODELNING` lane keys are context only:

- `economic_contribution`
- `shared_use`
- `shared_intent`

These lane keys are not treated as implemented hidden co-ownership decision logic,
issue relevance classification, sufficiency scoring, or proof that any requisite is satisfied.

They may provide vocabulary context for later reviewed work, but they do not create
`SWE_BODELNING_DOLD_SAMAGANDERATT` issue relevance classification behavior.

## Issue Relevance Classifications

The following classifications are neutral issue-area classifications only:

- `HIDDEN_CO_OWNERSHIP_CORE`
- `ACQUISITION_FINANCING_CORE`
- `PARTY_INTENT_CORE`
- `DOCUMENTED_ECONOMIC_CONTRIBUTION_CORE`
- `COUNTERPARTY_POSITION_CONTEXT`
- `BODELNING_SIDE_TRACK`
- `BOHAG_LOSORE_SIDE_TRACK`
- `PROPERTY_ACCESS_RETRIEVAL_LOGISTICS`
- `WORKING_MEMO_FOLLOW_UP`
- `OFF_CORE_CONFLICT_PERSON_MATERIAL`
- `MANUAL_REVIEW_REQUIRED`
- `EXCLUDED_FROM_HIDDEN_CO_OWNERSHIP_CORE`

These classifications are not schema fields, runtime classes, semantic-fact mappings,
legal conclusions, issue merits determinations, or sufficiency determinations.

## Classification Rules

- HIDDEN_CO_OWNERSHIP_CORE may be used only for material issue-linked to the hidden-co-ownership core.
- ACQUISITION_FINANCING_CORE may be used for source-backed material about acquisition, financing, financing-chain context, or acquisition-related debt/loan structure.
- PARTY_INTENT_CORE may be used for source-backed material about party intent or shared project context.
- DOCUMENTED_ECONOMIC_CONTRIBUTION_CORE may be used for source-backed material about documented economic contributions.
- COUNTERPARTY_POSITION_CONTEXT may be used for counterparty's counterparty positions when they address acquisition, financing, intent, contribution, ownership-position context, or related core questions.
- BODELNING_SIDE_TRACK may be used for bodelning-relevant material that is not hidden-co-ownership core.
- BOHAG_LOSORE_SIDE_TRACK may be used for bohag/lösöre material and must remain separate from the hidden-co-ownership core.
- PROPERTY_ACCESS_RETRIEVAL_LOGISTICS may be used for property pickup, access, key, retrieval, contact, or safety logistics.
- WORKING_MEMO_FOLLOW_UP may be used for working memo follow-up items that are not yet placed in a core or side-track category.
- OFF_CORE_CONFLICT_PERSON_MATERIAL may be used for personal/conflict material without a source-backed issue link to the bodelning matter.
- MANUAL_REVIEW_REQUIRED may be used when issue placement is ambiguous, mixed, or risks legal/sufficiency inference.
- EXCLUDED_FROM_HIDDEN_CO_OWNERSHIP_CORE may be used for material that must not enter the hidden-co-ownership core.

## Core/Side-Track Boundary Rules

source-backed does not equal core-relevant

core-relevant does not equal legally proven

issue placement is not legal conclusion

issue placement is not proof of any requisite

issue placement must not rank evidentiary sufficiency

access/logistics material must not enter hidden-co-ownership core unless separately source-backed and issue-linked

conflict/person material must not enter hidden-co-ownership core unless separately source-backed and issue-linked

bohag/lösöre-only material must remain side-track

general bodelning-only material not tied to hidden co-ownership must remain side-track

working memo/follow-up material must not enter hidden-co-ownership core without source-backed issue classification

counterparty statements about acquisition, financing, intent, contribution, or ownership-position context may be COUNTERPARTY_POSITION_CONTEXT

counterparty statements about access/conflict/logistics must stay in access/logistics or off-core classification unless manually reviewed

## Manual-Review Gates

The following manual-review gates remain unresolved for this issue relevance gate:

- ambiguous issue area
- mixed source-backed/conflict material
- access/safety/contact statements proposed for hidden-co-ownership core use
- bohag/lösöre material proposed for hidden-co-ownership core use
- counterparty statements with unclear issue linkage
- working memo/follow-up material proposed for core use
- any attempted legal inference from issue placement
- any attempted sufficiency inference from issue placement
- any attempted ownership inference from issue placement
- any attempt to use issue placement as proof that a requisite is satisfied or not satisfied

Material reaching these gates must remain manual-review-required rather than being
treated as core proof, legal relevance, legal sufficiency, or ownership determination.

## Relationship To Prior Domain Layers

The issue relevance gate supports the source-status gate by adding issue-area placement after source-status classification.

The issue relevance gate supports the neutral evidence dossier scaffold by determining whether material belongs in the hidden-co-ownership core or an adjacent bucket.

The issue relevance gate supports the evidence-to-label boundary by preventing source-backed but off-core material from contaminating core evidence-label organization.

The issue relevance gate does not replace the source-status gate.

The issue relevance gate does not replace the dossier scaffold.

The issue relevance gate does not replace the doctrine/requisite label scaffold.

The issue relevance gate does not replace the evidence-to-label boundary.

It must not create source-status classifications, side-track workflows, rebuttal matrices, bohag/lösöre process handling, schema types, runtime classes, or semantic facts.

## Negative Boundaries

This issue relevance gate does not implement or authorize:

- source-status classification gate
- source-backed material classification gate
- full evidence discipline gate
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
- treating source-backed material as automatically core-relevant
- treating core-relevant material as legally proven
- treating issue placement as legal conclusion
- treating bohag/lösöre as hidden-co-ownership proof
- treating safety/contact conflict material as hidden-co-ownership core unless source-backed and issue-linked
- Swedish psychological violence track blending
- Danish psychological violence track blending
- general bodelning decision engine
- governance helper-level freeze continuation
- database/API/route behavior
- generated artifact behavior

## Candidate-Shape Guard

This is an issue relevance gate only.

It is not source-status classification.

It is not a full evidence discipline gate.

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
