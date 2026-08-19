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
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_SINGLE_CASE_TOP_LEVEL_SHAPE_BOUNDARY_v1.md',
);
const sourcePaths = [
  'docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_IDENTITY_VERSION_BOUNDARY_v1.md',
  'docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CORPUS_REFERENCE_REPRESENTATION_BOUNDARY_v1.md',
  'docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_COMPOSITE_OUTPUT_TYPE_REPRESENTATION_BOUNDARY_v1.md',
  'docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_POSTURE_FIELDS_BOUNDARY_v1.md',
  'docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md',
  'packages/governance/src/api-contract-schema-validator.js',
  'tests/api-contract-schema-validator.test.js',
];
const EXPECTED_FIELDS = [
  'contractVersion',
  'contractKind',
  'caseId',
  'outputType',
  'actionClass',
  'escalationTarget',
  'safeNextAction',
  'syntheticCorpusPosture',
  'realEvidencePosture',
  'humanProfessionalReviewRequired',
];

function readRequiredFile(filePath, description) {
  assert.equal(existsSync(filePath), true, `expected ${description} to exist`);
  return readFileSync(filePath, 'utf8');
}

function assertIncludesAll(haystack, values) {
  for (const value of values) {
    assert.ok(haystack.includes(value), `expected doc to include ${value}`);
  }
}

function parseFieldRows(doc) {
  return doc
    .split('\n')
    .filter((line) => /^\| \d+ \| `[a-z][A-Za-z]+` \|/.test(line))
    .map((line) => {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.replaceAll('`', '').trim());
      return { position: Number(cells[0]), field: cells[1], source: cells[2] };
    });
}

function parseOpenPrerequisiteIds(doc) {
  return doc
    .split('\n')
    .filter((line) => /^\| `RTRE-P\d{2}` \|/.test(line))
    .map((line) => line.split('`')[1]);
}

test('RTRE-P02 references every resolved source boundary and structural precedent', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P02 single-case shape boundary');

  for (const sourcePath of sourcePaths) {
    assert.equal(existsSync(path.join(repoRoot, sourcePath)), true, `expected ${sourcePath} to exist`);
    assert.ok(doc.includes(`\`${sourcePath}\``), `expected doc to reference ${sourcePath}`);
  }
});

test('RTRE-P02 freezes exact ten-field order with no optional fields', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P02 single-case shape boundary');
  const rows = parseFieldRows(doc);

  assert.deepEqual(
    rows.map(({ position }) => position),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  );
  assert.deepEqual(
    rows.map(({ field }) => field),
    EXPECTED_FIELDS,
  );
  assert.deepEqual(
    rows.map(({ source }) => source),
    [
      'RTRE-P01',
      'RTRE-P01',
      'RTRE-P03',
      'canonical four-field taxonomy / RTRE-P04',
      'canonical four-field taxonomy',
      'canonical four-field taxonomy',
      'canonical four-field taxonomy',
      'RTRE-P05',
      'RTRE-P05',
      'RTRE-P05',
    ],
  );
  assertIncludesAll(doc, [
    'TOP_LEVEL_FIELD_COUNT:',
    '10',
    'REQUIRED_TOP_LEVEL_FIELDS:',
    'ALL_TEN',
    'OPTIONAL_TOP_LEVEL_FIELDS:',
    'NONE',
    'ADDITIONAL_TOP_LEVEL_FIELDS:',
    'NONE',
  ]);
});

test('RTRE-P02 freezes single-case flat cardinality and fail-closed shape', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P02 single-case shape boundary');

  assertIncludesAll(doc, [
    'ENVELOPE_CARDINALITY:',
    'SINGLE_CASE_FLAT_OBJECT_ONLY',
    'TOP_LEVEL_OBJECT_COUNT:',
    'ONE',
    'CASE_REFERENCE_COUNT:',
    'ONE',
    'BATCH_ARRAY:',
    'PROHIBITED_BY_THIS_SHAPE',
    'NESTED_RESULT_WRAPPER:',
    'PROHIBITED_BY_THIS_SHAPE',
    'every one of the ten fields is required',
    'missing, inherited, duplicated, aliased, differently cased, or unknown fields',
    'must fail closed',
    'no unknown field may be retained, ignored, echoed, or passed through',
  ]);
});

test('RTRE-P02 remains docs-only and leaves RTRE-P06 through RTRE-P08 open', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P02 single-case shape boundary');

  assert.deepEqual(parseOpenPrerequisiteIds(doc), ['RTRE-P06', 'RTRE-P07', 'RTRE-P08']);
  assertIncludesAll(doc, [
    'DOCS_ONLY',
    'APPEND_ONLY_PREREQUISITE_RESOLUTION',
    'RTRE_P02_RESOLVED_DOCS_ONLY',
    'RTRE_P01_P03_P04_P05_PRESERVED_RESOLVED_DOCS_ONLY',
    'RESULT_ENVELOPE_CONTRACT_NOT_CREATED',
    'SCHEMA_NOT_CREATED',
    'VALIDATOR_NOT_CREATED',
    'MODEL_PROVIDER_EXECUTION_NOT_CREATED',
    'EXECUTED_MODEL_RUN_EVIDENCE_NOT_CREATED',
    'NO_RUNTIME_BEHAVIOR_CREATED',
    'NO_BATCH_CREATED',
    'NO_OPTIONAL_FIELDS_CREATED',
    'PRODUCT_CANDIDATE_NONE',
    'EXTERNAL_USE_NOT_AUTHORIZED',
    'RESOLVED_DOCS_ONLY_NOT_CONTRACT_READY',
    'BLOCKED_BY_RTRE_P06_TO_P08',
    'none without a separate Owner decision',
  ]);
  assert.match(doc, /does not prove contract readiness, schema readiness, validator readiness/i);
  assert.match(doc, /not actual human review, professional review,/i);
  assert.doesNotMatch(doc, /\/Users\//);
  assert.doesNotMatch(doc, /https?:\/\//);
  assert.doesNotMatch(doc, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
