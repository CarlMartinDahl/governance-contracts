const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_TRAUMA_INFORMED_INITIAL_ACKNOWLEDGEMENT_WITHOUT_CONCLUSION_BOUNDARY_v1.md",
);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertIncludesAll(text, entries) {
  for (const entry of entries) {
    assert.match(text, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
}

test("trauma-informed acknowledgement boundary doc exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(
    docsText,
    /# Trauma-Informed Initial Acknowledgement Without Conclusion Boundary/,
  );
  assert.match(
    docsText,
    /Contract name: `TRAUMA_INFORMED_INITIAL_ACKNOWLEDGEMENT_WITHOUT_CONCLUSION_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /This document is documentation only\./);
});

test("supportive acknowledgement is bounded to review-signal validation without conclusion", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "When repeated markers are present, the model may give a supportive first acknowledgement.",
    "The acknowledgement must use marker, pattern, and review-signal language.",
    "The acknowledgement remains `VALIDATION_WITHOUT_CONCLUSION`.",
    "The model must route the material toward human/professional review.",
    "recurring markers are consistent with psychological abuse, psychological violence, psykisk misshandel, or psykisk vold as a review signal",
  ]);
});

test("not imagination, not strange, and not personal defect substance is frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Materialet innehåller återkommande markörer som är förenliga med psykisk utsatthet / psykisk misshandel / psykisk vold som granskningssignal.",
    "Det betyder inte att modellen juridiskt eller kliniskt fastställer vad som har hänt, vem som är offer/förövare, eller om något är bevisat.",
    "upplevelsen inte bör avfärdas som inbillning",
    "personen är ‘konstig’",
    "personligt fel",
    "serious enough to take to human/professional review",
  ]);
});

test("minimum exposure and no raw re-reading rules are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The initial acknowledgement should minimize exposure to raw distressing material.",
    "The model should use review-signal, marker, and pattern summaries by default.",
    "The user should not need to manually re-read raw material by default for this acknowledgement layer.",
    "The model must not require the user to re-read raw distressing material.",
    "The model must not display raw material by default.",
  ]);
});

test("insufficient-marker boundary does not negate user exposure", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "If repeated markers are not sufficient, the model must not say that nothing happened.",
    "If repeated markers are not sufficient, the model must not say that the user was not exposed.",
    "this acknowledgement layer does not support the acknowledgement without more context or human/professional review",
  ]);
});

test("forbidden conclusion categories and blocked examples are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Psykisk misshandel föreligger.",
    "Psykisk vold är juridiskt etablerad.",
    "Du är juridiskt offer.",
    "Motparten är förövare.",
    "Detta bevisar brott.",
    "Du har trauma.",
    "Du är mentalt sjuk.",
    "Du är inte mentalt sjuk.",
    "Materialet är tillräckligt för polisanmälan/inlaga.",
    "Materialet är externt användningsklart.",
    "The model must not say psychological abuse or psykisk vold is legally established.",
    "The model must not say the user is legally a victim.",
    "The model must not say another person is a perpetrator.",
    "The model must not diagnose trauma, mental illness, narcissism, coercive control, or any clinical state.",
    "The model must not create evidence sufficiency, credibility, risk, police-report, pleading, external-use, or product-candidate conclusions.",
  ]);
});

test("human review remains the gate and adjacent domains stay closed or parked", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Human/professional review remains the release gate.",
    "does not replace human/professional review",
    "SWE_PSYKISKT_VALD` legal modelling",
    "DK_PSYKISK_VOLD` offence modelling",
    "SWE/DK comparison",
    "Nordic comparison",
    "SWE_BODELNING",
    "runtime behavior",
    "schemas",
    "API behavior",
    "product-candidate selection",
  ]);
});
