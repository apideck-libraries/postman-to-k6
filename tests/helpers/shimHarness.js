const Reset = Symbol.for('reset');

function loadShimCore(options = {}) {
  const {
    extraMocks = [],
    preloadModules = [],
    withGlobalRequire = false,
  } = options;

  jest.resetModules();
  jest.clearAllMocks();

  jest.doMock('k6', () => jest.requireActual('../../test/stub/k6'));
  jest.doMock('k6/http', () => jest.requireActual('../../test/stub/http'));

  for (const [name, factory, mockOptions] of extraMocks) {
    if (mockOptions) {
      jest.doMock(name, factory, mockOptions);
      continue;
    }
    jest.doMock(name, factory);
  }

  const hadGlobalRequire = Object.prototype.hasOwnProperty.call(
    global,
    'require'
  );
  const previousGlobalRequire = global.require;
  if (withGlobalRequire) {
    global.require = require;
  }

  let k6;
  let http;

  jest.isolateModules(() => {
    k6 = require('k6');
    http = require('k6/http');
    require('../../lib/shim/core');
    for (const modulePath of preloadModules) {
      require(modulePath);
    }
  });

  return {
    k6,
    http,
    Reset,
    postman: global.postman,
    pm: global.pm,
    withGlobalRequire,
    hadGlobalRequire,
    previousGlobalRequire,
  };
}

function resetShimState(harness) {
  if (harness?.k6 && typeof harness.k6[Reset] === 'function') {
    harness.k6[Reset]();
  }
  if (harness?.http && typeof harness.http[Reset] === 'function') {
    harness.http[Reset]();
  }
  if (global.postman && typeof global.postman[Reset] === 'function') {
    global.postman[Reset]();
  }
  if (harness?.withGlobalRequire) {
    if (harness.hadGlobalRequire) {
      global.require = harness.previousGlobalRequire;
    } else {
      // biome-ignore lint/performance/noDelete: preserve property presence semantics for test harness cleanup
      delete global.require;
    }
  }
}

module.exports = {
  loadShimCore,
  resetShimState,
};
