const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const startHerePath = path.join(__dirname, "..", "00_START_HERE.md");
const startHereText = fs.readFileSync(startHerePath, "utf8");

test("start-here read order only references repo-native files that exist", () => {
  const lines = startHereText.split(/\r?\n/);
  const readOrderIndex = lines.indexOf("Läsordning");
  assert.notEqual(readOrderIndex, -1);

  const readOrderEntries = [];
  for (const line of lines.slice(readOrderIndex + 1)) {
    if (!line.trim()) {
      break;
    }
    readOrderEntries.push(line.trim());
  }

  assert.deepEqual(readOrderEntries, [
    "AGENTS.md",
    "docs/API_CONTRACTS_GOVERNANCE_v1.md",
    "docs/PRINCIPLES_FACT_MODEL_ROLLOUT_FREEZE_v1.md",
    "docs/MODEL_INFORMATION_PRINCIPLES_v1.md",
  ]);

  for (const entry of readOrderEntries) {
    assert.equal(
      fs.existsSync(path.join(__dirname, "..", entry)),
      true,
      `${entry} should exist`,
    );
  }

  for (const missingDoc of [
    "docs/MASTER_PRODUCT_SPEC.md",
    "docs/ARCHITECTURE_AND_DATA_MODEL.md",
    "docs/GOVERNANCE_AND_QUALITY_SYSTEM.md",
    "docs/CODEX_OPERATING_MODEL.md",
    "docs/SWE_BODELNING_ENDSTATE.md",
    "docs/ROADMAP_END_TO_END.md",
    "docs/DEFINITION_OF_DONE.md",
  ]) {
    assert.doesNotMatch(startHereText, new RegExp(missingDoc.replace(/\//g, "\\/")));
  }
});
