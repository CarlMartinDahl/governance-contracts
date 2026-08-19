"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-contract-boundary-doc-freeze.test.js";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CROSS_REFERENCE_ADMISSIBILITY_SEMANTICS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-semantics-boundary-doc-freeze.test.js",
  "packages/governance/src/authenticated-actor-identity-evidence-contract.js",
  "tests/authenticated-actor-identity-evidence-contract.test.js",
  "packages/governance/src/rbac-actor-role-binding-evidence-contract.js",
  "tests/rbac-actor-role-binding-evidence-contract.test.js",
  "packages/governance/src/local-service-permission-trusted-reader-identity-applicability-evidence-contract.js",
  "tests/local-service-permission-trusted-reader-identity-applicability-evidence-contract.test.js",
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
  const endIndex = end
    ? docsText.indexOf(end, startIndex + start.length)
    : docsText.length;

  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return docsText.slice(startIndex, endIndex);
}

function assertOrderedList(section, values) {
  let priorIndex = -1;

  for (const [index, value] of values.entries()) {
    const item = index + 1 + ". `" + value + "`";
    const itemIndex = section.indexOf(item);
    assert.equal(itemIndex > priorIndex, true, value);
    priorIndex = itemIndex;
  }
}

test("canonical sources and all nineteen Owner-selected stages are frozen", () => {
  const docsText = readRequired(docsPath);
  const stages = sectionBetween(
    docsText,
    "## 3. Nineteen Owner-Selected Stages",
    "## 4.",
  );

  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
    assert.equal(
      docsText.includes("`" + controllingPath + "`"),
      true,
      controllingPath,
    );
  }

  for (let stage = 1; stage <= 19; stage += 1) {
    assert.match(
      docsText,
      new RegExp("OWNER_SELECTED_STAGE_" + stage + "_OPTION_A", "u"),
    );
  }

  assert.equal((stages.match(/^\| (?:[1-9]|1[0-9]) \|/gmu) ?? []).length, 19);
  assert.match(docsText, /OWNER_SELECTED_STAGE_COUNT:\n19/u);
  assert.match(docsText, /OPEN_CONTRACT_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(
    docsText,
    /OWNER_SELECTED_NINETEEN_STAGE_SEMANTICS_TRANSLATED/u,
  );
  assert.match(
    stages,
    /Resolution of these documentation decisions is not schema, validator, runtime/u,
  );
});

test("exact identity and twelve-field closed root are frozen", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5.",
  );
  const fields = [
    "contract_id",
    "contract_version",
    "reviewer_identity_evidence_ref",
    "approval_ref",
    "review_session_ref",
    "reviewer_ref",
    "actor_identity_evidence_ref",
    "binding_issuer_ref",
    "binding_provenance_ref",
    "binding_lifecycle_posture",
    "verification_posture",
    "human_professional_review_required",
  ];

  assert.match(
    section,
    /CONTRACT_ID:\nhuman_review\.controlled_handoff_human_professional_approval_reviewer_identity_evidence/u,
  );
  assert.match(section, /CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(section, /TOP_LEVEL_FIELD_COUNT:\n12/u);
  assertOrderedList(section, fields);
  assert.match(section, /prototype is exactly\n`Object\.prototype` or `null`/u);
  assert.match(section, /No field is optional/u);
  assert.match(section, /Unknown string or symbol keys/u);
  assert.match(
    section,
    /\| `human_professional_review_required` \| boolean equal to `true` \|/u,
  );
});

test("reference namespaces and generic opaque-reference semantics are exact", () => {
  const docsText = readRequired(docsPath);
  const root = sectionBetween(
    docsText,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5.",
  );
  const generic = sectionBetween(
    docsText,
    "## 5. Generic Actor Identity Dependency",
    "## 6.",
  );

  for (const pattern of [
    "^rie_[a-z0-9][a-z0-9_-]{0,59}$",
    "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
    "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
    "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
  ]) {
    assert.equal(root.includes("`" + pattern + "`"), true, pattern);
  }

  assert.equal(
    generic.includes("`^[A-Za-z0-9._:-]{1,128}$`"),
    true,
  );
  for (const scheme of [
    "http:",
    "https:",
    "ftp:",
    "file:",
    "mailto:",
    "data:",
    "javascript:",
  ]) {
    assert.equal(generic.includes("`" + scheme + "`"), true, scheme);
  }
  assert.match(generic, /The values `\.` and `\.\.` are invalid/u);
});

