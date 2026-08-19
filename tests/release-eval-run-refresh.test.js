const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getLatestCaseReleaseEvalRun,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  validateCMDProfileDossierSnapshot,
} = require("../packages/schemas/src/index.js");
const {
  deriveCMDReleaseEvalBaseline,
  deriveCMDReleaseEvalEvaluatorVersion,
  deriveSWEBodelningProfileDossierCanonicalSource,
  deriveSWEBodelningProfileDossierFingerprint,
  deriveSWEBodelningProfileDossierProjectionVersion,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
  deriveSWEBodelningProfileInputSnapshot,
} = require("../packages/governance/src/index.js");

const cmdCanonicalBaseline = deriveCMDReleaseEvalBaseline();
const cmdCanonicalEvaluatorVersion = deriveCMDReleaseEvalEvaluatorVersion();
const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const cmdIncompleteReasonCode = "cmd-input-incomplete";
const cmdRuntimeNotImplementedReasonCode = "cmd-runtime-not-implemented";
const incompleteReasonCode = "swe-bodelning-input-incomplete";
const supportIncompleteReasonCode = "swe-bodelning-support-incomplete";

function createStorageDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "governance-contracts-release-eval-refresh-"));
}

function createProfileInputs(overrides = {}) {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_intent"],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
      },
    },
    ...overrides,
  };
}

function createReleaseEvalSeed(overrides = {}) {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    release_eval_run_id: "release-eval-run-1",
    evaluator_version: "SHOULD_NOT_BE_PASSED_THROUGH",
    release_gate: "SHOULD_NOT_BE_PASSED_THROUGH",
    release_eval_freshness: "SHOULD_NOT_BE_PASSED_THROUGH",
    ...overrides,
  };
}

function createCompleteProfileInputs(overrides = {}) {
  return createProfileInputs({
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 3,
      missing_value_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
      },
      shared_intent: {
        has_value: true,
        value: "co-acquisition",
        evidence_object_ids: ["evidence-3"],
      },
    },
    ...overrides,
  });
}

function createValueCompleteButSupportIncompleteProfileInputs() {
  return createProfileInputs({
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 3,
      missing_value_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: [],
      },
      shared_intent: {
        has_value: true,
        value: "co-acquisition",
        evidence_object_ids: ["evidence-3"],
      },
    },
  });
}

function createCMDProfileInputs(overrides = {}) {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    profile_input_summary: {
      required_lane_count: 1,
      lanes_with_value_count: 1,
      missing_value_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      "cmd_primary_signal": {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["cmd-evidence-1"],
      },
    },
    ...overrides,
  };
}

function createIncompleteCMDProfileInputs() {
  return createCMDProfileInputs({
    profile_input_summary: {
      required_lane_count: 1,
      lanes_with_value_count: 0,
      missing_value_lane_keys: ["cmd_primary_signal"],
    },
    profile_input_lane_snapshot: {
      "cmd_primary_signal": {
        has_value: false,
        value: null,
        evidence_object_ids: [],
      },
    },
  });
}

function createCMDReleaseEvalSeed(overrides = {}) {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    release_eval_run_id: "cmd-release-eval-run-1",
    evaluator_version: "IGNORED_BY_GOVERNANCE",
    release_gate: "IGNORED_BY_GOVERNANCE",
    release_eval_freshness: "IGNORED_BY_GOVERNANCE",
    ...overrides,
  };
}

