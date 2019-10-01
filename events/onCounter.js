const bot = require('../bot.js');
const botModel = require('../helpers/Models');
const util = require('../helpers/Util')
bot.on('raw', event => {
    //console.log('\nRaw event data:\n', event);
    if (event.t === 'PRESENCE_UPDATE') {
        let user_id_discod = event.d.user.id;
        if (event.d.guild_id == '532184361068527646' && event.d.status == 'online') {
            if (util.checkIfUserIsBot(user_id_discod) == false) {
                botModel.selectUser(user_id_discod, function (err, res) {
                    if (res.length > 0) {
                        botModel.updatePointPresenceDayUpdate(user_id_discod, function (err, res) { });
                    } else {
                        botModel.insertUser(user_id_discod, function (err, res) { });
                        botModel.updatePointPresenceDayUpdate(user_id_discod, function (err, res) { });
                    }
                });   
            }        
        }
    }
    if (event.t === 'MESSAGE_CREATE') {
        let user_id_discod = event.d.author.id;
        if (event.d.guild_id == '532184361068527646') {
            if (util.checkIfUserIsBot(user_id_discod) == false) {
                botModel.selectUser(user_id_discod, function (err, res) {
                    if (res.length > 0) {
                        botModel.updatePointMessageUser(user_id_discod, function (err, res) { });
                        botModel.updatePointPresenceDayMessage(user_id_discod, function (err, res) { });
                    } else {
                        botModel.insertUser(user_id_discod, function (err, res) { });
                        botModel.updatePointMessageUser(user_id_discod, function (err, res) { });
                        botModel.updatePointPresenceDayMessage(user_id_discod, function (err, res) { });
                    }
                });
            }
        }
    }
    if (event.t === 'MESSAGE_REACTION_ADD') {
        let user_id_discod = event.d.user_id;
        if (event.d.guild_id == '532184361068527646') {
            if (util.checkIfUserIsBot(user_id_discod) == false) {
                botModel.selectUser(user_id_discod, function (err, res) {
                    if (res.length > 0) {
                        botModel.updatePointPresenceDayReaction(user_id_discod, function (err, res) { });
                    } else {
                        botModel.insertUser(user_id_discod, function (err, res) { });
                        botModel.updatePointPresenceDayReaction(user_id_discod, function (err, res) { });
                    }
                });
            }
        }
    }
});