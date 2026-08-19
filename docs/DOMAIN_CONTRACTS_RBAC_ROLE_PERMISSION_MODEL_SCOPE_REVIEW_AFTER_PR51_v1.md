# RBAC Role-Permission Model Scope Review After PR51

Mode: `DOCS_ONLY`
Posture: `PROVE_ONLY`
Scope: `SCOPE_REVIEW_ONLY`

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

This document defines scope for a future RBAC / role-permission model with
admin/support access explicitly included. It identifies actor types, role
categories, permission categories, admin/support access posture, dependency
boundaries, implementation gaps, required evidence, blocker status, and closure
criteria.

This is review-support and governance evidence only. It preserves that no
implementation, runtime enforcement, RBAC enforcement, access-control
enforcement, admin/support authorization, runtime gate, validator dispatch, or
registry lookup is created.

## Source-Of-Truth Boundary

Tracked repo files and live git/GitHub state are the evidence base for this
scope review. Chat, pasted summaries, private notes, uploaded conversation
material, and non-repo material are advisory only and are not copied here as repo
truth.

## Required Actor Types

- human professional reviewer
- repo/operator maintainer
- support/admin actor
- workflow automation agent
- system/service actor
- external reviewer or auditor
- affected-person or subject-facing actor
- third-party/provider actor

## Required Role Categories

- owner/maintainer
- reviewer
- professional reviewer
- admin/support
- automation/service
- external auditor
- read-only observer
- affected-person/subject-facing
- third-party/provider

## Required Permission Categories

- view sanitized/no-raw material
- view redacted review signals
- view metadata/manifest material
- view generated/export artifacts
- view local logs/test transcript summaries
- request human/professional review
- approve/reject review-support output
- request retention/deletion action
- verify retention/deletion action
- authorize third-party/provider routing
- access raw/private/source material
- access source packages
- access PDF/image/screenshot/metadata material
- access admin/support path
- create runtime gate
- create validator dispatch
- perform registry lookup
- approve external-use
- select product candidate

## Scope Matrix

