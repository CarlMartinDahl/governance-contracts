"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json";
const packageIndexPath = "packages/schemas/src/index.js";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-contract-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  candidateSchemaPath,
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  readinessPath,
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  packageIndexPath,
];
const conventionPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-brief-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
];
const currentPaths = [docsPath, proofPath];
const futureSchemaPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema.test.js",
];
const retainedSiblingPaths = [
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.test.js",
];
const candidatePackageExportProofPath = retainedSiblingPaths[0];
const validatorResultPackageExportProofPath = retainedSiblingPaths[1];
const retainedValidatorPaths = retainedSiblingPaths.slice(2);
const allLaterPaths = [...futureSchemaPaths, ...retainedSiblingPaths];
const proofConflictPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  proofPath,
];
const remainingProofAlignmentPaths = proofConflictPaths.slice(0, 4);
const prerequisiteCurrentPaths = [proofTransitionPath, proofPath];
const rootKeywords = [
  "$schema",
  "$id",
  "title",
  "type",
  "additionalProperties",
  "required",
  "properties",
  "oneOf",
];
const rootFieldPaths = [
  "$.contract_id",
  "$.contract_version",
  "$.reviewer_identity_evidence_ref",
  "$.approval_ref",
  "$.review_session_ref",
  "$.reviewer_ref",
  "$.actor_identity_evidence_ref",
  "$.binding_issuer_ref",
  "$.binding_provenance_ref",
  "$.binding_lifecycle_posture",
  "$.verification_posture",
  "$.human_professional_review_required",
];
const candidateFields = rootFieldPaths.map((fieldPath) => fieldPath.slice(2));
const duplicateReferencePaths = rootFieldPaths.slice(2, 9);
const forbiddenValidatorResultKeys = [
  "valid",
  "contractKind",
  "version",
  "errors",
  "code",
  "path",
];
const errorsKeywords = ["type", "uniqueItems", "items"];
const errorItemKeywords = [
  "type",
  "additionalProperties",
  "required",
  "properties",
  "oneOf",
];
const futureFileTable = [
  "| Position | Future path | Classification |",
  "| --- | --- | --- |",
  "| 1 | `schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result.json` | `FUTURE_CONTRACT_ONLY_SCHEMA_CANDIDATE` |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema.test.js` | `FUTURE_CONTRACT_ONLY_PROOF_TEST_CANDIDATE` |",
];
const identityTable = [
  "| Keyword | Exact future value |",
  "| --- | --- |",
  "| `$schema` | `https://json-schema.org/draft/2020-12/schema` |",
  "| `$id` | `https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result.json` |",
  "| `title` | `Human Review Controlled Handoff Human/Professional Approval Reviewer Identity Evidence Validator Result Contract` |",
  "| `type` | `object` |",
  "| `additionalProperties` | `false` |",
];
const rootTable = [
  "| Position | Property | Type | Root constraint |",
  "| --- | --- | --- | --- |",
  "| 1 | `valid` | boolean | constrained by the exact two-state root `oneOf` |",
  "| 2 | `contractKind` | string | `const: \"HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_BOUNDARY\"` |",
  "| 3 | `version` | string | `const: \"1.0.0\"` |",
  "| 4 | `errors` | array | exact inline error items and `uniqueItems: true` |",
];
const stateTable = [
  "| Position | Result state | Exact branch constraints |",
  "| --- | --- | --- |",
  "| 1 | success | `valid const true`; `errors maxItems 0` |",
  "| 2 | failure | `valid const false`; `errors minItems 1` |",
];
const inlineItemRules = [
  '`type: "object"`',
  "`additionalProperties: false`",
  '`required: ["code", "path"]`',
  "`properties` declared in the order `code`, then `path`",
  "both properties typed as strings",
  "one item-level `oneOf` containing the exact five code-to-path branches in Section 9",
];
const branchTable = [
  "| Position | Code const | Exact path constraint | Path count |",
  "| --- | --- | --- | --- |",
  "| 1 | `required_field_missing` | ordered enum of all twelve root-field paths from Section 8 | 12 |",
  "| 2 | `unexpected_field` | `const: \"$\"` | 1 |",
  "| 3 | `invalid_field_type` | ordered enum of `$` followed by all twelve root-field paths from Section 8 | 13 |",
  "| 4 | `invalid_field_value` | ordered enum of all twelve root-field paths from Section 8 | 12 |",
  "| 5 | `duplicate_reference` | ordered enum of all seven duplicate-reference paths from Section 8 | 7 |",
];
const validatorOnlyRules = [
  "two-phase validation execution and canonical error emission order",
  "root preflight and prerequisite-gated missing, type, value, and duplicate cascade",
  "first-occurrence exact `{ code, path }` deduplication behavior",
  "actual pairwise duplicate-reference detection across seven candidate fields",
  "descriptor-safe inspection, accessor non-execution, and prototype handling",
  "input non-mutation, no coercion, and insertion-order independence",
  "deterministic result construction and recursive result immutability",
  "no-echo behavior during validation execution",
  "internal execution-failure handling",
  "identity authenticity, professional qualification, reviewer role, reviewer authority, lifecycle currentness, reference resolution, admissibility, approval effect, handoff eligibility, export, delivery, or release",
];
const siblingTable = [
  "| Surface | Scope status |",
  "| --- | --- |",
  "| reviewer identity evidence candidate schema | `TRACKED_UNEXPORTED_SEPARATE_CONTRACT_ONLY` |",
  "| candidate package schema-object export | `SEPARATE_LATER_CONTRACT_ONLY_SLICE` |",
  "| validator-result schema | `FUTURE_SEPARATE_CONTRACT_ONLY_SLICE` |",
  "| validator-result package schema-object export | `SEPARATE_LATER_CONTRACT_ONLY_SLICE` |",
  "| structural validator helper and proof | `SEPARATE_LATER_SLICE_NOT_AUTHORIZED` |",
  "| validator dispatch or registry | `SEPARATE_LATER_SLICE_NOT_AUTHORIZED` |",
  "| cross-reference or admissibility checkpoint | `SEPARATE_LATER_SLICE_NOT_AUTHORIZED` |",
  "| identity, currentness, role, or authority evaluation | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| approval effect, handoff, export, delivery, or release | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
];
const futureProofScope = [
  "the schema parses as JSON and has the exact Draft 2020-12 identity, title, root type, root closure, and root keyword order in Section 4",
  "root `required` and `properties` order, types, identity literals, and four fields are exact",
  "root `oneOf` has exactly the two success/failure branches in Section 6",
  "`errors` has exact `type`, `uniqueItems`, `items` order",
  "`errors.items` is the exact closed inline two-field object, has no `$defs`, and preserves the exact keyword and property order in Section 7",
  "all thirteen static paths, twelve root-field paths, and seven duplicate-reference paths are exact and no indexed path pattern exists",
  "item `oneOf` has exactly the five complete code/path branches in Section 9",
  "`uniqueItems: true` is exact",
  "structurally canonical success and representative failure objects for all five code/path branches are accepted",
  "missing or extra fields, wrong identity literals, invalid state coupling, unknown codes, unknown paths, invalid code/path pairs, extra error fields, and duplicate identical errors are rejected",
  "neither package export, validator, dispatch, checkpoint, identity evaluation, authority evaluation, approval effect, source use, execution, nor runtime behavior is created by that slice",
];
const futureProofProhibition =
  "The proof must not import a future validator helper, execute validation, inspect source or private content, or claim validator correctness, canonical runtime ordering, identity authenticity, professional qualification, reviewer role, reviewer authority, lifecycle currentness, reference existence, admissibility, approval effect, handoff eligibility, legal correctness, evidentiary sufficiency, professional approval, technical sign-off, release readiness, product readiness, external-use authorization, blocker closure, compliance, or case truth.";
