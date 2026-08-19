# Local Service Authorization Architecture Boundary v1

- `Status: DOCS_ONLY_ARCHITECTURE_BOUNDARY`
- `Version: v1`
- `Evidence classification: DOCS_ONLY`
- `Implementation posture: NOT_IMPLEMENTED`
- `Runtime posture: NOT_RUNTIME_ENFORCEMENT`
- `Schema posture: NOT_SCHEMA_VALIDATOR_ENFORCEMENT`
- `Process authentication: NOT_CREATED`
- `Service authorization implementation: NOT_CREATED`
- `Authoritative permission source: NOT_CREATED`
- `Permission repository: NOT_CREATED`
- `Permission resolver: NOT_CREATED`
- `Current-request evaluator: NOT_CREATED`
- `Portable authorization grant: NOT_CREATED`
- `Domain authorization: NOT_CREATED`
- `External use: EXTERNAL_USE_NOT_AUTHORIZED`
- `Product candidate: PRODUCT_CANDIDATE_NONE`
- `Human review: HUMAN_PROFESSIONAL_REVIEW_REQUIRED`

## 1. Status and classification

This document is a DOCS_ONLY architecture boundary. It records selected local service authorization architecture principles for later review. It does not create runtime behavior, schema enforcement, validator behavior, service permission authority, service authorization implementation, implementation readiness, or blocker closure.

Current evidence posture:

- current route/case/capability behavior: `RUNTIME_ENFORCED_FOR_DOCUMENTED_AND_TESTED_SURFACES_ONLY`
- existing exported structural validators: `SCHEMA_VALIDATOR_ENFORCED_FOR_EXPORTED_TRACKED_SCHEMA_VALIDATORS_ONLY`
- local service-permission source/repository/resolver/evaluator: `UNKNOWN_NOT_EVIDENCED`
- this document: `DOCS_ONLY`
- external use: `NOT_AUTHORIZED`
- professional review: `HUMAN_PROFESSIONAL_REVIEW_REQUIRED`

Route/case/capability evidence is not full authentication, full RBAC, full access control, admin/support access control, global authorization, or local service authorization.

## 2. Purpose

The purpose is to freeze a narrow architecture boundary for local service authorization before any schema, repository, resolver, evaluator, endpoint, transport, credential, product, or implementation choice is made. The boundary preserves deny-by-default service authorization, current-call-only decision semantics, and explicit separation from human RBAC and domain authorization.

## 3. Scope

This boundary covers architecture ownership, separation, invariants, failure posture, authority decay, privacy posture, audit dependency, future proof obligations, and explicit non-authorizations. It does not select service operation public names, permission public names, fields, schemas, repository interfaces, resolver interfaces, evaluator interfaces, runtime routes, transport, credentials, products, or implementation instructions.

## 4. Source and provenance

Live tracked repository evidence controls over conversation memory. Conversation decisions are planning context only. Repository acceptance provenance is the future commit and merge introducing this file. Merge provenance is not permission authority. Documentation is not runtime enforcement. Tests are not sign-off. CI is tested-commit evidence only. Hashes and manifests are integrity evidence only, not truth proof. No historical evidence is rewritten.

## 5. Existing evidence posture

Existing structural validators remain limited to their tracked validator surfaces. Schema-valid data is not trusted provenance. Existing route/case/capability gates remain partial and surface-specific. The current local service-permission source, permission repository, permission resolver, current-request evaluator, and service authorization implementation remain unknown or not created.

## 6. Authority ownership

Process authentication is required but not sufficient service authorization. Service authorization is separate from human RBAC. Service authorization is separate from tenant/case membership. Service authorization is separate from domain authorization.

Process-trust administration logically owns positive permission state. API runtime is not a permission writer. Identity-service runtime is not a positive permission writer. Route handlers are not permission writers. Exactly one authoritative writer is required for a future permission repository.

