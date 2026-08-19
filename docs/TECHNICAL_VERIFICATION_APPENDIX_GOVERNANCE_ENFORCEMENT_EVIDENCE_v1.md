# Technical Verification Appendix: Governance Enforcement Evidence

## Status

Appendix name: `TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE`.

Status: `DOCS_ONLY`.

This is a technical verification appendix and evidence scaffold.

It inventories existing repo evidence only and classifies controls by current enforcement/evidence level.

It is not legal advice, not evidence, not diagnosis, not runtime certification, not external-use approval, and not product-candidate selection.

It does not create runtime behavior.

It does not create schema changes.

It does not create API behavior.

It does not implement package intake.

It does not inspect or authorize inspection of raw source material.

It must not be used to overclaim runtime enforcement where the repo only evidences docs, workflow, or test scaffolding.

## Enforcement/Evidence Levels

The implemented-vs-`DOCS_ONLY` matrix uses these levels:

- `runtime-enforced`
- `schema-enforced`
- `prompt/workflow-enforced`
- `human-workflow-enforced`
- `DOCS_ONLY`
- `unknown / not evidenced`

## Implemented-vs-DOCS_ONLY Matrix

| Control / gate | Current evidence level | Existing evidence source | Limitation / not proven |
| --- | --- | --- | --- |
| Supported-profile capability gates | `runtime-enforced` | `packages/governance/src/index.js` capability guard; `docs/API_CONTRACTS_GOVERNANCE_v1.md` supported-profile registry references; route and helper tests | Does not prove every future profile or capability is covered. |
| Authenticated route access and case-context gating | `runtime-enforced` | `apps/api/src/index.js`; `tests/*-api.test.js`; route-edge doc-freeze tests | Does not prove a formal global access-control threat model. |
| Jurisdiction/profile mismatch rejection | `runtime-enforced` | API route mismatch branches and tests; governance contract route sections | Does not prove all possible upstream data drift modes. |
| Snapshot currentness gates | `runtime-enforced` | `snapshot_status` contracts, route currentness errors, projection tests | Does not prove currentness beyond documented surfaces. |
| Manifest/archive consistency and ZIP assembly | `runtime-enforced` | governance manifest helpers, final bundle/archive helper, ZIP helper, related tests | Integrity checks do not prove truth, legal meaning, clinical meaning, credibility, or sufficiency. |
| Schema validation and validator dispatch | `schema-enforced` | `schemas/*.json`; `packages/schemas/src/index.js`; validator-dispatch and schema-helper tests | Does not prove legal, clinical, evidentiary, or product readiness. |
| Operating guard and work modes | `prompt/workflow-enforced` | `AGENTS.md`; local work-mode rules | Depends on process adherence; not runtime enforcement. |
| Human/professional review release gate | `human-workflow-enforced` | professional-review-only and Gate-001 docs; local operating rules | Mostly docs/workflow enforced; not automatic external release approval. |
| Gate-001 no-raw package intake boundary | `DOCS_ONLY` | `7600167 docs(domain): freeze Gate-001 no-raw package intake boundary`; Gate-001 doc and proof test | Does not implement package intake, runtime checks, schema checks, or external-use readiness. |
| Trauma-informed acknowledgement without conclusion boundary | `DOCS_ONLY` | `4729d2e docs(domain): freeze trauma-informed acknowledgement boundary`; trauma acknowledgement doc and proof test | Does not implement runtime behavior or prove any legal, clinical, evidentiary, victim-status, perpetrator-status, diagnosis, risk, or sufficiency conclusion. |
| SWE bodelning professional-review-only gate | `DOCS_ONLY` | `422548a docs(domain): freeze SWE bodelning professional review gate` | Historical boundary reference only; not current HEAD. |
| Formal threat model | `unknown / not evidenced` | No single formal threat model appendix found in repo evidence inventory | Needs separate approved slice if required. |
| Retention, deletion, encryption, audit logs, role permissions, third-party model/API status | `unknown / not evidenced` | No complete repo evidence found in this inventory | Must remain open questions unless later evidence proves them. |
| Unified Technical Verification Appendix | `DOCS_ONLY` | This appendix scaffold | This scaffold inventories evidence; it is not runtime certification. |

