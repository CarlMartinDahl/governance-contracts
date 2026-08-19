# Access-Control Threat-Model Inventory Status Boundary

## Status

Boundary name: `ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY`.

Status: `DOCS_ONLY`.

Mode: `ACCESS_CONTROL_THREAT_MODEL_STATUS_ONLY`.

This boundary freezes access-control threat-model inventory status only.

It does not create a security finding.

It does not create a vulnerability finding.

It does not assign severity.

It does not recommend remediation.

It does not implement remediation.

It does not resolve access-control blockers.

It does not create implementation evidence.

It does not change runtime/API/schema/package behavior.

Documented route/case/capability access-control evidence remains partial and limited.

Partial route/case/capability evidence is not a complete global access-control model.

A complete global access-control threat model remains not evidenced.

## Current Status Tokens

- `ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY`
- `DOCS_ONLY`
- `ACCESS_CONTROL_THREAT_MODEL_STATUS_ONLY`
- `AUTH_REQUEST_CONTEXT_PARTIAL_ONLY`
- `TENANT_ISOLATION_PARTIAL_ONLY`
- `CASE_CONTEXT_ACCESS_CONTROL_PARTIAL_ONLY`
- `CAPABILITY_GATES_PARTIAL_ONLY`
- `ROUTE_LEVEL_AUTHORIZATION_PARTIAL_ONLY`
- `OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_NOT_EVIDENCED`
- `FUNCTION_LEVEL_AUTHORIZATION_PARTIAL_ONLY`
- `PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_NOT_EVIDENCED`
- `ROLE_PERMISSIONS_UNRESOLVED`
- `ADMIN_SUPPORT_ACCESS_PATHS_NOT_EVIDENCED`
- `EXPORT_ARTIFACT_DOWNLOAD_BOUNDARIES_PARTIAL_ONLY`
- `DATABASE_QUERY_SCOPING_PARTIAL_ONLY`
- `SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL_ONLY`
- `ALLOWED_ACCESS_TEST_COVERAGE_PARTIAL_ONLY`
- `DENIED_ACCESS_TEST_COVERAGE_PARTIAL_ONLY`
- `CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL_ONLY`
- `COMPLETE_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_NOT_EVIDENCED`
- `CI_SECURITY_AUDIT_EVIDENCE_NOT_EVIDENCED`
- `DOCUMENTED_ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_GLOBAL_ASSURANCE`
- `LOAD_AUTHORIZED_CASE_CONTEXT_PARTIAL_IMPLEMENTATION_TEST_EVIDENCE_ONLY`
- `NO_SECURITY_FINDING_CREATED`
- `NO_VULNERABILITY_FINDING_CREATED`
- `NO_SEVERITY_ASSIGNED`
- `NO_REMEDIATION_RECOMMENDED`
- `NO_REMEDIATION_IMPLEMENTED`
- `RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED`
- `VALIDATOR_DISPATCH_NOT_CREATED`
- `REGISTRY_LOOKUP_NOT_CREATED`
- `REAL_PRIVATE_RUN_NOT_STARTED`
- `RAW_PRIVATE_MATERIAL_NOT_INSPECTED`
- `SOURCE_PACKAGE_NOT_INSPECTED`
- `METADATA_NOT_ACQUIRED`
- `PRODUCT_CANDIDATE_NONE`
- `EXTERNAL_USE_NOT_AUTHORIZED`
- `HUMAN_PROFESSIONAL_REVIEW_REQUIRED`

## Registry Alignment Row IDs

These row IDs are DOCS_ONLY registry alignment anchors.

They do not create access-control implementation, RBAC implementation, a global authorization model, a role/permission model, admin/support runtime access, security findings, vulnerability findings, severity, remediation recommendation, remediation implementation, runtime enforcement, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off.

