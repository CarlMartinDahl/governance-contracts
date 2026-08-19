"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const contractProofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-contract-boundary-doc-freeze.test.js";
const approvalSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval.json";
const packageIndexPath = "packages/schemas/src/index.js";
const candidatePaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema.test.js",
];
const laterSiblingPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
];
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultCandidatePaths = laterSiblingPaths.slice(0, 2);
const retainedPackageAndValidatorSiblingPaths = laterSiblingPaths.slice(2);
const candidatePackageExportProofPath =
  retainedPackageAndValidatorSiblingPaths[0];
const validatorResultPackageExportProofPath = laterSiblingPaths[3];
const retainedValidatorSiblingPaths = laterSiblingPaths.slice(4);
const canonicalSourcePaths = [
  contractPath,
  contractProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  approvalSchemaPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-chronology.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-declared-packet-review-gaps.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-questions.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-no-conclusion-notice.json",
];
const precedentPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  approvalSchemaPath,
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
];
const subjectSchemaBindings = [
  {
    kind: "SOURCE_REGISTER_SOURCE",
    schemaPath: "schemas/human-review-source-register.json",
    collectionField: "sources",
    definitionField: "sourceEntry",
    referenceField: "source_ref",
    pattern: "^src_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "REVIEW_CHRONOLOGY_ENTRY",
    schemaPath: "schemas/human-review-chronology.json",
    collectionField: "entries",
    definitionField: "chronologyEntry",
    referenceField: "entry_ref",
    pattern: "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "ASSERTED_CLAIM",
    schemaPath: "schemas/human-review-asserted-claim-matrix.json",
    collectionField: "claims",
    definitionField: "claimRow",
    referenceField: "claim_ref",
    pattern: "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "DECLARED_REVIEW_GAP",
    schemaPath: "schemas/human-review-declared-packet-review-gaps.json",
    collectionField: "gaps",
    definitionField: "gapRow",
    referenceField: "gap_ref",
    pattern: "^gap_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "HUMAN_REVIEW_QUESTION",
    schemaPath: "schemas/human-review-questions.json",
    collectionField: "questions",
    definitionField: "questionRow",
    referenceField: "question_ref",
    pattern: "^qst_[a-z0-9][a-z0-9_-]{0,59}$",
  },
  {
    kind: "NO_CONCLUSION_NOTICE",
    schemaPath: "schemas/human-review-no-conclusion-notice.json",
    collectionField: "notices",
    definitionField: "noticeRow",
    referenceField: "notice_ref",
    pattern: "^ncn_[a-z0-9][a-z0-9_-]{0,59}$",
  },
];
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
const expectedStageTable = [
  "| Stage | Selected option | Frozen scope answer |",
  "| --- | --- | --- |",
  "| 1 | `OPTION_A` | the future `CONTRACT_ONLY` candidate is exactly one schema path and one focused schema-test path; package export, validator-result schema, and validator remain excluded |",
  "| 2 | `OPTION_A` | draft 2020-12, one exact local `$id`, and one exact scaffold title are selected |",
  "| 3 | `OPTION_A` | one flat closed root uses all sixteen required fields in contract order; no `$defs`, nested object, array, optional field, or extension field is selected |",
  "| 4 | `OPTION_A` | exact schema-expressible const, pattern, enum, string, and boolean rules are selected together with one ordered six-branch `allOf` kind/reference mapping |",
  "| 5 | `OPTION_A` | each of two generic opaque-reference fields duplicates one exact base pattern plus one exact eight-branch negative rule; no `format` or network resolution is selected |",
  "| 6 | `OPTION_A` | JSON Schema owns wrapper representation only; distinctness, external equality, candidate-set completeness and order, same-call membership, subject-pair uniqueness, immutability, descriptor safety, identity, authority, trusted time, currentness, relevance, sufficiency, admissibility, and approval effect remain validator or checkpoint concerns |",
  "| 7 | `OPTION_A` | exactly fifteen focused proof families are selected, including one complete structural and behavioral family for all six kind/reference branches |",
  "| 8 | `OPTION_A` | `packages/schemas/src/index.js` remains unchanged and exactly six later sibling paths remain absent; unnamed downstream paths are neither guessed nor reserved |",
  "| 9 | `OPTION_A` | the current slice is exactly one boundary document and one focused doc-freeze test; one exact future proof-transition prerequisite path is reserved but not created |",
];
const expectedIdentityTable = [
  "| Keyword | Exact value |",
  "| --- | --- |",
  "| `$schema` | `https://json-schema.org/draft/2020-12/schema` |",
  "| `$id` | `https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json` |",
  "| `title` | `Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Contract Scaffold` |",
  "| root `type` | `object` |",
  "| root `additionalProperties` | `false` |",
];
const rootKeywords = [
  "$schema",
  "$id",
  "title",
  "type",
  "additionalProperties",
  "required",
  "properties",
  "allOf",
];
const expectedFieldTable = [
  "| Field | Exact future schema encoding |",
  "| --- | --- |",
  '| `contract_id` | `{ "type": "string", "const": "human_review.controlled_handoff_human_professional_approval_decision_basis_evidence" }` |',
  '| `contract_version` | `{ "type": "string", "const": "1.0.0" }` |',
  '| `decision_basis_ref` | `{ "type": "string", "pattern": "^rvb_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
  '| `approval_ref` | `{ "type": "string", "pattern": "^apr_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
  '| `review_session_ref` | `{ "type": "string", "pattern": "^rvs_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
  '| `reviewer_ref` | `{ "type": "string", "pattern": "^rvr_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
  '| `reviewer_role` | `{ "type": "string", "enum": ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"] }` |',
  '| `decision` | `{ "type": "string", "enum": ["HUMAN_PROFESSIONAL_GATE_APPROVED", "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED", "HUMAN_PROFESSIONAL_GATE_REJECTED"] }` |',
  '| `basis_subject_kind` | `{ "type": "string", "enum": ["SOURCE_REGISTER_SOURCE", "REVIEW_CHRONOLOGY_ENTRY", "ASSERTED_CLAIM", "DECLARED_REVIEW_GAP", "HUMAN_REVIEW_QUESTION", "NO_CONCLUSION_NOTICE"] }` |',
  '| `basis_subject_ref` | `{ "type": "string" }`, with its exact kind-selected pattern supplied only by Section 7 |',
  '| `basis_posture` | `{ "type": "string", "const": "DECISION_BASIS_CANDIDATE_ONLY" }` |',
  "| `binding_issuer_ref` | exact generic opaque-reference encoding from Section 8 |",
  "| `binding_provenance_ref` | exact generic opaque-reference encoding from Section 8 |",
  "| `basis_lifecycle_posture` | exact three-value string enum from this section |",
  '| `verification_posture` | `{ "type": "string", "const": "NOT_VERIFIED_BY_CONTRACT" }` |',
  '| `human_professional_review_required` | `{ "type": "boolean", "const": true }` |',
];
const expectedConditionalBranches = subjectSchemaBindings.map(
  ({ kind, pattern }) => ({
    if: {
      required: ["basis_subject_kind"],
      properties: {
        basis_subject_kind: {
          const: kind,
        },
      },
    },
    then: {
      properties: {
        basis_subject_ref: {
          pattern,
        },
      },
    },
  }),
);
const expectedOpaqueReferenceEncoding = {
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
};
const expectedLifecycleEncoding = {
  type: "string",
  enum: [
    "DECISION_BASIS_DECLARED_ACTIVE",
    "DECISION_BASIS_DECLARED_INACTIVE",
    "DECISION_BASIS_DECLARED_REVOKED",
  ],
};
const expectedCandidateSchemaSliceStatuses = [
  ["PACKAGE_EXPORT_IN_CANDIDATE_SCHEMA_SLICE", "NO"],
  ["VALIDATOR_RESULT_SCHEMA_IN_CANDIDATE_SCHEMA_SLICE", "NO"],
  ["STRUCTURAL_VALIDATOR_IN_CANDIDATE_SCHEMA_SLICE", "NO"],
  ["CROSS_REFERENCE_OR_SUBJECT_LOOKUP_IN_CANDIDATE_SCHEMA_SLICE", "NO"],
  ["IDENTITY_ROLE_AUTHORITY_OR_CURRENTNESS_IN_CANDIDATE_SCHEMA_SLICE", "NO"],
  [
    "RELEVANCE_SUPPORT_SUFFICIENCY_OR_PROBATIVE_VALUE_IN_CANDIDATE_SCHEMA_SLICE",
    "NO",
  ],
  ["APPROVAL_HANDOFF_RELEASE_OR_EXTERNAL_USE_IN_CANDIDATE_SCHEMA_SLICE", "NO"],
];
const expectedAllowedSchemaClaims = [
  "one JSON object representation",
  "the exact sixteen required property names",
  "root closure through `additionalProperties: false`",
  "scalar JSON types",
  "exact const and enum values",
  "lexical namespace and opaque-reference patterns",
  "the exact six ordered kind/reference conditional branches in Section 7",
  "the exact negative opaque-reference branches in Section 8",
];
const expectedProhibitedSchemaClaims = [
  "pairwise distinctness across the seven internal reference fields",
  "exact external equality against the approval, review-session, reviewer identity, reviewer role, or reviewer authority evidence candidates",
  "complete one-to-one candidate coverage, approval-order preservation, missing, extra, duplicate, or reordered candidate detection",
  "unique subject kind/reference pairs across one approval attempt",
  "exactly-one same-call subject occurrence, packet binding, or subject-family candidate membership",
  "per-approval-attempt immutability, no-reuse posture, replacement, supersession, history, or current-record selection",
  "plain-object identity, prototype restriction, own-data-property status, descriptor safety, accessor non-invocation, proxy handling, cycle handling, no mutation, or result freezing",
  "no lookup, dereference, discovery, registry access, cache access, persistence read, or network access",
  "subject existence, truth, authenticity, relevance, support, sufficiency, probative value, admissibility, or evidentiary effect",
  "reviewer identity, role assignment, qualification, authority, session validity, issuer trust, provenance truth, trusted time, lifecycle truth, currentness, approval effect, handoff, export, delivery, release, or external use",
];
const expectedProofFamilies = [
  "one exact valid sixteen-field candidate is structurally schema-valid",
  "schema draft, local identity, title, root type, root closure, and exact eight-keyword root order are exact",
  "root `required` and `properties` contain exactly sixteen fields in documentation order and `$defs` is absent",
  "missing, additional, null, nested, array, and wrong-type field values are rejected",
  "contract identity, version, verification posture, human-review flag, namespace patterns, reviewer-role enum, approval-decision enum, subject-kind enum, basis posture, and lifecycle enum are exact",
  "generic opaque-reference minimum, maximum, alphabet, and punctuation behavior follows the exact base pattern",
  "`.` and `..` are rejected by the exact negative rule",
  "all seven prohibited scheme prefixes are rejected under lowercase, uppercase, and mixed-case examples",
  "each of the two generic-reference fields carries the exact ordered eight-branch `not.anyOf` structure",
  "the exact six ordered `allOf` branches are present and every kind accepts only its matching reference namespace while rejecting all five non-matching namespaces",
  "candidate property insertion order does not alter schema validity while documentation and conditional-branch order remain exact",
  "equal values across generic-reference fields and otherwise syntactically valid cross-field values remain schema-valid, proving pairwise distinctness and external equality remain validator or checkpoint concerns",
  "syntactically valid kind/reference pairs remain schema-valid without subject existence, unique same-call occurrence, packet binding, truth, relevance, support, sufficiency, probative value, or admissibility claims",
  "package export, validator-result schema, validator, and all six later sibling paths remain absent",
  "cross-reference, subject lookup, reviewer or session verification, identity verification, role verification, authority verification, trusted-time currentness, persistence, API, UI, and runtime behavior remain absent",
];
const expectedNonInterferenceItems = [
  "modify no existing tracked file",
  "create only the exact boundary document and focused proof named in Section 13",
  "create no schema, schema export, validator-result schema, validator, dispatch, checkpoint, consumer, persistence, API, UI, or runtime behavior",
  "rewrite no decision-basis contract field, value, mapping, cardinality, ordering, immutability, privacy, lifecycle, or no-conclusion rule",
  "add no nested dependency candidate, precomputed validator result, cross-reference result, subject lookup result, currentness result, relevance result, sufficiency result, admissibility result, or approval result",
  "inspect or process no raw, private, source, case, identity, session, credential, provider, model, decision-basis, or real-evidence material",
  "create no identity, role, authority, qualification, session, issuer-trust, trusted-time, lifecycle-truth, currentness, subject-truth, relevance, support, sufficiency, probative-value, admissibility, approval-effect, handoff, release, product, or external-use conclusion",
  "create no legal conclusion, evidentiary conclusion, professional opinion, finding, severity, score, recommendation, remediation, blocker resolution, security finding, compliance certification, or technical sign-off",
];
const expectedCurrentProofClaims = [
  "the nine Owner-selected scaffold-scope decisions are tracked exactly",
  "the future two-file candidate scope, schema identity, sixteen-field root, exact field encodings, six conditional branches, generic-reference encoding, schema/checkpoint partition, fifteen proof families, six later paths, and proof-transition prerequisite are frozen",
  "the future schema and all sibling paths remain absent",
  "package export, validator-result schema, validator, checkpoint, subject lookup, identity, authority, currentness, relevance, sufficiency, approval effect, handoff, release, external use, and runtime behavior remain absent and unauthorized",
];
const expectedProofCannotEstablish =
  "It cannot prove schema implementation, schema correctness, validator correctness, candidate-set completeness, external equality, subject existence, same-call membership, packet binding, subject truth, authenticity, relevance, support, sufficiency, probative value, reviewer identity, reviewer authority, session validity, issuer trust, trusted time, lifecycle truth, currentness, approval admissibility, handoff eligibility, runtime behavior, professional review completion, release readiness, product candidacy, or external-use readiness.";