test("successful canonical refresh/create for a CMD_PROFILE case with complete profile input produces a blocked/current release_eval baseline", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-cmd-complete", createCMDProfileInputs(), {
    storageDir,
  });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-cmd-complete",
    createCMDReleaseEvalSeed(),
    { storageDir },
  );
  const latest = await getLatestCaseReleaseEvalRun("case-cmd-complete", { storageDir });

  assert.deepEqual(latest, persisted);
  assert.equal(persisted.evaluator_version, cmdCanonicalEvaluatorVersion);
  assert.equal(persisted.release_gate, cmdCanonicalBaseline.release_gate);
  assert.equal(
    persisted.release_gate_reason_code,
    cmdRuntimeNotImplementedReasonCode,
  );
  assert.equal(
    persisted.release_eval_freshness,
    cmdCanonicalBaseline.release_eval_freshness,
  );
  assert.equal(
    persisted.release_eval_freshness_reason_code,
    currentFreshnessReasonCode,
  );
  assert.deepEqual(persisted.profile_input_summary, {
    required_lane_count: 1,
    lanes_with_value_count: 1,
    missing_value_lane_keys: [],
    lanes_with_support_count: 1,
    missing_support_lane_keys: [],
  });
  assert.deepEqual(persisted.profile_input_lane_snapshot, {
    "cmd_primary_signal": {
      has_value: true,
      value: "documented",
      evidence_object_ids: ["cmd-evidence-1"],
      has_support: true,
    },
  });
  assert.deepEqual(
    validateCMDProfileDossierSnapshot(persisted.profile_dossier_snapshot),
    persisted.profile_dossier_snapshot,
  );
  assert.deepEqual(persisted.profile_dossier_snapshot, {
    jurisdiction_profile_key: "CMD_PROFILE",
    release_gate: "blocked",
    release_gate_reason_code: cmdRuntimeNotImplementedReasonCode,
    release_eval_freshness: "current",
    release_eval_freshness_reason_code: currentFreshnessReasonCode,
    evaluator_version: cmdCanonicalEvaluatorVersion,
    profile_input_summary: persisted.profile_input_summary,
    profile_input_lane_snapshot: persisted.profile_input_lane_snapshot,
  });
});

test("incomplete CMD_PROFILE profile input produces a blocked machine-readable input-incomplete reason", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-cmd-incomplete", createIncompleteCMDProfileInputs(), {
    storageDir,
  });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-cmd-incomplete",
    createCMDReleaseEvalSeed({
      release_eval_run_id: "cmd-release-eval-run-2",
    }),
    { storageDir },
  );

  assert.equal(persisted.release_gate, cmdCanonicalBaseline.release_gate);
  assert.equal(persisted.release_gate_reason_code, cmdIncompleteReasonCode);
  assert.equal(
    persisted.release_eval_freshness,
    cmdCanonicalBaseline.release_eval_freshness,
  );
  assert.equal(
    persisted.release_eval_freshness_reason_code,
    currentFreshnessReasonCode,
  );
  assert.deepEqual(persisted.profile_input_summary, {
    required_lane_count: 1,
    lanes_with_value_count: 0,
    missing_value_lane_keys: ["cmd_primary_signal"],
    lanes_with_support_count: 0,
    missing_support_lane_keys: ["cmd_primary_signal"],
  });
  assert.deepEqual(persisted.profile_input_lane_snapshot, {
    "cmd_primary_signal": {
      has_value: false,
      value: null,
      evidence_object_ids: [],
      has_support: false,
    },
  });
  assert.deepEqual(
    validateCMDProfileDossierSnapshot(persisted.profile_dossier_snapshot),
    persisted.profile_dossier_snapshot,
  );
  assert.deepEqual(persisted.profile_dossier_snapshot, {
    jurisdiction_profile_key: "CMD_PROFILE",
    release_gate: "blocked",
    release_gate_reason_code: cmdIncompleteReasonCode,
    release_eval_freshness: "current",
    release_eval_freshness_reason_code: currentFreshnessReasonCode,
    evaluator_version: cmdCanonicalEvaluatorVersion,
    profile_input_summary: persisted.profile_input_summary,
    profile_input_lane_snapshot: persisted.profile_input_lane_snapshot,
  });
});

