/* global postman pm */
/* global responseBody responseCode responseHeaders responseTime */

import { loadShimCore, resetShimState } from '../../helpers/shimHarness';
let k6;
let http;
let harness;
const Request = Symbol.for('request');
beforeAll(() => {
  harness = loadShimCore();
  ({ k6, http } = harness);
});
afterEach(() => {
  resetShimState(harness);
});
afterAll(() => {
  resetShimState(harness);
});
test('responseBody', () => {
  http.request.returns({
    body: 'Response body',
  });
  postman[Request]({
    post() {
      expect(responseBody).toBe('Response body');
    },
  });
});
test('responseCode.code', () => {
  http.request.returns({
    status: 418,
  });
  postman[Request]({
    post() {
      expect(responseCode.code).toBe(418);
    },
  });
});
test('responseCode.detail', () => {
  postman[Request]({
    post() {
      expect(() => {
        responseCode.detail; /* eslint-disable-line no-unused-expressions */
      }).toThrow();
    },
  });
});
test('responseCode.name', () => {
  postman[Request]({
    post() {
      expect(() => {
        responseCode.name; /* eslint-disable-line no-unused-expressions */
      }).toThrow();
    },
  });
});
test('responseHeaders', () => {
  http.request.returns({
    headers: {
      Server: 'MasterControlProgram',
      Allow: 'GET, POST, HEAD',
    },
  });
  postman[Request]({
    post() {
      expect(responseHeaders).toEqual({
        Server: 'MasterControlProgram',
        Allow: 'GET, POST, HEAD',
      });
    },
  });
});
test('responseTime', () => {
  http.request.returns({
    timings: {
      duration: 556,
    },
  });
  postman[Request]({
    post() {
      expect(responseTime).toBe(556);
    },
  });
});
test('postman.getResponseHeader', () => {
  http.request.returns({
    headers: {
      Server: 'MasterControlProgram',
    },
  });
  postman[Request]({
    post() {
      expect(postman.getResponseHeader('server')).toBe('MasterControlProgram');
    },
  });
});
test('pm.response.code', () => {
  http.request.returns({
    status: 418,
  });
  postman[Request]({
    post() {
      expect(pm.response.code).toBe(418);
    },
  });
});
test('pm.response.headers.get', () => {
  http.request.returns({
    headers: {
      'Content-Type': 'application/json',
      Server: 'GitHub Copilot',
    },
  });
  postman[Request]({
    post() {
      expect(pm.response.headers.get('Server')).toEqual('GitHub Copilot');
    },
  });
});
test('pm.response.headers.all', () => {
  http.request.returns({
    headers: {
      'Content-Type': 'application/json',
      Server: 'GitHub Copilot',
    },
  });
  postman[Request]({
    post() {
      expect(pm.response.headers.all()).toEqual({
        'Content-Type': 'application/json',
        Server: 'GitHub Copilot',
      });
    },
  });
});
test('pm.response.headers.get missing', () => {
  postman[Request]({
    post() {
      expect(pm.response.headers.get('Server')).toBeNull();
    },
  });
});
test('pm.response.headers.all missing', () => {
  postman[Request]({
    post() {
      expect(pm.response.headers.all()).toEqual({});
    },
  });
});
test('pm.response.json', () => {
  http.request.returns({
    body: '{ "test": "a", "test2": "b" }',
  });
  postman[Request]({
    post() {
      expect(pm.response.json()).toEqual({
        test: 'a',
        test2: 'b',
      });
    },
  });
});
test('pm.response.json invalid', () => {
  http.request.returns({
    body: 'not-json',
  });
  postman[Request]({
    post() {
      expect(() => {
        pm.response.json();
      }).toThrow('JSON parsing of body failed');
    },
  });
});
test('pm.response.reason', () => {
  postman[Request]({
    post() {
      expect(() => {
        pm.response.reason();
      }).toThrow();
    },
  });
});
test('pm.response.responseTime', () => {
  http.request.returns({
    timings: {
      duration: 556,
    },
  });
  postman[Request]({
    post() {
      expect(pm.response.responseTime).toBe(556);
    },
  });
});
test('pm.response.text string', () => {
  http.request.returns({
    body: 'Response body',
  });
  postman[Request]({
    post() {
      expect(pm.response.text()).toBe('Response body');
    },
  });
});
test('pm.response.text binary', () => {
  http.request.returns({
    body: [0x01, 0x02, 0x03],
  });
  postman[Request]({
    post() {
      expect(pm.response.text()).toBe(null);
    },
  });
});

test('postman.getResponseHeader requires post scope', () => {
  expect(() => {
    postman.getResponseHeader('Server');
  }).toThrow('May only be used in a postrequest script');
});

test('postman.getResponseCookie requires post scope', () => {
  expect(() => {
    postman.getResponseCookie('session');
  }).toThrow('May only be used in a postrequest script');
});

test('pm.response.to in post scope outside pm.test is undefined', () => {
  postman[Request]({
    post() {
      expect(pm.response.to).toBeUndefined();
    },
  });
});
