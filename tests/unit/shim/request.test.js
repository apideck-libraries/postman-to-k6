/* global postman */

import { loadShimCore, resetShimState } from '../../helpers/shimHarness';

const Initial = Symbol.for('initial');
const Request = Symbol.for('request');

let harness;
let http;

beforeAll(() => {
  harness = loadShimCore();
  ({ http } = harness);
});

afterEach(() => {
  resetShimState(harness);
});
afterAll(() => {
  resetShimState(harness);
});

test('interpolate raw body', () => {
  global.postman[Initial]({
    environment: {
      birch: 'fir',
      pine: 'redwood',
      willow: 'rosewood',
    },
  });
  global.postman[Request]({
    method: 'GET',
    address: 'http://example.com',
    data: '{{birch}} {{pine}} {{willow}}',
  });

  const body = http.request.mock.calls[0][2];
  expect(body).toBe('fir redwood rosewood');
});

test('should pass on tags to the http request', () => {
  const testName = 'request tagged with a name';
  global.postman[Request]({
    method: 'GET',
    address: 'http://example.com',
    data: 'testing',
    tags: { name: testName },
  });

  const params = http.request.mock.calls[0][3];
  expect(params.tags.name).toBe(testName);
});