## Existing Evidence Inventory

### Operating Guard / Work Modes

- `AGENTS.md` records fail-closed operation, `PROVE_ONLY`, `DOCS_ONLY`, `CONTRACT_ONLY`, and `RUNTIME_CHANGE` modes.
- `AGENTS.md` records the human release gate.
- Evidence level: `prompt/workflow-enforced`.

### Runtime/API Governance Baseline

- `docs/API_CONTRACTS_GOVERNANCE_v1.md` records the runtime/API governance baseline for supported profile surfaces, supported-profile registry, and fail-closed capability behavior.
- `apps/api/src/index.js` contains route-level error branches for unsupported profile, mismatch, and not-current conditions.
- Evidence level: `runtime-enforced` for the documented and tested surfaces only.

### Runtime Route / Access Evidence

- `docs/API_CONTRACTS_GOVERNANCE_v1.md` records authenticated/case-access-controlled route-edge behavior for profile input, release eval, profile dossier, export package, bundle/package manifest, final bundle/archive latest-read, refresh, and delivery seams.
- API tests under `tests/*-api.test.js` provide route proof for the documented surfaces.
- Evidence level: `runtime-enforced` for documented route surfaces; broader access model remains `unknown / not evidenced`.

### Schema / Validator Evidence

- Schema files under `schemas/` define machine-readable surfaces.
- `packages/schemas/src/index.js` exports validator dispatch and validation helpers.
- Tests such as `tests/validator-dispatch-doc-freeze.test.js`, `tests/schemas-validation-helper-doc-freeze.test.js`, and family-specific schema tests provide proof.
- Evidence level: `schema-enforced`.

### Manifest / ZIP / Reproducibility Evidence

- `packages/governance/src/index.js` contains canonical JSON, SHA256 fingerprint, bundle/package manifest, and stored ZIP helper evidence.
- `docs/API_CONTRACTS_GOVERNANCE_v1.md` documents manifest, final bundle/archive, latest-read, refresh, and delivery seams.
- Related tests cover manifest, archive, projection, and delivery behavior.
- Evidence level: `runtime-enforced` and `schema-enforced` for documented artifact surfaces only.

### DOCS_ONLY No-Raw / Review Gates

- `docs/DOMAIN_CONTRACTS_GATE_001_NO_RAW_CLASSIFICATION_PACKAGE_INTAKE_BOUNDARY_v1.md` freezes Gate-001 no-raw package intake as `DOCS_ONLY`.
- `docs/DOMAIN_CONTRACTS_TRAUMA_INFORMED_INITIAL_ACKNOWLEDGEMENT_WITHOUT_CONCLUSION_BOUNDARY_v1.md` freezes trauma-informed acknowledgement as `DOCS_ONLY`.
- `docs/DOMAIN_CONTRACTS_SWE_BODELNING_PROFESSIONAL_REVIEW_ONLY_GATE_v1.md` and `docs/DOMAIN_CONTRACTS_SWE_BODELNING_EXTERNAL_USE_REDACTION_AND_OMBUD_REVIEW_GATE_v1.md` provide review-only and external-use redaction boundaries.
- Evidence level: `DOCS_ONLY` and `human-workflow-enforced`.

### Proof Tests For Current Boundaries

- `tests/domain-gate-001-no-raw-classification-package-intake-boundary-doc-freeze.test.js` verifies the Gate-001 no-raw package intake boundary.
- `tests/domain-trauma-informed-initial-acknowledgement-without-conclusion-boundary-doc-freeze.test.js` verifies the trauma-informed acknowledgement boundary.
- Evidence level: proof tests for `DOCS_ONLY` boundaries.

### Privacy / Redaction / Human Workflow Evidence

- Professional-review-only and external-use redaction docs require human/professional review and restrict external use.
- Redaction and privacy boundaries are documented, but they do not create automatic release approval.
- Evidence level: `human-workflow-enforced` and `DOCS_ONLY`.

### Test Matrix Candidates

Candidate test families include:

- `tests/*-api.test.js`
- `tests/*validator-dispatch*.test.js`
- `tests/*schema*.test.js`
- `tests/*bundle-manifest*.test.js`
- `tests/*bundle-archive*.test.js`
- `tests/*traceability*.test.js`
- `tests/*stop-outcome*.test.js`
- `tests/*stop-matrix*.test.js`
- `tests/domain-*-doc-freeze.test.js`

These are evidence candidates for a later complete technical verification appendix. This scaffold does not assert that every candidate is complete or exhaustive.

## Control Classification Summary

- `runtime-enforced`: evidenced for supported-profile capability gates, route access, mismatch rejection, currentness gates, manifest/archive consistency, and ZIP assembly.
- `schema-enforced`: evidenced through schema files, validator dispatch, and schema validation helper tests.
- `prompt/workflow-enforced`: evidenced through `AGENTS.md`, `DOCS_ONLY` boundaries, and local operating rules.
- `human-workflow-enforced`: evidenced as a required release gate, mostly through docs/workflow controls.
- `DOCS_ONLY`: strongly evidenced for Gate-001, trauma acknowledgement, professional-review-only, and external-use redaction.
- `unknown / not evidenced`: formal threat model, retention policy, third-party model/API status, and any complete unified appendix beyond this scaffold.

## Test Evidence Matrix Scaffold

| Control / gate | Input pressure / risk | Expected blocker/status | Actual evidence source | Test/doc reference | Evidence level | Limitations / not proven |
| --- | --- | --- | --- | --- | --- | --- |
| Supported-profile capability gate | Unsupported profile/capability | Machine-readable unsupported status | Governance capability guard and API branches | `packages/governance/src/index.js`; `apps/api/src/index.js`; related tests | `runtime-enforced` | Does not prove future capabilities. |
| Route access gate | Missing or denied case access | Authentication/access error | API route helper and route tests | `apps/api/src/index.js`; `tests/*-api.test.js` | `runtime-enforced` | No formal global threat model. |
| Schema validation gate | Invalid persisted or API payload | Schema validation error | `schemas/`; `packages/schemas/src/index.js` | schema and validator tests | `schema-enforced` | Does not prove legal or clinical meaning. |
| Snapshot currentness gate | Stale or mismatched projection | Not-current or mismatch status | API route branches and projection helpers | snapshot/currentness tests | `runtime-enforced` | Limited to documented surfaces. |
| Gate-001 no-raw boundary | Raw source or private detail emission | Blocked by no-raw docs boundary | Gate-001 boundary doc | Gate-001 proof test | `DOCS_ONLY` | No runtime package-intake implementation. |
| Trauma acknowledgement boundary | Overclaiming conclusion or raw re-reading | Validation-without-conclusion only | Trauma acknowledgement doc | Trauma proof test | `DOCS_ONLY` | No runtime behavior. |
| Human/professional release gate | External release pressure | Human/professional review required | Professional-review-only and external-use redaction docs | domain doc-freeze tests | `human-workflow-enforced` | Not automatic release approval. |
| Reproducibility/integrity gate | Manifest, hash, ZIP, or table drift | Integrity mismatch or review blocker | Manifest/ZIP/canonical JSON helpers | manifest/archive tests | `runtime-enforced` / `schema-enforced` | Integrity is not truth/legal/clinical proof. |

## Sanitized No-Raw Trace Scaffold

This trace scaffold is generic and no-raw.

| Trace step | Allowed generic status |
| --- | --- |
| Authorized scope | Declared work mode and approved boundary only |
| Source universe declaration | Source family or package layer declared without raw source emission |
| Signal candidate / review candidate | Marker, pattern, governance, source, privacy, or professional-review class only |
| Counter-context | Counter-context required, missing, or bounded for human review |
| Privacy blocker | Redaction, minimization, or no-raw blocker recorded |
| No-conclusion status | `VALIDATION_WITHOUT_CONCLUSION` or equivalent no-conclusion boundary |
| Human/professional review required | Release gate remains human/professional review |

The trace scaffold must not include raw text, source locators, filenames, private facts, sensitive dates, page references, URLs/tokens, medical details, intimate details, child details, third-party details, legal conclusions, clinical conclusions, evidentiary conclusions, credibility findings, marker findings, source-window findings, risk scores, sufficiency scores, police-report text, pleading text, external-use readiness, or product-candidate selection.

