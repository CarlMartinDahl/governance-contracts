const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const { readFileSync } = require("node:fs");
const test = require("node:test");

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const packageLock = JSON.parse(readFileSync("package-lock.json", "utf8"));
const read = (path) => readFileSync(path, "utf8");
const compact = (value) => value.replace(/\s+/g, " ").trim();

test("public package identity and license stay explicit", () => {
  assert.equal(packageJson.name, "governance-contracts");
  assert.equal(packageJson.private, true);
  assert.equal(packageJson.license, "Apache-2.0");
  assert.equal(
    packageJson.description,
    "Fail-closed governance contracts and testable foundations for human review workflows.",
  );
  assert.equal(packageLock.name, packageJson.name);
  assert.equal(packageLock.packages[""].license, packageJson.license);
});

test("Apache License 2.0 is present as the governing source license", () => {
  const license = read("LICENSE");
  assert.match(compact(license), /^Apache License Version 2\.0, January 2004/);
  assert.match(license, /http:\/\/www\.apache\.org\/licenses\//);
  assert.match(license, /END OF TERMS AND CONDITIONS/);
});

test("public security and conduct reports use private vulnerability reporting", () => {
  const privateReportUrl =
    "https://github.com/CarlMartinDahl/governance-contracts/security/advisories/new";
  const security = read("SECURITY.md");
  const conduct = read("CODE_OF_CONDUCT.md");

  assert.match(
    compact(security),
    /Only the current `main` branch receives security updates/,
  );
  assert.ok(security.includes(privateReportUrl));
  assert.ok(conduct.includes(privateReportUrl));
  assert.match(conduct, /Contributor Covenant, version 2\.1/);
});

test("README and support policy preserve the fresh-root public boundary", () => {
  const readme = read("README.md");
  const support = read("SUPPORT.md");

  const compactReadme = compact(readme);
  assert.match(compactReadme, /begins with a fresh public root commit/);
  assert.match(compactReadme, /Private development history/);
  assert.match(compactReadme, /launch strategy/);
  assert.match(readme, /Apache License 2\.0/);
  assert.match(readme, /SECURITY\.md/);
  assert.match(support, /smallest synthetic example/);
  assert.match(support, /private route in \[SECURITY\.md\]/);
});

test("public contribution surfaces require the complete validation set", () => {
  const contributing = read("CONTRIBUTING.md");
  const pullRequestTemplate = read(".github/pull_request_template.md");

  for (const command of [
    "npm test",
    "npm run lint",
    "npm run build",
    "npm run release:scan",
  ]) {
    assert.ok(contributing.includes(command), command);
    assert.ok(pullRequestTemplate.includes(command), command);
  }
});

test("public candidate inventory excludes private recovery surfaces", () => {
  const candidateFiles = execFileSync(
    "git",
    ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
    { encoding: "utf8" },
  )
    .split("\0")
    .filter(Boolean);
  const privateRecoveryPattern =
    /(?:batch-recovery|github-publication-mode|review-repair-replacement-inventory)/i;

  assert.deepEqual(
    candidateFiles.filter((filePath) => privateRecoveryPattern.test(filePath)),
    [],
  );
});
