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

test("docs freeze the shared database release-eval attach projection wrapper seam as the attached read/projection boundary", () => {
  assert.match(
    docsText,
    /Shared Database Release-Eval Attach\/Projection Wrapper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/database\/src\/index\.js` `attachPersistedReleaseEvalRun` and `resolvePersistedReleaseEvalProfileDossierProjection` helpers are the canonical persisted release-eval attach\/projection wrapper boundary for the current included read\/projection surfaces below and are now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced included read\/projection surfaces in this freeze are limited to:\s+`getLatestCaseReleaseEvalRun`\s+`getLatestCaseProfileDossierProjection`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+`attachPersistedReleaseEvalRun` first reconciling the persisted release-eval run through `reconcilePersistedReleaseEvalRun`\s+`attachPersistedReleaseEvalRun` loading the release-eval adapter from the reconciled run `jurisdiction_profile_key`\s+`attachPersistedReleaseEvalRun` returning the reconciled release-eval run unchanged when no adapter exists\s+`attachPersistedReleaseEvalRun` returning the reconciled release-eval run unchanged when the reconciled `jurisdiction_profile_key` does not have `profile_dossier` capability\s+`attachPersistedReleaseEvalRun` otherwise delegating to `attachReleaseEvalProfileDossierSnapshot\(reconciledReleaseEvalRun, options\)`\s+`resolvePersistedReleaseEvalProfileDossierProjection` first reconciling the persisted release-eval run through `reconcilePersistedReleaseEvalRun`\s+`resolvePersistedReleaseEvalProfileDossierProjection` loading the release-eval adapter from the reconciled run `jurisdiction_profile_key`\s+`resolvePersistedReleaseEvalProfileDossierProjection` returning `releaseEvalRun\?\.profile_dossier_snapshot \?\? null` when no adapter exists\s+`resolvePersistedReleaseEvalProfileDossierProjection` otherwise delegating to `resolveReleaseEvalProfileDossierProjection\(reconciledReleaseEvalRun, options\)`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`attachPersistedReleaseEvalRun` being reused by `getLatestCaseReleaseEvalRun`\s+`resolvePersistedReleaseEvalProfileDossierProjection` being reused by `getLatestCaseProfileDossierProjection`/i,
  );
  assert.match(
    docsText,
    /the shared `reconcilePersistedReleaseEvalRun` \/ `resolvePersistedReleaseEvalProfileDossierSnapshot` reconciliation helper seam remains outside this wrapper seam because persisted release-eval reconciliation and dossier-snapshot resolution are a separate frozen lower boundary/i,
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
    /downstream route-specific latest\/refresh\/delivery behavior remains outside this helper seam because route orchestration occurs after these database helpers return attached release-eval or projected dossier values/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    databaseIndexText,
    /function attachPersistedReleaseEvalRun\(\s*releaseEvalRun,\s*caseProfileInputs,\s*options = \{\},\s*\)\s*\{\s*const reconciledReleaseEvalRun = reconcilePersistedReleaseEvalRun\(\s*releaseEvalRun,\s*caseProfileInputs,\s*\);\s*const adapter = getReleaseEvalAdapter\(\s*reconciledReleaseEvalRun\?\.jurisdiction_profile_key,\s*\);\s*if \(!adapter\) \{\s*return reconciledReleaseEvalRun;\s*\}\s*if \(\s*!hasJurisdictionProfileCapability\(\s*reconciledReleaseEvalRun\?\.jurisdiction_profile_key,\s*"profile_dossier",\s*\)\s*\) \{\s*return reconciledReleaseEvalRun;\s*\}\s*return attachReleaseEvalProfileDossierSnapshot\(reconciledReleaseEvalRun, options\);\s*\}/,
  );
  assert.match(
    databaseIndexText,
    /function resolvePersistedReleaseEvalProfileDossierProjection\(\s*releaseEvalRun,\s*caseProfileInputs,\s*options = \{\},\s*\)\s*\{\s*const reconciledReleaseEvalRun = reconcilePersistedReleaseEvalRun\(\s*releaseEvalRun,\s*caseProfileInputs,\s*\);\s*const adapter = getReleaseEvalAdapter\(\s*reconciledReleaseEvalRun\?\.jurisdiction_profile_key,\s*\);\s*if \(!adapter\) \{\s*return releaseEvalRun\?\.profile_dossier_snapshot \?\? null;\s*\}\s*return resolveReleaseEvalProfileDossierProjection\(\s*reconciledReleaseEvalRun,\s*options,\s*\);\s*\}/,
  );

  assert.equal(
    (databaseIndexText.match(/function attachPersistedReleaseEvalRun\(/g) || []).length,
    1,
  );
  assert.equal(
    (
      databaseIndexText.match(
        /function resolvePersistedReleaseEvalProfileDossierProjection\(/g,
      ) || []
    ).length,
    1,
  );

  const attachPersistedReleaseEvalRunUses =
    (databaseIndexText.match(/attachPersistedReleaseEvalRun\(/g) || []).length - 1;
  const resolvePersistedReleaseEvalProfileDossierProjectionUses =
    (databaseIndexText.match(
      /resolvePersistedReleaseEvalProfileDossierProjection\(/g,
    ) || []).length - 1;

  assert.equal(attachPersistedReleaseEvalRunUses, 1);
  assert.equal(resolvePersistedReleaseEvalProfileDossierProjectionUses, 1);

  assert.match(
    databaseIndexText,
    /return attachPersistedReleaseEvalRun\(latestReleaseEvalRun, caseProfileInputs, \{\s*persisted_at: latestReleaseEvalRecord\.persisted_at,\s*\}\);/s,
  );
  assert.match(
    databaseIndexText,
    /return resolvePersistedReleaseEvalProfileDossierProjection\(\s*latestReleaseEvalRun,\s*caseProfileInputs,\s*\{\s*persisted_at: latestReleaseEvalRecord\.persisted_at,\s*\},\s*\);/s,
  );
});
