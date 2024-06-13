/* eslint-disable space-before-function-paren */

import convertFile from '../../lib/convert/file';

test('v1', async () => {
  const [main] = await convertFile('test/material/1/format-v1.json');
  expect(main).toMatchSnapshot();
});

test('v2', async () => {
  const [main] = await convertFile('test/material/2/format-v2.json');
  expect(main).toMatchSnapshot();
});

test('v2.1', async () => {
  const [main] = await convertFile('test/material/2.1/format-v2.1.json');
  expect(main).toMatchSnapshot();
});