test("empty cmd_primary_signal remains on the fail-closed input-incomplete baseline", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs(
    "case-cmd-empty-string",
    createCMDProfileInputs({
      profile_input_lane_snapshot: {
        "cmd_primary_signal": {
          has_value: true,
          value: "",
          evidence_object_ids: ["cmd-evidence-1"],
        },
      },
    }),
    { storageDir },
  );

  const persisted = await refreshCaseReleaseEvalRun(
    "case-cmd-empty-string",
    createCMDReleaseEvalSeed({
      release_eval_run_id: "cmd-release-eval-run-empty-string",
    }),
    { storageDir },
  );

  assert.equal(persisted.release_gate, cmdCanonicalBaseline.release_gate);
  assert.equal(persisted.release_gate_reason_code, cmdIncompleteReasonCode);
  assert.equal(
    persisted.release_eval_freshness,
    cmdCanonicalBaseline.release_eval_freshness,
  );
  assert.equal(
    persisted.release_eval_freshness_reason_code,
    currentFreshnessReasonCode,
  );
  assert.deepEqual(persisted.profile_input_summary, {
    required_lane_count: 1,
    lanes_with_value_count: 0,
    missing_value_lane_keys: ["cmd_primary_signal"],
    lanes_with_support_count: 1,
    missing_support_lane_keys: [],
  });
  assert.deepEqual(persisted.profile_input_lane_snapshot, {
    "cmd_primary_signal": {
      has_value: false,
      value: "",
      evidence_object_ids: ["cmd-evidence-1"],
      has_support: true,
    },
  });
});

test("canonical refresh persists lane-level support metadata for SWE_BODELNING", async () => {
  const storageDir = createStorageDir();
  const profileInputs = createProfileInputs();

  await upsertCaseProfileInputs("case-1", profileInputs, { storageDir });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-1",
    createReleaseEvalSeed(),
    { storageDir },
  );

  const expected = deriveSWEBodelningProfileInputSnapshot(profileInputs);

  assert.equal(persisted.profile_input_lane_snapshot.economic_contribution.has_support, true);
  assert.equal(persisted.profile_input_lane_snapshot.shared_use.has_support, true);
  assert.equal(persisted.profile_input_lane_snapshot.shared_intent.has_support, false);
  assert.deepEqual(
    {
      has_value: persisted.profile_input_lane_snapshot.economic_contribution.has_value,
      value: persisted.profile_input_lane_snapshot.economic_contribution.value,
      evidence_object_ids:
        persisted.profile_input_lane_snapshot.economic_contribution.evidence_object_ids,
    },
    expected.profile_input_lane_snapshot.economic_contribution,
  );
});

test("canonical refresh persists summary-level support metadata for SWE_BODELNING", async () => {
  const storageDir = createStorageDir();
  const profileInputs = createProfileInputs();

  await upsertCaseProfileInputs("case-2", profileInputs, { storageDir });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-2",
    createReleaseEvalSeed(),
    { storageDir },
  );

  const expected = deriveSWEBodelningProfileInputSnapshot(profileInputs);

  assert.deepEqual(
    {
      required_lane_count: persisted.profile_input_summary.required_lane_count,
      lanes_with_value_count: persisted.profile_input_summary.lanes_with_value_count,
      missing_value_lane_keys: persisted.profile_input_summary.missing_value_lane_keys,
    },
    expected.profile_input_summary,
  );
  assert.equal(persisted.profile_input_summary.lanes_with_support_count, 2);
  assert.deepEqual(persisted.profile_input_summary.missing_support_lane_keys, [
    "shared_intent",
  ]);
});

test("missing_support_lane_keys reflects lanes without evidence_object_ids", async () => {
  const storageDir = createStorageDir();
  const profileInputs = createProfileInputs({
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: [],
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
      },
    },
  });

  await upsertCaseProfileInputs("case-support", profileInputs, { storageDir });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-support",
    createReleaseEvalSeed(),
    { storageDir },
  );

  assert.deepEqual(
    persisted.profile_input_summary.missing_support_lane_keys,
    ["shared_use", "shared_intent"],
  );
});

test("missing support on one required lane keeps release_gate blocked and sets the support-incomplete reason", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs(
    "case-support-gate",
    createValueCompleteButSupportIncompleteProfileInputs(),
    { storageDir },
  );

  const persisted = await refreshCaseReleaseEvalRun(
    "case-support-gate",
    createReleaseEvalSeed(),
    { storageDir },
  );

  assert.equal(persisted.release_gate, "blocked");
  assert.equal(persisted.release_gate_reason_code, supportIncompleteReasonCode);
  assert.deepEqual(persisted.profile_input_summary.missing_support_lane_keys, ["shared_use"]);
});

