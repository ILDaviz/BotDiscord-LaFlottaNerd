const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  	const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
	const args_1 = args.slice(1).join(' ');
  	const args_2 = args.slice(2).join(' ');

  	if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    	return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");

  	botModel.selectSettingValue(args_1, function (err, res) {
    	if (res.length === 0) {
      		return message.reply("Mi dispiace, ma non ci sono settaggi.");
    }

    let value = res[0].value;
    let frase = decodeURIComponent(value);
    message.channel.send(frase);

  });
};

exports.conf = {
    name: "Mostra_settaggio",
    fullcmd: "mostra_settaggio",
    alias: "visett",
    description: "[id_setting] visualizza il contenuto di un settaggio specifico",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_settaggi',
    displayHelp: 1
};