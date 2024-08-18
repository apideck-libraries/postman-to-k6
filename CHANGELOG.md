# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/apideck-libraries/postman-to-k6/compare/v1.8.7...HEAD)

## [1.13.0] - 2024-08-18

- Implement Atob via K6 encoding (#86)
- Extended pm.request with support for headers, url, method, name, id, body, body.raw (#136)

## [1.12.0] - 2024-07-31

- Fix initialization of headers for each K6 request (#98)
- Bumped dependencies: uuuid, postman-collection, oauth-1.0a

## [1.11.0] - 2024-07-12

- Handle mixing ESM and commonJS to be ready for k6 v0.53.0

## [1.10.0] - 2024-06-13

- Bump minimal Node version to 18.x
- Code refactoring with optional chaining to provide JS safe code

## [1.9.0] - 2024-04-01 

- Support for pm.response.headers.all() & pm.response.headers.get() (thanks to the contribution of @aegrey)

## [1.8.10] - 2024-01-05

### Security

- Upgraded dependencies: crypto-js 4.2.0, postman-collection 4.3.0, postman-collection-transformer 4.1.8

## [1.8.9] - 2023-09-28

### Fixed

- Docker build -t postman-to-k6 (#114)

### Security

- Upgraded dependencies: get-func-name, word-wrap, semver, xmi2js

## [1.8.8] - 2023-02-09

### Fixed

- Fixed missing module prettier (#96)

## [1.8.7] - 2023-01-14

### Added

- Support for Postman files upload (experimental)(#93, #28, #83)
- Build postman-to-k6 as a Docker image

### Security

- Bump json5 from 2.1.3 to 2.2.3

## [1.8.6] - 2022-11-12

### Security

- Bumped minimatch from 3.0.4 to 3.1.2 and other vulnerable dependencies

## [1.8.5] - 2022-08-11

### Fixed

- Added missing scripts to the `package.json` file.

## [1.8.4] - 2022-08-11

### Fixed

- Extend pm.variables.replaceIn to support Postman static & dynamic variables (#69)
- Transform Postman API exported wrapped collection & environment objects (#67)
- Enhanced auto-import of libs (#68)
- Replace the Postman variables in the global, environment and collection scopes (#64)
- Use correct directory paths for importing libs (#49)
- Auth headers with `-` in the key name are handled properly (#62)
- Bump dependencies like husky, urijs, papaparse, chai, aws4, shell-quote, trim-off-newlines, minimist (#70)

## [1.8.3] - 2021-11-22

### Fixed

- Allows variables that evaluate to falsy to be returned (#23)

## [1.8.2] - 2021-10-08

### Changed

- Temporary fix to overcome missing optional chaining support

## [1.8.1] - 2021-09-20

### Changed

- Minor enhancement to convert the CLI parameter to camelCased options for easier usage in the CLI options file

## [1.8.0] - 2021-09-18

### Added

- Added the option to generate K6 Request tags for reporting purpose.
- Added option to use a file to pass all CLI options.

## [1.7.0] - 2021-09-01

### Added

- Added option to generate a K6 JSON summary through the handleSummary() callback.

### Changed

- Updated readme
- Migrated the "integration" tests to use Ava snapshots instead of the hardcoded comparison for easier maintenance

## [1.6.1] - 2021-08-18

### Fixed

- Fixes a bug that when using the --skip-pre/--skip-post options was passed, the converter did not remove the pre-request/post-request scripts at the collection or folder level. (grafana#105)

### Changed

- Updated readme to remove the docker hub reference to prevent confusion with the original package, since this fork does not build dockers.

## [1.6.0] - 2021-08-18

### Added

- Extend support for Postman random functions/dynamic variables (grafana#92)
- Exclude disabled headers when converting requests (grafana#103)
- Implement postman replaceIn function
- Extended tests for url encode
- Extended tests for encoding of space characters
- Extended test to include checks for randomPhoneNumber & isoTimestamp

### Security

- Bumped dependencies for ajv, browserify, eslint, lodash, postman-collection, postman-collection-transformer, strip-json-comments, urijs
- Bumped dev dependencies for ava

## [1.5.1] - 2021-08-16

### Fixed

- Bug fix for unwanted conversion of Postman query variables (#106 / #104)

## [1.1.0] - 2020-05-22

### Added

- Support for api key authorization.

## [1.0.0] - 2020-05-14

### Added

- Switched code style from standardjs to eslint and prettier
- ci workflows moved to github actions
- Automated deployment of version tags to dockerhub and npm registry

## [0.5.0] - 2020-03-24

### Added

- Support for tags
- Body in aws4 auth calls

### Fixed

- Dependency versions

## [0.4.0] - 2019-11-21

### Added

- Support for file uploads.

### Fixed

- Support empty query string in requests using AWSv4 signature authentication

## [0.3.1] - 2019-10-28

### Fixed

- Polyfill for Object.setPrototypeOf method when a conversion uses any dependency requiring it.

## [0.3.0] - 2019-08-23

### Added

- Support GraphQL variables.

## [0.2.0] - 2019-08-22

### Added

- Dockerfile and installation instructions on how to use Docker image from DockerHub.
- Support for injecting OAuth1 credentials when converting a collection.
- Support for splitting requests into separate JS files for easier rearrangement of logic post-conversion.
- Support for GraphQL body mode.

### Fixed

- Resolution of variables in request bodies.

## [0.1.2] - 2019-03-28

### Fixed

- Support alternate no-body encoding.

## [0.1.1] - 2019-03-26

### Fixed

- Postinstall command.
- Don't ignore scripts folder when packaging npm package.

## [0.1.0] - 2019-03-26

### Added

- Support for prerequest scripts.
- Support for test scripts.
- Support for variables (at all scopes + dynamic).
- Support for data files.
- Support for authentication methods (except Hawk).
- Support for postman.\* interface.
- Support for pm.\* interface.
- Support for global variables exposed by Postman: globals environment data iteration.
- Support for xml2Json conversion.
- Support for file formats v2 and v2.1.

### Updated

- Installation and usage instructions to recommend [nvm](https://github.com/creationix/nvm) to avoid filesystem permission issues when installing the tool globally with `npm install -g ...`

[unreleased]: https://github.com/loadimpact/postman-to-k6/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/loadimpact/postman-to-k6/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/loadimpact/postman-to-k6/compare/v0.5.0...v1.0.0
[0.5.0]: https://github.com/loadimpact/postman-to-k6/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/loadimpact/postman-to-k6/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/loadimpact/postman-to-k6/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/loadimpact/postman-to-k6/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/loadimpact/postman-to-k6/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/loadimpact/postman-to-k6/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/loadimpact/postman-to-k6/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/loadimpact/postman-to-k6/releases/tag/v0.1.0
