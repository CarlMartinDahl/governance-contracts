"use strict";

const assert = require("node:assert/strict");
const childProcess = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");
const candidateSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json");
const resultSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-helper-scaffold-scope-boundary-doc-freeze.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofTransitionProofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const proofTransitionStatus =
  "LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE";
const futureFunctionName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence";
const retainedPackageSiblingNames = [
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidator",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidenceValidatorRegistry",
];
const futureImplementationPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
];
const canonicalPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json",
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json",
];
const precedentPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.test.js",
];
const transitionTestPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js",
];
const prerequisitePaths = [
  proofTransitionPath,
  proofTransitionProofPath,
  ...transitionTestPaths,
];
const declaredFields = [
  "contract_id",
  "contract_version",
  "decision_attestation_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "reviewer_role",
  "decision",
  "attested_at",
  "attestation_posture",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "attestation_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const duplicateParticipants = [
  "decision_attestation_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
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
const expectedRootPreflightRules = [
  "accept only objects whose prototype is exactly `Object.prototype` or `null`",
  "reject null, arrays, dates, functions, primitives, and other prototypes",
  "if prototype inspection or own-descriptor snapshotting throws, fail closed",
  "on rejection return exactly one `invalid_field_type` error at `$`",
  "snapshot own property descriptors once and never invoke getters or setters",
  "stop before Phase 1 when root preflight fails",
];
const expectedPhaseOneRules = [
  "emit `required_field_missing` in exact candidate-schema required order",
  "aggregate every unknown own string or symbol key into at most one `unexpected_field` at `$`, without key, symbol-description, or value echo",
  "inspect present canonical fields in exact declaration order",
  "require the first fourteen fields to be own string data properties",
  "require `human_professional_review_required` to be an own boolean data property",
  "emit `invalid_field_type` for accessors or wrong local types without invoking, coercing, normalizing, or traversing rejected values",
  "compare correctly typed values only against schema-derived constants, enums, patterns, and generic-reference exclusions",
  "a missing field is not rechecked for type or value",
  "a wrong-type field is not rechecked for value or duplicate participation",
  "field-value failures remain `invalid_field_value` at the field's static path",
];
const expectedPhaseOneSubpasses = [
  "emit every missing-field error in declaration order",
  "emit at most one root unknown-key error",
  "emit every locally applicable type error in declaration order",
  "emit every locally applicable value error in declaration order",
];
const expectedPhaseTwoRules = [
  "compare exact case-sensitive string values across all six fields",
  "only a locally valid own string data property participates",
  "preserve the first participating exact value",
  "emit `duplicate_reference` at every later valid exact duplicate's own static field path",
  "do not retroactively mark the first occurrence",
  "invalid references neither establish nor match a duplicate value",
  "never normalize, resolve, dereference, hash, log, or return a reference value",
];
const expectedResultConstructionRules = [
  "preserve canonical phase and declaration order",
  "deduplicate only an exact `{ code, path }` pair by first occurrence",
  "do not post-sort errors or use candidate property insertion order",
  "return a newly constructed exact four-field result in `valid`, `contractKind`, `version`, `errors` order",
  "set `valid` to true if and only if the deduplicated error array is empty",
  "use result identity literals from the tracked validator-result schema",
  "create newly constructed exact `{ code, path }` error objects",
  "recursively freeze the result, error array, and every error object",
  "never mutate the candidate or supplied values",
  "never echo input, unknown keys, symbols, values, exceptions, or diagnostics",
];
const expectedCascadeRules = [
  "invalid root preflight emits only `invalid_field_type` at `$` and stops",
  "a missing field is not revisited by type, value, or duplicate validation",
  "a field with invalid type is not revisited by value or duplicate validation",
  "a reference with invalid local value does not participate in duplicate validation",
  "the one aggregated unknown-key error neither fabricates nor suppresses independently applicable declared-field errors",
];
const expectedPrerequisiteRows = [
  "| 1 | `" + proofTransitionPath + "` | record the bounded transition |",
  "| 2 | `" + proofTransitionProofPath + "` | prove the bounded transition |",
  "| 3 | `" + transitionTestPaths[0] + "` | transition exactly 2 live helper/test path absence checks |",
  "| 4 | `" + transitionTestPaths[1] + "` | transition exactly 2 live helper/test path absence checks |",
  "| 5 | `" + transitionTestPaths[2] + "` | transition exactly 2 live helper/test path absence checks |",
  "| 6 | `" + transitionTestPaths[3] + "` | transition exactly 2 live helper/test path absence checks |",
  "| 7 | `" + transitionTestPaths[4] + "` | transition exactly 2 live helper/test path absence checks |",
  "| 8 | `" + transitionTestPaths[5] + "` | transition exactly 2 live helper/test path absence checks |",
  "| 9 | `" + transitionTestPaths[6] + "` | transition exactly 2 live helper/test path absence checks |",
  "| 10 | `" + transitionTestPaths[7] + "` | transition exactly 14 live helper/test path absence checks across 3 source sites |",
  "| 11 | `" + transitionTestPaths[8] + "` | transition exactly 2 live helper/test path absence checks |",
  "| 12 | `" + transitionTestPaths[9] + "` | transition exactly 2 live helper/test path absence checks |",
];
const expectedImplementationRows = [
  "| 1 | `" + futureImplementationPaths[0] + "` | create the isolated internal helper module |",
  "| 2 | `" + futureImplementationPaths[1] + "` | create focused behavioral and boundary proof |",
];
const expectedLiveAssertionRows = [
  "| 1 | `" + transitionTestPaths[0] + "` | `retainedValidatorPaths` | 2 |",
  "| 2 | `" + transitionTestPaths[1] + "` | `retainedValidatorPaths` | 2 |",
  "| 3 | `" + transitionTestPaths[2] + "` | `retainedValidatorSiblingPaths` | 2 |",
  "| 4 | `" + transitionTestPaths[3] + "` | `retainedValidatorSurfaces` | 2 |",
  "| 5 | `" + transitionTestPaths[4] + "` | `[validatorPath, validatorProofPath]` | 2 |",
  "| 6 | `" + transitionTestPaths[5] + "` | `retainedValidatorPaths` | 2 |",
  "| 7 | `" + transitionTestPaths[6] + "` | `retainedValidatorPaths` | 2 |",
  "| 8 | `" + transitionTestPaths[7] + "` | five-binding cross-monitor site | 10 |",
  "| 9 | `" + transitionTestPaths[7] + "` | first direct `retainedValidatorPaths` site | 2 |",
  "| 10 | `" + transitionTestPaths[7] + "` | second direct `retainedValidatorPaths` site | 2 |",
  "| 11 | `" + transitionTestPaths[8] + "` | `retainedValidatorSiblingPaths` | 2 |",
  "| 12 | `" + transitionTestPaths[9] + "` | `retainedValidatorPaths` | 2 |",
];
const expectedCodePathRows = errorCodes.map(
  (code, index) =>
    "| `" +
    code +
    "` | " +
    exactPathPartitions[index].map((item) => "`" + item + "`").join(", ") +
    " |",
);
const expectedFutureProofFamilies = [
  "the module exports exactly the one unary function",
  "the package index does not export that function",
  "valid candidates across both reviewer-role values, all three decision values, and all three declared attestation-lifecycle values return exact frozen success results",
  "root preflight failures stop before field traversal",
  "required, unknown, type, local-value, and duplicate errors follow the exact two-phase and declaration order",
  "the complete five-code and sixteen-static-path vocabulary is respected",
  "unknown string, symbol, non-enumerable, getter, setter, prototype, and descriptor-failure candidates do not cause key/value echo or accessor invocation",
  "the six duplicate participants use exact case-sensitive equality and each later locally valid occurrence receives its own static-path error",
  "invalid references do not participate in duplicate detection",
  "candidate insertion order does not affect returned error order",
  "identical errors deduplicate by first canonical occurrence",
  "candidate objects and supplied values are not mutated",
  "results, error arrays, and error objects are recursively frozen",
  "representative success and failure outputs conform structurally to the tracked validator-result schema",
  "the module source contains no `fs`, network, environment, cross-reference resolution, attestation or signature verification, issuer or provenance trust evaluation, reviewer-authorship verification, identity, role, qualification or authority evaluation, trusted-time, lifecycle or currentness evaluation, admissibility evaluation, approval effect, source or metadata acquisition, content inspection, provider, model, persistence, API, dispatch, logging, telemetry, handoff, delivery, or release behavior",
];
const expectedDecisionRows = [
  "| 1 | package/module path | exact reserved internal schemas-package module in Section 3 |",
  "| 2 | public exports | one unary module function; no package-index export |",
  "| 3 | machine authority | two tracked JSON schemas; contract-governed bounded traversal |",
  "| 4 | helper/schema relationship | direct bounded algorithm with schema-derived constants |",
  "| 5 | file/proof scope | exact twelve-file prerequisite then exact two-file implementation |",
  "| 6 | denial transitions | only thirty-two live helper/test path absence assertions across twelve sites in the prerequisite |",
  "| 7 | package-index editing | none; 13165-line index remains unchanged |",
  "| 8 | result conformance proof | representative structural proof only |",
];
const expectedNonInterferenceRules = [
  "preserve all tracked docs, schemas, package exports, and runtime behavior unchanged",
  "create no implementation, validator, validation execution, package-index function export, dispatch, registry, getter, or alias",
  "create no attestation verification, signature verification, reviewer-authorship verification, issuer or provenance trust, identity verification, role, qualification or authority evaluation, external-reference resolution, trusted-time, lifecycle or currentness evaluation, cross-reference or admissibility checkpoint, approval effect, handoff decision, persistence, API, route, provider, model, prompt, response, logging, telemetry, delivery, or release behavior",
  "create no approval, sign-off, finding, severity, remediation, blocker resolution, security finding, vulnerability finding, product candidate, or external-use authority",
  "inspect no raw, private, source, package, PDF, image, screenshot, case, identity-provider, credential, signature, certificate, authorship, metadata, or real-evidence material",
  "perform no real private run and reopen no closed domain semantics",
  "return no rejected key, symbol description, value, reference, exception, diagnostic, or source content",
  "preserve human/professional review as the release gate",
];
const currentLiveBindings = [
  {
    path: transitionTestPaths[0],
    collection: "retainedValidatorPaths",
    item: "retainedValidatorPath",
    sourceSites: 1,
  },
  {
    path: transitionTestPaths[1],
    collection: "retainedValidatorPaths",
    item: "validatorPath",
    sourceSites: 1,
  },
  {
    path: transitionTestPaths[2],
    collection: "retainedValidatorSiblingPaths",
    item: "retainedSiblingPath",
    sourceSites: 1,
  },
  {
    path: transitionTestPaths[3],
    collection: "retainedValidatorSurfaces",
    item: "retainedSurface",
    sourceSites: 1,
  },
  {
    path: transitionTestPaths[4],
    collection: "[validatorPath, validatorProofPath]",
    item: "absentPath",
    sourceSites: 1,
  },
  {
    path: transitionTestPaths[5],
    collection: "retainedValidatorPaths",
    item: "validatorPath",
    sourceSites: 1,
  },
  {
    path: transitionTestPaths[6],
    collection: "retainedValidatorPaths",
    item: "retainedPath",
    sourceSites: 1,
  },
  {
    path: transitionTestPaths[7],
    collection: "retainedPaths",
    item: "retainedPath",
    sourceSites: 1,
    executionMultiplier: 5,
    liveCallSourceSites: 3,
    exactCodeLineOnly: true,
  },
  {
    path: transitionTestPaths[7],
    collection: "retainedValidatorPaths",
    item: "retainedPath",
    sourceSites: 2,
    skipLiveCallCheck: true,
  },
  {
    path: transitionTestPaths[8],
    collection: "retainedValidatorSiblingPaths",
    item: "retainedSiblingPath",
    sourceSites: 1,
  },
  {
    path: transitionTestPaths[9],
    collection: "retainedValidatorPaths",
    item: "retainedPath",
    sourceSites: 1,
  },
];
const originalExistsSync = fs.existsSync;
const scaffoldFuturePathExistsCalls = [];

fs.existsSync = function trackedExistsSync(inputPath) {
  const result = originalExistsSync.call(this, inputPath);
  if (
    typeof inputPath === "string" &&
    futureImplementationPaths
      .map((relativePath) => path.join(repoRoot, relativePath))
      .includes(path.resolve(inputPath))
  ) {
    scaffoldFuturePathExistsCalls.push({
      path: path.resolve(inputPath),
      result,
    });
  }
  return result;
};

test.after(() => {
  fs.existsSync = originalExistsSync;
  assert.deepEqual(scaffoldFuturePathExistsCalls, []);
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

function normalizeWhitespace(value) {
  return value.replace(/-\n(?=\S)/gu, "-").replace(/\s+/gu, " ").trim();
}

function normalizedSectionBody(text, start, end) {
  return normalizeWhitespace(sectionBetween(text, start, end).slice(start.length));
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

function countOccurrences(source, fragment) {
  return source.split(fragment).length - 1;
}

function countExactCodeLines(source, codeLine) {
  return source
    .split("\n")
    .filter((line) => line.trim() === codeLine).length;
}

function executedFuturePathCalls(relativePath) {
  const tempDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "decision-attestation-helper-scope-"),
  );
  const preloadPath = path.join(tempDirectory, "track-exists.js");
  const callsPath = path.join(tempDirectory, "calls.json");
  const preloadSource =
    '"use strict";\n' +
    'const fs = require("node:fs");\n' +
    'const path = require("node:path");\n' +
    "const originalExistsSync = fs.existsSync;\n" +
    "const calls = [];\n" +
    "fs.existsSync = function trackedExistsSync(inputPath) {\n" +
    "  const result = originalExistsSync.call(this, inputPath);\n" +
    '  if (typeof inputPath === "string") {\n' +
    "    calls.push({ path: path.resolve(inputPath), result });\n" +
    "  }\n" +
    "  return result;\n" +
    "};\n" +
    "process.on(\"exit\", () => {\n" +
    "  fs.appendFileSync(process.env.EXISTS_CALL_LOG, JSON.stringify(calls) + \"\\n\");\n" +
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
    const calls = fs
      .readFileSync(callsPath, "utf8")
      .trim()
      .split("\n")
      .flatMap((line) => JSON.parse(line));
    const exactFuturePaths = new Set(
      futureImplementationPaths.map((futurePath) => absolute(futurePath)),
    );
    return calls.filter((call) => exactFuturePaths.has(call.path));
  } finally {
    fs.rmSync(tempDirectory, { recursive: true, force: true });
  }
}

test("scope identity, sources, precedents, and owner selections are exact", () => {
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

  assert.deepEqual(
    bulletItems(canonicalSection),
    canonicalPaths.map((sourcePath) => "`" + sourcePath + "`"),
  );
  assert.deepEqual(
    bulletItems(precedentSection),
    precedentPaths.map((sourcePath) => "`" + sourcePath + "`"),
  );
  for (const sourcePath of [...canonicalPaths, ...precedentPaths]) {
    readRequired(sourcePath);
  }
  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_VALIDATOR_HELPER_SCOPE",
    "EIGHT_SCOPE_DECISIONS_RESOLVED",
    "EXACT_INTERNAL_MODULE_ONLY_SURFACE_DEFINED",
    "PROOF_TRANSITION_PREREQUISITE_REQUIRED_FIRST",
    "EXACT_TWO_FILE_RUNTIME_CHANGE_SCOPE_DEFINED_AFTER_PREREQUISITE",
    "PACKAGE_INDEX_UNCHANGED",
    "PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATION_EXECUTION_NOT_CREATED_BY_THIS_SLICE",
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

test("historical internal path and machine sources remain exact while current package identity is reference-equal", () => {
  const docsText = readRequired(docsPath);
  const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js");
  const decisionOneStart = "## 3. Decision 1: Exact Package And Module Path";
  const decisionTwoStart = "## 4. Decision 2: Exact Module Export Surface";
  const decisionThreeStart = "## 5. Decision 3: Authoritative Machine Sources";
  const decisionFourStart =
    "## 6. Decision 4: Helper And Schema Relationship";
  const algorithmStart = "## 7. Exact Future Validation Algorithm";
  const expectedDecisionOne =
    "The future helper belongs at exactly: `" +
    futureImplementationPaths[0] +
    "` The placement is an internal schemas-package module. It does not place the helper in `packages/governance`, apps, API, database, persistence, source acquisition, provider, model, or product surfaces.";
  const expectedDecisionTwo =
    "The future module may export exactly one property: `" +
    futureFunctionName +
    "` FUTURE_VALIDATOR_MODULE_EXPORT_COUNT: 1 FUTURE_VALIDATOR_FUNCTION_ARITY: 1 The module must not export schema objects, field arrays, maps, sets, regular-expression objects, registries, getters, dispatch helpers, factories, aliases, or additional functions. `packages/schemas/src/index.js` remains unchanged. The function is not a public package-index export in the helper-creation slice.";
  const expectedDecisionThree =
    "The helper must load exactly these tracked JSON objects directly with static CommonJS `require` calls: " +
    "- `../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json` " +
    "- `../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json` " +
    "The candidate schema supplies: " +
    "- exact fifteen-field declaration and required order " +
    "- exact field types, contract identity and version literals " +
    "- exact reviewer-role, decision, and attestation-lifecycle enums " +
    "- exact decision-attestation, approval, review-session, and reviewer namespace patterns " +
    "- exact timestamp pattern, candidate posture, verification posture, and human/professional-review literal " +
    "- exact generic issuer and provenance reference exclusions " +
    "- exact closed root object shape " +
    "The validator-result schema supplies: " +
    "- exact result `contractKind` and `version` " +
    "- exact four-field result and exact two-field error-item shape " +
    "- exact five code-to-path partitions and success/failure coupling " +
    "The tracked contract and error-path semantics boundaries govern the exact two-phase traversal, duplicate handling, descriptor safety, no-echo, non-mutation, and deep-freeze semantics. The helper must not parse markdown at runtime, read files through `fs`, use network or environment state, create a second schema copy, or introduce a generic JSON Schema dependency.";
  const expectedDecisionFour =
    "The helper is a direct descriptor-safe implementation of the tracked bounded validation algorithm. It may derive immutable field lists, constants, regular expressions, and code/path declarations once at module initialization from the two tracked JSON schema objects. It is not a generic JSON Schema engine. The JSON schemas remain the machine-readable contract authority; the helper performs only the exact algorithm below.";

  assert.equal(
    normalizedSectionBody(docsText, decisionOneStart, decisionTwoStart),
    expectedDecisionOne,
  );
  assert.equal(
    normalizedSectionBody(docsText, decisionTwoStart, decisionThreeStart),
    expectedDecisionTwo,
  );
  assert.equal(
    normalizedSectionBody(docsText, decisionThreeStart, decisionFourStart),
    expectedDecisionThree,
  );
  assert.equal(
    normalizedSectionBody(docsText, decisionFourStart, algorithmStart),
    expectedDecisionFour,
  );
  assert.strictEqual(
    packageSchemas[futureFunctionName],
    validatorModule[futureFunctionName],
  );
  for (const siblingName of retainedPackageSiblingNames) {
    assert.equal(Object.hasOwn(packageSchemas, siblingName), false, siblingName);
  }
});

test("tracked schemas freeze all fields, enums, result fields, codes, and paths", () => {
  assert.deepEqual(candidateSchema.required, declaredFields);
  assert.deepEqual(Object.keys(candidateSchema.properties), declaredFields);
  assert.equal(candidateSchema.additionalProperties, false);
  assert.deepEqual(candidateSchema.properties.reviewer_role.enum, [
    "HUMAN_REVIEWER",
    "PROFESSIONAL_REVIEWER",
  ]);
  assert.deepEqual(candidateSchema.properties.decision.enum, [
    "HUMAN_PROFESSIONAL_GATE_APPROVED",
    "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
    "HUMAN_PROFESSIONAL_GATE_REJECTED",
  ]);
  assert.deepEqual(
    candidateSchema.properties.attestation_lifecycle_posture.enum,
    [
      "DECISION_ATTESTATION_DECLARED_ACTIVE",
      "DECISION_ATTESTATION_DECLARED_INACTIVE",
      "DECISION_ATTESTATION_DECLARED_REVOKED",
    ],
  );
  assert.deepEqual(resultSchema.required, [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.deepEqual(Object.keys(resultSchema.properties), [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.deepEqual(resultSchema.properties.errors.items.required, [
    "code",
    "path",
  ]);
  assert.deepEqual(
    Object.keys(resultSchema.properties.errors.items.properties),
    ["code", "path"],
  );
  const branches = resultSchema.properties.errors.items.oneOf;
  assert.deepEqual(
    branches.map((branch) => branch.properties.code.const),
    errorCodes,
  );
  assert.deepEqual(
    branches.map((branch) => {
      const pathDefinition = branch.properties.path;
      return Object.hasOwn(pathDefinition, "const")
        ? [pathDefinition.const]
        : pathDefinition.enum;
    }),
    exactPathPartitions,
  );
});

test("the complete bounded future algorithm is materially frozen", () => {
  const docsText = readRequired(docsPath);
  const algorithm = sectionBetween(
    docsText,
    "## 7. Exact Future Validation Algorithm",
    "## 8.",
  );
  const root = sectionBetween(
    algorithm,
    "### Root Plain-Object Preflight",
    "### Phase 1:",
  );
  const phaseOne = sectionBetween(algorithm, "### Phase 1:", "### Phase 2:");
  const phaseTwo = sectionBetween(
    algorithm,
    "### Phase 2:",
    "### Pair Deduplication",
  );
  const resultConstruction = sectionBetween(
    algorithm,
    "### Pair Deduplication And Result Construction",
    "FUTURE_VALIDATOR_PHASE_COUNT:",
  );
  const subpasses = sectionBetween(
    phaseOne,
    "Within Phase 1, emission uses these exact subpasses:",
    "FUTURE_VALIDATOR_PHASE_1_SUBPASS_COUNT:",
  );
  const codePaths = sectionBetween(
    algorithm,
    "The complete five-code path partition is:",
    "FUTURE_VALIDATOR_CODE_TO_PATH_PARTITION_COUNT:",
  );
  const cascade = sectionBetween(
    algorithm,
    "The complete fail-closed cascade is:",
    "FUTURE_VALIDATOR_FAIL_CLOSED_CASCADE_RULE_COUNT:",
  );

  assert.deepEqual(bulletItems(root), expectedRootPreflightRules);
  assert.deepEqual(bulletItems(phaseOne), expectedPhaseOneRules);
  assert.deepEqual(numberedProseItems(subpasses), expectedPhaseOneSubpasses);
  assert.deepEqual(numberedInlineCodeItems(phaseOne), declaredFields);
  assert.deepEqual(numberedInlineCodeItems(phaseTwo), duplicateParticipants);
  assert.deepEqual(bulletItems(phaseTwo), expectedPhaseTwoRules);
  assert.deepEqual(
    bulletItems(resultConstruction),
    expectedResultConstructionRules,
  );
  assert.deepEqual(
    codePaths.split("\n").filter((line) => /^\| `[^`]+` \|/u.test(line)),
    expectedCodePathRows,
  );
  assert.deepEqual(numberedProseItems(cascade), expectedCascadeRules);
  for (const [marker, value] of [
    ["FUTURE_VALIDATOR_PHASE_1_SUBPASS_COUNT", 4],
    ["FUTURE_VALIDATOR_DECLARED_FIELD_COUNT", 15],
    ["FUTURE_VALIDATOR_DUPLICATE_PARTICIPANT_COUNT", 6],
    ["FUTURE_VALIDATOR_PHASE_COUNT", 2],
    ["FUTURE_VALIDATOR_ERROR_CODE_COUNT", 5],
    ["FUTURE_VALIDATOR_STATIC_ERROR_PATH_COUNT", 16],
    ["FUTURE_VALIDATOR_INDEXED_PATH_TEMPLATE_COUNT", 0],
    ["FUTURE_VALIDATOR_CODE_TO_PATH_PARTITION_COUNT", 5],
    ["FUTURE_VALIDATOR_FAIL_CLOSED_CASCADE_RULE_COUNT", 5],
  ]) {
    assert.equal(docsText.includes(marker + ":\n" + value), true, marker);
  }
});

test("the prerequisite and implementation scopes are complete and exact", () => {
  const docsText = readRequired(docsPath);
  const scopeSection = sectionBetween(docsText, "## 8.", "## 9.");
  const rows = tableDataRows(scopeSection);

  assert.equal(prerequisitePaths.length, 12);
  assert.deepEqual(rows.slice(0, 12), expectedPrerequisiteRows);
  assert.deepEqual(rows.slice(12), expectedImplementationRows);
  assert.match(docsText, /PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n12/u);
  assert.match(
    docsText,
    /PROOF_TRANSITION_EXISTING_ALIGNMENT_TEST_FILE_COUNT:\n10/u,
  );
  assert.match(
    docsText,
    /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u,
  );
  assert.match(
    docsText,
    /helper implementation slice must not modify any existing file/u,
  );
});

test("the denial inventory is exact before and after its bounded transition", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);
  const inventorySection = sectionBetween(
    docsText,
    "The exact twelve executing assertion sites are:",
    "LIVE_HELPER_PATH_ABSENCE_ASSERTION_SITE_COUNT:",
  );
  const transitionDocumentIsTracked = fs.existsSync(
    absolute(proofTransitionPath),
  );
  const transitionProofIsTracked = fs.existsSync(
    absolute(proofTransitionProofPath),
  );

  assert.equal(transitionDocumentIsTracked, transitionProofIsTracked);
  assert.equal(transitionTestPaths.length, 10);
  assert.deepEqual(tableDataRows(inventorySection), expectedLiveAssertionRows);
  assert.match(
    docsText,
    /LIVE_HELPER_PATH_ABSENCE_ASSERTION_TRANSITION_COUNT:\n32/u,
  );
  assert.match(
    docsText,
    /LIVE_HELPER_PATH_ALIGNMENT_TEST_FILE_COUNT:\n10/u,
  );
  assert.match(
    docsText,
    /LIVE_HELPER_PATH_ABSENCE_ASSERTION_SITE_COUNT:\n12/u,
  );
  assert.match(docsText, /LIVE_HELPER_PATH_CROSS_MONITOR_BINDING_COUNT:\n5/u);

  const sourceByPath = new Map(
    transitionTestPaths.map((relativePath) => [
      relativePath,
      readRequired(relativePath),
    ]),
  );
  for (const source of sourceByPath.values()) {
    for (const futurePath of futureImplementationPaths) {
      assert.equal(source.includes(futurePath), true, futurePath);
    }
  }

  if (!transitionDocumentIsTracked) {
    let sourceSiteCount = 0;
    for (const binding of currentLiveBindings) {
      const source = sourceByPath.get(binding.path);
      const loop =
        "for (const " +
        binding.item +
        " of " +
        binding.collection +
        ") {";
      const liveCall =
        "fs." + "existsSync(absolute(" + binding.item + "))";
      assert.equal(
        countOccurrences(source, loop),
        binding.sourceSites,
        binding.path + ": " + loop,
      );
      if (!binding.skipLiveCallCheck) {
        const liveCallCount = binding.exactCodeLineOnly
          ? countExactCodeLines(
              source,
              "assert.equal(" +
                liveCall +
                ", false, " +
                binding.item +
                ");",
            )
          : countOccurrences(source, liveCall);
        assert.equal(
          liveCallCount,
          binding.liveCallSourceSites ?? binding.sourceSites,
          binding.path + ": " + liveCall,
        );
      }
      sourceSiteCount += binding.sourceSites;
    }
    const crossMonitor = sourceByPath.get(transitionTestPaths[7]);
    assert.equal(
      countOccurrences(
        crossMonitor,
        "path: remainingProofAlignmentPaths[",
      ),
      5,
    );
    assert.equal(
      crossMonitor.includes(
        "const remainingProofAlignmentPaths = proofConflictPaths.slice(0, 5);",
      ),
      true,
    );
    assert.equal(sourceSiteCount, 12);
  } else {
    const transitionText = readRequired(proofTransitionPath);
    readRequired(proofTransitionProofPath);
    for (const futurePath of futureImplementationPaths) {
      assert.equal(
        transitionText.includes(
          "`" + futurePath + "` | `" + proofTransitionStatus + "`",
        ),
        true,
        futurePath,
      );
    }
    for (const binding of currentLiveBindings) {
      const source = sourceByPath.get(binding.path);
      const liveCall =
        "fs." + "existsSync(absolute(" + binding.item + "))";
      assert.equal(countOccurrences(source, liveCall), 0, binding.path);
      assert.equal(source.includes(proofTransitionPath), true, binding.path);
      assert.equal(source.includes(proofTransitionStatus), true, binding.path);
    }
  }

  let executedCheckCount = 0;
  for (const [index, relativePath] of transitionTestPaths.entries()) {
    const futureCalls = executedFuturePathCalls(relativePath);
    const repetitions =
      !transitionDocumentIsTracked && index === 7
        ? 7
        : !transitionDocumentIsTracked
          ? 1
          : 0;
    const expectedPaths = Array.from(
      { length: repetitions },
      () => futureImplementationPaths.map((futurePath) => absolute(futurePath)),
    ).flat();
    assert.deepEqual(
      futureCalls.map((call) => call.path),
      expectedPaths,
      relativePath,
    );
    assert.deepEqual(
      futureCalls.map((call) => call.result),
      expectedPaths.map(() => false),
      relativePath,
    );
    executedCheckCount += futureCalls.length;
  }
  assert.equal(
    executedCheckCount,
    transitionDocumentIsTracked ? 0 : 32,
  );
  assert.equal(proofText.includes("scaffoldFuturePathExistsCalls"), true);
});

test("the historical package-index boundary remains documented while the current static export is exact", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");
  const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js");
  const symbolOccurrences =
    packageIndexText.match(
      /\bvalidateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence\b/gu,
    ) ?? [];

  assert.equal(packageIndexText.split("\n").length - 1, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.equal(symbolOccurrences.length, 3);
  assert.match(
    packageIndexText,
    /\{ validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence \} = require\("\.\/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator\.js"\)/u,
  );
  assert.match(
    packageIndexText,
    /module\.exports\.validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence = validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionAttestationEvidence/u,
  );
  assert.strictEqual(
    packageSchemas[futureFunctionName],
    validatorModule[futureFunctionName],
  );
});

test("future proof families, resolved decisions, and current scope are exact", () => {
  const docsText = readRequired(docsPath);
  const futureProof = sectionBetween(docsText, "## 11.", "## 12.");
  const decisions = sectionBetween(docsText, "## 12.", "## 13.");
  const currentScope = sectionBetween(docsText, "## 13.", "## 14.");
  const proofFamilies = bulletItems(
    sectionBetween(
      futureProof,
      "The focused future helper proof may establish only:",
      "FUTURE_VALIDATOR_FOCUSED_PROOF_FAMILY_COUNT:",
    ),
  );

  assert.deepEqual(proofFamilies, expectedFutureProofFamilies);
  assert.match(
    docsText,
    /FUTURE_VALIDATOR_FOCUSED_PROOF_FAMILY_COUNT:\n15/u,
  );
  assert.deepEqual(tableDataRows(decisions), expectedDecisionRows);
  assert.match(
    docsText,
    /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u,
  );
  assert.deepEqual(numberedInlineCodeItems(currentScope), [docsPath, proofPath]);
  assert.match(
    docsText,
    /CURRENT_VALIDATOR_HELPER_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u,
  );
});

test("non-interference markers and rules are complete", () => {
  const docsText = readRequired(docsPath);
  const nonInterference = sectionBetween(docsText, "## 14.", "## 15.");

  assert.deepEqual(
    numberedProseItems(nonInterference),
    expectedNonInterferenceRules,
  );
  assert.match(docsText, /NON_INTERFERENCE_RULE_COUNT:\n8/u);
  for (const marker of [
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "ATTESTATION_SIGNATURE_OR_ISSUER_VERIFICATION_NOT_CREATED",
    "REVIEWER_AUTHORSHIP_IDENTITY_ROLE_OR_AUTHORITY_EVALUATION_NOT_CREATED",
    "TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "PERSISTENCE_API_SOURCE_PROVIDER_MODEL_INTEGRATION_NOT_CREATED",
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

test("the final no-conclusion boundary and next action remain exact", () => {
  const docsText = readRequired(docsPath);
  const finalBoundary = normalizeWhitespace(
    sectionBetween(
      docsText,
      "## 16. Final No-Conclusion Boundary",
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_STATUS:",
    ).replace("## 16. Final No-Conclusion Boundary", ""),
  );
  const expectedFinalBoundary =
    "This scaffold-scope boundary is not actual human review, professional review, legal review, evidentiary review, technical review, legal advice, professional approval, attestation verification, signature verification, reviewer-authorship verification, issuer-trust verification, provenance verification, identity verification, currentness verification, reviewer-role, qualification or reviewer-authority verification, trusted-time or lifecycle-truth determination, admissibility determination, approval-effect determination, technical sign-off, release approval, product/external-use authorization, compliance certification, security or vulnerability finding, finding, severity, remediation, blocker resolution, evidentiary conclusion, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, handoff approval, case-truth conclusion, source inspection, metadata acquisition, real private run, or real-evidence review.";

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
