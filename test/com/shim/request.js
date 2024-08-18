/* global postman pm request */

import test from 'ava';
import mockRequire from 'mock-require';
import uuidv4 from 'uuid/v4';
let k6, http;

const undef = void 0; /* eslint-disable-line no-void */

const Reset = Symbol.for('reset');
const Initial = Symbol.for('initial');
const Request = Symbol.for('request');

test.before(t => {
  mockRequire('k6', 'stub/k6');
  mockRequire('k6/http', 'stub/http');
  k6 = require('k6');
  http = require('k6/http');
  require('shim/core');
});

test.afterEach.always(t => {
  k6[Reset]();
  http[Reset]();
  postman[Reset]();
});

test.serial('pre', t => {
  postman[Request]({
    pre() {
      t.pass();
    },
  });
});

test.serial('post', t => {
  postman[Request]({
    post() {
      t.pass();
    },
  });
});

test.serial('request', t => {
  t.plan(4);
  t.is(request, undef);
  postman[Request]({
    pre() {
      t.is(typeof request, 'object');
    },
    post() {
      t.is(typeof request, 'object');
    },
  });
  t.is(request, undef);
});

test.serial('request.data', t => {
  const data = {
    First: 'One',
    Second: 'Two',
    Third: 'Three',
  };
  postman[Request]({
    data,
    pre() {
      t.deepEqual(request.data, data);
    },
  });
});

test.serial('request.headers', t => {
  const headers = {
    First: 'One',
    Second: 'Two',
    Third: 'Three',
  };
  postman[Request]({
    headers,
    pre() {
      t.deepEqual(request.headers, headers);
    },
  });
});

test.serial('request.id', t => {
  const id = uuidv4();
  postman[Request]({
    id,
    pre() {
      t.is(request.id, id);
    },
  });
});

test.serial('request.method', t => {
  postman[Request]({
    method: 'get',
    pre() {
      t.is(request.method, 'GET');
    },
  });
});

test.serial('request.name', t => {
  postman[Request]({
    name: 'Test Request',
    pre() {
      t.is(request.name, 'Test Request');
    },
  });
});

test.serial('request.url', t => {
  postman[Request]({
    address: 'http://example.com',
    pre() {
      t.is(request.url, 'http://example.com');
    },
  });
});

test.serial('pm.request.headers', t => {
  postman[Request]({
    headers: {
      marco: 'polo',
      foo: 'bar',
    },
    pre() {
      t.deepEqual(pm.request.headers, [
        { key: 'marco', value: 'polo' },
        { key: 'foo', value: 'bar' },
      ]);
    },
  });
});

test.serial('pm.request.method', t => {
  postman[Request]({
    method: 'POST',
    pre() {
      t.deepEqual(pm.request.method, 'POST');
    },
  });
});

test.serial('pm.request.id', t => {
  const input = '33d2dd9f-e4fc-46fb-9885-df53f1b2310b';
  postman[Request]({
    id: input,
    pre() {
      t.deepEqual(pm.request.id, input);
    },
  });
});

test.serial('pm.request.name', t => {
  const input = 'Postman request name';
  postman[Request]({
    name: input,
    pre() {
      t.deepEqual(pm.request.name, input);
    },
  });
});

test.serial('pm.request.auth', t => {
  postman[Request]({
    pre() {
      t.deepEqual(pm.request.auth, undefined);
    },
    auth(config, Var) {
      config.headers.Authorization = 'Bearer access_token';
      config.options.auth = 'bearer';
    },
  });
});

test.serial('pm.request.body', t => {
  const bodyRaw =
    '{\n    "booleanVar": true,\n    "dynVar": "{{$randomCity}}",\n    "numberVar": 12345,\n    "stringVar": "my-tax"\n}';
  postman[Request]({
    data: bodyRaw,
    pre() {
      t.deepEqual(pm.request.body, { mode: 'raw', raw: bodyRaw });
    },
  });
});

test.serial('pm.request.body.raw', t => {
  const bodyRaw =
    '{\n    "booleanVar": true,\n    "dynVar": "{{$randomCity}}",\n    "numberVar": 12345,\n    "stringVar": "my-tax"\n}';
  postman[Request]({
    data: bodyRaw,
    pre() {
      t.deepEqual(pm.request.body.raw, bodyRaw);
    },
  });
});

test.serial('pm.request.body.urlencoded', t => {
  const bodyUrlencoded = {
    booleanVar: true,
    dynVar: '{{$randomCity}}',
    numberVar: 12345,
    stringVar: 'my-tax',
  };
  postman[Request]({
    data: bodyUrlencoded,
    pre() {
      t.deepEqual(pm.request.body.urlencoded, [
        { key: 'booleanVar', value: true },
        {
          key: 'dynVar',
          value: '{{$randomCity}}',
        },
        {
          key: 'numberVar',
          value: 12345,
        },
        {
          key: 'stringVar',
          value: 'my-tax',
        },
      ]);
    },
  });
});

test.serial('pm.request.url', t => {
  postman[Request]({
    address:
      'http://127.0.0.1:4010/widget/:id?name=widget1&type=small#section2',
    pre() {
      t.deepEqual(pm.request.url, {
        fragment: 'section2',
        host: ['127', '0', '0', '1'],
        path: ['widget', ':id'],
        port: '4010',
        protocol: 'http',
        query: [
          { key: 'name', value: 'widget1' },
          {
            key: 'type',
            value: 'small',
          },
        ],
        variable: ['id'],
      });
    },
  });
});

test.serial('variable', t => {
  postman[Initial]({
    global: { domain: 'example.com', path: '/index.html' },
  });
  postman[Request]({
    address: 'http://{{domain}}{{path}}',
  });
  t.true(http.request.calledOnce);
  const args = http.request.firstCall.args;
  t.is(args[1], 'http://example.com/index.html');
});

test.serial('args', t => {
  postman[Request]({
    method: 'GET',
    address: 'http://example.com',
    data: { test: 'a', test2: 'b' },
    headers: { Test: 'a', Test2: 'b' },
    options: { auth: 'basic' },
  });
  t.true(http.request.calledOnce);
  const args = http.request.firstCall.args;
  t.is(args[0], 'GET');
  t.is(args[1], 'http://example.com');
  t.deepEqual(args[2], { test: 'a', test2: 'b' });
  t.deepEqual(args[3], { auth: 'basic', headers: { Test: 'a', Test2: 'b' } });
});

test.serial('pm.sendRequest', t => {
  t.throws(() => {
    pm.sendRequest();
  });
});

test.serial('request.body.raw', t => {
  const rawBody = JSON.stringify({ key1: 'value1', key2: 'value2' });

  postman[Request]({
    method: 'POST',
    address: 'http://example.com',
    data: rawBody,
    pre() {
      t.is(request.body, rawBody);
    },
  });

  t.true(http.request.calledOnce);
  const args = http.request.firstCall.args;
  t.is(args[0], 'POST');
  t.is(args[1], 'http://example.com');
  t.is(args[2], rawBody);
});