test("canonical refresh persists governance-owned release_gate for SWE_BODELNING", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-gate", createProfileInputs(), { storageDir });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-gate",
    createReleaseEvalSeed(),
    { storageDir },
  );

  assert.equal(persisted.release_gate, canonicalBaseline.release_gate);
});

test("canonical refresh persists governance-owned release_eval_freshness for SWE_BODELNING", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-freshness", createProfileInputs(), { storageDir });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-freshness",
    createReleaseEvalSeed(),
    { storageDir },
  );

  assert.equal(
    persisted.release_eval_freshness,
    canonicalBaseline.release_eval_freshness,
  );
  assert.equal(
    persisted.release_eval_freshness_reason_code,
    currentFreshnessReasonCode,
  );
});

test("canonical refresh persists profile_dossier_snapshot for SWE_BODELNING", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-dossier", createProfileInputs(), { storageDir });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-dossier",
    createReleaseEvalSeed(),
    { storageDir },
  );

  assert.deepEqual(
    persisted.profile_dossier_snapshot,
    deriveSWEBodelningProfileDossierSnapshot(persisted),
  );
  assert.equal(
    persisted.profile_dossier_snapshot.jurisdiction_profile_key,
    "SWE_BODELNING",
  );
  assert.equal(
    persisted.profile_dossier_snapshot.projection_version,
    deriveSWEBodelningProfileDossierProjectionVersion(),
  );
  assert.equal(
    persisted.profile_dossier_snapshot.dossier_fingerprint,
    deriveSWEBodelningProfileDossierFingerprint({
      jurisdiction_profile_key:
        persisted.profile_dossier_snapshot.jurisdiction_profile_key,
      projection_version: persisted.profile_dossier_snapshot.projection_version,
      release_gate: persisted.profile_dossier_snapshot.release_gate,
      release_gate_reason_code:
        persisted.profile_dossier_snapshot.release_gate_reason_code,
      release_eval_freshness:
        persisted.profile_dossier_snapshot.release_eval_freshness,
      release_eval_freshness_reason_code:
        persisted.profile_dossier_snapshot.release_eval_freshness_reason_code,
      evaluator_version: persisted.profile_dossier_snapshot.evaluator_version,
      profile_input_summary: persisted.profile_dossier_snapshot.profile_input_summary,
      profile_input_lane_snapshot:
        persisted.profile_dossier_snapshot.profile_input_lane_snapshot,
      evidence_reference_index:
        persisted.profile_dossier_snapshot.evidence_reference_index,
      evidence_exhibit_index:
        persisted.profile_dossier_snapshot.evidence_exhibit_index,
      issue_index: persisted.profile_dossier_snapshot.issue_index,
      section_index: persisted.profile_dossier_snapshot.section_index,
    }),
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.canonical_source,
    deriveSWEBodelningProfileDossierCanonicalSource(persisted),
  );
  assert.equal(
    persisted.profile_dossier_snapshot.canonical_source.release_eval_run_id,
    persisted.release_eval_run_id,
  );
  assert.equal(
    persisted.profile_dossier_snapshot.canonical_source.evaluator_version,
    persisted.evaluator_version,
  );
  assert.equal(
    persisted.profile_dossier_snapshot.canonical_source.jurisdiction_profile_key,
    persisted.jurisdiction_profile_key,
  );
  assert.equal(
    persisted.profile_dossier_snapshot.release_gate_reason_code,
    incompleteReasonCode,
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.issue_index,
    [
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
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.evidence_reference_index,
    [
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
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.evidence_exhibit_index,
    [
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
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_reference_refs,
    ["REF-001"],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_exhibit_refs,
    ["EX-001"],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.related_issue_refs,
    [],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.related_section_refs,
    [],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_reference_refs,
    ["REF-002"],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_exhibit_refs,
    ["EX-002"],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.related_issue_refs,
    [],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.related_section_refs,
    [],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.supporting_reference_refs,
    [],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.supporting_exhibit_refs,
    [],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_issue_refs,
    ["ISS-001", "ISS-002"],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_section_refs,
    ["SEC-001", "SEC-002"],
  );
  assert.deepEqual(
    persisted.profile_dossier_snapshot.section_index,
    [
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
  );
});

test("canonical refresh persists related_reference_refs for SWE_BODELNING issues", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs(
    "case-issue-reference-refs",
    createProfileInputs({
      profile_input_summary: {
        required_lane_count: 3,
        lanes_with_value_count: 2,
        missing_value_lane_keys: ["shared_use"],
      },
      profile_input_lane_snapshot: {
        economic_contribution: {
          has_value: true,
          value: "documented",
          evidence_object_ids: ["evidence-1"],
        },
        shared_use: {
          has_value: false,
          value: null,
          evidence_object_ids: ["evidence-2"],
        },
        shared_intent: {
          has_value: true,
          value: "co-acquisition",
          evidence_object_ids: ["evidence-3"],
        },
      },
    }),
    { storageDir },
  );

  const persisted = await refreshCaseReleaseEvalRun(
    "case-issue-reference-refs",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-issue-reference-refs" }),
    { storageDir },
  );

  assert.deepEqual(persisted.profile_dossier_snapshot.issue_index, [
    {
      issue_ref: "ISS-001",
      issue_code: "swe-bodelning-input-incomplete",
      blocking: true,
      related_lane_keys: ["shared_use"],
      related_reference_refs: ["REF-002"],
      related_section_refs: ["SEC-001", "SEC-002"],
      related_exhibit_refs: ["EX-002"],
    },
  ]);
});

test("canonical refresh persists related_reference_refs for SWE_BODELNING exhibits", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-exhibit-reference-refs", createProfileInputs(), {
    storageDir,
  });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-exhibit-reference-refs",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-exhibit-reference-refs" }),
    { storageDir },
  );

  assert.deepEqual(persisted.profile_dossier_snapshot.evidence_exhibit_index, [
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
  ]);
});

