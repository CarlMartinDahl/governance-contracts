const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_GATE_001_NO_RAW_CLASSIFICATION_PACKAGE_INTAKE_BOUNDARY_v1.md",
);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertIncludesAll(text, entries) {
  for (const entry of entries) {
    assert.match(text, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
}

test("Gate-001 no-raw package intake boundary doc exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(docsText, /# Gate-001 No-Raw Classification Package Intake Boundary/);
  assert.match(
    docsText,
    /Contract name: `GATE_001_NO_RAW_CLASSIFICATION_PACKAGE_INTAKE_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /This document is documentation only\./);
});

test("allowed intake metadata is explicit and narrow", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "SOURCE_LAYER_001_TEXT_PRIMARY_EXPORT",
    "811",
    "1dbd3cb23af8ddc3d1831c150a7f8f42976c328aab86a04e8c79a8cc059e45b7",
    "user-facing raw output allowed: `No`",
    "VALIDATION_WITHOUT_CONCLUSION_BOUNDARY",
    "classification row count: `20`",
    "The allowed metadata is provenance and process context only.",
  ]);
});

test("no-raw and private-detail emission blocks are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Gate-001 package intake must not emit raw source material.",
    "source locators",
    "filenames",
    "private facts",
    "sensitive dates",
    "page references",
    "URLs/tokens",
    "medical details",
    "intimate details",
    "child details",
    "third-party details",
  ]);
});

test("no-conclusion and no-external-use boundaries are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "legal conclusions",
    "clinical conclusions",
    "evidentiary conclusions",
    "case-truth conclusions",
    "credibility findings",
    "ownership conclusions",
    "offence conclusions",
    "risk scores",
    "sufficiency scores",
    "police-report text",
    "pleading text",
    "external-use readiness",
    "product-candidate selection",
    "The package does not authorize external-use readiness.",
  ]);
});

test("archive integrity remains private intake only, not release approval", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Archive integrity or checksum validation is a private intake check only.",
    "Archive integrity or checksum validation is not release approval.",
    "Archive integrity or checksum validation is not external-use readiness.",
    "Human/professional review remains the release gate.",
  ]);
});

test("scope separation blocks reopening parked or closed families", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "This Gate-001 boundary does not reopen:",
    "SWE_BODELNING",
    "DK_PSYKISK_VOLD",
    "SWE_PSYKISKT_VALD",
    "Nordic comparison",
    "runtime behavior",
    "schemas",
    "API behavior",
    "package intake implementation",
    "product-candidate selection",
    "closed technical helper families",
  ]);
});
