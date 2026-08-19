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
  'DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md',
);

function readDoc() {
  assert.equal(existsSync(docPath), true, 'expected controlled synthetic red-team corpus doc to exist');
  return readFileSync(docPath, 'utf8');
}

function assertIncludesAll(haystack, values) {
  for (const value of values) {
    assert.ok(haystack.includes(value), `expected doc to include ${value}`);
  }
}

function countExactLines(doc, value) {
  return doc.split('\n').filter((line) => line === value).length;
}

test('controlled synthetic red-team corpus freezes the docs-only boundary', () => {
  const doc = readDoc();

  assertIncludesAll(doc, [
    'CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY',
    'DOCS_ONLY',
    'SYNTHETIC_CONTROL_CORPUS_ONLY',
    'TRACKED_PROMPT_OUTPUT_EXAMPLES_ONLY',
    'NO_RAW',
    'NO_PRIVATE',
    'NO_SOURCE_LOCATOR',
    'NO_REAL_EVIDENCE',
    'NO_RUNTIME_BEHAVIOR_CREATED',
    'NO_SCHEMA_CHANGE_CREATED',
    'NO_BLOCKER_CLOSURE_CREATED',
    'PRODUCT_CANDIDATE_NONE',
    'EXTERNAL_USE_NOT_AUTHORIZED',
    'HUMAN_PROFESSIONAL_REVIEW_REQUIRED',
    'TRACKED_DOCS_ONLY_SYNTHETIC_CONTROL_CORPUS',
  ]);
});

test('corpus contains 26 structurally complete examples', () => {
  const doc = readDoc();

  assert.equal(countExactLines(doc, 'UNSAFE_OR_TEST_REQUEST:'), 21);
  assert.equal(countExactLines(doc, 'SAFE_OR_TEST_REQUEST:'), 5);
  assert.equal(countExactLines(doc, 'STOP_CONDITION_TRIGGERED:'), 26);
  assert.equal(countExactLines(doc, 'REQUIRED_OUTPUT_TYPE:'), 26);
  assert.equal(countExactLines(doc, 'SAFE_RESPONSE:'), 26);
  assert.equal(countExactLines(doc, 'FORBIDDEN_RESPONSE:'), 26);
  assert.equal(countExactLines(doc, 'NEXT_ACTION:'), 26);
});

test('corpus freezes all test families and normalized safe requests', () => {
  const doc = readDoc();

  assertIncludesAll(doc, [
    '## 3. Legal Conclusion Traps',
    '## 4. Evidence Sufficiency and Strength Traps',
    '## 5. Ownership and Hidden Co-Ownership Traps',
    '## 6. Source, Identity, Authorship, and Chain-of-Custody Traps',
    '## 7. Product and External-Use Approval Traps',
    '## 8. Technical Sign-Off and Compliance Traps',
    '## 9. Duplicate and Reopen Governance Traps',
    '## 10. External Reviewer Review Bypass Traps',
    '## 11. Legitimate Safe Requests',
    '### SAFE-001',
    '### SAFE-005',
  ]);
});

test('accepted language and escalation normalizations are frozen', () => {
  const doc = readDoc();

  assertIncludesAll(doc, [
    'SAFE_RESPONSE_RULE:',
    'It must not answer a forbidden question using',
    'softened, probabilistic, indirect, or confidence-qualified conclusion language.',
    'gate states and blocker visibility within verified boundary',
    '`PROFESSIONAL_LEGAL_REVIEW_REQUIRED / TECHNICAL_REVIEW_REQUIRED`',
    '`OWNER_DECISION_REQUIRED_FOR_DUPLICATE_CHECK`',
  ]);

  assert.doesNotMatch(doc, /^`PROFESSIONAL_REVIEW_REQUIRED`$/m);
  assert.doesNotMatch(doc, /known closure states/i);
});

test('source and no-conclusion boundaries remain explicit', () => {
  const doc = readDoc();

  assertIncludesAll(doc, [
    'It does not close any blocker, dependency, implementation-readiness,',
    'It does not prove model behavior, prompt adherence, runtime enforcement,',
    'This corpus is not actual human review, professional review, legal review,',
    'not use chat-only, untracked, private, or raw material as repo truth',
    'none without a separate Owner decision',
  ]);

  assert.doesNotMatch(doc, /\/Users\//);
  assert.doesNotMatch(doc, /https?:\/\//);
  assert.doesNotMatch(doc, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
});
