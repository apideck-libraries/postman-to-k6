/* global postman xml2Json xmlToJson */

import mockRequire from 'mock-require';
import path from 'path';
let k6, http;

const Reset = Symbol.for('reset');

beforeAll(() => {
  mockRequire('k6', 'stub/k6');
  mockRequire('k6/http', 'stub/http');
  jest.doMock(
    path.resolve(__dirname, '../../../lib/xml2js.js'),
    () => require('xml2js'),
    { virtual: true }
  );
  k6 = require('k6');
  http = require('k6/http');
  require('shim/core');
  require('shim/xml2Json');
});

afterEach(() => {
  k6[Reset]();
  http[Reset]();
  postman[Reset]();
});

test('xml2Json', t => {
  const xml = '<root>Text</root>';
  const json = xml2Json(xml);
  t.deepEqual(json, { root: 'Text' });
});

test('xmlToJson', t => {
  t.throws(() => {
    xmlToJson();
  });
});
