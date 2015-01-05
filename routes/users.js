var express = require('express');
var mysql = require('../utils/connection');
var router = express.Router();

// POST /users
router.post('/', function(req, res) {
  var data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    startDate: new Date()
  };
  var connection = mysql.connect();
  connection.query('INSERT INTO user SET ?', data, function(err) {
    if (err) {
      throw err;
    }
    res.status(201).end();
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

// GET /users/login
router.get('/login', function(req, res) {
  var connection = mysql.connect();
  connection.query('SELECT * FROM user WHERE username = ? AND password = ?',[req.query.username, req.query.password], function(err, rows) {
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

module.exports = router;