"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-helper-package-export-readiness-boundary-doc-freeze.test.js";
const scaffoldProofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-helper-package-export-scaffold-scope-boundary-doc-freeze.test.js";
const helperPath =
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js";
const helperTestPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json";
const resultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json";
const helperExportName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence";
const currentSchemaExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidatorResult",
];
const historicalBehaviorExports = [
  helperExportName,
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidator",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidatorRegistry",
];
const retainedBehaviorExports = historicalBehaviorExports.filter(
  (name) => name !== helperExportName,
);
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  candidateSchemaPath,
  resultSchemaPath,
  helperPath,
  helperTestPath,
];
const denialProofPaths = [
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-export.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-export.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-helper-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  helperTestPath,
];
const expectedSourceBullets = [
  ...controllingPaths,
  "packages/schemas/src/index.js",
  ...denialProofPaths,
].map((sourcePath) => `- \`${sourcePath}\``);
const expectedFactTable = [
  "| Position | Surface | Current tracked fact |",
  "| --- | --- | --- |",
  `| 1 | internal module | exact helper exists at \`${helperPath}\` |`,
  `| 2 | module export | direct module exposes exactly \`${helperExportName}\` |`,
  "| 3 | function shape | focused proof requires function arity `1` |",
  "| 4 | machine authority | candidate and validator-result JSON schemas remain the direct machine sources |",
  `| 5 | candidate schema package export | \`${currentSchemaExports[0]}\` is already package exported |`,
  `| 6 | result schema package export | \`${currentSchemaExports[1]}\` is already package exported |`,
  `| 7 | package helper export | \`${helperExportName}\` is absent from \`packages/schemas/src/index.js\` |`,
  "| 8 | denial proofs | eight pre-existing tests expressly preserve package-level absence |",
  "| 9 | consumers | no package, app, or worker runtime consumer, registry, dispatch, checkpoint, persistence, API, provider, or model use is tracked |",
  "| 10 | helper proof | focused helper proof covers deterministic root and fifteen-field validation, six duplicate participants, five codes, sixteen static paths, no echo, accessor safety, non-mutation, recursive freezing, and result-contract conformance |",
];
const expectedDenialTable = [
  "| Position | Test path | Current dependency |",
  "| --- | --- | --- |",
  `| 1 | \`${denialProofPaths[0]}\` | candidate-schema package proof blocks validator and dispatch siblings |`,
  `| 2 | \`${denialProofPaths[1]}\` | candidate package-export scope proof retains exact validator-sibling identifier absence |`,
  `| 3 | \`${denialProofPaths[2]}\` | validator-result package proof blocks validator and dispatch siblings |`,
  `| 4 | \`${denialProofPaths[3]}\` | result package-export scope proof keeps validator behavior outside the schema-object export |`,
  `| 5 | \`${denialProofPaths[4]}\` | historical helper-readiness proof records behavior exports as absent |`,
  `| 6 | \`${denialProofPaths[5]}\` | helper scaffold proof preserves the internal-only package boundary |`,
  `| 7 | \`${denialProofPaths[6]}\` | helper proof-transition prerequisite preserves package-export denials |`,
  `| 8 | \`${denialProofPaths[7]}\` | helper runtime proof requires no package-index export in the helper-creation slice |`,
];
const expectedReadinessTable = [
  "| Readiness question | Status |",
  "| --- | --- |",
  "| internal helper exists and is focused-tested | `YES_TRACKED` |",
  "| direct module export name and arity are exact | `YES_TRACKED` |",
  "| candidate and result schemas remain machine authority | `YES_TRACKED` |",
  "| both static schema objects are package exported | `YES_TRACKED` |",
  "| public validator function package export currently exists | `NO_CURRENTLY_ABSENT` |",
  "| package publication necessity is frozen | `NO_OPEN` |",
  "| exact package symbol and reference identity are frozen | `NO_OPEN` |",
  "| exact package-index edit and line preservation are frozen | `NO_OPEN` |",
  "| exact denial-proof transitions are frozen | `NO_OPEN` |",
  "| exact implementation and focused proof file set are frozen | `NO_OPEN` |",
  "| exact package-export proof claims and downstream exclusion are frozen | `NO_OPEN` |",
];
const expectedOpenDecisionTable = [
  "| Position | Open decision | Why it must be frozen first |",
  "| --- | --- | --- |",
  "| 1 | publish or remain internal | adding package API without a bounded ownership decision creates avoidable surface drift |",
  "| 2 | exact package symbol and reference identity | direct reference-equivalent export and wrapper export have different contracts |",
  "| 3 | exact package-index require/export edit | the large shared index and line-sensitive anchors require one frozen edit method |",
  "| 4 | exact denial-proof transitions | only live assertions superseded by the new slice may change |",
  "| 5 | exact implementation and focused proof file set | every proof dependency must be enumerated before mutation |",
  "| 6 | exact package-export proof claims | export identity must not be presented as runtime integration, attestation or signature verification, authority verification, approval effect, or certification |",
  "| 7 | exact downstream exclusion | consumers, registry, dispatch, checkpoints, persistence, API, provider, and model behavior must remain separate |",
];
const expectedCurrentScope = [
  `1. \`${docsPath}\``,
  `2. \`${proofPath}\``,
];
const expectedNonInterferenceRules = [
  "- preserve both JSON schemas unchanged",
  "- preserve the internal helper and all validator behavior unchanged",
  "- preserve both existing schema-object package exports unchanged",
  "- modify no package index or existing proof in this readiness slice",
  "- select no publication posture, package symbol, export identity, index edit, denial transition, future file set, proof claim, or downstream consumer posture",
  "- create no wrapper, alias, consumer, registry, lookup, dispatch, checkpoint, persistence, API, route, provider, model, prompt, response, logging, telemetry, scoring, finding, conclusion, approval, approval effect, handoff, delivery, release, or readiness behavior",
  "- create no attestation verification, signature verification, reviewer-authorship verification, issuer or provenance trust evaluation, identity verification, currentness evaluation, trusted-time evaluation, lifecycle-truth evaluation, professional-qualification evaluation, reviewer-role evaluation, reviewer-authority evaluation, reference-resolution behavior, or admissibility decision",
  "- create no approval, sign-off, certification, legal or evidentiary conclusion, severity, remediation, blocker resolution, product candidate, or external-use authorization",
  "- inspect no raw, private, source, source-package, case, identity, authorship, credential, signature, certificate, PDF, image, screenshot, metadata, or real-evidence material; acquire no metadata; execute no real private run",
  "- reopen no closed decision attestation contract, error-path, schema, export, validator, approval, cross-reference, or admissibility semantics; preserve human/professional review as the release gate",
];
const expectedHistoricalCurrentDistinction =
  "Earlier candidate-schema, validator-result schema, package-export, helper readiness, scaffold, and proof-transition boundaries remain historical source boundaries for their completed slices. Their earlier package-behavior absence or exclusion statements neither authorize nor permanently prohibit a new, separately scoped package-export slice.";