test("generic identity dependency remains necessary but insufficient", () => {
  const docsText = readRequired(docsPath);
  const genericSourceText = readRequired(
    "packages/governance/src/authenticated-actor-identity-evidence-contract.js",
  );
  const dependency = sectionBetween(
    docsText,
    "## 5. Generic Actor Identity Dependency",
    "## 6.",
  );
  const separation = sectionBetween(
    docsText,
    "## 6. Actor Type, Source Class, And Qualification Separation",
    "## 7.",
  );

  assert.match(
    dependency,
    /`actor_identity_evidence_ref` equals the directly supplied generic\s+candidate's `evidenceId` exactly/u,
  );
  assert.match(dependency, /generic `actorType` is exactly `HUMAN_REVIEWER`/u);
  assert.match(dependency, /does not equate `reviewer_ref` with generic `actorId`/u);
  assert.match(
    docsText,
    /GENERIC_IDENTITY_VALIDITY_AS_APPROVAL_IDENTITY_ADMISSIBILITY:\nPROHIBITED/u,
  );
  assert.match(
    genericSourceText,
    /const AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE_VERIFICATION_POSTURES =\s+deepFreeze\(\["NOT_VERIFIED_BY_CONTRACT"\]\)/u,
  );
  assert.match(genericSourceText, /"HUMAN_REVIEWER"/u);
  assert.match(separation, /ACTOR_TYPE_AS_REVIEWER_ROLE:\nPROHIBITED/u);
});

test("allowed source classes and qualification separation are exact", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 6. Actor Type, Source Class, And Qualification Separation",
    "## 7.",
  );
  const allowed = [
    "SERVER_SESSION_EVIDENCE",
    "TOKEN_EVIDENCE",
    "CERTIFICATE_EVIDENCE",
    "DATABASE_ACCOUNT_EVIDENCE",
  ];

  assertOrderedList(section, allowed);
  assert.match(section, /ALLOWED_IDENTITY_SOURCE_CLASS_COUNT:\n4/u);
  assert.match(
    section,
    /`SERVICE_CREDENTIAL_EVIDENCE` is prohibited/u,
  );
  assert.match(
    section,
    /does\s+not inspect, copy, compare, verify, or use it/u,
  );
  assert.match(
    section,
    /PROFESSIONAL_QUALIFICATION_FROM_IDENTITY_EVIDENCE:\nPROHIBITED/u,
  );
});

test("approval-attempt equality and request-binding separation are exact", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 7. Exact Approval-Attempt Binding",
    "## 8.",
  );

  for (const phrase of [
    "wrapper `approval_ref` equals `approval_candidate.approval_ref`",
    "wrapper `review_session_ref` equals",
    "wrapper `reviewer_ref` equals",
    "wrapper `actor_identity_evidence_ref` equals generic `evidenceId`",
  ]) {
    assert.equal(section.includes(phrase), true, phrase);
  }

  assert.match(section, /EXACT_EXTERNAL_REFERENCE_BINDING_COUNT:\n4/u);
  assert.match(section, /No normalization, case folding, prefix stripping/u);
  assert.match(
    section,
    /`currentRequestBindingRef` remains a separate opaque\s+dependency/u,
  );
  assert.match(
    section,
    /CURRENT_REQUEST_BINDING_VERIFICATION:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u,
  );
});

test("issuer provenance lifecycle and verification remain declarations only", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 8. Binding Issuer, Provenance, Lifecycle, And Verification",
    "## 9.",
  );

  assertOrderedList(section, [
    "REVIEWER_IDENTITY_BINDING_DECLARED_ACTIVE",
    "REVIEWER_IDENTITY_BINDING_DECLARED_INACTIVE",
    "REVIEWER_IDENTITY_BINDING_DECLARED_REVOKED",
  ]);
  assert.match(section, /BINDING_LIFECYCLE_POSTURE_COUNT:\n3/u);
  assert.match(section, /VERIFICATION_POSTURE_COUNT:\n1/u);
  assert.match(section, /`NOT_VERIFIED_BY_CONTRACT`/u);
  assert.match(section, /Neither reference proves issuer identity/u);
  assert.match(
    section,
    /`REVIEWER_IDENTITY_BINDING_DECLARED_ACTIVE` remains unverified/u,
  );
  assert.match(section, /No `VERIFIED`, `CURRENT`, `TRUSTED`/u);
});

test("time expiry revocation and currentness remain separately blocked", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 9. Time, Expiry, Revocation, And Currentness Separation",
    "## 10.",
  );

  for (const field of [
    "issuedAtEpochSeconds",
    "expiresAtEpochSeconds",
    "revocationEvidenceRef",
  ]) {
    assert.equal(section.includes("`" + field + "`"), true, field);
  }
  assert.match(section, /They are not duplicated in the wrapper/u);
  assert.match(section, /a local wall-clock assumption/u);
  assert.match(section, /a generic or arbitrary TTL/u);
  assert.match(
    section,
    /TRUSTED_TIME_CURRENTNESS_EVALUATION:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u,
  );
});

