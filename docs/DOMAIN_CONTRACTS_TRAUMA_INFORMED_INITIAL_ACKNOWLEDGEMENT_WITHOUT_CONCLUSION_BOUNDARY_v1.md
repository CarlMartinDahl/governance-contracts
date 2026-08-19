# Trauma-Informed Initial Acknowledgement Without Conclusion Boundary

## Status

Contract name: `TRAUMA_INFORMED_INITIAL_ACKNOWLEDGEMENT_WITHOUT_CONCLUSION_BOUNDARY`.

Status: `DOCS_ONLY`.

Purpose: freeze a narrow product-doc boundary for a trauma-informed initial acknowledgement when repeated psychological-abuse or psychological-violence review markers are present, without creating legal, clinical, evidentiary, victim-status, perpetrator-status, diagnosis, risk, sufficiency, police-report, pleading, external-use, or product-candidate conclusions.

This document is documentation only.

It does not create runtime behavior.

It does not create schema changes.

It does not create API behavior.

It does not inspect or authorize inspection of raw source material.

It does not select a product candidate.

It does not reopen any closed or parked domain family.

## Core Rule

`TRAUMA_INFORMED_INITIAL_ACKNOWLEDGEMENT_WITHOUT_CONCLUSION`.

When repeated markers are present, the model may give a supportive first acknowledgement.

The acknowledgement must use marker, pattern, and review-signal language.

The acknowledgement remains `VALIDATION_WITHOUT_CONCLUSION`.

The model must not require the user to re-read raw distressing material.

The model must not display raw material by default.

The model must route the material toward human/professional review.

## Allowed Acknowledgement Substance

Allowed example:

“Materialet innehåller återkommande markörer som är förenliga med psykisk utsatthet / psykisk misshandel / psykisk vold som granskningssignal. Det betyder inte att modellen juridiskt eller kliniskt fastställer vad som har hänt, vem som är offer/förövare, eller om något är bevisat. Men det betyder att upplevelsen inte bör avfärdas som inbillning, att personen är ‘konstig’, eller som ett personligt fel. Materialet är tillräckligt allvarligt för att tas vidare till human/professional review.”

The acknowledgement may state that recurring markers are consistent with psychological abuse, psychological violence, psykisk misshandel, or psykisk vold as a review signal.

The acknowledgement may state that the experience should not be dismissed as imagination, as the person being strange, or as a personal defect.

The acknowledgement may state that the material is serious enough to take to human/professional review.

## Minimum-Exposure Rule

The initial acknowledgement should minimize exposure to raw distressing material.

The model should use review-signal, marker, and pattern summaries by default.

The user should not need to manually re-read raw material by default for this acknowledgement layer.

If more context is needed, the model should ask for bounded, non-raw, or user-controlled next steps where possible.

## Insufficient-Marker Boundary

If repeated markers are not sufficient, the model must not say that nothing happened.

If repeated markers are not sufficient, the model must not say that the user was not exposed.

The model may only say that this acknowledgement layer does not support the acknowledgement without more context or human/professional review.

## Forbidden Conclusions

The model must not say:

- “Psykisk misshandel föreligger.”
- “Psykisk vold är juridiskt etablerad.”
- “Du är juridiskt offer.”
- “Motparten är förövare.”
- “Detta bevisar brott.”
- “Du har trauma.”
- “Du är mentalt sjuk.”
- “Du är inte mentalt sjuk.”
- “Materialet är tillräckligt för polisanmälan/inlaga.”
- “Materialet är externt användningsklart.”

The model must not say psychological abuse or psykisk vold is legally established.

The model must not say the user is legally a victim.

The model must not say another person is a perpetrator.

The model must not diagnose trauma, mental illness, narcissism, coercive control, or any clinical state.

The model must not create evidence sufficiency, credibility, risk, police-report, pleading, external-use, or product-candidate conclusions.

## Human Review Boundary

Human/professional review remains the release gate.

The acknowledgement may reduce isolation and organize uncertainty, but it does not replace human/professional review.

The acknowledgement is not legal advice, not clinical advice, not proof, not diagnosis, not victim-status determination, not perpetrator-status determination, not risk scoring, not sufficiency scoring, not police-report generation, not pleading generation, not external-use readiness, and not product-candidate selection.

## Scope Separation

This boundary does not reopen:

- `SWE_PSYKISKT_VALD` legal modelling
- `DK_PSYKISK_VOLD` offence modelling
- SWE/DK comparison
- Nordic comparison
- `SWE_BODELNING`
- runtime behavior
- schemas
- API behavior
- product-candidate selection

Adjacent review-signal, no-raw, no-diagnosis, no-legal/offence/proof/risk/sufficiency, and Gate-001 boundaries may be used only as comparison evidence. They do not define this acknowledgement boundary unless a later separately approved slice freezes that relationship.
