# SWE_BODELNING_DOLD_SAMAGANDERATT Neutral Evidence Dossier Scaffold

```yaml
dossier_scaffold_record:
  domain_key: SWE_BODELNING_DOLD_SAMAGANDERATT
  status: neutral_evidence_dossier_scaffold_frozen
  mode: DOCS_ONLY
  scaffold_type: neutral_evidence_dossier_scaffold_only
  substantive_legal_doctrine_contract: blocked
  runtime_behavior: blocked
  schema_behavior: blocked
  semantic_fact_mapping: blocked
  legal_decision_logic: blocked
```

## Purpose

This document defines a neutral evidence dossier scaffold only for
`SWE_BODELNING_DOLD_SAMAGANDERATT`. It defines conceptual dossier structure for
possible hidden co-ownership / dold samäganderätt material in Swedish bodelning or
family-property contexts.

The scaffold structures possible hidden co-ownership material neutrally. It prepares for
later domain contract, schema, and runtime work without implementing any of those later
steps. It preserves manual legal-review gates from the legal/source inventory and treats
evidence/requisite dimensions as dossier organization labels only.

## Prior Closed Prerequisites

This scaffold depends on the closed prerequisite records below:

- boundary/prerequisite freeze closed at `1a6d6c6`
- legal/source inventory contract closed at `6fa0a4a`

This scaffold builds on those contracts but does not supersede them. Runtime, schema, and
semantic-fact mapping remain blocked for this domain.

## Existing SWE_BODELNING Context

Existing `SWE_BODELNING` lane keys are context only:

- `economic_contribution`
- `shared_use`
- `shared_intent`

These lane keys are not treated as implemented hidden co-ownership decision logic. They
may help compare generic dossier scaffolding, but they do not define
`SWE_BODELNING_DOLD_SAMAGANDERATT`, do not decide ownership, and do not implement
`actual_swedish_samaganderatt_decision_logic`.

## Conceptual Dossier Sections

A future neutral evidence dossier may organize material into these conceptual sections:

- case and party-neutral overview
- asset/property overview
- acquisition event and acquisition timeline
- claim and counter-position summary
- evidence inventory
- requisite-labelled evidence organization
- post-acquisition context section
- counterevidence section
- missing evidence section
- source reliability and provenance section
- contradiction handling section
- manual-review gate section
- neutral dossier summary

These sections are conceptual sections only. They do not create schema ownership,
runtime behavior, generated artifact behavior, database/API/route behavior, or legal
decision logic.

## Candidate Domain Objects

The scaffold uses these candidate domain objects as conceptual/scaffold terms only:

- HiddenCoOwnershipDossier
- HiddenCoOwnershipClaim
- AssetOrProperty
- NominalOwner
- AllegedHiddenOwner
- AcquisitionEvent
- AcquisitionTimeline
- DigitalEvidenceItem
- EvidenceSource
- EvidenceTimelineEntry
- CounterEvidence
- MissingEvidence
- SourceReliabilityAssessment
- ConfidenceIndicator
- NeutralDossierSummary
- ManualReviewGate

These candidate domain objects are not schema types, runtime classes, or semantic-fact mappings.
They are naming anchors for later reviewable contract work.

## Evidence/Requisite Organization Labels

The scaffold may organize evidence under these evidence/requisite dimensions as
organization labels only:

- common use
- economic contribution to acquisition
- common intent
- tacit agreement
- acquisition-time circumstances
- timeline proximity to acquisition
- post-acquisition context evidence only
- counterevidence
- missing or unverified evidence
- metadata/provenance status
- contradiction handling
- source reliability
- neutral summary

These organization labels are not automatic legal conclusions. They must not be used to
state that a requisite is satisfied, that hidden co-ownership exists, or that hidden
co-ownership does not exist.

## Evidence Category Examples

Non-exhaustive evidence organization examples include:

- purchase contract
- loan material
- down payment / kontantinsats
- handpenning
- bank transfer
- bank statements
- Swish
- amortization
- messages
- emails
- notes
- admissions
- conduct around purchase
- residence/use records
- household context
- shared occupancy
- metadata status
- source location
- screenshot/document provenance
- contradictions
- missing records
- unverified claims

These examples do not imply evidentiary sufficiency. Their presence, absence, or grouping
must not be treated as proof of ownership or non-ownership.

## Manual-Review Gates

The following manual-review gates are carried forward from the legal/source inventory and
remain unresolved:

- source completeness
- handling of HD T 2565-02
- controlling vs contextual NJA cases
- bodelning/sambo-property distinction from hidden co-ownership doctrine
- post-acquisition material as context, not automatic legal inference
- confidence/reliability wording without legal conclusions
- official-source vs aggregator-summary conflicts

These gates must be manually reviewed before any doctrine contract, schema work,
semantic-fact mapping, runtime implementation, or legal decision logic is selected.

## NeutralDossierSummary Rule

A `NeutralDossierSummary` may summarize:

- what is alleged
- what source material exists
- what source material is missing
- what appears contradictory
- what requires manual legal review

A `NeutralDossierSummary` must not state:

- hidden co-ownership exists
- hidden co-ownership does not exist
- a party will win or lose
- a legal conclusion is established

## Negative Boundaries

This neutral evidence dossier scaffold does not implement or authorize:

- final ownership determination
- legal advice
- `actual_swedish_samaganderatt_decision_logic`
- case outcome prediction
- process pleading generation
- runtime implementation
- schema behavior changes
- semantic-fact mapping
- automatic legal conclusions from digital material
- substantive legal doctrine contract
- evidentiary sufficiency scoring
- Swedish psychological violence track blending
- Danish psychological violence track blending
- general bodelning decision engine
- governance helper-level freeze continuation
- database/API/route behavior
- generated artifact behavior

## Candidate-Shape Guard

This is a neutral evidence dossier scaffold only. It is not a full doctrine contract,
schema-first work, runtime implementation, semantic-fact mapping, legal decision logic,
legal advice, or final ownership determination. It must preserve manual legal-review
gates and must treat evidence/requisite dimensions as dossier organization labels only.
