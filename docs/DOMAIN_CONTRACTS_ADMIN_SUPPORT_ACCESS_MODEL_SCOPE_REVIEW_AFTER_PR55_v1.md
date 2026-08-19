# Admin/Support Access Model Scope Review After PR55

Status: `DOCS_ONLY / PROVE_ONLY / SCOPE_REVIEW_ONLY`

Source anchor: `governance/main @ f8ccf0434659de424a3d460ed26998e0b3472484`

Latest marker:
`MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR54`

Identity markers:

- `DOCS_ONLY`
- `PROVE_ONLY`
- `SCOPE_REVIEW_ONLY`
- `NOT_IMPLEMENTATION`
- `NOT_RUNTIME_ENFORCEMENT`
- `NOT_RBAC_IMPLEMENTATION`
- `NOT_ACCESS_CONTROL_IMPLEMENTATION`
- `NOT_ADMIN_SUPPORT_AUTHORIZATION`
- `HUMAN_PROFESSIONAL_REVIEW_REQUIRED`
- `EXTERNAL_USE_NOT_AUTHORIZED`
- `PRODUCT_CANDIDATE_NONE`

## Purpose

This document creates a tracked governance scope review for admin/support
access after the merged RBAC role-permission scope-review registry alignment
chain. It covers admin/support actor boundaries, support-access paths,
privileged-access and bypass risks, separation from owner/maintainer and
professional-review roles, material-class denial posture, cross-boundary risks,
dependency posture, future implementation evidence, future test evidence, and
future-only closure criteria.

This document is review-support only. It creates no implementation, no runtime
behavior, no role or permission grant, no current admin/support access
authorization, no executable schema field, no route decision, no registry
lookup, no validator dispatch, no audit/access-log implementation, no
blocker closure, no readiness approval, and no domain conclusion.

## Source Evidence

Tracked repo files and live git/GitHub state are the evidence base for this
scope review. Chat, pasted summaries, private notes, uploaded conversation
material, private prompt material, and non-repo material are advisory only and
are not copied here as repo truth.

PR #52:

- `docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_v1.md`
- `tests/domain-rbac-role-permission-model-scope-review-after-pr51.test.js`
- `MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51`

PR #53:

- `tests/domain-rbac-role-permission-model-scope-review-after-pr51-alignment.test.js`
- `MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF`

PR #54:

- `packages/governance/src/rbac-role-permission-model-scope-review-registry.js`
- `tests/rbac-role-permission-model-scope-review-registry.test.js`
- `MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_SCAFFOLD_AFTER_PR53`

PR #55:

- `tests/rbac-role-permission-model-scope-review-registry-alignment.test.js`
- `MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR54`

Wiki process anchors:

- `docs/wiki/index.md`
- `docs/wiki/log.md`

## Actor Separation

Admin/support is a separately gated future actor class, not a present
authorization surface.

- admin/support is not an implicit superuser
- admin/support is not equivalent to owner/maintainer
- admin/support is not equivalent to professional reviewer
- support activity does not grant material access
- support identity does not grant route authorization
- support identity does not grant external-use authorization
- support identity does not grant product/release approval
- support identity does not permit self-approval
- support identity does not permit bypass of human/professional review
- support access to raw/private/source material is not authorized
- support access to source packages is not authorized
- support access to PDF/image/screenshot/metadata material is not authorized
- support access across tenant/case/object/function/property boundaries is not authorized
- break-glass access is not authorized or implemented
- impersonation is not authorized or implemented
- direct storage/database/object-store bypass is not authorized or implemented
- role escalation and self-grant are not authorized or implemented
- third-party/provider routing authorization is deny-by-default
- retention/deletion request, execution, and verification must remain separately scoped
- local logs are not CI evidence
- audit/access-log dependency is not audit/access-log implementation
- future closure criteria cannot be satisfied by this document or focused proof test

## Admin/Support Access-Path Scope

