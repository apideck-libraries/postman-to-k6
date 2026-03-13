/* global postman */

import mockRequire from 'mock-require';
let k6, http;

const Reset = Symbol.for('reset');

beforeAll(() => {
  mockRequire('k6', 'stub/k6');
  mockRequire('k6/http', 'stub/http');
  k6 = require('k6');
  http = require('k6/http');
  require('shim/core');
});

afterEach(() => {
  k6[Reset]();
  http[Reset]();
  postman[Reset]();
});

test('setNextRequest', t => {
  t.throws(() => {
    postman.setNextRequest();
  });
});