test("canonical refresh persists related_reference_refs for SWE_BODELNING sections", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs(
    "case-section-reference-refs",
    createProfileInputs({
      profile_input_summary: {
        required_lane_count: 3,
        lanes_with_value_count: 2,
        missing_value_lane_keys: ["shared_use"],
      },
      profile_input_lane_snapshot: {
        economic_contribution: {
          has_value: true,
          value: "documented",
          evidence_object_ids: ["evidence-1"],
        },
        shared_use: {
          has_value: false,
          value: null,
          evidence_object_ids: ["evidence-2"],
        },
        shared_intent: {
          has_value: true,
          value: "co-acquisition",
          evidence_object_ids: ["evidence-3"],
        },
      },
    }),
    { storageDir },
  );

  const persisted = await refreshCaseReleaseEvalRun(
    "case-section-reference-refs",
    createReleaseEvalSeed({
      release_eval_run_id: "release-eval-run-section-reference-refs",
    }),
    { storageDir },
  );

  assert.deepEqual(persisted.profile_dossier_snapshot.section_index, [
    {
      section_ref: "SEC-001",
      section_key: "release_status",
      section_order: 1,
      present: true,
      related_issue_refs: ["ISS-001"],
      related_lane_keys: ["shared_use"],
      related_reference_refs: ["REF-002"],
      related_exhibit_refs: ["EX-002"],
    },
    {
      section_ref: "SEC-002",
      section_key: "profile_inputs",
      section_order: 2,
      present: true,
      related_issue_refs: ["ISS-001"],
      related_lane_keys: ["shared_use"],
      related_reference_refs: ["REF-002"],
      related_exhibit_refs: ["EX-002"],
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
  ]);
});

