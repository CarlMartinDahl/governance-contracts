"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-readiness-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const semanticsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json";
const resultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json";
const candidateProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema.test.js";
const resultProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js";
const candidateExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js";
const resultExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const validatorPath =
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js";
const validatorProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js";
const scaffoldDocsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const scaffoldProofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-scaffold-scope-boundary-doc-freeze.test.js";
const proofTransitionDocsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofTransitionProofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const candidateExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence";
const resultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorResult";
const blockedValidatorExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorRegistry",
];
const expectedHeaderMarkers = [
  "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_READINESS_BOUNDARY",
  "PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY",
  "APPEND_ONLY_READINESS_ASSESSMENT",
  "VALIDATION_CONTRACT_FACTS_COMPLETE",
  "CANDIDATE_SCHEMA_TRACKED_AND_PACKAGE_EXPORTED",
  "VALIDATOR_RESULT_SCHEMA_TRACKED_AND_PACKAGE_EXPORTED",
  "VALIDATOR_HELPER_NOT_IMPLEMENTATION_READY",
  "EIGHT_SCOPE_DECISIONS_OPEN",
  "VALIDATOR_NOT_CREATED",
  "VALIDATOR_EXPORT_NOT_CREATED",
  "VALIDATOR_DISPATCH_NOT_CHANGED",
  "VALIDATION_EXECUTION_NOT_CREATED",
  "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
  "DECISION_BASIS_SUBJECT_ISSUER_PROVENANCE_OR_SUPPORT_EVALUATION_NOT_CREATED",
  "REVIEWER_IDENTITY_ROLE_OR_AUTHORITY_EVALUATION_NOT_CREATED",
  "TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH_NOT_CREATED",
  "APPROVAL_EFFECT_NOT_CREATED",
  "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
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
];
const expectedControllingSources = [
  contractPath,
  semanticsPath,
  candidateSchemaPath,
  resultSchemaPath,
  candidateProofPath,
  resultProofPath,
];
const expectedPackageSurfaces = [
  packageIndexPath,
  candidateExportProofPath,
  resultExportProofPath,
];
const expectedPrecedentSources = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.test.js",
];
const expectedFactRows = [
  "| root fields | exact sixteen-field declaration order in one flat closed plain-object contract |",
  "| values | exact contract identity, version, reviewer-role, decision, basis-subject-kind and lifecycle enums, basis-posture, verification and review constants, namespace patterns, and opaque-reference rules |",
  "| reference scope | exactly seven internal reference fields are pairwise compared while external reference equality stays outside structural validation |",
  "| duplicates | locally valid references compare case-sensitively; every later valid exact duplicate is flagged at its own declared path |",
  "| paths | exactly root plus sixteen static field paths with no nested or indexed path family |",
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
  "- preserve exact fields, values, references, five codes, seventeen static paths, two phases, cascade, deduplication, and safety behavior",
  "- select no package placement, public exports, machine sources, schema relationship, implementation scope, denial transition, or conformance proof",
  "- create no implementation, helper, validator, dispatch, registry, checkpoint, basis-subject resolver, issuer or provenance verifier, relevance or sufficiency evaluator, identity verifier, qualification evaluator, role or authority resolver, trusted-time or currentness evaluator, approval effect, handoff, delivery, release, API, persistence, provider, model, source inspection, or runtime behavior",
  "- create no approval, sign-off, certification, legal or evidentiary conclusion, finding, score, severity, remediation, blocker resolution, product candidate, or external-use authorization",
  "- create no security or vulnerability finding and no security approval",
  "- inspect no raw, private, source, source-package, case, identity, credential, PDF, image, screenshot, metadata, basis, rationale, or real-evidence material",
  "- acquire no metadata and execute no real private, source, case, identity-provider, credential, or real-evidence run",
  "- reopen no closed decision-basis contract, error-path, schema, export, approval, reviewer-evidence, cross-reference, or admissibility semantics",
  "- preserve human/professional review as the release gate",
];
const expectedProofBoundary =
  "The focused proof may establish only that controlling sources exist, eleven " +
  "contract facts and current export state are recorded, exactly eight scope " +
  "decisions remain open, and the smallest safe next slice is docs-only. " +
  "It does not prove validator correctness, availability, runtime enforcement, " +
  "external reference existence or equality, subject existence, membership, " +
  "truth or authenticity, reviewer identity, professional qualification, reviewer " +
  "role, reviewer authority, issuer or provenance trust, trusted time, currentness " +
  "or lifecycle truth, relevance, support, sufficiency, probative value, approval " +
  "effect, admissibility, handoff eligibility, legal correctness, evidentiary " +
  "sufficiency, professional approval, technical sign-off, release or product " +
  "readiness, external-use authorization, security approval, compliance, or case " +
  "truth.";