| Registry row ID | Surface | Alignment posture |
| --- | --- | --- |
| `GAC-TM-001_AUTH_REQUEST_CONTEXT_PARTIAL` | Authentication / request auth context | Partial evidence only; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-002_TENANT_ISOLATION_PARTIAL` | Tenant isolation | Partial evidence only; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-003_CASE_CONTEXT_ACCESS_CONTROL_PARTIAL` | Case-context access control | Partial evidence only; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-004_CAPABILITY_GATES_PARTIAL` | Capability gates | Partial evidence only; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-005_ROUTE_LEVEL_AUTHORIZATION_PARTIAL` | Route-level authorization coverage | Partial evidence only; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-006_OBJECT_LEVEL_BOLA_IDOR_GLOBAL_ANALYSIS_GAP` | Object-level / BOLA / IDOR | Global analysis gap remains not evidenced; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-007_FUNCTION_LEVEL_AUTHORIZATION_PARTIAL` | Function-level authorization | Partial evidence only; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-008_PROPERTY_LEVEL_DATA_OVEREXPOSURE_GLOBAL_ANALYSIS_GAP` | Property-level / data overexposure | Global analysis gap remains not evidenced; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-009_ROLE_PERMISSION_MODEL_GAP` | Role permissions | Role/permission model remains unresolved and not implemented; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-010_ADMIN_SUPPORT_ACCESS_PATHS_GAP` | Admin/support access paths | Admin/support access paths remain not evidenced and not implemented; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-011_EXPORT_ARTIFACT_DOWNLOAD_BOUNDARY_PARTIAL` | Export/artifact/download boundaries | Partial evidence only; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-012_DATABASE_QUERY_SCOPING_PARTIAL` | Database query scoping | Partial evidence only; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-013_SCHEMA_VALIDATOR_ACCESS_CONTROL_CONTRIBUTION_PARTIAL` | Schema/validator contribution | Partial contribution only; schema validators are not access-control policy, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-014_ALLOWED_DENIED_TEST_COVERAGE_PARTIAL` | Allowed/denied access test coverage | Partial test coverage only; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-015_CROSS_TENANT_WRONG_CASE_TEST_COVERAGE_PARTIAL` | Cross-tenant/wrong-case tests | Partial test coverage only; not full access control, RBAC, admin/support access control, global authorization, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |
| `GAC-TM-016_GLOBAL_AUTHORIZATION_MODEL_GAP` | Missing global access-control threat model | Global authorization model remains not evidenced and not created; not full access control, RBAC, admin/support access control, runtime enforcement, security finding, severity, remediation, release approval, external-use authorization, product-candidate selection, runtime certification, or technical sign-off. |

Human/professional review remains required.

## Inventory Status Table

| Category | Status | Evidence summary | Limitation | Unresolved |
| --- | --- | --- | --- | --- |
| Authentication / request auth context | `PARTIAL` | `auth.tenantId` required for documented helper path | Does not prove full session/auth model. | yes |
| Tenant isolation | `PARTIAL` | Tenant/case mismatch denial for documented surfaces | Does not prove global tenant model. | yes |
| Case-context access control | `PARTIAL` | Case context gate exists | Does not prove object-wide policy. | yes |
| Capability gates | `PARTIAL` | Route-required capability check | Does not prove role permission model. | yes |
| Route-level authorization coverage | `PARTIAL` | Helper call sites and documented route families | Does not prove complete route threat model. | yes |
| Object-level / BOLA / IDOR | `NOT_EVIDENCED_GLOBALLY` | Some case-id guarded routes only | Does not prove full BOLA/IDOR analysis. | yes |
| Function-level authorization | `PARTIAL` | Capability per route family | Does not prove function permission matrix. | yes |
| Property-level / data overexposure | `NOT_EVIDENCED_GLOBALLY` | Schema surfaces exist | Does not prove overexposure review. | yes |
| Role permissions | `UNRESOLVED` | Unresolved status preserved | Does not prove role implementation. | yes |
| Admin/support access paths | `NOT_EVIDENCED` | No concrete tracked admin/support access model found in scope | Does not prove absence outside searched scope. | yes |
| Export/artifact/download boundaries | `PARTIAL` | Download routes gated and observed | Does not prove external-use or delivery approval. | yes |
| Database query scoping | `PARTIAL` | Storage keyed by `caseId` | Does not prove tenant scoping in persistence layer. | yes |
| Schema/validator contribution | `PARTIAL` | Exported validators evidenced | Does not prove access-control policy. | yes |
| Allowed-access tests | `PARTIAL` | Representative happy paths for documented surfaces | Does not prove exhaustive allowed matrix. | yes |
| Denied-access tests | `PARTIAL` | Tenant denial examples | Does not prove full denial suite. | yes |
| Cross-tenant/wrong-case tests | `PARTIAL` | Cross-tenant examples | Does not prove global wrong-case coverage. | yes |
| Missing global access-control threat model | `NOT_EVIDENCED` | Gap explicitly preserved | Does not prove complete model. | yes |
| Missing CI/security audit evidence | `NOT_EVIDENCED` | CI/security-audit limits preserved | Does not prove CI/security assurance. | yes |
| Remaining unknowns/blockers | `UNRESOLVED` | Data-handling blockers listed | Does not prove blocker resolution. | yes |

