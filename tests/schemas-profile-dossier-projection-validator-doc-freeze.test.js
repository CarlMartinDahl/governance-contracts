const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const schemasIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "schemas", "src", "index.js"),
  "utf8",
);
const governanceIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "governance", "src", "index.js"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);
const profileDossierSchemaTestText = fs.readFileSync(
  path.join(__dirname, "profile-dossier-schema.test.js"),
  "utf8",
);
const profileDossierApiTestText = fs.readFileSync(
  path.join(__dirname, "profile-dossier-api.test.js"),
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

function collectCrossFunctionCallSites(text, targetFnNames) {
  const lines = text.split("\n");
  let currentFunction = null;
  const callSites = [];

  for (let index = 0; index < lines.length; index += 1) {
    const functionMatch = lines[index].match(
      /^(?:async\s+)?function\s+([A-Za-z0-9_]+)\s*\(/,
    );
    if (functionMatch) {
      currentFunction = functionMatch[1];
    }

    for (const fnName of targetFnNames) {
      if (
        lines[index].includes(`${fnName}(`) &&
        currentFunction !== fnName
      ) {
        callSites.push({
          fnName,
          caller: currentFunction,
          line: index + 1,
        });
      }
    }
  }

  return callSites;
}

test("docs freeze the shared packages/schemas profile-dossier projection-validator seam as the schema-side projection-validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Profile Dossier Projection-Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` profile-dossier projection-validator pair `validateSWEBodelningProfileDossierProjection` and `validateCMDProfileDossierProjection` is the canonical internal `packages\/schemas` profile-dossier projection-validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`profile_dossier` projection validator for `SWE_BODELNING`\s+`profile_dossier` projection validator for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+delegating lower profile-dossier validation to the current lower profile-dossier validator seam before any projection-specific checks\s+enforcing projection-level top-level object shape and exact required-key validation\s+enforcing projection-level `snapshot_status` object shape and exact required-key validation\s+enforcing projection-level `snapshot_status\.source` against the current supported source values\s+enforcing projection-level `snapshot_status\.snapshot_projection_version_found` as null or a non-empty string\s+enforcing projection-level `snapshot_status\.current_projection_version` as a non-empty string\s+enforcing projection-level `snapshot_status\.snapshot_is_current` as a boolean\s+returning the normalized projection object by combining the validated lower profile-dossier payload with the validated `snapshot_status` block/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower profile-dossier validator seam already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningProfileDossierProjection` and `validateCMDProfileDossierProjection` calling `validateSWEBodelningProfileDossierSnapshot` and `validateCMDProfileDossierSnapshot` before projection-level `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current relationship to projection-specific validation and normalization already evidenced in `packages\/schemas\/src\/index\.js` is limited to enforcing exact top-level projection keys plus supported `snapshot_status` source, `snapshot_projection_version_found`, `current_projection_version`, and `snapshot_is_current` rules against the already validated lower profile-dossier payload/i,
  );
  assert.match(
    docsText,
    /the current runtime reuse already evidenced across repo code is limited to `resolveCMDProfileDossierProjection` in `packages\/governance\/src\/index\.js` delegating schema-side projection validation to `validateCMDProfileDossierProjection` after governance-side `snapshot_status` derivation, while the current `SWE_BODELNING` projection shape is corroborated through existing schema\/runtime tests that validate returned projections through `validateSWEBodelningProfileDossierProjection`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 2 projection-validator definitions, no current generic schemas-side profile-dossier projection-validator registry, lookup, or dispatch helper definition, 1 current governance runtime call site, 5 current governance\/runtime test call sites across `tests\/profile-dossier-schema\.test\.js`, `tests\/profile-dossier-api\.test\.js`, and `tests\/release-eval-adapter-registry\.test\.js`, no current database runtime call sites, and the current named module export surface exposing `validateSWEBodelningProfileDossierProjection` and `validateCMDProfileDossierProjection`/i,
  );
  assert.match(
    docsText,
    /no current generic schemas-side profile-dossier projection-validator registry, lookup helper, or dispatch helper belongs inside this seam because current repo code exposes only the profile-specific projection-validator pair and leaves any higher projection selection outside this schema seam/i,
  );
  assert.match(
    docsText,
    /the lower profile-dossier validator seam remains outside this helper seam because lower snapshot object, canonical-source, lane\/index, and profile-dossier payload validation are separate lower-boundary responsibilities consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared allowed-key enforcement, and shared string-enum enforcement are separate frozen internal boundaries consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this helper seam because profile-dossier projection validation operates on validated dossier payloads plus projection `snapshot_status` and does not reconstruct artifact bodies or downstream export-package payloads/i,
  );
  assert.match(
    docsText,
    /governance-side profile-dossier route \/ adapter \/ runtime logic remains outside this helper seam because governance-side snapshot resolution, `snapshot_status` derivation, runtime adapter lookup, thin route authorization, and higher read\/projection behavior are separate runtime responsibilities even where current CMD governance helpers call `validateCMDProfileDossierProjection` and the SWE path is corroborated through supporting tests/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this helper seam because they may call or validate returned projection objects through the projection-validator pair after deriving `snapshot_status` but do not define the canonical shared schema-side profile-dossier projection-validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /future `packages\/schemas` profile-dossier projection validation that needs the same lower-profile-dossier-plus-`snapshot_status` checks should extend the existing projection-validator pair instead of introducing parallel projection-validator stacks inside governance helpers or route\/runtime layers/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, profile-dossier validation semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningProfileDossierProjection\(\s*input,\s*errorCode = "ERR_PROFILE_DOSSIER_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input,\s*errorCode,\s*"input"\);\s*assertExactKeys\(\s*input,\s*dossierProjectionRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*const snapshot = validateSWEBodelningProfileDossierSnapshot\([\s\S]*assertPlainObject\(input\.snapshot_status,\s*errorCode,\s*"snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*sweBodelningProfileDossierProjection\.properties\.snapshot_status\.required,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*snapshot_status\.source must be a supported source value[\s\S]*snapshot_status\.snapshot_projection_version_found must be null or a non-empty string[\s\S]*snapshot_status\.current_projection_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.snapshot,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDProfileDossierProjection\(\s*input,\s*errorCode = "ERR_PROFILE_DOSSIER_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input,\s*errorCode,\s*"input"\);\s*assertExactKeys\(\s*input,\s*cmdDossierProjectionRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*const snapshot = validateCMDProfileDossierSnapshot\([\s\S]*assertPlainObject\(input\.snapshot_status,\s*errorCode,\s*"snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*cmdDossierProjectionSnapshotStatusRequiredKeys,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*cmdDossierProjectionSnapshotStatusSourceValues\.includes\([\s\S]*snapshot_status\.snapshot_projection_version_found must be null or a non-empty string[\s\S]*snapshot_status\.current_projection_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.snapshot,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );

  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateSWEBodelningProfileDossierProjection\b/,
    ),
    [9211, 13048],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateCMDProfileDossierProjection\b/),
    [9633, 13046],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateProfileDossierProjection\b/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bprofileDossierProjectionValidatorRegistry\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bgetProfileDossierProjectionValidator\b/,
    ),
    [],
  );

  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, [
      "validateSWEBodelningProfileDossierProjection",
      "validateCMDProfileDossierProjection",
    ]),
    [
      {
        fnName: "validateCMDProfileDossierProjection",
        caller: "resolveCMDProfileDossierProjection",
        line: 5731,
      },
    ],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /\bvalidateSWEBodelningProfileDossierProjection\b/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /\bvalidateCMDProfileDossierProjection\b/),
    [],
  );

  assert.deepEqual(
    collectLineMatches(
      profileDossierSchemaTestText,
      /\bvalidateSWEBodelningProfileDossierProjection\(/,
    ),
    [418],
  );
  assert.deepEqual(
    collectLineMatches(
      profileDossierApiTestText,
      /\bvalidateSWEBodelningProfileDossierProjection\(/,
    ),
    [318, 1222],
  );
  assert.deepEqual(
    collectLineMatches(
      profileDossierApiTestText,
      /\bvalidateCMDProfileDossierProjection\(/,
    ),
    [741],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalAdapterRegistryTestText,
      /\bvalidateCMDProfileDossierProjection\(/,
    ),
    [217],
  );

  assert.match(
    profileDossierSchemaTestText,
    /validateSWEBodelningProfileDossierProjection\(validProjection\)/,
  );
  assert.match(
    profileDossierApiTestText,
    /validateSWEBodelningProfileDossierProjection\(response\.body\)/,
  );
  assert.match(
    profileDossierApiTestText,
    /validateCMDProfileDossierProjection\(response\.body\)/,
  );
  assert.match(
    profileDossierApiTestText,
    /source: "fallback-reprojection"/,
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /validateCMDProfileDossierProjection\(resolvedProjection\)/,
  );
});
