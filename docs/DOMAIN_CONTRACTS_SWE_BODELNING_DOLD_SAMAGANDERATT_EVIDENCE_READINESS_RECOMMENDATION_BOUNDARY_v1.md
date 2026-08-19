# SWE_BODELNING_DOLD_SAMAGANDERATT Evidence-Readiness Recommendation Boundary

## Status

Contract name: `SWE_BODELNING_DOLD_SAMAGANDERATT` evidence-readiness recommendation boundary.

Status: `DOCS_ONLY`.

Purpose: freeze safe recommendation boundaries for evidence-readiness outputs after neutral marker/source review.

This checklist-only boundary is product-boundary-only. It is not legal advice, not proof, not ownership determination, not final item ownership determination, not sufficiency scoring, not outcome prediction, not credibility finding, not legal decision logic, not final submission drafting, and not runtime/schema/semantic-fact implementation.

It does not implement `actual_swedish_samaganderatt_decision_logic`; that string remains an explicit negative boundary only.

## Relationship To Closed Layers

Existing closed `SWE_BODELNING_DOLD_SAMAGANDERATT` layers already cover:

- source inventory
- doctrine/requisite labels
- evidence-to-label boundary
- source-status gate
- issue relevance gate
- working evidence memo / issue ledger
- submitted appendix workflow
- counterparty rebuttal matrix
- bohag/lösöre side-track workflow
- anonymized PR/legal review template

This contract is distinct because it governs recommendation wording and user-facing evidence-readiness boundaries after marker/source review. It does not define the mechanics of source-status classification, issue relevance placement, working-ledger classification, appendix workflow, rebuttal matrix organization, or side-track workflow.

## Intended Users And Surfaces

Safe users and surfaces:

- `PARTY_OR_OMBUD_EVIDENCE_READINESS_ASSISTANT`
- `SOURCE_PROVENANCE_ASSISTANT`
- `NEUTRAL_MARKER_DETECTION_ASSISTANT`
- `WORKING_LEDGER_GENERATOR`
- `APPENDIX_SOURCE_ORGANIZATION_ASSISTANT`
- `REBUTTAL_ISSUE_MAPPER`

Primary user: a party or legal representative who needs help discovering, organizing, and preparing source-backed material for human legal review.

Secondary user: a reviewer or support person checking source readiness, provenance gaps, appendix organization, or rebuttal issues.

The model is not:

- bodelningsförrättare
- judge
- legal decision-maker
- ownership-determination engine
- sufficiency-scoring engine
- outcome predictor
- credibility finder
- diagnosis model
- risk model

## Safe Recommendation Levels

All recommendation levels are evidence-readiness / human-review recommendations only. No level is a legal conclusion, proof, ownership determination, sufficiency score, outcome prediction, credibility finding, final submission draft, or decision-maker instruction.

### LEVEL_0_NO_RELEVANT_TRACE_FOUND

Neutral wording:

“No clear hidden-co-ownership marker traces were found in the reviewed material. This does not decide the legal issue and may change if more source material is added.”

Required marker/source condition: no clear hidden-co-ownership marker traces found within the reviewed scope.

Manual-review gate: source scope and completeness remain open for human review.

Blocked conclusions: no legal issue resolution, no proof that a claim is absent, no ownership determination, no sufficiency scoring, and no outcome prediction.

### LEVEL_1_WEAK_TRACE_FOUND

Neutral wording:

“Weak or partial traces were found. More source material and human review are needed before this should be treated as a bodelning-core issue.”

Required marker/source condition: isolated, partial, ambiguous, or false-positive-prone marker hits.

Manual-review gate: source completeness, false-positive review, ordinary household-payment review, ordinary relationship-language review, and post-acquisition-support review.

Blocked conclusions: no core placement by itself, no proof, no legal advice, no ownership determination, and no sufficiency scoring.

### LEVEL_2_REVIEWABLE_TRACE_FOUND

Neutral wording:

“The material contains reviewable traces relevant to possible hidden co-ownership. It should be organized in a source-backed working ledger for human legal review.”

Required marker/source condition: multiple marker hits or source candidates that are coherent enough for human legal review and working-ledger organization.

Manual-review gate: source/original/provenance verification, raw-source-vs-derivative review, legal significance review, and issue relevance review.

Blocked conclusions: no proof of hidden co-ownership, no legal conclusion, no ownership determination, no outcome prediction, and no sufficiency scoring.

