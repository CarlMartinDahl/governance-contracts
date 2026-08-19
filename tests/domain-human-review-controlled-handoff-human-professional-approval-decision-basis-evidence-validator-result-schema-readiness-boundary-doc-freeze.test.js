"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js";
const currentSlicePaths = [docsPath, proofPath];
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageIndexPath = "packages/schemas/src/index.js";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-contract-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  candidateSchemaPath,
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
];
const conventionPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-source-register-validator-result.json",
];
const reservedLaterPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
];
const validatorResultCandidatePaths = reservedLaterPaths.slice(0, 2);
const historicalValidatorResultRetainedPaths = reservedLaterPaths.slice(2);
const candidatePackageExportProofPath =
  historicalValidatorResultRetainedPaths[0];
const retainedPackageAndValidatorPaths =
  historicalValidatorResultRetainedPaths.slice(1);
const validatorResultPackageExportProofPath = reservedLaterPaths[3];
const retainedValidatorPaths = reservedLaterPaths.slice(4);
const errorCodes = [
  "required_field_missing",
  "unexpected_field",
  "invalid_field_type",
  "invalid_field_value",
  "duplicate_reference",
];
const rootFieldPaths = [
  "$.contract_id",
  "$.contract_version",
  "$.decision_basis_ref",
  "$.approval_ref",
  "$.review_session_ref",
  "$.reviewer_ref",
  "$.reviewer_role",
  "$.decision",
  "$.basis_subject_kind",
  "$.basis_subject_ref",
  "$.basis_posture",
  "$.binding_issuer_ref",
  "$.binding_provenance_ref",
  "$.basis_lifecycle_posture",
  "$.verification_posture",
  "$.human_professional_review_required",
];
const subjectNamespaceMappings = [
  ["SOURCE_REGISTER_SOURCE", "^src_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["REVIEW_CHRONOLOGY_ENTRY", "^chr_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["ASSERTED_CLAIM", "^clm_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["DECLARED_REVIEW_GAP", "^gap_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["HUMAN_REVIEW_QUESTION", "^qst_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["NO_CONCLUSION_NOTICE", "^ncn_[a-z0-9][a-z0-9_-]{0,59}$"],
];
const resultTable = [
  "| Position | Field | Type | Exact constraint |",
  "| --- | --- | --- | --- |",
  "| 1 | `valid` | boolean | exactly coupled to whether `errors` is empty |",
  "| 2 | `contractKind` | string | `HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_BOUNDARY` |",
  "| 3 | `version` | string | `1.0.0` |",
  "| 4 | `errors` | array | ordered exact closed error items only |",
];
const errorItemTable = [
  "| Position | Field | Type |",
  "| --- | --- | --- |",
  "| 1 | `code` | string |",
  "| 2 | `path` | string |",
];
const validityInvariantBullets = [
  "`valid: true` if and only if `errors` is empty",
  "`valid: false` if and only if `errors` contains at least one item",
];
const partitionTable = [
  "| Code | Exact allowed path partition |",
  "| --- | --- |",
  "| `required_field_missing` | any of the sixteen declared root-field paths; never `$` |",
  "| `unexpected_field` | exactly `$` |",
  "| `invalid_field_type` | `$` or any of the sixteen declared root-field paths |",
  "| `invalid_field_value` | any of the sixteen declared root-field paths; never `$` |",
  "| `duplicate_reference` | exactly one of `$.decision_basis_ref`, `$.approval_ref`, `$.review_session_ref`, `$.reviewer_ref`, `$.basis_subject_ref`, `$.binding_issuer_ref`, or `$.binding_provenance_ref` |",
];
const scaffoldQuestions = [
  "exact schema title, Draft 2020-12 identifier, reserved schema path, and focused proof-test path",
  "exact root keyword and property order plus the two success/failure branches",
  "exact inline error-item keyword order and five code-to-path branches",
  "whether structurally identical error items are rejected with `uniqueItems: true`",
  "whether both candidate and validator-result package schema exports remain excluded as separate later sibling slices",
  "exact focused proof fixtures and limits separating schema structure from validator behavior, kind-to-reference namespace evaluation, subject existence, subject membership, subject truth, relevance, sufficiency, issuer trust, session validity, identity, role, authority, currentness, admissibility, approval effect, and all retained sibling absences",
];
const candidateFields = rootFieldPaths.map((fieldPath) => fieldPath.slice(2));
const forbiddenValidatorResultKeys = [
  "valid",
  "contractKind",
  "version",
  "errors",
  "code",
  "path",
];
const schemaExpressibleFacts = [
  "exact closed four-field root and two-field error-item keys",
  "exact `contractKind` and `version` literals",
  "mutually exclusive empty-errors/success and non-empty-errors/failure states",
  "exact five code values",
  "exact seventeen static path values",
  "exact code-to-path branch partition",
  "rejection of structurally duplicate exact error objects with `uniqueItems: true`",
];
const validatorOnlyBehaviors = [
  "two-phase validation execution and canonical error emission order",
  "root preflight and prerequisite-gated missing, type, value, and duplicate cascade",
  "first-occurrence exact `{ code, path }` deduplication behavior",
  "actual pairwise duplicate-reference detection across seven candidate fields",
  "conditional `basis_subject_kind`-to-`basis_subject_ref` namespace evaluation against the six tracked candidate-schema branches",
  "descriptor-safe inspection, accessor non-execution, and prototype handling",
  "input non-mutation, no coercion, and insertion-order independence",
  "deterministic result construction and recursive result immutability",
  "no-echo behavior during validation execution",
  "internal execution-failure handling",
  "external reference equality, approval candidate-set coverage or order, subject existence, same-call subject membership, cross-candidate subject-pair uniqueness, subject truth or authenticity, relevance, support, sufficiency, probative value, issuer or provenance trust, review-session validity, reviewer identity, role, authority, lifecycle truth, trusted time, currentness, reference resolution, admissibility, approval effect, handoff eligibility, export, delivery, or release",
];
const readinessClassificationTable = [
  "| Surface | Classification |",
  "| --- | --- |",
  "| result identity and four-field root shape | `EXACT_CONTRACT_FACT_AVAILABLE` |",
  "| two-field error-item shape | `EXACT_CONTRACT_FACT_AVAILABLE` |",
  "| success/failure invariant | `EXACT_CONTRACT_FACT_AVAILABLE` |",
  "| five-code taxonomy and seventeen-path grammar | `EXACT_CONTRACT_FACT_AVAILABLE` |",
  "| five code-to-path partitions | `EXACT_CONTRACT_FACT_AVAILABLE` |",
  "| schema identity and exact representation | `OPEN_FOR_SEPARATE_SCAFFOLD_SCOPE` |",
  "| candidate and validator-result package exports | `OPEN_FOR_SEPARATE_LATER_SLICES` |",
  "| validator implementation and execution | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| cross-reference, subject existence, subject membership, subject truth, relevance, sufficiency, issuer, currentness, and admissibility checkpoint | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| reviewer identity, role, authority, and review-session evaluation | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
  "| approval effect, handoff, export, delivery, or release | `OUT_OF_SCOPE_NOT_AUTHORIZED` |",
];
const nonInterferenceRules = [
  "preserve the decision-basis-evidence contract, candidate schema, schema proof, and error-path semantics boundary unchanged",
  "do not create or modify any JSON Schema file",
  "do not modify `packages/schemas/src/index.js`",
  "do not create a candidate or validator-result package export",
  "do not create a validator, dispatch, registry, caller, or helper",
  "do not create a cross-reference, subject-existence, subject-membership, subject-truth, relevance, sufficiency, issuer, currentness, or admissibility checkpoint",
  "do not create subject lookup, subject-pair uniqueness evaluation, review-session verification, identity verification, role resolution, authority resolution, lifecycle evaluation, approval effect, handoff, export, delivery, recipient, release, persistence, API, route, UI, audit, provider, model, or executed-run behavior",
  "do not inspect or process raw, private, source, case, identity-provider, credential, provider, session, subject, or real decision-basis material",
  "do not claim that schema structure enforces validator ordering, cascade, duplicate detection, kind-to-reference namespace evaluation, descriptor safety, no-echo, immutability, subject existence, subject membership, subject truth, relevance, sufficiency, issuer trust, session validity, identity, role, authority, currentness, admissibility, approval effect, or release",
  "preserve human/professional review as the release gate",
];
const finalNoConclusionBoundary =
  "This readiness boundary is not schema correctness, validator correctness, subject-existence verification, subject-membership verification, subject-pair uniqueness verification, subject-truth verification, subject-authenticity verification, relevance verification, support verification, sufficiency verification, probative-value verification, issuer-trust verification, provenance verification, review-session verification, role assignment, identity verification, authority verification, lifecycle or currentness verification, actual human review, professional review, legal review, technical review, evidentiary review, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, admissibility evidence, approval effect, ownership determination, source-truth conclusion, identity-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, case-truth conclusion, or real-evidence review.";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(docsText, start, end) {
  const startIndex = docsText.indexOf(start);
  const endIndex = docsText.indexOf(end, startIndex + start.length);

  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return docsText.slice(startIndex, endIndex);
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

function backtickBulletPaths(section) {
  return section
    .split("\n")
    .filter((line) => /^- `[^`]+`$/u.test(line))
    .map((line) => line.slice(3, -1));
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

test("decision basis validator-result readiness and every source exist", () => {
  const docsText = readRequired(docsPath);
  const sourceSection = sectionBetween(
    docsText,
    "## 2. Canonical Sources And Convention Boundary",
    "## 3.",
  );
  const controllingSection = sectionBetween(
    sourceSection,
    "The controlling tracked decision-basis-evidence sources are:",
    "Repository convention evidence only:",
  );
  const conventionSection = sectionBetween(
    sourceSection,
    "Repository convention evidence only:",
    "Convention evidence supplies only",
  );

  for (const sourcePath of [...controllingPaths, ...conventionPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.deepEqual(backtickBulletPaths(controllingSection), controllingPaths);
  assert.deepEqual(backtickBulletPaths(conventionSection), conventionPaths);
  readRequired(packageIndexPath);

  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_SCHEMA_READINESS_ASSESSMENT",
    "VALIDATOR_RESULT_SCHEMA_READINESS_ASSESSED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("candidate schema remains tracked and separate with historical export posture preserved", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const candidateSchema = require("../" + candidateSchemaPath);

  assert.equal(candidateSchema.type, "object");
  assert.deepEqual(candidateSchema.required, candidateFields);
  assert.deepEqual(Object.keys(candidateSchema.properties), candidateFields);
  assert.deepEqual(
    candidateSchema.allOf.map((branch) => [
      branch.if.properties.basis_subject_kind.const,
      branch.then.properties.basis_subject_ref.pattern,
    ]),
    subjectNamespaceMappings,
  );
  for (const forbiddenKey of forbiddenValidatorResultKeys) {
    assert.equal(hasOwnKeyDeep(candidateSchema, forbiddenKey), false, forbiddenKey);
  }
  assert.equal(
    packageExportTransitionText.includes(
      "`humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence`",
    ),
    true,
  );
  assert.match(
    packageExportTransitionText,
    /HISTORICAL_CANDIDATE_SCHEMA_UNEXPORTED_MARKERS_PRESERVED/u,
  );
  assert.equal(
    proofText.includes("packageIndex" + "Text.includes("),
    false,
  );
  assert.match(
    docsText,
    /DECISION_BASIS_EVIDENCE_CANDIDATE_SCHEMA_STATUS:\nTRACKED_UNEXPORTED_CONTRACT_ONLY/u,
  );
  assert.match(docsText, /VALIDATOR_RESULT_SCHEMA_STATUS:\nNOT_CREATED/u);
  assert.match(
    docsText,
    /must not be added to, nested inside, or\nrepresented as a branch/u,
  );
});

test("exact four-field result and two-field error shapes are available", () => {
  const docsText = readRequired(docsPath);
  const resultSection = sectionBetween(
    docsText,
    "## 4. Exact Result Shape Available",
    "## 5.",
  );
  const errorSection = sectionBetween(
    docsText,
    "## 5. Exact Error-Item Shape Available",
    "## 6.",
  );
  const invariantSection = sectionBetween(
    resultSection,
    "The exact success/failure invariant is available:",
    "VALID_TRUE_ERROR_COUNT:",
  );

  assert.deepEqual(tableLines(resultSection), resultTable);
  assert.deepEqual(tableLines(errorSection), errorItemTable);
  assert.deepEqual(bulletListItems(invariantSection), validityInvariantBullets);
  assert.match(resultSection, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(resultSection, /VALIDATOR_RESULT_REQUIRED_FIELDS:\nALL_FOUR/u);
  assert.match(resultSection, /VALIDATOR_RESULT_OPTIONAL_FIELDS:\nNONE/u);
  assert.match(resultSection, /VALIDATOR_RESULT_ADDITIONAL_FIELDS:\nNONE/u);
  assert.match(resultSection, /VALID_TRUE_ERROR_COUNT:\n0/u);
  assert.match(resultSection, /VALID_FALSE_ERROR_MINIMUM_COUNT:\n1/u);
  assert.match(errorSection, /VALIDATION_ERROR_ITEM_FIELD_COUNT:\n2/u);
  assert.match(errorSection, /VALIDATION_ERROR_ITEM_REQUIRED_FIELDS:\nBOTH/u);
  assert.match(errorSection, /VALIDATION_ERROR_ITEM_OPTIONAL_FIELDS:\nNONE/u);
  assert.match(
    errorSection,
    /VALIDATION_ERROR_ITEM_ADDITIONAL_FIELDS:\nNONE/u,
  );
  assert.match(errorSection, /recursively frozen/u);
});

test("five codes and exactly seventeen static paths are available", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 6. Exact Closed Codes And Path Grammar Available",
    "## 7.",
  );
  const codeSection = sectionBetween(
    section,
    "The exact error codes, in contract order, are:",
    "VALIDATION_ERROR_CODE_COUNT:",
  );
  const pathSection = sectionBetween(
    section,
    "The exact root-field paths, in contract order, are:",
    "VALIDATION_ERROR_ROOT_PATH_COUNT:",
  );

  assert.deepEqual(
    numberedListLines(codeSection),
    exactNumberedBacktickLines(errorCodes),
  );
  assert.deepEqual(
    numberedListLines(pathSection),
    exactNumberedBacktickLines(rootFieldPaths),
  );
  assert.equal(section.includes("The root path is `$`."), true);
  assert.match(section, /VALIDATION_ERROR_CODE_COUNT:\n5/u);
  assert.match(section, /VALIDATION_ERROR_ROOT_PATH_COUNT:\n1/u);
  assert.match(section, /VALIDATION_ERROR_ROOT_FIELD_PATH_COUNT:\n16/u);
  assert.match(section, /VALIDATION_ERROR_STATIC_PATH_COUNT:\n17/u);
  assert.match(section, /VALIDATION_ERROR_INDEXED_PATH_TEMPLATE_COUNT:\n0/u);
  assert.match(section, /VALIDATION_ERROR_PATH_TEMPLATE_COUNT:\n17/u);
  assert.match(section, /No indexed path, nested path, dynamic unknown-key path/u);
});

test("five code-to-path partitions remain exact and closed", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 7. Exact Code-To-Path Partition Available",
    "## 8.",
  );

  assert.deepEqual(tableLines(section), partitionTable);
  assert.match(section, /CODE_TO_PATH_PARTITION_COUNT:\n5/u);
  assert.match(section, /Independent global code\nand path constraints/u);
  assert.match(section, /invalid code\/path cross-pairs/u);
});

test("schema-expressible facts remain separate from validator behavior", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 8. Schema-Expressible And Validator-Only Boundaries",
    "## 9.",
  );
  const schemaFactsSection = sectionBetween(
    section,
    "in principle, subject to a later scaffold-scope decision:",
    "The following remain validator-only behavioral rules",
  );
  const validatorOnlySection = sectionBetween(
    section,
    "JSON Schema enforcement:",
    "SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:",
  );

  assert.deepEqual(bulletListItems(schemaFactsSection), schemaExpressibleFacts);
  assert.deepEqual(bulletListItems(validatorOnlySection), validatorOnlyBehaviors);
  assert.match(section, /SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:\nTRUE/u);
  assert.match(
    section,
    /SCHEMA_DOES_NOT_CREATE_KIND_TO_REFERENCE_VALIDATION:\nTRUE/u,
  );
  assert.match(
    section,
    /SCHEMA_DOES_NOT_CREATE_SUBJECT_EXISTENCE_MEMBERSHIP_OR_TRUTH_PROOF:\nTRUE/u,
  );
  assert.match(
    section,
    /SCHEMA_DOES_NOT_CREATE_IDENTITY_ROLE_AUTHORITY_OR_SESSION_PROOF:\nTRUE/u,
  );
  assert.match(section, /SCHEMA_DOES_NOT_CREATE_APPROVAL_EFFECT:\nTRUE/u);
});

test("six scaffold questions remain open at the next semantic gate", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 9. Open Scaffold-Scope Questions",
    "## 10.",
  );
  const readinessSection = sectionBetween(
    docsText,
    "## 10. Readiness Classification",
    "## 11.",
  );

  assert.deepEqual(numberedListLines(section), exactNumberedLines(scaffoldQuestions));
  assert.deepEqual(tableLines(readinessSection), readinessClassificationTable);
  assert.match(
    docsText,
    /OPEN_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  assert.match(
    docsText,
    /VALIDATOR_RESULT_SCHEMA_READINESS:\nREADY_FOR_DOCS_ONLY_SCAFFOLD_SCOPE_DECISION/u,
  );
  assert.match(docsText, /No answer is inferred by this readiness assessment/u);
  assert.match(
    readinessSection,
    /VALIDATOR_IMPLEMENTATION_READINESS:\nNOT_CREATED/u,
  );
  assert.match(
    readinessSection,
    /SUBJECT_EXISTENCE_MEMBERSHIP_OR_TRUTH_READINESS:\nNOT_CREATED/u,
  );
  assert.match(
    readinessSection,
    /IDENTITY_ROLE_AUTHORITY_SESSION_READINESS:\nNOT_CREATED/u,
  );
  assert.match(readinessSection, /APPROVAL_EFFECT_READINESS:\nNOT_CREATED/u);
});

test("two-file readiness scope preserves history current partition and no conclusions", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const scopeSection = sectionBetween(
    docsText,
    "## 11. Exact Current File Scope",
    "## 12.",
  );
  const nonInterferenceSection = sectionBetween(
    docsText,
    "## 12. Non-Interference Rules",
    "## 13.",
  );
  const finalBoundarySection = sectionBetween(
    docsText,
    "This readiness boundary is not schema correctness",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_STATUS:",
  );

  assert.deepEqual(
    numberedListLines(scopeSection),
    exactNumberedBacktickLines(currentSlicePaths),
  );
  assert.deepEqual(backtickBulletPaths(scopeSection), reservedLaterPaths);
  for (const reservedPath of reservedLaterPaths) {
    assert.equal(scopeSection.includes("`" + reservedPath + "`"), true, reservedPath);
  }
  for (const validatorResultCandidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" +
          validatorResultCandidatePath +
          "` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      validatorResultCandidatePath,
    );
  }
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(validatorResultCandidatePath))",
    ),
    false,
  );
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
    proofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  const liveAbsenceOperands = Array.from(
    proofText.matchAll(
      /assert\.equal\(\s*fs\.existsSync\(\s*absolute\(\s*([A-Za-z_$][\w$]*)\s*\)\s*\)\s*,\s*false\s*,\s*([A-Za-z_$][\w$]*)\s*\)\s*;/gu,
    ),
    (match) => [match[1], match[2]],
  );
  assert.deepEqual(liveAbsenceOperands, [["retainedPath", "retainedPath"]]);
  for (const historicalRetainedPath of historicalValidatorResultRetainedPaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + historicalRetainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      historicalRetainedPath,
    );
  }
  assert.equal(
    retainedPackageAndValidatorPaths.includes(candidatePackageExportProofPath),
    false,
  );
  assert.equal(retainedPackageAndValidatorPaths.length, 3);
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
    proofText.includes(
      "fs." +
        "existsSync(absolute(validatorResultPackageExportProofPath))",
    ),
    false,
  );
  assert.deepEqual(retainedValidatorPaths, reservedLaterPaths.slice(4));
  for (const retainedPath of retainedValidatorPaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
    assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);
  }
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_LIVE_PROOF_CONFLICT_COUNT:\n6/u,
  );
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_CANDIDATE_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransitionText,
    /RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    validatorResultTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n5/u,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "| 5 | `" +
        proofPath +
        "` | preserve readiness history and four sibling absences; align only the two validator-result candidate paths |",
    ),
    true,
  );
  assert.match(
    validatorResultTransitionText,
    /FIVE_ADDITIONAL_PROOF_ALIGNMENTS_REMAIN_REQUIRED/u,
  );
  assert.match(scopeSection, /CURRENT_READINESS_SLICE_FILE_COUNT:\n2/u);
  assert.deepEqual(bulletListItems(nonInterferenceSection), nonInterferenceRules);
  assert.equal(
    finalBoundarySection.replace(/\s+/gu, " ").trim(),
    finalNoConclusionBoundary,
  );

  for (const marker of [
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_PROOF_NOT_CREATED",
    "CANDIDATE_SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "SUBJECT_EXISTENCE_MEMBERSHIP_OR_TRUTH_VERIFICATION_NOT_CREATED",
    "IDENTITY_ROLE_AUTHORITY_OR_SESSION_VERIFICATION_NOT_CREATED",
    "TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_READINESS_ASSESSED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /actual human\s+review/u);
  assert.match(docsText, /real-evidence review/u);
  assert.doesNotMatch(docsText, /\/Users\//u);
});
