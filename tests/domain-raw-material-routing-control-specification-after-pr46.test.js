"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

const docPath =
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_AFTER_PR46_v1.md";
const testPath =
  "tests/domain-raw-material-routing-control-specification-after-pr46.test.js";

const fixedTrackedEvidencePaths = Object.freeze([
  docPath,
  testPath,
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR42_v1.md",
  "tests/domain-raw-material-routing-implementation-readiness-scope-review-after-pr42.test.js",
  "tests/domain-raw-material-routing-implementation-readiness-scope-review-after-pr42-alignment.test.js",
  "packages/governance/src/raw-material-routing-implementation-readiness-scope-review-registry.js",
  "tests/raw-material-routing-implementation-readiness-scope-review-registry.test.js",
  "tests/raw-material-routing-implementation-readiness-scope-review-registry-alignment.test.js",
]);

const readFixed = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const doc = readFixed(docPath);
const self = readFixed(testPath);
const evidence = Object.fromEntries(
  fixedTrackedEvidencePaths.map((repoRelativePath) => [
    repoRelativePath,
    readFixed(repoRelativePath),
  ]),
);

const requiredFieldNames = Object.freeze([
  "controlId",
  "materialClass",
  "allowedIngress",
  "prohibitedIngress",
  "allowedProcessingLayer",
  "prohibitedProcessingLayer",
  "allowedEgress",
  "prohibitedEgress",
  "requiredRedactionSanitizationPoint",
  "requiredAuditAccessLogEvent",
  "retentionDeletionDependency",
  "rbacAccessControlDependency",
  "thirdPartyModelApiConstraint",
  "currentEvidenceLevel",
  "intendedEnforcementLayer",
  "implementationGap",
  "requiredImplementationEvidence",
  "requiredTestEvidence",
  "blockerStatus",
  "closureCriteria",
  "remainsNonAuthorizedUntilClosure",
]);

const expectedControlIds = Object.freeze(
  Array.from({ length: 12 }, (_, index) =>
    `RMR-CS-${String(index + 1).padStart(3, "0")}`,
  ),
);

const expectedMaterialClasses = Object.freeze([
  "sanitized/no-raw review material",
  "redacted review signals",
  "no-raw metadata manifest material",
  "generated/export artifacts",
  "local logs/test transcripts",
  "raw private source material",
  "source packages",
  "PDF/image/screenshot/metadata material",
  "third-party model/API routed material",
  "human/professional review-only material",
  "unknown/unclassified material",
  "mixed or ambiguous material bundles",
]);

const expectedLineage = Object.freeze(
  Array.from({ length: 18 }, (_, index) => `PR #${index + 29}`),
);

const requiredBoundaryPhrases = Object.freeze([
  "Mode: `DOCS_ONLY`",
  "Posture: `PROVE_ONLY`",
  "Scope: `CONTROL_SPECIFICATION_ONLY`",
  "This is not implementation.",
  "This does not create runtime behavior, API behavior, schema behavior, package manifest/config behavior, package export wiring, source code behavior",
  "executable routing",
  "route policy runtime",
  "route decision engine",
  "quarantine/block path",
  "validator dispatch",
  "executable registry lookup",
  "runtime registry lookup",
  "No raw/private/source material is inspected.",
  "Human/professional review remains required.",
  "Runtime gate inventory remains deferred.",
  "`DOCS_ONLY` is not runtime enforcement.",
  "Registry scaffold or alignment proof is not executable registry lookup and is not runtime registry lookup.",
  "Local validation and any future CI evidence are not release approval, technical sign-off, runtime certification",
]);

