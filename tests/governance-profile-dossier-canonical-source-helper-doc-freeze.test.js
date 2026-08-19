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

test("docs freeze the shared governance profile-dossier canonical-source helper seam as the canonical_source derivation boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Canonical-Source Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const timestampHelperStart = governanceIndexText.indexOf(
    "function resolveProfileDossierSourceTimestamp(",
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierCanonicalSource(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierSnapshot(",
    helperStart,
  );
  const snapshotStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierSnapshot(",
  );
  const snapshotEnd = governanceIndexText.indexOf(
    "function resolveSWEBodelningExportPackageGeneratedAt(",
    snapshotStart,
  );
  const exportStart = governanceIndexText.indexOf("module.exports = {");

  assert.ok(docsSectionMatch, "expected canonical-source helper docs section");
  assert.notEqual(timestampHelperStart, -1, "expected timestamp helper definition");
  assert.notEqual(helperStart, -1, "expected canonical-source helper definition");
  assert.notEqual(helperEnd, -1, "expected canonical-source helper definition end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const timestampHelperSlice = governanceIndexText.slice(
    timestampHelperStart,
    helperStart,
  );
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Canonical-Source Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier canonical-source helper `deriveSWEBodelningProfileDossierCanonicalSource` is the canonical governance-side `SWE_BODELNING` profile-dossier `canonical_source` derivation boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+`SWE_BODELNING` profile-dossier `canonical_source` derivation from release-eval run metadata plus bounded persisted timestamp selection/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+asserting object-shaped `releaseEvalRun`\s+deriving `persisted_at` through the bounded internal `resolveProfileDossierSourceTimestamp\(\.\.\.\)` helper\s+preferring `options\.persisted_at` when it is a non-empty string\s+otherwise reusing `releaseEvalRun\.profile_dossier_snapshot\.canonical_source\.persisted_at` when it is a non-empty string\s+failing closed with `ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID` and field `canonical_source\.persisted_at` when no persisted timestamp is available\s+requiring non-empty `release_eval_run_id`, `evaluator_version`, and `jurisdiction_profile_key` values on the release-eval run\s+returning exactly `release_eval_run_id`, `evaluator_version`, `jurisdiction_profile_key`, and `persisted_at`/i,
  );
  assert.match(
    docsSection,
    /`resolveProfileDossierSourceTimestamp\(\.\.\.\)` is included only as a bounded internal family member because current repo evidence shows it is unexported, called only by `deriveSWEBodelningProfileDossierCanonicalSource\(\.\.\.\)`, and owns only the timestamp selection\/fail-closed path needed by this canonical-source helper/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling the initial snapshot `canonical_source`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen fingerprint helper seam is boundary-only because the fingerprint helper removes `canonical_source` before hashing and does not derive canonical-source metadata or own persisted timestamp selection/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference and evidence-exhibit helper seams is boundary-only because those helpers consume already assembled profile-dossier snapshots later in the construction chain and do not derive `canonical_source`/i,
  );
  assert.match(
    docsSection,
    /relationship to schema validation is boundary-only because schema validators may require or validate `canonical_source`, but they do not derive this governance-side canonical-source object or own the helper boundary/i,
  );
  assert.match(
    docsSection,
    /relationship to export-package fingerprint\/currentness behavior is boundary-only because export-package helpers may compare, reuse, or derive export-package currentness from dossier payloads, but export-package fingerprint\/currentness ownership remains in separate export-package helper seams/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen governance canonical-JSON helper seam is negative because this canonical-source helper does not call `toCanonicalJson\(\.\.\.\)` or own canonical JSON ordering, recursion, or serialization semantics/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one exported canonical-source helper definition, one bounded internal timestamp helper definition, one profile-dossier snapshot-construction call site, and the current named module export surface exposing `deriveSWEBodelningProfileDossierCanonicalSource`/i,
  );
  assert.match(
    docsSection,
    /route behavior, API behavior, database persistence behavior, release-eval behavior beyond the input run fields, export-package helper seams, schema validation, canonical JSON behavior, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, profile-dossier semantics, schema behavior, persistence semantics, API behavior, export-package behavior, or fail-closed behavior/i,
  );

  assert.match(
    timestampHelperSlice,
    /function resolveProfileDossierSourceTimestamp\(releaseEvalRun, options = \{\}\) \{/,
  );
  assert.match(
    timestampHelperSlice,
    /typeof options\.persisted_at === "string" && options\.persisted_at\.length > 0/,
  );
  assert.match(timestampHelperSlice, /return options\.persisted_at;/);
  assert.match(
    timestampHelperSlice,
    /releaseEvalRun\?\.profile_dossier_snapshot\?\.canonical_source\?\.persisted_at/,
  );
  assert.match(timestampHelperSlice, /return existingTimestamp;/);
  assert.match(
    timestampHelperSlice,
    /throw createGovernanceError\(\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"canonical_source\.persisted_at must be provided for dossier derivation",\s*\{\s*field: "canonical_source\.persisted_at",\s*\},\s*\);/,
  );

  assert.match(
    helperSlice,
    /function deriveSWEBodelningProfileDossierCanonicalSource\(\s*releaseEvalRun,\s*options = \{\},\s*\) \{/,
  );
  assert.match(
    helperSlice,
    /assertPlainObject\(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun"\);/,
  );
  assert.match(
    helperSlice,
    /const persistedAt = resolveProfileDossierSourceTimestamp\(releaseEvalRun, options\);/,
  );
  assert.match(
    helperSlice,
    /for \(const field of \[\s*"release_eval_run_id",\s*"evaluator_version",\s*"jurisdiction_profile_key",\s*\]\)/,
  );
  assert.match(
    helperSlice,
    /typeof releaseEvalRun\[field\] !== "string" \|\| releaseEvalRun\[field\]\.length === 0/,
  );
  assert.match(
    helperSlice,
    /throw createGovernanceError\(\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*`\$\{field\} must be a non-empty string`,\s*\{ field \},\s*\);/,
  );
  assert.match(
    helperSlice,
    /return \{\s*release_eval_run_id: releaseEvalRun\.release_eval_run_id,\s*evaluator_version: releaseEvalRun\.evaluator_version,\s*jurisdiction_profile_key: releaseEvalRun\.jurisdiction_profile_key,\s*persisted_at: persistedAt,\s*\};/,
  );
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierFingerprint\(/);
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/,
  );
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/,
  );
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /toCanonicalJson\(/);
  assert.doesNotMatch(helperSlice, /getLatest|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /canonical_source: deriveSWEBodelningProfileDossierCanonicalSource\(\s*releaseEvalRun,\s*options,\s*\)/,
  );
  assert.match(
    exportSlice,
    /^\s*deriveSWEBodelningProfileDossierCanonicalSource,\s*$/m,
  );
  assert.doesNotMatch(
    exportSlice,
    /^\s*resolveProfileDossierSourceTimestamp,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningProfileDossierCanonicalSource\b/,
    ),
    [
      1396,
      1459,
      5904,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bresolveProfileDossierSourceTimestamp\b/,
    ),
    [
      1375,
      1402,
    ],
  );
  assert.doesNotMatch(apiIndexText, /deriveSWEBodelningProfileDossierCanonicalSource\(/);
  assert.doesNotMatch(
    databaseIndexText,
    /deriveSWEBodelningProfileDossierCanonicalSource\(/,
  );
});
