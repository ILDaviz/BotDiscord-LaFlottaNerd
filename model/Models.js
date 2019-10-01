'user strict';

const sql = require('./Db.js');

/**
 * Estrattore di dati dal database
 */
class BotModel {
    constructor(){}
    selectSettings(result){
        sql.query("SELECT * FROM settings", function (err, res) {

            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
            }
        });
    }
    selectSettingValue(id_settings, result) {
        sql.query("SELECT * FROM settings WHERE id_settings = '" + id_settings + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
    
            }
        });
    }
    deleteSetting (id_settings, result) {
        sql.query("DELETE FROM settings WHERE id_settings = '" + id_settings + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    insertSetting (name, value , result) {
        sql.query("INSERT INTO settings( name ,  value ) VALUES ('" + name + "','" + value + "')", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    updateSetting (id_settings, value, result) {
        sql.query("UPDATE settings SET value = '" + value + "' WHERE id_settings = '" + id_settings + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    selectUsers (result) {
        sql.query("SELECT * FROM users", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
    
            }
        });
    }
    selectUser (id_discord, result) {
        sql.query("SELECT * FROM users WHERE id_discord = '" + id_discord + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
    
            }
        });
    }
    insertUser (id_discord, result) {
        sql.query("SET sql_mode = 'NO_ZERO_DATE'; INSERT INTO users (id_discord, messages) VALUES ('" + id_discord +"', 0)", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
    
            }
        });
    }
    deleteUser(id_discord, result) {
        sql.query("DELETE FROM users WHERE id_discord = '" + id_discord + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
    
            }
        });
    }
    selectLivelUser(messages, result) {
        sql.query("SELECT * FROM level WHERE step = '" + messages + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
    
            }
        });
    }
    insertUser(id_discord, result) {
        sql.query("INSERT INTO users (id_discord, messages) VALUES ('" + id_discord + "', 0)", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    selectDeadUsers(result) {
        sql.query("SELECT * FROM users WHERE last_check < (NOW() - INTERVAL 15 DAY) AND notified = 1", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
    
            }
        });
    }
    selectNotifiedUsers (result) {
        sql.query("SELECT * FROM users WHERE last_check < (NOW() - INTERVAL 15 DAY) AND notified = 0 AND presences = 0", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
    
            }
        });
    }
    updateUserNotified (id_discord, result) {
        sql.query("UPDATE users SET notified = 1 WHERE id_discord = '" + id_discord + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    updateUserLastCheck (id_discord, result) {
        sql.query("UPDATE users SET last_check = NOW() WHERE id_discord = '" + id_discord + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    updateUserResetLastCheck (id_discord, result) {
        sql.query("UPDATE users SET last_check = NULL , notified = 0 WHERE id_discord = '" + id_discord + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    updateZeroMessage (id_discord, result) {
        sql.query("UPDATE users SET messages = 0 WHERE id_discord = '" + id_discord + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    updateZeroPresence (id_discord, result) {
        sql.query("UPDATE users SET presences = 0 WHERE id_discord = '" + id_discord + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    selectUserWhiteList (id_discord, result) {
        sql.query("SELECT * FROM white_list WHERE id_discord = '" + id_discord + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
    
            }
        });
    }
    selectUsersWhiteList (result) {
        sql.query("SELECT * FROM white_list", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
    
            }
        });
    }
    insertUserWhiteList (id_discord, tag, result) {
        sql.query("INSERT INTO white_list (id_discord , tag) VALUES ('" + id_discord + "','" + tag + "')", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    deleteUserwhiteList (tag, result) {
        sql.query("DELETE FROM white_list WHERE tag = '" + tag + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    selectUsersInToGrave (result) {
        sql.query("SELECT * FROM users  WHERE NOT last_check = '' ", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
    
            }
        });
    }
    updateRemoveMessageUser (id_discord, message, result) {
        sql.query("UPDATE users SET messages = messages - " + message + " WHERE id_discord = '" + id_discord + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    updateRemovePointUser (id_discord, point, result) {
        sql.query("UPDATE users SET presences = presences - " + point + " WHERE id_discord = '" + id_discord + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    updateResetPresenceCount (result) {
        sql.query("UPDATE users SET messages_day = 0 , presence_day = 0 , bot_mention = 0", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    updateResetBotMention (result) {
        sql.query("UPDATE users SET bot_mention = 0", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
    
            }
        });
    }
    selectMessageLadyisabel (result) {
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
    insertMessageLadyisabel (message ,result) {
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
    deleteMessageLadyisabel (id_phrase, result) {
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
    updateStatusMessageLadyisabel (id_phrase, result) {
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
    updatePointMessageUser (id_discord, result) {
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
    updatePointPresenceDayUpdate (id_discord, result) {
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
    updatePointPresenceDayMessage (id_discord, result) {
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
    updatePointPresenceDayReaction (id_discord, result) {
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
    selectMentionBot (id_discord, result) {
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
    updateMentionBot (id_discord, result) {
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
    /**
     * 
     * @param {*} id_monster 
     * @param {*} result 
     */
    selectMonster(id_monster, result) {
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
    seletTopListMessageAllTime (result) {
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
    seletTopListMessageDay (result) {
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
    selectStringTexts (result) {
        sql.query("SELECT * FROM string_text", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, JSON.parse(JSON.stringify(res)));
            }
        });
    }
    insertStringText (tag,string,bot,result) {
        sql.query("INSERT INTO`string_text`( `tag`, `string`, `bot`) VALUES('" + tag + "','" + string + "','" + bot + "')", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
    deleteStringText (id_string_text, result) {
        sql.query("DELETE FROM`string_text` WHERE id_string_text = '" + id_string_text + "'", function (err, res) {
    
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
}

module.exports = BotModel;