/* global postman */

import { loadShimCore, resetShimState } from '../../helpers/shimHarness';
let k6;
let http;
let harness;
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
test('setNextRequest', () => {
  expect(() => {
    postman.setNextRequest();
  }).toThrow();
});
