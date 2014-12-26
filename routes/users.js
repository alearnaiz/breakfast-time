var express = require('express');
var router = express.Router();

// GET /users
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// POST /users
router.post('/', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  console.log(username + ' ' + password);
  res.end();
});

module.exports = router;
