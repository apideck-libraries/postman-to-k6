#!/usr/bin/env node

const fs = require('fs-extra');
const browserify = require('browserify');

const DEFAULT_DIR = 'vendor';
const DEFAULT_MODULES = [
  'ajv',
  'aws4',
  'chai',
  'cheerio',
  'crypto-js',
  'lodash',
  'oauth-1.0a',
  'papaparse',
  'spo-gpo/polyfill',
  'urijs',
  'xml2js',
];

function bundleModule(moduleName, dir) {
  const name = moduleName.split('/')[0];
  const outputPath = `${dir}/${name}.js`;

  return new Promise((resolve, reject) => {
    browserify({ standalone: moduleName })
      .require(moduleName)
      .bundle()
      .on('error', reject)
      .pipe(fs.createWriteStream(outputPath))
      .on('finish', resolve)
      .on('error', reject);
  });
}

async function bundleVendor({
  dir = DEFAULT_DIR,
  modules = DEFAULT_MODULES,
} = {}) {
  fs.ensureDirSync(dir);
  fs.emptyDirSync(dir);
  await Promise.all(modules.map((moduleName) => bundleModule(moduleName, dir)));
}

if (require.main === module) {
  bundleVendor().catch((error) => {
    // Keep CLI behavior explicit for CI/local runs.
    console.error(error);
    process.exit(1);
  });
}

module.exports = {
  bundleVendor,
  DEFAULT_DIR,
  DEFAULT_MODULES,
};
