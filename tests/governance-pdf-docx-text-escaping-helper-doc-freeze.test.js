const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const governanceIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "governance", "src", "index.js"),
  "utf8",
);

function collectCrossFunctionCallSites(sourceText, calleeName) {
  const lines = sourceText.split("\n");
  let currentFunction = null;
  const callSites = [];

  for (let index = 0; index < lines.length; index += 1) {
    const functionMatch = lines[index].match(/^function\s+([A-Za-z0-9_]+)\s*\(/);
    if (functionMatch) {
      currentFunction = functionMatch[1];
    }

    if (
      lines[index].includes(`${calleeName}(`) &&
      !lines[index].startsWith(`function ${calleeName}(`)
    ) {
      callSites.push({ fn: currentFunction, line: index + 1 });
    }
  }

  return callSites;
}

test("docs freeze the shared governance PDF/DOCX text-escaping helper seam as the escaping boundary", () => {
  assert.match(
    docsText,
    /Shared Governance PDF\/DOCX Text-Escaping Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/governance\/src\/index\.js` PDF\/DOCX text-escaping helper seam centered on `escapePdfText` and `escapeXmlText` is the canonical internal governance-side text escaping boundary/i,
  );
  assert.match(
    docsText,
    /currently evidenced governed surfaces in this freeze are limited to:\s+`export_package_pdf_artifact` PDF text escaping where `buildMinimalPdfDocument\(\.\.\.\)` wraps escaped line text into PDF text operators\s+`export_package_docx_artifact` XML text escaping where `buildMinimalDocxDocument\(\.\.\.\)` wraps escaped line text into DOCX XML paragraph text nodes/i,
  );
  assert.match(
    docsText,
    /`escapePdfText\(\.\.\.\)` escaping backslash, open parenthesis, close parenthesis, carriage return, and newline characters before text is inserted into the current minimal PDF content stream/i,
  );
  assert.match(
    docsText,
    /`escapeXmlText\(\.\.\.\)` escaping ampersand, less-than, greater-than, double-quote, and single-quote characters before text is inserted into the current minimal DOCX XML document body/i,
  );
  assert.match(
    docsText,
    /current bounded runtime reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one `escapePdfText\(\.\.\.\)` call site inside `buildMinimalPdfDocument\(\.\.\.\)` and one `escapeXmlText\(\.\.\.\)` call site inside `buildMinimalDocxDocument\(\.\.\.\)`/i,
  );
  assert.match(
    docsText,
    /closed PDF\/DOCX content-assembly seam remains outside this narrower escaping helper seam because `chunkPdfText`, `buildMinimalPdfDocument`, `chunkDocxText`, and `buildMinimalDocxDocument` own chunking and document assembly/i,
  );
  assert.match(
    docsText,
    /`chunkPdfText`, `buildMinimalPdfDocument`, `chunkDocxText`, and `buildMinimalDocxDocument` are bounded consumers or neighboring helpers for this freeze, not members of the text-escaping helper seam/i,
  );
  assert.match(
    docsText,
    /shared stored-ZIP helper seam remains outside this helper seam because ZIP container assembly is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /shared canonical-JSON helper seam remains outside this helper seam because stable JSON serialization may provide source text for artifact bodies but does not define PDF text escaping or XML text escaping/i,
  );
  assert.match(
    docsText,
    /export-package artifact derivation, projection, adapter-dispatch, database persistence, API route, parser\/auth\/response-helper, and broader governance\/runtime behavior remain outside this helper seam/i,
  );
  assert.match(
    docsText,
    /future governance-side PDF\/DOCX text escaping for the same content-assembly responsibilities should extend the existing `escapePdfText` \/ `escapeXmlText` seam instead of moving escaping into chunking helpers, document assembly helpers, artifact derivation\/projection helpers, route handlers, database persistence, or broader runtime orchestration/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, escaping semantics, content-assembly semantics, artifact semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function escapePdfText\(value\) \{\s*return value\s*\.replace\(\/\\\\\/g, "\\\\\\\\"\)\s*\.replace\(\/\\\(\/g, "\\\\\("\)\s*\.replace\(\/\\\)\/g, "\\\\\)"\)\s*\.replace\(\/\\r\/g, "\\\\r"\)\s*\.replace\(\/\\n\/g, "\\\\n"\);\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function escapeXmlText\(value\) \{\s*return value\s*\.replace\(\/&\/g, "&amp;"\)\s*\.replace\(\/<\/g, "&lt;"\)\s*\.replace\(\/>\/g, "&gt;"\)\s*\.replace\(\/"\/g, "&quot;"\)\s*\.replace\(\/'\/g, "&apos;"\);\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function buildMinimalPdfDocument\(lines\) \{[\s\S]*contentLines\.push\(`\(\$\{escapePdfText\(line\)\}\) Tj`\);[\s\S]*\}/,
  );
  assert.match(
    governanceIndexText,
    /function buildMinimalDocxDocument\(lines\) \{[\s\S]*`<w:p><w:r><w:t xml:space="preserve">\$\{escapeXmlText\(chunk\)\}<\/w:t><\/w:r><\/w:p>`,[\s\S]*\}/,
  );

  assert.equal(
    (governanceIndexText.match(/function escapePdfText\(/g) || []).length,
    1,
  );
  assert.equal(
    (governanceIndexText.match(/function escapeXmlText\(/g) || []).length,
    1,
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, "escapePdfText").map(
      (entry) => entry.fn,
    ),
    ["buildMinimalPdfDocument"],
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, "escapeXmlText").map(
      (entry) => entry.fn,
    ),
    ["buildMinimalDocxDocument"],
  );

  const moduleExports = governanceIndexText.slice(
    governanceIndexText.indexOf("module.exports = {"),
  );
  assert.doesNotMatch(moduleExports, /\bescapePdfText\b/);
  assert.doesNotMatch(moduleExports, /\bescapeXmlText\b/);
});
