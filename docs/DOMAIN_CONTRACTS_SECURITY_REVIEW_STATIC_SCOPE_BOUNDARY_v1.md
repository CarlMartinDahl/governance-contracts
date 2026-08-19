# Security Review Static Scope Boundary

## Status

Boundary name: `SECURITY_REVIEW_STATIC_SCOPE_BOUNDARY`.

Status: `DOCS_ONLY`.

Purpose: freeze static security-review scope only, based on the completed `SECURITY_REVIEW_PENTEST_AGENT_STATIC_SCOPE_INVENTORY`.

It records the completed PROVE_ONLY static scope inventory.

It defines static security-review scope only.

It records static review surfaces as scope candidates only.

It does not perform a security review.

It does not create findings.

It does not create vulnerability findings.

It does not assign severity.

It does not recommend remediation.

It does not implement remediation.

It does not run tools, scanners, audits, app startup, network probes, or dynamic testing.

It does not run `npm audit`.

It does not contact external, third-party, preview, staging, or production targets.

It does not authorize active pentest.

It does not authorize dynamic testing.

It does not authorize runtime/API/schema/package behavior changes.

It does not authorize product-candidate selection.

It does not authorize external-use readiness.

It does not authorize release approval.

It does not authorize runtime certification.

It does not authorize safety certification.

It does not authorize legal/professional verification.

It does not authorize clinical review.

It does not authorize evidentiary proof.

It does not authorize case-truth, legal, clinical, or evidentiary conclusions.

## Current Statuses

- `SECURITY_REVIEW_STATIC_SCOPE_BOUNDARY`
- `DOCS_ONLY`
- `STATIC_SECURITY_REVIEW_SCOPE_ONLY`
- `PROVE_ONLY_STATIC_SCOPE_INVENTORY_COMPLETED`
- `STATIC_SECURITY_REVIEW_NOT_EXECUTED`
- `NO_SECURITY_FINDINGS_CREATED`
- `NO_VULNERABILITY_FINDINGS_CREATED`
- `NO_SEVERITY_ASSIGNED`
- `NO_REMEDIATION_RECOMMENDED`
- `NO_REMEDIATION_IMPLEMENTED`
- `SECURITY_TOOLS_NOT_RUN`
- `SCANNERS_NOT_RUN`
- `NPM_AUDIT_NOT_RUN`
- `DYNAMIC_TESTING_NOT_AUTHORIZED`
- `APP_NOT_STARTED`
- `EXTERNAL_TARGET_TESTING_NOT_AUTHORIZED`
- `THIRD_PARTY_TARGET_TESTING_NOT_AUTHORIZED`
- `RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED`
- `REAL_PRIVATE_RUN_NOT_AUTHORIZED`
- `SOURCE_INSPECTION_NOT_AUTHORIZED`
- `RAW_PRIVATE_MATERIAL_INSPECTION_NOT_AUTHORIZED`
- `METADATA_ACQUISITION_NOT_AUTHORIZED`
- `EXTERNAL_USE_NOT_AUTHORIZED`
- `PRODUCT_CANDIDATE_NONE`
- `HUMAN_PROFESSIONAL_REVIEW_REQUIRED`

These statuses are scope-recording statuses only. They do not create a review, finding, vulnerability finding, severity assessment, remediation recommendation, remediation implementation, safety claim, release approval, runtime certification, legal/professional verification, clinical review, evidentiary proof, case-truth conclusion, external-use readiness, or product-candidate selection.

## Static Review Surface Inventory

The following table records the completed PROVE_ONLY inventory as static scope candidates only.

Allowed inventory status values are `FOUND`, `NOT_FOUND`, `UNKNOWN_NOT_EVIDENCED`, and `NOT_SEARCHED_BY_SCOPE`.