const expectedProofBoundary =
  "The focused proof for this readiness assessment may prove only that the controlling files exist; the direct unary helper, two static schema package exports, public helper absence, repository-derived eight-file pre-existing denial inventory, one readiness-proof self-dependency, absence of exact helper identifier or module-path references outside the internal helper across package, app, and worker runtime roots, ten repository facts, seven open scope decisions, exact two-file current scope, and docs-only next slice are tracked. It does not prove that a package export is needed, implemented, correct, integrated, consumed, release-ready, product-ready, externally usable, security-approved, compliant, professionally approved, attestation-authentic, signature-valid, issuer-trusted, provenance-trusted, reviewer-authored, identity-authentic, current, role-authoritative, approval-effective, handoff-eligible, or admissible.";
const expectedFinalBoundary =
  "This readiness assessment is not actual human review, professional review, legal review, technical review, evidentiary review, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, attestation verification, signature verification, reviewer-authorship verification, issuer-trust verification, provenance verification, identity verification, currentness verification, trusted-time verification, lifecycle-truth determination, professional-qualification verification, reviewer-role verification, reviewer-authority verification, admissibility determination, approval effect, handoff approval, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, ownership determination, chain-of-custody proof, executed-model evidence, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, case-truth conclusion, or real-evidence review.";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  const absolutePath = absolute(relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

function extractSection(text, startHeading, endHeading) {
  const start = text.indexOf(startHeading);
  const end = text.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(start, -1, `missing section ${startHeading}`);
  assert.notEqual(end, -1, `missing section boundary ${endHeading}`);
  return text.slice(start, end);
}

function extractLines(section, pattern) {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => pattern.test(line));
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/gu, " ").trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function listFiles(relativeDirectory, allowedExtensions) {
  const files = [];
  const root = absolute(relativeDirectory);

  if (!fs.existsSync(root)) {
    return files;
  }

  function visit(currentPath) {
    for (const entry of fs.readdirSync(currentPath, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) {
        continue;
      }
      const entryPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        visit(entryPath);
      } else if (allowedExtensions.has(path.extname(entry.name))) {
        files.push(path.relative(repoRoot, entryPath));
      }
    }
  }

  visit(root);
  return files.sort();
}

