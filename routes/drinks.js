var express = require('express');
var mysql = require('../utils/connection');
var router = express.Router();

// GET /drinks
router.get('/', function(req, res) {
    var connection = mysql.connect();
    connection.query('SELECT * FROM drink', function(err, rows) {
        if (err) {
            throw err;
        }
        res.status(200).send(rows);
    });
    connection.end();
});

module.exports = router;