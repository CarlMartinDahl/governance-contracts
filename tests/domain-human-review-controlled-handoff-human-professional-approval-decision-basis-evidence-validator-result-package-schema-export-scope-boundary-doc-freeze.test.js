"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const resultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json";
const resultSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js";
const candidateExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const futureResultExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js";
const candidateExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence";
const validatorResultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorResult";
const retainedValidatorPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
];
const rootFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const prohibitedValidatorNames = [
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorRegistry",
];
const currentScopePaths = [docsPath, proofPath];
const futureScopePaths = [packageIndexPath, futureResultExportProofPath];
const controllingSourcePaths = [
  resultSchemaPath,
  resultSchemaProofPath,
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json",
  candidateExportProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  packageIndexPath,
];
const precedentPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
];
const expectedProofFamilies = [
  "the exact selected validator-result property exists",
  "the exported object is reference-equal and deeply equal to the tracked JSON schema",
  "`$id`, title, four-field root order, and two-field error order are preserved",
  "exact `const`, `enum`, `pattern`, `oneOf`, and closed-object counts are preserved",
  "exact `minItems`, `maxItems`, and `uniqueItems` counts are preserved",
  "the completed candidate schema export remains unchanged",
  "none of the four prohibited validator names is exported",
  "the package index uses one static schema binding and one schema-object export while preserving its line count",
  "no validation, subject existence, membership or truth, issuer, provenance, session, identity, trusted-time, lifecycle-currentness, role, authority, admissibility, approval effect, handoff, delivery, persistence, source, API, or runtime behavior is created",
];
const expectedIdentityTable = [
  "| Keyword | Exact value |",
  "| --- | --- |",
  "| `$schema` | `https://json-schema.org/draft/2020-12/schema` |",
  "| `$id` | `https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json` |",
  "| `title` | `Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Validator Result Contract` |",
];
const expectedFutureScopeTable = [
  "| Position | Future path | Future action |",
  "| --- | --- | --- |",
  "| 1 | `packages/schemas/src/index.js` | add one validator-result schema binding and export |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js` | add the focused validator-result package-export proof |",
];
const expectedConventionBoundary = `The controlling group supplies schema identity, exact structure, selected
sequence, and sibling separation. The precedent supplies only CommonJS
schema-object export layout and focused proof convention. It does not supply
decision-basis-evidence fields, error mappings, validator execution,
kind-to-reference namespace evaluation, subject existence, subject membership,
subject-pair uniqueness, subject truth, relevance, sufficiency, issuer trust,
review-session validity, identity, role, authority, currentness, admissibility,
approval effect, handoff, delivery, release, or runtime semantics.`;
const expectedExportActionBoundary = `The future slice may add only one static \`require\` binding and one
\`module.exports\` property while preserving the package-index line count. It
must not wrap, normalize, mutate, clone, populate, execute, validate, verify,
resolve, authorize, approve, hand off, deliver, or release anything.`;
const expectedNonInterferenceRules = [
  "preserve the candidate and validator-result schemas unchanged",
  "preserve the completed candidate schema export unchanged",
  "create no validator-result package export in this docs-only slice",
  "preserve every existing package export unchanged",
  "modify no file outside the exact current two-file scope",
  "create no validator, dispatch, registry, checkpoint, subject lookup, subject-membership verifier, subject-truth verifier, relevance or sufficiency evaluator, issuer or provenance verifier, session or identity verifier, trusted-time or lifecycle-currentness evaluator, role or authority resolver, approval effect, handoff, delivery, release, persistence, API, route, UI, audit, provider, model, logging, telemetry, or executed-run behavior",
  "inspect or process no raw, private, source, case, issuer, provenance, session, identity-provider, credential, subject, or real decision-basis material",
  "add no fields, states, statuses, mappings, aliases, findings, conclusions, scores, approvals, recipients, or readiness states",
  "assign no severity, recommend no remediation, and resolve no blocker",
  "preserve human/professional review as the release gate",
];
const expectedProofTransitionSection = `Before the future export may be created, a separate docs-only proof-transition
prerequisite must inventory and release every live package-index, symbol, or
focused export-proof absence assertion that the future two-file slice would
supersede. Historical absence statements remain preserved.

VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_TRANSITION_REQUIRED:
TRUE

This scope boundary does not create that prerequisite or authorize bypassing
any still-live proof assertion.`;
const expectedNoOverclaimParagraph = `The proof must not claim validator correctness, validation execution,
decision-basis existence, subject existence, subject membership,
cross-candidate subject-pair uniqueness, subject truth or authenticity,
relevance, support, sufficiency, probative value, issuer trust, provenance
trust, review-session validity, reviewer presence, identity authenticity,
professional qualification, reviewer role or authority, trusted time,
lifecycle truth or currentness, reference existence, approval effect,
admissibility, handoff eligibility, legal correctness, evidentiary
sufficiency, professional approval, technical sign-off, release readiness,
product readiness, external-use authorization, security approval, compliance,
or case truth.`;
const expectedFinalNoConclusion = `This package-export scope boundary is not actual human review, professional
review, legal review, technical review, evidentiary review, subject-existence
verification, subject-membership verification, subject-pair uniqueness
verification, subject-truth or subject-authenticity verification, relevance,
support, sufficiency or probative-value verification, issuer-trust or
provenance verification, review-session or identity verification, trusted-time
or lifecycle-currentness verification, reviewer-role or authority
verification, authentication, legal advice, professional approval, technical
sign-off, release approval, product or external-use authorization, compliance
certification, admissibility evidence, approval effect, ownership
determination, source-truth conclusion, identity-truth conclusion,
chain-of-custody proof, runtime verification, security approval, deployment
readiness, implementation readiness, governance approval, finding, severity
assignment, remediation recommendation, blocker resolution, metadata
acquisition, real private run, domain-specific reopening, handoff approval,
delivery approval, case-truth conclusion, or real-evidence review.`;

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
  return text.slice(startIndex + start.length, endIndex);
}