| Category | Status | Evidence / Scope Note |
| --- | --- | --- |
| `APPLICATION_ENTRY_POINTS` | `FOUND` | `apps/api/src/index.js`; `packages/database/package.json`; `packages/governance/package.json`; `packages/schemas/package.json` |
| `API_ROUTES_HANDLERS` | `FOUND` | `apps/api/src/index.js` |
| `AUTH_SESSION_AUTHENTICATION` | `FOUND` | Auth helper found in `apps/api/src/index.js`; CORS/cookie/session config remains `NOT_FOUND` below |
| `AUTHORIZATION_ACCESS_CONTROL` | `FOUND` | `apps/api/src/index.js` |
| `CASE_CONTEXT_ACCESS_CONTROL` | `FOUND` | `apps/api/src/index.js` |
| `SCHEMA_VALIDATOR_SURFACES` | `FOUND` | `packages/schemas/src/index.js`; `packages/governance/src/index.js` |
| `INPUT_PARSING_VALIDATION` | `FOUND` | `apps/api/src/index.js`; `packages/database/src/index.js` |
| `DATABASE_PERSISTENCE` | `FOUND` | `packages/database/src/index.js`; `packages/database/migrations/` |
| `EXPORT_PACKAGE_ARTIFACT_SURFACES` | `FOUND` | `apps/api/src/index.js`; `packages/governance/src/index.js` |
| `FILE_UPLOAD_DOWNLOAD` | `FOUND` | Download routes found in `apps/api/src/index.js`; upload routes `NOT_FOUND` |
| `WEBHOOK_SURFACES` | `NOT_FOUND` | Webhook surfaces not found in searched paths |
| `LOGGING_AUDIT_SURFACES` | `UNKNOWN_NOT_EVIDENCED` | Script console logging only found in `scripts/build.mjs` and `scripts/lint.mjs`; formal audit-log implementation evidence `UNKNOWN_NOT_EVIDENCED` |
| `ENVIRONMENT_SECRET_HANDLING` | `UNKNOWN_NOT_EVIDENCED` | Complete secret/env handling evidence `UNKNOWN_NOT_EVIDENCED`; no secret-like values are recorded here |
| `DEPENDENCY_MANIFESTS_LOCKFILES` | `FOUND` | Dependency manifests found in `package.json`, `packages/database/package.json`, `packages/governance/package.json`, `packages/schemas/package.json`; dependency lockfiles `NOT_FOUND` |
| `CI_CD_CONFIG` | `NOT_FOUND` | `.github` CI/CD config `NOT_FOUND` |
| `CONTAINER_DOCKER_IAC` | `NOT_FOUND` | Docker/container/IaC evidence `NOT_FOUND` |
| `SECURITY_CONFIG_HEADERS_CORS_COOKIE_SESSION` | `UNKNOWN_NOT_EVIDENCED` | Response header surface found in `apps/api/src/index.js`; CORS/cookie/session config `NOT_FOUND` |
| `AI_AGENT_TOOLING_CONTROL_SURFACES` | `FOUND` | `docs/DOMAIN_CONTRACTS_SECURITY_REVIEW_PENTEST_AGENT_READINESS_BOUNDARY_v1.md`; `docs/TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT_BOUNDARY_v1.md` |
| `GENERATED_ARTIFACT_PDF_ARCHIVE_BOUNDARIES` | `FOUND` | `packages/governance/src/index.js`; `docs/TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE_v1.md`; `docs/DOMAIN_CONTRACTS_SECURITY_REVIEW_PENTEST_AGENT_READINESS_BOUNDARY_v1.md` |
| `GOVERNANCE_BOUNDARIES_RELEVANT_TO_SECURITY_REVIEW` | `FOUND` | `docs/DOMAIN_CONTRACTS_SECURITY_REVIEW_PENTEST_AGENT_READINESS_BOUNDARY_v1.md`; `docs/DOMAIN_CONTRACTS_DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY_v1.md`; `docs/TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE_v1.md` |

## Absent / Unknown Inventory Entries

- Webhook surfaces: `NOT_FOUND`.
- Upload routes: `NOT_FOUND`.
- `.github` CI/CD config: `NOT_FOUND`.
- Docker/container/IaC: `NOT_FOUND`.
- Dependency lockfiles: `NOT_FOUND`.
- CORS/cookie/session config: `NOT_FOUND`.
- Complete secret/env handling evidence: `UNKNOWN_NOT_EVIDENCED`.
- Formal audit-log implementation evidence: `UNKNOWN_NOT_EVIDENCED`.

`NOT_FOUND` is limited to the searched paths and the completed PROVE_ONLY inventory scope.

`UNKNOWN_NOT_EVIDENCED` remains unresolved and must not be treated as proof.

## Gaps Preserved

- No full static security review report yet.
- No threat model execution.
- No severity findings authorized.
- No vulnerability absence proof.
- No safety certification.
- No dependency vulnerability audit.
- No tool/scanner output.
- Retention/deletion/encryption/audit logs/role permissions remain unresolved.
- No dependency lockfile found.
- No CI/container evidence found.
- No complete secret/env handling evidence.
- No formal audit-log implementation evidence.

## Next Slice Recommendation

