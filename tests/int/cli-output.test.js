const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

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
