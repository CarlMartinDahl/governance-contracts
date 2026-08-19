const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
);
const readmePath = path.join(repoRoot, "README.md");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertIncludesAll(text, entries) {
  const normalizedText = text.replace(/\s+/g, " ").toLowerCase();

  for (const entry of entries) {
    assert.equal(
      normalizedText.includes(entry.replace(/\s+/g, " ").toLowerCase()),
      true,
      `Expected text to include: ${entry}`,
    );
  }
}

test("human review workspace alignment boundary exists and remains docs-only", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY",
    "DOCS_ONLY",
    "CANONICAL_PRODUCT_BOUNDARY_ONLY",
    "PUBLIC_RELEASE_SCOPE_ONLY",
    "COMMERCIAL_AND_LAUNCH_STRATEGY_EXCLUDED",
    "HIGH_IMPACT_DOMAIN_USE_NOT_AUTHORIZED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SCHEMA_CHANGE_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
  ]);
});

test("the layered product framing and bounded workflow target are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "GOVERNANCE_NO_OVERCLAIM_KERNEL",
    "HUMAN_REVIEW_WORKSPACE",
    "source-bound human review workspace",
    "source register using stable opaque references",
    "cross-source review chronology",
    "asserted claims separate from what appears in the supplied material",
    "declared packet/review gaps",
    "Require human correction and approval",
    "boundary stops, corrections, approval decisions, and export decisions",
  ]);
});

test("the four conceptual review states cannot become scores or conclusions", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "ASSERTED",
    "APPEARS_IN_SUPPLIED_MATERIAL",
    "NOT_ESTABLISHED",
    "HUMAN_REVIEW_REQUIRED",
    "not a runtime enum or schema",
    "probability, credibility, reliability, merit, sufficiency, guilt, ownership, or court-usefulness scores",
  ]);
});

test("controlled output families and no-conclusion language are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "SOURCE_REGISTER",
    "REVIEW_CHRONOLOGY",
    "ASSERTED_CLAIM_MATRIX",
    "DECLARED_PACKET_REVIEW_GAPS",
    "HUMAN_REVIEW_QUESTIONS",
    "NO_CONCLUSION_NOTICE",
    "CONTROLLED_HANDOFF_BRIEF",
    "No output selects final evidence",
    "not evidentiary sufficiency",
    "not an ownership determination",
  ]);
});

test("commercial strategy and high-impact deployment material remain excluded", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "commercial strategy, launch planning, investor material",
    "private recipient communications, review packets, dossiers",
    "product-market validation, procurement evidence",
    "These exclusions are publication boundaries only",
    "High-impact workflow overlap or operational gap | not established",
    "PUBLIC_SECTOR_USE_NOT_AUTHORIZED",
  ]);
});

test("forensic acquisition, police readiness, and real-data use remain blocked", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "does not acquire a device",
    "acquire, unlock, preserve, image, or forensically extract devices or accounts",
    "select final evidence",
    "court-ready or police-ready conclusion",
    "REAL_PRIVATE_MATERIAL_USE_NOT_AUTHORIZED",
    "Synthetic or sanitized material remains the default evaluation boundary",
    "Police, court, or public-sector suitability | not established and not authorized",
  ]);
});

test("security prerequisites do not become implementation or compliance claims", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "tenant, matter, and case isolation",
    "role-based and least-privilege access control",
    "attributable audit and correction history",
    "retention, deletion, and erasure controls",
    "incident handling and accountable ownership",
    "third-party processor and routing status",
    "prerequisites and unresolved gates, not implemented-control claims",
    "EU AI Act and GDPR references are regulatory design context only",
  ]);
});

test("README points to the canonical boundary without claiming readiness", () => {
  const readmeText = readText(readmePath);

  assertIncludesAll(readmeText, [
    "governance/no-overclaim kernel",
    "Human Review Workspace",
    "DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
    "not a claim of runtime completeness",
    "human/professional review remains the release gate",
  ]);
});
