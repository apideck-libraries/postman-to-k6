const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const testsDir = path.join(root, 'tests');

const patterns = [
  { name: 'AVA import', regex: /import\s+test\s+from\s+['"]ava['"]/ },
  { name: 'AVA serial', regex: /\btest\.serial\s*\(/ },
  {
    name: 'AVA assertion API',
    regex:
      /\bt\.(is|deepEqual|throws|notThrows|true|false|pass|fail|plan)\s*\(/,
  },
  { name: 'mock-require usage', regex: /mock-require|\bmockRequire\s*\(/ },
];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(fullPath));
      continue;
    }
    if (fullPath.endsWith('.test.js')) {
      out.push(fullPath);
    }
  }
  return out;
}

const violations = [];

for (const filePath of walk(testsDir)) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//')) {
      return;
    }
    for (const pattern of patterns) {
      if (pattern.regex.test(line)) {
        violations.push({
          file: path.relative(root, filePath),
          line: index + 1,
          name: pattern.name,
          source: trimmed,
        });
      }
    }
  });
}

if (violations.length > 0) {
  process.stderr.write('Native Jest guard failed. Found forbidden patterns:\n');
  for (const item of violations) {
    process.stderr.write(
      `- ${item.file}:${item.line} [${item.name}] ${item.source}\n`
    );
  }
  process.exit(1);
}

process.stdout.write('Native Jest guard passed.\n');
