# P6 Raw Material Routing Deny By Default Boundary v1

## Boundary Declaration

- Boundary name: `P6_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_BOUNDARY`
- Mode: `DOCS_ONLY`
- Status: `P6_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_ONLY`
- Scope posture: `PRIVATE_CONTROL_PLANE_SPECIFICATION_ONLY`
- Routing posture: `PRIVATE_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_VOCABULARY_ONLY`

This boundary is review-only. It freezes only the private GPT working material `P6_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_SPEC_v0`.

P6 is private control-plane specification only. P6 defines raw-material routing deny-by-default vocabulary only, route surface vocabulary only, route status vocabulary only, material-class-to-route posture only, future route-deny, quarantine, block, and no-content audit-event requirements only, and future closure criteria only.

P6 creates no raw-material routing implementation, no route implementation, no route policy implementation, no route decision engine, no quarantine implementation, no block path implementation, no validator dispatch, no registry lookup, no material-class registry, no scope model, no tenant/case/object/function/property scope model, no RBAC implementation, no access-control implementation, no admin/support implementation, no audit/access-log implementation, no audit logging implementation, no access logging implementation, no event taxonomy runtime code, no event emitter, no log schema, no log storage, no retention implementation, no deletion implementation, no purge implementation, no third-party provider/API routing, no provider registry, no provider status, no provider route, no data-routing map, no provider retention/deletion posture, no provider auditability, no provider token/URL/secret handling, no runtime/API/schema/package behavior change, no test execution from the future route matrix beyond the focused doc-freeze proof test, no product candidate, no external-use, no External Reviewer delivery, no release approval, no legal/clinical/evidentiary/case-truth conclusion, no security finding, no vulnerability finding, no severity, no remediation, no blocker closure, and no dependency closure.

P6 does not duplicate existing raw-material routing boundaries. Existing raw-routing boundaries remain context only. P6's distinct value is the P1-P5 integrated deny-by-default route decision layer.

Human and professional review remains required. `DOCS_ONLY` boundaries are not runtime enforcement. Local focused proof validation is doc-freeze validation only, not CI evidence or technical sign-off.

## Status Tokens

- `P6_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_BOUNDARY`
- `DOCS_ONLY`
- `P6_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_ONLY`
- `PRIVATE_CONTROL_PLANE_SPECIFICATION_ONLY`
- `PRIVATE_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_VOCABULARY_ONLY`
- `PRIVATE_ROUTE_SURFACE_VOCABULARY_ONLY`
- `PRIVATE_ROUTE_STATUS_VOCABULARY_ONLY`
- `PRIVATE_MATERIAL_CLASS_ROUTE_POSTURE_ONLY`
- `FUTURE_ROUTE_DENY_QUARANTINE_BLOCK_REQUIREMENTS_ONLY`
- `FUTURE_NO_CONTENT_ROUTE_DENIAL_EVENT_REQUIREMENTS_ONLY`
- `FUTURE_ROUTE_DECISION_LAYER_ONLY`
- `P1_P5_INTEGRATED_ROUTE_DECISION_LAYER_ONLY`
- `EXISTING_RAW_MATERIAL_ROUTING_BOUNDARIES_CONTEXT_ONLY`
- `NOT_REPO_EVIDENCE`
- `NOT_CI_EVIDENCE`
- `NOT_TECHNICAL_EVIDENCE`
- `NOT_RUNTIME_CERTIFICATION`
- `NOT_TECHNICAL_SIGN_OFF`
- `NOT_RELEASE_APPROVAL`
- `NO_IMPLEMENTATION_CREATED`
- `NO_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE`
- `RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED`
- `RAW_MATERIAL_ROUTING_IMPLEMENTATION_NOT_CREATED`
- `ROUTE_POLICY_NOT_IMPLEMENTED`
- `ROUTE_DECISION_ENGINE_NOT_CREATED`
- `QUARANTINE_IMPLEMENTATION_NOT_CREATED`
- `BLOCK_PATH_IMPLEMENTATION_NOT_CREATED`
- `VALIDATOR_DISPATCH_NOT_CREATED`
- `REGISTRY_LOOKUP_NOT_CREATED`
- `MATERIAL_CLASS_REGISTRY_NOT_IMPLEMENTED`
- `SCOPE_MODEL_NOT_IMPLEMENTED`
- `TENANT_CASE_OBJECT_FUNCTION_PROPERTY_SCOPE_NOT_IMPLEMENTED`
- `RBAC_MODEL_NOT_IMPLEMENTED`
- `ACCESS_CONTROL_NOT_IMPLEMENTED`
- `ROLE_PERMISSION_MODEL_NOT_CREATED`
- `ADMIN_SUPPORT_MODEL_NOT_CREATED`
- `ADMIN_SUPPORT_ACCESS_UNRESOLVED`
- `RETENTION_DELETION_NOT_IMPLEMENTED`
- `RETENTION_POLICY_NOT_CREATED`
- `DELETION_POLICY_NOT_CREATED`
- `PURGE_POLICY_NOT_CREATED`
- `AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED`
- `AUDIT_LOGGING_NOT_IMPLEMENTED`
- `ACCESS_LOGGING_NOT_IMPLEMENTED`
- `EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED`
- `EVENT_EMITTER_NOT_CREATED`
- `LOG_SCHEMA_NOT_CREATED`
- `LOG_STORAGE_NOT_CREATED`
- `RAW_PRIVATE_SOURCE_MATERIAL_DENY_BY_DEFAULT`
- `SOURCE_PACKAGE_MATERIAL_DENY_BY_DEFAULT`
- `PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_DENY_BY_DEFAULT`
- `THIRD_PARTY_MODEL_API_ROUTED_MATERIAL_DENY_BY_DEFAULT`
- `QUARANTINE_OR_BLOCK_PATH_REQUIRED`
- `THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED`
- `PROVIDER_REGISTRY_REQUIRED`
- `PROVIDER_STATUS_REQUIRED`
- `PROVIDER_RETENTION_DELETION_POSTURE_REQUIRED`
- `PROVIDER_AUDITABILITY_REQUIRED`
- `PROVIDER_TOKEN_URL_SECRET_HANDLING_REQUIRED`
- `DATA_ROUTING_MAP_REQUIRED`
- `GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST`
- `PRODUCT_CANDIDATE_NONE`
- `EXTERNAL_USE_NOT_AUTHORIZED`
- `NO_DELIVERY_TO_EXTERNAL_REVIEWER`
- `HUMAN_PROFESSIONAL_REVIEW_REQUIRED`
- `DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT`
- `NO_SECURITY_FINDING_CREATED`
- `NO_VULNERABILITY_FINDING_CREATED`
- `NO_SEVERITY_ASSIGNED`
- `NO_REMEDIATION_RECOMMENDED`
- `NO_BLOCKER_RESOLVED`
- `NO_BLOCKER_CLOSURE`
- `NO_DEPENDENCY_CLOSURE`

