const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { bundleVendor, DEFAULT_MODULES } = require('../../scripts/bundle');

test('bundle script emits expected vendor artifacts', async () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'postman-to-k6-bundle-')
  );

  try {
    await bundleVendor({ dir: tempDir });

    const expectedFiles = DEFAULT_MODULES.map((moduleName) => {
      const name = moduleName.split('/')[0];
      return `${name}.js`;
    }).sort();

    const actualFiles = fs.readdirSync(tempDir).sort();
    expect(actualFiles).toEqual(expectedFiles);

    for (const file of actualFiles) {
      const stat = fs.statSync(path.join(tempDir, file));
      expect(stat.size).toBeGreaterThan(0);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}, 30000);
