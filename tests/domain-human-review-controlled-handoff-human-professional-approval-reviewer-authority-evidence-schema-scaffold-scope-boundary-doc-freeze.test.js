"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const comparisonPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
  "packages/schemas/src/index.js",
];
const candidatePaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema.test.js",
];
const laterSiblingPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.test.js",
];
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultCandidatePaths = laterSiblingPaths.slice(0, 2);
const candidatePackageExportProofPath = laterSiblingPaths[2];
const validatorResultPackageExportProofPath = laterSiblingPaths[3];
const retainedValidatorSiblingPaths = laterSiblingPaths.slice(4);
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
const genericFields = [
  "role_permission_binding_evidence_ref",
  "role_permission_policy_evidence_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(docsText, start, end) {
  const startIndex = docsText.indexOf(start);
  const endIndex = docsText.indexOf(end, startIndex + start.length);

  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return docsText.slice(startIndex, endIndex);
}

function exactNumberedCodeValues(section) {
  return [...section.matchAll(/^\d+\. `([^`]+)`$/gmu)].map(
    (match) => match[1],
  );
}

function exactNumberedLines(section) {
  return [...section.matchAll(/^\d+\. (.+)$/gmu)].map((match) => match[1]);
}

function tableLines(section) {
  return section
    .split("\n")
    .filter((line) => line.startsWith("|"));
}

function fieldTable(section) {
  return new Map(
    [...section.matchAll(/^\| `([^`]+)` \| (.+) \|$/gmu)].map(
      (match) => [match[1], match[2]],
    ),
  );
}

function inlineJson(value) {
  const match = value.match(/^`(.+)`$/u);

  assert.notEqual(match, null, value);
  return JSON.parse(match[1]);
}

function markerValue(text, marker) {
  const match = text.match(new RegExp(`${marker}:\\n([^\\n]+)`, "u"));

  assert.notEqual(match, null, marker);
  return match[1];
}

function asciiCaseInsensitivePrefixPattern(prefix) {
  const literal = prefix.slice(0, -1);
  return `^${[...literal]
    .map((character) => `[${character.toUpperCase()}${character.toLowerCase()}]`)
    .join("")}:`;
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/gu, " ").trim();
}

function bulletItems(section) {
  const items = [];

  for (const line of section.split("\n")) {
    if (line.startsWith("- ")) {
      items.push(line.slice(2));
    } else if (/^  \S/u.test(line) && items.length > 0) {
      items[items.length - 1] += ` ${line.trim()}`;
    }
  }
  return items.map(normalizeWhitespace);
}

test("canonical and comparison sources are tracked without importing semantics", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [contractPath, ...comparisonPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }
  assert.match(
    docsText,
    /Comparison evidence controls only repository-native draft 2020-12/u,
  );
  assert.match(docsText, /does not\s+import another contract's fields/u);
  assert.match(docsText, /No chat output, handoff text, local memory/u);
});