### LEVEL_3_STRONG_REVIEWABLE_TRACE_FOUND

Neutral wording:

“The material contains strong reviewable traces across multiple source families. It may justify preparing a structured source package for legal review or possible bodelningsförrättare presentation. No legal conclusion is made.”

Required marker/source condition: multiple independent source families support a coherent acquisition, financing, party-intent, formal-structure, or rebuttal issue chain.

Manual-review gate: legal significance review, source completeness review, source/original/provenance verification, and human review of any characterization question.

Blocked conclusions: no proof, no legal advice, no decision-maker instruction, no ownership determination, no sufficiency scoring, and no prediction of outcome.

### LEVEL_4_READY_FOR_PARTY_PRESENTATION_REVIEW

Neutral wording:

“The material appears organized enough for a party or legal representative to review for possible presentation to the bodelningsförrättare. This is not a conclusion that hidden co-ownership exists.”

Required marker/source condition: source and appendix material is organized enough for party/ombud review, with open gates clearly identified.

Manual-review gate: human legal review, final source verification, appendix completeness review, and presentation-scope review.

Blocked conclusions: no proof that hidden co-ownership exists, no instruction to the bodelningsförrättare, no legal advice, no sufficiency score, no credibility finding, and no final submission drafting.

## Safe Recommendation Outputs

Allowed output families:

- `REVIEWABLE_TRACES_FOUND`: may state that reviewable traces were found, but this is not proof or legal advice.
- `HUMAN_LEGAL_REVIEW_NEEDED`: may recommend human legal review, but this is not legal advice.
- `SOURCE_BACKED_WORKING_LEDGER_RECOMMENDED`: may recommend a source-backed working ledger, but the ledger is not proof.
- `SOURCE_ORIGINAL_PROVENANCE_VERIFICATION_NEEDED`: may recommend source/original/provenance verification, but this does not prove the underlying fact.
- `POSSIBLE_PARTY_PRESENTATION_REVIEW`: may recommend party/ombud review for possible presentation, but not a decision-maker outcome.
- `COUNTERPARTY_POSITION_REBUTTAL_ISSUE`: may identify a rebuttal issue for human review, but not a credibility finding.
- `NO_LEGAL_CONCLUSION_MADE`: must preserve that no legal conclusion is made.

## Forbidden-Output Taxonomy

Forbidden output families and safe replacements:

- `HIDDEN_CO_OWNERSHIP_PROVEN`: unsafe because it asserts proof. Safe replacement: “Reviewable traces were found; human legal review is needed.”
- `YOU_WILL_WIN`: unsafe because it predicts outcome. Safe replacement: “The decision-maker must assess the material.”
- `BODELNINGSFORRATTARE_SHOULD_DECIDE_X`: unsafe because it replaces or pressures the decision-maker. Safe replacement: “Material may be prepared for human review or possible presentation.”
- `OTHER_PARTY_LIES`: unsafe because it makes a credibility finding. Safe replacement: “Counterparty position may be contradicted, qualified, or made incomplete by contemporaneous source candidates.”
- `FORMAL_TITLE_OVERRIDDEN`: unsafe because it states legal effect. Safe replacement: “Formal-title and source material create a review issue.”
- `MATERIAL_IS_SUFFICIENT`: unsafe because it scores sufficiency. Safe replacement: “Source/original/provenance verification is needed before any legal review.”
- `APPENDIX_PACKAGE_PROVES_CLAIM`: unsafe because appendix completeness is not proof. Safe replacement: “Appendix package completeness can support human review but does not prove the claim.”
- `LEGAL_ADVICE`: unsafe because the model is not a legal adviser. Safe replacement: “No legal conclusion is made; seek human legal review.”
- `OWNERSHIP_DETERMINATION`: unsafe because the model cannot determine ownership. Safe replacement: “The material raises an issue for human legal review.”
- `FINAL_ITEM_OWNERSHIP_DETERMINATION`: unsafe because item ownership remains a human/legal question. Safe replacement: “Item material remains side-track or manual-review material unless separately source-backed and issue-classified.”
- `SUFFICIENCY_SCORE`: unsafe because sufficiency is excluded. Safe replacement: “The material is organized for review with unresolved gates.”
- `OUTCOME_PREDICTION`: unsafe because decision outcome is excluded. Safe replacement: “The bodelningsförrättare remains the decision-maker.”
- `CREDIBILITY_FINDING`: unsafe because credibility findings are excluded. Safe replacement: “A rebuttal issue may require human review.”

