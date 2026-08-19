"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const packageExportScopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const packageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultPackageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

const expectedRootFields = [
  "contract_id",
  "contract_version",
  "reviewer_identity_evidence_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "actor_identity_evidence_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "binding_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const genericReferenceFields = [
  "actor_identity_evidence_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const lifecyclePostures = [
  "REVIEWER_IDENTITY_BINDING_DECLARED_ACTIVE",
  "REVIEWER_IDENTITY_BINDING_DECLARED_INACTIVE",
  "REVIEWER_IDENTITY_BINDING_DECLARED_REVOKED",
];
const namespacePatterns = {
  reviewer_identity_evidence_ref: "^rie_[a-z0-9][a-z0-9_-]{0,59}$",
  approval_ref: "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
  review_session_ref: "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
  reviewer_ref: "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
};
const schemaNonEnforcementBoundaries = [
  "object-member order",
  "plain-object or accessor behavior",
  "reference distinctness",
  "external reference equality",
  "dependency validity",
  "validator invocation order",
  "lookup absence",
  "identity truth",
  "authentication",
  "qualification",
  "role",
  "authority",
  "currentness",
  "approval effect",
  "release readiness",
  "substantive candidate meaning",
];
const expectedOpaqueNotAnyOf = [
  { enum: [".", ".."] },
  { pattern: "^[Hh][Tt][Tt][Pp]:" },
  { pattern: "^[Hh][Tt][Tt][Pp][Ss]:" },
  { pattern: "^[Ff][Tt][Pp]:" },
  { pattern: "^[Ff][Ii][Ll][Ee]:" },
  { pattern: "^[Mm][Aa][Ii][Ll][Tt][Oo]:" },
  { pattern: "^[Dd][Aa][Tt][Aa]:" },
  { pattern: "^[Jj][Aa][Vv][Aa][Ss][Cc][Rr][Ii][Pp][Tt]:" },
];
const laterSiblingPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.test.js",
];
const validatorResultCandidatePaths = laterSiblingPaths.slice(0, 2);
const candidatePackageExportProofPath = laterSiblingPaths[2];
const retainedPackageAndValidatorSiblingPaths = laterSiblingPaths.slice(3);
const validatorResultPackageExportProofPath = laterSiblingPaths[3];
const retainedValidatorSiblingPaths = laterSiblingPaths.slice(4);
const remainingPackageExportProofAlignmentPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema.test.js",
];
const packageExportTargetTable = [
  "| Position | Target path | Later action |",
  "| --- | --- | --- |",
  "| 1 | `packages/schemas/src/index.js` | add one candidate-schema binding and export |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-package-export.test.js` | create the focused candidate package-export proof |",
];
const packageExportConflictTable = [
  "| Position | Proof surface | Transition posture |",
  "| --- | --- | --- |",
  "| 1 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js` | `TRANSITION_DIRECTLY_IN_THIS_SLICE` |",
  ...remainingPackageExportProofAlignmentPaths.map(
    (proofPath, index) =>
      `| ${index + 2} | \`${proofPath}\` | \`SEPARATE_FOCUSED_ALIGNMENT_REQUIRED\` |`,
  ),
];
const retainedSiblingTable = [
  "| Position | Retained absent path |",
  "| --- | --- |",
  ...retainedPackageAndValidatorSiblingPaths.map(
    (siblingPath, index) => `| ${index + 1} | \`${siblingPath}\` |`,
  ),
];
const currentPrerequisiteTable = [
  "| Position | Current path | Exact action |",
  "| --- | --- | --- |",
  "| 1 | `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md` | create this docs-only prerequisite |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js` | preserve schema proof while narrowing only its two candidate package-export live absence assertions |",
];
const directTransitionSteps = [
  "keep every schema identity, order, shape, pattern, enum, conditional, fixture, and non-enforcement assertion",
  "preserve all six historical later-sibling path references",
  "keep both validator-result candidate-path transition anchors",
  "add the tracked candidate package-export scope and this transition prerequisite as anchors",
  "stop checking package-index live absence of the candidate schema path",
  "stop checking live absence of the candidate focused package-export proof",
  "keep all three later package-and-validator sibling live absence assertions",
  "keep validator-result package export and validator surfaces separate",
  "freeze the exact seven-surface conflict inventory and one/six partition",
  "retain all six separate proof-alignment gates",
  "preserve every non-interference and no-conclusion boundary",
  "create no export, validator, checkpoint, identity, authority, approval-effect, handoff, delivery, release, or runtime behavior",
];
const nonInterferenceRules = [
  "preserve both tracked schemas and structural proofs unchanged",
  "narrow only the two candidate package-export live absence assertions in the candidate schema proof",
  "retain six focused proof-alignment gates",
  "retain all three later sibling live absence assertions in the transitioned proof",
  "create no package export in this prerequisite slice",
  "modify no file outside the exact current two-file scope",
  "create no validator, dispatch, registry, checkpoint, identity verifier, currentness evaluator, role or authority resolver, admissibility evaluator, approval effect, handoff, delivery, release, persistence, API, route, UI, audit, provider, model, logging, telemetry, or executed-run behavior",
  "add no fields, states, statuses, mappings, aliases, conclusions, scores, approvals, sign-offs, recipients, or readiness states",
  "create no finding, assign no severity, recommend no remediation, and resolve no blocker",
  "acquire no metadata, perform no real private run, and reopen no domain-specific surface",
  "inspect or process no raw, private, source, case, identity-provider, credential, authorship, or real-evidence material",
  "create no product candidate or external-use authorization",
  "preserve human/professional review as the release gate",
];
const finalBoundarySection = `This proof-transition prerequisite is not actual human review, professional
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

HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:
TRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED

REPO_NEXT_ACTION:
none from this boundary; six focused proof alignments remain before candidate package schema export`;

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, "expected " + filePath);
  return fs.readFileSync(filePath, "utf8");
}