function numberedListItems(section) {
  const items = [];

  for (const rawLine of section.split("\n")) {
    const line = rawLine.trim();
    const itemMatch = /^\d+\.\s+(.+)$/u.exec(line);
    if (itemMatch) {
      items.push(itemMatch[1]);
    } else if (line && items.length > 0) {
      items[items.length - 1] += " " + line;
    }
  }

  return items;
}

function bulletListItems(section) {
  const items = [];

  for (const rawLine of section.split("\n")) {
    const itemMatch = /^- (.+)$/u.exec(rawLine);
    if (itemMatch) {
      items.push(itemMatch[1]);
    } else if (/^ {2}\S/u.test(rawLine) && items.length > 0) {
      items[items.length - 1] += " " + rawLine.trim();
    }
  }

  return items;
}

function tableLines(section) {
  return section.split("\n").filter((line) => line.startsWith("| "));
}

function normalize(text) {
  return text.replace(/\s+/gu, " ").trim();
}

function countKey(value, key, predicate = () => true) {
  if (Array.isArray(value)) {
    return value.reduce(
      (count, item) => count + countKey(item, key, predicate),
      0,
    );
  }
  if (value === null || typeof value !== "object") return 0;
  return Object.entries(value).reduce(
    (count, [entryKey, entryValue]) =>
      count +
      (entryKey === key && predicate(entryValue) ? 1 : 0) +
      countKey(entryValue, key, predicate),
    0,
  );
}

