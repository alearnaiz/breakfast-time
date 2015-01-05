var mysql = require('mysql');

mysql.connect = function(){
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        database: 'breakfast-time',
        user: 'root',
        password: 'root'
    });
};

module.exports = mysql;

