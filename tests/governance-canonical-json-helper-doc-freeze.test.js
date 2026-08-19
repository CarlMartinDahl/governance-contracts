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

test("docs freeze the shared governance canonical-json helper seam as the stable serialization boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Canonical-JSON Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/governance\/src\/index\.js` `toCanonicalJson` helper is the canonical governance-local stable JSON serialization boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`profile_dossier` fingerprint helpers where existing dossier-fingerprint hashing already consumes canonical JSON\s+`export_package` dossier-fingerprint helpers and canonical export-package body assembly where existing helpers already serialize canonical export package payloads\s+`export_package_json_artifact`, `export_package_markdown_artifact`, `export_package_pdf_artifact`, and `export_package_docx_artifact` helper scaffolds where existing canonical payload serialization or round-trip equality checks already consume canonical JSON\s+`export_package_bundle_manifest` fingerprint, artifact-entry equality, and currentness comparison helpers\s+`export_package_bundle_archive_artifact` manifest-body assembly and manifest-artifact equality helpers/i,
  );
  assert.match(
    docsText,
    /callers performing shared governance-local canonical JSON serialization for those included surfaces should go through the shared `toCanonicalJson\(value\)` seam rather than relying on ambient object key order or ad hoc JSON string builders inside downstream governance logic/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+recursively serializing arrays in encounter order\s+recursively serializing object entries with lexicographically sorted keys\s+recursively applying the same canonical serialization to nested values\s+falling back to `JSON\.stringify\(value\)` for non-object primitives and terminal non-object values/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 36 current helper call sites spanning dossier fingerprinting, export-package dossier fingerprinting, canonical artifact body assembly, artifact round-trip equality checks, bundle-manifest fingerprinting, bundle-manifest currentness comparisons, and final bundle\/archive manifest-body assembly/i,
  );
  assert.match(
    docsText,
    /the shared `createGovernanceError` helper seam remains outside this helper seam because machine-readable governance error construction is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `assertSupportedJurisdictionProfileCapability` helper seam remains outside this helper seam because runtime supported-capability gating is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `assertPlainObject` helper seam remains outside this helper seam because governance-local object-shape gating is a separate frozen boundary that may run before canonical serialization but does not define it/i,
  );
  assert.match(
    docsText,
    /the shared jurisdiction-profile registry scaffold remains outside this helper seam because jurisdiction\/profile registry metadata and capability source-of-truth ownership are separate machine-readable boundaries/i,
  );
  assert.match(
    docsText,
    /the shared API response-helper seam remains outside this helper seam because API response construction is performed in `apps\/api\/src\/index\.js` after governance results are returned or thrown/i,
  );
  assert.match(
    docsText,
    /the shared `\/cases\/:caseId\/\.\.\.` parser seam remains outside this helper seam because path parsing occurs before any governance boundary is reached/i,
  );
  assert.match(
    docsText,
    /the shared `loadAuthorizedCaseContext` helper remains outside this helper seam because auth\/access loading and case-scoped capability gating occur before governance helper selection/i,
  );
  assert.match(
    docsText,
    /the shared database helper seams remain outside this helper seam because persistence\/storage\/normalization\/reconciliation\/reader behavior lives below the governance runtime boundary/i,
  );
  assert.match(
    docsText,
    /the shared governance adapter-dispatch scaffold remains outside this helper seam because jurisdiction-profile adapter routing and governed-surface dispatch are separate runtime boundaries above the canonical-serialization boundary/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance artifact helper scaffolds, including export-artifact derivation \/ round-trip, PDF\/DOCX content assembly, JSON artifact derivation \/ round-trip, bundle\/package manifest derivation \/ projection, and final bundle\/archive derivation \/ projection, remain outside this helper seam because they may consume canonical JSON output but do not define the canonical serialization boundary itself/i,
  );
  assert.match(
    docsText,
    /downstream governance dispatch, adapter, rule, and artifact-specific business logic remain outside this helper seam because they may call the helper but do not define the canonical shared canonical-JSON boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, registry semantics, schema semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function toCanonicalJson\(value\) \{\s*if \(Array\.isArray\(value\)\) \{\s*return `\[\$\{value\.map\(\(item\) => toCanonicalJson\(item\)\)\.join\(","\)\}\]`;\s*\}\s*if \(value && typeof value === "object"\) \{\s*const entries = Object\.keys\(value\)\s*\.sort\(\)\s*\.map\(\(key\) => `\$\{JSON\.stringify\(key\)\}:\$\{toCanonicalJson\(value\[key\]\)\}`\);\s*return `\{\$\{entries\.join\(","\)\}\}`;\s*\}\s*return JSON\.stringify\(value\);\s*\}/,
  );
  assert.equal(
    (governanceIndexText.match(/function toCanonicalJson\(/g) || []).length,
    1,
  );

  const lines = governanceIndexText.split("\n");
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

  assert.equal(callSites.length, 36);

  const functionsWithCallSites = new Set(callSites.map((entry) => entry.fn));
  assert.ok(functionsWithCallSites.has("deriveSWEBodelningProfileDossierFingerprint"));
  assert.ok(functionsWithCallSites.has("deriveCMDExportPackageDossierFingerprint"));
  assert.ok(functionsWithCallSites.has("deriveSWEBodelningExportPackageJsonArtifact"));
  assert.ok(functionsWithCallSites.has("deriveSWEBodelningExportPackageDocxArtifact"));
  assert.ok(functionsWithCallSites.has("deriveSWEBodelningExportPackagePdfArtifact"));
  assert.ok(functionsWithCallSites.has("deriveSWEBodelningExportPackageMarkdownArtifact"));
  assert.ok(functionsWithCallSites.has("assertSWEBodelningBundleManifestArtifactMatchesExportPackage"));
  assert.ok(functionsWithCallSites.has("deriveSWEBodelningExportPackageBundleManifestFingerprint"));
  assert.ok(functionsWithCallSites.has("assertSWEBodelningBundleArchiveManifestArtifactMatchesSnapshot"));
  assert.ok(functionsWithCallSites.has("deriveSWEBodelningExportPackageBundleArchiveArtifact"));
  assert.ok(functionsWithCallSites.has("deriveSWEBodelningExportPackageBundleManifestSnapshotStatus"));
  assert.ok(functionsWithCallSites.has("deriveCMDExportPackageBundleManifestSnapshotStatus"));
});
