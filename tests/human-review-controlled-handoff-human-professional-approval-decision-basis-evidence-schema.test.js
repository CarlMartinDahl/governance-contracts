"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaRelativePath =
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json";
const proofRelativePath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema.test.js";
const contractRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const scopeRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const transitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const rootFields = [
  "contract_id",
  "contract_version",
  "decision_basis_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "reviewer_role",
  "decision",
  "basis_subject_kind",
  "basis_subject_ref",
  "basis_posture",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "basis_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const reviewerRoles = ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"];
const decisions = [
  "HUMAN_PROFESSIONAL_GATE_APPROVED",
  "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
  "HUMAN_PROFESSIONAL_GATE_REJECTED",
];
const lifecyclePostures = [
  "DECISION_BASIS_DECLARED_ACTIVE",
  "DECISION_BASIS_DECLARED_INACTIVE",
  "DECISION_BASIS_DECLARED_REVOKED",
];
const subjectBindings = [
  {
    kind: "SOURCE_REGISTER_SOURCE",
    reference: "src_subject_001",
    pattern: "^src_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "REVIEW_CHRONOLOGY_ENTRY",
    reference: "chr_subject_001",
    pattern: "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "ASSERTED_CLAIM",
    reference: "clm_subject_001",
    pattern: "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "DECLARED_REVIEW_GAP",
    reference: "gap_subject_001",
    pattern: "^gap_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "HUMAN_REVIEW_QUESTION",
    reference: "qst_subject_001",
    pattern: "^qst_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "NO_CONCLUSION_NOTICE",
    reference: "ncn_subject_001",
    pattern: "^ncn_[a-z0-9][a-z0-9_-]{0,59}$",
  },
];
const namespacePatterns = {
  decision_basis_ref: "^rvb_[a-z0-9][a-z0-9_-]{0,59}$",
  approval_ref: "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
  review_session_ref: "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
  reviewer_ref: "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
};
const genericReferenceFields = [
  "binding_issuer_ref",
  "binding_provenance_ref",
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
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
];
const validatorResultCandidatePaths = laterSiblingPaths.slice(0, 2);
const retainedPackageAndValidatorSiblingPaths = laterSiblingPaths.slice(2);
const candidatePackageExportProofPath =
  retainedPackageAndValidatorSiblingPaths[0];
const validatorResultPackageExportProofPath = laterSiblingPaths[3];
const retainedValidatorSiblingPaths = laterSiblingPaths.slice(4);

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function readSchema() {
  return JSON.parse(readRequired(schemaRelativePath));
}

function sectionBetween(text, start, end) {
  const startIndex = text.indexOf(start);
  const endIndex = end
    ? text.indexOf(end, startIndex + start.length)
    : text.length;

  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return text.slice(startIndex, endIndex);
}