test("identical canonical inputs produce the same dossier_fingerprint", async () => {
  const storageDir = createStorageDir();
  const profileInputs = createProfileInputs();

  await upsertCaseProfileInputs("case-fingerprint-same", profileInputs, {
    storageDir,
  });

  const firstPersisted = await refreshCaseReleaseEvalRun(
    "case-fingerprint-same",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-same-1" }),
    { storageDir },
  );
  const secondPersisted = await refreshCaseReleaseEvalRun(
    "case-fingerprint-same",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-same-2" }),
    { storageDir },
  );

  assert.equal(
    firstPersisted.profile_dossier_snapshot.dossier_fingerprint,
    secondPersisted.profile_dossier_snapshot.dossier_fingerprint,
  );
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.issue_index,
    secondPersisted.profile_dossier_snapshot.issue_index,
  );
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.evidence_reference_index,
    secondPersisted.profile_dossier_snapshot.evidence_reference_index,
  );
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.evidence_exhibit_index,
    secondPersisted.profile_dossier_snapshot.evidence_exhibit_index,
  );
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_reference_refs,
    secondPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_reference_refs,
  );
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_exhibit_refs,
    secondPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_exhibit_refs,
  );
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_section_refs,
    secondPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_section_refs,
  );
  assert.deepEqual(firstPersisted.profile_dossier_snapshot.evidence_exhibit_index, [
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
  ]);
  assert.deepEqual(firstPersisted.profile_dossier_snapshot.evidence_reference_index, [
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
  ]);
  assert.deepEqual(firstPersisted.profile_dossier_snapshot.issue_index, [
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
  ]);
  assert.deepEqual(firstPersisted.profile_dossier_snapshot.section_index, [
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
  ]);
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.section_index,
    secondPersisted.profile_dossier_snapshot.section_index,
  );
});

test("changed canonical inputs produce a different dossier_fingerprint", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs(
    "case-fingerprint-different",
    createProfileInputs(),
    { storageDir },
  );

  const firstPersisted = await refreshCaseReleaseEvalRun(
    "case-fingerprint-different",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-different-1" }),
    { storageDir },
  );

  await upsertCaseProfileInputs(
    "case-fingerprint-different",
    createValueCompleteButSupportIncompleteProfileInputs(),
    { storageDir },
  );

  const secondPersisted = await refreshCaseReleaseEvalRun(
    "case-fingerprint-different",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-different-2" }),
    { storageDir },
  );

  assert.notEqual(
    firstPersisted.profile_dossier_snapshot.dossier_fingerprint,
    secondPersisted.profile_dossier_snapshot.dossier_fingerprint,
  );
  assert.deepEqual(firstPersisted.profile_dossier_snapshot.evidence_reference_index, [
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
  ]);
  assert.deepEqual(secondPersisted.profile_dossier_snapshot.evidence_reference_index, [
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
      evidence_object_id: "evidence-3",
      supporting_lane_keys: ["shared_intent"],
      related_issue_refs: [],
      related_section_refs: [],
      related_exhibit_refs: ["EX-002"],
    },
  ]);
  assert.deepEqual(firstPersisted.profile_dossier_snapshot.evidence_exhibit_index, [
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
  ]);
  assert.deepEqual(secondPersisted.profile_dossier_snapshot.evidence_exhibit_index, [
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
      evidence_object_id: "evidence-3",
      supporting_lane_keys: ["shared_intent"],
      related_lane_keys: ["shared_intent"],
      related_reference_refs: ["REF-002"],
      related_issue_refs: [],
      related_section_refs: [],
    },
  ]);
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_reference_refs,
    ["REF-002"],
  );
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_exhibit_refs,
    ["EX-002"],
  );
  assert.deepEqual(
    secondPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_reference_refs,
    [],
  );
  assert.deepEqual(
    secondPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_exhibit_refs,
    [],
  );
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.related_issue_refs,
    [],
  );
  assert.deepEqual(
    secondPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.related_issue_refs,
    ["ISS-001"],
  );
  assert.deepEqual(
    secondPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.related_section_refs,
    ["SEC-001", "SEC-002"],
  );
  assert.deepEqual(
    secondPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.supporting_reference_refs,
    ["REF-002"],
  );
  assert.deepEqual(
    secondPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.supporting_exhibit_refs,
    ["EX-002"],
  );
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_issue_refs,
    ["ISS-001", "ISS-002"],
  );
  assert.deepEqual(
    secondPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_issue_refs,
    [],
  );
  assert.deepEqual(
    firstPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_section_refs,
    ["SEC-001", "SEC-002"],
  );
  assert.deepEqual(
    secondPersisted.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_section_refs,
    [],
  );
  assert.deepEqual(firstPersisted.profile_dossier_snapshot.issue_index, [
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
  ]);
  assert.deepEqual(secondPersisted.profile_dossier_snapshot.issue_index, [
    {
      issue_ref: "ISS-001",
      issue_code: "swe-bodelning-support-incomplete",
      blocking: true,
      related_lane_keys: ["shared_use"],
      related_reference_refs: [],
      related_section_refs: ["SEC-001", "SEC-002"],
      related_exhibit_refs: [],
    },
  ]);
  assert.deepEqual(firstPersisted.profile_dossier_snapshot.section_index, [
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
  ]);
  assert.deepEqual(secondPersisted.profile_dossier_snapshot.section_index, [
    {
      section_ref: "SEC-001",
      section_key: "release_status",
      section_order: 1,
      present: true,
      related_issue_refs: ["ISS-001"],
      related_lane_keys: ["shared_use"],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
    {
      section_ref: "SEC-002",
      section_key: "profile_inputs",
      section_order: 2,
      present: true,
      related_issue_refs: ["ISS-001"],
      related_lane_keys: ["shared_use"],
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
  ]);
});

