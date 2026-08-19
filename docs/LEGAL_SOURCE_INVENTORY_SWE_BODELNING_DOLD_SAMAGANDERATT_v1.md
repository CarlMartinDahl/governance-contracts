# SWE_BODELNING_DOLD_SAMAGANDERATT Legal/Source Inventory

```yaml
inventory_record:
  domain_key: SWE_BODELNING_DOLD_SAMAGANDERATT
  status: legal_source_inventory_contract_frozen
  mode: DOCS_ONLY
  contract_type: legal_source_inventory_only
  substantive_domain_contract: blocked
  runtime_behavior: blocked
  schema_behavior: blocked
  semantic_fact_mapping: blocked
  legal_decision_logic: blocked
```

## Purpose

This document is a legal/source inventory contract only. It identifies required legal/source
candidates for a future `SWE_BODELNING_DOLD_SAMAGANDERATT` domain contract and preserves
the current boundary that no substantive domain contract, runtime implementation, schema
behavior, semantic-fact mapping, or legal decision logic exists yet.

This inventory prepares for later legal/source verification and manual legal review. It
does not decide doctrine, apply doctrine, predict outcomes, or infer legal conclusions
from digital material.

## Source Priority Model

Future domain-contract work must classify sources by priority before relying on them:

1. Official primary legal sources

   Official primary legal sources include official court material where available and
   official statute text from Riksdagen or an equivalent official source. These are the
   preferred controlling source category for future legal/source inventory work.

2. Primary case references via legal aggregator

   Primary case references via legal aggregator include NJA references available through
   lagen.nu or a similar legal aggregator when official source text is unavailable in the
   tracked repo. Aggregator references may identify and locate primary case material, but
   future contracts must preserve whether the underlying official text has been verified.

3. Secondary/explanatory sources

   Secondary/explanatory sources include articles, summaries, student papers, Q&A pages,
   commentary, and similar explanatory material. They may be useful as
   non-controlling context only and must not control future model contracts.

4. Missing or unverified sources

   Missing or unverified sources are sources named as candidates but not yet verified in
   tracked repo evidence. They must remain manual-review inputs rather than implemented
   doctrine.

## Required Case/Source Candidates

Future legal/source inventory work must consider these case/source candidates:

- NJA 1981 s. 693
- NJA 1982 s. 589
- NJA 1985 s. 97
- NJA 2002 s. 142
- HD T 2565-02
- NJA 2008 s. 826
- NJA 2013 s. 242
- NJA 2013 s. 632
- NJA 2016 s. 1057

These references are required candidates for future source inventory. Their presence here
does not make any one source controlling and does not implement any legal rule.

## Required Statutory Context Candidates

Future legal/source inventory work must consider these statutory context candidates:

- Äktenskapsbalken
- Sambolagen
- Lag om samäganderätt

These statutes are context/source candidates for future legal/source inventory only.
This document does not implement legal logic under any statute.

## Doctrine/Requisite Candidate Terms

Future domain-contract work may not treat these terms as implemented doctrine until legal
sources and manual legal review make them concrete:

- nominal owner
- formal owner
- open owner
- alleged hidden owner
- asset/property
- acquisition date or acquisition period
- acquisition-time circumstances
- common use
- economic contribution to acquisition
- common intent
- tacit agreement
- post-acquisition evidence with possible evidentiary value
- counterevidence
- missing evidence
- source reliability
- confidence
- neutral summary

## Evidence/Digital-Material Candidate Categories

Future domain-contract work may not treat these categories as source-backed mappings until
legal/source inventory and manual legal review make their role concrete:

- direct acquisition evidence
- indirect intent evidence
- common-use evidence
- contribution evidence
- timeline evidence
- reliability evidence
- negative evidence
- purchase contract
- loan
- down payment
- bank transfer
- bank statements
- Swish
- amortization
- handpenning
- kontantinsats
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

## Manual Legal-Review Gates

Manual legal review is required before any future domain contract may treat the following
questions as settled:

- whether the source list is complete
- exact handling of HD T 2565-02
- which NJA cases are controlling versus contextual
- how to distinguish bodelning/sambo property concepts from hidden co-ownership doctrine
- whether post-acquisition digital material may be represented only as evidentiary context, not legal inference
- how to express confidence/reliability without implying legal conclusions
- how to handle cases where official source text differs from aggregator summaries
- how to avoid giving legal advice or predicting ownership outcomes

## Current Repo Absence And Blocked Implementation

Current tracked repo evidence shows:

- boundary doc/proof for `SWE_BODELNING_DOLD_SAMAGANDERATT`
- generic `SWE_BODELNING` scaffolding and dossier/evidence indexes
- lane keys:
  - `economic_contribution`
  - `shared_use`
  - `shared_intent`
- explicit exclusion of `actual_swedish_samaganderatt_decision_logic`
- no substantive domain contract
- no runtime/schema/semantic-fact implementation
- no legal/source-backed mapping from digital material to neutral dossier concepts

## Negative Boundaries

This legal/source inventory contract does not implement or authorize:

- substantive legal doctrine contract
- final ownership determination
- legal advice engine
- `actual_swedish_samaganderatt_decision_logic`
- runtime implementation
- schema behavior changes
- semantic-fact adoption
- case outcome prediction
- process pleading generation
- automatic legal conclusion from digital material
- Swedish psychological violence track
- Danish psychological violence track
- general bodelning decision engine
- governance helper-level freeze continuation
- database/API/route behavior
- generated artifact behavior

## Candidate-Shape Guard

This inventory is not the substantive domain contract. It is not schema-first work, runtime
implementation, semantic-fact mapping, legal decision logic, or a legal advice engine. It
must preserve manual legal-review gates and must not determine whether hidden co-ownership
exists in any case.
