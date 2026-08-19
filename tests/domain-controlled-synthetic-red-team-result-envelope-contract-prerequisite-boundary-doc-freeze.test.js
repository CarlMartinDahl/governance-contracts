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
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_PREREQUISITE_BOUNDARY_v1.md',
);
const canonicalSourcePaths = [
  'docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md',
  'docs/DOMAIN_CONTRACTS_RED_TEAM_CORPUS_TRACKED_STATUS_CURRENTNESS_BOUNDARY_v1.md',
  'docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md',
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

function parsePrerequisiteRows(doc) {
  return doc
    .split('\n')
    .filter((line) => /^\| `RTRE-P\d{2}` \|/.test(line))
    .map((line) => {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.replaceAll('`', '').trim());

      assert.equal(cells.length, 4, `expected four cells in prerequisite row: ${line}`);
      return {
        id: cells[0],
        decisionSurface: cells[1],
        status: cells[2],
        requiredFutureProof: cells[3],
      };
    });
}

test('result-envelope prerequisite boundary freezes canonical sources and concrete fields', () => {
  const doc = readRequiredFile(docPath, 'result-envelope prerequisite boundary');

  for (const sourcePath of canonicalSourcePaths) {
    assert.equal(existsSync(path.join(repoRoot, sourcePath)), true, `expected ${sourcePath} to exist`);
    assert.ok(doc.includes(`\`${sourcePath}\``), `expected doc to reference ${sourcePath}`);
  }

  assertIncludesAll(doc, [
    '`CASE_ID`',
    '`OUTPUT_TYPE`',
    '`ACTION_CLASS`',
    '`ESCALATION_TARGET`',
    '`SAFE_NEXT_ACTION`',
    '26 canonical synthetic case identifiers',
  ]);
});

test('result-envelope prerequisite register keeps all eight decisions open and ordered', () => {
  const doc = readRequiredFile(docPath, 'result-envelope prerequisite boundary');
  const rows = parsePrerequisiteRows(doc);

  assert.deepEqual(
    rows.map(({ id }) => id),
    ['RTRE-P01', 'RTRE-P02', 'RTRE-P03', 'RTRE-P04', 'RTRE-P05', 'RTRE-P06', 'RTRE-P07', 'RTRE-P08'],
  );
  assert.equal(rows.length, 8);
  assert.equal(rows.every(({ status }) => status === 'OPEN_NOT_SPECIFIED'), true);
  assert.equal(rows.every(({ decisionSurface }) => decisionSurface.length > 0), true);
  assert.equal(rows.every(({ requiredFutureProof }) => requiredFutureProof.length > 0), true);
});

test('result-envelope prerequisite boundary remains docs-only and non-authorizing', () => {
  const doc = readRequiredFile(docPath, 'result-envelope prerequisite boundary');

  assertIncludesAll(doc, [
    'DOCS_ONLY',
    'PREREQUISITE_GAP_FREEZE_ONLY',
    'RESULT_ENVELOPE_CONTRACT_NOT_CREATED',
    'SCHEMA_NOT_CREATED',
    'VALIDATOR_NOT_CREATED',
    'MODEL_PROVIDER_EXECUTION_NOT_CREATED',
    'EXECUTED_MODEL_RUN_EVIDENCE_NOT_CREATED',
    'NO_RUNTIME_BEHAVIOR_CREATED',
    'NO_BLOCKER_CLOSURE_CREATED',
    'NO_DEPENDENCY_CLOSURE_CREATED',
    'PRODUCT_CANDIDATE_NONE',
    'EXTERNAL_USE_NOT_AUTHORIZED',
    'BLOCKED_BY_OPEN_PREREQUISITES',
    'TRACKED_DOCS_ONLY_OPEN_PREREQUISITE_REGISTER',
    'none without a separate Owner decision',
  ]);

  assert.match(doc, /does not prove contract readiness, schema readiness, validator readiness/i);
  assert.match(doc, /not actual human review, professional review,/i);
  assert.doesNotMatch(doc, /\/Users\//);
  assert.doesNotMatch(doc, /https?:\/\//);
  assert.doesNotMatch(doc, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
