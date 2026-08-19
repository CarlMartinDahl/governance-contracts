"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultTransitionPath = path.join(
  repoRoot,
  validatorResultTransitionRelativePath,
);
const packageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultPackageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const proofRelativePath =
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js";
const expectedRootFields = [
  "contract_id",
  "contract_version",
  "decision_attestation_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "reviewer_role",
  "decision",
  "attested_at",
  "attestation_posture",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "attestation_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const genericReferenceFields = [
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const reviewerRoles = ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"];
const decisions = [
  "HUMAN_PROFESSIONAL_GATE_APPROVED",
  "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
  "HUMAN_PROFESSIONAL_GATE_REJECTED",
];
const lifecyclePostures = [
  "DECISION_ATTESTATION_DECLARED_ACTIVE",
  "DECISION_ATTESTATION_DECLARED_INACTIVE",
  "DECISION_ATTESTATION_DECLARED_REVOKED",
];
const namespacePatterns = {
  decision_attestation_ref: "^att_[a-z0-9][a-z0-9_-]{0,59}$",
  approval_ref: "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
  review_session_ref: "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
  reviewer_ref: "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
};
const timestampPattern =
  "^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\\.[0-9]{3}Z$";
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
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
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

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, "expected " + filePath);
  return fs.readFileSync(filePath, "utf8");
}

function sectionBetween(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  assert.notEqual(start, -1, startMarker);
  const end = text.indexOf(endMarker, start + startMarker.length);
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
      "human_review.controlled_handoff_human_professional_approval_decision_attestation_evidence",
    contract_version: "1.0.0",
    decision_attestation_ref: "att_decision_001",
    approval_ref: "apr_review_001",
    review_session_ref: "rvs_session_001",
    reviewer_ref: "rvr_reviewer_001",
    reviewer_role: "HUMAN_REVIEWER",
    decision: "HUMAN_PROFESSIONAL_GATE_APPROVED",
    attested_at: "2026-07-23T12:34:56.789Z",
    attestation_posture: "DECISION_ATTESTATION_CANDIDATE_ONLY",
    binding_issuer_ref: "issuer.attestation:001",
    binding_provenance_ref: "provenance.record:001",
    attestation_lifecycle_posture: "DECISION_ATTESTATION_DECLARED_ACTIVE",
    verification_posture: "NOT_VERIFIED_BY_CONTRACT",
    human_professional_review_required: true,
    ...overrides,
  };
}

test("one exact fifteen-field candidate is structurally schema-valid", () => {
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
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Decision Attestation Evidence Contract Scaffold",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
  for (const literal of [schema.$schema, schema.$id, schema.title]) {
    assert.equal(scopeText.includes(literal), true, literal);
  }
  assert.match(
    contractText,
    /CONTRACT_ID:\nhuman_review\.controlled_handoff_human_professional_approval_decision_attestation_evidence/u,
  );
  assert.match(contractText, /CONTRACT_VERSION:\n1\.0\.0/u);
});

