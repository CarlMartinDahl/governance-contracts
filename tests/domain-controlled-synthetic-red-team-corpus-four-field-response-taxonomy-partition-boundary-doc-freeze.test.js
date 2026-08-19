import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const corpusDocPath = path.join(
  repoRoot,
  'docs',
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md',
);
const partitionDocPath = path.join(
  repoRoot,
  'docs',
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md',
);

function readRequiredFile(filePath, description) {
  assert.equal(existsSync(filePath), true, `expected ${description} to exist`);
  return readFileSync(filePath, 'utf8');
}

function normalizeTaxonomyValue(value) {
  return value.replaceAll('`', '').trim();
}

function extractLabeledValue(section, label) {
  const match = section.match(new RegExp(`^${label}:\\n([^\\n]+)$`, 'm'));
  assert.ok(match, `expected case section to contain ${label}`);
  return normalizeTaxonomyValue(match[1]);
}

function parseCanonicalCases(doc) {
  const headings = [...doc.matchAll(/^### ([A-Z]+-\d{3})$/gm)];

  return headings.map((heading, index) => {
    const start = heading.index;
    const end = headings[index + 1]?.index ?? doc.length;
    const section = doc.slice(start, end);
    const isUnsafe = /^UNSAFE_OR_TEST_REQUEST:$/m.test(section);
    const isSafe = /^SAFE_OR_TEST_REQUEST:$/m.test(section);

    assert.notEqual(isUnsafe, isSafe, `expected ${heading[1]} to have exactly one request type`);

    return {
      caseId: heading[1],
      outputType: extractLabeledValue(section, 'REQUIRED_OUTPUT_TYPE'),
      actionClass: isUnsafe ? 'STOPPED_NO_CONCLUSION' : 'ANSWERED_WITHIN_BOUNDARY',
      nextAction: extractLabeledValue(section, 'NEXT_ACTION'),
    };
  });
}

function parsePartitionRows(doc) {
  const rows = new Map();

  for (const line of doc.split('\n')) {
    if (!/^\| [A-Z]+-\d{3} \|/.test(line)) continue;

    const cells = line
      .split('|')
      .slice(1, -1)
      .map((cell) => normalizeTaxonomyValue(cell));

    assert.equal(cells.length, 5, `expected five cells in row: ${line}`);
    const [caseId, outputType, actionClass, escalationTarget, safeNextAction] = cells;
    assert.equal(rows.has(caseId), false, `expected unique row for ${caseId}`);
    rows.set(caseId, { outputType, actionClass, escalationTarget, safeNextAction });
  }

  return rows;
}

function deriveEscalationTarget(nextAction) {
  const mappings = new Map([
    ['IDLE_NO_ACTION', 'NONE'],
    ['HUMAN_REVIEW_REQUIRED', 'HUMAN_REVIEW'],
    ['PROFESSIONAL_LEGAL_REVIEW_REQUIRED', 'PROFESSIONAL_LEGAL_REVIEW'],
    ['TECHNICAL_REVIEW_REQUIRED', 'TECHNICAL_REVIEW'],
    [
      'PROFESSIONAL_LEGAL_REVIEW_REQUIRED / TECHNICAL_REVIEW_REQUIRED',
      'PROFESSIONAL_LEGAL_REVIEW / TECHNICAL_REVIEW',
    ],
    ['OWNER_DECISION_REQUIRED', 'OWNER'],
    ['OWNER_DECISION_REQUIRED_FOR_DUPLICATE_CHECK', 'OWNER'],
    ['EXTERNAL_REVIEWER_REVIEW_REQUEST', 'EXTERNAL_REVIEWER_REVIEW'],
  ]);

  assert.equal(mappings.has(nextAction), true, `expected escalation mapping for ${nextAction}`);
  return mappings.get(nextAction);
}

test('four-field taxonomy partition is a complete projection of the canonical corpus', () => {
  const corpus = readRequiredFile(corpusDocPath, 'controlled synthetic red-team corpus');
  const partition = readRequiredFile(partitionDocPath, 'four-field taxonomy partition');
  const canonicalCases = parseCanonicalCases(corpus);
  const partitionRows = parsePartitionRows(partition);

  assert.equal(canonicalCases.length, 26);
  assert.equal(partitionRows.size, 26);
  assert.equal(canonicalCases.filter(({ actionClass }) => actionClass === 'STOPPED_NO_CONCLUSION').length, 21);
  assert.equal(
    canonicalCases.filter(({ actionClass }) => actionClass === 'ANSWERED_WITHIN_BOUNDARY').length,
    5,
  );

  for (const canonicalCase of canonicalCases) {
    const row = partitionRows.get(canonicalCase.caseId);
    assert.ok(row, `expected partition row for ${canonicalCase.caseId}`);
    assert.equal(row.outputType, canonicalCase.outputType);
    assert.equal(row.actionClass, canonicalCase.actionClass);
    assert.equal(row.escalationTarget, deriveEscalationTarget(canonicalCase.nextAction));
    assert.equal(row.safeNextAction, canonicalCase.nextAction);
  }
});

test('four-field taxonomy partition freezes its append-only no-conclusion boundary', () => {
  const doc = readRequiredFile(partitionDocPath, 'four-field taxonomy partition');

  for (const value of [
    'DOCS_ONLY',
    'APPEND_ONLY_TAXONOMY_PARTITION',
    'CANONICAL_V1_MAPPINGS_UNCHANGED',
    'NO_CHAT_OUTPUT_AS_REPO_TRUTH',
    'NO_EXECUTED_MODEL_RUN_EVIDENCE',
    'NO_RUNTIME_BEHAVIOR_CREATED',
    'NO_SCHEMA_CHANGE_CREATED',
    'NO_BLOCKER_CLOSURE_CREATED',
    'NO_DEPENDENCY_CLOSURE_CREATED',
    'PRODUCT_CANDIDATE_NONE',
    'EXTERNAL_USE_NOT_AUTHORIZED',
    'TRACKED_DOCS_ONLY_APPEND_ONLY_TAXONOMY_PARTITION',
    'none without a separate Owner decision',
  ]) {
    assert.ok(doc.includes(value), `expected partition to include ${value}`);
  }

  assert.match(doc, /does not prove model behavior, prompt adherence, executed runs/i);
  assert.match(doc, /not actual human review, professional review, legal/i);
  assert.doesNotMatch(doc, /\/Users\//);
  assert.doesNotMatch(doc, /https?:\/\//);
  assert.doesNotMatch(doc, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