test("canonical refresh persists evaluator_version for SWE_BODELNING", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-version", createProfileInputs(), { storageDir });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-version",
    createReleaseEvalSeed(),
    { storageDir },
  );

  assert.equal(persisted.evaluator_version, canonicalEvaluatorVersion);
  assert.equal(persisted.release_eval_freshness, "current");
  assert.equal(
    persisted.release_eval_freshness_reason_code,
    currentFreshnessReasonCode,
  );
});

test("missing one required lane keeps release_gate blocked and sets the incompleteness reason", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-blocked", createProfileInputs(), { storageDir });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-blocked",
    createReleaseEvalSeed(),
    { storageDir },
  );

  assert.equal(persisted.release_gate, "blocked");
  assert.equal(persisted.release_gate_reason_code, incompleteReasonCode);
  assert.deepEqual(persisted.profile_input_summary.missing_value_lane_keys, ["shared_intent"]);
});

test("missing multiple lanes returns all missing lane keys", async () => {
  const storageDir = createStorageDir();

  const updatedProfileInputs = createProfileInputs({
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 1,
      missing_value_lane_keys: ["shared_use", "shared_intent"],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
      },
      shared_use: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
      },
    },
  });

  await upsertCaseProfileInputs("case-3", updatedProfileInputs, { storageDir });

  const refreshed = await refreshCaseReleaseEvalRun(
    "case-3",
    createReleaseEvalSeed({
      release_eval_run_id: "release-eval-run-2",
      evaluator_version: "v2",
    }),
    { storageDir },
  );

  const expected = deriveSWEBodelningProfileInputSnapshot(updatedProfileInputs);

  assert.deepEqual(
    {
      required_lane_count: refreshed.profile_input_summary.required_lane_count,
      lanes_with_value_count: refreshed.profile_input_summary.lanes_with_value_count,
      missing_value_lane_keys: refreshed.profile_input_summary.missing_value_lane_keys,
    },
    expected.profile_input_summary,
  );
  assert.deepEqual(
    {
      economic_contribution: {
        has_value: refreshed.profile_input_lane_snapshot.economic_contribution.has_value,
        value: refreshed.profile_input_lane_snapshot.economic_contribution.value,
        evidence_object_ids:
          refreshed.profile_input_lane_snapshot.economic_contribution.evidence_object_ids,
      },
      shared_use: {
        has_value: refreshed.profile_input_lane_snapshot.shared_use.has_value,
        value: refreshed.profile_input_lane_snapshot.shared_use.value,
        evidence_object_ids:
          refreshed.profile_input_lane_snapshot.shared_use.evidence_object_ids,
      },
      shared_intent: {
        has_value: refreshed.profile_input_lane_snapshot.shared_intent.has_value,
        value: refreshed.profile_input_lane_snapshot.shared_intent.value,
        evidence_object_ids:
          refreshed.profile_input_lane_snapshot.shared_intent.evidence_object_ids,
      },
    },
    expected.profile_input_lane_snapshot,
  );
  assert.equal(refreshed.release_gate, "blocked");
  assert.equal(refreshed.release_gate_reason_code, incompleteReasonCode);
  assert.deepEqual(refreshed.profile_input_summary.missing_value_lane_keys, [
    "shared_use",
    "shared_intent",
  ]);
  assert.equal(refreshed.profile_input_summary.lanes_with_support_count, 1);
  assert.deepEqual(refreshed.profile_input_summary.missing_support_lane_keys, [
    "shared_use",
    "shared_intent",
  ]);
});