const requiredSubstancePhrases = Object.freeze([
  "Potential review-support ingress only after documented redaction and sanitization",
  "Review-support signal context only.",
  "Package, inventory, and integrity context only.",
  "External-use, product use, delivery approval, court-readiness",
  "Local log bodies, CI logs, terminal transcripts",
  "Automated processing, third-party routing, export, logs, generated reports, non-professional review.",
  "Source package inspection, archive/ZIP opening, source package routing.",
  "PDF/image/screenshot inspection, OCR, metadata extraction",
  "Provider registry/status, provider retention/deletion posture, provider auditability, token/URL/secret handling, data-routing map, and explicit approval required first.",
  "Human/professional review support.",
  "UNKNOWN_NOT_EVIDENCED_FAIL_CLOSED",
  "AMBIGUOUS_NOT_EVIDENCED_FAIL_CLOSED",
  "DENY_BY_DEFAULT_UNTIL_SEPARATED_AND_CLASSIFIED",
]);

function assertIncludesAll(actual, expected) {
  for (const item of expected) {
    assert.equal(actual.includes(item), true, item);
  }
}

function parseControlRows(markdown) {
  const match = markdown.match(
    /`CONTROL_ROWS_JSON_BEGIN`\s*```json\s*([\s\S]*?)\s*```\s*`CONTROL_ROWS_JSON_END`/,
  );
  assert.ok(match, "control row JSON block exists");
  return JSON.parse(match[1]);
}

const rows = parseControlRows(doc);

test("PR47 control specification has docs-only prove-only identity and fixed evidence paths", () => {
  for (const repoRelativePath of fixedTrackedEvidencePaths) {
    assert.equal(path.isAbsolute(repoRelativePath), false, repoRelativePath);
    assert.equal(
      fs.existsSync(path.join(repoRoot, repoRelativePath)),
      true,
      repoRelativePath,
    );
  }

  assertIncludesAll(doc, requiredBoundaryPhrases);
  assert.equal(evidence[docPath], doc);
  assert.equal(evidence[testPath], self);
});

test("PR47 lineage and base evidence cover PR29 through PR46 and PR43 through PR46", () => {
  assertIncludesAll(doc, expectedLineage);
  assertIncludesAll(doc, [
    "PR_29_THROUGH_PR_46_LINEAGE_PRESERVED",
    "PR #43 established the raw-material routing implementation-readiness scope review.",
    "PR #44 aligned the PR #43 raw-material routing implementation-readiness scope review.",
    "PR #45 scaffolded the raw-material routing implementation-readiness scope review registry.",
    "PR #46 aligned the PR #45 raw-material routing implementation-readiness scope review registry.",
  ]);

  assert.match(
    evidence[
      "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_AFTER_PR42_v1.md"
    ],
    /RMR-IR-SR-012/,
  );
  assert.match(
    evidence[
      "packages/governance/src/raw-material-routing-implementation-readiness-scope-review-registry.js"
    ],
    /RMR-IR-SR-012/,
  );
});

test("PR47 control rows cover exactly RMR-CS-001 through RMR-CS-012 with required fields and material classes", () => {
  assert.deepEqual(
    rows.map((row) => row.controlId),
    expectedControlIds,
  );
  assert.deepEqual(
    rows.map((row) => row.materialClass),
    expectedMaterialClasses,
  );

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), requiredFieldNames);
    assert.equal(
      row.remainsNonAuthorizedUntilClosure,
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
      row.controlId,
    );
    assert.match(row.currentEvidenceLevel, /DOCS_ONLY|NOT_AUTHORIZED|UNRESOLVED|UNKNOWN|AMBIGUOUS|HUMAN/);
    assert.match(row.blockerStatus, /NOT_CLOSED/);
  }
});