## Source Context

SOURCE_INPUTS:

- `P6_RAW_MATERIAL_ROUTING_DENY_BY_DEFAULT_SPEC_v0`
- `P1_MATERIAL_CLASS_REGISTRY_AND_SCOPE_MODEL_BOUNDARY` as accepted upstream context only.
- `P2_RETENTION_DELETION_LIFECYCLE_CONTROL_BOUNDARY` as accepted upstream context only.
- `P3_RBAC_ROLE_PERMISSION_LIFECYCLE_AUTHORIZATION_BOUNDARY` as accepted upstream context only.
- `P4_ADMIN_SUPPORT_BYPASS_PREVENTION_BOUNDARY` as accepted upstream context only.
- `P5_AUDIT_ACCESS_LOG_EVENT_TAXONOMY_BOUNDARY` as accepted upstream context only.
- Existing raw-material routing control specification boundary as context only.
- Existing security-agent raw-material routing feasibility matrix scope review as context only.
- Existing raw-material routing feasibility review as context only.
- Existing audit/access-log, RBAC, admin/support, third-party routing, and global access-control boundaries as context only.

SOURCE_UNIVERSE_DECLARED:

- P6 private GPT material only.

SEARCHED:

- P6 raw-material routing deny-by-default private spec summary.
- Material classes.
- Route surfaces.
- Route statuses.
- Deny-by-default rules.
- Allowed-now posture.
- Prohibited-now posture.
- P1-P5 integrated dependency posture.
- Route-deny/quarantine/block requirements.
- No-content route denial event requirements.
- Future required tests.
- Active blockers.
- Closure criteria.
- Non-authorization posture.
- Duplication risk against existing raw-material routing boundaries.

NOT_SEARCHED_BY_SCOPE:

- Raw source text.
- Private source material.
- Source packages.
- PDF/image/screenshot/metadata material.
- New source windows.
- 2021 raw material.
- External URL content.
- Social-media link content.
- Provider/API content.
- Provider terms.
- Provider payloads.
- Local logs.
- CI logs.
- Runtime implementation.
- Schema/API/package behavior.
- Actual raw-material routing system.
- Actual route policy.
- Actual route decision engine.
- Actual quarantine system.
- Actual block path.
- Actual validator dispatch.
- Actual registry lookup.
- Actual material-class registry.
- Actual scope model.
- Actual RBAC system.
- Actual admin/support system.
- Actual audit/access-log system.
- Actual retention system.
- Actual deletion system.
- Actual purge system.
- Legal meaning.
- Clinical meaning.
- Evidentiary meaning.
- Case truth.
- Security finding.
- External-use readiness.
- Product readiness.
- External Reviewer delivery readiness.

