"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const comparisonPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence.json",
  "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema.test.js",
  "packages/schemas/src/index.js",
];
const candidatePaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-schema.test.js",
];
const laterSiblingPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
];
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultCandidatePaths = laterSiblingPaths.slice(0, 2);
const retainedPackageAndValidatorSiblingPaths = laterSiblingPaths.slice(2);
const candidatePackageExportProofPath =
  retainedPackageAndValidatorSiblingPaths[0];
const validatorResultPackageExportProofPath = laterSiblingPaths[3];
const retainedValidatorSiblingPaths = laterSiblingPaths.slice(4);
const rootFields = [
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
const genericFields = ["binding_issuer_ref", "binding_provenance_ref"];
const expectedStageTable = [
  "| Stage | Selected option | Frozen scope answer |",
  "| --- | --- | --- |",
  "| 1 | `OPTION_A` | the future CONTRACT_ONLY candidate is exactly one schema path and one focused schema-test path; package export, validator-result schema, and validator remain excluded |",
  "| 2 | `OPTION_A` | draft 2020-12, one exact local `$id`, and one exact scaffold title are selected |",
  "| 3 | `OPTION_A` | one flat closed root uses all fifteen required fields in contract order; no `$defs`, nested object, array, optional field, or extension field is selected |",
  "| 4 | `OPTION_A` | exact schema-expressible const, pattern, enum, string, and boolean rules are selected for all fifteen fields |",
  "| 5 | `OPTION_A` | each of two generic opaque-reference fields duplicates one exact base pattern plus one exact eight-branch negative rule; no `format` or network resolution is selected |",
  "| 6 | `OPTION_A` | JSON Schema owns wrapper representation only; distinctness, external equality, same-call behavior, immutability, descriptor safety, reviewer and session bindings, attestation occurrence, signature validity, issuer trust, trusted time, currentness, lifecycle truth, authority, admissibility, and approval effect remain validator or checkpoint concerns |",
  "| 7 | `OPTION_A` | exactly fourteen focused proof families are selected, including positive, negative, metadata, partition, and absence assertions |",
  "| 8 | `OPTION_A` | `packages/schemas/src/index.js` remains unchanged and exactly six later sibling paths remain absent; unnamed downstream paths are neither guessed nor reserved |",
  "| 9 | `OPTION_A` | the current slice is exactly one boundary document and one focused doc-freeze test; one exact future proof-transition prerequisite path is reserved but not created |",
];
const expectedIdentityTable = [
  "| Keyword | Exact value |",
  "| --- | --- |",
  "| `$schema` | `https://json-schema.org/draft/2020-12/schema` |",
  "| `$id` | `https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence.json` |",
  "| `title` | `Human Review Controlled Handoff Human/Professional Approval Decision Attestation Evidence Contract Scaffold` |",
  "| root `type` | `object` |",
  "| root `additionalProperties` | `false` |",
];
const expectedFieldTable = [
  "| Field | Exact future schema encoding |",
  "| --- | --- |",
  '| `contract_id` | `{ "type": "string", "const": "human_review.controlled_handoff_human_professional_approval_decision_attestation_evidence" }` |',
  '| `contract_version` | `{ "type": "string", "const": "1.0.0" }` |',
  '| `decision_attestation_ref` | `{ "type": "string", "pattern": "^att_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
  '| `approval_ref` | `{ "type": "string", "pattern": "^apr_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
  '| `review_session_ref` | `{ "type": "string", "pattern": "^rvs_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
  '| `reviewer_ref` | `{ "type": "string", "pattern": "^rvr_[a-z0-9][a-z0-9_-]{0,59}$" }` |',
  '| `reviewer_role` | `{ "type": "string", "enum": ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"] }` |',
  '| `decision` | `{ "type": "string", "enum": ["HUMAN_PROFESSIONAL_GATE_APPROVED", "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED", "HUMAN_PROFESSIONAL_GATE_REJECTED"] }` |',
  "| `attested_at` | exact UTC-millisecond timestamp encoding from this section |",
  '| `attestation_posture` | `{ "type": "string", "const": "DECISION_ATTESTATION_CANDIDATE_ONLY" }` |',
  "| `binding_issuer_ref` | exact generic opaque-reference encoding from Section 7 |",
  "| `binding_provenance_ref` | exact generic opaque-reference encoding from Section 7 |",
  "| `attestation_lifecycle_posture` | exact three-value string enum from this section |",
  '| `verification_posture` | `{ "type": "string", "const": "NOT_VERIFIED_BY_CONTRACT" }` |',
  '| `human_professional_review_required` | `{ "type": "boolean", "const": true }` |',
];
const expectedAllowedSchemaClaims = [
  "one JSON object representation",
  "the exact fifteen required property names",
  "root closure through `additionalProperties: false`",
  "scalar JSON types",
  "exact const and enum values",
  "lexical namespace, timestamp, and opaque-reference patterns",
  "the exact negative opaque-reference branches in Section 7",
];
const expectedProhibitedSchemaClaims = [
  "pairwise distinctness across the six internal reference fields",
  "exact external equality against the approval, review-session, reviewer identity, reviewer role, or reviewer authority evidence candidates",
  "exactly-one same-call candidate cardinality, per-approval-attempt immutability, no-reuse posture, or current-record selection",
  "plain-object identity, own-data-property status, descriptor safety, accessor non-invocation, proxy handling, cycle handling, no mutation, or result freezing",
  "no lookup, dereference, discovery, registry access, cache access, persistence read, or network access",
  "attestation occurrence, reviewer authorship, signature existence or validity, issuer trust, provenance truth, or chain of custody",
  "time truth, clock accuracy, temporal order, lifecycle truth, freshness, currentness, conflict, replacement, or supersession",
  "reviewer identity, role assignment, qualification, authority, permission, approval admissibility, approval effect, handoff, export, delivery, release, or external use",
];
const expectedProofClaims = [
  "one exact valid fifteen-field candidate is structurally schema-valid",
  "schema draft, local identity, title, root type, and root closure are exact",
  "root `required` and `properties` contain exactly fifteen fields in documentation order and `$defs` is absent",
  "missing, additional, null, nested, array, and wrong-type field values are rejected",
  "contract identity, version, verification posture, human-review flag, namespace patterns, reviewer-role enum, approval-decision enum, attestation posture, lifecycle enum, and timestamp pattern are exact",
  "generic opaque-reference minimum, maximum, alphabet, and punctuation behavior follows the exact base pattern",
  "`.` and `..` are rejected by the exact negative rule",
  "all seven prohibited scheme prefixes are rejected under lowercase, uppercase, and mixed-case examples",
  "each of the two generic-reference fields carries the exact ordered eight-branch `not.anyOf` structure",
  "candidate property insertion order does not alter schema validity while documentation order remains exact",
  "equal values across the two generic-reference fields remain schema-valid, proving pairwise distinctness remains validator-only",
  "syntactically valid values remain schema-valid without same-call, external-equality, reviewer/session binding, attestation, signature, issuer-trust, trusted-time, currentness, lifecycle-truth, or admissibility claims",
  "package export, validator-result schema, validator, and all six sibling paths remain absent",
  "cross-reference, attestation verification, signature verification, session verification, identity verification, role verification, authority verification, trusted-time currentness, persistence, API, UI, and runtime behavior remain absent",
];
const expectedExcludedItems = [
  "`packages/schemas/src/index.js`",
  "`schemas/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result.json`",
  "`tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-schema.test.js`",
  "`tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-package-export.test.js`",
  "`tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator-result-package-export.test.js`",
  "`packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js`",
  "`tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js`",
  "any cross-reference, attestation-verification, signature-verification, issuer-trust, session-verification, identity-verification, role-assignment, professional-qualification, reviewer-authority, trusted-time, currentness, lifecycle, approval-admissibility, eligibility, persistence, audit, handoff/export, delivery, recipient, release, API, route, UI, provider, model, logging, telemetry, or runtime surface",
];
const expectedNonInterferenceItems = [
  "preserve the decision-attestation evidence contract boundary unchanged",
  "create no schema, package export, validator-result schema, validator, checkpoint, attestation verifier, signature verifier, issuer-trust verifier, session verifier, identity verifier, role verifier, authority verifier, trusted-time/currentness evaluator, persistence, API, UI, handoff/export gate, delivery, or runtime",
  "inspect or process no raw, private, source, case, signature, certificate, credential, provider, attestation, session, reviewer, or real-evidence material",
  "create no attestation occurrence, authorship, signature existence or validity, issuer trust, provenance truth, session identity, reviewer identity, qualification, role, authority, permission, trusted-time, currentness, approval, admissibility, eligibility, finding, score, severity, recommendation, conclusion, certification, product-readiness, or external-use claim",
  "preserve human and professional review as release gates",
];
const expectedFinalNoConclusion =
  "This scope boundary is not schema correctness, validator correctness, attestation verification, signature verification, certificate verification, credential verification, issuer-trust verification, provenance verification, session verification, identity verification, authorship verification, role verification, authority verification, trusted-time verification, currentness verification, actual human review, professional review, legal review, evidentiary review, legal advice, technical sign-off, release approval, product or external-use authorization, compliance certification, ownership determination, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation readiness, governance approval, handoff approval, case-truth conclusion, or real-evidence review.";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
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

function exactNumberedCodeValues(section) {
  return [...section.matchAll(/^\d+\. `([^`]+)`$/gmu)].map(
    (match) => match[1],
  );
}

function exactNumberedLines(section) {
  return [...section.matchAll(/^\d+\. (.+)$/gmu)].map((match) => match[1]);
}

function tableLines(section) {
  return section.split("\n").filter((line) => line.startsWith("|"));
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

test("canonical contract and representation precedents are tracked without semantic import", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [contractPath, ...comparisonPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }
  assert.match(
    docsText,
    /Comparison evidence controls only repository-native draft 2020-12/u,
  );
  assert.match(docsText, /does not\nimport another contract's fields/u);
  assert.match(docsText, /No chat output, handoff text, local memory/u);
});

test("all nine owner selections resolve to one exact docs-only scaffold boundary", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 3. Nine Resolved Scaffold-Scope Questions",
    "## 4.",
  );

  assert.deepEqual(tableLines(section), expectedStageTable);
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
  assert.deepEqual(tableLines(identity), expectedIdentityTable);
  assert.match(identity, /FUTURE_SCHEMA_IDENTITY_KEYWORD_COUNT:\n5/u);
});

test("future root is the exact flat closed fifteen-field scalar scaffold", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 6. Exact Future Flat Root Scaffold",
    "## 7.",
  );

  assert.deepEqual(exactNumberedCodeValues(section), rootFields);
  assert.deepEqual(tableLines(section), expectedFieldTable);
  assert.match(
    section,
    /\["DECISION_ATTESTATION_DECLARED_ACTIVE", "DECISION_ATTESTATION_DECLARED_INACTIVE", "DECISION_ATTESTATION_DECLARED_REVOKED"\]/u,
  );
  assert.match(
    section,
    /The future `attested_at` schema must be exactly:\n\n`\{ "type": "string", "pattern": "[^`]+" \}`/u,
  );
  assert.match(section, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n15/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_REQUIRED_COUNT:\n15/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_OPTIONAL_FIELD_COUNT:\n0/u);
  assert.match(section, /FUTURE_SCHEMA_ROOT_ADDITIONAL_PROPERTIES:\nFALSE/u);
  assert.match(section, /FUTURE_SCHEMA_LOCAL_DEFINITION_COUNT:\n0/u);
  assert.match(section, /Every field is required and scalar/u);
});

test("two generic references share one exact eight-branch negative encoding", () => {
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
  assert.deepEqual(Object.keys(encoding), ["type", "pattern", "not"]);
  assert.equal(encoding.type, "string");
  assert.equal(encoding.pattern, "^[A-Za-z0-9._:-]{1,128}$");
  assert.deepEqual(encoding.not.anyOf, [
    { enum: [".", ".."] },
    { pattern: "^[Hh][Tt][Tt][Pp]:" },
    { pattern: "^[Hh][Tt][Tt][Pp][Ss]:" },
    { pattern: "^[Ff][Tt][Pp]:" },
    { pattern: "^[Ff][Ii][Ll][Ee]:" },
    { pattern: "^[Mm][Aa][Ii][Ll][Tt][Oo]:" },
    { pattern: "^[Dd][Aa][Tt][Aa]:" },
    { pattern: "^[Jj][Aa][Vv][Aa][Ss][Cc][Rr][Ii][Pp][Tt]:" },
  ]);
  assert.match(section, /GENERIC_OPAQUE_REFERENCE_SCHEMA_FIELD_COUNT:\n2/u);
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

  assert.deepEqual(exactNumberedLines(allowed), expectedAllowedSchemaClaims);
  assert.deepEqual(
    exactNumberedLines(prohibited),
    expectedProhibitedSchemaClaims,
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
    assert.equal(section.includes(marker), true, marker);
  }
});

test("future focused proof is exactly fourteen bounded assertion families", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 9. Exact Future Focused Proof Scope",
    "## 10.",
  );

  assert.deepEqual(exactNumberedLines(section), expectedProofClaims);
  assert.match(
    section,
    /FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:\n14/u,
  );
  assert.equal(
    normalizeWhitespace(
      sectionBetween(section, "The proof must explicitly state that"),
    ),
    "The proof must explicitly state that JSON Schema does not enforce object-member order, plain-object or accessor behavior, reference distinctness, external reference equality, reviewer or session relationship validity, same-call cardinality, immutability, no-reuse posture, lookup absence, attestation occurrence, authorship, signature validity, issuer trust, trusted time, lifecycle truth, currentness, approval effect, release readiness, or substantive candidate meaning.",
  );
});

test("contract truth supports the selected schema representation without expansion", () => {
  const contractText = readRequired(contractPath);
  const docsText = readRequired(docsPath);
  const contractRoot = sectionBetween(
    contractText,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5.",
  );
  const approvalDecision = sectionBetween(
    contractText,
    "## 6. Exact Approval And Decision Binding",
    "## 7.",
  );
  const reviewer = sectionBetween(
    contractText,
    "## 7. Exact Reviewer And Review-Session Binding",
    "## 8.",
  );
  const attestedTime = sectionBetween(
    contractText,
    "## 8. Exact Attestation Time And Temporal Separation",
    "## 9.",
  );
  const posture = sectionBetween(
    contractText,
    "## 9. Attestation Posture And Prohibited Material",
    "## 10.",
  );
  const generic = sectionBetween(
    contractText,
    "## 10. Binding Issuer, Provenance, And Opaque References",
    "## 11.",
  );
  const lifecycle = sectionBetween(
    contractText,
    "## 11. Declared Attestation Lifecycle",
    "## 12.",
  );
  const scaffoldRoot = sectionBetween(
    docsText,
    "## 6. Exact Future Flat Root Scaffold",
    "## 7.",
  );
  const scaffoldGeneric = sectionBetween(
    docsText,
    "## 7. Exact Generic Opaque-Reference Encoding",
    "## 8.",
  );
  const contractFields = fieldTable(contractRoot);
  const scaffoldFields = fieldTable(scaffoldRoot);
  const genericPattern = generic.match(
    /Each is a string of 1 through 128 characters matching:\n\n`([^`]+)`/u,
  );
  const genericJson = scaffoldGeneric.match(/```json\n([\s\S]*?)\n```/u);
  const lifecycleJson = scaffoldRoot.match(
    /The future `attestation_lifecycle_posture` schema must be exactly:\n\n(`[^`\n]+`)/u,
  );
  const attestedAtJson = scaffoldRoot.match(
    /The future `attested_at` schema must be exactly:\n\n(`[^`\n]+`)/u,
  );
  const attestedAtPattern = attestedTime.match(
    /`attested_at` is a string matching this exact lexical UTC-millisecond form:\n\n`([^`]+)`/u,
  );

  assert.deepEqual(exactNumberedCodeValues(contractRoot), rootFields);
  assert.deepEqual([...contractFields.keys()], rootFields);
  assert.deepEqual([...scaffoldFields.keys()], rootFields);
  assert.equal(
    inlineJson(scaffoldFields.get("contract_id")).const,
    markerValue(contractRoot, "CONTRACT_ID"),
  );
  assert.equal(
    inlineJson(scaffoldFields.get("contract_version")).const,
    markerValue(contractRoot, "CONTRACT_VERSION"),
  );
  for (const field of [
    "decision_attestation_ref",
    "approval_ref",
    "review_session_ref",
    "reviewer_ref",
  ]) {
    const contractPattern = contractFields.get(field).match(/matching `([^`]+)`/u);

    assert.notEqual(contractPattern, null, field);
    assert.equal(
      inlineJson(scaffoldFields.get(field)).pattern,
      contractPattern[1],
      field,
    );
  }
  assert.deepEqual(
    inlineJson(scaffoldFields.get("decision")).enum,
    exactNumberedCodeValues(
      sectionBetween(
        approvalDecision,
        "The exact decision values in canonical order are:",
        "DECISION_ENUM_COUNT:",
      ),
    ),
  );
  assert.deepEqual(
    inlineJson(scaffoldFields.get("reviewer_role")).enum,
    exactNumberedCodeValues(
      sectionBetween(
        reviewer,
        "The exact reviewer-role values in canonical order are:",
        "REVIEWER_ROLE_VALUE_COUNT:",
      ),
    ),
  );
  assert.notEqual(attestedAtJson, null);
  assert.notEqual(attestedAtPattern, null);
  assert.equal(
    inlineJson(attestedAtJson[1]).pattern,
    attestedAtPattern[1],
  );
  assert.equal(
    inlineJson(scaffoldFields.get("attestation_posture")).const,
    markerValue(posture, "ATTESTATION_POSTURE_VALUE"),
  );
  assert.deepEqual(
    exactNumberedCodeValues(
      sectionBetween(
        generic,
        "The two generic-style references are:",
        "Each is a string",
      ),
    ),
    genericFields,
  );
  for (const field of genericFields) {
    assert.equal(
      scaffoldFields.get(field),
      "exact generic opaque-reference encoding from Section 7",
      field,
    );
  }
  assert.notEqual(genericPattern, null);
  assert.notEqual(genericJson, null);
  assert.equal(JSON.parse(genericJson[1]).pattern, genericPattern[1]);
  assert.notEqual(lifecycleJson, null);
  assert.deepEqual(
    inlineJson(lifecycleJson[1]).enum,
    exactNumberedCodeValues(
      sectionBetween(
        lifecycle,
        "`attestation_lifecycle_posture` has exactly these values in canonical order:",
        "ATTESTATION_LIFECYCLE_POSTURE_COUNT:",
      ),
    ),
  );
  assert.equal(
    inlineJson(scaffoldFields.get("verification_posture")).const,
    "NOT_VERIFIED_BY_CONTRACT",
  );
  assert.equal(
    inlineJson(scaffoldFields.get("human_professional_review_required")).const,
    true,
  );
});

