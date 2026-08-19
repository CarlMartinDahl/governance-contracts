"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const schemaPath = path.join(
  repoRoot,
  "schemas",
  "human-review-controlled-handoff-human-professional-approval.json",
);
const contractPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
);
const scopePath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const transitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const hardeningAlignmentPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_HARDENING_PROOF_CANDIDATE_PATH_ALIGNMENT_BOUNDARY_v1.md",
);
const validatorResultTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const packageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultPackageExportTransitionPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);

const expectedRootFields = [
  "contract_id",
  "contract_version",
  "approval_ref",
  "packet_ref",
  "controlled_handoff_brief_ref",
  "controlled_handoff_brief_fingerprint",
  "approval_posture",
  "decision",
  "reviewer_attribution",
  "decision_support",
  "decided_at",
  "review_session_ref",
  "decision_attestation_ref",
];
const expectedReviewerFields = [
  "reviewer_ref",
  "reviewer_role",
  "reviewer_authority_evidence_ref",
];
const expectedSupportFields = [
  "decision_basis_refs",
  "prior_approval_refs",
  "correction_request_refs",
];
const decisions = [
  "HUMAN_PROFESSIONAL_GATE_APPROVED",
  "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
  "HUMAN_PROFESSIONAL_GATE_REJECTED",
];
const reviewerRoles = ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"];
const laterSiblingPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const validatorResultCandidatePaths = laterSiblingPaths.slice(0, 2);
const validatorResultPackageExportProofPath = laterSiblingPaths[2];
const retainedValidatorSiblingPaths = laterSiblingPaths.slice(3);
const candidatePackageExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js";
const remainingPackageExportProofAlignmentPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-hardening-proof-candidate-path-alignment-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-scaffold-proof-self-transition-hardening-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js",
];

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

function matchesDefinition(value, definition) {
  if (definition.type === "string" && typeof value !== "string") return false;
  if (definition.type === "array" && !Array.isArray(value)) return false;
  if (Object.hasOwn(definition, "const") && value !== definition.const) return false;
  if (definition.enum && !definition.enum.includes(value)) return false;
  if (definition.pattern && !new RegExp(definition.pattern, "u").test(value)) {
    return false;
  }
  return true;
}

function hasExactObjectShape(value, definition) {
  if (!isObject(value)) return false;
  const actualKeys = Object.keys(value);
  if (
    definition.additionalProperties === false &&
    actualKeys.some((key) => !Object.hasOwn(definition.properties, key))
  ) {
    return false;
  }
  return definition.required.every((field) => Object.hasOwn(value, field));
}

function validatesArray(value, definition) {
  if (!Array.isArray(value)) return false;
  if (definition.minItems !== undefined && value.length < definition.minItems) {
    return false;
  }
  if (definition.maxItems !== undefined && value.length > definition.maxItems) {
    return false;
  }
  if (definition.uniqueItems === true && new Set(value).size !== value.length) {
    return false;
  }
  return value.every((item) => matchesDefinition(item, definition.items));
}

function validateAgainstSchemaContract(schema, candidate) {
  if (!hasExactObjectShape(candidate, schema)) return false;

  for (const field of [
    "contract_id",
    "contract_version",
    "approval_ref",
    "packet_ref",
    "controlled_handoff_brief_ref",
    "controlled_handoff_brief_fingerprint",
    "approval_posture",
    "decision",
    "decided_at",
    "review_session_ref",
    "decision_attestation_ref",
  ]) {
    if (!matchesDefinition(candidate[field], schema.properties[field])) return false;
  }

  const reviewerDefinition = schema.$defs.reviewerAttribution;
  if (!hasExactObjectShape(candidate.reviewer_attribution, reviewerDefinition)) {
    return false;
  }
  for (const field of expectedReviewerFields) {
    if (
      !matchesDefinition(
        candidate.reviewer_attribution[field],
        reviewerDefinition.properties[field],
      )
    ) {
      return false;
    }
  }

  const supportDefinition = schema.$defs.decisionSupport;
  if (!hasExactObjectShape(candidate.decision_support, supportDefinition)) {
    return false;
  }
  for (const field of expectedSupportFields) {
    if (!validatesArray(candidate.decision_support[field], supportDefinition.properties[field])) {
      return false;
    }
  }

  const correctionCount = candidate.decision_support.correction_request_refs.length;
  if (candidate.decision === "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED") {
    return correctionCount === 1;
  }
  return correctionCount === 0;
}

