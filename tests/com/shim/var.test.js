/* global postman pm globals environment data */

import mockRequire from 'mock-require';
let k6, http;

const undef = void 0; /* eslint-disable-line no-void */
const Reset = Symbol.for('reset');
const Initial = Symbol.for('initial');
const Iteration = Symbol.for('iteration');
const Request = Symbol.for('request');
const Var = Symbol.for('variable');

beforeAll(() => {
  jest.resetModules();
  mockRequire('k6', 'stub/k6');
  mockRequire('k6/http', 'stub/http');
  k6 = require('k6');
  http = require('k6/http');
  require('shim/core');
});

afterEach(() => {
  k6[Reset]();
  http[Reset]();
  postman[Reset]();
});

test('$guid', t => {
  const value = pm[Var]('$guid');
  t.true(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(value));
});

test('$randomInt', t => {
  const value = pm[Var]('$randomInt');
  t.true(value >= 0 && value <= 1000);
});

test('$randomPhoneNumber', t => {
  const value = pm[Var]('$randomPhoneNumber');
  t.true(value.length === 12);
});

test('$isoTimestamp', t => {
  const value = pm[Var]('$isoTimestamp');
  const regex = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})' + // match year
    '-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])' + // match month and day
    'T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$'); // match time
  t.true(regex.test(value));
});

test('$timestamp', t => {
  const value = pm[Var]('$timestamp');
  t.is(typeof value, 'number');
});

test('globals read clear', t => {
  t.is(globals.test, undef);
});

test('globals read set', t => {
  postman[Initial]({ global: { test: 'a' } });
  t.is(globals.test, 'a');
});

test('globals write', t => {
  t.throws(() => {
    globals.test = 'a';
  });
});

test('environment read clear', t => {
  t.is(environment.test, undef);
});

test('environment read set', t => {
  postman[Initial]({ environment: { test: 'a' } });
  t.is(environment.test, 'a');
});

test('environment write', t => {
  t.throws(() => {
    environment.test = 'a';
  });
});

test('data read clear', t => {
  postman[Initial]({ data: [] });
  postman[Iteration]();
  t.is(data.test, undef);
});

test('data read set', t => {
  postman[Initial]({ data: [{ test: 'a' }] });
  postman[Iteration]();
  t.is(data.test, 'a');
});

test('data read iterated', t => {
  postman[Initial]({
    data: [
      { test: 'a' },
      { test: 'b' },
      { test: 'c' }
    ]
  });
  postman[Iteration]();
  t.is(data.test, 'a');
  postman[Iteration]();
  t.is(data.test, 'b');
  postman[Iteration]();
  t.is(data.test, 'c');
});

test('data write', t => {
  postman[Initial]({ data: [] });
  postman[Iteration]();
  t.throws(() => {
    data.test = 'a';
  });
});

test('postman.getGlobalVariable clear', t => {
  t.is(postman.getGlobalVariable('test'), undef);
});

test('postman.getGlobalVariable set', t => {
  postman[Initial]({ global: { test: 'a' } });
  t.is(postman.getGlobalVariable('test'), 'a');
});

test('postman.setGlobalVariable clear', t => {
  t.is(globals.test, undef);
  postman.setGlobalVariable('test', 'a');
  t.is(globals.test, 'a');
});

test('postman.setGlobalVariable set', t => {
  postman[Initial]({ global: { test: 'a' } });
  t.is(globals.test, 'a');
  postman.setGlobalVariable('test', 'b');
  t.is(globals.test, 'b');
});

test('postman.clearGlobalVariable', t => {
  postman[Initial]({ global: { test: 'a' } });
  t.is(globals.test, 'a');
  postman.clearGlobalVariable('test');
  t.is(globals.test, undef);
});

test('postman.clearGlobalVariables', t => {
  postman[Initial]({ global: { test: 'a', test2: 'b' } });
  t.is(globals.test, 'a');
  t.is(globals.test2, 'b');
  postman.clearGlobalVariables();
  t.is(globals.test, undef);
  t.is(globals.test2, undef);
});

test('postman.getEnvironmentVariable clear', t => {
  postman[Initial]({ environment: {} });
  t.is(postman.getEnvironmentVariable('test'), undef);
});

test('postman.getEnvironmentVariable set', t => {
  postman[Initial]({ environment: { test: 'a' } });
  t.is(postman.getEnvironmentVariable('test'), 'a');
});

