/* global postman pm globals environment data */

import { loadShimCore, resetShimState } from '../../helpers/shimHarness';
let k6;
let http;
let harness;
const undef = void 0; /* eslint-disable-line no-void */
const Initial = Symbol.for('initial');
const Iteration = Symbol.for('iteration');
const Request = Symbol.for('request');
const Var = Symbol.for('variable');
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
test('$guid', () => {
  const value = pm[Var]('$guid');
  expect(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(value)).toBe(true);
});
test('$randomInt', () => {
  const value = pm[Var]('$randomInt');
  expect(value >= 0 && value <= 1000).toBe(true);
});
test('$randomPhoneNumber', () => {
  const value = pm[Var]('$randomPhoneNumber');
  expect(value.length === 12).toBe(true);
});
test('$isoTimestamp', () => {
  const value = pm[Var]('$isoTimestamp');
  const regex = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})' +
  // match year
  '-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])' +
  // match month and day
  'T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$'); // match time
  expect(regex.test(value)).toBe(true);
});
test('$timestamp', () => {
  const value = pm[Var]('$timestamp');
  expect(typeof value).toBe('number');
});
test('globals read clear', () => {
  expect(globals.test).toBe(undef);
});
test('globals read set', () => {
  postman[Initial]({
    global: {
      test: 'a'
    }
  });
  expect(globals.test).toBe('a');
});
test('globals write', () => {
  expect(() => {
    globals.test = 'a';
  }).toThrow();
});
test('environment read clear', () => {
  expect(environment.test).toBe(undef);
});
test('environment read set', () => {
  postman[Initial]({
    environment: {
      test: 'a'
    }
  });
  expect(environment.test).toBe('a');
});
test('environment write', () => {
  expect(() => {
    environment.test = 'a';
  }).toThrow();
});
test('data read clear', () => {
  postman[Initial]({
    data: []
  });
  postman[Iteration]();
  expect(data.test).toBe(undef);
});
test('data read set', () => {
  postman[Initial]({
    data: [{
      test: 'a'
    }]
  });
  postman[Iteration]();
  expect(data.test).toBe('a');
});
test('data read iterated', () => {
  postman[Initial]({
    data: [{
      test: 'a'
    }, {
      test: 'b'
    }, {
      test: 'c'
    }]
  });
  postman[Iteration]();
  expect(data.test).toBe('a');
  postman[Iteration]();
  expect(data.test).toBe('b');
  postman[Iteration]();
  expect(data.test).toBe('c');
});
test('data write', () => {
  postman[Initial]({
    data: []
  });
  postman[Iteration]();
  expect(() => {
    data.test = 'a';
  }).toThrow();
});
test('postman.getGlobalVariable clear', () => {
  expect(postman.getGlobalVariable('test')).toBe(undef);
});
test('postman.getGlobalVariable set', () => {
  postman[Initial]({
    global: {
      test: 'a'
    }
  });
  expect(postman.getGlobalVariable('test')).toBe('a');
});
test('postman.setGlobalVariable clear', () => {
  expect(globals.test).toBe(undef);
  postman.setGlobalVariable('test', 'a');
  expect(globals.test).toBe('a');
});
test('postman.setGlobalVariable set', () => {
  postman[Initial]({
    global: {
      test: 'a'
    }
  });
  expect(globals.test).toBe('a');
  postman.setGlobalVariable('test', 'b');
  expect(globals.test).toBe('b');
});
test('postman.clearGlobalVariable', () => {
  postman[Initial]({
    global: {
      test: 'a'
    }
  });
  expect(globals.test).toBe('a');
  postman.clearGlobalVariable('test');
  expect(globals.test).toBe(undef);
});
test('postman.clearGlobalVariables', () => {
  postman[Initial]({
    global: {
      test: 'a',
      test2: 'b'
    }
  });
  expect(globals.test).toBe('a');
  expect(globals.test2).toBe('b');
  postman.clearGlobalVariables();
  expect(globals.test).toBe(undef);
  expect(globals.test2).toBe(undef);
});
test('postman.getEnvironmentVariable clear', () => {
  postman[Initial]({
    environment: {}
  });
  expect(postman.getEnvironmentVariable('test')).toBe(undef);
});
test('postman.getEnvironmentVariable requires environment', () => {
  expect(() => {
    postman.getEnvironmentVariable('test');
  }).toThrow('Missing Postman environment');
});
test('postman.getEnvironmentVariable set', () => {
  postman[Initial]({
    environment: {
      test: 'a'
    }
  });
  expect(postman.getEnvironmentVariable('test')).toBe('a');
});
test('postman.setEnvironmentVariable clear', () => {
  postman[Initial]({
    environment: {}
  });
  expect(environment.test).toBe(undef);
  postman.setEnvironmentVariable('test', 'a');
  expect(environment.test).toBe('a');
});
test('postman.setEnvironmentVariable set', () => {
  postman[Initial]({
    environment: {
      test: 'a'
    }
  });
  expect(environment.test).toBe('a');
  postman.setEnvironmentVariable('test', 'b');
  expect(environment.test).toBe('b');
});
test('postman.clearEnvironmentVariable', () => {
  postman[Initial]({
    environment: {
      test: 'a'
    }
  });
  expect(environment.test).toBe('a');
  postman.clearEnvironmentVariable('test');
  expect(environment.test).toBe(undef);
});
test('postman.clearEnvironmentVariables', () => {
  postman[Initial]({
    environment: {
      test: 'a',
      test2: 'b'
    }
  });
  expect(environment.test).toBe('a');
  expect(environment.test2).toBe('b');
  postman.clearEnvironmentVariables();
  expect(environment.test).toBe(undef);
  expect(environment.test2).toBe(undef);
});
test('pm.environment.clear', () => {
  postman[Initial]({
    environment: {
      test: 'a',
      test2: 'b'
    }
  });
  expect(environment.test).toBe('a');
  expect(environment.test2).toBe('b');
  pm.environment.clear();
  expect(environment.test).toBe(undef);
  expect(environment.test2).toBe(undef);
});
test('pm.environment.get clear', () => {
  postman[Initial]({
    environment: {}
  });
  expect(pm.environment.get('test')).toBe(undef);
});
test('pm.environment.get set', () => {
  postman[Initial]({
    environment: {
      test: 'a'
    }
  });
  expect(pm.environment.get('test')).toBe('a');
});
test('pm.environment.has clear', () => {
  postman[Initial]({
    environment: {}
  });
  expect(pm.environment.has('test')).toBe(false);
});
test('pm.environment.has set', () => {
  postman[Initial]({
    environment: {
      test: 'a'
    }
  });
  expect(pm.environment.has('test')).toBe(true);
});
test('pm.environment.set clear', () => {
  postman[Initial]({
    environment: {}
  });
  expect(environment.test).toBe(undef);
  pm.environment.set('test', 'a');
  expect(environment.test).toBe('a');
});
test('pm.environment.set set', () => {
  postman[Initial]({
    environment: {
      test: 'a'
    }
  });
  expect(environment.test).toBe('a');
  pm.environment.set('test', 'b');
  expect(environment.test).toBe('b');
});
test('pm.environment.toObject', () => {
  postman[Initial]({
    environment: {
      test: 'a',
      test2: 'b'
    }
  });
  const values = pm.environment.toObject();
  expect(typeof values).toBe('object');
  expect(values.test).toBe('a');
  expect(values.test2).toBe('b');
});
test('pm.environment.unset', () => {
  postman[Initial]({
    environment: {
      test: 'a'
    }
  });
  expect(environment.test).toBe('a');
  pm.environment.unset('test');
  expect(environment.test).toBe(undef);
});
test('pm.globals.clear', () => {
  postman[Initial]({
    global: {
      test: 'a',
      test2: 'b',
      test3: 'c'
    }
  });
  expect(globals.test).toBe('a');
  expect(globals.test2).toBe('b');
  expect(globals.test3).toBe('c');
  pm.globals.clear();
  expect(globals.test).toBe(undef);
  expect(globals.test2).toBe(undef);
  expect(globals.test3).toBe(undef);
});
test('pm.globals.get clear', () => {
  expect(pm.globals.get('test')).toBe(undef);
});
test('pm.globals.get set', () => {
  postman[Initial]({
    global: {
      test: 'a'
    }
  });
  expect(pm.globals.get('test')).toBe('a');
});
test('pm.globals.has clear', () => {
  expect(pm.globals.has('test')).toBe(false);
});
test('pm.globals.has set', () => {
  postman[Initial]({
    global: {
      test: 'a'
    }
  });
  expect(pm.globals.has('test')).toBe(true);
});
test('pm.globals.set clear', () => {
  expect(globals.test).toBe(undef);
  pm.globals.set('test', 'a');
  expect(globals.test).toBe('a');
});
test('pm.globals.toObject', () => {
  postman[Initial]({
    global: {
      test: 'a',
      test2: 'b'
    }
  });
  const values = pm.globals.toObject();
  expect(typeof values).toBe('object');
  expect(values.test).toBe('a');
  expect(values.test2).toBe('b');
});
test('pm.globals.unset', () => {
  postman[Initial]({
    global: {
      test: 'a'
    }
  });
  expect(globals.test).toBe('a');
  pm.globals.unset('test');
  expect(globals.test).toBe(undef);
});
test('pm.iterationData unavailable', () => {
  expect(pm.iterationData).toBe(undef);
});
test('pm.iterationData.get clear', () => {
  postman[Initial]({
    data: [{}]
  });
  postman[Iteration]();
  expect(pm.iterationData.get('test')).toBe(undef);
});
test('pm.iterationData.get set', () => {
  postman[Initial]({
    data: [{
      test: 'a'
    }]
  });
  postman[Iteration]();
  expect(pm.iterationData.get('test')).toBe('a');
});
test('pm.iterationData.get iterated', () => {
  postman[Initial]({
    data: [{
      test: 'a'
    }, {
      test: 'b'
    }, {
      test: 'c'
    }]
  });
  postman[Iteration]();
  expect(pm.iterationData.get('test')).toBe('a');
  postman[Iteration]();
  expect(pm.iterationData.get('test')).toBe('b');
  postman[Iteration]();
  expect(pm.iterationData.get('test')).toBe('c');
});
test('pm.iterationData.toObject', () => {
  postman[Initial]({
    data: [{
      test: 'a',
      test2: 'b'
    }]
  });
  postman[Iteration]();
  const values = pm.iterationData.toObject();
  expect(typeof values).toBe('object');
  expect(values.test).toBe('a');
  expect(values.test2).toBe('b');
});
test('pm.variables.get clear', () => {
  expect(pm.variables.get('test')).toBe(undef);
});
test('pm.variables.get global', () => {
  postman[Initial]({
    global: {
      test: 'a'
    }
  });
  expect(pm.variables.get('test')).toBe('a');
});
test('pm.variables.get collection', () => {
  postman[Initial]({
    global: {
      test: 'a'
    },
    collection: {
      test: 'b'
    }
  });
  expect(pm.variables.get('test')).toBe('b');
});
test('pm.variables.get environment', () => {
  postman[Initial]({
    global: {
      test: 'a'
    },
    collection: {
      test: 'b'
    },
    environment: {
      test: 'c'
    }
  });
  expect(pm.variables.get('test')).toBe('c');
});
test('pm.variables.get data', () => {
  postman[Initial]({
    global: {
      test: 'a'
    },
    collection: {
      test: 'b'
    },
    environment: {
      test: 'c'
    },
    data: [{
      test: 'd'
    }]
  });
  postman[Iteration]();
  expect(pm.variables.get('test')).toBe('d');
});
test('pm.variables.get data iterated', () => {
  postman[Initial]({
    data: [{
      test: 'a'
    }, {
      test: 'b'
    }, {
      test: 'c'
    }]
  });
  postman[Iteration]();
  postman[Iteration]();
  expect(pm.variables.get('test')).toBe('b');
});
test('pm.variables.get local', () => {
  postman[Initial]({
    global: {
      test: 'a'
    },
    collection: {
      test: 'b'
    },
    environment: {
      test: 'c'
    },
    data: [{
      test: 'd'
    }]
  });
  postman[Iteration]();
  postman[Request]({
    pre() {
      pm.variables.set('test', 'e');
      expect(pm.variables.get('test')).toBe('e');
    }
  });
});
test('pm.variables.set scoped', () => {
  expect(() => {
    pm.variables.set('test', 'a');
  }).toThrow();
});
test('unsupported dynamic variable', () => {
  expect(() => {
    pm[Var]('$unknownDynamic');
  }).toThrow('Unsupported dynamic variable: unknownDynamic');
});
test('pm.variables.set clear', () => {
  postman[Request]({
    pre() {
      expect(pm.variables.get('test')).toBe(undef);
      pm.variables.set('test', 'a');
      expect(pm.variables.get('test')).toBe('a');
    }
  });
});
test('pm.variables.set set', () => {
  postman[Request]({
    pre() {
      pm.variables.set('test', 'a');
      expect(pm.variables.get('test')).toBe('a');
      pm.variables.set('test', 'b');
      expect(pm.variables.get('test')).toBe('b');
    }
  });
});
test('pm.collectionVariables.set scoped', () => {
  expect(() => {
    pm.collectionVariables.set('test', 'a');
  }).toThrow();
});
test('pm.collectionVariables.set clear', () => {
  postman[Request]({
    pre() {
      expect(pm.collectionVariables.get('test')).toBe(undef);
      pm.collectionVariables.set('test', 'a');
      expect(pm.collectionVariables.get('test')).toBe('a');
    }
  });
});
test('pm.collectionVariables.set set', () => {
  postman[Request]({
    pre() {
      pm.collectionVariables.set('test', 'a');
      expect(pm.collectionVariables.get('test')).toBe('a');
      pm.collectionVariables.set('test', 'b');
      expect(pm.collectionVariables.get('test')).toBe('b');
    }
  });
});
test('pm.collectionVariables.clear', () => {
  postman[Request]({
    pre() {
      pm.collectionVariables.set('test', 'a');
      expect(pm.collectionVariables.get('test')).toBe('a');
      pm.collectionVariables.clear();
      expect(pm.collectionVariables.get('test')).toBe(undef);
    }
  });
});
test('pm.collectionVariables.unset', () => {
  postman[Request]({
    pre() {
      pm.collectionVariables.set('test', 'a');
      pm.collectionVariables.set('keep', 'b');
      pm.collectionVariables.unset('test');
      expect(pm.collectionVariables.get('test')).toBe(undef);
      expect(pm.collectionVariables.get('keep')).toBe('b');
    }
  });
});
test('pm[Var] simple', () => {
  postman[Initial]({
    global: {
      test: 'a'
    }
  });
  expect(pm[Var]('test')).toBe('a');
});

test('pm.variables.replaceIn dynamic', () => {
  const result = pm.variables.replaceIn('id={{$guid}}');
  expect(result.startsWith('id=')).toBe(true);
  expect(result.includes('{{')).toBe(false);
});

test('pm.variables.replaceIn passthrough', () => {
  const template = 'no-variables-here';
  expect(pm.variables.replaceIn(template)).toBe(template);
});
test('pm.variables.replaceIn standard variables', () => {
  postman[Initial]({
    global: {
      planet: 'earth'
    }
  });
  expect(pm.variables.replaceIn('hello {{planet}}')).toBe('hello earth');
});
