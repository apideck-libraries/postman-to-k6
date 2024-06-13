/* eslint-disable space-before-function-paren */

import convertFile from '../../lib/convert/file';

test('k6 handle-summary json', async () => {
  const options = {
    k6HandleSummary: {
      json: 'k6-handle-summary.json',
    },
  };
  const [main] = await convertFile('test/material/2/request.json', options);
  expect(main).toMatchSnapshot();
});
