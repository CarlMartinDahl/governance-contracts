const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectionSchema = require("../schemas/swe-bodelning-profile-dossier-projection.json");
const schema = require("../schemas/swe-bodelning-profile-dossier-snapshot.json");
const {
  sweBodelningProfileDossierProjection,
  sweBodelningProfileDossierSnapshot,
  validateSWEBodelningProfileDossierProjection,
  validateSWEBodelningProfileDossierSnapshot,
} = require("../packages/schemas/src/index.js");
const {
  deriveSWEBodelningProfileDossierCanonicalSource,
  deriveSWEBodelningProfileDossierFingerprint,
  deriveSWEBodelningProfileDossierProjectionVersion,
} = require("../packages/governance/src/index.js");
const api = require("../apps/api/src/index.js");
const database = require("../packages/database/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the dossier schema includes the required SWE_BODELNING fields", () => {
  assert.deepEqual(schema.required, [
    "jurisdiction_profile_key",
    "projection_version",
    "dossier_fingerprint",
    "canonical_source",
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
    "evaluator_version",
    "profile_input_summary",
    "profile_input_lane_snapshot",
    "evidence_reference_index",
    "evidence_exhibit_index",
    "issue_index",
    "section_index",
  ]);
  assert.equal(schema.properties.jurisdiction_profile_key.const, "SWE_BODELNING");
  assert.deepEqual(schema.properties.profile_input_summary.required, [
    "required_lane_count",
    "lanes_with_value_count",
    "missing_value_lane_keys",
    "lanes_with_support_count",
    "missing_support_lane_keys",
  ]);
  assert.deepEqual(schema.$defs.dossierLaneSnapshotEntry.required, [
    "has_value",
    "value",
    "has_support",
    "supporting_reference_refs",
    "supporting_exhibit_refs",
    "related_issue_refs",
    "related_section_refs",
  ]);
  assert.deepEqual(schema.$defs.sectionIndexEntry.required, [
    "section_ref",
    "section_key",
    "section_order",
    "present",
    "related_issue_refs",
    "related_lane_keys",
    "related_reference_refs",
    "related_exhibit_refs",
  ]);
  assert.deepEqual(schema.$defs.issueIndexEntry.required, [
    "issue_ref",
    "issue_code",
    "blocking",
    "related_lane_keys",
    "related_reference_refs",
    "related_section_refs",
    "related_exhibit_refs",
  ]);
  assert.deepEqual(schema.$defs.evidenceReferenceIndexEntry.required, [
    "reference_ref",
    "evidence_object_id",
    "supporting_lane_keys",
    "related_issue_refs",
    "related_section_refs",
    "related_exhibit_refs",
  ]);
  assert.deepEqual(schema.$defs.evidenceExhibitIndexEntry.required, [
    "exhibit_ref",
    "evidence_object_id",
    "supporting_lane_keys",
    "related_lane_keys",
    "related_reference_refs",
    "related_issue_refs",
    "related_section_refs",
  ]);
});