const resolvedTable = [
  "| Position | Readiness question | Scoped answer |",
  "| --- | --- | --- |",
  "| 1 | schema identity, reserved paths, and focused proof path | exact values in Sections 3 and 4 |",
  "| 2 | root keyword/property order and success/failure coupling | exact order and two branches in Sections 4 through 6 |",
  "| 3 | inline item order, five code/path branches, and no indexed paths | exact item, branches, and ordered sets in Sections 7 through 9 |",
  "| 4 | structurally duplicate exact error items | rejected with `uniqueItems: true` in Section 10 |",
  "| 5 | candidate and validator-result package exports | both excluded as separate later sibling slices in Section 12 |",
  "| 6 | proof fixtures, proof limits, and sibling absences | exact structural-only scope and transition gate in Sections 13, 14, and 16 |",
];
const transitionConflictTable = [
  "| Surface | Current proof posture | Required transition posture |",
  "| --- | --- | --- |",
  "| historical boundary markers | schema and proof absent in each originating slice | preserve unchanged |",
  "| six reserved later-path references in scaffold scope | all six documented | preserve unchanged |",
  "| direct scaffold-scope proof candidate-path absence | asserted for two schema candidate paths | narrow in this slice |",
  "| four earlier proof candidate-path absences | asserted | retain pending separate focused alignments |",
  "| four package-export-proof and validator sibling absences | asserted | retain live absence |",
];
const candidateTransitionTable = [
  "| Position | Reserved candidate path | Transition status |",
  "| --- | --- | --- |",
  "| 1 | `schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result.json` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE` |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema.test.js` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE` |",
];
const retainedSiblingTransitionTable = [
  "| Position | Retained absent path | Retained status |",
  "| --- | --- | --- |",
  "| 1 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-package-export.test.js` | `RETAIN_LIVE_ABSENCE_ASSERTION` |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-package-export.test.js` | `RETAIN_LIVE_ABSENCE_ASSERTION` |",
  "| 3 | `packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.js` | `RETAIN_LIVE_ABSENCE_ASSERTION` |",
  "| 4 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.test.js` | `RETAIN_LIVE_ABSENCE_ASSERTION` |",
];
const remainingAlignmentTable = [
  "| Position | Proof path | Required bounded action |",
  "| --- | --- | --- |",
  "| 1 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js` | preserve candidate-schema scaffold history and four sibling absences; align only the two validator-result candidate paths |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js` | preserve candidate-schema structural proof and four sibling absences; align only the two validator-result candidate paths |",
  "| 3 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js` | preserve validator error/path semantics and four sibling absences; align only the two validator-result candidate paths |",
  "| 4 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js` | preserve readiness history and four sibling absences; align only the two validator-result candidate paths |",
];
const currentPrerequisiteTable = [
  "| Position | Current path | Exact action |",
  "| --- | --- | --- |",
  "| 1 | `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md` | create this docs-only prerequisite |",
  "| 2 | `tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js` | preserve scaffold semantics while narrowing only two live candidate-path absence assertions |",
];
const directTransitionSteps = [
  "keep the exact two-path validator-result schema candidate list",
  "keep the exact four-path package-export-proof and validator sibling list",
  "continue proving that the historical scaffold document references all six paths",
  "read this prerequisite as the controlling live proof-transition source",
  "prove the exact five-file live conflict inventory",
  "prove the exact candidate status for both schema candidate paths",
  "stop checking live filesystem absence for only those two candidate paths",
  "prove the exact four-file remaining alignment inventory",
  "prove the retained status and live absence for all four sibling paths",
  "preserve every schema-representation and no-overclaim assertion unchanged",
];
const transitionNonInterferenceRules = [
  "preserve every historical contract, readiness, error-semantics, and scaffold marker",
  "preserve all six reserved later-path references in the scaffold boundary",
  "narrow only the two candidate-path live absence assertions in the direct scaffold proof",
  "retain all four additional proof-alignment gates",
  "retain all four package-export-proof and validator sibling live absences",
  "create no schema, schema proof, package export, validator, or dispatch",
  "create no checkpoint, identity verification, currentness evaluation, role resolution, authority resolution, admissibility, approval effect, persistence, audit, handoff, export, delivery, recipient, release, API, UI, or runtime behavior",
  "inspect or process no raw, private, source, case, identity-provider, credential, authorship, or real-evidence material",
  "create no finding, score, conclusion, approval, certification, readiness, or external-use claim",
  "preserve human and professional review as release gates",
];
const nonInterferenceRules = [
  "preserve the reviewer identity evidence contract, candidate schema, candidate schema proof, error-path semantics boundary, and readiness boundary unchanged",
  "do not create or modify any JSON Schema file",
  "do not modify `packages/schemas/src/index.js`",
  "do not create a candidate or validator-result package export",
  "do not create a validator, dispatch, registry, caller, or helper",
  "do not create a cross-reference or admissibility checkpoint",
  "do not create identity verification, currentness evaluation, role resolution, authority resolution, approval effect, handoff, export, delivery, recipient, release, persistence, API, route, UI, audit, provider, model, or executed-run behavior",
  "do not inspect or process raw, private, source, case, identity-provider, credential, or real-evidence material",
  "do not claim that schema structure enforces validator ordering, cascade, duplicate-reference detection, descriptor safety, no-echo, immutability, identity, currentness, role, authority, admissibility, approval effect, or release",
  "preserve human/professional review as the release gate",
];
const finalNoConclusionBoundary =
  "This scaffold-scope boundary is not actual human review, professional review, legal review, technical review, evidentiary review, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, admissibility evidence, approval effect, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, case-truth conclusion, or real-evidence review.";