test("validator-result package-export scope references the exact selected sequence", () => {
  const docsText = readRequired(docsPath);
  const controllingSourceSection = sectionBetween(
    docsText,
    "The controlling sources are:",
    "Repository representation precedent only:",
  );
  const precedentSection = sectionBetween(
    docsText,
    "Repository representation precedent only:",
    "The controlling group supplies schema identity",
  );
  const conventionSection = sectionBetween(
    docsText,
    "The controlling group supplies schema identity",
    "## 3. Current Tracked Validator-Result Schema Facts",
  );

  assert.deepEqual(
    bulletListItems(controllingSourceSection),
    controllingSourcePaths.map((sourcePath) => "`" + sourcePath + "`"),
  );
  assert.deepEqual(
    bulletListItems(precedentSection),
    precedentPaths.map((precedentPath) => "`" + precedentPath + "`"),
  );
  for (const sourcePath of [...controllingSourcePaths, ...precedentPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.equal(
    normalize(
      "The controlling group supplies schema identity" + conventionSection,
    ),
    normalize(expectedConventionBoundary),
  );
  for (const marker of [
    "DOCS_ONLY",
    "OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A_PRESERVED",
    "CANDIDATE_SCHEMA_EXPORT_FIRST_COMPLETED",
    "VALIDATOR_RESULT_SCHEMA_EXPORT_SECOND_SEPARATE_SLICE",
    "APPEND_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /The controlling group supplies schema identity,/u);
  assert.match(docsText, /decision-basis-evidence fields/u);
  assert.doesNotMatch(docsText, /\bsupplies identity\b/u);
  assert.doesNotMatch(docsText, /decision-attestation-evidence fields/u);
});

test("tracked validator-result schema identity shape and keyword counts are exact", () => {
  const docsText = readRequired(docsPath);
  const schema = require("../" + resultSchemaPath);
  const identitySection = sectionBetween(
    docsText,
    "Its tracked identity is:",
    "The schema preserves exactly four root fields",
  );

  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Validator Result Contract",
  );
  assert.deepEqual(schema.required, rootFields);
  assert.deepEqual(Object.keys(schema.properties), rootFields);
  assert.deepEqual(schema.properties.errors.items.required, errorFields);
  assert.deepEqual(schema.properties.errors.items.properties, {
    code: { type: "string" },
    path: { type: "string" },
  });
  assert.deepEqual(tableLines(identitySection), expectedIdentityTable);
  assert.deepEqual(
    {
      const: countKey(schema, "const"),
      enum: countKey(schema, "enum"),
      pattern: countKey(schema, "pattern"),
      oneOf: countKey(schema, "oneOf"),
      closed: countKey(
        schema,
        "additionalProperties",
        (value) => value === false,
      ),
      minItems: countKey(schema, "minItems"),
      maxItems: countKey(schema, "maxItems"),
      uniqueItems: countKey(schema, "uniqueItems"),
    },
    {
      const: 10,
      enum: 4,
      pattern: 0,
      oneOf: 2,
      closed: 2,
      minItems: 1,
      maxItems: 1,
      uniqueItems: 1,
    },
  );
  for (const [marker, count] of [
    ["TRACKED_VALIDATOR_RESULT_ROOT_FIELD_COUNT", 4],
    ["TRACKED_VALIDATOR_RESULT_ERROR_FIELD_COUNT", 2],
    ["TRACKED_VALIDATOR_RESULT_CONST_COUNT", 10],
    ["TRACKED_VALIDATOR_RESULT_ENUM_COUNT", 4],
    ["TRACKED_VALIDATOR_RESULT_PATTERN_COUNT", 0],
    ["TRACKED_VALIDATOR_RESULT_ONE_OF_COUNT", 2],
    ["TRACKED_VALIDATOR_RESULT_CLOSED_OBJECT_COUNT", 2],
    ["TRACKED_VALIDATOR_RESULT_MIN_ITEMS_COUNT", 1],
    ["TRACKED_VALIDATOR_RESULT_MAX_ITEMS_COUNT", 1],
    ["TRACKED_VALIDATOR_RESULT_UNIQUE_ITEMS_COUNT", 1],
  ]) {
    assert.match(docsText, new RegExp(marker + ":\\n" + count, "u"));
  }
});

test("future validator-result export scope symbol and proof families are exact", () => {
  const docsText = readRequired(docsPath);
  const proofScopeSection = sectionBetween(
    docsText,
    "The focused future validator-result package-export proof may establish only:",
    "FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:",
  );
  const noOverclaimSection = sectionBetween(
    docsText,
    "FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n9",
    "## 8. Required Proof Transition",
  );
  const futureScopeSection = sectionBetween(
    docsText,
    "The smallest later validator-result package-export slice may modify or create",
    "FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:",
  );
  const exportActionSection = sectionBetween(
    docsText,
    "`../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json`",
    "## 6. Preserved Candidate Export And Blocked Siblings",
  );

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/u,
  );
  for (const futurePath of futureScopePaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.deepEqual(tableLines(futureScopeSection), expectedFutureScopeTable);
  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorResult/u,
  );
  assert.equal(
    docsText.includes(
      "`../../../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json`",
    ),
    true,
  );
  assert.equal(
    normalize(exportActionSection),
    normalize(expectedExportActionBoundary),
  );
  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n9/u,
  );
  assert.deepEqual(numberedListItems(proofScopeSection), expectedProofFamilies);
  assert.equal(
    normalize(noOverclaimSection),
    normalize(expectedNoOverclaimParagraph),
  );
  assert.match(
    docsText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_TRANSITION_REQUIRED:\nTRUE/u,
  );
});

test("completed candidate export remains exact while result transition and validator absence stay exact", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const proofText = readRequired(proofPath);
  const packageIndexText = readRequired(packageIndexPath);
  const packageSchemas = require("../packages/schemas/src/index.js");
  const candidateSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json");
  const prohibitedSection = sectionBetween(
    docsText,
    "The future validator-result export slice must not create or export:",
    "FUTURE_PROHIBITED_VALIDATOR_EXPORT_NAME_COUNT:",
  );

  assert.strictEqual(packageSchemas[candidateExportName], candidateSchema);
  assert.equal(
    transitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  for (const targetPath of [packageIndexPath, futureResultExportProofPath]) {
    assert.equal(transitionText.includes("`" + targetPath + "`"), true, targetPath);
  }
  assert.equal(
    transitionText.includes("`" + validatorResultExportName + "`"),
    true,
  );
  assert.equal(
    proofText.includes(
      "Object." +
        "hasOwn(packageSchemas, validatorResultExportName)",
    ),
    false,
  );
  assert.equal(proofText.includes("packageIndex" + "Text.includes("), false);
  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(futureResultExportProofPath))",
    ),
    false,
  );
  for (const validatorPath of retainedValidatorPaths) {
    assert.equal(fs.existsSync(absolute(validatorPath)), false, validatorPath);
  }
  assert.match(docsText, /FUTURE_PROHIBITED_VALIDATOR_EXPORT_NAME_COUNT:\n4/u);
  assert.deepEqual(
    bulletListItems(prohibitedSection),
    prohibitedValidatorNames.map((name) => "`" + name + "`"),
  );
  for (const prohibitedName of prohibitedValidatorNames) {
    assert.equal(docsText.includes("`" + prohibitedName + "`"), true, prohibitedName);
    assert.equal(Object.hasOwn(packageSchemas, prohibitedName), false, prohibitedName);
  }
  assert.match(
    transitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    transitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
});

