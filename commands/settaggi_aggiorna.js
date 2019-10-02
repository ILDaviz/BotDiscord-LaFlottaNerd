const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
    
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const string = args.slice(2).join(' ');
    if (!message.member.roles.some(r => ["Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    botModel.updateSetting(args[1],string, function (err, res) { });
    message.channel.send('Settaggio aggiornato');
};

exports.conf = {
    name: "Aggiorna_settaggio",
    fullcmd: "aggiorna_settaggio",
    alias: "updsett",
    description: "[id_settaggio] [Nuovo valore] Aggiorna un settaggio pre-esistente",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_settaggi',
    displayHelp: 1
};