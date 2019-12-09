'user strict';
const bot = require('../bot');
var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: bot.conf.host,
    user: bot.conf.user,
    password: bot.conf.password,
    database: bot.conf.database
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;
