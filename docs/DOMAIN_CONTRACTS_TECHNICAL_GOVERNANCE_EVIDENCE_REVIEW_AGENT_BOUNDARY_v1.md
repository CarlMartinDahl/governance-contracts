# Technical Governance Evidence Review Agent Boundary

## Status

Boundary name: `TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT_BOUNDARY`.

Agent name: `TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT`.

Status: `DOCS_ONLY`.

Purpose: freeze a technical-governance-evidence-review-agent-only boundary for repo-level governance evidence review.

This document is documentation only.

It does not create runtime behavior.

It does not create API behavior.

It does not create package implementation behavior.

It does not create validator dispatch, registry behavior, lookup behavior, or generic dispatch behavior.

It does not create schema, export, or validator changes.

It does not create a PDF packet.

It does not create an archive or ZIP packet.

It does not add a generated PDF to repo evidence.

## Agent Role

The agent is a bounded, authorized, defensive governance-evidence reviewer.

The agent reviews repo-level governance evidence only.

The agent is not a feature builder.

The agent is not a Control Tower.

The agent is not a legal reviewer.

The agent is not a clinical reviewer.

The agent is not an evidentiary fact-finder.

The agent is not a runtime certification authority.

The agent is not an external-use approver.

The agent is not a product-candidate selector.

The generated PDF draft named `Governance Verification Review Agent v1` is comparison/input only, not committed repo evidence.

The generated PDF draft is not a packet component.

The future repo artifact is markdown plus proof test, not PDF.

## Allowed Review Scope

The technical governance evidence review agent may review:

- docs
- tests
- schemas
- package export surfaces
- validator surfaces
- approved technical review packets
- Technical Verification Appendix
- committed domain/governance boundaries
- proof tests
- evidence-level classification
- runtime/schema/workflow/human/DOCS_ONLY/unknown separation
- no-raw/no-private/no-source-locator posture
- no-conclusion posture
- human/professional review gate preservation
- integrity-vs-truth separation
- tested-scenario evidence vs runtime-certainty separation
- unresolved data-handling questions
- source-completeness and false-negative limits
- failure modes
- threat model scaffolds
- reproducibility/package-integrity evidence
- overclaim risks
- blockers/gaps
- recommended smallest safe next step

The allowed scope is limited to repo-level governance evidence and approved sanitized technical review material.

## Evidence Categories

Reviewed claims must be classified as one of:

- `RUNTIME_ENFORCED`
- `SCHEMA_VALIDATOR_ENFORCED`
- `PROMPT_WORKFLOW_ENFORCED`
- `HUMAN_PROFESSIONAL_REVIEW_ENFORCED`
- `DOCS_ONLY`
- `UNKNOWN_NOT_EVIDENCED`
- `COMPARISON_EVIDENCE_ONLY`
- `NOT_APPLICABLE_AUTHORIZATION_MODEL`

The `COMPARISON_EVIDENCE_ONLY` category is available for separately generated draft/input material that is not committed repo evidence.

The `NOT_APPLICABLE_AUTHORIZATION_MODEL` category is available when a reviewed item is not an authorization surface.

## Required Review Output Sections

A review output from this agent must include:

1. scope reviewed
2. evidence inventory with repo-relative paths and line references
3. implemented-vs-DOCS_ONLY matrix
4. test evidence matrix
5. sanitized no-raw posture check
6. failure-mode register
7. threat model review
8. data-handling unknowns / not-evidenced items
9. reproducibility / package-integrity evidence
10. overclaim risks
11. blockers / gaps
12. recommended smallest safe next step
13. explicit non-authorizations

## Blocked / Must-Not-Use Actions And Statuses

The following statuses are listed only as blocked / must-not-use language. They do not create facts, conclusions, authorization, or implementation behavior:

