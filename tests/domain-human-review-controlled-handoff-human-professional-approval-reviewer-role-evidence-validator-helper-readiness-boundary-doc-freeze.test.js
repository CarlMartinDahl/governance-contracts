"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-helper-readiness-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const semanticsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json";
const resultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-result.json";
const candidateProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-schema.test.js";
const resultProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-result-schema.test.js";
const candidateExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-package-export.test.js";
const resultExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-result-package-export.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const validatorPath =
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.js";
const validatorProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.test.js";
const candidateExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence";
const resultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidatorResult";
const historicalValidatorExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidatorRegistry",
];
const validatorHelperExportName = historicalValidatorExports[1];
const retainedValidatorExports = historicalValidatorExports.filter(
  (name) => name !== validatorHelperExportName,
);
const expectedFactRows = [
  "| root fields | exact fourteen-field declaration order in one flat closed plain-object contract |",
  "| values | exact contract identity, version, reviewer role, lifecycle, verification, review flag, namespace patterns, and generic opaque-reference rules |",
  "| reference scope | exactly eight wrapper reference fields are pairwise compared while external reference equality stays outside structural validation |",
  "| duplicates | locally valid references compare case-sensitively; every later valid exact duplicate is flagged at its own declared path |",
  "| paths | exactly root plus fourteen static field paths with no nested or indexed path family |",
  "| error taxonomy | exact five structural codes with one closed code-to-path partition |",
  "| error order | exact two canonical phases followed by first-occurrence exact `{ code, path }` deduplication |",
  "| cascade | root and field prerequisites suppress only unsafe local checks; external dependency and admissibility checks stay separate |",
  "| unknown properties | one aggregated root error without rejected key, symbol, accessor, or value echo |",
  "| result contract | exact four-field result, closed two-field errors, success/failure coupling, uniqueness, and preserved canonical order |",
  "| safety behavior | all-own-descriptor inspection, no accessor execution, no coercion, no mutation, deterministic no-echo result, cycle-safe failure, and deep immutability |",
];
const expectedReadinessRows = [
  "| candidate contract concrete | `YES_TRACKED` |",
  "| error/result contract concrete | `YES_TRACKED` |",
  "| candidate and result schemas tracked | `YES_TRACKED` |",
  "| static schema package exports tracked | `YES_TRACKED` |",
  "| validator module/package path frozen | `NO_OPEN` |",
  "| exact public helper/export surface frozen | `NO_OPEN` |",
  "| authoritative validation machine sources frozen | `NO_OPEN` |",
  "| helper/schema relationship frozen | `NO_OPEN` |",
  "| exact implementation and proof file scope frozen | `NO_OPEN` |",
  "| existing denial-test transitions frozen | `NO_OPEN` |",
  "| line-sensitive package-index edit method frozen | `NO_OPEN` |",
  "| exact validator/result-schema conformance proof frozen | `NO_OPEN` |",
];
const expectedDecisionRows = [
  "| 1 | exact package and module path | schemas and governance packages have different ownership roles |",
  "| 2 | exact public helper and export surface | internal-only and package-index exports have different API effects |",
  "| 3 | authoritative validation machine sources | schema-derived rules and duplicated constants have different drift risks |",
  "| 4 | helper/schema relationship | bounded direct validation and generic schema execution are different contracts |",
  "| 5 | exact implementation and proof file set | line-sensitive and denial proofs create hidden dependencies |",
  "| 6 | exact existing-test denial transitions | only superseded denials may be narrowed |",
  "| 7 | package-index edit and line-count preservation | tracked 13165-line proofs must remain green |",
  "| 8 | exact validator/result-schema conformance proof | returned objects must match the result contract without claiming certification |",
];
const expectedNonInterferenceRules = [
  "- preserve both schemas and both static package exports unchanged",
  "- preserve exact fields, values, references, five codes, fifteen static paths, two phases, cascade, deduplication, and safety behavior",
  "- select no package placement, public exports, machine sources, schema relationship, implementation scope, denial transition, or conformance proof",
  "- create no implementation, helper, validator, dispatch, registry, checkpoint, identity verifier, currentness evaluator, role or authority resolver, approval effect, handoff, delivery, release, API, persistence, provider, model, source inspection, or runtime behavior",
  "- create no approval, sign-off, certification, legal or evidentiary conclusion, finding, score, severity, remediation, blocker resolution, product candidate, or external-use authorization",
  "- create no security or vulnerability finding and no security approval",
  "- inspect no raw, private, source, source-package, case, identity, authorship, credential, PDF, image, screenshot, metadata, or real-evidence material",
  "- acquire no metadata and execute no real private, source, case, identity-provider, credential, or real-evidence run",
  "- reopen no closed reviewer role contract, error-path, schema, export, approval, cross-reference, or admissibility semantics",
  "- preserve human/professional review as the release gate",
];

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