function sectionBetween(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  assert.notEqual(start, -1, startMarker);
  assert.equal(text.indexOf(startMarker, start + startMarker.length), -1, startMarker);
  const bodyStart = start + startMarker.length;
  const end = text.indexOf(endMarker, bodyStart);
  assert.notEqual(end, -1, endMarker);
  return text.slice(bodyStart, end).trim();
}

function tableLines(sectionText) {
  return sectionText.split("\n").filter((line) => line.startsWith("| "));
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

function matchesBranch(value, branch) {
  if (branch.enum && !branch.enum.includes(value)) return false;
  if (branch.pattern) {
    return typeof value === "string" && new RegExp(branch.pattern, "u").test(value);
  }
  return true;
}

function matchesDefinition(value, definition) {
  if (definition.type === "string" && typeof value !== "string") return false;
  if (definition.type === "boolean" && typeof value !== "boolean") return false;
  if (Object.hasOwn(definition, "const") && value !== definition.const) return false;
  if (definition.enum && !definition.enum.includes(value)) return false;
  if (definition.pattern && !new RegExp(definition.pattern, "u").test(value)) {
    return false;
  }
  if (
    definition.not?.anyOf &&
    definition.not.anyOf.some((branch) => matchesBranch(value, branch))
  ) {
    return false;
  }
  return true;
}

function hasExactObjectShape(value, definition) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const actualKeys = Object.keys(value);
  if (
    definition.additionalProperties === false &&
    actualKeys.some((key) => !Object.hasOwn(definition.properties, key))
  ) {
    return false;
  }
  return definition.required.every((field) => Object.hasOwn(value, field));
}

function validateAgainstSchemaContract(schema, candidate) {
  if (!hasExactObjectShape(candidate, schema)) return false;
  return expectedRootFields.every((field) =>
    matchesDefinition(candidate[field], schema.properties[field]),
  );
}

function createCandidate(overrides = {}) {
  return {
    contract_id:
      "human_review.controlled_handoff_human_professional_approval_reviewer_identity_evidence",
    contract_version: "1.0.0",
    reviewer_identity_evidence_ref: "rie_evidence_001",
    approval_ref: "apr_review_001",
    review_session_ref: "rvs_session_001",
    reviewer_ref: "rvr_reviewer_001",
    actor_identity_evidence_ref: "actor.identity:001",
    binding_issuer_ref: "issuer_identity-001",
    binding_provenance_ref: "provenance.record:001",
    binding_lifecycle_posture: "REVIEWER_IDENTITY_BINDING_DECLARED_ACTIVE",
    verification_posture: "NOT_VERIFIED_BY_CONTRACT",
    human_professional_review_required: true,
    ...overrides,
  };
}

test("one exact twelve-field candidate is structurally schema-valid", () => {
  const schema = require(schemaPath);

  assert.equal(validateAgainstSchemaContract(schema, createCandidate()), true);
});

test("schema identity metadata root type and closure are exact", () => {
  const schemaText = readRequired(schemaPath);
  const schema = JSON.parse(schemaText);

  assert.deepEqual(Object.keys(schema), [
    "$schema",
    "$id",
    "title",
    "type",
    "additionalProperties",
    "required",
    "properties",
  ]);
  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Reviewer Identity Evidence Contract Scaffold",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
});