A future static security review is safe to consider only after separate explicit authorization.

This boundary does not authorize that review now.

The next possible safe slice may be:

- `PROVE_ONLY_STATIC_SECURITY_REVIEW_REPORT_WITHOUT_TOOLS_FINDINGS_SEVERITY_OR_REMEDIATION`
- continued pause

The possible PROVE_ONLY report must remain without tools, findings, severity, remediation, dynamic testing, app startup, network probes, target contact, release approval, external-use readiness, product-candidate selection, runtime certification, safety certification, legal/professional verification, clinical review, evidentiary proof, or case-truth conclusions unless separately authorized by a later boundary.

## Blocked / Must-Not-Use Actions

The following statuses are blocked / must-not-use language only. They do not create facts, findings, authorization, review execution, tool execution, target contact, remediation, behavior change, delivery, certification, proof, or conclusions:

- `STATIC_SECURITY_REVIEW_EXECUTED`
- `SECURITY_FINDING_CREATED`
- `VULNERABILITY_FINDING_CREATED`
- `SEVERITY_ASSIGNED`
- `REMEDIATION_RECOMMENDED`
- `REMEDIATION_IMPLEMENTED`
- `ACTIVE_PENTEST_STARTED`
- `SECURITY_TOOL_EXECUTED`
- `SCANNER_EXECUTED`
- `NPM_AUDIT_RUN`
- `DEPENDENCY_VULNERABILITY_SCANNER_RUN`
- `DYNAMIC_TESTING_STARTED`
- `APP_STARTED`
- `NETWORK_PROBE_EXECUTED`
- `EXTERNAL_TARGET_CONTACTED`
- `THIRD_PARTY_TARGET_TESTED`
- `PREVIEW_STAGING_TARGET_TESTED`
- `PRODUCTION_TARGET_TESTED`
- `DESTRUCTIVE_TESTING_PERFORMED`
- `PERSISTENCE_CREATED`
- `DATA_EXFILTRATED`
- `DENIAL_OF_SERVICE_ATTEMPTED`
- `CREDENTIAL_STUFFING_ATTEMPTED`
- `BRUTE_FORCE_ATTEMPTED`
- `UNSAFE_EXPLOITATION_ATTEMPTED`
- `REAL_USER_CREDENTIALS_USED`
- `SOURCE_CODE_MODIFIED`
- `RUNTIME_BEHAVIOR_CHANGED`
- `API_BEHAVIOR_CHANGED`
- `SCHEMA_CHANGED`
- `PACKAGE_IMPLEMENTATION_CHANGED`
- `VALIDATOR_DISPATCH_CREATED`
- `REGISTRY_LOOKUP_CREATED`
- `REAL_PRIVATE_RUN_STARTED`
- `SOURCE_INSPECTION_STARTED`
- `SOURCE_PACKAGE_INSPECTED`
- `RAW_PRIVATE_MATERIAL_INSPECTED`
- `METADATA_ACQUIRED`
- `PDF_IMAGE_METADATA_SOURCE_PACKAGE_INSPECTED`
- `PDF_PACKET_CREATED`
- `ARCHIVE_ZIP_CREATED`
- `DELIVERY_TO_EXTERNAL_REVIEWER_PREPARED`
- `MATERIAL_SENT_TO_EXTERNAL_REVIEWER`
- `GENERATED_PDF_TREATED_AS_REPO_EVIDENCE`
- `GENERATED_PDF_TREATED_AS_PACKET_COMPONENT`
- `EXTERNAL_USE_READY`
- `PRODUCT_CANDIDATE_SELECTED`
- `RELEASE_APPROVAL_CLAIMED`
- `RUNTIME_CERTIFICATION_CLAIMED`
- `TECHNICAL_SIGN_OFF_CLAIMED`
- `SAFETY_CERTIFICATION_CLAIMED`
- `LEGAL_PROFESSIONAL_VERIFICATION_CLAIMED`
- `CLINICAL_REVIEW_CLAIMED`
- `EVIDENTIARY_PROOF_CLAIMED`
- `CASE_TRUTH_CLAIM_CREATED`
- `CREDIBILITY_FINDING_CREATED`
- `OFFENCE_FINDING_CREATED`
- `OWNERSHIP_FINDING_CREATED`
- `RISK_SCORE_CREATED`
- `SUFFICIENCY_SCORE_CREATED`
- `POLICE_REPORT_TEXT_CREATED`
- `PLEADING_TEXT_CREATED`
- `MARKER_FINDING_CREATED`

