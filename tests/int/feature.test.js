import convertFile from '../../lib/convert/file';

function cleanRequests(requests) {
  return JSON.parse(
    JSON.stringify(requests).replace(/(?=id: )(.*?)(.*?)(?=,)/gm, 'id: \\" \\"')
  );
}

async function expectSeparateSnapshot(materialFile) {
  const [main, requests] = await convertFile(materialFile, { separate: true });
  expect([main, cleanRequests(requests)]).toMatchSnapshot();
}

test('cheerio --separate', async () => {
  await expectSeparateSnapshot('test/material/2.1/echo-cheerio.json');
});

test('CryptoJS --separate', async () => {
  await expectSeparateSnapshot('test/material/2.1/echo-crypto.json');
});

test('moment --separate', async () => {
  await expectSeparateSnapshot('test/material/2.1/echo-moment.json');
});

test('lodash --separate', async () => {
  await expectSeparateSnapshot('test/material/2.1/echo-lodash.json');
});

test('xml2json --separate', async () => {
  await expectSeparateSnapshot('test/material/2.1/echo-xml2json.json');
});