test("all nine owner selections resolve to one exact docs-only scaffold boundary", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 3. Nine Resolved Scaffold-Scope Questions",
    "## 4.",
  );
  const expectedTable = [
    "| Stage | Selected option | Frozen scope answer |",
    "| --- | --- | --- |",
    "| 1 | `OPTION_A` | the future CONTRACT_ONLY candidate is exactly one schema path and one focused schema-test path; package export, validator-result schema, and validator remain excluded |",
    "| 2 | `OPTION_A` | draft 2020-12, one exact local `$id`, and one exact scaffold title are selected |",
    "| 3 | `OPTION_A` | one flat closed root uses all fourteen required fields in contract order; no `$defs`, nested object, array, optional field, or extension field is selected |",
    "| 4 | `OPTION_A` | exact schema-expressible const, pattern, enum, string, and boolean rules are selected for all fourteen fields |",
    "| 5 | `OPTION_A` | each of four generic opaque-reference fields duplicates one exact base pattern plus one exact eight-branch negative rule; no `format` or network resolution is selected |",
    "| 6 | `OPTION_A` | JSON Schema owns wrapper representation only; distinctness, relationship equality, dependency validation, reviewer-permission mapping, policy declarations, same-call behavior, descriptor safety, identity, role, authority, qualification, currentness, and admissibility remain validator or checkpoint concerns |",
    "| 7 | `OPTION_A` | exactly fourteen focused proof families are selected, including positive, negative, metadata, partition, and absence assertions |",
    "| 8 | `OPTION_A` | `packages/schemas/src/index.js` remains unchanged and exactly six later sibling paths remain absent; unnamed downstream paths are neither guessed nor reserved |",
    "| 9 | `OPTION_A` | the current slice is exactly one boundary document and one focused doc-freeze test; one exact future proof-transition prerequisite path is reserved but not created |",
  ];

  assert.deepEqual(tableLines(section), expectedTable);
  for (let stage = 1; stage <= 9; stage += 1) {
    assert.match(
      docsText,
      new RegExp(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`, "u"),
    );
  }
  assert.match(docsText, /OWNER_SELECTED_NINE_STAGE_SCOPE_TRANSLATED/u);
  assert.match(section, /OWNER_SELECTED_STAGE_COUNT:\n9/u);
  assert.match(section, /OPEN_SCHEMA_SCAFFOLD_SCOPE_DECISION_COUNT:\n0/u);
});

test("future candidate paths and schema identity remain exact reservations", () => {
  const docsText = readRequired(docsPath);
  const candidates = sectionBetween(
    docsText,
    "## 4. Exact Future Candidate Files",
    "## 5.",
  );
  const identity = sectionBetween(
    docsText,
    "## 5. Exact Future Schema Identity",
    "## 6.",
  );

  assert.deepEqual(exactNumberedCodeValues(candidates), candidatePaths);
  assert.match(candidates, /FUTURE_SCHEMA_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(
    candidates,
    /`packages\/schemas\/src\/index\.js` remains unchanged/u,
  );
  assert.deepEqual(tableLines(identity), [
    "| Keyword | Exact value |",
    "| --- | --- |",
    "| `$schema` | `https://json-schema.org/draft/2020-12/schema` |",
    "| `$id` | `https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json` |",
    "| `title` | `Human Review Controlled Handoff Human/Professional Approval Reviewer Authority Evidence Contract Scaffold` |",
    "| root `type` | `object` |",
    "| root `additionalProperties` | `false` |",
  ]);
  assert.match(identity, /FUTURE_SCHEMA_IDENTITY_KEYWORD_COUNT:\n5/u);
});

test("future root is the exact flat closed fourteen-field scalar scaffold", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 6. Exact Future Flat Root Scaffold",
    "## 7.",
  );
  const expectedFieldTable = [
    "| Field | Exact future schema encoding |",
    "| --- | --- |",
    '| `contract_id` | `{ "type": "string", "const": "human_review.controlled_handoff_human_professional_approval_reviewer_authority_evidence" }` |',
    '| `contract_version` | `{ "type": "string", "const": "1.0.0" }` |',
    '| `reviewer_authority_evidence_ref` | `{ "type": "string", "pattern": "^rae_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
    '| `approval_ref` | `{ "type": "string", "pattern": "^apr_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
    '| `review_session_ref` | `{ "type": "string", "pattern": "^rvs_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
    '| `reviewer_ref` | `{ "type": "string", "pattern": "^rvr_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
    '| `reviewer_role` | `{ "type": "string", "enum": ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"] }` |',
    "| `role_permission_binding_evidence_ref` | exact generic opaque-reference encoding from Section 7 |",
    "| `role_permission_policy_evidence_ref` | exact generic opaque-reference encoding from Section 7 |",
    "| `binding_issuer_ref` | exact generic opaque-reference encoding from Section 7 |",
    "| `binding_provenance_ref` | exact generic opaque-reference encoding from Section 7 |",
    "| `binding_lifecycle_posture` | exact three-value string enum from this section |",
    '| `verification_posture` | `{ "type": "string", "const": "NOT_VERIFIED_BY_CONTRACT" }` |',
    '| `human_professional_review_required` | `{ "type": "boolean", "const": true }` |',
  ];

  assert.deepEqual(exactNumberedCodeValues(section), rootFields);
  assert.deepEqual(tableLines(section), expectedFieldTable);
  assert.match(
    section,
    /\["REVIEWER_AUTHORITY_BINDING_DECLARED_ACTIVE", "REVIEWER_AUTHORITY_BINDING_DECLARED_INACTIVE", "REVIEWER_AUTHORITY_BINDING_DECLARED_REVOKED"\]/u,
  );
  assert.match(section, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n14/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_REQUIRED_COUNT:\n14/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_OPTIONAL_FIELD_COUNT:\n0/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_ADDITIONAL_PROPERTIES:\nFALSE/u);
  assert.match(section, /FUTURE_SCHEMA_LOCAL_DEFINITION_COUNT:\n0/u);
  assert.match(section, /Every field is required and scalar/u);
});