## P6 Purpose

- Define which material classes must default to route denial.
- Define which route surfaces must default to deny.
- Define what future quarantine/block path must exist before any route can be considered.
- Define what future no-content audit/access-log route-denial event must exist.
- Define what RBAC/admin-support/lifecycle/provider dependencies must exist before any route can be considered.
- Define that unknown or sensitive material class blocks route.
- Define that no route may be inferred from user approval, admin/support privilege, local logs, generated artifact status, package integrity, DOCS_ONLY boundary, provider identity, or review convenience.
- Preserve deny-by-default posture for raw/private/source material.
- Preserve human/professional review gate.

## P6 Distinct Value

P6 is not the older raw-material routing feasibility review. P6 is not the older raw-material routing control specification. P6 is not raw-routing implementation. P6 is not current route policy. P6 is not validator dispatch. P6 is not registry lookup. P6 is not material-class registry implementation. P6 is not scope model implementation.

P6 is the P1-P5 integrated deny-by-default route decision layer connecting material class/scope from P1, retention/deletion lifecycle posture from P2, RBAC lifecycle authorization from P3, admin/support no-bypass posture from P4, and no-content audit/access-log event taxonomy from P5 to future route-deny, quarantine, block-path, and no-content audit event requirements.

## Material Classes

- `SANITIZED_TEXT_PRIMARY_MATERIAL`
- `REDACTED_REVIEW_SIGNAL_MATERIAL`
- `NO_RAW_METADATA_MANIFEST_MATERIAL`
- `GENERATED_ARTIFACT_OR_EXPORT_MATERIAL`
- `LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL`
- `RAW_PRIVATE_SOURCE_MATERIAL`
- `SOURCE_PACKAGE_MATERIAL`
- `PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL`
- `THIRD_PARTY_MODEL_API_ROUTED_MATERIAL`
- `HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL`

## Route Surfaces

- `MODEL_CONTEXT_ROUTE`
- `INTERNAL_REVIEW_ROUTE`
- `SANITIZED_REVIEW_SUMMARY_ROUTE`
- `LOCAL_LOG_ROUTE`
- `AUDIT_ACCESS_LOG_EVENT_ROUTE`
- `EXPORT_DOWNLOAD_ROUTE`
- `PACKET_DELIVERY_PROMOTION_ROUTE`
- `THIRD_PARTY_MODEL_API_ROUTE`
- `PROVIDER_API_ROUTE`
- `ADMIN_SUPPORT_ACCESS_ROUTE`
- `RETENTION_DELETION_LIFECYCLE_ROUTE`
- `PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION_ROUTE`
- `SOURCE_PACKAGE_ROUTE`
- `RAW_PRIVATE_SOURCE_ROUTE`
- `HUMAN_PROFESSIONAL_REVIEW_ROUTE`

## Deny By Default Rules

- `UNKNOWN_MATERIAL_CLASS_ROUTE_DENIED`
- `RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_DENIED`
- `SOURCE_PACKAGE_MATERIAL_ROUTE_DENIED`
- `PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_ROUTE_DENIED`
- `THIRD_PARTY_MODEL_API_ROUTED_MATERIAL_ROUTE_DENIED`
- `RAW_PRIVATE_SOURCE_ROUTE_DENIED`
- `SOURCE_PACKAGE_ROUTE_DENIED`
- `PDF_IMAGE_SCREENSHOT_METADATA_ROUTE_DENIED`
- `THIRD_PARTY_MODEL_API_ROUTE_DENIED`
- `PROVIDER_API_ROUTE_DENIED`
- `ADMIN_SUPPORT_RAW_ROUTE_DENIED`
- `EXPORT_DELIVERY_ROUTE_DENIED_UNLESS_FUTURE_REVIEW_GATE`
- `PACKET_DELIVERY_ROUTE_DENIED_UNLESS_FUTURE_REVIEW_GATE`
- `LOCAL_LOG_ROUTE_NO_CONTENT_ONLY`
- `AUDIT_EVENT_ROUTE_NO_CONTENT_ONLY`
- `PROVIDER_STATUS_UNKNOWN_BLOCKS_ROUTE`
- `PROVIDER_RETENTION_DELETION_UNKNOWN_BLOCKS_ROUTE`
- `PROVIDER_AUDITABILITY_UNKNOWN_BLOCKS_ROUTE`
- `PROVIDER_TOKEN_URL_SECRET_HANDLING_UNKNOWN_BLOCKS_ROUTE`
- `DATA_ROUTING_MAP_MISSING_BLOCKS_ROUTE`
- `RBAC_MODEL_MISSING_BLOCKS_ROUTE`
- `ADMIN_SUPPORT_MODEL_MISSING_BLOCKS_ROUTE`
- `RETENTION_DELETION_POLICY_MISSING_BLOCKS_ROUTE`
- `AUDIT_ACCESS_LOG_IMPLEMENTATION_MISSING_BLOCKS_ROUTE`
- `GLOBAL_ACCESS_CONTROL_THREAT_MODEL_MISSING_BLOCKS_ROUTE`