`ADMIN_SUPPORT_ACCESS_PATH_SCOPE_JSON_BEGIN`
```json
[
  {
    "category": "Sanitized/no-raw review-support access",
    "posture": "narrow future review-support candidate",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "no raw/private/source material"
  },
  {
    "category": "Redacted review-signal access",
    "posture": "narrow future review-support candidate",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "redacted signals only if separately evidenced"
  },
  {
    "category": "No-raw metadata/manifest access",
    "posture": "separately gated future dependency",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "metadata/manifest only if separately evidenced"
  },
  {
    "category": "Generated/export artifact access",
    "posture": "separately gated future dependency",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "generated/export artifacts only if separately evidenced"
  },
  {
    "category": "Local log or test-transcript summary access",
    "posture": "separately gated future dependency",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "local logs are not CI evidence"
  },
  {
    "category": "Raw/private/source material access",
    "posture": "not authorized",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "deny-by-default"
  },
  {
    "category": "Source-package access",
    "posture": "not authorized",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "deny-by-default"
  },
  {
    "category": "PDF/image/screenshot/metadata access",
    "posture": "not authorized",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "deny-by-default"
  },
  {
    "category": "Cross-tenant access",
    "posture": "not authorized",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "tenant boundary remains closed"
  },
  {
    "category": "Cross-case access",
    "posture": "not authorized",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "case boundary remains closed"
  },
  {
    "category": "Cross-object/function/property access",
    "posture": "not authorized",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "object/function/property boundary remains closed"
  },
  {
    "category": "Retention/deletion request access",
    "posture": "separately gated future dependency",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "request flow remains separate from execute and verify"
  },
  {
    "category": "Retention/deletion execution access",
    "posture": "not authorized",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "execution requires separate future evidence"
  },
  {
    "category": "Retention/deletion verification access",
    "posture": "separately gated future dependency",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "verification remains independent from execution"
  },
  {
    "category": "Audit/access-log viewing access",
    "posture": "separately gated future dependency",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "audit/access-log implementation remains absent"
  },
  {
    "category": "Third-party/provider routing authorization",
    "posture": "deny-by-default",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "provider route authorization absent"
  },
  {
    "category": "Role or permission administration",
    "posture": "separately gated future dependency",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "role escalation and self-grant not authorized"
  },
  {
    "category": "Impersonation or session-assumption access",
    "posture": "not authorized",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "impersonation absent"
  },
  {
    "category": "Break-glass or emergency access",
    "posture": "unknown/not evidenced",
    "currentAuthorization": "UNKNOWN_NOT_EVIDENCED",
    "materialPosture": "break-glass absent"
  },
  {
    "category": "External-use/product/release approval",
    "posture": "not authorized",
    "currentAuthorization": "NOT_AUTHORIZED",
    "materialPosture": "release and product decisions remain separate"
  }
]
```
`ADMIN_SUPPORT_ACCESS_PATH_SCOPE_JSON_END`

## Material-Class Posture

Admin/support receives no present material access from this document.

- raw/private/source material: `NOT_AUTHORIZED`
- source packages: `NOT_AUTHORIZED`
- PDF/image/screenshot/metadata material: `NOT_AUTHORIZED`
- provider payload material: `NOT_AUTHORIZED`
- URLs, tokens, and secrets: `NOT_AUTHORIZED`
- generated/export artifacts: `NOT_AUTHORIZED` until separately evidenced
- metadata/manifest material: `NOT_AUTHORIZED` until separately evidenced
- sanitized/no-raw material: narrow future review-support candidate only
- redacted review signals: narrow future review-support candidate only

## Safe Evidence Labels

Only the following labels may be used as current evidence in this scope review:

- `DOCS_ONLY`
- `TEST_ONLY`
- `PROVE_ONLY`
- `SCOPE_REVIEW_ONLY`
- `ALIGNMENT_PROOF_ONLY`
- `STATIC_GOVERNANCE_REGISTRY_SCAFFOLD`
- `UNKNOWN_NOT_EVIDENCED`
- `NOT_AUTHORIZED`
- `HUMAN_PROFESSIONAL_REVIEW_REQUIRED`

Do not use as current positive evidence any runtime-enforced, RBAC-enforced,
access-control-enforced, admin-support-authorized, break-glass-authorized,
impersonation-authorized, role-schema-created, permission-schema-created,
technical-signed-off, release-approved, external-use-ready, AI-Act-compliant,
court-ready, or high-risk-approved label.

