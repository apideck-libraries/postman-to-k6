import test from 'ava';
import map from 'generate/separate/map';
import convertFile from 'convert/file';

test('map', t => {
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
  t.deepEqual(result, {
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
});

test('request --separate', async t => {
  const options = {
    separate: true,
  };
  const main = await convertFile('test/material/2.1/format-v2.1.json', options);
  t.snapshot(main);
});
