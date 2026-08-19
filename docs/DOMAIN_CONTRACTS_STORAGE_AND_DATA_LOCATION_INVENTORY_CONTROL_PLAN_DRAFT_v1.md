# Storage and Data Location Inventory Control Plan Draft v1

Status: DOCS_ONLY / CONTROL_PLAN_DRAFT_ONLY.

This document is a control-plan draft only. It creates no storage implementation, no database implementation, no object storage implementation, no audit-log storage, no retention implementation, no deletion implementation, no purge implementation, no erasure implementation, no encryption implementation, no key management implementation, no RBAC/access-control implementation, no admin/support runtime access, no provider routing, and no pilot implementation.

It creates no release approval. External-use is not authorized. Product candidate remains none. It creates no runtime certification and no technical sign-off. Human/professional review is required before any release, external-use, product-candidate, runtime, storage, provider, lifecycle, audit, RBAC, or pilot decision.

## Purpose

This control-plan draft maps where data may exist before any future lifecycle, audit, RBAC, provider, or pilot implementation. It defines inventory fields and evidence requirements for future review while preserving the separation between local logs, CI evidence, and release evidence.

## Current Merged Repo Posture

- PR #1 merged as governance control-plane scaffold only.
- PR #2 merged as CI/evidence-hardening only.
- CI evidence exists for the test/lint/build/auditability path.
- CI evidence is not release approval, runtime certification, technical sign-off, external-use authorization, or product-candidate selection.

## Core Principles

- DATA_LOCATION_KNOWN does not mean DATA_HANDLING_POLICY_IMPLEMENTED.
- STORAGE_SURFACE_EXISTS does not mean RETENTION_IMPLEMENTED.
- FILE_EXISTS does not mean SOURCE_TRUTH.
- HASH_OR_MANIFEST_EXISTS does not mean TRUTH_PROOF.
- LOCAL_LOG_EXISTS does not mean CI_EVIDENCE.
- CI_LOG_EXISTS does not mean RELEASE_EVIDENCE.
- AUDIT_EVENT_CANDIDATE does not mean AUDIT_LOG_STORAGE.
- DELETION_REQUEST does not mean DELETION_EXECUTED.
- PROVIDER_POSTURE does not mean PROVIDER_DELETION_VERIFICATION.

## Data-Location Taxonomy

- L01_REPO_TRACKED_SOURCE_FILES
- L02_REPO_TRACKED_TEST_FILES
- L03_REPO_TRACKED_DOCS
- L04_REPO_TRACKED_SCHEMAS
- L05_REPO_PACKAGE_MANIFESTS
- L06_REPO_LOCKFILE
- L07_GITHUB_ACTIONS_WORKFLOWS
- L08_GITHUB_ACTIONS_CI_LOGS
- L09_GITHUB_ACTIONS_CI_ARTIFACTS
- L10_LOCAL_TEST_LOGS
- L11_LOCAL_UNTRACKED_FILES
- L12_LOCAL_GENERATED_ARTIFACTS
- L13_LOCAL_EXPORT_PACKAGES
- L14_LOCAL_ARCHIVES_OR_ZIPS
- L15_NODE_MODULES_OR_PACKAGE_CACHE
- L16_OPERATOR_UI_CACHE_FUTURE
- L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE
- L18_OBJECT_STORAGE_FUTURE
- L19_QUEUE_TEMP_STORAGE_FUTURE
- L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE
- L21_BACKUP_SNAPSHOT_STORAGE_FUTURE
- L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE
- L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE
- L24_PR_COMMENTS_ISSUES_REVIEW_METADATA
- L25_CONNECTOR_TOOL_OR_AGENT_STATE

## Data-Location Inventory Matrix

