/* global postman */

import mockRequire from 'mock-require';
const lodash = Symbol('lodash');
const cheerio = Symbol('cheerio');
const cryptoJs = Symbol('crypto-js');
let k6, http;

const Reset = Symbol.for('reset');
const Request = Symbol.for('request');

beforeAll(() => {
  jest.resetModules();
  global.require = require; // Simulate k6 global require
  mockRequire('k6', 'stub/k6');
  mockRequire('k6/http', 'stub/http');
  mockRequire('../../../lib/lodash.js', lodash);
  mockRequire('../../../lib/cheerio.js', cheerio);
  mockRequire('../../../lib/crypto-js.js', cryptoJs);
  k6 = require('k6');
  http = require('k6/http');
  require('shim/core');
});

afterEach(() => {
  k6[Reset]();
  http[Reset]();
  postman[Reset]();
});

test('require standard', t => {
  t.notThrows(() => {
    global.require('console');
  });
});

test('require prerequest', t => {
  postman[Request]({
    pre() {
      t.throws(() => {
        global.require('console');
      });
    }
  });
});

test('require postrequest', t => {
  postman[Request]({
    post() {
      t.throws(() => {
        global.require('console');
      });
    }
  });
});

test('require released', t => {
  postman[Request]({});
  t.notThrows(() => {
    global.require('console');
  });
});

test('lodash', t => {
  require('shim/lodash');
  postman[Request]({
    pre() {
      t.is(global.require('lodash'), lodash);
    }
  });
});

test('cheerio', t => {
  require('shim/cheerio');
  postman[Request]({
    pre() {
      t.is(global.require('cheerio'), cheerio);
    }
  });
});

test('crypto-js', t => {
  require('shim/crypto-js');
  postman[Request]({
    pre() {
      t.is(global.require('crypto-js'), cryptoJs);
    }
  });
});