## Manual-Review Gates

Required gates:

- `LEGAL_SIGNIFICANCE_REVIEW`
- `SOURCE_COMPLETENESS_REVIEW`
- `RAW_SOURCE_VS_DERIVATIVE_REVIEW`
- `MESSAGE_EXPORT_COMPLETENESS_REVIEW`
- `EMAIL_HEADER_PROVENANCE_REVIEW`
- `FINANCIAL_ARTIFACT_VERIFICATION`
- `GIFT_LOAN_CONTRIBUTION_CHARACTERIZATION`
- `ORDINARY_HOUSEHOLD_PAYMENT_FALSE_POSITIVE`
- `ORDINARY_RELATIONSHIP_LANGUAGE_FALSE_POSITIVE`
- `POST_ACQUISITION_SUPPORT_FALSE_POSITIVE`
- `FORMAL_TITLE_NOT_OWNERSHIP_CONCLUSION`
- `COUNTERPARTY_POSITION_NOT_TRUTH`
- `FINAL_ARGUMENT_NOT_PROOF`
- `APPENDIX_NOT_PROOF`
- `WORKING_LEDGER_NOT_PROOF`
- `PSYCHOLOGICAL_VIOLENCE_CONTAMINATION_BLOCK`

## Bodelningsförrättare Process Fit

The model helps a party or legal representative prepare underlag.

The model structures source-backed material and identifies review issues.

The bodelningsförrättare remains the objective decision-maker.

The model does not replace, pressure, or predict the decision-maker.

The model may recommend that material be reviewed for possible presentation. It must not recommend that the decision-maker should reach a specific result.

## Appendix / Source Package Handling

A completed appendix package may be described as presentation/source completeness only.

Appendix completeness is not proof.

An appendix or submitted package is not a legal conclusion.

Final narrative is not source proof.

R/Bilaga/Kompletteringsbilaga-style groups are generic source/presentation layers only; this contract must not name private files or case-specific titles.

Source/original/provenance verification remains required before use.

## Working-Ledger Handling

A source-ledger-like working record is a source-follow-up and organization layer.

The working ledger is not proof.

The working ledger is not final submission text.

The working ledger is not legal advice.

The working ledger cannot score sufficiency.

The working ledger cannot determine ownership.

The working ledger may identify marker hits, source gaps, rebuttal issues, and manual-review gates.

## Counterparty / Rebuttal Issue Handling

Counterparty positions are not truth by themselves.

A later party position may be “contradicted, qualified, or made incomplete by contemporaneous source candidates.”

The model must not say a party lies.

Credibility findings remain excluded.

A rebuttal issue is for human legal review.

## Psychological-Violence / Conflict Separation

`SWE_PSYKISKT_VALD` and `DK_PSYKISK_VOLD` remain separate tracks.

Conflict, DARVO, gaslighting, Cluster-B-style discussion, diagnosis-like material, risk scoring, and offence determination must not enter bodelning core.

Such material is off-core unless later separately scoped.

## Explicit Negative Boundaries

This boundary is:

- not legal advice
- not proof
- not ownership determination
- not final item ownership determination
- not sufficiency scoring
- not outcome prediction
- not credibility finding
- not legal decision logic
- not bodelningsförrättare replacement
- not final submission drafting
- not private-case application
- not runtime/schema/semantic-fact implementation
- not `actual_swedish_samaganderatt_decision_logic`
- not psychological-violence track blending
- not DK/SWE psychological violence work
- not Nordic comparison
- not synthetic example-case
- not case-specific PR/legal review in product docs

## Case-Specific Exclusion And Privacy

This contract explicitly prohibits:

- private case facts
- private identifiers
- exact private file paths
- raw excerpts from private material
- screenshots
- working memo content
- chunks
- source-package contents
- source-foundation zip contents
- final submissions
- direct private quotations
- case-specific examples

## Future-Scope Notes

Synthetic anonymized example-cases are later separate scope only after explicit manual product/legal decision.

Runtime implementation is later separate scope only after explicit manual product/legal decision.

Schema behavior is later separate scope only after explicit manual product/legal decision.

Semantic-fact mapping is later separate scope only after explicit manual product/legal decision.

Actual decision logic is later separate scope only after explicit manual product/legal decision.
