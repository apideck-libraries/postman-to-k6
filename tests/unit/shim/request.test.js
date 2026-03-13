/* global postman */

import mockRequire from 'mock-require';
import sinon from 'sinon';

const k6 = {};
const http = { request: sinon.spy() };
mockRequire('k6', k6);
mockRequire('k6/http', http);
require('../../../lib/shim/core');

const Initial = Symbol.for('initial');
const Reset = Symbol.for('reset');
const Request = Symbol.for('request');

afterEach(() => {
  postman[Reset]();
  http.request.resetHistory();
});

test('interpolate raw body', t => {
  postman[Initial]({
    environment: {
      birch: 'fir',
      pine: 'redwood',
      willow: 'rosewood'
    }
  });
  postman[Request]({
    method: 'GET',
    address: 'http://example.com',
    data: '{{birch}} {{pine}} {{willow}}'
  });
  const body = http.request.firstCall.args[2];
  t.is(body, 'fir redwood rosewood');
});

test('should pass on tags to the http request', t => {
  const testName = 'request tagged with a name';
  postman[Request]({
    method: 'GET',
    address: 'http://example.com',
    data: 'testing',
    tags: { name: testName }
  });
  const params = http.request.firstCall.args[3];

  t.is(
    params.tags.name,
    testName,
  );
});
