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

test("docs freeze the shared packages/schemas export-artifact reconstruction helper scaffold as the canonical internal reconstruction seam", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Export-Artifact Reconstruction Helper Scaffold Freeze/i,
  );
  assert.match(
    docsText,
    /shared export-artifact body reconstruction helper scaffold inside `packages\/schemas` is the canonical internal artifact-body reconstruction seam and is now frozen as the baseline internal reconstruction seam/i,
  );
  assert.match(
    docsText,
    /Markdown export artifact body parsing into canonical export package fields and JSON sections/i,
  );
  assert.match(
    docsText,
    /PDF export artifact body decoding plus canonical_export_package_json extraction/i,
  );
  assert.match(
    docsText,
    /DOCX export artifact body decoding plus canonical_export_package_json extraction/i,
  );
  assert.match(docsText, /shared PDF and DOCX text unescaping where already present/i);
  assert.match(
    docsText,
    /revalidation of reconstructed export package payloads through the existing shared export package validators/i,
  );
  assert.match(
    docsText,
    /`packages\/schemas` aggregate export scaffold remains the canonical external contract-export boundary/i,
  );
  assert.match(
    docsText,
    /`packages\/schemas` validation-helper scaffold remains a distinct internal validation seam/i,
  );
  assert.match(
    docsText,
    /this reconstruction helper scaffold is a distinct internal artifact-body reconstruction seam inside `packages\/schemas`/i,
  );
  assert.match(
    docsText,
    /artifact validator, projection, and reconstruction families may rely on this shared helper layer rather than duplicating ad hoc reconstruction logic/i,
  );
  assert.match(
    docsText,
    /including `reconstructSWEBodelningExportPackageFromMarkdownArtifactBody`, `reconstructCMDExportPackageFromMarkdownArtifactBody`, `reconstructSWEBodelningExportPackageFromPdfArtifactBody`, `reconstructCMDExportPackageFromPdfArtifactBody`, `reconstructSWEBodelningExportPackageFromDocxArtifactBody`, and `reconstructCMDExportPackageFromDocxArtifactBody`/i,
  );
  assert.match(
    docsText,
    /individual artifact families may still contain family-specific code as implementation detail, but they are not the canonical shared reconstruction seam/i,
  );
  assert.match(
    docsText,
    /future new shared artifact reconstruction behavior should extend the existing helper scaffold instead of introducing parallel reconstruction stacks/i,
  );
  assert.match(
    docsText,
    /undocumented bypasses of the shared reconstruction helper seam should be avoided for canonical shared artifact reconstruction infrastructure/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, reconstruction semantics, export semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function reconstructSWEBodelningExportPackageFromMarkdownArtifactBody\(/,
  );
  assert.match(
    schemasIndexText,
    /function reconstructCMDExportPackageFromMarkdownArtifactBody\(/,
  );
  assert.match(
    schemasIndexText,
    /function reconstructSWEBodelningExportPackageFromPdfArtifactBody\(/,
  );
  assert.match(
    schemasIndexText,
    /function reconstructCMDExportPackageFromPdfArtifactBody\(/,
  );
  assert.match(
    schemasIndexText,
    /function reconstructSWEBodelningExportPackageFromDocxArtifactBody\(/,
  );
  assert.match(
    schemasIndexText,
    /function reconstructCMDExportPackageFromDocxArtifactBody\(/,
  );
  assert.match(schemasIndexText, /function unescapePdfText\(/);
  assert.match(schemasIndexText, /function unescapeXmlText\(/);
  assert.match(
    schemasIndexText,
    /const exportPackage = reconstructSWEBodelningExportPackageFromDocxArtifactBody\(/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackage = reconstructCMDExportPackageFromDocxArtifactBody\(/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackage = reconstructSWEBodelningExportPackageFromPdfArtifactBody\(/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackage = reconstructCMDExportPackageFromPdfArtifactBody\(/,
  );
  assert.match(
    schemasIndexText,
    /const canonicalExportPackage =\s+reconstructSWEBodelningExportPackageFromMarkdownArtifactBody\(/,
  );
  assert.match(
    schemasIndexText,
    /const canonicalExportPackage =\s+reconstructCMDExportPackageFromMarkdownArtifactBody\(/,
  );
});
