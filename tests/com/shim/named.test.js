/* global postman */

import { loadShimCore, resetShimState } from '../../helpers/shimHarness';
let k6, http;
let harness;
const Define = Symbol.for('define');
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
test('undefined', () => {
  expect(() => {
    postman[Request]('Home Page');
  }).toThrow();
});
test('1', () => {
  const response = Symbol('response');
  http.request.returns(response);
  postman[Define]({
    name: 'Home Page',
    method: 'GET',
    address: 'http://example.com',
    pre() {
      expect(true).toBe(true);
    },
    post() {
      expect(true).toBe(true);
    }
  });
  const result = postman[Request]('Home Page');
  expect(http.request.calledOnce).toBe(true);
  expect(result).toBe(response);
});
test('3', () => {
  postman[Define]({
    name: 'Home Page',
    method: 'GET',
    address: 'http://1.example.com',
    pre() {
      throw new Error("Expected failure");
    }
  });
  postman[Define]({
    name: 'Home Page',
    method: 'GET',
    address: 'http://2.example.com',
    pre() {
      throw new Error("Expected failure");
    }
  });
  postman[Define]({
    name: 'Home Page',
    method: 'GET',
    address: 'http://3.example.com',
    pre() {
      expect(true).toBe(true);
    }
  });
  postman[Request]('Home Page', 3);
});
