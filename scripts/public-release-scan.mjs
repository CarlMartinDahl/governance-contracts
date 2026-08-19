import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const forbiddenPhraseHashes = new Map([
  ["3e45debc67c8b425b1c17768f7f075b28bd142be7784173490c58c0ac136bc39", Object.freeze({ length: 33, rule: "forbidden-private-prompt-name" })],
  ["43edb8e55df6559bfb1bb18e8690a183efbf847789204aad359054cfbe8ba567", Object.freeze({ length: 36, rule: "recipient-timeline" })],
  ["ac3d050c7177756ba0765b475d5c8ab731fdd98f421b8934c9b03bfd8139f018", Object.freeze({ length: 27, rule: "confidential-review-lineage" })],
  ["24964a2764be8975c0958a4fa05e4040f9f76adb6f50bb8e290349ecc31f7a5f", Object.freeze({ length: 4, rule: "private-recipient-name" })],
  ["cde48537ca2c28084ff560826d0e6388b7c57a51497a6cb56f397289e52ff41b", Object.freeze({ length: 6, rule: "recipient-alias" })],
  ["a8f9ae2af650bc40ddd249e546b836f9c70ec419ba75cfde5c8b2a6c0e4817e3", Object.freeze({ length: 5, rule: "private-message-history-family" })],
  ["48dccde33cfaa3dfc415fcd17f458328dc7b4a9304b927e5e02f6f58a7caff28", Object.freeze({ length: 9, rule: "private-case-label" })],
  ["38ff39fc4c50de64a1adf8140c7fb8db3733abc5c770472560a191fd54f233e1", Object.freeze({ length: 10, rule: "private-case-label" })],
  ["c5a2434ada11217a29c511ad4e6374d271729c7f4b2baae2d8cabf056390afb0", Object.freeze({ length: 12, rule: "private-context-name" })],
  ["e6ca4918a9f4cefe412d601b5d3ee4a21697dcaaca35ef971db5a5ce605a38e9", Object.freeze({ length: 7, rule: "private-context-name" })],
  ["a03b2c8e11816c151e89694c6c396bc0740dc93370cc69d02918d1218ea791c9", Object.freeze({ length: 11, rule: "private-context-name" })],
  ["0593595b09dd9628fa8210d6e88e1c101bbf7b945b4fe80b173e8db646b57c4f", Object.freeze({ length: 9, rule: "private-context-name" })],
  ["6bab3007f56e2a9175ff1222c2654ddcd08fa7981a1ddc42f1d95cfbd80ede47", Object.freeze({ length: 5, rule: "private-person-name" })],
  ["8a81e9a2dbdc9ccf4ac5091a8a3458b529de766c3320138cf1f9708e537afb01", Object.freeze({ length: 7, rule: "private-person-name" })],
  ["34550715062af006ac4fab288de67ecb44793c3a05c475227241535f6ef7a81b", Object.freeze({ length: 7, rule: "private-person-name" })],
  ["e79c3c5a7576615cb33d16ff3da7b159a9aae26152fcb8d8e2840e6310b5a593", Object.freeze({ length: 7, rule: "private-person-name" })],
  ["1e0654d5489a27e44800fb4c47780b1242cbc37105b500cd97a55e08e60df5bd", Object.freeze({ length: 14, rule: "private-person-name" })],
  ["f0409d86b4106b4acb5aaa87c95958b5b973efe07ce5c38ecf4a4bdafc62921f", Object.freeze({ length: 14, rule: "legacy-project-identity" })],
]);

const sensitiveExtensions = new Set([
  ".7z",
  ".db",
  ".docx",
  ".env",
  ".gif",
  ".gz",
  ".jpeg",
  ".jpg",
  ".key",
  ".p12",
  ".pdf",
  ".pem",
  ".pfx",
  ".png",
  ".pptx",
  ".sqlite",
  ".tar",
  ".webp",
  ".zip",
]);

