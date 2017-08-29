var validate = require('validate.js');

validate.validators.excludeCharacters = function(value, regex) {
  if (value.match(regex)) {
    return 'includes invalid characters';
  }
};

var constraints = {
  email: {
    presence: true,
    email: true
  },
  password: {
    excludeCharacters: /[=?<>()'"\/\\&]/,
    length: {
      minimum: 8
    }
  }
}

module.exports = function(body) {
  return validate(body, constraints);
}
