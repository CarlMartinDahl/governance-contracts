import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const docPath = path.join(
  repoRoot,
  'docs',
  'DOMAIN_CONTRACTS_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_BOUNDARY_v1.md',
);

function readDoc() {
  assert.equal(existsSync(docPath), true, 'expected internal governance review protocol boundary doc to exist');
  return readFileSync(docPath, 'utf8');
}

function assertIncludesAll(haystack, values) {
  for (const value of values) {
    assert.ok(haystack.includes(value), `expected doc to include ${value}`);
  }
}

const currentStatuses = [
  'INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_BOUNDARY',
  'DOCS_ONLY',
  'INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_ONLY',
  'INTERNAL_REVIEW_PROTOCOL_NOT_APPROVAL',
  'PRODUCT_CANDIDATE_NONE',
  'EXTERNAL_USE_NOT_AUTHORIZED',
  'HUMAN_PROFESSIONAL_REVIEW_REQUIRED',
  'RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED',
  'VALIDATOR_DISPATCH_NOT_CREATED',
  'REGISTRY_LOOKUP_NOT_CREATED',
  'REAL_PRIVATE_RUN_NOT_STARTED',
  'RAW_PRIVATE_MATERIAL_NOT_INSPECTED',
  'SOURCE_PACKAGE_NOT_INSPECTED',
  'METADATA_NOT_ACQUIRED',
  'DELIVERY_NOT_PREPARED',
  'PACKET_COMPONENT_NOT_APPROVED',
  'RELEASE_APPROVAL_NOT_CREATED',
  'RUNTIME_CERTIFICATION_NOT_CREATED',
  'TECHNICAL_SIGN_OFF_NOT_CREATED',
  'EXTERNAL_REVIEWER_APPROVAL_NOT_CREATED',
  'NO_LEGAL_CONCLUSION_CREATED',
  'NO_CLINICAL_CONCLUSION_CREATED',
  'NO_EVIDENTIARY_PROOF_CREATED',
  'NO_CASE_TRUTH_CONCLUSION_CREATED',
  'NO_SECURITY_FINDING_CREATED',
  'NO_VULNERABILITY_FINDING_CREATED',
  'NO_SEVERITY_ASSIGNED',
  'NO_REMEDIATION_RECOMMENDED',
  'NO_REMEDIATION_IMPLEMENTED',
];

const protocolObjectives = [
  'classify model claims by enforcement level',
  'identify blockers and unresolved items',
  'distinguish runtime/schema/test evidence from DOCS_ONLY boundaries',
  'prevent overclaiming local logs, generated PDFs, green tests, manifests, hashes, or route evidence',
  'preserve no-raw / no-private / no-source-locator posture',
  'preserve no legal/clinical/evidentiary/case-truth conclusions',
  'preserve product candidate none and external-use unauthorized',
  'preserve human/professional review as release gate',
  'recommend smallest safe next slice without authorizing it',
];

const protocolSections = [
  'Purpose and scope',
  'Authorization boundary',
  'Allowed review materials',
  'Forbidden inspection/materials',
  'Evidence classification scheme',
  'Required gates',
  'Required blocker register',
  'Required review outputs',
  'Forbidden outputs',
  'No-overclaim rules',
  'No-reopening rules',
  'Stop conditions',
  'Next-slice posture',
  'Non-authorization summary',
];

const evidenceClassificationLabels = [
  'RUNTIME_ENFORCED_FOR_DOCUMENTED_AND_TESTED_SURFACES',
  'SCHEMA_VALIDATOR_ENFORCED_FOR_EXPORTED_TRACKED_SCHEMA_VALIDATORS',
  'PROMPT_WORKFLOW_ENFORCED',
  'HUMAN_PROFESSIONAL_REVIEW_REQUIRED',
  'DOCS_ONLY',
  'PARTIAL_DOCS_OR_TEST_EVIDENCE',
  'UNKNOWN_NOT_EVIDENCED',
  'EXPLICITLY_UNRESOLVED',
  'NOT_FOUND',
  'NOT_AUTHORIZED',
];