const expectedFinalBoundary =
  "This readiness assessment is not actual human, professional, legal, technical " +
  "or evidentiary review; legal advice; subject verification; issuer or " +
  "provenance verification; approval; sign-off; certification; source-truth, " +
  "identity-truth, ownership, chain-of-custody or case-truth proof; runtime " +
  "verification; security approval; deployment or implementation readiness; " +
  "governance approval; handoff approval; product or external-use authorization; " +
  "or real-evidence review.";

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

function bulletLines(text) {
  return text.split("\n").filter((line) => line.startsWith("- "));
}

function numberedLines(text) {
  return text.split("\n").filter((line) => /^\d+\. /u.test(line));
}

function tableLines(text) {
  return text.split("\n").filter((line) => line.startsWith("|"));
}

function normalizeProse(text) {
  return text.replace(/\s+/gu, " ").trim();
}

test("decision-basis validator-helper readiness sources and boundary are exact", () => {
  const docsText = readRequired(docsPath);
  const markerStart = docsText.indexOf("\n\n") + 2;
  const markerEnd = docsText.indexOf("\n## 1. Purpose");
  const sourceSection = sectionBetween(
    docsText,
    "## 2. Canonical Sources And Precedent Boundary",
    "## 3.",
  );
  const controllingSection = sectionBetween(
    sourceSection,
    "Controlling contract sources:",
    "Tracked package surfaces:",
  );
  const packageSection = sectionBetween(
    sourceSection,
    "Tracked package surfaces:",
    "Repository implementation precedent only:",
  );
  const precedentSection = sectionBetween(
    sourceSection,
    "Repository implementation precedent only:",
    "Precedent supplies possible",
  );

  assert.notEqual(markerEnd, -1);
  assert.deepEqual(
    docsText.slice(markerStart, markerEnd).trim().split("\n"),
    expectedHeaderMarkers,
  );
  assert.deepEqual(
    bulletLines(controllingSection),
    expectedControllingSources.map((sourcePath) => "- `" + sourcePath + "`"),
  );
  assert.deepEqual(
    bulletLines(packageSection),
    expectedPackageSurfaces.map((sourcePath) => "- `" + sourcePath + "`"),
  );
  assert.deepEqual(
    bulletLines(precedentSection),
    expectedPrecedentSources.map((sourcePath) => "- `" + sourcePath + "`"),
  );
  for (const sourcePath of [
    ...expectedControllingSources,
    ...expectedPackageSurfaces,
    ...expectedPrecedentSources,
  ]) {
    readRequired(sourcePath);
  }
});

