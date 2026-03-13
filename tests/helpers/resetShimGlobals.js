const RESETTABLE_GLOBALS = [
  'postman',
  'pm',
  'tests',
  'request',
  'responseCookies',
  'responseBody',
  'responseCode',
  'responseHeaders',
  'responseTime',
  'environment',
  'globals',
  'data',
  'iteration',
  'xml2Json',
  'xmlToJson',
];

const LEGACY_GLOBAL_BINDINGS = RESETTABLE_GLOBALS.join(', ');

function ensureLegacyBindingsDeclared() {
  // These test files reference globals as bare identifiers (AVA style).
  // Create mutable global bindings so Jest can resolve them.
  global.eval(`var ${LEGACY_GLOBAL_BINDINGS};`);
}

function syncLegacyBindingsFromGlobalObject() {
  if (!globalThis.postman) {
    try {
      jest.isolateModules(() => {
        require('shim/core');
      });
    } catch (error) {
      // Some suites do not load shim/core; ignore bootstrap failures there.
    }
  }
  for (const name of RESETTABLE_GLOBALS) {
    global.eval(`${name} = globalThis.${name};`);
  }
}

function clearLegacyBindings() {
  for (const name of RESETTABLE_GLOBALS) {
    global.eval(`${name} = undefined;`);
  }
}

function createAvaLikeAssertions() {
  return {
    is(actual, expected) {
      expect(actual).toBe(expected);
    },
    deepEqual(actual, expected) {
      expect(actual).toEqual(expected);
    },
    true(value) {
      expect(value).toBe(true);
    },
    false(value) {
      expect(value).toBe(false);
    },
    throws(fn) {
      expect(fn).toThrow();
    },
    notThrows(fn) {
      expect(fn).not.toThrow();
    },
    snapshot(value) {
      expect(value).toMatchSnapshot();
    },
    pass() {
      expect(true).toBe(true);
    },
    fail() {
      throw new Error('Expected failure');
    },
    plan() {
      // AVA plan does not have a Jest equivalent; keep as compatibility no-op.
    },
  };
}

const originalTest = global.test;
function avaCompatTest(name, fn, timeout) {
  if (typeof fn !== 'function') {
    return originalTest(name, fn, timeout);
  }
  return originalTest(
    name,
    async () => {
      syncLegacyBindingsFromGlobalObject();
      return fn(createAvaLikeAssertions());
    },
    timeout
  );
}
avaCompatTest.only = (name, fn, timeout) =>
  originalTest.only(
    name,
    async () => {
      syncLegacyBindingsFromGlobalObject();
      return fn(createAvaLikeAssertions());
    },
    timeout
  );
avaCompatTest.skip = originalTest.skip.bind(originalTest);
avaCompatTest.todo = originalTest.todo.bind(originalTest);
avaCompatTest.serial = avaCompatTest;
global.test = avaCompatTest;

ensureLegacyBindingsDeclared();
beforeEach(() => {
  syncLegacyBindingsFromGlobalObject();
});

afterEach(() => {
  clearLegacyBindings();
});
