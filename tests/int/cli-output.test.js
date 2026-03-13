const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

test('cli output includes libs, shim core, and vendor files', () => {
  const repoRoot = path.resolve(__dirname, '../..');
  const cliPath = path.resolve(repoRoot, 'bin/postman-to-k6.js');
  const inputPath = path.resolve(repoRoot, 'test/material/2/minimal.json');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'postman-to-k6-cli-'));
  const outputPath = path.join(tempDir, 'generated.js');

  try {
    execFileSync(process.execPath, [cliPath, inputPath, '-o', outputPath], {
      cwd: repoRoot,
      stdio: 'pipe',
    });

    expect(fs.existsSync(path.join(tempDir, 'libs'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'libs/shim/core.js'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'libs/urijs.js'))).toBe(true);
    expect(fs.existsSync(outputPath)).toBe(true);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