test("four generic references share one exact eight-branch negative encoding", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 7. Exact Generic Opaque-Reference Encoding",
    "## 8.",
  );
  const jsonBlock = section.match(/```json\n([\s\S]*?)\n```/u);

  assert.deepEqual(exactNumberedCodeValues(section), genericFields);
  assert.notEqual(jsonBlock, null);
  const encoding = JSON.parse(jsonBlock[1]);
  assert.deepEqual(encoding, {
    type: "string",
    pattern: "^[A-Za-z0-9._:-]{1,128}$",
    not: {
      anyOf: [
        { enum: [".", ".."] },
        { pattern: "^[Hh][Tt][Tt][Pp]:" },
        { pattern: "^[Hh][Tt][Tt][Pp][Ss]:" },
        { pattern: "^[Ff][Tt][Pp]:" },
        { pattern: "^[Ff][Ii][Ll][Ee]:" },
        { pattern: "^[Mm][Aa][Ii][Ll][Tt][Oo]:" },
        { pattern: "^[Dd][Aa][Tt][Aa]:" },
        { pattern: "^[Jj][Aa][Vv][Aa][Ss][Cc][Rr][Ii][Pp][Tt]:" },
      ],
    },
  });
  assert.match(section, /GENERIC_OPAQUE_REFERENCE_SCHEMA_FIELD_COUNT:\n4/u);
  assert.match(
    section,
    /GENERIC_OPAQUE_REFERENCE_NOT_ANYOF_BRANCH_COUNT:\n8/u,
  );
  assert.match(
    section,
    /GENERIC_OPAQUE_REFERENCE_PROHIBITED_DOT_VALUE_COUNT:\n2/u,
  );
  assert.match(
    section,
    /GENERIC_OPAQUE_REFERENCE_PROHIBITED_SCHEME_PREFIX_COUNT:\n7/u,
  );
  assert.match(section, /GENERIC_OPAQUE_REFERENCE_FORMAT_KEYWORD_COUNT:\n0/u);
  assert.equal(section.includes('"format"'), false);
});

test("schema validator and checkpoint responsibilities are completely partitioned", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 8. Schema, Validator, And Checkpoint Partition",
    "## 9.",
  );
  const allowed = sectionBetween(
    section,
    "The future schema may enforce only:",
    "The future schema must not claim to enforce:",
  );
  const prohibited = sectionBetween(
    section,
    "The future schema must not claim to enforce:",
    "PAIRWISE_REFERENCE_DISTINCTNESS_IN_JSON_SCHEMA:",
  );

  assert.deepEqual(exactNumberedLines(allowed), [
    "one JSON object representation",
    "the exact fourteen required property names",
    "root closure through `additionalProperties: false`",
    "scalar JSON types",
    "exact const and enum values",
    "lexical namespace and opaque-reference patterns",
    "the exact negative opaque-reference branches in Section 7",
  ]);
  assert.deepEqual(exactNumberedLines(prohibited), [
    "pairwise distinctness across the eight wrapper reference fields",
    "the nine local dependency bindings, two reviewer-permission mappings, or three deny-by-default policy declarations",
    "structural validity of either generic dependency candidate or exact matched role-definition and permission-definition uniqueness",
    "exactly-one same-call candidate cardinality, fail-fast phase order, or external candidate identity",
    "the eleven future outer approval, reviewer-role, and shared-policy cross-references",
    "plain-object identity, own-data-property status, descriptor safety, accessor non-invocation, proxy handling, cycle handling, no mutation, or result freezing",
    "no lookup, dereference, discovery, registry access, cache access, persistence read, or network access",
    "reviewer identity, authentication, role assignment, professional qualification, reviewer authority, permission, policy authority, lifecycle currentness, approval admissibility, eligibility, handoff, export, delivery, release, or external use",
  ]);
  assert.match(
    section,
    /PAIRWISE_REFERENCE_DISTINCTNESS_IN_JSON_SCHEMA:\nNOT_ENFORCED/u,
  );
  assert.match(
    section,
    /LOCAL_DEPENDENCY_BINDINGS_IN_JSON_SCHEMA:\nNOT_ENFORCED/u,
  );
  assert.match(
    section,
    /REVIEWER_PERMISSION_MAPPING_AND_POLICY_DECLARATIONS_IN_JSON_SCHEMA:\nNOT_ENFORCED/u,
  );
  assert.match(
    section,
    /OUTER_CROSS_REFERENCE_EQUALITY_IN_JSON_SCHEMA:\nNOT_ENFORCED/u,
  );
  assert.match(
    section,
    /GENERIC_DEPENDENCY_CANDIDATES_EMBEDDED_IN_WRAPPER_SCHEMA:\nNO/u,
  );
  assert.match(
    section,
    /IDENTITY_ROLE_AUTHORITY_QUALIFICATION_OR_ADMISSIBILITY_IN_WRAPPER_SCHEMA:\nNO/u,
  );
});

