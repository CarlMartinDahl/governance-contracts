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

test("docs freeze the shared governance release-eval profile-dossier snapshot helper seam as the generic adapter-mediated snapshot boundary", () => {
  const genericSnapshotHelperSlice = governanceIndexText.slice(
    governanceIndexText.indexOf("function resolveReleaseEvalProfileDossierSnapshot("),
    governanceIndexText.indexOf("function resolveReleaseEvalProfileDossierProjection("),
  );

  assert.match(
    docsText,
    /Shared Governance Release-Eval Profile Dossier Snapshot Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/governance\/src\/index\.js` `resolveReleaseEvalProfileDossierSnapshot` helper is the canonical internal governance-side higher generic profile-dossier snapshot-resolution boundary for the current included governance\/database flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+asserting plain-object `release_eval_run` input\s+loading the release-eval adapter through `getReleaseEvalAdapter\(releaseEvalRun\.jurisdiction_profile_key\)`\s+asserting `profile_dossier` capability when no release-eval adapter is found\s+delegating final snapshot resolution to `adapter\.resolveProfileDossierSnapshot\(releaseEvalRun, options\)`\s+returning the resulting profile-dossier snapshot object/i,
  );
  assert.match(
    docsText,
    /bounded adapter-slot delegation through `resolveProfileDossierSnapshot`, which currently routes to `resolveSWEBodelningProfileDossierSnapshot` and `resolveCMDProfileDossierSnapshot` through the existing release-eval adapter entries/i,
  );
  assert.match(
    docsText,
    /the database-side `resolvePersistedReleaseEvalProfileDossierSnapshot` wrapper delegating reconciled persisted reads through `resolveReleaseEvalProfileDossierSnapshot\(reconciledReleaseEvalRun, options\)`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` and `packages\/database\/src\/index\.js` is limited to 1 helper definition, 1 bounded adapter lookup, 1 bounded adapter-slot delegation, the current named module export surface exposing `resolveReleaseEvalProfileDossierSnapshot`, 1 current direct database helper import, 1 current direct database runtime call site in `packages\/database\/src\/index\.js`, and current runtime proof in `tests\/release-eval-adapter-registry\.test\.js`/i,
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
    /the already-frozen governance profile-dossier projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier `snapshot_status` helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsText,
    /the lower schemas profile-dossier validator seam and the lower schemas profile-dossier projection-validator seam remain outside this helper seam/i,
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
    /does not change runtime behavior, snapshot semantics, attach semantics, projection semantics, governance semantics, database behavior, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    genericSnapshotHelperSlice,
    /function resolveReleaseEvalProfileDossierSnapshot\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    genericSnapshotHelperSlice,
    /assertPlainObject\(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun"\);/,
  );
  assert.match(
    genericSnapshotHelperSlice,
    /const adapter = getReleaseEvalAdapter\(releaseEvalRun\.jurisdiction_profile_key\);/,
  );
  assert.match(
    genericSnapshotHelperSlice,
    /assertSupportedJurisdictionProfileCapability\(\s*releaseEvalRun\.jurisdiction_profile_key,\s*"profile_dossier",\s*\);/,
  );
  assert.match(
    genericSnapshotHelperSlice,
    /return adapter\.resolveProfileDossierSnapshot\(releaseEvalRun, options\);/,
  );
  assert.match(
    governanceIndexText,
    /resolveProfileDossierSnapshot:\s*resolveSWEBodelningProfileDossierSnapshot,/,
  );
  assert.match(
    governanceIndexText,
    /resolveProfileDossierSnapshot:\s*resolveCMDProfileDossierSnapshot,/,
  );

  assert.equal(
    (governanceIndexText.match(/function resolveReleaseEvalProfileDossierSnapshot\(/g) || []).length,
    1,
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /resolveReleaseEvalProfileDossierSnapshot/),
    [
      5816,
      6017,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /^\s*resolveReleaseEvalProfileDossierSnapshot,\s*$/,
    ),
    [
      6017,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /resolveProfileDossierSnapshot:/),
    [
      5742,
      5751,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /function resolveSWEBodelningProfileDossierSnapshot\(/,
    ),
    [5356],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /function resolveCMDProfileDossierSnapshot\(/,
    ),
    [5714],
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
      /function resolveReleaseEvalProfileDossierProjection\(/,
    ),
    [5831],
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
    /function resolvePersistedReleaseEvalProfileDossierSnapshot\(\s*releaseEvalRun,\s*caseProfileInputs,\s*options = \{\},\s*\)\s*\{\s*const reconciledReleaseEvalRun = reconcilePersistedReleaseEvalRun\(\s*releaseEvalRun,\s*caseProfileInputs,\s*\);\s*const adapter = getReleaseEvalAdapter\(\s*reconciledReleaseEvalRun\?\.jurisdiction_profile_key,\s*\);\s*if \(!adapter\) \{\s*return null;\s*\}\s*return resolveReleaseEvalProfileDossierSnapshot\(reconciledReleaseEvalRun, options\);\s*\}/,
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /resolveReleaseEvalProfileDossierSnapshot/),
    [36, 203],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /resolveSWEBodelningProfileDossierSnapshot/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /resolveCMDProfileDossierSnapshot/),
    [],
  );

  assert.deepEqual(
    collectLineMatches(
      adapterRegistryTestText,
      /resolveProfileDossierSnapshot\(releaseEvalRun\)/,
    ),
    [209],
  );
});
