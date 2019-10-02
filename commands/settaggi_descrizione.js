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
    botModel.updateSettingDescription(args[1], args_2, function (err, res) { });
    message.channel.send('Descrizione settaggio aggiornata');
};

exports.conf = {
    name: "Descrizione_settaggio",
    fullcmd: "descrizione_settaggio",
    alias: "addsettdesc",
    description: "[id_setting] [valore] Aggiunge una descrizione informativa al valore",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_settaggi',
    displayHelp: 1
};