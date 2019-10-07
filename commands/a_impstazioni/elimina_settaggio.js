const Discord  = require('discord.js');
const botModel = require('../../helpers/Models');
const botUtili = require('../../helpers/Util');
const botCache = require('../../helpers/Cache');

exports.run = async (message, bot) => {
	const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
	if (!message.member.roles.some(r => ["Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    if (args[1]) {
        return message.reply("Devi fornirmi un id_setting");
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
            message.channel.send('Cache resettata con successo');
        });
    });
};

exports.conf = {
    name: "Elimina_settaggio",
    fullcmd: "elimina_settaggio",
    alias: "delsett",
    description: "{id_settaggio} Elimina un settaggio",
    timer: 0,
    tokenCost: 0,
    subClass: 'impostazioni',
    displayHelp: 1
};