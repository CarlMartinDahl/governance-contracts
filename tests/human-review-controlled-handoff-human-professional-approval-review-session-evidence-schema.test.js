"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-controlled-handoff-human-professional-approval-review-session-evidence.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const packageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultPackageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const proofRelativePath =
  "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-schema.test.js";
const expectedRootFields = [
  "contract_id",
  "contract_version",
  "review_session_ref",
  "approval_ref",
  "reviewer_ref",
  "reviewer_role",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "session_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const genericReferenceFields = [
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const reviewerRoles = ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"];
const lifecyclePostures = [
  "REVIEW_SESSION_DECLARED_ACTIVE",
  "REVIEW_SESSION_DECLARED_INACTIVE",
  "REVIEW_SESSION_DECLARED_REVOKED",
];
const namespacePatterns = {
  review_session_ref: "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
  approval_ref: "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
  reviewer_ref: "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
};
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
  "schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.test.js",
];
const validatorResultCandidatePaths = laterSiblingPaths.slice(0, 2);
const candidatePackageExportProofPath = laterSiblingPaths[2];
const retainedPackageAndValidatorSiblingPaths = laterSiblingPaths.slice(3);
const validatorResultPackageExportProofPath =
  retainedPackageAndValidatorSiblingPaths[0];
const retainedValidatorSiblingPaths =
  retainedPackageAndValidatorSiblingPaths.slice(1);

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, "expected " + filePath);
  return fs.readFileSync(filePath, "utf8");
}

function sectionBetween(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker, start + startMarker.length);

  assert.notEqual(start, -1, startMarker);
  assert.notEqual(end, -1, endMarker);
  return text.slice(start, end);
}