const requiredGates = [
  'scope / authorization gate',
  'source universe / provenance gate',
  'no-raw / no-private / no-source-locator gate',
  'no-conclusion gate',
  'evidence classification gate',
  'runtime/schema/API proof gate',
  'test evidence / local logs / CI evidence separation gate',
  'data-handling blocker gate',
  'access-control threat-model gate',
  'role-permission / RBAC gate',
  'export/artifact/download boundary gate',
  'delivery / packet-component approval gate',
  'product-candidate / external-use gate',
  'human/professional release gate',
  'no-overclaim / no-reopening gate',
];

const blockerRegisterItems = [
  'retention',
  'deletion',
  'encryption',
  'audit logs',
  'role permissions',
  'admin/support access paths',
  'raw-material routing',
  'third-party model/API status',
  'complete global access-control threat model',
  'complete export/artifact/download threat model',
  'runtime packet-component approval',
  'runtime delivery/final-decision gate',
  'runtime external-use/product-candidate enforcement',
  'CI/security evidence',
  'red-team prompt/output corpus',
  'exact blocker activation traces',
  'source/private-run authorization',
  'metadata acquisition authorization',
  'source package inspection authorization',
  'generated PDFs as repo evidence',
  'local logs as CI evidence',
];

const requiredReviewOutputs = [
  'evidence inventory',
  'claim classification table',
  'implemented-vs-DOCS_ONLY matrix',
  'blocker table',
  'no-overclaim checklist',
  'no-raw/no-private/no-source-locator check',
  'no-conclusion check',
  'runtime/schema/test/DOCS_ONLY split',
  'next safe slice recommendation',
  'stop-condition list',
];

const forbiddenOutputs = [
  'legal conclusion',
  'clinical conclusion',
  'evidentiary proof',
  'case-truth finding',
  'credibility finding',
  'offence finding',
  'ownership finding',
  'risk score',
  'sufficiency score',
  'police-report language',
  'pleading language',
  'security finding',
  'vulnerability finding',
  'severity assignment',
  'remediation recommendation',
  'runtime certification',
  'technical sign-off',
  'External Reviewer approval',
  'release approval',
  'product-candidate selection',
  'external-use authorization',
];

const noOverclaimRules = [
  'green tests are not release approval',
  'local logs are not CI evidence',
  'generated PDFs are not repo evidence unless separately reviewed and approved',
  'generated PDFs are not packet components unless separately approved',
  'route evidence is not delivery approval',
  'route evidence is not packet-component approval',
  'route evidence is not external-use readiness',
  'tenant/case/capability checks are not a full role-permission model',
  'capability gates are not RBAC unless separately evidenced',
  'schema validators are not complete access policy',
  'hashes/manifests/checksums prove integrity/reproducibility only, not truth/legal/clinical/evidentiary proof',
  'absence of found evidence is not proof of absence outside searched tracked repo scope',
  'DOCS_ONLY boundaries do not implement runtime behavior',
  'proof tests are tested-scenario evidence, not total non-bypassability',
  'excluded private review is not external-use approval',
  'human/professional review remains release gate',
];

const noReopeningRules = [
  'no manual External Reviewer delivery',
  'no PDF generation',
  'no PDF packet creation',
  'no archive/ZIP generation',
  'no packet component approval',
  'no excluded private-review packet markdown update',
  'no excluded private-review manifest update',
  'no excluded private-review TOC update',
  'no excluded private-review reference index update',
  'no generated PDF as repo evidence',
  'no generated PDF as packet component',
  'no committing local logs',
  'no local logs as CI evidence',
  'no runtime/API/schema/package behavior',
  'no validator dispatch',
  'no registry/lookup/generic dispatch',
  'no real private run',
  'no source inspection',
  'no metadata acquisition',
  'no source package inspection',
  'no actual matrix creation',
  'no manifest instance creation',
  'no test fixture instance creation',
  'no product-candidate selection',
  'no external-use readiness',
  'no release approval',
  'no runtime certification',
  'no technical sign-off',
  'no External Reviewer approval',
  'no legal/clinical/evidentiary/case-truth conclusions',
  'no security findings',
  'no vulnerability findings',
  'no severity',
  'no remediation',
  'no SWE bodelning',
  'no DK psykisk vold offence modelling',
  'no SWE psykiskt våld legal modelling',
  'no Nordic comparison',
];

