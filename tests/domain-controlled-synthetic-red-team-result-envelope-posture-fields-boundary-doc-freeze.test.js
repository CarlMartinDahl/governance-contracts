import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const boundaryPath = path.join(
  repoRoot,
  'docs',
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_POSTURE_FIELDS_BOUNDARY_v1.md',
);
const corpusPath = path.join(
  repoRoot,
  'docs',
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md',
);
const precedentPath = path.join(
  repoRoot,
  'packages',
  'governance',
  'src',
  'api-contract-schema-validator.js',
);

function readRequiredFile(filePath, description) {
  assert.equal(existsSync(filePath), true, `expected ${description} to exist`);
  return readFileSync(filePath, 'utf8');
}

function assertIncludesAll(haystack, values) {
  for (const value of values) {
    assert.ok(haystack.includes(value), `expected doc to include ${value}`);
  }
}

function parsePostureRows(doc) {
  return doc
    .split('\n')
    .filter((line) => /^\| `(?:syntheticCorpusPosture|realEvidencePosture|humanProfessionalReviewRequired)` \|/.test(line))
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.replaceAll('`', '').trim()),
    );
}

function parseOpenPrerequisiteIds(doc) {
  return doc
    .split('\n')
    .filter((line) => /^\| `RTRE-P\d{2}` \|/.test(line))
    .map((line) => line.split('`')[1]);
}

test('RTRE-P05 freezes exact tracked posture values and precedent', () => {
  const boundary = readRequiredFile(boundaryPath, 'RTRE-P05 posture-field boundary');
  const corpus = readRequiredFile(corpusPath, 'controlled synthetic red-team corpus');
  const precedent = readRequiredFile(precedentPath, 'API contract schema validator precedent');

  assertIncludesAll(corpus, ['SYNTHETIC_CONTROL_CORPUS_ONLY', 'NO_REAL_EVIDENCE']);
  assertIncludesAll(boundary, [
    '`SYNTHETIC_CONTROL_CORPUS_ONLY`',
    '`NO_REAL_EVIDENCE`',
    '`packages/governance/src/api-contract-schema-validator.js`',
    '`tests/api-contract-schema-validator.test.js`',
  ]);
  assert.ok(precedent.includes('"humanProfessionalReviewRequired"'));
  assert.match(precedent, /descriptors\.humanProfessionalReviewRequired\.value !== true/);
});

test('RTRE-P05 freezes exactly three required ordered posture fields', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P05 posture-field boundary');

  assert.deepEqual(parsePostureRows(doc), [
    ['syntheticCorpusPosture', 'SYNTHETIC_CONTROL_CORPUS_ONLY', 'string'],
    ['realEvidencePosture', 'NO_REAL_EVIDENCE', 'string'],
    ['humanProfessionalReviewRequired', 'true', 'boolean'],
  ]);
  assertIncludesAll(doc, [
    'POSTURE_FIELD_COUNT:',
    '3',
    'REQUIRED_POSTURE_FIELDS:',
    'ALL_THREE',
    'OPTIONAL_POSTURE_FIELDS:',
    'NONE',
  ]);
});

test('RTRE-P05 exact values remain fail closed and non-authorizing', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P05 posture-field boundary');

  assertIncludesAll(doc, [
    'all three fields are required',
    'field names are exact and case-sensitive',
    'string posture values are exact and case-sensitive',
    '`humanProfessionalReviewRequired` must be the boolean `true`',
    'missing, unknown, duplicated, aliased, differently cased, coerced, or',
    'normalized fields or values must fail closed',
    'no fallback, default insertion, inference, migration, or compatibility alias',
    'does not mean that an executed synthetic run exists',
    'does not prove absence from any',
    'review remains required',
    'review was requested, started, completed, approved, certified, or',
  ]);
});

test('RTRE-P05 remains docs-only and leaves adjacent prerequisites open', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P05 posture-field boundary');

  assert.deepEqual(parseOpenPrerequisiteIds(doc), [
    'RTRE-P02',
    'RTRE-P06',
    'RTRE-P07',
    'RTRE-P08',
  ]);
  assertIncludesAll(doc, [
    'DOCS_ONLY',
    'APPEND_ONLY_PREREQUISITE_RESOLUTION',
    'RTRE_P05_RESOLVED_DOCS_ONLY',
    'RTRE_P01_P03_P04_PRESERVED_RESOLVED_DOCS_ONLY',
    'RESULT_ENVELOPE_CONTRACT_NOT_CREATED',
    'SCHEMA_NOT_CREATED',
    'VALIDATOR_NOT_CREATED',
    'MODEL_PROVIDER_EXECUTION_NOT_CREATED',
    'EXECUTED_MODEL_RUN_EVIDENCE_NOT_CREATED',
    'NO_RUNTIME_BEHAVIOR_CREATED',
    'NO_REAL_EVIDENCE_CREATED',
    'NO_REVIEW_COMPLETION_CREATED',
    'NO_APPROVAL_CREATED',
    'PRODUCT_CANDIDATE_NONE',
    'EXTERNAL_USE_NOT_AUTHORIZED',
    'RESOLVED_DOCS_ONLY_NOT_CONTRACT_READY',
    'BLOCKED_BY_RTRE_P02_AND_P06_TO_P08',
    'none without a separate Owner decision',
  ]);
  assert.match(doc, /does not prove contract readiness, schema readiness, validator readiness/i);
  assert.match(doc, /not actual human review, professional review,/i);
  assert.doesNotMatch(doc, /\/Users\//);
  assert.doesNotMatch(doc, /https?:\/\//);
  assert.doesNotMatch(doc, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
