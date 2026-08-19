# Model Information Principles v1

## Purpose

This repository's model is an information-structuring and fail-closed system. It does not
predict legal outcomes. It does not replace lawyer, police, prosecutor, or court judgment.
Its role is to structure, validate, block, and trace information under documented
machine-readable rules so that human legal actors remain the final interpreters.

This document is the canonical source for future contract work that needs shared model
principles, semantic fact categories, or stop behavior.

## Layer Separation

The model is separated into three layers:

1. `fact intake`
   Collect and normalize inputs, references, supporting material, and other structured
   information without silently filling meaning that is not present.
2. `rule evaluation`
   Apply documented machine-readable rules to the structured information and derive canonical
   blocked/current outputs, projections, and traceable status.
3. `human legal interpretation`
   Assess legal significance, contextual meaning, credibility, admissibility, proportionality,
   and final judgment outside the model.

## Fail-Closed Principle

When required meaning, support, or consistency is missing, ambiguous, disputed in a critical
way, or otherwise not yet modeled, the system must stop or block rather than guess, predict,
or infer a confident legal conclusion.

## First Semantic Fact Model

The first machine-readable semantic fact framework uses these dimensions for information
quality:

The canonical reusable schema surface for this v1 semantic fact object is defined in
`schemas/semantic-fact-model.json`, exported through `packages/schemas`, and contains exactly
these five dimension fields in a minimal root object.

| Dimension | Values | Meaning |
| --- | --- | --- |
| `presence_status` | `present` \| `missing` | Whether the required information exists in the structured input. |
| `source_status` | `sourced` \| `unsourced` | Whether the information is tied to a traceable source, reference, exhibit, or evidence object. |
| `verification_status` | `verified` \| `unverified` | Whether the information has been validated or remains provisional. |
| `dispute_status` | `disputed` \| `undisputed` | Whether competing claims or unresolved contradiction challenge the information. |
| `consistency_status` | `consistent` \| `inconsistent` \| `ambiguous` | Whether the information coheres with other critical information or still carries unresolved ambiguity. |

These dimensions are semantic model categories only. They do not themselves decide legal
outcomes.

## Stop Outcomes

The canonical machine-readable stop outcomes are:

- `blocked`
- `insufficient_input`
- `unsupported`
- `requires_human_review`

The canonical reusable schema surface for this v1 stop-outcome object is defined in
`schemas/stop-outcome-model.json`, exported through `packages/schemas`, and uses a
minimal root object with exactly one required `stop_outcome` field that accepts only
these four canonical outcomes.

## Stop Matrix

The model should generally behave as follows:

The canonical reusable schema surface for this v1 stop-matrix object is defined in
`schemas/stop-matrix-model.json`, exported through `packages/schemas`, and uses a
minimal root object with exactly one required `matrix_entries` field. The entry keys are
`missing_required_input`, `unsupported_profile_surface_or_capability`,
`inconsistent_or_ambiguous_critical_information`, and
`unsourced_or_unverified_information_offered_as_settled`, and each entry aligns to one or
more canonical stop-outcome objects from `schemas/stop-outcome-model.json` without adding
runtime logic.

| Condition | Canonical outcome |
| --- | --- |
| Missing required input | `blocked` / `insufficient_input` |
| Unsupported profile, surface, or capability | `unsupported` |
| Inconsistent or ambiguous critical information | `blocked` or `requires_human_review`, depending on documented repo posture |
| Unsourced or unverified information offered as if it were settled | Must not silently become a confident conclusion; stop as `blocked` or `requires_human_review` until the posture is explicitly documented |

This matrix is intentionally principle-based. It does not add substantive legal rules.

## Traceability Principle

The canonical reusable schema surface for this v1 traceability object is defined in
`schemas/traceability-model.json`, exported through `packages/schemas`, and uses a
minimal root object with required `input_references`, `documented_rule_references`, and
`canonical_output_references` arrays. It may also carry optional `change_causes`
enumerated as `changed_input`, `changed_support`, and `changed_rule`, matching the causes
already named in this principle text without adding runtime logic.

Any non-blocked result must be explainable from:

- input
- documented rule
- canonical projection or output

Any material change in result must be traceable to changed input, changed support, or changed
documented rule.

## Relationship To Current Repo

`SWE_BODELNING` and `CMD_PROFILE` currently use this philosophy. Future profiles should define
semantic fact categories before adding substantive rules. Undocumented cases must remain
fail-closed.