| Location ID | Location name | Current/future status | Possible data class | Current policy posture | Implementation status | Non-authorized until closure |
| --- | --- | --- | --- | --- | --- | --- |
| L01_REPO_TRACKED_SOURCE_FILES | Repo tracked source files | Current | SYNTHETIC_NO_RAW_MATERIAL, PACKAGE_LOCK_OR_BUILD_METADATA | Tracked source only, no raw/private/source inspection authorized | Existing repo surface; no new storage behavior | Raw/private/source material, runtime enforcement, release approval |
| L02_REPO_TRACKED_TEST_FILES | Repo tracked test files | Current | SYNTHETIC_NO_RAW_MATERIAL, LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL | Tests prove only explicit assertions | Existing repo surface; no new storage behavior | Legal/clinical/evidentiary conclusions, product readiness |
| L03_REPO_TRACKED_DOCS | Repo tracked docs | Current | SANITIZED_TEXT_PRIMARY_MATERIAL, NO_RAW_METADATA_MANIFEST_MATERIAL | Docs are contract source of truth, not execution | Existing repo surface; no new storage behavior | Runtime certification, technical sign-off |
| L04_REPO_TRACKED_SCHEMAS | Repo tracked schemas | Current | NO_RAW_METADATA_MANIFEST_MATERIAL | Machine-readable contracts only | Existing repo surface; no new storage behavior | Runtime storage, lifecycle execution |
| L05_REPO_PACKAGE_MANIFESTS | Repo package manifests | Current | PACKAGE_LOCK_OR_BUILD_METADATA | Dependency metadata only | Existing repo surface; no new storage behavior | Supply-chain approval, security approval |
| L06_REPO_LOCKFILE | Repo lockfile | Current | PACKAGE_LOCK_OR_BUILD_METADATA | Deterministic install/auditability evidence | Created by PR #2 for auditability only | Supply-chain security approval, truth proof |
| L07_GITHUB_ACTIONS_WORKFLOWS | GitHub Actions workflows | Current | CI_LOG_OR_WORKFLOW_ARTIFACT | CI path definition only | Created by PR #2 for CI evidence only | Release gate, runtime certification, technical sign-off |
| L08_GITHUB_ACTIONS_CI_LOGS | GitHub Actions CI logs | Current | CI_LOG_OR_WORKFLOW_ARTIFACT | CI evidence only | Platform-retained CI evidence; no repo storage behavior | Release evidence, product candidate, external-use |
| L09_GITHUB_ACTIONS_CI_ARTIFACTS | GitHub Actions CI artifacts | Future/current candidate | CI_LOG_OR_WORKFLOW_ARTIFACT | Not used as release evidence by this draft | Not implemented by this draft | Release packet, approved artifact, external-use |
| L10_LOCAL_TEST_LOGS | Local test logs | Current/local | LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL | Local evidence only | Local-only, not CI evidence | CI evidence, release evidence, audit proof |
| L11_LOCAL_UNTRACKED_FILES | Local untracked files | Current/local | UNKNOWN_NOT_EVIDENCED | Present but not inspected or relied on | No implementation and no inspection | Source truth, raw/private processing, release evidence |
| L12_LOCAL_GENERATED_ARTIFACTS | Local generated artifacts | Current/local candidate | GENERATED_ARTIFACT_OR_EXPORT_MATERIAL | Generated artifact only | No approval, no packet status | External-use packet, product candidate, release approval |
| L13_LOCAL_EXPORT_PACKAGES | Local export packages | Current/local candidate | GENERATED_ARTIFACT_OR_EXPORT_MATERIAL | Local package candidate only | No delivery authorization | External-use, court use, public authority disclosure |
| L14_LOCAL_ARCHIVES_OR_ZIPS | Local archives or zips | Current/local candidate | GENERATED_ARTIFACT_OR_EXPORT_MATERIAL | Local archive candidate only | No release or product status | Approved packet, release evidence, product readiness |
| L15_NODE_MODULES_OR_PACKAGE_CACHE | Node modules or package cache | Current/local cache | PACKAGE_LOCK_OR_BUILD_METADATA | Build/cache surface only | No security approval | Security approval, source truth, runtime certification |
| L16_OPERATOR_UI_CACHE_FUTURE | Operator UI cache | Future | HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL | Future candidate only | Not implemented | Private source storage, browser cache approval |
| L17_DATABASE_OR_PERSISTED_STORAGE_FUTURE | Database or persisted storage | Future | AUDIT_ACCESS_EVENT_RECORD, NO_RAW_METADATA_MANIFEST_MATERIAL | Future candidate only | Not implemented | Raw/private persistence, lifecycle claims, access control |
| L18_OBJECT_STORAGE_FUTURE | Object storage | Future | GENERATED_ARTIFACT_OR_EXPORT_MATERIAL | Future candidate only | Not implemented | Export storage, retention claims, external-use |
| L19_QUEUE_TEMP_STORAGE_FUTURE | Queue/temp storage | Future | NO_RAW_METADATA_MANIFEST_MATERIAL | Future candidate only | Not implemented | Unexpected retention, raw/private temp storage |
| L20_AUDIT_ACCESS_LOG_STORAGE_FUTURE | Audit/access log storage | Future | AUDIT_ACCESS_EVENT_RECORD | Event taxonomy is no-content only | Not implemented | Audit proof, chain of custody, raw/private log payloads |
| L21_BACKUP_SNAPSHOT_STORAGE_FUTURE | Backup/snapshot storage | Future | NO_RAW_METADATA_MANIFEST_MATERIAL | Future candidate only | Not implemented | Deleted-material retention, purge verification |
| L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE | Third-party provider storage | Future | THIRD_PARTY_MODEL_API_ROUTED_MATERIAL, PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL | Denied/not authorized | Not implemented | Provider routing, provider deletion verification |
| L23_RECIPIENT_DOWNSTREAM_STORAGE_FUTURE | Recipient downstream storage | Future | GENERATED_ARTIFACT_OR_EXPORT_MATERIAL | Future candidate only | Not implemented | Recipient compliance, recipient purge verification |
| L24_PR_COMMENTS_ISSUES_REVIEW_METADATA | PR comments/issues/review metadata | Current | REDACTED_REVIEW_SIGNAL_MATERIAL, NO_RAW_METADATA_MANIFEST_MATERIAL | Review metadata only | Platform metadata; no release approval | Approval/sign-off, legal conclusions, product readiness |
| L25_CONNECTOR_TOOL_OR_AGENT_STATE | Connector/tool/agent state | Current/future candidate | NO_RAW_METADATA_MANIFEST_MATERIAL | Tool state is not source truth | Not implementation evidence | Runtime certification, truth proof, raw/private reliance |

