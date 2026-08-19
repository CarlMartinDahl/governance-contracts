"use strict";

const assert = require("node:assert/strict");
const childProcess = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { fileURLToPath, pathToFileURL } = require("node:url");
const vm = require("node:vm");

const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const scaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const scaffoldProofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-helper-scaffold-scope-boundary-doc-freeze.test.js";
const transitionStatus =
  "LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE";
const historicalHelperPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
];
const alignedTestTransitions = [
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-contract-boundary-doc-freeze.test.js",
    historicalPathReferenceCounts: [3, 3],
    expectedExecutedTransitionReads: 2,
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
    historicalPathReferenceCounts: [1, 1],
    expectedExecutedTransitionReads: 2,
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
    historicalPathReferenceCounts: [2, 2],
    expectedExecutedTransitionReads: 2,
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
    historicalPathReferenceCounts: [1, 1],
    expectedExecutedTransitionReads: 2,
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-helper-readiness-boundary-doc-freeze.test.js",
    historicalPathReferenceCounts: [1, 1],
    expectedExecutedTransitionReads: 2,
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
    historicalPathReferenceCounts: [1, 1],
    expectedExecutedTransitionReads: 2,
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
    historicalPathReferenceCounts: [1, 1],
    expectedExecutedTransitionReads: 2,
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
    historicalPathReferenceCounts: [2, 2],
    expectedExecutedTransitionReads: 14,
  },
  {
    path: "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js",
    historicalPathReferenceCounts: [1, 1],
    expectedExecutedTransitionReads: 2,
  },
  {
    path: "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js",
    historicalPathReferenceCounts: [2, 2],
    expectedExecutedTransitionReads: 2,
  },
];
const historicalValidatorExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidatorRegistry",
];
const validatorHelperExportName = historicalValidatorExports[1];
const retainedValidatorExports = historicalValidatorExports.filter(
  (name) => name !== validatorHelperExportName,
);
const expectedReservedPathRows = historicalHelperPaths.map(
  (helperPath, index) =>
    "| " +
    (index + 1) +
    " | `" +
    helperPath +
    "` | `" +
    transitionStatus +
    "` |",
);
const expectedAssertionSiteRows = [
  "| 1 | `" + alignedTestTransitions[0].path + "` | `retainedValidatorPaths` | 2 |",
  "| 2 | `" + alignedTestTransitions[1].path + "` | `retainedValidatorPaths` | 2 |",
  "| 3 | `" + alignedTestTransitions[2].path + "` | `retainedValidatorSiblingPaths` | 2 |",
  "| 4 | `" + alignedTestTransitions[3].path + "` | `retainedValidatorSurfaces` | 2 |",
  "| 5 | `" + alignedTestTransitions[4].path + "` | `[validatorPath, validatorProofPath]` | 2 |",
  "| 6 | `" + alignedTestTransitions[5].path + "` | `retainedValidatorPaths` | 2 |",
  "| 7 | `" + alignedTestTransitions[6].path + "` | `retainedValidatorPaths` | 2 |",
  "| 8 | `" + alignedTestTransitions[7].path + "` | five-binding cross-monitor site | 10 |",
  "| 9 | `" + alignedTestTransitions[7].path + "` | first direct `retainedValidatorPaths` site | 2 |",
  "| 10 | `" + alignedTestTransitions[7].path + "` | second direct `retainedValidatorPaths` site | 2 |",
  "| 11 | `" + alignedTestTransitions[8].path + "` | `retainedValidatorSiblingPaths` | 2 |",
  "| 12 | `" + alignedTestTransitions[9].path + "` | `retainedValidatorPaths` | 2 |",
];
const expectedFileScopeRows = [
  "| 1 | `" + docsPath + "` | add this bounded transition record |",
  "| 2 | `" + proofPath + "` | add focused transition proof |",
  "| 3 | `" + alignedTestTransitions[0].path + "` | transition one two-path live absence assertion site |",
  "| 4 | `" + alignedTestTransitions[1].path + "` | transition one two-path live absence assertion site |",
  "| 5 | `" + alignedTestTransitions[2].path + "` | transition one two-path live absence assertion site |",
  "| 6 | `" + alignedTestTransitions[3].path + "` | transition one two-path live absence assertion site |",
  "| 7 | `" + alignedTestTransitions[4].path + "` | transition one two-path live absence assertion site |",
  "| 8 | `" + alignedTestTransitions[5].path + "` | transition one two-path live absence assertion site |",
  "| 9 | `" + alignedTestTransitions[6].path + "` | transition one two-path live absence assertion site and its source-operand expectation |",
  "| 10 | `" + alignedTestTransitions[7].path + "` | transition one five-binding cross-monitor site and two direct two-path sites |",
  "| 11 | `" + alignedTestTransitions[8].path + "` | transition one two-path live absence assertion site |",
  "| 12 | `" + alignedTestTransitions[9].path + "` | transition one two-path live absence assertion site |",
];
const expectedRetainedBoundaries = [
  "attestation occurrence, signature existence or validity, issuer or provenance trust, reviewer authorship, and identity authenticity",
  "reviewer currentness, professional qualification, role, credentials, delegation, authority, and reviewer-evidence relationship evaluation",
  "trusted time, freshness, expiry, revocation truth, lifecycle truth, reference existence, equality, resolution, and supersession",
  "cross-reference semantics, admissibility, approval effect, current-record selection, and handoff eligibility",
  "export, delivery, release, persistence, audit, API, route, UI, source or metadata acquisition, provider, model, and product behavior",
];
const expectedNonInterferenceRules = [
  "preserve all canonical docs and schemas unchanged",
  "preserve historical absence statements, path rows, and status markers as historical facts",
  "transition only twelve live assertion sites, thirty-two helper/test filesystem-absence checks, and the five bounded cross-monitor bindings",
  "preserve every non-helper assertion in all ten aligned proof files",
  "preserve all cross-reference, admissibility, attestation, signature, issuer-trust, reviewer-authorship, identity, currentness, role, authority, trusted-time, lifecycle-truth, approval-effect, handoff, delivery, release, and other sibling boundaries",
  "preserve all package-export denials and the 13165-line package index",
  "create no implementation, helper, validator export, dispatch, registry, checkpoint, resolver, approval effect, handoff decision, persistence, API, route, source or metadata acquisition, provider, model, logging, telemetry, or runtime behavior",
  "inspect no raw, private, source, package, PDF, image, screenshot, case, identity-provider, credential, signature, certificate, authorship, metadata, or real-evidence material",
  "create no approval, sign-off, finding, severity, remediation, blocker resolution, security finding, vulnerability finding, certification, product candidate, readiness claim, or external-use authority",
  "perform no real private run, reopen no closed domain semantics, and preserve human/professional review as the release gate",
];
const originalExistsSync = fs.existsSync;
const proofFuturePathExistsCalls = [];