function findRuntimeReferences(relativeDirectory) {
  const executableExtensions = new Set([
    ".cjs",
    ".cts",
    ".js",
    ".jsx",
    ".json",
    ".mjs",
    ".mts",
    ".svelte",
    ".ts",
    ".tsx",
    ".vue",
  ]);
  const helperModuleBasename =
    "human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator";
  const referencePatterns = [
    new RegExp(`${escapeRegExp(helperExportName)}(?![A-Za-z0-9_$])`, "u"),
    new RegExp(
      `${escapeRegExp(helperModuleBasename)}(?![A-Za-z0-9_-])`,
      "u",
    ),
  ];

  return listFiles(relativeDirectory, executableExtensions).filter(
    (relativePath) =>
      referencePatterns.some((pattern) =>
        pattern.test(readRequired(relativePath)),
      ),
  );
}

function arrayEntries(text, arrayName) {
  const directArrayPattern = new RegExp(
    `const\\s+${escapeRegExp(arrayName)}\\s*=\\s*\\[([\\s\\S]*?)\\];`,
    "u",
  );
  const directMatch = text.match(directArrayPattern);
  if (directMatch !== null) {
    return directMatch[1]
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  const slicePattern = new RegExp(
    `const\\s+${escapeRegExp(arrayName)}\\s*=\\s*([A-Za-z_$][\\w$]*)\\.slice\\((\\d+)\\);`,
    "u",
  );
  const sliceMatch = text.match(slicePattern);
  if (sliceMatch === null) {
    return [];
  }

  return arrayEntries(text, sliceMatch[1]).slice(Number(sliceMatch[2]));
}

function containsExactHelperLiteral(entries) {
  const exactLiteral = new RegExp(
    `^(?:["'\\x60])${escapeRegExp(helperExportName)}(?:["'\\x60])$`,
    "u",
  );
  return entries.some((entry) => exactLiteral.test(entry));
}

function entriesResolveToHelper(text, entries) {
  return entries.some(
    (entry) =>
      containsExactHelperLiteral([entry]) ||
      new RegExp(
        `const\\s+${escapeRegExp(entry)}\\s*=\\s*["'\\x60]${escapeRegExp(helperExportName)}["'\\x60]\\s*;`,
        "u",
      ).test(text),
  );
}

function stripJavaScriptComments(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//gu, "")
    .replace(/^\s*\/\/.*$/gmu, "");
}

function argumentResolvesToHelper(text, argument) {
  if (
    containsExactHelperLiteral([argument]) ||
    new RegExp(
      `const\\s+${escapeRegExp(argument)}\\s*=\\s*["'\\x60]${escapeRegExp(helperExportName)}["'\\x60]\\s*;`,
      "u",
    ).test(text)
  ) {
    return true;
  }

  const loopPattern = new RegExp(
    `for\\s*\\(\\s*const\\s+${escapeRegExp(argument)}\\s+of\\s+(\\[[\\s\\S]*?\\]|[A-Za-z_$][\\w$]*)\\s*\\)`,
    "gu",
  );
  for (const match of text.matchAll(loopPattern)) {
    const iterable = match[1];
    const entries = iterable.startsWith("[")
      ? iterable
          .slice(1, -1)
          .split(",")
          .map((entry) => entry.trim())
      : arrayEntries(text, iterable);
    if (entriesResolveToHelper(text, entries)) {
      return true;
    }
  }

  return false;
}

function hasLivePackageDenialForHelper(text) {
  const executableText = stripJavaScriptComments(text);
  const denialCallPatterns = [
    /^\s*assert\.(?:equal|strictEqual)\(\s*Object\.hasOwn\(\s*packageSchemas\s*,\s*([A-Za-z_$][\w$]*|["'][^"']+["'])\s*\)\s*,\s*false(?:\s*,|\s*\))/gmu,
    /^\s*assert\.(?:equal|strictEqual)\(\s*hasExactIdentifier\(\s*packageIndexText\s*,\s*([A-Za-z_$][\w$]*|["'][^"']+["'])\s*\)\s*,\s*false(?:\s*,|\s*\))/gmu,
  ];

  return denialCallPatterns.some((callPattern) =>
    [...executableText.matchAll(callPattern)].some((match) =>
      argumentResolvesToHelper(executableText, match[1]),
    ),
  );
}

function discoverLiveHelperDenialProofs() {
  const testFiles = listFiles("tests", new Set([".js"]));
  return testFiles.filter(
    (relativePath) =>
      relativePath !== proofPath &&
      hasLivePackageDenialForHelper(readRequired(relativePath)),
  );
}

function runScaffoldProof(packageExportInjected) {
  const setup = packageExportInjected
    ? `const packageSchemas = require(${JSON.stringify(absolute("packages/schemas/src/index.js"))});
const helperModule = require(${JSON.stringify(absolute(helperPath))});
packageSchemas[${JSON.stringify(helperExportName)}] = helperModule[${JSON.stringify(helperExportName)}];`
    : "";

  return spawnSync(
    process.execPath,
    ["-e", `${setup}\nrequire(${JSON.stringify(absolute(scaffoldProofPath))});`],
    {
      cwd: repoRoot,
      encoding: "utf8",
      timeout: 30000,
    },
  );
}

test("decision-attestation validator package-export readiness boundary and exact sources exist", () => {
  const docsText = readRequired(docsPath);
  const section = extractSection(
    docsText,
    "## 2. Canonical Sources",
    "## 3. Current Tracked Facts",
  );

  for (const sourcePath of [
    ...controllingPaths,
    "packages/schemas/src/index.js",
    ...denialProofPaths,
  ]) {
    readRequired(sourcePath);
  }

  assert.deepEqual(extractLines(section, /^-/u), expectedSourceBullets);
  const historicalCurrentDistinction = section.match(
    /Earlier candidate-schema,[\s\S]*?separately scoped package-export slice\./u,
  );
  assert.notEqual(historicalCurrentDistinction, null);
  assert.equal(
    normalizeWhitespace(historicalCurrentDistinction[0]),
    expectedHistoricalCurrentDistinction,
  );
  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_EXPORT_READINESS_ASSESSMENT/u);
});

