var express = require('express');
var mysql = require('../utils/connection');
var nodemailer = require('nodemailer');
var router = express.Router();

// POST /emails/send
router.post('/send', function(req, res) {
    var connection = mysql.connect();
    // Getting all last active breakfasts belong to every active user
    connection.query('SELECT breakfast.user_username AS username, food.name AS foodName, drink.name AS drinkName FROM breakfast LEFT JOIN food ON breakfast.food_id = food.id ' +
        'LEFT JOIN drink ON breakfast.drink_id = drink.id WHERE breakfast.endDate IS NULL ' +
        'AND EXISTS (SELECT * FROM user WHERE user.username = breakfast.user_username ' +
        'AND user.endDate IS NULL)', function(err, breakfasts) {
        if (err) {
            throw err;
        }

        // Choosing the person who has to call the bar
        connection.query('SELECT user.username AS username, user.email AS email FROM user WHERE user.endDate IS NULL AND EXISTS (SELECT * FROM breakfast WHERE breakfast.endDate ' +
            'IS NULL AND breakfast.user_username = user.username) ORDER BY RAND() LIMIT 1', function(err, user) {
            if (err) {
                throw err;
            }

            if (user.length > 0) {

                // Inserting a leader in the leader log table
                var leaderLog  = {
                    startDate: new Date(),
                    user_username: user[0].username
                };

                connection.query('INSERT INTO leader_log SET ?', leaderLog, function(err) {
                    if (err) {
                        throw err;
                    }
                });
                connection.end();

                // Sending the email
                var smtpTransport = nodemailer.createTransport({
                    service: 'xxxx',
                    auth: {
                        user: 'xxxx',
                        pass: 'xxxx'
                    }
                });

                var mailOptions = {
                    from: 'Breakfast time <merieondola@gmail.com>', // sender address
                    to: user[0].email, // list of receivers
                    subject: "Congratulations, you're the breakfast's leader!", // Subject line
                    html: getHtmlBody(breakfasts, user[0].username)// html body
                };

                smtpTransport.sendMail(mailOptions, function(err){
                    if(err){
                        throw err;
                    }
                });
                res.status(200).send(user[0].username);
            } else {
                res.status(204).send();
            }
        });

        // Updating all end date of the active breakfasts
        connection.query('UPDATE breakfast SET endDate = ? WHERE endDate IS NULL',[new Date()], function(err) {
            if (err) {
                throw err;
            }
        });

    });

});

function getHtmlBody(breakfasts, username) {
    var html = 'Hello ' + username + ',<br/><br/>' +
    "As the leader of the breakfast, you should call to Meridia (0971439343). Your colleges are hungry and waiting for this order:" +
    '<ul>';

    // Order by person
    breakfasts.forEach(function(breakfast) {
        if (breakfast.foodName && breakfast.drinkName) {
            html = html + '<li>' + breakfast.username + ' wants a ' + breakfast.foodName + ' and a ' + breakfast.drinkName + '</li>';
        } else if (breakfast.foodName) {
            html = html + '<li>' + breakfast.username + ' wants a ' + breakfast.foodName + '</li>';
        } else if (breakfast.drinkName) {
            html = html + '<li>' + breakfast.username + ' wants a ' + breakfast.drinkName + '</li>';
        } else {
            html = html + '<li>' + breakfast.username + " didn't order anything</li>";
        }
    });
    html = html + '</ul>';

    // Order summary
    var orderSummary = {
        foods: [],
        drinks: []
    };
    breakfasts.forEach(function(breakfast) {
        var foodName = breakfast.foodName;
        var drinkName = breakfast.drinkName;
        if (foodName) {
            if (orderSummary.foods[foodName]) {
                orderSummary.foods[foodName] = orderSummary.foods[foodName] + 1;
            } else {
                orderSummary.foods[foodName] = 1;
            }
        }
        if (breakfast.drinkName) {
            if (orderSummary.drinks[drinkName]) {
                orderSummary.drinks[drinkName] = orderSummary.drinks[drinkName] + 1;
            } else {
                orderSummary.drinks[drinkName] = 1;
            }
        }
    });
    html = html + '<br/><b>Order summary:</b>';
    html = html + '<br/><br/>For eating:<ul>';
    for (var index in orderSummary.foods) {
        html = html + '<li>' + index + ': ' + orderSummary.foods[index] + '</li>';
    }
    html = html + '</ul>';
    html = html + 'For drinking:<ul>';
    for (var index in orderSummary.drinks) {
        html = html + '<li>' + index + ': ' + orderSummary.drinks[index] + '</li>';
    }
    html = html + '</ul>';

    return html + 'Cheers';
}

module.exports = router;