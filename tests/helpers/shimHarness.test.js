const { resetShimState } = require('./shimHarness');

describe('shimHarness', () => {
  let previousPostman;
  let hadOwnRequire;
  let previousRequire;

  beforeEach(() => {
    previousPostman = global.postman;
    hadOwnRequire = Object.prototype.hasOwnProperty.call(global, 'require');
    previousRequire = global.require;
  });

  afterEach(() => {
    if (previousPostman === undefined) {
      delete global.postman;
    } else {
      global.postman = previousPostman;
    }

    if (hadOwnRequire) {
      global.require = previousRequire;
    } else {
      delete global.require;
    }
  });

  test('resetShimState calls reset hooks on k6/http/postman', () => {
    const spyK6Reset = jest.fn();
    const spyHttpReset = jest.fn();
    const spyPostmanReset = jest.fn();
    const resetSymbol = Symbol.for('reset');

    global.postman = { [resetSymbol]: spyPostmanReset };
    resetShimState({
      k6: { [resetSymbol]: spyK6Reset },
      http: { [resetSymbol]: spyHttpReset },
    });

    expect(spyK6Reset).toHaveBeenCalledTimes(1);
    expect(spyHttpReset).toHaveBeenCalledTimes(1);
    expect(spyPostmanReset).toHaveBeenCalledTimes(1);
  });

  test('resetShimState restores previous global.require when it existed', () => {
    const originalRequire = () => 'original';
    global.require = originalRequire;
    global.require = require;

    resetShimState({
      withGlobalRequire: true,
      hadGlobalRequire: true,
      previousGlobalRequire: originalRequire,
    });
    expect(global.require).toBe(originalRequire);
  });

  test('resetShimState removes injected global.require when it did not exist before', () => {
    const injectedRequire = () => 'injected';
    global.require = injectedRequire;

    resetShimState({
      withGlobalRequire: true,
      hadGlobalRequire: false,
      previousGlobalRequire: undefined,
    });

    expect(Object.prototype.hasOwnProperty.call(global, 'require')).toBe(false);
  });
});