test("required and properties contain exactly twelve fields in documentation order", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.required, expectedRootFields);
  assert.deepEqual(Object.keys(schema.properties), expectedRootFields);
  assert.equal(Object.hasOwn(schema, "$defs"), false);
  assert.deepEqual(
    expectedRootFields.map((field) => schema.properties[field].type),
    [...Array(11).fill("string"), "boolean"],
  );
});

test("missing additional null nested array and wrong-type values fail closed", () => {
  const schema = require(schemaPath);
  const valid = createCandidate();

  for (const candidate of [null, [], "candidate", 1, false]) {
    assert.equal(validateAgainstSchemaContract(schema, candidate), false);
  }
  for (const field of expectedRootFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(validateAgainstSchemaContract(schema, missing), false, field);

    for (const invalidValue of [null, {}, []]) {
      assert.equal(
        validateAgainstSchemaContract(
          schema,
          createCandidate({ [field]: invalidValue }),
        ),
        false,
        field + " " + JSON.stringify(invalidValue),
      );
    }
  }
  assert.equal(
    validateAgainstSchemaContract(schema, { ...valid, extra: "blocked" }),
    false,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createCandidate({ human_professional_review_required: "true" }),
    ),
    false,
  );
});

test("fixed values namespaces lifecycle enum and review flag are exact", () => {
  const schema = require(schemaPath);

  for (const [field, pattern] of Object.entries(namespacePatterns)) {
    assert.deepEqual(schema.properties[field], { type: "string", pattern });
  }
  assert.deepEqual(schema.properties.binding_lifecycle_posture.enum, lifecyclePostures);
  assert.equal(schema.properties.verification_posture.const, "NOT_VERIFIED_BY_CONTRACT");
  assert.equal(schema.properties.human_professional_review_required.const, true);

  for (const [field, value] of [
    ["contract_id", "human_review.other"],
    ["contract_version", "2.0.0"],
    ["reviewer_identity_evidence_ref", "reviewer_evidence_001"],
    ["approval_ref", "approval_001"],
    ["review_session_ref", "session_001"],
    ["reviewer_ref", "reviewer_001"],
    ["binding_lifecycle_posture", "ACTIVE"],
    ["verification_posture", "VERIFIED"],
    ["human_professional_review_required", false],
  ]) {
    assert.equal(
      validateAgainstSchemaContract(schema, createCandidate({ [field]: value })),
      false,
      field,
    );
  }
});

test("generic opaque references enforce minimum maximum alphabet and punctuation", () => {
  const schema = require(schemaPath);

  for (const field of genericReferenceFields) {
    for (const value of ["a", "A._:-9", "z".repeat(128)]) {
      assert.equal(
        validateAgainstSchemaContract(schema, createCandidate({ [field]: value })),
        true,
        field + " " + value.length,
      );
    }
    for (const value of ["", "z".repeat(129), "slash/value", "space value", "name@host"])
      assert.equal(
        validateAgainstSchemaContract(schema, createCandidate({ [field]: value })),
        false,
        field + " " + value.length,
      );
  }
});

test("dot and dot-dot generic opaque references are rejected", () => {
  const schema = require(schemaPath);

  for (const field of genericReferenceFields) {
    for (const value of [".", ".."]) {
      assert.equal(
        validateAgainstSchemaContract(schema, createCandidate({ [field]: value })),
        false,
        field + " " + value,
      );
    }
  }
});

test("all seven prohibited schemes are rejected case-insensitively", () => {
  const schema = require(schemaPath);
  const prohibited = [
    ["http:record", "HTTP:record", "hTtP:record"],
    ["https:record", "HTTPS:record", "hTtPs:record"],
    ["ftp:record", "FTP:record", "fTp:record"],
    ["file:record", "FILE:record", "fIlE:record"],
    ["mailto:record", "MAILTO:record", "mAiLtO:record"],
    ["data:record", "DATA:record", "dAtA:record"],
    ["javascript:record", "JAVASCRIPT:record", "jAvAsCrIpT:record"],
  ];

  for (const field of genericReferenceFields) {
    for (const examples of prohibited) {
      for (const value of examples) {
        assert.equal(
          validateAgainstSchemaContract(schema, createCandidate({ [field]: value })),
          false,
          field + " " + value,
        );
      }
    }
  }
});

