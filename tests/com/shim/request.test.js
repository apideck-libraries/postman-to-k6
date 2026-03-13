/* global postman pm request */

import { loadShimCore, resetShimState } from '../../helpers/shimHarness';
import uuidv4 from 'uuid/v4';
let k6, http;
let harness;
const undef = void 0; /* eslint-disable-line no-void */

const Initial = Symbol.for('initial');
const Request = Symbol.for('request');
beforeAll(() => {
  harness = loadShimCore();
  ({ k6, http } = harness);
});
afterEach(() => {
  resetShimState(harness);
});
test('pre', () => {
  postman[Request]({
    pre() {
      expect(true).toBe(true);
    }
  });
});
test('post', () => {
  postman[Request]({
    post() {
      expect(true).toBe(true);
    }
  });
});
test('request', () => {
  expect(request).toBe(undef);
  postman[Request]({
    pre() {
      expect(typeof request).toBe('object');
    },
    post() {
      expect(typeof request).toBe('object');
    }
  });
  expect(request).toBe(undef);
});
test('request.data', () => {
  const data = {
    First: 'One',
    Second: 'Two',
    Third: 'Three'
  };
  postman[Request]({
    data,
    pre() {
      expect(request.data).toEqual(data);
    }
  });
});
test('request.headers', () => {
  const headers = {
    First: 'One',
    Second: 'Two',
    Third: 'Three'
  };
  postman[Request]({
    headers,
    pre() {
      expect(request.headers).toEqual(headers);
    }
  });
});
test('request.id', () => {
  const id = uuidv4();
  postman[Request]({
    id,
    pre() {
      expect(request.id).toBe(id);
    }
  });
});
test('request.method', () => {
  postman[Request]({
    method: 'get',
    pre() {
      expect(request.method).toBe('GET');
    }
  });
});
test('request.name', () => {
  postman[Request]({
    name: 'Test Request',
    pre() {
      expect(request.name).toBe('Test Request');
    }
  });
});
test('request.url', () => {
  postman[Request]({
    address: 'http://example.com',
    pre() {
      expect(request.url).toBe('http://example.com');
    }
  });
});
test('pm.request.headers', () => {
  postman[Request]({
    headers: {
      marco: 'polo',
      foo: 'bar'
    },
    pre() {
      expect(pm.request.headers).toEqual([{
        key: 'marco',
        value: 'polo'
      }, {
        key: 'foo',
        value: 'bar'
      }]);
    }
  });
});
test('pm.request.method', () => {
  postman[Request]({
    method: 'POST',
    pre() {
      expect(pm.request.method).toEqual('POST');
    }
  });
});
test('pm.request.id', () => {
  const input = '33d2dd9f-e4fc-46fb-9885-df53f1b2310b';
  postman[Request]({
    id: input,
    pre() {
      expect(pm.request.id).toEqual(input);
    }
  });
});
test('pm.request.name', () => {
  const input = 'Postman request name';
  postman[Request]({
    name: input,
    pre() {
      expect(pm.request.name).toEqual(input);
    }
  });
});
test('pm.request.auth', () => {
  postman[Request]({
    pre() {
      expect(pm.request.auth).toEqual(undefined);
    },
    auth(config, Var) {
      config.headers.Authorization = 'Bearer access_token';
      config.options.auth = 'bearer';
    }
  });
});
test('pm.request.body', () => {
  const bodyRaw = '{\n    "booleanVar": true,\n    "dynVar": "{{$randomCity}}",\n    "numberVar": 12345,\n    "stringVar": "my-tax"\n}';
  postman[Request]({
    data: bodyRaw,
    pre() {
      expect(pm.request.body).toEqual({
        mode: 'raw',
        raw: bodyRaw
      });
    }
  });
});
test('pm.request.body.raw', () => {
  const bodyRaw = '{\n    "booleanVar": true,\n    "dynVar": "{{$randomCity}}",\n    "numberVar": 12345,\n    "stringVar": "my-tax"\n}';
  postman[Request]({
    data: bodyRaw,
    pre() {
      expect(pm.request.body.raw).toEqual(bodyRaw);
    }
  });
});
test('pm.request.body.urlencoded', () => {
  const bodyUrlencoded = {
    booleanVar: true,
    dynVar: '{{$randomCity}}',
    numberVar: 12345,
    stringVar: 'my-tax'
  };
  postman[Request]({
    data: bodyUrlencoded,
    pre() {
      expect(pm.request.body.urlencoded).toEqual([{
        key: 'booleanVar',
        value: true
      }, {
        key: 'dynVar',
        value: '{{$randomCity}}'
      }, {
        key: 'numberVar',
        value: 12345
      }, {
        key: 'stringVar',
        value: 'my-tax'
      }]);
    }
  });
});
test('pm.request.url', () => {
  postman[Request]({
    address: 'http://127.0.0.1:4010/widget/:id?name=widget1&type=small#section2',
    pre() {
      expect(pm.request.url).toEqual({
        fragment: 'section2',
        host: ['127', '0', '0', '1'],
        path: ['widget', ':id'],
        port: '4010',
        protocol: 'http',
        query: [{
          key: 'name',
          value: 'widget1'
        }, {
          key: 'type',
          value: 'small'
        }],
        variable: ['id']
      });
    }
  });
});
test('variable', () => {
  postman[Initial]({
    global: {
      domain: 'example.com',
      path: '/index.html'
    }
  });
  postman[Request]({
    address: 'http://{{domain}}{{path}}'
  });
  expect(http.request.calledOnce).toBe(true);
  const args = http.request.firstCall.args;
  expect(args[1]).toBe('http://example.com/index.html');
});
test('args', () => {
  postman[Request]({
    method: 'GET',
    address: 'http://example.com',
    data: {
      test: 'a',
      test2: 'b'
    },
    headers: {
      Test: 'a',
      Test2: 'b'
    },
    options: {
      auth: 'basic'
    }
  });
  expect(http.request.calledOnce).toBe(true);
  const args = http.request.firstCall.args;
  expect(args[0]).toBe('GET');
  expect(args[1]).toBe('http://example.com');
  expect(args[2]).toEqual({
    test: 'a',
    test2: 'b'
  });
  expect(args[3]).toEqual({
    auth: 'basic',
    headers: {
      Test: 'a',
      Test2: 'b'
    }
  });
});
test('pm.sendRequest', () => {
  expect(() => {
    pm.sendRequest();
  }).toThrow();
});
test('request.body.raw', () => {
  const rawBody = JSON.stringify({
    key1: 'value1',
    key2: 'value2'
  });
  postman[Request]({
    method: 'POST',
    address: 'http://example.com',
    data: rawBody,
    pre() {
      expect(request.body).toBe(rawBody);
    }
  });
  expect(http.request.calledOnce).toBe(true);
  const args = http.request.firstCall.args;
  expect(args[0]).toBe('POST');
  expect(args[1]).toBe('http://example.com');
  expect(args[2]).toBe(rawBody);
});
