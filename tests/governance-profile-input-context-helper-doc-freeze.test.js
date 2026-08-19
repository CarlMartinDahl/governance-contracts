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
const releaseEvalFreshnessDocFreezeText = fs.readFileSync(
  path.join(__dirname, "governance-release-eval-freshness-helper-doc-freeze.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared governance profile-input context comparison helper seam as the context equality boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile-Input Context Comparison Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const contextStart = governanceIndexText.indexOf(
    "function deriveComparableProfileInputContextFromLaneSnapshot(",
  );
  const contextEnd = governanceIndexText.indexOf(
    "function deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot(",
    contextStart,
  );
  const freshnessStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningReleaseEvalFreshness(",
  );
  const freshnessEnd = governanceIndexText.indexOf(
    "function reconcileSWEBodelningReleaseEvalRun(",
    freshnessStart,
  );
  const exportStart = governanceIndexText.indexOf("module.exports = {");

  assert.ok(docsSectionMatch, "expected profile-input context comparison docs section");
  assert.notEqual(contextStart, -1, "expected comparable context helper slice");
  assert.notEqual(contextEnd, -1, "expected end of comparable context helper slice");
  assert.notEqual(freshnessStart, -1, "expected release-eval freshness helper slice");
  assert.notEqual(freshnessEnd, -1, "expected end of release-eval freshness helper slice");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const contextSlice = governanceIndexText.slice(contextStart, contextEnd);
  const freshnessSlice = governanceIndexText.slice(freshnessStart, freshnessEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile-Input Context Comparison Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-input context comparison helper family centered on `hasMatchingSWEBodelningProfileInputContext` and `hasMatchingCMDProfileInputContext` is the canonical internal governance-side profile-input context equality boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surfaces in this freeze are limited to:\s+`SWE_BODELNING` profile-input context comparison between an already-assembled release-eval run and current case profile-input snapshot\s+`"CMD_PROFILE"` profile-input context comparison between an already-assembled release-eval run and current case profile-input snapshot/i,
  );
  assert.match(
    docsSection,
    /`hasMatchingSWEBodelningProfileInputContext` deriving a comparable release-eval profile-input context through `deriveSWEBodelningReleaseEvalProfileInputContext\(\.\.\.\)`, deriving a comparable current case profile-input context through `deriveSWEBodelningProfileInputContext\(\.\.\.\)`, and comparing those two bounded context objects through `JSON\.stringify\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /`hasMatchingCMDProfileInputContext` deriving a comparable release-eval profile-input context through `deriveCMDReleaseEvalProfileInputContext\(\.\.\.\)`, deriving the current case context from `caseProfileInputs\.jurisdiction_profile_key`, `deriveCMDReleaseEvalProfileInputLaneSnapshot\(caseProfileInputs\)`, and `deriveComparableCMDProfileInputContextFromLaneSnapshot\(\.\.\.\)`, and comparing those two bounded context objects through `JSON\.stringify\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /bounded SWE comparable-context derivation members `deriveComparableProfileInputContextFromLaneSnapshot`, `deriveComparableProfileInputContext`, `deriveSWEBodelningProfileInputContext`, and `deriveSWEBodelningReleaseEvalProfileInputContext` only as internal inputs to the SWE matcher/i,
  );
  assert.match(
    docsSection,
    /bounded CMD comparable-context derivation members `deriveComparableCMDProfileInputContextFromLaneSnapshot`, `deriveComparableCMDProfileInputContext`, and `deriveCMDReleaseEvalProfileInputContext` only as internal inputs to the CMD matcher/i,
  );
  assert.match(
    docsSection,
    /nearby `deriveCMDProfileInputContext` helper remains outside this narrower matcher seam because current runtime evidence does not show the CMD matcher or another current consumer using that helper/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval freshness helper seam is limited to `deriveSWEBodelningReleaseEvalFreshness\(\.\.\.\)` and `deriveCMDReleaseEvalFreshness\(\.\.\.\)` calling these matchers only when optional `caseProfileInputs` are present and the evaluator version is current/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen profile-input derivation helper seam is limited to the context helpers consuming already-derived or currently derivable profile-input lane snapshots where evidenced; base profile-input lane, summary, and canonical snapshot derivation ownership remains outside this seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval profile-input helper seam is limited to the CMD matcher deriving its current-case comparable context through `deriveCMDReleaseEvalProfileInputLaneSnapshot\(caseProfileInputs\)` before comparing contexts/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to the two matcher definitions, the bounded comparable-context derivation members listed above, one direct SWE release-eval freshness call site, one direct CMD release-eval freshness call site, and no current named module export surface for the matchers or bounded context helpers/i,
  );
  assert.match(
    docsSection,
    /release-eval freshness derivation, reconciliation wrapper ownership, policy behavior, release-eval run derivation as a broader seam, scoring helpers, release-eval route behavior, database release-eval\/profile-input reader\/writer\/refresh\/persistence behavior, profile-dossier helper seams, export-package helper seams, route\/parser\/auth\/response-helper behavior, schemas validation, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  const exactHelperNames = [
    "deriveComparableProfileInputContextFromLaneSnapshot",
    "deriveComparableProfileInputContext",
    "deriveSWEBodelningProfileInputContext",
    "deriveSWEBodelningReleaseEvalProfileInputContext",
    "hasMatchingSWEBodelningProfileInputContext",
    "deriveComparableCMDProfileInputContextFromLaneSnapshot",
    "deriveComparableCMDProfileInputContext",
    "deriveCMDReleaseEvalProfileInputContext",
    "hasMatchingCMDProfileInputContext",
  ];

  for (const name of exactHelperNames) {
    assert.equal(
      (governanceIndexText.match(new RegExp(`function ${name}\\(`, "g")) || [])
        .length,
      1,
      `expected one ${name} definition`,
    );
    assert.doesNotMatch(exportSlice, new RegExp(`^\\s*${name},\\s*$`, "m"));
  }

  assert.match(
    contextSlice,
    /function deriveComparableProfileInputContextFromLaneSnapshot\(laneSnapshot, code\)\s*\{[\s\S]*assertPlainObject\(laneSnapshot, code, "profile_input_lane_snapshot"\);[\s\S]*for \(const laneKey of laneKeys\)[\s\S]*has_value: entry\.has_value,[\s\S]*value: entry\.value,[\s\S]*evidence_object_ids: Array\.isArray\(entry\.evidence_object_ids\)\s*\? \[\.\.\.entry\.evidence_object_ids\]\.sort\(\)\s*: \[\],[\s\S]*return comparableContext;[\s\S]*\}/,
  );
  assert.match(
    contextSlice,
    /function deriveComparableProfileInputContext\(input, code\)\s*\{[\s\S]*assertPlainObject\(input, code, "input"\);[\s\S]*jurisdiction_profile_key must be a non-empty string[\s\S]*profile_input_lane_snapshot: deriveComparableProfileInputContextFromLaneSnapshot\(\s*input\.profile_input_lane_snapshot,\s*code,\s*\),[\s\S]*\}/,
  );
  assert.match(
    contextSlice,
    /function deriveSWEBodelningProfileInputContext\(caseProfileInputs\)\s*\{[\s\S]*return deriveComparableProfileInputContext\(\s*caseProfileInputs,\s*"ERR_PROFILE_INPUT_INVALID",\s*\);[\s\S]*\}/,
  );
  assert.match(
    contextSlice,
    /function deriveSWEBodelningReleaseEvalProfileInputContext\(releaseEvalRun\)\s*\{[\s\S]*return deriveComparableProfileInputContext\(\s*releaseEvalRun,\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*\);[\s\S]*\}/,
  );
  assert.match(
    contextSlice,
    /function hasMatchingSWEBodelningProfileInputContext\(releaseEvalRun, caseProfileInputs\)\s*\{[\s\S]*const releaseEvalContext =\s*deriveSWEBodelningReleaseEvalProfileInputContext\(releaseEvalRun\);[\s\S]*const currentProfileInputContext = deriveSWEBodelningProfileInputContext\(caseProfileInputs\);[\s\S]*return JSON\.stringify\(releaseEvalContext\) === JSON\.stringify\(currentProfileInputContext\);[\s\S]*\}/,
  );
  assert.match(
    contextSlice,
    /function deriveComparableCMDProfileInputContextFromLaneSnapshot\(laneSnapshot, code\)\s*\{[\s\S]*assertPlainObject\(laneSnapshot, code, "profile_input_lane_snapshot"\);[\s\S]*for \(const laneKey of cmdLaneKeys\)[\s\S]*has_value: entry\.has_value,[\s\S]*value: entry\.value,[\s\S]*evidence_object_ids: Array\.isArray\(entry\.evidence_object_ids\)\s*\? \[\.\.\.entry\.evidence_object_ids\]\.sort\(\)\s*: \[\],[\s\S]*return comparableContext;[\s\S]*\}/,
  );
  assert.match(
    contextSlice,
    /function deriveComparableCMDProfileInputContext\(input, code\)\s*\{[\s\S]*assertPlainObject\(input, code, "input"\);[\s\S]*jurisdiction_profile_key must be a non-empty string[\s\S]*profile_input_lane_snapshot: deriveComparableCMDProfileInputContextFromLaneSnapshot\(\s*input\.profile_input_lane_snapshot,\s*code,\s*\),[\s\S]*\}/,
  );
  assert.match(
    contextSlice,
    /function deriveCMDReleaseEvalProfileInputContext\(releaseEvalRun\)\s*\{[\s\S]*return deriveComparableCMDProfileInputContext\(\s*releaseEvalRun,\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*\);[\s\S]*\}/,
  );
  assert.match(
    contextSlice,
    /function hasMatchingCMDProfileInputContext\(releaseEvalRun, caseProfileInputs\)\s*\{[\s\S]*const releaseEvalContext =\s*deriveCMDReleaseEvalProfileInputContext\(releaseEvalRun\);[\s\S]*jurisdiction_profile_key: caseProfileInputs\.jurisdiction_profile_key,[\s\S]*profile_input_lane_snapshot: deriveComparableCMDProfileInputContextFromLaneSnapshot\(\s*deriveCMDReleaseEvalProfileInputLaneSnapshot\(caseProfileInputs\),\s*"ERR_PROFILE_INPUT_INVALID",\s*\),[\s\S]*return JSON\.stringify\(releaseEvalContext\) === JSON\.stringify\(currentProfileInputContext\);[\s\S]*\}/,
  );
  assert.doesNotMatch(
    contextSlice.slice(
      contextSlice.indexOf("function hasMatchingCMDProfileInputContext("),
    ),
    /deriveCMDProfileInputContext\(caseProfileInputs\)/,
  );

  assert.match(
    freshnessSlice,
    /function deriveSWEBodelningReleaseEvalFreshness\(releaseEvalRun, caseProfileInputs\)[\s\S]*caseProfileInputs &&\s*!hasMatchingSWEBodelningProfileInputContext\(releaseEvalRun, caseProfileInputs\)/,
  );
  assert.match(
    freshnessSlice,
    /function deriveCMDReleaseEvalFreshness\(releaseEvalRun, caseProfileInputs\)[\s\S]*caseProfileInputs &&\s*!hasMatchingCMDProfileInputContext\(releaseEvalRun, caseProfileInputs\)/,
  );

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bhasMatchingSWEBodelningProfileInputContext\b/),
    [
      735,
      5501,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bhasMatchingCMDProfileInputContext\b/),
    [
      804,
      5546,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveCMDProfileInputContext\b/),
    [
      790,
    ],
  );

  assert.doesNotMatch(apiIndexText, /hasMatching(?:SWE|CMD).*ProfileInputContext\(/);
  assert.doesNotMatch(databaseIndexText, /hasMatching(?:SWE|CMD).*ProfileInputContext\(/);
  assert.match(
    releaseEvalFreshnessDocFreezeText,
    /current relationship to the already-frozen release-eval profile-input helper seam is limited to these freshness helpers comparing already-derived profile-input context through the current profile-context match helpers/,
  );
});
