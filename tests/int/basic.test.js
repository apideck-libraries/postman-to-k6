/* eslint-disable space-before-function-paren */
import convertFile from '../../lib/convert/file';

test('minimal', async () => {
  const [main] = await convertFile('test/material/2/minimal.json');
  expect(main).toBe('// No HTTP/HTTPS transactions have been recorded');
});

test('request', async () => {
  const [main] = await convertFile('test/material/2/request.json');
  expect(main).toMatchSnapshot();
});

test('raw body', async () => {
  const [main] = await convertFile('test/material/2/body-raw.json');
  expect(main).toMatchSnapshot();
});

test('form body text', async () => {
  const [main] = await convertFile('test/material/2/body-form.json');
  expect(main).toMatchSnapshot();
});

test('form body file', async () => {
  const [main] = await convertFile('test/material/2.1/upload.json');
  expect(main).toMatchSnapshot();
});

test('url body', async () => {
  const [main] = await convertFile('test/material/2/body-url.json');
  expect(main).toMatchSnapshot();
});

test('no body alternate', async () => {
  const [main] = await convertFile('test/material/2.1/no-body-alternate.json');
  expect(main).toMatchSnapshot();
});

test('iterations', async () => {
  const [main] = await convertFile('test/material/2/request.json', {
    iterations: 25,
  });
  expect(main).toMatchSnapshot();
});
