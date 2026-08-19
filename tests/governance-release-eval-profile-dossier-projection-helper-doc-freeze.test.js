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
const adapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-adapter-registry.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared governance release-eval profile-dossier projection helper seam as the generic adapter-mediated projection boundary", () => {
  const genericProjectionHelperSlice = governanceIndexText.slice(
    governanceIndexText.indexOf("function resolveReleaseEvalProfileDossierProjection("),
    governanceIndexText.indexOf("module.exports ="),
  );

  assert.match(
    docsText,
    /Shared Governance Release-Eval Profile Dossier Projection Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/governance\/src\/index\.js` `resolveReleaseEvalProfileDossierProjection` helper is the canonical internal governance-side higher generic profile-dossier projection-resolution boundary for the current included governance\/database flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+asserting plain-object `release_eval_run` input\s+loading the release-eval adapter through `getReleaseEvalAdapter\(releaseEvalRun\.jurisdiction_profile_key\)`\s+asserting `profile_dossier` capability when no release-eval adapter is found\s+delegating final projection resolution to `adapter\.resolveProfileDossierProjection\(releaseEvalRun, options\)`\s+returning the resulting profile-dossier projection object/i,
  );
  assert.match(
    docsText,
    /bounded adapter-slot delegation through `resolveProfileDossierProjection`, which currently routes to `resolveSWEBodelningProfileDossierProjection` and `resolveCMDProfileDossierProjection` through the existing release-eval adapter entries rather than reimplementing profile-specific projection assembly, governance-side `snapshot_status` derivation, or CMD-only lower schemas projection validation directly/i,
  );
  assert.match(
    docsText,
    /both higher generic dossier helpers sharing the same adapter-mediated `profile_dossier` capability-guard pattern while remaining separate neighboring helpers with different bounded slot delegation: `resolveReleaseEvalProfileDossierSnapshot` delegates through `resolveProfileDossierSnapshot`, while `resolveReleaseEvalProfileDossierProjection` delegates through `resolveProfileDossierProjection`/i,
  );
  assert.match(
    docsText,
    /the database-side `resolvePersistedReleaseEvalProfileDossierProjection` wrapper delegating reconciled persisted reads through `resolveReleaseEvalProfileDossierProjection\(reconciledReleaseEvalRun, options\)`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` and `packages\/database\/src\/index\.js` is limited to 1 helper definition, 1 bounded adapter lookup, 1 bounded adapter-slot delegation, the current named module export surface exposing `resolveReleaseEvalProfileDossierProjection`, 1 current direct database helper import, 1 current direct database runtime call site in `packages\/database\/src\/index\.js`, and current runtime proof in `tests\/release-eval-adapter-registry\.test\.js`/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier snapshot-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier attach-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance release-eval profile-dossier snapshot-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance release-eval profile-dossier attach-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier `snapshot_status` helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsText,
    /nearby governance currentness-gate helpers remain outside this helper seam/i,
  );
  assert.match(
    docsText,
    /broader governance adapter-dispatch logic remains outside this helper seam/i,
  );
  assert.match(
    docsText,
    /downstream persistence wrapper behavior, API route\/runtime behavior, and other governance behavior remain outside this helper seam/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, snapshot semantics, attach semantics, governance semantics, database behavior, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    genericProjectionHelperSlice,
    /function resolveReleaseEvalProfileDossierProjection\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    genericProjectionHelperSlice,
    /assertPlainObject\(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun"\);/,
  );
  assert.match(
    genericProjectionHelperSlice,
    /const adapter = getReleaseEvalAdapter\(releaseEvalRun\.jurisdiction_profile_key\);/,
  );
  assert.match(
    genericProjectionHelperSlice,
    /assertSupportedJurisdictionProfileCapability\(\s*releaseEvalRun\.jurisdiction_profile_key,\s*"profile_dossier",\s*\);/,
  );
  assert.match(
    genericProjectionHelperSlice,
    /return adapter\.resolveProfileDossierProjection\(releaseEvalRun, options\);/,
  );

  assert.equal(
    (governanceIndexText.match(/function resolveReleaseEvalProfileDossierProjection\(/g) || []).length,
    1,
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /resolveReleaseEvalProfileDossierProjection/),
    [
      5831,
      6016,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /^\s*resolveReleaseEvalProfileDossierProjection,\s*$/,
    ),
    [
      6016,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /resolveProfileDossierProjection:/),
    [
      5743,
      5752,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /function resolveSWEBodelningProfileDossierProjection\(/,
    ),
    [5375],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /function resolveCMDProfileDossierProjection\(/,
    ),
    [5728],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /function resolveReleaseEvalProfileDossierSnapshot\(/,
    ),
    [5816],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /function attachReleaseEvalProfileDossierSnapshot\(/,
    ),
    [5801],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /function deriveSWEBodelningProfileDossierSnapshotStatus\(/,
    ),
    [4861],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /function deriveCMDProfileDossierSnapshotStatus\(/,
    ),
    [4897],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /const releaseEvalAdapterRegistry =/),
    [5755],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /function getReleaseEvalAdapter\(/),
    [5760],
  );

  assert.match(
    databaseIndexText,
    /function resolvePersistedReleaseEvalProfileDossierProjection\(\s*releaseEvalRun,\s*caseProfileInputs,\s*options = \{\},\s*\)\s*\{\s*const reconciledReleaseEvalRun = reconcilePersistedReleaseEvalRun\(\s*releaseEvalRun,\s*caseProfileInputs,\s*\);\s*const adapter = getReleaseEvalAdapter\(\s*reconciledReleaseEvalRun\?\.jurisdiction_profile_key,\s*\);\s*if \(!adapter\) \{\s*return releaseEvalRun\?\.profile_dossier_snapshot \?\? null;\s*\}\s*return resolveReleaseEvalProfileDossierProjection\(\s*reconciledReleaseEvalRun,\s*options,\s*\);\s*\}/,
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /resolveReleaseEvalProfileDossierProjection/),
    [35, 180],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /resolveSWEBodelningProfileDossierProjection/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /resolveCMDProfileDossierProjection/),
    [],
  );

  assert.deepEqual(
    collectLineMatches(
      adapterRegistryTestText,
      /resolveProfileDossierProjection\(releaseEvalRun\)/,
    ),
    [210],
  );
});