test("historical siblings preserve validator-result posture while export proofs are aligned", () => {
  const docsText = readRequired(docsPath);
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
  const excluded = sectionBetween(
    docsText,
    "## 10. Excluded Sibling And Downstream Surfaces",
    "## 11.",
  );

  assert.deepEqual(bulletItems(excluded), expectedExcludedItems);
  assert.match(excluded, /LATER_SIBLING_PATH_COUNT:\n6/u);
  for (const siblingPath of laterSiblingPaths) {
    assert.equal(excluded.includes(`\`${siblingPath}\``), true, siblingPath);
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
  assert.equal(fs.existsSync(absolute("packages/schemas/src/index.js")), true);
  for (const marker of [
    "PACKAGE_EXPORT_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "VALIDATOR_RESULT_SCHEMA_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "STRUCTURAL_VALIDATOR_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "CROSS_REFERENCE_ADMISSIBILITY_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "ATTESTATION_SIGNATURE_AND_ISSUER_TRUST_VERIFICATION_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "REVIEW_SESSION_IDENTITY_ROLE_AUTHORITY_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "TRUSTED_TIME_CURRENTNESS_AND_REPLACEMENT_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
    "HANDOFF_EXPORT_DELIVERY_RELEASE_IN_CANDIDATE_SCHEMA_SLICE:\nEXCLUDED",
  ]) {
    assert.equal(excluded.includes(marker), true, marker);
  }
});

test("proof transition releases only candidate paths and retains six sibling absences", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);
  const proofTransitionText = readRequired(proofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const transition = sectionBetween(
    docsText,
    "## 11. Proof-Transition Boundary",
    "## 12.",
  );
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
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:",
  );

  assert.deepEqual(bulletItems(transition), [`\`${proofTransitionPath}\``]);
  assert.match(transition, /CANDIDATE_SCHEMA_PATH_COUNT:\n2/u);
  assert.match(transition, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(transition, /PROOF_TRANSITION_PREREQUISITE_STATUS:\nNOT_CREATED/u);
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
  const exactTransitionSourcePaths = [
    contractPath,
    docsPath,
    proofPath,
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
    "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
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
    "create no package export, validator-result schema, validator, checkpoint, attestation verifier, signature verifier, issuer-trust verifier, session verifier, identity verifier, role verifier, authority verifier, trusted-time or currentness evaluator, persistence, API, UI, or runtime",
    "inspect or process no raw, private, source, case, signature, certificate, credential, provider, attestation, session, reviewer, or real-evidence material",
    "create no attestation occurrence, authorship, signature existence or validity, issuer trust, provenance truth, session identity, reviewer identity, role, authority, approval, admissibility, finding, score, conclusion, certification, readiness, or external-use claim",
    "preserve human and professional review as release gates",
  ]);
  assert.equal(
    normalizeWhitespace(finalParagraph),
    "This proof-transition prerequisite is not schema correctness, validator correctness, attestation verification, signature verification, certificate verification, credential verification, issuer-trust verification, provenance verification, session verification, identity verification, authorship verification, role verification, authority verification, trusted-time verification, currentness verification, actual human review, professional review, legal review, evidentiary review, technical review, legal advice, professional approval, technical sign-off, release approval, product or external-use authorization, compliance certification, ownership determination, credibility assessment, source-truth conclusion, identity-truth conclusion, authorship-truth conclusion, chain-of-custody proof, runtime verification, security approval, deployment readiness, implementation-readiness, governance approval, handoff approval, case-truth conclusion, or real-evidence review.",
  );
  assert.match(
    proofTransitionText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    proofTransitionText,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_CANDIDATE_SCHEMA_CONTRACT_ONLY_SLICE/u,
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
});

