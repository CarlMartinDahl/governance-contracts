const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const {
  validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence,
} = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js");

const repoRoot = path.resolve(__dirname, "..");
const demoPath = path.join(repoRoot, "docs", "index.html");
const readmePath = path.join(repoRoot, "README.md");
const demo = fs.readFileSync(demoPath, "utf8");
const readme = fs.readFileSync(readmePath, "utf8");

const pagesUrl = "https://carlmartindahl.github.io/governance-contracts/";
const repositoryUrl = "https://github.com/CarlMartinDahl/governance-contracts";

test("public synthetic demo source is one self-contained HTML document", () => {
  assert.ok(fs.existsSync(demoPath));
  assert.match(demo, /<link rel="canonical" href="https:\/\/carlmartindahl\.github\.io\/governance-contracts\/" \/>/);
  assert.equal((demo.match(/<script>/g) ?? []).length, 1);
  assert.equal((demo.match(/<script\s+src=/gi) ?? []).length, 0);
  assert.equal((demo.match(/<link\s+rel="stylesheet"/gi) ?? []).length, 0);
  assert.equal((demo.match(/<(?:img|audio|video|iframe)\b/gi) ?? []).length, 0);
});

test("demo freezes the synthetic fail-closed and human-review boundaries", () => {
  const required = [
    "SYNTHETIC · NOT A LIVE CASE",
    "role_permission_policy_evidence_ref",
    "required_field_missing",
    "$.role_permission_policy_evidence_ref",
    "valid: <span class=\"miss\">false</span>",
    "guess: false",
    "approval: not manufactured",
    "valid ≠ verified",
    "NOT_VERIFIED_BY_CONTRACT",
    "Human judgment is not automated.",
    "Synthetic demonstrator only. No real case material. Contract-valid does not mean verified authority.",
  ];

  for (const marker of required) {
    assert.ok(demo.includes(marker), `missing demo boundary marker: ${marker}`);
  }
});

test("displayed missing-policy result is produced by the tracked validator", () => {
  const candidate = {
    contract_id: "human_review.controlled_handoff_human_professional_approval_reviewer_authority_evidence",
    contract_version: "1.0.0",
    reviewer_authority_evidence_ref: "rae_demo_authority_001",
    approval_ref: "apr_demo_approval_001",
    review_session_ref: "rvs_demo_session_001",
    reviewer_ref: "rvr_demo_reviewer_001",
    reviewer_role: "PROFESSIONAL_REVIEWER",
    role_permission_binding_evidence_ref: "role_binding_demo_001",
    binding_issuer_ref: "issuer_demo_001",
    binding_provenance_ref: "provenance_demo_001",
    binding_lifecycle_posture: "REVIEWER_AUTHORITY_BINDING_DECLARED_ACTIVE",
    verification_posture: "NOT_VERIFIED_BY_CONTRACT",
    human_professional_review_required: true,
  };

  const result =
    validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerAuthorityEvidence(
      candidate,
    );

  assert.deepEqual(result, {
    valid: false,
    contractKind:
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors: [
      {
        code: "required_field_missing",
        path: "$.role_permission_policy_evidence_ref",
      },
    ],
  });
  assert.ok(Object.isFrozen(result));
  assert.ok(Object.isFrozen(result.errors));
  assert.ok(Object.isFrozen(result.errors[0]));
});

test("inactive scenes are hidden and the final scene remains active at 90 seconds", () => {
  assert.equal((demo.match(/<section class="scene"[^>]*aria-hidden="true" hidden>/g) ?? []).length, 5);
  assert.ok(demo.includes("const isFinalFrame = t === TOTAL && b === TOTAL;"));
  assert.ok(demo.includes("el.hidden = !isActive;"));
  assert.ok(demo.includes('el.setAttribute("aria-hidden", String(!isActive));'));
  assert.match(demo, /\.scene\.on \{[\s\S]*?pointer-events: auto;[\s\S]*?\}/);
});

test("subtitle and clock updates are de-duplicated and progress is exposed", () => {
  assert.ok(demo.includes('role="progressbar"'));
  assert.ok(demo.includes('aria-valuemin="0"'));
  assert.ok(demo.includes('aria-valuemax="90"'));
  assert.ok(demo.includes('if (sub.textContent !== nextLine) sub.textContent = nextLine;'));
  assert.ok(demo.includes('if (clock.textContent !== nextClock) clock.textContent = nextClock;'));
  assert.ok(demo.includes('setAttribute("aria-valuenow", String(Math.floor(t)))'));
});

test("demo contains no networked runtime or local persistence surface", () => {
  const forbiddenRuntimeTokens = [
    "fetch(",
    "XMLHttpRequest",
    "WebSocket",
    "EventSource",
    "localStorage",
    "sessionStorage",
    "sendBeacon",
    "serviceWorker",
    "document.cookie",
  ];

  for (const token of forbiddenRuntimeTokens) {
    assert.equal(demo.includes(token), false, `unexpected public demo capability: ${token}`);
  }
});

test("demo identity and README entry point are exact and non-placeholder", () => {
  assert.equal((demo.match(new RegExp(repositoryUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? []).length, 2);
  assert.ok(readme.includes(`[View the 90-second synthetic fail-closed animatic](${pagesUrl}).`));

  for (const forbidden of [
    "your-org",
    "example.com",
    "file://",
    "localhost",
  ]) {
    assert.equal(demo.includes(forbidden), false, `unexpected demo placeholder or local URL: ${forbidden}`);
    assert.equal(readme.includes(forbidden), false, `unexpected README placeholder or local URL: ${forbidden}`);
  }
});

test("README does not overclaim what the demonstrator proves", () => {
  const demoSection = readme.slice(
    readme.indexOf("## Synthetic demo"),
    readme.indexOf("## Repository layout"),
  );
  const normalized = demoSection.replace(/\s+/g, " ");

  assert.ok(normalized.includes("fabricated input"));
  assert.ok(normalized.includes("not a live case or a deployed product"));
  assert.ok(normalized.includes("does not prove runtime completeness"));
  assert.ok(normalized.includes("verify reviewer authority"));
  assert.ok(normalized.includes("make a legal or evidentiary conclusion"));
  assert.ok(normalized.includes("authorize processing of real private material"));
  assert.ok(normalized.includes("Human and professional judgment remains outside the automation boundary."));
});
