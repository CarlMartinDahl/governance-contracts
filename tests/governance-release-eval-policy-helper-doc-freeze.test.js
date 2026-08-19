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
const releaseEvalRunApiTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-run-api.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared governance release-eval policy helper seam as the gate/reason/freshness boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Release-Eval Policy Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningReleaseEvalPolicy(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function deriveSWEBodelningReleaseEvalFreshness(",
    helperStart,
  );
  const releaseEvalRunStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningReleaseEvalRun(",
  );
  const releaseEvalRunEnd = governanceIndexText.indexOf(
    "const sweBodelningReleaseEvalAdapter = Object.freeze({",
    releaseEvalRunStart,
  );
  const exportStart = governanceIndexText.indexOf("module.exports = {");

  assert.ok(docsSectionMatch, "expected release-eval policy docs section");
  assert.notEqual(helperStart, -1, "expected SWE release-eval policy helper");
  assert.notEqual(helperEnd, -1, "expected end of release-eval policy helper slice");
  assert.notEqual(releaseEvalRunStart, -1, "expected release-eval run derivation");
  assert.notEqual(releaseEvalRunEnd, -1, "expected end of release-eval run slice");
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
    /Shared Governance Release-Eval Policy Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /release-eval policy helper family formed by `deriveSWEBodelningReleaseEvalPolicy` and `deriveCMDReleaseEvalPolicy` is the canonical internal governance-side release-eval gate\/reason\/freshness policy boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surfaces in this freeze are limited to:\s+`SWE_BODELNING` release-eval policy derivation from the already-derived release-eval profile-input summary\s+`"CMD_PROFILE"` release-eval policy derivation from the already-derived release-eval profile-input summary/i,
  );
  assert.match(
    docsSection,
    /`deriveSWEBodelningReleaseEvalPolicy` asserting object-shaped `profile_input_summary`, requiring `missing_value_lane_keys` as an array, returning the current `swe-bodelning-input-incomplete` blocked\/current policy when any required lane value is missing, requiring `missing_support_lane_keys` as an array after value completeness is established, returning the current `swe-bodelning-support-incomplete` blocked\/current policy when any required support is missing, and otherwise returning the current `releaseEvalBaseline`/i,
  );
  assert.match(
    docsSection,
    /`deriveCMDReleaseEvalPolicy` asserting object-shaped `profile_input_summary`, requiring `missing_value_lane_keys` as an array, returning the current `cmd-input-incomplete` blocked\/current policy when any required lane value is missing, and otherwise returning the current `cmd-runtime-not-implemented` blocked\/current policy from `cmdReleaseEvalBaseline`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval profile-input helper seam is limited to these policy helpers consuming the profile-specific release-eval summary objects already produced by `deriveSWEBodelningReleaseEvalProfileInputSummary\(\.\.\.\)` and `deriveCMDReleaseEvalProfileInputSummary\(\.\.\.\)`; support\/value derivation ownership remains outside this policy seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to release-eval run derivation is limited to `deriveSWEBodelningReleaseEvalRun\(\.\.\.\)` and `deriveCMDReleaseEvalRun\(\.\.\.\)` calling these two policy helpers after profile-input summary derivation and copying the returned `release_gate`, `release_gate_reason_code`, and `release_eval_freshness` fields into the canonical release-eval run seed; broader release-eval run assembly remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval adapter-dispatch \/ registry seam is negative and separate because these two policy helpers are not adapter entries, do not own adapter lookup, and do not own generic release-eval dispatch/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to the two helper definitions, one direct SWE release-eval run derivation call site, one direct CMD release-eval run derivation call site, and the current named module export surface exposing both policy helpers/i,
  );
  assert.match(
    docsSection,
    /release-eval freshness\/reconciliation\/scoring helpers, release-eval adapter dispatch\/registry ownership, release-eval route behavior, database release-eval reader\/refresh\/writer\/persistence behavior, profile-input base derivation, release-eval profile-input derivation, profile-dossier helper seams, export-package helper seams, route\/parser\/auth\/response-helper behavior, schemas validation, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  const helperNames = [
    "deriveSWEBodelningReleaseEvalPolicy",
    "deriveCMDReleaseEvalPolicy",
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
    /function deriveSWEBodelningReleaseEvalPolicy\(profileInputSummary\)\s*\{[\s\S]*assertPlainObject\(\s*profileInputSummary,\s*"ERR_PROFILE_INPUT_INVALID",\s*"profile_input_summary",\s*\);[\s\S]*!Array\.isArray\(profileInputSummary\.missing_value_lane_keys\)[\s\S]*profile_input_summary\.missing_value_lane_keys must be an array[\s\S]*profileInputSummary\.missing_value_lane_keys\.length > 0[\s\S]*release_gate: releaseEvalBaseline\.release_gate,[\s\S]*release_gate_reason_code: incompleteReleaseEvalReasonCode,[\s\S]*release_eval_freshness: releaseEvalBaseline\.release_eval_freshness,[\s\S]*!Array\.isArray\(profileInputSummary\.missing_support_lane_keys\)[\s\S]*profile_input_summary\.missing_support_lane_keys must be an array[\s\S]*profileInputSummary\.missing_support_lane_keys\.length > 0[\s\S]*release_gate_reason_code: supportIncompleteReleaseEvalReasonCode,[\s\S]*return \{ \.\.\.releaseEvalBaseline \};[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /function deriveCMDReleaseEvalPolicy\(profileInputSummary\)\s*\{[\s\S]*assertPlainObject\(\s*profileInputSummary,\s*"ERR_PROFILE_INPUT_INVALID",\s*"profile_input_summary",\s*\);[\s\S]*!Array\.isArray\(profileInputSummary\.missing_value_lane_keys\)[\s\S]*profile_input_summary\.missing_value_lane_keys must be an array[\s\S]*profileInputSummary\.missing_value_lane_keys\.length > 0[\s\S]*release_gate: cmdReleaseEvalBaseline\.release_gate,[\s\S]*release_gate_reason_code: cmdIncompleteReleaseEvalReasonCode,[\s\S]*release_eval_freshness: cmdReleaseEvalBaseline\.release_eval_freshness,[\s\S]*release_gate_reason_code: cmdRuntimeNotImplementedReleaseEvalReasonCode,[\s\S]*release_eval_freshness: cmdReleaseEvalBaseline\.release_eval_freshness,[\s\S]*\}/,
  );

  assert.match(
    releaseEvalRunSlice,
    /const releaseEvalProfileInputSummary =\s*deriveSWEBodelningReleaseEvalProfileInputSummary\(caseProfileInputs\);[\s\S]*const releaseEvalPolicy = deriveSWEBodelningReleaseEvalPolicy\(\s*releaseEvalProfileInputSummary,\s*\);[\s\S]*release_gate: releaseEvalPolicy\.release_gate,[\s\S]*release_gate_reason_code: releaseEvalPolicy\.release_gate_reason_code,[\s\S]*release_eval_freshness: releaseEvalPolicy\.release_eval_freshness,/,
  );
  assert.match(
    releaseEvalRunSlice,
    /const releaseEvalProfileInputSummary =\s*deriveCMDReleaseEvalProfileInputSummary\(caseProfileInputs\);[\s\S]*const releaseEvalPolicy = deriveCMDReleaseEvalPolicy\(releaseEvalProfileInputSummary\);[\s\S]*release_gate: releaseEvalPolicy\.release_gate,[\s\S]*release_gate_reason_code: releaseEvalPolicy\.release_gate_reason_code,[\s\S]*release_eval_freshness: releaseEvalPolicy\.release_eval_freshness,/,
  );

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveSWEBodelningReleaseEvalPolicy\b/),
    [
      5397,
      5592,
      6004,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveCMDReleaseEvalPolicy\b/),
    [
      5445,
      5636,
      5995,
    ],
  );

  assert.doesNotMatch(apiIndexText, /derive(?:SWE|CMD).*ReleaseEvalPolicy\(/);
  assert.doesNotMatch(databaseIndexText, /derive(?:SWE|CMD).*ReleaseEvalPolicy\(/);
  assert.match(
    databaseIndexText,
    /const canonicalReleaseEvalRun = deriveReleaseEvalRun\(\s*releaseEvalSeed,\s*caseProfileInputs,\s*\{ persisted_at: persistedAt \},\s*\);/,
  );

  assert.match(
    releaseEvalRunRefreshTestText,
    /successful canonical refresh\/create for a CMD_PROFILE case with complete profile input produces a blocked\/current release_eval baseline/,
  );
  assert.match(releaseEvalRunRefreshTestText, /cmd-input-incomplete/);
  assert.match(releaseEvalRunRefreshTestText, /cmd-runtime-not-implemented/);
  assert.match(releaseEvalRunRefreshTestText, /swe-bodelning-input-incomplete/);
  assert.match(releaseEvalRunRefreshTestText, /swe-bodelning-support-incomplete/);
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /the CMD_PROFILE entry derives a blocked\/current runtime baseline and resolves dossier payloads through the shared seam/,
  );
  assert.match(releaseEvalRunApiTestText, /swe-bodelning-support-incomplete/);
});
