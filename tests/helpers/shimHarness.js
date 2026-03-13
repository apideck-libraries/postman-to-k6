const Reset = Symbol.for('reset');

function loadShimCore(extraMocks = []) {
  jest.resetModules();

  jest.doMock('k6', () => require('../../test/stub/k6.jest'));
  jest.doMock('k6/http', () => require('../../test/stub/http.jest'));

  for (const [name, factory] of extraMocks) {
    jest.doMock(name, factory);
  }

  let k6;
  let http;

  jest.isolateModules(() => {
    k6 = require('k6');
    http = require('k6/http');
    require('../../lib/shim/core');
  });

  return { k6, http, Reset, postman: global.postman, pm: global.pm };
}

function resetShimState(harness) {
  if (harness && harness.k6 && typeof harness.k6[Reset] === 'function') {
    harness.k6[Reset]();
  }
  if (harness && harness.http && typeof harness.http[Reset] === 'function') {
    harness.http[Reset]();
  }
  if (global.postman && typeof global.postman[Reset] === 'function') {
    global.postman[Reset]();
  }
}

module.exports = {
  loadShimCore,
  resetShimState,
};
