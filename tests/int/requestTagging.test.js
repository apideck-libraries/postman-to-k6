/* eslint-disable space-before-function-paren */

import convertFile from '../../lib/convert/file';

test('request --k6-request-tagging=request', async () => {
  const options = {
    k6RequestTagging: 'request',
  };
  const [main] = await convertFile('test/material/2/request.json', options);
  expect(main).toMatchSnapshot();
});

test('request --k6-request-tagging=folder-request', async () => {
  const options = {
    k6RequestTagging: 'folder-request',
  };
  const [main] = await convertFile('test/material/2/request.json', options);
  expect(main).toMatchSnapshot();
});

test('request no request-tagging', async () => {
  const options = {
    k6RequestTagging: '',
  };
  const [main] = await convertFile('test/material/2/request.json', options);
  expect(main).toMatchSnapshot();
});

test('folder request --k6-request-tagging=request', async () => {
  const options = {
    k6RequestTagging: 'request',
  };
  const [main] = await convertFile(
    'test/material/2/inherit-folder.json',
    options
  );
  expect(main).toMatchSnapshot();
});

test('folder request --k6-request-tagging=folder-request', async () => {
  const options = {
    k6RequestTagging: 'folder-request',
  };
  const [main] = await convertFile(
    'test/material/2/inherit-folder.json',
    options
  );
  expect(main).toMatchSnapshot();
});

test('folder request no request-tagging', async () => {
  const options = {
    k6RequestTagging: '',
  };
  const [main] = await convertFile(
    'test/material/2/inherit-folder.json',
    options
  );
  expect(main).toMatchSnapshot();
});

test('request separate --k6-request-tagging=request', async () => {
  const options = {
    separate: true,
    k6RequestTagging: 'request',
  };
  const [main, requests] = await convertFile(
    'test/material/2/request.json',
    options
  );
  // remove ID from requests
  let lines = requests['TestRequest.js'].split('\n');
  lines.splice(2, 1);
  requests['TestRequest.js'] = lines.join('\n');
  expect(requests).toMatchSnapshot();
});

test('request separate --k6-request-tagging=folder-request', async () => {
  const options = {
    separate: true,
    k6RequestTagging: 'folder-request',
  };
  const [main, requests] = await convertFile(
    'test/material/2/request.json',
    options
  );
  // remove ID from requests
  let lines = requests['TestRequest.js'].split('\n');
  lines.splice(2, 1);
  requests['TestRequest.js'] = lines.join('\n');
  expect(requests).toMatchSnapshot();
});

test('request separate no request-tagging', async () => {
  const options = {
    separate: true,
    k6RequestTagging: '',
  };
  const [main, requests] = await convertFile(
    'test/material/2/request.json',
    options
  );
  // remove ID from requests
  let lines = requests['TestRequest.js'].split('\n');
  lines.splice(2, 1);
  requests['TestRequest.js'] = lines.join('\n');
  expect(requests).toMatchSnapshot();
});

test('folder request separate --k6-request-tagging=request', async () => {
  const options = {
    separate: true,
    k6RequestTagging: 'request',
  };
  const [main, requests] = await convertFile(
    'test/material/2/inherit-folder.json',
    options
  );
  // remove ID from requests
  let lines = requests['TestFolder']['TestRequest.js'].split('\n');
  lines.splice(2, 1);
  requests['TestFolder']['TestRequest.js'] = lines.join('\n');
  expect(requests).toMatchSnapshot();
});

test('folder request separate --k6-request-tagging=folder-request', async () => {
  const options = {
    separate: true,
    k6RequestTagging: 'folder-request',
  };
  const [main, requests] = await convertFile(
    'test/material/2/inherit-folder.json',
    options
  );
  // remove ID from requests
  let lines = requests['TestFolder']['TestRequest.js'].split('\n');
  lines.splice(2, 1);
  requests['TestFolder']['TestRequest.js'] = lines.join('\n');
  expect(requests).toMatchSnapshot();
});

test('folder request separate no request-tagging', async () => {
  const options = {
    separate: true,
    k6RequestTagging: '',
  };
  const [main, requests] = await convertFile(
    'test/material/2/inherit-folder.json',
    options
  );
  // remove ID from requests
  let lines = requests['TestFolder']['TestRequest.js'].split('\n');
  lines.splice(2, 1);
  requests['TestFolder']['TestRequest.js'] = lines.join('\n');
  expect(requests).toMatchSnapshot();
});
