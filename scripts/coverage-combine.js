const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const coverageDir = path.join(root, 'coverage');
const jestSummaryCandidates = [
  path.join(coverageDir, 'jest', 'coverage-summary.json'),
  path.join(root, 'tests', 'coverage', 'jest', 'coverage-summary.json'),
];
const avaSummaryCandidates = [
  path.join(coverageDir, 'ava', 'coverage-summary.json'),
  path.join(root, 'tests', 'coverage', 'ava', 'coverage-summary.json'),
];
const combinedJsonPath = path.join(coverageDir, 'combined-summary.json');
const combinedMdPath = path.join(coverageDir, 'combined-summary.md');
const historyPath = path.join(coverageDir, 'history.jsonl');

function readSummary(candidates, key, required = true) {
  const filePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!filePath) {
    if (!required) {
      return null;
    }
    throw new Error(
      `${key} summary not found in any of: ${candidates.join(', ')}`
    );
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data.total) {
    throw new Error(`${key} summary at ${filePath} is missing total coverage`);
  }
  return data.total;
}

function pickMetrics(total) {
  return {
    lines: total.lines.pct,
    statements: total.statements.pct,
    functions: total.functions.pct,
    branches: total.branches.pct,
  };
}

function main() {
  fs.mkdirSync(coverageDir, { recursive: true });

  const jest = pickMetrics(readSummary(jestSummaryCandidates, 'Jest'));
  const avaSummary = readSummary(avaSummaryCandidates, 'Ava', false);
  const ava = avaSummary ? pickMetrics(avaSummary) : null;
  const timestamp = new Date().toISOString();

  const combined = {
    generatedAt: timestamp,
    suites: { ava, jest },
  };

  fs.writeFileSync(combinedJsonPath, JSON.stringify(combined, null, 2));

  const markdown = [
    '# Combined Coverage Summary',
    '',
    `Generated: ${timestamp}`,
    '',
    '| Suite | Lines | Statements | Functions | Branches |',
    '| --- | ---: | ---: | ---: | ---: |',
    ava
      ? `| Ava | ${ava.lines.toFixed(2)}% | ${ava.statements.toFixed(2)}% | ${ava.functions.toFixed(2)}% | ${ava.branches.toFixed(2)}% |`
      : '| Ava | N/A | N/A | N/A | N/A |',
    `| Jest | ${jest.lines.toFixed(2)}% | ${jest.statements.toFixed(2)}% | ${jest.functions.toFixed(2)}% | ${jest.branches.toFixed(2)}% |`,
    '',
  ].join('\n');
  fs.writeFileSync(combinedMdPath, markdown);

  const historyEntry = {
    generatedAt: timestamp,
    ava,
    jest,
  };
  fs.appendFileSync(historyPath, `${JSON.stringify(historyEntry)}\n`);

  process.stdout.write(`Wrote ${combinedJsonPath}\n`);
  process.stdout.write(`Wrote ${combinedMdPath}\n`);
  process.stdout.write(`Appended ${historyPath}\n`);
}

main();
