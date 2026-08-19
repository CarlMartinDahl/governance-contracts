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

test("docs freeze the shared packages/schemas canonical-json helper seam as the schema-side stable serialization boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Canonical-JSON Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/schemas\/src\/index\.js` `toCanonicalJson` helper is the canonical internal `packages\/schemas` stable JSON serialization boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package_markdown_artifact` body builders for `SWE_BODELNING` and `"CMD_PROFILE"` where canonical source, manifest, and profile-dossier snapshot sections already serialize through the shared canonical JSON helper\s+`export_package_json_artifact` validators for `SWE_BODELNING` and `"CMD_PROFILE"` where canonical `body_utf8` equality already uses the shared canonical JSON encoding of the validated export package payload\s+`release_eval` CMD validator equality checks where `profile_dossier_snapshot\.profile_input_summary` and `profile_dossier_snapshot\.profile_input_lane_snapshot` are already normalized through the shared canonical JSON helper before machine-readable comparison/i,
  );
  assert.match(
    docsText,
    /callers performing shared schema-side canonical JSON serialization or canonical JSON-based structural equality for those included surfaces should go through the shared `toCanonicalJson\(value\)` seam rather than relying on ambient object key order or ad hoc schema-family stringifiers inside downstream schema logic/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+recursively serializing arrays in encounter order\s+recursively serializing object entries with lexicographically sorted keys\s+recursively applying the same canonical serialization to nested values\s+falling back to `JSON\.stringify\(value\)` for non-object primitives and terminal non-object values/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/schemas\/src\/index\.js` is limited to 12 current helper call sites spanning the SWE\/CMD Markdown artifact body builders, SWE\/CMD JSON artifact validators, and the CMD release-eval\/profile-dossier snapshot equality checks/i,
  );
  assert.match(
    docsText,
    /the shared governance-side `toCanonicalJson` helper seam remains outside this helper seam because governance runtime stable serialization in `packages\/governance\/src\/index\.js` is a separate frozen boundary even where the current serialization behavior is intentionally parallel/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export scaffold remains outside this helper seam because the aggregate machine-readable contract-export boundary is a separate frozen external seam/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because machine-readable validation helper infrastructure and error construction are separate frozen internal boundaries that may consume this helper but do not define it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this helper seam because artifact-body reconstruction is a separate frozen internal boundary that may rely on canonical JSON text expectations but does not define the canonical serialization helper itself/i,
  );
  assert.match(
    docsText,
    /the shared API response-helper seam remains outside this helper seam because API response construction is performed in `apps\/api\/src\/index\.js` after schema validation results are returned or thrown/i,
  );
  assert.match(
    docsText,
    /the shared `\/cases\/:caseId\/\.\.\.` parser seam remains outside this helper seam because path parsing occurs before any schema boundary is reached/i,
  );
  assert.match(
    docsText,
    /downstream schema-specific validator, projection, reconstruction, and artifact-family business logic remain outside this helper seam because they may call the helper but do not define the canonical shared `packages\/schemas` canonical-JSON boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, validation semantics, reconstruction semantics, export semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function toCanonicalJson\(value\) \{\s*if \(Array\.isArray\(value\)\) \{\s*return `\[\$\{value\.map\(\(item\) => toCanonicalJson\(item\)\)\.join\(","\)\}\]`;\s*\}\s*if \(value && typeof value === "object"\) \{\s*const entries = Object\.keys\(value\)\s*\.sort\(\)\s*\.map\(\(key\) => `\$\{JSON\.stringify\(key\)\}:\$\{toCanonicalJson\(value\[key\]\)\}`\);\s*return `\{\$\{entries\.join\(","\)\}\}`;\s*\}\s*return JSON\.stringify\(value\);\s*\}/,
  );
  assert.equal(
    (schemasIndexText.match(/function toCanonicalJson\(/g) || []).length,
    1,
  );
  assert.equal(
    (governanceIndexText.match(/function toCanonicalJson\(/g) || []).length,
    1,
  );

  const lines = schemasIndexText.split("\n");
  let currentFunction = null;
  const callSites = [];

  for (let index = 0; index < lines.length; index += 1) {
    const functionMatch = lines[index].match(/^function\s+([A-Za-z0-9_]+)\s*\(/);
    if (functionMatch) {
      currentFunction = functionMatch[1];
    }

    if (lines[index].includes("toCanonicalJson(") && currentFunction !== "toCanonicalJson") {
      callSites.push({ fn: currentFunction, line: index + 1 });
    }
  }

  assert.equal(callSites.length, 12);

  const countsByFunction = new Map();
  for (const entry of callSites) {
    countsByFunction.set(entry.fn, (countsByFunction.get(entry.fn) || 0) + 1);
  }

  assert.equal(countsByFunction.get("buildSWEBodelningExportPackageMarkdownArtifactBody"), 3);
  assert.equal(countsByFunction.get("buildCMDExportPackageMarkdownArtifactBody"), 3);
  assert.equal(countsByFunction.get("validateSWEBodelningExportPackageJsonArtifact"), 1);
  assert.equal(countsByFunction.get("validateCMDExportPackageJsonArtifact"), 1);
  assert.equal(countsByFunction.get("validateCMDReleaseEvalRun"), 4);
});