test("all generic-reference fields carry the exact ordered negative rule", () => {
  const schema = require(schemaPath);

  for (const field of genericReferenceFields) {
    const definition = schema.properties[field];
    assert.deepEqual(Object.keys(definition), ["type", "pattern", "not"]);
    assert.equal(definition.type, "string");
    assert.equal(definition.pattern, "^[A-Za-z0-9._:-]{1,128}$");
    assert.deepEqual(Object.keys(definition.not), ["anyOf"]);
    assert.deepEqual(definition.not.anyOf, expectedOpaqueNotAnyOf);
    assert.equal(Object.hasOwn(definition, "format"), false);
  }
});

test("candidate property insertion order does not alter schema validity", () => {
  const schema = require(schemaPath);
  const canonical = createCandidate();
  const reversed = Object.fromEntries(
    [...expectedRootFields].reverse().map((field) => [field, canonical[field]]),
  );

  assert.deepEqual(Object.keys(reversed), [...expectedRootFields].reverse());
  assert.equal(validateAgainstSchemaContract(schema, reversed), true);
  assert.deepEqual(schema.required, expectedRootFields);
  assert.deepEqual(Object.keys(schema.properties), expectedRootFields);
});

test("equal generic references remain schema-valid and distinctness stays outside", () => {
  const schema = require(schemaPath);
  const sharedReference = "shared.identity:001";

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createCandidate({
        actor_identity_evidence_ref: sharedReference,
        binding_issuer_ref: sharedReference,
        binding_provenance_ref: sharedReference,
      }),
    ),
    true,
  );
  assert.equal(Object.hasOwn(schema, "uniqueItems"), false);
});

test("syntactically valid opaque references create no identity or authority proof", () => {
  const schema = require(schemaPath);

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createCandidate({
        reviewer_identity_evidence_ref: "rie_unregistered",
        approval_ref: "apr_unregistered",
        review_session_ref: "rvs_unregistered",
        reviewer_ref: "rvr_unregistered",
        actor_identity_evidence_ref: "unknown.actor:001",
        binding_issuer_ref: "unknown.issuer:001",
        binding_provenance_ref: "unknown.provenance:001",
        binding_lifecycle_posture: "REVIEWER_IDENTITY_BINDING_DECLARED_REVOKED",
      }),
    ),
    true,
  );
  assert.equal(schema.properties.verification_posture.const, "NOT_VERIFIED_BY_CONTRACT");
});

