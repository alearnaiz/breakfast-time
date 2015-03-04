var express = require('express');
var mysql = require('../utils/connection');
var router = express.Router();

// GET /users/login
router.get('/login', function(req, res) {
  var encodePassword = new Buffer(req.query.password).toString('base64');
  var connection = mysql.connect();
  connection.query('SELECT username FROM user WHERE username = ? COLLATE utf8_bin AND password = ? COLLATE utf8_bin',[req.query.username, encodePassword], function(err, rows) {
    if (err) {
      throw err;
    }
    if (rows.length > 0) {
      res.status(200).send(rows);
    }else {
      res.status(200).send(false);
    }
  });
  connection.end();
});

// POST /users
router.post('/', function(req, res) {
  var encodePassword = new Buffer(req.body.password).toString('base64');
  var user = {
    username: req.body.username,
    email: req.body.email,
    password: encodePassword,
    startDate: new Date()
  };
  var connection = mysql.connect();
  connection.query('INSERT INTO user SET ?', user, function(err) {
    if (err) {
      res.status(202).send(false);
    } else {
      res.status(201).send(true);
    }
  });
  connection.end();
});

// PUT /users/:username     Updating the user’s end date, logic deleted
router.put('/:username', function(req, res) {
  var connection = mysql.connect();
  connection.query('UPDATE user SET endDate = ? WHERE username = ?',[new Date(), req.params.username], function(err) {
    if (err) {
      throw err;
    }
    res.status(200).send();
  });
  connection.end();
});

module.exports = router;