"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaRelativePath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json";
const proofRelativePath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js";
const schemaPath = path.join(repoRoot, schemaRelativePath);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
);
const errorPathPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
);
const readinessPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const candidatePackageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultPackageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

const resultFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
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
const duplicateReferencePaths = [
  "$.decision_basis_ref",
  "$.approval_ref",
  "$.review_session_ref",
  "$.reviewer_ref",
  "$.basis_subject_ref",
  "$.binding_issuer_ref",
  "$.binding_provenance_ref",
];
const staticPaths = ["$", ...rootFieldPaths];
const errorPartitions = [
  {
    code: "required_field_missing",
    path: { enum: rootFieldPaths },
  },
  {
    code: "unexpected_field",
    path: { const: "$" },
  },
  {
    code: "invalid_field_type",
    path: { enum: staticPaths },
  },
  {
    code: "invalid_field_value",
    path: { enum: rootFieldPaths },
  },
  {
    code: "duplicate_reference",
    path: { enum: duplicateReferencePaths },
  },
];
const candidatePaths = [schemaRelativePath, proofRelativePath];
const retainedSiblingPaths = [
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
];
const candidatePackageExportProofPath = retainedSiblingPaths[0];
const retainedAfterCandidateExportPaths = retainedSiblingPaths.slice(1);
const validatorResultPackageExportProofPath = retainedAfterCandidateExportPaths[0];
const retainedValidatorPaths = retainedAfterCandidateExportPaths.slice(1);
const fence = String.fromCharCode(96);
const validatorResultPackageExportTargetsTable = [
  "| Position | Target path | Later action |",
  "| --- | --- | --- |",
  "| 1 | `packages/schemas/src/index.js` | add one validator-result schema binding and export |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js` | create the focused result export proof |",
];
const validatorResultPackageExportControllingSources = [
  "`schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json`",
  "`tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js`",
  "`tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js`",
  "`docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md`",
  "`tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js`",
  "`packages/schemas/src/index.js`",
];
const validatorResultPackageExportPrecedents = [
  "`docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md`",
  "`docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md`",
  "`docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md`",
];
const validatorResultPackageExportCanonicalBoundary =
  "The controlling sources supply the exact validator-result schema identity, selected export symbol, completed candidate export, and sibling boundaries. The precedent supplies only historical-versus-live proof transition structure. It supplies no decision-basis, subject, issuer, provenance, session, identity, trusted-time, lifecycle-currentness, reviewer-role, reviewer-authority, admissibility, approval, handoff, delivery, release, validation, or runtime semantics.";