function createCandidate(overrides = {}) {
  return {
    contract_id:
      "human_review.controlled_handoff_human_professional_approval",
    contract_version: "1.0.0",
    approval_ref: "apr_review_001",
    packet_ref: "pkt_review_001",
    controlled_handoff_brief_ref: "hro_handoff_001",
    controlled_handoff_brief_fingerprint:
      "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    approval_posture: "APPROVAL_DECISION_CANDIDATE_ONLY",
    decision: "HUMAN_PROFESSIONAL_GATE_APPROVED",
    reviewer_attribution: {
      reviewer_ref: "rvr_reviewer_001",
      reviewer_role: "HUMAN_REVIEWER",
      reviewer_authority_evidence_ref: "rae_authority_001",
    },
    decision_support: {
      decision_basis_refs: ["rvb_basis_001"],
      prior_approval_refs: [],
      correction_request_refs: [],
    },
    decided_at: "2026-07-16T12:34:56.789Z",
    review_session_ref: "rvs_session_001",
    decision_attestation_ref: "att_attestation_001",
    ...overrides,
  };
}

test("schema metadata root order definitions and allOf are exact", () => {
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
    "$defs",
    "allOf",
  ]);
  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Contract Scaffold",
  );
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
  assert.deepEqual(schema.required, expectedRootFields);
  assert.deepEqual(Object.keys(schema.properties), expectedRootFields);
  assert.deepEqual(Object.keys(schema.$defs), [
    "reviewerAttribution",
    "decisionSupport",
  ]);
  for (const definitionName of ["reviewerAttribution", "decisionSupport"]) {
    assert.deepEqual(Object.keys(schema.$defs[definitionName]), [
      "type",
      "additionalProperties",
      "required",
      "properties",
    ]);
  }
  assert.deepEqual(schema.allOf, [
    {
      if: {
        required: ["decision"],
        properties: {
          decision: {
            const: "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
          },
        },
      },
      then: {
        properties: {
          decision_support: {
            properties: {
              correction_request_refs: {
                minItems: 1,
                maxItems: 1,
              },
            },
          },
        },
      },
      else: {
        properties: {
          decision_support: {
            properties: {
              correction_request_refs: {
                maxItems: 0,
              },
            },
          },
        },
      },
    },
  ]);
});

test("approved correction-required and rejected candidate shapes are valid", () => {
  const schema = require(schemaPath);

  assert.equal(validateAgainstSchemaContract(schema, createCandidate()), true);
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createCandidate({
        decision: "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
        decision_support: {
          decision_basis_refs: ["rvb_basis_001"],
          prior_approval_refs: ["apr_review_000"],
          correction_request_refs: ["cor_request_001"],
        },
      }),
    ),
    true,
  );
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createCandidate({ decision: "HUMAN_PROFESSIONAL_GATE_REJECTED" }),
    ),
    true,
  );
});

test("root and nested shapes are closed and every field is required", () => {
  const schema = require(schemaPath);
  const valid = createCandidate();

  for (const field of expectedRootFields) {
    const candidate = { ...valid };
    delete candidate[field];
    assert.equal(validateAgainstSchemaContract(schema, candidate), false, field);
  }
  assert.equal(
    validateAgainstSchemaContract(schema, { ...valid, extra: "blocked" }),
    false,
  );

  for (const [container, fields] of [
    ["reviewer_attribution", expectedReviewerFields],
    ["decision_support", expectedSupportFields],
  ]) {
    for (const field of fields) {
      const nested = { ...valid[container] };
      delete nested[field];
      assert.equal(
        validateAgainstSchemaContract(schema, createCandidate({ [container]: nested })),
        false,
        container + "." + field,
      );
    }
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createCandidate({ [container]: { ...valid[container], extra: "blocked" } }),
      ),
      false,
      container,
    );
  }
});

