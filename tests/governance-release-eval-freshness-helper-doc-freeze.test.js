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

test("docs freeze the shared governance release-eval freshness helper seam as the freshness derivation boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Release-Eval Freshness Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningReleaseEvalFreshness(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function reconcileSWEBodelningReleaseEvalRun(",
    helperStart,
  );
  const reconciliationStart = governanceIndexText.indexOf(
    "function reconcileSWEBodelningReleaseEvalRun(",
  );
  const reconciliationEnd = governanceIndexText.indexOf(
    "function validateCMDReleaseEvalRunCore(",
    reconciliationStart,
  );
  const adapterStart = governanceIndexText.indexOf(
    "const sweBodelningReleaseEvalAdapter = Object.freeze({",
  );
  const exportStart = governanceIndexText.indexOf("module.exports = {");

  assert.ok(docsSectionMatch, "expected release-eval freshness docs section");
  assert.notEqual(helperStart, -1, "expected SWE release-eval freshness helper");
  assert.notEqual(helperEnd, -1, "expected end of release-eval freshness helper slice");
  assert.notEqual(
    reconciliationStart,
    -1,
    "expected SWE release-eval reconciliation wrapper",
  );
  assert.notEqual(
    reconciliationEnd,
    -1,
    "expected end of release-eval reconciliation wrapper slice",
  );
  assert.notEqual(adapterStart, -1, "expected release-eval adapter wiring");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const reconciliationSlice = governanceIndexText.slice(
    reconciliationStart,
    reconciliationEnd,
  );
  const adapterSlice = governanceIndexText.slice(adapterStart, exportStart);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Release-Eval Freshness Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /release-eval freshness helper family formed by `deriveSWEBodelningReleaseEvalFreshness` and `deriveCMDReleaseEvalFreshness` is the canonical internal governance-side release-eval freshness derivation boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surfaces in this freeze are limited to:\s+`SWE_BODELNING` release-eval freshness derivation from an already-assembled release-eval run and optional case profile-input context\s+`"CMD_PROFILE"` release-eval freshness derivation from an already-assembled release-eval run and optional case profile-input context/i,
  );
  assert.match(
    docsSection,
    /`deriveSWEBodelningReleaseEvalFreshness` asserting object-shaped `releaseEvalRun`, gating `release_eval` support through `assertSupportedJurisdictionProfileCapability\(\.\.\.\)`, requiring a non-empty `evaluator_version`, returning stale\/profile-input-context-mismatch freshness when the current evaluator version is paired with mismatched SWE profile-input context, returning current\/current-evaluator freshness when the evaluator version and optional profile-input context match, and returning stale\/evaluator-version-mismatch freshness otherwise/i,
  );
  assert.match(
    docsSection,
    /`deriveCMDReleaseEvalFreshness` asserting object-shaped `releaseEvalRun`, gating `release_eval` support through `assertSupportedJurisdictionProfileCapability\(\.\.\.\)`, requiring a non-empty `evaluator_version`, returning stale\/profile-input-context-mismatch freshness when the current CMD evaluator version is paired with mismatched CMD profile-input context, returning current\/current-evaluator freshness when the evaluator version and optional profile-input context match, and returning stale\/evaluator-version-mismatch freshness otherwise/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval policy helper seam is limited to release-eval run derivation copying the policy helper output into an assembled run before these freshness helpers recompute only `release_eval_freshness` and `release_eval_freshness_reason_code`; policy gate\/reason derivation ownership remains outside this freshness seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval profile-input helper seam is limited to these freshness helpers comparing already-derived profile-input context through the current profile-context match helpers; support\/value profile-input derivation ownership remains outside this freshness seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the current reconciliation wrappers is limited to `reconcileSWEBodelningReleaseEvalRun\(\.\.\.\)` and `reconcileCMDReleaseEvalRun\(\.\.\.\)` calling these freshness helpers and copying the returned `release_eval_freshness` and `release_eval_freshness_reason_code` fields back onto the release-eval run; reconciliation wrapper ownership, adapter-slot reconciliation ownership, and broader run derivation remain outside this freshness seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to release-eval adapter dispatch \/ registry is negative and separate because these two freshness helpers are not adapter entries, do not own adapter lookup, and do not own generic release-eval dispatch/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to the two helper definitions, one direct SWE reconciliation-wrapper call site, one direct CMD reconciliation-wrapper call site, and the current named module export surface exposing both freshness helpers/i,
  );
  assert.match(
    docsSection,
    /release-eval policy behavior, release-eval profile-input behavior, reconciliation wrapper ownership, release-eval run derivation as a broader seam, release-eval adapter dispatch\/registry ownership, scoring helpers, release-eval route behavior, database release-eval reader\/refresh\/writer\/persistence behavior, profile-dossier helper seams, export-package helper seams, route\/parser\/auth\/response-helper behavior, schemas validation, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  const helperNames = [
    "deriveSWEBodelningReleaseEvalFreshness",
    "deriveCMDReleaseEvalFreshness",
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
    /function deriveSWEBodelningReleaseEvalFreshness\(releaseEvalRun, caseProfileInputs\)\s*\{[\s\S]*assertPlainObject\(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun"\);[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*releaseEvalRun\.jurisdiction_profile_key,\s*"release_eval",\s*\);[\s\S]*typeof releaseEvalRun\.evaluator_version !== "string"[\s\S]*evaluator_version must be a non-empty string[\s\S]*releaseEvalRun\.evaluator_version === releaseEvalEvaluatorVersion[\s\S]*!hasMatchingSWEBodelningProfileInputContext\(releaseEvalRun, caseProfileInputs\)[\s\S]*release_eval_freshness: "stale",[\s\S]*release_eval_freshness_reason_code:\s*profileInputContextMismatchFreshnessReasonCode,[\s\S]*release_eval_freshness: releaseEvalBaseline\.release_eval_freshness,[\s\S]*release_eval_freshness_reason_code: currentEvaluatorVersionFreshnessReasonCode,[\s\S]*release_eval_freshness: "stale",[\s\S]*release_eval_freshness_reason_code: evaluatorVersionMismatchFreshnessReasonCode,[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /function deriveCMDReleaseEvalFreshness\(releaseEvalRun, caseProfileInputs\)\s*\{[\s\S]*assertPlainObject\(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun"\);[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*releaseEvalRun\.jurisdiction_profile_key,\s*"release_eval",\s*\);[\s\S]*typeof releaseEvalRun\.evaluator_version !== "string"[\s\S]*evaluator_version must be a non-empty string[\s\S]*releaseEvalRun\.evaluator_version === cmdReleaseEvalEvaluatorVersion[\s\S]*!hasMatchingCMDProfileInputContext\(releaseEvalRun, caseProfileInputs\)[\s\S]*release_eval_freshness: "stale",[\s\S]*release_eval_freshness_reason_code:\s*profileInputContextMismatchFreshnessReasonCode,[\s\S]*release_eval_freshness: cmdReleaseEvalBaseline\.release_eval_freshness,[\s\S]*release_eval_freshness_reason_code: currentEvaluatorVersionFreshnessReasonCode,[\s\S]*release_eval_freshness: "stale",[\s\S]*release_eval_freshness_reason_code: evaluatorVersionMismatchFreshnessReasonCode,[\s\S]*\}/,
  );

  assert.match(
    reconciliationSlice,
    /function reconcileSWEBodelningReleaseEvalRun\(releaseEvalRun, caseProfileInputs\)\s*\{[\s\S]*const freshness = deriveSWEBodelningReleaseEvalFreshness\(\s*releaseEvalRun,\s*caseProfileInputs,\s*\);[\s\S]*release_eval_freshness: freshness\.release_eval_freshness,[\s\S]*release_eval_freshness_reason_code: freshness\.release_eval_freshness_reason_code,[\s\S]*\}/,
  );
  assert.match(
    reconciliationSlice,
    /function reconcileCMDReleaseEvalRun\(releaseEvalRun, caseProfileInputs\)\s*\{[\s\S]*const freshness = deriveCMDReleaseEvalFreshness\(releaseEvalRun, caseProfileInputs\);[\s\S]*release_eval_freshness: freshness\.release_eval_freshness,[\s\S]*release_eval_freshness_reason_code: freshness\.release_eval_freshness_reason_code,[\s\S]*validateCMDReleaseEvalRun\(reconciledReleaseEvalRun\);[\s\S]*return reconciledReleaseEvalRun;[\s\S]*\}/,
  );
  assert.match(
    adapterSlice,
    /reconcileReleaseEvalRun: reconcileSWEBodelningReleaseEvalRun,/,
  );
  assert.match(adapterSlice, /reconcileReleaseEvalRun: reconcileCMDReleaseEvalRun,/);

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveSWEBodelningReleaseEvalFreshness\b/),
    [
      5477,
      5568,
      6001,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveCMDReleaseEvalFreshness\b/),
    [
      5522,
      5664,
      5994,
    ],
  );

  assert.doesNotMatch(
    apiIndexText,
    /derive(?:SWE|CMD).*ReleaseEvalFreshness\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /derive(?:SWE|CMD).*ReleaseEvalFreshness\(/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalReleaseEvalRun = deriveReleaseEvalRun\(\s*releaseEvalSeed,\s*caseProfileInputs,\s*\{ persisted_at: persistedAt \},\s*\);/,
  );

  assert.match(
    releaseEvalRunRefreshTestText,
    /canonical refresh persists governance-owned release_eval_freshness for SWE_BODELNING/,
  );
  assert.match(releaseEvalRunRefreshTestText, /evaluator-version-current/);
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /adapter\.reconcileReleaseEvalRun\(releaseEvalRun, createCMDProfileInputs\(\)\)/,
  );
});
