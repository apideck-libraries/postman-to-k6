# Snapshot report for `test/int/handlesummary.js`

The actual snapshot is saved in `handlesummary.js.snap`.

Generated by [AVA](https://ava.li).

## k6 handle-summary json

> Snapshot 1

    `// Auto-generated by the postman-to-k6 converter␊
    ␊
    import "./libs/shim/core.js";␊
    ␊
    export let options = { maxRedirects: 4 };␊
    ␊
    const Request = Symbol.for("request");␊
    postman[Symbol.for("initial")]({␊
      options␊
    });␊
    ␊
    export function handleSummary(data) {␊
      console.log("Preparing the end-of-test summary: ");␊
      return {␊
        "k6-handle-summary.json": JSON.stringify(data)␊
      };␊
    }␊
    ␊
    export default function() {␊
      postman[Request]({␊
        name: "TestRequest",␊
        method: "GET",␊
        address: "http://example.com/"␊
      });␊
    }␊
    `
