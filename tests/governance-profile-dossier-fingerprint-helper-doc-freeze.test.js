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

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

function extractFunctionBody(text, functionName) {
  const start = text.indexOf(`function ${functionName}(`);
  assert.notEqual(start, -1, `${functionName} must exist`);

  const nextFunction = text.indexOf("\nfunction ", start + 1);
  assert.notEqual(nextFunction, -1, `${functionName} must have a bounded body`);
  return text.slice(start, nextFunction);
}

test("docs freeze the shared governance profile-dossier fingerprint helper seam as the fingerprint derivation boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Profile Dossier Fingerprint Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` profile-dossier fingerprint helper `deriveSWEBodelningProfileDossierFingerprint` is the canonical governance-side `SWE_BODELNING` profile-dossier fingerprint derivation boundary for the current included profile-dossier snapshot flow below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surface in this freeze is limited to:\s+deterministic `SWE_BODELNING` profile-dossier `dossier_fingerprint` derivation from an already assembled profile-dossier snapshot payload/i,
  );
  assert.match(
    docsText,
    /the currently concrete helper responsibilities already evidenced for this seam are limited to:\s+asserting object-shaped `profileDossierSnapshot`\s+cloning the input snapshot into a fingerprint-local object\s+removing the volatile `dossier_fingerprint` field before hashing\s+removing the volatile `canonical_source` field before hashing\s+serializing the resulting fingerprint input through the already-frozen governance `toCanonicalJson\(\.\.\.\)` helper seam\s+deriving the fingerprint through the currently evidenced SHA-256 hash and hex digest path/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen governance canonical-JSON helper seam is consumer-only and boundary-only because this fingerprint helper delegates stable serialization to `toCanonicalJson\(\.\.\.\)` but does not own canonical JSON ordering, recursion, or serialization semantics/i,
  );
  assert.match(
    docsText,
    /the current relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while returning the final assembled snapshot with `dossier_fingerprint`; broader snapshot construction, resolver ownership, evidence-reference derivation, evidence-exhibit derivation, issue\/section derivation, related-ref attachment, and profile-dossier projection ownership remain outside this seam/i,
  );
  assert.match(
    docsText,
    /the current relationship to schema validation is boundary-only because schema validators may require or validate `dossier_fingerprint`, but they do not derive this governance-side fingerprint or own the helper boundary/i,
  );
  assert.match(
    docsText,
    /the current relationship to export-package fingerprint\/currentness behavior is boundary-only because export-package helpers may compare, reuse, or derive export-package fingerprints from dossier payloads, but export-package fingerprint\/currentness ownership remains in separate export-package helper seams/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one helper definition, one profile-dossier snapshot-construction call site, and the current named module export surface exposing `deriveSWEBodelningProfileDossierFingerprint`/i,
  );
  assert.match(
    docsText,
    /route behavior, API behavior, database persistence behavior, release-eval behavior, export-package helper seams, schema validation, and broader governance\/runtime behavior remain outside this seam because they may preserve, validate, persist, compare, or consume profile-dossier payloads containing `dossier_fingerprint` but do not define this helper boundary/i,
  );
  assert.match(
    docsText,
    /future governance-side `SWE_BODELNING` profile-dossier fingerprint derivation for the same profile-dossier responsibilities should extend this helper seam instead of moving fingerprint derivation into canonical JSON helpers, snapshot resolvers, snapshot construction callers, schema validators, routes, database helpers, export-package helpers, or broader runtime orchestration/i,
  );
  assert.match(
    docsText,
    /this freeze records the canonical shared governance profile-dossier fingerprint helper boundary already in use, is distinct from the closed canonical JSON helper seam, profile-dossier snapshot\/status\/attach\/projection seams, evidence-reference and evidence-exhibit helper seams, schema validation, route\/API behavior, database persistence behavior, export-package fingerprint\/currentness behavior, release-eval behavior, and downstream runtime behavior, and does not change runtime behavior, governance semantics, profile-dossier semantics, schema behavior, persistence semantics, API behavior, export-package behavior, or fail-closed behavior/i,
  );

  const helperSlice = extractFunctionBody(
    governanceIndexText,
    "deriveSWEBodelningProfileDossierFingerprint",
  );
  assert.match(
    helperSlice,
    /function deriveSWEBodelningProfileDossierFingerprint\(snapshot\) \{/,
  );
  assert.match(
    helperSlice,
    /assertPlainObject\(\s*snapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profile_dossier_snapshot",\s*\);/,
  );
  assert.match(helperSlice, /const fingerprintInput = \{ \.\.\.snapshot \};/);
  assert.match(helperSlice, /delete fingerprintInput\.dossier_fingerprint;/);
  assert.match(helperSlice, /delete fingerprintInput\.canonical_source;/);
  assert.match(
    helperSlice,
    /return crypto\s*\.createHash\("sha256"\)\s*\.update\(toCanonicalJson\(fingerprintInput\)\)\s*\.digest\("hex"\);/,
  );
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    governanceIndexText,
    /dossier_fingerprint: deriveSWEBodelningProfileDossierFingerprint\(\s*snapshotWithLaneRelatedSectionRefs,\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /\n\s*deriveSWEBodelningProfileDossierFingerprint,\n/,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningProfileDossierFingerprint\b/,
    ),
    [
      976,
      1607,
      5907,
    ],
  );
});
