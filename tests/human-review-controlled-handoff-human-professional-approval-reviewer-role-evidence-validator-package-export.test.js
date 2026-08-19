"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const candidateSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json");
const resultSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-result.json");
const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");

const exportName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence";
const candidateExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence";
const resultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidatorResult";
const helperPath =
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.js";
const packageIndexPath = "packages/schemas/src/index.js";
const scaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const retainedSiblingDenials = [
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidator",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidatorRegistry",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function listExecutableFiles(relativeDirectory) {
  const root = absolute(relativeDirectory);
  const allowedExtensions = new Set([
    ".cjs",
    ".cts",
    ".js",
    ".jsx",
    ".json",
    ".mjs",
    ".mts",
    ".svelte",
    ".ts",
    ".tsx",
    ".vue",
  ]);
  const files = [];

  if (!fs.existsSync(root)) {
    return files;
  }

  function visit(currentPath) {
    for (const entry of fs.readdirSync(currentPath, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) {
        continue;
      }
      const entryPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        visit(entryPath);
      } else if (allowedExtensions.has(path.extname(entry.name))) {
        files.push(path.relative(repoRoot, entryPath));
      }
    }
  }

  visit(root);
  return files.sort();
}

function findRuntimeReferences(relativeDirectory) {
  const helperModuleBasename =
    "human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator";
  return listExecutableFiles(relativeDirectory).filter((relativePath) => {
    const source = readRequired(relativePath);
    return (
      new RegExp(`${exportName}(?![A-Za-z0-9_$])`, "u").test(source) ||
      new RegExp(`${helperModuleBasename}(?![A-Za-z0-9_-])`, "u").test(source)
    );
  });
}

test("package exports the exact unary reviewer-role evidence validator by reference", () => {
  const descriptor = Object.getOwnPropertyDescriptor(packageSchemas, exportName);

  assert.deepEqual(Object.keys(validatorModule), [exportName]);
  assert.equal(typeof validatorModule[exportName], "function");
  assert.equal(validatorModule[exportName].length, 1);
  assert.deepEqual(descriptor, {
    value: validatorModule[exportName],
    writable: true,
    enumerable: true,
    configurable: true,
  });
  assert.strictEqual(packageSchemas[exportName], validatorModule[exportName]);
});

test("package index contains one static binding and one direct export on exact anchors", () => {
  const indexText = readRequired(packageIndexPath);
  const indexLines = indexText.split("\n");
  const occurrences = indexText.match(new RegExp(`\\b${exportName}\\b`, "gu")) ?? [];

  assert.equal((indexText.match(/\n/gu) ?? []).length, 13165);
  assert.equal(occurrences.length, 3);
  assert.equal(indexLines[13140].includes(exportName), true);
  assert.equal(indexLines[13162].includes(exportName), true);
  assert.match(
    indexText,
    /\{ validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence \} = require\("\.\/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator\.js"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence = validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence/u,
  );
  assert.doesNotMatch(indexText, /Object\.defineProperty\([^\n]*validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence/u);
  assert.doesNotMatch(indexText, /validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence\s*=\s*(?:function|\()/u);
});

test("candidate and result schema exports preserve exact object identity", () => {
  assert.strictEqual(packageSchemas[candidateExportName], candidateSchema);
  assert.strictEqual(packageSchemas[resultExportName], resultSchema);
});

test("validator object lookup and registry sibling names remain absent", () => {
  for (const siblingName of retainedSiblingDenials) {
    assert.equal(Object.hasOwn(packageSchemas, siblingName), false, siblingName);
  }
});

test("package export remains anchored to the exact twelve-file scaffold", () => {
  const scaffoldText = readRequired(scaffoldPath);

  assert.match(scaffoldText, /OWNER_SELECTED_STAGES_1_TO_7_OPTION_A/u);
  assert.match(scaffoldText, /FUTURE_PACKAGE_EXPORT_DENIAL_TRANSITION_COUNT:\n10/u);
  assert.match(scaffoldText, /FUTURE_PACKAGE_EXPORT_FILE_COUNT:\n12/u);
  assert.match(scaffoldText, /RETAINED_PACKAGE_BEHAVIOR_SIBLING_DENIAL_COUNT:\n3/u);
  assert.match(scaffoldText, /STRICT_EQUAL_TO_DIRECT_MODULE_EXPORT/u);
  assert.match(scaffoldText, /no package, app, or worker consumer exists beyond/u);
  assert.match(
    scaffoldText,
    /TRACKED_DOCS_ONLY_REFERENCE_EQUIVALENT_PACKAGE_EXPORT_SCOPE_DEFINED/u,
  );
});

test("publication introduces no package, app, or worker consumer", () => {
  assert.deepEqual(findRuntimeReferences("packages"), [helperPath, packageIndexPath]);
  assert.deepEqual(findRuntimeReferences("apps"), []);
  assert.deepEqual(findRuntimeReferences("workers"), []);
});
