import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const DOC_PATH =
  'docs/DOMAIN_CONTRACTS_P1_MATERIAL_CLASS_REGISTRY_AND_SCOPE_MODEL_BOUNDARY_v1.md';

const doc = readFileSync(DOC_PATH, 'utf8');

function assertIncludesAll(values) {
  for (const value of values) {
    assert.ok(doc.includes(value), `missing ${value}`);
  }
}

test('freezes P1 boundary name, mode, and private-only status', () => {
  assertIncludesAll([
    'P1_MATERIAL_CLASS_REGISTRY_AND_SCOPE_MODEL_BOUNDARY',
    'DOCS_ONLY',
    'P1_MATERIAL_CLASS_REGISTRY_AND_SCOPE_MODEL_ONLY',
    'P1_MATERIAL_CLASS_REGISTRY_AND_SCOPE_MODEL_SPEC_v0',
    'P1_SCOPE_TEST_MATRIX_v0',
    'PRIVATE_CONTROL_PLANE_SPECIFICATION_ONLY',
    'PRIVATE_TEST_DESIGN_ONLY',
    'FUTURE_TEST_MATRIX_ONLY',
    'CONTROL_PLANE_IMPLEMENTATION_GAP_PRIORITY_QUEUE_v0',
  ]);
});

test('records no test execution or evidence from the P1 matrix', () => {
  assertIncludesAll([
    'NO_TESTS_RUN_FROM_P1_MATRIX',
    'NO_TEST_EVIDENCE_CREATED',
    'NOT_REPO_EVIDENCE',
    'NOT_CI_EVIDENCE',
    'NOT_TECHNICAL_EVIDENCE',
    'NOT_RUNTIME_CERTIFICATION',
    'NOT_TECHNICAL_SIGN_OFF',
    'NOT_RELEASE_APPROVAL',
    'Expected status is not actual status',
    'Future test case is not passed test',
    'Matrix is not implementation evidence',
    'Matrix is not CI evidence',
    'Matrix is not blocker closure',
    'Local focused proof test output is doc-freeze validation only',
  ]);
});

test('records no implementation, runtime, schema, API, or package change', () => {
  assertIncludesAll([
    'NO_IMPLEMENTATION_CREATED',
    'NO_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE',
    'NO_MATERIAL_CLASS_REGISTRY_CREATED',
    'NO_MATERIAL_CLASS_REGISTRY_SCHEMA_CREATED',
    'NO_MATERIAL_CLASS_REGISTRY_LOOKUP_CREATED',
    'NO_SCOPE_MODEL_IMPLEMENTED',
    'NO_TENANT_SCOPE_MODEL_IMPLEMENTED',
    'NO_CASE_SCOPE_MODEL_IMPLEMENTED',
    'NO_OBJECT_SCOPE_MODEL_IMPLEMENTED',
    'NO_FUNCTION_SCOPE_MODEL_IMPLEMENTED',
    'NO_PROPERTY_SCOPE_MODEL_IMPLEMENTED',
    'NO_VALIDATOR_DISPATCH_CREATED',
    'NO_REGISTRY_LOOKUP_CREATED',
    'RBAC_MODEL_NOT_IMPLEMENTED',
    'ACCESS_CONTROL_NOT_IMPLEMENTED',
    'ROLE_PERMISSION_MODEL_NOT_CREATED',
    'ADMIN_SUPPORT_MODEL_NOT_CREATED',
    'ADMIN_SUPPORT_ACCESS_UNRESOLVED',
    'AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED',
    'EVENT_TAXONOMY_RUNTIME_CODE_NOT_CREATED',
    'LOG_SCHEMA_NOT_CREATED',
    'LOG_STORAGE_NOT_CREATED',
    'RETENTION_DELETION_NOT_IMPLEMENTED',
    'RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED',
    'THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED',
    'PROVIDER_REGISTRY_NOT_CREATED',
    'PROVIDER_STATUS_IMPLEMENTATION_NOT_CREATED',
    'DATA_ROUTING_MAP_NOT_CREATED',
    'GLOBAL_ACCESS_CONTROL_MODEL_NOT_CREATED',
    'GLOBAL_ACCESS_CONTROL_THREAT_MODEL_REMAINS_UNRESOLVED',
  ]);
});

test('lists all material classes and scope dimensions', () => {
  assertIncludesAll([
    'SANITIZED_TEXT_PRIMARY_MATERIAL',
    'REDACTED_REVIEW_SIGNAL_MATERIAL',
    'NO_RAW_METADATA_MANIFEST_MATERIAL',
    'GENERATED_ARTIFACT_OR_EXPORT_MATERIAL',
    'LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL',
    'RAW_PRIVATE_SOURCE_MATERIAL',
    'SOURCE_PACKAGE_MATERIAL',
    'PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL',
    'THIRD_PARTY_MODEL_API_ROUTED_MATERIAL',
    'HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL',
    'TENANT_SCOPE',
    'CASE_SCOPE',
    'OBJECT_SCOPE',
    'FUNCTION_SCOPE',
    'PROPERTY_SCOPE',
    'MATERIAL_CLASS_SCOPE',
    'ROUTE_SURFACE_SCOPE',
    'REVIEW_SCOPE',
    'LIFECYCLE_SCOPE',
    'AUDIT_SCOPE',
  ]);
});

