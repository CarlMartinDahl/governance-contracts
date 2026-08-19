# SWE_BODELNING_DOLD_SAMAGANDERATT Chunked Digital Corpus Workflow

## Status

This document is a DOCS_ONLY chunked digital corpus workflow only.

It defines a non-core corpus/chunk tracking contract for `SWE_BODELNING_DOLD_SAMAGANDERATT`.

It tracks large digital source corpora before excerpts, labels, appendices, or submitted evidence are created.

It preserves large digital source corpus material without treating that material as verified proof, legal conclusion, source-status classification, issue relevance classification, working-ledger classification, submitted appendix workflow, evidentiary sufficiency scoring, proof of any requisite, or ownership determination.

It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, proof of any requisite, or ownership conclusions.

## Purpose

This chunked digital corpus workflow exists to:

- define a chunked digital corpus workflow for `SWE_BODELNING_DOLD_SAMAGANDERATT`
- track large digital source corpora before excerpts, labels, appendices, or submitted evidence are created
- preserve the rule that corpus chunks are not proof by themselves
- preserve the rule that TXT chunks are not original source
- preserve the rule that PDF exports are not original platform records
- preserve the rule that embedded media requires separate source/provenance tracking
- preserve the rule that Email PDFs remain separate from message corpus chunks unless later bridged by a separate contract
- preserve the rule that excerpts must later pass source-status and issue-relevance gates
- preserve the rule that corpus material must not bypass the source-status gate
- preserve the rule that corpus material must not bypass the issue relevance gate
- preserve the rule that corpus material must not bypass the working evidence memo / issue ledger
- preserve the principle that truth/evidence discipline controls the model
- preserve the principle that the matter stays a bodelning/evidence matter, not a conflict narrative
- preserve the core issue scope of housing/property, acquisition and financing, party intent, documented economic contributions, counterparty positions about those issues, and bohag/lösöre where relevant as a separate bodelning track
- prepare for later domain contract work without implementing doctrine, schema, runtime, semantic-fact mapping, or decision logic

## Prior Closed Prerequisites

- The `SWE_BODELNING_DOLD_SAMAGANDERATT` boundary/prerequisite freeze is closed at `1a6d6c6`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` legal/source inventory contract is closed at `6fa0a4a`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` neutral evidence dossier scaffold is closed at `625e538`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` doctrine/requisite label scaffold is closed at `ed13c92`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` evidence-to-label boundary scaffold is closed at `93edca0`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` source-backed material classification gate is closed at `4a20f9f`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` issue relevance gate is closed at `591a98a`.
- The `SWE_BODELNING_DOLD_SAMAGANDERATT` working evidence memo / issue ledger is closed at `0073dde`.

This chunked digital corpus workflow builds on those contracts but does not supersede them.

runtime/schema/semantic-fact mapping remains blocked

actual_swedish_samaganderatt_decision_logic remains excluded/not implemented

## Corpus Workflow Preconditions

The corpus workflow does not perform source-status classification.

The corpus workflow does not perform issue relevance classification.

The corpus workflow does not perform working-ledger classification.

A corpus record may point to source-status follow-up needs.

A corpus record may point to issue-relevance follow-up needs.

A corpus record may point to a working-ledger entry.

Corpus material must not enter core dossier use unless later excerpted, source-status classified, and issue-classified.

The source-status gate controls promotion to source-backed material.

The issue relevance gate controls later issue-area placement.

The working evidence memo / issue ledger controls working-note and lead tracking.

## Existing SWE_BODELNING Context

Existing `SWE_BODELNING` lane keys are context only:

- `economic_contribution`
- `shared_use`
- `shared_intent`

These lane keys are not treated as implemented hidden co-ownership decision logic, corpus workflow classifications, source-status classification, issue relevance classification, working-ledger classification, sufficiency scoring, or proof that any requisite is satisfied.

They may provide vocabulary context for later reviewed work, but they do not create `SWE_BODELNING_DOLD_SAMAGANDERATT` corpus/chunk workflow behavior.

## Corpus/Chunk Classifications

The following classifications are neutral corpus/chunk workflow classifications only:

- `DIGITAL_EVIDENCE_CORPUS`
- `MESSAGE_CORPUS`
- `MESSAGE_CORPUS_CHUNK`
- `MESSAGE_TEXT_CHUNK`
- `MESSAGE_PDF_EXPORT`
- `EMBEDDED_MEDIA_REFERENCE`
- `EMAIL_CORPUS_ITEM`
- `SOURCE_FILE_REFERENCE`
- `CORPUS_DATE_RANGE`
- `CHUNK_INDEX`
- `CHARACTER_RANGE`
- `PAGE_RANGE`
- `PARTICIPANT_IDENTIFIER`
- `EXTRACTION_STATUS`
- `LINKED_EXCERPT_REFERENCE`
- `LINKED_WORKING_LEDGER_ENTRY`
- `SOURCE_STATUS_FOLLOW_UP`
- `ISSUE_RELEVANCE_FOLLOW_UP`
- `APPENDIX_CANDIDATE_REFERENCE`
- `MANUAL_REVIEW_REQUIRED`

These classifications are not schema fields, runtime classes, semantic-fact mappings, source-status classifications, issue relevance classifications, working-ledger classifications, legal conclusions, issue merits determinations, or sufficiency determinations.

## Classification Rules

- `DIGITAL_EVIDENCE_CORPUS` may identify a broad digital source collection.
- `MESSAGE_CORPUS` may identify a message-history corpus.
- `MESSAGE_CORPUS_CHUNK` may identify a chunk within a message-history corpus.
- `MESSAGE_TEXT_CHUNK` may identify a text extraction view of a message corpus chunk.
- `MESSAGE_PDF_EXPORT` may identify a PDF export view of message data.
- `EMBEDDED_MEDIA_REFERENCE` may identify images, attachments, or other media embedded in message exports.
- `EMAIL_CORPUS_ITEM` may identify an email or email PDF item and must remain separate from message corpus chunks unless later bridged by another contract.
- `SOURCE_FILE_REFERENCE` may identify the source file name, location, or reference without making the file proof.
- `CORPUS_DATE_RANGE` may identify the date range covered by a corpus or chunk.
- `CHUNK_INDEX` may identify chunk order within a corpus.
- `CHARACTER_RANGE` may identify text range within a text chunk.
- `PAGE_RANGE` may identify page range within a PDF export.
- `PARTICIPANT_IDENTIFIER` may identify participant labels or handles without deciding identity disputes.
- `EXTRACTION_STATUS` may identify whether text, PDF, screenshot, OCR, or other extraction is complete, partial, uncertain, or manually reviewed.
- `LINKED_EXCERPT_REFERENCE` may point to a later excerpt candidate, but the excerpt must separately pass source-status and issue-relevance gates.
- `LINKED_WORKING_LEDGER_ENTRY` may point to a working-ledger entry without turning corpus material into a working-note conclusion.
- `SOURCE_STATUS_FOLLOW_UP` may mark that later source-status classification is needed.
- `ISSUE_RELEVANCE_FOLLOW_UP` may mark that later issue-relevance classification is needed.
- `APPENDIX_CANDIDATE_REFERENCE` may identify possible future appendix use without making the item submitted evidence.
- `MANUAL_REVIEW_REQUIRED` may mark that human review is needed before any promotion or use.

## Required Representation Rules

A five-year message history split into five chunks should be represented as one MESSAGE_CORPUS with five MESSAGE_CORPUS_CHUNK records.

Each MESSAGE_CORPUS_CHUNK should preserve CHUNK_INDEX, CORPUS_DATE_RANGE, SOURCE_FILE_REFERENCE, EXTRACTION_STATUS, PARTICIPANT_IDENTIFIER handling, and optional linked excerpt, working-ledger, source-status follow-up, issue-relevance follow-up, or appendix-candidate references.

None of the five chunks is proof by itself.

TXT chunks should be MESSAGE_TEXT_CHUNK extraction views.

PDF message exports should be MESSAGE_PDF_EXPORT records with PAGE_RANGE and an explicit warning that the PDF is not the original platform record.

Images or media inside message exports should be EMBEDDED_MEDIA_REFERENCE items requiring separate source/provenance tracking.