## Route Statuses

- `ROUTE_NOT_AUTHORIZED`
- `ROUTE_DENIED_BY_DEFAULT`
- `ROUTE_BLOCKED_UNKNOWN_MATERIAL_CLASS`
- `ROUTE_BLOCKED_RAW_PRIVATE_SOURCE`
- `ROUTE_BLOCKED_SOURCE_PACKAGE`
- `ROUTE_BLOCKED_PDF_IMAGE_SCREENSHOT_METADATA`
- `ROUTE_BLOCKED_THIRD_PARTY_ROUTED_MATERIAL`
- `ROUTE_BLOCKED_PROVIDER_STATUS_UNKNOWN`
- `ROUTE_BLOCKED_RBAC_MISSING`
- `ROUTE_BLOCKED_ADMIN_SUPPORT_UNRESOLVED`
- `ROUTE_BLOCKED_AUDIT_LOGGING_MISSING`
- `ROUTE_BLOCKED_RETENTION_DELETION_MISSING`
- `ROUTE_BLOCKED_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_MISSING`
- `QUARANTINE_OR_BLOCK_REQUIRED`
- `NO_CONTENT_AUDIT_EVENT_REQUIRED`
- `ROUTE_ELIGIBLE_ONLY_AFTER_FUTURE_POLICY_AND_TESTS`
- `ROUTE_CLOSED` as future-only, not available now.

## Default Route Posture

- `DENY_BY_DEFAULT`
- Unknown material class blocks route.
- Raw/private/source material blocks route.
- Source-package material blocks route.
- PDF/image/screenshot/metadata material blocks route.
- Third-party model/API routed material blocks route.
- No route may be inferred from user approval.
- No route may be inferred from admin/support privilege.
- No route may be inferred from local logs.
- No route may be inferred from generated artifact/export status.
- No route may be inferred from package integrity or hash evidence.
- No route may be inferred from DOCS_ONLY boundary.
- No route may be inferred from provider identity.
- No route may be inferred from review convenience.
- Every future route denial event must be no-content.
- Route denial events must not include raw source text.
- Route denial events must not include private facts.
- Route denial events must not include source locators.
- Route denial events must not include filenames/private paths.
- Route denial events must not include URLs or social-media URLs.
- Route denial events must not include tokens or secrets.
- Route denial events must not include prompts, responses, or provider payloads.
- Route denial events must not include PDF/image/screenshot/metadata content.
- Route denial events must not include exact raw timestamps.
- Route denial events must not include legal/clinical/evidentiary/case-truth conclusions.
- Route denial events must not include product/external-use/External Reviewer readiness claims.

## Allowed Now

- Private GPT control-plane specification.
- Private raw-routing deny-by-default vocabulary.
- Private route surface vocabulary.
- Private route status vocabulary.
- Private material-class-to-route posture.
- Private dependency map.
- Private closure criteria draft.
- No-raw / no-source-locator / no-conclusion status language.

## Prohibited Now

- Raw-material routing implementation.
- Route policy implementation.
- Route decision engine.
- Quarantine implementation.
- Block path implementation.
- Validator dispatch.
- Registry lookup.
- Material-class registry implementation.
- Scope model implementation.
- RBAC implementation.
- Admin/support implementation.
- Audit/access-log implementation.
- Event taxonomy runtime code.
- Event emitter.
- Log schema.
- Log storage.
- Retention implementation.
- Deletion implementation.
- Purge implementation.
- Third-party provider/API routing.
- Provider registry.
- Provider status implementation.
- Data-routing map.
- Provider retention/deletion posture.
- Provider auditability posture.
- Provider token/URL/secret handling.
- Real private run.
- Raw source inspection.
- Source package inspection.
- PDF/image/screenshot/metadata acquisition.
- Metadata acquisition.
- External-use.
- External Reviewer delivery.
- Product candidate.
- Blocker closure.

## Dependency Sections

MATERIAL_AND_SCOPE_DEPENDENCIES:

- `MATERIAL_CLASS_REGISTRY_REQUIRED`
- `SCOPE_MODEL_REQUIRED`
- `TENANT_CASE_OBJECT_FUNCTION_PROPERTY_SCOPE_REQUIRED`

RBAC_ADMIN_SUPPORT_DEPENDENCIES:

- `RBAC_MODEL_REQUIRED`
- `ROLE_PERMISSION_MODEL_REQUIRED`
- `ADMIN_SUPPORT_MODEL_REQUIRED`
- `ADMIN_SUPPORT_BYPASS_PREVENTION_REQUIRED`

