"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-controlled-handoff-human-professional-approval-validator-result.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
);
const readinessPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const candidatePackageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultPackageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

const resultFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const staticPaths = [
  "$",
  "$.contract_id",
  "$.contract_version",
  "$.approval_ref",
  "$.packet_ref",
  "$.controlled_handoff_brief_ref",
  "$.controlled_handoff_brief_fingerprint",
  "$.approval_posture",
  "$.decision",
  "$.reviewer_attribution",
  "$.decision_support",
  "$.decided_at",
  "$.review_session_ref",
  "$.decision_attestation_ref",
  "$.reviewer_attribution.reviewer_ref",
  "$.reviewer_attribution.reviewer_role",
  "$.reviewer_attribution.reviewer_authority_evidence_ref",
  "$.decision_support.decision_basis_refs",
  "$.decision_support.prior_approval_refs",
  "$.decision_support.correction_request_refs",
];
const scalarValuePaths = [
  "$.contract_id",
  "$.contract_version",
  "$.approval_ref",
  "$.packet_ref",
  "$.controlled_handoff_brief_ref",
  "$.controlled_handoff_brief_fingerprint",
  "$.approval_posture",
  "$.decision",
  "$.decided_at",
  "$.review_session_ref",
  "$.decision_attestation_ref",
  "$.reviewer_attribution.reviewer_ref",
  "$.reviewer_attribution.reviewer_role",
  "$.reviewer_attribution.reviewer_authority_evidence_ref",
];
const indexedPatterns = [
  "^\\$\\.decision_support\\.decision_basis_refs\\[(?:0|[1-9][0-9]*)\\]$",
  "^\\$\\.decision_support\\.prior_approval_refs\\[(?:0|[1-9][0-9]*)\\]$",
  "^\\$\\.decision_support\\.correction_request_refs\\[(?:0|[1-9][0-9]*)\\]$",
];
const errorPartitions = [
  {
    code: "required_field_missing",
    path: { enum: staticPaths.slice(1) },
  },
  {
    code: "unexpected_field",
    path: { enum: ["$", "$.reviewer_attribution", "$.decision_support"] },
  },
  {
    code: "invalid_field_type",
    path: {
      oneOf: [
        { enum: staticPaths },
        ...indexedPatterns.map((pattern) => ({ pattern })),
      ],
    },
  },
  {
    code: "invalid_field_value",
    path: {
      oneOf: [
        {
          enum: [
            ...scalarValuePaths,
            "$.decision_support.decision_basis_refs",
            "$.decision_support.prior_approval_refs",
          ],
        },
        ...indexedPatterns.map((pattern) => ({ pattern })),
      ],
    },
  },
  {
    code: "invalid_cross_field_combination",
    path: { const: "$.decision_support.correction_request_refs" },
  },
  {
    code: "duplicate_reference",
    path: {
      oneOf: indexedPatterns.map((pattern) => ({ pattern })),
    },
  },
];
const candidatePaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js",
];
const retainedSiblingPaths = [
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const candidatePackageExportProofPath = retainedSiblingPaths[0];
const validatorResultPackageExportProofPath = retainedSiblingPaths[1];
const retainedValidatorPaths = retainedSiblingPaths.slice(2);
const fence = String.fromCharCode(96);

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, "expected " + filePath);
  return fs.readFileSync(filePath, "utf8");
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
  if (Object.hasOwn(definition, "const") && value !== definition.const) return false;
  if (definition.enum && !definition.enum.includes(value)) return false;
  if (definition.pattern && !new RegExp(definition.pattern, "u").test(value)) {
    return false;
  }
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
    const items = value.map((item) => JSON.stringify(canonicalize(item)));
    if (new Set(items).size !== items.length) return false;
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
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors: [],
    ...overrides,
  };
}

