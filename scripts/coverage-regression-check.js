const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const baselinePath = process.env.JEST_COVERAGE_BASELINE_PATH || path.join(root, 'docs/superpowers/plans/jest-coverage-baseline.json');
const summaryPath = path.join(root, 'coverage/jest/coverage-summary.json');

if (!fs.existsSync(baselinePath)) {
  throw new Error(`Coverage baseline not found: ${baselinePath}`);
}

if (!fs.existsSync(summaryPath)) {
  throw new Error(`Jest coverage summary not found: ${summaryPath}`);
}

const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));

const tolerance = typeof baseline.tolerancePct === 'number' ? baseline.tolerancePct : 0.3;
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
  process.stderr.write(`Jest coverage regression check failed (tolerance ${tolerance.toFixed(2)}%).\n`);
  for (const failure of failures) {
    process.stderr.write(
      `- ${failure.metric}: current ${failure.currentValue.toFixed(2)} < allowed ${failure.minAllowed.toFixed(2)} (baseline ${failure.baselineValue.toFixed(2)})\n`
    );
  }
  process.exit(1);
}

process.stdout.write(`Jest coverage regression check passed (tolerance ${tolerance.toFixed(2)}%).\n`);
for (const metric of metrics) {
  const baselineValue = baseline.jest[metric];
  const currentValue = summary.total[metric].pct;
  process.stdout.write(`- ${metric}: baseline ${baselineValue.toFixed(2)} -> current ${currentValue.toFixed(2)}\n`);
}