test("fixed values enums and opaque patterns fail closed", () => {
  const schema = require(schemaPath);

  for (const [field, value] of [
    ["contract_id", "human_review.other"],
    ["contract_version", "2.0.0"],
    ["approval_ref", "approval_001"],
    ["packet_ref", "pkt_UPPER"],
    ["controlled_handoff_brief_ref", "hro_UPPER"],
    ["controlled_handoff_brief_fingerprint", "sha256:abc"],
    ["approval_posture", "APPROVED"],
    ["decision", "APPROVED"],
    ["decided_at", "2026-07-16T12:34:56Z"],
    ["review_session_ref", "session_001"],
    ["decision_attestation_ref", "att_UPPER"],
  ]) {
    assert.equal(
      validateAgainstSchemaContract(schema, createCandidate({ [field]: value })),
      false,
      field,
    );
  }
  for (const [field, value] of [
    ["reviewer_ref", "reviewer_001"],
    ["reviewer_role", "ADMIN"],
    ["reviewer_authority_evidence_ref", "authority_001"],
  ]) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createCandidate({
          reviewer_attribution: {
            ...createCandidate().reviewer_attribution,
            [field]: value,
          },
        }),
      ),
      false,
      field,
    );
  }
});

test("decision-support array cardinality uniqueness and patterns are exact", () => {
  const schema = require(schemaPath);
  const support = createCandidate().decision_support;

  for (const decision_basis_refs of [
    [],
    ["rvb_basis_001", "rvb_basis_001"],
    ["basis_001"],
    [1],
  ]) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createCandidate({
          decision_support: { ...support, decision_basis_refs },
        }),
      ),
      false,
      JSON.stringify(decision_basis_refs),
    );
  }
  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createCandidate({
        decision_support: {
          ...support,
          decision_basis_refs: Array.from(
            { length: 100 },
            (_, index) => "rvb_basis_" + index,
          ),
        },
      }),
    ),
    true,
  );
  for (const prior_approval_refs of [
    ["apr_one", "apr_two"],
    ["approval_001"],
    [null],
  ]) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createCandidate({
          decision_support: { ...support, prior_approval_refs },
        }),
      ),
      false,
    );
  }
});

test("correction request cardinality follows only the selected decision", () => {
  const schema = require(schemaPath);
  const support = createCandidate().decision_support;

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createCandidate({
        decision: "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
      }),
    ),
    false,
  );
  for (const decision of [
    "HUMAN_PROFESSIONAL_GATE_APPROVED",
    "HUMAN_PROFESSIONAL_GATE_REJECTED",
  ]) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createCandidate({
          decision,
          decision_support: {
            ...support,
            correction_request_refs: ["cor_request_001"],
          },
        }),
      ),
      false,
      decision,
    );
  }
  for (const correction_request_refs of [
    ["cor_one", "cor_two"],
    ["cor_UPPER"],
    [1],
  ]) {
    assert.equal(
      validateAgainstSchemaContract(
        schema,
        createCandidate({
          decision: "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
          decision_support: { ...support, correction_request_refs },
        }),
      ),
      false,
    );
  }
});

test("fingerprint and timestamp remain lexical schema checks only", () => {
  const schema = require(schemaPath);

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createCandidate({
        controlled_handoff_brief_fingerprint:
          "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        decided_at: "2026-02-31T23:59:59.999Z",
      }),
    ),
    true,
  );
  assert.equal(Object.hasOwn(schema.properties.decided_at, "format"), false);
});

test("null inline content identity credentials and lifecycle fields stay outside", () => {
  const schema = require(schemaPath);

  for (const candidate of [null, [], "candidate", 1, false]) {
    assert.equal(validateAgainstSchemaContract(schema, candidate), false);
  }
  for (const field of [
    "case_id",
    "summary",
    "narrative",
    "reviewer_name",
    "email",
    "credential",
    "signature",
    "recipient",
    "export_status",
    "delivery_status",
    "release_status",
    "approval_history",
    "extensions",
  ]) {
    assert.equal(
      validateAgainstSchemaContract(schema, {
        ...createCandidate(),
        [field]: "blocked",
      }),
      false,
      field,
    );
  }
});

