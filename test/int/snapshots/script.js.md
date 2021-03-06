# Snapshot report for `test/int/script.js`

The actual snapshot is saved in `script.js.snap`.

Generated by [AVA](https://ava.li).

## post collection

> Snapshot 1

    `// Auto-generated by the postman-to-k6 converter␊
    ␊
    import "./libs/shim/core.js";␊
    ␊
    export let options = { maxRedirects: 4 };␊
    ␊
    const Post = Symbol.for("post");␊
    const Request = Symbol.for("request");␊
    postman[Symbol.for("initial")]({␊
      options␊
    });␊
    ␊
    export default function() {␊
      postman[Post].push(() => {␊
        pm.variables.set("test", "a");␊
        pm.variables.set("test", "b");␊
        pm.variables.set("test", "c");␊
      });␊
    ␊
      postman[Request]({␊
        name: "TestRequest",␊
        method: "GET",␊
        address: "http://example.com/"␊
      });␊
    ␊
      postman[Post].pop();␊
    }␊
    `

## post collection --skip-pre

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
    export default function() {␊
      postman[Request]({␊
        name: "TestRequest",␊
        method: "GET",␊
        address: "http://example.com/"␊
      });␊
    }␊
    `

## post folder

> Snapshot 1

    `// Auto-generated by the postman-to-k6 converter␊
    ␊
    import "./libs/shim/core.js";␊
    import { group } from "k6";␊
    ␊
    export let options = { maxRedirects: 4 };␊
    ␊
    const Post = Symbol.for("post");␊
    const Request = Symbol.for("request");␊
    postman[Symbol.for("initial")]({␊
      options␊
    });␊
    ␊
    export default function() {␊
      group("TestFolder", function() {␊
        postman[Post].push(() => {␊
          pm.variables.set("test", "a");␊
          pm.variables.set("test", "b");␊
          pm.variables.set("test", "c");␊
        });␊
    ␊
        postman[Request]({␊
          name: "TestRequest",␊
          method: "GET",␊
          address: "http://example.com/"␊
        });␊
    ␊
        postman[Post].pop();␊
      });␊
    }␊
    `

## post folder --skip-pre

> Snapshot 1

    `// Auto-generated by the postman-to-k6 converter␊
    ␊
    import "./libs/shim/core.js";␊
    import { group } from "k6";␊
    ␊
    export let options = { maxRedirects: 4 };␊
    ␊
    const Request = Symbol.for("request");␊
    postman[Symbol.for("initial")]({␊
      options␊
    });␊
    ␊
    export default function() {␊
      group("TestFolder", function() {␊
        postman[Request]({␊
          name: "TestRequest",␊
          method: "GET",␊
          address: "http://example.com/"␊
        });␊
      });␊
    }␊
    `

## post nested

> Snapshot 1

    `// Auto-generated by the postman-to-k6 converter␊
    ␊
    import "./libs/shim/core.js";␊
    import { group } from "k6";␊
    ␊
    export let options = { maxRedirects: 4 };␊
    ␊
    const Post = Symbol.for("post");␊
    const Request = Symbol.for("request");␊
    postman[Symbol.for("initial")]({␊
      options␊
    });␊
    ␊
    export default function() {␊
      group("TestFolder", function() {␊
        postman[Post].push(() => {␊
          pm.variables.set("test", "a");␊
        });␊
    ␊
        group("TestFolder2", function() {␊
          postman[Post].push(() => {␊
            pm.variables.set("test", "b");␊
          });␊
    ␊
          group("TestFolder3", function() {␊
            postman[Post].push(() => {␊
              pm.variables.set("test", "c");␊
            });␊
    ␊
            postman[Request]({␊
              name: "TestRequest",␊
              method: "GET",␊
              address: "http://example.com/"␊
            });␊
    ␊
            postman[Post].pop();␊
          });␊
    ␊
          postman[Post].pop();␊
        });␊
    ␊
        postman[Post].pop();␊
      });␊
    }␊
    `

## post nested --skip-pre

> Snapshot 1

    `// Auto-generated by the postman-to-k6 converter␊
    ␊
    import "./libs/shim/core.js";␊
    import { group } from "k6";␊
    ␊
    export let options = { maxRedirects: 4 };␊
    ␊
    const Request = Symbol.for("request");␊
    postman[Symbol.for("initial")]({␊
      options␊
    });␊
    ␊
    export default function() {␊
      group("TestFolder", function() {␊
        group("TestFolder2", function() {␊
          group("TestFolder3", function() {␊
            postman[Request]({␊
              name: "TestRequest",␊
              method: "GET",␊
              address: "http://example.com/"␊
            });␊
          });␊
        });␊
      });␊
    }␊
    `

## post request

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
    export default function() {␊
      postman[Request]({␊
        name: "TestRequest",␊
        method: "GET",␊
        address: "http://example.com/",␊
        post(response) {␊
          pm.variables.set("test", "a");␊
          pm.variables.set("test", "b");␊
          pm.variables.set("test", "c");␊
        }␊
      });␊
    }␊
    `

## post request --skip-pre

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
    export default function() {␊
      postman[Request]({␊
        name: "TestRequest",␊
        method: "GET",␊
        address: "http://example.com/"␊
      });␊
    }␊
    `

## pre collection

> Snapshot 1

    `// Auto-generated by the postman-to-k6 converter␊
    ␊
    import "./libs/shim/core.js";␊
    ␊
    export let options = { maxRedirects: 4 };␊
    ␊
    const Pre = Symbol.for("pre");␊
    const Request = Symbol.for("request");␊
    postman[Symbol.for("initial")]({␊
      options␊
    });␊
    ␊
    export default function() {␊
      postman[Pre].push(() => {␊
        pm.variables.set("test", "a");␊
        pm.variables.set("test2", "b");␊
        pm.variables.set("test3", "c");␊
      });␊
    ␊
      postman[Request]({␊
        name: "TestRequest",␊
        method: "GET",␊
        address: "http://example.com/"␊
      });␊
    ␊
      postman[Pre].pop();␊
    }␊
    `

## pre collection --skip-pre

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
    export default function() {␊
      postman[Request]({␊
        name: "TestRequest",␊
        method: "GET",␊
        address: "http://example.com/"␊
      });␊
    }␊
    `

## pre folder

> Snapshot 1

    `// Auto-generated by the postman-to-k6 converter␊
    ␊
    import "./libs/shim/core.js";␊
    import { group } from "k6";␊
    ␊
    export let options = { maxRedirects: 4 };␊
    ␊
    const Pre = Symbol.for("pre");␊
    const Request = Symbol.for("request");␊
    postman[Symbol.for("initial")]({␊
      options␊
    });␊
    ␊
    export default function() {␊
      group("TestFolder", function() {␊
        postman[Pre].push(() => {␊
          pm.variables.set("test", "a");␊
          pm.variables.set("test2", "b");␊
          pm.variables.set("test3", "c");␊
        });␊
    ␊
        postman[Request]({␊
          name: "TestRequest",␊
          method: "GET",␊
          address: "http://example.com/"␊
        });␊
    ␊
        postman[Pre].pop();␊
      });␊
    }␊
    `

## pre folder --skip-pre

> Snapshot 1

    `// Auto-generated by the postman-to-k6 converter␊
    ␊
    import "./libs/shim/core.js";␊
    import { group } from "k6";␊
    ␊
    export let options = { maxRedirects: 4 };␊
    ␊
    const Request = Symbol.for("request");␊
    postman[Symbol.for("initial")]({␊
      options␊
    });␊
    ␊
    export default function() {␊
      group("TestFolder", function() {␊
        postman[Request]({␊
          name: "TestRequest",␊
          method: "GET",␊
          address: "http://example.com/"␊
        });␊
      });␊
    }␊
    `

## pre nested

> Snapshot 1

    `// Auto-generated by the postman-to-k6 converter␊
    ␊
    import "./libs/shim/core.js";␊
    import { group } from "k6";␊
    ␊
    export let options = { maxRedirects: 4 };␊
    ␊
    const Pre = Symbol.for("pre");␊
    const Request = Symbol.for("request");␊
    postman[Symbol.for("initial")]({␊
      options␊
    });␊
    ␊
    export default function() {␊
      group("TestFolder", function() {␊
        postman[Pre].push(() => {␊
          pm.variables.set("test", "a");␊
        });␊
    ␊
        group("TestFolder2", function() {␊
          postman[Pre].push(() => {␊
            pm.variables.set("test2", "b");␊
          });␊
    ␊
          group("TestFolder3", function() {␊
            postman[Pre].push(() => {␊
              pm.variables.set("test3", "c");␊
            });␊
    ␊
            postman[Request]({␊
              name: "TestRequest",␊
              method: "GET",␊
              address: "http://example.com/"␊
            });␊
    ␊
            postman[Pre].pop();␊
          });␊
    ␊
          postman[Pre].pop();␊
        });␊
    ␊
        postman[Pre].pop();␊
      });␊
    }␊
    `

## pre nested --skip-pre

> Snapshot 1

    `// Auto-generated by the postman-to-k6 converter␊
    ␊
    import "./libs/shim/core.js";␊
    import { group } from "k6";␊
    ␊
    export let options = { maxRedirects: 4 };␊
    ␊
    const Request = Symbol.for("request");␊
    postman[Symbol.for("initial")]({␊
      options␊
    });␊
    ␊
    export default function() {␊
      group("TestFolder", function() {␊
        group("TestFolder2", function() {␊
          group("TestFolder3", function() {␊
            postman[Request]({␊
              name: "TestRequest",␊
              method: "GET",␊
              address: "http://example.com/"␊
            });␊
          });␊
        });␊
      });␊
    }␊
    `

## pre request

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
    export default function() {␊
      postman[Request]({␊
        name: "TestRequest",␊
        method: "GET",␊
        address: "http://example.com/",␊
        pre() {␊
          pm.variables.set("test", "a");␊
          pm.variables.set("test2", "b");␊
          pm.variables.set("test3", "c");␊
        }␊
      });␊
    }␊
    `

## pre request --skip-pre

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
    export default function() {␊
      postman[Request]({␊
        name: "TestRequest",␊
        method: "GET",␊
        address: "http://example.com/"␊
      });␊
    }␊
    `