RETENTION_DELETION_DEPENDENCIES:

- `RETENTION_POLICY_REQUIRED`
- `DELETION_POLICY_REQUIRED`
- `PURGE_POLICY_REQUIRED`
- `MATERIAL_CLASS_LIFECYCLE_POLICY_REQUIRED`

AUDIT_ACCESS_LOG_DEPENDENCIES:

- `AUDIT_ACCESS_LOG_IMPLEMENTATION_REQUIRED`
- `AUDIT_LOGGING_IMPLEMENTATION_REQUIRED`
- `ACCESS_LOGGING_IMPLEMENTATION_REQUIRED`
- `EVENT_TAXONOMY_RUNTIME_CODE_REQUIRED`
- `EVENT_EMITTER_REQUIRED`
- `LOG_SCHEMA_REQUIRED`
- `LOG_STORAGE_REQUIRED`
- `NO_CONTENT_ROUTE_DENIAL_EVENT_REQUIRED`

RAW_ROUTING_DEPENDENCIES:

- `RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED`
- `RAW_PRIVATE_SOURCE_MATERIAL_DENY_BY_DEFAULT`
- `SOURCE_PACKAGE_MATERIAL_DENY_BY_DEFAULT`
- `PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_DENY_BY_DEFAULT`
- `THIRD_PARTY_MODEL_API_ROUTED_MATERIAL_DENY_BY_DEFAULT`
- `QUARANTINE_OR_BLOCK_PATH_REQUIRED`

THIRD_PARTY_DEPENDENCIES:

- `THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED`
- `PROVIDER_REGISTRY_REQUIRED`
- `PROVIDER_STATUS_REQUIRED`
- `PROVIDER_RETENTION_DELETION_POSTURE_REQUIRED`
- `PROVIDER_AUDITABILITY_REQUIRED`
- `PROVIDER_TOKEN_URL_SECRET_HANDLING_REQUIRED`
- `DATA_ROUTING_MAP_REQUIRED`

GLOBAL_DEPENDENCIES:

- `GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST`

## Material Class Route Posture Matrix

| material class | default route posture | allowed route candidate | prohibited route surfaces | required dependency before future eligibility | current status |
| --- | --- | --- | --- | --- | --- |
| `SANITIZED_TEXT_PRIMARY_MATERIAL` | `DENY_BY_DEFAULT` until future controls exist | May be eligible only after future policy, RBAC, audit, and scope tests. | Raw/private/source, provider/API, external-use, External Reviewer delivery. | Future route policy, RBAC, audit, and scope tests. | Not implemented. |
| `REDACTED_REVIEW_SIGNAL_MATERIAL` | `DENY_BY_DEFAULT` until future controls exist | May be eligible only after future policy, RBAC, audit, and human/professional review constraints. | Raw inference, external-use, product conclusion, External Reviewer delivery. | Future route policy, RBAC, audit, and human/professional review constraints. | Not implemented. |
| `NO_RAW_METADATA_MANIFEST_MATERIAL` | `DENY_BY_DEFAULT` until future controls exist | May be eligible only as no-raw metadata summary after schema/audit controls. | Metadata acquisition, raw metadata population, source locators. | Future schema and audit controls. | Not implemented. |
| `GENERATED_ARTIFACT_OR_EXPORT_MATERIAL` | `DENY_BY_DEFAULT` for delivery and external-use | Not delivery-approved and not external-use; export/delivery route denied unless future review gate. | Packet delivery, product use, external-use, External Reviewer delivery. | Future review gate and route policy. | Not implemented. |
| `LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL` | `LOCAL_LOG_ROUTE_NO_CONTENT_ONLY` | Local/no-content only, not CI evidence, not packet component. | CI evidence, packet component, raw log route. | Future local log classification and no-content route policy. | Not implemented. |
| `RAW_PRIVATE_SOURCE_MATERIAL` | `RAW_PRIVATE_SOURCE_MATERIAL_DENY_BY_DEFAULT` | None now. | All raw/private/source routes. | Quarantine/block path required. | Unresolved/not implemented. |
| `SOURCE_PACKAGE_MATERIAL` | `SOURCE_PACKAGE_MATERIAL_DENY_BY_DEFAULT` | None now. | Source-package route and provider/API route. | Quarantine/block path required. | Unresolved/not implemented. |
| `PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL` | `PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_DENY_BY_DEFAULT` | None now. | Acquisition route, model context route, provider/API route. | Quarantine/block path required if ever acquired. | Unresolved/not implemented. |
| `THIRD_PARTY_MODEL_API_ROUTED_MATERIAL` | `THIRD_PARTY_MODEL_API_ROUTED_MATERIAL_DENY_BY_DEFAULT` | None now. | Third-party model/API route and provider/API route. | Provider route/status known, provider posture, and data-routing map required. | Unauthorized/not implemented. |
| `HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL` | Review-only, not route authorization | Human/professional review only. | Product/external-use/External Reviewer delivery and any automated route approval. | Human/professional review gate and future policy. | Not implemented. |