test('freezes fail-closed defaults without runtime enforcement', () => {
  assertIncludesAll([
    'unknown material class must block',
    'unknown tenant must block',
    'unknown case must block',
    'unknown object must block',
    'unknown function must block',
    'unknown property must block',
    'unknown route surface must block',
    'unknown lifecycle must block',
    'unavailable audit scope must block',
    'missing scope must block',
    'mismatched scope must block',
    'raw/private/source material must block',
    'source package material must block',
    'PDF, image, screenshot, and metadata material must block',
    'third-party or provider route must block',
    'source locator, URL, token, or secret must block',
    'product, external-use, or External Reviewer request must block',
    'scope declaration is not source completeness',
    'material classification is not content approval',
    'test matrix is not test evidence',
    'DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT',
    'UNKNOWN_MATERIAL_CLASS_BLOCK_RULE_NOT_IMPLEMENTED',
    'MISSING_SCOPE_BLOCK_RULE_NOT_IMPLEMENTED',
    'SCOPE_MISMATCH_BLOCK_RULE_NOT_IMPLEMENTED',
    'SOURCE_LOCATOR_BLOCK_RULE_NOT_IMPLEMENTED',
    'URL_TOKEN_SECRET_BLOCK_RULE_NOT_IMPLEMENTED',
    'QUARANTINE_BLOCK_PATH_NOT_IMPLEMENTED',
  ]);
});

test('lists future P1 groups and P1 scope IDs only', () => {
  assertIncludesAll([
    'P1-GROUP-A MATERIAL_CLASS_ALLOW_TESTS',
    'P1-GROUP-B MATERIAL_CLASS_DENY_TESTS',
    'P1-GROUP-C TENANT_CASE_OBJECT_FUNCTION_PROPERTY_SCOPE_TESTS',
    'P1-GROUP-D ROUTE_SURFACE_SCOPE_TESTS',
    'P1-GROUP-E LIFECYCLE_SCOPE_TESTS',
    'P1-GROUP-F AUDIT_SCOPE_NO_CONTENT_TESTS',
    'P1-GROUP-G RBAC_AND_ADMIN_SUPPORT_DEPENDENCY_TESTS',
    'P1-GROUP-H RAW_ROUTING_AND_THIRD_PARTY_DEPENDENCY_TESTS',
    'P1-GROUP-I OVERCLAIM_AND_NON_AUTHORIZATION_TESTS',
  ]);

  for (let id = 1; id <= 44; id += 1) {
    assert.ok(doc.includes(`P1-SCOPE-${String(id).padStart(3, '0')}`));
  }
});

test('lists expected reason-code vocabulary', () => {
  assertIncludesAll([
    'UNKNOWN_MATERIAL_CLASS_BLOCKED',
    'RAW_PRIVATE_SOURCE_MATERIAL_BLOCKED',
    'SOURCE_PACKAGE_MATERIAL_BLOCKED',
    'PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL_BLOCKED',
    'THIRD_PARTY_ROUTED_MATERIAL_BLOCKED',
    'SOURCE_LOCATOR_BLOCKED',
    'URL_SOCIAL_URL_BLOCKED',
    'TOKEN_SECRET_BLOCKED',
    'TENANT_SCOPE_UNKNOWN',
    'WRONG_TENANT_DENIED',
    'CASE_SCOPE_UNKNOWN',
    'WRONG_CASE_DENIED',
    'WRONG_OBJECT_DENIED',
    'WRONG_FUNCTION_DENIED',
    'WRONG_PROPERTY_DENIED',
    'ROUTE_SURFACE_UNKNOWN',
    'PROVIDER_ROUTE_DENIED',
    'EXPORT_ROUTE_NOT_AUTHORIZED',
    'DELIVERY_ROUTE_NOT_AUTHORIZED',
    'RETENTION_POLICY_REQUIRED',
    'DELETION_POLICY_REQUIRED',
    'PURGE_POLICY_REQUIRED',
    'AUDIT_EVENT_RAW_CONTENT_REJECTED',
    'AUDIT_EVENT_SOURCE_LOCATOR_REJECTED',
    'LOCAL_LOG_NOT_CI_EVIDENCE',
    'RBAC_REQUIRES_MATERIAL_CLASS',
    'RBAC_REQUIRES_TENANT_CASE_SCOPE',
    'ADMIN_SUPPORT_BYPASS_DENIED',
    'PROVIDER_STATUS_UNKNOWN_BLOCKED',
    'DOCS_ONLY_NOT_RUNTIME_ENFORCEMENT',
    'TEST_MATRIX_NOT_TEST_EVIDENCE',
    'NO_BLOCKER_CLOSURE',
  ]);
});

