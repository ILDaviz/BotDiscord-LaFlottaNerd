'user strict';

var sql = require('./db.js');


var BotModel = function () {
    //Costructor
};
/**
 * Seleziona tutti gli settaggi
 * @param { function } result
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
/**
 * Seleziona un determinato settaggio
 * @param { int } id_settings
 * @param { function } result
 */
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
/**
 * Elimina un settaggio
 * @param { int } id_settings
 * @param { function } result
 */
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
BotModel.insertUser = function (id_discord, result) {
    sql.query("SET sql_mode = 'NO_ZERO_DATE'; INSERT INTO users (id_discord, messages) VALUES ('" + id_discord +"', 0)", function (err, res) {

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
BotModel.selectLivelUser = function (messages, result) {
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
BotModel.selectMentionBot = function (id_discord, result) {
    sql.query("SELECT bot_mention AS bot_mention FROM users WHERE id_discord = '" + id_discord +"'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
}
BotModel.updateMentionBot = function (id_discord, result) {
    sql.query("UPDATE users SET bot_mention = bot_mention + 1 WHERE id_discord = '" + id_discord +"'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
}
BotModel.selectMonser = function (id_monster, result) {
    sql.query("SELECT name FROM monster WHERE id_monster = '" + id_monster +"'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));

        }
    });
}
BotModel.seletTopListMessageAllTime = function (id_monster, result) {
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
BotModel.seletTopListMessageDay = function (id_monster, result) {
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
/**
 * Seleziona tutti i testi dal database
 * @param { function } result
 */
BotModel.selectStringTexts = function (result) {
    sql.query("SELECT * FROM string_text", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));
        }
    });
};
/**
 * Inserisci un testi dal database
 * @param { string } tag di riferimento
 * @param { string } string il testo 
 * @param { function } result
 */
BotModel.insertStringText = function (tag,string,bot,result) {
    sql.query("INSERT INTO`string_text`( `tag`, `string`, `bot`) VALUES('" + tag + "','" + string + "','" + bot + "')", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
/**
 * Elimina un testo dal database
 * @param { number } id_string_text riferimento del testo
 * @param { function } result
 */
BotModel.deleteStringText = function (id_string_text, result) {
    sql.query("DELETE FROM`string_text` WHERE id_string_text = '" + id_string_text + "'", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = BotModel;