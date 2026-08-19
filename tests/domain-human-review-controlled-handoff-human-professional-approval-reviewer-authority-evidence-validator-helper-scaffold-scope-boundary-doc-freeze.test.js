"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");
const candidateSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json");
const resultSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result.json");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-helper-scaffold-scope-boundary-doc-freeze.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofTransitionProofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const proofTransitionStatus =
  "LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE";
const futureFunctionName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence";
const retainedPackageSiblingNames = [
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidator",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidatorRegistry",
];
const futureImplementationPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.test.js",
];
const canonicalPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result.json",
];
const precedentPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "tests/human-review-controlled-handoff-brief-validator.test.js",
];
const transitionTestPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema.test.js",
];
const prerequisitePaths = [
  proofTransitionPath,
  proofTransitionProofPath,
  ...transitionTestPaths,
];
const declaredFields = [
  "contract_id",
  "contract_version",
  "reviewer_authority_evidence_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "reviewer_role",
  "role_permission_binding_evidence_ref",
  "role_permission_policy_evidence_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "binding_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const duplicateParticipants = [
  "reviewer_authority_evidence_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "role_permission_binding_evidence_ref",
  "role_permission_policy_evidence_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const fieldPaths = declaredFields.map((field) => `$.${field}`);
const duplicatePaths = duplicateParticipants.map((field) => `$.${field}`);
const errorCodes = [
  "required_field_missing",
  "unexpected_field",
  "invalid_field_type",
  "invalid_field_value",
  "duplicate_reference",
];
const exactPathPartitions = [
  fieldPaths,
  ["$"],
  ["$", ...fieldPaths],
  fieldPaths,
  duplicatePaths,
];
const expectedPhaseOneSubpasses = [
  "emit every missing-field error in declaration order",
  "emit at most one root unknown-key error",
  "emit every locally applicable type error in declaration order",
  "emit every locally applicable value error in declaration order",
];
const expectedCascadeRules = [
  "invalid root preflight emits only `invalid_field_type` at `$` and stops",
  "a missing field is not revisited by type, value, or duplicate validation",
  "a field with invalid type is not revisited by value or duplicate validation",
  "a reference with invalid local value does not participate in duplicate validation",
  "the one aggregated unknown-key error neither fabricates nor suppresses independently applicable declared-field errors",
];
const expectedPrerequisiteRows = [
  "| 1 | `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md` | record the bounded transition |",
  "| 2 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js` | prove the bounded transition |",
  "| 3 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-package-schema-export-scope-boundary-doc-freeze.test.js` | transition exactly 2 live helper/test path absence checks |",
  "| 4 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js` | transition exactly 2 live helper/test path absence checks |",
  "| 5 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js` | transition exactly 2 live helper/test path absence checks |",
  "| 6 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-helper-readiness-boundary-doc-freeze.test.js` | transition exactly 2 live helper/test path absence checks |",
  "| 7 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js` | transition exactly 2 live helper/test path absence checks |",
  "| 8 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js` | transition exactly 2 live helper/test path absence checks |",
  "| 9 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js` | transition exactly 4 live helper/test path absence checks across 2 sites |",
  "| 10 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema.test.js` | transition exactly 2 live helper/test path absence checks |",
  "| 11 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema.test.js` | transition exactly 2 live helper/test path absence checks |",
];
const expectedPrerequisiteTransitionCheckCounts = [2, 2, 2, 2, 2, 2, 4, 2, 2];
const expectedImplementationRows = [
  "| 1 | `packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js` | create the isolated internal helper module |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.test.js` | create focused behavioral and boundary proof |",
];
const expectedCodePathRows = errorCodes.map((code, index) =>
  "| `" + code + "` | " + exactPathPartitions[index].map((item) => "`" + item + "`").join(", ") + " |",
);
const expectedLiveAssertionRows = [
  "| 1 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-package-schema-export-scope-boundary-doc-freeze.test.js` | `retainedValidatorPaths` | 2 |",
  "| 2 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js` | `retainedValidatorSiblingPaths` | 2 |",
  "| 3 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js` | `retainedValidatorSurfaces` | 2 |",
  "| 4 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-helper-readiness-boundary-doc-freeze.test.js` | `[validatorPath, validatorProofPath]` | 2 |",
  "| 5 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js` | `retainedValidatorPaths` | 2 |",
  "| 6 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js` | `retainedValidatorPaths` | 2 |",
  "| 7 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js` | first `retainedValidatorPaths` site | 2 |",
  "| 8 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js` | second `retainedValidatorPaths` site | 2 |",
  "| 9 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema.test.js` | `retainedValidatorSiblingPaths` | 2 |",
  "| 10 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema.test.js` | `retainedValidatorPaths` | 2 |",
];
const expectedLiveAssertionBindings = [
  {
    path: transitionTestPaths[0],
    iterable: "retainedValidatorPaths",
    loopVariable: "retainedPath",
    sourceArray: "retainedValidatorPaths",
    sliceStart: 0,
    callCount: 1,
  },
  {
    path: transitionTestPaths[1],
    iterable: "retainedValidatorSiblingPaths",
    loopVariable: "retainedPath",
    sourceArray: "laterSiblingPaths",
    sliceStart: 4,
    callCount: 1,
  },
  {
    path: transitionTestPaths[2],
    iterable: "retainedValidatorSurfaces",
    loopVariable: "retainedSurface",
    sourceArray: "retainedLaterSurfaces",
    sliceStart: 4,
    callCount: 1,
  },
  {
    path: transitionTestPaths[4],
    iterable: "retainedValidatorPaths",
    loopVariable: "validatorPath",
    sourceArray: "retainedValidatorPaths",
    sliceStart: 0,
    callCount: 1,
  },
  {
    path: transitionTestPaths[5],
    iterable: "retainedValidatorPaths",
    loopVariable: "retainedPath",
    sourceArray: "reservedLaterPaths",
    sliceStart: 4,
    callCount: 1,
  },
  {
    path: transitionTestPaths[6],
    iterable: "retainedValidatorPaths",
    loopVariable: "retainedPath",
    sourceArray: "retainedSiblingPaths",
    sliceStart: 2,
    callCount: 2,
  },
  {
    path: transitionTestPaths[7],
    iterable: "retainedValidatorSiblingPaths",
    loopVariable: "retainedPath",
    sourceArray: "laterSiblingPaths",
    sliceStart: 4,
    callCount: 1,
  },
  {
    path: transitionTestPaths[8],
    iterable: "retainedValidatorPaths",
    loopVariable: "retainedPath",
    sourceArray: "retainedSiblingPaths",
    sliceStart: 2,
    callCount: 1,
  },
];
const expectedFutureProofFamilies = [
  "the module exports exactly the one unary function",
  "the package index does not export that function",
  "valid candidates across both reviewer-role values and all declared lifecycle values return exact frozen success results",
  "root preflight failures stop before field traversal",
  "required, unknown, type, local-value, and duplicate errors follow the exact two-phase and declaration order",
  "the complete five-code and fifteen-static-path vocabulary is respected",
  "unknown string, symbol, non-enumerable, getter, setter, prototype, and descriptor-failure candidates do not cause key/value echo or accessor invocation",
  "the eight duplicate participants use exact case-sensitive equality and each later locally valid occurrence receives its own static-path error",
  "invalid references do not participate in duplicate detection",
  "candidate insertion order does not affect returned error order",
  "identical errors deduplicate by first canonical occurrence",
  "candidate objects and supplied values are not mutated",
  "results, error arrays, and error objects are recursively frozen",
  "representative success and failure outputs conform structurally to the tracked validator-result schema",
  "the module source contains no `fs`, network, environment, cross-reference resolution, identity or currentness verification, role or authority evaluation, admissibility evaluation, approval effect, source or metadata acquisition, content inspection, provider, model, persistence, API, dispatch, logging, telemetry, handoff, delivery, or release behavior",
];
const expectedDecisionRows = [
  "| 1 | package/module path | exact reserved internal schemas-package module in Section 3 |",
  "| 2 | public exports | one unary module function; no package-index export |",
  "| 3 | machine authority | two tracked JSON schemas; contract-governed bounded traversal |",
  "| 4 | helper/schema relationship | direct bounded algorithm with schema-derived constants |",
  "| 5 | file/proof scope | exact eleven-file prerequisite then exact two-file implementation |",
  "| 6 | denial transitions | only twenty live helper/test path absence assertions across ten sites in the prerequisite |",
  "| 7 | package-index editing | none; 13165-line index remains unchanged |",
  "| 8 | result conformance proof | representative structural proof only |",
];
const expectedNonInterferenceRules = [
  "preserve all tracked docs, schemas, package exports, and runtime behavior unchanged",
  "create no implementation, validator, validation execution, package-index function export, dispatch, registry, getter, or alias",
  "create no cross-reference or admissibility checkpoint, identity or currentness verification, role or authority evaluation, approval effect, handoff decision, persistence, API, route, source or metadata acquisition, provider, model, prompt, response, logging, telemetry, delivery, or release behavior",
  "create no approval, sign-off, finding, severity, remediation, blocker resolution, security finding, vulnerability finding, product candidate, or external-use authority",
  "inspect no raw, private, source, package, PDF, image, screenshot, case, identity-provider, credential, authorship, metadata, or real-evidence material",
  "perform no real private run and reopen no closed domain semantics",
  "return no rejected key, symbol description, value, reference, exception, diagnostic, or source content",
  "preserve human/professional review as the release gate",
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
  return section
    .split("\n")
    .filter((line) => /^\| \d+ \|/u.test(line));
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

function bulletItems(section) {
  const items = [];
  for (const line of section.split("\n")) {
    const start = line.match(/^- (.+)$/u);
    if (start) {
      items.push(start[1]);
    } else if (items.length > 0 && /^ {2}\S/u.test(line)) {
      items[items.length - 1] += " " + line.trim();
    }
  }
  return items;
}

function extractStringArray(source, name) {
  const match = source.match(
    new RegExp("const " + name + " = \\[([\\s\\S]*?)\\n\\];", "u"),
  );
  assert.notEqual(match, null, name);
  return [...match[1].matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/gu)].map(
    (item) => JSON.parse('"' + item[1] + '"'),
  );
}

function countOccurrences(source, fragment) {
  return source.split(fragment).length - 1;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

test("scaffold scope and canonical sources are exact", () => {
  const docsText = readRequired(docsPath);
  const canonicalSection = sectionBetween(
    docsText,
    "The controlling tracked sources are:",
    "The following tracked helper sources provide",
  );
  const precedentSection = sectionBetween(
    docsText,
    "The following tracked helper sources provide",
    "Those precedent sources do not define",
  );

  for (const sourcePath of canonicalPaths) {
    readRequired(sourcePath);
    assert.equal(canonicalSection.includes("`" + sourcePath + "`"), true, sourcePath);
    assert.equal(precedentSection.includes("`" + sourcePath + "`"), false, sourcePath);
  }
  for (const sourcePath of precedentPaths) {
    readRequired(sourcePath);
    assert.equal(precedentSection.includes("`" + sourcePath + "`"), true, sourcePath);
    assert.equal(canonicalSection.includes("`" + sourcePath + "`"), false, sourcePath);
  }
  assert.match(
    docsText,
    /Those precedent sources do not define this candidate's fields, paths, error\ncodes, pairwise-reference semantics, reviewer-role or reviewer-authority\nmeaning, admissibility, approval effect, export surface, or runtime authority/u,
  );
  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_VALIDATOR_HELPER_SCOPE",
    "EIGHT_SCOPE_DECISIONS_RESOLVED",
    "EXACT_INTERNAL_MODULE_ONLY_SURFACE_DEFINED",
    "PROOF_TRANSITION_PREREQUISITE_REQUIRED_FIRST",
    "EXACT_TWO_FILE_RUNTIME_CHANGE_SCOPE_DEFINED_AFTER_PREREQUISITE",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  for (let stage = 1; stage <= 8; stage += 1) {
    assert.equal(
      docsText.includes(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`),
      true,
      `stage ${stage}`,
    );
  }
});

test("historical internal-module scope and current unary package reference identity are exact", () => {
  const docsText = readRequired(docsPath);
  const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js");

  assert.equal(docsText.includes("`" + futureImplementationPaths[0] + "`"), true);
  assert.equal(docsText.includes("`" + futureFunctionName + "`"), true);
  assert.match(docsText, /FUTURE_VALIDATOR_MODULE_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_VALIDATOR_FUNCTION_ARITY:\n1/u);
  assert.match(docsText, /function is not a public\npackage-index export/u);
  assert.strictEqual(
    packageSchemas[futureFunctionName],
    validatorModule[futureFunctionName],
  );
  for (const siblingName of retainedPackageSiblingNames) {
    assert.equal(Object.hasOwn(packageSchemas, siblingName), false, siblingName);
  }
});

test("two tracked JSON schemas remain the exact machine sources", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence\.json`/u,
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result\.json`/u,
  );
  assert.match(docsText, /direct descriptor-safe implementation/u);
  assert.match(docsText, /not a generic JSON Schema engine/u);
  assert.match(docsText, /exact\n  two-value reviewer-role enum/u);
  assert.deepEqual(candidateSchema.required, declaredFields);
  assert.deepEqual(Object.keys(candidateSchema.properties), declaredFields);
  assert.deepEqual(candidateSchema.properties.reviewer_role.enum, [
    "HUMAN_REVIEWER",
    "PROFESSIONAL_REVIEWER",
  ]);
  assert.deepEqual(resultSchema.required, ["valid", "contractKind", "version", "errors"]);
  assert.deepEqual(Object.keys(resultSchema.properties.errors.items.properties), ["code", "path"]);
});

test("future algorithm freezes two phases, five codes, fifteen paths, and no indexed paths", () => {
  const docsText = readRequired(docsPath);
  const algorithm = sectionBetween(
    docsText,
    "## 7. Exact Future Validation Algorithm",
    "## 8.",
  );
  const phaseOne = sectionBetween(algorithm, "### Phase 1:", "### Phase 2:");
  const phaseTwo = sectionBetween(algorithm, "### Phase 2:", "### Pair Deduplication");
  const subpassSection = sectionBetween(
    phaseOne,
    "Within Phase 1, emission uses these exact subpasses:",
    "FUTURE_VALIDATOR_PHASE_1_SUBPASS_COUNT:",
  );
  const codePathSection = sectionBetween(
    algorithm,
    "The complete five-code path partition is:",
    "FUTURE_VALIDATOR_CODE_TO_PATH_PARTITION_COUNT:",
  );
  const cascadeSection = sectionBetween(
    algorithm,
    "The complete fail-closed cascade is:",
    "FUTURE_VALIDATOR_FAIL_CLOSED_CASCADE_RULE_COUNT:",
  );

  assert.match(algorithm, /### Root Plain-Object Preflight/u);
  assert.match(algorithm, /### Phase 1: Root Structure, Types, And Values/u);
  assert.match(algorithm, /### Phase 2: Duplicate References/u);
  assert.deepEqual(numberedInlineCodeItems(phaseOne), declaredFields);
  assert.deepEqual(numberedInlineCodeItems(phaseTwo), duplicateParticipants);
  assert.deepEqual(numberedProseItems(subpassSection), expectedPhaseOneSubpasses);
  assert.deepEqual(numberedProseItems(cascadeSection), expectedCascadeRules);
  assert.deepEqual(
    codePathSection.split("\n").filter((line) => /^\| `[^`]+` \|/u.test(line)),
    expectedCodePathRows,
  );
  const resultBranches = resultSchema.properties.errors.items.oneOf;
  assert.deepEqual(
    resultBranches.map((branch) => branch.properties.code.const),
    errorCodes,
  );
  assert.deepEqual(
    resultBranches.map((branch) => {
      const pathDefinition = branch.properties.path;
      return Object.hasOwn(pathDefinition, "const")
        ? [pathDefinition.const]
        : pathDefinition.enum;
    }),
    exactPathPartitions,
  );
  for (const marker of [
    "never invoke getters or setters",
    "unknown own string or symbol key",
    "invalid_field_type",
    "invalid_field_value",
    "duplicate_reference",
    "invalid references neither establish nor match a duplicate value",
    "deduplicate only an exact `{ code, path }` pair",
    "recursively freeze",
    "never mutate the candidate",
    "never echo input",
  ]) {
    assert.equal(algorithm.includes(marker), true, marker);
  }
  assert.match(docsText, /FUTURE_VALIDATOR_DECLARED_FIELD_COUNT:\n14/u);
  assert.match(docsText, /FUTURE_VALIDATOR_DUPLICATE_PARTICIPANT_COUNT:\n8/u);
  assert.match(docsText, /FUTURE_VALIDATOR_PHASE_COUNT:\n2/u);
  assert.match(docsText, /FUTURE_VALIDATOR_PHASE_1_SUBPASS_COUNT:\n4/u);
  assert.match(docsText, /FUTURE_VALIDATOR_ERROR_CODE_COUNT:\n5/u);
  assert.match(docsText, /FUTURE_VALIDATOR_STATIC_ERROR_PATH_COUNT:\n15/u);
  assert.match(docsText, /FUTURE_VALIDATOR_INDEXED_PATH_TEMPLATE_COUNT:\n0/u);
  assert.match(docsText, /FUTURE_VALIDATOR_CODE_TO_PATH_PARTITION_COUNT:\n5/u);
  assert.match(docsText, /FUTURE_VALIDATOR_FAIL_CLOSED_CASCADE_RULE_COUNT:\n5/u);
});

test("proof transition and implementation tables are complete and exact", () => {
  const docsText = readRequired(docsPath);
  const scopeSection = sectionBetween(docsText, "## 8.", "## 9.");
  const allRows = tableDataRows(scopeSection);

  assert.equal(prerequisitePaths.length, 11);
  assert.deepEqual(allRows.slice(0, 11), expectedPrerequisiteRows);
  assert.deepEqual(allRows.slice(11), expectedImplementationRows);
  const transitionCheckCounts = allRows.slice(2, 11).map((row) => {
    const match = row.match(/\| transition exactly (\d+) live helper\/test path absence checks/u);
    assert.notEqual(match, null, row);
    return Number(match[1]);
  });
  assert.deepEqual(
    transitionCheckCounts,
    expectedPrerequisiteTransitionCheckCounts,
  );
  assert.equal(
    transitionCheckCounts.reduce((total, count) => total + count, 0),
    20,
  );
  assert.match(docsText, /PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n11/u);
  assert.match(docsText, /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(docsText, /implementation slice must not modify any existing file/u);
});

test("the historical live-absence inventory remains exactly nine files ten sites and twenty checks", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);
  const transitionDocumentIsTracked = fs.existsSync(absolute(proofTransitionPath));
  const transitionProofIsTracked = fs.existsSync(absolute(proofTransitionProofPath));
  assert.equal(transitionDocumentIsTracked, transitionProofIsTracked);
  const transitionIsTracked = transitionDocumentIsTracked && transitionProofIsTracked;
  const transitionText = transitionIsTracked ? readRequired(proofTransitionPath) : null;
  const assertionSiteSection = sectionBetween(
    docsText,
    "The exact ten executing assertion sites are:",
    "LIVE_HELPER_PATH_ABSENCE_ASSERTION_SITE_COUNT:",
  );
  if (transitionIsTracked) {
    assert.equal(readRequired(proofTransitionProofPath).includes(proofTransitionPath), true);
  }

  assert.equal(transitionTestPaths.length, 9);
  assert.deepEqual(tableDataRows(assertionSiteSection), expectedLiveAssertionRows);
  const arrayBoundAssertionSiteCount = expectedLiveAssertionBindings.reduce(
    (sum, binding) => sum + binding.callCount,
    0,
  );
  assert.equal(arrayBoundAssertionSiteCount, 9);
  assert.equal(arrayBoundAssertionSiteCount + 1, 10);
  assert.equal((arrayBoundAssertionSiteCount + 1) * futureImplementationPaths.length, 20);
  for (const binding of expectedLiveAssertionBindings) {
    const alignedProofText = readRequired(binding.path);
    const boundValues = extractStringArray(alignedProofText, binding.sourceArray).slice(
      binding.sliceStart,
    );
    assert.deepEqual(boundValues, futureImplementationPaths, binding.path);
    if (binding.sourceArray !== binding.iterable) {
      assert.equal(
        alignedProofText.includes(
          `const ${binding.iterable} = ${binding.sourceArray}.slice(${binding.sliceStart});`,
        ),
        true,
        binding.path,
      );
    }
    const loopHeader = `for (const ${binding.loopVariable} of ${binding.iterable}) {`;
    const liveCall =
      "assert." +
      `equal(fs.existsSync(absolute(${binding.loopVariable})), false, ${binding.loopVariable});`;
    assert.equal(countOccurrences(alignedProofText, loopHeader), binding.callCount, binding.path);
    assert.equal(
      countOccurrences(alignedProofText, liveCall),
      transitionIsTracked ? 0 : binding.callCount,
      binding.path,
    );
    if (transitionIsTracked) {
      assert.equal(countOccurrences(alignedProofText, proofTransitionPath), 1, binding.path);
      assert.equal(
        countOccurrences(alignedProofText, proofTransitionStatus),
        binding.callCount,
        binding.path,
      );
    }
  }

  const readinessText = readRequired(transitionTestPaths[3]);
  for (const [name, futurePath] of [
    ["validatorPath", futureImplementationPaths[0]],
    ["validatorProofPath", futureImplementationPaths[1]],
  ]) {
    assert.match(
      readinessText,
      new RegExp(
        "const " + name + " =\\s*\"" + escapeRegExp(futurePath) + "\";",
        "u",
      ),
    );
  }
  assert.equal(
    countOccurrences(
      readinessText,
      "for (const absentPath of [validatorPath, validatorProofPath]) {",
    ),
    1,
  );
  assert.equal(
    countOccurrences(
      readinessText,
      "assert." +
        "equal(fs.existsSync(absolute(absentPath)), false, absentPath);",
    ),
    transitionIsTracked ? 0 : 1,
  );
  if (transitionIsTracked) {
    assert.equal(countOccurrences(readinessText, proofTransitionPath), 1);
    assert.equal(countOccurrences(readinessText, proofTransitionStatus), 1);
    for (const futurePath of futureImplementationPaths) {
      assert.equal(
        transitionText.includes("`" + futurePath + "` | `" + proofTransitionStatus + "`"),
        true,
        futurePath,
      );
    }
  }

  assert.match(docsText, /LIVE_HELPER_PATH_ABSENCE_ASSERTION_TRANSITION_COUNT:\n20/u);
  assert.match(docsText, /LIVE_HELPER_PATH_ALIGNMENT_TEST_FILE_COUNT:\n9/u);
  assert.match(docsText, /LIVE_HELPER_PATH_ABSENCE_ASSERTION_SITE_COUNT:\n10/u);
  assert.match(docsText, /Historical docs, reserved paths,\nstatus markers/u);
  const prohibitedLiveAbsenceCall = "exists" + "Sync(absolute(futurePath))";
  assert.equal(proofText.includes(prohibitedLiveAbsenceCall), false);
  assert.equal(
    /assert\.equal\(fs\.existsSync\(absolute\((?:future|validator|retained|absent)[A-Za-z]*Path\)\), false/gu.test(
      proofText,
    ),
    false,
  );
});

test("historical package-index boundary remains documented while current static export is exact", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");
  const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js");
  const symbolOccurrences =
    packageIndexText.match(
      /\bvalidateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence\b/gu,
    ) ?? [];

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(docsText, /public package surface remain byte-for-byte outside/u);
  assert.equal(symbolOccurrences.length, 3);
  assert.match(
    packageIndexText,
    /\{ validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence \} = require\("\.\/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator\.js"\)/u,
  );
  assert.match(
    packageIndexText,
    /module\.exports\.validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence = validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence/u,
  );
  assert.strictEqual(
    packageSchemas[futureFunctionName],
    validatorModule[futureFunctionName],
  );
});

test("all eight resolved decisions and the current two-file scope are exact", () => {
  const docsText = readRequired(docsPath);
  const decisions = sectionBetween(docsText, "## 12.", "## 13.");
  const currentScope = sectionBetween(docsText, "## 13.", "## 14.");

  assert.deepEqual(tableDataRows(decisions), expectedDecisionRows);
  assert.match(docsText, /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  assert.deepEqual(numberedInlineCodeItems(currentScope), [docsPath, proofPath]);
  assert.match(docsText, /CURRENT_VALIDATOR_HELPER_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
});

test("future proof scope is bounded and does not authorize domain conclusions", () => {
  const docsText = readRequired(docsPath);
  const futureProof = sectionBetween(docsText, "## 11.", "## 12.");
  const normalizedFutureProof = futureProof.replace(/\s+/gu, " ");
  const permittedProofItems = bulletItems(
    sectionBetween(
      futureProof,
      "The focused future helper proof may establish only:",
      "FUTURE_VALIDATOR_FOCUSED_PROOF_FAMILY_COUNT:",
    ),
  );

  assert.deepEqual(permittedProofItems, expectedFutureProofFamilies);
  assert.match(docsText, /FUTURE_VALIDATOR_FOCUSED_PROOF_FAMILY_COUNT:\n15/u);
  for (const marker of [
    "five-code and fifteen-static-path vocabulary",
    "exact case-sensitive equality",
    "invalid references do not participate",
    "candidate insertion order does not affect",
    "recursively frozen",
    "no `fs`, network, environment",
    "must not claim generic JSON Schema compliance",
    "identity authenticity",
    "approval admissibility or effect",
    "finding, severity,",
    "blocker resolution",
  ]) {
    assert.equal(normalizedFutureProof.includes(marker), true, marker);
  }
});

test("complete non-interference and mandatory fail-closed markers are frozen", () => {
  const docsText = readRequired(docsPath);
  const nonInterference = sectionBetween(docsText, "## 14.", "## 15.");

  assert.deepEqual(numberedProseItems(nonInterference), expectedNonInterferenceRules);
  assert.match(docsText, /NON_INTERFERENCE_RULE_COUNT:\n8/u);
  for (const marker of [
    "NO_IMPLEMENTATION_CREATED",
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
    "## 16. Final No-Conclusion Boundary",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_STATUS:",
  )
    .replace("## 16. Final No-Conclusion Boundary", "")
    .replace(/\s+/gu, " ")
    .trim();
  const expectedFinalBoundary =
    "This scaffold-scope boundary is not actual human review, professional review, legal review, evidentiary review, technical review, legal advice, professional approval, identity verification, currentness verification, reviewer-role or reviewer-authority verification, admissibility determination, technical sign-off, release approval, product/external-use authorization, compliance certification, security or vulnerability finding, finding, severity, remediation, blocker resolution, evidentiary conclusion, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation-readiness, governance approval, handoff approval, case-truth conclusion, source inspection, metadata acquisition, real private run, or real-evidence review.";

  assert.equal(finalBoundary, expectedFinalBoundary);
  assert.match(
    docsText,
    /BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_INTERNAL_VALIDATOR_HELPER_SCOPE_DEFINED/u,
  );
  assert.match(
    docsText,
    /REPO_NEXT_ACTION:\nproof transition prerequisite remains a separate slice/u,
  );
});
