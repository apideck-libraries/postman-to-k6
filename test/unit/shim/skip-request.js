/* global postman, pm */

import test from 'ava';
import mockRequire from 'mock-require';
import sinon from 'sinon';

const k6 = {};
const http = { request: sinon.spy() };
mockRequire('k6', k6);
mockRequire('k6/http', http);
require('../../../lib/shim/core');

const Reset = Symbol.for('reset');
const Request = Symbol.for('request');

test.afterEach.always(t => {
  postman[Reset]();
  http.request.resetHistory();
});

test.serial('pm.execution.skipRequest prevents HTTP call', t => {
  postman[Request]({
    method: 'GET',
    address: 'http://example.com',
    pre() {
      pm.execution.skipRequest();
    },
  });
  t.false(http.request.called);
});
