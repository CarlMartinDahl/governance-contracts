"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-package-schema-export-scope-boundary-doc-freeze.test.js";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json";
const candidateSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema.test.js";
const validatorResultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result.json";
const validatorResultSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const futureExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-package-export.test.js";
const validatorResultExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-package-export.test.js";
const retainedValidatorPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.test.js",
];
const controllingPaths = [
  candidateSchemaPath,
  candidateSchemaProofPath,
  validatorResultSchemaPath,
  validatorResultSchemaProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  packageIndexPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "tests/human-review-controlled-handoff-brief-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
];
const rootFields = [
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
const namespaceReferenceFields = [
  "reviewer_authority_evidence_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
];
const genericReferenceFields = [
  "role_permission_binding_evidence_ref",
  "role_permission_policy_evidence_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const reviewerRoles = ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"];
const lifecyclePostures = [
  "REVIEWER_AUTHORITY_BINDING_DECLARED_ACTIVE",
  "REVIEWER_AUTHORITY_BINDING_DECLARED_INACTIVE",
  "REVIEWER_AUTHORITY_BINDING_DECLARED_REVOKED",
];
const candidateExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence";
const validatorResultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidatorResult";
const validatorHelperExportName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence";
const prohibitedSiblingNames = [
  validatorResultExportName,
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidator",
  validatorHelperExportName,
  "getHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidenceValidatorRegistry",
];
const retainedValidatorNames = prohibitedSiblingNames.filter(
  (name) => name !== validatorResultExportName && name !== validatorHelperExportName,
);
const futureFileScopeTable = [
  "| Position | Future path | Future action |",
  "| --- | --- | --- |",
  "| 1 | `packages/schemas/src/index.js` | add one candidate-schema import and one schema-object export |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-package-export.test.js` | add the focused candidate package-export proof |",
];
const futurePackageActions = [
  "one static `require` binding for the tracked candidate schema",
  "one `module.exports` property using the exact symbol above",
];
const futureExportSurfaceSection = `The exact future CommonJS export symbol is:

\`humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence\`

FUTURE_CANDIDATE_PACKAGE_SCHEMA_EXPORT_NAME:
humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence

The symbol must reference the tracked JSON schema object loaded from:

\`../../../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json\`

The future package slice may add only:

1. one static \`require\` binding for the tracked candidate schema
2. one \`module.exports\` property using the exact symbol above

It must not wrap, normalize, project, mutate, clone, populate, execute,
validate, verify, resolve, authorize, approve, hand off, deliver, or release
reviewer authority evidence candidates. It must not create a second schema copy
or a different package-level contract.`;
const exportSequenceTable = [
  "| Position | Surface | Scope status |",
  "| --- | --- | --- |",
  "| 1 | candidate schema-object package export | `FIRST_SEPARATE_CONTRACT_ONLY_SLICE` |",
  "| 2 | validator-result schema-object package export | `SECOND_SEPARATE_CONTRACT_ONLY_SLICE` |",
];
const futureProofFamilies = [
  "`packages/schemas` exposes exactly the selected `humanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence` property",
  "the exported object is reference-equal and deeply equal to the tracked candidate JSON schema object",
  "the exported `$id` and title equal the tracked schema identity",
  "all fourteen root fields and their declaration order are preserved",
  "exact `const`, `pattern`, `enum`, closed-object, `not`, and `anyOf` counts are preserved",
  "exact namespace-specific, reviewer-role, generic opaque-reference, lifecycle, verification, and human-review declarations are preserved",
  "none of the five prohibited sibling names is exported",
  "the tracked validator-result schema remains unexported in this first slice",
  "no validation, identity, currentness, role, authority, admissibility, approval effect, handoff, delivery, persistence, source, API, or runtime behavior is created",
];
const futureProofExclusionParagraph =
  "The proof must not claim JSON Schema runtime enforcement, validator correctness, identity authenticity, professional qualification, reviewer role, reviewer authority, currentness, lifecycle verification, reference existence, approval admissibility, approval effect, handoff eligibility, legal correctness, evidentiary sufficiency, professional approval, technical sign-off, release readiness, product readiness, external-use authorization, security approval, blocker closure, compliance, or case truth.";
const currentScopeItems = ["`" + docsPath + "`", "`" + proofPath + "`"];
const nonInterferenceRules = [
  "preserve both tracked schemas and focused schema proofs unchanged",
  "create no package export in this docs-only slice",
  "modify no file outside the exact current two-file scope",
  "preserve all existing package exports unchanged",
  "keep validator-result package export as a separate later slice",
  "create no validator, dispatch, registry, checkpoint, identity verifier, currentness evaluator, role or authority resolver, approval effect, handoff, delivery, release, persistence, API, route, UI, audit, provider, model, logging, telemetry, or executed-run behavior",
  "add no fields, states, statuses, mappings, aliases, findings, conclusions, scores, approvals, recipients, or readiness states",
  "assign no severity, recommend no remediation, and resolve no blocker",
  "acquire no metadata, perform no real private run, and reopen no domain-specific surface",
  "inspect or process no raw, private, source, case, identity-provider, credential, authorship, or real-evidence material",
  "preserve human/professional review as the release gate",
];
const proofTransitionSection = `Before the future package export may be created, a separate docs-only
proof-transition prerequisite must inventory and release every live package
index or candidate export-proof absence assertion that the future two-file
slice would supersede. Historical absence statements remain preserved.

CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_REQUIRED:
TRUE

This scope boundary does not create that prerequisite or authorize bypassing
any still-live proof assertion.`;
const finalBoundarySection = `This package-export scope boundary is not actual human review, professional
review, legal review, technical review, evidentiary review, identity
verification, authentication, legal advice, professional approval, technical
sign-off, release approval, product or external-use authorization, compliance
certification, admissibility evidence, approval effect, ownership
determination, source-truth conclusion, identity-truth conclusion,
authorship-truth conclusion, chain-of-custody proof, runtime verification,
security approval, deployment readiness, implementation readiness, governance
approval, finding, severity assignment, remediation recommendation, blocker
resolution, metadata acquisition, real private run, domain-specific reopening,
handoff approval, delivery approval, case-truth conclusion, or real-evidence
review.

HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:
TRACKED_DOCS_ONLY_CANDIDATE_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED

REPO_NEXT_ACTION:
none from this boundary; a separate proof-transition prerequisite remains required before candidate package export`;

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function hasExactIdentifier(text, identifier) {
  return new RegExp("\\b" + identifier + "\\b", "u").test(text);
}

function readSection(text, heading, nextHeading) {
  const marker = "## " + heading + "\n";
  const nextMarker = "\n## " + nextHeading + "\n";
  const start = text.indexOf(marker);
  assert.notEqual(start, -1, heading);
  assert.equal(text.indexOf(marker, start + marker.length), -1, heading);
  const bodyStart = start + marker.length;
  const end = text.indexOf(nextMarker, bodyStart);
  assert.notEqual(end, -1, nextHeading);
  return text.slice(bodyStart, end).trim();
}

function markdownTableLines(sectionText) {
  return sectionText
    .split("\n")
    .filter((line) => line.startsWith("| "));
}

function orderedItems(sectionText) {
  const items = [];
  let current = null;

  for (const line of sectionText.split("\n")) {
    const match = line.match(/^\d+\. (.+)$/u);
    if (match) {
      if (current !== null) items.push(current);
      current = match[1];
    } else if (current !== null && /^ {3}\S/u.test(line)) {
      current += " " + line.trim();
    } else if (current !== null) {
      items.push(current);
      current = null;
    }
  }
  if (current !== null) items.push(current);
  return items;
}

function bulletItems(sectionText) {
  const items = [];
  let current = null;

  for (const line of sectionText.split("\n")) {
    const match = line.match(/^- (.+)$/u);
    if (match) {
      if (current !== null) items.push(current);
      current = match[1];
    } else if (current !== null && /^ {2}\S/u.test(line)) {
      current += " " + line.trim();
    } else if (current !== null) {
      items.push(current);
      current = null;
    }
  }
  if (current !== null) items.push(current);
  return items;
}

function normalize(text) {
  return text.replace(/\s+/gu, " ").trim();
}

function normalizedParagraphs(sectionText) {
  return sectionText
    .split(/\n\s*\n/gu)
    .map(normalize)
    .filter(Boolean);
}

function countKey(value, key, predicate = () => true) {
  if (Array.isArray(value)) {
    return value.reduce((count, item) => count + countKey(item, key, predicate), 0);
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

test("candidate package-export scope references exact sources and owner sequence", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A",
    "CANDIDATE_SCHEMA_EXPORT_FIRST",
    "VALIDATOR_RESULT_SCHEMA_EXPORT_SEPARATE_LATER_SLICE",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.doesNotMatch(normalize(docsText), /reviewer identity evidence/iu);
  assert.doesNotMatch(
    docsText,
    /reviewer[-_]identity[-_]evidence|ReviewerIdentityEvidence|REVIEWER_IDENTITY_EVIDENCE/u,
  );
  assert.doesNotMatch(normalize(docsText), /reviewer role evidence/iu);
  assert.doesNotMatch(
    docsText,
    /reviewer[-_]role[-_]evidence|ReviewerRoleEvidence|REVIEWER_ROLE_EVIDENCE/u,
  );
});

test("tracked candidate schema identity fields and keyword counts are exact", () => {
  const docsText = readRequired(docsPath);
  const schema = require("../" + candidateSchemaPath);
  const schemaFactsSection = readSection(
    docsText,
    "3. Current Tracked Candidate Schema Facts",
    "4. Exact Future File Scope",
  );

  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Reviewer Authority Evidence Contract Scaffold",
  );
  assert.deepEqual(markdownTableLines(schemaFactsSection), [
    "| Keyword | Exact value |",
    "| --- | --- |",
    "| `$schema` | `" + schema.$schema + "` |",
    "| `$id` | `" + schema.$id + "` |",
    "| `title` | `" + schema.title + "` |",
  ]);
  assert.deepEqual(schema.required, rootFields);
  assert.deepEqual(Object.keys(schema.properties), rootFields);
  assert.deepEqual(
    namespaceReferenceFields.map((field) => schema.properties[field].pattern),
    [
      "^rae_[a-z0-9][a-z0-9_-]{0,59}$",
      "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
      "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
      "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
    ],
  );
  for (const field of genericReferenceFields) {
    assert.equal(
      schema.properties[field].pattern,
      "^[A-Za-z0-9._:-]{1,128}$",
      field,
    );
  }
  assert.deepEqual(schema.properties.reviewer_role.enum, reviewerRoles);
  assert.deepEqual(
    schema.properties.binding_lifecycle_posture.enum,
    lifecyclePostures,
  );
  assert.equal(
    schema.properties.verification_posture.const,
    "NOT_VERIFIED_BY_CONTRACT",
  );
  assert.equal(schema.properties.human_professional_review_required.const, true);

  const counts = {
    const: countKey(schema, "const"),
    pattern: countKey(schema, "pattern"),
    enum: countKey(schema, "enum"),
    closed: countKey(schema, "additionalProperties", (value) => value === false),
    not: countKey(schema, "not"),
    anyOf: countKey(schema, "anyOf"),
    ref: countKey(schema, "$ref"),
    allOf: countKey(schema, "allOf"),
    minItems: countKey(schema, "minItems"),
    maxItems: countKey(schema, "maxItems"),
    uniqueItems: countKey(schema, "uniqueItems"),
  };
  assert.deepEqual(counts, {
    const: 4,
    pattern: 36,
    enum: 6,
    closed: 1,
    not: 4,
    anyOf: 4,
    ref: 0,
    allOf: 0,
    minItems: 0,
    maxItems: 0,
    uniqueItems: 0,
  });
  for (const [marker, count] of [
    ["TRACKED_SCHEMA_ROOT_FIELD_COUNT", 14],
    ["TRACKED_SCHEMA_NAMESPACE_REFERENCE_FIELD_COUNT", 4],
    ["TRACKED_SCHEMA_GENERIC_REFERENCE_FIELD_COUNT", 4],
    ["TRACKED_SCHEMA_CONST_COUNT", 4],
    ["TRACKED_SCHEMA_PATTERN_COUNT", 36],
    ["TRACKED_SCHEMA_ENUM_COUNT", 6],
    ["TRACKED_SCHEMA_CLOSED_OBJECT_COUNT", 1],
    ["TRACKED_SCHEMA_NOT_COUNT", 4],
    ["TRACKED_SCHEMA_ANY_OF_COUNT", 4],
    ["TRACKED_SCHEMA_REF_COUNT", 0],
    ["TRACKED_SCHEMA_ALLOF_COUNT", 0],
    ["TRACKED_SCHEMA_MIN_ITEMS_COUNT", 0],
    ["TRACKED_SCHEMA_MAX_ITEMS_COUNT", 0],
    ["TRACKED_SCHEMA_UNIQUE_ITEMS_COUNT", 0],
  ]) {
    assert.match(docsText, new RegExp(marker + ":\\n" + count, "u"));
  }
});

test("future candidate export scope name package actions and proof gate are exact", () => {
  const docsText = readRequired(docsPath);
  const fileScopeSection = readSection(
    docsText,
    "4. Exact Future File Scope",
    "5. Exact Future Export Surface",
  );
  const exportSurfaceSection = readSection(
    docsText,
    "5. Exact Future Export Surface",
    "6. Explicitly Separate Sibling Surfaces",
  );
  const proofScopeSection = readSection(
    docsText,
    "7. Exact Future Proof Scope",
    "8. Required Proof Transition",
  );

  assert.deepEqual(markdownTableLines(fileScopeSection), futureFileScopeTable);
  assert.match(docsText, /FUTURE_CANDIDATE_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/u);
  assert.equal(
    normalize(exportSurfaceSection),
    normalize(futureExportSurfaceSection),
  );
  assert.deepEqual(orderedItems(exportSurfaceSection), futurePackageActions);
  assert.match(
    exportSurfaceSection,
    new RegExp(
      "FUTURE_CANDIDATE_PACKAGE_SCHEMA_EXPORT_NAME:\\n" + candidateExportName,
      "u",
    ),
  );
  assert.equal(
    exportSurfaceSection.includes(
      "`../../../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json`",
    ),
    true,
  );
  assert.match(
    docsText,
    /FUTURE_CANDIDATE_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n9/u,
  );
  assert.deepEqual(orderedItems(proofScopeSection), futureProofFamilies);
  assert.equal(
    normalizedParagraphs(proofScopeSection).includes(futureProofExclusionParagraph),
    true,
  );
  assert.match(
    docsText,
    /CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_REQUIRED:\nTRUE/u,
  );
});

test("selected sequence preserves the historical sibling inventory and current retained denials", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired(packageIndexPath);
  const sequenceSection = readSection(
    docsText,
    "6. Explicitly Separate Sibling Surfaces",
    "7. Exact Future Proof Scope",
  );

  assert.match(docsText, /PACKAGE_EXPORT_SEQUENCE_STEP_COUNT:\n2/u);
  assert.match(docsText, /FUTURE_PROHIBITED_SIBLING_EXPORT_NAME_COUNT:\n5/u);
  assert.deepEqual(markdownTableLines(sequenceSection), exportSequenceTable);
  assert.deepEqual(
    bulletItems(sequenceSection),
    prohibitedSiblingNames.map((name) => "`" + name + "`"),
  );
  for (const siblingName of retainedValidatorNames) {
    assert.equal(hasExactIdentifier(packageIndexText, siblingName), false, siblingName);
  }
});

