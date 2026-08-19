# Local Service Permission Source, Repository, and Writer Architecture Boundary v1

**Status:** `DOCS_ONLY_ARCHITECTURE_BOUNDARY`

**Evidence classification:** `DOCS_ONLY`

**Implementation posture:** `NOT_IMPLEMENTED`

**Runtime posture:** `NOT_RUNTIME_ENFORCEMENT`

**Authority posture:** `NO_PERMISSION_AUTHORITY_CREATED`

## 1. Status and classification

This document is `DOCS_ONLY` and `PROVE_ONLY`. It is `NOT_IMPLEMENTED`, `NOT_RUNTIME_ENFORCEMENT`, and creates no permission authority.

It is architecture source only. It is not a contract, not a schema, not a validator, not a repository, not a writer, not permission authority, not process authentication, not service authorization, and not runtime enforcement.

## 2. Purpose

This document preserves architecture-neutral source, administration, writer, repository, current-state, history, access, failure, restart, restore, and recovery boundaries for local service permission authority.

It records the boundary before any implementation, storage, schema, public surface, runtime integration, or permission authority is selected.

## 3. Accepted tracked baseline

The accepted tracked baseline artifacts are:

- `docs/LOCAL_SERVICE_AUTHORIZATION_ARCHITECTURE_BOUNDARY_v1.md`
- `packages/governance/src/local-service-permission-current-state-evidence-contract.js`
- accepted PR #76 architecture marker `LOCAL_SERVICE_AUTHORIZATION_ARCHITECTURE_BOUNDARY_V1_DOCS_ONLY_NO_IMPLEMENTATION`
- accepted PR #77 merge marker `MERGED_AS_LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_SCHEMA_VALIDATOR_AFTER_PR76`

Conversation semantic locks are planning context. After separate review and merge, this document is the tracked architecture source for only this source, repository, and writer boundary.

## 4. Scope

This boundary excludes implementation, schemas, stores, databases, process names, APIs, credentials, roles, routes, runtime enforcement, and external use.

It does not select organizational authority, implementation ownership, persistence technology, runtime interfaces, permission names, operation names, or proof closure.

## 5. Exact permission relation

Current permission truth concerns one exact caller process, one exact intended service recipient, one exact service operation, and one exact request purpose.

Wildcard caller, wildcard recipient, wildcard operation, wildcard purpose, all-operations permission, inheritance, broad scope, portable grants, bearer permissions, and fallback authority are rejected.

## 6. Structural evidence is not authority

PR #77-valid evidence is structural only. Source references are not verified sources. Version references are not verified currentness. Lifecycle declarations are not lifecycle truth.

Repository storage is not authority. History is not authority. Audit is not authority.

## 7. Governed permission administration

A logically separate governed permission-administration authority is required before any positive permission state can become authoritative.

Self-approval is prohibited. Positive widening requires independent approval. Positive restoration requires independent approval. Recovery is separate from ordinary administration. Emergency reduction does not restore positive authority.

No organizational role name is selected by this document.

## 8. Approval and execution separation

Approval and execution are separate boundaries. Approval does not itself mutate current state.

Future execution would require a governed transition path and proof that the execution matched the approved boundary. That path is not created here.

## 9. Single authoritative writer

Exactly one logical authoritative writer is required before current-state mutation can be authoritative.

Caller writes, API route writes, API self-granting, evaluator self-granting, audit writes, configuration authority, fixture authority, and multi-writer current-state mutation are prohibited.

No writer component, function, class, module, process, endpoint, or API is selected by this document.

## 10. Versioned current-state repository

Current state must be versioned. Exactly one current version may support positive reliance for one exact relation scope.

Positive reliance may rest only on governed current state. Absence, uncertainty, disputed state, or unavailable current state fails closed.

## 11. Non-rewriting lifecycle history

Lifecycle history is non-rewriting and separate from current authority. History alone is never current authority.

Correction is a new governed transition. Rollback is a new governed transition. Recovery is a new governed transition. Historical records cannot reactivate a permission.

