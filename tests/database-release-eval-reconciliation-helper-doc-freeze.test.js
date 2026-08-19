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

test("docs freeze the shared database release-eval reconciliation helper seam as the persisted reconciliation boundary", () => {
  assert.match(
    docsText,
    /Shared Database Release-Eval Reconciliation Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/database\/src\/index\.js` `reconcilePersistedReleaseEvalRun` and `resolvePersistedReleaseEvalProfileDossierSnapshot` helpers are the canonical persisted release-eval reconciliation and dossier-snapshot resolution boundary for the current included persistence\/read surfaces below and are now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced included persistence\/read surfaces in this freeze are limited to:\s+`getLatestCaseReleaseEvalRun` through the existing `attachPersistedReleaseEvalRun` wrapper\s+`getLatestCaseProfileDossierProjection` through the existing `resolvePersistedReleaseEvalProfileDossierProjection` wrapper\s+`getLatestCaseExportPackageProjection`\s+`getLatestCaseExportPackageJsonArtifactProjection`\s+`getLatestCaseExportPackageMarkdownArtifactProjection`\s+`getLatestCaseExportPackagePdfArtifactProjection`\s+`getLatestCaseExportPackageDocxArtifactProjection`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+`reconcilePersistedReleaseEvalRun` loading the release-eval adapter from the persisted run `jurisdiction_profile_key`\s+`reconcilePersistedReleaseEvalRun` returning the persisted release-eval run unchanged when no adapter exists\s+`reconcilePersistedReleaseEvalRun` otherwise delegating to `reconcileReleaseEvalRun\(releaseEvalRun, caseProfileInputs\)`\s+`resolvePersistedReleaseEvalProfileDossierSnapshot` first reconciling the persisted release-eval run through `reconcilePersistedReleaseEvalRun`\s+`resolvePersistedReleaseEvalProfileDossierSnapshot` loading the release-eval adapter from the reconciled run `jurisdiction_profile_key`\s+`resolvePersistedReleaseEvalProfileDossierSnapshot` returning `null` when no adapter exists\s+`resolvePersistedReleaseEvalProfileDossierSnapshot` otherwise delegating to `resolveReleaseEvalProfileDossierSnapshot\(reconciledReleaseEvalRun, options\)`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`reconcilePersistedReleaseEvalRun` being reused by `attachPersistedReleaseEvalRun`, `resolvePersistedReleaseEvalProfileDossierProjection`, and `resolvePersistedReleaseEvalProfileDossierSnapshot`\s+`resolvePersistedReleaseEvalProfileDossierSnapshot` being reused by the existing export package \/ JSON artifact \/ Markdown artifact \/ PDF artifact \/ DOCX artifact projection helpers/i,
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
    /downstream route-specific latest\/refresh\/delivery behavior remains outside this helper seam because route orchestration occurs after these database helpers return reconciled read\/projection inputs/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    databaseIndexText,
    /function reconcilePersistedReleaseEvalRun\(releaseEvalRun, caseProfileInputs\)\s*\{\s*const adapter = getReleaseEvalAdapter\(releaseEvalRun\?\.jurisdiction_profile_key\);\s*if \(!adapter\) \{\s*return releaseEvalRun;\s*\}\s*return reconcileReleaseEvalRun\(releaseEvalRun, caseProfileInputs\);\s*\}/,
  );
  assert.match(
    databaseIndexText,
    /function resolvePersistedReleaseEvalProfileDossierSnapshot\(\s*releaseEvalRun,\s*caseProfileInputs,\s*options = \{\},\s*\)\s*\{\s*const reconciledReleaseEvalRun = reconcilePersistedReleaseEvalRun\(\s*releaseEvalRun,\s*caseProfileInputs,\s*\);\s*const adapter = getReleaseEvalAdapter\(\s*reconciledReleaseEvalRun\?\.jurisdiction_profile_key,\s*\);\s*if \(!adapter\) \{\s*return null;\s*\}\s*return resolveReleaseEvalProfileDossierSnapshot\(reconciledReleaseEvalRun, options\);\s*\}/,
  );

  assert.equal(
    (databaseIndexText.match(/function reconcilePersistedReleaseEvalRun\(/g) || []).length,
    1,
  );
  assert.equal(
    (databaseIndexText.match(/function resolvePersistedReleaseEvalProfileDossierSnapshot\(/g) || []).length,
    1,
  );

  const reconcilePersistedReleaseEvalRunUses =
    (databaseIndexText.match(/reconcilePersistedReleaseEvalRun\(/g) || []).length - 1;
  const resolvePersistedReleaseEvalProfileDossierSnapshotUses =
    (databaseIndexText.match(
      /resolvePersistedReleaseEvalProfileDossierSnapshot\(/g,
    ) || []).length - 1;

  assert.equal(reconcilePersistedReleaseEvalRunUses, 3);
  assert.equal(resolvePersistedReleaseEvalProfileDossierSnapshotUses, 5);

  assert.match(
    databaseIndexText,
    /return attachPersistedReleaseEvalRun\(latestReleaseEvalRun, caseProfileInputs, \{\s*persisted_at: latestReleaseEvalRecord\.persisted_at,\s*\}\);/s,
  );
  assert.match(
    databaseIndexText,
    /currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot\(\s*latestReleaseEvalRun,\s*caseProfileInputs,\s*\{\s*persisted_at: latestReleaseEvalRecord\.persisted_at,\s*\},\s*\);/s,
  );
});
