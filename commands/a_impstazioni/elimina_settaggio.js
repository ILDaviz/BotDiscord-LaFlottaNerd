const Discord  = require('discord.js');
const botModel = require('../../helpers/Models');
const botUtili = require('../../helpers/Util');
const botCache = require('../../helpers/Cache');
const texts = require("../../helpers/Texts");

exports.run = async (message, bot) => {
	const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
	if (!message.member.roles.some(r => ["Developer"].includes(r.name)))
      return message.reply(texts.getText('message_error_authorization'));
    if (args[1]) {
        return message.reply(texts.getText('command_settins_error_id'));
    }
    botModel.deleteSetting(args[1], function (err, res) {
        if (err) {
            return message.channel.send('errore_text' + err);
        }
        message.channel.send('Settaggio eliminato');
        botCache.resetCache(function(err){
            if (err) {
                message.channel.send('errore di reset cache' + err );
            }
            message.channel.send(texts.getText('cache_reset_success'));
        });
    });
};

exports.conf = {
    name: "Elimina_settaggio",
    fullcmd: "elimina_settaggio",
    alias: "delsett",
    description: texts.getText('command_elimina_settaggio_description'),
    timer: 0,
    tokenCost: 0,
    subClass: 'impostazioni',
    displayHelp: 1
};