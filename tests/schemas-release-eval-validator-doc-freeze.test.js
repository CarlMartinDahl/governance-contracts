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
const releaseEvalValidatorDispatchRuntimeTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-validator-dispatch.test.js"),
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

test("docs freeze the shared packages/schemas release-eval validator seam as the schema-side release-eval validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Release Eval Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` release-eval validator seam formed by `validateSWEBodelningReleaseEvalRun`, `validateCMDReleaseEvalRun`, and `validateReleaseEvalRun` is the canonical internal `packages\/schemas` release-eval validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`release_eval` validator for `SWE_BODELNING`\s+`release_eval` validator for `"CMD_PROFILE"`\s+shared generic `release_eval` validator dispatch keyed by `jurisdiction_profile_key`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared validator responsibilities already evidenced for this seam are limited to:\s+shared top-level release-eval object validation and supported-profile rejection\s+shared non-empty `release_eval_run_id`, `evaluator_version`, `release_gate`, `release_gate_reason_code`, `release_eval_freshness`, and `release_eval_freshness_reason_code` enforcement\s+validating the `SWE_BODELNING` payload through canonical release-eval summary and lane-snapshot validation, canonical dossier-snapshot validation, exact dossier parity enforcement against the canonical release-eval fields, issue\/section\/evidence indexes, and returning the normalized canonical release-eval payload\s+validating the `"CMD_PROFILE"` payload through allowed-root-key enforcement, canonical release-eval summary and normalized `"cmd_primary_signal"` lane-snapshot validation, canonical missing-value and missing-support parity enforcement, optional `profile_dossier_snapshot` parity enforcement when present, and returning the normalized canonical release-eval payload\s+centralizing the explicit release-eval validator entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the nearby release-eval-specific registry object\s+returning the current release-eval validator entry or `null` through the nearby release-eval-specific lookup helper\s+dispatching generic release-eval validation through the shared lookup helper when a non-empty `jurisdiction_profile_key` is present and otherwise through the current default-validator path backed by `Object\.values\(releaseEvalValidatorRegistry\)\[0\]`\s+returning normalized canonical release-eval payloads/i,
  );
  assert.match(
    docsText,
    /the current relationship to higher release-eval governance handling already evidenced in `packages\/governance\/src\/index\.js` is limited to the CMD helper path `hasSchemaValidCMDProfileDossierSnapshot`, `reconcileCMDReleaseEvalRun`, and `validateCMDReleaseEvalRunCore` consuming `validateCMDReleaseEvalRun` before higher governance-side profile-dossier snapshot\/projection and export-package derivation logic, while shared database persistence consumes `validateReleaseEvalRun` at the persisted-surface boundary/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 2 profile-specific validator definitions, 1 release-eval-specific registry definition, 1 release-eval-specific lookup helper definition, 1 shared generic validator definition, 3 current governance runtime\/helper call sites, 1 current database persistence call site in `persistCaseReleaseEvalRun`, the current named module export surface exposing `releaseEvalValidatorRegistry`, `getReleaseEvalValidator`, `validateSWEBodelningReleaseEvalRun`, `validateCMDReleaseEvalRun`, and `validateReleaseEvalRun`, and 2 current runtime proof files `tests\/release-eval-validator-dispatch\.test\.js` and `tests\/release-eval-adapter-registry\.test\.js` spanning registry exposure, shared dispatch, persistence use, CMD support, unsupported-profile fail-closed behavior, no SWE behavior drift, and governance adapter consumption/i,
  );
  assert.match(
    docsText,
    /the nearby `releaseEvalValidatorRegistry` and `getReleaseEvalValidator` currently belong to the same centralized release-eval validator seam because current repo evidence limits them to the release-eval-specific validator block, 1 shared `validateReleaseEvalRun` dispatch path, the current named export surface, the current database persistence boundary, and the focused runtime proofs rather than showing a separately reused competing boundary/i,
  );
  assert.match(
    docsText,
    /the broader shared `packages\/schemas` validator-dispatch scaffold remains outside this seam because it is the separately frozen cross-surface persisted-boundary scaffold spanning `release_eval`, `export_package`, artifact, and bundle surfaces rather than this narrower release-eval validator sub-seam/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, shared key-shape enforcement, shared allowed-key enforcement, and shared string-enum enforcement are separate frozen internal boundaries consumed by the validator seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` canonical-JSON helper seam remains outside this seam because canonical JSON structural equality used by the current `"CMD_PROFILE"` optional `profile_dossier_snapshot` checks is a separate frozen helper boundary consumed by this validator seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because artifact-body parsing, round-trip reconstruction, and downstream export-package recovery are separate frozen responsibilities and do not define the canonical release-eval validation boundary/i,
  );
  assert.match(
    docsText,
    /governance-side release-eval adapter-dispatch logic remains outside this seam because runtime adapter lookup, release-eval derivation, reconciliation, dossier attach\/resolve behavior, and higher governance routing are separate runtime responsibilities even where current CMD governance helpers call the lower release-eval validator seam/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may call the validator seam but do not define the canonical shared schema-side release-eval validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /future `packages\/schemas` release-eval validation that needs the same SWE\/CMD validator pair plus generic dispatch path should extend this seam instead of introducing parallel release-eval validator stacks inside governance helpers, persistence wrappers, or routes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, validation semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningReleaseEvalRun\(input\)\s*\{/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*requiredRootKeys,\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /input\.jurisdiction_profile_key !==\s*sweBodelningReleaseEvalRun\.properties\.jurisdiction_profile_key\.const/,
  );
  assert.match(
    schemasIndexText,
    /validateReleaseEvalProfileInputSummary\(input\.profile_input_summary\);/,
  );
  assert.match(
    schemasIndexText,
    /const profileInputLaneSnapshot = validateReleaseEvalProfileInputLaneSnapshot\(\s*input\.profile_input_lane_snapshot,\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /const profileDossierSnapshot = validateSWEBodelningProfileDossierSnapshot\(\s*input\.profile_dossier_snapshot,\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /missing_support_lane_keys must match the canonical unsupported lanes/,
  );
  assert.match(
    schemasIndexText,
    /profile_dossier_snapshot\.canonical_source\.\$\{field\} must match the canonical release eval field/,
  );
  assert.match(
    schemasIndexText,
    /profile_dossier_snapshot\.issue_index must match the canonical dossier issues/,
  );
  assert.match(
    schemasIndexText,
    /return \{\s*jurisdiction_profile_key: input\.jurisdiction_profile_key,[\s\S]*profile_dossier_snapshot: profileDossierSnapshot,\s*\};/s,
  );

  assert.match(
    schemasIndexText,
    /function validateCMDReleaseEvalRun\(input\)\s*\{/,
  );
  assert.match(
    schemasIndexText,
    /assertAllowedKeys\(\s*input,\s*cmdReleaseEvalAllowedRootKeys,\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /for \(const requiredRootKey of requiredRootKeys\) \{[\s\S]*`input\.\$\{requiredRootKey\} is required`/s,
  );
  assert.match(
    schemasIndexText,
    /input\.jurisdiction_profile_key !==\s*cmdReleaseEvalRun\.properties\.jurisdiction_profile_key\.const/,
  );
  assert.match(
    schemasIndexText,
    /validateCMDReleaseEvalProfileInputSummary\(input\.profile_input_summary\);/,
  );
  assert.match(
    schemasIndexText,
    /const profileInputLaneSnapshot = validateCMDReleaseEvalProfileInputLaneSnapshot\(\s*input\.profile_input_lane_snapshot,\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /missing_value_lane_keys must match the canonical missing-value lanes/,
  );
  assert.match(
    schemasIndexText,
    /missing_support_lane_keys must match the canonical unsupported lanes/,
  );
  assert.match(
    schemasIndexText,
    /if \(Object\.hasOwn\(input, "profile_dossier_snapshot"\)\) \{[\s\S]*const profileDossierSnapshot = validateCMDProfileDossierSnapshot\(\s*input\.profile_dossier_snapshot,\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*\);[\s\S]*toCanonicalJson\(profileDossierSnapshot\.profile_input_summary\)[\s\S]*toCanonicalJson\(validatedRun\.profile_input_lane_snapshot\)[\s\S]*validatedRun\.profile_dossier_snapshot = profileDossierSnapshot;[\s\S]*\}/s,
  );
  assert.match(
    schemasIndexText,
    /return validatedRun;/,
  );

  assert.match(
    schemasIndexText,
    /const sweBodelningReleaseEvalValidator = Object\.freeze\(\{\s*jurisdiction_profile_key:\s*sweBodelningReleaseEvalRun\.properties\.jurisdiction_profile_key\.const,\s*validateReleaseEvalRun: validateSWEBodelningReleaseEvalRun,\s*\}\);/s,
  );
  assert.match(
    schemasIndexText,
    /const cmdReleaseEvalValidator = Object\.freeze\(\{\s*jurisdiction_profile_key:\s*cmdReleaseEvalRun\.properties\.jurisdiction_profile_key\.const,\s*validateReleaseEvalRun: validateCMDReleaseEvalRun,\s*\}\);/s,
  );
  assert.match(
    schemasIndexText,
    /const releaseEvalValidatorRegistry = Object\.freeze\(\{\s*\[sweBodelningReleaseEvalValidator\.jurisdiction_profile_key\]:\s*sweBodelningReleaseEvalValidator,\s*\[cmdReleaseEvalValidator\.jurisdiction_profile_key\]: cmdReleaseEvalValidator,\s*\}\);/s,
  );
  assert.match(
    schemasIndexText,
    /function getReleaseEvalValidator\(jurisdictionProfileKey\)\s*\{[\s\S]*return releaseEvalValidatorRegistry\[jurisdictionProfileKey\] \?\? null;\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateReleaseEvalRun\(input\)\s*\{[\s\S]*const validator = getReleaseEvalValidator\(input\.jurisdiction_profile_key\);[\s\S]*return validator\.validateReleaseEvalRun\(input\);[\s\S]*const defaultValidator = Object\.values\(releaseEvalValidatorRegistry\)\[0\];[\s\S]*return defaultValidator\.validateReleaseEvalRun\(input\);[\s\S]*\}/,
  );

  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateSWEBodelningReleaseEvalRun\b/),
    [8347, 9053, 13081],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateCMDReleaseEvalRun\b/),
    [8866, 9059, 13053],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateReleaseEvalRun\b/),
    [9053, 9059, 9079, 9090, 9095, 13086],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\breleaseEvalValidatorRegistry\b/),
    [9062, 9076, 9094, 12989],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bgetReleaseEvalValidator\b/),
    [9068, 9087, 12935],
  );

  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, [
      "validateSWEBodelningReleaseEvalRun",
      "validateCMDReleaseEvalRun",
      "validateReleaseEvalRun",
    ]),
    [
      {
        fnName: "validateCMDReleaseEvalRun",
        caller: "hasSchemaValidCMDProfileDossierSnapshot",
        line: 4890,
      },
      {
        fnName: "validateCMDReleaseEvalRun",
        caller: "reconcileCMDReleaseEvalRun",
        line: 5671,
      },
      {
        fnName: "validateCMDReleaseEvalRun",
        caller: "validateCMDReleaseEvalRunCore",
        line: 5679,
      },
    ],
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(databaseIndexText, ["validateReleaseEvalRun"]),
    [
      {
        fnName: "validateReleaseEvalRun",
        caller: "persistCaseReleaseEvalRun",
        line: 811,
      },
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\breleaseEvalValidatorRegistry\b/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bgetReleaseEvalValidator\b/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /\breleaseEvalValidatorRegistry\b/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /\bgetReleaseEvalValidator\b/),
    [],
  );

  assert.deepEqual(
    collectLineMatches(
      releaseEvalValidatorDispatchRuntimeTestText,
      /\bgetReleaseEvalValidator\(/,
    ),
    [128, 129],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalValidatorDispatchRuntimeTestText,
      /\breleaseEvalValidatorRegistry\b/,
    ),
    [20, 131, 132, 133],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalValidatorDispatchRuntimeTestText,
      /\bvalidateReleaseEvalRun\(/,
    ),
    [156, 168, 190, 247, 268],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalValidatorDispatchRuntimeTestText,
      /\bvalidateSWEBodelningReleaseEvalRun\(/,
    ),
    [157, 269],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalValidatorDispatchRuntimeTestText,
      /\bvalidateCMDReleaseEvalRun\(/,
    ),
    [169, 171, 191],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalAdapterRegistryTestText,
      /\bvalidateCMDReleaseEvalRun\(/,
    ),
    [180],
  );
  assert.deepEqual(
    collectLineMatches(
      releaseEvalAdapterRegistryTestText,
      /\bvalidateSWEBodelningReleaseEvalRun\(/,
    ),
    [237],
  );
  assert.match(
    releaseEvalValidatorDispatchRuntimeTestText,
    /release-eval validator dispatch scaffold/,
  );
  assert.match(
    releaseEvalAdapterRegistryTestText,
    /the adapter\/dispatch registry exposes the explicit CMD_PROFILE release_eval adapter entry/,
  );
});