## Material Classes

- SYNTHETIC_NO_RAW_MATERIAL
- SANITIZED_TEXT_PRIMARY_MATERIAL
- REDACTED_REVIEW_SIGNAL_MATERIAL
- NO_RAW_METADATA_MANIFEST_MATERIAL
- GENERATED_ARTIFACT_OR_EXPORT_MATERIAL
- LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL
- CI_LOG_OR_WORKFLOW_ARTIFACT
- HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL
- RAW_PRIVATE_SOURCE_MATERIAL
- SOURCE_PACKAGE_MATERIAL
- PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL
- THIRD_PARTY_MODEL_API_ROUTED_MATERIAL
- PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL
- TOKEN_URL_SECRET_MATERIAL
- AUDIT_ACCESS_EVENT_RECORD
- PACKAGE_LOCK_OR_BUILD_METADATA

## High-Risk Material Classes

The following high-risk material classes remain denied or not authorized by this draft:

| Material class | Status |
| --- | --- |
| RAW_PRIVATE_SOURCE_MATERIAL | DENIED_NOT_AUTHORIZED |
| SOURCE_PACKAGE_MATERIAL | DENIED_NOT_AUTHORIZED |
| PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL | DENIED_NOT_AUTHORIZED |
| THIRD_PARTY_MODEL_API_ROUTED_MATERIAL | DENIED_NOT_AUTHORIZED |
| PROVIDER_PAYLOAD_PROMPT_RESPONSE_MATERIAL | DENIED_NOT_AUTHORIZED |
| TOKEN_URL_SECRET_MATERIAL | DENIED_NOT_AUTHORIZED |

## Required Inventory Fields

Future inventory rows must include:

- location ID
- storage type
- current/future status
- owner/controller
- actor access categories
- material classes allowed
- material classes prohibited
- tenant/case/object/function/property scope
- raw/private/source risk
- source-locator risk
- token/URL/secret risk
- retention category
- deletion support
- purge support
- erasure relation
- encryption requirement
- key-management relation
- audit/access-log relation
- backup/snapshot relation
- provider/recipient relation
- CI/local/release evidence relation
- current evidence level
- implementation gap
- required tests before closure
- non-authorized until closure

## Dependency Map

Storage inventory is upstream of RBAC/access-control, admin/support access, audit/access logs, retention/deletion/purge/erasure, encryption/key management, provider routing, recipient/downstream purge verification, and internal sanitized pilot runtime.

## Threat Rows

- SDL-001 untracked local files contain sensitive material.
- SDL-002 generated artifact treated as approved packet.
- SDL-003 local logs treated as CI logs.
- SDL-004 CI logs treated as release evidence.
- SDL-005 package-lock treated as security approval.
- SDL-006 GitHub PR comments treated as approval/sign-off.
- SDL-007 future DB stores raw/private material.
- SDL-008 object storage stores exports without lifecycle policy.
- SDL-009 audit logs contain raw/private data.
- SDL-010 queue/temp storage retains data unexpectedly.
- SDL-011 backups retain deleted material.
- SDL-012 provider stores routed data.
- SDL-013 recipient retains delivered packet.
- SDL-014 browser/operator cache leaks review packet.
- SDL-015 source package enters repo or storage.
- SDL-016 token/secret stored in logs or workflow.

## Required Evidence Before Closure

