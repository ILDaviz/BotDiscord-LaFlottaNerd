const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
	const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
	if (!message.member.roles.some(r => ["Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    botModel.deleteSetting(args[1], function (err, res) { });
    message.channel.send('Settaggio eliminato');
};

exports.conf = {
    name: "Elimina_settaggio",
    fullcmd: "elimina_settaggio",
    alias: "delsett",
    description: "[id_settaggio] Elimina un settaggio",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_settaggi',
    displayHelp: 1
};