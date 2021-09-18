<div align="center">

![postman-to-k6-cover](./assets/postman-to-k6-cover.png)

# Postman-to-k6

> This is a fork of the original [postman-to-k6](https://github.com/grafana/postman-to-k6) repo, which contains new features & fixes.

Converts a [Postman collection](https://www.getpostman.com/docs/collections) to a [k6 script](https://docs.k6.io/docs).

![Github badge](https://github.com/apideck-libraries/postman-to-k6/actions/workflows/build-on-tag.yml/badge.svg)
![npm](https://img.shields.io/npm/v/@apideck/postman-to-k6.svg) ![npm](https://img.shields.io/npm/dw/@apideck/postman-to-k6.svg)

</div>

<br/><br/>

## Content

- [Features](#features)
- [Installation](#installation)
  - [Local Installation (recommended)](#local-installation-recommended)
  - [Global Installation](#global-installation)
  - [Docker](#docker)
- [Usage](#usage)
- [Options](#options)
  - [Iterations](#iterations)
  - [Environment Variables](#environment-variables)
  - [Global Variables](#global-variables)
  - [CSV Data File](#csv-data-file)
  - [JSON Data File](#json-data-file)
  - [Separate](#separate)
- [Docker Usage](#docker-usage)
- [Examples](#examples)
- [Unsupported Features](#unsupported-features)
- [Other similar tools](#other-similar-tools)
- [Credits](#credits)

## Features

- Prerequest scripts.
- Test scripts.
- Variables (at all scopes + dynamic).
- Data files.
- Authentication methods (except Hawk).
- File uploads.
- `postman.*` interface ([exceptions below](#unsupported-features)).
- `pm.*` interface ([exceptions below](#unsupported-features)).
- Support for Postman [Dynamic Variables](https://learning.postman.com/docs/writing-scripts/script-references/variables-list/) & [ReplaceIn](https://learning.postman.com/docs/writing-scripts/script-references/postman-sandbox-api-reference/#using-variables-in-scripts) function.
- Global variables exposed by Postman: `globals` `environment` `data`
  `iteration`.
- `xml2Json` conversion.
- All [Postman Schema](https://schema.getpostman.com/) versions.

## Installation

### Local Installation (recommended)

While possible to install globally, we recommend that you, if possible, add the converter to the `node_modules` of your test project using:

```shell
$ npm install -D @apideck/postman-to-k6

# or using yarn...

$ yarn add @apideck/postman-to-k6
```

Note that this will require you to run the converter with `npx @apideck/postman-to-k6 your-postman-file` or, if you are using an older versions of npm, `./node_modules/.bin/postman-to-k6 your-postman-file`.

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

Output the [K6 summary](https://k6.io/docs/results-visualization/end-of-test-summary/#handlesummary-callback) as a file in JSON format.
This will add the K6 `handleSummary(data)` to the generated script, providing the functionality that K6 will store the summary output as JSON file locally.

| Flag | Verbose                    | Default |
| ---- | -------------------------- | ------- |
|      | `--k6-handle-summary-json` | N/A     |

```shell
$ postman-to-k6 collection.json --k6-handle-summary-json summary-report.json -o k6-script.js
```

### K6 Request tag

Generate [K6 request name tags](https://k6.io/docs/using-k6/http-requests/#http-request-tags) based on available naming strategies:
- none: no automatic generated tags | default
- `request`: uses the request name as tag (example "Show all accounts")
- `folder-request`: uses Postman folder name and the request name (example: "Accounts - Show all accounts")

| Flag | Verbose             | Default |
| ---- | ------------------- | ------- |
|      | `--request-tagging` | N/A     |

Example for `request` strategy
```shell
$ postman-to-k6 collection.json --request-tagging=request -o k6-script.js
```

Example for `folder-request` strategy
```shell
$ postman-to-k6 collection.json --request-tagging=folder-request -o k6-script.js
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

Manage all the CLI options in a separate configuration file and pass them along to the postman-to-k6 command. 
To make the CLI usage easier, especially in CI/CD implementations.

All the available CLI options can be used in the config file. By passing the CLI options as parameters, you can overwrite the defined CLI options defined in the file.

| Flag | Verbose              | Default |
| ---- | -------------------- | ------- |
|      | `--cli-options-file` | false   |

```shell
$ postman-to-k6 collection.json --cli-options-file cli-config.json
```

## Examples

A collection of Postman examples are located under `example`.
To run one of the examples, just run it as you would any other command:

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

- [jmeter-to-k6](https://github.com/loadimpact/jmeter-to-k6/): Convert
  JMeter JMX files to k6 JS.

## Credits

Thanks to [bookmoons](https://github.com/bookmoons) for creating this tool. Also, thanks to [borjacampina](https://github.com/borjacampina) for creating the original incarnation of the tool.