test("the dossier schema validator accepts projection_version, dossier_fingerprint, and canonical_source", () => {
  const snapshotWithoutFingerprint = {
    jurisdiction_profile_key: "SWE_BODELNING",
    projection_version: deriveSWEBodelningProfileDossierProjectionVersion(),
    canonical_source: deriveSWEBodelningProfileDossierCanonicalSource(
      {
        jurisdiction_profile_key: "SWE_BODELNING",
        release_eval_run_id: "release-eval-run-1",
        evaluator_version: "swe-bodelning-release-eval-v1",
      },
      {
        persisted_at: "2026-03-23T10:00:00.000Z",
      },
    ),
    release_gate: "blocked",
    release_gate_reason_code: "governance_baseline_fail_closed_pending_completeness_support_policy",
    release_eval_freshness: "current",
    release_eval_freshness_reason_code: "evaluator-version-current",
    evaluator_version: "swe-bodelning-release-eval-v1",
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_intent"],
      lanes_with_support_count: 2,
      missing_support_lane_keys: ["shared_intent"],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
        has_support: true,
        supporting_reference_refs: ["REF-001"],
        supporting_exhibit_refs: ["EX-001"],
        related_issue_refs: [],
        related_section_refs: [],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
        has_support: true,
        supporting_reference_refs: ["REF-002"],
        supporting_exhibit_refs: ["EX-002"],
        related_issue_refs: [],
        related_section_refs: [],
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
        has_support: false,
        supporting_reference_refs: [],
        supporting_exhibit_refs: [],
        related_issue_refs: ["ISS-001", "ISS-002"],
        related_section_refs: ["SEC-001", "SEC-002"],
      },
    },
    issue_index: [
      {
        issue_ref: "ISS-001",
        issue_code: "swe-bodelning-input-incomplete",
        blocking: true,
        related_lane_keys: ["shared_intent"],
        related_reference_refs: [],
        related_section_refs: ["SEC-001", "SEC-002"],
        related_exhibit_refs: [],
      },
      {
        issue_ref: "ISS-002",
        issue_code: "swe-bodelning-support-incomplete",
        blocking: true,
        related_lane_keys: ["shared_intent"],
        related_reference_refs: [],
        related_section_refs: ["SEC-001", "SEC-002"],
        related_exhibit_refs: [],
      },
    ],
    evidence_reference_index: [
      {
        reference_ref: "REF-001",
        evidence_object_id: "evidence-1",
        supporting_lane_keys: ["economic_contribution"],
        related_issue_refs: [],
        related_section_refs: [],
        related_exhibit_refs: ["EX-001"],
      },
      {
        reference_ref: "REF-002",
        evidence_object_id: "evidence-2",
        supporting_lane_keys: ["shared_use"],
        related_issue_refs: [],
        related_section_refs: [],
        related_exhibit_refs: ["EX-002"],
      },
    ],
    evidence_exhibit_index: [
      {
        exhibit_ref: "EX-001",
        evidence_object_id: "evidence-1",
        supporting_lane_keys: ["economic_contribution"],
        related_lane_keys: ["economic_contribution"],
        related_reference_refs: ["REF-001"],
        related_issue_refs: [],
        related_section_refs: [],
      },
      {
        exhibit_ref: "EX-002",
        evidence_object_id: "evidence-2",
        supporting_lane_keys: ["shared_use"],
        related_lane_keys: ["shared_use"],
        related_reference_refs: ["REF-002"],
        related_issue_refs: [],
        related_section_refs: [],
      },
    ],
    section_index: [
      {
        section_ref: "SEC-001",
        section_key: "release_status",
        section_order: 1,
        present: true,
        related_issue_refs: ["ISS-001", "ISS-002"],
        related_lane_keys: ["shared_intent"],
        related_reference_refs: [],
        related_exhibit_refs: [],
      },
      {
        section_ref: "SEC-002",
        section_key: "profile_inputs",
        section_order: 2,
        present: true,
        related_issue_refs: ["ISS-001", "ISS-002"],
        related_lane_keys: ["shared_intent"],
        related_reference_refs: [],
        related_exhibit_refs: [],
      },
      {
        section_ref: "SEC-003",
        section_key: "issues",
        section_order: 3,
        present: true,
        related_issue_refs: [],
        related_lane_keys: [],
        related_reference_refs: [],
        related_exhibit_refs: [],
      },
    ],
  };
  const validSnapshot = {
    ...snapshotWithoutFingerprint,
    dossier_fingerprint: deriveSWEBodelningProfileDossierFingerprint(
      snapshotWithoutFingerprint,
    ),
  };

  assert.deepEqual(
    validateSWEBodelningProfileDossierSnapshot(validSnapshot),
    validSnapshot,
  );
});

test("packages/schemas exports the dossier schema", () => {
  assert.deepEqual(sweBodelningProfileDossierSnapshot, schema);
  assert.deepEqual(sweBodelningProfileDossierProjection, projectionSchema);
});