## Bypass-Risk Register

`ADMIN_SUPPORT_BYPASS_RISK_REGISTER_JSON_BEGIN`
```json
[
  {
    "risk": "implicit superuser interpretation",
    "currentEvidenceLevel": "SCOPE_REVIEW_ONLY",
    "currentNonAuthorization": "admin/support is not an implicit superuser",
    "dependency": "RBAC role-permission taxonomy",
    "requiredFutureImplementationEvidence": "future tracked admin/support role boundary evidence",
    "requiredFutureTestEvidence": "future denial tests for superuser interpretation",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "cannot be closed by this document or focused proof test"
  },
  {
    "risk": "support-to-reviewer role confusion",
    "currentEvidenceLevel": "SCOPE_REVIEW_ONLY",
    "currentNonAuthorization": "admin/support is not equivalent to professional reviewer",
    "dependency": "human/professional-review gate",
    "requiredFutureImplementationEvidence": "future tracked separation of support and reviewer roles",
    "requiredFutureTestEvidence": "future denial tests for reviewer-role substitution",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future role separation evidence required"
  },
  {
    "risk": "owner/maintainer privilege confusion",
    "currentEvidenceLevel": "SCOPE_REVIEW_ONLY",
    "currentNonAuthorization": "admin/support is not equivalent to owner/maintainer",
    "dependency": "RBAC role-permission taxonomy",
    "requiredFutureImplementationEvidence": "future tracked owner/admin separation evidence",
    "requiredFutureTestEvidence": "future denial tests for owner/admin confusion",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future owner/admin separation evidence required"
  },
  {
    "risk": "self-granted permission",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "role escalation and self-grant are not authorized or implemented",
    "dependency": "role or permission administration model",
    "requiredFutureImplementationEvidence": "future tracked self-grant prevention evidence",
    "requiredFutureTestEvidence": "future denied self-grant tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future self-grant prevention evidence required"
  },
  {
    "risk": "self-approval",
    "currentEvidenceLevel": "SCOPE_REVIEW_ONLY",
    "currentNonAuthorization": "support identity does not permit self-approval",
    "dependency": "human/professional-review gate",
    "requiredFutureImplementationEvidence": "future tracked non-self-approval evidence",
    "requiredFutureTestEvidence": "future denied self-approval tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future non-self-approval evidence required"
  },
  {
    "risk": "workflow-agent approval",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "workflow automation cannot approve support access",
    "dependency": "automation actor permission model",
    "requiredFutureImplementationEvidence": "future tracked workflow-agent non-approval evidence",
    "requiredFutureTestEvidence": "future denied workflow approval tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future workflow-agent denial evidence required"
  },
  {
    "risk": "system/service self-authorization",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "system/service actor self-authorization is not created",
    "dependency": "service actor authorization model",
    "requiredFutureImplementationEvidence": "future tracked service actor fail-closed evidence",
    "requiredFutureTestEvidence": "future denied service self-authorization tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future service actor evidence required"
  },
  {
    "risk": "tenant/case switching",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "cross-tenant and cross-case access are not authorized",
    "dependency": "global access-control threat modeling",
    "requiredFutureImplementationEvidence": "future tracked tenant/case boundary evidence",
    "requiredFutureTestEvidence": "future denied tenant/case switching tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future tenant/case boundary evidence required"
  },
  {
    "risk": "object/function/property scope bypass",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "cross-object/function/property access is not authorized",
    "dependency": "object/function/property access model",
    "requiredFutureImplementationEvidence": "future tracked object/function/property boundary evidence",
    "requiredFutureTestEvidence": "future denied BOLA/IDOR and function-level tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future object/function/property boundary evidence required"
  },
  {
    "risk": "direct database/storage/object-store bypass",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "direct storage/database/object-store bypass is not authorized or implemented",
    "dependency": "storage access-control model",
    "requiredFutureImplementationEvidence": "future tracked storage bypass prevention evidence",
    "requiredFutureTestEvidence": "future denied direct storage access tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future storage bypass evidence required"
  },
  {
    "risk": "export/download bypass",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "export/download bypass is not authorized",
    "dependency": "generated/export artifact access model",
    "requiredFutureImplementationEvidence": "future tracked export boundary evidence",
    "requiredFutureTestEvidence": "future denied export/download bypass tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future export boundary evidence required"
  },
  {
    "risk": "audit-log access bypass",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "audit/access-log viewing access is not authorized",
    "dependency": "audit/access-log dependency",
    "requiredFutureImplementationEvidence": "future tracked audit-log viewing role evidence",
    "requiredFutureTestEvidence": "future denied audit-log access tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future audit-log role evidence required"
  },
  {
    "risk": "deletion execution without independent verification",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "retention/deletion execution is not authorized",
    "dependency": "retention/deletion request/execute/verify separation",
    "requiredFutureImplementationEvidence": "future tracked separation of execute and verify duties",
    "requiredFutureTestEvidence": "future denied deletion execution without verification tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future retention/deletion separation evidence required"
  },
  {
    "risk": "provider-route approval through support privilege",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "support identity does not grant route authorization",
    "dependency": "third-party/provider deny-by-default routing",
    "requiredFutureImplementationEvidence": "future tracked provider route authorization evidence",
    "requiredFutureTestEvidence": "future denied provider-route approval tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future provider-route authorization evidence required"
  },
  {
    "risk": "external-use approval through support privilege",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "support identity does not grant external-use authorization",
    "dependency": "external-use approval remains separate",
    "requiredFutureImplementationEvidence": "future tracked release/external-use approval boundary evidence",
    "requiredFutureTestEvidence": "future denied external-use approval tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future external-use approval boundary evidence required"
  },
  {
    "risk": "human-review bypass",
    "currentEvidenceLevel": "SCOPE_REVIEW_ONLY",
    "currentNonAuthorization": "support identity does not permit bypass of human/professional review",
    "dependency": "human/professional-review gate",
    "requiredFutureImplementationEvidence": "future tracked human-review non-bypass evidence",
    "requiredFutureTestEvidence": "future denied human-review bypass tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future human-review non-bypass evidence required"
  },
  {
    "risk": "impersonation/session takeover",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "impersonation is not authorized or implemented",
    "dependency": "session and identity-boundary model",
    "requiredFutureImplementationEvidence": "future tracked impersonation denial evidence",
    "requiredFutureTestEvidence": "future denied impersonation/session assumption tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future impersonation denial evidence required"
  },
  {
    "risk": "emergency or break-glass misuse",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "currentNonAuthorization": "break-glass access is not authorized or implemented",
    "dependency": "separate future emergency-access scope if ever proposed",
    "requiredFutureImplementationEvidence": "future tracked break-glass boundary evidence",
    "requiredFutureTestEvidence": "future denied emergency-access tests",
    "blockerStatus": "NOT_AUTHORIZED",
    "futureOnlyClosureCriterion": "future emergency-access evidence required"
  }
]
```
`ADMIN_SUPPORT_BYPASS_RISK_REGISTER_JSON_END`