`RBAC_SCOPE_REVIEW_ROWS_JSON_BEGIN`
```json
[
  {
    "rowGroup": "Human professional reviewer / review-support only",
    "actorType": "human professional reviewer",
    "roleCategory": "professional reviewer",
    "permissionCategory": "view sanitized/no-raw material",
    "allowedMaterialClasses": ["sanitized/no-raw material", "redacted review signals"],
    "prohibitedMaterialClasses": ["raw/private/source material", "source packages", "PDF/image/screenshot/metadata material"],
    "allowedActions": ["review-support assessment", "request human/professional review"],
    "prohibitedActions": ["runtime enforcement", "external-use approval", "product-candidate selection"],
    "adminSupportAccessRule": "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    "humanProfessionalReviewDependency": "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "auditLogDependency": "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    "retentionDeletionDependency": "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    "rawMaterialRoutingDependency": "RAW_MATERIAL_ROUTING_DEPENDENCY_NOT_IMPLEMENTED",
    "thirdPartyRoutingConstraint": "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "currentEvidenceLevel": "DOCS_ONLY",
    "implementationGap": "ROLE_PERMISSION_MODEL_NOT_IMPLEMENTED",
    "requiredImplementationEvidence": "future tracked implementation evidence required",
    "requiredTestEvidence": "future tracked test evidence required",
    "blockerStatus": "NOT_AUTHORIZED",
    "closureCriteria": "future implementation, test, audit/access-log, admin/support bypass, retention/deletion, and routing evidence required",
    "whatRemainsNonAuthorizedUntilClosure": "RBAC enforcement, access-control enforcement, admin/support access, external-use, product candidate"
  },
  {
    "rowGroup": "Repo/operator maintainer / governance maintenance only",
    "actorType": "repo/operator maintainer",
    "roleCategory": "owner/maintainer",
    "permissionCategory": "view metadata/manifest material",
    "allowedMaterialClasses": ["metadata/manifest material", "generated/export artifacts"],
    "prohibitedMaterialClasses": ["raw/private/source material", "source packages"],
    "allowedActions": ["maintain governance docs", "maintain focused proof tests"],
    "prohibitedActions": ["self-approve release", "create runtime authorization", "close blockers"],
    "adminSupportAccessRule": "ADMIN_SUPPORT_ACCESS_REQUIRES_SEPARATE_EVIDENCE",
    "humanProfessionalReviewDependency": "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "auditLogDependency": "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    "retentionDeletionDependency": "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    "rawMaterialRoutingDependency": "RAW_MATERIAL_ROUTING_DEPENDENCY_NOT_IMPLEMENTED",
    "thirdPartyRoutingConstraint": "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "currentEvidenceLevel": "PROVE_ONLY",
    "implementationGap": "MAINTAINER_ROLE_NOT_BOUND_TO_RUNTIME_PERMISSION_MODEL",
    "requiredImplementationEvidence": "future tracked role and permission model evidence required",
    "requiredTestEvidence": "future authorization and denial-path tests required",
    "blockerStatus": "NOT_AUTHORIZED",
    "closureCriteria": "future tracked implementation and independent review evidence required",
    "whatRemainsNonAuthorizedUntilClosure": "release approval, technical sign-off, runtime certification"
  },
  {
    "rowGroup": "Admin/support actor / blocked or separately gated access",
    "actorType": "support/admin actor",
    "roleCategory": "admin/support",
    "permissionCategory": "access admin/support path",
    "allowedMaterialClasses": ["none until separately evidenced"],
    "prohibitedMaterialClasses": ["raw/private/source material", "source packages", "PDF/image/screenshot/metadata material", "provider payload material"],
    "allowedActions": ["none until separately evidenced"],
    "prohibitedActions": ["admin/support runtime access", "bypass review gates", "view raw/private/source material"],
    "adminSupportAccessRule": "BLOCKED_UNTIL_SEPARATELY_GATED_AND_EVIDENCED",
    "humanProfessionalReviewDependency": "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "auditLogDependency": "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    "retentionDeletionDependency": "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    "rawMaterialRoutingDependency": "RAW_MATERIAL_ROUTING_DEPENDENCY_NOT_IMPLEMENTED",
    "thirdPartyRoutingConstraint": "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "currentEvidenceLevel": "NOT_AUTHORIZED",
    "implementationGap": "ADMIN_SUPPORT_ACCESS_MODEL_NOT_IMPLEMENTED",
    "requiredImplementationEvidence": "future admin/support model, bypass prevention, audit, and authorization evidence required",
    "requiredTestEvidence": "future admin/support allowed and denied tests required",
    "blockerStatus": "NOT_AUTHORIZED",
    "closureCriteria": "future review of admin/support bypass paths and tracked enforcement evidence required",
    "whatRemainsNonAuthorizedUntilClosure": "admin/support access and admin/support implementation"
  },
  {
    "rowGroup": "Workflow automation agent / no self-approval",
    "actorType": "workflow automation agent",
    "roleCategory": "automation/service",
    "permissionCategory": "request human/professional review",
    "allowedMaterialClasses": ["sanitized/no-raw material", "metadata/manifest material"],
    "prohibitedMaterialClasses": ["raw/private/source material", "source packages", "provider tokens or secrets"],
    "allowedActions": ["prepare review-support status"],
    "prohibitedActions": ["self-approval", "runtime enforcement", "technical sign-off"],
    "adminSupportAccessRule": "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    "humanProfessionalReviewDependency": "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "auditLogDependency": "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    "retentionDeletionDependency": "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    "rawMaterialRoutingDependency": "RAW_MATERIAL_ROUTING_DEPENDENCY_NOT_IMPLEMENTED",
    "thirdPartyRoutingConstraint": "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "currentEvidenceLevel": "DOCS_ONLY",
    "implementationGap": "AUTOMATION_ROLE_NOT_BOUND_TO_RUNTIME_PERMISSION_MODEL",
    "requiredImplementationEvidence": "future tracked non-self-approval and audit evidence required",
    "requiredTestEvidence": "future denied self-approval tests required",
    "blockerStatus": "NOT_AUTHORIZED",
    "closureCriteria": "future tracked automation permission tests and review evidence required",
    "whatRemainsNonAuthorizedUntilClosure": "self-approval, runtime gate creation, validator dispatch"
  },
  {
    "rowGroup": "System/service actor / no self-authorization",
    "actorType": "system/service actor",
    "roleCategory": "automation/service",
    "permissionCategory": "perform registry lookup",
    "allowedMaterialClasses": ["none until separately evidenced"],
    "prohibitedMaterialClasses": ["raw/private/source material", "source packages", "provider payload material"],
    "allowedActions": ["none until separately evidenced"],
    "prohibitedActions": ["runtime registry lookup", "validator dispatch", "self-authorization"],
    "adminSupportAccessRule": "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    "humanProfessionalReviewDependency": "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "auditLogDependency": "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    "retentionDeletionDependency": "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    "rawMaterialRoutingDependency": "RAW_MATERIAL_ROUTING_DEPENDENCY_NOT_IMPLEMENTED",
    "thirdPartyRoutingConstraint": "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "implementationGap": "SYSTEM_SERVICE_AUTHORIZATION_MODEL_NOT_IMPLEMENTED",
    "requiredImplementationEvidence": "future service actor model and fail-closed runtime evidence required",
    "requiredTestEvidence": "future service actor denial and audit tests required",
    "blockerStatus": "NOT_AUTHORIZED",
    "closureCriteria": "future tracked service actor authorization evidence required",
    "whatRemainsNonAuthorizedUntilClosure": "runtime lookup, validator dispatch, self-authorization"
  },
  {
    "rowGroup": "External reviewer/auditor / no raw/private/source by default",
    "actorType": "external reviewer or auditor",
    "roleCategory": "external auditor",
    "permissionCategory": "view redacted review signals",
    "allowedMaterialClasses": ["redacted review signals", "sanitized/no-raw material"],
    "prohibitedMaterialClasses": ["raw/private/source material", "source packages", "PDF/image/screenshot/metadata material"],
    "allowedActions": ["review redacted governance evidence"],
    "prohibitedActions": ["access raw/private/source material", "approve external-use", "select product candidate"],
    "adminSupportAccessRule": "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    "humanProfessionalReviewDependency": "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "auditLogDependency": "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    "retentionDeletionDependency": "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    "rawMaterialRoutingDependency": "RAW_MATERIAL_ROUTING_DEPENDENCY_NOT_IMPLEMENTED",
    "thirdPartyRoutingConstraint": "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "currentEvidenceLevel": "DOCS_ONLY",
    "implementationGap": "EXTERNAL_REVIEWER_PERMISSION_MODEL_NOT_IMPLEMENTED",
    "requiredImplementationEvidence": "future redaction, access boundary, and audit evidence required",
    "requiredTestEvidence": "future external reviewer allow/deny tests required",
    "blockerStatus": "NOT_AUTHORIZED",
    "closureCriteria": "future tracked external reviewer role evidence required",
    "whatRemainsNonAuthorizedUntilClosure": "raw/private/source access, external-use, release approval"
  },
  {
    "rowGroup": "Affected-person or subject-facing actor / explanation/contestability not implemented",
    "actorType": "affected-person or subject-facing actor",
    "roleCategory": "affected-person/subject-facing",
    "permissionCategory": "view generated/export artifacts",
    "allowedMaterialClasses": ["none until separately evidenced"],
    "prohibitedMaterialClasses": ["raw/private/source material", "source packages", "internal review material"],
    "allowedActions": ["none until separately evidenced"],
    "prohibitedActions": ["external-use", "court-ready use", "case-truth determination"],
    "adminSupportAccessRule": "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    "humanProfessionalReviewDependency": "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "auditLogDependency": "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    "retentionDeletionDependency": "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    "rawMaterialRoutingDependency": "RAW_MATERIAL_ROUTING_DEPENDENCY_NOT_IMPLEMENTED",
    "thirdPartyRoutingConstraint": "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "currentEvidenceLevel": "UNKNOWN_NOT_EVIDENCED",
    "implementationGap": "EXPLANATION_AND_CONTESTABILITY_MODEL_NOT_IMPLEMENTED",
    "requiredImplementationEvidence": "future subject-facing access, explanation, and contestability evidence required",
    "requiredTestEvidence": "future subject-facing tests required",
    "blockerStatus": "NOT_AUTHORIZED",
    "closureCriteria": "future tracked explanation and contestability evidence required",
    "whatRemainsNonAuthorizedUntilClosure": "subject-facing output, court-ready claim, external-use"
  },
  {
    "rowGroup": "Third-party/provider actor / routing deny-by-default",
    "actorType": "third-party/provider actor",
    "roleCategory": "third-party/provider",
    "permissionCategory": "authorize third-party/provider routing",
    "allowedMaterialClasses": ["none"],
    "prohibitedMaterialClasses": ["raw/private/source material", "redacted review signals", "metadata/manifest material", "generated/export artifacts"],
    "allowedActions": ["none"],
    "prohibitedActions": ["provider routing", "provider payload processing", "provider retention/deletion action"],
    "adminSupportAccessRule": "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    "humanProfessionalReviewDependency": "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "auditLogDependency": "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    "retentionDeletionDependency": "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    "rawMaterialRoutingDependency": "RAW_MATERIAL_ROUTING_DEPENDENCY_NOT_IMPLEMENTED",
    "thirdPartyRoutingConstraint": "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "currentEvidenceLevel": "NOT_AUTHORIZED",
    "implementationGap": "PROVIDER_ROUTING_AUTHORIZATION_MODEL_NOT_IMPLEMENTED",
    "requiredImplementationEvidence": "future provider registry, route authorization, auditability, and retention/deletion posture evidence required",
    "requiredTestEvidence": "future provider routing deny and authorization tests required",
    "blockerStatus": "NOT_AUTHORIZED",
    "closureCriteria": "future third-party routing authorization evidence required if provider routing is ever proposed",
    "whatRemainsNonAuthorizedUntilClosure": "third-party/provider routing and provider integration"
  },
  {
    "rowGroup": "Raw/private/source material access / not authorized",
    "actorType": "repo/operator maintainer",
    "roleCategory": "reviewer",
    "permissionCategory": "access raw/private/source material",
    "allowedMaterialClasses": ["none"],
    "prohibitedMaterialClasses": ["raw/private/source material", "source packages", "PDF/image/screenshot/metadata material"],
    "allowedActions": ["none"],
    "prohibitedActions": ["inspect raw/private/source material", "inspect source packages", "inspect PDF/image/screenshot/metadata material"],
    "adminSupportAccessRule": "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    "humanProfessionalReviewDependency": "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "auditLogDependency": "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    "retentionDeletionDependency": "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    "rawMaterialRoutingDependency": "RAW_MATERIAL_ROUTING_DEPENDENCY_NOT_IMPLEMENTED",
    "thirdPartyRoutingConstraint": "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "currentEvidenceLevel": "NOT_AUTHORIZED",
    "implementationGap": "RAW_MATERIAL_ACCESS_CONTROL_NOT_IMPLEMENTED",
    "requiredImplementationEvidence": "future raw-material routing and RBAC evidence required",
    "requiredTestEvidence": "future raw/private/source denial tests required",
    "blockerStatus": "NOT_AUTHORIZED",
    "closureCriteria": "future tracked raw-material routing, RBAC, audit, and human review evidence required",
    "whatRemainsNonAuthorizedUntilClosure": "raw/private/source access and source package access"
  },
  {
    "rowGroup": "External-use/product/release actions / not authorized",
    "actorType": "repo/operator maintainer",
    "roleCategory": "owner/maintainer",
    "permissionCategory": "approve external-use",
    "allowedMaterialClasses": ["none"],
    "prohibitedMaterialClasses": ["all material classes for external-use until separately authorized"],
    "allowedActions": ["none"],
    "prohibitedActions": ["release approval", "external-use authorization", "product-candidate selection", "technical sign-off", "runtime certification"],
    "adminSupportAccessRule": "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    "humanProfessionalReviewDependency": "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "auditLogDependency": "AUDIT_ACCESS_LOG_DEPENDENCY_NOT_IMPLEMENTED",
    "retentionDeletionDependency": "RETENTION_DELETION_DEPENDENCY_NOT_IMPLEMENTED",
    "rawMaterialRoutingDependency": "RAW_MATERIAL_ROUTING_DEPENDENCY_NOT_IMPLEMENTED",
    "thirdPartyRoutingConstraint": "THIRD_PARTY_ROUTING_DENY_BY_DEFAULT",
    "currentEvidenceLevel": "NOT_AUTHORIZED",
    "implementationGap": "RELEASE_AND_EXTERNAL_USE_AUTHORIZATION_NOT_IMPLEMENTED",
    "requiredImplementationEvidence": "future separate release, sign-off, certification, and product evidence required",
    "requiredTestEvidence": "future release and external-use authorization tests required",
    "blockerStatus": "NOT_AUTHORIZED",
    "closureCriteria": "cannot be created by this document or its focused proof test",
    "whatRemainsNonAuthorizedUntilClosure": "release approval, external-use, product candidate, technical sign-off, runtime certification"
  }
]
```
`RBAC_SCOPE_REVIEW_ROWS_JSON_END`