const validatorResultPackageExportClassificationTable = [
  "| Surface | Current proof posture | Required prerequisite posture |",
  "| --- | --- | --- |",
  "| validator-result schema identity and structure | exact tracked proof | preserve unchanged |",
  "| historical validator-result unexported posture | correct for schema slice | preserve as historical evidence |",
  "| structural proof package-index path absence | asserted | narrow in this slice |",
  "| structural proof focused export-proof absence | asserted | narrow in this slice |",
  "| eight other proof surfaces | assert live result export absence | retain pending separate alignments |",
  "| validator implementation and proof files | assert live absence | retain both |",
];
const validatorResultPackageExportConflictTable = [
  "| Position | Proof surface | Transition posture |",
  "| --- | --- | --- |",
  "| 1 | `tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js` | `TRANSITION_DIRECTLY_IN_THIS_SLICE` |",
  "| 2 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED` |",
  "| 3 | `tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED` |",
  "| 4 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED` |",
  "| 5 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED` |",
  "| 6 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED` |",
  "| 7 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-schema-export-scope-boundary-doc-freeze.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED` |",
  "| 8 | `tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED` |",
  "| 9 | `tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED` |",
];
const retainedValidatorTable = [
  "| Position | Retained absent path |",
  "| --- | --- |",
  "| 1 | `packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js` |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js` |",
];
const currentPrerequisiteTable = [
  "| Position | Current path | Exact action |",
  "| --- | --- | --- |",
  "| 1 | `docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md` | create this prerequisite |",
  "| 2 | `tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js` | preserve structural proof while narrowing only its result export live absence assertions |",
];
const directTransitionSteps = [
  "keep every schema identity, field-order, decision, subject-kind, subject-reference, basis-posture, reviewer-role, basis-lifecycle, state-coupling, error partition, path, cardinality, and fixture assertion",
  "keep candidate and validator-result schema transition anchors",
  "keep the completed candidate package export and its transition anchor",
  "keep both validator-file live absence assertions",
  "keep validator and runtime fragments absent from the schema",
  "add this validator-result package-export transition as a tracked anchor",
  "stop checking package-index live absence of the validator-result schema path",
  "stop checking live absence of the validator-result focused package-export proof",
  "retain all eight separate alignment gates and every no-conclusion boundary",
  "preserve the exact future export symbol and two target paths without creating either target",
];
const transitionNonInterferenceRules = [
  "preserve both schemas and structural proofs",
  "preserve the completed candidate schema export",
  "narrow only two result-export live absence assertions in the structural proof",
  "retain eight alignment gates and both validator-file absence assertions",
  "create no result export in this prerequisite",
  "create no validator, dispatch, registry, cross-reference checkpoint, admissibility checkpoint, decision-basis or subject verifier, issuer, provenance, session, or identity verifier, trusted-time or lifecycle-currentness evaluator, reviewer-role or authority resolver, approval effect, handoff, delivery, release, persistence, API, route, UI, audit, provider, model, logging, telemetry, or executed-run behavior",
  "inspect or process no raw, private, source, case, decision-basis, subject, issuer, provenance, session, identity-provider, credential, authorship, or real-evidence material",
  "assign no severity, recommend no remediation, resolve no blocker, acquire no metadata, execute no real private run, and reopen no domain-specific boundary",
  "preserve human/professional review as the release gate",
];
const transitionFinalNoConclusionBoundary =
  "This prerequisite is not actual human review, professional review, legal review, technical review, evidentiary review, decision-basis or subject-existence verification, subject-membership verification, subject-pair uniqueness verification, subject-truth or subject-authenticity verification, relevance, support, sufficiency or probative-value verification, issuer-trust or provenance verification, review-session or identity verification, trusted-time or lifecycle-currentness verification, reviewer-role or authority verification, authentication, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, admissibility evidence, approval effect, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, finding, severity assignment, remediation recommendation, blocker resolution, metadata acquisition, real private run, domain-specific reopening, handoff approval, delivery approval, case-truth conclusion, or real-evidence review.";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, "expected " + filePath);
  return fs.readFileSync(filePath, "utf8");
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

