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

test("docs freeze the shared governance release-eval reconciliation wrapper seam as the freshness copy-back boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Release-Eval Reconciliation Wrapper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const wrapperStart = governanceIndexText.indexOf(
    "function reconcileSWEBodelningReleaseEvalRun(",
  );
  const wrapperEnd = governanceIndexText.indexOf(
    "function validateCMDReleaseEvalRunCore(",
    wrapperStart,
  );
  const adapterStart = governanceIndexText.indexOf(
    "const sweBodelningReleaseEvalAdapter = Object.freeze({",
  );
  const adapterEnd = governanceIndexText.indexOf(
    "function attachReleaseEvalProfileDossierSnapshot(",
    adapterStart,
  );
  const exportStart = governanceIndexText.indexOf("module.exports = {");

  assert.ok(docsSectionMatch, "expected release-eval reconciliation docs section");
  assert.notEqual(wrapperStart, -1, "expected SWE reconciliation wrapper");
  assert.notEqual(wrapperEnd, -1, "expected end of reconciliation wrapper slice");
  assert.notEqual(adapterStart, -1, "expected release-eval adapter wiring");
  assert.notEqual(adapterEnd, -1, "expected end of release-eval dispatch slice");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const wrapperSlice = governanceIndexText.slice(wrapperStart, wrapperEnd);
  const adapterSlice = governanceIndexText.slice(adapterStart, adapterEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Release-Eval Reconciliation Wrapper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /release-eval reconciliation wrapper family formed by `reconcileSWEBodelningReleaseEvalRun` and `reconcileCMDReleaseEvalRun` is the canonical internal governance-side release-eval reconciliation wrapper boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surfaces in this freeze are limited to:\s+`SWE_BODELNING` release-eval run reconciliation over an already-assembled release-eval run and optional case profile-input context\s+`"CMD_PROFILE"` release-eval run reconciliation over an already-assembled release-eval run and optional case profile-input context/i,
  );
  assert.match(
    docsSection,
    /`reconcileSWEBodelningReleaseEvalRun` calling the already-frozen `deriveSWEBodelningReleaseEvalFreshness\(\.\.\.\)` helper with the provided release-eval run and optional case profile-input context, copying only `release_eval_freshness` and `release_eval_freshness_reason_code` from the returned freshness object onto a shallow clone of the release-eval run, and returning that reconciled run/i,
  );
  assert.match(
    docsSection,
    /`reconcileCMDReleaseEvalRun` calling the already-frozen `deriveCMDReleaseEvalFreshness\(\.\.\.\)` helper with the provided release-eval run and optional case profile-input context, copying only `release_eval_freshness` and `release_eval_freshness_reason_code` from the returned freshness object onto a shallow clone of the release-eval run, validating the reconciled run through `validateCMDReleaseEvalRun\(\.\.\.\)`, and returning that reconciled run/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval freshness helper seam is limited to these reconciliation wrappers consuming freshness output and copying the two currently evidenced freshness fields back onto the release-eval run; freshness derivation ownership remains outside this reconciliation wrapper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval policy helper seam is limited to release-eval run derivation assembling policy fields before invoking these reconciliation wrappers; gate\/reason policy derivation ownership remains outside this reconciliation wrapper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval profile-input helper seam is limited to release-eval run derivation assembling profile-input summary and lane snapshot fields before invoking these reconciliation wrappers, and to freshness helpers comparing already-derived profile-input context below this seam; profile-input derivation ownership remains outside this reconciliation wrapper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to release-eval run derivation is limited to `deriveSWEBodelningReleaseEvalRun\(\.\.\.\)` and `deriveCMDReleaseEvalRun\(\.\.\.\)` invoking these wrappers after assembling the profile-specific release-eval run candidate; broader release-eval run assembly, profile-dossier attachment, and downstream run derivation ownership remain outside this reconciliation wrapper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval adapter-dispatch \/ registry seam is limited to the current adapter slots wiring `reconcileReleaseEvalRun` to the profile-specific reconciliation wrappers and the generic `reconcileReleaseEvalRun\(\.\.\.\)` dispatcher calling the selected adapter slot; adapter registry metadata, adapter lookup, unsupported-profile gating, and generic dispatch ownership remain outside this reconciliation wrapper seam/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to the two wrapper definitions, one direct SWE release-eval run derivation call site, one direct CMD release-eval run derivation call site, two release-eval adapter-slot entries, the generic `reconcileReleaseEvalRun\(\.\.\.\)` dispatch surface, and the current named module export surface exposing `reconcileSWEBodelningReleaseEvalRun` plus `reconcileReleaseEvalRun` while keeping `reconcileCMDReleaseEvalRun` internal behind the adapter slot/i,
  );
  assert.match(
    docsSection,
    /release-eval freshness derivation, release-eval policy behavior, release-eval profile-input behavior, release-eval run derivation as a broader parent seam, release-eval adapter dispatch\/registry ownership, scoring helpers, release-eval route behavior, database release-eval reader\/refresh\/writer\/persistence behavior, profile-dossier helper seams, export-package helper seams, route\/parser\/auth\/response-helper behavior, schemas validation, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  assert.equal(
    (governanceIndexText.match(/function reconcileSWEBodelningReleaseEvalRun\(/g) || [])
      .length,
    1,
  );
  assert.equal(
    (governanceIndexText.match(/function reconcileCMDReleaseEvalRun\(/g) || [])
      .length,
    1,
  );

  assert.match(
    wrapperSlice,
    /function reconcileSWEBodelningReleaseEvalRun\(releaseEvalRun, caseProfileInputs\)\s*\{[\s\S]*const freshness = deriveSWEBodelningReleaseEvalFreshness\(\s*releaseEvalRun,\s*caseProfileInputs,\s*\);[\s\S]*return \{[\s\S]*\.\.\.releaseEvalRun,[\s\S]*release_eval_freshness: freshness\.release_eval_freshness,[\s\S]*release_eval_freshness_reason_code: freshness\.release_eval_freshness_reason_code,[\s\S]*\};[\s\S]*\}/,
  );
  assert.match(
    wrapperSlice,
    /function deriveSWEBodelningReleaseEvalRun\(releaseEvalSeed, caseProfileInputs, options = \{\}\)[\s\S]*return attachSWEBodelningProfileDossierSnapshot\(\s*reconcileSWEBodelningReleaseEvalRun\([\s\S]*release_eval_freshness: releaseEvalPolicy\.release_eval_freshness,[\s\S]*caseProfileInputs,[\s\S]*\),\s*options,[\s\S]*\);/,
  );
  assert.match(
    wrapperSlice,
    /function deriveCMDReleaseEvalRun\(releaseEvalSeed, caseProfileInputs\)[\s\S]*return reconcileCMDReleaseEvalRun\([\s\S]*release_eval_freshness: releaseEvalPolicy\.release_eval_freshness,[\s\S]*caseProfileInputs,[\s\S]*\);/,
  );
  assert.match(
    wrapperSlice,
    /function reconcileCMDReleaseEvalRun\(releaseEvalRun, caseProfileInputs\)\s*\{[\s\S]*const freshness = deriveCMDReleaseEvalFreshness\(releaseEvalRun, caseProfileInputs\);[\s\S]*const reconciledReleaseEvalRun = \{[\s\S]*\.\.\.releaseEvalRun,[\s\S]*release_eval_freshness: freshness\.release_eval_freshness,[\s\S]*release_eval_freshness_reason_code: freshness\.release_eval_freshness_reason_code,[\s\S]*\};[\s\S]*validateCMDReleaseEvalRun\(reconciledReleaseEvalRun\);[\s\S]*return reconciledReleaseEvalRun;[\s\S]*\}/,
  );

  assert.match(
    adapterSlice,
    /reconcileReleaseEvalRun: reconcileSWEBodelningReleaseEvalRun,/,
  );
  assert.match(adapterSlice, /reconcileReleaseEvalRun: reconcileCMDReleaseEvalRun,/);
  assert.match(
    adapterSlice,
    /function reconcileReleaseEvalRun\(releaseEvalRun, caseProfileInputs\)\s*\{[\s\S]*assertPlainObject\(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun"\);[\s\S]*const adapter = getReleaseEvalAdapter\(releaseEvalRun\.jurisdiction_profile_key\);[\s\S]*return adapter\.reconcileReleaseEvalRun\(releaseEvalRun, caseProfileInputs\);[\s\S]*\}/,
  );

  assert.match(
    exportSlice,
    /^  reconcileSWEBodelningReleaseEvalRun,\s*$/m,
  );
  assert.match(exportSlice, /^  reconcileReleaseEvalRun,\s*$/m);
  assert.doesNotMatch(exportSlice, /^  reconcileCMDReleaseEvalRun,\s*$/m);

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\breconcileSWEBodelningReleaseEvalRun\b/),
    [
      5567,
      5607,
      5740,
      6008,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\breconcileCMDReleaseEvalRun\b/),
    [
      5648,
      5663,
      5749,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\breconcileReleaseEvalRun\b/),
    [
      5740,
      5749,
      5786,
      5798,
      6009,
    ],
  );

  assert.doesNotMatch(
    apiIndexText,
    /reconcile(?:SWE|CMD).*ReleaseEvalRun\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /reconcile(?:SWE|CMD).*ReleaseEvalRun\(/,
  );
  assert.match(
    databaseIndexText,
    /return reconcileReleaseEvalRun\(releaseEvalRun, caseProfileInputs\);/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalReleaseEvalRun = deriveReleaseEvalRun\(\s*releaseEvalSeed,\s*caseProfileInputs,\s*\{ persisted_at: persistedAt \},\s*\);/,
  );

  assert.match(
    releaseEvalRunRefreshTestText,
    /canonical refresh persists governance-owned release_eval_freshness for SWE_BODELNING/,
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /adapter\.reconcileReleaseEvalRun\(releaseEvalRun, createCMDProfileInputs\(\)\)/,
  );
});