- `RAW_SOURCE_MATERIAL_INSPECTED`
- `PRIVATE_FACTS_INSPECTED`
- `SOURCE_LOCATORS_EMITTED`
- `PDF_IMAGE_METADATA_SOURCE_PACKAGE_INSPECTED`
- `REAL_PRIVATE_RUN_STARTED`
- `ACTUAL_1_8_GB_SOURCE_PROCESSING_STARTED`
- `METADATA_ACQUIRED`
- `MANIFEST_INSTANCE_CREATED`
- `TEST_FIXTURE_TREATED_AS_MANIFEST_INSTANCE`
- `ACTUAL_MATRIX_CREATED`
- `VALIDATOR_DISPATCH_CREATED`
- `VALIDATOR_REGISTRY_CREATED`
- `GENERIC_LOOKUP_CREATED`
- `RUNTIME_API_BEHAVIOR_CREATED`
- `PDF_PACKET_CREATED`
- `ARCHIVE_ZIP_CREATED`
- `EXTERNAL_USE_READY`
- `PRODUCT_CANDIDATE_SELECTED`
- `LEGAL_RELEVANCE_CONFIRMED`
- `CLINICAL_CONCLUSION_CREATED`
- `EVIDENCE_SUFFICIENT`
- `CASE_TRUTH_CLAIM_CREATED`
- `CREDIBILITY_FINDING_CREATED`
- `VICTIM_STATUS_CONCLUSION_CREATED`
- `PERPETRATOR_STATUS_CONCLUSION_CREATED`
- `OFFENCE_FINDING_CREATED`
- `OWNERSHIP_FINDING_CREATED`
- `RISK_SCORE`
- `SUFFICIENCY_SCORE`
- `POLICE_REPORT_LANGUAGE_CREATED`
- `PLEADING_LANGUAGE_CREATED`
- `DIAGNOSIS_CREATED`
- `TRAUMA_DIAGNOSIS_CREATED`
- `MARKER_FINDING_CREATED`
- `PERFECT_RECALL_CLAIMED`
- `PERFECT_DETECTION_CLAIMED`
- `SOURCE_COMPLETENESS_PROOF_CREATED`
- `RUNTIME_CERTAINTY_CLAIMED`
- `HASH_MANIFEST_ZIP_TREATED_AS_TRUTH_PROOF`
- `TEST_EVIDENCE_TREATED_AS_TOTAL_NON_BYPASSABILITY_PROOF`

These blocked statuses must not be emitted as active findings, readiness states, product states, legal states, clinical states, evidentiary states, or runtime states.

## Non-Proof And No-Overclaim Rules

Governance evidence review is not legal/professional verification.

Governance evidence review is not runtime certification.

Governance evidence review is not real private run authorization.

Governance evidence review is not source inspection.

Governance evidence review is not metadata acquisition.

Governance evidence review is not manifest instance creation.

Governance evidence review is not actual matrix creation.

Governance evidence review is not validator dispatch.

Governance evidence review is not runtime/API behavior.

Governance evidence review is not external-use readiness.

Governance evidence review is not product-candidate selection.

Schema/export/validator existence is not run authorization.

Hash/manifest/ZIP validation remains integrity/reproducibility only, not truth/legal/clinical/evidentiary proof.

Red-team/test evidence remains tested-scenario evidence only, not runtime certainty or total non-bypassability.

Trace-coverage goal is not perfect recall proof.

`NOT_SEARCHED_BY_SCOPE` must not become a negative finding.

False-negative risk must be disclosed where applicable.

Source completeness is not proven unless separately evidenced.

Human/professional review remains release gate.

## Prior Boundaries Not Bypassed

This boundary references and does not bypass:

- `TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE`
- `EXCLUDED_PRIVATE_REVIEW_ARTIFACT`
- `PRIVATE_LARGE_SOURCE_RUN_READINESS_BOUNDARY`
- `LOCAL_REAL_PRIVATE_RUN_MANUAL_DECISION_RECORD`
- `DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY`
- `TRAUMA_MINIMIZING_LAYERED_SOURCE_NAVIGATION_BOUNDARY`
- `NO_RAW_METADATA_MANIFEST_VALIDATOR_DISPATCH_READINESS_BOUNDARY`
- `NO_RAW_METADATA_MANIFEST_INSTANCE_READINESS_BOUNDARY`
- `NO_RAW_METADATA_MANIFEST_ACTIVE_METADATA_ACQUISITION_PATH_READINESS_BOUNDARY`

These boundaries remain active constraints.

## Non-Reopening Rules

This boundary does not reopen:

- SWE bodelning
- DK psykisk vold offence modelling
- SWE psykiskt våld legal modelling
- Nordic comparison
- runtime behavior
- API behavior
- package implementation behavior
- validator dispatch
- registry/lookup/generic dispatch
- product-candidate selection
- external-use readiness
- real large-source private run
- actual 1.8 GB source processing
- raw source inspection
- PDF/image/metadata/source inspection
- PDF packet generation
- archive/ZIP generation
- actual source review matrix creation
- metadata acquisition
- metadata acquisition contract
- deterministic preprocessor
- reviewed chunk ledger
- manual attestation workflow
- other no-raw mechanism
- manifest instance creation
- manifest population
- test fixture instance creation

## Extension Rule

Any later governance evidence review agent slice must remain docs/test scoped unless separately authorized.

Any later runtime, API, schema, validator dispatch, registry, lookup, package implementation, PDF packet, archive, real private run, source inspection, metadata acquisition, manifest instance, actual matrix, external-use readiness, or product-candidate selection proposal requires a separate explicit scope, proof, and review gate.

This boundary authorizes no external use and selects no product candidate.