test("historical siblings and the current package-export 1/6 transition remain exact", () => {
  const proofText = readRequired(__filename);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultTransitionPath,
  );
  const packageExportScopeText = readRequired(packageExportScopePath);
  const packageExportTransitionText = readRequired(packageExportTransitionPath);
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportTransitionPath,
  );
  const targetSection = sectionBetween(
    packageExportTransitionText,
    "## 4. Exact Candidate Package Export Targets",
    "## 5.",
  );
  const conflictSection = sectionBetween(
    packageExportTransitionText,
    "## 5. Exact Live Proof Conflict Inventory",
    "## 6.",
  );
  const retainedSection = sectionBetween(
    packageExportTransitionText,
    "## 6. Three Retained Later Sibling Absence Requirements",
    "## 7.",
  );
  const currentScopeSection = sectionBetween(
    packageExportTransitionText,
    "## 7. Exact Current Two-File Slice",
    "## 8.",
  );
  const directTransitionSection = sectionBetween(
    packageExportTransitionText,
    "## 8. Exact Direct Schema-Proof Transition",
    "## 9.",
  );
  const nonInterferenceSection = sectionBetween(
    packageExportTransitionText,
    "## 10. Non-Interference And Proof Boundary",
    "## 11.",
  );

  assert.match(scopeText, /LATER_SIBLING_PATH_COUNT:\n6/u);
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  for (const relativePath of laterSiblingPaths) {
    assert.equal(scopeText.includes("`" + relativePath + "`"), true, relativePath);
    assert.equal(
      transitionText.includes(
        "`" + relativePath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      relativePath,
    );
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
  assert.match(
    packageExportScopeText,
    /OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A/u,
  );
  for (const targetPath of [
    "packages/schemas/src/index.js",
    candidatePackageExportProofPath,
  ]) {
    assert.equal(
      packageExportTransitionText.includes("`" + targetPath + "`"),
      true,
      targetPath,
    );
  }
  assert.equal(
    packageExportTransitionText.includes(
      "`humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidence`",
    ),
    true,
  );
  assert.deepEqual(tableLines(targetSection), packageExportTargetTable);
  assert.deepEqual(tableLines(conflictSection), packageExportConflictTable);
  assert.deepEqual(tableLines(retainedSection), retainedSiblingTable);
  assert.deepEqual(tableLines(currentScopeSection), currentPrerequisiteTable);
  assert.deepEqual(orderedItems(directTransitionSection), directTransitionSteps);
  assert.deepEqual(bulletItems(nonInterferenceSection), nonInterferenceRules);
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n7",
    "DIRECT_SCHEMA_PROOF_TRANSITION_COUNT:\n1",
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n6",
    "RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT:\n3",
    "CURRENT_PREREQUISITE_FILE_COUNT:\n2",
    "DIRECT_SCHEMA_PROOF_TRANSITION_STEP_COUNT:\n12",
    "TRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED",
  ]) {
    assert.equal(packageExportTransitionText.includes(marker), true, marker);
  }
  assert.equal(
    packageExportTransitionText.includes(
      "`tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js` | `TRANSITION_DIRECTLY_IN_THIS_SLICE`",
    ),
    true,
  );
  for (const remainingPath of remainingPackageExportProofAlignmentPaths) {
    assert.equal(
      packageExportTransitionText.includes(
        "`" + remainingPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
      ),
      true,
      remainingPath,
    );
  }
  assert.equal(
    proofText.includes("fs." + "existsSync(absolute(relativePath))"),
    false,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(validatorResultCandidatePath))",
    ),
    false,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
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
  assert.equal(proofText.includes("packageIndex" + "Text.includes("), false);
  assert.deepEqual(
    retainedPackageAndValidatorSiblingPaths,
    laterSiblingPaths.slice(3),
  );
  assert.deepEqual(
    retainedValidatorSiblingPaths,
    laterSiblingPaths.slice(4),
  );
  for (const retainedPath of retainedValidatorSiblingPaths) {
    assert.equal(
      validatorResultTransitionText.includes(
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
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_LIVE_PROOF_CONFLICT_COUNT:\n5/u,
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
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n4/u,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      `| 2 | \`tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js\` | preserve candidate-schema structural proof and four sibling absences; align only the two validator-result candidate paths |`,
    ),
    true,
  );
  assert.match(
    validatorResultTransitionText,
    /TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  const finalMarker = "## 11. Final No-Conclusion Boundary\n";
  const finalStart = packageExportTransitionText.indexOf(finalMarker);
  assert.notEqual(finalStart, -1);
  assert.equal(
    normalize(packageExportTransitionText.slice(finalStart + finalMarker.length)),
    normalize(finalBoundarySection),
  );
});

test("contract anchors remain exact while downstream and runtime semantics stay absent", () => {
  const schema = require(schemaPath);
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);
  const normalizedScopeText = scopeText.replace(/\s+/gu, " ");

  assert.match(contractText, /OWNER_SELECTED_NINETEEN_STAGE_SEMANTICS_TRANSLATED/u);
  assert.match(contractText, /OPEN_CONTRACT_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(scopeText, /OWNER_SELECTED_NINE_STAGE_SCOPE_TRANSLATED/u);
  assert.match(scopeText, /OPEN_SCHEMA_SCAFFOLD_SCOPE_DECISION_COUNT:\n0/u);
  assert.match(
    scopeText,
    /TRACKED_DOCS_ONLY_EXACT_TWO_FILE_FUTURE_SCHEMA_SCOPE_FROZEN/u,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(transitionText, /REMAINING_CANDIDATE_PATH_PROOF_ALIGNMENT_COUNT:\n0/u);
  for (const boundary of schemaNonEnforcementBoundaries) {
    assert.equal(normalizedScopeText.includes(boundary), true, boundary);
  }
  for (const marker of [
    "PACKAGE_EXPORT_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "VALIDATOR_RESULT_SCHEMA_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "STRUCTURAL_VALIDATOR_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "CROSS_REFERENCE_ADMISSIBILITY_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "IDENTITY_VERIFICATION_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "HANDOFF_EXPORT_DELIVERY_RELEASE_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
  ]) {
    assert.equal(scopeText.includes(marker), true, marker);
  }

  for (const field of [
    "reviewer_role",
    "reviewer_authority_evidence_ref",
    "current_request_binding_ref",
    "trusted_time",
    "currentness",
    "admissibility",
    "approval_effect",
    "valid",
    "errors",
    "path",
    "persistence",
    "api",
    "ui",
    "runtime",
  ]) {
    assert.equal(Object.hasOwn(schema.properties, field), false, field);
  }
});
