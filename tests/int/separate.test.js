/* eslint-disable space-before-function-paren */

import map from '../../lib/generate/separate/map';

test('map', async () => {
  const tree = {
    items: [{ name: 'apple' }, { name: 'apple' }, { name: 'orange' }],
    locations: [
      {
        name: 'setup',
        items: [{ name: 'login' }],
        locations: [],
      },
      {
        name: 'exercise',
        items: [{ name: 'public' }],
        locations: [{ name: 'public.js', items: [], locations: [] }],
      },
    ],
  };
  const result = map(tree);
  expect(result).toStrictEqual({
    'apple.js': { name: 'apple' },
    'apple.A.js': { name: 'apple' },
    'orange.js': { name: 'orange' },
    setup: {
      'login.js': { name: 'login' },
    },
    exercise: {
      'public.js': { name: 'public' },
      'public.js.A': {},
    },
  });
}, 10000);