test("future focused proof is exactly fourteen bounded assertion families", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 9. Exact Future Focused Proof Scope",
    "## 10.",
  );

  assert.deepEqual(exactNumberedLines(section), [
    "one exact valid fourteen-field candidate is structurally schema-valid",
    "schema draft, local identity, title, root type, and root closure are exact",
    "root `required` and `properties` contain exactly fourteen fields in documentation order and `$defs` is absent",
    "missing, additional, null, nested, array, and wrong-type field values are rejected",
    "contract identity, version, verification posture, human-review flag, namespace patterns, reviewer-role enum, and lifecycle enum are exact",
    "generic opaque-reference minimum, maximum, alphabet, and punctuation behavior follows the exact base pattern",
    "`.` and `..` are rejected by the exact negative rule",
    "all seven prohibited scheme prefixes are rejected under lowercase, uppercase, and mixed-case examples",
    "each of the four generic-reference fields carries the exact ordered eight-branch `not.anyOf` structure",
    "candidate property insertion order does not alter schema validity while documentation order remains exact",
    "equal values across the four generic-reference fields remain schema-valid, proving pairwise distinctness remains validator-only",
    "syntactically valid values remain schema-valid without local bindings, reviewer-permission mapping, policy declarations, dependency, outer cross-reference, identity, role, authority, qualification, currentness, or admissibility claims",
    "package export, validator-result schema, validator, and all six sibling paths remain absent",
    "checkpoint, identity verification, role verification, qualification verification, authority verification, trusted-time currentness, persistence, API, UI, and runtime behavior remain absent",
  ]);
  assert.match(
    section,
    /FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:\n14/u,
  );
  assert.match(section, /JSON Schema does not enforce object-member\norder/u);
});

