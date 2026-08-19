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

test("docs freeze the shared governance profile-dossier snapshot-status helper seam as the governance-side snapshot-status derivation boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Profile Dossier Snapshot-Status Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` profile-dossier `snapshot_status` helper pair `deriveSWEBodelningProfileDossierSnapshotStatus` and `deriveCMDProfileDossierSnapshotStatus` is the canonical internal governance-side profile-dossier `snapshot_status` derivation boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`profile_dossier` `snapshot_status` derivation for `SWE_BODELNING`\s+`profile_dossier` `snapshot_status` derivation for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+deriving the four-field profile-dossier `snapshot_status` object shape `source`, `snapshot_projection_version_found`, `current_projection_version`, and `snapshot_is_current`\s+mapping the helper-local currentness result to the existing `persisted-current` \/ `fallback-reprojection` `source` values\s+carrying the current profile-specific projection-version constant into `current_projection_version`\s+returning the resulting `snapshot_status` object/i,
  );
  assert.match(
    docsText,
    /the current relationship to governance-side profile-dossier projection resolution already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveSWEBodelningProfileDossierProjection` and `resolveCMDProfileDossierProjection` consuming `deriveSWEBodelningProfileDossierSnapshotStatus` and `deriveCMDProfileDossierSnapshotStatus` while assembling the final projection objects; snapshot resolution, projection assembly, and any lower schema-side projection validation remain in separate seams rather than this helper pair/i,
  );
  assert.match(
    docsText,
    /the current relationship to currentness \/ projection-version semantics already evidenced in `packages\/governance\/src\/index\.js` is limited to the SWE helper reading a non-empty persisted `profile_dossier_snapshot\.projection_version` into `snapshot_projection_version_found` when present and otherwise `null`, the CMD helper returning `cmdProfileDossierProjectionVersion` as `snapshot_projection_version_found` only when current and otherwise `null`, and both helpers returning the current profile-specific projection version plus the boolean `snapshot_is_current`/i,
  );
  assert.match(
    docsText,
    /the currently evidenced CMD\/SWE behavior differences inside this seam are limited to:\s+`deriveSWEBodelningProfileDossierSnapshotStatus` derives currentness through the nearby `hasCurrentSWEBodelningProfileDossierSnapshot\(\.\.\.\)` plus `hasSchemaValidSWEBodelningProfileDossierSnapshot\(\.\.\.\)` gates\s+`deriveCMDProfileDossierSnapshotStatus` derives currentness through the nearby `hasSchemaValidCMDProfileDossierSnapshot\(\.\.\.\)` gate\s+the current named module export surface already exposes `deriveSWEBodelningProfileDossierSnapshotStatus`, while the CMD helper is currently only consumed internally by `resolveCMDProfileDossierProjection`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 helper definitions, 2 profile-dossier projection-resolution call sites, the current named module export surface exposing only `deriveSWEBodelningProfileDossierSnapshotStatus`, no current database runtime call sites, and the current SWE-path runtime proof in `tests\/release-eval-run-persistence\.test\.js` via 1 direct helper assertion and 2 projection-resolution assertions/i,
  );
  assert.match(
    docsText,
    /the nearby governance currentness-gate helpers `hasCurrentSWEBodelningProfileDossierSnapshot`, `hasSchemaValidSWEBodelningProfileDossierSnapshot`, and `hasSchemaValidCMDProfileDossierSnapshot` remain outside this narrower helper seam because current repo evidence shows them serving the separate `resolveSWEBodelningProfileDossierSnapshot` and `resolveCMDProfileDossierSnapshot` helpers in addition to the `snapshot_status` pair/i,
  );
  assert.match(
    docsText,
    /the lower schemas profile-dossier validator seam remains outside this helper seam because lower profile-dossier snapshot validation is a separate lower-boundary responsibility reached through nearby governance currentness gates and higher projection resolution rather than defined by the `snapshot_status` helper pair itself/i,
  );
  assert.match(
    docsText,
    /the lower schemas profile-dossier projection-validator seam remains outside this helper seam because final schema-side projection normalization and `snapshot_status` validation are separate lower-boundary responsibilities after governance-side projection assembly rather than responsibilities defined by the helper pair itself/i,
  );
  assert.match(
    docsText,
    /governance-side profile-dossier route \/ projection resolution beyond the helper relationship already evidenced remains outside this helper seam because snapshot resolution, projection assembly, adapter-slot exposure, and higher read\/runtime behavior are separate runtime responsibilities that may consume the pair but do not define the canonical shared governance-side profile-dossier `snapshot_status` derivation boundary themselves/i,
  );
  assert.match(
    docsText,
    /broader governance adapter-dispatch logic remains outside this helper seam because adapter-slot wiring and any higher generic profile-dossier routing are separate governance boundaries above this narrower `snapshot_status` derivation pair/i,
  );
  assert.match(
    docsText,
    /downstream persistence, API route\/runtime, and other governance behavior remain outside this helper seam because they may call or return projections carrying the derived `snapshot_status` block but do not define the canonical shared governance-side derivation boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side profile-dossier `snapshot_status` derivation that needs the same SWE\/CMD helper pair should extend this seam instead of introducing parallel profile-dossier `snapshot_status` helper stacks inside projection helpers, adapters, or route\/runtime layers/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, `snapshot_status` semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningProfileDossierSnapshotStatus\(\s*releaseEvalRun\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const snapshot = releaseEvalRun\?\.profile_dossier_snapshot;/,
  );
  assert.match(
    governanceIndexText,
    /typeof snapshot\?\.projection_version === "string" &&/,
  );
  assert.match(
    governanceIndexText,
    /\? snapshot\.projection_version/,
  );
  assert.match(
    governanceIndexText,
    /const snapshotIsCurrent =\s*hasCurrentSWEBodelningProfileDossierSnapshot\(releaseEvalRun\) &&\s*hasSchemaValidSWEBodelningProfileDossierSnapshot\(releaseEvalRun\);/,
  );
  assert.match(
    governanceIndexText,
    /source: snapshotIsCurrent \? "persisted-current" : "fallback-reprojection",/,
  );
  assert.match(
    governanceIndexText,
    /snapshot_projection_version_found: snapshotProjectionVersionFound,/,
  );
  assert.match(
    governanceIndexText,
    /current_projection_version: profileDossierProjectionVersion,/,
  );
  assert.match(
    governanceIndexText,
    /snapshot_is_current: snapshotIsCurrent,/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDProfileDossierSnapshotStatus\(\s*releaseEvalRun\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const snapshotIsCurrent = hasSchemaValidCMDProfileDossierSnapshot\(releaseEvalRun\);/,
  );
  assert.match(
    governanceIndexText,
    /snapshot_projection_version_found: snapshotIsCurrent\s*\?\s*cmdProfileDossierProjectionVersion\s*:\s*null,/,
  );
  assert.match(
    governanceIndexText,
    /function resolveSWEBodelningProfileDossierProjection\([\s\S]*snapshot_status: deriveSWEBodelningProfileDossierSnapshotStatus\(releaseEvalRun\)/,
  );
  assert.match(
    governanceIndexText,
    /function resolveCMDProfileDossierProjection\([\s\S]*snapshot_status: deriveCMDProfileDossierSnapshotStatus\(releaseEvalRun\)/,
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
    /deriveSWEBodelningProfileDossierSnapshotStatus,/,
  );
  assert.doesNotMatch(
    governanceIndexText,
    /deriveCMDProfileDossierSnapshotStatus,/,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningProfileDossierSnapshotStatus\b/,
    ),
    [
      4861,
      5383,
      5913,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveCMDProfileDossierSnapshotStatus\b/,
    ),
    [
      4897,
      5733,
    ],
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, [
      "deriveSWEBodelningProfileDossierSnapshotStatus",
      "deriveCMDProfileDossierSnapshotStatus",
    ]),
    [
      {
        fnName: "deriveSWEBodelningProfileDossierSnapshotStatus",
        caller: "resolveSWEBodelningProfileDossierProjection",
        line: 5383,
      },
      {
        fnName: "deriveCMDProfileDossierSnapshotStatus",
        caller: "resolveCMDProfileDossierProjection",
        line: 5733,
      },
    ],
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, [
      "hasCurrentSWEBodelningProfileDossierSnapshot",
      "hasSchemaValidSWEBodelningProfileDossierSnapshot",
      "hasSchemaValidCMDProfileDossierSnapshot",
    ]),
    [
      {
        fnName: "hasCurrentSWEBodelningProfileDossierSnapshot",
        caller: "deriveSWEBodelningProfileDossierSnapshotStatus",
        line: 4869,
      },
      {
        fnName: "hasSchemaValidSWEBodelningProfileDossierSnapshot",
        caller: "deriveSWEBodelningProfileDossierSnapshotStatus",
        line: 4870,
      },
      {
        fnName: "hasSchemaValidCMDProfileDossierSnapshot",
        caller: "deriveCMDProfileDossierSnapshotStatus",
        line: 4898,
      },
      {
        fnName: "hasCurrentSWEBodelningProfileDossierSnapshot",
        caller: "resolveSWEBodelningProfileDossierSnapshot",
        line: 5366,
      },
      {
        fnName: "hasSchemaValidSWEBodelningProfileDossierSnapshot",
        caller: "resolveSWEBodelningProfileDossierSnapshot",
        line: 5367,
      },
      {
        fnName: "hasSchemaValidCMDProfileDossierSnapshot",
        caller: "resolveCMDProfileDossierSnapshot",
        line: 5720,
      },
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bderiveSWEBodelningProfileDossierSnapshotStatus\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bderiveCMDProfileDossierSnapshotStatus\b/,
    ),
    [],
  );

  assert.deepEqual(
    collectLineMatches(
      releaseEvalRunPersistenceTestText,
      /\bderiveSWEBodelningProfileDossierSnapshotStatus\b/,
    ),
    [29, 516],
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
      /\bderiveCMDProfileDossierSnapshotStatus\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalRunPersistenceTestText,
      /\bresolveCMDProfileDossierProjection\b/,
    ),
    [],
  );
  assert.match(
    releaseEvalRunPersistenceTestText,
    /assert\.deepEqual\(resolvedProjection\.snapshot_status,\s*\{\s*source: "persisted-current",\s*snapshot_projection_version_found:\s*deriveSWEBodelningProfileDossierProjectionVersion\(\),\s*current_projection_version:\s*deriveSWEBodelningProfileDossierProjectionVersion\(\),\s*snapshot_is_current: true,\s*\}\);/s,
  );
  assert.match(
    releaseEvalRunPersistenceTestText,
    /deriveSWEBodelningProfileDossierSnapshotStatus\(\{\s*\.\.\.latest,[\s\S]*projection_version: "swe-bodelning-profile-dossier-v0",[\s\S]*\}\),[\s\S]*source: "fallback-reprojection",\s*snapshot_projection_version_found: "swe-bodelning-profile-dossier-v0",\s*current_projection_version: deriveSWEBodelningProfileDossierProjectionVersion\(\),\s*snapshot_is_current: false,/s,
  );
});