| Boundary | Planned authority owner | Current evidence | Required invariant | Explicit non-authorization |
| --- | --- | --- | --- | --- |
| process-trust administration | process-trust administration | planning context only | owns positive permission-state administration if later implemented | no process-trust implementation |
| service-operation definition | deferred governance source | not created | service operations are conceptually explicit | no operation creation |
| service-permission current state | process-trust administration | not created | versioned current state required before evaluation | no permission source |
| lifecycle history | process-trust administration | not created | non-rewriting lifecycle history | no lifecycle store |
| authoritative writer | one separately authorized writer | not created | one writer only for positive and reduction transitions | no writer |
| permission repository | process-trust administration | not created | no direct cross-process store access | no repository |
| trusted read-only resolver | trusted resolver boundary | not created | minimized read-only resolution only | no resolver |
| current-request evaluator | identity service boundary | not created | evaluates one current service call only | no evaluator |
| API recipient rebinding | API runtime as recipient context | partial route evidence only | API cannot write or directly resolve permission state | no API authorization engine |
| domain authorization | separate future domain authority | not created | service authorization must not become domain authorization | no domain authorization |
| audit evidence | separate audit boundary | not implementation evidence | audit evidence is not permission current state | no audit implementation |

## 7. Service-operation boundary

Service operations are conceptually explicit. Exact operation identifiers remain deferred. Unknown operations fail closed. Broad implicit service roles or inherited permissions are prohibited. A future service operation must not be inferred from route names, capability strings, human roles, tenant/case membership, resource placement, audit evidence, or caller-provided context.

## 8. Deny-by-default permission semantics

Authorization is deny-by-default. Wildcards are prohibited for the first scope. Only positively current active permission may support a future call. Missing or unknown permission currentness fails closed. Broad implicit permission, inherited permission, caller-created permission result, route-derived permission, and capability-string permission are not accepted as authority.

## 9. Permission current state and lifecycle

Permission current state is versioned. Lifecycle history is non-rewriting. Historical permission evidence is not current permission authority. Restored data does not automatically establish currentness. Permission inactive, suspended, revoked, expired, retired, disputed, unknown, duplicated, conflicting, stale, partially transitioned, or current/history-mismatched state fails closed.

## 10. Authoritative writer boundary

Exactly one authoritative writer is required for a future permission repository. API runtime, identity-service runtime, route handlers, callers, tests, CI, audit records, schemas, and documentation are not permission writers. Positive permission state and reduction transitions require separately reviewed future evidence.

## 11. Permission repository boundary

A future permission repository would hold versioned current state and non-rewriting lifecycle history only if separately authorized. API has no direct permission-store or resolver access. Direct cross-process store access is prohibited. Repository, storage, database, cache, queue, event bus, and product choices are not selected.

## 12. Trusted read-only resolver boundary

Identity service may later receive only a minimized trusted read-only permission resolution. Permission resolution and current-request evaluation are separate. Resolver output is not a portable grant. Resolver output is not domain authorization, human RBAC, tenant/case membership, resource placement, ownership, review state, release approval, or external-use authorization.

## 13. Current-request evaluator boundary

Identity service performs the later current-request evaluation. A future allow, deny, or indeterminate outcome applies only to one current service call. Evaluator output is not reusable authority. The identity-service boundary returns no human roles, domain permissions, tenant or case membership, placement, ownership, qualification, review state, domain authorization, access grant, or output-release approval.

## 14. Process and request binding

Evaluation requires current process authentication, trust roots, process credentials, exact permission, recipient binding, purpose binding, operation binding, freshness, and replay posture. Process unauthenticated, trust root unavailable, process credential unavailable, recipient mismatch, purpose mismatch, operation mismatch, replay detected, stale request, and duplicate request all fail closed.

## 15. Authority survival and decay

A decision does not survive copying, serialization, caching, persistence, retry, process restart, host restart, operation completion, transfer, or permission change. Cached allow, serialized allow, replayed allow, and transferred allow are not authority. Restart without re-establishment fails closed.

## 16. Failure and availability posture

The fail-closed categories are:

- process unauthenticated
- service permission absent
- service permission inactive
- permission suspended
- permission revoked
- permission expired
- permission retired
- permission disputed
- permission currentness unknown
- permission repository unavailable
- resolver unavailable
- evaluator unavailable
- trust root unavailable
- process credential unavailable
- recipient mismatch
- purpose mismatch
- operation mismatch
- replay detected
- stale request
- duplicate request
- current/history mismatch
- duplicate active permission
- partial transition
- stale restore
- restart without re-establishment

Repository, resolver, or evaluator unavailability fails closed.

## 17. Privacy and minimization

Future resolver and evaluator results must be minimized, sanitized, current-call-bound, and non-portable. They must not expose raw/private/source material, secrets, credentials, provider payloads, human-role details, domain evidence, case truth, or sensitive output content.

## 18. Audit dependency

Audit evidence is not permission current state. Audit records may support future traceability only if separately implemented and reviewed. Audit implementation, audit emission, audit storage, access logging, and log viewing are not created by this document.

## 19. Threat and misuse boundaries

This boundary mitigates overclaim risks where conversation markers are treated as repository history, documentation is treated as runtime, schema-valid data is treated as authority, resolver results are treated as portable grants, current-call allow is treated as domain authorization, tests are treated as sign-off, CI is treated as certification, and merge provenance is treated as permission authority.

## 20. Future implementation prerequisites

Future implementation-readiness would require separate evidence for tracked and reviewed architecture specification, independently approved operation and permission definitions, authoritative writer implementation, versioned current-state repository, non-rewriting lifecycle history, trusted resolver implementation, current-request evaluator implementation, process authentication, service authorization, recipient binding, purpose binding, operation binding, freshness binding, replay binding, revocation propagation, restart and restore reconciliation, privacy/minimization review, synthetic positive and negative proof, exact-head CI, separate security review, and human/professional review.

None of these are closed by this DOCS_ONLY artifact.

## 21. Future proof obligations

Future synthetic proof categories only are listed here. No tests are created by the document. Listed obligations are not passed proof. Future proof does not create technical sign-off.

Positive future obligations include exact current permission, process authentication present, exact purpose/recipient/operation binding, one current-call evaluation, non-portable resolver result, non-portable evaluator result, permission narrowing, permission revocation, restart re-establishment, and sanitized result.

Negative future obligations include API self-grant, identity-service self-grant, caller-created permission result, wildcard permission, broad implicit permission, unknown operation, stale or revoked permission, cached allow, serialized allow, replayed allow, route-derived permission, capability-string permission, human-role-derived permission, audit-as-permission, and sensitive-output leakage.

## 22. Closure evidence model

Future closure cannot be satisfied by this document, by local tests, by CI, by schema validity, by merge provenance, by hashes, by manifests, by route/case/capability evidence, by audit records, or by conversation memory. Closure would require future tracked implementation evidence, future reviewed proof evidence, separate security review, and human/professional review.

## 23. Explicit non-authorizations

This document preserves:

- no runtime implementation
- no process authentication implementation
- no service authorization implementation
- no operation or permission creation
- no permission source
- no permission repository
- no writer
- no resolver
- no evaluator
- no lookup or registry
- no policy engine
- no wildcard
- no portable grant
- no API or endpoint
- no route or middleware change
- no `request.auth` migration
- no human RBAC implementation
- no domain authorization
- no tenant/case membership authority
- no audit implementation
- no provider routing
- no external use
- no product candidate
- no security finding
- no severity
- no remediation
- no technical sign-off
- no runtime certification
- no release approval
- no blocker closure
- no legal conclusion
- no clinical conclusion
- no evidentiary conclusion
- no case-truth conclusion

## 24. Human/professional review

Human/professional review remains required. This boundary is not approval, certification, release readiness, implementation readiness, external-use authorization, product-candidate selection, legal advice, clinical advice, evidentiary conclusion, or case-truth conclusion.

## 25. Final marker

LOCAL_SERVICE_AUTHORIZATION_ARCHITECTURE_BOUNDARY_V1_DOCS_ONLY_NO_IMPLEMENTATION
