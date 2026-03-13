const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');

const ALLOWLIST = new Set([]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(fullPath));
    } else {
      out.push(fullPath);
    }
  }

  return out;
}

function collectCases(baseDir, matcher, parser) {
  const files = walk(baseDir).filter((filePath) => matcher.test(filePath));
  const cases = new Set();

  for (const filePath of files) {
    const relPath = path
      .relative(root, filePath)
      .replace(parser.strip, parser.replaceWith)
      .replace(/^tests?\//, '');
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = parser.regex;
    let match = regex.exec(content);
    while (match !== null) {
      cases.add(`${relPath} :: ${match[1]}`);
      match = regex.exec(content);
    }
  }

  return cases;
}

function setDiff(left, right) {
  return [...left].filter((item) => !right.has(item));
}

test('jest suite covers all ava test case names', () => {
  const avaCases = collectCases(path.join(root, 'test'), /\.js$/, {
    strip: /\.js$/,
    replaceWith: '.test.js',
    regex: /test(?:\.serial)?\('([^']+)'/g,
  });

  const jestCases = collectCases(path.join(root, 'tests'), /\.test\.js$/, {
    strip: /\.test\.js$/,
    replaceWith: '.test.js',
    regex: /test\('([^']+)'/g,
  });

  const missing = setDiff(avaCases, jestCases).filter(
    (item) => !ALLOWLIST.has(item)
  );
  expect(missing).toEqual([]);
});
