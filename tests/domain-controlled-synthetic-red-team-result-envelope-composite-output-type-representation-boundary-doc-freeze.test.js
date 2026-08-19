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
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_COMPOSITE_OUTPUT_TYPE_REPRESENTATION_BOUNDARY_v1.md',
);
const corpusPath = path.join(
  repoRoot,
  'docs',
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md',
);
const taxonomyPath = path.join(
  repoRoot,
  'docs',
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md',
);
const COMPOSITE_OUTPUT_TYPE = 'NO_OVERCLAIM_WARNING + OWNER_DECISION_REQUEST';

function readRequiredFile(filePath, description) {
  assert.equal(existsSync(filePath), true, `expected ${description} to exist`);
  return readFileSync(filePath, 'utf8');
}

function normalizeCanonicalValue(value) {
  return value.replaceAll('`', '').trim();
}

function extractLabeledValue(section, label) {
  const match = section.match(new RegExp(`^${label}:\\n([^\\n]+)$`, 'm'));
  assert.ok(match, `expected case section to contain ${label}`);
  return normalizeCanonicalValue(match[1]);
}

function parseCorpusOutputTypes(doc) {
  const headings = [...doc.matchAll(/^### ([A-Z]+-\d{3})$/gm)];
  const rows = new Map();

  headings.forEach((heading, index) => {
    const start = heading.index;
    const end = headings[index + 1]?.index ?? doc.length;
    const section = doc.slice(start, end);
    rows.set(heading[1], extractLabeledValue(section, 'REQUIRED_OUTPUT_TYPE'));
  });

  return rows;
}

function parseTaxonomyOutputTypes(doc) {
  const rows = new Map();

  for (const line of doc.split('\n')) {
    if (!/^\| [A-Z]+-\d{3} \|/.test(line)) continue;

    const cells = line
      .split('|')
      .slice(1, -1)
      .map((cell) => normalizeCanonicalValue(cell));
    assert.equal(cells.length, 5, `expected five cells in row: ${line}`);
    rows.set(cells[0], cells[1]);
  }

  return rows;
}

function parseBoundaryCompositeRows(doc) {
  const rows = new Map();

  for (const line of doc.split('\n')) {
    if (!/^\| `PRODUCT-00[12]` \|/.test(line)) continue;

    const cells = line
      .split('|')
      .slice(1, -1)
      .map((cell) => normalizeCanonicalValue(cell));
    assert.equal(cells.length, 2, `expected two cells in row: ${line}`);
    rows.set(cells[0], cells[1]);
  }

  return rows;
}

function parseOpenPrerequisiteIds(doc) {
  return doc
    .split('\n')
    .filter((line) => /^\| `RTRE-P\d{2}` \|/.test(line))
    .map((line) => line.split('`')[1]);
}

function assertIncludesAll(haystack, values) {
  for (const value of values) {
    assert.ok(haystack.includes(value), `expected doc to include ${value}`);
  }
}

test('RTRE-P04 preserves exact output-type values across all 26 canonical cases', () => {
  const corpus = readRequiredFile(corpusPath, 'controlled synthetic red-team corpus');
  const taxonomy = readRequiredFile(taxonomyPath, 'four-field taxonomy partition');
  const corpusRows = parseCorpusOutputTypes(corpus);
  const taxonomyRows = parseTaxonomyOutputTypes(taxonomy);

  assert.equal(corpusRows.size, 26);
  assert.equal(taxonomyRows.size, 26);
  assert.deepEqual(taxonomyRows, corpusRows);
});

test('RTRE-P04 freezes the only canonical composite output-type cases', () => {
  const boundary = readRequiredFile(boundaryPath, 'RTRE-P04 composite-output boundary');
  const corpus = readRequiredFile(corpusPath, 'controlled synthetic red-team corpus');
  const corpusRows = parseCorpusOutputTypes(corpus);
  const compositeCases = [...corpusRows]
    .filter(([, outputType]) => outputType.includes(' + '))
    .map(([caseId, outputType]) => [caseId, outputType]);

  assert.deepEqual(compositeCases, [
    ['PRODUCT-001', COMPOSITE_OUTPUT_TYPE],
    ['PRODUCT-002', COMPOSITE_OUTPUT_TYPE],
  ]);
  assert.deepEqual(
    parseBoundaryCompositeRows(boundary),
    new Map([
      ['PRODUCT-001', COMPOSITE_OUTPUT_TYPE],
      ['PRODUCT-002', COMPOSITE_OUTPUT_TYPE],
    ]),
  );
});

test('RTRE-P04 freezes verbatim scalar representation and no component collapse', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P04 composite-output boundary');

  assertIncludesAll(doc, [
    'OUTPUT_TYPE_REPRESENTATION:',
    'CANONICAL_OUTPUT_TYPE_STRING_EXACT',
    'COMPOSITE_OUTPUT_TYPE_VALUE:',
    COMPOSITE_OUTPUT_TYPE,
    'COMPOSITE_COMPONENT_ORDER:',
    'NO_OVERCLAIM_WARNING_THEN_OWNER_DECISION_REQUEST',
    'COMPOSITE_DELIMITER:',
    'SPACE_PLUS_SPACE',
    'neither component may be selected as a substitute',
    'component order must not be reversed',
    'splitting, joining, sorting, deduplication, aliasing, coercion, array',
    'an unknown, partial, reordered, malformed, or normalized value must fail',
    'No parser, tokenizer, component dispatcher, approval flow, or execution path',
  ]);
});

test('RTRE-P04 remains docs-only and leaves adjacent prerequisites open', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P04 composite-output boundary');

  assert.deepEqual(parseOpenPrerequisiteIds(doc), [
    'RTRE-P02',
    'RTRE-P05',
    'RTRE-P06',
    'RTRE-P07',
    'RTRE-P08',
  ]);
  assertIncludesAll(doc, [
    'DOCS_ONLY',
    'APPEND_ONLY_PREREQUISITE_RESOLUTION',
    'RTRE_P04_RESOLVED_DOCS_ONLY',
    'RTRE_P01_AND_P03_PRESERVED_RESOLVED_DOCS_ONLY',
    'RESULT_ENVELOPE_CONTRACT_NOT_CREATED',
    'SCHEMA_NOT_CREATED',
    'VALIDATOR_NOT_CREATED',
    'PARSER_NOT_CREATED',
    'MODEL_PROVIDER_EXECUTION_NOT_CREATED',
    'EXECUTED_MODEL_RUN_EVIDENCE_NOT_CREATED',
    'NO_RUNTIME_BEHAVIOR_CREATED',
    'NO_COMPONENT_COLLAPSE_CREATED',
    'NO_APPROVAL_CREATED',
    'PRODUCT_CANDIDATE_NONE',
    'EXTERNAL_USE_NOT_AUTHORIZED',
    'RESOLVED_DOCS_ONLY_NOT_CONTRACT_READY',
    'BLOCKED_BY_RTRE_P02_AND_P05_TO_P08',
    'none without a separate Owner decision',
  ]);
  assert.match(doc, /does not prove contract readiness, schema readiness, validator readiness/i);
  assert.match(doc, /not actual human review, professional review,/i);
  assert.doesNotMatch(doc, /\/Users\//);
  assert.doesNotMatch(doc, /https?:\/\//);
  assert.doesNotMatch(doc, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
