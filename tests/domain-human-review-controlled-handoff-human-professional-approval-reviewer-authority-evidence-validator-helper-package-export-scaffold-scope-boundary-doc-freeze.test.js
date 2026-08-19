"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-helper-package-export-scaffold-scope-boundary-doc-freeze.test.js";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY_v1.md";
const helperScaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const helperPrerequisitePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json";
const resultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result.json";
const helperPath =
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js";
const helperTestPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const helperExportName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence";
const candidateSchemaExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence";
const resultSchemaExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidatorResult";
const transitionPaths = [
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-package-export.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-package-export.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-helper-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  helperTestPath,
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-helper-package-export-readiness-boundary-doc-freeze.test.js",
  proofPath,
];
const dedicatedProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-package-export.test.js";
const futurePaths = [packageIndexPath, ...transitionPaths, dedicatedProofPath];
const retainedSiblingDenials = [
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidator",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidatorRegistry",
];
const controllingPaths = [
  readinessPath,
  helperScaffoldPath,
  helperPrerequisitePath,
  candidateSchemaPath,
  resultSchemaPath,
  helperPath,
  helperTestPath,
  packageIndexPath,
];
const expectedTransitionTable = [
  "| Position | Existing test path | Exact permitted transition |",
  "| --- | --- | --- |",
  `| 1 | \`${transitionPaths[0]}\` | remove only the exact helper function from the behavior-sibling denylist; retain the three siblings and all candidate-schema proof |`,
  `| 2 | \`${transitionPaths[1]}\` | preserve historical candidate-schema scope; narrow only current helper absence and retain three sibling denials |`,
  `| 3 | \`${transitionPaths[2]}\` | remove only the exact helper function from the behavior-sibling denylist; retain the three siblings and all result-schema proof |`,
  `| 4 | \`${transitionPaths[3]}\` | preserve historical result-schema scope; narrow only current helper absence and retain three sibling denials |`,
  `| 5 | \`${transitionPaths[4]}\` | preserve historical four-name documentation assertions; narrow current absence to three siblings and prove strict helper/package reference equality |`,
  `| 6 | \`${transitionPaths[5]}\` | preserve helper scaffold history and behavior proof; narrow current absence to three siblings and prove strict helper/package reference equality |`,
  `| 7 | \`${transitionPaths[6]}\` | preserve historical proof-transition posture; narrow only current helper absence to three siblings and prove strict helper/package reference equality |`,
  `| 8 | \`${transitionPaths[7]}\` | preserve every validator behavior case; replace only package absence and source denial with strict reference equality and exact static export assertions |`,
  `| 9 | \`${transitionPaths[8]}\` | preserve the historical eight-proof readiness inventory; transition its current live denial and pre-export differential check to strict equality plus three retained sibling denials |`,
  `| 10 | \`${transitionPaths[9]}\` | preserve all selected scaffold semantics; replace only its live package-absence assertion with strict helper/package reference equality |`,
];
const expectedIndexEditInstructions = [
  `1. append one static destructured CommonJS binding for \`${helperExportName}\` from \`./human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js\` to the existing line that binds \`${candidateSchemaExportName}\` and \`${resultSchemaExportName}\``,
  `2. append one direct \`module.exports.${helperExportName} = ${helperExportName}\` assignment to the existing line that exports those two reviewer-authority schema objects`,
];
const expectedFutureTable = [
  "| Position | Future path | Future action |",
  "| --- | --- | --- |",
  `| 1 | \`${futurePaths[0]}\` | add the exact static helper binding and direct export assignment |`,
  `| 2 | \`${futurePaths[1]}\` | narrow one superseded helper-function denial |`,
  `| 3 | \`${futurePaths[2]}\` | preserve historical candidate-schema scope while aligning live package assertions |`,
  `| 4 | \`${futurePaths[3]}\` | narrow one superseded helper-function denial |`,
  `| 5 | \`${futurePaths[4]}\` | preserve historical result-schema scope while aligning live package assertions |`,
  `| 6 | \`${futurePaths[5]}\` | preserve readiness history while aligning live package assertions |`,
  `| 7 | \`${futurePaths[6]}\` | preserve helper-scaffold history while aligning live package assertions |`,
  `| 8 | \`${futurePaths[7]}\` | preserve transition history while aligning live package assertions |`,
  `| 9 | \`${futurePaths[8]}\` | preserve helper behavior and prove exact package identity |`,
  `| 10 | \`${futurePaths[9]}\` | preserve package-readiness history while aligning its live denial proof |`,
  `| 11 | \`${futurePaths[10]}\` | preserve this selected scaffold while aligning its live denial proof |`,
  `| 12 | \`${futurePaths[11]}\` | create dedicated reference-identity and non-interference package-export proof |`,
];
const expectedDownstreamTable = [
  "| Adjacent surface | Status in future package-export slice |",
  "| --- | --- |",
  "| direct helper behavior | `PRESERVE_EXISTING_UNCHANGED` |",
  "| candidate and result schemas | `PRESERVE_EXISTING_UNCHANGED` |",
  "| registry, lookup, or validator dispatch | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| cross-reference or admissibility checkpoint | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| identity, currentness, qualification, role, or authority evaluation | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| approval effect, handoff, delivery, or release | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| persistence or database use | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| API or route use | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| source, provider, or model execution | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| real/private/source material processing | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| product candidate or external use | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
];
const expectedResolvedTable = [
  "| Position | Readiness decision | Selected scoped answer |",
  "| --- | --- | --- |",
  "| 1 | publish or remain internal | publish the existing helper through the owning schemas package |",
  "| 2 | symbol and identity | exact existing unary function, strict reference equality, no wrapper or alias |",
  "| 3 | package-index edit | two additive same-line edits preserving `13165` lines and existing order |",
  "| 4 | denial transitions | exact ten live proof transitions in Section 6 |",
  "| 5 | file set | exact twelve files in Section 8 |",
  "| 6 | proof claims | bounded package identity and non-interference proof only |",
  "| 7 | downstream exclusion | no consumer, dispatch, checkpoint, persistence, API, provider, model, approval-effect, handoff, release, product, or external-use behavior |",
];
const expectedCurrentScope = [
  `1. \`${docsPath}\``,
  `2. \`${proofPath}\``,
];
const expectedNonInterferenceRules = [
  "- preserve all tracked historical docs and both JSON schemas unchanged",
  "- preserve helper source and every existing validator behavior case unchanged",
  "- preserve both existing schema-object package exports and all other package exports unchanged",
  "- modify no package index or existing proof in this docs-only scaffold slice",
  "- create no package export in this docs-only scaffold slice",
  "- future implementation may touch no file outside the exact twelve-file scope in Section 8",
  "- add no wrapper, adapter, alias, getter, factory, validator object, registry, lookup, dispatch, consumer, checkpoint, persistence, API, route, provider, model, prompt, response, logging, telemetry, scoring, finding, conclusion, approval, approval effect, handoff, delivery, release, or readiness behavior",
  "- create no identity verification, currentness evaluation, professional-qualification evaluation, reviewer-role evaluation, reviewer-authority evaluation, reference-resolution behavior, or admissibility decision",
  "- create no approval, sign-off, certification, legal or evidentiary conclusion, severity, remediation, blocker resolution, product candidate, or external-use authorization",
  "- inspect no raw, private, source, source-package, case, identity, authorship, credential, PDF, image, screenshot, metadata, or real-evidence material; acquire no metadata; execute no real private run",
  "- reopen no closed reviewer authority contract, error-path, schema, export, validator, approval, cross-reference, or admissibility semantics; preserve human/professional review as the release gate",
];
const expectedFinalBoundary =
  "This scaffold-scope boundary is not actual human review, professional review, legal review, technical review, evidentiary review, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, identity verification, currentness verification, professional-qualification verification, reviewer-role verification, reviewer-authority verification, admissibility determination, approval effect, handoff approval, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, ownership determination, chain-of-custody proof, executed-model evidence, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, case-truth conclusion, or real-evidence review.";