## Route Surface Matrix

| route surface | default posture | route risk | required future control | current status |
| --- | --- | --- | --- | --- |
| `MODEL_CONTEXT_ROUTE` | Denied for raw/private/source unless future no-raw policy and tests exist. | Raw/private/source leakage into model context. | No-raw policy, scope tests, route denial tests. | Not implemented / unresolved. |
| `INTERNAL_REVIEW_ROUTE` | Review-only and no raw/source-locator unless separately authorized. | Review convenience becoming route authorization. | Human/professional review gate and no-source controls. | Not implemented / unresolved. |
| `SANITIZED_REVIEW_SUMMARY_ROUTE` | No-raw only and not external-use. | Sanitized summary treated as product or delivery evidence. | Future review policy and no-raw tests. | Not implemented / unresolved. |
| `LOCAL_LOG_ROUTE` | No-content only, not CI evidence, not packet component. | Local logs becoming evidence or packet material. | Future local log policy and no-content tests. | Not implemented / unresolved. |
| `AUDIT_ACCESS_LOG_EVENT_ROUTE` | No-content only and requires audit/access-log implementation later. | Event logging leaking raw/private/source content. | Audit/access-log implementation and no-content event tests. | Not implemented / unresolved. |
| `EXPORT_DOWNLOAD_ROUTE` | Not delivery-approved and not external-use. | Download treated as delivery or external-use approval. | Future export/download review gate. | Not implemented / unresolved. |
| `PACKET_DELIVERY_PROMOTION_ROUTE` | Cannot bypass human/professional review. | Packet promotion treated as release approval. | Human/professional review gate. | Not implemented / unresolved. |
| `THIRD_PARTY_MODEL_API_ROUTE` | Denied by default. | Provider/API route without known provider posture. | Provider registry, status, data-routing map, retention/deletion, auditability, token/URL/secret handling. | Not implemented / unresolved. |
| `PROVIDER_API_ROUTE` | Denied by default. | Provider route without lifecycle and auditability proof. | Provider registry, status, data-routing map, retention/deletion, auditability, token/URL/secret handling. | Not implemented / unresolved. |
| `ADMIN_SUPPORT_ACCESS_ROUTE` | Cannot bypass no-raw/no-source/scope/RBAC/human review. | Admin/support privilege becoming route approval. | RBAC, admin/support bypass prevention, audit, human/professional review gate. | Not implemented / unresolved. |
| `RETENTION_DELETION_LIFECYCLE_ROUTE` | Requires lifecycle policy, RBAC, audit, and verification. | Lifecycle route used without deletion/retention proof. | Lifecycle policy, RBAC, audit, verification. | Not implemented / unresolved. |
| `PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION_ROUTE` | Denied by default. | Acquisition of sensitive file/image/metadata material. | Quarantine/block path and explicit future authorization. | Not implemented / unresolved. |
| `SOURCE_PACKAGE_ROUTE` | Denied by default. | Source-package routing without quarantine/block. | Quarantine/block path and future route policy. | Not implemented / unresolved. |
| `RAW_PRIVATE_SOURCE_ROUTE` | Denied by default. | Raw/private/source route without quarantine/block. | Quarantine/block path and future route policy. | Not implemented / unresolved. |
| `HUMAN_PROFESSIONAL_REVIEW_ROUTE` | Review-only and not route approval. | Review gate treated as implementation, product, or delivery approval. | Human/professional review process and future policy. | Not implemented / unresolved. |

## Required Future Implementation Evidence

- Material-class registry.
- Scope model.
- Tenant/case/object/function/property scope model.
- Raw-material route policy.
- Route decision engine.
- Quarantine/block path.
- No-content route-denial event taxonomy runtime code.
- No-content event emitter.
- Audit/access-log implementation.
- Log schema.
- Log storage.
- RBAC integration.
- Admin/support bypass-prevention integration.
- Retention/deletion lifecycle integration.
- Third-party provider registry.
- Provider status model.
- Data-routing map.
- Provider retention/deletion posture model.
- Provider auditability posture.
- Provider token/URL/secret handling policy.
- Global access-control threat model.
- No raw/private/source-locator/URL/token/secret leakage tests.

## Required Future Tests

