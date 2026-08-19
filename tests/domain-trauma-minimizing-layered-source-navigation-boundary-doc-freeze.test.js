const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_TRAUMA_MINIMIZING_LAYERED_SOURCE_NAVIGATION_BOUNDARY_v1.md",
);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertIncludesAll(text, entries) {
  for (const entry of entries) {
    assert.match(text, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
}

test("trauma-minimizing layered source navigation boundary doc exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(
    docsText,
    /# Trauma-Minimizing Layered Source Navigation Boundary/,
  );
  assert.match(
    docsText,
    /Contract name: `TRAUMA_MINIMIZING_LAYERED_SOURCE_NAVIGATION_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /This document is documentation only\./);
});

test("text-primary-first layered workflow is frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The model must begin with the smallest available text-primary layer when available.",
    "A large original source package may contain SMS/message history, images, and metadata.",
    "A smaller image-free or cleaned PDF layer may be derived from the original source.",
    "A smallest text-primary export may be derived from the PDF/source material.",
    "`original protected source layer`",
    "`clean/image-free PDF layer`",
    "`text-primary export layer`",
    "`neutral marker inventory`",
  ]);
});

test("marker-to-pointer escalation rules are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The text-primary layer is used first to identify neutral markers",
    "The text-primary layer must not be used to create conclusions.",
    "Markers may open controlled pointer/search routes to the PDF layer.",
    "PDF-layer review may open controlled pointer/search routes to the protected original media/metadata layer only when necessary for human/professional review.",
    "`controlled pointer to PDF`",
    "`controlled pointer to original media/metadata only if needed`",
    "`human/professional review`",
  ]);
});

test("no-raw default and minimum necessary exposure rules are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Raw messages, screenshots, images, metadata, source locators, filenames, private paths, page references, URLs/tokens, sensitive dates, medical details, intimate details, child details, and third-party details must not be displayed by default.",
    "The model must not replay raw messages.",
    "The model must not display images or screenshots by default.",
    "The model must use marker, pointer, and review-route language rather than raw-detail replay.",
    "minimum necessary exposure and reduced user re-reading of distressing material",
  ]);
});

test("source-universe, counter-context, unresolved pointer, and conflict rules are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "searched",
    "not searched",
    "not searched by scope",
    "unavailable",
    "requires human/professional review",
    "The model must preserve counter-context and ordinary-context requirements.",
    "If counter-context or ordinary context is missing, the model must mark it as required, not infer it.",
    "If a pointer cannot be resolved across layers, the model must stop or mark the pointer unresolved.",
    "The model must not infer unresolved pointer content.",
    "If layer mapping conflicts, the model must fail closed and require review.",
  ]);
});

test("insufficient text-primary marker boundary does not negate exposure", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "If text-primary evidence is insufficient, the model must not say that nothing happened.",
    "If text-primary evidence is insufficient, the model must not say that the user was not exposed.",
    "this layer does not support further navigation without more context, resolved pointers, or human/professional review",
  ]);
});

test("metadata-as-proof and forbidden conclusion categories are blocked", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The model must not turn text markers, image metadata, timestamps, repetition, silence, read receipts, filenames, page positions, or source-layer proximity into proof.",
    "metadata as proof",
    "source locator as user-facing output",
    "legal conclusion",
    "clinical conclusion",
    "evidentiary conclusion",
    "credibility finding",
    "victim-status finding",
    "perpetrator-status finding",
    "offence finding",
    "ownership finding",
    "risk score",
    "sufficiency score",
    "police-report text",
    "pleading text",
    "external-use readiness",
    "product-candidate selection",
  ]);
});

test("real-run, data-handling, human review, and no-reopening boundaries are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Human/professional review remains the release gate.",
    "This boundary does not authorize a real large-source private run.",
    "This boundary does not resolve data-handling unknowns.",
    "retention",
    "access control beyond documented route/case-access behavior",
    "encryption",
    "audit logs",
    "deletion",
    "role permissions",
    "raw-material routing",
    "third-party model/API status",
    "SWE_BODELNING",
    "DK_PSYKISK_VOLD` offence modelling",
    "SWE_PSYKISKT_VALD` legal modelling",
    "Nordic comparison",
    "runtime behavior",
    "schemas",
    "API behavior",
    "package implementation",
    "external-use readiness",
    "product-candidate selection",
  ]);
});