test("validator-result schema exists with exact identity and keyword order", () => {
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
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Validator Result Contract",
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
  assert.equal(
    schema.properties.contractKind.const,
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_BOUNDARY",
  );
  assert.equal(schema.properties.version.const, "1.0.0");
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

test("inline error item is closed with exact field order and six branches", () => {
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
  assert.equal(item.oneOf.length, 6);
  assert.equal(Object.hasOwn(item, "$defs"), false);
});

test("six code-to-path branches preserve the exact closed partition", () => {
  const branches = require(schemaPath).properties.errors.items.oneOf;

  assert.deepEqual(
    branches.map((branch) => branch.properties.code.const),
    errorPartitions.map((partition) => partition.code),
  );
  for (const [index, branch] of branches.entries()) {
    assert.deepEqual(Object.keys(branch), ["properties"]);
    assert.deepEqual(Object.keys(branch.properties), errorFields);
    assert.deepEqual(branch.properties.path, errorPartitions[index].path);
  }
  assert.equal(errorPartitions[0].path.enum.length, 19);
  assert.equal(errorPartitions[1].path.enum.length, 3);
  assert.equal(errorPartitions[2].path.oneOf.length, 4);
  assert.equal(errorPartitions[2].path.oneOf[0].enum.length, 20);
  assert.equal(errorPartitions[3].path.oneOf.length, 4);
  assert.equal(errorPartitions[3].path.oneOf[0].enum.length, 16);
  assert.equal(errorPartitions[5].path.oneOf.length, 3);
});

test("representative error from every partition satisfies structural proof", () => {
  const schema = require(schemaPath);
  const representativeErrors = [
    { code: "required_field_missing", path: "$.approval_ref" },
    { code: "unexpected_field", path: "$.reviewer_attribution" },
    {
      code: "invalid_field_type",
      path: "$.decision_support.decision_basis_refs[12]",
    },
    {
      code: "invalid_field_value",
      path: "$.decision_support.prior_approval_refs[3]",
    },
    {
      code: "invalid_cross_field_combination",
      path: "$.decision_support.correction_request_refs",
    },
    {
      code: "duplicate_reference",
      path: "$.decision_support.correction_request_refs[4]",
    },
  ];

  for (const error of representativeErrors) {
    assert.equal(
      matchesSchema(createResult({ valid: false, errors: [error] }), schema),
      true,
      error.code + ":" + error.path,
    );
  }
  assert.equal(
    matchesSchema(createResult({ valid: false, errors: representativeErrors }), schema),
    true,
  );
});

test("indexed patterns admit canonical indices and reject malformed indices", () => {
  const bases = [
    "$.decision_support.decision_basis_refs",
    "$.decision_support.prior_approval_refs",
    "$.decision_support.correction_request_refs",
  ];

  for (const [index, pattern] of indexedPatterns.entries()) {
    const regex = new RegExp(pattern, "u");
    assert.equal(regex.test(bases[index] + "[0]"), true, pattern);
    assert.equal(regex.test(bases[index] + "[12]"), true, pattern);
    for (const invalidIndex of ["", "01", "-1", "+1", "1.0", " 1"]) {
      assert.equal(
        regex.test(bases[index] + "[" + invalidIndex + "]"),
        false,
        pattern + ":" + invalidIndex,
      );
    }
  }
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

test("malformed paths cross-pairs extra fields and duplicate errors fail closed", () => {
  const schema = require(schemaPath);
  const duplicate = {
    code: "duplicate_reference",
    path: "$.decision_support.decision_basis_refs[2]",
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
    { code: "required_field_missing", path: "$.decision_support.prior_approval_refs[0]" },
    { code: "unexpected_field", path: "$.approval_ref" },
    { code: "invalid_field_type", path: "$.dynamic" },
    { code: "invalid_field_type", path: "$.decision_support.decision_basis_refs[01]" },
    {
      code: "invalid_field_value",
      path: "$.decision_support.correction_request_refs",
    },
    {
      code: "invalid_cross_field_combination",
      path: "$.decision_support.prior_approval_refs",
    },
    { code: "duplicate_reference", path: "$.decision_support" },
    { code: "duplicate_reference", path: "$.decision_support.prior_approval_refs[-1]" },
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

test("schema remains structural-only unexported and keeps later siblings closed", () => {
  const schemaText = readRequired(schemaPath);
  const transitionText = readRequired(transitionPath);
  const candidatePackageExportTransitionText = readRequired(
    candidatePackageExportTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportTransitionPath,
  );
  const structuralProofText = readRequired(__filename);

  for (const fragment of [
    "\"message\"",
    "\"detail\"",
    "\"candidate\"",
    "\"rejected_key\"",
    "\"rejected_value\"",
    "\"recipient\"",
    "\"score\"",
    "\"finding\"",
    "\"conclusion\"",
    "\"readiness\"",
    "\"remediation\"",
    "\"$defs\"",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
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
        "humanReviewControlledHandoffHumanProfessionalApprovalValidatorResult" +
        fence,
    ),
    true,
  );
  for (const candidatePath of candidatePaths) {
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
  const validatorHelperProofTransitionText = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  );
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
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
  }
  assert.equal(
    candidatePackageExportTransitionText.includes(
      fence +
        "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js" +
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
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n11/u,
  );
  assert.match(
    candidatePackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n10/u,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      fence +
        "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js" +
        fence +
        " | " +
        fence +
        "TRANSITION_DIRECTLY_IN_THIS_SLICE" +
        fence,
    ),
    true,
  );
  for (const marker of [
    "VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n13",
    "DIRECT_STRUCTURAL_PROOF_TRANSITION_COUNT:\n1",
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n12",
    "RETAINED_VALIDATOR_FILE_ABSENCE_COUNT:\n2",
    "CURRENT_PREREQUISITE_FILE_COUNT:\n2",
    "DIRECT_STRUCTURAL_PROOF_TRANSITION_STEP_COUNT:\n10",
    "TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED",
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
  const readinessText = readRequired(readinessPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);

  assert.match(
    contractText,
    /TRACKED_DOCS_ONLY_CONTRACT_SEMANTICS_FROZEN_SCHEMA_VALIDATOR_ADMISSIBILITY_APPROVAL_EFFECT_AND_RUNTIME_NOT_CREATED/u,
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
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(scopeText.includes(marker), true, marker);
  }
});