test("required and properties contain exactly fifteen fields in documentation order", () => {
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
    [...Array(14).fill("string"), "boolean"],
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

    for (const invalidValue of [null, {}, [], 1]) {
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

test("fixed values namespaces enums timestamp postures and review flag are exact", () => {
  const schema = require(schemaPath);
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);

  assert.deepEqual(schema.properties.contract_id, {
    type: "string",
    const:
      "human_review.controlled_handoff_human_professional_approval_decision_attestation_evidence",
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
  assert.deepEqual(schema.properties.decision, {
    type: "string",
    enum: decisions,
  });
  assert.deepEqual(schema.properties.attested_at, {
    type: "string",
    pattern: timestampPattern,
  });
  assert.deepEqual(schema.properties.attestation_posture, {
    type: "string",
    const: "DECISION_ATTESTATION_CANDIDATE_ONLY",
  });
  assert.deepEqual(schema.properties.attestation_lifecycle_posture, {
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
  for (const value of [...reviewerRoles, ...decisions, ...lifecyclePostures]) {
    assert.equal(contractText.includes(value), true, value);
    assert.equal(scopeText.includes(value), true, value);
  }

  for (const [field, value] of [
    ["contract_id", "human_review.other"],
    ["contract_version", "2.0.0"],
    ["decision_attestation_ref", "decision_attestation_001"],
    ["approval_ref", "approval_001"],
    ["review_session_ref", "session_001"],
    ["reviewer_ref", "reviewer_001"],
    ["reviewer_role", "ADMIN_REVIEWER"],
    ["decision", "APPROVED"],
    ["attested_at", "2026-07-23T12:34:56Z"],
    ["attested_at", "2026-07-23T25:34:56.789Z"],
    ["attested_at", "2026-07-23T12:34:56.789+00:00"],
    ["attestation_posture", "VERIFIED_ATTESTATION"],
    ["attestation_lifecycle_posture", "ACTIVE"],
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
    for (const value of [
      "",
      "z".repeat(129),
      "slash/value",
      "space value",
      "name@host",
    ]) {
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
  const sharedReference = "shared.attestation:001";

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

test("syntactically valid values create no attestation relationship or time proof", () => {
  const schema = require(schemaPath);

  for (const reviewerRole of reviewerRoles) {
    for (const decision of decisions) {
      for (const lifecycle of lifecyclePostures) {
        assert.equal(
          validateAgainstSchemaContract(
            schema,
            createCandidate({
              decision_attestation_ref: "att_unregistered",
              approval_ref: "apr_unregistered",
              review_session_ref: "rvs_unregistered",
              reviewer_ref: "rvr_unregistered",
              reviewer_role: reviewerRole,
              decision,
              attested_at: "2026-02-31T23:59:59.999Z",
              binding_issuer_ref: "unknown.issuer:001",
              binding_provenance_ref: "unknown.provenance:001",
              attestation_lifecycle_posture: lifecycle,
            }),
          ),
          true,
          reviewerRole + " " + decision + " " + lifecycle,
        );
      }
    }
  }
  assert.equal(
    schema.properties.verification_posture.const,
    "NOT_VERIFIED_BY_CONTRACT",
  );
});

test("historical siblings preserve validator-result posture while export proofs are aligned", () => {
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
    "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json",
    "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js",
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
        "`" +
          validatorResultCandidatePath +
          "` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      validatorResultCandidatePath,
    );
  }
  assert.equal(
    packageExportTransitionText.includes(
      "`" +
        candidatePackageExportProofPath +
        "` | create the focused candidate package-export proof",
    ),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" +
        proofRelativePath +
        "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
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
  assert.deepEqual(
    retainedPackageAndValidatorSiblingPaths,
    laterSiblingPaths.slice(2),
  );
  assert.deepEqual(retainedValidatorSiblingPaths, laterSiblingPaths.slice(4));
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`" + proofRelativePath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
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
  for (const retainedSiblingPath of retainedValidatorSiblingPaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" +
          retainedSiblingPath +
          "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedSiblingPath,
    );
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" +
          retainedSiblingPath +
          "` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE`",
      ),
      true,
      retainedSiblingPath,
    );
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
      "| 3 | `" +
        proofRelativePath +
        "` | preserve candidate-schema structural proof and four sibling absences; align only the two validator-result candidate paths |",
    ),
    true,
  );
  assert.match(
    validatorResultTransitionText,
    /FIVE_ADDITIONAL_PROOF_ALIGNMENTS_REMAIN_REQUIRED/u,
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
    "ATTESTATION_SIGNATURE_AND_ISSUER_TRUST_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "TRUSTED_TIME_CURRENTNESS_OR_REPLACEMENT_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "EXTERNAL_DEPENDENCY_CANDIDATES_EMBEDDED_IN_WRAPPER_SCHEMA:\nNO",
    "IDENTITY_ROLE_AUTHORITY_OR_ADMISSIBILITY_IN_WRAPPER_SCHEMA:\nNO",
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
