'user strict';

const bot = require('../bot.js');
const botModel = require('../helpers/models');
const botUtil = require('../helpers/util');

bot.on('raw', event => {
    /** Update di presenza */
    if (event.t === 'PRESENCE_UPDATE') {
        let user_id_discod = event.d.user.id;
        if (event.d.guild_id == bot.conf.guild_lfn_id && event.d.status == 'online') {
            if (botUtil.checkIfUserIsBot(user_id_discod) == false) {
                botModel.selectUser(user_id_discod, function (err, res) {
                    if (res.length > 0) {
                        botUtil.log('Utente <@' + user_id_discod + '> si è loggato ad discord.\nAggiunta punto; i punti totali:' + res[0].presence_day + '.','F5A623');
                        botModel.updatePointPresenceDayUpdate(user_id_discod, function (err, res) { });
                    } else {
                        botUtil.log('Utente <@' + user_id_discod + '> si è loggato ad discord inserito nel database.');
                        botModel.insertUser(user_id_discod, function (err, res) { });
                        botModel.updatePointPresenceDayUpdate(user_id_discod, function (err, res) { });
                    }
                });
            }
        }
    }
    /** Creazione di un nuovo messaggio */
    if (event.t === 'MESSAGE_CREATE') {
        let user_id_discod = event.d.author.id;
        if (event.d.guild_id == bot.conf.guild_lfn_id) {
            if (botUtil.checkIfUserIsBot(user_id_discod) == false) {
                botModel.selectUser(user_id_discod, function (err, res) {
                    if (res.length > 0) {
                        botUtil.log('Utente <@' + user_id_discod + '> ha scritto un nuovo messaggio.\nAggiunta messaggio; i messaggi totali:' + res[0].messages + '.', 'F5A623');
                        botModel.updatePointMessageUser(user_id_discod, function (err, res) { });
                        botModel.updatePointPresenceDayMessage(user_id_discod, function (err, res) { });
                    } else {
                        botUtil.log('Utente <@' + user_id_discod + '> ha scritto un nuovo messaggio, aggiunta punto e inserito nel database');
                        botModel.insertUser(user_id_discod, function (err, res) { });
                        botModel.updatePointMessageUser(user_id_discod, function (err, res) { });
                        botModel.updatePointPresenceDayMessage(user_id_discod, function (err, res) { });
                    }
                });
            }
        }
    }
    /** Aggiunta di una nuova reazione */
    if (event.t === 'MESSAGE_REACTION_ADD') {
        let user_id_discod = event.d.user_id;
        if (event.d.guild_id == bot.conf.guild_lfn_id) {
            if (botUtil.checkIfUserIsBot(user_id_discod) == false) {
                botModel.selectUser(user_id_discod, function (err, res) {
                    if (res.length > 0) {
                        botUtil.log('Utente <@' + user_id_discod + '> ha aggiunto una reazione.\nAggiunta reazione; i punti totali:' + res[0].presence_day + '.', 'F5A623');
                        botModel.updatePointPresenceDayReaction(user_id_discod, function (err, res) { });
                    } else {
                        botUtil.log('Utente <@' + user_id_discod + '> ha aggiunto una reazione, aggiunta punto e inserito nel database');
                        botModel.insertUser(user_id_discod, function (err, res) { });
                        botModel.updatePointPresenceDayReaction(user_id_discod, function (err, res) { });
                    }
                });
            }
        }
    }
});