function numberedCodeValues(section) {
  return [...section.matchAll(/^\d+\. `([^`]+)`$/gmu)].map(
    (match) => match[1],
  );
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
      "human_review.controlled_handoff_human_professional_approval_review_session_evidence",
    contract_version: "1.0.0",
    review_session_ref: "rvs_session_001",
    approval_ref: "apr_review_001",
    reviewer_ref: "rvr_reviewer_001",
    reviewer_role: "HUMAN_REVIEWER",
    binding_issuer_ref: "issuer_session-001",
    binding_provenance_ref: "provenance.record:001",
    session_lifecycle_posture: "REVIEW_SESSION_DECLARED_ACTIVE",
    verification_posture: "NOT_VERIFIED_BY_CONTRACT",
    human_professional_review_required: true,
    ...overrides,
  };
}

test("one exact eleven-field candidate is structurally schema-valid", () => {
  const schema = require(schemaPath);

  assert.equal(validateAgainstSchemaContract(schema, createCandidate()), true);
});

test("schema identity metadata root type and closure are exact", () => {
  const schemaText = readRequired(schemaPath);
  const schema = JSON.parse(schemaText);
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);

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
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Review Session Evidence Contract Scaffold",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
  for (const literal of [schema.$schema, schema.$id, schema.title]) {
    assert.equal(scopeText.includes(literal), true, literal);
  }
  assert.match(
    contractText,
    /CONTRACT_ID:\nhuman_review\.controlled_handoff_human_professional_approval_review_session_evidence/u,
  );
  assert.match(contractText, /CONTRACT_VERSION:\n1\.0\.0/u);
});

test("required and properties contain exactly eleven fields in documentation order", () => {
  const schema = require(schemaPath);
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);
  const contractRoot = sectionBetween(
    contractText,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5.",
  );
  const scaffoldRoot = sectionBetween(
    scopeText,
    "## 6. Exact Future Flat Root Scaffold",
    "## 7.",
  );

  assert.deepEqual(schema.required, expectedRootFields);
  assert.deepEqual(Object.keys(schema.properties), expectedRootFields);
  assert.deepEqual(numberedCodeValues(contractRoot), expectedRootFields);
  assert.deepEqual(numberedCodeValues(scaffoldRoot), expectedRootFields);
  assert.equal(Object.hasOwn(schema, "$defs"), false);
  assert.deepEqual(
    expectedRootFields.map((field) => schema.properties[field].type),
    [...Array(10).fill("string"), "boolean"],
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

test("fixed values namespaces reviewer roles lifecycle and review flag are exact", () => {
  const schema = require(schemaPath);
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);

  assert.deepEqual(schema.properties.contract_id, {
    type: "string",
    const:
      "human_review.controlled_handoff_human_professional_approval_review_session_evidence",
  });
  assert.deepEqual(schema.properties.contract_version, {
    type: "string",
    const: "1.0.0",
  });
  for (const [field, pattern] of Object.entries(namespacePatterns)) {
    assert.deepEqual(schema.properties[field], { type: "string", pattern });
    assert.equal(contractText.includes(pattern), true, field);
    assert.equal(scopeText.includes(pattern), true, field);
  }
  assert.deepEqual(schema.properties.reviewer_role, {
    type: "string",
    enum: reviewerRoles,
  });
  assert.deepEqual(schema.properties.session_lifecycle_posture, {
    type: "string",
    enum: lifecyclePostures,
  });
  assert.deepEqual(schema.properties.verification_posture, {
    type: "string",
    const: "NOT_VERIFIED_BY_CONTRACT",
  });
  assert.deepEqual(schema.properties.human_professional_review_required, {
    type: "boolean",
    const: true,
  });
  for (const value of [...reviewerRoles, ...lifecyclePostures]) {
    assert.equal(contractText.includes(value), true, value);
    assert.equal(scopeText.includes(value), true, value);
  }

  for (const [field, value] of [
    ["contract_id", "human_review.other"],
    ["contract_version", "2.0.0"],
    ["review_session_ref", "session_001"],
    ["approval_ref", "approval_001"],
    ["reviewer_ref", "reviewer_001"],
    ["reviewer_role", "ADMIN_REVIEWER"],
    ["session_lifecycle_posture", "ACTIVE"],
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
    for (const value of ["", "z".repeat(129), "slash/value", "space value", "name@host"]) {
      assert.equal(
        validateAgainstSchemaContract(schema, createCandidate({ [field]: value })),
        false,
        field + " " + value.length,
      );
    }
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

test("both generic-reference fields carry the exact ordered negative rule", () => {
  const schema = require(schemaPath);
  const scopeText = readRequired(scopePath);
  const genericSection = sectionBetween(
    scopeText,
    "## 7. Exact Generic Opaque-Reference Encoding",
    "## 8.",
  );
  const jsonBlock = genericSection.match(/```json\n([\s\S]*?)\n```/u);

  assert.notEqual(jsonBlock, null);
  const documentedDefinition = JSON.parse(jsonBlock[1]);
  for (const field of genericReferenceFields) {
    const definition = schema.properties[field];
    assert.deepEqual(Object.keys(definition), ["type", "pattern", "not"]);
    assert.deepEqual(definition, documentedDefinition);
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
  const sharedReference = "shared.session:001";

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createCandidate({
        binding_issuer_ref: sharedReference,
        binding_provenance_ref: sharedReference,
      }),
    ),
    true,
  );
  assert.equal(Object.hasOwn(schema, "uniqueItems"), false);
});

test("syntactically valid values create no session identity role authority or approval proof", () => {
  const schema = require(schemaPath);

  for (const reviewerRole of reviewerRoles) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createCandidate({
          review_session_ref: "rvs_unregistered",
          approval_ref: "apr_unregistered",
          reviewer_ref: "rvr_unregistered",
          reviewer_role: reviewerRole,
          binding_issuer_ref: "unknown.issuer:001",
          binding_provenance_ref: "unknown.provenance:001",
          session_lifecycle_posture: "REVIEW_SESSION_DECLARED_REVOKED",
        }),
      ),
      true,
      reviewerRole,
    );
  }
  assert.equal(schema.properties.verification_posture.const, "NOT_VERIFIED_BY_CONTRACT");
});

test("historical siblings preserve validator-result posture while candidate export proof is aligned", () => {
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultTransitionPath,
  );
  const packageExportTransitionText = readRequired(packageExportTransitionPath);
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportTransitionPath,
  );
  const proofText = readRequired(__filename);
  const candidatePaths = [
    "schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json",
    "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-schema.test.js",
  ];

  assert.match(scopeText, /LATER_SIBLING_PATH_COUNT:\n6/u);
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  for (const candidatePath of candidatePaths) {
    assert.equal(
      transitionText.includes(
        `\`${candidatePath}\` | \`PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE\``,
      ),
      true,
      candidatePath,
    );
  }
  for (const siblingPath of laterSiblingPaths) {
    assert.equal(scopeText.includes(`\`${siblingPath}\``), true, siblingPath);
    assert.equal(
      transitionText.includes(
        `\`${siblingPath}\` | \`RETAIN_LIVE_ABSENCE_ASSERTION\``,
      ),
      true,
      siblingPath,
    );
  }
  for (const validatorResultCandidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        `\`${validatorResultCandidatePath}\` | \`PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE\``,
      ),
      true,
      validatorResultCandidatePath,
    );
  }
  assert.equal(
    packageExportTransitionText.includes(
      `\`${candidatePackageExportProofPath}\` | create the focused candidate package-export proof`,
    ),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes(
      `\`${proofRelativePath}\` | \`SEPARATE_FOCUSED_ALIGNMENT_REQUIRED\``,
    ),
    true,
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
  assert.equal(proofText.includes("packageIndex" + "Text.includes("), false);
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      `\`${proofRelativePath}\` | \`SEPARATE_FOCUSED_ALIGNMENT_REQUIRED\``,
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      `\`${validatorResultPackageExportProofPath}\``,
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
  assert.deepEqual(
    retainedPackageAndValidatorSiblingPaths,
    laterSiblingPaths.slice(3),
  );
  assert.deepEqual(retainedValidatorSiblingPaths, laterSiblingPaths.slice(4));
  for (const retainedPath of retainedValidatorSiblingPaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        `\`${retainedPath}\` | \`RETAIN_LIVE_ABSENCE_ASSERTION\``,
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
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      `| 2 | \`${proofRelativePath}\` | preserve candidate-schema structural proof and four sibling absences; align only the two validator-result candidate paths |`,
    ),
    true,
  );
  assert.match(
    validatorResultTransitionText,
    /TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("checkpoint verification currentness persistence API UI and runtime remain outside", () => {
  const schema = require(schemaPath);
  const schemaText = readRequired(schemaPath);
  const scopeText = readRequired(scopePath);
  const partition = sectionBetween(
    scopeText,
    "## 8. Schema, Validator, And Checkpoint Partition",
    "## 9.",
  );

  for (const marker of [
    "PAIRWISE_REFERENCE_DISTINCTNESS_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "OUTER_CROSS_REFERENCE_EQUALITY_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "SAME_CALL_CARDINALITY_AND_IMMUTABILITY_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "REVIEWER_EVIDENCE_RELATIONSHIP_VALIDITY_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "SESSION_IDENTITY_AUTHENTICATION_OR_REQUEST_BINDING_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "TRUSTED_TIME_CURRENTNESS_OR_REPLACEMENT_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "EXTERNAL_DEPENDENCY_CANDIDATES_EMBEDDED_IN_WRAPPER_SCHEMA:\nNO",
    "IDENTITY_ROLE_AUTHORITY_QUALIFICATION_OR_ADMISSIBILITY_IN_WRAPPER_SCHEMA:\nNO",
  ]) {
    assert.equal(partition.includes(marker), true, marker);
  }
  assert.deepEqual(Object.keys(schema.properties), expectedRootFields);
  for (const keyword of [
    "$defs",
    "format",
    "uniqueItems",
    "dependentRequired",
    "dependentSchemas",
    "if",
    "then",
    "else",
  ]) {
    assert.equal(schemaText.includes(`"${keyword}"`), false, keyword);
  }
  assert.equal(
    schemaText.includes("PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE"),
    false,
  );
});
