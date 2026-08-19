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
const apiIndexText = fs.readFileSync(
  path.join(__dirname, "..", "apps", "api", "src", "index.js"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const lines = text.split("\n");
  const matches = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (pattern.test(lines[index])) {
      matches.push(index + 1);
    }
  }
  return matches;
}

test("docs freeze the shared governance profile-input adapter-registry seam as the profile-input-specific registry and validation/canonicalization dispatch boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile-Input Adapter-Registry Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const adapterSliceStart = governanceIndexText.indexOf(
    "const sweBodelningProfileInputAdapter = Object.freeze({",
  );
  const adapterSliceEnd = governanceIndexText.indexOf(
    "function laneHasSupport(entry) {",
    adapterSliceStart,
  );
  const exportSliceStart = governanceIndexText.indexOf("module.exports = {");

  assert.ok(docsSectionMatch, "expected profile-input adapter-registry docs section");
  assert.notEqual(adapterSliceStart, -1, "expected profile-input adapter slice");
  assert.notEqual(adapterSliceEnd, -1, "expected end of profile-input adapter slice");
  assert.notEqual(exportSliceStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const adapterSlice = governanceIndexText.slice(adapterSliceStart, adapterSliceEnd);
  const exportSlice = governanceIndexText.slice(exportSliceStart);

  assert.match(
    docsSection,
    /shared `packages\/governance\/src\/index\.js` profile-input adapter-registry seam formed by `profileInputAdapterRegistry`, `getProfileInputAdapter`, `validateProfileInputSnapshot`, `deriveProfileInputLaneSnapshot`, `deriveProfileInputSummary`, and `deriveProfileInputSnapshot` is the canonical internal governance-side profile-input adapter lookup and validation\/canonicalization dispatch boundary/i,
  );
  assert.match(
    docsSection,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`profile_inputs` adapter lookup keyed by `jurisdiction_profile_key`\s+shared profile-input snapshot validation dispatch\s+shared profile-input lane-snapshot derivation dispatch\s+shared profile-input summary derivation dispatch\s+shared profile-input canonical snapshot derivation dispatch/i,
  );
  assert.match(
    docsSection,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the explicit profile-input adapter entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the shared registry object\s+returning the current adapter entry or `null` through the shared `getProfileInputAdapter` lookup helper\s+dispatching shared profile-input snapshot validation through the shared registry with current SWE fallback behavior when `jurisdiction_profile_key` is missing or empty\s+dispatching shared profile-input lane-snapshot derivation through the shared registry keyed by `jurisdiction_profile_key`\s+dispatching shared profile-input summary derivation through the shared registry keyed by `jurisdiction_profile_key`\s+dispatching shared profile-input canonical snapshot derivation through the shared registry keyed by `jurisdiction_profile_key`/i,
  );
  assert.match(
    docsSection,
    /the current relationship to profile-specific profile-input helper wiring already evidenced in `packages\/governance\/src\/index\.js` is limited to `sweBodelningProfileInputAdapter` and `cmdProfileInputAdapter` exposing `validateProfileInputSnapshot`, `deriveProfileInputLaneSnapshot`, `deriveProfileInputSummary`, and `deriveProfileInputSnapshot` slots backed by the existing profile-specific helper implementations, while the shared registry\/lookup\/dispatch seam delegates through those adapter slots instead of reconstructing profile-specific profile-input logic itself/i,
  );
  assert.match(
    docsSection,
    /the current relationship to the already-frozen shared jurisdiction-profile registry seam already evidenced in `packages\/governance\/src\/jurisdiction-profile-registry\.js` is limited to unsupported-profile capability gating through `assertSupportedJurisdictionProfileCapability\(\.\.\., "profile_inputs"\)`, while machine-readable profile\/capability metadata ownership remains outside this seam/i,
  );
  assert.match(
    docsSection,
    /the current relationship to the already-frozen thin authenticated `GET \/cases\/:caseId\/profile-inputs` seam is limited to that route reading persisted snapshots through the separate database reader seam, while route-edge auth\/access, route-edge response shaping, and persisted-read orchestration remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /the current relationship to the already-frozen thin authenticated `PATCH \/cases\/:caseId\/profile-inputs` seam is limited to that route validating request bodies through `validateProfileInputSnapshot\(request\.body\)` before delegating persisted writes to the separate database writer seam, while route-edge auth\/access, route-edge envelope shaping, and persisted-write orchestration remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /the current relationship to the already-frozen shared database case-profile-input reader\/writer helper seams is limited to the reader\/writer consuming `validateProfileInputSnapshot` and `deriveProfileInputSnapshot` as lower governance-side helpers, while persistence I\/O, normalized record shaping, and route\/database orchestration remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 profile-specific adapter object definitions, 1 shared registry definition, 1 shared lookup helper definition, 4 shared validation\/canonicalization dispatch helper definitions, and the current named module export surface exposing `deriveProfileInputLaneSnapshot`, `deriveProfileInputSnapshot`, `deriveProfileInputSummary`, `getProfileInputAdapter`, `profileInputAdapterRegistry`, and `validateProfileInputSnapshot`/i,
  );
  assert.match(
    docsSection,
    /the frozen broader shared governance adapter-dispatch scaffold remains outside this seam because it owns the wider multi-surface runtime\/governance boundary across profile input, release-eval, export-package, artifact, and bundle surfaces rather than this narrower profile-input-specific registry\/lookup\/validation-canonicalization sub-seam/i,
  );
  assert.match(
    docsSection,
    /the frozen shared governance release-eval adapter-registry family remains outside this seam because `release_eval` dispatch, reconciliation, and dossier-related orchestration are a separate governed runtime family/i,
  );
  assert.match(
    docsSection,
    /the frozen shared governance export-package adapter-dispatch family remains outside this seam because `export_package` derivation and projection dispatch are a separate governed runtime family/i,
  );
  assert.match(
    docsSection,
    /the shared governance capability-guard helper seam remains outside this seam because supported-profile gating is a separate frozen governance boundary even where the shared dispatchers currently consume it on unsupported profile paths/i,
  );
  assert.match(
    docsSection,
    /the shared governance plain-object helper seam remains outside this seam because governance-local object-shape gating is a separate frozen boundary even where the shared dispatchers currently consume it before adapter lookup/i,
  );
  assert.match(
    docsSection,
    /future governance-side profile-input adapter lookup or shared profile-input validation\/canonicalization dispatch behavior that needs the same shared registry path should extend this seam instead of bypassing it in routes, database helpers, or adjacent governed families/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  assert.match(adapterSlice, /const sweBodelningProfileInputAdapter = Object\.freeze\(\{/);
  assert.match(
    adapterSlice,
    /validateProfileInputSnapshot: validateSWEBodelningProfileInputSnapshot,/,
  );
  assert.match(
    adapterSlice,
    /deriveProfileInputLaneSnapshot: deriveSWEBodelningProfileInputLaneSnapshot,/,
  );
  assert.match(
    adapterSlice,
    /deriveProfileInputSummary: deriveSWEBodelningProfileInputSummary,/,
  );
  assert.match(
    adapterSlice,
    /deriveProfileInputSnapshot: deriveSWEBodelningProfileInputSnapshot,/,
  );
  assert.match(adapterSlice, /const cmdProfileInputAdapter = Object\.freeze\(\{/);
  assert.match(adapterSlice, /validateProfileInputSnapshot: validateCMDProfileInputSnapshot,/);
  assert.match(
    adapterSlice,
    /deriveProfileInputLaneSnapshot: deriveCMDProfileInputLaneSnapshot,/,
  );
  assert.match(adapterSlice, /deriveProfileInputSummary: deriveCMDProfileInputSummary,/);
  assert.match(adapterSlice, /deriveProfileInputSnapshot: deriveCMDProfileInputSnapshot,/);
  assert.match(
    adapterSlice,
    /const profileInputAdapterRegistry = Object\.freeze\(\{\s*\[supportedProfileKey\]: sweBodelningProfileInputAdapter,\s*\[cmdProfileKey\]: cmdProfileInputAdapter,\s*\}\);/,
  );
  assert.match(adapterSlice, /function getProfileInputAdapter\(jurisdictionProfileKey\)\s*\{/);
  assert.match(
    adapterSlice,
    /return profileInputAdapterRegistry\[jurisdictionProfileKey\] \?\? null;/,
  );
  assert.match(adapterSlice, /function validateProfileInputSnapshot\(profileInputSnapshot\)\s*\{/);
  assert.match(
    adapterSlice,
    /assertPlainObject\(\s*profileInputSnapshot,\s*"ERR_PROFILE_INPUT_INVALID",\s*"profileInputSnapshot",\s*\);/,
  );
  assert.match(
    adapterSlice,
    /return validateSWEBodelningProfileInputSnapshot\(profileInputSnapshot\);/,
  );
  assert.match(
    adapterSlice,
    /const adapter = getProfileInputAdapter\(\s*profileInputSnapshot\.jurisdiction_profile_key,\s*\);/,
  );
  assert.match(
    adapterSlice,
    /assertSupportedJurisdictionProfileCapability\(\s*profileInputSnapshot\.jurisdiction_profile_key,\s*"profile_inputs",\s*\);/,
  );
  assert.match(
    adapterSlice,
    /return adapter\.validateProfileInputSnapshot\(profileInputSnapshot\);/,
  );
  assert.match(adapterSlice, /function deriveProfileInputLaneSnapshot\(input\)\s*\{/);
  assert.match(
    adapterSlice,
    /return adapter\.deriveProfileInputLaneSnapshot\(input\);/,
  );
  assert.match(adapterSlice, /function deriveProfileInputSummary\(input\)\s*\{/);
  assert.match(adapterSlice, /return adapter\.deriveProfileInputSummary\(input\);/);
  assert.match(adapterSlice, /function deriveProfileInputSnapshot\(input\)\s*\{/);
  assert.match(adapterSlice, /return adapter\.deriveProfileInputSnapshot\(input\);/);
  assert.match(exportSlice, /deriveProfileInputLaneSnapshot,\n/);
  assert.match(exportSlice, /deriveProfileInputSnapshot,\n/);
  assert.match(exportSlice, /deriveProfileInputSummary,\n/);
  assert.match(exportSlice, /getProfileInputAdapter,\n/);
  assert.match(exportSlice, /profileInputAdapterRegistry,\n/);
  assert.match(exportSlice, /validateProfileInputSnapshot,\n/);

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bprofileInputAdapterRegistry\b/),
    [
      581,
      594,
      5974,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bgetProfileInputAdapter\b/),
    [
      586,
      611,
      628,
      643,
      658,
      5948,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bvalidateProfileInputSnapshot\b/),
    [
      567,
      575,
      597,
      622,
      6014,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveProfileInputLaneSnapshot\b/),
    [
      568,
      576,
      625,
      637,
      5914,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveProfileInputSummary\b/),
    [
      569,
      577,
      640,
      652,
      5916,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveProfileInputSnapshot\b/),
    [
      570,
      578,
      655,
      667,
      5915,
    ],
  );

  assert.match(apiIndexText, /validateProfileInputSnapshot\(request\.body\);/);
  assert.doesNotMatch(apiIndexText, /getProfileInputAdapter\(/);
  assert.doesNotMatch(apiIndexText, /profileInputAdapterRegistry/);
  assert.doesNotMatch(apiIndexText, /deriveProfileInputLaneSnapshot\(/);
  assert.doesNotMatch(apiIndexText, /deriveProfileInputSummary\(/);
  assert.doesNotMatch(apiIndexText, /deriveProfileInputSnapshot\(request\.body\)/);

  assert.match(databaseIndexText, /validateProfileInputSnapshot\(profileInputSnapshot\);/);
  assert.match(
    databaseIndexText,
    /const canonicalSnapshot = deriveProfileInputSnapshot\(profileInputSnapshot\);/,
  );
  assert.doesNotMatch(databaseIndexText, /getProfileInputAdapter\(/);
  assert.doesNotMatch(databaseIndexText, /profileInputAdapterRegistry/);
  assert.doesNotMatch(databaseIndexText, /deriveProfileInputLaneSnapshot\(/);
  assert.doesNotMatch(databaseIndexText, /deriveProfileInputSummary\(/);

  assert.doesNotMatch(governanceIndexText, /function getProfileDossierAdapter\(/);
});
