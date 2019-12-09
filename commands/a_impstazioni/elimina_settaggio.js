
const botModel = require('../../helpers/models');
const texts = require("../../helpers/json");

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