test("current two-file scope non-interference and final no-conclusion boundary are exact", () => {
  const docsText = readRequired(docsPath);
  const scope = sectionBetween(
    docsText,
    "## 12. Exact Current Docs-Only File Scope",
    "## 13.",
  );
  const boundary = sectionBetween(
    docsText,
    "## 13. Non-Interference And Final No-Conclusion Boundary",
  );

  assert.deepEqual(exactNumberedCodeValues(scope), [docsPath, proofPath]);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_DOC_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_FOCUSED_PROOF_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_SCHEMA_FILE_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_PACKAGE_EXPORT_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SCAFFOLD_SCOPE_RUNTIME_FILE_COUNT:\n0/u);
  assert.deepEqual(bulletItems(boundary), expectedNonInterferenceItems);
  assert.equal(
    normalizeWhitespace(
      sectionBetween(
        boundary,
        "This scope boundary is not schema correctness",
        "SCHEMA_CREATED_BY_THIS_SLICE:",
      ),
    ),
    expectedFinalNoConclusion,
  );
  for (const marker of [
    "SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "PACKAGE_EXPORT_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_RESULT_SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_OR_RUNTIME_CREATED_BY_THIS_SLICE:\nNO",
    "ATTESTATION_SIGNATURE_IDENTITY_AUTHORITY_CURRENTNESS_OR_APPROVAL_CREATED_BY_THIS_SLICE:\nNO",
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_ATTESTATION_EVIDENCE_SCHEMA_SCAFFOLD_SCOPE_STATUS:\nTRACKED_DOCS_ONLY_EXACT_TWO_FILE_FUTURE_SCHEMA_SCOPE_FROZEN",
    "FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_DECISION_ATTESTATION_EVIDENCE_SCHEMA_PROOF_TRANSITION_PREREQUISITE",
  ]) {
    assert.equal(boundary.includes(marker), true, marker);
  }
  for (const marker of [
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});
