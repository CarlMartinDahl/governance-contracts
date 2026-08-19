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

test("docs freeze the shared governance profile-dossier attach-helper seam as the governance-side attach boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Profile Dossier Attach Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` profile-dossier attach helper pair `attachSWEBodelningProfileDossierSnapshot` and `attachCMDProfileDossierSnapshot` is the canonical internal governance-side profile-dossier attach boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`profile_dossier` attach behavior for `SWE_BODELNING`\s+`profile_dossier` attach behavior for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+returning a release-eval-shaped object with `profile_dossier_snapshot` attached through the current profile-specific snapshot helper\s+preserving the surrounding release-eval fields while attaching the resolved snapshot payload\s+`attachCMDProfileDossierSnapshot` canonicalizing the non-snapshot release-eval fields through `validateCMDReleaseEvalRunCore\(releaseEvalRun\)` before returning\s+returning the resulting attached release-eval object/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen governance-side profile-dossier snapshot-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `attachSWEBodelningProfileDossierSnapshot` consuming `resolveSWEBodelningProfileDossierSnapshot` and `attachCMDProfileDossierSnapshot` consuming `resolveCMDProfileDossierSnapshot` as their attached snapshot payload source rather than reimplementing snapshot reuse, fallback reprojection, or lower snapshot validation/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen governance-side profile-dossier projection-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the same release-eval adapter entries separately exposing `attachProfileDossierSnapshot` and `resolveProfileDossierProjection` while the attach-helper pair itself does not assemble projections, derive `snapshot_status`, or call the projection helpers directly/i,
  );
  assert.match(
    docsText,
    /the current relationship to independently evidenced release-eval derivation \/ attach flows already present in repo code is limited to `deriveSWEBodelningReleaseEvalRun` directly reusing `attachSWEBodelningProfileDossierSnapshot\(\.\.\.\)` during SWE release-eval derivation, while the broader `attachReleaseEvalProfileDossierSnapshot` helper remains a separate higher seam that consumes the pair indirectly through adapter-slot dispatch/i,
  );
  assert.match(
    docsText,
    /the currently evidenced CMD\/SWE behavior differences inside this seam are limited to:\s+`attachSWEBodelningProfileDossierSnapshot` returning `\{ \.\.\.releaseEvalRun, profile_dossier_snapshot: resolveSWEBodelningProfileDossierSnapshot\(releaseEvalRun, options\) \}`\s+`attachCMDProfileDossierSnapshot` returning `\{ \.\.\.validateCMDReleaseEvalRunCore\(releaseEvalRun\), profile_dossier_snapshot: resolveCMDProfileDossierSnapshot\(releaseEvalRun, options\) \}`\s+the current named module export surface already exposes `attachSWEBodelningProfileDossierSnapshot`, while the CMD helper is currently only consumed internally and the broader `attachReleaseEvalProfileDossierSnapshot` helper remains a separate higher seam/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 helper definitions, 1 direct SWE release-eval derivation call site, 2 release-eval adapter-slot assignments, the current named module export surface exposing `attachSWEBodelningProfileDossierSnapshot` while keeping `attachCMDProfileDossierSnapshot` internal and separately exposing the broader `attachReleaseEvalProfileDossierSnapshot`, no current direct database runtime call sites for the profile-specific helper pair, and current runtime proof in `tests\/release-eval-adapter-registry\.test\.js`/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier snapshot-helper seam remains outside this helper seam because snapshot reuse conditions, lower snapshot validation, and fallback reprojection are separate lower-boundary responsibilities consumed by the attach-helper pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier projection-helper seam remains outside this helper seam because projection assembly, `snapshot_status` addition, and CMD-only lower schemas projection validation are separate upper-boundary responsibilities consumed after or alongside snapshot attachment rather than defined by the attach-helper pair/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier `snapshot_status` helper seam remains outside this helper seam because deriving the shared four-field `snapshot_status` block is a separate narrower helper responsibility that is not performed by the attach-helper pair/i,
  );
  assert.match(
    docsText,
    /the lower schemas profile-dossier validator seam remains outside this helper seam because lower profile-dossier snapshot validation is a separate lower-boundary responsibility reached through the snapshot-helper seam and CMD release-eval canonicalization rather than defined by this governance-side attach pair itself/i,
  );
  assert.match(
    docsText,
    /the lower schemas profile-dossier projection-validator seam remains outside this helper seam because the attach-helper pair does not assemble or validate projection payloads and therefore does not define schema-side projection normalization or `snapshot_status` validation responsibilities/i,
  );
  assert.match(
    docsText,
    /the nearby governance currentness-gate helpers remain outside this helper seam because current repo evidence shows them serving the separate snapshot-helper seam and the separate `snapshot_status` helper seam rather than the attach-helper pair itself/i,
  );
  assert.match(
    docsText,
    /higher generic attach \/ adapter-dispatch logic remains outside this helper seam because `attachReleaseEvalProfileDossierSnapshot`, release-eval adapter-slot wiring, `releaseEvalAdapterRegistry`, `getReleaseEvalAdapter`, and database-side attach wrappers are separate higher governance boundaries above this narrower profile-specific attach-helper pair/i,
  );
  assert.match(
    docsText,
    /downstream persistence, API route\/runtime, and other governance behavior remain outside this helper seam because they may call higher generic attach helpers or consume attached release-eval objects but do not define the canonical shared governance-side profile-dossier attach boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side profile-dossier attach behavior that needs the same SWE\/CMD helper pair should extend this seam instead of introducing parallel profile-dossier attach helpers inside snapshot helpers, projection helpers, adapters, database wrappers, or route\/runtime layers/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, attach semantics, snapshot semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function attachSWEBodelningProfileDossierSnapshot\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{\s*return \{\s*\.\.\.releaseEvalRun,\s*profile_dossier_snapshot: resolveSWEBodelningProfileDossierSnapshot\(\s*releaseEvalRun,\s*options,\s*\),\s*\};\s*\}/s,
  );
  assert.match(
    governanceIndexText,
    /function attachCMDProfileDossierSnapshot\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{\s*return \{\s*\.\.\.validateCMDReleaseEvalRunCore\(releaseEvalRun\),\s*profile_dossier_snapshot: resolveCMDProfileDossierSnapshot\(\s*releaseEvalRun,\s*options,\s*\),\s*\};\s*\}/s,
  );
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningReleaseEvalRun\([\s\S]*return attachSWEBodelningProfileDossierSnapshot\(/,
  );
  assert.match(
    governanceIndexText,
    /attachProfileDossierSnapshot: attachSWEBodelningProfileDossierSnapshot,/,
  );
  assert.match(
    governanceIndexText,
    /attachProfileDossierSnapshot: attachCMDProfileDossierSnapshot,/,
  );
  assert.match(
    governanceIndexText,
    /function attachReleaseEvalProfileDossierSnapshot\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.attachProfileDossierSnapshot\(releaseEvalRun,\s*options\);/,
  );
  assert.match(
    governanceIndexText,
    /^\s*attachSWEBodelningProfileDossierSnapshot,\s*$/m,
  );
  assert.doesNotMatch(
    governanceIndexText,
    /^\s*attachCMDProfileDossierSnapshot,\s*$/m,
  );
  assert.match(
    governanceIndexText,
    /^\s*attachReleaseEvalProfileDossierSnapshot,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachSWEBodelningProfileDossierSnapshot\b/,
    ),
    [
      5387,
      5606,
      5741,
      5852,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachCMDProfileDossierSnapshot\b/,
    ),
    [
      5704,
      5750,
    ],
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
  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, [
      "attachSWEBodelningProfileDossierSnapshot",
      "attachCMDProfileDossierSnapshot",
    ]),
    [
      {
        fnName: "attachSWEBodelningProfileDossierSnapshot",
        caller: "deriveSWEBodelningReleaseEvalRun",
        line: 5606,
      },
    ],
  );

  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\battachSWEBodelningProfileDossierSnapshot\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\battachCMDProfileDossierSnapshot\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\battachReleaseEvalProfileDossierSnapshot\b/,
    ),
    [15, 160, 806],
  );

  assert.deepEqual(
    collectLineMatches(
      releaseEvalAdapterRegistryTestText,
      /\battachProfileDossierSnapshot\(releaseEvalRun\)/,
    ),
    [208],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalAdapterRegistryTestText,
      /\bderiveSWEBodelningReleaseEvalRun\b/,
    ),
    [15, 127],
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /assert\.deepEqual\(persisted,\s*expectedViaRegistry\);[\s\S]*assert\.deepEqual\(expectedViaRegistry,\s*expectedDirect\);/s,
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /validateCMDProfileDossierSnapshot\(releaseEvalWithSnapshot\.profile_dossier_snapshot\)/,
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /assert\.deepEqual\(resolvedSnapshot,\s*releaseEvalWithSnapshot\.profile_dossier_snapshot\);/,
  );
});
