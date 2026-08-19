const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/swe-bodelning-export-package-bundle-manifest-projection.json");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageBundleManifest,
  deriveSWEBodelningExportPackageBundleManifestSnapshotStatus,
  deriveSWEBodelningExportPackageBundleManifestVersion,
  deriveSWEBodelningExportPackageDocxArtifact,
  deriveSWEBodelningExportPackageJsonArtifact,
  deriveSWEBodelningExportPackageMarkdownArtifact,
  deriveSWEBodelningExportPackagePdfArtifact,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
  resolveSWEBodelningExportPackageBundleManifestProjection,
} = require("../packages/governance/src/index.js");
const {
  sweBodelningExportPackageBundleManifestProjection,
  validateSWEBodelningExportPackageBundleManifestProjection,
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

test("the bundle/package manifest projection schema includes the read-time snapshot_status surface", () => {
  assert.deepEqual(schema.required, [
    "jurisdiction_profile_key",
    "package_version",
    "export_version",
    "dossier_fingerprint",
    "canonical_source",
    "generated_at",
    "artifacts",
    "snapshot_status",
  ]);
  assert.deepEqual(
    schema.properties.snapshot_status.required,
    [
      "source",
      "snapshot_package_version_found",
      "current_package_version",
      "snapshot_is_current",
    ],
  );
  assert.deepEqual(
    schema.properties.snapshot_status.properties.source.enum,
    ["persisted-current", "persisted-stale"],
  );
});

test("packages/schemas exports the SWE_BODELNING bundle/package manifest projection schema", () => {
  assert.deepEqual(sweBodelningExportPackageBundleManifestProjection, schema);
});

test("current manifest snapshot yields snapshot_status.source = persisted-current", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const artifactSnapshots = createCurrentArtifactSnapshots(exportPackage);
  const bundleManifest = deriveSWEBodelningExportPackageBundleManifest(
    exportPackage,
    artifactSnapshots,
    { generated_at: canonicalBundleGeneratedAt },
  );
  const projection = resolveSWEBodelningExportPackageBundleManifestProjection(
    bundleManifest,
    exportPackage,
    artifactSnapshots,
  );

  assert.equal(projection.snapshot_status.source, "persisted-current");
  assert.equal(projection.snapshot_status.snapshot_is_current, true);
  assert.equal(
    projection.snapshot_status.snapshot_package_version_found,
    bundleManifest.package_version,
  );
  assert.equal(
    projection.snapshot_status.current_package_version,
    deriveSWEBodelningExportPackageBundleManifestVersion(),
  );
  assert.deepEqual(
    validateSWEBodelningExportPackageBundleManifestProjection(projection),
    projection,
  );
});

test("stale manifest snapshot yields snapshot_status.source = persisted-stale when export-package/artifact/dossier drift occurs", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const bundleManifest = deriveSWEBodelningExportPackageBundleManifest(
    exportPackage,
    createCurrentArtifactSnapshots(exportPackage),
    { generated_at: canonicalBundleGeneratedAt },
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
  const projection = resolveSWEBodelningExportPackageBundleManifestProjection(
    bundleManifest,
    changedExportPackage,
    createCurrentArtifactSnapshots(changedExportPackage),
  );

  assert.equal(projection.snapshot_status.source, "persisted-stale");
  assert.equal(projection.snapshot_status.snapshot_is_current, false);
  assert.equal(
    projection.snapshot_status.snapshot_package_version_found,
    bundleManifest.package_version,
  );
  assert.equal(
    projection.snapshot_status.current_package_version,
    deriveSWEBodelningExportPackageBundleManifestVersion(),
  );
  assert.notEqual(
    bundleManifest.dossier_fingerprint,
    changedExportPackage.dossier_fingerprint,
  );
});

test("snapshot_status correctly reports found/current package version values when package_version is older", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const artifactSnapshots = createCurrentArtifactSnapshots(exportPackage);
  const olderBundleManifest = {
    ...deriveSWEBodelningExportPackageBundleManifest(
      exportPackage,
      artifactSnapshots,
      { generated_at: canonicalBundleGeneratedAt },
    ),
    package_version: "swe-bodelning-export-bundle-manifest-v0",
  };
  const projection = resolveSWEBodelningExportPackageBundleManifestProjection(
    olderBundleManifest,
    exportPackage,
    artifactSnapshots,
  );

  assert.deepEqual(
    deriveSWEBodelningExportPackageBundleManifestSnapshotStatus(
      olderBundleManifest,
      exportPackage,
      artifactSnapshots,
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

test("docs minimally describe the bundle/package manifest projection surface", () => {
  assert.match(
    docsText,
    /schemas\/swe-bodelning-export-package-bundle-manifest-projection\.json/,
  );
  assert.match(docsText, /bundle\/package manifest read route/);
  assert.match(docsText, /machine-readable top-level `snapshot_status` block/);
});

test("non-SWE_BODELNING profiles remain unchanged", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const bundleManifest = deriveSWEBodelningExportPackageBundleManifest(
    exportPackage,
    createCurrentArtifactSnapshots(exportPackage),
    { generated_at: canonicalBundleGeneratedAt },
  );

  assert.throws(
    () =>
      resolveSWEBodelningExportPackageBundleManifestProjection(
        {
          ...bundleManifest,
          jurisdiction_profile_key: "SWE_OTHER",
        },
        exportPackage,
        createCurrentArtifactSnapshots(exportPackage),
      ),
    (error) =>
      error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE" ||
      error.code === "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_PROJECTION_INVALID",
  );
});

test("no readiness behavior changes are introduced", () => {
  assert.match(
    docsText,
    /without route-local bundle\/package manifest recomputation or silent refresh/,
  );
  assert.match(
    docsText,
    /No zip\/pdf\/docx\/file generation or final output packaging is introduced in these export package slices/,
  );
});