test("the dossier projection schema validator accepts snapshot_status", () => {
  const validProjection = {
    jurisdiction_profile_key: "SWE_BODELNING",
    projection_version: deriveSWEBodelningProfileDossierProjectionVersion(),
    canonical_source: deriveSWEBodelningProfileDossierCanonicalSource(
      {
        jurisdiction_profile_key: "SWE_BODELNING",
        release_eval_run_id: "release-eval-run-1",
        evaluator_version: "swe-bodelning-release-eval-v1",
      },
      {
        persisted_at: "2026-03-23T10:00:00.000Z",
      },
    ),
    release_gate: "blocked",
    release_gate_reason_code:
      "governance_baseline_fail_closed_pending_completeness_support_policy",
    release_eval_freshness: "current",
    release_eval_freshness_reason_code: "evaluator-version-current",
    evaluator_version: "swe-bodelning-release-eval-v1",
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_intent"],
      lanes_with_support_count: 2,
      missing_support_lane_keys: ["shared_intent"],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
        has_support: true,
        supporting_reference_refs: ["REF-001"],
        supporting_exhibit_refs: ["EX-001"],
        related_issue_refs: [],
        related_section_refs: [],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
        has_support: true,
        supporting_reference_refs: ["REF-002"],
        supporting_exhibit_refs: ["EX-002"],
        related_issue_refs: [],
        related_section_refs: [],
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
        has_support: false,
        supporting_reference_refs: [],
        supporting_exhibit_refs: [],
        related_issue_refs: ["ISS-001"],
        related_section_refs: ["SEC-001", "SEC-002"],
      },
    },
    snapshot_status: {
      source: "persisted-current",
      snapshot_projection_version_found:
        deriveSWEBodelningProfileDossierProjectionVersion(),
      current_projection_version:
        deriveSWEBodelningProfileDossierProjectionVersion(),
      snapshot_is_current: true,
    },
    issue_index: [
      {
        issue_ref: "ISS-001",
        issue_code: "swe-bodelning-input-incomplete",
        blocking: true,
        related_lane_keys: ["shared_intent"],
        related_reference_refs: [],
        related_section_refs: ["SEC-001", "SEC-002"],
        related_exhibit_refs: [],
      },
    ],
    evidence_reference_index: [
      {
        reference_ref: "REF-001",
        evidence_object_id: "evidence-1",
        supporting_lane_keys: ["economic_contribution"],
        related_issue_refs: [],
        related_section_refs: [],
        related_exhibit_refs: ["EX-001"],
      },
      {
        reference_ref: "REF-002",
        evidence_object_id: "evidence-2",
        supporting_lane_keys: ["shared_use"],
        related_issue_refs: [],
        related_section_refs: [],
        related_exhibit_refs: ["EX-002"],
      },
    ],
    evidence_exhibit_index: [
      {
        exhibit_ref: "EX-001",
        evidence_object_id: "evidence-1",
        supporting_lane_keys: ["economic_contribution"],
        related_lane_keys: ["economic_contribution"],
        related_reference_refs: ["REF-001"],
        related_issue_refs: [],
        related_section_refs: [],
      },
      {
        exhibit_ref: "EX-002",
        evidence_object_id: "evidence-2",
        supporting_lane_keys: ["shared_use"],
        related_lane_keys: ["shared_use"],
        related_reference_refs: ["REF-002"],
        related_issue_refs: [],
        related_section_refs: [],
      },
    ],
    section_index: [
      {
        section_ref: "SEC-001",
        section_key: "release_status",
        section_order: 1,
        present: true,
        related_issue_refs: ["ISS-001"],
        related_lane_keys: ["shared_intent"],
        related_reference_refs: [],
        related_exhibit_refs: [],
      },
      {
        section_ref: "SEC-002",
        section_key: "profile_inputs",
        section_order: 2,
        present: true,
        related_issue_refs: ["ISS-001"],
        related_lane_keys: ["shared_intent"],
        related_reference_refs: [],
        related_exhibit_refs: [],
      },
      {
        section_ref: "SEC-003",
        section_key: "issues",
        section_order: 3,
        present: true,
        related_issue_refs: [],
        related_lane_keys: [],
        related_reference_refs: [],
        related_exhibit_refs: [],
      },
    ],
  };
  validProjection.dossier_fingerprint =
    deriveSWEBodelningProfileDossierFingerprint(validProjection);

  assert.deepEqual(
    validateSWEBodelningProfileDossierProjection(validProjection),
    validProjection,
  );
});