test("current docs-only scope creates no export runtime or approval effect", () => {
  const docsText = readRequired(docsPath);
  const currentScopeSection = sectionBetween(
    docsText,
    "This current scope boundary creates exactly:",
    "CURRENT_VALIDATOR_RESULT_PACKAGE_EXPORT_SCOPE_FILE_COUNT:",
  );
  const proofTransitionSection = sectionBetween(
    docsText,
    "## 8. Required Proof Transition",
    "## 9. Exact Current Docs-Only File Scope",
  );
  const nonInterferenceSection = sectionBetween(
    docsText,
    "## 10. Non-Interference Rules",
    "## 11. Final No-Conclusion Boundary",
  );
  const finalNoConclusionSection = sectionBetween(
    docsText,
    "## 11. Final No-Conclusion Boundary",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:",
  );

  assert.match(
    docsText,
    /CURRENT_VALIDATOR_RESULT_PACKAGE_EXPORT_SCOPE_FILE_COUNT:\n2/u,
  );
  for (const currentPath of currentScopePaths) {
    assert.equal(docsText.includes("`" + currentPath + "`"), true, currentPath);
    readRequired(currentPath);
  }
  assert.deepEqual(
    numberedListItems(currentScopeSection),
    currentScopePaths.map((scopePath) => "`" + scopePath + "`"),
  );
  assert.equal(
    normalize(proofTransitionSection),
    normalize(expectedProofTransitionSection),
  );
  assert.deepEqual(
    bulletListItems(nonInterferenceSection),
    expectedNonInterferenceRules,
  );
  assert.equal(
    normalize(finalNoConclusionSection),
    normalize(expectedFinalNoConclusion),
  );
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "CANDIDATE_SCHEMA_EXPORT_NOT_CHANGED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CHANGED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "SUBJECT_EXISTENCE_MEMBERSHIP_OR_TRUTH_VERIFICATION_NOT_CREATED",
    "IDENTITY_ROLE_AUTHORITY_OR_SESSION_VERIFICATION_NOT_CREATED",
    "TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(
    docsText,
    /REPO_NEXT_ACTION:\nnone from this boundary; a separate proof-transition prerequisite remains required before validator-result package export/u,
  );
});
