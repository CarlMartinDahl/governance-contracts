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
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_IDENTITY_VERSION_BOUNDARY_v1.md',
);
const trackedSourcePaths = [
  'docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_PREREQUISITE_BOUNDARY_v1.md',
  'docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md',
  'packages/governance/src/api-contract-schema-validator.js',
  'tests/api-contract-schema-validator.test.js',
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

function parseIdentityRows(doc) {
  return doc
    .split('\n')
    .filter((line) => /^\| `contract(?:Version|Kind)` \|/.test(line))
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.replaceAll('`', '').trim()),
    );
}

function parseOpenPrerequisiteRows(doc) {
  return doc
    .split('\n')
    .filter((line) => /^\| `RTRE-P\d{2}` \|/.test(line))
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.replaceAll('`', '').trim()),
    );
}

test('RTRE-P01 freezes exact contract identity and version from tracked precedent', () => {
  const doc = readRequiredFile(docPath, 'RTRE-P01 identity/version boundary');

  for (const sourcePath of trackedSourcePaths) {
    assert.equal(existsSync(path.join(repoRoot, sourcePath)), true, `expected ${sourcePath} to exist`);
    assert.ok(doc.includes(`\`${sourcePath}\``), `expected doc to reference ${sourcePath}`);
  }

  assert.deepEqual(parseIdentityRows(doc), [
    ['contractVersion', 'v1', 'required exact string literal'],
    [
      'contractKind',
      'CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE',
      'required exact string literal',
    ],
  ]);
});

test('RTRE-P01 compatibility posture remains exact and fail closed', () => {
  const doc = readRequiredFile(docPath, 'RTRE-P01 identity/version boundary');

  assertIncludesAll(doc, [
    'only `contractVersion: "v1"` is within this boundary',
    'only `contractKind: "CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE"` is within this boundary',
    'an unknown version must fail closed',
    'an unknown kind must fail closed',
    'no fallback, coercion, alias, migration, or version inference is authorized',
    'no backward-compatibility or forward-compatibility claim is created',
    'do not replace `contractKind` with `evidenceKind`',
  ]);
});

test('RTRE-P02 through RTRE-P08 remain open and ordered', () => {
  const doc = readRequiredFile(docPath, 'RTRE-P01 identity/version boundary');
  const rows = parseOpenPrerequisiteRows(doc);

  assert.deepEqual(
    rows.map(([id]) => id),
    ['RTRE-P02', 'RTRE-P03', 'RTRE-P04', 'RTRE-P05', 'RTRE-P06', 'RTRE-P07', 'RTRE-P08'],
  );
  assert.equal(rows.length, 7);
  assert.equal(rows.every((row) => row.length === 3), true);
  assert.equal(rows.every(([, , status]) => status === 'OPEN_NOT_SPECIFIED'), true);
  assert.doesNotMatch(doc, /^\| `RTRE-P01` \|/m);
  assertIncludesAll(doc, [
    'RTRE_P01_STATUS:',
    'RESOLVED_DOCS_ONLY_NOT_CONTRACT_READY',
    'RESULT_ENVELOPE_CONTRACT_READINESS:',
    'BLOCKED_BY_RTRE_P02_TO_P08',
  ]);
});

test('RTRE-P01 remains docs-only and non-authorizing', () => {
  const doc = readRequiredFile(docPath, 'RTRE-P01 identity/version boundary');

  assertIncludesAll(doc, [
    'DOCS_ONLY',
    'APPEND_ONLY_PREREQUISITE_RESOLUTION',
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
    'TRACKED_DOCS_ONLY_RTRE_P01_RESOLUTION',
    'none without a separate Owner decision',
  ]);

  assert.match(doc, /does not prove contract readiness, schema readiness, validator readiness/i);
  assert.match(doc, /not actual human review, professional review,/i);
  assert.doesNotMatch(doc, /\/Users\//);
  assert.doesNotMatch(doc, /https?:\/\//);
  assert.doesNotMatch(doc, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
