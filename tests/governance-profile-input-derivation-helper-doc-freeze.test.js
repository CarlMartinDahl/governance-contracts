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
const profileInputGovernanceTestText = fs.readFileSync(
  path.join(__dirname, "profile-input-governance.test.js"),
  "utf8",
);
const profileInputAdapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "profile-input-adapter-registry.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared governance profile-input derivation helper seam as the profile-specific derivation boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile-Input Derivation Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileInputLaneSnapshot(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function getProfileInputAdapter(",
    helperStart,
  );
  const adapterStart = governanceIndexText.indexOf(
    "const sweBodelningProfileInputAdapter = Object.freeze({",
    helperStart,
  );
  const exportStart = governanceIndexText.indexOf("module.exports = {");

  assert.ok(docsSectionMatch, "expected profile-input derivation docs section");
  assert.notEqual(helperStart, -1, "expected SWE lane derivation helper");
  assert.notEqual(helperEnd, -1, "expected end of derivation/adapter backing slice");
  assert.notEqual(adapterStart, -1, "expected adapter backing slot wiring");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const adapterSlice = governanceIndexText.slice(adapterStart, helperEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile-Input Derivation Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-input derivation helper family formed by `deriveSWEBodelningProfileInputLaneSnapshot`, `deriveSWEBodelningProfileInputSummary`, `deriveSWEBodelningProfileInputSnapshot`, `deriveCMDProfileInputLaneSnapshot`, `deriveCMDProfileInputSummary`, and `deriveCMDProfileInputSnapshot` is the canonical internal governance-side profile-specific profile-input derivation boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surfaces in this freeze are limited to:\s+`SWE_BODELNING` profile-input lane-snapshot derivation\s+`SWE_BODELNING` profile-input summary derivation\s+`SWE_BODELNING` canonical profile-input snapshot derivation\s+`"CMD_PROFILE"` profile-input lane-snapshot derivation\s+`"CMD_PROFILE"` profile-input summary derivation\s+`"CMD_PROFILE"` canonical profile-input snapshot derivation/i,
  );
  assert.match(
    docsSection,
    /`deriveSWEBodelningProfileInputLaneSnapshot` asserting object-shaped input and `profile_input_lane_snapshot`, iterating the current SWE required lane set, copying `has_value` and `value`, and preserving `evidence_object_ids` when present/i,
  );
  assert.match(
    docsSection,
    /`deriveSWEBodelningProfileInputSummary` deriving the SWE missing-value lane set from `deriveSWEBodelningProfileInputLaneSnapshot\(\.\.\.\)` and returning `required_lane_count`, `lanes_with_value_count`, and `missing_value_lane_keys`/i,
  );
  assert.match(
    docsSection,
    /`deriveSWEBodelningProfileInputSnapshot` asserting object-shaped input, gating `profile_inputs` support through `assertSupportedJurisdictionProfileCapability\(\.\.\.\)`, deriving the SWE lane snapshot and summary through the two SWE helpers, and returning the canonical `SWE_BODELNING` profile-input snapshot/i,
  );
  assert.match(
    docsSection,
    /`deriveCMDProfileInputLaneSnapshot` asserting object-shaped input and `profile_input_lane_snapshot`, iterating the current `"CMD_PROFILE"` required lane set, copying `has_value` and `value`, and preserving `evidence_object_ids` when present/i,
  );
  assert.match(
    docsSection,
    /`deriveCMDProfileInputSummary` deriving the CMD missing-value lane set from `deriveCMDProfileInputLaneSnapshot\(\.\.\.\)` and returning `required_lane_count`, `lanes_with_value_count`, and `missing_value_lane_keys`/i,
  );
  assert.match(
    docsSection,
    /`deriveCMDProfileInputSnapshot` asserting object-shaped input, deriving the CMD lane snapshot and summary through the two CMD helpers, and returning the canonical `"CMD_PROFILE"` profile-input snapshot/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen profile-input adapter-registry seam is limited to `sweBodelningProfileInputAdapter` and `cmdProfileInputAdapter` wiring these six profile-specific derivation helpers into their `deriveProfileInputLaneSnapshot`, `deriveProfileInputSummary`, and `deriveProfileInputSnapshot` slots/i,
  );
  assert.match(
    docsSection,
    /adapter registry metadata, lookup, validation dispatch, and generic profile-input dispatch ownership remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen shared jurisdiction-profile registry seam is limited to the SWE snapshot helper consuming `assertSupportedJurisdictionProfileCapability\(input\.jurisdiction_profile_key, "profile_inputs"\)` before returning the canonical SWE snapshot/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen governance plain-object helper seam is limited to these helpers consuming `assertPlainObject\(\.\.\.\)` for input, lane snapshot, and lane-entry shape checks/i,
  );
  assert.match(
    docsSection,
    /thin authenticated profile-input read\/write route seams is negative and separate because routes call the shared validation\/database paths and do not directly own or call these profile-specific derivation helpers/i,
  );
  assert.match(
    docsSection,
    /database writer consuming the separate generic `deriveProfileInputSnapshot\(profileInputSnapshot\)` adapter-registry dispatch helper before persistence/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to the six helper definitions, the SWE summary and snapshot helpers chaining through the SWE lane helper, the CMD summary and snapshot helpers chaining through the CMD lane helper, adapter-slot backing reuse through the existing `sweBodelningProfileInputAdapter` and `cmdProfileInputAdapter`, release-eval profile-input context helper reuse of the SWE\/CMD lane and SWE snapshot helpers, and the current named module export surface exposing only the SWE derivation helpers directly while the CMD derivation helpers remain internal behind adapter dispatch/i,
  );
  assert.match(
    docsSection,
    /release-eval derivation, release-eval adapter families, profile-dossier helpers, export-package derivation, export-package adapter\/projection families, artifact helper families, route\/parser\/auth\/response-helper behavior, database persistence, schemas validation, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  const helperNames = [
    "deriveSWEBodelningProfileInputLaneSnapshot",
    "deriveSWEBodelningProfileInputSummary",
    "deriveSWEBodelningProfileInputSnapshot",
    "deriveCMDProfileInputLaneSnapshot",
    "deriveCMDProfileInputSummary",
    "deriveCMDProfileInputSnapshot",
  ];

  for (const name of helperNames) {
    assert.equal(
      (governanceIndexText.match(new RegExp(`function ${name}\\(`, "g")) || [])
        .length,
      1,
    );
  }

  assert.match(
    helperSlice,
    /function deriveSWEBodelningProfileInputLaneSnapshot\(input\)\s*\{[\s\S]*assertPlainObject\(input, "ERR_PROFILE_INPUT_INVALID", "input"\);[\s\S]*assertPlainObject\(\s*sourceSnapshot,\s*"ERR_PROFILE_INPUT_INVALID",\s*"profile_input_lane_snapshot",\s*\);[\s\S]*for \(const laneKey of laneKeys\)[\s\S]*has_value: entry\.has_value,[\s\S]*value: entry\.value,[\s\S]*derivedEntry\.evidence_object_ids = \[\.\.\.entry\.evidence_object_ids\];[\s\S]*return derivedSnapshot;[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /function deriveSWEBodelningProfileInputSummary\(input\)\s*\{[\s\S]*const laneSnapshot = deriveSWEBodelningProfileInputLaneSnapshot\(input\);[\s\S]*const missing_value_lane_keys = laneKeys\.filter\([\s\S]*required_lane_count: laneKeys\.length,[\s\S]*lanes_with_value_count: laneKeys\.length - missing_value_lane_keys\.length,[\s\S]*missing_value_lane_keys,[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /function deriveSWEBodelningProfileInputSnapshot\(input\)\s*\{[\s\S]*assertPlainObject\(input, "ERR_PROFILE_INPUT_INVALID", "input"\);[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*input\.jurisdiction_profile_key,\s*"profile_inputs",\s*\);[\s\S]*const profile_input_lane_snapshot = deriveSWEBodelningProfileInputLaneSnapshot\(input\);[\s\S]*const profile_input_summary = deriveSWEBodelningProfileInputSummary\(\{[\s\S]*profile_input_lane_snapshot,[\s\S]*\}\);[\s\S]*jurisdiction_profile_key: supportedProfileKey,[\s\S]*profile_input_summary,[\s\S]*profile_input_lane_snapshot,[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /function deriveCMDProfileInputLaneSnapshot\(input\)\s*\{[\s\S]*assertPlainObject\(input, "ERR_PROFILE_INPUT_INVALID", "input"\);[\s\S]*assertPlainObject\(\s*sourceSnapshot,\s*"ERR_PROFILE_INPUT_INVALID",\s*"profile_input_lane_snapshot",\s*\);[\s\S]*for \(const laneKey of cmdLaneKeys\)[\s\S]*has_value: entry\.has_value,[\s\S]*value: entry\.value,[\s\S]*derivedEntry\.evidence_object_ids = \[\.\.\.entry\.evidence_object_ids\];[\s\S]*return derivedSnapshot;[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /function deriveCMDProfileInputSummary\(input\)\s*\{[\s\S]*const laneSnapshot = deriveCMDProfileInputLaneSnapshot\(input\);[\s\S]*const missing_value_lane_keys = cmdLaneKeys\.filter\([\s\S]*required_lane_count: cmdLaneKeys\.length,[\s\S]*lanes_with_value_count: cmdLaneKeys\.length - missing_value_lane_keys\.length,[\s\S]*missing_value_lane_keys,[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /function deriveCMDProfileInputSnapshot\(input\)\s*\{[\s\S]*assertPlainObject\(input, "ERR_PROFILE_INPUT_INVALID", "input"\);[\s\S]*const profile_input_lane_snapshot = deriveCMDProfileInputLaneSnapshot\(input\);[\s\S]*const profile_input_summary = deriveCMDProfileInputSummary\(\{[\s\S]*profile_input_lane_snapshot,[\s\S]*\}\);[\s\S]*jurisdiction_profile_key: cmdProfileKey,[\s\S]*profile_input_summary,[\s\S]*profile_input_lane_snapshot,[\s\S]*\}/,
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
  assert.match(
    adapterSlice,
    /deriveProfileInputLaneSnapshot: deriveCMDProfileInputLaneSnapshot,/,
  );
  assert.match(adapterSlice, /deriveProfileInputSummary: deriveCMDProfileInputSummary,/);
  assert.match(adapterSlice, /deriveProfileInputSnapshot: deriveCMDProfileInputSnapshot,/);

  assert.match(exportSlice, /^\s*deriveSWEBodelningProfileInputLaneSnapshot,\s*$/m);
  assert.match(exportSlice, /^\s*deriveSWEBodelningProfileInputSummary,\s*$/m);
  assert.match(exportSlice, /^\s*deriveSWEBodelningProfileInputSnapshot,\s*$/m);
  assert.doesNotMatch(exportSlice, /^\s*deriveCMDProfileInputLaneSnapshot,\s*$/m);
  assert.doesNotMatch(exportSlice, /^\s*deriveCMDProfileInputSummary,\s*$/m);
  assert.doesNotMatch(exportSlice, /^\s*deriveCMDProfileInputSnapshot,\s*$/m);

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveSWEBodelningProfileInputLaneSnapshot\b/),
    [
      432,
      469,
      489,
      568,
      819,
      6011,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveSWEBodelningProfileInputSummary\b/),
    [
      468,
      490,
      569,
      6012,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveSWEBodelningProfileInputSnapshot\b/),
    [
      481,
      570,
      835,
      6013,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveCMDProfileInputLaneSnapshot\b/),
    [
      501,
      538,
      553,
      576,
      849,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveCMDProfileInputSummary\b/),
    [537, 554, 577],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveCMDProfileInputSnapshot\b/),
    [550, 578],
  );

  assert.doesNotMatch(apiIndexText, /deriveSWEBodelningProfileInputLaneSnapshot\(/);
  assert.doesNotMatch(apiIndexText, /deriveSWEBodelningProfileInputSummary\(/);
  assert.doesNotMatch(apiIndexText, /deriveSWEBodelningProfileInputSnapshot\(/);
  assert.doesNotMatch(apiIndexText, /deriveCMDProfileInputLaneSnapshot\(/);
  assert.doesNotMatch(apiIndexText, /deriveCMDProfileInputSummary\(/);
  assert.doesNotMatch(apiIndexText, /deriveCMDProfileInputSnapshot\(/);
  assert.match(apiIndexText, /validateProfileInputSnapshot\(request\.body\);/);

  assert.doesNotMatch(databaseIndexText, /deriveSWEBodelningProfileInputLaneSnapshot\(/);
  assert.doesNotMatch(databaseIndexText, /deriveSWEBodelningProfileInputSummary\(/);
  assert.doesNotMatch(databaseIndexText, /deriveSWEBodelningProfileInputSnapshot\(/);
  assert.doesNotMatch(databaseIndexText, /deriveCMDProfileInputLaneSnapshot\(/);
  assert.doesNotMatch(databaseIndexText, /deriveCMDProfileInputSummary\(/);
  assert.doesNotMatch(databaseIndexText, /deriveCMDProfileInputSnapshot\(/);
  assert.match(
    databaseIndexText,
    /const canonicalSnapshot = deriveProfileInputSnapshot\(profileInputSnapshot\);/,
  );

  assert.match(
    profileInputGovernanceTestText,
    /deriveSWEBodelningProfileInputSummary\(input\)/,
  );
  assert.match(
    profileInputGovernanceTestText,
    /deriveSWEBodelningProfileInputLaneSnapshot\(input\)/,
  );
  assert.match(
    profileInputGovernanceTestText,
    /deriveSWEBodelningProfileInputSnapshot\(input\)/,
  );
  assert.match(
    profileInputAdapterRegistryTestText,
    /deriveProfileInputLaneSnapshot\(cmdProfileInput\)/,
  );
  assert.match(
    profileInputAdapterRegistryTestText,
    /deriveProfileInputSummary\(cmdProfileInput\)/,
  );
  assert.match(
    profileInputAdapterRegistryTestText,
    /deriveProfileInputSnapshot\(cmdProfileInput\)/,
  );
});
