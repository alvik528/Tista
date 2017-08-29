var crypto = require('./fake-crypto');


var Db = function() {
	this.users = [];
};

// insert a user into the fake database
// encrypts the password using the fake-crytpo lib
// user must be of the form
// {email: String, password: String}
Db.prototype.insert = function(user) {
  if (this.get(user.email)) {
    throw new Error('user ' + user.email + ' already exists in the database');
  }

  user.password = crypto.encrypt(user.password);
  this.users.push(user);
}

// removes a user from the db
Db.prototype.remove = function(email) {
  if (!this.get(user.email)) {
    throw new Error('user ' + email + ' does not exist in the database');
  }

  var foundUserPos;
  this.users.find(function(user, i){
    if (user.email === email) {
      foundUserPos = i;
    }
  });

  this.users.splice(foundUserPos, 1);
}

// updates a user in the database
Db.prototype.update = function(user) {
  if (!this.get(user.email)) {
    throw new Error('user ' + email + ' does not exist in the database');
  }

  var foundUserPos;
  this.users.find(function(user, i){
    if (user.email === email) {
      foundUserPos = i;
    }
  });

  this.users.splice(foundUserPos, 1, user);
}

// gets a user given a email
Db.prototype.get = function(email) {
  return this.users.find(function(user, i){
    if (user.email === email) {
      return user;
    }
  });
}

// prints out entire database. useful for debugging 
Db.prototype.print = function() {
  console.log(this.users);
}

var DBInstance = (function(){
  return new Db();
})();

module.exports = DBInstance;
