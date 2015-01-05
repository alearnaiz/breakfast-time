var express = require('express');
var mysql = require('../utils/connection');
var router = express.Router();

// POST /users/:username/breakfasts
router.post('/', function(req, res) {
    var data = {
        user_username: req.params.username,
        startDate: new Date(),
        food_id: req.body.food_id,
        drink_id: req.body.drink_id
    };
    var connection = mysql.connect();
    connection.query('INSERT INTO breakfast SET ?', data, function(err) {
        if (err) {
            throw err;
        }
        res.status(201).end();
    });
    connection.end();
});

// GET /users/:username/breakfasts/active
router.get('/active', function(req, res) {
    var connection = mysql.connect();
    connection.query('SELECT * FROM breakfast WHERE user_username = ? AND endDate IS NULL',
        [req.params.username], function(err, rows) {
            if (err) {
                throw err;
            }
            res.status(200).send(rows);
        });
    connection.end();
});

module.exports = router;