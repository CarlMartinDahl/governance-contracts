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

test("docs freeze the shared governance profile-dossier snapshot-helper seam as the governance-side snapshot-resolution boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Profile Dossier Snapshot Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` profile-dossier snapshot helper pair `resolveSWEBodelningProfileDossierSnapshot` and `resolveCMDProfileDossierSnapshot` is the canonical internal governance-side profile-dossier snapshot-resolution boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`profile_dossier` snapshot resolution for `SWE_BODELNING`\s+`profile_dossier` snapshot resolution for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+gating the supported `profile_dossier` capability before resolving the profile-specific snapshot\s+reusing the persisted `profile_dossier_snapshot` only when the current helper-local reuse conditions pass and `force_reproject` is not true\s+otherwise delegating to the current profile-specific `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` or `deriveCMDProfileDossierSnapshot\(\.\.\.\)` helper\s+returning the resulting snapshot object/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen governance-side profile-dossier projection-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveSWEBodelningProfileDossierProjection` and `resolveCMDProfileDossierProjection` consuming `resolveSWEBodelningProfileDossierSnapshot` and `resolveCMDProfileDossierSnapshot` as their snapshot payload source before any separate `snapshot_status` assembly or CMD-only lower schemas projection validation/i,
  );
  assert.match(
    docsText,
    /the current relationship to independently evidenced attach\/helper reuse already present in `packages\/governance\/src\/index\.js` is limited to `attachSWEBodelningProfileDossierSnapshot` and `attachCMDProfileDossierSnapshot` consuming the snapshot-helper pair while attaching `profile_dossier_snapshot`, plus `deriveCMDExportPackage` reusing `resolveCMDProfileDossierSnapshot\(releaseEvalRun, options\)` before lower dossier-to-export-package derivation/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen governance-side profile-dossier `snapshot_status` helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the nearby currentness-gate helpers `hasCurrentSWEBodelningProfileDossierSnapshot`, `hasSchemaValidSWEBodelningProfileDossierSnapshot`, and `hasSchemaValidCMDProfileDossierSnapshot` being shared across both seams while the snapshot helper pair resolves snapshot payloads and the `snapshot_status` helper pair separately derives the four-field status block/i,
  );
  assert.match(
    docsText,
    /the currently evidenced CMD\/SWE behavior differences inside this seam are limited to:\s+`resolveSWEBodelningProfileDossierSnapshot` asserting plain-object release-eval input, gating on `releaseEvalRun\.jurisdiction_profile_key`, and reusing `releaseEvalRun\.profile_dossier_snapshot` unchanged only when `force_reproject !== true` and both nearby SWE currentness\/schema-valid gates pass\s+`resolveCMDProfileDossierSnapshot` first canonicalizing release-eval-backed input through `validateCMDReleaseEvalRunCore\(releaseEvalRun\)`, gating on `cmdProfileKey`, and reusing `validateCMDProfileDossierSnapshot\(releaseEvalRun\.profile_dossier_snapshot\)` only when `force_reproject !== true` and the nearby CMD schema-valid gate passes\s+otherwise each helper delegating to its profile-specific snapshot derivation helper\s+the current named module export surface already exposes `resolveSWEBodelningProfileDossierSnapshot`, while the CMD helper is currently only consumed internally and the broader `resolveReleaseEvalProfileDossierSnapshot` helper remains a separate higher seam/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 helper definitions, 2 projection-helper call sites, 2 attach-helper call sites, 2 release-eval adapter-slot assignments, 1 current neighboring CMD export-package derivation-helper call site, the current named module export surface exposing `resolveSWEBodelningProfileDossierSnapshot` while keeping `resolveCMDProfileDossierSnapshot` internal and separately exposing the broader `resolveReleaseEvalProfileDossierSnapshot`, no current direct database runtime call sites for the profile-specific helper pair, and current runtime proof in `tests\/release-eval-run-persistence\.test\.js` plus `tests\/release-eval-adapter-registry\.test\.js`/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier projection-helper seam remains outside this helper seam because projection assembly, `snapshot_status` addition, and CMD-only lower schemas projection validation are separate upper-boundary responsibilities consumed after snapshot resolution rather than defined by this helper pair/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier `snapshot_status` helper seam remains outside this helper seam because deriving the shared four-field `snapshot_status` block is a separate narrower helper responsibility consumed after or alongside snapshot resolution rather than defined by the snapshot-helper pair/i,
  );
  assert.match(
    docsText,
    /the lower schemas profile-dossier validator seam remains outside this helper seam because lower profile-dossier snapshot validation is a separate lower-boundary responsibility reached through nearby currentness gates and CMD canonicalization rather than defined by this governance-side snapshot-resolution pair itself/i,
  );
  assert.match(
    docsText,
    /the lower schemas profile-dossier projection-validator seam remains outside this helper seam because schema-side projection normalization and `snapshot_status` validation are separate upper-boundary responsibilities after governance-side snapshot resolution rather than responsibilities defined by the snapshot-helper pair itself/i,
  );
  assert.match(
    docsText,
    /the nearby governance currentness-gate helpers remain outside this helper seam because current repo evidence shows them serving both the snapshot-helper pair and the separate `snapshot_status` helper seam instead of forming a narrower snapshot-helper-only boundary/i,
  );
  assert.match(
    docsText,
    /broader governance route \/ projection resolution beyond the helper relationship already evidenced remains outside this helper seam because the higher generic `resolveReleaseEvalProfileDossierSnapshot` dispatcher, projection helpers, adapter-slot exposure, and higher read\/runtime behavior are separate governance boundaries above this narrower profile-specific snapshot-resolution pair/i,
  );
  assert.match(
    docsText,
    /broader governance adapter-dispatch logic remains outside this helper seam because release-eval adapter wiring and higher generic profile-dossier routing are separate governance boundaries above this narrower profile-specific helper pair/i,
  );
  assert.match(
    docsText,
    /downstream persistence, API route\/runtime, and other governance behavior remain outside this helper seam because they may call or return snapshot or projection payloads reached through the pair but do not define the canonical shared governance-side profile-dossier snapshot-resolution boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side profile-dossier snapshot resolution that needs the same SWE\/CMD helper pair should extend this seam instead of introducing parallel profile-dossier snapshot helpers inside projection helpers, adapters, or route\/runtime layers/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, snapshot semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function resolveSWEBodelningProfileDossierSnapshot\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{\s*assertPlainObject\(releaseEvalRun,\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*"releaseEvalRun"\);\s*assertSupportedJurisdictionProfileCapability\(\s*releaseEvalRun\.jurisdiction_profile_key,\s*"profile_dossier",\s*\);\s*if \(\s*options\.force_reproject !== true &&\s*hasCurrentSWEBodelningProfileDossierSnapshot\(releaseEvalRun\) &&\s*hasSchemaValidSWEBodelningProfileDossierSnapshot\(releaseEvalRun\)\s*\) \{\s*return releaseEvalRun\.profile_dossier_snapshot;\s*\}\s*return deriveSWEBodelningProfileDossierSnapshot\(releaseEvalRun,\s*options\);\s*\}/s,
  );
  assert.match(
    governanceIndexText,
    /function resolveCMDProfileDossierSnapshot\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{\s*validateCMDReleaseEvalRunCore\(releaseEvalRun\);\s*assertSupportedJurisdictionProfileCapability\(cmdProfileKey,\s*"profile_dossier"\);\s*if \(\s*options\.force_reproject !== true &&\s*hasSchemaValidCMDProfileDossierSnapshot\(releaseEvalRun\)\s*\) \{\s*return validateCMDProfileDossierSnapshot\(releaseEvalRun\.profile_dossier_snapshot\);\s*\}\s*return deriveCMDProfileDossierSnapshot\(releaseEvalRun\);\s*\}/s,
  );
  assert.match(
    governanceIndexText,
    /function attachSWEBodelningProfileDossierSnapshot\([\s\S]*profile_dossier_snapshot: resolveSWEBodelningProfileDossierSnapshot\(\s*releaseEvalRun,\s*options,\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function attachCMDProfileDossierSnapshot\([\s\S]*profile_dossier_snapshot: resolveCMDProfileDossierSnapshot\(\s*releaseEvalRun,\s*options,\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function resolveSWEBodelningProfileDossierProjection\([\s\S]*resolveSWEBodelningProfileDossierSnapshot\(\s*releaseEvalRun,\s*options,\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function resolveCMDProfileDossierProjection\([\s\S]*resolveCMDProfileDossierSnapshot\(releaseEvalRun,\s*options\)/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackage\([\s\S]*resolveCMDProfileDossierSnapshot\(releaseEvalRun,\s*options\)/,
  );
  assert.match(
    governanceIndexText,
    /resolveProfileDossierSnapshot: resolveSWEBodelningProfileDossierSnapshot,/,
  );
  assert.match(
    governanceIndexText,
    /resolveProfileDossierSnapshot: resolveCMDProfileDossierSnapshot,/,
  );
  assert.match(
    governanceIndexText,
    /function resolveReleaseEvalProfileDossierSnapshot\(\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.resolveProfileDossierSnapshot\(releaseEvalRun,\s*options\);/,
  );
  assert.match(
    governanceIndexText,
    /^\s*resolveSWEBodelningProfileDossierSnapshot,\s*$/m,
  );
  assert.doesNotMatch(
    governanceIndexText,
    /^\s*resolveCMDProfileDossierSnapshot,\s*$/m,
  );
  assert.match(
    governanceIndexText,
    /^\s*resolveReleaseEvalProfileDossierSnapshot,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bresolveSWEBodelningProfileDossierSnapshot\b/,
    ),
    [
      5356,
      5376,
      5390,
      5742,
      5991,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bresolveCMDProfileDossierSnapshot\b/,
    ),
    [
      1776,
      5707,
      5714,
      5729,
      5751,
    ],
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, [
      "resolveSWEBodelningProfileDossierSnapshot",
      "resolveCMDProfileDossierSnapshot",
    ]),
    [
      {
        fnName: "resolveCMDProfileDossierSnapshot",
        caller: "deriveCMDExportPackage",
        line: 1776,
      },
      {
        fnName: "resolveSWEBodelningProfileDossierSnapshot",
        caller: "resolveSWEBodelningProfileDossierProjection",
        line: 5376,
      },
      {
        fnName: "resolveSWEBodelningProfileDossierSnapshot",
        caller: "attachSWEBodelningProfileDossierSnapshot",
        line: 5390,
      },
      {
        fnName: "resolveCMDProfileDossierSnapshot",
        caller: "attachCMDProfileDossierSnapshot",
        line: 5707,
      },
      {
        fnName: "resolveCMDProfileDossierSnapshot",
        caller: "resolveCMDProfileDossierProjection",
        line: 5729,
      },
    ],
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, [
      "hasCurrentSWEBodelningProfileDossierSnapshot",
      "hasSchemaValidSWEBodelningProfileDossierSnapshot",
      "hasSchemaValidCMDProfileDossierSnapshot",
    ]).filter(
      ({ caller }) =>
        caller === "deriveSWEBodelningProfileDossierSnapshotStatus" ||
        caller === "deriveCMDProfileDossierSnapshotStatus" ||
        caller === "resolveSWEBodelningProfileDossierSnapshot" ||
        caller === "resolveCMDProfileDossierSnapshot",
    ),
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
      /\bresolveSWEBodelningProfileDossierSnapshot\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bresolveCMDProfileDossierSnapshot\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bresolveReleaseEvalProfileDossierSnapshot\b/,
    ),
    [36, 203],
  );

  assert.deepEqual(
    collectLineMatches(
      releaseEvalRunPersistenceTestText,
      /\bresolveSWEBodelningProfileDossierSnapshot\b/,
    ),
    [35, 294],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalRunPersistenceTestText,
      /\bresolveCMDProfileDossierSnapshot\b/,
    ),
    [],
  );
  assert.match(
    releaseEvalRunPersistenceTestText,
    /assert\.strictEqual\(resolvedSnapshot,\s*releaseEvalRun\.profile_dossier_snapshot\);/s,
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalAdapterRegistryTestText,
      /\bresolveProfileDossierSnapshot\(releaseEvalRun\)/,
    ),
    [209],
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /validateCMDProfileDossierSnapshot\(releaseEvalWithSnapshot\.profile_dossier_snapshot\)[\s\S]*releaseEvalWithSnapshot\.profile_dossier_snapshot/s,
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /assert\.deepEqual\(resolvedSnapshot,\s*releaseEvalWithSnapshot\.profile_dossier_snapshot\);/s,
  );
});