- tracked repo location map
- generated artifact location map
- local log policy
- CI log policy
- package/cache policy
- untracked file policy
- future DB/storage architecture
- audit-log storage design
- queue/temp storage design
- backup/snapshot policy
- provider storage policy
- recipient/downstream storage policy
- material-class mapping per location
- access-control mapping per location
- lifecycle mapping per location
- CI-running tests or doc-freeze tests as appropriate

## Required Tests Before Implementation Closure

- package-lock exists and is used by CI
- workflow uses npm ci, not npm install
- local logs not treated as CI evidence
- CI logs not treated as release evidence
- generated artifacts not treated as external-use packets
- package manifests/hashes not treated as truth proof
- source packages denied by default
- raw/private/source material denied by default
- PDF/image/screenshot/metadata denied by default
- token/URL/secret not logged or routed
- audit event payload rejects raw/private/source fields
- storage location map contains required fields
- unknown storage location marked UNKNOWN_NOT_EVIDENCED
- deletion policy cannot claim deletion without execution evidence
- provider storage cannot be claimed without provider posture evidence
- recipient purge cannot be claimed from recipient response alone

## Non-Overclaim Rules

- STORAGE_INVENTORY_REVIEW does not mean STORAGE_INVENTORY_COMPLETE.
- LOCATION_TAXONOMY does not mean DATA_DISCOVERY_COMPLETED.
- TRACKED_REPO_FILE does not mean RUNTIME_STORAGE.
- PACKAGE_LOCK does not mean SUPPLY_CHAIN_SECURITY_APPROVAL.
- CI_WORKFLOW does not mean RELEASE_GATE.
- CI_LOG does not mean RELEASE_EVIDENCE.
- LOCAL_LOG does not mean CI_EVIDENCE.
- UNTRACKED_FILE_PRESENT does not mean INSPECTED_OR_RELIED_ON.
- GENERATED_ARTIFACT does not mean APPROVED_PACKET.
- HASH_OR_MANIFEST does not mean TRUTH_PROOF.
- AUDIT_EVENT_CANDIDATE does not mean AUDIT_LOG_STORAGE.
- RETENTION_POLICY does not mean RETENTION_EXECUTION.
- DELETION_REQUEST does not mean DELETION_EXECUTED.
- PROVIDER_STATUS does not mean PROVIDER_VERIFICATION.
- RECIPIENT_RESPONSE does not mean RECIPIENT_COMPLIANCE.

## Readiness Outcome

- STORAGE_AND_DATA_LOCATION_INVENTORY_NOT_COMPLETE
- STORAGE_IMPLEMENTATION_NOT_READY
- DATABASE_OR_PERSISTED_STORAGE_NOT_IMPLEMENTED
- AUDIT_LOG_STORAGE_NOT_IMPLEMENTED
- CI_EVIDENCE_LOCATION_PARTIALLY_CREATED_BY_PR_2
- PACKAGE_LOCK_AUDITABILITY_CREATED_BY_PR_2
- LOCAL_UNTRACKED_FILES_PRESENT_NOT_INSPECTED
- FUTURE_RUNTIME_STORAGE_CANDIDATE_ONLY
- recommended next track candidate only, no implementation authorized

## Final Tokens

- STORAGE_AND_DATA_LOCATION_INVENTORY_CONTROL_PLAN_DRAFT_v1_CREATED
- NO_STORAGE_IMPLEMENTATION
- NO_DATABASE_IMPLEMENTATION
- NO_OBJECT_STORAGE_IMPLEMENTATION
- NO_AUDIT_LOG_STORAGE
- NO_RETENTION_IMPLEMENTATION
- NO_DELETION_IMPLEMENTATION
- NO_PURGE_IMPLEMENTATION
- NO_ERASURE_IMPLEMENTATION
- NO_ENCRYPTION_IMPLEMENTATION
- NO_KEY_MANAGEMENT_IMPLEMENTATION
- NO_PROVIDER_STORAGE_POLICY
- NO_RECIPIENT_PURGE_VERIFICATION
- NO_RBAC_IMPLEMENTATION
- NO_ACCESS_CONTROL_ENFORCEMENT
- NO_ADMIN_SUPPORT_RUNTIME_ACCESS
- NO_THIRD_PARTY_ROUTING_AUTHORIZATION
- NO_RELEASE_APPROVAL
- EXTERNAL_USE_NOT_AUTHORIZED
- PRODUCT_CANDIDATE_NONE
- NO_RUNTIME_CERTIFICATION
- NO_TECHNICAL_SIGN_OFF
- HUMAN_PROFESSIONAL_REVIEW_REQUIRED
