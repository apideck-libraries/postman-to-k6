const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

const repoRoot = path.resolve(__dirname, '../..');
const cliPath = path.join(repoRoot, 'bin/postman-to-k6.js');

test('cli displays help', () => {
  const result = spawnSync(process.execPath, [cliPath, '--help'], {
    encoding: 'utf8',
  });

  expect(result.status).toBe(0);
  expect(result.stdout).toContain('Usage: postman-to-k6 <path> [options]');
  expect(result.stdout).toContain('--cli-options-file <path>');
});

test('cli displays the package version', () => {
  const result = spawnSync(process.execPath, [cliPath, '--version'], {
    encoding: 'utf8',
  });

  expect(result.status).toBe(0);
  expect(result.stdout.trim()).toBe(require('../../package.json').version);
});

test('cli reports a missing collection path', () => {
  const result = spawnSync(process.execPath, [cliPath], { encoding: 'utf8' });

  expect(result.status).toBe(0);
  expect(result.stderr).toContain('Provide path to Postman collection');
});

test('cli rejects excess collection paths', () => {
  const inputPath = path.join(repoRoot, 'test/material/2/minimal.json');
  const result = spawnSync(process.execPath, [cliPath, inputPath, inputPath], {
    encoding: 'utf8',
  });

  expect(result.status).toBe(1);
  expect(result.stderr).toContain('too many arguments');
});

test.each(['options before path', 'dash-prefixed path after --'])(
  'cli accepts %s',
  (mode) => {
    const tempDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'postman-to-k6-path-')
    );
    const outputPath = path.join(tempDir, 'generated.js');
    const inputPath = path.join(repoRoot, 'test/material/2/request.json');
    const args = [cliPath, '-o', outputPath];

    try {
      if (mode === 'options before path') {
        args.push(inputPath);
      } else {
        fs.copyFileSync(inputPath, path.join(tempDir, '-collection.json'));
        args.push('--', '-collection.json');
      }
      execFileSync(process.execPath, args, { cwd: tempDir, stdio: 'pipe' });
      expect(fs.readFileSync(outputPath, 'utf8')).toContain(
        'export default function()'
      );
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
);

test.each(['missing', 'malformed'])('cli rejects %s options files', (mode) => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'postman-to-k6-error-')
  );
  const optionsPath = path.join(tempDir, 'options.json');
  const inputPath = path.join(repoRoot, 'test/material/2/minimal.json');

  try {
    if (mode === 'malformed') {
      fs.writeFileSync(optionsPath, '{invalid json');
    }
    const result = spawnSync(
      process.execPath,
      [cliPath, inputPath, '--cli-options-file', optionsPath],
      { cwd: tempDir, encoding: 'utf8' }
    );
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('postman-to-k6 CLI options error');
    expect(result.stderr).toContain(optionsPath);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test.each([
  ['--unknown-option', "unknown option '--unknown-option'"],
  ['--output', 'argument missing'],
])('cli rejects invalid option %s', (flag, message) => {
  const result = spawnSync(process.execPath, [cliPath, flag], {
    encoding: 'utf8',
  });

  expect(result.status).toBe(1);
  expect(result.stderr).toContain(message);
});

test('cli writes to stdout and keeps pre-request scripts by default', () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'postman-to-k6-stdout-')
  );
  const inputPath = path.join(repoRoot, 'test/material/2/pre-request.json');

  try {
    const output = execFileSync(process.execPath, [cliPath, inputPath], {
      cwd: tempDir,
      encoding: 'utf8',
    });

    expect(output).toContain('export default function()');
    expect(output).toContain('pre() {');
    expect(fs.existsSync(path.join(tempDir, 'libs/shim/core.js'))).toBe(true);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test.each(['none', 'iterations', 'skip-pre'])(
  'cli applies options-file settings with CLI override: %s',
  (override) => {
    const tempDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'postman-to-k6-options-')
    );
    const outputPath = path.join(tempDir, 'generated.js');
    const optionsPath = path.join(tempDir, 'options.json');
    const inputPath = path.join(repoRoot, 'test/material/2/pre-request.json');
    fs.writeFileSync(
      optionsPath,
      JSON.stringify({
        output: outputPath,
        iterations: 3,
        'skip-pre': override !== 'skip-pre',
      })
    );

    try {
      const args = [cliPath, inputPath, '--cli-options-file', optionsPath];
      if (override === 'iterations') {
        args.push('--iterations', '7');
      } else if (override === 'skip-pre') {
        args.push('--skip-pre');
      }
      execFileSync(process.execPath, args, { cwd: tempDir, stdio: 'pipe' });

      const output = fs.readFileSync(outputPath, 'utf8');
      expect(output).toContain(
        `iterations: ${override === 'iterations' ? '"7"' : 3}`
      );
      expect(output).not.toContain('pre() {');
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
);

test('cli applies boolean flags and writes separate request files', () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'postman-to-k6-flags-')
  );
  const outputPath = path.join(tempDir, 'generated.js');
  const inputPath = path.join(repoRoot, 'test/material/2/pre-request.json');

  try {
    execFileSync(
      process.execPath,
      [
        cliPath,
        inputPath,
        '-o',
        outputPath,
        '--skip-pre',
        '--separate',
        '-i',
        '5',
      ],
      { cwd: tempDir, stdio: 'pipe' }
    );

    const output = fs.readFileSync(outputPath, 'utf8');
    expect(output).toContain('iterations: "5"');
    expect(output).toContain('./requests/');
    const requestsDir = path.join(tempDir, 'requests');
    const requestFiles = listRelativeFiles(requestsDir);
    expect(requestFiles.length).toBeGreaterThan(0);
    for (const file of requestFiles) {
      expect(
        fs.readFileSync(path.join(requestsDir, file), 'utf8')
      ).not.toContain('pre() {');
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

function listRelativeFiles(rootDir) {
  const files = [];
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const entryPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      for (const child of listRelativeFiles(entryPath)) {
        files.push(path.join(entry.name, child));
      }
      continue;
    }
    files.push(entry.name);
  }
  return files.sort();
}

test('cli output includes libs, shim core, and vendor files', () => {
  const repoRoot = path.resolve(__dirname, '../..');
  const cliPath = path.resolve(repoRoot, 'bin/postman-to-k6.js');
  const inputPath = path.resolve(repoRoot, 'test/material/2/minimal.json');
  const sourceShimDir = path.join(repoRoot, 'lib/shim');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'postman-to-k6-cli-'));
  const outputPath = path.join(tempDir, 'generated.js');
  const generatedShimDir = path.join(tempDir, 'libs/shim');

  try {
    execFileSync(process.execPath, [cliPath, inputPath, '-o', outputPath], {
      cwd: repoRoot,
      stdio: 'pipe',
    });

    expect(fs.existsSync(path.join(tempDir, 'libs'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'libs/shim/core.js'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'libs/urijs.js'))).toBe(true);
    expect(fs.existsSync(outputPath)).toBe(true);

    const ignored = new Set(['faker.js']);
    const sourceFiles = listRelativeFiles(sourceShimDir).filter(
      (file) => !ignored.has(file)
    );
    const generatedFiles = listRelativeFiles(generatedShimDir).filter(
      (file) => !ignored.has(file)
    );

    expect(generatedFiles).toEqual(sourceFiles);
    for (const relativeFile of sourceFiles) {
      const sourceContent = fs.readFileSync(
        path.join(sourceShimDir, relativeFile),
        'utf8'
      );
      const generatedContent = fs.readFileSync(
        path.join(generatedShimDir, relativeFile),
        'utf8'
      );
      expect(generatedContent).toBe(sourceContent);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