function standaloneBacktickLines(section) {
  return section
    .split("\n")
    .filter((line) => /^`[^`]+`$/u.test(line));
}

function numberedListLines(section) {
  return section.split("\n").filter((line) => /^\d+\. /u.test(line));
}

function exactNumberedLines(values) {
  return values.map((value, index) => String(index + 1) + ". " + value);
}

function bulletListItems(section) {
  const items = [];
  let currentIndex = -1;

  for (const line of section.split("\n")) {
    if (line.startsWith("- ")) {
      items.push(line.slice(2).trim());
      currentIndex = items.length - 1;
    } else if (currentIndex >= 0 && /^\s{2,}\S/u.test(line)) {
      items[currentIndex] += " " + line.trim();
    } else {
      currentIndex = -1;
    }
  }
  return items;
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, canonicalize(value[key])]),
  );
}

function matchesSchema(value, definition) {
  if (definition.type === "boolean" && typeof value !== "boolean") return false;
  if (definition.type === "string" && typeof value !== "string") return false;
  if (definition.type === "array" && !Array.isArray(value)) return false;
  if (definition.type === "object" && !isObject(value)) return false;
  if (Object.hasOwn(definition, "const") && value !== definition.const) {
    return false;
  }
  if (definition.enum && !definition.enum.includes(value)) return false;
  if (definition.maxItems !== undefined && value.length > definition.maxItems) {
    return false;
  }
  if (definition.minItems !== undefined && value.length < definition.minItems) {
    return false;
  }
  if (definition.required) {
    if (!isObject(value)) return false;
    if (definition.required.some((field) => !Object.hasOwn(value, field))) {
      return false;
    }
  }
  if (definition.additionalProperties === false) {
    if (!isObject(value)) return false;
    if (
      Object.keys(value).some(
        (field) => !Object.hasOwn(definition.properties ?? {}, field),
      )
    ) {
      return false;
    }
  }
  if (definition.properties && isObject(value)) {
    for (const [field, fieldDefinition] of Object.entries(definition.properties)) {
      if (
        Object.hasOwn(value, field) &&
        !matchesSchema(value[field], fieldDefinition)
      ) {
        return false;
      }
    }
  }
  if (definition.items && Array.isArray(value)) {
    if (value.some((item) => !matchesSchema(item, definition.items))) return false;
  }
  if (definition.uniqueItems && Array.isArray(value)) {
    const canonicalItems = value.map((item) =>
      JSON.stringify(canonicalize(item)),
    );
    if (new Set(canonicalItems).size !== canonicalItems.length) return false;
  }
  if (definition.oneOf) {
    const matchingBranches = definition.oneOf.filter((branch) =>
      matchesSchema(value, branch),
    );
    if (matchingBranches.length !== 1) return false;
  }
  return true;
}

function createResult(overrides = {}) {
  return {
    valid: true,
    contractKind:
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors: [],
    ...overrides,
  };
}

test("validator-result schema has exact identity and root keyword order", () => {
  const schema = JSON.parse(readRequired(schemaPath));

  assert.deepEqual(Object.keys(schema), [
    "$schema",
    "$id",
    "title",
    "type",
    "additionalProperties",
    "required",
    "properties",
    "oneOf",
  ]);
  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Validator Result Contract",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
});

test("root fields types identity literals and closure are exact", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.required, resultFields);
  assert.deepEqual(Object.keys(schema.properties), resultFields);
  assert.deepEqual(resultFields.map((field) => schema.properties[field].type), [
    "boolean",
    "string",
    "string",
    "array",
  ]);
  assert.deepEqual(schema.properties.valid, { type: "boolean" });
  assert.deepEqual(schema.properties.contractKind, {
    type: "string",
    const:
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_BOUNDARY",
  });
  assert.deepEqual(schema.properties.version, {
    type: "string",
    const: "1.0.0",
  });
  assert.deepEqual(Object.keys(schema.properties.errors), [
    "type",
    "uniqueItems",
    "items",
  ]);
  assert.equal(schema.properties.errors.uniqueItems, true);
});

test("root oneOf couples exactly one success or failure state", () => {
  const schema = require(schemaPath);

  assert.deepEqual(schema.oneOf, [
    { properties: { valid: { const: true }, errors: { maxItems: 0 } } },
    { properties: { valid: { const: false }, errors: { minItems: 1 } } },
  ]);
  assert.equal(matchesSchema(createResult(), schema), true);
  assert.equal(
    matchesSchema(
      createResult({
        valid: false,
        errors: [{ code: "unexpected_field", path: "$" }],
      }),
      schema,
    ),
    true,
  );
});

test("inline error item is the exact closed two-field object", () => {
  const item = require(schemaPath).properties.errors.items;

  assert.deepEqual(Object.keys(item), [
    "type",
    "additionalProperties",
    "required",
    "properties",
    "oneOf",
  ]);
  assert.equal(item.type, "object");
  assert.equal(item.additionalProperties, false);
  assert.deepEqual(item.required, errorFields);
  assert.deepEqual(Object.keys(item.properties), errorFields);
  assert.deepEqual(errorFields.map((field) => item.properties[field].type), [
    "string",
    "string",
  ]);
  assert.deepEqual(item.properties.code, { type: "string" });
  assert.deepEqual(item.properties.path, { type: "string" });
  assert.equal(item.oneOf.length, 5);
  assert.equal(Object.hasOwn(item, "$defs"), false);
});

test("five code-to-path branches preserve the exact closed partition", () => {
  const branches = require(schemaPath).properties.errors.items.oneOf;

  assert.deepEqual(
    branches.map((branch) => branch.properties.code.const),
    errorPartitions.map((partition) => partition.code),
  );
  for (const [index, branch] of branches.entries()) {
    assert.deepEqual(Object.keys(branch), ["properties"]);
    assert.deepEqual(Object.keys(branch.properties), errorFields);
    assert.deepEqual(Object.keys(branch.properties.code), ["const"]);
    assert.deepEqual(branch.properties.path, errorPartitions[index].path);
  }
  assert.deepEqual(
    branches.map((branch) =>
      branch.properties.path.enum
        ? branch.properties.path.enum.length
        : branch.properties.path.const,
    ),
    [16, "$", 17, 16, 7],
  );
});

test("representative error from every partition satisfies structural proof", () => {
  const schema = require(schemaPath);
  const representativeErrors = [
    { code: "required_field_missing", path: "$.contract_id" },
    { code: "unexpected_field", path: "$" },
    { code: "invalid_field_type", path: "$.basis_lifecycle_posture" },
    { code: "invalid_field_value", path: "$.verification_posture" },
    { code: "duplicate_reference", path: "$.binding_provenance_ref" },
  ];

  for (const error of representativeErrors) {
    assert.equal(
      matchesSchema(createResult({ valid: false, errors: [error] }), schema),
      true,
      error.code + ":" + error.path,
    );
  }
  assert.equal(
    matchesSchema(
      createResult({ valid: false, errors: representativeErrors }),
      schema,
    ),
    true,
  );
});

test("missing unknown type identity and state violations fail closed", () => {
  const schema = require(schemaPath);
  const valid = createResult();

  for (const field of resultFields) {
    const missing = { ...valid };
    delete missing[field];
    assert.equal(matchesSchema(missing, schema), false, field);
  }
  assert.equal(matchesSchema(null, schema), false);
  assert.equal(matchesSchema([], schema), false);
  assert.equal(matchesSchema({ ...valid, extra: true }, schema), false);
  assert.equal(matchesSchema({ ...valid, valid: "true" }, schema), false);
  assert.equal(matchesSchema({ ...valid, errors: {} }, schema), false);
  assert.equal(matchesSchema({ ...valid, contractKind: "OTHER" }, schema), false);
  assert.equal(matchesSchema({ ...valid, version: "1.0.1" }, schema), false);
  assert.equal(
    matchesSchema(
      createResult({
        valid: true,
        errors: [{ code: "unexpected_field", path: "$" }],
      }),
      schema,
    ),
    false,
  );
  assert.equal(matchesSchema(createResult({ valid: false }), schema), false);
});

test("cross-pairs extra fields and duplicate errors fail closed", () => {
  const schema = require(schemaPath);
  const duplicate = {
    code: "duplicate_reference",
    path: "$.approval_ref",
  };

  assert.equal(
    matchesSchema(
      createResult({
        valid: false,
        errors: [duplicate, { path: duplicate.path, code: duplicate.code }],
      }),
      schema,
    ),
    false,
  );
  for (const invalidError of [
    { code: "unknown_code", path: "$" },
    { code: "required_field_missing", path: "$" },
    { code: "unexpected_field", path: "$.contract_id" },
    { code: "invalid_field_type", path: "$.dynamic" },
    { code: "invalid_field_value", path: "$" },
    { code: "duplicate_reference", path: "$.basis_lifecycle_posture" },
    { code: "unexpected_field", path: "$", message: "blocked" },
    { code: "unexpected_field" },
    { path: "$" },
    { code: false, path: "$" },
    { code: "unexpected_field", path: false },
  ]) {
    assert.equal(
      matchesSchema(createResult({ valid: false, errors: [invalidError] }), schema),
      false,
      JSON.stringify(invalidError),
    );
  }
});

test("schema remains structural-only and non-dynamic", () => {
  const schemaText = readRequired(schemaPath);

  for (const fragment of [
    "\"message\"",
    "\"detail\"",
    "\"candidate\"",
    "\"rejected_key\"",
    "\"rejected_value\"",
    "\"approval_data\"",
    "\"reviewer_data\"",
    "\"session_data\"",
    "\"decision_basis_data\"",
    "\"subject_data\"",
    "\"identity_data\"",
    "\"role_data\"",
    "\"authority_data\"",
    "\"timestamp\"",
    "\"fingerprint\"",
    "\"exception\"",
    "\"finding\"",
    "\"conclusion\"",
    "\"score\"",
    "\"readiness\"",
    "\"remediation\"",
    "\"recipient\"",
    "\"$defs\"",
    "\"pattern\"",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
});

test("proof transitions preserve schema candidates and retain validator absences", () => {
  const transitionText = readRequired(transitionPath);
  const candidatePackageExportTransitionText = readRequired(
    candidatePackageExportTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportTransitionPath,
  );
  const structuralProofText = readRequired(__filename);
  const classificationSection = sectionBetween(
    validatorResultPackageExportTransitionText,
    "## 3. Exact Conflict Classification",
    "## 4.",
  );
  const canonicalSection = sectionBetween(
    validatorResultPackageExportTransitionText,
    "## 2. Canonical Sources And Precedent",
    "## 3.",
  );
  const controllingSourcesSection = sectionBetween(
    canonicalSection,
    "The controlling sources are:",
    "Repository transition precedent only:",
  );
  const precedentsSection = sectionBetween(
    canonicalSection,
    "Repository transition precedent only:",
    "The controlling sources supply",
  );
  const targetsSection = sectionBetween(
    validatorResultPackageExportTransitionText,
    "## 4. Exact Validator-Result Package Export Targets",
    "## 5.",
  );
  const conflictSection = sectionBetween(
    validatorResultPackageExportTransitionText,
    "## 5. Exact Live Proof Conflict Inventory",
    "## 6.",
  );
  const retainedSection = sectionBetween(
    validatorResultPackageExportTransitionText,
    "## 6. Two Retained Validator File Absence Requirements",
    "## 7.",
  );
  const currentScopeSection = sectionBetween(
    validatorResultPackageExportTransitionText,
    "## 7. Exact Current Two-File Slice",
    "## 8.",
  );
  const directTransitionSection = sectionBetween(
    validatorResultPackageExportTransitionText,
    "## 8. Exact Direct Structural-Proof Transition",
    "## 9.",
  );
  const nonInterferenceSection = sectionBetween(
    validatorResultPackageExportTransitionText,
    "## 10. Non-Interference And Proof Boundary",
    "## 11.",
  );
  const finalBoundarySection = sectionBetween(
    validatorResultPackageExportTransitionText,
    "This prerequisite is not actual human review",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:",
  );

  assert.deepEqual(
    bulletListItems(controllingSourcesSection),
    validatorResultPackageExportControllingSources,
  );
  assert.deepEqual(
    bulletListItems(precedentsSection),
    validatorResultPackageExportPrecedents,
  );
  for (const source of [
    ...validatorResultPackageExportControllingSources,
    ...validatorResultPackageExportPrecedents,
  ]) {
    readRequired(absolute(source.slice(1, -1)));
  }
  assert.equal(
    canonicalSection
      .slice(canonicalSection.indexOf("The controlling sources supply"))
      .replace(/\s+/gu, " ")
      .trim(),
    validatorResultPackageExportCanonicalBoundary,
  );
  assert.deepEqual(
    tableLines(classificationSection),
    validatorResultPackageExportClassificationTable,
  );
  assert.match(
    classificationSection,
    /PROOF_CONFLICT_CLASSIFICATION:\nHISTORICAL_VALIDATOR_RESULT_PROOF_CORRECT_PACKAGE_EXPORT_ASSERTIONS_PARTIALLY_SUPERSEDED/u,
  );
  assert.deepEqual(
    tableLines(targetsSection),
    validatorResultPackageExportTargetsTable,
  );
  assert.match(
    targetsSection,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_TARGET_PATH_COUNT:\n2/u,
  );
  assert.deepEqual(standaloneBacktickLines(targetsSection), [
    "`humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorResult`",
    "`humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence`",
  ]);
  assert.deepEqual(
    tableLines(conflictSection),
    validatorResultPackageExportConflictTable,
  );
  assert.deepEqual(tableLines(retainedSection), retainedValidatorTable);
  assert.deepEqual(tableLines(currentScopeSection), currentPrerequisiteTable);
  assert.deepEqual(
    numberedListLines(directTransitionSection),
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

  for (const candidatePath of candidatePaths) {
    assert.equal(fs.existsSync(absolute(candidatePath)), true, candidatePath);
    assert.equal(
      transitionText.includes(
        fence +
          candidatePath +
          fence +
          " | " +
          fence +
          "PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE" +
          fence,
      ),
      true,
      candidatePath,
    );
  }
  for (const retainedPath of retainedValidatorPaths) {
    assert.equal(
      transitionText.includes(
        fence +
          retainedPath +
          fence +
          " | " +
          fence +
          "RETAIN_LIVE_ABSENCE_ASSERTION" +
          fence,
      ),
      true,
      retainedPath,
    );
    assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);
  }
  assert.equal(
    candidatePackageExportTransitionText.includes(
      fence +
        proofRelativePath +
        fence +
        " | " +
        fence +
        "SEPARATE_FOCUSED_ALIGNMENT_REQUIRED" +
        fence,
    ),
    true,
  );
  assert.equal(
    candidatePackageExportTransitionText.includes(
      fence + candidatePackageExportProofPath + fence,
    ),
    true,
  );
  assert.equal(
    structuralProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.match(
    candidatePackageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n8/u,
  );
  assert.match(
    candidatePackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n7/u,
  );
  assert.match(
    transitionText,
    /VALIDATOR_RESULT_SCHEMA_CANDIDATE_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    transitionText,
    /RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  for (const targetPath of [
    "packages/schemas/src/index.js",
    validatorResultPackageExportProofPath,
  ]) {
    assert.equal(
      validatorResultPackageExportTransitionText.includes(
        fence + targetPath + fence,
      ),
      true,
      targetPath,
    );
  }
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      fence +
        "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorResult" +
        fence,
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      fence +
        proofRelativePath +
        fence +
        " | " +
        fence +
        "TRANSITION_DIRECTLY_IN_THIS_SLICE" +
        fence,
    ),
    true,
  );
  for (const marker of [
    "VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9",
    "DIRECT_STRUCTURAL_PROOF_TRANSITION_COUNT:\n1",
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8",
    "RETAINED_VALIDATOR_FILE_ABSENCE_COUNT:\n2",
    "CURRENT_PREREQUISITE_FILE_COUNT:\n2",
    "DIRECT_STRUCTURAL_PROOF_TRANSITION_STEP_COUNT:\n10",
    "TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED",
    "VALIDATOR_RESULT_PACKAGE_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "SCHEMAS_NOT_CHANGED",
    "CANDIDATE_PACKAGE_EXPORT_NOT_CHANGED",
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
    "NO_SEVERITY_ASSIGNMENT_CREATED",
    "NO_REMEDIATION_RECOMMENDATION_CREATED",
    "NO_BLOCKER_RESOLUTION_CREATED",
    "NO_METADATA_ACQUISITION_CREATED",
    "NO_REAL_PRIVATE_RUN_CREATED",
    "NO_DOMAIN_SPECIFIC_REOPENING_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(
      validatorResultPackageExportTransitionText.includes(marker),
      true,
      marker,
    );
  }
  assert.equal(
    structuralProofText.includes("packageIndex" + "Text.includes("),
    false,
  );
  assert.equal(
    structuralProofText.includes(
      "fs." +
        "existsSync(absolute(validatorResultPackageExportProofPath))",
    ),
    false,
  );
});

test("schema remains anchored to contract readiness scope and transition", () => {
  const contractText = readRequired(contractPath);
  const errorPathText = readRequired(errorPathPath);
  const readinessText = readRequired(readinessPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);

  assert.match(
    contractText,
    /OWNER_SELECTED_EIGHTEEN_STAGE_SEMANTICS_TRANSLATED/u,
  );
  assert.match(
    errorPathText,
    /OWNER_SELECTED_SEVEN_STAGE_SEMANTICS_TRANSLATED/u,
  );
  assert.match(
    readinessText,
    /TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_READINESS_ASSESSED/u,
  );
  assert.match(
    scopeText,
    /TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED/u,
  );
  assert.match(scopeText, /FUTURE_VALIDATOR_RESULT_SCHEMA_SLICE_FILE_COUNT:\n2/u);
  assert.match(
    scopeText,
    /RESOLVED_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  for (const marker of [
    "PACKAGE_EXPORTS_EXCLUDED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "SUBJECT_EXISTENCE_MEMBERSHIP_OR_TRUTH_VERIFICATION_NOT_CREATED",
    "IDENTITY_ROLE_AUTHORITY_OR_SESSION_VERIFICATION_NOT_CREATED",
    "TRUSTED_TIME_CURRENTNESS_OR_LIFECYCLE_TRUTH_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(scopeText.includes(marker), true, marker);
  }
});