test("live denial discovery requires executable assertions", () => {
  const directDenial = `assert.equal(Object.hasOwn(packageSchemas, "${helperExportName}"), false);`;
  const identifierDenial = `assert.strictEqual(hasExactIdentifier(packageIndexText, "${helperExportName}"), false);`;

  assert.equal(hasLivePackageDenialForHelper(directDenial), true);
  assert.equal(hasLivePackageDenialForHelper(identifierDenial), true);
  assert.equal(hasLivePackageDenialForHelper(`// ${directDenial}`), false);
  assert.equal(hasLivePackageDenialForHelper(`/* ${identifierDenial} */`), false);
  assert.equal(
    hasLivePackageDenialForHelper(
      `check(Object.hasOwn(packageSchemas, "${helperExportName}"), false);`,
    ),
    false,
  );
});

test("ten current facts freeze the direct unary helper and focused proof posture", () => {
  const docsText = readRequired(docsPath);
  const helperModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js");
  const section = extractSection(
    docsText,
    "## 3. Current Tracked Facts",
    "## 4. Current Package Boundary",
  );

  assert.deepEqual(extractLines(section, /^\|/u), expectedFactTable);
  assert.match(docsText, /CURRENT_PACKAGE_EXPORT_READINESS_FACT_COUNT:\n10/u);
  assert.deepEqual(Object.keys(helperModule), [helperExportName]);
  assert.equal(helperModule[helperExportName].length, 1);
  assert.match(section, /fifteen-field validation/u);
  assert.match(section, /six duplicate participants/u);
  assert.match(section, /five codes, sixteen static paths/u);
  assert.match(section, /accessor safety, non-mutation, recursive freezing/u);
});