const transitionFinalNoConclusionBoundary =
  "This proof-transition prerequisite is not actual human review, professional review, legal review, evidentiary review, technical review, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, ownership determination, credibility assessment, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, fingerprint proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, handoff approval, case-truth conclusion, or real-evidence review.";

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

function tableLines(section) {
  return section.split("\n").filter((line) => line.startsWith("|"));
}

function numberedListLines(section) {
  return section.split("\n").filter((line) => /^\d+\. /u.test(line));
}

function exactNumberedBacktickLines(values) {
  return values.map((value, index) => String(index + 1) + ". `" + value + "`");
}

function exactNumberedLines(values) {
  return values.map((value, index) => String(index + 1) + ". " + value);
}

function bulletListItems(section) {
  const items = [];

  for (const line of section.split("\n")) {
    if (line.startsWith("- ")) {
      items.push(line.slice(2).trim());
    } else if (items.length > 0 && line.trim() !== "") {
      items[items.length - 1] += " " + line.trim();
    }
  }
  return items;
}

function hasOwnKeyDeep(value, key) {
  if (Array.isArray(value)) {
    return value.some((item) => hasOwnKeyDeep(item, key));
  }
  if (value === null || typeof value !== "object") {
    return false;
  }
  if (Object.prototype.hasOwnProperty.call(value, key)) {
    return true;
  }
  return Object.values(value).some((item) => hasOwnKeyDeep(item, key));
}