test("contract truth supports the selected representation without semantic expansion", () => {
  const contractText = readRequired(contractPath);
  const docsText = readRequired(docsPath);
  const rootSection = sectionBetween(
    contractText,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5.",
  );
  const dependencySection = sectionBetween(
    contractText,
    "## 5. Direct Generic Dependencies And Same-Call Family",
    "## 6.",
  );
  const roleSection = sectionBetween(
    contractText,
    "## 7. Exact Reviewer Permission Mapping And Authority Separation",
    "## 8.",
  );
  const lifecycleSection = sectionBetween(
    contractText,
    "## 9. Binding Issuer, Provenance, Lifecycle, And Verification",
    "## 10.",
  );
  const scaffoldRootSection = sectionBetween(
    docsText,
    "## 6. Exact Future Flat Root Scaffold",
    "## 7.",
  );
  const scaffoldGenericSection = sectionBetween(
    docsText,
    "## 7. Exact Generic Opaque-Reference Encoding",
    "## 8.",
  );
  const contractFields = fieldTable(rootSection);
  const scaffoldFields = fieldTable(scaffoldRootSection);
  const contractId = markerValue(rootSection, "CONTRACT_ID");
  const contractVersion = markerValue(rootSection, "CONTRACT_VERSION");
  const contractGenericFields = exactNumberedCodeValues(
    sectionBetween(
      dependencySection,
      "The four generic-style wrapper references are:",
      "Each is a string",
    ),
  );
  const genericPatternMatch = dependencySection.match(
    /Each is a string of 1 through 128 characters matching:\n\n`([^`]+)`/u,
  );
  const dangerousSchemes = exactNumberedCodeValues(
    sectionBetween(
      dependencySection,
      "The dangerous scheme prefixes are:",
      "Dangerous scheme prefixes are compared",
    ),
  );
  const roleRows = tableLines(roleSection).slice(2);
  const contractRoles = roleRows.map((row) => row.split("|")[1].trim().slice(1, -1));
  const contractLifecycle = exactNumberedCodeValues(
    sectionBetween(
      lifecycleSection,
      "The exact wrapper binding lifecycle values in canonical order are:",
      "BINDING_LIFECYCLE_POSTURE_COUNT:",
    ),
  );
  const scaffoldLifecycleMatch = scaffoldRootSection.match(
    /The future `binding_lifecycle_posture` schema must be exactly:\n\n(`[^\n]+`)/u,
  );
  const scaffoldGenericBlock = scaffoldGenericSection.match(
    /```json\n([\s\S]*?)\n```/u,
  );

  assert.deepEqual(exactNumberedCodeValues(rootSection), rootFields);
  assert.deepEqual([...contractFields.keys()], rootFields);
  assert.deepEqual([...scaffoldFields.keys()], rootFields);
  assert.equal(inlineJson(scaffoldFields.get("contract_id")).const, contractId);
  assert.equal(
    inlineJson(scaffoldFields.get("contract_version")).const,
    contractVersion,
  );
  for (const field of [
    "reviewer_authority_evidence_ref",
    "approval_ref",
    "review_session_ref",
    "reviewer_ref",
  ]) {
    const contractPattern = contractFields
      .get(field)
      .match(/matching `([^`]+)`/u);

    assert.notEqual(contractPattern, null, field);
    assert.equal(
      inlineJson(scaffoldFields.get(field)).pattern,
      contractPattern[1],
      field,
    );
  }
  assert.deepEqual(
    inlineJson(scaffoldFields.get("reviewer_role")).enum,
    contractRoles,
  );
  assert.deepEqual(contractGenericFields, genericFields);
  for (const field of contractGenericFields) {
    assert.equal(
      scaffoldFields.get(field),
      "exact generic opaque-reference encoding from Section 7",
      field,
    );
  }
  assert.notEqual(genericPatternMatch, null);
  assert.notEqual(scaffoldGenericBlock, null);
  const scaffoldGenericEncoding = JSON.parse(scaffoldGenericBlock[1]);
  assert.equal(scaffoldGenericEncoding.pattern, genericPatternMatch[1]);
  assert.deepEqual(scaffoldGenericEncoding.not.anyOf, [
    { enum: [".", ".."] },
    ...dangerousSchemes.map((prefix) => ({
      pattern: asciiCaseInsensitivePrefixPattern(prefix),
    })),
  ]);
  assert.notEqual(scaffoldLifecycleMatch, null);
  assert.deepEqual(inlineJson(scaffoldLifecycleMatch[1]), {
    type: "string",
    enum: contractLifecycle,
  });
  assert.equal(
    inlineJson(scaffoldFields.get("verification_posture")).const,
    contractFields.get("verification_posture").match(/equal to `([^`]+)`/u)[1],
  );
  assert.equal(
    inlineJson(scaffoldFields.get("human_professional_review_required")).const,
    contractFields
      .get("human_professional_review_required")
      .match(/equal to `([^`]+)`/u)[1] === "true",
  );
  assert.match(rootSection, /TOP_LEVEL_FIELD_COUNT:\n14/u);
  assert.match(
    contractText,
    /EXACT_LOCAL_DEPENDENCY_BINDING_COUNT:\n9/u,
  );
  assert.match(contractText, /REVIEWER_ROLE_ENUM_COUNT:\n2/u);
  assert.match(contractText, /REVIEWER_PERMISSION_MAPPING_COUNT:\n2/u);
  assert.match(contractText, /EXACT_DENY_BY_DEFAULT_POLICY_DECLARATION_COUNT:\n3/u);
  assert.match(
    contractText,
    /EXACT_FUTURE_OUTER_CROSS_REFERENCE_COUNT:\n11/u,
  );
  assert.match(
    contractText,
    /PAIRWISE_DISTINCT_INTERNAL_REFERENCE_COUNT:\n8/u,
  );
  assert.match(
    contractText,
    /APPROVAL_SPECIFIC_REVIEWER_AUTHORITY_EVIDENCE_CANDIDATE_COUNT:\n1/u,
  );
  assert.match(
    contractText,
    /GENERIC_ROLE_PERMISSION_BINDING_EVIDENCE_CANDIDATE_COUNT:\n1/u,
  );
  assert.match(
    contractText,
    /GENERIC_ROLE_PERMISSION_POLICY_EVIDENCE_CANDIDATE_COUNT:\n1/u,
  );
});