## 12. Logical transition boundary

A future governed transition must conceptually bind expected current version, transition declaration, resulting version, writer provenance, transaction outcome, and corresponding history entry.

This section selects no field names and no implementation mechanics.

## 13. Stale writes, conflicts, and unknown outcomes

Stale write, concurrent conflict, duplicate current record, overlapping current record, unknown transaction completion, partial transition, and current/history mismatch fail closed.

These cases cannot support positive reliance, current authority, service authorization, or access grants.

## 14. Exact scope, no wildcards, and no inheritance

Wildcard caller, wildcard recipient, wildcard operation, wildcard purpose, all-operations permission, inherited permission, broad service-admin permission, human-role derivation, tenant/case derivation, route/capability derivation, portable or bearer-style grant, and fallback authority are prohibited.

## 15. Repository ownership and direct-access prohibition

Logical authority ownership remains separate from storage placement. Physical co-location does not imply shared authority.

Direct caller store access, direct API route store access, direct non-owner write access, direct cross-process store access by non-owners, and raw repository handles for consumers are prohibited.

## 16. Read-only resolution and downstream evaluation

Trusted read-only resolution, minimized sanitized resolver result, process-authenticated request boundary, current-request evaluation, and runtime service authorization remain downstream.

This document creates none of them.

## 17. Failure and availability semantics

Absent, unavailable, stale, conflicting, disputed, suspended, revoked, expired, superseded, retired, and unknown state fails closed.

Failure to establish current authority blocks positive reliance.

## 18. Restart, restore, and recovery

Restart does not preserve uncertain authority. Cache is not authority. Backup is not authority. Stale backup cannot reactivate revoked permission.

Incomplete restore fails closed. Restored state requires reconciliation. Recovery is a governed transition.

## 19. Bootstrap and emergency reduction

Bootstrap is not created. Any future bootstrap must be narrow, independently approved, single-use, replay-resistant, and retired.

Failed retirement blocks positive reliance. Emergency automation is reduction-only by default. Restoration requires ordinary governed approval.

## 20. Privacy and minimization

Future boundaries may expose only minimized opaque references and non-sensitive currentness, lifecycle, and provenance categories.

Ordinary exposure is prohibited for credentials, tokens, keys, certificates, secrets, provider payloads, raw configuration, full permission records, full lifecycle history, administrator notes, approval identities, recovery secrets, human roles, human permissions, tenant/case membership, resource placement, domain authorization, and access-grant decisions.

## 21. Audit boundary

Future audit may evidence events but cannot create permission authority, become current state, prove currentness, authorize a request, reactivate a permission, or substitute for repository truth.

Audit emission and audit storage are not created here.

## 22. Architecture matrix

| Boundary area | Required invariant | Current tracked evidence | Future dependency | Authority created by this document |
| --- | --- | --- | --- | --- |
| Exact permission relation | One exact relation only | DOCS_ONLY | Future reviewed current-state authority | No |
| Permission administration | Governed administration remains separate | UNKNOWN_NOT_EVIDENCED | Future approved administration boundary | No |
| Approval and execution separation | Approval alone does not mutate state | DOCS_ONLY | Future transition execution proof | No |
| Authoritative source | Structural evidence is not authority | UNKNOWN_NOT_EVIDENCED | Future governed source artifact | No |
| Single authoritative writer | One logical writer only | UNKNOWN_NOT_EVIDENCED | Future writer proof | No |
| Versioned current state | One current version for exact scope | SCHEMA_VALIDATOR_ENFORCED_FOR_EXPORTED_TRACKED_SCHEMA_VALIDATORS_ONLY | Future repository currentness proof | No |
| Lifecycle history | Non-rewriting history separate from authority | DOCS_ONLY | Future history boundary and proof | No |
| Transition boundary | Expected version, result, provenance, outcome, and history align | UNKNOWN_NOT_EVIDENCED | Future transition contract or proof | No |
| Concurrency and stale writes | Stale or conflicting writes fail closed | DOCS_ONLY | Future concurrency proof | No |
| Repository access | Non-owners receive no raw handle | DOCS_ONLY | Future ownership and access proof | No |
| Read-only resolver | Resolution remains downstream and sanitized | NOT_AUTHORIZED | Future resolver boundary | No |
| Current-request evaluator | Evaluation remains downstream and current-call-bound | NOT_AUTHORIZED | Future evaluator boundary | No |
| Process authentication | Authentication remains separate prerequisite | NOT_AUTHORIZED | Future process-authentication proof | No |
| Restart, restore, and recovery | Uncertain authority fails closed | DOCS_ONLY | Future recovery proof | No |
| Audit evidence | Audit is evidence only | NOT_AUTHORIZED | Future audit boundary | No |
| Runtime enforcement | Enforcement remains downstream | NOT_AUTHORIZED | Future runtime authorization proof | No |