const expectedProofBoundary =
  "The focused proof for this docs-only slice may prove only that the seven Owner-selected package-export scope decisions, exact twelve-file future scope, ten denial transitions, three retained denials, exact direct unary helper, reference-identity rule, line-count rule, current live package absence, proof limits, exact current two-file scope, and downstream exclusions are frozen. It does not prove that the package export exists, is integrated, is consumed, or is ready for release, product use, or external use.";

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

function extractMarkdownList(section) {
  const items = [];
  let inList = false;

  for (const rawLine of section.split("\n")) {
    const line = rawLine.trim();
    if (line.startsWith("- ")) {
      items.push(line);
      inList = true;
    } else if (inList && line === "") {
      break;
    } else if (inList && !line.startsWith("## ")) {
      items[items.length - 1] += ` ${line}`;
    }
  }

  return items;
}

function extractNumberedList(section) {
  const items = [];
  let inList = false;

  for (const rawLine of section.split("\n")) {
    const line = rawLine.trim();
    if (/^\d+\. /u.test(line)) {
      items.push(line);
      inList = true;
    } else if (inList && line === "") {
      break;
    } else if (inList && !line.startsWith("## ")) {
      items[items.length - 1] += ` ${line}`;
    }
  }

  return items;
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/gu, " ").trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function listFiles(relativeDirectory, allowedExtensions) {
  const root = absolute(relativeDirectory);
  const files = [];

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
    "human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator";
  const patterns = [
    new RegExp(`${escapeRegExp(helperExportName)}(?![A-Za-z0-9_$])`, "u"),
    new RegExp(
      `${escapeRegExp(helperModuleBasename)}(?![A-Za-z0-9_-])`,
      "u",
    ),
  ];

  return listFiles(relativeDirectory, executableExtensions).filter((filePath) => {
    const source = fs.readFileSync(absolute(filePath), "utf8");
    return patterns.some((pattern) => pattern.test(source));
  });
}

