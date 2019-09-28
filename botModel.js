'user strict';

var sql = require('./db.js');


var BotModel = function () {
    //Costructor
};
/**
 * Shape is an abstract base class. It is defined simply
 * to have something to inherit from for geometric
 * subclasses
 */
BotModel.selectSettings = function (result) {
    sql.query("SELECT * FROM settings", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));
        }
    });
};
BotModel.selectSettingValue = function (id_settings, result) {
    sql.query("SELECT * FROM settings WHERE id_settings = '" + id_settings + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
BotModel.deleteSetting = function (id_settings, result) {
    sql.query("DELETE FROM settings WHERE id_settings = '" + id_settings + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.insertSetting = function (name, value , result) {
    sql.query("INSERT INTO settings( name ,  value ) VALUES ('" + name + "','" + value + "')", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.updateSetting = function (id_settings, value, result) {
    sql.query("UPDATE settings SET value = '" + value + "' WHERE id_settings = '" + id_settings + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.selectUsers = function (result) {
    sql.query("SELECT * FROM users", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
BotModel.selectUser = function (id_discord, result) {
    sql.query("SELECT * FROM users WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
BotModel.deleteUser = function (id_discord, result) {
    sql.query("DELETE FROM users WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
BotModel.insertUser = function (id_discord, result) {
    sql.query("INSERT INTO users (id_discord, messages) VALUES ('" + id_discord + "', 0)", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.selectDeadUsers = function (result) {
    sql.query("SELECT * FROM users WHERE last_check < (NOW() - INTERVAL 15 DAY) AND notified = 1", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
BotModel.selectNotifiedUsers = function (result) {
    sql.query("SELECT * FROM users WHERE last_check < (NOW() - INTERVAL 15 DAY) AND notified = 0 AND presences = 0", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
BotModel.updateUserNotified = function (id_discord, result) {
    sql.query("UPDATE users SET notified = 1 WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.updateUserLastCheck = function (id_discord, result) {
    sql.query("UPDATE users SET last_check = NOW() WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.updateUserResetLastCheck = function (id_discord, result) {
    sql.query("UPDATE users SET last_check = NULL , notified = 0 WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.updateZeroMessage = function (id_discord, result) {
    sql.query("UPDATE users SET messages = 0 WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.updateZeroPresence = function (id_discord, result) {
    sql.query("UPDATE users SET presences = 0 WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.selectUserWhiteList = function (id_discord, result) {
    sql.query("SELECT * FROM white_list WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
BotModel.selectUsersWhiteList = function (result) {
    sql.query("SELECT * FROM white_list", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
BotModel.insertUserWhiteList = function (id_discord, tag, result) {
    sql.query("INSERT INTO white_list (id_discord , tag) VALUES ('" + id_discord + "','" + tag + "')", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.deleteUserwhiteList = function (tag, result) {
    sql.query("DELETE FROM white_list WHERE tag = '" + tag + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.selectUsersInToGrave = function (result) {
    sql.query("SELECT * FROM users  WHERE NOT last_check = '' ", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
BotModel.updateRemoveMessageUser = function (id_discord, message, result) {
    sql.query("UPDATE users SET messages = messages - " + message + " WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.updateRemovePointUser = function (id_discord, point, result) {
    sql.query("UPDATE users SET presences = presences - " + point + " WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.updateResetPresenceCount = function (result) {
    sql.query("UPDATE users SET messages_day = 0 , presence_day = 0 , bot_mention = 0", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.updateResetBotMention = function (result) {
    sql.query("UPDATE users SET bot_mention = 0", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
BotModel.selectMessageLadyisabel = function (result) {
    sql.query("SELECT * FROM messages ", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
}
BotModel.insertMessageLadyisabel = function (message ,result) {
    sql.query("INSERT INTO messages ( message ) VALUES ('" + message + "')", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
}
BotModel.deleteMessageLadyisabel = function (id_phrase, result) {
    sql.query("DELETE FROM messages WHERE id_message = '" + id_phrase + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
}
BotModel.updateStatusMessageLadyisabel = function (id_phrase, result) {
    sql.query("UPDATE messages SET status = " + status + " WHERE id_message = '" + id_phrase + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
}
BotModel.updatePointMessageUser = function (id_discord, result) {
    sql.query("UPDATE users SET messages = messages + 1 , messages_day = messages_day + 1 WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
}
BotModel.updatePointPresenceDayUpdate = function (id_discord, result) {
    sql.query("UPDATE users SET presence_day = presence_day + 1 , presences = presences + 1 , presence_update = presence_update + 1 WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
}
BotModel.updatePointPresenceDayMessage = function (id_discord, result) {
    sql.query("UPDATE users SET presence_day = presence_day + 1 , presences = presences + 1 , presence_message = presence_message + 1 WHERE id_discord = '" + id_discord +"'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
}
BotModel.updatePointPresenceDayReaction = function (id_discord, result) {
    sql.query("UPDATE users SET presence_day = presence_day + 1 , presences = presences + 1 , presence_reaction = presence_reaction + 1 WHERE id_discord = '" + id_discord +"'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
}

module.exports = BotModel;