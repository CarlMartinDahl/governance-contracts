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

test("docs freeze the shared governance stored-zip helper seam as the canonical ZIP assembly boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Stored-ZIP Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/governance\/src\/index\.js` `buildStoredZip` helper is the canonical governance-local stored ZIP container assembly boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package_docx_artifact` DOCX content-assembly where the existing `buildMinimalDocxDocument` helper already delegates final ZIP container assembly through `buildStoredZip`\s+`export_package_bundle_archive_artifact` final archive body assembly for `SWE_BODELNING` and `"CMD_PROFILE"` where the existing final bundle\/archive helpers already delegate byte-container assembly through `buildStoredZip`/i,
  );
  assert.match(
    docsText,
    /callers performing shared governance-local stored ZIP assembly for those included surfaces should go through the shared `buildStoredZip\(files\)` seam rather than reimplementing ZIP local-header, central-directory, or end-of-central-directory assembly inline inside downstream governance logic/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+iterating the provided `files` entries in order\s+encoding each file name as UTF-8 bytes\s+treating `Buffer` file data as already-binary payload and otherwise coercing file data through `Buffer\.from\(file\.data, "utf8"\)`\s+computing per-entry CRC32 through the local `computeCrc32` helper detail inside this seam\s+emitting uncompressed stored ZIP local headers plus matching central-directory entries with the fixed shared DOS timestamp\/date constants already present in this helper region\s+appending a final end-of-central-directory record and returning the concatenated ZIP bytes as a `Buffer`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 3 current helper call sites spanning the shared DOCX content-assembly helper path plus final bundle\/archive body assembly for `SWE_BODELNING` and `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the nearby `computeCrc32` helper remains an internal implementation detail within this stored-ZIP seam because current repo evidence limits it to a single internal call from `buildStoredZip` and does not show it as an independently shared governance boundary/i,
  );
  assert.match(
    docsText,
    /the shared `toCanonicalJson` helper seam remains outside this helper seam because canonical JSON serialization is a separate frozen boundary that may feed ZIP entry bodies but does not define ZIP container assembly/i,
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
    /the shared `assertPlainObject` helper seam remains outside this helper seam because governance-local object-shape gating is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared jurisdiction-profile registry scaffold remains outside this helper seam because jurisdiction\/profile registry metadata and capability source-of-truth ownership are separate machine-readable boundaries/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance PDF\/DOCX content-assembly helper scaffold remains outside this helper seam because it may consume shared stored-ZIP assembly but also owns DOCX-specific content\/body construction beyond ZIP container assembly/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance final bundle\/archive artifact derivation and projection helper scaffold remains outside this helper seam because it may consume shared stored-ZIP assembly but also owns artifact-specific manifest selection, snapshot validation, and projection\/currentness behavior/i,
  );
  assert.match(
    docsText,
    /downstream governance dispatch, adapter, rule, and artifact-specific business logic remain outside this helper seam because they may call the helper or consume its output but do not define the canonical shared stored-ZIP assembly boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, registry semantics, artifact semantics, schema semantics, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function computeCrc32\(buffer\) \{\s*let value = 0xffffffff;\s*for \(const byte of buffer\) \{\s*value = crc32Table\[\(value \^ byte\) & 0xff\] \^ \(value >>> 8\);\s*\}\s*return \(value \^ 0xffffffff\) >>> 0;\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function buildStoredZip\(files\) \{\s*const localFileParts = \[\];\s*const centralDirectoryParts = \[\];\s*let offset = 0;\s*files\.forEach\(\(file\) => \{\s*const nameBuffer = Buffer\.from\(file\.name, "utf8"\);\s*const dataBuffer =\s*Buffer\.isBuffer\(file\.data\) \? file\.data : Buffer\.from\(file\.data, "utf8"\);\s*const crc32 = computeCrc32\(dataBuffer\);[\s\S]*?return Buffer\.concat\(\[\.\.\.localFileParts, centralDirectory, endOfCentralDirectory\]\);\s*\}/,
  );
  assert.equal(
    (governanceIndexText.match(/function buildStoredZip\(/g) || []).length,
    1,
  );
  assert.equal(
    (governanceIndexText.match(/function computeCrc32\(/g) || []).length,
    1,
  );

  const lines = governanceIndexText.split("\n");
  let currentFunction = null;
  const buildStoredZipCallSites = [];
  const computeCrc32CallSites = [];

  for (let index = 0; index < lines.length; index += 1) {
    const functionMatch = lines[index].match(/^function\s+([A-Za-z0-9_]+)\s*\(/);
    if (functionMatch) {
      currentFunction = functionMatch[1];
    }

    if (lines[index].includes("buildStoredZip([") && currentFunction !== "buildStoredZip") {
      buildStoredZipCallSites.push({ fn: currentFunction, line: index + 1 });
    }

    if (lines[index].includes("computeCrc32(") && currentFunction !== "computeCrc32") {
      computeCrc32CallSites.push({ fn: currentFunction, line: index + 1 });
    }
  }

  assert.equal(buildStoredZipCallSites.length, 3);
  assert.deepEqual(
    buildStoredZipCallSites.map((entry) => entry.fn),
    [
      "buildMinimalDocxDocument",
      "deriveSWEBodelningExportPackageBundleArchiveArtifact",
      "deriveCMDExportPackageBundleArchiveArtifact",
    ],
  );
  assert.equal(computeCrc32CallSites.length, 1);
  assert.deepEqual(
    computeCrc32CallSites.map((entry) => entry.fn),
    ["buildStoredZip"],
  );
});
