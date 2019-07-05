/* eslint-disable no-template-curly-in-string */

import test from 'ava'
import convertFile from 'convert/file'

test('minimal', async t => {
  const result = await convertFile('test/material/2/minimal.json')
  t.is(result, `// No HTTP/HTTPS transactions have been recorded`)
})

test('request', async t => {
  const result = await convertFile('test/material/2/request.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com"
  });
}
`)
})

test('raw body', async t => {
  const result = await convertFile('test/material/2/body-raw.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "POST",
    address: "http://example.com",
    data: "line1\\nline2\\nline3\\n"
  });
}
`)
})

test('form body', async t => {
  const result = await convertFile('test/material/2/body-form.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "POST",
    address: "http://example.com",
    data: { first: "one", second: "two", third: "three" }
  });
}
`)
})

test('url body', async t => {
  const result = await convertFile('test/material/2/body-url.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "POST",
    address: "http://example.com",
    data: { first: "one", second: "two", third: "three" },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
`)
})

test('no body alternate', async t => {
  const result = await convertFile('test/material/2.1/no-body-alternate.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com"
  });
}
`)
})

test('iterations', async t => {
  const result = await convertFile('test/material/2/request.json', {
    iterations: 25
  })
  t.is(result, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4, iterations: 25 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com"
  });
}
`)
})

test('graphql', async t => {
  const result = await convertFile('test/material/2.1/graphql.json')

  t.is(result, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import "./libs/shim/expect.js";
import { group } from "k6";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  group("graphql", function() {
    postman[Request]({
      name: "GET /graphql",
      method: "GET",
      address:
        "http://test.com/graphql?query=exampleQuery&operationName=ExampleGraphQLQuery&variables={}",
      headers: {
        "Content-Type": "application/json"
      },
      post(response) {
        pm.test("Status code is 200", function() {
          pm.response.to.have.status(200);
        });

        pm.test("Response time is less than 900ms", function() {
          pm.expect(pm.response.responseTime).to.be.below(900);
        });
      }
    });

    postman[Request]({
      name: "POST /graphql",
      method: "POST",
      address: "http://test.com/graphql/",
      data: {
        query: "testQuery",
        variables: '{\\n  "name": "example",\\n  "example": "test"\\n}'
      },
      headers: {
        "Content-Type": "application/json"
      },
      post(response) {
        pm.test("Status code is 200", function() {
          pm.response.to.have.status(200);
        });

        pm.test("Response time is less than 900ms", function() {
          pm.expect(pm.response.responseTime).to.be.below(900);
        });
      }
    });
  });
}
`)
})