test("current scope is exact fail-closed and creates no export", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(packageExportProofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const scopeProofText = readRequired(proofPath);
  const currentScopeSection = readSection(
    docsText,
    "9. Exact Current Docs-Only File Scope",
    "10. Non-Interference Rules",
  );

  assert.match(docsText, /CURRENT_CANDIDATE_PACKAGE_EXPORT_SCOPE_FILE_COUNT:\n2/u);
  assert.deepEqual(orderedItems(currentScopeSection), currentScopeItems);
  for (const currentPath of [docsPath, proofPath]) {
    readRequired(currentPath);
  }
  for (const targetPath of [packageIndexPath, futureExportProofPath]) {
    assert.equal(transitionText.includes("`" + targetPath + "`"), true, targetPath);
  }
  assert.equal(
    transitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(transitionText.includes("`" + candidateExportName + "`"), true);
  assert.equal(
    scopeProofText.includes(
      "packageIndex" + "Text.includes(candidateExportName)",
    ),
    false,
  );
  assert.equal(
    scopeProofText.includes(
      "packageIndex" +
        "Text.includes(\n      \"human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json\"",
    ),
    false,
  );
  assert.equal(
    scopeProofText.includes(
      "fs." + "existsSync(absolute(futureExportProofPath))",
    ),
    false,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "`" + validatorResultExportProofPath + "`",
    ),
    true,
  );
  assert.equal(
    scopeProofText.includes(
      "fs." + "existsSync(absolute(validatorResultExportProofPath))",
    ),
    false,
  );
  assert.equal(
    scopeProofText.includes(
      "for (const siblingName of prohibited" + "SiblingNames)",
    ),
    false,
  );
  assert.equal(
    scopeProofText.includes(
      "packageIndex" + "Text.includes(siblingName)",
    ),
    false,
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
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "SCHEMA_NOT_CHANGED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CHANGED",
    "VALIDATOR_RESULT_PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "IDENTITY_VERIFICATION_NOT_CREATED",
    "CURRENTNESS_ROLE_AUTHORITY_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SEVERITY_OR_REMEDIATION_CREATED",
    "NO_BLOCKER_RESOLUTION_CREATED",
    "NO_METADATA_ACQUISITION_CREATED",
    "NO_REAL_PRIVATE_RUN_CREATED",
    "NO_DOMAIN_SPECIFIC_REOPENING_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_CANDIDATE_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n7",
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n6",
    "TRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED",
  ]) {
    assert.equal(transitionText.includes(marker), true, marker);
  }
  for (const marker of [
    "VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9",
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8",
    "TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED",
  ]) {
    assert.equal(validatorResultTransitionText.includes(marker), true, marker);
  }
});

test("transition non-interference and final boundary remain exact", () => {
  const docsText = readRequired(docsPath);
  const transitionSection = readSection(
    docsText,
    "8. Required Proof Transition",
    "9. Exact Current Docs-Only File Scope",
  );
  const nonInterferenceSection = readSection(
    docsText,
    "10. Non-Interference Rules",
    "11. Final No-Conclusion Boundary",
  );
  const finalMarker = "## 11. Final No-Conclusion Boundary\n";
  const finalStart = docsText.indexOf(finalMarker);

  assert.equal(normalize(transitionSection), normalize(proofTransitionSection));
  assert.deepEqual(bulletItems(nonInterferenceSection), nonInterferenceRules);
  assert.notEqual(finalStart, -1);
  assert.equal(
    normalize(docsText.slice(finalStart + finalMarker.length)),
    normalize(finalBoundarySection),
  );
});