test("scaffold scope and every canonical source exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [...controllingPaths, ...conventionPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_SCHEMA_SCAFFOLD_SCOPE",
    "VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
    "OWNER_SELECTED_OPTION_A_APPLIED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("future two-file scope identity and root keyword order are exact", () => {
  const docsText = readRequired(docsPath);
  const fileSection = sectionBetween(docsText, "## 3. Exact Future File Scope", "## 4.");
  const identitySection = sectionBetween(
    docsText,
    "## 4. Exact Future Schema Identity And Root Keyword Order",
    "## 5.",
  );
  const keywordSection = sectionBetween(
    identitySection,
    "The future schema root must preserve this exact keyword order:",
    "FUTURE_VALIDATOR_RESULT_ROOT_KEYWORD_COUNT:",
  );

  assert.deepEqual(tableLines(fileSection), futureFileTable);
  assert.deepEqual(
    numberedListLines(keywordSection),
    exactNumberedBacktickLines(rootKeywords),
  );
  assert.deepEqual(tableLines(identitySection), identityTable);
  assert.match(fileSection, /FUTURE_VALIDATOR_RESULT_SCHEMA_SLICE_FILE_COUNT:\n2/u);
  assert.match(identitySection, /FUTURE_VALIDATOR_RESULT_ROOT_KEYWORD_COUNT:\n8/u);
});

