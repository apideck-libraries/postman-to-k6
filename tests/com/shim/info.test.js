/* global postman pm iteration */

import uuidv4 from 'uuid/v4';
import { loadShimCore, resetShimState } from '../../helpers/shimHarness';
let k6;
let http;
let harness;
const Initial = Symbol.for('initial');
const Request = Symbol.for('request');
beforeAll(() => {
  harness = loadShimCore();
  ({ k6, http } = harness);
});
afterEach(() => {
  resetShimState(harness);
  global.__ITER = undefined;
});
afterAll(() => {
  resetShimState(harness);
  global.__ITER = undefined;
});
test('iteration', () => {
  global.__ITER = 7;
  expect(iteration).toBe(7);
});
test('pm.info.eventName pre', () => {
  postman[Request]({
    pre() {
      expect(pm.info.eventName).toBe('prerequest');
    }
  });
});
test('pm.info.eventName post', () => {
  postman[Request]({
    post() {
      expect(pm.info.eventName).toBe('test');
    }
  });
});
test('pm.info.iteration', () => {
  global.__ITER = 5;
  expect(pm.info.iteration).toBe(5);
});
test('pm.info.iterationCount clear', () => {
  const options = {};
  postman[Initial]({
    options
  });
  expect(pm.info.iterationCount).toBe(Number.POSITIVE_INFINITY);
});
test('pm.info.iterationCount set', () => {
  const options = {
    iterations: 25
  };
  postman[Initial]({
    options
  });
  expect(pm.info.iterationCount).toBe(25);
});
test('pm.info.requestId', () => {
  const id = uuidv4();
  postman[Request]({
    id,
    pre() {
      expect(pm.info.requestId).toBe(id);
    }
  });
});
test('pm.info.requestName', () => {
  postman[Request]({
    name: 'Test Request',
    pre() {
      expect(pm.info.requestName).toBe('Test Request');
    }
  });
});