test("proof transition preserves six historical references and the exact 2/4 live partition", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);
  const proofTransitionText = readRequired(proofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const excluded = sectionBetween(
    docsText,
    "## 10. Excluded Sibling And Downstream Surfaces",
    "## 11.",
  );
  const transition = sectionBetween(
    docsText,
    "## 11. Proof-Transition Boundary",
    "## 12.",
  );
  const documentedExcludedPaths = [
    ...excluded.matchAll(/^- `([^`]+)`$/gmu),
  ].map((match) => match[1]);
  const transitionSources = sectionBetween(
    proofTransitionText,
    "## 2. Canonical Sources And Transition Precedent",
    "## 3.",
  );
  const classification = sectionBetween(
    proofTransitionText,
    "## 3. Exact Historical And Current Conflict Classification",
    "## 4.",
  );
  const selfTransition = sectionBetween(
    proofTransitionText,
    "## 4. Exact Prerequisite Self-Path Transition",
    "## 5.",
  );
  const candidateTransition = sectionBetween(
    proofTransitionText,
    "## 5. Two Candidate Paths Released From Perpetual Live Absence",
    "## 6.",
  );
  const siblingTransition = sectionBetween(
    proofTransitionText,
    "## 6. Six Retained Live Absence Requirements",
    "## 7.",
  );
  const proofSteps = sectionBetween(
    proofTransitionText,
    "## 7. Exact Scaffold-Proof Transition",
    "## 8.",
  );
  const currentScope = sectionBetween(
    proofTransitionText,
    "## 8. Exact Current Two-File Slice",
    "## 9.",
  );
  const laterSlice = sectionBetween(
    proofTransitionText,
    "## 9. Separate Later Candidate-Schema Slice",
    "## 10.",
  );
  const nonInterference = sectionBetween(
    proofTransitionText,
    "## 10. Non-Interference And Proof Boundary",
    "## 11.",
  );
  const finalBoundary = proofTransitionText.slice(
    proofTransitionText.indexOf("## 11. Final No-Conclusion Boundary"),
  );
  const finalParagraph = sectionBetween(
    finalBoundary,
    "This proof-transition prerequisite is not",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:",
  );

  assert.match(excluded, /LATER_SIBLING_PATH_COUNT:\n6/u);
  assert.deepEqual(documentedExcludedPaths, [
    "packages/schemas/src/index.js",
    ...laterSiblingPaths,
  ]);
  for (const siblingPath of laterSiblingPaths) {
    assert.equal(excluded.includes(`\`${siblingPath}\``), true, siblingPath);
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
    proofText.includes("fs." + "existsSync(absolute(siblingPath))"),
    false,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(validatorResultCandidatePath))",
    ),
    false,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
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
    proofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.equal(
    proofText.includes("const package" + "Index = readRequired("),
    false,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      `\`${proofPath}\` | \`SEPARATE_FOCUSED_ALIGNMENT_REQUIRED\``,
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
  assert.equal(transition.includes(`\`${proofTransitionPath}\``), true);
  assert.match(transition, /CANDIDATE_SCHEMA_PATH_COUNT:\n2/u);
  assert.match(transition, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(
    transition,
    /PROOF_TRANSITION_PREREQUISITE_STATUS:\nNOT_CREATED/u,
  );
  assert.match(
    proofTransitionText,
    /HISTORICAL_SCAFFOLD_ABSENCE_MARKERS_PRESERVED/u,
  );
  assert.match(
    proofTransitionText,
    /PROOF_TRANSITION_DOCUMENT_SELF_ABSENCE_ASSERTION_REMOVED/u,
  );
  assert.match(
    proofTransitionText,
    /TWO_CANDIDATE_SCHEMA_PATH_LIVE_ABSENCE_ASSERTIONS_RELEASED/u,
  );
  assert.match(
    proofTransitionText,
    /SIX_LATER_SIBLING_PATH_LIVE_ABSENCE_ASSERTIONS_RETAINED/u,
  );
  const exactTransitionSourcePaths = [
    contractPath,
    docsPath,
    proofPath,
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
    "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  ];
  assert.deepEqual(
    [...transitionSources.matchAll(/^- `([^`]+)`$/gmu)].map(
      (match) => match[1],
    ),
    exactTransitionSourcePaths,
  );
  for (const sourcePath of exactTransitionSourcePaths) {
    readRequired(sourcePath);
  }
  assert.deepEqual(tableLines(classification), [
    "| Surface | Historical/current scaffold-proof posture | Required transitioned posture |",
    "| --- | --- | --- |",
    "| scaffold document markers | prerequisite and schema were not created by that earlier docs-only slice | preserve unchanged as historical statements |",
    "| prerequisite document path | live filesystem absence asserted | require this tracked prerequisite document |",
    "| two candidate-schema paths | live filesystem absence asserted | retain documentation and release only perpetual live absence |",
    "| six later sibling paths | live filesystem absence asserted | retain every live absence assertion |",
    "| schema and runtime behavior | absent | remain absent |",
  ]);
  assert.match(classification, /PROOF_TRANSITION_SELF_PATH_COUNT:\n1/u);
  assert.match(
    classification,
    /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    classification,
    /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u,
  );
  assert.match(
    classification,
    /LIVE_ABSENCE_ASSERTION_TRANSITION_COUNT:\n3/u,
  );
  assert.deepEqual(
    [...selfTransition.matchAll(/^- `([^`]+)`$/gmu)].map(
      (match) => match[1],
    ),
    [proofTransitionPath],
  );
  assert.match(
    selfTransition,
    /PROOF_TRANSITION_PREREQUISITE_CURRENT_STATUS:\nTRACKED_REQUIRED_SOURCE/u,
  );
  assert.deepEqual(tableLines(candidateTransition), [
    "| Position | Reserved candidate path | Transition status |",
    "| --- | --- | --- |",
    `| 1 | \`${candidatePaths[0]}\` | \`PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE\` |`,
    `| 2 | \`${candidatePaths[1]}\` | \`PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE\` |`,
  ]);
  assert.match(
    candidateTransition,
    /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    candidateTransition,
    /REMAINING_CANDIDATE_PATH_PROOF_ALIGNMENT_COUNT:\n0/u,
  );
  assert.deepEqual(tableLines(siblingTransition), [
    "| Position | Retained absent path | Retained status |",
    "| --- | --- | --- |",
    ...laterSiblingPaths.map(
      (siblingPath, index) =>
        `| ${index + 1} | \`${siblingPath}\` | \`RETAIN_LIVE_ABSENCE_ASSERTION\` |`,
    ),
  ]);
  assert.match(
    siblingTransition,
    /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u,
  );
  assert.deepEqual(exactNumberedLines(proofSteps), [
    "keep the exact ordered two-path candidate-schema list",
    "keep the exact ordered six-path later-sibling list",
    "read this prerequisite as a required tracked source",
    "preserve the scaffold document's historical `NOT_CREATED` marker",
    "prove this prerequisite's exact one-self/two-candidate/six-sibling partition",
    "prove both candidate paths carry `PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
    "stop checking live filesystem absence for only the two candidate paths",
    "prove all six sibling paths carry `RETAIN_LIVE_ABSENCE_ASSERTION`",
    "continue checking live filesystem absence for all six sibling paths",
    "prove that no candidate-path proof alignment remains",
    "preserve every schema, export, validator, runtime, release, and no-conclusion boundary",
  ]);
  assert.match(proofSteps, /SCAFFOLD_PROOF_TRANSITION_STEP_COUNT:\n11/u);
  assert.deepEqual(tableLines(currentScope), [
    "| Position | Current path | Exact action |",
    "| --- | --- | --- |",
    `| 1 | \`${proofTransitionPath}\` | create this docs-only prerequisite |`,
    `| 2 | \`${proofPath}\` | replace only the self-path and two candidate-path live absences with transition-document assertions while retaining six sibling live absences |`,
  ]);
  assert.match(currentScope, /CURRENT_PREREQUISITE_FILE_COUNT:\n2/u);
  assert.match(currentScope, /CURRENT_PREREQUISITE_DOC_FILE_COUNT:\n1/u);
  assert.match(
    currentScope,
    /CURRENT_PREREQUISITE_PROOF_ALIGNMENT_FILE_COUNT:\n1/u,
  );
  assert.match(currentScope, /CURRENT_PREREQUISITE_SCHEMA_FILE_COUNT:\n0/u);
  assert.match(currentScope, /CURRENT_PREREQUISITE_RUNTIME_FILE_COUNT:\n0/u);
  assert.deepEqual(exactNumberedCodeValues(laterSlice), candidatePaths);
  assert.match(laterSlice, /LATER_CANDIDATE_SCHEMA_FILE_COUNT:\n2/u);
  assert.deepEqual(bulletItems(nonInterference), [
    "preserve every historical contract and scaffold document marker",
    "preserve both reserved candidate paths and all six later sibling paths",
    "transition only this prerequisite's self path and the two candidate live absence assertions",
    "retain all six later sibling live absence assertions",
    "create no schema or schema proof in this prerequisite slice",
    "create no package export, validator-result schema, validator, checkpoint, identity verifier, role verifier, qualification verifier, authority verifier, trusted-time/currentness evaluator, persistence, API, UI, or runtime",
    "inspect or process no raw, private, source, case, identity-provider, credential, qualification, policy, authorship, or real-evidence material",
    "create no identity, role, qualification, authority, approval, admissibility, finding, score, conclusion, certification, readiness, or external-use claim",
    "preserve human and professional review as release gates",
  ]);
  assert.equal(
    normalizeWhitespace(finalParagraph),
    "This proof-transition prerequisite is not actual human review, professional review, legal review, evidentiary review, technical review, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, ownership determination, credibility assessment, source-truth conclusion, identity-truth conclusion, role-truth conclusion, qualification conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation-readiness, governance approval, handoff approval, case-truth conclusion, or real-evidence review.",
  );
  assert.match(
    proofTransitionText,
    /TRACKED_DOCS_ONLY_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    proofTransitionText,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_CANDIDATE_SCHEMA_CONTRACT_ONLY_SLICE/u,
  );
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
      `| 1 | \`${proofPath}\` | preserve candidate-schema scaffold history and four sibling absences; align only the two validator-result candidate paths |`,
    ),
    true,
  );
  assert.match(
    validatorResultTransitionText,
    /TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n7/u,
  );
  assert.match(
    packageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n6/u,
  );
  assert.match(
    packageExportTransitionText,
    /TRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED/u,
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
    proofText.includes("fs." + "existsSync(absolute(candidatePath))"),
    false,
  );
  assert.equal(
    proofText.includes("fs." + "existsSync(absolute(proofTransitionPath))"),
    false,
  );
});

