/* global postman */

import mockRequire from 'mock-require';
let k6, http;

const Define = Symbol.for('define');
const Request = Symbol.for('request');
const Reset = Symbol.for('reset');

beforeAll(() => {
  jest.resetModules();
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

test('undefined', t => {
  t.throws(() => {
    postman[Request]('Home Page');
  });
});

test('1', t => {
  const response = Symbol('response');
  http.request.returns(response);
  t.plan(4);
  postman[Define]({
    name: 'Home Page',
    method: 'GET',
    address: 'http://example.com',
    pre() {
      t.pass();
    },
    post() {
      t.pass();
    }
  });
  const result = postman[Request]('Home Page');
  t.true(http.request.calledOnce);
  t.is(result, response);
});

test('3', t => {
  postman[Define]({
    name: 'Home Page',
    method: 'GET',
    address: 'http://1.example.com',
    pre() { t.fail(); }
  });
  postman[Define]({
    name: 'Home Page',
    method: 'GET',
    address: 'http://2.example.com',
    pre() { t.fail(); }
  });
  postman[Define]({
    name: 'Home Page',
    method: 'GET',
    address: 'http://3.example.com',
    pre() { t.pass(); }
  });
  postman[Request]('Home Page', 3);
});
