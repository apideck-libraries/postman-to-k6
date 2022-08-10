function detectFeature(logic, result) {
  if (
    /require\(['"]cheerio['"]\)/.test(logic) ||
    /\bcheerio\(\b/gi.test(logic)
  ) {
    let cheerioPath = './libs/shim/cheerio.js';
    if (
      result.setting &&
      result.setting.separate &&
      result.setting.separate === true
    ) {
      // Request is in a Postman folder
      const pathDepth = renderDirectoryPathGroup(result.group);
      cheerioPath = `${pathDepth}libs/shim/cheerio.js`;
    }
    // cheerio
    result.polyfills.add('spo-gpo');
    result.effectImports.add(cheerioPath);
  }
  if (
    /require\(['"]crypto-js['"]\)/.test(logic) ||
    /\bCryptoJS\.\b/gi.test(logic)
  ) {
    let cryptoPath = './libs/shim/crypto-js.js';
    if (
      result.setting &&
      result.setting.separate &&
      result.setting.separate === true
    ) {
      // Request is in a Postman folder
      const pathDepth = renderDirectoryPathGroup(result.group);
      cryptoPath = `${pathDepth}libs/shim/crypto-js.js`;
    }
    // crypto-js
    result.effectImports.add(cryptoPath);
  }
  if (/require\(['"]lodash['"]\)/.test(logic) || /\b_\.\b/.test(logic)) {
    let lodashPath = './libs/shim/lodash.js';
    if (
      result.setting &&
      result.setting.separate &&
      result.setting.separate === true
    ) {
      // Request is in a Postman folder
      const pathDepth = renderDirectoryPathGroup(result.group);
      lodashPath = `${pathDepth}libs/shim/lodash.js`;
    }
    // lodash
    result.effectImports.add(lodashPath);
  }
  if (/pm\.expect\(/.test(logic)) {
    let expectPath = './libs/shim/expect.js';
    if (
      result.setting &&
      result.setting.separate &&
      result.setting.separate === true
    ) {
      // Request is in a Postman folder
      const pathDepth = renderDirectoryPathGroup(result.group);
      expectPath = `${pathDepth}libs/shim/expect.js`;
    }
    // pm.expect()
    result.effectImports.add(expectPath);
  }
  if (/pm\.response\.to\.(not\.)?have\.jsonSchema/.test(logic)) {
    let jsonSchemaPath = './libs/shim/jsonSchema.js';
    if (
      result.setting &&
      result.setting.separate &&
      result.setting.separate === true
    ) {
      // Request is in a Postman folder
      const pathDepth = renderDirectoryPathGroup(result.group);
      jsonSchemaPath = `${pathDepth}libs/shim/jsonSchema.js`;
    }
    // jsonSchema assertion
    result.effectImports.add(jsonSchemaPath);
  }
  if (/xml2Json/.test(logic)) {
    let xml2JsonPath = './libs/shim/xml2Json.js';
    if (
      result.setting &&
      result.setting.separate &&
      result.setting.separate === true
    ) {
      // Request is in a Postman folder
      const pathDepth = renderDirectoryPathGroup(result.group);
      xml2JsonPath = `${pathDepth}libs/shim/xml2Json.js`;
    }
    // xml2Json()
    result.polyfills.add('spo-gpo');
    result.effectImports.add(xml2JsonPath);
  }
}

function renderDirectoryPathGroup(group) {
  let depthLevel = group && group.level ? group.level + 1 : 1; // +1 starting in the "requests folder
  return `../`.repeat(depthLevel);
}

module.exports = detectFeature;