## Failure-Mode Register Scaffold

| Failure mode | Expected blocker |
| --- | --- |
| `RAW_CONTENT_LEAK` | Block raw emission and stop for no-raw review. |
| `SCOPE_LEAK` | Stop and return to approved work mode/scope. |
| `LEGAL_CONCLUSION_LEAK` | Block legal conclusion and preserve human/professional review gate. |
| `CLINICAL_DIAGNOSIS_LEAK` | Block diagnosis and preserve clinical non-conclusion boundary. |
| `MISSING_SOURCE_DECLARATION` | Stop until source universe or package layer is declared. |
| `METADATA_AS_PROOF` | Block proof overclaim; metadata remains process/integrity context only. |
| `MARKER_FINDING_LEAK` | Reframe as review-signal or stop for human/professional review. |
| `EXTERNAL_USE_LEAK` | Block external-use readiness and route to review/redaction gate. |
| `PRODUCT_CANDIDATE_LEAK` | Block product-candidate selection without explicit manual decision. |

## Threat Model Scaffold

| Threat | Current treatment |
| --- | --- |
| Prompt injection | `prompt/workflow-enforced`; formal threat model is `unknown / not evidenced`. |
| User steering / overbroad waiver | Fail-closed work modes and scope limits; no broad waiver by default. |
| Cherry-picking | Source universe and counter-context controls should be declared; complete enforcement is `unknown / not evidenced`. |
| Hallucinated source review | No-raw and source-declaration boundaries require evidence/source status before claims. |
| Raw-content leakage | Gate-001 and no-raw boundaries block raw emission at docs/workflow level. |
| Model overconfidence | Fail-closed principles and validation-without-conclusion boundaries block overclaiming. |
| Incomplete source universe | Stop or mark missing source/provenance context. |
| Unauthorized external use | External-use redaction and human/professional review gates block readiness claims. |
| Gate conflict | Stop and classify conflict rather than silently resolving. |
| `DOCS_ONLY` mistaken for runtime enforcement | This appendix explicitly classifies `DOCS_ONLY` separately from runtime enforcement. |

## Data Handling Open Questions

The following remain `unknown / not evidenced` unless later live repo evidence proves otherwise:

- retention
- access control beyond currently documented route/case-access behavior
- encryption
- audit logs
- deletion
- role permissions
- raw-material routing
- third-party model/API status

These open questions must not be treated as satisfied by this appendix.

## Reproducibility Section

Existing reproducibility evidence categories:

- manifests
- SHA256
- ZIP validation
- canonical JSON
- table validation
- repo status
- generated artifact list

Integrity and reproducibility checks can support technical review of artifact consistency.

Integrity and reproducibility checks are not truth proof, legal proof, clinical proof, evidentiary sufficiency, credibility proof, offence proof, ownership proof, risk proof, external-use approval, runtime safety certification, or product readiness.

Archive integrity, checksum validation, manifest validation, ZIP validation, table validation, and generated artifact lists must remain process evidence only unless a later approved slice creates a narrower machine-enforced contract.

## Boundaries Preserved

This appendix preserves:

- no legal conclusions
- no clinical conclusions
- no evidentiary conclusions
- no credibility findings
- no offence findings
- no ownership findings
- no risk/sufficiency scoring
- no police-report/pleading generation
- no external-use readiness
- no product-candidate selection
- human/professional review remains release gate

This appendix does not reopen:

- `SWE_BODELNING`
- `DK_PSYKISK_VOLD` offence modelling
- `SWE_PSYKISKT_VALD` legal modelling
- Nordic comparison
- runtime
- schemas
- API
- package implementation
- product-candidate selection

## Current Committed Boundary References

- Gate-001 no-raw package intake boundary: `7600167 docs(domain): freeze Gate-001 no-raw package intake boundary`.
- Trauma-informed acknowledgement without conclusion boundary: `4729d2e docs(domain): freeze trauma-informed acknowledgement boundary`.
- Historical SWE bodelning professional-review-only gate: `422548a docs(domain): freeze SWE bodelning professional review gate`.

`422548a` is a historical SWE bodelning professional-review-only gate reference where applicable. It is not the current HEAD for this appendix.