- Unknown material class route denied.
- Raw/private/source route denied.
- Source package route denied.
- PDF/image/screenshot/metadata route denied.
- Third-party model/API route denied.
- Provider status unknown blocks route.
- Provider retention/deletion unknown blocks route.
- Provider auditability unknown blocks route.
- Provider token/URL/secret handling unknown blocks route.
- Data-routing map missing blocks route.
- RBAC missing blocks route.
- Admin/support unresolved blocks route.
- Admin/support cannot approve raw route.
- Admin/support cannot approve provider route.
- Retention/deletion policy missing blocks route.
- Audit/access-log missing blocks route.
- Route denial creates no-content event only.
- Route denial event rejects raw source text.
- Route denial event rejects private facts.
- Route denial event rejects source locator.
- Route denial event rejects local file path.
- Route denial event rejects URL/social URL.
- Route denial event rejects token/secret.
- Route denial event rejects prompt/response/provider payload.
- Route denial event rejects PDF/image/screenshot/metadata content.
- Route denial event rejects exact raw timestamp.
- Route denial event rejects legal/clinical/evidentiary/case-truth conclusion.
- Local log route remains no-content only.
- Local log route remains not CI evidence.
- Local log route remains not packet component.
- Export/download route does not authorize delivery.
- Packet/delivery route does not bypass human/professional review.
- DOCS_ONLY boundary does not become runtime enforcement.

## Active Blockers

- `RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED`
- `RAW_PRIVATE_SOURCE_MATERIAL_DENY_BY_DEFAULT`
- `SOURCE_PACKAGE_MATERIAL_DENY_BY_DEFAULT`
- `PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_DENY_BY_DEFAULT`
- `THIRD_PARTY_MODEL_API_ROUTED_MATERIAL_DENY_BY_DEFAULT`
- `QUARANTINE_OR_BLOCK_PATH_REQUIRED`
- `MATERIAL_CLASS_REGISTRY_NOT_IMPLEMENTED`
- `SCOPE_MODEL_NOT_IMPLEMENTED`
- `RBAC_MODEL_NOT_IMPLEMENTED`
- `ACCESS_CONTROL_NOT_IMPLEMENTED`
- `ROLE_PERMISSION_MODEL_NOT_CREATED`
- `ADMIN_SUPPORT_MODEL_NOT_CREATED`
- `ADMIN_SUPPORT_ACCESS_UNRESOLVED`
- `RETENTION_DELETION_NOT_IMPLEMENTED`
- `RETENTION_POLICY_NOT_CREATED`
- `DELETION_POLICY_NOT_CREATED`
- `PURGE_POLICY_NOT_CREATED`
- `AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED`
- `AUDIT_LOGGING_NOT_IMPLEMENTED`
- `ACCESS_LOGGING_NOT_IMPLEMENTED`
- `EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED`
- `EVENT_EMITTER_NOT_CREATED`
- `LOG_SCHEMA_NOT_CREATED`
- `LOG_STORAGE_NOT_CREATED`
- `THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED`
- `PROVIDER_REGISTRY_REQUIRED`
- `PROVIDER_STATUS_REQUIRED`
- `PROVIDER_RETENTION_DELETION_POSTURE_REQUIRED`
- `PROVIDER_AUDITABILITY_REQUIRED`
- `PROVIDER_TOKEN_URL_SECRET_HANDLING_REQUIRED`
- `DATA_ROUTING_MAP_REQUIRED`
- `GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REQUIRED_FIRST`
- `NO_BLOCKER_RESOLVED`

## Closure Criteria

Before any raw-material routing deny-by-default blocker closure, future repo evidence must show:

- Material-class registry created.
- Scope model created.
- Tenant/case/object/function/property scope model created.
- Raw-material route policy created.
- Route decision engine created.
- Quarantine/block path created.
- No-content route-denial event taxonomy runtime code created.
- No-content event emitter created.
- Audit/access-log implementation created.
- Log schema created.
- Log storage created.
- RBAC role/permission model created.
- Admin/support bypass-prevention model created.
- Retention/deletion lifecycle policy integrated.
- Third-party provider registry created.
- Provider status model created.
- Data-routing map created.
- Provider retention/deletion posture created.
- Provider auditability posture created.
- Provider token/URL/secret handling policy created.
- Global access-control threat model created.
- Unknown-material route denial tests pass.
- Raw/private/source route denial tests pass.
- Source-package route denial tests pass.
- PDF/image/screenshot/metadata route denial tests pass.
- Third-party/provider route denial tests pass.
- Provider status unknown blocks route tests pass.
- Data-routing map missing blocks route tests pass.
- RBAC/admin-support missing blocks route tests pass.
- No-content route denial event tests pass.
- Raw/private/source-locator/URL/token/secret rejection tests pass.
- Prompt/response/provider-payload rejection tests pass.
- Exact raw timestamp rejection tests pass.
- Legal/clinical/evidentiary/case-truth conclusion rejection tests pass.
- Local logs not CI evidence rule preserved.
- Local logs not packet component rule preserved.
- Export/download non-delivery posture preserved.
- Packet/delivery human/professional review gate preserved.
- Product/external-use/External Reviewer non-authorization preserved.

## Closure Not Allowed With

