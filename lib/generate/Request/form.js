const aid = require('../../aid');
const { BodyItemType } = require('../../enum');

function dataForm(body, feature, result) {
  const data = {};
  const items = aid.spread(body.formdata);
  for (const item of items) {
    convertItem(item, data, result);
  }
  feature.data = data;
}

function dataFile(body, feature, result) {
  const data = {};
  const item = body.file;
  item.type = 'file';
  convertItem(item, data, result);

  feature.data = data;
}

function convertItem(item, data, result) {
  // if (!item.key) {
  //   throw new Error('Form item missing key');
  // }
  switch (item.type) {
    case 'text':
      convertItemText(item, data);
      break;
    case 'file':
      convertItemFile(item, data, result);
      break;
    default:
      throw new Error(`Form item missing type (${item.key})`);
  }
}

function convertItemText(item, data) {
  const { key, value } = item;
  data[key] = {
    type: BodyItemType.Text,
    value,
  };
}

function convertItemFile(item, data, result) {
  result.imports.set('http', 'k6/http');
  // const { key } = item;
  const key = 'file';
  const path = extractPath(item);
  result.files.add(path);
  data[key] = {
    type: BodyItemType.File,
    path,
  };
}

function extractPath(item) {
  const { src } = item;
  if (src[2] === ':') {
    // Postman stores Windows path with leading forward slash /
    return src.substring(1);
  } else {
    return src;
  }
}

// Module export for multiple functions

module.exports = {
  formDataForm: dataForm,
  formDataFile: dataFile
};
