const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const databaseIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "database",
  "src",
  "index.js",
);
const databaseIndexText = fs.readFileSync(databaseIndexPath, "utf8");

const {
  getLatestCaseReleaseEvalRun,
  persistCaseReleaseEvalRun,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  deriveSWEBodelningProfileDossierCanonicalSource,
  deriveSWEBodelningProfileDossierFingerprint,
  deriveSWEBodelningProfileDossierProjectionVersion,
  deriveSWEBodelningProfileDossierSnapshotStatus,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
  resolveSWEBodelningProfileDossierProjection,
  hasSchemaValidSWEBodelningProfileDossierSnapshot,
  resolveSWEBodelningProfileDossierSnapshot,
} = require("../packages/governance/src/index.js");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const staleFreshnessReasonCode = "evaluator-version-mismatch";
const profileInputContextMismatchReasonCode = "profile-input-context-mismatch";

function createStorageDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "governance-contracts-release-eval-"));
}

function rewriteStoredProfileInputRecord(storageDir, caseId, transformRecord) {
  const storePath = path.join(storageDir, "case-profile-inputs.json");
  const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
  store[caseId] = transformRecord(store[caseId]);
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
}

function rewriteStoredReleaseEvalRecord(storageDir, caseId, transformRecord) {
  const storePath = path.join(storageDir, "release-eval-runs.json");
  const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
  const caseRuns = store[caseId];
  const latestIndex = caseRuns.length - 1;
  caseRuns[latestIndex] = transformRecord(caseRuns[latestIndex]);
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
}

function createProfileDossierSnapshot(releaseEvalRun) {
  const snapshot = {
    jurisdiction_profile_key: releaseEvalRun.jurisdiction_profile_key,
    projection_version: deriveSWEBodelningProfileDossierProjectionVersion(),
    canonical_source: deriveSWEBodelningProfileDossierCanonicalSource(
      releaseEvalRun,
      {
        persisted_at: "2026-03-23T10:00:00.000Z",
      },
    ),
    release_gate: releaseEvalRun.release_gate,
    release_gate_reason_code: releaseEvalRun.release_gate_reason_code,
    release_eval_freshness: releaseEvalRun.release_eval_freshness,
    release_eval_freshness_reason_code: releaseEvalRun.release_eval_freshness_reason_code,
    evaluator_version: releaseEvalRun.evaluator_version,
    profile_input_summary: releaseEvalRun.profile_input_summary,
    profile_input_lane_snapshot: releaseEvalRun.profile_input_lane_snapshot,
  };

  return {
    ...snapshot,
    dossier_fingerprint: deriveSWEBodelningProfileDossierFingerprint(snapshot),
  };
}

function createValidReleaseEvalRun(overrides = {}) {
  const releaseEvalRun = {
    jurisdiction_profile_key: "SWE_BODELNING",
    release_eval_run_id: "release-eval-run-1",
    evaluator_version: canonicalEvaluatorVersion,
    release_gate: canonicalBaseline.release_gate,
    release_gate_reason_code: canonicalBaseline.release_gate_reason_code,
    release_eval_freshness: canonicalBaseline.release_eval_freshness,
    release_eval_freshness_reason_code: currentFreshnessReasonCode,
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
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
        has_support: true,
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
        has_support: false,
      },
    },
    ...overrides,
  };

  return {
    ...releaseEvalRun,
    profile_dossier_snapshot:
      releaseEvalRun.jurisdiction_profile_key === "SWE_BODELNING"
        ? deriveSWEBodelningProfileDossierSnapshot(releaseEvalRun, {
            persisted_at: "2026-03-23T10:00:00.000Z",
          })
        : createProfileDossierSnapshot(releaseEvalRun),
  };
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

