const RESETTABLE_GLOBALS = [
  'postman',
  'pm',
  'tests',
  'request',
  'responseCookies',
  'responseBody',
  'responseCode',
  'responseHeaders',
  'responseTime',
  'environment',
  'globals',
  'data',
  'iteration',
  'xml2Json',
  'xmlToJson',
];

const LEGACY_GLOBAL_BINDINGS = RESETTABLE_GLOBALS.join(', ');

function ensureLegacyBindingsDeclared() {
  // These test files reference globals as bare identifiers (AVA style).
  // Create mutable global bindings so Jest can resolve them.
  global.eval(`var ${LEGACY_GLOBAL_BINDINGS};`);
}

function syncLegacyBindingsFromGlobalObject() {
  if (!globalThis.postman) {
    try {
      jest.isolateModules(() => {
        require('shim/core');
      });
    } catch (error) {
      // Some suites do not load shim/core; ignore bootstrap failures there.
    }
  }
  for (const name of RESETTABLE_GLOBALS) {
    global.eval(`${name} = globalThis.${name};`);
  }
}

ensureLegacyBindingsDeclared();
beforeEach(() => {
  syncLegacyBindingsFromGlobalObject();
});