test('records relationships as context only and blockers remain active', () => {
  assertIncludesAll([
    'This boundary relates to retention and deletion lifecycle control as context',
    'This boundary relates to RBAC role and permission lifecycle authorization',
    'This boundary relates to admin and support bypass prevention as context',
    'This boundary relates to audit and access-log event taxonomy as context',
    'This boundary relates to raw-material routing deny-by-default as context',
    'This boundary relates to third-party provider routing status as context',
    'This boundary relates to the global access-control threat model as context',
    'No relationship above is implemented, closed, approved, or certified',
    'MATERIAL_CLASS_REGISTRY_NOT_CREATED',
    'MATERIAL_CLASS_REGISTRY_SCHEMA_NOT_CREATED',
    'MATERIAL_CLASS_REGISTRY_LOOKUP_NOT_CREATED',
    'SCOPE_MODEL_NOT_IMPLEMENTED',
    'TENANT_SCOPE_MODEL_NOT_IMPLEMENTED',
    'CASE_SCOPE_MODEL_NOT_IMPLEMENTED',
    'OBJECT_SCOPE_MODEL_NOT_IMPLEMENTED',
    'FUNCTION_SCOPE_MODEL_NOT_IMPLEMENTED',
    'PROPERTY_SCOPE_MODEL_NOT_IMPLEMENTED',
    'MATERIAL_CLASS_ROUTE_POLICY_NOT_CREATED',
    'MATERIAL_CLASS_LIFECYCLE_POLICY_NOT_CREATED',
    'MATERIAL_CLASS_RBAC_DEPENDENCY_NOT_CREATED',
    'NO_BLOCKER_RESOLVED',
    'NO_BLOCKER_CLOSURE',
    'NO_DEPENDENCY_CLOSURE',
  ]);
});

test('records what this boundary does not prove and non-authorization', () => {
  assertIncludesAll([
    'WHAT_THIS_DOES_NOT_PROVE',
    'not implementation',
    'not a material-class registry',
    'not a scope model',
    'not validator dispatch',
    'not runtime enforcement',
    'not CI evidence',
    'not technical sign-off',
    'not blocker closure',
    'not product proof',
    'not external-use proof',
    'not External Reviewer-ready proof',
    'not legal proof',
    'not clinical proof',
    'not evidentiary proof',
    'not case-truth proof',
    'not security finding',
    'not vulnerability finding',
    'not severity assignment',
    'not remediation recommendation',
    'PRODUCT_CANDIDATE_NONE',
    'EXTERNAL_USE_NOT_AUTHORIZED',
    'NO_DELIVERY_TO_EXTERNAL_REVIEWER',
    'HUMAN_PROFESSIONAL_REVIEW_REQUIRED',
    'NO_SECURITY_FINDING_CREATED',
    'NO_VULNERABILITY_FINDING_CREATED',
    'NO_SEVERITY_ASSIGNED',
    'NO_REMEDIATION_RECOMMENDED',
  ]);
});

test('keeps raw, source, private, provider, and external use unauthorized', () => {
  assertIncludesAll([
    'no source package inspection',
    'no raw source inspection',
    'no PDF, image, screenshot, or metadata acquisition',
    'no third-party model or API routing',
    'no provider registry',
    'no provider status',
    'no provider route',
    'no real private run',
    'no product candidate',
    'no external-use',
    'no External Reviewer delivery',
    'no release approval',
    'no runtime certification',
    'no technical',
  ]);
});

test('does not include raw source locator patterns or raw private identifiers', () => {
  const forbiddenPatterns = [
    /\+46\d+/,
    /file:\/\/\/Users/i,
    /https?:\/\/\S+/i,
    /instagram\.com/i,
    /Sidan\s+\d+\s+av\s+\d+/i,
    /\b(?:Jan|Feb)\s+\d{1,2},\s+2021\b/i,
    /\b2021-(?:01|02)-\d{2}[ T]\d{2}:\d{2}/,
    /\b[a-z]{5,}-[a-z0-9]{5,}-[A-Za-z0-9]{5,}\b/,
  ];

  for (const pattern of forbiddenPatterns) {
    assert.equal(pattern.test(doc), false, `matched forbidden pattern ${pattern}`);
  }
});

test('records final marker', () => {
  assert.ok(
    doc.includes('P1_MATERIAL_CLASS_REGISTRY_AND_SCOPE_MODEL_BOUNDARY_DOCS_ONLY_FROZEN'),
  );
});
