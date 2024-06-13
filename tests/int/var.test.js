/* eslint-disable space-before-function-paren */

import convertFile from '../../lib/convert/file';

test('global', async () => {
  const [main] = await convertFile('test/material/2/var-global.json', {
    globals: 'test/material/2/globals.json',
  });
  expect(main).toMatchSnapshot();
});

test('collection', async () => {
  const [main] = await convertFile('test/material/2/var-collection.json');
  expect(main).toMatchSnapshot();
});

test('environment', async () => {
  const [main] = await convertFile('test/material/2/var-environment.json', {
    environment: 'test/material/2/environment.json',
  });
  expect(main).toMatchSnapshot();
});

test('data json', async () => {
  const [main] = await convertFile('test/material/2/var-data-json.json', {
    json: 'test/material/2/data-json.json',
  });
  expect(main).toMatchSnapshot();
});

test('data csv', async () => {
  const [main] = await convertFile('test/material/2/var-data-csv.json', {
    csv: 'test/material/2/data-csv.csv',
  });
  expect(main).toMatchSnapshot();
});

test('data custom iterations', async () => {
  const [main] = await convertFile('test/material/2/var-data-json.json', {
    json: 'test/material/2/data-json.json',
    iterations: 27,
  });
  expect(main).toMatchSnapshot();
});

test('address start', async () => {
  const [main] = await convertFile('test/material/2/var-address-start.json');
  expect(main).toMatchSnapshot();
});
