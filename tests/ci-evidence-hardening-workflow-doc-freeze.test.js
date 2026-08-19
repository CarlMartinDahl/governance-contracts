const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const test = require("node:test");

const WORKFLOW_PATH = ".github/workflows/ci.yml";
const workflow = readFileSync(WORKFLOW_PATH, "utf8");

test("CI evidence hardening workflow exists with pull request and main push triggers", () => {
  assert.match(workflow, /^name:\s*CI Evidence Hardening$/m);
  assert.match(workflow, /^on:\n\s+pull_request:\n\s+push:\n\s+branches:\n\s+- main/m);
});

test("CI evidence hardening workflow keeps read-only repository permissions", () => {
  assert.match(workflow, /^permissions:\n\s+contents:\s+read$/m);
});

test("CI evidence hardening workflow installs from lockfile and runs validation", () => {
  assert.match(
    workflow,
    /uses:\s+actions\/checkout@11d5960a326750d5838078e36cf38b85af677262/,
  );
  assert.match(
    workflow,
    /uses:\s+actions\/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020/,
  );
  assert.match(workflow, /persist-credentials:\s+false/);
  assert.match(workflow, /timeout-minutes:\s+20/);
  assert.match(workflow, /cache:\s+npm/);
  assert.match(workflow, /run:\s+npm ci --ignore-scripts/);
  assert.doesNotMatch(workflow, /run:\s+npm install(?:\s|$)/);
  assert.match(workflow, /run:\s+npm test/);
  assert.match(workflow, /run:\s+npm run lint/);
  assert.match(workflow, /run:\s+npm run build/);
  assert.match(workflow, /run:\s+npm run release:scan/);
});

test("CI evidence hardening workflow includes dependency auditability", () => {
  assert.match(workflow, /name:\s+Dependency auditability check/);
  assert.match(workflow, /run:\s+npm audit --omit=dev/);
});

test("CI evidence hardening workflow does not create deploy release or publish behavior", () => {
  assert.doesNotMatch(workflow, /\bnpm publish\b/);
  assert.doesNotMatch(workflow, /\bdeploy\b/i);
  assert.doesNotMatch(workflow, /\brelease\b.*\brun:/i);
  assert.doesNotMatch(workflow, /\bgh release\b/);
});

test("CI evidence hardening workflow preserves explicit non-authorizations", () => {
  assert.match(workflow, /CI evidence is not release approval/);
  assert.match(workflow, /runtime certification/);
  assert.match(workflow, /technical sign-off/);
  assert.match(workflow, /external-use authorization/);
  assert.match(workflow, /product-candidate selection/);
  assert.match(workflow, /not release readiness/);
});

test("CI evidence hardening workflow avoids external-use product and certification creation semantics", () => {
  const forbiddenCreationSemantics = [
    /create[s]?\s+release approval/i,
    /create[s]?\s+external-use authorization/i,
    /create[s]?\s+product-candidate selection/i,
    /create[s]?\s+runtime certification/i,
    /create[s]?\s+technical sign-off/i,
    /authorize[s]?\s+external-use/i,
    /select[s]?\s+product-candidate/i,
    /certif(?:y|ies)\s+runtime/i,
  ];

  for (const pattern of forbiddenCreationSemantics) {
    assert.doesNotMatch(workflow, pattern);
  }
});
