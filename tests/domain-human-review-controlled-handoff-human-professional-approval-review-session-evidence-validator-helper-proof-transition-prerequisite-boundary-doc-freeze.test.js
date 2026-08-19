"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const scaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const transitionStatus =
  "LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE";
const historicalHelperPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.test.js",
];
const alignedTestTransitions = [
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
    forbiddenStatements: [
      "assert.equal(fs.exists" + "Sync(absolute(validatorPath)), false, validatorPath);",
    ],
    assertionSiteCount: 1,
    historicalPathReferenceCounts: [1, 1],
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
    forbiddenStatements: [
      "assertPathAbsent(retainedPath);",
      "relativePath === siblingPath && result === false",
    ],
    assertionSiteCount: 1,
    historicalPathReferenceCounts: [2, 2],
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
    forbiddenStatements: [
      "assert.equal(fs.exists" +
        "Sync(absolute(retainedSurface)), false, retainedSurface);",
    ],
    assertionSiteCount: 1,
    historicalPathReferenceCounts: [1, 1],
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-helper-readiness-boundary-doc-freeze.test.js",
    forbiddenStatements: [
      "assert.equal(fs.exists" + "Sync(absolute(absentPath)), false, absentPath);",
    ],
    assertionSiteCount: 1,
    historicalPathReferenceCounts: [1, 1],
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
    forbiddenStatements: [
      "assert.equal(fs.exists" + "Sync(absolute(validatorPath)), false, validatorPath);",
    ],
    assertionSiteCount: 1,
    historicalPathReferenceCounts: [1, 1],
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
    forbiddenStatements: [
      "assert.equal(fs.exists" + "Sync(absolute(retainedPath)), false, retainedPath);",
    ],
    assertionSiteCount: 1,
    historicalPathReferenceCounts: [1, 1],
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
    forbiddenStatements: [
      "assert.equal(fs.exists" + "Sync(absolute(retainedPath)), false, retainedPath);",
    ],
    assertionSiteCount: 2,
    historicalPathReferenceCounts: [2, 2],
  },
  {
    path: "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-schema.test.js",
    forbiddenStatements: [
      "assert.equal(fs.exists" + "Sync(absolute(retainedPath)), false, retainedPath);",
    ],
    assertionSiteCount: 1,
    historicalPathReferenceCounts: [1, 1],
  },
  {
    path: "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema.test.js",
    forbiddenStatements: [
      "assert.equal(fs.exists" + "Sync(absolute(retainedPath)), false, retainedPath);",
    ],
    assertionSiteCount: 1,
    historicalPathReferenceCounts: [2, 2],
  },
];
const historicalValidatorExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorRegistry",
];
const validatorHelperExportName = historicalValidatorExports[1];
const retainedValidatorExports = historicalValidatorExports.filter(
  (name) => name !== validatorHelperExportName,
);
const expectedReservedPathRows = [
  "| 1 | `packages/schemas/src/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.js` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE` |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.test.js` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE` |",
];
const expectedAssertionSiteRows = [
  "| 1 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-package-schema-export-scope-boundary-doc-freeze.test.js` | `retainedValidatorPaths` | 2 |",
  "| 2 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js` | `retainedValidatorSiblingPaths` | 2 |",
  "| 3 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js` | `retainedValidatorSurfaces` | 2 |",
  "| 4 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-helper-readiness-boundary-doc-freeze.test.js` | `[validatorPath, validatorProofPath]` | 2 |",
  "| 5 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js` | `retainedValidatorPaths` | 2 |",
  "| 6 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js` | `retainedValidatorPaths` | 2 |",
  "| 7 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js` | first `retainedValidatorPaths` site | 2 |",
  "| 8 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js` | second `retainedValidatorPaths` site | 2 |",
  "| 9 | `tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-schema.test.js` | `retainedValidatorSiblingPaths` | 2 |",
  "| 10 | `tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema.test.js` | `retainedValidatorPaths` | 2 |",
];
const expectedFileScopeRows = [
  "| 1 | `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md` | add this bounded transition record |",
  "| 2 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js` | add focused transition proof |",
  "| 3 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-package-schema-export-scope-boundary-doc-freeze.test.js` | transition one two-path live absence assertion site |",
  "| 4 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js` | transition one two-path live absence assertion site and one dependent trace guard |",
  "| 5 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js` | transition one two-path live absence assertion site |",
  "| 6 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-helper-readiness-boundary-doc-freeze.test.js` | transition one two-path live absence assertion site |",
  "| 7 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js` | transition one two-path live absence assertion site |",
  "| 8 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js` | transition one two-path live absence assertion site |",
  "| 9 | `tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js` | transition two two-path live absence assertion sites |",
  "| 10 | `tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-schema.test.js` | transition one two-path live absence assertion site |",
  "| 11 | `tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema.test.js` | transition one two-path live absence assertion site |",
];
const expectedRetainedBoundaries = [
  "review-session existence, identity, authentication, continuity, request binding, replay prevention, and reviewer presence",
  "reviewer identity, currentness, professional qualification, role, credentials, delegation, authority, and reviewer-evidence relationship evaluation",
  "issuer or provenance trust, lifecycle truth, trusted time, freshness, expiry, revocation truth, reference existence, equality, resolution, and supersession",
  "cross-reference semantics, admissibility, approval effect, current-record selection, and handoff eligibility",
  "export, delivery, release, persistence, audit, API, route, UI, source or metadata acquisition, provider, model, and product behavior",
];
const expectedNonInterferenceRules = [
  "preserve all canonical docs and schemas unchanged",
  "preserve historical absence statements, path rows, and status markers as historical facts",
  "transition only ten live assertion sites, twenty helper/test filesystem-absence checks, and their one dependent trace guard",
  "preserve every non-helper assertion in all nine aligned proof files",
  "preserve all cross-reference, admissibility, identity, currentness, role, authority, approval-effect, handoff, delivery, release, and other sibling boundaries",
  "preserve all package-export denials and the 13165-line package index",
  "create no implementation, helper, validator export, dispatch, registry, checkpoint, resolver, approval effect, handoff decision, persistence, API, route, source or metadata acquisition, provider, model, logging, telemetry, or runtime behavior",
  "inspect no raw, private, source, package, PDF, image, screenshot, case, identity-provider, credential, authorship, metadata, or real-evidence material",
  "create no approval, sign-off, finding, severity, remediation, blocker resolution, security finding, vulnerability finding, certification, product candidate, readiness claim, or external-use authority",
  "perform no real private run, reopen no closed domain semantics, and preserve human/professional review as the release gate",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, `expected ${relativePath}`);
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