test("complete SWE_BODELNING inputs preserve the current blocked baseline behavior", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-complete", createCompleteProfileInputs(), { storageDir });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-complete",
    createReleaseEvalSeed(),
    { storageDir },
  );

  assert.equal(persisted.release_gate, canonicalBaseline.release_gate);
  assert.equal(
    persisted.release_gate_reason_code,
    canonicalBaseline.release_gate_reason_code,
  );
  assert.equal(
    persisted.release_eval_freshness,
    canonicalBaseline.release_eval_freshness,
  );
  assert.equal(
    persisted.release_eval_freshness_reason_code,
    currentFreshnessReasonCode,
  );
  assert.deepEqual(persisted.profile_input_summary.missing_value_lane_keys, []);
  assert.equal(persisted.profile_input_summary.lanes_with_support_count, 3);
  assert.deepEqual(persisted.profile_input_summary.missing_support_lane_keys, []);
});

test("input-incomplete cases still use the input-incomplete reason and are not remapped", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-input-priority", createProfileInputs(), { storageDir });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-input-priority",
    createReleaseEvalSeed(),
    { storageDir },
  );

  assert.equal(persisted.release_gate, "blocked");
  assert.equal(persisted.release_gate_reason_code, incompleteReasonCode);
  assert.deepEqual(persisted.profile_input_summary.missing_value_lane_keys, ["shared_intent"]);
  assert.deepEqual(persisted.profile_input_summary.missing_support_lane_keys, ["shared_intent"]);
});

test("existing release eval read helper returns the persisted support metadata unchanged", async () => {
  const storageDir = createStorageDir();
  const profileInputs = createValueCompleteButSupportIncompleteProfileInputs();

  await upsertCaseProfileInputs("case-4", profileInputs, { storageDir });

  const persisted = await refreshCaseReleaseEvalRun(
    "case-4",
    createReleaseEvalSeed(),
    { storageDir },
  );

  const latest = await getLatestCaseReleaseEvalRun("case-4", { storageDir });

  assert.deepEqual(latest, persisted);
  assert.equal(latest.evaluator_version, canonicalEvaluatorVersion);
  assert.equal(latest.release_gate_reason_code, supportIncompleteReasonCode);
  assert.deepEqual(latest.profile_dossier_snapshot, persisted.profile_dossier_snapshot);
  assert.deepEqual(latest.profile_input_summary.missing_value_lane_keys, []);
  assert.equal(latest.profile_input_summary.lanes_with_support_count, 2);
  assert.deepEqual(latest.profile_input_summary.missing_support_lane_keys, ["shared_use"]);
  assert.equal(latest.profile_input_lane_snapshot.economic_contribution.has_support, true);
  assert.equal(latest.profile_input_lane_snapshot.shared_use.has_support, false);
});

test("non-SWE_BODELNING profiles remain unchanged", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-5", createProfileInputs(), { storageDir });

  await assert.rejects(
    refreshCaseReleaseEvalRun(
      "case-5",
      createReleaseEvalSeed({
        jurisdiction_profile_key: "SWE_OTHER",
      }),
      { storageDir },
    ),
    (error) => {
      assert.equal(error.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE");
      return true;
    },
  );
});

test("no final export behavior is introduced", () => {
  const exportWorkerPath = path.join(__dirname, "..", "workers", "export");
  assert.equal(fs.existsSync(exportWorkerPath), false);
});
