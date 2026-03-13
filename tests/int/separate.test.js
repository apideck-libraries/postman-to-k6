/* eslint-disable space-before-function-paren */

import map from '../../lib/generate/separate/map';
import convertFile from '../../lib/convert/file';

function cleanRequests(requests) {
  return JSON.parse(
    JSON.stringify(requests).replace(/(?=id: )(.*?)(.*?)(?=,)/gm, 'id: \\" \\"')
  );
}

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

test('request --separate', async () => {
  const [main, requests] = await convertFile('test/material/2.1/format-v2.1.json', {
    separate: true,
  });
  expect([main, cleanRequests(requests)]).toMatchSnapshot();
});
