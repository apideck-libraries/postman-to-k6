#!/usr/bin/env node

const fs = require('fs-extra');
const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

const dir = 'vendor';
const modules = [
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

async function bundleModules() {
  await fs.ensureDir(dir);
  await fs.emptyDir(dir);

  for (const module of modules) {
    const name = module.split('/')[0];
    const outputPath = `${dir}/${name}.js`;

    try {
      const bundle = await rollup.rollup({
        input: require.resolve(module),
        plugins: [
          nodeResolve(), // Resolves modules in node_modules
          commonjs(), // Converts CommonJS to ES6
          terser(), // Minifies the output
        ],
      });

      await bundle.write({
        file: outputPath,
        format: 'es', // ESM output format
        exports: 'auto',
      });

      console.log(`Bundled ${module} to ${outputPath}`);
    } catch (error) {
      console.error(`Error bundling ${module}:`, error);
    }
  }
}

bundleModules();
