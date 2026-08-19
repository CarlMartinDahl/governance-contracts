"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

const docPath =
  "docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_AFTER_PR46_v1.md";
const pr47ProofPath =
  "tests/domain-raw-material-routing-control-specification-after-pr46.test.js";
const alignmentProofPath =
  "tests/domain-raw-material-routing-control-specification-after-pr46-alignment.test.js";

const fixedEvidencePaths = Object.freeze([docPath, pr47ProofPath]);

const readRepoFile = (repoRelativePath) =>
  fs.readFileSync(path.join(repoRoot, repoRelativePath), "utf8");

const doc = readRepoFile(docPath);
const pr47Proof = readRepoFile(pr47ProofPath);
const alignmentProof = readRepoFile(alignmentProofPath);

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

const requiredIdentityPhrases = Object.freeze([
  "# Raw-Material Routing Control Specification After PR46 v1",
  "Boundary name: `RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_AFTER_PR46`",
  "Mode: `DOCS_ONLY`",
  "Posture: `PROVE_ONLY`",
  "Scope: `CONTROL_SPECIFICATION_ONLY`",
  "This is not implementation.",
  "Human/professional review remains required.",
  "Runtime gate inventory remains deferred.",
  "`DOCS_ONLY` is not runtime enforcement.",
  "Registry scaffold or alignment proof is not executable registry lookup and is not runtime registry lookup.",
  "Local validation and any future CI evidence are not release approval, technical sign-off, runtime certification",
]);

const requiredBaseEvidence = Object.freeze([
  "PR #43 established the raw-material routing implementation-readiness scope review.",
  "PR #44 aligned the PR #43 raw-material routing implementation-readiness scope review.",
  "PR #45 scaffolded the raw-material routing implementation-readiness scope review registry.",
  "PR #46 aligned the PR #45 raw-material routing implementation-readiness scope review registry.",
]);

const expectedLineage = Object.freeze(
  Array.from({ length: 18 }, (_, index) => `PR #${index + 29}`),
);