const textRules = [
  {
    id: "absolute-macos-user-path",
    pattern: /\/Users\/[A-Za-z0-9._-]+\//,
  },
  {
    id: "absolute-windows-user-path",
    pattern: /[A-Za-z]:\\Users\\[^\\\s]+\\/i,
  },
  {
    id: "icloud-local-path",
    pattern: /Library\/Mobile Documents\//i,
  },
  {
    id: "email-address",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  },
  {
    id: "swedish-personal-identity-number",
    pattern: /\b(?:19|20)?\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[-+]?\d{4}\b/,
  },
  {
    id: "private-key",
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  },
  {
    id: "github-token",
    pattern: /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/,
  },
  {
    id: "aws-access-key",
    pattern: /\bAKIA[0-9A-Z]{16}\b/,
  },
  {
    id: "assigned-secret",
    pattern: /\b(?:api[_-]?key|client[_-]?secret|password|access[_-]?token)[ \t]*[:=][ \t]*["'](?=[^"'\r\n]{8,}["'])(?=[^"'\r\n]*\d)[A-Za-z0-9_./+=-]+["']/i,
  },
];

export function scanPath(filePath, denylist = forbiddenPhraseHashes) {
  const findings = [];
  const basename = filePath.split("/").at(-1) ?? filePath;
  const lower = basename.toLowerCase();

  if (sensitiveExtensions.has(extname(lower)) || lower === ".env") {
    findings.push("sensitive-file-extension");
  }

  return [...new Set([...findings, ...scanHashedPhrases(filePath, denylist)])];
}

export function scanText(text) {
  const findings = textRules
    .filter(({ pattern }) => pattern.test(text))
    .map(({ id }) => id);

  return [...new Set([...findings, ...scanHashedPhrases(text)])];
}

export function hashPhrase(value) {
  return createHash("sha256").update(value.toLowerCase()).digest("hex");
}

export function getDefaultHashedPhraseRules() {
  return new Map(forbiddenPhraseHashes);
}

function identifierSegments(text) {
  const tokens = text.match(/[\p{L}\p{N}]+/gu) ?? [];
  return tokens.flatMap((token) =>
    token
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.toLowerCase()),
  );
}

export function scanHashedPhrases(text, denylist = forbiddenPhraseHashes) {
  const words = identifierSegments(text);
  const findings = new Set();
  const lengths = new Set([...denylist.values()].map(({ length }) => length));
  const maximumLength = Math.max(0, ...lengths);

  for (let start = 0; start < words.length; start += 1) {
    let candidate = "";
    for (let end = start; end < words.length; end += 1) {
      candidate += words[end];
      if (candidate.length > maximumLength) {
        break;
      }
      if (!lengths.has(candidate.length)) {
        continue;
      }

      const match = denylist.get(hashPhrase(candidate));
      if (match?.length === candidate.length) {
        findings.add(match.rule);
      }
    }
  }

  return [...findings];
}

export function listCandidateFiles() {
  const output = execFileSync(
    "git",
    ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
    { encoding: "buffer" },
  );

  return output
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .sort();
}

export function scanRepository() {
  const findings = [];

  for (const filePath of listCandidateFiles()) {
    const stat = lstatSync(filePath);
    if (stat.isSymbolicLink()) {
      findings.push({ filePath, rule: "symbolic-link" });
      continue;
    }

    for (const rule of scanPath(filePath)) {
      findings.push({ filePath, rule });
    }

    const content = readFileSync(filePath);
    if (content.includes(0)) {
      findings.push({ filePath, rule: "unexpected-binary-content" });
      continue;
    }

    for (const rule of scanText(content.toString("utf8"))) {
      findings.push({ filePath, rule });
    }
  }

  return findings;
}

function main() {
  const findings = scanRepository();

  if (findings.length > 0) {
    console.error("Public release scan failed:");
    for (const { filePath, rule } of findings) {
      console.error(`- ${filePath}: ${rule}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Public release scan passed for ${listCandidateFiles().length} files.`);
}

const entryPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (entryPath === fileURLToPath(import.meta.url)) {
  main();
}