## Cross-Tenant/Case/Object/Function/Property Risks

Cross-tenant access, cross-case access, and cross-object/function/property
access are not authorized. The following risks remain open and require future
tracked evidence before any runtime work:

- tenant switching
- case switching
- object-level BOLA/IDOR
- function-level authorization bypass
- property-level overexposure
- direct storage/database/object-store bypass
- export/download bypass

## Human/Professional-Review Dependency

Human/professional review remains required. Admin/support cannot replace,
short-circuit, approve, certify, or bypass human/professional review.

RBAC role-permission taxonomy is a prerequisite.
admin/support remains separately gated from ordinary role categories.
human/professional review cannot be replaced by admin/support.

Required dependency posture:

- audit/access-log events are required for future privileged actions
- audit/access-log implementation remains absent
- raw-material routing remains a prerequisite for material visibility
- raw/private/source remains deny-by-default
- retention/deletion requires request/execute/verify separation
- third-party/provider routing remains deny-by-default
- global access-control threat modeling remains future work

## Audit/Access-Log Dependency

Audit/access-log events are required for any future privileged action. This
dependency is not audit/access-log implementation. This document creates no
event emitter, log schema, log storage, log viewer RBAC, current logging, audit
logging, or access logging.

This dependency is not audit/access-log implementation.
This document creates no event emitter, log schema, log storage.
Audit/access-log implementation remains absent.