test("review-session validator-helper transition boundary and scaffold are exact", () => {
  const docsText = readRequired(docsPath);
  readRequired(scaffoldPath);

  assert.equal(docsText.includes("`" + scaffoldPath + "`"), true);
  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_PROOF_TRANSITION_PREREQUISITE",
    "EXACT_ELEVEN_FILE_ALIGNMENT_SCOPE",
    "NINE_HISTORICAL_PROOF_FILES_ALIGNED",
    "TEN_LIVE_ASSERTION_SITES_TRANSITIONED",
    "TWENTY_LIVE_HELPER_PATH_ABSENCE_CHECKS_TRANSITIONED",
    "ONE_DEPENDENT_TRACE_GUARD_TRANSITIONED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("historical proof inventory and two reserved path statuses are complete", () => {
  const docsText = readRequired(docsPath);
  const inventory = sectionBetween(docsText, "The historical proof files being aligned", "HISTORICAL_PROOF_FILE_ALIGNMENT_COUNT:");
  const reserved = sectionBetween(docsText, "## 3.", "## 4.");

  assert.deepEqual(
    numberedInlineCodeItems(inventory),
    alignedTestTransitions.map((item) => item.path),
  );
  assert.match(docsText, /HISTORICAL_PROOF_FILE_ALIGNMENT_COUNT:\n9/u);
  assert.deepEqual(tableDataRows(reserved), expectedReservedPathRows);
  assert.match(docsText, /VALIDATOR_HELPER_RESERVED_PATH_COUNT:\n2/u);
});

test("ten exact assertion sites and twenty path checks are transitioned", () => {
  const docsText = readRequired(docsPath);
  const transitionSection = sectionBetween(docsText, "## 4.", "## 5.");
  const assertionSiteCount = alignedTestTransitions.reduce(
    (sum, item) => sum + item.assertionSiteCount,
    0,
  );

  assert.deepEqual(tableDataRows(transitionSection), expectedAssertionSiteRows);
  assert.equal(alignedTestTransitions.length, 9);
  assert.equal(assertionSiteCount, 10);
  assert.equal(assertionSiteCount * historicalHelperPaths.length, 20);
  assert.match(docsText, /VALIDATOR_HELPER_LIVE_ASSERTION_SITE_TRANSITION_COUNT:\n10/u);
  assert.match(docsText, /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_CHECK_TRANSITION_COUNT:\n20/u);
  assert.match(docsText, /VALIDATOR_HELPER_DEPENDENT_TRACE_GUARD_TRANSITION_COUNT:\n1/u);
});