## Dependency Statements

- Raw-material routing depends on a role/permission model before runtime enforcement.
- Audit/access-log work depends on an actor/permission taxonomy before runtime implementation.
- Retention/deletion work depends on an actor/permission taxonomy for request, execute, and verify flows.
- Third-party/provider routing depends on explicit authorization and is deny-by-default.
- Global access-control threat-model work depends on preliminary RBAC/admin-support scope.
- Runtime gates remain deferred.
- Validator dispatch remains not created.
- Registry lookup remains not created.

## Non-Authorizations

This document creates no:

- implementation
- runtime/API/schema/package behavior
- source/package edits
- role fields
- permission fields
- role schema
- permission schema
- RBAC enforcement
- access-control enforcement
- admin/support implementation
- admin/support access authorization
- audit/access-log implementation
- event emitter
- log schema
- log storage
- retention/deletion/encryption implementation
- raw-material routing implementation
- third-party/provider routing authorization
- runtime gates
- validator dispatch
- registry lookup
- security finding
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

## Closure Criteria

Closure requires future tracked implementation evidence, future tracked test
evidence, future review of admin/support bypass paths, future audit/access-log
evidence, future retention/deletion authorization flow evidence, and future
third-party routing authorization evidence if any provider routing is ever
proposed.

Closure cannot be created by this document or its focused proof test.

## Evidence Levels

Only the following evidence labels are used by this review:

- `DOCS_ONLY`
- `PROVE_ONLY`
- `UNKNOWN_NOT_EVIDENCED`
- `NOT_AUTHORIZED`
- `HUMAN_PROFESSIONAL_REVIEW_REQUIRED`
