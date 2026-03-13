import { Auth } from 'generate/separate/sym';

let map;

function designate(name, container, generators, suffix = '') {
  return name + suffix;
}

beforeAll(() => {
  jest.doMock('../../../../../lib/generate/separate/map/designate.js', () => designate);
  map = require('../../../../../lib/generate/separate/map/index.js');
});

test('empty', () => {
  const tree = { items: [], locations: [] };
  const result = map(tree);
  expect(result).toEqual({});
});

test('1 item', () => {
  const tree = {
    items: [{ name: 'apple' }],
    locations: []
  };
  const result = map(tree);
  expect(result).toEqual({
    'apple.js': { name: 'apple' }
  });
});

test('3 items', () => {
  const tree = {
    items: [{ name: 'apple' }, { name: 'orange' }, { name: 'pear' }],
    locations: []
  };
  const result = map(tree);
  expect(result).toEqual({
    'apple.js': { name: 'apple' },
    'orange.js': { name: 'orange' },
    'pear.js': { name: 'pear' }
  });
});

test('1 location', () => {
  const tree = {
    items: [],
    locations: [{ name: 'setup', items: [], locations: [] }]
  };
  const result = map(tree);
  expect(result).toEqual({ setup: {} });
});

test('3 locations', () => {
  const tree = {
    items: [],
    locations: [
      { name: 'setup', items: [], locations: [] },
      { name: 'exercise', items: [], locations: [] },
      { name: 'cleanup', items: [], locations: [] }
    ]
  };
  const result = map(tree);
  expect(result).toEqual({
    setup: {},
    exercise: {},
    cleanup: {}
  });
});

test('auth', () => {
  const auth = Symbol('auth');
  const tree = {
    auth,
    items: [],
    locations: []
  };
  const result = map(tree);
  expect(result).toEqual({ [Auth]: auth });
});

test('nested item', () => {
  const tree = {
    items: [],
    locations: [
      {
        name: 'exercise',
        items: [{ name: 'home' }],
        locations: []
      }
    ]
  };
  const result = map(tree);
  expect(result).toEqual({
    exercise: {
      'home.js': { name: 'home' }
    }
  });
});

test('nested location', () => {
  const tree = {
    items: [],
    locations: [
      {
        name: 'exercise',
        items: [],
        locations: [{ name: 'public', items: [], locations: [] }]
      }
    ]
  };
  const result = map(tree);
  expect(result).toEqual({
    exercise: {
      public: {}
    }
  });
});
