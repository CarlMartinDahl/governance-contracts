# Repo-Wide Governance Axioms Boundary v1

Boundary name: `REPO_WIDE_GOVERNANCE_AXIOMS_BOUNDARY`

Mode: `DOCS_ONLY`

Status: `GOVERNANCE_AXIOMS_ONLY`

This boundary is `DOCS_ONLY`.

This boundary is `REPO_WIDE_GOVERNANCE_AXIOMS_BOUNDARY`.

This boundary is `GOVERNANCE_AXIOMS_ONLY`.

This boundary is `REPO_WIDE_GOVERNANCE_AXIOMS_NOT_RUNTIME_ENFORCEMENT`.

This boundary freezes repo-wide governance axioms only. It hardens general operating posture and does not create implementation, runtime behavior, runtime/API/schema/package behavior change, product candidate, external-use authorization, approval, sign-off, finding, severity, remediation, blocker resolution, release readiness, or runtime enforcement.

Human/professional review remains release gate. `DOCS_ONLY` boundaries are not runtime enforcement.

## Status Tokens

- `REPO_WIDE_GOVERNANCE_AXIOMS_BOUNDARY`
- `DOCS_ONLY`
- `GOVERNANCE_AXIOMS_ONLY`
- `REPO_WIDE_GOVERNANCE_AXIOMS_NOT_RUNTIME_ENFORCEMENT`
- `LIVE_REPO_EVIDENCE_WINS`
- `SECURITY_AGENT_IS_ADVISORY_NOT_DECISIONAL`
- `EVERY_SLICE_MUST_DECLARE_NEGATIVE_BOUNDARY`
- `GIT_GUARD_FIRST`
- `LIVE_REPO_EVIDENCE_CONTROLS`
- `SMALLEST_SAFE_NEXT_SLICE`
- `FAIL_CLOSED_ON_AMBIGUITY`
- `DOCS_CONTRACTS_BEFORE_RUNTIME`
- `TESTS_PROVE_ONLY_WHAT_THEY_EXPLICITLY_PROVE`
- `PAUSE_IS_VALID_OUTCOME`
- `HUMAN_PROFESSIONAL_REVIEW_REMAINS_RELEASE_GATE`
- `NO_PRODUCT_CANDIDATE_WITHOUT_SEPARATE_EXPLICIT_AUTHORIZATION`
- `NO_EXTERNAL_USE_WITHOUT_SEPARATE_EXPLICIT_AUTHORIZATION`
- `EXTERNAL_REVIEW_REQUIREMENTS_ADVISORY_CONTEXT_ONLY`
- `HANDOFF_CONTEXT_MAY_BE_STALE`
- `STALE_HANDOFF_TEXT_DOES_NOT_CONTROL_LIVE_REPO_EVIDENCE`
- `SECURITY_AGENT_GOVERNANCE_NAVIGATOR_ADVISORY_ONLY`
- `THIRD_PARTY_ROUTING_REMAINS_REVIEWED_PAUSED_NON_RUNTIME_READY_BLOCKED`
- `NO_IMPLEMENTATION_CREATED`
- `NO_RUNTIME_BEHAVIOR_CREATED`
- `RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED`
- `NO_APPROVAL`
- `NO_SIGN_OFF`
- `NO_SECURITY_FINDING`
- `NO_VULNERABILITY_FINDING`
- `NO_SEVERITY`
- `NO_REMEDIATION`
- `NO_BLOCKER_RESOLUTION`
- `PRODUCT_CANDIDATE_NONE`
- `EXTERNAL_USE_NOT_AUTHORIZED`
- `RAW_PRIVATE_MATERIAL_NOT_INSPECTED`
- `SOURCE_PACKAGE_NOT_INSPECTED`
- `PDF_IMAGE_SCREENSHOT_METADATA_NOT_INSPECTED`
- `METADATA_NOT_ACQUIRED`
- `REAL_PRIVATE_RUN_NOT_STARTED`
- `DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT`
- `PROVE_ONLY_IS_NOT_AUTHORIZATION`
- `REVIEW_ONLY_IS_NOT_APPROVAL`

## Axiom A: Live Repo Evidence Wins

`LIVE_REPO_EVIDENCE_WINS`

Git guard first.

Live repo root, branch, HEAD, git status, tracked docs, and tracked tests control.

Handoff files, old startprompts, chat summaries, local memory, and advisory background are orientation only if they conflict with live repo evidence.

If conflict cannot be resolved safely, stop and report.

Do not select, reopen, or close a slice from stale handoff text.

## Axiom B: Security Agent Is Advisory Not Decisional

`SECURITY_AGENT_IS_ADVISORY_NOT_DECISIONAL`

The security agent / governance navigator helps identify the smallest safe next step.

It may identify blockers, stale context, overclaim risk, missing authorization, fail-closed posture, and questions for External Reviewer.

It must not create approval, sign-off, security/vulnerability findings, severity, remediation, blocker resolution, product candidate, external-use authorization, implementation authorization, runtime authority, release certification, or product readiness.

## Axiom C: Every Slice Must Declare Negative Boundary

`EVERY_SLICE_MUST_DECLARE_NEGATIVE_BOUNDARY`

Every slice must state both:

- what it does
- what it does not create

A slice must explicitly preserve negative boundaries for:

- implementation
- runtime behavior
- runtime/API/schema/package behavior change
- approval
- sign-off
- legal/clinical/evidentiary/case-truth conclusions
- security/vulnerability findings
- severity
- remediation
- blocker resolution
- product candidate
- external-use authorization
- raw/private/source inspection
- source package inspection
- PDF/image/screenshot/metadata inspection
- metadata acquisition
- real private run
- any domain-specific reopening risks

## Default Posture

The default posture is:

- `GIT_GUARD_FIRST`
- `LIVE_REPO_EVIDENCE_CONTROLS`
- `SMALLEST_SAFE_NEXT_SLICE`
- `FAIL_CLOSED_ON_AMBIGUITY`
- `DOCS_CONTRACTS_BEFORE_RUNTIME`
- `TESTS_PROVE_ONLY_WHAT_THEY_EXPLICITLY_PROVE`
- `PAUSE_IS_VALID_OUTCOME`
- `HUMAN_PROFESSIONAL_REVIEW_REMAINS_RELEASE_GATE`
- `NO_PRODUCT_CANDIDATE_WITHOUT_SEPARATE_EXPLICIT_AUTHORIZATION`
- `NO_EXTERNAL_USE_WITHOUT_SEPARATE_EXPLICIT_AUTHORIZATION`

## Proof And Validation Meaning

DOCS_ONLY is not runtime enforcement.

PROVE_ONLY is not authorization.

REVIEW_ONLY is not approval.

Focused proof tests prove only the frozen text/guards they assert.

`npm test`, `npm run lint`, and `npm run build` passing is not release approval.

Green tests are not product readiness.

Validation is evidence of the tested claim only, not broader certification.

## Pause And Fail-Closed Rule

Continued pause is a valid result.

Stop/fail-closed is correct when ambiguity, missing authorization, stale evidence, dirty tree, or boundary conflict exists.

Not proceeding is not a failure when the safe boundary is unclear.

## External Review Requirements Rule

external-review requirements remains advisory context unless separately frozen into repo evidence by an explicit `DOCS_ONLY` boundary/proof-test pattern.

Asking External Reviewer a question is not External Reviewer approval.

Comparing external-review requirements to repo evidence is not technical sign-off.

external-review requirements does not authorize implementation, runtime, product candidate, external-use, approval, sign-off, blocker resolution, findings, severity, or remediation.

## Handoff And Stale-Context Rule

Untracked advisory material may be stale.

If they conflict with live repo evidence, live repo evidence wins.

If conflict cannot be resolved safely, stop and report.

Do not select, reopen, or close a slice from stale handoff text.

## Security-Agent Rule

The security agent / governance navigator remains advisory only.

It helps identify smallest safe next posture.

It does not decide, approve, certify, resolve blockers, create findings, assign severity, recommend remediation, select product candidate, authorize external-use, or authorize implementation.

## Relationship To Existing Posture

This boundary must not reopen third-party routing.

Third-party routing remains `DOCS_ONLY`, reviewed, paused, non-runtime-ready, and blocked after blocker analysis.

`9e2ab6a` is historical third-party routing blocker-analysis context only.

`0d37892` is previous third-party routing status/gap-summary context.

`26a31ca` is security-agent governance navigator advisory context when live git evidence confirms it.

This boundary creates no third-party routing implementation, no route authorization, no provider integration, no provider registry/status implementation, no data-routing map, no token/URL/secret handling, no provider auditability implementation, no audit/access-log implementation, no runtime gate implementation, no product candidate, and no external-use authorization.

This boundary must not create any runtime/API/schema/package behavior change.

This boundary must not alter security-agent advisory-only posture.

## Negative Authorization Checks

This boundary creates no implementation.

This boundary creates no runtime behavior.

This boundary creates no runtime/API/schema/package behavior change.

This boundary creates no approval.

This boundary creates no sign-off.

This boundary creates no release approval.

This boundary creates no runtime certification.

This boundary creates no technical sign-off.

This boundary creates no External Reviewer approval.

This boundary creates no legal/clinical/evidentiary/case-truth conclusion.

This boundary creates no security finding.

This boundary creates no vulnerability finding.

This boundary assigns no severity.

This boundary recommends no remediation.

This boundary resolves no blocker.

This boundary selects no product candidate.

This boundary authorizes no external-use.

This boundary authorizes no raw/private/source inspection.

This boundary authorizes no source package inspection.

This boundary authorizes no PDF/image/screenshot/metadata inspection.

This boundary authorizes no metadata acquisition.

This boundary authorizes no real private run.

This boundary creates no third-party routing reopening.

This boundary creates no RBAC implementation.

This boundary creates no audit/access-log implementation.

This boundary creates no retention/deletion implementation.

This boundary creates no raw-material routing implementation.

This boundary creates no runtime gate implementation.

This boundary creates no validator dispatch.

This boundary creates no registry/lookup.

## Evidence References

- `AGENTS.md`
- `docs/DOMAIN_CONTRACTS_SECURITY_AGENT_GOVERNANCE_NAVIGATOR_ADVISORY_BOUNDARY_v1.md`
- `tests/domain-security-agent-governance-navigator-advisory-boundary-doc-freeze.test.js`
- `docs/DOMAIN_CONTRACTS_THIRD_PARTY_ROUTING_RUNTIME_READINESS_STATUS_GAP_SUMMARY_AFTER_BLOCKER_ANALYSIS_BOUNDARY_v1.md`

## Recommended Smallest Safe Next Posture

Next possible safe posture may be:

- `REVIEW_ONLY_REPO_WIDE_GOVERNANCE_AXIOMS_BOUNDARY`
- continued pause

None are authorized by this boundary.
