/* eslint-disable space-before-function-paren */
import convertFile from '../../lib/convert/file';

test('pre request', async () => {
  const [main] = await convertFile('test/material/2/pre-request.json');
  expect(main).toMatchSnapshot();
});

test('pre collection', async () => {
  const [main] = await convertFile('test/material/2/pre-collection.json');
  expect(main).toMatchSnapshot();
});

test('pre folder', async () => {
  const [main] = await convertFile('test/material/2/pre-folder.json');
  expect(main).toMatchSnapshot();
});

test('pre nested', async () => {
  const [main] = await convertFile('test/material/2/pre-nested.json');
  expect(main).toMatchSnapshot();
});

test('pre request --skip-pre', async () => {
  const options = {
    skip: {
      pre: true,
    },
  };
  const [main] = await convertFile('test/material/2/pre-request.json', options);
  expect(main).toMatchSnapshot();
});

test('pre collection --skip-pre', async () => {
  const options = {
    skip: {
      pre: true,
    },
  };
  const [main] = await convertFile(
    'test/material/2/pre-collection.json',
    options
  );
  expect(main).toMatchSnapshot();
});

test('pre folder --skip-pre', async () => {
  const options = {
    skip: {
      pre: true,
    },
  };
  const [main] = await convertFile('test/material/2/pre-folder.json', options);
  expect(main).toMatchSnapshot();
});

test('pre nested --skip-pre', async () => {
  const options = {
    skip: {
      pre: true,
    },
  };
  const [main] = await convertFile('test/material/2/pre-nested.json', options);
  expect(main).toMatchSnapshot();
});

test('post request', async () => {
  const [main] = await convertFile('test/material/2/post-request.json');
  expect(main).toMatchSnapshot();
});

test('post collection', async () => {
  const [main] = await convertFile('test/material/2/post-collection.json');
  expect(main).toMatchSnapshot();
});

test('post folder', async () => {
  const [main] = await convertFile('test/material/2/post-folder.json');
  expect(main).toMatchSnapshot();
});

test('post nested', async () => {
  const [main] = await convertFile('test/material/2/post-nested.json');
  expect(main).toMatchSnapshot();
});

test('post request --skip-pre', async () => {
  const options = {
    skip: {
      post: true,
    },
  };
  const [main] = await convertFile(
    'test/material/2/post-request.json',
    options
  );
  expect(main).toMatchSnapshot();
});

test('post collection --skip-pre', async () => {
  const options = {
    skip: {
      post: true,
    },
  };
  const [main] = await convertFile(
    'test/material/2/post-collection.json',
    options
  );
  expect(main).toMatchSnapshot();
});

test('post folder --skip-pre', async () => {
  const options = {
    skip: {
      post: true,
    },
  };
  const [main] = await convertFile('test/material/2/post-folder.json', options);
  expect(main).toMatchSnapshot();
});

test('post nested --skip-pre', async () => {
  const options = {
    skip: {
      post: true,
    },
  };
  const [main] = await convertFile('test/material/2/post-nested.json', options);
  expect(main).toMatchSnapshot();
});
