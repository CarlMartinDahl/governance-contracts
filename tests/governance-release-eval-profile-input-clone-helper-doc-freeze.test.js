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
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared governance release-eval profile-input clone helper seam as the bounded copying boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Release-Eval Profile-Input Clone Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const cloneStart = governanceIndexText.indexOf(
    "function cloneSWEBodelningReleaseEvalProfileInputSummary(",
  );
  const cloneEnd = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierFingerprint(",
    cloneStart,
  );
  const sweDossierStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierEvidenceReferenceIndex(",
  );
  const sweDossierEnd = governanceIndexText.indexOf(
    "function resolveSWEBodelningExportPackageGeneratedAt(",
    sweDossierStart,
  );
  const sweIssueIndexStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierIssueIndex(",
  );
  const sweIssueIndexEnd = governanceIndexText.indexOf(
    "function deriveSWEBodelningIssueRelatedSectionRefs(",
    sweIssueIndexStart,
  );
  const cmdDossierStart = governanceIndexText.indexOf(
    "function deriveCMDProfileDossierSnapshot(",
  );
  const cmdDossierEnd = governanceIndexText.indexOf(
    "function attachCMDProfileDossierSnapshot(",
    cmdDossierStart,
  );
  const exportStart = governanceIndexText.indexOf("module.exports = {");

  assert.ok(docsSectionMatch, "expected release-eval profile-input clone docs section");
  assert.notEqual(cloneStart, -1, "expected clone helper slice start");
  assert.notEqual(cloneEnd, -1, "expected clone helper slice end");
  assert.notEqual(sweDossierStart, -1, "expected SWE dossier consumer slice start");
  assert.notEqual(sweDossierEnd, -1, "expected SWE dossier consumer slice end");
  assert.notEqual(sweIssueIndexStart, -1, "expected SWE issue-index consumer start");
  assert.notEqual(sweIssueIndexEnd, -1, "expected SWE issue-index consumer end");
  assert.notEqual(cmdDossierStart, -1, "expected CMD dossier consumer start");
  assert.notEqual(cmdDossierEnd, -1, "expected CMD dossier consumer end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const cloneSlice = governanceIndexText.slice(cloneStart, cloneEnd);
  const sweDossierSlice = governanceIndexText.slice(sweDossierStart, sweDossierEnd);
  const sweIssueIndexSlice = governanceIndexText.slice(
    sweIssueIndexStart,
    sweIssueIndexEnd,
  );
  const cmdDossierSlice = governanceIndexText.slice(cmdDossierStart, cmdDossierEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Release-Eval Profile-Input Clone Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /release-eval profile-input clone helper family formed by `cloneSWEBodelningReleaseEvalProfileInputSummary`, `cloneSWEBodelningReleaseEvalProfileInputLaneSnapshot`, `cloneCMDReleaseEvalProfileInputSummary`, and `cloneCMDReleaseEvalProfileInputLaneSnapshot` is the canonical internal governance-side release-eval profile-input cloning boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surfaces in this freeze are limited to:\s+`SWE_BODELNING` release-eval profile-input summary cloning\s+`SWE_BODELNING` release-eval profile-input lane-snapshot cloning\s+`"CMD_PROFILE"` release-eval profile-input summary cloning\s+`"CMD_PROFILE"` release-eval profile-input lane-snapshot cloning/i,
  );
  assert.match(
    docsSection,
    /`cloneSWEBodelningReleaseEvalProfileInputSummary` asserting object-shaped `profile_input_summary`, copying the current required\/value\/support count fields, and shallow-cloning `missing_value_lane_keys` plus `missing_support_lane_keys`/i,
  );
  assert.match(
    docsSection,
    /`cloneSWEBodelningReleaseEvalProfileInputLaneSnapshot` asserting object-shaped `profile_input_lane_snapshot`, iterating the current SWE lane set, copying each lane entry's `has_value` and `value`, cloning `evidence_object_ids` when present, and copying `has_support`/i,
  );
  assert.match(
    docsSection,
    /`cloneCMDReleaseEvalProfileInputSummary` asserting object-shaped `profile_input_summary`, copying the current required\/value\/support count fields, and shallow-cloning `missing_value_lane_keys` plus `missing_support_lane_keys`/i,
  );
  assert.match(
    docsSection,
    /`cloneCMDReleaseEvalProfileInputLaneSnapshot` asserting object-shaped `profile_input_lane_snapshot`, iterating the current CMD lane set, copying each lane entry's `has_value`, `value`, and `has_support`, and cloning `evidence_object_ids` when present/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval profile-input helper seam is limited to these clone helpers copying the already-derived release-eval profile-input summary and lane-snapshot shapes/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen profile-input derivation helper seam and profile-input context comparison helper seam is negative and separate/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to the four helper definitions, one SWE evidence-reference-index call site, one SWE profile-dossier snapshot construction call site for each SWE clone helper, one SWE issue-index call site, and one CMD profile-dossier snapshot construction call site for each CMD clone helper/i,
  );
  assert.match(
    docsSection,
    /current named module export surface is negative for this seam because the four clone helpers remain internal implementation helpers and are not exported from `packages\/governance\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /release-eval profile-input derivation, profile-input derivation, profile-input context comparison, profile-dossier behavior beyond the bounded clone inputs, release-eval policy\/freshness\/reconciliation\/scoring helpers, release-eval adapter dispatch\/registry ownership, release-eval run derivation as a broader seam, route behavior, database persistence behavior, export-package helper seams, schemas validation, and broader governance\/runtime behavior remain outside this clone-helper seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, profile-dossier semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  const helperNames = [
    "cloneSWEBodelningReleaseEvalProfileInputSummary",
    "cloneSWEBodelningReleaseEvalProfileInputLaneSnapshot",
    "cloneCMDReleaseEvalProfileInputSummary",
    "cloneCMDReleaseEvalProfileInputLaneSnapshot",
  ];

  for (const name of helperNames) {
    assert.equal(
      (governanceIndexText.match(new RegExp(`function ${name}\\(`, "g")) || [])
        .length,
      1,
      `expected one ${name} definition`,
    );
    assert.doesNotMatch(exportSlice, new RegExp(`^\\s*${name},\\s*$`, "m"));
  }

  assert.match(
    cloneSlice,
    /function cloneSWEBodelningReleaseEvalProfileInputSummary\(summary\)\s*\{[\s\S]*assertPlainObject\(summary, "ERR_RELEASE_EVAL_RUN_INVALID", "profile_input_summary"\);[\s\S]*required_lane_count: summary\.required_lane_count,[\s\S]*lanes_with_value_count: summary\.lanes_with_value_count,[\s\S]*missing_value_lane_keys: \[\.\.\.summary\.missing_value_lane_keys\],[\s\S]*lanes_with_support_count: summary\.lanes_with_support_count,[\s\S]*missing_support_lane_keys: \[\.\.\.summary\.missing_support_lane_keys\],[\s\S]*\}/,
  );
  assert.match(
    cloneSlice,
    /function cloneSWEBodelningReleaseEvalProfileInputLaneSnapshot\(snapshot\)\s*\{[\s\S]*assertPlainObject\([\s\S]*"profile_input_lane_snapshot"[\s\S]*\);[\s\S]*for \(const laneKey of laneKeys\)[\s\S]*has_value: entry\.has_value,[\s\S]*value: entry\.value,[\s\S]*clonedSnapshot\[laneKey\]\.evidence_object_ids = \[\.\.\.entry\.evidence_object_ids\];[\s\S]*clonedSnapshot\[laneKey\]\.has_support = entry\.has_support;[\s\S]*return clonedSnapshot;[\s\S]*\}/,
  );
  assert.match(
    cloneSlice,
    /function cloneCMDReleaseEvalProfileInputSummary\(summary\)\s*\{[\s\S]*assertPlainObject\(summary, "ERR_RELEASE_EVAL_RUN_INVALID", "profile_input_summary"\);[\s\S]*required_lane_count: summary\.required_lane_count,[\s\S]*lanes_with_value_count: summary\.lanes_with_value_count,[\s\S]*missing_value_lane_keys: \[\.\.\.summary\.missing_value_lane_keys\],[\s\S]*lanes_with_support_count: summary\.lanes_with_support_count,[\s\S]*missing_support_lane_keys: \[\.\.\.summary\.missing_support_lane_keys\],[\s\S]*\}/,
  );
  assert.match(
    cloneSlice,
    /function cloneCMDReleaseEvalProfileInputLaneSnapshot\(snapshot\)\s*\{[\s\S]*assertPlainObject\([\s\S]*"profile_input_lane_snapshot"[\s\S]*\);[\s\S]*for \(const laneKey of cmdLaneKeys\)[\s\S]*has_value: entry\.has_value,[\s\S]*value: entry\.value,[\s\S]*has_support: entry\.has_support,[\s\S]*clonedSnapshot\[laneKey\]\.evidence_object_ids = \[\.\.\.entry\.evidence_object_ids\];[\s\S]*return clonedSnapshot;[\s\S]*\}/,
  );

  assert.match(
    sweDossierSlice,
    /const laneSnapshot = cloneSWEBodelningReleaseEvalProfileInputLaneSnapshot\(\s*profileDossierSnapshot\.profile_input_lane_snapshot,\s*\);/,
  );
  assert.match(
    sweDossierSlice,
    /profile_input_summary: cloneSWEBodelningReleaseEvalProfileInputSummary\(\s*releaseEvalRun\.profile_input_summary,\s*\),/,
  );
  assert.match(
    sweDossierSlice,
    /profile_input_lane_snapshot: cloneSWEBodelningReleaseEvalProfileInputLaneSnapshot\(\s*releaseEvalRun\.profile_input_lane_snapshot,\s*\),/,
  );
  assert.match(
    sweIssueIndexSlice,
    /const profileInputSummary = cloneSWEBodelningReleaseEvalProfileInputSummary\(\s*profileDossierSnapshot\.profile_input_summary,\s*\);/,
  );
  assert.match(
    cmdDossierSlice,
    /profile_input_summary: cloneCMDReleaseEvalProfileInputSummary\(\s*canonicalReleaseEvalRun\.profile_input_summary,\s*\),/,
  );
  assert.match(
    cmdDossierSlice,
    /profile_input_lane_snapshot: cloneCMDReleaseEvalProfileInputLaneSnapshot\(\s*canonicalReleaseEvalRun\.profile_input_lane_snapshot,\s*\),/,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bcloneSWEBodelningReleaseEvalProfileInputSummary\b/,
    ),
    [
      887,
      1463,
      4917,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bcloneSWEBodelningReleaseEvalProfileInputLaneSnapshot\b/,
    ),
    [
      899,
      1002,
      1466,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bcloneCMDReleaseEvalProfileInputSummary\b/,
    ),
    [
      932,
      5695,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bcloneCMDReleaseEvalProfileInputLaneSnapshot\b/,
    ),
    [944, 5698],
  );

  assert.doesNotMatch(
    apiIndexText,
    /clone(?:SWE|CMD).*ReleaseEvalProfileInput(?:Summary|LaneSnapshot)\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /clone(?:SWE|CMD).*ReleaseEvalProfileInput(?:Summary|LaneSnapshot)\(/,
  );
});
