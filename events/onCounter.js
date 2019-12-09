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
                        botUtil.log('Utente <@' + user_id_discod + '> si è loggato ad discord, aggiunta punto');
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
                        botUtil.log('Utente <@' + user_id_discod + '> ha scritto un nuovo messaggio, aggiunta punto');
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
                        botUtil.log('Utente <@' + user_id_discod + '> ha aggiunto una reazione, aggiunta punto');
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