test("candidate property insertion order does not alter schema validity", () => {
  const schema = require(schemaPath);
  const canonical = createCandidate();
  const reversed = Object.fromEntries(
    [...expectedRootFields]
      .reverse()
      .map((field) => [field, canonical[field]]),
  );

  assert.deepEqual(Object.keys(reversed), [...expectedRootFields].reverse());
  assert.equal(validateAgainstSchemaContract(schema, reversed), true);
  assert.deepEqual(schema.required, expectedRootFields);
  assert.deepEqual(schema.$defs.reviewerAttribution.required, expectedReviewerFields);
  assert.deepEqual(schema.$defs.decisionSupport.required, expectedSupportFields);
});

test("opaque references remain schema-valid without existence or authority proof", () => {
  const schema = require(schemaPath);

  assert.equal(
    validateAgainstSchemaContract(
      schema,
      createCandidate({
        approval_ref: "apr_unregistered",
        packet_ref: "pkt_unregistered",
        controlled_handoff_brief_ref: "hro_unregistered",
        reviewer_attribution: {
          reviewer_ref: "rvr_unregistered",
          reviewer_role: "PROFESSIONAL_REVIEWER",
          reviewer_authority_evidence_ref: "rae_unverified",
        },
        review_session_ref: "rvs_unverified",
        decision_attestation_ref: "att_unverified",
      }),
    ),
    true,
  );
});

test("schema stays exact runtime-neutral and anchored to package-export transition", () => {
  const schemaText = readRequired(schemaPath);
  const contractText = readRequired(contractPath);
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);
  const hardeningAlignmentText = readRequired(hardeningAlignmentPath);
  const validatorResultTransitionText = readRequired(
    validatorResultTransitionPath,
  );
  const packageExportTransitionText = readRequired(packageExportTransitionPath);
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportTransitionPath,
  );
  const schemaProofText = readRequired(__filename);

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
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n11",
    "DIRECT_SCHEMA_PROOF_TRANSITION_COUNT:\n1",
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n10",
    "RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT:\n3",
    "CURRENT_PREREQUISITE_FILE_COUNT:\n2",
    "DIRECT_SCHEMA_PROOF_TRANSITION_STEP_COUNT:\n10",
    "TRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED",
  ]) {
    assert.equal(packageExportTransitionText.includes(marker), true, marker);
  }
  assert.equal(
    packageExportTransitionText.includes(
      "`humanReviewControlledHandoffHumanProfessionalApproval`",
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
    schemaProofText.includes("packageIndex" + "Text.includes("),
    false,
  );
  assert.equal(
    schemaProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  for (const validatorResultCandidatePath of validatorResultCandidatePaths) {
    assert.equal(
      hardeningAlignmentText.includes(
        "`" +
          validatorResultCandidatePath +
          "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      validatorResultCandidatePath,
    );
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
    validatorResultPackageExportTransitionText.includes(
      "`tests/human-review-controlled-handoff-human-professional-approval-schema.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
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
    schemaProofText.includes(
      "fs." +
        "existsSync(absolute(validatorResultPackageExportProofPath))",
    ),
    false,
  );
  const validatorHelperProofTransitionText = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  );
  for (const retainedPath of retainedValidatorSiblingPaths) {
    assert.equal(
      hardeningAlignmentText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
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
    packageExportTransitionText.includes(
      "`tests/human-review-controlled-handoff-human-professional-approval-schema.test.js` | `TRANSITION_DIRECTLY_IN_THIS_SLICE`",
    ),
    true,
  );
  for (const fragment of [
    "case_id",
    "reviewer_name",
    "credential",
    "recipient",
    "export_status",
    "delivery_status",
    "release_status",
    "approval_history",
    "format",
  ]) {
    assert.equal(schemaText.includes(fragment), false, fragment);
  }
  assert.match(contractText, /OWNER_SELECTED_TEN_STAGE_SEMANTICS_TRANSLATED/u);
  assert.match(scopeText, /FUTURE_SCHEMA_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(scopeText, /FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:\n15/u);
  assert.match(scopeText, /PACKAGE_EXPORT_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED/u);
  assert.match(scopeText, /APPROVAL_EFFECT_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED/u);
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_FIRST_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(
    hardeningAlignmentText,
    /TRACKED_DOCS_ONLY_FOURTH_CANDIDATE_PATH_PROOF_ALIGNMENT_COMPLETE/u,
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
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n13/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n12/u,
  );
});