test("historical package boundary remains exact while the helper is reference-identical and siblings stay absent", () => {
  const docsText = readRequired(docsPath);
  const packageSchemas = require("../packages/schemas/src/index.js");
  const helperModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js");
  const candidateSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json");
  const resultSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json");
  const packageIndexText = readRequired("packages/schemas/src/index.js");
  const section = extractSection(
    docsText,
    "## 4. Current Package Boundary",
    "## 5. Eight Pre-Existing Denial-Proof Dependencies",
  );

  assert.strictEqual(packageSchemas[currentSchemaExports[0]], candidateSchema);
  assert.strictEqual(packageSchemas[currentSchemaExports[1]], resultSchema);
  assert.deepEqual(extractLines(section, /^-/u), [
    ...currentSchemaExports.map((name) => `- \`${name}\``),
    ...historicalBehaviorExports.map((name) => `- \`${name}\``),
  ]);

  for (const exportName of retainedBehaviorExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
    assert.doesNotMatch(
      packageIndexText,
      new RegExp(`${escapeRegExp(exportName)}(?![A-Za-z0-9_$])`, "u"),
      exportName,
    );
  }
  assert.strictEqual(
    packageSchemas[helperExportName],
    helperModule[helperExportName],
  );

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
});

test("eight historical denials and the scaffold dependency are fully transitioned", () => {
  const docsText = readRequired(docsPath);
  const section = extractSection(
    docsText,
    "## 5. Eight Pre-Existing Denial-Proof Dependencies",
    "## 6. Readiness Matrix",
  );

  assert.equal(denialProofPaths.length, 8);
  assert.deepEqual(extractLines(section, /^\|/u), expectedDenialTable);
  const scaffoldProofExists = fs.existsSync(absolute(scaffoldProofPath));
  assert.deepEqual(discoverLiveHelperDenialProofs(), []);
  for (const denialPath of denialProofPaths) {
    assert.equal(
      hasLivePackageDenialForHelper(readRequired(denialPath)),
      false,
      denialPath,
    );
  }
  if (scaffoldProofExists) {
    const baselineRun = runScaffoldProof(false);
    assert.equal(baselineRun.error, undefined, baselineRun.stderr);
    assert.equal(baselineRun.signal, null, baselineRun.stderr);
    assert.equal(baselineRun.status, 0, baselineRun.stdout + baselineRun.stderr);

    const injectedExportRun = runScaffoldProof(true);
    assert.equal(injectedExportRun.error, undefined, injectedExportRun.stderr);
    assert.equal(injectedExportRun.signal, null, injectedExportRun.stderr);
    assert.equal(
      injectedExportRun.status,
      0,
      injectedExportRun.stdout + injectedExportRun.stderr,
    );
  }

  assert.match(
    docsText,
    /CURRENT_PREEXISTING_PACKAGE_EXPORT_DENIAL_PROOF_COUNT:\n8/u,
  );
  assert.match(
    docsText,
    /READINESS_SLICE_ADDITIONAL_LIVE_DENIAL_PROOF_COUNT:\n1/u,
  );
  assert.match(docsText, /FUTURE_SCAFFOLD_MUST_COUNT_READINESS_PROOF:\nYES/u);
  assert.match(
    section,
    /a scaffold proof that also asserts live\nabsence must count itself separately/u,
  );
  assert.equal(
    docsText.includes("`" + scaffoldProofPath + "`"),
    false,
    "readiness snapshot remains historical and scaffold path stays proof-local",
  );
});

test("no package, app, or worker consumer exists beyond helper publication", () => {
  assert.deepEqual(findRuntimeReferences("packages"), [
    helperPath,
    "packages/schemas/src/index.js",
  ]);
  assert.deepEqual(findRuntimeReferences("apps"), []);
  assert.deepEqual(findRuntimeReferences("workers"), []);
});

test("readiness remains blocked by the complete exact seven-decision matrix", () => {
  const docsText = readRequired(docsPath);
  const readinessSection = extractSection(
    docsText,
    "## 6. Readiness Matrix",
    "## 7. Seven Open Package-Export Scope Decisions",
  );
  const decisionSection = extractSection(
    docsText,
    "## 7. Seven Open Package-Export Scope Decisions",
    "## 8. Smallest Safe Next Slice",
  );

  assert.deepEqual(
    extractLines(readinessSection, /^\|/u),
    expectedReadinessTable,
  );
  assert.deepEqual(
    extractLines(decisionSection, /^\|/u),
    expectedOpenDecisionTable,
  );
  assert.match(
    docsText,
    /VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS:\nBLOCKED_BY_EXACT_SCOPE_DECISIONS/u,
  );
  assert.match(
    docsText,
    /OPEN_VALIDATOR_HELPER_PACKAGE_EXPORT_SCOPE_DECISION_COUNT:\n7/u,
  );
});

