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
const releaseEvalAdapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-adapter-registry.test.js"),
  "utf8",
);
const releaseEvalRunApiTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-run-api.test.js"),
  "utf8",
);
const releaseEvalRunRefreshTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-run-refresh.test.js"),
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

test("docs freeze the shared packages/schemas profile-dossier validator seam as the schema-side lower validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Profile Dossier Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` lower profile-dossier validator seam formed by `validateSWEBodelningProfileDossierSnapshot` and `validateCMDProfileDossierSnapshot` is the canonical internal `packages\/schemas` lower profile-dossier validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`profile_dossier` snapshot validator for `SWE_BODELNING`\s+`profile_dossier` snapshot validator for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /shared top-level lower profile-dossier object validation and exact required-key enforcement/i,
  );
  assert.match(
    docsText,
    /supported-profile rejection through the canonical `jurisdiction_profile_key` const for each included profile/i,
  );
  assert.match(
    docsText,
    /validating the `SWE_BODELNING` payload through canonical non-empty top-level metadata enforcement, exact `canonical_source` key enforcement, canonical-source const enforcement, canonical profile-input summary and lane snapshot validation, canonical issue\/evidence reference\/evidence exhibit\/section index validation, and returning the normalized canonical snapshot payload/i,
  );
  assert.match(
    docsText,
    /validating the `"CMD_PROFILE"` payload through canonical non-empty top-level metadata enforcement, canonical profile-input summary validation, canonical lane-snapshot validation including evidence-object\/support parity enforcement, and returning the normalized canonical snapshot payload/i,
  );
  assert.match(
    docsText,
    /the current relationship to the higher profile-dossier projection-validator seam already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningProfileDossierProjection` and `validateCMDProfileDossierProjection` calling `validateSWEBodelningProfileDossierSnapshot` and `validateCMDProfileDossierSnapshot` before projection-level `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current governance\/runtime reuse already evidenced across repo code is limited to governance-side export-package derivation, dossier-fingerprint\/currentness helper, and CMD profile-dossier snapshot derivation\/resolve helpers consuming the lower validator pair, while higher projection selection and route\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 2 profile-specific validator definitions, no current generic schemas-side `validateProfileDossierSnapshot` definition, no current schemas-side profile-dossier snapshot validator registry or lookup helper definition, 5 current schema-internal call sites across shared release-eval \/ profile-dossier projection \/ export-package validators, 11 current governance runtime\/helper call sites in `packages\/governance\/src\/index\.js`, no current database runtime call sites, the current named module export surface exposing `validateSWEBodelningProfileDossierSnapshot` and `validateCMDProfileDossierSnapshot`, and 4 current runtime proof files `tests\/profile-dossier-schema\.test\.js`, `tests\/release-eval-adapter-registry\.test\.js`, `tests\/release-eval-run-api\.test\.js`, and `tests\/release-eval-run-refresh\.test\.js`/i,
  );
  assert.match(
    docsText,
    /no current generic schemas-side `validateProfileDossierSnapshot` definition, profile-dossier snapshot validator registry, or lookup helper belongs inside this seam because current repo code exposes only the profile-specific lower validator pair and leaves any higher profile selection outside this schema seam/i,
  );
  assert.match(
    docsText,
    /the higher profile-dossier projection-validator seam remains outside this validator seam because projection-level `snapshot_status` validation and normalization are separate higher-boundary responsibilities consumed by the lower validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this validator seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared allowed-key enforcement, and shared string-enum enforcement are separate frozen internal boundaries consumed by the lower validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this validator seam because lower profile-dossier validation operates on dossier snapshot payloads and does not reconstruct artifact bodies or downstream export-package payloads/i,
  );
  assert.match(
    docsText,
    /governance-side profile-dossier route \/ adapter \/ runtime logic remains outside this validator seam because runtime snapshot resolution, `snapshot_status` derivation, higher projection handling, route authorization, and adapter lookup are separate runtime responsibilities even where current governance helpers call the lower validator pair/i,
  );
  assert.match(
    docsText,
    /release-eval governance logic beyond the concretely evidenced caller paths remains outside this validator seam because reconciliation, attach\/resolve behavior, and higher governance orchestration are separate runtime responsibilities even where current schema\/governance helpers validate lower profile-dossier snapshots/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this validator seam because they may call or validate returned lower snapshots but do not define the canonical shared schema-side lower profile-dossier validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /future `packages\/schemas` lower profile-dossier validation that needs the same SWE\/CMD validator pair should extend this seam instead of introducing parallel lower-validator stacks inside projection helpers, export-package helpers, governance adapters, or route\/runtime layers/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, validation semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningProfileDossierSnapshot\(\s*input,\s*errorCode = "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*\)\s*\{/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*dossierSnapshotRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /input\.jurisdiction_profile_key !==\s*sweBodelningProfileDossierSnapshot\.properties\.jurisdiction_profile_key\.const/,
  );
  assert.match(
    schemasIndexText,
    /for \(const field of \[\s*"projection_version",\s*"dossier_fingerprint",\s*"release_gate",\s*"release_gate_reason_code",\s*"release_eval_freshness",\s*"release_eval_freshness_reason_code",\s*"evaluator_version",\s*\]\) \{/s,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(input\.canonical_source,\s*errorCode,\s*"canonical_source"\);/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input\.canonical_source,\s*dossierCanonicalSourceRequiredKeys,\s*errorCode,\s*"canonical_source",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /input\.canonical_source\.jurisdiction_profile_key !==\s*dossierCanonicalSourceProperties\.jurisdiction_profile_key\.const/,
  );
  assert.match(
    schemasIndexText,
    /validateReleaseEvalProfileInputSummary\(input\.profile_input_summary\);/,
  );
  assert.match(
    schemasIndexText,
    /const dossierProfileInputLaneSnapshot = validateDossierProfileInputLaneSnapshot\(\s*input\.profile_input_lane_snapshot,\s*errorCode,\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /const issueIndex = validateDossierIssueIndex\(input\.issue_index,\s*errorCode\);/,
  );
  assert.match(
    schemasIndexText,
    /const evidenceReferenceIndex = validateDossierEvidenceReferenceIndex\(\s*input\.evidence_reference_index,\s*errorCode,\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /const evidenceExhibitIndex = validateDossierEvidenceExhibitIndex\(\s*input\.evidence_exhibit_index,\s*errorCode,\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /const sectionIndex = validateDossierSectionIndex\(input\.section_index,\s*errorCode\);/,
  );
  assert.match(
    schemasIndexText,
    /return \{\s*jurisdiction_profile_key: input\.jurisdiction_profile_key,[\s\S]*canonical_source: input\.canonical_source,[\s\S]*issue_index: issueIndex,[\s\S]*section_index: sectionIndex,\s*\};/s,
  );

  assert.match(
    schemasIndexText,
    /function validateCMDProfileDossierSnapshot\(\s*input,\s*errorCode = "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*\)\s*\{/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*cmdDossierSnapshotRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /input\.jurisdiction_profile_key !==\s*cmdProfileDossierSnapshot\.properties\.jurisdiction_profile_key\.const/,
  );
  assert.match(
    schemasIndexText,
    /for \(const field of \[\s*"release_gate",\s*"release_gate_reason_code",\s*"release_eval_freshness",\s*"release_eval_freshness_reason_code",\s*"evaluator_version",\s*\]\) \{/s,
  );
  assert.match(
    schemasIndexText,
    /validateCMDDossierProfileInputSummary\(input\.profile_input_summary,\s*errorCode\);/,
  );
  assert.match(
    schemasIndexText,
    /const profileInputLaneSnapshot = validateCMDDossierProfileInputLaneSnapshot\(\s*input\.profile_input_lane_snapshot,\s*errorCode,\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /if \(entry\.has_support !== \(evidenceCount > 0\)\) \{[\s\S]*`\$\{laneKey\}\.has_support must match evidence_object_ids`/s,
  );
  assert.match(
    schemasIndexText,
    /return \{\s*jurisdiction_profile_key: input\.jurisdiction_profile_key,[\s\S]*profile_input_lane_snapshot: profileInputLaneSnapshot,\s*\};/s,
  );

  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateSWEBodelningProfileDossierSnapshot\b/,
    ),
    [8392, 9098, 9224, 9378, 13049],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateCMDProfileDossierSnapshot\b/),
    [9000, 9575, 9645, 13047],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateProfileDossierSnapshot\b/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bprofileDossierSnapshotValidatorRegistry\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bgetProfileDossierSnapshotValidator\b/,
    ),
    [],
  );

  assert.deepEqual(
    collectCrossFunctionCallSites(schemasIndexText, [
      "validateSWEBodelningProfileDossierSnapshot",
      "validateCMDProfileDossierSnapshot",
    ]),
    [
      {
        fnName: "validateSWEBodelningProfileDossierSnapshot",
        caller: "validateSWEBodelningReleaseEvalRun",
        line: 8392,
      },
      {
        fnName: "validateCMDProfileDossierSnapshot",
        caller: "validateCMDReleaseEvalRun",
        line: 9000,
      },
      {
        fnName: "validateSWEBodelningProfileDossierSnapshot",
        caller: "validateSWEBodelningProfileDossierProjection",
        line: 9224,
      },
      {
        fnName: "validateSWEBodelningProfileDossierSnapshot",
        caller: "validateSWEBodelningExportPackage",
        line: 9378,
      },
      {
        fnName: "validateCMDProfileDossierSnapshot",
        caller: "validateCMDProfileDossierProjection",
        line: 9645,
      },
    ],
  );

  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, [
      "validateSWEBodelningProfileDossierSnapshot",
      "validateCMDProfileDossierSnapshot",
    ]),
    [
      {
        fnName: "validateSWEBodelningProfileDossierSnapshot",
        caller: "deriveSWEBodelningExportPackageFromProfileDossierSnapshot",
        line: 1649,
      },
      {
        fnName: "validateCMDProfileDossierSnapshot",
        caller: "deriveCMDExportPackageDossierFingerprint",
        line: 1693,
      },
      {
        fnName: "validateCMDProfileDossierSnapshot",
        caller: "deriveCMDExportPackageFromProfileDossierSnapshot",
        line: 1751,
      },
      {
        fnName: "validateSWEBodelningProfileDossierSnapshot",
        caller: "deriveSWEBodelningExportPackageJsonArtifactSnapshotStatus",
        line: 3992,
      },
      {
        fnName: "validateSWEBodelningProfileDossierSnapshot",
        caller: "deriveSWEBodelningExportPackagePdfArtifactSnapshotStatus",
        line: 4052,
      },
      {
        fnName: "validateSWEBodelningProfileDossierSnapshot",
        caller: "deriveSWEBodelningExportPackageDocxArtifactSnapshotStatus",
        line: 4112,
      },
      {
        fnName: "validateSWEBodelningProfileDossierSnapshot",
        caller: "deriveSWEBodelningExportPackageMarkdownArtifactSnapshotStatus",
        line: 4343,
      },
      {
        fnName: "validateSWEBodelningProfileDossierSnapshot",
        caller: "deriveSWEBodelningExportPackageSnapshotStatus",
        line: 4761,
      },
      {
        fnName: "validateSWEBodelningProfileDossierSnapshot",
        caller: "hasSchemaValidSWEBodelningProfileDossierSnapshot",
        line: 4854,
      },
      {
        fnName: "validateCMDProfileDossierSnapshot",
        caller: "deriveCMDProfileDossierSnapshot",
        line: 5687,
      },
      {
        fnName: "validateCMDProfileDossierSnapshot",
        caller: "resolveCMDProfileDossierSnapshot",
        line: 5722,
      },
    ],
  );

  assert.deepEqual(
    collectLineMatches(databaseIndexText, /\bvalidateSWEBodelningProfileDossierSnapshot\b/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /\bvalidateCMDProfileDossierSnapshot\b/),
    [],
  );

  assert.deepEqual(
    collectLineMatches(
      profileDossierSchemaTestText,
      /\bvalidateSWEBodelningProfileDossierSnapshot\(/,
    ),
    [255],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalAdapterRegistryTestText,
      /\bvalidateCMDProfileDossierSnapshot\(/,
    ),
    [213],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalRunApiTestText,
      /\bvalidateCMDProfileDossierSnapshot\(/,
    ),
    [378],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalRunRefreshTestText,
      /\bvalidateCMDProfileDossierSnapshot\(/,
    ),
    [228, 284],
  );

  assert.match(
    profileDossierSchemaTestText,
    /validateSWEBodelningProfileDossierSnapshot\(validSnapshot\)/,
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /validateCMDProfileDossierSnapshot\(releaseEvalWithSnapshot\.profile_dossier_snapshot\)/,
  );
  assert.match(
    releaseEvalRunApiTestText,
    /validateCMDProfileDossierSnapshot\(response\.body\.profile_dossier_snapshot\)/,
  );
  assert.match(
    releaseEvalRunRefreshTestText,
    /validateCMDProfileDossierSnapshot\(persisted\.profile_dossier_snapshot\)/,
  );
});