## Retention/Deletion Dependency

Retention/deletion request, execution, and verification remain separately
scoped. This document creates no retention, deletion, purge, erasure,
encryption, key-management, storage, or provider retention/deletion behavior.

Retention/deletion requires request/execute/verify separation.

## Raw-Material-Routing Dependency

Raw-material routing remains a prerequisite for material visibility.
Raw/private/source material remains deny-by-default. Source packages and
PDF/image/screenshot/metadata material remain not authorized.

## Third-Party/Provider-Routing Constraint

Third-party/provider routing remains deny-by-default. Support identity does not
grant provider routing, provider integration, provider registry creation,
provider status implementation, provider payload processing, token/URL/secret
handling, route authorization, external-use authorization, or product/release
approval.

Global access-control threat modeling remains future work.
Runtime gates remain deferred.
Validator dispatch remains not created.
Executable/runtime registry lookup remains not created.
All closure criteria remain future-only.

## Required Future Implementation Evidence

Future implementation evidence would need to be tracked separately and include:

- admin/support role boundary evidence
- support/maintainer/reviewer separation evidence
- non-self-approval evidence
- role escalation and self-grant prevention evidence
- cross-tenant/case/object/function/property denial evidence
- direct database/storage/object-store bypass prevention evidence
- audit/access-log event and viewing boundary evidence
- retention/deletion request/execute/verify separation evidence
- raw-material-routing denial evidence
- third-party/provider route authorization denial evidence
- human/professional-review non-bypass evidence

None of that evidence is created here.

## Required Future Test Evidence

Future test evidence would need to be tracked separately and include:

- admin/support allow/deny tests
- support/maintainer/reviewer separation tests
- self-approval denial tests
- self-grant and role-escalation denial tests
- impersonation/session-assumption denial tests
- break-glass/emergency-access denial tests
- cross-tenant and cross-case denial tests
- object/function/property denial tests
- direct storage/database/object-store denial tests
- audit/access-log viewing denial tests
- retention/deletion separation tests
- raw/private/source material denial tests
- source-package denial tests
- PDF/image/screenshot/metadata denial tests
- provider-route authorization denial tests
- release/external-use/product approval denial tests

None of that test evidence is created here.

## Future-Only Closure Criteria

Closure requires future tracked implementation evidence, future tracked test
evidence, future admin/support bypass review, future audit/access-log evidence,
future retention/deletion separation evidence, future raw-material-routing
evidence, future third-party/provider route authorization evidence if provider
routing is ever proposed, and future human/professional review.

Closure cannot be created by this document or its focused proof test.

## Explicit Non-Authorizations

This document creates no:

- implementation
- runtime/API/schema/package behavior
- executable registry lookup
- runtime registry lookup
- source/package edits
- package manifest/config edits
- docs/wiki edits
- role fields
- permission fields
- role schema
- permission schema
- RBAC implementation
- access-control implementation
- RBAC/access-control enforcement
- admin/support implementation
- admin/support access authorization
- implicit superuser authorization
- break-glass authorization
- impersonation authorization
- audit/access-log implementation
- retention/deletion/encryption implementation
- raw-material routing implementation
- third-party/provider routing authorization
- runtime gates
- validator dispatch
- model-facts approval
- governance proof creation
- security finding
- vulnerability finding
- severity
- remediation
- blocker closure
- release approval
- external-use
- product candidate
- technical sign-off
- runtime certification
- legal/clinical/evidentiary/case-truth conclusion
- court-ready claim
- AI Act compliance claim
- high-risk approval claim

## Open Questions

- What exact future actor taxonomy would separate support/admin from
  owner/maintainer and professional reviewer roles?
- Which support workflows, if any, are eligible for sanitized/no-raw
  review-support access?
- Which privileged actions would require independent audit/access-log events?
- Which retention/deletion request, execution, and verification duties must be
  separated before any admin/support operation is proposed?
- Which cross-tenant/case/object/function/property denial tests would be
  mandatory before implementation?
- Which provider-routing denial tests are required before any provider
  integration is proposed?
