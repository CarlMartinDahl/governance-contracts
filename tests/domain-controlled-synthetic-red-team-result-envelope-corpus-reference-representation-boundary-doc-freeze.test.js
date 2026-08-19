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
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CORPUS_REFERENCE_REPRESENTATION_BOUNDARY_v1.md',
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

const EXPECTED_CASE_IDS = [
  'LEGAL-001',
  'LEGAL-002',
  'LEGAL-003',
  'EVIDENCE-001',
  'EVIDENCE-002',
  'EVIDENCE-003',
  'OWNERSHIP-001',
  'OWNERSHIP-002',
  'OWNERSHIP-003',
  'SOURCE-001',
  'SOURCE-002',
  'SOURCE-003',
  'PRODUCT-001',
  'PRODUCT-002',
  'TECHNICAL-001',
  'TECHNICAL-002',
  'GOVERNANCE-001',
  'GOVERNANCE-002',
  'GOVERNANCE-003',
  'REVIEWER-001',
  'REVIEWER-002',
  'SAFE-001',
  'SAFE-002',
  'SAFE-003',
  'SAFE-004',
  'SAFE-005',
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

function parseCorpusCaseIds(doc) {
  return [...doc.matchAll(/^### ([A-Z]+-\d{3})$/gm)].map((match) => match[1]);
}

function parseTaxonomyCaseIds(doc) {
  return doc
    .split('\n')
    .filter((line) => /^\| [A-Z]+-\d{3} \|/.test(line))
    .map((line) => line.split('|')[1].trim());
}

function parseBoundaryCaseIds(doc) {
  return doc
    .split('\n')
    .filter((line) => /^\| `[A-Z]+-\d{3}` \|$/.test(line))
    .map((line) => line.split('`')[1]);
}

function parseOpenPrerequisiteIds(doc) {
  return doc
    .split('\n')
    .filter((line) => /^\| `RTRE-P\d{2}` \|/.test(line))
    .map((line) => line.split('`')[1]);
}

test('RTRE-P03 freezes the exact canonical 26-case identifier set', () => {
  const boundary = readRequiredFile(boundaryPath, 'RTRE-P03 corpus-reference boundary');
  const corpus = readRequiredFile(corpusPath, 'controlled synthetic red-team corpus');
  const taxonomy = readRequiredFile(taxonomyPath, 'four-field taxonomy partition');
  const corpusIds = parseCorpusCaseIds(corpus);
  const taxonomyIds = parseTaxonomyCaseIds(taxonomy);
  const boundaryIds = parseBoundaryCaseIds(boundary);

  assert.deepEqual(corpusIds, EXPECTED_CASE_IDS);
  assert.deepEqual(taxonomyIds, EXPECTED_CASE_IDS);
  assert.deepEqual(boundaryIds, EXPECTED_CASE_IDS);
  assert.equal(new Set(boundaryIds).size, 26);
});

test('RTRE-P03 freezes one exact scalar CASE_ID token only', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P03 corpus-reference boundary');

  assertIncludesAll(doc, [
    'REFERENCE_FORM:',
    'CASE_ID_TOKEN_ONLY',
    'REFERENCE_VALUE:',
    'ONE_EXACT_CANONICAL_SYNTHETIC_CASE_ID_STRING',
    'one scalar string that equals exactly one identifier',
    'The lexical appearance is descriptive only',
    'does not make an unknown value canonical',
    'case folding, trimming, coercion, aliases, prefixes, suffixes, and wildcard',
    'an unknown or malformed token must fail closed',
  ]);
});

test('RTRE-P03 reference creates no lookup or truth semantics', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P03 corpus-reference boundary');

  assertIncludesAll(doc, [
    'NO_LOOKUP_CREATED',
    'NO_CURRENTNESS_TRUTH_CREATED',
    'NO_SOURCE_TRUTH_CREATED',
    'not:',
    'an object or array',
    'a URL, URI, filesystem path, repository path, commit, branch, or PR reference',
    'a request to look up, load, fetch, resolve, persist, or execute anything',
    'proof that the corpus item exists at runtime, is current, was executed',
    'Generic database, API route, export-package, profile-dossier, or evidence',
  ]);
});

test('RTRE-P03 remains docs-only and leaves adjacent prerequisites open', () => {
  const doc = readRequiredFile(boundaryPath, 'RTRE-P03 corpus-reference boundary');

  assert.deepEqual(parseOpenPrerequisiteIds(doc), [
    'RTRE-P02',
    'RTRE-P04',
    'RTRE-P05',
    'RTRE-P06',
    'RTRE-P07',
    'RTRE-P08',
  ]);
  assertIncludesAll(doc, [
    'DOCS_ONLY',
    'APPEND_ONLY_PREREQUISITE_RESOLUTION',
    'RTRE_P03_RESOLVED_DOCS_ONLY',
    'RTRE_P01_PRESERVED_RESOLVED_DOCS_ONLY',
    'RESULT_ENVELOPE_CONTRACT_NOT_CREATED',
    'SCHEMA_NOT_CREATED',
    'VALIDATOR_NOT_CREATED',
    'MODEL_PROVIDER_EXECUTION_NOT_CREATED',
    'EXECUTED_MODEL_RUN_EVIDENCE_NOT_CREATED',
    'NO_RUNTIME_BEHAVIOR_CREATED',
    'PRODUCT_CANDIDATE_NONE',
    'EXTERNAL_USE_NOT_AUTHORIZED',
    'RESOLVED_DOCS_ONLY_NOT_CONTRACT_READY',
    'BLOCKED_BY_RTRE_P02_AND_P04_TO_P08',
    'none without a separate Owner decision',
  ]);
  assert.match(doc, /does not prove contract readiness, schema readiness, validator readiness/i);
  assert.match(doc, /not actual human review, professional review,/i);
  assert.doesNotMatch(doc, /\/Users\//);
  assert.doesNotMatch(doc, /https?:\/\//);
  assert.doesNotMatch(doc, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