test('postman.setEnvironmentVariable clear', t => {
  postman[Initial]({ environment: {} });
  t.is(environment.test, undef);
  postman.setEnvironmentVariable('test', 'a');
  t.is(environment.test, 'a');
});

test('postman.setEnvironmentVariable set', t => {
  postman[Initial]({ environment: { test: 'a' } });
  t.is(environment.test, 'a');
  postman.setEnvironmentVariable('test', 'b');
  t.is(environment.test, 'b');
});

test('postman.clearEnvironmentVariable', t => {
  postman[Initial]({ environment: { test: 'a' } });
  t.is(environment.test, 'a');
  postman.clearEnvironmentVariable('test');
  t.is(environment.test, undef);
});

test('postman.clearEnvironmentVariables', t => {
  postman[Initial]({ environment: { test: 'a', test2: 'b' } });
  t.is(environment.test, 'a');
  t.is(environment.test2, 'b');
  postman.clearEnvironmentVariables();
  t.is(environment.test, undef);
  t.is(environment.test2, undef);
});

test('pm.environment.clear', t => {
  postman[Initial]({ environment: { test: 'a', test2: 'b' } });
  t.is(environment.test, 'a');
  t.is(environment.test2, 'b');
  pm.environment.clear();
  t.is(environment.test, undef);
  t.is(environment.test2, undef);
});

test('pm.environment.get clear', t => {
  postman[Initial]({ environment: {} });
  t.is(pm.environment.get('test'), undef);
});

test('pm.environment.get set', t => {
  postman[Initial]({ environment: { test: 'a' } });
  t.is(pm.environment.get('test'), 'a');
});

test('pm.environment.has clear', t => {
  postman[Initial]({ environment: {} });
  t.is(pm.environment.has('test'), false);
});

test('pm.environment.has set', t => {
  postman[Initial]({ environment: { test: 'a' } });
  t.is(pm.environment.has('test'), true);
});

test('pm.environment.set clear', t => {
  postman[Initial]({ environment: {} });
  t.is(environment.test, undef);
  pm.environment.set('test', 'a');
  t.is(environment.test, 'a');
});

test('pm.environment.set set', t => {
  postman[Initial]({ environment: { test: 'a' } });
  t.is(environment.test, 'a');
  pm.environment.set('test', 'b');
  t.is(environment.test, 'b');
});

test('pm.environment.toObject', t => {
  postman[Initial]({ environment: { test: 'a', test2: 'b' } });
  const values = pm.environment.toObject();
  t.is(typeof values, 'object');
  t.is(values.test, 'a');
  t.is(values.test2, 'b');
});

test('pm.environment.unset', t => {
  postman[Initial]({ environment: { test: 'a' } });
  t.is(environment.test, 'a');
  pm.environment.unset('test');
  t.is(environment.test, undef);
});

test('pm.globals.clear', t => {
  postman[Initial]({ global: { test: 'a', test2: 'b', test3: 'c' } });
  t.is(globals.test, 'a');
  t.is(globals.test2, 'b');
  t.is(globals.test3, 'c');
  pm.globals.clear();
  t.is(globals.test, undef);
  t.is(globals.test2, undef);
  t.is(globals.test3, undef);
});

test('pm.globals.get clear', t => {
  t.is(pm.globals.get('test'), undef);
});

test('pm.globals.get set', t => {
  postman[Initial]({ global: { test: 'a' } });
  t.is(pm.globals.get('test'), 'a');
});

test('pm.globals.has clear', t => {
  t.is(pm.globals.has('test'), false);
});

test('pm.globals.has set', t => {
  postman[Initial]({ global: { test: 'a' } });
  t.is(pm.globals.has('test'), true);
});

test('pm.globals.set clear', t => {
  t.is(globals.test, undef);
  pm.globals.set('test', 'a');
  t.is(globals.test, 'a');
});

test('pm.globals.toObject', t => {
  postman[Initial]({ global: { test: 'a', test2: 'b' } });
  const values = pm.globals.toObject();
  t.is(typeof values, 'object');
  t.is(values.test, 'a');
  t.is(values.test2, 'b');
});

test('pm.globals.unset', t => {
  postman[Initial]({ global: { test: 'a' } });
  t.is(globals.test, 'a');
  pm.globals.unset('test');
  t.is(globals.test, undef);
});

