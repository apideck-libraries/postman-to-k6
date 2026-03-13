/* global postman */

import path from 'path';
import { loadShimCore, resetShimState } from '../../helpers/shimHarness';
const lodash = Symbol('lodash');
const cheerio = Symbol('cheerio');
const cryptoJs = Symbol('crypto-js');
let k6, http;
let harness;
const Request = Symbol.for('request');
beforeAll(() => {
  harness = loadShimCore({
    withGlobalRequire: true,
    extraMocks: [
      [path.resolve(__dirname, '../../../lib/lodash.js'), () => lodash, { virtual: true }],
      [path.resolve(__dirname, '../../../lib/cheerio.js'), () => cheerio, { virtual: true }],
      [path.resolve(__dirname, '../../../lib/crypto-js.js'), () => cryptoJs, { virtual: true }]
    ]
  });
  ({ k6, http } = harness);
});
afterEach(() => {
  resetShimState(harness);
});
afterAll(() => {
  resetShimState(harness);
});
test('require standard', () => {
  expect(() => {
    global.require('console');
  }).not.toThrow();
});
test('require prerequest', () => {
  postman[Request]({
    pre() {
      expect(() => {
        global.require('console');
      }).toThrow();
    }
  });
});
test('require postrequest', () => {
  postman[Request]({
    post() {
      expect(() => {
        global.require('console');
      }).toThrow();
    }
  });
});
test('require released', () => {
  postman[Request]({});
  expect(() => {
    global.require('console');
  }).not.toThrow();
});
test('lodash', () => {
  require('shim/lodash');
  postman[Request]({
    pre() {
      expect(global.require('lodash')).toBe(lodash);
    }
  });
});
test('cheerio', () => {
  require('shim/cheerio');
  postman[Request]({
    pre() {
      expect(global.require('cheerio')).toBe(cheerio);
    }
  });
});
test('crypto-js', () => {
  require('shim/crypto-js');
  postman[Request]({
    pre() {
      expect(global.require('crypto-js')).toBe(cryptoJs);
    }
  });
});
