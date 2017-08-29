var nodeCrypto = require('crypto');

var secret = 'totesSecret';

var Crypto = {};

// encrypt a string using sha256
Crypto.encrypt = function(input) {
  return nodeCrypto.createHmac('sha256', secret)
    .update(input)
    .digest('hex');
}

module.exports = Crypto;