const requiredNonAuthorizations = Object.freeze([
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

const requiredMaterialClassPosture = Object.freeze([
  {
    controlId: "RMR-CS-001",
    checks: [
      ["allowedIngress", /redaction and sanitization/],
      ["prohibitedEgress", /External-use/],
      ["thirdPartyModelApiConstraint", /not authorized/],
    ],
  },
  {
    controlId: "RMR-CS-002",
    checks: [
      ["allowedProcessingLayer", /Review-support signal context only/],
      ["prohibitedProcessingLayer", /Automated conclusion generation/],
      ["prohibitedEgress", /legal conclusion/],
    ],
  },
  {
    controlId: "RMR-CS-003",
    checks: [
      ["allowedProcessingLayer", /Package, inventory, and integrity context only/],
      ["prohibitedProcessingLayer", /truth proof, chain-of-custody creation/],
    ],
  },
  {
    controlId: "RMR-CS-004",
    checks: [
      ["prohibitedEgress", /external-use/],
      ["implementationGap", /No packet\/delivery gate/],
    ],
  },
  {
    controlId: "RMR-CS-005",
    checks: [
      ["currentEvidenceLevel", /NOT_CI_EVIDENCE/],
      ["prohibitedProcessingLayer", /Local log inspection, CI log inspection/],
      ["prohibitedEgress", /chain-of-custody claim/],
    ],
  },
  {
    controlId: "RMR-CS-006",
    checks: [
      ["allowedIngress", /^None\.$/],
      ["prohibitedProcessingLayer", /Automated processing, third-party routing, export, logs, generated reports, non-professional review/],
    ],
  },
  {
    controlId: "RMR-CS-007",
    checks: [
      ["prohibitedIngress", /Source package inspection/],
      ["thirdPartyModelApiConstraint", /blocked/],
    ],
  },
  {
    controlId: "RMR-CS-008",
    checks: [
      ["prohibitedIngress", /PDF\/image\/screenshot inspection, OCR, metadata extraction/],
      ["prohibitedProcessingLayer", /OCR, metadata acquisition/],
    ],
  },
  {
    controlId: "RMR-CS-009",
    checks: [
      ["allowedProcessingLayer", /None until provider posture is separately authorized/],
      ["thirdPartyModelApiConstraint", /Provider registry\/status/],
      ["requiredTestEvidence", /no-token, no-URL, no-payload/],
    ],
  },
  {
    controlId: "RMR-CS-010",
    checks: [
      ["allowedProcessingLayer", /Human\/professional review support/],
      ["prohibitedProcessingLayer", /Automated approval/],
      ["prohibitedEgress", /technical sign-off, external-use/],
    ],
  },
  {
    controlId: "RMR-CS-011",
    checks: [
      ["currentEvidenceLevel", /UNKNOWN_NOT_EVIDENCED_FAIL_CLOSED/],
      ["intendedEnforcementLayer", /DENY_BY_DEFAULT_UNTIL_CLASSIFIED/],
    ],
  },
  {
    controlId: "RMR-CS-012",
    checks: [
      ["currentEvidenceLevel", /AMBIGUOUS_NOT_EVIDENCED_FAIL_CLOSED/],
      ["intendedEnforcementLayer", /DENY_BY_DEFAULT_UNTIL_SEPARATED_AND_CLASSIFIED/],
      ["implementationGap", /No mixed-bundle route path, no quarantine\/block path/],
    ],
  },
]);

const forbiddenPositivePattern = new RegExp(
  [
    "\\b(",
    [
      ["raw material routing ", "imple", "mented"],
      ["raw-material routing ", "imple", "mented"],
      ["route policy ", "imple", "mented"],
      ["route decision engine ", "cre", "ated"],
      ["quarantine ", "imple", "mented"],
      ["block path ", "imple", "mented"],
      ["validator dispatch ", "cre", "ated"],
      ["registry lookup ", "cre", "ated"],
      ["runtime registry lookup ", "cre", "ated"],
      ["material class registry ", "imple", "mented"],
      ["scope model ", "imple", "mented"],
      ["third-party routing ", "auth", "orized"],
      ["third party routing ", "auth", "orized"],
      ["provider routing ", "auth", "orized"],
      ["raw material route ", "auth", "orized"],
      ["raw/private/source ", "inspe", "cted"],
      ["source package ", "inspe", "cted"],
      ["PDF ", "inspe", "cted"],
      ["image ", "inspe", "cted"],
      ["screenshot ", "inspe", "cted"],
      ["metadata ", "inspe", "cted"],
      ["runtime gate ", "cre", "ated"],
      ["RBAC ", "imple", "mented"],
      ["access-control ", "imple", "mented"],
      ["access control ", "imple", "mented"],
      ["admin support access ", "auth", "orized"],
      ["admin/support access ", "auth", "orized"],
      ["audit/access-log ", "imple", "mented"],
      ["audit logging ", "imple", "mented"],
      ["access logging ", "imple", "mented"],
      ["retention ", "imple", "mented"],
      ["deletion ", "imple", "mented"],
      ["encryption ", "imple", "mented"],
      ["chain-of-custody ", "cre", "ated"],
      ["security ", "find", "ing"],
      ["seve", "rity"],
      ["reme", "diation"],
      ["release ", "approval"],
      ["external-use ", "auth", "orized"],
      ["external use ", "auth", "orized"],
      ["product candidate ", "sel", "ected"],
      ["technical ", "sign-", "off"],
      ["runtime ", "certi", "fication"],
      ["court ", "ready"],
      ["court-", "ready"],
      ["AI Act ", "comp", "liant"],
      ["AI_ACT_", "COMP", "LIANT"],
      ["high-risk ", "appro", "ved"],
      ["HIGH_RISK_", "APPRO", "VED"],
      ["legal ", "conclusion"],
      ["clinical ", "conclusion"],
      ["evidentiary ", "conclusion"],
      ["case-truth ", "conclusion"],
      ["implementation ", "complete"],
      ["blocker ", "closed"],
    ]
      .map((parts) => parts.join(""))
      .join("|"),
    ")\\b",
  ].join(""),
  "gi",
);

const allowedOverclaimContext =
  /(not|no|does not|non-authorized|not authorized|future|forbidden target|forbidden phrase fixture|blocked|prohibited|remains|without|denial|deny|excluded|only)/i;

function assertIncludesAll(content, requiredPhrases) {
  for (const phrase of requiredPhrases) {
    assert.equal(content.includes(phrase), true, phrase);
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
const byId = Object.fromEntries(rows.map((row) => [row.controlId, row]));

test("PR47 fixed tracked evidence exists and PR48 alignment proof reads only fixed evidence paths", () => {
  for (const repoRelativePath of [
    ...fixedEvidencePaths,
    alignmentProofPath,
  ]) {
    assert.equal(path.isAbsolute(repoRelativePath), false, repoRelativePath);
    assert.equal(
      fs.existsSync(path.join(repoRoot, repoRelativePath)),
      true,
      repoRelativePath,
    );
  }

  assert.equal(doc.includes("CONTROL_ROWS_JSON_BEGIN"), true);
  assert.equal(pr47Proof.includes("parseControlRows"), true);
  assert.equal(alignmentProof.includes("fixedEvidencePaths"), true);
});

test("PR47 docs-only prove-only control specification identity and lineage remain explicit", () => {
  assertIncludesAll(doc, requiredIdentityPhrases);
  assertIncludesAll(doc, requiredBaseEvidence);
  assertIncludesAll(doc, expectedLineage);
  assert.equal(doc.includes("PR_29_THROUGH_PR_46_LINEAGE_PRESERVED"), true);

  for (const controlId of expectedControlIds) {
    assert.equal(pr47Proof.includes(controlId), true, controlId);
  }
});

test("PR47 control rows remain exactly RMR-CS-001 through RMR-CS-012 with the required field structure", () => {
  assert.equal(rows.length, 12);
  assert.deepEqual(
    rows.map((row) => row.controlId),
    expectedControlIds,
  );
  assert.deepEqual(
    rows.map((row) => row.materialClass),
    expectedMaterialClasses,
  );

  for (const row of rows) {
    assert.deepEqual(Object.keys(row), requiredFieldNames, row.controlId);
    assert.equal(
      row.remainsNonAuthorizedUntilClosure,
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
      row.controlId,
    );
    assert.match(row.blockerStatus, /NOT_CLOSED/, row.controlId);
  }
});

test("PR47 material-class postures preserve dependency-only and future-only control boundaries", () => {
  for (const { controlId, checks } of requiredMaterialClassPosture) {
    const row = byId[controlId];
    assert.ok(row, controlId);

    for (const [field, expectedPattern] of checks) {
      assert.match(row[field], expectedPattern, `${controlId}.${field}`);
    }

    assert.match(
      row.closureCriteria,
      /Separate|Future|Explicit|implementation evidence|tests|review/i,
      controlId,
    );
  }

  assertIncludesAll(doc, [
    "Every row remains future-only, candidate-only, and non-authorized until separate tracked implementation evidence, separate tracked test evidence, and separate human/professional review exist.",
    "RBAC/access-control/admin-support dependencies remain unresolved and do not authorize raw/private/source handling.",
    "Audit/access-log dependencies remain not implemented and do not create chain-of-custody.",
    "Retention/deletion/purge/erasure/encryption/key-management dependencies remain future-only.",
    "Third-party/provider routing remains not authorized.",
    "Runtime gate, validator dispatch, executable registry lookup, and runtime registry lookup remain not created.",
    "Human/professional review remains a required gate and is not system approval.",
  ]);
});

test("PR47 non-authorizations and evidence boundaries remain explicit", () => {
  assertIncludesAll(doc, requiredNonAuthorizations);
  assertIncludesAll(doc, [
    "No raw/private/source material is inspected.",
    "No source package, PDF/image/screenshot/metadata material, provider payload, URL, token, secret, local log, or CI log body is inspected or authorized by this specification.",
    "Local validation and any future CI evidence are not release approval, technical sign-off, runtime certification, external-use authorization, product-candidate selection, security finding, severity, remediation, blocker closure, or domain conclusion.",
  ]);
});

test("PR47 focused proof test proves the same core control-specification posture", () => {
  assertIncludesAll(pr47Proof, [
    "Mode: `DOCS_ONLY`",
    "Posture: `PROVE_ONLY`",
    "Scope: `CONTROL_SPECIFICATION_ONLY`",
    "PR_29_THROUGH_PR_46_LINEAGE_PRESERVED",
    "expectedControlIds",
    "expectedMaterialClasses",
    "requiredFieldNames",
    "positive-overclaim guard scans only the PR47 doc and test files",
  ]);
});

test("PR48 positive-overclaim guard scans only PR47 doc/proof and this alignment proof", () => {
  const scannedFiles = Object.freeze({
    [docPath]: doc,
    [pr47ProofPath]: pr47Proof,
    [alignmentProofPath]: alignmentProof,
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
    matches.every((match) => allowedOverclaimContext.test(match.text)),
    true,
    JSON.stringify(matches, null, 2),
  );
});