test("aligned proofs preserve historical paths and replace only live absence outcomes", () => {
  for (const transition of alignedTestTransitions) {
    const source = readRequired(transition.path);
    assert.equal(countOccurrences(source, docsPath), 1, transition.path);
    assert.equal(
      countOccurrences(source, transitionStatus),
      transition.assertionSiteCount,
      transition.path,
    );
    for (const forbiddenStatement of transition.forbiddenStatements) {
      assert.equal(source.includes(forbiddenStatement), false, transition.path);
    }
    for (const [index, helperPath] of historicalHelperPaths.entries()) {
      assert.equal(
        countOccurrences(source, helperPath),
        transition.historicalPathReferenceCounts[index],
        `${transition.path}: ${helperPath}`,
      );
    }
  }

  const proofText = readRequired(proofPath);
  const prohibitedFuturePathProbe = "exists" + "Sync(absolute(futurePath))";
  assert.equal(proofText.includes(prohibitedFuturePathProbe), false);
  assert.equal(
    /assert\.equal\(fs\.existsSync\(absolute\((?:future|validator|retained|absent)[A-Za-z]*Path\)\), false/gu.test(
      proofText,
    ),
    false,
  );
});

test("schema-scaffold dependent trace guard is transitioned without adding a check", () => {
  const source = readRequired(alignedTestTransitions[1].path);

  assert.equal(source.includes("assert.deepEqual(\n      liveAbsenceAssertions,\n      [],\n    );"), true);
  assert.equal(
    source.includes(
      "...validatorResultCandidatePaths,\n      candidatePackageExportProofPath,\n      validatorResultPackageExportProofPath,\n      ...retainedValidatorSiblingPaths,",
    ),
    true,
  );
  assert.equal(
    source.includes("relativePath === siblingPath && result === false"),
    false,
  );
  assert.equal(
    countOccurrences(source, "for (const siblingPath of retainedValidatorSiblingPaths) {"),
    0,
  );
});

test("exact eleven-file scope is frozen", () => {
  const docsText = readRequired(docsPath);
  const fileScope = sectionBetween(docsText, "## 5.", "## 6.");

  assert.deepEqual(tableDataRows(fileScope), expectedFileScopeRows);
  assert.match(docsText, /VALIDATOR_HELPER_PROOF_TRANSITION_FILE_COUNT:\n11/u);
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
  const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.js");

  assert.deepEqual(numberedInlineCodeItems(packageSection), historicalValidatorExports);
  for (const deniedExport of retainedValidatorExports) {
    assert.equal(Object.hasOwn(packageSchemas, deniedExport), false, deniedExport);
  }
  assert.strictEqual(
    packageSchemas[validatorHelperExportName],
    validatorModule[validatorHelperExportName],
  );
  assert.match(docsText, /BLOCKED_VALIDATOR_PACKAGE_EXPORT_NAME_COUNT:\n4/u);
  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
});

test("later helper remains one separate exact two-file runtime-change slice", () => {
  const docsText = readRequired(docsPath);
  const later = sectionBetween(docsText, "## 9.", "## 10.");

  assert.deepEqual(numberedInlineCodeItems(later), historicalHelperPaths);
  assert.match(docsText, /SEPARATE_LATER_HELPER_SLICE_FILE_COUNT:\n2/u);
  assert.match(later, /one separate `RUNTIME_CHANGE`/u);
  assert.match(later, /two-phase\nalgorithm, five-code and twelve-static-path contract/u);
  assert.match(later, /package-index non-interference/u);
});

test("complete non-interference and mandatory negative boundaries are frozen", () => {
  const docsText = readRequired(docsPath);
  const nonInterference = sectionBetween(docsText, "## 10.", "## 11.");

  assert.deepEqual(numberedProseItems(nonInterference), expectedNonInterferenceRules);
  assert.match(docsText, /NON_INTERFERENCE_RULE_COUNT:\n10/u);
  for (const marker of [
    "HISTORICAL_VALIDATOR_HELPER_ABSENCE_MARKERS_PRESERVED",
    "CROSS_REFERENCE_ADMISSIBILITY_ABSENCES_RETAINED",
    "REVIEWER_IDENTITY_CURRENTNESS_ROLE_OR_AUTHORITY_ABSENCES_RETAINED",
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

test("final no-conclusion boundary and next action remain non-authorizing", () => {
  const docsText = readRequired(docsPath);
  const finalBoundary = sectionBetween(
    docsText,
    "## 12. Final No-Conclusion Boundary",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_STATUS:",
  )
    .replace("## 12. Final No-Conclusion Boundary", "")
    .replace(/\s+/gu, " ")
    .trim();
  const expectedFinalBoundary =
    "This proof-transition prerequisite is not actual human review, professional review, legal review, evidentiary review, technical review, legal advice, professional approval, review-session verification, session-identity verification, authentication, request binding, replay prevention, reviewer-presence verification, identity verification, currentness verification, reviewer-role, qualification or reviewer-authority verification, issuer or provenance trust, trusted-time or lifecycle-truth determination, admissibility determination, approval-effect determination, technical sign-off, release approval, product/external-use authorization, compliance certification, security or vulnerability finding, finding, severity, remediation, blocker resolution, evidentiary conclusion, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, handoff approval, case-truth conclusion, source inspection, metadata acquisition, real private run, or real-evidence review.";

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
