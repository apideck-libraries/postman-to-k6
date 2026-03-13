/* global postman xml2Json */

import { loadShimCore, resetShimState } from '../../helpers/shimHarness';

let harness;
const Extend = Symbol.for('extend');

beforeAll(() => {
  harness = loadShimCore();
});

afterEach(() => {
  resetShimState(harness);
});

afterAll(() => {
  resetShimState(harness);
});

test('postman[Extend].expect requires expect shim', () => {
  expect(() => {
    postman[Extend].expect('value');
  }).toThrow('To use pm.expect import "./libs/shim/expect.js"');
});

test('postman[Extend].jsonSchema requires jsonSchema shim', () => {
  expect(() => {
    postman[Extend].jsonSchema({}, { type: 'object' });
  }).toThrow('To use JSON schema import "./libs/shim/jsonSchema.js"');
});

test('postman[Extend].jsonSchemaNot requires jsonSchema shim', () => {
  expect(() => {
    postman[Extend].jsonSchemaNot({}, { type: 'object' });
  }).toThrow('To use JSON schema impot "./libs/shim/jsonSchema.js"');
});

test('xml2Json requires shim import', () => {
  expect(() => {
    xml2Json('<root>text</root>');
  }).toThrow('To use xml2Json import ./libs/shim/xml2Json.js');
});
