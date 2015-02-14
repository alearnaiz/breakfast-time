var express = require('express');
var mysql = require('../utils/connection');
var router = express.Router();

// POST /users/:username/breakfasts
router.post('/:username/breakfasts', function(req, res) {
    var data = {
        user_username: req.params.username,
        startDate: new Date(),
        food_id: req.body.foodId,
        drink_id: req.body.drinkId
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
router.get('/:username/breakfasts/active', function(req, res) {
    var connection = mysql.connect();
    connection.query('SELECT food.name, drink.name FROM breakfast LEFT JOIN food ON breakfast.food_id = food.id LEFT JOIN drink ON breakfast.drink_id = drink.id WHERE user_username = ? AND endDate IS NULL',
        [req.params.username], function(err, rows) {
            if (err) {
                throw err;
            }
            res.status(200).send(rows);
        });
    connection.end();
});

module.exports = router;