test('pm.iterationData unavailable', t => {
  t.is(pm.iterationData, undef);
});

test('pm.iterationData.get clear', t => {
  postman[Initial]({ data: [{}] });
  postman[Iteration]();
  t.is(pm.iterationData.get('test'), undef);
});

test('pm.iterationData.get set', t => {
  postman[Initial]({ data: [{ test: 'a' }] });
  postman[Iteration]();
  t.is(pm.iterationData.get('test'), 'a');
});

test('pm.iterationData.get iterated', t => {
  postman[Initial]({
    data: [
      { test: 'a' },
      { test: 'b' },
      { test: 'c' }
    ]
  });
  postman[Iteration]();
  t.is(pm.iterationData.get('test'), 'a');
  postman[Iteration]();
  t.is(pm.iterationData.get('test'), 'b');
  postman[Iteration]();
  t.is(pm.iterationData.get('test'), 'c');
});

test('pm.iterationData.toObject', t => {
  postman[Initial]({ data: [{ test: 'a', test2: 'b' }] });
  postman[Iteration]();
  const values = pm.iterationData.toObject();
  t.is(typeof values, 'object');
  t.is(values.test, 'a');
  t.is(values.test2, 'b');
});

test('pm.variables.get clear', t => {
  t.is(pm.variables.get('test'), undef);
});

test('pm.variables.get global', t => {
  postman[Initial]({
    global: { test: 'a' }
  });
  t.is(pm.variables.get('test'), 'a');
});

test('pm.variables.get collection', t => {
  postman[Initial]({
    global: { test: 'a' },
    collection: { test: 'b' }
  });
  t.is(pm.variables.get('test'), 'b');
});

test('pm.variables.get environment', t => {
  postman[Initial]({
    global: { test: 'a' },
    collection: { test: 'b' },
    environment: { test: 'c' }
  });
  t.is(pm.variables.get('test'), 'c');
});

test('pm.variables.get data', t => {
  postman[Initial]({
    global: { test: 'a' },
    collection: { test: 'b' },
    environment: { test: 'c' },
    data: [{ test: 'd' }]
  });
  postman[Iteration]();
  t.is(pm.variables.get('test'), 'd');
});

test('pm.variables.get data iterated', t => {
  postman[Initial]({
    data: [
      { test: 'a' },
      { test: 'b' },
      { test: 'c' }
    ]
  });
  postman[Iteration]();
  postman[Iteration]();
  t.is(pm.variables.get('test'), 'b');
});

test('pm.variables.get local', t => {
  postman[Initial]({
    global: { test: 'a' },
    collection: { test: 'b' },
    environment: { test: 'c' },
    data: [{ test: 'd' }]
  });
  postman[Iteration]();
  postman[Request]({
    pre() {
      pm.variables.set('test', 'e');
      t.is(pm.variables.get('test'), 'e');
    }
  });
});

test('pm.variables.set scoped', t => {
  t.throws(() => {
    pm.variables.set('test', 'a');
  });
});

test('pm.variables.set clear', t => {
  postman[Request]({
    pre() {
      t.is(pm.variables.get('test'), undef);
      pm.variables.set('test', 'a');
      t.is(pm.variables.get('test'), 'a');
    }
  });
});

test('pm.variables.set set', t => {
  postman[Request]({
    pre() {
      pm.variables.set('test', 'a');
      t.is(pm.variables.get('test'), 'a');
      pm.variables.set('test', 'b');
      t.is(pm.variables.get('test'), 'b');
    }
  });
});

test('pm.collectionVariables.set scoped', t => {
  t.throws(() => {
    pm.collectionVariables.set('test', 'a');
  });
});

test('pm.collectionVariables.set clear', t => {
  postman[Request]({
    pre() {
      t.is(pm.collectionVariables.get('test'), undef);
      pm.collectionVariables.set('test', 'a');
      t.is(pm.collectionVariables.get('test'), 'a');
    }
  });
});

test('pm.collectionVariables.set set', t => {
  postman[Request]({
    pre() {
      pm.collectionVariables.set('test', 'a');
      t.is(pm.collectionVariables.get('test'), 'a');
      pm.collectionVariables.set('test', 'b');
      t.is(pm.collectionVariables.get('test'), 'b');
    }
  });
});

test('pm[Var] simple', t => {
  postman[Initial]({ global: { test: 'a' } });
  t.is(pm[Var]('test'), 'a');
});
