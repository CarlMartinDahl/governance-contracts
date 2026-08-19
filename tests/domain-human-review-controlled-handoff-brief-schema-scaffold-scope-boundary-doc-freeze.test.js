"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionText = fs.readFileSync(
  path.join(repoRoot, crossReferenceProofTransitionPath),
  "utf8",
);
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-brief-schema-scaffold-scope-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const sourcePaths = [
  contractPath,
  readinessPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-chronology.json",
  "schemas/human-review-asserted-claim-matrix.json",
  "schemas/human-review-declared-packet-review-gaps.json",
  "schemas/human-review-questions.json",
  "schemas/human-review-no-conclusion-notice.json",
  "tests/human-review-no-conclusion-notice-schema.test.js",
  "packages/schemas/src/index.js",
];
const candidatePaths = [
  "schemas/human-review-controlled-handoff-brief.json",
  "tests/human-review-controlled-handoff-brief-schema.test.js",
];
const laterSiblingPaths = [
  "schemas/human-review-controlled-handoff-brief-validator-result.json",
  "tests/human-review-controlled-handoff-brief-validator-result-schema.test.js",
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "tests/human-review-controlled-handoff-brief-validator.test.js",
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];
const validatorResultCandidatePaths = laterSiblingPaths.slice(0, 2);
const historicalValidatorHelperPaths = laterSiblingPaths.slice(2, 4);
const retainedCrossReferencePaths = laterSiblingPaths.slice(4);

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function section(text, heading, nextHeading) {
  const start = text.indexOf(heading);
  assert.notEqual(start, -1, heading);
  const end = text.indexOf(nextHeading, start + heading.length);
  assert.notEqual(end, -1, nextHeading);
  return text.slice(start, end);
}

test("handoff schema scaffold references contract readiness and conventions", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(docsText, /Comparison evidence controls only repository-native/u);
  assert.match(docsText, /does not import another contract's domain fields/u);
  assert.match(docsText, /No chat-only output[\s\S]*canonical source/u);
});

test("all nine readiness questions receive bounded scope answers", () => {
  const docsText = readRequired(docsPath);
  const resolved = section(
    docsText,
    "## 3. Nine Resolved Scaffold-Scope Questions",
    "## 4.",
  );

  assert.equal((resolved.match(/^\| \d+ \|/gmu) ?? []).length, 9);
  assert.match(resolved, /RESOLVED_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n9/u);
  for (const selection of [
    "https://json-schema.org/draft/2020-12/schema",
    "$defs.componentRefs",
    "exact five required fields",
    "exact six required fields",
    "separate future structural validator only",
    "all six later sibling paths retain live absence",
  ]) {
    assert.equal(resolved.includes(selection), true, selection);
  }
});

