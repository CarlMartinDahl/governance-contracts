const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);

test("docs freeze the shared database record-normalization helper seam as the persisted record-shaping boundary", () => {
  assert.match(
    docsText,
    /Shared Database Record-Normalization Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/database\/src\/index\.js` `normalizeRecord`, `normalizeReleaseEvalRecord`, `normalizeExportPackageRecord`, `normalizeExportPackageBundleArchiveArtifactRecord`, `normalizeExportPackageBundleManifestRecord`, `normalizeExportPackageJsonArtifactRecord`, `normalizeExportPackageDocxArtifactRecord`, `normalizeExportPackagePdfArtifactRecord`, and `normalizeExportPackageMarkdownArtifactRecord` helpers are the canonical record-normalization boundary for the current included persistence writers below and are now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced included persistence writers in this freeze are limited to:\s+`upsertCaseProfileInputs`\s+`persistCaseReleaseEvalRun`\s+`persistCaseExportPackageSnapshot`\s+`persistCaseExportPackageBundleArchiveArtifactSnapshot`\s+`persistCaseExportPackageBundleManifestSnapshot`\s+`persistCaseExportPackageJsonArtifactSnapshot`\s+`persistCaseExportPackageDocxArtifactSnapshot`\s+`persistCaseExportPackagePdfArtifactSnapshot`\s+`persistCaseExportPackageMarkdownArtifactSnapshot`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+`normalizeRecord` shaping normalized persisted `profile_input` records with `case_id`, `jurisdiction_profile_key`, `profile_input_summary`, `profile_input_lane_snapshot`, `created_at`, and `updated_at`\s+`normalizeRecord` preserving `existingRecord\?\.created_at` when present and otherwise using the current timestamp for `created_at`\s+`normalizeRecord` always writing the current timestamp to `updated_at`\s+`normalizeReleaseEvalRecord` shaping normalized persisted `release_eval` records with `case_id`, `release_eval_run_id`, `jurisdiction_profile_key`, `release_eval_payload`, and `persisted_at`\s+`normalizeExportPackageRecord` shaping normalized persisted `export_package` records with `case_id`, `jurisdiction_profile_key`, `export_version`, `dossier_fingerprint`, `export_package_payload`, and `generated_at`\s+`normalizeExportPackageBundleArchiveArtifactRecord` shaping normalized persisted `export_package_bundle_archive_artifact` records with `case_id`, `artifact_type`, `filename`, `content_type`, `encoding`, `package_version`, `bundle_manifest_fingerprint`, `export_package_bundle_archive_artifact_payload`, and `persisted_at`\s+`normalizeExportPackageBundleManifestRecord` shaping normalized persisted `export_package_bundle_manifest` records with `case_id`, `jurisdiction_profile_key`, `package_version`, `export_version`, `dossier_fingerprint`, `export_package_bundle_manifest_payload`, and `persisted_at`\s+`normalizeExportPackageJsonArtifactRecord`, `normalizeExportPackageDocxArtifactRecord`, `normalizeExportPackagePdfArtifactRecord`, and `normalizeExportPackageMarkdownArtifactRecord` each shaping normalized persisted artifact records with `case_id`, `artifact_type`, `filename`, `content_type`, `encoding`, their corresponding payload field, and `persisted_at`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`normalizeRecord` being reused by `upsertCaseProfileInputs`\s+`normalizeReleaseEvalRecord` being reused by `persistCaseReleaseEvalRun`\s+`normalizeExportPackageRecord` being reused by `persistCaseExportPackageSnapshot`\s+`normalizeExportPackageBundleArchiveArtifactRecord` being reused by `persistCaseExportPackageBundleArchiveArtifactSnapshot`\s+`normalizeExportPackageBundleManifestRecord` being reused by `persistCaseExportPackageBundleManifestSnapshot`\s+`normalizeExportPackageJsonArtifactRecord` being reused by `persistCaseExportPackageJsonArtifactSnapshot`\s+`normalizeExportPackageDocxArtifactRecord` being reused by `persistCaseExportPackageDocxArtifactSnapshot`\s+`normalizeExportPackagePdfArtifactRecord` being reused by `persistCaseExportPackagePdfArtifactSnapshot`\s+`normalizeExportPackageMarkdownArtifactRecord` being reused by `persistCaseExportPackageMarkdownArtifactSnapshot`/i,
  );
  assert.match(
    docsText,
    /the shared `createPersistenceError` helper seam remains outside this helper seam because machine-readable persistence error construction is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `resolveStoragePath` \/ `readStore` \/ `writeStore` storage-helper seam remains outside this helper seam because filesystem\/path I\/O is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `reconcilePersistedReleaseEvalRun` \/ `resolvePersistedReleaseEvalProfileDossierSnapshot` reconciliation helper seam remains outside this helper seam because persisted release-eval reconciliation and dossier-snapshot resolution are a separate frozen lower boundary/i,
  );
  assert.match(
    docsText,
    /the shared `attachPersistedReleaseEvalRun` \/ `resolvePersistedReleaseEvalProfileDossierProjection` wrapper seam remains outside this helper seam because attached release-eval and profile-dossier projection resolution are a separate frozen higher boundary/i,
  );
  assert.match(
    docsText,
    /the shared API response-helper seam remains outside this helper seam because API response construction is performed in `apps\/api\/src\/index\.js` after persistence results are returned or thrown/i,
  );
  assert.match(
    docsText,
    /the shared `\/cases\/:caseId\/\.\.\.` parser seam remains outside this helper seam because path parsing occurs before any persistence boundary is reached/i,
  );
  assert.match(
    docsText,
    /the shared `loadAuthorizedCaseContext` helper remains outside this helper seam because auth\/access loading and capability gating occur before persistence helper selection/i,
  );
  assert.match(
    docsText,
    /downstream route-specific latest\/refresh\/delivery behavior remains outside this helper seam because route orchestration occurs after these database helpers return persisted values or projections/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  const exportPackageNormalizeHelpers = [
    ...databaseIndexText.matchAll(
      /function (normalizeExportPackage(?:[A-Za-z]+)?Record)\(/g,
    ),
  ].map((match) => match[1]);

  assert.deepEqual(exportPackageNormalizeHelpers, [
    "normalizeExportPackageRecord",
    "normalizeExportPackageBundleArchiveArtifactRecord",
    "normalizeExportPackageBundleManifestRecord",
    "normalizeExportPackageJsonArtifactRecord",
    "normalizeExportPackageDocxArtifactRecord",
    "normalizeExportPackagePdfArtifactRecord",
    "normalizeExportPackageMarkdownArtifactRecord",
  ]);

  assert.match(
    databaseIndexText,
    /function normalizeRecord\(caseId, snapshot, existingRecord\)\s*\{\s*const timestamp = new Date\(\)\.toISOString\(\);\s*return \{\s*case_id: caseId,\s*jurisdiction_profile_key: snapshot\.jurisdiction_profile_key,\s*profile_input_summary: snapshot\.profile_input_summary,\s*profile_input_lane_snapshot: snapshot\.profile_input_lane_snapshot,\s*created_at: existingRecord\?\.created_at \?\? timestamp,\s*updated_at: timestamp,\s*\};\s*\}/,
  );
  assert.match(
    databaseIndexText,
    /function normalizeReleaseEvalRecord\(caseId, releaseEvalRun, persistedAt\)\s*\{\s*return \{\s*case_id: caseId,\s*release_eval_run_id: releaseEvalRun\.release_eval_run_id,\s*jurisdiction_profile_key: releaseEvalRun\.jurisdiction_profile_key,\s*release_eval_payload: releaseEvalRun,\s*persisted_at: persistedAt,\s*\};\s*\}/,
  );

  const helperNames = [
    "normalizeRecord",
    "normalizeReleaseEvalRecord",
    "normalizeExportPackageRecord",
    "normalizeExportPackageBundleArchiveArtifactRecord",
    "normalizeExportPackageBundleManifestRecord",
    "normalizeExportPackageJsonArtifactRecord",
    "normalizeExportPackageDocxArtifactRecord",
    "normalizeExportPackagePdfArtifactRecord",
    "normalizeExportPackageMarkdownArtifactRecord",
  ];

  for (const name of helperNames) {
    assert.equal(
      (databaseIndexText.match(new RegExp(`function ${name}\\(`, "g")) || []).length,
      1,
    );
    assert.equal(
      (databaseIndexText.match(new RegExp(`${name}\\(`, "g")) || []).length - 1,
      1,
    );
  }

  assert.match(
    databaseIndexText,
    /const record = normalizeRecord\(caseId, canonicalSnapshot, store\[caseId\]\);/,
  );
  assert.match(
    databaseIndexText,
    /caseRuns\.push\(normalizeReleaseEvalRecord\(caseId, canonicalReleaseEvalRun, persistedAt\)\);/,
  );
  assert.match(
    databaseIndexText,
    /caseSnapshots\.push\(\s*normalizeExportPackageRecord\(caseId, canonicalExportPackage\),\s*\);/s,
  );
  assert.match(
    databaseIndexText,
    /caseSnapshots\.push\(\s*normalizeExportPackageBundleArchiveArtifactRecord\(\s*caseId,\s*canonicalExportPackageBundleArchiveArtifact,\s*persistedAt,\s*\),\s*\);/s,
  );
  assert.match(
    databaseIndexText,
    /caseSnapshots\.push\(\s*normalizeExportPackageBundleManifestRecord\(\s*caseId,\s*canonicalExportPackageBundleManifest,\s*persistedAt,\s*\),\s*\);/s,
  );
  assert.match(
    databaseIndexText,
    /caseSnapshots\.push\(\s*normalizeExportPackageJsonArtifactRecord\(\s*caseId,\s*canonicalExportPackageJsonArtifact,\s*persistedAt,\s*\),\s*\);/s,
  );
  assert.match(
    databaseIndexText,
    /caseSnapshots\.push\(\s*normalizeExportPackageDocxArtifactRecord\(\s*caseId,\s*canonicalExportPackageDocxArtifact,\s*persistedAt,\s*\),\s*\);/s,
  );
  assert.match(
    databaseIndexText,
    /caseSnapshots\.push\(\s*normalizeExportPackagePdfArtifactRecord\(\s*caseId,\s*canonicalExportPackagePdfArtifact,\s*persistedAt,\s*\),\s*\);/s,
  );
  assert.match(
    databaseIndexText,
    /caseSnapshots\.push\(\s*normalizeExportPackageMarkdownArtifactRecord\(\s*caseId,\s*canonicalExportPackageMarkdownArtifact,\s*persistedAt,\s*\),\s*\);/s,
  );
});
