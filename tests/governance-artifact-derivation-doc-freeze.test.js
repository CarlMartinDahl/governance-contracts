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

test("docs freeze the shared governance export-artifact derivation and round-trip helper scaffold as the canonical internal runtime/helper seam", () => {
  assert.match(
    docsText,
    /Shared Governance Export-Artifact Derivation and Round-Trip Helper Scaffold Freeze/i,
  );
  assert.match(
    docsText,
    /shared governance export-artifact derivation and round-trip helper scaffold inside `packages\/governance` is the canonical internal runtime\/helper seam for `export_package_markdown_artifact`, `export_package_pdf_artifact`, and `export_package_docx_artifact`/i,
  );
  assert.match(
    docsText,
    /deterministic Markdown, PDF, and DOCX artifact derivation from canonical export package snapshots/i,
  );
  assert.match(
    docsText,
    /round-trip helper behavior that reconstructs canonical export package payloads from persisted artifact bodies through the frozen shared packages\/schemas reconstruction seam/i,
  );
  assert.match(
    docsText,
    /shared use of the same derivation \/ round-trip baseline across the three included artifact families/i,
  );
  assert.match(
    docsText,
    /frozen `packages\/schemas` export-artifact reconstruction helper scaffold remains the canonical shared reconstruction seam/i,
  );
  assert.match(
    docsText,
    /this governance helper scaffold is the canonical shared derivation \/ round-trip seam inside `packages\/governance`/i,
  );
  assert.match(
    docsText,
    /may rely on the frozen reconstruction seam rather than duplicating reconstruction logic, but the two seams remain distinct/i,
  );
  assert.match(
    docsText,
    /individual artifact-family-specific code may remain as implementation detail, but it is not the canonical shared derivation \/ round-trip seam/i,
  );
  assert.match(
    docsText,
    /future new shared Markdown\/PDF\/DOCX-style artifact derivation \/ round-trip behavior should extend the existing governance helper scaffold instead of introducing a parallel helper stack/i,
  );
  assert.match(
    docsText,
    /undocumented bypasses of this shared governance helper scaffold should be avoided for comparable shared artifact runtime behavior/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, derivation semantics, round-trip semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageDocxArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageDocxArtifact\(/,
  );
  assert.match(governanceIndexText, /function deriveExportPackageDocxArtifact\(/);
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageFromDocxArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageFromDocxArtifact\(/,
  );
  assert.match(governanceIndexText, /function deriveExportPackageFromDocxArtifact\(/);
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackagePdfArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackagePdfArtifact\(/,
  );
  assert.match(governanceIndexText, /function deriveExportPackagePdfArtifact\(/);
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageFromPdfArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageFromPdfArtifact\(/,
  );
  assert.match(governanceIndexText, /function deriveExportPackageFromPdfArtifact\(/);
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageMarkdownArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageMarkdownArtifact\(/,
  );
  assert.match(governanceIndexText, /function deriveExportPackageMarkdownArtifact\(/);
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageFromMarkdownArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageFromMarkdownArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageFromMarkdownArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /reconstructSWEBodelningExportPackageFromDocxArtifactBody,/,
  );
  assert.match(
    governanceIndexText,
    /reconstructCMDExportPackageFromPdfArtifactBody,/,
  );
  assert.match(
    governanceIndexText,
    /reconstructSWEBodelningExportPackageFromMarkdownArtifactBody,/,
  );
  assert.match(
    governanceIndexText,
    /return reconstructCMDExportPackageFromDocxArtifactBody\(/,
  );
  assert.match(
    governanceIndexText,
    /return reconstructSWEBodelningExportPackageFromPdfArtifactBody\(/,
  );
  assert.match(
    governanceIndexText,
    /return reconstructCMDExportPackageFromMarkdownArtifactBody\(/,
  );
});

test("docs freeze the shared governance PDF/DOCX content-assembly helper scaffold as the canonical narrower internal runtime/helper seam", () => {
  assert.match(
    docsText,
    /Shared Governance PDF\/DOCX Content-Assembly Helper Scaffold Freeze/i,
  );
  assert.match(
    docsText,
    /shared governance PDF\/DOCX content-assembly helper scaffold inside `packages\/governance` is the canonical internal runtime\/helper seam for PDF and DOCX content assembly/i,
  );
  assert.match(
    docsText,
    /included helper scope in this freeze is exactly `chunkPdfText`, `buildMinimalPdfDocument`, `chunkDocxText`, and `buildMinimalDocxDocument`/i,
  );
  assert.match(
    docsText,
    /this narrower helper seam currently serves `export_package_pdf_artifact` and `export_package_docx_artifact`/i,
  );
  assert.match(
    docsText,
    /shared reuse of the same PDF\/DOCX content-assembly baseline across the current PDF and DOCX artifact families/i,
  );
  assert.match(
    docsText,
    /frozen `packages\/schemas` reconstruction helper scaffold remains the canonical shared reconstruction seam/i,
  );
  assert.match(
    docsText,
    /frozen broader governance export-artifact derivation and round-trip helper scaffold remains the canonical larger runtime\/helper seam/i,
  );
  assert.match(
    docsText,
    /this PDF\/DOCX content-assembly helper scaffold is a narrower distinct governance seam inside that larger area/i,
  );
  assert.match(
    docsText,
    /may rely on those other frozen seams where appropriate, but they remain a distinct shared helper boundary/i,
  );
  assert.match(
    docsText,
    /family-specific surrounding artifact derivation code may remain as implementation detail, but it is not the canonical shared PDF\/DOCX content-assembly seam/i,
  );
  assert.match(
    docsText,
    /future new shared PDF\/DOCX-style content-assembly behavior should extend the existing helper scaffold instead of introducing a parallel content-assembly stack/i,
  );
  assert.match(
    docsText,
    /undocumented bypasses of this shared helper scaffold should be avoided for comparable shared PDF\/DOCX content-assembly behavior/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, content-assembly semantics, derivation semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(governanceIndexText, /function chunkPdfText\(/);
  assert.match(governanceIndexText, /function buildMinimalPdfDocument\(/);
  assert.match(governanceIndexText, /function chunkDocxText\(/);
  assert.match(governanceIndexText, /function buildMinimalDocxDocument\(/);
  assert.match(governanceIndexText, /const docxDocument = buildMinimalDocxDocument\(\[/);
  assert.match(governanceIndexText, /\.\.\.chunkDocxText\(canonicalExportPackageJson\)/);
  assert.match(governanceIndexText, /const pdfDocument = buildMinimalPdfDocument\(\[/);
  assert.match(governanceIndexText, /\.\.\.chunkPdfText\(canonicalExportPackageJson\)/);
});

test("docs freeze the shared governance JSON export-artifact derivation and round-trip helper scaffold as the canonical internal runtime/helper seam for JSON artifacts", () => {
  assert.match(
    docsText,
    /Shared Governance JSON Export-Artifact Derivation and Round-Trip Helper Scaffold Freeze/i,
  );
  assert.match(
    docsText,
    /shared governance JSON export-artifact derivation and round-trip helper scaffold inside `packages\/governance` is the canonical internal runtime\/helper seam for `export_package_json_artifact`/i,
  );
  assert.match(
    docsText,
    /deterministic JSON artifact derivation from canonical export package snapshots through canonical JSON serialization into body_utf8/i,
  );
  assert.match(
    docsText,
    /round-trip helper behavior that reparses persisted body_utf8 into canonical export package payloads for the existing projection and currentness path/i,
  );
  assert.match(
    docsText,
    /shared use of the same JSON derivation \/ round-trip baseline across the JSON artifact family/i,
  );
  assert.match(
    docsText,
    /frozen `packages\/schemas` reconstruction helper scaffold remains a distinct internal reconstruction boundary/i,
  );
  assert.match(
    docsText,
    /frozen broader governance export-artifact derivation and round-trip helper scaffold currently documents the shared Markdown\/PDF\/DOCX helper area/i,
  );
  assert.match(
    docsText,
    /frozen governance PDF\/DOCX content-assembly helper scaffold remains a narrower PDF\/DOCX-only helper area/i,
  );
  assert.match(
    docsText,
    /this JSON artifact helper scaffold is a distinct governance-side seam for JSON artifact derivation \/ round-trip behavior/i,
  );
  assert.match(
    docsText,
    /may rely on those other seams where appropriate, but they remain a distinct shared helper boundary/i,
  );
  assert.match(
    docsText,
    /family-specific JSON artifact code may remain as implementation detail, but it is not the canonical shared JSON derivation \/ round-trip seam/i,
  );
  assert.match(
    docsText,
    /future new shared JSON export-artifact derivation \/ round-trip behavior should extend the existing governance helper scaffold instead of introducing a parallel helper stack/i,
  );
  assert.match(
    docsText,
    /undocumented bypasses of this shared governance JSON helper seam should be avoided for comparable shared JSON artifact runtime behavior/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, derivation semantics, round-trip semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageJsonArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageJsonArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageFromJsonArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageFromJsonArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageJsonArtifactSnapshotStatus\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageJsonArtifactSnapshotStatus\(/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageJsonArtifactProjection\(/,
  );
  assert.match(
    governanceIndexText,
    /body_utf8: toCanonicalJson\(canonicalExportPackage\)/,
  );
  assert.match(
    governanceIndexText,
    /return validateSWEBodelningExportPackage\(\s+JSON\.parse\(canonicalExportPackageJsonArtifact\.body_utf8\)/,
  );
  assert.match(
    governanceIndexText,
    /return validateCMDExportPackage\(\s+JSON\.parse\(canonicalExportPackageJsonArtifact\.body_utf8\)/,
  );
});

test("docs freeze the shared governance bundle/package manifest derivation and projection helper scaffold as the canonical internal runtime/helper seam for bundle/package manifests", () => {
  assert.match(
    docsText,
    /Shared Governance Bundle\/Package Manifest Derivation and Projection Helper Scaffold Freeze/i,
  );
  assert.match(
    docsText,
    /shared governance bundle\/package manifest derivation and projection helper scaffold inside `packages\/governance` is the canonical internal runtime\/helper seam for `export_package_bundle_manifest`/i,
  );
  assert.match(
    docsText,
    /deterministic bundle\/package manifest derivation from canonical export package snapshots plus the corresponding canonical JSON, Markdown, PDF, and DOCX artifact snapshots/i,
  );
  assert.match(
    docsText,
    /shared projection\/currentness helper behavior that derives machine-readable snapshot_status from the persisted manifest snapshot plus the current canonical export package and artifact snapshot set/i,
  );
  assert.match(
    docsText,
    /shared use of the same derivation \/ projection baseline across the bundle\/package manifest family/i,
  );
  assert.match(
    docsText,
    /frozen `packages\/schemas` reconstruction helper scaffold remains a distinct internal reconstruction boundary/i,
  );
  assert.match(
    docsText,
    /frozen broader governance export-artifact derivation and round-trip helper scaffold remains a distinct broader runtime\/helper boundary for Markdown\/PDF\/DOCX artifact families/i,
  );
  assert.match(
    docsText,
    /frozen governance JSON export-artifact derivation and round-trip helper scaffold remains a distinct JSON-only runtime\/helper boundary/i,
  );
  assert.match(
    docsText,
    /this bundle\/package manifest helper scaffold is a distinct governance-side seam for bundle\/package manifest derivation \/ projection behavior/i,
  );
  assert.match(
    docsText,
    /may rely on those other seams where appropriate, but they remain a distinct shared helper boundary/i,
  );
  assert.match(
    docsText,
    /family-specific surrounding code may remain as implementation detail, but it is not the canonical shared bundle\/package manifest derivation \/ projection seam/i,
  );
  assert.match(
    docsText,
    /future new shared bundle\/package manifest derivation \/ projection behavior should extend the existing governance helper scaffold instead of introducing a parallel helper stack/i,
  );
  assert.match(
    docsText,
    /undocumented bypasses of this shared governance helper seam should be avoided for comparable shared bundle\/package manifest runtime behavior/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, derivation semantics, projection semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageBundleManifest\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageBundleManifest\(/,
  );
  assert.match(
    governanceIndexText,
    /function resolveSWEBodelningExportPackageBundleManifestProjection\(/,
  );
  assert.match(
    governanceIndexText,
    /function resolveCMDExportPackageBundleManifestProjection\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageBundleManifestSnapshotStatus\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageBundleManifestSnapshotStatus\(/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageBundleManifestProjection\(/,
  );
  assert.match(
    governanceIndexText,
    /deriveSWEBodelningExportPackageFromJsonArtifact\(canonicalJsonArtifact\)/,
  );
  assert.match(
    governanceIndexText,
    /deriveCMDExportPackageFromJsonArtifact\(canonicalJsonArtifact\)/,
  );
  assert.match(
    governanceIndexText,
    /snapshot_status: deriveSWEBodelningExportPackageBundleManifestSnapshotStatus\(/,
  );
  assert.match(
    governanceIndexText,
    /snapshot_status: deriveCMDExportPackageBundleManifestSnapshotStatus\(/,
  );
});

test("docs freeze the shared governance final bundle/archive artifact derivation and projection helper scaffold as the canonical internal runtime/helper seam for final bundle/archive artifacts", () => {
  assert.match(
    docsText,
    /Shared Governance Final Bundle\/Archive Artifact Derivation and Projection Helper Scaffold Freeze/i,
  );
  assert.match(
    docsText,
    /shared governance final bundle\/archive artifact derivation and projection helper scaffold inside `packages\/governance` is the canonical internal runtime\/helper seam for `export_package_bundle_archive_artifact`/i,
  );
  assert.match(
    docsText,
    /deterministic final bundle\/archive artifact derivation from canonical persisted bundle\/package manifest snapshots plus the corresponding canonical JSON, Markdown, PDF, and DOCX artifact snapshots/i,
  );
  assert.match(
    docsText,
    /shared projection\/currentness helper behavior that derives machine-readable snapshot_status from the persisted final bundle\/archive artifact snapshot plus the current canonical bundle\/package manifest projection/i,
  );
  assert.match(
    docsText,
    /shared use of the same derivation \/ projection baseline across the final bundle\/archive artifact family/i,
  );
  assert.match(
    docsText,
    /frozen `packages\/schemas` reconstruction helper scaffold remains a distinct internal reconstruction boundary/i,
  );
  assert.match(
    docsText,
    /frozen broader governance export-artifact derivation and round-trip helper scaffold remains a distinct broader runtime\/helper boundary/i,
  );
  assert.match(
    docsText,
    /frozen governance bundle\/package manifest derivation and projection helper scaffold remains a distinct manifest-only runtime\/helper boundary/i,
  );
  assert.match(
    docsText,
    /frozen governance JSON export-artifact derivation and round-trip helper scaffold remains a distinct JSON-only runtime\/helper boundary/i,
  );
  assert.match(
    docsText,
    /frozen governance PDF\/DOCX content-assembly helper scaffold remains a distinct PDF\/DOCX-only runtime\/helper boundary/i,
  );
  assert.match(
    docsText,
    /this final bundle\/archive helper scaffold is a distinct governance-side seam for final bundle\/archive artifact derivation \/ projection behavior/i,
  );
  assert.match(
    docsText,
    /may rely on those other seams where appropriate, but they remain a distinct shared helper boundary/i,
  );
  assert.match(
    docsText,
    /family-specific surrounding code may remain as implementation detail, but it is not the canonical shared final bundle\/archive derivation \/ projection seam/i,
  );
  assert.match(
    docsText,
    /future new shared final bundle\/archive derivation \/ projection behavior should extend the existing governance helper scaffold instead of introducing a parallel helper stack/i,
  );
  assert.match(
    docsText,
    /undocumented bypasses of this shared governance helper seam should be avoided for comparable shared final bundle\/archive runtime behavior/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, derivation semantics, projection semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageBundleArchiveArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageBundleArchiveArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageBundleArchiveArtifact\(/,
  );
  assert.match(
    governanceIndexText,
    /function resolveSWEBodelningExportPackageBundleArchiveArtifactProjection\(/,
  );
  assert.match(
    governanceIndexText,
    /function resolveCMDExportPackageBundleArchiveArtifactProjection\(/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageBundleArchiveArtifactProjection\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus\(/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageBundleArchiveArtifactSnapshotStatus\(/,
  );
  assert.match(governanceIndexText, /buildStoredZip\(\[/);
  assert.match(governanceIndexText, /toBundleArchiveFileData\(artifactSnapshot\)/);
  assert.match(
    governanceIndexText,
    /snapshot_status:\s*deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus\(/,
  );
  assert.match(
    governanceIndexText,
    /snapshot_status:\s*deriveCMDExportPackageBundleArchiveArtifactSnapshotStatus\(/,
  );
});