test("candidate schema remains exact and separate with historical export posture preserved", () => {
  const docsText = readRequired(docsPath);
  const candidateSchema = require("../" + candidateSchemaPath);
  const proofText = readRequired(proofPath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );

  assert.deepEqual(candidateSchema.required, candidateFields);
  assert.deepEqual(Object.keys(candidateSchema.properties), candidateFields);
  for (const forbiddenKey of forbiddenValidatorResultKeys) {
    assert.equal(hasOwnKeyDeep(candidateSchema, forbiddenKey), false, forbiddenKey);
  }
  assert.equal(
    packageExportTransitionText.includes(
      "`humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidence`",
    ),
    true,
  );
  assert.match(
    packageExportTransitionText,
    /HISTORICAL_CANDIDATE_SCHEMA_UNEXPORTED_MARKERS_PRESERVED/u,
  );
  assert.equal(
    proofText.includes(
      "packageIndex" + "Text.includes(path.basename(candidateSchemaPath))",
    ),
    false,
  );
  assert.match(
    docsText,
    /CANDIDATE_PACKAGE_SCHEMA_EXPORT_INCLUDED_IN_FUTURE_SCHEMA_SLICE:\nFALSE/u,
  );
  assert.match(
    docsText,
    /VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_INCLUDED_IN_FUTURE_SCHEMA_SLICE:\nFALSE/u,
  );
});

test("closed root states and inline error item are exact", () => {
  const docsText = readRequired(docsPath);
  const rootSection = sectionBetween(docsText, "## 5. Exact Future Root Shape", "## 6.");
  const stateSection = sectionBetween(
    docsText,
    "## 6. Exact Two-State Root Encoding",
    "## 7.",
  );
  const itemSection = sectionBetween(
    docsText,
    "## 7. Exact Errors Array And Inline Error-Item Shape",
    "## 8.",
  );
  const errorsKeywordSection = sectionBetween(
    itemSection,
    "The future `errors` property must preserve this exact keyword order:",
    "FUTURE_VALIDATION_ERRORS_KEYWORD_COUNT:",
  );
  const itemKeywordSection = sectionBetween(
    itemSection,
    "`errors.items` must be one inline exact object schema with this keyword order:",
    "FUTURE_VALIDATION_ERROR_ITEM_KEYWORD_COUNT:",
  );
  const inlineRulesSection = sectionBetween(
    itemSection,
    "The inline item must use:",
    "FUTURE_VALIDATION_ERROR_ITEM_REQUIRED_PROPERTY_COUNT:",
  );

  assert.deepEqual(tableLines(rootSection), rootTable);
  assert.deepEqual(tableLines(stateSection), stateTable);
  assert.deepEqual(
    numberedListLines(errorsKeywordSection),
    exactNumberedBacktickLines(errorsKeywords),
  );
  assert.deepEqual(
    numberedListLines(itemKeywordSection),
    exactNumberedBacktickLines(errorItemKeywords),
  );
  assert.deepEqual(bulletListItems(inlineRulesSection), inlineItemRules);
  assert.match(rootSection, /FUTURE_VALIDATOR_RESULT_REQUIRED_PROPERTY_COUNT:\n4/u);
  assert.match(rootSection, /FUTURE_VALIDATOR_RESULT_ADDITIONAL_PROPERTIES:\nFALSE/u);
  assert.match(stateSection, /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_COUNT:\n2/u);
  assert.match(itemSection, /FUTURE_VALIDATION_ERRORS_KEYWORD_COUNT:\n3/u);
  assert.match(itemSection, /FUTURE_VALIDATION_ERROR_ITEM_KEYWORD_COUNT:\n5/u);
  assert.match(itemSection, /FUTURE_VALIDATION_ERROR_ITEM_DEFS_COUNT:\n0/u);
});

