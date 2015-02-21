var mysql = require('mysql');

mysql.connect = function(){
    return mysql.createConnection({
        host: 'xxxx',
        port: 0000,
        database: 'xxxx',
        user: 'xxxx',
        password: 'xxxx'
    });
};

module.exports = mysql;

