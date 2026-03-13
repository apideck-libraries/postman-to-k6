/* global postman pm */
/* global responseCookies */

import mockRequire from 'mock-require';

let k6, http;

const Reset = Symbol.for('reset');
const Request = Symbol.for('request');

beforeAll(() => {
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

test('responseCookies', t => {
  const cookie = {
    domain: 'example.com',
    httpOnly: false,
    name: 'Theme',
    path: '/',
    secure: false,
    value: 'Aqua',
  };
  http.request.returns({ cookies: { Theme: [cookie] } });
  postman[Request]({
    post() {
      t.is(responseCookies.length, 1);
      const responseCookie = responseCookies[0];
      for (const key of Object.keys(cookie)) {
        t.is(responseCookie[key], cookie[key]);
      }
    },
  });
});

test('cookie.hostOnly', t => {
  http.request.returns({ cookies: { Theme: [{}] } });
  postman[Request]({
    post() {
      t.throws(() => {
        /* eslint-disable-next-line no-unused-expressions */
        responseCookies[0].hostOnly;
      });
    },
  });
});

test('cookie.session', t => {
  http.request.returns({ cookies: { Theme: [{}] } });
  postman[Request]({
    post() {
      t.throws(() => {
        /* eslint-disable-next-line no-unused-expressions */
        responseCookies[0].session;
      });
    },
  });
});

test('cookie.storeId', t => {
  http.request.returns({ cookies: { Theme: [{}] } });
  postman[Request]({
    post() {
      t.throws(() => {
        /* eslint-disable-next-line no-unused-expressions */
        responseCookies[0].storeId;
      });
    },
  });
});

test('postman.getResponseCookie', t => {
  const cookie = {
    domain: 'example.com',
    httpOnly: false,
    name: 'Theme',
    path: '/',
    secure: false,
    value: 'Aqua',
  };
  http.request.returns({ cookies: { Theme: [cookie] } });
  postman[Request]({
    post() {
      const responseCookie = postman.getResponseCookie('Theme');
      t.is(typeof responseCookie, 'object');
      for (const key of Object.keys(cookie)) {
        t.is(responseCookie[key], cookie[key]);
      }
    },
  });
});

test('pm.cookies.get clear', t => {
  postman[Request]({
    post() {
      t.is(pm.cookies.get('Theme'), null);
    },
  });
});

test('pm.cookies.get set', t => {
  const cookie = { name: 'Theme', value: 'Aqua' };
  http.request.returns({ cookies: { Theme: [cookie] } });
  postman[Request]({
    post() {
      t.is(pm.cookies.get('Theme'), 'Aqua');
    },
  });
});

test('pm.cookies.has clear', t => {
  postman[Request]({
    post() {
      t.false(pm.cookies.has('Theme'));
    },
  });
});

test('pm.cookies.has set', t => {
  http.request.returns({ cookies: { Theme: [{ name: 'Theme' }] } });
  postman[Request]({
    post() {
      t.true(pm.cookies.has('Theme'));
    },
  });
});

test('pm.cookies.toObject', t => {
  http.request.returns({
    cookies: {
      Theme: [{ name: 'Theme', value: 'Aqua' }],
      Session: [{ name: 'Session', value: 'abc123' }],
    },
  });
  postman[Request]({
    post() {
      t.deepEqual(pm.cookies.toObject(), {
        Theme: 'Aqua',
        Session: 'abc123',
      });
    },
  });
});
