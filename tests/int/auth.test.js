/* eslint-disable space-before-function-paren */

import convertFile from '../../lib/convert/file';

test('noauth', async () => {
  const [main] = await convertFile('test/material/2/noauth.json');
  expect(main).toMatchSnapshot();
});

test('basic', async () => {
  const [main] = await convertFile('test/material/2/basic.json');
  expect(main).toMatchSnapshot();
});

test('bearer', async () => {
  const [main] = await convertFile('test/material/2/bearer.json');
  expect(main).toMatchSnapshot();
});

test('digest', async () => {
  const [main] = await convertFile('test/material/2/digest.json');
  expect(main).toMatchSnapshot();
});

test('ntlm', async () => {
  const [main] = await convertFile('test/material/2/ntlm.json');
  expect(main).toMatchSnapshot();
});

test('awsv4', async () => {
  const [main] = await convertFile('test/material/2/awsv4.json');
  expect(main).toMatchSnapshot();
});

test('oauth1 header sha1', async () => {
  const [main] = await convertFile('test/material/2/oauth1-header-sha1.json');
  expect(main).toMatchSnapshot();
});

test('oauth1 header sha256', async () => {
  const [main] = await convertFile('test/material/2/oauth1-header-sha256.json');
  expect(main).toMatchSnapshot();
});

test('oauth1 header text', async () => {
  const [main] = await convertFile('test/material/2/oauth1-header-text.json');
  expect(main).toMatchSnapshot();
});

test('oauth1 body', async () => {
  const [main] = await convertFile('test/material/2/oauth1-body.json');
  expect(main).toMatchSnapshot();
});

test('oauth1 address', async () => {
  const [main] = await convertFile('test/material/2/oauth1-address.json');
  expect(main).toMatchSnapshot();
});

test('oauth2 header', async () => {
  const [main] = await convertFile('test/material/2/oauth2-header.json');
  expect(main).toMatchSnapshot();
});

test('oauth2 address', async () => {
  const [main] = await convertFile('test/material/2/oauth2-address.json');
  expect(main).toMatchSnapshot();
});

test('inherit collection', async () => {
  const [main] = await convertFile('test/material/2/inherit-collection.json');
  expect(main).toMatchSnapshot();
});

test('inherit folder', async () => {
  const [main] = await convertFile('test/material/2/inherit-folder.json');
  expect(main).toMatchSnapshot();
});

test('inherit nested', async () => {
  const [main] = await convertFile('test/material/2/inherit-nested.json');
  expect(main).toMatchSnapshot();
});

test('apikey', async () => {
  const [main] = await convertFile('test/material/2/apikey.json');
  expect(main).toMatchSnapshot();
});
