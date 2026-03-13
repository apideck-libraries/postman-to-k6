/* eslint-disable space-before-function-paren */

import convertFile from '../../lib/convert/file';
function render(body) {
  const content = JSON.stringify(body);
  const escaped = content.replace(/\\/g, '\\\\');
  return `'${escaped}'`;
}
test('body simple', async () => {
  const [main] = await convertFile(
    'test/material/2.1/graphql-body-simple.json'
  );
  expect(main).toMatchSnapshot();

  //   const query =
  //     '' +
  //     `{
  //     user {
  //         name
  //     }
  // }`;
  //   const body = { query };
});
test('body var', async () => {
  const [main] = await convertFile('test/material/2.1/graphql-body-var.json');
  expect(main).toMatchSnapshot();

  //   const query =
  //     '' +
  //     `query UserName($id: UserId) {
  //     user(id: $id) {
  //         name
  //     }
  // }`;
  //   const variables =
  //     '' +
  //     `{
  // \t"id": "{{userId}}"
  // }`;
  //   const body = { query, variables };
});
