const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/swe-bodelning-export-package-bundle-archive-artifact-projection.json");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageBundleArchiveArtifact,
  deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus,
  deriveSWEBodelningExportPackageBundleManifest,
  deriveSWEBodelningExportPackageBundleManifestFingerprint,
  deriveSWEBodelningExportPackageBundleManifestVersion,
  deriveSWEBodelningExportPackageDocxArtifact,
  deriveSWEBodelningExportPackageJsonArtifact,
  deriveSWEBodelningExportPackageMarkdownArtifact,
  deriveSWEBodelningExportPackagePdfArtifact,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
  resolveSWEBodelningExportPackageBundleArchiveArtifactProjection,
  resolveSWEBodelningExportPackageBundleManifestProjection,
} = require("../packages/governance/src/index.js");
const {
  sweBodelningExportPackageBundleArchiveArtifactProjection,
  validateSWEBodelningExportPackageBundleArchiveArtifactProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-24T10:00:00.000Z";
const canonicalGeneratedAt = "2026-03-24T12:00:00.000Z";
const canonicalBundleGeneratedAt = "2026-03-24T13:00:00.000Z";

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
    profile_dossier_snapshot: deriveSWEBodelningProfileDossierSnapshot(releaseEvalRun, {
      persisted_at: canonicalPersistedAt,
    }),
  };
}

function createCurrentArtifactSnapshots(exportPackage) {
  return {
    jsonArtifactSnapshot: deriveSWEBodelningExportPackageJsonArtifact(exportPackage),
    markdownArtifactSnapshot: deriveSWEBodelningExportPackageMarkdownArtifact(exportPackage),
    pdfArtifactSnapshot: deriveSWEBodelningExportPackagePdfArtifact(exportPackage),
    docxArtifactSnapshot: deriveSWEBodelningExportPackageDocxArtifact(exportPackage),
  };
}

function createCurrentBundleManifestProjection(exportPackage, artifactSnapshots, generatedAt) {
  const bundleManifest = deriveSWEBodelningExportPackageBundleManifest(
    exportPackage,
    artifactSnapshots,
    { generated_at: generatedAt },
  );

  return resolveSWEBodelningExportPackageBundleManifestProjection(
    bundleManifest,
    exportPackage,
    artifactSnapshots,
  );
}

test("the final bundle/archive artifact projection schema includes the read-time snapshot_status surface", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_base64",
    "package_version",
    "bundle_manifest_fingerprint",
    "snapshot_status",
  ]);
  assert.deepEqual(schema.properties.snapshot_status.required, [
    "source",
    "snapshot_package_version_found",
    "current_package_version",
    "snapshot_is_current",
  ]);
  assert.deepEqual(schema.properties.snapshot_status.properties.source.enum, [
    "persisted-current",
    "persisted-stale",
  ]);
});

test("packages/schemas exports the SWE_BODELNING final bundle/archive artifact projection schema", () => {
  assert.deepEqual(sweBodelningExportPackageBundleArchiveArtifactProjection, schema);
});

test("current final archive artifact snapshot yields snapshot_status.source = persisted-current", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const artifactSnapshots = createCurrentArtifactSnapshots(exportPackage);
  const currentBundleManifestProjection = createCurrentBundleManifestProjection(
    exportPackage,
    artifactSnapshots,
    canonicalBundleGeneratedAt,
  );
  const { snapshot_status: currentManifestSnapshotStatus, ...currentBundleManifestFields } =
    currentBundleManifestProjection;
  const archiveArtifact = deriveSWEBodelningExportPackageBundleArchiveArtifact(
    currentBundleManifestFields,
    artifactSnapshots,
  );
  const projection = resolveSWEBodelningExportPackageBundleArchiveArtifactProjection(
    archiveArtifact,
    currentBundleManifestProjection,
  );

  assert.equal(currentManifestSnapshotStatus.snapshot_is_current, true);
  assert.equal(projection.snapshot_status.source, "persisted-current");
  assert.equal(projection.snapshot_status.snapshot_is_current, true);
  assert.equal(
    projection.snapshot_status.snapshot_package_version_found,
    archiveArtifact.package_version,
  );
  assert.equal(
    projection.snapshot_status.current_package_version,
    deriveSWEBodelningExportPackageBundleManifestVersion(),
  );
  assert.deepEqual(
    validateSWEBodelningExportPackageBundleArchiveArtifactProjection(projection),
    projection,
  );
});