test("static paths and five code-to-path branches are exact", () => {
  const docsText = readRequired(docsPath);
  const pathSection = sectionBetween(
    docsText,
    "## 8. Exact Ordered Static Path Sets",
    "## 9.",
  );
  const rootPathSection = sectionBetween(
    pathSection,
    "The exact root-field paths, in contract order, are:",
    "The exact duplicate-reference paths, in participant declaration order, are:",
  );
  const duplicatePathSection = sectionBetween(
    pathSection,
    "The exact duplicate-reference paths, in participant declaration order, are:",
    "FUTURE_VALIDATION_ERROR_ROOT_PATH_COUNT:",
  );
  const branchSection = sectionBetween(
    docsText,
    "## 9. Exact Five Code-To-Path Branches",
    "## 10.",
  );

  assert.deepEqual(
    numberedListLines(rootPathSection),
    exactNumberedBacktickLines(rootFieldPaths),
  );
  assert.deepEqual(
    numberedListLines(duplicatePathSection),
    exactNumberedBacktickLines(duplicateReferencePaths),
  );
  assert.deepEqual(tableLines(branchSection), branchTable);
  for (const marker of [
    "FUTURE_VALIDATION_ERROR_ROOT_PATH_COUNT:\n1",
    "FUTURE_VALIDATION_ERROR_ROOT_FIELD_PATH_COUNT:\n12",
    "FUTURE_VALIDATION_ERROR_DUPLICATE_REFERENCE_PATH_COUNT:\n7",
    "FUTURE_VALIDATION_ERROR_STATIC_PATH_COUNT:\n13",
    "FUTURE_VALIDATION_ERROR_INDEXED_PATH_PATTERN_COUNT:\n0",
    "FUTURE_VALIDATION_ERROR_PATH_TEMPLATE_COUNT:\n13",
    "FUTURE_VALIDATION_ERROR_CODE_PATH_BRANCH_COUNT:\n5",
    "REQUIRED_FIELD_MISSING_PATH_ENUM_COUNT:\n12",
    "UNEXPECTED_FIELD_PATH_CONST_COUNT:\n1",
    "INVALID_FIELD_TYPE_PATH_ENUM_COUNT:\n13",
    "INVALID_FIELD_VALUE_PATH_ENUM_COUNT:\n12",
    "DUPLICATE_REFERENCE_PATH_ENUM_COUNT:\n7",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(pathSection, /No\nregex, indexed path template/u);
  assert.match(branchSection, /would admit invalid code\/path cross-pairs/u);
});

test("structural uniqueness stays separate from validator identity and approval behavior", () => {
  const docsText = readRequired(docsPath);
  const duplicateSection = sectionBetween(
    docsText,
    "## 10. Exact Structural Duplicate Boundary",
    "## 11.",
  );
  const validatorSection = sectionBetween(
    docsText,
    "## 11. Validator-Only And Identity/Approval-Only Rules Kept Outside Schema",
    "## 12.",
  );
  const validatorRulesSection = sectionBetween(
    validatorSection,
    "The future schema must not claim to enforce:",
    "SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:",
  );

  assert.match(
    duplicateSection,
    /FUTURE_VALIDATION_ERROR_ARRAY_UNIQUE_ITEMS:\nTRUE/u,
  );
  assert.deepEqual(bulletListItems(validatorRulesSection), validatorOnlyRules);
  assert.match(validatorSection, /SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:\nTRUE/u);
  assert.match(
    validatorSection,
    /SCHEMA_DOES_NOT_CREATE_IDENTITY_OR_AUTHORITY_PROOF:\nTRUE/u,
  );
  assert.match(validatorSection, /SCHEMA_DOES_NOT_CREATE_APPROVAL_EFFECT:\nTRUE/u);
});

test("proof scope transition gate siblings and six resolutions remain exact", () => {
  const docsText = readRequired(docsPath);
  const readinessText = readRequired(readinessPath);
  const siblingSection = sectionBetween(
    docsText,
    "## 12. Separate Sibling Surfaces And Export Boundary",
    "## 13.",
  );
  const proofSection = sectionBetween(
    docsText,
    "## 13. Exact Future Structural Proof Scope",
    "## 14.",
  );
  const proofAllowedSection = sectionBetween(
    proofSection,
    "The future focused schema proof may establish only:",
    "The proof must not import a future validator helper",
  );
  const proofProhibitionSection = sectionBetween(
    docsText,
    "The proof must not import a future validator helper",
    "## 14. Required Proof-Transition Prerequisite",
  );
  const transitionSection = sectionBetween(
    docsText,
    "## 14. Required Proof-Transition Prerequisite",
    "## 15.",
  );
  const resolvedSection = sectionBetween(
    docsText,
    "## 15. Resolved Readiness Questions",
    "## 16.",
  );

  assert.deepEqual(tableLines(siblingSection), siblingTable);
  assert.deepEqual(bulletListItems(proofAllowedSection), futureProofScope);
  assert.equal(
    proofProhibitionSection.replace(/\s+/gu, " ").trim(),
    futureProofProhibition,
  );
  assert.deepEqual(tableLines(resolvedSection), resolvedTable);
  assert.match(
    transitionSection,
    /VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_REQUIRED:\nTRUE/u,
  );
  assert.match(
    transitionSection,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT_REQUIRED:\n2/u,
  );
  assert.match(
    transitionSection,
    /RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT_REQUIRED:\n4/u,
  );
  assert.match(
    resolvedSection,
    /RESOLVED_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  assert.match(
    readinessText,
    /OPEN_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
});

test("proof transition prerequisite freezes the five-file conflict and exact 2/4 partition", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const scaffoldProofText = readRequired(proofPath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const inventorySection = sectionBetween(
    transitionText,
    "The exact five live proof surfaces identified by repository inspection are:",
    "VALIDATOR_RESULT_SCHEMA_LIVE_PROOF_CONFLICT_COUNT:",
  );
  const conflictSection = sectionBetween(
    transitionText,
    "## 3. Exact Conflict Classification",
    "## 4.",
  );
  const candidateSection = sectionBetween(
    transitionText,
    "## 4. Two Candidate Paths Narrowed In The Direct Scaffold Proof",
    "## 5.",
  );
  const retainedSection = sectionBetween(
    transitionText,
    "## 5. Four Retained Live Absence Requirements",
    "## 6.",
  );
  const remainingSection = sectionBetween(
    transitionText,
    "## 6. Four Remaining Focused Proof Alignments",
    "## 7.",
  );
  const currentScopeSection = sectionBetween(
    transitionText,
    "## 7. Exact Current Two-File Scope",
    "## 8.",
  );
  const directSection = sectionBetween(
    transitionText,
    "## 8. Exact Direct-Proof Transition",
    "## 9.",
  );
  const directStepsSection = sectionBetween(
    directSection,
    "The existing validator-result scaffold-scope proof must:",
    "DIRECT_SCAFFOLD_PROOF_TRANSITION_STEP_COUNT:",
  );
  const nonInterferenceSection = sectionBetween(
    transitionText,
    "## 10. Non-Interference And Proof Boundary",
    "The transitioned proof may establish only",
  );
  const finalBoundarySection = sectionBetween(
    transitionText,
    "This proof-transition prerequisite is not actual human review",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:",
  );

  assert.deepEqual(
    numberedListLines(inventorySection),
    exactNumberedBacktickLines(proofConflictPaths),
  );
  for (const conflictPath of proofConflictPaths) {
    readRequired(conflictPath);
  }
  assert.deepEqual(tableLines(conflictSection), transitionConflictTable);
  assert.deepEqual(tableLines(candidateSection), candidateTransitionTable);
  assert.deepEqual(
    tableLines(retainedSection),
    retainedSiblingTransitionTable,
  );
  assert.deepEqual(tableLines(remainingSection), remainingAlignmentTable);
  assert.deepEqual(tableLines(currentScopeSection), currentPrerequisiteTable);
  assert.deepEqual(
    numberedListLines(directStepsSection),
    exactNumberedLines(directTransitionSteps),
  );
  assert.deepEqual(
    bulletListItems(nonInterferenceSection),
    transitionNonInterferenceRules,
  );
  assert.equal(
    finalBoundarySection.replace(/\s+/gu, " ").trim(),
    transitionFinalNoConclusionBoundary,
  );

  for (const candidatePath of futureSchemaPaths) {
    assert.equal(docsText.includes("`" + candidatePath + "`"), true, candidatePath);
    assert.equal(
      transitionText.includes(
        "`" +
          candidatePath +
          "` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  assert.equal(
    scaffoldProofText.includes("fs." + "existsSync(absolute(futurePath))"),
    false,
  );
  for (const retainedPath of retainedValidatorPaths) {
    assert.equal(docsText.includes("`" + retainedPath + "`"), true, retainedPath);
    assert.equal(
      transitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" + retainedPath + "` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE`",
      ),
      true,
      retainedPath,
    );
  }
  assert.equal(
    packageExportTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" + candidatePackageExportProofPath + "`",
    ),
    true,
  );
  assert.equal(
    scaffoldProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n7/u,
  );
  assert.match(
    packageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n6/u,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`" + validatorResultPackageExportProofPath + "`",
    ),
    true,
  );
  assert.equal(
    scaffoldProofText.includes(
      "fs." +
        "existsSync(absolute(validatorResultPackageExportProofPath))",
    ),
    false,
  );
  assert.equal(
    scaffoldProofText.includes(
      "packageIndex" +
        "Text.includes(path.basename(futureSchemaPaths[0]))",
    ),
    false,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  for (const remainingPath of remainingProofAlignmentPaths) {
    assert.equal(transitionText.includes("`" + remainingPath + "`"), true);
  }
  for (const currentPath of prerequisiteCurrentPaths) {
    readRequired(currentPath);
  }
  for (const marker of [
    "DOCS_ONLY",
    "HISTORICAL_SCHEMA_ABSENCE_MARKERS_PRESERVED",
    "VALIDATOR_RESULT_SCHEMA_LIVE_PROOF_CONFLICT_COUNT:\n5",
    "HISTORICAL_DOCS_CORRECT_FIVE_CANDIDATE_LIVE_ASSERTIONS_PARTIALLY_SUPERSEDED",
    "VALIDATOR_RESULT_SCHEMA_CANDIDATE_PATH_TRANSITION_COUNT:\n2",
    "RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT:\n4",
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n4",
    "CURRENT_PREREQUISITE_FILE_COUNT:\n2",
    "DIRECT_SCAFFOLD_PROOF_TRANSITION_STEP_COUNT:\n10",
    "SCHEMA_FILE_NOT_CREATED_BY_THIS_SLICE",
    "SCHEMA_PROOF_NOT_CREATED_BY_THIS_SLICE",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED",
  ]) {
    assert.equal(transitionText.includes(marker), true, marker);
  }
});

test("historical two-file scope preserves all path references and no-conclusion boundary", () => {
  const docsText = readRequired(docsPath);
  const scopeSection = sectionBetween(
    docsText,
    "## 16. Exact Current Docs-Only Scope And Retained Absences",
    "## 17.",
  );
  const currentPathSection = sectionBetween(
    scopeSection,
    "This current slice adds exactly:",
    "CURRENT_SCHEMA_SCAFFOLD_SCOPE_FILE_COUNT:",
  );
  const laterPathSection = sectionBetween(
    scopeSection,
    "The following six later paths remain absent in this slice:",
    "RETAINED_LATER_PATH_LIVE_ABSENCE_COUNT:",
  );
  const nonInterferenceSection = sectionBetween(
    docsText,
    "## 17. Non-Interference Rules",
    "## 18.",
  );
  const finalBoundarySection = sectionBetween(
    docsText,
    "This scaffold-scope boundary is not actual human review",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_STATUS:",
  );

  assert.deepEqual(
    numberedListLines(currentPathSection),
    exactNumberedBacktickLines(currentPaths),
  );
  assert.deepEqual(
    numberedListLines(laterPathSection),
    exactNumberedBacktickLines(allLaterPaths),
  );
  for (const retainedPath of retainedValidatorPaths) {
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" + retainedPath + "` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE`",
      ),
      true,
      retainedPath,
    );
  }
  assert.match(scopeSection, /CURRENT_SCHEMA_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  assert.match(scopeSection, /RETAINED_LATER_PATH_LIVE_ABSENCE_COUNT:\n6/u);
  assert.deepEqual(bulletListItems(nonInterferenceSection), nonInterferenceRules);
  assert.equal(
    finalBoundarySection.replace(/\s+/gu, " ").trim(),
    finalNoConclusionBoundary,
  );
  for (const marker of [
    "VALIDATOR_RESULT_SCHEMA_FILE_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_PROOF_NOT_CREATED",
    "CANDIDATE_SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "IDENTITY_VERIFICATION_NOT_CREATED",
    "CURRENTNESS_ROLE_AUTHORITY_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.doesNotMatch(docsText, /\/Users\//u);
});