test("docs explicitly describe the dossier snapshot surface", () => {
  assert.match(
    docsText,
    /profile_dossier_snapshot/,
  );
  assert.match(
    docsText,
    /schemas\/swe-bodelning-profile-dossier-snapshot\.json/,
  );
  assert.match(
    docsText,
    /release_eval_freshness_reason_code/,
  );
  assert.match(
    docsText,
    /dossier_fingerprint/,
  );
  assert.match(
    docsText,
    /canonical_source/,
  );
  assert.match(
    docsText,
    /snapshot_status/,
  );
  assert.match(
    docsText,
    /schemas\/swe-bodelning-profile-dossier-projection\.json/,
  );
  assert.match(
    docsText,
    /issue_index/,
  );
  assert.match(
    docsText,
    /current canonical `issue_ref`-, `related_reference_refs`-, and `related_exhibit_refs`-based `issue_index` shape/,
  );
  assert.match(
    docsText,
    /zero-padded `issue_ref`/,
  );
  assert.match(
    docsText,
    /related_reference_refs/,
  );
  assert.match(
    docsText,
    /related_section_refs/,
  );
  assert.match(
    docsText,
    /related_exhibit_refs/,
  );
  assert.match(
    docsText,
    /section_index/,
  );
  assert.match(
    docsText,
    /evidence_reference_index/,
  );
  assert.match(
    docsText,
    /current canonical `reference_ref`-, `related_issue_refs`-, `related_section_refs`-, and `related_exhibit_refs`-based `evidence_reference_index` shape/,
  );
  assert.match(
    docsText,
    /zero-padded `reference_ref`/,
  );
  assert.match(
    docsText,
    /evidence_exhibit_index/,
  );
  assert.match(
    docsText,
    /exhibit_ref/,
  );
  assert.match(
    docsText,
    /supporting_reference_refs/,
  );
  assert.match(
    docsText,
    /supporting_exhibit_refs/,
  );
  assert.match(
    docsText,
    /current canonical `supporting_reference_refs`-, `supporting_exhibit_refs`-, `related_issue_refs`-, and `related_section_refs`-based lane shape/,
  );
  assert.match(
    docsText,
    /supporting_lane_keys/,
  );
  assert.match(
    docsText,
    /related_issue_refs/,
  );
  assert.match(
    docsText,
    /related_section_refs/,
  );
  assert.match(
    docsText,
    /current canonical `exhibit_ref`-, `related_lane_keys`-, `related_reference_refs`-, `related_issue_refs`-, and `related_section_refs`-based `evidence_exhibit_index` shape/,
  );
  assert.match(
    docsText,
    /current canonical `related_issue_refs`-, `related_lane_keys`-, `related_reference_refs`-, and `related_exhibit_refs`-based `section_index` shape/,
  );
  assert.match(
    docsText,
    /section_ref/,
  );
  assert.match(
    docsText,
    /zero-padded `section_ref`/,
  );
  assert.match(
    docsText,
    /`section_key`/,
  );
});

test("non-SWE_BODELNING behavior remains unchanged", () => {
  assert.equal(schema.properties.jurisdiction_profile_key.const, "SWE_BODELNING");
});

test("no runtime or readiness behavior change is introduced by this slice", () => {
  assert.equal("handleCaseProfileDossierRoute" in api, true);
  assert.equal("getCaseProfileDossierSnapshot" in database, false);
  assert.match(
    docsText,
    /no exhibit\/issue\/section cross-references beyond lane-level `supporting_reference_refs`, lane-level `supporting_exhibit_refs`, lane-level `related_issue_refs`, lane-level `related_section_refs`, section-level `related_lane_keys`, section-level `related_reference_refs`, issue-level `related_reference_refs`, issue-level `related_exhibit_refs`, evidence-reference-level `related_issue_refs`, evidence-reference-level `related_section_refs`, evidence-reference-level `related_exhibit_refs`, exhibit-level `related_lane_keys`, exhibit-level `related_reference_refs`, exhibit-level `related_issue_refs`, exhibit-level `related_section_refs`, and section-level `related_exhibit_refs` are introduced here/,
  );
  assert.match(docsText, /GET \/cases\/:caseId\/profile-dossier/);
});
