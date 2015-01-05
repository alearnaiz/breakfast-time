var express = require('express');
var mysql = require('../utils/connection');
var router = express.Router();

// GET /emails/send
router.post('/send', function(req, res) {
    var connection = mysql.connect();
    // Getting all last active breakfasts belong to every active user
    connection.query('SELECT * FROM breakfast WHERE endDate IS NULL AND EXISTS ' +
        '(SELECT * FROM user WHERE user.username = breakfast.user_username ' +
        'AND user.endDate IS NULL) AND NOT EXISTS (SELECT * FROM breakfast breakfast_1 ' +
        'WHERE breakfast_1.endDate IS NULL AND breakfast.startDate < breakfast_1.startDate ' +
        'AND breakfast.id <> breakfast_1.id)', function(err, breakfasts) {
        if (err) {
            throw err;
        }
        // Choosing the person who has to call the bar
        connection.query('SELECT * FROM user WHERE endDate IS NULL AND EXISTS (SELECT * FROM breakfast WHERE endDate ' +
        'IS NULL AND breakfast.user_username = user.username) ORDER BY RAND() LIMIT 1', function(err, user) {
            if (err) {
                throw err;
            }
            var data = {
                breakfasts: breakfasts,
                user: user
            };
            res.status(200).send(data);
        });
        connection.end();
    });
    // Updating all end date of the active breakfasts
    connection.query('UPDATE breakfast SET endDate = ? WHERE endDate IS NULL',[new Date()], function(err) {
        if (err) {
            throw err;
        }
    });
});

module.exports = router;