const expectedFinalNoConclusion =
  "This boundary is not human review, professional review, legal review, evidentiary review, identity verification, authentication, reviewer-role verification, reviewer-authority verification, session verification, subject verification, source verification, issuer-trust verification, provenance verification, trusted-time verification, currentness verification, lifecycle verification, relevance assessment, support assessment, sufficiency assessment, probative-value assessment, approval, approval effect, handoff authorization, release authorization, product approval, external-use authorization, security review, technical sign-off, compliance certification, source-truth determination, chain-of-custody proof, or case-truth determination.";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function readJsonRequired(relativePath) {
  return JSON.parse(readRequired(relativePath));
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

function numberedItems(section) {
  return [...section.matchAll(/^\d+\. (.+)$/gmu)].map((match) => match[1]);
}

function numberedBacktickValues(section) {
  return [...section.matchAll(/^\d+\. `([^`]+)`$/gmu)].map(
    (match) => match[1],
  );
}

function bulletBacktickValues(section) {
  return [...section.matchAll(/^- `([^`]+)`$/gmu)].map((match) => match[1]);
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
  return items.map(normalize);
}

function tableLines(section) {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
}

function jsonCodeBlock(section) {
  const match = section.match(/```json\n([\s\S]*?)\n```/u);

  assert.notEqual(match, null);
  return JSON.parse(match[1]);
}

function normalize(value) {
  return value.replace(/\s+/gu, " ").trim();
}

const docs = readRequired(docsPath);
const contract = readRequired(contractPath);

test("historical scaffold scope remains exact while export proofs are aligned", () => {
  const proofText = readRequired(proofPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const scope = sectionBetween(
    docs,
    "## 13. Exact Current Docs-Only File Scope",
    "## 14. Non-Interference And Final No-Conclusion Boundary",
  );

  assert.deepEqual(numberedBacktickValues(scope), [docsPath, proofPath]);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_DOC_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_FOCUSED_PROOF_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_SCHEMA_FILE_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_PACKAGE_EXPORT_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_RUNTIME_FILE_COUNT:\n0/u);
  assert.equal(fs.existsSync(absolute(packageIndexPath)), true);
  readRequired(proofTransitionPath);

  for (const siblingPath of laterSiblingPaths) {
    assert.equal(docs.includes(`\`${siblingPath}\``), true, siblingPath);
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
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n8/u,
  );
  assert.match(
    packageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n7/u,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.deepEqual(
    retainedPackageAndValidatorSiblingPaths,
    laterSiblingPaths.slice(2),
  );
  assert.deepEqual(
    retainedValidatorSiblingPaths,
    laterSiblingPaths.slice(4),
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
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
      packageExportTransitionText.includes("`" + retainedSiblingPath + "`"),
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
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
});

test("canonical contract sources and representation precedents are tracked without semantic import", () => {
  for (const sourcePath of [...canonicalSourcePaths, ...precedentPaths]) {
    readRequired(sourcePath);
    assert.equal(docs.includes(`\`${sourcePath}\``), true, sourcePath);
  }
  assert.match(
    docs,
    /The precedent group supplies only draft, local schema identity/u,
  );
  assert.match(docs, /It does not supply\ndecision-basis fields/u);
  assert.match(docs, /No chat output, handoff text, local memory/u);
});

test("controlling approval and six subject-family schemas directly support the frozen representation", () => {
  const approvalSchema = readJsonRequired(approvalSchemaPath);
  const contractRoot = sectionBetween(
    contract,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5. Candidate Cardinality, Order, Identity, And Immutability",
  );

  assert.deepEqual(numberedBacktickValues(contractRoot), rootFields);
  assert.deepEqual(approvalSchema.properties.decision.enum, [
    "HUMAN_PROFESSIONAL_GATE_APPROVED",
    "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
    "HUMAN_PROFESSIONAL_GATE_REJECTED",
  ]);
  assert.deepEqual(
    approvalSchema.$defs.reviewerAttribution.properties.reviewer_role.enum,
    ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"],
  );
  assert.equal(
    approvalSchema.$defs.decisionSupport.properties.decision_basis_refs.items
      .pattern,
    "^rvb_[a-z0-9][a-z0-9_-]{0,59}$",
  );

  for (const binding of subjectSchemaBindings) {
    const schema = readJsonRequired(binding.schemaPath);
    const collection = schema.properties[binding.collectionField];
    const itemDefinition = schema.$defs[binding.definitionField];

    assert.equal(collection.type, "array", binding.collectionField);
    assert.equal(
      collection.items.$ref,
      `#/$defs/${binding.definitionField}`,
      binding.collectionField,
    );
    assert.equal(
      itemDefinition.required.includes(binding.referenceField),
      true,
      binding.referenceField,
    );
    assert.deepEqual(itemDefinition.properties[binding.referenceField], {
      type: "string",
      pattern: binding.pattern,
    });
  }
});

test("all nine Owner selections resolve to one exact schema-scaffold matrix", () => {
  const stages = sectionBetween(
    docs,
    "## 3. Nine Resolved Scaffold-Scope Questions",
    "## 4. Exact Future Candidate Files",
  );

  assert.deepEqual(tableLines(stages), expectedStageTable);
  for (let stage = 1; stage <= 9; stage += 1) {
    assert.match(docs, new RegExp(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`, "u"));
  }
  assert.match(docs, /OWNER_SELECTED_NINE_STAGE_SCHEMA_SCAFFOLD_SCOPE_TRANSLATED/u);
  assert.match(stages, /OWNER_SELECTED_STAGE_COUNT:\n9/u);
  assert.match(stages, /OPEN_SCHEMA_SCAFFOLD_SCOPE_DECISION_COUNT:\n0/u);
});

test("future candidate paths identity and root keyword order are exact reservations", () => {
  const candidates = sectionBetween(
    docs,
    "## 4. Exact Future Candidate Files",
    "## 5. Exact Future Schema Identity",
  );
  const identity = sectionBetween(
    docs,
    "## 5. Exact Future Schema Identity",
    "## 6. Exact Future Flat Root Scaffold",
  );

  assert.deepEqual(numberedBacktickValues(candidates), candidatePaths);
  assert.match(candidates, /FUTURE_SCHEMA_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(candidates, /`packages\/schemas\/src\/index\.js` remains unchanged/u);
  assert.deepEqual(tableLines(identity), expectedIdentityTable);
  assert.deepEqual(numberedBacktickValues(identity), rootKeywords);
  assert.match(identity, /FUTURE_SCHEMA_IDENTITY_KEYWORD_COUNT:\n5/u);
  assert.match(identity, /FUTURE_SCHEMA_ROOT_KEYWORD_COUNT:\n8/u);
});

test("future root is the exact flat closed sixteen-field scalar scaffold", () => {
  const root = sectionBetween(
    docs,
    "## 6. Exact Future Flat Root Scaffold",
    "## 7. Exact Six-Branch Subject Kind And Reference Mapping",
  );
  const lifecycleMatch = root.match(
    /The future `basis_lifecycle_posture` schema must be exactly:\n\n`([^`\n]+)`/u,
  );

  assert.deepEqual(numberedBacktickValues(root), rootFields);
  assert.deepEqual(tableLines(root), expectedFieldTable);
  assert.notEqual(lifecycleMatch, null);
  assert.deepEqual(JSON.parse(lifecycleMatch[1]), expectedLifecycleEncoding);
  assert.match(root, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n16/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_REQUIRED_COUNT:\n16/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_OPTIONAL_FIELD_COUNT:\n0/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_ADDITIONAL_PROPERTIES:\nFALSE/u);
  assert.match(root, /FUTURE_SCHEMA_LOCAL_DEFINITION_COUNT:\n0/u);
  assert.match(root, /Every field is required and scalar/u);
});

test("six ordered allOf branches exactly bind each kind to its canonical reference pattern", () => {
  const conditional = sectionBetween(
    docs,
    "## 7. Exact Six-Branch Subject Kind And Reference Mapping",
    "## 8. Exact Generic Opaque-Reference Encoding",
  );

  assert.deepEqual(jsonCodeBlock(conditional), expectedConditionalBranches);
  assert.match(conditional, /FUTURE_SCHEMA_ROOT_ALLOF_BRANCH_COUNT:\n6/u);
  assert.match(conditional, /FUTURE_SCHEMA_KIND_REFERENCE_IF_COUNT:\n6/u);
  assert.match(conditional, /FUTURE_SCHEMA_KIND_REFERENCE_THEN_COUNT:\n6/u);
  assert.match(conditional, /FUTURE_SCHEMA_KIND_REFERENCE_ELSE_COUNT:\n0/u);
  assert.match(
    conditional,
    /FUTURE_SCHEMA_KIND_REFERENCE_REQUIRED_GUARD_COUNT:\n6/u,
  );
  assert.match(conditional, /exactly one branch selects the lexical reference\npattern/u);
  assert.match(conditional, /does not\nprove subject existence/u);
  assert.equal(jsonCodeBlock(conditional).some((branch) => "else" in branch), false);
});

test("two generic references share one exact eight-branch negative encoding", () => {
  const opaque = sectionBetween(
    docs,
    "## 8. Exact Generic Opaque-Reference Encoding",
    "## 9. Schema, Validator, And Checkpoint Partition",
  );

  assert.deepEqual(numberedBacktickValues(opaque), [
    "binding_issuer_ref",
    "binding_provenance_ref",
  ]);
  assert.deepEqual(jsonCodeBlock(opaque), expectedOpaqueReferenceEncoding);
  assert.match(opaque, /GENERIC_OPAQUE_REFERENCE_SCHEMA_FIELD_COUNT:\n2/u);
  assert.match(opaque, /GENERIC_OPAQUE_REFERENCE_NOT_ANYOF_BRANCH_COUNT:\n8/u);
  assert.match(opaque, /GENERIC_OPAQUE_REFERENCE_PROHIBITED_DOT_VALUE_COUNT:\n2/u);
  assert.match(
    opaque,
    /GENERIC_OPAQUE_REFERENCE_PROHIBITED_SCHEME_PREFIX_COUNT:\n7/u,
  );
  assert.match(opaque, /GENERIC_OPAQUE_REFERENCE_FORMAT_KEYWORD_COUNT:\n0/u);
  assert.equal(opaque.includes('"format"'), false);
});

test("schema validator and checkpoint responsibilities are completely partitioned", () => {
  const partition = sectionBetween(
    docs,
    "## 9. Schema, Validator, And Checkpoint Partition",
    "## 10. Exact Future Focused Proof Scope",
  );
  const allowed = sectionBetween(
    partition,
    "The future schema may enforce only:",
    "The future schema must not claim to enforce:",
  );
  const prohibited = sectionBetween(
    partition,
    "The future schema must not claim to enforce:",
    "PAIRWISE_REFERENCE_DISTINCTNESS_IN_JSON_SCHEMA:",
  );

  assert.deepEqual(numberedItems(allowed), expectedAllowedSchemaClaims);
  assert.deepEqual(numberedItems(prohibited), expectedProhibitedSchemaClaims);
  for (const marker of [
    "PAIRWISE_REFERENCE_DISTINCTNESS_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "OUTER_CROSS_REFERENCE_EQUALITY_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "CANDIDATE_SET_COMPLETENESS_ORDER_AND_UNIQUENESS_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "SAME_CALL_SUBJECT_MEMBERSHIP_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "SUBJECT_TRUTH_RELEVANCE_SUPPORT_OR_SUFFICIENCY_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "TRUSTED_TIME_CURRENTNESS_OR_REPLACEMENT_IN_JSON_SCHEMA:\nNOT_ENFORCED",
    "EXTERNAL_DEPENDENCY_CANDIDATES_EMBEDDED_IN_WRAPPER_SCHEMA:\nNO",
    "IDENTITY_ROLE_AUTHORITY_OR_ADMISSIBILITY_IN_WRAPPER_SCHEMA:\nNO",
  ]) {
    assert.equal(partition.includes(marker), true, marker);
  }
});

test("future focused proof is exactly fifteen bounded assertion families", () => {
  const proofScope = sectionBetween(
    docs,
    "## 10. Exact Future Focused Proof Scope",
    "## 11. Excluded Sibling And Downstream Surfaces",
  );
  const families = sectionBetween(
    proofScope,
    "The future focused schema proof must establish only:",
    "FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:",
  );

  assert.deepEqual(numberedItems(families), expectedProofFamilies);
  assert.match(proofScope, /FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:\n15/u);
  assert.match(proofScope, /JSON Schema does not enforce object-member\norder/u);
  assert.match(proofScope, /same-call subject membership, packet binding/u);
  assert.match(
    normalize(proofScope),
    /release readiness, or substantive candidate meaning/u
  );
});

test("six sibling references preserve the exact validator-result 2/4 live partition", () => {
  const excluded = sectionBetween(
    docs,
    "## 11. Excluded Sibling And Downstream Surfaces",
    "## 12. Proof-Transition Boundary",
  );
  const candidateSchemaSliceStatuses = [
    ...excluded.matchAll(
      /^([A-Z0-9_]+_IN_CANDIDATE_SCHEMA_SLICE):\n([A-Z0-9_]+)$/gmu,
    ),
  ].map((match) => [match[1], match[2]]);

  assert.deepEqual(numberedBacktickValues(excluded), laterSiblingPaths);
  assert.deepEqual(
    candidateSchemaSliceStatuses,
    expectedCandidateSchemaSliceStatuses,
  );
  assert.match(excluded, /LATER_SIBLING_PATH_COUNT:\n6/u);
  assert.match(excluded, /CURRENT_LIVE_ABSENT_LATER_SIBLING_PATH_COUNT:\n6/u);
  assert.match(excluded, /FUTURE_SCHEMA_CANDIDATE_PATH_COUNT:\n2/u);
  assert.match(excluded, /FUTURE_RETAINED_ABSENT_SIBLING_PATH_COUNT:\n6/u);
  assert.match(excluded, /CURRENT_ABSENT_CANDIDATE_AND_SIBLING_PATH_COUNT:\n8/u);
  assert.match(excluded, /`packages\/schemas\/src\/index\.js`/u);
  assert.match(excluded, /Unnamed downstream paths are neither guessed nor reserved/u);
  assert.equal(
    normalize(excluded).includes(
      "The future two-file schema slice may create only the two candidate paths in Section 4 after the proof-transition prerequisite. It must not create or modify any of the six later sibling paths above",
    ),
    true,
  );

  for (const siblingPath of laterSiblingPaths) {
    assert.equal(excluded.includes(`\`${siblingPath}\``), true, siblingPath);
  }
});

test("proof transition releases only two candidate paths and retains six sibling absences", () => {
  const proofText = readRequired(proofPath);
  const proofTransitionText = readRequired(proofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const transition = sectionBetween(
    docs,
    "## 12. Proof-Transition Boundary",
    "## 13. Exact Current Docs-Only File Scope",
  );
  const transitionSources = sectionBetween(
    proofTransitionText,
    "## 2. Canonical Sources And Transition Precedent",
    "## 3. Exact Historical And Current Conflict Classification",
  );
  const classification = sectionBetween(
    proofTransitionText,
    "## 3. Exact Historical And Current Conflict Classification",
    "## 4. Exact Prerequisite Self-Path Transition",
  );
  const selfTransition = sectionBetween(
    proofTransitionText,
    "## 4. Exact Prerequisite Self-Path Transition",
    "## 5. Two Candidate Paths Released From Perpetual Live Absence",
  );
  const candidateTransition = sectionBetween(
    proofTransitionText,
    "## 5. Two Candidate Paths Released From Perpetual Live Absence",
    "## 6. Six Retained Live Absence Requirements",
  );
  const siblingTransition = sectionBetween(
    proofTransitionText,
    "## 6. Six Retained Live Absence Requirements",
    "## 7. Exact Scaffold-Proof Transition",
  );
  const proofSteps = sectionBetween(
    proofTransitionText,
    "## 7. Exact Scaffold-Proof Transition",
    "## 8. Exact Current Two-File Slice",
  );
  const currentScope = sectionBetween(
    proofTransitionText,
    "## 8. Exact Current Two-File Slice",
    "## 9. Separate Later Candidate-Schema Slice",
  );
  const laterSlice = sectionBetween(
    proofTransitionText,
    "## 9. Separate Later Candidate-Schema Slice",
    "## 10. Non-Interference And Proof Boundary",
  );
  const nonInterference = sectionBetween(
    proofTransitionText,
    "## 10. Non-Interference And Proof Boundary",
    "## 11. Final No-Conclusion Boundary",
  );
  const finalBoundary = sectionBetween(
    proofTransitionText,
    "## 11. Final No-Conclusion Boundary",
  );
  const finalParagraph = sectionBetween(
    finalBoundary,
    "This proof-transition prerequisite is not",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:",
  );
  const exactTransitionSourcePaths = [
    contractPath,
    docsPath,
    proofPath,
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
    "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  ];

  assert.deepEqual(bulletBacktickValues(transition), [proofTransitionPath]);
  assert.match(transition, /CANDIDATE_SCHEMA_PATH_COUNT:\n2/u);
  assert.match(transition, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(transition, /PROOF_TRANSITION_PREREQUISITE_STATUS:\nNOT_CREATED/u);
  assert.equal(
    normalize(transition).includes(
      "Before either candidate schema path may be created, a separate docs-only proof-transition prerequisite must release only the two candidate paths from this focused proof's live absence checks while retaining all six later sibling live-absence assertions.",
    ),
    true,
  );
  assert.match(transition, /does not authorize schema creation, package export/u);
  assert.match(transition, /relevance, sufficiency, admissibility, approval effect/u);
  for (const marker of [
    "HISTORICAL_SCAFFOLD_ABSENCE_MARKERS_PRESERVED",
    "PROOF_TRANSITION_DOCUMENT_SELF_ABSENCE_ASSERTION_REMOVED",
    "TWO_CANDIDATE_SCHEMA_PATH_LIVE_ABSENCE_ASSERTIONS_RELEASED",
    "SIX_LATER_SIBLING_PATH_LIVE_ABSENCE_ASSERTIONS_RETAINED",
    "ZERO_REMAINING_CANDIDATE_PATH_PROOF_ALIGNMENTS",
    "EXACT_TWO_FILE_PREREQUISITE_SCOPE_DEFINED",
    "SCHEMA_FILE_NOT_CREATED_BY_THIS_SLICE",
    "SCHEMA_PROOF_NOT_CREATED_BY_THIS_SLICE",
    "PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(proofTransitionText.includes(marker), true, marker);
  }
  assert.deepEqual(
    bulletBacktickValues(transitionSources),
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
  assert.deepEqual(bulletBacktickValues(selfTransition), [proofTransitionPath]);
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
  assert.deepEqual(numberedItems(proofSteps), [
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
  assert.deepEqual(numberedBacktickValues(laterSlice), candidatePaths);
  assert.match(laterSlice, /LATER_CANDIDATE_SCHEMA_FILE_COUNT:\n2/u);
  assert.deepEqual(bulletItems(nonInterference), [
    "preserve every historical contract and scaffold document marker",
    "preserve both reserved candidate paths and all six later sibling paths",
    "transition only this prerequisite's self path and the two candidate live absence assertions",
    "retain all six later sibling live absence assertions",
    "create no schema or schema proof in this prerequisite slice",
    "create no package export, validator-result schema, validator, checkpoint, subject lookup, session verifier, identity verifier, role verifier, authority verifier, trusted-time or currentness evaluator, relevance or sufficiency evaluator, admissibility evaluator, persistence, API, UI, or runtime",
    "inspect or process no raw, private, source, case, credential, provider, decision-basis, session, reviewer, or real-evidence material",
    "create no subject existence, subject truth, reviewer or session identity, role, authority, approval, relevance, support, sufficiency, probative value, admissibility, finding, score, conclusion, certification, readiness, or external-use claim",
    "preserve human and professional review as release gates",
  ]);
  assert.equal(
    normalize(finalParagraph),
    "This proof-transition prerequisite is not schema correctness, validator correctness, subject verification, source verification, session verification, identity verification, role verification, authority verification, trusted-time verification, currentness verification, relevance assessment, support assessment, sufficiency assessment, probative-value assessment, admissibility assessment, actual human review, professional review, legal review, evidentiary review, technical review, legal advice, professional approval, approval effect, technical sign-off, release approval, product or external-use authorization, compliance certification, ownership determination, credibility assessment, source-truth conclusion, subject-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation-readiness, governance approval, handoff approval, case-truth conclusion, or real-evidence review.",
  );
  assert.match(
    proofTransitionText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    proofTransitionText,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_CANDIDATE_SCHEMA_CONTRACT_ONLY_SLICE/u,
  );
  assert.equal(
    proofText.includes("fs." + "existsSync(absolute(futurePath))"),
    false,
  );
  assert.equal(
    proofText.includes("fs." + "existsSync(absolute(candidatePath))"),
    false,
  );
  assert.equal(
    proofText.includes("fs." + "existsSync(absolute(proofTransitionPath))"),
    false,
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
      `| 2 | \`${proofPath}\` | preserve candidate-schema scaffold history and four sibling absences; align only the two validator-result candidate paths |`,
    ),
    true,
  );
  assert.match(
    validatorResultTransitionText,
    /TWO_VALIDATOR_RESULT_SCHEMA_CANDIDATE_PATH_ASSERTIONS_NARROWED_IN_SCAFFOLD_SCOPE_PROOF/u,
  );
  assert.match(
    validatorResultTransitionText,
    /FIVE_ADDITIONAL_PROOF_ALIGNMENTS_REMAIN_REQUIRED/u,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(validatorResultCandidatePath))",
    ),
    false,
  );
});

test("non-interference proof limits and final no-conclusion boundary are exact", () => {
  const boundary = sectionBetween(
    docs,
    "## 14. Non-Interference And Final No-Conclusion Boundary",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_STATUS:",
  );
  const nonInterference = sectionBetween(
    boundary,
    "This slice must:",
    "NON_INTERFERENCE_RULE_COUNT:",
  );
  const proofClaims = sectionBetween(
    boundary,
    "The focused proof for this docs-only slice may establish only that:",
    "It cannot prove",
  );
  const cannotStart = boundary.indexOf("It cannot prove");
  const cannotEnd = boundary.indexOf("\n\nSCHEMA_CREATED_BY_THIS_SLICE:");
  const finalStart = boundary.indexOf("This boundary is not");

  assert.deepEqual(numberedItems(nonInterference), expectedNonInterferenceItems);
  assert.match(boundary, /NON_INTERFERENCE_RULE_COUNT:\n8/u);
  assert.deepEqual(numberedItems(proofClaims), expectedCurrentProofClaims);
  assert.notEqual(cannotStart, -1);
  assert.notEqual(cannotEnd, -1);
  assert.equal(
    normalize(boundary.slice(cannotStart, cannotEnd)),
    expectedProofCannotEstablish,
  );
  for (const marker of [
    "SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "PACKAGE_EXPORT_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_RESULT_SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_OR_CHECKPOINT_CREATED_BY_THIS_SLICE:\nNO",
    "RUNTIME_BEHAVIOR_CREATED_BY_THIS_SLICE:\nNO",
  ]) {
    assert.equal(boundary.includes(marker), true, marker);
  }
  assert.notEqual(finalStart, -1);
  assert.equal(
    normalize(boundary.slice(finalStart)),
    expectedFinalNoConclusion,
  );
  assert.match(
    docs,
    /TRACKED_DOCS_ONLY_EXACT_TWO_FILE_FUTURE_SCHEMA_SCOPE_FROZEN/u,
  );
  assert.match(
    docs,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_DECISION_BASIS_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE/u,
  );
});