test("current two-file scope and the complete no-conclusion boundary are exact", () => {
  const docsText = readRequired(docsPath);
  const scope = sectionBetween(
    docsText,
    "## 12. Exact Current Docs-Only File Scope",
    "## 13.",
  );
  const finalSection = docsText.slice(
    docsText.indexOf("## 13. Non-Interference And Final No-Conclusion Boundary"),
  );
  const finalParagraph = sectionBetween(
    finalSection,
    "This scope boundary is not",
    "SCHEMA_CREATED_BY_THIS_SLICE:",
  );

  assert.deepEqual(exactNumberedCodeValues(scope), [docsPath, proofPath]);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_DOC_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_FOCUSED_PROOF_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_SCHEMA_FILE_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_PACKAGE_EXPORT_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_RUNTIME_FILE_COUNT:\n0/u);
  assert.deepEqual(bulletItems(finalSection), [
    "preserve the reviewer authority evidence contract boundary unchanged",
    "create no schema, package export, validator-result schema, validator, checkpoint, identity verifier, role-assignment verifier, professional- qualification verifier, authority verifier, trusted-time/currentness evaluator, persistence, API, UI, handoff/export gate, delivery, or runtime",
    "inspect or process no raw, private, source, case, identity-provider, credential, qualification-provider, policy, authorship, or real-evidence material",
    "create no identity, authentication, qualification, role, authority, permission, currentness, approval, admissibility, eligibility, finding, score, severity, recommendation, conclusion, certification, product readiness, or external-use claim",
    "preserve human and professional review as release gates",
  ]);
  assert.equal(
    normalizeWhitespace(finalParagraph),
    "This scope boundary is not schema correctness, validator correctness, identity verification, authentication, role verification, professional qualification verification, authority verification, actual human review, professional review, legal review, evidentiary review, legal advice, technical sign-off, release approval, product or external-use authorization, compliance certification, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, handoff approval, case-truth conclusion, or real-evidence review.",
  );
  assert.match(docsText, /SCHEMA_FILE_NOT_CREATED/u);
  assert.match(docsText, /SCHEMA_EXPORT_NOT_CREATED/u);
  assert.match(docsText, /VALIDATION_EXECUTION_NOT_CREATED/u);
  assert.match(docsText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
  assert.match(docsText, /PRODUCT_CANDIDATE_NONE/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
  assert.match(docsText, /^SCHEMA_CREATED_BY_THIS_SLICE:\nNO$/mu);
  assert.match(docsText, /^PACKAGE_EXPORT_CREATED_BY_THIS_SLICE:\nNO$/mu);
  assert.match(
    docsText,
    /^VALIDATOR_RESULT_SCHEMA_CREATED_BY_THIS_SLICE:\nNO$/mu,
  );
  assert.match(
    docsText,
    /^VALIDATOR_OR_RUNTIME_CREATED_BY_THIS_SLICE:\nNO$/mu,
  );
  assert.match(
    docsText,
    /^IDENTITY_ROLE_AUTHORITY_QUALIFICATION_OR_APPROVAL_CREATED_BY_THIS_SLICE:\nNO$/mu,
  );
  assert.match(
    docsText,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_SCHEMA_PROOF_TRANSITION_PREREQUISITE/u,
  );
});