## 23. Future synthetic proof obligations

Future positive proof categories include independently governed exact permission transition, single-writer transition, expected-version match, resulting-version change, current-state/history consistency, non-rewriting history, suspension removes positive reliance, revocation removes positive reliance, expiry removes positive reliance, supersession removes positive reliance, retirement removes positive reliance, restart requires currentness re-establishment, restore requires reconciliation, recovery creates a new governed transition, and emergency reduction removes authority without granting authority.

Future synthetic rejection obligations include caller-created permission, API-created permission, route-derived permission, handler-derived permission, generic-capability-derived permission, human-role-derived permission, tenant/case-derived permission, evaluator self-grant, identity-service self-grant, configuration authority, environment authority, audit-derived authority, history-as-current, fixture authority, wildcard, inheritance, broad service-admin permission, duplicate current records, overlapping current records, stale write, conflicting transition, missing expected version, unknown commit outcome, partial transition, current/history mismatch, unavailable source, unavailable writer, unavailable repository, stale cache, stale backup, restored revoked permission, failed bootstrap retirement, unauthorized recovery, positive break-glass, sensitive repository-output leakage, direct API store access, and direct non-owner cross-process store access.

No executable tests are created for these proof obligations in this slice.

## 24. Deferred decisions

The following remain deferred: organizational role names, component names, process names, public symbols, contract names, evidence-kind names, field names, lifecycle enum tokens, error codes, store product, database, table, migration, transaction library, cache, process placement, API, RPC, transport, credential, timeout, retention, deletion, encryption, and implementation.

## 25. Closure-evidence model

Conversation semantic lock, DOCS_ONLY document, schema-valid evidence, focused test, CI success, merge provenance, package export, store-product choice, and database choice do not close this boundary.

Future closure requires separately authorized design, implementation, synthetic proof, integration proof, currentness proof, security review, and human/professional review.

## 26. Evidence and provenance

Accepted tracked architecture is documentation evidence. Structural evidence is schema-validator evidence for exported tracked schema validators only. Local validation is local proof evidence only. CI evidence is tested-commit evidence only. Merge provenance is repository history only. Future runtime evidence remains separate.

No evidence class above creates permission authority.

## 27. Explicit non-authorizations

This document creates no permission, permission transition, permission authority, permission-administration role, approval, source implementation, repository, store, database, schema, table, migration, writer, reader, resolver, evaluator, lookup, registry, policy engine, process authentication, service authorization, access grant, human RBAC, tenant/case authority, domain authorization, route integration, middleware, persistence, audit emission, audit storage, provider routing, external-use authorization, product approval, security finding, severity, remediation, technical sign-off, runtime certification, release approval, blocker closure, legal conclusion, clinical conclusion, evidentiary conclusion, or case-truth conclusion.

## 28. Human/professional review

Human/professional review remains required.

LOCAL_SERVICE_PERMISSION_SOURCE_REPOSITORY_WRITER_ARCHITECTURE_BOUNDARY_V1_DOCS_ONLY_NO_IMPLEMENTATION