## Evidence References

Tracked evidence references for this status freeze:

- `apps/api/src/index.js`
- `tests/api-error-envelope-doc-freeze.test.js`
- `tests/load-authorized-case-context-doc-freeze.test.js`
- `tests/profile-input-api.test.js`
- `tests/release-eval-run-api.test.js`
- `tests/export-package-api.test.js`
- `tests/profile-input-adapter-registry.test.js`
- `packages/database/src/index.js`
- `[excluded private review artifact]`
- `[excluded private review artifact]`
- `docs/DOMAIN_CONTRACTS_DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_STATIC_SECURITY_CONTROL_OBSERVATION_REPORT_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY_v1.md`

`loadAuthorizedCaseContext` has partial implementation/test evidence only. The documented evidence is limited to auth tenant checking, case context loading, tenant/case denial, and capability/profile checks for documented route/case/capability surfaces.

The route consumers include profile inputs, release eval, profile dossier, export package, manifest, artifacts, refresh, and download families, but helper call sites are not complete route authorization coverage.

Representative allowed, denied, cross-tenant, wrong-case, unsupported-profile, mismatch, stale/currentness, and capability-denial tests exist for documented surfaces only. Route/case tests are not complete threat-model evidence.

## Non-Proof And No-Overclaim Rules

- access-control inventory status boundary is not a security assessment finding
- access-control inventory status boundary is not a vulnerability finding
- access-control inventory status boundary assigns no severity
- access-control inventory status boundary recommends no remediation
- partial route/case/capability evidence is not global access-control assurance
- route/case tests are not complete threat-model evidence
- helper call sites are not complete route authorization coverage
- case-id checks are not full BOLA/IDOR analysis
- schema validators are not access-control policy
- storage keyed by caseId is not tenant-scoped persistence proof
- absence of found evidence is not proof of absence outside searched tracked repo scope
- no access-control blocker is resolved by this boundary
- no runtime behavior changes by this boundary
- no schema/API/package behavior changes by this boundary
- no product candidate is selected
- external-use remains unauthorized
- human/professional review remains release gate

## No-Reopening Rules

This boundary does not reopen:

- manual External Reviewer delivery
- PDF generation
- PDF packet creation
- archive/ZIP generation
- packet component approval
- excluded private-review packet markdown update
- excluded private-review manifest update
- excluded private-review TOC update
- excluded private-review reference index update
- generated PDF as repo evidence
- generated PDF as packet component
- committing local logs
- local logs as CI evidence
- runtime/API/schema/package behavior
- validator dispatch
- registry/lookup/generic dispatch
- real private run
- source inspection
- metadata acquisition
- source package inspection
- actual matrix creation
- manifest instance creation
- test fixture instance creation
- product-candidate selection
- external-use readiness
- release approval
- runtime certification
- technical sign-off
- External Reviewer approval
- legal/clinical/evidentiary/case-truth conclusions
- security findings
- vulnerability findings
- severity
- remediation
- SWE bodelning
- DK psykisk vold offence modelling
- no SWE psykiskt våld legal modelling
- Nordic comparison

## Raw/Private/Conclusion Guard

This boundary contains no raw/private source material.

This boundary contains no source package material.

This boundary creates no legal, clinical, evidentiary, case-truth, credibility, offence, ownership, risk, sufficiency, police-report, pleading, marker-finding, security-finding, vulnerability-finding, severity, remediation, external-use, or product-candidate conclusion.

Any references to those categories are blocked-category or forbidden-category wording only.

## Next Slice Posture

The next possible safe slice may be:

- `PROVE_ONLY_ROLE_PERMISSION_SURFACE_INVENTORY`
- `PROVE_ONLY_EXPORT_ARTIFACT_ACCESS_BOUNDARY_INVENTORY`
- `DOCS_ONLY_ACCESS_CONTROL_THREAT_MODEL_STATUS_AND_GAP_SUMMARY`
- continued pause

None are authorized by this boundary.
