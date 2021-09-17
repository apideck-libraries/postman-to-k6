/* eslint-disable no-template-curly-in-string */

import test from 'ava';
import convertFile from 'convert/file';

test('request --request-tagging=request', async t => {
  const options = {
    requestTagging: 'request',
  };
  const [main] = await convertFile('test/material/2/request.json', options);
  t.snapshot(main);
});

test('request --request-tagging=folder-request', async t => {
  const options = {
    requestTagging: 'folder-request',
  };
  const [main] = await convertFile('test/material/2/request.json', options);
  t.snapshot(main);
});

test('request no request-tagging', async t => {
  const options = {
    requestTagging: '',
  };
  const [main] = await convertFile('test/material/2/request.json', options);
  t.snapshot(main);
});

test('folder request --request-tagging=request', async t => {
  const options = {
    requestTagging: 'request',
  };
  const [main] = await convertFile(
    'test/material/2/inherit-folder.json',
    options
  );
  t.snapshot(main);
});

test('folder request --request-tagging=folder-request', async t => {
  const options = {
    requestTagging: 'folder-request',
  };
  const [main] = await convertFile(
    'test/material/2/inherit-folder.json',
    options
  );
  t.snapshot(main);
});

test('folder request no request-tagging', async t => {
  const options = {
    requestTagging: '',
  };
  const [main] = await convertFile(
    'test/material/2/inherit-folder.json',
    options
  );
  t.snapshot(main);
});
