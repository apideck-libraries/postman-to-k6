/* global postman pm */
/* global responseCookies */

import { loadShimCore, resetShimState } from '../../helpers/shimHarness';
let k6;
let http;
let harness;
const Request = Symbol.for('request');
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
test('responseCookies', () => {
  const cookie = {
    domain: 'example.com',
    httpOnly: false,
    name: 'Theme',
    path: '/',
    secure: false,
    value: 'Aqua',
  };
  http.request.returns({
    cookies: {
      Theme: [cookie],
    },
  });
  postman[Request]({
    post() {
      expect(responseCookies.length).toBe(1);
      const responseCookie = responseCookies[0];
      for (const key of Object.keys(cookie)) {
        expect(responseCookie[key]).toBe(cookie[key]);
      }
    },
  });
});
test('cookie.hostOnly', () => {
  http.request.returns({
    cookies: {
      Theme: [{}],
    },
  });
  postman[Request]({
    post() {
      expect(() => {
        /* eslint-disable-next-line no-unused-expressions */
        responseCookies[0].hostOnly;
      }).toThrow();
    },
  });
});
test('cookie.session', () => {
  http.request.returns({
    cookies: {
      Theme: [{}],
    },
  });
  postman[Request]({
    post() {
      expect(() => {
        /* eslint-disable-next-line no-unused-expressions */
        responseCookies[0].session;
      }).toThrow();
    },
  });
});
test('cookie.storeId', () => {
  http.request.returns({
    cookies: {
      Theme: [{}],
    },
  });
  postman[Request]({
    post() {
      expect(() => {
        /* eslint-disable-next-line no-unused-expressions */
        responseCookies[0].storeId;
      }).toThrow();
    },
  });
});
test('postman.getResponseCookie', () => {
  const cookie = {
    domain: 'example.com',
    httpOnly: false,
    name: 'Theme',
    path: '/',
    secure: false,
    value: 'Aqua',
  };
  http.request.returns({
    cookies: {
      Theme: [cookie],
    },
  });
  postman[Request]({
    post() {
      const responseCookie = postman.getResponseCookie('Theme');
      expect(typeof responseCookie).toBe('object');
      for (const key of Object.keys(cookie)) {
        expect(responseCookie[key]).toBe(cookie[key]);
      }
    },
  });
});
test('pm.cookies.get clear', () => {
  postman[Request]({
    post() {
      expect(pm.cookies.get('Theme')).toBe(null);
    },
  });
});
test('pm.cookies.get set', () => {
  const cookie = {
    name: 'Theme',
    value: 'Aqua',
  };
  http.request.returns({
    cookies: {
      Theme: [cookie],
    },
  });
  postman[Request]({
    post() {
      expect(pm.cookies.get('Theme')).toBe('Aqua');
    },
  });
});
test('pm.cookies.has clear', () => {
  postman[Request]({
    post() {
      expect(pm.cookies.has('Theme')).toBe(false);
    },
  });
});
test('pm.cookies.has set', () => {
  http.request.returns({
    cookies: {
      Theme: [
        {
          name: 'Theme',
        },
      ],
    },
  });
  postman[Request]({
    post() {
      expect(pm.cookies.has('Theme')).toBe(true);
    },
  });
});
test('pm.cookies.toObject', () => {
  http.request.returns({
    cookies: {
      Theme: [
        {
          name: 'Theme',
          value: 'Aqua',
        },
      ],
      Session: [
        {
          name: 'Session',
          value: 'abc123',
        },
      ],
    },
  });
  postman[Request]({
    post() {
      expect(pm.cookies.toObject()).toEqual({
        Theme: 'Aqua',
        Session: 'abc123',
      });
    },
  });
});