test("smallest next slice and exact current two-file scope remain docs-only", () => {
  const docsText = readRequired(docsPath);
  const scopeSection = extractSection(
    docsText,
    "## 9. Exact Current Scope",
    "## 10. Non-Interference Rules",
  );

  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_DOCS_ONLY/u,
  );
  assert.match(docsText, /one `DOCS_ONLY` package-export scaffold-scope/u);
  assert.match(docsText, /If and only if the Owner selects publication/u);
  assert.match(
    docsText,
    /If the Owner selects\ninternal-only retention, no package-export implementation slice is authorized/u,
  );
  assert.match(docsText, /must not modify the package index/u);
  assert.deepEqual(extractLines(scopeSection, /^\d+\./u), expectedCurrentScope);
  assert.match(
    docsText,
    /CURRENT_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_FILE_COUNT:\n2/u,
  );
});

test("complete non-interference and no-conclusion boundaries are frozen", () => {
  const docsText = readRequired(docsPath);
  const rulesSection = extractSection(
    docsText,
    "## 10. Non-Interference Rules",
    "## 11. Proof Boundary",
  );
  const proofSection = extractSection(
    docsText,
    "## 11. Proof Boundary",
    "## 12. Final No-Conclusion Boundary",
  );
  const finalSection = extractSection(
    docsText,
    "## 12. Final No-Conclusion Boundary",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY_STATUS:",
  );

  assert.deepEqual(
    extractLines(rulesSection, /^-/u),
    expectedNonInterferenceRules,
  );
  assert.equal(
    normalizeWhitespace(proofSection.replace("## 11. Proof Boundary", "")),
    expectedProofBoundary,
  );
  assert.equal(
    normalizeWhitespace(
      finalSection.replace("## 12. Final No-Conclusion Boundary", ""),
    ),
    expectedFinalBoundary,
  );

  for (const marker of [
    "EIGHT_PREEXISTING_PACKAGE_EXPORT_DENIAL_PROOFS_IDENTIFIED",
    "READINESS_PROOF_ADDS_ONE_LIVE_DENIAL_FOR_LATER_COUNTING",
    "PACKAGE_EXPORT_NOT_IMPLEMENTATION_READY",
    "EXACT_TWO_FILE_DOCS_ONLY_SCOPE_DEFINED",
    "PACKAGE_INDEX_UNCHANGED_BY_THIS_SLICE",
    "VALIDATOR_BEHAVIOR_UNCHANGED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "ATTESTATION_SIGNATURE_OR_ISSUER_VERIFICATION_NOT_CREATED",
    "REVIEWER_AUTHORSHIP_IDENTITY_ROLE_OR_AUTHORITY_EVALUATION_NOT_CREATED",
    "TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "PERSISTENCE_API_SOURCE_PROVIDER_MODEL_INTEGRATION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_IMPLEMENTATION_CREATED",
    "NO_APPROVAL_OR_SIGN_OFF_CREATED",
    "NO_FINDING_SEVERITY_REMEDIATION_OR_BLOCKER_RESOLUTION_CREATED",
    "NO_SECURITY_OR_VULNERABILITY_FINDING_CREATED",
    "NO_REAL_PRIVATE_OR_SOURCE_MATERIAL_INSPECTION_CREATED",
    "NO_SOURCE_PACKAGE_PDF_IMAGE_SCREENSHOT_OR_METADATA_INSPECTION_CREATED",
    "NO_METADATA_ACQUISITION_CREATED",
    "NO_REAL_PRIVATE_RUN_CREATED",
    "NO_CLOSED_DOMAIN_SEMANTICS_REOPENED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_CERTIFICATION_OR_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_PACKAGE_EXPORT_READINESS_BLOCKED_BY_SCOPE_DECISIONS/u,
  );
  assert.match(docsText, /does not prove that a package export is needed/u);
});