const evidenceReferences = [
  'docs/TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE_v1.md',
  '[excluded private review artifact]',
  '[excluded private review artifact]',
  'docs/DOMAIN_CONTRACTS_DATA_HANDLING_BLOCKER_EVIDENCE_STATUS_BOUNDARY_v1.md',
  'docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md',
  'docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md',
  'docs/DOMAIN_CONTRACTS_EXPORT_ARTIFACT_ACCESS_BOUNDARY_INVENTORY_STATUS_BOUNDARY_v1.md',
];

const nextSlicePosture = [
  'REVIEW_ONLY_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_BOUNDARY',
  'PROVE_ONLY_DELIVERY_PACKET_COMPONENT_RUNTIME_BOUNDARY_INVENTORY',
  'PROVE_ONLY_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY',
  'DOCS_ONLY_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_STATUS_AND_GAP_SUMMARY',
  'continued pause',
  'None are authorized by this boundary.',
];

const negativeAuthorizationChecks = [
  'RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED',
  'VALIDATOR_DISPATCH_NOT_CREATED',
  'REGISTRY_LOOKUP_NOT_CREATED',
  'REAL_PRIVATE_RUN_NOT_STARTED',
  'no source inspection',
  'METADATA_NOT_ACQUIRED',
  'PRODUCT_CANDIDATE_NONE',
  'EXTERNAL_USE_NOT_AUTHORIZED',
  'RELEASE_APPROVAL_NOT_CREATED',
  'RUNTIME_CERTIFICATION_NOT_CREATED',
  'TECHNICAL_SIGN_OFF_NOT_CREATED',
  'EXTERNAL_REVIEWER_APPROVAL_NOT_CREATED',
  'NO_LEGAL_CONCLUSION_CREATED',
  'NO_CLINICAL_CONCLUSION_CREATED',
  'NO_EVIDENTIARY_PROOF_CREATED',
  'NO_CASE_TRUTH_CONCLUSION_CREATED',
  'NO_SECURITY_FINDING_CREATED',
  'NO_VULNERABILITY_FINDING_CREATED',
  'NO_SEVERITY_ASSIGNED',
  'NO_REMEDIATION_RECOMMENDED',
];

const trackedRepoRelativeMaterialLimits = [
  'tracked repo-relative markdown technical review materials',
  'tracked repo-relative markdown local-context posture summaries',
  'approved tracked repo-relative markdown local-context summaries for orientation only',
  'Live repo evidence controls over local handoff or orchestration material.',
];

test('internal governance review protocol doc exists and has boundary identity', () => {
  const doc = readDoc();
  assertIncludesAll(doc, [
    'INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_BOUNDARY',
    'DOCS_ONLY',
    'INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_ONLY',
  ]);
});

test('required current statuses and protocol objectives are frozen', () => {
  const doc = readDoc();
  assertIncludesAll(doc, currentStatuses);
  assertIncludesAll(doc, protocolObjectives);
});

test('required protocol sections, classification labels, gates, and blocker register are present', () => {
  const doc = readDoc();
  assertIncludesAll(doc, protocolSections);
  assertIncludesAll(doc, evidenceClassificationLabels);
  assertIncludesAll(doc, requiredGates);
  assertIncludesAll(doc, blockerRegisterItems);
});

test('review outputs and forbidden outputs are explicitly bounded', () => {
  const doc = readDoc();
  assertIncludesAll(doc, requiredReviewOutputs);
  assertIncludesAll(doc, forbiddenOutputs);
});

test('no-overclaim and no-reopening rules are frozen', () => {
  const doc = readDoc();
  assertIncludesAll(doc, noOverclaimRules);
  assertIncludesAll(doc, noReopeningRules);
});

test('evidence references and next-slice posture are present without authorization', () => {
  const doc = readDoc();
  assertIncludesAll(doc, evidenceReferences);
  assertIncludesAll(doc, nextSlicePosture);
});

test('negative authorization checks remain explicit', () => {
  const doc = readDoc();
  assertIncludesAll(doc, negativeAuthorizationChecks);
  assertIncludesAll(doc, trackedRepoRelativeMaterialLimits);
  assertIncludesAll(doc, [
    'This boundary is an internal governance review protocol only.',
    'does not create protocol approval',
    'No raw/private/conclusion material is present except blocked/forbidden-category wording.',
  ]);
});
