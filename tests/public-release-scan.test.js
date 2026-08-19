const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

async function loadScanner() {
  return import("../scripts/public-release-scan.mjs");
}

test("public release scanner accepts ordinary contract text", async () => {
  const { scanText } = await loadScanner();
  assert.deepEqual(scanText("Fail closed and require human review."), []);
});

test("public release scanner supports hash-only phrase denylists", async () => {
  const { hashPhrase, scanHashedPhrases } = await loadScanner();
  const marker = "syntheticmarker";
  const denylist = new Map([
    [
      hashPhrase(marker),
      { length: marker.length, rule: "synthetic-private-marker" },
    ],
  ]);

  assert.deepEqual(scanHashedPhrases("Synthetic marker", denylist), [
    "synthetic-private-marker",
  ]);
});

test("hash-only denylists detect embedded identifiers and four source fragments", async () => {
  const { hashPhrase, scanHashedPhrases, scanPath } = await loadScanner();
  const marker = "syntheticmarker";
  const denylist = new Map([
    [
      hashPhrase(marker),
      { length: marker.length, rule: "synthetic-private-marker" },
    ],
  ]);
  const embedded = "prefixSyntheticMarkerFields";
  const fragmented = '["syn", "the", "tic", "Marker"].join("")';

  assert.deepEqual(scanHashedPhrases(embedded, denylist), [
    "synthetic-private-marker",
  ]);
  assert.deepEqual(scanHashedPhrases(fragmented, denylist), [
    "synthetic-private-marker",
  ]);
  assert.deepEqual(scanPath("docs/prefixSyntheticMarkerFields.md", denylist), [
    "synthetic-private-marker",
  ]);
});

test("private prompt and alias protections are fingerprint-only in published source", async () => {
  const { getDefaultHashedPhraseRules } = await loadScanner();
  const rules = getDefaultHashedPhraseRules();
  const expectedFingerprints = new Map([
    [
      "3e45debc67c8b425b1c17768f7f075b28bd142be7784173490c58c0ac136bc39",
      { length: 33, rule: "forbidden-private-prompt-name" },
    ],
    [
      "24964a2764be8975c0958a4fa05e4040f9f76adb6f50bb8e290349ecc31f7a5f",
      { length: 4, rule: "private-recipient-name" },
    ],
    [
      "cde48537ca2c28084ff560826d0e6388b7c57a51497a6cb56f397289e52ff41b",
      { length: 6, rule: "recipient-alias" },
    ],
  ]);

  for (const [fingerprint, expected] of expectedFingerprints) {
    assert.deepEqual(rules.get(fingerprint), expected);
  }
});

test("legacy project identity protection is fingerprint-only in published source", async () => {
  const { getDefaultHashedPhraseRules } = await loadScanner();
  const rules = getDefaultHashedPhraseRules();

  assert.deepEqual(
    rules.get(
      "f0409d86b4106b4acb5aaa87c95958b5b973efe07ce5c38ecf4a4bdafc62921f",
    ),
    { length: 14, rule: "legacy-project-identity" },
  );
});

test("legacy project identity protection rejects text and paths without publishing the identity", async () => {
  const { scanPath, scanText } = await loadScanner();
  const legacyIdentity = String.fromCharCode(
    106,
    117,
    114,
    105,
    100,
    105,
    115,
    107,
    109,
    111,
    100,
    101,
    108,
    108,
  );

  assert.deepEqual(scanText(legacyIdentity), ["legacy-project-identity"]);
  assert.deepEqual(scanPath(`docs/${legacyIdentity}.md`), [
    "legacy-project-identity",
  ]);
});

test("public release scanner detects local paths without embedding one", async () => {
  const { scanText } = await loadScanner();
  const localPath = ["/", "Users", "/", "example-user", "/", "private"].join("");
  assert.ok(scanText(localPath).includes("absolute-macos-user-path"));
});

test("the complete working candidate passes its release scan", () => {
  const result = spawnSync(process.execPath, ["scripts/public-release-scan.mjs"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Public release scan passed/);
});
