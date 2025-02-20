'user strict';
const sql = require('./db');
var Models = function () {
    //Costructor
};

Models.selectSettings = function (type = null ,result) {
    var query = "SELECT * FROM settings ";
    
    if (type) {
        query += "WHERE type = '" + type + "'";
    }

    sql.query(query, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));
        }
    });
};
Models.selectSettingFromName = function (name, result) {
    sql.query("SELECT * FROM settings WHERE name = '" + escape(name) + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
Models.selectSettingFromId = function (id_settings, result) {
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
Models.selectSettingFromType = function (type, result) {
    sql.query("SELECT * FROM settings WHERE type = '" + type + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
Models.deleteSetting = function (id_settings, result) {
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
Models.insertSetting = function (type, name, value, result) {
    sql.query("INSERT INTO settings(type, name ,  value ) VALUES ('" + escape(type) + "','" + escape(name) + "','" + escape(value) + "')", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);

        }
    });
};
Models.updateSetting = function (id_settings, value, result) {
    sql.query("UPDATE settings SET value = '" + escape(value) + "' WHERE id_settings = '" + id_settings + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
Models.updateSettingDescription = function (id_settings, description, result) {
    sql.query("UPDATE settings SET description = '" + escape(description) + "' WHERE id_settings = '" + id_settings + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
Models.selectUsers = function (result) {
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
Models.selectUser = function (id_discord, result) {
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
Models.insertUser = function (id_discord, result) {
    sql.query("SET sql_mode = 'NO_ZERO_DATE'; INSERT INTO users (id_discord, messages) VALUES ('" + id_discord + "', 0)", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);

        }
    });
};
Models.deleteUser = function (id_discord, result) {
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
Models.selectLivelUser = function (messages, result) {
    sql.query("SELECT * FROM level WHERE step = '" + messages + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
};
Models.insertUser = function (id_discord, result) {
    sql.query("INSERT INTO users (id_discord, messages) VALUES ('" + id_discord + "', 0)", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);

        }
    });
};
Models.selectDeadUsers = function (result) {
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
Models.selectNotifiedUsers = function (result) {
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
Models.updateUserNotified = function (id_discord, result) {
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
Models.updateUserLastCheck = function (id_discord, result) {
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
Models.updateUserResetLastCheck = function (id_discord, result) {
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
Models.updateZeroMessage = function (id_discord, result) {
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
Models.updateZeroPresence = function (id_discord, result) {
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
Models.selectUserWhiteList = function (id_discord, result) {
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
Models.selectUsersWhiteList = function (result) {
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
Models.insertUserWhiteList = function (id_discord, tag, result) {
    sql.query("INSERT INTO white_list (id_discord , tag) VALUES ('" + id_discord + "','" + tag + "')", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);

        }
    });
};
Models.deleteUserwhiteList = function (tag, result) {
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
Models.selectUsersInToGrave = function (result) {
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
Models.updateRemoveMessageUser = function (id_discord, message, result) {
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
Models.updateRemovePointUser = function (id_discord, point, result) {
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
Models.updateResetPresenceCount = function (result) {
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
Models.updateResetBotMention = function (result) {
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
Models.updatePointMessageUser = function (id_discord, result) {
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
Models.updatePointPresenceDayUpdate = function (id_discord, result) {
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
Models.updatePointPresenceDayMessage = function (id_discord, result) {
    sql.query("UPDATE users SET presence_day = presence_day + 1 , presences = presences + 1 , presence_message = presence_message + 1 WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
}
Models.updatePointPresenceDayReaction = function (id_discord, result) {
    sql.query("UPDATE users SET presence_day = presence_day + 1 , presences = presences + 1 , presence_reaction = presence_reaction + 1 WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
}
Models.selectMentionBot = function (id_discord, result) {
    sql.query("SELECT bot_mention AS bot_mention FROM users WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
}
Models.updateMentionBot = function (id_discord, result) {
    sql.query("UPDATE users SET bot_mention = bot_mention + 1 WHERE id_discord = '" + id_discord + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
}
Models.selectMonster = function (id_monster, result) {
    sql.query("SELECT name FROM monster WHERE id_monster = '" + id_monster + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
}
Models.seletTopListMessageAllTime = function (result) {
    sql.query("SELECT * FROM `users` ORDER BY `users`.`messages` DESC LIMIT 10", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
}
Models.seletTopListMessageDay = function (result) {
    sql.query("SELECT * FROM `users` ORDER BY `users`.`messages_day` DESC LIMIT 10", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
}

module.exports = Models;