test("future implementation paths follow the tracked proof transition", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const files = section(docsText, "## 4.", "## 5.");

  assert.match(files, /FUTURE_SCHEMA_IMPLEMENTATION_FILE_COUNT:\n2/u);
  for (const candidatePath of candidatePaths) {
    assert.equal(files.includes("`" + candidatePath + "`"), true, candidatePath);
    assert.equal(
      transitionText.includes(
        "`" +
          candidatePath +
          "` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n2/u);
  assert.equal(
    transitionText.includes(
      "`tests/domain-human-review-controlled-handoff-brief-schema-scaffold-scope-boundary-doc-freeze.test.js`",
    ),
    true,
  );
  assert.match(files, /`packages\/schemas\/src\/index\.js` remains unchanged/u);
  assert.match(files, /historical live-absence proofs/u);
});

test("future identity and exact closed five-field root are frozen", () => {
  const docsText = readRequired(docsPath);
  const identity = section(docsText, "## 5.", "## 6.");
  const root = section(docsText, "## 6.", "## 7.");

  for (const exactValue of [
    "https://json-schema.org/draft/2020-12/schema",
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-brief.json",
    "Human Review Controlled Handoff Brief Contract Scaffold",
  ]) {
    assert.equal(identity.includes("`" + exactValue + "`"), true, exactValue);
  }
  assert.match(identity, /FUTURE_SCHEMA_IDENTITY_KEYWORD_COUNT:\n5/u);
  for (const [position, field] of [
    [1, "contract_id"],
    [2, "contract_version"],
    [3, "packet_ref"],
    [4, "handoff_posture"],
    [5, "component_refs"],
  ]) {
    assert.equal(root.includes(position + ". `" + field + "`"), true, field);
  }
  for (const exactValue of [
    "human_review.controlled_handoff_brief",
    "1.0.0",
    "^pkt_[a-z0-9][a-z0-9_-]{0,59}$",
    "HANDOFF_CANDIDATE_ONLY",
    "#/$defs/componentRefs",
  ]) {
    assert.equal(root.includes(exactValue), true, exactValue);
  }
  assert.match(root, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n5/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_REQUIRED_COUNT:\n5/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_OPTIONAL_FIELD_COUNT:\n0/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_ADDITIONAL_PROPERTIES:\nFALSE/u);
});

test("future componentRefs definition keeps six exact opaque fields", () => {
  const docsText = readRequired(docsPath);
  const componentRefs = section(docsText, "## 7.", "## 8.");

  for (const [position, field] of [
    [1, "source_register_ref"],
    [2, "review_chronology_ref"],
    [3, "asserted_claim_matrix_ref"],
    [4, "declared_packet_review_gaps_ref"],
    [5, "human_review_questions_ref"],
    [6, "no_conclusion_notice_ref"],
  ]) {
    assert.equal(
      componentRefs.includes(position + ". `" + field + "`"),
      true,
      field,
    );
  }
  assert.equal(
    componentRefs.includes(
      '`{ "type": "string", "pattern": "^hro_[a-z0-9][a-z0-9_-]{0,59}$" }`',
    ),
    true,
  );
  assert.match(componentRefs, /FUTURE_SCHEMA_LOCAL_DEFINITION_COUNT:\n1/u);
  assert.match(componentRefs, /FUTURE_SCHEMA_COMPONENT_REFS_DEF_NAME:\ncomponentRefs/u);
  assert.match(
    componentRefs,
    /FUTURE_SCHEMA_COMPONENT_REFERENCE_FIELD_COUNT:\n6/u,
  );
  assert.match(
    componentRefs,
    /FUTURE_SCHEMA_COMPONENT_REFERENCE_REQUIRED_COUNT:\n6/u,
  );
  assert.match(
    componentRefs,
    /FUTURE_SCHEMA_COMPONENT_REFERENCE_ADDITIONAL_PROPERTIES:\nFALSE/u,
  );
});

test("pairwise uniqueness and cross-reference semantics remain separate", () => {
  const docsText = readRequired(docsPath);
  const limits = section(docsText, "## 8.", "## 9.");

  assert.match(
    limits,
    /FUTURE_SCHEMA_PAIRWISE_COMPONENT_REFERENCE_UNIQUENESS_KEYWORD:\nNONE/u,
  );
  assert.match(
    limits,
    /PAIRWISE_COMPONENT_REFERENCE_UNIQUENESS_ENFORCEMENT:\nSEPARATE_FUTURE_STRUCTURAL_VALIDATOR_ONLY/u,
  );
  assert.match(
    limits,
    /CROSS_REFERENCE_MEMBERSHIP_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(
    limits,
    /PACKET_EQUALITY_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(
    limits,
    /COMPONENT_FAMILY_IDENTITY_ENFORCEMENT:\nSEPARATE_FUTURE_GOVERNANCE_CHECKPOINT_ONLY/u,
  );
  assert.match(limits, /remain schema-valid/u);
});

test("focused proof siblings and historical/current proof-transition states stay distinct", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );
  const proof = section(docsText, "## 9.", "## 10.");
  const excluded = section(docsText, "## 10.", "## 11.");
  const transition = section(docsText, "## 11.", "## 12.");

  assert.equal((proof.match(/^\d+\. /gmu) ?? []).length, 11);
  assert.match(proof, /FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:\n11/u);
  assert.match(proof, /duplicate component-reference values[\s\S]*schema-valid/u);
  assert.match(proof, /membership, packet-equality, or family-identity claims/u);
  for (const siblingPath of laterSiblingPaths) {
    assert.equal(excluded.includes("`" + siblingPath + "`"), true, siblingPath);
  }
  for (const candidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" +
          candidatePath +
          "` | `PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      candidatePath,
    );
  }
  for (const historicalPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + historicalPath + "`"),
      true,
      historicalPath,
    );
  }
  for (const retainedPath of retainedCrossReferencePaths) {
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
      ),
      true,
      retainedPath,
    );
    assert.equal(
      crossReferenceProofTransitionText.includes("\`" + retainedPath + "\`"),
      true,
      retainedPath,
    );
  }
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n18/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(excluded, /LATER_SIBLING_PATH_COUNT:\n6/u);
  assert.equal(
    transition.includes("`" + proofTransitionPath + "`"),
    true,
    proofTransitionPath,
  );
  assert.match(transition, /CANDIDATE_SCHEMA_PATH_COUNT:\n2/u);
  assert.match(transition, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(transition, /PROOF_TRANSITION_PREREQUISITE_STATUS:\nNOT_CREATED/u);
  assert.match(
    transitionText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_FIRST_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransitionText,
    /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    validatorResultTransitionText,
    /TRACKED_CONTRACT_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("scope remains exact two-file docs-only and non-authorizing", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /CURRENT_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  for (const exactPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes("`" + exactPath + "`"), true, exactPath);
    readRequired(exactPath);
  }
  for (const marker of [
    "DOCS_ONLY",
    "ALL_NINE_SCHEMA_READINESS_QUESTIONS_RESOLVED_AT_SCOPE_LEVEL",
    "EXACT_TWO_FILE_FUTURE_SCOPE_DEFINED",
    "DRAFT_2020_12_AND_LOCAL_ID_SELECTED",
    "LOCAL_COMPONENT_REFS_DEFINITION_SELECTED",
    "PAIRWISE_COMPONENT_REFERENCE_UNIQUENESS_REMAINS_VALIDATOR_ONLY",
    "CROSS_REFERENCE_MEMBERSHIP_PACKET_AND_FAMILY_CHECKS_REMAIN_CHECKPOINT_ONLY",
    "PACKAGE_EXPORT_EXCLUDED",
    "VALIDATOR_RESULT_SCHEMA_EXCLUDED",
    "VALIDATOR_EXCLUDED",
    "CROSS_REFERENCE_SURFACES_EXCLUDED",
    "HANDOFF_ASSEMBLY_EXCLUDED",
    "HUMAN_APPROVAL_EXCLUDED",
    "SCHEMA_FILE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_EXACT_TWO_FILE_FUTURE_SCHEMA_SCOPE_FROZEN",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(docsText, /not schema correctness[\s\S]*real-evidence review/u);
});
