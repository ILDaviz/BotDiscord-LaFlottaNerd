/*
***************************************************
* Function Database 
*/

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bot_discord_2'
});

module.exports =
    {
        get_settings: async function () {
            const value = await connection.query("SELECT * FROM settings", function (error, results, fields) {
                if (error) throw error;
                return results;
            });

            return value;
        },

        get_settings_value: function (id_settings,callback) {
            connection.query("SELECT * FROM settings WHERE id_settings = '" + id_settings + "'", function (error, results, fields){
                if (error) throw error;
                var callback = results;
                return callback;
            });
        },

        delete_setting: function (id_settings){
            connection.query("DELETE FROM settings WHERE id_settings = '" + id_settings + "'", function (error, results, fields) {
                if (error) throw error;
            });
        },

        add_setting: function (name,value){
            connection.query("INSERT INTO settings( name ,  value ) VALUES ('" + name + "','" + value + "')", function (error, result, fields){
                if (error) throw error;
            });
        },

        update_setting: function (id_settings, value){
            connection.query("UPDATE settings SET value = '" + value + "' WHERE id_settings = '" + id_settings + "'", function (error, result, fields) {
                if (error) throw error;
            });
        },

        get_users: function (callback){
            connection.query("SELECT * FROM users", function (error, results, fields) {
                if (error) throw error;
                var callback = results;
                return callback;
            });
        },

        get_user_data: function (id_discord, callback){
            connection.query("SELECT * FROM users WHERE id_discord = '" + id_discord + "'", function (error, results, fields) {
                if (error) throw error;
                var callback = results;
                return callback;
            });
        },

        add_user: function (id_discord){
            connection.query("INSERT INTO users (id_discord, messages) VALUES ('" + id_discord + "', 0)", function (error, results, fields) {
                if (error) throw error;
            });
        },

        delete_users: function (callback){
            connection.query("SELECT * FROM users WHERE last_check < (NOW() - INTERVAL 15 DAY) AND notified = 1", function (error, results, fields) {
                if (error) throw error;
                var callback = results;
                return callback;
            });
        },

        get_notified_users: function () {
            connection.query("SELECT * FROM users WHERE last_check < (NOW() - INTERVAL 15 DAY) AND notified = 0 AND presences = 0", function (error, results, fields) {
                if (error) throw error;
            });
        },

        get_user_set_notified: function (id_discord, callback) {
            connection.query("UPDATE users SET notified = 1 WHERE id_discord = '" + id_discord + "'", function (error, results, fields) {
                if (error) throw error;
                var callback = results;
                return callback;
            });
        }
    };

/*

function userLastCheck(id_discord) {
    var result = connection.query("UPDATE users SET last_check = NOW() WHERE id_discord = '" + id_discord + "'");
    return result;
}

function resetLastCheck(id_discord) {
    var result = connection.query("UPDATE users SET last_check = NULL , notified = 0 WHERE id_discord = '" + id_discord + "'");
    return result;
}

function setZeroMessage(id_discord) {
    connection.query("UPDATE users SET messages = 0 WHERE id_discord = '" + id_discord + "'");
}

function setZeroPresence(id_discord) {
    connection.query("UPDATE users SET presences = 0 WHERE id_discord = '" + id_discord + "'");
}

function getWhiteList(id_discord) {
    var result = connection.query("SELECT * FROM white_list WHERE id_discord = '" + id_discord + "'");
    return result;
}

function whitelist() {
    var result = connection.query("SELECT * FROM white_list");
    return result;
}

function insertUserWhiteList(id_discord, tag) {
    connection.query("INSERT INTO white_list (id_discord , tag) VALUES ('" + id_discord + "','" + tag + "')");
}

function deleteUserWhiteList(tag) {
    connection.query("DELETE FROM white_list WHERE tag = '" + tag + "'");
}

function getListStepIntoTheGrave() {
    var result = connection.query("SELECT * FROM users  WHERE NOT last_check = '' ");
    return result;
}

function removeMessage(id_discord, message) {
    connection.query("UPDATE users SET messages = messages - " + message + " WHERE id_discord = '" + id_discord + "'");
}

function removePresence(id_discord, point) {
    connection.query("UPDATE users SET presences = presences - " + point + " WHERE id_discord = '" + id_discord + "'");
}

function resetPesenceCount() {
    connection.query("UPDATE users SET messages_day = 0 , presence_day = 0 , bot_mention = 0");
}

function resetBotMention() {
    connection.query("UPDATE users SET bot_mention = 0");
}

function getFrasi() {
    var result = connection.query("SELECT * FROM messages ");
    return result;
}

function addFrase(frase) {
    connection.query("INSERT INTO messages ( message ) VALUES ('" + frase + "')");
}

function delFrase(id_phrase) {
    connection.query("DELETE FROM messages WHERE id_message = '" + id_phrase + "'");
}

function cangeStatusFrase(id_phrase, status) {
    connection.query("UPDATE messages SET status = " + status + " WHERE id_message = '" + id_phrase + "'");
}

function getUser(id_discord) {
    var result = connection.query("SELECT * FROM users WHERE id_discord = '" + id_discord + "'");
    return result;
}

function addPointMessageUser(id_discord) {
    connection.query("UPDATE users SET messages = messages + 1 , messages_day = messages_day + 1 WHERE id_discord = '" + id_discord + "'");
}

function addPointPresenceDayUpdate(id_discord) {
    connection.query("UPDATE users SET presence_day = presence_day + 1 , presences = presences + 1 , presence_update = presence_update + 1 WHERE id_discord = '" + id_discord + "'");
}

function addPointPresenceDayMessage(id_discord) {
    connection.query("UPDATE users SET presence_day = presence_day + 1 , presences = presences + 1 , presence_message = presence_message + 1 WHERE id_discord = '" + id_discord + "'");
}

function addPointPresenceDayReaction(id_discord) {
    connection.query("UPDATE users SET presence_day = presence_day + 1 , presences = presences + 1 , presence_reaction = presence_reaction + 1 WHERE id_discord = '" + id_discord + "'");
}

*/