test("eleven concrete facts preserve the selected decision-basis validation semantics", () => {
  const docsText = readRequired(docsPath);
  const semanticsText = readRequired(semanticsPath);
  const facts = sectionBetween(
    docsText,
    "## 3. Concrete Contract Facts",
    "## 4.",
  );

  assert.deepEqual(tableLines(facts), [
    "| Surface | Tracked fact |",
    "| --- | --- |",
    ...expectedFactRows,
  ]);
  assert.match(facts, /CONCRETE_VALIDATION_CONTRACT_FACT_COUNT:\n11/u);
  assert.match(semanticsText, /OPEN_ERROR_PATH_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(semanticsText, /VALIDATOR_ERROR_CODE_COUNT:\n5/u);
  assert.match(semanticsText, /CANONICAL_STATIC_ERROR_PATH_COUNT:\n17/u);
  assert.match(semanticsText, /CANONICAL_INDEXED_PATH_TEMPLATE_COUNT:\n0/u);
  assert.match(semanticsText, /PAIRWISE_REFERENCE_FIELD_COUNT:\n7/u);
  assert.match(semanticsText, /CANONICAL_VALIDATION_PHASE_COUNT:\n2/u);
});

test("static schemas and exports remain exact while every validator surface stays absent", () => {
  const docsText = readRequired(docsPath);
  const candidateSchema = require("../" + candidateSchemaPath);
  const resultSchema = require("../" + resultSchemaPath);
  const indexText = readRequired(packageIndexPath);
  const currentState = sectionBetween(
    docsText,
    "## 4. Current Machine-Readable State",
    "## 5.",
  );
  const schemaExportSection = sectionBetween(
    currentState,
    "schema objects:",
    "No tracked package currently exports:",
  );
  const blockedExportSection = sectionBetween(
    currentState,
    "No tracked package currently exports:",
    "The helper module and focused proof remain absent:",
  );
  const absentHelperSection = sectionBetween(
    currentState,
    "The helper module and focused proof remain absent:",
    "Current absence is fact, not permission to implement.",
  );
  const basisExportNames = Object.keys(packageSchemas).filter((name) =>
    name.startsWith(
      "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
    ),
  );

  assert.deepEqual(bulletLines(schemaExportSection), [
    "- `" + candidateExportName + "`",
    "- `" + resultExportName + "`",
  ]);
  assert.deepEqual(
    bulletLines(blockedExportSection),
    blockedValidatorExports.map((name) => "- `" + name + "`"),
  );
  assert.deepEqual(bulletLines(absentHelperSection), [
    "- `" + validatorPath + "`",
    "- `" + validatorProofPath + "`",
  ]);
  assert.deepEqual(basisExportNames, [
    candidateExportName,
    resultExportName,
  ]);
  assert.strictEqual(packageSchemas[candidateExportName], candidateSchema);
  assert.strictEqual(packageSchemas[resultExportName], resultSchema);
  assert.equal(candidateSchema.additionalProperties, false);
  assert.equal(candidateSchema.required.length, 16);
  assert.deepEqual(
    Object.keys(candidateSchema.properties),
    candidateSchema.required,
  );
  assert.equal(resultSchema.additionalProperties, false);
  assert.deepEqual(resultSchema.required, [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.deepEqual(resultSchema.properties.errors.items.required, [
    "code",
    "path",
  ]);
  assert.equal(indexText.split("\n").length - 1, 13165);
  for (const blockedExport of blockedValidatorExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
    assert.equal(docsText.includes("`" + blockedExport + "`"), true);
  }
  for (const absentPath of [
    validatorPath,
    validatorProofPath,
    scaffoldDocsPath,
    scaffoldProofPath,
    proofTransitionDocsPath,
    proofTransitionProofPath,
  ]) {
    assert.equal(fs.existsSync(absolute(absentPath)), false, absentPath);
  }
});

test("readiness is blocked by exactly eight open scope decisions", () => {
  const docsText = readRequired(docsPath);
  const contractText = readRequired(contractPath);
  const matrix = sectionBetween(docsText, "## 5. Readiness Matrix", "## 6.");
  const decisions = sectionBetween(
    docsText,
    "## 6. Eight Open Scope Decisions",
    "## 7.",
  );

  assert.deepEqual(tableLines(matrix), [
    "| Readiness question | Status |",
    "| --- | --- |",
    ...expectedReadinessRows,
  ]);
  assert.deepEqual(tableLines(decisions), [
    "| Position | Open decision | Why it must be frozen first |",
    "| --- | --- | --- |",
    ...expectedDecisionRows,
  ]);
  assert.match(
    matrix,
    /VALIDATOR_HELPER_READINESS:\nBLOCKED_BY_EXACT_SCOPE_DECISIONS/u,
  );
  assert.match(decisions, /OPEN_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  assert.match(
    contractText,
    /FUTURE_VALIDATOR_CODE_OWNERSHIP:\nDEFERRED_TO_SEPARATE_OWNER_DECISION/u,
  );
  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_DOCS_ONLY/u,
  );
});

test("readiness scope proof and final boundaries are exact and non-authorizing", () => {
  const docsText = readRequired(docsPath);
  const scope = sectionBetween(docsText, "## 8. Exact Current Scope", "## 9.");
  const nonInterference = sectionBetween(
    docsText,
    "## 9. Non-Interference Rules",
    "## 10.",
  );
  const proofBoundary = sectionBetween(
    docsText,
    "## 10. Proof Boundary",
    "## 11.",
  );
  const finalBoundary = docsText.slice(docsText.indexOf("## 11. Final Boundary"));

  assert.match(scope, /CURRENT_VALIDATOR_HELPER_READINESS_FILE_COUNT:\n2/u);
  assert.deepEqual(numberedLines(scope), [
    "1. `" + docsPath + "`",
    "2. `" + proofPath + "`",
  ]);
  assert.deepEqual(
    bulletLines(nonInterference),
    expectedNonInterferenceRules,
  );
  assert.equal(
    normalizeProse(proofBoundary.replace("## 10. Proof Boundary", "")),
    expectedProofBoundary,
  );
  assert.equal(
    normalizeProse(
      sectionBetween(
        finalBoundary,
        "## 11. Final Boundary",
        "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_READINESS_BOUNDARY_STATUS:",
      ).replace("## 11. Final Boundary", ""),
    ),
    expectedFinalBoundary,
  );
  for (const currentPath of [docsPath, proofPath]) {
    assert.equal(scope.includes("`" + currentPath + "`"), true, currentPath);
    readRequired(currentPath);
  }
  assert.match(
    finalBoundary,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_READINESS_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_VALIDATOR_HELPER_READINESS_BLOCKED_BY_SCOPE_DECISIONS/u,
  );
  assert.match(
    finalBoundary,
    /REPO_NEXT_ACTION:\nnone from this boundary; validator-helper scaffold scope remains a separate Owner-selected docs-only slice\n?$/u,
  );
});