Email PDFs should be tracked as EMAIL_CORPUS_ITEM, not MESSAGE_CORPUS_CHUNK, unless a later contract explicitly bridges them.

## Core-Blocking And Promotion Rules

corpus chunks stay out of core dossier unless later excerpted, source-status classified, and issue-classified

TXT chunks are not original source

PDF exports are not original platform records

embedded media is not verified without separate source/provenance tracking

email PDFs stay separate from message corpus chunks unless later source-status and issue relevance gates connect them

appendix candidate reference is not a submitted appendix

appendix candidate reference is not proof

linked excerpt reference is not proof until separately source-status classified and issue-classified

corpus records may preserve navigation, location, and extraction information without creating evidence conclusions

## Manual-Review Gates

The following manual-review gates remain unresolved for this chunked digital corpus workflow:

- any claim that a chunk is proof
- any uncertainty about original platform source versus export
- any PDF export with images or formatting-dependent meaning
- any embedded media without separate provenance
- any participant identity ambiguity
- any altered/deleted/partial message-history concern
- any attempt to promote corpus material into core dossier use
- any attempt to treat appendix candidacy as submission or proof
- any attempt to bypass the source-status gate
- any attempt to bypass the issue relevance gate
- any attempt to bypass the working evidence memo / issue ledger

Material reaching these gates must remain manual-review-required rather than being treated as source-backed evidence, issue placement, submitted evidence, core proof, legal conclusion, legal sufficiency, or ownership determination.

## Relationship To Prior Domain Layers

The chunked corpus workflow supports the source-status gate by tracking corpus records before excerpt/source promotion.

The chunked corpus workflow supports the issue relevance gate by preserving later issue-placement follow-up.

The chunked corpus workflow supports the working evidence memo / issue ledger by linking raw corpus material to working notes, leads, or follow-up items without turning them into proof.

The chunked corpus workflow supports the evidence-to-label boundary only after excerpts have passed later gates.

The chunked corpus workflow does not replace the source-status gate.

The chunked corpus workflow does not replace the issue relevance gate.

The chunked corpus workflow does not replace the working evidence memo / issue ledger.

It must not create submitted appendix workflow, counterparty matrix, side-track workflow, schema types, runtime classes, or semantic facts.

## Negative Boundaries

This chunked digital corpus workflow does not implement or authorize:

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
- source-status classification
- source-backed material classification gate
- issue relevance classification
- working evidence memo / issue ledger replacement
- submitted appendix workflow
- counterparty rebuttal matrix
- side-track/quarantine workflow
- bohag/lösöre workflow
- treating corpus chunks as proof
- treating TXT chunks as original source
- treating PDF exports as original platform records
- treating embedded media as verified without separate provenance
- treating email PDFs as message corpus chunks unless a later contract explicitly bridges them
- treating appendix candidate references as submitted evidence
- bypassing source-status gate
- bypassing issue relevance gate
- bypassing working evidence memo / issue ledger
- Swedish psychological violence track blending
- Danish psychological violence track blending
- general bodelning decision engine
- governance helper-level freeze continuation
- database/API/route behavior
- generated artifact behavior

## Candidate-Shape Guard

This is a chunked digital corpus workflow only.

It is not source-status classification.

It is not issue relevance classification.

It is not working evidence memo / issue ledger.

It is not a submitted appendix workflow.

It is not a counterparty rebuttal matrix.

It is not a side-track/quarantine workflow.

It is not a bohag/lösöre workflow.

It is not schema-first work.

It is not runtime implementation.

It is not semantic-fact mapping.

It is not legal decision logic.

It must not determine whether hidden co-ownership exists in any case.

It must not infer legal conclusions from digital material.

It must not score sufficiency.

It must not classify any requisite as satisfied or not satisfied.

It must not treat message chunks, text chunks, PDF exports, embedded media, or email PDFs as proof by themselves.

corpus material must not bypass the source-status gate

corpus material must not bypass the issue relevance gate

corpus material must not bypass the working evidence memo / issue ledger

excerpts must later pass source-status and issue-relevance gates

embedded media requires separate source/provenance tracking

Email PDFs remain separate from message corpus chunks unless later bridged by a separate contract
