const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const governanceIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "governance", "src", "index.js"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);
const releaseEvalAdapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-adapter-registry.test.js"),
  "utf8",
);
const releaseEvalRunPersistenceTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-run-persistence.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared governance release-eval profile-dossier attach helper seam as the higher generic attach boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Release-Eval Profile Dossier Attach Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` `attachReleaseEvalProfileDossierSnapshot` helper is the canonical internal governance-side higher generic profile-dossier attach boundary for the current included governance\/database flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`release_eval` profile-dossier attach behavior for `SWE_BODELNING` through the existing release-eval adapter surface\s+`release_eval` profile-dossier attach behavior for `"CMD_PROFILE"` through the existing release-eval adapter surface/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+asserting plain-object `release_eval_run` input\s+loading the release-eval adapter through `getReleaseEvalAdapter\(releaseEvalRun\.jurisdiction_profile_key\)`\s+asserting `profile_dossier` capability when no release-eval adapter is found\s+delegating final attachment to `adapter\.attachProfileDossierSnapshot\(releaseEvalRun, options\)`\s+returning the resulting attached release-eval object/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen governance profile-dossier attach-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to bounded adapter-slot delegation through `attachProfileDossierSnapshot`, which currently routes to `attachSWEBodelningProfileDossierSnapshot` and `attachCMDProfileDossierSnapshot` through the existing release-eval adapter entries rather than reimplementing profile-specific attach behavior directly/i,
  );
  assert.match(
    docsText,
    /the current relationship to the broader release-eval adapter surface already evidenced in `packages\/governance\/src\/index\.js` is limited to one bounded adapter lookup through `getReleaseEvalAdapter\(releaseEvalRun\.jurisdiction_profile_key\)` plus one bounded `attachProfileDossierSnapshot` slot delegation, while adapter construction, registry ownership, neighboring slot methods, and broader dispatch scaffold behavior remain separate seams/i,
  );
  assert.match(
    docsText,
    /the current relationship to independently evidenced governance\/database attach flows already present in repo code is limited to `attachPersistedReleaseEvalRun` delegating attached read output through `attachReleaseEvalProfileDossierSnapshot\(reconciledReleaseEvalRun, options\)` and `persistCaseReleaseEvalRun` delegating profile-dossier-capable persistence through `attachReleaseEvalProfileDossierSnapshot\(reconcileReleaseEvalRun\(releaseEvalRun, caseProfileInputs\), \{ persisted_at: persistedAt, force_reproject: true \}\)`/i,
  );
  assert.match(
    docsText,
    /the currently evidenced behavior boundaries inside this seam are limited to:\s+the helper itself remaining profile-agnostic and delegating through the adapter slot instead of branching on `SWE_BODELNING` versus `"CMD_PROFILE"`\s+the current named module export surface exposing `attachReleaseEvalProfileDossierSnapshot`\s+the profile-specific attach-helper pair remaining a separate lower seam behind the current adapter slots/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` and `packages\/database\/src\/index\.js` is limited to 1 helper definition, 1 bounded adapter lookup, 1 bounded adapter-slot delegation, the current named module export surface exposing `attachReleaseEvalProfileDossierSnapshot`, 2 current direct database runtime call sites in `packages\/database\/src\/index\.js`, and current runtime proof in `tests\/release-eval-adapter-registry\.test\.js` plus `tests\/release-eval-run-persistence\.test\.js`/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier attach-helper seam remains outside this helper seam because profile-specific attachment, CMD release-eval canonicalization, and lower snapshot-helper consumption are separate lower-boundary responsibilities behind the adapter slot rather than defined by this generic helper itself/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier snapshot-helper seam remains outside this helper seam because snapshot reuse conditions, fallback reprojection, and lower snapshot validation are separate lower-boundary responsibilities consumed below this generic helper through the profile-specific attach seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier projection-helper seam remains outside this helper seam because projection assembly, `snapshot_status` addition, and lower schemas projection validation are separate upper or neighboring responsibilities after or alongside attachment rather than defined by this generic helper/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier `snapshot_status` helper seam remains outside this helper seam because deriving the shared four-field `snapshot_status` block is a separate narrower helper responsibility that is not performed by this generic attach helper/i,
  );
  assert.match(
    docsText,
    /the lower schemas profile-dossier validator seam and the lower schemas profile-dossier projection-validator seam remain outside this helper seam because schema-side snapshot and projection validation are separate lower boundaries reached below the profile-specific snapshot\/projection helper seams rather than defined by this generic attach helper itself/i,
  );
  assert.match(
    docsText,
    /the nearby governance currentness-gate helpers remain outside this helper seam because current repo evidence shows them serving the separate snapshot-helper and `snapshot_status` helper seams rather than this generic attach helper/i,
  );
  assert.match(
    docsText,
    /broader governance adapter-dispatch logic remains outside this helper seam because `releaseEvalAdapterRegistry`, `getReleaseEvalAdapter`, neighboring generic dossier helpers, and broader release-eval adapter routing are separate wider governance boundaries even though this helper currently performs one bounded adapter lookup and one bounded slot delegation through that scaffold/i,
  );
  assert.match(
    docsText,
    /downstream persistence, API route\/runtime, and other governance behavior remain outside this helper seam because they may call this generic helper or consume attached release-eval objects but do not define the canonical shared governance-side higher generic profile-dossier attach boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side higher generic profile-dossier attach behavior that needs the same adapter-mediated attachment should extend this seam instead of reintroducing direct adapter-slot delegation inside database wrappers, route handlers, or other runtime layers/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, attach semantics, snapshot semantics, projection semantics, governance semantics, database behavior, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function attachReleaseEvalProfileDossierSnapshot\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{\s*assertPlainObject\(releaseEvalRun,\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*"releaseEvalRun"\);\s*const adapter = getReleaseEvalAdapter\(releaseEvalRun\.jurisdiction_profile_key\);\s*if \(!adapter\) \{\s*assertSupportedJurisdictionProfileCapability\(\s*releaseEvalRun\.jurisdiction_profile_key,\s*"profile_dossier",\s*\);\s*\}\s*return adapter\.attachProfileDossierSnapshot\(releaseEvalRun,\s*options\);\s*\}/s,
  );
  assert.match(
    governanceIndexText,
    /^\s*attachReleaseEvalProfileDossierSnapshot,\s*$/m,
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachReleaseEvalProfileDossierSnapshot\b/,
    ),
    [
      5801,
      5853,
    ],
  );

  assert.doesNotMatch(
    databaseIndexText,
    /\battachSWEBodelningProfileDossierSnapshot\b/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /\battachCMDProfileDossierSnapshot\b/,
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\battachReleaseEvalProfileDossierSnapshot\b/,
    ),
    [15, 160, 806],
  );
  assert.match(
    databaseIndexText,
    /function attachPersistedReleaseEvalRun\([\s\S]*return attachReleaseEvalProfileDossierSnapshot\(reconciledReleaseEvalRun, options\);/s,
  );
  assert.match(
    databaseIndexText,
    /hasJurisdictionProfileCapability\([\s\S]*"profile_dossier"[\s\S]*\? attachReleaseEvalProfileDossierSnapshot\([\s\S]*reconcileReleaseEvalRun\(releaseEvalRun, caseProfileInputs\),[\s\S]*\{ persisted_at: persistedAt, force_reproject: true \}/s,
  );

  assert.deepEqual(
    collectLineMatches(
      releaseEvalAdapterRegistryTestText,
      /\battachProfileDossierSnapshot\(releaseEvalRun\)/,
    ),
    [208],
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /assert\.equal\(typeof cmdAdapter\.attachProfileDossierSnapshot,\s*"function"\);/,
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /assert\.deepEqual\(resolvedSnapshot,\s*releaseEvalWithSnapshot\.profile_dossier_snapshot\);/,
  );
  assert.match(
    releaseEvalRunPersistenceTestText,
    /const persisted = await persistCaseReleaseEvalRun\("case-1", payload, \{ storageDir \}\);[\s\S]*const latest = await getLatestCaseReleaseEvalRun\("case-1", \{ storageDir \}\);[\s\S]*assert\.deepEqual\(latest\.profile_dossier_snapshot,\s*payload\.profile_dossier_snapshot\);/s,
  );
  assert.match(
    releaseEvalRunPersistenceTestText,
    /const persisted = await refreshCaseReleaseEvalRun\(/,
  );
});
