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
const profileDossierApiTestText = fs.readFileSync(
  path.join(__dirname, "profile-dossier-api.test.js"),
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

function collectCrossFunctionCallSites(text, targetFnNames) {
  const lines = text.split("\n");
  let currentFunction = null;
  const callSites = [];

  for (let index = 0; index < lines.length; index += 1) {
    const functionMatch = lines[index].match(
      /^(?:async\s+)?function\s+([A-Za-z0-9_]+)\s*\(/,
    );
    if (functionMatch) {
      currentFunction = functionMatch[1];
    }

    for (const fnName of targetFnNames) {
      if (
        lines[index].includes(`${fnName}(`) &&
        currentFunction !== fnName
      ) {
        callSites.push({
          fnName,
          caller: currentFunction,
          line: index + 1,
        });
      }
    }
  }

  return callSites;
}

test("docs freeze the shared governance profile-dossier projection-helper seam as the governance-side projection-resolution boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Profile Dossier Projection Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` profile-dossier projection helper pair `resolveSWEBodelningProfileDossierProjection` and `resolveCMDProfileDossierProjection` is the canonical internal governance-side profile-dossier projection-resolution boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`profile_dossier` projection resolution for `SWE_BODELNING`\s+`profile_dossier` projection resolution for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+resolving the lower profile-dossier snapshot through the current profile-specific snapshot-resolution helper\s+assembling the final projection object by combining the resolved snapshot payload with governance-side `snapshot_status`\s+`resolveCMDProfileDossierProjection` delegating the assembled projection through the lower schemas `validateCMDProfileDossierProjection` seam before returning\s+`resolveSWEBodelningProfileDossierProjection` returning the assembled projection object directly/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen governance-side profile-dossier `snapshot_status` helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveSWEBodelningProfileDossierProjection` consuming `deriveSWEBodelningProfileDossierSnapshotStatus` and `resolveCMDProfileDossierProjection` consuming `deriveCMDProfileDossierSnapshotStatus` while assembling the final projection objects/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas profile-dossier projection-validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveCMDProfileDossierProjection` delegating the assembled projection to `validateCMDProfileDossierProjection` after governance-side snapshot resolution and `snapshot_status` derivation, while the current `SWE_BODELNING` projection shape is corroborated through supporting schema\/runtime tests that validate returned projections through `validateSWEBodelningProfileDossierProjection`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 helper definitions, 2 release-eval adapter-slot assignments, the current named module export surface exposing `resolveSWEBodelningProfileDossierProjection` while keeping `resolveCMDProfileDossierProjection` internal and separately exposing the broader `resolveReleaseEvalProfileDossierProjection`, no current database runtime call sites for the profile-specific helper pair, and current runtime proof across `tests\/release-eval-run-persistence\.test\.js`, `tests\/profile-dossier-api\.test\.js`, and `tests\/release-eval-adapter-registry\.test\.js`/i,
  );
  assert.match(
    docsText,
    /the lower schemas profile-dossier validator seam remains outside this helper seam because lower profile-dossier snapshot validation is a separate lower-boundary responsibility and is not defined by the governance-side projection helper pair itself/i,
  );
  assert.match(
    docsText,
    /the lower schemas profile-dossier projection-validator seam remains outside this helper seam because schema-side projection normalization and `snapshot_status` validation are separate lower-boundary responsibilities even where the current CMD helper delegates to `validateCMDProfileDossierProjection` and the SWE path is corroborated through supporting tests/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier `snapshot_status` helper seam remains outside this helper seam because deriving the shared four-field `snapshot_status` block is a narrower helper responsibility consumed by the projection helper pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /broader governance route \/ projection resolution beyond the helper relationship already evidenced remains outside this helper seam because profile-dossier snapshot resolution, the higher generic `resolveReleaseEvalProfileDossierProjection` dispatcher, adapter-slot exposure, and thin route\/runtime behavior are separate governance boundaries above or below this narrower profile-specific projection-resolution pair/i,
  );
  assert.match(
    docsText,
    /broader governance adapter-dispatch logic remains outside this helper seam because release-eval adapter wiring and higher generic profile-dossier routing are separate governance boundaries above this narrower profile-specific helper pair/i,
  );
  assert.match(
    docsText,
    /downstream persistence, API route\/runtime, and other governance behavior remain outside this helper seam because they may call or return projection objects assembled by the pair but do not define the canonical shared governance-side profile-dossier projection-resolution boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side profile-dossier projection resolution that needs the same SWE\/CMD helper pair should extend this seam instead of introducing parallel profile-dossier projection helpers inside adapters, route handlers, or other runtime layers/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function resolveSWEBodelningProfileDossierProjection\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{\s*const resolvedSnapshot = resolveSWEBodelningProfileDossierSnapshot\(\s*releaseEvalRun,\s*options,\s*\);\s*return \{\s*\.\.\.resolvedSnapshot,\s*snapshot_status: deriveSWEBodelningProfileDossierSnapshotStatus\(releaseEvalRun\),\s*\};\s*\}/s,
  );
  assert.match(
    governanceIndexText,
    /function resolveCMDProfileDossierProjection\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{\s*const resolvedSnapshot = resolveCMDProfileDossierSnapshot\(releaseEvalRun,\s*options\);\s*return validateCMDProfileDossierProjection\(\{\s*\.\.\.resolvedSnapshot,\s*snapshot_status: deriveCMDProfileDossierSnapshotStatus\(releaseEvalRun\),\s*\}\);\s*\}/s,
  );
  assert.match(
    governanceIndexText,
    /resolveProfileDossierProjection: resolveSWEBodelningProfileDossierProjection,/,
  );
  assert.match(
    governanceIndexText,
    /resolveProfileDossierProjection: resolveCMDProfileDossierProjection,/,
  );
  assert.match(
    governanceIndexText,
    /function resolveReleaseEvalProfileDossierProjection\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.resolveProfileDossierProjection\(releaseEvalRun,\s*options\);/,
  );
  assert.match(
    governanceIndexText,
    /^\s*resolveSWEBodelningProfileDossierProjection,\s*$/m,
  );
  assert.doesNotMatch(
    governanceIndexText,
    /^\s*resolveCMDProfileDossierProjection,\s*$/m,
  );
  assert.match(
    governanceIndexText,
    /^\s*resolveReleaseEvalProfileDossierProjection,\s*$/m,
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bresolveSWEBodelningProfileDossierProjection\b/,
    ),
    [
      5375,
      5743,
      5990,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bresolveCMDProfileDossierProjection\b/,
    ),
    [
      5728,
      5752,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bresolveReleaseEvalProfileDossierProjection\b/,
    ),
    [
      5831,
      6016,
    ],
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, [
      "resolveSWEBodelningProfileDossierSnapshot",
      "resolveCMDProfileDossierSnapshot",
      "deriveSWEBodelningProfileDossierSnapshotStatus",
      "deriveCMDProfileDossierSnapshotStatus",
      "validateCMDProfileDossierProjection",
    ]).filter(
      ({ caller }) =>
        caller === "resolveSWEBodelningProfileDossierProjection" ||
        caller === "resolveCMDProfileDossierProjection",
    ),
    [
      {
        fnName: "resolveSWEBodelningProfileDossierSnapshot",
        caller: "resolveSWEBodelningProfileDossierProjection",
        line: 5376,
      },
      {
        fnName: "deriveSWEBodelningProfileDossierSnapshotStatus",
        caller: "resolveSWEBodelningProfileDossierProjection",
        line: 5383,
      },
      {
        fnName: "resolveCMDProfileDossierSnapshot",
        caller: "resolveCMDProfileDossierProjection",
        line: 5729,
      },
      {
        fnName: "validateCMDProfileDossierProjection",
        caller: "resolveCMDProfileDossierProjection",
        line: 5731,
      },
      {
        fnName: "deriveCMDProfileDossierSnapshotStatus",
        caller: "resolveCMDProfileDossierProjection",
        line: 5733,
      },
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bvalidateSWEBodelningProfileDossierProjection\(/,
    ),
    [],
  );

  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bresolveSWEBodelningProfileDossierProjection\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bresolveCMDProfileDossierProjection\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bresolveReleaseEvalProfileDossierProjection\b/,
    ),
    [35, 180],
  );

  assert.deepEqual(
    collectLineMatches(
      releaseEvalRunPersistenceTestText,
      /\bresolveSWEBodelningProfileDossierProjection\b/,
    ),
    [33, 297, 653],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalRunPersistenceTestText,
      /\bresolveCMDProfileDossierProjection\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      profileDossierApiTestText,
      /\bvalidateSWEBodelningProfileDossierProjection\(response\.body\)/,
    ),
    [318, 1222],
  );
  assert.deepEqual(
    collectLineMatches(
      profileDossierApiTestText,
      /\bvalidateCMDProfileDossierProjection\(response\.body\)/,
    ),
    [741],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalAdapterRegistryTestText,
      /\bresolveProfileDossierProjection\(releaseEvalRun\)/,
    ),
    [210],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalAdapterRegistryTestText,
      /\bvalidateCMDProfileDossierProjection\(resolvedProjection\)/,
    ),
    [217],
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /assert\.deepEqual\(resolvedProjection,\s*\{\s*\.\.\.resolvedSnapshot,\s*snapshot_status: \{\s*source: "fallback-reprojection",\s*snapshot_projection_version_found: null,\s*current_projection_version: "cmd-profile-dossier-v1",\s*snapshot_is_current: false,\s*\},\s*\}\);/s,
  );
});