test("docs freeze the case-level persisted release_eval_run seam as a distinct canonical persistence seam", () => {
  assert.match(
    docsText,
    /Case-Level Persisted Release Eval Run Seam Freeze/i,
  );
  assert.match(
    docsText,
    /case-level persisted `release_eval_run` seam is now frozen as the canonical persistence boundary for this exact stored surface/i,
  );
  assert.match(
    docsText,
    /only currently evidenced persistence surfaces in this freeze are `getLatestCaseReleaseEvalRun`, `persistCaseReleaseEvalRun`, and `refreshCaseReleaseEvalRun`/i,
  );
  assert.match(
    docsText,
    /persisted case-level canonical release_eval_run latest-read behavior/i,
  );
  assert.match(
    docsText,
    /persisted latest-read via the existing `getLatestCaseReleaseEvalRun` boundary/i,
  );
  assert.match(
    docsText,
    /persisted write via the existing `persistCaseReleaseEvalRun` boundary/i,
  );
  assert.match(
    docsText,
    /persisted refresh via the existing `refreshCaseReleaseEvalRun` boundary/i,
  );
  assert.match(
    docsText,
    /existing canonical release_eval validation\/canonicalization and persisted-at handling already evidenced inside that persistence path/i,
  );
  assert.match(
    docsText,
    /separate from the thin authenticated `GET \/cases\/:caseId\/release-eval\/latest` latest-read seam, the thin authenticated `GET \/cases\/:caseId\/profile-dossier` read\/projection seam, the thin authenticated `GET \/cases\/:caseId\/profile-inputs` read seam, and the thin authenticated `PATCH \/cases\/:caseId\/profile-inputs` write seam/i,
  );
  assert.match(
    docsText,
    /does not itself define route-edge authentication or API error-envelope behavior/i,
  );
  assert.match(
    docsText,
    /does not itself define `profile_dossier` projection semantics, `profile_inputs` persistence semantics, `export_package` persistence semantics, or broader governance derivation\/rebuild ownership beyond the exact stored `release_eval_run` boundary already evidenced here/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this persistence seam into route behavior, dossier projection, `profile_inputs`\/`export_package` persistence, or broader derivation\/rebuild work should be introduced/i,
  );
  assert.match(
    docsText,
    /seam should remain a thin case-level persisted canonical `release_eval_run` boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(databaseIndexText, /async function getLatestCaseReleaseEvalRun\(/);
  assert.match(databaseIndexText, /async function persistCaseReleaseEvalRun\(/);
  assert.match(databaseIndexText, /async function refreshCaseReleaseEvalRun\(/);
  assert.match(
    databaseIndexText,
    /const latestReleaseEvalRun = latestReleaseEvalRecord\.release_eval_payload;/,
  );
  assert.match(
    databaseIndexText,
    /return attachPersistedReleaseEvalRun\(latestReleaseEvalRun, caseProfileInputs, \{\s+persisted_at: latestReleaseEvalRecord\.persisted_at,\s+\}\);/s,
  );
  assert.match(
    databaseIndexText,
    /const canonicalReleaseEvalRun = validateReleaseEvalRun\(releaseEvalRunForPersistence\);/,
  );
  assert.match(
    databaseIndexText,
    /caseRuns\.push\(normalizeReleaseEvalRecord\(caseId, canonicalReleaseEvalRun, persistedAt\)\);/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalReleaseEvalRun = deriveReleaseEvalRun\(\s+releaseEvalSeed,\s+caseProfileInputs,\s+\{ persisted_at: persistedAt \},\s+\);/s,
  );
  assert.match(
    databaseIndexText,
    /return persistCaseReleaseEvalRun\(caseId, canonicalReleaseEvalRun, \{\s+\.\.\.options,\s+persisted_at: persistedAt,\s+\}\);/s,
  );
  assert.match(databaseIndexText, /async function getLatestCaseProfileDossierProjection\(/);
  assert.match(databaseIndexText, /async function getLatestCaseExportPackageSnapshot\(/);
});

test("valid release_eval_run payload roundtrips through persistence", async () => {
  const storageDir = createStorageDir();
  const payload = createValidReleaseEvalRun();

  const persisted = await persistCaseReleaseEvalRun("case-1", payload, { storageDir });
  const latest = await getLatestCaseReleaseEvalRun("case-1", { storageDir });

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
  assert.deepEqual(latest.profile_dossier_snapshot, payload.profile_dossier_snapshot);
});

test("unchanged SWE_BODELNING profile inputs remain current", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-current", createProfileInputs(), { storageDir });

  const persisted = await persistCaseReleaseEvalRun(
    "case-current",
    createValidReleaseEvalRun(),
    { storageDir },
  );
  const latest = await getLatestCaseReleaseEvalRun("case-current", { storageDir });

  assert.equal(latest.release_eval_freshness, "current");
  assert.equal(latest.release_eval_freshness_reason_code, currentFreshnessReasonCode);
  assert.deepEqual(latest, persisted);
});

test("a current-version schema-valid snapshot is reused as-is", async () => {
  const releaseEvalRun = createValidReleaseEvalRun();

  assert.equal(
    hasSchemaValidSWEBodelningProfileDossierSnapshot(releaseEvalRun),
    true,
  );

  const resolvedSnapshot = resolveSWEBodelningProfileDossierSnapshot(releaseEvalRun, {
    persisted_at: releaseEvalRun.profile_dossier_snapshot.canonical_source.persisted_at,
  });
  const resolvedProjection = resolveSWEBodelningProfileDossierProjection(releaseEvalRun, {
    persisted_at: releaseEvalRun.profile_dossier_snapshot.canonical_source.persisted_at,
  });

  assert.strictEqual(resolvedSnapshot, releaseEvalRun.profile_dossier_snapshot);
  assert.deepEqual(
    resolvedProjection.issue_index,
    releaseEvalRun.profile_dossier_snapshot.issue_index,
  );
  assert.deepEqual(
    resolvedProjection.section_index,
    releaseEvalRun.profile_dossier_snapshot.section_index,
  );
  assert.deepEqual(
    resolvedProjection.evidence_reference_index,
    releaseEvalRun.profile_dossier_snapshot.evidence_reference_index,
  );
  assert.deepEqual(
    resolvedProjection.evidence_exhibit_index,
    releaseEvalRun.profile_dossier_snapshot.evidence_exhibit_index,
  );
  assert.deepEqual(
    resolvedProjection.profile_input_lane_snapshot,
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot,
  );
  assert.deepEqual(resolvedProjection.snapshot_status, {
    source: "persisted-current",
    snapshot_projection_version_found:
      deriveSWEBodelningProfileDossierProjectionVersion(),
    current_projection_version:
      deriveSWEBodelningProfileDossierProjectionVersion(),
    snapshot_is_current: true,
  });
});

test("an older projection_version triggers shared-governance fallback/reprojection", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-dossier-fallback", createProfileInputs(), {
    storageDir,
  });
  const persisted = await refreshCaseReleaseEvalRun(
    "case-dossier-fallback",
    {
      jurisdiction_profile_key: "SWE_BODELNING",
      release_eval_run_id: "release-eval-run-dossier-fallback",
    },
    { storageDir },
  );

  rewriteStoredReleaseEvalRecord(storageDir, "case-dossier-fallback", (record) => ({
    ...record,
    release_eval_payload: {
      ...record.release_eval_payload,
      profile_dossier_snapshot: {
        ...record.release_eval_payload.profile_dossier_snapshot,
        projection_version: "swe-bodelning-profile-dossier-v0",
        dossier_fingerprint: "legacy-dossier-fingerprint",
      },
    },
  }));

  const latest = await getLatestCaseReleaseEvalRun("case-dossier-fallback", {
    storageDir,
  });

  assert.equal(
    latest.profile_dossier_snapshot.projection_version,
    deriveSWEBodelningProfileDossierProjectionVersion(),
  );
  assert.notEqual(
    latest.profile_dossier_snapshot.dossier_fingerprint,
    "legacy-dossier-fingerprint",
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot,
    deriveSWEBodelningProfileDossierSnapshot(latest, {
      persisted_at: persisted.profile_dossier_snapshot.canonical_source.persisted_at,
    }),
  );
  assert.deepEqual(latest.profile_dossier_snapshot.issue_index, [
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
  assert.deepEqual(latest.profile_dossier_snapshot.section_index, [
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
  assert.deepEqual(latest.profile_dossier_snapshot.evidence_reference_index, [
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
  assert.deepEqual(latest.profile_dossier_snapshot.evidence_exhibit_index, [
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
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_reference_refs,
    ["REF-001"],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_exhibit_refs,
    ["EX-001"],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.related_issue_refs,
    [],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.related_section_refs,
    [],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_reference_refs,
    ["REF-002"],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_exhibit_refs,
    ["EX-002"],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.related_issue_refs,
    [],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.related_section_refs,
    [],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.supporting_reference_refs,
    [],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.supporting_exhibit_refs,
    [],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_issue_refs,
    ["ISS-001", "ISS-002"],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_section_refs,
    ["SEC-001", "SEC-002"],
  );
  assert.deepEqual(
    deriveSWEBodelningProfileDossierSnapshotStatus({
      ...latest,
      profile_dossier_snapshot: {
        ...latest.profile_dossier_snapshot,
        projection_version: "swe-bodelning-profile-dossier-v0",
      },
    }),
    {
      source: "fallback-reprojection",
      snapshot_projection_version_found: "swe-bodelning-profile-dossier-v0",
      current_projection_version: deriveSWEBodelningProfileDossierProjectionVersion(),
      snapshot_is_current: false,
    },
  );
});

test("a schema-invalid current-version snapshot triggers shared-governance fallback/reprojection", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-dossier-invalid", createProfileInputs(), {
    storageDir,
  });
  const persisted = await refreshCaseReleaseEvalRun(
    "case-dossier-invalid",
    {
      jurisdiction_profile_key: "SWE_BODELNING",
      release_eval_run_id: "release-eval-run-dossier-invalid",
    },
    { storageDir },
  );

  rewriteStoredReleaseEvalRecord(storageDir, "case-dossier-invalid", (record) => ({
    ...record,
    release_eval_payload: {
      ...record.release_eval_payload,
      profile_dossier_snapshot: {
        ...record.release_eval_payload.profile_dossier_snapshot,
        dossier_fingerprint: "",
      },
    },
  }));

  const latest = await getLatestCaseReleaseEvalRun("case-dossier-invalid", {
    storageDir,
  });

  assert.equal(
    latest.profile_dossier_snapshot.projection_version,
    deriveSWEBodelningProfileDossierProjectionVersion(),
  );
  assert.notEqual(latest.profile_dossier_snapshot.dossier_fingerprint, "");
  assert.deepEqual(
    latest.profile_dossier_snapshot,
    deriveSWEBodelningProfileDossierSnapshot(latest, {
      persisted_at: persisted.profile_dossier_snapshot.canonical_source.persisted_at,
    }),
  );
  assert.deepEqual(latest.profile_dossier_snapshot.issue_index, [
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
  assert.deepEqual(latest.profile_dossier_snapshot.section_index, [
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
  assert.deepEqual(latest.profile_dossier_snapshot.evidence_exhibit_index, [
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
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_exhibit_refs,
    ["EX-001"],
  );
  assert.deepEqual(
    latest.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.related_section_refs,
    [],
  );
  const latestProjection = resolveSWEBodelningProfileDossierProjection(
    {
      ...latest,
      profile_dossier_snapshot: {
        ...latest.profile_dossier_snapshot,
        dossier_fingerprint: "",
      },
    },
    {
      persisted_at: persisted.profile_dossier_snapshot.canonical_source.persisted_at,
    },
  );
  assert.deepEqual(latestProjection.snapshot_status, {
    source: "fallback-reprojection",
    snapshot_projection_version_found:
      deriveSWEBodelningProfileDossierProjectionVersion(),
    current_projection_version: deriveSWEBodelningProfileDossierProjectionVersion(),
    snapshot_is_current: false,
  });
  assert.deepEqual(
    latestProjection.profile_input_lane_snapshot.shared_intent.related_section_refs,
    ["SEC-001", "SEC-002"],
  );
});

test("unresolved issues produce empty related_section_refs rather than bogus refs", () => {
  const releaseEvalRun = createValidReleaseEvalRun({
    release_eval_freshness: "stale",
    release_eval_freshness_reason_code: "custom-unmapped-freshness-reason",
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 3,
      missing_value_lane_keys: [],
      lanes_with_support_count: 3,
      missing_support_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
        has_support: true,
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
        has_support: true,
      },
      shared_intent: {
        has_value: true,
        value: "co-acquisition",
        evidence_object_ids: ["evidence-3"],
        has_support: true,
      },
    },
  });

  assert.deepEqual(releaseEvalRun.profile_dossier_snapshot.issue_index, [
    {
      issue_ref: "ISS-001",
      issue_code: "custom-unmapped-freshness-reason",
      blocking: true,
      related_lane_keys: [],
      related_reference_refs: [],
      related_section_refs: [],
      related_exhibit_refs: [],
    },
  ]);
  assert.deepEqual(releaseEvalRun.profile_dossier_snapshot.section_index, [
    {
      section_ref: "SEC-001",
      section_key: "release_status",
      section_order: 1,
      present: true,
      related_issue_refs: [],
      related_lane_keys: [],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
    {
      section_ref: "SEC-002",
      section_key: "profile_inputs",
      section_order: 2,
      present: true,
      related_issue_refs: [],
      related_lane_keys: [],
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
  assert.deepEqual(releaseEvalRun.profile_dossier_snapshot.evidence_reference_index, [
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
    {
      reference_ref: "REF-003",
      evidence_object_id: "evidence-3",
      supporting_lane_keys: ["shared_intent"],
      related_issue_refs: [],
      related_section_refs: [],
      related_exhibit_refs: ["EX-003"],
    },
  ]);
  assert.deepEqual(releaseEvalRun.profile_dossier_snapshot.evidence_exhibit_index, [
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
    {
      exhibit_ref: "EX-003",
      evidence_object_id: "evidence-3",
      supporting_lane_keys: ["shared_intent"],
      related_lane_keys: ["shared_intent"],
      related_reference_refs: ["REF-003"],
      related_issue_refs: [],
      related_section_refs: [],
    },
  ]);
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_reference_refs,
    ["REF-001"],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_exhibit_refs,
    ["EX-001"],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.related_issue_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.related_section_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_reference_refs,
    ["REF-002"],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_exhibit_refs,
    ["EX-002"],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.related_issue_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.related_section_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.supporting_reference_refs,
    ["REF-003"],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.supporting_exhibit_refs,
    ["EX-003"],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_issue_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_section_refs,
    [],
  );
});

test("related_reference_refs are derived from canonical lane supporting references", () => {
  const releaseEvalRun = createValidReleaseEvalRun({
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_use"],
      lanes_with_support_count: 3,
      missing_support_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
        has_support: true,
      },
      shared_use: {
        has_value: false,
        value: null,
        evidence_object_ids: ["evidence-2"],
        has_support: true,
      },
      shared_intent: {
        has_value: true,
        value: "co-acquisition",
        evidence_object_ids: ["evidence-3"],
        has_support: true,
      },
    },
  });

  assert.deepEqual(releaseEvalRun.profile_dossier_snapshot.issue_index, [
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

test("section related_reference_refs are derived from canonical exhibit related references", () => {
  const releaseEvalRun = createValidReleaseEvalRun({
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_use"],
      lanes_with_support_count: 3,
      missing_support_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
        has_support: true,
      },
      shared_use: {
        has_value: false,
        value: null,
        evidence_object_ids: ["evidence-2"],
        has_support: true,
      },
      shared_intent: {
        has_value: true,
        value: "co-acquisition",
        evidence_object_ids: ["evidence-3"],
        has_support: true,
      },
    },
  });

  assert.deepEqual(releaseEvalRun.profile_dossier_snapshot.section_index, [
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

test("supporting_reference_refs, supporting_exhibit_refs, related_reference_refs, and exhibit indexes are deterministic and deduplicated", () => {
  const releaseEvalRun = createValidReleaseEvalRun({
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 3,
      missing_value_lane_keys: [],
      lanes_with_support_count: 3,
      missing_support_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-b", "evidence-a"],
        has_support: true,
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-a", "evidence-c"],
        has_support: true,
      },
      shared_intent: {
        has_value: true,
        value: "co-acquisition",
        evidence_object_ids: [],
        has_support: false,
      },
    },
  });

  assert.deepEqual(releaseEvalRun.profile_dossier_snapshot.evidence_reference_index, [
    {
      reference_ref: "REF-001",
      evidence_object_id: "evidence-a",
      supporting_lane_keys: ["economic_contribution", "shared_use"],
      related_issue_refs: [],
      related_section_refs: [],
      related_exhibit_refs: ["EX-001"],
    },
    {
      reference_ref: "REF-002",
      evidence_object_id: "evidence-b",
      supporting_lane_keys: ["economic_contribution"],
      related_issue_refs: [],
      related_section_refs: [],
      related_exhibit_refs: ["EX-002"],
    },
    {
      reference_ref: "REF-003",
      evidence_object_id: "evidence-c",
      supporting_lane_keys: ["shared_use"],
      related_issue_refs: [],
      related_section_refs: [],
      related_exhibit_refs: ["EX-003"],
    },
  ]);
  assert.deepEqual(releaseEvalRun.profile_dossier_snapshot.evidence_exhibit_index, [
    {
      exhibit_ref: "EX-001",
      evidence_object_id: "evidence-a",
      supporting_lane_keys: ["economic_contribution", "shared_use"],
      related_lane_keys: ["economic_contribution", "shared_use"],
      related_reference_refs: ["REF-001"],
      related_issue_refs: [],
      related_section_refs: [],
    },
    {
      exhibit_ref: "EX-002",
      evidence_object_id: "evidence-b",
      supporting_lane_keys: ["economic_contribution"],
      related_lane_keys: ["economic_contribution"],
      related_reference_refs: ["REF-002"],
      related_issue_refs: [],
      related_section_refs: [],
    },
    {
      exhibit_ref: "EX-003",
      evidence_object_id: "evidence-c",
      supporting_lane_keys: ["shared_use"],
      related_lane_keys: ["shared_use"],
      related_reference_refs: ["REF-003"],
      related_issue_refs: [],
      related_section_refs: [],
    },
  ]);
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_reference_refs,
    ["REF-001", "REF-002"],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.supporting_exhibit_refs,
    ["EX-001", "EX-002"],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.related_issue_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.economic_contribution.related_section_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_reference_refs,
    ["REF-001", "REF-003"],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.supporting_exhibit_refs,
    ["EX-001", "EX-003"],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.related_issue_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_use.related_section_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.supporting_reference_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.supporting_exhibit_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_issue_refs,
    [],
  );
  assert.deepEqual(
    releaseEvalRun.profile_dossier_snapshot.profile_input_lane_snapshot.shared_intent.related_section_refs,
    [],
  );
});

test("changed jurisdiction_profile_key makes the release_eval stale/non-current", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-profile-key-change", createProfileInputs(), {
    storageDir,
  });
  const persisted = await persistCaseReleaseEvalRun(
    "case-profile-key-change",
    createValidReleaseEvalRun(),
    { storageDir },
  );

  rewriteStoredProfileInputRecord(storageDir, "case-profile-key-change", (record) => ({
    ...record,
    jurisdiction_profile_key: "SWE_OTHER",
  }));

  const latest = await getLatestCaseReleaseEvalRun("case-profile-key-change", {
    storageDir,
  });

  assert.equal(latest.release_eval_run_id, persisted.release_eval_run_id);
  assert.equal(latest.release_eval_freshness, "stale");
  assert.equal(
    latest.release_eval_freshness_reason_code,
    profileInputContextMismatchReasonCode,
  );
  assert.equal(latest.jurisdiction_profile_key, "SWE_BODELNING");
});

test("older evaluator_version becomes stale/non-current at case level", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-2", createProfileInputs(), { storageDir });
  await persistCaseReleaseEvalRun("case-2", createValidReleaseEvalRun(), { storageDir });
  const persisted = await persistCaseReleaseEvalRun(
    "case-2",
    createValidReleaseEvalRun({
      release_eval_run_id: "release-eval-run-2",
      evaluator_version: "swe-bodelning-release-eval-v0",
      release_eval_freshness: "current",
      release_eval_freshness_reason_code: currentFreshnessReasonCode,
    }),
    { storageDir },
  );

  const latest = await getLatestCaseReleaseEvalRun("case-2", { storageDir });

  assert.equal(persisted.release_eval_run_id, "release-eval-run-2");
  assert.equal(latest.release_eval_run_id, "release-eval-run-2");
  assert.equal(latest.evaluator_version, "swe-bodelning-release-eval-v0");
  assert.equal(latest.release_eval_freshness, "stale");
  assert.equal(latest.release_eval_freshness_reason_code, staleFreshnessReasonCode);
  assert.deepEqual(latest, persisted);
});

test("changed lane value makes the release_eval stale/non-current", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-value-change", createProfileInputs(), { storageDir });
  const persisted = await persistCaseReleaseEvalRun(
    "case-value-change",
    createValidReleaseEvalRun(),
    { storageDir },
  );

  await upsertCaseProfileInputs(
    "case-value-change",
    createProfileInputs({
      profile_input_lane_snapshot: {
        economic_contribution: {
          has_value: true,
          value: "documented",
          evidence_object_ids: ["evidence-1"],
        },
        shared_use: {
          has_value: true,
          value: "holiday-home",
          evidence_object_ids: ["evidence-2"],
        },
        shared_intent: {
          has_value: false,
          value: null,
          evidence_object_ids: [],
        },
      },
    }),
    { storageDir },
  );

  const latest = await getLatestCaseReleaseEvalRun("case-value-change", {
    storageDir,
  });

  assert.equal(latest.release_eval_run_id, persisted.release_eval_run_id);
  assert.equal(latest.release_eval_freshness, "stale");
  assert.equal(
    latest.release_eval_freshness_reason_code,
    profileInputContextMismatchReasonCode,
  );
  assert.equal(latest.profile_input_lane_snapshot.shared_use.value, "residence");
  assert.deepEqual(
    latest.profile_input_lane_snapshot.shared_use.evidence_object_ids,
    ["evidence-2"],
  );
});

test("changed evidence_object_ids makes the release_eval stale/non-current", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-evidence-change", createProfileInputs(), {
    storageDir,
  });
  const persisted = await persistCaseReleaseEvalRun(
    "case-evidence-change",
    createValidReleaseEvalRun(),
    { storageDir },
  );

  await upsertCaseProfileInputs(
    "case-evidence-change",
    createProfileInputs({
      profile_input_lane_snapshot: {
        economic_contribution: {
          has_value: true,
          value: "documented",
          evidence_object_ids: ["evidence-9"],
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
    }),
    { storageDir },
  );

  const latest = await getLatestCaseReleaseEvalRun("case-evidence-change", {
    storageDir,
  });

  assert.equal(latest.release_eval_run_id, persisted.release_eval_run_id);
  assert.equal(latest.release_eval_freshness, "stale");
  assert.equal(
    latest.release_eval_freshness_reason_code,
    profileInputContextMismatchReasonCode,
  );
  assert.deepEqual(
    latest.profile_input_lane_snapshot.economic_contribution.evidence_object_ids,
    ["evidence-1"],
  );
});

test("invalid payload shape is rejected before persistence", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = createValidReleaseEvalRun();
  delete invalidPayload.release_eval_run_id;

  await assert.rejects(
    persistCaseReleaseEvalRun("case-3", invalidPayload, { storageDir }),
    (error) => {
      assert.equal(error.code, "ERR_RELEASE_EVAL_RUN_INVALID");
      return true;
    },
  );

  const latest = await getLatestCaseReleaseEvalRun("case-3", { storageDir });
  assert.equal(latest, null);
});

test("non-SWE_BODELNING behavior remains unchanged", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = createValidReleaseEvalRun({
    jurisdiction_profile_key: "SWE_OTHER",
  });

  await assert.rejects(
    persistCaseReleaseEvalRun("case-4", invalidPayload, { storageDir }),
    (error) => {
      assert.equal(error.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE");
      return true;
    },
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
