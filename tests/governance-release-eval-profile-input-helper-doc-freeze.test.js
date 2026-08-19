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
const releaseEvalRunRefreshTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-run-refresh.test.js"),
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

test("docs freeze the shared governance release-eval profile-input helper seam as the support-aware derivation boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Release-Eval Profile-Input Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function cloneSWEBodelningReleaseEvalProfileInputSummary(",
    helperStart,
  );
  const releaseEvalRunStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningReleaseEvalRun(",
  );
  const releaseEvalRunEnd = governanceIndexText.indexOf(
    "function reconcileCMDReleaseEvalRun(",
    releaseEvalRunStart,
  );
  const exportStart = governanceIndexText.indexOf("module.exports = {");

  assert.ok(docsSectionMatch, "expected release-eval profile-input docs section");
  assert.notEqual(helperStart, -1, "expected SWE release-eval lane helper");
  assert.notEqual(helperEnd, -1, "expected end of release-eval profile-input helper slice");
  assert.notEqual(releaseEvalRunStart, -1, "expected SWE release-eval run derivation");
  assert.notEqual(releaseEvalRunEnd, -1, "expected end of release-eval run derivation slice");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const releaseEvalRunSlice = governanceIndexText.slice(
    releaseEvalRunStart,
    releaseEvalRunEnd,
  );
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Release-Eval Profile-Input Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /release-eval profile-input helper family formed by `deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot`, `deriveSWEBodelningReleaseEvalProfileInputSummary`, `deriveCMDReleaseEvalProfileInputLaneSnapshot`, and `deriveCMDReleaseEvalProfileInputSummary` is the canonical internal governance-side release-eval profile-input derivation boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surfaces in this freeze are limited to:\s+`SWE_BODELNING` release-eval profile-input lane-snapshot derivation\s+`SWE_BODELNING` release-eval profile-input summary derivation\s+`"CMD_PROFILE"` release-eval profile-input lane-snapshot derivation\s+`"CMD_PROFILE"` release-eval profile-input summary derivation/i,
  );
  assert.match(
    docsSection,
    /`deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot` deriving the base SWE profile-input lane snapshot through `deriveSWEBodelningProfileInputLaneSnapshot\(\.\.\.\)`, copying each lane entry, and attaching `has_support` through `laneHasSupport\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /`deriveSWEBodelningReleaseEvalProfileInputSummary` deriving the base SWE profile-input snapshot through `deriveSWEBodelningProfileInputSnapshot\(\.\.\.\)`, deriving the release-eval lane snapshot through `deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot\(\.\.\.\)`, and returning the base profile-input summary plus `lanes_with_support_count` and `missing_support_lane_keys`/i,
  );
  assert.match(
    docsSection,
    /`deriveCMDReleaseEvalProfileInputLaneSnapshot` deriving the base CMD profile-input lane snapshot through `deriveCMDProfileInputLaneSnapshot\(\.\.\.\)`, normalizing `has_value` so empty string values are not release-eval complete, copying each lane entry, and attaching `has_support` through `laneHasSupport\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /`deriveCMDReleaseEvalProfileInputSummary` deriving the CMD release-eval lane snapshot through `deriveCMDReleaseEvalProfileInputLaneSnapshot\(\.\.\.\)` and returning the required\/value\/support counts plus `missing_value_lane_keys` and `missing_support_lane_keys`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen profile-input derivation helper seam is limited to these release-eval helpers consuming the base SWE\/CMD profile-input lane and snapshot helpers as lower inputs/i,
  );
  assert.match(
    docsSection,
    /base profile-input lane, summary, and canonical snapshot derivation ownership remains outside this seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen profile-input adapter-registry seam is negative and separate because these four helpers are not adapter registry entries, do not own adapter lookup, and do not own shared profile-input validation\/canonicalization dispatch/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to the four helper definitions, the SWE release-eval summary helper chaining through the SWE release-eval lane helper, the CMD release-eval summary helper chaining through the CMD release-eval lane helper, `deriveSWEBodelningReleaseEvalRun\(\.\.\.\)` consuming the SWE summary and lane helpers, `deriveCMDReleaseEvalRun\(\.\.\.\)` consuming the CMD summary and lane helpers, and the current named module export surface exposing these four helpers/i,
  );
  assert.match(
    docsSection,
    /release-eval adapter dispatch\/registry ownership, release-eval policy\/freshness\/scoring helpers, release-eval route behavior, database release-eval reader\/refresh\/writer\/persistence behavior, profile-dossier helper seams, export-package helper seams, route\/parser\/auth\/response-helper behavior, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  const helperNames = [
    "deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot",
    "deriveSWEBodelningReleaseEvalProfileInputSummary",
    "deriveCMDReleaseEvalProfileInputLaneSnapshot",
    "deriveCMDReleaseEvalProfileInputSummary",
  ];

  for (const name of helperNames) {
    assert.equal(
      (governanceIndexText.match(new RegExp(`function ${name}\\(`, "g")) || [])
        .length,
      1,
      `expected one ${name} definition`,
    );
    assert.match(exportSlice, new RegExp(`^\\s*${name},\\s*$`, "m"));
  }

  assert.match(
    helperSlice,
    /function deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot\(input\)\s*\{[\s\S]*const profileInputLaneSnapshot = deriveSWEBodelningProfileInputLaneSnapshot\(input\);[\s\S]*for \(const laneKey of laneKeys\)[\s\S]*\.\.\.entry,[\s\S]*has_support: laneHasSupport\(entry\),[\s\S]*return derivedSnapshot;[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /function deriveSWEBodelningReleaseEvalProfileInputSummary\(input\)\s*\{[\s\S]*const profileInputSnapshot = deriveSWEBodelningProfileInputSnapshot\(input\);[\s\S]*const releaseEvalLaneSnapshot = deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot\(input\);[\s\S]*const missing_support_lane_keys = laneKeys\.filter\([\s\S]*\.\.\.profileInputSnapshot\.profile_input_summary,[\s\S]*lanes_with_support_count: laneKeys\.length - missing_support_lane_keys\.length,[\s\S]*missing_support_lane_keys,[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /function deriveCMDReleaseEvalProfileInputLaneSnapshot\(input\)\s*\{[\s\S]*const profileInputLaneSnapshot = deriveCMDProfileInputLaneSnapshot\(input\);[\s\S]*for \(const laneKey of cmdLaneKeys\)[\s\S]*const has_value =[\s\S]*entry\.has_value === true &&[\s\S]*!\(typeof entry\.value === "string" && entry\.value\.length === 0\);[\s\S]*\.\.\.entry,[\s\S]*has_value,[\s\S]*has_support: laneHasSupport\(entry\),[\s\S]*return derivedSnapshot;[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /function deriveCMDReleaseEvalProfileInputSummary\(input\)\s*\{[\s\S]*const releaseEvalLaneSnapshot = deriveCMDReleaseEvalProfileInputLaneSnapshot\(input\);[\s\S]*const missing_value_lane_keys = cmdLaneKeys\.filter\([\s\S]*const missing_support_lane_keys = cmdLaneKeys\.filter\([\s\S]*required_lane_count: cmdLaneKeys\.length,[\s\S]*lanes_with_value_count: cmdLaneKeys\.length - missing_value_lane_keys\.length,[\s\S]*missing_value_lane_keys,[\s\S]*lanes_with_support_count: cmdLaneKeys\.length - missing_support_lane_keys\.length,[\s\S]*missing_support_lane_keys,[\s\S]*\}/,
  );

  assert.match(
    releaseEvalRunSlice,
    /const releaseEvalProfileInputSummary =\s*deriveSWEBodelningReleaseEvalProfileInputSummary\(caseProfileInputs\);/,
  );
  assert.match(
    releaseEvalRunSlice,
    /const releaseEvalProfileInputLaneSnapshot =\s*deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot\(caseProfileInputs\);/,
  );
  assert.match(
    releaseEvalRunSlice,
    /const releaseEvalPolicy = deriveSWEBodelningReleaseEvalPolicy\(\s*releaseEvalProfileInputSummary,\s*\);/,
  );
  assert.match(
    releaseEvalRunSlice,
    /const releaseEvalProfileInputSummary =\s*deriveCMDReleaseEvalProfileInputSummary\(caseProfileInputs\);/,
  );
  assert.match(
    releaseEvalRunSlice,
    /const releaseEvalProfileInputLaneSnapshot =\s*deriveCMDReleaseEvalProfileInputLaneSnapshot\(caseProfileInputs\);/,
  );
  assert.match(
    releaseEvalRunSlice,
    /const releaseEvalPolicy = deriveCMDReleaseEvalPolicy\(releaseEvalProfileInputSummary\);/,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningReleaseEvalProfileInputLaneSnapshot\b/,
    ),
    [
      818,
      836,
      5591,
      6002,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningReleaseEvalProfileInputSummary\b/,
    ),
    [
      834,
      5589,
      6003,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveCMDReleaseEvalProfileInputLaneSnapshot\b/,
    ),
    [
      810,
      848,
      869,
      5635,
      5996,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveCMDReleaseEvalProfileInputSummary\b/,
    ),
    [868, 5633, 5997],
  );

  assert.doesNotMatch(
    apiIndexText,
    /derive(?:SWE|CMD).*ReleaseEvalProfileInput(?:LaneSnapshot|Summary)\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /derive(?:SWE|CMD).*ReleaseEvalProfileInput(?:LaneSnapshot|Summary)\(/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalReleaseEvalRun = deriveReleaseEvalRun\(\s*releaseEvalSeed,\s*caseProfileInputs,\s*\{ persisted_at: persistedAt \},\s*\);/,
  );

  assert.match(
    releaseEvalRunRefreshTestText,
    /successful canonical refresh\/create for a CMD_PROFILE case with complete profile input produces a blocked\/current release_eval baseline/,
  );
  assert.match(releaseEvalRunRefreshTestText, /missing_support_lane_keys/);
  assert.match(releaseEvalRunRefreshTestText, /has_support/);
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /the CMD_PROFILE entry derives a blocked\/current runtime baseline and resolves dossier payloads through the shared seam/,
  );
});