function numberedBacktickValues(section) {
  return [...section.matchAll(/^\d+\. `([^`]+)`$/gmu)].map(
    (match) => match[1],
  );
}

function matchesBranch(value, branch) {
  if (branch.enum && !branch.enum.includes(value)) return false;
  if (branch.pattern) {
    return (
      typeof value === "string" &&
      new RegExp(branch.pattern, "u").test(value)
    );
  }
  return true;
}

function matchesDefinition(value, definition) {
  if (definition.type === "string" && typeof value !== "string") return false;
  if (definition.type === "boolean" && typeof value !== "boolean") return false;
  if (Object.hasOwn(definition, "const") && value !== definition.const) {
    return false;
  }
  if (definition.enum && !definition.enum.includes(value)) return false;
  if (
    definition.pattern &&
    (typeof value !== "string" ||
      !new RegExp(definition.pattern, "u").test(value))
  ) {
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

function hasExactObjectShape(value, schema) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const actualKeys = Object.keys(value);
  if (
    schema.additionalProperties === false &&
    actualKeys.some((key) => !Object.hasOwn(schema.properties, key))
  ) {
    return false;
  }
  return schema.required.every((field) => Object.hasOwn(value, field));
}

function branchConditionMatches(candidate, condition) {
  if (
    condition.required &&
    !condition.required.every((field) => Object.hasOwn(candidate, field))
  ) {
    return false;
  }
  return Object.entries(condition.properties ?? {}).every(([field, definition]) =>
    matchesDefinition(candidate[field], definition),
  );
}

function validateAgainstSchemaContract(schema, candidate) {
  if (!hasExactObjectShape(candidate, schema)) return false;
  if (
    !schema.required.every((field) =>
      matchesDefinition(candidate[field], schema.properties[field]),
    )
  ) {
    return false;
  }
  return schema.allOf.every((branch) => {
    if (!branchConditionMatches(candidate, branch.if)) return true;
    return Object.entries(branch.then.properties).every(([field, definition]) =>
      matchesDefinition(candidate[field], definition),
    );
  });
}

function createCandidate(overrides = {}) {
  return {
    contract_id:
      "human_review.controlled_handoff_human_professional_approval_decision_basis_evidence",
    contract_version: "1.0.0",
    decision_basis_ref: "rvb_decision_001",
    approval_ref: "apr_review_001",
    review_session_ref: "rvs_session_001",
    reviewer_ref: "rvr_reviewer_001",
    reviewer_role: "HUMAN_REVIEWER",
    decision: "HUMAN_PROFESSIONAL_GATE_APPROVED",
    basis_subject_kind: "SOURCE_REGISTER_SOURCE",
    basis_subject_ref: "src_subject_001",
    basis_posture: "DECISION_BASIS_CANDIDATE_ONLY",
    binding_issuer_ref: "issuer.basis:001",
    binding_provenance_ref: "provenance.record:001",
    basis_lifecycle_posture: "DECISION_BASIS_DECLARED_ACTIVE",
    verification_posture: "NOT_VERIFIED_BY_CONTRACT",
    human_professional_review_required: true,
    ...overrides,
  };
}

test("one exact valid sixteen-field candidate is structurally schema-valid", () => {
  const schema = readSchema();

  assert.equal(validateAgainstSchemaContract(schema, createCandidate()), true);
});

test("schema draft identity title root type closure and keyword order are exact", () => {
  const schema = readSchema();
  const scope = readRequired(scopeRelativePath);

  assert.deepEqual(Object.keys(schema), [
    "$schema",
    "$id",
    "title",
    "type",
    "additionalProperties",
    "required",
    "properties",
    "allOf",
  ]);
  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Contract Scaffold",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
  for (const value of [schema.$schema, schema.$id, schema.title]) {
    assert.equal(scope.includes(value), true, value);
  }
});

test("required and properties contain exactly sixteen fields and no local definitions", () => {
  const schema = readSchema();
  const contract = readRequired(contractRelativePath);
  const scope = readRequired(scopeRelativePath);

  assert.deepEqual(schema.required, rootFields);
  assert.deepEqual(Object.keys(schema.properties), rootFields);
  assert.equal(Object.hasOwn(schema, "$defs"), false);
  assert.deepEqual(
    numberedBacktickValues(
      sectionBetween(
        contract,
        "## 4. Contract Identity And Exact Root Shape",
        "## 5. Candidate Cardinality, Order, Identity, And Immutability",
      ),
    ),
    rootFields,
  );
  assert.deepEqual(
    numberedBacktickValues(
      sectionBetween(
        scope,
        "## 6. Exact Future Flat Root Scaffold",
        "## 7. Exact Six-Branch Subject Kind And Reference Mapping",
      ),
    ),
    rootFields,
  );
});

test("missing additional null nested array and wrong-type values are rejected", () => {
  const schema = readSchema();

  assert.equal(validateAgainstSchemaContract(schema, null), false);
  assert.equal(validateAgainstSchemaContract(schema, []), false);
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createCandidate({ unexpected_field: "not_allowed" }),
    ),
    false,
  );
  for (const field of rootFields) {
    const missing = createCandidate();
    delete missing[field];
    assert.equal(validateAgainstSchemaContract(schema, missing), false, field);
    assert.equal(
      validateAgainstSchemaContract(schema, createCandidate({ [field]: null })),
      false,
      `${field}: null`,
    );
    assert.equal(
      validateAgainstSchemaContract(schema, createCandidate({ [field]: {} })),
      false,
      `${field}: object`,
    );
    assert.equal(
      validateAgainstSchemaContract(schema, createCandidate({ [field]: [] })),
      false,
      `${field}: array`,
    );
    const wrongType =
      schema.properties[field].type === "boolean" ? "true" : false;
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createCandidate({ [field]: wrongType }),
      ),
      false,
      `${field}: wrong type`,
    );
  }
});

test("fixed literals enums namespace patterns and lifecycle values are exact", () => {
  const schema = readSchema();

  assert.deepEqual(schema.properties.contract_id, {
    type: "string",
    const:
      "human_review.controlled_handoff_human_professional_approval_decision_basis_evidence",
  });
  assert.deepEqual(schema.properties.contract_version, {
    type: "string",
    const: "1.0.0",
  });
  for (const [field, pattern] of Object.entries(namespacePatterns)) {
    assert.deepEqual(schema.properties[field], { type: "string", pattern });
  }
  assert.deepEqual(schema.properties.reviewer_role, {
    type: "string",
    enum: reviewerRoles,
  });
  assert.deepEqual(schema.properties.decision, {
    type: "string",
    enum: decisions,
  });
  assert.deepEqual(schema.properties.basis_subject_kind, {
    type: "string",
    enum: subjectBindings.map(({ kind }) => kind),
  });
  assert.deepEqual(schema.properties.basis_subject_ref, { type: "string" });
  assert.deepEqual(schema.properties.basis_posture, {
    type: "string",
    const: "DECISION_BASIS_CANDIDATE_ONLY",
  });
  assert.deepEqual(
    schema.properties.basis_lifecycle_posture,
    { type: "string", enum: lifecyclePostures },
  );
  assert.deepEqual(schema.properties.verification_posture, {
    type: "string",
    const: "NOT_VERIFIED_BY_CONTRACT",
  });
  assert.deepEqual(schema.properties.human_professional_review_required, {
    type: "boolean",
    const: true,
  });
});

test("generic opaque references enforce exact length alphabet and punctuation", () => {
  const schema = readSchema();
  const validValues = ["a", "A0._:-z", "x".repeat(128)];
  const invalidValues = ["", "x".repeat(129), "bad/value", "bad value", "bad?"];

  for (const field of genericReferenceFields) {
    const definition = schema.properties[field];
    for (const value of validValues) {
      assert.equal(matchesDefinition(value, definition), true, `${field}: ${value}`);
    }
    for (const value of invalidValues) {
      assert.equal(
        matchesDefinition(value, definition),
        false,
        `${field}: ${value}`,
      );
    }
  }
});

test("dot and dot-dot generic opaque references are rejected", () => {
  const schema = readSchema();

  for (const field of genericReferenceFields) {
    for (const value of [".", ".."]) {
      assert.equal(
        validateAgainstSchemaContract(
          schema,
          createCandidate({ [field]: value }),
        ),
        false,
        `${field}: ${value}`,
      );
    }
  }
});

test("all seven prohibited scheme prefixes reject lower upper and mixed case", () => {
  const schema = readSchema();
  const schemeVariants = [
    ["http:", "HTTP:", "HtTp:"],
    ["https:", "HTTPS:", "HtTpS:"],
    ["ftp:", "FTP:", "FtP:"],
    ["file:", "FILE:", "FiLe:"],
    ["mailto:", "MAILTO:", "MaIlTo:"],
    ["data:", "DATA:", "DaTa:"],
    ["javascript:", "JAVASCRIPT:", "JaVaScRiPt:"],
  ].flat();

  for (const field of genericReferenceFields) {
    for (const scheme of schemeVariants) {
      assert.equal(
        validateAgainstSchemaContract(
          schema,
          createCandidate({ [field]: `${scheme}opaque` }),
        ),
        false,
        `${field}: ${scheme}`,
      );
    }
  }
});

test("both generic fields carry the exact ordered eight-branch negative encoding", () => {
  const schema = readSchema();
  const expectedEncoding = {
    type: "string",
    pattern: "^[A-Za-z0-9._:-]{1,128}$",
    not: {
      anyOf: expectedOpaqueNotAnyOf,
    },
  };

  for (const field of genericReferenceFields) {
    assert.deepEqual(schema.properties[field], expectedEncoding);
  }
  assert.notStrictEqual(
    schema.properties.binding_issuer_ref,
    schema.properties.binding_provenance_ref,
  );
});

test("six ordered branches accept only each matching subject-reference namespace", () => {
  const schema = readSchema();
  const expectedBranches = subjectBindings.map(({ kind, pattern }) => ({
    if: {
      required: ["basis_subject_kind"],
      properties: {
        basis_subject_kind: { const: kind },
      },
    },
    then: {
      properties: {
        basis_subject_ref: { pattern },
      },
    },
  }));

  assert.deepEqual(schema.allOf, expectedBranches);
  for (const binding of subjectBindings) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createCandidate({
          basis_subject_kind: binding.kind,
          basis_subject_ref: binding.reference,
        }),
      ),
      true,
      binding.kind,
    );
    for (const other of subjectBindings.filter(
      ({ kind }) => kind !== binding.kind,
    )) {
      assert.equal(
        validateAgainstSchemaContract(
          schema,
          createCandidate({
            basis_subject_kind: binding.kind,
            basis_subject_ref: other.reference,
          }),
        ),
        false,
        `${binding.kind}: ${other.reference}`,
      );
    }
  }
});

test("candidate member insertion order is irrelevant while documented orders remain exact", () => {
  const schema = readSchema();
  const scope = readRequired(scopeRelativePath);
  const reordered = Object.fromEntries(
    Object.entries(createCandidate()).reverse(),
  );

  assert.equal(validateAgainstSchemaContract(schema, reordered), true);
  assert.deepEqual(Object.keys(schema.properties), rootFields);
  assert.deepEqual(
    schema.allOf.map((branch) => branch.if.properties.basis_subject_kind.const),
    subjectBindings.map(({ kind }) => kind),
  );
  assert.match(scope, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n16/u);
  assert.match(scope, /FUTURE_SCHEMA_ROOT_ALLOF_BRANCH_COUNT:\n6/u);
});

test("schema leaves generic-reference distinctness and external equality unenforced", () => {
  const schema = readSchema();
  const sharedGenericReference = "shared.binding:001";
  const candidate = createCandidate({
    decision_basis_ref: "rvb_not_looked_up",
    approval_ref: "apr_not_looked_up",
    review_session_ref: "rvs_not_looked_up",
    reviewer_ref: "rvr_not_looked_up",
    binding_issuer_ref: sharedGenericReference,
    binding_provenance_ref: sharedGenericReference,
  });

  assert.equal(validateAgainstSchemaContract(schema, candidate), true);
});

test("syntactically valid subject pairs remain valid without existence or truth claims", () => {
  const schema = readSchema();
  const transition = readRequired(transitionRelativePath);

  for (const binding of subjectBindings) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createCandidate({
          basis_subject_kind: binding.kind,
          basis_subject_ref: binding.reference.replace("001", "not_registered"),
        }),
      ),
      true,
      binding.kind,
    );
  }
  assert.match(
    transition,
    /does not prove subject existence, subject truth/u,
  );
  assert.match(
    transition,
    /relevance, support, sufficiency, probative value, admissibility/u,
  );
});

test("historical siblings preserve validator-result posture while export proofs are aligned", () => {
  const transition = readRequired(transitionRelativePath);
  const validatorResultTransition = readRequired(
    validatorResultTransitionRelativePath,
  );
  const packageExportTransition = readRequired(
    packageExportTransitionRelativePath,
  );
  const validatorResultPackageExportTransition = readRequired(
    validatorResultPackageExportTransitionRelativePath,
  );
  const proofText = readRequired(proofRelativePath);

  assert.deepEqual(
    numberedBacktickValues(
      sectionBetween(
        transition,
        "## 9. Separate Later Candidate-Schema Slice",
        "## 10. Non-Interference And Proof Boundary",
      ),
    ),
    [schemaRelativePath, proofRelativePath],
  );
  assert.equal(fs.existsSync(absolute(schemaRelativePath)), true);
  assert.equal(fs.existsSync(absolute(proofRelativePath)), true);
  for (const siblingPath of laterSiblingPaths) {
    assert.equal(
      transition.includes(`\`${siblingPath}\``),
      true,
      siblingPath,
    );
  }
  for (const validatorResultCandidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransition.includes(
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
    packageExportTransition.includes(
      "`" +
        candidatePackageExportProofPath +
        "` | create the focused candidate package-export proof",
    ),
    true,
  );
  assert.equal(
    packageExportTransition.includes(
      "`" +
        proofRelativePath +
        "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.match(
    packageExportTransition,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n8/u,
  );
  assert.match(
    packageExportTransition,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n7/u,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.equal(proofText.includes("packageIndex" + ".includes("), false);
  assert.deepEqual(
    retainedPackageAndValidatorSiblingPaths,
    laterSiblingPaths.slice(2),
  );
  assert.deepEqual(retainedValidatorSiblingPaths, laterSiblingPaths.slice(4));
  assert.equal(
    validatorResultPackageExportTransition.includes(
      "`" + proofRelativePath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransition.includes(
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
  for (const retainedSiblingPath of retainedValidatorSiblingPaths) {
    assert.equal(
      validatorResultTransition.includes(
        "`" +
          retainedSiblingPath +
          "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedSiblingPath,
    );
    assert.equal(
      packageExportTransition.includes("`" + retainedSiblingPath + "`"),
      true,
      retainedSiblingPath,
    );
    assert.equal(
      fs.existsSync(absolute(retainedSiblingPath)),
      false,
      retainedSiblingPath,
    );
  }
  assert.match(
    validatorResultPackageExportTransition,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultPackageExportTransition,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  assert.match(
    validatorResultTransition,
    /VALIDATOR_RESULT_SCHEMA_LIVE_PROOF_CONFLICT_COUNT:\n6/u,
  );
  assert.match(
    validatorResultTransition,
    /VALIDATOR_RESULT_SCHEMA_CANDIDATE_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransition,
    /RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    validatorResultTransition,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n5/u,
  );
  assert.equal(
    validatorResultTransition.includes(
      "| 3 | `" +
        proofRelativePath +
        "` | preserve candidate-schema structural proof and four sibling absences; align only the two validator-result candidate paths |",
    ),
    true,
  );
  assert.match(
    validatorResultTransition,
    /FIVE_ADDITIONAL_PROOF_ALIGNMENTS_REMAIN_REQUIRED/u,
  );
});

test("schema creates no cross-reference identity authority admissibility or runtime behavior", () => {
  const schema = readSchema();
  const schemaText = JSON.stringify(schema);
  const transition = readRequired(transitionRelativePath);

  for (const prohibitedKey of [
    "$defs",
    "$ref",
    "format",
    "dependentRequired",
    "unevaluatedProperties",
  ]) {
    assert.equal(schemaText.includes(`"${prohibitedKey}"`), false, prohibitedKey);
  }
  for (const prohibitedConcept of [
    "lookup",
    "currentness",
    "relevance",
    "sufficiency",
    "admissibility",
    "runtime",
  ]) {
    assert.equal(schemaText.includes(prohibitedConcept), false, prohibitedConcept);
  }
  for (const marker of [
    "SCHEMA_PROOF_NOT_CREATED_BY_THIS_SLICE",
    "PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "CROSS_REFERENCE_OR_SUBJECT_LOOKUP_NOT_CREATED",
    "REVIEWER_SESSION_IDENTITY_ROLE_AUTHORITY_NOT_CREATED",
    "TRUSTED_TIME_CURRENTNESS_NOT_CREATED",
    "RELEVANCE_SUPPORT_SUFFICIENCY_ADMISSIBILITY_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(transition.includes(marker), true, marker);
  }
});
