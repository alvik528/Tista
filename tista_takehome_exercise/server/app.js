var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var validateUser = require('./validate-user');
var fakeDB = require('./fake-db');

// Server setup:
var app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));

// Render the Create Account page:
app.get('/', function (req, res) {
  res.sendFile(path.resolve('client/create-account.html'));
});

// Handle form submissions from the Create Account page:
app.post('/create-account', function (req, res) {
  var errors = validateUser(req.body);
  if(!fakeDB.get(req.body.email)) {
    if (errors) {
      res.status(400).send({
        success: false,
        errors: errors
      });
    } else {
      fakeDB.insert(req.body);
      res.status(200).send({ success: true });
    }
  } else {
    console.log("clearly this is the problem");
    res.status(200).send({
      success: false,
      errors: "Email Already in Database"
    });
  } 
});

// Run the server:
app.listen(3000, function () {
  console.log('Server is running! Visit localhost:3000 in your browser.');
});