test("reviewer-authority validator package-export scaffold and exact sources exist", () => {
  const docsText = readRequired(docsPath);
  const sourceSection = extractSection(
    docsText,
    "## 2. Canonical Sources",
    "## 3. Decision 1: Publish The Existing Helper",
  );

  for (const sourcePath of [...controllingPaths, ...transitionPaths]) {
    readRequired(sourcePath);
  }
  assert.deepEqual(
    extractLines(sourceSection, /^-/u),
    [...controllingPaths, ...transitionPaths].map(
      (sourcePath) => `- \`${sourcePath}\``,
    ),
  );
  for (const marker of [
    "DOCS_ONLY",
    "APPEND_ONLY_PACKAGE_EXPORT_SCOPE",
    "OWNER_SELECTED_STAGES_1_TO_7_OPTION_A",
    "SEVEN_PACKAGE_EXPORT_SCOPE_DECISIONS_RESOLVED",
    "EXACT_TWELVE_FILE_CONTRACT_ONLY_SCOPE_DEFINED",
    "TEN_DENIAL_PROOF_TRANSITIONS_DEFINED",
    "READINESS_PROOF_TRANSITION_COUNTED",
    "SCAFFOLD_SELF_DENIAL_COUNTED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("historical pre-export boundary and current direct unary package identity remain exact", () => {
  const docsText = readRequired(docsPath);
  const helperModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const candidateSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json");
  const resultSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result.json");

  assert.deepEqual(Object.keys(helperModule), [helperExportName]);
  assert.equal(typeof helperModule[helperExportName], "function");
  assert.equal(helperModule[helperExportName].length, 1);
  assert.strictEqual(packageSchemas[candidateSchemaExportName], candidateSchema);
  assert.strictEqual(packageSchemas[resultSchemaExportName], resultSchema);
  assert.strictEqual(
    packageSchemas[helperExportName],
    helperModule[helperExportName],
  );
  for (const sibling of retainedSiblingDenials) {
    assert.equal(Object.hasOwn(packageSchemas, sibling), false, sibling);
  }

  assert.match(docsText, /FUTURE_PACKAGE_VALIDATOR_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_PACKAGE_VALIDATOR_FUNCTION_ARITY:\n1/u);
  assert.match(
    docsText,
    /FUTURE_PACKAGE_VALIDATOR_REFERENCE_IDENTITY:\nSTRICT_EQUAL_TO_DIRECT_MODULE_EXPORT/u,
  );
});

test("exact two same-line index edits are present on the preserved baseline", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired(packageIndexPath);
  const indexLines = packageIndexText.split("\n");
  const section = extractSection(
    docsText,
    "## 5. Decision 3: Exact Package-Index Edit",
    "## 6. Decision 4: Exact Ten Denial-Proof Transitions",
  );

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(section, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(section, /PACKAGE_INDEX_STATIC_BINDING_ANCHOR_LINE:\n13141/u);
  assert.match(section, /PACKAGE_INDEX_DIRECT_EXPORT_ANCHOR_LINE:\n13163/u);
  assert.equal(indexLines[13140].includes(candidateSchemaExportName), true);
  assert.equal(indexLines[13140].includes(resultSchemaExportName), true);
  assert.equal(indexLines[13162].includes(candidateSchemaExportName), true);
  assert.equal(indexLines[13162].includes(resultSchemaExportName), true);
  const helperOccurrences =
    packageIndexText.match(
      new RegExp(`\\b${escapeRegExp(helperExportName)}\\b`, "gu"),
    ) ?? [];
  assert.equal(helperOccurrences.length, 3);
  assert.match(
    packageIndexText,
    /\{ validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence \} = require\("\.\/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator\.js"\)/u,
  );
  assert.match(
    packageIndexText,
    /module\.exports\.validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence = validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence/u,
  );
  assert.match(section, /exactly two additive same-line edits/u);
  assert.deepEqual(extractNumberedList(section), expectedIndexEditInstructions);
  assert.match(
    section,
    /FUTURE_PACKAGE_INDEX_VALIDATOR_SYMBOL_OCCURRENCE_COUNT:\n3/u,
  );
});

test("complete ten-path transition contract retains three sibling denials", () => {
  const docsText = readRequired(docsPath);
  const transitionSection = extractSection(
    docsText,
    "## 6. Decision 4: Exact Ten Denial-Proof Transitions",
    "## 7. Retained Behavior-Sibling Denials",
  );
  const denialSection = extractSection(
    docsText,
    "## 7. Retained Behavior-Sibling Denials",
    "## 8. Decision 5: Exact Future Twelve-File Scope",
  );

  assert.equal(transitionPaths.length, 10);
  assert.deepEqual(extractLines(transitionSection, /^\|/u), expectedTransitionTable);
  assert.match(
    transitionSection,
    /FUTURE_PACKAGE_EXPORT_DENIAL_TRANSITION_COUNT:\n10/u,
  );
  assert.deepEqual(
    extractLines(denialSection, /^-/u),
    retainedSiblingDenials.map((name) => `- \`${name}\``),
  );
  assert.match(
    denialSection,
    /RETAINED_PACKAGE_BEHAVIOR_SIBLING_DENIAL_COUNT:\n3/u,
  );
});

test("future contract-only implementation is exactly twelve files", () => {
  const docsText = readRequired(docsPath);
  const section = extractSection(
    docsText,
    "## 8. Decision 5: Exact Future Twelve-File Scope",
    "## 9. Decision 6: Exact Future Proof Claims",
  );

  assert.equal(futurePaths.length, 12);
  assert.deepEqual(extractLines(section, /^\|/u), expectedFutureTable);
  assert.match(section, /FUTURE_PACKAGE_EXPORT_FILE_COUNT:\n12/u);
  assert.match(
    section,
    /must not modify the helper module, either JSON schema, any\ndocs file, any other test, or any consumer\/runtime file/u,
  );
});

test("future proof claims and complete downstream exclusions are bounded", () => {
  const docsText = readRequired(docsPath);
  const proofSection = extractSection(
    docsText,
    "## 9. Decision 6: Exact Future Proof Claims",
    "## 10. Decision 7: Exact Downstream Exclusion",
  );
  const downstreamSection = extractSection(
    docsText,
    "## 10. Decision 7: Exact Downstream Exclusion",
    "## 11. Resolved Decisions",
  );

  assert.deepEqual(
    extractMarkdownList(proofSection),
    [
      "- the package index exposes the exact unary function",
      "- the package export is strictly reference-equal to the direct module export",
      "- the direct module still exposes exactly one property",
      "- the package-index source contains one exact static destructured binding and one exact direct export assignment while preserving its baseline line count",
      "- both existing schema-object exports remain strictly identical to their tracked JSON schema objects",
      "- the three retained behavior-sibling names remain absent",
      "- the ten superseded live absence assertions are narrowed exactly as scoped",
      "- all existing validator behavior cases remain green",
      "- no package, app, or worker consumer exists beyond the helper module and the package-index publication surface",
      "- no wrapper, alias, registry, lookup, dispatch, checkpoint, persistence, API, provider, model, logging, telemetry, approval-effect, handoff, delivery, release, product, or external-use behavior is created",
    ],
  );
  assert.deepEqual(
    extractLines(downstreamSection, /^\|/u),
    expectedDownstreamTable,
  );
});

test("all seven Owner decisions and exact current scope are frozen", () => {
  const docsText = readRequired(docsPath);
  const resolvedSection = extractSection(
    docsText,
    "## 11. Resolved Decisions",
    "## 12. Exact Current Scope",
  );
  const currentScopeSection = extractSection(
    docsText,
    "## 12. Exact Current Scope",
    "## 13. Non-Interference Rules",
  );

  assert.deepEqual(extractLines(resolvedSection, /^\|/u), expectedResolvedTable);
  assert.match(
    resolvedSection,
    /RESOLVED_VALIDATOR_HELPER_PACKAGE_EXPORT_SCOPE_DECISION_COUNT:\n7/u,
  );
  assert.deepEqual(
    extractLines(currentScopeSection, /^\d+\./u),
    expectedCurrentScope,
  );
  assert.match(
    currentScopeSection,
    /CURRENT_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u,
  );
});

test("no package, app, or worker consumer exists beyond helper publication", () => {
  assert.deepEqual(findRuntimeReferences("packages"), [helperPath, packageIndexPath]);
  assert.deepEqual(findRuntimeReferences("apps"), []);
  assert.deepEqual(findRuntimeReferences("workers"), []);
});

test("complete non-interference and final no-conclusion boundary remain exact", () => {
  const docsText = readRequired(docsPath);
  const nonInterferenceSection = extractSection(
    docsText,
    "## 13. Non-Interference Rules",
    "## 14. Proof Boundary For This Slice",
  );
  const proofBoundarySection = extractSection(
    docsText,
    "## 14. Proof Boundary For This Slice",
    "## 15. Final No-Conclusion Boundary",
  );
  const finalSection = docsText.slice(
    docsText.indexOf("## 15. Final No-Conclusion Boundary"),
  );
  const finalParagraph = finalSection.slice(
    finalSection.indexOf("\n\n") + 2,
    finalSection.indexOf(
      "\n\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_STATUS:",
    ),
  );

  assert.deepEqual(
    extractMarkdownList(nonInterferenceSection),
    expectedNonInterferenceRules,
  );
  assert.equal(
    normalizeWhitespace(
      proofBoundarySection.replace(
        "## 14. Proof Boundary For This Slice",
        "",
      ),
    ),
    expectedProofBoundary,
  );
  assert.equal(normalizeWhitespace(finalParagraph), expectedFinalBoundary);
  for (const marker of [
    "PACKAGE_INDEX_UNCHANGED_BY_THIS_SLICE",
    "PACKAGE_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATOR_BEHAVIOR_UNCHANGED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "IDENTITY_CURRENTNESS_ROLE_OR_AUTHORITY_EVALUATION_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_IMPLEMENTATION_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_REFERENCE_EQUIVALENT_PACKAGE_EXPORT_SCOPE_DEFINED/u,
  );
  assert.match(
    docsText,
    /none from this boundary; exact contract-only package export remains a separate slice/u,
  );
});