test("stale final archive artifact snapshot yields snapshot_status.source = persisted-stale when manifest/dossier drift occurs", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const artifactSnapshots = createCurrentArtifactSnapshots(exportPackage);
  const persistedBundleManifest = deriveSWEBodelningExportPackageBundleManifest(
    exportPackage,
    artifactSnapshots,
    { generated_at: canonicalBundleGeneratedAt },
  );
  const archiveArtifact = deriveSWEBodelningExportPackageBundleArchiveArtifact(
    persistedBundleManifest,
    artifactSnapshots,
  );
  const changedReleaseEvalRun = createValidReleaseEvalRun({
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
  const changedExportPackage = deriveSWEBodelningExportPackage(changedReleaseEvalRun, {
    generated_at: "2026-03-24T14:00:00.000Z",
  });
  const changedArtifactSnapshots = createCurrentArtifactSnapshots(changedExportPackage);
  const currentBundleManifestProjection = createCurrentBundleManifestProjection(
    changedExportPackage,
    changedArtifactSnapshots,
    "2026-03-24T15:00:00.000Z",
  );
  const { snapshot_status: currentManifestSnapshotStatus, ...currentBundleManifestFields } =
    currentBundleManifestProjection;
  const projection = resolveSWEBodelningExportPackageBundleArchiveArtifactProjection(
    archiveArtifact,
    currentBundleManifestProjection,
  );

  assert.equal(currentManifestSnapshotStatus.snapshot_is_current, true);
  assert.equal(projection.snapshot_status.source, "persisted-stale");
  assert.equal(projection.snapshot_status.snapshot_is_current, false);
  assert.equal(
    projection.snapshot_status.snapshot_package_version_found,
    archiveArtifact.package_version,
  );
  assert.equal(
    projection.snapshot_status.current_package_version,
    deriveSWEBodelningExportPackageBundleManifestVersion(),
  );
  assert.notEqual(
    archiveArtifact.bundle_manifest_fingerprint,
    deriveSWEBodelningExportPackageBundleManifestFingerprint(currentBundleManifestFields),
  );
  assert.notEqual(
    persistedBundleManifest.dossier_fingerprint,
    currentBundleManifestFields.dossier_fingerprint,
  );
});

test("snapshot_status correctly reports found/current package version values when package_version is older", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const artifactSnapshots = createCurrentArtifactSnapshots(exportPackage);
  const currentBundleManifestProjection = createCurrentBundleManifestProjection(
    exportPackage,
    artifactSnapshots,
    canonicalBundleGeneratedAt,
  );
  const { snapshot_status: _currentManifestSnapshotStatus, ...currentBundleManifestFields } =
    currentBundleManifestProjection;
  const olderArchiveArtifact = {
    ...deriveSWEBodelningExportPackageBundleArchiveArtifact(
      currentBundleManifestFields,
      artifactSnapshots,
    ),
    package_version: "swe-bodelning-export-bundle-manifest-v0",
  };
  const projection = resolveSWEBodelningExportPackageBundleArchiveArtifactProjection(
    olderArchiveArtifact,
    currentBundleManifestProjection,
  );

  assert.deepEqual(
    deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus(
      olderArchiveArtifact,
      currentBundleManifestProjection,
    ),
    projection.snapshot_status,
  );
  assert.equal(projection.snapshot_status.source, "persisted-stale");
  assert.equal(
    projection.snapshot_status.snapshot_package_version_found,
    "swe-bodelning-export-bundle-manifest-v0",
  );
  assert.equal(
    projection.snapshot_status.current_package_version,
    deriveSWEBodelningExportPackageBundleManifestVersion(),
  );
});

test("docs minimally describe the final bundle/archive artifact projection surface", () => {
  assert.match(
    docsText,
    /schemas\/swe-bodelning-export-package-bundle-archive-artifact-projection\.json/,
  );
  assert.match(docsText, /final bundle\/archive artifact read route/i);
  assert.match(docsText, /machine-readable top-level `snapshot_status` block/);
});

test("no readiness behavior changes are introduced", () => {
  assert.match(
    docsText,
    /without route-local archive recomputation, delivery behavior, additional package assembly, or silent refresh/i,
  );
  assert.match(
    docsText,
    /No zip\/pdf\/docx\/file generation or final output packaging is introduced in these export package slices/,
  );
});