test("pairwise distinct references and direct same-call cardinality are exact", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 10. Reference Distinctness And Same-Call Cardinality",
    "## 11.",
  );

  assertOrderedList(section, [
    "reviewer_identity_evidence_ref",
    "approval_ref",
    "review_session_ref",
    "reviewer_ref",
    "actor_identity_evidence_ref",
    "binding_issuer_ref",
    "binding_provenance_ref",
  ]);
  assert.match(
    section,
    /PAIRWISE_DISTINCT_INTERNAL_REFERENCE_COUNT:\n7/u,
  );
  assert.match(
    section,
    /APPROVAL_SPECIFIC_REVIEWER_IDENTITY_EVIDENCE_CANDIDATE_COUNT:\n1/u,
  );
  assert.match(
    docsText,
    /GENERIC_IDENTITY_EVIDENCE_CANDIDATE_COUNT:\n1/u,
  );
  assert.match(
    section,
    /LOOKUP_DEREFERENCE_DISCOVERY_OR_PERSISTENCE:\nPROHIBITED/u,
  );
  assert.match(section, /No array, candidate set, fallback candidate/u);
});

test("privacy shadow semantics and structural non-effects remain fail-closed", () => {
  const docsText = readRequired(docsPath);
  const privacy = sectionBetween(
    docsText,
    "## 11. Privacy, Closed Shape, And Shadow-Semantics Prohibition",
    "## 12.",
  );
  const validity = sectionBetween(
    docsText,
    "## 12. Structural Validity And Separate Future Admissibility",
    "## 13.",
  );

  for (const phrase of [
    "person name, email address",
    "raw content, raw source",
    "token, JWT, certificate",
    "inline generic identity candidate",
    "reviewer role, professional qualification",
    "finding, score, severity",
    "Opaque references must not be populated with raw",
  ]) {
    assert.equal(privacy.includes(phrase), true, phrase);
  }
  assert.match(privacy, /exact twelve fields in Section 4 are the complete allowlist/u);
  assert.match(validity, /structurally valid wrapper proves only/u);
  assert.match(validity, /does not prove:/u);
  assert.match(validity, /must stop closed/u);
  assert.match(
    validity,
    /No structural validator result shape, public error code taxonomy/u,
  );
});

test("future ownership remains deferred and exact file scope stays docs-only", () => {
  const docsText = readRequired(docsPath);
  const deferred = sectionBetween(
    docsText,
    "## 13. Deferred Ownership And Separate Future Prerequisites",
    "## 14.",
  );
  const scope = sectionBetween(
    docsText,
    "## 14. Exact Two-File Docs-Only Slice",
    "## 15.",
  );

  for (const marker of [
    "FUTURE_SCHEMA_PATH:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "FUTURE_VALIDATOR_RESULT_SCHEMA_PATH:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "FUTURE_PACKAGE_EXPORT_OWNERSHIP:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "FUTURE_VALIDATOR_CODE_OWNERSHIP:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "CURRENT_SAFE_SCHEMA_OR_RUNTIME_STEP:\nNONE",
  ]) {
    assert.match(deferred, new RegExp(marker, "u"));
  }
  assert.match(deferred, /No future path is reserved or authorized/u);
  assert.match(scope, /CURRENT_SLICE_FILE_COUNT:\n2/u);
  assert.match(scope, /CURRENT_SLICE_DOC_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SLICE_FOCUSED_PROOF_FILE_COUNT:\n1/u);
  assert.match(scope, /CURRENT_SLICE_SCHEMA_FILE_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SLICE_PACKAGE_EXPORT_COUNT:\n0/u);
  assert.match(scope, /CURRENT_SLICE_RUNTIME_FILE_COUNT:\n0/u);
  assert.equal(scope.includes("`" + docsPath + "`"), true);
  assert.equal(scope.includes("`" + proofPath + "`"), true);
});

test("proof and final no-conclusion boundaries remain explicit", () => {
  const docsText = readRequired(docsPath);
  const proof = sectionBetween(docsText, "## 16. Proof Boundary", "## 17.");
  const finalBoundary = sectionBetween(
    docsText,
    "## 17. Final No-Conclusion Boundary",
  );

  for (const marker of [
    "SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_RESULT_SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "PACKAGE_EXPORT_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_OR_RUNTIME_CREATED_BY_THIS_SLICE:\nNO",
    "REVIEWER_IDENTITY_VERIFIED_BY_THIS_SLICE:\nNO",
    "REVIEWER_ROLE_OR_AUTHORITY_CREATED_BY_THIS_SLICE:\nNO",
    "APPROVAL_ADMISSIBILITY_OR_ELIGIBILITY_CREATED_BY_THIS_SLICE:\nNO",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(proof, /PROOF_CLASSIFICATION:\nSYNTHETIC_DOC_BOUNDARY_ONLY/u);
  assert.match(
    proof,
    /DOCS_ONLY_REVIEWER_IDENTITY_EVIDENCE_SEMANTICS_FROZEN_IMPLEMENTATION_REMAINS_FAIL_CLOSED/u,
  );
  assert.match(finalBoundary, /not human review, professional review, legal review/u);
  assert.match(
    finalBoundary,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_REVIEWER_ROLE_OR_AUTHORITY_SEMANTICS_OR_REVIEWER_IDENTITY_SCAFFOLD_DECISION/u,
  );
  assert.match(docsText, /PRODUCT_CANDIDATE_NONE/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
});
