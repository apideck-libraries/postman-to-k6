/* global postman */

const Initial = Symbol.for('initial');
const Reset = Symbol.for('reset');
const Request = Symbol.for('request');

let http;

beforeAll(() => {
  jest.resetModules();
  http = require('k6/http');
  require('shim/core');
});

afterEach(() => {
  global.postman[Reset]();
  http[Reset]();
});

test('interpolate raw body', t => {
  global.postman[Initial]({
    environment: {
      birch: 'fir',
      pine: 'redwood',
      willow: 'rosewood'
    }
  });
  global.postman[Request]({
    method: 'GET',
    address: 'http://example.com',
    data: '{{birch}} {{pine}} {{willow}}'
  });
  const body = http.request.firstCall.args[2];
  t.is(body, 'fir redwood rosewood');
});

test('should pass on tags to the http request', t => {
  const testName = 'request tagged with a name';
  global.postman[Request]({
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
