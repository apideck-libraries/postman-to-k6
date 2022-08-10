import test from 'ava';
import convertFile from 'convert/file';

test('cheerio --separate', async t => {
  const options = {
    separate: true,
  };
  const [main, requests] = await convertFile(
    'test/material/2.1/echo-cheerio.json',
    options
  );
  // remove changing ID from requests
  const requestsClean = JSON.parse(
    JSON.stringify(requests).replace(/(?=id: )(.*?)(.*?)(?=,)/gm, `id: \\" \\"`)
  );
  t.snapshot([main, requestsClean]);
});

test('CryptoJS --separate', async t => {
  const options = {
    separate: true,
  };
  const [main, requests] = await convertFile(
    'test/material/2.1/echo-crypto.json',
    options
  );
  // remove changing ID from requests
  const requestsClean = JSON.parse(
    JSON.stringify(requests).replace(/(?=id: )(.*?)(.*?)(?=,)/gm, `id: \\" \\"`)
  );
  t.snapshot([main, requestsClean]);
});

test('moment --separate', async t => {
  const options = {
    separate: true,
  };
  const [main, requests] = await convertFile(
    'test/material/2.1/echo-moment.json',
    options
  );
  // remove changing ID from requests
  const requestsClean = JSON.parse(
    JSON.stringify(requests).replace(/(?=id: )(.*?)(.*?)(?=,)/gm, `id: \\" \\"`)
  );
  t.snapshot([main, requestsClean]);
});

test('lodash --separate', async t => {
  const options = {
    separate: true,
  };
  const [main, requests] = await convertFile(
    'test/material/2.1/echo-lodash.json',
    options
  );
  // remove changing ID from requests
  const requestsClean = JSON.parse(
    JSON.stringify(requests).replace(/(?=id: )(.*?)(.*?)(?=,)/gm, `id: \\" \\"`)
  );
  t.snapshot([main, requestsClean]);
});

test('xml2json --separate', async t => {
  const options = {
    separate: true,
  };
  const [main, requests] = await convertFile(
    'test/material/2.1/echo-xml2json.json',
    options
  );
  // remove changing ID from requests
  const requestsClean = JSON.parse(
    JSON.stringify(requests).replace(/(?=id: )(.*?)(.*?)(?=,)/gm, `id: \\" \\"`)
  );
  t.snapshot([main, requestsClean]);
});
