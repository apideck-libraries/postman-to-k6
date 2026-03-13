/* global postman xml2Json xmlToJson */

import path from 'node:path';
import { loadShimCore, resetShimState } from '../../helpers/shimHarness';
let k6;
let http;
let harness;
beforeAll(() => {
  harness = loadShimCore({
    extraMocks: [
      [
        path.resolve(__dirname, '../../../lib/xml2js.js'),
        () => require('xml2js'),
        { virtual: true },
      ],
    ],
    preloadModules: ['../../lib/shim/xml2Json'],
  });
  ({ k6, http } = harness);
});
afterEach(() => {
  resetShimState(harness);
});
afterAll(() => {
  resetShimState(harness);
});
test('xml2Json', () => {
  const xml = '<root>Text</root>';
  const json = xml2Json(xml);
  expect(json).toEqual({
    root: 'Text',
  });
});
test('xmlToJson', () => {
  expect(() => {
    xmlToJson();
  }).toThrow();
});