These blocked statuses must not be emitted as active findings or active conclusions.

## Prior Boundaries Not Bypassed

This boundary references and does not bypass:

- `SECURITY_REVIEW_PENTEST_AGENT_READINESS_BOUNDARY`
- `TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT_BOUNDARY`
- `EXCLUDED_PRIVATE_REVIEW_ARTIFACT`
- `EXCLUDED_PRIVATE_REVIEW_ARTIFACT`
- `DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY`
- `PRIVATE_LARGE_SOURCE_RUN_READINESS_BOUNDARY`
- `LOCAL_REAL_PRIVATE_RUN_MANUAL_DECISION_RECORD`
- `TRAUMA_MINIMIZING_LAYERED_SOURCE_NAVIGATION_BOUNDARY`
- `TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE`
- `EXCLUDED_PRIVATE_REVIEW_ARTIFACT`
- `EXCLUDED_PRIVATE_REVIEW_ARTIFACT`
- `EXCLUDED_PRIVATE_REVIEW_ARTIFACT`
- `EXCLUDED_PRIVATE_REVIEW_ARTIFACT`

These boundaries remain active constraints. They are comparison context only and do not authorize static security review execution, active pentest, tool execution, scanner execution, `npm audit`, dependency vulnerability audits, dynamic testing, app startup, network probes, target contact, remediation, behavior changes, real private run, source inspection, raw/private material inspection, metadata acquisition, generated PDF evidence use, packet component approval, external-use readiness, product-candidate selection, release approval, runtime certification, safety certification, legal/professional verification, clinical review, evidentiary proof, or case-truth conclusions.

## Non-Proof And No-Overclaim Rules

Static scope boundary is not static security review execution.

Static scope boundary is not active pentest.

Static scope boundary is not tool execution.

Static scope boundary is not scanner execution.

Static scope boundary is not dependency vulnerability audit.

Static scope boundary is not dynamic testing.

Static scope boundary is not vulnerability finding.

Static scope boundary is not severity assessment.

Static scope boundary is not remediation recommendation.

Static scope boundary is not remediation implementation.

Static scope boundary is not vulnerability absence proof.

Static scope boundary is not safety certification.

Static scope boundary is not release approval.

Static scope boundary is not runtime certification.

Static scope boundary is not technical sign-off.

Static scope boundary is not production assurance.

Static scope boundary is not external-use readiness.

Static scope boundary is not product-candidate selection.

Static scope boundary is not legal/professional verification.

Static scope boundary is not clinical review.

Static scope boundary is not evidentiary proof.

Inventory status `FOUND` is not a finding of vulnerability.

Inventory status `NOT_FOUND` is not proof of absence unless limited to searched scope.

Inventory status `UNKNOWN_NOT_EVIDENCED` must remain unresolved.

Human/professional review remains release gate.

DOCS_ONLY is not runtime enforcement.

Test evidence is not runtime certainty.

Hash/manifest/ZIP validation is not truth proof.

Package integrity is not legal/clinical/evidentiary proof.

## No-Reopening Rules

This boundary does not reopen:

- SWE bodelning
- DK psykisk vold offence modelling
- SWE psykiskt våld legal modelling
- Nordic comparison
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
- manifest instance creation
- manifest population
- test fixture instance creation
- product-candidate selection
- external-use readiness
- runtime behavior
- API behavior
- schema behavior
- package implementation behavior
- validator dispatch
- registry/lookup/generic dispatch
- packet component approval
- direct packet addition
- supplemental packet creation
- supplemental markdown addendum creation
- addendum creation approval
- excluded private-review packet markdown update
- excluded private-review packet manifest update
- excluded private-review packet TOC update
- excluded private-review reference index update
- material delivery to External Reviewer
- generated PDF as repo evidence
- generated PDF as packet component
- active pentest
- security tool execution
- scanner execution
- dependency vulnerability audit
- dynamic testing
- external target testing
- destructive testing
- source-code remediation implementation
- vulnerability findings
- severity assessment

## Extension Rule

Any future static security review, security report, pentest, tool execution, scanner execution, dependency vulnerability audit, dynamic testing, app startup, network probing, target contact, source-code remediation, behavior change, delivery, external-use readiness, product-candidate selection, release approval, certification, verification, proof, finding, severity assessment, or conclusion requires separate explicit authorization, a narrowed boundary, and proof that prior data-handling, private-run, source-inspection, generated-PDF, external-use, product-candidate, and human/professional review gates are not bypassed.
