const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const baselinePath =
  process.env.JEST_COVERAGE_BASELINE_PATH ||
  path.join(root, 'scripts/coverage/jest-coverage-baseline.json');
const summaryPath = path.join(root, 'coverage/jest/coverage-summary.json');

if (!fs.existsSync(summaryPath)) {
  throw new Error(`Jest coverage summary not found: ${summaryPath}`);
}

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
const defaultBaseline = {
  generatedAt: '2026-03-13T08:21:13.857Z',
  source: 'coverage-all',
  tolerancePct: 0.3,
  jest: {
    lines: 91.98,
    statements: 91.98,
    functions: 85.77,
    branches: 92.46,
  },
};

let baseline;
if (process.env.JEST_COVERAGE_BASELINE_JSON) {
  baseline = JSON.parse(process.env.JEST_COVERAGE_BASELINE_JSON);
} else if (fs.existsSync(baselinePath)) {
  baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
} else {
  baseline = defaultBaseline;
  process.stdout.write(
    `Coverage baseline not found at ${baselinePath}; using built-in baseline from ${defaultBaseline.generatedAt}.\n`
  );
}

const tolerance =
  typeof baseline.tolerancePct === 'number' ? baseline.tolerancePct : 0.3;
const metrics = ['lines', 'statements', 'functions', 'branches'];
const failures = [];

for (const metric of metrics) {
  const baselineValue = baseline.jest[metric];
  const currentValue = summary.total[metric].pct;
  const minAllowed = baselineValue - tolerance;

  if (currentValue < minAllowed) {
    failures.push({ metric, baselineValue, currentValue, minAllowed });
  }
}

if (failures.length > 0) {
  process.stderr.write(
    `Jest coverage regression check failed (tolerance ${tolerance.toFixed(2)}%).\n`
  );
  for (const failure of failures) {
    process.stderr.write(
      `- ${failure.metric}: current ${failure.currentValue.toFixed(2)} < allowed ${failure.minAllowed.toFixed(2)} (baseline ${failure.baselineValue.toFixed(2)})\n`
    );
  }
  process.exit(1);
}

process.stdout.write(
  `Jest coverage regression check passed (tolerance ${tolerance.toFixed(2)}%).\n`
);
for (const metric of metrics) {
  const baselineValue = baseline.jest[metric];
  const currentValue = summary.total[metric].pct;
  process.stdout.write(
    `- ${metric}: baseline ${baselineValue.toFixed(2)} -> current ${currentValue.toFixed(2)}\n`
  );
}