function normalizeFsPath(inputPath) {
  if (typeof inputPath === "string") {
    return path.resolve(inputPath);
  }
  if (ArrayBuffer.isView(inputPath)) {
    return path.resolve(
      Buffer.from(
        inputPath.buffer,
        inputPath.byteOffset,
        inputPath.byteLength,
      ).toString("utf8"),
    );
  }
  if (inputPath instanceof URL) {
    return path.resolve(fileURLToPath(inputPath));
  }
  return null;
}

fs.existsSync = function trackedExistsSync(inputPath) {
  const result = originalExistsSync.call(this, inputPath);
  const normalizedInputPath = normalizeFsPath(inputPath);
  if (
    normalizedInputPath !== null &&
    historicalHelperPaths
      .map((relativePath) => path.join(repoRoot, relativePath))
      .includes(normalizedInputPath)
  ) {
    proofFuturePathExistsCalls.push({
      path: normalizedInputPath,
      result,
    });
  }
  return result;
};

test.after(() => {
  fs.existsSync = originalExistsSync;
  assert.deepEqual(proofFuturePathExistsCalls, []);
});

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(text, start, end) {
  const startIndex = text.indexOf(start);
  const endIndex = text.indexOf(end, startIndex + start.length);
  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return text.slice(startIndex, endIndex);
}

