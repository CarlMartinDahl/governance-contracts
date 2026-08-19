import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const currentnessDocPath = path.join(
  repoRoot,
  'docs',
  'DOMAIN_CONTRACTS_RED_TEAM_CORPUS_TRACKED_STATUS_CURRENTNESS_BOUNDARY_v1.md',
);
const corpusDocPath = path.join(
  repoRoot,
  'docs',
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md',
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

test('currentness boundary freezes the append-only docs-only posture', () => {
  const doc = readRequiredFile(currentnessDocPath, 'red-team corpus currentness boundary');

  assertIncludesAll(doc, [
    'RED_TEAM_CORPUS_TRACKED_STATUS_CURRENTNESS_BOUNDARY',
    'DOCS_ONLY',
    'APPEND_ONLY_CURRENTNESS_BOUNDARY',
    'HISTORICAL_SNAPSHOTS_UNCHANGED',
    'TRACKED_CORPUS_PRESENCE_ESTABLISHED',
    'TRACKED_DOCS_ONLY_SYNTHETIC_CONTROL_CORPUS',
    'EXECUTED_RED_TEAM_RUNS_UNKNOWN_NOT_EVIDENCED',
    'EXACT_BLOCKER_ACTIVATION_TRACES_UNCHANGED',
    'NO_RUNTIME_BEHAVIOR_CREATED',
    'NO_SCHEMA_CHANGE_CREATED',
    'NO_BLOCKER_CLOSURE_CREATED',
    'NO_DEPENDENCY_CLOSURE_CREATED',
    'PRODUCT_CANDIDATE_NONE',
    'EXTERNAL_USE_NOT_AUTHORIZED',
    'HUMAN_PROFESSIONAL_REVIEW_REQUIRED',
    'TRACKED_DOCS_ONLY_CURRENTNESS_PARTITION_FROZEN',
  ]);
});

test('later corpus evidence and merge lineage are explicit', () => {
  const doc = readRequiredFile(currentnessDocPath, 'red-team corpus currentness boundary');

  assertIncludesAll(doc, [
    'docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md',
    'tests/domain-controlled-synthetic-red-team-corpus-boundary-doc-freeze.test.js',
    'e4746e215fa3c7168a598f7f912e4751c0b8a3ae',
    'f3ce636ff9cb6efbb7c7693ee46ea6e578c7058d',
    '26 structurally complete examples',
  ]);
});

test('historical snapshot docs and tests remain separate surfaces', () => {
  const doc = readRequiredFile(currentnessDocPath, 'red-team corpus currentness boundary');

  assertIncludesAll(doc, [
    'docs/DOMAIN_CONTRACTS_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_STATUS_AND_GAP_SUMMARY_v1.md',
    '[excluded private review artifact]',
    '[excluded private review artifact]',
    'tests/domain-internal-governance-review-protocol-status-and-gap-summary-doc-freeze.test.js',
    'tests/excluded-private-review-artifact.test.js',
    'tests/excluded-private-review-artifact.test.js',
    'remain unchanged historical snapshots',
    'then-allowed evidence sets',
  ]);
});

test('current status partition separates presence execution traces and closure', () => {
  const doc = readRequiredFile(currentnessDocPath, 'red-team corpus currentness boundary');

  assertIncludesAll(doc, [
    '| tracked synthetic prompt/output corpus presence | `UNKNOWN_NOT_EVIDENCED` | PR #90 corpus boundary and focused proof test | `TRACKED_DOCS_ONLY_SYNTHETIC_CONTROL_CORPUS` | presence and structure only |',
    '| controlled synthetic example count | not evidenced in the earlier allowed evidence sets | 21 unsafe/adversarial examples plus 5 legitimate safe examples | `26_TRACKED_SYNTHETIC_CONTROL_EXAMPLES` | examples are fixtures, not executed outputs |',
    '| executed model red-team runs | `UNKNOWN_NOT_EVIDENCED` | no executed-run evidence created by PR #90 | `UNKNOWN_NOT_EVIDENCED` | corpus presence is not execution evidence |',
    '| exact blocker activation traces | `SYNTHETIC_TRACE_ONLY` / `UNKNOWN_NOT_EVIDENCED` | no exact activation trace created by PR #90 | `SYNTHETIC_TRACE_ONLY` / `UNKNOWN_NOT_EVIDENCED` | unchanged |',
    '| broader blocker or dependency closure | not established | no closure evidence created by PR #90 | `NOT_CLOSED` | separate explicit closure evidence and authorization required |',
  ]);
});

test('tracked corpus still contains exactly 26 normalized control examples', () => {
  const corpus = readRequiredFile(corpusDocPath, 'controlled synthetic red-team corpus boundary');
  const unsafeCount = corpus.split('\n').filter((line) => line === 'UNSAFE_OR_TEST_REQUEST:').length;
  const safeCount = corpus.split('\n').filter((line) => line === 'SAFE_OR_TEST_REQUEST:').length;

  assert.equal(unsafeCount, 21);
  assert.equal(safeCount, 5);
  assert.ok(corpus.includes('TRACKED_DOCS_ONLY_SYNTHETIC_CONTROL_CORPUS'));
});

test('positive status does not drift into execution closure or approval', () => {
  const doc = readRequiredFile(currentnessDocPath, 'red-team corpus currentness boundary');

  assertIncludesAll(doc, [
    'do not treat a tracked fixture corpus as executed model output',
    'do not treat corpus presence as an exact blocker activation trace',
    'do not treat status currentness as blocker or dependency closure',
    'It does not prove model behavior, executed runs, exact activation traces,',
    'none without a separate Owner decision',
  ]);

  assert.doesNotMatch(doc, /^EXECUTED_RED_TEAM_RUNS_ESTABLISHED$/m);
  assert.doesNotMatch(doc, /^EXACT_BLOCKER_ACTIVATION_TRACES_ESTABLISHED$/m);
  assert.doesNotMatch(doc, /^BLOCKER_CLOSED$/m);
  assert.doesNotMatch(doc, /^DEPENDENCY_CLOSED$/m);
  assert.doesNotMatch(doc, /^PRODUCT_READY$/m);
  assert.doesNotMatch(doc, /^EXTERNAL_USE_AUTHORIZED$/m);
  assert.doesNotMatch(doc, /\/Users\//);
  assert.doesNotMatch(doc, /https?:\/\//);
});