test("PR47 row substance preserves material-class routing boundaries", () => {
  assertIncludesAll(doc, requiredSubstancePhrases);

  const byId = Object.fromEntries(rows.map((row) => [row.controlId, row]));
  assert.match(byId["RMR-CS-001"].allowedIngress, /redaction and sanitization/);
  assert.match(byId["RMR-CS-002"].prohibitedProcessingLayer, /Automated conclusion generation/);
  assert.match(byId["RMR-CS-003"].prohibitedProcessingLayer, /Metadata acquisition/);
  assert.match(byId["RMR-CS-004"].prohibitedEgress, /external-use/);
  assert.match(byId["RMR-CS-005"].currentEvidenceLevel, /NOT_CI_EVIDENCE/);
  assert.match(byId["RMR-CS-006"].allowedIngress, /^None\.$/);
  assert.match(byId["RMR-CS-007"].prohibitedIngress, /Source package inspection/);
  assert.match(byId["RMR-CS-008"].prohibitedProcessingLayer, /OCR/);
  assert.match(byId["RMR-CS-009"].thirdPartyModelApiConstraint, /Provider registry\/status/);
  assert.match(byId["RMR-CS-010"].intendedEnforcementLayer, /HUMAN_PROFESSIONAL_REVIEW_GATE_REQUIRED/);
  assert.match(byId["RMR-CS-011"].currentEvidenceLevel, /UNKNOWN_NOT_EVIDENCED/);
  assert.match(byId["RMR-CS-012"].currentEvidenceLevel, /AMBIGUOUS_NOT_EVIDENCED/);
});

test("PR47 non-authorizations and dependency boundaries remain explicit", () => {
  assertIncludesAll(doc, [
    "no implementation",
    "no runtime/API/schema/package behavior",
    "no executable routing",
    "no route policy runtime",
    "no route decision engine",
    "no quarantine/block path",
    "no validator dispatch",
    "no executable registry lookup",
    "no runtime registry lookup",
    "no raw/private/source inspection",
    "no source package inspection",
    "no PDF/image/screenshot/metadata inspection",
    "no metadata acquisition",
    "no third-party/provider routing authorization",
    "no audit/access-log implementation",
    "no RBAC/access-control implementation",
    "no admin/support implementation",
    "no retention/deletion/encryption implementation",
    "no runtime gate creation",
    "no security finding",
    "no severity",
    "no remediation",
    "no blocker closure",
    "no release approval",
    "no external-use",
    "no product candidate",
    "no technical sign-off",
    "no runtime certification",
    "no legal/clinical/evidentiary/case-truth conclusion",
  ]);
});

test("PR47 positive-overclaim guard scans only the PR47 doc and test files", () => {
  const forbiddenPositivePattern = /\b(raw material routing implemented|raw-material routing implemented|route policy implemented|route decision engine created|quarantine implemented|block path implemented|validator dispatch created|registry lookup created|runtime registry lookup created|material class registry implemented|scope model implemented|third-party routing authorized|third party routing authorized|provider routing authorized|raw material route authorized|raw\/private\/source inspected|source package inspected|PDF inspected|image inspected|screenshot inspected|metadata inspected|runtime gate created|RBAC implemented|access-control implemented|access control implemented|admin support access authorized|admin\/support access authorized|audit\/access-log implemented|audit logging implemented|access logging implemented|retention implemented|deletion implemented|encryption implemented|chain-of-custody created|security finding|severity|remediation|release approval|external-use authorized|external use authorized|product candidate selected|technical sign-off|runtime certification|court ready|court-ready|AI Act compliant|AI_ACT_COMPLIANT|high-risk approved|HIGH_RISK_APPROVED|legal conclusion|clinical conclusion|evidentiary conclusion|case-truth conclusion|implementation complete|blocker closed)\b/gi; // forbidden phrase fixture for positive-overclaim guard
  const allowedContextPattern =
    /(not|no|does not|non-authorized|not authorized|future|forbidden target|forbidden phrase fixture|blocked|prohibited|remains|without|denial|deny)/i;

  const scannedFiles = Object.freeze({
    [docPath]: doc,
    [testPath]: self,
  });

  const matches = [];
  for (const [repoRelativePath, content] of Object.entries(scannedFiles)) {
    const lines = content.split("\n");
    for (const [lineIndex, line] of lines.entries()) {
      forbiddenPositivePattern.lastIndex = 0;
      if (forbiddenPositivePattern.test(line)) {
        matches.push({
          repoRelativePath,
          line: lineIndex + 1,
          text: line.trim(),
        });
      }
    }
  }

  assert.equal(
    matches.every((match) => allowedContextPattern.test(match.text)),
    true,
    JSON.stringify(matches, null, 2),
  );
});
