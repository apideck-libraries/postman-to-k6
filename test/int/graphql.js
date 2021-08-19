import test from 'ava';
import convertFile from 'convert/file';

function render(body) {
  const content = JSON.stringify(body);
  const escaped = content.replace(/\\/g, '\\\\');
  return `'${escaped}'`;
}

test('body simple', async t => {
  const [main] = await convertFile(
    'test/material/2.1/graphql-body-simple.json'
  );
  t.snapshot(main);

//   const query =
//     '' +
//     `{
//     user {
//         name
//     }
// }`;
//   const body = { query };
//   t.is(
//     main,
//     `// Auto-generated by the postman-to-k6 converter
//
// import "./libs/shim/core.js";
//
// export let options = { maxRedirects: 4 };
//
// const Request = Symbol.for("request");
// postman[Symbol.for("initial")]({
//   options
// });
//
// export default function() {
//   postman[Request]({
//     name: "Test Request",
//     method: "POST",
//     address: "http://graphql.example.com/",
//     data: ${render(body)}
//   });
// }
// `
//   );
});

test('body var', async t => {
  const [main] = await convertFile('test/material/2.1/graphql-body-var.json');
  t.snapshot(main);

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
//   t.is(
//     main,
//     `// Auto-generated by the postman-to-k6 converter
//
// import "./libs/shim/core.js";
//
// export let options = { maxRedirects: 4 };
//
// const Request = Symbol.for("request");
// postman[Symbol.for("initial")]({
//   options,
//   collection: {
//     userId: "5"
//   }
// });
//
// export default function() {
//   postman[Request]({
//     name: "Test Request",
//     method: "POST",
//     address: "http://graphql.example.com/",
//     data:
//       ${render(body)}
//   });
// }
// `
//   );
});
