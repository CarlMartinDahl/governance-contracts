const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const modelDocPath = path.join(
  __dirname,
  "..",
  "docs",
  "MODEL_INFORMATION_PRINCIPLES_v1.md",
);
const apiDocPath = path.join(
  __dirname,
  "..",
  "docs",
  "API_CONTRACTS_GOVERNANCE_v1.md",
);

const modelDocText = fs.readFileSync(modelDocPath, "utf8");
const apiDocText = fs.readFileSync(apiDocPath, "utf8");

test("the canonical model principles doc defines the repository information posture", () => {
  assert.match(modelDocText, /^# Model Information Principles v1/m);
  assert.match(
    modelDocText,
    /does not\s+predict legal outcomes/i,
  );
  assert.match(
    modelDocText,
    /does not replace lawyer, police, prosecutor, or court judgment/i,
  );
  assert.match(
    modelDocText,
    /human legal actors remain the final interpreters/i,
  );
  assert.match(modelDocText, /^## Layer Separation/m);
  assert.match(modelDocText, /`fact intake`/);
  assert.match(modelDocText, /`rule evaluation`/);
  assert.match(modelDocText, /`human legal interpretation`/);
  assert.match(modelDocText, /^## Fail-Closed Principle/m);
  assert.match(
    modelDocText,
    /must stop or block rather than guess,\s*predict,\s*or infer/i,
  );
});

test("the canonical model principles doc defines the first semantic fact model and stop matrix", () => {
  assert.match(modelDocText, /^## First Semantic Fact Model/m);
  assert.match(modelDocText, /`presence_status`/);
  assert.match(modelDocText, /`source_status`/);
  assert.match(modelDocText, /`verification_status`/);
  assert.match(modelDocText, /`dispute_status`/);
  assert.match(modelDocText, /`consistency_status`/);
  assert.match(modelDocText, /^## Stop Outcomes/m);
  assert.match(modelDocText, /`blocked`/);
  assert.match(modelDocText, /`insufficient_input`/);
  assert.match(modelDocText, /`unsupported`/);
  assert.match(modelDocText, /`requires_human_review`/);
  assert.match(modelDocText, /^## Stop Matrix/m);
  assert.match(modelDocText, /Missing required input/);
  assert.match(modelDocText, /Unsupported profile, surface, or capability/);
  assert.match(modelDocText, /Unsourced or unverified information/);
});

test("the canonical model principles doc defines traceability and links back to current repo posture", () => {
  assert.match(modelDocText, /^## Traceability Principle/m);
  assert.match(modelDocText, /Any non-blocked result must be explainable from/i);
  assert.match(
    modelDocText,
    /changed input,\s*changed support,\s*or changed\s*documented rule/i,
  );
  assert.match(modelDocText, /^## Relationship To Current Repo/m);
  assert.match(modelDocText, /`SWE_BODELNING` and `CMD_PROFILE` currently use this philosophy/);
  assert.match(
    modelDocText,
    /Undocumented cases must remain\s*fail-closed/,
  );
});

test("API contracts doc cross-references the canonical model principles doc", () => {
  assert.match(
    apiDocText,
    /`docs\/MODEL_INFORMATION_PRINCIPLES_v1\.md`/,
  );
  assert.match(
    apiDocText,
    /model-information, uncertainty, and fail-closed principles/i,
  );
});
