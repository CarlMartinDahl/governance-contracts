# Retention/Deletion Control Specification Boundary v1

Boundary name: `RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY`

Mode: `DOCS_ONLY`

Status: `RETENTION_DELETION_CONTROL_SPECIFICATION_ONLY`

This boundary creates a retention/deletion control specification only.

It is `DOCS_ONLY`.

It is not implementation.

It is not remediation.

It is not a security finding.

It is not a vulnerability finding.

It assigns no severity.

It does not resolve retention.

It does not resolve deletion.

It does not resolve any data-handling blocker.

It does not create implementation evidence.

It does not change runtime/API/schema/package behavior.

It does not choose actual retention periods unless separately authorized.

It does not create purge logic.

It does not create deletion runtime behavior.

It does not authorize real private run.

It does not authorize raw/private/source package inspection.

It does not authorize metadata acquisition.

It does not authorize external-use.

It does not select product candidate.

It preserves human/professional review as release gate.

It preserves that closure criteria are future evidence requirements, not current closure.

It preserves that runtime gate inventory remains deferred.

## Current Statuses

- `RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY`
- `DOCS_ONLY`
- `RETENTION_DELETION_CONTROL_SPECIFICATION_ONLY`
- `RETENTION_SPECIFICATION_NOT_IMPLEMENTATION`
- `DELETION_SPECIFICATION_NOT_IMPLEMENTATION`
- `RETENTION_NOT_RESOLVED`
- `DELETION_NOT_RESOLVED`
- `DATA_HANDLING_BLOCKERS_REMAIN_UNRESOLVED`
- `NO_SECURITY_FINDING_CREATED`
- `NO_VULNERABILITY_FINDING_CREATED`
- `NO_SEVERITY_ASSIGNED`
- `NO_REMEDIATION_RECOMMENDED`
- `NO_REMEDIATION_IMPLEMENTED`
- `NO_BLOCKER_RESOLVED`
- `NO_IMPLEMENTATION_EVIDENCE_CREATED`
- `RETENTION_PERIODS_NOT_SELECTED`
- `PURGE_LOGIC_NOT_CREATED`
- `DELETION_RUNTIME_BEHAVIOR_NOT_CREATED`
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
- `RUNTIME_GATE_INVENTORY_DEFERRED`

## Control Specification Matrix

| Control name | Current evidence level | Specification scope | Required policy decisions | Required implementation evidence | Required test evidence | Closure criteria | Non-authorized until closure |
| --- | --- | --- | --- | --- | --- | --- | --- |
| retention | `EXPLICITLY_UNRESOLVED` | retention policy scope for tracked data classes; retention state/config expectation; expiry/retention decision behavior | define data classes in scope; define retention state vocabulary; define retention trigger/clock source; define whether retention period values are future policy inputs rather than selected here | tracked implementation path for scoped retention state/config; storage or runtime layer where retention decision is enforced; evidence that retention behavior applies only to scoped data classes | tests proving retention state/config is read or applied; tests proving expiry or retention decision behavior for scoped data classes; tests proving no overclaim beyond tested scope | tracked policy, implementation path, and focused tests prove retention behavior for scoped data classes | real private run, external-use, product candidate, release approval, runtime certification, technical sign-off |
| deletion | `EXPLICITLY_UNRESOLVED` | delete/purge/erasure semantics for scoped data classes; storage surfaces in scope; post-delete non-availability expectations | define delete vs purge vs archive; define data classes and storage surfaces in scope; define failure/idempotency expectations; define what remains non-authorized until post-delete behavior is evidenced | tracked implementation path for delete/purge behavior; storage layer or runtime path where deletion is enforced; evidence that deletion behavior applies only to scoped data classes | tests proving delete/purge path; tests proving idempotency or safe repeated deletion behavior; tests proving failure behavior; tests proving post-delete non-availability in scoped storage | tracked implementation and focused tests prove deletion behavior for scoped data classes | real private run, external-use, product candidate, release approval, runtime certification, technical sign-off |

## Evidence References

- `docs/DOMAIN_CONTRACTS_DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_DATA_HANDLING_IMPLEMENTATION_GAP_INVENTORY_STATUS_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY_v1.md`
- `docs/DOMAIN_CONTRACTS_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_STATUS_AND_GAP_SUMMARY_v1.md`
- `[excluded private review artifact]`
- `[excluded private review artifact]`

## No-Overclaim Rules

- this retention/deletion control specification is not implementation
- this retention/deletion control specification is not remediation
- this retention/deletion control specification is not a security assessment finding
- this retention/deletion control specification is not a vulnerability finding
- this retention/deletion control specification assigns no severity
- this retention/deletion control specification recommends no remediation
- closure criteria are future evidence requirements, not current closure
- required implementation evidence is future evidence, not current implementation evidence
- required test evidence is future evidence, not current test evidence
- retention periods are not selected by this boundary
- delete/purge behavior is not implemented by this boundary
- DOCS_ONLY boundaries are not runtime enforcement
- local logs are not CI evidence
- generated PDFs are not repo evidence unless separately reviewed and approved
- hashes/manifests/checksums prove integrity/reproducibility only, not truth/legal/clinical/evidentiary proof
- product candidate remains none
- external-use remains unauthorized
- human/professional review remains release gate
- runtime gate inventory remains deferred

## No-Reopening Rules

This boundary must not reopen:

- runtime implementation
- API behavior change
- schema behavior change
- package implementation behavior
- validator dispatch
- registry/lookup/generic dispatch
- real private run
- source inspection
- raw/private material inspection
- metadata acquisition
- source package inspection
- manifest instance creation
- actual source matrix creation
- test fixture instance creation
- manual External Reviewer delivery
- PDF generation
- PDF packet creation
- archive/ZIP generation
- packet component approval
- generated PDF as repo evidence
- generated PDF as packet component
- committing local logs
- local logs as CI evidence
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

Any references to those categories are blocked-category or non-authorization wording only.

## Next-Slice Posture

The next possible safe slice may be:

- `REVIEW_ONLY_RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY`
- `DOCS_ONLY_RETENTION_DELETION_CONTROL_SPECIFICATION_STATUS_AND_GAP_SUMMARY`
- `PROVE_ONLY_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW`
- continued pause

None are authorized by this boundary.
