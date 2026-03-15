const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const avaRoot = path.join(root, 'test');
const jestRoot = path.join(root, 'tests');
const defaultAllowlistPath = path.join(
  root,
  'scripts',
  'coverage',
  'parity-allowlist.json'
);
const defaultOutputPath = path.join(root, 'coverage', 'parity-inventory.json');

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'coverage',
  'tmp',
  '.worktrees',
]);

function walk(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) {
        continue;
      }
      out.push(...walk(fullPath));
      continue;
    }
    out.push(fullPath);
  }
  return out;
}

function collectCases(baseDir, matcher, parser) {
  const files = walk(baseDir).filter((filePath) => matcher.test(filePath));
  const cases = new Set();

  for (const filePath of files) {
    const relPath = path
      .relative(baseDir, filePath)
      .replace(parser.pathStrip, parser.pathReplace);
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = new RegExp(parser.caseRegex.source, parser.caseRegex.flags);

    let match = regex.exec(content);
    while (match !== null) {
      cases.add(`${relPath} :: ${match[2]}`);
      match = regex.exec(content);
    }
  }

  return cases;
}

function setDiff(left, right) {
  return [...left].filter((item) => !right.has(item));
}

function readAllowlist(allowlistPath) {
  if (!fs.existsSync(allowlistPath)) {
    return {
      expectedAvaCases: null,
      expectedJestCases: null,
      missingInJest: [],
      extraInJest: [],
    };
  }
  const parsed = JSON.parse(fs.readFileSync(allowlistPath, 'utf8'));
  return {
    expectedAvaCases:
      Number.isInteger(parsed.expectedAvaCases) && parsed.expectedAvaCases >= 0
        ? parsed.expectedAvaCases
        : null,
    expectedJestCases:
      Number.isInteger(parsed.expectedJestCases) &&
      parsed.expectedJestCases >= 0
        ? parsed.expectedJestCases
        : null,
    missingInJest: Array.isArray(parsed.missingInJest)
      ? parsed.missingInJest
      : [],
    extraInJest: Array.isArray(parsed.extraInJest) ? parsed.extraInJest : [],
  };
}

function buildParityInventory(options = {}) {
  const allowlistPath = options.allowlistPath || defaultAllowlistPath;
  const allowlist = readAllowlist(allowlistPath);

  const avaCases = collectCases(avaRoot, /\.js$/, {
    pathStrip: /\.js$/,
    pathReplace: '.test.js',
    caseRegex: /\btest(?:\.serial)?\(\s*(['"`])((?:\\.|(?!\1).)*)\1/g,
  });

  const jestCases = collectCases(jestRoot, /\.test\.js$/, {
    pathStrip: /\.test\.js$/,
    pathReplace: '.test.js',
    caseRegex:
      /\b(?:test|it)(?:\.only|\.skip|\.concurrent)?\(\s*(['"`])((?:\\.|(?!\1).)*)\1/g,
  });

  const missingInJest = setDiff(avaCases, jestCases).sort();
  const extraInJest = setDiff(jestCases, avaCases).sort();

  const allowMissing = new Set(allowlist.missingInJest);
  const allowExtra = new Set(allowlist.extraInJest);

  const disallowedMissingInJest = missingInJest.filter(
    (item) => !allowMissing.has(item)
  );
  const disallowedExtraInJest = extraInJest.filter(
    (item) => !allowExtra.has(item)
  );
  const totalCountRegressions = [];

  if (
    allowlist.expectedAvaCases !== null &&
    avaCases.size < allowlist.expectedAvaCases
  ) {
    totalCountRegressions.push(
      `Ava total dropped: ${avaCases.size} < expected floor ${allowlist.expectedAvaCases}`
    );
  }
  if (
    allowlist.expectedJestCases !== null &&
    jestCases.size < allowlist.expectedJestCases
  ) {
    totalCountRegressions.push(
      `Jest total dropped: ${jestCases.size} < expected floor ${allowlist.expectedJestCases}`
    );
  }

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      avaCases: avaCases.size,
      jestCases: jestCases.size,
    },
    missingInJest,
    extraInJest,
    allowlist,
    disallowedMissingInJest,
    disallowedExtraInJest,
    totalCountRegressions,
  };
}

function parseArgs(argv) {
  return {
    failOnDisallowed:
      argv.includes('--check') ||
      (!argv.includes('--report-only') && !argv.includes('--no-fail')),
    outputPath:
      argv
        .find((arg) => arg.startsWith('--output='))
        ?.slice('--output='.length) || defaultOutputPath,
    allowlistPath:
      argv
        .find((arg) => arg.startsWith('--allowlist='))
        ?.slice('--allowlist='.length) || defaultAllowlistPath,
    failOnExtra:
      argv.includes('--fail-on-extra') ||
      process.env.PARITY_FAIL_ON_EXTRA === '1',
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const inventory = buildParityInventory({ allowlistPath: args.allowlistPath });

  fs.mkdirSync(path.dirname(args.outputPath), { recursive: true });
  fs.writeFileSync(args.outputPath, JSON.stringify(inventory, null, 2));

  process.stdout.write(`Wrote ${args.outputPath}\n`);
  process.stdout.write(
    `Parity totals: Ava ${inventory.totals.avaCases}, Jest ${inventory.totals.jestCases}\n`
  );
  process.stdout.write(
    `Missing in Jest: ${inventory.missingInJest.length} (${inventory.disallowedMissingInJest.length} disallowed)\n`
  );
  process.stdout.write(
    `Extra in Jest: ${inventory.extraInJest.length} (${inventory.disallowedExtraInJest.length} disallowed)\n`
  );
  if (
    inventory.allowlist.expectedAvaCases !== null ||
    inventory.allowlist.expectedJestCases !== null
  ) {
    process.stdout.write(
      `Expected floors: Ava ${
        inventory.allowlist.expectedAvaCases ?? 'none'
      }, Jest ${inventory.allowlist.expectedJestCases ?? 'none'}\n`
    );
  }

  if (
    args.failOnDisallowed &&
    (inventory.disallowedMissingInJest.length > 0 ||
      (args.failOnExtra && inventory.disallowedExtraInJest.length > 0) ||
      inventory.totalCountRegressions.length > 0)
  ) {
    for (const regression of inventory.totalCountRegressions) {
      process.stderr.write(`${regression}\n`);
    }
    process.stderr.write('Parity inventory check failed.\n');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  buildParityInventory,
  defaultAllowlistPath,
  defaultOutputPath,
};