- Private spec only.
- DOCS_ONLY boundary only.
- Local notes.
- Green unrelated tests.
- Local logs alone.
- Local test transcript summaries alone.
- Six-window pilot success.
- User approval alone.
- External Reviewer advisory context alone.
- Package/hash integrity alone.
- Provider identity alone.
- Existing raw-material routing vocabulary alone.
- Existing raw-material routing feasibility review alone.
- Existing security-agent matrix scope review alone.
- Existing raw-material routing control specification boundary alone.
- P1/P2/P3/P4/P5 boundaries alone.

## Duplication Risk

- Existing raw-material routing feasibility review is context only.
- Existing security-agent raw-material routing feasibility matrix scope review is context only.
- Existing raw-material routing control specification boundary is context only.
- Existing audit/access-log, RBAC, admin/support, third-party routing, and global access-control boundaries are context only.
- P6 does not replace or weaken existing raw-material routing boundaries.
- P6 does not reopen existing raw-material routing boundaries.
- P6 does not claim existing raw-material routing boundaries implemented anything.
- P6 is distinct because it freezes the P1-P5 integrated deny-by-default route decision layer.

## Relationships

- Relationship to P1 material-class registry and scope model boundary: upstream context only.
- Relationship to P2 retention/deletion lifecycle control boundary: upstream context only.
- Relationship to P3 RBAC role-permission lifecycle authorization boundary: upstream context only.
- Relationship to P4 admin/support bypass-prevention boundary: upstream context only.
- Relationship to P5 audit/access-log event taxonomy boundary: upstream context only.
- Relationship to existing raw-material routing feasibility review: context only.
- Relationship to existing security-agent raw-material routing feasibility matrix scope review: context only.
- Relationship to existing raw-material routing control specification: context only.
- Relationship to audit/access-log event taxonomy/runtime-readiness blocker analysis: context only.
- Relationship to RBAC role-permission boundaries: context only.
- Relationship to admin/support bypass prevention: context only.
- Relationship to third-party provider routing status/runtime-readiness blocker analysis: context only.
- Relationship to global access-control threat model: context only.
- None of these are implemented or closed by this boundary.

## WHAT_THIS_DOES_NOT_PROVE

- Not implementation.
- Not raw-material routing behavior.
- Not route implementation.
- Not route policy.
- Not route decision engine.
- Not quarantine implementation.
- Not block path implementation.
- Not validator dispatch.
- Not registry lookup.
- Not material-class registry.
- Not scope model.
- Not tenant/case/object/function/property scope model.
- Not RBAC implementation.
- Not access-control implementation.
- Not admin/support implementation.
- Not lifecycle authorization behavior.
- Not retention behavior.
- Not deletion behavior.
- Not purge behavior.
- Not retention policy.
- Not deletion policy.
- Not purge policy.
- Not lifecycle verification.
- Not audit/access-log implementation.
- Not audit logging.
- Not access logging.
- Not event taxonomy runtime code.
- Not event emitter.
- Not log schema.
- Not log storage.
- Not third-party provider routing.
- Not provider registry.
- Not provider status implementation.
- Not provider route.
- Not provider deletion request.
- Not provider deletion verification.
- Not provider retention proof.
- Not data-routing map.
- Not provider retention/deletion posture.
- Not provider auditability.
- Not provider token/URL/secret handling.
- Not runtime/API/schema/package behavior.
- Not test execution except focused doc-freeze proof.
- Not CI evidence.
- Not technical sign-off.
- Not runtime certification.
- Not release approval.
- Not product readiness.
- Not external-use readiness.
- Not External Reviewer-ready material.
- Not legal/clinical/evidentiary/case-truth proof.
- Not security finding.
- Not vulnerability finding.
- Not severity.
- Not remediation.
- Not blocker closure.
- Not dependency closure.

## Non-Authorization

This boundary creates no Codex implementation, no runtime/API/schema/package behavior change, no raw-material routing implementation, no route implementation, no route policy implementation, no route decision engine, no quarantine implementation, no block path implementation, no validator dispatch, no registry lookup, no material-class registry, no scope model, no tenant/case/object/function/property scope model, no RBAC implementation, no access-control implementation, no admin/support implementation, no lifecycle authorization behavior, no retention implementation, no deletion implementation, no purge implementation, no audit/access-log implementation, no audit logging implementation, no access logging implementation, no event taxonomy runtime code, no event emitter, no log schema, no log storage, no third-party model/API use, no provider registry, no provider status implementation, no provider route, no data-routing map, no provider retention/deletion posture, no provider auditability, no provider token/URL/secret handling, no provider deletion request, no product candidate, no external-use, no External Reviewer delivery, no release approval, no runtime certification, no technical sign-off, no legal/clinical/evidentiary/case-truth conclusion, no security finding, no vulnerability finding, no severity, no remediation, no blocker closure, and no dependency closure.
