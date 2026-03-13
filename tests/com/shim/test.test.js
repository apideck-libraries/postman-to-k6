/* global postman pm tests */
/* eslint-disable no-unused-expressions */

import path from 'path';
import { loadShimCore, resetShimState } from '../../helpers/shimHarness';
let k6, http;
let harness;
const Request = Symbol.for('request');
function expectFail() {
  k6.check.callsFake((response, tests) => {
    expect(tests.test(response)).toBe(false);
  });
}
function expectPass() {
  k6.check.callsFake((response, tests) => {
    expect(tests.test(response)).toBe(true);
  });
}
function define(logic) {
  postman[Request]({
    post() {
      pm.test('test', logic);
    }
  });
}
beforeAll(() => {
  harness = loadShimCore({
    extraMocks: [
      [path.resolve(__dirname, '../../../lib/ajv.js'), () => require('ajv'), { virtual: true }],
      [path.resolve(__dirname, '../../../lib/chai.js'), () => require('chai'), { virtual: true }]
    ],
    preloadModules: ['../../lib/shim/jsonSchema', '../../lib/shim/expect']
  });
  ({ k6, http } = harness);
});
afterEach(() => {
  resetShimState(harness);
});
test('tests', () => {
  postman[Request]({
    post() {
      Object.assign(tests, {
        first: true,
        second: false,
        third: true
      });
    }
  });
  expect(k6.check.calledThrice).toBe(true);
  const call1 = k6.check.getCall(0).args[1];
  expect('first' in call1).toBe(true);
  expect(call1.first()).toBe(true);
  const call2 = k6.check.getCall(1).args[1];
  expect('second' in call2).toBe(true);
  expect(call2.second()).toBe(false);
  const call3 = k6.check.getCall(2).args[1];
  expect('third' in call3).toBe(true);
  expect(call3.third()).toBe(true);
});
test('pm.test', () => {
  expectPass();
  define(() => {});
});
test('pm.response.to.be.accepted fail', () => {
  http.request.returns({
    status: 200
  });
  expectFail();
  define(() => {
    pm.response.to.be.accepted;
  });
});
test('pm.response.to.be.accepted pass', () => {
  http.request.returns({
    status: 202
  });
  expectPass();
  define(() => {
    pm.response.to.be.accepted;
  });
});
test('pm.response.to.be.badRequest fail', () => {
  http.request.returns({
    status: 476
  });
  expectFail();
  define(() => {
    pm.response.to.be.badRequest;
  });
});
test('pm.response.to.be.badRequest pass', () => {
  http.request.returns({
    status: 400
  });
  expectPass();
  define(() => {
    pm.response.to.be.badRequest;
  });
});
test('pm.response.to.be.clientError fail', () => {
  http.request.returns({
    status: 100
  });
  expectFail();
  define(() => {
    pm.response.to.be.clientError;
  });
});
test('pm.response.to.be.clientError pass', () => {
  http.request.returns({
    status: 473
  });
  expectPass();
  define(() => {
    pm.response.to.be.clientError;
  });
});
test('pm.response.to.be.error fail', () => {
  http.request.returns({
    status: 100
  });
  expectFail();
  define(() => {
    pm.response.to.be.error;
  });
});
test('pm.response.to.be.error 4xx', () => {
  http.request.returns({
    status: 498
  });
  expectPass();
  define(() => {
    pm.response.to.be.error;
  });
});
test('pm.response.to.be.error 5xx', () => {
  http.request.returns({
    status: 543
  });
  expectPass();
  define(() => {
    pm.response.to.be.error;
  });
});
test('pm.response.to.be.forbidden fail', () => {
  http.request.returns({
    status: 400
  });
  expectFail();
  define(() => {
    pm.response.to.be.forbidden;
  });
});
test('pm.response.to.be.forbidden pass', () => {
  http.request.returns({
    status: 403
  });
  expectPass();
  define(() => {
    pm.response.to.be.forbidden;
  });
});
test('pm.response.to.be.info fail', () => {
  http.request.returns({
    status: 200
  });
  expectFail();
  define(() => {
    pm.response.to.be.info;
  });
});
test('pm.response.to.be.info pass', () => {
  http.request.returns({
    status: 156
  });
  expectPass();
  define(() => {
    pm.response.to.be.info;
  });
});
test('pm.response.to.be.notFound fail', () => {
  http.request.returns({
    status: 400
  });
  expectFail();
  define(() => {
    pm.response.to.be.notFound;
  });
});
test('pm.response.to.be.notFound pass', () => {
  http.request.returns({
    status: 404
  });
  expectPass();
  define(() => {
    pm.response.to.be.notFound;
  });
});
test('pm.response.to.be.ok fail', () => {
  http.request.returns({
    status: 202
  });
  expectFail();
  define(() => {
    pm.response.to.be.ok;
  });
});
test('pm.response.to.be.ok pass', () => {
  http.request.returns({
    status: 200
  });
  expectPass();
  define(() => {
    pm.response.to.be.ok;
  });
});
test('pm.response.to.be.rateLimited fail', () => {
  http.request.returns({
    status: 400
  });
  expectFail();
  define(() => {
    pm.response.to.be.rateLimited;
  });
});
test('pm.response.to.be.rateLimited pass', () => {
  http.request.returns({
    status: 429
  });
  expectPass();
  define(() => {
    pm.response.to.be.rateLimited;
  });
});
test('pm.response.to.be.redirection fail', () => {
  http.request.returns({
    status: 100
  });
  expectFail();
  define(() => {
    pm.response.to.be.redirection;
  });
});
test('pm.response.to.be.redirection pass', () => {
  http.request.returns({
    status: 344
  });
  expectPass();
  define(() => {
    pm.response.to.be.redirection;
  });
});
test('pm.response.to.be.serverError fail', () => {
  http.request.returns({
    status: 100
  });
  expectFail();
  define(() => {
    pm.response.to.be.serverError;
  });
});
test('pm.response.to.be.serverError pass', () => {
  http.request.returns({
    status: 523
  });
  expectPass();
  define(() => {
    pm.response.to.be.serverError;
  });
});
test('pm.response.to.be.success fail', () => {
  http.request.returns({
    status: 100
  });
  expectFail();
  define(() => {
    pm.response.to.be.success;
  });
});
test('pm.response.to.be.success pass', () => {
  http.request.returns({
    status: 275
  });
  expectPass();
  define(() => {
    pm.response.to.be.success;
  });
});
test('pm.response.to.be.unauthorized fail', () => {
  http.request.returns({
    status: 400
  });
  expectFail();
  define(() => {
    pm.response.to.be.unauthorized;
  });
});
test('pm.response.to.be.unauthorized pass', () => {
  http.request.returns({
    status: 401
  });
  expectPass();
  define(() => {
    pm.response.to.be.unauthorized;
  });
});
test('pm.response.to.have.body exist fail', () => {
  http.request.returns({});
  expectFail();
  define(() => {
    pm.response.to.have.body();
  });
});
test('pm.response.to.have.body exist pass', () => {
  http.request.returns({
    body: 'Response body'
  });
  expectPass();
  define(() => {
    pm.response.to.have.body();
  });
});
test('pm.response.to.have.body string fail', () => {
  http.request.returns({
    body: 'Response body'
  });
  expectFail();
  define(() => {
    pm.response.to.have.body('Body');
  });
});
test('pm.response.to.have.body string pass', () => {
  http.request.returns({
    body: 'Response body'
  });
  expectPass();
  define(() => {
    pm.response.to.have.body('Response body');
  });
});
test('pm.response.to.have.body regex fail', () => {
  http.request.returns({
    body: 'Response body'
  });
  expectFail();
  define(() => {
    pm.response.to.have.body(/Test/);
  });
});
test('pm.response.to.have.body regex pass', () => {
  http.request.returns({
    body: 'Response body'
  });
  expectPass();
  define(() => {
    pm.response.to.have.body(/body/);
  });
});
test('pm.response.to.have.header exist fail', () => {
  expectFail();
  define(() => {
    pm.response.to.have.header('Allow');
  });
});
test('pm.response.to.have.header exist pass', () => {
  http.request.returns({
    headers: {
      Allow: 'GET'
    }
  });
  expectPass();
  define(() => {
    pm.response.to.have.header('Allow');
  });
});
test('pm.response.to.have.header value fail', () => {
  http.request.returns({
    headers: {
      Allow: 'GET'
    }
  });
  expectFail();
  define(() => {
    pm.response.to.have.header('Allow', 'POST');
  });
});
test('pm.response.to.have.header value pass', () => {
  http.request.returns({
    headers: {
      Allow: 'GET'
    }
  });
  expectPass();
  define(() => {
    pm.response.to.have.header('Allow', 'GET');
  });
});
test('pm.response.to.have.jsonBody exist fail', () => {
  http.request.returns({
    body: 'not a json body'
  });
  expectFail();
  define(() => {
    pm.response.to.have.jsonBody();
  });
});
test('pm.response.to.have.jsonBody exist pass', () => {
  http.request.returns({
    body: '{"test":"a","test2":"b"}'
  });
  expectPass();
  define(() => {
    pm.response.to.have.jsonBody();
  });
});
test('pm.response.to.have.jsonBody equal fail', () => {
  http.request.returns({
    body: '{"test":"a","test2":"b"}'
  });
  expectFail();
  define(() => {
    pm.response.to.have.jsonBody({
      test: 'a'
    });
  });
});
test('pm.response.to.have.jsonBody equal pass', () => {
  http.request.returns({
    body: '{"test":"a","test2":"b"}'
  });
  expectPass();
  define(() => {
    pm.response.to.have.jsonBody({
      test: 'a',
      test2: 'b'
    });
  });
});
test('pm.response.to.have.jsonBody path fail', () => {
  http.request.returns({
    body: '{"test":"a"}'
  });
  expectFail();
  define(() => {
    pm.response.to.have.jsonBody('test2');
  });
});
test('pm.response.to.have.jsonBody path pass', () => {
  http.request.returns({
    body: '{"test":"a","test2":"b"}'
  });
  expectPass();
  define(() => {
    pm.response.to.have.jsonBody('test2');
  });
});
test('pm.response.to.have.jsonBody value fail', () => {
  http.request.returns({
    body: '{"test":"a"}'
  });
  expectFail();
  define(() => {
    pm.response.to.have.jsonBody('test', 'b');
  });
});
test('pm.response.to.have.jsonBody value pass', () => {
  http.request.returns({
    body: '{"test":"a"}'
  });
  expectPass();
  define(() => {
    pm.response.to.have.jsonBody('test', 'a');
  });
});
test('pm.response.to.have.jsonSchema fail', () => {
  http.request.returns({
    body: '{"test":"a"}'
  });
  expectFail();
  const schema = {
    properties: {
      test: {
        type: 'integer'
      }
    }
  };
  define(() => {
    pm.response.to.have.jsonSchema(schema);
  });
});
test('pm.response.to.have.jsonSchema pass', () => {
  http.request.returns({
    body: '{"test":7}'
  });
  expectPass();
  const schema = {
    properties: {
      test: {
        type: 'integer'
      }
    }
  };
  define(() => {
    pm.response.to.have.jsonSchema(schema);
  });
});
test('pm.response.to.have.status invalid', () => {
  define(() => {
    expect(() => {
      pm.response.to.have.status(null);
    }).toThrow();
  });
});
test('pm.response.to.have.status string', () => {
  define(() => {
    expect(() => {
      pm.response.to.have.status('OK');
    }).toThrow();
  });
});
test('pm.response.to.have.status fail', () => {
  http.request.returns({
    status: 404
  });
  expectFail();
  define(() => {
    pm.response.to.have.status(200);
  });
});
test('pm.response.to.have.status pass', () => {
  http.request.returns({
    status: 200
  });
  expectPass();
  define(() => {
    pm.response.to.have.status(200);
  });
});
test('pm.response.to.not.be.accepted fail', () => {
  http.request.returns({
    status: 202
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.accepted;
  });
});
test('pm.response.to.not.be.accepted pass', () => {
  http.request.returns({
    status: 200
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.accepted;
  });
});
test('pm.response.to.not.be.badRequest fail', () => {
  http.request.returns({
    status: 400
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.badRequest;
  });
});
test('pm.response.to.not.be.badRequest pass', () => {
  http.request.returns({
    status: 401
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.badRequest;
  });
});
test('pm.response.to.not.be.clientError fail', () => {
  http.request.returns({
    status: 434
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.clientError;
  });
});
test('pm.response.to.not.be.clientError pass', () => {
  http.request.returns({
    status: 100
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.clientError;
  });
});
test('pm.response.to.not.be.error 4xx', () => {
  http.request.returns({
    status: 487
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.error;
  });
});
test('pm.response.to.not.be.error 5xx', () => {
  http.request.returns({
    status: 523
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.error;
  });
});
test('pm.response.to.not.be.error pass', () => {
  http.request.returns({
    status: 200
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.error;
  });
});
test('pm.response.to.not.be.forbidden fail', () => {
  http.request.returns({
    status: 403
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.forbidden;
  });
});
test('pm.response.to.not.be.forbidden pass', () => {
  http.request.returns({
    status: 400
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.forbidden;
  });
});
test('pm.response.to.not.be.info fail', () => {
  http.request.returns({
    status: 156
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.info;
  });
});
test('pm.response.to.not.be.info pass', () => {
  http.request.returns({
    status: 200
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.info;
  });
});
test('pm.response.to.not.be.notFound fail', () => {
  http.request.returns({
    status: 404
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.notFound;
  });
});
test('pm.response.to.not.be.notFound pass', () => {
  http.request.returns({
    status: 400
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.notFound;
  });
});
test('pm.response.to.not.be.ok fail', () => {
  http.request.returns({
    status: 200
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.ok;
  });
});
test('pm.response.to.not.be.ok pass', () => {
  http.request.returns({
    status: 202
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.ok;
  });
});
test('pm.response.to.not.be.rateLimited fail', () => {
  http.request.returns({
    status: 429
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.rateLimited;
  });
});
test('pm.response.to.not.be.rateLimited pass', () => {
  http.request.returns({
    status: 400
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.rateLimited;
  });
});
test('pm.response.to.not.be.redirection fail', () => {
  http.request.returns({
    status: 387
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.redirection;
  });
});
test('pm.response.to.not.be.redirection pass', () => {
  http.request.returns({
    status: 100
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.redirection;
  });
});
test('pm.response.to.not.be.serverError fail', () => {
  http.request.returns({
    status: 584
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.serverError;
  });
});
test('pm.response.to.not.be.serverError pass', () => {
  http.request.returns({
    status: 100
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.serverError;
  });
});
test('pm.response.to.not.be.success fail', () => {
  http.request.returns({
    status: 254
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.success;
  });
});
test('pm.response.to.not.be.success pass', () => {
  http.request.returns({
    status: 100
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.success;
  });
});
test('pm.response.to.not.be.unauthorized fail', () => {
  http.request.returns({
    status: 401
  });
  expectFail();
  define(() => {
    pm.response.to.not.be.unauthorized;
  });
});
test('pm.response.to.not.be.unauthorized pass', () => {
  http.request.returns({
    status: 400
  });
  expectPass();
  define(() => {
    pm.response.to.not.be.unauthorized;
  });
});
test('pm.response.to.not.have.body exist fail', () => {
  http.request.returns({
    body: 'Response body'
  });
  expectFail();
  define(() => {
    pm.response.to.not.have.body();
  });
});
test('pm.response.to.not.have.body exist pass', () => {
  http.request.returns({});
  expectPass();
  define(() => {
    pm.response.to.not.have.body();
  });
});
test('pm.response.to.not.have.body string fail', () => {
  http.request.returns({
    body: 'Response body'
  });
  expectFail();
  define(() => {
    pm.response.to.not.have.body('Response body');
  });
});
test('pm.response.to.not.have.body string pass', () => {
  http.request.returns({
    body: 'Response body'
  });
  expectPass();
  define(() => {
    pm.response.to.not.have.body('Body');
  });
});
test('pm.response.to.not.have.body regex fail', () => {
  http.request.returns({
    body: 'Response body'
  });
  expectFail();
  define(() => {
    pm.response.to.not.have.body(/body/);
  });
});
test('pm.response.to.not.have.body regex pass', () => {
  http.request.returns({
    body: 'Response body'
  });
  expectPass();
  define(() => {
    pm.response.to.not.have.body(/Test/);
  });
});
test('pm.response.to.not.have.header exist fail', () => {
  http.request.returns({
    headers: {
      Allow: 'GET'
    }
  });
  expectFail();
  define(() => {
    pm.response.to.not.have.header('Allow');
  });
});
test('pm.response.to.not.have.header exist pass', () => {
  http.request.returns({
    headers: {
      Server: 'MasterControlProgram'
    }
  });
  expectPass();
  define(() => {
    pm.response.to.not.have.header('Allow');
  });
});
test('pm.response.to.not.have.header value fail', () => {
  http.request.returns({
    headers: {
      Server: 'MasterControlProgram'
    }
  });
  expectFail();
  define(() => {
    // do not deal with evil programs
    pm.response.to.not.have.header('Server', 'MasterControlProgram');
  });
});
test('pm.response.to.not.have.header value pass clear', () => {
  expectPass();
  define(() => {
    pm.response.to.not.have.header('Server', 'MasterControlProgram');
  });
});
test('pm.response.to.not.have.header value pass set', () => {
  http.request.returns({
    headers: {
      Server: 'AlanHome'
    }
  });
  expectPass();
  define(() => {
    pm.response.to.not.have.header('Server', 'MasterControlProgram');
  });
});
test('pm.response.to.not.have.jsonBody exist fail', () => {
  http.request.returns({
    body: '{"test":"a"}'
  });
  expectFail();
  define(() => {
    pm.response.to.not.have.jsonBody();
  });
});
test('pm.response.to.not.have.jsonBody exist pass', () => {
  http.request.returns({
    body: 'Response body'
  });
  expectPass();
  define(() => {
    pm.response.to.not.have.jsonBody();
  });
});
test('pm.response.to.not.have.jsonBody equal fail', () => {
  http.request.returns({
    body: '{"test":"a"}'
  });
  expectFail();
  define(() => {
    pm.response.to.not.have.jsonBody({
      test: 'a'
    });
  });
});
test('pm.response.to.not.have.jsonBody equal pass', () => {
  http.request.returns({
    body: '{"test":"b"}'
  });
  expectPass();
  define(() => {
    pm.response.to.not.have.jsonBody({
      test: 'a'
    });
  });
});
test('pm.response.to.not.have.jsonBody path fail', () => {
  http.request.returns({
    body: '{"test":"a","test2":"b"}'
  });
  expectFail();
  define(() => {
    pm.response.to.not.have.jsonBody('test2');
  });
});
test('pm.response.to.not.have.jsonBody path pass', () => {
  http.request.returns({
    body: '{"test":"a"}'
  });
  expectPass();
  define(() => {
    pm.response.to.not.have.jsonBody('test2');
  });
});
test('pm.response.to.not.have.jsonBody value fail', () => {
  http.request.returns({
    body: '{"test":"a"}'
  });
  expectFail();
  define(() => {
    pm.response.to.not.have.jsonBody('test', 'a');
  });
});
test('pm.response.to.not.have.jsonBody value pass', () => {
  http.request.returns({
    body: '{"test":"a"}'
  });
  expectPass();
  define(() => {
    pm.response.to.not.have.jsonBody('test', 'b');
  });
});
test('pm.response.to.not.have.jsonSchema fail', () => {
  http.request.returns({
    body: '{"test":7}'
  });
  expectFail();
  const schema = {
    properties: {
      test: {
        type: 'integer'
      }
    }
  };
  define(() => {
    pm.response.to.not.have.jsonSchema(schema);
  });
});
test('pm.response.to.not.have.jsonSchema pass', () => {
  http.request.returns({
    body: '{"test":"a"}'
  });
  expectPass();
  const schema = {
    properties: {
      test: {
        type: 'integer'
      }
    }
  };
  define(() => {
    pm.response.to.not.have.jsonSchema(schema);
  });
});
test('pm.response.to.not.have.status invalid', () => {
  define(() => {
    expect(() => {
      pm.response.to.not.have.status(null);
    }).toThrow();
  });
});
test('pm.response.to.not.have.status string', () => {
  define(() => {
    expect(() => {
      pm.response.to.not.have.status('OK');
    }).toThrow();
  });
});
test('pm.response.to.not.have.status fail', () => {
  http.request.returns({
    status: 576
  });
  expectFail();
  define(() => {
    pm.response.to.not.have.status(576);
  });
});
test('pm.response.to.not.have.status pass', () => {
  http.request.returns({
    status: 500
  });
  expectPass();
  define(() => {
    pm.response.to.not.have.status(576);
  });
});
test('pm.expect fail', () => {
  expectFail();
  define(() => {
    pm.expect('Response body').to.include('Test');
  });
});
test('pm.expect pass', () => {
  expectPass();
  define(() => {
    pm.expect('Response body').to.include('Response');
  });
});