test("reviewer role validator-helper readiness sources and boundary are exact", () => {
  const docsText = readRequired(docsPath);
  const sources = [
    contractPath,
    semanticsPath,
    candidateSchemaPath,
    resultSchemaPath,
    candidateProofPath,
    resultProofPath,
    packageIndexPath,
    candidateExportProofPath,
    resultExportProofPath,
  ];

  for (const sourcePath of sources) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY",
    "VALIDATION_CONTRACT_FACTS_COMPLETE",
    "VALIDATOR_HELPER_NOT_IMPLEMENTATION_READY",
    "EIGHT_SCOPE_DECISIONS_OPEN",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("eleven concrete facts preserve the selected validation semantics", () => {
  const docsText = readRequired(docsPath);
  const semanticsText = readRequired(semanticsPath);
  const facts = sectionBetween(
    docsText,
    "## 3. Concrete Contract Facts",
    "## 4.",
  );
  const factRows = facts.split("\n").filter((line) => /^\| [a-z]/u.test(line));

  assert.deepEqual(factRows, expectedFactRows);
  assert.match(facts, /CONCRETE_VALIDATION_CONTRACT_FACT_COUNT:\n11/u);
  assert.match(semanticsText, /OPEN_ERROR_PATH_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(semanticsText, /VALIDATOR_ERROR_CODE_COUNT:\n5/u);
  assert.match(semanticsText, /CANONICAL_STATIC_ERROR_PATH_COUNT:\n15/u);
  assert.match(semanticsText, /CANONICAL_INDEXED_PATH_TEMPLATE_COUNT:\n0/u);
  assert.match(semanticsText, /CANONICAL_VALIDATION_PHASE_COUNT:\n2/u);
});

test("static schemas and historical validator absence remain documented while the package helper is reference-equal", () => {
  const docsText = readRequired(docsPath);
  const candidateSchema = require("../" + candidateSchemaPath);
  const resultSchema = require("../" + resultSchemaPath);
  const validatorModule = require("../" + validatorPath);
  const indexText = readRequired(packageIndexPath);

  assert.strictEqual(packageSchemas[candidateExportName], candidateSchema);
  assert.strictEqual(packageSchemas[resultExportName], resultSchema);
  assert.equal(indexText.split("\n").length - 1, 13165);
  for (const historicalExport of historicalValidatorExports) {
    assert.equal(docsText.includes("`" + historicalExport + "`"), true, historicalExport);
  }
  for (const retainedExport of retainedValidatorExports) {
    assert.equal(Object.hasOwn(packageSchemas, retainedExport), false, retainedExport);
  }
  assert.strictEqual(
    packageSchemas[validatorHelperExportName],
    validatorModule[validatorHelperExportName],
  );
  for (const absentPath of [validatorPath, validatorProofPath]) {
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" + absentPath + "` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE`",
      ),
      true,
      absentPath,
    );
    assert.equal(docsText.includes("`" + absentPath + "`"), true, absentPath);
  }
});

test("readiness is blocked by exactly eight open scope decisions", () => {
  const docsText = readRequired(docsPath);
  const matrix = sectionBetween(docsText, "## 5. Readiness Matrix", "## 6.");
  const decisions = sectionBetween(
    docsText,
    "## 6. Eight Open Scope Decisions",
    "## 7.",
  );
  const readinessRows = matrix
    .split("\n")
    .filter((line) => /^\| [a-z]/u.test(line));
  const decisionRows = decisions
    .split("\n")
    .filter((line) => /^\| \d+ \|/u.test(line));

  assert.deepEqual(readinessRows, expectedReadinessRows);
  assert.deepEqual(decisionRows, expectedDecisionRows);
  assert.match(
    matrix,
    /VALIDATOR_HELPER_READINESS:\nBLOCKED_BY_EXACT_SCOPE_DECISIONS/u,
  );
  assert.match(decisions, /OPEN_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_DOCS_ONLY/u,
  );
});

test("readiness scope is exact docs-only and creates no authorization", () => {
  const docsText = readRequired(docsPath);
  const scope = sectionBetween(docsText, "## 8. Exact Current Scope", "## 9.");
  const nonInterference = sectionBetween(
    docsText,
    "## 9. Non-Interference Rules",
    "## 10.",
  );
  const nonInterferenceRules = nonInterference
    .split("\n")
    .filter((line) => line.startsWith("- "));

  assert.match(scope, /CURRENT_VALIDATOR_HELPER_READINESS_FILE_COUNT:\n2/u);
  assert.deepEqual(nonInterferenceRules, expectedNonInterferenceRules);
  for (const currentPath of [docsPath, proofPath]) {
    assert.equal(scope.includes("`" + currentPath + "`"), true, currentPath);
    readRequired(currentPath);
  }
  for (const marker of [
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_EXPORT_NOT_CREATED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "IDENTITY_VERIFICATION_NOT_CREATED",
    "CURRENTNESS_ROLE_OR_AUTHORITY_EVALUATION_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
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
    "TRACKED_DOCS_ONLY_VALIDATOR_HELPER_READINESS_BLOCKED_BY_SCOPE_DECISIONS",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});
