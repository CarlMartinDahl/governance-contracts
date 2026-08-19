const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE_v1.md",
);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertIncludesAll(text, entries) {
  for (const entry of entries) {
    assert.match(text, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
}

test("technical verification appendix doc exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(
    docsText,
    /# Technical Verification Appendix: Governance Enforcement Evidence/,
  );
  assert.match(
    docsText,
    /Appendix name: `TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /not runtime certification/i);
});

test("implemented-vs-DOCS_ONLY matrix and all evidence levels are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "## Implemented-vs-DOCS_ONLY Matrix",
    "runtime-enforced",
    "schema-enforced",
    "prompt/workflow-enforced",
    "human-workflow-enforced",
    "DOCS_ONLY",
    "unknown / not evidenced",
    "Must not be used to overclaim runtime enforcement",
  ]);
});

test("current committed boundary references preserve commit roles", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "7600167 docs(domain): freeze Gate-001 no-raw package intake boundary",
    "4729d2e docs(domain): freeze trauma-informed acknowledgement boundary",
    "422548a docs(domain): freeze SWE bodelning professional review gate",
    "422548a` is a historical SWE bodelning professional-review-only gate reference where applicable. It is not the current HEAD for this appendix.",
  ]);
});

test("failure-mode register includes required failure modes", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "RAW_CONTENT_LEAK",
    "SCOPE_LEAK",
    "LEGAL_CONCLUSION_LEAK",
    "CLINICAL_DIAGNOSIS_LEAK",
    "MISSING_SOURCE_DECLARATION",
    "METADATA_AS_PROOF",
    "MARKER_FINDING_LEAK",
    "EXTERNAL_USE_LEAK",
    "PRODUCT_CANDIDATE_LEAK",
  ]);
});

test("threat model and data handling unknowns are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Prompt injection",
    "User steering / overbroad waiver",
    "Cherry-picking",
    "Hallucinated source review",
    "Raw-content leakage",
    "Model overconfidence",
    "Incomplete source universe",
    "Unauthorized external use",
    "Gate conflict",
    "`DOCS_ONLY` mistaken for runtime enforcement",
    "retention",
    "access control",
    "encryption",
    "audit logs",
    "deletion",
    "role permissions",
    "raw-material routing",
    "third-party model/API status",
  ]);
});

test("integrity and reproducibility limits block proof overclaims", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "manifests",
    "SHA256",
    "ZIP validation",
    "canonical JSON",
    "table validation",
    "repo status",
    "generated artifact list",
    "Integrity and reproducibility checks are not truth proof, legal proof, clinical proof",
    "Archive integrity, checksum validation, manifest validation, ZIP validation, table validation, and generated artifact lists must remain process evidence only",
  ]);
});

test("appendix preserves no-conclusion and no-reopening boundaries", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "no legal conclusions",
    "no clinical conclusions",
    "no evidentiary conclusions",
    "no credibility findings",
    "no offence findings",
    "no ownership findings",
    "no risk/sufficiency scoring",
    "no police-report/pleading generation",
    "no external-use readiness",
    "no product-candidate selection",
    "human/professional review remains release gate",
    "DK_PSYKISK_VOLD` offence modelling",
    "SWE_PSYKISKT_VALD` legal modelling",
    "Nordic comparison",
    "runtime",
    "schemas",
    "API",
    "product-candidate selection",
  ]);
});