function tableDataRows(section) {
  return section.split("\n").filter((line) => /^\| \d+ \|/u.test(line));
}

function numberedInlineCodeItems(section) {
  return section
    .split("\n")
    .filter((line) => /^\d+\. `[^`]+`$/u.test(line))
    .map((line) => line.replace(/^\d+\. `|`$/gu, ""));
}

function numberedProseItems(section) {
  const items = [];
  for (const line of section.split("\n")) {
    const start = line.match(/^\d+\. (.+)$/u);
    if (start) {
      items.push(start[1]);
    } else if (items.length > 0 && /^ {3}\S/u.test(line)) {
      items[items.length - 1] += " " + line.trim();
    }
  }
  return items;
}

function countOccurrences(source, fragment) {
  return source.split(fragment).length - 1;
}

function executedTrackedPathCalls(relativePath) {
  const tempDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "decision-attestation-helper-transition-"),
  );
  const preloadPath = path.join(tempDirectory, "track-exists.js");
  const callsPath = path.join(tempDirectory, "calls.json");
  const preloadSource =
    '"use strict";\n' +
    'const fs = require("node:fs");\n' +
    'const path = require("node:path");\n' +
    'const { fileURLToPath } = require("node:url");\n' +
    normalizeFsPath.toString() +
    "\n" +
    "const originalExistsSync = fs.existsSync;\n" +
    "const originalReadFileSync = fs.readFileSync;\n" +
    "const existsCalls = [];\n" +
    "const readCalls = [];\n" +
    "fs.existsSync = function trackedExistsSync(inputPath) {\n" +
    "  const result = originalExistsSync.call(this, inputPath);\n" +
    "  const normalizedInputPath = normalizeFsPath(inputPath);\n" +
    "  if (normalizedInputPath !== null) {\n" +
    "    existsCalls.push({ path: normalizedInputPath, result });\n" +
    "  }\n" +
    "  return result;\n" +
    "};\n" +
    "fs.readFileSync = function trackedReadFileSync(inputPath, ...args) {\n" +
    "  const normalizedInputPath = normalizeFsPath(inputPath);\n" +
    "  const result = originalReadFileSync.call(this, inputPath, ...args);\n" +
    "  if (normalizedInputPath !== null) {\n" +
    "    readCalls.push(normalizedInputPath);\n" +
    "  }\n" +
    "  return result;\n" +
    "};\n" +
    "process.on(\"exit\", () => {\n" +
    "  fs.appendFileSync(process.env.EXISTS_CALL_LOG, JSON.stringify({ existsCalls, readCalls }) + \"\\n\");\n" +
    "});\n";

  try {
    fs.writeFileSync(preloadPath, preloadSource, "utf8");
    const child = childProcess.spawnSync(
      process.execPath,
      ["--require", preloadPath, absolute(relativePath)],
      {
        cwd: repoRoot,
        encoding: "utf8",
        env: {
          ...process.env,
          EXISTS_CALL_LOG: callsPath,
        },
        maxBuffer: 64 * 1024 * 1024,
      },
    );
    assert.equal(
      child.status,
      0,
      relativePath + "\n" + child.stdout + "\n" + child.stderr,
    );
    const records = fs
      .readFileSync(callsPath, "utf8")
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));
    const existsCalls = records.flatMap((record) => record.existsCalls);
    const readCalls = records.flatMap((record) => record.readCalls);
    const exactFuturePaths = new Set(
      historicalHelperPaths.map((helperPath) => absolute(helperPath)),
    );
    return {
      futurePathCalls: existsCalls.filter((call) =>
        exactFuturePaths.has(call.path),
      ),
      transitionReadCount: readCalls.filter(
        (readPath) => readPath === absolute(docsPath),
      ).length,
    };
  } finally {
    fs.rmSync(tempDirectory, { recursive: true, force: true });
  }
}

test("transition boundary, scaffold source, and scope identity are exact", () => {
  const docsText = readRequired(docsPath);
  readRequired(scaffoldPath);
  readRequired(scaffoldProofPath);

  for (const helperPath of historicalHelperPaths) {
    const absoluteHelperPath = absolute(helperPath);
    assert.equal(normalizeFsPath(absoluteHelperPath), absoluteHelperPath);
    assert.equal(
      normalizeFsPath(Buffer.from(absoluteHelperPath, "utf8")),
      absoluteHelperPath,
    );
    assert.equal(
      normalizeFsPath(
        new Uint8Array(Buffer.from(absoluteHelperPath, "utf8")),
      ),
      absoluteHelperPath,
    );
    const crossRealmUint8Array = vm.runInNewContext(
      "Uint8Array.from(pathBytes)",
      {
        pathBytes: Array.from(Buffer.from(absoluteHelperPath, "utf8")),
      },
    );
    assert.equal(crossRealmUint8Array instanceof Uint8Array, false);
    assert.equal(normalizeFsPath(crossRealmUint8Array), absoluteHelperPath);
    assert.equal(
      normalizeFsPath(pathToFileURL(absoluteHelperPath)),
      absoluteHelperPath,
    );
  }
  assert.equal(docsText.includes("`" + scaffoldPath + "`"), true);
  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_PROOF_TRANSITION_PREREQUISITE",
    "EXACT_TWELVE_FILE_ALIGNMENT_SCOPE",
    "TEN_HISTORICAL_PROOF_FILES_ALIGNED",
    "TWELVE_LIVE_ASSERTION_SITES_TRANSITIONED",
    "THIRTY_TWO_LIVE_HELPER_PATH_ABSENCE_CHECKS_TRANSITIONED",
    "FIVE_CROSS_MONITOR_BINDINGS_TRANSITIONED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("historical proof inventory and reserved path statuses are complete", () => {
  const docsText = readRequired(docsPath);
  const inventory = sectionBetween(
    docsText,
    "The historical proof files being aligned",
    "HISTORICAL_PROOF_FILE_ALIGNMENT_COUNT:",
  );
  const reserved = sectionBetween(docsText, "## 3.", "## 4.");

  assert.deepEqual(
    numberedInlineCodeItems(inventory),
    alignedTestTransitions.map((item) => item.path),
  );
  assert.match(docsText, /HISTORICAL_PROOF_FILE_ALIGNMENT_COUNT:\n10/u);
  assert.deepEqual(tableDataRows(reserved), expectedReservedPathRows);
  assert.match(docsText, /VALIDATOR_HELPER_RESERVED_PATH_COUNT:\n2/u);
});

test("twelve exact sites, thirty-two checks, and five bindings are frozen", () => {
  const docsText = readRequired(docsPath);
  const transitionSection = sectionBetween(docsText, "## 4.", "## 5.");

  assert.deepEqual(tableDataRows(transitionSection), expectedAssertionSiteRows);
  assert.equal(
    expectedAssertionSiteRows
      .map((row) => Number(row.match(/\| (\d+) \|$/u)[1]))
      .reduce((sum, count) => sum + count, 0),
    32,
  );
  assert.match(
    docsText,
    /VALIDATOR_HELPER_LIVE_ASSERTION_SITE_TRANSITION_COUNT:\n12/u,
  );
  assert.match(
    docsText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_CHECK_TRANSITION_COUNT:\n32/u,
  );
  assert.match(
    docsText,
    /VALIDATOR_HELPER_CROSS_MONITOR_BINDING_TRANSITION_COUNT:\n5/u,
  );
});

test("aligned proofs execute every transition anchor and no future-path probe", () => {
  let executedFutureCallCount = 0;
  let executedTransitionReadCount = 0;

  for (const transition of alignedTestTransitions) {
    const source = readRequired(transition.path);
    assert.equal(countOccurrences(source, docsPath), 1, transition.path);
    assert.equal(countOccurrences(source, transitionStatus), 1, transition.path);
    for (const [index, helperPath] of historicalHelperPaths.entries()) {
      assert.equal(
        countOccurrences(source, helperPath),
        transition.historicalPathReferenceCounts[index],
        transition.path + ": " + helperPath,
      );
    }
    const trackedCalls = executedTrackedPathCalls(transition.path);
    assert.deepEqual(trackedCalls.futurePathCalls, [], transition.path);
    assert.equal(
      trackedCalls.transitionReadCount,
      transition.expectedExecutedTransitionReads,
      transition.path,
    );
    executedFutureCallCount += trackedCalls.futurePathCalls.length;
    executedTransitionReadCount += trackedCalls.transitionReadCount;
  }

  assert.equal(executedFutureCallCount, 0);
  assert.equal(executedTransitionReadCount, 32);
  assert.equal(readRequired(proofPath).includes("proofFuturePathExistsCalls"), true);
});

test("five-binding cross-monitor now proves the transitioned posture", () => {
  const source = readRequired(alignedTestTransitions[7].path);

  assert.equal(
    source.includes(
      "const validatorHelperProofTransitionStatus =\n  \"" +
        transitionStatus +
        "\";",
    ),
    true,
  );
  assert.equal(
    source.includes(
      "hasFalseExistsAssertion(retainedLoop, binding.retainedItem),\n        false,",
    ),
    true,
  );
  assert.equal(
    source.includes(
      "hasStringContaining(retainedLoop, validatorHelperProofTransitionStatus)",
    ),
    true,
  );
  assert.equal(
    source.includes(
      "directExecutedExistsCalls.some(\n            (call) => call.path === absolute(retainedPath),\n          ),\n          false,",
    ),
    true,
  );
});

test("the exact twelve-file scope is frozen", () => {
  const docsText = readRequired(docsPath);
  const fileScope = sectionBetween(docsText, "## 5.", "## 6.");

  assert.deepEqual(tableDataRows(fileScope), expectedFileScopeRows);
  assert.match(docsText, /VALIDATOR_HELPER_PROOF_TRANSITION_FILE_COUNT:\n12/u);
});

test("retained separate boundaries remain complete and fail closed", () => {
  const docsText = readRequired(docsPath);
  const retained = sectionBetween(docsText, "## 7.", "## 8.");

  assert.deepEqual(numberedProseItems(retained), expectedRetainedBoundaries);
  assert.match(docsText, /RETAINED_SEPARATE_BOUNDARY_COUNT:\n5/u);
});

test("historical package denials remain documented while current helper identity and sibling denials are exact", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");
  const packageSection = sectionBetween(docsText, "## 8.", "## 9.");
  const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js");

  assert.deepEqual(
    numberedInlineCodeItems(packageSection),
    historicalValidatorExports,
  );
  for (const deniedExport of retainedValidatorExports) {
    assert.equal(Object.hasOwn(packageSchemas, deniedExport), false, deniedExport);
  }
  assert.strictEqual(
    packageSchemas[validatorHelperExportName],
    validatorModule[validatorHelperExportName],
  );
  assert.match(
    docsText,
    /BLOCKED_VALIDATOR_PACKAGE_EXPORT_NAME_COUNT:\n4/u,
  );
  assert.equal(packageIndexText.split("\n").length - 1, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
});

test("the later helper remains one exact two-file runtime-change slice", () => {
  const docsText = readRequired(docsPath);
  const later = sectionBetween(docsText, "## 9.", "## 10.");

  assert.deepEqual(numberedInlineCodeItems(later), historicalHelperPaths);
  assert.match(docsText, /SEPARATE_LATER_HELPER_SLICE_FILE_COUNT:\n2/u);
  assert.match(later, /one separate `RUNTIME_CHANGE`/u);
  assert.match(
    later,
    /two-phase\nalgorithm, five-code and sixteen-static-path contract/u,
  );
  assert.match(later, /package-index non-interference/u);
});

test("complete non-interference and mandatory boundaries are frozen", () => {
  const docsText = readRequired(docsPath);
  const nonInterference = sectionBetween(docsText, "## 10.", "## 11.");

  assert.deepEqual(
    numberedProseItems(nonInterference),
    expectedNonInterferenceRules,
  );
  assert.match(docsText, /NON_INTERFERENCE_RULE_COUNT:\n10/u);
  for (const marker of [
    "HISTORICAL_VALIDATOR_HELPER_ABSENCE_MARKERS_PRESERVED",
    "CROSS_REFERENCE_ADMISSIBILITY_ABSENCES_RETAINED",
    "ATTESTATION_SIGNATURE_OR_ISSUER_VERIFICATION_ABSENCES_RETAINED",
    "REVIEWER_AUTHORSHIP_IDENTITY_ROLE_OR_AUTHORITY_ABSENCES_RETAINED",
    "TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH_ABSENCES_RETAINED",
    "APPROVAL_EFFECT_ABSENCE_RETAINED",
    "PACKAGE_EXPORT_DENIALS_RETAINED",
    "HELPER_NOT_CREATED_BY_THIS_SLICE",
    "HELPER_TEST_NOT_CREATED_BY_THIS_SLICE",
    "PACKAGE_INDEX_UNCHANGED",
    "VALIDATOR_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_IMPLEMENTATION_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_APPROVAL_OR_SIGN_OFF_CREATED",
    "NO_FINDING_SEVERITY_REMEDIATION_OR_BLOCKER_RESOLUTION_CREATED",
    "NO_SECURITY_OR_VULNERABILITY_FINDING_CREATED",
    "NO_SOURCE_PACKAGE_PDF_IMAGE_SCREENSHOT_OR_METADATA_INSPECTION_CREATED",
    "NO_METADATA_ACQUISITION_CREATED",
    "NO_REAL_PRIVATE_RUN_CREATED",
    "NO_CLOSED_DOMAIN_SEMANTICS_REOPENED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("the final no-conclusion boundary and next action are exact", () => {
  const docsText = readRequired(docsPath);
  const finalBoundary = sectionBetween(
    docsText,
    "## 12. Final No-Conclusion Boundary",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_STATUS:",
  )
    .replace("## 12. Final No-Conclusion Boundary", "")
    .replace(/\s+/gu, " ")
    .trim();
  const expectedFinalBoundary =
    "This proof-transition prerequisite is not actual human review, professional review, legal review, evidentiary review, technical review, legal advice, professional approval, attestation verification, signature verification, reviewer-authorship verification, issuer-trust verification, provenance verification, identity verification, currentness verification, reviewer-role, qualification or reviewer-authority verification, trusted-time or lifecycle-truth determination, admissibility determination, approval-effect determination, technical sign-off, release approval, product/external-use authorization, compliance certification, security or vulnerability finding, finding, severity, remediation, blocker resolution, evidentiary conclusion, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, handoff approval, case-truth conclusion, source inspection, metadata acquisition, real private run, or real-evidence review.";

  assert.equal(finalBoundary, expectedFinalBoundary);
  assert.match(
    docsText,
    /BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    docsText,
    /REPO_NEXT_ACTION:\nisolated two-file validator helper remains a separate runtime-change slice/u,
  );
});
