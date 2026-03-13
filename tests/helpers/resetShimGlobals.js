const RESETTABLE_GLOBALS = [
  'postman',
  'pm',
  'tests',
  'request',
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
  return originalTest(name, async () => fn(createAvaLikeAssertions()), timeout);
}
avaCompatTest.only = (name, fn, timeout) =>
  originalTest.only(name, async () => fn(createAvaLikeAssertions()), timeout);
avaCompatTest.skip = originalTest.skip.bind(originalTest);
avaCompatTest.todo = originalTest.todo.bind(originalTest);
avaCompatTest.serial = avaCompatTest;
global.test = avaCompatTest;

afterEach(() => {
  for (const name of RESETTABLE_GLOBALS) {
    if (Object.prototype.hasOwnProperty.call(global, name)) {
      delete global[name];
    }
  }
});
