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
const snapshotStatusFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-profile-dossier-snapshot-status-helper-doc-freeze.test.js",
  ),
  "utf8",
);
const snapshotFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-profile-dossier-snapshot-helper-doc-freeze.test.js",
  ),
  "utf8",
);
const projectionFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-profile-dossier-projection-helper-doc-freeze.test.js",
  ),
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

function extractDocsSection(heading) {
  const headingIndex = docsText.indexOf(heading);
  assert.notEqual(headingIndex, -1, `Missing docs section: ${heading}`);

  const nextHeadingIndex = docsText.indexOf("\n### ", headingIndex + 1);
  return docsText.slice(
    headingIndex,
    nextHeadingIndex === -1 ? docsText.length : nextHeadingIndex,
  );
}

const currentnessGateSection = extractDocsSection(
  "### Shared Governance Profile Dossier Currentness-Gate Helper Seam Freeze",
);

test("docs freeze exactly the three-helper profile-dossier currentness/schema-valid gate seam", () => {
  assert.match(
    currentnessGateSection,
    /profile-dossier currentness\/schema-valid gate helper seam formed exactly by `hasCurrentSWEBodelningProfileDossierSnapshot\(\.\.\.\)`, `hasSchemaValidSWEBodelningProfileDossierSnapshot\(\.\.\.\)`, and `hasSchemaValidCMDProfileDossierSnapshot\(\.\.\.\)` is the canonical governance-side helper-local gate boundary/i,
  );
  assert.match(
    currentnessGateSection,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`SWE_BODELNING` profile-dossier persisted-snapshot currentness gating through `hasCurrentSWEBodelningProfileDossierSnapshot\(\.\.\.\)`\s+`SWE_BODELNING` profile-dossier persisted-snapshot schema-valid gating through `hasSchemaValidSWEBodelningProfileDossierSnapshot\(\.\.\.\)`\s+`"CMD_PROFILE"` profile-dossier persisted-snapshot schema-valid gating through `hasSchemaValidCMDProfileDossierSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    currentnessGateSection,
    /the currently concrete helper responsibilities already evidenced for this seam are limited to:\s+checking that a `profile_dossier_snapshot` object is present before reuse decisions are made\s+checking the SWE snapshot `projection_version` against the current `profileDossierProjectionVersion` through `hasCurrentSWEBodelningProfileDossierSnapshot\(\.\.\.\)`\s+validating the SWE snapshot through `validateSWEBodelningProfileDossierSnapshot\(snapshot\)` inside `hasSchemaValidSWEBodelningProfileDossierSnapshot\(\.\.\.\)` and returning `false` on validator failure\s+validating the CMD release-eval run containing the snapshot through `validateCMDReleaseEvalRun\(releaseEvalRun\)` inside `hasSchemaValidCMDProfileDossierSnapshot\(\.\.\.\)` and returning `false` on validator failure\s+returning booleans for helper-local currentness\/schema-valid gate checks only/i,
  );
  assert.match(
    currentnessGateSection,
    /no fourth center helper is part of this seam under current evidence, and no CMD currentness helper is inferred or frozen by this seam/i,
  );
  assert.doesNotMatch(
    currentnessGateSection,
    /hasCurrentCMDProfileDossierSnapshot/,
  );
});

test("docs preserve bounded consumers, export-status asymmetry, and negative boundaries", () => {
  assert.match(
    currentnessGateSection,
    /the relationship to the already-frozen profile-dossier `snapshot_status` helper seam is boundary\/consumer context only because `deriveSWEBodelningProfileDossierSnapshotStatus\(\.\.\.\)` consumes the two SWE gates and `deriveCMDProfileDossierSnapshotStatus\(\.\.\.\)` consumes the CMD schema-valid gate to derive `snapshot_is_current`, while the separate `snapshot_status` helper pair owns the four-field status object derivation/i,
  );
  assert.match(
    currentnessGateSection,
    /the relationship to the already-frozen profile-dossier snapshot-resolution helper seam is boundary\/consumer context only because `resolveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` consumes the two SWE gates and `resolveCMDProfileDossierSnapshot\(\.\.\.\)` consumes the CMD schema-valid gate for persisted-snapshot reuse, while the separate snapshot-resolution helper pair owns force-reproject handling, capability gating, snapshot return\/canonicalization, and fallback derivation/i,
  );
  assert.match(
    currentnessGateSection,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to three helper definitions, three snapshot-status helper call sites, three snapshot-resolution helper call sites, and the current named module export surface exposing `hasCurrentSWEBodelningProfileDossierSnapshot` and `hasSchemaValidSWEBodelningProfileDossierSnapshot` while not exposing `hasSchemaValidCMDProfileDossierSnapshot`/i,
  );
  assert.match(
    currentnessGateSection,
    /schema validator ownership remains outside this helper seam because `validateSWEBodelningProfileDossierSnapshot\(\.\.\.\)` and `validateCMDReleaseEvalRun\(\.\.\.\)` are consumed only as bounded validation handoffs and continue to own lower validation\/canonicalization behavior outside these boolean gates/i,
  );
  assert.match(
    currentnessGateSection,
    /release-eval validation core behavior remains outside this helper seam because the CMD gate consumes release-eval validation only to decide whether the embedded `profile_dossier_snapshot` can be treated as schema-valid/i,
  );
  assert.match(
    currentnessGateSection,
    /profile-dossier snapshot resolution, profile-dossier `snapshot_status` derivation, profile-dossier projection assembly, profile-dossier attach helpers, database persistence\/read\/refresh behavior, route\/API behavior, export-package behavior, broader governance\/runtime behavior, and already-closed helper families remain outside this seam/i,
  );
  assert.match(
    currentnessGateSection,
    /future governance-side profile-dossier currentness\/schema-valid gate behavior that needs the same exact three-helper boundary should extend this seam instead of adding parallel currentness\/schema-valid checks inside snapshot-resolution helpers, snapshot-status helpers, projection helpers, attach helpers, schema validators, routes, database helpers, export-package helpers, or broader runtime orchestration/i,
  );
  assert.match(
    currentnessGateSection,
    /does not change runtime behavior, currentness semantics, schema validation semantics, release-eval semantics, snapshot semantics, projection semantics, persistence semantics, API behavior, export-package behavior, schema behavior, or fail-closed behavior/i,
  );
});

test("runtime evidence still defines the three helper-local currentness/schema-valid gates", () => {
  assert.match(
    governanceIndexText,
    /function hasCurrentSWEBodelningProfileDossierSnapshot\(releaseEvalRun\) \{\s*const snapshot = releaseEvalRun\?\.profile_dossier_snapshot;\s*return \(\s*!!snapshot &&\s*typeof snapshot === "object" &&\s*!Array\.isArray\(snapshot\) &&\s*snapshot\.projection_version === profileDossierProjectionVersion\s*\);\s*\}/s,
  );
  assert.match(
    governanceIndexText,
    /function hasSchemaValidSWEBodelningProfileDossierSnapshot\(releaseEvalRun\) \{\s*const snapshot = releaseEvalRun\?\.profile_dossier_snapshot;\s*if \(!snapshot \|\| typeof snapshot !== "object" \|\| Array\.isArray\(snapshot\)\) \{\s*return false;\s*\}\s*try \{\s*validateSWEBodelningProfileDossierSnapshot\(snapshot\);\s*return true;\s*\} catch \{\s*return false;\s*\}\s*\}/s,
  );
  assert.match(
    governanceIndexText,
    /function hasSchemaValidCMDProfileDossierSnapshot\(releaseEvalRun\) \{\s*if \(\s*!releaseEvalRun\?\.profile_dossier_snapshot \|\|\s*typeof releaseEvalRun\.profile_dossier_snapshot !== "object" \|\|\s*Array\.isArray\(releaseEvalRun\.profile_dossier_snapshot\)\s*\) \{\s*return false;\s*\}\s*try \{\s*validateCMDReleaseEvalRun\(releaseEvalRun\);\s*return true;\s*\} catch \{\s*return false;\s*\}\s*\}/s,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bhasCurrentSWEBodelningProfileDossierSnapshot\b/,
    ),
    [
      4835,
      4869,
      5366,
      5956,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bhasSchemaValidSWEBodelningProfileDossierSnapshot\b/,
    ),
    [
      4846,
      4870,
      5367,
      5957,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bhasSchemaValidCMDProfileDossierSnapshot\b/,
    ),
    [
      4880,
      4898,
      5720,
    ],
  );
});

test("runtime evidence limits consumers to snapshot-status and snapshot-resolution helpers", () => {
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
  assert.match(
    governanceIndexText,
    /const snapshotIsCurrent =\s*hasCurrentSWEBodelningProfileDossierSnapshot\(releaseEvalRun\) &&\s*hasSchemaValidSWEBodelningProfileDossierSnapshot\(releaseEvalRun\);/,
  );
  assert.match(
    governanceIndexText,
    /const snapshotIsCurrent = hasSchemaValidCMDProfileDossierSnapshot\(releaseEvalRun\);/,
  );
  assert.match(
    governanceIndexText,
    /options\.force_reproject !== true &&\s*hasCurrentSWEBodelningProfileDossierSnapshot\(releaseEvalRun\) &&\s*hasSchemaValidSWEBodelningProfileDossierSnapshot\(releaseEvalRun\)/,
  );
  assert.match(
    governanceIndexText,
    /options\.force_reproject !== true &&\s*hasSchemaValidCMDProfileDossierSnapshot\(releaseEvalRun\)/,
  );
});

test("module export evidence keeps SWE gate helpers exported and CMD schema-valid gate internal", () => {
  assert.match(
    governanceIndexText,
    /^\s*hasCurrentSWEBodelningProfileDossierSnapshot,\s*$/m,
  );
  assert.match(
    governanceIndexText,
    /^\s*hasSchemaValidSWEBodelningProfileDossierSnapshot,\s*$/m,
  );
  assert.doesNotMatch(
    governanceIndexText,
    /^\s*hasSchemaValidCMDProfileDossierSnapshot,\s*$/m,
  );
});

test("adjacent frozen seams keep currentness-gate helpers outside snapshot-status, snapshot-resolution, projection, and schema validator ownership", () => {
  assert.match(
    docsText,
    /the nearby governance currentness-gate helpers `hasCurrentSWEBodelningProfileDossierSnapshot`, `hasSchemaValidSWEBodelningProfileDossierSnapshot`, and `hasSchemaValidCMDProfileDossierSnapshot` remain outside this narrower helper seam because current repo evidence shows them serving the separate `resolveSWEBodelningProfileDossierSnapshot` and `resolveCMDProfileDossierSnapshot` helpers in addition to the `snapshot_status` pair/i,
  );
  assert.match(
    docsText,
    /the nearby governance currentness-gate helpers remain outside this helper seam because current repo evidence shows them serving both the snapshot-helper pair and the separate `snapshot_status` helper seam instead of forming a narrower snapshot-helper-only boundary/i,
  );
  assert.match(
    docsText,
    /the already-frozen governance profile-dossier `snapshot_status` helper seam remains outside this helper seam because deriving the shared four-field `snapshot_status` block is a narrower helper responsibility consumed by the projection helper pair rather than defined by it/i,
  );
  assert.match(
    snapshotStatusFreezeTestText,
    /remain outside this narrower helper seam because current repo evidence shows them serving the separate `resolveSWEBodelningProfileDossierSnapshot` and `resolveCMDProfileDossierSnapshot` helpers in addition to the `snapshot_status` pair/i,
  );
  assert.match(
    snapshotFreezeTestText,
    /the nearby governance currentness-gate helpers remain outside this helper seam because current repo evidence shows them serving both the snapshot-helper pair and the separate `snapshot_status` helper seam instead of forming a narrower snapshot-helper-only boundary/i,
  );
  assert.match(
    projectionFreezeTestText,
    /the already-frozen governance profile-dossier `snapshot_status` helper seam remains outside this helper seam because deriving the shared four-field `snapshot_status` block is a narrower helper responsibility consumed by the projection helper pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the lower schemas profile-dossier validator seam remains outside this helper seam because lower profile-dossier snapshot validation is a separate lower-boundary responsibility reached through nearby currentness gates and CMD canonicalization rather than defined by this governance-side snapshot-resolution pair itself/i,
  );
});
