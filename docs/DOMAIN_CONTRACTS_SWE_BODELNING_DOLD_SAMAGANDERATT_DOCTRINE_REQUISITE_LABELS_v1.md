# SWE_BODELNING_DOLD_SAMAGANDERATT Doctrine/Requisite Label Scaffold

## Status

This document is a DOCS_ONLY doctrine/requisite label scaffold only.

It defines neutral doctrine/requisite labels for organizing dossier material related to possible hidden co-ownership / dold samäganderätt in Swedish bodelning or family-property contexts.

It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, or ownership conclusions.

## Purpose

This scaffold exists to:

- define neutral doctrine/requisite labels for `SWE_BODELNING_DOLD_SAMAGANDERATT`
- allow labels to organize dossier material
- preserve the boundary that labels do not decide whether any requisite is satisfied
- preserve manual legal-review gates
- carry forward the no sufficiency / no conclusion / no implementation boundary
- prepare for later domain contract work without implementing doctrine, schema, runtime, semantic-fact mapping, or decision logic

## Prior Closed Prerequisites

- The `SWE_BODELNING_DOLD_SAMAGANDERATT` boundary/prerequisite freeze is closed at `1a6d6c6`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` legal/source inventory contract is closed at `6fa0a4a`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` neutral evidence dossier scaffold is closed at `625e538`.

This label scaffold builds on those contracts but does not supersede them.

runtime/schema/semantic-fact mapping remains blocked.

actual_swedish_samaganderatt_decision_logic remains excluded/not implemented.

## Existing SWE_BODELNING Context

Existing `SWE_BODELNING` lane keys are context only:

- `economic_contribution`
- `shared_use`
- `shared_intent`

These lane keys are not treated as implemented hidden co-ownership decision logic, not sufficiency scoring, and not proof that any requisite is satisfied.

They may provide vocabulary context for later reviewed work, but they do not create `SWE_BODELNING_DOLD_SAMAGANDERATT` doctrine behavior.

## Doctrine/Requisite Labels

The following labels are neutral organization labels only:

- formal / nominal / open owner
- alleged hidden owner
- asset/property
- acquisition date or acquisition period
- acquisition-time circumstances
- common-use dimension
- economic-contribution-to-acquisition dimension
- common-intent dimension
- tacit-agreement dimension
- post-acquisition-context dimension
- counterevidence dimension
- missing-evidence dimension
- reliability/provenance dimension
- contradiction-handling dimension
- manual-review dimension
- neutral summary

These labels are not schema fields, runtime classes, semantic-fact mappings, legal conclusions, or sufficiency determinations.

## Label Usage Rule

Labels may organize dossier material.

Labels may group evidence under neutral headings.

Labels may identify where manual legal review is needed.

labels may organize dossier material

labels must not state that a requisite is satisfied

labels must not state that a requisite is not satisfied

labels must not infer legal conclusions from digital material

labels must not rank evidentiary sufficiency

labels must not decide ownership

## Manual-Review Gates

The following manual-review gates remain unresolved:

- source completeness
- handling of HD T 2565-02
- controlling vs contextual NJA cases
- bodelning/sambo-property distinction from hidden co-ownership doctrine
- post-acquisition material as context, not automatic legal inference
- confidence/reliability wording without legal conclusions
- official-source vs aggregator-summary conflicts

These gates must be manually reviewed before any full doctrine contract, semantic-fact mapping, schema work, runtime implementation, or legal decision logic.

## Relationship To Neutral Evidence Dossier Scaffold

This label scaffold supports the neutral evidence dossier scaffold by naming organization labels only.

It does not replace the dossier scaffold.

It does not create new dossier sections, schema types, runtime classes, or semantic facts.

The neutral evidence dossier scaffold remains the current contract for conceptual dossier structure.

## Neutral Summary Boundary

A neutral summary may describe:

- what labels appear relevant for organizing the material
- what source material exists
- what source material is missing
- what appears contradictory
- what requires manual legal review

A neutral summary must not state:

- hidden co-ownership exists
- hidden co-ownership does not exist
- a requisite is fulfilled
- a requisite is not fulfilled
- a party will win or lose
- a legal conclusion is established

## Negative Boundaries

This doctrine/requisite label scaffold does not implement or authorize:

- full doctrine contract
- final ownership determination
- legal advice
- legal decision logic
- `actual_swedish_samaganderatt_decision_logic`
- evidentiary sufficiency scoring
- case outcome prediction
- process pleading generation
- runtime implementation
- schema behavior changes
- semantic-fact mapping
- automatic legal conclusions from digital material
- treating post-acquisition material as automatic proof of ownership
- resolving controlling vs contextual case-law status
- Swedish psychological violence track blending
- Danish psychological violence track blending
- general bodelning decision engine
- governance helper-level freeze continuation
- database/API/route behavior
- generated artifact behavior

## Implementation Blocks

- runtime_behavior: blocked
- schema_behavior: blocked
- semantic_fact_mapping: blocked
- legal_decision_logic: blocked
- legal_advice_engine: blocked
- final_ownership_determination: blocked
- evidentiary_sufficiency_scoring: blocked

## Candidate-Shape Guard

This scaffold may be used only as a text contract for future reviewable doctrine/requisite labels.

It must not be used to infer whether hidden co-ownership exists in any case.

It must not be used to rank the strength of evidence.

It must not be used to generate legal advice, pleadings, predictions, decisions, or ownership outcomes.
