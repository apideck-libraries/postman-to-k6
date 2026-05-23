const { randomUUID: uuidv4 } = require('node:crypto');

function id(result) {
  if (result.setting.id) {
    return uuidv4();
  }
  return null;
}

module.exports = id;
