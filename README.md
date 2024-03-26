# POSTMAN TO k6


This project is a friendly fork of [apideck-libraries/postman-to-k6](https://github.com/apideck-libraries/postman-to-k6) from the original [grafana/postman-to-k6](https://github.com/grafana/postman-to-k6), where I will focus on **building out new features not currently supported** alongside maintenance.   

#### Request a New Features
Open an issue with your feature request (must me something currently supported in postman) and I'll work on the requests with the most votes in order.   
   
Also feel free to contribute or pass any suggestions along!


---

Converts a [Postman collection](https://www.getpostman.com/docs/collections) to a [k6 script](https://docs.k6.io/docs).

The postman-to-k6 converter utilizes your Postman collection and converts all the Postman requests, including tests,
variables, ... to K6 scripts that can be executed by K6 to run performance tests.

![Github badge](https://github.com/aegrey/postman-to-k6/actions/workflows/build-on-tag.yml/badge.svg)
<a href="https://www.npmjs.com/package/@aegrey/postman-to-k6" alt="Latest Stable Version">![npm](https://img.shields.io/npm/v/@aegrey/postman-to-k6.svg)</a>
<a href="https://www.npmjs.com/package/@aegrey/postman-to-k6" alt="Total Downloads">![npm](https://img.shields.io/npm/dw/@aegrey/postman-to-k6.svg)</a>


## Content

- [Features](#features)
- [Installation](#installation)
    - [Local Installation (recommended)](#local-installation-recommended)
    - [Global Installation](#global-installation)
- [Usage](#usage)
- [Video introduction](#video-introduction)
- [Options](#options)
    - [Iterations](#iterations)
    - [Environment Variables](#environment-variables)
    - [Global Variables](#global-variables)
    - [CSV Data File](#csv-data-file)
    - [JSON Data File](#json-data-file)
    - [K6 Param Options File](#k6-param-options-file)
    - [K6 Handle Summary as JSON](#k6-handle-summary-as-json)
    - [K6 Request tag](#k6-request-tag)
    - [Separate](#separate)
    - [Skip Pre](#skip-pre)
    - [Skip Post](#skip-post)
    - [CLI options file](#cli-options-file)
- [Examples](#examples)
- [Unsupported Features](#unsupported-features)
- [Other similar tools](#other-similar-tools)
- [Credits](#credits)

## Features

- [x] Pre-request scripts.
- [x] Test scripts.
- [x] Variables (at all scopes + dynamic).
- [x] Data files.
- [x] Authentication methods (except Hawk).
- [x] File uploads (experimental).
- [x] `postman.*` interface ([exceptions below](#unsupported-features)).
- [x] `pm.*` interface ([exceptions below](#unsupported-features)).
- [x] Support for
  Postman [Dynamic Variables](https://learning.postman.com/docs/writing-scripts/script-references/variables-list/)
  & [ReplaceIn](https://learning.postman.com/docs/writing-scripts/script-references/postman-sandbox-api-reference/#using-variables-in-scripts)
  function.
- [x] Global variables exposed by Postman: `globals` `environment` `data`
  `iteration`.
- [x] `xml2Json` conversion.
- [x] All [Postman Schema](https://schema.getpostman.com/) versions.

## Installation

### Local Installation (recommended)

While possible to install globally, we recommend that you, if possible, add the converter to the `node_modules` of your
test project using:

```shell
$ npm install -D @apideck/postman-to-k6
```

or using yarn...

```shell
$ yarn add @apideck/postman-to-k6
```

Note that this will require you to run the converter with `npx @apideck/postman-to-k6 your-postman-file` or, if you are
using an older versions of npm, `./node_modules/.bin/postman-to-k6 your-postman-file`.

### Global Installation

```shell
$ npm install -g @apideck/postman-to-k6
```

## Usage

To convert an exported collection to a k6 script:

```shell
$ postman-to-k6 collection.json -o k6-script.js
```

Then run the script in k6, as usual, using:

```shell
$ k6 run k6-script.js
```

## Video Introduction

Together with [Nicole van der Hoeven](https://twitter.com/n_vanderhoeven) & [Paul Balogh](https://twitter.com/javaducky) from the [K6 team](https://www.youtube.com/@k6io), we talked about "[postman-to-k6](https://github.com/apideck-libraries/postman-to-k6)" in the [K6 Office Hours](http://www.youtube.com/watch?v=Be66Db4wHLA) podcast. We talked about how to convert a Postman collection to a k6 load test, the advantages of Postman, and the benefits of reusing automation testing scripts for performance.

<a href="https://www.youtube.com/watch?v=Be66Db4wHLA" target="_blank" title="Postman for load testing using k6, with Tim Haselaars (k6 Office Hours #43)" rel="nofollow">
<img src="https://camo.githubusercontent.com/fe8d65ea79fcdb60c7e541d75259871d9846f96348feda261093ea2b20fa4299/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f4265363644623477484c412f6d617872657364656661756c742e6a7067" alt="Postman for load testing using k6, with Tim Haselaars (k6 Office Hours #43)" width="50%"></a>

Watch it on Youtube >> https://www.youtube.com/watch?v=Be66Db4wHLA

Topics covered:
* Use cases for [k6](https://k6.io/)
* Quick tour of [Postman](https://www.postman.com/)
* Why Postman is not designed for load testing
* Demo of [postman-to-k6](https://github.com/apideck-libraries/postman-to-k6)
* How to use [Portman](https://blog.apideck.com/announcing-portman) to generate tests from an OpenAPI spec

## Options

### Iterations

Configures how many times the script will be executed before completion.

| Flag | Verbose        | Default |
| ---- | -------------- | ------: |
| `-i` | `--iterations` |       1 |

Example:

```shell
$ postman-to-k6 collection.json --iterations 25 -o k6-script.js
```

### Environment Variables

Provide environment variables from a JSON file.

| Flag | Verbose         | Default |
| ---- | --------------- | ------- |
| `-e` | `--environment` | N/A     |

Example:

```shell
$ postman-to-k6 collection.json --environment environment.json -o k6-script.js
```

### Global Variables

Provide global variables from a JSON file.

| Flag | Verbose    | Default |
| ---- | ---------- | ------- |
| `-g` | `--global` | N/A     |

```shell
$ postman-to-k6 collection.json --global globals.json -o k6-script.js
```

### CSV Data File

Provide a data file in the CSV format.

| Flag | Verbose | Default |
| ---- | ------- | ------- |
| `-c` | `--csv` | N/A     |

```shell
$ postman-to-k6 collection.json --csv data.csv -o k6-script.js
```

### JSON Data File

Pass in a data file in the JSON format.

| Flag | Verbose  | Default |
| ---- | -------- | ------- |
| `-j` | `--json` | N/A     |

```shell
$ postman-to-k6 collection.json --json data.json -o k6-script.js
```

### K6 Param Options File

Pass [K6 parameter options](https://k6.io/docs/javascript-api/k6-http/params) as a file in JSON format.

| Flag | Verbose       | Default |
| ---- | ------------- | ------- |
|      | `--k6-params` | N/A     |

```shell
$ postman-to-k6 collection.json --k6-params k6-params.json -o k6-script.js
```

### K6 Handle Summary as JSON

Output the [K6 summary](https://k6.io/docs/results-visualization/end-of-test-summary/#handlesummary-callback) as a file
in JSON format. This will add the K6 `handleSummary(data)` to the generated script, providing the functionality that K6
will store the summary output as JSON file locally.

| Flag | Verbose                    | Default |
| ---- | -------------------------- | ------- |
|      | `--k6-handle-summary-json` | N/A     |

```shell
$ postman-to-k6 collection.json --k6-handle-summary-json summary-report.json -o k6-script.js
```

### K6 Request tag

Generate [K6 request name tags](https://k6.io/docs/using-k6/http-requests/#http-request-tags) based on available naming
strategies:

- none: no automatic generated tags | default
- `request`: uses the request name as tag (example "Show all accounts")
- `folder-request`: uses Postman folder name and the request name (example: "Accounts - Show all accounts")

| Flag | Verbose                | Default |
| ---- | ---------------------- | ------- |
|      | `--k6-request-tagging` | N/A     |

Example for `request` strategy

```shell
$ postman-to-k6 collection.json --k6-request-tagging=request -o k6-script.js
```

Example for `folder-request` strategy

```shell
$ postman-to-k6 collection.json --k6-request-tagging=folder-request -o k6-script.js
```

### Separate

Split requests into separate files, for easier rearrangement of the logic.

| Flag | Verbose      | Default |
| ---- | ------------ | ------- |
| `-s` | `--separate` | false   |

```shell
$ postman-to-k6 collection.json --separate -o k6-script.js
```

```shell
$ postman-to-k6 collection.json -s -o k6-script.js
```

### Skip Pre

Skips any pre-request scripts during conversion

| Flag | Verbose      | Default |
| ---- | ------------ | ------- |
|      | `--skip-pre` | false   |

```shell
$ postman-to-k6 collection.json --skip-pre -o k6-script.js
```

### Skip Post

Skips any post-request scripts during conversion

| Flag | Verbose       | Default |
| ---- | ------------- | ------- |
|      | `--skip-post` | false   |

```shell
$ postman-to-k6 collection.json --skip-pre -o k6-script.js
```

### CLI options file

Manage all the CLI options in a separate configuration file and pass them along to the postman-to-k6 command. To make
the CLI usage easier, especially in CI/CD implementations.

All the available CLI options can be used in the config file. By passing the CLI options as parameters, you can
overwrite the defined CLI options defined in the file.

| Flag | Verbose              | Default |
| ---- | -------------------- | ------- |
|      | `--cli-options-file` | false   |

```shell
$ postman-to-k6 collection.json --cli-options-file cli-config.json
```

Example of JSON CLI config file

```json
{
    "output": "k6-script.js",
    "k6-params": "config/k6-params.json",
    "environment": "config/envs/team.env.json",
    "separate": true
}
```

## Examples

A collection of Postman examples are located under `example`. To run one of the examples, just run it as you would any
other command:

```shell
$ postman-to-k6 example/v2/echo.json -o k6-script.js
```

## Unsupported Features

- Sending requests from scripts using `pm.sendRequest`.
- Controlling request execution order using `postman.setNextRequest`.
- Cookie properties, like `hostOnly`, `session`, and `storeId`.
- Textual response messages:
    - `responseCode.name`
    - `responseCode.detail`
    - `pm.response.reason`
    - `pm.response.to.have.status(reason)`
    - `pm.response.to.not.have.status(reason)`
- Properties returning Postman classes:
    - `pm.request.url` `pm.request.headers`
    - `pm.response.headers`
- The Hawk authentication method.
- Deprecated `xmlToJson` method.
- Request IDs are changed. Postman doesn't provide them in the export, so we have to generate new ones.

## Other similar tools

- [jmeter-to-k6](https://github.com/loadimpact/jmeter-to-k6/): Convert JMeter JMX files to k6 JS.

## Credits

Special thanks to the K6 team from [Grafana](https://github.com/grafana) for open-sourcing & growing the
converter and contributing it to the community. Thanks to [bookmoons](https://github.com/bookmoons) for creating this
tool. Also, thanks to [borjacampina](https://github.com/borjacampina) for creating the original incarnation of the tool.
